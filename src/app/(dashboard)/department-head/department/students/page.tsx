// import React from 'react'

// export default function students() {
//   return (
//     <div>students</div>
//   )
// }














"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
    ArrowDown,
    ArrowUp,
    ArrowUpDown,
    BookOpen,
    CalendarDays,
    ChevronLeft,
    ChevronRight,
    Download,
    Eye,
    GraduationCap,
    LayoutGrid,
    List,
    Mail,
    MoreHorizontal,
    Plus,
    Search,
    SlidersHorizontal,
    Users,
    UserCheck,
    UserX,
    X,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type StudentStatus = "ACTIVE" | "PENDING" | "GRADUATED" | "SUSPENDED";

type Student = {
    id: string;
    studentId: string;
    name: string;
    email: string;
    phone: string;
    program: string;
    department: string;
    year: string;
    semester: string;
    status: StudentStatus;
    enrollmentDate: string;
    avatar?: string;
};

const studentsData: Student[] = [
    {
        id: "1",
        studentId: "STU-2025-CSE-0001",
        name: "Rahim Ahmed",
        email: "rahim.ahmed@example.com",
        phone: "+880 1712-345678",
        program: "BSc in Computer Science",
        department: "Computer Science & Engineering",
        year: "2025",
        semester: "Fall",
        status: "ACTIVE",
        enrollmentDate: "2025-01-12",
    },
    {
        id: "2",
        studentId: "STU-2025-CSE-0002",
        name: "Nusrat Jahan",
        email: "nusrat.jahan@example.com",
        phone: "+880 1812-456789",
        program: "BSc in Computer Science",
        department: "Computer Science & Engineering",
        year: "2025",
        semester: "Fall",
        status: "ACTIVE",
        enrollmentDate: "2025-01-15",
    },
    {
        id: "3",
        studentId: "STU-2024-CSE-0003",
        name: "Tanvir Hasan",
        email: "tanvir.hasan@example.com",
        phone: "+880 1912-567890",
        program: "BSc in Computer Science",
        department: "Computer Science & Engineering",
        year: "2024",
        semester: "Spring",
        status: "PENDING",
        enrollmentDate: "2024-08-10",
    },
    {
        id: "4",
        studentId: "STU-2023-CSE-0004",
        name: "Sadia Islam",
        email: "sadia.islam@example.com",
        phone: "+880 1612-678901",
        program: "BSc in Software Engineering",
        department: "Computer Science & Engineering",
        year: "2023",
        semester: "Fall",
        status: "ACTIVE",
        enrollmentDate: "2023-09-05",
    },
    {
        id: "5",
        studentId: "STU-2022-CSE-0005",
        name: "Fahim Chowdhury",
        email: "fahim.chowdhury@example.com",
        phone: "+880 1512-789012",
        program: "BSc in Computer Science",
        department: "Computer Science & Engineering",
        year: "2022",
        semester: "Spring",
        status: "GRADUATED",
        enrollmentDate: "2022-02-18",
    },
    {
        id: "6",
        studentId: "STU-2025-CSE-0006",
        name: "Maliha Rahman",
        email: "maliha.rahman@example.com",
        phone: "+880 1713-890123",
        program: "BSc in Software Engineering",
        department: "Computer Science & Engineering",
        year: "2025",
        semester: "Fall",
        status: "ACTIVE",
        enrollmentDate: "2025-02-02",
    },
    {
        id: "7",
        studentId: "STU-2024-CSE-0007",
        name: "Sabbir Hossain",
        email: "sabbir.hossain@example.com",
        phone: "+880 1813-901234",
        program: "BSc in Computer Science",
        department: "Computer Science & Engineering",
        year: "2024",
        semester: "Spring",
        status: "SUSPENDED",
        enrollmentDate: "2024-03-20",
    },
    {
        id: "8",
        studentId: "STU-2023-CSE-0008",
        name: "Farzana Akter",
        email: "farzana.akter@example.com",
        phone: "+880 1913-012345",
        program: "BSc in Software Engineering",
        department: "Computer Science & Engineering",
        year: "2023",
        semester: "Fall",
        status: "ACTIVE",
        enrollmentDate: "2023-08-14",
    },
];

const statusConfig: Record<
    StudentStatus,
    { label: string; className: string }
