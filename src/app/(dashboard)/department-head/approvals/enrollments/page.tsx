// import React from 'react'

// export default function enrollmentsApprovals() {
//     return (
//         <div>enrollmentsapprovals</div>
//     )
// }




















"use client";

import { useMemo, useState } from "react";
import {
    Search,
    Download,
    Users,
    Clock3,
    CheckCircle2,
    XCircle,
    AlertTriangle,
    Eye,
    X,
    Filter,
    CalendarDays,
    GraduationCap,
    BookOpen,
    UserRound,
    Building2,
    FileText,
    Check,
    ClipboardCheck,
    Mail,
    Hash,
} from "lucide-react";

type EnrollmentStatus = "PENDING" | "APPROVED" | "REJECTED";
type Priority = "HIGH" | "MEDIUM" | "LOW";

interface EnrollmentRequest {
    id: string;
    requestNumber: string;
    studentId: string;
    studentName: string;
    email: string;
    program: string;
    courseCode: string;
    courseName: string;
    instructor: string;
    semester: string;
    creditHours: number;
    submittedAt: string;
    priority: Priority;
    status: EnrollmentStatus;
    completedCredits: number;
    maxCredits: number;
    prerequisitesMet: boolean;
    reason: string;
    reviewNote?: string;
    reviewedBy?: string;
}

const initialRequests: EnrollmentRequest[] = [
    {
        id: "1",
        requestNumber: "ENR-2026-001",
        studentId: "STU-2024-CSE-0001",
        studentName: "Rahim Ahmed",
        email: "rahim@example.com",
        program: "Computer Science & Engineering",
        courseCode: "CSE-301",
        courseName: "Database Management Systems",
        instructor: "Dr. Arif Rahman",
        semester: "Fall 2026",
        creditHours: 3,
        submittedAt: "2026-11-05",
        priority: "HIGH",
        status: "PENDING",
        completedCredits: 48,
        maxCredits: 24,
        prerequisitesMet: true,
        reason: "Required course for the next academic level.",
    },
    {
        id: "2",
        requestNumber: "ENR-2026-002",
        studentId: "STU-2024-CSE-0002",
        studentName: "Nusrat Jahan",
        email: "nusrat@example.com",
        program: "Computer Science & Engineering",
        courseCode: "CSE-401",
        courseName: "Artificial Intelligence",
        instructor: "Dr. Mahmud Hasan",
        semester: "Fall 2026",
        creditHours: 3,
        submittedAt: "2026-11-04",
        priority: "MEDIUM",
        status: "PENDING",
        completedCredits: 60,
        maxCredits: 24,
        prerequisitesMet: true,
        reason: "Interested in specializing in artificial intelligence.",
    },
    {
        id: "3",
        requestNumber: "ENR-2026-003",
        studentId: "STU-2025-CSE-0003",
        studentName: "Sakib Hossain",
        email: "sakib@example.com",
        program: "Computer Science & Engineering",
        courseCode: "CSE-201",
        courseName: "Data Structures",
        instructor: "Nusrat Jahan",
        semester: "Fall 2026",
        creditHours: 3,
        submittedAt: "2026-11-03",
        priority: "HIGH",
        status: "PENDING",
        completedCredits: 24,
        maxCredits: 24,
        prerequisitesMet: false,
        reason: "Wants to enroll in the course this semester.",
    },
    {
        id: "4",
        requestNumber: "ENR-2026-004",
        studentId: "STU-2024-CSE-0004",
        studentName: "Ayesha Akter",
        email: "ayesha@example.com",
        program: "Computer Science & Engineering",
        courseCode: "CSE-302",
        courseName: "Operating Systems",
        instructor: "Dr. Tanvir Hossain",
        semester: "Fall 2026",
        creditHours: 3,
        submittedAt: "2026-11-02",
        priority: "LOW",
        status: "APPROVED",
        completedCredits: 54,
        maxCredits: 24,
        prerequisitesMet: true,
        reason: "Required course in the academic curriculum.",
        reviewedBy: "Department Head",
        reviewNote: "Eligibility verified. Enrollment approved.",
    },
    {
        id: "5",
        requestNumber: "ENR-2026-005",
        studentId: "STU-2025-CSE-0005",
        studentName: "Tanvir Islam",
        email: "tanvir@example.com",
        program: "Computer Science & Engineering",
        courseCode: "CSE-401",
        courseName: "Artificial Intelligence",
        instructor: "Dr. Mahmud Hasan",
        semester: "Fall 2026",
        creditHours: 3,
        submittedAt: "2026-10-30",
        priority: "MEDIUM",
        status: "REJECTED",
        completedCredits: 30,
        maxCredits: 24,
        prerequisitesMet: true,
        reason: "Interested in taking an advanced elective.",
        reviewedBy: "Department Head",
        reviewNote: "Course capacity has been reached.",
    },
    {
        id: "6",
        requestNumber: "ENR-2026-006",
        studentId: "STU-2024-CSE-0006",
        studentName: "Farhan Ahmed",
        email: "farhan@example.com",
        program: "Computer Science & Engineering",
        courseCode: "CSE-301",
        courseName: "Database Management Systems",
        instructor: "Dr. Arif Rahman",
        semester: "Spring 2027",
        creditHours: 3,
        submittedAt: "2026-11-01",
        priority: "LOW",
        status: "PENDING",
        completedCredits: 42,
        maxCredits: 24,
        prerequisitesMet: true,
        reason: "Needs this course to complete the program requirements.",
    },
];

