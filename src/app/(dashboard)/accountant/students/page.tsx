// import React from 'react'

// export default function Students() {
//     return (
//         <div>students</div>
//     )
// }



















"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
    Search,
    Users,
    Wallet,
    Receipt,
    CircleDollarSign,
    SlidersHorizontal,
    ArrowUpDown,
    ArrowRight,
    Eye,
    Download,
    ChevronLeft,
    ChevronRight,
    RotateCcw,
    GraduationCap,
    Mail,
    X,
} from "lucide-react";

type StudentStatus = "ACTIVE" | "INACTIVE" | "GRADUATED";
type FeeStatus = "PAID" | "PARTIAL" | "UNPAID" | "OVERDUE";

type Student = {
    id: string;
    studentId: string;
    name: string;
    email: string;
    program: string;
    department: string;
    semester: number;
    totalFees: number;
    paidAmount: number;
    outstandingAmount: number;
    studentStatus: StudentStatus;
    feeStatus: FeeStatus;
    avatar: string;
};

const initialStudents: Student[] = [
    {
        id: "student-uuid-001",
        studentId: "STU-2026-0012",
        name: "Ayan Sujon",
        email: "ayan@example.com",
        program: "B.Sc. in Computer Science",
        department: "Computer Science",
        semester: 5,
        totalFees: 85000,
        paidAmount: 60000,
        outstandingAmount: 25000,
        studentStatus: "ACTIVE",
        feeStatus: "PARTIAL",
        avatar: "AS",
    },
    {
        id: "student-uuid-002",
        studentId: "STU-2025-0048",
        name: "Nusrat Jahan",
        email: "nusrat@example.com",
        program: "BBA",
        department: "Business Administration",
        semester: 3,
        totalFees: 72000,
        paidAmount: 72000,
        outstandingAmount: 0,
        studentStatus: "ACTIVE",
        feeStatus: "PAID",
        avatar: "NJ",
    },
    {
        id: "student-uuid-003",
        studentId: "STU-2024-0091",
        name: "Rahim Ahmed",
        email: "rahim@example.com",
        program: "B.Sc. in Electrical Engineering",
        department: "Electrical Engineering",
        semester: 7,
        totalFees: 95000,
        paidAmount: 65000,
        outstandingAmount: 30000,
        studentStatus: "ACTIVE",
        feeStatus: "OVERDUE",
        avatar: "RA",
    },
    {
        id: "student-uuid-004",
        studentId: "STU-2026-0035",
        name: "Maliha Islam",
        email: "maliha@example.com",
        program: "B.Sc. in Computer Science",
        department: "Computer Science",
        semester: 2,
        totalFees: 58000,
        paidAmount: 40000,
        outstandingAmount: 18000,
        studentStatus: "ACTIVE",
        feeStatus: "PARTIAL",
        avatar: "MI",
    },
    {
        id: "student-uuid-005",
        studentId: "STU-2023-0017",
        name: "Tanvir Hasan",
        email: "tanvir@example.com",
        program: "B.A. in English",
        department: "English",
        semester: 8,
        totalFees: 80000,
        paidAmount: 80000,
        outstandingAmount: 0,
        studentStatus: "GRADUATED",
        feeStatus: "PAID",
        avatar: "TH",
    },
    {
        id: "student-uuid-006",
        studentId: "STU-2025-0062",
        name: "Sadia Akter",
        email: "sadia@example.com",
        program: "BBA",
        department: "Business Administration",
        semester: 4,
        totalFees: 68000,
        paidAmount: 48000,
        outstandingAmount: 20000,
        studentStatus: "ACTIVE",
        feeStatus: "UNPAID",
        avatar: "SA",
    },
    {
        id: "student-uuid-007",
        studentId: "STU-2024-0029",
        name: "Imran Hossain",
        email: "imran@example.com",
        program: "B.Sc. in Mathematics",
        department: "Mathematics",
        semester: 6,
        totalFees: 62000,
        paidAmount: 62000,
        outstandingAmount: 0,
        studentStatus: "INACTIVE",
        feeStatus: "PAID",
        avatar: "IH",
    },
    {
        id: "student-uuid-008",
        studentId: "STU-2026-0074",
        name: "Farzana Rahman",
        email: "farzana@example.com",
        program: "B.Sc. in Computer Science",
        department: "Computer Science",
        semester: 1,
        totalFees: 50000,
        paidAmount: 25000,
        outstandingAmount: 25000,
        studentStatus: "ACTIVE",
        feeStatus: "PARTIAL",
        avatar: "FR",
    },
];

