// import React from 'react'

// export default function Calendar() {
//   return (
//     <div>Calendar</div>
//   )
// }





"use client";

import React, { useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Clock3,
  GraduationCap,
  Plus,
  School,
} from "lucide-react";

type EventType =
  | "semester"
  | "registration"
  | "exam"
  | "holiday"
  | "event";

interface AcademicEvent {
  id: number;
  title: string;
  date: string;
  type: EventType;
  description: string;
  time?: string;
}

const academicEvents: AcademicEvent[] = [
  {
    id: 1,
    title: "Fall Semester Begins",
    date: "2026-10-05",
    type: "semester",
    description: "Fall 2026 semester officially begins.",
  },
  {
    id: 2,
    title: "Course Registration",
    date: "2026-10-07",
    type: "registration",
    description: "Last date for regular course registration.",
    time: "09:00 AM - 05:00 PM",
  },
  {
    id: 3,
    title: "Add / Drop Deadline",
    date: "2026-10-12",
    type: "registration",
    description: "Final date to add or drop registered courses.",
  },
  {
    id: 4,
    title: "Midterm Examination",
    date: "2026-11-10",
    type: "exam",
    description: "Fall semester midterm examination starts.",
    time: "10:00 AM",
  },
  {
    id: 5,
    title: "University Holiday",
    date: "2026-11-15",
    type: "holiday",
    description: "University remains closed.",
  },
  {
    id: 6,
    title: "Final Examination",
    date: "2026-12-20",
    type: "exam",
    description: "Fall semester final examination begins.",
  },
  {
    id: 7,
    title: "Fall Semester Ends",
    date: "2026-12-31",
    type: "semester",
    description: "Fall 2026 semester officially ends.",
  },
];

const eventStyles: Record<
  EventType,
  {
    label: string;
    className: string;
    dotClassName: string;
  }
