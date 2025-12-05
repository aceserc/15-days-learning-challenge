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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function HomePage() {
  const [isEnrolled, setIsEnrolled] = useState(false);

  // Mock data for demonstration
  const mockUserData = {
    name: "John Doe",
    email: "john@example.com",
    streak: 5,
    daysCompleted: 5,
    domain: "Web Development",
  };

  if (isEnrolled) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto p-8 max-w-4xl">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">
                  Welcome back, {mockUserData.name}! 👋
                </h1>
                <p className="text-muted-foreground">
                  Keep up the great work on your learning journey
                </p>
              </div>
              <Button variant="outline">Sign Out</Button>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Current Streak</CardDescription>
                  <CardTitle className="text-4xl">
                    🔥 {mockUserData.streak}
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Days Completed</CardDescription>
                  <CardTitle className="text-4xl">
                    {mockUserData.daysCompleted}/15
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Domain</CardDescription>
                  <CardTitle className="text-xl">
                    <Badge variant="secondary">{mockUserData.domain}</Badge>
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Submission</CardTitle>
                <CardDescription>Share what you learned today</CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="lg" className="w-full">
                  Submit Today's Learning →
                </Button>
              </CardContent>
            </Card>

            {/* Sponsor Info */}
            <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <CardHeader>
                <CardTitle>Challenge Sponsor</CardTitle>
                <CardDescription>
                  Supported by our amazing partners
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">
                  Don't forget to tag our sponsors in your daily posts!
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Badge>@SponsorName</Badge>
                  <Badge>@ACES</Badge>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => (window.location.href = "/dashboard")}
              >
                View Dashboard
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => (window.location.href = "/leaderboard")}
              >
                View Leaderboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-8 max-w-2xl">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold">Join the Challenge! 🚀</h1>
            <p className="text-muted-foreground">
              Complete the form below to start your 15-day learning journey
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Participation Form</CardTitle>
              <CardDescription>
                Fill in your details to enroll in the challenge
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    defaultValue={mockUserData.name}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={mockUserData.email}
                    disabled
                  />
                  <p className="text-xs text-muted-foreground">
                    Email is auto-filled from your Google account
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="domain">Learning Domain</Label>
                  <Select>
                    <SelectTrigger id="domain">
                      <SelectValue placeholder="Select your domain" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ai-ml">AI/ML</SelectItem>
                      <SelectItem value="cybersecurity">
                        Cybersecurity
                      </SelectItem>
                      <SelectItem value="web">Web Development</SelectItem>
                      <SelectItem value="app">App Development</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    You cannot change this after enrollment
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn URL</Label>
                  <Input
                    id="linkedin"
                    type="url"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="github">GitHub URL</Label>
                  <Input
                    id="github"
                    type="url"
                    placeholder="https://github.com/username"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsEnrolled(true);
                  }}
                >
                  Enroll in Challenge
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
