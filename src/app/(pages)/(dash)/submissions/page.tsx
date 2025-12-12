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

  if (!isStarted) {
    return <NotStarted />;
  }

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
            {isOver ? <DeadlineOver /> : <SubmitForm />}
          </TabsContent>

          <TabsContent value="my-submissions" className="mt-6">
            <SubmissionList />
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-18 hidden @3xl:block">
        <SponsorCard />
      </div>
    </div>
  );
};

export default SubmissionsPage;
