// import React from 'react'

// export default function scholarshipsReport() {
//     return (
//         <div>scholarshipsReport</div>
//     )
// }








"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
    ArrowDownToLine,
    ArrowDownRight,
    ArrowRight,
    ArrowUpRight,
    Award,
    CalendarDays,
    CheckCircle2,
    ChevronDown,
    Clock3,
    Download,
    FileText,
    GraduationCap,
    HandCoins,
    Search,
    SlidersHorizontal,
    TrendingUp,
    Users,
    Wallet,
    XCircle,
} from "lucide-react";
import {
    Area,
    AreaChart,
    CartesianGrid,
    Pie,
    PieChart,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

type ScholarshipStatus =
    | "APPROVED"
    | "PENDING"
    | "REJECTED"
    | "EXPIRED";

type ScholarshipType =
    | "MERIT"
    | "NEED_BASED"
    | "SPORTS"
    | "TUITION_WAIVER"
    | "OTHER";

type ScholarshipRecord = {
    id: string;
    studentName: string;
    studentId: string;
    department: string;
    program: string;
    scholarshipName: string;
    type: ScholarshipType;
    awardedAmount: number;
    appliedDate: string;
    academicSession: string;
    status: ScholarshipStatus;
};

const monthlyData = [
    { month: "May", amount: 85000, students: 18 },
    { month: "Jun", amount: 112000, students: 24 },
    { month: "Jul", amount: 98000, students: 21 },
    { month: "Aug", amount: 145000, students: 31 },
    { month: "Sep", amount: 126000, students: 27 },
    { month: "Oct", amount: 168000, students: 36 },
];

const distributionData = [
    { name: "Merit Scholarship", value: 38, color: "#2563eb" },
    { name: "Need-Based Aid", value: 28, color: "#10b981" },
    { name: "Tuition Waiver", value: 20, color: "#f59e0b" },
    { name: "Sports Scholarship", value: 9, color: "#8b5cf6" },
    { name: "Other", value: 5, color: "#94a3b8" },
];

const initialRecords: ScholarshipRecord[] = [
    {
        id: "SCH-2026-001",
        studentName: "Ayan Sujon",
        studentId: "STU-2026-0012",
        department: "Computer Science",
        program: "B.Sc. in CSE",
        scholarshipName: "Merit Excellence Award",
        type: "MERIT",
        awardedAmount: 25000,
        appliedDate: "2026-10-02",
        academicSession: "Spring 2026",
        status: "APPROVED",
    },
    {
        id: "SCH-2026-002",
        studentName: "Nusrat Jahan",
        studentId: "STU-2025-0048",
        department: "Business Administration",
        program: "BBA",
        scholarshipName: "Need-Based Financial Aid",
        type: "NEED_BASED",
        awardedAmount: 18000,
        appliedDate: "2026-10-03",
        academicSession: "Spring 2026",
        status: "APPROVED",
    },
    {
        id: "SCH-2026-003",
        studentName: "Rahim Ahmed",
        studentId: "STU-2024-0091",
        department: "Computer Science",
        program: "B.Sc. in CSE",
        scholarshipName: "Tuition Fee Waiver",
        type: "TUITION_WAIVER",
        awardedAmount: 12000,
        appliedDate: "2026-10-04",
        academicSession: "Spring 2026",
        status: "PENDING",
    },
    {
        id: "SCH-2026-004",
        studentName: "Maliha Islam",
        studentId: "STU-2026-0035",
        department: "Electrical Engineering",
        program: "B.Sc. in EEE",
        scholarshipName: "Sports Achievement Grant",
        type: "SPORTS",
        awardedAmount: 15000,
        appliedDate: "2026-10-05",
        academicSession: "Spring 2026",
        status: "APPROVED",
    },
    {
        id: "SCH-2026-005",
        studentName: "Tanvir Hasan",
        studentId: "STU-2025-0021",
        department: "Computer Science",
        program: "B.Sc. in CSE",
        scholarshipName: "Merit Excellence Award",
        type: "MERIT",
        awardedAmount: 22000,
        appliedDate: "2026-10-06",
        academicSession: "Spring 2026",
        status: "PENDING",
    },
    {
        id: "SCH-2026-006",
        studentName: "Samia Akter",
        studentId: "STU-2024-0062",
        department: "Business Administration",
        program: "BBA",
        scholarshipName: "Need-Based Financial Aid",
        type: "NEED_BASED",
        awardedAmount: 10000,
        appliedDate: "2026-10-07",
        academicSession: "Spring 2026",
        status: "REJECTED",
    },
    {
        id: "SCH-2026-007",
        studentName: "Fahim Chowdhury",
        studentId: "STU-2023-0017",
        department: "Electrical Engineering",
        program: "B.Sc. in EEE",
        scholarshipName: "Tuition Fee Waiver",
        type: "TUITION_WAIVER",
        awardedAmount: 20000,
        appliedDate: "2026-10-08",
        academicSession: "Spring 2026",
        status: "EXPIRED",
    },
];

const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT",
        maximumFractionDigits: 0,
    }).format(amount);

