

"use client";

import React, { useMemo, useState } from "react";
import {
  Users,
  UserCheck,
  UserX,
  UserPlus,
  GraduationCap,
  Search,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  Eye,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type StudentStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "GRADUATED"
  | "SUSPENDED";

type Student = {
  id: string;
  name: string;
  studentId: string;
  program: string;
  department: string;
  semester: number;
  status: StudentStatus;
  admissionYear: number;
  gender: "Male" | "Female";
};

const students: Student[] = [
  {
    id: "1",
    name: "Ayan Ahmed",
    studentId: "STU-2026-CSE-0001",
    program: "B.Sc. in Computer Science",
    department: "Computer Science & Engineering",
    semester: 1,
    status: "ACTIVE",
    admissionYear: 2026,
    gender: "Male",
  },
  {
    id: "2",
    name: "Nusrat Jahan",
    studentId: "STU-2026-BBA-0002",
    program: "Bachelor of Business Administration",
    department: "Business Administration",
    semester: 2,
    status: "ACTIVE",
    admissionYear: 2026,
    gender: "Female",
  },
  {
    id: "3",
    name: "Rahim Hasan",
    studentId: "STU-2025-CSE-0003",
    program: "B.Sc. in Computer Science",
    department: "Computer Science & Engineering",
    semester: 4,
    status: "ACTIVE",
    admissionYear: 2025,
    gender: "Male",
  },
  {
    id: "4",
    name: "Sumaiya Akter",
    studentId: "STU-2024-ENG-0004",
    program: "Bachelor of Arts in English",
    department: "English",
    semester: 6,
    status: "INACTIVE",
    admissionYear: 2024,
    gender: "Female",
  },
  {
    id: "5",
    name: "Tanvir Hossain",
    studentId: "STU-2025-CSE-0005",
    program: "B.Sc. in Computer Science",
    department: "Computer Science & Engineering",
    semester: 3,
    status: "ACTIVE",
    admissionYear: 2025,
    gender: "Male",
  },
  {
    id: "6",
    name: "Mim Rahman",
    studentId: "STU-2023-BBA-0006",
    program: "Bachelor of Business Administration",
    department: "Business Administration",
    semester: 8,
    status: "GRADUATED",
    admissionYear: 2023,
    gender: "Female",
  },
  {
    id: "7",
    name: "Sakib Khan",
    studentId: "STU-2026-EEE-0007",
    program: "B.Sc. in Electrical Engineering",
    department: "Electrical & Electronic Engineering",
    semester: 1,
    status: "ACTIVE",
    admissionYear: 2026,
    gender: "Male",
  },
  {
    id: "8",
    name: "Jannatul Ferdous",
    studentId: "STU-2024-CSE-0008",
    program: "B.Sc. in Computer Science",
    department: "Computer Science & Engineering",
    semester: 5,
    status: "SUSPENDED",
    admissionYear: 2024,
    gender: "Female",
  },
];

const statusConfig: Record<
  StudentStatus,
  {
    label: string;
    className: string;
  }
> = {
  ACTIVE: {
    label: "Active",
    className:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900",
  },
  INACTIVE: {
    label: "Inactive",
    className:
      "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
  },
  GRADUATED: {
    label: "Graduated",
    className:
      "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900",
  },
  SUSPENDED: {
    label: "Suspended",
    className:
      "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900",
  },
};

export default function StudentReports() {
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("ALL");
  const [program, setProgram] = useState("ALL");
  const [semester, setSemester] = useState("ALL");
  const [admissionYear, setAdmissionYear] = useState("ALL");

  const programs = useMemo(
    () => [...new Set(students.map((student) => student.program))],
    [],
  );

  const admissionYears = useMemo(
    () =>
      [...new Set(students.map((student) => student.admissionYear))].sort(
        (a, b) => b - a,
      ),
    [],
  );

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const normalizedSearch = searchTerm.toLowerCase().trim();

      const matchesSearch =
        student.name.toLowerCase().includes(normalizedSearch) ||
        student.studentId.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        status === "ALL" || student.status === status;

      const matchesProgram =
        program === "ALL" || student.program === program;

      const matchesSemester =
        semester === "ALL" ||
        student.semester.toString() === semester;

      const matchesAdmissionYear =
        admissionYear === "ALL" ||
        student.admissionYear.toString() === admissionYear;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesProgram &&
        matchesSemester &&
        matchesAdmissionYear
      );
    });
  }, [searchTerm, status, program, semester, admissionYear]);

  const totalStudents = students.length;

  const activeStudents = students.filter(
    (student) => student.status === "ACTIVE",
  ).length;

  const inactiveStudents = students.filter(
    (student) => student.status === "INACTIVE",
  ).length;

  const newAdmissions = students.filter(
    (student) => student.admissionYear === 2026,
  ).length;

  const activePercentage =
    totalStudents > 0
      ? Math.round((activeStudents / totalStudents) * 100)
      : 0;

  const programStats = programs
    .map((programName) => ({
      name: programName,
      count: students.filter(
        (student) => student.program === programName,
      ).length,
    }))
    .sort((a, b) => b.count - a.count);

  const semesterStats = Array.from({ length: 8 }, (_, index) => {
    const semesterNumber = index + 1;

    return {
      semester: semesterNumber,
      count: students.filter(
        (student) => student.semester === semesterNumber,
      ).length,
    };
  });

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Student Reports
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Analyze student population, admissions, enrollment status,
            programs, and semesters.
          </p>
        </div>

        <Button variant="outline" className="w-fit">
          <GraduationCap className="mr-2 h-4 w-4" />
          Academic Year 2026
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total Students */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Students
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {totalStudents}
                </p>

                <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                  <Users className="h-3.5 w-3.5" />
                  Current student population
                </div>
              </div>

              <div className="rounded-lg bg-blue-50 p-2.5 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400">
                <Users className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Students */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Active Students
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {activeStudents}
                </p>

                <div className="mt-2 flex items-center gap-1 text-xs text-emerald-600">
                  <TrendingUp className="h-3.5 w-3.5" />
                  {activePercentage}% of total
                </div>
              </div>

              <div className="rounded-lg bg-emerald-50 p-2.5 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
                <UserCheck className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Inactive Students */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Inactive Students
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {inactiveStudents}
                </p>

                <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                  <TrendingDown className="h-3.5 w-3.5" />
                  Requires attention
                </div>
              </div>

              <div className="rounded-lg bg-slate-100 p-2.5 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                <UserX className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* New Admissions */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  New Admissions
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {newAdmissions}
                </p>

                <div className="mt-2 flex items-center gap-1 text-xs text-blue-600">
                  <UserPlus className="h-3.5 w-3.5" />
                  Admission year 2026
                </div>
              </div>

              <div className="rounded-lg bg-amber-50 p-2.5 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">
                <UserPlus className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Program-wise */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Program-wise Students
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            {programStats.map((item) => {
              const percentage =
                totalStudents > 0
                  ? Math.round((item.count / totalStudents) * 100)
                  : 0;

              return (
                <div key={item.name} className="space-y-2">
                  <div className="flex items-center justify-between gap-4">
                    <p className="line-clamp-1 text-sm font-medium">
                      {item.name}
                    </p>

                    <span className="text-sm font-semibold">
                      {item.count}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>

                  <p className="text-xs text-muted-foreground">
                    {percentage}% of student population
                  </p>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Semester-wise */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Semester-wise Students
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {semesterStats.map((item) => (
                <div
                  key={item.semester}
                  className="rounded-lg border bg-muted/20 p-4"
                >
                  <p className="text-xs text-muted-foreground">
                    Semester
                  </p>

                  <p className="mt-1 text-lg font-semibold">
                    {item.semester}
                  </p>

                  <p className="mt-2 text-sm font-medium">
                    {item.count} students
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Student Population Details
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
                placeholder="Search student..."
                className="pl-9"
              />
            </div>

            {/* Status */}
            <Select
              value={status}
              onValueChange={(value) =>
                setStatus(value ?? "ALL")
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ALL">
                  All Status
                </SelectItem>

                <SelectItem value="ACTIVE">
                  Active
                </SelectItem>

                <SelectItem value="INACTIVE">
                  Inactive
                </SelectItem>

                <SelectItem value="GRADUATED">
                  Graduated
                </SelectItem>

                <SelectItem value="SUSPENDED">
                  Suspended
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Program */}
            <Select
              value={program}
              onValueChange={(value) =>
                setProgram(value ?? "ALL")
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Program" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ALL">
                  All Programs
                </SelectItem>

                {programs.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Semester */}
            <Select
              value={semester}
              onValueChange={(value) =>
                setSemester(value ?? "ALL")
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Semester" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ALL">
                  All Semesters
                </SelectItem>

                {Array.from(
                  { length: 8 },
                  (_, index) => index + 1,
                ).map((semesterNumber) => (
                  <SelectItem
                    key={semesterNumber}
                    value={semesterNumber.toString()}
                  >
                    Semester {semesterNumber}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Admission Year */}
            <Select
              value={admissionYear}
              onValueChange={(value) =>
                setAdmissionYear(value ?? "ALL")
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Admission Year" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ALL">
                  All Admission Years
                </SelectItem>

                {admissionYears.map((year) => (
                  <SelectItem
                    key={year}
                    value={year.toString()}
                  >
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Student Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle className="text-base">
                Student Population
              </CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                Showing {filteredStudents.length} of{" "}
                {totalStudents} students
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    Student
                  </TableHead>

                  <TableHead>
                    Program
                  </TableHead>

                  <TableHead>
                    Semester
                  </TableHead>

                  <TableHead>
                    Admission Year
                  </TableHead>

                  <TableHead>
                    Status
                  </TableHead>

                  <TableHead className="text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {student.name}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {student.studentId}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div>
                          <p className="max-w-[240px] truncate text-sm">
                            {student.program}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {student.department}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell>
                        Semester {student.semester}
                      </TableCell>

                      <TableCell>
                        {student.admissionYear}
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            statusConfig[
                              student.status
                            ].className
                          }
                        >
                          {
                            statusConfig[
                              student.status
                            ].label
                          }
                        </Badge>
                      </TableCell>

                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          title="View student"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          title="More actions"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="h-32 text-center"
                    >
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Users className="h-8 w-8 text-muted-foreground" />

                        <p className="font-medium">
                          No students found
                        </p>

                        <p className="text-sm text-muted-foreground">
                          Try changing your filters or search
                          term.
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

