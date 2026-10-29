"use client";

import { useMemo, useState } from "react";
import {
    Activity,
    ArrowDownRight,
    ArrowUpRight,
    BarChart3,
    BookOpen,
    CalendarDays,
    CheckCircle2,
    ChevronDown,
    Download,
    GraduationCap,
    MoreHorizontal,
    RefreshCw,
    Users,
    Wallet,
} from "lucide-react";

type Period = "7d" | "30d" | "90d" | "year";

type EnrollmentPoint = {
    label: string;
    students: number;
    previous: number;
};

const enrollmentData: Record<Period, EnrollmentPoint[]> = {
    "7d": [
        { label: "Mon", students: 42, previous: 35 },
        { label: "Tue", students: 58, previous: 43 },
        { label: "Wed", students: 49, previous: 48 },
        { label: "Thu", students: 72, previous: 51 },
        { label: "Fri", students: 64, previous: 55 },
        { label: "Sat", students: 86, previous: 61 },
        { label: "Sun", students: 77, previous: 59 },
    ],
    "30d": [
        { label: "Week 1", students: 145, previous: 120 },
        { label: "Week 2", students: 188, previous: 150 },
        { label: "Week 3", students: 164, previous: 142 },
        { label: "Week 4", students: 230, previous: 190 },
    ],
    "90d": [
        { label: "Aug", students: 540, previous: 480 },
        { label: "Sep", students: 680, previous: 590 },
        { label: "Oct", students: 790, previous: 710 },
    ],
    year: [
        { label: "May", students: 410, previous: 380 },
        { label: "Jun", students: 480, previous: 420 },
        { label: "Jul", students: 520, previous: 460 },
        { label: "Aug", students: 610, previous: 500 },
        { label: "Sep", students: 690, previous: 570 },
        { label: "Oct", students: 790, previous: 650 },
    ],
};

const academicData = [
    { grade: "A+", percentage: 12, color: "bg-emerald-500" },
    { grade: "A", percentage: 24, color: "bg-blue-600" },
    { grade: "A-", percentage: 19, color: "bg-indigo-500" },
    { grade: "B", percentage: 22, color: "bg-amber-500" },
    { grade: "C", percentage: 15, color: "bg-orange-500" },
    { grade: "F", percentage: 8, color: "bg-rose-500" },
];

const departmentData = [
    { name: "Computer Science", students: 420, percentage: 84 },
    { name: "Business Administration", students: 350, percentage: 70 },
    { name: "Electrical Engineering", students: 280, percentage: 56 },
    { name: "Economics", students: 210, percentage: 42 },
    { name: "English", students: 160, percentage: 32 },
];

const recentReports = [
    {
        title: "Academic Performance Summary",
        category: "Academic",
        date: "Oct 12, 2026",
        status: "Ready",
    },
    {
        title: "Monthly Financial Summary",
        category: "Financial",
        date: "Oct 10, 2026",
        status: "Ready",
    },
    {
        title: "Student Enrollment Analysis",
        category: "Enrollment",
        date: "Oct 08, 2026",
        status: "Ready",
    },
    {
        title: "Attendance Performance",
        category: "Attendance",
        date: "Oct 06, 2026",
        status: "Processing",
    },
];

function formatNumber(value: number) {
    return new Intl.NumberFormat("en-US").format(value);
}

