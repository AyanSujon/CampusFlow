// import React from 'react'

// export default function Notifications() {
//   return (
//     <div>notifications</div>
//   )
// }






















"use client";

import React, { useMemo, useState } from "react";
import {
  AlertCircle,
  Bell,
  BookOpen,
  Check,
  CheckCheck,
  CreditCard,
  GraduationCap,
  Info,
  MailOpen,
  Megaphone,
  Search,
  Trash2,
  UserCheck,
  X,
} from "lucide-react";

type NotificationType =
  | "academic"
  | "exam"
  | "payment"
  | "announcement"
  | "system"
  | "attendance";

interface NotificationItem {
  id: number;
  title: string;
  message: string;
  type: NotificationType;
  date: string;
  time: string;
  read: boolean;
}

const initialNotifications: NotificationItem[] = [
  {
    id: 1,
    title: "Course Registration Reminder",
    message:
      "Course registration for Fall 2026 will close on October 12. Please complete your registration before the deadline.",
    type: "academic",
    date: "Oct 07, 2026",
    time: "10:15 AM",
    read: false,
  },
  {
    id: 2,
    title: "Midterm Examination Schedule",
    message:
      "Your midterm examination schedule has been published. Please check your examination timetable.",
    type: "exam",
    date: "Oct 06, 2026",
    time: "04:30 PM",
    read: false,
  },
  {
    id: 3,
    title: "Tuition Fee Reminder",
    message:
      "Your tuition fee payment deadline is October 15, 2026. Please complete the payment on time.",
    type: "payment",
    date: "Oct 05, 2026",
    time: "09:20 AM",
    read: false,
  },
  {
    id: 4,
    title: "University Announcement",
    message:
      "The university will remain closed on October 15 due to the scheduled academic holiday.",
    type: "announcement",
    date: "Oct 04, 2026",
    time: "02:10 PM",
    read: true,
  },
  {
    id: 5,
    title: "Attendance Warning",
    message:
      "Your attendance in CSE 301 has fallen below the required percentage. Please contact your instructor.",
    type: "attendance",
    date: "Oct 03, 2026",
    time: "11:45 AM",
    read: true,
  },
  {
    id: 6,
    title: "Profile Verification Completed",
    message:
      "Your student profile information has been successfully verified by the university administration.",
    type: "system",
    date: "Oct 02, 2026",
    time: "03:30 PM",
    read: true,
  },
  {
    id: 7,
    title: "New Course Material",
    message:
      "New study materials have been uploaded for Data Structures and Algorithms.",
    type: "academic",
    date: "Oct 01, 2026",
    time: "08:45 AM",
    read: true,
  },
];

const notificationConfig: Record<
  NotificationType,
  {
    label: string;
    icon: React.ReactNode;
    iconClassName: string;
    badgeClassName: string;
  }
