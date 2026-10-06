
"use client";

import React, { useMemo, useState } from "react";
import {
  BookOpen,
  GraduationCap,
  Users,
  CalendarCheck,
  TrendingUp,
  TrendingDown,
  Search,
  Download,
  Printer,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  Clock3,
  Award,
  BarChart3,
  ChevronDown,
} from "lucide-react";

type CoursePerformance = {
  id: string;
  code: string;
  course: string;
  department: string;
  enrolled: number;
  averageGpa: number;
  attendance: number;
  passRate: number;
  failRate: number;
  status: "Excellent" | "Good" | "Needs Attention";
};

const coursePerformance: CoursePerformance[] = [
  {
    id: "1",
    code: "CSE-101",
    course: "Introduction to Programming",
    department: "Computer Science",
    enrolled: 124,
    averageGpa: 3.62,
    attendance: 91,
    passRate: 94,
    failRate: 6,
    status: "Excellent",
  },
  {
    id: "2",
    code: "CSE-203",
    course: "Data Structures & Algorithms",
    department: "Computer Science",
    enrolled: 108,
    averageGpa: 3.41,
    attendance: 87,
    passRate: 89,
    failRate: 11,
    status: "Good",
  },
  {
    id: "3",
    code: "BBA-201",
    course: "Principles of Management",
    department: "Business Administration",
    enrolled: 146,
    averageGpa: 3.54,
    attendance: 93,
    passRate: 96,
    failRate: 4,
    status: "Excellent",
  },
  {
    id: "4",
    code: "EEE-205",
    course: "Digital Electronics",
    department: "Electrical Engineering",
    enrolled: 96,
    averageGpa: 3.12,
    attendance: 79,
    passRate: 78,
    failRate: 22,
    status: "Needs Attention",
  },
  {
    id: "5",
    code: "ENG-103",
    course: "Academic Writing",
    department: "English",
    enrolled: 132,
    averageGpa: 3.28,
    attendance: 84,
    passRate: 86,
    failRate: 14,
    status: "Good",
  },
  {
    id: "6",
    code: "MAT-101",
    course: "Calculus I",
    department: "Mathematics",
    enrolled: 118,
    averageGpa: 3.05,
    attendance: 81,
    passRate: 82,
    failRate: 18,
    status: "Needs Attention",
  },
];

const departments = [
  "All Departments",
  "Computer Science",
  "Business Administration",
  "Electrical Engineering",
  "English",
  "Mathematics",
];

