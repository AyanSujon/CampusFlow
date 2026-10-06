

"use client";

import React, { useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  Download,
  Eye,
  FileText,
  Search,
  XCircle,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PaymentStatus = "PAID" | "PENDING" | "FAILED";

type Payment = {
  id: string;
  invoiceId: string;
  transactionId: string;
  description: string;
  amount: number;
  paymentMethod: string;
  status: PaymentStatus;
  paidAt: string;
  academicYear: string;
};

const payments: Payment[] = [
  {
    id: "PAY-001",
    invoiceId: "INV-2026-001",
    transactionId: "TXN-8F92A1",
    description: "Semester Tuition Fee",
    amount: 45000,
    paymentMethod: "SSLCommerz",
    status: "PAID",
    paidAt: "2026-10-02",
    academicYear: "2026–2027",
  },
  {
    id: "PAY-002",
    invoiceId: "INV-2026-002",
    transactionId: "TXN-72BC91",
    description: "Registration Fee",
    amount: 5000,
    paymentMethod: "bKash",
    status: "PAID",
    paidAt: "2026-09-18",
    academicYear: "2026–2027",
  },
  {
    id: "PAY-003",
    invoiceId: "INV-2026-003",
    transactionId: "TXN-44DE72",
    description: "Library Fee",
    amount: 1500,
    paymentMethod: "Card",
    status: "PAID",
    paidAt: "2026-09-10",
    academicYear: "2026–2027",
  },
  {
    id: "PAY-004",
    invoiceId: "INV-2026-004",
    transactionId: "TXN-21FA88",
    description: "Examination Fee",
    amount: 3000,
    paymentMethod: "Nagad",
    status: "PENDING",
    paidAt: "2026-10-05",
    academicYear: "2026–2027",
  },
  {
    id: "PAY-005",
    invoiceId: "INV-2026-005",
    transactionId: "TXN-98AC21",
    description: "Lab Fee",
    amount: 2500,
    paymentMethod: "SSLCommerz",
    status: "FAILED",
    paidAt: "2026-09-05",
    academicYear: "2026–2027",
  },
];

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(amount);

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));

