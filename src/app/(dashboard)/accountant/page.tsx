// import React from 'react'

// export default function AccountantDashboard() {
//   return (
//     <div>AccountantDashboard</div>
//   )
// }



"use client";

import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  Download,
  FileText,
  Plus,
  Receipt,
  RefreshCw,
  TrendingUp,
  Wallet,
  AlertTriangle,
  Users,
  CircleDollarSign,
  MoreHorizontal,
  Search,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const revenueData = [
  { month: "May", revenue: 320000, expenses: 120000 },
  { month: "Jun", revenue: 410000, expenses: 150000 },
  { month: "Jul", revenue: 360000, expenses: 130000 },
  { month: "Aug", revenue: 520000, expenses: 180000 },
  { month: "Sep", revenue: 460000, expenses: 160000 },
  { month: "Oct", revenue: 610000, expenses: 190000 },
];

const payments = [
  {
    id: "PAY-2026-1042",
    student: "Ayan Sujon",
    studentId: "STU-2026-0012",
    invoice: "INV-2026-0081",
    amount: 25000,
    method: "SSLCommerz",
    date: "Oct 09, 2026",
    status: "VERIFIED",
    initials: "AS",
  },
  {
    id: "PAY-2026-1041",
    student: "Nusrat Jahan",
    studentId: "STU-2025-0048",
    invoice: "INV-2026-0080",
    amount: 12500,
    method: "bKash",
    date: "Oct 09, 2026",
    status: "PENDING",
    initials: "NJ",
  },
  {
    id: "PAY-2026-1040",
    student: "Rahim Ahmed",
    studentId: "STU-2024-0091",
    invoice: "INV-2026-0079",
    amount: 18000,
    method: "Bank Transfer",
    date: "Oct 08, 2026",
    status: "VERIFIED",
    initials: "RA",
  },
  {
    id: "PAY-2026-1039",
    student: "Maliha Islam",
    studentId: "STU-2026-0035",
    invoice: "INV-2026-0078",
    amount: 8000,
    method: "Card",
    date: "Oct 08, 2026",
    status: "FAILED",
    initials: "MI",
  },
];

const invoices = [
  {
    id: "INV-2026-0085",
    student: "Tanvir Hasan",
    studentId: "STU-2025-0021",
    description: "Semester Tuition Fee",
    amount: 35000,
    dueDate: "Oct 10, 2026",
    status: "OVERDUE",
  },
  {
    id: "INV-2026-0084",
    student: "Ayan Sujon",
    studentId: "STU-2026-0012",
    description: "Laboratory Fee",
    amount: 5000,
    dueDate: "Oct 12, 2026",
    status: "ISSUED",
  },
  {
    id: "INV-2026-0083",
    student: "Nusrat Jahan",
    studentId: "STU-2025-0048",
    description: "Examination Fee",
    amount: 3500,
    dueDate: "Oct 15, 2026",
    status: "ISSUED",
  },
];

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(amount);

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    VERIFIED:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400",
    PAID:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400",
    PENDING:
      "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400",
    ISSUED:
      "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400",
    OVERDUE:
      "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400",
    FAILED:
      "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${styles[status] ??
        "bg-muted text-muted-foreground"
        }`}
    >
      {status.replace("_", " ")}
    </span>
  );
}

function SectionHeading({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 className="text-base font-semibold tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

function Panel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-xl border border-border bg-card p-5 shadow-sm ${className}`}
    >
      {children}
    </section>
  );
}

