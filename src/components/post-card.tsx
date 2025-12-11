"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatRelative } from "date-fns";
import {
  ArrowBigDown,
  ArrowBigUp,
  Download,
  ExternalLink,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(0); // Demo count

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

  return (
    <Card className="overflow-hidden border-none shadow-md bg-card/50 gap-4">
      <CardHeader className="flex flex-row items-center gap-4 pb-4">
        <Link href={`/u/${user?.id}`} className="cursor-pointer">
          <Avatar className="h-10 w-10 border">
            <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
            <AvatarFallback>
              {user?.name?.slice(0, 2).toUpperCase() || "US"}
            </AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex flex-col">
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
