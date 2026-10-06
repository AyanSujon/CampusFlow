// import React from 'react'

// export default function Enrollments() {
//   return (
//     <div>enrollments</div>
//   )
// }









"use client";

import React, { useMemo, useState } from "react";
import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Search,
  UserRound,
  XCircle,
} from "lucide-react";

type EnrollmentStatus =
  | "ENROLLED"
  | "COMPLETED"
  | "DROPPED"
  | "PENDING";

type Enrollment = {
  id: string;
  courseCode: string;
  courseName: string;
  credit: number;
  instructor: string;
  semester: string;
  academicYear: string;
  enrolledAt: string;
  status: EnrollmentStatus;
  grade?: string;
};

const enrollments: Enrollment[] = [
  {
    id: "ENR-1001",
    courseCode: "CSE-301",
    courseName: "Database Management Systems",
    credit: 3,
    instructor: "Dr. Rahman",
    semester: "6th Semester",
    academicYear: "2026",
    enrolledAt: "Sep 02, 2026",
    status: "ENROLLED",
  },
  {
    id: "ENR-1002",
    courseCode: "CSE-303",
    courseName: "Operating Systems",
    credit: 3,
    instructor: "Prof. Ahmed",
    semester: "6th Semester",
    academicYear: "2026",
    enrolledAt: "Sep 02, 2026",
    status: "ENROLLED",
  },
  {
    id: "ENR-1003",
    courseCode: "CSE-305",
    courseName: "Software Engineering",
    credit: 3,
    instructor: "Dr. Karim",
    semester: "6th Semester",
    academicYear: "2026",
    enrolledAt: "Sep 03, 2026",
    status: "ENROLLED",
  },
  {
    id: "ENR-1004",
    courseCode: "CSE-307",
    courseName: "Computer Networks",
    credit: 3,
    instructor: "Prof. Hasan",
    semester: "6th Semester",
    academicYear: "2026",
    enrolledAt: "Sep 03, 2026",
    status: "ENROLLED",
  },
  {
    id: "ENR-0901",
    courseCode: "CSE-201",
    courseName: "Object Oriented Programming",
    credit: 3,
    instructor: "Dr. Islam",
    semester: "4th Semester",
    academicYear: "2025",
    enrolledAt: "Jan 12, 2025",
    status: "COMPLETED",
    grade: "A",
  },
  {
    id: "ENR-0902",
    courseCode: "CSE-203",
    courseName: "Data Structures",
    credit: 3,
    instructor: "Prof. Hossain",
    semester: "4th Semester",
    academicYear: "2025",
    enrolledAt: "Jan 12, 2025",
    status: "COMPLETED",
    grade: "A-",
  },
  {
    id: "ENR-0801",
    courseCode: "CSE-205",
    courseName: "Digital Logic Design",
    credit: 3,
    instructor: "Dr. Mahmud",
    semester: "3rd Semester",
    academicYear: "2024",
    enrolledAt: "Sep 10, 2024",
    status: "DROPPED",
  },
  {
    id: "ENR-1101",
    courseCode: "CSE-401",
    courseName: "Artificial Intelligence",
    credit: 3,
    instructor: "Dr. Nayeem",
    semester: "7th Semester",
    academicYear: "2027",
    enrolledAt: "Not enrolled yet",
    status: "PENDING",
  },
];

