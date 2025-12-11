"use server";

import { differenceInDays, startOfDay } from "date-fns";
import { and, desc, eq, inArray, sql } from "drizzle-orm";
import type { User } from "next-auth";
import { CHALLANGE_DATA } from "@/content/data";
import { db } from "@/db";
import {
  participants,
  type Submission,
  submissions,
  users,
  votes,
} from "@/db/schema";
import { tryCatchAction } from "../lib";
import { getAuth } from "../middlewares/require-auth";
import type { ActionResponse } from "../types";

export type DailySubmission = {
  day: number;
  link: string;
  summary: string;
};

export const submitDailyChallenge = tryCatchAction(
  async (data: DailySubmission): Promise<ActionResponse> => {
    const user = await getAuth();

    // Validate input data
    if (!data.day || data.day < 1 || data.day > CHALLANGE_DATA.durationInDays) {
      return { success: false, error: "Invalid day number." };
    }

    if (
      !data.link ||
      typeof data.link !== "string" ||
      data.link.trim().length === 0
    ) {
      return { success: false, error: "Link is required." };
    }

    // Basic URL validation
    try {
      new URL(data.link);
    } catch {
      return { success: false, error: "Invalid URL format." };
    }

    if (
      !data.summary ||
      typeof data.summary !== "string" ||
      data.summary.trim().length < 10
    ) {
      return {
        success: false,
        error: "Summary must be at least 10 characters.",
      };
    }

    // Prevent excessively long inputs
    if (data.link.length > 2048) {
      return { success: false, error: "Link is too long." };
    }

    if (data.summary.length > 5000) {
      return {
        success: false,
        error: "Summary is too long (max 5000 characters).",
      };
    }

    // Double check dates logic backend side
    const today = startOfDay(new Date());
    const startDate = startOfDay(CHALLANGE_DATA.startDate);

    // Check if challenge has started
    if (today < startDate) {
      return { success: false, error: "Challenge has not started yet." };
    }

    // Check if within duration (same day any hour is handled by startOfDay comparison logic in UI, validation here)
    const daysSinceStart = differenceInDays(today, startDate) + 1;

    if (daysSinceStart > CHALLANGE_DATA.canSubmitTillDays) {
      return { success: false, error: "Submission deadline is over." };
    }

    // Validate that user can only submit for current or past days
    if (data.day > daysSinceStart) {
      return { success: false, error: "You cannot submit for future days." };
    }

    // Check if user is a participant
    const isParticipant = await db
      .select()
      .from(participants)
      .where(
        and(
          eq(participants.userId, user.id),
          eq(participants.techfestId, CHALLANGE_DATA.techfestId),
        ),
      )
      .limit(1);

    if (isParticipant.length === 0) {
      return {
        success: false,
        error: "You need to participate in the challenge first.",
      };
    }

    // Check existing submission for this day
    const existing = await db
      .select()
      .from(submissions)
      .where(
        and(
          eq(submissions.userId, user.id),
          eq(submissions.day, data.day),
          eq(submissions.techfestId, CHALLANGE_DATA.techfestId),
        ),
      )
      .limit(1);

    if (existing.length > 0) {
      return {
        success: false,
        error: `Values for Day ${data.day} already exists. Please delete the submission and then resubmit.`,
      };
    }

    await db.insert(submissions).values({
      userId: user.id,
      day: data.day,
      link: data.link.trim(),
      summary: data.summary.trim(),
      techfestId: CHALLANGE_DATA.techfestId,
    });

    return {
      success: true,
      message: "Thank you for submission",
    };
  },
);

type SubmissionWithUser = Submission & {
  user: User;
  userVote: "up" | "down" | null;
};

export const getMySubmissions = tryCatchAction(
  async (): Promise<ActionResponse<SubmissionWithUser[]>> => {
    const user = await getAuth();

    const data = await db
      .select({
        id: submissions.id,
        userId: submissions.userId,
        day: submissions.day,
        link: submissions.link,
        summary: submissions.summary,
        createdAt: submissions.createdAt,
        techfestId: submissions.techfestId,
        voteCount: submissions.voteCount,
        user: {
          name: users.name,
          image: users.image,
          id: users.id,
        },
      })
      .from(submissions)
      .leftJoin(users, eq(submissions.userId, users.id))
      .where(
        and(
          eq(submissions.userId, user.id),
          eq(submissions.techfestId, CHALLANGE_DATA.techfestId),
        ),
      )
      .orderBy(submissions.day);

    if (data.length === 0) {
      return { success: true, data: [], message: "Submissions fetched" };
    }

    const submissionIds = data.map((d) => d.id);
    const myVotes = await db
      .select()
      .from(votes)
      .where(
        and(
          inArray(votes.submissionId, submissionIds),
          eq(votes.userId, user.id),
        ),
      );

    const enrichedData = data.map((sub) => {
      const vote = myVotes.find((v) => v.submissionId === sub.id);
      return {
        ...sub,
        userVote: vote ? (vote.type as "up" | "down") : null,
      };
    });

    return {
      success: true,
      data: enrichedData as SubmissionWithUser[],
      message: "Submissions fetched",
    };
  },
);

