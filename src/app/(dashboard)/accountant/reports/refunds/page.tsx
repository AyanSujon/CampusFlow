// import React from 'react'

// export default function refundsReport() {
//     return (
//         <div>refundsReport</div>
//     )
// }















// "use client";

// import React, { useMemo, useState } from "react";
// import Link from "next/link";
// import {
//     ArrowDownToLine,
//     ArrowDownRight,
//     ArrowUpRight,
//     CalendarDays,
//     CheckCircle2,
//     ChevronDown,
//     Clock3,
//     Download,
//     Eye,
//     FileText,
//     Filter,
//     RefreshCw,
//     RotateCcw,
//     Search,
//     TrendingDown,
//     Wallet,
//     XCircle,
// } from "lucide-react";
// import {
//     Area,
//     AreaChart,
//     CartesianGrid,
//     ResponsiveContainer,
//     Tooltip,
//     XAxis,
//     YAxis,
// } from "recharts";

// type RefundStatus =
//     | "COMPLETED"
//     | "PENDING"
//     | "PROCESSING"
//     | "REJECTED";

// type RefundRecord = {
//     id: string;
//     refundNumber: string;
//     paymentId: string;
//     invoiceId: string;
//     studentName: string;
//     studentId: string;
//     reason: string;
//     method: string;
//     amount: number;
//     requestedAt: string;
//     processedAt: string | null;
//     status: RefundStatus;
// };

// const initialRefunds: RefundRecord[] = [
//     {
//         id: "1",
//         refundNumber: "REF-2026-0012",
//         paymentId: "PAY-2026-1042",
//         invoiceId: "INV-2026-0081",
//         studentName: "Ayan Sujon",
//         studentId: "STU-2026-0012",
//         reason: "Duplicate payment",
//         method: "SSLCommerz",
//         amount: 5000,
//         requestedAt: "2026-10-09",
//         processedAt: "2026-10-10",
//         status: "COMPLETED",
//     },
//     {
//         id: "2",
//         refundNumber: "REF-2026-0011",
//         paymentId: "PAY-2026-1038",
//         invoiceId: "INV-2026-0077",
//         studentName: "Nusrat Jahan",
//         studentId: "STU-2025-0048",
//         reason: "Excess fee payment",
//         method: "bKash",
//         amount: 3500,
//         requestedAt: "2026-10-09",
//         processedAt: null,
//         status: "PENDING",
//     },
//     {
//         id: "3",
//         refundNumber: "REF-2026-0010",
//         paymentId: "PAY-2026-1032",
//         invoiceId: "INV-2026-0070",
//         studentName: "Rahim Ahmed",
//         studentId: "STU-2024-0091",
//         reason: "Course registration cancellation",
//         method: "Bank Transfer",
//         amount: 8500,
//         requestedAt: "2026-10-08",
//         processedAt: "2026-10-10",
//         status: "COMPLETED",
//     },
//     {
//         id: "4",
//         refundNumber: "REF-2026-0009",
//         paymentId: "PAY-2026-1027",
//         invoiceId: "INV-2026-0066",
//         studentName: "Maliha Islam",
//         studentId: "STU-2026-0035",
//         reason: "Incorrect fee charge",
//         method: "Card",
//         amount: 2500,
//         requestedAt: "2026-10-07",
//         processedAt: null,
//         status: "PROCESSING",
//     },
//     {
//         id: "5",
//         refundNumber: "REF-2026-0008",
//         paymentId: "PAY-2026-1021",
//         invoiceId: "INV-2026-0060",
//         studentName: "Tanvir Hasan",
//         studentId: "STU-2025-0021",
//         reason: "Refund policy not applicable",
//         method: "SSLCommerz",
//         amount: 2000,
//         requestedAt: "2026-10-06",
//         processedAt: null,
//         status: "REJECTED",
//     },
//     {
//         id: "6",
//         refundNumber: "REF-2026-0007",
//         paymentId: "PAY-2026-1015",
//         invoiceId: "INV-2026-0054",
//         studentName: "Sadia Akter",
//         studentId: "STU-2024-0019",
//         reason: "Excess fee payment",
//         method: "bKash",
//         amount: 4000,
//         requestedAt: "2026-10-05",
//         processedAt: "2026-10-06",
//         status: "COMPLETED",
//     },
// ];

// const monthlyRefunds = [
//     { month: "May", amount: 18000, count: 4 },
//     { month: "Jun", amount: 12000, count: 3 },
//     { month: "Jul", amount: 24000, count: 6 },
//     { month: "Aug", amount: 16000, count: 4 },
//     { month: "Sep", amount: 21000, count: 5 },
//     { month: "Oct", amount: 12000, count: 3 },
// ];

// const currency = (amount: number) =>
//     new Intl.NumberFormat("en-BD", {
//         style: "currency",
//         currency: "BDT",
//         maximumFractionDigits: 0,
//     }).format(amount);

// const dateLabel = (value: string | null) => {
//     if (!value) return "—";

//     return new Date(`${value}T00:00:00`).toLocaleDateString("en-GB", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//     });
// };

// function StatusBadge({ status }: { status: RefundStatus }) {
//     const styles: Record<RefundStatus, string> = {
//         COMPLETED:
//             "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-400",
//         PENDING:
//             "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-400",
//         PROCESSING:
//             "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-400",
//         REJECTED:
//             "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-400",
//     };

//     const Icon = {
//         COMPLETED: CheckCircle2,
//         PENDING: Clock3,
//         PROCESSING: RefreshCw,
//         REJECTED: XCircle,
//     }[status];

//     return (
//         <span
//             className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-semibold ${styles[status]}`}
//         >
//             <Icon size={13} />
//             {status.charAt(0) + status.slice(1).toLowerCase()}
//         </span>
//     );
// }

// function SummaryCard({
//     title,
//     value,
//     description,
//     icon: Icon,
//     tone,
//     trend,
// }: {
//     title: string;
//     value: string;
//     description: string;
//     icon: React.ElementType;
//     tone: string;
//     trend?: string;
// }) {
//     return (
//         <div className="min-w-0 rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">
//             <div className="flex items-start justify-between gap-3">
//                 <div className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${tone}`}>
//                     <Icon size={21} />
//                 </div>
//                 {trend && (
//                     <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
//                         <ArrowDownRight size={14} />
//                         {trend}
//                     </span>
//                 )}
//             </div>
//             <p className="mt-4 text-sm text-muted-foreground">{title}</p>
//             <p className="mt-1 break-words text-2xl font-bold tracking-tight">{value}</p>
//             <p className="mt-2 text-xs leading-5 text-muted-foreground">{description}</p>
//         </div>
//     );
// }

