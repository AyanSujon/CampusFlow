// import React from 'react'

// export default function paymentsReport() {
//     return (
//         <div>paymentsReport</div>
//     )
// }





"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
    ArrowDownToLine,
    ArrowDownRight,
    ArrowUpRight,
    BarChart3,
    CalendarDays,
    CheckCircle2,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Clock3,
    CreditCard,
    Download,
    FileText,
    Filter,
    RefreshCw,
    Search,
    TrendingUp,
    Wallet,
    XCircle,
} from "lucide-react";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    PieChart,
    Pie,
    Cell,
} from "recharts";

type PaymentStatus = "VERIFIED" | "PENDING" | "FAILED" | "REFUNDED";
type PaymentMethod =
    | "bKash"
    | "Card"
    | "Bank Transfer"
    | "SSLCommerz"
    | "Cash";

type PaymentRecord = {
    id: string;
    studentName: string;
    studentId: string;
    invoiceId: string;
    method: PaymentMethod;
    amount: number;
    date: string;
    status: PaymentStatus;
};

const monthlyData = [
    { month: "May", verified: 320000, pending: 45000, failed: 18000 },
    { month: "Jun", verified: 385000, pending: 52000, failed: 22000 },
    { month: "Jul", verified: 345000, pending: 38000, failed: 25000 },
    { month: "Aug", verified: 460000, pending: 61000, failed: 19000 },
    { month: "Sep", verified: 425000, pending: 49000, failed: 27000 },
    { month: "Oct", verified: 525000, pending: 57000, failed: 16000 },
];

const methodData = [
    { name: "bKash", amount: 425000, count: 148, color: "#E11D48" },
    { name: "Card", amount: 315000, count: 92, color: "#2563EB" },
    {
        name: "Bank Transfer",
        amount: 280000,
        count: 65,
        color: "#7C3AED",
    },
    {
        name: "SSLCommerz",
        amount: 365000,
        count: 104,
        color: "#059669",
    },
    { name: "Cash", amount: 185000, count: 73, color: "#D97706" },
];

