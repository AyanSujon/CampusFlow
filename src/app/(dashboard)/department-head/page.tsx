// import React from 'react'

// export default function DepartmentHeadDeshboard() {
//   return (
//     <div>DepartmentHeadDeshboard</div>
//   )
// }













"use client";

import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bell,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  GraduationCap,
  MoreHorizontal,
  Plus,
  Users,
  Wallet,
  ClipboardCheck,
  FileText,
  TrendingUp,
  UserCheck,
  AlertCircle,
  FlaskConical,
  Building2,
} from "lucide-react";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import Link from "next/link";

// --------------------------------------------------
// Demo Data
// Replace these values with your API responses.
// --------------------------------------------------

const statistics = [
  {
    title: "Total Students",
    value: "1,284",
    change: "+12.5%",
    description: "Compared to last semester",
    icon: GraduationCap,
    trend: "up",
    color: "text-blue-600",
    bg: "bg-blue-500/10",
  },
  {
    title: "Faculty Members",
    value: "48",
    change: "+4.2%",
    description: "Active department faculty",
    icon: Users,
    trend: "up",
    color: "text-violet-600",
    bg: "bg-violet-500/10",
  },
  {
    title: "Active Courses",
    value: "36",
    change: "+8.1%",
    description: "Currently running courses",
    icon: BookOpen,
    trend: "up",
    color: "text-emerald-600",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Pending Approvals",
    value: "12",
    change: "4 urgent",
    description: "Require your attention",
    icon: ClipboardCheck,
    trend: "down",
    color: "text-orange-600",
    bg: "bg-orange-500/10",
  },
];

const enrollmentData = [
  { month: "Jan", students: 820 },
  { month: "Feb", students: 900 },
  { month: "Mar", students: 870 },
  { month: "Apr", students: 1020 },
  { month: "May", students: 980 },
  { month: "Jun", students: 1100 },
  { month: "Jul", students: 1080 },
  { month: "Aug", students: 1180 },
  { month: "Sep", students: 1150 },
  { month: "Oct", students: 1284 },
];

const attendanceData = [
  { day: "Mon", attendance: 92 },
  { day: "Tue", attendance: 88 },
  { day: "Wed", attendance: 95 },
  { day: "Thu", attendance: 86 },
  { day: "Fri", attendance: 91 },
  { day: "Sat", attendance: 78 },
];

const faculty = [
  {
    name: "Dr. Sarah Ahmed",
    role: "Professor",
    workload: 85,
    courses: 4,
    initials: "SA",
  },
  {
    name: "Prof. Rahman",
    role: "Associate Professor",
    workload: 72,
    courses: 3,
    initials: "PR",
  },
  {
    name: "Dr. Nusrat Jahan",
    role: "Assistant Professor",
    workload: 95,
    courses: 5,
    initials: "NJ",
  },
  {
    name: "Md. Hasan",
    role: "Lecturer",
    workload: 60,
    courses: 2,
    initials: "MH",
  },
];

const approvals = [
  {
    title: "Course Assignment Request",
    subtitle: "Dr. Sarah Ahmed · CSE 401",
    type: "Course",
    date: "10 min ago",
    status: "Pending",
  },
  {
    title: "Special Enrollment Request",
    subtitle: "Student ID: STU-2026-CSE-0124",
    type: "Enrollment",
    date: "35 min ago",
    status: "Pending",
  },
  {
    title: "Grade Submission Approval",
    subtitle: "Prof. Rahman · CSE 302",
    type: "Grades",
    date: "2 hours ago",
    status: "Review",
  },
  {
    title: "Class Schedule Change",
    subtitle: "Dr. Nusrat Jahan · CSE 205",
    type: "Schedule",
    date: "4 hours ago",
    status: "Pending",
  },
];

const upcomingEvents = [
  {
    title: "Midterm Examination",
    description: "CSE 301 · Data Structures",
    date: "12",
    month: "NOV",
    time: "10:00 AM - 12:00 PM",
    type: "Exam",
  },
  {
    title: "Faculty Department Meeting",
    description: "Department Conference Room",
    date: "14",
    month: "NOV",
    time: "11:00 AM - 12:30 PM",
    type: "Meeting",
  },
  {
    title: "Project Proposal Submission",
    description: "Final Year Students",
    date: "18",
    month: "NOV",
    time: "11:59 PM",
    type: "Deadline",
  },
];

