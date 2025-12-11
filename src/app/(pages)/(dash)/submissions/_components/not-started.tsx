import { Button } from "@/components/ui/button";
import { CHALLANGE_DATA } from "@/content/data";
import { format, startOfDay } from "date-fns";
import { CalendarClock } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";

const NotStarted = () => {
  const startDate = startOfDay(CHALLANGE_DATA.startDate);
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
      <div className="bg-muted p-4 rounded-full">
        <CalendarClock className="h-10 w-10 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-semibold">Challenge Not Started</h2>
      <p className="text-muted-foreground max-w-md">
        The 15-Day Learning Challenge begins on{" "}
        <span className="font-medium text-foreground">
          {format(startDate, "PPP")}
        </span>
        . Come back then to start submitting your progress!
      </p>
      <Button onClick={() => router.push("/")} variant="outline">
        Back to Dashboard
      </Button>
    </div>
  );
};

export default NotStarted;