// function SectionTitle({
//     title,
//     description,
//     action,
// }: {
//     title: string;
//     description: string;
//     action?: React.ReactNode;
// }) {
//     return (
//         <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
//             <div>
//                 <h2 className="text-base font-semibold tracking-tight">{title}</h2>
//                 <p className="mt-1 text-sm text-muted-foreground">{description}</p>
//             </div>
//             {action}
//         </div>
//     );
// }

// export default function RefundsReport() {
//     const [refunds] = useState<RefundRecord[]>(initialRefunds);
//     const [search, setSearch] = useState("");
//     const [statusFilter, setStatusFilter] = useState("ALL");
//     const [methodFilter, setMethodFilter] = useState("ALL");
//     const [dateRange, setDateRange] = useState("ALL");
//     const [currentPage, setCurrentPage] = useState(1);

//     const pageSize = 5;

//     const filteredRefunds = useMemo(() => {
//         const now = new Date("2026-10-10T23:59:59");

//         return refunds.filter((refund) => {
//             const query = search.trim().toLowerCase();

//             const matchesSearch =
//                 !query ||
//                 [
//                     refund.refundNumber,
//                     refund.paymentId,
//                     refund.invoiceId,
//                     refund.studentName,
//                     refund.studentId,
//                     refund.reason,
//                 ].some((value) => value.toLowerCase().includes(query));

//             const matchesStatus =
//                 statusFilter === "ALL" || refund.status === statusFilter;

//             const matchesMethod =
//                 methodFilter === "ALL" || refund.method === methodFilter;

//             const requestedDate = new Date(`${refund.requestedAt}T00:00:00`);

//             const matchesDate =
//                 dateRange === "ALL" ||
//                 (dateRange === "7D" &&
//                     requestedDate >= new Date(now.getTime() - 7 * 86400000)) ||
//                 (dateRange === "30D" &&
//                     requestedDate >= new Date(now.getTime() - 30 * 86400000)) ||
//                 (dateRange === "90D" &&
//                     requestedDate >= new Date(now.getTime() - 90 * 86400000));

//             return matchesSearch && matchesStatus && matchesMethod && matchesDate;
//         });
//     }, [refunds, search, statusFilter, methodFilter, dateRange]);

//     const totalPages = Math.max(1, Math.ceil(filteredRefunds.length / pageSize));
//     const safePage = Math.min(currentPage, totalPages);

//     const paginatedRefunds = filteredRefunds.slice(
//         (safePage - 1) * pageSize,
//         safePage * pageSize,
//     );

//     const completed = refunds.filter((item) => item.status === "COMPLETED");
//     const pending = refunds.filter(
//         (item) => item.status === "PENDING" || item.status === "PROCESSING",
//     );
//     const rejected = refunds.filter((item) => item.status === "REJECTED");

//     const completedAmount = completed.reduce((sum, item) => sum + item.amount, 0);
//     const pendingAmount = pending.reduce((sum, item) => sum + item.amount, 0);
//     const rejectedAmount = rejected.reduce((sum, item) => sum + item.amount, 0);
//     const totalRequested = refunds.reduce((sum, item) => sum + item.amount, 0);

//     const statusCounts = [
//         {
//             label: "Completed",
//             count: completed.length,
//             amount: completedAmount,
//             color: "bg-emerald-500",
//             text: "text-emerald-600",
//         },
//         {
//             label: "Pending / Processing",
//             count: pending.length,
//             amount: pendingAmount,
//             color: "bg-amber-500",
//             text: "text-amber-600",
//         },
//         {
//             label: "Rejected",
//             count: rejected.length,
//             amount: rejectedAmount,
//             color: "bg-red-500",
//             text: "text-red-600",
//         },
//     ];

//     const exportCsv = () => {
//         const headers = [
//             "Refund Number",
//             "Student",
//             "Student ID",
//             "Payment ID",
//             "Invoice ID",
//             "Reason",
//             "Method",
//             "Amount",
//             "Requested At",
//             "Processed At",
//             "Status",
//         ];

//         const rows = filteredRefunds.map((item) => [
//             item.refundNumber,
//             item.studentName,
//             item.studentId,
//             item.paymentId,
//             item.invoiceId,
//             item.reason,
//             item.method,
//             item.amount,
//             item.requestedAt,
//             item.processedAt ?? "",
//             item.status,
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
//         const link = document.createElement("a");
//         link.href = url;
//         link.download = "campusflow-refunds-report.csv";
//         link.click();
//         URL.revokeObjectURL(url);
//     };

//     const resetFilters = () => {
//         setSearch("");
//         setStatusFilter("ALL");
//         setMethodFilter("ALL");
//         setDateRange("ALL");
//         setCurrentPage(1);
//     };

//     return (
//         <main className="min-h-screen w-full min-w-0 overflow-x-clip bg-background text-foreground">
//             <div className="mx-auto w-full min-w-0 max-w-full space-y-6 p-3 sm:p-5 lg:p-6 xl:p-8">
//                 {/* Header */}
//                 <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
//                     <div className="min-w-0">

//                         <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
//                             Refunds Report
//                         </h1>
//                         <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
//                             Track refunded amounts, refund requests, processing status and
//                             payment methods across student accounts.
//                         </p>
//                     </div>

//                     <div className="flex flex-wrap items-center gap-2">
//                         <Link
//                             href="/accountant/refunds"
//                             className="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-3 text-sm font-medium transition hover:bg-muted"
//                         >
//                             <RotateCcw size={16} />
//                             Manage Refunds
//                         </Link>
//                         <button
//                             type="button"
//                             onClick={exportCsv}
//                             className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
//                         >
//                             <Download size={16} />
//                             Export CSV
//                         </button>
//                     </div>
//                 </div>

//                 {/* Summary Cards */}
//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
//                     <SummaryCard
//                         title="Total Refund Requests"
//                         value={String(refunds.length)}
//                         description="All recorded refund requests"
//                         icon={FileText}
//                         tone="bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400"
//                     />
//                     <SummaryCard
//                         title="Refunds Processed"
//                         value={currency(completedAmount)}
//                         description={`${completed.length} completed refund requests`}
//                         icon={CheckCircle2}
//                         tone="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
//                         trend="Completed"
//                     />
//                     <SummaryCard
//                         title="Pending Refund Amount"
//                         value={currency(pendingAmount)}
//                         description={`${pending.length} requests pending or processing`}
//                         icon={Clock3}
//                         tone="bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400"
//                     />
//                     <SummaryCard
//                         title="Total Requested Amount"
//                         value={currency(totalRequested)}
//                         description={`${currency(rejectedAmount)} in rejected requests`}
//                         icon={Wallet}
//                         tone="bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-400"
//                     />
//                 </div>

