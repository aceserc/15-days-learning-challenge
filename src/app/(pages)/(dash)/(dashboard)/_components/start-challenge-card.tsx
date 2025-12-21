"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Rocket } from "lucide-react";
import { api } from "@/queries";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function StartChallengeCard() {
  const queryClient = useQueryClient();
  const { mutate: start, isPending } = api.participate.useStartChallenge({
    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message!);
        queryClient.invalidateQueries({ queryKey: ["participation"] });
      } else {
        toast.error(res.error!);
      }
    },
    onError: (err) => {
      toast.error(err.message || "Failed to start challenge");
    },
  });

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Rocket className="h-5 w-5 text-primary" />
          Ready to begin?
        </CardTitle>
        <CardDescription>
          Your 15-day learning journey starts when you click the button below.
          Make sure you're ready to commit to learning daily!
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-end">
        <Button
          onClick={() => start()}
          disabled={isPending}
          className="w-full sm:w-auto"
        >
          {isPending ? "Starting..." : "Start My Challenge"}
        </Button>
      </CardContent>
    </Card>
  );
}
