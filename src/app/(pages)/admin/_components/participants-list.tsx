"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DOMAINS } from "@/content/domains";
import { api } from "@/queries";
import { format } from "date-fns";
import { Download, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { utils, writeFile } from "xlsx";

export default function ParticipantsList() {
  const { data: participants, isLoading } = api.admin.useGetAllParticipants();
  const [search, setSearch] = useState("");

  const filteredParticipants = participants?.data?.filter((participant) => {
    const searchLower = search.toLowerCase();
    const name = participant.user?.name?.toLowerCase() || "";
    const email = participant.user?.email?.toLowerCase() || "";
    return name.includes(searchLower) || email.includes(searchLower);
  });

  const downloadExcel = async () => {
    const data =
      participants?.data?.map((p, index) => ({
        "S.No": index + 1,
        name: p.user?.name || "N/A",
        email: p.user?.email || "N/A",
        domain: DOMAINS.find((d) => d.id === p.domain)?.title || "N/A",
        "Created At": format(new Date(p.createdAt), "PPP"),
      })) || [];

    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Participants");
    writeFile(wb, "participants.xlsx");
  };

  if (isLoading) {
    return <div>Loading participants...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row items-center justify-between">
        <div className="relative sm:max-w-sm max-sm:w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search participants..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button className="max-sm:w-full" onClick={downloadExcel}>
          Download as Excel <Download />
        </Button>
      </div>
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.No</TableHead>
              <TableHead>User ID</TableHead>
              <TableHead>Domain</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredParticipants?.map((participant, index) => (
              <TableRow key={participant.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={participant.user?.image || undefined}
                      alt={participant.user?.name || "User"}
                    />
                    <AvatarFallback>
                      {participant.user?.name?.slice(0, 2).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {participant.user?.name || "N/A"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {participant.user?.email}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  {DOMAINS.find((d) => d.id === participant.domain)?.title}
                </TableCell>
                <TableCell>
                  {format(new Date(participant.createdAt), "PPP")}
                </TableCell>
                <TableCell className="text-right">
                  <Link href={`/admin/participants/${participant.id}`}>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
            {!filteredParticipants?.length && (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24">
                  No participants found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
