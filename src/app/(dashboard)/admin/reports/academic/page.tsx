// import React from 'react'

// export default function academicReportsPage() {
//   return (
//     <div>academicReportsPage</div>
//   )
// }
















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
    Search,
    TrendingUp,
    Users,
    XCircle,
} from "lucide-react";

type AcademicRecord = {
    id: string;
    name: string;
    studentId: string;
    department: string;
    semester: string;
    gpa: number;
    grade: string;
    status: "Passed" | "Failed" | "In Progress";
};

const academicRecords: AcademicRecord[] = [
    {
        id: "1",
        name: "Nusrat Jahan",
        studentId: "STU-2024-CSE-0001",
        department: "Computer Science",
        semester: "Fall 2026",
        gpa: 3.92,
        grade: "A",
        status: "Passed",
    },
    {
        id: "2",
        name: "Rahim Ahmed",
        studentId: "STU-2024-CSE-0002",
        department: "Computer Science",
        semester: "Fall 2026",
        gpa: 3.15,
        grade: "B",
        status: "Passed",
    },
    {
        id: "3",
        name: "Fatima Akter",
        studentId: "STU-2023-BBA-0003",
        department: "Business Administration",
        semester: "Fall 2026",
        gpa: 3.68,
        grade: "A-",
        status: "Passed",
    },
    {
        id: "4",
        name: "Sabbir Hossain",
        studentId: "STU-2024-EEE-0004",
        department: "Electrical Engineering",
        semester: "Fall 2026",
        gpa: 1.85,
        grade: "F",
        status: "Failed",
    },
    {
        id: "5",
        name: "Mim Chowdhury",
        studentId: "STU-2023-CSE-0005",
        department: "Computer Science",
        semester: "Spring 2026",
        gpa: 3.84,
        grade: "A",
        status: "Passed",
    },
    {
        id: "6",
        name: "Tanvir Hasan",
        studentId: "STU-2024-BBA-0006",
        department: "Business Administration",
        semester: "Spring 2026",
        gpa: 2.75,
        grade: "B-",
        status: "In Progress",
    },
    {
        id: "7",
        name: "Sadia Islam",
        studentId: "STU-2023-EEE-0007",
        department: "Electrical Engineering",
        semester: "Fall 2026",
        gpa: 3.45,
        grade: "B+",
        status: "Passed",
    },
    {
        id: "8",
        name: "Mahmudul Hasan",
        studentId: "STU-2024-CSE-0008",
        department: "Computer Science",
        semester: "Fall 2026",
        gpa: 1.65,
        grade: "F",
        status: "Failed",
    },
];

const gradeDistribution = [
    { grade: "A+", count: 92, color: "bg-emerald-500" },
    { grade: "A", count: 156, color: "bg-blue-600" },
    { grade: "A-", count: 128, color: "bg-indigo-500" },
    { grade: "B+", count: 110, color: "bg-violet-500" },
    { grade: "B", count: 86, color: "bg-amber-500" },
    { grade: "C", count: 54, color: "bg-orange-500" },
    { grade: "F", count: 24, color: "bg-rose-500" },
];

const semesterPerformance = [
    { semester: "Spring 2025", gpa: 3.12, passRate: 86 },
    { semester: "Summer 2025", gpa: 3.24, passRate: 89 },
    { semester: "Fall 2025", gpa: 3.18, passRate: 87 },
    { semester: "Spring 2026", gpa: 3.36, passRate: 92 },
    { semester: "Summer 2026", gpa: 3.31, passRate: 90 },
    { semester: "Fall 2026", gpa: 3.42, passRate: 94 },
];

const departmentPerformance = [
    {
        name: "Computer Science",
        students: 420,
        averageGpa: 3.62,
        passRate: 95,
    },
    {
        name: "Business Administration",
        students: 350,
        averageGpa: 3.41,
        passRate: 92,
    },
    {
        name: "Electrical Engineering",
        students: 280,
        averageGpa: 3.28,
        passRate: 89,
    },
    {
        name: "Economics",
        students: 210,
        averageGpa: 3.35,
        passRate: 91,
    },
    {
        name: "English",
        students: 160,
        averageGpa: 3.51,
        passRate: 93,
    },
];

