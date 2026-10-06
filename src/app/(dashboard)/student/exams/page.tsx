

"use client";

import React, { useMemo, useState } from "react";
import {
  AlertCircle,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Download,
  FileText,
  GraduationCap,
  MapPin,
  Search,
  Timer,
  UserRound,
} from "lucide-react";

type ExamStatus = "UPCOMING" | "ONGOING" | "COMPLETED";

type Exam = {
  id: string;
  courseCode: string;
  courseName: string;
  examType: "Midterm" | "Final" | "Quiz" | "Practical";
  date: string;
  startTime: string;
  endTime: string;
  room: string;
  building: string;
  instructor: string;
  status: ExamStatus;
  marks: number;
  duration: string;
  instructions?: string;
};

const exams: Exam[] = [
  {
    id: "EXM-001",
    courseCode: "CSE-301",
    courseName: "Database Management Systems",
    examType: "Midterm",
    date: "2026-10-12",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
    room: "Room 401",
    building: "Academic Building A",
    instructor: "Dr. Rahman",
    status: "UPCOMING",
    marks: 50,
    duration: "2 Hours",
    instructions:
      "Bring your student ID card and necessary stationery. Mobile phones are not allowed.",
  },
  {
    id: "EXM-002",
    courseCode: "CSE-303",
    courseName: "Operating Systems",
    examType: "Midterm",
    date: "2026-10-15",
    startTime: "02:00 PM",
    endTime: "04:00 PM",
    room: "Room 305",
    building: "Academic Building B",
    instructor: "Prof. Karim",
    status: "UPCOMING",
    marks: 50,
    duration: "2 Hours",
    instructions:
      "Students must arrive at least 15 minutes before the examination starts.",
  },
  {
    id: "EXM-003",
    courseCode: "CSE-305",
    courseName: "Software Engineering",
    examType: "Practical",
    date: "2026-10-18",
    startTime: "11:00 AM",
    endTime: "01:00 PM",
    room: "Lab 203",
    building: "Computer Science Building",
    instructor: "Ms. Sultana",
    status: "UPCOMING",
    marks: 50,
    duration: "2 Hours",
    instructions:
      "Bring your own student credentials for accessing the laboratory systems.",
  },
  {
    id: "EXM-004",
    courseCode: "CSE-307",
    courseName: "Computer Networks",
    examType: "Final",
    date: "2026-09-20",
    startTime: "10:00 AM",
    endTime: "01:00 PM",
    room: "Room 202",
    building: "Academic Building A",
    instructor: "Dr. Hasan",
    status: "COMPLETED",
    marks: 100,
    duration: "3 Hours",
  },
  {
    id: "EXM-005",
    courseCode: "CSE-309",
    courseName: "Web Engineering",
    examType: "Quiz",
    date: "2026-09-12",
    startTime: "09:00 AM",
    endTime: "10:00 AM",
    room: "Room 104",
    building: "Academic Building C",
    instructor: "Mr. Ahmed",
    status: "COMPLETED",
    marks: 20,
    duration: "1 Hour",
  },
];

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
};

const getDaysUntil = (date: string) => {
  const today = new Date();
  const examDate = new Date(`${date}T00:00:00`);

  today.setHours(0, 0, 0, 0);
  examDate.setHours(0, 0, 0, 0);

  return Math.ceil(
    (examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );
};

function StatusBadge({ status }: { status: ExamStatus }) {
  const config = {
    UPCOMING: {
      label: "Upcoming",
      icon: Clock3,
      className:
        "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
    },
    ONGOING: {
      label: "Ongoing",
      icon: Timer,
      className:
        "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
    },
    COMPLETED: {
      label: "Completed",
      icon: CheckCircle2,
      className:
        "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
    },
  };

  const item = config[status];
  const Icon = item.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${item.className}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {item.label}
    </span>
  );
}

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  iconClassName,
}: {
  title: string;
  value: string | number;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  iconClassName: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
            {value}
          </h3>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconClassName}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

