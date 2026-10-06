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
  CircleDollarSign,
  Receipt,
  RotateCcw,
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

type PaymentStatus =
  | "SUCCESS"
  | "PENDING"
  | "FAILED"
  | "REFUNDED"
  | "CANCELLED";

type Payment = {
  id: string;
  transactionId: string;
  student: {
    name: string;
    studentId: string;
    email: string;
  };
  invoice: string;
  amount: number;
  gateway: "STRIPE" | "SSLCOMMERZ" | "BKASH";
  status: PaymentStatus;
  paidAt: string | null;
};

const paymentsData: Payment[] = [
  {
    id: "PAY-1001",
    transactionId: "TXN-8F72A91",
    student: {
      name: "Arafat Rahman",
      studentId: "STU-2026-CSE-0001",
      email: "arafat@example.com",
    },
    invoice: "INV-2026-001",
    amount: 25000,
    gateway: "STRIPE",
    status: "SUCCESS",
    paidAt: "2026-10-05 11:42 AM",
  },
  {
    id: "PAY-1002",
    transactionId: "TXN-4B92C17",
    student: {
      name: "Nusrat Jahan",
      studentId: "STU-2026-BBA-0008",
      email: "nusrat@example.com",
    },
    invoice: "INV-2026-002",
    amount: 18000,
    gateway: "SSLCOMMERZ",
    status: "SUCCESS",
    paidAt: "2026-10-05 09:25 AM",
  },
  {
    id: "PAY-1003",
    transactionId: "TXN-7D31F20",
    student: {
      name: "Sakib Hasan",
      studentId: "STU-2026-CSE-0012",
      email: "sakib@example.com",
    },
    invoice: "INV-2026-003",
    amount: 12000,
    gateway: "BKASH",
    status: "PENDING",
    paidAt: null,
  },
  {
    id: "PAY-1004",
    transactionId: "TXN-2A18E55",
    student: {
      name: "Mim Akter",
      studentId: "STU-2026-EEE-0005",
      email: "mim@example.com",
    },
    invoice: "INV-2026-004",
    amount: 22000,
    gateway: "STRIPE",
    status: "FAILED",
    paidAt: null,
  },
  {
    id: "PAY-1005",
    transactionId: "TXN-9C42B88",
    student: {
      name: "Tanvir Ahmed",
      studentId: "STU-2026-CSE-0019",
      email: "tanvir@example.com",
    },
    invoice: "INV-2026-005",
    amount: 15000,
    gateway: "SSLCOMMERZ",
    status: "REFUNDED",
    paidAt: "2026-10-02 03:18 PM",
  },
];

const statusConfig: Record<
  PaymentStatus,
  {
    label: string;
    icon: React.ElementType;
    className: string;
  }