> = {
  semester: {
    label: "Semester",
    className:
      "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
    dotClassName: "bg-blue-600",
  },
  registration: {
    label: "Registration",
    className:
      "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
    dotClassName: "bg-amber-500",
  },
  exam: {
    label: "Exam",
    className:
      "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300",
    dotClassName: "bg-red-500",
  },
  holiday: {
    label: "Holiday",
    className:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
    dotClassName: "bg-emerald-500",
  },
  event: {
    label: "Event",
    className:
      "bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300",
    dotClassName: "bg-purple-500",
  },
};

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 9, 7));
  const [selectedDate, setSelectedDate] = useState("2026-10-07");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const calendarDays = useMemo(() => {
    const days: Array<number | null> = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  }, [firstDay, daysInMonth]);

  const formatDate = (day: number) => {
    const monthNumber = String(month + 1).padStart(2, "0");
    const dayNumber = String(day).padStart(2, "0");

    return `${year}-${monthNumber}-${dayNumber}`;
  };

  const getEventsForDate = (date: string) => {
    return academicEvents.filter((event) => event.date === date);
  };

  const selectedEvents = academicEvents.filter(
    (event) => event.date === selectedDate
  );

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    const today = new Date();

    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));

    setSelectedDate(
      `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(today.getDate()).padStart(2, "0")}`
    );
  };

  const upcomingEvents = [...academicEvents]
    .filter((event) => event.date >= selectedDate)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-slate-50 p-4 dark:bg-slate-950 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Academic Calendar
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Keep track of registration, examinations, semester dates and
              important academic events.
            </p>
          </div>

          <button
            type="button"
            onClick={goToToday}
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <CalendarDays className="h-4 w-4" />
            Today
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            icon={<CalendarDays className="h-5 w-5" />}
            title="Current Semester"
            value="Fall 2026"
            description="October - December"
          />

          <SummaryCard
            icon={<GraduationCap className="h-5 w-5" />}
            title="Upcoming Exams"
            value="2"
            description="Midterm & Final"
          />

          <SummaryCard
            icon={<Clock3 className="h-5 w-5" />}
            title="Next Deadline"
            value="Oct 12"
            description="Add / Drop Deadline"
          />

          <SummaryCard
            icon={<CircleAlert className="h-5 w-5" />}
            title="Academic Events"
            value={academicEvents.length.toString()}
            description="Important dates"
          />
        </div>

        {/* Main Calendar */}
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            {/* Calendar Header */}
            <div className="flex flex-col gap-4 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {monthName}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Academic events and important dates
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goToPreviousMonth}
                  aria-label="Previous month"
                  className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  onClick={goToToday}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Today
                </button>

                <button
                  type="button"
                  onClick={goToNextMonth}
                  aria-label="Next month"
                  className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Calendar */}
            <div className="p-3 sm:p-5">
              <div className="grid grid-cols-7 border-b border-slate-200 dark:border-slate-800">
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 sm:text-sm"
                  >
                    <span className="hidden sm:inline">{day}</span>
                    <span className="sm:hidden">{day.charAt(0)}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7">
                {calendarDays.map((day, index) => {
                  if (day === null) {
                    return (
                      <div
                        key={`empty-${index}`}
                        className="min-h-20 border-b border-r border-slate-100 bg-slate-50/40 dark:border-slate-800 dark:bg-slate-950/30 sm:min-h-28"
                      />
                    );
                  }

                  const date = formatDate(day);
                  const events = getEventsForDate(date);
                  const isSelected = selectedDate === date;

                  return (
                    <button
                      key={date}
                      type="button"
                      onClick={() => setSelectedDate(date)}
                      className={`relative min-h-20 border-b border-r border-slate-100 p-2 text-left transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/70 sm:min-h-28 sm:p-3 ${
                        isSelected
                          ? "bg-blue-50/70 dark:bg-blue-950/20"
                          : "bg-white dark:bg-slate-900"
                      }`}
                    >
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium ${
                          isSelected
                            ? "bg-blue-600 text-white"
                            : "text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        {day}
                      </span>

                      <div className="mt-2 space-y-1">
                        {events.map((event) => (
                          <div
                            key={event.id}
                            className={`hidden items-center gap-1.5 rounded px-1.5 py-1 text-[10px] font-medium sm:flex ${eventStyles[event.type].className}`}
                          >
                            <span
                              className={`h-1.5 w-1.5 shrink-0 rounded-full ${eventStyles[event.type].dotClassName}`}
                            />
                            <span className="truncate">{event.title}</span>
                          </div>
                        ))}

                        {events.length > 0 && (
                          <div className="flex gap-1 sm:hidden">
                            {events.map((event) => (
                              <span
                                key={event.id}
                                className={`h-1.5 w-1.5 rounded-full ${eventStyles[event.type].dotClassName}`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-x-5 gap-y-3 border-t border-slate-200 px-4 py-4 dark:border-slate-800 sm:px-5">
              {Object.entries(eventStyles).map(([type, style]) => (
                <div
                  key={type}
                  className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400"
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${style.dotClassName}`}
                  />
                  {style.label}
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Selected Date */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Selected Date
                </p>

                <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
                  {new Date(`${selectedDate}T00:00:00`).toLocaleDateString(
                    "en-US",
                    {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    }
                  )}
                </h3>
              </div>

              {selectedEvents.length > 0 ? (
                <div className="space-y-3">
                  {selectedEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-slate-200 p-5 text-center dark:border-slate-700">
                  <CalendarDays className="mx-auto h-8 w-8 text-slate-400" />
                  <p className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-300">
                    No academic events
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Nothing is scheduled for this date.
                  </p>
                </div>
              )}
            </div>

            {/* Upcoming Events */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Upcoming Events
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Important academic dates
                  </p>
                </div>

                <CalendarDays className="h-5 w-5 text-slate-400" />
              </div>

              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <button
                    key={event.id}
                    type="button"
                    onClick={() => {
                      const eventDate = new Date(`${event.date}T00:00:00`);

                      setCurrentDate(
                        new Date(
                          eventDate.getFullYear(),
                          eventDate.getMonth(),
                          1
                        )
                      );

                      setSelectedDate(event.date);
                    }}
                    className="flex w-full gap-3 text-left"
                  >
                    <div
                      className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${eventStyles[event.type].dotClassName}`}
                    />

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-200">
                        {event.title}
                      </p>

                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        {new Date(`${event.date}T00:00:00`).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Academic Note */}
            <div className="rounded-xl border border-blue-100 bg-blue-50 p-5 dark:border-blue-900/50 dark:bg-blue-950/30">
              <div className="flex gap-3">
                <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />

                <div>
                  <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-200">
                    Academic Reminder
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-blue-700 dark:text-blue-300">
                    Keep an eye on registration deadlines and examination dates
                    to avoid missing important academic activities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  icon,
  title,
  value,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between">
        <div className="rounded-lg bg-blue-50 p-2.5 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
          {icon}
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
        {title}
      </p>

      <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-400">{description}</p>
    </div>
  );
}

function EventCard({ event }: { event: AcademicEvent }) {
  const style = eventStyles[event.type];

  return (
    <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-700">
      <div className="flex items-start gap-3">
        <span
          className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${style.dotClassName}`}
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              {event.title}
            </h4>

            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${style.className}`}
            >
              {style.label}
            </span>
          </div>

          <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
            {event.description}
          </p>

          {event.time && (
            <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <Clock3 className="h-3.5 w-3.5" />
              {event.time}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

