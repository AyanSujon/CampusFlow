// import React from 'react'

// export default function Schedules() {
//   return (
//     <div>schedules</div>
//   )
// }











"use client";

import React, { useMemo, useState } from "react";
import {
  CalendarDays,
  Clock3,
  MapPin,
  BookOpen,
  UserRound,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type Day =
  | "Saturday"
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday";

type Schedule = {
  id: string;
  courseCode: string;
  courseName: string;
  instructor: string;
  room: string;
  day: Day;
  startTime: string;
  endTime: string;
  type: "Lecture" | "Lab" | "Tutorial";
};

const schedules: Schedule[] = [
  {
    id: "SCH-001",
    courseCode: "CSE-301",
    courseName: "Database Management Systems",
    instructor: "Dr. Rahman",
    room: "Room 301",
    day: "Saturday",
    startTime: "09:00 AM",
    endTime: "10:30 AM",
    type: "Lecture",
  },
  {
    id: "SCH-002",
    courseCode: "CSE-303",
    courseName: "Operating Systems",
    instructor: "Prof. Ahmed",
    room: "Room 305",
    day: "Saturday",
    startTime: "11:00 AM",
    endTime: "12:30 PM",
    type: "Lecture",
  },
  {
    id: "SCH-003",
    courseCode: "CSE-305",
    courseName: "Software Engineering",
    instructor: "Dr. Karim",
    room: "Room 302",
    day: "Sunday",
    startTime: "09:00 AM",
    endTime: "10:30 AM",
    type: "Lecture",
  },
  {
    id: "SCH-004",
    courseCode: "CSE-307",
    courseName: "Computer Networks",
    instructor: "Prof. Hasan",
    room: "Lab 02",
    day: "Sunday",
    startTime: "11:00 AM",
    endTime: "01:00 PM",
    type: "Lab",
  },
  {
    id: "SCH-005",
    courseCode: "CSE-301",
    courseName: "Database Management Systems",
    instructor: "Dr. Rahman",
    room: "Room 301",
    day: "Monday",
    startTime: "10:00 AM",
    endTime: "11:30 AM",
    type: "Lecture",
  },
  {
    id: "SCH-006",
    courseCode: "CSE-303",
    courseName: "Operating Systems",
    instructor: "Prof. Ahmed",
    room: "Lab 01",
    day: "Tuesday",
    startTime: "09:00 AM",
    endTime: "11:00 AM",
    type: "Lab",
  },
  {
    id: "SCH-007",
    courseCode: "CSE-305",
    courseName: "Software Engineering",
    instructor: "Dr. Karim",
    room: "Room 302",
    day: "Wednesday",
    startTime: "10:00 AM",
    endTime: "11:30 AM",
    type: "Lecture",
  },
  {
    id: "SCH-008",
    courseCode: "CSE-307",
    courseName: "Computer Networks",
    instructor: "Prof. Hasan",
    room: "Room 306",
    day: "Thursday",
    startTime: "11:00 AM",
    endTime: "12:30 PM",
    type: "Tutorial",
  },
];

const days: Day[] = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
];

const dayShort: Record<Day, string> = {
  Saturday: "Sat",
  Sunday: "Sun",
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
};

