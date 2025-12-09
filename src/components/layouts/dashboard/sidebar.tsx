"use client";
import { cn } from "@/lib/utils";
import {
  Calendar,
  ChevronsUpDown,
  FileBadge,
  LayoutDashboard,
  LogOut,
  Settings,
  Trophy,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useGetMyParticipation } from "@/queries/participate/hooks";

const SIDEBAR_LINKS = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Leaderboard",
    href: "/leaderboard",
    icon: Trophy,
  },
];

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const myParticipation = useGetMyParticipation();
  const [sidebarLink, setSidebarLink] = useState(SIDEBAR_LINKS);

  useEffect(() => {
    if (myParticipation.isLoading) return;
    if (!myParticipation.data?.data) {
      setSidebarLink((prev) => [
        ...prev,
        {
          title: "Participate",
          href: "/participate",
          icon: Calendar,
        },
      ]);
    } else {
      setSidebarLink((prev) => [
        ...prev,
        {
          title: "Submissions",
          href: "/submissions",
          icon: FileBadge,
        },
      ]);
    }
  }, [myParticipation.isLoading, myParticipation.data]);

  return (
    <div
      className={cn("flex flex-col h-screen border-r bg-sidebar/20", className)}
    >
      <div className="p-4 border-b">
        <div className="flex items-center gap-2 px-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-muted border text-sidebar-primary-foreground">
            <img
              src="/logo.png"
              alt=""
              className="size-5 object-cover object-center"
            />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate text-lg font-semibold">
              Learning Challenge
            </span>
            <span>ACES</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-2">
          {sidebarLink.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Link>
            </Button>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start px-2 h-auto py-2"
            >
              <Avatar className="h-8 w-8 mr-2 rounded-lg">
                <AvatarImage src={session?.user?.image || ""} alt="@jrtilak" />
                <AvatarFallback>
                  {session?.user?.name?.split(" ").map((word) => word?.[0])}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-sm">
                <span className="font-semibold">
                  {session?.user?.name || ""}
                </span>
                <span className="text-xs text-muted-foreground">
                  {session?.user?.email || ""}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {session?.user?.name || ""}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {session?.user?.email || ""}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
