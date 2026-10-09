// import React from 'react'

// export default function Invoices() {
//     return (
//         <div>invoices</div>
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
    AlertTriangle,
    Download,
    Eye,
    ArrowUpDown,
    ChevronLeft,
    ChevronRight,
    RotateCcw,
    GraduationCap,
    Mail,
    SlidersHorizontal,
    Plus,
    ArrowUpRight,
    X,
} from "lucide-react";

type FinancialStatus = "PAID" | "PARTIAL" | "UNPAID" | "OVERDUE";

type Student = {
    id: string;
    studentId: string;
    name: string;
    email: string;
    program: string;
    department: string;
    totalFees: number;
    paidAmount: number;
    dueAmount: number;
    status: FinancialStatus;
};

const initialStudents: Student[] = [
    {
        id: "student-001",
        studentId: "STU-2026-0012",
        name: "Ayan Sujon",
        email: "ayan@example.com",
        program: "B.Sc. in Computer Science",
        department: "Computer Science",
        totalFees: 75000,
        paidAmount: 50000,
        dueAmount: 25000,
        status: "PARTIAL",
    },
    {
        id: "student-002",
        studentId: "STU-2025-0048",
        name: "Nusrat Jahan",
        email: "nusrat@example.com",
        program: "BBA",
        department: "Business Administration",
        totalFees: 60000,
        paidAmount: 60000,
        dueAmount: 0,
        status: "PAID",
    },
    {
        id: "student-003",
        studentId: "STU-2024-0091",
        name: "Rahim Ahmed",
        email: "rahim@example.com",
        program: "B.Sc. in Electrical Engineering",
        department: "Electrical Engineering",
        totalFees: 90000,
        paidAmount: 65000,
        dueAmount: 25000,
        status: "OVERDUE",
    },
    {
        id: "student-004",
        studentId: "STU-2026-0035",
        name: "Maliha Islam",
        email: "maliha@example.com",
        program: "B.Sc. in Computer Science",
        department: "Computer Science",
        totalFees: 75000,
        paidAmount: 0,
        dueAmount: 75000,
        status: "UNPAID",
    },
    {
        id: "student-005",
        studentId: "STU-2025-0021",
        name: "Tanvir Hasan",
        email: "tanvir@example.com",
        program: "B.Sc. in Civil Engineering",
        department: "Civil Engineering",
        totalFees: 85000,
        paidAmount: 40000,
        dueAmount: 45000,
        status: "OVERDUE",
    },
    {
        id: "student-006",
        studentId: "STU-2026-0054",
        name: "Sadman Kabir",
        email: "sadman@example.com",
        program: "BBA",
        department: "Business Administration",
        totalFees: 60000,
        paidAmount: 30000,
        dueAmount: 30000,
        status: "PARTIAL",
    },
    {
        id: "student-007",
        studentId: "STU-2025-0077",
        name: "Farzana Akter",
        email: "farzana@example.com",
        program: "B.Sc. in Computer Science",
        department: "Computer Science",
        totalFees: 75000,
        paidAmount: 75000,
        dueAmount: 0,
        status: "PAID",
    },
    {
        id: "student-008",
        studentId: "STU-2024-0105",
        name: "Imran Hossain",
        email: "imran@example.com",
        program: "B.Sc. in Civil Engineering",
        department: "Civil Engineering",
        totalFees: 85000,
        paidAmount: 20000,
        dueAmount: 65000,
        status: "UNPAID",
    },
];

const currency = (amount: number) =>
    new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT",
        maximumFractionDigits: 0,
    }).format(amount);

