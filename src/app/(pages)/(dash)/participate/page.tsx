"use client";
import { compareAsc, startOfDay } from "date-fns";
import { Rocket } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import { CHALLANGE_DATA } from "@/content/data";
import { useGetMyParticipation } from "@/queries/participate/hooks";
import { AlreadyParticipated } from "./_components/already-participated";
import { ParticipationForm } from "./_components/form";
import { Info } from "./_components/info";
import { RegistrationClosed } from "./_components/registration-closed";

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: participation, isLoading } = useGetMyParticipation();

  const today = startOfDay(new Date());
  const startDate = startOfDay(CHALLANGE_DATA.startDate);
  // Registration is open if today is before or on the start date
  const isRegistrationOpen = compareAsc(today, startDate) <= 0;

  if (isLoading) {
    return <Loading>Checking participation status...</Loading>;
  }

  if (participation?.data) {
    return <AlreadyParticipated data={participation.data} />;
  }

  if (!isRegistrationOpen) {
    return <RegistrationClosed />;
  }

  return (
    <Suspense>
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
    </Suspense>
  );
};

export default Page;
