"use client";

import React, { useMemo, useState } from "react";
import {
    MoreHorizontal,
    Eye,
    Pencil,
    Search,
    CalendarDays,
    Clock3,
    FileText,
    CheckCircle2,
    XCircle,
    AlertCircle,
    Plus,
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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Badge } from "@/components/ui/badge";

type ExamStatus = "SCHEDULED" | "ONGOING" | "COMPLETED" | "CANCELLED";

type Exam = {
    id: string;
    title: string;
    examType: string;
    courseCode: string;
    courseTitle: string;
    term: string;
    date: string;
    startTime: string;
    endTime: string;
    totalMarks: number;
    passMarks: number;
    duration: string;
    status: ExamStatus;
};

const exams: Exam[] = [
    {
        id: "EXM-001",
        title: "Midterm Examination",
        examType: "MIDTERM",
        courseCode: "CSE-101",
        courseTitle: "Introduction to Programming",
        term: "Fall 2026",
        date: "2026-10-15",
        startTime: "10:00 AM",
        endTime: "12:00 PM",
        totalMarks: 100,
        passMarks: 40,
        duration: "2 Hours",
        status: "SCHEDULED",
    },
    {
        id: "EXM-002",
        title: "Midterm Examination",
        examType: "MIDTERM",
        courseCode: "MAT-201",
        courseTitle: "Linear Algebra",
        term: "Fall 2026",
        date: "2026-10-17",
        startTime: "02:00 PM",
        endTime: "04:00 PM",
        totalMarks: 100,
        passMarks: 40,
        duration: "2 Hours",
        status: "SCHEDULED",
    },
    {
        id: "EXM-003",
        title: "Class Test - 01",
        examType: "CLASS_TEST",
        courseCode: "EEE-211",
        courseTitle: "Digital Electronics",
        term: "Fall 2026",
        date: "2026-10-20",
        startTime: "11:00 AM",
        endTime: "12:00 PM",
        totalMarks: 50,
        passMarks: 20,
        duration: "1 Hour",
        status: "ONGOING",
    },
    {
        id: "EXM-004",
        title: "Final Examination",
        examType: "FINAL",
        courseCode: "CSE-301",
        courseTitle: "Database Management Systems",
        term: "Summer 2026",
        date: "2026-09-25",
        startTime: "10:00 AM",
        endTime: "01:00 PM",
        totalMarks: 100,
        passMarks: 40,
        duration: "3 Hours",
        status: "COMPLETED",
    },
    {
        id: "EXM-005",
        title: "Quiz - 02",
        examType: "QUIZ",
        courseCode: "CSE-205",
        courseTitle: "Data Structures",
        term: "Fall 2026",
        date: "2026-10-22",
        startTime: "09:00 AM",
        endTime: "09:30 AM",
        totalMarks: 20,
        passMarks: 8,
        duration: "30 Minutes",
        status: "SCHEDULED",
    },
    {
        id: "EXM-006",
        title: "Final Examination",
        examType: "FINAL",
        courseCode: "BBA-305",
        courseTitle: "Financial Management",
        term: "Summer 2026",
        date: "2026-09-20",
        startTime: "02:00 PM",
        endTime: "05:00 PM",
        totalMarks: 100,
        passMarks: 40,
        duration: "3 Hours",
        status: "COMPLETED",
    },
];

const statusConfig: Record<
    ExamStatus,
    {
        label: string;
        className: string;
        icon: React.ElementType;
    }
> = {
    SCHEDULED: {
        label: "Scheduled",
        className:
            "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900",
        icon: CalendarDays,
    },
    ONGOING: {
        label: "Ongoing",
        className:
            "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900",
        icon: Clock3,
    },
    COMPLETED: {
        label: "Completed",
        className:
            "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900",
        icon: CheckCircle2,
    },
    CANCELLED: {
        label: "Cancelled",
        className:
            "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900",
        icon: XCircle,
    },
};

