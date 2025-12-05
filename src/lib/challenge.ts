export function isChallengeActive(): boolean {
  return process.env.CHALLENGE_ACTIVE === "true";
}

export function calculateStreak(submissions: Date[]): number {
  // TODO: Implement streak logic
  return 0;
}

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
