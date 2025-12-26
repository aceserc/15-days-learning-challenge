"use client";

import {
  ChevronsUpDown,
  CircleUserRound,
  LayoutDashboard,
  MedalIcon,
  Rss,
  Send,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Trophy,
} from "lucide-react";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { APP_CONFIG } from "@/content/config";
import { CHALLANGE_DATA } from "@/content/data";
import { ForYouNav } from "./for-you-nav";
import { Nav, Navlink } from "./nav";
import { NavUser } from "./nav-user";

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
  {
    name: "Guidelines",
    url: "/guidelines",
    icon: ShieldCheck,
  },
  {
    name: "Prizes",
    url: "/prizes",
    icon: MedalIcon,
  },
];

const OTHER_LINKS: Navlink[] = [
  {
    name: "Feedback",
    url: process.env.NEXT_PUBLIC_FEEDBACK_FORM_URL as string,
    icon: Send,
    target: "_blank",
  },
  {
    name: "Support",
    url: "https://www.facebook.com/acesdharan",
    target: "_blank",
    icon: CircleUserRound,
  },
];

export function AppSidebar({
  isAdmin,
  ...props
}: React.ComponentProps<typeof Sidebar> & { isAdmin?: boolean }) {
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
            <span className="truncate font-medium">Taranga, ACES x EXCESS</span>
            <span className="truncate text-xs">
              {CHALLANGE_DATA.durationInDays} Days Learning Challenge
            </span>
          </div>
          <ChevronsUpDown className="ml-auto" />
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <Nav link={GETTING_STARTED_LINKS} label="Getting Started" />
        {isAdmin && (
          <Nav
            label="Admin"
            link={[
              {
                name: "Admin Panel",
                url: "/admin",
                icon: ShieldAlert,
              },
            ]}
          />
        )}
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
