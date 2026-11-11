// import React from 'react'

// export default function funding() {
//   return (
//     <div>funding</div>
//   )
// }












"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
    Search,
    Wallet,
    Plus,
    Download,
    Eye,
    CheckCircle2,
    Clock,
    TrendingUp,
    Banknote,
    CalendarDays,
    UserRound,
    FileText,
    Filter,
    ArrowUpRight,
    CircleDollarSign,
    XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

type FundingStatus =
    | "REQUESTED"
    | "UNDER_REVIEW"
    | "APPROVED"
    | "PARTIALLY_DISBURSED"
    | "DISBURSED"
    | "REJECTED";

type FundingSource =
    | "UNIVERSITY"
    | "GOVERNMENT"
    | "EXTERNAL_GRANT"
    | "INDUSTRY";

type FundingRecord = {
    id: string;
    reference: string;
    projectTitle: string;
    principalInvestigator: string;
    department: string;
    fundingSource: FundingSource;
    grantName: string;
    requestedAmount: number;
    approvedAmount: number;
    disbursedAmount: number;
    status: FundingStatus;
    submittedAt: string;
    startDate: string;
    endDate: string;
    description: string;
};

const initialFundingRecords: FundingRecord[] = [
    {
        id: "1",
        reference: "FND-2026-001",
        projectTitle: "Machine Learning-Based Student Performance Prediction",
        principalInvestigator: "Dr. Mahmud Hasan",
        department: "Computer Science & Engineering",
        fundingSource: "UNIVERSITY",
        grantName: "University Research Grant 2026",
        requestedAmount: 185000,
        approvedAmount: 150000,
        disbursedAmount: 75000,
        status: "PARTIALLY_DISBURSED",
        submittedAt: "2026-10-20",
        startDate: "2027-01-01",
        endDate: "2027-12-31",
        description:
            "Funding for data collection, research materials, computing resources, and project-related expenses.",
    },
    {
        id: "2",
        reference: "FND-2026-002",
        projectTitle: "Sustainable Water Management in Rural Communities",
        principalInvestigator: "Dr. Farhana Akter",
        department: "Environmental Science",
        fundingSource: "GOVERNMENT",
        grantName: "National Research and Innovation Grant",
        requestedAmount: 250000,
        approvedAmount: 0,
        disbursedAmount: 0,
        status: "UNDER_REVIEW",
        submittedAt: "2026-10-28",
        startDate: "2027-02-01",
        endDate: "2027-10-31",
        description:
            "Proposed funding for field surveys, water quality testing, research equipment, and community engagement.",
    },
    {
        id: "3",
        reference: "FND-2026-003",
        projectTitle: "Smart Agriculture Using IoT-Based Monitoring",
        principalInvestigator: "Tanvir Rahman",
        department: "Computer Science & Engineering",
        fundingSource: "UNIVERSITY",
        grantName: "Student Innovation Fund",
        requestedAmount: 80000,
        approvedAmount: 65000,
        disbursedAmount: 65000,
        status: "DISBURSED",
        submittedAt: "2026-09-15",
        startDate: "2026-01-15",
        endDate: "2026-08-15",
        description:
            "Funding for IoT sensors, microcontrollers, prototype development, and testing.",
    },
    {
        id: "4",
        reference: "FND-2026-004",
        projectTitle: "Digital Learning Adoption Among University Students",
        principalInvestigator: "Dr. Nusrat Sultana",
        department: "Business Administration",
        fundingSource: "EXTERNAL_GRANT",
        grantName: "Digital Education Research Initiative",
        requestedAmount: 120000,
        approvedAmount: 100000,
        disbursedAmount: 0,
        status: "APPROVED",
        submittedAt: "2026-10-10",
        startDate: "2027-01-01",
        endDate: "2027-06-30",
        description:
            "Approved research funding for student surveys, data analysis, and research publication expenses.",
    },
    {
        id: "5",
        reference: "FND-2026-005",
        projectTitle: "Renewable Energy Awareness Among Undergraduate Students",
        principalInvestigator: "Rafiul Islam",
        department: "Electrical & Electronic Engineering",
        fundingSource: "INDUSTRY",
        grantName: "Industry Collaboration Research Support",
        requestedAmount: 90000,
        approvedAmount: 0,
        disbursedAmount: 0,
        status: "REQUESTED",
        submittedAt: "2026-11-01",
        startDate: "2027-01-01",
        endDate: "2027-05-31",
        description:
            "Proposed funding for research surveys, data collection, and awareness campaign materials.",
    },
    {
        id: "6",
        reference: "FND-2026-006",
        projectTitle: "Research on Renewable Energy Adoption",
        principalInvestigator: "Dr. Kamal Uddin",
        department: "Electrical & Electronic Engineering",
        fundingSource: "GOVERNMENT",
        grantName: "National Science Research Program",
        requestedAmount: 175000,
        approvedAmount: 0,
        disbursedAmount: 0,
        status: "REJECTED",
        submittedAt: "2026-09-05",
        startDate: "2027-01-01",
        endDate: "2027-08-31",
        description:
            "Funding request for research equipment, laboratory testing, and data collection.",
    },
];

