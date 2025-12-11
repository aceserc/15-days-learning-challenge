import { CHALLANGE_DATA } from "@/content/data";
import { differenceInCalendarDays, isPast } from "date-fns";

export function isEventStarted(): boolean {
  return isPast(CHALLANGE_DATA.startDate);
}

export function getDaysRemaining(): number {
  if (isEventStarted()) return 0;
  const now = new Date();
  return differenceInCalendarDays(CHALLANGE_DATA.startDate, now);
}
