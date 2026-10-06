// import React from 'react'

// export default function Attendance() {
//   return (
//     <div>attendance</div>
//   )
// }











"use client";

import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Search,
  TrendingUp,
  UserRound,
  XCircle,
} from "lucide-react";

type AttendanceStatus = "GOOD" | "WARNING" | "CRITICAL";

type AttendanceRecord = {
  id: string;
  courseCode: string;
  courseName: string;
  instructor: string;
  totalClasses: number;
  attended: number;
  absent: number;
  late: number;
};

const attendanceData: AttendanceRecord[] = [
  {
    id: "ATT-001",
    courseCode: "CSE-301",
    courseName: "Database Management Systems",
    instructor: "Dr. Rahman",
    totalClasses: 24,
    attended: 22,
    absent: 2,
    late: 1,
  },
  {
    id: "ATT-002",
    courseCode: "CSE-303",
    courseName: "Operating Systems",
    instructor: "Prof. Ahmed",
    totalClasses: 24,
    attended: 19,
    absent: 5,
    late: 2,
  },
  {
    id: "ATT-003",
    courseCode: "CSE-305",
    courseName: "Software Engineering",
    instructor: "Dr. Karim",
    totalClasses: 22,
    attended: 21,
    absent: 1,
    late: 0,
  },
  {
    id: "ATT-004",
    courseCode: "CSE-307",
    courseName: "Computer Networks",
    instructor: "Prof. Hasan",
    totalClasses: 20,
    attended: 16,
    absent: 4,
    late: 1,
  },
];

const MINIMUM_ATTENDANCE = 75;