//                 {/* Chart and Status Breakdown */}
//                 <div className="grid w-full min-w-0 max-w-full grid-cols-1 gap-5 xl:grid-cols-3">
//                     <section className="min-w-0 rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5 xl:col-span-2">
//                         <SectionTitle
//                             title="Monthly Refund Trend"
//                             description="Refund amounts across the last six months"
//                         />

//                         <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
//                             <div className="rounded-lg bg-muted/50 p-3">
//                                 <p className="text-xs text-muted-foreground">
//                                     Current month
//                                 </p>
//                                 <p className="mt-1 text-lg font-bold">৳12,000</p>
//                                 <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
//                                     <TrendingDown size={13} />
//                                     October demo data
//                                 </p>
//                             </div>
//                             <div className="rounded-lg bg-muted/50 p-3">
//                                 <p className="text-xs text-muted-foreground">
//                                     Average monthly refund
//                                 </p>
//                                 <p className="mt-1 text-lg font-bold">
//                                     {currency(
//                                         monthlyRefunds.reduce((sum, item) => sum + item.amount, 0) /
//                                         monthlyRefunds.length,
//                                     )}
//                                 </p>
//                             </div>
//                             <div className="rounded-lg bg-muted/50 p-3">
//                                 <p className="text-xs text-muted-foreground">
//                                     Current month requests
//                                 </p>
//                                 <p className="mt-1 text-lg font-bold">3</p>
//                             </div>
//                         </div>

//                         <div className="h-[260px] w-full">
//                             <ResponsiveContainer width="100%" height="100%">
//                                 <AreaChart
//                                     data={monthlyRefunds}
//                                     margin={{ top: 8, right: 8, left: 2, bottom: 0 }}
//                                 >
//                                     <defs>
//                                         <linearGradient
//                                             id="refundGradient"
//                                             x1="0"
//                                             y1="0"
//                                             x2="0"
//                                             y2="1"
//                                         >
//                                             <stop offset="0%" stopColor="#0d9488" stopOpacity={0.25} />
//                                             <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
//                                         </linearGradient>
//                                     </defs>
//                                     <CartesianGrid
//                                         stroke="currentColor"
//                                         strokeOpacity={0.1}
//                                         vertical={false}
//                                     />
//                                     <XAxis
//                                         dataKey="month"
//                                         axisLine={false}
//                                         tickLine={false}
//                                         tick={{ fill: "currentColor", fontSize: 12, opacity: 0.65 }}
//                                         dy={8}
//                                     />
//                                     <YAxis
//                                         axisLine={false}
//                                         tickLine={false}
//                                         width={45}
//                                         tick={{ fill: "currentColor", fontSize: 11, opacity: 0.65 }}
//                                         tickFormatter={(value) => `${value / 1000}k`}
//                                     />
//                                     <Tooltip
//                                         formatter={(value, name) => [
//                                             name === "amount"
//                                                 ? currency(Number(value))
//                                                 : Number(value),
//                                             name === "amount" ? "Refund amount" : "Requests",
//                                         ]}
//                                         contentStyle={{
//                                             borderRadius: 12,
//                                             border: "1px solid var(--border)",
//                                             background: "var(--card)",
//                                             color: "var(--card-foreground)",
//                                             fontSize: 12,
//                                         }}
//                                     />
//                                     <Area
//                                         type="monotone"
//                                         dataKey="amount"
//                                         name="amount"
//                                         data={monthlyRefunds.map((item) => ({
//                                             ...item,
//                                             amount: item.amount,
//                                         }))}
//                                         stroke="#0d9488"
//                                         strokeWidth={2.5}
//                                         fill="url(#refundGradient)"
//                                     />
//                                 </AreaChart>
//                             </ResponsiveContainer>
//                         </div>
//                     </section>

//                     <section className="min-w-0 rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">
//                         <SectionTitle
//                             title="Refund Status Breakdown"
//                             description="Distribution by current status"
//                         />

//                         <div className="space-y-5">
//                             {statusCounts.map((item) => {
//                                 const percent =
//                                     refunds.length > 0
//                                         ? (item.count / refunds.length) * 100
//                                         : 0;

//                                 return (
//                                     <div key={item.label}>
//                                         <div className="mb-2 flex items-center justify-between gap-3">
//                                             <span className="text-sm font-medium">
//                                                 {item.label}
//                                             </span>
//                                             <span className="text-sm font-semibold">
//                                                 {item.count}
//                                             </span>
//                                         </div>
//                                         <div className="h-2 overflow-hidden rounded-full bg-muted">
//                                             <div
//                                                 className={`h-full rounded-full ${item.color}`}
//                                                 style={{ width: `${percent}%` }}
//                                             />
//                                         </div>
//                                         <p className={`mt-2 text-xs font-medium ${item.text}`}>
//                                             {currency(item.amount)}
//                                         </p>
//                                     </div>
//                                 );
//                             })}
//                         </div>

//                         <div className="mt-6 rounded-xl border border-border p-4">
//                             <p className="text-sm text-muted-foreground">
//                                 Total requested
//                             </p>
//                             <p className="mt-1 text-2xl font-bold">
//                                 {currency(totalRequested)}
//                             </p>
//                             <p className="mt-2 text-xs leading-5 text-muted-foreground">
//                                 Requested amounts include completed, pending, processing and
//                                 rejected requests. Only completed refunds count as processed.
//                             </p>
//                         </div>
//                     </section>
//                 </div>

//                 {/* Refund Records */}
//                 <section className="min-w-0 rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">
//                     <SectionTitle
//                         title="Refund Records"
//                         description="Search and filter refund requests and completed refunds"
//                         action={
//                             <button
//                                 type="button"
//                                 onClick={resetFilters}
//                                 className="inline-flex h-9 items-center gap-2 rounded-lg border border-border px-3 text-sm font-medium transition hover:bg-muted"
//                             >
//                                 <RefreshCw size={14} />
//                                 Reset filters
//                             </button>
//                         }
//                     />

//                     {/* Filters */}
//                     <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
//                         <div className="flex h-10 min-w-0 items-center gap-2 rounded-lg border border-border px-3">
//                             <Search size={16} className="shrink-0 text-muted-foreground" />
//                             <input
//                                 type="search"
//                                 value={search}
//                                 onChange={(event) => {
//                                     setSearch(event.target.value);
//                                     setCurrentPage(1);
//                                 }}
//                                 placeholder="Search refund, student..."
//                                 className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
//                                 aria-label="Search refund records"
//                             />
//                         </div>

