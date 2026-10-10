// import React from 'react'

// export default function transactionsReport() {
//     return (
//         <div>transactionsReport</div>
//     )
// }













// "use client";

// import React, { useMemo, useState } from "react";
// import Link from "next/link";
// import {
//     ArrowDownLeft,
//     ArrowDownToLine,
//     ArrowLeftRight,
//     ArrowUpRight,
//     CalendarDays,
//     CheckCircle2,
//     ChevronDown,
//     ChevronLeft,
//     ChevronRight,
//     CircleDollarSign,
//     Clock3,
//     Download,
//     FileSpreadsheet,
//     Filter,
//     ListFilter,
//     RefreshCw,
//     Search,
//     ShieldCheck,
//     SlidersHorizontal,
//     Wallet,
//     X,
// } from "lucide-react";

// type TransactionType = "CREDIT" | "DEBIT" | "ADJUSTMENT" | "REFUND";
// type TransactionStatus = "POSTED" | "PENDING" | "REVERSED";

// type LedgerTransaction = {
//     id: string;
//     reference: string;
//     date: string;
//     description: string;
//     category: string;
//     type: TransactionType;
//     amount: number;
//     status: TransactionStatus;
//     paymentMethod: string;
//     createdBy: string;
// };

// const initialTransactions: LedgerTransaction[] = [
//     {
//         id: "TXN-2026-1048",
//         reference: "PAY-2026-1042",
//         date: "2026-10-10",
//         description: "Semester Tuition Fee Collection",
//         category: "Tuition Fee",
//         type: "CREDIT",
//         amount: 25000,
//         status: "POSTED",
//         paymentMethod: "SSLCommerz",
//         createdBy: "System",
//     },
//     {
//         id: "TXN-2026-1047",
//         reference: "PAY-2026-1041",
//         date: "2026-10-10",
//         description: "Laboratory Fee Collection",
//         category: "Lab Fee",
//         type: "CREDIT",
//         amount: 12500,
//         status: "PENDING",
//         paymentMethod: "bKash",
//         createdBy: "System",
//     },
//     {
//         id: "TXN-2026-1046",
//         reference: "ADJ-2026-0012",
//         date: "2026-10-09",
//         description: "Tuition Fee Correction",
//         category: "Fee Adjustment",
//         type: "ADJUSTMENT",
//         amount: 1500,
//         status: "PENDING",
//         paymentMethod: "Internal",
//         createdBy: "Accountant",
//     },
//     {
//         id: "TXN-2026-1045",
//         reference: "EXP-2026-0031",
//         date: "2026-10-09",
//         description: "Laboratory Equipment Expense",
//         category: "Operating Expense",
//         type: "DEBIT",
//         amount: 18000,
//         status: "POSTED",
//         paymentMethod: "Bank Transfer",
//         createdBy: "Accountant",
//     },
//     {
//         id: "TXN-2026-1044",
//         reference: "REF-2026-0008",
//         date: "2026-10-08",
//         description: "Student Fee Refund",
//         category: "Refund",
//         type: "REFUND",
//         amount: 5000,
//         status: "POSTED",
//         paymentMethod: "Bank Transfer",
//         createdBy: "Finance Admin",
//     },
//     {
//         id: "TXN-2026-1043",
//         reference: "PAY-2026-1039",
//         date: "2026-10-08",
//         description: "Examination Fee Collection",
//         category: "Exam Fee",
//         type: "CREDIT",
//         amount: 8000,
//         status: "POSTED",
//         paymentMethod: "Card",
//         createdBy: "System",
//     },
//     {
//         id: "TXN-2026-1042",
//         reference: "EXP-2026-0030",
//         date: "2026-10-07",
//         description: "Office Maintenance",
//         category: "Operating Expense",
//         type: "DEBIT",
//         amount: 7500,
//         status: "POSTED",
//         paymentMethod: "Bank Transfer",
//         createdBy: "Accountant",
//     },
//     {
//         id: "TXN-2026-1041",
//         reference: "ADJ-2026-0011",
//         date: "2026-10-06",
//         description: "Duplicate Charge Reversal",
//         category: "Fee Adjustment",
//         type: "ADJUSTMENT",
//         amount: 2000,
//         status: "REVERSED",
//         paymentMethod: "Internal",
//         createdBy: "Finance Admin",
//     },
//     {
//         id: "TXN-2026-1040",
//         reference: "PAY-2026-1035",
//         date: "2026-10-05",
//         description: "Semester Registration Fee",
//         category: "Registration Fee",
//         type: "CREDIT",
//         amount: 15000,
//         status: "POSTED",
//         paymentMethod: "bKash",
//         createdBy: "System",
//     },
//     {
//         id: "TXN-2026-1039",
//         reference: "EXP-2026-0028",
//         date: "2026-10-04",
//         description: "University Utility Bill",
//         category: "Utilities",
//         type: "DEBIT",
//         amount: 12000,
//         status: "POSTED",
//         paymentMethod: "Bank Transfer",
//         createdBy: "Accountant",
//     },
// ];

// const formatCurrency = (amount: number) =>
//     new Intl.NumberFormat("en-BD", {
//         style: "currency",
//         currency: "BDT",
//         maximumFractionDigits: 2,
//     }).format(amount);

// const formatDate = (date: string) =>
//     new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//     });

// function StatusBadge({ status }: { status: TransactionStatus }) {
//     const styles: Record<TransactionStatus, string> = {
//         POSTED:
//             "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-400",
//         PENDING:
//             "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-400",
//         REVERSED:
//             "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-400",
//     };

//     return (
//         <span
//             className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${styles[status]}`}
//         >
//             {status}
//         </span>
//     );
// }

// function TypeBadge({ type }: { type: TransactionType }) {
//     const config: Record<
//         TransactionType,
//         { label: string; style: string; icon: React.ReactNode }
//     > = {
//         CREDIT: {
//             label: "Credit",
//             style:
//                 "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400",
//             icon: <ArrowDownLeft size={14} />,
//         },
//         DEBIT: {
//             label: "Debit",
//             style:
//                 "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400",
//             icon: <ArrowUpRight size={14} />,
//         },
//         ADJUSTMENT: {
//             label: "Adjustment",
//             style:
//                 "bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-400",
//             icon: <RefreshCw size={14} />,
//         },
//         REFUND: {
//             label: "Refund",
//             style:
//                 "bg-orange-50 text-orange-700 dark:bg-orange-950/50 dark:text-orange-400",
//             icon: <ArrowDownLeft size={14} />,
//         },
//     };

//     const item = config[type];

//     return (
//         <span
//             className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold ${item.style}`}
//         >
//             {item.icon}
//             {item.label}
//         </span>
//     );
// }

// function SummaryCard({
//     title,
//     value,
//     description,
//     icon,
//     iconClass,
// }: {
//     title: string;
//     value: string;
//     description: string;
//     icon: React.ReactNode;
//     iconClass: string;
// }) {
//     return (
//         <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
//             <div className="flex items-start justify-between gap-3">
//                 <div className={`flex size-11 items-center justify-center rounded-xl ${iconClass}`}>
//                     {icon}
//                 </div>
//             </div>

//             <p className="mt-5 text-sm text-muted-foreground">{title}</p>
//             <p className="mt-1 break-words text-2xl font-bold tracking-tight">
//                 {value}
//             </p>
//             <p className="mt-2 text-xs text-muted-foreground">{description}</p>
//         </div>
//     );
// }

// function SectionTitle({
//     title,
//     description,
// }: {
//     title: string;
//     description: string;
// }) {
//     return (
//         <div>
//             <h2 className="text-base font-semibold">{title}</h2>
//             <p className="mt-1 text-sm text-muted-foreground">{description}</p>
//         </div>
//     );
// }

