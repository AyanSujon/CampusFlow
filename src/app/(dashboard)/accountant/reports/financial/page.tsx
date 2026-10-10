// import React from 'react'

// export default function financialReports() {
//   return (
//     <div>financialreports</div>
//   )
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
    CircleDollarSign,
    Clock3,
    Download,
    FileSpreadsheet,
    Filter,
    RefreshCw,
    Receipt,
    TrendingUp,
    Wallet,
    AlertTriangle,
} from "lucide-react";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

type Period = "6months" | "12months" | "year";

const monthlyData = [
    { month: "May", revenue: 320000, expenses: 120000, refunds: 10000 },
    { month: "Jun", revenue: 410000, expenses: 150000, refunds: 15000 },
    { month: "Jul", revenue: 360000, expenses: 130000, refunds: 8000 },
    { month: "Aug", revenue: 520000, expenses: 180000, refunds: 12000 },
    { month: "Sep", revenue: 460000, expenses: 160000, refunds: 18000 },
    { month: "Oct", revenue: 610000, expenses: 190000, refunds: 9000 },
];

const incomeBreakdown = [
    { name: "Tuition Fees", amount: 1250000, color: "#2563eb" },
    { name: "Admission Fees", amount: 420000, color: "#7c3aed" },
    { name: "Examination Fees", amount: 280000, color: "#0d9488" },
    { name: "Laboratory Fees", amount: 180000, color: "#f59e0b" },
    { name: "Other Fees", amount: 115000, color: "#ec4899" },
];

const paymentMethods = [
    { method: "SSLCommerz", amount: 920000, percentage: 48 },
    { method: "bKash", amount: 570000, percentage: 30 },
    { method: "Bank Transfer", amount: 280000, percentage: 15 },
    { method: "Cash / Other", amount: 125000, percentage: 7 },
];

const initialTransactions = [
    {
        id: "TXN-2026-1081",
        description: "Semester Tuition Collection",
        category: "Tuition Fees",
        date: "Oct 10, 2026",
        amount: 25000,
        type: "INCOME",
        status: "POSTED",
    },
    {
        id: "TXN-2026-1080",
        description: "Laboratory Fee Collection",
        category: "Laboratory Fees",
        date: "Oct 10, 2026",
        amount: 5000,
        type: "INCOME",
        status: "POSTED",
    },
    {
        id: "TXN-2026-1079",
        description: "Student Payment Refund",
        category: "Refunds",
        date: "Oct 09, 2026",
        amount: 3500,
        type: "REFUND",
        status: "POSTED",
    },
    {
        id: "TXN-2026-1078",
        description: "Examination Fee Collection",
        category: "Examination Fees",
        date: "Oct 09, 2026",
        amount: 7500,
        type: "INCOME",
        status: "POSTED",
    },
    {
        id: "TXN-2026-1077",
        description: "Unverified Payment",
        category: "Tuition Fees",
        date: "Oct 08, 2026",
        amount: 12000,
        type: "INCOME",
        status: "PENDING",
    },
];

const currency = (amount: number) =>
    new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT",
        maximumFractionDigits: 0,
    }).format(amount);

