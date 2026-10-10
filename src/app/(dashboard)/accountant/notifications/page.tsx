// import React from 'react'

// export default function notifications() {
//     return (
//         <div>notifications</div>
//     )
// }















"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
    AlertTriangle,
    ArrowDownLeft,
    ArrowRight,
    Bell,
    Check,
    CheckCheck,
    ChevronDown,
    CircleDollarSign,
    Clock3,
    CreditCard,
    FileText,
    Filter,
    Info,
    Receipt,
    RefreshCw,
    Search,
    Settings2,
    ShieldCheck,
    Trash2,
    Wallet,
    X,
    type LucideIcon,
} from "lucide-react";

type NotificationCategory =
    | "Payment"
    | "Invoice"
    | "Refund"
    | "Outstanding"
    | "System";

type NotificationItem = {
    id: string;
    title: string;
    description: string;
    category: NotificationCategory;
    date: string;
    timestamp: number;
    read: boolean;
    priority: "high" | "medium" | "low";
    actionLabel?: string;
    actionUrl?: string;
};

const initialNotifications: NotificationItem[] = [
    {
        id: "NOT-1001",
        title: "Large payment awaiting verification",
        description:
            "A payment of ৳85,000 from Ayan Sujon is awaiting verification. Review the gateway transaction before confirming the payment.",
        category: "Payment",
        date: "Today, 10:42 AM",
        timestamp: 10,
        read: false,
        priority: "high",
        actionLabel: "Review payment",
        actionUrl: "/accountant/payments",
    },
    {
        id: "NOT-1002",
        title: "Overdue invoices require attention",
        description:
            "Several student invoices have passed their due dates. Review outstanding balances and follow up where necessary.",
        category: "Outstanding",
        date: "Today, 9:30 AM",
        timestamp: 9,
        read: false,
        priority: "high",
        actionLabel: "View outstanding fees",
        actionUrl: "/accountant/outstanding-fees",
    },
    {
        id: "NOT-1003",
        title: "Refund request received",
        description:
            "A refund request for ৳5,000 has been submitted for review. Check the original payment and refund reason.",
        category: "Refund",
        date: "Today, 8:15 AM",
        timestamp: 8,
        read: false,
        priority: "medium",
        actionLabel: "Review refund",
        actionUrl: "/accountant/refunds",
    },
    {
        id: "NOT-1004",
        title: "Payment successfully verified",
        description:
            "Payment PAY-2026-1042 for ৳25,000 has been verified. The related invoice can now reflect the confirmed payment.",
        category: "Payment",
        date: "Yesterday, 4:20 PM",
        timestamp: 7,
        read: true,
        priority: "low",
        actionLabel: "View payments",
        actionUrl: "/accountant/payments",
    },
    {
        id: "NOT-1005",
        title: "New invoice issued",
        description:
            "Invoice INV-2026-0085 for ৳35,000 has been issued to a student. Check its due date and delivery status.",
        category: "Invoice",
        date: "Yesterday, 2:10 PM",
        timestamp: 6,
        read: false,
        priority: "medium",
        actionLabel: "View invoices",
        actionUrl: "/accountant/invoices",
    },
    {
        id: "NOT-1006",
        title: "Financial report is ready",
        description:
            "The latest financial summary is available to review for collection trends, payment activity and outstanding balances.",
        category: "System",
        date: "Oct 08, 2026",
        timestamp: 5,
        read: true,
        priority: "low",
        actionLabel: "View reports",
        actionUrl: "/accountant/reports/financial",
    },
    {
        id: "NOT-1007",
        title: "Failed payment attempt",
        description:
            "A student's payment attempt was unsuccessful. Check the payment record before advising the student to retry.",
        category: "Payment",
        date: "Oct 08, 2026",
        timestamp: 4,
        read: false,
        priority: "medium",
        actionLabel: "View payments",
        actionUrl: "/accountant/payments",
    },
    {
        id: "NOT-1008",
        title: "Invoice due date approaching",
        description:
            "Some issued invoices are approaching their payment deadlines. Review the due dates and send reminders if appropriate.",
        category: "Outstanding",
        date: "Oct 07, 2026",
        timestamp: 3,
        read: true,
        priority: "low",
        actionLabel: "View invoices",
        actionUrl: "/accountant/outstanding-fees",
    },
    {
        id: "NOT-1009",
        title: "System maintenance notice",
        description:
            "Scheduled maintenance may temporarily affect finance operations. Ensure pending reconciliation tasks are reviewed.",
        category: "System",
        date: "Oct 06, 2026",
        timestamp: 2,
        read: true,
        priority: "low",
        actionLabel: "View dashboard",
        actionUrl: "/accountant",
    },
];

