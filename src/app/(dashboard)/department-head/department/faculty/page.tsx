// import React from 'react'

// export default function faculty() {
//     return (
//         <div>Faculty Members</div>
//     )
// }

















"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
    Users,
    UserPlus,
    Search,
    Filter,
    MoreHorizontal,
    Mail,
    Phone,
    BookOpen,
    GraduationCap,
    BriefcaseBusiness,
    Download,
    Eye,
    Pencil,
    ArrowUpDown,
    ChevronLeft,
    ChevronRight,
    Building2,
    Clock3,
    CheckCircle2,
    XCircle,
    UserCheck,
    LayoutGrid,
    List,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Tabs,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

// --------------------------------------------------
// Types
// --------------------------------------------------

type FacultyStatus = "ACTIVE" | "ON_LEAVE" | "INACTIVE";

type FacultyMember = {
    id: string;
    employeeId: string;
    name: string;
    email: string;
    phone: string;
    designation: string;
    specialization: string;
    qualification: string;
    courses: number;
    workload: number;
    status: FacultyStatus;
    joinedAt: string;
    image?: string;
};

// --------------------------------------------------
// Demo Data
// Replace with your API response.
// --------------------------------------------------

const facultyMembers: FacultyMember[] = [
    {
        id: "1",
        employeeId: "INS-2026-0001",
        name: "Dr. Sarah Ahmed",
        email: "sarah.ahmed@university.edu",
        phone: "+880 1712-345678",
        designation: "Professor",
        specialization: "Artificial Intelligence",
        qualification: "Ph.D. in Computer Science",
        courses: 4,
        workload: 85,
        status: "ACTIVE",
        joinedAt: "2020-01-15",
    },
    {
        id: "2",
        employeeId: "INS-2026-0002",
        name: "Prof. Mohammad Rahman",
        email: "rahman@university.edu",
        phone: "+880 1812-345678",
        designation: "Associate Professor",
        specialization: "Database Management",
        qualification: "Ph.D. in Information Systems",
        courses: 3,
        workload: 72,
        status: "ACTIVE",
        joinedAt: "2021-03-10",
    },
    {
        id: "3",
        employeeId: "INS-2026-0003",
        name: "Dr. Nusrat Jahan",
        email: "nusrat@university.edu",
        phone: "+880 1912-345678",
        designation: "Assistant Professor",
        specialization: "Software Engineering",
        qualification: "Ph.D. in Software Engineering",
        courses: 5,
        workload: 95,
        status: "ACTIVE",
        joinedAt: "2022-06-20",
    },
    {
        id: "4",
        employeeId: "INS-2026-0004",
        name: "Md. Hasan Mahmud",
        email: "hasan@university.edu",
        phone: "+880 1612-345678",
        designation: "Lecturer",
        specialization: "Computer Networks",
        qualification: "M.Sc. in Computer Science",
        courses: 2,
        workload: 60,
        status: "ACTIVE",
        joinedAt: "2023-01-12",
    },
    {
        id: "5",
        employeeId: "INS-2026-0005",
        name: "Dr. Fatima Akter",
        email: "fatima@university.edu",
        phone: "+880 1512-345678",
        designation: "Assistant Professor",
        specialization: "Machine Learning",
        qualification: "Ph.D. in Artificial Intelligence",
        courses: 3,
        workload: 78,
        status: "ON_LEAVE",
        joinedAt: "2021-09-05",
    },
    {
        id: "6",
        employeeId: "INS-2026-0006",
        name: "Abdullah Al Mamun",
        email: "mamun@university.edu",
        phone: "+880 1312-345678",
        designation: "Lecturer",
        specialization: "Web Development",
        qualification: "M.Sc. in Computer Science",
        courses: 3,
        workload: 65,
        status: "ACTIVE",
        joinedAt: "2024-02-18",
    },
    {
        id: "7",
        employeeId: "INS-2026-0007",
        name: "Dr. Kamal Hossain",
        email: "kamal@university.edu",
        phone: "+880 1412-345678",
        designation: "Professor",
        specialization: "Cybersecurity",
        qualification: "Ph.D. in Cybersecurity",
        courses: 2,
        workload: 45,
        status: "INACTIVE",
        joinedAt: "2019-08-10",
    },
    {
        id: "8",
        employeeId: "INS-2026-0008",
        name: "Sadia Islam",
        email: "sadia@university.edu",
        phone: "+880 1713-456789",
        designation: "Lecturer",
        specialization: "Data Science",
        qualification: "M.Sc. in Data Science",
        courses: 3,
        workload: 70,
        status: "ACTIVE",
        joinedAt: "2025-01-08",
    },
];