function exportCsv(filename: string, rows: (string | number)[][]) {
    const content = rows
        .map((row) =>
            row
                .map((value) => `"${String(value).replace(/"/g, '""')}"`)
                .join(","),
        )
        .join("\n");

    const blob = new Blob(["\uFEFF" + content], {
        type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url);
}

function SummaryCard({
    title,
    value,
    description,
    trend,
    icon: Icon,
    color,
    positive = true,
}: {
    title: string;
    value: string;
    description: string;
    trend: string;
    icon: React.ElementType;
    color: string;
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

                <div className={`rounded-xl p-3 ${color}`}>
                    <Icon size={21} />
                </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
                <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${positive
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400"
                        }`}
                >
                    {positive ? (
                        <ArrowUpRight size={13} />
                    ) : (
                        <ArrowDownRight size={13} />
                    )}
                    {trend}
                </span>

                <span className="text-xs text-slate-500 dark:text-slate-400">
                    {description}
                </span>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: AcademicRecord["status"] }) {
    const styles = {
        Passed:
            "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
        Failed:
            "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400",
        "In Progress":
            "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
    };

    return (
        <span
            className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${styles[status]}`}
        >
            {status === "Passed" ? (
                <CheckCircle2 size={13} />
            ) : status === "Failed" ? (
                <XCircle size={13} />
            ) : (
                <Activity size={13} />
            )}
            {status}
        </span>
    );
}

