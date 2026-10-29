// import React from 'react'

// export default function instructors() {
//   return (
//     <div>instructors</div>
//   )
// }














"use client";

import { useMemo, useState } from "react";
import {
    Search,
    Plus,
    Users,
    UserCheck,
    UserRoundCheck,
    Clock3,
    MoreHorizontal,
    Eye,
    Pencil,
    CheckCircle2,
    XCircle,
    Mail,
    BookOpen,
    GraduationCap,
    Building2,
} from "lucide-react";

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

type InstructorStatus = "ACTIVE" | "PENDING" | "INACTIVE";

type Instructor = {
    id: string;
    employeeId: string;
    name: string;
    email: string;
    department: string;
    designation: string;
    courses: number;
    students: number;
    status: InstructorStatus;
};

const initialInstructors: Instructor[] = [
    {
        id: "1",
        employeeId: "INS-2026-0001",
        name: "Dr. Ahmed Rahman",
        email: "ahmed.rahman@campusflow.edu",
        department: "Computer Science",
        designation: "Associate Professor",
        courses: 3,
        students: 126,
        status: "ACTIVE",
    },
    {
        id: "2",
        employeeId: "INS-2026-0002",
        name: "Prof. Nusrat Jahan",
        email: "nusrat.jahan@campusflow.edu",
        department: "Computer Science",
        designation: "Professor",
        courses: 2,
        students: 84,
        status: "ACTIVE",
    },
    {
        id: "3",
        employeeId: "INS-2026-0003",
        name: "Dr. Mahmud Hasan",
        email: "mahmud.hasan@campusflow.edu",
        department: "Electrical Engineering",
        designation: "Assistant Professor",
        courses: 2,
        students: 76,
        status: "ACTIVE",
    },
    {
        id: "4",
        employeeId: "INS-2026-0004",
        name: "Dr. Farhana Islam",
        email: "farhana.islam@campusflow.edu",
        department: "Business Administration",
        designation: "Associate Professor",
        courses: 3,
        students: 110,
        status: "ACTIVE",
    },
    {
        id: "5",
        employeeId: "INS-2026-0005",
        name: "Mr. Tanvir Hossain",
        email: "tanvir.hossain@campusflow.edu",
        department: "Computer Science",
        designation: "Lecturer",
        courses: 0,
        students: 0,
        status: "PENDING",
    },
    {
        id: "6",
        employeeId: "INS-2026-0006",
        name: "Ms. Samia Akter",
        email: "samia.akter@campusflow.edu",
        department: "Arts and Humanities",
        designation: "Lecturer",
        courses: 2,
        students: 68,
        status: "ACTIVE",
    },
    {
        id: "7",
        employeeId: "INS-2026-0007",
        name: "Dr. Rezaul Karim",
        email: "rezaul.karim@campusflow.edu",
        department: "Mathematics",
        designation: "Professor",
        courses: 1,
        students: 42,
        status: "INACTIVE",
    },
    {
        id: "8",
        employeeId: "INS-2026-0008",
        name: "Prof. Arif Chowdhury",
        email: "arif.chowdhury@campusflow.edu",
        department: "Computer Science",
        designation: "Professor",
        courses: 2,
        students: 90,
        status: "ACTIVE",
    },
];

const statusStyles: Record<InstructorStatus, string> = {
    ACTIVE:
        "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300",
    PENDING:
        "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300",
    INACTIVE:
        "border-gray-200 bg-gray-100 text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300",
};

function StatusBadge({ status }: { status: InstructorStatus }) {
    return (
        <Badge
            variant="outline"
            className={`whitespace-nowrap font-medium ${statusStyles[status]}`}
        >
            {status.charAt(0) + status.slice(1).toLowerCase()}
        </Badge>
    );
}

function InstructorAvatar({ name }: { name: string }) {
    const initials = name
        .replace(/^(Dr\.|Prof\.|Mr\.|Ms\.|Mrs\.)\s*/i, "")
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();

    return (
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
            {initials || "IN"}
        </div>
    );
}

