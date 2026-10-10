// import React from 'react'

// export default function receipts() {
//     return (
//         <div>receipts</div>
//     )
// }












"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
    Search,
    Receipt,
    Download,
    Printer,
    Eye,
    CalendarDays,
    CheckCircle2,
    Clock3,
    Wallet,
    ArrowDownToLine,
    ChevronLeft,
    ChevronRight,
    FileText,
    X,
} from "lucide-react";

type ReceiptStatus = "ISSUED" | "PENDING" | "CANCELLED";

type ReceiptRecord = {
    id: string;
    receiptNumber: string;
    paymentId: string;
    invoiceNumber: string;
    studentName: string;
    studentId: string;
    description: string;
    amount: number;
    method: string;
    issuedAt: string;
    status: ReceiptStatus;
};

const initialReceipts: ReceiptRecord[] = [
    {
        id: "1",
        receiptNumber: "RCP-2026-1042",
        paymentId: "PAY-2026-1042",
        invoiceNumber: "INV-2026-0081",
        studentName: "Ayan Sujon",
        studentId: "STU-2026-0012",
        description: "Semester Tuition Fee",
        amount: 25000,
        method: "SSLCommerz",
        issuedAt: "2026-10-10",
        status: "ISSUED",
    },
    {
        id: "2",
        receiptNumber: "RCP-2026-1041",
        paymentId: "PAY-2026-1041",
        invoiceNumber: "INV-2026-0080",
        studentName: "Nusrat Jahan",
        studentId: "STU-2025-0048",
        description: "Examination Fee",
        amount: 12500,
        method: "bKash",
        issuedAt: "2026-10-09",
        status: "ISSUED",
    },
    {
        id: "3",
        receiptNumber: "RCP-2026-1040",
        paymentId: "PAY-2026-1040",
        invoiceNumber: "INV-2026-0079",
        studentName: "Rahim Ahmed",
        studentId: "STU-2024-0091",
        description: "Laboratory Fee",
        amount: 18000,
        method: "Bank Transfer",
        issuedAt: "2026-10-08",
        status: "ISSUED",
    },
    {
        id: "4",
        receiptNumber: "RCP-2026-1039",
        paymentId: "PAY-2026-1039",
        invoiceNumber: "INV-2026-0078",
        studentName: "Maliha Islam",
        studentId: "STU-2026-0035",
        description: "Library Fee",
        amount: 8000,
        method: "Card",
        issuedAt: "2026-10-07",
        status: "PENDING",
    },
    {
        id: "5",
        receiptNumber: "RCP-2026-1038",
        paymentId: "PAY-2026-1038",
        invoiceNumber: "INV-2026-0077",
        studentName: "Tanvir Hasan",
        studentId: "STU-2025-0021",
        description: "Semester Tuition Fee",
        amount: 35000,
        method: "SSLCommerz",
        issuedAt: "2026-10-05",
        status: "ISSUED",
    },
    {
        id: "6",
        receiptNumber: "RCP-2026-1037",
        paymentId: "PAY-2026-1037",
        invoiceNumber: "INV-2026-0076",
        studentName: "Sadia Akter",
        studentId: "STU-2024-0063",
        description: "Admission Fee",
        amount: 15000,
        method: "Bank Transfer",
        issuedAt: "2026-10-03",
        status: "CANCELLED",
    },
];

const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT",
        maximumFractionDigits: 0,
    }).format(amount);

const formatDate = (date: string) =>
    new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

