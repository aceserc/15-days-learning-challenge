"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ComingSoon } from "@/components/coming-soon";

export default function LeaderboardPage() {
  return <ComingSoon />;

  // Mock data
  const participants = [
    {
      id: "1",
      name: "Alice Johnson",
      domain: "AI/ML",
      streak: 10,
      daysCompleted: 10,
      isFirstPoster: true,
      isDisqualified: false,
      image: null,
    },
    {
      id: "2",
      name: "Bob Smith",
      domain: "Web Development",
      streak: 10,
      daysCompleted: 10,
      isFirstPoster: false,
      isDisqualified: false,
      image: null,
    },
    {
      id: "3",
      name: "Charlie Brown",
      domain: "Cybersecurity",
      streak: 9,
      daysCompleted: 9,
      isFirstPoster: false,
      isDisqualified: false,
      image: null,
    },
    {
      id: "4",
      name: "Diana Prince",
      domain: "App Development",
      streak: 8,
      daysCompleted: 8,
      isFirstPoster: false,
      isDisqualified: false,
      image: null,
    },
    {
      id: "5",
      name: "Eve Wilson",
      domain: "Web Development",
      streak: 0,
      daysCompleted: 5,
      isFirstPoster: false,
      isDisqualified: true,
      image: null,
    },
  ];

  const activeParticipants = participants.filter((p) => !p.isDisqualified);
  const disqualifiedParticipants = participants.filter((p) => p.isDisqualified);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-8 max-w-6xl">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Leaderboard 🏆</h1>
              <p className="text-muted-foreground">
                See how everyone is performing in the challenge
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/home")}
            >
              ← Back to Home
            </Button>
          </div>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total Participants</CardDescription>
                <CardTitle className="text-3xl">
                  {participants.length}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Active</CardDescription>
                <CardTitle className="text-3xl text-green-600">
                  {activeParticipants.length}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Disqualified</CardDescription>
                <CardTitle className="text-3xl text-destructive">
                  {disqualifiedParticipants.length}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Active Participants Table */}
          <Card>
            <CardHeader>
              <CardTitle>Active Participants</CardTitle>
              <CardDescription>
                Sorted by streak (highest first), then by earliest submission
                time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Rank</TableHead>
                    <TableHead>Participant</TableHead>
                    <TableHead>Domain</TableHead>
                    <TableHead className="text-center">Streak</TableHead>
                    <TableHead className="text-center">Days</TableHead>
                    <TableHead className="text-center">Badges</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeParticipants.map((participant, index) => (
                    <TableRow
                      key={participant.id}
                      className="cursor-pointer hover:bg-muted/50"
                    >
                      <TableCell className="font-medium">
                        {index === 0 && "🥇"}
                        {index === 1 && "🥈"}
                        {index === 2 && "🥉"}
                        {index > 2 && `#${index + 1}`}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={participant.image || undefined} />
                            <AvatarFallback>
                              {participant.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {participant.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              View Profile →
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{participant.domain}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="text-lg">🔥 {participant.streak}</span>
                      </TableCell>
                      <TableCell className="text-center font-medium">
                        {participant.daysCompleted}/15
                      </TableCell>
                      <TableCell className="text-center">
                        {participant.isFirstPoster && (
                          <Badge
                            variant="default"
                            className="bg-gradient-to-r from-yellow-500 to-orange-500"
                          >
                            ⚡ First Poster
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Disqualified Participants */}
          {disqualifiedParticipants.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Disqualified Participants</CardTitle>
                <CardDescription>
                  Participants who missed a day or were disqualified
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Participant</TableHead>
                      <TableHead>Domain</TableHead>
                      <TableHead className="text-center">
                        Days Completed
                      </TableHead>
                      <TableHead className="text-center">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {disqualifiedParticipants.map((participant) => (
                      <TableRow key={participant.id} className="opacity-60">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage
                                src={participant.image || undefined}
                              />
                              <AvatarFallback>
                                {participant.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">
                              {participant.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{participant.domain}</Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          {participant.daysCompleted}/15
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="destructive">Disqualified</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
