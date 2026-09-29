


"use client"
/**
 * Super Admin Dashboard — DEMO with mock data.
 * Drop this in as app/(dashboard)/super-admin/demo/page.tsx to preview the
 * full layout without hitting the backend. Once your API is ready, swap the
 * MOCK_* constants for the dashboardApi.* calls from the earlier guide.
 *
 * Requires (already covered in the earlier setup steps):
 *   npx shadcn@latest add card chart skeleton table badge button
 *   lucide-react, recharts (installed by the shadcn `chart` component)
 */

import Link from "next/link";
import {
  AlertTriangle,
  BarChart3,
  Bell,
  BookOpen,
  BookPlus,
  CalendarRange,
  FilePlus2,
  GraduationCap,
  Layers,
  Receipt,
  TrendingUp,
  UserPlus,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, XAxis, YAxis } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// ---------------------------------------------------------------------------
// MOCK DATA — replace with real dashboardApi.* calls later
// ---------------------------------------------------------------------------

const MOCK_SUMMARY = {
  students: { total: 4820, changePct: 6.4 },
  instructors: 312,
  faculties: 6,
  departments: 24,
  programs: 41,
  activeCourses: 186,
  enrollments: 5390,
  revenueThisMonth: 184500,
  pendingDues: 62300,
  term: { name: "Fall 2026", daysLeft: 47 },
};

const MOCK_ENROLLMENT_TREND = [
  { month: "Apr", enrollments: 210 },
  { month: "May", enrollments: 165 },
  { month: "Jun", enrollments: 98 },
  { month: "Jul", enrollments: 340 },
  { month: "Aug", enrollments: 610 },
  { month: "Sep", enrollments: 420 },
];

const MOCK_REVENUE_VS_DUES = [
  { month: "Apr", collected: 142000, dues: 38000 },
  { month: "May", collected: 138500, dues: 41200 },
  { month: "Jun", collected: 96000, dues: 52000 },
  { month: "Jul", collected: 171000, dues: 47500 },
  { month: "Aug", collected: 205000, dues: 58900 },
  { month: "Sep", collected: 184500, dues: 62300 },
];

const MOCK_STUDENTS_BY_DEPT = [
  { department: "CSE", students: 980 },
  { department: "EEE", students: 740 },
  { department: "BBA", students: 690 },
  { department: "Civil", students: 520 },
  { department: "English", students: 410 },
  { department: "Law", students: 380 },
];

const MOCK_PAYMENT_STATUS = [
  { name: "PAID", value: 3120 },
  { name: "PARTIALLY_PAID", value: 640 },
  { name: "PENDING", value: 510 },
  { name: "OVERDUE", value: 180 },
];

const MOCK_ATTENDANCE = [
  { week: "04 Aug", rate: 91.2 },
  { week: "11 Aug", rate: 89.5 },
  { week: "18 Aug", rate: 87.8 },
  { week: "25 Aug", rate: 92.1 },
  { week: "01 Sep", rate: 90.4 },
  { week: "08 Sep", rate: 88.9 },
  { week: "15 Sep", rate: 93.0 },
  { week: "22 Sep", rate: 91.7 },
];

const MOCK_GRADES = [
  { grade: "A", count: 1240 },
  { grade: "B", count: 1580 },
  { grade: "C", count: 820 },
  { grade: "D", count: 260 },
  { grade: "F", count: 90 },
];

const MOCK_ACADEMIC = {
  term: { name: "Fall 2026", startDate: "2026-08-01", endDate: "2026-12-15", daysLeft: 47 },
  todayClasses: 38,
  coursesWithoutInstructor: 3,
  upcomingExams: [
    { id: "1", title: "Midterm", examDate: "2026-10-05", room: "Room 204", course: { code: "CSE-301" } },
    { id: "2", title: "Midterm", examDate: "2026-10-06", room: "Room 118", course: { code: "EEE-210" } },
    { id: "3", title: "Quiz 2", examDate: "2026-10-07", room: "Room 302", course: { code: "BBA-115" } },
    { id: "4", title: "Midterm", examDate: "2026-10-09", room: "Room 101", course: { code: "ENG-220" } },
  ],
  lowAttendance: [
    { id: "1", name: "Rafiul Islam", rate: 61.5 },
    { id: "2", name: "Mim Akter", rate: 68.2 },
    { id: "3", name: "Sabbir Hossain", rate: 70.1 },
  ],
};

