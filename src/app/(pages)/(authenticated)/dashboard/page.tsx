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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

export default function DashboardPage() {
  // Mock data
  const userData = {
    name: "John Doe",
    email: "john@example.com",
    domain: "Web Development",
    streak: 7,
    daysCompleted: 7,
    isDisqualified: false,
    disqualificationReason: null,
  };

  const submissions = [
    {
      id: "1",
      day: 7,
      content: "Learned about Next.js 15 App Router and Server Components",
      socialLink: "https://twitter.com/user/status/123",
      createdAt: "2025-12-05T10:30:00Z",
    },
    {
      id: "2",
      day: 6,
      content: "Deep dive into React Server Components and streaming",
      socialLink: "https://twitter.com/user/status/122",
      createdAt: "2025-12-04T09:15:00Z",
    },
    {
      id: "3",
      day: 5,
      content: "Explored Tailwind CSS v4 and new features",
      socialLink: "https://twitter.com/user/status/121",
      createdAt: "2025-12-03T14:20:00Z",
    },
  ];

  const progressPercentage = (userData.daysCompleted / 15) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-8 max-w-6xl">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">
                Track your progress and submit daily learnings
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/home")}
            >
              ← Back to Home
            </Button>
          </div>

          {/* Disqualification Banner */}
          {userData.isDisqualified && (
            <Card className="border-destructive bg-destructive/10">
              <CardHeader>
                <CardTitle className="text-destructive">
                  ⚠️ Disqualified
                </CardTitle>
                <CardDescription>
                  Reason: {userData.disqualificationReason || "Missed a day"}
                </CardDescription>
              </CardHeader>
            </Card>
          )}

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Streak</CardDescription>
                <CardTitle className="text-3xl">🔥 {userData.streak}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Progress</CardDescription>
                <CardTitle className="text-3xl">
                  {userData.daysCompleted}/15
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Domain</CardDescription>
                <CardTitle className="text-lg">
                  <Badge variant="secondary">{userData.domain}</Badge>
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Status</CardDescription>
                <CardTitle className="text-lg">
                  <Badge
                    variant={
                      userData.isDisqualified ? "destructive" : "default"
                    }
                  >
                    {userData.isDisqualified ? "Disqualified" : "Active"}
                  </Badge>
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Progress Bar */}
          <Card>
            <CardHeader>
              <CardTitle>Challenge Progress</CardTitle>
              <CardDescription>
                {userData.daysCompleted} of 15 days completed (
                {Math.round(progressPercentage)}%)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={progressPercentage} className="h-3" />
            </CardContent>
          </Card>

          {/* Daily Submission Form */}
          {!userData.isDisqualified && (
            <Card>
              <CardHeader>
                <CardTitle>Submit Today's Learning</CardTitle>
                <CardDescription>
                  Share what you learned today (Day {userData.daysCompleted + 1}
                  )
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="learning">What did you learn today?</Label>
                    <Textarea
                      id="learning"
                      placeholder="Describe what you learned today..."
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="social-link">Social Media Link</Label>
                    <Input
                      id="social-link"
                      type="url"
                      placeholder="https://twitter.com/user/status/..."
                    />
                    <p className="text-xs text-muted-foreground">
                      Link to your post where you shared today's learning
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="confirm-tags" />
                    <Label
                      htmlFor="confirm-tags"
                      className="text-sm font-normal cursor-pointer"
                    >
                      I confirm that I have tagged the sponsor and ACES in my
                      post
                    </Label>
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Submit Learning
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Previous Submissions */}
          <Card>
            <CardHeader>
              <CardTitle>Your Submissions</CardTitle>
              <CardDescription>All your daily learning entries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {submissions.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No submissions yet. Start your journey today!
                  </p>
                ) : (
                  submissions.map((submission, index) => (
                    <div key={submission.id}>
                      {index > 0 && <Separator className="my-4" />}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">Day {submission.day}</Badge>
                          <span className="text-sm text-muted-foreground">
                            {new Date(
                              submission.createdAt
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm">{submission.content}</p>
                        {submission.socialLink && (
                          <a
                            href={submission.socialLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                          >
                            View Post →
                          </a>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
