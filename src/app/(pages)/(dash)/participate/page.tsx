"use client";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { AnimatePresence, motion } from "framer-motion";
import Info from "./_components/info";
import { Button } from "@/components/ui/button";
import { ParticipationForm } from "./_components/form";
import { Rocket } from "lucide-react";
const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
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