const MOCK_FINANCE = {
  collectionRate: 82.4,
  recentPayments: [
    { id: "1", amount: 4200, status: "SUCCESS", paidAt: "2026-09-28", invoiceNumber: "INV-10231", student: "Nusrat Jahan" },
    { id: "2", amount: 3100, status: "SUCCESS", paidAt: "2026-09-27", invoiceNumber: "INV-10228", student: "Kamal Hasan" },
    { id: "3", amount: 5400, status: "PAID", paidAt: "2026-09-27", invoiceNumber: "INV-10225", student: "Farhana Akter" },
    { id: "4", amount: 2800, status: "SUCCESS", paidAt: "2026-09-26", invoiceNumber: "INV-10219", student: "Tanvir Ahmed" },
  ],
  overdueInvoices: [
    { id: "1", number: "INV-10102", amountDue: 6200, dueDate: "2026-09-10", student: "Shamim Reza" },
    { id: "2", number: "INV-10098", amountDue: 3900, dueDate: "2026-09-12", student: "Ayesha Siddika" },
    { id: "3", number: "INV-10091", amountDue: 5100, dueDate: "2026-09-15", student: "Jubayer Alam" },
  ],
  recentTransactions: [
    { id: "1", type: "TUITION_PAYMENT", amount: 4200, createdAt: "2026-09-28" },
    { id: "2", type: "SCHOLARSHIP_ADJUSTMENT", amount: -1500, createdAt: "2026-09-27" },
    { id: "3", type: "LATE_FEE", amount: 200, createdAt: "2026-09-26" },
  ],
};

const MOCK_ALERTS = {
  failedPayments: 4,
  pendingResultApprovals: 12,
  pendingAdjustments: 3,
  suspendedUsers: 2,
  termsEndingSoon: [{ name: "Fall 2026", endDate: "2026-12-15" }],
  recentRegistrations: [
    { id: "1", firstName: "Nabila", lastName: "Rahman", role: "STUDENT", createdAt: "2026-09-28" },
    { id: "2", firstName: "Imran", lastName: "Kabir", role: "INSTRUCTOR", createdAt: "2026-09-27" },
    { id: "3", firstName: "Sadia", lastName: "Islam", role: "STUDENT", createdAt: "2026-09-26" },
  ],
  recentNotifications: [
    { id: "1", title: "Midterm routine published", createdAt: "2026-09-28T10:00:00Z" },
    { id: "2", title: "Fee payment deadline reminder", createdAt: "2026-09-27T09:00:00Z" },
  ],
};

const MOCK_AUDIT_LOGS = [
  { id: "1", actor: "Ayan Sujon", action: "APPROVED_RESULT", module: "Academic Delivery", createdAt: "2026-09-28T14:20:00Z" },
  { id: "2", actor: "System", action: "PAYMENT_RECEIVED", module: "Finance", createdAt: "2026-09-28T13:05:00Z" },
  { id: "3", actor: "Rina Chowdhury", action: "USER_SUSPENDED", module: "Users", createdAt: "2026-09-27T11:40:00Z" },
  { id: "4", actor: "Ayan Sujon", action: "COURSE_CREATED", module: "Academic Catalog", createdAt: "2026-09-27T09:15:00Z" },
  { id: "5", actor: "System", action: "INVOICE_OVERDUE", module: "Finance", createdAt: "2026-09-26T00:00:00Z" },
];

// ---------------------------------------------------------------------------
// Small formatters (inline so this file has zero extra deps)
// ---------------------------------------------------------------------------

const money = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

const dateShort = (d: string) =>
  new Date(d).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });

const dateTime = (d: string) =>
  new Date(d).toLocaleString("en-US", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });

// ---------------------------------------------------------------------------
// Chart wrappers
// ---------------------------------------------------------------------------

const PALETTE = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

