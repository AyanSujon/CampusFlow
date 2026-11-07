// import React from 'react'

// export default function grades() {
//     return (
//         <div>grades</div>
//     )
// }
















"use client";

import { useMemo, useState } from "react";
import {
    Search,
    Download,
    GraduationCap,
    BookOpen,
    Users,
    TrendingUp,
    Clock3,
    CheckCircle2,
    AlertCircle,
    Eye,
    X,
    Filter,
    CalendarDays,
    FileText,
    Award,
    BarChart3,
    ChevronDown,
} from "lucide-react";

type GradeStatus = "PUBLISHED" | "PENDING" | "DRAFT" | "UNDER_REVIEW";

interface GradeRecord {
    id: string;
    studentId: string;
    studentName: string;
    email: string;
    courseCode: string;
    courseName: string;
    program: string;
    semester: string;
    academicYear: string;
    marks: number;
    totalMarks: number;
    grade: string;
    gradePoint: number;
    status: GradeStatus;
    submittedAt: string;
    instructor: string;
}

const initialGrades: GradeRecord[] = [
    {
        id: "1",
        studentId: "STU-2024-CSE-0001",
        studentName: "Rahim Ahmed",
        email: "rahim@example.com",
        courseCode: "CSE-101",
        courseName: "Introduction to Programming",
        program: "Computer Science & Engineering",
        semester: "Fall 2026",
        academicYear: "2026",
        marks: 88,
        totalMarks: 100,
        grade: "A",
        gradePoint: 3.75,
        status: "PUBLISHED",
        submittedAt: "2026-11-02",
        instructor: "Dr. Mahmud Hasan",
    },
    {
        id: "2",
        studentId: "STU-2024-CSE-0002",
        studentName: "Nusrat Jahan",
        email: "nusrat@example.com",
        courseCode: "CSE-101",
        courseName: "Introduction to Programming",
        program: "Computer Science & Engineering",
        semester: "Fall 2026",
        academicYear: "2026",
        marks: 94,
        totalMarks: 100,
        grade: "A+",
        gradePoint: 4.0,
        status: "PUBLISHED",
        submittedAt: "2026-11-02",
        instructor: "Dr. Mahmud Hasan",
    },
    {
        id: "3",
        studentId: "STU-2024-CSE-0003",
        studentName: "Sakib Hossain",
        email: "sakib@example.com",
        courseCode: "CSE-201",
        courseName: "Data Structures",
        program: "Computer Science & Engineering",
        semester: "Fall 2026",
        academicYear: "2026",
        marks: 76,
        totalMarks: 100,
        grade: "B+",
        gradePoint: 3.25,
        status: "PENDING",
        submittedAt: "2026-11-04",
        instructor: "Nusrat Jahan",
    },
    {
        id: "4",
        studentId: "STU-2024-CSE-0004",
        studentName: "Ayesha Akter",
        email: "ayesha@example.com",
        courseCode: "CSE-201",
        courseName: "Data Structures",
        program: "Computer Science & Engineering",
        semester: "Fall 2026",
        academicYear: "2026",
        marks: 82,
        totalMarks: 100,
        grade: "A-",
        gradePoint: 3.5,
        status: "UNDER_REVIEW",
        submittedAt: "2026-11-03",
        instructor: "Nusrat Jahan",
    },
    {
        id: "5",
        studentId: "STU-2024-CSE-0005",
        studentName: "Tanvir Islam",
        email: "tanvir@example.com",
        courseCode: "CSE-301",
        courseName: "Database Management Systems",
        program: "Computer Science & Engineering",
        semester: "Fall 2026",
        academicYear: "2026",
        marks: 65,
        totalMarks: 100,
        grade: "B-",
        gradePoint: 2.75,
        status: "PUBLISHED",
        submittedAt: "2026-11-01",
        instructor: "Dr. Arif Rahman",
    },
    {
        id: "6",
        studentId: "STU-2024-CSE-0006",
        studentName: "Farhan Ahmed",
        email: "farhan@example.com",
        courseCode: "CSE-301",
        courseName: "Database Management Systems",
        program: "Computer Science & Engineering",
        semester: "Fall 2026",
        academicYear: "2026",
        marks: 91,
        totalMarks: 100,
        grade: "A+",
        gradePoint: 4.0,
        status: "PUBLISHED",
        submittedAt: "2026-11-01",
        instructor: "Dr. Arif Rahman",
    },
    {
        id: "7",
        studentId: "STU-2024-CSE-0007",
        studentName: "Sadia Islam",
        email: "sadia@example.com",
        courseCode: "CSE-401",
        courseName: "Artificial Intelligence",
        program: "Computer Science & Engineering",
        semester: "Fall 2026",
        academicYear: "2026",
        marks: 0,
        totalMarks: 100,
        grade: "-",
        gradePoint: 0,
        status: "DRAFT",
        submittedAt: "2026-11-05",
        instructor: "Dr. Mahmud Hasan",
    },
    {
        id: "8",
        studentId: "STU-2024-CSE-0008",
        studentName: "Imran Hossain",
        email: "imran@example.com",
        courseCode: "CSE-101",
        courseName: "Introduction to Programming",
        program: "Computer Science & Engineering",
        semester: "Spring 2026",
        academicYear: "2026",
        marks: 72,
        totalMarks: 100,
        grade: "B",
        gradePoint: 3.0,
        status: "PUBLISHED",
        submittedAt: "2026-06-15",
        instructor: "Dr. Mahmud Hasan",
    },
];

