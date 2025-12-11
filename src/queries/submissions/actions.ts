"use server";

import { auth } from "@/lib/auth";
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

export type DailySubmission = {
  day: number;
  link: string;
  summary: string;
};

export const submitDailyChallenge = async (
  data: DailySubmission
): Promise<ActionResponse> => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "User not authenticated" };
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

    // Check if user is a participant
    const isParticipant = await db
      .select()
      .from(participants)
      .where(
        and(
          eq(participants.userId, session.user.id),
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
          eq(submissions.userId, session.user.id),
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
      userId: session.user.id,
      day: data.day,
      link: data.link,
      summary: data.summary,
      techfestId: CHALLANGE_DATA.techfestId,
    });

    return {
      success: true,
      message: "Thank you for submission",
    };
  } catch (error) {
    return { success: false, error: "Failed to submit. Please try again." };
  }
};

export const getMySubmissions = async (): Promise<
  ActionResponse<
    {
      id: string;
      userId: string;
      day: number;
      link: string;
      summary: string;
      createdAt: Date;
      user: {
        name: string | null;
        image: string | null;
        id: string;
      } | null;
      voteCount: number;
      userVote: "up" | "down" | null;
    }[]
  >
> => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "User not authenticated" };
    }

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
          eq(submissions.userId, session.user.id),
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

    const enrichedData = data.map((sub) => {
      const subVotes = votesData.filter((v) => v.submissionId === sub.id);
      const up = subVotes.filter((v) => v.type === "up").length;
      const down = subVotes.filter((v) => v.type === "down").length;
      const myVote = subVotes.find((v) => v.userId === session.user.id);
      return {
        ...sub,
        voteCount: up - down,
        userVote: (myVote?.type as "up" | "down") || null,
      };
    });

    return {
      success: true,
      data: enrichedData,
      message: "Submissions fetched",
    };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to fetch submissions." };
  }
};

export const voteSubmission = async (
  submissionId: string,
  type: "up" | "down"
): Promise<ActionResponse> => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "User not authenticated" };
    }

    const existingVote = await db
      .select()
      .from(votes)
      .where(
        and(
          eq(votes.submissionId, submissionId),
          eq(votes.userId, session.user.id)
        )
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
              eq(votes.userId, session.user.id),
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
              eq(votes.userId, session.user.id),
              eq(votes.submissionId, submissionId)
            )
          );
        return { success: true, message: "Vote updated" };
      }
    } else {
      // Create new vote
      await db.insert(votes).values({
        userId: session.user.id,
        submissionId,
        type,
      });
      return { success: true, message: "Vote added" };
    }
  } catch (error) {
    return { success: false, error: "Failed to vote" };
  }
};

export const deleteSubmission = async (
  submissionId: string
): Promise<ActionResponse> => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "User not authenticated" };
    }

    const deleted = await db
      .delete(submissions)
      .where(
        and(
          eq(submissions.id, submissionId),
          eq(submissions.userId, session.user.id)
        )
      )
      .returning();

    if (deleted.length === 0) {
      return { success: false, error: "Submission not found or unauthorized" };
    }

    return { success: true, message: "Submission deleted successfully" };
  } catch (error) {
    return { success: false, error: "Failed to delete submission" };
  }
};