// export default function TransactionsReport() {
//     const [transactions] = useState(initialTransactions);
//     const [search, setSearch] = useState("");
//     const [typeFilter, setTypeFilter] = useState("ALL");
//     const [statusFilter, setStatusFilter] = useState("ALL");
//     const [methodFilter, setMethodFilter] = useState("ALL");
//     const [startDate, setStartDate] = useState("2026-10-01");
//     const [endDate, setEndDate] = useState("2026-10-31");
//     const [page, setPage] = useState(1);
//     const [pageSize, setPageSize] = useState("5");
//     const [showFilters, setShowFilters] = useState(false);

//     const filteredTransactions = useMemo(() => {
//         const query = search.trim().toLowerCase();

//         return transactions.filter((transaction) => {
//             const matchesSearch =
//                 !query ||
//                 [
//                     transaction.id,
//                     transaction.reference,
//                     transaction.description,
//                     transaction.category,
//                     transaction.createdBy,
//                 ].some((value) => value.toLowerCase().includes(query));

//             const matchesType =
//                 typeFilter === "ALL" || transaction.type === typeFilter;

//             const matchesStatus =
//                 statusFilter === "ALL" || transaction.status === statusFilter;

//             const matchesMethod =
//                 methodFilter === "ALL" ||
//                 transaction.paymentMethod === methodFilter;

//             const matchesStart =
//                 !startDate || transaction.date >= startDate;

//             const matchesEnd =
//                 !endDate || transaction.date <= endDate;

//             return (
//                 matchesSearch &&
//                 matchesType &&
//                 matchesStatus &&
//                 matchesMethod &&
//                 matchesStart &&
//                 matchesEnd
//             );
//         });
//     }, [
//         transactions,
//         search,
//         typeFilter,
//         statusFilter,
//         methodFilter,
//         startDate,
//         endDate,
//     ]);

//     // Report totals use posted entries only. Pending and reversed entries
//     // are shown separately and are not included in posted ledger totals.
//     const totals = useMemo(() => {
//         const posted = filteredTransactions.filter(
//             (transaction) => transaction.status === "POSTED"
//         );

//         const credits = posted
//             .filter((transaction) => transaction.type === "CREDIT")
//             .reduce((sum, transaction) => sum + transaction.amount, 0);

//         const debits = posted
//             .filter((transaction) => transaction.type === "DEBIT")
//             .reduce((sum, transaction) => sum + transaction.amount, 0);

//         const adjustments = posted
//             .filter((transaction) => transaction.type === "ADJUSTMENT")
//             .reduce((sum, transaction) => sum + transaction.amount, 0);

//         const refunds = posted
//             .filter((transaction) => transaction.type === "REFUND")
//             .reduce((sum, transaction) => sum + transaction.amount, 0);

//         const pending = filteredTransactions.filter(
//             (transaction) => transaction.status === "PENDING"
//         ).length;

//         const reversed = filteredTransactions.filter(
//             (transaction) => transaction.status === "REVERSED"
//         ).length;

//         return {
//             credits,
//             debits,
//             adjustments,
//             refunds,
//             net: credits - debits - refunds,
//             pending,
//             reversed,
//             postedCount: posted.length,
//         };
//     }, [filteredTransactions]);

//     const pageCount = Math.max(
//         1,
//         Math.ceil(filteredTransactions.length / Number(pageSize))
//     );

//     const currentPage = Math.min(page, pageCount);

//     const paginatedTransactions = filteredTransactions.slice(
//         (currentPage - 1) * Number(pageSize),
//         currentPage * Number(pageSize)
//     );

//     const resetFilters = () => {
//         setSearch("");
//         setTypeFilter("ALL");
//         setStatusFilter("ALL");
//         setMethodFilter("ALL");
//         setStartDate("");
//         setEndDate("");
//         setPage(1);
//     };

//     const exportCsv = () => {
//         const headers = [
//             "Transaction ID",
//             "Reference",
//             "Date",
//             "Description",
//             "Category",
//             "Type",
//             "Amount",
//             "Status",
//             "Payment Method",
//             "Created By",
//         ];

//         const rows = filteredTransactions.map((transaction) => [
//             transaction.id,
//             transaction.reference,
//             transaction.date,
//             transaction.description,
//             transaction.category,
//             transaction.type,
//             transaction.amount.toFixed(2),
//             transaction.status,
//             transaction.paymentMethod,
//             transaction.createdBy,
//         ]);

//         const escapeCsv = (value: string | number) =>
//             `"${String(value).replace(/"/g, '""')}"`;

//         const csv = [headers, ...rows]
//             .map((row) => row.map(escapeCsv).join(","))
//             .join("\r\n");

//         const blob = new Blob(["\uFEFF" + csv], {
//             type: "text/csv;charset=utf-8;",
//         });

//         const url = URL.createObjectURL(blob);
//         const anchor = document.createElement("a");

//         anchor.href = url;
//         anchor.download = `transactions-report-${startDate || "all"}-to-${endDate || "all"}.csv`;
//         document.body.appendChild(anchor);
//         anchor.click();
//         anchor.remove();
//         URL.revokeObjectURL(url);
//     };

//     return (
//         <main className="min-h-screen w-full max-w-full overflow-x-clip bg-background text-foreground">
//             <div className="mx-auto w-full min-w-0 max-w-full space-y-7 overflow-x-clip p-4 sm:p-6 lg:p-8">
//                 {/* Header */}
//                 <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
//                     <div>

//                         <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
//                             Transaction Reports
//                         </h1>

//                         <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
//                             Review financial ledger entries, credits, debits, refunds and
//                             adjustments to reconcile university accounts.
//                         </p>
//                     </div>

//                     <div className="flex flex-wrap items-center gap-2">
//                         <button
//                             type="button"
//                             onClick={resetFilters}
//                             className="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-3 text-sm font-medium hover:bg-muted"
//                         >
//                             <RefreshCw size={15} />
//                             Reset
//                         </button>

//                         <button
//                             type="button"
//                             onClick={exportCsv}
//                             className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground hover:opacity-90"
//                         >
//                             <Download size={16} />
//                             Export CSV
//                         </button>
//                     </div>
//                 </div>

//                 {/* Date range */}
//                 <section className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">
//                     <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
//                         <div className="flex items-center gap-3">
//                             <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
//                                 <CalendarDays size={20} />
//                             </div>
//                             <div>
//                                 <h2 className="text-sm font-semibold">Reporting Period</h2>
//                                 <p className="mt-1 text-xs text-muted-foreground">
//                                     Filter the ledger by transaction date.
//                                 </p>
//                             </div>
//                         </div>

//                         <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:w-[440px]">
//                             <label className="space-y-1.5">
//                                 <span className="text-xs font-medium text-muted-foreground">
//                                     From
//                                 </span>
//                                 <input
//                                     type="date"
//                                     value={startDate}
//                                     max={endDate || undefined}
//                                     onChange={(event) => {
//                                         setStartDate(event.target.value);
//                                         setPage(1);
//                                     }}
//                                     className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary"
//                                 />
//                             </label>

//                             <label className="space-y-1.5">
//                                 <span className="text-xs font-medium text-muted-foreground">
//                                     To
//                                 </span>
//                                 <input
//                                     type="date"
//                                     value={endDate}
//                                     min={startDate || undefined}
//                                     onChange={(event) => {
//                                         setEndDate(event.target.value);
//                                         setPage(1);
//                                     }}
//                                     className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary"
//                                 />
//                             </label>
//                         </div>
//                     </div>
//                 </section>

//                 {/* Summary cards */}
//                 <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
//                     <SummaryCard
//                         title="Total Credits"
//                         value={formatCurrency(totals.credits)}
//                         description="Posted credit entries in this report"
//                         icon={<ArrowDownLeft size={21} />}
//                         iconClass="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
//                     />

