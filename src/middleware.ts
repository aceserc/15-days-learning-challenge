import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { nextUrl } = req;

  const isChallengeActive = process.env.CHALLENGE_ACTIVE === "true";
  const isEndedPage = nextUrl.pathname === "/challenge-ended";
  const isAuthPage = nextUrl.pathname.startsWith("/auth");
  const isPublicApi = nextUrl.pathname.startsWith("/api");

  // 1. Challenge Ended Logic (Global Override)
  // Only redirect if challenge is inactive AND we're not already on the ended page
  if (!isChallengeActive && !isEndedPage) {
    // Allow auth pages and API routes even when challenge is ended
    if (!isAuthPage && !isPublicApi) {
      return NextResponse.redirect(new URL("/challenge-ended", nextUrl));
    }
  }

  // Allow all other requests for now
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next (Next.js internals)
     * - static files
     */
    "/((?!api|_next|.*\\..*|favicon.ico).*)",
  ],
};
