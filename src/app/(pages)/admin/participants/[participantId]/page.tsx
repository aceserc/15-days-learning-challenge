"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DOMAINS } from "@/content/domains"
import { api } from "@/queries"
import { useGetParticipantById, useGetSubmissionsByUserId, useGetUserById } from "@/queries/admin/hooks"
import { format } from "date-fns"
import { ArrowLeft, Calendar, Mail, Phone, School, User } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"

export default function ParticipantProfilePage() {
  const params = useParams()
  const router = useRouter()
  const participantId = params.participantId as string
  const { data: participantRes, isLoading: isLoadingParticipant } = api.admin.useGetParticipantById(participantId)
  const participant = participantRes?.data

  // Fetch user details if participant exists
  const { data: userRes, isLoading: isLoadingUser } = useGetUserById(participant?.userId || "")
  const user = userRes?.data

  // Fetch submissions if user exists
  const { data: submissionsRes, isLoading: isLoadingSubmissions } = useGetSubmissionsByUserId(user?.id || "")
  const submissionsData = submissionsRes?.data

  if (isLoadingParticipant || isLoadingUser) {
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
    <div className="space-y-6 md:p-8 p-4">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Participant Profile</h1>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Participant Information</CardTitle>
            <CardDescription>Comprehensive details of the participant and their linked user account.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {user && (
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
                    <AvatarFallback>{user.name?.slice(0, 2).toUpperCase() || "U"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">{user.name || "N/A"}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
                      <Mail className="h-3.5 w-3.5" />
                      {user.email}
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1 w-full">
                <div className="space-y-1">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <User className="h-3 w-3" />
                    User Details
                  </span>
                  <div className="space-y-1.5">
                    {user?.phoneNumber && (
                      <p className="text-sm flex items-center gap-2">
                        <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                        {user.phoneNumber}
                      </p>
                    )}
                    {user?.schoolName && (
                      <p className="text-sm flex items-center gap-2">
                        <School className="h-3.5 w-3.5 text-muted-foreground" />
                        {user.schoolName}
                      </p>
                    )}
                    <p className="text-sm flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                      Joined: {user ? format(new Date(user.createdAt), "PPP") : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Challenge Info</span>
                  <div className="space-y-1.5 ml-0">
                    <p className="text-sm">
                      <span className="text-muted-foreground">Domain:</span> {DOMAINS.find((d) => d.id === participant.domain)?.title || "Participant"}
                    </p>
                    <p className="text-sm">
                      <span className="text-muted-foreground">Registered:</span> {format(new Date(participant.createdAt), "PPP")}
                    </p>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Identities</span>
                  <div className="space-y-1.5">
                    <p className="text-sm font-mono text-muted-foreground">P-ID: {participant.id}</p>
                    <p className="text-sm font-mono text-muted-foreground">T-ID: {participant.techfestId}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Challenge Submissions</CardTitle>
            <CardDescription>All submissions made by the user for the 15 Days Learning Challenge.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingSubmissions ? (
              <p className="text-sm text-muted-foreground">Loading submissions...</p>
            ) : !submissionsData || submissionsData.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4">No submissions found for this user.</p>
            ) : (
              <div className="relative overflow-x-auto border rounded-lg">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                    <tr>
                      <th className="px-4 py-3 font-medium">Day</th>
                      <th className="px-4 py-3 font-medium">Date</th>
                      <th className="px-4 py-3 font-medium">Summary</th>
                      <th className="px-4 py-3 font-medium">Link</th>
                      <th className="px-4 py-3 font-medium">Votes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {submissionsData.map((submission) => (
                      <tr key={submission.id} className="bg-card hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 font-semibold">Day {submission.day}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {format(new Date(submission.createdAt), "MMM d, yyyy")}
                        </td>
                        <td className="px-4 py-3 max-w-md truncate">
                          {submission.summary}
                        </td>
                        <td className="px-4 py-3">
                          <Link
                            href={submission.link}
                            target="_blank"
                            className="text-primary hover:underline font-medium"
                          >
                            View Link
                          </Link>
                        </td>
                        <td className="px-4 py-3">{submission.voteCount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
