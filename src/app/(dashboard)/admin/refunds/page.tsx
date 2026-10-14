// import React from 'react'

// export default function Refunds() {
//   return (
//     <div>refunds</div>
//   )
// }











"use client";

import React, { useMemo, useState } from "react";
import {
    ArrowDownToLine,
    ArrowLeftRight,
    CalendarDays,
    CheckCircle2,
    Clock3,
    Download,
    Eye,
    Filter,
    RefreshCcw,
    Search,
    Wallet,
    X,
    XCircle,
} from "lucide-react";

type RefundStatus = "COMPLETED" | "PENDING" | "REJECTED";
type RefundMethod = "ORIGINAL_METHOD" | "BANK_TRANSFER" | "MOBILE_BANKING";

interface Refund {
    id: string;
    refundId: string;
    transactionId: string;
    studentName: string;
    studentId: string;
    reason: string;
    requestDate: string;
    amount: number;
    paymentMethod: RefundMethod;
    status: RefundStatus;
    reference: string;
}

const refundsData: Refund[] = [
    {
        id: "1",
        refundId: "REF-2026-001",
        transactionId: "TXN-2026-1024",
        studentName: "Rahim Ahmed",
        studentId: "STU-2026-CSE-0001",
        reason: "Duplicate payment",
        requestDate: "2026-10-09",
        amount: 5000,
        paymentMethod: "ORIGINAL_METHOD",
        status: "COMPLETED",
        reference: "RFDREF10001",
    },
    {
        id: "2",
        refundId: "REF-2026-002",
        transactionId: "TXN-2026-1025",
        studentName: "Nusrat Jahan",
        studentId: "STU-2026-BBA-0002",
        reason: "Course withdrawal",
        requestDate: "2026-10-08",
        amount: 12000,
        paymentMethod: "BANK_TRANSFER",
        status: "PENDING",
        reference: "RFDREF10002",
    },
    {
        id: "3",
        refundId: "REF-2026-003",
        transactionId: "TXN-2026-1026",
        studentName: "Sabbir Hossain",
        studentId: "STU-2026-CSE-0003",
        reason: "Overpayment",
        requestDate: "2026-10-08",
        amount: 3500,
        paymentMethod: "MOBILE_BANKING",
        status: "PENDING",
        reference: "RFDREF10003",
    },
    {
        id: "4",
        refundId: "REF-2026-004",
        transactionId: "TXN-2026-1027",
        studentName: "Ayesha Akter",
        studentId: "STU-2026-EEE-0004",
        reason: "Incorrect fee charged",
        requestDate: "2026-10-07",
        amount: 2500,
        paymentMethod: "ORIGINAL_METHOD",
        status: "COMPLETED",
        reference: "RFDREF10004",
    },
    {
        id: "5",
        refundId: "REF-2026-005",
        transactionId: "TXN-2026-1028",
        studentName: "Tanvir Hasan",
        studentId: "STU-2026-CSE-0005",
        reason: "Duplicate payment",
        requestDate: "2026-10-06",
        amount: 8000,
        paymentMethod: "BANK_TRANSFER",
        status: "REJECTED",
        reference: "RFDREF10005",
    },
    {
        id: "6",
        refundId: "REF-2026-006",
        transactionId: "TXN-2026-1029",
        studentName: "Mim Sultana",
        studentId: "STU-2026-BBA-0006",
        reason: "Scholarship adjustment",
        requestDate: "2026-10-05",
        amount: 6500,
        paymentMethod: "MOBILE_BANKING",
        status: "PENDING",
        reference: "RFDREF10006",
    },
    {
        id: "7",
        refundId: "REF-2026-007",
        transactionId: "TXN-2026-1030",
        studentName: "Fahim Rahman",
        studentId: "STU-2026-EEE-0007",
        reason: "Excess fee payment",
        requestDate: "2026-10-04",
        amount: 4000,
        paymentMethod: "ORIGINAL_METHOD",
        status: "COMPLETED",
        reference: "RFDREF10007",
    },
    {
        id: "8",
        refundId: "REF-2026-008",
        transactionId: "TXN-2026-1031",
        studentName: "Samia Islam",
        studentId: "STU-2026-CSE-0008",
        reason: "Course cancellation",
        requestDate: "2026-10-03",
        amount: 10000,
        paymentMethod: "BANK_TRANSFER",
        status: "PENDING",
        reference: "RFDREF10008",
    },
];

const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT",
        maximumFractionDigits: 0,
    }).format(amount);