//                     <SummaryCard
//                         title="Total Debits"
//                         value={formatCurrency(totals.debits)}
//                         description="Posted debit entries in this report"
//                         icon={<ArrowUpRight size={21} />}
//                         iconClass="bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400"
//                     />

//                     <SummaryCard
//                         title="Adjustments"
//                         value={formatCurrency(totals.adjustments)}
//                         description="Posted adjustment entries"
//                         icon={<RefreshCw size={21} />}
//                         iconClass="bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-400"
//                     />

//                     <SummaryCard
//                         title="Net Movement"
//                         value={formatCurrency(totals.net)}
//                         description="Credits minus debits and refunds"
//                         icon={<Wallet size={21} />}
//                         iconClass="bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400"
//                     />
//                 </section>

//                 {/* Reconciliation overview */}
//                 <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
//                     <div className="rounded-xl border border-border bg-card p-5 shadow-sm xl:col-span-2">
//                         <div className="flex flex-wrap items-start justify-between gap-3">
//                             <SectionTitle
//                                 title="Ledger Reconciliation"
//                                 description="A summary of the currently filtered transaction records."
//                             />
//                             <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
//                                 <ShieldCheck size={14} />
//                                 Posted entries
//                             </span>
//                         </div>

//                         <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
//                             <div className="rounded-lg border border-border p-4">
//                                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                                     <ArrowDownLeft size={16} className="text-emerald-600" />
//                                     Credit entries
//                                 </div>
//                                 <p className="mt-3 text-xl font-bold">
//                                     {formatCurrency(totals.credits)}
//                                 </p>
//                                 <p className="mt-1 text-xs text-muted-foreground">
//                                     {totals.postedCount} posted entries across all types
//                                 </p>
//                             </div>

//                             <div className="rounded-lg border border-border p-4">
//                                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                                     <ArrowUpRight size={16} className="text-red-600" />
//                                     Debit entries
//                                 </div>
//                                 <p className="mt-3 text-xl font-bold">
//                                     {formatCurrency(totals.debits)}
//                                 </p>
//                                 <p className="mt-1 text-xs text-muted-foreground">
//                                     Posted debits only
//                                 </p>
//                             </div>

//                             <div className="rounded-lg border border-border p-4">
//                                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                                     <CircleDollarSign size={16} className="text-blue-600" />
//                                     Refunds
//                                 </div>
//                                 <p className="mt-3 text-xl font-bold">
//                                     {formatCurrency(totals.refunds)}
//                                 </p>
//                                 <p className="mt-1 text-xs text-muted-foreground">
//                                     Posted refund entries
//                                 </p>
//                             </div>
//                         </div>

//                         <div className="mt-5 rounded-lg bg-muted/50 p-4">
//                             <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
//                                 <div>
//                                     <p className="text-sm font-semibold">Net ledger movement</p>
//                                     <p className="mt-1 text-xs text-muted-foreground">
//                                         Credits − Debits − Refunds. Adjustments are shown separately.
//                                     </p>
//                                 </div>
//                                 <p
//                                     className={`text-xl font-bold ${totals.net >= 0 ? "text-emerald-600" : "text-red-600"
//                                         }`}
//                                 >
//                                     {formatCurrency(totals.net)}
//                                 </p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
//                         <SectionTitle
//                             title="Entry Status"
//                             description="Filtered ledger status breakdown"
//                         />

//                         <div className="mt-5 space-y-4">
//                             <div className="flex items-center justify-between gap-3">
//                                 <div className="flex items-center gap-2 text-sm">
//                                     <span className="size-2.5 rounded-full bg-emerald-500" />
//                                     Posted
//                                 </div>
//                                 <span className="text-sm font-semibold">
//                                     {
//                                         filteredTransactions.filter(
//                                             (item) => item.status === "POSTED"
//                                         ).length
//                                     }
//                                 </span>
//                             </div>

//                             <div className="h-2 overflow-hidden rounded-full bg-muted">
//                                 <div
//                                     className="h-full rounded-full bg-emerald-500"
//                                     style={{
//                                         width: `${filteredTransactions.length
//                                             ? (filteredTransactions.filter(
//                                                 (item) => item.status === "POSTED"
//                                             ).length /
//                                                 filteredTransactions.length) *
//                                             100
//                                             : 0
//                                             }%`,
//                                     }}
//                                 />
//                             </div>

//                             <div className="flex items-center justify-between gap-3">
//                                 <div className="flex items-center gap-2 text-sm">
//                                     <span className="size-2.5 rounded-full bg-amber-500" />
//                                     Pending
//                                 </div>
//                                 <span className="text-sm font-semibold">{totals.pending}</span>
//                             </div>

//                             <div className="h-2 overflow-hidden rounded-full bg-muted">
//                                 <div
//                                     className="h-full rounded-full bg-amber-500"
//                                     style={{
//                                         width: `${filteredTransactions.length
//                                             ? (totals.pending / filteredTransactions.length) * 100
//                                             : 0
//                                             }%`,
//                                     }}
//                                 />
//                             </div>

//                             <div className="flex items-center justify-between gap-3">
//                                 <div className="flex items-center gap-2 text-sm">
//                                     <span className="size-2.5 rounded-full bg-red-500" />
//                                     Reversed
//                                 </div>
//                                 <span className="text-sm font-semibold">{totals.reversed}</span>
//                             </div>

//                             <div className="h-2 overflow-hidden rounded-full bg-muted">
//                                 <div
//                                     className="h-full rounded-full bg-red-500"
//                                     style={{
//                                         width: `${filteredTransactions.length
//                                             ? (totals.reversed / filteredTransactions.length) * 100
//                                             : 0
//                                             }%`,
//                                     }}
//                                 />
//                             </div>
//                         </div>

//                         <div className="mt-6 border-t border-border pt-4">
//                             <p className="text-xs leading-5 text-muted-foreground">
//                                 Pending entries are excluded from posted ledger totals.
//                                 Reversed entries remain visible for audit purposes.
//                             </p>
//                         </div>
//                     </div>
//                 </section>

//                 {/* Transaction table */}
//                 <section className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
//                     <div className="flex flex-col justify-between gap-4 p-5 lg:flex-row lg:items-center">
//                         <SectionTitle
//                             title="Transaction Ledger"
//                             description={`${filteredTransactions.length} entries match your filters.`}
//                         />

//                         <div className="flex flex-wrap gap-2">
//                             <button
//                                 type="button"
//                                 onClick={() => setShowFilters((previous) => !previous)}
//                                 className={`inline-flex h-10 items-center gap-2 rounded-lg border px-3 text-sm font-medium hover:bg-muted ${showFilters
//                                     ? "border-primary text-primary"
//                                     : "border-border"
//                                     }`}
//                             >
//                                 <SlidersHorizontal size={16} />
//                                 Filters
//                                 <ChevronDown
//                                     size={14}
//                                     className={`transition-transform ${showFilters ? "rotate-180" : ""
//                                         }`}
//                                 />
//                             </button>

//                             <button
//                                 type="button"
//                                 onClick={exportCsv}
//                                 className="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-3 text-sm font-medium hover:bg-muted"
//                             >
//                                 <FileSpreadsheet size={16} />
//                                 Export
//                             </button>
//                         </div>
//                     </div>

