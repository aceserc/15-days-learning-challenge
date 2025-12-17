import { ComingSoon } from "@/components/coming-soon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_CONFIG } from "@/content/config";
import { fetchCurrentUser } from "@/queries/users/actions";
import { format } from "date-fns";
import { Calendar, Phone, School, ShieldCheck } from "lucide-react";

export default async function ProfilePage() {
  return <ComingSoon />
  const response = await fetchCurrentUser();

  if (!response.success || !response.data) {
    return <div>Error loading profile</div>;
  }

  const { user, participant } = response.data;

  // Check if admin to show badge
  const isAdmin = process.env.ADMIN_EMAILS?.includes(user?.email || "");

  return (
    <div className="container max-w-4xl mx-auto py-8 space-y-8">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Sidebar / Main Info */}
        <Card className="w-full md:w-1/3">
          <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
            <Avatar className="h-32 w-32 border-4 border-muted">
              <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
              <AvatarFallback className="text-4xl">
                {user.name?.slice(0, 2).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
            {isAdmin && (
              <Badge variant="destructive" className="flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" /> Admin
              </Badge>
            )}
          </CardContent>
        </Card>

        {/* Detailed Info */}
        <div className="flex-1 space-y-6 w-full">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your personal details managed by {APP_CONFIG.name}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                    <School className="h-3 w-3" /> School / College
                  </span>
                  <p className="text-sm font-medium">{user.schoolName || "Not Provided"}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                    <Phone className="h-3 w-3" /> Phone Number
                  </span>
                  <p className="text-sm font-medium">{user.phoneNumber || "Not Provided"}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> Joined On
                  </span>
                  <p className="text-sm font-medium">{format(new Date(user.createdAt), "PPP")}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {participant && (
            <Card>
              <CardHeader>
                <CardTitle>Challenge Participation</CardTitle>
                <CardDescription>Your status in the 15 Days Learning Challenge</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-medium text-muted-foreground">Domain</span>
                    <Badge variant="secondary" className="mt-1">{participant.domain}</Badge>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-medium text-muted-foreground">Status</span>
                    <p className="text-sm font-medium">Active</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-medium text-muted-foreground">Enrolled Date</span>
                    <p className="text-sm font-medium">{participant.createdAt}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
