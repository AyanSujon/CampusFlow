// import React from 'react'

// export default function schedulesChangesapprovals() {
//     return (
//         <div>schedulesChangesapprovals</div>
//     )
// }


















"use client";

import { useMemo, useState } from "react";
import {
    CalendarClock,
    CalendarDays,
    Clock,
    Search,
    Download,
    Filter,
    Check,
    X,
    Eye,
    MapPin,
    User,
    BookOpen,
    AlertTriangle,
    CheckCircle2,
    XCircle,
    ArrowRight,
    GraduationCap,
    Building2,
    RefreshCw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

type RequestStatus = "PENDING" | "APPROVED" | "REJECTED";
type Priority = "HIGH" | "MEDIUM" | "LOW";
type ChangeType =
    | "CLASS_RESCHEDULE"
    | "ROOM_CHANGE"
    | "INSTRUCTOR_CHANGE"
    | "TIME_CHANGE"
    | "CANCELLATION";

type ScheduleChangeRequest = {
    id: string;
    courseCode: string;
    courseName: string;
    section: string;
    instructor: string;
    requestedBy: string;
    requestedByRole: string;
    changeType: ChangeType;
    reason: string;
    priority: Priority;
    status: RequestStatus;
    submittedAt: string;
    effectiveDate: string;
    currentSchedule: {
        day: string;
        time: string;
        room: string;
        instructor: string;
    };
    proposedSchedule: {
        day: string;
        time: string;
        room: string;
        instructor: string;
    };
    reviewNote?: string;
};

const initialRequests: ScheduleChangeRequest[] = [
    {
        id: "SCH-2026-001",
        courseCode: "CSE-301",
        courseName: "Database Management Systems",
        section: "A",
        instructor: "Dr. Rahman",
        requestedBy: "Dr. Rahman",
        requestedByRole: "Instructor",
        changeType: "TIME_CHANGE",
        reason:
            "I have been assigned to an academic committee meeting during the existing class time. Requesting a time adjustment to avoid the conflict.",
        priority: "HIGH",
        status: "PENDING",
        submittedAt: "2026-11-06",
        effectiveDate: "2026-11-12",
        currentSchedule: {
            day: "Sunday",
            time: "09:00 AM - 10:30 AM",
            room: "Room 301",
            instructor: "Dr. Rahman",
        },
        proposedSchedule: {
            day: "Sunday",
            time: "11:00 AM - 12:30 PM",
            room: "Room 301",
            instructor: "Dr. Rahman",
        },
    },
    {
        id: "SCH-2026-002",
        courseCode: "CSE-201",
        courseName: "Data Structures",
        section: "B",
        instructor: "Mr. Hasan",
        requestedBy: "Mr. Hasan",
        requestedByRole: "Instructor",
        changeType: "ROOM_CHANGE",
        reason:
            "The current classroom does not have enough seating capacity for the enrolled students.",
        priority: "HIGH",
        status: "PENDING",
        submittedAt: "2026-11-05",
        effectiveDate: "2026-11-10",
        currentSchedule: {
            day: "Monday",
            time: "10:00 AM - 11:30 AM",
            room: "Room 205",
            instructor: "Mr. Hasan",
        },
        proposedSchedule: {
            day: "Monday",
            time: "10:00 AM - 11:30 AM",
            room: "Room 402",
            instructor: "Mr. Hasan",
        },
    },
    {
        id: "SCH-2026-003",
        courseCode: "CSE-401",
        courseName: "Software Engineering",
        section: "A",
        instructor: "Ms. Nusrat",
        requestedBy: "Ms. Nusrat",
        requestedByRole: "Instructor",
        changeType: "INSTRUCTOR_CHANGE",
        reason:
            "Requesting a temporary instructor replacement due to an unavoidable personal commitment.",
        priority: "MEDIUM",
        status: "PENDING",
        submittedAt: "2026-11-04",
        effectiveDate: "2026-11-15",
        currentSchedule: {
            day: "Tuesday",
            time: "02:00 PM - 03:30 PM",
            room: "Lab 02",
            instructor: "Ms. Nusrat",
        },
        proposedSchedule: {
            day: "Tuesday",
            time: "02:00 PM - 03:30 PM",
            room: "Lab 02",
            instructor: "Mr. Imran",
        },
    },
    {
        id: "SCH-2026-004",
        courseCode: "CSE-101",
        courseName: "Introduction to Programming",
        section: "C",
        instructor: "Mr. Karim",
        requestedBy: "Mr. Karim",
        requestedByRole: "Instructor",
        changeType: "CLASS_RESCHEDULE",
        reason:
            "The department seminar will take place during the scheduled class. Requesting a replacement class on Thursday.",
        priority: "MEDIUM",
        status: "APPROVED",
        submittedAt: "2026-11-02",
        effectiveDate: "2026-11-13",
        currentSchedule: {
            day: "Wednesday",
            time: "11:00 AM - 12:30 PM",
            room: "Room 102",
            instructor: "Mr. Karim",
        },
        proposedSchedule: {
            day: "Thursday",
            time: "11:00 AM - 12:30 PM",
            room: "Room 102",
            instructor: "Mr. Karim",
        },
        reviewNote: "Approved. Please notify all enrolled students.",
    },
    {
        id: "SCH-2026-005",
        courseCode: "CSE-302",
        courseName: "Operating Systems",
        section: "A",
        instructor: "Dr. Farhan",
        requestedBy: "Dr. Farhan",
        requestedByRole: "Instructor",
        changeType: "CANCELLATION",
        reason:
            "Requesting cancellation of this week's class due to a university-wide event.",
        priority: "LOW",
        status: "REJECTED",
        submittedAt: "2026-11-01",
        effectiveDate: "2026-11-09",
        currentSchedule: {
            day: "Monday",
            time: "01:00 PM - 02:30 PM",
            room: "Room 305",
            instructor: "Dr. Farhan",
        },
        proposedSchedule: {
            day: "Monday",
            time: "01:00 PM - 02:30 PM",
            room: "Room 305",
            instructor: "Dr. Farhan",
        },
        reviewNote: "Please arrange a replacement class instead of cancelling.",
    },
    {
        id: "SCH-2026-006",
        courseCode: "CSE-204",
        courseName: "Object Oriented Programming",
        section: "A",
        instructor: "Mr. Sakib",
        requestedBy: "Mr. Sakib",
        requestedByRole: "Instructor",
        changeType: "TIME_CHANGE",
        reason:
            "Requesting a schedule adjustment to avoid overlapping with another assigned academic activity.",
        priority: "LOW",
        status: "PENDING",
        submittedAt: "2026-10-30",
        effectiveDate: "2026-11-16",
        currentSchedule: {
            day: "Thursday",
            time: "09:00 AM - 10:30 AM",
            room: "Room 204",
            instructor: "Mr. Sakib",
        },
        proposedSchedule: {
            day: "Thursday",
            time: "10:30 AM - 12:00 PM",
            room: "Room 204",
            instructor: "Mr. Sakib",
        },
    },
];

const changeTypeLabels: Record<ChangeType, string> = {
    CLASS_RESCHEDULE: "Class Reschedule",
    ROOM_CHANGE: "Room Change",
    INSTRUCTOR_CHANGE: "Instructor Change",
    TIME_CHANGE: "Time Change",
    CANCELLATION: "Class Cancellation",
};

function formatDate(date: string) {
    return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

function StatusBadge({ status }: { status: RequestStatus }) {
    const styles: Record<RequestStatus, string> = {
        PENDING:
            "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-400",
        APPROVED:
            "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-400",
        REJECTED:
            "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400",
    };

    return (
        <Badge variant="outline" className={styles[status]}>
            {status.charAt(0) + status.slice(1).toLowerCase()}
        </Badge>
    );
}

function PriorityBadge({ priority }: { priority: Priority }) {
    const styles: Record<Priority, string> = {
        HIGH: "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400",
        MEDIUM:
            "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-400",
        LOW: "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300",
    };

    return (
        <Badge variant="outline" className={styles[priority]}>
            {priority.charAt(0) + priority.slice(1).toLowerCase()}
        </Badge>
    );
}

function ScheduleComparison({
    current,
    proposed,
}: {
    current: ScheduleChangeRequest["currentSchedule"];
    proposed: ScheduleChangeRequest["proposedSchedule"];
}) {
    const fields = [
        { label: "Day", current: current.day, proposed: proposed.day },
        { label: "Time", current: current.time, proposed: proposed.time },
        { label: "Room", current: current.room, proposed: proposed.room },
        {
            label: "Instructor",
            current: current.instructor,
            proposed: proposed.instructor,
        },
    ];

    return (
        <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border bg-muted/30 p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Current Schedule
                </p>
                <div className="space-y-3">
                    {fields.map((field) => (
                        <div key={field.label}>
                            <p className="text-xs text-muted-foreground">{field.label}</p>
                            <p className="text-sm font-medium">{field.current}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-primary">
                    Proposed Schedule
                </p>
                <div className="space-y-3">
                    {fields.map((field) => {
                        const changed = field.current !== field.proposed;

                        return (
                            <div key={field.label}>
                                <p className="text-xs text-muted-foreground">{field.label}</p>
                                <p
                                    className={`text-sm font-medium ${changed ? "text-primary" : ""
                                        }`}
                                >
                                    {field.proposed}
                                    {changed && (
                                        <span className="ml-2 text-xs font-normal text-primary">
                                            Changed
                                        </span>
                                    )}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default function ScheduleChangesApprovalsPage() {
    const [requests, setRequests] =
        useState<ScheduleChangeRequest[]>(initialRequests);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [priorityFilter, setPriorityFilter] = useState("ALL");
    const [typeFilter, setTypeFilter] = useState("ALL");

    const [selectedRequest, setSelectedRequest] =
        useState<ScheduleChangeRequest | null>(null);
    const [dialogMode, setDialogMode] = useState<
        "view" | "approve" | "reject" | null
    >(null);
    const [reviewNote, setReviewNote] = useState("");

    const stats = useMemo(
        () => ({
            total: requests.length,
            pending: requests.filter((r) => r.status === "PENDING").length,
            approved: requests.filter((r) => r.status === "APPROVED").length,
            rejected: requests.filter((r) => r.status === "REJECTED").length,
            highPriority: requests.filter(
                (r) => r.status === "PENDING" && r.priority === "HIGH",
            ).length,
        }),
        [requests],
    );

    const filteredRequests = useMemo(() => {
        const query = search.toLowerCase().trim();

        return requests.filter((request) => {
            const matchesSearch =
                !query ||
                request.id.toLowerCase().includes(query) ||
                request.courseCode.toLowerCase().includes(query) ||
                request.courseName.toLowerCase().includes(query) ||
                request.instructor.toLowerCase().includes(query) ||
                request.requestedBy.toLowerCase().includes(query);

            const matchesStatus =
                statusFilter === "ALL" || request.status === statusFilter;

            const matchesPriority =
                priorityFilter === "ALL" || request.priority === priorityFilter;

            const matchesType =
                typeFilter === "ALL" || request.changeType === typeFilter;

            return (
                matchesSearch && matchesStatus && matchesPriority && matchesType
            );
        });
    }, [requests, search, statusFilter, priorityFilter, typeFilter]);

    const openDialog = (
        request: ScheduleChangeRequest,
        mode: "view" | "approve" | "reject",
    ) => {
        setSelectedRequest(request);
        setDialogMode(mode);
        setReviewNote(request.reviewNote ?? "");
    };

    const closeDialog = () => {
        setSelectedRequest(null);
        setDialogMode(null);
        setReviewNote("");
    };

    const handleReview = () => {
        if (!selectedRequest || !dialogMode || dialogMode === "view") return;

        if (dialogMode === "reject" && !reviewNote.trim()) {
            return;
        }

        const newStatus: RequestStatus =
            dialogMode === "approve" ? "APPROVED" : "REJECTED";

        setRequests((current) =>
            current.map((request) =>
                request.id === selectedRequest.id
                    ? {
                        ...request,
                        status: newStatus,
                        reviewNote: reviewNote.trim(),
                    }
                    : request,
            ),
        );

        closeDialog();
    };

    const exportCSV = () => {
        const headers = [
            "Request ID",
            "Course Code",
            "Course Name",
            "Section",
            "Change Type",
            "Requested By",
            "Current Day",
            "Current Time",
            "Current Room",
            "Proposed Day",
            "Proposed Time",
            "Proposed Room",
            "Priority",
            "Status",
            "Submitted At",
            "Effective Date",
            "Reason",
            "Review Note",
        ];

        const rows = filteredRequests.map((request) => [
            request.id,
            request.courseCode,
            request.courseName,
            request.section,
            changeTypeLabels[request.changeType],
            request.requestedBy,
            request.currentSchedule.day,
            request.currentSchedule.time,
            request.currentSchedule.room,
            request.proposedSchedule.day,
            request.proposedSchedule.time,
            request.proposedSchedule.room,
            request.priority,
            request.status,
            request.submittedAt,
            request.effectiveDate,
            request.reason,
            request.reviewNote ?? "",
        ]);

        const escapeCSV = (value: string) =>
            `"${String(value).replace(/"/g, '""')}"`;

        const csv = [headers, ...rows]
            .map((row) => row.map((value) => escapeCSV(String(value))).join(","))
            .join("\n");

        const blob = new Blob(["\uFEFF" + csv], {
            type: "text/csv;charset=utf-8;",
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = "schedule-change-approvals.csv";
        link.click();

        URL.revokeObjectURL(url);
    };

    const clearFilters = () => {
        setSearch("");
        setStatusFilter("ALL");
        setPriorityFilter("ALL");
        setTypeFilter("ALL");
    };

    return (
        <div className="space-y-6 pb-10 p-4">
            {/* Header */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarClock className="h-4 w-4" />
                        <span>Approvals & Requests</span>
                        <span>/</span>
                        <span>Schedule Changes</span>
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Schedule Changes Approvals
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Review and manage class schedule change requests from your
                        department.
                    </p>
                </div>

                <Button
                    variant="outline"
                    onClick={exportCSV}
                    className="w-full sm:w-auto"
                >
                    <Download className="mr-2 h-4 w-4" />
                    Export CSV
                </Button>
            </div>

            {/* Pending Alert */}
            {stats.pending > 0 && (
                <div className="flex flex-col gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/30 sm:flex-row sm:items-center">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-400">
                        <AlertTriangle className="h-5 w-5" />
                    </div>

                    <div className="flex-1">
                        <p className="font-semibold text-amber-900 dark:text-amber-300">
                            {stats.pending} schedule change request
                            {stats.pending !== 1 ? "s" : ""} awaiting review
                        </p>
                        <p className="text-sm text-amber-800 dark:text-amber-400">
                            {stats.highPriority} high-priority request
                            {stats.highPriority !== 1 ? "s" : ""} require attention.
                        </p>
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        className="border-amber-300 bg-transparent text-amber-800 hover:bg-amber-100 dark:border-amber-800 dark:text-amber-300 dark:hover:bg-amber-900/40"
                        onClick={() => {
                            setStatusFilter("PENDING");
                            setPriorityFilter("ALL");
                        }}
                    >
                        Review Pending
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )}

            {/* Statistics */}
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardContent className="flex items-center justify-between p-4 sm:p-5">
                        <div>
                            <p className="text-sm text-muted-foreground">Total Requests</p>
                            <p className="mt-2 text-2xl font-bold">{stats.total}</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                All submissions
                            </p>
                        </div>
                        <div className="rounded-lg bg-primary/10 p-3 text-primary">
                            <CalendarClock className="h-5 w-5" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center justify-between p-4 sm:p-5">
                        <div>
                            <p className="text-sm text-muted-foreground">Pending</p>
                            <p className="mt-2 text-2xl font-bold">{stats.pending}</p>
                            <p className="mt-1 text-xs text-amber-600 dark:text-amber-400">
                                Awaiting review
                            </p>
                        </div>
                        <div className="rounded-lg bg-amber-100 p-3 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
                            <Clock className="h-5 w-5" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center justify-between p-4 sm:p-5">
                        <div>
                            <p className="text-sm text-muted-foreground">Approved</p>
                            <p className="mt-2 text-2xl font-bold">{stats.approved}</p>
                            <p className="mt-1 text-xs text-green-600 dark:text-green-400">
                                Successfully approved
                            </p>
                        </div>
                        <div className="rounded-lg bg-green-100 p-3 text-green-700 dark:bg-green-950/50 dark:text-green-400">
                            <CheckCircle2 className="h-5 w-5" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center justify-between p-4 sm:p-5">
                        <div>
                            <p className="text-sm text-muted-foreground">Rejected</p>
                            <p className="mt-2 text-2xl font-bold">{stats.rejected}</p>
                            <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                                Declined requests
                            </p>
                        </div>
                        <div className="rounded-lg bg-red-100 p-3 text-red-700 dark:bg-red-950/50 dark:text-red-400">
                            <XCircle className="h-5 w-5" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Request Type Summary */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-base">Request Overview</CardTitle>
                    <CardDescription>
                        Schedule change requests grouped by category.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="grid gap-3 grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
                        {(
                            Object.entries(changeTypeLabels) as [ChangeType, string][]
                        ).map(([type, label]) => {
                            const count = requests.filter(
                                (request) => request.changeType === type,
                            ).length;

                            return (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() =>
                                        setTypeFilter(typeFilter === type ? "ALL" : type)
                                    }
                                    className={`rounded-lg border p-3 text-left transition-colors hover:bg-muted/50 ${typeFilter === type
                                        ? "border-primary bg-primary/5"
                                        : "border-border"
                                        }`}
                                >
                                    <p className="text-2xl font-bold">{count}</p>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {label}
                                    </p>
                                </button>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* Filters */}
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <CardTitle className="text-base">Schedule Change Requests</CardTitle>
                            <CardDescription>
                                Search, filter, and review submitted requests.
                            </CardDescription>
                        </div>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearFilters}
                            className="w-fit"
                        >
                            <RefreshCw className="mr-2 h-3.5 w-3.5" />
                            Reset Filters
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="relative sm:col-span-2 lg:col-span-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search requests..."
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                className="pl-9"
                            />
                        </div>

                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <select
                                value={statusFilter}
                                onChange={(event) => setStatusFilter(event.target.value)}
                                className="h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                            >
                                <option value="ALL">All Statuses</option>
                                <option value="PENDING">Pending</option>
                                <option value="APPROVED">Approved</option>
                                <option value="REJECTED">Rejected</option>
                            </select>
                        </div>

                        <select
                            value={priorityFilter}
                            onChange={(event) => setPriorityFilter(event.target.value)}
                            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                        >
                            <option value="ALL">All Priorities</option>
                            <option value="HIGH">High Priority</option>
                            <option value="MEDIUM">Medium Priority</option>
                            <option value="LOW">Low Priority</option>
                        </select>

                        <select
                            value={typeFilter}
                            onChange={(event) => setTypeFilter(event.target.value)}
                            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                        >
                            <option value="ALL">All Change Types</option>
                            {Object.entries(changeTypeLabels).map(([value, label]) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
                        <span>
                            Showing{" "}
                            <span className="font-medium text-foreground">
                                {filteredRequests.length}
                            </span>{" "}
                            of {requests.length} requests
                        </span>

                        {stats.highPriority > 0 && (
                            <span className="flex items-center gap-1 text-red-600 dark:text-red-400">
                                <AlertTriangle className="h-3.5 w-3.5" />
                                {stats.highPriority} high priority pending
                            </span>
                        )}
                    </div>

                    {/* Desktop Table */}
                    <div className="hidden overflow-hidden rounded-lg border md:block">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Request</TableHead>
                                    <TableHead>Course</TableHead>
                                    <TableHead>Change Type</TableHead>
                                    <TableHead>Effective Date</TableHead>
                                    <TableHead>Priority</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {filteredRequests.map((request) => (
                                    <TableRow key={request.id}>
                                        <TableCell>
                                            <p className="font-medium">{request.id}</p>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {formatDate(request.submittedAt)}
                                            </p>
                                        </TableCell>

                                        <TableCell>
                                            <p className="font-medium">{request.courseCode}</p>
                                            <p className="max-w-[180px] truncate text-xs text-muted-foreground">
                                                {request.courseName} · Section {request.section}
                                            </p>
                                        </TableCell>

                                        <TableCell>
                                            <span className="text-sm">
                                                {changeTypeLabels[request.changeType]}
                                            </span>
                                        </TableCell>

                                        <TableCell className="text-sm">
                                            {formatDate(request.effectiveDate)}
                                        </TableCell>

                                        <TableCell>
                                            <PriorityBadge priority={request.priority} />
                                        </TableCell>

                                        <TableCell>
                                            <StatusBadge status={request.status} />
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex justify-end">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => openDialog(request, "view")}
                                                >
                                                    <Eye className="mr-2 h-3.5 w-3.5" />
                                                    Review
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}

                                {filteredRequests.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-32 text-center">
                                            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                                <CalendarClock className="h-8 w-8 opacity-50" />
                                                <p className="font-medium">No requests found</p>
                                                <p className="text-xs">
                                                    Try changing your search or filters.
                                                </p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="space-y-3 md:hidden">
                        {filteredRequests.map((request) => (
                            <div
                                key={request.id}
                                className="space-y-3 rounded-lg border p-4"
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold">{request.id}</p>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            {formatDate(request.submittedAt)}
                                        </p>
                                    </div>
                                    <StatusBadge status={request.status} />
                                </div>

                                <div>
                                    <p className="font-semibold">{request.courseCode}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {request.courseName} · Section {request.section}
                                    </p>
                                </div>

                                <div className="flex flex-wrap items-center gap-2">
                                    <Badge variant="secondary">
                                        {changeTypeLabels[request.changeType]}
                                    </Badge>
                                    <PriorityBadge priority={request.priority} />
                                </div>

                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <CalendarDays className="h-4 w-4" />
                                    Effective: {formatDate(request.effectiveDate)}
                                </div>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full"
                                    onClick={() => openDialog(request, "view")}
                                >
                                    <Eye className="mr-2 h-4 w-4" />
                                    Review Request
                                </Button>
                            </div>
                        ))}

                        {filteredRequests.length === 0 && (
                            <div className="rounded-lg border border-dashed p-8 text-center">
                                <CalendarClock className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
                                <p className="font-medium">No requests found</p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Try changing your search or filters.
                                </p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Review Dialog */}
            <Dialog
                open={dialogMode !== null}
                onOpenChange={(open) => {
                    if (!open) closeDialog();
                }}
            >
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                    {selectedRequest && (
                        <>
                            <DialogHeader>
                                <DialogTitle>
                                    {dialogMode === "approve"
                                        ? "Approve Schedule Change"
                                        : dialogMode === "reject"
                                            ? "Reject Schedule Change"
                                            : "Schedule Change Details"}
                                </DialogTitle>
                                <DialogDescription>
                                    Review the request details and compare the current and
                                    proposed schedules.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-5">
                                {/* Request Information */}
                                <div className="flex flex-wrap items-start justify-between gap-3 rounded-lg border p-3">
                                    <div>
                                        <p className="font-semibold">{selectedRequest.id}</p>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {selectedRequest.courseCode} ·{" "}
                                            {selectedRequest.courseName}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        <StatusBadge status={selectedRequest.status} />
                                        <PriorityBadge priority={selectedRequest.priority} />
                                    </div>
                                </div>

                                {/* Requester */}
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-lg bg-muted p-2">
                                            <User className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">
                                                Requested By
                                            </p>
                                            <p className="text-sm font-medium">
                                                {selectedRequest.requestedBy}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {selectedRequest.requestedByRole}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="rounded-lg bg-muted p-2">
                                            <GraduationCap className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Course</p>
                                            <p className="text-sm font-medium">
                                                {selectedRequest.courseCode} · Section{" "}
                                                {selectedRequest.section}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {selectedRequest.courseName}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="rounded-lg bg-muted p-2">
                                            <CalendarDays className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">
                                                Submitted At
                                            </p>
                                            <p className="text-sm font-medium">
                                                {formatDate(selectedRequest.submittedAt)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="rounded-lg bg-muted p-2">
                                            <Clock className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">
                                                Effective Date
                                            </p>
                                            <p className="text-sm font-medium">
                                                {formatDate(selectedRequest.effectiveDate)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Change Type */}
                                <div>
                                    <Label className="text-xs text-muted-foreground">
                                        Change Type
                                    </Label>
                                    <p className="mt-1 text-sm font-medium">
                                        {changeTypeLabels[selectedRequest.changeType]}
                                    </p>
                                </div>

                                {/* Schedule Comparison */}
                                <div className="space-y-2">
                                    <h3 className="text-sm font-semibold">
                                        Schedule Comparison
                                    </h3>
                                    <ScheduleComparison
                                        current={selectedRequest.currentSchedule}
                                        proposed={selectedRequest.proposedSchedule}
                                    />
                                </div>

                                {/* Reason */}
                                <div className="space-y-2">
                                    <Label>Reason for Request</Label>
                                    <div className="rounded-lg bg-muted/50 p-3 text-sm leading-relaxed">
                                        {selectedRequest.reason}
                                    </div>
                                </div>

                                {/* Existing Review Note */}
                                {selectedRequest.reviewNote && dialogMode === "view" && (
                                    <div className="space-y-2">
                                        <Label>Previous Review Note</Label>
                                        <div className="rounded-lg border p-3 text-sm">
                                            {selectedRequest.reviewNote}
                                        </div>
                                    </div>
                                )}

                                {/* Review Note */}
                                {dialogMode !== "view" && (
                                    <div className="space-y-2">
                                        <Label htmlFor="reviewNote">
                                            Review Note{" "}
                                            {dialogMode === "reject" && (
                                                <span className="text-destructive">*</span>
                                            )}
                                        </Label>
                                        <Textarea
                                            id="reviewNote"
                                            placeholder={
                                                dialogMode === "approve"
                                                    ? "Add an optional approval note..."
                                                    : "Explain why this request is being rejected..."
                                            }
                                            value={reviewNote}
                                            onChange={(event) => setReviewNote(event.target.value)}
                                            rows={3}
                                        />
                                        {dialogMode === "reject" && !reviewNote.trim() && (
                                            <p className="text-xs text-muted-foreground">
                                                A rejection reason is required.
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>

                            <DialogFooter className="flex-col gap-2 sm:flex-row">
                                {dialogMode === "view" ? (
                                    <>
                                        <Button
                                            variant="outline"
                                            onClick={closeDialog}
                                            className="w-full sm:w-auto"
                                        >
                                            Close
                                        </Button>

                                        {selectedRequest.status === "PENDING" && (
                                            <>
                                                <Button
                                                    variant="destructive"
                                                    onClick={() => {
                                                        setDialogMode("reject");
                                                        setReviewNote("");
                                                    }}
                                                    className="w-full sm:w-auto"
                                                >
                                                    <X className="mr-2 h-4 w-4" />
                                                    Reject
                                                </Button>

                                                <Button
                                                    onClick={() => {
                                                        setDialogMode("approve");
                                                        setReviewNote("");
                                                    }}
                                                    className="w-full sm:w-auto"
                                                >
                                                    <Check className="mr-2 h-4 w-4" />
                                                    Approve
                                                </Button>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            variant="outline"
                                            onClick={() => {
                                                setDialogMode("view");
                                                setReviewNote(selectedRequest.reviewNote ?? "");
                                            }}
                                            className="w-full sm:w-auto"
                                        >
                                            Back
                                        </Button>

                                        <Button
                                            variant={
                                                dialogMode === "reject" ? "destructive" : "default"
                                            }
                                            onClick={handleReview}
                                            disabled={
                                                dialogMode === "reject" && !reviewNote.trim()
                                            }
                                            className="w-full sm:w-auto"
                                        >
                                            {dialogMode === "approve" ? (
                                                <>
                                                    <Check className="mr-2 h-4 w-4" />
                                                    Confirm Approval
                                                </>
                                            ) : (
                                                <>
                                                    <X className="mr-2 h-4 w-4" />
                                                    Confirm Rejection
                                                </>
                                            )}
                                        </Button>
                                    </>
                                )}
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
