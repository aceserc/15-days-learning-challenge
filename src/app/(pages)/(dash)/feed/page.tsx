import { FeedList } from "./feed-list";
import { SponsorCard } from "@/components/sponsor-card";

export default function FeedPage() {
  return (
    <div className="container max-w-7xl py-6 mx-auto">
      <div className="flex gap-8">
        <div className="space-y-6 flex-1">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">
              Community Feed
            </h1>
          </div>
          <FeedList />
        </div>
        <div className="mt-20">
          <SponsorCard name="" />
        </div>
      </div>
    </div>
  );
}
