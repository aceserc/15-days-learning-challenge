"use server";

import { CHALLANGE_DATA } from "@/content/data";
import { db } from "@/db";
import { participants, users } from "@/db/schema";
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

  const participant = await db.select({
    participants: participants,
    users: users
  }).from(participants).leftJoin(users, eq(participants.userId, users.id)).where(eq(participants.techfestId, CHALLANGE_DATA.techfestId)).limit(1)
  console.log(participant, "from server")

  return {
    success: true,
    message: "User profile fetched",
    data: {
      user,
      participant,
    },
  };
})
