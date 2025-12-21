"use server"

import { CHALLANGE_DATA } from "@/content/data"
import { db } from "@/db"
import { participants, submissions, users, type Submission } from "@/db/schema"
import { count, desc, eq } from "drizzle-orm"
import { tryCatchAction } from "../lib"
import { ActionResponse } from "../types"
interface Participants {
  id: string;
  userId: string;
  domain: string;
  createdAt: Date;
  techfestId: string;
}
interface User {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  schoolName: string | null;
  phoneNumber: string | null;
  phoneNumberVerifiedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  isOnboarded: boolean;
}
interface ParticipantsWithUser extends Participants {
  user: User | null;
}

export const fetchPartcipants = tryCatchAction(async (): Promise<ActionResponse<ParticipantsWithUser[]>> => {
  const data = await db.select({
    participants: participants,
    users: users
  })
    .from(participants)
    .leftJoin(users, eq(participants.userId, users.id))
    .where(eq(participants.techfestId, CHALLANGE_DATA.techfestId))

  const formattedData = data.map(item => ({
    ...item.participants,
    user: item.users
  }))

  return {
    success: true,
    message: `Participants fetched successfully for the ${CHALLANGE_DATA.techfestId}`,
    data: formattedData
  }
})
export const fetchTotalUsers = tryCatchAction(async (): Promise<ActionResponse<User[]>> => {
  const user = await db.select().from(users).orderBy(desc(users.createdAt))
  return {
    success: true,
    message: `Total users fetched successfully`,
    data: user
  }
})

export const fetchParticipantById = tryCatchAction(async (id: string): Promise<ActionResponse<Participants>> => {
  const data = await db.select().from(participants).where(eq(participants.id, id)).limit(1)
  return {
    success: true,
    message: `Participant fetched successfully`,
    data: data[0]
  }
})

export const fetchUserById = tryCatchAction(async (id: string): Promise<ActionResponse<User>> => {
  const data = await db.select().from(users).where(eq(users.id, id)).limit(1)
  return {
    success: true,
    message: `User fetched successfully`,
    data: data[0]
  }
})

export const fetchAdminStats = tryCatchAction(async (): Promise<ActionResponse<{
  totalUsers: number;
  totalParticipants: number;
  totalSubmissions: number;
}>> => {
  const [userCount] = await db.select({ count: count() }).from(users)
  const [participantCount] = await db.select({ count: count() }).from(participants).where(eq(participants.techfestId, CHALLANGE_DATA.techfestId))
  const [submissionCount] = await db.select({ count: count() }).from(submissions).where(eq(submissions.techfestId, CHALLANGE_DATA.techfestId))

  return {
    success: true,
    message: "Stats fetched successfully",
    data: {
      totalUsers: userCount.count,
      totalParticipants: participantCount.count,
      totalSubmissions: submissionCount.count,
    }
  }
})

export const fetchAdminChartData = tryCatchAction(async (): Promise<ActionResponse<{
  submissionsByDay: { day: number; count: number }[];
  participantsByDate: { date: string; count: number }[];
}>> => {
  // Fetch submissions (only day needed)
  const submissionsData = await db
    .select({ day: submissions.day })
    .from(submissions)
    .where(eq(submissions.techfestId, CHALLANGE_DATA.techfestId));

  // Fetch participants (only createdAt needed)
  const participantsData = await db
    .select({ createdAt: participants.createdAt })
    .from(participants)
    .where(eq(participants.techfestId, CHALLANGE_DATA.techfestId));

  // Process Submissions by Day
  const submissionsMap = new Map<number, number>();
  // Initialize for all expected days if we want, but dynamic is fine too.
  // Assuming 15 days challenge
  for (let i = 1; i <= CHALLANGE_DATA.durationInDays; i++) {
    submissionsMap.set(i, 0);
  }

  submissionsData.forEach((s) => {
    const day = s.day;
    submissionsMap.set(day, (submissionsMap.get(day) || 0) + 1);
  });

  const submissionsByDay = Array.from(submissionsMap.entries())
    .map(([day, count]) => ({ day, count }))
    .sort((a, b) => a.day - b.day);

  // Process Participants by Date
  const participantsMap = new Map<string, number>();
  participantsData.forEach((p) => {
    // Format date as YYYY-MM-DD
    const date = p.createdAt.toISOString().split('T')[0];
    participantsMap.set(date, (participantsMap.get(date) || 0) + 1);
  });

  const participantsByDate = Array.from(participantsMap.entries())
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return {
    success: true,
    message: "Chart data fetched successfully",
    data: {
      submissionsByDay,
      participantsByDate
    }
  }
})

export const fetchSubmissionsByUserId = tryCatchAction(async (userId: string): Promise<ActionResponse<Submission[]>> => {
  const data = await db.select().from(submissions).where(eq(submissions.userId, userId)).orderBy(submissions.day)
  return {
    success: true,
    message: `Submissions fetched successfully`,
    data: data
  }
})