function TrendLineChart({ data, xKey, yKey, label }: { data: Record<string, string | number>[]; xKey: string; yKey: string; label: string }) {
  const config = { [yKey]: { label, color: "var(--chart-1)" } } satisfies ChartConfig;
  return (
    <ChartContainer config={config} className="h-64 w-full">
      <LineChart data={data} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey={xKey} tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line dataKey={yKey} type="monotone" stroke={`var(--color-${yKey})`} strokeWidth={2} dot={false} />
      </LineChart>
    </ChartContainer>
  );
}

function SeriesBarChart({
  data,
  xKey,
  series,
  stacked = false,
}: {
  data: Record<string, string | number>[];
  xKey: string;
  series: { key: string; label: string }[];
  stacked?: boolean;
}) {
  const config = Object.fromEntries(
    series.map((s, i) => [s.key, { label: s.label, color: PALETTE[i % PALETTE.length] }]),
  ) satisfies ChartConfig;

  return (
    <ChartContainer config={config} className="h-64 w-full">
      <BarChart data={data} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey={xKey} tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis tickLine={false} axisLine={false} width={40} />
        <ChartTooltip content={<ChartTooltipContent />} />
        {series.length > 1 && <ChartLegend content={<ChartLegendContent />} />}
        {series.map((s) => (
          <Bar key={s.key} dataKey={s.key} fill={`var(--color-${s.key})`} stackId={stacked ? "a" : undefined} radius={stacked ? 0 : 4} />
        ))}
      </BarChart>
    </ChartContainer>
  );
}

function DonutChart({ data }: { data: { name: string; value: number }[] }) {
  const config = Object.fromEntries(
    data.map((d, i) => [d.name, { label: d.name, color: PALETTE[i % PALETTE.length] }]),
  ) satisfies ChartConfig;
  const withFill = data.map((d, i) => ({ ...d, fill: PALETTE[i % PALETTE.length] }));

  return (
    <ChartContainer config={config} className="mx-auto h-64 w-full">
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
        <Pie data={withFill} dataKey="value" nameKey="name" innerRadius={60} strokeWidth={2} />
        <ChartLegend content={<ChartLegendContent nameKey="name" />} />
      </PieChart>
    </ChartContainer>
  );
}

function RateAreaChart({ data, xKey, yKey, label }: { data: Record<string, string | number>[]; xKey: string; yKey: string; label: string }) {
  const config = { [yKey]: { label, color: "var(--chart-2)" } } satisfies ChartConfig;
  return (
    <ChartContainer config={config} className="h-64 w-full">
      <AreaChart data={data} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey={xKey} tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis domain={[0, 100]} tickLine={false} axisLine={false} width={40} unit="%" />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area dataKey={yKey} type="monotone" stroke={`var(--color-${yKey})`} fill={`var(--color-${yKey})`} fillOpacity={0.2} />
      </AreaChart>
    </ChartContainer>
  );
}

// ---------------------------------------------------------------------------
// Sections
// ---------------------------------------------------------------------------

function KpiCard({ title, value, hint, icon: Icon }: { title: string; value: string; hint?: React.ReactNode; icon: LucideIcon }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold">{value}</div>
        {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      </CardContent>
    </Card>
  );
}

function KpiSection() {
  const s = MOCK_SUMMARY;
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <KpiCard
        title="Total Students"
        value={s.students.total.toLocaleString()}
        icon={GraduationCap}
        hint={
          <span className="inline-flex items-center gap-1 text-emerald-600">
            <TrendingUp className="size-3" />
            {s.students.changePct}% vs last month
          </span>
        }
      />
      <KpiCard title="Total Instructors" value={s.instructors.toLocaleString()} icon={Users} />
      <KpiCard title="Faculties / Departments / Programs" value={`${s.faculties} / ${s.departments} / ${s.programs}`} icon={Layers} />
      <KpiCard title="Active Courses" value={s.activeCourses.toLocaleString()} icon={BookOpen} hint="Current term" />
      <KpiCard title="Total Enrollments" value={s.enrollments.toLocaleString()} icon={Users} hint="Current term" />
      <KpiCard title="Revenue (This Month)" value={money(s.revenueThisMonth)} icon={Wallet} />
      <KpiCard title="Pending Dues" value={money(s.pendingDues)} icon={Receipt} hint="Unpaid + overdue" />
      <KpiCard title="Current Term" value={s.term.name} icon={CalendarRange} hint={`${s.term.daysLeft} days left`} />
    </div>
  );
}