export default function PaymentsHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("ALL");
  const [paymentMethod, setPaymentMethod] = useState("ALL");

  const [selectedPayment, setSelectedPayment] =
    useState<Payment | null>(null);

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        payment.invoiceId.toLowerCase().includes(search) ||
        payment.transactionId.toLowerCase().includes(search) ||
        payment.description.toLowerCase().includes(search);

      const matchesStatus =
        status === "ALL" || payment.status === status;

      const matchesMethod =
        paymentMethod === "ALL" ||
        payment.paymentMethod === paymentMethod;

      return matchesSearch && matchesStatus && matchesMethod;
    });
  }, [searchTerm, status, paymentMethod]);

  const totalPaid = payments
    .filter((payment) => payment.status === "PAID")
    .reduce((total, payment) => total + payment.amount, 0);

  const totalPending = payments
    .filter((payment) => payment.status === "PENDING")
    .reduce((total, payment) => total + payment.amount, 0);

  const totalTransactions = payments.length;

  const getStatusStyle = (paymentStatus: PaymentStatus) => {
    switch (paymentStatus) {
      case "PAID":
        return "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400";

      case "PENDING":
        return "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400";

      case "FAILED":
        return "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400";

      default:
        return "";
    }
  };

  const getStatusIcon = (paymentStatus: PaymentStatus) => {
    switch (paymentStatus) {
      case "PAID":
        return <CheckCircle2 className="h-3.5 w-3.5" />;

      case "PENDING":
        return <Clock3 className="h-3.5 w-3.5" />;

      case "FAILED":
        return <XCircle className="h-3.5 w-3.5" />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-full space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Payments History
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            View and manage your tuition fees and payment transactions.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <Download className="h-4 w-4" />
          Export History
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {/* Total Paid */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Total Paid
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                {formatCurrency(totalPaid)}
              </h2>
            </div>

            <div className="rounded-lg bg-emerald-50 p-3 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Pending */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Pending Amount
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                {formatCurrency(totalPending)}
              </h2>
            </div>

            <div className="rounded-lg bg-amber-50 p-3 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
              <Clock3 className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Transactions */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:col-span-2 xl:col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Transactions
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                {totalTransactions}
              </h2>
            </div>

            <div className="rounded-lg bg-blue-50 p-3 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <CreditCard className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-3 lg:grid-cols-[1fr_180px_180px]">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search invoice, transaction or description..."
              className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
          </div>

          {/* Status */}
          <Select
            value={status}
            onValueChange={(value) => setStatus(value ?? "ALL")}
          >
            <SelectTrigger className="h-10">
              <SelectValue placeholder="Payment Status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="ALL">All Status</SelectItem>
              <SelectItem value="PAID">Paid</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="FAILED">Failed</SelectItem>
            </SelectContent>
          </Select>

          {/* Payment Method */}
          <Select
            value={paymentMethod}
            onValueChange={(value) =>
              setPaymentMethod(value ?? "ALL")
            }
          >
            <SelectTrigger className="h-10">
              <SelectValue placeholder="Payment Method" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="ALL">All Methods</SelectItem>
              <SelectItem value="SSLCommerz">SSLCommerz</SelectItem>
              <SelectItem value="bKash">bKash</SelectItem>
              <SelectItem value="Nagad">Nagad</SelectItem>
              <SelectItem value="Card">Card</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Payments Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
              <tr>
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Payment
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Invoice
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Amount
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Method
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Date
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredPayments.length > 0 ? (
                filteredPayments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="transition hover:bg-slate-50 dark:hover:bg-slate-800/40"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-blue-50 p-2 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                          <FileText className="h-4 w-4" />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">
                            {payment.description}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-500">
                            {payment.transactionId}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                      {payment.invoiceId}
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-slate-900 dark:text-white">
                      {formatCurrency(payment.amount)}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-400">
                      {payment.paymentMethod}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <CalendarDays className="h-4 w-4" />
                        {formatDate(payment.paidAt)}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusStyle(
                          payment.status
                        )}`}
                      >
                        {getStatusIcon(payment.status)}
                        {payment.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedPayment(payment)}
                        className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 px-3 text-xs font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center">
                    <CreditCard className="mx-auto h-8 w-8 text-slate-400" />

                    <p className="mt-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                      No payments found
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Try changing your search or filters.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Details Dialog */}
      <Dialog
        open={!!selectedPayment}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedPayment(null);
          }
        }}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
          </DialogHeader>

          {selectedPayment && (
            <div className="space-y-5">
              {/* Payment Header */}
              <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-4 dark:bg-slate-800/50">
                <div className="rounded-lg bg-blue-100 p-3 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  <CreditCard className="h-5 w-5" />
                </div>

                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {selectedPayment.description}
                  </p>

                  <p className="text-xs text-slate-500">
                    {selectedPayment.transactionId}
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-slate-500">
                    Invoice ID
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-900 dark:text-white">
                    {selectedPayment.invoiceId}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Payment ID
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-900 dark:text-white">
                    {selectedPayment.id}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Amount
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
                    {formatCurrency(selectedPayment.amount)}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Payment Method
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-900 dark:text-white">
                    {selectedPayment.paymentMethod}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Payment Date
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-900 dark:text-white">
                    {formatDate(selectedPayment.paidAt)}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Academic Year
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-900 dark:text-white">
                    {selectedPayment.academicYear}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div>
                <p className="mb-2 text-xs text-slate-500">
                  Status
                </p>

                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                    selectedPayment.status
                  )}`}
                >
                  {getStatusIcon(selectedPayment.status)}
                  {selectedPayment.status}
                </span>
              </div>

              {/* Receipt */}
              <button
                type="button"
                className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-slate-900 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
              >
                <Download className="h-4 w-4" />
                Download Receipt
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

