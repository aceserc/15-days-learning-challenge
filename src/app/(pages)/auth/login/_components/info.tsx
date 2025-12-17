import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CHALLANGE_DATA } from "@/content/data";
import Link from "next/link";

const INFO = [
  {
    title: "Choose Your Domain",
    description:
      "Select from AI/ML, Cybersecurity, Web Development, or App Development",
  },
  {
    title: "Daily Learning",
    description: `Learn something new every day for ${CHALLANGE_DATA.durationInDays} consecutive days`,
  },
  {
    title: "Share Your Progress",
    description:
      "Post daily on social media with proper tags and sponsor mentions",
  },
  {
    title: "Stay Consistent",
    description:
      "Missing a single day results in disqualification - consistency is key!",
  },
];

export const Info = () => {
  return (
    <div className="flex items-center justify-center p-8 bg-muted order-2 lg:order-1">
      <Card className="max-w-lg w-full">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            ACES 15-Day Learning Challenge
          </CardTitle>
          <CardDescription className="text-center">
            Transform your learning journey with daily commitment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {INFO.map((item, index) => (
              <div key={index} className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Badge variant="secondary">{index + 1}</Badge>
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm font-medium text-destructive">
              ⚠️ Important: You can only submit once per day. Missing a day will
              automatically disqualify you from the challenge.
            </p>
          </div>
          <div className="pt-4 border-t text-center">
            <p className="text-xs text-muted-foreground">
              Designed & Developed by{" "}
              <Link
                href="https://github.com/dev-sandip"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold hover:underline"
              >
                @dev-sandip
              </Link>{" "}
              and{" "}
              <Link
                href="https://github.com/jrtilak"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold hover:underline"
              >
                @jrtilak
              </Link>
              {" "}
              and ACES Tech Team with love.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