function ChartCard({ title, description, className, children }: { title: string; description?: string; className?: string; children: React.ReactNode }) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function QuickActions() {
  const actions = [
    { label: "Add Student", href: "/super-admin/students", icon: UserPlus },
    { label: "Add Instructor", href: "/super-admin/instructors", icon: Users },
    { label: "Create Course", href: "/super-admin/courses", icon: BookPlus },
    { label: "Create Invoice", href: "/super-admin/invoices", icon: FilePlus2 },
    { label: "Send Notification", href: "/super-admin/notifications", icon: Bell },
    { label: "Generate Report", href: "/super-admin/reports/academic", icon: BarChart3 },
  ];
  return (
    <div className="flex flex-wrap gap-2">
      {actions.map(({ label, href, icon: Icon }) => (
        <Button key={label}  variant="outline" size="sm">
          <Link href={href} className="flex items-center gap-1">
            <Icon className="size-4" />
            {label}
          </Link>
        </Button>
      ))}
    </div>
  );
}

function AcademicSnapshot() {
  const a = MOCK_ACADEMIC;
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Academic Snapshot</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 text-sm">
        <div>
          <p className="text-muted-foreground">Current term</p>
          <p className="font-medium">{a.term.name}</p>
          <p className="text-xs text-muted-foreground">
            {dateShort(a.term.startDate)} to {dateShort(a.term.endDate)} ({a.term.daysLeft} days left)
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border p-3">
            <p className="text-xs text-muted-foreground">Classes today</p>
            <p className="text-xl font-semibold">{a.todayClasses}</p>
          </div>
          <div className="rounded-lg border p-3">
            <p className="text-xs text-muted-foreground">Courses w/o instructor</p>
            <p className="text-xl font-semibold">{a.coursesWithoutInstructor}</p>
          </div>
        </div>

        <div>
          <p className="mb-2 font-medium">Upcoming exams</p>
          <ul className="space-y-2">
            {a.upcomingExams.map((e) => (
              <li key={e.id} className="flex items-center justify-between gap-2">
                <span className="truncate">
                  {e.course.code} · {e.title}
                </span>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {dateShort(e.examDate)} · {e.room}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-2 font-medium">Low attendance (&lt; 75%)</p>
          <ul className="space-y-1">
            {a.lowAttendance.map((s) => (
              <li key={s.id} className="flex justify-between">
                <span className="truncate">{s.name}</span>
                <span className="text-destructive">{s.rate}%</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

function statusBadgeVariant(status: string): "default" | "secondary" | "destructive" | "outline" {
  if (["PAID", "SUCCESS", "APPROVED", "PUBLISHED", "ACTIVE"].includes(status)) return "default";
  if (["PENDING", "SUBMITTED", "PARTIALLY_PAID"].includes(status)) return "secondary";
  if (["REJECTED", "FAILED", "OVERDUE", "SUSPENDED"].includes(status)) return "destructive";
  return "outline";
}

function FinanceSnapshot() {
  const f = MOCK_FINANCE;
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Finance Snapshot</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 text-sm">
        <div className="rounded-lg border p-3">
          <p className="text-xs text-muted-foreground">Collection rate</p>
          <p className="text-xl font-semibold">{f.collectionRate}%</p>
        </div>

        <div>
          <p className="mb-2 font-medium">Recent payments</p>
          <ul className="space-y-2">
            {f.recentPayments.map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-2">
                <span className="truncate">
                  {p.student} <span className="text-xs text-muted-foreground">{p.invoiceNumber}</span>
                </span>
                <span className="flex shrink-0 items-center gap-2">
                  {money(p.amount)}
                  <Badge variant={statusBadgeVariant(p.status)}>{p.status}</Badge>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-2 font-medium">Overdue invoices</p>
          <ul className="space-y-2">
            {f.overdueInvoices.map((i) => (
              <li key={i.id} className="flex items-center justify-between gap-2">
                <span className="truncate">{i.student}</span>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {money(i.amountDue)} · due {dateShort(i.dueDate)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-2 font-medium">Recent transactions</p>
          <ul className="space-y-1">
            {f.recentTransactions.map((t) => (
              <li key={t.id} className="flex justify-between">
                <span>{t.type}</span>
                <span>{money(t.amount)}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

function AlertsPanel() {
  const a = MOCK_ALERTS;
  const alerts = [
    { label: "Failed payments (7 days)", count: a.failedPayments, href: "/super-admin/payments" },
    { label: "Results awaiting approval", count: a.pendingResultApprovals, href: "/super-admin/grades" },
    { label: "Pending financial adjustments", count: a.pendingAdjustments, href: "/super-admin/transactions" },
    { label: "Suspended accounts", count: a.suspendedUsers, href: "/super-admin/users" },
  ].filter((x) => x.count > 0);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Alerts & Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 text-sm">
        <div className="space-y-2">
          {alerts.map((x) => (
            <Link key={x.label} href={x.href} className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted">
              <span className="flex items-center gap-2">
                <AlertTriangle className="size-4 text-amber-500" />
                {x.label}
              </span>
              <Badge variant="secondary">{x.count}</Badge>
            </Link>
          ))}
          {a.termsEndingSoon.map((t) => (
            <Link key={t.name} href="/super-admin/academic-terms" className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted">
              <span className="flex items-center gap-2">
                <AlertTriangle className="size-4 text-amber-500" />
                {t.name} ends {dateShort(t.endDate)}
              </span>
            </Link>
          ))}
        </div>

        <div>
          <p className="mb-2 font-medium">Recent registrations</p>
          <ul className="space-y-1">
            {a.recentRegistrations.map((u) => (
              <li key={u.id} className="flex items-center justify-between">
                <span className="truncate">
                  {u.firstName} {u.lastName}
                </span>
                <span className="text-xs text-muted-foreground">
                  {u.role} · {dateShort(u.createdAt)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-2 font-medium">Recent notifications</p>
          <ul className="space-y-1">
            {a.recentNotifications.map((n) => (
              <li key={n.id} className="flex items-center justify-between gap-2">
                <span className="truncate">{n.title}</span>
                <span className="shrink-0 text-xs text-muted-foreground">{dateTime(n.createdAt)}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

function AuditLogsTable() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Audit Logs</CardTitle>
        <Button variant="outline" size="sm">
          <Link href="/super-admin/audit-logs">View all</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Who</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Module</TableHead>
              <TableHead className="text-right">When</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_AUDIT_LOGS.map((l) => (
              <TableRow key={l.id}>
                <TableCell>{l.actor}</TableCell>
                <TableCell>{l.action}</TableCell>
                <TableCell>{l.module}</TableCell>
                <TableCell className="text-right text-muted-foreground">{dateTime(l.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function SuperAdminDashboardHomePage() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">University-wide overview</p>
        </div>
        <QuickActions />
      </div>

      <KpiSection />

      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard title="Enrollment Trend" description="New enrollments, last 6 months" className="lg:col-span-2">
          <TrendLineChart data={MOCK_ENROLLMENT_TREND} xKey="month" yKey="enrollments" label="Enrollments" />
        </ChartCard>
        <ChartCard title="Payment Status" description="Invoices by status">
          <DonutChart data={MOCK_PAYMENT_STATUS} />
        </ChartCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Revenue vs Dues" description="Collected vs pending, last 6 months">
          <SeriesBarChart
            data={MOCK_REVENUE_VS_DUES}
            xKey="month"
            stacked
            series={[
              { key: "collected", label: "Collected" },
              { key: "dues", label: "Pending dues" },
            ]}
          />
        </ChartCard>
        <ChartCard title="Students by Department">
          <SeriesBarChart data={MOCK_STUDENTS_BY_DEPT} xKey="department" series={[{ key: "students", label: "Students" }]} />
        </ChartCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Attendance Rate" description="Weekly average, last 8 weeks">
          <RateAreaChart data={MOCK_ATTENDANCE} xKey="week" yKey="rate" label="Attendance %" />
        </ChartCard>
        <ChartCard title="Grade Distribution" description="Published results">
          <SeriesBarChart data={MOCK_GRADES} xKey="grade" series={[{ key: "count", label: "Students" }]} />
        </ChartCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <AcademicSnapshot />
        <FinanceSnapshot />
        <AlertsPanel />
      </div>

      <AuditLogsTable />
    </div>
  );
}