//                     {/* Search */}
//                     <div className="px-5 pb-4">
//                         <div className="flex h-10 max-w-md items-center gap-2 rounded-lg border border-border px-3 focus-within:border-primary">
//                             <Search size={16} className="shrink-0 text-muted-foreground" />
//                             <input
//                                 type="search"
//                                 value={search}
//                                 onChange={(event) => {
//                                     setSearch(event.target.value);
//                                     setPage(1);
//                                 }}
//                                 placeholder="Search ID, reference, description..."
//                                 className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
//                             />
//                             {search && (
//                                 <button
//                                     type="button"
//                                     onClick={() => {
//                                         setSearch("");
//                                         setPage(1);
//                                     }}
//                                     aria-label="Clear search"
//                                     className="text-muted-foreground hover:text-foreground"
//                                 >
//                                     <X size={15} />
//                                 </button>
//                             )}
//                         </div>
//                     </div>

//                     {/* Filters */}
//                     {showFilters && (
//                         <div className="grid grid-cols-1 gap-3 border-y border-border bg-muted/20 p-5 sm:grid-cols-2 xl:grid-cols-4">
//                             <label className="space-y-1.5">
//                                 <span className="text-xs font-medium text-muted-foreground">
//                                     Transaction Type
//                                 </span>
//                                 <select
//                                     value={typeFilter}
//                                     onChange={(event) => {
//                                         setTypeFilter(event.target.value);
//                                         setPage(1);
//                                     }}
//                                     className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
//                                 >
//                                     <option value="ALL">All types</option>
//                                     <option value="CREDIT">Credit</option>
//                                     <option value="DEBIT">Debit</option>
//                                     <option value="ADJUSTMENT">Adjustment</option>
//                                     <option value="REFUND">Refund</option>
//                                 </select>
//                             </label>

//                             <label className="space-y-1.5">
//                                 <span className="text-xs font-medium text-muted-foreground">
//                                     Status
//                                 </span>
//                                 <select
//                                     value={statusFilter}
//                                     onChange={(event) => {
//                                         setStatusFilter(event.target.value);
//                                         setPage(1);
//                                     }}
//                                     className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
//                                 >
//                                     <option value="ALL">All statuses</option>
//                                     <option value="POSTED">Posted</option>
//                                     <option value="PENDING">Pending</option>
//                                     <option value="REVERSED">Reversed</option>
//                                 </select>
//                             </label>

//                             <label className="space-y-1.5">
//                                 <span className="text-xs font-medium text-muted-foreground">
//                                     Payment Method
//                                 </span>
//                                 <select
//                                     value={methodFilter}
//                                     onChange={(event) => {
//                                         setMethodFilter(event.target.value);
//                                         setPage(1);
//                                     }}
//                                     className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
//                                 >
//                                     <option value="ALL">All methods</option>
//                                     <option value="SSLCommerz">SSLCommerz</option>
//                                     <option value="bKash">bKash</option>
//                                     <option value="Card">Card</option>
//                                     <option value="Bank Transfer">Bank Transfer</option>
//                                     <option value="Internal">Internal</option>
//                                 </select>
//                             </label>

//                             <div className="flex items-end">
//                                 <button
//                                     type="button"
//                                     onClick={resetFilters}
//                                     className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-border px-3 text-sm font-medium hover:bg-muted"
//                                 >
//                                     <RefreshCw size={15} />
//                                     Clear filters
//                                 </button>
//                             </div>
//                         </div>
//                     )}

//                     {/* Table */}
//                     <div className="w-full min-w-0 max-w-full">
//                         <table className="w-full min-w-0 text-left text-sm">
//                             <thead>
//                                 <tr className="border-y border-border bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
//                                     <th className="px-5 py-3 font-medium">Transaction</th>
//                                     <th className="px-4 py-3 font-medium">Description</th>
//                                     <th className="px-4 py-3 font-medium">Type</th>
//                                     <th className="px-4 py-3 font-medium">Method</th>
//                                     <th className="px-4 py-3 font-medium">Date</th>
//                                     <th className="px-4 py-3 font-medium">Amount</th>
//                                     <th className="px-4 py-3 font-medium">Status</th>
//                                 </tr>
//                             </thead>

//                             <tbody>
//                                 {paginatedTransactions.map((transaction) => (
//                                     <tr
//                                         key={transaction.id}
//                                         className="border-b border-border last:border-0 transition hover:bg-muted/30"
//                                     >
//                                         <td className="px-5 py-4">
//                                             <p className="font-semibold">{transaction.id}</p>
//                                             <p className="mt-1 text-xs text-muted-foreground">
//                                                 Ref: {transaction.reference}
//                                             </p>
//                                         </td>

//                                         <td className="px-4 py-4">
//                                             <p className="max-w-[250px] font-medium">
//                                                 {transaction.description}
//                                             </p>
//                                             <p className="mt-1 text-xs text-muted-foreground">
//                                                 {transaction.category} · {transaction.createdBy}
//                                             </p>
//                                         </td>

//                                         <td className="px-4 py-4">
//                                             <TypeBadge type={transaction.type} />
//                                         </td>

//                                         <td className="px-4 py-4 text-muted-foreground">
//                                             {transaction.paymentMethod}
//                                         </td>

//                                         <td className="px-4 py-4 whitespace-nowrap text-muted-foreground">
//                                             {formatDate(transaction.date)}
//                                         </td>

//                                         <td className="px-4 py-4 whitespace-nowrap font-semibold">
//                                             {formatCurrency(transaction.amount)}
//                                         </td>

//                                         <td className="px-4 py-4">
//                                             <StatusBadge status={transaction.status} />
//                                         </td>
//                                     </tr>
//                                 ))}

//                                 {paginatedTransactions.length === 0 && (
//                                     <tr>
//                                         <td colSpan={7} className="px-5 py-16 text-center">
//                                             <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted">
//                                                 <ListFilter
//                                                     size={22}
//                                                     className="text-muted-foreground"
//                                                 />
//                                             </div>
//                                             <p className="mt-3 font-semibold">
//                                                 No transactions found
//                                             </p>
//                                             <p className="mt-1 text-sm text-muted-foreground">
//                                                 Try changing the date range or filters.
//                                             </p>
//                                             <button
//                                                 type="button"
//                                                 onClick={resetFilters}
//                                                 className="mt-3 text-sm font-semibold text-primary hover:underline"
//                                             >
//                                                 Reset filters
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>

//                     {/* Pagination */}
//                     <div className="flex flex-col gap-4 border-t border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
//                         <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
//                             <span>Rows per page</span>
//                             <select
//                                 value={pageSize}
//                                 onChange={(event) => {
//                                     setPageSize(event.target.value);
//                                     setPage(1);
//                                 }}
//                                 className="h-9 rounded-lg border border-border bg-background px-2 text-sm text-foreground"
//                             >
//                                 <option value="5">5</option>
//                                 <option value="10">10</option>
//                                 <option value="20">20</option>
//                             </select>
//                             <span>
//                                 {filteredTransactions.length === 0
//                                     ? "0 results"
//                                     : `${(currentPage - 1) * Number(pageSize) + 1}–${Math.min(
//                                         currentPage * Number(pageSize),
//                                         filteredTransactions.length
//                                     )} of ${filteredTransactions.length}`}
//                             </span>
//                         </div>

//                         <div className="flex items-center gap-2">
//                             <button
//                                 type="button"
//                                 aria-label="Previous page"
//                                 disabled={currentPage <= 1}
//                                 onClick={() => setPage((previous) => Math.max(1, previous - 1))}
//                                 className="flex size-9 items-center justify-center rounded-lg border border-border hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
//                             >
//                                 <ChevronLeft size={17} />
//                             </button>

//                             <span className="min-w-20 text-center text-sm font-medium">
//                                 Page {currentPage} of {pageCount}
//                             </span>

