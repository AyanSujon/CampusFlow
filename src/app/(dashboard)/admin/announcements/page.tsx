// import React from 'react'

// export default function announcements() {
//     return (
//         <div>announcements</div>
//     )
// }




















"use client";

import { useMemo, useState } from "react";
import {
    Archive,
    Bell,
    CalendarDays,
    CheckCircle2,
    Clock,
    Eye,
    FileText,
    Megaphone,
    MoreHorizontal,
    Pencil,
    Pin,
    Plus,
    Search,
    Send,
    Trash2,
    Users,
    X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type AnnouncementStatus = "PUBLISHED" | "DRAFT" | "SCHEDULED" | "ARCHIVED";
type AnnouncementCategory =
    | "ACADEMIC"
    | "EVENT"
    | "EXAMINATION"
    | "GENERAL"
    | "URGENT";

type Audience = "ALL" | "STUDENTS" | "INSTRUCTORS" | "STAFF";

type Announcement = {
    id: string;
    title: string;
    content: string;
    category: AnnouncementCategory;
    status: AnnouncementStatus;
    audience: Audience;
    author: string;
    createdAt: string;
    publishAt?: string;
    pinned: boolean;
};

const initialAnnouncements: Announcement[] = [
    {
        id: "1",
        title: "Fall 2026 Semester Registration",
        content:
            "Students are requested to complete their course registration for the Fall 2026 semester before the registration deadline. Please review your academic requirements and contact your department if you need assistance.",
        category: "ACADEMIC",
        status: "PUBLISHED",
        audience: "STUDENTS",
        author: "Admin",
        createdAt: "2026-10-28T09:00:00",
        pinned: true,
    },
    {
        id: "2",
        title: "Midterm Examination Schedule",
        content:
            "The midterm examination schedule will be shared through the academic portal. Students should check their course schedules and follow the examination instructions provided by their departments.",
        category: "EXAMINATION",
        status: "PUBLISHED",
        audience: "ALL",
        author: "Academic Office",
        createdAt: "2026-10-27T11:30:00",
        pinned: true,
    },
    {
        id: "3",
        title: "University Cultural Festival",
        content:
            "Students and instructors are invited to participate in the upcoming university cultural festival. More information about activities and registration will be announced by the organizing committee.",
        category: "EVENT",
        status: "SCHEDULED",
        audience: "ALL",
        author: "Event Committee",
        createdAt: "2026-10-26T14:00:00",
        publishAt: "2026-11-02T09:00:00",
        pinned: false,
    },
    {
        id: "4",
        title: "Instructor Meeting Reminder",
        content:
            "All instructors are requested to review their course information and academic records before the upcoming departmental meeting.",
        category: "GENERAL",
        status: "PUBLISHED",
        audience: "INSTRUCTORS",
        author: "Admin",
        createdAt: "2026-10-25T10:15:00",
        pinned: false,
    },
    {
        id: "5",
        title: "Important Fee Payment Notice",
        content:
            "Students should review their outstanding tuition and fee records through the university portal. Contact the finance office if you notice any discrepancies in your payment information.",
        category: "URGENT",
        status: "DRAFT",
        audience: "STUDENTS",
        author: "Finance Office",
        createdAt: "2026-10-24T12:00:00",
        pinned: false,
    },
    {
        id: "6",
        title: "Library Service Update",
        content:
            "Please check the university library notice board for updates to library services, borrowing procedures, and available academic resources.",
        category: "GENERAL",
        status: "ARCHIVED",
        audience: "ALL",
        author: "Library Office",
        createdAt: "2026-10-20T08:30:00",
        pinned: false,
    },
];

const statusStyles: Record<AnnouncementStatus, string> = {
    PUBLISHED:
        "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300",
    DRAFT:
        "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300",
    SCHEDULED:
        "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300",
    ARCHIVED:
        "border-gray-200 bg-gray-100 text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300",
};

const categoryStyles: Record<AnnouncementCategory, string> = {
    ACADEMIC:
        "bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
    EVENT: "bg-pink-50 text-pink-700 dark:bg-pink-950 dark:text-pink-300",
    EXAMINATION:
        "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
    GENERAL: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    URGENT: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
};

const emptyForm = {
    title: "",
    content: "",
    category: "GENERAL" as AnnouncementCategory,
    audience: "ALL" as Audience,
    publishAt: "",
    pinned: false,
};

type AnnouncementForm = typeof emptyForm;

function StatusBadge({ status }: { status: AnnouncementStatus }) {
    return (
        <Badge variant="outline" className={statusStyles[status]}>
            {status.charAt(0) + status.slice(1).toLowerCase()}
        </Badge>
    );
}

function CategoryBadge({ category }: { category: AnnouncementCategory }) {
    return (
        <Badge variant="secondary" className={categoryStyles[category]}>
            {category.charAt(0) + category.slice(1).toLowerCase()}
        </Badge>
    );
}

function formatDate(dateString?: string) {
    if (!dateString) return "Not scheduled";

    const date = new Date(dateString);

    return date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

function formatDateTime(dateString?: string) {
    if (!dateString) return "Not scheduled";

    const date = new Date(dateString);

    return `${date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
    })} · ${date.toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "2-digit",
    })}`;
}

function getAudienceLabel(audience: Audience) {
    const labels: Record<Audience, string> = {
        ALL: "Everyone",
        STUDENTS: "Students",
        INSTRUCTORS: "Instructors",
        STAFF: "Staff",
    };

    return labels[audience];
}

function AnnouncementActions({
    announcement,
    onView,
    onEdit,
    onPublish,
    onArchive,
    onDelete,
}: {
    announcement: Announcement;
    onView: (item: Announcement) => void;
    onEdit: (item: Announcement) => void;
    onPublish: (id: string) => void;
    onArchive: (id: string) => void;
    onDelete: (id: string) => void;
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="size-8 shrink-0"
                        aria-label={`Actions for ${announcement.title}`}
                    >
                        <MoreHorizontal className="size-4" />
                    </Button>
                }
            />
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => onView(announcement)}>
                    <Eye className="mr-2 size-4" />
                    View announcement
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => onEdit(announcement)}>
                    <Pencil className="mr-2 size-4" />
                    Edit announcement
                </DropdownMenuItem>

                {announcement.status !== "PUBLISHED" && (
                    <DropdownMenuItem onClick={() => onPublish(announcement.id)}>
                        <Send className="mr-2 size-4" />
                        Publish now
                    </DropdownMenuItem>
                )}

                {announcement.status !== "ARCHIVED" && (
                    <DropdownMenuItem onClick={() => onArchive(announcement.id)}>
                        <Archive className="mr-2 size-4" />
                        Archive
                    </DropdownMenuItem>
                )}

                <DropdownMenuItem
                    onClick={() => onDelete(announcement.id)}
                    className="text-destructive focus:text-destructive"
                >
                    <Trash2 className="mr-2 size-4" />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default function AnnouncementsPage() {
    const [announcements, setAnnouncements] = useState<Announcement[]>(
        initialAnnouncements,
    );
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [categoryFilter, setCategoryFilter] = useState("ALL");
    const [dialogMode, setDialogMode] = useState<
        "create" | "edit" | "view" | null
    >(null);
    const [selectedAnnouncement, setSelectedAnnouncement] =
        useState<Announcement | null>(null);
    const [form, setForm] = useState<AnnouncementForm>(emptyForm);
    const [formError, setFormError] = useState("");

    const stats = useMemo(
        () => ({
            total: announcements.length,
            published: announcements.filter((item) => item.status === "PUBLISHED")
                .length,
            drafts: announcements.filter((item) => item.status === "DRAFT").length,
            scheduled: announcements.filter((item) => item.status === "SCHEDULED")
                .length,
        }),
        [announcements],
    );

    const filteredAnnouncements = useMemo(() => {
        const query = search.trim().toLowerCase();

        return announcements.filter((announcement) => {
            const matchesSearch =
                !query ||
                announcement.title.toLowerCase().includes(query) ||
                announcement.content.toLowerCase().includes(query) ||
                announcement.author.toLowerCase().includes(query);

            const matchesStatus =
                statusFilter === "ALL" || announcement.status === statusFilter;

            const matchesCategory =
                categoryFilter === "ALL" ||
                announcement.category === categoryFilter;

            return matchesSearch && matchesStatus && matchesCategory;
        });
    }, [announcements, search, statusFilter, categoryFilter]);

    function openCreateDialog() {
        setSelectedAnnouncement(null);
        setForm(emptyForm);
        setFormError("");
        setDialogMode("create");
    }

    function openEditDialog(announcement: Announcement) {
        setSelectedAnnouncement(announcement);
        setForm({
            title: announcement.title,
            content: announcement.content,
            category: announcement.category,
            audience: announcement.audience,
            publishAt: announcement.publishAt
                ? new Date(announcement.publishAt).toISOString().slice(0, 16)
                : "",
            pinned: announcement.pinned,
        });
        setFormError("");
        setDialogMode("edit");
    }

    function openViewDialog(announcement: Announcement) {
        setSelectedAnnouncement(announcement);
        setDialogMode("view");
    }

    function closeDialog() {
        setDialogMode(null);
        setSelectedAnnouncement(null);
        setFormError("");
    }

    function saveAnnouncement() {
        const title = form.title.trim();
        const content = form.content.trim();

        if (!title || !content) {
            setFormError("Please enter both a title and announcement content.");
            return;
        }

        if (
            form.publishAt &&
            Number.isNaN(new Date(form.publishAt).getTime())
        ) {
            setFormError("Please provide a valid publication date and time.");
            return;
        }

        const now = new Date().toISOString();
        const publishAt = form.publishAt
            ? new Date(form.publishAt).toISOString()
            : undefined;

        const status: AnnouncementStatus =
            publishAt && new Date(publishAt).getTime() > Date.now()
                ? "SCHEDULED"
                : "DRAFT";

        if (dialogMode === "edit" && selectedAnnouncement) {
            setAnnouncements((current) =>
                current.map((item) =>
                    item.id === selectedAnnouncement.id
                        ? {
                            ...item,
                            title,
                            content,
                            category: form.category,
                            audience: form.audience,
                            publishAt,
                            pinned: form.pinned,
                            status:
                                item.status === "ARCHIVED"
                                    ? "ARCHIVED"
                                    : status,
                        }
                        : item,
                ),
            );
        } else {
            const newAnnouncement: Announcement = {
                id: crypto.randomUUID(),
                title,
                content,
                category: form.category,
                audience: form.audience,
                author: "Admin",
                createdAt: now,
                publishAt,
                pinned: form.pinned,
                status,
            };

            setAnnouncements((current) => [newAnnouncement, ...current]);
        }

        closeDialog();
    }

    function publishAnnouncement(id: string) {
        setAnnouncements((current) =>
            current.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        status: "PUBLISHED",
                        publishAt: undefined,
                    }
                    : item,
            ),
        );
    }

    function archiveAnnouncement(id: string) {
        setAnnouncements((current) =>
            current.map((item) =>
                item.id === id ? { ...item, status: "ARCHIVED" } : item,
            ),
        );
    }

    function deleteAnnouncement(id: string) {
        setAnnouncements((current) => current.filter((item) => item.id !== id));
        if (selectedAnnouncement?.id === id) closeDialog();
    }

    return (
        <div className="w-full min-w-0 space-y-6 overflow-x-clip pb-8 p-4">
            {/* Page heading */}
            <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            Announcements
                        </h1>
                        <Badge variant="secondary">
                            {stats.total} total
                        </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground sm:text-base">
                        Create and manage university announcements for students,
                        instructors, and staff.
                    </p>
                </div>

                <Button type="button" className="w-full shrink-0 sm:w-auto" onClick={openCreateDialog}>
                    <Plus className="mr-2 size-4" />
                    Create Announcement
                </Button>
            </div>

            {/* Statistics */}
            <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <Card className="min-w-0">
                    <CardContent className="flex items-center justify-between gap-3 p-5">
                        <div className="min-w-0 space-y-1">
                            <p className="text-sm text-muted-foreground">Total</p>
                            <p className="text-2xl font-bold tabular-nums">{stats.total}</p>
                            <p className="text-xs text-muted-foreground">
                                All announcements
                            </p>
                        </div>
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <Megaphone className="size-5" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="min-w-0">
                    <CardContent className="flex items-center justify-between gap-3 p-5">
                        <div className="min-w-0 space-y-1">
                            <p className="text-sm text-muted-foreground">Published</p>
                            <p className="text-2xl font-bold tabular-nums">
                                {stats.published}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Currently published
                            </p>
                        </div>
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                            <CheckCircle2 className="size-5" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="min-w-0">
                    <CardContent className="flex items-center justify-between gap-3 p-5">
                        <div className="min-w-0 space-y-1">
                            <p className="text-sm text-muted-foreground">Drafts</p>
                            <p className="text-2xl font-bold tabular-nums">{stats.drafts}</p>
                            <p className="text-xs text-muted-foreground">
                                Not yet published
                            </p>
                        </div>
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                            <FileText className="size-5" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="min-w-0">
                    <CardContent className="flex items-center justify-between gap-3 p-5">
                        <div className="min-w-0 space-y-1">
                            <p className="text-sm text-muted-foreground">Scheduled</p>
                            <p className="text-2xl font-bold tabular-nums">
                                {stats.scheduled}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Awaiting publication
                            </p>
                        </div>
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                            <CalendarDays className="size-5" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search and filters */}
            <Card className="min-w-0">
                <CardHeader className="pb-3">
                    <CardTitle className="text-base">All Announcements</CardTitle>
                </CardHeader>
                <CardContent className="min-w-0 space-y-4">
                    <div className="grid min-w-0 grid-cols-1 gap-3 md:grid-cols-3">
                        <div className="relative min-w-0 md:col-span-1">
                            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Search announcements..."
                                aria-label="Search announcements"
                                className="w-full min-w-0 pl-9"
                            />
                        </div>

                        <Select
                            value={statusFilter}
                            onValueChange={(value) => setStatusFilter(value ?? "ALL")}
                        >
                            <SelectTrigger className="w-full min-w-0">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All statuses</SelectItem>
                                <SelectItem value="PUBLISHED">Published</SelectItem>
                                <SelectItem value="DRAFT">Draft</SelectItem>
                                <SelectItem value="SCHEDULED">Scheduled</SelectItem>
                                <SelectItem value="ARCHIVED">Archived</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select
                            value={categoryFilter}
                            onValueChange={(value) => setCategoryFilter(value ?? "ALL")}
                        >
                            <SelectTrigger className="w-full min-w-0">
                                <SelectValue placeholder="Filter by category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All categories</SelectItem>
                                <SelectItem value="ACADEMIC">Academic</SelectItem>
                                <SelectItem value="EVENT">Event</SelectItem>
                                <SelectItem value="EXAMINATION">Examination</SelectItem>
                                <SelectItem value="GENERAL">General</SelectItem>
                                <SelectItem value="URGENT">Urgent</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
                        <span>
                            Showing{" "}
                            <span className="font-medium text-foreground">
                                {filteredAnnouncements.length}
                            </span>{" "}
                            of {announcements.length} announcements
                        </span>

                        {(search ||
                            statusFilter !== "ALL" ||
                            categoryFilter !== "ALL") && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        setSearch("");
                                        setStatusFilter("ALL");
                                        setCategoryFilter("ALL");
                                    }}
                                >
                                    <X className="mr-1.5 size-4" />
                                    Clear filters
                                </Button>
                            )}
                    </div>
                </CardContent>
            </Card>

            {/* Announcement cards */}
            <div className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-2">
                {filteredAnnouncements.map((announcement) => (
                    <Card
                        key={announcement.id}
                        className="min-w-0 overflow-hidden transition-shadow hover:shadow-md"
                    >
                        <CardContent className="min-w-0 space-y-4 p-4 sm:p-5">
                            <div className="flex min-w-0 items-start gap-3">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <Megaphone className="size-5" />
                                </div>

                                <div className="min-w-0 flex-1 space-y-2">
                                    <div className="flex min-w-0 flex-wrap items-center gap-2">
                                        <CategoryBadge category={announcement.category} />
                                        <StatusBadge status={announcement.status} />
                                        {announcement.pinned && (
                                            <Badge variant="outline" className="gap-1">
                                                <Pin className="size-3" />
                                                Pinned
                                            </Badge>
                                        )}
                                    </div>

                                    <h3 className="break-words text-base font-semibold leading-snug">
                                        {announcement.title}
                                    </h3>
                                </div>

                                <AnnouncementActions
                                    announcement={announcement}
                                    onView={openViewDialog}
                                    onEdit={openEditDialog}
                                    onPublish={publishAnnouncement}
                                    onArchive={archiveAnnouncement}
                                    onDelete={deleteAnnouncement}
                                />
                            </div>

                            <p className="break-words text-sm leading-relaxed text-muted-foreground">
                                {announcement.content}
                            </p>

                            <div className="grid min-w-0 grid-cols-1 gap-3 rounded-lg bg-muted/40 p-3 sm:grid-cols-2">
                                <div className="flex min-w-0 items-start gap-2">
                                    <Users className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                                    <div className="min-w-0">
                                        <p className="text-xs text-muted-foreground">Audience</p>
                                        <p className="break-words text-sm font-medium">
                                            {getAudienceLabel(announcement.audience)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex min-w-0 items-start gap-2">
                                    <CalendarDays className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                                    <div className="min-w-0">
                                        <p className="text-xs text-muted-foreground">
                                            {announcement.status === "SCHEDULED"
                                                ? "Publish date"
                                                : "Created on"}
                                        </p>
                                        <p className="break-words text-sm font-medium">
                                            {announcement.status === "SCHEDULED"
                                                ? formatDateTime(announcement.publishAt)
                                                : formatDate(announcement.createdAt)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex min-w-0 flex-col gap-3 border-t pt-3 sm:flex-row sm:items-center sm:justify-between">
                                <p className="break-words text-xs text-muted-foreground">
                                    Created by{" "}
                                    <span className="font-medium text-foreground">
                                        {announcement.author}
                                    </span>
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className="flex-1 sm:flex-none"
                                        onClick={() => openViewDialog(announcement)}
                                    >
                                        <Eye className="mr-1.5 size-4" />
                                        View
                                    </Button>

                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className="flex-1 sm:flex-none"
                                        onClick={() => openEditDialog(announcement)}
                                    >
                                        <Pencil className="mr-1.5 size-4" />
                                        Edit
                                    </Button>

                                    {announcement.status !== "PUBLISHED" &&
                                        announcement.status !== "ARCHIVED" && (
                                            <Button
                                                type="button"
                                                size="sm"
                                                className="flex-1 sm:flex-none"
                                                onClick={() => publishAnnouncement(announcement.id)}
                                            >
                                                <Send className="mr-1.5 size-4" />
                                                Publish
                                            </Button>
                                        )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Empty state */}
            {filteredAnnouncements.length === 0 && (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center px-4 py-14 text-center">
                        <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-muted">
                            <Megaphone className="size-6 text-muted-foreground" />
                        </div>
                        <h3 className="font-semibold">No announcements found</h3>
                        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                            Try changing your search or filters, or create a new announcement.
                        </p>
                        <Button
                            type="button"
                            variant="outline"
                            className="mt-4"
                            onClick={() => {
                                setSearch("");
                                setStatusFilter("ALL");
                                setCategoryFilter("ALL");
                            }}
                        >
                            Clear filters
                        </Button>
                    </CardContent>
                </Card>
            )}

            {/* Create, edit, and view dialog */}
            {dialogMode && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) closeDialog();
                    }}
                    onKeyDown={(event) => {
                        if (event.key === "Escape") closeDialog();
                    }}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="announcement-dialog-title"
                        className="my-auto max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border bg-background p-5 shadow-xl sm:p-6"
                    >
                        <div className="mb-5 flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <h2
                                    id="announcement-dialog-title"
                                    className="text-lg font-semibold"
                                >
                                    {dialogMode === "create"
                                        ? "Create announcement"
                                        : dialogMode === "edit"
                                            ? "Edit announcement"
                                            : "Announcement details"}
                                </h2>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {dialogMode === "view"
                                        ? "Review the announcement information."
                                        : "Enter the information for this announcement."}
                                </p>
                            </div>

                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="shrink-0"
                                onClick={closeDialog}
                                aria-label="Close dialog"
                            >
                                <X className="size-4" />
                            </Button>
                        </div>

                        {dialogMode === "view" && selectedAnnouncement ? (
                            <div className="min-w-0 space-y-5">
                                <div className="flex flex-wrap gap-2">
                                    <CategoryBadge category={selectedAnnouncement.category} />
                                    <StatusBadge status={selectedAnnouncement.status} />
                                    {selectedAnnouncement.pinned && (
                                        <Badge variant="outline" className="gap-1">
                                            <Pin className="size-3" />
                                            Pinned
                                        </Badge>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <h3 className="break-words text-xl font-semibold">
                                        {selectedAnnouncement.title}
                                    </h3>
                                    <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-muted-foreground">
                                        {selectedAnnouncement.content}
                                    </p>
                                </div>

                                <div className="grid min-w-0 grid-cols-1 gap-4 rounded-lg bg-muted/40 p-4 sm:grid-cols-2">
                                    <div>
                                        <p className="text-xs text-muted-foreground">Audience</p>
                                        <p className="mt-1 text-sm font-medium">
                                            {getAudienceLabel(selectedAnnouncement.audience)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Author</p>
                                        <p className="mt-1 break-words text-sm font-medium">
                                            {selectedAnnouncement.author}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Created</p>
                                        <p className="mt-1 text-sm font-medium">
                                            {formatDateTime(selectedAnnouncement.createdAt)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">
                                            Scheduled publication
                                        </p>
                                        <p className="mt-1 text-sm font-medium">
                                            {formatDateTime(selectedAnnouncement.publishAt)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap justify-end gap-2 border-t pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => openEditDialog(selectedAnnouncement)}
                                    >
                                        <Pencil className="mr-2 size-4" />
                                        Edit
                                    </Button>
                                    <Button type="button" onClick={closeDialog}>
                                        Done
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <label htmlFor="announcement-title" className="text-sm font-medium">
                                        Announcement title <span className="text-destructive">*</span>
                                    </label>
                                    <Input
                                        id="announcement-title"
                                        value={form.title}
                                        onChange={(event) =>
                                            setForm((current) => ({
                                                ...current,
                                                title: event.target.value,
                                            }))
                                        }
                                        placeholder="Enter announcement title"
                                        maxLength={180}
                                        autoFocus
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="announcement-content" className="text-sm font-medium">
                                        Announcement content{" "}
                                        <span className="text-destructive">*</span>
                                    </label>
                                    <Textarea
                                        id="announcement-content"
                                        value={form.content}
                                        onChange={(event) =>
                                            setForm((current) => ({
                                                ...current,
                                                content: event.target.value,
                                            }))
                                        }
                                        placeholder="Write your announcement..."
                                        rows={6}
                                        className="min-h-32 resize-y"
                                        maxLength={10000}
                                    />
                                    <p className="text-right text-xs text-muted-foreground">
                                        {form.content.length}/10000
                                    </p>
                                </div>

                                <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div className="min-w-0 space-y-2">
                                        <label className="text-sm font-medium">Category</label>
                                        <Select
                                            value={form.category}
                                            onValueChange={(value) => {
                                                if (!value) return;
                                                setForm((current) => ({
                                                    ...current,
                                                    category: value as AnnouncementCategory,
                                                }));
                                            }}
                                        >
                                            <SelectTrigger className="w-full min-w-0">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="ACADEMIC">Academic</SelectItem>
                                                <SelectItem value="EVENT">Event</SelectItem>
                                                <SelectItem value="EXAMINATION">Examination</SelectItem>
                                                <SelectItem value="GENERAL">General</SelectItem>
                                                <SelectItem value="URGENT">Urgent</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="min-w-0 space-y-2">
                                        <label className="text-sm font-medium">Audience</label>
                                        <Select
                                            value={form.audience}
                                            onValueChange={(value) => {
                                                if (!value) return;
                                                setForm((current) => ({
                                                    ...current,
                                                    audience: value as Audience,
                                                }));
                                            }}
                                        >
                                            <SelectTrigger className="w-full min-w-0">
                                                <SelectValue placeholder="Select audience" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="ALL">Everyone</SelectItem>
                                                <SelectItem value="STUDENTS">Students</SelectItem>
                                                <SelectItem value="INSTRUCTORS">Instructors</SelectItem>
                                                <SelectItem value="STAFF">Staff</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="announcement-publish-at" className="text-sm font-medium">
                                        Schedule publication (optional)
                                    </label>
                                    <Input
                                        id="announcement-publish-at"
                                        type="datetime-local"
                                        value={form.publishAt}
                                        onChange={(event) =>
                                            setForm((current) => ({
                                                ...current,
                                                publishAt: event.target.value,
                                            }))
                                        }
                                        className="w-full min-w-0"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        A future date creates a scheduled announcement. Without a
                                        future date, the announcement is saved as a draft.
                                    </p>
                                </div>

                                <label className="flex cursor-pointer items-start gap-3 rounded-lg border p-3">
                                    <input
                                        type="checkbox"
                                        checked={form.pinned}
                                        onChange={(event) =>
                                            setForm((current) => ({
                                                ...current,
                                                pinned: event.target.checked,
                                            }))
                                        }
                                        className="mt-0.5 size-4 accent-primary"
                                    />
                                    <span className="min-w-0">
                                        <span className="flex items-center gap-2 text-sm font-medium">
                                            <Pin className="size-4" />
                                            Pin announcement
                                        </span>
                                        <span className="mt-1 block text-xs text-muted-foreground">
                                            Mark this announcement as important in the admin list.
                                        </span>
                                    </span>
                                </label>

                                {formError && (
                                    <p role="alert" className="text-sm text-destructive">
                                        {formError}
                                    </p>
                                )}

                                <div className="flex flex-col-reverse gap-2 border-t pt-4 sm:flex-row sm:justify-end">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={closeDialog}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="button" onClick={saveAnnouncement}>
                                        <FileText className="mr-2 size-4" />
                                        {dialogMode === "edit"
                                            ? "Save Changes"
                                            : "Save Announcement"}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
