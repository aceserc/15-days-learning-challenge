"use client";

import * as React from "react";
import {
  ChevronsUpDown,
  CircleUserRound,
  LayoutDashboard,
  Rss,
  Send,
  Trophy,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { CHALLANGE_DATA } from "@/content/data";
import { APP_CONFIG } from "@/content/config";
import { Nav, Navlink } from "./nav";
import { ForYouNav } from "./for-you-nav";

const GETTING_STARTED_LINKS: Navlink[] = [
  {
    name: "Dashboard",
    url: "/",
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

const OTHER_LINKS: Navlink[] = [
  {
    name: "Feedback",
    url: "/feedback",
    icon: Send,
  },
  {
    name: "Support",
    url: "/support",
    icon: CircleUserRound,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground border"
        >
          <div className="border text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <img
              src={APP_CONFIG.logo}
              className="size-6 object-contain object-center"
            />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{APP_CONFIG.name}</span>
            <span className="truncate text-xs">
              {CHALLANGE_DATA.durationInDays} Days Learning Challenge
            </span>
          </div>
          <ChevronsUpDown className="ml-auto" />
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <Nav link={GETTING_STARTED_LINKS} label="Getting Started" />
        <ForYouNav />
        <div className="mt-auto">
          <Nav link={OTHER_LINKS} label="More" />
        </div>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
