"use client";

import { SponsorCard } from "@/components/sponsor-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CHALLANGE_DATA } from "@/content/data";
import { api } from "@/queries";
import { format } from "date-fns";
import { Calendar, ExternalLink, Flame, Trophy } from "lucide-react";
import { useMemo } from "react";
import { ParticipateToChallenge } from "./_components/participate-to-challenge";
import { RewardCard } from "./_components/reward-card";
import { EnrollRewardCard } from "./_components/enroll-reward-card";
import { Skeleton } from "@/components/ui/skeleton";
import { StartChallengeCard } from "./_components/start-challenge-card";
import { SubmitProgressCard } from "./_components/submit-progress-card";
import { isEventStarted } from "@/lib/event";
import { Confetti } from "@/components/ui/confetti";

function calculateCurrentStreak(days: number[]): number {
  if (days.length === 0) return 0;
  const sorted = [...new Set(days)].sort((a, b) => b - a); // newest first
  let streak = 1;
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i - 1] - sorted[i] === 1) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

export default function DashboardPage() {
  const { data: submissionsData } = api.submissions.useGetMySubmissions();
  const { data: participation, isLoading } = api.participate.useGetMyParticipation();
  const submissions = submissionsData?.data || [];
  const isParticipant = !!participation?.data;

  const stats = useMemo(() => {
    const days = submissions.map((s) => s.day);
    const streak = calculateCurrentStreak(days);
    return {
      streak,
      total: days.length,
      daysRemaining: CHALLANGE_DATA.durationInDays - days.length,
    };
  }, [submissions]);

  const isCompleted = stats.daysRemaining <= 0;

  return (
    <div className="min-h-screen bg-background space-y-8">
      {/* Header & Actions */}
      <div className="flex gap-4 flex-col-reverse @3xl:flex-row">
        <div className="flex-1 space-y-8">
          {isLoading ? (
            <Skeleton className="h-[200px]" />
          ) : participation?.data ? (
            <div className="space-y-8">
              <RewardCard participation={participation.data} />
              {isCompleted ? (
                <Card className="relative overflow-hidden border-2 border-primary/20 bg-primary/5">
                  <Confetti
                    className="absolute inset-0 z-0 pointer-events-none w-full h-full"
                  />
                  <CardHeader className="relative z-10">
                    <CardTitle className="text-2xl text-center text-primary flex items-center justify-center gap-2">
                      <Trophy className="h-8 w-8" />
                      Challenge Completed!
                    </CardTitle>
                    <CardDescription className="text-center text-lg mt-2 font-medium">
                      {CHALLANGE_DATA.messageAfterCompletion}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ) : participation.data.startedAt ? (
                <SubmitProgressCard />
              ) : (
                isEventStarted() && <StartChallengeCard />
              )}
            </div>
          ) : (
            <EnrollRewardCard />
          )}
          {!participation?.data && <ParticipateToChallenge />}

          {/* Stats Grid */}
          {isParticipant && participation.data?.startedAt && (
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Current Streak</CardDescription>
                  <CardTitle className="text-3xl flex items-center gap-2">
                    <Flame className="h-6 w-6 text-orange-500" />
                    {stats.streak}
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total Submissions</CardDescription>
                  <CardTitle className="text-3xl flex items-center gap-2">
                    <Trophy className="h-6 w-6 text-yellow-500" />
                    {stats.total}
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Days Remaining</CardDescription>
                  <CardTitle className="text-3xl flex items-center gap-2">
                    <Calendar className="h-6 w-6 text-blue-500" />
                    {Math.max(0, stats.daysRemaining)}
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>
          )}
        </div>
        <div className="w-full @3xl:w-auto @3xl:max-w-sm">
          <SponsorCard />
        </div>
      </div>

      {/* Submissions Table */}
      {isParticipant && (
        <Card>
          <CardHeader>
            <CardTitle>My Submissions</CardTitle>
            <CardDescription>
              A history of your daily learning progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submissions.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Day</TableHead>
                    <TableHead>Summary</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Link</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.map((sub) => (
                    <TableRow key={sub.id}>
                      <TableCell className="font-medium">
                        Day {sub.day}
                      </TableCell>
                      <TableCell className="max-w-[300px] truncate" title={sub.summary}>
                        {sub.summary}
                      </TableCell>
                      <TableCell>
                        {format(new Date(sub.createdAt), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <a
                            href={sub.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            View Post <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No submissions yet. Start your journey today!
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
