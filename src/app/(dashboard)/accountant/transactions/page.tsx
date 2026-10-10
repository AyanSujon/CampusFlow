// import React from 'react'

// export default function transactions() {
//   return (
//     <div>transactions</div>
//   )
// }









"use client";

import React, { useMemo, useState } from "react";
import {
    ArrowDownLeft,
    ArrowDownToLine,
    ArrowUpRight,
    CalendarDays,
    CheckCircle2,
    Clock3,
    CreditCard,
    Download,
    Eye,
    Filter,
    Search,
    Wallet,
    X,
    XCircle,
} from "lucide-react";

type TransactionStatus = "COMPLETED" | "PENDING" | "FAILED";
type PaymentMethod = "BANK_TRANSFER" | "CARD" | "MOBILE_BANKING" | "CASH";

interface Transaction {
    id: string;
    transactionId: string;
    studentName: string;
    studentId: string;
    description: string;
    date: string;
    amount: number;
    method: PaymentMethod;
    status: TransactionStatus;
    reference: string;
}

const transactionsData: Transaction[] = [
    {
        id: "1",
        transactionId: "TXN-2026-001",
        studentName: "Rahim Ahmed",
        studentId: "STU-2026-CSE-0001",
        description: "Semester Tuition Fee",
        date: "2026-10-09T10:30:00",
        amount: 25000,
        method: "MOBILE_BANKING",
        status: "COMPLETED",
        reference: "TXNREF10001",
    },
    {
        id: "2",
        transactionId: "TXN-2026-002",
        studentName: "Nusrat Jahan",
        studentId: "STU-2026-BBA-0002",
        description: "Admission Fee",
        date: "2026-10-09T09:15:00",
        amount: 15000,
        method: "BANK_TRANSFER",
        status: "COMPLETED",
        reference: "TXNREF10002",
    },
    {
        id: "3",
        transactionId: "TXN-2026-003",
        studentName: "Sabbir Hossain",
        studentId: "STU-2026-CSE-0003",
        description: "Laboratory Fee",
        date: "2026-10-08T14:45:00",
        amount: 3500,
        method: "CARD",
        status: "PENDING",
        reference: "TXNREF10003",
    },
    {
        id: "4",
        transactionId: "TXN-2026-004",
        studentName: "Ayesha Akter",
        studentId: "STU-2026-EEE-0004",
        description: "Examination Fee",
        date: "2026-10-08T11:20:00",
        amount: 5000,
        method: "MOBILE_BANKING",
        status: "COMPLETED",
        reference: "TXNREF10004",
    },
    {
        id: "5",
        transactionId: "TXN-2026-005",
        studentName: "Tanvir Hasan",
        studentId: "STU-2026-CSE-0005",
        description: "Semester Tuition Fee",
        date: "2026-10-07T16:10:00",
        amount: 22000,
        method: "CARD",
        status: "FAILED",
        reference: "TXNREF10005",
    },
    {
        id: "6",
        transactionId: "TXN-2026-006",
        studentName: "Mim Sultana",
        studentId: "STU-2026-BBA-0006",
        description: "Library Fee",
        date: "2026-10-07T12:00:00",
        amount: 1200,
        method: "CASH",
        status: "COMPLETED",
        reference: "TXNREF10006",
    },
    {
        id: "7",
        transactionId: "TXN-2026-007",
        studentName: "Fahim Rahman",
        studentId: "STU-2026-EEE-0007",
        description: "Admission Fee",
        date: "2026-10-06T10:45:00",
        amount: 15000,
        method: "BANK_TRANSFER",
        status: "PENDING",
        reference: "TXNREF10007",
    },
    {
        id: "8",
        transactionId: "TXN-2026-008",
        studentName: "Samia Islam",
        studentId: "STU-2026-CSE-0008",
        description: "Examination Fee",
        date: "2026-10-05T13:25:00",
        amount: 4500,
        method: "MOBILE_BANKING",
        status: "COMPLETED",
        reference: "TXNREF10008",
    },
];

const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT",
        maximumFractionDigits: 0,
    }).format(amount);

const formatDate = (date: string) =>
    new Date(date).toLocaleString("en-BD", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

const methodLabels: Record<PaymentMethod, string> = {
    BANK_TRANSFER: "Bank Transfer",
    CARD: "Card",
    MOBILE_BANKING: "Mobile Banking",
    CASH: "Cash",
};

function StatusBadge({ status }: { status: TransactionStatus }) {
    const styles: Record<TransactionStatus, string> = {
        COMPLETED: "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-400/20",
        PENDING: "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-400/20",
        FAILED: "bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-400/20",
    };

    const icons = {
        COMPLETED: <CheckCircle2 size={13} />,
        PENDING: <Clock3 size={13} />,
        FAILED: <XCircle size={13} />,
    };

    return (
        <span
            className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${styles[status]}`}
        >
            {icons[status]}
            {status.charAt(0) + status.slice(1).toLowerCase()}
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
                    <h3 className="mt-2 break-words text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                        {value}
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground">{subtitle}</p>
                </div>
                <div className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${iconClass}`}>
                    {icon}
                </div>
            </div>
        </div>
    );
}

