"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Send } from "lucide-react";
import Link from "next/link";

export function SubmitProgressCard() {
  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="h-5 w-5 text-primary" />
          Submit Your Progress
        </CardTitle>
        <CardDescription>
          The challenge is live! Don't forget to submit your daily progress to
          keep your streak alive.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-end">
        <Button asChild className="w-full sm:w-auto">
          <Link href="/submissions">Submit Progress</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
