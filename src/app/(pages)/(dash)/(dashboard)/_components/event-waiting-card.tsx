"use client";

import { CalendarClock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getDaysRemaining } from "@/lib/event";

export function EventWaitingCard() {
  const daysRemaining = getDaysRemaining();

  return (
    <Card className="border-muted bg-muted/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-muted-foreground">
          <CalendarClock className="h-5 w-5" />
          Event Not Started Yet
        </CardTitle>
        <CardDescription>
          The 15-Day Learning Challenge hasn't started yet. Please wait!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1">
          <p className="text-2xl font-bold">{daysRemaining}</p>
          <p className="text-sm text-muted-foreground">Days Remaining</p>
        </div>
      </CardContent>
    </Card>
  );
}