function StatusBadge({ status }: { status: ReceiptStatus }) {
    const styles: Record<ReceiptStatus, string> = {
        ISSUED:
            "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
        PENDING:
            "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
        CANCELLED:
            "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400",
    };

    const Icon =
        status === "ISSUED"
            ? CheckCircle2
            : status === "PENDING"
                ? Clock3
                : X;

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${styles[status]}`}
        >
            <Icon size={13} />
            {status.charAt(0) + status.slice(1).toLowerCase()}
        </span>
    );
}

function SummaryCard({
    title,
    value,
    description,
    icon: Icon,
    color,
}: {
    title: string;
    value: string;
    description: string;
    icon: React.ElementType;
    color: string;
}) {
    return (
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
                <div className={`flex size-11 items-center justify-center rounded-xl ${color}`}>
                    <Icon size={21} />
                </div>
            </div>
            <p className="mt-5 text-sm text-muted-foreground">{title}</p>
            <p className="mt-1 text-2xl font-bold tracking-tight">{value}</p>
            <p className="mt-2 text-xs text-muted-foreground">{description}</p>
        </div>
    );
}

export default function Receipts() {
    const [receipts] = useState<ReceiptRecord[]>(initialReceipts);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [methodFilter, setMethodFilter] = useState("ALL");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [page, setPage] = useState(1);
    const [selectedReceipt, setSelectedReceipt] =
        useState<ReceiptRecord | null>(null);

    const pageSize = 5;

    const filteredReceipts = useMemo(() => {
        const query = search.trim().toLowerCase();

        return receipts.filter((receipt) => {
            const matchesSearch =
                !query ||
                [
                    receipt.receiptNumber,
                    receipt.paymentId,
                    receipt.invoiceNumber,
                    receipt.studentName,
                    receipt.studentId,
                ].some((value) => value.toLowerCase().includes(query));

            const matchesStatus =
                statusFilter === "ALL" || receipt.status === statusFilter;

            const matchesMethod =
                methodFilter === "ALL" || receipt.method === methodFilter;

            const matchesStart = !startDate || receipt.issuedAt >= startDate;
            const matchesEnd = !endDate || receipt.issuedAt <= endDate;

            return (
                matchesSearch &&
                matchesStatus &&
                matchesMethod &&
                matchesStart &&
                matchesEnd
            );
        });
    }, [receipts, search, statusFilter, methodFilter, startDate, endDate]);

    const totalPages = Math.max(1, Math.ceil(filteredReceipts.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const paginatedReceipts = filteredReceipts.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const issuedReceipts = receipts.filter((r) => r.status === "ISSUED");
    const pendingReceipts = receipts.filter((r) => r.status === "PENDING");
    const issuedTotal = issuedReceipts.reduce((sum, r) => sum + r.amount, 0);

    const resetFilters = () => {
        setSearch("");
        setStatusFilter("ALL");
        setMethodFilter("ALL");
        setStartDate("");
        setEndDate("");
        setPage(1);
    };

    const exportCSV = () => {
        const escapeCSV = (value: string | number) =>
            `"${String(value).replace(/"/g, '""')}"`;

        const headers = [
            "Receipt Number",
            "Payment ID",
            "Invoice Number",
            "Student Name",
            "Student ID",
            "Description",
            "Amount",
            "Payment Method",
            "Issued Date",
            "Status",
        ];

        const rows = filteredReceipts.map((r) => [
            r.receiptNumber,
            r.paymentId,
            r.invoiceNumber,
            r.studentName,
            r.studentId,
            r.description,
            r.amount,
            r.method,
            r.issuedAt,
            r.status,
        ]);

        const csv = [headers, ...rows]
            .map((row) => row.map(escapeCSV).join(","))
            .join("\r\n");

        const blob = new Blob(["\uFEFF" + csv], {
            type: "text/csv;charset=utf-8;",
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "campusflow-receipts.csv";
        link.click();
        URL.revokeObjectURL(url);
    };

    const printReceipt = (receipt: ReceiptRecord) => {
        const printWindow = window.open("", "_blank", "width=800,height=700");

        if (!printWindow) {
            window.alert("Please allow pop-ups to print the receipt.");
            return;
        }

        printWindow.document.write(`
      <!doctype html>
      <html>
        <head>
          <title>${receipt.receiptNumber}</title>
          <meta charset="utf-8" />
          <style>
            body { font-family: Arial, sans-serif; max-width: 700px; margin: 40px auto; padding: 24px; color: #172033; }
            .header { text-align: center; border-bottom: 2px solid #1e3a8a; padding-bottom: 20px; }
            .header h1 { color: #1e3a8a; margin-bottom: 6px; }
            .badge { display: inline-block; padding: 6px 12px; background: #dcfce7; color: #166534; border-radius: 20px; font-size: 12px; }
            table { width: 100%; border-collapse: collapse; margin-top: 24px; }
            td { border: 1px solid #e2e8f0; padding: 13px; font-size: 14px; }
            td:first-child { background: #f8fafc; font-weight: bold; width: 40%; }
            .amount { font-size: 24px; font-weight: bold; color: #1e3a8a; }
            .footer { margin-top: 36px; padding-top: 16px; border-top: 1px solid #ddd; font-size: 12px; color: #64748b; text-align: center; }
            @media print { body { margin: 0 auto; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>CampusFlow University</h1>
            <p>Official Payment Receipt</p>
            <span class="badge">${receipt.status}</span>
          </div>
          <h2>Receipt Details</h2>
          <p class="amount">${formatCurrency(receipt.amount)}</p>
          <table>
            <tr><td>Receipt Number</td><td>${receipt.receiptNumber}</td></tr>
            <tr><td>Payment ID</td><td>${receipt.paymentId}</td></tr>
            <tr><td>Invoice Number</td><td>${receipt.invoiceNumber}</td></tr>
            <tr><td>Student Name</td><td>${receipt.studentName}</td></tr>
            <tr><td>Student ID</td><td>${receipt.studentId}</td></tr>
            <tr><td>Description</td><td>${receipt.description}</td></tr>
            <tr><td>Payment Method</td><td>${receipt.method}</td></tr>
            <tr><td>Issued Date</td><td>${formatDate(receipt.issuedAt)}</td></tr>
          </table>
          <div class="footer">
            This receipt was generated from the CampusFlow demo interface.
            An official receipt must be validated against the university payment records.
          </div>
          <script>window.onload = () => { window.print(); };</script>
        </body>
      </html>
    `);

        printWindow.document.close();
    };

    return (
        <main className="min-h-screen bg-background text-foreground">
            <div className="mx-auto max-w-[1600px] space-y-7 p-4 sm:p-6 lg:p-8">
                {/* Header */}
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>

                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            Payment Receipts
                        </h1>
                        <p className="mt-2 text-sm text-muted-foreground">
                            View, search, export and print student payment receipts.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={exportCSV}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground hover:opacity-90"
                    >
                        <Download size={16} />
                        Export CSV
                    </button>
                </div>

                {/* Summary */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <SummaryCard
                        title="Total Receipts"
                        value={String(receipts.length)}
                        description="All recorded receipts"
                        icon={Receipt}
                        color="bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400"
                    />
                    <SummaryCard
                        title="Issued Receipts"
                        value={String(issuedReceipts.length)}
                        description="Receipts for recorded payments"
                        icon={CheckCircle2}
                        color="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                    />
                    <SummaryCard
                        title="Pending Receipts"
                        value={String(pendingReceipts.length)}
                        description="Awaiting payment confirmation"
                        icon={Clock3}
                        color="bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400"
                    />
                    <SummaryCard
                        title="Issued Amount"
                        value={formatCurrency(issuedTotal)}
                        description="Total value of issued demo receipts"
                        icon={Wallet}
                        color="bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-400"
                    />
                </div>

                {/* Receipt Table */}
                <section className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                    <div className="border-b border-border p-5">
                        <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
                            <div>
                                <h2 className="text-base font-semibold">All Receipts</h2>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {filteredReceipts.length} receipt(s) found
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Link
                                    href="/accountant/payments"
                                    className="inline-flex h-9 items-center gap-2 rounded-lg border border-border px-3 text-sm font-medium hover:bg-muted"
                                >
                                    <Wallet size={15} />
                                    Payments
                                </Link>
                                <Link
                                    href="/accountant/invoices"
                                    className="inline-flex h-9 items-center gap-2 rounded-lg border border-border px-3 text-sm font-medium hover:bg-muted"
                                >
                                    <FileText size={15} />
                                    Invoices
                                </Link>
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
                            <div className="relative sm:col-span-2 xl:col-span-2">
                                <Search
                                    size={16}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                />
                                <input
                                    type="search"
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                        setPage(1);
                                    }}
                                    placeholder="Search receipt, student or invoice..."
                                    className="h-10 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                                />
                            </div>

                            <select
                                value={statusFilter}
                                onChange={(e) => {
                                    setStatusFilter(e.target.value);
                                    setPage(1);
                                }}
                                className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary"
                                aria-label="Filter by receipt status"
                            >
                                <option value="ALL">All statuses</option>
                                <option value="ISSUED">Issued</option>
                                <option value="PENDING">Pending</option>
                                <option value="CANCELLED">Cancelled</option>
                            </select>

                            <select
                                value={methodFilter}
                                onChange={(e) => {
                                    setMethodFilter(e.target.value);
                                    setPage(1);
                                }}
                                className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary"
                                aria-label="Filter by payment method"
                            >
                                <option value="ALL">All methods</option>
                                <option value="SSLCommerz">SSLCommerz</option>
                                <option value="bKash">bKash</option>
                                <option value="Bank Transfer">Bank Transfer</option>
                                <option value="Card">Card</option>
                            </select>

                            <button
                                type="button"
                                onClick={resetFilters}
                                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border px-3 text-sm font-medium hover:bg-muted"
                            >
                                <X size={15} />
                                Reset Filters
                            </button>
                        </div>

                        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <label className="flex items-center gap-2 text-sm text-muted-foreground">
                                <CalendarDays size={16} />
                                From
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => {
                                        setStartDate(e.target.value);
                                        setPage(1);
                                    }}
                                    className="h-9 min-w-0 flex-1 rounded-lg border border-border bg-background px-2 text-sm text-foreground"
                                />
                            </label>
                            <label className="flex items-center gap-2 text-sm text-muted-foreground">
                                <CalendarDays size={16} />
                                To
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => {
                                        setEndDate(e.target.value);
                                        setPage(1);
                                    }}
                                    className="h-9 min-w-0 flex-1 rounded-lg border border-border bg-background px-2 text-sm text-foreground"
                                />
                            </label>
                        </div>
                    </div>

                    {/* Responsive Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1050px] text-left text-sm">
                            <thead>
                                <tr className="border-b border-border bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                                    <th className="px-5 py-4 font-medium">Receipt</th>
                                    <th className="px-5 py-4 font-medium">Student</th>
                                    <th className="px-5 py-4 font-medium">Invoice / Payment</th>
                                    <th className="px-5 py-4 font-medium">Method</th>
                                    <th className="px-5 py-4 font-medium">Issued Date</th>
                                    <th className="px-5 py-4 font-medium">Amount</th>
                                    <th className="px-5 py-4 font-medium">Status</th>
                                    <th className="px-5 py-4 text-right font-medium">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {paginatedReceipts.map((receipt) => (
                                    <tr
                                        key={receipt.id}
                                        className="border-b border-border last:border-0 transition hover:bg-muted/30"
                                    >
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                                    <Receipt size={18} />
                                                </div>
                                                <span className="font-semibold">
                                                    {receipt.receiptNumber}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <p className="font-semibold">{receipt.studentName}</p>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {receipt.studentId}
                                            </p>
                                        </td>
                                        <td className="px-5 py-4">
                                            <p className="font-medium">{receipt.invoiceNumber}</p>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {receipt.paymentId}
                                            </p>
                                        </td>
                                        <td className="px-5 py-4 text-muted-foreground">
                                            {receipt.method}
                                        </td>
                                        <td className="px-5 py-4 text-muted-foreground">
                                            {formatDate(receipt.issuedAt)}
                                        </td>
                                        <td className="px-5 py-4 font-semibold">
                                            {formatCurrency(receipt.amount)}
                                        </td>
                                        <td className="px-5 py-4">
                                            <StatusBadge status={receipt.status} />
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center justify-end gap-1">
                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedReceipt(receipt)}
                                                    title="View receipt"
                                                    aria-label={`View ${receipt.receiptNumber}`}
                                                    className="inline-flex size-9 items-center justify-center rounded-lg border border-border hover:bg-muted"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => printReceipt(receipt)}
                                                    title="Print receipt"
                                                    aria-label={`Print ${receipt.receiptNumber}`}
                                                    disabled={receipt.status !== "ISSUED"}
                                                    className="inline-flex size-9 items-center justify-center rounded-lg border border-border hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                                                >
                                                    <Printer size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {paginatedReceipts.length === 0 && (
                                    <tr>
                                        <td colSpan={8} className="px-5 py-16 text-center">
                                            <Receipt
                                                size={32}
                                                className="mx-auto mb-3 text-muted-foreground"
                                            />
                                            <p className="font-semibold">No receipts found</p>
                                            <p className="mt-1 text-sm text-muted-foreground">
                                                Try changing your search or filters.
                                            </p>
                                            <button
                                                type="button"
                                                onClick={resetFilters}
                                                className="mt-4 text-sm font-semibold text-primary hover:underline"
                                            >
                                                Clear all filters
                                            </button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-col gap-3 border-t border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-muted-foreground">
                            Showing{" "}
                            {filteredReceipts.length === 0
                                ? 0
                                : (currentPage - 1) * pageSize + 1}
                            {" "}to{" "}
                            {Math.min(currentPage * pageSize, filteredReceipts.length)}
                            {" "}of {filteredReceipts.length} receipts
                        </p>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                disabled={currentPage <= 1}
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                className="inline-flex h-9 items-center gap-1 rounded-lg border border-border px-3 text-sm hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <ChevronLeft size={16} />
                                Previous
                            </button>
                            <span className="px-2 text-sm font-medium">
                                {currentPage} / {totalPages}
                            </span>
                            <button
                                type="button"
                                disabled={currentPage >= totalPages}
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                className="inline-flex h-9 items-center gap-1 rounded-lg border border-border px-3 text-sm hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Next
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </section>

                {/* Receipt Details Dialog */}
                {selectedReceipt && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                        onMouseDown={(e) => {
                            if (e.target === e.currentTarget) setSelectedReceipt(null);
                        }}
                    >
                        <div
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="receipt-dialog-title"
                            className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-border bg-card p-5 shadow-2xl sm:p-7"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                        <Receipt size={24} />
                                    </div>
                                    <div>
                                        <h2 id="receipt-dialog-title" className="text-lg font-bold">
                                            Receipt Details
                                        </h2>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {selectedReceipt.receiptNumber}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setSelectedReceipt(null)}
                                    aria-label="Close receipt details"
                                    className="flex size-9 items-center justify-center rounded-lg border border-border hover:bg-muted"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="mt-6 rounded-xl bg-muted/50 p-5 text-center">
                                <p className="text-sm text-muted-foreground">
                                    Receipt Amount
                                </p>
                                <p className="mt-2 text-3xl font-bold">
                                    {formatCurrency(selectedReceipt.amount)}
                                </p>
                                <div className="mt-3">
                                    <StatusBadge status={selectedReceipt.status} />
                                </div>
                            </div>

                            <div className="mt-5 divide-y divide-border rounded-xl border border-border px-4">
                                {[
                                    ["Student", selectedReceipt.studentName],
                                    ["Student ID", selectedReceipt.studentId],
                                    ["Receipt Number", selectedReceipt.receiptNumber],
                                    ["Invoice Number", selectedReceipt.invoiceNumber],
                                    ["Payment ID", selectedReceipt.paymentId],
                                    ["Description", selectedReceipt.description],
                                    ["Payment Method", selectedReceipt.method],
                                    ["Issued Date", formatDate(selectedReceipt.issuedAt)],
                                ].map(([label, value]) => (
                                    <div
                                        key={label}
                                        className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between"
                                    >
                                        <span className="text-sm text-muted-foreground">
                                            {label}
                                        </span>
                                        <span className="break-all text-sm font-semibold sm:text-right">
                                            {value}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 flex flex-wrap justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setSelectedReceipt(null)}
                                    className="h-10 rounded-lg border border-border px-4 text-sm font-medium hover:bg-muted"
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    disabled={selectedReceipt.status !== "ISSUED"}
                                    onClick={() => printReceipt(selectedReceipt)}
                                    className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <ArrowDownToLine size={16} />
                                    Print / Save PDF
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
