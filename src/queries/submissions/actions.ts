"use server";

import { db } from "@/db";
import {
  participants,
  Submission,
  submissions,
  users,
  votes,
} from "@/db/schema";
import { and, eq, inArray } from "drizzle-orm";
import { ActionResponse } from "../types";
import { CHALLANGE_DATA } from "@/content/data";
import { differenceInDays, startOfDay } from "date-fns";
import { tryCatchAction } from "../lib";
import { getAuth } from "../middlewares/require-auth";
import { User } from "next-auth";

export type DailySubmission = {
  day: number;
  link: string;
  summary: string;
};

export const submitDailyChallenge = tryCatchAction(
  async (data: DailySubmission): Promise<ActionResponse> => {
    const user = await getAuth();

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

    // Check if user is a participant
    const isParticipant = await db
      .select()
      .from(participants)
      .where(
        and(
          eq(participants.userId, user.id!),
          eq(participants.techfestId, CHALLANGE_DATA.techfestId)
        )
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
          eq(submissions.userId, user.id!),
          eq(submissions.day, data.day),
          eq(submissions.techfestId, CHALLANGE_DATA.techfestId)
        )
      )
      .limit(1);

    if (existing.length > 0) {
      return {
        success: false,
        error: `Values for Day ${data.day} already exists. Please delete the submission and then resubmit.`,
      };
    }

    await db.insert(submissions).values({
      userId: user.id!,
      day: data.day,
      link: data.link,
      summary: data.summary,
      techfestId: CHALLANGE_DATA.techfestId,
    });

    return {
      success: true,
      message: "Thank you for submission",
    };
  }
);

export const getMySubmissions = tryCatchAction(
  async (): Promise<
    ActionResponse<
      (Submission & {
        user: User;
        userVote: "up" | "down" | null;
      })[]
    >
  > => {
    const user = await getAuth();

    const data = await db
      .select({
        id: submissions.id,
        userId: submissions.userId,
        day: submissions.day,
        link: submissions.link,
        summary: submissions.summary,
        createdAt: submissions.createdAt,
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
          eq(submissions.userId, user.id!),
          eq(submissions.techfestId, CHALLANGE_DATA.techfestId)
        )
      )
      .orderBy(submissions.day);

    if (data.length === 0) {
      return { success: true, data: [], message: "Submissions fetched" };
    }

    const submissionIds = data.map((d) => d.id);
    const votesData = await db
      .select()
      .from(votes)
      .where(inArray(votes.submissionId, submissionIds));

    const enrichedData = await Promise.all(
      data.map(async (sub) => {
        const myVote = await db
          .select()
          .from(votes)
          .where(
            and(eq(votes.submissionId, sub.id), eq(votes.userId, user.id!))
          )
          .limit(1);
        return {
          ...sub,
          userVote:
            myVote.length > 0 ? (myVote[0].type as "up" | "down") : null,
        };
      })
    );

    return {
      success: true,
      data: enrichedData,
      message: "Submissions fetched",
    };
  }
);

export const voteSubmission = tryCatchAction(
  async (
    submissionId: string,
    type: "up" | "down"
  ): Promise<ActionResponse> => {
    const user = await getAuth();

    const existingVote = await db
      .select()
      .from(votes)
      .where(
        and(eq(votes.submissionId, submissionId), eq(votes.userId, user.id!))
      )
      .limit(1);

    if (existingVote.length > 0) {
      const vote = existingVote[0];
      if (vote.type === type) {
        // Toggle off
        await db
          .delete(votes)
          .where(
            and(
              eq(votes.userId, user.id!),
              eq(votes.submissionId, submissionId)
            )
          );
        return { success: true, message: "Vote removed" };
      } else {
        // Change vote
        await db
          .update(votes)
          .set({ type })
          .where(
            and(
              eq(votes.userId, user.id!),
              eq(votes.submissionId, submissionId)
            )
          );
        return { success: true, message: "Vote updated" };
      }
    } else {
      // Create new vote
      await db.insert(votes).values({
        userId: user.id!,
        submissionId,
        type,
      });
      return { success: true, message: "Vote added" };
    }
  }
);

export const deleteSubmission = tryCatchAction(
  async (submissionId: string): Promise<ActionResponse> => {
    const user = await getAuth();

    const deleted = await db
      .delete(submissions)
      .where(
        and(eq(submissions.id, submissionId), eq(submissions.userId, user.id!))
      )
      .returning();

    if (deleted.length === 0) {
      return { success: false, error: "Submission not found or unauthorized" };
    }

    return { success: true, message: "Submission deleted successfully" };
  }
);
