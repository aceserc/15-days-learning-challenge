"use client";

import { Markdown } from "@/components/markdown";

interface GuidelineProps {
  content: string;
}

export const Guideline = ({ content }: GuidelineProps) => {
  return (
    <div className="bg-card/50 p-6 rounded-xl border shadow-sm w-full">
      <Markdown>{content}</Markdown>
    </div>
  );
};