//                         <div className="relative">
//                             <Filter
//                                 size={15}
//                                 className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
//                             />
//                             <select
//                                 value={statusFilter}
//                                 onChange={(event) => {
//                                     setStatusFilter(event.target.value);
//                                     setCurrentPage(1);
//                                 }}
//                                 className="h-10 w-full appearance-none rounded-lg border border-border bg-background pl-9 pr-8 text-sm outline-none focus:ring-2 focus:ring-primary/20"
//                                 aria-label="Filter by refund status"
//                             >
//                                 <option value="ALL">All statuses</option>
//                                 <option value="COMPLETED">Completed</option>
//                                 <option value="PENDING">Pending</option>
//                                 <option value="PROCESSING">Processing</option>
//                                 <option value="REJECTED">Rejected</option>
//                             </select>
//                             <ChevronDown
//                                 size={14}
//                                 className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
//                             />
//                         </div>

//                         <div className="relative">
//                             <Wallet
//                                 size={15}
//                                 className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
//                             />
//                             <select
//                                 value={methodFilter}
//                                 onChange={(event) => {
//                                     setMethodFilter(event.target.value);
//                                     setCurrentPage(1);
//                                 }}
//                                 className="h-10 w-full appearance-none rounded-lg border border-border bg-background pl-9 pr-8 text-sm outline-none focus:ring-2 focus:ring-primary/20"
//                                 aria-label="Filter by payment method"
//                             >
//                                 <option value="ALL">All methods</option>
//                                 <option value="SSLCommerz">SSLCommerz</option>
//                                 <option value="bKash">bKash</option>
//                                 <option value="Bank Transfer">Bank Transfer</option>
//                                 <option value="Card">Card</option>
//                             </select>
//                             <ChevronDown
//                                 size={14}
//                                 className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
//                             />
//                         </div>

//                         <div className="relative">
//                             <CalendarDays
//                                 size={15}
//                                 className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
//                             />
//                             <select
//                                 value={dateRange}
//                                 onChange={(event) => {
//                                     setDateRange(event.target.value);
//                                     setCurrentPage(1);
//                                 }}
//                                 className="h-10 w-full appearance-none rounded-lg border border-border bg-background pl-9 pr-8 text-sm outline-none focus:ring-2 focus:ring-primary/20"
//                                 aria-label="Filter by date range"
//                             >
//                                 <option value="ALL">All dates</option>
//                                 <option value="7D">Last 7 days</option>
//                                 <option value="30D">Last 30 days</option>
//                                 <option value="90D">Last 90 days</option>
//                             </select>
//                             <ChevronDown
//                                 size={14}
//                                 className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
//                             />
//                         </div>
//                     </div>

//                     {/* Responsive table */}
//                     <div className="w-full min-w-0 max-w-full overflow-x-auto overscroll-x-contain rounded-lg border border-border">
//                         <table className="w-full min-w-[1050px] table-auto text-left text-sm">
//                             <thead>
//                                 <tr className="border-b border-border bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
//                                     <th className="px-4 py-3 font-medium">Refund / Student</th>
//                                     <th className="px-4 py-3 font-medium">Payment / Invoice</th>
//                                     <th className="px-4 py-3 font-medium">Reason</th>
//                                     <th className="px-4 py-3 font-medium">Method</th>
//                                     <th className="px-4 py-3 font-medium">Amount</th>
//                                     <th className="px-4 py-3 font-medium">Requested</th>
//                                     <th className="px-4 py-3 font-medium">Status</th>
//                                     <th className="px-4 py-3 text-right font-medium">Action</th>
//                                 </tr>
//                             </thead>

//                             <tbody className="divide-y divide-border">
//                                 {paginatedRefunds.map((refund) => (
//                                     <tr
//                                         key={refund.id}
//                                         className="transition hover:bg-muted/30"
//                                     >
//                                         <td className="px-4 py-4">
//                                             <p className="font-semibold">{refund.refundNumber}</p>
//                                             <p className="mt-1 whitespace-nowrap text-xs text-muted-foreground">
//                                                 {refund.studentName}
//                                             </p>
//                                             <p className="mt-1 text-xs text-muted-foreground">
//                                                 {refund.studentId}
//                                             </p>
//                                         </td>

//                                         <td className="px-4 py-4">
//                                             <p className="whitespace-nowrap font-medium">
//                                                 {refund.paymentId}
//                                             </p>
//                                             <p className="mt-1 text-xs text-muted-foreground">
//                                                 {refund.invoiceId}
//                                             </p>
//                                         </td>

//                                         <td className="max-w-[200px] px-4 py-4">
//                                             <span className="line-clamp-2 text-muted-foreground">
//                                                 {refund.reason}
//                                             </span>
//                                         </td>

//                                         <td className="px-4 py-4 whitespace-nowrap">
//                                             {refund.method}
//                                         </td>

//                                         <td className="px-4 py-4 whitespace-nowrap font-semibold">
//                                             {currency(refund.amount)}
//                                         </td>

//                                         <td className="px-4 py-4 whitespace-nowrap text-muted-foreground">
//                                             {dateLabel(refund.requestedAt)}
//                                         </td>

//                                         <td className="px-4 py-4">
//                                             <StatusBadge status={refund.status} />
//                                         </td>

//                                         <td className="px-4 py-4 text-right">
//                                             <Link
//                                                 href={`/accountant/refunds/${refund.id}`}
//                                                 aria-label={`View refund ${refund.refundNumber}`}
//                                                 title="View refund details"
//                                                 className="inline-flex size-9 items-center justify-center rounded-lg border border-border transition hover:bg-muted"
//                                             >
//                                                 <Eye size={16} />
//                                             </Link>
//                                         </td>
//                                     </tr>
//                                 ))}

//                                 {paginatedRefunds.length === 0 && (
//                                     <tr>
//                                         <td colSpan={8} className="px-4 py-14 text-center">
//                                             <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted">
//                                                 <Search
//                                                     size={21}
//                                                     className="text-muted-foreground"
//                                                 />
//                                             </div>
//                                             <p className="mt-3 font-semibold">No refunds found</p>
//                                             <p className="mt-1 text-sm text-muted-foreground">
//                                                 Try changing your search or filters.
//                                             </p>
//                                             <button
//                                                 type="button"
//                                                 onClick={resetFilters}
//                                                 className="mt-3 text-sm font-semibold text-primary hover:underline"
//                                             >
//                                                 Clear all filters
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>

//                     {/* Pagination */}
//                     <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//                         <p className="text-sm text-muted-foreground">
//                             Showing{" "}
//                             {filteredRefunds.length === 0
//                                 ? 0
//                                 : (safePage - 1) * pageSize + 1}
//                             {" "}to{" "}
//                             {Math.min(safePage * pageSize, filteredRefunds.length)}
//                             {" "}of {filteredRefunds.length} records
//                         </p>

