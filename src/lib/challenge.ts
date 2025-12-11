import { differenceInDays, startOfDay } from "date-fns";

export function isChallengeActive(): boolean {
  return process.env.CHALLENGE_ACTIVE === "true";
}

/**
 * Calculates the streak based on consecutive submission dates
 * @param submissions - Array of submission dates
 * @returns The current streak count
 */
export function calculateStreak(submissions: Date[]): number {
  if (submissions.length === 0) return 0;

  // Sort dates in descending order (most recent first)
  const sortedDates = submissions
    .map((date) => startOfDay(date))
    .sort((a, b) => b.getTime() - a.getTime());

  const today = startOfDay(new Date());
  let streak = 0;

  // Check if most recent submission is today or yesterday
  const daysSinceLastSubmission = differenceInDays(today, sortedDates[0]);
  if (daysSinceLastSubmission > 1) {
    // Streak is broken
    return 0;
  }

  // Count consecutive days
  for (let i = 0; i < sortedDates.length; i++) {
    if (i === 0) {
      streak = 1;
      continue;
    }

    const daysDiff = differenceInDays(sortedDates[i - 1], sortedDates[i]);
    if (daysDiff === 1) {
      streak++;
    } else {
      // Streak broken
      break;
    }
  }

  return streak;
}

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
