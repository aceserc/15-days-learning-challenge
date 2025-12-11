"use client";

import { PostCard } from "@/components/post-card";
import { Loading } from "@/components/ui/loading";
import { useGetMySubmissions } from "@/queries/submissions/hooks";
import { FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "nextjs-toploader/app";

export const SubmissionList = () => {
  const { data: submissions, isLoading } = useGetMySubmissions();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="py-24 flex justify-center">
        <Loading>Loading your submissions...</Loading>
      </div>
    );
  }

  if (!submissions?.data || submissions.data.length === 0) {
    return (
      <Card className="border-dashed bg-muted/20 shadow-none">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="rounded-full bg-background p-4 shadow-sm ring-1 ring-border mb-4">
            <FileText className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No submissions yet</h3>
          <p className="text-muted-foreground max-w-sm mb-6">
            You haven't submitted any daily challenges yet. Start building your
            streak today!
          </p>
          <Button onClick={() => router.push("?tab=submit")}>
            <Plus className="mr-2 h-4 w-4" />
            Create First Submission
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col max-w-xl gap-6 mx-auto">
      {submissions.data.map((submission) => (
        <PostCard key={submission.id} submission={submission} />
      ))}
    </div>
  );
};
