"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MagicCard } from "@/components/ui/magic-card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/queries";
import { Rocket } from "lucide-react";
import Link from "next/link";

const ParticipateToChallenge = () => {
  const participation = api.participate.useGetMyParticipation();

  if (participation.isLoading) {
    return <Skeleton className="h-[180px]" />;
  }

  if (participation.data?.data) {
    return <div>do submission</div>;
  }

  return (
    <MagicCard
      className="rounded-md"
      gradientOpacity={0.1}
      gradientColor="var(--border)"
    >
      <Card className="bg-liner-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle className="text-2xl">
              15-Day Learning Challenge
            </CardTitle>
            <CardDescription>
              Join others in this journey to learn and build together!
            </CardDescription>
          </div>
          <Rocket className="h-8 w-8 text-primary hidden @md:block" />
        </CardHeader>
        <CardContent className="flex justify-end">
          <Button asChild size="lg">
            <Link href="/participate">Join the Challenge</Link>
          </Button>
        </CardContent>
      </Card>
    </MagicCard>
  );
};

export { ParticipateToChallenge };
