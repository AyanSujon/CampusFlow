// import React from 'react'

// export default function schedule() {
//     return (
//         <div>Class Schedule</div>
//     )
// }














"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    ArrowRight,
    CalendarDays,
    Clock3,
    MapPin,
    Plus,
    Search,
    Users,
    BookOpen,
    GraduationCap,
    CalendarCheck,
    UserRound,
    ChevronLeft,
    ChevronRight,
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

type ClassSession = {
    id: string;
    courseCode: string;
    courseName: string;
    instructor: string;
    program: string;
    semester: string;
    day: string;
    startTime: string;
    endTime: string;
    room: string;
    section: string;
    students: number;
    type: "LECTURE" | "LAB" | "TUTORIAL";
};

const days = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
];

const timeSlots = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
];

const scheduleData: ClassSession[] = [
    {
        id: "1",
        courseCode: "CSE-101",
        courseName: "Introduction to Computer Science",
        instructor: "Dr. Rahman",
        program: "BSc in Computer Science",
        semester: "Fall 2026",
        day: "Saturday",
        startTime: "09:00",
        endTime: "10:00",
        room: "Room 301",
        section: "A",
        students: 42,
        type: "LECTURE",
    },
    {
        id: "2",
        courseCode: "CSE-201",
        courseName: "Data Structures & Algorithms",
        instructor: "Md. Hasan",
        program: "BSc in Computer Science",
        semester: "Fall 2026",
        day: "Saturday",
        startTime: "11:00",
        endTime: "12:00",
        room: "Room 302",
        section: "A",
        students: 48,
        type: "LECTURE",
    },
    {
        id: "3",
        courseCode: "SWE-201",
        courseName: "Web Application Development",
        instructor: "Ayesha Akter",
        program: "BSc in Software Engineering",
        semester: "Fall 2026",
        day: "Sunday",
        startTime: "10:00",
        endTime: "12:00",
        room: "Computer Lab 1",
        section: "A",
        students: 28,
        type: "LAB",
    },
    {
        id: "4",
        courseCode: "CSE-301",
        courseName: "Database Management Systems",
        instructor: "Nusrat Jahan",
        program: "BSc in Computer Science",
        semester: "Fall 2026",
        day: "Sunday",
        startTime: "13:00",
        endTime: "14:00",
        room: "Room 303",
        section: "B",
        students: 35,
        type: "LECTURE",
    },
    {
        id: "5",
        courseCode: "CSE-201",
        courseName: "Data Structures & Algorithms",
        instructor: "Md. Hasan",
        program: "BSc in Computer Science",
        semester: "Fall 2026",
        day: "Monday",
        startTime: "09:00",
        endTime: "10:00",
        room: "Room 302",
        section: "A",
        students: 48,
        type: "LECTURE",
    },
    {
        id: "6",
        courseCode: "CSE-101",
        courseName: "Introduction to Computer Science",
        instructor: "Dr. Rahman",
        program: "BSc in Computer Science",
        semester: "Fall 2026",
        day: "Monday",
        startTime: "11:00",
        endTime: "12:00",
        room: "Room 301",
        section: "A",
        students: 42,
        type: "TUTORIAL",
    },
    {
        id: "7",
        courseCode: "CSE-301",
        courseName: "Database Management Systems",
        instructor: "Nusrat Jahan",
        program: "BSc in Computer Science",
        semester: "Fall 2026",
        day: "Tuesday",
        startTime: "10:00",
        endTime: "11:00",
        room: "Room 303",
        section: "B",
        students: 35,
        type: "LECTURE",
    },
    {
        id: "8",
        courseCode: "SWE-201",
        courseName: "Web Application Development",
        instructor: "Ayesha Akter",
        program: "BSc in Software Engineering",
        semester: "Fall 2026",
        day: "Tuesday",
        startTime: "14:00",
        endTime: "16:00",
        room: "Computer Lab 1",
        section: "A",
        students: 28,
        type: "LAB",
    },
    {
        id: "9",
        courseCode: "CSE-101",
        courseName: "Introduction to Computer Science",
        instructor: "Dr. Rahman",
        program: "BSc in Computer Science",
        semester: "Fall 2026",
        day: "Wednesday",
        startTime: "09:00",
        endTime: "10:00",
        room: "Room 301",
        section: "A",
        students: 42,
        type: "LECTURE",
    },
    {
        id: "10",
        courseCode: "CSE-201",
        courseName: "Data Structures & Algorithms",
        instructor: "Md. Hasan",
        program: "BSc in Computer Science",
        semester: "Fall 2026",
        day: "Thursday",
        startTime: "11:00",
        endTime: "12:00",
        room: "Room 302",
        section: "A",
        students: 48,
        type: "TUTORIAL",
    },
];

