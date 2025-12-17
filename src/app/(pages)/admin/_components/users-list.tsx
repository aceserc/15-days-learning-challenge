"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function UsersList() {
  const { data: users, isLoading } = useGetAllUsers()
  const [search, setSearch] = useState("")

  const filteredUsers = users?.data?.filter((user) => {
    const searchLower = search.toLowerCase()
    const name = user.name?.toLowerCase() || ""
    const email = user.email?.toLowerCase() || ""
    return name.includes(searchLower) || email.includes(searchLower)
  })

  if (isLoading) {
    return <div>Loading users...</div>
  }

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search users..."
          className="pl-8"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="rounded-md border overflow-x-auto">
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
            {filteredUsers?.map((user) => (
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
            {!filteredUsers?.length && (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
