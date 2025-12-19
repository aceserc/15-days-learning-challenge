// types/next-auth.d.ts
import NextAuth from "next-auth"

declare module "next-auth" {
    interface User {
        id: string,
        name: string,
        email: string | null,
        emailVerified: string | null,
        image: string | null,
        schoolName: string | null,
        phoneNumber: string | null,
        phoneNumberVerifiedAt: string | null,
        createdAt: string | null,
        updatedAt: string | null,
        isOnboarded: boolean | null,
        isAdmin: boolean | null
    }

    interface Session {
        user?: User;
    }
}
