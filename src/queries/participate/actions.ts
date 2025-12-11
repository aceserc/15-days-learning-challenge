"use server";

import { db } from "@/db";
import { Participant, participants } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { ActionResponse } from "../types";
import { CHALLANGE_DATA } from "@/content/data";
import { DOMAINS } from "@/content/domains";
import { tryCatchAction } from "../lib";
import { getAuth } from "../middlewares/require-auth";

export const participateToChallenge = tryCatchAction(
  async (domain: string): Promise<ActionResponse> => {
    const user = await getAuth();

    // Check if user has already participated
    const existing = await db
      .select()
      .from(participants)
      .where(
        and(
          eq(participants.userId, user.id!),
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
      userId: user.id!,
      domain,
      techfestId: CHALLANGE_DATA.techfestId,
    });

    return {
      success: true,
      message:
        "Thank your for participating in ACES 15-Day Learning Challenge!",
    };
  }
);

export const getMyParticipation = tryCatchAction(
  async (): Promise<ActionResponse<Participant | null>> => {
    const user = await getAuth();

    const existing = await db
      .select()
      .from(participants)
      .where(
        and(
          eq(participants.userId, user.id!),
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
  }
);
