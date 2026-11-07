// import React from 'react'

// export default function Attendance() {
//     return (
//         <div>Attendance</div>
//     )
// }


















"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
    ArrowDownToLine,
    ArrowRight,
    CalendarDays,
    CheckCircle2,
    Clock3,
    Download,
    GraduationCap,
    Search,
    Users,
    UserCheck,
    UserX,
    AlertCircle,
    BookOpen,
    MoreHorizontal,
    Eye,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type AttendanceStatus = "PRESENT" | "ABSENT" | "LATE" | "EXCUSED";

type AttendanceRecord = {
    id: string;
    studentId: string;
    studentName: string;
    email: string;
    courseCode: string;
    courseName: string;
    program: string;
    semester: string;
    date: string;
    instructor: string;
    status: AttendanceStatus;
};

const attendanceData: AttendanceRecord[] = [
    {
        id: "1",
        studentId: "STU-2026-CSE-0001",
        studentName: "Tanvir Ahmed",
        email: "tanvir@example.com",
        courseCode: "CSE-101",
        courseName: "Introduction to Computer Science",
        program: "BSc in Computer Science",
        semester: "Fall 2026",
        date: "2026-11-07",
        instructor: "Dr. Rahman",
        status: "PRESENT",
    },
    {
        id: "2",
        studentId: "STU-2026-CSE-0002",
        studentName: "Nusrat Jahan",
        email: "nusrat@example.com",
        courseCode: "CSE-101",
        courseName: "Introduction to Computer Science",
        program: "BSc in Computer Science",
        semester: "Fall 2026",
        date: "2026-11-07",
        instructor: "Dr. Rahman",
        status: "PRESENT",
    },
    {
        id: "3",
        studentId: "STU-2026-CSE-0003",
        studentName: "Sabbir Hossain",
        email: "sabbir@example.com",
        courseCode: "CSE-201",
        courseName: "Data Structures & Algorithms",
        program: "BSc in Computer Science",
        semester: "Fall 2026",
        date: "2026-11-07",
        instructor: "Md. Hasan",
        status: "ABSENT",
    },
    {
        id: "4",
        studentId: "STU-2026-CSE-0004",
        studentName: "Maliha Islam",
        email: "maliha@example.com",
        courseCode: "CSE-201",
        courseName: "Data Structures & Algorithms",
        program: "BSc in Computer Science",
        semester: "Fall 2026",
        date: "2026-11-07",
        instructor: "Md. Hasan",
        status: "LATE",
    },
    {
        id: "5",
        studentId: "STU-2026-CSE-0005",
        studentName: "Rakib Hasan",
        email: "rakib@example.com",
        courseCode: "CSE-301",
        courseName: "Database Management Systems",
        program: "BSc in Computer Science",
        semester: "Fall 2026",
        date: "2026-11-07",
        instructor: "Nusrat Jahan",
        status: "PRESENT",
    },
    {
        id: "6",
        studentId: "STU-2026-SWE-0001",
        studentName: "Farhan Kabir",
        email: "farhan@example.com",
        courseCode: "SWE-201",
        courseName: "Web Application Development",
        program: "BSc in Software Engineering",
        semester: "Fall 2026",
        date: "2026-11-07",
        instructor: "Ayesha Akter",
        status: "EXCUSED",
    },
    {
        id: "7",
        studentId: "STU-2026-SWE-0002",
        studentName: "Sadia Akter",
        email: "sadia@example.com",
        courseCode: "SWE-201",
        courseName: "Web Application Development",
        program: "BSc in Software Engineering",
        semester: "Fall 2026",
        date: "2026-11-07",
        instructor: "Ayesha Akter",
        status: "PRESENT",
    },
    {
        id: "8",
        studentId: "STU-2026-CSE-0006",
        studentName: "Mehedi Hasan",
        email: "mehedi@example.com",
        courseCode: "CSE-101",
        courseName: "Introduction to Computer Science",
        program: "BSc in Computer Science",
        semester: "Fall 2026",
        date: "2026-11-07",
        instructor: "Dr. Rahman",
        status: "ABSENT",
    },
    {
        id: "9",
        studentId: "STU-2026-CSE-0007",
        studentName: "Samiha Rahman",
        email: "samiha@example.com",
        courseCode: "CSE-301",
        courseName: "Database Management Systems",
        program: "BSc in Computer Science",
        semester: "Fall 2026",
        date: "2026-11-06",
        instructor: "Nusrat Jahan",
        status: "PRESENT",
    },
    {
        id: "10",
        studentId: "STU-2026-SWE-0003",
        studentName: "Arif Chowdhury",
        email: "arif@example.com",
        courseCode: "SWE-201",
        courseName: "Web Application Development",
        program: "BSc in Software Engineering",
        semester: "Fall 2026",
        date: "2026-11-06",
        instructor: "Ayesha Akter",
        status: "LATE",
    },
    {
        id: "11",
        studentId: "STU-2026-CSE-0008",
        studentName: "Jannatul Ferdous",
        email: "jannatul@example.com",
        courseCode: "CSE-201",
        courseName: "Data Structures & Algorithms",
        program: "BSc in Computer Science",
        semester: "Fall 2026",
        date: "2026-11-06",
        instructor: "Md. Hasan",
        status: "PRESENT",
    },
    {
        id: "12",
        studentId: "STU-2026-CSE-0009",
        studentName: "Rifat Islam",
        email: "rifat@example.com",
        courseCode: "CSE-101",
        courseName: "Introduction to Computer Science",
        program: "BSc in Computer Science",
        semester: "Fall 2026",
        date: "2026-11-06",
        instructor: "Dr. Rahman",
        status: "ABSENT",
    },
];

