// import React from 'react'

// export default function examinations() {
//   return (
//     <div>examinations</div>
//   )
// }





















"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
    CalendarDays,
    Clock3,
    Search,
    Plus,
    Download,
    FileText,
    BookOpen,
    Users,
    CheckCircle2,
    AlertCircle,
    MoreHorizontal,
    Eye,
    Pencil,
    Filter,
    GraduationCap,
    MapPin,
    ClipboardCheck,
    XCircle,
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
import {
    Badge,
} from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ExaminationStatus =
    | "UPCOMING"
    | "ONGOING"
    | "COMPLETED"
    | "DRAFT"
    | "CANCELLED";

type ExaminationType =
    | "MIDTERM"
    | "FINAL"
    | "QUIZ"
    | "PRACTICAL"
    | "VIVA";

type Examination = {
    id: string;
    title: string;
    courseCode: string;
    courseName: string;
    type: ExaminationType;
    semester: string;
    date: string;
    startTime: string;
    endTime: string;
    room: string;
    instructor: string;
    students: number;
    status: ExaminationStatus;
};

const initialExaminations: Examination[] = [
    {
        id: "EXM-001",
        title: "Data Structures Midterm",
        courseCode: "CSE-201",
        courseName: "Data Structures & Algorithms",
        type: "MIDTERM",
        semester: "Spring 2026",
        date: "2026-11-10",
        startTime: "09:00",
        endTime: "11:00",
        room: "Room 301",
        instructor: "Dr. Rahman",
        students: 48,
        status: "UPCOMING",
    },
    {
        id: "EXM-002",
        title: "Database Systems Final",
        courseCode: "CSE-301",
        courseName: "Database Management Systems",
        type: "FINAL",
        semester: "Spring 2026",
        date: "2026-11-12",
        startTime: "10:00",
        endTime: "13:00",
        room: "Lab 02",
        instructor: "Prof. Karim",
        students: 42,
        status: "UPCOMING",
    },
    {
        id: "EXM-003",
        title: "Programming Quiz 03",
        courseCode: "CSE-101",
        courseName: "Introduction to Programming",
        type: "QUIZ",
        semester: "Fall 2026",
        date: "2026-11-07",
        startTime: "11:00",
        endTime: "12:00",
        room: "Room 204",
        instructor: "Mr. Hasan",
        students: 55,
        status: "ONGOING",
    },
    {
        id: "EXM-004",
        title: "Computer Networks Practical",
        courseCode: "CSE-401",
        courseName: "Computer Networks",
        type: "PRACTICAL",
        semester: "Fall 2026",
        date: "2026-10-28",
        startTime: "09:00",
        endTime: "12:00",
        room: "Networking Lab",
        instructor: "Dr. Ahmed",
        students: 36,
        status: "COMPLETED",
    },
    {
        id: "EXM-005",
        title: "Software Engineering Viva",
        courseCode: "CSE-402",
        courseName: "Software Engineering",
        type: "VIVA",
        semester: "Fall 2026",
        date: "2026-11-18",
        startTime: "13:00",
        endTime: "15:00",
        room: "Room 402",
        instructor: "Dr. Rahman",
        students: 32,
        status: "DRAFT",
    },
    {
        id: "EXM-006",
        title: "Operating Systems Midterm",
        courseCode: "CSE-302",
        courseName: "Operating Systems",
        type: "MIDTERM",
        semester: "Fall 2026",
        date: "2026-10-20",
        startTime: "10:00",
        endTime: "12:00",
        room: "Room 305",
        instructor: "Mr. Hasan",
        students: 40,
        status: "COMPLETED",
    },
    {
        id: "EXM-007",
        title: "Computer Graphics Quiz",
        courseCode: "CSE-403",
        courseName: "Computer Graphics",
        type: "QUIZ",
        semester: "Fall 2026",
        date: "2026-11-20",
        startTime: "09:00",
        endTime: "10:00",
        room: "Room 205",
        instructor: "Ms. Nabila",
        students: 30,
        status: "CANCELLED",
    },
];

const statusConfig: Record<
    ExaminationStatus,
    { label: string; className: string }
