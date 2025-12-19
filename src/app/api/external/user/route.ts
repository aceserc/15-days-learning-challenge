import { db } from "@/db";
import { users as usersTable } from "@/db/schema/auth";
import { participants as participantsTable } from "@/db/schema/participants";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("user-id");
    const apiKey = searchParams.get("api-key");

    // Validate API Key
    if (!apiKey || apiKey !== process.env.EXTERNAL_API_KEY) {
        return NextResponse.json(
            { success: false, message: "Unauthorized: Invalid or missing API key" },
            { status: 401 }
        );
    }

    // Validate User ID
    if (!userId) {
        return NextResponse.json(
            { success: false, message: "Bad Request: Missing userId parameter" },
            { status: 400 }
        );
    }

    try {
        const user = await db.query.users.findFirst({
            where: eq(usersTable.id, userId),
        });

        if (!user) {
            return NextResponse.json(
                { success: false, message: "Not Found: User not found" },
                { status: 404 }
            );
        }

        const participant = await db.query.participants.findFirst({
            where: eq(participantsTable.userId, user.id),
        });

        return NextResponse.json({
            success: true,
            data: {
                user,
                participant,
            },
        });
    } catch (error) {
        console.error("External API Error:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
