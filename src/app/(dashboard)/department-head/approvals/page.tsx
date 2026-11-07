// import React from 'react'

// export default function approvals() {
//     return (
//         <div>Approvals & Requests</div>
//     )
// }


















"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
    Search,
    Download,
    Check,
    X,
    Clock3,
    ClipboardCheck,
    CheckCircle2,
    XCircle,
    AlertCircle,
    FileText,
    User,
    CalendarDays,
    GraduationCap,
    BookOpen,
    Filter,
    MoreHorizontal,
    Eye,
    MessageSquare,
    ArrowUpRight,
    RefreshCw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

type RequestStatus = "PENDING" | "APPROVED" | "REJECTED";
type RequestPriority = "HIGH" | "MEDIUM" | "LOW";

type RequestType =
    | "COURSE_REGISTRATION"
    | "LEAVE"
    | "GRADE_CHANGE"
    | "COURSE_WITHDRAWAL"
    | "INSTRUCTOR_REQUEST"
    | "OTHER";

type ApprovalRequest = {
    id: string;
    requestNumber: string;
    title: string;
    description: string;
    type: RequestType;
    requester: string;
    requesterId: string;
    requesterRole: "STUDENT" | "INSTRUCTOR";
    submittedAt: string;
    priority: RequestPriority;
    status: RequestStatus;
    course?: string;
    semester: string;
    comment?: string;
};

const initialRequests: ApprovalRequest[] = [
    {
        id: "1",
        requestNumber: "APR-2026-001",
        title: "Course Registration Request",
        description:
            "Requesting permission to register for Advanced Database Systems after the registration deadline.",
        type: "COURSE_REGISTRATION",
        requester: "Rahim Ahmed",
        requesterId: "STU-2026-CSE-0001",
        requesterRole: "STUDENT",
        submittedAt: "2026-11-06",
        priority: "HIGH",
        status: "PENDING",
        course: "CSE-501",
        semester: "Fall 2026",
    },
    {
        id: "2",
        requestNumber: "APR-2026-002",
        title: "Student Leave Application",
        description:
            "Requesting academic leave for three days due to a family emergency.",
        type: "LEAVE",
        requester: "Nusrat Jahan",
        requesterId: "STU-2026-CSE-0002",
        requesterRole: "STUDENT",
        submittedAt: "2026-11-05",
        priority: "MEDIUM",
        status: "PENDING",
        semester: "Fall 2026",
    },
    {
        id: "3",
        requestNumber: "APR-2026-003",
        title: "Grade Correction Request",
        description:
            "Requesting a review of the published marks for Data Structures Midterm.",
        type: "GRADE_CHANGE",
        requester: "Tanvir Hossain",
        requesterId: "STU-2026-CSE-0003",
        requesterRole: "STUDENT",
        submittedAt: "2026-11-04",
        priority: "HIGH",
        status: "PENDING",
        course: "CSE-201",
        semester: "Fall 2026",
    },
    {
        id: "4",
        requestNumber: "APR-2026-004",
        title: "Course Withdrawal",
        description:
            "Requesting withdrawal from the Computer Networks course.",
        type: "COURSE_WITHDRAWAL",
        requester: "Sadia Islam",
        requesterId: "STU-2026-CSE-0004",
        requesterRole: "STUDENT",
        submittedAt: "2026-11-03",
        priority: "LOW",
        status: "APPROVED",
        course: "CSE-401",
        semester: "Fall 2026",
        comment: "Approved after reviewing the academic record.",
    },
    {
        id: "5",
        requestNumber: "APR-2026-005",
        title: "Additional Lab Session",
        description:
            "Requesting approval to arrange an additional programming laboratory session.",
        type: "INSTRUCTOR_REQUEST",
        requester: "Dr. Rahman",
        requesterId: "INS-2026-001",
        requesterRole: "INSTRUCTOR",
        submittedAt: "2026-11-02",
        priority: "MEDIUM",
        status: "PENDING",
        course: "CSE-101",
        semester: "Fall 2026",
    },
    {
        id: "6",
        requestNumber: "APR-2026-006",
        title: "Course Registration Request",
        description:
            "Requesting an additional course registration due to a prerequisite equivalency.",
        type: "COURSE_REGISTRATION",
        requester: "Imran Hossain",
        requesterId: "STU-2026-CSE-0005",
        requesterRole: "STUDENT",
        submittedAt: "2026-10-30",
        priority: "MEDIUM",
        status: "REJECTED",
        course: "CSE-301",
        semester: "Fall 2026",
        comment: "Prerequisite requirements were not fulfilled.",
    },
    {
        id: "7",
        requestNumber: "APR-2026-007",
        title: "Research Supervision Request",
        description:
            "Requesting department approval for a new undergraduate research project.",
        type: "OTHER",
        requester: "Prof. Karim",
        requesterId: "INS-2026-002",
        requesterRole: "INSTRUCTOR",
        submittedAt: "2026-10-29",
        priority: "LOW",
        status: "PENDING",
        semester: "Fall 2026",
    },
];

