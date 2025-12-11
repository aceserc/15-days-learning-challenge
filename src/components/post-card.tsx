"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  deleteSubmission,
  voteSubmission,
} from "@/queries/submissions/actions";
import { formatRelative } from "date-fns";
import {
  ArrowBigDown,
  ArrowBigUp,
  ExternalLink,
  MoreVertical,
  Trash,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { confirm } from "@/components/ui/alert-utils";
import { useQueryClient } from "@tanstack/react-query";
import { Submission } from "@/db/schema";
import { User } from "next-auth";

interface PostCardProps {
  submission: Submission & {
    user: User;
  };
}

export const PostCard = ({
  submission: { user, ...submission },
}: PostCardProps) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

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
      const res = await deleteSubmission(submission.id);
      if (res.success) {
        toast.success(res.message);
        queryClient.invalidateQueries({ queryKey: ["getMySubmissions"] });
      } else {
        toast.error(res.error || "Failed to delete submission");
      }
    }
  };

  return (
    <Card className="overflow-hidden border-none shadow-md bg-card/50 gap-4 relative group">
      <CardHeader className="flex flex-row items-center gap-4 pb-4">
        <Link href={`/u/${user?.id}`} className="cursor-pointer">
          <Avatar className="h-10 w-10 border">
            <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
            <AvatarFallback>
              {user?.name?.slice(0, 2).toUpperCase() || "US"}
            </AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex flex-col flex-1">
          <Link
            href={`/u/${user?.id}`}
            className="text-sm font-semibold hover:underline w-fit"
          >
            {user?.name || "Unknown User"}
          </Link>
          <span className="text-xs text-muted-foreground">
            Day {submission.day} •{" "}
            {formatRelative(new Date(submission.createdAt), new Date())}
          </span>
        </div>
        {isOwner && (
          <Button
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
        <p className="text-sm whitespace-pre-wrap leading-relaxed">
          {submission.summary}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t bg-muted/20 px-4 pt-4!">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
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