export const getFeedSubmissions = tryCatchAction(
  async (
    page: number = 1,
    limit: number = 20,
  ): Promise<
    ActionResponse<{
      submissions: SubmissionWithUser[];
      hasMore: boolean;
    }>
  > => {
    const user = await getAuth();
    const offset = (page - 1) * limit;

    const data = await db
      .select({
        id: submissions.id,
        userId: submissions.userId,
        day: submissions.day,
        link: submissions.link,
        summary: submissions.summary,
        createdAt: submissions.createdAt,
        techfestId: submissions.techfestId,
        voteCount: submissions.voteCount,
        user: {
          name: users.name,
          image: users.image,
          id: users.id,
        },
      })
      .from(submissions)
      .leftJoin(users, eq(submissions.userId, users.id))
      .where(eq(submissions.techfestId, CHALLANGE_DATA.techfestId))
      .orderBy(desc(submissions.createdAt))
      .limit(limit + 1)
      .offset(offset);

    const hasMore = data.length > limit;
    const slicedData = hasMore ? data.slice(0, limit) : data;

    if (slicedData.length === 0) {
      return {
        success: true,
        data: { submissions: [], hasMore: false },
        message: "Feed fetched",
      };
    }

    const submissionIds = slicedData.map((d) => d.id);

    const myVotes = await db
      .select()
      .from(votes)
      .where(
        and(
          inArray(votes.submissionId, submissionIds),
          eq(votes.userId, user.id),
        ),
      );

    const enrichedData = slicedData.map((sub) => {
      const vote = myVotes.find((v) => v.submissionId === sub.id);
      return {
        ...sub,
        userVote: vote ? (vote.type as "up" | "down") : null,
      };
    });

    return {
      success: true,
      data: {
        submissions: enrichedData as SubmissionWithUser[],
        hasMore,
      },
      message: "Feed fetched",
    };
  },
);

export const voteSubmission = tryCatchAction(
  async (
    submissionId: string,
    type: "up" | "down",
  ): Promise<ActionResponse> => {
    const user = await getAuth();

    // Use a transaction to ensure vote and count update are atomic
    return await db.transaction(async (tx) => {
      const existingVote = await tx
        .select()
        .from(votes)
        .where(
          and(eq(votes.submissionId, submissionId), eq(votes.userId, user.id)),
        )
        .limit(1);

      if (existingVote.length > 0) {
        const vote = existingVote[0];
        if (vote.type === type) {
          // Toggle off - remove vote
          await tx
            .delete(votes)
            .where(
              and(
                eq(votes.userId, user.id),
                eq(votes.submissionId, submissionId),
              ),
            );

          await tx
            .update(submissions)
            .set({
              voteCount: sql`${submissions.voteCount} - ${
                type === "up" ? 1 : -1
              }`,
            })
            .where(eq(submissions.id, submissionId));
          return { success: true, message: "Vote removed" };
        } else {
          // Change vote type
          await tx
            .update(votes)
            .set({ type })
            .where(
              and(
                eq(votes.userId, user.id),
                eq(votes.submissionId, submissionId),
              ),
            );

          await tx
            .update(submissions)
            .set({
              voteCount: sql`${submissions.voteCount} + ${
                type === "up" ? 2 : -2
              }`,
            })
            .where(eq(submissions.id, submissionId));
          return { success: true, message: "Vote updated" };
        }
      } else {
        // Create new vote
        await tx.insert(votes).values({
          userId: user.id,
          submissionId,
          type,
        });

        await tx
          .update(submissions)
          .set({
            voteCount: sql`${submissions.voteCount} + ${
              type === "up" ? 1 : -1
            }`,
          })
          .where(eq(submissions.id, submissionId));
        return { success: true, message: "Vote added" };
      }
    });
  },
);

export const deleteSubmission = tryCatchAction(
  async (submissionId: string): Promise<ActionResponse> => {
    const user = await getAuth();

    const deleted = await db
      .delete(submissions)
      .where(
        and(eq(submissions.id, submissionId), eq(submissions.userId, user.id)),
      )
      .returning();

    if (deleted.length === 0) {
      return { success: false, error: "Submission not found or unauthorized" };
    }

    return { success: true, message: "Submission deleted successfully" };
  },
);
