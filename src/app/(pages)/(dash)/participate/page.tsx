"use client";

import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Info from "./_components/info";
import { ParticipationForm } from "./_components/form";
import { motion, AnimatePresence } from "framer-motion";

export default function ParticipatePage() {
  const [showForm, setShowForm] = useState(false);

  return (
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
          {!showForm ? (
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
                onClick={() => setShowForm(true)}
              >
                Participate Now
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
  );
}
