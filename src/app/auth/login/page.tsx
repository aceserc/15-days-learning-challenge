import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function LoginPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Login */}
      <div className="flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">
              Welcome to ACES
            </h1>
            <p className="text-muted-foreground">15-Day Learning Challenge</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Continue with your Google account to participate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" size="lg">
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Side - Info */}
      <div className="hidden lg:flex items-center justify-center p-8 bg-muted">
        <Card className="max-w-lg">
          <CardHeader>
            <CardTitle className="text-2xl">
              ACES 15-Day Learning Challenge
            </CardTitle>
            <CardDescription>
              Transform your learning journey with daily commitment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Badge variant="secondary">1</Badge>
                  Daily Learning
                </h3>
                <p className="text-sm text-muted-foreground">
                  Learn something new every day for 15 consecutive days
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Badge variant="secondary">2</Badge>
                  Share Your Progress
                </h3>
                <p className="text-sm text-muted-foreground">
                  Post daily on social media with proper tags and sponsor
                  mentions
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Badge variant="secondary">3</Badge>
                  Stay Consistent
                </h3>
                <p className="text-sm text-muted-foreground">
                  Missing a single day results in disqualification - consistency
                  is key!
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Badge variant="secondary">4</Badge>
                  Choose Your Domain
                </h3>
                <p className="text-sm text-muted-foreground">
                  Select from AI/ML, Cybersecurity, Web Development, or App
                  Development
                </p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm font-medium text-destructive">
                ⚠️ Important: You can only submit once per day. Missing a day
                will automatically disqualify you from the challenge.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
