// import React from 'react'

// export default function enrollment() {
//     return (
//         <div>enrollment</div>
//     )
// }





"use client";

import { useMemo, useState } from "react";
import {
    BookOpen,
    CheckCircle2,
    Clock3,
    Ellipsis,
    GraduationCap,
    Search,
    Users,
    XCircle,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// --------------------------------------------------
// Types
// --------------------------------------------------

type EnrollmentStatus = "ENROLLED" | "PENDING" | "DROPPED";

type Enrollment = {
    id: string;
    studentId: string;
    studentName: string;
    email: string;
    courseCode: string;
    courseName: string;
    instructor: string;
    semester: string;
    enrolledAt: string;
    status: EnrollmentStatus;
};

type StatusFilter = "ALL" | EnrollmentStatus;

// --------------------------------------------------
// Demo data
// Replace with your CampusFlow API response.
// --------------------------------------------------

const initialEnrollments: Enrollment[] = [
    {
        id: "ENR-2026-001",
        studentId: "STU-2026-CSE-0001",
        studentName: "Rahim Ahmed",
        email: "rahim@example.com",
        courseCode: "CSE101",
        courseName: "Introduction to Programming",
        instructor: "Dr. Hasan Mahmud",
        semester: "Fall 2026",
        enrolledAt: "2026-09-12",
        status: "ENROLLED",
    },
    {
        id: "ENR-2026-002",
        studentId: "STU-2026-CSE-0002",
        studentName: "Nusrat Jahan",
        email: "nusrat@example.com",
        courseCode: "CSE201",
        courseName: "Data Structures",
        instructor: "Dr. Farhana Islam",
        semester: "Fall 2026",
        enrolledAt: "2026-09-14",
        status: "PENDING",
    },
    {
        id: "ENR-2026-003",
        studentId: "STU-2026-EEE-0003",
        studentName: "Tanvir Hasan",
        email: "tanvir@example.com",
        courseCode: "MAT101",
        courseName: "Calculus I",
        instructor: "Prof. Kamal Uddin",
        semester: "Fall 2026",
        enrolledAt: "2026-09-15",
        status: "ENROLLED",
    },
    {
        id: "ENR-2026-004",
        studentId: "STU-2026-BBA-0004",
        studentName: "Ayesha Rahman",
        email: "ayesha@example.com",
        courseCode: "BUS101",
        courseName: "Principles of Management",
        instructor: "Dr. Nadia Sultana",
        semester: "Fall 2026",
        enrolledAt: "2026-09-16",
        status: "DROPPED",
    },
    {
        id: "ENR-2026-005",
        studentId: "STU-2026-CSE-0005",
        studentName: "Sabbir Hossain",
        email: "sabbir@example.com",
        courseCode: "CSE301",
        courseName: "Database Management Systems",
        instructor: "Dr. Hasan Mahmud",
        semester: "Fall 2026",
        enrolledAt: "2026-09-18",
        status: "PENDING",
    },
    {
        id: "ENR-2026-006",
        studentId: "STU-2026-EEE-0006",
        studentName: "Maliha Chowdhury",
        email: "maliha@example.com",
        courseCode: "PHY101",
        courseName: "Physics I",
        instructor: "Prof. Kamal Uddin",
        semester: "Fall 2026",
        enrolledAt: "2026-09-20",
        status: "ENROLLED",
    },
];

// --------------------------------------------------
// Status configuration
// --------------------------------------------------

const statusConfig: Record<
    EnrollmentStatus,
    { label: string; className: string }
> = {
    ENROLLED: {
        label: "Enrolled",
        className:
            "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300",
    },
    PENDING: {
        label: "Pending",
        className:
            "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300",
    },
    DROPPED: {
        label: "Dropped",
        className:
            "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300",
    },
};

const statusOptions: {
    label: string;
    value: StatusFilter;
}[] = [
        { label: "All statuses", value: "ALL" },
        { label: "Enrolled", value: "ENROLLED" },
        { label: "Pending", value: "PENDING" },
        { label: "Dropped", value: "DROPPED" },
    ];

// --------------------------------------------------
// Page
// --------------------------------------------------

export default function EnrollmentPage() {
    const [enrollments, setEnrollments] =
        useState<Enrollment[]>(initialEnrollments);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] =
        useState<StatusFilter>("ALL");
    const [semesterFilter, setSemesterFilter] = useState("ALL");

    // Null-safe Select handlers.
    // Prevents: string | null is not assignable to string.
    const handleStatusChange = (value: string | null) => {
        const nextValue = statusOptions.some(
            (option) => option.value === value,
        )
            ? (value as StatusFilter)
            : "ALL";

        setStatusFilter(nextValue);
    };

    const handleSemesterChange = (value: string | null) => {
        setSemesterFilter(value ?? "ALL");
    };

    // Unique semester options, derived from available records.
    const semesters = useMemo(
        () =>
            Array.from(
                new Set(enrollments.map((item) => item.semester)),
            ).sort(),
        [enrollments],
    );

    // Dashboard statistics.
    const stats = useMemo(
        () => [
            {
                title: "Total Enrollments",
                value: enrollments.length,
                description: "All enrollment records",
                icon: Users,
                color: "text-blue-600",
                bg: "bg-blue-50 dark:bg-blue-950",
            },
            {
                title: "Enrolled",
                value: enrollments.filter(
                    (item) => item.status === "ENROLLED",
                ).length,
                description: "Successfully enrolled",
                icon: CheckCircle2,
                color: "text-emerald-600",
                bg: "bg-emerald-50 dark:bg-emerald-950",
            },
            {
                title: "Pending",
                value: enrollments.filter(
                    (item) => item.status === "PENDING",
                ).length,
                description: "Awaiting approval",
                icon: Clock3,
                color: "text-amber-600",
                bg: "bg-amber-50 dark:bg-amber-950",
            },
            {
                title: "Dropped",
                value: enrollments.filter(
                    (item) => item.status === "DROPPED",
                ).length,
                description: "Withdrawn enrollments",
                icon: XCircle,
                color: "text-red-600",
                bg: "bg-red-50 dark:bg-red-950",
            },
        ],
        [enrollments],
    );

    // Search and filters.
    const filteredEnrollments = useMemo(() => {
        const query = search.trim().toLowerCase();

        return enrollments.filter((item) => {
            const matchesSearch =
                !query ||
                [
                    item.id,
                    item.studentId,
                    item.studentName,
                    item.email,
                    item.courseCode,
                    item.courseName,
                    item.instructor,
                    item.semester,
                ].some((value) =>
                    value.toLowerCase().includes(query),
                );

            const matchesStatus =
                statusFilter === "ALL" ||
                item.status === statusFilter;

            const matchesSemester =
                semesterFilter === "ALL" ||
                item.semester === semesterFilter;

            return (
                matchesSearch &&
                matchesStatus &&
                matchesSemester
            );
        });
    }, [
        enrollments,
        search,
        statusFilter,
        semesterFilter,
    ]);

    // Demo-only status update.
    // Replace with a secured API mutation for production.
    function updateStatus(
        id: string,
        status: EnrollmentStatus,
    ) {
        setEnrollments((current) =>
            current.map((item) =>
                item.id === id ? { ...item, status } : item,
            ),
        );
    }

    function resetFilters() {
        setSearch("");
        setStatusFilter("ALL");
        setSemesterFilter("ALL");
    }

    return (
        <div className="min-w-0 space-y-6 p-4 sm:p-6 lg:p-8">
            {/* Page heading */}
            <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <GraduationCap className="size-4" />
                    Academic Management
                </div>

                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    Enrollment Management
                </h1>

                <p className="text-sm text-muted-foreground">
                    Manage student course registrations and enrollment statuses.
                </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <Card key={stat.title} className="min-w-0">
                            <CardContent className="flex items-center justify-between gap-3 p-5">
                                <div className="min-w-0 space-y-2">
                                    <p className="text-sm text-muted-foreground">
                                        {stat.title}
                                    </p>

                                    <p className="text-2xl font-bold tracking-tight">
                                        {stat.value.toLocaleString()}
                                    </p>

                                    <p className="text-xs text-muted-foreground">
                                        {stat.description}
                                    </p>
                                </div>

                                <div
                                    className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${stat.bg}`}
                                >
                                    <Icon className={`size-5 ${stat.color}`} />
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Enrollment table */}
            <Card className="min-w-0 overflow-hidden">
                <CardHeader className="gap-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div className="space-y-1">
                            <CardTitle className="text-lg">
                                Student Enrollments
                            </CardTitle>

                            <p className="text-sm text-muted-foreground">
                                View, filter, and manage course registrations.
                            </p>
                        </div>

                        <Badge variant="secondary" className="w-fit">
                            {filteredEnrollments.length}{" "}
                            {filteredEnrollments.length === 1
                                ? "record"
                                : "records"}
                        </Badge>
                    </div>

                    {/* Filters */}
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                        <div className="relative min-w-0">
                            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                                placeholder="Search students, courses..."
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                                className="pl-9"
                                aria-label="Search enrollments"
                            />
                        </div>

                        <Select
                            value={statusFilter}
                            onValueChange={handleStatusChange}
                        >
                            <SelectTrigger aria-label="Filter by status">
                                <SelectValue placeholder="All statuses" />
                            </SelectTrigger>

                            <SelectContent>
                                {statusOptions.map((option) => (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select
                            value={semesterFilter}
                            onValueChange={handleSemesterChange}
                        >
                            <SelectTrigger aria-label="Filter by semester">
                                <SelectValue placeholder="All semesters" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="ALL">
                                    All semesters
                                </SelectItem>

                                {semesters.map((semester) => (
                                    <SelectItem
                                        key={semester}
                                        value={semester}
                                    >
                                        {semester}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>

                <CardContent className="p-0">
                    <div className="w-full overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="pl-6">
                                        Student
                                    </TableHead>
                                    <TableHead>Course</TableHead>
                                    <TableHead>Instructor</TableHead>
                                    <TableHead>Semester</TableHead>
                                    <TableHead>Enrolled On</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="pr-6 text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {filteredEnrollments.length > 0 ? (
                                    filteredEnrollments.map((item) => (
                                        <TableRow key={item.id}>
                                            {/* Student */}
                                            <TableCell className="min-w-[210px] pl-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                                                        {item.studentName
                                                            .split(" ")
                                                            .map((part) => part[0])
                                                            .slice(0, 2)
                                                            .join("")
                                                            .toUpperCase()}
                                                    </div>

                                                    <div className="min-w-0">
                                                        <p className="font-medium">
                                                            {item.studentName}
                                                        </p>

                                                        <p className="text-xs text-muted-foreground">
                                                            {item.studentId}
                                                        </p>
                                                    </div>
                                                </div>
                                            </TableCell>

                                            {/* Course */}
                                            <TableCell className="min-w-[200px]">
                                                <div className="flex items-start gap-2">
                                                    <BookOpen className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                                                    <div className="min-w-0">
                                                        <p className="font-medium">
                                                            {item.courseCode}
                                                        </p>

                                                        <p className="max-w-[220px] text-xs text-muted-foreground">
                                                            {item.courseName}
                                                        </p>
                                                    </div>
                                                </div>
                                            </TableCell>

                                            {/* Instructor */}
                                            <TableCell className="min-w-[150px] text-sm">
                                                {item.instructor}
                                            </TableCell>

                                            {/* Semester */}
                                            <TableCell className="whitespace-nowrap text-sm">
                                                {item.semester}
                                            </TableCell>

                                            {/* Enrollment date */}
                                            <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                                                {new Date(
                                                    `${item.enrolledAt}T00:00:00`,
                                                ).toLocaleDateString("en-GB", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </TableCell>

                                            {/* Status */}
                                            <TableCell>
                                                <Badge
                                                    variant="outline"
                                                    className={
                                                        statusConfig[item.status].className
                                                    }
                                                >
                                                    {statusConfig[item.status].label}
                                                </Badge>
                                            </TableCell>

                                            {/* Actions */}
                                            <TableCell className="pr-6 text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                        render={
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                aria-label={`Actions for ${item.studentName}`}
                                                            >
                                                                <Ellipsis className="size-4" />
                                                            </Button>
                                                        }
                                                    />

                                                    <DropdownMenuContent align="end">
                                                        {item.status !== "ENROLLED" && (
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    updateStatus(
                                                                        item.id,
                                                                        "ENROLLED",
                                                                    )
                                                                }
                                                            >
                                                                <CheckCircle2 className="mr-2 size-4" />
                                                                Approve enrollment
                                                            </DropdownMenuItem>
                                                        )}

                                                        {item.status !== "PENDING" && (
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    updateStatus(
                                                                        item.id,
                                                                        "PENDING",
                                                                    )
                                                                }
                                                            >
                                                                <Clock3 className="mr-2 size-4" />
                                                                Mark as pending
                                                            </DropdownMenuItem>
                                                        )}

                                                        {item.status !== "DROPPED" && (
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    updateStatus(
                                                                        item.id,
                                                                        "DROPPED",
                                                                    )
                                                                }
                                                                className="text-destructive focus:text-destructive"
                                                            >
                                                                <XCircle className="mr-2 size-4" />
                                                                Mark as dropped
                                                            </DropdownMenuItem>
                                                        )}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={7}
                                            className="h-36 text-center"
                                        >
                                            <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                                                <Search className="size-5" />

                                                <p className="font-medium">
                                                    No enrollments found
                                                </p>

                                                <p className="text-sm">
                                                    Try changing your search or filters.
                                                </p>

                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={resetFilters}
                                                    className="mt-2"
                                                >
                                                    Clear filters
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Table footer */}
                    <div className="flex flex-col gap-2 border-t px-6 py-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                        <p>
                            Showing {filteredEnrollments.length} of{" "}
                            {enrollments.length} enrollments
                        </p>

                        <p>CampusFlow UMS · Academic Management</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