// --------------------------------------------------
// Helpers
// --------------------------------------------------

const getInitials = (name: string) =>
    name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();

const statusConfig = {
    ACTIVE: {
        label: "Active",
        className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    },
    ON_LEAVE: {
        label: "On Leave",
        className: "bg-orange-500/10 text-orange-600 border-orange-500/20",
    },
    INACTIVE: {
        label: "Inactive",
        className: "bg-muted text-muted-foreground border-border",
    },
};

// --------------------------------------------------
// Component
// --------------------------------------------------

export default function FacultyMembers() {
    const [search, setSearch] = useState("");
    const [designation, setDesignation] = useState("all");
    const [status, setStatus] = useState("all");
    const [activeTab, setActiveTab] = useState("all");
    const [viewMode, setViewMode] = useState<"table" | "grid">("table");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [page, setPage] = useState(1);

    const pageSize = 6;

    // Statistics
    const totalFaculty = facultyMembers.length;

    const activeFaculty = facultyMembers.filter(
        (faculty) => faculty.status === "ACTIVE"
    ).length;

    const onLeaveFaculty = facultyMembers.filter(
        (faculty) => faculty.status === "ON_LEAVE"
    ).length;

    const inactiveFaculty = facultyMembers.filter(
        (faculty) => faculty.status === "INACTIVE"
    ).length;

    // Filtering and sorting
    const filteredFaculty = useMemo(() => {
        let result = [...facultyMembers];

        if (search.trim()) {
            const query = search.toLowerCase();

            result = result.filter((faculty) =>
                [
                    faculty.name,
                    faculty.employeeId,
                    faculty.email,
                    faculty.designation,
                    faculty.specialization,
                ].some((value) => value.toLowerCase().includes(query))
            );
        }

        if (designation !== "all") {
            result = result.filter(
                (faculty) => faculty.designation === designation
            );
        }

        if (status !== "all") {
            result = result.filter(
                (faculty) => faculty.status === status
            );
        }

        if (activeTab !== "all") {
            result = result.filter(
                (faculty) => faculty.status === activeTab
            );
        }

        result.sort((a, b) => {
            return sortOrder === "asc"
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
        });

        return result;
    }, [search, designation, status, activeTab, sortOrder]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredFaculty.length / pageSize)
    );

    const paginatedFaculty = filteredFaculty.slice(
        (page - 1) * pageSize,
        page * pageSize
    );

    const handleSearch = (value: string) => {
        setSearch(value);
        setPage(1);
    };

    const resetFilters = () => {
        setSearch("");
        setDesignation("all");
        setStatus("all");
        setActiveTab("all");
        setPage(1);
    };

    return (
        <div className="min-h-screen space-y-6 bg-background p-4 md:p-6 lg:p-8">

            {/* Header */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <Building2 className="size-4" />
                        Department
                        <span>/</span>
                        Faculty
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                        Faculty Members
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage and monitor faculty members in your department.
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    <Button variant="outline" className="gap-2">
                        <Download className="size-4" />
                        Export
                    </Button>

                    <Button className="gap-2"
                        render={<Link href="/department-head/department/faculty/create">
                            <UserPlus className="size-4" />
                            Add Faculty
                        </Link>} >

                    </Button>
                </div>
            </div>

            {/* Statistics */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <Card>
                    <CardContent className="flex items-center justify-between p-5">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Total Faculty
                            </p>
                            <h3 className="mt-2 text-3xl font-bold">
                                {totalFaculty}
                            </h3>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Registered members
                            </p>
                        </div>
                        <div className="rounded-xl bg-blue-500/10 p-3 text-blue-600">
                            <Users className="size-6" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center justify-between p-5">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Active Faculty
                            </p>
                            <h3 className="mt-2 text-3xl font-bold">
                                {activeFaculty}
                            </h3>
                            <p className="mt-1 text-xs text-emerald-600">
                                Currently working
                            </p>
                        </div>
                        <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-600">
                            <UserCheck className="size-6" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center justify-between p-5">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                On Leave
                            </p>
                            <h3 className="mt-2 text-3xl font-bold">
                                {onLeaveFaculty}
                            </h3>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Currently on leave
                            </p>
                        </div>
                        <div className="rounded-xl bg-orange-500/10 p-3 text-orange-600">
                            <Clock3 className="size-6" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center justify-between p-5">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Inactive Faculty
                            </p>
                            <h3 className="mt-2 text-3xl font-bold">
                                {inactiveFaculty}
                            </h3>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Not currently active
                            </p>
                        </div>
                        <div className="rounded-xl bg-muted p-3 text-muted-foreground">
                            <BriefcaseBusiness className="size-6" />
                        </div>
                    </CardContent>
                </Card>

            </div>

            {/* Faculty Directory */}
            <Card>
                <CardHeader>
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                        <div>
                            <CardTitle>Faculty Directory</CardTitle>
                            <CardDescription>
                                Browse and manage your department faculty members.
                            </CardDescription>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                variant={viewMode === "table" ? "secondary" : "outline"}
                                size="icon"
                                onClick={() => setViewMode("table")}
                                aria-label="Table view"
                            >
                                <List className="size-4" />
                            </Button>

                            <Button
                                variant={viewMode === "grid" ? "secondary" : "outline"}
                                size="icon"
                                onClick={() => setViewMode("grid")}
                                aria-label="Grid view"
                            >
                                <LayoutGrid className="size-4" />
                            </Button>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="space-y-5">

                    {/* Status Tabs */}
                    <Tabs
                        value={activeTab}
                        onValueChange={(value) => {
                            setActiveTab(value);
                            setPage(1);
                        }}
                    >
                        <TabsList className="h-auto flex-wrap">
                            <TabsTrigger value="all">
                                All ({totalFaculty})
                            </TabsTrigger>
                            <TabsTrigger value="ACTIVE">
                                Active ({activeFaculty})
                            </TabsTrigger>
                            <TabsTrigger value="ON_LEAVE">
                                On Leave ({onLeaveFaculty})
                            </TabsTrigger>
                            <TabsTrigger value="INACTIVE">
                                Inactive ({inactiveFaculty})
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>

                    {/* Filters */}
                    <div className="flex flex-col gap-3 lg:flex-row">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search by name, employee ID, email or specialization..."
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="pl-9"
                            />
                        </div>

                        <Select
                            value={designation}
                            onValueChange={(value) => {
                                setDesignation(value ?? "all");
                                setPage(1);
                            }}
                        >
                            <SelectTrigger className="w-full lg:w-[210px]">
                                <SelectValue placeholder="Designation" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="all">All Designations</SelectItem>
                                <SelectItem value="Professor">Professor</SelectItem>
                                <SelectItem value="Associate Professor">
                                    Associate Professor
                                </SelectItem>
                                <SelectItem value="Assistant Professor">
                                    Assistant Professor
                                </SelectItem>
                                <SelectItem value="Lecturer">Lecturer</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select
                            value={status}
                            onValueChange={(value) => {
                                setStatus(value ?? "all");
                                setPage(1);
                            }}
                        >
                            <SelectTrigger className="w-full lg:w-[170px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="all">All Statuses</SelectItem>
                                <SelectItem value="ACTIVE">Active</SelectItem>
                                <SelectItem value="ON_LEAVE">On Leave</SelectItem>
                                <SelectItem value="INACTIVE">Inactive</SelectItem>
                            </SelectContent>
                        </Select>

                        <Button variant="outline" onClick={resetFilters}>
                            <Filter className="mr-2 size-4" />
                            Reset
                        </Button>
                    </div>

                    {/* Results Count */}
                    <div className="flex items-center justify-between border-b pb-3 text-sm">
                        <p className="text-muted-foreground">
                            Showing{" "}
                            <span className="font-semibold text-foreground">
                                {filteredFaculty.length === 0
                                    ? 0
                                    : (page - 1) * pageSize + 1}
                                -
                                {Math.min(page * pageSize, filteredFaculty.length)}
                            </span>{" "}
                            of{" "}
                            <span className="font-semibold text-foreground">
                                {filteredFaculty.length}
                            </span>{" "}
                            faculty members
                        </p>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSortOrder(
                                sortOrder === "asc" ? "desc" : "asc"
                            )}
                            className="gap-2"
                        >
                            <ArrowUpDown className="size-4" />
                            Sort by name
                        </Button>
                    </div>

                    {/* Table View */}
                    {viewMode === "table" && (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[900px] text-sm">
                                <thead>
                                    <tr className="border-b text-left text-muted-foreground">
                                        <th className="pb-3 font-medium">Faculty Member</th>
                                        <th className="pb-3 font-medium">Designation</th>
                                        <th className="pb-3 font-medium">Specialization</th>
                                        <th className="pb-3 font-medium">Courses</th>
                                        <th className="pb-3 font-medium">Workload</th>
                                        <th className="pb-3 font-medium">Status</th>
                                        <th className="pb-3 text-right font-medium">Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {paginatedFaculty.map((faculty) => (
                                        <tr
                                            key={faculty.id}
                                            className="border-b last:border-0 transition-colors hover:bg-muted/30"
                                        >
                                            <td className="py-4">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="size-10">
                                                        <AvatarImage src={faculty.image} />
                                                        <AvatarFallback>
                                                            {getInitials(faculty.name)}
                                                        </AvatarFallback>
                                                    </Avatar>

                                                    <div className="min-w-0">
                                                        <p className="font-semibold">
                                                            {faculty.name}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {faculty.employeeId}
                                                        </p>
                                                        <p className="mt-1 text-xs text-muted-foreground">
                                                            {faculty.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="py-4">
                                                <span className="font-medium">
                                                    {faculty.designation}
                                                </span>
                                            </td>

                                            <td className="py-4">
                                                {faculty.specialization}
                                            </td>

                                            <td className="py-4">
                                                <Badge variant="secondary">
                                                    {faculty.courses} Courses
                                                </Badge>
                                            </td>

                                            <td className="py-4">
                                                <div className="flex min-w-[100px] items-center gap-2">
                                                    <div className="h-2 w-16 overflow-hidden rounded-full bg-muted">
                                                        <div
                                                            className={`h-full rounded-full ${faculty.workload >= 90
                                                                ? "bg-orange-500"
                                                                : "bg-primary"
                                                                }`}
                                                            style={{ width: `${faculty.workload}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-xs font-medium">
                                                        {faculty.workload}%
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="py-4">
                                                <Badge
                                                    variant="outline"
                                                    className={statusConfig[faculty.status].className}
                                                >
                                                    {statusConfig[faculty.status].label}
                                                </Badge>
                                            </td>

                                            <td className="py-4 text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger render={
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            aria-label={`Actions for ${faculty.name}`}
                                                        >
                                                            <MoreHorizontal className="size-4" />
                                                        </Button>
                                                    }>

                                                    </DropdownMenuTrigger>

                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>
                                                            Faculty Actions
                                                        </DropdownMenuLabel>

                                                        <DropdownMenuSeparator />

                                                        <DropdownMenuItem render={
                                                            <Link href={`/department-head/department/faculty/${faculty.id}`}>
                                                                <Eye className="mr-2 size-4" />
                                                                View Profile
                                                            </Link>
                                                        }>

                                                        </DropdownMenuItem>

                                                        <DropdownMenuItem render={
                                                            <Link href={`/department-head/department/faculty/${faculty.id}/edit`}>
                                                                <Pencil className="mr-2 size-4" />
                                                                Edit Details
                                                            </Link>
                                                        }>

                                                        </DropdownMenuItem>

                                                        <DropdownMenuItem render={
                                                            <Link href="/department-head/faculty-workload">
                                                                <Clock3 className="mr-2 size-4" />
                                                                View Workload
                                                            </Link>
                                                        }>

                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Grid View */}
                    {viewMode === "grid" && (
                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            {paginatedFaculty.map((faculty) => (
                                <Card key={faculty.id} className="shadow-none">
                                    <CardContent className="p-5">
                                        <div className="flex items-start justify-between">
                                            <Avatar className="size-14">
                                                <AvatarImage src={faculty.image} />
                                                <AvatarFallback>
                                                    {getInitials(faculty.name)}
                                                </AvatarFallback>
                                            </Avatar>

                                            <Badge
                                                variant="outline"
                                                className={statusConfig[faculty.status].className}
                                            >
                                                {statusConfig[faculty.status].label}
                                            </Badge>
                                        </div>

                                        <h3 className="mt-4 font-semibold">
                                            {faculty.name}
                                        </h3>

                                        <p className="mt-1 text-xs text-muted-foreground">
                                            {faculty.designation}
                                        </p>

                                        <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                                            <BookOpen className="size-3.5" />
                                            {faculty.specialization}
                                        </p>

                                        <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                                            <Mail className="size-3.5" />
                                            <span className="truncate">{faculty.email}</span>
                                        </p>

                                        <div className="mt-4 flex justify-between border-t pt-4 text-xs">
                                            <span className="text-muted-foreground">
                                                {faculty.courses} Courses
                                            </span>
                                            <span className="font-semibold">
                                                {faculty.workload}% Workload
                                            </span>
                                        </div>

                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="mt-4 w-full"
                                            render={
                                                <Link href={`/department-head/department/faculty/${faculty.id}`}>
                                                    <Eye className="mr-2 size-4" />
                                                    View Profile
                                                </Link>
                                            }
                                        >

                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}

                    {/* Empty State */}
                    {filteredFaculty.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="rounded-full bg-muted p-4">
                                <Users className="size-8 text-muted-foreground" />
                            </div>

                            <h3 className="mt-4 font-semibold">
                                No faculty members found
                            </h3>

                            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                                Try adjusting your search or filters to find faculty members.
                            </p>

                            <Button
                                variant="outline"
                                className="mt-4"
                                onClick={resetFilters}
                            >
                                Clear Filters
                            </Button>
                        </div>
                    )}

                    {/* Pagination */}
                    {filteredFaculty.length > 0 && (
                        <div className="flex flex-col justify-between gap-3 border-t pt-4 sm:flex-row sm:items-center">
                            <p className="text-xs text-muted-foreground">
                                Page {page} of {totalPages}
                            </p>

                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={page === 1}
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                >
                                    <ChevronLeft className="mr-1 size-4" />
                                    Previous
                                </Button>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={page >= totalPages}
                                    onClick={() =>
                                        setPage((p) => Math.min(totalPages, p + 1))
                                    }
                                >
                                    Next
                                    <ChevronRight className="ml-1 size-4" />
                                </Button>
                            </div>
                        </div>
                    )}

                </CardContent>
            </Card>

            {/* Faculty Management Information */}
            <Card className="border-primary/20 bg-primary/[0.03]">
                <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <GraduationCap className="size-6" />
                    </div>

                    <div className="flex-1">
                        <h3 className="font-semibold">
                            Faculty Management
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Monitor faculty performance, teaching workload, academic
                            assignments, and employment status from one place.
                        </p>
                    </div>

                    <Button variant="outline" size="sm" render={
                        <Link href="/department-head/faculty-workload">
                            View Workload
                            <BookOpen className="ml-2 size-4" />
                        </Link>
                    }>
                    </Button>
                </CardContent>
            </Card>

        </div>
    );
}