export default function Exams() {
    const [searchTerm, setSearchTerm] = useState("");
    const [examType, setExamType] = useState("ALL");
    const [term, setTerm] = useState("ALL");
    const [status, setStatus] = useState("ALL");

    const filteredExams = useMemo(() => {
        return exams.filter((exam) => {
            const search = searchTerm.toLowerCase();

            const matchesSearch =
                !search ||
                exam.title.toLowerCase().includes(search) ||
                exam.courseCode.toLowerCase().includes(search) ||
                exam.courseTitle.toLowerCase().includes(search);

            const matchesType =
                examType === "ALL" || exam.examType === examType;

            const matchesTerm = term === "ALL" || exam.term === term;

            const matchesStatus =
                status === "ALL" || exam.status === status;

            return (
                matchesSearch &&
                matchesType &&
                matchesTerm &&
                matchesStatus
            );
        });
    }, [searchTerm, examType, term, status]);

    const getExamTypeLabel = (type: string) => {
        switch (type) {
            case "MIDTERM":
                return "Midterm";
            case "FINAL":
                return "Final";
            case "CLASS_TEST":
                return "Class Test";
            case "QUIZ":
                return "Quiz";
            case "ASSIGNMENT":
                return "Assignment";
            case "VIVA":
                return "Viva";
            default:
                return type;
        }
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <div className="space-y-6 p-3">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                            <FileText className="size-5 text-primary" />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">
                                Exams
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Manage examinations, schedules, and marks configuration.
                            </p>
                        </div>
                    </div>
                </div>

                <Button className="gap-2">
                    <Plus className="size-4" />
                    Create Exam
                </Button>
            </div>

            {/* Summary Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border bg-card p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Total Exams
                            </p>
                            <p className="mt-1 text-2xl font-bold">
                                {exams.length}
                            </p>
                        </div>

                        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                            <FileText className="size-5 text-primary" />
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border bg-card p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Scheduled
                            </p>
                            <p className="mt-1 text-2xl font-bold">
                                {exams.filter((exam) => exam.status === "SCHEDULED").length}
                            </p>
                        </div>

                        <div className="flex size-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/30">
                            <CalendarDays className="size-5 text-blue-600 dark:text-blue-400" />
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border bg-card p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Ongoing
                            </p>
                            <p className="mt-1 text-2xl font-bold">
                                {exams.filter((exam) => exam.status === "ONGOING").length}
                            </p>
                        </div>

                        <div className="flex size-10 items-center justify-center rounded-lg bg-amber-50 dark:bg-amber-950/30">
                            <Clock3 className="size-5 text-amber-600 dark:text-amber-400" />
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border bg-card p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Completed
                            </p>
                            <p className="mt-1 text-2xl font-bold">
                                {exams.filter((exam) => exam.status === "COMPLETED").length}
                            </p>
                        </div>

                        <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/30">
                            <CheckCircle2 className="size-5 text-emerald-600 dark:text-emerald-400" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="rounded-xl border bg-card p-4 shadow-sm">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                    {/* Search */}
                    <div className="relative min-w-0 flex-1">
                        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                        <Input
                            placeholder="Search by exam, course code or title..."
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            className="pl-9"
                        />
                    </div>

                    {/* Exam Type */}
                    <Select value={examType} onValueChange={(value) => setExamType(value ?? "ALL")}>
                        <SelectTrigger className="w-full lg:w-[170px]">
                            <SelectValue placeholder="Exam Type" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="ALL">All Exam Types</SelectItem>
                            <SelectItem value="MIDTERM">Midterm</SelectItem>
                            <SelectItem value="FINAL">Final</SelectItem>
                            <SelectItem value="CLASS_TEST">Class Test</SelectItem>
                            <SelectItem value="QUIZ">Quiz</SelectItem>
                            <SelectItem value="ASSIGNMENT">Assignment</SelectItem>
                            <SelectItem value="VIVA">Viva</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Term */}
                    <Select value={term} onValueChange={(value) => setTerm(value ?? "ALL")}>
                        <SelectTrigger className="w-full lg:w-[150px]">
                            <SelectValue placeholder="Term" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="ALL">All Terms</SelectItem>
                            <SelectItem value="Fall 2026">Fall 2026</SelectItem>
                            <SelectItem value="Summer 2026">Summer 2026</SelectItem>
                            <SelectItem value="Spring 2026">Spring 2026</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Status */}
                    <Select value={status} onValueChange={(value) => setStatus(value ?? "ALL")}>
                        <SelectTrigger className="w-full lg:w-[150px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="ALL">All Status</SelectItem>
                            <SelectItem value="SCHEDULED">Scheduled</SelectItem>
                            <SelectItem value="ONGOING">Ongoing</SelectItem>
                            <SelectItem value="COMPLETED">Completed</SelectItem>
                            <SelectItem value="CANCELLED">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Exam</TableHead>
                                <TableHead>Course</TableHead>
                                <TableHead>Term</TableHead>
                                <TableHead>Schedule</TableHead>
                                <TableHead>Marks</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="w-[60px] text-right">
                                    Action
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {filteredExams.length > 0 ? (
                                filteredExams.map((exam) => {
                                    const config = statusConfig[exam.status];
                                    const StatusIcon = config.icon;

                                    return (
                                        <TableRow key={exam.id}>
                                            {/* Exam */}
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                                                        <FileText className="size-4 text-muted-foreground" />
                                                    </div>

                                                    <div className="min-w-0">
                                                        <p className="font-medium">
                                                            {exam.title}
                                                        </p>

                                                        <p className="text-xs text-muted-foreground">
                                                            {exam.id} •{" "}
                                                            {getExamTypeLabel(exam.examType)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </TableCell>

                                            {/* Course */}
                                            <TableCell>
                                                <div>
                                                    <p className="font-medium">
                                                        {exam.courseCode}
                                                    </p>

                                                    <p className="max-w-[220px] truncate text-xs text-muted-foreground">
                                                        {exam.courseTitle}
                                                    </p>
                                                </div>
                                            </TableCell>

                                            {/* Term */}
                                            <TableCell>
                                                <span className="text-sm">
                                                    {exam.term}
                                                </span>
                                            </TableCell>

                                            {/* Schedule */}
                                            <TableCell>
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-1.5 text-sm">
                                                        <CalendarDays className="size-3.5 text-muted-foreground" />
                                                        {formatDate(exam.date)}
                                                    </div>

                                                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                                        <Clock3 className="size-3.5" />
                                                        {exam.startTime} – {exam.endTime}
                                                    </div>

                                                    <p className="text-xs text-muted-foreground">
                                                        {exam.duration}
                                                    </p>
                                                </div>
                                            </TableCell>

                                            {/* Marks */}
                                            <TableCell>
                                                <div>
                                                    <p className="font-medium">
                                                        {exam.totalMarks} Marks
                                                    </p>

                                                    <p className="text-xs text-muted-foreground">
                                                        Pass: {exam.passMarks}
                                                    </p>
                                                </div>
                                            </TableCell>

                                            {/* Status */}
                                            <TableCell>
                                                <Badge
                                                    variant="outline"
                                                    className={`gap-1.5 ${config.className}`}
                                                >
                                                    <StatusIcon className="size-3.5" />
                                                    {config.label}
                                                </Badge>
                                            </TableCell>

                                            {/* Actions */}
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger render={<Button
                                                        variant="ghost"
                                                        size="icon"
                                                        aria-label="Exam actions"
                                                    >
                                                        <MoreHorizontal className="size-4" />
                                                    </Button>}>

                                                    </DropdownMenuTrigger>

                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>
                                                            <Eye className="mr-2 size-4" />
                                                            View Details
                                                        </DropdownMenuItem>

                                                        <DropdownMenuItem>
                                                            <Pencil className="mr-2 size-4" />
                                                            Edit Exam
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="h-32 text-center"
                                    >
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <AlertCircle className="size-6 text-muted-foreground" />

                                            <div>
                                                <p className="font-medium">
                                                    No exams found
                                                </p>

                                                <p className="text-sm text-muted-foreground">
                                                    Try changing your search or filters.
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Table Footer */}
                <div className="flex items-center justify-between border-t px-4 py-3">
                    <p className="text-sm text-muted-foreground">
                        Showing{" "}
                        <span className="font-medium text-foreground">
                            {filteredExams.length}
                        </span>{" "}
                        of{" "}
                        <span className="font-medium text-foreground">
                            {exams.length}
                        </span>{" "}
                        exams
                    </p>
                </div>
            </div>
        </div>
    );
}