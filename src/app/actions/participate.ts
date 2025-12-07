"use server";

import { auth } from "@/lib/auth";
import { db } from "@/db";
import { participants } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export async function participateAction(domain: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { success: false, error: "User not authenticated" };
    }

    // Check if user has already participated
    const existing = await db
      .select()
      .from(participants)
      .where(eq(participants.userId, session.user.id))
      .limit(1);

    if (existing.length > 0) {
      return { success: false, error: "You have already selected a domain." };
    }

    await db.insert(participants).values({
      userId: session.user.id,
      domain,
    });

    revalidatePath("/dashboard");
    revalidatePath("/participate");
    return { success: true };
  } catch (error) {
    console.error("Failed to participate:", error);
    return { success: false, error: "Failed to save participation" };
  }
}
