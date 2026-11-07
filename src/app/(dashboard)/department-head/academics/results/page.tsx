// import React from 'react'

// export default function results() {
//     return (
//         <div>results</div>
//     )
// }



















"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
    Search,
    Download,
    Plus,
    GraduationCap,
    BookOpen,
    Users,
    Award,
    FileText,
    Eye,
    Pencil,
    MoreHorizontal,
    Filter,
    CheckCircle2,
    Clock3,
    AlertCircle,
    TrendingUp,
    XCircle,
    BarChart3,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Progress,
} from "@/components/ui/progress";

type ResultStatus = "PUBLISHED" | "PENDING" | "DRAFT" | "UNDER_REVIEW";

type StudentResult = {
    id: string;
    studentId: string;
    studentName: string;
    courseCode: string;
    courseName: string;
    semester: string;
    instructor: string;
    totalMarks: number;
    obtainedMarks: number;
    percentage: number;
    grade: string;
    gradePoint: number;
    status: ResultStatus;
};

const initialResults: StudentResult[] = [
    {
        id: "RES-001",
        studentId: "STU-2026-CSE-0001",
        studentName: "Rahim Ahmed",
        courseCode: "CSE-101",
        courseName: "Introduction to Programming",
        semester: "Fall 2026",
        instructor: "Mr. Hasan",
        totalMarks: 100,
        obtainedMarks: 92,
        percentage: 92,
        grade: "A+",
        gradePoint: 4.0,
        status: "PUBLISHED",
    },
    {
        id: "RES-002",
        studentId: "STU-2026-CSE-0002",
        studentName: "Nusrat Jahan",
        courseCode: "CSE-201",
        courseName: "Data Structures & Algorithms",
        semester: "Fall 2026",
        instructor: "Dr. Rahman",
        totalMarks: 100,
        obtainedMarks: 85,
        percentage: 85,
        grade: "A",
        gradePoint: 3.75,
        status: "PUBLISHED",
    },
    {
        id: "RES-003",
        studentId: "STU-2026-CSE-0003",
        studentName: "Tanvir Hossain",
        courseCode: "CSE-301",
        courseName: "Database Management Systems",
        semester: "Fall 2026",
        instructor: "Prof. Karim",
        totalMarks: 100,
        obtainedMarks: 78,
        percentage: 78,
        grade: "B+",
        gradePoint: 3.25,
        status: "PUBLISHED",
    },
    {
        id: "RES-004",
        studentId: "STU-2026-CSE-0004",
        studentName: "Sadia Islam",
        courseCode: "CSE-101",
        courseName: "Introduction to Programming",
        semester: "Fall 2026",
        instructor: "Mr. Hasan",
        totalMarks: 100,
        obtainedMarks: 65,
        percentage: 65,
        grade: "B",
        gradePoint: 3.0,
        status: "PUBLISHED",
    },
    {
        id: "RES-005",
        studentId: "STU-2026-CSE-0005",
        studentName: "Imran Hossain",
        courseCode: "CSE-201",
        courseName: "Data Structures & Algorithms",
        semester: "Fall 2026",
        instructor: "Dr. Rahman",
        totalMarks: 100,
        obtainedMarks: 48,
        percentage: 48,
        grade: "C",
        gradePoint: 2.0,
        status: "UNDER_REVIEW",
    },
    {
        id: "RES-006",
        studentId: "STU-2026-CSE-0006",
        studentName: "Fatema Akter",
        courseCode: "CSE-301",
        courseName: "Database Management Systems",
        semester: "Fall 2026",
        instructor: "Prof. Karim",
        totalMarks: 100,
        obtainedMarks: 0,
        percentage: 0,
        grade: "—",
        gradePoint: 0,
        status: "PENDING",
    },
    {
        id: "RES-007",
        studentId: "STU-2026-CSE-0007",
        studentName: "Sabbir Rahman",
        courseCode: "CSE-401",
        courseName: "Computer Networks",
        semester: "Spring 2026",
        instructor: "Dr. Ahmed",
        totalMarks: 100,
        obtainedMarks: 88,
        percentage: 88,
        grade: "A",
        gradePoint: 3.75,
        status: "PUBLISHED",
    },
    {
        id: "RES-008",
        studentId: "STU-2026-CSE-0008",
        studentName: "Mim Chowdhury",
        courseCode: "CSE-402",
        courseName: "Software Engineering",
        semester: "Spring 2026",
        instructor: "Dr. Rahman",
        totalMarks: 100,
        obtainedMarks: 0,
        percentage: 0,
        grade: "—",
        gradePoint: 0,
        status: "DRAFT",
    },
    {
        id: "RES-009",
        studentId: "STU-2026-CSE-0009",
        studentName: "Arif Hossain",
        courseCode: "CSE-101",
        courseName: "Introduction to Programming",
        semester: "Fall 2026",
        instructor: "Mr. Hasan",
        totalMarks: 100,
        obtainedMarks: 55,
        percentage: 55,
        grade: "B-",
        gradePoint: 2.75,
        status: "PUBLISHED",
    },
];