const formatDate = (date: string) =>
    new Date(`${date}T00:00:00`).toLocaleDateString("en-BD", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

const paymentMethodLabels: Record<RefundMethod, string> = {
    ORIGINAL_METHOD: "Original Payment",
    BANK_TRANSFER: "Bank Transfer",
    MOBILE_BANKING: "Mobile Banking",
};

function RefundStatusBadge({ status }: { status: RefundStatus }) {
    const styles: Record<RefundStatus, string> = {
        COMPLETED:
            "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-400/20",
        PENDING:
            "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-400/20",
        REJECTED:
            "bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-400/20",
    };

    const icons = {
        COMPLETED: <CheckCircle2 size={13} />,
        PENDING: <Clock3 size={13} />,
        REJECTED: <XCircle size={13} />,
    };

    const labels: Record<RefundStatus, string> = {
        COMPLETED: "Completed",
        PENDING: "Pending",
        REJECTED: "Rejected",
    };

    return (
        <span
            className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${styles[status]}`}
        >
            {icons[status]}
            {labels[status]}
        </span>
    );
}

function StatCard({
    title,
    value,
    subtitle,
    icon,
    iconClass,
}: {
    title: string;
    value: string;
    subtitle: string;
    icon: React.ReactNode;
    iconClass: string;
}) {
    return (
        <div className="min-w-0 rounded-xl border border-border bg-card p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    <h3 className="mt-2 break-words text-2xl font-bold tracking-tight sm:text-3xl">
                        {value}
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground">{subtitle}</p>
                </div>
                <div
                    className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
                >
                    {icon}
                </div>
            </div>
        </div>
    );
}

export default function Refunds() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [methodFilter, setMethodFilter] = useState("ALL");
    const [dateFilter, setDateFilter] = useState("");
    const [selectedRefund, setSelectedRefund] = useState<Refund | null>(null);

    const filteredRefunds = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();

        return refundsData.filter((refund) => {
            const matchesSearch =
                !query ||
                refund.refundId.toLowerCase().includes(query) ||
                refund.transactionId.toLowerCase().includes(query) ||
                refund.studentName.toLowerCase().includes(query) ||
                refund.studentId.toLowerCase().includes(query) ||
                refund.reason.toLowerCase().includes(query) ||
                refund.reference.toLowerCase().includes(query);

            const matchesStatus =
                statusFilter === "ALL" || refund.status === statusFilter;

            const matchesMethod =
                methodFilter === "ALL" || refund.paymentMethod === methodFilter;

            const matchesDate =
                !dateFilter || refund.requestDate === dateFilter;

            return (
                matchesSearch &&
                matchesStatus &&
                matchesMethod &&
                matchesDate
            );
        });
    }, [searchTerm, statusFilter, methodFilter, dateFilter]);

    const completedRefunds = refundsData.filter(
        (refund) => refund.status === "COMPLETED"
    );
    const pendingRefunds = refundsData.filter(
        (refund) => refund.status === "PENDING"
    );
    const rejectedRefunds = refundsData.filter(
        (refund) => refund.status === "REJECTED"
    );

    const totalRefundAmount = refundsData.reduce(
        (total, refund) => total + refund.amount,
        0
    );

    const completedAmount = completedRefunds.reduce(
        (total, refund) => total + refund.amount,
        0
    );

    const pendingAmount = pendingRefunds.reduce(
        (total, refund) => total + refund.amount,
        0
    );

    const exportRefunds = () => {
        const headers = [
            "Refund ID",
            "Transaction ID",
            "Student Name",
            "Student ID",
            "Reason",
            "Request Date",
            "Amount (BDT)",
            "Payment Method",
            "Status",
            "Reference",
        ];

        const escapeCsv = (value: string | number) =>
            `"${String(value).replace(/"/g, '""')}"`;

        const rows = filteredRefunds.map((refund) => [
            refund.refundId,
            refund.transactionId,
            refund.studentName,
            refund.studentId,
            refund.reason,
            refund.requestDate,
            refund.amount,
            paymentMethodLabels[refund.paymentMethod],
            refund.status,
            refund.reference,
        ]);

        const csv = [headers, ...rows]
            .map((row) => row.map(escapeCsv).join(","))
            .join("\r\n");

        const blob = new Blob(["\uFEFF" + csv], {
            type: "text/csv;charset=utf-8;",
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "campusflow-refunds.csv";
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen min-w-0 bg-background text-foreground">
            <div className="mx-auto w-full min-w-0 space-y-6 p-3 sm:p-5 lg:p-6">
                {/* Header */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>

                        <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                            Refund Management
                        </h1>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Review refund requests and monitor their processing status.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={exportRefunds}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 sm:w-auto"
                    >
                        <Download size={17} />
                        Export CSV
                    </button>
                </div>

                {/* Summary cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <StatCard
                        title="Total Refund Requests"
                        value={String(refundsData.length)}
                        subtitle="All recorded requests"
                        icon={<ArrowLeftRight size={21} />}
                        iconClass="bg-blue-500/10 text-blue-600 dark:text-blue-400"
                    />

                    <StatCard
                        title="Refund Amount"
                        value={formatCurrency(totalRefundAmount)}
                        subtitle="Total requested amount"
                        icon={<Wallet size={21} />}
                        iconClass="bg-violet-500/10 text-violet-600 dark:text-violet-400"
                    />

                    <StatCard
                        title="Pending Refunds"
                        value={String(pendingRefunds.length)}
                        subtitle={`${formatCurrency(pendingAmount)} awaiting processing`}
                        icon={<Clock3 size={21} />}
                        iconClass="bg-amber-500/10 text-amber-600 dark:text-amber-400"
                    />

                    <StatCard
                        title="Completed Refunds"
                        value={String(completedRefunds.length)}
                        subtitle={`${formatCurrency(completedAmount)} refunded`}
                        icon={<CheckCircle2 size={21} />}
                        iconClass="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    />
                </div>

                {/* Refund history */}
                <div className="min-w-0 overflow-hidden rounded-xl border border-border bg-card">
                    <div className="flex flex-col gap-4 border-b border-border p-4 sm:p-5">
                        <div>
                            <h2 className="text-lg font-semibold">Refund Requests</h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                {filteredRefunds.length} refund request(s) found
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                            <div className="relative min-w-0 sm:col-span-2 xl:col-span-1">
                                <Search
                                    size={17}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(event) => setSearchTerm(event.target.value)}
                                    placeholder="Search refund or student..."
                                    aria-label="Search refunds"
                                    className="h-10 w-full min-w-0 rounded-lg border border-input bg-background pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                                />
                            </div>

                            <select
                                value={statusFilter}
                                onChange={(event) => setStatusFilter(event.target.value)}
                                aria-label="Filter by refund status"
                                className="h-10 w-full min-w-0 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-primary"
                            >
                                <option value="ALL">All statuses</option>
                                <option value="PENDING">Pending</option>
                                <option value="COMPLETED">Completed</option>
                                <option value="REJECTED">Rejected</option>
                            </select>

                            <select
                                value={methodFilter}
                                onChange={(event) => setMethodFilter(event.target.value)}
                                aria-label="Filter by refund method"
                                className="h-10 w-full min-w-0 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-primary"
                            >
                                <option value="ALL">All payment methods</option>
                                <option value="ORIGINAL_METHOD">Original Payment</option>
                                <option value="BANK_TRANSFER">Bank Transfer</option>
                                <option value="MOBILE_BANKING">Mobile Banking</option>
                            </select>

                            <div className="relative min-w-0">
                                <CalendarDays
                                    size={16}
                                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                />
                                <input
                                    type="date"
                                    value={dateFilter}
                                    onChange={(event) => setDateFilter(event.target.value)}
                                    aria-label="Filter by request date"
                                    className="h-10 w-full min-w-0 rounded-lg border border-input bg-background pl-9 pr-2 text-sm outline-none focus:border-primary"
                                />
                            </div>
                        </div>

                        {(searchTerm ||
                            statusFilter !== "ALL" ||
                            methodFilter !== "ALL" ||
                            dateFilter) && (
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                                        <Filter size={13} />
                                        Filters applied
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSearchTerm("");
                                            setStatusFilter("ALL");
                                            setMethodFilter("ALL");
                                            setDateFilter("");
                                        }}
                                        className="rounded-md px-2 py-1 text-xs font-medium text-primary hover:bg-primary/10"
                                    >
                                        Clear all
                                    </button>
                                </div>
                            )}
                    </div>

                    <div className="w-full overflow-x-auto">
                        <table className="w-full min-w-[950px] border-collapse text-left text-sm">
                            <thead className="bg-muted/50">
                                <tr className="border-b border-border">
                                    <th className="px-5 py-3.5 font-semibold text-muted-foreground">
                                        Refund
                                    </th>
                                    <th className="px-5 py-3.5 font-semibold text-muted-foreground">
                                        Student
                                    </th>
                                    <th className="px-5 py-3.5 font-semibold text-muted-foreground">
                                        Reason
                                    </th>
                                    <th className="px-5 py-3.5 font-semibold text-muted-foreground">
                                        Request Date
                                    </th>
                                    <th className="px-5 py-3.5 font-semibold text-muted-foreground">
                                        Amount
                                    </th>
                                    <th className="px-5 py-3.5 font-semibold text-muted-foreground">
                                        Status
                                    </th>
                                    <th className="px-5 py-3.5 text-right font-semibold text-muted-foreground">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-border">
                                {filteredRefunds.map((refund) => (
                                    <tr
                                        key={refund.id}
                                        className="transition-colors hover:bg-muted/30"
                                    >
                                        <td className="px-5 py-4">
                                            <p className="whitespace-nowrap font-semibold">
                                                {refund.refundId}
                                            </p>
                                            <p className="mt-1 whitespace-nowrap text-xs text-muted-foreground">
                                                {refund.transactionId}
                                            </p>
                                        </td>

                                        <td className="px-5 py-4">
                                            <p className="whitespace-nowrap font-medium">
                                                {refund.studentName}
                                            </p>
                                            <p className="mt-1 whitespace-nowrap text-xs text-muted-foreground">
                                                {refund.studentId}
                                            </p>
                                        </td>

                                        <td className="px-5 py-4">
                                            <span className="whitespace-nowrap text-muted-foreground">
                                                {refund.reason}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4 whitespace-nowrap text-muted-foreground">
                                            {formatDate(refund.requestDate)}
                                        </td>

                                        <td className="px-5 py-4 whitespace-nowrap font-semibold">
                                            {formatCurrency(refund.amount)}
                                        </td>

                                        <td className="px-5 py-4">
                                            <RefundStatusBadge status={refund.status} />
                                        </td>

                                        <td className="px-5 py-4 text-right">
                                            <button
                                                type="button"
                                                onClick={() => setSelectedRefund(refund)}
                                                aria-label={`View ${refund.refundId}`}
                                                className="inline-flex size-9 items-center justify-center rounded-lg border border-border transition hover:bg-muted"
                                            >
                                                <Eye size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                {filteredRefunds.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="px-5 py-16 text-center">
                                            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted">
                                                <Search
                                                    size={22}
                                                    className="text-muted-foreground"
                                                />
                                            </div>
                                            <p className="mt-3 font-semibold">
                                                No refund requests found
                                            </p>
                                            <p className="mt-1 text-sm text-muted-foreground">
                                                Try changing your search or filter criteria.
                                            </p>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSearchTerm("");
                                                    setStatusFilter("ALL");
                                                    setMethodFilter("ALL");
                                                    setDateFilter("");
                                                }}
                                                className="mt-3 text-sm font-semibold text-primary hover:underline"
                                            >
                                                Reset filters
                                            </button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-col gap-2 border-t border-border px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-5">
                        <span>
                            Showing {filteredRefunds.length} of {refundsData.length} refund
                            requests
                        </span>
                        <span>Amounts displayed in Bangladeshi Taka (BDT)</span>
                    </div>
                </div>

                {/* Refund details dialog */}
                {selectedRefund && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-3 backdrop-blur-sm sm:p-5"
                        onClick={() => setSelectedRefund(null)}
                    >
                        <div
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="refund-dialog-title"
                            className="my-auto w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
                            onClick={(event) => event.stopPropagation()}
                        >
                            <div className="flex items-center justify-between border-b border-border p-5">
                                <div>
                                    <h2 id="refund-dialog-title" className="text-lg font-bold">
                                        Refund Details
                                    </h2>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {selectedRefund.refundId}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setSelectedRefund(null)}
                                    aria-label="Close refund details"
                                    className="flex size-9 items-center justify-center rounded-lg hover:bg-muted"
                                >
                                    <X size={19} />
                                </button>
                            </div>

                            <div className="space-y-5 p-5">
                                <div className="rounded-xl bg-muted/50 p-5 text-center">
                                    <p className="text-sm text-muted-foreground">
                                        Refund Amount
                                    </p>
                                    <h3 className="mt-2 text-3xl font-bold">
                                        {formatCurrency(selectedRefund.amount)}
                                    </h3>
                                    <div className="mt-3 flex justify-center">
                                        <RefundStatusBadge status={selectedRefund.status} />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        ["Student Name", selectedRefund.studentName],
                                        ["Student ID", selectedRefund.studentId],
                                        ["Refund ID", selectedRefund.refundId],
                                        ["Transaction ID", selectedRefund.transactionId],
                                        ["Reason", selectedRefund.reason],
                                        ["Request Date", formatDate(selectedRefund.requestDate)],
                                        [
                                            "Payment Method",
                                            paymentMethodLabels[selectedRefund.paymentMethod],
                                        ],
                                        ["Reference Number", selectedRefund.reference],
                                    ].map(([label, value]) => (
                                        <div
                                            key={label}
                                            className="flex flex-col justify-between gap-1 text-sm sm:flex-row sm:gap-4"
                                        >
                                            <span className="text-muted-foreground">{label}</span>
                                            <span className="break-all font-medium sm:text-right">
                                                {value}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setSelectedRefund(null)}
                                    className="w-full rounded-lg border border-border px-4 py-2.5 text-sm font-semibold transition hover:bg-muted"
                                >
                                    Close Details
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
