import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";
import { accounts, sessions, users, verificationTokens } from "@/db/schema/auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  //@ts-expect-error: i modify the types of user
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.name = user.name;
        session.user.email = user.email;
        session.user.image = user.image;
        session.user.schoolName = user.schoolName;
        session.user.phoneNumber = user.phoneNumber;
        session.user.phoneNumberVerifiedAt = user.phoneNumberVerifiedAt;
        session.user.createdAt = user.createdAt;
        session.user.updatedAt = user.updatedAt;
        session.user.isOnboarded = user.isOnboarded;
      }
      return session;
    },
  },
  trustHost: true,
});