const formatDate = (value: string) =>
    new Date(`${value}T00:00:00`).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

const typeLabels: Record<ScholarshipType, string> = {
    MERIT: "Merit",
    NEED_BASED: "Need-Based",
    SPORTS: "Sports",
    TUITION_WAIVER: "Tuition Waiver",
    OTHER: "Other",
};

const statusClasses: Record<ScholarshipStatus, string> = {
    APPROVED:
        "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400",
    PENDING:
        "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400",
    REJECTED:
        "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400",
    EXPIRED:
        "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
};

function StatusBadge({ status }: { status: ScholarshipStatus }) {
    const Icon =
        status === "APPROVED"
            ? CheckCircle2
            : status === "PENDING"
                ? Clock3
                : XCircle;

    return (
        <span
            className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${statusClasses[status]}`}
        >
            <Icon size={13} />
            {status.replace("_", " ")}
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
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
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

function MetricCard({
    title,
    value,
    description,
    icon: Icon,
    trend,
    tone,
}: {
    title: string;
    value: string;
    description: string;
    icon: React.ElementType;
    trend?: string;
    tone: "blue" | "green" | "amber" | "violet";
}) {
    const tones = {
        blue: "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400",
        green:
            "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400",
        amber:
            "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400",
        violet:
            "bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-400",
    };

    return (
        <Panel>
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-sm text-muted-foreground">{title}</p>
                    <p className="mt-2 break-words text-2xl font-bold tracking-tight">
                        {value}
                    </p>
                </div>
                <div
                    className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${tones[tone]}`}
                >
                    <Icon size={21} />
                </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-1.5 text-xs">
                {trend && (
                    <span className="inline-flex items-center gap-0.5 font-semibold text-emerald-600">
                        <ArrowUpRight size={14} />
                        {trend}
                    </span>
                )}
                <span className="text-muted-foreground">{description}</span>
            </div>
        </Panel>
    );
}

