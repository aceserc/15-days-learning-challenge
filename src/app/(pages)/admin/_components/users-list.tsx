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
import { useGetAllUsers } from "@/queries/admin/hooks"
import { format } from "date-fns"
import Link from "next/link"

export default function UsersList() {
  const { data: users, isLoading } = useGetAllUsers()

  if (isLoading) {
    return <div>Loading users...</div>
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>School</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.data?.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
                  <AvatarFallback>{user.name?.slice(0, 2).toUpperCase() || "U"}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{user.name || "N/A"}</span>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.schoolName || "N/A"}</TableCell>
              <TableCell>{user.phoneNumber || "N/A"}</TableCell>
              <TableCell>{format(new Date(user.createdAt), "PPP")}</TableCell>
              <TableCell className="text-right">
                <Link href={`/admin/users/${user.id}`}>
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
          {!users?.data?.length && (
            <TableRow>
              <TableCell colSpan={6} className="text-center h-24">
                No users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
