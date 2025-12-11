"use client";

import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ComingSoonProps {
  className?: string;
  title?: string;
  description?: string;
}

export function ComingSoon({
  className,
  title = "Coming Soon",
  description = "This feature will be available soon. Stay tuned!",
}: ComingSoonProps) {
  return (
    <Card className={cn("w-full overflow-hidden border-dashed", className)}>
      <CardContent className="flex min-h-[350px] flex-col items-center justify-center gap-6 p-12 text-center relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0 bg-muted/20 opacity-50 mask-[radial-gradient(ellipse_at_center,black,transparent)]" />

        <div className="z-10 flex flex-col items-center gap-6">
          <div className="rounded-full bg-primary/10 p-4 ring-1 ring-primary/25 shadow-[0_0_20px_-12px_var(--primary)]">
            <Sparkles className="h-8 w-8 text-primary animate-pulse" />
          </div>

          <div className="space-y-3">
            <Badge variant="secondary" className="px-3 py-1 mb-1">
              Stay Tuned
            </Badge>
            <h3 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-sans">
              {title}
            </h3>
            <p className="text-muted-foreground max-w-sm mx-auto text-base">
              {description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
