// import React from 'react'

// export default function StudentDeshboard() {
//   return (
//     <div>StudentDeshboard</div>
//   )
// }



















"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bell,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  CreditCard,
  FileText,
  GraduationCap,
  MapPin,
  Receipt,
  ShieldAlert,
  TrendingUp,
  WalletCards,
} from "lucide-react";

const stats = [
  {
    label: "Current Semester",
    value: "Semester 5",
    description: "Spring 2026",
    icon: GraduationCap,
  },
  {
    label: "Enrolled Credits",
    value: "18",
    description: "This semester",
    icon: BookOpen,
  },
  {
    label: "Attendance",
    value: "87%",
    description: "Good standing",
    icon: CheckCircle2,
  },
  {
    label: "Current GPA",
    value: "3.62",
    description: "Out of 4.00",
    icon: TrendingUp,
  },
  {
    label: "Outstanding Fees",
    value: "৳12,500",
    description: "Due Oct 15",
    icon: WalletCards,
  },
];

const classes = [
  {
    time: "09:00 AM",
    course: "Database Management Systems",
    code: "CSE 305",
    instructor: "Dr. Rahman",
    room: "Room 402",
    status: "Upcoming",
  },
  {
    time: "11:30 AM",
    course: "Software Engineering",
    code: "CSE 307",
    instructor: "Prof. Ahmed",
    room: "Room 305",
    status: "Upcoming",
  },
  {
    time: "02:00 PM",
    course: "Web Engineering",
    code: "CSE 309",
    instructor: "Mr. Hasan",
    room: "Lab 02",
    status: "Upcoming",
  },
];

const exams = [
  {
    course: "Database Management Systems",
    code: "CSE 305",
    date: "Oct 12, 2026",
    time: "10:00 AM",
    room: "Exam Hall 01",
  },
  {
    course: "Software Engineering",
    code: "CSE 307",
    date: "Oct 15, 2026",
    time: "02:00 PM",
    room: "Exam Hall 02",
  },
  {
    course: "Web Engineering",
    code: "CSE 309",
    date: "Oct 18, 2026",
    time: "10:00 AM",
    room: "Exam Hall 01",
  },
];

const attendance = [
  {
    course: "Database Management Systems",
    percentage: 92,
  },
  {
    course: "Software Engineering",
    percentage: 88,
  },
  {
    course: "Web Engineering",
    percentage: 81,
  },
  {
    course: "Computer Networks",
    percentage: 78,
  },
];

const results = [
  {
    course: "Database Management Systems",
    code: "CSE 305",
    grade: "A",
    point: "4.00",
  },
  {
    course: "Software Engineering",
    code: "CSE 307",
    grade: "A-",
    point: "3.70",
  },
  {
    course: "Computer Networks",
    code: "CSE 303",
    grade: "B+",
    point: "3.30",
  },
];

const notifications = [
  {
    title: "Course registration deadline",
    description: "Course registration closes on October 10, 2026.",
    type: "Academic",
    time: "2 hours ago",
  },
  {
    title: "Midterm examination schedule published",
    description: "Your examination schedule is now available.",
    type: "Exam",
    time: "5 hours ago",
  },
  {
    title: "Tuition payment reminder",
    description: "Your outstanding tuition fee is due on October 15.",
    type: "Finance",
    time: "Yesterday",
  },
];

const quickActions = [
  {
    title: "Register Courses",
    description: "Manage your course registration",
    href: "/student/enrollments",
    icon: BookOpen,
  },
  {
    title: "View Schedule",
    description: "Check your class schedule",
    href: "/student/schedules",
    icon: CalendarDays,
  },
  {
    title: "View Results",
    description: "Check your grades and GPA",
    href: "/student/grades",
    icon: GraduationCap,
  },
  {
    title: "Pay Fees",
    description: "Pay your outstanding invoice",
    href: "/student/payments/new",
    icon: CreditCard,
  },
  {
    title: "Transcript",
    description: "View academic transcript",
    href: "/student/transcript",
    icon: FileText,
  },
  {
    title: "Academic Calendar",
    description: "View important academic dates",
    href: "/student/calendar",
    icon: CalendarDays,
  },
];

