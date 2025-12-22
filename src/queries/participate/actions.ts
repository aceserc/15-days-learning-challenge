"use server";

import { db } from "@/db";
import { Participant, participants } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { ActionResponse } from "../types";
import { CHALLANGE_DATA } from "@/content/data";
import { DomainName, DOMAINS } from "@/content/domains";
import { tryCatchAction } from "../lib";
import { getAuth } from "../middlewares/require-auth";
import { isEventStarted, isRegistrationPeriodOver } from "@/lib/event";

export const participateToChallenge = tryCatchAction(
  async (domain: string): Promise<ActionResponse> => {
    const user = await getAuth();

    // Check if registration period is over
    if (isRegistrationPeriodOver()) {
      return {
        success: false,
        error: "Registration period has ended.",
      };
    }

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

    if (!allDomains.includes(domain as DomainName)) {
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

export const startChallenge = tryCatchAction(
  async (): Promise<ActionResponse> => {
    const user = await getAuth();

    if (!isEventStarted()) {
      return {
        success: false,
        error: "Challenge has not started yet.",
      };
    }

    const participant = await db
      .select()
      .from(participants)
      .where(
        and(
          eq(participants.userId, user.id!),
          eq(participants.techfestId, CHALLANGE_DATA.techfestId)
        )
      )
      .limit(1);

    if (participant.length === 0) {
      return {
        success: false,
        error: "You are not enrolled in the challenge.",
      };
    }

    if (participant[0].startedAt) {
      return {
        success: false,
        error: "You have already started your challenge.",
      };
    }

    await db
      .update(participants)
      .set({ startedAt: new Date() })
      .where(
        and(
          eq(participants.userId, user.id!),
          eq(participants.techfestId, CHALLANGE_DATA.techfestId)
        )
      );

    return {
      success: true,
      message: "Challenge started! Good luck!",
    };
  }
);
