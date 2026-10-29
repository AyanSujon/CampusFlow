// import React from 'react'

// export default function courses() {
//     return (
//         <div>courses</div>
//     )
// }







"use client";

import { useMemo, useState } from "react";
import {
    BookOpen,
    CalendarDays,
    CheckCircle2,
    Clock3,
    GraduationCap,
    MoreHorizontal,
    Pencil,
    Plus,
    Search,
    Users,
    Archive,
    Eye,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
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

type CourseStatus = "ACTIVE" | "DRAFT" | "COMPLETED" | "ARCHIVED";

type Course = {
    id: string;
    code: string;
    name: string;
    department: string;
    instructor: string;
    credits: number;
    semester: string;
    enrolled: number;
    capacity: number;
    status: CourseStatus;
};

const initialCourses: Course[] = [
    {
        id: "1",
        code: "CSE101",
        name: "Introduction to Computer Science",
        department: "Computer Science",
        instructor: "Dr. Ahmed Rahman",
        credits: 3,
        semester: "Fall 2026",
        enrolled: 42,
        capacity: 50,
        status: "ACTIVE",
    },
    {
        id: "2",
        code: "CSE201",
        name: "Data Structures and Algorithms",
        department: "Computer Science",
        instructor: "Prof. Nusrat Jahan",
        credits: 4,
        semester: "Fall 2026",
        enrolled: 38,
        capacity: 45,
        status: "ACTIVE",
    },
    {
        id: "3",
        code: "EEE102",
        name: "Basic Electrical Engineering",
        department: "Electrical Engineering",
        instructor: "Dr. Mahmud Hasan",
        credits: 3,
        semester: "Fall 2026",
        enrolled: 30,
        capacity: 40,
        status: "ACTIVE",
    },
    {
        id: "4",
        code: "BUS201",
        name: "Principles of Management",
        department: "Business Administration",
        instructor: "Dr. Farhana Islam",
        credits: 3,
        semester: "Spring 2026",
        enrolled: 45,
        capacity: 45,
        status: "COMPLETED",
    },
    {
        id: "5",
        code: "CSE301",
        name: "Database Management Systems",
        department: "Computer Science",
        instructor: "Mr. Tanvir Hossain",
        credits: 3,
        semester: "Spring 2027",
        enrolled: 0,
        capacity: 40,
        status: "DRAFT",
    },
    {
        id: "6",
        code: "ENG101",
        name: "English Communication",
        department: "Arts and Humanities",
        instructor: "Ms. Samia Akter",
        credits: 2,
        semester: "Fall 2026",
        enrolled: 35,
        capacity: 40,
        status: "ACTIVE",
    },
    {
        id: "7",
        code: "MAT201",
        name: "Linear Algebra",
        department: "Mathematics",
        instructor: "Dr. Rezaul Karim",
        credits: 3,
        semester: "Spring 2026",
        enrolled: 28,
        capacity: 35,
        status: "ARCHIVED",
    },
    {
        id: "8",
        code: "CSE401",
        name: "Software Engineering",
        department: "Computer Science",
        instructor: "Prof. Arif Chowdhury",
        credits: 3,
        semester: "Fall 2026",
        enrolled: 32,
        capacity: 40,
        status: "ACTIVE",
    },
];

const statusStyles: Record<CourseStatus, string> = {
    ACTIVE:
        "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300",
    DRAFT:
        "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300",
    COMPLETED:
        "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300",
    ARCHIVED:
        "border-gray-200 bg-gray-100 text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300",
};

function StatusBadge({ status }: { status: CourseStatus }) {
    return (
        <Badge
            variant="outline"
            className={`whitespace-nowrap font-medium ${statusStyles[status]}`}
        >
            {status.charAt(0) + status.slice(1).toLowerCase()}
        </Badge>
    );
}

function CourseActions({
    course,
    onView,
    onEdit,
    onStatusChange,
}: {
    course: Course;
    onView: (course: Course) => void;
    onEdit: (course: Course) => void;
    onStatusChange: (id: string, status: CourseStatus) => void;
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="size-8 shrink-0"
                        aria-label={`Actions for ${course.name}`}
                    >
                        <MoreHorizontal className="size-4" />
                    </Button>
                }
            />
            <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem onClick={() => onView(course)}>
                    <Eye className="mr-2 size-4" />
                    View details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit(course)}>
                    <Pencil className="mr-2 size-4" />
                    Edit course
                </DropdownMenuItem>

                {course.status !== "ACTIVE" && (
                    <DropdownMenuItem
                        onClick={() => onStatusChange(course.id, "ACTIVE")}
                    >
                        <CheckCircle2 className="mr-2 size-4" />
                        Set as active
                    </DropdownMenuItem>
                )}

                {course.status !== "ARCHIVED" && (
                    <DropdownMenuItem
                        onClick={() => onStatusChange(course.id, "ARCHIVED")}
                    >
                        <Archive className="mr-2 size-4" />
                        Archive course
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function EnrollmentBar({
    enrolled,
    capacity,
}: {
    enrolled: number;
    capacity: number;
}) {
    const percentage =
        capacity > 0 ? Math.min((enrolled / capacity) * 100, 100) : 0;

    return (
        <div className="w-full min-w-0 space-y-1.5">
            <div className="flex flex-wrap items-center justify-between gap-1 text-xs">
                <span className="font-medium text-foreground">
                    {enrolled}/{capacity}
                </span>
                <span className="text-muted-foreground">
                    {Math.round(percentage)}%
                </span>
            </div>
            <div
                className="h-1.5 w-full overflow-hidden rounded-full bg-muted"
                role="progressbar"
                aria-label="Course enrollment"
                aria-valuemin={0}
                aria-valuemax={capacity}
                aria-valuenow={enrolled}
            >
                <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}

export default function AdminCoursesPage() {
    const [courses, setCourses] = useState<Course[]>(initialCourses);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [departmentFilter, setDepartmentFilter] = useState("ALL");
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [dialogMode, setDialogMode] = useState<"view" | "edit" | null>(null);

    const departments = useMemo(
        () => [...new Set(courses.map((course) => course.department))].sort(),
        [courses],
    );

    const filteredCourses = useMemo(() => {
        const query = search.trim().toLowerCase();

        return courses.filter((course) => {
            const matchesSearch =
                !query ||
                course.name.toLowerCase().includes(query) ||
                course.code.toLowerCase().includes(query) ||
                course.instructor.toLowerCase().includes(query) ||
                course.department.toLowerCase().includes(query);

            const matchesStatus =
                statusFilter === "ALL" || course.status === statusFilter;

            const matchesDepartment =
                departmentFilter === "ALL" ||
                course.department === departmentFilter;

            return matchesSearch && matchesStatus && matchesDepartment;
        });
    }, [courses, search, statusFilter, departmentFilter]);

    const stats = useMemo(
        () => ({
            total: courses.length,
            active: courses.filter((course) => course.status === "ACTIVE").length,
            students: courses.reduce((sum, course) => sum + course.enrolled, 0),
            drafts: courses.filter((course) => course.status === "DRAFT").length,
        }),
        [courses],
    );

    function changeCourseStatus(id: string, status: CourseStatus) {
        setCourses((current) =>
            current.map((course) =>
                course.id === id ? { ...course, status } : course,
            ),
        );
    }

    function openCourseDialog(course: Course, mode: "view" | "edit") {
        setSelectedCourse(course);
        setDialogMode(mode);
    }

    function closeCourseDialog() {
        setSelectedCourse(null);
        setDialogMode(null);
    }

    return (
        <div className="w-full min-w-0 space-y-6 overflow-x-clip pb-8 p-4">
            {/* Page heading */}
            <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0 space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Courses
                    </h1>
                    <p className="text-sm text-muted-foreground sm:text-base">
                        Manage courses, instructors, enrollment, and academic semesters.
                    </p>
                </div>

                <Button
                    type="button"
                    className="w-full shrink-0 sm:w-auto"
                    onClick={() =>
                        window.alert("Connect this button to your Add Course form.")
                    }
                >
                    <Plus className="mr-2 size-4" />
                    Add Course
                </Button>
            </div>

            {/* Statistics */}
            <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <Card className="min-w-0">
                    <CardContent className="flex items-center justify-between gap-3 p-5">
                        <div className="min-w-0 space-y-1">
                            <p className="text-sm text-muted-foreground">Total Courses</p>
                            <p className="text-2xl font-bold tabular-nums">{stats.total}</p>
                            <p className="text-xs text-muted-foreground">
                                Across all departments
                            </p>
                        </div>
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <BookOpen className="size-5" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="min-w-0">
                    <CardContent className="flex items-center justify-between gap-3 p-5">
                        <div className="min-w-0 space-y-1">
                            <p className="text-sm text-muted-foreground">Active Courses</p>
                            <p className="text-2xl font-bold tabular-nums">{stats.active}</p>
                            <p className="text-xs text-muted-foreground">
                                Currently running
                            </p>
                        </div>
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                            <CheckCircle2 className="size-5" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="min-w-0">
                    <CardContent className="flex items-center justify-between gap-3 p-5">
                        <div className="min-w-0 space-y-1">
                            <p className="text-sm text-muted-foreground">Enrolled Students</p>
                            <p className="text-2xl font-bold tabular-nums">
                                {stats.students}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Across all courses
                            </p>
                        </div>
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                            <Users className="size-5" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="min-w-0">
                    <CardContent className="flex items-center justify-between gap-3 p-5">
                        <div className="min-w-0 space-y-1">
                            <p className="text-sm text-muted-foreground">Draft Courses</p>
                            <p className="text-2xl font-bold tabular-nums">{stats.drafts}</p>
                            <p className="text-xs text-muted-foreground">
                                Awaiting publication
                            </p>
                        </div>
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                            <Clock3 className="size-5" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search and filters */}
            <Card className="min-w-0">
                <CardHeader className="pb-3">
                    <CardTitle className="text-base">All Courses</CardTitle>
                </CardHeader>
                <CardContent className="min-w-0 space-y-4">
                    <div className="grid min-w-0 grid-cols-1 gap-3 md:grid-cols-3">
                        <div className="relative min-w-0 md:col-span-1">
                            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Search courses, codes, instructors..."
                                className="w-full min-w-0 pl-9"
                                aria-label="Search courses"
                            />
                        </div>

                        <Select
                            value={statusFilter}
                            onValueChange={(value) => setStatusFilter(value ?? "ALL")}
                        >
                            <SelectTrigger className="w-full min-w-0">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All statuses</SelectItem>
                                <SelectItem value="ACTIVE">Active</SelectItem>
                                <SelectItem value="DRAFT">Draft</SelectItem>
                                <SelectItem value="COMPLETED">Completed</SelectItem>
                                <SelectItem value="ARCHIVED">Archived</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select
                            value={departmentFilter}
                            onValueChange={(value) => setDepartmentFilter(value ?? "ALL")}
                        >
                            <SelectTrigger className="w-full min-w-0">
                                <SelectValue placeholder="Filter by department" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All departments</SelectItem>
                                {departments.map((department) => (
                                    <SelectItem key={department} value={department}>
                                        {department}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
                        <span>
                            Showing{" "}
                            <span className="font-medium text-foreground">
                                {filteredCourses.length}
                            </span>{" "}
                            of {courses.length} courses
                        </span>

                        {(search || statusFilter !== "ALL" || departmentFilter !== "ALL") && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    setSearch("");
                                    setStatusFilter("ALL");
                                    setDepartmentFilter("ALL");
                                }}
                            >
                                Clear filters
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Mobile course cards */}
            <div className="grid min-w-0 grid-cols-1 gap-4 md:hidden">
                {filteredCourses.map((course) => (
                    <Card key={course.id} className="min-w-0 overflow-hidden">
                        <CardContent className="min-w-0 space-y-4 p-4">
                            <div className="flex min-w-0 items-start gap-3">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <BookOpen className="size-5" />
                                </div>

                                <div className="min-w-0 flex-1 space-y-1">
                                    <p className="break-words text-xs font-semibold text-primary">
                                        {course.code}
                                    </p>
                                    <h3 className="break-words font-semibold leading-snug">
                                        {course.name}
                                    </h3>
                                    <p className="break-words text-sm text-muted-foreground">
                                        {course.department}
                                    </p>
                                </div>

                                <CourseActions
                                    course={course}
                                    onView={(item) => openCourseDialog(item, "view")}
                                    onEdit={(item) => openCourseDialog(item, "edit")}
                                    onStatusChange={changeCourseStatus}
                                />
                            </div>

                            <div className="grid min-w-0 grid-cols-2 gap-x-3 gap-y-4 rounded-lg bg-muted/40 p-3">
                                <div className="min-w-0">
                                    <p className="mb-1 text-xs text-muted-foreground">
                                        Instructor
                                    </p>
                                    <p className="break-words text-sm font-medium">
                                        {course.instructor}
                                    </p>
                                </div>

                                <div className="min-w-0">
                                    <p className="mb-1 text-xs text-muted-foreground">Credits</p>
                                    <p className="text-sm font-medium">{course.credits}</p>
                                </div>

                                <div className="min-w-0">
                                    <p className="mb-1 text-xs text-muted-foreground">Semester</p>
                                    <p className="flex items-start gap-1.5 break-words text-sm font-medium">
                                        <CalendarDays className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                                        <span>{course.semester}</span>
                                    </p>
                                </div>

                                <div className="min-w-0">
                                    <p className="mb-1 text-xs text-muted-foreground">Status</p>
                                    <StatusBadge status={course.status} />
                                </div>
                            </div>

                            <div className="min-w-0 space-y-2">
                                <p className="text-xs text-muted-foreground">Enrollment</p>
                                <EnrollmentBar
                                    enrolled={course.enrolled}
                                    capacity={course.capacity}
                                />
                            </div>

                            <Button
                                type="button"
                                variant="outline"
                                className="w-full"
                                onClick={() => openCourseDialog(course, "view")}
                            >
                                <Eye className="mr-2 size-4" />
                                View course details
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Desktop and tablet table */}
            <Card className="hidden min-w-0 overflow-hidden md:block">
                <div className="w-full min-w-0">
                    <table className="w-full table-fixed text-sm">
                        <colgroup>
                            <col className="w-[25%]" />
                            <col className="w-[19%]" />
                            <col className="w-[14%]" />
                            <col className="w-[7%]" />
                            <col className="w-[12%]" />
                            <col className="w-[13%]" />
                            <col className="w-[7%]" />
                            <col className="w-[3%]" />
                        </colgroup>

                        <thead>
                            <tr className="border-b bg-muted/40 text-left">
                                <th className="px-3 py-3 font-medium">Course</th>
                                <th className="px-3 py-3 font-medium">Department</th>
                                <th className="px-3 py-3 font-medium">Instructor</th>
                                <th className="px-2 py-3 text-center font-medium">Credits</th>
                                <th className="px-3 py-3 font-medium">Semester</th>
                                <th className="px-3 py-3 font-medium">Enrollment</th>
                                <th className="px-2 py-3 font-medium">Status</th>
                                <th className="px-1 py-3" />
                            </tr>
                        </thead>

                        <tbody>
                            {filteredCourses.map((course) => (
                                <tr
                                    key={course.id}
                                    className="border-b last:border-0 transition-colors hover:bg-muted/30"
                                >
                                    <td className="px-3 py-4 align-top">
                                        <div className="flex min-w-0 items-start gap-2">
                                            <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                                                <GraduationCap className="size-4" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="break-words font-medium leading-snug">
                                                    {course.name}
                                                </p>
                                                <p className="mt-1 break-words text-xs text-muted-foreground">
                                                    {course.code}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="break-words px-3 py-4 align-top text-muted-foreground">
                                        {course.department}
                                    </td>

                                    <td className="break-words px-3 py-4 align-top">
                                        {course.instructor}
                                    </td>

                                    <td className="px-2 py-4 text-center align-top">
                                        {course.credits}
                                    </td>

                                    <td className="break-words px-3 py-4 align-top text-muted-foreground">
                                        {course.semester}
                                    </td>

                                    <td className="px-3 py-4 align-top">
                                        <EnrollmentBar
                                            enrolled={course.enrolled}
                                            capacity={course.capacity}
                                        />
                                    </td>

                                    <td className="px-2 py-4 align-top">
                                        <StatusBadge status={course.status} />
                                    </td>

                                    <td className="px-1 py-3 align-top">
                                        <CourseActions
                                            course={course}
                                            onView={(item) => openCourseDialog(item, "view")}
                                            onEdit={(item) => openCourseDialog(item, "edit")}
                                            onStatusChange={changeCourseStatus}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Empty state */}
            {filteredCourses.length === 0 && (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center px-4 py-12 text-center">
                        <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-muted">
                            <Search className="size-5 text-muted-foreground" />
                        </div>
                        <h3 className="font-semibold">No courses found</h3>
                        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                            Try changing your search term or filters to find a course.
                        </p>
                        <Button
                            type="button"
                            variant="outline"
                            className="mt-4"
                            onClick={() => {
                                setSearch("");
                                setStatusFilter("ALL");
                                setDepartmentFilter("ALL");
                            }}
                        >
                            Clear filters
                        </Button>
                    </CardContent>
                </Card>
            )}

            {/* Basic view/edit dialog */}
            {selectedCourse && dialogMode && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) closeCourseDialog();
                    }}
                    onKeyDown={(event) => {
                        if (event.key === "Escape") closeCourseDialog();
                    }}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="course-dialog-title"
                        className="my-auto w-full max-w-lg rounded-xl border bg-background p-5 shadow-xl sm:p-6"
                    >
                        <div className="mb-5 flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <h2
                                    id="course-dialog-title"
                                    className="text-lg font-semibold"
                                >
                                    {dialogMode === "view" ? "Course details" : "Edit course"}
                                </h2>
                                <p className="mt-1 break-words text-sm text-muted-foreground">
                                    {selectedCourse.code} · {selectedCourse.name}
                                </p>
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={closeCourseDialog}
                            >
                                Close
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="min-w-0">
                                <p className="text-xs text-muted-foreground">Department</p>
                                <p className="mt-1 break-words text-sm font-medium">
                                    {selectedCourse.department}
                                </p>
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs text-muted-foreground">Instructor</p>
                                <p className="mt-1 break-words text-sm font-medium">
                                    {selectedCourse.instructor}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Credits</p>
                                <p className="mt-1 text-sm font-medium">
                                    {selectedCourse.credits}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Semester</p>
                                <p className="mt-1 text-sm font-medium">
                                    {selectedCourse.semester}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Enrollment</p>
                                <p className="mt-1 text-sm font-medium">
                                    {selectedCourse.enrolled} / {selectedCourse.capacity}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Status</p>
                                <div className="mt-1">
                                    <StatusBadge status={selectedCourse.status} />
                                </div>
                            </div>
                        </div>

                        {dialogMode === "edit" && (
                            <div className="mt-5 space-y-2">
                                <p className="text-sm font-medium">Course status</p>
                                <Select
                                    value={selectedCourse.status}
                                    onValueChange={(value) => {
                                        if (!value) return;

                                        const status = value as CourseStatus;
                                        changeCourseStatus(selectedCourse.id, status);
                                        setSelectedCourse((current) =>
                                            current ? { ...current, status } : null,
                                        );
                                    }}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ACTIVE">Active</SelectItem>
                                        <SelectItem value="DRAFT">Draft</SelectItem>
                                        <SelectItem value="COMPLETED">Completed</SelectItem>
                                        <SelectItem value="ARCHIVED">Archived</SelectItem>
                                    </SelectContent>
                                </Select>
                                <p className="text-xs text-muted-foreground">
                                    This demo updates the status in local page state only.
                                </p>
                            </div>
                        )}

                        <div className="mt-6 flex justify-end">
                            <Button type="button" onClick={closeCourseDialog}>
                                Done
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
