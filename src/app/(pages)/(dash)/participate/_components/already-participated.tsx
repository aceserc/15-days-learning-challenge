import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DOMAINS } from "@/content/domains";
import { Participant } from "@/db/schema";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";

export const AlreadyParticipated = ({ data }: { data: Participant }) => {
  const router = useRouter();

  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <Card className="max-w-md w-full border-primary/20 bg-muted/30">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 bg-primary/10 p-3 rounded-full w-fit">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-xl">You're In!</CardTitle>
          <CardDescription className="text-base mt-2">
            You have already enrolled in the 15-Day Learning Challenge.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center pb-8">
          <div className="bg-background border rounded-lg p-4 mt-2 mb-6">
            <span className="text-sm text-muted-foreground block mb-1">
              Selected Domain
            </span>
            <span className="font-semibold capitalize">
              {DOMAINS.find((domain) => domain.id === data.domain)?.title}
            </span>
          </div>
          <Button onClick={() => router.push("/")} className="w-full">
            Go to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