> = {
    ACTIVE: {
        label: "Active",
        className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    },
    PENDING: {
        label: "Pending",
        className: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    },
    GRADUATED: {
        label: "Graduated",
        className: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    },
    SUSPENDED: {
        label: "Suspended",
        className: "bg-red-500/10 text-red-600 border-red-500/20",
    },
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

function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

export default function DepartmentStudentsPage() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [programFilter, setProgramFilter] = useState("ALL");
    const [yearFilter, setYearFilter] = useState("ALL");
    const [view, setView] = useState<"table" | "grid">("table");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [currentPage, setCurrentPage] = useState(1);

    const filteredStudents = useMemo(() => {
        const query = search.toLowerCase().trim();

        return studentsData
            .filter((student) => {
                const matchesSearch =
                    !query ||
                    student.name.toLowerCase().includes(query) ||
                    student.studentId.toLowerCase().includes(query) ||
                    student.email.toLowerCase().includes(query);

                const matchesStatus =
                    statusFilter === "ALL" || student.status === statusFilter;

                const matchesProgram =
                    programFilter === "ALL" || student.program === programFilter;

                const matchesYear =
                    yearFilter === "ALL" || student.year === yearFilter;

                return (
                    matchesSearch &&
                    matchesStatus &&
                    matchesProgram &&
                    matchesYear
                );
            })
            .sort((a, b) => {
                const comparison = a.name.localeCompare(b.name);
                return sortOrder === "asc" ? comparison : -comparison;
            });
    }, [search, statusFilter, programFilter, yearFilter, sortOrder]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredStudents.length / ITEMS_PER_PAGE),
    );

    const paginatedStudents = filteredStudents.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE,
    );

    const activeCount = studentsData.filter(
        (student) => student.status === "ACTIVE",
    ).length;

    const pendingCount = studentsData.filter(
        (student) => student.status === "PENDING",
    ).length;

    const graduatedCount = studentsData.filter(
        (student) => student.status === "GRADUATED",
    ).length;

    const suspendedCount = studentsData.filter(
        (student) => student.status === "SUSPENDED",
    ).length;

    const resetFilters = () => {
        setSearch("");
        setStatusFilter("ALL");
        setProgramFilter("ALL");
        setYearFilter("ALL");
        setCurrentPage(1);
    };

    const exportCSV = () => {
        const headers = [
            "Student ID",
            "Name",
            "Email",
            "Phone",
            "Program",
            "Academic Year",
            "Semester",
            "Status",
            "Enrollment Date",
        ];

        const rows = filteredStudents.map((student) => [
            student.studentId,
            student.name,
            student.email,
            student.phone,
            student.program,
            student.year,
            student.semester,
            student.status,
            student.enrollmentDate,
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
        link.download = "department-students.csv";
        link.click();

        URL.revokeObjectURL(url);
    };

    const changePage = (page: number) => {
        setCurrentPage(Math.min(Math.max(page, 1), totalPages));
    };

    return (
        <div className="min-h-screen space-y-6 bg-background p-4 md:p-6 lg:p-8">
            {/* Page Header */}
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
                        <span className="text-foreground">Students</span>
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                        Department Students
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage and monitor students enrolled in your department.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" onClick={exportCSV}>
                        <Download className="mr-2 h-4 w-4" />
                        Export CSV
                    </Button>

                    <Link href="/department-head/department/students/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Student
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    title="Total Students"
                    value={studentsData.length}
                    description="All department students"
                    icon={Users}
                    iconClass="bg-primary/10 text-primary"
                />

                <StatCard
                    title="Active Students"
                    value={activeCount}
                    description="Currently enrolled"
                    icon={UserCheck}
                    iconClass="bg-emerald-500/10 text-emerald-600"
                />

                <StatCard
                    title="Pending Enrollment"
                    value={pendingCount}
                    description="Awaiting approval"
                    icon={CalendarDays}
                    iconClass="bg-amber-500/10 text-amber-600"
                />

                <StatCard
                    title="Graduated Students"
                    value={graduatedCount}
                    description={`${suspendedCount} suspended students`}
                    icon={GraduationCap}
                    iconClass="bg-blue-500/10 text-blue-600"
                />
            </div>

            {/* Student Directory */}
            <Card className="border-border/60 shadow-sm">
                <CardHeader className="space-y-4">
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                        <div>
                            <CardTitle className="text-lg">Student Directory</CardTitle>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Search, filter, and manage department students.
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
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

                    {/* Search and Filters */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        <div className="relative sm:col-span-2 xl:col-span-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                value={search}
                                onChange={(event) => {
                                    setSearch(event.target.value);
                                    setCurrentPage(1);
                                }}
                                placeholder="Search name, ID, email..."
                                className="pl-9"
                            />
                        </div>

                        <Select
                            value={programFilter}
                            onValueChange={(value) => {
                                setProgramFilter(value ?? "all");
                                setCurrentPage(1);
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="All Programs" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All Programs</SelectItem>
                                <SelectItem value="BSc in Computer Science">
                                    BSc in Computer Science
                                </SelectItem>
                                <SelectItem value="BSc in Software Engineering">
                                    BSc in Software Engineering
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        <Select
                            value={yearFilter}
                            onValueChange={(value) => {
                                setYearFilter(value ?? "all");
                                setCurrentPage(1);
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="All Years" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All Academic Years</SelectItem>
                                <SelectItem value="2025">2025</SelectItem>
                                <SelectItem value="2024">2024</SelectItem>
                                <SelectItem value="2023">2023</SelectItem>
                                <SelectItem value="2022">2022</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select
                            value={statusFilter}
                            onValueChange={(value) => {
                                setStatusFilter(value ?? "all");
                                setCurrentPage(1);
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="All Statuses" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All Statuses</SelectItem>
                                <SelectItem value="ACTIVE">Active</SelectItem>
                                <SelectItem value="PENDING">Pending</SelectItem>
                                <SelectItem value="GRADUATED">Graduated</SelectItem>
                                <SelectItem value="SUSPENDED">Suspended</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-sm text-muted-foreground">
                            Showing{" "}
                            <span className="font-medium text-foreground">
                                {filteredStudents.length === 0
                                    ? 0
                                    : (currentPage - 1) * ITEMS_PER_PAGE + 1}
                                {"–"}
                                {Math.min(
                                    currentPage * ITEMS_PER_PAGE,
                                    filteredStudents.length,
                                )}
                            </span>{" "}
                            of{" "}
                            <span className="font-medium text-foreground">
                                {filteredStudents.length}
                            </span>{" "}
                            students
                        </p>

                        <div className="flex items-center gap-2">
                            {(search ||
                                statusFilter !== "ALL" ||
                                programFilter !== "ALL" ||
                                yearFilter !== "ALL") && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={resetFilters}
                                        className="text-muted-foreground"
                                    >
                                        <X className="mr-1 h-4 w-4" />
                                        Clear filters
                                    </Button>
                                )}

                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                    setSortOrder((current) =>
                                        current === "asc" ? "desc" : "asc",
                                    )
                                }
                            >
                                {sortOrder === "asc" ? (
                                    <ArrowUp className="mr-1 h-4 w-4" />
                                ) : (
                                    <ArrowDown className="mr-1 h-4 w-4" />
                                )}
                                Sort by name
                            </Button>
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    {paginatedStudents.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="mb-4 rounded-full bg-muted p-4">
                                <Search className="h-7 w-7 text-muted-foreground" />
                            </div>
                            <h3 className="font-semibold">No students found</h3>
                            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                                Try changing your search term or filters to find students.
                            </p>
                            <Button
                                variant="outline"
                                className="mt-4"
                                onClick={resetFilters}
                            >
                                Clear all filters
                            </Button>
                        </div>
                    ) : view === "table" ? (
                        <div className="space-y-4">
                            {/* Desktop Table */}
                            <div className="hidden overflow-hidden rounded-lg border md:block">
                                <table className="w-full text-sm">
                                    <thead className="bg-muted/50">
                                        <tr className="text-left text-muted-foreground">
                                            <th className="px-4 py-3 font-medium">Student</th>
                                            <th className="px-4 py-3 font-medium">Student ID</th>
                                            <th className="px-4 py-3 font-medium">Program</th>
                                            <th className="px-4 py-3 font-medium">Year</th>
                                            <th className="px-4 py-3 font-medium">Status</th>
                                            <th className="px-4 py-3 text-right font-medium">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y">
                                        {paginatedStudents.map((student) => (
                                            <tr
                                                key={student.id}
                                                className="transition-colors hover:bg-muted/30"
                                            >
                                                <td className="px-4 py-3">
                                                    <div className="flex min-w-0 items-center gap-3">
                                                        <Avatar className="h-9 w-9">
                                                            <AvatarImage src={student.avatar} />
                                                            <AvatarFallback>
                                                                {getInitials(student.name)}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="min-w-0">
                                                            <p className="truncate font-medium">
                                                                {student.name}
                                                            </p>
                                                            <p className="truncate text-xs text-muted-foreground">
                                                                {student.email}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-4 py-3 font-mono text-xs">
                                                    {student.studentId}
                                                </td>

                                                <td className="max-w-[180px] px-4 py-3">
                                                    <p className="truncate">{student.program}</p>
                                                </td>

                                                <td className="px-4 py-3">
                                                    <span>{student.year}</span>
                                                    <p className="text-xs text-muted-foreground">
                                                        {student.semester}
                                                    </p>
                                                </td>

                                                <td className="px-4 py-3">
                                                    <Badge
                                                        variant="outline"
                                                        className={statusConfig[student.status].className}
                                                    >
                                                        {statusConfig[student.status].label}
                                                    </Badge>
                                                </td>

                                                <td className="px-4 py-3 text-right">
                                                    <StudentActions studentId={student.id} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile List */}
                            <div className="grid gap-3 md:hidden">
                                {paginatedStudents.map((student) => (
                                    <StudentCard
                                        key={student.id}
                                        student={student}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            {paginatedStudents.map((student) => (
                                <StudentCard
                                    key={student.id}
                                    student={student}
                                />
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {filteredStudents.length > 0 && (
                        <div className="mt-6 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-sm text-muted-foreground">
                                Page {currentPage} of {totalPages}
                            </p>

                            <div className="flex items-center gap-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    disabled={currentPage === 1}
                                    onClick={() => changePage(currentPage - 1)}
                                >
                                    <ChevronLeft className="mr-1 h-4 w-4" />
                                    Previous
                                </Button>

                                <Button
                                    size="sm"
                                    variant="outline"
                                    disabled={currentPage === totalPages}
                                    onClick={() => changePage(currentPage + 1)}
                                >
                                    Next
                                    <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Additional Information */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <BookOpen className="h-5 w-5 text-primary" />
                            Program Distribution
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <ProgramProgress
                            label="Computer Science"
                            count={4}
                            total={studentsData.length}
                        />
                        <ProgramProgress
                            label="Software Engineering"
                            count={4}
                            total={studentsData.length}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <GraduationCap className="h-5 w-5 text-primary" />
                            Student Status Overview
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-3">
                        <StatusSummary
                            label="Active"
                            count={activeCount}
                            color="bg-emerald-500"
                        />
                        <StatusSummary
                            label="Pending"
                            count={pendingCount}
                            color="bg-amber-500"
                        />
                        <StatusSummary
                            label="Graduated"
                            count={graduatedCount}
                            color="bg-blue-500"
                        />
                        <StatusSummary
                            label="Suspended"
                            count={suspendedCount}
                            color="bg-red-500"
                        />
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
                    <p className="mt-2 text-2xl font-bold tracking-tight">{value}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{description}</p>
                </div>
                <div className={`shrink-0 rounded-xl p-3 ${iconClass}`}>
                    <Icon className="h-5 w-5" />
                </div>
            </CardContent>
        </Card>
    );
}

function StudentCard({ student }: { student: Student }) {
    return (
        <Card className="border-border/60 shadow-sm">
            <CardContent className="space-y-4 p-4">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                        <Avatar className="h-11 w-11">
                            <AvatarImage src={student.avatar} />
                            <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                            <p className="truncate font-semibold">{student.name}</p>
                            <p className="truncate text-xs text-muted-foreground">
                                {student.studentId}
                            </p>
                        </div>
                    </div>

                    <Badge
                        variant="outline"
                        className={statusConfig[student.status].className}
                    >
                        {statusConfig[student.status].label}
                    </Badge>
                </div>

                <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-4 w-4 shrink-0" />
                        <span className="truncate">{student.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <BookOpen className="h-4 w-4 shrink-0" />
                        <span className="truncate">{student.program}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <CalendarDays className="h-4 w-4 shrink-0" />
                        <span>
                            {student.year} · {student.semester}
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-between border-t pt-3">
                    <span className="text-xs text-muted-foreground">
                        Enrolled {formatDate(student.enrollmentDate)}
                    </span>
                    <StudentActions studentId={student.id} />
                </div>
            </CardContent>
        </Card>
    );
}

function StudentActions({ studentId }: { studentId: string }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={<Button
                variant="ghost"
                size="icon"
                aria-label="Student actions"
            >
                <MoreHorizontal className="h-4 w-4" />
            </Button>}>

            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuItem render={<Link
                    href={`/department-head/department/students/${studentId}`}
                    className="flex cursor-pointer items-center"
                >
                    <Eye className="mr-2 h-4 w-4" />
                    View Profile
                </Link>}>

                </DropdownMenuItem>

                <DropdownMenuItem render={<Link
                    href={`/department-head/department/students/${studentId}/edit`}
                    className="flex cursor-pointer items-center"
                >
                    <Users className="mr-2 h-4 w-4" />
                    Edit Student
                </Link>}>

                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function ProgramProgress({
    label,
    count,
    total,
}: {
    label: string;
    count: number;
    total: number;
}) {
    const percentage = total > 0 ? (count / total) * 100 : 0;

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium">{label}</span>
                <span className="text-muted-foreground">
                    {count} students
                </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}

function StatusSummary({
    label,
    count,
    color,
}: {
    label: string;
    count: number;
    color: string;
}) {
    return (
        <div className="flex items-center gap-3 rounded-lg border p-3">
            <div className={`h-2.5 w-2.5 shrink-0 rounded-full ${color}`} />
            <div>
                <p className="text-sm font-medium">{count}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
            </div>
        </div>
    );
}
