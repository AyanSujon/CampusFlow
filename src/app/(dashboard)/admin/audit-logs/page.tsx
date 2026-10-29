// import React from 'react'

// export default function auditLogs() {
//   return (
//     <div>audit-logs</div>
//   )
// }



















"use client";

import { useMemo, useState } from "react";
import {
    Activity,
    AlertTriangle,
    ArrowDownToLine,
    CalendarDays,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    ClipboardList,
    Eye,
    FileText,
    Filter,
    KeyRound,
    RefreshCw,
    Search,
    ShieldCheck,
    Trash2,
    UserCog,
    X,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

type AuditAction =
    | "CREATE"
    | "UPDATE"
    | "DELETE"
    | "LOGIN"
    | "LOGOUT"
    | "PERMISSION_CHANGE";

type AuditCategory =
    | "Authentication"
    | "User Management"
    | "Academic"
    | "Finance"
    | "System";

type AuditLog = {
    id: string;
    action: AuditAction;
    category: AuditCategory;
    description: string;
    user: string;
    email: string;
    role: string;
    target: string;
    ipAddress: string;
    timestamp: string;
    status: "Success" | "Failed";
    details: string;
};

const initialLogs: AuditLog[] = [
    {
        id: "AUD-1008",
        action: "LOGIN",
        category: "Authentication",
        description: "Administrator signed in",
        user: "Ayan Sujon",
        email: "ayan@example.com",
        role: "SUPER_ADMIN",
        target: "Admin dashboard",
        ipAddress: "103.120.45.21",
        timestamp: "2026-10-29T09:42:00",
        status: "Success",
        details: "The administrator successfully signed in to the CampusFlow UMS dashboard.",
    },
    {
        id: "AUD-1007",
        action: "UPDATE",
        category: "Academic",
        description: "Updated Computer Science department",
        user: "Nusrat Jahan",
        email: "nusrat@example.com",
        role: "ADMIN",
        target: "Department: Computer Science",
        ipAddress: "103.120.45.32",
        timestamp: "2026-10-29T09:18:00",
        status: "Success",
        details: "Department information was updated, including its contact and administrative details.",
    },
    {
        id: "AUD-1006",
        action: "CREATE",
        category: "User Management",
        description: "Created a new instructor account",
        user: "Ayan Sujon",
        email: "ayan@example.com",
        role: "SUPER_ADMIN",
        target: "Instructor: Mahmud Hasan",
        ipAddress: "103.120.45.21",
        timestamp: "2026-10-29T08:56:00",
        status: "Success",
        details: "A new instructor account was created. The account is awaiting verification.",
    },
    {
        id: "AUD-1005",
        action: "PERMISSION_CHANGE",
        category: "System",
        description: "Changed role permissions",
        user: "Ayan Sujon",
        email: "ayan@example.com",
        role: "SUPER_ADMIN",
        target: "Role: DEPARTMENT_HEAD",
        ipAddress: "103.120.45.21",
        timestamp: "2026-10-29T08:31:00",
        status: "Success",
        details: "Permissions associated with the DEPARTMENT_HEAD role were modified.",
    },
    {
        id: "AUD-1004",
        action: "LOGIN",
        category: "Authentication",
        description: "Failed login attempt",
        user: "Unknown User",
        email: "unknown@example.com",
        role: "Unknown",
        target: "Admin dashboard",
        ipAddress: "185.199.110.18",
        timestamp: "2026-10-29T08:12:00",
        status: "Failed",
        details: "The sign-in attempt failed. Review authentication server records for the underlying reason.",
    },
    {
        id: "AUD-1003",
        action: "UPDATE",
        category: "Finance",
        description: "Updated tuition fee configuration",
        user: "Karim Ahmed",
        email: "karim@example.com",
        role: "ACCOUNTANT",
        target: "Tuition fee settings",
        ipAddress: "103.120.45.45",
        timestamp: "2026-10-28T16:44:00",
        status: "Success",
        details: "Tuition fee configuration was updated. Verify the associated financial record for the full change history.",
    },
    {
        id: "AUD-1002",
        action: "DELETE",
        category: "User Management",
        description: "Removed a pending user invitation",
        user: "Nusrat Jahan",
        email: "nusrat@example.com",
        role: "ADMIN",
        target: "Invitation: INV-204",
        ipAddress: "103.120.45.32",
        timestamp: "2026-10-28T15:22:00",
        status: "Success",
        details: "A pending invitation was removed from the user management system.",
    },
    {
        id: "AUD-1001",
        action: "LOGOUT",
        category: "Authentication",
        description: "User signed out",
        user: "Mahmud Hasan",
        email: "mahmud@example.com",
        role: "INSTRUCTOR",
        target: "Instructor dashboard",
        ipAddress: "103.120.45.61",
        timestamp: "2026-10-28T14:05:00",
        status: "Success",
        details: "The user ended the current session by signing out.",
    },
];

const actionStyles: Record<AuditAction, string> = {
    CREATE: "border-emerald-200 bg-emerald-50 text-emerald-700",
    UPDATE: "border-blue-200 bg-blue-50 text-blue-700",
    DELETE: "border-red-200 bg-red-50 text-red-700",
    LOGIN: "border-violet-200 bg-violet-50 text-violet-700",
    LOGOUT: "border-slate-200 bg-slate-100 text-slate-700",
    PERMISSION_CHANGE: "border-amber-200 bg-amber-50 text-amber-700",
};

const actionIcons: Record<AuditAction, typeof Activity> = {
    CREATE: FileText,
    UPDATE: RefreshCw,
    DELETE: Trash2,
    LOGIN: KeyRound,
    LOGOUT: Activity,
    PERMISSION_CHANGE: ShieldCheck,
};

function formatDateTime(value: string) {
    return new Date(value).toLocaleString("en-BD", {
        dateStyle: "medium",
        timeStyle: "short",
    });
}

function formatAction(action: AuditAction) {
    return action.replaceAll("_", " ");
}

export default function AuditLogsPage() {
    const [logs, setLogs] = useState(initialLogs);
    const [search, setSearch] = useState("");
    const [actionFilter, setActionFilter] = useState("ALL");
    const [categoryFilter, setCategoryFilter] = useState("ALL");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [dateFilter, setDateFilter] = useState("");
    const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
    const [page, setPage] = useState(1);

    const pageSize = 6;

    const filteredLogs = useMemo(() => {
        const query = search.trim().toLowerCase();

        return logs.filter((log) => {
            const matchesSearch =
                !query ||
                [
                    log.id,
                    log.description,
                    log.user,
                    log.email,
                    log.target,
                    log.ipAddress,
                    log.role,
                ].some((value) => value.toLowerCase().includes(query));

            const matchesAction =
                actionFilter === "ALL" || log.action === actionFilter;
            const matchesCategory =
                categoryFilter === "ALL" || log.category === categoryFilter;
            const matchesStatus =
                statusFilter === "ALL" || log.status === statusFilter;
            const matchesDate =
                !dateFilter || log.timestamp.slice(0, 10) === dateFilter;

            return (
                matchesSearch &&
                matchesAction &&
                matchesCategory &&
                matchesStatus &&
                matchesDate
            );
        });
    }, [logs, search, actionFilter, categoryFilter, statusFilter, dateFilter]);

    const totalPages = Math.max(1, Math.ceil(filteredLogs.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const paginatedLogs = filteredLogs.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize,
    );

    const successfulCount = logs.filter(
        (log) => log.status === "Success",
    ).length;
    const failedCount = logs.filter((log) => log.status === "Failed").length;
    const todayCount = logs.filter(
        (log) => log.timestamp.slice(0, 10) === "2026-10-29",
    ).length;

    function resetFilters() {
        setSearch("");
        setActionFilter("ALL");
        setCategoryFilter("ALL");
        setStatusFilter("ALL");
        setDateFilter("");
        setPage(1);
    }

    function exportCsv() {
        const headers = [
            "Log ID",
            "Timestamp",
            "Action",
            "Category",
            "Description",
            "User",
            "Email",
            "Role",
            "Target",
            "IP Address",
            "Status",
            "Details",
        ];

        const rows = filteredLogs.map((log) => [
            log.id,
            log.timestamp,
            log.action,
            log.category,
            log.description,
            log.user,
            log.email,
            log.role,
            log.target,
            log.ipAddress,
            log.status,
            log.details,
        ]);

        const escapeCsv = (value: string) =>
            `"${value.replaceAll('"', '""')}"`;

        const csv = [headers, ...rows]
            .map((row) => row.map(escapeCsv).join(","))
            .join("\n");

        const blob = new Blob(["\uFEFF" + csv], {
            type: "text/csv;charset=utf-8;",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = `campusflow-audit-logs-${new Date()
            .toISOString()
            .slice(0, 10)}.csv`;

        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    }

    return (
        <div className="w-full min-w-0 space-y-6 overflow-x-clip pb-8 p-4">
            {/* Page header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-start gap-3">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                        <ClipboardList className="size-5" />
                    </div>
                    <div className="min-w-0">
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                            Audit Logs
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Track administrative activity and security-related events.
                        </p>
                    </div>
                </div>

                <Button
                    onClick={exportCsv}
                    className="w-full shrink-0 gap-2 sm:w-auto"
                    variant="outline"
                >
                    <ArrowDownToLine className="size-4" />
                    Export CSV
                </Button>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <Card className="min-w-0">
                    <CardContent className="flex items-center justify-between gap-3 p-5">
                        <div className="min-w-0">
                            <p className="text-sm font-medium text-muted-foreground">
                                Total Events
                            </p>
                            <p className="mt-2 text-2xl font-bold">{logs.length}</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Recorded activities
                            </p>
                        </div>
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                            <Activity className="size-5" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="min-w-0">
                    <CardContent className="flex items-center justify-between gap-3 p-5">
                        <div className="min-w-0">
                            <p className="text-sm font-medium text-muted-foreground">
                                Today's Events
                            </p>
                            <p className="mt-2 text-2xl font-bold">{todayCount}</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Based on sample log dates
                            </p>
                        </div>
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                            <CalendarDays className="size-5" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="min-w-0">
                    <CardContent className="flex items-center justify-between gap-3 p-5">
                        <div className="min-w-0">
                            <p className="text-sm font-medium text-muted-foreground">
                                Successful
                            </p>
                            <p className="mt-2 text-2xl font-bold">{successfulCount}</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Completed events
                            </p>
                        </div>
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                            <CheckCircle2 className="size-5" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="min-w-0">
                    <CardContent className="flex items-center justify-between gap-3 p-5">
                        <div className="min-w-0">
                            <p className="text-sm font-medium text-muted-foreground">
                                Failed Events
                            </p>
                            <p className="mt-2 text-2xl font-bold">{failedCount}</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Require investigation
                            </p>
                        </div>
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-700">
                            <AlertTriangle className="size-5" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <Card className="min-w-0">
                <CardHeader className="pb-4">
                    <div className="flex items-center gap-2">
                        <Filter className="size-4 text-muted-foreground" />
                        <CardTitle className="text-base">Filter Activity</CardTitle>
                    </div>
                    <CardDescription>
                        Search and narrow down recorded events.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            value={search}
                            onChange={(event) => {
                                setSearch(event.target.value);
                                setPage(1);
                            }}
                            placeholder="Search by user, event, log ID, target, or IP..."
                            className="pl-9"
                            aria-label="Search audit logs"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        <Select
                            value={actionFilter}
                            onValueChange={(value) => {
                                setActionFilter(value ?? "ALL");
                                setPage(1);
                            }}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="All actions" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All actions</SelectItem>
                                <SelectItem value="CREATE">Create</SelectItem>
                                <SelectItem value="UPDATE">Update</SelectItem>
                                <SelectItem value="DELETE">Delete</SelectItem>
                                <SelectItem value="LOGIN">Login</SelectItem>
                                <SelectItem value="LOGOUT">Logout</SelectItem>
                                <SelectItem value="PERMISSION_CHANGE">
                                    Permission change
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        <Select
                            value={categoryFilter}
                            onValueChange={(value) => {
                                setCategoryFilter(value ?? "ALL");
                                setPage(1);
                            }}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="All categories" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All categories</SelectItem>
                                <SelectItem value="Authentication">Authentication</SelectItem>
                                <SelectItem value="User Management">
                                    User Management
                                </SelectItem>
                                <SelectItem value="Academic">Academic</SelectItem>
                                <SelectItem value="Finance">Finance</SelectItem>
                                <SelectItem value="System">System</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select
                            value={statusFilter}
                            onValueChange={(value) => {
                                setStatusFilter(value ?? "ALL");
                                setPage(1);
                            }}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="All statuses" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All statuses</SelectItem>
                                <SelectItem value="Success">Success</SelectItem>
                                <SelectItem value="Failed">Failed</SelectItem>
                            </SelectContent>
                        </Select>

                        <Input
                            type="date"
                            value={dateFilter}
                            onChange={(event) => {
                                setDateFilter(event.target.value);
                                setPage(1);
                            }}
                            aria-label="Filter by date"
                            className="w-full"
                        />
                    </div>

                    <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-muted-foreground">
                            Showing{" "}
                            <span className="font-medium text-foreground">
                                {filteredLogs.length}
                            </span>{" "}
                            of {logs.length} events
                        </p>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={resetFilters}
                            className="w-full gap-2 sm:w-auto"
                        >
                            <X className="size-4" />
                            Clear filters
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Audit log list */}
            <Card className="min-w-0 overflow-hidden">
                <CardHeader>
                    <CardTitle className="text-base">Activity History</CardTitle>
                    <CardDescription>
                        Review event details and identify unusual activity.
                    </CardDescription>
                </CardHeader>

                <CardContent className="p-0">
                    {paginatedLogs.length === 0 ? (
                        <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
                            <div className="flex size-12 items-center justify-center rounded-full bg-slate-100">
                                <Search className="size-5 text-slate-500" />
                            </div>
                            <h3 className="mt-4 font-semibold">No audit logs found</h3>
                            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                                Try adjusting your search or filters to find the events you
                                are looking for.
                            </p>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={resetFilters}
                                className="mt-4"
                            >
                                Clear filters
                            </Button>
                        </div>
                    ) : (
                        <div className="divide-y">
                            {paginatedLogs.map((log) => {
                                const ActionIcon = actionIcons[log.action];

                                return (
                                    <div
                                        key={log.id}
                                        className="flex min-w-0 flex-col gap-3 p-4 transition-colors hover:hover:bg-accent/5 sm:p-5"
                                    >
                                        <div className="flex min-w-0 items-start gap-3">
                                            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-white text-slate-600">
                                                <ActionIcon className="size-4" />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <p className="break-words font-medium text-slate-900">
                                                        {log.description}
                                                    </p>
                                                    <Badge
                                                        variant="outline"
                                                        className={actionStyles[log.action]}
                                                    >
                                                        {formatAction(log.action)}
                                                    </Badge>
                                                </div>

                                                <p className="mt-1 break-words text-sm text-muted-foreground">
                                                    {log.user} · {log.role}
                                                </p>

                                                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                                                    <span>{log.id}</span>
                                                    <span>{log.category}</span>
                                                    <span>{formatDateTime(log.timestamp)}</span>
                                                </div>
                                            </div>

                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="size-9 shrink-0"
                                                aria-label={`View details for ${log.id}`}
                                                onClick={() => setSelectedLog(log)}
                                            >
                                                <Eye className="size-4" />
                                            </Button>
                                        </div>

                                        <div className="flex flex-col gap-2 rounded-lg bg-accent/5 p-3 text-sm sm:flex-row sm:items-center sm:justify-between">
                                            <p className="min-w-0 break-words text-muted-foreground">
                                                <span className="font-medium text-slate-700">
                                                    Target:
                                                </span>{" "}
                                                {log.target}
                                            </p>
                                            <div className="flex shrink-0 items-center gap-2">
                                                <span
                                                    className={`size-2 rounded-full ${log.status === "Success"
                                                        ? "bg-emerald-500"
                                                        : "bg-red-500"
                                                        }`}
                                                />
                                                <span
                                                    className={
                                                        log.status === "Success"
                                                            ? "text-emerald-700"
                                                            : "text-red-700"
                                                    }
                                                >
                                                    {log.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Pagination */}
                    {filteredLogs.length > 0 && (
                        <div className="flex flex-col gap-3 border-t px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                            <p className="text-sm text-muted-foreground">
                                Page {currentPage} of {totalPages}
                            </p>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={currentPage <= 1}
                                    onClick={() => setPage((value) => Math.max(1, value - 1))}
                                    className="flex-1 gap-1 sm:flex-none"
                                >
                                    <ChevronLeft className="size-4" />
                                    Previous
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={currentPage >= totalPages}
                                    onClick={() =>
                                        setPage((value) => Math.min(totalPages, value + 1))
                                    }
                                    className="flex-1 gap-1 sm:flex-none"
                                >
                                    Next
                                    <ChevronRight className="size-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Log details dialog */}
            <Dialog
                open={!!selectedLog}
                onOpenChange={(open) => {
                    if (!open) setSelectedLog(null);
                }}
            >
                <DialogContent className="max-h-[90vh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto">
                    {selectedLog && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="break-words">
                                    Audit Log Details
                                </DialogTitle>
                                <DialogDescription>
                                    Review the recorded event and its associated metadata.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="flex flex-wrap items-center gap-2">
                                <Badge
                                    variant="outline"
                                    className={actionStyles[selectedLog.action]}
                                >
                                    {formatAction(selectedLog.action)}
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className={
                                        selectedLog.status === "Success"
                                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                            : "border-red-200 bg-red-50 text-red-700"
                                    }
                                >
                                    {selectedLog.status}
                                </Badge>
                                <span className="text-sm text-muted-foreground">
                                    {selectedLog.id}
                                </span>
                            </div>

                            <Separator />

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {[
                                    ["Event", selectedLog.description],
                                    ["Category", selectedLog.category],
                                    ["User", selectedLog.user],
                                    ["Email", selectedLog.email],
                                    ["Role", selectedLog.role],
                                    ["Target", selectedLog.target],
                                    ["IP Address", selectedLog.ipAddress],
                                    ["Timestamp", formatDateTime(selectedLog.timestamp)],
                                ].map(([label, value]) => (
                                    <div key={label} className="min-w-0 space-y-1">
                                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                            {label}
                                        </p>
                                        <p className="break-words text-sm font-medium">{value}</p>
                                    </div>
                                ))}
                            </div>

                            <Separator />

                            <div className="space-y-2">
                                <h4 className="text-sm font-semibold">Event Description</h4>
                                <p className="break-words rounded-lg bg-slate-50 p-3 text-sm leading-6 text-muted-foreground">
                                    {selectedLog.details}
                                </p>
                            </div>

                            <div className="flex justify-end">
                                <Button
                                    variant="outline"
                                    onClick={() => setSelectedLog(null)}
                                >
                                    Close
                                </Button>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
