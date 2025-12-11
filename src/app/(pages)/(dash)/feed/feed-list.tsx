"use client";

import { Loader2 } from "lucide-react";
import { Fragment } from "react";
import { PostCard } from "@/components/post-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/queries";

export const FeedList = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    isLoading,
  } = api.submissions.useGetFeedSubmissions();

  if (isLoading) {
    return (
      <div className="space-y-6">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <div key={`skeleton-${index}`} className="space-y-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[150px]" />
              </div>
            </div>
            <Skeleton className="h-[100px] w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="p-8 text-center border border-destructive/20 rounded-lg bg-destructive/5 text-destructive">
        <p>Error: {error?.message}</p>
        <Button
          variant="outline"
          className="mt-4 border-destructive/20 hover:bg-destructive/10 text-destructive"
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </div>
    );
  }

  if (!data?.pages[0]?.submissions.length) {
    return (
      <div className="text-center py-12 border rounded-lg bg-muted/20 border-dashed">
        <p className="text-muted-foreground">
          No submissions found yet. Be the first to post!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {data.pages.map((page, pageIndex) => (
        <Fragment key={`page-${pageIndex}`}>
          {page?.submissions?.map((sub) => (
            <PostCard key={sub.id} submission={sub} />
          ))}
        </Fragment>
      ))}

      <div className="flex justify-center pt-8 pb-4">
        {isFetchingNextPage ? (
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        ) : hasNextPage ? (
          <Button
            variant="ghost"
            onClick={() => fetchNextPage()}
            className="text-muted-foreground"
          >
            Load More
          </Button>
        ) : (
          <p className="text-xs text-muted-foreground">
            You have reached the end of the feed.
          </p>
        )}
      </div>
    </div>
  );
};