> = {
    UPCOMING: {
        label: "Upcoming",
        className: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    },
    ONGOING: {
        label: "Ongoing",
        className: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    },
    COMPLETED: {
        label: "Completed",
        className: "bg-green-500/10 text-green-600 border-green-500/20",
    },
    DRAFT: {
        label: "Draft",
        className: "bg-muted text-muted-foreground border-border",
    },
    CANCELLED: {
        label: "Cancelled",
        className: "bg-red-500/10 text-red-600 border-red-500/20",
    },
};

const typeLabels: Record<ExaminationType, string> = {
    MIDTERM: "Midterm",
    FINAL: "Final",
    QUIZ: "Quiz",
    PRACTICAL: "Practical",
    VIVA: "Viva",
};

function formatDate(date: string) {
    return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

function formatTime(time: string) {
    return new Date(`2000-01-01T${time}:00`).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
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

function StatusBadge({ status }: { status: ExaminationStatus }) {
    const config = statusConfig[status];

    return (
        <Badge variant="outline" className={config.className}>
            {config.label}
        </Badge>
    );
}

export default function ExaminationsPage() {
    const [examinations] = useState(initialExaminations);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [typeFilter, setTypeFilter] = useState("ALL");
    const [semesterFilter, setSemesterFilter] = useState("ALL");

    const filteredExaminations = useMemo(() => {
        return examinations.filter((exam) => {
            const searchMatch = [
                exam.title,
                exam.courseCode,
                exam.courseName,
                exam.instructor,
                exam.room,
            ]
                .join(" ")
                .toLowerCase()
                .includes(search.toLowerCase());

            const statusMatch =
                statusFilter === "ALL" || exam.status === statusFilter;

            const typeMatch =
                typeFilter === "ALL" || exam.type === typeFilter;

            const semesterMatch =
                semesterFilter === "ALL" || exam.semester === semesterFilter;

            return searchMatch && statusMatch && typeMatch && semesterMatch;
        });
    }, [examinations, search, statusFilter, typeFilter, semesterFilter]);

    const stats = useMemo(() => {
        return {
            total: examinations.length,
            upcoming: examinations.filter((e) => e.status === "UPCOMING").length,
            ongoing: examinations.filter((e) => e.status === "ONGOING").length,
            completed: examinations.filter((e) => e.status === "COMPLETED").length,
            students: examinations
                .filter((e) => e.status !== "CANCELLED")
                .reduce((sum, e) => sum + e.students, 0),
        };
    }, [examinations]);

    const exportCSV = () => {
        const headers = [
            "Examination ID",
            "Title",
            "Course Code",
            "Course",
            "Type",
            "Semester",
            "Date",
            "Start Time",
            "End Time",
            "Room",
            "Instructor",
            "Students",
            "Status",
        ];

        const rows = filteredExaminations.map((exam) => [
            exam.id,
            exam.title,
            exam.courseCode,
            exam.courseName,
            typeLabels[exam.type],
            exam.semester,
            exam.date,
            exam.startTime,
            exam.endTime,
            exam.room,
            exam.instructor,
            exam.students,
            exam.status,
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
        link.download = "campusflow-examinations.csv";
        link.click();

        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-6 p-4 md:p-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
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
                        <span className="text-foreground">Examinations</span>
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                        Examinations
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Manage examination schedules, courses, and student assessments.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" onClick={exportCSV}>
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>

                    <Button render={
                        <Link href="/department-head/academics/examinations/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Schedule Exam
                        </Link>
                    }>

                    </Button>
                </div>
            </div>

            {/* Statistics */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    title="Total Examinations"
                    value={stats.total}
                    description="Across all semesters"
                    icon={ClipboardCheck}
                />
                <StatCard
                    title="Upcoming"
                    value={stats.upcoming}
                    description="Scheduled examinations"
                    icon={CalendarDays}
                />
                <StatCard
                    title="Ongoing"
                    value={stats.ongoing}
                    description="Currently in progress"
                    icon={Clock3}
                />
                <StatCard
                    title="Completed"
                    value={stats.completed}
                    description="Successfully conducted"
                    icon={CheckCircle2}
                />
            </div>

            {/* Overview */}
            <div className="grid gap-4 lg:grid-cols-3">
                <Card className="shadow-none lg:col-span-2">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base">Examination Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 sm:grid-cols-3">
                            <div className="rounded-lg border p-4">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Users className="h-4 w-4" />
                                    <span className="text-xs">Student Enrollments</span>
                                </div>
                                <p className="mt-3 text-2xl font-bold">{stats.students}</p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    Across non-cancelled exams
                                </p>
                            </div>

                            <div className="rounded-lg border p-4">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <BookOpen className="h-4 w-4" />
                                    <span className="text-xs">Exam Types</span>
                                </div>
                                <p className="mt-3 text-2xl font-bold">
                                    {new Set(examinations.map((e) => e.type)).size}
                                </p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    Assessment categories
                                </p>
                            </div>

                            <div className="rounded-lg border p-4">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <GraduationCap className="h-4 w-4" />
                                    <span className="text-xs">Semesters</span>
                                </div>
                                <p className="mt-3 text-2xl font-bold">
                                    {new Set(examinations.map((e) => e.semester)).size}
                                </p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    Active academic periods
                                </p>
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
                            render={<Link href="/department-head/academics/examinations/create">
                                <Plus className="mr-2 h-4 w-4" />
                                Schedule New Examination
                            </Link>}
                        >

                        </Button>

                        <Button
                            variant="outline"
                            className="w-full justify-start"
                            render={<Link href="/department-head/academics/examinations/results">
                                <FileText className="mr-2 h-4 w-4" />
                                Examination Results
                            </Link>}
                        >

                        </Button>

                        <Button
                            variant="outline"
                            className="w-full justify-start"
                            render={
                                <Link href="/department-head/academics/examinations/reports">
                                    <ClipboardCheck className="mr-2 h-4 w-4" />
                                    Examination Reports
                                </Link>
                            }
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
                                placeholder="Search by exam, course, instructor, or room..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-9"
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 xl:w-auto">
                            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value ?? "ALL")}>
                                <SelectTrigger className="w-full sm:w-[145px]">
                                    <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ALL">All Status</SelectItem>
                                    <SelectItem value="UPCOMING">Upcoming</SelectItem>
                                    <SelectItem value="ONGOING">Ongoing</SelectItem>
                                    <SelectItem value="COMPLETED">Completed</SelectItem>
                                    <SelectItem value="DRAFT">Draft</SelectItem>
                                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value ?? "ALL")}>
                                <SelectTrigger className="w-full sm:w-[145px]">
                                    <SelectValue placeholder="Exam Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ALL">All Types</SelectItem>
                                    <SelectItem value="MIDTERM">Midterm</SelectItem>
                                    <SelectItem value="FINAL">Final</SelectItem>
                                    <SelectItem value="QUIZ">Quiz</SelectItem>
                                    <SelectItem value="PRACTICAL">Practical</SelectItem>
                                    <SelectItem value="VIVA">Viva</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select
                                value={semesterFilter}
                                onValueChange={(value) => setSemesterFilter(value ?? "ALL")}
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
                        </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                            Showing {filteredExaminations.length} of {examinations.length}{" "}
                            examinations
                        </span>
                        {(search ||
                            statusFilter !== "ALL" ||
                            typeFilter !== "ALL" ||
                            semesterFilter !== "ALL") && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 px-2"
                                    onClick={() => {
                                        setSearch("");
                                        setStatusFilter("ALL");
                                        setTypeFilter("ALL");
                                        setSemesterFilter("ALL");
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
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-base">Examination Schedule</CardTitle>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage your department&apos;s examination calendar.
                        </p>
                    </div>
                    <Badge variant="secondary">
                        {filteredExaminations.length} Records
                    </Badge>
                </CardHeader>

                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b text-left text-muted-foreground">
                                    <th className="px-3 py-3 font-medium">Examination</th>
                                    <th className="px-3 py-3 font-medium">Date & Time</th>
                                    <th className="px-3 py-3 font-medium">Room</th>
                                    <th className="px-3 py-3 font-medium">Instructor</th>
                                    <th className="px-3 py-3 font-medium">Students</th>
                                    <th className="px-3 py-3 font-medium">Status</th>
                                    <th className="px-3 py-3 text-right font-medium">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredExaminations.map((exam) => (
                                    <tr
                                        key={exam.id}
                                        className="border-b last:border-0 transition-colors hover:bg-muted/40"
                                    >
                                        <td className="px-3 py-4">
                                            <div className="font-medium">{exam.title}</div>
                                            <div className="mt-1 text-xs text-muted-foreground">
                                                {exam.courseCode} · {exam.courseName}
                                            </div>
                                            <div className="mt-1 flex flex-wrap gap-1.5">
                                                <Badge variant="outline" className="text-[10px]">
                                                    {typeLabels[exam.type]}
                                                </Badge>
                                                <span className="text-[10px] text-muted-foreground">
                                                    {exam.semester}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="px-3 py-4">
                                            <div className="flex items-center gap-2">
                                                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                                                {formatDate(exam.date)}
                                            </div>
                                            <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                                                <Clock3 className="h-3.5 w-3.5" />
                                                {formatTime(exam.startTime)} -{" "}
                                                {formatTime(exam.endTime)}
                                            </div>
                                        </td>

                                        <td className="px-3 py-4">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                                {exam.room}
                                            </div>
                                        </td>

                                        <td className="px-3 py-4">{exam.instructor}</td>

                                        <td className="px-3 py-4">
                                            <div className="flex items-center gap-2">
                                                <Users className="h-4 w-4 text-muted-foreground" />
                                                {exam.students}
                                            </div>
                                        </td>

                                        <td className="px-3 py-4">
                                            <StatusBadge status={exam.status} />
                                        </td>

                                        <td className="px-3 py-4 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger render={<Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>}>

                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem render={
                                                        <Link
                                                            href={`/department-head/academics/examinations/${exam.id}`}
                                                        >
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            View Details
                                                        </Link>
                                                    }>

                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem render={<Link
                                                        href={`/department-head/academics/examinations/${exam.id}/edit`}
                                                    >
                                                        <Pencil className="mr-2 h-4 w-4" />
                                                        Edit Examination
                                                    </Link>}>

                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {filteredExaminations.length === 0 && (
                            <div className="py-12 text-center">
                                <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground" />
                                <p className="mt-3 font-medium">No examinations found</p>
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
                    <h2 className="font-semibold">Examination Schedule</h2>
                    <Badge variant="secondary">
                        {filteredExaminations.length} Records
                    </Badge>
                </div>

                {filteredExaminations.map((exam) => (
                    <Card key={exam.id} className="shadow-none">
                        <CardContent className="space-y-3 p-4">
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <h3 className="font-semibold">{exam.title}</h3>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {exam.courseCode} · {exam.courseName}
                                    </p>
                                </div>
                                <StatusBadge status={exam.status} />
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <Badge variant="outline">{typeLabels[exam.type]}</Badge>
                                <Badge variant="secondary">{exam.semester}</Badge>
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <p className="text-xs text-muted-foreground">Date</p>
                                    <p className="mt-1 flex items-center gap-1.5">
                                        <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
                                        {formatDate(exam.date)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Time</p>
                                    <p className="mt-1 flex items-center gap-1.5">
                                        <Clock3 className="h-3.5 w-3.5 text-muted-foreground" />
                                        {formatTime(exam.startTime)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Room</p>
                                    <p className="mt-1 flex items-center gap-1.5">
                                        <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                                        {exam.room}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Students</p>
                                    <p className="mt-1 flex items-center gap-1.5">
                                        <Users className="h-3.5 w-3.5 text-muted-foreground" />
                                        {exam.students}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between border-t pt-3">
                                <p className="text-xs text-muted-foreground">
                                    {exam.instructor}
                                </p>
                                <Button size="sm" variant="outline" render={
                                    <Link
                                        href={`/department-head/academics/examinations/${exam.id}`}
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

                {filteredExaminations.length === 0 && (
                    <Card className="shadow-none">
                        <CardContent className="py-10 text-center">
                            <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground" />
                            <p className="mt-3 font-medium">No examinations found</p>
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
