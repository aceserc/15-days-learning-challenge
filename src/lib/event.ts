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

export function isDeadlineOver(): boolean {
  return isAfter(startOfDay(new Date()), getDeadlineDate());
}

export function getCurrentDayNumber(): number {
  const today = startOfDay(new Date());
  const startDate = startOfDay(CHALLANGE_DATA.startDate);
  return differenceInCalendarDays(today, startDate) + 1;
}
