
"use client";

import React, { useState } from "react";
import {
    Eye,
    MoreHorizontal,
    Plus,
    Search,
    Filter,
} from "lucide-react";

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

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type EnrollmentStatus =
    | "ENROLLED"
    | "COMPLETED"
    | "DROPPED"
    | "WITHDRAWN";

type Enrollment = {
    id: string;

    student: {
        id: string;
        name: string;
        studentId: string;
        email: string;
    };

    term: {
        id: string;
        name: string;
    };

    course: {
        id: string;
        code: string;
        title: string;
    };

    subject: {
        id: string;
        code: string;
        name: string;
    };

    status: EnrollmentStatus;

    enrolledAt: string;
};

const enrollments: Enrollment[] = [
    {
        id: "1",
        student: {
            id: "student-1",
            name: "Ayan Sujon",
            studentId: "STU-2026-CSE-0001",
            email: "ayan@example.com",
        },
        term: {
            id: "term-1",
            name: "Spring 2026",
        },
        course: {
            id: "course-1",
            code: "CSE-101",
            title: "Introduction to Programming",
        },
        subject: {
            id: "subject-1",
            code: "CSE-101",
            name: "Introduction to Programming",
        },
        status: "ENROLLED",
        enrolledAt: "2026-01-15",
    },
    {
        id: "2",
        student: {
            id: "student-2",
            name: "Rahim Ahmed",
            studentId: "STU-2026-CSE-0002",
            email: "rahim@example.com",
        },
        term: {
            id: "term-1",
            name: "Spring 2026",
        },
        course: {
            id: "course-2",
            code: "CSE-201",
            title: "Data Structures",
        },
        subject: {
            id: "subject-2",
            code: "CSE-201",
            name: "Data Structures",
        },
        status: "ENROLLED",
        enrolledAt: "2026-01-16",
    },
    {
        id: "3",
        student: {
            id: "student-3",
            name: "Nusrat Jahan",
            studentId: "STU-2025-BBA-0015",
            email: "nusrat@example.com",
        },
        term: {
            id: "term-2",
            name: "Fall 2025",
        },
        course: {
            id: "course-3",
            code: "BUS-301",
            title: "Business Management",
        },
        subject: {
            id: "subject-3",
            code: "BUS-301",
            name: "Business Management",
        },
        status: "COMPLETED",
        enrolledAt: "2025-09-10",
    },
    {
        id: "4",
        student: {
            id: "student-4",
            name: "Tanvir Hasan",
            studentId: "STU-2025-CSE-0021",
            email: "tanvir@example.com",
        },
        term: {
            id: "term-2",
            name: "Fall 2025",
        },
        course: {
            id: "course-4",
            code: "CSE-202",
            title: "Data Structures Lab",
        },
        subject: {
            id: "subject-4",
            code: "CSE-202",
            name: "Data Structures Lab",
        },
        status: "DROPPED",
        enrolledAt: "2025-09-12",
    },
];

