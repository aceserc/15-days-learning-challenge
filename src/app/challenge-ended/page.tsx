import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ChallengeEndedPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Logo in top left */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8">
        <Image
          src="/logo.png"
          alt="ACES Logo"
          width={60}
          height={60}
          className="object-contain md:w-20 md:h-20"
          unoptimized
        />
      </div>

      {/* Centered Card */}
      <div className="flex items-center justify-center min-h-screen p-4 md:p-8">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center space-y-6">
            {/* Larger Crying Emoji */}
            <div className="flex justify-center">
              <Image
                src="/emoji/weary-face-3d.png"
                alt="Crying face"
                width={120}
                height={120}
                className="object-contain"
                unoptimized
              />
            </div>

            <CardTitle className="text-2xl md:text-3xl">
              Challenge Ended
            </CardTitle>
            <CardDescription className="text-base">
              The ACES 15-Day Learning Challenge has concluded
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-sm md:text-base text-muted-foreground">
              Thank you for your interest in the ACES Learning Challenge.
            </p>
            <p className="text-base md:text-lg font-semibold">
              Try again next year! 🎯
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
