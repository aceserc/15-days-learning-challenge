"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useGetParticipantById, useGetUserById } from "@/queries/admin/hooks"
import { format } from "date-fns"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"

export default function ParticipantProfilePage() {
  const params = useParams()
  const router = useRouter()
  const participantId = params.participantId as string
  const { data: participantRes, isLoading: isLoadingParticipant } = useGetParticipantById(participantId)
  const participant = participantRes?.data

  // Fetch user details if participant exists
  const { data: userRes, isLoading: isLoadingUser } = useGetUserById(participant?.userId || "")
  const user = userRes?.data

  if (isLoadingParticipant) {
    return <div className="p-8">Loading participant profile...</div>
  }

  if (!participant) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-bold">Participant not found</h2>
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
        <h1 className="text-3xl font-bold tracking-tight">Participant Profile</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Challenge Details</CardTitle>
            <CardDescription>Information regarding the 15 Days Learning Challenge.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-2">
              <div className="space-y-1">
                <span className="text-sm font-medium text-muted-foreground">Participant ID</span>
                <p className="text-sm font-mono">{participant.id}</p>
              </div>
              <div className="space-y-1">
                <span className="text-sm font-medium text-muted-foreground">Techfest ID</span>
                <p className="text-sm font-mono">{participant.techfestId}</p>
              </div>
              <div className="space-y-1">
                <span className="text-sm font-medium text-muted-foreground">Domain</span>
                <p className="text-sm">{participant.domain}</p>
              </div>
              <div className="space-y-1">
                <span className="text-sm font-medium text-muted-foreground">Registered At</span>
                <p className="text-sm">{format(new Date(participant.createdAt), "PPP")}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {user && (
          <Card>
            <CardHeader>
              <CardTitle>User Information</CardTitle>
              <CardDescription>Details of the user account linked to this participant.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
                  <AvatarFallback>{user.name?.slice(0, 2).toUpperCase() || "U"}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-medium">{user.name || "N/A"}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <div className="pt-2">
                <Link href={`/admin/users/${user.id}`}>
                  <Button variant="outline" size="sm">View Full User Profile</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