export default function Enrollments() {
    const [searchTerm, setSearchTerm] = useState("");

    const [statusFilter, setStatusFilter] = useState<
        "ALL" | EnrollmentStatus
    >("ALL");

    const [termFilter, setTermFilter] = useState("ALL");

    const filteredEnrollments = enrollments.filter((enrollment) => {
        const search = searchTerm.toLowerCase();

        const matchesSearch =
            enrollment.student.name.toLowerCase().includes(search) ||
            enrollment.student.studentId.toLowerCase().includes(search) ||
            enrollment.student.email.toLowerCase().includes(search) ||
            enrollment.course.code.toLowerCase().includes(search) ||
            enrollment.course.title.toLowerCase().includes(search) ||
            enrollment.subject.code.toLowerCase().includes(search) ||
            enrollment.subject.name.toLowerCase().includes(search);

        const matchesStatus =
            statusFilter === "ALL" ||
            enrollment.status === statusFilter;

        const matchesTerm =
            termFilter === "ALL" ||
            enrollment.term.id === termFilter;

        return matchesSearch && matchesStatus && matchesTerm;
    });

    const getStatusVariant = (status: EnrollmentStatus) => {
        switch (status) {
            case "ENROLLED":
                return "default";

            case "COMPLETED":
                return "secondary";

            case "DROPPED":
                return "destructive";

            case "WITHDRAWN":
                return "outline";

            default:
                return "outline";
        }
    };

    return (
        <div className="space-y-6 p-3">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Enrollments
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage student enrollment across academic terms and
                        courses.
                    </p>
                </div>

                <Button className="w-full sm:w-auto">
                    <Plus className="mr-2 size-4" />
                    Add Enrollment
                </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-3 rounded-lg border bg-card p-4 lg:flex-row lg:items-center">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                        placeholder="Search student, ID, course or subject..."
                        value={searchTerm}
                        onChange={(event) =>
                            setSearchTerm(event.target.value)
                        }
                        className="pl-9"
                    />
                </div>

                {/* Term Filter */}
                <div className="flex items-center gap-2">
                    <Filter className="size-4 text-muted-foreground" />

                    <select
                        value={termFilter}
                        onChange={(event) =>
                            setTermFilter(event.target.value)
                        }
                        className="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                    >
                        <option value="ALL">All Terms</option>
                        <option value="term-1">Spring 2026</option>
                        <option value="term-2">Fall 2025</option>
                    </select>
                </div>

                {/* Status Filter */}
                <select
                    value={statusFilter}
                    onChange={(event) =>
                        setStatusFilter(
                            event.target.value as "ALL" | EnrollmentStatus
                        )
                    }
                    className="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                >
                    <option value="ALL">All Statuses</option>
                    <option value="ENROLLED">Enrolled</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="DROPPED">Dropped</option>
                    <option value="WITHDRAWN">Withdrawn</option>
                </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border">
                <Table className="">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Student</TableHead>
                            <TableHead>Student ID</TableHead>
                            <TableHead>Term</TableHead>
                            <TableHead>Course</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Enrolled At</TableHead>
                            <TableHead className="text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {filteredEnrollments.length > 0 ? (
                            filteredEnrollments.map((enrollment) => (
                                <TableRow key={enrollment.id}>
                                    {/* Student */}
                                    <TableCell>
                                        <div>
                                            <p className="font-medium">
                                                {enrollment.student.name}
                                            </p>

                                            <p className="text-xs text-muted-foreground">
                                                {enrollment.student.email}
                                            </p>
                                        </div>
                                    </TableCell>

                                    {/* Student ID */}
                                    <TableCell className="font-medium">
                                        {enrollment.student.studentId}
                                    </TableCell>

                                    {/* Term */}
                                    <TableCell>
                                        {enrollment.term.name}
                                    </TableCell>

                                    {/* Course */}
                                    <TableCell>
                                        <div>
                                            <p className="font-medium">
                                                {enrollment.course.code}
                                            </p>

                                            <p className="text-xs text-muted-foreground">
                                                {enrollment.course.title}
                                            </p>
                                        </div>
                                    </TableCell>

                                    {/* Subject */}
                                    <TableCell>
                                        <div>
                                            <p className="font-medium">
                                                {enrollment.subject.code}
                                            </p>

                                            <p className="text-xs text-muted-foreground">
                                                {enrollment.subject.name}
                                            </p>
                                        </div>
                                    </TableCell>

                                    {/* Status */}
                                    <TableCell>
                                        <Badge
                                            variant={getStatusVariant(
                                                enrollment.status
                                            )}
                                        >
                                            {enrollment.status}
                                        </Badge>
                                    </TableCell>

                                    {/* Enrolled At */}
                                    <TableCell className="whitespace-nowrap">
                                        {new Date(
                                            enrollment.enrolledAt
                                        ).toLocaleDateString()}
                                    </TableCell>

                                    {/* Actions */}
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger render={<Button
                                                variant="ghost"
                                                size="icon"
                                                aria-label={`Actions for ${enrollment.student.name}`}
                                            >
                                                <MoreHorizontal className="size-4" />
                                            </Button>}>

                                            </DropdownMenuTrigger>

                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>
                                                    <Eye className="mr-2 size-4" />
                                                    View
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={8}
                                    className="h-32 text-center text-muted-foreground"
                                >
                                    No enrollments found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Summary */}
            <div className="text-sm text-muted-foreground">
                Showing {filteredEnrollments.length} of{" "}
                {enrollments.length} enrollments
            </div>
        </div>
    );
}