//                             <button
//                                 type="button"
//                                 aria-label="Next page"
//                                 disabled={currentPage >= pageCount}
//                                 onClick={() =>
//                                     setPage((previous) => Math.min(pageCount, previous + 1))
//                                 }
//                                 className="flex size-9 items-center justify-center rounded-lg border border-border hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
//                             >
//                                 <ChevronRight size={17} />
//                             </button>
//                         </div>
//                     </div>
//                 </section>

//                 {/* Footer note */}
//                 <div className="flex items-start gap-2 rounded-lg border border-border bg-muted/30 p-4 text-xs leading-5 text-muted-foreground">
//                     <ShieldCheck size={17} className="mt-0.5 shrink-0" />
//                     <p>
//                         Audit note: Pending entries are excluded from posted totals.
//                         Reversed entries remain available for audit review. These figures
//                         are illustrative demo data; connect the report to your verified
//                         financial ledger before using it for actual accounting.
//                     </p>
//                 </div>
//             </div>
//         </main>
//     );
// }




















"use client";

import React, { useMemo, useState } from "react";
import {
    ArrowDownLeft,
    ArrowUpRight,
    CalendarDays,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    CircleDollarSign,
    Download,
    FileSpreadsheet,
    ListFilter,
    RefreshCw,
    Search,
    ShieldCheck,
    SlidersHorizontal,
    Wallet,
    X,
} from "lucide-react";

type TransactionType = "CREDIT" | "DEBIT" | "ADJUSTMENT" | "REFUND";
type TransactionStatus = "POSTED" | "PENDING" | "REVERSED";

type LedgerTransaction = {
    id: string;
    reference: string;
    date: string;
    description: string;
    category: string;
    type: TransactionType;
    amount: number;
    status: TransactionStatus;
    paymentMethod: string;
    createdBy: string;
};

const initialTransactions: LedgerTransaction[] = [
    {
        id: "TXN-2026-1048",
        reference: "PAY-2026-1042",
        date: "2026-10-10",
        description: "Semester Tuition Fee Collection",
        category: "Tuition Fee",
        type: "CREDIT",
        amount: 25000,
        status: "POSTED",
        paymentMethod: "SSLCommerz",
        createdBy: "System",
    },
    {
        id: "TXN-2026-1047",
        reference: "PAY-2026-1041",
        date: "2026-10-10",
        description: "Laboratory Fee Collection",
        category: "Lab Fee",
        type: "CREDIT",
        amount: 12500,
        status: "PENDING",
        paymentMethod: "bKash",
        createdBy: "System",
    },
    {
        id: "TXN-2026-1046",
        reference: "ADJ-2026-0012",
        date: "2026-10-09",
        description: "Tuition Fee Correction",
        category: "Fee Adjustment",
        type: "ADJUSTMENT",
        amount: 1500,
        status: "PENDING",
        paymentMethod: "Internal",
        createdBy: "Accountant",
    },
    {
        id: "TXN-2026-1045",
        reference: "EXP-2026-0031",
        date: "2026-10-09",
        description: "Laboratory Equipment Expense",
        category: "Operating Expense",
        type: "DEBIT",
        amount: 18000,
        status: "POSTED",
        paymentMethod: "Bank Transfer",
        createdBy: "Accountant",
    },
    {
        id: "TXN-2026-1044",
        reference: "REF-2026-0008",
        date: "2026-10-08",
        description: "Student Fee Refund",
        category: "Refund",
        type: "REFUND",
        amount: 5000,
        status: "POSTED",
        paymentMethod: "Bank Transfer",
        createdBy: "Finance Admin",
    },
    {
        id: "TXN-2026-1043",
        reference: "PAY-2026-1039",
        date: "2026-10-08",
        description: "Examination Fee Collection",
        category: "Exam Fee",
        type: "CREDIT",
        amount: 8000,
        status: "POSTED",
        paymentMethod: "Card",
        createdBy: "System",
    },
    {
        id: "TXN-2026-1042",
        reference: "EXP-2026-0030",
        date: "2026-10-07",
        description: "Office Maintenance",
        category: "Operating Expense",
        type: "DEBIT",
        amount: 7500,
        status: "POSTED",
        paymentMethod: "Bank Transfer",
        createdBy: "Accountant",
    },
    {
        id: "TXN-2026-1041",
        reference: "ADJ-2026-0011",
        date: "2026-10-06",
        description: "Duplicate Charge Reversal",
        category: "Fee Adjustment",
        type: "ADJUSTMENT",
        amount: 2000,
        status: "REVERSED",
        paymentMethod: "Internal",
        createdBy: "Finance Admin",
    },
    {
        id: "TXN-2026-1040",
        reference: "PAY-2026-1035",
        date: "2026-10-05",
        description: "Semester Registration Fee",
        category: "Registration Fee",
        type: "CREDIT",
        amount: 15000,
        status: "POSTED",
        paymentMethod: "bKash",
        createdBy: "System",
    },
    {
        id: "TXN-2026-1039",
        reference: "EXP-2026-0028",
        date: "2026-10-04",
        description: "University Utility Bill",
        category: "Utilities",
        type: "DEBIT",
        amount: 12000,
        status: "POSTED",
        paymentMethod: "Bank Transfer",
        createdBy: "Accountant",
    },
];

const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT",
        maximumFractionDigits: 2,
    }).format(amount);

const formatDate = (date: string) =>
    new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

function StatusBadge({ status }: { status: TransactionStatus }) {
    const styles: Record<TransactionStatus, string> = {
        POSTED:
            "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-400",
        PENDING:
            "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-400",
        REVERSED:
            "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-400",
    };

    return (
        <span className={`inline-flex max-w-full items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${styles[status]}`}>
            {status}
        </span>
    );
}

function TypeBadge({ type }: { type: TransactionType }) {
    const config: Record<
        TransactionType,
        { label: string; style: string; icon: React.ReactNode }
    > = {
        CREDIT: {
            label: "Credit",
            style: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400",
            icon: <ArrowDownLeft size={14} />,
        },
        DEBIT: {
            label: "Debit",
            style: "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400",
            icon: <ArrowUpRight size={14} />,
        },
        ADJUSTMENT: {
            label: "Adjustment",
            style: "bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-400",
            icon: <RefreshCw size={14} />,
        },
        REFUND: {
            label: "Refund",
            style: "bg-orange-50 text-orange-700 dark:bg-orange-950/50 dark:text-orange-400",
            icon: <ArrowDownLeft size={14} />,
        },
    };

    const item = config[type];

    return (
        <span className={`inline-flex max-w-full items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold ${item.style}`}>
            {item.icon}
            {item.label}
        </span>
    );
}

function SummaryCard({
    title,
    value,
    description,
    icon,
    iconClass,
}: {
    title: string;
    value: string;
    description: string;
    icon: React.ReactNode;
    iconClass: string;
}) {
    return (
        <div className="min-w-0 rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">
            <div className="flex size-10 items-center justify-center rounded-xl sm:size-11">
                <div className={`flex size-full items-center justify-center rounded-xl ${iconClass}`}>
                    {icon}
                </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{title}</p>
            <p className="mt-1 break-words text-xl font-bold tracking-tight sm:text-2xl">
                {value}
            </p>
            <p className="mt-2 break-words text-xs leading-5 text-muted-foreground">
                {description}
            </p>
        </div>
    );
}

function SectionTitle({
    title,
    description,
}: {
    title: string;
    description: string;
}) {
    return (
        <div className="min-w-0">
            <h2 className="break-words text-base font-semibold">{title}</h2>
            <p className="mt-1 break-words text-sm leading-5 text-muted-foreground">
                {description}
            </p>
        </div>
    );
}