function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        POSTED:
            "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400",
        PENDING:
            "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400",
        REVERSED:
            "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400",
    };

    return (
        <span
            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${styles[status] ?? "bg-muted text-muted-foreground"
                }`}
        >
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

export default function FinancialReports() {
    const [period, setPeriod] = useState<Period>("6months");
    const [transactionFilter, setTransactionFilter] = useState("ALL");
    const [search, setSearch] = useState("");

    const filteredTransactions = useMemo(() => {
        const query = search.trim().toLowerCase();

        return initialTransactions.filter((transaction) => {
            const matchesType =
                transactionFilter === "ALL" ||
                transaction.type === transactionFilter;

            const matchesSearch =
                !query ||
                transaction.id.toLowerCase().includes(query) ||
                transaction.description.toLowerCase().includes(query) ||
                transaction.category.toLowerCase().includes(query);

            return matchesType && matchesSearch;
        });
    }, [transactionFilter, search]);

    const totals = useMemo(() => {
        const data =
            period === "6months"
                ? monthlyData.slice(-6)
                : period === "12months"
                    ? monthlyData
                    : monthlyData.filter((item) => ["May", "Jun", "Jul", "Aug", "Sep", "Oct"].includes(item.month));

        return data.reduce(
            (result, item) => ({
                revenue: result.revenue + item.revenue,
                expenses: result.expenses + item.expenses,
                refunds: result.refunds + item.refunds,
            }),
            { revenue: 0, expenses: 0, refunds: 0 },
        );
    }, [period]);

    const netRevenue = totals.revenue - totals.expenses - totals.refunds;

    const exportCSV = () => {
        const headers = [
            "Transaction ID",
            "Description",
            "Category",
            "Date",
            "Amount",
            "Type",
            "Status",
        ];

        const rows = filteredTransactions.map((transaction) => [
            transaction.id,
            transaction.description,
            transaction.category,
            transaction.date,
            transaction.amount,
            transaction.type,
            transaction.status,
        ]);

        const escapeCSV = (value: string | number) =>
            `"${String(value).replace(/"/g, '""')}"`;

        const csv = [headers, ...rows]
            .map((row) => row.map(escapeCSV).join(","))
            .join("\r\n");

        const blob = new Blob(["\uFEFF" + csv], {
            type: "text/csv;charset=utf-8;",
        });

        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");

        anchor.href = url;
        anchor.download = "campusflow-financial-report.csv";
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        URL.revokeObjectURL(url);
    };

    return (
        <main className="min-h-screen min-w-0 bg-background text-foreground">
            <div className="mx-auto max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
                {/* Header */}
                <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
                    <div>

                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            Financial Reports
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                            Review financial performance, collections, expenses and
                            transaction activity.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <label className="flex h-10 items-center gap-2 rounded-lg border border-border bg-card px-3">
                            <CalendarDays
                                size={16}
                                className="text-muted-foreground"
                            />
                            <span className="text-sm text-muted-foreground">Period</span>
                            <select
                                value={period}
                                onChange={(event) =>
                                    setPeriod(event.target.value as Period)
                                }
                                className="max-w-[135px] bg-transparent text-sm font-medium outline-none"
                                aria-label="Report period"
                            >
                                <option value="6months">Last 6 months</option>
                                <option value="12months">Last 12 months</option>
                                <option value="year">Current year</option>
                            </select>
                        </label>

                        <button
                            type="button"
                            onClick={exportCSV}
                            className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm font-medium transition hover:bg-muted"
                        >
                            <Download size={16} />
                            Export CSV
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setPeriod("6months");
                                setTransactionFilter("ALL");
                                setSearch("");
                            }}
                            className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                        >
                            <RefreshCw size={15} />
                            Reset
                        </button>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
                    <Panel>
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
                                <Wallet size={21} />
                            </div>
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                                <ArrowUpRight size={14} />
                                12.8%
                            </span>
                        </div>
                        <p className="mt-5 text-sm text-muted-foreground">
                            Total Collections
                        </p>
                        <p className="mt-1 break-words text-2xl font-bold">
                            {currency(totals.revenue)}
                        </p>
                        <p className="mt-2 text-xs text-muted-foreground">
                            Verified payment collections
                        </p>
                    </Panel>

                    <Panel>
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                                <TrendingUp size={21} />
                            </div>
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                                <ArrowUpRight size={14} />
                                9.4%
                            </span>
                        </div>
                        <p className="mt-5 text-sm text-muted-foreground">
                            Net Collection
                        </p>
                        <p className="mt-1 break-words text-2xl font-bold">
                            {currency(netRevenue)}
                        </p>
                        <p className="mt-2 text-xs text-muted-foreground">
                            Collections less expenses and refunds
                        </p>
                    </Panel>

                    <Panel>
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex size-11 items-center justify-center rounded-xl bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
                                <Receipt size={21} />
                            </div>
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-600">
                                <ArrowDownRight size={14} />
                                4.5%
                            </span>
                        </div>
                        <p className="mt-5 text-sm text-muted-foreground">
                            Outstanding Fees
                        </p>
                        <p className="mt-1 break-words text-2xl font-bold">
                            ৳4,85,000
                        </p>
                        <p className="mt-2 text-xs text-muted-foreground">
                            Remaining unpaid invoice balances
                        </p>
                    </Panel>

                    <Panel>
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex size-11 items-center justify-center rounded-xl bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-400">
                                <CircleDollarSign size={21} />
                            </div>
                            <span className="rounded-full bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
                                In progress
                            </span>
                        </div>
                        <p className="mt-5 text-sm text-muted-foreground">
                            Refunds
                        </p>
                        <p className="mt-1 break-words text-2xl font-bold">
                            {currency(totals.refunds)}
                        </p>
                        <p className="mt-2 text-xs text-muted-foreground">
                            Posted refunds in selected period
                        </p>
                    </Panel>
                </div>

                {/* Charts */}
                <div className="grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-3">
                    <Panel className="xl:col-span-2">
                        <SectionTitle
                            title="Revenue vs Expenses"
                            description="Financial activity over the selected period"
                            action={
                                <span className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1.5">
                                        <span className="size-2.5 rounded-full bg-blue-600" />
                                        Revenue
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <span className="size-2.5 rounded-full bg-amber-500" />
                                        Expenses
                                    </span>
                                </span>
                            }
                        />

                        <div className="h-[280px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart
                                    data={monthlyData}
                                    margin={{ top: 10, right: 8, left: 0, bottom: 0 }}
                                >
                                    <defs>
                                        <linearGradient
                                            id="financeRevenue"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="0%"
                                                stopColor="#2563eb"
                                                stopOpacity={0.22}
                                            />
                                            <stop
                                                offset="95%"
                                                stopColor="#2563eb"
                                                stopOpacity={0}
                                            />
                                        </linearGradient>
                                        <linearGradient
                                            id="financeExpenses"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="0%"
                                                stopColor="#f59e0b"
                                                stopOpacity={0.16}
                                            />
                                            <stop
                                                offset="95%"
                                                stopColor="#f59e0b"
                                                stopOpacity={0}
                                            />
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
                                        dy={8}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        width={45}
                                        tick={{ fill: "currentColor", fontSize: 11, opacity: 0.65 }}
                                        tickFormatter={(value) => `${value / 1000}k`}
                                    />
                                    <Tooltip
                                        formatter={(value, name) => [
                                            currency(Number(value)),
                                            name === "revenue" ? "Revenue" : "Expenses",
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
                                        dataKey="revenue"
                                        stroke="#2563eb"
                                        strokeWidth={2.5}
                                        fill="url(#financeRevenue)"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="expenses"
                                        stroke="#f59e0b"
                                        strokeWidth={2}
                                        fill="url(#financeExpenses)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Panel>

                    <Panel>
                        <SectionTitle
                            title="Income Breakdown"
                            description="Collection by fee category"
                        />

                        <div className="h-[210px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={incomeBreakdown}
                                        dataKey="amount"
                                        nameKey="name"
                                        innerRadius={55}
                                        outerRadius={82}
                                        paddingAngle={3}
                                        stroke="none"
                                    >
                                        {incomeBreakdown.map((item) => (
                                            <Cell key={item.name} fill={item.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value) => currency(Number(value))}
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
                        </div>

                        <div className="mt-3 space-y-3">
                            {incomeBreakdown.map((item) => (
                                <div
                                    key={item.name}
                                    className="flex items-center justify-between gap-3 text-sm"
                                >
                                    <span className="flex min-w-0 items-center gap-2 text-muted-foreground">
                                        <span
                                            className="size-2.5 shrink-0 rounded-full"
                                            style={{ backgroundColor: item.color }}
                                        />
                                        <span className="truncate">{item.name}</span>
                                    </span>
                                    <span className="shrink-0 font-semibold">
                                        {currency(item.amount)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </Panel>
                </div>

                {/* Payment Methods */}
                <Panel>
                    <SectionTitle
                        title="Collection by Payment Method"
                        description="Understand how students pay their fees"
                        action={
                            <Link
                                href="/accountant/reports/payments"
                                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                            >
                                Payment reports
                                <ArrowUpRight size={15} />
                            </Link>
                        }
                    />

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {paymentMethods.map((item) => (
                            <div
                                key={item.method}
                                className="rounded-xl border border-border p-4"
                            >
                                <div className="flex items-center justify-between gap-2">
                                    <p className="text-sm text-muted-foreground">
                                        {item.method}
                                    </p>
                                    <span className="text-xs font-semibold">
                                        {item.percentage}%
                                    </span>
                                </div>
                                <p className="mt-3 break-words text-xl font-bold">
                                    {currency(item.amount)}
                                </p>
                                <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
                                    <div
                                        className="h-full rounded-full bg-primary"
                                        style={{ width: `${item.percentage}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </Panel>

                {/* Transactions */}
                <Panel className="overflow-hidden">
                    <SectionTitle
                        title="Recent Financial Transactions"
                        description="Latest posted and pending financial records"
                        action={
                            <Link
                                href="/accountant/transactions"
                                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                            >
                                View transactions
                                <ArrowUpRight size={15} />
                            </Link>
                        }
                    />

                    <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                        <input
                            type="search"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search transaction, category..."
                            className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 lg:max-w-sm"
                            aria-label="Search financial transactions"
                        />

                        <div className="flex flex-wrap items-center gap-2">
                            <Filter size={16} className="text-muted-foreground" />
                            {["ALL", "INCOME", "REFUND"].map((filter) => (
                                <button
                                    key={filter}
                                    type="button"
                                    onClick={() => setTransactionFilter(filter)}
                                    className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${transactionFilter === filter
                                        ? "border-primary bg-primary text-primary-foreground"
                                        : "border-border hover:bg-muted"
                                        }`}
                                >
                                    {filter === "ALL" ? "All types" : filter}
                                </button>
                            ))}

                            <button
                                type="button"
                                onClick={exportCSV}
                                className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-semibold transition hover:bg-muted"
                            >
                                <FileSpreadsheet size={15} />
                                Export
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[760px] text-left text-sm">
                            <thead>
                                <tr className="border-y border-border bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                                    <th className="px-4 py-3 font-medium">Transaction</th>
                                    <th className="px-4 py-3 font-medium">Category</th>
                                    <th className="px-4 py-3 font-medium">Date</th>
                                    <th className="px-4 py-3 font-medium">Type</th>
                                    <th className="px-4 py-3 font-medium">Amount</th>
                                    <th className="px-4 py-3 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTransactions.map((transaction) => (
                                    <tr
                                        key={transaction.id}
                                        className="border-b border-border last:border-0 hover:bg-muted/30"
                                    >
                                        <td className="px-4 py-4">
                                            <p className="font-semibold">{transaction.id}</p>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {transaction.description}
                                            </p>
                                        </td>
                                        <td className="px-4 py-4 text-muted-foreground">
                                            {transaction.category}
                                        </td>
                                        <td className="px-4 py-4 text-muted-foreground">
                                            {transaction.date}
                                        </td>
                                        <td className="px-4 py-4">
                                            <span
                                                className={
                                                    transaction.type === "REFUND"
                                                        ? "font-semibold text-red-600"
                                                        : "font-semibold text-emerald-600"
                                                }
                                            >
                                                {transaction.type}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 font-semibold">
                                            {transaction.type === "REFUND" ? "−" : ""}
                                            {currency(transaction.amount)}
                                        </td>
                                        <td className="px-4 py-4">
                                            <StatusBadge status={transaction.status} />
                                        </td>
                                    </tr>
                                ))}

                                {filteredTransactions.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="px-4 py-12 text-center text-sm text-muted-foreground"
                                        >
                                            No transactions match your search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Panel>

                {/* Footer Note */}
                <div className="flex flex-col gap-2 border-t border-border pt-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                    <p>CampusFlow · Financial Reporting</p>
                    <p>Illustrative sample data — connect to verified backend records before production use.</p>
                </div>
            </div>
        </main>
    );
}
