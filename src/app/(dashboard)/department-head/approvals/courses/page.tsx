// import React from 'react'

// export default function courses() {
//     return (
//         <div>courses</div>
//     )
// }




















"use client";

import { useMemo, useState } from "react";
import {
    BookOpen,
    Check,
    CheckCircle2,
    Clock3,
    Download,
    Eye,
    FileText,
    Filter,
    GraduationCap,
    Search,
    X,
    XCircle,
    AlertTriangle,
    CalendarDays,
    UserRound,
    Building2,
    BookMarked,
    RefreshCw,
} from "lucide-react";

type RequestStatus = "PENDING" | "APPROVED" | "REJECTED";
type Priority = "HIGH" | "MEDIUM" | "LOW";
type RequestType =
    | "NEW_COURSE"
    | "COURSE_UPDATE"
    | "COURSE_OFFERING"
    | "CAPACITY_CHANGE";

interface CourseRequest {
    id: string;
    requestNumber: string;
    type: RequestType;
    courseCode: string;
    courseTitle: string;
    requester: string;
    requesterRole: string;
    program: string;
    semester: string;
    credits: number;
    priority: Priority;
    status: RequestStatus;
    submittedAt: string;
    description: string;
    reason: string;
    previousValue?: string;
    requestedValue?: string;
    reviewedBy?: string;
    reviewNote?: string;
}

const initialRequests: CourseRequest[] = [
    {
        id: "1",
        requestNumber: "CR-2026-001",
        type: "NEW_COURSE",
        courseCode: "CSE-401",
        courseTitle: "Artificial Intelligence",
        requester: "Dr. Mahmud Hasan",
        requesterRole: "Senior Instructor",
        program: "Computer Science & Engineering",
        semester: "Fall 2026",
        credits: 3,
        priority: "HIGH",
        status: "PENDING",
        submittedAt: "2026-11-05",
        description:
            "A proposed course introducing students to artificial intelligence concepts, search algorithms, machine learning fundamentals, and practical AI applications.",
        reason:
            "This course will help students develop foundational knowledge in AI and prepare them for advanced electives.",
    },
    {
        id: "2",
        requestNumber: "CR-2026-002",
        type: "COURSE_UPDATE",
        courseCode: "CSE-301",
        courseTitle: "Database Management Systems",
        requester: "Nusrat Jahan",
        requesterRole: "Assistant Professor",
        program: "Computer Science & Engineering",
        semester: "Fall 2026",
        credits: 3,
        priority: "MEDIUM",
        status: "PENDING",
        submittedAt: "2026-11-04",
        description:
            "Update the existing course syllabus to include modern database technologies and practical database administration.",
        reason:
            "The current syllabus needs to reflect current industry practices.",
        previousValue: "Basic SQL and relational database concepts",
        requestedValue: "Advanced SQL, PostgreSQL, indexing, query optimization",
    },
    {
        id: "3",
        requestNumber: "CR-2026-003",
        type: "COURSE_OFFERING",
        courseCode: "CSE-201",
        courseTitle: "Data Structures",
        requester: "Dr. Arif Rahman",
        requesterRole: "Associate Professor",
        program: "Computer Science & Engineering",
        semester: "Spring 2027",
        credits: 3,
        priority: "HIGH",
        status: "PENDING",
        submittedAt: "2026-11-03",
        description:
            "Request to offer Data Structures in the upcoming Spring 2027 semester.",
        reason:
            "The course is required for students progressing to the next academic level.",
    },
    {
        id: "4",
        requestNumber: "CR-2026-004",
        type: "CAPACITY_CHANGE",
        courseCode: "CSE-101",
        courseTitle: "Introduction to Programming",
        requester: "Farhan Ahmed",
        requesterRole: "Lecturer",
        program: "Computer Science & Engineering",
        semester: "Spring 2027",
        credits: 3,
        priority: "LOW",
        status: "APPROVED",
        submittedAt: "2026-10-30",
        description:
            "Increase the maximum enrollment capacity for the upcoming course offering.",
        reason:
            "More students are expected to enroll in this course.",
        previousValue: "40 students",
        requestedValue: "55 students",
        reviewedBy: "Department Head",
        reviewNote: "Approved after reviewing classroom capacity.",
    },
    {
        id: "5",
        requestNumber: "CR-2026-005",
        type: "NEW_COURSE",
        courseCode: "CSE-405",
        courseTitle: "Cloud Computing",
        requester: "Sadia Islam",
        requesterRole: "Assistant Professor",
        program: "Computer Science & Engineering",
        semester: "Spring 2027",
        credits: 3,
        priority: "MEDIUM",
        status: "REJECTED",
        submittedAt: "2026-10-28",
        description:
            "Introduce a new course covering cloud infrastructure, deployment, and distributed systems.",
        reason: "To provide students with practical cloud computing knowledge.",
        reviewedBy: "Department Head",
        reviewNote:
            "Please revise the course outline and submit the proposal again.",
    },
    {
        id: "6",
        requestNumber: "CR-2026-006",
        type: "COURSE_UPDATE",
        courseCode: "CSE-302",
        courseTitle: "Operating Systems",
        requester: "Dr. Tanvir Hossain",
        requesterRole: "Senior Instructor",
        program: "Computer Science & Engineering",
        semester: "Spring 2027",
        credits: 3,
        priority: "LOW",
        status: "PENDING",
        submittedAt: "2026-11-02",
        description:
            "Update the course learning outcomes and recommended textbooks.",
        reason:
            "The existing course materials need a minor academic revision.",
        previousValue: "Previous course learning outcomes",
        requestedValue: "Updated learning outcomes and reference materials",
    },
];

