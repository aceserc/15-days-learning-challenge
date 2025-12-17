import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DOMAINS } from "@/content/domains";
import { fetchUserProfile } from "@/queries/users/actions";
import { format } from "date-fns";
import { Award, Calendar, Globe, Mail, Phone, School } from "lucide-react";

export default async function ProfilePage() {
  const profile = await fetchUserProfile();

  if (!profile.success || !profile.data) {
    // If user is not authenticated or not found, layout might handle it, but for safety:
    return <div className="p-4 text-center">User not found or not authenticated.</div>;
  }

  const { user, participant, submissions } = profile.data;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* User Info Card */}
        <Card className="w-full md:w-1/3">
          <CardHeader className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
              <AvatarFallback className="text-2xl">{user.name?.slice(0, 2).toUpperCase() || "U"}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl">{user.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{DOMAINS.find((d) => d.id === participant?.domain)?.title || "Participant"}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="truncate" title={user.email || ""}>{user.email}</span>
            </div>
            {user.schoolName && (
              <div className="flex items-center gap-2 text-sm">
                <School className="h-4 w-4 text-muted-foreground" />
                <span>{user.schoolName}</span>
              </div>
            )}
            {user.phoneNumber && (
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{user.phoneNumber}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Joined {format(new Date(user.createdAt), "PPP")}</span>
            </div>
            {participant && (
              <div className="pt-4 border-t">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Techfest ID
                </h4>
                <Badge variant="secondary" className="font-mono text-sm">{participant.techfestId}</Badge>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Activity & Stats */}
        <div className="flex-1 space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{submissions?.length || 0}</div>
              </CardContent>
            </Card>
            {/* You could add more stats here, e.g. Rank, Points etc. if available */}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              {submissions && submissions.length > 0 ? (
                <div className="space-y-4">
                  {submissions.map((sub: any) => (
                    <div key={sub.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                      <div className="space-y-1">
                        <p className="font-medium">Day {sub.day}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">{sub.summary}</p>
                        <a href={sub.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline">
                          View Submission
                        </a>
                      </div>
                      <div className="text-sm text-muted-foreground text-right w-24">
                        {format(new Date(sub.createdAt), "MMM d, yyyy")}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  No submissions yet.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}