> = {
  SUCCESS: {
    label: "Success",
    icon: CheckCircle2,
    className:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  },
  PENDING: {
    label: "Pending",
    icon: Clock3,
    className:
      "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  },
  FAILED: {
    label: "Failed",
    icon: XCircle,
    className:
      "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400",
  },
  REFUNDED: {
    label: "Refunded",
    icon: RotateCcw,
    className:
      "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
  },
  CANCELLED: {
    label: "Cancelled",
    icon: AlertCircle,
    className:
      "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  },
};

const gatewayConfig = {
  STRIPE: "Stripe",
  SSLCOMMERZ: "SSLCommerz",
  BKASH: "bKash",
};

export default function Payments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState<PaymentStatus | "ALL">("ALL");
  const [gateway, setGateway] = useState<
    "ALL" | "STRIPE" | "SSLCOMMERZ" | "BKASH"
  >("ALL");

  const filteredPayments = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return paymentsData.filter((payment) => {
      const matchesSearch =
        !search ||
        payment.id.toLowerCase().includes(search) ||
        payment.transactionId.toLowerCase().includes(search) ||
        payment.student.name.toLowerCase().includes(search) ||
        payment.student.studentId.toLowerCase().includes(search) ||
        payment.invoice.toLowerCase().includes(search);

      const matchesStatus =
        status === "ALL" || payment.status === status;

      const matchesGateway =
        gateway === "ALL" || payment.gateway === gateway;

      return matchesSearch && matchesStatus && matchesGateway;
    });
  }, [searchTerm, status, gateway]);

  const summary = useMemo(() => {
    const successful = paymentsData.filter(
      (payment) => payment.status === "SUCCESS"
    );

    const pending = paymentsData.filter(
      (payment) => payment.status === "PENDING"
    );

    const failed = paymentsData.filter(
      (payment) => payment.status === "FAILED"
    );

    const totalCollected = successful.reduce(
      (total, payment) => total + payment.amount,
      0
    );

    return {
      totalCollected,
      successful: successful.length,
      pending: pending.length,
      failed: failed.length,
    };
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <CreditCard className="size-5" />
          </div>

          <div>
            <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
              Payments
            </h1>

            <p className="text-sm text-muted-foreground">
              Track student payments, transactions, gateways, and payment
              status.
            </p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border bg-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Total Collected
              </p>

              <h3 className="mt-1 text-2xl font-semibold">
                {formatCurrency(summary.totalCollected)}
              </h3>
            </div>

            <div className="rounded-lg bg-emerald-50 p-2.5 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
              <CircleDollarSign className="size-5" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Successful
              </p>

              <h3 className="mt-1 text-2xl font-semibold">
                {summary.successful}
              </h3>
            </div>

            <div className="rounded-lg bg-emerald-50 p-2.5 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
              <CheckCircle2 className="size-5" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Pending
              </p>

              <h3 className="mt-1 text-2xl font-semibold">
                {summary.pending}
              </h3>
            </div>

            <div className="rounded-lg bg-amber-50 p-2.5 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
              <Clock3 className="size-5" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Failed
              </p>

              <h3 className="mt-1 text-2xl font-semibold">
                {summary.failed}
              </h3>
            </div>

            <div className="rounded-lg bg-red-50 p-2.5 text-red-600 dark:bg-red-950/40 dark:text-red-400">
              <XCircle className="size-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-xl border bg-card p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          {/* Search */}
          <div className="relative min-w-0 flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search payment, transaction, student or invoice..."
              className="pl-9"
            />
          </div>

          {/* Status */}
          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as PaymentStatus | "ALL")
            }
            className="h-10 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring lg:w-40"
          >
            <option value="ALL">All Status</option>
            <option value="SUCCESS">Success</option>
            <option value="PENDING">Pending</option>
            <option value="FAILED">Failed</option>
            <option value="REFUNDED">Refunded</option>
            <option value="CANCELLED">Cancelled</option>
          </select>

          {/* Gateway */}
          <select
            value={gateway}
            onChange={(event) =>
              setGateway(
                event.target.value as
                  | "ALL"
                  | "STRIPE"
                  | "SSLCOMMERZ"
                  | "BKASH"
              )
            }
            className="h-10 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring lg:w-40"
          >
            <option value="ALL">All Gateways</option>
            <option value="STRIPE">Stripe</option>
            <option value="SSLCOMMERZ">SSLCommerz</option>
            <option value="BKASH">bKash</option>
          </select>

          {(searchTerm || status !== "ALL" || gateway !== "ALL") && (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setStatus("ALL");
                setGateway("ALL");
              }}
            >
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border bg-card">
        <div className="flex items-center justify-between border-b px-4 py-4">
          <div>
            <h2 className="font-semibold">Payment Transactions</h2>

            <p className="text-sm text-muted-foreground">
              {filteredPayments.length} payment
              {filteredPayments.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <Receipt className="size-5 text-muted-foreground" />
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payment</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Invoice</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Gateway</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Paid At</TableHead>
                <TableHead className="w-[70px] text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredPayments.length > 0 ? (
                filteredPayments.map((payment) => {
                  const config = statusConfig[payment.status];
                  const StatusIcon = config.icon;

                  return (
                    <TableRow key={payment.id}>
                      {/* Payment */}
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">{payment.id}</p>

                          <p className="text-xs text-muted-foreground">
                            {payment.transactionId}
                          </p>
                        </div>
                      </TableCell>

                      {/* Student */}
                      <TableCell>
                        <div className="min-w-[180px] space-y-1">
                          <p className="font-medium">
                            {payment.student.name}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {payment.student.studentId}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {payment.student.email}
                          </p>
                        </div>
                      </TableCell>

                      {/* Invoice */}
                      <TableCell>
                        <span className="font-medium">
                          {payment.invoice}
                        </span>
                      </TableCell>

                      {/* Amount */}
                      <TableCell>
                        <span className="font-semibold">
                          {formatCurrency(payment.amount)}
                        </span>
                      </TableCell>

                      {/* Gateway */}
                      <TableCell>
                        <span className="rounded-md border bg-muted/40 px-2.5 py-1 text-xs font-medium">
                          {gatewayConfig[payment.gateway]}
                        </span>
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${config.className}`}
                        >
                          <StatusIcon className="size-3.5" />
                          {config.label}
                        </span>
                      </TableCell>

                      {/* Paid At */}
                      <TableCell>
                        <span className="whitespace-nowrap text-sm text-muted-foreground">
                          {payment.paidAt || "—"}
                        </span>
                      </TableCell>

                      {/* Actions */}
                      <TableCell>
                        <div className="flex justify-end">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            title="Payment actions"
                            className="size-8"
                          >
                            <MoreHorizontal className="size-4" />
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
                    <div className="flex flex-col items-center justify-center gap-2">
                      <CreditCard className="size-8 text-muted-foreground" />

                      <p className="font-medium">
                        No payments found
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
      </div>
    </div>
  );
}