function SectionHeader({
  title,
  description,
  href,
  action = "View All",
}: {
  title: string;
  description?: string;
  href?: string;
  action?: string;
}) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            {description}
          </p>
        )}
      </div>

      {href && (
        <Link
          href={href}
          className="inline-flex w-fit items-center gap-1 text-xs font-medium text-primary transition-colors hover:underline sm:text-sm"
        >
          {action}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}

export default function StudentDeshboard() {
  return (
    <main className="min-h-screen bg-muted/30">
      <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <section className="rounded-2xl border bg-background p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="mb-1 text-sm font-medium text-primary">
                Student Dashboard
              </p>

              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Good evening, Ayan 👋
              </h1>

              <p className="mt-2 text-sm text-muted-foreground">
                STU-2026-CSE-0012 • B.Sc. in Computer Science • Semester 5
              </p>
            </div>

            <Link
              href="/student/notifications"
              className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />

              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive ring-2 ring-background" />
            </Link>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-2xl border bg-background p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      {stat.label}
                    </p>

                    <p className="mt-2 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                      {stat.value}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {stat.description}
                    </p>
                  </div>

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* Today's Classes + Upcoming Exams */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* Classes */}
          <div className="rounded-2xl border bg-background p-5 shadow-sm xl:col-span-2">
            <SectionHeader
              title="Today's Classes"
              description="Your scheduled classes for today"
              href="/student/schedules"
            />

            <div className="space-y-3">
              {classes.map((item) => (
                <div
                  key={`${item.code}-${item.time}`}
                  className="flex flex-col gap-4 rounded-xl border p-4 transition-colors hover:bg-muted/40 sm:flex-row sm:items-center"
                >
                  <div className="flex shrink-0 items-center gap-3 sm:w-28">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Clock3 className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {item.time}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.status}
                      </p>
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {item.course}
                    </p>

                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <span>{item.code}</span>
                      <span>•</span>
                      <span>{item.instructor}</span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {item.room}
                      </span>
                    </div>
                  </div>

                  <ChevronRight className="hidden h-4 w-4 shrink-0 text-muted-foreground sm:block" />
                </div>
              ))}
            </div>
          </div>

          {/* Exams */}
          <div className="rounded-2xl border bg-background p-5 shadow-sm">
            <SectionHeader
              title="Upcoming Exams"
              description="Your next examinations"
              href="/student/exams"
            />

            <div className="space-y-3">
              {exams.map((exam) => (
                <div
                  key={exam.code}
                  className="rounded-xl border p-4 transition-colors hover:bg-muted/40"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600">
                      <CalendarDays className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <p className="line-clamp-1 text-sm font-semibold text-foreground">
                        {exam.course}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {exam.code}
                      </p>

                      <p className="mt-2 text-xs font-medium text-foreground">
                        {exam.date} • {exam.time}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {exam.room}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Attendance + Academic Progress */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Attendance */}
          <div className="rounded-2xl border bg-background p-5 shadow-sm">
            <SectionHeader
              title="Attendance Overview"
              description="Monitor your attendance by course"
              href="/student/attendance"
            />

            <div className="mb-5 rounded-xl bg-muted/50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">
                    Overall Attendance
                  </p>
                  <p className="mt-1 text-2xl font-bold text-foreground">
                    87%
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-primary/20">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full w-[87%] rounded-full bg-primary" />
              </div>
            </div>

            <div className="space-y-4">
              {attendance.map((item) => (
                <div key={item.course}>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <p className="truncate text-sm font-medium text-foreground">
                      {item.course}
                    </p>

                    <span
                      className={`shrink-0 text-sm font-semibold ${
                        item.percentage < 80
                          ? "text-destructive"
                          : "text-foreground"
                      }`}
                    >
                      {item.percentage}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full ${
                        item.percentage < 80
                          ? "bg-destructive"
                          : "bg-primary"
                      }`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>

                  {item.percentage < 80 && (
                    <div className="mt-1.5 flex items-center gap-1 text-xs text-destructive">
                      <ShieldAlert className="h-3 w-3" />
                      Attendance is below recommended level
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Academic Progress */}
          <div className="rounded-2xl border bg-background p-5 shadow-sm">
            <SectionHeader
              title="Academic Progress"
              description="Your progress toward graduation"
              href="/student/program"
            />

            <div className="rounded-xl border p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Completed Credits
                  </p>

                  <p className="mt-1 text-3xl font-bold tracking-tight text-foreground">
                    86
                    <span className="ml-1 text-base font-medium text-muted-foreground">
                      / 120
                    </span>
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <p className="text-sm font-semibold text-primary">72%</p>
                  <p className="text-xs text-muted-foreground">
                    Program completed
                  </p>
                </div>
              </div>

              <div className="mt-5 h-3 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: "72%" }}
                />
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="text-xs text-muted-foreground">Completed</p>
                  <p className="mt-1 text-sm font-bold">86 Credits</p>
                </div>

                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="text-xs text-muted-foreground">Remaining</p>
                  <p className="mt-1 text-sm font-bold">34 Credits</p>
                </div>

                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="text-xs text-muted-foreground">Current GPA</p>
                  <p className="mt-1 text-sm font-bold">3.62 / 4.00</p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
              <TrendingUp className="h-5 w-5 shrink-0 text-primary" />

              <div>
                <p className="text-sm font-medium text-foreground">
                  Good academic progress
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Keep your GPA and attendance above the required level.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Results + Finance */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* Results */}
          <div className="rounded-2xl border bg-background p-5 shadow-sm xl:col-span-2">
            <SectionHeader
              title="Recent Results"
              description="Your latest published grades"
              href="/student/grades"
            />

            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-left">
                <thead>
                  <tr className="border-b text-xs text-muted-foreground">
                    <th className="pb-3 font-medium">Course</th>
                    <th className="pb-3 font-medium">Code</th>
                    <th className="pb-3 font-medium">Grade</th>
                    <th className="pb-3 text-right font-medium">Point</th>
                  </tr>
                </thead>

                <tbody>
                  {results.map((result) => (
                    <tr
                      key={result.code}
                      className="border-b last:border-0"
                    >
                      <td className="py-4 text-sm font-medium text-foreground">
                        {result.course}
                      </td>

                      <td className="py-4 text-sm text-muted-foreground">
                        {result.code}
                      </td>

                      <td className="py-4">
                        <span className="inline-flex rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                          {result.grade}
                        </span>
                      </td>

                      <td className="py-4 text-right text-sm font-semibold text-foreground">
                        {result.point}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Finance */}
          <div className="rounded-2xl border bg-background p-5 shadow-sm">
            <SectionHeader
              title="Finance"
              description="Your current financial status"
              href="/student/invoices"
              action="View Invoices"
            />

            <div className="rounded-xl border bg-muted/30 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                  <Receipt className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Outstanding Balance
                  </p>

                  <p className="mt-1 text-2xl font-bold text-foreground">
                    ৳12,500
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Tuition Fee</span>
                  <span className="font-medium">৳10,000</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Semester Fee
                  </span>
                  <span className="font-medium">৳2,500</span>
                </div>

                <div className="border-t pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Due Date</span>
                    <span className="text-sm font-semibold text-destructive">
                      Oct 15, 2026
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href="/student/payments/new"
                className="mt-5 flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <CreditCard className="h-4 w-4" />
                Make Payment
              </Link>
            </div>
          </div>
        </section>

        {/* Notifications + Quick Actions */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* Notifications */}
          <div className="rounded-2xl border bg-background p-5 shadow-sm xl:col-span-2">
            <SectionHeader
              title="Important Notifications"
              description="Recent updates from your university"
              href="/student/notifications"
            />

            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.title}
                  className="flex gap-4 rounded-xl border p-4 transition-colors hover:bg-muted/40"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Bell className="h-5 w-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm font-semibold text-foreground">
                        {notification.title}
                      </p>

                      <span className="text-xs text-muted-foreground">
                        {notification.time}
                      </span>
                    </div>

                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      {notification.description}
                    </p>

                    <span className="mt-2 inline-flex rounded-md bg-muted px-2 py-1 text-[11px] font-medium text-muted-foreground">
                      {notification.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl border bg-background p-5 shadow-sm">
            <SectionHeader
              title="Quick Actions"
              description="Frequently used student services"
            />

            <div className="grid grid-cols-1 gap-2">
              {quickActions.map((action) => {
                const Icon = action.icon;

                return (
                  <Link
                    key={action.title}
                    href={action.href}
                    className="group flex items-center gap-3 rounded-xl border p-3 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {action.title}
                      </p>

                      <p className="truncate text-xs text-muted-foreground">
                        {action.description}
                      </p>
                    </div>

                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}