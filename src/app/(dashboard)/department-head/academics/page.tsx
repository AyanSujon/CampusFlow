// import React from 'react'

// export default function academics() {
//     return (
//         <div>academics overview</div>
//     )
// }












"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
    BookOpen,
    CalendarDays,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Clock3,
    Download,
    Eye,
    GraduationCap,
    LayoutGrid,
    List,
    MoreHorizontal,
    Plus,
    Search,
    Users,
    X,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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

type ProgramStatus = "ACTIVE" | "DRAFT" | "INACTIVE";

type Program = {
    id: string;
    code: string;
    name: string;
    degree: string;
    duration: string;
    totalCredits: number;
    totalStudents: number;
    capacity: number;
    department: string;
    status: ProgramStatus;
    startYear: number;
    coordinator: string;
    description: string;
};

const programsData: Program[] = [
    {
        id: "1",
        code: "CSE-BSC",
        name: "Computer Science & Engineering",
        degree: "Bachelor",
        duration: "4 Years",
        totalCredits: 160,
        totalStudents: 245,
        capacity: 300,
        department: "Computer Science & Engineering",
        status: "ACTIVE",
        startYear: 2022,
        coordinator: "Dr. Mahmud Hasan",
        description:
            "A comprehensive undergraduate program focused on computing, software development, algorithms, and modern technology.",
    },
    {
        id: "2",
        code: "SWE-BSC",
        name: "Software Engineering",
        degree: "Bachelor",
        duration: "4 Years",
        totalCredits: 160,
        totalStudents: 180,
        capacity: 240,
        department: "Computer Science & Engineering",
        status: "ACTIVE",
        startYear: 2023,
        coordinator: "Dr. Nusrat Jahan",
        description:
            "A program focused on software architecture, engineering practices, testing, and scalable application development.",
    },
    {
        id: "3",
        code: "CSE-MSC",
        name: "Computer Science",
        degree: "Master",
        duration: "2 Years",
        totalCredits: 48,
        totalStudents: 65,
        capacity: 80,
        department: "Computer Science & Engineering",
        status: "ACTIVE",
        startYear: 2024,
        coordinator: "Dr. Arif Rahman",
        description:
            "An advanced program covering research, artificial intelligence, data systems, and advanced computing.",
    },
    {
        id: "4",
        code: "DS-BSC",
        name: "Data Science",
        degree: "Bachelor",
        duration: "4 Years",
        totalCredits: 150,
        totalStudents: 0,
        capacity: 100,
        department: "Computer Science & Engineering",
        status: "DRAFT",
        startYear: 2026,
        coordinator: "Dr. Mahmud Hasan",
        description:
            "A proposed program covering statistics, data engineering, machine learning, and analytics.",
    },
    {
        id: "5",
        code: "IT-DIP",
        name: "Information Technology",
        degree: "Diploma",
        duration: "3 Years",
        totalCredits: 120,
        totalStudents: 90,
        capacity: 120,
        department: "Computer Science & Engineering",
        status: "INACTIVE",
        startYear: 2021,
        coordinator: "Dr. Nusrat Jahan",
        description:
            "A practical program covering information systems, networking, databases, and IT support.",
    },
];

const statusStyles: Record<ProgramStatus, string> = {
    ACTIVE: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    DRAFT: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    INACTIVE: "bg-muted text-muted-foreground border-border",
};

const ITEMS_PER_PAGE = 6;