export default function AccountantDashboard() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-[1600px] space-y-7 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Finance Dashboard
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Monitor collections, payments, invoices and outstanding fees.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm font-medium transition hover:bg-muted"
            >
              <CalendarDays size={16} />
              October 2026
            </button>

            <Link
              href="/accountant/reports/financial"
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm font-medium transition hover:bg-muted"
            >
              <Download size={16} />
              Reports
            </Link>

            <Link
              href="/accountant/invoices/new"
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              <Plus size={17} />
              Create Invoice
            </Link>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400">
                <Wallet size={21} />
              </div>
              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                <ArrowUpRight size={14} />
                12.8%
              </span>
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              Total Collections
            </p>
            <p className="mt-1 text-2xl font-bold tracking-tight">
              ৳18,45,000
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Compared with previous month
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex size-11 items-center justify-center rounded-xl bg-violet-50 text-violet-700 dark:bg-violet-950/60 dark:text-violet-400">
                <CircleDollarSign size={21} />
              </div>
              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                <ArrowUpRight size={14} />
                8.2%
              </span>
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              Collected Today
            </p>
            <p className="mt-1 text-2xl font-bold tracking-tight">
              ৳68,500
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Verified payments only
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex size-11 items-center justify-center rounded-xl bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400">
                <Receipt size={21} />
              </div>
              <span className="flex items-center gap-1 text-xs font-semibold text-red-600">
                <ArrowUpRight size={14} />
                4.5%
              </span>
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              Outstanding Fees
            </p>
            <p className="mt-1 text-2xl font-bold tracking-tight">
              ৳4,85,000
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Across unpaid invoices
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex size-11 items-center justify-center rounded-xl bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400">
                <Clock3 size={21} />
              </div>
              <span className="rounded-full bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
                Needs review
              </span>
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              Pending Payments
            </p>
            <p className="mt-1 text-2xl font-bold tracking-tight">
              12
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Awaiting confirmation
            </p>
          </div>
        </div>

        {/* Chart + Payment Breakdown */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <Panel className="xl:col-span-2">
            <SectionHeading
              title="Revenue Overview"
              description="Monthly collection and expenses"
              action={
                <Link
                  href="/accountant/reports/revenue"
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  Full report <ArrowRight size={15} />
                </Link>
              }
            />

            <div className="mb-5 flex flex-wrap gap-6">
              <div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="size-2.5 rounded-full bg-blue-600" />
                  Revenue
                </div>
                <p className="mt-1 text-lg font-bold">৳6,10,000</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="size-2.5 rounded-full bg-amber-500" />
                  Expenses
                </div>
                <p className="mt-1 text-lg font-bold">৳1,90,000</p>
              </div>
            </div>

            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={revenueData}
                  margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563eb" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="expenseFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.16} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    stroke="currentColor"
                    strokeOpacity={0.1}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "currentColor", fontSize: 12, opacity: 0.65 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "currentColor", fontSize: 11, opacity: 0.65 }}
                    tickFormatter={(value) => `${value / 1000}k`}
                    width={42}
                  />
                  <Tooltip
                    formatter={(value, name) => [
                      formatCurrency(Number(value)),
                      name === "revenue" ? "Revenue" : "Expenses",
                    ]}
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid var(--border)",
                      background: "var(--card)",
                      color: "var(--card-foreground)",
                      fontSize: 12,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#2563eb"
                    strokeWidth={2.5}
                    fill="url(#revenueFill)"
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    fill="url(#expenseFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <Panel>
            <SectionHeading
              title="Payment Breakdown"
              description="Current payment statuses"
            />

            <div className="space-y-5">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    Verified
                  </span>
                  <span className="font-semibold">76%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[76%] rounded-full bg-emerald-500" />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Clock3 size={16} className="text-amber-600" />
                    Pending
                  </span>
                  <span className="font-semibold">16%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[16%] rounded-full bg-amber-500" />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <AlertTriangle size={16} className="text-red-600" />
                    Failed
                  </span>
                  <span className="font-semibold">8%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[8%] rounded-full bg-red-500" />
                </div>
              </div>
            </div>

            <div className="mt-7 rounded-xl border border-border bg-muted/40 p-4">
              <p className="text-sm font-medium">Total payment records</p>
              <p className="mt-1 text-2xl font-bold">1,284</p>
              <p className="mt-1 text-xs text-muted-foreground">
                All recorded payment attempts
              </p>
            </div>

            <Link
              href="/accountant/payments"
              className="mt-5 flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-border text-sm font-medium transition hover:bg-muted"
            >
              View all payments <ArrowRight size={15} />
            </Link>
          </Panel>
        </div>

        {/* Recent Payments */}
        <Panel className="overflow-hidden">
          <SectionHeading
            title="Recent Payments"
            description="Latest student payment activity"
            action={
              <Link
                href="/accountant/payments"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                View all <ArrowRight size={15} />
              </Link>
            }
          />

          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex h-10 min-w-[220px] flex-1 items-center gap-2 rounded-lg border border-border px-3 sm:max-w-sm">
              <Search size={16} className="text-muted-foreground" />
              <input
                type="search"
                placeholder="Search payments..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                aria-label="Search payments"
              />
            </div>
            <Link
              href="/accountant/transactions"
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-3 text-sm font-medium hover:bg-muted"
            >
              <RefreshCw size={15} />
              Transactions
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead>
                <tr className="border-y border-border bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Student</th>
                  <th className="px-4 py-3 font-medium">Payment / Invoice</th>
                  <th className="px-4 py-3 font-medium">Method</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Amount</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 text-right font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="border-b border-border last:border-0 transition hover:bg-muted/30"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                          {payment.initials}
                        </div>
                        <div>
                          <p className="font-semibold">{payment.student}</p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {payment.studentId}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-medium">{payment.id}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {payment.invoice}
                      </p>
                    </td>
                    <td className="px-4 py-4 text-muted-foreground">
                      {payment.method}
                    </td>
                    <td className="px-4 py-4 text-muted-foreground">
                      {payment.date}
                    </td>
                    <td className="px-4 py-4 font-semibold">
                      {formatCurrency(payment.amount)}
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={payment.status} />
                    </td>
                    <td className="px-4 py-4 text-right">
                      <Link
                        href={`/accountant/payments/${payment.id}`}
                        aria-label={`View ${payment.id}`}
                        className="inline-flex size-9 items-center justify-center rounded-lg border border-border hover:bg-muted"
                      >
                        <ArrowRight size={16} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        {/* Outstanding Invoices + Quick Actions */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <Panel className="xl:col-span-2 overflow-hidden">
            <SectionHeading
              title="Outstanding Invoices"
              description="Invoices that require attention"
              action={
                <Link
                  href="/accountant/outstanding-fees"
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  View all <ArrowRight size={15} />
                </Link>
              }
            />

            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] text-left text-sm">
                <thead>
                  <tr className="border-y border-border bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="px-3 py-3 font-medium">Invoice</th>
                    <th className="px-3 py-3 font-medium">Student</th>
                    <th className="px-3 py-3 font-medium">Due date</th>
                    <th className="px-3 py-3 font-medium">Amount</th>
                    <th className="px-3 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr
                      key={invoice.id}
                      className="border-b border-border last:border-0 hover:bg-muted/30"
                    >
                      <td className="px-3 py-4">
                        <Link
                          href={`/accountant/invoices/${invoice.id}`}
                          className="font-semibold text-primary hover:underline"
                        >
                          {invoice.id}
                        </Link>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {invoice.description}
                        </p>
                      </td>
                      <td className="px-3 py-4">
                        <p className="font-medium">{invoice.student}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {invoice.studentId}
                        </p>
                      </td>
                      <td className="px-3 py-4 text-muted-foreground">
                        {invoice.dueDate}
                      </td>
                      <td className="px-3 py-4 font-semibold">
                        {formatCurrency(invoice.amount)}
                      </td>
                      <td className="px-3 py-4">
                        <StatusBadge status={invoice.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>

          <div className="space-y-6">
            <Panel>
              <SectionHeading
                title="Quick Actions"
                description="Common finance operations"
              />

              <div className="space-y-2">
                <Link
                  href="/accountant/invoices/new"
                  className="flex items-center gap-3 rounded-lg border border-border p-3 transition hover:bg-muted"
                >
                  <span className="flex size-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400">
                    <Plus size={19} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold">
                      Create Invoice
                    </span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      Bill a student
                    </span>
                  </span>
                  <ArrowRight size={16} className="text-muted-foreground" />
                </Link>

                <Link
                  href="/accountant/students"
                  className="flex items-center gap-3 rounded-lg border border-border p-3 transition hover:bg-muted"
                >
                  <span className="flex size-10 items-center justify-center rounded-lg bg-violet-50 text-violet-700 dark:bg-violet-950/60 dark:text-violet-400">
                    <Users size={19} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold">
                      Find a Student
                    </span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      View financial records
                    </span>
                  </span>
                  <ArrowRight size={16} className="text-muted-foreground" />
                </Link>

                <Link
                  href="/accountant/outstanding-fees"
                  className="flex items-center gap-3 rounded-lg border border-border p-3 transition hover:bg-muted"
                >
                  <span className="flex size-10 items-center justify-center rounded-lg bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400">
                    <AlertTriangle size={19} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold">
                      Outstanding Fees
                    </span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      Review unpaid invoices
                    </span>
                  </span>
                  <ArrowRight size={16} className="text-muted-foreground" />
                </Link>

                <Link
                  href="/accountant/receipts"
                  className="flex items-center gap-3 rounded-lg border border-border p-3 transition hover:bg-muted"
                >
                  <span className="flex size-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                    <FileText size={19} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold">
                      Receipts
                    </span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      Find payment receipts
                    </span>
                  </span>
                  <ArrowRight size={16} className="text-muted-foreground" />
                </Link>
              </div>
            </Panel>

            <Panel>
              <SectionHeading
                title="Finance Alerts"
                description="Items that need attention"
              />

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400">
                    <AlertTriangle size={17} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">
                      Overdue invoices
                    </p>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      8 invoices are past their due date.
                    </p>
                    <Link
                      href="/accountant/outstanding-fees"
                      className="mt-2 inline-block text-xs font-semibold text-primary hover:underline"
                    >
                      Review invoices
                    </Link>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
                    <Clock3 size={17} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">
                      Pending payments
                    </p>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      12 payments need status confirmation.
                    </p>
                    <Link
                      href="/accountant/payments"
                      className="mt-2 inline-block text-xs font-semibold text-primary hover:underline"
                    >
                      Review payments
                    </Link>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
                    <Bell size={17} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">
                      Finance notifications
                    </p>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      Check recent payment and system alerts.
                    </p>
                    <Link
                      href="/accountant/notifications"
                      className="mt-2 inline-block text-xs font-semibold text-primary hover:underline"
                    >
                      View notifications
                    </Link>
                  </div>
                </div>
              </div>
            </Panel>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-2 border-t border-border pt-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>CampusFlow Finance Management</p>
          <p>Financial figures shown here are illustrative demo data.</p>
        </div>
      </div>
    </main>
  );
}