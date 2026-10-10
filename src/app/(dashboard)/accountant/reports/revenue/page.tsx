// import React from 'react'

// export default function revenueReports() {
//     return (
//         <div>revenueReports</div>
//     )
// }













"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
    ArrowDownToLine,
    ArrowDownRight,
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    BarChart3,
    CalendarDays,
    CheckCircle2,
    ChevronDown,
    Download,
    FileSpreadsheet,
    Filter,
    GraduationCap,
    Layers3,
    RefreshCw,
    Search,
    TrendingUp,
    Wallet,
} from "lucide-react";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

type FeeType = {
    name: string;
    amount: number;
    transactions: number;
    color: string;
};

type Department = {
    name: string;
    code: string;
    revenue: number;
    transactions: number;
    students: number;
};

type Program = {
    name: string;
    department: string;
    revenue: number;
    transactions: number;
};

const monthlyRevenue = [
    { month: "May", revenue: 325000, previous: 285000 },
    { month: "Jun", revenue: 410000, previous: 340000 },
    { month: "Jul", revenue: 375000, previous: 390000 },
    { month: "Aug", revenue: 520000, previous: 430000 },
    { month: "Sep", revenue: 465000, previous: 410000 },
    { month: "Oct", revenue: 610000, previous: 480000 },
];

const feeTypes: FeeType[] = [
    {
        name: "Tuition Fees",
        amount: 980000,
        transactions: 186,
        color: "#2563eb",
    },
    {
        name: "Admission Fees",
        amount: 320000,
        transactions: 64,
        color: "#7c3aed",
    },
    {
        name: "Examination Fees",
        amount: 185000,
        transactions: 92,
        color: "#0d9488",
    },
    {
        name: "Laboratory Fees",
        amount: 145000,
        transactions: 48,
        color: "#d97706",
    },
    {
        name: "Other Fees",
        amount: 85000,
        transactions: 37,
        color: "#db2777",
    },
];

const departments: Department[] = [
    {
        name: "Computer Science & Engineering",
        code: "CSE",
        revenue: 485000,
        transactions: 128,
        students: 185,
    },
    {
        name: "Business Administration",
        code: "BBA",
        revenue: 365000,
        transactions: 96,
        students: 142,
    },
    {
        name: "Electrical & Electronic Engineering",
        code: "EEE",
        revenue: 310000,
        transactions: 84,
        students: 118,
    },
    {
        name: "Civil Engineering",
        code: "CE",
        revenue: 255000,
        transactions: 72,
        students: 105,
    },
    {
        name: "English",
        code: "ENG",
        revenue: 185000,
        transactions: 47,
        students: 88,
    },
];

const programs: Program[] = [
    {
        name: "B.Sc. in Computer Science",
        department: "CSE",
        revenue: 285000,
        transactions: 76,
    },
    {
        name: "BBA",
        department: "BBA",
        revenue: 245000,
        transactions: 64,
    },
    {
        name: "B.Sc. in Electrical Engineering",
        department: "EEE",
        revenue: 210000,
        transactions: 55,
    },
    {
        name: "B.Sc. in Civil Engineering",
        department: "CE",
        revenue: 185000,
        transactions: 49,
    },
    {
        name: "B.A. in English",
        department: "ENG",
        revenue: 125000,
        transactions: 36,
    },
];

const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT",
        maximumFractionDigits: 0,
    }).format(amount);

const formatCompactCurrency = (amount: number) => {
    if (amount >= 100000) {
        return `৳${(amount / 100000).toFixed(1)}L`;
    }
    if (amount >= 1000) {
        return `৳${(amount / 1000).toFixed(0)}K`;
    }
    return `৳${amount}`;
};

function Panel({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <section
            className={`rounded-xl border border-border bg-card p-5 shadow-sm ${className}`}
        >
            {children}
        </section>
    );
}

