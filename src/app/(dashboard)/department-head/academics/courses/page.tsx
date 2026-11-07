// import React from 'react'

// export default function courses() {
//     return (
//         <div>courses</div>
//     )
// }
















"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
    ArrowDownToLine,
    ArrowRight,
    BookOpen,
    CalendarDays,
    CheckCircle2,
    Clock3,
    GraduationCap,
    Layers3,
    MoreHorizontal,
    Plus,
    Search,
    Users,
    XCircle,
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

type CourseStatus = "ACTIVE" | "DRAFT" | "COMPLETED" | "INACTIVE";

type Course = {
    id: string;
    code: string;
    title: string;
    description: string;
    credits: number;
    program: string;
    semester: string;
    instructor: string;
    instructorInitials: string;
    enrolled: number;
    capacity: number;
    status: CourseStatus;
};

const coursesData: Course[] = [
    {
        id: "1",
        code: "CSE-101",
        title: "Introduction to Computer Science",
        description: "Fundamentals of computing, algorithms, and problem solving.",
        credits: 3,
        program: "BSc in Computer Science",
        semester: "Fall 2026",
        instructor: "Dr. Rahman",
        instructorInitials: "DR",
        enrolled: 42,
        capacity: 50,
        status: "ACTIVE",
    },
    {
        id: "2",
        code: "CSE-201",
        title: "Data Structures and Algorithms",
        description: "Core data structures, algorithm design, and complexity.",
        credits: 4,
        program: "BSc in Computer Science",
        semester: "Fall 2026",
        instructor: "Md. Hasan",
        instructorInitials: "MH",
        enrolled: 48,
        capacity: 50,
        status: "ACTIVE",
    },
    {
        id: "3",
        code: "CSE-301",
        title: "Database Management Systems",
        description: "Relational databases, SQL, normalization, and transactions.",
        credits: 3,
        program: "BSc in Computer Science",
        semester: "Fall 2026",
        instructor: "Nusrat Jahan",
        instructorInitials: "NJ",
        enrolled: 35,
        capacity: 45,
        status: "ACTIVE",
    },
    {
        id: "4",
        code: "CSE-401",
        title: "Software Engineering",
        description: "Software development lifecycle, testing, and project management.",
        credits: 3,
        program: "BSc in Software Engineering",
        semester: "Fall 2026",
        instructor: "Dr. Karim",
        instructorInitials: "DK",
        enrolled: 0,
        capacity: 40,
        status: "DRAFT",
    },
    {
        id: "5",
        code: "CSE-302",
        title: "Operating Systems",
        description: "Processes, memory management, scheduling, and file systems.",
        credits: 3,
        program: "BSc in Computer Science",
        semester: "Spring 2026",
        instructor: "Md. Hasan",
        instructorInitials: "MH",
        enrolled: 40,
        capacity: 45,
        status: "COMPLETED",
    },
    {
        id: "6",
        code: "SWE-201",
        title: "Web Application Development",
        description: "Modern frontend and backend web application development.",
        credits: 3,
        program: "BSc in Software Engineering",
        semester: "Fall 2026",
        instructor: "Ayesha Akter",
        instructorInitials: "AA",
        enrolled: 28,
        capacity: 40,
        status: "ACTIVE",
    },
    {
        id: "7",
        code: "CSE-202",
        title: "Object Oriented Programming",
        description: "Object-oriented principles, design, and implementation.",
        credits: 3,
        program: "BSc in Computer Science",
        semester: "Spring 2026",
        instructor: "Dr. Rahman",
        instructorInitials: "DR",
        enrolled: 0,
        capacity: 45,
        status: "INACTIVE",
    },
    {
        id: "8",
        code: "CSE-501",
        title: "Machine Learning Fundamentals",
        description: "Introduction to machine learning algorithms and applications.",
        credits: 3,
        program: "MSc in Computer Science",
        semester: "Fall 2026",
        instructor: "Nusrat Jahan",
        instructorInitials: "NJ",
        enrolled: 22,
        capacity: 35,
        status: "ACTIVE",
    },
];