const statusStyles: Record<GradeStatus, string> = {
    PUBLISHED:
        "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
    PENDING:
        "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400",
    DRAFT:
        "border-slate-500/20 bg-slate-500/10 text-slate-600 dark:text-slate-400",
    UNDER_REVIEW:
        "border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-400",
};

function StatusBadge({ status }: { status: GradeStatus }) {
    const Icon =
        status === "PUBLISHED"
            ? CheckCircle2
            : status === "PENDING"
                ? Clock3
                : status === "UNDER_REVIEW"
                    ? AlertCircle
                    : FileText;

    const label = status.replaceAll("_", " ");

    return (
        <span
            className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}
        >
            <Icon className="h-3.5 w-3.5" />
            {label.charAt(0) + label.slice(1).toLowerCase()}
        </span>
    );
}

function getGrade(marks: number, total: number) {
    const percentage = total > 0 ? (marks / total) * 100 : 0;

    if (percentage >= 80) return { grade: "A+", point: 4.0 };
    if (percentage >= 75) return { grade: "A", point: 3.75 };
    if (percentage >= 70) return { grade: "A-", point: 3.5 };
    if (percentage >= 65) return { grade: "B+", point: 3.25 };
    if (percentage >= 60) return { grade: "B", point: 3.0 };
    if (percentage >= 55) return { grade: "B-", point: 2.75 };
    if (percentage >= 50) return { grade: "C+", point: 2.5 };
    if (percentage >= 45) return { grade: "C", point: 2.25 };
    if (percentage >= 40) return { grade: "D", point: 2.0 };
    return { grade: "F", point: 0 };
}