function ExamCard({ exam }: { exam: Exam }) {
  const daysUntil = getDaysUntil(exam.date);

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex min-w-0 gap-4">
          <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
            <span className="text-xs font-semibold uppercase">
              {new Date(`${exam.date}T00:00:00`).toLocaleDateString("en-US", {
                month: "short",
              })}
            </span>

            <span className="text-lg font-bold">
              {new Date(`${exam.date}T00:00:00`).getDate()}
            </span>
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {exam.courseCode}
              </span>

              <StatusBadge status={exam.status} />
            </div>

            <h3 className="mt-2 truncate text-base font-semibold text-slate-900 dark:text-white">
              {exam.courseName}
            </h3>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {exam.examType} Examination
            </p>
          </div>
        </div>

        {exam.status === "UPCOMING" && (
          <div className="shrink-0 rounded-xl bg-blue-50 px-4 py-2 text-center dark:bg-blue-500/10">
            <p className="text-[11px] font-medium uppercase tracking-wide text-blue-600 dark:text-blue-400">
              Starts In
            </p>

            <p className="mt-0.5 text-sm font-bold text-blue-700 dark:text-blue-300">
              {daysUntil > 0
                ? `${daysUntil} ${daysUntil === 1 ? "Day" : "Days"}`
                : daysUntil === 0
                  ? "Today"
                  : "Started"}
            </p>
          </div>
        )}
      </div>

      <div className="my-5 h-px bg-slate-100 dark:bg-slate-800" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-start gap-3">
          <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Date</p>
            <p className="mt-0.5 text-sm font-medium text-slate-800 dark:text-slate-200">
              {formatDate(exam.date)}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Time</p>
            <p className="mt-0.5 text-sm font-medium text-slate-800 dark:text-slate-200">
              {exam.startTime} - {exam.endTime}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Venue</p>
            <p className="mt-0.5 text-sm font-medium text-slate-800 dark:text-slate-200">
              {exam.room}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {exam.building}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <UserRound className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Instructor
            </p>
            <p className="mt-0.5 text-sm font-medium text-slate-800 dark:text-slate-200">
              {exam.instructor}
            </p>
          </div>
        </div>
      </div>

      {exam.instructions && exam.status === "UPCOMING" && (
        <div className="mt-5 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3 dark:border-amber-500/20 dark:bg-amber-500/5">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />

          <div>
            <p className="text-xs font-semibold text-amber-800 dark:text-amber-300">
              Examination Instructions
            </p>

            <p className="mt-1 text-xs leading-5 text-amber-700 dark:text-amber-400">
              {exam.instructions}
            </p>
          </div>
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
          <span>
            Duration:{" "}
            <strong className="font-semibold text-slate-700 dark:text-slate-300">
              {exam.duration}
            </strong>
          </span>

          <span>
            Marks:{" "}
            <strong className="font-semibold text-slate-700 dark:text-slate-300">
              {exam.marks}
            </strong>
          </span>
        </div>

        {exam.status === "COMPLETED" && (
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <FileText className="h-4 w-4" />
            View Result
          </button>
        )}
      </div>
    </div>
  );
}

export default function Exams() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | ExamStatus>("all");

  const upcomingCount = exams.filter(
    (exam) => exam.status === "UPCOMING",
  ).length;

  const completedCount = exams.filter(
    (exam) => exam.status === "COMPLETED",
  ).length;

  const filteredExams = useMemo(() => {
    return exams.filter((exam) => {
      const matchesSearch =
        exam.courseCode.toLowerCase().includes(search.toLowerCase()) ||
        exam.courseName.toLowerCase().includes(search.toLowerCase()) ||
        exam.instructor.toLowerCase().includes(search.toLowerCase());

      const matchesTab =
        activeTab === "all" ? true : exam.status === activeTab;

      return matchesSearch && matchesTab;
    });
  }, [search, activeTab]);

  const nextExam = exams
    .filter((exam) => exam.status === "UPCOMING")
    .sort((a, b) => a.date.localeCompare(b.date))[0];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Examinations
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              View your upcoming and completed examinations.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <Download className="h-4 w-4" />
            Download Schedule
          </button>
        </div>

        {/* Next Exam Alert */}
        {nextExam && (
          <div className="overflow-hidden rounded-2xl border border-blue-200 bg-blue-50 dark:border-blue-500/20 dark:bg-blue-500/5">
            <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                  <Timer className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                    Next Examination
                  </p>

                  <h2 className="mt-1 text-base font-bold text-blue-950 dark:text-blue-100">
                    {nextExam.courseCode} — {nextExam.courseName}
                  </h2>

                  <p className="mt-1 text-sm text-blue-800/70 dark:text-blue-300/80">
                    {formatDate(nextExam.date)} · {nextExam.startTime} ·{" "}
                    {nextExam.room}
                  </p>
                </div>
              </div>

              <div className="shrink-0 rounded-xl bg-white/70 px-4 py-3 text-center dark:bg-slate-900/50">
                <p className="text-xs text-blue-600 dark:text-blue-400">
                  Remaining
                </p>

                <p className="text-lg font-bold text-blue-900 dark:text-blue-100">
                  {getDaysUntil(nextExam.date) > 0
                    ? `${getDaysUntil(nextExam.date)} Days`
                    : "Today"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Exams"
            value={exams.length}
            description="All scheduled examinations"
            icon={BookOpen}
            iconClassName="bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
          />

          <StatCard
            title="Upcoming"
            value={upcomingCount}
            description="Examinations remaining"
            icon={CalendarDays}
            iconClassName="bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
          />

          <StatCard
            title="Completed"
            value={completedCount}
            description="Examinations completed"
            icon={CheckCircle2}
            iconClassName="bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
          />

          <StatCard
            title="Next Exam"
            value={nextExam ? getDaysUntil(nextExam.date) : "-"}
            description={nextExam ? "Days remaining" : "No upcoming exam"}
            icon={Timer}
            iconClassName="bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400"
          />
        </div>

        {/* Filters */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {[
                { value: "all", label: "All Exams" },
                { value: "UPCOMING", label: "Upcoming" },
                { value: "COMPLETED", label: "Completed" },
              ].map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() =>
                    setActiveTab(tab.value as "all" | ExamStatus)
                  }
                  className={`rounded-lg px-3.5 py-2 text-sm font-medium transition ${
                    activeTab === tab.value
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search exams..."
                className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </div>
          </div>
        </section>

        {/* Exam List */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Examination Schedule
              </h2>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {filteredExams.length} examination
                {filteredExams.length !== 1 ? "s" : ""} found
              </p>
            </div>
          </div>

          {filteredExams.length > 0 ? (
            <div className="space-y-4">
              {filteredExams.map((exam) => (
                <ExamCard key={exam.id} exam={exam} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center dark:border-slate-700 dark:bg-slate-900">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                <Search className="h-5 w-5 text-slate-400" />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">
                No examinations found
              </h3>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Try changing your search or examination filter.
              </p>
            </div>
          )}
        </section>

        {/* Exam Preparation */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
              <AlertCircle className="h-5 w-5" />
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Examination Preparation
              </h3>

              <ul className="mt-2 space-y-1.5 text-sm text-slate-500 dark:text-slate-400">
                <li>• Carry your valid student ID card to every examination.</li>
                <li>• Arrive at the examination venue at least 15 minutes early.</li>
                <li>• Check the room and examination schedule before the exam day.</li>
                <li>• Follow all university examination rules and instructions.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}