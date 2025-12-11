"use client";
import { CHALLANGE_DATA } from "@/content/data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Info = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(CHALLANGE_DATA.startDate) - +new Date();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          mins: Math.floor((difference / 1000 / 60) % 60),
          secs: Math.floor((difference / 1000) % 60),
        };
      }
      return { days: 0, hours: 0, mins: 0, secs: 0 };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6 max-w-lg w-full">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <h3 className="text-2xl font-bold tracking-tight mb-2">
          Challenge Starts In
        </h3>
        <div className="grid grid-cols-3 xs:grid-cols-4 gap-4 text-center">
          {[
            {
              label: "Days",
              className: "flex",
              value: timeLeft.days,
            },
            {
              label: "Hours",
              className: "flex",
              value: timeLeft.hours,
            },
            {
              label: "Minutes",
              value: timeLeft.mins,
              className: "flex",
            },
            {
              label: "Seconds",
              value: timeLeft.secs,
              className: "hidden xs:flex",
            },
          ].map((item) => (
            <div
              className={cn(
                "flex-col p-2 bg-muted rounded-md col-span-1",
                item.className
              )}
            >
              <span className="text-3xl font-bold">{item.value}</span>
              <span className="text-xs uppercase text-muted-foreground">
                {item.label}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>Get ready to learn, build, and share your progress!</p>
        </div>
      </div>

      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <h4 className="font-semibold mb-2">Rules & Guidelines</h4>
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
          <li>Commit code daily.</li>
          <li>Share your progress on social media.</li>
          <li>Engage with the community.</li>
          <li>Have fun!</li>
        </ul>
        <div className="mt-2">
          <Link
            href="/guidelines"
            target="_blank"
            className="text-sm text-primary hover:underline"
          >
            Check here for detailed guidelines
          </Link>
        </div>
      </div>
    </div>
  );
};
