


"use client";

import React, { useMemo, useState } from "react";
import {
  Award,
  BookOpen,
  CalendarDays,
  ChevronDown,
  GraduationCap,
  TrendingUp,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type GradeRecord = {
  code: string;
  course: string;
  credit: number;
  marks: number;
  grade: string;
  gradePoint: number;
};

type SemesterResult = {
  id: string;
  name: string;
  semester: string;
  gpa: number;
  totalCredits: number;
  records: GradeRecord[];
};

const semesterResults: SemesterResult[] = [
  {
    id: "fall-2026",
    name: "Fall 2026",
    semester: "Semester 5",
    gpa: 3.72,
    totalCredits: 15,
    records: [
      {
        code: "CSE-501",
        course: "Advanced Database Systems",
        credit: 3,
        marks: 88,
        grade: "A",
        gradePoint: 4.0,
      },
      {
        code: "CSE-503",
        course: "Software Engineering",
        credit: 3,
        marks: 84,
        grade: "A-",
        gradePoint: 3.7,
      },
      {
        code: "CSE-505",
        course: "Computer Networks",
        credit: 3,
        marks: 81,
        grade: "A-",
        gradePoint: 3.7,
      },
      {
        code: "CSE-507",
        course: "Web Engineering",
        credit: 3,
        marks: 91,
        grade: "A+",
        gradePoint: 4.0,
      },
      {
        code: "CSE-509",
        course: "Technical Communication",
        credit: 3,
        marks: 76,
        grade: "B+",
        gradePoint: 3.3,
      },
    ],
  },
  {
    id: "spring-2026",
    name: "Spring 2026",
    semester: "Semester 4",
    gpa: 3.58,
    totalCredits: 15,
    records: [
      {
        code: "CSE-401",
        course: "Operating Systems",
        credit: 3,
        marks: 85,
        grade: "A-",
        gradePoint: 3.7,
      },
      {
        code: "CSE-403",
        course: "Computer Architecture",
        credit: 3,
        marks: 79,
        grade: "B+",
        gradePoint: 3.3,
      },
      {
        code: "CSE-405",
        course: "Data Structures",
        credit: 3,
        marks: 88,
        grade: "A",
        gradePoint: 4.0,
      },
      {
        code: "CSE-407",
        course: "Discrete Mathematics",
        credit: 3,
        marks: 82,
        grade: "A-",
        gradePoint: 3.7,
      },
      {
        code: "CSE-409",
        course: "Statistics",
        credit: 3,
        marks: 75,
        grade: "B+",
        gradePoint: 3.3,
      },
    ],
  },
  {
    id: "fall-2025",
    name: "Fall 2025",
    semester: "Semester 3",
    gpa: 3.45,
    totalCredits: 15,
    records: [
      {
        code: "CSE-301",
        course: "Object Oriented Programming",
        credit: 3,
        marks: 83,
        grade: "A-",
        gradePoint: 3.7,
      },
      {
        code: "CSE-303",
        course: "Database Management",
        credit: 3,
        marks: 80,
        grade: "A-",
        gradePoint: 3.7,
      },
      {
        code: "CSE-305",
        course: "Algorithms",
        credit: 3,
        marks: 78,
        grade: "B+",
        gradePoint: 3.3,
      },
      {
        code: "CSE-307",
        course: "Digital Logic Design",
        credit: 3,
        marks: 74,
        grade: "B+",
        gradePoint: 3.3,
      },
      {
        code: "CSE-309",
        course: "Linear Algebra",
        credit: 3,
        marks: 77,
        grade: "B+",
        gradePoint: 3.3,
      },
    ],
  },
];

const gradeBadgeStyles: Record<string, string> = {
  "A+": "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  A: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  "A-": "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
  "B+": "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400",
  B: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400",
  "B-": "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-400",
  C: "bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400",
  F: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400",
};

export default function Grades() {
  const [selectedSemester, setSelectedSemester] = useState(
    semesterResults[0].id,
  );

  const result = useMemo(
    () =>
      semesterResults.find((item) => item.id === selectedSemester) ??
      semesterResults[0],
    [selectedSemester],
  );

  const totalMarks = result.records.reduce(
    (total, record) => total + record.marks,
    0,
  );

  const averageMarks = Math.round(totalMarks / result.records.length);

  const cumulativeGpa = 3.59;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl space-y-6">
        {/* Header */}
        <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400">
              <GraduationCap className="h-4 w-4" />
              Academic Performance
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Grades
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              View your semester-wise course results, GPA, and academic
              performance.
            </p>
          </div>

          {/* Semester Filter */}
          <div className="w-full sm:w-64">
            <Select
              value={selectedSemester}
              onValueChange={(value) => {
                if (value) setSelectedSemester(value);
              }}
            >
              <SelectTrigger className="h-11 bg-white dark:bg-slate-900">
                <CalendarDays className="mr-2 h-4 w-4 text-slate-500" />
                <SelectValue placeholder="Select semester" />
              </SelectTrigger>

              <SelectContent>
                {semesterResults.map((semester) => (
                  <SelectItem key={semester.id} value={semester.id}>
                    {semester.name} · {semester.semester}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </section>

        {/* Summary Cards */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            icon={<Award className="h-5 w-5" />}
            label="Semester GPA"
            value={result.gpa.toFixed(2)}
            description={result.name}
          />

          <SummaryCard
            icon={<TrendingUp className="h-5 w-5" />}
            label="Cumulative GPA"
            value={cumulativeGpa.toFixed(2)}
            description="Overall academic performance"
          />

          <SummaryCard
            icon={<BookOpen className="h-5 w-5" />}
            label="Total Credits"
            value={String(result.totalCredits)}
            description="Completed this semester"
          />

          <SummaryCard
            icon={<GraduationCap className="h-5 w-5" />}
            label="Average Marks"
            value={`${averageMarks}%`}
            description="Across all courses"
          />
        </section>

        {/* Semester Information */}
        <section className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-3 border-b border-slate-200 p-5 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">
                {result.name} Results
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {result.semester} · {result.records.length} courses ·{" "}
                {result.totalCredits} credits
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 dark:bg-blue-950/30 dark:text-blue-400">
              <Award className="h-4 w-4" />
              GPA {result.gpa.toFixed(2)}
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[800px] text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-400">
                  <th className="px-5 py-4 font-semibold">Course</th>
                  <th className="px-5 py-4 font-semibold">Course Name</th>
                  <th className="px-5 py-4 text-center font-semibold">
                    Credit
                  </th>
                  <th className="px-5 py-4 text-center font-semibold">
                    Marks
                  </th>
                  <th className="px-5 py-4 text-center font-semibold">
                    Grade
                  </th>
                  <th className="px-5 py-4 text-center font-semibold">
                    Grade Point
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {result.records.map((record) => (
                  <tr
                    key={record.code}
                    className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <td className="px-5 py-4">
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {record.code}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
                      {record.course}
                    </td>

                    <td className="px-5 py-4 text-center text-sm font-medium text-slate-700 dark:text-slate-300">
                      {record.credit}
                    </td>

                    <td className="px-5 py-4 text-center text-sm font-medium text-slate-700 dark:text-slate-300">
                      {record.marks}%
                    </td>

                    <td className="px-5 py-4 text-center">
                      <span
                        className={`inline-flex min-w-10 items-center justify-center rounded-full px-2.5 py-1 text-xs font-bold ${
                          gradeBadgeStyles[record.grade] ??
                          "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                        }`}
                      >
                        {record.grade}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-center text-sm font-semibold text-slate-900 dark:text-white">
                      {record.gradePoint.toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="divide-y divide-slate-200 md:hidden dark:divide-slate-800">
            {result.records.map((record) => (
              <div key={record.code} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                      {record.code}
                    </p>

                    <h3 className="mt-1 font-semibold text-slate-900 dark:text-white">
                      {record.course}
                    </h3>
                  </div>

                  <span
                    className={`inline-flex min-w-10 shrink-0 items-center justify-center rounded-full px-2.5 py-1 text-xs font-bold ${
                      gradeBadgeStyles[record.grade] ??
                      "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                  >
                    {record.grade}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <Metric label="Credit" value={record.credit.toString()} />
                  <Metric label="Marks" value={`${record.marks}%`} />
                  <Metric
                    label="Point"
                    value={record.gradePoint.toFixed(1)}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Table Footer */}
          <div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/40 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Grades are based on the university&apos;s approved grading
              policy.
            </p>

            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
              <span>Semester GPA:</span>
              <span className="text-blue-600 dark:text-blue-400">
                {result.gpa.toFixed(2)}
              </span>
            </div>
          </div>
        </section>

        {/* Grading Scale */}
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4">
            <h2 className="font-semibold text-slate-900 dark:text-white">
              Grading Scale
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              University grading and grade-point reference.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {[
              ["A+", "4.0", "80–100"],
              ["A", "4.0", "75–79"],
              ["A-", "3.7", "70–74"],
              ["B+", "3.3", "65–69"],
              ["B", "3.0", "60–64"],
              ["B-", "2.7", "55–59"],
              ["F", "0.0", "Below 50"],
            ].map(([grade, point, range]) => (
              <div
                key={grade}
                className="rounded-lg border border-slate-200 p-3 text-center dark:border-slate-800"
              >
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {grade}
                </p>

                <p className="mt-1 text-sm font-semibold text-blue-600 dark:text-blue-400">
                  {point}
                </p>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {range}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function SummaryCard({
  icon,
  label,
  value,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {label}
          </p>

          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {value}
          </p>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>

        <div className="rounded-lg bg-blue-50 p-2.5 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400">
          {icon}
        </div>
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg bg-slate-50 p-2.5 text-center dark:bg-slate-800/60">
      <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}