const tabs: {
  label: string;
  value: "ALL" | EnrollmentStatus;
}[] = [
  { label: "All", value: "ALL" },
  { label: "Enrolled", value: "ENROLLED" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Pending", value: "PENDING" },
  { label: "Dropped", value: "DROPPED" },
];

export default function Enrollments() {
  const [activeTab, setActiveTab] = useState<"ALL" | EnrollmentStatus>("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("ALL");

  const filteredEnrollments = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return enrollments.filter((enrollment) => {
      const matchesStatus =
        activeTab === "ALL" || enrollment.status === activeTab;

      const matchesSemester =
        semesterFilter === "ALL" ||
        enrollment.semester === semesterFilter;

      const matchesSearch =
        !search ||
        enrollment.courseCode.toLowerCase().includes(search) ||
        enrollment.courseName.toLowerCase().includes(search) ||
        enrollment.instructor.toLowerCase().includes(search) ||
        enrollment.id.toLowerCase().includes(search);

      return matchesStatus && matchesSemester && matchesSearch;
    });
  }, [activeTab, searchTerm, semesterFilter]);

  const enrolledCount = enrollments.filter(
    (item) => item.status === "ENROLLED"
  ).length;

  const completedCount = enrollments.filter(
    (item) => item.status === "COMPLETED"
  ).length;

  const pendingCount = enrollments.filter(
    (item) => item.status === "PENDING"
  ).length;

  const currentCredits = enrollments
    .filter((item) => item.status === "ENROLLED")
    .reduce((total, item) => total + item.credit, 0);

  const semesters = Array.from(
    new Set(enrollments.map((item) => item.semester))
  );

  return (
    <div className="min-h-full bg-slate-50 p-4 dark:bg-slate-950 sm:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div>

          <div className="mt-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              My Enrollments
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Track your course registrations, academic status and enrollment
              history.
            </p>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            icon={BookOpen}
            label="Total Enrollments"
            value={enrollments.length}
            description="All enrollment records"
          />

          <SummaryCard
            icon={Clock3}
            label="Current Enrollments"
            value={enrolledCount}
            description="Currently enrolled"
          />

          <SummaryCard
            icon={CheckCircle2}
            label="Completed"
            value={completedCount}
            description="Completed courses"
          />

          <SummaryCard
            icon={GraduationCap}
            label="Current Credits"
            value={currentCredits}
            description="Credits this semester"
          />
        </div>

        {/* Current Enrollment Highlight */}
        <section className="overflow-hidden rounded-2xl border border-blue-200 bg-blue-50 shadow-sm dark:border-blue-900/60 dark:bg-blue-950/30">
          <div className="p-5 sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-400">
                  <GraduationCap className="h-6 w-6" />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                      Current Enrollment
                    </h2>

                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                      Active
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    6th Semester • Academic Year 2026
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:flex sm:items-center">
                <div className="rounded-xl bg-white px-4 py-3 shadow-sm dark:bg-slate-900">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Courses
                  </p>

                  <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                    {enrolledCount}
                  </p>
                </div>

                <div className="rounded-xl bg-white px-4 py-3 shadow-sm dark:bg-slate-900">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Credits
                  </p>

                  <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                    {currentCredits}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enrollment Table */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {/* Toolbar */}
          <div className="border-b border-slate-200 p-4 dark:border-slate-800 sm:p-5">
            <div className="flex flex-col gap-4">
              {/* Status Tabs */}
              <div className="flex w-full gap-1 overflow-x-auto rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
                {tabs.map((tab) => (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => setActiveTab(tab.value)}
                    className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      activeTab === tab.value
                        ? "bg-white text-blue-700 shadow-sm dark:bg-slate-700 dark:text-blue-400"
                        : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Search + Filter */}
              <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(event) =>
                      setSearchTerm(event.target.value)
                    }
                    placeholder="Search by course, code, instructor or enrollment ID..."
                    className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500"
                  />
                </div>

                <select
                  value={semesterFilter}
                  onChange={(event) =>
                    setSemesterFilter(event.target.value)
                  }
                  className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
                >
                  <option value="ALL">All Semesters</option>

                  {semesters.map((semester) => (
                    <option key={semester} value={semester}>
                      {semester}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/50">
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Course
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Instructor
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Semester
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Credits
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Enrolled At
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Status
                  </th>

                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Grade
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {filteredEnrollments.map((enrollment) => (
                  <EnrollmentTableRow
                    key={enrollment.id}
                    enrollment={enrollment}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile / Tablet Cards */}
          <div className="divide-y divide-slate-200 dark:divide-slate-800 lg:hidden">
            {filteredEnrollments.map((enrollment) => (
              <EnrollmentCard
                key={enrollment.id}
                enrollment={enrollment}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredEnrollments.length === 0 && (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                <BookOpen className="h-5 w-5" />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">
                No enrollments found
              </h3>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Try changing your search or enrollment filters.
              </p>
            </div>
          )}
        </section>

        {/* Enrollment Policy / Info */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400">
              <Clock3 className="h-5 w-5" />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">
                Enrollment Information
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Course enrollment status is updated by the academic
                administration. If you need to add, drop or change a course,
                please contact your department or academic advisor.
              </p>

              {pendingCount > 0 && (
                <p className="mt-2 text-sm font-medium text-amber-600 dark:text-amber-400">
                  You currently have {pendingCount} pending enrollment
                  {pendingCount > 1 ? "s" : ""}.
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

type IconType = React.ComponentType<{
  className?: string;
}>;

function SummaryCard({
  icon: Icon,
  label,
  value,
  description,
}: {
  icon: IconType;
  label: string;
  value: string | number;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
          <Icon className="h-5 w-5" />
        </div>

        <span className="text-2xl font-bold text-slate-900 dark:text-white">
          {value}
        </span>
      </div>

      <p className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">
        {label}
      </p>

      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        {description}
      </p>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: EnrollmentStatus;
}) {
  const config = {
    ENROLLED: {
      label: "Enrolled",
      icon: CheckCircle2,
      className:
        "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
    },
    COMPLETED: {
      label: "Completed",
      icon: CheckCircle2,
      className:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
    },
    DROPPED: {
      label: "Dropped",
      icon: XCircle,
      className:
        "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
    },
    PENDING: {
      label: "Pending",
      icon: Clock3,
      className:
        "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
    },
  };

  const item = config[status];
  const Icon = item.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${item.className}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {item.label}
    </span>
  );
}

function EnrollmentTableRow({
  enrollment,
}: {
  enrollment: Enrollment;
}) {
  return (
    <tr className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40">
      <td className="px-5 py-4">
        <div>
          <p className="text-xs font-bold text-blue-600 dark:text-blue-400">
            {enrollment.courseCode}
          </p>

          <p className="mt-1 max-w-64 font-semibold text-slate-900 dark:text-white">
            {enrollment.courseName}
          </p>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {enrollment.id}
          </p>
        </div>
      </td>

      <td className="px-5 py-4">
        <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
          <UserRound className="h-4 w-4 text-slate-400" />
          {enrollment.instructor}
        </div>
      </td>

      <td className="px-5 py-4">
        <div>
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {enrollment.semester}
          </p>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {enrollment.academicYear}
          </p>
        </div>
      </td>

      <td className="px-5 py-4">
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          {enrollment.credit}
        </span>
      </td>

      <td className="px-5 py-4">
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <CalendarDays className="h-4 w-4" />
          {enrollment.enrolledAt}
        </div>
      </td>

      <td className="px-5 py-4">
        <StatusBadge status={enrollment.status} />
      </td>

      <td className="px-5 py-4 text-right">
        {enrollment.grade ? (
          <span className="text-lg font-bold text-slate-900 dark:text-white">
            {enrollment.grade}
          </span>
        ) : (
          <span className="text-sm text-slate-400">—</span>
        )}
      </td>
    </tr>
  );
}

function EnrollmentCard({
  enrollment,
}: {
  enrollment: Enrollment;
}) {
  return (
    <div className="p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            <BookOpen className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-bold text-blue-600 dark:text-blue-400">
              {enrollment.courseCode}
            </p>

            <h3 className="mt-1 font-semibold text-slate-900 dark:text-white">
              {enrollment.courseName}
            </h3>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {enrollment.id}
            </p>
          </div>
        </div>

        <StatusBadge status={enrollment.status} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <DetailItem
          icon={UserRound}
          label="Instructor"
          value={enrollment.instructor}
        />

        <DetailItem
          icon={GraduationCap}
          label="Credits"
          value={`${enrollment.credit}`}
        />

        <DetailItem
          icon={CalendarDays}
          label="Semester"
          value={enrollment.semester}
        />

        <DetailItem
          icon={Clock3}
          label="Enrolled"
          value={enrollment.enrolledAt}
        />
      </div>

      {enrollment.grade && (
        <div className="mt-4 flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-2 dark:bg-emerald-950/30">
          <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
            Final Grade
          </span>

          <span className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
            {enrollment.grade}
          </span>
        </div>
      )}
    </div>
  );
}

function DetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: IconType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/60">
      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>

      <p className="mt-1 truncate text-sm font-semibold text-slate-700 dark:text-slate-300">
        {value}
      </p>
    </div>
  );
}