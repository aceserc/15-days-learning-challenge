"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SponsorCard } from "@/components/sponsor-card";
import { isDeadlineOver, isEventStarted } from "@/lib/event";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import NotStarted from "./_components/not-started";
import { DeadlineOver } from "./_components/deadline-over";
import { SubmissionList } from "./_components/submission-list";
import { SubmitForm } from "./_components/submit-form";
import { api } from "@/queries";
import { StartChallengeCard } from "../(dashboard)/_components/start-challenge-card";
import { Loading } from "@/components/ui/loading";

const SubmissionsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentTab = searchParams.get("tab") || "submit";

  const isStarted = isEventStarted();

  const handleTabChange = (val: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", val);
    router.push(`?${params.toString()}`);
  };

  const { data: participation, isLoading } =
    api.participate.useGetMyParticipation();

  if (!isStarted) {
    return <NotStarted />;
  }

  if (isLoading) {
    return <Loading>Checking challenge status...</Loading>;
  }

  const participant = participation?.data;
  const hasStartedChallenge = !!participant?.startedAt;
  const isOver = isDeadlineOver(participant?.startedAt);

  return (
    <div className="flex gap-4">
      <div className="col-span-1 space-y-6 lg:col-span-8 flex-1">
        <Tabs
          defaultValue="submit"
          value={currentTab}
          onValueChange={handleTabChange}
          variant="underline"
          className="w-full"
        >
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
            <TabsTrigger
              value="submit"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
            >
              Submit Progress
            </TabsTrigger>
            <TabsTrigger
              value="my-submissions"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
            >
              My Submissions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="submit" className="mt-6">
            {!hasStartedChallenge ? (
              <div className="max-w-xl mx-auto">
                <StartChallengeCard />
              </div>
            ) : isOver ? (
              <DeadlineOver startedAt={participant?.startedAt} />
            ) : (
              <SubmitForm startedAt={participant.startedAt} />
            )}
          </TabsContent>

          <TabsContent value="my-submissions" className="mt-6">
            <SubmissionList />
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-20 hidden @3xl:block">
        <SponsorCard />
      </div>
    </div>
  );
};

export default SubmissionsPage;