export default function Transactions() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [methodFilter, setMethodFilter] = useState("ALL");
    const [dateFilter, setDateFilter] = useState("");
    const [selectedTransaction, setSelectedTransaction] =
        useState<Transaction | null>(null);

    const filteredTransactions = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();

        return transactionsData.filter((transaction) => {
            const matchesSearch =
                !query ||
                transaction.transactionId.toLowerCase().includes(query) ||
                transaction.studentName.toLowerCase().includes(query) ||
                transaction.studentId.toLowerCase().includes(query) ||
                transaction.description.toLowerCase().includes(query) ||
                transaction.reference.toLowerCase().includes(query);

            const matchesStatus =
                statusFilter === "ALL" || transaction.status === statusFilter;

            const matchesMethod =
                methodFilter === "ALL" || transaction.method === methodFilter;

            const matchesDate =
                !dateFilter || transaction.date.slice(0, 10) === dateFilter;

            return matchesSearch && matchesStatus && matchesMethod && matchesDate;
        });
    }, [searchTerm, statusFilter, methodFilter, dateFilter]);

    const completedTransactions = transactionsData.filter(
        (transaction) => transaction.status === "COMPLETED"
    );

    const pendingTransactions = transactionsData.filter(
        (transaction) => transaction.status === "PENDING"
    );

    const failedTransactions = transactionsData.filter(
        (transaction) => transaction.status === "FAILED"
    );

    const completedAmount = completedTransactions.reduce(
        (total, transaction) => total + transaction.amount,
        0
    );

    const exportTransactions = () => {
        const headers = [
            "Transaction ID",
            "Student Name",
            "Student ID",
            "Description",
            "Date",
            "Amount (BDT)",
            "Payment Method",
            "Status",
            "Reference",
        ];

        const escapeCsv = (value: string | number) =>
            `"${String(value).replace(/"/g, '""')}"`;

        const rows = filteredTransactions.map((transaction) => [
            transaction.transactionId,
            transaction.studentName,
            transaction.studentId,
            transaction.description,
            formatDate(transaction.date),
            transaction.amount,
            methodLabels[transaction.method],
            transaction.status,
            transaction.reference,
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
        link.download = "campusflow-transactions.csv";
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
                            Transactions
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Monitor and review student payment transactions.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={exportTransactions}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 sm:w-auto"
                    >
                        <Download size={17} />
                        Export CSV
                    </button>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <StatCard
                        title="Total Transactions"
                        value={String(transactionsData.length)}
                        subtitle="All recorded transactions"
                        icon={<CreditCard size={21} />}
                        iconClass="bg-blue-500/10 text-blue-600 dark:text-blue-400"
                    />
                    <StatCard
                        title="Successful Payments"
                        value={String(completedTransactions.length)}
                        subtitle="Completed transactions"
                        icon={<CheckCircle2 size={21} />}
                        iconClass="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    />
                    <StatCard
                        title="Pending Transactions"
                        value={String(pendingTransactions.length)}
                        subtitle="Awaiting confirmation"
                        icon={<Clock3 size={21} />}
                        iconClass="bg-amber-500/10 text-amber-600 dark:text-amber-400"
                    />
                    <StatCard
                        title="Successful Amount"
                        value={formatCurrency(completedAmount)}
                        subtitle={`${failedTransactions.length} failed transaction(s)`}
                        icon={<ArrowDownLeft size={21} />}
                        iconClass="bg-violet-500/10 text-violet-600 dark:text-violet-400"
                    />
                </div>

                {/* Transaction table */}
                <div className="min-w-0 overflow-hidden rounded-xl border border-border bg-card">
                    <div className="flex flex-col gap-4 border-b border-border p-4 sm:p-5">
                        <div>
                            <h2 className="text-lg font-semibold">Transaction History</h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                {filteredTransactions.length} transaction(s) found
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
                                    placeholder="Search transactions..."
                                    aria-label="Search transactions"
                                    className="h-10 w-full min-w-0 rounded-lg border border-input bg-background pl-9 pr-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                                />
                            </div>

                            <select
                                value={statusFilter}
                                onChange={(event) => setStatusFilter(event.target.value)}
                                aria-label="Filter by status"
                                className="h-10 w-full min-w-0 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-primary"
                            >
                                <option value="ALL">All statuses</option>
                                <option value="COMPLETED">Completed</option>
                                <option value="PENDING">Pending</option>
                                <option value="FAILED">Failed</option>
                            </select>

                            <select
                                value={methodFilter}
                                onChange={(event) => setMethodFilter(event.target.value)}
                                aria-label="Filter by payment method"
                                className="h-10 w-full min-w-0 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-primary"
                            >
                                <option value="ALL">All payment methods</option>
                                <option value="BANK_TRANSFER">Bank Transfer</option>
                                <option value="CARD">Card</option>
                                <option value="MOBILE_BANKING">Mobile Banking</option>
                                <option value="CASH">Cash</option>
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
                                    aria-label="Filter by date"
                                    className="h-10 w-full min-w-0 rounded-lg border border-input bg-background pl-9 pr-2 text-sm outline-none focus:border-primary"
                                />
                            </div>
                        </div>

                        {(searchTerm || statusFilter !== "ALL" || methodFilter !== "ALL" || dateFilter) && (
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

                    {/* Desktop table; scroll stays inside the table container */}
                    <div className="w-full overflow-x-auto">
                        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
                            <thead className="bg-muted/50">
                                <tr className="border-b border-border">
                                    <th className="px-5 py-3.5 font-semibold text-muted-foreground">
                                        Transaction
                                    </th>
                                    <th className="px-5 py-3.5 font-semibold text-muted-foreground">
                                        Student
                                    </th>
                                    <th className="px-5 py-3.5 font-semibold text-muted-foreground">
                                        Payment Method
                                    </th>
                                    <th className="px-5 py-3.5 font-semibold text-muted-foreground">
                                        Date
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
                                {filteredTransactions.map((transaction) => (
                                    <tr
                                        key={transaction.id}
                                        className="transition-colors hover:bg-muted/30"
                                    >
                                        <td className="px-5 py-4">
                                            <p className="whitespace-nowrap font-semibold">
                                                {transaction.transactionId}
                                            </p>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {transaction.description}
                                            </p>
                                        </td>

                                        <td className="px-5 py-4">
                                            <p className="whitespace-nowrap font-medium">
                                                {transaction.studentName}
                                            </p>
                                            <p className="mt-1 whitespace-nowrap text-xs text-muted-foreground">
                                                {transaction.studentId}
                                            </p>
                                        </td>

                                        <td className="px-5 py-4">
                                            <span className="whitespace-nowrap text-muted-foreground">
                                                {methodLabels[transaction.method]}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4">
                                            <span className="whitespace-nowrap text-muted-foreground">
                                                {formatDate(transaction.date)}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4">
                                            <span className="whitespace-nowrap font-semibold">
                                                {formatCurrency(transaction.amount)}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4">
                                            <StatusBadge status={transaction.status} />
                                        </td>

                                        <td className="px-5 py-4 text-right">
                                            <button
                                                type="button"
                                                onClick={() => setSelectedTransaction(transaction)}
                                                aria-label={`View ${transaction.transactionId}`}
                                                className="inline-flex size-9 items-center justify-center rounded-lg border border-border transition hover:bg-muted"
                                            >
                                                <Eye size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                {filteredTransactions.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="px-5 py-16 text-center">
                                            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted">
                                                <Search size={22} className="text-muted-foreground" />
                                            </div>
                                            <p className="mt-3 font-semibold">No transactions found</p>
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
                            Showing {filteredTransactions.length} of {transactionsData.length} transactions
                        </span>
                        <span>Amounts displayed in Bangladeshi Taka (BDT)</span>
                    </div>
                </div>

                {/* Transaction details dialog */}
                {selectedTransaction && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-3 backdrop-blur-sm sm:p-5"
                        onClick={() => setSelectedTransaction(null)}
                    >
                        <div
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="transaction-dialog-title"
                            className="my-auto w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
                            onClick={(event) => event.stopPropagation()}
                        >
                            <div className="flex items-center justify-between border-b border-border p-5">
                                <div>
                                    <h2 id="transaction-dialog-title" className="text-lg font-bold">
                                        Transaction Details
                                    </h2>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {selectedTransaction.transactionId}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setSelectedTransaction(null)}
                                    aria-label="Close transaction details"
                                    className="flex size-9 items-center justify-center rounded-lg hover:bg-muted"
                                >
                                    <X size={19} />
                                </button>
                            </div>

                            <div className="space-y-5 p-5">
                                <div className="rounded-xl bg-muted/50 p-5 text-center">
                                    <p className="text-sm text-muted-foreground">Transaction amount</p>
                                    <h3 className="mt-2 text-3xl font-bold">
                                        {formatCurrency(selectedTransaction.amount)}
                                    </h3>
                                    <div className="mt-3 flex justify-center">
                                        <StatusBadge status={selectedTransaction.status} />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        ["Student Name", selectedTransaction.studentName],
                                        ["Student ID", selectedTransaction.studentId],
                                        ["Description", selectedTransaction.description],
                                        ["Payment Method", methodLabels[selectedTransaction.method]],
                                        ["Transaction Date", formatDate(selectedTransaction.date)],
                                        ["Reference Number", selectedTransaction.reference],
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
                                    onClick={() => setSelectedTransaction(null)}
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
