"use client";

import {
  ChevronsUpDown,
  LayoutDashboard,
  Rss,
  ShieldAlert,
  Trophy
} from "lucide-react";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarRail
} from "@/components/ui/sidebar";
import { APP_CONFIG } from "@/content/config";
import { Nav, Navlink } from "./nav";
import { NavUser } from "./nav-user";

const ADMIN_LINKS: Navlink[] = [
  {
    name: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Leaderboard",
    url: "/leaderboard",
    icon: Trophy,
  },
  {
    name: "Feed",
    url: "/feed",
    icon: Rss,
  },
];

export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground border"
        >
          <div className="border text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg bg-red-600 text-white">
            <ShieldAlert className="size-5" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">Admin Panel</span>
            <span className="truncate text-xs">
              {APP_CONFIG.name}
            </span>
          </div>
          <ChevronsUpDown className="ml-auto" />
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Admin Control</SidebarGroupLabel> */}
          <SidebarMenu>
            <Nav link={ADMIN_LINKS} label={"Admin Control"} />
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-2 py-1">
          <div className="bg-red-100 text-red-800 text-xs text-center font-bold px-2 py-1 rounded w-full">
            ADMIN MODE
          </div>
        </div>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
