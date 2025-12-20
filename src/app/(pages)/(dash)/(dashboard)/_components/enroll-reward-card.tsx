"use client";

import { Button } from "@/components/ui/button";
import { MagicCard } from "@/components/ui/magic-card";
import { Rocket, Sparkles, Gift, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const EnrollRewardCard = () => {
  return (
    <MagicCard
      className="rounded-xl overflow-hidden shadow-lg transition-all md:hover:shadow-xl active:scale-[0.99] border-none"
      gradientSize={300}
      gradientOpacity={0.15}
    >
      <div className="relative bg-linear-to-br from-primary/10 via-background to-primary/5 p-[1px]">
        <div className="bg-background/80 backdrop-blur-sm rounded-[calc(0.75rem-1px)] p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="relative shrink-0">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-2xl transition-transform duration-500 hover:scale-110">
                <Rocket className="h-8 w-8" />
              </div>
              <div className="absolute -top-2 -right-2">
                <div className="flex h-6 w-6 animate-pulse items-center justify-center rounded-full bg-yellow-400 text-yellow-900 shadow-md">
                  <Sparkles className="h-4 w-4" />
                </div>
              </div>
            </div>

            <div className="flex-1 text-center md:text-left space-y-3">
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <h3 className="font-black text-xl md:text-2xl tracking-tight bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent italic uppercase">
                  Exclusive Reward Opportunity
                </h3>
              </div>
              <div className="space-y-2">
                <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
                  Enroll in the <span className="text-foreground font-bold">15-Day Learning Challenge</span> now to unlock <span className="text-primary font-bold">Premium Courses</span> from <span className="font-semibold text-foreground">NativesPlug</span> for absolutely free!
                </p>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2 pt-1">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-6 w-6 rounded-full border-2 border-background bg-muted flex items-center justify-center">
                      <Gift className="h-3 w-3 text-primary/60" />
                    </div>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground font-medium ml-2">Multiple courses waiting for you</span>
              </div>
            </div>

            <div className="shrink-0 pt-2 md:pt-0">
              <Button asChild size="lg" className="rounded-full px-8 py-6 text-base font-bold shadow-xl shadow-primary/30 transition-all duration-300 hover:scale-105 group">
                <Link href="/participate" className="flex items-center gap-2">
                  Enroll Now to Unlock
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MagicCard>
  );
};