function formatDate(date: string) {
    return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

function StatusBadge({ status }: { status: EnrollmentStatus }) {
    const styles: Record<EnrollmentStatus, string> = {
        PENDING:
            "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400",
        APPROVED:
            "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
        REJECTED:
            "border-red-500/20 bg-red-500/10 text-red-700 dark:text-red-400",
    };

    const Icon =
        status === "PENDING"
            ? Clock3
            : status === "APPROVED"
                ? CheckCircle2
                : XCircle;

    return (
        <span
            className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-medium ${styles[status]}`}
        >
            <Icon className="h-3.5 w-3.5" />
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
        <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${styles[priority]}`}>
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

export default function EnrollmentsApprovalsPage() {
    const [requests, setRequests] =
        useState<EnrollmentRequest[]>(initialRequests);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [semesterFilter, setSemesterFilter] = useState("ALL");
    const [priorityFilter, setPriorityFilter] = useState("ALL");
    const [selectedRequest, setSelectedRequest] =
        useState<EnrollmentRequest | null>(null);
    const [showReviewDialog, setShowReviewDialog] = useState(false);
    const [reviewAction, setReviewAction] =
        useState<"APPROVED" | "REJECTED" | null>(null);
    const [reviewNote, setReviewNote] = useState("");

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

    const semesters = useMemo(
        () => Array.from(new Set(requests.map((item) => item.semester))),
        [requests],
    );

    const filteredRequests = useMemo(() => {
        const query = search.toLowerCase().trim();

        return requests.filter((request) => {
            const matchesSearch =
                !query ||
                request.studentName.toLowerCase().includes(query) ||
                request.studentId.toLowerCase().includes(query) ||
                request.courseName.toLowerCase().includes(query) ||
                request.courseCode.toLowerCase().includes(query) ||
                request.requestNumber.toLowerCase().includes(query);

            const matchesStatus =
                statusFilter === "ALL" || request.status === statusFilter;

            const matchesSemester =
                semesterFilter === "ALL" || request.semester === semesterFilter;

            const matchesPriority =
                priorityFilter === "ALL" || request.priority === priorityFilter;

            return (
                matchesSearch &&
                matchesStatus &&
                matchesSemester &&
                matchesPriority
            );
        });
    }, [requests, search, statusFilter, semesterFilter, priorityFilter]);

    function openReview(
        request: EnrollmentRequest,
        action: "APPROVED" | "REJECTED",
    ) {
        setSelectedRequest(request);
        setReviewAction(action);
        setReviewNote("");
        setShowReviewDialog(true);
    }

    function submitReview() {
        if (!selectedRequest || !reviewAction) return;

        if (reviewAction === "REJECTED" && !reviewNote.trim()) return;

        setRequests((current) =>
            current.map((request) =>
                request.id === selectedRequest.id
                    ? {
                        ...request,
                        status: reviewAction,
                        reviewedBy: "Department Head",
                        reviewNote:
                            reviewNote.trim() ||
                            "Enrollment approved by Department Head.",
                    }
                    : request,
            ),
        );

        setShowReviewDialog(false);
        setSelectedRequest(null);
        setReviewAction(null);
        setReviewNote("");
    }

    function exportCSV() {
        const headers = [
            "Request ID",
            "Student ID",
            "Student Name",
            "Course Code",
            "Course Name",
            "Program",
            "Semester",
            "Credits",
            "Priority",
            "Status",
            "Submitted At",
        ];

        const rows = filteredRequests.map((request) => [
            request.requestNumber,
            request.studentId,
            request.studentName,
            request.courseCode,
            request.courseName,
            request.program,
            request.semester,
            request.creditHours,
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
        link.download = "campusflow-enrollment-approvals.csv";
        link.click();

        URL.revokeObjectURL(url);
    }

    function clearFilters() {
        setSearch("");
        setStatusFilter("ALL");
        setSemesterFilter("ALL");
        setPriorityFilter("ALL");
    }

    return (
        <div className="space-y-6 pb-10 p-4">
            {/* Header */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        Department
                        <span>/</span>
                        <span>Enrollment Approvals</span>
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Enrollment Approvals
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Review student enrollment requests and manage course registration
                        approvals.
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

            {/* Statistics */}
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
                        All enrollment requests
                    </p>
                </div>

                <div className="rounded-xl border bg-card p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">
                            Pending Requests
                        </p>
                        <div className="rounded-lg bg-amber-500/10 p-2 text-amber-600">
                            <Clock3 className="h-5 w-5" />
                        </div>
                    </div>
                    <p className="mt-3 text-3xl font-bold">{stats.pending}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                        Awaiting your review
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
                        Enrollment requests approved
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
                        Enrollment requests rejected
                    </p>
                </div>
            </div>

            {/* High Priority Alert */}
            {stats.highPriority > 0 && (
                <div className="flex flex-col gap-3 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-amber-500/10 p-2 text-amber-600">
                            <AlertTriangle className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="font-semibold">High-priority enrollments need attention</p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                {stats.highPriority} high-priority enrollment request
                                {stats.highPriority > 1 ? "s are" : " is"} waiting for review.
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            setStatusFilter("PENDING");
                            setPriorityFilter("HIGH");
                        }}
                        className="text-left text-sm font-semibold text-amber-700 hover:underline dark:text-amber-400 sm:text-right"
                    >
                        Review now →
                    </button>
                </div>
            )}

            {/* Enrollment Workflow Summary */}
            <div className="rounded-xl border bg-card p-5">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <h2 className="font-semibold">Enrollment Overview</h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Current request processing status.
                        </p>
                    </div>
                    <ClipboardCheck className="h-5 w-5 text-muted-foreground" />
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {[
                        {
                            label: "Pending Review",
                            count: stats.pending,
                            color: "bg-amber-500",
                            text: "text-amber-600",
                        },
                        {
                            label: "Approved",
                            count: stats.approved,
                            color: "bg-emerald-500",
                            text: "text-emerald-600",
                        },
                        {
                            label: "Rejected",
                            count: stats.rejected,
                            color: "bg-red-500",
                            text: "text-red-600",
                        },
                    ].map((item) => (
                        <div key={item.label} className="rounded-lg bg-muted/40 p-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">
                                    {item.label}
                                </span>
                                <span className={`text-xl font-bold ${item.text}`}>
                                    {item.count}
                                </span>
                            </div>
                            <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                                <div
                                    className={`h-full rounded-full ${item.color}`}
                                    style={{
                                        width: `${stats.total > 0 ? (item.count / stats.total) * 100 : 0
                                            }%`,
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Filters and Requests */}
            <div className="overflow-hidden rounded-xl border bg-card">
                <div className="border-b p-4 sm:p-5">
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                        <div>
                            <h2 className="font-semibold">Enrollment Requests</h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Review and process student course enrollment applications.
                            </p>
                        </div>

                        <span className="text-xs text-muted-foreground">
                            {filteredRequests.length} requests found
                        </span>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        <div className="relative sm:col-span-2 xl:col-span-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <input
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Search student or course..."
                                className="h-10 w-full rounded-lg border bg-background pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
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
                            value={semesterFilter}
                            onChange={(event) => setSemesterFilter(event.target.value)}
                            className="h-10 rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
                        >
                            <option value="ALL">All Semesters</option>
                            {semesters.map((semester) => (
                                <option key={semester} value={semester}>
                                    {semester}
                                </option>
                            ))}
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

                    <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Filter className="h-3.5 w-3.5" />
                            Filter enrollment requests
                        </div>
                        <button
                            onClick={clearFilters}
                            className="text-xs font-medium text-primary hover:underline"
                        >
                            Clear filters
                        </button>
                    </div>
                </div>

                {/* Desktop Table */}
                <div className="hidden overflow-x-auto md:block">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
                            <tr>
                                <th className="px-5 py-3 font-medium">Student</th>
                                <th className="px-5 py-3 font-medium">Course</th>
                                <th className="px-5 py-3 font-medium">Semester</th>
                                <th className="px-5 py-3 font-medium">Credits</th>
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
                                        <p className="font-medium">{request.studentName}</p>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            {request.studentId}
                                        </p>
                                    </td>

                                    <td className="px-5 py-4">
                                        <p className="font-medium">{request.courseCode}</p>
                                        <p className="mt-1 max-w-[180px] truncate text-xs text-muted-foreground">
                                            {request.courseName}
                                        </p>
                                    </td>

                                    <td className="px-5 py-4 text-muted-foreground">
                                        {request.semester}
                                    </td>

                                    <td className="px-5 py-4">{request.creditHours}</td>

                                    <td className="px-5 py-4">
                                        <PriorityBadge priority={request.priority} />
                                    </td>

                                    <td className="px-5 py-4">
                                        <StatusBadge status={request.status} />
                                    </td>

                                    <td className="px-5 py-4">
                                        <div className="flex items-center justify-end gap-1">
                                            <button
                                                onClick={() => setSelectedRequest(request)}
                                                title="View details"
                                                className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </button>

                                            {request.status === "PENDING" && (
                                                <>
                                                    <button
                                                        onClick={() => openReview(request, "APPROVED")}
                                                        title="Approve enrollment"
                                                        className="rounded-lg p-2 text-emerald-600 hover:bg-emerald-500/10"
                                                    >
                                                        <Check className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => openReview(request, "REJECTED")}
                                                        title="Reject enrollment"
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
                                    <p className="font-semibold">{request.studentName}</p>
                                    <p className="mt-1 break-all text-xs text-muted-foreground">
                                        {request.studentId}
                                    </p>
                                </div>
                                <StatusBadge status={request.status} />
                            </div>

                            <div className="mt-3 rounded-lg bg-muted/40 p-3">
                                <p className="text-sm font-medium">{request.courseCode}</p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    {request.courseName}
                                </p>
                            </div>

                            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                    <CalendarDays className="h-3.5 w-3.5" />
                                    {request.semester}
                                </span>
                                <span>{request.creditHours} Credits</span>
                                <PriorityBadge priority={request.priority} />
                            </div>

                            <div className="mt-4 flex gap-2 border-t pt-3">
                                <button
                                    onClick={() => setSelectedRequest(request)}
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
                        <h3 className="mt-4 font-semibold">No enrollment requests found</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Try changing your search or filter criteria.
                        </p>
                        <button
                            onClick={clearFilters}
                            className="mt-3 text-sm font-medium text-primary hover:underline"
                        >
                            Reset filters
                        </button>
                    </div>
                )}

                <div className="border-t px-4 py-3 text-xs text-muted-foreground sm:px-5">
                    Showing {filteredRequests.length} of {requests.length} enrollment
                    requests
                </div>
            </div>

            {/* Enrollment Details Dialog */}
            {selectedRequest && !showReviewDialog && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-5"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setSelectedRequest(null);
                        }
                    }}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="enrollment-details-title"
                        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border bg-background shadow-xl"
                    >
                        <div className="flex items-start justify-between border-b p-5">
                            <div>
                                <h2 id="enrollment-details-title" className="text-lg font-bold">
                                    Enrollment Request Details
                                </h2>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {selectedRequest.requestNumber}
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedRequest(null)}
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
                            </div>

                            <div>
                                <p className="text-xs font-medium uppercase text-muted-foreground">
                                    Student Information
                                </p>
                                <h3 className="mt-2 text-xl font-bold">
                                    {selectedRequest.studentName}
                                </h3>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {selectedRequest.studentId}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <div className="rounded-lg border p-3">
                                    <p className="text-xs text-muted-foreground">Email</p>
                                    <p className="mt-2 flex items-center gap-2 break-all text-sm font-medium">
                                        <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
                                        {selectedRequest.email}
                                    </p>
                                </div>

                                <div className="rounded-lg border p-3">
                                    <p className="text-xs text-muted-foreground">Program</p>
                                    <p className="mt-2 flex items-center gap-2 text-sm font-medium">
                                        <Building2 className="h-4 w-4 shrink-0 text-muted-foreground" />
                                        {selectedRequest.program}
                                    </p>
                                </div>

                                <div className="rounded-lg border p-3">
                                    <p className="text-xs text-muted-foreground">Course</p>
                                    <p className="mt-2 flex items-center gap-2 text-sm font-medium">
                                        <BookOpen className="h-4 w-4 shrink-0 text-muted-foreground" />
                                        {selectedRequest.courseCode}
                                    </p>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {selectedRequest.courseName}
                                    </p>
                                </div>

                                <div className="rounded-lg border p-3">
                                    <p className="text-xs text-muted-foreground">Instructor</p>
                                    <p className="mt-2 flex items-center gap-2 text-sm font-medium">
                                        <UserRound className="h-4 w-4 shrink-0 text-muted-foreground" />
                                        {selectedRequest.instructor}
                                    </p>
                                </div>

                                <div className="rounded-lg border p-3">
                                    <p className="text-xs text-muted-foreground">Semester</p>
                                    <p className="mt-2 flex items-center gap-2 text-sm font-medium">
                                        <CalendarDays className="h-4 w-4 shrink-0 text-muted-foreground" />
                                        {selectedRequest.semester}
                                    </p>
                                </div>

                                <div className="rounded-lg border p-3">
                                    <p className="text-xs text-muted-foreground">Credit Hours</p>
                                    <p className="mt-2 flex items-center gap-2 text-sm font-medium">
                                        <GraduationCap className="h-4 w-4 shrink-0 text-muted-foreground" />
                                        {selectedRequest.creditHours} Credits
                                    </p>
                                </div>
                            </div>

                            {/* Eligibility Checks */}
                            <div>
                                <p className="text-sm font-semibold">Eligibility Checks</p>
                                <div className="mt-3 space-y-3 rounded-lg border p-4">
                                    <div className="flex items-center justify-between gap-3">
                                        <div>
                                            <p className="text-sm font-medium">
                                                Prerequisite Requirements
                                            </p>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                Required previous courses completed
                                            </p>
                                        </div>
                                        {selectedRequest.prerequisitesMet ? (
                                            <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                                                <CheckCircle2 className="h-4 w-4" />
                                                Met
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 text-xs font-medium text-red-600">
                                                <XCircle className="h-4 w-4" />
                                                Not Met
                                            </span>
                                        )}
                                    </div>

                                    <div className="border-t pt-3">
                                        <p className="text-sm font-medium">Completed Credits</p>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            {selectedRequest.completedCredits} credits completed
                                        </p>
                                    </div>

                                    <div className="border-t pt-3">
                                        <p className="text-sm font-medium">Requested Course Credits</p>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            {selectedRequest.creditHours} credits
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <p className="text-sm font-semibold">Student's Reason</p>
                                <p className="mt-2 rounded-lg bg-muted/50 p-3 text-sm leading-6 text-muted-foreground">
                                    {selectedRequest.reason}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground">Submitted At</p>
                                <p className="mt-1 text-sm font-medium">
                                    {formatDate(selectedRequest.submittedAt)}
                                </p>
                            </div>

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
                                onClick={() => setSelectedRequest(null)}
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
                                        Approve Enrollment
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Review Confirmation Dialog */}
            {showReviewDialog && selectedRequest && reviewAction && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-3 sm:p-5"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setShowReviewDialog(false);
                            setReviewAction(null);
                        }
                    }}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="review-title"
                        className="w-full max-w-md rounded-xl border bg-background shadow-xl"
                    >
                        <div className="flex items-start justify-between border-b p-5">
                            <div>
                                <h2 id="review-title" className="text-lg font-bold">
                                    {reviewAction === "APPROVED"
                                        ? "Approve Enrollment"
                                        : "Reject Enrollment"}
                                </h2>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {selectedRequest.requestNumber}
                                </p>
                            </div>
                            <button
                                onClick={() => {
                                    setShowReviewDialog(false);
                                    setReviewAction(null);
                                }}
                                className="rounded-lg p-2 text-muted-foreground hover:bg-muted"
                                aria-label="Close review dialog"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="space-y-4 p-5">
                            <div className="rounded-lg bg-muted/50 p-3">
                                <p className="font-medium">{selectedRequest.studentName}</p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    {selectedRequest.courseCode} · {selectedRequest.courseName}
                                </p>
                            </div>

                            {reviewAction === "APPROVED" &&
                                !selectedRequest.prerequisitesMet && (
                                    <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-3 text-sm text-red-600 dark:text-red-400">
                                        This student has not met the prerequisite requirements.
                                        Verify eligibility before approving.
                                    </div>
                                )}

                            <div>
                                <label
                                    htmlFor="review-note"
                                    className="text-sm font-medium"
                                >
                                    Review Note{" "}
                                    {reviewAction === "REJECTED" ? (
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
                                        reviewAction === "APPROVED"
                                            ? "Add an approval note..."
                                            : "Explain why this enrollment is being rejected..."
                                    }
                                    className="mt-2 w-full resize-none rounded-lg border bg-background p-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                                />

                                {reviewAction === "REJECTED" && !reviewNote.trim() && (
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        A rejection reason is required.
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col-reverse gap-2 border-t p-4 sm:flex-row sm:justify-end">
                            <button
                                onClick={() => {
                                    setShowReviewDialog(false);
                                    setReviewAction(null);
                                }}
                                className="h-10 rounded-lg border px-4 text-sm font-medium hover:bg-muted"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={submitReview}
                                disabled={reviewAction === "REJECTED" && !reviewNote.trim()}
                                className={`h-10 rounded-lg px-4 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50 ${reviewAction === "APPROVED"
                                    ? "bg-emerald-600 hover:bg-emerald-700"
                                    : "bg-red-600 hover:bg-red-700"
                                    }`}
                            >
                                {reviewAction === "APPROVED"
                                    ? "Confirm Approval"
                                    : "Confirm Rejection"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
