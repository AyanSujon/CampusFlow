// import React from 'react'

// export default function Payments() {
//     return (
//         <div>payments</div>
//     )
// }





"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
    ArrowDownUp,
    ArrowRight,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Clock3,
    CreditCard,
    Eye,
    FileText,
    Filter,
    Search,
    ShieldCheck,
    Wallet,
    X,
    XCircle,
} from "lucide-react";

type PaymentStatus =
    | "VERIFIED"
    | "RECEIVED"
    | "PENDING"
    | "FAILED"
    | "REFUNDED";

type PaymentMethod =
    | "BANK_TRANSFER"
    | "CARD"
    | "BKASH"
    | "NAGAD"
    | "CASH"
    | "SSLCOMMERZ";

type Payment = {
    id: string;
    transactionId: string;
    studentId: string;
    studentName: string;
    studentEmail: string;
    invoiceNumber: string;
    amount: number;
    method: PaymentMethod;
    status: PaymentStatus;
    paidAt: string | null;
    createdAt: string;
    gateway: string;
};

const demoPayments: Payment[] = [
    {
        id: "pay-001",
        transactionId: "TXN-CF-2026-1001",
        studentId: "STU-2025-CSE-0001",
        studentName: "Arif Rahman",
        studentEmail: "arif.rahman@example.com",
        invoiceNumber: "INV-2026-001",
        amount: 25000,
        method: "SSLCOMMERZ",
        status: "VERIFIED",
        paidAt: "2026-10-09T09:30:00",
        createdAt: "2026-10-09T09:25:00",
        gateway: "SSLCOMMERZ",
    },
    {
        id: "pay-002",
        transactionId: "TXN-CF-2026-1002",
        studentId: "STU-2025-CSE-0002",
        studentName: "Nusrat Jahan",
        studentEmail: "nusrat.jahan@example.com",
        invoiceNumber: "INV-2026-002",
        amount: 15000,
        method: "BKASH",
        status: "RECEIVED",
        paidAt: "2026-10-08T14:20:00",
        createdAt: "2026-10-08T14:15:00",
        gateway: "bKash",
    },
    {
        id: "pay-003",
        transactionId: "TXN-CF-2026-1003",
        studentId: "STU-2025-CSE-0003",
        studentName: "Tanvir Hasan",
        studentEmail: "tanvir.hasan@example.com",
        invoiceNumber: "INV-2026-003",
        amount: 12000,
        method: "BANK_TRANSFER",
        status: "PENDING",
        paidAt: null,
        createdAt: "2026-10-08T11:10:00",
        gateway: "Bank transfer",
    },
    {
        id: "pay-004",
        transactionId: "TXN-CF-2026-1004",
        studentId: "STU-2025-BBA-0004",
        studentName: "Sadia Islam",
        studentEmail: "sadia.islam@example.com",
        invoiceNumber: "INV-2026-004",
        amount: 18000,
        method: "CARD",
        status: "VERIFIED",
        paidAt: "2026-10-07T12:00:00",
        createdAt: "2026-10-07T11:55:00",
        gateway: "Card payment",
    },
    {
        id: "pay-005",
        transactionId: "TXN-CF-2026-1005",
        studentId: "STU-2025-EEE-0005",
        studentName: "Mahmudul Karim",
        studentEmail: "mahmudul.karim@example.com",
        invoiceNumber: "INV-2026-005",
        amount: 8000,
        method: "NAGAD",
        status: "FAILED",
        paidAt: null,
        createdAt: "2026-10-06T16:45:00",
        gateway: "Nagad",
    },
    {
        id: "pay-006",
        transactionId: "TXN-CF-2026-1006",
        studentId: "STU-2025-CSE-0006",
        studentName: "Farhana Akter",
        studentEmail: "farhana.akter@example.com",
        invoiceNumber: "INV-2026-006",
        amount: 10000,
        method: "CASH",
        status: "RECEIVED",
        paidAt: "2026-10-06T10:15:00",
        createdAt: "2026-10-06T10:15:00",
        gateway: "Cash counter",
    },
    {
        id: "pay-007",
        transactionId: "TXN-CF-2026-1007",
        studentId: "STU-2025-BBA-0007",
        studentName: "Sabbir Ahmed",
        studentEmail: "sabbir.ahmed@example.com",
        invoiceNumber: "INV-2026-007",
        amount: 22000,
        method: "SSLCOMMERZ",
        status: "REFUNDED",
        paidAt: "2026-10-04T09:00:00",
        createdAt: "2026-10-04T08:55:00",
        gateway: "SSLCOMMERZ",
    },
    {
        id: "pay-008",
        transactionId: "TXN-CF-2026-1008",
        studentId: "STU-2025-EEE-0008",
        studentName: "Mim Chowdhury",
        studentEmail: "mim.chowdhury@example.com",
        invoiceNumber: "INV-2026-008",
        amount: 12500,
        method: "BKASH",
        status: "VERIFIED",
        paidAt: "2026-10-03T13:30:00",
        createdAt: "2026-10-03T13:25:00",
        gateway: "bKash",
    },
];

