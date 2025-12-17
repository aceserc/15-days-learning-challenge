"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useGetUserById } from "@/queries/admin/hooks"
import { format } from "date-fns"
import { ArrowLeft } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

export default function UserProfilePage() {
  const params = useParams()
  const router = useRouter()
  const userId = params.userId as string
  const { data: userResponse, isLoading } = useGetUserById(userId)
  const user = userResponse?.data

  if (isLoading) {
    return <div className="p-8">Loading user profile...</div>
  }

  if (!user) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-bold">User not found</h2>
        <Button onClick={() => router.back()} className="mt-4">
          Go Back
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">User Profile</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Basic details about the user.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
                <AvatarFallback className="text-lg">{user.name?.slice(0, 2).toUpperCase() || "U"}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-medium">{user.name || "N/A"}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div className="space-y-1">
                <span className="text-sm font-medium text-muted-foreground">User ID</span>
                <p className="text-sm font-mono">{user.id}</p>
              </div>
              <div className="space-y-1">
                <span className="text-sm font-medium text-muted-foreground">Joined</span>
                <p className="text-sm">{format(new Date(user.createdAt), "PPP")}</p>
              </div>
              <div className="space-y-1">
                <span className="text-sm font-medium text-muted-foreground">School</span>
                <p className="text-sm">{user.schoolName || "N/A"}</p>
              </div>
              <div className="space-y-1">
                <span className="text-sm font-medium text-muted-foreground">Phone</span>
                <p className="text-sm">{user.phoneNumber || "N/A"}</p>
              </div>
              <div className="space-y-1">
                <span className="text-sm font-medium text-muted-foreground">Email Verified</span>
                <p className="text-sm">{user.emailVerified ? format(new Date(user.emailVerified), "PPP") : "No"}</p>
              </div>
              <div className="space-y-1">
                <span className="text-sm font-medium text-muted-foreground">Onboarded</span>
                <p className="text-sm">{user.isOnboarded ? "Yes" : "No"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
