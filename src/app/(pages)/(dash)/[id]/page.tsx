import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export default function ProfilePage({ params }: { params: { id: string } }) {
  // Mock data
  const user = {
    id: params.id,
    name: "Alice Johnson",
    email: "alice@example.com",
    image: null,
    domain: "AI/ML",
    linkedInUrl: "https://linkedin.com/in/alicejohnson",
    githubUrl: "https://github.com/alicejohnson",
    streak: 10,
    daysCompleted: 10,
    isDisqualified: false,
    disqualificationReason: null,
  };

  const submissions = [
    {
      id: "1",
      day: 10,
      content: "Implemented a neural network from scratch using NumPy",
      socialLink: "https://twitter.com/alice/status/130",
      createdAt: "2025-12-05T08:00:00Z",
    },
    {
      id: "2",
      day: 9,
      content: "Studied backpropagation algorithm and gradient descent",
      socialLink: "https://twitter.com/alice/status/129",
      createdAt: "2025-12-04T07:45:00Z",
    },
    {
      id: "3",
      day: 8,
      content: "Explored different activation functions and their use cases",
      socialLink: "https://twitter.com/alice/status/128",
      createdAt: "2025-12-03T09:30:00Z",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-8 max-w-4xl">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/leaderboard")}
            >
              ← Back to Leaderboard
            </Button>
          </div>

          {/* Profile Card */}
          <Card>
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.image || undefined} />
                  <AvatarFallback className="text-2xl">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-2xl">{user.name}</CardTitle>
                  <CardDescription className="mt-1">
                    <Badge variant="secondary" className="mt-2">
                      {user.domain}
                    </Badge>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">🔥 {user.streak}</div>
                  <div className="text-sm text-muted-foreground">Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">
                    {user.daysCompleted}/15
                  </div>
                  <div className="text-sm text-muted-foreground">Days</div>
                </div>
                <div className="text-center">
                  <Badge
                    variant={user.isDisqualified ? "destructive" : "default"}
                    className="text-lg px-4 py-2"
                  >
                    {user.isDisqualified ? "Disqualified" : "Active"}
                  </Badge>
                </div>
              </div>

              <Separator />

              {/* Links */}
              <div className="flex gap-4">
                {user.linkedInUrl && (
                  <Button variant="outline" asChild>
                    <a
                      href={user.linkedInUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn →
                    </a>
                  </Button>
                )}
                {user.githubUrl && (
                  <Button variant="outline" asChild>
                    <a
                      href={user.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub →
                    </a>
                  </Button>
                )}
              </div>

              {/* Disqualification Notice */}
              {user.isDisqualified && user.disqualificationReason && (
                <div className="bg-destructive/10 border border-destructive rounded-lg p-4">
                  <p className="text-sm font-medium text-destructive">
                    Disqualification Reason: {user.disqualificationReason}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submissions */}
          <Card>
            <CardHeader>
              <CardTitle>Learning Journey</CardTitle>
              <CardDescription>
                All daily submissions by {user.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {submissions.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No submissions yet
                  </p>
                ) : (
                  submissions.map((submission, index) => (
                    <div key={submission.id}>
                      {index > 0 && <Separator className="my-4" />}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">Day {submission.day}</Badge>
                          <span className="text-sm text-muted-foreground">
                            {new Date(submission.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
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
