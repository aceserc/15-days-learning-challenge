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
import toast from "react-hot-toast";
import { confirm } from "@/components/ui/alert-utils";
import { useQueryClient } from "@tanstack/react-query";
import { Submission } from "@/db/schema";
import { User } from "next-auth";
import { api } from "@/queries";
import { parseError } from "@/lib/parse-error";

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
  const deleteSubmission = api.submissions.useDeleteSubmission();

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
        await deleteSubmission.mutateAsync(submission.id);
        toast.success("Submission deleted successfully");
      } catch (error) {
        toast.error(parseError(error, "Failed to delete submission"));
      }
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
          <Link href={`/u/${user?.id}`} className="hover:underline w-fit">
            {user?.name || "Unknown User"}
          </Link>
          <span className="text-sm text-muted-foreground">
            Day {submission.day} •{" "}
            {formatRelative(new Date(submission.createdAt), new Date())}
          </span>
        </div>
        {isOwner && (
          <Button
            disabled={deleteSubmission.isPending}
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
        <p className="text-sm whitespace-pre-wrap leading-relaxed bg-muted p-2 rounded-md">
          {submission.summary}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t bg-muted/20 px-4 pt-4!">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            disabled={isOwner}
            className={cn(
              "text-muted-foreground gap-2 transition-colors hover:text-green-500 hover:bg-green-500/10"
              // voteState.userVote === "up" && "text-green-500 bg-green-500/10"
            )}
          >
            <ArrowBigUp
            // className={cn(voteState.userVote === "up" && "fill-current")}
            />
            {submission.voteCount > 0 && <span>{submission.voteCount}</span>}
          </Button>

          <Button
            disabled={isOwner}
            variant="ghost"
            size="sm"
            className={cn(
              "text-muted-foreground gap-2 transition-colors hover:text-red-500 hover:bg-red-500/10"
              // voteState.userVote === "down" && "text-red-500 bg-red-500/10"
            )}
          >
            <ArrowBigDown
            //  className={cn(voteState.userVote === "down" && "fill-current")}
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
