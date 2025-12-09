"use client";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { AnimatePresence, motion } from "framer-motion";
import Info from "./_components/info";
import { Button } from "@/components/ui/button";
import { ParticipationForm } from "./_components/form";
import { Rocket, Loader2, CheckCircle2 } from "lucide-react";
import { useGetMyParticipation } from "@/queries/participate/hooks";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: participation, isLoading } = useGetMyParticipation();

  if (isLoading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground animate-pulse">
          Checking participation status...
        </p>
      </div>
    );
  }

  if (participation?.data) {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Participate</h3>
          <p className="text-sm text-muted-foreground">
            View your participation status.
          </p>
        </div>
        <Separator />
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
                  {participation.data.domain}
                </span>
              </div>
              <Button onClick={() => router.push("/")} className="w-full">
                Go to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <Suspense>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Participate</h3>
          <p className="text-sm text-muted-foreground">
            Fill in your details to join the 15-Days Learning Challenge.
          </p>
        </div>
        <Separator />

        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {searchParams.get("show-form") !== "true" ? (
              <motion.div
                key="info"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center space-y-8 w-full max-w-4xl"
              >
                <Info />
                <Button
                  size="lg"
                  className="text-lg px-8 py-6"
                  onClick={() => {
                    router.push("?show-form=true");
                  }}
                >
                  Participate Now <Rocket />
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full"
              >
                <ParticipationForm />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Suspense>
  );
};

export default Page;
