"use server";

import { db } from "@/db";
import { leaderboard, participants, submissions, users } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { tryCatchAction } from "../lib";
import { ActionResponse } from "../types";
function calculateCurrentStreak(days: number[]): number {
  if (days.length === 0) return 0;

  const sorted = [...days].sort((a, b) => b - a); // newest first

  let streak = 1;

  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i - 1] - sorted[i] === 1) {
      streak++;
    } else {
      break; // Stop as soon as we find a gap — we only care about the current streak
    }
  }

  return streak;
}

export const updateLeaderboard = tryCatchAction(
  async (techfestId?: string): Promise<ActionResponse> => {
    const today = new Date();
    const todayDateString = today.toISOString().split("T")[0]; // e.g., 2025-12-12

    // 1. Fetch all submissions (no transaction needed)
    const allSubmissions = await db
      .select({
        userId: submissions.userId,
        day: submissions.day,
        createdAt: submissions.createdAt, // we need submission timestamp for "earlier submission"
      })
      .from(submissions)
      .where(techfestId ? eq(submissions.techfestId, techfestId) : sql`true`)
      .orderBy(submissions.day);

    // 2. Group by user and compute stats + streak
    const userMap = new Map<
      string,
      { days: number[]; earliestSubmission: Date; totalSubmissions: number }
    >();

    for (const sub of allSubmissions) {
      if (!userMap.has(sub.userId)) {
        userMap.set(sub.userId, {
          days: [],
          earliestSubmission: sub.createdAt,
          totalSubmissions: 0,
        });
      }

      const entry = userMap.get(sub.userId)!;
      entry.days.push(sub.day);
      entry.totalSubmissions += 1;
      if (sub.createdAt < entry.earliestSubmission) {
        entry.earliestSubmission = sub.createdAt; // track first submission
      }
    }

    // 3. Compute leaderboard data
    const leaderboardData = Array.from(userMap.entries()).map(
      ([userId, { days, earliestSubmission, totalSubmissions }]) => {
        const currentStreak = calculateCurrentStreak(days);
        const latestDay = Math.max(...days);

        return {
          userId,
          currentStreak,
          latestDay,
          totalSubmissions,
          earliestSubmission,
        };
      }
    );

    // 4. Sort by streak descending, then earliest submission ascending
    leaderboardData.sort((a, b) => {
      if (b.currentStreak !== a.currentStreak) {
        return b.currentStreak - a.currentStreak;
      }
      return a.earliestSubmission.getTime() - b.earliestSubmission.getTime();
    });

    // 5. Prepare insert data
    const ranked = leaderboardData.map((item, index) => ({
      userId: item.userId,
      currentStreak: item.currentStreak,
      latestDay: item.latestDay,
      totalSubmissions: item.totalSubmissions,
      rank: index + 1,
      techfestId: techfestId ?? "global",
      updatedAt: today,
      date: todayDateString, // store the day of this leaderboard snapshot
    }));

    // 6. Check last leaderboard for today
    const existingToday = await db
      .select({ id: leaderboard.id })
      .from(leaderboard)
      .where(
        techfestId
          ? sql`${leaderboard.techfestId} = ${techfestId} AND ${leaderboard.date} = ${todayDateString}`
          : sql`${leaderboard.date} = ${todayDateString}`
      );

    if (existingToday.length > 0) {
      // Delete today’s old leaderboard
      await db
        .delete(leaderboard)
        .where(
          techfestId
            ? sql`${leaderboard.techfestId} = ${techfestId} AND ${leaderboard.date} = ${todayDateString}`
            : sql`${leaderboard.date} = ${todayDateString}`
        );
    }

    // 7. Insert new leaderboard for today
    if (ranked.length > 0) {
      await db.insert(leaderboard).values(ranked);
    }

    return {
      success: true,
      message: "Leaderboard updated successfully",
    };
  }
);
export type LeaderboardWithUser = {
  userId: string;
  currentStreak: number;
  latestDay: number;
  totalSubmissions: number;
  rank: number;
  techfestId: string;
  updatedAt: Date;

  // User details from join
  name: string | null;
  email: string | null;
  image: string | null; // avatar URL
  domain: string | null;
  // Add any other user fields you want
};

export const getLeaderboard = tryCatchAction(
  async (): Promise<ActionResponse<LeaderboardWithUser[]>> => {
    let leaderboardData = await db
      .select({
        // Leaderboard columns
        userId: leaderboard.userId,
        currentStreak: leaderboard.currentStreak,
        latestDay: leaderboard.latestDay,
        totalSubmissions: leaderboard.totalSubmissions,
        rank: leaderboard.rank,
        techfestId: leaderboard.techfestId,
        updatedAt: leaderboard.updatedAt,

        // User columns
        name: users.name,
        email: users.email,
        image: users.image,

        // Participation columns
        domain: participants.domain,
      })
      .from(leaderboard)
      .leftJoin(users, eq(leaderboard.userId, users.id))
      .leftJoin(participants, eq(leaderboard.userId, participants.userId))
      .where(eq(leaderboard.date, new Date().toISOString().split("T")[0]));

    leaderboardData = leaderboardData.sort((a, b) => {
      // 1. Highest streak first
      if (b.currentStreak !== a.currentStreak) {
        return b.currentStreak - a.currentStreak;
      }

      // Convert latestDay strings to timestamps
      const timeA = new Date(a.latestDay).getTime();
      const timeB = new Date(b.latestDay).getTime();

      // 2. Latest day first
      const dayA = new Date(a.latestDay).setHours(0, 0, 0, 0);
      const dayB = new Date(b.latestDay).setHours(0, 0, 0, 0);

      if (dayB !== dayA) {
        return dayB - dayA; // latest day on top
      }

      // 3. Same day: earlier submission first
      return timeA - timeB;
    });

    return {
      success: true,
      message: "Leaderboard fetched successfully",
      data: leaderboardData as LeaderboardWithUser[],
    };
  }
);
