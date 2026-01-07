"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CHALLANGE_DATA } from "@/content/data";
import { addDays, format, startOfDay } from "date-fns";
import { CalendarOff } from "lucide-react";
import Link from "next/link";

const DeadlineOver = ({ startedAt }: { startedAt?: Date | null }) => {
  const startDate = startedAt
    ? startOfDay(startedAt)
    : startOfDay(CHALLANGE_DATA.startDate);
  const deadlineDate = addDays(startDate, CHALLANGE_DATA.canSubmitTillDays);

  return (
    <Card className="w-full border-dashed bg-muted/20">
      <CardContent className="flex min-h-[400px] flex-col items-center justify-center gap-6 p-8 text-center">
        <div className="rounded-full bg-background p-4 shadow-sm ring-1 ring-border">
          <CalendarOff className="h-8 w-8 text-muted-foreground" />
        </div>

        <div className="space-y-2 max-w-md">
          <h3 className="text-2xl font-bold tracking-tight">
            Submissions Closed
          </h3>
          <p className="text-base text-muted-foreground">
            The submission window for this challenge closed on{" "}
            <span className="font-medium text-foreground">
              {format(deadlineDate, "PPP")}
            </span>
            .
          </p>
          <p className="text-sm text-muted-foreground/80">
            Thank you for participating! You can still view your past
            submissions in the "My Submissions" tab.
          </p>
        </div>

        <Button asChild variant="outline" className="mt-2">
          <Link href="/">Back to Dashboard</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export { DeadlineOver };