const requestTypeLabels: Record<RequestType, string> = {
    COURSE_REGISTRATION: "Course Registration",
    LEAVE: "Leave Application",
    GRADE_CHANGE: "Grade Correction",
    COURSE_WITHDRAWAL: "Course Withdrawal",
    INSTRUCTOR_REQUEST: "Instructor Request",
    OTHER: "Other Request",
};

const statusConfig: Record<
    RequestStatus,
    { label: string; className: string }
> = {
    PENDING: {
        label: "Pending",
        className: "border-amber-500/20 bg-amber-500/10 text-amber-600",
    },
    APPROVED: {
        label: "Approved",
        className: "border-green-500/20 bg-green-500/10 text-green-600",
    },
    REJECTED: {
        label: "Rejected",
        className: "border-red-500/20 bg-red-500/10 text-red-600",
    },
};

const priorityConfig: Record<
    RequestPriority,
    { label: string; className: string }
> = {
    HIGH: {
        label: "High",
        className: "bg-red-500/10 text-red-600",
    },
    MEDIUM: {
        label: "Medium",
        className: "bg-amber-500/10 text-amber-600",
    },
    LOW: {
        label: "Low",
        className: "bg-muted text-muted-foreground",
    },
};

function formatDate(date: string) {
    return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

function StatusBadge({ status }: { status: RequestStatus }) {
    return (
        <Badge variant="outline" className={statusConfig[status].className}>
            {statusConfig[status].label}
        </Badge>
    );
}

function PriorityBadge({ priority }: { priority: RequestPriority }) {
    return (
        <Badge variant="secondary" className={priorityConfig[priority].className}>
            {priorityConfig[priority].label}
        </Badge>
    );
}

function StatCard({
    title,
    value,
    description,
    icon: Icon,
}: {
    title: string;
    value: number;
    description: string;
    icon: React.ElementType;
}) {
    return (
        <Card className="shadow-none">
            <CardContent className="flex items-center justify-between gap-3 p-5">
                <div>
                    <p className="text-sm text-muted-foreground">{title}</p>
                    <h3 className="mt-2 text-2xl font-bold tracking-tight">{value}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{description}</p>
                </div>
                <div className="rounded-xl bg-primary/10 p-3 text-primary">
                    <Icon className="h-5 w-5" />
                </div>
            </CardContent>
        </Card>
    );
}

export default function ApprovalsPage() {
    const [requests, setRequests] = useState(initialRequests);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [typeFilter, setTypeFilter] = useState("ALL");
    const [priorityFilter, setPriorityFilter] = useState("ALL");

    const [selectedRequest, setSelectedRequest] =
        useState<ApprovalRequest | null>(null);

    const [dialogMode, setDialogMode] = useState<
        "VIEW" | "APPROVE" | "REJECT" | null
    >(null);

    const [reviewComment, setReviewComment] = useState("");

    const filteredRequests = useMemo(() => {
        return requests.filter((request) => {
            const searchMatch = [
                request.requestNumber,
                request.title,
                request.requester,
                request.requesterId,
                request.description,
                request.course ?? "",
            ]
                .join(" ")
                .toLowerCase()
                .includes(search.toLowerCase());

            const statusMatch =
                statusFilter === "ALL" || request.status === statusFilter;

            const typeMatch =
                typeFilter === "ALL" || request.type === typeFilter;

            const priorityMatch =
                priorityFilter === "ALL" || request.priority === priorityFilter;

            return searchMatch && statusMatch && typeMatch && priorityMatch;
        });
    }, [requests, search, statusFilter, typeFilter, priorityFilter]);

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

    const openDialog = (
        request: ApprovalRequest,
        mode: "VIEW" | "APPROVE" | "REJECT",
    ) => {
        setSelectedRequest(request);
        setDialogMode(mode);
        setReviewComment(request.comment ?? "");
    };

    const closeDialog = () => {
        setSelectedRequest(null);
        setDialogMode(null);
        setReviewComment("");
    };

    const handleDecision = () => {
        if (!selectedRequest || !dialogMode || dialogMode === "VIEW") return;

        const nextStatus: RequestStatus =
            dialogMode === "APPROVE" ? "APPROVED" : "REJECTED";

        if (nextStatus === "REJECTED" && !reviewComment.trim()) {
            return;
        }

        setRequests((current) =>
            current.map((request) =>
                request.id === selectedRequest.id
                    ? {
                        ...request,
                        status: nextStatus,
                        comment: reviewComment.trim() || undefined,
                    }
                    : request,
            ),
        );

        closeDialog();
    };

    const exportCSV = () => {
        const headers = [
            "Request ID",
            "Title",
            "Type",
            "Requester",
            "Requester ID",
            "Role",
            "Submitted At",
            "Priority",
            "Status",
            "Course",
            "Semester",
            "Review Comment",
        ];

        const rows = filteredRequests.map((request) => [
            request.requestNumber,
            request.title,
            requestTypeLabels[request.type],
            request.requester,
            request.requesterId,
            request.requesterRole,
            request.submittedAt,
            request.priority,
            request.status,
            request.course ?? "",
            request.semester,
            request.comment ?? "",
        ]);

        const csv = [headers, ...rows]
            .map((row) =>
                row
                    .map((value) => `"${String(value).replace(/"/g, '""')}"`)
                    .join(","),
            )
            .join("\n");

        const blob = new Blob(["\uFEFF" + csv], {
            type: "text/csv;charset=utf-8;",
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = "campusflow-approvals.csv";
        link.click();

        URL.revokeObjectURL(url);
    };

    const resetFilters = () => {
        setSearch("");
        setStatusFilter("ALL");
        setTypeFilter("ALL");
        setPriorityFilter("ALL");
    };

    return (
        <div className="space-y-6 p-4 md:p-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        <Link
                            href="/department-head"
                            className="transition-colors hover:text-primary"
                        >
                            Dashboard
                        </Link>
                        <span>/</span>
                        <span className="text-foreground">Approvals & Requests</span>
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                        Approvals & Requests
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        Review, approve, and manage academic requests from students and
                        instructors.
                    </p>
                </div>

                <Button variant="outline" onClick={exportCSV}>
                    <Download className="mr-2 h-4 w-4" />
                    Export Requests
                </Button>
            </div>

            {/* Statistics */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    title="Total Requests"
                    value={stats.total}
                    description="All submitted requests"
                    icon={ClipboardCheck}
                />
                <StatCard
                    title="Pending Requests"
                    value={stats.pending}
                    description="Waiting for your review"
                    icon={Clock3}
                />
                <StatCard
                    title="Approved"
                    value={stats.approved}
                    description="Successfully approved"
                    icon={CheckCircle2}
                />
                <StatCard
                    title="Rejected"
                    value={stats.rejected}
                    description="Requests not approved"
                    icon={XCircle}
                />
            </div>

            {/* Pending attention */}
            {stats.highPriority > 0 && (
                <Card className="border-amber-500/30 bg-amber-500/5 shadow-none">
                    <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-start gap-3">
                            <div className="rounded-lg bg-amber-500/10 p-2 text-amber-600">
                                <AlertCircle className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-semibold">
                                    High-priority requests need attention
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {stats.highPriority} high-priority{" "}
                                    {stats.highPriority === 1 ? "request is" : "requests are"}{" "}
                                    waiting for review.
                                </p>
                            </div>
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                setStatusFilter("PENDING");
                                setPriorityFilter("HIGH");
                            }}
                        >
                            Review requests
                            <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Button>
                    </CardContent>
                </Card>
            )}

            {/* Request type overview */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {(
                    [
                        {
                            type: "COURSE_REGISTRATION",
                            icon: BookOpen,
                        },
                        {
                            type: "LEAVE",
                            icon: CalendarDays,
                        },
                        {
                            type: "GRADE_CHANGE",
                            icon: GraduationCap,
                        },
                    ] as const
                ).map(({ type, icon: Icon }) => {
                    const count = requests.filter(
                        (request) => request.type === type,
                    ).length;

                    return (
                        <Card key={type} className="shadow-none">
                            <CardContent className="flex items-center justify-between p-4">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-lg bg-primary/10 p-2 text-primary">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">
                                            {requestTypeLabels[type]}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Request category
                                        </p>
                                    </div>
                                </div>
                                <span className="text-xl font-bold">{count}</span>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Filters */}
            <Card className="shadow-none">
                <CardContent className="p-4">
                    <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search request, requester, ID, or course..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-9"
                            />
                        </div>

                        <div className="grid gap-3 sm:grid-cols-3 xl:w-auto">
                            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value ?? "ALL")}>
                                <SelectTrigger className="w-full sm:w-[145px]">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ALL">All Status</SelectItem>
                                    <SelectItem value="PENDING">Pending</SelectItem>
                                    <SelectItem value="APPROVED">Approved</SelectItem>
                                    <SelectItem value="REJECTED">Rejected</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value ?? "ALL")}>
                                <SelectTrigger className="w-full sm:w-[165px]">
                                    <SelectValue placeholder="Request Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ALL">All Types</SelectItem>
                                    {Object.entries(requestTypeLabels).map(([value, label]) => (
                                        <SelectItem key={value} value={value}>
                                            {label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select
                                value={priorityFilter}
                                onValueChange={(value) => setPriorityFilter(value ?? "ALL")}
                            >
                                <SelectTrigger className="w-full sm:w-[145px]">
                                    <SelectValue placeholder="Priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ALL">All Priorities</SelectItem>
                                    <SelectItem value="HIGH">High</SelectItem>
                                    <SelectItem value="MEDIUM">Medium</SelectItem>
                                    <SelectItem value="LOW">Low</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                            Showing {filteredRequests.length} of {requests.length} requests
                        </span>

                        {(search ||
                            statusFilter !== "ALL" ||
                            typeFilter !== "ALL" ||
                            priorityFilter !== "ALL") && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 px-2"
                                    onClick={resetFilters}
                                >
                                    <XCircle className="mr-1 h-3.5 w-3.5" />
                                    Clear filters
                                </Button>
                            )}
                    </div>
                </CardContent>
            </Card>

            {/* Desktop Table */}
            <Card className="hidden shadow-none md:block">
                <CardHeader>
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <CardTitle className="text-base">Request Management</CardTitle>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Review submitted academic requests and take action.
                            </p>
                        </div>
                        <Badge variant="secondary">
                            {filteredRequests.length} Records
                        </Badge>
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b text-left text-muted-foreground">
                                    <th className="px-3 py-3 font-medium">Request</th>
                                    <th className="px-3 py-3 font-medium">Requester</th>
                                    <th className="px-3 py-3 font-medium">Submitted</th>
                                    <th className="px-3 py-3 font-medium">Priority</th>
                                    <th className="px-3 py-3 font-medium">Status</th>
                                    <th className="px-3 py-3 text-right font-medium">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredRequests.map((request) => (
                                    <tr
                                        key={request.id}
                                        className="border-b last:border-0 transition-colors hover:bg-muted/40"
                                    >
                                        <td className="px-3 py-4">
                                            <p className="font-medium">{request.title}</p>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {request.requestNumber}
                                            </p>
                                            <div className="mt-2 flex flex-wrap items-center gap-2">
                                                <Badge variant="outline" className="text-[10px]">
                                                    {requestTypeLabels[request.type]}
                                                </Badge>
                                                {request.course && (
                                                    <span className="text-[10px] text-muted-foreground">
                                                        {request.course}
                                                    </span>
                                                )}
                                            </div>
                                        </td>

                                        <td className="px-3 py-4">
                                            <p className="font-medium">{request.requester}</p>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {request.requesterId}
                                            </p>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {request.requesterRole === "STUDENT"
                                                    ? "Student"
                                                    : "Instructor"}
                                            </p>
                                        </td>

                                        <td className="px-3 py-4">
                                            <div className="flex items-center gap-2">
                                                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                                                {formatDate(request.submittedAt)}
                                            </div>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {request.semester}
                                            </p>
                                        </td>

                                        <td className="px-3 py-4">
                                            <PriorityBadge priority={request.priority} />
                                        </td>

                                        <td className="px-3 py-4">
                                            <StatusBadge status={request.status} />
                                        </td>

                                        <td className="px-3 py-4 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger render={<Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>}>

                                                </DropdownMenuTrigger>

                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem
                                                        onSelect={() => openDialog(request, "VIEW")}
                                                    >
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        View Details
                                                    </DropdownMenuItem>

                                                    {request.status === "PENDING" && (
                                                        <>
                                                            <DropdownMenuItem
                                                                onSelect={() => openDialog(request, "APPROVE")}
                                                            >
                                                                <Check className="mr-2 h-4 w-4" />
                                                                Approve
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onSelect={() => openDialog(request, "REJECT")}
                                                                className="text-red-600 focus:text-red-600"
                                                            >
                                                                <X className="mr-2 h-4 w-4" />
                                                                Reject
                                                            </DropdownMenuItem>
                                                        </>
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {filteredRequests.length === 0 && (
                            <div className="py-12 text-center">
                                <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground" />
                                <p className="mt-3 font-medium">No requests found</p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Try changing your search or filter criteria.
                                </p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Mobile Cards */}
            <div className="space-y-3 md:hidden">
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold">Submitted Requests</h2>
                    <Badge variant="secondary">
                        {filteredRequests.length} Records
                    </Badge>
                </div>

                {filteredRequests.map((request) => (
                    <Card key={request.id} className="shadow-none">
                        <CardContent className="space-y-3 p-4">
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <h3 className="font-semibold">{request.title}</h3>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {request.requestNumber}
                                    </p>
                                </div>
                                <StatusBadge status={request.status} />
                            </div>

                            <Badge variant="outline">
                                {requestTypeLabels[request.type]}
                            </Badge>

                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <p className="text-xs text-muted-foreground">Requester</p>
                                    <p className="mt-1 font-medium">{request.requester}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {request.requesterRole === "STUDENT"
                                            ? "Student"
                                            : "Instructor"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-muted-foreground">Submitted</p>
                                    <p className="mt-1">{formatDate(request.submittedAt)}</p>
                                </div>

                                <div>
                                    <p className="text-xs text-muted-foreground">Priority</p>
                                    <div className="mt-1">
                                        <PriorityBadge priority={request.priority} />
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs text-muted-foreground">Course</p>
                                    <p className="mt-1">{request.course ?? "Not applicable"}</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap justify-end gap-2 border-t pt-3">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => openDialog(request, "VIEW")}
                                >
                                    <Eye className="mr-1.5 h-3.5 w-3.5" />
                                    Details
                                </Button>

                                {request.status === "PENDING" && (
                                    <>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="text-green-600 hover:text-green-700"
                                            onClick={() => openDialog(request, "APPROVE")}
                                        >
                                            <Check className="mr-1 h-3.5 w-3.5" />
                                            Approve
                                        </Button>

                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="text-red-600 hover:text-red-700"
                                            onClick={() => openDialog(request, "REJECT")}
                                        >
                                            <X className="mr-1 h-3.5 w-3.5" />
                                            Reject
                                        </Button>
                                    </>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {filteredRequests.length === 0 && (
                    <Card className="shadow-none">
                        <CardContent className="py-10 text-center">
                            <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground" />
                            <p className="mt-3 font-medium">No requests found</p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Try changing your filters.
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Request Details / Decision Dialog */}
            <Dialog
                open={dialogMode !== null}
                onOpenChange={(open) => {
                    if (!open) closeDialog();
                }}
            >
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
                    {selectedRequest && (
                        <>
                            <DialogHeader>
                                <DialogTitle>
                                    {dialogMode === "VIEW"
                                        ? "Request Details"
                                        : dialogMode === "APPROVE"
                                            ? "Approve Request"
                                            : "Reject Request"}
                                </DialogTitle>
                                <DialogDescription>
                                    {selectedRequest.requestNumber} ·{" "}
                                    {requestTypeLabels[selectedRequest.type]}
                                </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-4">
                                <div className="rounded-lg border p-4">
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <h3 className="font-semibold">
                                            {selectedRequest.title}
                                        </h3>
                                        <StatusBadge status={selectedRequest.status} />
                                    </div>
                                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                                        {selectedRequest.description}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-xs text-muted-foreground">Requester</p>
                                        <p className="mt-1 font-medium">
                                            {selectedRequest.requester}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {selectedRequest.requesterId}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-muted-foreground">Role</p>
                                        <p className="mt-1 font-medium">
                                            {selectedRequest.requesterRole === "STUDENT"
                                                ? "Student"
                                                : "Instructor"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-muted-foreground">Submitted</p>
                                        <p className="mt-1 font-medium">
                                            {formatDate(selectedRequest.submittedAt)}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-muted-foreground">Priority</p>
                                        <div className="mt-1">
                                            <PriorityBadge priority={selectedRequest.priority} />
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-xs text-muted-foreground">Course</p>
                                        <p className="mt-1 font-medium">
                                            {selectedRequest.course ?? "Not applicable"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-muted-foreground">Semester</p>
                                        <p className="mt-1 font-medium">
                                            {selectedRequest.semester}
                                        </p>
                                    </div>
                                </div>

                                {dialogMode !== "VIEW" && (
                                    <div className="space-y-2">
                                        <Label htmlFor="review-comment">
                                            Review comment{" "}
                                            {dialogMode === "REJECT" && (
                                                <span className="text-red-500">*</span>
                                            )}
                                        </Label>
                                        <Textarea
                                            id="review-comment"
                                            placeholder={
                                                dialogMode === "APPROVE"
                                                    ? "Add an optional approval note..."
                                                    : "Explain why this request is being rejected..."
                                            }
                                            value={reviewComment}
                                            onChange={(e) => setReviewComment(e.target.value)}
                                            rows={3}
                                        />
                                        {dialogMode === "REJECT" && (
                                            <p className="text-xs text-muted-foreground">
                                                A reason is required when rejecting a request.
                                            </p>
                                        )}
                                    </div>
                                )}

                                {dialogMode === "VIEW" && selectedRequest.comment && (
                                    <div className="rounded-lg bg-muted/50 p-3">
                                        <p className="text-xs font-medium">Previous review note</p>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {selectedRequest.comment}
                                        </p>
                                    </div>
                                )}
                            </div>

                            <DialogFooter className="flex-col gap-2 sm:flex-row">
                                <Button variant="outline" onClick={closeDialog}>
                                    {dialogMode === "VIEW" ? "Close" : "Cancel"}
                                </Button>

                                {dialogMode === "APPROVE" && (
                                    <Button
                                        onClick={handleDecision}
                                        className="bg-green-600 text-white hover:bg-green-700"
                                    >
                                        <Check className="mr-2 h-4 w-4" />
                                        Confirm Approval
                                    </Button>
                                )}

                                {dialogMode === "REJECT" && (
                                    <Button
                                        variant="destructive"
                                        onClick={handleDecision}
                                        disabled={!reviewComment.trim()}
                                    >
                                        <X className="mr-2 h-4 w-4" />
                                        Confirm Rejection
                                    </Button>
                                )}
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
