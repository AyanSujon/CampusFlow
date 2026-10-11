// import React from 'react'

// export default function AdminDashboard() {
//   return (
//     <div>AdminDashboard</div>
//   )
// }












"use client";

import Link from "next/link";
import {
  Users,
  GraduationCap,
  Building2,
  ShieldCheck,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Plus,
  CalendarDays,
  BookOpen,
  Wallet,
  Clock3,
  CheckCircle2,
  CircleAlert,
  ArrowRight,
  Bell,
  FileText,
  UserPlus,
  Megaphone,
  Activity,
} from "lucide-react";

const stats = [
  {
    title: "Total Students",
    value: "2,450",
    change: "+12.5%",
    positive: true,
    description: "vs. previous month",
    icon: GraduationCap,
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    href: "/admin/students",
  },
  {
    title: "Total Instructors",
    value: "148",
    change: "+8.2%",
    positive: true,
    description: "vs. previous month",
    icon: Users,
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    href: "/admin/instructors",
  },
  {
    title: "Departments",
    value: "18",
    change: "+2",
    positive: true,
    description: "in the university",
    icon: Building2,
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    href: "/admin/departments",
  },
  {
    title: "Pending Verifications",
    value: "12",
    change: "Needs attention",
    positive: false,
    description: "instructor applications",
    icon: ShieldCheck,
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    href: "/admin/instructor-verification",
  },
];

const enrollmentData = [
  { month: "May", students: 32, instructors: 12 },
  { month: "Jun", students: 48, instructors: 20 },
  { month: "Jul", students: 39, instructors: 15 },
  { month: "Aug", students: 65, instructors: 26 },
  { month: "Sep", students: 53, instructors: 22 },
  { month: "Oct", students: 78, instructors: 32 },
  { month: "Nov", students: 62, instructors: 27 },
  { month: "Dec", students: 88, instructors: 35 },
];

const activities = [
  {
    title: "New student registered",
    description: "A new student account was created.",
    time: "10 minutes ago",
    icon: UserPlus,
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    title: "Instructor verification pending",
    description: "An instructor application needs review.",
    time: "35 minutes ago",
    icon: ShieldCheck,
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    title: "Academic course updated",
    description: "A course record was updated.",
    time: "1 hour ago",
    icon: BookOpen,
    color: "bg-violet-500/10 text-violet-600",
  },
  {
    title: "Payment recorded",
    description: "A payment-related record was updated.",
    time: "2 hours ago",
    icon: Wallet,
    color: "bg-emerald-500/10 text-emerald-600",
  },
];

const pendingTasks = [
  {
    title: "Instructor verifications",
    description: "Review pending instructor applications",
    count: 12,
    href: "/admin/instructor-verification",
    icon: ShieldCheck,
  },
  {
    title: "Academic term setup",
    description: "Review academic term configuration",
    count: 3,
    href: "/admin/academic-terms",
    icon: CalendarDays,
  },
  {
    title: "Outstanding invoices",
    description: "Review unpaid student invoices",
    count: 24,
    href: "/admin/outstanding-fees",
    icon: FileText,
  },
];

const quickActions = [
  {
    title: "Add Student",
    description: "Register a new student",
    href: "/admin/students",
    icon: GraduationCap,
  },
  {
    title: "Add Instructor",
    description: "Manage instructor records",
    href: "/admin/instructors",
    icon: UserPlus,
  },
  {
    title: "Announcements",
    description: "Manage university notices",
    href: "/admin/announcements",
    icon: Megaphone,
  },
  {
    title: "View Reports",
    description: "Review university insights",
    href: "/admin/reports",
    icon: FileText,
  },
];

const financeData = [
  { label: "Collected", amount: 720000, color: "bg-blue-600" },
  { label: "Pending", amount: 210000, color: "bg-amber-500" },
  { label: "Overdue", amount: 90000, color: "bg-rose-500" },
];

const currency = (amount: number) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(amount);

