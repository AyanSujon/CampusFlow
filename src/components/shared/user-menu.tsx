

"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useGetMe } from "@/hooks/auth.hook";

function getInitials(name?: string | null) {
  if (!name) return "U";

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function formatRole(role?: string | null) {
  if (!role) return "User";

  return role
    .toLowerCase()
    .split("_")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
}

type UserMenuProps = {
  onLogout: () => void;
  isLoggingOut?: boolean;
};

export default function UserMenu(
  {
    onLogout,
    isLoggingOut = false,
  }: UserMenuProps
) {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useGetMe();

  console.log(user)

  /*
   * Loading state
   */
  if (isLoading) {
    return (
      <div
        className="h-9 w-9 animate-pulse rounded-full bg-muted"
        aria-hidden="true"
      />
    );
  }

  /*
   * Don't render the menu when
   * there is no authenticated user.
   */
  if (!user) {
    return null;
  }

  const name = user.data.name ?? "User";
  const email = user.data.email ?? "";
  const role = formatRole(user.data.role);

  return (
    <DropdownMenu>
      {/* =====================================================
          Avatar Trigger
      ====================================================== */}
      <DropdownMenuTrigger
        aria-label="Open user menu"
        className="
          flex h-9 w-9 shrink-0
          items-center justify-center
          rounded-full
          outline-none
          ring-offset-background
          transition-colors
          hover:bg-accent
          focus-visible:ring-2
          focus-visible:ring-ring
          focus-visible:ring-offset-2
          disabled:pointer-events-none
          disabled:opacity-50
        "
      >
        <Avatar className="h-9 w-9">
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt={name}
          />

          <AvatarFallback>
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      {/* =====================================================
          Dropdown Content
      ====================================================== */}
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-64"
      >
        {/* =================================================
            Menu Group

            Base UI DropdownMenuLabel requires a group
            context.
        ================================================== */}
        <DropdownMenuGroup>
          {/* ===============================================
              User Information
          ================================================ */}
          <DropdownMenuLabel className="font-normal">
            <div className="flex items-center gap-3">
              {/* User Avatar */}
              <Avatar className="h-10 w-10 shrink-0">
                <AvatarImage
                  src={user.profile?.profilePhoto ?? ""}
                  alt={name}
                />

                <AvatarFallback>
                  {getInitials(name)}
                </AvatarFallback>
              </Avatar>

              {/* User Details */}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">
                  {name}
                </p>

                <p className="truncate text-xs text-muted-foreground">
                  {email}
                </p>

                <p className="mt-1 text-xs font-medium text-primary">
                  {role}
                </p>
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          {/* ===============================================
              Profile
          ================================================ */}
          <DropdownMenuItem
            render={
              <Link href="/profile">
                <User />
                <span>Profile</span>
              </Link>
            }
          />

          {/* ===============================================
              Dashboard
          ================================================ */}
          <DropdownMenuItem
            render={
              <Link href="/dashboard">
                <LayoutDashboard />
                <span>Dashboard</span>
              </Link>
            }
          />

          {/* ===============================================
              Settings
          ================================================ */}
          <DropdownMenuItem
            render={
              <Link href="/settings">
                <Settings />
                <span>Settings</span>
              </Link>
            }
          />
        </DropdownMenuGroup>

        {/* =================================================
            Logout
        ================================================== */}
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={onLogout}
          className="text-destructive focus:text-destructive"
        >
          <LogOut />

          <span>
            {isLoggingOut
              ? "Logging out..."
              : "Logout"}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}