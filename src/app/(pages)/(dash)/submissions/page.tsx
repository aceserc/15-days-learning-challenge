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
import { CHALLANGE_DATA } from "@/content/data";
import { Confetti } from "@/components/ui/confetti";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trophy } from "lucide-react";

const SubmissionsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentTab = searchParams.get("tab") || "submit";

  const isStarted = isEventStarted();
  const isOver = isDeadlineOver();

  const handleTabChange = (val: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", val);
    router.push(`?${params.toString()}`);
  };

  const { data: participation, isLoading } = api.participate.useGetMyParticipation();
  const { data: submissionsData } = api.submissions.useGetMySubmissions();


  if (!isStarted) {
    return <NotStarted />;
  }

  if (isLoading) {
    return <Loading>Checking challenge status...</Loading>;
  }

  const participant = participation?.data;
  const hasStartedChallenge = !!participant?.startedAt;

  const submissions = submissionsData?.data || [];
  const days = submissions.map((s) => s.day);
  const daysRemaining = CHALLANGE_DATA.durationInDays - days.length;
  const isCompleted = daysRemaining <= 0;


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
            ) : isCompleted ? (
              <Card className="relative overflow-hidden border-2 border-primary/20 bg-primary/5">
                <Confetti
                  className="absolute inset-0 z-0 pointer-events-none w-full h-full"
                />
                <CardHeader className="relative z-10">
                  <CardTitle className="text-2xl text-center text-primary flex items-center justify-center gap-2">
                    <Trophy className="h-8 w-8" />
                    Challenge Completed!
                  </CardTitle>
                  <CardDescription className="text-center text-lg mt-2 font-medium">
                    {CHALLANGE_DATA.messageAfterCompletion}
                  </CardDescription>
                </CardHeader>
              </Card>
            ) : isOver ? (
              <DeadlineOver />
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
