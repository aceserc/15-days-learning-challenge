import { CHALLANGE_DATA } from "@/content/data";
import {
  addDays,
  differenceInCalendarDays,
  isAfter,
  isPast,
  startOfDay,
} from "date-fns";

export function isEventStarted(): boolean {
  return isPast(CHALLANGE_DATA.startDate);
}

export function isRegistrationPeriodOver(): boolean {
  const lastRegistrationDate = addDays(
    CHALLANGE_DATA.startDate,
    CHALLANGE_DATA.registrationGracePeriodDays
  );
  return isAfter(startOfDay(new Date()), startOfDay(lastRegistrationDate));
}

export function getDaysRemaining(): number {
  if (isEventStarted()) return 0;
  const now = new Date();
  return differenceInCalendarDays(CHALLANGE_DATA.startDate, now);
}

export function getDeadlineDate(): Date {
  return startOfDay(
    addDays(CHALLANGE_DATA.startDate, CHALLANGE_DATA.canSubmitTillDays)
  );
}

export function isDeadlineOver(startedAt?: Date | null): boolean {
  if (startedAt) {
    const deadline = addDays(
      startOfDay(startedAt),
      CHALLANGE_DATA.canSubmitTillDays
    );
    return isAfter(startOfDay(new Date()), deadline);
  }
  return isAfter(startOfDay(new Date()), getDeadlineDate());
}

export function getCurrentDayNumber(startedAt?: Date | null): number {
  if (!startedAt) return 0;
  const today = startOfDay(new Date());
  const startDate = startOfDay(startedAt);
  return differenceInCalendarDays(today, startDate) + 1;
}