//                         <div className="flex items-center gap-2">
//                             <button
//                                 type="button"
//                                 disabled={safePage <= 1}
//                                 onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
//                                 className="h-9 rounded-lg border border-border px-3 text-sm font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
//                             >
//                                 Previous
//                             </button>
//                             <span className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-primary px-3 text-sm font-semibold text-primary-foreground">
//                                 {safePage}
//                             </span>
//                             <button
//                                 type="button"
//                                 disabled={safePage >= totalPages}
//                                 onClick={() =>
//                                     setCurrentPage((page) => Math.min(totalPages, page + 1))
//                                 }
//                                 className="h-9 rounded-lg border border-border px-3 text-sm font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
//                             >
//                                 Next
//                             </button>
//                         </div>
//                     </div>
//                 </section>

//                 {/* Report Footer */}
//                 <div className="flex flex-col gap-2 border-t border-border pt-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
//                     <p>CampusFlow · Accountant Reports · Refunds</p>
//                     <p>Demo report data — connect to your finance API for live figures.</p>
//                 </div>
//             </div>
//         </main>
//     );
// }
















"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
    ArrowDownRight,
    CalendarDays,
    CheckCircle2,
    ChevronDown,
    Clock3,
    Download,
    Eye,
    FileText,
    Filter,
    RefreshCw,
    RotateCcw,
    Search,
    TrendingDown,
    Wallet,
    XCircle,
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

type RefundStatus =
    | "COMPLETED"
    | "PENDING"
    | "PROCESSING"
    | "REJECTED";

type RefundRecord = {
    id: string;
    refundNumber: string;
    paymentId: string;
    invoiceId: string;
    studentName: string;
    studentId: string;
    reason: string;
    method: string;
    amount: number;
    requestedAt: string;
    processedAt: string | null;
    status: RefundStatus;
};

const initialRefunds: RefundRecord[] = [
    {
        id: "1",
        refundNumber: "REF-2026-0012",
        paymentId: "PAY-2026-1042",
        invoiceId: "INV-2026-0081",
        studentName: "Ayan Sujon",
        studentId: "STU-2026-0012",
        reason: "Duplicate payment",
        method: "SSLCommerz",
        amount: 5000,
        requestedAt: "2026-10-09",
        processedAt: "2026-10-10",
        status: "COMPLETED",
    },
    {
        id: "2",
        refundNumber: "REF-2026-0011",
        paymentId: "PAY-2026-1038",
        invoiceId: "INV-2026-0077",
        studentName: "Nusrat Jahan",
        studentId: "STU-2025-0048",
        reason: "Excess fee payment",
        method: "bKash",
        amount: 3500,
        requestedAt: "2026-10-09",
        processedAt: null,
        status: "PENDING",
    },
    {
        id: "3",
        refundNumber: "REF-2026-0010",
        paymentId: "PAY-2026-1032",
        invoiceId: "INV-2026-0070",
        studentName: "Rahim Ahmed",
        studentId: "STU-2024-0091",
        reason: "Course registration cancellation",
        method: "Bank Transfer",
        amount: 8500,
        requestedAt: "2026-10-08",
        processedAt: "2026-10-10",
        status: "COMPLETED",
    },
    {
        id: "4",
        refundNumber: "REF-2026-0009",
        paymentId: "PAY-2026-1027",
        invoiceId: "INV-2026-0066",
        studentName: "Maliha Islam",
        studentId: "STU-2026-0035",
        reason: "Incorrect fee charge",
        method: "Card",
        amount: 2500,
        requestedAt: "2026-10-07",
        processedAt: null,
        status: "PROCESSING",
    },
    {
        id: "5",
        refundNumber: "REF-2026-0008",
        paymentId: "PAY-2026-1021",
        invoiceId: "INV-2026-0060",
        studentName: "Tanvir Hasan",
        studentId: "STU-2025-0021",
        reason: "Refund policy not applicable",
        method: "SSLCommerz",
        amount: 2000,
        requestedAt: "2026-10-06",
        processedAt: null,
        status: "REJECTED",
    },
    {
        id: "6",
        refundNumber: "REF-2026-0007",
        paymentId: "PAY-2026-1015",
        invoiceId: "INV-2026-0054",
        studentName: "Sadia Akter",
        studentId: "STU-2024-0019",
        reason: "Excess fee payment",
        method: "bKash",
        amount: 4000,
        requestedAt: "2026-10-05",
        processedAt: "2026-10-06",
        status: "COMPLETED",
    },
];

const monthlyRefunds = [
    { month: "May", amount: 18000, count: 4 },
    { month: "Jun", amount: 12000, count: 3 },
    { month: "Jul", amount: 24000, count: 6 },
    { month: "Aug", amount: 16000, count: 4 },
    { month: "Sep", amount: 21000, count: 5 },
    { month: "Oct", amount: 12000, count: 3 },
];

const currency = (amount: number) =>
    new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT",
        maximumFractionDigits: 0,
    }).format(amount);

