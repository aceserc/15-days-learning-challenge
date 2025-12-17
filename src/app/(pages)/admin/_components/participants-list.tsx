"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useGetAllParticipants } from "@/queries/admin/hooks"
import { format } from "date-fns"
import Link from "next/link"

export default function ParticipantsList() {
  const { data: participants, isLoading } = useGetAllParticipants()

  if (isLoading) {
    return <div>Loading participants...</div>
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>User ID</TableHead>
            <TableHead>Domain</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {participants?.data?.map((participant) => (
            <TableRow key={participant.id}>
              <TableCell className="font-medium">{participant.id}</TableCell>
              <TableCell className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={participant.user?.image || undefined} alt={participant.user?.name || "User"} />
                  <AvatarFallback>{participant.user?.name?.slice(0, 2).toUpperCase() || "U"}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">{participant.user?.name || "N/A"}</span>
                  <span className="text-xs text-muted-foreground">{participant.user?.email}</span>
                </div>
              </TableCell>
              <TableCell>{participant.domain}</TableCell>
              <TableCell>{format(new Date(participant.createdAt), "PPP")}</TableCell>
              <TableCell className="text-right">
                <Link href={`/admin/participants/${participant.id}`}>
                  <Button variant="outline" size="sm" className="mr-2">
                    Participant Profile
                  </Button>
                </Link>
                <Link href={`/admin/users/${participant.userId}`}>
                  <Button variant="ghost" size="sm">
                    User Profile
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
          {!participants?.data?.length && (
            <TableRow>
              <TableCell colSpan={5} className="text-center h-24">
                No participants found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
