
"use client";

import React, { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Banknote,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  Download,
  FileText,
  MoreHorizontal,
  Search,
  TrendingUp,
  Wallet,
  XCircle,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type PaymentStatus = "PAID" | "PENDING" | "FAILED" | "REFUNDED";

type Transaction = {
  id: string;
  transactionId: string;
  student: string;
  studentId: string;
  invoice: string;
  feeType: string;
  amount: number;
  gateway: string;
  status: PaymentStatus;
  date: string;
};

const transactions: Transaction[] = [
  {
    id: "1",
    transactionId: "TXN-2026-1001",
    student: "Abdullah Al Mamun",
    studentId: "STU-2026-CSE-0001",
    invoice: "INV-2026-0001",
    feeType: "Tuition Fee",
    amount: 45000,
    gateway: "Stripe",
    status: "PAID",
    date: "2026-10-06",
  },
  {
    id: "2",
    transactionId: "TXN-2026-1002",
    student: "Nusrat Jahan",
    studentId: "STU-2026-BBA-0007",
    invoice: "INV-2026-0002",
    feeType: "Semester Fee",
    amount: 32000,
    gateway: "SSLCommerz",
    status: "PAID",
    date: "2026-10-05",
  },
  {
    id: "3",
    transactionId: "TXN-2026-1003",
    student: "Sakib Hasan",
    studentId: "STU-2026-CSE-0012",
    invoice: "INV-2026-0003",
    feeType: "Tuition Fee",
    amount: 28000,
    gateway: "bKash",
    status: "PENDING",
    date: "2026-10-05",
  },
  {
    id: "4",
    transactionId: "TXN-2026-1004",
    student: "Jannatul Ferdous",
    studentId: "STU-2026-EEE-0004",
    invoice: "INV-2026-0004",
    feeType: "Admission Fee",
    amount: 25000,
    gateway: "Stripe",
    status: "PAID",
    date: "2026-10-04",
  },
  {
    id: "5",
    transactionId: "TXN-2026-1005",
    student: "Tanvir Ahmed",
    studentId: "STU-2026-MAT-0008",
    invoice: "INV-2026-0005",
    feeType: "Tuition Fee",
    amount: 18000,
    gateway: "SSLCommerz",
    status: "FAILED",
    date: "2026-10-04",
  },
  {
    id: "6",
    transactionId: "TXN-2026-1006",
    student: "Mehedi Hasan",
    studentId: "STU-2026-CSE-0019",
    invoice: "INV-2026-0006",
    feeType: "Library Fee",
    amount: 5000,
    gateway: "bKash",
    status: "PAID",
    date: "2026-10-03",
  },
  {
    id: "7",
    transactionId: "TXN-2026-1007",
    student: "Sumaiya Akter",
    studentId: "STU-2026-BBA-0015",
    invoice: "INV-2026-0007",
    feeType: "Tuition Fee",
    amount: 35000,
    gateway: "Stripe",
    status: "REFUNDED",
    date: "2026-10-02",
  },
];

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(amount);

const statusConfig: Record<
  PaymentStatus,
  {
    label: string;
    className: string;
    icon: React.ElementType;
  }
> = {
  PAID: {
    label: "Paid",
    className:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
    icon: CheckCircle2,
  },
  PENDING: {
    label: "Pending",
    className:
      "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
    icon: Clock3,
  },
  FAILED: {
    label: "Failed",
    className:
      "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",
    icon: XCircle,
  },
  REFUNDED: {
    label: "Refunded",
    className:
      "bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400",
    icon: ArrowDownRight,
  },
};

export default function FinancialReports() {
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState<"ALL" | PaymentStatus>("ALL");
  const [feeType, setFeeType] = useState("ALL");
  const [period, setPeriod] = useState("THIS_MONTH");

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch =
        transaction.student
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        transaction.studentId
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        transaction.transactionId
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        transaction.invoice
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesStatus =
        status === "ALL" || transaction.status === status;

      const matchesFeeType =
        feeType === "ALL" || transaction.feeType === feeType;

      return matchesSearch && matchesStatus && matchesFeeType;
    });
  }, [searchTerm, status, feeType]);

  const paidRevenue = transactions
    .filter((item) => item.status === "PAID")
    .reduce((sum, item) => sum + item.amount, 0);

  const pendingAmount = transactions
    .filter((item) => item.status === "PENDING")
    .reduce((sum, item) => sum + item.amount, 0);

  const refundedAmount = transactions
    .filter((item) => item.status === "REFUNDED")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalTransactions = transactions.length;

  const totalOutstanding = 125000;

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Wallet className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight">
              Financial Reports
            </h1>
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            Monitor revenue, outstanding fees, payments, and transaction
            performance.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>

          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Period */}
      <div className="flex flex-col gap-3 rounded-xl border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm font-medium">
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
          Reporting Period
        </div>

        <select
          value={period}
          onChange={(event) => setPeriod(event.target.value)}
          className="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="TODAY">Today</option>
          <option value="THIS_WEEK">This Week</option>
          <option value="THIS_MONTH">This Month</option>
          <option value="THIS_YEAR">This Year</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <ReportCard
          title="Total Revenue"
          value={formatCurrency(paidRevenue)}
          description="Successfully collected"
          icon={Banknote}
          trend="+12.5%"
          trendUp
        />

        <ReportCard
          title="Outstanding Fees"
          value={formatCurrency(totalOutstanding)}
          description="Amount yet to be collected"
          icon={Clock3}
          trend="-8.2%"
          trendUp
        />

        <ReportCard
          title="Pending Payments"
          value={formatCurrency(pendingAmount)}
          description="Awaiting confirmation"
          icon={CreditCard}
          trend="+4.3%"
          trendUp={false}
        />

        <ReportCard
          title="Transactions"
          value={totalTransactions.toString()}
          description="All payment attempts"
          icon={TrendingUp}
          trend="+18.7%"
          trendUp
        />
      </div>

      {/* Financial Overview */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Revenue Overview */}
        <div className="rounded-xl border bg-card p-5 shadow-sm lg:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-semibold">Revenue Overview</h2>
              <p className="text-sm text-muted-foreground">
                Current financial collection summary
              </p>
            </div>

            <TrendingUp className="h-5 w-5 text-primary" />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <FinancialMetric
              label="Collected"
              value={formatCurrency(paidRevenue)}
              percentage="72%"
              icon={CheckCircle2}
            />

            <FinancialMetric
              label="Outstanding"
              value={formatCurrency(totalOutstanding)}
              percentage="21%"
              icon={Clock3}
            />

            <FinancialMetric
              label="Refunded"
              value={formatCurrency(refundedAmount)}
              percentage="7%"
              icon={ArrowDownRight}
            />
          </div>

          {/* Progress */}
          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Collection progress
              </span>
              <span className="font-medium">72%</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[72%] rounded-full bg-primary" />
            </div>
          </div>
        </div>

        {/* Payment Status */}
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="mb-5">
            <h2 className="font-semibold">Payment Status</h2>
            <p className="text-sm text-muted-foreground">
              Transaction distribution
            </p>
          </div>

          <div className="space-y-4">
            <StatusSummary
              label="Paid"
              count={transactions.filter((t) => t.status === "PAID").length}
              amount={paidRevenue}
              status="PAID"
            />

            <StatusSummary
              label="Pending"
              count={
                transactions.filter((t) => t.status === "PENDING").length
              }
              amount={pendingAmount}
              status="PENDING"
            />

            <StatusSummary
              label="Failed"
              count={
                transactions.filter((t) => t.status === "FAILED").length
              }
              amount={transactions
                .filter((t) => t.status === "FAILED")
                .reduce((sum, t) => sum + t.amount, 0)}
              status="FAILED"
            />

            <StatusSummary
              label="Refunded"
              count={
                transactions.filter((t) => t.status === "REFUNDED").length
              }
              amount={refundedAmount}
              status="REFUNDED"
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-xl border bg-card p-4 shadow-sm">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
          <div className="relative min-w-0 flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search student, student ID, invoice or transaction..."
              className="pl-9"
            />
          </div>

          <select
            value={feeType}
            onChange={(event) => setFeeType(event.target.value)}
            className="h-10 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="ALL">All Fee Types</option>
            <option value="Tuition Fee">Tuition Fee</option>
            <option value="Semester Fee">Semester Fee</option>
            <option value="Admission Fee">Admission Fee</option>
            <option value="Library Fee">Library Fee</option>
          </select>

          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as "ALL" | PaymentStatus)
            }
            className="h-10 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="ALL">All Status</option>
            <option value="PAID">Paid</option>
            <option value="PENDING">Pending</option>
            <option value="FAILED">Failed</option>
            <option value="REFUNDED">Refunded</option>
          </select>
        </div>
      </div>

      {/* Transactions */}
      <div className="rounded-xl border bg-card shadow-sm">
        <div className="flex flex-col gap-2 border-b p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold">Transaction Summary</h2>
            <p className="text-sm text-muted-foreground">
              Recent financial transactions and payment attempts.
            </p>
          </div>

          <span className="text-sm text-muted-foreground">
            {filteredTransactions.length} transaction
            {filteredTransactions.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Invoice</TableHead>
                <TableHead>Fee Type</TableHead>
                <TableHead>Gateway</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => {
                  const config = statusConfig[transaction.status];
                  const StatusIcon = config.icon;

                  return (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        <div className="font-medium">
                          {transaction.transactionId}
                        </div>
                      </TableCell>

                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {transaction.student}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {transaction.studentId}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell>
                        <span className="font-medium">
                          {transaction.invoice}
                        </span>
                      </TableCell>

                      <TableCell>{transaction.feeType}</TableCell>

                      <TableCell>
                        <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium">
                          {transaction.gateway}
                        </span>
                      </TableCell>

                      <TableCell className="font-semibold">
                        {formatCurrency(transaction.amount)}
                      </TableCell>

                      <TableCell>
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${config.className}`}
                        >
                          <StatusIcon className="h-3.5 w-3.5" />
                          {config.label}
                        </span>
                      </TableCell>

                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(transaction.date).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </TableCell>

                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Actions for ${transaction.transactionId}`}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="h-32 text-center text-muted-foreground"
                  >
                    No financial transactions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

function ReportCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendUp,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ElementType;
  trend: string;
  trendUp: boolean;
}) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
          <Icon className="h-5 w-5" />
        </div>

        <div
          className={`flex items-center gap-1 text-xs font-medium ${
            trendUp ? "text-emerald-600" : "text-red-600"
          }`}
        >
          {trendUp ? (
            <ArrowUpRight className="h-3.5 w-3.5" />
          ) : (
            <ArrowDownRight className="h-3.5 w-3.5" />
          )}
          {trend}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm text-muted-foreground">{title}</p>
        <h3 className="mt-1 text-2xl font-bold tracking-tight">{value}</h3>
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function FinancialMetric({
  label,
  value,
  percentage,
  icon: Icon,
}: {
  label: string;
  value: string;
  percentage: string;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-lg border bg-background p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>

      <p className="mt-2 text-lg font-bold">{value}</p>

      <p className="mt-1 text-xs text-muted-foreground">
        {percentage} of total
      </p>
    </div>
  );
}

function StatusSummary({
  label,
  count,
  amount,
  status,
}: {
  label: string;
  count: number;
  amount: number;
  status: PaymentStatus;
}) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className={`rounded-full p-2 ${config.className}`}>
          <Icon className="h-4 w-4" />
        </div>

        <div>
          <p className="text-sm font-medium">{label}</p>
          <p className="text-xs text-muted-foreground">
            {count} transaction{count !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <p className="text-sm font-semibold">{formatCurrency(amount)}</p>
    </div>
  );
}