const PAGE_SIZE = 5;

function formatCurrency(amount: number) {
    return new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT",
        maximumFractionDigits: 2,
    }).format(amount);
}

function formatDate(date: string | null) {
    if (!date) return "Not completed";

    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(date));
}

function getStatusStyle(status: PaymentStatus) {
    switch (status) {
        case "VERIFIED":
            return "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-400/20";
        case "RECEIVED":
            return "bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-500/10 dark:text-blue-400 dark:ring-blue-400/20";
        case "PENDING":
            return "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-400/20";
        case "FAILED":
            return "bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-400/20";
        case "REFUNDED":
            return "bg-purple-50 text-purple-700 ring-purple-600/20 dark:bg-purple-500/10 dark:text-purple-400 dark:ring-purple-400/20";
        default:
            return "bg-muted text-muted-foreground ring-border";
    }
}

function getMethodLabel(method: PaymentMethod) {
    const labels: Record<PaymentMethod, string> = {
        BANK_TRANSFER: "Bank Transfer",
        CARD: "Card",
        BKASH: "bKash",
        NAGAD: "Nagad",
        CASH: "Cash",
        SSLCOMMERZ: "SSLCOMMERZ",
    };

    return labels[method];
}

export default function Payments() {
    const [payments] = useState<Payment[]>(demoPayments);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [methodFilter, setMethodFilter] = useState("ALL");
    const [dateFilter, setDateFilter] = useState("ALL");
    const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

    const filteredPayments = useMemo(() => {
        const search = searchTerm.trim().toLowerCase();
        const now = new Date();

        return payments
            .filter((payment) => {
                const matchesSearch =
                    !search ||
                    payment.studentName.toLowerCase().includes(search) ||
                    payment.studentId.toLowerCase().includes(search) ||
                    payment.studentEmail.toLowerCase().includes(search) ||
                    payment.transactionId.toLowerCase().includes(search) ||
                    payment.invoiceNumber.toLowerCase().includes(search);

                const matchesStatus =
                    statusFilter === "ALL" || payment.status === statusFilter;

                const matchesMethod =
                    methodFilter === "ALL" || payment.method === methodFilter;

                const paymentDate = new Date(payment.createdAt);
                const ageInDays =
                    (now.getTime() - paymentDate.getTime()) / (1000 * 60 * 60 * 24);

                const matchesDate =
                    dateFilter === "ALL" ||
                    (dateFilter === "7_DAYS" && ageInDays <= 7 && ageInDays >= 0) ||
                    (dateFilter === "30_DAYS" && ageInDays <= 30 && ageInDays >= 0);

                return (
                    matchesSearch &&
                    matchesStatus &&
                    matchesMethod &&
                    matchesDate
                );
            })
            .sort((a, b) => {
                const first = new Date(a.createdAt).getTime();
                const second = new Date(b.createdAt).getTime();

                return sortOrder === "newest" ? second - first : first - second;
            });
    }, [payments, searchTerm, statusFilter, methodFilter, dateFilter, sortOrder]);

    const totalPages = Math.max(1, Math.ceil(filteredPayments.length / PAGE_SIZE));
    const safePage = Math.min(currentPage, totalPages);

    const paginatedPayments = filteredPayments.slice(
        (safePage - 1) * PAGE_SIZE,
        safePage * PAGE_SIZE,
    );

    const verifiedAmount = payments
        .filter((payment) => payment.status === "VERIFIED")
        .reduce((total, payment) => total + payment.amount, 0);

    const receivedAmount = payments
        .filter((payment) => payment.status === "RECEIVED")
        .reduce((total, payment) => total + payment.amount, 0);

    const pendingCount = payments.filter(
        (payment) => payment.status === "PENDING",
    ).length;

    const failedCount = payments.filter(
        (payment) => payment.status === "FAILED",
    ).length;

    function resetFilters() {
        setSearchTerm("");
        setStatusFilter("ALL");
        setMethodFilter("ALL");
        setDateFilter("ALL");
        setSortOrder("newest");
        setCurrentPage(1);
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="mx-auto space-y-6 p-3">
                {/* Page heading */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>

                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            Payments Management
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                            Monitor student payments, review transactions, and track
                            verification statuses across your university.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 self-start rounded-xl border bg-card px-3 py-2 text-sm text-muted-foreground sm:self-auto">
                        <ShieldCheck className="h-4 w-4 text-emerald-600" />
                        <span>Financial Overview</span>
                    </div>
                </div>

                {/* Summary cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-2xl border bg-card p-5 shadow-sm">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Verified Payments
                                </p>
                                <h2 className="mt-3 text-2xl font-bold">
                                    {formatCurrency(verifiedAmount)}
                                </h2>
                                <p className="mt-2 text-xs text-muted-foreground">
                                    Confirmed transactions
                                </p>
                            </div>
                            <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-600">
                                <CheckCircle2 className="h-5 w-5" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border bg-card p-5 shadow-sm">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Received Payments
                                </p>
                                <h2 className="mt-3 text-2xl font-bold">
                                    {formatCurrency(receivedAmount)}
                                </h2>
                                <p className="mt-2 text-xs text-muted-foreground">
                                    Awaiting final verification
                                </p>
                            </div>
                            <div className="rounded-xl bg-blue-500/10 p-3 text-blue-600">
                                <Wallet className="h-5 w-5" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border bg-card p-5 shadow-sm">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Pending Payments
                                </p>
                                <h2 className="mt-3 text-2xl font-bold">{pendingCount}</h2>
                                <p className="mt-2 text-xs text-muted-foreground">
                                    Require follow-up
                                </p>
                            </div>
                            <div className="rounded-xl bg-amber-500/10 p-3 text-amber-600">
                                <Clock3 className="h-5 w-5" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border bg-card p-5 shadow-sm">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Failed Payments
                                </p>
                                <h2 className="mt-3 text-2xl font-bold">{failedCount}</h2>
                                <p className="mt-2 text-xs text-muted-foreground">
                                    Unsuccessful transactions
                                </p>
                            </div>
                            <div className="rounded-xl bg-red-500/10 p-3 text-red-600">
                                <XCircle className="h-5 w-5" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="rounded-2xl border bg-card shadow-sm">
                    <div className="flex flex-col gap-3 border-b p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className="font-semibold">Payment Transactions</h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Search and filter payment records.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={resetFilters}
                            className="inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                        >
                            <Filter className="h-4 w-4" />
                            Reset filters
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 sm:p-5">
                        <div className="relative sm:col-span-2 xl:col-span-2">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="search"
                                value={searchTerm}
                                onChange={(event) => {
                                    setSearchTerm(event.target.value);
                                    setCurrentPage(1);
                                }}
                                placeholder="Search student, transaction, invoice..."
                                className="h-10 w-full rounded-lg border bg-background pl-9 pr-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                            />
                        </div>

                        <select
                            value={statusFilter}
                            onChange={(event) => {
                                setStatusFilter(event.target.value);
                                setCurrentPage(1);
                            }}
                            className="h-10 rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
                            aria-label="Filter by payment status"
                        >
                            <option value="ALL">All statuses</option>
                            <option value="VERIFIED">Verified</option>
                            <option value="RECEIVED">Received</option>
                            <option value="PENDING">Pending</option>
                            <option value="FAILED">Failed</option>
                            <option value="REFUNDED">Refunded</option>
                        </select>

                        <select
                            value={methodFilter}
                            onChange={(event) => {
                                setMethodFilter(event.target.value);
                                setCurrentPage(1);
                            }}
                            className="h-10 rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
                            aria-label="Filter by payment method"
                        >
                            <option value="ALL">All methods</option>
                            <option value="SSLCOMMERZ">SSLCOMMERZ</option>
                            <option value="BKASH">bKash</option>
                            <option value="NAGAD">Nagad</option>
                            <option value="CARD">Card</option>
                            <option value="BANK_TRANSFER">Bank transfer</option>
                            <option value="CASH">Cash</option>
                        </select>

                        <select
                            value={dateFilter}
                            onChange={(event) => {
                                setDateFilter(event.target.value);
                                setCurrentPage(1);
                            }}
                            className="h-10 rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
                            aria-label="Filter by date"
                        >
                            <option value="ALL">All dates</option>
                            <option value="7_DAYS">Last 7 days</option>
                            <option value="30_DAYS">Last 30 days</option>
                        </select>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1000px] 2xl:min-w-0 table-fixed text-left text-sm">
                            <thead className="border-y bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                                <tr>
                                    <th className="px-5 py-4 font-semibold">Student</th>
                                    <th className="px-5 py-4 font-semibold">Transaction</th>
                                    <th className="px-5 py-4 font-semibold">Invoice</th>
                                    <th className="px-5 py-4 font-semibold">Payment Method</th>
                                    <th className="px-5 py-4 font-semibold">Amount</th>
                                    <th className="px-5 py-4 font-semibold">Status</th>
                                    <th className="px-5 py-4 font-semibold">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSortOrder((current) =>
                                                    current === "newest" ? "oldest" : "newest",
                                                );
                                                setCurrentPage(1);
                                            }}
                                            className="inline-flex items-center gap-2 hover:text-foreground"
                                        >
                                            Date
                                            <ArrowDownUp className="h-3.5 w-3.5" />
                                        </button>
                                    </th>
                                    <th className="px-5 py-4 text-right font-semibold">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y">
                                {paginatedPayments.map((payment) => (
                                    <tr
                                        key={payment.id}
                                        className="transition-colors hover:bg-muted/30"
                                    >
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                                                    {payment.studentName
                                                        .split(" ")
                                                        .map((part) => part[0])
                                                        .slice(0, 2)
                                                        .join("")}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-medium">{payment.studentName}</p>
                                                    <p className="mt-1 text-xs text-muted-foreground">
                                                        {payment.studentId}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-5 py-4">
                                            <p className="font-medium">{payment.transactionId}</p>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {payment.gateway}
                                            </p>
                                        </td>

                                        <td className="px-5 py-4">
                                            <Link
                                                href={`/ accountant / invoices ? search = ${encodeURIComponent(payment.invoiceNumber)} `}
                                                className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                                            >
                                                <FileText className="h-3.5 w-3.5" />
                                                {payment.invoiceNumber}
                                            </Link>
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-2">
                                                <CreditCard className="h-4 w-4 text-muted-foreground" />
                                                <span>{getMethodLabel(payment.method)}</span>
                                            </div>
                                        </td>

                                        <td className="whitespace-nowrap px-5 py-4 font-semibold">
                                            {formatCurrency(payment.amount)}
                                        </td>

                                        <td className="px-5 py-4">
                                            <span
                                                className={`inline - flex items - center rounded - full px - 2.5 py - 1 text - xs font - semibold ring - 1 ring - inset ${getStatusStyle(payment.status)} `}
                                            >
                                                {payment.status}
                                            </span>
                                        </td>

                                        <td className="whitespace-nowrap px-5 py-4 text-muted-foreground">
                                            {formatDate(payment.createdAt)}
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex justify-end">
                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedPayment(payment)}
                                                    aria-label={`View ${payment.transactionId} `}
                                                    className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-colors hover:bg-muted"
                                                >
                                                    <Eye className="h-3.5 w-3.5" />
                                                    View
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {paginatedPayments.length === 0 && (
                                    <tr>
                                        <td colSpan={8} className="px-5 py-16 text-center">
                                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                                                <Search className="h-5 w-5 text-muted-foreground" />
                                            </div>
                                            <p className="mt-3 font-medium">No payments found</p>
                                            <p className="mt-1 text-sm text-muted-foreground">
                                                Try changing your search or filters.
                                            </p>
                                            <button
                                                type="button"
                                                onClick={resetFilters}
                                                className="mt-4 text-sm font-medium text-primary hover:underline"
                                            >
                                                Clear filters
                                            </button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-col gap-3 border-t px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                        <p className="text-sm text-muted-foreground">
                            Showing{" "}
                            <span className="font-medium text-foreground">
                                {filteredPayments.length === 0
                                    ? 0
                                    : (safePage - 1) * PAGE_SIZE + 1}
                            </span>{" "}
                            to{" "}
                            <span className="font-medium text-foreground">
                                {Math.min(safePage * PAGE_SIZE, filteredPayments.length)}
                            </span>{" "}
                            of{" "}
                            <span className="font-medium text-foreground">
                                {filteredPayments.length}
                            </span>{" "}
                            payments
                        </p>

                        <div className="flex items-center justify-between gap-2 sm:justify-end">
                            <button
                                type="button"
                                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                                disabled={safePage <= 1}
                                className="inline-flex h-9 items-center gap-1 rounded-lg border px-3 text-sm transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Previous
                            </button>

                            <span className="px-2 text-sm text-muted-foreground">
                                Page {safePage} of {totalPages}
                            </span>

                            <button
                                type="button"
                                onClick={() =>
                                    setCurrentPage((page) => Math.min(totalPages, page + 1))
                                }
                                disabled={safePage >= totalPages}
                                className="inline-flex h-9 items-center gap-1 rounded-lg border px-3 text-sm transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Next
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment details dialog */}
            {selectedPayment && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm"
                    onClick={() => setSelectedPayment(null)}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="payment-dialog-title"
                        className="my-auto w-full max-w-xl overflow-hidden rounded-2xl border bg-background shadow-2xl"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="flex items-start justify-between gap-4 border-b p-5 sm:p-6">
                            <div>
                                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <CreditCard className="h-5 w-5" />
                                </div>
                                <h2
                                    id="payment-dialog-title"
                                    className="text-xl font-bold"
                                >
                                    Payment Details
                                </h2>
                                <p className="mt-1 break-all text-sm text-muted-foreground">
                                    {selectedPayment.transactionId}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setSelectedPayment(null)}
                                aria-label="Close payment details"
                                className="rounded-lg p-2 transition-colors hover:bg-muted"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="space-y-5 p-5 sm:p-6">
                            <div className="rounded-xl border bg-muted/30 p-4">
                                <p className="text-sm text-muted-foreground">
                                    Payment amount
                                </p>
                                <p className="mt-2 text-3xl font-bold">
                                    {formatCurrency(selectedPayment.amount)}
                                </p>
                                <span
                                    className={`mt - 3 inline - flex rounded - full px - 2.5 py - 1 text - xs font - semibold ring - 1 ring - inset ${getStatusStyle(selectedPayment.status)} `}
                                >
                                    {selectedPayment.status}
                                </span>
                            </div>

                            <div>
                                <h3 className="mb-3 text-sm font-semibold">
                                    Student Information
                                </h3>
                                <div className="grid gap-4 rounded-xl border p-4 sm:grid-cols-2">
                                    <div>
                                        <p className="text-xs text-muted-foreground">
                                            Student name
                                        </p>
                                        <p className="mt-1 text-sm font-medium">
                                            {selectedPayment.studentName}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">
                                            Student ID
                                        </p>
                                        <p className="mt-1 break-all text-sm font-medium">
                                            {selectedPayment.studentId}
                                        </p>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <p className="text-xs text-muted-foreground">Email</p>
                                        <p className="mt-1 break-all text-sm font-medium">
                                            {selectedPayment.studentEmail}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-3 text-sm font-semibold">
                                    Transaction Information
                                </h3>
                                <div className="grid gap-4 rounded-xl border p-4 sm:grid-cols-2">
                                    <div>
                                        <p className="text-xs text-muted-foreground">
                                            Invoice number
                                        </p>
                                        <Link
                                            href={`/ accountant / invoices ? search = ${encodeURIComponent(selectedPayment.invoiceNumber)} `}
                                            onClick={() => setSelectedPayment(null)}
                                            className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                                        >
                                            {selectedPayment.invoiceNumber}
                                            <ArrowRight className="h-3.5 w-3.5" />
                                        </Link>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">
                                            Payment method
                                        </p>
                                        <p className="mt-1 text-sm font-medium">
                                            {getMethodLabel(selectedPayment.method)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Gateway</p>
                                        <p className="mt-1 text-sm font-medium">
                                            {selectedPayment.gateway}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">
                                            Transaction date
                                        </p>
                                        <p className="mt-1 text-sm font-medium">
                                            {formatDate(selectedPayment.createdAt)}
                                        </p>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <p className="text-xs text-muted-foreground">
                                            Payment date
                                        </p>
                                        <p className="mt-1 text-sm font-medium">
                                            {formatDate(selectedPayment.paidAt)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end border-t p-5 sm:px-6">
                            <button
                                type="button"
                                onClick={() => setSelectedPayment(null)}
                                className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}