const typeStyles = {
    LECTURE:
        "border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-400",
    LAB:
        "border-violet-500/20 bg-violet-500/10 text-violet-700 dark:text-violet-400",
    TUTORIAL:
        "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400",
};

const typeCardStyles = {
    LECTURE: "border-l-blue-500 bg-blue-500/5",
    LAB: "border-l-violet-500 bg-violet-500/5",
    TUTORIAL: "border-l-amber-500 bg-amber-500/5",
};

function formatTime(time: string) {
    const [hour, minute] = time.split(":").map(Number);
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;

    return `${formattedHour}:${String(minute).padStart(2, "0")} ${period}`;
}

function getDuration(start: string, end: string) {
    const [startHour, startMinute] = start.split(":").map(Number);
    const [endHour, endMinute] = end.split(":").map(Number);

    const minutes =
        endHour * 60 + endMinute - (startHour * 60 + startMinute);

    if (minutes <= 0) return "Invalid duration";

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours && remainingMinutes) {
        return `${hours}h ${remainingMinutes}m`;
    }

    if (hours) return `${hours}h`;

    return `${remainingMinutes}m`;
}

export default function SchedulePage() {
    const [selectedDay, setSelectedDay] = useState("Saturday");
    const [selectedSemester, setSelectedSemester] = useState("Fall 2026");
    const [selectedProgram, setSelectedProgram] = useState("ALL");
    const [selectedType, setSelectedType] = useState("ALL");
    const [search, setSearch] = useState("");

    const programs = [
        ...new Set(scheduleData.map((session) => session.program)),
    ];

    const semesters = [
        ...new Set(scheduleData.map((session) => session.semester)),
    ];

    const filteredSchedule = useMemo(() => {
        const searchValue = search.toLowerCase();

        return scheduleData.filter((session) => {
            const matchesDay = session.day === selectedDay;

            const matchesSemester =
                selectedSemester === "ALL" ||
                session.semester === selectedSemester;

            const matchesProgram =
                selectedProgram === "ALL" ||
                session.program === selectedProgram;

            const matchesType =
                selectedType === "ALL" || session.type === selectedType;

            const matchesSearch =
                session.courseName.toLowerCase().includes(searchValue) ||
                session.courseCode.toLowerCase().includes(searchValue) ||
                session.instructor.toLowerCase().includes(searchValue) ||
                session.room.toLowerCase().includes(searchValue);

            return (
                matchesDay &&
                matchesSemester &&
                matchesProgram &&
                matchesType &&
                matchesSearch
            );
        });
    }, [
        selectedDay,
        selectedSemester,
        selectedProgram,
        selectedType,
        search,
    ]);

    const allFilteredSessions = useMemo(() => {
        return scheduleData.filter((session) => {
            const matchesSemester =
                selectedSemester === "ALL" ||
                session.semester === selectedSemester;

            const matchesProgram =
                selectedProgram === "ALL" ||
                session.program === selectedProgram;

            const matchesType =
                selectedType === "ALL" || session.type === selectedType;

            return matchesSemester && matchesProgram && matchesType;
        });
    }, [selectedSemester, selectedProgram, selectedType]);

    const todaySessions = filteredSchedule.length;

    const totalStudents = filteredSchedule.reduce(
        (sum, session) => sum + session.students,
        0,
    );

    const uniqueInstructors = new Set(
        filteredSchedule.map((session) => session.instructor),
    ).size;

    const lectureCount = filteredSchedule.filter(
        (session) => session.type === "LECTURE",
    ).length;

    const goToPreviousDay = () => {
        const currentIndex = days.indexOf(selectedDay);
        const previousIndex = (currentIndex - 1 + days.length) % days.length;
        setSelectedDay(days[previousIndex]);
    };

    const goToNextDay = () => {
        const currentIndex = days.indexOf(selectedDay);
        const nextIndex = (currentIndex + 1) % days.length;
        setSelectedDay(days[nextIndex]);
    };

    const clearFilters = () => {
        setSearch("");
        setSelectedProgram("ALL");
        setSelectedType("ALL");
        setSelectedSemester("ALL");
    };

    return (
        <div className="space-y-6 pb-10">
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
                        <span className="text-foreground">Class Schedule</span>
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Class Schedule
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        View and manage your department&apos;s weekly class timetable.
                    </p>
                </div>

                <Button render={<Link href="/department-head/academics/schedule/create">
                    <Plus className="h-4 w-4" />
                    Add Class Schedule
                </Link>} className="gap-2 self-start">

                </Button>
            </div>

            {/* Statistics */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <Card>
                    <CardContent className="flex items-center justify-between p-5">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Today&apos;s Classes
                            </p>
                            <p className="mt-2 text-2xl font-bold">{todaySessions}</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                {selectedDay}
                            </p>
                        </div>
                        <div className="rounded-xl bg-blue-500/10 p-3 text-blue-600 dark:text-blue-400">
                            <CalendarCheck className="h-6 w-6" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center justify-between p-5">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Student Seats
                            </p>
                            <p className="mt-2 text-2xl font-bold">
                                {totalStudents.toLocaleString()}
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Across displayed classes
                            </p>
                        </div>
                        <div className="rounded-xl bg-violet-500/10 p-3 text-violet-600 dark:text-violet-400">
                            <Users className="h-6 w-6" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center justify-between p-5">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Instructors
                            </p>
                            <p className="mt-2 text-2xl font-bold">
                                {uniqueInstructors}
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Teaching this day
                            </p>
                        </div>
                        <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-600 dark:text-emerald-400">
                            <UserRound className="h-6 w-6" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center justify-between p-5">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Lectures
                            </p>
                            <p className="mt-2 text-2xl font-bold">{lectureCount}</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                On selected day
                            </p>
                        </div>
                        <div className="rounded-xl bg-amber-500/10 p-3 text-amber-600 dark:text-amber-400">
                            <BookOpen className="h-6 w-6" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="space-y-4 p-4">
                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        <div className="relative sm:col-span-2 xl:col-span-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Search course, instructor, room..."
                                className="pl-9"
                            />
                        </div>

                        <Select
                            value={selectedSemester}
                            onValueChange={(value) => setSelectedSemester(value ?? "ALL")}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select semester" />
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
                            value={selectedProgram}
                            onValueChange={(value) => setSelectedProgram(value ?? "ALL")}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select program" />
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

                        <Select value={selectedType} onValueChange={(value) => setSelectedType(value ?? "ALL")}>
                            <SelectTrigger>
                                <SelectValue placeholder="Class type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All Class Types</SelectItem>
                                <SelectItem value="LECTURE">Lecture</SelectItem>
                                <SelectItem value="LAB">Lab</SelectItem>
                                <SelectItem value="TUTORIAL">Tutorial</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Day navigation */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="font-semibold">Weekly Timetable</h2>
                            <p className="text-sm text-muted-foreground">
                                Select a day to view its scheduled classes
                            </p>
                        </div>

                        <div className="flex items-center justify-between gap-2 sm:justify-end">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={goToPreviousDay}
                                aria-label="Previous day"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>

                            <span className="min-w-[120px] text-center text-sm font-semibold">
                                {selectedDay}
                            </span>

                            <Button
                                variant="outline"
                                size="icon"
                                onClick={goToNextDay}
                                aria-label="Next day"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>

                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => setSelectedDay("Saturday")}
                            >
                                First day
                            </Button>
                        </div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
                        {days.map((day) => (
                            <Button
                                key={day}
                                variant={selectedDay === day ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedDay(day)}
                                className="min-w-0"
                            >
                                <span className="truncate">{day.slice(0, 3)}</span>
                            </Button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Schedule content */}
            <div className="grid gap-6 xl:grid-cols-[1fr_300px]">
                <Card className="min-w-0">
                    <CardHeader>
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <div>
                                <CardTitle>{selectedDay} Schedule</CardTitle>
                                <CardDescription>
                                    {filteredSchedule.length} classes scheduled for this day
                                </CardDescription>
                            </div>
                            <Badge variant="secondary">{selectedSemester}</Badge>
                        </div>
                    </CardHeader>

                    <CardContent>
                        {filteredSchedule.length === 0 ? (
                            <div className="flex flex-col items-center py-14 text-center">
                                <div className="rounded-full bg-muted p-4">
                                    <CalendarDays className="h-7 w-7 text-muted-foreground" />
                                </div>
                                <h3 className="mt-4 font-semibold">
                                    No classes scheduled
                                </h3>
                                <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                                    There are no classes matching your selected day and
                                    filters.
                                </p>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="mt-4"
                                    onClick={clearFilters}
                                >
                                    Clear filters
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredSchedule
                                    .slice()
                                    .sort((a, b) =>
                                        a.startTime.localeCompare(b.startTime),
                                    )
                                    .map((session) => (
                                        <div
                                            key={session.id}
                                            className={`rounded-xl border border-l-4 p-4 ${typeCardStyles[session.type]}`}
                                        >
                                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                                <div className="min-w-0 space-y-2">
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <Badge variant="outline">
                                                            {session.courseCode}
                                                        </Badge>
                                                        <Badge
                                                            variant="outline"
                                                            className={typeStyles[session.type]}
                                                        >
                                                            {session.type}
                                                        </Badge>
                                                    </div>

                                                    <h3 className="font-semibold leading-snug">
                                                        {session.courseName}
                                                    </h3>

                                                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                                                        <span className="flex items-center gap-1.5">
                                                            <UserRound className="h-4 w-4" />
                                                            {session.instructor}
                                                        </span>
                                                        <span className="flex items-center gap-1.5">
                                                            <MapPin className="h-4 w-4" />
                                                            {session.room}
                                                        </span>
                                                        <span className="flex items-center gap-1.5">
                                                            <Users className="h-4 w-4" />
                                                            {session.students} Students
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="shrink-0 rounded-lg border bg-background/80 px-3 py-2 sm:text-right">
                                                    <p className="flex items-center gap-1.5 text-sm font-semibold sm:justify-end">
                                                        <Clock3 className="h-4 w-4 text-primary" />
                                                        {formatTime(session.startTime)}
                                                    </p>
                                                    <p className="mt-1 text-xs text-muted-foreground">
                                                        to {formatTime(session.endTime)}
                                                    </p>
                                                    <p className="mt-1 text-xs text-muted-foreground">
                                                        {getDuration(session.startTime, session.endTime)}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t pt-3 text-xs text-muted-foreground">
                                                <span>
                                                    {session.program} · Section {session.section}
                                                </span>
                                                <Link
                                                    href={`/department-head/academics/courses/${session.id}`}
                                                    className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                                                >
                                                    View course
                                                    <ArrowRight className="h-3 w-3" />
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Sidebar */}
                <div className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">
                                Class Type Legend
                            </CardTitle>
                            <CardDescription>
                                Identify different session types
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-2 text-sm">
                                    <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                                    Lecture
                                </span>
                                <Badge variant="outline">
                                    {allFilteredSessions.filter(
                                        (s) => s.type === "LECTURE",
                                    ).length}
                                </Badge>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-2 text-sm">
                                    <span className="h-2.5 w-2.5 rounded-full bg-violet-500" />
                                    Lab
                                </span>
                                <Badge variant="outline">
                                    {allFilteredSessions.filter(
                                        (s) => s.type === "LAB",
                                    ).length}
                                </Badge>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-2 text-sm">
                                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                                    Tutorial
                                </span>
                                <Badge variant="outline">
                                    {allFilteredSessions.filter(
                                        (s) => s.type === "TUTORIAL",
                                    ).length}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">
                                Schedule Summary
                            </CardTitle>
                            <CardDescription>
                                Based on current filters
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Total weekly sessions
                                </p>
                                <p className="mt-1 text-2xl font-bold">
                                    {allFilteredSessions.length}
                                </p>
                            </div>

                            <div className="flex items-center justify-between border-t pt-3">
                                <span className="text-sm text-muted-foreground">
                                    Unique instructors
                                </span>
                                <span className="font-semibold">
                                    {
                                        new Set(
                                            allFilteredSessions.map((s) => s.instructor),
                                        ).size
                                    }
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">
                                    Scheduled days
                                </span>
                                <span className="font-semibold">
                                    {
                                        new Set(
                                            allFilteredSessions.map((s) => s.day),
                                        ).size
                                    }
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">
                                    Student seats
                                </span>
                                <span className="font-semibold">
                                    {allFilteredSessions
                                        .reduce((sum, s) => sum + s.students, 0)
                                        .toLocaleString()}
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">
                                Quick Links
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Link
                                href="/department-head/academics/courses"
                                className="flex items-center justify-between rounded-lg border p-3 text-sm transition-colors hover:bg-muted/50"
                            >
                                <span className="flex items-center gap-2">
                                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                                    Courses
                                </span>
                                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            </Link>

                            <Link
                                href="/department-head/department/programs"
                                className="flex items-center justify-between rounded-lg border p-3 text-sm transition-colors hover:bg-muted/50"
                            >
                                <span className="flex items-center gap-2">
                                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                    Programs
                                </span>
                                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            </Link>

                            <Link
                                href="/department-head/academics"
                                className="flex items-center justify-between rounded-lg border p-3 text-sm transition-colors hover:bg-muted/50"
                            >
                                <span className="flex items-center gap-2">
                                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                                    Academics Overview
                                </span>
                                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