const typeConfig = {
  Lecture: {
    className:
      "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
  },
  Lab: {
    className:
      "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400",
  },
  Tutorial: {
    className:
      "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  },
};

export default function Schedules() {
  const [selectedDay, setSelectedDay] = useState<Day>("Saturday");
  const [weekOffset, setWeekOffset] = useState(0);

  const selectedSchedules = useMemo(
    () => schedules.filter((item) => item.day === selectedDay),
    [selectedDay]
  );

  const totalClasses = schedules.length;
  const totalLabs = schedules.filter((item) => item.type === "Lab").length;
  const totalLectures = schedules.filter(
    (item) => item.type === "Lecture"
  ).length;

  return (
    <div className="min-h-full bg-slate-50 p-4 dark:bg-slate-950 sm:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div>

          <div className="mt-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Class Schedule
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              View your weekly class routine, rooms, instructors and class
              timings.
            </p>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <SummaryCard
            icon={CalendarDays}
            label="Weekly Classes"
            value={totalClasses}
            description="Scheduled classes"
          />

          <SummaryCard
            icon={BookOpen}
            label="Lectures"
            value={totalLectures}
            description="Regular lectures"
          />

          <SummaryCard
            icon={Clock3}
            label="Labs"
            value={totalLabs}
            description="Practical sessions"
          />
        </div>

        {/* Week Selector */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Weekly Schedule
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                6th Semester • Fall 2026
              </p>
            </div>

            <div className="flex items-center justify-between gap-2 rounded-lg border border-slate-200 p-1 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setWeekOffset((value) => value - 1)}
                className="flex h-8 w-8 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
                aria-label="Previous week"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <span className="px-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                {weekOffset === 0
                  ? "This Week"
                  : weekOffset > 0
                    ? `Week +${weekOffset}`
                    : `Week ${weekOffset}`}
              </span>

              <button
                type="button"
                onClick={() => setWeekOffset((value) => value + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
                aria-label="Next week"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Day Selector */}
          <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-6">
            {days.map((day) => {
              const hasClasses = schedules.some(
                (schedule) => schedule.day === day
              );

              const isSelected = selectedDay === day;

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  className={`rounded-xl border p-3 text-center transition-all ${
                    isSelected
                      ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                      : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-800 dark:hover:bg-blue-950/30"
                  }`}
                >
                  <p className="text-xs font-medium opacity-80">
                    {dayShort[day]}
                  </p>

                  <p className="mt-1 text-sm font-bold">
                    {day}
                  </p>

                  <div
                    className={`mx-auto mt-2 h-1.5 w-1.5 rounded-full ${
                      hasClasses
                        ? isSelected
                          ? "bg-white"
                          : "bg-blue-600"
                        : "bg-slate-300 dark:bg-slate-700"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </section>

        {/* Selected Day Schedule */}
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="border-b border-slate-200 p-5 dark:border-slate-800 sm:p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  {selectedDay}
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {selectedSchedules.length} scheduled{" "}
                  {selectedSchedules.length === 1 ? "class" : "classes"}
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <CalendarDays className="h-4 w-4" />
                Fall 2026
              </div>
            </div>
          </div>

          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {selectedSchedules.length > 0 ? (
              selectedSchedules.map((schedule) => (
                <ScheduleCard
                  key={schedule.id}
                  schedule={schedule}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  <CalendarDays className="h-5 w-5" />
                </div>

                <h3 className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">
                  No classes scheduled
                </h3>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  There are no classes scheduled for {selectedDay}.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Full Week Desktop View */}
        <section className="hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:block">
          <div className="border-b border-slate-200 p-5 dark:border-slate-800">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Full Week Overview
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Complete weekly class routine at a glance.
            </p>
          </div>

          <div className="grid grid-cols-6 divide-x divide-slate-200 dark:divide-slate-800">
            {days.map((day) => {
              const daySchedules = schedules.filter(
                (schedule) => schedule.day === day
              );

              return (
                <div key={day} className="min-w-0">
                  <div className="border-b border-slate-200 bg-slate-50 p-3 text-center dark:border-slate-800 dark:bg-slate-800/50">
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      {dayShort[day]}
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
                      {day}
                    </p>
                  </div>

                  <div className="space-y-3 p-3">
                    {daySchedules.length > 0 ? (
                      daySchedules.map((schedule) => (
                        <MiniScheduleCard
                          key={schedule.id}
                          schedule={schedule}
                        />
                      ))
                    ) : (
                      <p className="py-6 text-center text-xs text-slate-400">
                        No class
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Legend */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
            Schedule Legend
          </h2>

          <div className="mt-3 flex flex-wrap gap-4">
            <Legend
              label="Lecture"
              className="bg-blue-100 dark:bg-blue-950"
            />

            <Legend
              label="Lab"
              className="bg-purple-100 dark:bg-purple-950"
            />

            <Legend
              label="Tutorial"
              className="bg-amber-100 dark:bg-amber-950"
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

function ScheduleCard({
  schedule,
}: {
  schedule: Schedule;
}) {
  const type = typeConfig[schedule.type];

  return (
    <div className="p-5 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40 sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
            <BookOpen className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                {schedule.courseCode}
              </span>

              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${type.className}`}
              >
                {schedule.type}
              </span>
            </div>

            <h3 className="mt-1 text-base font-bold text-slate-900 dark:text-white">
              {schedule.courseName}
            </h3>

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <UserRound className="h-3.5 w-3.5" />
                {schedule.instructor}
              </span>

              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                {schedule.room}
              </span>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800">
          <Clock3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />

          <div>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              {schedule.startTime}
            </p>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              to {schedule.endTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniScheduleCard({
  schedule,
}: {
  schedule: Schedule;
}) {
  const type = typeConfig[schedule.type];

  return (
    <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-700">
      <span
        className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${type.className}`}
      >
        {schedule.type}
      </span>

      <p className="mt-2 text-xs font-bold text-blue-600 dark:text-blue-400">
        {schedule.courseCode}
      </p>

      <p className="mt-1 line-clamp-2 text-xs font-semibold text-slate-900 dark:text-white">
        {schedule.courseName}
      </p>

      <div className="mt-3 space-y-1.5 text-[11px] text-slate-500 dark:text-slate-400">
        <p className="flex items-center gap-1.5">
          <Clock3 className="h-3 w-3 shrink-0" />
          {schedule.startTime}
        </p>

        <p className="flex items-center gap-1.5">
          <MapPin className="h-3 w-3 shrink-0" />
          {schedule.room}
        </p>
      </div>
    </div>
  );
}

function Legend({
  label,
  className,
}: {
  label: string;
  className: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-3 w-3 rounded-full ${className}`} />
      <span className="text-xs text-slate-600 dark:text-slate-400">
        {label}
      </span>
    </div>
  );
}