> = {
  academic: {
    label: "Academic",
    icon: <BookOpen className="h-5 w-5" />,
    iconClassName:
      "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
    badgeClassName:
      "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
  },
  exam: {
    label: "Exam",
    icon: <GraduationCap className="h-5 w-5" />,
    iconClassName:
      "bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400",
    badgeClassName:
      "bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300",
  },
  payment: {
    label: "Payment",
    icon: <CreditCard className="h-5 w-5" />,
    iconClassName:
      "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
    badgeClassName:
      "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
  },
  announcement: {
    label: "Announcement",
    icon: <Megaphone className="h-5 w-5" />,
    iconClassName:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
    badgeClassName:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
  },
  system: {
    label: "System",
    icon: <Info className="h-5 w-5" />,
    iconClassName:
      "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
    badgeClassName:
      "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  },
  attendance: {
    label: "Attendance",
    icon: <UserCheck className="h-5 w-5" />,
    iconClassName:
      "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400",
    badgeClassName:
      "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300",
  },
};

export default function Notifications() {
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(initialNotifications);

  const [activeFilter, setActiveFilter] = useState<
    "all" | "unread" | NotificationType
  >("all");

  const [searchTerm, setSearchTerm] = useState("");

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      const matchesSearch =
        notification.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        notification.message
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesFilter =
        activeFilter === "all"
          ? true
          : activeFilter === "unread"
          ? !notification.read
          : notification.type === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [notifications, searchTerm, activeFilter]);

  const markAsRead = (id: number) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAsUnread = (id: number) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, read: false }
          : notification
      )
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications((current) =>
      current.filter((notification) => notification.id !== id)
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 dark:bg-slate-950 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>

            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                Notifications
              </h1>

              {unreadCount > 0 && (
                <span className="rounded-full bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white">
                  {unreadCount} unread
                </span>
              )}
            </div>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Stay updated with academic activities, payments, exams and
              university announcements.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <CheckCheck className="h-4 w-4" />
              Mark all read
            </button>

            <button
              type="button"
              onClick={clearAllNotifications}
              disabled={notifications.length === 0}
              className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-medium text-red-600 shadow-sm transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-900/50 dark:bg-slate-900 dark:text-red-400 dark:hover:bg-red-950/30"
            >
              <Trash2 className="h-4 w-4" />
              Clear all
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <NotificationStat
            icon={<Bell className="h-5 w-5" />}
            label="Total Notifications"
            value={notifications.length}
          />

          <NotificationStat
            icon={<MailOpen className="h-5 w-5" />}
            label="Unread"
            value={unreadCount}
          />

          <NotificationStat
            icon={<Check className="h-5 w-5" />}
            label="Read"
            value={notifications.length - unreadCount}
          />
        </div>

        {/* Notification Container */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {/* Search */}
          <div className="border-b border-slate-200 p-4 dark:border-slate-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search notifications..."
                className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />

              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Filters */}
          <div className="overflow-x-auto border-b border-slate-200 dark:border-slate-800">
            <div className="flex min-w-max gap-1 p-2">
              <FilterButton
                active={activeFilter === "all"}
                onClick={() => setActiveFilter("all")}
                label="All"
                count={notifications.length}
              />

              <FilterButton
                active={activeFilter === "unread"}
                onClick={() => setActiveFilter("unread")}
                label="Unread"
                count={unreadCount}
              />

              <FilterButton
                active={activeFilter === "academic"}
                onClick={() => setActiveFilter("academic")}
                label="Academic"
              />

              <FilterButton
                active={activeFilter === "exam"}
                onClick={() => setActiveFilter("exam")}
                label="Exams"
              />

              <FilterButton
                active={activeFilter === "payment"}
                onClick={() => setActiveFilter("payment")}
                label="Payments"
              />

              <FilterButton
                active={activeFilter === "announcement"}
                onClick={() => setActiveFilter("announcement")}
                label="Announcements"
              />

              <FilterButton
                active={activeFilter === "attendance"}
                onClick={() => setActiveFilter("attendance")}
                label="Attendance"
              />

              <FilterButton
                active={activeFilter === "system"}
                onClick={() => setActiveFilter("system")}
                label="System"
              />
            </div>
          </div>

          {/* List */}
          {filteredNotifications.length > 0 ? (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredNotifications.map((notification) => {
                const config = notificationConfig[notification.type];

                return (
                  <div
                    key={notification.id}
                    className={`group relative p-4 transition sm:p-5 ${
                      notification.read
                        ? "bg-white dark:bg-slate-900"
                        : "bg-blue-50/40 dark:bg-blue-950/10"
                    } hover:bg-slate-50 dark:hover:bg-slate-800/40`}
                  >
                    <div className="flex gap-3 sm:gap-4">
                      {/* Icon */}
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full sm:h-11 sm:w-11 ${config.iconClassName}`}
                      >
                        {config.icon}
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              {!notification.read && (
                                <span className="h-2 w-2 rounded-full bg-blue-600" />
                              )}

                              <h3
                                className={`text-sm ${
                                  notification.read
                                    ? "font-medium"
                                    : "font-semibold"
                                } text-slate-900 dark:text-white`}
                              >
                                {notification.title}
                              </h3>

                              <span
                                className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${config.badgeClassName}`}
                              >
                                {config.label}
                              </span>
                            </div>

                            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                              {notification.message}
                            </p>
                          </div>

                          <div className="shrink-0 text-xs text-slate-400">
                            <p>{notification.date}</p>
                            <p className="mt-1">{notification.time}</p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-4 flex flex-wrap items-center gap-2">
                          {notification.read ? (
                            <button
                              type="button"
                              onClick={() => markAsUnread(notification.id)}
                              className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                            >
                              <MailOpen className="h-3.5 w-3.5" />
                              Mark unread
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => markAsRead(notification.id)}
                              className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-blue-600 transition hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/30"
                            >
                              <Check className="h-3.5 w-3.5" />
                              Mark as read
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => deleteNotification(notification.id)}
                            className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950/30"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState
              searchTerm={searchTerm}
              onClear={() => {
                setSearchTerm("");
                setActiveFilter("all");
              }}
            />
          )}
        </div>

        {/* Footer Info */}
        <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />

          <div>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Notification preferences
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
              You can manage which academic, payment and university
              notifications you receive from your account settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function NotificationStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <div className="rounded-lg bg-blue-50 p-2.5 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
          {icon}
        </div>

        <span className="text-2xl font-bold text-slate-900 dark:text-white">
          {value}
        </span>
      </div>

      <p className="mt-4 text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </p>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count?: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
        active
          ? "bg-blue-600 text-white"
          : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
      }`}
    >
      {label}

      {count !== undefined && (
        <span
          className={`rounded-full px-1.5 py-0.5 text-[10px] ${
            active
              ? "bg-white/20 text-white"
              : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}

function EmptyState({
  searchTerm,
  onClear,
}: {
  searchTerm: string;
  onClear: () => void;
}) {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800">
        <Bell className="h-7 w-7" />
      </div>

      <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">
        No notifications found
      </h3>

      <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">
        {searchTerm
          ? "No notifications match your search. Try a different keyword."
          : "There are no notifications available in this category."}
      </p>

      {(searchTerm || true) && (
        <button
          type="button"
          onClick={onClear}
          className="mt-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}

