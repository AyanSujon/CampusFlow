"use client";

import React, { useMemo, useState } from "react";
import {
    CalendarDays,
    Clock3,
    Eye,
    MapPin,
    MoreHorizontal,
    Pencil,
    Plus,
    Search,
    UserRound,
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

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Schedule = {
    id: string;
    courseCode: string;
    courseTitle: string;
    instructor: string;
    room: string;
    day: string;
    startTime: string;
    endTime: string;
    term: string;
    isActive: boolean;
};

const schedules: Schedule[] = [
    {
        id: "SCH-001",
        courseCode: "CSE-101",
        courseTitle: "Introduction to Computer Science",
        instructor: "Ayan Rahman",
        room: "Room 301",
        day: "Sunday",
        startTime: "09:00 AM",
        endTime: "10:30 AM",
        term: "Fall 2026",
        isActive: true,
    },
    {
        id: "SCH-002",
        courseCode: "CSE-203",
        courseTitle: "Data Structures",
        instructor: "Tanvir Hasan",
        room: "Lab 204",
        day: "Monday",
        startTime: "11:00 AM",
        endTime: "12:30 PM",
        term: "Fall 2026",
        isActive: true,
    },
    {
        id: "SCH-003",
        courseCode: "MAT-101",
        courseTitle: "Calculus I",
        instructor: "Nusrat Jahan",
        room: "Room 205",
        day: "Tuesday",
        startTime: "10:00 AM",
        endTime: "11:30 AM",
        term: "Fall 2026",
        isActive: true,
    },
    {
        id: "SCH-004",
        courseCode: "CSE-305",
        courseTitle: "Database Management Systems",
        instructor: "Sabbir Ahmed",
        room: "Lab 301",
        day: "Wednesday",
        startTime: "02:00 PM",
        endTime: "03:30 PM",
        term: "Spring 2026",
        isActive: false,
    },
];

const days = [
    "All Days",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const terms = ["All Terms", "Spring 2026", "Fall 2026"];

export default function Schedules() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDay, setSelectedDay] = useState("All Days");
    const [selectedTerm, setSelectedTerm] = useState("All Terms");

    const filteredSchedules = useMemo(() => {
        const search = searchTerm.toLowerCase().trim();

        return schedules.filter((schedule) => {
            const matchesSearch =
                !search ||
                schedule.courseCode.toLowerCase().includes(search) ||
                schedule.courseTitle.toLowerCase().includes(search) ||
                schedule.instructor.toLowerCase().includes(search) ||
                schedule.room.toLowerCase().includes(search);

            const matchesDay =
                selectedDay === "All Days" || schedule.day === selectedDay;

            const matchesTerm =
                selectedTerm === "All Terms" || schedule.term === selectedTerm;

            return matchesSearch && matchesDay && matchesTerm;
        });
    }, [searchTerm, selectedDay, selectedTerm]);

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Class Schedules
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        Manage course schedules, instructors, rooms, days, and class times.
                    </p>
                </div>

                <Button className="w-full sm:w-auto">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Schedule
                </Button>
            </div>

            {/* Filters */}
            <div className="rounded-lg border bg-card p-4">
                <div className="grid gap-4 md:grid-cols-3">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                        <Input
                            placeholder="Search course, instructor, room..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9"
                        />
                    </div>

                    {/* Day */}
                    <select
                        value={selectedDay}
                        onChange={(e) => setSelectedDay(e.target.value)}
                        className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                    >
                        {days.map((day) => (
                            <option key={day} value={day}>
                                {day}
                            </option>
                        ))}
                    </select>

                    {/* Academic Term */}
                    <select
                        value={selectedTerm}
                        onChange={(e) => setSelectedTerm(e.target.value)}
                        className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                    >
                        {terms.map((term) => (
                            <option key={term} value={term}>
                                {term}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="rounded-lg border bg-card">
                <div className="border-b px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="font-semibold">Schedules</h2>

                            <p className="text-sm text-muted-foreground">
                                {filteredSchedules.length} schedule
                                {filteredSchedules.length !== 1 ? "s" : ""} found
                            </p>
                        </div>

                        <CalendarDays className="h-5 w-5 text-muted-foreground" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Course</TableHead>
                                <TableHead>Instructor</TableHead>
                                <TableHead>Room</TableHead>
                                <TableHead>Day</TableHead>
                                <TableHead>Time</TableHead>
                                <TableHead>Term</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {filteredSchedules.length > 0 ? (
                                filteredSchedules.map((schedule) => (
                                    <TableRow key={schedule.id}>
                                        {/* Course */}
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-medium">
                                                    {schedule.courseCode}
                                                </span>

                                                <span className=" truncate text-sm text-muted-foreground">
                                                    {schedule.courseTitle}
                                                </span>
                                            </div>
                                        </TableCell>

                                        {/* Instructor */}
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <UserRound className="h-4 w-4 text-muted-foreground" />

                                                <span>{schedule.instructor}</span>
                                            </div>
                                        </TableCell>

                                        {/* Room */}
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-muted-foreground" />

                                                <span>{schedule.room}</span>
                                            </div>
                                        </TableCell>

                                        {/* Day */}
                                        <TableCell>
                                            <span className="font-medium">{schedule.day}</span>
                                        </TableCell>

                                        {/* Time */}
                                        <TableCell>
                                            <div className="flex items-center gap-2 whitespace-nowrap">
                                                <Clock3 className="h-4 w-4 text-muted-foreground" />

                                                <span>
                                                    {schedule.startTime} - {schedule.endTime}
                                                </span>
                                            </div>
                                        </TableCell>

                                        {/* Term */}
                                        <TableCell>
                                            <span className="whitespace-nowrap">
                                                {schedule.term}
                                            </span>
                                        </TableCell>

                                        {/* Status */}
                                        <TableCell>
                                            <span
                                                className={
                                                    schedule.isActive
                                                        ? "inline-flex rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                                        : "inline-flex rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
                                                }
                                            >
                                                {schedule.isActive ? "Active" : "Inactive"}
                                            </span>
                                        </TableCell>

                                        {/* Actions */}
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger render={<Button
                                                    variant="ghost"
                                                    size="icon"
                                                    aria-label="Schedule actions"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>}>

                                                </DropdownMenuTrigger>

                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        View
                                                    </DropdownMenuItem>

                                                    <DropdownMenuItem>
                                                        <Pencil className="mr-2 h-4 w-4" />
                                                        Edit
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
                                        No schedules found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}