export default function Attendance() {
  const [searchTerm, setSearchTerm] = useState("");

  const totalClasses = attendanceData.reduce(
    (total, course) => total + course.totalClasses,
    0
  );

  const totalAttended = attendanceData.reduce(
    (total, course) => total + course.attended,
    0
  );

  const totalAbsent = attendanceData.reduce(
    (total, course) => total + course.absent,
    0
  );

  const totalLate = attendanceData.reduce(
    (total, course) => total + course.late,
    0
  );

  const overallPercentage = Math.round(
    (totalAttended / totalClasses) * 100
  );

  const filteredCourses = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    if (!search) {
      return attendanceData;
    }

    return attendanceData.filter(
      (course) =>
        course.courseCode.toLowerCase().includes(search) ||
        course.courseName.toLowerCase().includes(search) ||
        course.instructor.toLowerCase().includes(search)
    );
  }, [searchTerm]);

  const warningCourses = attendanceData.filter(
    (course) => getAttendancePercentage(course) < MINIMUM_ATTENDANCE
  );

  return (
    <div className="min-h-full bg-slate-50 p-4 dark:bg-slate-950 sm:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div>

          <div className="mt-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Attendance
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Monitor your attendance across all current semester courses.
            </p>
          </div>
        </div>

        {/* Overall Attendance */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="p-5 sm:p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-4">
                <AttendanceCircle percentage={overallPercentage} />

                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Overall Attendance
                  </p>

                  <h2 className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
                    {overallPercentage}%
                  </h2>

                  <div className="mt-2 flex items-center gap-2">
                    {overallPercentage >= MINIMUM_ATTENDANCE ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                          Attendance requirement met
                        </span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <span className="text-sm font-medium text-red-600 dark:text-red-400">
                          Attendance requirement not met
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <MiniStat
                  label="Total Classes"
                  value={totalClasses}
                />

                <MiniStat
                  label="Attended"
                  value={totalAttended}
                  valueClass="text-emerald-600 dark:text-emerald-400"
                />

                <MiniStat
                  label="Absent"
                  value={totalAbsent}
                  valueClass="text-red-600 dark:text-red-400"
                />

                <MiniStat
                  label="Late"
                  value={totalLate}
                  valueClass="text-amber-600 dark:text-amber-400"
                />
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="border-t border-slate-200 bg-slate-50/70 px-5 py-4 dark:border-slate-800 dark:bg-slate-800/30 sm:px-6">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-500 dark:text-slate-400">
                Attendance Progress
              </span>

              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Minimum required: {MINIMUM_ATTENDANCE}%
              </span>
            </div>

            <div className="relative mt-3 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  overallPercentage >= MINIMUM_ATTENDANCE
                    ? "bg-emerald-500"
                    : "bg-red-500"
                }`}
                style={{
                  width: `${Math.min(overallPercentage, 100)}%`,
                }}
              />

              <div
                className="absolute top-[-3px] h-4 w-0.5 bg-slate-700 dark:bg-slate-300"
                style={{
                  left: `${MINIMUM_ATTENDANCE}%`,
                }}
              />
            </div>
          </div>
        </section>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            icon={TrendingUp}
            label="Attendance Rate"
            value={`${overallPercentage}%`}
            description="Overall attendance"
          />

          <SummaryCard
            icon={CheckCircle2}
            label="Classes Attended"
            value={totalAttended}
            description="Successfully attended"
          />

          <SummaryCard
            icon={XCircle}
            label="Classes Missed"
            value={totalAbsent}
            description="Absent classes"
          />

          <SummaryCard
            icon={AlertTriangle}
            label="Warning Courses"
            value={warningCourses.length}
            description={`Below ${MINIMUM_ATTENDANCE}%`}
          />
        </div>

        {/* Warning */}
        {warningCourses.length > 0 && (
          <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-900/60 dark:bg-amber-950/30 sm:p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-400">
                <AlertTriangle className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-semibold text-amber-900 dark:text-amber-300">
                  Attendance Warning
                </h2>

                <p className="mt-1 text-sm leading-6 text-amber-800 dark:text-amber-400">
                  {warningCourses.length}{" "}
                  {warningCourses.length === 1 ? "course is" : "courses are"}{" "}
                  currently below the minimum attendance requirement of{" "}
                  {MINIMUM_ATTENDANCE}%. Make sure to attend upcoming classes
                  regularly.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Course Attendance */}
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="border-b border-slate-200 p-5 dark:border-slate-800 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Course-wise Attendance
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Detailed attendance for your current courses.
                </p>
              </div>

              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(event.target.value)
                  }
                  placeholder="Search course..."
                  className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500"
                />
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

                  <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Total
                  </th>

                  <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Attended
                  </th>

                  <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Absent
                  </th>

                  <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Late
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Attendance
                  </th>

                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {filteredCourses.map((course) => (
                  <AttendanceTableRow
                    key={course.id}
                    course={course}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile / Tablet */}
          <div className="divide-y divide-slate-200 dark:divide-slate-800 lg:hidden">
            {filteredCourses.map((course) => (
              <AttendanceCard
                key={course.id}
                course={course}
              />
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <EmptyState />
          )}
        </section>

        {/* Attendance Information */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
              <CalendarDays className="h-5 w-5" />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">
                Attendance Information
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Attendance is calculated based on the number of classes you
                attended compared with the total classes conducted. Late
                attendance may be recorded separately according to university
                policy.
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <StatusLegend
                  label="Good"
                  description={`≥ ${MINIMUM_ATTENDANCE}%`}
                  className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                />

                <StatusLegend
                  label="Warning"
                  description="75–79%"
                  className="bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
                />

                <StatusLegend
                  label="Critical"
                  description="< 75%"
                  className="bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function getAttendancePercentage(
  course: AttendanceRecord
): number {
  if (course.totalClasses === 0) {
    return 0;
  }

  return Math.round(
    (course.attended / course.totalClasses) * 100
  );
}

function getAttendanceStatus(
  percentage: number
): AttendanceStatus {
  if (percentage >= 80) {
    return "GOOD";
  }

  if (percentage >= MINIMUM_ATTENDANCE) {
    return "WARNING";
  }

  return "CRITICAL";
}

function AttendanceCircle({
  percentage,
}: {
  percentage: number;
}) {
  const status = getAttendanceStatus(percentage);

  const statusClass = {
    GOOD: "border-emerald-500 text-emerald-600 dark:text-emerald-400",
    WARNING: "border-amber-500 text-amber-600 dark:text-amber-400",
    CRITICAL: "border-red-500 text-red-600 dark:text-red-400",
  };

  return (
    <div
      className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 ${statusClass[status]}`}
    >
      <span className="text-lg font-bold">
        {percentage}%
      </span>
    </div>
  );
}

function MiniStat({
  label,
  value,
  valueClass = "text-slate-900 dark:text-white",
}: {
  label: string;
  value: string | number;
  valueClass?: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-950">
      <p className="text-xs text-slate-500 dark:text-slate-400">
        {label}
      </p>

      <p className={`mt-1 text-lg font-bold ${valueClass}`}>
        {value}
      </p>
    </div>
  );
}

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