function TransactionCard({
    transaction,
}: {
    transaction: LedgerTransaction;
}) {
    return (
        <article className="min-w-0 rounded-xl border border-border bg-card p-4 shadow-sm">
            <div className="flex min-w-0 items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                    <p className="break-all text-sm font-semibold">
                        {transaction.id}
                    </p>
                    <p className="mt-1 break-all text-xs text-muted-foreground">
                        Ref: {transaction.reference}
                    </p>
                </div>
                <div className="shrink-0">
                    <StatusBadge status={transaction.status} />
                </div>
            </div>

            <div className="mt-4 border-t border-border pt-3">
                <p className="break-words text-sm font-medium">
                    {transaction.description}
                </p>
                <p className="mt-1 break-words text-xs text-muted-foreground">
                    {transaction.category} · {transaction.createdBy}
                </p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-4">
                <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Type</p>
                    <div className="mt-1">
                        <TypeBadge type={transaction.type} />
                    </div>
                </div>

                <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Amount</p>
                    <p className="mt-1 break-words text-sm font-bold">
                        {formatCurrency(transaction.amount)}
                    </p>
                </div>

                <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Payment method</p>
                    <p className="mt-1 break-words text-sm font-medium">
                        {transaction.paymentMethod}
                    </p>
                </div>

                <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Date</p>
                    <p className="mt-1 text-sm font-medium">
                        {formatDate(transaction.date)}
                    </p>
                </div>
            </div>
        </article>
    );
}