function MetricCard({
    title,
    value,
    change,
    description,
    icon: Icon,
    iconClass,
    positive = true,
}: {
    title: string;
    value: string;
    change: string;
    description: string;
    icon: React.ElementType;
    iconClass: string;
    positive?: boolean;
}) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        {title}
                    </p>
                    <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                        {value}
                    </h3>
                </div>

                <div className={`rounded-xl p-3 ${iconClass}`}>
                    <Icon size={21} />
                </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-1 font-semibold ${positive
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400"
                        }`}
                >
                    {positive ? (
                        <ArrowUpRight size={14} />
                    ) : (
                        <ArrowDownRight size={14} />
                    )}
                    {change}
                </span>
                <span className="text-slate-500 dark:text-slate-400">
                    {description}
                </span>
            </div>
        </div>
    );
}

function EnrollmentChart({ period }: { period: Period }) {
    const data = enrollmentData[period];
    const maxValue = Math.max(
        ...data.flatMap((item) => [item.students, item.previous]),
    );
    const chartHeight = 220;
    const chartWidth = 680;
    const leftPadding = 42;
    const rightPadding = 12;
    const topPadding = 16;
    const bottomPadding = 28;
    const plotWidth = chartWidth - leftPadding - rightPadding;
    const plotHeight = chartHeight - topPadding - bottomPadding;

    const getX = (index: number) =>
        leftPadding +
        (data.length === 1 ? plotWidth / 2 : (index / (data.length - 1)) * plotWidth);

    const getY = (value: number) =>
        topPadding + plotHeight - (value / (maxValue * 1.15)) * plotHeight;

    const currentPath = data
        .map(
            (item, index) =>
                `${index === 0 ? "M" : "L"} ${getX(index)} ${getY(item.students)}`,
        )
        .join(" ");

    const previousPath = data
        .map(
            (item, index) =>
                `${index === 0 ? "M" : "L"} ${getX(index)} ${getY(item.previous)}`,
        )
        .join(" ");

    const areaPath = `${currentPath} L ${getX(data.length - 1)} ${chartHeight - bottomPadding
        } L ${getX(0)} ${chartHeight - bottomPadding} Z`;

    return (
        <div className="w-full">
            <div className="mb-5 flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                <span className="inline-flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                    Current period
                </span>
                <span className="inline-flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                    Previous period
                </span>
            </div>

            <div className="w-full overflow-x-auto">
                <svg
                    viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                    role="img"
                    aria-label="Student enrollment trend comparison chart"
                    className="min-w-[500px] w-full overflow-visible"
                >
                    <defs>
                        <linearGradient id="enrollment-area" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.18" />
                            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.01" />
                        </linearGradient>
                    </defs>

                    {[0, 1, 2, 3, 4].map((line) => {
                        const y = topPadding + (plotHeight / 4) * line;
                        const value = Math.round((maxValue * 1.15 * (4 - line)) / 4);

                        return (
                            <g key={line}>
                                <line
                                    x1={leftPadding}
                                    y1={y}
                                    x2={chartWidth - rightPadding}
                                    y2={y}
                                    stroke="currentColor"
                                    strokeOpacity="0.10"
                                    strokeDasharray="4 5"
                                />
                                <text
                                    x={leftPadding - 9}
                                    y={y + 4}
                                    fontSize="10"
                                    textAnchor="end"
                                    fill="currentColor"
                                    opacity="0.6"
                                >
                                    {value}
                                </text>
                            </g>
                        );
                    })}

                    <path d={areaPath} fill="url(#enrollment-area)" />

                    <path
                        d={previousPath}
                        fill="none"
                        stroke="#94a3b8"
                        strokeWidth="2"
                        strokeDasharray="5 5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    <path
                        d={currentPath}
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {data.map((item, index) => (
                        <g key={item.label}>
                            <circle
                                cx={getX(index)}
                                cy={getY(item.students)}
                                r="4"
                                fill="#2563eb"
                                stroke="white"
                                strokeWidth="2"
                            />
                            <text
                                x={getX(index)}
                                y={chartHeight - 7}
                                textAnchor="middle"
                                fontSize="10"
                                fill="currentColor"
                                opacity="0.65"
                            >
                                {item.label}
                            </text>
                        </g>
                    ))}
                </svg>
            </div>
        </div>
    );
}

function downloadCsv(filename: string, rows: (string | number)[][]) {
    const csv = rows
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
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(url);
}

export default function ReportsPage() {
    const [period, setPeriod] = useState<Period>("30d");
    const [reportCategory, setReportCategory] = useState("All");
    const [lastUpdated, setLastUpdated] = useState("Just now");

    const filteredReports = useMemo(
        () =>
            reportCategory === "All"
                ? recentReports
                : recentReports.filter((report) => report.category === reportCategory),
        [reportCategory],
    );

    const handleExport = () => {
        downloadCsv("campusflow-reports.csv", [
            ["Report Name", "Category", "Generated Date", "Status"],
            ...filteredReports.map((report) => [
                report.title,
                report.category,
                report.date,
                report.status,
            ]),
        ]);
    };

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 dark:bg-slate-950 dark:text-white sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1600px] space-y-6">
                {/* Page header */}
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                            <span>Admin</span>
                            <span>/</span>
                            <span className="text-blue-700 dark:text-blue-400">Reports</span>
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            Reports & Analytics
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                            Monitor academic performance, student enrollment, attendance, and
                            university financial activity from one dashboard.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setLastUpdated("Just now")}
                            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                        >
                            <RefreshCw size={16} />
                            Refresh
                        </button>

                        <button
                            type="button"
                            onClick={handleExport}
                            className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
                        >
                            <Download size={17} />
                            Export CSV
                        </button>
                    </div>
                </div>

                {/* Reporting filters */}
                <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-blue-50 p-2.5 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                            <CalendarDays size={20} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold">Reporting period</p>
                            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                                Compare university performance over time
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <label className="relative">
                            <span className="sr-only">Select reporting period</span>
                            <select
                                value={period}
                                onChange={(event) => setPeriod(event.target.value as Period)}
                                className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3 pr-10 text-sm font-medium outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:focus:ring-blue-900 sm:w-44"
                            >
                                <option value="7d">Last 7 days</option>
                                <option value="30d">Last 30 days</option>
                                <option value="90d">Last 90 days</option>
                                <option value="year">Year to date</option>
                            </select>
                            <ChevronDown
                                size={15}
                                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                            />
                        </label>

                        <span className="text-xs text-slate-500 dark:text-slate-400">
                            Updated: {lastUpdated}
                        </span>
                    </div>
                </section>

                {/* KPI cards */}
                <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <MetricCard
                        title="Total Students"
                        value="2,480"
                        change="+8.2%"
                        description="vs. previous period"
                        icon={Users}
                        iconClass="bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                    />
                    <MetricCard
                        title="Active Enrollments"
                        value="1,846"
                        change="+12.5%"
                        description="vs. previous period"
                        icon={BookOpen}
                        iconClass="bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400"
                    />
                    <MetricCard
                        title="Average GPA"
                        value="3.42"
                        change="+2.4%"
                        description="vs. previous period"
                        icon={GraduationCap}
                        iconClass="bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                    />
                    <MetricCard
                        title="Collected Revenue"
                        value="৳ 8.4L"
                        change="+6.8%"
                        description="vs. previous period"
                        icon={Wallet}
                        iconClass="bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                    />
                </section>

                {/* Main charts */}
                <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 xl:col-span-2 sm:p-6">
                        <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
                            <div>
                                <h2 className="text-base font-bold">Enrollment Trends</h2>
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    Student enrollment compared with the previous period
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    downloadCsv("campusflow-enrollment-trends.csv", [
                                        ["Period", "Current", "Previous"],
                                        ...enrollmentData[period].map((item) => [
                                            item.label,
                                            item.students,
                                            item.previous,
                                        ]),
                                    ])
                                }
                                aria-label="Export enrollment trend data"
                                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
                            >
                                <Download size={18} />
                            </button>
                        </div>

                        <EnrollmentChart period={period} />

                        <div className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-100 pt-5 dark:border-slate-800">
                            <div>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Latest data point
                                </p>
                                <p className="mt-1 text-xl font-bold">
                                    {formatNumber(
                                        enrollmentData[period][enrollmentData[period].length - 1]
                                            .students,
                                    )}
                                </p>
                                <p className="mt-1 text-xs text-slate-500">
                                    Current period
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Previous period
                                </p>
                                <p className="mt-1 text-xl font-bold text-slate-500 dark:text-slate-300">
                                    {formatNumber(
                                        enrollmentData[period][enrollmentData[period].length - 1]
                                            .previous,
                                    )}
                                </p>
                                <p className="mt-1 text-xs text-slate-500">
                                    Comparison value
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
                        <div className="mb-6">
                            <h2 className="text-base font-bold">Grade Distribution</h2>
                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                Sample distribution of recorded grades
                            </p>
                        </div>

                        <div className="space-y-5">
                            {academicData.map((item) => (
                                <div key={item.grade}>
                                    <div className="mb-2 flex items-center justify-between text-sm">
                                        <span className="font-medium">{item.grade}</span>
                                        <span className="text-slate-500 dark:text-slate-400">
                                            {item.percentage}%
                                        </span>
                                    </div>
                                    <div className="h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                                        <div
                                            className={`h-full rounded-full ${item.color} transition-all duration-500`}
                                            style={{ width: `${item.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                downloadCsv("campusflow-grade-distribution.csv", [
                                    ["Grade", "Percentage"],
                                    ...academicData.map((item) => [
                                        item.grade,
                                        item.percentage,
                                    ]),
                                ])
                            }
                            className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                        >
                            <Download size={16} />
                            Export grade data
                        </button>
                    </div>
                </section>

                {/* Department and attendance summaries */}
                <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
                        <div className="mb-6 flex items-start justify-between gap-3">
                            <div>
                                <h2 className="text-base font-bold">Enrollment by Department</h2>
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    Sample distribution across academic departments
                                </p>
                            </div>
                            <span className="rounded-lg bg-blue-50 p-2 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                                <BarChart3 size={19} />
                            </span>
                        </div>

                        <div className="space-y-5">
                            {departmentData.map((department) => (
                                <div key={department.name}>
                                    <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-sm">
                                        <span className="font-medium">{department.name}</span>
                                        <span className="text-slate-500 dark:text-slate-400">
                                            {formatNumber(department.students)} students
                                        </span>
                                    </div>
                                    <div className="h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                                        <div
                                            className="h-full rounded-full bg-blue-600"
                                            style={{ width: `${department.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                downloadCsv("campusflow-department-enrollment.csv", [
                                    ["Department", "Students"],
                                    ...departmentData.map((item) => [
                                        item.name,
                                        item.students,
                                    ]),
                                ])
                            }
                            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            View and export department data
                            <ArrowUpRight size={16} />
                        </button>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
                        <div className="mb-6 flex items-start justify-between gap-3">
                            <div>
                                <h2 className="text-base font-bold">Attendance Overview</h2>
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    Example attendance summary for the selected reporting period
                                </p>
                            </div>
                            <span className="rounded-lg bg-emerald-50 p-2 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                                <Activity size={19} />
                            </span>
                        </div>

                        <div className="flex flex-col items-center justify-center gap-5 rounded-xl bg-slate-50 px-4 py-7 dark:bg-slate-950 sm:flex-row sm:justify-start sm:px-6">
                            <div className="relative flex h-32 w-32 shrink-0 items-center justify-center rounded-full border-[12px] border-emerald-500">
                                <div className="absolute inset-[-12px] rounded-full border-[12px] border-slate-200 [clip-path:inset(0_0_0_72%)] dark:border-slate-700" />
                                <div className="text-center">
                                    <p className="text-2xl font-bold">92.4%</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Attendance
                                    </p>
                                </div>
                            </div>

                            <div className="w-full space-y-4">
                                <div className="flex items-center justify-between gap-3">
                                    <span className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                                        Present
                                    </span>
                                    <span className="text-sm font-semibold">92.4%</span>
                                </div>
                                <div className="flex items-center justify-between gap-3">
                                    <span className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                        <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                                        Absent
                                    </span>
                                    <span className="text-sm font-semibold">5.1%</span>
                                </div>
                                <div className="flex items-center justify-between gap-3">
                                    <span className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                        <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                                        Excused
                                    </span>
                                    <span className="text-sm font-semibold">2.5%</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-500/20 dark:bg-amber-500/5">
                            <Activity
                                size={18}
                                className="mt-0.5 shrink-0 text-amber-700 dark:text-amber-400"
                            />
                            <div>
                                <p className="text-sm font-semibold text-amber-900 dark:text-amber-300">
                                    Attendance monitoring
                                </p>
                                <p className="mt-1 text-xs leading-5 text-amber-800 dark:text-amber-200/80">
                                    Connect attendance records to identify students below your
                                    university&apos;s minimum attendance requirement.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Recent reports */}
                <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex flex-col gap-4 border-b border-slate-100 p-5 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                        <div>
                            <h2 className="text-base font-bold">Recent Reports</h2>
                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                Browse and export recently generated report records
                            </p>
                        </div>

                        <label className="relative">
                            <span className="sr-only">Filter reports by category</span>
                            <select
                                value={reportCategory}
                                onChange={(event) => setReportCategory(event.target.value)}
                                className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3 pr-9 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 sm:w-48"
                            >
                                <option value="All">All categories</option>
                                <option value="Academic">Academic</option>
                                <option value="Financial">Financial</option>
                                <option value="Enrollment">Enrollment</option>
                                <option value="Attendance">Attendance</option>
                            </select>
                            <ChevronDown
                                size={15}
                                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                            />
                        </label>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[650px] text-left text-sm">
                            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-950 dark:text-slate-400">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Report name</th>
                                    <th className="px-6 py-4 font-semibold">Category</th>
                                    <th className="px-6 py-4 font-semibold">Generated date</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 text-right font-semibold">Action</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {filteredReports.map((report) => (
                                    <tr
                                        key={report.title}
                                        className="transition hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="rounded-lg bg-blue-50 p-2 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                                                    <BarChart3 size={17} />
                                                </div>
                                                <span className="font-semibold">{report.title}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                                            {report.category}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-slate-500 dark:text-slate-400">
                                            {report.date}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${report.status === "Ready"
                                                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                                                    : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                                                    }`}
                                            >
                                                {report.status === "Ready" ? (
                                                    <CheckCircle2 size={13} />
                                                ) : (
                                                    <RefreshCw size={13} />
                                                )}
                                                {report.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                type="button"
                                                disabled={report.status !== "Ready"}
                                                onClick={() =>
                                                    downloadCsv(
                                                        `${report.category.toLowerCase()}-report.csv`,
                                                        [
                                                            ["Report", "Category", "Generated Date", "Status"],
                                                            [
                                                                report.title,
                                                                report.category,
                                                                report.date,
                                                                report.status,
                                                            ],
                                                        ],
                                                    )
                                                }
                                                aria-label={`Export ${report.title}`}
                                                title={
                                                    report.status === "Ready"
                                                        ? "Export report"
                                                        : "Report is processing"
                                                }
                                                className="inline-flex rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                                            >
                                                <Download size={17} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                {filteredReports.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-6 py-12 text-center text-sm text-slate-500 dark:text-slate-400"
                                        >
                                            No reports found for this category.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Showing {filteredReports.length} report
                            {filteredReports.length === 1 ? "" : "s"}
                        </p>
                        <button
                            type="button"
                            onClick={handleExport}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                        >
                            <Download size={16} />
                            Export report list
                        </button>
                    </div>
                </section>

                {/* Footer note */}
                <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-4 dark:border-blue-500/20 dark:bg-blue-500/5">
                    <Activity
                        size={18}
                        className="mt-0.5 shrink-0 text-blue-700 dark:text-blue-400"
                    />
                    <div>
                        <p className="text-sm font-semibold text-blue-900 dark:text-blue-300">
                            Reporting data
                        </p>
                        <p className="mt-1 text-xs leading-5 text-blue-800 dark:text-blue-200/80">
                            This page currently uses illustrative demo data. Connect the
                            dashboard to your reporting APIs before using these figures for
                            university decisions. Financial revenue should reflect confirmed
                            payments, and GPA should be calculated from approved grades.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