const statusConfig: Record<
    FundingStatus,
    { label: string; className: string }
> = {
    REQUESTED: {
        label: "Requested",
        className: "border-blue-500/20 bg-blue-500/10 text-blue-600",
    },
    UNDER_REVIEW: {
        label: "Under Review",
        className: "border-amber-500/20 bg-amber-500/10 text-amber-600",
    },
    APPROVED: {
        label: "Approved",
        className: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600",
    },
    PARTIALLY_DISBURSED: {
        label: "Partially Disbursed",
        className: "border-violet-500/20 bg-violet-500/10 text-violet-600",
    },
    DISBURSED: {
        label: "Fully Disbursed",
        className: "border-teal-500/20 bg-teal-500/10 text-teal-600",
    },
    REJECTED: {
        label: "Rejected",
        className: "border-red-500/20 bg-red-500/10 text-red-600",
    },
};

const sourceLabels: Record<FundingSource, string> = {
    UNIVERSITY: "University",
    GOVERNMENT: "Government",
    EXTERNAL_GRANT: "External Grant",
    INDUSTRY: "Industry",
};

function formatCurrency(amount: number) {
    return new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT",
        maximumFractionDigits: 0,
    }).format(amount);
}

function formatDate(date: string) {
    return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

function StatusBadge({ status }: { status: FundingStatus }) {
    return (
        <Badge variant="outline" className={statusConfig[status].className}>
            {statusConfig[status].label}
        </Badge>
    );
}

export default function FundingPage() {
    const [records, setRecords] = useState(initialFundingRecords);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [sourceFilter, setSourceFilter] = useState("ALL");

    const [selectedRecord, setSelectedRecord] =
        useState<FundingRecord | null>(null);

    const [disbursementRecord, setDisbursementRecord] =
        useState<FundingRecord | null>(null);

    const [disbursementAmount, setDisbursementAmount] = useState("");
    const [disbursementNote, setDisbursementNote] = useState("");

    const stats = useMemo(() => {
        const approvedRecords = records.filter(
            (record) =>
                record.status === "APPROVED" ||
                record.status === "PARTIALLY_DISBURSED" ||
                record.status === "DISBURSED",
        );

        const totalApproved = approvedRecords.reduce(
            (sum, record) => sum + record.approvedAmount,
            0,
        );

        const totalDisbursed = records.reduce(
            (sum, record) => sum + record.disbursedAmount,
            0,
        );

        const pendingRequests = records.filter(
            (record) =>
                record.status === "REQUESTED" ||
                record.status === "UNDER_REVIEW",
        );

        return {
            totalApproved,
            totalDisbursed,
            remaining: totalApproved - totalDisbursed,
            pendingCount: pendingRequests.length,
            pendingAmount: pendingRequests.reduce(
                (sum, record) => sum + record.requestedAmount,
                0,
            ),
            totalRecords: records.length,
        };
    }, [records]);

    const filteredRecords = useMemo(() => {
        const query = search.toLowerCase().trim();

        return records.filter((record) => {
            const matchesSearch =
                !query ||
                record.projectTitle.toLowerCase().includes(query) ||
                record.reference.toLowerCase().includes(query) ||
                record.principalInvestigator.toLowerCase().includes(query) ||
                record.grantName.toLowerCase().includes(query);

            const matchesStatus =
                statusFilter === "ALL" || record.status === statusFilter;

            const matchesSource =
                sourceFilter === "ALL" || record.fundingSource === sourceFilter;

            return matchesSearch && matchesStatus && matchesSource;
        });
    }, [records, search, statusFilter, sourceFilter]);

    const exportCSV = () => {
        const headers = [
            "Reference",
            "Project",
            "Principal Investigator",
            "Department",
            "Funding Source",
            "Grant Name",
            "Requested Amount",
            "Approved Amount",
            "Disbursed Amount",
            "Remaining Amount",
            "Status",
        ];

        const rows = filteredRecords.map((record) => [
            record.reference,
            record.projectTitle,
            record.principalInvestigator,
            record.department,
            sourceLabels[record.fundingSource],
            record.grantName,
            record.requestedAmount,
            record.approvedAmount,
            record.disbursedAmount,
            Math.max(0, record.approvedAmount - record.disbursedAmount),
            statusConfig[record.status].label,
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
        const anchor = document.createElement("a");

        anchor.href = url;
        anchor.download = "department-research-funding.csv";
        anchor.click();

        URL.revokeObjectURL(url);
    };

    const openDisbursement = (record: FundingRecord) => {
        setDisbursementRecord(record);
        setDisbursementAmount("");
        setDisbursementNote("");
    };

    const submitDisbursement = () => {
        if (!disbursementRecord) return;

        const amount = Number(disbursementAmount);
        const remaining =
            disbursementRecord.approvedAmount -
            disbursementRecord.disbursedAmount;

        if (
            !Number.isFinite(amount) ||
            amount <= 0 ||
            amount > remaining
        ) {
            return;
        }

        setRecords((current) =>
            current.map((record) => {
                if (record.id !== disbursementRecord.id) return record;

                const newDisbursedAmount = record.disbursedAmount + amount;

                return {
                    ...record,
                    disbursedAmount: newDisbursedAmount,
                    status:
                        newDisbursedAmount >= record.approvedAmount
                            ? "DISBURSED"
                            : "PARTIALLY_DISBURSED",
                };
            }),
        );

        setDisbursementRecord(null);
        setDisbursementAmount("");
        setDisbursementNote("");
    };

    const resetFilters = () => {
        setSearch("");
        setStatusFilter("ALL");
        setSourceFilter("ALL");
    };

    const canDisburse = (status: FundingStatus) =>
        status === "APPROVED" || status === "PARTIALLY_DISBURSED";

    return (
        <div className="space-y-6 pb-10 p-4">
            {/* Header */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Wallet className="h-4 w-4" />
                        Research Management
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Research Funding
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        Track research grants, funding allocations, approvals, and
                        disbursements within your department.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" onClick={exportCSV}>
                        <Download className="mr-2 h-4 w-4" />
                        Export CSV
                    </Button>

                    <Button render={<Link href="/department-head/research/funding/create">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Funding
                    </Link>}>

                    </Button>
                </div>
            </div>

            {/* Summary cards */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-xl border bg-card p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">
                            Approved Funding
                        </p>
                        <div className="rounded-lg bg-primary/10 p-2 text-primary">
                            <CircleDollarSign className="h-4 w-4" />
                        </div>
                    </div>

                    <h3 className="mt-3 text-2xl font-bold">
                        {formatCurrency(stats.totalApproved)}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                        Total approved research budget
                    </p>
                </div>

                <div className="rounded-xl border bg-card p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">
                            Total Disbursed
                        </p>
                        <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-600">
                            <Banknote className="h-4 w-4" />
                        </div>
                    </div>

                    <h3 className="mt-3 text-2xl font-bold">
                        {formatCurrency(stats.totalDisbursed)}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                        Funds already released
                    </p>
                </div>

                <div className="rounded-xl border bg-card p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">
                            Available Balance
                        </p>
                        <div className="rounded-lg bg-violet-500/10 p-2 text-violet-600">
                            <TrendingUp className="h-4 w-4" />
                        </div>
                    </div>

                    <h3 className="mt-3 text-2xl font-bold">
                        {formatCurrency(stats.remaining)}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                        Approved but not yet disbursed
                    </p>
                </div>

                <div className="rounded-xl border bg-card p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">
                            Pending Requests
                        </p>
                        <div className="rounded-lg bg-amber-500/10 p-2 text-amber-600">
                            <Clock className="h-4 w-4" />
                        </div>
                    </div>

                    <h3 className="mt-3 text-2xl font-bold">
                        {stats.pendingCount}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                        {formatCurrency(stats.pendingAmount)} requested
                    </p>
                </div>
            </div>

            {/* Funding utilization */}
            <div className="rounded-xl border bg-card p-5">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="font-semibold">Funding Utilization</h2>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Disbursed amount compared with the total approved budget
                        </p>
                    </div>

                    <span className="text-lg font-bold">
                        {stats.totalApproved > 0
                            ? Math.round(
                                (stats.totalDisbursed / stats.totalApproved) * 100,
                            )
                            : 0}
                        %
                    </span>
                </div>

                <div className="mt-4 h-3 overflow-hidden rounded-full bg-muted">
                    <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{
                            width: `${stats.totalApproved > 0
                                ? Math.min(
                                    100,
                                    (stats.totalDisbursed / stats.totalApproved) * 100,
                                )
                                : 0
                                }%`,
                        }}
                    />
                </div>

                <div className="mt-3 flex flex-wrap justify-between gap-2 text-xs text-muted-foreground">
                    <span>Disbursed: {formatCurrency(stats.totalDisbursed)}</span>
                    <span>Remaining: {formatCurrency(stats.remaining)}</span>
                </div>
            </div>

            {/* Pending requests alert */}
            {stats.pendingCount > 0 && (
                <div className="flex flex-col gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-3">
                        <Clock className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                        <div>
                            <p className="text-sm font-semibold">
                                Funding requests need attention
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                {stats.pendingCount} request(s) are awaiting review.
                            </p>
                        </div>
                    </div>

                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                            setStatusFilter("REQUESTED");
                            setSearch("");
                            setSourceFilter("ALL");
                        }}
                    >
                        View requests
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )}

            {/* Filters */}
            <div className="rounded-xl border bg-card p-4">
                <div className="mb-4 flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <h2 className="text-sm font-semibold">Filter Funding Records</h2>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="relative sm:col-span-2">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search project, reference, researcher..."
                            className="pl-9"
                        />
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(event) => setStatusFilter(event.target.value)}
                        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                    >
                        <option value="ALL">All statuses</option>
                        <option value="REQUESTED">Requested</option>
                        <option value="UNDER_REVIEW">Under Review</option>
                        <option value="APPROVED">Approved</option>
                        <option value="PARTIALLY_DISBURSED">
                            Partially Disbursed
                        </option>
                        <option value="DISBURSED">Fully Disbursed</option>
                        <option value="REJECTED">Rejected</option>
                    </select>

                    <select
                        value={sourceFilter}
                        onChange={(event) => setSourceFilter(event.target.value)}
                        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                    >
                        <option value="ALL">All funding sources</option>
                        <option value="UNIVERSITY">University</option>
                        <option value="GOVERNMENT">Government</option>
                        <option value="EXTERNAL_GRANT">External Grant</option>
                        <option value="INDUSTRY">Industry</option>
                    </select>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs text-muted-foreground">
                        Showing {filteredRecords.length} of {records.length} records
                    </p>

                    {(search ||
                        statusFilter !== "ALL" ||
                        sourceFilter !== "ALL") && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={resetFilters}
                                className="h-8 text-xs"
                            >
                                Reset filters
                            </Button>
                        )}
                </div>
            </div>

            {/* Funding records */}
            <div className="overflow-hidden rounded-xl border bg-card">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b p-4">
                    <div>
                        <h2 className="font-semibold">Funding Records</h2>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Research grants and departmental funding allocations
                        </p>
                    </div>

                    <Badge variant="secondary">
                        {filteredRecords.length} Records
                    </Badge>
                </div>

                {filteredRecords.length === 0 ? (
                    <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
                        <div className="rounded-full bg-muted p-4">
                            <Wallet className="h-7 w-7 text-muted-foreground" />
                        </div>
                        <h3 className="mt-4 font-semibold">No funding records found</h3>
                        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                            Try changing your search keywords or filters.
                        </p>
                        <Button
                            variant="outline"
                            size="sm"
                            className="mt-4"
                            onClick={resetFilters}
                        >
                            Clear filters
                        </Button>
                    </div>
                ) : (
                    <>
                        {/* Desktop table */}
                        <div className="hidden overflow-x-auto md:block">
                            <table className="w-full text-sm">
                                <thead className="bg-muted/40 text-left text-xs text-muted-foreground">
                                    <tr>
                                        <th className="px-5 py-3 font-medium">Project</th>
                                        <th className="px-5 py-3 font-medium">Researcher</th>
                                        <th className="px-5 py-3 font-medium">Source</th>
                                        <th className="px-5 py-3 font-medium">Approved</th>
                                        <th className="px-5 py-3 font-medium">Disbursed</th>
                                        <th className="px-5 py-3 font-medium">Status</th>
                                        <th className="px-5 py-3 text-right font-medium">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y">
                                    {filteredRecords.map((record) => (
                                        <tr
                                            key={record.id}
                                            className="transition-colors hover:bg-muted/30"
                                        >
                                            <td className="max-w-[280px] px-5 py-4">
                                                <p className="font-medium leading-5">
                                                    {record.projectTitle}
                                                </p>
                                                <p className="mt-1 text-xs text-muted-foreground">
                                                    {record.reference}
                                                </p>
                                                <p className="mt-1 text-xs text-muted-foreground">
                                                    {record.grantName}
                                                </p>
                                            </td>

                                            <td className="px-5 py-4">
                                                <p className="font-medium">
                                                    {record.principalInvestigator}
                                                </p>
                                                <p className="mt-1 text-xs text-muted-foreground">
                                                    {record.department}
                                                </p>
                                            </td>

                                            <td className="px-5 py-4">
                                                <span className="text-xs">
                                                    {sourceLabels[record.fundingSource]}
                                                </span>
                                            </td>

                                            <td className="whitespace-nowrap px-5 py-4 font-medium">
                                                {record.approvedAmount > 0
                                                    ? formatCurrency(record.approvedAmount)
                                                    : "—"}
                                            </td>

                                            <td className="whitespace-nowrap px-5 py-4">
                                                <p className="font-medium">
                                                    {record.disbursedAmount > 0
                                                        ? formatCurrency(record.disbursedAmount)
                                                        : "—"}
                                                </p>
                                                {record.approvedAmount > 0 && (
                                                    <p className="mt-1 text-xs text-muted-foreground">
                                                        of {formatCurrency(record.approvedAmount)}
                                                    </p>
                                                )}
                                            </td>

                                            <td className="px-5 py-4">
                                                <StatusBadge status={record.status} />
                                            </td>

                                            <td className="px-5 py-4">
                                                <div className="flex justify-end gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        title="View details"
                                                        onClick={() => setSelectedRecord(record)}
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Button>

                                                    {canDisburse(record.status) &&
                                                        record.disbursedAmount < record.approvedAmount && (
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                title="Record disbursement"
                                                                onClick={() => openDisbursement(record)}
                                                            >
                                                                <Banknote className="h-4 w-4 text-emerald-600" />
                                                            </Button>
                                                        )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile cards */}
                        <div className="divide-y md:hidden">
                            {filteredRecords.map((record) => (
                                <div key={record.id} className="space-y-3 p-4">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <p className="font-semibold leading-5">
                                                {record.projectTitle}
                                            </p>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {record.reference}
                                            </p>
                                        </div>
                                        <StatusBadge status={record.status} />
                                    </div>

                                    <div className="space-y-1.5 text-xs text-muted-foreground">
                                        <p className="flex items-center gap-2">
                                            <UserRound className="h-3.5 w-3.5" />
                                            {record.principalInvestigator}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <Wallet className="h-3.5 w-3.5" />
                                            {sourceLabels[record.fundingSource]}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <CalendarDays className="h-3.5 w-3.5" />
                                            Submitted {formatDate(record.submittedAt)}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 rounded-lg bg-muted/40 p-3">
                                        <div>
                                            <p className="text-xs text-muted-foreground">
                                                Approved
                                            </p>
                                            <p className="mt-1 text-sm font-semibold">
                                                {formatCurrency(record.approvedAmount)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">
                                                Disbursed
                                            </p>
                                            <p className="mt-1 text-sm font-semibold">
                                                {formatCurrency(record.disbursedAmount)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="flex-1"
                                            onClick={() => setSelectedRecord(record)}
                                        >
                                            <Eye className="mr-2 h-4 w-4" />
                                            Details
                                        </Button>

                                        {canDisburse(record.status) &&
                                            record.disbursedAmount < record.approvedAmount && (
                                                <Button
                                                    size="sm"
                                                    className="flex-1"
                                                    onClick={() => openDisbursement(record)}
                                                >
                                                    <Banknote className="mr-2 h-4 w-4" />
                                                    Disburse
                                                </Button>
                                            )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Funding details dialog */}
            <Dialog
                open={!!selectedRecord}
                onOpenChange={(open) => {
                    if (!open) setSelectedRecord(null);
                }}
            >
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                    {selectedRecord && (
                        <>
                            <DialogHeader>
                                <div className="mb-2 flex flex-wrap items-center gap-2">
                                    <Badge variant="secondary">
                                        {selectedRecord.reference}
                                    </Badge>
                                    <StatusBadge status={selectedRecord.status} />
                                </div>

                                <DialogTitle className="text-xl leading-7">
                                    {selectedRecord.projectTitle}
                                </DialogTitle>

                                <DialogDescription>
                                    {selectedRecord.grantName}
                                </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-5">
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <div className="rounded-lg border p-3">
                                        <p className="text-xs text-muted-foreground">
                                            Principal Investigator
                                        </p>
                                        <p className="mt-1 text-sm font-semibold">
                                            {selectedRecord.principalInvestigator}
                                        </p>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            {selectedRecord.department}
                                        </p>
                                    </div>

                                    <div className="rounded-lg border p-3">
                                        <p className="text-xs text-muted-foreground">
                                            Funding Source
                                        </p>
                                        <p className="mt-1 text-sm font-semibold">
                                            {sourceLabels[selectedRecord.fundingSource]}
                                        </p>
                                    </div>

                                    <div className="rounded-lg border p-3">
                                        <p className="text-xs text-muted-foreground">
                                            Requested Amount
                                        </p>
                                        <p className="mt-1 text-lg font-bold">
                                            {formatCurrency(selectedRecord.requestedAmount)}
                                        </p>
                                    </div>

                                    <div className="rounded-lg border p-3">
                                        <p className="text-xs text-muted-foreground">
                                            Approved Amount
                                        </p>
                                        <p className="mt-1 text-lg font-bold">
                                            {formatCurrency(selectedRecord.approvedAmount)}
                                        </p>
                                    </div>

                                    <div className="rounded-lg border p-3">
                                        <p className="text-xs text-muted-foreground">
                                            Total Disbursed
                                        </p>
                                        <p className="mt-1 text-lg font-bold text-emerald-600">
                                            {formatCurrency(selectedRecord.disbursedAmount)}
                                        </p>
                                    </div>

                                    <div className="rounded-lg border p-3">
                                        <p className="text-xs text-muted-foreground">
                                            Remaining Balance
                                        </p>
                                        <p className="mt-1 text-lg font-bold">
                                            {formatCurrency(
                                                Math.max(
                                                    0,
                                                    selectedRecord.approvedAmount -
                                                    selectedRecord.disbursedAmount,
                                                ),
                                            )}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="mb-2 text-sm font-semibold">
                                        Funding Description
                                    </h3>
                                    <p className="text-sm leading-6 text-muted-foreground">
                                        {selectedRecord.description}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="mb-2 text-sm font-semibold">
                                        Funding Period
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {formatDate(selectedRecord.startDate)} –{" "}
                                        {formatDate(selectedRecord.endDate)}
                                    </p>
                                </div>

                                {selectedRecord.approvedAmount > 0 && (
                                    <div>
                                        <div className="mb-2 flex justify-between text-xs">
                                            <span className="text-muted-foreground">
                                                Disbursement progress
                                            </span>
                                            <span className="font-medium">
                                                {Math.round(
                                                    (selectedRecord.disbursedAmount /
                                                        selectedRecord.approvedAmount) *
                                                    100,
                                                )}
                                                %
                                            </span>
                                        </div>

                                        <div className="h-2 overflow-hidden rounded-full bg-muted">
                                            <div
                                                className="h-full rounded-full bg-primary"
                                                style={{
                                                    width: `${(selectedRecord.disbursedAmount /
                                                        selectedRecord.approvedAmount) *
                                                        100
                                                        }%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <DialogFooter>
                                {canDisburse(selectedRecord.status) &&
                                    selectedRecord.disbursedAmount <
                                    selectedRecord.approvedAmount && (
                                        <Button
                                            onClick={() => {
                                                openDisbursement(selectedRecord);
                                                setSelectedRecord(null);
                                            }}
                                        >
                                            <Banknote className="mr-2 h-4 w-4" />
                                            Record Disbursement
                                        </Button>
                                    )}
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>

            {/* Disbursement dialog */}
            <Dialog
                open={!!disbursementRecord}
                onOpenChange={(open) => {
                    if (!open) {
                        setDisbursementRecord(null);
                        setDisbursementAmount("");
                        setDisbursementNote("");
                    }
                }}
            >
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Record Fund Disbursement</DialogTitle>
                        <DialogDescription>
                            Record a payment made against an approved research budget.
                        </DialogDescription>
                    </DialogHeader>

                    {disbursementRecord && (
                        <div className="space-y-4">
                            <div className="rounded-lg border p-3">
                                <p className="text-sm font-semibold">
                                    {disbursementRecord.projectTitle}
                                </p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    {disbursementRecord.reference}
                                </p>

                                <div className="mt-3 grid grid-cols-2 gap-3">
                                    <div>
                                        <p className="text-xs text-muted-foreground">
                                            Approved
                                        </p>
                                        <p className="mt-1 text-sm font-semibold">
                                            {formatCurrency(disbursementRecord.approvedAmount)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">
                                            Remaining
                                        </p>
                                        <p className="mt-1 text-sm font-semibold">
                                            {formatCurrency(
                                                disbursementRecord.approvedAmount -
                                                disbursementRecord.disbursedAmount,
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="disbursement-amount"
                                    className="text-sm font-medium"
                                >
                                    Disbursement Amount (BDT)
                                    <span className="ml-1 text-red-500">*</span>
                                </label>

                                <Input
                                    id="disbursement-amount"
                                    type="number"
                                    min="1"
                                    max={
                                        disbursementRecord.approvedAmount -
                                        disbursementRecord.disbursedAmount
                                    }
                                    value={disbursementAmount}
                                    onChange={(event) =>
                                        setDisbursementAmount(event.target.value)
                                    }
                                    placeholder="Enter amount"
                                />

                                {Number(disbursementAmount) >
                                    disbursementRecord.approvedAmount -
                                    disbursementRecord.disbursedAmount && (
                                        <p className="text-xs text-red-500">
                                            Amount cannot exceed the remaining approved balance.
                                        </p>
                                    )}
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="disbursement-note"
                                    className="text-sm font-medium"
                                >
                                    Disbursement Note
                                </label>
                                <Textarea
                                    id="disbursement-note"
                                    value={disbursementNote}
                                    onChange={(event) =>
                                        setDisbursementNote(event.target.value)
                                    }
                                    placeholder="Add payment reference or remarks..."
                                    rows={3}
                                />
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setDisbursementRecord(null)}
                        >
                            Cancel
                        </Button>

                        <Button
                            disabled={
                                !disbursementAmount ||
                                !Number.isFinite(Number(disbursementAmount)) ||
                                Number(disbursementAmount) <= 0 ||
                                !disbursementRecord ||
                                Number(disbursementAmount) >
                                disbursementRecord.approvedAmount -
                                disbursementRecord.disbursedAmount
                            }
                            onClick={submitDisbursement}
                        >
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Confirm Disbursement
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
