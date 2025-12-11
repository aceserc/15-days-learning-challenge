"use client";

import { PostCard } from "@/components/post-card";
import { Loading } from "@/components/ui/loading";
import { useGetMySubmissions } from "@/queries/submissions/hooks";
import { FileText } from "lucide-react";

export const SubmissionList = () => {
  const { data: submissions, isLoading } = useGetMySubmissions();

  if (isLoading) {
    return (
      <div className="py-12">
        <Loading>Loading your submissions...</Loading>
      </div>
    );
  }

  if (!submissions?.data || submissions.data.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <div className="mx-auto bg-muted/50 rounded-full w-16 h-16 flex items-center justify-center mb-4">
          <FileText className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium">No submissions yet</h3>
        <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
          You haven't submitted any daily challenges yet. Start by going to the
          "Submit" tab!
        </p>
      </div>
    );
  }

  return (
    <div className="gap-4 py-4 grid-cols-3 grid">
      {submissions.data.map((submission) => (
        <PostCard
          key={submission.id}
          submission={{
            id: submission.id,
            day: submission.day,
            summary: submission.summary,
            link: submission.link,
            createdAt: new Date(submission.createdAt),
          }}
          user={submission.user}
        />
      ))}
    </div>
  );
};