function GradeDistributionChart() {
    const maxCount = Math.max(...gradeDistribution.map((item) => item.count));

    return (
        <div className="space-y-4">
            {gradeDistribution.map((item) => (
                <div key={item.grade}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="font-medium">{item.grade}</span>
                        <span className="text-slate-500 dark:text-slate-400">
                            {item.count} students
                        </span>
                    </div>

                    <div className="h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                        <div
                            className={`h-full rounded-full ${item.color} transition-all duration-500`}
                            style={{ width: `${(item.count / maxCount) * 100}%` }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

function SemesterTrendChart() {
    const chartWidth = 600;
    const chartHeight = 235;
    const left = 40;
    const right = 12;
    const top = 18;
    const bottom = 36;
    const plotWidth = chartWidth - left - right;
    const plotHeight = chartHeight - top - bottom;

    const minGpa = 2.5;
    const maxGpa = 4.0;

    const x = (index: number) =>
        left +
        (index / (semesterPerformance.length - 1)) * plotWidth;

    const y = (gpa: number) =>
        top + ((maxGpa - gpa) / (maxGpa - minGpa)) * plotHeight;

    const linePath = semesterPerformance
        .map(
            (item, index) =>
                `${index === 0 ? "M" : "L"} ${x(index)} ${y(item.gpa)}`,
        )
        .join(" ");

    const areaPath = `${linePath} L ${x(semesterPerformance.length - 1)} ${chartHeight - bottom
        } L ${x(0)} ${chartHeight - bottom} Z`;

    return (
        <div className="w-full overflow-x-auto">
            <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                role="img"
                aria-label="Average GPA trend by semester"
                className="w-full min-w-[450px]"
            >
                <defs>
                    <linearGradient id="gpa-area" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563eb" stopOpacity="0.18" />
                        <stop offset="100%" stopColor="#2563eb" stopOpacity="0.01" />
                    </linearGradient>
                </defs>

                {[2.5, 3.0, 3.5, 4.0].map((value) => (
                    <g key={value}>
                        <line
                            x1={left}
                            y1={y(value)}
                            x2={chartWidth - right}
                            y2={y(value)}
                            stroke="currentColor"
                            strokeOpacity="0.12"
                            strokeDasharray="4 5"
                        />
                        <text
                            x={left - 9}
                            y={y(value) + 4}
                            textAnchor="end"
                            fontSize="11"
                            fill="currentColor"
                            opacity="0.65"
                        >
                            {value.toFixed(1)}
                        </text>
                    </g>
                ))}

                <path d={areaPath} fill="url(#gpa-area)" />

                <path
                    d={linePath}
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {semesterPerformance.map((item, index) => (
                    <g key={item.semester}>
                        <circle
                            cx={x(index)}
                            cy={y(item.gpa)}
                            r="4"
                            fill="#2563eb"
                            stroke="white"
                            strokeWidth="2"
                        />
                        <text
                            x={x(index)}
                            y={chartHeight - 10}
                            textAnchor="middle"
                            fontSize="10"
                            fill="currentColor"
                            opacity="0.7"
                        >
                            {item.semester.replace(" ", "\n")}
                        </text>
                        <title>
                            {item.semester}: GPA {item.gpa.toFixed(2)}
                        </title>
                    </g>
                ))}
            </svg>
        </div>
    );
}

export default function AcademicReportsPage() {
    const [semester, setSemester] = useState("All");
    const [department, setDepartment] = useState("All");
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");

    const filteredRecords = useMemo(() => {
        const query = search.trim().toLowerCase();

        return academicRecords.filter((record) => {
            const matchesSemester =
                semester === "All" || record.semester === semester;

            const matchesDepartment =
                department === "All" || record.department === department;

            const matchesStatus = status === "All" || record.status === status;

            const matchesSearch =
                !query ||
                record.name.toLowerCase().includes(query) ||
                record.studentId.toLowerCase().includes(query) ||
                record.department.toLowerCase().includes(query);

            return (
                matchesSemester &&
                matchesDepartment &&
                matchesStatus &&
                matchesSearch
            );
        });
    }, [semester, department, status, search]);

    const filteredStats = useMemo(() => {
        const completed = filteredRecords.filter(
            (record) => record.status !== "In Progress",
        );
        const passed = filteredRecords.filter(
            (record) => record.status === "Passed",
        );
        const averageGpa =
            completed.length > 0
                ? completed.reduce((total, record) => total + record.gpa, 0) /
                completed.length
                : 0;

        return {
            total: filteredRecords.length,
            passed: passed.length,
            averageGpa,
            passRate:
                completed.length > 0
                    ? (passed.length / completed.length) * 100
                    : 0,
        };
    }, [filteredRecords]);

    const exportStudents = () => {
        exportCsv("campusflow-academic-reports.csv", [
            ["Student Name", "Student ID", "Department", "Semester", "GPA", "Grade", "Status"],
            ...filteredRecords.map((record) => [
                record.name,
                record.studentId,
                record.department,
                record.semester,
                record.gpa.toFixed(2),
                record.grade,
                record.status,
            ]),
        ]);
    };

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 dark:bg-slate-950 dark:text-white sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1600px] space-y-6">
                {/* Header */}
                <header className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                            <span>Admin</span>
                            <span>/</span>
                            <span>Reports</span>
                            <span>/</span>
                            <span className="font-medium text-blue-700 dark:text-blue-400">
                                Academic Reports
                            </span>
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            Academic Reports
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                            Analyze academic performance, GPA trends, grade distribution,
                            semester results, and department outcomes.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={exportStudents}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
                    >
                        <Download size={17} />
                        Export Report
                    </button>
                </header>

                {/* Filters */}
                <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="mb-4 flex items-center gap-2">
                        <CalendarDays
                            size={18}
                            className="text-blue-700 dark:text-blue-400"
                        />
                        <h2 className="text-sm font-bold">Report Filters</h2>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        <label className="relative">
                            <span className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">
                                Academic Semester
                            </span>
                            <select
                                value={semester}
                                onChange={(event) => setSemester(event.target.value)}
                                className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 pr-9 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:focus:ring-blue-900"
                            >
                                <option value="All">All semesters</option>
                                <option value="Spring 2026">Spring 2026</option>
                                <option value="Summer 2026">Summer 2026</option>
                                <option value="Fall 2026">Fall 2026</option>
                                <option value="Spring 2025">Spring 2025</option>
                                <option value="Summer 2025">Summer 2025</option>
                                <option value="Fall 2025">Fall 2025</option>
                            </select>
                            <ChevronDown
                                size={15}
                                className="pointer-events-none absolute right-3 top-[39px] text-slate-500"
                            />
                        </label>

                        <label className="relative">
                            <span className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">
                                Department
                            </span>
                            <select
                                value={department}
                                onChange={(event) => setDepartment(event.target.value)}
                                className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 pr-9 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:focus:ring-blue-900"
                            >
                                <option value="All">All departments</option>
                                {departmentPerformance.map((item) => (
                                    <option key={item.name} value={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown
                                size={15}
                                className="pointer-events-none absolute right-3 top-[39px] text-slate-500"
                            />
                        </label>

                        <label className="relative">
                            <span className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">
                                Result Status
                            </span>
                            <select
                                value={status}
                                onChange={(event) => setStatus(event.target.value)}
                                className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 pr-9 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:focus:ring-blue-900"
                            >
                                <option value="All">All results</option>
                                <option value="Passed">Passed</option>
                                <option value="Failed">Failed</option>
                                <option value="In Progress">In Progress</option>
                            </select>
                            <ChevronDown
                                size={15}
                                className="pointer-events-none absolute right-3 top-[39px] text-slate-500"
                            />
                        </label>

                        <label>
                            <span className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">
                                Search Students
                            </span>
                            <div className="relative">
                                <Search
                                    size={17}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />
                                <input
                                    type="search"
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                    placeholder="Name, student ID..."
                                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-9 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:focus:ring-blue-900"
                                />
                                {search && (
                                    <button
                                        type="button"
                                        onClick={() => setSearch("")}
                                        aria-label="Clear search"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white"
                                    >
                                        <XCircle size={16} />
                                    </button>
                                )}
                            </div>
                        </label>
                    </div>
                </section>

                {/* KPI cards */}
                <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <SummaryCard
                        title="Students in Results"
                        value={filteredStats.total.toLocaleString("en-US")}
                        trend="Filtered"
                        description="matching records"
                        icon={Users}
                        color="bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                    />
                    <SummaryCard
                        title="Average GPA"
                        value={filteredStats.averageGpa.toFixed(2)}
                        trend="GPA"
                        description="completed results"
                        icon={GraduationCap}
                        color="bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400"
                    />
                    <SummaryCard
                        title="Pass Rate"
                        value={`${filteredStats.passRate.toFixed(1)}%`}
                        trend="Passed"
                        description="of completed results"
                        icon={CheckCircle2}
                        color="bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                    />
                    <SummaryCard
                        title="Failed Results"
                        value={filteredRecords
                            .filter((record) => record.status === "Failed")
                            .length.toLocaleString("en-US")}
                        trend="Failed"
                        description="matching records"
                        icon={XCircle}
                        color="bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400"
                        positive={false}
                    />
                </section>

                {/* Charts */}
                <section className="grid grid-cols-1 gap-6 xl:grid-cols-5">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6 xl:col-span-3">
                        <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
                            <div>
                                <h2 className="text-base font-bold">GPA Performance Trend</h2>
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    Average GPA across recent semesters
                                </p>
                            </div>
                            <span className="rounded-lg bg-blue-50 p-2 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                                <TrendingUp size={19} />
                            </span>
                        </div>

                        <SemesterTrendChart />

                        <div className="mt-4 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 dark:border-slate-800">
                            <div>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Latest semester GPA
                                </p>
                                <p className="mt-1 text-xl font-bold">3.42</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Latest pass rate
                                </p>
                                <p className="mt-1 text-xl font-bold text-emerald-600 dark:text-emerald-400">
                                    94%
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6 xl:col-span-2">
                        <div className="mb-6 flex items-start justify-between gap-3">
                            <div>
                                <h2 className="text-base font-bold">Grade Distribution</h2>
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    Students by awarded grade
                                </p>
                            </div>
                            <BookOpen
                                size={20}
                                className="text-slate-400"
                            />
                        </div>

                        <GradeDistributionChart />

                        <button
                            type="button"
                            onClick={() =>
                                exportCsv("campusflow-grade-distribution.csv", [
                                    ["Grade", "Student Count"],
                                    ...gradeDistribution.map((item) => [
                                        item.grade,
                                        item.count,
                                    ]),
                                ])
                            }
                            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                        >
                            <Download size={16} />
                            Export Grade Data
                        </button>
                    </div>
                </section>

                {/* Department performance */}
                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
                    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-base font-bold">Department Performance</h2>
                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                Compare average GPA, student count, and pass rates
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                exportCsv("campusflow-department-performance.csv", [
                                    ["Department", "Students", "Average GPA", "Pass Rate"],
                                    ...departmentPerformance.map((item) => [
                                        item.name,
                                        item.students,
                                        item.averageGpa,
                                        `${item.passRate}%`,
                                    ]),
                                ])
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                        >
                            <Download size={16} />
                            Export
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[650px] text-left text-sm">
                            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-950 dark:text-slate-400">
                                <tr>
                                    <th className="rounded-l-lg px-4 py-3 font-semibold">
                                        Department
                                    </th>
                                    <th className="px-4 py-3 font-semibold">Students</th>
                                    <th className="px-4 py-3 font-semibold">Average GPA</th>
                                    <th className="px-4 py-3 font-semibold">Pass Rate</th>
                                    <th className="rounded-r-lg px-4 py-3 font-semibold">
                                        Performance
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {departmentPerformance.map((item) => (
                                    <tr
                                        key={item.name}
                                        className="transition hover:bg-slate-50 dark:hover:bg-slate-800/40"
                                    >
                                        <td className="px-4 py-4 font-semibold">{item.name}</td>
                                        <td className="px-4 py-4 text-slate-600 dark:text-slate-300">
                                            {item.students.toLocaleString("en-US")}
                                        </td>
                                        <td className="px-4 py-4 font-semibold">
                                            {item.averageGpa.toFixed(2)}
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                                                {item.passRate}%
                                            </span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                                                    <div
                                                        className="h-full rounded-full bg-blue-600"
                                                        style={{ width: `${item.passRate}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                                    {item.passRate >= 93
                                                        ? "Excellent"
                                                        : item.passRate >= 90
                                                            ? "Good"
                                                            : "Average"}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Student academic records */}
                <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex flex-col gap-3 border-b border-slate-100 p-5 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                        <div>
                            <h2 className="text-base font-bold">Student Academic Results</h2>
                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                Filtered student results based on your selections
                            </p>
                        </div>

                        <span className="inline-flex w-fit items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                            <Users size={14} />
                            {filteredRecords.length} records
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[850px] text-left text-sm">
                            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-950 dark:text-slate-400">
                                <tr>
                                    <th className="px-5 py-4 font-semibold">Student</th>
                                    <th className="px-5 py-4 font-semibold">Department</th>
                                    <th className="px-5 py-4 font-semibold">Semester</th>
                                    <th className="px-5 py-4 font-semibold">GPA</th>
                                    <th className="px-5 py-4 font-semibold">Grade</th>
                                    <th className="px-5 py-4 font-semibold">Status</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {filteredRecords.map((record) => (
                                    <tr
                                        key={record.id}
                                        className="transition hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
                                    >
                                        <td className="px-5 py-4">
                                            <p className="font-semibold">{record.name}</p>
                                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                                {record.studentId}
                                            </p>
                                        </td>
                                        <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                                            {record.department}
                                        </td>
                                        <td className="whitespace-nowrap px-5 py-4 text-slate-600 dark:text-slate-300">
                                            {record.semester}
                                        </td>
                                        <td className="px-5 py-4 font-semibold">
                                            {record.gpa.toFixed(2)}
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className="inline-flex min-w-10 items-center justify-center rounded-lg bg-blue-50 px-2 py-1 font-bold text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                                                {record.grade}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <StatusBadge status={record.status} />
                                        </td>
                                    </tr>
                                ))}

                                {filteredRecords.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="px-5 py-12 text-center text-sm text-slate-500 dark:text-slate-400"
                                        >
                                            No academic records match the selected filters.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Showing {filteredRecords.length} of {academicRecords.length} demo
                            records
                        </p>
                        <button
                            type="button"
                            onClick={exportStudents}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                        >
                            <Download size={15} />
                            Export Student Results
                        </button>
                    </div>
                </section>

                {/* Note */}
                <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-4 dark:border-blue-500/20 dark:bg-blue-500/5">
                    <div className="flex items-start gap-3">
                        <Activity
                            size={18}
                            className="mt-0.5 shrink-0 text-blue-700 dark:text-blue-400"
                        />
                        <div>
                            <p className="text-sm font-semibold text-blue-900 dark:text-blue-300">
                                Academic data integrity
                            </p>
                            <p className="mt-1 text-xs leading-5 text-blue-800 dark:text-blue-200/80">
                                This page uses illustrative data. For production, fetch approved
                                grades and academic records from the backend. Calculate GPA
                                using your configured grade scales, exclude incomplete results
                                from pass-rate calculations, and enforce role-based access for
                                student academic data.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
