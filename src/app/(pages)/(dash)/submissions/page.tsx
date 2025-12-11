"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CHALLANGE_DATA } from "@/content/data";
import { AlertCircle, CalendarClock, History, PenLine } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { SubmissionList } from "./_components/submission-list";
import { SubmitForm } from "./_components/submit-form";
import { addDays, format, startOfDay } from "date-fns";
import NotStarted from "./_components/not-started";
import { DeadlineOver } from "./_components/deadline-over";

const SubmissionsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentTab = searchParams.get("tab") || "submit";

  const today = startOfDay(new Date());
  const startDate = startOfDay(CHALLANGE_DATA.startDate);
  // Calculate deadline: startDate + canSubmitTillDays
  // Using addDays to be precise
  const deadlineDate = addDays(startDate, CHALLANGE_DATA.canSubmitTillDays);

  const isStarted = today >= startDate;
  const isDeadlineOver = today > deadlineDate;

  const handleTabChange = (val: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", val);
    router.push(`?${params.toString()}`);
  };

  if (!isStarted) {
    return <NotStarted />;
  }

  return (
    <div className="space-y-6">
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

        <TabsContent value="submit" className="">
          {isDeadlineOver ? (
            <DeadlineOver />
          ) : (
            <>
              <Alert className="bg-primary/5 border-primary/20 text-primary-foreground">
                <AlertCircle className="h-4 w-4 stroke-primary" />
                <AlertTitle className="text-primary font-medium">
                  Note
                </AlertTitle>
                <AlertDescription className="text-primary/80 mt-1 block">
                  You can submit up to{" "}
                  <span className="font-bold">
                    {format(deadlineDate, "PPP")}
                  </span>
                  . Don't forget to post your progress daily on LinkedIn using
                  the challenge hashtags.{" "}
                  <span className="font-bold">
                    Missing daily posts may lead to disqualification.
                  </span>
                </AlertDescription>
              </Alert>

              <Card className="border-none shadow-none bg-transparent">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <PenLine className="h-5 w-5 text-primary" />
                    New Submission
                  </CardTitle>
                  <CardDescription>
                    Select the day and share what you learned today.
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-0">
                  <SubmitForm />
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="my-submissions">
          <SubmissionList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SubmissionsPage;
