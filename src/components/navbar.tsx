"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
  isAdmin?: boolean;
}

export function Navbar({ user, isAdmin }: NavbarProps) {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="/home" className="font-bold text-xl">
            ACES Challenge
          </a>
          {user && (
            <div className="hidden md:flex items-center gap-4">
              <Button variant="ghost" asChild>
                <a href="/home">Home</a>
              </Button>
              <Button variant="ghost" asChild>
                <a href="/dashboard">Dashboard</a>
              </Button>
              <Button variant="ghost" asChild>
                <a href="/leaderboard">Leaderboard</a>
              </Button>
              {isAdmin && (
                <Button variant="ghost" asChild>
                  <a href="/admin">Admin</a>
                </Button>
              )}
            </div>
          )}
        </div>

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full"
              >
                <Avatar>
                  <AvatarImage
                    src={user.image || undefined}
                    alt={user.name || "User"}
                  />
                  <AvatarFallback>
                    {user.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("") || "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <a href="/dashboard">Dashboard</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/leaderboard">Leaderboard</a>
              </DropdownMenuItem>
              {isAdmin && (
                <DropdownMenuItem asChild>
                  <a href="/admin">Admin Panel</a>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild>
            <a href="/auth/login">Sign In</a>
          </Button>
        )}
      </div>
    </nav>
  );
}