const dateLabel = (value: string | null) => {
    if (!value) return "—";

    return new Date(`${value}T00:00:00`).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

function StatusBadge({ status }: { status: RefundStatus }) {
    const styles: Record<RefundStatus, string> = {
        COMPLETED:
            "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-400",
        PENDING:
            "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-400",
        PROCESSING:
            "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-400",
        REJECTED:
            "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-400",
    };

    const Icon = {
        COMPLETED: CheckCircle2,
        PENDING: Clock3,
        PROCESSING: RefreshCw,
        REJECTED: XCircle,
    }[status];

    return (
        <span
            className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-semibold ${styles[status]}`}
        >
            <Icon size={13} />
            {status.charAt(0) + status.slice(1).toLowerCase()}
        </span>
    );
}

function SummaryCard({
    title,
    value,
    description,
    icon: Icon,
    tone,
    trend,
}: {
    title: string;
    value: string;
    description: string;
    icon: React.ElementType;
    tone: string;
    trend?: string;
}) {
    return (
        <div className="min-w-0 rounded-xl border border-border bg-card p-3 shadow-sm transition-shadow hover:shadow-md sm:p-5">
            <div className="flex min-w-0 items-start justify-between gap-2">
                <div
                    className={`flex size-10 shrink-0 items-center justify-center rounded-xl sm:size-11 ${tone}`}
                >
                    <Icon size={20} />
                </div>

                {trend && (
                    <span className="flex min-w-0 items-center gap-1 text-right text-xs font-semibold text-emerald-600">
                        <ArrowDownRight size={14} className="shrink-0" />
                        <span className="break-words">{trend}</span>
                    </span>
                )}
            </div>

            <p className="mt-4 text-sm leading-5 text-muted-foreground">
                {title}
            </p>

            <p className="mt-1 break-words text-xl font-bold tracking-tight sm:text-2xl">
                {value}
            </p>

            <p className="mt-2 text-xs leading-5 text-muted-foreground">
                {description}
            </p>
        </div>
    );
}

function SectionTitle({
    title,
    description,
    action,
}: {
    title: string;
    description: string;
    action?: React.ReactNode;
}) {
    return (
        <div className="mb-5 flex min-w-0 flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div className="min-w-0">
                <h2 className="text-base font-semibold tracking-tight">
                    {title}
                </h2>
                <p className="mt-1 text-sm leading-5 text-muted-foreground">
                    {description}
                </p>
            </div>

            {action && (
                <div className="w-full shrink-0 sm:w-auto">
                    {action}
                </div>
            )}
        </div>
    );
}

export default function RefundsReport() {
    const [refunds] = useState<RefundRecord[]>(initialRefunds);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [methodFilter, setMethodFilter] = useState("ALL");
    const [dateRange, setDateRange] = useState("ALL");
    const [currentPage, setCurrentPage] = useState(1);

    const pageSize = 5;

    const filteredRefunds = useMemo(() => {
        const now = new Date("2026-10-10T23:59:59");

        return refunds.filter((refund) => {
            const query = search.trim().toLowerCase();

            const matchesSearch =
                !query ||
                [
                    refund.refundNumber,
                    refund.paymentId,
                    refund.invoiceId,
                    refund.studentName,
                    refund.studentId,
                    refund.reason,
                ].some((value) => value.toLowerCase().includes(query));

            const matchesStatus =
                statusFilter === "ALL" || refund.status === statusFilter;

            const matchesMethod =
                methodFilter === "ALL" || refund.method === methodFilter;

            const requestedDate = new Date(`${refund.requestedAt}T00:00:00`);

            const matchesDate =
                dateRange === "ALL" ||
                (dateRange === "7D" &&
                    requestedDate >= new Date(now.getTime() - 7 * 86400000)) ||
                (dateRange === "30D" &&
                    requestedDate >= new Date(now.getTime() - 30 * 86400000)) ||
                (dateRange === "90D" &&
                    requestedDate >= new Date(now.getTime() - 90 * 86400000));

            return matchesSearch && matchesStatus && matchesMethod && matchesDate;
        });
    }, [refunds, search, statusFilter, methodFilter, dateRange]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredRefunds.length / pageSize),
    );

    const safePage = Math.min(currentPage, totalPages);

    const paginatedRefunds = filteredRefunds.slice(
        (safePage - 1) * pageSize,
        safePage * pageSize,
    );

    const completed = refunds.filter(
        (item) => item.status === "COMPLETED",
    );

    const pending = refunds.filter(
        (item) =>
            item.status === "PENDING" || item.status === "PROCESSING",
    );

    const rejected = refunds.filter(
        (item) => item.status === "REJECTED",
    );

    const completedAmount = completed.reduce(
        (sum, item) => sum + item.amount,
        0,
    );

    const pendingAmount = pending.reduce(
        (sum, item) => sum + item.amount,
        0,
    );

    const rejectedAmount = rejected.reduce(
        (sum, item) => sum + item.amount,
        0,
    );

    const totalRequested = refunds.reduce(
        (sum, item) => sum + item.amount,
        0,
    );

    const statusCounts = [
        {
            label: "Completed",
            count: completed.length,
            amount: completedAmount,
            color: "bg-emerald-500",
            text: "text-emerald-600",
        },
        {
            label: "Pending / Processing",
            count: pending.length,
            amount: pendingAmount,
            color: "bg-amber-500",
            text: "text-amber-600",
        },
        {
            label: "Rejected",
            count: rejected.length,
            amount: rejectedAmount,
            color: "bg-red-500",
            text: "text-red-600",
        },
    ];

    const exportCsv = () => {
        const headers = [
            "Refund Number",
            "Student",
            "Student ID",
            "Payment ID",
            "Invoice ID",
            "Reason",
            "Method",
            "Amount",
            "Requested At",
            "Processed At",
            "Status",
        ];

        const rows = filteredRefunds.map((item) => [
            item.refundNumber,
            item.studentName,
            item.studentId,
            item.paymentId,
            item.invoiceId,
            item.reason,
            item.method,
            item.amount,
            item.requestedAt,
            item.processedAt ?? "",
            item.status,
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
        const link = document.createElement("a");

        link.href = url;
        link.download = "campusflow-refunds-report.csv";
        document.body.appendChild(link);
        link.click();
        link.remove();

        URL.revokeObjectURL(url);
    };

    const resetFilters = () => {
        setSearch("");
        setStatusFilter("ALL");
        setMethodFilter("ALL");
        setDateRange("ALL");
        setCurrentPage(1);
    };

    return (
        <main className="min-h-screen w-full min-w-0 bg-background text-foreground">
            <div className="mx-auto w-full min-w-0 max-w-full space-y-5 overflow-x-clip p-3 sm:space-y-6">
                {/* Header */}
                <header className="flex min-w-0 flex-col justify-between gap-4 xl:flex-row xl:items-center">
                    <div className="min-w-0">
                        <h1 className="break-words text-2xl font-bold tracking-tight sm:text-3xl">
                            Refunds Report
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                            Track refunded amounts, refund requests, processing
                            status and payment methods across student accounts.
                        </p>
                    </div>

                    <div className="grid w-full min-w-0 grid-cols-1 gap-2 sm:flex sm:flex-wrap xl:w-auto xl:shrink-0">
                        <Link
                            href="/accountant/refunds"
                            className="inline-flex min-h-10 min-w-0 items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium transition hover:bg-muted sm:flex-1 xl:flex-none"
                        >
                            <RotateCcw size={16} className="shrink-0" />
                            Manage Refunds
                        </Link>

                        <button
                            type="button"
                            onClick={exportCsv}
                            className="inline-flex min-h-10 min-w-0 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 sm:flex-1 xl:flex-none"
                        >
                            <Download size={16} className="shrink-0" />
                            Export CSV
                        </button>
                    </div>
                </header>

                {/* Summary Cards */}
                <section className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 2xl:grid-cols-4">
                    <SummaryCard
                        title="Total Refund Requests"
                        value={String(refunds.length)}
                        description="All recorded refund requests"
                        icon={FileText}
                        tone="bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400"
                    />

                    <SummaryCard
                        title="Refunds Processed"
                        value={currency(completedAmount)}
                        description={`${completed.length} completed refund requests`}
                        icon={CheckCircle2}
                        tone="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                        trend="Completed"
                    />

                    <SummaryCard
                        title="Pending Refund Amount"
                        value={currency(pendingAmount)}
                        description={`${pending.length} requests pending or processing`}
                        icon={Clock3}
                        tone="bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400"
                    />

                    <SummaryCard
                        title="Total Requested Amount"
                        value={currency(totalRequested)}
                        description={`${currency(rejectedAmount)} in rejected requests`}
                        icon={Wallet}
                        tone="bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-400"
                    />
                </section>

                {/* Chart and Status Breakdown */}
                <div className="grid w-full min-w-0 grid-cols-1 gap-4 xl:grid-cols-3 xl:gap-5">
                    <section className="min-w-0 max-w-full overflow-hidden rounded-xl border border-border bg-card p-3 shadow-sm sm:p-5 xl:col-span-2">
                        <SectionTitle
                            title="Monthly Refund Trend"
                            description="Refund amounts across the last six months"
                        />

                        <div className="mb-5 grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-3">
                            <div className="min-w-0 rounded-lg bg-muted/50 p-3">
                                <p className="text-xs text-muted-foreground">
                                    Current month
                                </p>
                                <p className="mt-1 break-words text-lg font-bold">
                                    ৳12,000
                                </p>
                                <p className="mt-1 flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
                                    <TrendingDown size={13} className="shrink-0" />
                                    October demo data
                                </p>
                            </div>

                            <div className="min-w-0 rounded-lg bg-muted/50 p-3">
                                <p className="text-xs text-muted-foreground">
                                    Average monthly refund
                                </p>
                                <p className="mt-1 break-words text-lg font-bold">
                                    {currency(
                                        monthlyRefunds.reduce(
                                            (sum, item) => sum + item.amount,
                                            0,
                                        ) / monthlyRefunds.length,
                                    )}
                                </p>
                            </div>

                            <div className="min-w-0 rounded-lg bg-muted/50 p-3">
                                <p className="text-xs text-muted-foreground">
                                    Current month requests
                                </p>
                                <p className="mt-1 text-lg font-bold">3</p>
                            </div>
                        </div>

                        <div className="h-[220px] min-w-0 w-full sm:h-[260px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart
                                    data={monthlyRefunds}
                                    margin={{
                                        top: 8,
                                        right: 4,
                                        left: -22,
                                        bottom: 0,
                                    }}
                                >
                                    <defs>
                                        <linearGradient
                                            id="refundGradient"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="0%"
                                                stopColor="#0d9488"
                                                stopOpacity={0.25}
                                            />
                                            <stop
                                                offset="95%"
                                                stopColor="#0d9488"
                                                stopOpacity={0}
                                            />
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
                                        tick={{
                                            fill: "currentColor",
                                            fontSize: 11,
                                            opacity: 0.65,
                                        }}
                                        tickMargin={8}
                                    />

                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        width={42}
                                        tick={{
                                            fill: "currentColor",
                                            fontSize: 10,
                                            opacity: 0.65,
                                        }}
                                        tickFormatter={(value) =>
                                            `${value / 1000}k`
                                        }
                                    />

                                    <Tooltip
                                        formatter={(value, name) => [
                                            name === "amount"
                                                ? currency(Number(value))
                                                : Number(value),
                                            name === "amount"
                                                ? "Refund amount"
                                                : "Requests",
                                        ]}
                                        contentStyle={{
                                            maxWidth: "calc(100vw - 40px)",
                                            borderRadius: 12,
                                            border: "1px solid var(--border)",
                                            background: "var(--card)",
                                            color: "var(--card-foreground)",
                                            fontSize: 12,
                                        }}
                                    />

                                    <Area
                                        type="monotone"
                                        dataKey="amount"
                                        name="amount"
                                        stroke="#0d9488"
                                        strokeWidth={2.5}
                                        fill="url(#refundGradient)"
                                        activeDot={{ r: 4 }}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </section>

                    <section className="min-w-0 max-w-full overflow-hidden rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">
                        <SectionTitle
                            title="Refund Status Breakdown"
                            description="Distribution by current status"
                        />

                        <div className="space-y-5">
                            {statusCounts.map((item) => {
                                const percent =
                                    refunds.length > 0
                                        ? (item.count / refunds.length) * 100
                                        : 0;

                                return (
                                    <div key={item.label} className="min-w-0">
                                        <div className="mb-2 flex items-center justify-between gap-3">
                                            <span className="min-w-0 break-words text-sm font-medium">
                                                {item.label}
                                            </span>
                                            <span className="shrink-0 text-sm font-semibold">
                                                {item.count}
                                            </span>
                                        </div>

                                        <div className="h-2 overflow-hidden rounded-full bg-muted">
                                            <div
                                                className={`h-full rounded-full ${item.color}`}
                                                style={{ width: `${percent}%` }}
                                            />
                                        </div>

                                        <p className={`mt-2 text-xs font-medium ${item.text}`}>
                                            {currency(item.amount)}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-6 min-w-0 rounded-xl border border-border p-3 sm:p-4">
                            <p className="text-sm text-muted-foreground">
                                Total requested
                            </p>

                            <p className="mt-1 break-words text-2xl font-bold">
                                {currency(totalRequested)}
                            </p>

                            <p className="mt-2 text-xs leading-5 text-muted-foreground">
                                Includes completed, pending, processing and rejected
                                requests. Only completed refunds count as processed.
                            </p>
                        </div>
                    </section>
                </div>

                {/* Refund Records */}
                <section className="w-full min-w-0 max-w-full rounded-xl border border-border bg-card p-3 shadow-sm sm:p-5">
                    <SectionTitle
                        title="Refund Records"
                        description="Search and filter refund requests and completed refunds"
                        action={
                            <button
                                type="button"
                                onClick={resetFilters}
                                className="inline-flex min-h-9 w-full items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium transition hover:bg-muted sm:w-auto"
                            >
                                <RefreshCw size={14} />
                                Reset filters
                            </button>
                        }
                    />

                    {/* Responsive Filters */}
                    <div className="mb-5 grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        <div className="flex h-10 min-w-0 items-center gap-2 rounded-lg border border-border px-3">
                            <Search
                                size={16}
                                className="shrink-0 text-muted-foreground"
                            />
                            <input
                                type="search"
                                value={search}
                                onChange={(event) => {
                                    setSearch(event.target.value);
                                    setCurrentPage(1);
                                }}
                                placeholder="Search refund, student..."
                                className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                                aria-label="Search refund records"
                            />
                        </div>

                        <div className="relative min-w-0">
                            <Filter
                                size={15}
                                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                            />
                            <select
                                value={statusFilter}
                                onChange={(event) => {
                                    setStatusFilter(event.target.value);
                                    setCurrentPage(1);
                                }}
                                className="h-10 w-full min-w-0 appearance-none rounded-lg border border-border bg-background pl-9 pr-8 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                                aria-label="Filter by refund status"
                            >
                                <option value="ALL">All statuses</option>
                                <option value="COMPLETED">Completed</option>
                                <option value="PENDING">Pending</option>
                                <option value="PROCESSING">Processing</option>
                                <option value="REJECTED">Rejected</option>
                            </select>
                            <ChevronDown
                                size={14}
                                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                            />
                        </div>

                        <div className="relative min-w-0">
                            <Wallet
                                size={15}
                                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                            />
                            <select
                                value={methodFilter}
                                onChange={(event) => {
                                    setMethodFilter(event.target.value);
                                    setCurrentPage(1);
                                }}
                                className="h-10 w-full min-w-0 appearance-none rounded-lg border border-border bg-background pl-9 pr-8 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                                aria-label="Filter by payment method"
                            >
                                <option value="ALL">All methods</option>
                                <option value="SSLCommerz">SSLCommerz</option>
                                <option value="bKash">bKash</option>
                                <option value="Bank Transfer">Bank Transfer</option>
                                <option value="Card">Card</option>
                            </select>
                            <ChevronDown
                                size={14}
                                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                            />
                        </div>

                        <div className="relative min-w-0">
                            <CalendarDays
                                size={15}
                                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                            />
                            <select
                                value={dateRange}
                                onChange={(event) => {
                                    setDateRange(event.target.value);
                                    setCurrentPage(1);
                                }}
                                className="h-10 w-full min-w-0 appearance-none rounded-lg border border-border bg-background pl-9 pr-8 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                                aria-label="Filter by date range"
                            >
                                <option value="ALL">All dates</option>
                                <option value="7D">Last 7 days</option>
                                <option value="30D">Last 30 days</option>
                                <option value="90D">Last 90 days</option>
                            </select>
                            <ChevronDown
                                size={14}
                                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                            />
                        </div>
                    </div>

                    {/* Table: scroll is contained inside this wrapper */}
                    <div className="w-full min-w-0 max-w-full overflow-x-auto overscroll-x-contain rounded-lg border border-border">
                        <table className="w-full min-w-[1000px] table-auto text-left text-sm">
                            <thead>
                                <tr className="border-b border-border bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                                    <th className="whitespace-nowrap px-3 py-3 font-medium sm:px-4">
                                        Refund / Student
                                    </th>
                                    <th className="whitespace-nowrap px-3 py-3 font-medium sm:px-4">
                                        Payment / Invoice
                                    </th>
                                    <th className="px-3 py-3 font-medium sm:px-4">
                                        Reason
                                    </th>
                                    <th className="whitespace-nowrap px-3 py-3 font-medium sm:px-4">
                                        Method
                                    </th>
                                    <th className="whitespace-nowrap px-3 py-3 font-medium sm:px-4">
                                        Amount
                                    </th>
                                    <th className="whitespace-nowrap px-3 py-3 font-medium sm:px-4">
                                        Requested
                                    </th>
                                    <th className="px-3 py-3 font-medium sm:px-4">
                                        Status
                                    </th>
                                    <th className="px-3 py-3 text-right font-medium sm:px-4">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-border">
                                {paginatedRefunds.map((refund) => (
                                    <tr
                                        key={refund.id}
                                        className="transition hover:bg-muted/30"
                                    >
                                        <td className="px-3 py-4 sm:px-4">
                                            <p className="whitespace-nowrap font-semibold">
                                                {refund.refundNumber}
                                            </p>
                                            <p className="mt-1 whitespace-nowrap text-xs text-muted-foreground">
                                                {refund.studentName}
                                            </p>
                                            <p className="mt-1 whitespace-nowrap text-xs text-muted-foreground">
                                                {refund.studentId}
                                            </p>
                                        </td>

                                        <td className="px-3 py-4 sm:px-4">
                                            <p className="whitespace-nowrap font-medium">
                                                {refund.paymentId}
                                            </p>
                                            <p className="mt-1 whitespace-nowrap text-xs text-muted-foreground">
                                                {refund.invoiceId}
                                            </p>
                                        </td>

                                        <td className="max-w-[200px] px-3 py-4 sm:px-4">
                                            <span className="line-clamp-2 text-muted-foreground">
                                                {refund.reason}
                                            </span>
                                        </td>

                                        <td className="whitespace-nowrap px-3 py-4 sm:px-4">
                                            {refund.method}
                                        </td>

                                        <td className="whitespace-nowrap px-3 py-4 font-semibold sm:px-4">
                                            {currency(refund.amount)}
                                        </td>

                                        <td className="whitespace-nowrap px-3 py-4 text-muted-foreground sm:px-4">
                                            {dateLabel(refund.requestedAt)}
                                        </td>

                                        <td className="px-3 py-4 sm:px-4">
                                            <StatusBadge status={refund.status} />
                                        </td>

                                        <td className="px-3 py-4 text-right sm:px-4">
                                            <Link
                                                href={`/accountant/refunds/${refund.id}`}
                                                aria-label={`View refund ${refund.refundNumber}`}
                                                title="View refund details"
                                                className="inline-flex size-9 items-center justify-center rounded-lg border border-border transition hover:bg-muted"
                                            >
                                                <Eye size={16} />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}

                                {paginatedRefunds.length === 0 && (
                                    <tr>
                                        <td colSpan={8} className="px-4 py-14 text-center">
                                            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted">
                                                <Search
                                                    size={21}
                                                    className="text-muted-foreground"
                                                />
                                            </div>

                                            <p className="mt-3 font-semibold">
                                                No refunds found
                                            </p>

                                            <p className="mt-1 text-sm text-muted-foreground">
                                                Try changing your search or filters.
                                            </p>

                                            <button
                                                type="button"
                                                onClick={resetFilters}
                                                className="mt-3 text-sm font-semibold text-primary hover:underline"
                                            >
                                                Clear all filters
                                            </button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Responsive Pagination */}
                    <div className="mt-4 flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm leading-5 text-muted-foreground">
                            Showing{" "}
                            {filteredRefunds.length === 0
                                ? 0
                                : (safePage - 1) * pageSize + 1}{" "}
                            to{" "}
                            {Math.min(
                                safePage * pageSize,
                                filteredRefunds.length,
                            )}{" "}
                            of {filteredRefunds.length} records
                        </p>

                        <div className="flex flex-wrap items-center gap-2">
                            <button
                                type="button"
                                disabled={safePage <= 1}
                                onClick={() =>
                                    setCurrentPage((page) =>
                                        Math.max(1, page - 1),
                                    )
                                }
                                className="h-9 rounded-lg border border-border px-3 text-sm font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Previous
                            </button>

                            <span className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-primary px-3 text-sm font-semibold text-primary-foreground">
                                {safePage}
                            </span>

                            <button
                                type="button"
                                disabled={safePage >= totalPages}
                                onClick={() =>
                                    setCurrentPage((page) =>
                                        Math.min(totalPages, page + 1),
                                    )
                                }
                                className="h-9 rounded-lg border border-border px-3 text-sm font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="flex min-w-0 flex-col gap-2 border-t border-border pt-4 text-xs leading-5 text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                    <p>CampusFlow · Accountant Reports · Refunds</p>
                    <p>
                        Demo report data — connect to your finance API for live figures.
                    </p>
                </footer>
            </div>
        </main>
    );
}
