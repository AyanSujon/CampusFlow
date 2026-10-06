



"use client";

import React, { useMemo, useState } from "react";
import {
  Award,
  BookOpen,
  CalendarDays,
  ChevronDown,
  Download,
  GraduationCap,
  Search,
  TrendingUp,
} from "lucide-react";

type Course = {
  code: string;
  title: string;
  credit: number;
  grade: string;
  gradePoint: number;
};

type Semester = {
  id: string;
  name: string;
  year: string;
  status: "Completed" | "In Progress";
  courses: Course[];
};

const semesters: Semester[] = [
  {
    id: "1",
    name: "Fall 2025",
    year: "2025",
    status: "Completed",
    courses: [
      {
        code: "CSE101",
        title: "Introduction to Programming",
        credit: 3,
        grade: "A",
        gradePoint: 4.0,
      },
      {
        code: "CSE102",
        title: "Data Structures",
        credit: 3,
        grade: "A-",
        gradePoint: 3.7,
      },
      {
        code: "MAT101",
        title: "Discrete Mathematics",
        credit: 3,
        grade: "B+",
        gradePoint: 3.3,
      },
      {
        code: "ENG101",
        title: "Academic English",
        credit: 2,
        grade: "A",
        gradePoint: 4.0,
      },
    ],
  },
  {
    id: "2",
    name: "Spring 2026",
    year: "2026",
    status: "Completed",
    courses: [
      {
        code: "CSE201",
        title: "Object Oriented Programming",
        credit: 3,
        grade: "A",
        gradePoint: 4.0,
      },
      {
        code: "CSE202",
        title: "Database Management Systems",
        credit: 3,
        grade: "A-",
        gradePoint: 3.7,
      },
      {
        code: "CSE203",
        title: "Computer Architecture",
        credit: 3,
        grade: "B+",
        gradePoint: 3.3,
      },
      {
        code: "MAT201",
        title: "Probability & Statistics",
        credit: 3,
        grade: "A",
        gradePoint: 4.0,
      },
    ],
  },
  {
    id: "3",
    name: "Fall 2026",
    year: "2026",
    status: "In Progress",
    courses: [
      {
        code: "CSE301",
        title: "Operating Systems",
        credit: 3,
        grade: "-",
        gradePoint: 0,
      },
      {
        code: "CSE302",
        title: "Computer Networks",
        credit: 3,
        grade: "-",
        gradePoint: 0,
      },
      {
        code: "CSE303",
        title: "Software Engineering",
        credit: 3,
        grade: "-",
        gradePoint: 0,
      },
    ],
  },
];