function downloadCsv(records: ScholarshipRecord[]) {
    const headers = [
        "Scholarship ID",
        "Student Name",
        "Student ID",
        "Department",
        "Program",
        "Scholarship",
        "Type",
        "Amount BDT",
        "Applied Date",
        "Academic Session",
        "Status",
    ];

    const rows = records.map((record) => [
        record.id,
        record.studentName,
        record.studentId,
        record.department,
        record.program,
        record.scholarshipName,
        typeLabels[record.type],
        record.awardedAmount,
        record.appliedDate,
        record.academicSession,
        record.status,
    ]);

    const escapeCsv = (value: string | number) =>
        `"${String(value).replace(/"/g, '""')}"`;

    const csv = [headers, ...rows]
        .map((row) => row.map(escapeCsv).join(","))
        .join("\r\n");

    const blob = new Blob(["\uFEFF", csv], {
        type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = "campusflow-scholarships-report.csv";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
}

export default function ScholarshipsReport() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [typeFilter, setTypeFilter] = useState("ALL");
    const [sessionFilter, setSessionFilter] = useState("ALL");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [page, setPage] = useState(1);
    const pageSize = 5;

    const filteredRecords = useMemo(() => {
        const query = search.trim().toLowerCase();

        return initialRecords.filter((record) => {
            const matchesSearch =
                !query ||
                [
                    record.id,
                    record.studentName,
                    record.studentId,
                    record.department,
                    record.program,
                    record.scholarshipName,
                ].some((value) => value.toLowerCase().includes(query));

            const matchesStatus =
                statusFilter === "ALL" || record.status === statusFilter;
            const matchesType =
                typeFilter === "ALL" || record.type === typeFilter;
            const matchesSession =
                sessionFilter === "ALL" ||
                record.academicSession === sessionFilter;
            const matchesFrom = !dateFrom || record.appliedDate >= dateFrom;
            const matchesTo = !dateTo || record.appliedDate <= dateTo;

            return (
                matchesSearch &&
                matchesStatus &&
                matchesType &&
                matchesSession &&
                matchesFrom &&
                matchesTo
            );
        });
    }, [search, statusFilter, typeFilter, sessionFilter, dateFrom, dateTo]);

    const approvedRecords = filteredRecords.filter(
        (record) => record.status === "APPROVED",
    );

    const approvedTotal = approvedRecords.reduce(
        (sum, record) => sum + record.awardedAmount,
        0,
    );

    const pendingCount = filteredRecords.filter(
        (record) => record.status === "PENDING",
    ).length;

    const totalPages = Math.max(1, Math.ceil(filteredRecords.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const visibleRecords = filteredRecords.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize,
    );

    const resetFilters = () => {
        setSearch("");
        setStatusFilter("ALL");
        setTypeFilter("ALL");
        setSessionFilter("ALL");
        setDateFrom("");
        setDateTo("");
        setPage(1);
    };

    return (
        <main className="min-h-screen min-w-0 overflow-x-clip bg-background text-foreground">
            <div className="mx-auto w-full max-w-[1600px] space-y-6 p-3">
                {/* Header */}
                <header className="flex min-w-0 flex-col justify-between gap-4 lg:flex-row lg:items-center">
                    <div className="min-w-0">

                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            Scholarships Report
                        </h1>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                            Review scholarship awards, tuition waivers, financial aid
                            distribution and their impact on student fees.
                        </p>
                    </div>

                    <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap">
                        <Link
                            href="/accountant/scholarships"
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border px-4 text-sm font-medium transition hover:bg-muted"
                        >
                            <Award size={16} />
                            Manage Scholarships
                        </Link>
                        <button
                            type="button"
                            onClick={() => downloadCsv(filteredRecords)}
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                        >
                            <Download size={16} />
                            Export CSV
                        </button>
                    </div>
                </header>

                {/* KPI cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <MetricCard
                        title="Approved Aid"
                        value={formatCurrency(approvedTotal)}
                        description="Approved in current filtered results"
                        icon={HandCoins}
                        trend="Scholarship value"
                        tone="blue"
                    />
                    <MetricCard
                        title="Students Supported"
                        value={String(
                            new Set(approvedRecords.map((record) => record.studentId)).size,
                        )}
                        description="Unique students with approved aid"
                        icon={Users}
                        tone="green"
                    />
                    <MetricCard
                        title="Pending Applications"
                        value={String(pendingCount)}
                        description="Awaiting a decision"
                        icon={Clock3}
                        tone="amber"
                    />
                    <MetricCard
                        title="Total Applications"
                        value={String(filteredRecords.length)}
                        description="Matching current filters"
                        icon={GraduationCap}
                        tone="violet"
                    />
                </div>

                {/* Charts */}
                <div className="grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-3">
                    <Panel className="xl:col-span-2">
                        <SectionHeading
                            title="Scholarship Distribution Trend"
                            description="Illustrative monthly approved aid value"
                        />

                        <div className="mb-4 flex flex-wrap items-center gap-5">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span className="size-2.5 rounded-full bg-blue-600" />
                                Awarded amount
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span className="size-2.5 rounded-full bg-emerald-500" />
                                Number of recipients
                            </div>
                        </div>

                        <div className="h-[260px] min-w-0 w-full sm:h-[310px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart
                                    data={monthlyData}
                                    margin={{ top: 8, right: 8, left: -14, bottom: 0 }}
                                >
                                    <defs>
                                        <linearGradient
                                            id="scholarshipArea"
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
                                        width={55}
                                        tick={{ fill: "currentColor", fontSize: 11, opacity: 0.65 }}
                                        tickFormatter={(value) =>
                                            value >= 1000 ? `${value / 1000}k` : value
                                        }
                                    />
                                    <Tooltip
                                        formatter={(value, name) => [
                                            name === "amount"
                                                ? formatCurrency(Number(value))
                                                : Number(value),
                                            name === "amount" ? "Awarded Amount" : "Students",
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
                                        dataKey="amount"
                                        stroke="#2563eb"
                                        strokeWidth={2.5}
                                        fill="url(#scholarshipArea)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Panel>

                    <Panel>
                        <SectionHeading
                            title="Aid by Category"
                            description="Illustrative distribution by scholarship type"
                        />

                        <div className="relative h-[230px] min-w-0 sm:h-[250px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={distributionData}
                                        dataKey="value"
                                        nameKey="name"
                                        innerRadius="60%"
                                        outerRadius="84%"
                                        paddingAngle={3}
                                        stroke="none"
                                    >
                                        {distributionData.map((entry) => (
                                            <Cell key={entry.name} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value) => [`${value}%`, "Share"]}
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
                                <span className="text-xs text-muted-foreground">Categories</span>
                                <span className="mt-1 text-2xl font-bold">
                                    {distributionData.length}
                                </span>
                            </div>
                        </div>

                        <div className="mt-3 space-y-3">
                            {distributionData.map((item) => (
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
                                    <span className="shrink-0 font-semibold">{item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </Panel>
                </div>

                {/* Impact summary */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Panel>
                        <div className="flex items-start gap-3">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
                                <Wallet size={19} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm text-muted-foreground">
                                    Tuition Fee Reduction
                                </p>
                                <p className="mt-1 text-xl font-bold">
                                    {formatCurrency(
                                        initialRecords
                                            .filter(
                                                (record) =>
                                                    record.status === "APPROVED" &&
                                                    record.type === "TUITION_WAIVER",
                                            )
                                            .reduce((sum, record) => sum + record.awardedAmount, 0),
                                    )}
                                </p>
                                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                    Approved tuition waivers in sample records
                                </p>
                            </div>
                        </div>
                    </Panel>

                    <Panel>
                        <div className="flex items-start gap-3">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                                <TrendingUp size={19} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm text-muted-foreground">
                                    Average Approved Award
                                </p>
                                <p className="mt-1 text-xl font-bold">
                                    {formatCurrency(
                                        approvedRecords.length
                                            ? Math.round(approvedTotal / approvedRecords.length)
                                            : 0,
                                    )}
                                </p>
                                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                    Average amount per approved record
                                </p>
                            </div>
                        </div>
                    </Panel>

                    <Panel>
                        <div className="flex items-start gap-3">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
                                <Clock3 size={19} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm text-muted-foreground">
                                    Aid Awaiting Decision
                                </p>
                                <p className="mt-1 text-xl font-bold">
                                    {formatCurrency(
                                        filteredRecords
                                            .filter((record) => record.status === "PENDING")
                                            .reduce(
                                                (sum, record) => sum + record.awardedAmount,
                                                0,
                                            ),
                                    )}
                                </p>
                                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                    Requested amount, not yet approved expenditure
                                </p>
                            </div>
                        </div>
                    </Panel>
                </div>

                {/* Table */}
                <Panel className="overflow-hidden">
                    <SectionHeading
                        title="Scholarship Records"
                        description="Search, filter and export scholarship applications and awards."
                        action={
                            <button
                                type="button"
                                onClick={() => downloadCsv(filteredRecords)}
                                className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-border px-3 text-sm font-medium transition hover:bg-muted"
                            >
                                <ArrowDownToLine size={15} />
                                Export results
                            </button>
                        }
                    />

                    {/* Filters */}
                    <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-6">
                        <div className="relative sm:col-span-2 xl:col-span-2">
                            <Search
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                            />
                            <input
                                value={search}
                                onChange={(event) => {
                                    setSearch(event.target.value);
                                    setPage(1);
                                }}
                                placeholder="Search student, ID, scholarship..."
                                className="h-10 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm outline-none transition focus:border-primary"
                            />
                        </div>

                        <select
                            value={statusFilter}
                            onChange={(event) => {
                                setStatusFilter(event.target.value);
                                setPage(1);
                            }}
                            className="h-10 min-w-0 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary"
                            aria-label="Filter by scholarship status"
                        >
                            <option value="ALL">All statuses</option>
                            <option value="APPROVED">Approved</option>
                            <option value="PENDING">Pending</option>
                            <option value="REJECTED">Rejected</option>
                            <option value="EXPIRED">Expired</option>
                        </select>

                        <select
                            value={typeFilter}
                            onChange={(event) => {
                                setTypeFilter(event.target.value);
                                setPage(1);
                            }}
                            className="h-10 min-w-0 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary"
                            aria-label="Filter by scholarship type"
                        >
                            <option value="ALL">All types</option>
                            <option value="MERIT">Merit</option>
                            <option value="NEED_BASED">Need-Based</option>
                            <option value="SPORTS">Sports</option>
                            <option value="TUITION_WAIVER">Tuition Waiver</option>
                            <option value="OTHER">Other</option>
                        </select>

                        <select
                            value={sessionFilter}
                            onChange={(event) => {
                                setSessionFilter(event.target.value);
                                setPage(1);
                            }}
                            className="h-10 min-w-0 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary"
                            aria-label="Filter by academic session"
                        >
                            <option value="ALL">All sessions</option>
                            <option value="Spring 2026">Spring 2026</option>
                        </select>

                        <button
                            type="button"
                            onClick={resetFilters}
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border px-3 text-sm font-medium transition hover:bg-muted"
                        >
                            <SlidersHorizontal size={15} />
                            Reset filters
                        </button>
                    </div>

                    <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <label className="flex min-w-0 flex-col gap-1.5 text-xs text-muted-foreground">
                            Application date from
                            <input
                                type="date"
                                value={dateFrom}
                                onChange={(event) => {
                                    setDateFrom(event.target.value);
                                    setPage(1);
                                }}
                                className="h-10 min-w-0 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
                            />
                        </label>
                        <label className="flex min-w-0 flex-col gap-1.5 text-xs text-muted-foreground">
                            Application date to
                            <input
                                type="date"
                                value={dateTo}
                                min={dateFrom || undefined}
                                onChange={(event) => {
                                    setDateTo(event.target.value);
                                    setPage(1);
                                }}
                                className="h-10 min-w-0 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
                            />
                        </label>
                    </div>

                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
                        <span>
                            Showing {visibleRecords.length} of {filteredRecords.length} records
                        </span>
                        <span className="font-medium text-foreground">
                            Approved total: {formatCurrency(approvedTotal)}
                        </span>
                    </div>

                    {/* Desktop/tablet table */}
                    <div className="hidden overflow-x-auto md:block">
                        <table className="w-full min-w-[1000px] text-left text-sm">
                            <thead>
                                <tr className="border-y border-border bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                                    <th className="px-4 py-3 font-medium">Student</th>
                                    <th className="px-4 py-3 font-medium">Scholarship</th>
                                    <th className="px-4 py-3 font-medium">Type</th>
                                    <th className="px-4 py-3 font-medium">Amount</th>
                                    <th className="px-4 py-3 font-medium">Applied Date</th>
                                    <th className="px-4 py-3 font-medium">Session</th>
                                    <th className="px-4 py-3 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {visibleRecords.map((record) => (
                                    <tr
                                        key={record.id}
                                        className="border-b border-border last:border-0 transition hover:bg-muted/30"
                                    >
                                        <td className="px-4 py-4">
                                            <p className="font-semibold">{record.studentName}</p>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {record.studentId}
                                            </p>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {record.department}
                                            </p>
                                        </td>
                                        <td className="px-4 py-4">
                                            <p className="font-medium">{record.scholarshipName}</p>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {record.id}
                                            </p>
                                        </td>
                                        <td className="px-4 py-4 text-muted-foreground">
                                            {typeLabels[record.type]}
                                        </td>
                                        <td className="px-4 py-4 font-semibold">
                                            {formatCurrency(record.awardedAmount)}
                                        </td>
                                        <td className="px-4 py-4 text-muted-foreground">
                                            {formatDate(record.appliedDate)}
                                        </td>
                                        <td className="px-4 py-4 text-muted-foreground">
                                            {record.academicSession}
                                        </td>
                                        <td className="px-4 py-4">
                                            <StatusBadge status={record.status} />
                                        </td>
                                    </tr>
                                ))}
                                {visibleRecords.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="px-4 py-12 text-center text-sm text-muted-foreground"
                                        >
                                            No scholarship records match your filters.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile cards */}
                    <div className="space-y-3 md:hidden">
                        {visibleRecords.map((record) => (
                            <article
                                key={record.id}
                                className="rounded-xl border border-border p-4"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex min-w-0 items-start gap-3">
                                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                            <GraduationCap size={19} />
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="break-words text-sm font-semibold">
                                                {record.studentName}
                                            </h3>
                                            <p className="mt-1 break-all text-xs text-muted-foreground">
                                                {record.studentId}
                                            </p>
                                        </div>
                                    </div>
                                    <StatusBadge status={record.status} />
                                </div>

                                <div className="mt-4 border-t border-border pt-3">
                                    <p className="break-words text-sm font-medium">
                                        {record.scholarshipName}
                                    </p>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {record.id} · {typeLabels[record.type]}
                                    </p>

                                    <div className="mt-4 grid grid-cols-2 gap-3">
                                        <div className="min-w-0">
                                            <p className="text-xs text-muted-foreground">Award amount</p>
                                            <p className="mt-1 break-words text-sm font-bold">
                                                {formatCurrency(record.awardedAmount)}
                                            </p>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs text-muted-foreground">Applied date</p>
                                            <p className="mt-1 text-sm font-medium">
                                                {formatDate(record.appliedDate)}
                                            </p>
                                        </div>
                                        <div className="col-span-2 min-w-0">
                                            <p className="text-xs text-muted-foreground">
                                                Department / Program
                                            </p>
                                            <p className="mt-1 break-words text-sm">
                                                {record.department} · {record.program}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}

                        {visibleRecords.length === 0 && (
                            <div className="rounded-xl border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground">
                                No scholarship records match your filters.
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="mt-5 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs text-muted-foreground">
                            Page {currentPage} of {totalPages}
                        </p>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                disabled={currentPage === 1}
                                onClick={() => setPage((value) => Math.max(1, value - 1))}
                                className="h-9 rounded-lg border border-border px-3 text-sm font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Previous
                            </button>
                            <button
                                type="button"
                                disabled={currentPage >= totalPages}
                                onClick={() =>
                                    setPage((value) => Math.min(totalPages, value + 1))
                                }
                                className="h-9 rounded-lg border border-border px-3 text-sm font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </Panel>

                {/* Note */}
                <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/30 p-4">
                    <FileText
                        size={19}
                        className="mt-0.5 shrink-0 text-muted-foreground"
                    />
                    <div className="min-w-0">
                        <p className="text-sm font-semibold">Financial reporting note</p>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                            Approved scholarship amounts are not automatically the same as
                            cash paid or tuition revenue collected. Apply a scholarship or
                            waiver to the relevant invoice according to your finance rules,
                            and calculate the actual tuition reduction from posted financial
                            records. All values in this demo are illustrative.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