const typeLabels: Record<RequestType, string> = {
    NEW_COURSE: "New Course",
    COURSE_UPDATE: "Course Update",
    COURSE_OFFERING: "Course Offering",
    CAPACITY_CHANGE: "Capacity Change",
};

function formatDate(date: string) {
    return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

function StatusBadge({ status }: { status: RequestStatus }) {
    const styles: Record<RequestStatus, string> = {
        PENDING:
            "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
        APPROVED:
            "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
        REJECTED:
            "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
    };

    return (
        <span
            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${styles[status]}`}
        >
            {status === "PENDING" && <Clock3 className="mr-1.5 h-3.5 w-3.5" />}
            {status === "APPROVED" && (
                <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
            )}
            {status === "REJECTED" && <XCircle className="mr-1.5 h-3.5 w-3.5" />}
            {status.charAt(0) + status.slice(1).toLowerCase()}
        </span>
    );
}

function PriorityBadge({ priority }: { priority: Priority }) {
    const styles: Record<Priority, string> = {
        HIGH: "text-red-600 dark:text-red-400",
        MEDIUM: "text-amber-600 dark:text-amber-400",
        LOW: "text-muted-foreground",
    };

    return (
        <span className={`inline-flex items-center gap-1 text-xs font-medium ${styles[priority]}`}>
            <span
                className={`h-1.5 w-1.5 rounded-full ${priority === "HIGH"
                    ? "bg-red-500"
                    : priority === "MEDIUM"
                        ? "bg-amber-500"
                        : "bg-muted-foreground"
                    }`}
            />
            {priority.charAt(0) + priority.slice(1).toLowerCase()}
        </span>
    );
}

export default function CourseApprovalsPage() {
    const [requests, setRequests] = useState<CourseRequest[]>(initialRequests);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [typeFilter, setTypeFilter] = useState("ALL");
    const [priorityFilter, setPriorityFilter] = useState("ALL");
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [reviewNote, setReviewNote] = useState("");
    const [action, setAction] = useState<"APPROVED" | "REJECTED" | null>(null);
    const [showReviewDialog, setShowReviewDialog] = useState(false);

    const selectedRequest = requests.find((request) => request.id === selectedId);

    const stats = useMemo(
        () => ({
            total: requests.length,
            pending: requests.filter((item) => item.status === "PENDING").length,
            approved: requests.filter((item) => item.status === "APPROVED").length,
            rejected: requests.filter((item) => item.status === "REJECTED").length,
            highPriority: requests.filter(
                (item) => item.status === "PENDING" && item.priority === "HIGH",
            ).length,
        }),
        [requests],
    );

    const filteredRequests = useMemo(() => {
        const query = search.toLowerCase().trim();

        return requests.filter((request) => {
            const matchesSearch =
                !query ||
                request.courseTitle.toLowerCase().includes(query) ||
                request.courseCode.toLowerCase().includes(query) ||
                request.requester.toLowerCase().includes(query) ||
                request.requestNumber.toLowerCase().includes(query);

            const matchesStatus =
                statusFilter === "ALL" || request.status === statusFilter;

            const matchesType =
                typeFilter === "ALL" || request.type === typeFilter;

            const matchesPriority =
                priorityFilter === "ALL" || request.priority === priorityFilter;

            return (
                matchesSearch &&
                matchesStatus &&
                matchesType &&
                matchesPriority
            );
        });
    }, [requests, search, statusFilter, typeFilter, priorityFilter]);

    function openDetails(request: CourseRequest) {
        setSelectedId(request.id);
        setReviewNote("");
        setAction(null);
        setShowReviewDialog(false);
    }

    function openReview(
        request: CourseRequest,
        nextAction: "APPROVED" | "REJECTED",
    ) {
        setSelectedId(request.id);
        setReviewNote("");
        setAction(nextAction);
        setShowReviewDialog(true);
    }

    function submitReview() {
        if (!selectedId || !action) return;

        if (action === "REJECTED" && !reviewNote.trim()) {
            return;
        }

        setRequests((current) =>
            current.map((request) =>
                request.id === selectedId
                    ? {
                        ...request,
                        status: action,
                        reviewedBy: "Department Head",
                        reviewNote: reviewNote.trim() || "Approved by Department Head.",
                    }
                    : request,
            ),
        );

        setShowReviewDialog(false);
        setSelectedId(null);
        setReviewNote("");
        setAction(null);
    }

    function exportCSV() {
        const headers = [
            "Request ID",
            "Course Code",
            "Course Title",
            "Request Type",
            "Requester",
            "Program",
            "Semester",
            "Priority",
            "Status",
            "Submitted At",
        ];

        const rows = filteredRequests.map((request) => [
            request.requestNumber,
            request.courseCode,
            request.courseTitle,
            typeLabels[request.type],
            request.requester,
            request.program,
            request.semester,
            request.priority,
            request.status,
            request.submittedAt,
        ]);

        const csv = [headers, ...rows]
            .map((row) =>
                row
                    .map((value) => `"${String(value).replace(/"/g, '""')}"`)
                    .join(","),
            )
            .join("\n");

        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = "campusflow-course-approvals.csv";
        link.click();

        URL.revokeObjectURL(url);
    }

    return (
        <div className="space-y-6 pb-10 p-4">
            {/* Header */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <BookOpen className="h-4 w-4" />
                        Academics
                        <span>/</span>
                        <span>Course Approvals</span>
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Course Approvals
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Review and manage course-related requests from your department.
                    </p>
                </div>

                <button
                    onClick={exportCSV}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border bg-background px-4 text-sm font-medium transition-colors hover:bg-muted"
                >
                    <Download className="h-4 w-4" />
                    Export CSV
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-xl border bg-card p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">
                            Total Requests
                        </p>
                        <div className="rounded-lg bg-primary/10 p-2 text-primary">
                            <FileText className="h-5 w-5" />
                        </div>
                    </div>
                    <p className="mt-3 text-3xl font-bold">{stats.total}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                        All course requests
                    </p>
                </div>

                <div className="rounded-xl border bg-card p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">
                            Pending Review
                        </p>
                        <div className="rounded-lg bg-amber-500/10 p-2 text-amber-600">
                            <Clock3 className="h-5 w-5" />
                        </div>
                    </div>
                    <p className="mt-3 text-3xl font-bold">{stats.pending}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                        Awaiting your decision
                    </p>
                </div>

                <div className="rounded-xl border bg-card p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">
                            Approved
                        </p>
                        <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-600">
                            <CheckCircle2 className="h-5 w-5" />
                        </div>
                    </div>
                    <p className="mt-3 text-3xl font-bold">{stats.approved}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                        Successfully approved
                    </p>
                </div>

                <div className="rounded-xl border bg-card p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">
                            Rejected
                        </p>
                        <div className="rounded-lg bg-red-500/10 p-2 text-red-600">
                            <XCircle className="h-5 w-5" />
                        </div>
                    </div>
                    <p className="mt-3 text-3xl font-bold">{stats.rejected}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                        Requests not approved
                    </p>
                </div>
            </div>

            {/* Priority Alert */}
            {stats.highPriority > 0 && (
                <div className="flex flex-col gap-3 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-amber-500/10 p-2 text-amber-600">
                            <AlertTriangle className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="font-semibold text-foreground">
                                High-priority requests need attention
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                You have {stats.highPriority} high-priority course request
                                {stats.highPriority > 1 ? "s" : ""} waiting for review.
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            setStatusFilter("PENDING");
                            setPriorityFilter("HIGH");
                        }}
                        className="shrink-0 text-left text-sm font-semibold text-amber-700 hover:underline dark:text-amber-400 sm:text-right"
                    >
                        Review requests →
                    </button>
                </div>
            )}

            {/* Request Type Overview */}
            <div>
                <div className="mb-3">
                    <h2 className="text-base font-semibold">Request Categories</h2>
                    <p className="text-sm text-muted-foreground">
                        Course requests grouped by their purpose.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                    {(
                        [
                            ["NEW_COURSE", "New Courses", BookOpen],
                            ["COURSE_UPDATE", "Course Updates", RefreshCw],
                            ["COURSE_OFFERING", "Course Offerings", CalendarDays],
                            ["CAPACITY_CHANGE", "Capacity Changes", UsersIcon],
                        ] as const
                    ).map(([type, label, Icon]) => {
                        const count = requests.filter(
                            (request) => request.type === type,
                        ).length;

                        return (
                            <button
                                key={type}
                                onClick={() =>
                                    setTypeFilter(typeFilter === type ? "ALL" : type)
                                }
                                className={`rounded-xl border bg-card p-4 text-left transition-colors hover:bg-muted/50 ${typeFilter === type ? "border-primary ring-1 ring-primary" : ""
                                    }`}
                            >
                                <div className="flex items-center justify-between gap-2">
                                    <div className="rounded-lg bg-primary/10 p-2 text-primary">
                                        <Icon className="h-4 w-4" />
                                    </div>
                                    <span className="text-xl font-bold">{count}</span>
                                </div>
                                <p className="mt-3 text-sm font-medium">{label}</p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    {count} request{count !== 1 ? "s" : ""}
                                </p>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Filters and Table */}
            <div className="overflow-hidden rounded-xl border bg-card">
                <div className="border-b p-4 sm:p-5">
                    <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
                        <div>
                            <h2 className="font-semibold">Course Request List</h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Review submitted course requests and take action.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                                <Filter className="h-3.5 w-3.5" />
                                Filters
                            </span>
                            <button
                                onClick={() => {
                                    setSearch("");
                                    setStatusFilter("ALL");
                                    setTypeFilter("ALL");
                                    setPriorityFilter("ALL");
                                }}
                                className="text-xs font-medium text-primary hover:underline"
                            >
                                Clear all
                            </button>
                        </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        <div className="relative sm:col-span-2 xl:col-span-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <input
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Search course or requester..."
                                className="h-10 w-full rounded-lg border bg-background pl-9 pr-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                            />
                        </div>

                        <select
                            value={statusFilter}
                            onChange={(event) => setStatusFilter(event.target.value)}
                            className="h-10 rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
                        >
                            <option value="ALL">All Statuses</option>
                            <option value="PENDING">Pending</option>
                            <option value="APPROVED">Approved</option>
                            <option value="REJECTED">Rejected</option>
                        </select>

                        <select
                            value={typeFilter}
                            onChange={(event) => setTypeFilter(event.target.value)}
                            className="h-10 rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
                        >
                            <option value="ALL">All Request Types</option>
                            <option value="NEW_COURSE">New Course</option>
                            <option value="COURSE_UPDATE">Course Update</option>
                            <option value="COURSE_OFFERING">Course Offering</option>
                            <option value="CAPACITY_CHANGE">Capacity Change</option>
                        </select>

                        <select
                            value={priorityFilter}
                            onChange={(event) => setPriorityFilter(event.target.value)}
                            className="h-10 rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
                        >
                            <option value="ALL">All Priorities</option>
                            <option value="HIGH">High Priority</option>
                            <option value="MEDIUM">Medium Priority</option>
                            <option value="LOW">Low Priority</option>
                        </select>
                    </div>
                </div>

                {/* Desktop Table */}
                <div className="hidden overflow-x-auto md:block">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
                            <tr>
                                <th className="px-5 py-3 font-medium">Course</th>
                                <th className="px-5 py-3 font-medium">Request Type</th>
                                <th className="px-5 py-3 font-medium">Requested By</th>
                                <th className="px-5 py-3 font-medium">Submitted</th>
                                <th className="px-5 py-3 font-medium">Priority</th>
                                <th className="px-5 py-3 font-medium">Status</th>
                                <th className="px-5 py-3 text-right font-medium">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y">
                            {filteredRequests.map((request) => (
                                <tr
                                    key={request.id}
                                    className="transition-colors hover:bg-muted/30"
                                >
                                    <td className="px-5 py-4">
                                        <p className="font-semibold">{request.courseTitle}</p>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            {request.courseCode} · {request.requestNumber}
                                        </p>
                                    </td>

                                    <td className="px-5 py-4">
                                        <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium">
                                            {typeLabels[request.type]}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4">
                                        <p className="font-medium">{request.requester}</p>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            {request.requesterRole}
                                        </p>
                                    </td>

                                    <td className="px-5 py-4 text-muted-foreground">
                                        {formatDate(request.submittedAt)}
                                    </td>

                                    <td className="px-5 py-4">
                                        <PriorityBadge priority={request.priority} />
                                    </td>

                                    <td className="px-5 py-4">
                                        <StatusBadge status={request.status} />
                                    </td>

                                    <td className="px-5 py-4">
                                        <div className="flex items-center justify-end gap-1">
                                            <button
                                                onClick={() => openDetails(request)}
                                                title="View details"
                                                className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </button>

                                            {request.status === "PENDING" && (
                                                <>
                                                    <button
                                                        onClick={() => openReview(request, "APPROVED")}
                                                        title="Approve request"
                                                        className="rounded-lg p-2 text-emerald-600 hover:bg-emerald-500/10"
                                                    >
                                                        <Check className="h-4 w-4" />
                                                    </button>

                                                    <button
                                                        onClick={() => openReview(request, "REJECTED")}
                                                        title="Reject request"
                                                        className="rounded-lg p-2 text-red-600 hover:bg-red-500/10"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className="space-y-3 p-3 md:hidden">
                    {filteredRequests.map((request) => (
                        <div key={request.id} className="rounded-lg border p-4">
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <p className="break-words font-semibold">
                                        {request.courseTitle}
                                    </p>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {request.courseCode} · {request.requestNumber}
                                    </p>
                                </div>
                                <StatusBadge status={request.status} />
                            </div>

                            <div className="mt-3 flex flex-wrap items-center gap-2">
                                <span className="rounded-md bg-muted px-2 py-1 text-xs">
                                    {typeLabels[request.type]}
                                </span>
                                <PriorityBadge priority={request.priority} />
                            </div>

                            <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                                <p className="flex items-center gap-2">
                                    <UserRound className="h-3.5 w-3.5" />
                                    {request.requester}
                                </p>
                                <p className="flex items-center gap-2">
                                    <CalendarDays className="h-3.5 w-3.5" />
                                    {formatDate(request.submittedAt)}
                                </p>
                            </div>

                            <div className="mt-4 flex gap-2 border-t pt-3">
                                <button
                                    onClick={() => openDetails(request)}
                                    className="inline-flex h-9 flex-1 items-center justify-center gap-2 rounded-lg border text-sm font-medium hover:bg-muted"
                                >
                                    <Eye className="h-4 w-4" />
                                    Details
                                </button>

                                {request.status === "PENDING" && (
                                    <>
                                        <button
                                            onClick={() => openReview(request, "APPROVED")}
                                            className="inline-flex h-9 items-center justify-center gap-1 rounded-lg bg-emerald-600 px-3 text-sm font-medium text-white hover:bg-emerald-700"
                                        >
                                            <Check className="h-4 w-4" />
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => openReview(request, "REJECTED")}
                                            className="inline-flex h-9 items-center justify-center gap-1 rounded-lg bg-red-600 px-3 text-sm font-medium text-white hover:bg-red-700"
                                        >
                                            <X className="h-4 w-4" />
                                            Reject
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {filteredRequests.length === 0 && (
                    <div className="px-4 py-14 text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                            <Search className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <h3 className="mt-4 font-semibold">No requests found</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Try changing your search or filter criteria.
                        </p>
                        <button
                            onClick={() => {
                                setSearch("");
                                setStatusFilter("ALL");
                                setTypeFilter("ALL");
                                setPriorityFilter("ALL");
                            }}
                            className="mt-3 text-sm font-medium text-primary hover:underline"
                        >
                            Reset filters
                        </button>
                    </div>
                )}

                <div className="border-t px-4 py-3 text-xs text-muted-foreground sm:px-5">
                    Showing {filteredRequests.length} of {requests.length} course
                    requests
                </div>
            </div>

            {/* Request Details Dialog */}
            {selectedRequest && !showReviewDialog && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-5"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) setSelectedId(null);
                    }}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="request-details-title"
                        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border bg-background shadow-xl"
                    >
                        <div className="flex items-start justify-between border-b p-5">
                            <div>
                                <h2 id="request-details-title" className="text-lg font-bold">
                                    Course Request Details
                                </h2>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {selectedRequest.requestNumber}
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedId(null)}
                                className="rounded-lg p-2 text-muted-foreground hover:bg-muted"
                                aria-label="Close details"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="space-y-5 p-5">
                            <div className="flex flex-wrap items-center gap-2">
                                <StatusBadge status={selectedRequest.status} />
                                <PriorityBadge priority={selectedRequest.priority} />
                                <span className="rounded-md bg-muted px-2 py-1 text-xs">
                                    {typeLabels[selectedRequest.type]}
                                </span>
                            </div>

                            <div>
                                <p className="text-xs font-medium uppercase text-muted-foreground">
                                    Course Information
                                </p>
                                <h3 className="mt-2 text-xl font-bold">
                                    {selectedRequest.courseTitle}
                                </h3>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {selectedRequest.courseCode}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-4 rounded-lg border p-4 sm:grid-cols-2">
                                <div>
                                    <p className="text-xs text-muted-foreground">Program</p>
                                    <p className="mt-1 flex items-center gap-2 text-sm font-medium">
                                        <Building2 className="h-4 w-4 text-muted-foreground" />
                                        {selectedRequest.program}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Semester</p>
                                    <p className="mt-1 flex items-center gap-2 text-sm font-medium">
                                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                                        {selectedRequest.semester}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Credit Hours</p>
                                    <p className="mt-1 flex items-center gap-2 text-sm font-medium">
                                        <BookMarked className="h-4 w-4 text-muted-foreground" />
                                        {selectedRequest.credits} Credits
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Submitted On</p>
                                    <p className="mt-1 text-sm font-medium">
                                        {formatDate(selectedRequest.submittedAt)}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <p className="text-sm font-semibold">Requested By</p>
                                <div className="mt-2 flex items-center gap-3 rounded-lg border p-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                        <UserRound className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">
                                            {selectedRequest.requester}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {selectedRequest.requesterRole}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <p className="text-sm font-semibold">Request Description</p>
                                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                    {selectedRequest.description}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm font-semibold">Reason for Request</p>
                                <p className="mt-2 rounded-lg bg-muted/50 p-3 text-sm leading-6 text-muted-foreground">
                                    {selectedRequest.reason}
                                </p>
                            </div>

                            {selectedRequest.previousValue && (
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    <div className="rounded-lg border p-3">
                                        <p className="text-xs font-medium text-muted-foreground">
                                            Previous Value
                                        </p>
                                        <p className="mt-2 text-sm">
                                            {selectedRequest.previousValue}
                                        </p>
                                    </div>
                                    <div className="rounded-lg border border-primary/30 p-3">
                                        <p className="text-xs font-medium text-primary">
                                            Requested Value
                                        </p>
                                        <p className="mt-2 text-sm">
                                            {selectedRequest.requestedValue}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {selectedRequest.reviewedBy && (
                                <div className="rounded-lg border p-3">
                                    <p className="text-sm font-semibold">Review Information</p>
                                    <p className="mt-2 text-xs text-muted-foreground">
                                        Reviewed by: {selectedRequest.reviewedBy}
                                    </p>
                                    <p className="mt-2 text-sm">{selectedRequest.reviewNote}</p>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col-reverse gap-2 border-t p-4 sm:flex-row sm:justify-end">
                            <button
                                onClick={() => setSelectedId(null)}
                                className="h-10 rounded-lg border px-4 text-sm font-medium hover:bg-muted"
                            >
                                Close
                            </button>

                            {selectedRequest.status === "PENDING" && (
                                <>
                                    <button
                                        onClick={() => openReview(selectedRequest, "REJECTED")}
                                        className="h-10 rounded-lg border border-red-500/30 px-4 text-sm font-medium text-red-600 hover:bg-red-500/10"
                                    >
                                        Reject Request
                                    </button>
                                    <button
                                        onClick={() => openReview(selectedRequest, "APPROVED")}
                                        className="h-10 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                                    >
                                        Approve Request
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Approval / Rejection Confirmation Dialog */}
            {showReviewDialog && selectedRequest && action && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-3 sm:p-5"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setShowReviewDialog(false);
                            setAction(null);
                        }
                    }}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="review-dialog-title"
                        className="w-full max-w-md rounded-xl border bg-background shadow-xl"
                    >
                        <div className="flex items-start justify-between border-b p-5">
                            <div>
                                <h2 id="review-dialog-title" className="text-lg font-bold">
                                    {action === "APPROVED" ? "Approve Request" : "Reject Request"}
                                </h2>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {selectedRequest.requestNumber}
                                </p>
                            </div>
                            <button
                                onClick={() => {
                                    setShowReviewDialog(false);
                                    setAction(null);
                                }}
                                className="rounded-lg p-2 text-muted-foreground hover:bg-muted"
                                aria-label="Close review dialog"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="space-y-4 p-5">
                            <div className="rounded-lg bg-muted/50 p-3">
                                <p className="font-medium">{selectedRequest.courseTitle}</p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    {selectedRequest.courseCode} · {typeLabels[selectedRequest.type]}
                                </p>
                            </div>

                            <div>
                                <label
                                    htmlFor="review-note"
                                    className="text-sm font-medium"
                                >
                                    Review Note{" "}
                                    {action === "REJECTED" ? (
                                        <span className="text-red-500">*</span>
                                    ) : (
                                        <span className="text-muted-foreground">(Optional)</span>
                                    )}
                                </label>
                                <textarea
                                    id="review-note"
                                    value={reviewNote}
                                    onChange={(event) => setReviewNote(event.target.value)}
                                    rows={4}
                                    placeholder={
                                        action === "APPROVED"
                                            ? "Add an approval note..."
                                            : "Explain why this request is being rejected..."
                                    }
                                    className="mt-2 w-full resize-none rounded-lg border bg-background p-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                                />
                                {action === "REJECTED" && !reviewNote.trim() && (
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        A reason is required when rejecting a request.
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col-reverse gap-2 border-t p-4 sm:flex-row sm:justify-end">
                            <button
                                onClick={() => {
                                    setShowReviewDialog(false);
                                    setAction(null);
                                }}
                                className="h-10 rounded-lg border px-4 text-sm font-medium hover:bg-muted"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={submitReview}
                                disabled={action === "REJECTED" && !reviewNote.trim()}
                                className={`h-10 rounded-lg px-4 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50 ${action === "APPROVED"
                                    ? "bg-emerald-600 hover:bg-emerald-700"
                                    : "bg-red-600 hover:bg-red-700"
                                    }`}
                            >
                                {action === "APPROVED" ? "Confirm Approval" : "Confirm Rejection"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function UsersIcon({ className }: { className?: string }) {
    return <GraduationCap className={className} />;
}