const statusStyles: Record<AttendanceStatus, string> = {
    PRESENT:
        "bg-emerald-500/10 text-emerald-700 border-emerald-500/20 dark:text-emerald-400",
    ABSENT:
        "bg-red-500/10 text-red-700 border-red-500/20 dark:text-red-400",
    LATE:
        "bg-amber-500/10 text-amber-700 border-amber-500/20 dark:text-amber-400",
    EXCUSED:
        "bg-blue-500/10 text-blue-700 border-blue-500/20 dark:text-blue-400",
};

function formatDate(date: string) {
    return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

export default function AttendancePage() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [courseFilter, setCourseFilter] = useState("ALL");
    const [programFilter, setProgramFilter] = useState("ALL");
    const [semesterFilter, setSemesterFilter] = useState("ALL");
    const [dateFilter, setDateFilter] = useState("ALL");

    const courses = [
        ...new Map(
            attendanceData.map((record) => [
                record.courseCode,
                {
                    code: record.courseCode,
                    name: record.courseName,
                },
            ]),
        ).values(),
    ];

    const programs = [
        ...new Set(attendanceData.map((record) => record.program)),
    ];

    const semesters = [
        ...new Set(attendanceData.map((record) => record.semester)),
    ];

    const dates = [
        ...new Set(attendanceData.map((record) => record.date)),
    ].sort((a, b) => b.localeCompare(a));

    const filteredRecords = useMemo(() => {
        const searchValue = search.toLowerCase();

        return attendanceData.filter((record) => {
            const matchesSearch =
                record.studentName.toLowerCase().includes(searchValue) ||
                record.studentId.toLowerCase().includes(searchValue) ||
                record.courseCode.toLowerCase().includes(searchValue) ||
                record.courseName.toLowerCase().includes(searchValue) ||
                record.instructor.toLowerCase().includes(searchValue);

            const matchesStatus =
                statusFilter === "ALL" || record.status === statusFilter;

            const matchesCourse =
                courseFilter === "ALL" || record.courseCode === courseFilter;

            const matchesProgram =
                programFilter === "ALL" || record.program === programFilter;

            const matchesSemester =
                semesterFilter === "ALL" ||
                record.semester === semesterFilter;

            const matchesDate =
                dateFilter === "ALL" || record.date === dateFilter;

            return (
                matchesSearch &&
                matchesStatus &&
                matchesCourse &&
                matchesProgram &&
                matchesSemester &&
                matchesDate
            );
        });
    }, [
        search,
        statusFilter,
        courseFilter,
        programFilter,
        semesterFilter,
        dateFilter,
    ]);

    const totalRecords = filteredRecords.length;

    const presentCount = filteredRecords.filter(
        (record) => record.status === "PRESENT",
    ).length;

    const absentCount = filteredRecords.filter(
        (record) => record.status === "ABSENT",
    ).length;

    const lateCount = filteredRecords.filter(
        (record) => record.status === "LATE",
    ).length;

    const excusedCount = filteredRecords.filter(
        (record) => record.status === "EXCUSED",
    ).length;

    const attendanceRate =
        totalRecords > 0
            ? Math.round(
                ((presentCount + lateCount) / totalRecords) * 100,
            )
            : 0;

    const clearFilters = () => {
        setSearch("");
        setStatusFilter("ALL");
        setCourseFilter("ALL");
        setProgramFilter("ALL");
        setSemesterFilter("ALL");
        setDateFilter("ALL");
    };

    const exportCSV = () => {
        const headers = [
            "Student ID",
            "Student Name",
            "Email",
            "Course Code",
            "Course Name",
            "Program",
            "Semester",
            "Date",
            "Instructor",
            "Status",
        ];

        const rows = filteredRecords.map((record) => [
            record.studentId,
            record.studentName,
            record.email,
            record.courseCode,
            record.courseName,
            record.program,
            record.semester,
            record.date,
            record.instructor,
            record.status,
        ]);

        const csv = [headers, ...rows]
            .map((row) =>
                row
                    .map((value) => `"${String(value).replace(/"/g, '""')}"`)
                    .join(","),
            )
            .join("\n");

        const blob = new Blob([csv], {
            type: "text/csv;charset=utf-8;",
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = "department-attendance.csv";
        link.click();

        URL.revokeObjectURL(url);
    };

    const hasActiveFilters =
        search !== "" ||
        statusFilter !== "ALL" ||
        courseFilter !== "ALL" ||
        programFilter !== "ALL" ||
        semesterFilter !== "ALL" ||
        dateFilter !== "ALL";

    return (
        <div className="space-y-6 pb-10 p-4">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        <Link
                            href="/department-head"
                            className="hover:text-primary"
                        >
                            Department Head
                        </Link>
                        <span>/</span>
                        <Link
                            href="/department-head/academics"
                            className="hover:text-primary"
                        >
                            Academics
                        </Link>
                        <span>/</span>
                        <span className="text-foreground">Attendance</span>
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Attendance Management
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        Monitor student attendance, identify absences, and review
                        course-wise attendance records.
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    <Button
                        variant="outline"
                        onClick={exportCSV}
                        className="gap-2"
                    >
                        <ArrowDownToLine className="h-4 w-4" />
                        Export CSV
                    </Button>

                    <Button className="gap-2"
                        render={
                            <Link href="/department-head/academics/attendance/reports">
                                <Download className="h-4 w-4" />
                                Attendance Reports
                            </Link>
                        }
                    >

                    </Button>
                </div>
            </div>

            {/* Statistics */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <Card>
                    <CardContent className="flex items-center justify-between p-5">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Attendance Rate
                            </p>
                            <p className="mt-2 text-2xl font-bold">
                                {attendanceRate}%
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Present + late records
                            </p>
                        </div>
                        <div className="rounded-xl bg-blue-500/10 p-3 text-blue-600 dark:text-blue-400">
                            <CalendarDays className="h-6 w-6" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center justify-between p-5">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Present Students
                            </p>
                            <p className="mt-2 text-2xl font-bold">
                                {presentCount}
                            </p>
                            <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
                                {totalRecords > 0
                                    ? `${Math.round((presentCount / totalRecords) * 100)}% of records`
                                    : "No records"}
                            </p>
                        </div>
                        <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-600 dark:text-emerald-400">
                            <UserCheck className="h-6 w-6" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center justify-between p-5">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Absent Students
                            </p>
                            <p className="mt-2 text-2xl font-bold">
                                {absentCount}
                            </p>
                            <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                                {totalRecords > 0
                                    ? `${Math.round((absentCount / totalRecords) * 100)}% of records`
                                    : "No records"}
                            </p>
                        </div>
                        <div className="rounded-xl bg-red-500/10 p-3 text-red-600 dark:text-red-400">
                            <UserX className="h-6 w-6" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center justify-between p-5">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Late Arrivals
                            </p>
                            <p className="mt-2 text-2xl font-bold">{lateCount}</p>
                            <p className="mt-1 text-xs text-amber-600 dark:text-amber-400">
                                {excusedCount} excused records
                            </p>
                        </div>
                        <div className="rounded-xl bg-amber-500/10 p-3 text-amber-600 dark:text-amber-400">
                            <Clock3 className="h-6 w-6" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Attendance overview */}
            <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">
                            Attendance Overview
                        </CardTitle>
                        <CardDescription>
                            Distribution of filtered attendance records
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-5">
                        <div className="flex h-3 overflow-hidden rounded-full bg-muted">
                            {totalRecords > 0 && (
                                <>
                                    <div
                                        className="bg-emerald-500 transition-all"
                                        style={{
                                            width: `${(presentCount / totalRecords) * 100}%`,
                                        }}
                                    />
                                    <div
                                        className="bg-red-500 transition-all"
                                        style={{
                                            width: `${(absentCount / totalRecords) * 100}%`,
                                        }}
                                    />
                                    <div
                                        className="bg-amber-500 transition-all"
                                        style={{
                                            width: `${(lateCount / totalRecords) * 100}%`,
                                        }}
                                    />
                                    <div
                                        className="bg-blue-500 transition-all"
                                        style={{
                                            width: `${(excusedCount / totalRecords) * 100}%`,
                                        }}
                                    />
                                </>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                            {[
                                {
                                    label: "Present",
                                    value: presentCount,
                                    color: "bg-emerald-500",
                                },
                                {
                                    label: "Absent",
                                    value: absentCount,
                                    color: "bg-red-500",
                                },
                                {
                                    label: "Late",
                                    value: lateCount,
                                    color: "bg-amber-500",
                                },
                                {
                                    label: "Excused",
                                    value: excusedCount,
                                    color: "bg-blue-500",
                                },
                            ].map((item) => (
                                <div key={item.label} className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`h-2.5 w-2.5 rounded-full ${item.color}`}
                                        />
                                        <span className="text-xs text-muted-foreground">
                                            {item.label}
                                        </span>
                                    </div>
                                    <p className="text-xl font-bold">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">
                            Attendance Insights
                        </CardTitle>
                        <CardDescription>
                            Quick summary of the selected records
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-600 dark:text-emerald-400">
                                <CheckCircle2 className="h-4 w-4" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">
                                    Present records
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {presentCount} students marked present.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="rounded-lg bg-red-500/10 p-2 text-red-600 dark:text-red-400">
                                <AlertCircle className="h-4 w-4" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">
                                    Absence records
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {absentCount} students marked absent.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="rounded-lg bg-amber-500/10 p-2 text-amber-600 dark:text-amber-400">
                                <Clock3 className="h-4 w-4" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">
                                    Late arrivals
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {lateCount} students arrived late.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="space-y-4 p-4">
                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                        <div className="relative sm:col-span-2 xl:col-span-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Search student or course..."
                                className="pl-9"
                            />
                        </div>

                        <Select
                            value={dateFilter}
                            onValueChange={(value) => setDateFilter(value ?? "ALL")}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Date" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All Dates</SelectItem>
                                {dates.map((date) => (
                                    <SelectItem key={date} value={date}>
                                        {formatDate(date)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select
                            value={courseFilter}
                            onValueChange={(value) => setCourseFilter(value ?? "ALL")}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Course" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All Courses</SelectItem>
                                {courses.map((course) => (
                                    <SelectItem key={course.code} value={course.code}>
                                        {course.code}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select
                            value={programFilter}
                            onValueChange={(value) => setProgramFilter(value ?? "ALL")}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Program" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All Programs</SelectItem>
                                {programs.map((program) => (
                                    <SelectItem key={program} value={program}>
                                        {program}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select
                            value={statusFilter}
                            onValueChange={(value) => setStatusFilter(value ?? "ALL")}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All Statuses</SelectItem>
                                <SelectItem value="PRESENT">Present</SelectItem>
                                <SelectItem value="ABSENT">Absent</SelectItem>
                                <SelectItem value="LATE">Late</SelectItem>
                                <SelectItem value="EXCUSED">Excused</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-sm text-muted-foreground">
                            Showing{" "}
                            <span className="font-semibold text-foreground">
                                {filteredRecords.length}
                            </span>{" "}
                            of {attendanceData.length} attendance records
                        </p>

                        {hasActiveFilters && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={clearFilters}
                            >
                                Clear filters
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Attendance table */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-3">
                    <div>
                        <CardTitle>Attendance Records</CardTitle>
                        <CardDescription>
                            Student attendance across department courses
                        </CardDescription>
                    </div>
                    <Badge variant="secondary">
                        {filteredRecords.length} Records
                    </Badge>
                </CardHeader>

                <CardContent>
                    {filteredRecords.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-14 text-center">
                            <div className="rounded-full bg-muted p-4">
                                <CalendarDays className="h-7 w-7 text-muted-foreground" />
                            </div>
                            <h3 className="mt-4 font-semibold">
                                No attendance records found
                            </h3>
                            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                                Try adjusting your filters or search for another student.
                            </p>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={clearFilters}
                                className="mt-4"
                            >
                                Clear filters
                            </Button>
                        </div>
                    ) : (
                        <>
                            {/* Desktop table */}
                            <div className="hidden overflow-hidden rounded-lg border md:block">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead className="bg-muted/50">
                                            <tr className="border-b text-left text-muted-foreground">
                                                <th className="px-4 py-3 font-medium">Student</th>
                                                <th className="px-4 py-3 font-medium">Course</th>
                                                <th className="px-4 py-3 font-medium">Program</th>
                                                <th className="px-4 py-3 font-medium">Date</th>
                                                <th className="px-4 py-3 font-medium">Instructor</th>
                                                <th className="px-4 py-3 font-medium">Status</th>
                                                <th className="px-4 py-3 text-right font-medium">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {filteredRecords.map((record) => (
                                                <tr
                                                    key={record.id}
                                                    className="border-b last:border-0 transition-colors hover:bg-muted/30"
                                                >
                                                    <td className="px-4 py-4">
                                                        <div className="font-medium">
                                                            {record.studentName}
                                                        </div>
                                                        <div className="mt-1 text-xs text-muted-foreground">
                                                            {record.studentId}
                                                        </div>
                                                    </td>

                                                    <td className="px-4 py-4">
                                                        <p className="font-medium">
                                                            {record.courseCode}
                                                        </p>
                                                        <p className="mt-1 max-w-[190px] truncate text-xs text-muted-foreground">
                                                            {record.courseName}
                                                        </p>
                                                    </td>

                                                    <td className="max-w-[170px] px-4 py-4">
                                                        <p className="line-clamp-2 text-sm">
                                                            {record.program}
                                                        </p>
                                                    </td>

                                                    <td className="whitespace-nowrap px-4 py-4">
                                                        {formatDate(record.date)}
                                                    </td>

                                                    <td className="whitespace-nowrap px-4 py-4">
                                                        {record.instructor}
                                                    </td>

                                                    <td className="px-4 py-4">
                                                        <Badge
                                                            variant="outline"
                                                            className={statusStyles[record.status]}
                                                        >
                                                            {record.status}
                                                        </Badge>
                                                    </td>

                                                    <td className="px-4 py-4 text-right">
                                                        <Button
                                                            render={
                                                                <Link
                                                                    href={`/department-head/department/students/${record.studentId}`}
                                                                >
                                                                    <Eye className="h-4 w-4" />
                                                                </Link>
                                                            }
                                                            size="icon"
                                                            variant="ghost"
                                                            aria-label={`View ${record.studentName}`}
                                                        >

                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Mobile cards */}
                            <div className="grid gap-3 md:hidden">
                                {filteredRecords.map((record) => (
                                    <div
                                        key={record.id}
                                        className="space-y-3 rounded-xl border p-4"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <p className="font-semibold">
                                                    {record.studentName}
                                                </p>
                                                <p className="mt-1 text-xs text-muted-foreground">
                                                    {record.studentId}
                                                </p>
                                            </div>

                                            <Badge
                                                variant="outline"
                                                className={statusStyles[record.status]}
                                            >
                                                {record.status}
                                            </Badge>
                                        </div>

                                        <div className="rounded-lg bg-muted/40 p-3">
                                            <p className="text-xs font-medium">
                                                {record.courseCode}
                                            </p>
                                            <p className="mt-1 text-sm">
                                                {record.courseName}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 text-sm">
                                            <div>
                                                <p className="text-xs text-muted-foreground">
                                                    Date
                                                </p>
                                                <p className="mt-1 font-medium">
                                                    {formatDate(record.date)}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground">
                                                    Instructor
                                                </p>
                                                <p className="mt-1 font-medium">
                                                    {record.instructor}
                                                </p>
                                            </div>
                                            <div className="col-span-2">
                                                <p className="text-xs text-muted-foreground">
                                                    Program
                                                </p>
                                                <p className="mt-1 font-medium">
                                                    {record.program}
                                                </p>
                                            </div>
                                        </div>

                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full"
                                            render={
                                                <Link
                                                    href={`/department-head/department/students/${record.studentId}`}
                                                >
                                                    View Student
                                                    <ArrowRight className="ml-2 h-4 w-4" />
                                                </Link>
                                            }
                                        >

                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>

            {/* Footer note */}
            <div className="flex items-start gap-3 rounded-xl border bg-muted/20 p-4">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                <div>
                    <p className="text-sm font-medium">Attendance data note</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        Attendance statistics are calculated from the records currently
                        displayed after filtering. Present and late records are included
                        in the attendance rate; excused and absent records are excluded.
                    </p>
                </div>
            </div>
        </div>
    );
}