const initialPayments: PaymentRecord[] = [
    {
        id: "PAY-2026-1058",
        studentName: "Ayan Sujon",
        studentId: "STU-2026-0012",
        invoiceId: "INV-2026-0081",
        method: "SSLCommerz",
        amount: 25000,
        date: "2026-10-10",
        status: "VERIFIED",
    },
    {
        id: "PAY-2026-1057",
        studentName: "Nusrat Jahan",
        studentId: "STU-2025-0048",
        invoiceId: "INV-2026-0080",
        method: "bKash",
        amount: 12500,
        date: "2026-10-10",
        status: "PENDING",
    },
    {
        id: "PAY-2026-1056",
        studentName: "Rahim Ahmed",
        studentId: "STU-2024-0091",
        invoiceId: "INV-2026-0079",
        method: "Bank Transfer",
        amount: 18000,
        date: "2026-10-09",
        status: "VERIFIED",
    },
    {
        id: "PAY-2026-1055",
        studentName: "Maliha Islam",
        studentId: "STU-2026-0035",
        invoiceId: "INV-2026-0078",
        method: "Card",
        amount: 8000,
        date: "2026-10-09",
        status: "FAILED",
    },
    {
        id: "PAY-2026-1054",
        studentName: "Tanvir Hasan",
        studentId: "STU-2025-0021",
        invoiceId: "INV-2026-0077",
        method: "bKash",
        amount: 15000,
        date: "2026-10-08",
        status: "VERIFIED",
    },
    {
        id: "PAY-2026-1053",
        studentName: "Farhana Akter",
        studentId: "STU-2024-0062",
        invoiceId: "INV-2026-0076",
        method: "Cash",
        amount: 10000,
        date: "2026-10-08",
        status: "VERIFIED",
    },
    {
        id: "PAY-2026-1052",
        studentName: "Sabbir Hossain",
        studentId: "STU-2025-0033",
        invoiceId: "INV-2026-0075",
        method: "Card",
        amount: 12000,
        date: "2026-10-07",
        status: "REFUNDED",
    },
    {
        id: "PAY-2026-1051",
        studentName: "Samia Rahman",
        studentId: "STU-2026-0054",
        invoiceId: "INV-2026-0074",
        method: "SSLCommerz",
        amount: 22000,
        date: "2026-10-06",
        status: "VERIFIED",
    },
    {
        id: "PAY-2026-1050",
        studentName: "Imran Kabir",
        studentId: "STU-2025-0065",
        invoiceId: "INV-2026-0073",
        method: "Bank Transfer",
        amount: 14000,
        date: "2026-10-05",
        status: "PENDING",
    },
    {
        id: "PAY-2026-1049",
        studentName: "Tania Islam",
        studentId: "STU-2024-0025",
        invoiceId: "INV-2026-0072",
        method: "bKash",
        amount: 9500,
        date: "2026-10-04",
        status: "FAILED",
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

function StatusBadge({ status }: { status: PaymentStatus }) {
    const styles: Record<PaymentStatus, string> = {
        VERIFIED:
            "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400",
        PENDING:
            "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400",
        FAILED:
            "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400",
        REFUNDED:
            "bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-400",
    };

    const Icon =
        status === "VERIFIED"
            ? CheckCircle2
            : status === "PENDING"
                ? Clock3
                : XCircle;

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${styles[status]}`}
        >
            <Icon size={13} />
            {status}
        </span>
    );
}

function Panel({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <section
            className={`min-w-0 rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5 ${className}`}
        >
            {children}
        </section>
    );
}

function SectionTitle({
    title,
    description,
    action,
}: {
    title: string;
    description?: string;
    action?: React.ReactNode;
}) {
    return (
        <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
            <div>
                <h2 className="text-base font-semibold tracking-tight">{title}</h2>
                {description && (
                    <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                )}
            </div>
            {action}
        </div>
    );
}

export default function PaymentsReport() {
    const [payments] = useState(initialPayments);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [methodFilter, setMethodFilter] = useState("ALL");
    const [period, setPeriod] = useState("6months");
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);

    const pageSize = 5;

    const filteredPayments = useMemo(() => {
        const query = search.trim().toLowerCase();

        return payments.filter((payment) => {
            const matchesSearch =
                !query ||
                payment.id.toLowerCase().includes(query) ||
                payment.studentName.toLowerCase().includes(query) ||
                payment.studentId.toLowerCase().includes(query) ||
                payment.invoiceId.toLowerCase().includes(query);

            const matchesStatus =
                statusFilter === "ALL" || payment.status === statusFilter;

            const matchesMethod =
                methodFilter === "ALL" || payment.method === methodFilter;

            return matchesSearch && matchesStatus && matchesMethod;
        });
    }, [payments, search, statusFilter, methodFilter]);

    const totalVerified = payments
        .filter((payment) => payment.status === "VERIFIED")
        .reduce((sum, payment) => sum + payment.amount, 0);

    const pendingAmount = payments
        .filter((payment) => payment.status === "PENDING")
        .reduce((sum, payment) => sum + payment.amount, 0);

    const failedAmount = payments
        .filter((payment) => payment.status === "FAILED")
        .reduce((sum, payment) => sum + payment.amount, 0);

    const refundedAmount = payments
        .filter((payment) => payment.status === "REFUNDED")
        .reduce((sum, payment) => sum + payment.amount, 0);

    const verifiedCount = payments.filter(
        (payment) => payment.status === "VERIFIED"
    ).length;

    const pendingCount = payments.filter(
        (payment) => payment.status === "PENDING"
    ).length;

    const failedCount = payments.filter(
        (payment) => payment.status === "FAILED"
    ).length;

    const completedCount = payments.filter(
        (payment) => payment.status === "VERIFIED" || payment.status === "REFUNDED"
    ).length;

    const successRate =
        payments.length > 0
            ? Math.round((verifiedCount / payments.length) * 100)
            : 0;

    const totalPages = Math.max(
        1,
        Math.ceil(filteredPayments.length / pageSize)
    );

    const safePage = Math.min(currentPage, totalPages);

    const paginatedPayments = filteredPayments.slice(
        (safePage - 1) * pageSize,
        safePage * pageSize
    );

    const exportCsv = () => {
        const headers = [
            "Payment ID",
            "Student",
            "Student ID",
            "Invoice ID",
            "Method",
            "Amount",
            "Date",
            "Status",
        ];

        const rows = filteredPayments.map((payment) => [
            payment.id,
            payment.studentName,
            payment.studentId,
            payment.invoiceId,
            payment.method,
            payment.amount,
            payment.date,
            payment.status,
        ]);

        const csv = [headers, ...rows]
            .map((row) =>
                row
                    .map((value) => `"${String(value).replace(/"/g, '""')}"`)
                    .join(",")
            )
            .join("\r\n");

        const blob = new Blob(["\uFEFF" + csv], {
            type: "text/csv;charset=utf-8;",
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = "campusflow-payment-report.csv";
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    };

    const resetFilters = () => {
        setSearch("");
        setStatusFilter("ALL");
        setMethodFilter("ALL");
        setCurrentPage(1);
    };

    const chartData =
        period === "3months"
            ? monthlyData.slice(-3)
            : period === "12months"
                ? monthlyData
                : monthlyData;

    return (
        <main className="min-h-screen min-w-0 bg-background text-foreground">
            <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
                {/* Page header */}
                <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                    <div>

                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            Payment Reports
                        </h1>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                            Analyze payment collection, gateway performance, transaction
                            statuses, and payment methods across your university.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <Link
                            href="/accountant/payments"
                            className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm font-medium transition hover:bg-muted"
                        >
                            <CreditCard size={16} />
                            Payments
                        </Link>

                        <button
                            type="button"
                            onClick={exportCsv}
                            className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                        >
                            <Download size={16} />
                            Export CSV
                        </button>
                    </div>
                </div>

                {/* Report filters */}
                <Panel>
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <h2 className="text-sm font-semibold">Report filters</h2>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Narrow down the payment records you want to analyze.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="report-period"
                                    className="text-xs font-medium text-muted-foreground"
                                >
                                    Reporting period
                                </label>
                                <select
                                    id="report-period"
                                    value={period}
                                    onChange={(event) => setPeriod(event.target.value)}
                                    className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                                >
                                    <option value="3months">Last 3 months</option>
                                    <option value="6months">Last 6 months</option>
                                    <option value="12months">Last 12 months</option>
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label
                                    htmlFor="payment-method"
                                    className="text-xs font-medium text-muted-foreground"
                                >
                                    Payment method
                                </label>
                                <select
                                    id="payment-method"
                                    value={methodFilter}
                                    onChange={(event) => {
                                        setMethodFilter(event.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                                >
                                    <option value="ALL">All methods</option>
                                    <option value="bKash">bKash</option>
                                    <option value="Card">Card</option>
                                    <option value="Bank Transfer">Bank Transfer</option>
                                    <option value="SSLCommerz">SSLCommerz</option>
                                    <option value="Cash">Cash</option>
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label
                                    htmlFor="payment-status"
                                    className="text-xs font-medium text-muted-foreground"
                                >
                                    Payment status
                                </label>
                                <select
                                    id="payment-status"
                                    value={statusFilter}
                                    onChange={(event) => {
                                        setStatusFilter(event.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                                >
                                    <option value="ALL">All statuses</option>
                                    <option value="VERIFIED">Verified</option>
                                    <option value="PENDING">Pending</option>
                                    <option value="FAILED">Failed</option>
                                    <option value="REFUNDED">Refunded</option>
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label
                                    htmlFor="payment-search"
                                    className="text-xs font-medium text-muted-foreground"
                                >
                                    Search
                                </label>
                                <div className="flex h-10 items-center gap-2 rounded-lg border border-border bg-background px-3">
                                    <Search
                                        size={15}
                                        className="shrink-0 text-muted-foreground"
                                    />
                                    <input
                                        id="payment-search"
                                        value={search}
                                        onChange={(event) => {
                                            setSearch(event.target.value);
                                            setCurrentPage(1);
                                        }}
                                        placeholder="Student, payment ID..."
                                        className="min-w-0 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                        <p className="text-xs text-muted-foreground">
                            Showing <span className="font-semibold text-foreground">{filteredPayments.length}</span>{" "}
                            matching sample records
                        </p>
                        <button
                            type="button"
                            onClick={resetFilters}
                            className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:underline"
                        >
                            <RefreshCw size={13} />
                            Reset filters
                        </button>
                    </div>
                </Panel>

                {/* KPI cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <Panel>
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                                <Wallet size={21} />
                            </div>
                            <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                                <ArrowUpRight size={14} />
                                Collected
                            </span>
                        </div>
                        <p className="mt-5 text-sm text-muted-foreground">
                            Verified Collections
                        </p>
                        <p className="mt-1 break-words text-2xl font-bold tracking-tight">
                            {formatCurrency(totalVerified)}
                        </p>
                        <p className="mt-2 text-xs text-muted-foreground">
                            {verifiedCount} verified records in this sample
                        </p>
                    </Panel>

                    <Panel>
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex size-11 items-center justify-center rounded-xl bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
                                <Clock3 size={21} />
                            </div>
                            <span className="text-xs font-semibold text-amber-600">
                                Pending
                            </span>
                        </div>
                        <p className="mt-5 text-sm text-muted-foreground">
                            Pending Amount
                        </p>
                        <p className="mt-1 break-words text-2xl font-bold tracking-tight">
                            {formatCurrency(pendingAmount)}
                        </p>
                        <p className="mt-2 text-xs text-muted-foreground">
                            {pendingCount} payments awaiting confirmation
                        </p>
                    </Panel>

                    <Panel>
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex size-11 items-center justify-center rounded-xl bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400">
                                <XCircle size={21} />
                            </div>
                            <span className="flex items-center gap-1 text-xs font-semibold text-red-600">
                                <ArrowDownRight size={14} />
                                Failed
                            </span>
                        </div>
                        <p className="mt-5 text-sm text-muted-foreground">
                            Failed Payment Amount
                        </p>
                        <p className="mt-1 break-words text-2xl font-bold tracking-tight">
                            {formatCurrency(failedAmount)}
                        </p>
                        <p className="mt-2 text-xs text-muted-foreground">
                            {failedCount} failed payment records
                        </p>
                    </Panel>

                    <Panel>
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
                                <TrendingUp size={21} />
                            </div>
                            <span className="text-xs font-semibold text-blue-600">
                                Success rate
                            </span>
                        </div>
                        <p className="mt-5 text-sm text-muted-foreground">
                            Verified / All Records
                        </p>
                        <p className="mt-1 text-2xl font-bold tracking-tight">
                            {successRate}%
                        </p>
                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                            <div
                                className="h-full rounded-full bg-blue-600 transition-all"
                                style={{ width: `${successRate}%` }}
                            />
                        </div>
                    </Panel>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                    <Panel className="xl:col-span-2">
                        <SectionTitle
                            title="Payment Collection Trend"
                            description="Verified, pending and failed amounts by month"
                            action={
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <CalendarDays size={15} />
                                    Monthly
                                </div>
                            }
                        />

                        <div className="mb-4 flex flex-wrap gap-x-5 gap-y-2 text-xs">
                            <span className="flex items-center gap-2">
                                <span className="size-2.5 rounded-full bg-emerald-500" />
                                Verified
                            </span>
                            <span className="flex items-center gap-2">
                                <span className="size-2.5 rounded-full bg-amber-500" />
                                Pending
                            </span>
                            <span className="flex items-center gap-2">
                                <span className="size-2.5 rounded-full bg-red-500" />
                                Failed
                            </span>
                        </div>

                        <div className="h-[280px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart
                                    data={chartData}
                                    margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                                >
                                    <defs>
                                        <linearGradient id="verifiedFill" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#10B981" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="pendingFill" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.18} />
                                            <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid
                                        stroke="currentColor"
                                        strokeOpacity={0.1}
                                        vertical={false}
                                    />
                                    <XAxis
                                        dataKey="month"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "currentColor", fontSize: 12, opacity: 0.65 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "currentColor", fontSize: 11, opacity: 0.65 }}
                                        tickFormatter={(value) => `${value / 1000}k`}
                                        width={45}
                                    />
                                    <Tooltip
                                        formatter={(value, name) => [
                                            formatCurrency(Number(value)),
                                            name === "verified"
                                                ? "Verified"
                                                : name === "pending"
                                                    ? "Pending"
                                                    : "Failed",
                                        ]}
                                        contentStyle={{
                                            borderRadius: 12,
                                            border: "1px solid var(--border)",
                                            background: "var(--card)",
                                            color: "var(--card-foreground)",
                                            fontSize: 12,
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="verified"
                                        stroke="#10B981"
                                        strokeWidth={2.5}
                                        fill="url(#verifiedFill)"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="pending"
                                        stroke="#F59E0B"
                                        strokeWidth={2}
                                        fill="url(#pendingFill)"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="failed"
                                        stroke="#EF4444"
                                        strokeWidth={2}
                                        fill="transparent"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Panel>

                    <Panel>
                        <SectionTitle
                            title="Collection by Method"
                            description="Breakdown of payment channels"
                        />

                        <div className="relative mx-auto h-[210px] max-w-[260px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={methodData}
                                        dataKey="amount"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={58}
                                        outerRadius={88}
                                        paddingAngle={3}
                                        stroke="none"
                                    >
                                        {methodData.map((item) => (
                                            <Cell key={item.name} fill={item.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value) => formatCurrency(Number(value))}
                                        contentStyle={{
                                            borderRadius: 12,
                                            border: "1px solid var(--border)",
                                            background: "var(--card)",
                                            color: "var(--card-foreground)",
                                            fontSize: 12,
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-xs text-muted-foreground">Total</span>
                                <span className="mt-1 text-lg font-bold">
                                    {formatCurrency(
                                        methodData.reduce((sum, item) => sum + item.amount, 0)
                                    )}
                                </span>
                            </div>
                        </div>

                        <div className="mt-4 space-y-3">
                            {methodData.map((item) => (
                                <div
                                    key={item.name}
                                    className="flex items-center justify-between gap-3 text-sm"
                                >
                                    <div className="flex min-w-0 items-center gap-2">
                                        <span
                                            className="size-2.5 shrink-0 rounded-full"
                                            style={{ backgroundColor: item.color }}
                                        />
                                        <span className="truncate text-muted-foreground">
                                            {item.name}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold">{formatCurrency(item.amount)}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {item.count} records
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Panel>
                </div>

                {/* Status breakdown */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <Panel>
                        <SectionTitle
                            title="Payment Status Summary"
                            description="Current distribution of sample payment records"
                        />

                        <div className="space-y-5">
                            {[
                                {
                                    name: "Verified",
                                    count: verifiedCount,
                                    color: "bg-emerald-500",
                                },
                                {
                                    name: "Pending",
                                    count: pendingCount,
                                    color: "bg-amber-500",
                                },
                                {
                                    name: "Failed",
                                    count: failedCount,
                                    color: "bg-red-500",
                                },
                                {
                                    name: "Refunded",
                                    count: payments.filter((p) => p.status === "REFUNDED").length,
                                    color: "bg-violet-500",
                                },
                            ].map((item) => {
                                const percentage =
                                    payments.length > 0
                                        ? (item.count / payments.length) * 100
                                        : 0;

                                return (
                                    <div key={item.name}>
                                        <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                                            <span className="font-medium">{item.name}</span>
                                            <span className="text-muted-foreground">
                                                {item.count} records · {Math.round(percentage)}%
                                            </span>
                                        </div>
                                        <div className="h-2 overflow-hidden rounded-full bg-muted">
                                            <div
                                                className={`h-full rounded-full ${item.color}`}
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Panel>

                    <Panel>
                        <SectionTitle
                            title="Payment Reconciliation"
                            description="Amounts to review before closing accounts"
                        />

                        <div className="space-y-3">
                            <div className="flex items-center justify-between gap-3 rounded-lg border border-border p-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex size-10 items-center justify-center rounded-lg bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
                                        <Clock3 size={19} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold">Pending payments</p>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            Awaiting final confirmation
                                        </p>
                                    </div>
                                </div>
                                <p className="text-right text-sm font-bold">
                                    {formatCurrency(pendingAmount)}
                                </p>
                            </div>

                            <div className="flex items-center justify-between gap-3 rounded-lg border border-border p-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex size-10 items-center justify-center rounded-lg bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400">
                                        <XCircle size={19} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold">Failed payments</p>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            Not included in collections
                                        </p>
                                    </div>
                                </div>
                                <p className="text-right text-sm font-bold">
                                    {formatCurrency(failedAmount)}
                                </p>
                            </div>

                            <div className="flex items-center justify-between gap-3 rounded-lg border border-border p-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex size-10 items-center justify-center rounded-lg bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-400">
                                        <RefreshCw size={19} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold">Refunded payments</p>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            Review refund ledger entries
                                        </p>
                                    </div>
                                </div>
                                <p className="text-right text-sm font-bold">
                                    {formatCurrency(refundedAmount)}
                                </p>
                            </div>
                        </div>

                        <Link
                            href="/accountant/transactions"
                            className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-border text-sm font-medium transition hover:bg-muted"
                        >
                            Open transactions <ArrowUpRight size={16} />
                        </Link>
                    </Panel>
                </div>

                {/* Detailed report table */}
                <Panel className="overflow-hidden">
                    <SectionTitle
                        title="Detailed Payment Report"
                        description="Search, filter and export payment records"
                        action={
                            <span className="inline-flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-xs font-medium text-muted-foreground">
                                <FileText size={14} />
                                CSV export available
                            </span>
                        }
                    />

                    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex h-10 w-full items-center gap-2 rounded-lg border border-border px-3 sm:max-w-sm">
                            <Search size={16} className="shrink-0 text-muted-foreground" />
                            <input
                                value={search}
                                onChange={(event) => {
                                    setSearch(event.target.value);
                                    setCurrentPage(1);
                                }}
                                placeholder="Search student, invoice or payment..."
                                className="min-w-0 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                                aria-label="Search detailed payment report"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={() => setShowFilters((value) => !value)}
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border px-3 text-sm font-medium transition hover:bg-muted"
                        >
                            <Filter size={15} />
                            Filters
                            <ChevronDown
                                size={15}
                                className={`transition-transform ${showFilters ? "rotate-180" : ""}`}
                            />
                        </button>
                    </div>

                    {showFilters && (
                        <div className="mb-4 grid grid-cols-1 gap-3 rounded-lg border border-border bg-muted/20 p-4 sm:grid-cols-2">
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="table-method"
                                    className="text-xs font-medium text-muted-foreground"
                                >
                                    Method
                                </label>
                                <select
                                    id="table-method"
                                    value={methodFilter}
                                    onChange={(event) => {
                                        setMethodFilter(event.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
                                >
                                    <option value="ALL">All methods</option>
                                    <option value="bKash">bKash</option>
                                    <option value="Card">Card</option>
                                    <option value="Bank Transfer">Bank Transfer</option>
                                    <option value="SSLCommerz">SSLCommerz</option>
                                    <option value="Cash">Cash</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="table-status"
                                    className="text-xs font-medium text-muted-foreground"
                                >
                                    Status
                                </label>
                                <select
                                    id="table-status"
                                    value={statusFilter}
                                    onChange={(event) => {
                                        setStatusFilter(event.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
                                >
                                    <option value="ALL">All statuses</option>
                                    <option value="VERIFIED">Verified</option>
                                    <option value="PENDING">Pending</option>
                                    <option value="FAILED">Failed</option>
                                    <option value="REFUNDED">Refunded</option>
                                </select>
                            </div>
                        </div>
                    )}

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[950px] text-left text-sm">
                            <thead>
                                <tr className="border-y border-border bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                                    <th className="px-4 py-3 font-medium">Payment ID</th>
                                    <th className="px-4 py-3 font-medium">Student</th>
                                    <th className="px-4 py-3 font-medium">Invoice</th>
                                    <th className="px-4 py-3 font-medium">Method</th>
                                    <th className="px-4 py-3 font-medium">Date</th>
                                    <th className="px-4 py-3 font-medium">Amount</th>
                                    <th className="px-4 py-3 font-medium">Status</th>
                                    <th className="px-4 py-3 text-right font-medium">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {paginatedPayments.map((payment) => (
                                    <tr
                                        key={payment.id}
                                        className="border-b border-border last:border-0 transition hover:bg-muted/30"
                                    >
                                        <td className="whitespace-nowrap px-4 py-4 font-semibold">
                                            {payment.id}
                                        </td>
                                        <td className="px-4 py-4">
                                            <p className="whitespace-nowrap font-medium">
                                                {payment.studentName}
                                            </p>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {payment.studentId}
                                            </p>
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-4">
                                            <Link
                                                href={`/accountant/invoices/${payment.invoiceId}`}
                                                className="font-medium text-primary hover:underline"
                                            >
                                                {payment.invoiceId}
                                            </Link>
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-4 text-muted-foreground">
                                            {payment.method}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-4 text-muted-foreground">
                                            {formatDate(payment.date)}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-4 font-semibold">
                                            {formatCurrency(payment.amount)}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-4">
                                            <StatusBadge status={payment.status} />
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-4 text-right">
                                            <Link
                                                href={`/accountant/payments/${payment.id}`}
                                                aria-label={`View payment ${payment.id}`}
                                                className="inline-flex size-9 items-center justify-center rounded-lg border border-border transition hover:bg-muted"
                                            >
                                                <ArrowUpRight size={16} />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}

                                {paginatedPayments.length === 0 && (
                                    <tr>
                                        <td colSpan={8} className="px-4 py-14 text-center">
                                            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted">
                                                <Search size={20} className="text-muted-foreground" />
                                            </div>
                                            <p className="mt-3 text-sm font-semibold">
                                                No payment records found
                                            </p>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                Try changing your search or filters.
                                            </p>
                                            <button
                                                type="button"
                                                onClick={resetFilters}
                                                className="mt-3 text-sm font-semibold text-primary hover:underline"
                                            >
                                                Clear filters
                                            </button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs text-muted-foreground">
                            Showing{" "}
                            {filteredPayments.length === 0
                                ? 0
                                : (safePage - 1) * pageSize + 1}
                            {"–"}
                            {Math.min(safePage * pageSize, filteredPayments.length)} of{" "}
                            {filteredPayments.length} records
                        </p>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                disabled={safePage <= 1}
                                onClick={() =>
                                    setCurrentPage((page) => Math.max(1, page - 1))
                                }
                                className="inline-flex size-9 items-center justify-center rounded-lg border border-border transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                                aria-label="Previous page"
                            >
                                <ChevronLeft size={17} />
                            </button>

                            <span className="min-w-20 text-center text-sm font-medium">
                                Page {safePage} of {totalPages}
                            </span>

                            <button
                                type="button"
                                disabled={safePage >= totalPages}
                                onClick={() =>
                                    setCurrentPage((page) => Math.min(totalPages, page + 1))
                                }
                                className="inline-flex size-9 items-center justify-center rounded-lg border border-border transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                                aria-label="Next page"
                            >
                                <ChevronRight size={17} />
                            </button>
                        </div>
                    </div>
                </Panel>

                <div className="flex flex-col gap-2 border-t border-border pt-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                    <p>CampusFlow · Accountant Payment Reports</p>
                    <p>Illustrative sample data — connect your API for live reporting.</p>
                </div>
            </div>
        </main>
    );
}