function formatDate(date: string) {
    return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

export default function GradesApprovalsPage() {
    const [grades, setGrades] = useState<GradeRecord[]>(initialGrades);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [semesterFilter, setSemesterFilter] = useState("ALL");
    const [courseFilter, setCourseFilter] = useState("ALL");
    const [selectedGrade, setSelectedGrade] = useState<GradeRecord | null>(null);

    const semesters = useMemo(
        () => Array.from(new Set(grades.map((grade) => grade.semester))),
        [grades],
    );

    const courses = useMemo(
        () =>
            Array.from(
                new Map(
                    grades.map((grade) => [
                        grade.courseCode,
                        `${grade.courseCode} - ${grade.courseName}`,
                    ]),
                ).entries(),
            ),
        [grades],
    );

    const filteredGrades = useMemo(() => {
        const query = search.toLowerCase().trim();

        return grades.filter((grade) => {
            const matchesSearch =
                !query ||
                grade.studentName.toLowerCase().includes(query) ||
                grade.studentId.toLowerCase().includes(query) ||
                grade.courseName.toLowerCase().includes(query) ||
                grade.courseCode.toLowerCase().includes(query);

            const matchesStatus =
                statusFilter === "ALL" || grade.status === statusFilter;

            const matchesSemester =
                semesterFilter === "ALL" || grade.semester === semesterFilter;

            const matchesCourse =
                courseFilter === "ALL" || grade.courseCode === courseFilter;

            return (
                matchesSearch &&
                matchesStatus &&
                matchesSemester &&
                matchesCourse
            );
        });
    }, [grades, search, statusFilter, semesterFilter, courseFilter]);

    const stats = useMemo(() => {
        const published = grades.filter(
            (grade) => grade.status === "PUBLISHED",
        );
        const graded = published.filter((grade) => grade.totalMarks > 0);
        const average =
            graded.length > 0
                ? graded.reduce(
                    (sum, grade) => sum + (grade.marks / grade.totalMarks) * 100,
                    0,
                ) / graded.length
                : 0;

        return {
            total: grades.length,
            published: published.length,
            pending: grades.filter((grade) => grade.status === "PENDING").length,
            underReview: grades.filter(
                (grade) => grade.status === "UNDER_REVIEW",
            ).length,
            average,
        };
    }, [grades]);

    const gradeDistribution = useMemo(() => {
        const published = grades.filter((grade) => grade.status === "PUBLISHED");
        const groups = [
            { label: "A / A+", min: 75, max: 100, count: 0 },
            { label: "B / B+", min: 60, max: 74.99, count: 0 },
            { label: "C / C+", min: 45, max: 59.99, count: 0 },
            { label: "D", min: 40, max: 44.99, count: 0 },
            { label: "F", min: 0, max: 39.99, count: 0 },
        ];

        published.forEach((grade) => {
            const percentage =
                grade.totalMarks > 0 ? (grade.marks / grade.totalMarks) * 100 : 0;

            const group = groups.find(
                (item) => percentage >= item.min && percentage <= item.max,
            );

            if (group) group.count += 1;
        });

        return groups;
    }, [grades]);

    function exportCSV() {
        const headers = [
            "Student ID",
            "Student Name",
            "Course Code",
            "Course Name",
            "Semester",
            "Marks",
            "Total Marks",
            "Grade",
            "Grade Point",
            "Status",
        ];

        const rows = filteredGrades.map((grade) => [
            grade.studentId,
            grade.studentName,
            grade.courseCode,
            grade.courseName,
            grade.semester,
            grade.marks,
            grade.totalMarks,
            grade.grade,
            grade.gradePoint,
            grade.status,
        ]);

        const csv = [headers, ...rows]
            .map((row) =>
                row
                    .map((value) => `"${String(value).replace(/"/g, '""')}"`)
                    .join(","),
            )
            .join("\n");

        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = "campusflow-grades.csv";
        link.click();

        URL.revokeObjectURL(url);
    }

    function publishGrade(id: string) {
        setGrades((current) =>
            current.map((grade) => {
                if (grade.id !== id || grade.status !== "PENDING") return grade;

                const result = getGrade(grade.marks, grade.totalMarks);

                return {
                    ...grade,
                    grade: result.grade,
                    gradePoint: result.point,
                    status: "PUBLISHED",
                };
            }),
        );

        setSelectedGrade(null);
    }

    function resetFilters() {
        setSearch("");
        setStatusFilter("ALL");
        setSemesterFilter("ALL");
        setCourseFilter("ALL");
    }

    return (
        <div className="space-y-6 pb-10 p-4">
            {/* Page Header */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <BookOpen className="h-4 w-4" />
                        Academics
                        <span>/</span>
                        <span>Grades</span>
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Grades Management
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Monitor student grades, review submissions, and track academic
                        performance.
                    </p>
                </div>

                <button
                    onClick={exportCSV}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border bg-background px-4 text-sm font-medium transition-colors hover:bg-muted"
                >
                    <Download className="h-4 w-4" />
                    Export CSV
                </button>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-xl border bg-card p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">
                            Total Grade Records
                        </p>
                        <div className="rounded-lg bg-primary/10 p-2 text-primary">
                            <GraduationCap className="h-5 w-5" />
                        </div>
                    </div>
                    <p className="mt-3 text-3xl font-bold">{stats.total}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                        Across all semesters
                    </p>
                </div>

                <div className="rounded-xl border bg-card p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">
                            Published Grades
                        </p>
                        <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-600">
                            <CheckCircle2 className="h-5 w-5" />
                        </div>
                    </div>
                    <p className="mt-3 text-3xl font-bold">{stats.published}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                        Officially released records
                    </p>
                </div>

                <div className="rounded-xl border bg-card p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">
                            Pending Grades
                        </p>
                        <div className="rounded-lg bg-amber-500/10 p-2 text-amber-600">
                            <Clock3 className="h-5 w-5" />
                        </div>
                    </div>
                    <p className="mt-3 text-3xl font-bold">{stats.pending}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                        Awaiting publication
                    </p>
                </div>

                <div className="rounded-xl border bg-card p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">
                            Average Marks
                        </p>
                        <div className="rounded-lg bg-blue-500/10 p-2 text-blue-600">
                            <TrendingUp className="h-5 w-5" />
                        </div>
                    </div>
                    <p className="mt-3 text-3xl font-bold">
                        {stats.average.toFixed(1)}%
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                        Published records only
                    </p>
                </div>
            </div>

            {/* Grade Distribution */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                <div className="rounded-xl border bg-card p-5 lg:col-span-2">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <h2 className="font-semibold">Grade Distribution</h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Distribution across published grade records.
                            </p>
                        </div>
                        <BarChart3 className="h-5 w-5 text-muted-foreground" />
                    </div>

                    <div className="mt-6 space-y-4">
                        {gradeDistribution.map((item) => {
                            const percentage =
                                stats.published > 0
                                    ? (item.count / stats.published) * 100
                                    : 0;

                            return (
                                <div key={item.label}>
                                    <div className="mb-2 flex items-center justify-between text-sm">
                                        <span className="font-medium">{item.label}</span>
                                        <span className="text-muted-foreground">
                                            {item.count} records ({percentage.toFixed(0)}%)
                                        </span>
                                    </div>
                                    <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                                        <div
                                            className="h-full rounded-full bg-primary transition-all"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="rounded-xl border bg-card p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="font-semibold">Review Overview</h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Grade submission status
                            </p>
                        </div>
                        <Award className="h-5 w-5 text-muted-foreground" />
                    </div>

                    <div className="mt-5 space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm">
                                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                                Published
                            </div>
                            <span className="font-semibold">{stats.published}</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm">
                                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                                Pending
                            </div>
                            <span className="font-semibold">{stats.pending}</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm">
                                <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                                Under Review
                            </div>
                            <span className="font-semibold">{stats.underReview}</span>
                        </div>

                        <div className="border-t pt-4">
                            <p className="text-xs text-muted-foreground">
                                Total records: {stats.total}
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Draft records:{" "}
                                {grades.filter((grade) => grade.status === "DRAFT").length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grade Records */}
            <div className="overflow-hidden rounded-xl border bg-card">
                <div className="border-b p-4 sm:p-5">
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                        <div>
                            <h2 className="font-semibold">Student Grade Records</h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                View and manage academic grade records.
                            </p>
                        </div>

                        <span className="text-xs text-muted-foreground">
                            {filteredGrades.length} records found
                        </span>
                    </div>

                    {/* Filters */}
                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        <div className="relative sm:col-span-2 xl:col-span-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <input
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Search student or course..."
                                className="h-10 w-full rounded-lg border bg-background pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                            />
                        </div>

                        <select
                            value={semesterFilter}
                            onChange={(event) => setSemesterFilter(event.target.value)}
                            className="h-10 rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
                        >
                            <option value="ALL">All Semesters</option>
                            {semesters.map((semester) => (
                                <option key={semester} value={semester}>
                                    {semester}
                                </option>
                            ))}
                        </select>

                        <select
                            value={courseFilter}
                            onChange={(event) => setCourseFilter(event.target.value)}
                            className="h-10 rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
                        >
                            <option value="ALL">All Courses</option>
                            {courses.map(([code, label]) => (
                                <option key={code} value={code}>
                                    {label}
                                </option>
                            ))}
                        </select>

                        <select
                            value={statusFilter}
                            onChange={(event) => setStatusFilter(event.target.value)}
                            className="h-10 rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
                        >
                            <option value="ALL">All Statuses</option>
                            <option value="PUBLISHED">Published</option>
                            <option value="PENDING">Pending</option>
                            <option value="UNDER_REVIEW">Under Review</option>
                            <option value="DRAFT">Draft</option>
                        </select>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Filter className="h-3.5 w-3.5" />
                            Filters applied to grade records
                        </div>
                        <button
                            onClick={resetFilters}
                            className="text-xs font-medium text-primary hover:underline"
                        >
                            Clear filters
                        </button>
                    </div>
                </div>

                {/* Desktop Table */}
                <div className="hidden overflow-x-auto md:block">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
                            <tr>
                                <th className="px-5 py-3 font-medium">Student</th>
                                <th className="px-5 py-3 font-medium">Course</th>
                                <th className="px-5 py-3 font-medium">Semester</th>
                                <th className="px-5 py-3 font-medium">Marks</th>
                                <th className="px-5 py-3 font-medium">Grade</th>
                                <th className="px-5 py-3 font-medium">Status</th>
                                <th className="px-5 py-3 text-right font-medium">Action</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y">
                            {filteredGrades.map((grade) => (
                                <tr key={grade.id} className="transition-colors hover:bg-muted/30">
                                    <td className="px-5 py-4">
                                        <p className="font-medium">{grade.studentName}</p>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            {grade.studentId}
                                        </p>
                                    </td>

                                    <td className="px-5 py-4">
                                        <p className="font-medium">{grade.courseCode}</p>
                                        <p className="mt-1 max-w-[180px] truncate text-xs text-muted-foreground">
                                            {grade.courseName}
                                        </p>
                                    </td>

                                    <td className="px-5 py-4 text-muted-foreground">
                                        {grade.semester}
                                    </td>

                                    <td className="px-5 py-4 font-medium tabular-nums">
                                        {grade.marks}/{grade.totalMarks}
                                    </td>

                                    <td className="px-5 py-4">
                                        <div className="font-semibold">{grade.grade}</div>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            GPA {grade.gradePoint.toFixed(2)}
                                        </p>
                                    </td>

                                    <td className="px-5 py-4">
                                        <StatusBadge status={grade.status} />
                                    </td>

                                    <td className="px-5 py-4 text-right">
                                        <button
                                            onClick={() => setSelectedGrade(grade)}
                                            className="inline-flex h-8 items-center gap-1.5 rounded-lg border px-3 text-xs font-medium hover:bg-muted"
                                        >
                                            <Eye className="h-3.5 w-3.5" />
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className="space-y-3 p-3 md:hidden">
                    {filteredGrades.map((grade) => (
                        <div key={grade.id} className="rounded-lg border p-4">
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <p className="font-semibold">{grade.studentName}</p>
                                    <p className="mt-1 break-all text-xs text-muted-foreground">
                                        {grade.studentId}
                                    </p>
                                </div>
                                <StatusBadge status={grade.status} />
                            </div>

                            <div className="mt-3 rounded-lg bg-muted/40 p-3">
                                <p className="text-sm font-medium">{grade.courseCode}</p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    {grade.courseName}
                                </p>
                            </div>

                            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                                <div>
                                    <p className="text-xs text-muted-foreground">Marks</p>
                                    <p className="mt-1 text-sm font-semibold">
                                        {grade.marks}/{grade.totalMarks}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Grade</p>
                                    <p className="mt-1 text-sm font-semibold">{grade.grade}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">GPA</p>
                                    <p className="mt-1 text-sm font-semibold">
                                        {grade.gradePoint.toFixed(2)}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-3 flex items-center justify-between border-t pt-3">
                                <span className="text-xs text-muted-foreground">
                                    {grade.semester}
                                </span>
                                <button
                                    onClick={() => setSelectedGrade(grade)}
                                    className="inline-flex h-8 items-center gap-1.5 rounded-lg border px-3 text-xs font-medium hover:bg-muted"
                                >
                                    <Eye className="h-3.5 w-3.5" />
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredGrades.length === 0 && (
                    <div className="px-4 py-14 text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                            <Search className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <h3 className="mt-4 font-semibold">No grade records found</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Try changing your search or filter criteria.
                        </p>
                        <button
                            onClick={resetFilters}
                            className="mt-3 text-sm font-medium text-primary hover:underline"
                        >
                            Reset filters
                        </button>
                    </div>
                )}

                <div className="border-t px-4 py-3 text-xs text-muted-foreground sm:px-5">
                    Showing {filteredGrades.length} of {grades.length} grade records
                </div>
            </div>

            {/* Grade Details Dialog */}
            {selectedGrade && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-5"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setSelectedGrade(null);
                        }
                    }}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="grade-details-title"
                        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-xl border bg-background shadow-xl"
                    >
                        <div className="flex items-start justify-between border-b p-5">
                            <div>
                                <h2 id="grade-details-title" className="text-lg font-bold">
                                    Grade Details
                                </h2>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Student academic performance record
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedGrade(null)}
                                className="rounded-lg p-2 text-muted-foreground hover:bg-muted"
                                aria-label="Close details"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="space-y-5 p-5">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-lg font-bold">
                                        {selectedGrade.studentName}
                                    </p>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {selectedGrade.studentId}
                                    </p>
                                </div>
                                <StatusBadge status={selectedGrade.status} />
                            </div>

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <div className="rounded-lg border p-3">
                                    <p className="text-xs text-muted-foreground">Course</p>
                                    <p className="mt-1 text-sm font-semibold">
                                        {selectedGrade.courseCode}
                                    </p>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {selectedGrade.courseName}
                                    </p>
                                </div>

                                <div className="rounded-lg border p-3">
                                    <p className="text-xs text-muted-foreground">Semester</p>
                                    <p className="mt-1 text-sm font-semibold">
                                        {selectedGrade.semester}
                                    </p>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        Academic Year {selectedGrade.academicYear}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <div className="rounded-lg bg-muted/50 p-3 text-center">
                                    <p className="text-xs text-muted-foreground">Marks</p>
                                    <p className="mt-2 text-xl font-bold">
                                        {selectedGrade.marks}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        / {selectedGrade.totalMarks}
                                    </p>
                                </div>
                                <div className="rounded-lg bg-muted/50 p-3 text-center">
                                    <p className="text-xs text-muted-foreground">Grade</p>
                                    <p className="mt-2 text-xl font-bold">
                                        {selectedGrade.grade}
                                    </p>
                                </div>
                                <div className="rounded-lg bg-muted/50 p-3 text-center">
                                    <p className="text-xs text-muted-foreground">Grade Point</p>
                                    <p className="mt-2 text-xl font-bold">
                                        {selectedGrade.gradePoint.toFixed(2)}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3 rounded-lg border p-4">
                                <div>
                                    <p className="text-xs text-muted-foreground">Instructor</p>
                                    <p className="mt-1 text-sm font-medium">
                                        {selectedGrade.instructor}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Submitted At</p>
                                    <p className="mt-1 text-sm font-medium">
                                        {formatDate(selectedGrade.submittedAt)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Student Email</p>
                                    <p className="mt-1 break-all text-sm font-medium">
                                        {selectedGrade.email}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col-reverse gap-2 border-t p-4 sm:flex-row sm:justify-end">
                            <button
                                onClick={() => setSelectedGrade(null)}
                                className="h-10 rounded-lg border px-4 text-sm font-medium hover:bg-muted"
                            >
                                Close
                            </button>

                            {selectedGrade.status === "PENDING" && (
                                <button
                                    onClick={() => publishGrade(selectedGrade.id)}
                                    className="h-10 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                                >
                                    Publish Grade
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
