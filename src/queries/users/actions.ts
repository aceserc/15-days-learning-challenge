"use server";

import { db } from "@/db";
import { participants, submissions, users } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { tryCatchAction } from "../lib";
import { ActionResponse } from "../types";

export const fetchCurrentUser = tryCatchAction(async (): Promise<ActionResponse<any>> => {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, session.user.id),
  });

  if (!user) {
    throw new Error("User not found");
  }

  return {
    success: true,
    message: "User profile fetched",
    data: {
      user,
    },
  };
});

export const fetchUserProfile = tryCatchAction(async (): Promise<ActionResponse<any>> => {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, session.user.id),
  });

  if (!user) {
    throw new Error("User not found");
  }

  const participant = await db.query.participants.findFirst({
    where: eq(participants.userId, user.id),
  });

  const userSubmissions = await db.query.submissions.findMany({
    where: eq(submissions.userId, user.id),
    orderBy: (submissions, { desc }) => [desc(submissions.createdAt)],
  });

  return {
    success: true,
    message: "User profile fetched",
    data: {
      user,
      participant,
      submissions: userSubmissions,
    },
  };
});