function StatusBadge({ status }: { status: FinancialStatus }) {
    const styles: Record<FinancialStatus, string> = {
        PAID:
            "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
        PARTIAL:
            "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
        UNPAID:
            "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
        OVERDUE:
            "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400",
    };

    const labels: Record<FinancialStatus, string> = {
        PAID: "Paid",
        PARTIAL: "Partially Paid",
        UNPAID: "Unpaid",
        OVERDUE: "Overdue",
    };

    return (
        <span
            className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${styles[status]}`}
        >
            {labels[status]}
        </span>
    );
}

function MetricCard({
    title,
    value,
    description,
    icon: Icon,
    iconClass,
}: {
    title: string;
    value: string;
    description: string;
    icon: React.ElementType;
    iconClass: string;
}) {
    return (
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">{title}</p>
                <span
                    className={`flex size-10 items-center justify-center rounded-xl ${iconClass}`}
                >
                    <Icon size={20} />
                </span>
            </div>
            <p className="mt-4 text-2xl font-bold tracking-tight">{value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        </div>
    );
}

export default function Students() {
    const [students] = useState<Student[]>(initialStudents);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [programFilter, setProgramFilter] = useState("ALL");
    const [sortByDue, setSortByDue] = useState<"desc" | "asc">("desc");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState("5");
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    const filteredStudents = useMemo(() => {
        const query = search.trim().toLowerCase();

        return students
            .filter((student) => {
                const matchesSearch =
                    !query ||
                    student.name.toLowerCase().includes(query) ||
                    student.studentId.toLowerCase().includes(query) ||
                    student.email.toLowerCase().includes(query);

                const matchesStatus =
                    statusFilter === "ALL" || student.status === statusFilter;

                const matchesProgram =
                    programFilter === "ALL" || student.program === programFilter;

                return matchesSearch && matchesStatus && matchesProgram;
            })
            .sort((a, b) =>
                sortByDue === "desc"
                    ? b.dueAmount - a.dueAmount
                    : a.dueAmount - b.dueAmount
            );
    }, [students, search, statusFilter, programFilter, sortByDue]);

    const totalDue = students.reduce(
        (sum, student) => sum + student.dueAmount,
        0
    );

    const totalPaid = students.reduce(
        (sum, student) => sum + student.paidAmount,
        0
    );

    const overdueStudents = students.filter(
        (student) => student.status === "OVERDUE"
    ).length;

    const totalPages = Math.max(
        1,
        Math.ceil(filteredStudents.length / Number(pageSize))
    );

    const currentPage = Math.min(page, totalPages);

    const paginatedStudents = filteredStudents.slice(
        (currentPage - 1) * Number(pageSize),
        currentPage * Number(pageSize)
    );

    const resetFilters = () => {
        setSearch("");
        setStatusFilter("ALL");
        setProgramFilter("ALL");
        setSortByDue("desc");
        setPage(1);
    };

    const exportCSV = () => {
        const headers = [
            "Student ID",
            "Name",
            "Email",
            "Program",
            "Total Fees",
            "Paid Amount",
            "Due Amount",
            "Financial Status",
        ];

        const rows = filteredStudents.map((student) => [
            student.studentId,
            student.name,
            student.email,
            student.program,
            student.totalFees,
            student.paidAmount,
            student.dueAmount,
            student.status,
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
        anchor.download = "campusflow-accountant-students.csv";
        anchor.click();
        URL.revokeObjectURL(url);
    };

    return (
        <main className="min-h-screen bg-background text-foreground">
            <div className="mx-auto max-w-[1600px] space-y-7 p-4 sm:p-6 lg:p-8">
                {/* Header */}
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                    <div>

                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            Student Finance Management
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                            View student financial records, track outstanding fees, and
                            access invoice and payment information.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <button
                            type="button"
                            onClick={exportCSV}
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 text-sm font-medium transition hover:bg-muted"
                        >
                            <Download size={16} />
                            Export CSV
                        </button>

                        <Link
                            href="/accountant/invoices/new"
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                        >
                            <Plus size={17} />
                            Create Invoice
                        </Link>
                    </div>
                </div>

                {/* Summary */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <MetricCard
                        title="Total Students"
                        value={students.length.toLocaleString("en-BD")}
                        description="Students in this example dataset"
                        icon={Users}
                        iconClass="bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400"
                    />

                    <MetricCard
                        title="Total Collected"
                        value={currency(totalPaid)}
                        description="Sum of example student payments"
                        icon={Wallet}
                        iconClass="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                    />

                    <MetricCard
                        title="Outstanding Fees"
                        value={currency(totalDue)}
                        description="Remaining balance in the sample"
                        icon={Receipt}
                        iconClass="bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400"
                    />

                    <MetricCard
                        title="Overdue Students"
                        value={overdueStudents.toLocaleString("en-BD")}
                        description="Students marked as overdue"
                        icon={AlertTriangle}
                        iconClass="bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400"
                    />
                </div>

                {/* Collection Notice */}
                <div className="flex flex-col gap-3 rounded-xl border border-blue-200 bg-blue-50/70 p-4 dark:border-blue-900 dark:bg-blue-950/20 sm:flex-row sm:items-center">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                        <GraduationCap size={21} />
                    </div>

                    <div className="flex-1">
                        <p className="text-sm font-semibold">Student financial overview</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Select a student to inspect their financial summary, invoices,
                            and payment history.
                        </p>
                    </div>

                    <Link
                        href="/accountant/outstanding-fees"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                    >
                        Outstanding fees <ArrowUpRight size={16} />
                    </Link>
                </div>

                {/* Filters */}
                <section className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">
                    <div className="mb-4 flex items-center gap-2">
                        <SlidersHorizontal size={17} className="text-muted-foreground" />
                        <h2 className="text-sm font-semibold">Search and filters</h2>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(240px,1.6fr)_minmax(180px,1fr)_minmax(180px,1fr)_auto]">
                        <div className="flex h-11 items-center gap-2 rounded-lg border border-border px-3 focus-within:ring-2 focus-within:ring-primary/20">
                            <Search size={17} className="shrink-0 text-muted-foreground" />
                            <input
                                value={search}
                                onChange={(event) => {
                                    setSearch(event.target.value);
                                    setPage(1);
                                }}
                                placeholder="Search name, student ID, email..."
                                aria-label="Search students"
                                className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                            />
                            {search && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearch("");
                                        setPage(1);
                                    }}
                                    aria-label="Clear search"
                                    className="text-muted-foreground hover:text-foreground"
                                >
                                    <X size={15} />
                                </button>
                            )}
                        </div>

                        <select
                            value={statusFilter}
                            onChange={(event) => {
                                setStatusFilter(event.target.value);
                                setPage(1);
                            }}
                            aria-label="Filter by financial status"
                            className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                        >
                            <option value="ALL">All financial statuses</option>
                            <option value="PAID">Paid</option>
                            <option value="PARTIAL">Partially Paid</option>
                            <option value="UNPAID">Unpaid</option>
                            <option value="OVERDUE">Overdue</option>
                        </select>

                        <select
                            value={programFilter}
                            onChange={(event) => {
                                setProgramFilter(event.target.value);
                                setPage(1);
                            }}
                            aria-label="Filter by program"
                            className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                        >
                            <option value="ALL">All programs</option>
                            <option value="B.Sc. in Computer Science">
                                B.Sc. in Computer Science
                            </option>
                            <option value="BBA">BBA</option>
                            <option value="B.Sc. in Electrical Engineering">
                                B.Sc. in Electrical Engineering
                            </option>
                            <option value="B.Sc. in Civil Engineering">
                                B.Sc. in Civil Engineering
                            </option>
                        </select>

                        <button
                            type="button"
                            onClick={resetFilters}
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-border px-4 text-sm font-medium transition hover:bg-muted"
                        >
                            <RotateCcw size={15} />
                            Reset
                        </button>
                    </div>
                </section>

                {/* Student Table */}
                <section className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                    <div className="flex flex-col justify-between gap-3 border-b border-border p-5 sm:flex-row sm:items-center">
                        <div>
                            <h2 className="text-base font-semibold">Students</h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                {filteredStudents.length} student
                                {filteredStudents.length !== 1 ? "s" : ""} found
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                setSortByDue((current) =>
                                    current === "desc" ? "asc" : "desc"
                                )
                            }
                            className="inline-flex h-9 items-center justify-center gap-2 self-start rounded-lg border border-border px-3 text-sm font-medium transition hover:bg-muted sm:self-auto"
                        >
                            <ArrowUpDown size={15} />
                            Due: {sortByDue === "desc" ? "Highest first" : "Lowest first"}
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1050px] text-left text-sm">
                            <thead>
                                <tr className="border-b border-border bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                                    <th className="px-5 py-4 font-medium">Student</th>
                                    <th className="px-4 py-4 font-medium">Program</th>
                                    <th className="px-4 py-4 font-medium">Total Fees</th>
                                    <th className="px-4 py-4 font-medium">Paid</th>
                                    <th className="px-4 py-4 font-medium">Outstanding</th>
                                    <th className="px-4 py-4 font-medium">Status</th>
                                    <th className="px-5 py-4 text-right font-medium">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {paginatedStudents.map((student) => (
                                    <tr
                                        key={student.id}
                                        className="border-b border-border last:border-0 transition hover:bg-muted/30"
                                    >
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                                                    {student.name
                                                        .split(" ")
                                                        .map((part) => part[0])
                                                        .slice(0, 2)
                                                        .join("")
                                                        .toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-semibold">{student.name}</p>
                                                    <p className="mt-1 text-xs text-muted-foreground">
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
                                            <p className="max-w-[230px] font-medium">
                                                {student.program}
                                            </p>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {student.department}
                                            </p>
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-4 font-medium">
                                            {currency(student.totalFees)}
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-4 font-medium text-emerald-600">
                                            {currency(student.paidAmount)}
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-4 font-semibold">
                                            {currency(student.dueAmount)}
                                        </td>

                                        <td className="px-4 py-4">
                                            <StatusBadge status={student.status} />
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedStudent(student)}
                                                    title="Quick financial overview"
                                                    aria-label={`View ${student.name} summary`}
                                                    className="inline-flex size-9 items-center justify-center rounded-lg border border-border transition hover:bg-muted"
                                                >
                                                    <Eye size={16} />
                                                </button>

                                                <Link
                                                    href={`/accountant/students/${student.id}`}
                                                    title="Student financial details"
                                                    aria-label={`Open ${student.name} details`}
                                                    className="inline-flex size-9 items-center justify-center rounded-lg border border-border transition hover:bg-muted"
                                                >
                                                    <ArrowUpRight size={16} />
                                                </Link>

                                                <Link
                                                    href={`/accountant/invoices/new?studentId=${encodeURIComponent(student.id)}`}
                                                    title="Create invoice for this student"
                                                    aria-label={`Create invoice for ${student.name}`}
                                                    className="inline-flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition hover:bg-primary/20"
                                                >
                                                    <Receipt size={16} />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredStudents.length === 0 && (
                        <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
                            <div className="flex size-14 items-center justify-center rounded-full bg-muted">
                                <Search size={23} className="text-muted-foreground" />
                            </div>
                            <h3 className="mt-4 font-semibold">No students found</h3>
                            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                                Try another search term or change the financial status or
                                program filter.
                            </p>
                            <button
                                type="button"
                                onClick={resetFilters}
                                className="mt-4 text-sm font-semibold text-primary hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}

                    {/* Pagination */}
                    <div className="flex flex-col gap-4 border-t border-border p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                            <span>Rows per page</span>
                            <select
                                value={pageSize}
                                onChange={(event) => {
                                    setPageSize(event.target.value);
                                    setPage(1);
                                }}
                                aria-label="Rows per page"
                                className="h-9 rounded-lg border border-border bg-background px-2 text-sm text-foreground outline-none"
                            >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                            </select>
                            <span>
                                Showing{" "}
                                {filteredStudents.length === 0
                                    ? 0
                                    : (currentPage - 1) * Number(pageSize) + 1}
                                –
                                {Math.min(currentPage * Number(pageSize), filteredStudents.length)}{" "}
                                of {filteredStudents.length}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                disabled={currentPage <= 1}
                                onClick={() => setPage((current) => Math.max(1, current - 1))}
                                aria-label="Previous page"
                                className="inline-flex size-9 items-center justify-center rounded-lg border border-border transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <ChevronLeft size={17} />
                            </button>

                            <span className="min-w-24 text-center text-sm text-muted-foreground">
                                Page {currentPage} of {totalPages}
                            </span>

                            <button
                                type="button"
                                disabled={currentPage >= totalPages}
                                onClick={() =>
                                    setPage((current) => Math.min(totalPages, current + 1))
                                }
                                aria-label="Next page"
                                className="inline-flex size-9 items-center justify-center rounded-lg border border-border transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <ChevronRight size={17} />
                            </button>
                        </div>
                    </div>
                </section>

                <p className="text-xs text-muted-foreground">
                    Note: Student records and financial figures on this page are
                    illustrative demo data. Connect the page to your authenticated
                    backend before using it for real financial operations.
                </p>
            </div>

            {/* Student Financial Overview Dialog */}
            {selectedStudent && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
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
                        className="my-auto w-full max-w-lg rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-2xl"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-base font-bold text-primary">
                                    {selectedStudent.name
                                        .split(" ")
                                        .map((part) => part[0])
                                        .slice(0, 2)
                                        .join("")
                                        .toUpperCase()}
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
                                aria-label="Close dialog"
                                className="inline-flex size-9 items-center justify-center rounded-lg border border-border hover:bg-muted"
                            >
                                <X size={17} />
                            </button>
                        </div>

                        <div className="mt-5 rounded-xl bg-muted/50 p-4">
                            <p className="text-sm font-medium">
                                {selectedStudent.program}
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                {selectedStudent.department}
                            </p>
                            <p className="mt-2 break-all text-sm text-muted-foreground">
                                {selectedStudent.email}
                            </p>
                        </div>

                        <div className="mt-5 grid grid-cols-2 gap-3">
                            <div className="rounded-xl border border-border p-4">
                                <p className="text-xs text-muted-foreground">Total Fees</p>
                                <p className="mt-2 text-lg font-bold">
                                    {currency(selectedStudent.totalFees)}
                                </p>
                            </div>
                            <div className="rounded-xl border border-border p-4">
                                <p className="text-xs text-muted-foreground">Paid Amount</p>
                                <p className="mt-2 text-lg font-bold text-emerald-600">
                                    {currency(selectedStudent.paidAmount)}
                                </p>
                            </div>
                            <div className="rounded-xl border border-border p-4">
                                <p className="text-xs text-muted-foreground">Due Amount</p>
                                <p className="mt-2 text-lg font-bold">
                                    {currency(selectedStudent.dueAmount)}
                                </p>
                            </div>
                            <div className="rounded-xl border border-border p-4">
                                <p className="text-xs text-muted-foreground">
                                    Financial Status
                                </p>
                                <div className="mt-2">
                                    <StatusBadge status={selectedStudent.status} />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                            <button
                                type="button"
                                onClick={() => setSelectedStudent(null)}
                                className="inline-flex h-10 items-center justify-center rounded-lg border border-border px-4 text-sm font-medium hover:bg-muted"
                            >
                                Close
                            </button>

                            <Link
                                href={`/accountant/invoices/new?studentId=${encodeURIComponent(selectedStudent.id)}`}
                                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border px-4 text-sm font-medium hover:bg-muted"
                            >
                                <Plus size={16} />
                                Create Invoice
                            </Link>

                            <Link
                                href={`/accountant/students/${selectedStudent.id}`}
                                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground hover:opacity-90"
                            >
                                View Details
                            </Link>
                        </div>
                    </section>
                </div>
            )}
        </main>
    );
}