const activities = [
  {
    title: "New student enrollment completed",
    description: "24 students enrolled in CSE Department",
    time: "15 minutes ago",
    icon: GraduationCap,
    color: "text-blue-600",
    bg: "bg-blue-500/10",
  },
  {
    title: "Grades submitted successfully",
    description: "CSE 302 · Database Management",
    time: "1 hour ago",
    icon: CheckCircle2,
    color: "text-emerald-600",
    bg: "bg-emerald-500/10",
  },
  {
    title: "New faculty leave request",
    description: "Dr. Sarah Ahmed · 3 days",
    time: "2 hours ago",
    icon: FileText,
    color: "text-orange-600",
    bg: "bg-orange-500/10",
  },
  {
    title: "Research proposal submitted",
    description: "AI-Based Educational Research",
    time: "Yesterday",
    icon: FlaskConical,
    color: "text-violet-600",
    bg: "bg-violet-500/10",
  },
];

export default function DepartmentHeadDashboard() {
  return (
    <div className="min-h-screen space-y-6 bg-background p-4 md:p-6 lg:p-8">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 className="size-4" />
            Computer Science & Engineering
          </div>

          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Department Dashboard
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Welcome back! Here&apos;s what&apos;s happening in your department.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" className="gap-2">
            <CalendarDays className="size-4" />
            November 2026
          </Button>

          <Button className="gap-2">
            <Plus className="size-4" />
            Create Announcement
          </Button>
        </div>
      </div>

      {/* Department Info */}
      <Card className="overflow-hidden border-none bg-gradient-to-r from-primary/10 via-primary/5 to-transparent shadow-none">
        <CardContent className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Building2 className="size-6" />
            </div>

            <div>
              <h2 className="font-semibold">
                Computer Science & Engineering
              </h2>
              <p className="text-sm text-muted-foreground">
                Department Code: CSE · Academic Year 2026
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-5 text-sm">
            <div>
              <p className="text-muted-foreground">Semester</p>
              <p className="font-semibold">Fall 2026</p>
            </div>

            <div>
              <p className="text-muted-foreground">Department Status</p>
              <Badge className="mt-1 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/10">
                Active
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statistics.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card key={stat.title}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>

                  <div className={`rounded-lg p-2 ${stat.bg}`}>
                    <Icon className={`size-5 ${stat.color}`} />
                  </div>
                </div>

                <div className="mt-4 flex items-end justify-between gap-2">
                  <h3 className="text-3xl font-bold tracking-tight">
                    {stat.value}
                  </h3>

                  <span
                    className={`mb-1 flex items-center gap-1 text-xs font-medium ${stat.title === "Pending Approvals"
                      ? "text-orange-600"
                      : "text-emerald-600"
                      }`}
                  >
                    {stat.title === "Pending Approvals" ? (
                      <AlertCircle className="size-3.5" />
                    ) : (
                      <ArrowUpRight className="size-3.5" />
                    )}
                    {stat.change}
                  </span>
                </div>

                <p className="mt-2 text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Analytics */}
      <div className="grid gap-6 xl:grid-cols-3">

        {/* Enrollment Chart */}
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Student Enrollment</CardTitle>
              <CardDescription>
                Department enrollment growth throughout 2026
              </CardDescription>
            </div>

            <Tabs defaultValue="year">
              <TabsList className="h-8">
                <TabsTrigger value="year" className="text-xs">
                  Year
                </TabsTrigger>
                <TabsTrigger value="semester" className="text-xs">
                  Semester
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>

          <CardContent>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={enrollmentData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="enrollmentGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="var(--primary)"
                        stopOpacity={0.25}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--primary)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    className="stroke-border"
                  />

                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                    tickMargin={10}
                  />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />

                  <Tooltip
                    contentStyle={{
                      borderRadius: "10px",
                      border: "1px solid var(--border)",
                      background: "var(--card)",
                      color: "var(--card-foreground)",
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="students"
                    stroke="var(--primary)"
                    strokeWidth={2}
                    fill="url(#enrollmentGradient)"
                    activeDot={{ r: 5 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 flex items-center gap-2 border-t pt-4 text-sm">
              <TrendingUp className="size-4 text-emerald-600" />
              <span className="font-medium text-emerald-600">
                12.5% growth
              </span>
              <span className="text-muted-foreground">
                in student enrollment this year
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance Overview</CardTitle>
            <CardDescription>
              Weekly average student attendance
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="mb-5">
              <div className="flex items-end justify-between">
                <h3 className="text-4xl font-bold">88.5%</h3>
                <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/10">
                  <ArrowUpRight className="mr-1 size-3" />
                  4.2%
                </Badge>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Average attendance this week
              </p>
            </div>

            <div className="h-[190px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    className="stroke-border"
                  />

                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11 }}
                  />

                  <YAxis hide domain={[0, 100]} />

                  <Tooltip
                    formatter={(value) => [`${value}%`, "Attendance"]}
                    contentStyle={{
                      borderRadius: "10px",
                      border: "1px solid var(--border)",
                      background: "var(--card)",
                      color: "var(--card-foreground)",
                    }}
                  />

                  <Bar
                    dataKey="attendance"
                    fill="var(--primary)"
                    radius={[5, 5, 0, 0]}
                    barSize={22}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 flex justify-between border-t pt-4 text-sm">
              <span className="text-muted-foreground">
                Attendance target
              </span>
              <span className="font-semibold">85%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Approvals and Events */}
      <div className="grid gap-6 xl:grid-cols-3">

        {/* Approvals */}
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Pending Approvals</CardTitle>
              <CardDescription>
                Requests that require your attention
              </CardDescription>
            </div>

            <Button variant="outline" size="sm" render={
              <Link href="/department-head/approvals">
                View All
                <ArrowRight className="ml-2 size-4" />
              </Link>
            }>

            </Button>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {approvals.map((approval, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-between gap-3 rounded-lg border p-3 sm:flex-row sm:items-center"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1 rounded-lg bg-orange-500/10 p-2 text-orange-600">
                      <ClipboardCheck className="size-4" />
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold">
                        {approval.title}
                      </h4>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {approval.subtitle}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {approval.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:justify-end">
                    <Badge
                      variant="outline"
                      className={
                        approval.status === "Review"
                          ? "border-blue-500/30 text-blue-600"
                          : "border-orange-500/30 text-orange-600"
                      }
                    >
                      {approval.status}
                    </Badge>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary"
                      render={
                        <Link href="/department-head/approvals">
                          Review
                        </Link>
                      }
                    >

                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>
              Important department schedules
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-5">
              {upcomingEvents.map((event) => (
                <div key={event.title} className="flex gap-3">
                  <div className="flex size-12 shrink-0 flex-col items-center justify-center rounded-lg border bg-muted/40">
                    <span className="text-lg font-bold leading-none">
                      {event.date}
                    </span>
                    <span className="mt-1 text-[10px] font-semibold text-muted-foreground">
                      {event.month}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm font-semibold">
                        {event.title}
                      </h4>
                    </div>

                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      {event.description}
                    </p>

                    <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock3 className="size-3" />
                      {event.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="mt-5 w-full" render={
              <Link href="/department-head/academic-calendar">
                View Academic Calendar
              </Link>
            }>

            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Faculty Workload and Activities */}
      <div className="grid gap-6 xl:grid-cols-2">

        {/* Faculty Workload */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Faculty Workload</CardTitle>
              <CardDescription>
                Teaching workload distribution
              </CardDescription>
            </div>

            <Button variant="ghost" size="icon">
              <MoreHorizontal className="size-5" />
            </Button>
          </CardHeader>

          <CardContent>
            <div className="space-y-5">
              {faculty.map((member) => (
                <div key={member.name} className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-9">
                      <AvatarFallback>
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {member.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {member.role} · {member.courses} courses
                      </p>
                    </div>

                    <span className="text-sm font-semibold">
                      {member.workload}%
                    </span>
                  </div>

                  <Progress
                    value={member.workload}
                    className="h-2"
                  />
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              className="mt-6 w-full"
              render={
                <Link href="/department-head/faculty-workload">
                  Manage Faculty Workload
                </Link>
              }
            />
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>
                Latest department updates
              </CardDescription>
            </div>

            <Button variant="ghost" size="icon">
              <MoreHorizontal className="size-5" />
            </Button>
          </CardHeader>

          <CardContent>
            <div className="space-y-5">
              {activities.map((activity, index) => {
                const Icon = activity.icon;

                return (
                  <div key={index} className="flex gap-3">
                    <div
                      className={`flex size-9 shrink-0 items-center justify-center rounded-full ${activity.bg}`}
                    >
                      <Icon className={`size-4 ${activity.color}`} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">
                        {activity.title}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {activity.description}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Button
              variant="outline"
              className="mt-6 w-full"
              render={
                <Link href="/department-head/activities">
                  View All Activities
                </Link>
              }
            />
          </CardContent>
        </Card>
      </div>

      {/* Quick Access */}
      <div className="space-y-3">
        <div>
          <h2 className="text-lg font-semibold">Quick Access</h2>
          <p className="text-sm text-muted-foreground">
            Frequently used department management tools
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Manage Students",
              description: "View student records",
              icon: GraduationCap,
              href: "/department-head/students",
            },
            {
              title: "Manage Courses",
              description: "Manage department courses",
              icon: BookOpen,
              href: "/department-head/courses",
            },
            {
              title: "Faculty Management",
              description: "Manage faculty members",
              icon: UserCheck,
              href: "/department-head/instructors",
            },
            {
              title: "Academic Reports",
              description: "View department analytics",
              icon: Activity,
              href: "/department-head/reports",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                className="group"
              >
                <Card className="h-full transition-colors group-hover:border-primary/50 group-hover:bg-muted/30">
                  <CardContent className="flex items-center gap-3 p-4">
                    <div className="rounded-lg bg-primary/10 p-3 text-primary">
                      <Icon className="size-5" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>

                    <ArrowRight className="ml-auto size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

    </div>
  );
}
