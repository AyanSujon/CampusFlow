// import React from 'react'

// export default function Program() {
//   return (
//     <div>program</div>
//   )
// }



"use client";

import React from "react";
import {
  Award,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Layers3,
  School,
} from "lucide-react";

export default function Program() {
  const program = {
    code: "CSE-BSC",
    name: "Bachelor of Science in Computer Science & Engineering",
    degreeType: "Bachelor",
    department: "Computer Science & Engineering",
    faculty: "Faculty of Science & Technology",
    duration: "4 Years",
    totalCredits: 160,
    completedCredits: 72,
    currentSemester: "6th Semester",
    academicStatus: "ACTIVE",
    admissionYear: "2023",
    expectedGraduation: "2027",
  };

  const progress = Math.round(
    (program.completedCredits / program.totalCredits) * 100
  );

  const currentCourses = [
    {
      code: "CSE-301",
      name: "Database Management Systems",
      credit: 3,
      status: "In Progress",
    },
    {
      code: "CSE-303",
      name: "Operating Systems",
      credit: 3,
      status: "In Progress",
    },
    {
      code: "CSE-305",
      name: "Software Engineering",
      credit: 3,
      status: "In Progress",
    },
    {
      code: "CSE-307",
      name: "Computer Networks",
      credit: 3,
      status: "In Progress",
    },
  ];

  return (
    <div className="min-h-full bg-slate-50 p-4 dark:bg-slate-950 sm:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div>

          <div className="mt-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              My Program
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              View your academic program, credits, progress and current
              semester courses.
            </p>
          </div>
        </div>

        {/* Program Hero */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="border-b border-slate-200 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
                  <GraduationCap className="h-7 w-7" />
                </div>

                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-400">
                      {program.code}
                    </span>

                    <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      {program.academicStatus}
                    </span>
                  </div>

                  <h2 className="max-w-3xl text-xl font-bold text-slate-900 dark:text-white">
                    {program.name}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {program.degreeType} Degree
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-950">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Current Semester
                </p>

                <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                  {program.currentSemester}
                </p>
              </div>
            </div>
          </div>

          {/* Program Details */}
          <div className="grid grid-cols-1 divide-y divide-slate-200 dark:divide-slate-800 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            <InfoItem
              icon={School}
              label="Faculty"
              value={program.faculty}
            />

            <InfoItem
              icon={Layers3}
              label="Department"
              value={program.department}
            />

            <InfoItem
              icon={Clock3}
              label="Program Duration"
              value={program.duration}
            />

            <InfoItem
              icon={CalendarDays}
              label="Expected Graduation"
              value={program.expectedGraduation}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={BookOpen}
            label="Total Credits"
            value={program.totalCredits}
            description="Required credits"
          />

          <StatCard
            icon={CheckCircle2}
            label="Completed Credits"
            value={program.completedCredits}
            description="Successfully completed"
          />

          <StatCard
            icon={Layers3}
            label="Remaining Credits"
            value={program.totalCredits - program.completedCredits}
            description="Credits remaining"
          />

          <StatCard
            icon={CalendarDays}
            label="Admission Year"
            value={program.admissionYear}
            description="Academic session"
          />
        </div>

        {/* Academic Progress */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Academic Progress
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Your completed credits toward the total program requirement.
              </p>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {progress}%
              </p>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Program completed
              </p>
            </div>
          </div>

          <div className="mt-5">
            <div className="h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>{program.completedCredits} credits completed</span>
              <span>{program.totalCredits} credits required</span>
            </div>
          </div>
        </section>

        {/* Current Semester Courses */}
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="border-b border-slate-200 p-5 dark:border-slate-800 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400">
                <BookOpen className="h-5 w-5" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Current Semester Courses
                </h2>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Courses you are currently enrolled in.
                </p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {currentCourses.map((course) => (
              <div
                key={course.code}
                className="flex flex-col gap-3 p-5 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40 sm:flex-row sm:items-center sm:justify-between sm:px-6"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    <BookOpen className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {course.name}
                    </p>

                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span>{course.code}</span>
                      <span>•</span>
                      <span>{course.credit} Credits</span>
                    </div>
                  </div>
                </div>

                <span className="w-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-400">
                  {course.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Academic Timeline */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Program Timeline
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Important milestones of your academic journey.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <TimelineCard
              title="Admission"
              value={program.admissionYear}
              description="Started your academic journey"
              completed
            />

            <TimelineCard
              title="Current Status"
              value={program.currentSemester}
              description="Currently studying"
              completed
            />

            <TimelineCard
              title="Expected Graduation"
              value={program.expectedGraduation}
              description="Expected program completion"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

type IconType = React.ComponentType<{
  className?: string;
}>;

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: IconType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3 p-5 sm:p-6">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
        <Icon className="h-5 w-5" />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {label}
        </p>

        <p className="mt-1 truncate text-sm font-semibold text-slate-900 dark:text-white">
          {value}
        </p>
      </div>
    </div>
  );
}

function StatCard({
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

function TimelineCard({
  title,
  value,
  description,
  completed = false,
}: {
  title: string;
  value: string;
  description: string;
  completed?: boolean;
}) {
  return (
    <div className="relative rounded-xl border border-slate-200 p-4 dark:border-slate-800">
      <div className="flex items-start gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
            completed
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
              : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
          }`}
        >
          {completed ? (
            <CheckCircle2 className="h-5 w-5" />
          ) : (
            <CalendarDays className="h-5 w-5" />
          )}
        </div>

        <div>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <p className="mt-1 font-bold text-slate-900 dark:text-white">
            {value}
          </p>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