const statusStyles: Record<CourseStatus, string> = {
    ACTIVE:
        "bg-emerald-500/10 text-emerald-700 border-emerald-500/20 dark:text-emerald-400",
    DRAFT:
        "bg-amber-500/10 text-amber-700 border-amber-500/20 dark:text-amber-400",
    COMPLETED:
        "bg-blue-500/10 text-blue-700 border-blue-500/20 dark:text-blue-400",
    INACTIVE:
        "bg-muted text-muted-foreground border-border",
};

export default function CoursesPage() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [semesterFilter, setSemesterFilter] = useState("ALL");
    const [programFilter, setProgramFilter] = useState("ALL");

    const semesters = [...new Set(coursesData.map((course) => course.semester))];
    const programs = [...new Set(coursesData.map((course) => course.program))];

    const filteredCourses = useMemo(() => {
        return coursesData.filter((course) => {
            const searchValue = search.toLowerCase();

            const matchesSearch =
                course.title.toLowerCase().includes(searchValue) ||
                course.code.toLowerCase().includes(searchValue) ||
                course.instructor.toLowerCase().includes(searchValue) ||
                course.program.toLowerCase().includes(searchValue);

            const matchesStatus =
                statusFilter === "ALL" || course.status === statusFilter;

            const matchesSemester =
                semesterFilter === "ALL" || course.semester === semesterFilter;

            const matchesProgram =
                programFilter === "ALL" || course.program === programFilter;

            return (
                matchesSearch &&
                matchesStatus &&
                matchesSemester &&
                matchesProgram
            );
        });
    }, [search, statusFilter, semesterFilter, programFilter]);

    const totalStudents = coursesData.reduce(
        (sum, course) => sum + course.enrolled,
        0,
    );

    const activeCourses = coursesData.filter(
        (course) => course.status === "ACTIVE",
    ).length;

    const totalCredits = coursesData.reduce(
        (sum, course) => sum + course.credits,
        0,
    );

    const availableSeats = coursesData.reduce(
        (sum, course) => sum + Math.max(course.capacity - course.enrolled, 0),
        0,
    );

    const exportCSV = () => {
        const headers = [
            "Course Code",
            "Course Title",
            "Program",
            "Credits",
            "Semester",
            "Instructor",
            "Enrolled Students",
            "Capacity",
            "Status",
        ];

        const rows = filteredCourses.map((course) => [
            course.code,
            course.title,
            course.program,
            course.credits,
            course.semester,
            course.instructor,
            course.enrolled,
            course.capacity,
            course.status,
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
        link.download = "department-courses.csv";
        link.click();

        URL.revokeObjectURL(url);
    };

    const clearFilters = () => {
        setSearch("");
        setStatusFilter("ALL");
        setSemesterFilter("ALL");
        setProgramFilter("ALL");
    };

    return (
        <div className="space-y-6 pb-10 px-4">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Link
                            href="/department-head"
                            className="transition-colors hover:text-primary"
                        >
                            Department Head
                        </Link>
                        <span>/</span>
                        <Link
                            href="/department-head/academics"
                            className="transition-colors hover:text-primary"
                        >
                            Academics
                        </Link>
                        <span>/</span>
                        <span className="text-foreground">Courses</span>
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Department Courses
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        Manage courses, instructors, credits, and student enrollment
                        within your department.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button
                        variant="outline"
                        onClick={exportCSV}
                        className="gap-2"
                    >
                        <ArrowDownToLine className="h-4 w-4" />
                        Export
                    </Button>

                    <Button className="gap-2" render={<Link href="/department-head/academics/courses/create">
                        <Plus className="h-4 w-4" />
                        Add Course
                    </Link>}>

                    </Button>
                </div>
            </div>

            {/* Statistics */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
                <Card>
                    <CardContent className="flex items-center justify-between p-5">
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Total Courses</p>
                            <p className="text-2xl font-bold">{coursesData.length}</p>
                            <p className="text-xs text-muted-foreground">
                                Across all semesters
                            </p>
                        </div>
                        <div className="rounded-xl bg-blue-500/10 p-3 text-blue-600 dark:text-blue-400">
                            <BookOpen className="h-6 w-6" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center justify-between p-5">
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Active Courses</p>
                            <p className="text-2xl font-bold">{activeCourses}</p>
                            <p className="text-xs text-emerald-600 dark:text-emerald-400">
                                Currently running
                            </p>
                        </div>
                        <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="h-6 w-6" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center justify-between p-5">
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Enrolled Students</p>
                            <p className="text-2xl font-bold">
                                {totalStudents.toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Across all listed courses
                            </p>
                        </div>
                        <div className="rounded-xl bg-violet-500/10 p-3 text-violet-600 dark:text-violet-400">
                            <Users className="h-6 w-6" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center justify-between p-5">
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Available Seats</p>
                            <p className="text-2xl font-bold">
                                {availableSeats.toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Remaining course capacity
                            </p>
                        </div>
                        <div className="rounded-xl bg-amber-500/10 p-3 text-amber-600 dark:text-amber-400">
                            <GraduationCap className="h-6 w-6" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="space-y-4 p-4">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Search by course name, code, instructor..."
                                className="pl-9"
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:w-auto">
                            <Select
                                value={semesterFilter}
                                onValueChange={(value) => setSemesterFilter(value ?? "ALL")}
                            >
                                <SelectTrigger className="w-full sm:w-[155px]">
                                    <SelectValue placeholder="Semester" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ALL">All Semesters</SelectItem>
                                    {semesters.map((semester) => (
                                        <SelectItem key={semester} value={semester}>
                                            {semester}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select
                                value={programFilter}
                                // onValueChange={setProgramFilter ?? "ALL" 
                                onValueChange={(value) => setProgramFilter(value ?? "ALL")}
                            >
                                <SelectTrigger className="w-full sm:w-[190px]">
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
                                <SelectTrigger className="w-full sm:w-[145px]">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ALL">All Status</SelectItem>
                                    <SelectItem value="ACTIVE">Active</SelectItem>
                                    <SelectItem value="DRAFT">Draft</SelectItem>
                                    <SelectItem value="COMPLETED">Completed</SelectItem>
                                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-sm text-muted-foreground">
                            Showing{" "}
                            <span className="font-medium text-foreground">
                                {filteredCourses.length}
                            </span>{" "}
                            of {coursesData.length} courses
                        </p>

                        {(search ||
                            statusFilter !== "ALL" ||
                            semesterFilter !== "ALL" ||
                            programFilter !== "ALL") && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={clearFilters}
                                    className="gap-2 text-muted-foreground"
                                >
                                    <XCircle className="h-4 w-4" />
                                    Clear filters
                                </Button>
                            )}
                    </div>
                </CardContent>
            </Card>

            {/* Course list */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div>
                        <CardTitle>All Courses</CardTitle>
                        <CardDescription>
                            Course catalog for your assigned department
                        </CardDescription>
                    </div>
                    <Badge variant="secondary">
                        {filteredCourses.length} Results
                    </Badge>
                </CardHeader>

                <CardContent>
                    {filteredCourses.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-14 text-center">
                            <div className="mb-3 rounded-full bg-muted p-4">
                                <BookOpen className="h-7 w-7 text-muted-foreground" />
                            </div>
                            <h3 className="font-semibold">No courses found</h3>
                            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                                Try changing your search or filters to find the course you
                                are looking for.
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
                                                <th className="px-4 py-3 font-medium">Course</th>
                                                <th className="px-4 py-3 font-medium">Program</th>
                                                <th className="px-4 py-3 font-medium">Instructor</th>
                                                <th className="px-4 py-3 font-medium">Credits</th>
                                                <th className="px-4 py-3 font-medium">Enrollment</th>
                                                <th className="px-4 py-3 font-medium">Status</th>
                                                <th className="px-4 py-3 text-right font-medium">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {filteredCourses.map((course) => {
                                                const percentage =
                                                    course.capacity > 0
                                                        ? Math.min(
                                                            (course.enrolled / course.capacity) * 100,
                                                            100,
                                                        )
                                                        : 0;

                                                return (
                                                    <tr
                                                        key={course.id}
                                                        className="border-b last:border-0 transition-colors hover:bg-muted/30"
                                                    >
                                                        <td className="px-4 py-4">
                                                            <Link
                                                                href={`/department-head/academics/courses/${course.id}`}
                                                                className="group block"
                                                            >
                                                                <p className="font-semibold transition-colors group-hover:text-primary">
                                                                    {course.title}
                                                                </p>
                                                                <p className="mt-1 text-xs text-muted-foreground">
                                                                    {course.code} · {course.semester}
                                                                </p>
                                                            </Link>
                                                        </td>

                                                        <td className="max-w-[180px] px-4 py-4">
                                                            <p className="line-clamp-2 text-sm">
                                                                {course.program}
                                                            </p>
                                                        </td>

                                                        <td className="px-4 py-4">
                                                            <div className="flex items-center gap-2">
                                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                                                                    {course.instructorInitials}
                                                                </div>
                                                                <span className="whitespace-nowrap">
                                                                    {course.instructor}
                                                                </span>
                                                            </div>
                                                        </td>

                                                        <td className="px-4 py-4">
                                                            <Badge variant="outline">
                                                                {course.credits} Credits
                                                            </Badge>
                                                        </td>

                                                        <td className="min-w-[145px] px-4 py-4">
                                                            <div className="space-y-2">
                                                                <div className="flex justify-between text-xs">
                                                                    <span className="font-medium">
                                                                        {course.enrolled}/{course.capacity}
                                                                    </span>
                                                                    <span className="text-muted-foreground">
                                                                        {Math.round(percentage)}%
                                                                    </span>
                                                                </div>
                                                                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                                                                    <div
                                                                        className="h-full rounded-full bg-primary"
                                                                        style={{ width: `${percentage}%` }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>

                                                        <td className="px-4 py-4">
                                                            <Badge
                                                                variant="outline"
                                                                className={statusStyles[course.status]}
                                                            >
                                                                {course.status}
                                                            </Badge>
                                                        </td>

                                                        <td className="px-4 py-4 text-right">
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger render={<Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    aria-label={`Actions for ${course.code}`}
                                                                >
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                </Button>} >

                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end">
                                                                    <DropdownMenuItem render={<Link
                                                                        href={`/department-head/academics/courses/${course.id}`}
                                                                    >
                                                                        View details
                                                                    </Link>}>

                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem render={<Link
                                                                        href={`/department-head/academics/courses/${course.id}/edit`}
                                                                    >
                                                                        Edit course
                                                                    </Link>}>

                                                                    </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Mobile cards */}
                            <div className="grid gap-3 md:hidden">
                                {filteredCourses.map((course) => {
                                    const percentage =
                                        course.capacity > 0
                                            ? Math.min(
                                                (course.enrolled / course.capacity) * 100,
                                                100,
                                            )
                                            : 0;

                                    return (
                                        <div
                                            key={course.id}
                                            className="space-y-4 rounded-xl border p-4"
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="min-w-0">
                                                    <p className="text-xs font-medium text-muted-foreground">
                                                        {course.code} · {course.semester}
                                                    </p>
                                                    <Link
                                                        href={`/department-head/academics/courses/${course.id}`}
                                                        className="mt-1 block font-semibold hover:text-primary"
                                                    >
                                                        {course.title}
                                                    </Link>
                                                </div>

                                                <Badge
                                                    variant="outline"
                                                    className={statusStyles[course.status]}
                                                >
                                                    {course.status}
                                                </Badge>
                                            </div>

                                            <p className="text-sm text-muted-foreground">
                                                {course.description}
                                            </p>

                                            <div className="grid grid-cols-2 gap-3 text-sm">
                                                <div>
                                                    <p className="text-xs text-muted-foreground">
                                                        Program
                                                    </p>
                                                    <p className="mt-1 font-medium">
                                                        {course.program}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-muted-foreground">
                                                        Instructor
                                                    </p>
                                                    <p className="mt-1 font-medium">
                                                        {course.instructor}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-muted-foreground">
                                                        Credit Hours
                                                    </p>
                                                    <p className="mt-1 font-medium">
                                                        {course.credits} Credits
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-muted-foreground">
                                                        Enrollment
                                                    </p>
                                                    <p className="mt-1 font-medium">
                                                        {course.enrolled}/{course.capacity}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <div className="flex justify-between text-xs">
                                                    <span className="text-muted-foreground">
                                                        Enrollment capacity
                                                    </span>
                                                    <span className="font-medium">
                                                        {Math.round(percentage)}%
                                                    </span>
                                                </div>
                                                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                                                    <div
                                                        className="h-full rounded-full bg-primary"
                                                        style={{ width: `${percentage}%` }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-2 border-t pt-3">
                                                <Button

                                                    size="sm"
                                                    variant="outline"
                                                    className="flex-1"
                                                    render={<Link
                                                        href={`/department-head/academics/courses/${course.id}`}
                                                    >
                                                        View details
                                                    </Link>}
                                                >

                                                </Button>
                                                <Button

                                                    size="sm"
                                                    className="flex-1"

                                                    render={<Link
                                                        href={`/department-head/academics/courses/${course.id}/edit`}
                                                    >
                                                        Edit course
                                                    </Link>}
                                                >

                                                </Button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>

            {/* Bottom information */}
            <div className="grid gap-4 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <Layers3 className="h-5 w-5 text-primary" />
                            Course Overview
                        </CardTitle>
                        <CardDescription>
                            Summary of your department&apos;s course catalog
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                Active courses
                            </div>
                            <span className="font-semibold">{activeCourses}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm">
                                <Clock3 className="h-4 w-4 text-amber-500" />
                                Draft courses
                            </div>
                            <span className="font-semibold">
                                {coursesData.filter((c) => c.status === "DRAFT").length}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-blue-500" />
                                Completed courses
                            </div>
                            <span className="font-semibold">
                                {coursesData.filter((c) => c.status === "COMPLETED").length}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm">
                                <XCircle className="h-4 w-4 text-muted-foreground" />
                                Inactive courses
                            </div>
                            <span className="font-semibold">
                                {coursesData.filter((c) => c.status === "INACTIVE").length}
                            </span>
                        </div>
                        <div className="flex items-center justify-between border-t pt-3">
                            <div className="flex items-center gap-2 text-sm font-medium">
                                <GraduationCap className="h-4 w-4 text-primary" />
                                Total credit hours
                            </div>
                            <span className="font-bold">{totalCredits}</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <CalendarDays className="h-5 w-5 text-primary" />
                            Academic Shortcuts
                        </CardTitle>
                        <CardDescription>
                            Quickly access related academic operations
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-2">
                        <Link
                            href="/department-head/department/students"
                            className="flex items-center justify-between rounded-lg border p-3 text-sm transition-colors hover:bg-muted/50"
                        >
                            <span className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                Department Students
                            </span>
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        </Link>

                        <Link
                            href="/department-head/department/programs"
                            className="flex items-center justify-between rounded-lg border p-3 text-sm transition-colors hover:bg-muted/50"
                        >
                            <span className="flex items-center gap-2">
                                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                Department Programs
                            </span>
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        </Link>

                        <Link
                            href="/department-head/academics"
                            className="flex items-center justify-between rounded-lg border p-3 text-sm transition-colors hover:bg-muted/50"
                        >
                            <span className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4 text-muted-foreground" />
                                Academics Overview
                            </span>
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div >
    );
}
