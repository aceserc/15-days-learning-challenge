import { Button } from "@/components/ui/button";
import { CHALLANGE_DATA } from "@/content/data";
import { addDays, format, startOfDay } from "date-fns";
import { History } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";

const DeadlineOver = () => {
  const router = useRouter();
  const startDate = startOfDay(CHALLANGE_DATA.startDate);
  const deadlineDate = addDays(startDate, CHALLANGE_DATA.canSubmitTillDays);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
      <div className="bg-destructive/10 p-4 rounded-full">
        <History className="h-10 w-10 text-destructive" />
      </div>
      <h2 className="text-2xl font-semibold text-destructive">
        Submission Deadline Over
      </h2>
      <p className="text-muted-foreground max-w-md">
        The submission period for this challenge ended on{" "}
        <span className="font-medium text-foreground">
          {format(deadlineDate, "PPP")}
        </span>
        . You can still view your past submissions in the "My Submissions" tab.
      </p>
      <div className="flex gap-2">
        <Button onClick={() => router.push("/")} variant="outline">
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};

export { DeadlineOver };