const categoryConfig: Record<
    NotificationCategory,
    { icon: LucideIcon; className: string }
> = {
    Payment: {
        icon: CreditCard,
        className:
            "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400",
    },
    Invoice: {
        icon: Receipt,
        className:
            "bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-400",
    },
    Refund: {
        icon: ArrowDownLeft,
        className:
            "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400",
    },
    Outstanding: {
        icon: AlertTriangle,
        className:
            "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400",
    },
    System: {
        icon: Info,
        className:
            "bg-muted text-muted-foreground",
    },
};

const categories = [
    "All",
    "Payment",
    "Invoice",
    "Refund",
    "Outstanding",
    "System",
] as const;

type CategoryFilter = (typeof categories)[number];

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState(initialNotifications);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState<CategoryFilter>("All");
    const [unreadOnly, setUnreadOnly] = useState(false);
    const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
    const [visibleCount, setVisibleCount] = useState(6);
    const [showFilters, setShowFilters] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    const unreadCount = notifications.filter((item) => !item.read).length;
    const readCount = notifications.filter((item) => item.read).length;

    const filteredNotifications = useMemo(() => {
        const query = search.trim().toLowerCase();

        return notifications
            .filter((item) => {
                const matchesSearch =
                    !query ||
                    item.title.toLowerCase().includes(query) ||
                    item.description.toLowerCase().includes(query) ||
                    item.id.toLowerCase().includes(query) ||
                    item.category.toLowerCase().includes(query);

                const matchesCategory =
                    category === "All" || item.category === category;

                const matchesUnread = !unreadOnly || !item.read;

                return matchesSearch && matchesCategory && matchesUnread;
            })
            .sort((a, b) =>
                sortOrder === "newest"
                    ? b.timestamp - a.timestamp
                    : a.timestamp - b.timestamp
            );
    }, [notifications, search, category, unreadOnly, sortOrder]);

    const visibleNotifications = filteredNotifications.slice(0, visibleCount);

    const markAsRead = (id: string) => {
        setNotifications((current) =>
            current.map((item) =>
                item.id === id ? { ...item, read: true } : item
            )
        );
    };

    const markAllAsRead = () => {
        setNotifications((current) =>
            current.map((item) => ({ ...item, read: true }))
        );
    };

    const deleteNotification = (id: string) => {
        setNotifications((current) =>
            current.filter((item) => item.id !== id)
        );
    };

    const clearReadNotifications = () => {
        setNotifications((current) =>
            current.filter((item) => !item.read)
        );
    };

    const resetFilters = () => {
        setSearch("");
        setCategory("All");
        setUnreadOnly(false);
        setSortOrder("newest");
        setVisibleCount(6);
    };

    return (
        <main className="min-h-screen min-w-0 overflow-x-clip bg-background text-foreground">
            <div className="mx-auto w-full max-w-[1500px] min-w-0 space-y-6 p-4 sm:p-6 lg:p-8">
                {/* Header */}
                <header className="flex min-w-0 flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="min-w-0">

                        <div className="flex flex-wrap items-center gap-3">
                            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                                Notifications
                            </h1>
                            {unreadCount > 0 && (
                                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                                    {unreadCount} unread
                                </span>
                            )}
                        </div>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                            Stay updated on payment verification, overdue invoices,
                            refund requests and important finance activities.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setShowSettings((value) => !value)}
                            className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm font-medium transition hover:bg-muted"
                        >
                            <Settings2 size={16} />
                            Preferences
                        </button>

                        <button
                            type="button"
                            onClick={markAllAsRead}
                            disabled={unreadCount === 0}
                            className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <CheckCheck size={16} />
                            <span className="hidden sm:inline">Mark all as read</span>
                            <span className="sm:hidden">Mark all read</span>
                        </button>
                    </div>
                </header>

                {/* Preferences */}
                {showSettings && (
                    <section className="rounded-xl border border-border bg-card p-4 sm:p-5">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <h2 className="font-semibold">Notification preferences</h2>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Manage how you view finance notifications.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowSettings(false)}
                                className="rounded-lg p-2 hover:bg-muted"
                                aria-label="Close preferences"
                            >
                                <X size={17} />
                            </button>
                        </div>

                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                            <label className="flex items-center gap-3 rounded-lg border border-border p-3">
                                <input
                                    type="checkbox"
                                    defaultChecked
                                    className="size-4 accent-primary"
                                />
                                <span className="text-sm">
                                    <span className="block font-medium">
                                        Payment alerts
                                    </span>
                                    <span className="mt-1 block text-xs text-muted-foreground">
                                        Pending, verified and failed payments
                                    </span>
                                </span>
                            </label>

                            <label className="flex items-center gap-3 rounded-lg border border-border p-3">
                                <input
                                    type="checkbox"
                                    defaultChecked
                                    className="size-4 accent-primary"
                                />
                                <span className="text-sm">
                                    <span className="block font-medium">
                                        Invoice reminders
                                    </span>
                                    <span className="mt-1 block text-xs text-muted-foreground">
                                        Due dates and overdue invoices
                                    </span>
                                </span>
                            </label>

                            <label className="flex items-center gap-3 rounded-lg border border-border p-3">
                                <input
                                    type="checkbox"
                                    defaultChecked
                                    className="size-4 accent-primary"
                                />
                                <span className="text-sm">
                                    <span className="block font-medium">
                                        Refund updates
                                    </span>
                                    <span className="mt-1 block text-xs text-muted-foreground">
                                        Refund requests and status changes
                                    </span>
                                </span>
                            </label>

                            <label className="flex items-center gap-3 rounded-lg border border-border p-3">
                                <input
                                    type="checkbox"
                                    defaultChecked
                                    className="size-4 accent-primary"
                                />
                                <span className="text-sm">
                                    <span className="block font-medium">
                                        System announcements
                                    </span>
                                    <span className="mt-1 block text-xs text-muted-foreground">
                                        Finance system and maintenance updates
                                    </span>
                                </span>
                            </label>
                        </div>

                        <p className="mt-3 text-xs text-muted-foreground">
                            These preference controls are UI-only until connected to a
                            notification preferences API.
                        </p>
                    </section>
                )}

                {/* Summary cards */}
                <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Total notifications
                                </p>
                                <p className="mt-2 text-2xl font-bold">
                                    {notifications.length}
                                </p>
                            </div>
                            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <Bell size={21} />
                            </div>
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">
                            All finance-related updates
                        </p>
                    </div>

                    <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Unread
                                </p>
                                <p className="mt-2 text-2xl font-bold">{unreadCount}</p>
                            </div>
                            <div className="flex size-11 items-center justify-center rounded-xl bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
                                <Clock3 size={21} />
                            </div>
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">
                            Notifications awaiting your attention
                        </p>
                    </div>

                    <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Read
                                </p>
                                <p className="mt-2 text-2xl font-bold">{readCount}</p>
                            </div>
                            <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                                <CheckCheck size={21} />
                            </div>
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">
                            Notifications already reviewed
                        </p>
                    </div>
                </section>

                {/* Alert banner */}
                {unreadCount > 0 && (
                    <section className="flex min-w-0 items-start gap-3 rounded-xl border border-amber-300/60 bg-amber-50/70 p-4 dark:border-amber-900 dark:bg-amber-950/20 sm:items-center">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400">
                            <AlertTriangle size={20} />
                        </div>
                        <div className="min-w-0 flex-1">
                            <h2 className="text-sm font-semibold">
                                You have {unreadCount} unread notifications
                            </h2>
                            <p className="mt-1 text-sm leading-5 text-muted-foreground">
                                Review payment confirmations, outstanding invoices and
                                refund requests that may require action.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setUnreadOnly(true)}
                            className="shrink-0 text-sm font-semibold text-amber-800 hover:underline dark:text-amber-400"
                        >
                            Review unread
                        </button>
                    </section>
                )}

                {/* Search and filters */}
                <section className="rounded-xl border border-border bg-card p-4 sm:p-5">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                        <div className="flex h-11 min-w-0 flex-1 items-center gap-2 rounded-lg border border-border px-3">
                            <Search size={17} className="shrink-0 text-muted-foreground" />
                            <input
                                type="search"
                                value={search}
                                onChange={(event) => {
                                    setSearch(event.target.value);
                                    setVisibleCount(6);
                                }}
                                placeholder="Search notifications, IDs or descriptions..."
                                aria-label="Search notifications"
                                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                            />
                            {search && (
                                <button
                                    type="button"
                                    onClick={() => setSearch("")}
                                    aria-label="Clear search"
                                    className="rounded-md p-1 hover:bg-muted"
                                >
                                    <X size={15} />
                                </button>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={() => setShowFilters((value) => !value)}
                            aria-expanded={showFilters}
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-border px-4 text-sm font-medium hover:bg-muted"
                        >
                            <Filter size={16} />
                            Filters
                            <ChevronDown
                                size={15}
                                className={`transition-transform ${showFilters ? "rotate-180" : ""}`}
                            />
                        </button>

                        <label className="flex h-11 items-center gap-2 rounded-lg border border-border px-3 text-sm">
                            <span className="whitespace-nowrap text-muted-foreground">
                                Sort:
                            </span>
                            <select
                                value={sortOrder}
                                onChange={(event) =>
                                    setSortOrder(event.target.value as "newest" | "oldest")
                                }
                                className="min-w-0 bg-transparent font-medium outline-none"
                            >
                                <option value="newest">Newest first</option>
                                <option value="oldest">Oldest first</option>
                            </select>
                        </label>
                    </div>

                    {showFilters && (
                        <div className="mt-4 grid grid-cols-1 gap-4 border-t border-border pt-4 sm:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="notification-category"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Category
                                </label>
                                <select
                                    id="notification-category"
                                    value={category}
                                    onChange={(event) => {
                                        setCategory(event.target.value as CategoryFilter);
                                        setVisibleCount(6);
                                    }}
                                    className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                                >
                                    {categories.map((item) => (
                                        <option key={item} value={item}>
                                            {item === "All" ? "All categories" : item}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <span className="mb-2 block text-sm font-medium">
                                    Read status
                                </span>
                                <label className="flex h-10 items-center gap-3 rounded-lg border border-border px-3 text-sm">
                                    <input
                                        type="checkbox"
                                        checked={unreadOnly}
                                        onChange={(event) => {
                                            setUnreadOnly(event.target.checked);
                                            setVisibleCount(6);
                                        }}
                                        className="size-4 accent-primary"
                                    />
                                    Show unread notifications only
                                </label>
                            </div>

                            <div className="sm:col-span-2">
                                <button
                                    type="button"
                                    onClick={resetFilters}
                                    className="text-sm font-semibold text-primary hover:underline"
                                >
                                    Reset all filters
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Category chips */}
                    <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                        {categories.map((item) => (
                            <button
                                type="button"
                                key={item}
                                onClick={() => {
                                    setCategory(item);
                                    setVisibleCount(6);
                                }}
                                className={`shrink-0 rounded-full border px-3 py-2 text-xs font-semibold transition ${category === item
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : "border-border bg-background text-muted-foreground hover:bg-muted"
                                    }`}
                            >
                                {item === "All" ? "All notifications" : item}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Notification list */}
                <section className="min-w-0">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h2 className="text-lg font-semibold">
                                Recent activity
                            </h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                {filteredNotifications.length} notification
                                {filteredNotifications.length === 1 ? "" : "s"} found
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={clearReadNotifications}
                            disabled={readCount === 0}
                            className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <Trash2 size={15} />
                            Clear read
                        </button>
                    </div>

                    {visibleNotifications.length > 0 ? (
                        <div className="space-y-3">
                            {visibleNotifications.map((item) => {
                                const config = categoryConfig[item.category];
                                const CategoryIcon = config.icon;

                                return (
                                    <article
                                        key={item.id}
                                        className={`min-w-0 rounded-xl border bg-card p-4 transition hover:shadow-sm sm:p-5 ${item.read
                                            ? "border-border"
                                            : "border-primary/30 bg-primary/[0.025]"
                                            }`}
                                    >
                                        <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                                            <div
                                                className={`flex size-10 shrink-0 items-center justify-center rounded-xl sm:size-12 ${config.className}`}
                                            >
                                                <CategoryIcon size={21} />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <h3 className="break-words text-sm font-semibold sm:text-base">
                                                        {item.title}
                                                    </h3>

                                                    {!item.read && (
                                                        <span
                                                            className="size-2 shrink-0 rounded-full bg-primary"
                                                            title="Unread"
                                                        />
                                                    )}

                                                    {item.priority === "high" && (
                                                        <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-red-700 dark:bg-red-950/50 dark:text-red-400">
                                                            High priority
                                                        </span>
                                                    )}
                                                </div>

                                                <p className="mt-2 break-words text-sm leading-6 text-muted-foreground">
                                                    {item.description}
                                                </p>

                                                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted-foreground">
                                                    <span className="inline-flex items-center gap-1.5">
                                                        <Clock3 size={13} />
                                                        {item.date}
                                                    </span>
                                                    <span className="rounded-md border border-border px-2 py-1">
                                                        {item.category}
                                                    </span>
                                                    <span>{item.id}</span>
                                                </div>

                                                {item.actionLabel && item.actionUrl && (
                                                    <div className="mt-4">
                                                        <Link
                                                            href={item.actionUrl}
                                                            onClick={() => markAsRead(item.id)}
                                                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                                                        >
                                                            {item.actionLabel}
                                                            <ArrowRight size={15} />
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex shrink-0 items-center gap-1">
                                                {!item.read && (
                                                    <button
                                                        type="button"
                                                        onClick={() => markAsRead(item.id)}
                                                        title="Mark as read"
                                                        aria-label={`Mark ${item.title} as read`}
                                                        className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-950/50 dark:hover:text-emerald-400"
                                                    >
                                                        <Check size={17} />
                                                    </button>
                                                )}

                                                <button
                                                    type="button"
                                                    onClick={() => deleteNotification(item.id)}
                                                    title="Delete notification"
                                                    aria-label={`Delete ${item.title}`}
                                                    className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/50 dark:hover:text-red-400"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}

                            {visibleCount < filteredNotifications.length && (
                                <div className="flex justify-center pt-3">
                                    <button
                                        type="button"
                                        onClick={() => setVisibleCount((count) => count + 6)}
                                        className="inline-flex h-11 items-center gap-2 rounded-lg border border-border px-5 text-sm font-semibold transition hover:bg-muted"
                                    >
                                        Load more notifications
                                        <ChevronDown size={16} />
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card px-5 py-16 text-center">
                            <div className="flex size-14 items-center justify-center rounded-full bg-muted">
                                <Bell size={25} className="text-muted-foreground" />
                            </div>
                            <h3 className="mt-4 text-base font-semibold">
                                No notifications found
                            </h3>
                            <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                                Try changing the search or filters, or check back later for
                                new finance updates.
                            </p>
                            <button
                                type="button"
                                onClick={resetFilters}
                                className="mt-4 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
                            >
                                Reset filters
                            </button>
                        </div>
                    )}
                </section>

                {/* Footer */}
                <footer className="flex flex-col gap-2 border-t border-border pt-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                    <p>CampusFlow · Accountant Notifications</p>
                    <p>
                        Showing {visibleNotifications.length} of{" "}
                        {filteredNotifications.length} notifications
                    </p>
                </footer>
            </div>
        </main>
    );
}