function SectionHeading({
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

function StatCard({
    title,
    value,
    subtitle,
    change,
    positive = true,
    icon: Icon,
}: {
    title: string;
    value: string;
    subtitle: string;
    change?: string;
    positive?: boolean;
    icon: React.ElementType;
}) {
    return (
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={21} />
                </div>
                {change && (
                    <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${positive
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                            : "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400"
                            }`}
                    >
                        {positive ? (
                            <ArrowUpRight size={13} />
                        ) : (
                            <ArrowDownRight size={13} />
                        )}
                        {change}
                    </span>
                )}
            </div>
            <p className="mt-5 text-sm text-muted-foreground">{title}</p>
            <p className="mt-1 break-words text-2xl font-bold tracking-tight">
                {value}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">{subtitle}</p>
        </div>
    );
}

function ProgressBar({
    value,
    color,
}: {
    value: number;
    color: string;
}) {
    return (
        <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
                className="h-full rounded-full transition-all"
                style={{
                    width: `${Math.min(100, Math.max(0, value))}%`,
                    backgroundColor: color,
                }}
            />
        </div>
    );
}

function exportCsv(filename: string, rows: (string | number)[][]) {
    const csv = rows
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
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
}

export default function RevenueReports() {
    const [period, setPeriod] = useState("6months");
    const [feeFilter, setFeeFilter] = useState("all");
    const [departmentSearch, setDepartmentSearch] = useState("");
    const [programSearch, setProgramSearch] = useState("");
    const [activeTab, setActiveTab] = useState<"departments" | "programs">(
        "departments"
    );

    const filteredChart = useMemo(() => {
        if (period === "3months") return monthlyRevenue.slice(-3);
        if (period === "6months") return monthlyRevenue;
        return monthlyRevenue.slice(-1);
    }, [period]);

    const filteredFees = useMemo(() => {
        if (feeFilter === "all") return feeTypes;
        return feeTypes.filter((fee) => fee.name === feeFilter);
    }, [feeFilter]);

    const filteredDepartments = useMemo(
        () =>
            departments.filter((department) =>
                `${department.name} ${department.code}`
                    .toLowerCase()
                    .includes(departmentSearch.toLowerCase())
            ),
        [departmentSearch]
    );

    const filteredPrograms = useMemo(
        () =>
            programs.filter((program) =>
                `${program.name} ${program.department}`
                    .toLowerCase()
                    .includes(programSearch.toLowerCase())
            ),
        [programSearch]
    );

    const exportRevenueReport = () => {
        exportCsv("campusflow-revenue-report.csv", [
            ["CampusFlow Revenue Report"],
            ["Period", period],
            [],
            ["Fee Type", "Revenue (BDT)", "Transactions"],
            ...filteredFees.map((fee) => [
                fee.name,
                fee.amount,
                fee.transactions,
            ]),
            [],
            ["Department", "Code", "Revenue (BDT)", "Transactions", "Students"],
            ...filteredDepartments.map((department) => [
                department.name,
                department.code,
                department.revenue,
                department.transactions,
                department.students,
            ]),
            [],
            ["Program", "Department", "Revenue (BDT)", "Transactions"],
            ...filteredPrograms.map((program) => [
                program.name,
                program.department,
                program.revenue,
                program.transactions,
            ]),
        ]);
    };

    return (
        <main className="min-h-screen bg-background text-foreground">
            <div className="mx-auto max-w-[1600px] space-y-7 p-4 sm:p-6 lg:p-8">
                {/* Page Header */}
                <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                    <div>

                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            Revenue Reports
                        </h1>
                        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                            Analyze collected revenue by time period, fee type, department
                            and academic program.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <Link
                            href="/accountant/reports/financial"
                            className="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-3 text-sm font-medium transition hover:bg-muted"
                        >
                            <ArrowLeft size={16} />
                            All Reports
                        </Link>
                        <button
                            type="button"
                            onClick={exportRevenueReport}
                            className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                        >
                            <Download size={16} />
                            Export CSV
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <Panel>
                    <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <label
                                    htmlFor="period"
                                    className="text-sm font-medium"
                                >
                                    Reporting Period
                                </label>
                                <div className="relative">
                                    <CalendarDays
                                        size={16}
                                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                    />
                                    <select
                                        id="period"
                                        value={period}
                                        onChange={(event) => setPeriod(event.target.value)}
                                        className="h-10 w-full min-w-[190px] appearance-none rounded-lg border border-border bg-background pl-9 pr-9 text-sm outline-none focus:ring-2 focus:ring-ring"
                                    >
                                        <option value="1month">Current Month</option>
                                        <option value="3months">Last 3 Months</option>
                                        <option value="6months">Last 6 Months</option>
                                    </select>
                                    <ChevronDown
                                        size={15}
                                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="feeType"
                                    className="text-sm font-medium"
                                >
                                    Fee Category
                                </label>
                                <div className="relative">
                                    <Filter
                                        size={16}
                                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                    />
                                    <select
                                        id="feeType"
                                        value={feeFilter}
                                        onChange={(event) => setFeeFilter(event.target.value)}
                                        className="h-10 w-full min-w-[190px] appearance-none rounded-lg border border-border bg-background pl-9 pr-9 text-sm outline-none focus:ring-2 focus:ring-ring"
                                    >
                                        <option value="all">All Fee Categories</option>
                                        {feeTypes.map((fee) => (
                                            <option key={fee.name} value={fee.name}>
                                                {fee.name}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown
                                        size={15}
                                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <CheckCircle2 size={15} className="text-emerald-600" />
                            Revenue should include verified/settled payments only
                        </div>
                    </div>
                </Panel>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <StatCard
                        title="Total Revenue"
                        value="৳18,45,000"
                        subtitle="Collected revenue in the reporting period"
                        change="+12.8%"
                        icon={Wallet}
                    />
                    <StatCard
                        title="Revenue This Month"
                        value="৳6,10,000"
                        subtitle="Verified collections in October"
                        change="+18.4%"
                        icon={TrendingUp}
                    />
                    <StatCard
                        title="Total Transactions"
                        value="427"
                        subtitle="Successful payment records"
                        change="+7.2%"
                        icon={FileSpreadsheet}
                    />
                    <StatCard
                        title="Average Collection"
                        value="৳4,320"
                        subtitle="Average amount per successful payment"
                        change="-2.1%"
                        positive={false}
                        icon={BarChart3}
                    />
                </div>

                {/* Revenue Chart */}
                <Panel>
                    <SectionHeading
                        title="Revenue Trend"
                        description="Monthly collected revenue compared with the previous period"
                        action={
                            <span className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-medium">
                                <span className="size-2.5 rounded-full bg-blue-600" />
                                Current revenue
                                <span className="ml-2 size-2.5 rounded-full bg-violet-500" />
                                Previous period
                            </span>
                        }
                    />

                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_230px]">
                        <div className="h-[300px] min-w-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart
                                    data={filteredChart}
                                    margin={{ top: 10, right: 12, left: 4, bottom: 0 }}
                                >
                                    <defs>
                                        <linearGradient
                                            id="revenueArea"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="0%"
                                                stopColor="#2563eb"
                                                stopOpacity={0.2}
                                            />
                                            <stop
                                                offset="95%"
                                                stopColor="#2563eb"
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
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "currentColor", fontSize: 11, opacity: 0.65 }}
                                        tickFormatter={formatCompactCurrency}
                                        width={65}
                                    />
                                    <Tooltip
                                        formatter={(value, name) => [
                                            formatCurrency(Number(value)),
                                            name === "revenue" ? "Revenue" : "Previous period",
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
                                        dataKey="previous"
                                        stroke="#8b5cf6"
                                        strokeWidth={2}
                                        fill="transparent"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#2563eb"
                                        strokeWidth={2.5}
                                        fill="url(#revenueArea)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="flex flex-col justify-center gap-5 rounded-xl bg-muted/40 p-5">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Highest month
                                </p>
                                <p className="mt-1 text-xl font-bold">October</p>
                                <p className="mt-1 text-sm font-medium text-emerald-600">
                                    ৳6,10,000
                                </p>
                            </div>
                            <div className="border-t border-border pt-5">
                                <p className="text-sm text-muted-foreground">
                                    Lowest month
                                </p>
                                <p className="mt-1 text-xl font-bold">May</p>
                                <p className="mt-1 text-sm font-medium">৳3,25,000</p>
                            </div>
                            <div className="border-t border-border pt-5">
                                <p className="text-sm text-muted-foreground">
                                    Collection trend
                                </p>
                                <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-emerald-600">
                                    <ArrowUpRight size={17} />
                                    Growing
                                </div>
                            </div>
                        </div>
                    </div>
                </Panel>

                {/* Fee Category Breakdown */}
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    <Panel>
                        <SectionHeading
                            title="Revenue by Fee Type"
                            description="Which fee categories generate the most revenue"
                            action={
                                <Layers3 size={19} className="text-muted-foreground" />
                            }
                        />

                        <div className="space-y-5">
                            {filteredFees.map((fee) => {
                                const total = feeTypes.reduce(
                                    (sum, item) => sum + item.amount,
                                    0
                                );
                                const percentage =
                                    total > 0 ? (fee.amount / total) * 100 : 0;

                                return (
                                    <div key={fee.name}>
                                        <div className="mb-2 flex items-start justify-between gap-3">
                                            <div className="flex min-w-0 items-start gap-3">
                                                <span
                                                    className="mt-1 size-3 shrink-0 rounded-full"
                                                    style={{ backgroundColor: fee.color }}
                                                />
                                                <div className="min-w-0">
                                                    <p className="text-sm font-semibold">{fee.name}</p>
                                                    <p className="mt-1 text-xs text-muted-foreground">
                                                        {fee.transactions} transactions
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="shrink-0 text-right">
                                                <p className="text-sm font-bold">
                                                    {formatCurrency(fee.amount)}
                                                </p>
                                                <p className="mt-1 text-xs text-muted-foreground">
                                                    {percentage.toFixed(1)}%
                                                </p>
                                            </div>
                                        </div>
                                        <ProgressBar value={percentage} color={fee.color} />
                                    </div>
                                );
                            })}
                        </div>
                    </Panel>

                    <Panel>
                        <SectionHeading
                            title="Revenue Insights"
                            description="Summary of the current reporting period"
                        />

                        <div className="space-y-4">
                            <div className="flex items-start gap-3 rounded-xl border border-border p-4">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
                                    <GraduationCap size={19} />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-semibold">
                                        Top revenue source
                                    </p>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Tuition Fees
                                    </p>
                                    <p className="mt-2 text-lg font-bold">
                                        ৳9,80,000
                                    </p>
                                </div>
                                <span className="text-xs font-semibold text-emerald-600">
                                    57.0%
                                </span>
                            </div>

                            <div className="flex items-start gap-3 rounded-xl border border-border p-4">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-400">
                                    <BarChart3 size={19} />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-semibold">
                                        Leading department
                                    </p>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Computer Science & Engineering
                                    </p>
                                    <p className="mt-2 text-lg font-bold">
                                        ৳4,85,000
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 rounded-xl border border-border p-4">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                                    <CheckCircle2 size={19} />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-semibold">
                                        Collection status
                                    </p>
                                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                                        Review verified collections alongside outstanding invoices
                                        for a complete financial picture.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <Link
                            href="/accountant/reports/financial"
                            className="mt-5 flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-3 text-sm font-semibold transition hover:bg-muted"
                        >
                            View financial reports <ArrowRight size={16} />
                        </Link>
                    </Panel>
                </div>

                {/* Department / Program Table */}
                <Panel className="overflow-hidden">
                    <SectionHeading
                        title="Revenue Breakdown"
                        description="Compare collected revenue across academic departments and programs"
                        action={
                            <button
                                type="button"
                                onClick={exportRevenueReport}
                                className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium transition hover:bg-muted"
                            >
                                <ArrowDownToLine size={15} />
                                Export
                            </button>
                        }
                    />

                    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="inline-flex w-fit rounded-lg border border-border bg-muted/40 p-1">
                            <button
                                type="button"
                                onClick={() => setActiveTab("departments")}
                                className={`rounded-md px-3 py-2 text-sm font-medium transition ${activeTab === "departments"
                                    ? "bg-background text-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                Departments
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab("programs")}
                                className={`rounded-md px-3 py-2 text-sm font-medium transition ${activeTab === "programs"
                                    ? "bg-background text-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                Programs
                            </button>
                        </div>

                        <div className="flex h-10 w-full items-center gap-2 rounded-lg border border-border px-3 sm:max-w-xs">
                            <Search size={16} className="shrink-0 text-muted-foreground" />
                            <input
                                value={
                                    activeTab === "departments"
                                        ? departmentSearch
                                        : programSearch
                                }
                                onChange={(event) => {
                                    if (activeTab === "departments") {
                                        setDepartmentSearch(event.target.value);
                                    } else {
                                        setProgramSearch(event.target.value);
                                    }
                                }}
                                placeholder={
                                    activeTab === "departments"
                                        ? "Search departments..."
                                        : "Search programs..."
                                }
                                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        {activeTab === "departments" ? (
                            <table className="w-full min-w-[720px] text-left text-sm">
                                <thead>
                                    <tr className="border-y border-border bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                                        <th className="px-4 py-3 font-medium">Department</th>
                                        <th className="px-4 py-3 font-medium">Students</th>
                                        <th className="px-4 py-3 font-medium">Transactions</th>
                                        <th className="px-4 py-3 font-medium">Revenue</th>
                                        <th className="px-4 py-3 font-medium">Share</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredDepartments.map((department) => {
                                        const total = departments.reduce(
                                            (sum, item) => sum + item.revenue,
                                            0
                                        );
                                        const share =
                                            total > 0 ? (department.revenue / total) * 100 : 0;

                                        return (
                                            <tr
                                                key={department.code}
                                                className="border-b border-border last:border-0 hover:bg-muted/30"
                                            >
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                                                            {department.code}
                                                        </span>
                                                        <div>
                                                            <p className="font-semibold">
                                                                {department.name}
                                                            </p>
                                                            <p className="mt-1 text-xs text-muted-foreground">
                                                                Code: {department.code}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    {department.students}
                                                </td>
                                                <td className="px-4 py-4">
                                                    {department.transactions}
                                                </td>
                                                <td className="px-4 py-4 font-semibold">
                                                    {formatCurrency(department.revenue)}
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="min-w-[110px]">
                                                        <p className="mb-2 text-xs font-medium">
                                                            {share.toFixed(1)}%
                                                        </p>
                                                        <ProgressBar
                                                            value={share}
                                                            color="#2563eb"
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    {filteredDepartments.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="px-4 py-10 text-center text-sm text-muted-foreground"
                                            >
                                                No departments found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        ) : (
                            <table className="w-full min-w-[650px] text-left text-sm">
                                <thead>
                                    <tr className="border-y border-border bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                                        <th className="px-4 py-3 font-medium">Program</th>
                                        <th className="px-4 py-3 font-medium">Department</th>
                                        <th className="px-4 py-3 font-medium">Transactions</th>
                                        <th className="px-4 py-3 font-medium">Revenue</th>
                                        <th className="px-4 py-3 font-medium">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredPrograms.map((program) => (
                                        <tr
                                            key={program.name}
                                            className="border-b border-border last:border-0 hover:bg-muted/30"
                                        >
                                            <td className="px-4 py-4 font-semibold">
                                                {program.name}
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium">
                                                    {program.department}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4">{program.transactions}</td>
                                            <td className="px-4 py-4 font-semibold">
                                                {formatCurrency(program.revenue)}
                                            </td>
                                            <td className="px-4 py-4">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        exportCsv(
                                                            `${program.department.toLowerCase()}-revenue.csv`,
                                                            [
                                                                ["Program", "Department", "Revenue", "Transactions"],
                                                                [
                                                                    program.name,
                                                                    program.department,
                                                                    program.revenue,
                                                                    program.transactions,
                                                                ],
                                                            ]
                                                        )
                                                    }
                                                    aria-label={`Export ${program.name} revenue`}
                                                    className="inline-flex size-9 items-center justify-center rounded-lg border border-border hover:bg-muted"
                                                >
                                                    <Download size={15} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredPrograms.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="px-4 py-10 text-center text-sm text-muted-foreground"
                                            >
                                                No programs found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </Panel>

                {/* Report Footer */}
                <div className="flex flex-col gap-2 border-t border-border pt-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                    <p>CampusFlow · Revenue Analytics</p>
                    <p>Sample data for UI preview. Connect your API for live reporting.</p>
                </div>
            </div>
        </main>
    );
}
