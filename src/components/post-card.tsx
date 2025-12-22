"use client";

import { confirm } from "@/components/ui/alert-utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { DOMAINS } from "@/content/domains";
import { Participant, Submission } from "@/db/schema";
import { parseError } from "@/lib/parse-error";
import { cn } from "@/lib/utils";
import { api } from "@/queries";
import { formatRelative } from "date-fns";
import { ArrowBigDown, ArrowBigUp, ExternalLink, Trash } from "lucide-react";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

interface PostCardProps {
  submission: Submission & {
    user: User;
    userVote?: "up" | "down" | null;
    participant?: Participant;
  };
}

export const PostCard = ({
  submission: { user, userVote: initialUserVote, ...submission },
}: PostCardProps) => {
  const { data: session } = useSession();
  const deleteSubmissionMutation = api.submissions.useDeleteSubmission();
  const voteSubmissionMutation = api.submissions.useVoteSubmission();

  const [isVoting, setIsVoting] = useState(false);
  const [voteState, setVoteState] = useState({
    userVote: initialUserVote,
    count: submission.voteCount,
  });

  const isOwner = session?.user?.id === user?.id;

  const handleDelete = async () => {
    const confirmed = await confirm({
      title: "Delete Submission?",
      description:
        "Are you sure you want to delete this submission? This action cannot be undone.",
      actionText: "Delete",
      variant: "destructive",
    });

    if (confirmed) {
      try {
        await deleteSubmissionMutation.mutateAsync(submission.id);
        toast.success("Submission deleted successfully");
      } catch (error) {
        toast.error(parseError(error, "Failed to delete submission"));
      }
    }
  };

  const handleVote = async (type: "up" | "down") => {
    if (isVoting) return;
    setIsVoting(true);

    try {
      const res = await voteSubmissionMutation.mutateAsync({
        submissionId: submission.id,
        type,
      });

      if (res.success) {
        setVoteState((prev) => {
          let newVote = prev.userVote;
          let newCount = prev.count;

          if (prev.userVote === type) {
            // Toggle off (remove vote)
            newVote = null;
            if (type === "up") newCount -= 1;
            else newCount += 1;
          } else {
            // Change vote or new vote
            if (prev.userVote === "up" && type === "down") {
              // Changed from up to down: -1 (remove up) + -1 (add down) = -2
              newCount -= 2;
            } else if (prev.userVote === "down" && type === "up") {
              // Changed from down to up: +1 (remove down) + +1 (add up) = +2
              newCount += 2;
            } else {
              // Null to vote
              if (type === "up") newCount += 1;
              else newCount -= 1;
            }
            newVote = type;
          }
          return { userVote: newVote, count: newCount };
        });
      } else {
        toast.error(res.error || "Failed to vote");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <Card className="overflow-hidden border-none shadow-md bg-card/50 gap-4 relative group py-4!">
      <CardHeader className="flex flex-row items-center gap-4">
        <Link href={`/u/${user?.id}`} className="cursor-pointer">
          <Avatar className="h-10 w-10 border">
            <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
            <AvatarFallback>
              {user?.name?.slice(0, 2).toUpperCase() || "US"}
            </AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex flex-col flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <Link href={`/u/${user?.id}`} className="hover:underline font-medium">
              {user?.name || "Unknown User"}
            </Link>
            {submission.participant?.domain && (
              <Badge variant="outline" className="text-sm h-5 px-1.5 font-normal text-muted-foreground">
                {DOMAINS.find((d) => d.id === submission.participant?.domain)?.title}
              </Badge>
            )}
          </div>
          <span className="text-sm text-muted-foreground">
            Day {submission.day} •{" "}
            {formatRelative(new Date(submission.createdAt), new Date())}
          </span>
        </div>
        {isOwner && (
          <Button
            disabled={deleteSubmissionMutation.isPending}
            variant={"ghost"}
            size={"icon-sm"}
            onClick={handleDelete}
            className="text-destructive focus:text-destructive cursor-pointer"
          >
            <Trash />
          </Button>
        )}
      </CardHeader>
      <CardContent className="px-4">
        <p className="text-md whitespace-pre-wrap leading-relaxed bg-muted p-2 rounded-md">
          {submission.summary}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t bg-muted/20 px-4 pt-4!">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            disabled={isOwner || isVoting}
            onClick={() => handleVote("up")}
            className={cn(
              "text-muted-foreground gap-2 transition-colors hover:text-green-500 hover:bg-green-500/10",
              voteState.userVote === "up" && "text-green-500 bg-green-500/10"
            )}
          >
            <ArrowBigUp
              className={cn(voteState.userVote === "up" && "fill-current")}
            />
            {voteState.count > 0 && <span>{voteState.count}</span>}
          </Button>

          <Button
            disabled={isOwner || isVoting}
            variant="ghost"
            size="sm"
            onClick={() => handleVote("down")}
            className={cn(
              "text-muted-foreground gap-2 transition-colors hover:text-red-500 hover:bg-red-500/10",
              voteState.userVote === "down" && "text-red-500 bg-red-500/10"
            )}
          >
            <ArrowBigDown
              className={cn(voteState.userVote === "down" && "fill-current")}
            />
          </Button>
        </div>
        <Button variant="outline" size="sm" asChild className="gap-2">
          <Link href={submission.link} target="_blank">
            View Post <ExternalLink className="h-3 w-3" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

