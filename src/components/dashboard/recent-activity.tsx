import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LinkIcon } from "lucide-react";

const mockActivity = [
  {
    user: "Alex Johnson",
    email: "alex.j@example.com",
    avatar: "/avatars/02.png",
    action: "submitted a project",
    project: "My Portfolio",
    link: "https://alex-portfolio.vercel.app",
    time: "2 hours ago",
  },
  {
    user: "Sarah Williams",
    email: "s.williams@example.com",
    avatar: "/avatars/03.png",
    action: "completed a challenge",
    project: "Day 5: React Hooks",
    link: "https://github.com/sarah/day5",
    time: "4 hours ago",
  },
  {
    user: "Michael Brown",
    email: "m.brown@example.com",
    avatar: "/avatars/04.png",
    action: "joined the challenge",
    project: null,
    link: null,
    time: "5 hours ago",
  },
  {
    user: "Emily Davis",
    email: "emily.d@example.com",
    avatar: "/avatars/05.png",
    action: "submitted a project",
    project: "Weather App",
    link: "https://weather-app-emily.netlify.app",
    time: "8 hours ago",
  },
];

export function RecentActivity() {
  return (
    <Card className="col-span-4 lg:col-span-3">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Latest submissions and milestones from the community.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {mockActivity.map((item, index) => (
            <div className="flex items-start" key={index}>
              <Avatar className="h-9 w-9 mt-0.5">
                <AvatarImage src={item.avatar} alt="Avatar" />
                <AvatarFallback>{item.user[0]}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {item.user}{" "}
                  <span className="text-muted-foreground font-normal">
                    {item.action}
                  </span>
                </p>
                {item.project && (
                  <div className="flex items-center text-sm text-primary mt-1">
                    <LinkIcon className="h-3 w-3 mr-1" />
                    <a
                      href={item.link || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {item.project}
                    </a>
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  {item.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
