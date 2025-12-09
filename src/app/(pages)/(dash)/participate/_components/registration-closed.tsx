import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CalendarOff } from "lucide-react";
import Link from "next/link";

export const RegistrationClosed = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Participate</h3>
        <p className="text-sm text-muted-foreground">
          Registration for the challenge is currently closed.
        </p>
      </div>
      <Separator />
      <div className="min-h-[50vh] flex items-center justify-center">
        <Card className="max-w-md w-full border-destructive/20 bg-destructive/5">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 bg-destructive/10 p-3 rounded-full w-fit">
              <CalendarOff className="h-10 w-10 text-destructive" />
            </div>
            <CardTitle className="text-xl text-destructive">
              Registration Closed
            </CardTitle>
            <CardDescription className="text-base mt-2">
              We're sorry, but the registration period for this challenge has
              ended.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center pb-8">
            <p className="mb-6 text-muted-foreground">
              Please check back later for upcoming events and challenges. Try
              again next year!
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link href="/">Back to Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
