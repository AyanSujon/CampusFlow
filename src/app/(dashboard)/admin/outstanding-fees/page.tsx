// import React from 'react'

// export default function OutstandingFees() {
//   return (
//     <div>outstanding-fees</div>
//   )
// }













"use client";

import React, { useMemo, useState } from "react";
import {
    AlertCircle,
    ArrowDownToLine,
    CalendarDays,
    CheckCircle2,
    Clock3,
    Download,
    Eye,
    Filter,
    Search,
    Wallet,
    X,
} from "lucide-react";

type FeeStatus = "OVERDUE" | "DUE_SOON" | "UPCOMING";

interface OutstandingFee {
    id: string;
    invoiceNumber: string;
    studentName: string;
    studentId: string;
    program: string;
    feeType: string;
    totalAmount: number;
    paidAmount: number;
    dueDate: string;
    semester: string;
}

const outstandingFeesData: OutstandingFee[] = [
    {
        id: "1",
        invoiceNumber: "INV-2026-001",
        studentName: "Rahim Ahmed",
        studentId: "STU-2026-CSE-0001",
        program: "B.Sc. in Computer Science",
        feeType: "Semester Tuition Fee",
        totalAmount: 45000,
        paidAmount: 20000,
        dueDate: "2026-09-20",
        semester: "Fall 2026",
    },
    {
        id: "2",
        invoiceNumber: "INV-2026-002",
        studentName: "Nusrat Jahan",
        studentId: "STU-2026-BBA-0002",
        program: "Bachelor of Business Administration",
        feeType: "Semester Tuition Fee",
        totalAmount: 40000,
        paidAmount: 10000,
        dueDate: "2026-09-25",
        semester: "Fall 2026",
    },
    {
        id: "3",
        invoiceNumber: "INV-2026-003",
        studentName: "Sabbir Hossain",
        studentId: "STU-2026-CSE-0003",
        program: "B.Sc. in Computer Science",
        feeType: "Laboratory Fee",
        totalAmount: 8000,
        paidAmount: 0,
        dueDate: "2026-10-15",
        semester: "Fall 2026",
    },
    {
        id: "4",
        invoiceNumber: "INV-2026-004",
        studentName: "Ayesha Akter",
        studentId: "STU-2026-EEE-0004",
        program: "B.Sc. in Electrical Engineering",
        feeType: "Examination Fee",
        totalAmount: 6000,
        paidAmount: 2000,
        dueDate: "2026-10-12",
        semester: "Fall 2026",
    },
    {
        id: "5",
        invoiceNumber: "INV-2026-005",
        studentName: "Tanvir Hasan",
        studentId: "STU-2026-CSE-0005",
        program: "B.Sc. in Computer Science",
        feeType: "Admission Fee",
        totalAmount: 30000,
        paidAmount: 0,
        dueDate: "2026-08-30",
        semester: "Fall 2026",
    },
    {
        id: "6",
        invoiceNumber: "INV-2026-006",
        studentName: "Mim Sultana",
        studentId: "STU-2026-BBA-0006",
        program: "Bachelor of Business Administration",
        feeType: "Library Fee",
        totalAmount: 2500,
        paidAmount: 500,
        dueDate: "2026-10-25",
        semester: "Fall 2026",
    },
    {
        id: "7",
        invoiceNumber: "INV-2026-007",
        studentName: "Fahim Rahman",
        studentId: "STU-2026-EEE-0007",
        program: "B.Sc. in Electrical Engineering",
        feeType: "Semester Tuition Fee",
        totalAmount: 42000,
        paidAmount: 12000,
        dueDate: "2026-09-15",
        semester: "Fall 2026",
    },
    {
        id: "8",
        invoiceNumber: "INV-2026-008",
        studentName: "Samia Islam",
        studentId: "STU-2026-CSE-0008",
        program: "B.Sc. in Computer Science",
        feeType: "Examination Fee",
        totalAmount: 5000,
        paidAmount: 0,
        dueDate: "2026-11-10",
        semester: "Fall 2026",
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

const getRemainingAmount = (fee: OutstandingFee) =>
    Math.max(0, fee.totalAmount - fee.paidAmount);

const getFeeStatus = (dueDate: string): FeeStatus => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const due = new Date(`${dueDate}T00:00:00`);
    const difference = Math.ceil(
        (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (difference < 0) return "OVERDUE";
    if (difference <= 7) return "DUE_SOON";
    return "UPCOMING";
};

function FeeStatusBadge({ status }: { status: FeeStatus }) {
    const styles: Record<FeeStatus, string> = {
        OVERDUE:
            "bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-400/20",
        DUE_SOON:
            "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-400/20",
        UPCOMING:
            "bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-500/10 dark:text-blue-400 dark:ring-blue-400/20",
    };

    const labels: Record<FeeStatus, string> = {
        OVERDUE: "Overdue",
        DUE_SOON: "Due Soon",
        UPCOMING: "Upcoming",
    };

    return (
        <span
            className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${styles[status]}`}
        >
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

export default function OutstandingFees() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [feeTypeFilter, setFeeTypeFilter] = useState("ALL");
    const [selectedFee, setSelectedFee] = useState<OutstandingFee | null>(null);

    const filteredFees = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();

        return outstandingFeesData.filter((fee) => {
            const matchesSearch =
                !query ||
                fee.studentName.toLowerCase().includes(query) ||
                fee.studentId.toLowerCase().includes(query) ||
                fee.invoiceNumber.toLowerCase().includes(query) ||
                fee.feeType.toLowerCase().includes(query) ||
                fee.program.toLowerCase().includes(query);

            const status = getFeeStatus(fee.dueDate);
            const matchesStatus =
                statusFilter === "ALL" || status === statusFilter;
            const matchesFeeType =
                feeTypeFilter === "ALL" || fee.feeType === feeTypeFilter;

            return (
                matchesSearch &&
                matchesStatus &&
                matchesFeeType &&
                getRemainingAmount(fee) > 0
            );
        });
    }, [searchTerm, statusFilter, feeTypeFilter]);

    const outstandingAmount = outstandingFeesData.reduce(
        (total, fee) => total + getRemainingAmount(fee),
        0
    );

    const overdueFees = outstandingFeesData.filter(
        (fee) =>
            getRemainingAmount(fee) > 0 && getFeeStatus(fee.dueDate) === "OVERDUE"
    );

    const dueSoonFees = outstandingFeesData.filter(
        (fee) =>
            getRemainingAmount(fee) > 0 && getFeeStatus(fee.dueDate) === "DUE_SOON"
    );

    const overdueAmount = overdueFees.reduce(
        (total, fee) => total + getRemainingAmount(fee),
        0
    );

    const exportFees = () => {
        const headers = [
            "Invoice Number",
            "Student Name",
            "Student ID",
            "Program",
            "Fee Type",
            "Semester",
            "Total Amount",
            "Paid Amount",
            "Outstanding Amount",
            "Due Date",
            "Status",
        ];

        const escapeCsv = (value: string | number) =>
            `"${String(value).replace(/"/g, '""')}"`;

        const rows = filteredFees.map((fee) => [
            fee.invoiceNumber,
            fee.studentName,
            fee.studentId,
            fee.program,
            fee.feeType,
            fee.semester,
            fee.totalAmount,
            fee.paidAmount,
            getRemainingAmount(fee),
            fee.dueDate,
            getFeeStatus(fee.dueDate),
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
        link.download = "campusflow-outstanding-fees.csv";
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen min-w-0 bg-background text-foreground">
            <div className="mx-auto w-full min-w-0 space-y-6 p-3 sm:p-5 lg:p-6">
                {/* Page header */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                            Outstanding Fees
                        </h1>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Track unpaid student fees, overdue invoices, and upcoming
                            payment deadlines.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={exportFees}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 sm:w-auto"
                    >
                        <Download size={17} />
                        Export CSV
                    </button>
                </div>

                {/* Summary cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <StatCard
                        title="Total Outstanding"
                        value={formatCurrency(outstandingAmount)}
                        subtitle="Remaining unpaid balances"
                        icon={<Wallet size={21} />}
                        iconClass="bg-blue-500/10 text-blue-600 dark:text-blue-400"
                    />

                    <StatCard
                        title="Overdue Amount"
                        value={formatCurrency(overdueAmount)}
                        subtitle={`${overdueFees.length} overdue record(s)`}
                        icon={<AlertCircle size={21} />}
                        iconClass="bg-red-500/10 text-red-600 dark:text-red-400"
                    />

                    <StatCard
                        title="Overdue Invoices"
                        value={String(overdueFees.length)}
                        subtitle="Past their due date"
                        icon={<Clock3 size={21} />}
                        iconClass="bg-amber-500/10 text-amber-600 dark:text-amber-400"
                    />

                    <StatCard
                        title="Due Soon"
                        value={String(dueSoonFees.length)}
                        subtitle="Due within the next 7 days"
                        icon={<CalendarDays size={21} />}
                        iconClass="bg-violet-500/10 text-violet-600 dark:text-violet-400"
                    />
                </div>

                {/* Outstanding fees table */}
                <div className="min-w-0 overflow-hidden rounded-xl border border-border bg-card">
                    <div className="flex flex-col gap-4 border-b border-border p-4 sm:p-5">
                        <div>
                            <h2 className="text-lg font-semibold">Unpaid Fee Records</h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                {filteredFees.length} outstanding record(s) found
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                            <div className="relative min-w-0">
                                <Search
                                    size={17}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(event) => setSearchTerm(event.target.value)}
                                    placeholder="Search student or invoice..."
                                    aria-label="Search outstanding fees"
                                    className="h-10 w-full min-w-0 rounded-lg border border-input bg-background pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                                />
                            </div>

                            <select
                                value={statusFilter}
                                onChange={(event) => setStatusFilter(event.target.value)}
                                aria-label="Filter by fee status"
                                className="h-10 w-full min-w-0 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-primary"
                            >
                                <option value="ALL">All statuses</option>
                                <option value="OVERDUE">Overdue</option>
                                <option value="DUE_SOON">Due Soon</option>
                                <option value="UPCOMING">Upcoming</option>
                            </select>

                            <select
                                value={feeTypeFilter}
                                onChange={(event) => setFeeTypeFilter(event.target.value)}
                                aria-label="Filter by fee type"
                                className="h-10 w-full min-w-0 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-primary"
                            >
                                <option value="ALL">All fee types</option>
                                <option value="Semester Tuition Fee">
                                    Semester Tuition Fee
                                </option>
                                <option value="Admission Fee">Admission Fee</option>
                                <option value="Laboratory Fee">Laboratory Fee</option>
                                <option value="Examination Fee">Examination Fee</option>
                                <option value="Library Fee">Library Fee</option>
                            </select>
                        </div>

                        {(searchTerm ||
                            statusFilter !== "ALL" ||
                            feeTypeFilter !== "ALL") && (
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
                                            setFeeTypeFilter("ALL");
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
                                        Student
                                    </th>
                                    <th className="px-5 py-3.5 font-semibold text-muted-foreground">
                                        Fee Details
                                    </th>
                                    <th className="px-5 py-3.5 font-semibold text-muted-foreground">
                                        Due Date
                                    </th>
                                    <th className="px-5 py-3.5 font-semibold text-muted-foreground">
                                        Total Fee
                                    </th>
                                    <th className="px-5 py-3.5 font-semibold text-muted-foreground">
                                        Paid
                                    </th>
                                    <th className="px-5 py-3.5 font-semibold text-muted-foreground">
                                        Outstanding
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
                                {filteredFees.map((fee) => {
                                    const remaining = getRemainingAmount(fee);
                                    const status = getFeeStatus(fee.dueDate);

                                    return (
                                        <tr
                                            key={fee.id}
                                            className="transition-colors hover:bg-muted/30"
                                        >
                                            <td className="px-5 py-4">
                                                <p className="whitespace-nowrap font-semibold">
                                                    {fee.studentName}
                                                </p>
                                                <p className="mt-1 whitespace-nowrap text-xs text-muted-foreground">
                                                    {fee.studentId}
                                                </p>
                                            </td>

                                            <td className="px-5 py-4">
                                                <p className="whitespace-nowrap font-medium">
                                                    {fee.feeType}
                                                </p>
                                                <p className="mt-1 whitespace-nowrap text-xs text-muted-foreground">
                                                    {fee.invoiceNumber} · {fee.semester}
                                                </p>
                                            </td>

                                            <td className="px-5 py-4">
                                                <span className="whitespace-nowrap text-muted-foreground">
                                                    {formatDate(fee.dueDate)}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4 whitespace-nowrap">
                                                {formatCurrency(fee.totalAmount)}
                                            </td>

                                            <td className="px-5 py-4 whitespace-nowrap text-emerald-600 dark:text-emerald-400">
                                                {formatCurrency(fee.paidAmount)}
                                            </td>

                                            <td className="px-5 py-4 whitespace-nowrap font-semibold">
                                                {formatCurrency(remaining)}
                                            </td>

                                            <td className="px-5 py-4">
                                                <FeeStatusBadge status={status} />
                                            </td>

                                            <td className="px-5 py-4 text-right">
                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedFee(fee)}
                                                    aria-label={`View invoice ${fee.invoiceNumber}`}
                                                    className="inline-flex size-9 items-center justify-center rounded-lg border border-border transition hover:bg-muted"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}

                                {filteredFees.length === 0 && (
                                    <tr>
                                        <td colSpan={8} className="px-5 py-16 text-center">
                                            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted">
                                                <CheckCircle2
                                                    size={22}
                                                    className="text-muted-foreground"
                                                />
                                            </div>
                                            <p className="mt-3 font-semibold">
                                                No outstanding fees found
                                            </p>
                                            <p className="mt-1 text-sm text-muted-foreground">
                                                Try changing your search or filter criteria.
                                            </p>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSearchTerm("");
                                                    setStatusFilter("ALL");
                                                    setFeeTypeFilter("ALL");
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
                            Showing {filteredFees.length} of{" "}
                            {outstandingFeesData.filter((fee) => getRemainingAmount(fee) > 0).length}{" "}
                            outstanding records
                        </span>
                        <span>All amounts are in Bangladeshi Taka (BDT)</span>
                    </div>
                </div>

                {/* Fee details dialog */}
                {selectedFee && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-3 backdrop-blur-sm sm:p-5"
                        onClick={() => setSelectedFee(null)}
                    >
                        <div
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="fee-dialog-title"
                            className="my-auto w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
                            onClick={(event) => event.stopPropagation()}
                        >
                            <div className="flex items-center justify-between border-b border-border p-5">
                                <div>
                                    <h2
                                        id="fee-dialog-title"
                                        className="text-lg font-bold"
                                    >
                                        Outstanding Fee Details
                                    </h2>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {selectedFee.invoiceNumber}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setSelectedFee(null)}
                                    aria-label="Close fee details"
                                    className="flex size-9 items-center justify-center rounded-lg hover:bg-muted"
                                >
                                    <X size={19} />
                                </button>
                            </div>

                            <div className="space-y-5 p-5">
                                <div className="rounded-xl bg-muted/50 p-5 text-center">
                                    <p className="text-sm text-muted-foreground">
                                        Remaining Balance
                                    </p>
                                    <h3 className="mt-2 text-3xl font-bold">
                                        {formatCurrency(getRemainingAmount(selectedFee))}
                                    </h3>
                                    <div className="mt-3 flex justify-center">
                                        <FeeStatusBadge
                                            status={getFeeStatus(selectedFee.dueDate)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        ["Student Name", selectedFee.studentName],
                                        ["Student ID", selectedFee.studentId],
                                        ["Program", selectedFee.program],
                                        ["Fee Type", selectedFee.feeType],
                                        ["Semester", selectedFee.semester],
                                        ["Due Date", formatDate(selectedFee.dueDate)],
                                        ["Total Fee", formatCurrency(selectedFee.totalAmount)],
                                        ["Amount Paid", formatCurrency(selectedFee.paidAmount)],
                                        [
                                            "Outstanding",
                                            formatCurrency(getRemainingAmount(selectedFee)),
                                        ],
                                    ].map(([label, value]) => (
                                        <div
                                            key={label}
                                            className="flex flex-col justify-between gap-1 text-sm sm:flex-row sm:gap-4"
                                        >
                                            <span className="text-muted-foreground">{label}</span>
                                            <span className="break-words font-medium sm:text-right">
                                                {value}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setSelectedFee(null)}
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
