
"use client";

import React, { useMemo, useState } from "react";
import {
  MoreHorizontal,
  Eye,
  Search,
  CheckCircle2,
  XCircle,
  Clock3,
  AlertCircle,
  CreditCard,
  ArrowDownToLine,
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

type TransactionStatus =
  | "SUCCESS"
  | "PENDING"
  | "FAILED"
  | "CANCELLED";

type Gateway = "STRIPE" | "SSLCOMMERZ" | "BKASH";

type Transaction = {
  id: string;
  transactionId: string;
  paymentId: string;
  invoiceId: string;
  student: {
    name: string;
    studentId: string;
  };
  gateway: Gateway;
  amount: number;
  currency: string;
  status: TransactionStatus;
  createdAt: string;
};

const transactions: Transaction[] = [
  {
    id: "1",
    transactionId: "txn_8F3K92LQ",
    paymentId: "PAY-2026-00124",
    invoiceId: "INV-2026-00112",
    student: {
      name: "Arafat Hossain",
      studentId: "STU-2026-CSE-0001",
    },
    gateway: "STRIPE",
    amount: 12500,
    currency: "BDT",
    status: "SUCCESS",
    createdAt: "2026-10-06T10:32:00",
  },
  {
    id: "2",
    transactionId: "SSLC-7A92KLM3",
    paymentId: "PAY-2026-00123",
    invoiceId: "INV-2026-00110",
    student: {
      name: "Nusrat Jahan",
      studentId: "STU-2026-BBA-0008",
    },
    gateway: "SSLCOMMERZ",
    amount: 18500,
    currency: "BDT",
    status: "SUCCESS",
    createdAt: "2026-10-06T09:45:00",
  },
  {
    id: "3",
    transactionId: "BKASH-9XK28P",
    paymentId: "PAY-2026-00122",
    invoiceId: "INV-2026-00108",
    student: {
      name: "Tanvir Ahmed",
      studentId: "STU-2026-MAT-0012",
    },
    gateway: "BKASH",
    amount: 8500,
    currency: "BDT",
    status: "PENDING",
    createdAt: "2026-10-06T08:21:00",
  },
  {
    id: "4",
    transactionId: "txn_4JH72MNB",
    paymentId: "PAY-2026-00121",
    invoiceId: "INV-2026-00106",
    student: {
      name: "Sadia Akter",
      studentId: "STU-2026-CSE-0015",
    },
    gateway: "STRIPE",
    amount: 15000,
    currency: "BDT",
    status: "FAILED",
    createdAt: "2026-10-05T17:12:00",
  },
  {
    id: "5",
    transactionId: "SSLC-2QW89RT",
    paymentId: "PAY-2026-00120",
    invoiceId: "INV-2026-00103",
    student: {
      name: "Rakib Hasan",
      studentId: "STU-2026-EEE-0007",
    },
    gateway: "SSLCOMMERZ",
    amount: 22000,
    currency: "BDT",
    status: "SUCCESS",
    createdAt: "2026-10-05T15:40:00",
  },
  {
    id: "6",
    transactionId: "BKASH-5PL72X",
    paymentId: "PAY-2026-00119",
    invoiceId: "INV-2026-00101",
    student: {
      name: "Mim Sultana",
      studentId: "STU-2026-BBA-0011",
    },
    gateway: "BKASH",
    amount: 9500,
    currency: "BDT",
    status: "CANCELLED",
    createdAt: "2026-10-05T13:25:00",
  },
];

const statusConfig: Record<
  TransactionStatus,
  {
    label: string;
    className: string;
    icon: React.ElementType;
  }
> = {
  SUCCESS: {
    label: "Success",
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

  CANCELLED: {
    label: "Cancelled",
    className:
      "bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400",
    icon: AlertCircle,
  },
};

const gatewayConfig: Record<
  Gateway,
  {
    label: string;
    className: string;
  }
> = {
  STRIPE: {
    label: "Stripe",
    className:
      "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400",
  },

  SSLCOMMERZ: {
    label: "SSLCommerz",
    className:
      "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  },

  BKASH: {
    label: "bKash",
    className:
      "bg-pink-50 text-pink-700 dark:bg-pink-500/10 dark:text-pink-400",
  },
};

export default function Transactions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [gateway, setGateway] = useState("ALL");
  const [status, setStatus] = useState("ALL");

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        !search ||
        transaction.transactionId.toLowerCase().includes(search) ||
        transaction.paymentId.toLowerCase().includes(search) ||
        transaction.invoiceId.toLowerCase().includes(search) ||
        transaction.student.name.toLowerCase().includes(search) ||
        transaction.student.studentId.toLowerCase().includes(search);

      const matchesGateway =
        gateway === "ALL" || transaction.gateway === gateway;

      const matchesStatus =
        status === "ALL" || transaction.status === status;

      return matchesSearch && matchesGateway && matchesStatus;
    });
  }, [searchTerm, gateway, status]);

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("en-BD", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date));
  };

  const successCount = transactions.filter(
    (transaction) => transaction.status === "SUCCESS"
  ).length;

  const pendingCount = transactions.filter(
    (transaction) => transaction.status === "PENDING"
  ).length;

  const failedCount = transactions.filter(
    (transaction) => transaction.status === "FAILED"
  ).length;

  const totalAmount = transactions
    .filter((transaction) => transaction.status === "SUCCESS")
    .reduce((total, transaction) => total + transaction.amount, 0);

  return (
    <div className="space-y-6 p-3">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Transactions
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Gateway-level transaction records for financial
            reconciliation and debugging.
          </p>
        </div>

        <Button variant="outline" className="gap-2">
          <ArrowDownToLine className="h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Successful Amount */}
        <div className="rounded-xl border bg-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Successful Amount
              </p>

              <h2 className="mt-1 text-2xl font-semibold">
                ৳{totalAmount.toLocaleString("en-BD")}
              </h2>
            </div>

            <div className="rounded-lg bg-emerald-50 p-2.5 dark:bg-emerald-500/10">
              <CreditCard className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Successful */}
        <div className="rounded-xl border bg-card p-4">
          <p className="text-sm text-muted-foreground">
            Successful
          </p>

          <h2 className="mt-1 text-2xl font-semibold">
            {successCount}
          </h2>
        </div>

        {/* Pending */}
        <div className="rounded-xl border bg-card p-4">
          <p className="text-sm text-muted-foreground">
            Pending
          </p>

          <h2 className="mt-1 text-2xl font-semibold">
            {pendingCount}
          </h2>
        </div>

        {/* Failed */}
        <div className="rounded-xl border bg-card p-4">
          <p className="text-sm text-muted-foreground">
            Failed
          </p>

          <h2 className="mt-1 text-2xl font-semibold">
            {failedCount}
          </h2>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-xl border bg-card p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          {/* Search */}
          <div className="relative min-w-0 flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Search transaction, payment, invoice or student..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              className="pl-9"
            />
          </div>

          {/* Gateway */}
          <Select
            value={gateway}
            onValueChange={(value) =>
              setGateway(value ?? "ALL")
            }
          >
            <SelectTrigger className="w-full lg:w-[180px]">
              <SelectValue placeholder="Gateway" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="ALL">
                All Gateways
              </SelectItem>

              <SelectItem value="STRIPE">
                Stripe
              </SelectItem>

              <SelectItem value="SSLCOMMERZ">
                SSLCommerz
              </SelectItem>

              <SelectItem value="BKASH">
                bKash
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Status */}
          <Select
            value={status}
            onValueChange={(value) =>
              setStatus(value ?? "ALL")
            }
          >
            <SelectTrigger className="w-full lg:w-[170px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="ALL">
                All Statuses
              </SelectItem>

              <SelectItem value="SUCCESS">
                Success
              </SelectItem>

              <SelectItem value="PENDING">
                Pending
              </SelectItem>

              <SelectItem value="FAILED">
                Failed
              </SelectItem>

              <SelectItem value="CANCELLED">
                Cancelled
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="rounded-xl border bg-card">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Gateway</TableHead>
                <TableHead>Payment / Invoice</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-[90px] text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => {
                  const statusInfo =
                    statusConfig[transaction.status];

                  const StatusIcon = statusInfo.icon;

                  const gatewayInfo =
                    gatewayConfig[transaction.gateway];

                  return (
                    <TableRow key={transaction.id}>
                      {/* Transaction */}
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {transaction.transactionId}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            Gateway transaction
                          </p>
                        </div>
                      </TableCell>

                      {/* Student */}
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {transaction.student.name}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {transaction.student.studentId}
                          </p>
                        </div>
                      </TableCell>

                      {/* Gateway */}
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${gatewayInfo.className}`}
                        >
                          {gatewayInfo.label}
                        </span>
                      </TableCell>

                      {/* Payment / Invoice */}
                      <TableCell>
                        <div className="space-y-0.5">
                          <p className="text-sm font-medium">
                            {transaction.paymentId}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {transaction.invoiceId}
                          </p>
                        </div>
                      </TableCell>

                      {/* Amount */}
                      <TableCell>
                        <span className="font-semibold">
                          {formatAmount(
                            transaction.amount,
                            transaction.currency
                          )}
                        </span>
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${statusInfo.className}`}
                        >
                          <StatusIcon className="h-3.5 w-3.5" />
                          {statusInfo.label}
                        </span>
                      </TableCell>

                      {/* Date */}
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(transaction.createdAt)}
                        </span>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="text-right">
                        <div className="flex justify-end">
                          <Button
                            variant="ghost"
                            size="icon"
                            title="View transaction"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            title="More actions"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="h-32 text-center"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <CreditCard className="mb-2 h-8 w-8 text-muted-foreground" />

                      <p className="font-medium">
                        No transactions found
                      </p>

                      <p className="text-sm text-muted-foreground">
                        Try changing your search or filters.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t px-4 py-3">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground">
              {filteredTransactions.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-foreground">
              {transactions.length}
            </span>{" "}
            transactions
          </p>
        </div>
      </div>
    </div>
  );
}