export default function TransactionsReport() {
    const [transactions] = useState(initialTransactions);
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("ALL");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [methodFilter, setMethodFilter] = useState("ALL");
    const [startDate, setStartDate] = useState("2026-10-01");
    const [endDate, setEndDate] = useState("2026-10-31");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState("5");
    const [showFilters, setShowFilters] = useState(false);

    const filteredTransactions = useMemo(() => {
        const query = search.trim().toLowerCase();

        return transactions.filter((transaction) => {
            const matchesSearch =
                !query ||
                [
                    transaction.id,
                    transaction.reference,
                    transaction.description,
                    transaction.category,
                    transaction.createdBy,
                ].some((value) => value.toLowerCase().includes(query));

            const matchesType =
                typeFilter === "ALL" || transaction.type === typeFilter;
            const matchesStatus =
                statusFilter === "ALL" || transaction.status === statusFilter;
            const matchesMethod =
                methodFilter === "ALL" ||
                transaction.paymentMethod === methodFilter;
            const matchesStart = !startDate || transaction.date >= startDate;
            const matchesEnd = !endDate || transaction.date <= endDate;

            return (
                matchesSearch &&
                matchesType &&
                matchesStatus &&
                matchesMethod &&
                matchesStart &&
                matchesEnd
            );
        });
    }, [
        transactions,
        search,
        typeFilter,
        statusFilter,
        methodFilter,
        startDate,
        endDate,
    ]);

    const totals = useMemo(() => {
        const posted = filteredTransactions.filter(
            (transaction) => transaction.status === "POSTED"
        );

        const credits = posted
            .filter((transaction) => transaction.type === "CREDIT")
            .reduce((sum, transaction) => sum + transaction.amount, 0);

        const debits = posted
            .filter((transaction) => transaction.type === "DEBIT")
            .reduce((sum, transaction) => sum + transaction.amount, 0);

        const adjustments = posted
            .filter((transaction) => transaction.type === "ADJUSTMENT")
            .reduce((sum, transaction) => sum + transaction.amount, 0);

        const refunds = posted
            .filter((transaction) => transaction.type === "REFUND")
            .reduce((sum, transaction) => sum + transaction.amount, 0);

        const pending = filteredTransactions.filter(
            (transaction) => transaction.status === "PENDING"
        ).length;

        const reversed = filteredTransactions.filter(
            (transaction) => transaction.status === "REVERSED"
        ).length;

        return {
            credits,
            debits,
            adjustments,
            refunds,
            net: credits - debits - refunds,
            pending,
            reversed,
            postedCount: posted.length,
            postedEntries: posted.length,
        };
    }, [filteredTransactions]);

    const postedCount = totals.postedCount;
    const pageCount = Math.max(
        1,
        Math.ceil(filteredTransactions.length / Number(pageSize))
    );
    const currentPage = Math.min(page, pageCount);

    const paginatedTransactions = filteredTransactions.slice(
        (currentPage - 1) * Number(pageSize),
        currentPage * Number(pageSize)
    );

    const resetFilters = () => {
        setSearch("");
        setTypeFilter("ALL");
        setStatusFilter("ALL");
        setMethodFilter("ALL");
        setStartDate("");
        setEndDate("");
        setPage(1);
    };

    const exportCsv = () => {
        const headers = [
            "Transaction ID",
            "Reference",
            "Date",
            "Description",
            "Category",
            "Type",
            "Amount",
            "Status",
            "Payment Method",
            "Created By",
        ];

        const rows = filteredTransactions.map((transaction) => [
            transaction.id,
            transaction.reference,
            transaction.date,
            transaction.description,
            transaction.category,
            transaction.type,
            transaction.amount.toFixed(2),
            transaction.status,
            transaction.paymentMethod,
            transaction.createdBy,
        ]);

        const escapeCsv = (value: string | number) =>
            `"${String(value).replace(/"/g, '""')}"`;

        const csv = [headers, ...rows]
            .map((row) => row.map(escapeCsv).join(","))
            .join("\r\n");

        const blob = new Blob(["\uFEFF" + csv], {
            type: "text/csv;charset=utf-8;",
        });

        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");

        anchor.href = url;
        anchor.download = `transactions-report-${startDate || "all"}-to-${endDate || "all"}.csv`;
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        URL.revokeObjectURL(url);
    };

    const postedEntries = filteredTransactions.filter(
        (item) => item.status === "POSTED"
    ).length;

    const getPercentage = (count: number) =>
        filteredTransactions.length
            ? (count / filteredTransactions.length) * 100
            : 0;

    return (
        <main className="min-h-screen w-full min-w-0 max-w-full overflow-x-clip bg-background text-foreground">
            <div className="mx-auto w-full min-w-0 max-w-full space-y-5 p-3 sm:space-y-7 sm:p-6 lg:p-8">
                {/* Header */}
                <header className="flex min-w-0 flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="min-w-0">
                        <h1 className="break-words text-2xl font-bold tracking-tight sm:text-3xl">
                            Transaction Reports
                        </h1>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                            Review financial ledger entries, credits, debits, refunds and
                            adjustments to reconcile university accounts.
                        </p>
                    </div>

                    <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:flex-wrap">
                        <button
                            type="button"
                            onClick={resetFilters}
                            className="inline-flex min-w-0 h-10 items-center justify-center gap-2 rounded-lg border border-border px-3 text-sm font-medium hover:bg-muted"
                        >
                            <RefreshCw size={15} className="shrink-0" />
                            Reset
                        </button>
                        <button
                            type="button"
                            onClick={exportCsv}
                            className="inline-flex min-w-0 h-10 items-center justify-center gap-2 rounded-lg bg-primary px-3 text-sm font-semibold text-primary-foreground hover:opacity-90 sm:px-4"
                        >
                            <Download size={16} className="shrink-0" />
                            Export CSV
                        </button>
                    </div>
                </header>

                {/* Reporting period */}
                <section className="min-w-0 rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">
                    <div className="flex min-w-0 flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                        <div className="flex min-w-0 items-center gap-3">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <CalendarDays size={20} />
                            </div>
                            <div className="min-w-0">
                                <h2 className="text-sm font-semibold">Reporting Period</h2>
                                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                    Filter the ledger by transaction date.
                                </p>
                            </div>
                        </div>

                        <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 xl:w-[440px]">
                            <label className="min-w-0 space-y-1.5">
                                <span className="text-xs font-medium text-muted-foreground">From</span>
                                <input
                                    type="date"
                                    value={startDate}
                                    max={endDate || undefined}
                                    onChange={(event) => {
                                        setStartDate(event.target.value);
                                        setPage(1);
                                    }}
                                    className="h-10 w-full min-w-0 rounded-lg border border-border bg-background px-2 text-sm outline-none focus:border-primary sm:px-3"
                                />
                            </label>
                            <label className="min-w-0 space-y-1.5">
                                <span className="text-xs font-medium text-muted-foreground">To</span>
                                <input
                                    type="date"
                                    value={endDate}
                                    min={startDate || undefined}
                                    onChange={(event) => {
                                        setEndDate(event.target.value);
                                        setPage(1);
                                    }}
                                    className="h-10 w-full min-w-0 rounded-lg border border-border bg-background px-2 text-sm outline-none focus:border-primary sm:px-3"
                                />
                            </label>
                        </div>
                    </div>
                </section>

                {/* Summary cards */}
                <section className="grid min-w-0 grid-cols-1 gap-3 min-[420px]:grid-cols-2 xl:grid-cols-4 sm:gap-4">
                    <SummaryCard
                        title="Total Credits"
                        value={formatCurrency(totals.credits)}
                        description="Posted credit entries in this report"
                        icon={<ArrowDownLeft size={21} />}
                        iconClass="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                    />
                    <SummaryCard
                        title="Total Debits"
                        value={formatCurrency(totals.debits)}
                        description="Posted debit entries in this report"
                        icon={<ArrowUpRight size={21} />}
                        iconClass="bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400"
                    />
                    <SummaryCard
                        title="Adjustments"
                        value={formatCurrency(totals.adjustments)}
                        description="Posted adjustment entries"
                        icon={<RefreshCw size={21} />}
                        iconClass="bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-400"
                    />
                    <SummaryCard
                        title="Net Movement"
                        value={formatCurrency(totals.net)}
                        description="Credits minus debits and refunds"
                        icon={<Wallet size={21} />}
                        iconClass="bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400"
                    />
                </section>

                {/* Reconciliation overview */}
                <section className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-3 sm:gap-6">
                    <div className="min-w-0 rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5 xl:col-span-2">
                        <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <SectionTitle
                                title="Ledger Reconciliation"
                                description="A summary of the currently filtered transaction records."
                            />
                            <span className="inline-flex w-fit max-w-full items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                                <ShieldCheck size={14} className="shrink-0" />
                                Posted entries
                            </span>
                        </div>

                        <div className="mt-5 grid min-w-0 grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:grid-cols-3 sm:gap-4">
                            <div className="min-w-0 rounded-lg border border-border p-3 sm:p-4">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <ArrowDownLeft size={16} className="shrink-0 text-emerald-600" />
                                    Credit entries
                                </div>
                                <p className="mt-3 break-words text-lg font-bold sm:text-xl">
                                    {formatCurrency(totals.credits)}
                                </p>
                                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                    {postedCount} posted entries across all types
                                </p>
                            </div>

                            <div className="min-w-0 rounded-lg border border-border p-3 sm:p-4">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <ArrowUpRight size={16} className="shrink-0 text-red-600" />
                                    Debit entries
                                </div>
                                <p className="mt-3 break-words text-lg font-bold sm:text-xl">
                                    {formatCurrency(totals.debits)}
                                </p>
                                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                    Posted debits only
                                </p>
                            </div>

                            <div className="min-w-0 rounded-lg border border-border p-3 sm:p-4 min-[420px]:col-span-2 sm:col-span-1">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <CircleDollarSign size={16} className="shrink-0 text-blue-600" />
                                    Refunds
                                </div>
                                <p className="mt-3 break-words text-lg font-bold sm:text-xl">
                                    {formatCurrency(totals.refunds)}
                                </p>
                                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                    Posted refund entries
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 rounded-lg bg-muted/50 p-3 sm:mt-5 sm:p-4">
                            <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold">Net ledger movement</p>
                                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                        Credits − Debits − Refunds. Adjustments are shown separately.
                                    </p>
                                </div>
                                <p className={`break-words text-xl font-bold sm:shrink-0 ${totals.net >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                                    {formatCurrency(totals.net)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="min-w-0 rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">
                        <SectionTitle
                            title="Entry Status"
                            description="Filtered ledger status breakdown"
                        />

                        <div className="mt-5 space-y-4">
                            <div>
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="size-2.5 shrink-0 rounded-full bg-emerald-500" />
                                        Posted
                                    </div>
                                    <span className="text-sm font-semibold">{postedEntries}</span>
                                </div>
                                <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                                    <div
                                        className="h-full rounded-full bg-emerald-500"
                                        style={{ width: `${getPercentage(postedEntries)}%` }}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="size-2.5 shrink-0 rounded-full bg-amber-500" />
                                        Pending
                                    </div>
                                    <span className="text-sm font-semibold">{totals.pending}</span>
                                </div>
                                <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                                    <div
                                        className="h-full rounded-full bg-amber-500"
                                        style={{ width: `${getPercentage(totals.pending)}%` }}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="size-2.5 shrink-0 rounded-full bg-red-500" />
                                        Reversed
                                    </div>
                                    <span className="text-sm font-semibold">{totals.reversed}</span>
                                </div>
                                <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                                    <div
                                        className="h-full rounded-full bg-red-500"
                                        style={{ width: `${getPercentage(totals.reversed)}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 border-t border-border pt-4">
                            <p className="text-xs leading-5 text-muted-foreground">
                                Pending entries are excluded from posted ledger totals.
                                Reversed entries remain visible for audit purposes.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Transaction ledger */}
                <section className="min-w-0 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                    <div className="flex min-w-0 flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
                        <SectionTitle
                            title="Transaction Ledger"
                            description={`${filteredTransactions.length} entries match your filters.`}
                        />

                        <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto">
                            <button
                                type="button"
                                onClick={() => setShowFilters((previous) => !previous)}
                                aria-expanded={showFilters}
                                className={`inline-flex h-10 min-w-0 items-center justify-center gap-2 rounded-lg border px-3 text-sm font-medium hover:bg-muted ${showFilters ? "border-primary text-primary" : "border-border"
                                    }`}
                            >
                                <SlidersHorizontal size={16} className="shrink-0" />
                                Filters
                                <ChevronDown
                                    size={14}
                                    className={`shrink-0 transition-transform ${showFilters ? "rotate-180" : ""}`}
                                />
                            </button>
                            <button
                                type="button"
                                onClick={exportCsv}
                                className="inline-flex h-10 min-w-0 items-center justify-center gap-2 rounded-lg border border-border px-3 text-sm font-medium hover:bg-muted"
                            >
                                <FileSpreadsheet size={16} className="shrink-0" />
                                Export
                            </button>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="px-4 pb-4 sm:px-5">
                        <div className="flex h-11 w-full min-w-0 items-center gap-2 rounded-lg border border-border px-3 focus-within:border-primary sm:max-w-md">
                            <Search size={16} className="shrink-0 text-muted-foreground" />
                            <input
                                type="search"
                                value={search}
                                onChange={(event) => {
                                    setSearch(event.target.value);
                                    setPage(1);
                                }}
                                placeholder="Search ID, reference, description..."
                                className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                            />
                            {search && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearch("");
                                        setPage(1);
                                    }}
                                    aria-label="Clear search"
                                    className="shrink-0 text-muted-foreground hover:text-foreground"
                                >
                                    <X size={15} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Filters */}
                    {showFilters && (
                        <div className="grid min-w-0 grid-cols-1 gap-3 border-y border-border bg-muted/20 p-4 min-[420px]:grid-cols-2 xl:grid-cols-4 sm:p-5">
                            <label className="min-w-0 space-y-1.5">
                                <span className="text-xs font-medium text-muted-foreground">Transaction Type</span>
                                <select
                                    value={typeFilter}
                                    onChange={(event) => {
                                        setTypeFilter(event.target.value);
                                        setPage(1);
                                    }}
                                    className="h-10 w-full min-w-0 rounded-lg border border-border bg-background px-2 text-sm sm:px-3"
                                >
                                    <option value="ALL">All types</option>
                                    <option value="CREDIT">Credit</option>
                                    <option value="DEBIT">Debit</option>
                                    <option value="ADJUSTMENT">Adjustment</option>
                                    <option value="REFUND">Refund</option>
                                </select>
                            </label>

                            <label className="min-w-0 space-y-1.5">
                                <span className="text-xs font-medium text-muted-foreground">Status</span>
                                <select
                                    value={statusFilter}
                                    onChange={(event) => {
                                        setStatusFilter(event.target.value);
                                        setPage(1);
                                    }}
                                    className="h-10 w-full min-w-0 rounded-lg border border-border bg-background px-2 text-sm sm:px-3"
                                >
                                    <option value="ALL">All statuses</option>
                                    <option value="POSTED">Posted</option>
                                    <option value="PENDING">Pending</option>
                                    <option value="REVERSED">Reversed</option>
                                </select>
                            </label>

                            <label className="min-w-0 space-y-1.5">
                                <span className="text-xs font-medium text-muted-foreground">Payment Method</span>
                                <select
                                    value={methodFilter}
                                    onChange={(event) => {
                                        setMethodFilter(event.target.value);
                                        setPage(1);
                                    }}
                                    className="h-10 w-full min-w-0 rounded-lg border border-border bg-background px-2 text-sm sm:px-3"
                                >
                                    <option value="ALL">All methods</option>
                                    <option value="SSLCommerz">SSLCommerz</option>
                                    <option value="bKash">bKash</option>
                                    <option value="Card">Card</option>
                                    <option value="Bank Transfer">Bank Transfer</option>
                                    <option value="Internal">Internal</option>
                                </select>
                            </label>

                            <div className="flex min-w-0 items-end">
                                <button
                                    type="button"
                                    onClick={resetFilters}
                                    className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-border px-3 text-sm font-medium hover:bg-muted"
                                >
                                    <RefreshCw size={15} />
                                    Clear filters
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Desktop/tablet table */}
                    <div className="hidden w-full min-w-0 overflow-x-auto md:block">
                        <table className="w-full min-w-[850px] text-left text-sm">
                            <thead>
                                <tr className="border-y border-border bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                                    <th className="px-4 py-3 font-medium lg:px-5">Transaction</th>
                                    <th className="px-4 py-3 font-medium">Description</th>
                                    <th className="px-4 py-3 font-medium">Type</th>
                                    <th className="px-4 py-3 font-medium">Method</th>
                                    <th className="px-4 py-3 font-medium">Date</th>
                                    <th className="px-4 py-3 font-medium">Amount</th>
                                    <th className="px-4 py-3 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedTransactions.map((transaction) => (
                                    <tr
                                        key={transaction.id}
                                        className="border-b border-border transition last:border-0 hover:bg-muted/30"
                                    >
                                        <td className="px-4 py-4 lg:px-5">
                                            <p className="font-semibold">{transaction.id}</p>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                Ref: {transaction.reference}
                                            </p>
                                        </td>
                                        <td className="px-4 py-4">
                                            <p className="max-w-[250px] font-medium">
                                                {transaction.description}
                                            </p>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {transaction.category} · {transaction.createdBy}
                                            </p>
                                        </td>
                                        <td className="px-4 py-4">
                                            <TypeBadge type={transaction.type} />
                                        </td>
                                        <td className="px-4 py-4 text-muted-foreground">
                                            {transaction.paymentMethod}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-4 text-muted-foreground">
                                            {formatDate(transaction.date)}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-4 font-semibold">
                                            {formatCurrency(transaction.amount)}
                                        </td>
                                        <td className="px-4 py-4">
                                            <StatusBadge status={transaction.status} />
                                        </td>
                                    </tr>
                                ))}

                                {paginatedTransactions.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="px-5 py-16 text-center">
                                            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted">
                                                <ListFilter size={22} className="text-muted-foreground" />
                                            </div>
                                            <p className="mt-3 font-semibold">No transactions found</p>
                                            <p className="mt-1 text-sm text-muted-foreground">
                                                Try changing the date range or filters.
                                            </p>
                                            <button
                                                type="button"
                                                onClick={resetFilters}
                                                className="mt-3 text-sm font-semibold text-primary hover:underline"
                                            >
                                                Reset filters
                                            </button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile transaction cards */}
                    <div className="grid min-w-0 grid-cols-1 gap-3 px-3 pb-4 md:hidden">
                        {paginatedTransactions.map((transaction) => (
                            <TransactionCard
                                key={transaction.id}
                                transaction={transaction}
                            />
                        ))}

                        {paginatedTransactions.length === 0 && (
                            <div className="px-3 py-10 text-center">
                                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted">
                                    <ListFilter size={22} className="text-muted-foreground" />
                                </div>
                                <p className="mt-3 font-semibold">No transactions found</p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Try changing the date range or filters.
                                </p>
                                <button
                                    type="button"
                                    onClick={resetFilters}
                                    className="mt-3 text-sm font-semibold text-primary hover:underline"
                                >
                                    Reset filters
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="flex min-w-0 flex-col gap-4 border-t border-border px-4 py-4 sm:px-5 md:flex-row md:items-center md:justify-between">
                        <div className="flex min-w-0 flex-wrap items-center gap-2 text-sm text-muted-foreground">
                            <label htmlFor="pageSize" className="shrink-0">Rows per page</label>
                            <select
                                id="pageSize"
                                value={pageSize}
                                onChange={(event) => {
                                    setPageSize(event.target.value);
                                    setPage(1);
                                }}
                                className="h-9 rounded-lg border border-border bg-background px-2 text-sm text-foreground"
                            >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                            </select>
                            <span className="min-w-0 break-words">
                                {filteredTransactions.length === 0
                                    ? "0 results"
                                    : `${(currentPage - 1) * Number(pageSize) + 1}–${Math.min(
                                        currentPage * Number(pageSize),
                                        filteredTransactions.length
                                    )} of ${filteredTransactions.length}`}
                            </span>
                        </div>

                        <div className="flex w-full items-center justify-between gap-2 md:w-auto md:justify-end">
                            <button
                                type="button"
                                aria-label="Previous page"
                                disabled={currentPage <= 1}
                                onClick={() =>
                                    setPage((previous) => Math.max(1, previous - 1))
                                }
                                className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <ChevronLeft size={17} />
                            </button>

                            <span className="min-w-0 text-center text-sm font-medium">
                                Page {currentPage} of {pageCount}
                            </span>

                            <button
                                type="button"
                                aria-label="Next page"
                                disabled={currentPage >= pageCount}
                                onClick={() =>
                                    setPage((previous) => Math.min(pageCount, previous + 1))
                                }
                                className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <ChevronRight size={17} />
                            </button>
                        </div>
                    </div>
                </section>

                {/* Footer audit note */}
                <div className="flex min-w-0 items-start gap-2 rounded-lg border border-border bg-muted/30 p-3 text-xs leading-5 text-muted-foreground sm:p-4">
                    <ShieldCheck size={17} className="mt-0.5 shrink-0" />
                    <p className="min-w-0 break-words">
                        Audit note: Pending entries are excluded from posted totals.
                        Reversed entries remain available for audit review. These figures
                        are illustrative demo data; connect the report to your verified
                        financial ledger before using it for actual accounting.
                    </p>
                </div>
            </div>
        </main>
    );
}
