// import React from 'react'

// export default function notifications() {
//   return (
//     <div>notifications</div>
//   )
// }












"use client";

import { useMemo, useState } from "react";
import {
    Bell,
    BookOpen,
    CheckCheck,
    CheckCircle2,
    Clock,
    CreditCard,
    GraduationCap,
    MoreHorizontal,
    Search,
    Settings2,
    ShieldAlert,
    Trash2,
    UserPlus,
    Users,
    X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type NotificationType =
    | "STUDENT"
    | "COURSE"
    | "FINANCE"
    | "SYSTEM"
    | "INSTRUCTOR";

type NotificationItem = {
    id: string;
    title: string;
    message: string;
    type: NotificationType;
    createdAt: string;
    read: boolean;
};

type FilterType = "ALL" | "UNREAD" | "READ";

const initialNotifications: NotificationItem[] = [
    {
        id: "1",
        title: "New student registration",
        message:
            "A new student registration is awaiting review. Check the student profile and verify the submitted information.",
        type: "STUDENT",
        createdAt: "2026-10-29T09:45:00",
        read: false,
    },
    {
        id: "2",
        title: "Course enrollment is nearly full",
        message:
            "Data Structures and Algorithms has reached 38 out of 45 available seats. Review enrollment capacity if needed.",
        type: "COURSE",
        createdAt: "2026-10-29T08:30:00",
        read: false,
    },
    {
        id: "3",
        title: "Payment record updated",
        message:
            "A student payment record has been updated. Review the finance section to confirm the latest transaction details.",
        type: "FINANCE",
        createdAt: "2026-10-28T16:20:00",
        read: false,
    },
    {
        id: "4",
        title: "Instructor verification pending",
        message:
            "An instructor profile is awaiting verification. Review the submitted credentials before approving the account.",
        type: "INSTRUCTOR",
        createdAt: "2026-10-28T14:10:00",
        read: false,
    },
    {
        id: "5",
        title: "System maintenance reminder",
        message:
            "Review the planned maintenance schedule and ensure the relevant team members are informed.",
        type: "SYSTEM",
        createdAt: "2026-10-28T11:00:00",
        read: true,
    },
    {
        id: "6",
        title: "New course draft created",
        message:
            "A new course draft has been created. Review its details before making it available for enrollment.",
        type: "COURSE",
        createdAt: "2026-10-27T15:35:00",
        read: true,
    },
    {
        id: "7",
        title: "Student profile updated",
        message:
            "Student information was updated in the university management system.",
        type: "STUDENT",
        createdAt: "2026-10-27T10:15:00",
        read: true,
    },
];

const typeConfig: Record<
    NotificationType,
    {
        label: string;
        icon: typeof Bell;
        className: string;
    }
> = {
    STUDENT: {
        label: "Student",
        icon: Users,
        className:
            "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    },
    COURSE: {
        label: "Course",
        icon: BookOpen,
        className:
            "bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
    },
    FINANCE: {
        label: "Finance",
        icon: CreditCard,
        className:
            "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    },
    SYSTEM: {
        label: "System",
        icon: ShieldAlert,
        className:
            "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    },
    INSTRUCTOR: {
        label: "Instructor",
        icon: GraduationCap,
        className:
            "bg-pink-50 text-pink-700 dark:bg-pink-950 dark:text-pink-300",
    },
};

function formatNotificationDate(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const notificationDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
    );

    const time = date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
    });

    if (notificationDay.getTime() === today.getTime()) {
        return `Today, ${time}`;
    }

    if (notificationDay.getTime() === yesterday.getTime()) {
        return `Yesterday, ${time}`;
    }

    return `${date.toLocaleDateString([], {
        month: "short",
        day: "numeric",
        year: date.getFullYear() === now.getFullYear() ? undefined : "numeric",
    })}, ${time}`;
}

function NotificationIcon({ type }: { type: NotificationType }) {
    const config = typeConfig[type];
    const Icon = config.icon;

    return (
        <div
            className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${config.className}`}
        >
            <Icon className="size-5" />
        </div>
    );
}

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState<NotificationItem[]>(
        initialNotifications,
    );
    const [filter, setFilter] = useState<FilterType>("ALL");
    const [search, setSearch] = useState("");
    const [selectedType, setSelectedType] = useState<NotificationType | "ALL">(
        "ALL",
    );

    const unreadCount = notifications.filter(
        (notification) => !notification.read,
    ).length;

    const readCount = notifications.filter(
        (notification) => notification.read,
    ).length;

    const filteredNotifications = useMemo(() => {
        const query = search.trim().toLowerCase();

        return notifications.filter((notification) => {
            const matchesSearch =
                !query ||
                notification.title.toLowerCase().includes(query) ||
                notification.message.toLowerCase().includes(query);

            const matchesFilter =
                filter === "ALL" ||
                (filter === "UNREAD" && !notification.read) ||
                (filter === "READ" && notification.read);

            const matchesType =
                selectedType === "ALL" || notification.type === selectedType;

            return matchesSearch && matchesFilter && matchesType;
        });
    }, [notifications, search, filter, selectedType]);

    function markAsRead(id: string) {
        setNotifications((current) =>
            current.map((notification) =>
                notification.id === id
                    ? { ...notification, read: true }
                    : notification,
            ),
        );
    }

    function markAsUnread(id: string) {
        setNotifications((current) =>
            current.map((notification) =>
                notification.id === id
                    ? { ...notification, read: false }
                    : notification,
            ),
        );
    }

    function markAllAsRead() {
        setNotifications((current) =>
            current.map((notification) => ({ ...notification, read: true })),
        );
    }

    function deleteNotification(id: string) {
        setNotifications((current) =>
            current.filter((notification) => notification.id !== id),
        );
    }

    function clearReadNotifications() {
        setNotifications((current) =>
            current.filter((notification) => !notification.read),
        );
    }

    return (
        <div className="w-full min-w-0 space-y-6 overflow-x-clip pb-8 p-4">
            {/* Page heading */}
            <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            Notifications
                        </h1>

                        {unreadCount > 0 && (
                            <Badge className="shrink-0 rounded-full">
                                {unreadCount} new
                            </Badge>
                        )}
                    </div>

                    <p className="text-sm text-muted-foreground sm:text-base">
                        Stay updated on student activities, courses, finance, and system
                        events.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        className="flex-1 sm:flex-none"
                        onClick={markAllAsRead}
                        disabled={unreadCount === 0}
                    >
                        <CheckCheck className="mr-2 size-4" />
                        Mark all as read
                    </Button>
                </div>
            </div>

            {/* Summary cards */}
            <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-3">
                <Card className="min-w-0">
                    <CardContent className="flex items-center justify-between gap-3 p-5">
                        <div className="min-w-0 space-y-1">
                            <p className="text-sm text-muted-foreground">
                                Total Notifications
                            </p>
                            <p className="text-2xl font-bold tabular-nums">
                                {notifications.length}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                All notifications
                            </p>
                        </div>

                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <Bell className="size-5" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="min-w-0">
                    <CardContent className="flex items-center justify-between gap-3 p-5">
                        <div className="min-w-0 space-y-1">
                            <p className="text-sm text-muted-foreground">
                                Unread Notifications
                            </p>
                            <p className="text-2xl font-bold tabular-nums">{unreadCount}</p>
                            <p className="text-xs text-muted-foreground">
                                Require your attention
                            </p>
                        </div>

                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                            <Bell className="size-5" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="min-w-0">
                    <CardContent className="flex items-center justify-between gap-3 p-5">
                        <div className="min-w-0 space-y-1">
                            <p className="text-sm text-muted-foreground">
                                Read Notifications
                            </p>
                            <p className="text-2xl font-bold tabular-nums">{readCount}</p>
                            <p className="text-xs text-muted-foreground">
                                Already reviewed
                            </p>
                        </div>

                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                            <CheckCircle2 className="size-5" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Notification list */}
            <Card className="min-w-0 overflow-hidden">
                <div className="space-y-4 border-b p-4 sm:p-5">
                    <div className="flex min-w-0 flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                        <div className="min-w-0">
                            <h2 className="font-semibold">Your notifications</h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Review and manage your recent activity.
                            </p>
                        </div>

                        {readCount > 0 && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="w-fit text-muted-foreground"
                                onClick={clearReadNotifications}
                            >
                                <Trash2 className="mr-2 size-4" />
                                Clear read
                            </Button>
                        )}
                    </div>

                    {/* Search */}
                    <div className="relative min-w-0">
                        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search notifications..."
                            aria-label="Search notifications"
                            className="w-full min-w-0 pl-9"
                        />
                    </div>

                    {/* Filters */}
                    <div className="flex min-w-0 flex-col gap-3">
                        <div className="flex max-w-full flex-wrap gap-2">
                            {(
                                [
                                    ["ALL", "All"],
                                    ["UNREAD", "Unread"],
                                    ["READ", "Read"],
                                ] as const
                            ).map(([value, label]) => (
                                <Button
                                    key={value}
                                    type="button"
                                    size="sm"
                                    variant={filter === value ? "default" : "outline"}
                                    onClick={() => setFilter(value)}
                                    className="min-w-16"
                                >
                                    {label}
                                    {value === "UNREAD" && unreadCount > 0 && (
                                        <span className="ml-1 tabular-nums">{unreadCount}</span>
                                    )}
                                </Button>
                            ))}
                        </div>

                        <div className="flex min-w-0 flex-wrap gap-2">
                            {(
                                [
                                    ["ALL", "All types"],
                                    ["STUDENT", "Students"],
                                    ["COURSE", "Courses"],
                                    ["FINANCE", "Finance"],
                                    ["INSTRUCTOR", "Instructors"],
                                    ["SYSTEM", "System"],
                                ] as const
                            ).map(([value, label]) => (
                                <Button
                                    key={value}
                                    type="button"
                                    size="sm"
                                    variant={selectedType === value ? "secondary" : "ghost"}
                                    onClick={() => setSelectedType(value)}
                                    className="max-w-full"
                                >
                                    {label}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Notifications */}
                <div className="divide-y">
                    {filteredNotifications.map((notification) => {
                        const config = typeConfig[notification.type];

                        return (
                            <div
                                key={notification.id}
                                className={`group min-w-0 p-4 transition-colors hover:bg-muted/30 sm:p-5 ${!notification.read ? "bg-primary/[0.025]" : ""
                                    }`}
                            >
                                <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                                    <div className="relative shrink-0">
                                        <NotificationIcon type={notification.type} />
                                        {!notification.read && (
                                            <span
                                                className="absolute -right-1 -top-1 size-3 rounded-full border-2 border-background bg-primary"
                                                aria-label="Unread"
                                            />
                                        )}
                                    </div>

                                    <div className="min-w-0 flex-1 space-y-2">
                                        <div className="flex min-w-0 flex-wrap items-center gap-2">
                                            <h3
                                                className={`break-words text-sm leading-snug ${notification.read
                                                    ? "font-medium"
                                                    : "font-semibold"
                                                    }`}
                                            >
                                                {notification.title}
                                            </h3>

                                            {!notification.read && (
                                                <Badge
                                                    variant="outline"
                                                    className="border-primary/20 bg-primary/5 text-xs text-primary"
                                                >
                                                    New
                                                </Badge>
                                            )}
                                        </div>

                                        <p className="break-words text-sm leading-relaxed text-muted-foreground">
                                            {notification.message}
                                        </p>

                                        <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2 pt-1">
                                            <span
                                                className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${config.className}`}
                                            >
                                                <config.icon className="size-3.5" />
                                                {config.label}
                                            </span>

                                            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                                                <Clock className="size-3.5" />
                                                {formatNotificationDate(notification.createdAt)}
                                            </span>
                                        </div>

                                        {/* Mobile actions */}
                                        <div className="flex flex-wrap gap-2 pt-1 sm:hidden">
                                            {notification.read ? (
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => markAsUnread(notification.id)}
                                                >
                                                    Mark unread
                                                </Button>
                                            ) : (
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => markAsRead(notification.id)}
                                                >
                                                    <CheckCheck className="mr-1.5 size-4" />
                                                    Mark as read
                                                </Button>
                                            )}

                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="text-muted-foreground"
                                                onClick={() => deleteNotification(notification.id)}
                                            >
                                                <Trash2 className="mr-1.5 size-4" />
                                                Delete
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Desktop actions */}
                                    <div className="hidden shrink-0 items-center gap-1 sm:flex">
                                        {notification.read ? (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="size-9"
                                                title="Mark as unread"
                                                aria-label="Mark notification as unread"
                                                onClick={() => markAsUnread(notification.id)}
                                            >
                                                <Bell className="size-4" />
                                            </Button>
                                        ) : (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="size-9"
                                                title="Mark as read"
                                                aria-label="Mark notification as read"
                                                onClick={() => markAsRead(notification.id)}
                                            >
                                                <CheckCheck className="size-4" />
                                            </Button>
                                        )}

                                        <DropdownMenu>
                                            <DropdownMenuTrigger
                                                render={
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        className="size-9"
                                                        aria-label="More notification actions"
                                                    >
                                                        <MoreHorizontal className="size-4" />
                                                    </Button>
                                                }
                                            />
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        notification.read
                                                            ? markAsUnread(notification.id)
                                                            : markAsRead(notification.id)
                                                    }
                                                >
                                                    {notification.read ? (
                                                        <Bell className="mr-2 size-4" />
                                                    ) : (
                                                        <CheckCheck className="mr-2 size-4" />
                                                    )}
                                                    Mark as {notification.read ? "unread" : "read"}
                                                </DropdownMenuItem>

                                                <DropdownMenuItem
                                                    onClick={() => deleteNotification(notification.id)}
                                                    className="text-destructive focus:text-destructive"
                                                >
                                                    <Trash2 className="mr-2 size-4" />
                                                    Delete notification
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Empty state */}
                    {filteredNotifications.length === 0 && (
                        <div className="flex flex-col items-center justify-center px-4 py-14 text-center">
                            <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-muted">
                                {search ? (
                                    <Search className="size-6 text-muted-foreground" />
                                ) : (
                                    <Bell className="size-6 text-muted-foreground" />
                                )}
                            </div>

                            <h3 className="font-semibold">No notifications found</h3>

                            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                                {search ||
                                    filter !== "ALL" ||
                                    selectedType !== "ALL"
                                    ? "Try changing your search or filters."
                                    : "You're all caught up. New notifications will appear here."}
                            </p>

                            {(search ||
                                filter !== "ALL" ||
                                selectedType !== "ALL") && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="mt-4"
                                        onClick={() => {
                                            setSearch("");
                                            setFilter("ALL");
                                            setSelectedType("ALL");
                                        }}
                                    >
                                        <X className="mr-2 size-4" />
                                        Clear filters
                                    </Button>
                                )}
                        </div>
                    )}
                </div>

                {/* List footer */}
                {filteredNotifications.length > 0 && (
                    <div className="flex flex-col gap-2 border-t bg-muted/20 px-4 py-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-5">
                        <span>
                            Showing {filteredNotifications.length} of {notifications.length}{" "}
                            notifications
                        </span>
                        <span>Updates are currently stored in page state only.</span>
                    </div>
                )}
            </Card>
        </div>
    );
}

