"use server";

import { auth } from "@/lib/auth";
import { db } from "@/db";
import { users } from "@/db/schema/auth";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { tryCatchAction } from "../lib";
import { getAuth } from "../middlewares/require-auth";
import { ActionResponse } from "../types";


export const updateProfile = tryCatchAction(async (data: {
    name: string;
    schoolName: string;
    phoneNumber: string;
}): Promise<ActionResponse> => {
    const user = await getAuth()


    await db
        .update(users)
        .set({
            name: data.name,
            schoolName: data.schoolName,
            phoneNumber: data.phoneNumber,
            isOnboarded: true,
        })
        .where(eq(users.id, user.id));

    return { success: true, message: "Profile updated successfully" };
})