function AttendanceTableRow({
  course,
}: {
  course: AttendanceRecord;
}) {
  const percentage = getAttendancePercentage(course);
  const status = getAttendanceStatus(percentage);

  return (
    <tr className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40">
      <td className="px-5 py-4">
        <div>
          <p className="text-xs font-bold text-blue-600 dark:text-blue-400">
            {course.courseCode}
          </p>

          <p className="mt-1 font-semibold text-slate-900 dark:text-white">
            {course.courseName}
          </p>
        </div>
      </td>

      <td className="px-5 py-4">
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <UserRound className="h-4 w-4 text-slate-400" />
          {course.instructor}
        </div>
      </td>

      <td className="px-5 py-4 text-center text-sm font-semibold text-slate-700 dark:text-slate-300">
        {course.totalClasses}
      </td>

      <td className="px-5 py-4 text-center text-sm font-semibold text-emerald-600 dark:text-emerald-400">
        {course.attended}
      </td>

      <td className="px-5 py-4 text-center text-sm font-semibold text-red-600 dark:text-red-400">
        {course.absent}
      </td>

      <td className="px-5 py-4 text-center text-sm font-semibold text-amber-600 dark:text-amber-400">
        {course.late}
      </td>

      <td className="px-5 py-4">
        <div className="w-32">
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {percentage}%
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className={`h-full rounded-full ${
                status === "GOOD"
                  ? "bg-emerald-500"
                  : status === "WARNING"
                    ? "bg-amber-500"
                    : "bg-red-500"
              }`}
              style={{
                width: `${Math.min(percentage, 100)}%`,
              }}
            />
          </div>
        </div>
      </td>

      <td className="px-5 py-4 text-right">
        <AttendanceStatusBadge status={status} />
      </td>
    </tr>
  );
}

function AttendanceCard({
  course,
}: {
  course: AttendanceRecord;
}) {
  const percentage = getAttendancePercentage(course);
  const status = getAttendanceStatus(percentage);

  return (
    <div className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-bold text-blue-600 dark:text-blue-400">
            {course.courseCode}
          </p>

          <h3 className="mt-1 font-semibold text-slate-900 dark:text-white">
            {course.courseName}
          </h3>

          <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <UserRound className="h-3.5 w-3.5" />
            {course.instructor}
          </p>
        </div>

        <AttendanceStatusBadge status={status} />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <AttendanceDetail
          label="Total"
          value={course.totalClasses}
        />

        <AttendanceDetail
          label="Attended"
          value={course.attended}
          className="text-emerald-600 dark:text-emerald-400"
        />

        <AttendanceDetail
          label="Absent"
          value={course.absent}
          className="text-red-600 dark:text-red-400"
        />

        <AttendanceDetail
          label="Late"
          value={course.late}
          className="text-amber-600 dark:text-amber-400"
        />
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Attendance
          </span>

          <span className="text-sm font-bold text-slate-900 dark:text-white">
            {percentage}%
          </span>
        </div>

        <div className="h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <div
            className={`h-full rounded-full ${
              status === "GOOD"
                ? "bg-emerald-500"
                : status === "WARNING"
                  ? "bg-amber-500"
                  : "bg-red-500"
            }`}
            style={{
              width: `${Math.min(percentage, 100)}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

function AttendanceDetail({
  label,
  value,
  className = "text-slate-900 dark:text-white",
}: {
  label: string;
  value: string | number;
  className?: string;
}) {
  return (
    <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/60">
      <p className="text-xs text-slate-500 dark:text-slate-400">
        {label}
      </p>

      <p className={`mt-1 text-lg font-bold ${className}`}>
        {value}
      </p>
    </div>
  );
}

function AttendanceStatusBadge({
  status,
}: {
  status: AttendanceStatus;
}) {
  const config = {
    GOOD: {
      label: "Good",
      className:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
      icon: CheckCircle2,
    },
    WARNING: {
      label: "Warning",
      className:
        "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
      icon: AlertTriangle,
    },
    CRITICAL: {
      label: "Critical",
      className:
        "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
      icon: AlertTriangle,
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

function StatusLegend({
  label,
  description,
  className,
}: {
  label: string;
  description: string;
  className: string;
}) {
  return (
    <div
      className={`rounded-lg px-3 py-2 text-xs font-semibold ${className}`}
    >
      {label}: {description}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
        <BookOpen className="h-5 w-5" />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">
        No attendance records found
      </h3>

      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Try changing your search term.
      </p>
    </div>
  );
}

type IconType = React.ComponentType<{
  className?: string;
}>;