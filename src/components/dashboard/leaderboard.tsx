import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockLeaderboard = [
  {
    name: "Alex Johnson",
    email: "alex.j@example.com",
    score: 1250,
    avatar: "/avatars/02.png",
  },
  {
    name: "Sarah Williams",
    email: "s.williams@example.com",
    score: 1100,
    avatar: "/avatars/03.png",
  },
  {
    name: "Michael Brown",
    email: "m.brown@example.com",
    score: 950,
    avatar: "/avatars/04.png",
  },
  {
    name: "Emily Davis",
    email: "emily.d@example.com",
    score: 850,
    avatar: "/avatars/05.png",
  },
  {
    name: "Chris Wilson",
    email: "c.wilson@example.com",
    score: 700,
    avatar: "/avatars/01.png",
  },
];

export function Leaderboard() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {mockLeaderboard.map((user, index) => (
            <div className="flex items-center" key={user.email}>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted mr-4 font-bold text-sm">
                {index + 1}
              </div>
              <Avatar className="h-9 w-9">
                <AvatarImage src={user.avatar} alt="Avatar" />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <div className="ml-auto font-medium">+{user.score} XP</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
