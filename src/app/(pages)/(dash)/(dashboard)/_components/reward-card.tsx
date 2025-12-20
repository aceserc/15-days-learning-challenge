"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MagicCard } from "@/components/ui/magic-card";
import { DOMAINS } from "@/content/domains";
import { Participant } from "@/db/schema";
import { Gift, ExternalLink, Sparkles, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface RewardCardProps {
  participation: Participant;
}

export const RewardCard = ({ participation }: RewardCardProps) => {
  const domainData = DOMAINS.find((d) => d.id === participation.domain);
  const resource = domainData?.resources;

  if (!resource || resource.status === "unavailable") return null;

  const handleClick = () => {
    if (resource.status !== "available") return;
    const url = `https://www.nativesplug.com/?source=aces&user-id=${participation.userId}`;
    window.open(url, "_blank");
  };

  return (
    <MagicCard
      className="rounded-xl overflow-hidden shadow-lg transition-all md:hover:shadow-xl active:scale-[0.99] border-none"
      gradientSize={300}
      gradientOpacity={0.15}
    >
      <div
        className={cn(
          "group relative bg-linear-to-br from-primary/5 via-background to-primary/10 p-[1px]",
          resource.status === "available" ? "cursor-pointer" : "cursor-default"
        )}
        onClick={handleClick}
      >
        <div className="bg-background/80 backdrop-blur-sm rounded-[calc(0.75rem-1px)] p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="relative shrink-0">
              <div className={cn(
                "flex h-16 w-16 items-center justify-center rounded-2xl shadow-2xl transition-all duration-500 group-hover:scale-110",
                resource.status === "available"
                  ? "bg-primary text-primary-foreground shadow-primary/40 md:group-hover:rotate-6"
                  : "bg-muted text-muted-foreground shadow-none"
              )}>
                <Gift className="h-8 w-8" />
              </div>
              {resource.status === "available" && (
                <div className="absolute -top-2 -right-2">
                  <div className="flex h-6 w-6 animate-bounce items-center justify-center rounded-full bg-yellow-400 text-yellow-900 shadow-md shadow-yellow-400/50">
                    <Sparkles className="h-4 w-4" />
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1 text-center md:text-left space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-center md:justify-start gap-3">
                <h3 className="font-black text-xl md:text-2xl tracking-tight bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent italic">
                  PREMIUM COURSE REWARD
                </h3>
                {resource.status === "available" ? (
                  <Badge className="w-fit mx-auto sm:mx-0 bg-green-500/10 text-green-600 border-green-500/20 px-3 py-1 font-bold">
                    UNLOCKED
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="w-fit mx-auto sm:mx-0 bg-muted text-muted-foreground border-muted-foreground/20 px-3 py-1 font-bold">
                    COMING SOON
                  </Badge>
                )}
              </div>

              <div className="space-y-2">
                <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
                  {resource.status === "available"
                    ? `Congratulations! As a ${domainData?.title} participant, you've been granted access to:`
                    : `Get ready! As a ${domainData?.title} participant, your course reward will be available soon:`}
                </p>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <h4 className={cn(
                    "text-lg md:text-xl font-extrabold transition-colors duration-300",
                    resource.status === "available" ? "text-foreground group-hover:text-primary decoration-primary/50 underline-offset-2" : "text-muted-foreground"
                  )}>
                    {resource.title}
                  </h4>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap justify-center md:justify-start items-center gap-2 text-sm text-muted-foreground/80 italic">
                <Wand2 className="h-3.5 w-3.5 text-primary/60" />
                <span>Powered by NativesPlug, our Exclusive Learning Partner</span>
              </div>
            </div>

            <div className="shrink-0 pt-4 md:pt-0">
              <div className={cn(
                "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold shadow-xl transition-all duration-300",
                resource.status === "available"
                  ? "bg-primary text-white shadow-primary/30 md:group-hover:bg-primary/90 md:group-hover:scale-105 active:scale-95 cursor-pointer"
                  : "bg-muted text-muted-foreground cursor-not-allowed opacity-70"
              )}>
                {resource.status === "available" ? "Claim Reward" : "Notify Me"}
                <ExternalLink className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MagicCard>
  );
};