const statusConfig: Record<
    ResultStatus,
    { label: string; className: string }
> = {
    PUBLISHED: {
        label: "Published",
        className: "border-green-500/20 bg-green-500/10 text-green-600",
    },
    PENDING: {
        label: "Pending",
        className: "border-amber-500/20 bg-amber-500/10 text-amber-600",
    },
    DRAFT: {
        label: "Draft",
        className: "border-border bg-muted text-muted-foreground",
    },
    UNDER_REVIEW: {
        label: "Under Review",
        className: "border-blue-500/20 bg-blue-500/10 text-blue-600",
    },
};

function StatusBadge({ status }: { status: ResultStatus }) {
    return (
        <Badge variant="outline" className={statusConfig[status].className}>
            {statusConfig[status].label}
        </Badge>
    );
}

function getGradeColor(grade: string) {
    if (grade === "A+" || grade === "A") {
        return "text-green-600";
    }

    if (grade === "A-" || grade === "B+" || grade === "B") {
        return "text-blue-600";
    }

    if (grade === "B-" || grade === "C") {
        return "text-amber-600";
    }

    if (grade === "F") {
        return "text-red-600";
    }

    return "text-muted-foreground";
}

function StatCard({
    title,
    value,
    description,
    icon: Icon,
}: {
    title: string;
    value: string | number;
    description: string;
    icon: React.ElementType;
}) {
    return (
        <Card className="shadow-none">
            <CardContent className="p-5">
                <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                        <p className="text-sm text-muted-foreground">{title}</p>
                        <h3 className="mt-2 text-2xl font-bold tracking-tight">{value}</h3>
                        <p className="mt-1 text-xs text-muted-foreground">
                            {description}
                        </p>
                    </div>
                    <div className="rounded-xl bg-primary/10 p-3 text-primary">
                        <Icon className="h-5 w-5" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default function ResultsPage() {
    const [results] = useState(initialResults);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [semesterFilter, setSemesterFilter] = useState("ALL");
    const [courseFilter, setCourseFilter] = useState("ALL");

    const filteredResults = useMemo(() => {
        return results.filter((result) => {
            const searchMatch = [
                result.studentName,
                result.studentId,
                result.courseCode,
                result.courseName,
                result.instructor,
            ]
                .join(" ")
                .toLowerCase()
                .includes(search.toLowerCase());

            const statusMatch =
                statusFilter === "ALL" || result.status === statusFilter;

            const semesterMatch =
                semesterFilter === "ALL" || result.semester === semesterFilter;

            const courseMatch =
                courseFilter === "ALL" || result.courseCode === courseFilter;

            return searchMatch && statusMatch && semesterMatch && courseMatch;
        });
    }, [results, search, statusFilter, semesterFilter, courseFilter]);

    const publishedResults = results.filter(
        (result) => result.status === "PUBLISHED",
    );

    const averagePercentage =
        publishedResults.length > 0
            ? publishedResults.reduce(
                (sum, result) => sum + result.percentage,
                0,
            ) / publishedResults.length
            : 0;

    const averageGPA =
        publishedResults.length > 0
            ? publishedResults.reduce(
                (sum, result) => sum + result.gradePoint,
                0,
            ) / publishedResults.length
            : 0;

    const stats = {
        total: results.length,
        published: publishedResults.length,
        pending: results.filter(
            (result) =>
                result.status === "PENDING" ||
                result.status === "UNDER_REVIEW",
        ).length,
        draft: results.filter((result) => result.status === "DRAFT").length,
    };

    const gradeDistribution = [
        { grade: "A+", count: publishedResults.filter((r) => r.grade === "A+").length },
        { grade: "A", count: publishedResults.filter((r) => r.grade === "A").length },
        { grade: "A-", count: publishedResults.filter((r) => r.grade === "A-").length },
        { grade: "B+", count: publishedResults.filter((r) => r.grade === "B+").length },
        { grade: "B", count: publishedResults.filter((r) => r.grade === "B").length },
        { grade: "B-", count: publishedResults.filter((r) => r.grade === "B-").length },
        { grade: "C", count: publishedResults.filter((r) => r.grade === "C").length },
        { grade: "F", count: publishedResults.filter((r) => r.grade === "F").length },
    ];

    const exportCSV = () => {
        const headers = [
            "Result ID",
            "Student Name",
            "Student ID",
            "Course Code",
            "Course Name",
            "Semester",
            "Instructor",
            "Total Marks",
            "Obtained Marks",
            "Percentage",
            "Grade",
            "Grade Point",
            "Status",
        ];

        const rows = filteredResults.map((result) => [
            result.id,
            result.studentName,
            result.studentId,
            result.courseCode,
            result.courseName,
            result.semester,
            result.instructor,
            result.totalMarks,
            result.obtainedMarks,
            result.percentage,
            result.grade,
            result.gradePoint,
            result.status,
        ]);

        const csv = [headers, ...rows]
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
        const link = document.createElement("a");

        link.href = url;
        link.download = "campusflow-results.csv";
        link.click();

        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-6 p-4 md:p-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        <Link
                            href="/department-head"
                            className="transition-colors hover:text-primary"
                        >
                            Dashboard
                        </Link>
                        <span>/</span>
                        <Link
                            href="/department-head/academics"
                            className="transition-colors hover:text-primary"
                        >
                            Academics
                        </Link>
                        <span>/</span>
                        <span className="text-foreground">Results & Grades</span>
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                        Results & Grades
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Review student performance, manage grades, and publish examination
                        results.
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    <Button variant="outline" onClick={exportCSV}>
                        <Download className="mr-2 h-4 w-4" />
                        Export Results
                    </Button>

                    <Button render={<Link href="/department-head/academics/results/entry">
                        <Plus className="mr-2 h-4 w-4" />
                        Enter Grades
                    </Link>}>

                    </Button>
                </div>
            </div>

            {/* Statistics */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    title="Total Results"
                    value={stats.total}
                    description="Student course results"
                    icon={FileText}
                />
                <StatCard
                    title="Published Results"
                    value={stats.published}
                    description="Available to students"
                    icon={CheckCircle2}
                />
                <StatCard
                    title="Pending Review"
                    value={stats.pending}
                    description="Awaiting review or approval"
                    icon={Clock3}
                />
                <StatCard
                    title="Draft Results"
                    value={stats.draft}
                    description="Not yet published"
                    icon={AlertCircle}
                />
            </div>

            {/* Performance Overview */}
            <div className="grid gap-4 lg:grid-cols-3">
                <Card className="shadow-none lg:col-span-2">
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-base">
                            <BarChart3 className="h-4 w-4 text-primary" />
                            Academic Performance
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Overview based on published student results.
                        </p>
                    </CardHeader>

                    <CardContent>
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div className="rounded-lg border p-4">
                                <p className="text-sm text-muted-foreground">
                                    Average Percentage
                                </p>
                                <div className="mt-2 flex items-end gap-2">
                                    <span className="text-3xl font-bold">
                                        {averagePercentage.toFixed(1)}%
                                    </span>
                                    <TrendingUp className="mb-1 h-4 w-4 text-green-600" />
                                </div>
                                <Progress
                                    value={averagePercentage}
                                    className="mt-4 h-2"
                                />
                            </div>

                            <div className="rounded-lg border p-4">
                                <p className="text-sm text-muted-foreground">
                                    Average GPA
                                </p>
                                <div className="mt-2 flex items-end gap-2">
                                    <span className="text-3xl font-bold">
                                        {averageGPA.toFixed(2)}
                                    </span>
                                    <span className="mb-1 text-xs text-muted-foreground">
                                        / 4.00
                                    </span>
                                </div>
                                <Progress
                                    value={(averageGPA / 4) * 100}
                                    className="mt-4 h-2"
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-sm font-semibold">Grade Distribution</h3>
                                <span className="text-xs text-muted-foreground">
                                    Published results
                                </span>
                            </div>

                            <div className="space-y-3">
                                {gradeDistribution.map((item) => {
                                    const percentage =
                                        publishedResults.length > 0
                                            ? (item.count / publishedResults.length) * 100
                                            : 0;

                                    return (
                                        <div
                                            key={item.grade}
                                            className="grid grid-cols-[35px_1fr_30px] items-center gap-3"
                                        >
                                            <span className="text-sm font-medium">
                                                {item.grade}
                                            </span>
                                            <div className="h-2 overflow-hidden rounded-full bg-muted">
                                                <div
                                                    className="h-full rounded-full bg-primary transition-all"
                                                    style={{ width: `${percentage}%` }}
                                                />
                                            </div>
                                            <span className="text-right text-xs text-muted-foreground">
                                                {item.count}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-none">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base">Quick Actions</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-2">
                        <Button
                            variant="outline"
                            className="w-full justify-start"
                            render={<Link href="/department-head/academics/results/entry">
                                <Plus className="mr-2 h-4 w-4" />
                                Enter Student Grades
                            </Link>}
                        >

                        </Button>

                        <Button
                            variant="outline"
                            className="w-full justify-start"
                            render={<Link href="/department-head/academics/results/approval">
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                Review & Approve Results
                            </Link>}
                        >

                        </Button>

                        <Button
                            variant="outline"
                            className="w-full justify-start"
                            render={<Link href="/department-head/academics/results/reports">
                                <BarChart3 className="mr-2 h-4 w-4" />
                                Academic Reports
                            </Link>}
                        >

                        </Button>

                        <Button
                            variant="outline"
                            className="w-full justify-start"
                            render={<Link href="/department-head/academics/examinations">
                                <GraduationCap className="mr-2 h-4 w-4" />
                                Examination Schedule
                            </Link>}
                        >

                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <Card className="shadow-none">
                <CardContent className="p-4">
                    <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search student, ID, course, or instructor..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-9"
                            />
                        </div>

                        <div className="grid gap-3 sm:grid-cols-3 xl:w-auto">
                            <Select
                                value={semesterFilter}
                                onValueChange={(value) => setSemesterFilter(value as string | "ALL")}
                            >
                                <SelectTrigger className="w-full sm:w-[145px]">
                                    <SelectValue placeholder="Semester" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ALL">All Semesters</SelectItem>
                                    <SelectItem value="Spring 2026">Spring 2026</SelectItem>
                                    <SelectItem value="Fall 2026">Fall 2026</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={courseFilter} onValueChange={(value) => setCourseFilter(value as string | "ALL")}>
                                <SelectTrigger className="w-full sm:w-[145px]">
                                    <SelectValue placeholder="Course" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ALL">All Courses</SelectItem>
                                    <SelectItem value="CSE-101">CSE-101</SelectItem>
                                    <SelectItem value="CSE-201">CSE-201</SelectItem>
                                    <SelectItem value="CSE-301">CSE-301</SelectItem>
                                    <SelectItem value="CSE-401">CSE-401</SelectItem>
                                    <SelectItem value="CSE-402">CSE-402</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as ResultStatus | "ALL")}>
                                <SelectTrigger className="w-full sm:w-[145px]">
                                    <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ALL">All Status</SelectItem>
                                    <SelectItem value="PUBLISHED">Published</SelectItem>
                                    <SelectItem value="PENDING">Pending</SelectItem>
                                    <SelectItem value="UNDER_REVIEW">Under Review</SelectItem>
                                    <SelectItem value="DRAFT">Draft</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                            Showing {filteredResults.length} of {results.length} results
                        </span>

                        {(search ||
                            semesterFilter !== "ALL" ||
                            courseFilter !== "ALL" ||
                            statusFilter !== "ALL") && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 px-2"
                                    onClick={() => {
                                        setSearch("");
                                        setSemesterFilter("ALL");
                                        setCourseFilter("ALL");
                                        setStatusFilter("ALL");
                                    }}
                                >
                                    <XCircle className="mr-1 h-3.5 w-3.5" />
                                    Clear filters
                                </Button>
                            )}
                    </div>
                </CardContent>
            </Card>

            {/* Desktop Table */}
            <Card className="hidden shadow-none md:block">
                <CardHeader>
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <CardTitle className="text-base">Student Results</CardTitle>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Course-wise academic performance and grade records.
                            </p>
                        </div>
                        <Badge variant="secondary">
                            {filteredResults.length} Records
                        </Badge>
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b text-left text-muted-foreground">
                                    <th className="px-3 py-3 font-medium">Student</th>
                                    <th className="px-3 py-3 font-medium">Course</th>
                                    <th className="px-3 py-3 font-medium">Marks</th>
                                    <th className="px-3 py-3 font-medium">Percentage</th>
                                    <th className="px-3 py-3 font-medium">Grade</th>
                                    <th className="px-3 py-3 font-medium">GPA</th>
                                    <th className="px-3 py-3 font-medium">Status</th>
                                    <th className="px-3 py-3 text-right font-medium">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredResults.map((result) => (
                                    <tr
                                        key={result.id}
                                        className="border-b last:border-0 transition-colors hover:bg-muted/40"
                                    >
                                        <td className="px-3 py-4">
                                            <p className="font-medium">{result.studentName}</p>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {result.studentId}
                                            </p>
                                        </td>

                                        <td className="px-3 py-4">
                                            <p className="font-medium">{result.courseCode}</p>
                                            <p className="mt-1 max-w-[180px] truncate text-xs text-muted-foreground">
                                                {result.courseName}
                                            </p>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {result.semester}
                                            </p>
                                        </td>

                                        <td className="px-3 py-4 tabular-nums">
                                            {result.obtainedMarks}/{result.totalMarks}
                                        </td>

                                        <td className="px-3 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="w-10 tabular-nums">
                                                    {result.percentage}%
                                                </span>
                                                <div className="h-1.5 w-14 overflow-hidden rounded-full bg-muted">
                                                    <div
                                                        className="h-full rounded-full bg-primary"
                                                        style={{
                                                            width: `${result.percentage}%`,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-3 py-4">
                                            <span
                                                className={`font-bold ${getGradeColor(result.grade)}`}
                                            >
                                                {result.grade}
                                            </span>
                                        </td>

                                        <td className="px-3 py-4 tabular-nums">
                                            {result.status === "PUBLISHED"
                                                ? result.gradePoint.toFixed(2)
                                                : "—"}
                                        </td>

                                        <td className="px-3 py-4">
                                            <StatusBadge status={result.status} />
                                        </td>

                                        <td className="px-3 py-4 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger render={<Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>}>

                                                </DropdownMenuTrigger>

                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem render={<Link
                                                        href={`/department-head/academics/results/${result.id}`}
                                                    >
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        View Result
                                                    </Link>}>

                                                    </DropdownMenuItem>

                                                    <DropdownMenuItem render={<Link
                                                        href={`/department-head/academics/results/${result.id}/edit`}
                                                    >
                                                        <Pencil className="mr-2 h-4 w-4" />
                                                        Edit Grade
                                                    </Link>}>

                                                    </DropdownMenuItem>

                                                    <DropdownMenuItem render={<Link
                                                        href={`/department-head/department/students/${result.studentId}`}
                                                    >
                                                        <Users className="mr-2 h-4 w-4" />
                                                        Student Profile
                                                    </Link>}>

                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {filteredResults.length === 0 && (
                            <div className="py-12 text-center">
                                <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground" />
                                <p className="mt-3 font-medium">No results found</p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Try changing your search or filter criteria.
                                </p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Mobile Cards */}
            <div className="space-y-3 md:hidden">
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold">Student Results</h2>
                    <Badge variant="secondary">
                        {filteredResults.length} Records
                    </Badge>
                </div>

                {filteredResults.map((result) => (
                    <Card key={result.id} className="shadow-none">
                        <CardContent className="space-y-3 p-4">
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <p className="font-semibold">{result.studentName}</p>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {result.studentId}
                                    </p>
                                </div>
                                <StatusBadge status={result.status} />
                            </div>

                            <div className="rounded-lg bg-muted/50 p-3">
                                <p className="font-medium">{result.courseCode}</p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    {result.courseName}
                                </p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    {result.semester}
                                </p>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <div>
                                    <p className="text-xs text-muted-foreground">Marks</p>
                                    <p className="mt-1 font-semibold tabular-nums">
                                        {result.obtainedMarks}/{result.totalMarks}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-muted-foreground">Grade</p>
                                    <p
                                        className={`mt-1 font-bold ${getGradeColor(result.grade)}`}
                                    >
                                        {result.grade}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-muted-foreground">GPA</p>
                                    <p className="mt-1 font-semibold">
                                        {result.status === "PUBLISHED"
                                            ? result.gradePoint.toFixed(2)
                                            : "—"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between border-t pt-3">
                                <p className="text-xs text-muted-foreground">
                                    {result.instructor}
                                </p>

                                <Button size="sm" variant="outline" render={
                                    <Link
                                        href={`/department-head/academics/results/${result.id}`}
                                    >
                                        <Eye className="mr-1.5 h-3.5 w-3.5" />
                                        View
                                    </Link>
                                }>

                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {filteredResults.length === 0 && (
                    <Card className="shadow-none">
                        <CardContent className="py-10 text-center">
                            <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground" />
                            <p className="mt-3 font-medium">No results found</p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Try changing your filters.
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