function InstructorActions({
    instructor,
    onView,
    onEdit,
    onStatusChange,
}: {
    instructor: Instructor;
    onView: (instructor: Instructor) => void;
    onEdit: (instructor: Instructor) => void;
    onStatusChange: (id: string, status: InstructorStatus) => void;
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="size-8 shrink-0"
                        aria-label={`Actions for ${instructor.name}`}
                    >
                        <MoreHorizontal className="size-4" />
                    </Button>
                }
            />

            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => onView(instructor)}>
                    <Eye className="mr-2 size-4" />
                    View details
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => onEdit(instructor)}>
                    <Pencil className="mr-2 size-4" />
                    Edit instructor
                </DropdownMenuItem>

                {instructor.status !== "ACTIVE" && (
                    <DropdownMenuItem
                        onClick={() => onStatusChange(instructor.id, "ACTIVE")}
                    >
                        <CheckCircle2 className="mr-2 size-4" />
                        Activate instructor
                    </DropdownMenuItem>
                )}

                {instructor.status !== "INACTIVE" && (
                    <DropdownMenuItem
                        onClick={() => onStatusChange(instructor.id, "INACTIVE")}
                    >
                        <XCircle className="mr-2 size-4" />
                        Deactivate instructor
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default function InstructorsPage() {
    const [instructors, setInstructors] =
        useState<Instructor[]>(initialInstructors);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [departmentFilter, setDepartmentFilter] = useState("ALL");
    const [selectedInstructor, setSelectedInstructor] =
        useState<Instructor | null>(null);
    const [dialogMode, setDialogMode] = useState<"view" | "edit" | null>(null);

    const departments = useMemo(
        () =>
            [...new Set(instructors.map((instructor) => instructor.department))].sort(),
        [instructors],
    );

    const filteredInstructors = useMemo(() => {
        const query = search.trim().toLowerCase();

        return instructors.filter((instructor) => {
            const matchesSearch =
                !query ||
                instructor.name.toLowerCase().includes(query) ||
                instructor.email.toLowerCase().includes(query) ||
                instructor.employeeId.toLowerCase().includes(query) ||
                instructor.department.toLowerCase().includes(query) ||
                instructor.designation.toLowerCase().includes(query);

            const matchesStatus =
                statusFilter === "ALL" || instructor.status === statusFilter;

            const matchesDepartment =
                departmentFilter === "ALL" ||
                instructor.department === departmentFilter;

            return matchesSearch && matchesStatus && matchesDepartment;
        });
    }, [instructors, search, statusFilter, departmentFilter]);

    const stats = useMemo(
        () => ({
            total: instructors.length,
            active: instructors.filter((item) => item.status === "ACTIVE").length,
            pending: instructors.filter((item) => item.status === "PENDING").length,
            departments: new Set(
                instructors.map((item) => item.department),
            ).size,
        }),
        [instructors],
    );

    function changeInstructorStatus(
        id: string,
        status: InstructorStatus,
    ) {
        setInstructors((current) =>
            current.map((instructor) =>
                instructor.id === id ? { ...instructor, status } : instructor,
            ),
        );

        setSelectedInstructor((current) =>
            current?.id === id ? { ...current, status } : current,
        );
    }

    function openDialog(
        instructor: Instructor,
        mode: "view" | "edit",
    ) {
        setSelectedInstructor(instructor);
        setDialogMode(mode);
    }

    function closeDialog() {
        setSelectedInstructor(null);
        setDialogMode(null);
    }

    return (
        <div className="w-full min-w-0 space-y-6 overflow-x-clip pb-8 p-4">
            {/* Page heading */}
            <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0 space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Instructors
                    </h1>
                    <p className="text-sm text-muted-foreground sm:text-base">
                        Manage instructor profiles, departments, and account statuses.
                    </p>
                </div>

                <Button
                    type="button"
                    className="w-full shrink-0 sm:w-auto"
                    onClick={() =>
                        window.alert("Connect this button to your Add Instructor form.")
                    }
                >
                    <Plus className="mr-2 size-4" />
                    Add Instructor
                </Button>
            </div>

            {/* Statistics */}
            <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <Card className="min-w-0">
                    <CardContent className="flex items-center justify-between gap-3 p-5">
                        <div className="min-w-0 space-y-1">
                            <p className="text-sm text-muted-foreground">
                                Total Instructors
                            </p>
                            <p className="text-2xl font-bold tabular-nums">{stats.total}</p>
                            <p className="text-xs text-muted-foreground">
                                Registered instructor profiles
                            </p>
                        </div>
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Users className="size-5" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="min-w-0">
                    <CardContent className="flex items-center justify-between gap-3 p-5">
                        <div className="min-w-0 space-y-1">
                            <p className="text-sm text-muted-foreground">Active Instructors</p>
                            <p className="text-2xl font-bold tabular-nums">{stats.active}</p>
                            <p className="text-xs text-muted-foreground">
                                Currently active accounts
                            </p>
                        </div>
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                            <UserCheck className="size-5" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="min-w-0">
                    <CardContent className="flex items-center justify-between gap-3 p-5">
                        <div className="min-w-0 space-y-1">
                            <p className="text-sm text-muted-foreground">Pending Approval</p>
                            <p className="text-2xl font-bold tabular-nums">{stats.pending}</p>
                            <p className="text-xs text-muted-foreground">
                                Awaiting verification
                            </p>
                        </div>
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                            <Clock3 className="size-5" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="min-w-0">
                    <CardContent className="flex items-center justify-between gap-3 p-5">
                        <div className="min-w-0 space-y-1">
                            <p className="text-sm text-muted-foreground">Departments</p>
                            <p className="text-2xl font-bold tabular-nums">
                                {stats.departments}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                With instructor profiles
                            </p>
                        </div>
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                            <Building2 className="size-5" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search and filters */}
            <Card className="min-w-0">
                <CardHeader className="pb-3">
                    <CardTitle className="text-base">All Instructors</CardTitle>
                </CardHeader>

                <CardContent className="min-w-0 space-y-4">
                    <div className="grid min-w-0 grid-cols-1 gap-3 md:grid-cols-3">
                        <div className="relative min-w-0">
                            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Search name, email, ID..."
                                className="w-full min-w-0 pl-9"
                                aria-label="Search instructors"
                            />
                        </div>

                        <Select
                            value={statusFilter}
                            onValueChange={(value) => setStatusFilter(value ?? "ALL")}
                        >
                            <SelectTrigger className="w-full min-w-0">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All statuses</SelectItem>
                                <SelectItem value="ACTIVE">Active</SelectItem>
                                <SelectItem value="PENDING">Pending</SelectItem>
                                <SelectItem value="INACTIVE">Inactive</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select
                            value={departmentFilter}
                            onValueChange={(value) => setDepartmentFilter(value ?? "ALL")}
                        >
                            <SelectTrigger className="w-full min-w-0">
                                <SelectValue placeholder="Filter by department" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All departments</SelectItem>
                                {departments.map((department) => (
                                    <SelectItem key={department} value={department}>
                                        {department}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
                        <span>
                            Showing{" "}
                            <span className="font-medium text-foreground">
                                {filteredInstructors.length}
                            </span>{" "}
                            of {instructors.length} instructors
                        </span>

                        {(search ||
                            statusFilter !== "ALL" ||
                            departmentFilter !== "ALL") && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        setSearch("");
                                        setStatusFilter("ALL");
                                        setDepartmentFilter("ALL");
                                    }}
                                >
                                    Clear filters
                                </Button>
                            )}
                    </div>
                </CardContent>
            </Card>

            {/* Mobile cards */}
            <div className="grid min-w-0 grid-cols-1 gap-4 md:hidden">
                {filteredInstructors.map((instructor) => (
                    <Card key={instructor.id} className="min-w-0 overflow-hidden">
                        <CardContent className="min-w-0 space-y-4 p-4">
                            <div className="flex min-w-0 items-start gap-3">
                                <InstructorAvatar name={instructor.name} />

                                <div className="min-w-0 flex-1 space-y-1">
                                    <h3 className="break-words font-semibold leading-snug">
                                        {instructor.name}
                                    </h3>
                                    <p className="break-words text-xs text-muted-foreground">
                                        {instructor.employeeId}
                                    </p>
                                    <p className="break-all text-sm text-muted-foreground">
                                        {instructor.email}
                                    </p>
                                </div>

                                <InstructorActions
                                    instructor={instructor}
                                    onView={(item) => openDialog(item, "view")}
                                    onEdit={(item) => openDialog(item, "edit")}
                                    onStatusChange={changeInstructorStatus}
                                />
                            </div>

                            <div className="min-w-0 space-y-3 rounded-lg bg-muted/40 p-3">
                                <div className="min-w-0">
                                    <p className="mb-1 text-xs text-muted-foreground">
                                        Department
                                    </p>
                                    <p className="break-words text-sm font-medium">
                                        {instructor.department}
                                    </p>
                                </div>

                                <div className="min-w-0">
                                    <p className="mb-1 text-xs text-muted-foreground">
                                        Designation
                                    </p>
                                    <p className="break-words text-sm font-medium">
                                        {instructor.designation}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <p className="mb-1 text-xs text-muted-foreground">
                                            Courses
                                        </p>
                                        <p className="flex items-center gap-1.5 text-sm font-medium">
                                            <BookOpen className="size-4 text-muted-foreground" />
                                            {instructor.courses}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="mb-1 text-xs text-muted-foreground">
                                            Students
                                        </p>
                                        <p className="flex items-center gap-1.5 text-sm font-medium">
                                            <GraduationCap className="size-4 text-muted-foreground" />
                                            {instructor.students}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <p className="mb-1 text-xs text-muted-foreground">Status</p>
                                    <StatusBadge status={instructor.status} />
                                </div>
                            </div>

                            <Button
                                type="button"
                                variant="outline"
                                className="w-full"
                                onClick={() => openDialog(instructor, "view")}
                            >
                                <Eye className="mr-2 size-4" />
                                View instructor details
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Desktop table */}
            <Card className="hidden min-w-0 overflow-hidden md:block">
                <div className="w-full min-w-0">
                    <table className="w-full table-fixed text-sm">
                        <colgroup>
                            <col className="w-[25%]" />
                            <col className="w-[19%]" />
                            <col className="w-[16%]" />
                            <col className="w-[8%]" />
                            <col className="w-[9%]" />
                            <col className="w-[12%]" />
                            <col className="w-[11%]" />
                        </colgroup>

                        <thead>
                            <tr className="border-b bg-muted/40 text-left">
                                <th className="px-3 py-3 font-medium">Instructor</th>
                                <th className="px-3 py-3 font-medium">Department</th>
                                <th className="px-3 py-3 font-medium">Designation</th>
                                <th className="px-2 py-3 text-center font-medium">Courses</th>
                                <th className="px-2 py-3 text-center font-medium">Students</th>
                                <th className="px-3 py-3 font-medium">Status</th>
                                <th className="px-3 py-3 text-right font-medium">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredInstructors.map((instructor) => (
                                <tr
                                    key={instructor.id}
                                    className="border-b last:border-0 transition-colors hover:bg-muted/30"
                                >
                                    <td className="px-3 py-4 align-top">
                                        <div className="flex min-w-0 items-start gap-2.5">
                                            <InstructorAvatar name={instructor.name} />
                                            <div className="min-w-0">
                                                <p className="break-words font-medium leading-snug">
                                                    {instructor.name}
                                                </p>
                                                <p className="mt-1 break-all text-xs text-muted-foreground">
                                                    {instructor.email}
                                                </p>
                                                <p className="mt-1 break-words text-xs text-muted-foreground">
                                                    {instructor.employeeId}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="break-words px-3 py-4 align-top text-muted-foreground">
                                        {instructor.department}
                                    </td>

                                    <td className="break-words px-3 py-4 align-top">
                                        {instructor.designation}
                                    </td>

                                    <td className="px-2 py-4 text-center align-top">
                                        {instructor.courses}
                                    </td>

                                    <td className="px-2 py-4 text-center align-top">
                                        {instructor.students}
                                    </td>

                                    <td className="px-3 py-4 align-top">
                                        <StatusBadge status={instructor.status} />
                                    </td>

                                    <td className="px-3 py-3 text-right align-top">
                                        <div className="flex justify-end">
                                            <InstructorActions
                                                instructor={instructor}
                                                onView={(item) => openDialog(item, "view")}
                                                onEdit={(item) => openDialog(item, "edit")}
                                                onStatusChange={changeInstructorStatus}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Empty state */}
            {filteredInstructors.length === 0 && (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center px-4 py-12 text-center">
                        <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-muted">
                            <Search className="size-5 text-muted-foreground" />
                        </div>
                        <h3 className="font-semibold">No instructors found</h3>
                        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                            Try another search term or change your filters.
                        </p>
                        <Button
                            type="button"
                            variant="outline"
                            className="mt-4"
                            onClick={() => {
                                setSearch("");
                                setStatusFilter("ALL");
                                setDepartmentFilter("ALL");
                            }}
                        >
                            Clear filters
                        </Button>
                    </CardContent>
                </Card>
            )}

            {/* Instructor details / status editor */}
            {selectedInstructor && dialogMode && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) closeDialog();
                    }}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="instructor-dialog-title"
                        className="my-auto w-full max-w-lg rounded-xl border bg-background p-5 shadow-xl sm:p-6"
                    >
                        <div className="mb-5 flex items-start justify-between gap-3">
                            <div className="flex min-w-0 items-start gap-3">
                                <InstructorAvatar name={selectedInstructor.name} />
                                <div className="min-w-0">
                                    <h2
                                        id="instructor-dialog-title"
                                        className="break-words text-lg font-semibold"
                                    >
                                        {dialogMode === "view"
                                            ? "Instructor details"
                                            : "Edit instructor"}
                                    </h2>
                                    <p className="mt-1 break-words text-sm text-muted-foreground">
                                        {selectedInstructor.employeeId}
                                    </p>
                                </div>
                            </div>

                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={closeDialog}
                            >
                                Close
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="min-w-0">
                                <p className="text-xs text-muted-foreground">Full name</p>
                                <p className="mt-1 break-words text-sm font-medium">
                                    {selectedInstructor.name}
                                </p>
                            </div>

                            <div className="min-w-0">
                                <p className="text-xs text-muted-foreground">Email</p>
                                <p className="mt-1 break-all text-sm font-medium">
                                    {selectedInstructor.email}
                                </p>
                            </div>

                            <div className="min-w-0">
                                <p className="text-xs text-muted-foreground">Department</p>
                                <p className="mt-1 break-words text-sm font-medium">
                                    {selectedInstructor.department}
                                </p>
                            </div>

                            <div className="min-w-0">
                                <p className="text-xs text-muted-foreground">Designation</p>
                                <p className="mt-1 break-words text-sm font-medium">
                                    {selectedInstructor.designation}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground">Courses</p>
                                <p className="mt-1 text-sm font-medium">
                                    {selectedInstructor.courses}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground">Students</p>
                                <p className="mt-1 text-sm font-medium">
                                    {selectedInstructor.students}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground">Status</p>
                                <div className="mt-1">
                                    <StatusBadge status={selectedInstructor.status} />
                                </div>
                            </div>
                        </div>

                        {dialogMode === "edit" && (
                            <div className="mt-5 space-y-2">
                                <p className="text-sm font-medium">Instructor status</p>

                                <Select
                                    value={selectedInstructor.status}
                                    onValueChange={(value) => {
                                        if (!value) return;

                                        changeInstructorStatus(
                                            selectedInstructor.id,
                                            value as InstructorStatus,
                                        );
                                    }}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ACTIVE">Active</SelectItem>
                                        <SelectItem value="PENDING">Pending</SelectItem>
                                        <SelectItem value="INACTIVE">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>

                                <p className="text-xs text-muted-foreground">
                                    This demo updates the status in local page state only.
                                </p>
                            </div>
                        )}

                        <div className="mt-6 flex justify-end">
                            <Button type="button" onClick={closeDialog}>
                                Done
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
