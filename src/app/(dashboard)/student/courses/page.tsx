// import React from 'react'

// export default function Courses() {
//   return (
//     <div>courses</div>
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
} from "lucide-react";

type CourseStatus = "IN_PROGRESS" | "COMPLETED" | "UPCOMING";

type Course = {
  id: string;
  code: string;
  name: string;
  credit: number;
  instructor: string;
  semester: string;
  status: CourseStatus;
  progress: number;
  grade?: string;
};

const courses: Course[] = [
  {
    id: "1",
    code: "CSE-301",
    name: "Database Management Systems",
    credit: 3,
    instructor: "Dr. Rahman",
    semester: "6th Semester",
    status: "IN_PROGRESS",
    progress: 68,
  },
  {
    id: "2",
    code: "CSE-303",
    name: "Operating Systems",
    credit: 3,
    instructor: "Prof. Ahmed",
    semester: "6th Semester",
    status: "IN_PROGRESS",
    progress: 54,
  },
  {
    id: "3",
    code: "CSE-305",
    name: "Software Engineering",
    credit: 3,
    instructor: "Dr. Karim",
    semester: "6th Semester",
    status: "IN_PROGRESS",
    progress: 72,
  },
  {
    id: "4",
    code: "CSE-307",
    name: "Computer Networks",
    credit: 3,
    instructor: "Prof. Hasan",
    semester: "6th Semester",
    status: "IN_PROGRESS",
    progress: 61,
  },
  {
    id: "5",
    code: "CSE-201",
    name: "Object Oriented Programming",
    credit: 3,
    instructor: "Dr. Islam",
    semester: "4th Semester",
    status: "COMPLETED",
    progress: 100,
    grade: "A",
  },
  {
    id: "6",
    code: "CSE-203",
    name: "Data Structures",
    credit: 3,
    instructor: "Prof. Hossain",
    semester: "4th Semester",
    status: "COMPLETED",
    progress: 100,
    grade: "A-",
  },
  {
    id: "7",
    code: "CSE-401",
    name: "Artificial Intelligence",
    credit: 3,
    instructor: "Dr. Mahmud",
    semester: "7th Semester",
    status: "UPCOMING",
    progress: 0,
  },
  {
    id: "8",
    code: "CSE-403",
    name: "Machine Learning",
    credit: 3,
    instructor: "Dr. Nayeem",
    semester: "7th Semester",
    status: "UPCOMING",
    progress: 0,
  },
];

const tabs: { label: string; value: "ALL" | CourseStatus }[] = [
  { label: "All Courses", value: "ALL" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Upcoming", value: "UPCOMING" },
];

export default function Courses() {
  const [activeTab, setActiveTab] = useState<"ALL" | CourseStatus>("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesTab =
        activeTab === "ALL" || course.status === activeTab;

      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        !search ||
        course.name.toLowerCase().includes(search) ||
        course.code.toLowerCase().includes(search) ||
        course.instructor.toLowerCase().includes(search);

      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchTerm]);

  const inProgressCount = courses.filter(
    (course) => course.status === "IN_PROGRESS"
  ).length;

  const completedCount = courses.filter(
    (course) => course.status === "COMPLETED"
  ).length;

  const upcomingCount = courses.filter(
    (course) => course.status === "UPCOMING"
  ).length;

  const totalCredits = courses
    .filter((course) => course.status !== "UPCOMING")
    .reduce((total, course) => total + course.credit, 0);

  return (
    <div className="min-h-full bg-slate-50 p-4 dark:bg-slate-950 sm:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div>
          <div className="mt-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              My Courses
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              View your current, completed and upcoming courses.
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            icon={BookOpen}
            label="Total Courses"
            value={courses.length}
            description="All enrolled courses"
          />

          <SummaryCard
            icon={Clock3}
            label="In Progress"
            value={inProgressCount}
            description="Current semester"
          />

          <SummaryCard
            icon={CheckCircle2}
            label="Completed"
            value={completedCount}
            description="Successfully completed"
          />

          <SummaryCard
            icon={GraduationCap}
            label="Earned Credits"
            value={totalCredits}
            description="From completed/current courses"
          />
        </div>

        {/* Search & Tabs */}
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-4 border-b border-slate-200 p-4 dark:border-slate-800 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
            {/* Tabs */}
            <div className="flex w-full gap-1 overflow-x-auto rounded-xl bg-slate-100 p-1 dark:bg-slate-800 lg:w-auto">
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

            {/* Search */}
            <div className="relative w-full lg:max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search courses..."
                className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Course List */}
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <CourseRow key={course.id} course={course} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  <BookOpen className="h-5 w-5" />
                </div>

                <h3 className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">
                  No courses found
                </h3>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Try changing your search or course filter.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Current Semester */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Current Semester
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                6th Semester • 12 Credits
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm font-medium text-blue-700 dark:text-blue-400">
              <CalendarDays className="h-4 w-4" />
              Fall 2026
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {courses
              .filter((course) => course.status === "IN_PROGRESS")
              .map((course) => (
                <div
                  key={course.id}
                  className="rounded-xl border border-slate-200 p-4 dark:border-slate-800"
                >
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                    {course.code}
                  </p>

                  <h3 className="mt-2 line-clamp-2 text-sm font-semibold text-slate-900 dark:text-white">
                    {course.name}
                  </h3>

                  <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <UserRound className="h-3.5 w-3.5" />
                    <span className="truncate">{course.instructor}</span>
                  </div>

                  <div className="mt-4">
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">
                        Progress
                      </span>

                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {course.progress}%
                      </span>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                      <div
                        className="h-full rounded-full bg-blue-600 transition-all"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
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

function CourseRow({ course }: { course: Course }) {
  const statusConfig = {
    IN_PROGRESS: {
      label: "In Progress",
      className:
        "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
    },
    COMPLETED: {
      label: "Completed",
      className:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
    },
    UPCOMING: {
      label: "Upcoming",
      className:
        "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
    },
  };

  const status = statusConfig[course.status];

  return (
    <div className="p-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40 sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            <BookOpen className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                {course.code}
              </span>

              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${status.className}`}
              >
                {status.label}
              </span>
            </div>

            <h3 className="mt-1 text-sm font-semibold text-slate-900 dark:text-white sm:text-base">
              {course.name}
            </h3>

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
              <span>{course.credit} Credits</span>

              <span className="flex items-center gap-1">
                <UserRound className="h-3.5 w-3.5" />
                {course.instructor}
              </span>

              <span className="flex items-center gap-1">
                <CalendarDays className="h-3.5 w-3.5" />
                {course.semester}
              </span>
            </div>
          </div>
        </div>

        <div className="w-full lg:max-w-52">
          {course.status === "COMPLETED" ? (
            <div className="flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-2 dark:bg-emerald-950/40">
              <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                Final Grade
              </span>

              <span className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
                {course.grade}
              </span>
            </div>
          ) : course.status === "UPCOMING" ? (
            <div className="rounded-lg bg-slate-50 px-3 py-2 text-center text-xs font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              Not started yet
            </div>
          ) : (
            <div>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">
                  Progress
                </span>

                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {course.progress}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all duration-500"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}