export default function AdminDashboard() {
  const maxStudents = Math.max(
    ...enrollmentData.map((item) => item.students),
  );

  const maxInstructors = Math.max(
    ...enrollmentData.map((item) => item.instructors),
  );

  return (
    <main className="min-h-screen bg-slate-50/70 p-4 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px] space-y-7">
        {/* Page heading */}
        <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Monitor university operations and manage daily activities.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl border bg-background px-3 py-2.5 text-sm shadow-sm">
              <CalendarDays className="size-4 text-muted-foreground" />
              <span>
                {new Date().toLocaleDateString("en-BD", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>

            <Link
              href="/admin/announcements"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-800"
            >
              <Plus className="size-4" />
              <span>New Announcement</span>
            </Link>
          </div>
        </section>

        {/* Overview cards */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <Link
                key={stat.title}
                href={stat.href}
                className="group rounded-2xl border border-slate-200/80 bg-background p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="mt-3 text-3xl font-bold tracking-tight">
                      {stat.value}
                    </p>
                  </div>

                  <div className={`rounded-xl p-3 ${stat.color}`}>
                    <Icon className="size-5" />
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
                  {stat.positive ? (
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-600">
                      <ArrowUpRight className="size-3.5" />
                      {stat.change}
                    </span>
                  ) : (
                    <span className="font-semibold text-amber-600">
                      {stat.change}
                    </span>
                  )}

                  <span className="text-muted-foreground">
                    {stat.description}
                  </span>
                </div>
              </Link>
            );
          })}
        </section>

        {/* Charts */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="rounded-2xl border bg-background p-5 shadow-sm sm:p-6 xl:col-span-2">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold">
                  Enrollment Overview
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Monthly student and instructor activity
                </p>
              </div>

              <button
                type="button"
                aria-label="Enrollment chart options"
                className="rounded-lg p-2 text-muted-foreground hover:bg-muted"
              >
                <MoreHorizontal className="size-5" />
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-5 text-xs">
              <span className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-blue-600" />
                Students
              </span>
              <span className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-violet-500" />
                Instructors
              </span>
            </div>

            <div className="mt-6 flex h-64 gap-3">
              <div className="flex flex-col justify-between pb-7 text-right text-xs text-muted-foreground">
                <span>100</span>
                <span>75</span>
                <span>50</span>
                <span>25</span>
                <span>0</span>
              </div>

              <div className="relative min-w-0 flex-1">
                <div className="absolute inset-0 flex flex-col justify-between pb-7">
                  {[0, 1, 2, 3, 4].map((line) => (
                    <div
                      key={line}
                      className="border-t border-dashed border-slate-200 dark:border-slate-800"
                    />
                  ))}
                </div>

                <div className="relative grid h-full grid-cols-8 gap-2 sm:gap-4">
                  {enrollmentData.map((item) => (
                    <div
                      key={item.month}
                      className="flex h-full min-w-0 flex-col items-center justify-end"
                    >
                      <div className="flex h-[calc(100%-28px)] w-full items-end justify-center gap-1 sm:gap-2">
                        <div
                          title={`${item.students} student enrollments`}
                          className="w-2.5 rounded-t-md bg-blue-600 transition-opacity hover:opacity-75 sm:w-4"
                          style={{
                            height: `${(item.students / maxStudents) * 85}%`,
                          }}
                        />
                        <div
                          title={`${item.instructors} instructor activities`}
                          className="w-2.5 rounded-t-md bg-violet-500 transition-opacity hover:opacity-75 sm:w-4"
                          style={{
                            height: `${(item.instructors / maxInstructors) * 65}%`,
                          }}
                        />
                      </div>

                      <span className="mt-2 text-[10px] text-muted-foreground sm:text-xs">
                        {item.month}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-3 text-xs text-muted-foreground">
              Illustrative demo values. Connect your API for actual reporting.
            </p>
          </div>

          {/* Finance overview */}
          <div className="rounded-2xl border bg-background p-5 shadow-sm sm:p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-base font-semibold">
                  Financial Overview
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Illustrative fee collection
                </p>
              </div>
              <div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-600">
                <Wallet className="size-5" />
              </div>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              Total fees tracked
            </p>
            <p className="mt-1 break-words text-3xl font-bold tracking-tight">
              {currency(
                financeData.reduce((total, item) => total + item.amount, 0),
              )}
            </p>

            <div className="mt-6 flex h-3 overflow-hidden rounded-full bg-muted">
              {financeData.map((item) => (
                <div
                  key={item.label}
                  className={item.color}
                  style={{
                    width: `${(item.amount /
                      financeData.reduce(
                        (total, entry) => total + entry.amount,
                        0,
                      )) *
                      100
                      }%`,
                  }}
                />
              ))}
            </div>

            <div className="mt-6 space-y-5">
              {financeData.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`size-2.5 rounded-full ${item.color}`} />
                    <span className="text-sm text-muted-foreground">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-sm font-semibold">
                    {currency(item.amount)}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/admin/reports"
              className="mt-7 flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition hover:bg-muted"
            >
              View Financial Reports
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>

        {/* Tasks and activity */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="rounded-2xl border bg-background p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold">
                  Pending Actions
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Items that may require your attention
                </p>
              </div>

              <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-400">
                {pendingTasks.reduce((total, task) => total + task.count, 0)}{" "}
                items
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {pendingTasks.map((task) => {
                const Icon = task.icon;

                return (
                  <Link
                    key={task.title}
                    href={task.href}
                    className="flex items-center gap-3 rounded-xl border border-transparent p-3 transition hover:border-border hover:bg-muted/50 sm:p-4"
                  >
                    <div className="rounded-xl bg-amber-500/10 p-2.5 text-amber-600">
                      <Icon className="size-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold">{task.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {task.description}
                      </p>
                    </div>

                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-semibold">
                      {task.count}
                    </span>

                    <ArrowRight className="hidden size-4 text-muted-foreground sm:block" />
                  </Link>
                );
              })}
            </div>

            <Link
              href="/admin/instructor-verification"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:underline dark:text-blue-400"
            >
              Review pending actions
              <ArrowRight className="size-4" />
            </Link>
          </div>

          {/* Recent activity */}
          <div className="rounded-2xl border bg-background p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold">
                  Recent Activity
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Latest university operations
                </p>
              </div>

              <Activity className="size-5 text-muted-foreground" />
            </div>

            <div className="mt-5 space-y-5">
              {activities.map((activity, index) => {
                const Icon = activity.icon;

                return (
                  <div key={activity.title} className="flex gap-3">
                    <div
                      className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${activity.color}`}
                    >
                      <Icon className="size-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold">
                        {activity.title}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        {activity.description}
                      </p>
                      <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock3 className="size-3.5" />
                        {activity.time}
                      </p>
                    </div>

                    {index === 1 && (
                      <CircleAlert className="size-4 shrink-0 text-amber-500" />
                    )}
                  </div>
                );
              })}
            </div>

            <Link
              href="/admin/audit-logs"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:underline dark:text-blue-400"
            >
              View audit logs
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>

        {/* Quick actions */}
        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Quick Actions</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Quickly access common administration tasks.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <Link
                  key={action.title}
                  href={action.href}
                  className="group flex items-center gap-4 rounded-2xl border bg-background p-4 shadow-sm transition hover:border-blue-500/40 hover:shadow-md"
                >
                  <div className="rounded-xl bg-blue-500/10 p-3 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white dark:text-blue-400">
                    <Icon className="size-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{action.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {action.description}
                    </p>
                  </div>

                  <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition group-hover:text-blue-600" />
                </Link>
              );
            })}
          </div>
        </section>

        {/* Footer note */}
        <footer className="flex flex-col gap-2 border-t pt-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>CampusFlow UMS · University Administration</p>
          <p className="flex items-center gap-1.5">
            <CheckCircle2 className="size-3.5 text-emerald-600" />
            Dashboard interface loaded
          </p>
        </footer>
      </div>
    </main>
  );
}
