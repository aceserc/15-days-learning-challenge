import { SponsorCard } from "@/components/sponsor-card";
import { ParticipateToChallenge } from "./_components/participate-to-challenge";

export default function DashboardPage() {
  return (
    <div className="flex gap-4 flex-col-reverse @3xl:flex-row">
      <div className="flex-1">
        <ParticipateToChallenge />
      </div>
      <SponsorCard name="" />
    </div>
  );
}
