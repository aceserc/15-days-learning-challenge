"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function AdminPage() {
  const [filterDomain, setFilterDomain] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Mock data
  const participants = [
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice@example.com",
      domain: "AI/ML",
      streak: 10,
      daysCompleted: 10,
      isDisqualified: false,
      submissionCount: 10,
    },
    {
      id: "2",
      name: "Bob Smith",
      email: "bob@example.com",
      domain: "Web Development",
      streak: 10,
      daysCompleted: 10,
      isDisqualified: false,
      submissionCount: 10,
    },
    {
      id: "3",
      name: "Charlie Brown",
      email: "charlie@example.com",
      domain: "Cybersecurity",
      streak: 0,
      daysCompleted: 5,
      isDisqualified: true,
      submissionCount: 5,
    },
  ];

  const stats = {
    totalParticipants: participants.length,
    activeParticipants: participants.filter((p) => !p.isDisqualified).length,
    disqualifiedParticipants: participants.filter((p) => p.isDisqualified)
      .length,
    totalSubmissions: participants.reduce(
      (acc, p) => acc + p.submissionCount,
      0
    ),
    averageStreak: Math.round(
      participants.reduce((acc, p) => acc + p.streak, 0) / participants.length
    ),
  };

  const filteredParticipants = participants.filter((p) => {
    if (filterDomain !== "all" && p.domain !== filterDomain) return false;
    if (filterStatus === "active" && p.isDisqualified) return false;
    if (filterStatus === "disqualified" && !p.isDisqualified) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-8 max-w-7xl">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Admin Panel 🛠️</h1>
              <p className="text-muted-foreground">
                Manage participants and view analytics
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/home")}
            >
              ← Back to Home
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-5">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total Participants</CardDescription>
                <CardTitle className="text-3xl">
                  {stats.totalParticipants}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Active</CardDescription>
                <CardTitle className="text-3xl text-green-600">
                  {stats.activeParticipants}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Disqualified</CardDescription>
                <CardTitle className="text-3xl text-destructive">
                  {stats.disqualifiedParticipants}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total Submissions</CardDescription>
                <CardTitle className="text-3xl">
                  {stats.totalSubmissions}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Avg Streak</CardDescription>
                <CardTitle className="text-3xl">
                  🔥 {stats.averageStreak}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Filters & Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Filters & Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 flex-wrap">
                <div className="flex-1 min-w-[200px]">
                  <Label>Domain</Label>
                  <Select value={filterDomain} onValueChange={setFilterDomain}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Domains</SelectItem>
                      <SelectItem value="AI/ML">AI/ML</SelectItem>
                      <SelectItem value="Cybersecurity">
                        Cybersecurity
                      </SelectItem>
                      <SelectItem value="Web Development">
                        Web Development
                      </SelectItem>
                      <SelectItem value="App Development">
                        App Development
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1 min-w-[200px]">
                  <Label>Status</Label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="disqualified">Disqualified</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1 min-w-[200px] flex items-end">
                  <Button variant="outline" className="w-full">
                    Export CSV
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Participants Table */}
          <Card>
            <CardHeader>
              <CardTitle>
                Participants ({filteredParticipants.length})
              </CardTitle>
              <CardDescription>
                Manage all challenge participants
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Participant</TableHead>
                    <TableHead>Domain</TableHead>
                    <TableHead className="text-center">Streak</TableHead>
                    <TableHead className="text-center">Days</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredParticipants.map((participant) => (
                    <TableRow key={participant.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
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
                              {participant.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{participant.domain}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        🔥 {participant.streak}
                      </TableCell>
                      <TableCell className="text-center font-medium">
                        {participant.daysCompleted}/15
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={
                            participant.isDisqualified
                              ? "destructive"
                              : "default"
                          }
                        >
                          {participant.isDisqualified
                            ? "Disqualified"
                            : "Active"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              (window.location.href = `/u/${participant.id}`)
                            }
                          >
                            View
                          </Button>
                          {participant.isDisqualified ? (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  Reinstate
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>
                                    Reinstate Participant
                                  </DialogTitle>
                                  <DialogDescription>
                                    Are you sure you want to reinstate{" "}
                                    {participant.name}?
                                  </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                  <Button variant="outline">Cancel</Button>
                                  <Button>Confirm</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          ) : (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="destructive" size="sm">
                                  Disqualify
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>
                                    Disqualify Participant
                                  </DialogTitle>
                                  <DialogDescription>
                                    Provide a reason for disqualifying{" "}
                                    {participant.name}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="reason">Reason</Label>
                                    <Textarea
                                      id="reason"
                                      placeholder="Enter disqualification reason..."
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button variant="outline">Cancel</Button>
                                  <Button variant="destructive">
                                    Disqualify
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
