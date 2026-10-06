

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

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

type InvoiceStatus = "PAID" | "PENDING" | "OVERDUE";

type Invoice = {
  id: string;
  invoiceNo: string;
  title: string;
  type: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: InvoiceStatus;
};

const invoices: Invoice[] = [
  {
    id: "1",
    invoiceNo: "INV-2026-00124",
    title: "Semester Tuition Fee",
    type: "TUITION",
    amount: 45000,
    issueDate: "2026-09-01",
    dueDate: "2026-09-15",
    status: "PAID",
  },
  {
    id: "2",
    invoiceNo: "INV-2026-00125",
    title: "Library Fee",
    type: "LIBRARY",
    amount: 2500,
    issueDate: "2026-09-01",
    dueDate: "2026-09-15",
    status: "PAID",
  },
  {
    id: "3",
    invoiceNo: "INV-2026-00148",
    title: "Laboratory Fee",
    type: "LABORATORY",
    amount: 5000,
    issueDate: "2026-10-01",
    dueDate: "2026-10-15",
    status: "PENDING",
  },
  {
    id: "4",
    invoiceNo: "INV-2026-00149",
    title: "Semester Tuition Fee",
    type: "TUITION",
    amount: 45000,
    issueDate: "2026-10-01",
    dueDate: "2026-10-10",
    status: "OVERDUE",
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

function StatusBadge({ status }: { status: InvoiceStatus }) {
  const config = {
    PAID: {
      icon: CheckCircle2,
      label: "Paid",
      className:
        "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
    },
    PENDING: {
      icon: Clock3,
      label: "Pending",
      className:
        "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
    },
    OVERDUE: {
      icon: XCircle,
      label: "Overdue",
      className:
        "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400",
    },
  };

  const item = config[status];
  const Icon = item.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${item.className}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {item.label}
    </span>
  );
}

export default function Invoices() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("ALL");
  const [type, setType] = useState<string>("ALL");
  const [selectedInvoice, setSelectedInvoice] =
    useState<Invoice | null>(null);

  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        invoice.invoiceNo.toLowerCase().includes(searchValue) ||
        invoice.title.toLowerCase().includes(searchValue);

      const matchesStatus =
        status === "ALL" || invoice.status === status;

      const matchesType =
        type === "ALL" || invoice.type === type;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [search, status, type]);

  const totalAmount = invoices.reduce(
    (sum, invoice) => sum + invoice.amount,
    0
  );

  const paidAmount = invoices
    .filter((invoice) => invoice.status === "PAID")
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  const pendingAmount = invoices
    .filter((invoice) => invoice.status === "PENDING")
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  const overdueAmount = invoices
    .filter((invoice) => invoice.status === "OVERDUE")
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  return (
    <div className="min-h-full space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <FileText className="h-5 w-5" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Invoices
            </h1>

            <p className="text-sm text-muted-foreground">
              View and manage your university invoices and fees.
            </p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total */}
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">
                Total Invoiced
              </p>

              <p className="mt-2 text-2xl font-bold">
                {formatCurrency(totalAmount)}
              </p>
            </div>

            <div className="rounded-lg bg-blue-50 p-3 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
              <FileText className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Paid */}
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">
                Paid
              </p>

              <p className="mt-2 text-2xl font-bold text-emerald-600">
                {formatCurrency(paidAmount)}
              </p>
            </div>

            <div className="rounded-lg bg-emerald-50 p-3 text-emerald-600 dark:bg-emerald-950/40">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Pending */}
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">
                Pending
              </p>

              <p className="mt-2 text-2xl font-bold text-amber-600">
                {formatCurrency(pendingAmount)}
              </p>
            </div>

            <div className="rounded-lg bg-amber-50 p-3 text-amber-600 dark:bg-amber-950/40">
              <Clock3 className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Overdue */}
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">
                Overdue
              </p>

              <p className="mt-2 text-2xl font-bold text-red-600">
                {formatCurrency(overdueAmount)}
              </p>
            </div>

            <div className="rounded-lg bg-red-50 p-3 text-red-600 dark:bg-red-950/40">
              <XCircle className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Invoice List */}
      <div className="rounded-xl border bg-card shadow-sm">
        {/* Toolbar */}
        <div className="border-b p-4 sm:p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="font-semibold">
                Invoice History
              </h2>

              <p className="text-sm text-muted-foreground">
                {filteredInvoices.length} invoice
                {filteredInvoices.length !== 1 ? "s" : ""} found
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              {/* Search */}
              <div className="relative min-w-0 sm:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search invoice..."
                  className="pl-9"
                />
              </div>

              {/* Status */}
              <Select
                value={status}
                onValueChange={(value) => {
                  if (value !== null) {
                    setStatus(value);
                  }
                }}
              >
                <SelectTrigger className="w-full sm:w-36">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="ALL">
                    All Status
                  </SelectItem>

                  <SelectItem value="PAID">
                    Paid
                  </SelectItem>

                  <SelectItem value="PENDING">
                    Pending
                  </SelectItem>

                  <SelectItem value="OVERDUE">
                    Overdue
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Type */}
              <Select
                value={type}
                onValueChange={(value) => {
                  if (value !== null) {
                    setType(value);
                  }
                }}
              >
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="ALL">
                    All Types
                  </SelectItem>

                  <SelectItem value="TUITION">
                    Tuition
                  </SelectItem>

                  <SelectItem value="LIBRARY">
                    Library
                  </SelectItem>

                  <SelectItem value="LABORATORY">
                    Laboratory
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Invoice
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Type
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Issue Date
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Due Date
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Amount
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Status
                </th>

                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="border-b last:border-0 hover:bg-muted/30"
                >
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-medium">
                        {invoice.title}
                      </p>

                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {invoice.invoiceNo}
                      </p>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span className="text-sm capitalize">
                      {invoice.type.toLowerCase()}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm">
                    {formatDate(invoice.issueDate)}
                  </td>

                  <td className="px-5 py-4 text-sm">
                    {formatDate(invoice.dueDate)}
                  </td>

                  <td className="px-5 py-4 font-semibold">
                    {formatCurrency(invoice.amount)}
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={invoice.status} />
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          setSelectedInvoice(invoice)
                        }
                        title="View invoice"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="outline"
                        size="icon"
                        title="Download invoice"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="divide-y md:hidden">
          {filteredInvoices.map((invoice) => (
            <div
              key={invoice.id}
              className="space-y-4 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">
                    {invoice.title}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {invoice.invoiceNo}
                  </p>
                </div>

                <StatusBadge status={invoice.status} />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">
                    Amount
                  </p>

                  <p className="mt-1 font-semibold">
                    {formatCurrency(invoice.amount)}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Type
                  </p>

                  <p className="mt-1 capitalize">
                    {invoice.type.toLowerCase()}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Issue Date
                  </p>

                  <p className="mt-1">
                    {formatDate(invoice.issueDate)}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Due Date
                  </p>

                  <p className="mt-1">
                    {formatDate(invoice.dueDate)}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() =>
                    setSelectedInvoice(invoice)
                  }
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  title="Download invoice"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredInvoices.length === 0 && (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <FileText className="mb-3 h-10 w-10 text-muted-foreground" />

            <h3 className="font-semibold">
              No invoices found
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Try changing your search or filters.
            </p>
          </div>
        )}
      </div>

      {/* Invoice Details Dialog */}
      <Dialog
        open={!!selectedInvoice}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedInvoice(null);
          }
        }}
      >
        <DialogContent className="max-w-lg">
          {selectedInvoice && (
            <>
              <DialogHeader>
                <DialogTitle>
                  Invoice Details
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-5">
                {/* Invoice Header */}
                <div className="flex items-start justify-between gap-4 rounded-xl border bg-muted/30 p-4">
                  <div>
                    <p className="font-semibold">
                      {selectedInvoice.title}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {selectedInvoice.invoiceNo}
                    </p>
                  </div>

                  <StatusBadge
                    status={selectedInvoice.status}
                  />
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border p-4">
                    <p className="text-xs text-muted-foreground">
                      Amount
                    </p>

                    <p className="mt-1 text-lg font-bold">
                      {formatCurrency(
                        selectedInvoice.amount
                      )}
                    </p>
                  </div>

                  <div className="rounded-lg border p-4">
                    <p className="text-xs text-muted-foreground">
                      Type
                    </p>

                    <p className="mt-1 font-medium capitalize">
                      {selectedInvoice.type.toLowerCase()}
                    </p>
                  </div>

                  <div className="rounded-lg border p-4">
                    <p className="text-xs text-muted-foreground">
                      Issue Date
                    </p>

                    <p className="mt-1 flex items-center gap-2 text-sm font-medium">
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />

                      {formatDate(
                        selectedInvoice.issueDate
                      )}
                    </p>
                  </div>

                  <div className="rounded-lg border p-4">
                    <p className="text-xs text-muted-foreground">
                      Due Date
                    </p>

                    <p className="mt-1 flex items-center gap-2 text-sm font-medium">
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />

                      {formatDate(
                        selectedInvoice.dueDate
                      )}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  {selectedInvoice.status !== "PAID" && (
                    <Button className="flex-1">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Pay Invoice
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    className="flex-1"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

