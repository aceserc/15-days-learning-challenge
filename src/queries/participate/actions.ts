"use server";

import { auth } from "@/lib/auth";
import { db } from "@/db";
import { Participant, participants } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { ActionResponse } from "../types";
import { CHALLANGE_DATA } from "@/content/data";
import { DOMAINS } from "@/content/domains";

export const participateToChallenge = async (
  domain: string
): Promise<ActionResponse> => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { success: false, error: "User not authenticated" };
    }

    // Check if user has already participated
    const existing = await db
      .select()
      .from(participants)
      .where(
        and(
          eq(participants.userId, session.user.id),
          eq(participants.techfestId, CHALLANGE_DATA.techfestId)
        )
      )
      .limit(1);

    if (existing.length > 0) {
      return {
        success: false,
        error: "You have already participated in this challenge.",
      };
    }

    const allDomains = Object.values(DOMAINS).map((domain) => domain.id);

    if (!allDomains.includes(domain)) {
      return {
        success: false,
        error: "Invalid domain.",
      };
    }

    await db.insert(participants).values({
      userId: session.user.id,
      domain,
      techfestId: CHALLANGE_DATA.techfestId,
    });

    return {
      success: true,
      message:
        "Thank your for participating in ACES 15-Day Learning Challenge!",
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to save participation, Server Error",
    };
  }
};

export const getMyParticipation = async (): Promise<
  ActionResponse<Participant | null>
> => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { success: false, error: "User not authenticated" };
    }

    const existing = await db
      .select()
      .from(participants)
      .where(
        and(
          eq(participants.userId, session.user.id),
          eq(participants.techfestId, CHALLANGE_DATA.techfestId)
        )
      )
      .limit(1);

    if (existing.length > 0) {
      return {
        success: true,
        message: "You have already participated in this challenge.",
        data: existing[0],
      };
    }

    return {
      success: true,
      message: "You have not participated in this challenge.",
      data: null,
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to check participation, Server Error",
    };
  }
};