export default function Transcript() {
  const [selectedSemester, setSelectedSemester] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const completedSemesters = semesters.filter(
    (semester) => semester.status === "Completed"
  );

  const completedCourses = completedSemesters.flatMap(
    (semester) => semester.courses
  );

  const totalCredits = completedCourses.reduce(
    (sum, course) => sum + course.credit,
    0
  );

  const totalGradePoints = completedCourses.reduce(
    (sum, course) => sum + course.gradePoint * course.credit,
    0
  );

  const cumulativeGpa =
    totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : "0.00";

  const filteredSemesters = useMemo(() => {
    return semesters
      .filter(
        (semester) =>
          selectedSemester === "all" || semester.id === selectedSemester
      )
      .map((semester) => ({
        ...semester,
        courses: semester.courses.filter((course) => {
          const query = searchTerm.toLowerCase();

          return (
            course.code.toLowerCase().includes(query) ||
            course.title.toLowerCase().includes(query)
          );
        }),
      }))
      .filter((semester) => semester.courses.length > 0);
  }, [selectedSemester, searchTerm]);

  const getGradeClass = (grade: string) => {
    if (grade === "A" || grade === "A-") {
      return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400";
    }

    if (grade === "B+" || grade === "B") {
      return "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400";
    }

    if (grade === "C+" || grade === "C") {
      return "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400";
    }

    return "bg-muted text-muted-foreground";
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <GraduationCap className="h-5 w-5" />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  Academic Transcript
                </h1>

                <p className="text-sm text-muted-foreground">
                  View your academic performance and semester-wise results.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
          >
            <Download className="h-4 w-4" />
            Download Transcript
          </button>
        </div>

        {/* Student Summary */}
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <GraduationCap className="h-7 w-7" />
              </div>

              <div>
                <h2 className="font-semibold">Ayan Sujon</h2>
                <p className="text-sm text-muted-foreground">
                  Student ID: STU-2025-CSE-0001
                </p>
                <p className="text-sm text-muted-foreground">
                  B.Sc. in Computer Science & Engineering
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-lg bg-muted/50 px-4 py-3">
                <p className="text-xs text-muted-foreground">
                  Program
                </p>
                <p className="mt-1 text-sm font-semibold">B.Sc. CSE</p>
              </div>

              <div className="rounded-lg bg-muted/50 px-4 py-3">
                <p className="text-xs text-muted-foreground">
                  Status
                </p>
                <p className="mt-1 text-sm font-semibold text-emerald-600">
                  Active
                </p>
              </div>

              <div className="rounded-lg bg-muted/50 px-4 py-3">
                <p className="text-xs text-muted-foreground">
                  Semester
                </p>
                <p className="mt-1 text-sm font-semibold">3rd</p>
              </div>

              <div className="rounded-lg bg-muted/50 px-4 py-3">
                <p className="text-xs text-muted-foreground">
                  Academic Year
                </p>
                <p className="mt-1 text-sm font-semibold">2026</p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Cumulative GPA
                </p>
                <p className="mt-2 text-3xl font-bold">{cumulativeGpa}</p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>

            <p className="mt-3 text-xs text-muted-foreground">
              Based on completed semesters
            </p>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Earned Credits
                </p>
                <p className="mt-2 text-3xl font-bold">{totalCredits}</p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
                <BookOpen className="h-5 w-5" />
              </div>
            </div>

            <p className="mt-3 text-xs text-muted-foreground">
              Completed course credits
            </p>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Semesters
                </p>
                <p className="mt-2 text-3xl font-bold">
                  {completedSemesters.length}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600">
                <CalendarDays className="h-5 w-5" />
              </div>
            </div>

            <p className="mt-3 text-xs text-muted-foreground">
              Completed semesters
            </p>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Academic Standing
                </p>
                <p className="mt-2 text-xl font-bold text-emerald-600">
                  Good Standing
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
                <Award className="h-5 w-5" />
              </div>
            </div>

            <p className="mt-3 text-xs text-muted-foreground">
              Based on current GPA
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search course code or course name..."
                className="h-10 w-full rounded-lg border bg-background pl-9 pr-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="relative w-full lg:w-56">
              <select
                value={selectedSemester}
                onChange={(event) =>
                  setSelectedSemester(event.target.value)
                }
                className="h-10 w-full appearance-none rounded-lg border bg-background px-3 pr-9 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="all">All Semesters</option>

                {semesters.map((semester) => (
                  <option key={semester.id} value={semester.id}>
                    {semester.name}
                  </option>
                ))}
              </select>

              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Semester Results */}
        <div className="space-y-5">
          {filteredSemesters.map((semester) => {
            const semesterCredits = semester.courses.reduce(
              (sum, course) => sum + course.credit,
              0
            );

            const gradedCourses = semester.courses.filter(
              (course) => course.gradePoint > 0
            );

            const semesterPoints = gradedCourses.reduce(
              (sum, course) =>
                sum + course.gradePoint * course.credit,
              0
            );

            const semesterGpa =
              semesterCredits > 0 && gradedCourses.length > 0
                ? (
                    semesterPoints /
                    gradedCourses.reduce(
                      (sum, course) => sum + course.credit,
                      0
                    )
                  ).toFixed(2)
                : "-";

            return (
              <div
                key={semester.id}
                className="overflow-hidden rounded-xl border bg-card shadow-sm"
              >
                {/* Semester Header */}
                <div className="flex flex-col gap-3 border-b bg-muted/30 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-semibold">{semester.name}</h2>

                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          semester.status === "Completed"
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                            : "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
                        }`}
                      >
                        {semester.status}
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Academic Year {semester.year}
                    </p>
                  </div>

                  <div className="flex gap-5 text-sm">
                    <div>
                      <span className="text-muted-foreground">
                        Credits
                      </span>
                      <p className="font-semibold">
                        {semesterCredits}
                      </p>
                    </div>

                    <div>
                      <span className="text-muted-foreground">
                        Semester GPA
                      </span>
                      <p className="font-semibold">{semesterGpa}</p>
                    </div>
                  </div>
                </div>

                {/* Desktop Table */}
                <div className="hidden overflow-x-auto md:block">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/10">
                        <th className="px-5 py-3 text-left font-medium text-muted-foreground">
                          Course
                        </th>
                        <th className="px-5 py-3 text-left font-medium text-muted-foreground">
                          Course Title
                        </th>
                        <th className="px-5 py-3 text-center font-medium text-muted-foreground">
                          Credit
                        </th>
                        <th className="px-5 py-3 text-center font-medium text-muted-foreground">
                          Grade
                        </th>
                        <th className="px-5 py-3 text-center font-medium text-muted-foreground">
                          Grade Point
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {semester.courses.map((course) => (
                        <tr
                          key={course.code}
                          className="border-b last:border-0 hover:bg-muted/20"
                        >
                          <td className="px-5 py-4 font-medium">
                            {course.code}
                          </td>

                          <td className="px-5 py-4">
                            {course.title}
                          </td>

                          <td className="px-5 py-4 text-center">
                            {course.credit}
                          </td>

                          <td className="px-5 py-4 text-center">
                            <span
                              className={`inline-flex min-w-10 items-center justify-center rounded-full px-2.5 py-1 text-xs font-semibold ${getGradeClass(
                                course.grade
                              )}`}
                            >
                              {course.grade}
                            </span>
                          </td>

                          <td className="px-5 py-4 text-center font-medium">
                            {course.gradePoint || "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="divide-y md:hidden">
                  {semester.courses.map((course) => (
                    <div key={course.code} className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold">{course.code}</p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {course.title}
                          </p>
                        </div>

                        <span
                          className={`inline-flex min-w-10 items-center justify-center rounded-full px-2.5 py-1 text-xs font-semibold ${getGradeClass(
                            course.grade
                          )}`}
                        >
                          {course.grade}
                        </span>
                      </div>

                      <div className="mt-4 flex items-center gap-6 text-xs">
                        <div>
                          <span className="text-muted-foreground">
                            Credit
                          </span>
                          <p className="mt-1 font-medium">
                            {course.credit}
                          </p>
                        </div>

                        <div>
                          <span className="text-muted-foreground">
                            Grade Point
                          </span>
                          <p className="mt-1 font-medium">
                            {course.gradePoint || "-"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {filteredSemesters.length === 0 && (
            <div className="rounded-xl border bg-card px-5 py-16 text-center shadow-sm">
              <BookOpen className="mx-auto h-10 w-10 text-muted-foreground/50" />

              <h3 className="mt-4 font-semibold">
                No courses found
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Try changing your search or semester filter.
              </p>
            </div>
          )}
        </div>

        {/* Grading Scale */}
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <h2 className="font-semibold">Grading Scale</h2>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {[
              ["A", "4.00"],
              ["A-", "3.70"],
              ["B+", "3.30"],
              ["B", "3.00"],
              ["B-", "2.70"],
              ["C+", "2.30"],
              ["C", "2.00"],
              ["F", "0.00"],
            ].map(([grade, point]) => (
              <div
                key={grade}
                className="rounded-lg border bg-muted/20 px-3 py-3 text-center"
              >
                <p className="font-semibold">{grade}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