export default function AcademicReports() {
  const [searchTerm, setSearchTerm] = useState("");
  const [department, setDepartment] = useState("All Departments");
  const [semester, setSemester] = useState("Fall 2026");

  const filteredCourses = useMemo(() => {
    return coursePerformance.filter((course) => {
      const matchesSearch =
        course.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.code.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDepartment =
        department === "All Departments" ||
        course.department === department;

      return matchesSearch && matchesDepartment;
    });
  }, [searchTerm, department]);

  const totalStudents = coursePerformance.reduce(
    (sum, course) => sum + course.enrolled,
    0
  );

  const averageGpa =
    coursePerformance.reduce((sum, course) => sum + course.averageGpa, 0) /
    coursePerformance.length;

  const averageAttendance =
    coursePerformance.reduce((sum, course) => sum + course.attendance, 0) /
    coursePerformance.length;

  const averagePassRate =
    coursePerformance.reduce((sum, course) => sum + course.passRate, 0) /
    coursePerformance.length;

  const excellentCourses = coursePerformance.filter(
    (course) => course.status === "Excellent"
  ).length;

  const attentionCourses = coursePerformance.filter(
    (course) => course.status === "Needs Attention"
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 p-4 dark:bg-slate-950 sm:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1E3A8A] text-white shadow-sm">
                <BarChart3 className="h-5 w-5" />
              </div>

              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
                  Academic Reports
                </h1>

                <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                  Monitor enrollment, GPA, attendance and academic performance.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <Printer className="h-4 w-4" />
              <span className="hidden sm:inline">Print</span>
            </button>

            <button
              type="button"
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#1E3A8A] px-3 text-sm font-medium text-white shadow-sm transition hover:bg-[#152A63]"
            >
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
            {/* Search */}
            <div className="relative min-w-0 flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search course or course code..."
                className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </div>

            {/* Department */}
            <div className="relative w-full xl:w-64">
              <select
                value={department}
                onChange={(event) => setDepartment(event.target.value)}
                className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-9 text-sm text-slate-700 outline-none transition focus:border-[#1E3A8A] dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
              >
                {departments.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>

            {/* Semester */}
            <div className="relative w-full xl:w-44">
              <select
                value={semester}
                onChange={(event) => setSemester(event.target.value)}
                className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-9 text-sm text-slate-700 outline-none transition focus:border-[#1E3A8A] dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
              >
                <option>Fall 2026</option>
                <option>Summer 2026</option>
                <option>Spring 2026</option>
                <option>Fall 2025</option>
              </select>

              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Enrollments"
            value={totalStudents.toLocaleString()}
            description="Across active courses"
            icon={Users}
            trend="+8.4%"
            trendUp
          />

          <StatCard
            title="Average GPA"
            value={averageGpa.toFixed(2)}
            description="Institution-wide average"
            icon={GraduationCap}
            trend="+0.18"
            trendUp
          />

          <StatCard
            title="Attendance Rate"
            value={`${averageAttendance.toFixed(1)}%`}
            description="Average course attendance"
            icon={CalendarCheck}
            trend="+2.6%"
            trendUp
          />

          <StatCard
            title="Pass Rate"
            value={`${averagePassRate.toFixed(1)}%`}
            description="Overall academic success"
            icon={Award}
            trend="+4.1%"
            trendUp
          />
        </div>

        {/* Academic Summary */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* GPA */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  GPA Performance
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                  {averageGpa.toFixed(2)}
                </h2>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-[#1E3A8A] dark:bg-blue-950/40 dark:text-blue-300">
                <GraduationCap className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <ProgressRow label="3.50 - 4.00" value={42} />
              <ProgressRow label="3.00 - 3.49" value={34} />
              <ProgressRow label="2.50 - 2.99" value={17} />
              <ProgressRow label="Below 2.50" value={7} />
            </div>
          </div>

          {/* Attendance */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Attendance
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                  {averageAttendance.toFixed(1)}%
                </h2>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                <CalendarCheck className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">
                  Target
                </span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  85%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: `${Math.min(averageAttendance, 100)}%` }}
                />
              </div>

              <div className="mt-3 flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="h-3.5 w-3.5" />
                Above institutional target
              </div>
            </div>
          </div>

          {/* Pass / Fail */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Pass / Fail
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                  {averagePassRate.toFixed(1)}%
                </h2>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
                <BookOpen className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-5 flex items-end gap-2">
              <div className="flex-1">
                <div className="h-24 rounded-lg bg-slate-100 p-2 dark:bg-slate-800">
                  <div
                    className="h-full rounded-md bg-emerald-500"
                    style={{ height: `${averagePassRate}%` }}
                  />
                </div>

                <div className="mt-2 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  Passed
                </div>
              </div>

              <div className="flex-1">
                <div className="h-24 rounded-lg bg-slate-100 p-2 dark:bg-slate-800">
                  <div
                    className="mt-auto h-full rounded-md bg-red-500"
                    style={{ height: `${100 - averagePassRate}%` }}
                  />
                </div>

                <div className="mt-2 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                  <XCircle className="h-3.5 w-3.5 text-red-500" />
                  Failed
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Indicators */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <IndicatorCard
            title="Excellent Courses"
            value={excellentCourses}
            icon={CheckCircle2}
            iconClass="text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400"
          />

          <IndicatorCard
            title="Needs Attention"
            value={attentionCourses}
            icon={Clock3}
            iconClass="text-amber-600 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400"
          />

          <IndicatorCard
            title="Avg. Course GPA"
            value={averageGpa.toFixed(2)}
            icon={TrendingUp}
            iconClass="text-blue-600 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-400"
          />

          <IndicatorCard
            title="At-Risk Rate"
            value="8.7%"
            icon={TrendingDown}
            iconClass="text-red-600 bg-red-50 dark:bg-red-950/40 dark:text-red-400"
          />
        </div>

        {/* Course Performance */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-3 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                Course Performance
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Academic performance by course for {semester}.
              </p>
            </div>

            <button
              type="button"
              className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              View Detailed Report
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px] text-left">
              <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
                <tr>
                  <TableHead>Course</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Enrolled</TableHead>
                  <TableHead>Avg. GPA</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead>Pass Rate</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => (
                    <tr
                      key={course.id}
                      className="transition hover:bg-slate-50/70 dark:hover:bg-slate-800/40"
                    >
                      <td className="px-5 py-4">
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">
                            {course.course}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                            {course.code}
                          </p>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
                        {course.department}
                      </td>

                      <td className="px-5 py-4 text-sm font-medium text-slate-700 dark:text-slate-200">
                        {course.enrolled}
                      </td>

                      <td className="px-5 py-4">
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {course.averageGpa.toFixed(2)}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                            <div
                              className={`h-full rounded-full ${
                                course.attendance >= 85
                                  ? "bg-emerald-500"
                                  : course.attendance >= 75
                                    ? "bg-amber-500"
                                    : "bg-red-500"
                              }`}
                              style={{
                                width: `${course.attendance}%`,
                              }}
                            />
                          </div>

                          <span className="text-sm text-slate-600 dark:text-slate-300">
                            {course.attendance}%
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                            {course.passRate}%
                          </span>

                          <span className="text-xs text-red-500">
                            {course.failRate}% fail
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge status={course.status} />
                      </td>

                      <td className="px-5 py-4">
                        <button
                          type="button"
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                          aria-label={`More actions for ${course.course}`}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-5 py-12 text-center text-sm text-slate-500 dark:text-slate-400"
                    >
                      No course performance data found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="flex flex-col gap-2 border-t border-slate-200 px-5 py-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:text-slate-400">
            <span>
              Showing {filteredCourses.length} of {coursePerformance.length}{" "}
              courses
            </span>

            <span>
              Report period:{" "}
              <span className="font-medium text-slate-700 dark:text-slate-200">
                {semester}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendUp,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ElementType;
  trend: string;
  trendUp: boolean;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {value}
          </h2>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#1E3A8A] dark:bg-blue-950/40 dark:text-blue-300">
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-1.5 text-xs">
        {trendUp ? (
          <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
        ) : (
          <TrendingDown className="h-3.5 w-3.5 text-red-500" />
        )}

        <span
          className={
            trendUp
              ? "font-semibold text-emerald-600 dark:text-emerald-400"
              : "font-semibold text-red-600 dark:text-red-400"
          }
        >
          {trend}
        </span>

        <span className="text-slate-400">vs previous semester</span>
      </div>
    </div>
  );
}

function ProgressRow({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="text-slate-600 dark:text-slate-300">{label}</span>
        <span className="font-medium text-slate-700 dark:text-slate-200">
          {value}%
        </span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div
          className="h-full rounded-full bg-[#1E3A8A]"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function IndicatorCard({
  title,
  value,
  icon: Icon,
  iconClass,
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  iconClass: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {title}
        </p>

        <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
          {value}
        </p>
      </div>

      <div
        className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconClass}`}
      >
        <Icon className="h-5 w-5" />
      </div>
    </div>
  );
}

function TableHead({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
      {children}
    </th>
  );
}

function StatusBadge({
  status,
}: {
  status: CoursePerformance["status"];
}) {
  if (status === "Excellent") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
        <CheckCircle2 className="h-3.5 w-3.5" />
        Excellent
      </span>
    );
  }

  if (status === "Needs Attention") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
        <Clock3 className="h-3.5 w-3.5" />
        Needs Attention
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
      <CheckCircle2 className="h-3.5 w-3.5" />
      Good
    </span>
  );
}