const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT",
        maximumFractionDigits: 0,
    }).format(amount);

function Badge({
    children,
    variant = "neutral",
}: {
    children: React.ReactNode;
    variant?: "success" | "warning" | "danger" | "info" | "neutral";
}) {
    const styles = {
        success:
            "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400",
        warning:
            "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400",
        danger:
            "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400",
        info:
            "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400",
        neutral: "bg-muted text-muted-foreground",
    };

    return (
        <span
            className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${styles[variant]}`}
        >
            {children}
        </span>
    );
}

function getFeeBadge(status: FeeStatus) {
    const map: Record<
        FeeStatus,
        { label: string; variant: "success" | "warning" | "danger" | "info" }
    > = {
        PAID: { label: "Paid", variant: "success" },
        PARTIAL: { label: "Partially paid", variant: "info" },
        UNPAID: { label: "Unpaid", variant: "warning" },
        OVERDUE: { label: "Overdue", variant: "danger" },
    };

    return map[status];
}

function StatCard({
    title,
    value,
    subtitle,
    icon: Icon,
    iconClass,
}: {
    title: string;
    value: string;
    subtitle: string;
    icon: React.ElementType;
    iconClass: string;
}) {
    return (
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-muted-foreground">{title}</p>
                <div
                    className={`flex size-10 items-center justify-center rounded-xl ${iconClass}`}
                >
                    <Icon size={20} />
                </div>
            </div>
            <p className="mt-4 text-2xl font-bold tracking-tight">{value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
        </div>
    );
}

export default function Students() {
    const [students] = useState<Student[]>(initialStudents);
    const [search, setSearch] = useState("");
    const [feeStatus, setFeeStatus] = useState("ALL");
    const [studentStatus, setStudentStatus] = useState("ALL");
    const [department, setDepartment] = useState("ALL");
    const [sortBy, setSortBy] = useState("name");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    const departments = useMemo(
        () => [...new Set(students.map((student) => student.department))].sort(),
        [students]
    );

    const filteredStudents = useMemo(() => {
        const query = search.trim().toLowerCase();

        return students
            .filter((student) => {
                const matchesSearch =
                    !query ||
                    student.name.toLowerCase().includes(query) ||
                    student.studentId.toLowerCase().includes(query) ||
                    student.email.toLowerCase().includes(query) ||
                    student.program.toLowerCase().includes(query);

                const matchesFee =
                    feeStatus === "ALL" || student.feeStatus === feeStatus;

                const matchesStudentStatus =
                    studentStatus === "ALL" ||
                    student.studentStatus === studentStatus;

                const matchesDepartment =
                    department === "ALL" || student.department === department;

                return (
                    matchesSearch &&
                    matchesFee &&
                    matchesStudentStatus &&
                    matchesDepartment
                );
            })
            .sort((a, b) => {
                if (sortBy === "outstanding") {
                    return b.outstandingAmount - a.outstandingAmount;
                }
                if (sortBy === "paid") {
                    return b.paidAmount - a.paidAmount;
                }
                return a.name.localeCompare(b.name);
            });
    }, [students, search, feeStatus, studentStatus, department, sortBy]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredStudents.length / pageSize)
    );

    const currentPage = Math.min(page, totalPages);

    const paginatedStudents = filteredStudents.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const totalFees = students.reduce(
        (sum, student) => sum + student.totalFees,
        0
    );

    const totalPaid = students.reduce(
        (sum, student) => sum + student.paidAmount,
        0
    );

    const totalOutstanding = students.reduce(
        (sum, student) => sum + student.outstandingAmount,
        0
    );

    const resetFilters = () => {
        setSearch("");
        setFeeStatus("ALL");
        setStudentStatus("ALL");
        setDepartment("ALL");
        setSortBy("name");
        setPage(1);
    };

    const exportCSV = () => {
        const headers = [
            "Student ID",
            "Name",
            "Email",
            "Program",
            "Department",
            "Total Fees",
            "Paid Amount",
            "Outstanding Amount",
            "Fee Status",
            "Student Status",
        ];

        const rows = filteredStudents.map((student) => [
            student.studentId,
            student.name,
            student.email,
            student.program,
            student.department,
            student.totalFees,
            student.paidAmount,
            student.outstandingAmount,
            student.feeStatus,
            student.studentStatus,
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
        const link = document.createElement("a");
        link.href = url;
        link.download = "campusflow-students-finance.csv";
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <main className="min-h-screen space-y-6 bg-background p-4 text-foreground sm:p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>

                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Student Finance
                    </h1>

                    <p className="mt-2 text-sm text-muted-foreground">
                        View students, monitor outstanding fees, and access financial records.
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    <button
                        type="button"
                        onClick={resetFilters}
                        className="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-3 text-sm font-medium transition hover:bg-muted"
                    >
                        <RotateCcw size={16} />
                        Reset filters
                    </button>

                    <button
                        type="button"
                        onClick={exportCSV}
                        className="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-3 text-sm font-medium transition hover:bg-muted"
                    >
                        <Download size={16} />
                        Export CSV
                    </button>
                </div>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    title="Total Students"
                    value={students.length.toLocaleString()}
                    subtitle="Students in this demo dataset"
                    icon={Users}
                    iconClass="bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400"
                />

                <StatCard
                    title="Total Assessed Fees"
                    value={formatCurrency(totalFees)}
                    subtitle="Sum of example student fee records"
                    icon={Receipt}
                    iconClass="bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-400"
                />

                <StatCard
                    title="Total Collected"
                    value={formatCurrency(totalPaid)}
                    subtitle="Example recorded payments"
                    icon={CircleDollarSign}
                    iconClass="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                />

                <StatCard
                    title="Outstanding Fees"
                    value={formatCurrency(totalOutstanding)}
                    subtitle="Unpaid balance in the demo dataset"
                    icon={Wallet}
                    iconClass="bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400"
                />
            </div>

            {/* Collection summary */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <div className="rounded-xl border border-border bg-card p-5 lg:col-span-2">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Collection progress
                            </p>
                            <p className="mt-2 text-2xl font-bold">
                                {totalFees > 0
                                    ? Math.round((totalPaid / totalFees) * 100)
                                    : 0}
                                %
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                of assessed fees collected
                            </p>
                        </div>
                        <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                            <CircleDollarSign size={21} />
                        </div>
                    </div>

                    <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-muted">
                        <div
                            className="h-full rounded-full bg-emerald-500 transition-all"
                            style={{
                                width: `${totalFees > 0
                                    ? Math.min(100, (totalPaid / totalFees) * 100)
                                    : 0
                                    }%`,
                            }}
                        />
                    </div>

                    <div className="mt-3 flex flex-wrap justify-between gap-2 text-xs text-muted-foreground">
                        <span>Collected: {formatCurrency(totalPaid)}</span>
                        <span>Remaining: {formatCurrency(totalOutstanding)}</span>
                    </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-5">
                    <p className="text-sm font-medium text-muted-foreground">
                        Students requiring attention
                    </p>
                    <p className="mt-2 text-2xl font-bold">
                        {students.filter((student) =>
                            ["UNPAID", "OVERDUE"].includes(student.feeStatus)
                        ).length}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                        With unpaid or overdue fees
                    </p>
                    <button
                        type="button"
                        onClick={() => {
                            setFeeStatus("OVERDUE");
                            setPage(1);
                        }}
                        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                    >
                        View overdue students <ArrowRight size={15} />
                    </button>
                </div>
            </div>

            {/* Students table */}
            <section className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                <div className="flex flex-col justify-between gap-4 border-b border-border p-5 lg:flex-row lg:items-center">
                    <div>
                        <h2 className="text-base font-semibold">All Students</h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Search students and review their fee status.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                            <Users size={16} />
                            {filteredStudents.length} results
                        </span>
                    </div>
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 gap-3 border-b border-border bg-muted/20 p-4 sm:grid-cols-2 xl:grid-cols-5">
                    <div className="relative sm:col-span-2 xl:col-span-2">
                        <Search
                            size={17}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        />
                        <input
                            value={search}
                            onChange={(event) => {
                                setSearch(event.target.value);
                                setPage(1);
                            }}
                            placeholder="Search name, student ID, email..."
                            className="h-10 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15"
                        />
                    </div>

                    <select
                        value={department}
                        onChange={(event) => {
                            setDepartment(event.target.value);
                            setPage(1);
                        }}
                        className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary"
                        aria-label="Filter by department"
                    >
                        <option value="ALL">All departments</option>
                        {departments.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>

                    <select
                        value={feeStatus}
                        onChange={(event) => {
                            setFeeStatus(event.target.value);
                            setPage(1);
                        }}
                        className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary"
                        aria-label="Filter by fee status"
                    >
                        <option value="ALL">All fee statuses</option>
                        <option value="PAID">Paid</option>
                        <option value="PARTIAL">Partially paid</option>
                        <option value="UNPAID">Unpaid</option>
                        <option value="OVERDUE">Overdue</option>
                    </select>

                    <select
                        value={studentStatus}
                        onChange={(event) => {
                            setStudentStatus(event.target.value);
                            setPage(1);
                        }}
                        className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary"
                        aria-label="Filter by student status"
                    >
                        <option value="ALL">All student statuses</option>
                        <option value="ACTIVE">Active</option>
                        <option value="INACTIVE">Inactive</option>
                        <option value="GRADUATED">Graduated</option>
                    </select>
                </div>

                {/* Sorting */}
                <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <SlidersHorizontal size={15} />
                        Refine student records
                    </div>

                    <label className="flex items-center gap-2 text-sm">
                        <ArrowUpDown size={15} className="text-muted-foreground" />
                        <span className="text-muted-foreground">Sort by</span>
                        <select
                            value={sortBy}
                            onChange={(event) => {
                                setSortBy(event.target.value);
                                setPage(1);
                            }}
                            className="rounded-md border border-border bg-background px-2 py-1.5 text-sm outline-none"
                        >
                            <option value="name">Student name</option>
                            <option value="outstanding">Highest outstanding</option>
                            <option value="paid">Highest paid</option>
                        </select>
                    </label>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1050px] text-left text-sm">
                        <thead>
                            <tr className="border-y border-border bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                                <th className="px-5 py-3 font-medium">Student</th>
                                <th className="px-4 py-3 font-medium">Program</th>
                                <th className="px-4 py-3 font-medium">Total fees</th>
                                <th className="px-4 py-3 font-medium">Paid</th>
                                <th className="px-4 py-3 font-medium">Outstanding</th>
                                <th className="px-4 py-3 font-medium">Fee status</th>
                                <th className="px-4 py-3 font-medium">Student status</th>
                                <th className="px-5 py-3 text-right font-medium">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {paginatedStudents.map((student) => {
                                const feeBadge = getFeeBadge(student.feeStatus);

                                return (
                                    <tr
                                        key={student.id}
                                        className="border-b border-border last:border-0 transition hover:bg-muted/30"
                                    >
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                                                    {student.avatar}
                                                </div>

                                                <div className="min-w-0">
                                                    <p className="whitespace-nowrap font-semibold">
                                                        {student.name}
                                                    </p>
                                                    <p className="mt-1 whitespace-nowrap text-xs text-muted-foreground">
                                                        {student.studentId}
                                                    </p>
                                                    <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                                                        <Mail size={12} />
                                                        {student.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-4 py-4">
                                            <p className="max-w-[210px] font-medium">
                                                {student.program}
                                            </p>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                Semester {student.semester}
                                            </p>
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-4 font-medium">
                                            {formatCurrency(student.totalFees)}
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-4 font-medium text-emerald-700 dark:text-emerald-400">
                                            {formatCurrency(student.paidAmount)}
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-4 font-semibold">
                                            {formatCurrency(student.outstandingAmount)}
                                        </td>

                                        <td className="px-4 py-4">
                                            <Badge variant={feeBadge.variant}>
                                                {feeBadge.label}
                                            </Badge>
                                        </td>

                                        <td className="px-4 py-4">
                                            <Badge
                                                variant={
                                                    student.studentStatus === "ACTIVE"
                                                        ? "success"
                                                        : "neutral"
                                                }
                                            >
                                                {student.studentStatus}
                                            </Badge>
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex justify-end gap-1">
                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedStudent(student)}
                                                    title="Quick view"
                                                    aria-label={`Quick view ${student.name}`}
                                                    className="inline-flex size-9 items-center justify-center rounded-lg border border-border transition hover:bg-muted"
                                                >
                                                    <Eye size={16} />
                                                </button>

                                                <Link
                                                    href={`/accountant/students/${student.id}`}
                                                    title="View financial profile"
                                                    aria-label={`View financial profile for ${student.name}`}
                                                    className="inline-flex size-9 items-center justify-center rounded-lg border border-border transition hover:bg-muted"
                                                >
                                                    <ArrowRight size={16} />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}

                            {paginatedStudents.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="px-5 py-16 text-center">
                                        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted">
                                            <Search size={21} className="text-muted-foreground" />
                                        </div>
                                        <p className="mt-3 font-semibold">No students found</p>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            Try changing your search or filters.
                                        </p>
                                        <button
                                            type="button"
                                            onClick={resetFilters}
                                            className="mt-3 text-sm font-semibold text-primary hover:underline"
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
                <div className="flex flex-col gap-4 border-t border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <span>
                            Showing{" "}
                            {filteredStudents.length === 0
                                ? 0
                                : (currentPage - 1) * pageSize + 1}
                            {" "}–{" "}
                            {Math.min(currentPage * pageSize, filteredStudents.length)}
                            {" "}of {filteredStudents.length}
                        </span>

                        <label className="flex items-center gap-2">
                            Rows
                            <select
                                value={pageSize}
                                onChange={(event) => {
                                    setPageSize(Number(event.target.value));
                                    setPage(1);
                                }}
                                className="rounded-md border border-border bg-background px-2 py-1.5 text-sm"
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                            </select>
                        </label>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setPage((current) => Math.max(1, current - 1))}
                            disabled={currentPage <= 1}
                            className="inline-flex h-9 items-center gap-1 rounded-lg border border-border px-3 text-sm transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            <ChevronLeft size={16} />
                            Previous
                        </button>

                        <span className="min-w-20 text-center text-sm text-muted-foreground">
                            Page {currentPage} of {totalPages}
                        </span>

                        <button
                            type="button"
                            onClick={() =>
                                setPage((current) => Math.min(totalPages, current + 1))
                            }
                            disabled={currentPage >= totalPages}
                            className="inline-flex h-9 items-center gap-1 rounded-lg border border-border px-3 text-sm transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Next
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </section>

            {/* Student quick-view dialog */}
            {selectedStudent && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setSelectedStudent(null);
                        }
                    }}
                >
                    <section
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="student-dialog-title"
                        className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-xl"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                                    {selectedStudent.avatar}
                                </div>
                                <div>
                                    <h2
                                        id="student-dialog-title"
                                        className="text-lg font-bold"
                                    >
                                        {selectedStudent.name}
                                    </h2>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {selectedStudent.studentId}
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setSelectedStudent(null)}
                                aria-label="Close student details"
                                className="flex size-9 items-center justify-center rounded-lg hover:bg-muted"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="mt-6 space-y-4">
                            <div className="flex items-start gap-3">
                                <GraduationCap
                                    size={18}
                                    className="mt-0.5 text-muted-foreground"
                                />
                                <div>
                                    <p className="text-sm font-medium">
                                        {selectedStudent.program}
                                    </p>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {selectedStudent.department} · Semester{" "}
                                        {selectedStudent.semester}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                <div className="rounded-lg border border-border p-3">
                                    <p className="text-xs text-muted-foreground">Total fees</p>
                                    <p className="mt-2 text-sm font-bold">
                                        {formatCurrency(selectedStudent.totalFees)}
                                    </p>
                                </div>

                                <div className="rounded-lg border border-border p-3">
                                    <p className="text-xs text-muted-foreground">Paid</p>
                                    <p className="mt-2 text-sm font-bold text-emerald-600">
                                        {formatCurrency(selectedStudent.paidAmount)}
                                    </p>
                                </div>

                                <div className="rounded-lg border border-border p-3">
                                    <p className="text-xs text-muted-foreground">Outstanding</p>
                                    <p className="mt-2 text-sm font-bold">
                                        {formatCurrency(selectedStudent.outstandingAmount)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div>
                                    <p className="text-sm text-muted-foreground">Fee status</p>
                                    <div className="mt-2">
                                        <Badge
                                            variant={getFeeBadge(selectedStudent.feeStatus).variant}
                                        >
                                            {getFeeBadge(selectedStudent.feeStatus).label}
                                        </Badge>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">Student status</p>
                                    <div className="mt-2">
                                        <Badge
                                            variant={
                                                selectedStudent.studentStatus === "ACTIVE"
                                                    ? "success"
                                                    : "neutral"
                                            }
                                        >
                                            {selectedStudent.studentStatus}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-7 flex flex-wrap justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setSelectedStudent(null)}
                                className="h-10 rounded-lg border border-border px-4 text-sm font-medium hover:bg-muted"
                            >
                                Close
                            </button>

                            <Link
                                href={`/accountant/invoices?studentId=${encodeURIComponent(
                                    selectedStudent.id
                                )}`}
                                className="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-4 text-sm font-medium hover:bg-muted"
                            >
                                <Receipt size={16} />
                                Invoices
                            </Link>

                            <Link
                                href={`/accountant/students/${selectedStudent.id}`}
                                className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground hover:opacity-90"
                            >
                                Full details <ArrowRight size={16} />
                            </Link>
                        </div>
                    </section>
                </div>
            )}
        </main>
    );
}