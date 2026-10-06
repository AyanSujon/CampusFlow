


"use client";

import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  FileText,
  LockKeyhole,
  WalletCards,
} from "lucide-react";
import Link from "next/link";

type Invoice = {
  id: string;
  invoiceNo: string;
  title: string;
  dueDate: string;
  amount: number;
  paidAmount: number;
  status: "UNPAID" | "PARTIAL";
};

const invoices: Invoice[] = [
  {
    id: "INV-001",
    invoiceNo: "INV-2026-001",
    title: "Semester Tuition Fee",
    dueDate: "Oct 15, 2026",
    amount: 45000,
    paidAmount: 10000,
    status: "PARTIAL",
  },
  {
    id: "INV-002",
    invoiceNo: "INV-2026-002",
    title: "Library & Laboratory Fee",
    dueDate: "Oct 20, 2026",
    amount: 8500,
    paidAmount: 0,
    status: "UNPAID",
  },
];

const paymentMethods = [
  {
    id: "card",
    label: "Credit / Debit Card",
    description: "Visa, Mastercard, American Express",
    icon: CreditCard,
  },
  {
    id: "mobile",
    label: "Mobile Banking",
    description: "bKash, Nagad and supported wallets",
    icon: WalletCards,
  },
];

export default function MakePayment() {
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(invoices[0].id);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [amount, setAmount] = useState("");

  const selectedInvoice = useMemo(
    () => invoices.find((invoice) => invoice.id === selectedInvoiceId),
    [selectedInvoiceId],
  );

  const remainingAmount = selectedInvoice
    ? selectedInvoice.amount - selectedInvoice.paidAmount
    : 0;

  const paymentAmount = Number(amount) || 0;

  const isValidAmount =
    paymentAmount > 0 && paymentAmount <= remainingAmount;

  const handlePayNow = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidAmount) return;

    // Connect your payment API here.
    console.log({
      invoiceId: selectedInvoiceId,
      paymentMethod,
      amount: paymentAmount,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50/70 p-4 dark:bg-slate-950 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/student/payments"
              className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Payments
            </Link>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Make Payment
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Pay your outstanding university fees securely.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-400">
            <LockKeyhole className="h-4 w-4" />
            Secure Payment
          </div>
        </div>

        <form onSubmit={handlePayNow}>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_380px]">
            {/* Main Content */}
            <div className="space-y-6">
              {/* Invoice Selection */}
              <section className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="border-b border-slate-200 p-5 dark:border-slate-800 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
                      <FileText className="h-5 w-5" />
                    </div>

                    <div>
                      <h2 className="font-semibold text-slate-900 dark:text-white">
                        Select Invoice
                      </h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Choose the fee you want to pay.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 p-5 sm:p-6">
                  {invoices.map((invoice) => {
                    const remaining =
                      invoice.amount - invoice.paidAmount;
                    const selected = invoice.id === selectedInvoiceId;

                    return (
                      <button
                        key={invoice.id}
                        type="button"
                        onClick={() => {
                          setSelectedInvoiceId(invoice.id);
                          setAmount("");
                        }}
                        className={`w-full rounded-xl border p-4 text-left transition ${
                          selected
                            ? "border-blue-600 bg-blue-50/60 ring-1 ring-blue-600 dark:border-blue-500 dark:bg-blue-950/20"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:hover:border-slate-700 dark:hover:bg-slate-800/60"
                        }`}
                      >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-start gap-3">
                            <div
                              className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                                selected
                                  ? "bg-blue-600 text-white"
                                  : "bg-slate-100 text-slate-500 dark:bg-slate-800"
                              }`}
                            >
                              {selected ? (
                                <CheckCircle2 className="h-5 w-5" />
                              ) : (
                                <FileText className="h-5 w-5" />
                              )}
                            </div>

                            <div>
                              <p className="font-medium text-slate-900 dark:text-white">
                                {invoice.title}
                              </p>

                              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                {invoice.invoiceNo} · Due{" "}
                                {invoice.dueDate}
                              </p>
                            </div>
                          </div>

                          <div className="text-left sm:text-right">
                            <p className="font-semibold text-slate-900 dark:text-white">
                              ৳{remaining.toLocaleString()}
                            </p>

                            <span
                              className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                                invoice.status === "PARTIAL"
                                  ? "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400"
                                  : "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400"
                              }`}
                            >
                              {invoice.status === "PARTIAL"
                                ? "Partially Paid"
                                : "Unpaid"}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Payment Amount */}
              <section className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="border-b border-slate-200 p-5 dark:border-slate-800 sm:p-6">
                  <h2 className="font-semibold text-slate-900 dark:text-white">
                    Payment Amount
                  </h2>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Enter the amount you want to pay.
                  </p>
                </div>

                <div className="p-5 sm:p-6">
                  <label
                    htmlFor="amount"
                    className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Amount
                  </label>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-medium text-slate-500">
                      ৳
                    </span>

                    <input
                      id="amount"
                      type="number"
                      min="1"
                      max={remainingAmount}
                      step="1"
                      value={amount}
                      onChange={(event) => setAmount(event.target.value)}
                      placeholder="Enter amount"
                      className="h-12 w-full rounded-lg border border-slate-300 bg-white pl-9 pr-4 text-lg font-semibold text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    />
                  </div>

                  <div className="mt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>Outstanding balance</span>
                    <span className="font-medium">
                      ৳{remainingAmount.toLocaleString()}
                    </span>
                  </div>

                  {paymentAmount > remainingAmount && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                      Payment cannot exceed the outstanding balance.
                    </p>
                  )}
                </div>
              </section>

              {/* Payment Method */}
              <section className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="border-b border-slate-200 p-5 dark:border-slate-800 sm:p-6">
                  <h2 className="font-semibold text-slate-900 dark:text-white">
                    Payment Method
                  </h2>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Select how you want to complete the payment.
                  </p>
                </div>

                <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-6">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    const selected = paymentMethod === method.id;

                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id)}
                        className={`rounded-xl border p-4 text-left transition ${
                          selected
                            ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600 dark:border-blue-500 dark:bg-blue-950/20"
                            : "border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                              selected
                                ? "bg-blue-600 text-white"
                                : "bg-slate-100 text-slate-500 dark:bg-slate-800"
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                          </div>

                          <div className="min-w-0">
                            <p className="font-medium text-slate-900 dark:text-white">
                              {method.label}
                            </p>

                            <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                              {method.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            </div>

            {/* Payment Summary */}
            <aside className="h-fit xl:sticky xl:top-6">
              <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="bg-slate-900 p-5 text-white dark:bg-slate-800 sm:p-6">
                  <p className="text-sm text-slate-300">
                    Payment Summary
                  </p>

                  <p className="mt-2 text-3xl font-bold">
                    ৳{paymentAmount.toLocaleString()}
                  </p>
                </div>

                <div className="space-y-4 p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      Invoice
                    </span>

                    <span className="text-right text-sm font-medium text-slate-900 dark:text-white">
                      {selectedInvoice?.invoiceNo}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      Fee
                    </span>

                    <span className="text-right text-sm font-medium text-slate-900 dark:text-white">
                      {selectedInvoice?.title}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      Method
                    </span>

                    <span className="text-sm font-medium capitalize text-slate-900 dark:text-white">
                      {paymentMethod === "card"
                        ? "Card"
                        : "Mobile Banking"}
                    </span>
                  </div>

                  <div className="border-t border-slate-200 pt-4 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-900 dark:text-white">
                        Total
                      </span>

                      <span className="text-xl font-bold text-blue-700 dark:text-blue-400">
                        ৳{paymentAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!isValidAmount}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <CreditCard className="h-4 w-4" />
                    Continue to Payment
                  </button>

                  <div className="flex items-start gap-2 rounded-lg bg-slate-50 p-3 dark:bg-slate-800/70">
                    <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />

                    <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
                      Your payment information is securely processed. Do
                      not share your card or payment credentials with
                      anyone.
                    </p>
                  </div>
                </div>
              </section>
            </aside>
          </div>
        </form>
      </div>
    </div>
  );
}

