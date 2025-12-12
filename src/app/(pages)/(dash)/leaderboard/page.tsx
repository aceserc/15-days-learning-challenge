"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { api } from "@/queries";
import { LeaderboardWithUser } from "@/queries/leaderboard/action";
import { Loader2 } from "lucide-react";

export default function LeaderboardPage() {
  const { data, isLoading, error } = api.leaderboard.useGetLeaderboard();

  //create mock data matching above type to render full ui
  const mockLeaderboardWithUser: LeaderboardWithUser[] = [
    {
      userId: "user_001",
      currentStreak: 5,
      latestDay: 12,
      totalSubmissions: 48,
      rank: 1,
      techfestId: "tf_2025_01",
      updatedAt: new Date(),

      name: "आदित्य श्रेष्ठ",
      email: "aaditya@example.com",
      image: "https://example.com/avatar1.png",
      domain: "Software Engineering",
    },
    {
      userId: "user_002",
      currentStreak: 4,
      latestDay: 12,
      totalSubmissions: 45,
      rank: 2,
      techfestId: "tf_2025_01",
      updatedAt: new Date(),

      name: "सुनिता थापा",
      email: "sunita@example.com",
      image: "https://example.com/avatar2.png",
      domain: "AI & ML",
    },
    {
      userId: "user_003",
      currentStreak: 3,
      latestDay: 11,
      totalSubmissions: 40,
      rank: 3,
      techfestId: "tf_2025_01",
      updatedAt: new Date(),

      name: "बिबेक गुरुङ",
      email: "bibek@example.com",
      image: "https://example.com/avatar3.png",
      domain: "Cybersecurity",
    },
    {
      userId: "user_004",
      currentStreak: 2,
      latestDay: 10,
      totalSubmissions: 32,
      rank: 4,
      techfestId: "tf_2025_01",
      updatedAt: new Date(),

      name: "अनिता भण्डारी",
      email: "anita@example.com",
      image: "https://example.com/avatar4.png",
      domain: "Cloud Computing",
    },
    {
      userId: "user_005",
      currentStreak: 1,
      latestDay: 9,
      totalSubmissions: 28,
      rank: 5,
      techfestId: "tf_2025_01",
      updatedAt: new Date(),

      name: "प्रकाश अधिकारी",
      email: "prakash@example.com",
      image: "https://example.com/avatar5.png",
      domain: "DevOps",
    }
  ];

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !data?.success) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-destructive">
          Failed to load leaderboard. Please try again later.
        </p>
      </div>
    );
  }

  const participants = data.data || [];
  // const participants = mockLeaderboardWithUser;


  const top3 = participants.slice(0, 3);
  const others = participants.slice(3);

  // Helper to re-arrange top 3 for podium: 2nd, 1st, 3rd
  const podiumOrder = [
    top3[1], // 2nd place
    top3[0], // 1st place
    top3[2], // 3rd place
  ].filter(Boolean); // Filter out undefined if fewer than 3 participants

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 md:p-8 max-w-5xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Leaderboard 🏆</h1>
              <p className="text-muted-foreground">
                Top performers of the challenge
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/home")}
            >
              ← Back to Home
            </Button>
          </div>

          {/* Podium Section */}
          {podiumOrder.length > 0 && (
            <div className="flex items-end justify-center gap-4 min-h-[300px] py-8">
              {podiumOrder.map((participant, index) => {
                if (!participant) return null;

                // Determine styling based on ACTUAL rank (which matches array position logic)
                // BUT we re-ordered the array.
                // top3[1] is rank 2. top3[0] is rank 1. top3[2] is rank 3.

                const isFirst = participant === top3[0];
                const isSecond = participant === top3[1];
                const isThird = participant === top3[2];

                return (
                  <div
                    key={participant.userId}
                    className={cn(
                      "relative flex flex-col items-center p-4 rounded-t-lg transition-all md:w-48 w-1/3",
                      isFirst ? "bg-primary/10 h-64 border-t-4 border-yellow-500" :
                        isSecond ? "bg-muted/50 h-52 border-t-4 border-gray-400" :
                          "bg-muted/30 h-44 border-t-4 border-amber-700"
                    )}
                  >
                    {/* Medal / Badge */}
                    <div className="absolute -top-6">
                      {isFirst && <span className="text-4xl">🥇</span>}
                      {isSecond && <span className="text-4xl">🥈</span>}
                      {isThird && <span className="text-4xl">🥉</span>}
                    </div>

                    {/* Content */}
                    <div className="mt-8 text-center flex flex-col items-center gap-2">
                      <Avatar className={cn("border-2",
                        isFirst ? "w-16 h-16 border-yellow-500" :
                          isSecond ? "w-14 h-14 border-gray-400" :
                            "w-12 h-12 border-amber-700"
                      )}>
                        <AvatarImage src={participant.image || undefined} />
                        <AvatarFallback>
                          {participant.name?.[0]}
                        </AvatarFallback>
                      </Avatar>

                      <div className="font-bold truncate max-w-full px-2" title={participant.name || ""}>
                        {participant.name?.split(" ")[0]}
                      </div>

                      <Badge variant={isFirst ? "default" : "secondary"}>
                        🔥 {participant.currentStreak}
                      </Badge>

                      <div className="text-xs text-muted-foreground mt-1">
                        {participant.totalSubmissions} days
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* List for the rest */}
          {others.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>All Participants</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">Rank</TableHead>
                      <TableHead>Participant</TableHead>
                      <TableHead>Domain</TableHead>
                      <TableHead className="text-center">Streak</TableHead>
                      <TableHead className="text-center">Total Submissions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {others.map((participant) => (
                      <TableRow
                        key={participant.userId}
                        className="hover:bg-muted/50"
                      >
                        <TableCell className="font-medium text-muted-foreground">
                          #{participant.rank}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={participant.image || undefined} />
                              <AvatarFallback>
                                {participant.name?.[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">
                                {participant.name || "Anonymous"}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {participant.domain || "N/A"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="font-mono font-bold">
                            {participant.currentStreak}
                          </span>
                        </TableCell>
                        <TableCell className="text-center text-muted-foreground">
                          {participant.totalSubmissions}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              {participants.length === 0 ? "No participants yet." : ""}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}