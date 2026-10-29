// import React from 'react'

// export default function attendance() {
//     return (
//         <div>attendance</div>
//     )
// }












"use client";

import { useMemo, useState } from "react";
import {
    CalendarDays,
    CheckCircle2,
    Clock3,
    Ellipsis,
    GraduationCap,
    Search,
    Users,
    UserX,
    ClipboardCheck,
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

type AttendanceStatus =
    | "PRESENT"
    | "ABSENT"
    | "LATE"
    | "EXCUSED";

type AttendanceRecord = {
    id: string;
    studentId: string;
    studentName: string;
    courseCode: string;
    courseName: string;
    instructor: string;
    date: string;
    checkIn: string;
    status: AttendanceStatus;
};

type StatusFilter = "ALL" | AttendanceStatus;

// --------------------------------------------------
// Demo data
// Replace with records from your CampusFlow API.
// --------------------------------------------------

const initialAttendance: AttendanceRecord[] = [
    {
        id: "ATT-2026-001",
        studentId: "STU-2026-CSE-0001",
        studentName: "Rahim Ahmed",
        courseCode: "CSE101",
        courseName: "Introduction to Programming",
        instructor: "Dr. Hasan Mahmud",
        date: "2026-10-28",
        checkIn: "09:02 AM",
        status: "PRESENT",
    },
    {
        id: "ATT-2026-002",
        studentId: "STU-2026-CSE-0002",
        studentName: "Nusrat Jahan",
        courseCode: "CSE201",
        courseName: "Data Structures",
        instructor: "Dr. Farhana Islam",
        date: "2026-10-28",
        checkIn: "09:18 AM",
        status: "LATE",
    },
    {
        id: "ATT-2026-003",
        studentId: "STU-2026-EEE-0003",
        studentName: "Tanvir Hasan",
        courseCode: "MAT101",
        courseName: "Calculus I",
        instructor: "Prof. Kamal Uddin",
        date: "2026-10-28",
        checkIn: "—",
        status: "ABSENT",
    },
    {
        id: "ATT-2026-004",
        studentId: "STU-2026-BBA-0004",
        studentName: "Ayesha Rahman",
        courseCode: "BUS101",
        courseName: "Principles of Management",
        instructor: "Dr. Nadia Sultana",
        date: "2026-10-28",
        checkIn: "—",
        status: "EXCUSED",
    },
    {
        id: "ATT-2026-005",
        studentId: "STU-2026-CSE-0005",
        studentName: "Sabbir Hossain",
        courseCode: "CSE301",
        courseName: "Database Management Systems",
        instructor: "Dr. Hasan Mahmud",
        date: "2026-10-27",
        checkIn: "10:04 AM",
        status: "PRESENT",
    },
    {
        id: "ATT-2026-006",
        studentId: "STU-2026-EEE-0006",
        studentName: "Maliha Chowdhury",
        courseCode: "PHY101",
        courseName: "Physics I",
        instructor: "Prof. Kamal Uddin",
        date: "2026-10-27",
        checkIn: "—",
        status: "ABSENT",
    },
];

// --------------------------------------------------
// Status configuration
// --------------------------------------------------

const statusConfig: Record<
    AttendanceStatus,
    { label: string; className: string }
> = {
    PRESENT: {
        label: "Present",
        className:
            "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300",
    },
    ABSENT: {
        label: "Absent",
        className:
            "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300",
    },
    LATE: {
        label: "Late",
        className:
            "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300",
    },
    EXCUSED: {
        label: "Excused",
        className:
            "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300",
    },
};

const statusOptions: {
    label: string;
    value: StatusFilter;
}[] = [
        { label: "All statuses", value: "ALL" },
        { label: "Present", value: "PRESENT" },
        { label: "Absent", value: "ABSENT" },
        { label: "Late", value: "LATE" },
        { label: "Excused", value: "EXCUSED" },
    ];

// --------------------------------------------------
// Page
// --------------------------------------------------

export default function AttendancePage() {
    const [records, setRecords] =
        useState<AttendanceRecord[]>(initialAttendance);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] =
        useState<StatusFilter>("ALL");
    const [selectedDate, setSelectedDate] = useState("ALL");

    // Null-safe Select handlers.
    const handleStatusChange = (value: string | null) => {
        const isValid = statusOptions.some(
            (option) => option.value === value,
        );

        setStatusFilter(isValid ? (value as StatusFilter) : "ALL");
    };

    const handleDateChange = (value: string | null) => {
        setSelectedDate(value ?? "ALL");
    };

    // Available dates from current records.
    const availableDates = useMemo(
        () =>
            Array.from(new Set(records.map((record) => record.date))).sort(
                (a, b) => b.localeCompare(a),
            ),
        [records],
    );

    // Summary statistics for the complete dataset.
    const stats = useMemo(
        () => [
            {
                title: "Total Records",
                value: records.length,
                description: "Attendance entries",
                icon: Users,
                color: "text-blue-600",
                bg: "bg-blue-50 dark:bg-blue-950",
            },
            {
                title: "Present",
                value: records.filter(
                    (record) => record.status === "PRESENT",
                ).length,
                description: "Students present",
                icon: CheckCircle2,
                color: "text-emerald-600",
                bg: "bg-emerald-50 dark:bg-emerald-950",
            },
            {
                title: "Absent",
                value: records.filter(
                    (record) => record.status === "ABSENT",
                ).length,
                description: "Students absent",
                icon: UserX,
                color: "text-red-600",
                bg: "bg-red-50 dark:bg-red-950",
            },
            {
                title: "Late",
                value: records.filter(
                    (record) => record.status === "LATE",
                ).length,
                description: "Late arrivals",
                icon: Clock3,
                color: "text-amber-600",
                bg: "bg-amber-50 dark:bg-amber-950",
            },
        ],
        [records],
    );

    // Search and filters.
    const filteredRecords = useMemo(() => {
        const query = search.trim().toLowerCase();

        return records.filter((record) => {
            const matchesSearch =
                !query ||
                [
                    record.id,
                    record.studentId,
                    record.studentName,
                    record.courseCode,
                    record.courseName,
                    record.instructor,
                ].some((value) => value.toLowerCase().includes(query));

            const matchesStatus =
                statusFilter === "ALL" ||
                record.status === statusFilter;

            const matchesDate =
                selectedDate === "ALL" ||
                record.date === selectedDate;

            return matchesSearch && matchesStatus && matchesDate;
        });
    }, [records, search, statusFilter, selectedDate]);

    // Demo-only state update.
    // Replace with a secured API mutation before production.
    function updateStatus(
        id: string,
        status: AttendanceStatus,
    ) {
        setRecords((current) =>
            current.map((record) =>
                record.id === id ? { ...record, status } : record,
            ),
        );
    }

    function resetFilters() {
        setSearch("");
        setStatusFilter("ALL");
        setSelectedDate("ALL");
    }

    function formatDate(date: string) {
        return new Date(`${date}T00:00:00`).toLocaleDateString(
            "en-GB",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            },
        );
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
                    Attendance Management
                </h1>

                <p className="text-sm text-muted-foreground">
                    Monitor student attendance, review absences, and manage
                    attendance records.
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

            {/* Attendance records */}
            <Card className="min-w-0 overflow-hidden">
                <CardHeader className="gap-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div className="space-y-1">
                            <CardTitle className="text-lg">
                                Attendance Records
                            </CardTitle>

                            <p className="text-sm text-muted-foreground">
                                Search students and review attendance by date and status.
                            </p>
                        </div>

                        <Badge variant="secondary" className="w-fit">
                            {filteredRecords.length}{" "}
                            {filteredRecords.length === 1 ? "record" : "records"}
                        </Badge>
                    </div>

                    {/* Filters */}
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                        <div className="relative min-w-0">
                            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                                placeholder="Search students or courses..."
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                className="pl-9"
                                aria-label="Search attendance records"
                            />
                        </div>

                        <Select
                            value={statusFilter}
                            onValueChange={handleStatusChange}
                        >
                            <SelectTrigger aria-label="Filter by attendance status">
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
                            value={selectedDate}
                            onValueChange={handleDateChange}
                        >
                            <SelectTrigger aria-label="Filter by date">
                                <SelectValue placeholder="All dates" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="ALL">All dates</SelectItem>

                                {availableDates.map((date) => (
                                    <SelectItem key={date} value={date}>
                                        {formatDate(date)}
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
                                    <TableHead className="pl-6">Student</TableHead>
                                    <TableHead>Course</TableHead>
                                    <TableHead>Instructor</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Check-in</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="pr-6 text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {filteredRecords.length > 0 ? (
                                    filteredRecords.map((record) => (
                                        <TableRow key={record.id}>
                                            {/* Student */}
                                            <TableCell className="min-w-[210px] pl-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                                                        {record.studentName
                                                            .split(" ")
                                                            .map((part) => part[0])
                                                            .slice(0, 2)
                                                            .join("")
                                                            .toUpperCase()}
                                                    </div>

                                                    <div className="min-w-0">
                                                        <p className="font-medium">
                                                            {record.studentName}
                                                        </p>

                                                        <p className="text-xs text-muted-foreground">
                                                            {record.studentId}
                                                        </p>
                                                    </div>
                                                </div>
                                            </TableCell>

                                            {/* Course */}
                                            <TableCell className="min-w-[200px]">
                                                <div className="flex items-start gap-2">
                                                    <ClipboardCheck className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                                                    <div className="min-w-0">
                                                        <p className="font-medium">
                                                            {record.courseCode}
                                                        </p>

                                                        <p className="max-w-[220px] text-xs text-muted-foreground">
                                                            {record.courseName}
                                                        </p>
                                                    </div>
                                                </div>
                                            </TableCell>

                                            <TableCell className="min-w-[150px] text-sm">
                                                {record.instructor}
                                            </TableCell>

                                            <TableCell className="whitespace-nowrap text-sm">
                                                {formatDate(record.date)}
                                            </TableCell>

                                            <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                                                {record.checkIn}
                                            </TableCell>

                                            {/* Status */}
                                            <TableCell>
                                                <Badge
                                                    variant="outline"
                                                    className={statusConfig[record.status].className}
                                                >
                                                    {statusConfig[record.status].label}
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
                                                                aria-label={`Actions for ${record.studentName}`}
                                                            >
                                                                <Ellipsis className="size-4" />
                                                            </Button>
                                                        }
                                                    />

                                                    <DropdownMenuContent align="end">
                                                        {record.status !== "PRESENT" && (
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    updateStatus(record.id, "PRESENT")
                                                                }
                                                            >
                                                                <CheckCircle2 className="mr-2 size-4" />
                                                                Mark present
                                                            </DropdownMenuItem>
                                                        )}

                                                        {record.status !== "ABSENT" && (
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    updateStatus(record.id, "ABSENT")
                                                                }
                                                            >
                                                                <UserX className="mr-2 size-4" />
                                                                Mark absent
                                                            </DropdownMenuItem>
                                                        )}

                                                        {record.status !== "LATE" && (
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    updateStatus(record.id, "LATE")
                                                                }
                                                            >
                                                                <Clock3 className="mr-2 size-4" />
                                                                Mark late
                                                            </DropdownMenuItem>
                                                        )}

                                                        {record.status !== "EXCUSED" && (
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    updateStatus(record.id, "EXCUSED")
                                                                }
                                                            >
                                                                <CalendarDays className="mr-2 size-4" />
                                                                Mark excused
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
                                                    No attendance records found
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

                    {/* Footer */}
                    <div className="flex flex-col gap-2 border-t px-6 py-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                        <p>
                            Showing {filteredRecords.length} of {records.length}{" "}
                            attendance records
                        </p>

                        <p>CampusFlow UMS · Academic Management</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
