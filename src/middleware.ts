import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { nextUrl } = req;

  const isChallengeActive = process.env.CHALLENGE_ACTIVE === "true";
  const isEndedPage = nextUrl.pathname === "/challenge-ended";
  const isAuthPage = nextUrl.pathname.startsWith("/auth");
  const isPublicApi = nextUrl.pathname.startsWith("/api");
  const isRootPage = nextUrl.pathname === "/";

  // 1. Challenge Ended Logic (Global Override)
  // Only redirect if challenge is inactive AND we're not already on the ended page
  if (!isChallengeActive && !isEndedPage) {
    // Allow auth pages and API routes even when challenge is ended
    if (!isAuthPage && !isPublicApi) {
      return NextResponse.redirect(new URL("/challenge-ended", nextUrl));
    }
  }

  // 2. Redirect unauthenticated users to login
  // For now, we'll check if there's a session cookie (NextAuth uses next-auth.session-token)
  const sessionToken =
    req.cookies.get("next-auth.session-token") ||
    req.cookies.get("__Secure-next-auth.session-token");
  const isAuthenticated = !!sessionToken;

  // If not authenticated and trying to access protected routes
  if (!isAuthenticated && !isAuthPage && !isPublicApi && !isEndedPage) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }

  // If authenticated and on root, redirect to home
  if (isAuthenticated && isRootPage) {
    return NextResponse.redirect(new URL("/home", nextUrl));
  }

  // If not authenticated and on root, redirect to login
  if (!isAuthenticated && isRootPage) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }

  // Allow all other requests
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