function getInitials(name: string) {
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

export default function DepartmentProgramsPage() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [degreeFilter, setDegreeFilter] = useState("ALL");
    const [view, setView] = useState<"table" | "grid">("table");
    const [currentPage, setCurrentPage] = useState(1);

    const activePrograms = programsData.filter(
        (program) => program.status === "ACTIVE",
    ).length;

    const draftPrograms = programsData.filter(
        (program) => program.status === "DRAFT",
    ).length;

    const totalStudents = programsData.reduce(
        (sum, program) => sum + program.totalStudents,
        0,
    );

    const totalCapacity = programsData
        .filter((program) => program.status === "ACTIVE")
        .reduce((sum, program) => sum + program.capacity, 0);

    const filteredPrograms = useMemo(() => {
        const query = search.toLowerCase().trim();

        return programsData.filter((program) => {
            const matchesSearch =
                !query ||
                program.name.toLowerCase().includes(query) ||
                program.code.toLowerCase().includes(query) ||
                program.coordinator.toLowerCase().includes(query);

            const matchesStatus =
                statusFilter === "ALL" || program.status === statusFilter;

            const matchesDegree =
                degreeFilter === "ALL" || program.degree === degreeFilter;

            return matchesSearch && matchesStatus && matchesDegree;
        });
    }, [search, statusFilter, degreeFilter]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredPrograms.length / ITEMS_PER_PAGE),
    );

    const paginatedPrograms = filteredPrograms.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE,
    );

    const resetFilters = () => {
        setSearch("");
        setStatusFilter("ALL");
        setDegreeFilter("ALL");
        setCurrentPage(1);
    };

    const exportCSV = () => {
        const headers = [
            "Program Code",
            "Program Name",
            "Degree",
            "Duration",
            "Credits",
            "Students",
            "Capacity",
            "Coordinator",
            "Status",
        ];

        const rows = filteredPrograms.map((program) => [
            program.code,
            program.name,
            program.degree,
            program.duration,
            program.totalCredits,
            program.totalStudents,
            program.capacity,
            program.coordinator,
            program.status,
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
        link.download = "department-programs.csv";
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen space-y-6 bg-background p-4 md:p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <Link
                            href="/department-head/department"
                            className="hover:text-primary"
                        >
                            Department
                        </Link>
                        <span>/</span>
                        <span className="text-foreground">Programs</span>
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                        Academic Programs
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage academic programs, enrollment capacity, and program details.
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    <Button variant="outline" onClick={exportCSV}>
                        <Download className="mr-2 h-4 w-4" />
                        Export CSV
                    </Button>

                    <Link href="/department-head/department/programs/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Create Program
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    title="Total Programs"
                    value={programsData.length}
                    description="All department programs"
                    icon={BookOpen}
                    iconClass="bg-primary/10 text-primary"
                />

                <StatCard
                    title="Active Programs"
                    value={activePrograms}
                    description="Currently running"
                    icon={CheckCircle2}
                    iconClass="bg-emerald-500/10 text-emerald-600"
                />

                <StatCard
                    title="Total Students"
                    value={totalStudents}
                    description="Across all programs"
                    icon={Users}
                    iconClass="bg-blue-500/10 text-blue-600"
                />

                <StatCard
                    title="Draft Programs"
                    value={draftPrograms}
                    description="Awaiting approval or launch"
                    icon={Clock3}
                    iconClass="bg-amber-500/10 text-amber-600"
                />
            </div>

            {/* Enrollment Capacity */}
            <Card className="border-border/60 shadow-sm">
                <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-primary/10 p-3 text-primary">
                            <GraduationCap className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="font-semibold">Department Enrollment Capacity</p>
                            <p className="text-sm text-muted-foreground">
                                Active programs only
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-6">
                        <div>
                            <p className="text-2xl font-bold">
                                {totalStudents}
                                <span className="text-base font-normal text-muted-foreground">
                                    {" "}
                                    / {totalCapacity}
                                </span>
                            </p>
                            <p className="text-xs text-muted-foreground">Enrolled / Capacity</p>
                        </div>

                        <div className="min-w-32">
                            <div className="mb-2 flex justify-between text-xs">
                                <span className="text-muted-foreground">Utilization</span>
                                <span className="font-medium">
                                    {totalCapacity
                                        ? Math.round((totalStudents / totalCapacity) * 100)
                                        : 0}
                                    %
                                </span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-muted">
                                <div
                                    className="h-full rounded-full bg-primary"
                                    style={{
                                        width: `${Math.min(
                                            totalCapacity
                                                ? (totalStudents / totalCapacity) * 100
                                                : 0,
                                            100,
                                        )}%`,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Programs Directory */}
            <Card className="border-border/60 shadow-sm">
                <CardHeader className="space-y-4">
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                        <div>
                            <CardTitle className="text-lg">Program Directory</CardTitle>
                            <p className="mt-1 text-sm text-muted-foreground">
                                View and manage programs assigned to your department.
                            </p>
                        </div>

                        <div className="flex gap-2">
                            <Button
                                size="icon"
                                variant={view === "table" ? "default" : "outline"}
                                aria-label="Table view"
                                onClick={() => setView("table")}
                            >
                                <List className="h-4 w-4" />
                            </Button>

                            <Button
                                size="icon"
                                variant={view === "grid" ? "default" : "outline"}
                                aria-label="Grid view"
                                onClick={() => setView("grid")}
                            >
                                <LayoutGrid className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search programs or coordinator..."
                                value={search}
                                onChange={(event) => {
                                    setSearch(event.target.value);
                                    setCurrentPage(1);
                                }}
                                className="pl-9"
                            />
                        </div>

                        <Select
                            value={degreeFilter}
                            onValueChange={(value) => {
                                setDegreeFilter(value ?? "ALL");
                                setCurrentPage(1);
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="All Degree Types" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All Degree Types</SelectItem>
                                <SelectItem value="Bachelor">Bachelor</SelectItem>
                                <SelectItem value="Master">Master</SelectItem>
                                <SelectItem value="Diploma">Diploma</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select
                            value={statusFilter}
                            onValueChange={(value) => {
                                setStatusFilter(value ?? "ALL");
                                setCurrentPage(1);
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="All Statuses" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All Statuses</SelectItem>
                                <SelectItem value="ACTIVE">Active</SelectItem>
                                <SelectItem value="DRAFT">Draft</SelectItem>
                                <SelectItem value="INACTIVE">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-sm text-muted-foreground">
                            Showing{" "}
                            <span className="font-medium text-foreground">
                                {filteredPrograms.length === 0
                                    ? 0
                                    : (currentPage - 1) * ITEMS_PER_PAGE + 1}
                                {"–"}
                                {Math.min(
                                    currentPage * ITEMS_PER_PAGE,
                                    filteredPrograms.length,
                                )}
                            </span>{" "}
                            of{" "}
                            <span className="font-medium text-foreground">
                                {filteredPrograms.length}
                            </span>{" "}
                            programs
                        </p>

                        {(search ||
                            statusFilter !== "ALL" ||
                            degreeFilter !== "ALL") && (
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={resetFilters}
                                >
                                    <X className="mr-1 h-4 w-4" />
                                    Clear filters
                                </Button>
                            )}
                    </div>
                </CardHeader>

                <CardContent>
                    {paginatedPrograms.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="mb-4 rounded-full bg-muted p-4">
                                <Search className="h-7 w-7 text-muted-foreground" />
                            </div>
                            <h3 className="font-semibold">No programs found</h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Try adjusting your search or filters.
                            </p>
                            <Button
                                variant="outline"
                                className="mt-4"
                                onClick={resetFilters}
                            >
                                Clear filters
                            </Button>
                        </div>
                    ) : view === "table" ? (
                        <>
                            {/* Desktop Table */}
                            <div className="hidden overflow-hidden rounded-lg border md:block">
                                <table className="w-full text-sm">
                                    <thead className="bg-muted/50">
                                        <tr className="text-left text-muted-foreground">
                                            <th className="px-4 py-3 font-medium">Program</th>
                                            <th className="px-4 py-3 font-medium">Degree</th>
                                            <th className="px-4 py-3 font-medium">Duration</th>
                                            <th className="px-4 py-3 font-medium">Students</th>
                                            <th className="px-4 py-3 font-medium">Coordinator</th>
                                            <th className="px-4 py-3 font-medium">Status</th>
                                            <th className="px-4 py-3 text-right font-medium">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y">
                                        {paginatedPrograms.map((program) => (
                                            <tr
                                                key={program.id}
                                                className="transition-colors hover:bg-muted/30"
                                            >
                                                <td className="px-4 py-3">
                                                    <div className="flex min-w-0 items-center gap-3">
                                                        <div className="rounded-lg bg-primary/10 p-2 text-primary">
                                                            <BookOpen className="h-5 w-5" />
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="truncate font-medium">
                                                                {program.name}
                                                            </p>
                                                            <p className="text-xs text-muted-foreground">
                                                                {program.code}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-4 py-3">{program.degree}</td>

                                                <td className="px-4 py-3">{program.duration}</td>

                                                <td className="px-4 py-3">
                                                    <p className="font-medium">
                                                        {program.totalStudents}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        of {program.capacity} seats
                                                    </p>
                                                </td>

                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-2">
                                                        <Avatar className="h-7 w-7">
                                                            <AvatarFallback className="text-[10px]">
                                                                {getInitials(program.coordinator)}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <span className="max-w-32 truncate">
                                                            {program.coordinator}
                                                        </span>
                                                    </div>
                                                </td>

                                                <td className="px-4 py-3">
                                                    <Badge
                                                        variant="outline"
                                                        className={statusStyles[program.status]}
                                                    >
                                                        {program.status}
                                                    </Badge>
                                                </td>

                                                <td className="px-4 py-3 text-right">
                                                    <ProgramActions programId={program.id} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Cards */}
                            <div className="grid gap-3 md:hidden">
                                {paginatedPrograms.map((program) => (
                                    <ProgramCard key={program.id} program={program} />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            {paginatedPrograms.map((program) => (
                                <ProgramCard key={program.id} program={program} />
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {filteredPrograms.length > 0 && (
                        <div className="mt-6 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-sm text-muted-foreground">
                                Page {currentPage} of {totalPages}
                            </p>

                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    disabled={currentPage === 1}
                                    onClick={() =>
                                        setCurrentPage((page) => Math.max(1, page - 1))
                                    }
                                >
                                    <ChevronLeft className="mr-1 h-4 w-4" />
                                    Previous
                                </Button>

                                <Button
                                    size="sm"
                                    variant="outline"
                                    disabled={currentPage === totalPages}
                                    onClick={() =>
                                        setCurrentPage((page) => Math.min(totalPages, page + 1))
                                    }
                                >
                                    Next
                                    <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Program Summary */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <GraduationCap className="h-5 w-5 text-primary" />
                            Degree Distribution
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {["Bachelor", "Master", "Diploma"].map((degree) => {
                            const count = programsData.filter(
                                (program) => program.degree === degree,
                            ).length;

                            return (
                                <div key={degree} className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium">{degree}</span>
                                        <span className="text-muted-foreground">
                                            {count} programs
                                        </span>
                                    </div>
                                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                                        <div
                                            className="h-full rounded-full bg-primary"
                                            style={{
                                                width: `${(count / Math.max(programsData.length, 1)) * 100
                                                    }%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <CalendarDays className="h-5 w-5 text-primary" />
                            Program Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between gap-3">
                            <span className="text-sm text-muted-foreground">
                                Total credit hours
                            </span>
                            <span className="font-semibold">
                                {programsData
                                    .filter((program) => program.status === "ACTIVE")
                                    .reduce((sum, program) => sum + program.totalCredits, 0)
                                    .toLocaleString()}
                            </span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                            <span className="text-sm text-muted-foreground">
                                Active enrollment capacity
                            </span>
                            <span className="font-semibold">
                                {totalCapacity.toLocaleString()}
                            </span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                            <span className="text-sm text-muted-foreground">
                                Available seats
                            </span>
                            <span className="font-semibold">
                                {Math.max(totalCapacity - totalStudents, 0).toLocaleString()}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function StatCard({
    title,
    value,
    description,
    icon: Icon,
    iconClass,
}: {
    title: string;
    value: number;
    description: string;
    icon: React.ElementType;
    iconClass: string;
}) {
    return (
        <Card className="border-border/60 shadow-sm">
            <CardContent className="flex items-center justify-between gap-3 p-5">
                <div className="min-w-0">
                    <p className="text-sm text-muted-foreground">{title}</p>
                    <p className="mt-2 text-2xl font-bold tracking-tight">
                        {value.toLocaleString()}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">{description}</p>
                </div>

                <div className={`shrink-0 rounded-xl p-3 ${iconClass}`}>
                    <Icon className="h-5 w-5" />
                </div>
            </CardContent>
        </Card>
    );
}

function ProgramCard({ program }: { program: Program }) {
    const utilization =
        program.capacity > 0
            ? Math.min((program.totalStudents / program.capacity) * 100, 100)
            : 0;

    return (
        <Card className="border-border/60 shadow-sm">
            <CardContent className="space-y-4 p-4">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                        <div className="rounded-lg bg-primary/10 p-2 text-primary">
                            <BookOpen className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                            <p className="truncate font-semibold">{program.name}</p>
                            <p className="text-xs text-muted-foreground">{program.code}</p>
                        </div>
                    </div>
                    <Badge
                        variant="outline"
                        className={statusStyles[program.status]}
                    >
                        {program.status}
                    </Badge>
                </div>

                <p className="line-clamp-2 text-sm text-muted-foreground">
                    {program.description}
                </p>

                <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                        <p className="text-xs text-muted-foreground">Degree</p>
                        <p className="mt-1 font-medium">{program.degree}</p>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground">Duration</p>
                        <p className="mt-1 font-medium">{program.duration}</p>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground">Credits</p>
                        <p className="mt-1 font-medium">{program.totalCredits}</p>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground">Students</p>
                        <p className="mt-1 font-medium">
                            {program.totalStudents} / {program.capacity}
                        </p>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Seat utilization</span>
                        <span className="font-medium">{Math.round(utilization)}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${utilization}%` }}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between gap-2 border-t pt-3">
                    <div className="flex min-w-0 items-center gap-2">
                        <Avatar className="h-7 w-7">
                            <AvatarFallback className="text-[10px]">
                                {getInitials(program.coordinator)}
                            </AvatarFallback>
                        </Avatar>
                        <span className="truncate text-xs text-muted-foreground">
                            {program.coordinator}
                        </span>
                    </div>
                    <ProgramActions programId={program.id} />
                </div>
            </CardContent>
        </Card>
    );
}

function ProgramActions({ programId }: { programId: string }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={<Button
                variant="ghost"
                size="icon"
                aria-label="Program actions"
            >
                <MoreHorizontal className="h-4 w-4" />
            </Button>}>

            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuItem render={<Link
                    href={`/department-head/department/programs/${programId}`}
                    className="flex cursor-pointer items-center"
                >
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                </Link>}>

                </DropdownMenuItem>

                <DropdownMenuItem render={<Link
                    href={`/department-head/department/programs/${programId}/edit`}
                    className="flex cursor-pointer items-center"
                >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Edit Program
                </Link>}>

                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
