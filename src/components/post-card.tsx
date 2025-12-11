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
import { deleteSubmission } from "@/queries/submissions/actions";
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
import { useState } from "react";
import toast from "react-hot-toast";
import { confirm } from "@/components/ui/alert-utils";
import { useQueryClient } from "@tanstack/react-query";

interface PostCardProps {
  submission: {
    id: string;
    day: number;
    summary: string;
    link: string;
    createdAt: Date;
  };
  user: {
    name: string | null;
    image: string | null;
    id: string;
  } | null;
}

export const PostCard = ({ submission, user }: PostCardProps) => {
  const { data: session } = useSession();
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(0); // Demo count
  const queryClient = useQueryClient();

  const handleUpvote = () => {
    setIsUpvoted(!isUpvoted);
    setUpvoteCount((prev) => (isUpvoted ? prev - 1 : prev + 1));
  };

  const handleDownload = () => {
    // Demo download functionality: create a text file with summary
    const element = document.createElement("a");
    const file = new Blob([submission.summary], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `day-${submission.day}-submission.txt`;
    document.body.appendChild(element);
    element.click();
  };

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
        {session?.user?.id === user?.id && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={handleDelete}
                className="text-destructive focus:text-destructive cursor-pointer"
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
            onClick={handleUpvote}
            className={cn(
              "text-muted-foreground gap-2 transition-colors",
              isUpvoted && "text-primary bg-primary/10"
            )}
          >
            <ArrowBigUp className={cn(isUpvoted && "fill-current")} />
            {upvoteCount > 0 && <span>{upvoteCount}</span>}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDownload}
            className="text-muted-foreground gap-2"
          >
            <ArrowBigDown className="h-4 w-4" />
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
