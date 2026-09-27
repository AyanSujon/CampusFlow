"use client";

import * as React from "react";
import {
  ArrowRight,
  BookOpen,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  GraduationCap,
  LayoutDashboard,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Role = "student" | "faculty" | "admin";

interface RoleData {
  id: Role;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: React.ElementType;
  stats: {
    label: string;
    value: string;
    icon: React.ElementType;
  }[];
}

const roles: RoleData[] = [
  {
    id: "student",
    label: "Student",
    eyebrow: "STUDENT PORTAL",
    title: "Your academic journey, connected.",
    description:
      "Keep your courses, schedule, results, enrollment, and academic information organized in one digital campus.",
    icon: GraduationCap,
    stats: [
      {
        label: "Current GPA",
        value: "3.72",
        icon: GraduationCap,
      },
      {
        label: "Credits",
        value: "84 / 120",
        icon: BookOpen,
      },
      {
        label: "Courses",
        value: "06",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    id: "faculty",
    label: "Faculty",
    eyebrow: "FACULTY PORTAL",
    title: "Teach, manage, and track progress.",
    description:
      "Manage courses, students, schedules, grades, and academic activities from your faculty workspace.",
    icon: Users,
    stats: [
      {
        label: "My Courses",
        value: "04",
        icon: BookOpen,
      },
      {
        label: "Students",
        value: "128",
        icon: Users,
      },
      {
        label: "Pending Grades",
        value: "12",
        icon: CheckCircle2,
      },
    ],
  },
  {
    id: "admin",
    label: "Administration",
    eyebrow: "ADMINISTRATION",
    title: "Manage the university with clarity.",
    description:
      "Coordinate admissions, departments, programs, students, finance, and academic operations from one system.",
    icon: Building2,
    stats: [
      {
        label: "Students",
        value: "8,420",
        icon: GraduationCap,
      },
      {
        label: "Faculty",
        value: "386",
        icon: Users,
      },
      {
        label: "Departments",
        value: "24",
        icon: Building2,
      },
    ],
  },
];

export default function Hero() {
  const [activeRole, setActiveRole] = React.useState<Role>("student");
  const [direction, setDirection] = React.useState<"next" | "prev">("next");

  const currentIndex = roles.findIndex((role) => role.id === activeRole);
  const currentRole = roles[currentIndex];

  const goToRole = (role: Role) => {
    const nextIndex = roles.findIndex((item) => item.id === role);

    setDirection(nextIndex >= currentIndex ? "next" : "prev");
    setActiveRole(role);
  };

  const goNext = () => {
    setDirection("next");

    const nextIndex = (currentIndex + 1) % roles.length;

    setActiveRole(roles[nextIndex].id);
  };

  const goPrevious = () => {
    setDirection("prev");

    const previousIndex =
      (currentIndex - 1 + roles.length) % roles.length;

    setActiveRole(roles[previousIndex].id);
  };

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-125 w-125 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

        <div
          className={cn(
            "absolute inset-0 opacity-40",
            "[background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)]",
            "[background-size:48px_48px]",
            "[mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]",
          )}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {/* Main Hero */}
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* =====================================================
              LEFT CONTENT
          ===================================================== */}
          <div className="max-w-2xl">
            <Badge
              variant="secondary"
              className="mb-6 gap-2 rounded-full border border-primary/10 bg-primary/5 px-3 py-1.5 text-primary"
            >
              <span className="size-1.5 rounded-full bg-primary" />

              UNIVERSITY MANAGEMENT SYSTEM
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl lg:leading-[1.05]">
              Everything your{" "}
              <span className="text-primary">campus</span>{" "}
              needs, connected.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              CampusFlow brings students, faculty, departments, academics,
              admissions, results, and financial operations together in one
              organized digital campus.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="group">
                Explore Campus
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button size="lg" variant="outline">
                View System
              </Button>
            </div>

            {/* =================================================
                ROLE SELECTOR
            ================================================= */}
            <div className="mt-10">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Explore by perspective
              </p>

              <div
                role="tablist"
                aria-label="CampusFlow perspectives"
                className="inline-flex flex-wrap gap-1 rounded-xl border bg-muted/50 p-1"
              >
                {roles.map((role) => {
                  const Icon = role.icon;

                  const isActive = activeRole === role.id;

                  return (
                    <button
                      key={role.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => goToRole(role.id)}
                      className={cn(
                        "flex min-h-10 items-center gap-2 rounded-lg px-3 text-sm font-medium transition-all",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        isActive
                          ? "bg-background text-primary shadow-sm"
                          : "text-muted-foreground hover:bg-background/70 hover:text-foreground",
                      )}
                    >
                      <Icon className="size-4" />

                      {role.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* =====================================================
              RIGHT INTERACTIVE PREVIEW
          ===================================================== */}
          <div className="relative">
            {/* Decorative circles */}
            <div className="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full border border-primary/10" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 size-32 rounded-full border border-primary/10" />

            <Card className="relative overflow-hidden rounded-2xl border-primary/10 bg-card shadow-xl shadow-primary/5">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between border-b bg-muted/30 px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <LayoutDashboard className="size-4" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      CampusFlow
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {currentRole.eyebrow}
                    </p>
                  </div>
                </div>

                <Badge
                  variant="outline"
                  className="border-status-active/20 bg-status-active/10 text-status-active"
                >
                  <span className="mr-1.5 size-1.5 rounded-full bg-status-active" />
                  Active
                </Badge>
              </div>

              <CardContent className="p-5 sm:p-6">
                {/* Dynamic role content */}
                <div
                  key={`${activeRole}-${direction}`}
                  className={cn(
                    "animate-in duration-500",
                    direction === "next"
                      ? "slide-in-from-right-4"
                      : "slide-in-from-left-4",
                  )}
                >
                  <div className="mb-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                      {currentRole.eyebrow}
                    </p>

                    <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                      {currentRole.title}
                    </h2>

                    <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
                      {currentRole.description}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {currentRole.stats.map((stat) => {
                      const Icon = stat.icon;

                      return (
                        <div
                          key={stat.label}
                          className="rounded-xl border bg-background p-3 sm:p-4"
                        >
                          <div className="mb-3 flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Icon className="size-4" />
                          </div>

                          <p className="text-lg font-bold sm:text-xl">
                            {stat.value}
                          </p>

                          <p className="mt-1 text-[10px] leading-4 text-muted-foreground sm:text-xs">
                            {stat.label}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Dynamic dashboard */}
                  <DashboardPreview role={activeRole} />
                </div>

                {/* Slider Controls */}
                <div className="mt-6 flex items-center justify-between border-t pt-5">
                  <div className="flex items-center gap-1.5">
                    {roles.map((role, index) => (
                      <button
                        key={role.id}
                        type="button"
                        aria-label={`Show ${role.label}`}
                        onClick={() => goToRole(role.id)}
                        className={cn(
                          "h-1.5 rounded-full transition-all",
                          activeRole === role.id
                            ? "w-7 bg-primary"
                            : "w-1.5 bg-border hover:bg-muted-foreground",
                        )}
                      />
                    ))}
                  </div>

                  <div className="flex gap-1">
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      className="size-8"
                      onClick={goPrevious}
                      aria-label="Previous perspective"
                    >
                      <ChevronLeft className="size-4" />
                    </Button>

                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      className="size-8"
                      onClick={goNext}
                      aria-label="Next perspective"
                    >
                      <ChevronRight className="size-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Floating activity */}
            <div className="absolute -bottom-5 -left-5 hidden w-56 rounded-xl border bg-card p-3 shadow-lg sm:block">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-status-success/10 text-status-success">
                  <CheckCircle2 className="size-4" />
                </div>

                <div>
                  <p className="text-xs font-semibold">
                    Campus activity
                  </p>

                  <p className="mt-0.5 text-[11px] leading-4 text-muted-foreground">
                    Academic operations are running smoothly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            BOTTOM FEATURE STRIP
        ===================================================== */}
        <div className="mt-20 border-t pt-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureItem
              icon={GraduationCap}
              title="Student Management"
              description="Profiles, enrollment and academic records."
            />

            <FeatureItem
              icon={BookOpen}
              title="Academic Operations"
              description="Courses, subjects, programs and results."
            />

            <FeatureItem
              icon={CircleDollarSign}
              title="Financial Management"
              description="Invoices, payments and financial records."
            />

            <FeatureItem
              icon={CalendarDays}
              title="University Operations"
              description="Departments, faculty and academic activities."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   DASHBOARD PREVIEW
============================================================= */

function DashboardPreview({ role }: { role: Role }) {
  if (role === "student") {
    return (
      <div className="mt-6 rounded-xl border bg-muted/30 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">
              Today&apos;s Classes
            </p>

            <p className="text-xs text-muted-foreground">
              Your upcoming schedule
            </p>
          </div>

          <CalendarDays className="size-4 text-muted-foreground" />
        </div>

        <div className="mt-4 space-y-2">
          <ScheduleItem
            time="10:00 AM"
            title="Web Engineering"
            room="Room 302"
          />

          <ScheduleItem
            time="01:00 PM"
            title="Database Systems"
            room="Room 204"
          />

          <ScheduleItem
            time="03:30 PM"
            title="Software Engineering"
            room="Room 105"
          />
        </div>
      </div>
    );
  }

  if (role === "faculty") {
    return (
      <div className="mt-6 rounded-xl border bg-muted/30 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">
              Current Courses
            </p>

            <p className="text-xs text-muted-foreground">
              Your teaching overview
            </p>
          </div>

          <BookOpen className="size-4 text-muted-foreground" />
        </div>

        <div className="mt-4 space-y-2">
          <CourseItem
            title="Web Engineering"
            students="42 Students"
            status="Active"
          />

          <CourseItem
            title="Database Systems"
            students="36 Students"
            status="Active"
          />

          <CourseItem
            title="Software Engineering"
            students="50 Students"
            status="Review"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-xl border bg-muted/30 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold">
            University Overview
          </p>

          <p className="text-xs text-muted-foreground">
            Current institutional activity
          </p>
        </div>

        <Building2 className="size-4 text-muted-foreground" />
      </div>

      <div className="mt-4 space-y-3">
        <ProgressItem
          label="Admissions"
          value="82%"
          progress={82}
        />

        <ProgressItem
          label="Enrollment"
          value="74%"
          progress={74}
        />

        <ProgressItem
          label="Fee Collection"
          value="91%"
          progress={91}
        />
      </div>
    </div>
  );
}

/* =============================================================
   SMALL COMPONENTS
============================================================= */

function ScheduleItem({
  time,
  title,
  room,
}: {
  time: string;
  title: string;
  room: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border bg-background p-3">
      <div className="flex items-center gap-3">
        <div className="rounded-md bg-primary/10 px-2 py-1 text-[10px] font-semibold text-primary">
          {time}
        </div>

        <div>
          <p className="text-xs font-semibold">{title}</p>
          <p className="text-[10px] text-muted-foreground">{room}</p>
        </div>
      </div>

      <ArrowRight className="size-3 text-muted-foreground" />
    </div>
  );
}

function CourseItem({
  title,
  students,
  status,
}: {
  title: string;
  students: string;
  status: "Active" | "Review";
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border bg-background p-3">
      <div>
        <p className="text-xs font-semibold">{title}</p>
        <p className="text-[10px] text-muted-foreground">
          {students}
        </p>
      </div>

      <Badge
        variant="outline"
        className={cn(
          "text-[10px]",
          status === "Active"
            ? "border-status-active/20 bg-status-active/10 text-status-active"
            : "border-status-pending/20 bg-status-pending/10 text-status-pending",
        )}
      >
        {status}
      </Badge>
    </div>
  );
}

function ProgressItem({
  label,
  value,
  progress,
}: {
  label: string;
  value: string;
  progress: number;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-xs font-medium">{label}</span>

        <span className="text-xs font-semibold text-primary">
          {value}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all duration-700"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function FeatureItem({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="size-4" />
      </div>

      <div>
        <h3 className="text-sm font-semibold">{title}</h3>

        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}