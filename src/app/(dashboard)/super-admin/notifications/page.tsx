

"use client";

import React, { useMemo, useState } from "react";
import {
  Bell,
  Check,
  CheckCheck,
  Clock3,
  CreditCard,
  Eye,
  GraduationCap,
  Info,
  Megaphone,
  MoreHorizontal,
  Search,
  Trash2,
  Users,
  AlertCircle,
  MailOpen,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type NotificationType =
  | "SYSTEM"
  | "ACADEMIC"
  | "PAYMENT"
  | "ANNOUNCEMENT";

type NotificationStatus = "READ" | "UNREAD";

type Priority = "LOW" | "MEDIUM" | "HIGH";

type Notification = {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  status: NotificationStatus;
  priority: Priority;
  recipient: string;
  createdAt: string;
};

const notificationsData: Notification[] = [
  {
    id: "NOT-001",
    title: "System maintenance scheduled",
    message:
      "CampusFlow will undergo scheduled maintenance tonight from 12:00 AM to 2:00 AM.",
    type: "SYSTEM",
    status: "UNREAD",
    priority: "HIGH",
    recipient: "All Users",
    createdAt: "Oct 06, 2026 • 04:45 PM",
  },
  {
    id: "NOT-002",
    title: "Mid-term examination schedule published",
    message:
      "The mid-term examination schedule for Fall 2026 has been published successfully.",
    type: "ACADEMIC",
    status: "UNREAD",
    priority: "HIGH",
    recipient: "Students",
    createdAt: "Oct 06, 2026 • 03:20 PM",
  },
  {
    id: "NOT-003",
    title: "Tuition payment reminder",
    message:
      "Students with outstanding tuition fees have been notified about their upcoming payment deadline.",
    type: "PAYMENT",
    status: "UNREAD",
    priority: "MEDIUM",
    recipient: "Students",
    createdAt: "Oct 06, 2026 • 01:15 PM",
  },
  {
    id: "NOT-004",
    title: "Faculty meeting announcement",
    message:
      "A university-wide faculty meeting has been scheduled for October 10, 2026.",
    type: "ANNOUNCEMENT",
    status: "READ",
    priority: "MEDIUM",
    recipient: "Instructors",
    createdAt: "Oct 05, 2026 • 05:30 PM",
  },
  {
    id: "NOT-005",
    title: "New academic term created",
    message:
      "Spring 2027 academic term has been created and is ready for configuration.",
    type: "ACADEMIC",
    status: "READ",
    priority: "LOW",
    recipient: "Administrators",
    createdAt: "Oct 05, 2026 • 02:40 PM",
  },
  {
    id: "NOT-006",
    title: "Payment gateway configuration updated",
    message:
      "The SSLCommerz payment gateway configuration has been updated successfully.",
    type: "PAYMENT",
    status: "READ",
    priority: "MEDIUM",
    recipient: "Administrators",
    createdAt: "Oct 04, 2026 • 11:10 AM",
  },
  {
    id: "NOT-007",
    title: "New department added",
    message:
      "The Department of Mathematics has been added to the Faculty of Science.",
    type: "SYSTEM",
    status: "READ",
    priority: "LOW",
    recipient: "Administrators",
    createdAt: "Oct 03, 2026 • 09:25 AM",
  },
  {
    id: "NOT-008",
    title: "Scholarship application deadline",
    message:
      "The deadline for Fall 2026 scholarship applications is approaching.",
    type: "ANNOUNCEMENT",
    status: "UNREAD",
    priority: "HIGH",
    recipient: "Students",
    createdAt: "Oct 02, 2026 • 04:15 PM",
  },
];

const typeConfig: Record<
  NotificationType,
  {
    label: string;
    icon: React.ElementType;
  }
> = {
  SYSTEM: {
    label: "System",
    icon: Info,
  },
  ACADEMIC: {
    label: "Academic",
    icon: GraduationCap,
  },
  PAYMENT: {
    label: "Payment",
    icon: CreditCard,
  },
  ANNOUNCEMENT: {
    label: "Announcement",
    icon: Megaphone,
  },
};

const priorityConfig: Record<
  Priority,
  {
    label: string;
    className: string;
  }
> = {
  LOW: {
    label: "Low",
    className:
      "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400",
  },
  MEDIUM: {
    label: "Medium",
    className:
      "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-400",
  },
  HIGH: {
    label: "High",
    className:
      "border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400",
  },
};

export default function Notifications() {
  const [notifications, setNotifications] =
    useState<Notification[]>(notificationsData);

  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<
    "ALL" | NotificationType
  >("ALL");

  const [statusFilter, setStatusFilter] = useState<
    "ALL" | NotificationStatus
  >("ALL");

  const [page, setPage] = useState(1);

  const itemsPerPage = 6;

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        !search ||
        notification.title.toLowerCase().includes(search) ||
        notification.message.toLowerCase().includes(search) ||
        notification.recipient.toLowerCase().includes(search);

      const matchesType =
        typeFilter === "ALL" || notification.type === typeFilter;

      const matchesStatus =
        statusFilter === "ALL" || notification.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [notifications, searchTerm, typeFilter, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredNotifications.length / itemsPerPage)
  );

  const currentPage = Math.min(page, totalPages);

  const paginatedNotifications = filteredNotifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const unreadCount = notifications.filter(
    (notification) => notification.status === "UNREAD"
  ).length;

  const highPriorityCount = notifications.filter(
    (notification) => notification.priority === "HIGH"
  ).length;

  const announcementCount = notifications.filter(
    (notification) => notification.type === "ANNOUNCEMENT"
  ).length;

  const markAsRead = (id: string) => {
    setNotifications((previous) =>
      previous.map((notification) =>
        notification.id === id
          ? { ...notification, status: "READ" }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((previous) =>
      previous.map((notification) => ({
        ...notification,
        status: "READ",
      }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((previous) =>
      previous.filter((notification) => notification.id !== id)
    );
  };

  const getPageNumbers = () => {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  };

  return (
    <div className="w-full space-y-5 p-3 sm:p-4 lg:p-5 xl:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:h-11 sm:w-11">
            <Bell className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-xl font-bold tracking-tight sm:text-2xl">
              Notifications
            </h1>

            <p className="truncate text-xs text-muted-foreground sm:text-sm">
              Manage university-wide system notifications and announcements.
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
          className="w-full shrink-0 gap-2 lg:w-auto"
        >
          <CheckCheck className="h-4 w-4" />
          Mark all as read
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <div className="rounded-xl border bg-card p-3 shadow-sm sm:p-4">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-xs text-muted-foreground sm:text-sm">
                Total Notifications
              </p>

              <p className="mt-1 text-xl font-bold sm:text-2xl">
                {notifications.length}
              </p>
            </div>

            <div className="shrink-0 rounded-lg bg-primary/10 p-2 text-primary sm:p-2.5">
              <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-3 shadow-sm sm:p-4">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-xs text-muted-foreground sm:text-sm">
                Unread
              </p>

              <p className="mt-1 text-xl font-bold sm:text-2xl">
                {unreadCount}
              </p>
            </div>

            <div className="shrink-0 rounded-lg bg-amber-500/10 p-2 text-amber-600 sm:p-2.5">
              <MailOpen className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-3 shadow-sm sm:p-4">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-xs text-muted-foreground sm:text-sm">
                High Priority
              </p>

              <p className="mt-1 text-xl font-bold sm:text-2xl">
                {highPriorityCount}
              </p>
            </div>

            <div className="shrink-0 rounded-lg bg-red-500/10 p-2 text-red-600 sm:p-2.5">
              <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-3 shadow-sm sm:p-4">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-xs text-muted-foreground sm:text-sm">
                Announcements
              </p>

              <p className="mt-1 text-xl font-bold sm:text-2xl">
                {announcementCount}
              </p>
            </div>

            <div className="shrink-0 rounded-lg bg-blue-500/10 p-2 text-blue-600 sm:p-2.5">
              <Megaphone className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-xl border bg-card p-3 shadow-sm sm:p-4">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_180px_160px]">
          {/* Search */}
          <div className="relative min-w-0">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
                setPage(1);
              }}
              placeholder="Search notifications..."
              className="h-10 pl-9"
            />
          </div>

          {/* Type */}
          <select
            value={typeFilter}
            onChange={(event) => {
              setTypeFilter(
                event.target.value as "ALL" | NotificationType
              );
              setPage(1);
            }}
            className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none transition focus:ring-2 focus:ring-primary/20"
          >
            <option value="ALL">All Types</option>
            <option value="SYSTEM">System</option>
            <option value="ACADEMIC">Academic</option>
            <option value="PAYMENT">Payment</option>
            <option value="ANNOUNCEMENT">Announcement</option>
          </select>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(
                event.target.value as "ALL" | NotificationStatus
              );
              setPage(1);
            }}
            className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none transition focus:ring-2 focus:ring-primary/20"
          >
            <option value="ALL">All Status</option>
            <option value="UNREAD">Unread</option>
            <option value="READ">Read</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-hidden rounded-xl border bg-card shadow-sm">
        <div className="w-full overflow-x-auto">
          <Table className="w-full table-fixed">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[34%] px-3 lg:px-4">
                  Notification
                </TableHead>

                <TableHead className="w-[11%] px-2">
                  Type
                </TableHead>

                <TableHead className="w-[13%] px-2">
                  Recipient
                </TableHead>

                <TableHead className="w-[9%] px-2">
                  Priority
                </TableHead>

                <TableHead className="w-[10%] px-2">
                  Status
                </TableHead>

                <TableHead className="w-[14%] px-2">
                  Created
                </TableHead>

                <TableHead className="w-[9%] px-2 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedNotifications.length > 0 ? (
                paginatedNotifications.map((notification) => {
                  const type = typeConfig[notification.type];
                  const TypeIcon = type.icon;
                  const priority = priorityConfig[notification.priority];

                  return (
                    <TableRow
                      key={notification.id}
                      className={
                        notification.status === "UNREAD"
                          ? "bg-primary/[0.025]"
                          : ""
                      }
                    >
                      {/* Notification */}
                      <TableCell className="px-3 py-3 lg:px-4">
                        <div className="flex min-w-0 items-start gap-2.5">
                          <div
                            className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                              notification.status === "UNREAD"
                                ? "bg-primary/10 text-primary"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            <TypeIcon className="h-4 w-4" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex min-w-0 items-center gap-1.5">
                              <p
                                className={`truncate text-xs lg:text-sm ${
                                  notification.status === "UNREAD"
                                    ? "font-semibold"
                                    : "font-medium"
                                }`}
                              >
                                {notification.title}
                              </p>

                              {notification.status === "UNREAD" && (
                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                              )}
                            </div>

                            <p className="mt-1 line-clamp-1 text-[11px] text-muted-foreground lg:text-xs">
                              {notification.message}
                            </p>

                            <p className="mt-1 text-[10px] text-muted-foreground">
                              {notification.id}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      {/* Type */}
                      <TableCell className="px-2">
                        <Badge
                          variant="outline"
                          className="max-w-full gap-1 whitespace-nowrap px-2 text-[10px] lg:text-xs"
                        >
                          <TypeIcon className="h-3 w-3 shrink-0" />
                          <span className="truncate">
                            {type.label}
                          </span>
                        </Badge>
                      </TableCell>

                      {/* Recipient */}
                      <TableCell className="px-2">
                        <div className="flex min-w-0 items-center gap-1.5">
                          <Users className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />

                          <span className="truncate text-xs">
                            {notification.recipient}
                          </span>
                        </div>
                      </TableCell>

                      {/* Priority */}
                      <TableCell className="px-2">
                        <Badge
                          variant="outline"
                          className={`px-2 text-[10px] lg:text-xs ${priority.className}`}
                        >
                          {priority.label}
                        </Badge>
                      </TableCell>

                      {/* Status */}
                      <TableCell className="px-2">
                        {notification.status === "UNREAD" ? (
                          <Badge className="gap-1 border-primary/20 bg-primary/10 px-2 text-[10px] text-primary hover:bg-primary/10 lg:text-xs">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            Unread
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="gap-1 px-2 text-[10px] text-muted-foreground lg:text-xs"
                          >
                            <Check className="h-3 w-3" />
                            Read
                          </Badge>
                        )}
                      </TableCell>

                      {/* Created */}
                      <TableCell className="px-2">
                        <div className="flex min-w-0 items-center gap-1.5 text-[10px] text-muted-foreground lg:text-xs">
                          <Clock3 className="h-3 w-3 shrink-0" />

                          <span className="truncate">
                            {notification.createdAt}
                          </span>
                        </div>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="px-2">
                        <div className="flex justify-end gap-0.5">
                          {notification.status === "UNREAD" && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              title="Mark as read"
                              onClick={() =>
                                markAsRead(notification.id)
                              }
                            >
                              <Check className="h-3.5 w-3.5" />
                            </Button>
                          )}

                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            title="View notification"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            title="Delete notification"
                            onClick={() =>
                              deleteNotification(notification.id)
                            }
                          >
                            <Trash2 className="h-3.5 w-3.5 text-destructive" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="hidden h-7 w-7 xl:inline-flex"
                            title="More actions"
                          >
                            <MoreHorizontal className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Bell className="h-8 w-8 text-muted-foreground/50" />

                      <div>
                        <p className="font-medium">
                          No notifications found
                        </p>

                        <p className="text-sm text-muted-foreground">
                          Try changing your search or filter options.
                        </p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col gap-3 border-t px-3 py-3 sm:px-4 sm:py-4 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-xs text-muted-foreground sm:text-sm">
            Showing{" "}
            <span className="font-medium text-foreground">
              {filteredNotifications.length === 0
                ? 0
                : (currentPage - 1) * itemsPerPage + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium text-foreground">
              {Math.min(
                currentPage * itemsPerPage,
                filteredNotifications.length
              )}
            </span>{" "}
            of{" "}
            <span className="font-medium text-foreground">
              {filteredNotifications.length}
            </span>{" "}
            notifications
          </p>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-2.5 text-xs"
              disabled={currentPage === 1}
              onClick={() => setPage((previous) => previous - 1)}
            >
              Previous
            </Button>

            {getPageNumbers().map((pageNumber) => (
              <Button
                key={pageNumber}
                variant={
                  currentPage === pageNumber ? "default" : "outline"
                }
                size="sm"
                className="hidden h-8 min-w-8 px-2 text-xs sm:inline-flex"
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              className="h-8 px-2.5 text-xs"
              disabled={currentPage === totalPages}
              onClick={() => setPage((previous) => previous + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

