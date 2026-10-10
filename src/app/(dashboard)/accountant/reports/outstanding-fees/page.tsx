// import React from 'react'

// export default function outstandingFeesReport() {
//     return (
//         <div>outstanding-fees</div>
//     )
// }


















// "use client";

// import React, { useMemo, useState } from "react";
// import Link from "next/link";
// import {
//     AlertTriangle,
//     ArrowDownToLine,
//     ArrowDownRight,
//     ArrowRight,
//     ArrowUpRight,
//     CalendarDays,
//     CheckCircle2,
//     ChevronDown,
//     Clock3,
//     Download,
//     FileText,
//     Filter,
//     RefreshCw,
//     Search,
//     TrendingUp,
//     Users,
//     Wallet,
//     X,
// } from "lucide-react";
// import {
//     Bar,
//     BarChart,
//     CartesianGrid,
//     Cell,
//     ResponsiveContainer,
//     Tooltip,
//     XAxis,
//     YAxis,
// } from "recharts";

// type AgingCategory =
//     | "CURRENT"
//     | "1-30 DAYS"
//     | "31-60 DAYS"
//     | "61-90 DAYS"
//     | "90+ DAYS";

// type InvoiceStatus = "ISSUED" | "PARTIALLY_PAID" | "OVERDUE";

// type OutstandingInvoice = {
//     id: string;
//     invoiceNumber: string;
//     studentId: string;
//     studentName: string;
//     program: string;
//     description: string;
//     invoiceAmount: number;
//     paidAmount: number;
//     dueAmount: number;
//     dueDate: string;
//     daysOverdue: number;
//     status: InvoiceStatus;
// };

// const initialInvoices: OutstandingInvoice[] = [
//     {
//         id: "inv-001",
//         invoiceNumber: "INV-2026-0085",
//         studentId: "STU-2025-0021",
//         studentName: "Tanvir Hasan",
//         program: "B.Sc. Computer Science",
//         description: "Semester Tuition Fee",
//         invoiceAmount: 35000,
//         paidAmount: 0,
//         dueAmount: 35000,
//         dueDate: "2026-06-25",
//         daysOverdue: 107,
//         status: "OVERDUE",
//     },
//     {
//         id: "inv-002",
//         invoiceNumber: "INV-2026-0079",
//         studentId: "STU-2024-0091",
//         studentName: "Rahim Ahmed",
//         program: "BBA",
//         description: "Semester Tuition Fee",
//         invoiceAmount: 30000,
//         paidAmount: 10000,
//         dueAmount: 20000,
//         dueDate: "2026-08-10",
//         daysOverdue: 61,
//         status: "OVERDUE",
//     },
//     {
//         id: "inv-003",
//         invoiceNumber: "INV-2026-0081",
//         studentId: "STU-2026-0012",
//         studentName: "Ayan Sujon",
//         program: "B.Sc. Computer Science",
//         description: "Laboratory Fee",
//         invoiceAmount: 15000,
//         paidAmount: 5000,
//         dueAmount: 10000,
//         dueDate: "2026-09-01",
//         daysOverdue: 39,
//         status: "OVERDUE",
//     },
//     {
//         id: "inv-004",
//         invoiceNumber: "INV-2026-0083",
//         studentId: "STU-2025-0048",
//         studentName: "Nusrat Jahan",
//         program: "B.Sc. Electrical Engineering",
//         description: "Examination Fee",
//         invoiceAmount: 12000,
//         paidAmount: 0,
//         dueAmount: 12000,
//         dueDate: "2026-09-20",
//         daysOverdue: 20,
//         status: "OVERDUE",
//     },
//     {
//         id: "inv-005",
//         invoiceNumber: "INV-2026-0084",
//         studentId: "STU-2026-0035",
//         studentName: "Maliha Islam",
//         program: "B.Sc. Computer Science",
//         description: "Semester Tuition Fee",
//         invoiceAmount: 25000,
//         paidAmount: 5000,
//         dueAmount: 20000,
//         dueDate: "2026-10-15",
//         daysOverdue: 0,
//         status: "PARTIALLY_PAID",
//     },
//     {
//         id: "inv-006",
//         invoiceNumber: "INV-2026-0086",
//         studentId: "STU-2025-0072",
//         studentName: "Sabbir Hossain",
//         program: "BBA",
//         description: "Laboratory Fee",
//         invoiceAmount: 8000,
//         paidAmount: 0,
//         dueAmount: 8000,
//         dueDate: "2026-10-25",
//         daysOverdue: 0,
//         status: "ISSUED",
//     },
//     {
//         id: "inv-007",
//         invoiceNumber: "INV-2026-0087",
//         studentId: "STU-2024-0018",
//         studentName: "Farhana Akter",
//         program: "B.Sc. Mathematics",
//         description: "Semester Tuition Fee",
//         invoiceAmount: 40000,
//         paidAmount: 0,
//         dueAmount: 40000,
//         dueDate: "2026-07-15",
//         daysOverdue: 87,
//         status: "OVERDUE",
//     },
//     {
//         id: "inv-008",
//         invoiceNumber: "INV-2026-0088",
//         studentId: "STU-2025-0059",
//         studentName: "Imran Kabir",
//         program: "B.Sc. Computer Science",
//         description: "Admission Fee",
//         invoiceAmount: 18000,
//         paidAmount: 0,
//         dueAmount: 18000,
//         dueDate: "2026-05-20",
//         daysOverdue: 143,
//         status: "OVERDUE",
//     },
// ];

// const agingRanges: {
//     name: AgingCategory;
//     min: number;
//     max: number;
//     color: string;
// }[] = [
//         { name: "CURRENT", min: -Infinity, max: 0, color: "#16a34a" },
//         { name: "1-30 DAYS", min: 1, max: 30, color: "#eab308" },
//         { name: "31-60 DAYS", min: 31, max: 60, color: "#f97316" },
//         { name: "61-90 DAYS", min: 61, max: 90, color: "#ea580c" },
//         { name: "90+ DAYS", min: 91, max: Infinity, color: "#dc2626" },
//     ];

// const currency = (amount: number) =>
//     new Intl.NumberFormat("en-BD", {
//         style: "currency",
//         currency: "BDT",
//         maximumFractionDigits: 0,
//     }).format(amount);

// const getAgingCategory = (days: number): AgingCategory => {
//     if (days <= 0) return "CURRENT";
//     if (days <= 30) return "1-30 DAYS";
//     if (days <= 60) return "31-60 DAYS";
//     if (days <= 90) return "61-90 DAYS";
//     return "90+ DAYS";
// };

// const formatDate = (date: string) =>
//     new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//     });

// function Panel({
//     children,
//     className = "",
// }: {
//     children: React.ReactNode;
//     className?: string;
// }) {
//     return (
//         <section
//             className={`rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5 ${className}`}
//         >
//             {children}
//         </section>
//     );
// }

// function SectionHeading({
//     title,
//     description,
//     action,
// }: {
//     title: string;
//     description?: string;
//     action?: React.ReactNode;
// }) {
//     return (
//         <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
//             <div>
//                 <h2 className="text-base font-semibold tracking-tight">{title}</h2>
//                 {description && (
//                     <p className="mt-1 text-sm text-muted-foreground">{description}</p>
//                 )}
//             </div>
//             {action}
//         </div>
//     );
// }

// function StatusBadge({ status }: { status: InvoiceStatus }) {
//     const styles: Record<InvoiceStatus, string> = {
//         ISSUED:
//             "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400",
//         PARTIALLY_PAID:
//             "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400",
//         OVERDUE:
//             "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400",
//     };

//     return (
//         <span
//             className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${styles[status]}`}
//         >
//             {status.replace("_", " ")}
//         </span>
//     );
// }

// function AgingBadge({ days }: { days: number }) {
//     const category = getAgingCategory(days);
//     const styles: Record<AgingCategory, string> = {
//         CURRENT:
//             "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400",
//         "1-30 DAYS":
//             "bg-yellow-50 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-400",
//         "31-60 DAYS":
//             "bg-orange-50 text-orange-700 dark:bg-orange-950/50 dark:text-orange-400",
//         "61-90 DAYS":
//             "bg-orange-100 text-orange-800 dark:bg-orange-950/70 dark:text-orange-300",
//         "90+ DAYS":
//             "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400",
//     };

//     return (
//         <span
//             className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${styles[category]}`}
//         >
//             {days <= 0 ? "Not overdue" : `${days} days`}
//         </span>
//     );
// }

// export default function OutstandingFeesReport() {
//     const [search, setSearch] = useState("");
//     const [statusFilter, setStatusFilter] = useState("ALL");
//     const [agingFilter, setAgingFilter] = useState("ALL");
//     const [sortBy, setSortBy] = useState("highest");
//     const [dateFrom, setDateFrom] = useState("");
//     const [dateTo, setDateTo] = useState("");
//     const [selectedInvoice, setSelectedInvoice] =
//         useState<OutstandingInvoice | null>(null);

//     const [invoices] = useState(initialInvoices);

//     const today = new Date("2026-10-10T00:00:00");

//     const normalizedInvoices = useMemo(
//         () =>
//             invoices.map((invoice) => {
//                 const dueDate = new Date(`${invoice.dueDate}T00:00:00`);
//                 const daysOverdue = Math.max(
//                     0,
//                     Math.floor(
//                         (today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)
//                     )
//                 );

//                 const isOverdue = daysOverdue > 0;

//                 return {
//                     ...invoice,
//                     daysOverdue,
//                     status: isOverdue
//                         ? ("OVERDUE" as const)
//                         : invoice.status === "OVERDUE"
//                             ? ("ISSUED" as const)
//                             : invoice.status,
//                 };
//             }),
//         [invoices]
//     );

//     const filteredInvoices = useMemo(() => {
//         let result = normalizedInvoices.filter((invoice) => {
//             const query = search.toLowerCase().trim();

//             const matchesSearch =
//                 !query ||
//                 invoice.invoiceNumber.toLowerCase().includes(query) ||
//                 invoice.studentName.toLowerCase().includes(query) ||
//                 invoice.studentId.toLowerCase().includes(query) ||
//                 invoice.description.toLowerCase().includes(query);

//             const matchesStatus =
//                 statusFilter === "ALL" || invoice.status === statusFilter;

//             const matchesAging =
//                 agingFilter === "ALL" ||
//                 getAgingCategory(invoice.daysOverdue) === agingFilter;

//             const matchesFrom =
//                 !dateFrom || invoice.dueDate >= dateFrom;

//             const matchesTo =
//                 !dateTo || invoice.dueDate <= dateTo;

//             return (
//                 matchesSearch &&
//                 matchesStatus &&
//                 matchesAging &&
//                 matchesFrom &&
//                 matchesTo
//             );
//         });

//         result = [...result].sort((a, b) => {
//             if (sortBy === "highest") return b.dueAmount - a.dueAmount;
//             if (sortBy === "oldest") return b.daysOverdue - a.daysOverdue;
//             if (sortBy === "newest") return a.daysOverdue - b.daysOverdue;
//             return a.studentName.localeCompare(b.studentName);
//         });

//         return result;
//     }, [
//         normalizedInvoices,
//         search,
//         statusFilter,
//         agingFilter,
//         sortBy,
//         dateFrom,
//         dateTo,
//     ]);

//     const totalOutstanding = normalizedInvoices.reduce(
//         (sum, invoice) => sum + invoice.dueAmount,
//         0
//     );

//     const overdueInvoices = normalizedInvoices.filter(
//         (invoice) => invoice.daysOverdue > 0
//     );

//     const totalOverdue = overdueInvoices.reduce(
//         (sum, invoice) => sum + invoice.dueAmount,
//         0
//     );

//     const overdueStudentCount = new Set(
//         overdueInvoices.map((invoice) => invoice.studentId)
//     ).size;

//     const agingData = agingRanges.map((range) => {
//         const matchingInvoices = normalizedInvoices.filter((invoice) => {
//             return (
//                 invoice.daysOverdue >= range.min &&
//                 invoice.daysOverdue <= range.max
//             );
//         });

//         return {
//             category: range.name,
//             amount: matchingInvoices.reduce(
//                 (sum, invoice) => sum + invoice.dueAmount,
//                 0
//             ),
//             count: matchingInvoices.length,
//             fill: range.color,
//         };
//     });

//     const resetFilters = () => {
//         setSearch("");
//         setStatusFilter("ALL");
//         setAgingFilter("ALL");
//         setSortBy("highest");
//         setDateFrom("");
//         setDateTo("");
//     };

//     const exportCSV = () => {
//         const headers = [
//             "Invoice Number",
//             "Student Name",
//             "Student ID",
//             "Program",
//             "Description",
//             "Invoice Amount",
//             "Paid Amount",
//             "Outstanding Amount",
//             "Due Date",
//             "Days Overdue",
//             "Aging Category",
//             "Status",
//         ];

//         const rows = filteredInvoices.map((invoice) => [
//             invoice.invoiceNumber,
//             invoice.studentName,
//             invoice.studentId,
//             invoice.program,
//             invoice.description,
//             invoice.invoiceAmount,
//             invoice.paidAmount,
//             invoice.dueAmount,
//             invoice.dueDate,
//             invoice.daysOverdue,
//             getAgingCategory(invoice.daysOverdue),
//             invoice.status,
//         ]);

//         const escapeCSV = (value: string | number) =>
//             `"${String(value).replace(/"/g, '""')}"`;

//         const csv = [headers, ...rows]
//             .map((row) => row.map(escapeCSV).join(","))
//             .join("\r\n");

//         const blob = new Blob(["\uFEFF" + csv], {
//             type: "text/csv;charset=utf-8;",
//         });

//         const url = URL.createObjectURL(blob);
//         const anchor = document.createElement("a");
//         anchor.href = url;
//         anchor.download = "campusflow-outstanding-fees-report.csv";
//         document.body.appendChild(anchor);
//         anchor.click();
//         anchor.remove();
//         URL.revokeObjectURL(url);
//     };

//     const clearSelectedInvoice = () => setSelectedInvoice(null);

//     return (
//         <main className="min-h-screen w-full min-w-0 overflow-x-clip bg-background text-foreground">
//             <div className="mx-auto w-full min-w-0 space-y-6 p-3 sm:p-4 lg:p-6">
//                 {/* Header */}
//                 <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
//                     <div>

//                         <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
//                             Outstanding Fees Report
//                         </h1>
//                         <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
//                             Monitor unpaid balances, overdue invoices, aging categories and
//                             students requiring payment follow-up.
//                         </p>
//                     </div>

//                     <div className="flex flex-wrap gap-2">
//                         <button
//                             type="button"
//                             onClick={resetFilters}
//                             className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border bg-card px-3 text-sm font-medium transition hover:bg-muted"
//                         >
//                             <RefreshCw size={15} />
//                             Reset filters
//                         </button>
//                         <button
//                             type="button"
//                             onClick={exportCSV}
//                             className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
//                         >
//                             <Download size={16} />
//                             Export CSV
//                         </button>
//                     </div>
//                 </div>

//                 {/* Report period */}
//                 <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm">
//                     <CalendarDays size={17} className="text-muted-foreground" />
//                     <span className="font-medium">Report generated:</span>
//                     <span className="text-muted-foreground">
//                         October 10, 2026
//                     </span>
//                     <span className="hidden text-muted-foreground sm:inline">·</span>
//                     <span className="text-xs text-muted-foreground">
//                         Outstanding balances across all listed invoices
//                     </span>
//                 </div>

//                 {/* KPI cards */}
//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
//                     <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
//                         <div className="flex items-center justify-between">
//                             <div className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
//                                 <Wallet size={21} />
//                             </div>
//                             <span className="text-xs font-medium text-muted-foreground">
//                                 All invoices
//                             </span>
//                         </div>
//                         <p className="mt-5 text-sm text-muted-foreground">
//                             Total Outstanding
//                         </p>
//                         <p className="mt-1 text-2xl font-bold tracking-tight">
//                             {currency(totalOutstanding)}
//                         </p>
//                         <p className="mt-2 text-xs text-muted-foreground">
//                             Remaining unpaid balance
//                         </p>
//                     </div>

//                     <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
//                         <div className="flex items-center justify-between">
//                             <div className="flex size-11 items-center justify-center rounded-xl bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400">
//                                 <AlertTriangle size={21} />
//                             </div>
//                             <span className="flex items-center gap-1 text-xs font-semibold text-red-600">
//                                 <ArrowUpRight size={14} />
//                                 Overdue
//                             </span>
//                         </div>
//                         <p className="mt-5 text-sm text-muted-foreground">
//                             Overdue Amount
//                         </p>
//                         <p className="mt-1 text-2xl font-bold tracking-tight">
//                             {currency(totalOverdue)}
//                         </p>
//                         <p className="mt-2 text-xs text-muted-foreground">
//                             Past their due date
//                         </p>
//                     </div>

//                     <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
//                         <div className="flex items-center justify-between">
//                             <div className="flex size-11 items-center justify-center rounded-xl bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
//                                 <Clock3 size={21} />
//                             </div>
//                             <span className="text-xs font-medium text-muted-foreground">
//                                 Requires follow-up
//                             </span>
//                         </div>
//                         <p className="mt-5 text-sm text-muted-foreground">
//                             Overdue Invoices
//                         </p>
//                         <p className="mt-1 text-2xl font-bold tracking-tight">
//                             {overdueInvoices.length}
//                         </p>
//                         <p className="mt-2 text-xs text-muted-foreground">
//                             Invoice records past due
//                         </p>
//                     </div>

//                     <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
//                         <div className="flex items-center justify-between">
//                             <div className="flex size-11 items-center justify-center rounded-xl bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-400">
//                                 <Users size={21} />
//                             </div>
//                             <span className="text-xs font-medium text-muted-foreground">
//                                 Unique students
//                             </span>
//                         </div>
//                         <p className="mt-5 text-sm text-muted-foreground">
//                             Students With Overdue Fees
//                         </p>
//                         <p className="mt-1 text-2xl font-bold tracking-tight">
//                             {overdueStudentCount}
//                         </p>
//                         <p className="mt-2 text-xs text-muted-foreground">
//                             Students needing follow-up
//                         </p>
//                     </div>
//                 </div>

//                 {/* Aging chart */}
//                 <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
//                     <Panel className="xl:col-span-2">
//                         <SectionHeading
//                             title="Outstanding Fees Aging"
//                             description="Remaining balances grouped by days past due"
//                             action={
//                                 <span className="rounded-lg bg-muted px-3 py-1.5 text-xs font-medium">
//                                     {agingData.reduce((sum, item) => sum + item.count, 0)} invoices
//                                 </span>
//                             }
//                         />

//                         <div className="h-[290px] w-full">
//                             <ResponsiveContainer width="100%" height="100%">
//                                 <BarChart
//                                     data={agingData}
//                                     margin={{ top: 8, right: 8, left: 8, bottom: 5 }}
//                                 >
//                                     <CartesianGrid
//                                         stroke="currentColor"
//                                         strokeOpacity={0.1}
//                                         vertical={false}
//                                     />
//                                     <XAxis
//                                         dataKey="category"
//                                         axisLine={false}
//                                         tickLine={false}
//                                         tick={{ fill: "currentColor", fontSize: 11 }}
//                                         interval={0}
//                                     />
//                                     <YAxis
//                                         axisLine={false}
//                                         tickLine={false}
//                                         tick={{ fill: "currentColor", fontSize: 11 }}
//                                         tickFormatter={(value) => `${value / 1000}k`}
//                                         width={45}
//                                     />
//                                     <Tooltip
//                                         formatter={(value) => [
//                                             currency(Number(value)),
//                                             "Outstanding",
//                                         ]}
//                                         labelFormatter={(label) => `Aging: ${label}`}
//                                         contentStyle={{
//                                             borderRadius: 12,
//                                             border: "1px solid var(--border)",
//                                             background: "var(--card)",
//                                             color: "var(--card-foreground)",
//                                             fontSize: 12,
//                                         }}
//                                     />
//                                     <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
//                                         {agingData.map((item) => (
//                                             <Cell key={item.category} fill={item.fill} />
//                                         ))}
//                                     </Bar>
//                                 </BarChart>
//                             </ResponsiveContainer>
//                         </div>
//                     </Panel>

//                     <Panel>
//                         <SectionHeading
//                             title="Aging Summary"
//                             description="Prioritize older balances first"
//                         />

//                         <div className="space-y-5">
//                             {agingData.map((item) => {
//                                 const percentage =
//                                     totalOutstanding > 0
//                                         ? (item.amount / totalOutstanding) * 100
//                                         : 0;

//                                 return (
//                                     <div key={item.category}>
//                                         <div className="mb-2 flex items-center justify-between gap-3">
//                                             <div className="flex items-center gap-2">
//                                                 <span
//                                                     className="size-2.5 rounded-full"
//                                                     style={{ backgroundColor: item.fill }}
//                                                 />
//                                                 <span className="text-sm font-medium">
//                                                     {item.category === "CURRENT"
//                                                         ? "Current"
//                                                         : item.category}
//                                                 </span>
//                                             </div>
//                                             <span className="text-sm font-semibold">
//                                                 {currency(item.amount)}
//                                             </span>
//                                         </div>
//                                         <div className="h-2 overflow-hidden rounded-full bg-muted">
//                                             <div
//                                                 className="h-full rounded-full transition-all"
//                                                 style={{
//                                                     width: `${Math.min(percentage, 100)}%`,
//                                                     backgroundColor: item.fill,
//                                                 }}
//                                             />
//                                         </div>
//                                         <p className="mt-1.5 text-xs text-muted-foreground">
//                                             {item.count} invoice{item.count === 1 ? "" : "s"} ·{" "}
//                                             {percentage.toFixed(1)}% of total outstanding
//                                         </p>
//                                     </div>
//                                 );
//                             })}
//                         </div>

//                         <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/30">
//                             <div className="flex items-start gap-3">
//                                 <AlertTriangle
//                                     size={18}
//                                     className="mt-0.5 shrink-0 text-red-600 dark:text-red-400"
//                                 />
//                                 <div>
//                                     <p className="text-sm font-semibold text-red-800 dark:text-red-300">
//                                         High-priority follow-up
//                                     </p>
//                                     <p className="mt-1 text-xs leading-5 text-red-700 dark:text-red-400">
//                                         Review invoices overdue by more than 60 days first.
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                     </Panel>
//                 </div>

//                 {/* Filters */}
//                 <Panel>
//                     <SectionHeading
//                         title="Outstanding Invoice Details"
//                         description="Search, filter and review each unpaid invoice"
//                         action={
//                             <button
//                                 type="button"
//                                 onClick={resetFilters}
//                                 className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
//                             >
//                                 <RefreshCw size={14} />
//                                 Clear filters
//                             </button>
//                         }
//                     />

//                     <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-6">
//                         <div className="relative sm:col-span-2">
//                             <Search
//                                 size={16}
//                                 className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
//                             />
//                             <input
//                                 value={search}
//                                 onChange={(event) => setSearch(event.target.value)}
//                                 placeholder="Student, ID or invoice..."
//                                 className="h-10 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
//                             />
//                         </div>

//                         <div className="relative">
//                             <Filter
//                                 size={15}
//                                 className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
//                             />
//                             <select
//                                 value={statusFilter}
//                                 onChange={(event) => setStatusFilter(event.target.value)}
//                                 className="h-10 w-full appearance-none rounded-lg border border-border bg-background pl-9 pr-8 text-sm outline-none focus:border-primary"
//                             >
//                                 <option value="ALL">All statuses</option>
//                                 <option value="OVERDUE">Overdue</option>
//                                 <option value="ISSUED">Issued</option>
//                                 <option value="PARTIALLY_PAID">Partially paid</option>
//                             </select>
//                             <ChevronDown
//                                 size={14}
//                                 className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
//                             />
//                         </div>

//                         <div className="relative">
//                             <select
//                                 value={agingFilter}
//                                 onChange={(event) => setAgingFilter(event.target.value)}
//                                 className="h-10 w-full appearance-none rounded-lg border border-border bg-background px-3 pr-8 text-sm outline-none focus:border-primary"
//                             >
//                                 <option value="ALL">All aging</option>
//                                 {agingRanges.map((range) => (
//                                     <option key={range.name} value={range.name}>
//                                         {range.name}
//                                     </option>
//                                 ))}
//                             </select>
//                             <ChevronDown
//                                 size={14}
//                                 className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
//                             />
//                         </div>

//                         <div className="relative">
//                             <select
//                                 value={sortBy}
//                                 onChange={(event) => setSortBy(event.target.value)}
//                                 className="h-10 w-full appearance-none rounded-lg border border-border bg-background px-3 pr-8 text-sm outline-none focus:border-primary"
//                             >
//                                 <option value="highest">Highest amount</option>
//                                 <option value="oldest">Oldest overdue</option>
//                                 <option value="newest">Least overdue</option>
//                                 <option value="student">Student name</option>
//                             </select>
//                             <ChevronDown
//                                 size={14}
//                                 className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
//                             />
//                         </div>
//                     </div>

//                     <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
//                         <label className="flex items-center gap-3">
//                             <span className="shrink-0 text-xs text-muted-foreground">
//                                 Due from
//                             </span>
//                             <input
//                                 type="date"
//                                 value={dateFrom}
//                                 onChange={(event) => setDateFrom(event.target.value)}
//                                 className="h-9 min-w-0 flex-1 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary"
//                             />
//                         </label>
//                         <label className="flex items-center gap-3">
//                             <span className="shrink-0 text-xs text-muted-foreground">
//                                 Due to
//                             </span>
//                             <input
//                                 type="date"
//                                 value={dateTo}
//                                 onChange={(event) => setDateTo(event.target.value)}
//                                 className="h-9 min-w-0 flex-1 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary"
//                             />
//                         </label>
//                     </div>
//                 </Panel>

//                 {/* Invoice table */}
//                 <Panel className="overflow-hidden">
//                     <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
//                         <div>
//                             <h2 className="text-base font-semibold">
//                                 Invoice Register
//                             </h2>
//                             <p className="mt-1 text-sm text-muted-foreground">
//                                 Showing {filteredInvoices.length} of{" "}
//                                 {normalizedInvoices.length} invoices
//                             </p>
//                         </div>
//                         <button
//                             type="button"
//                             onClick={exportCSV}
//                             className="inline-flex h-9 items-center gap-2 rounded-lg border border-border px-3 text-sm font-medium transition hover:bg-muted"
//                         >
//                             <ArrowDownToLine size={15} />
//                             Export results
//                         </button>
//                     </div>

//                     <div className="overflow-x-auto">
//                         <table className="  text-left text-sm">
//                             <thead>
//                                 <tr className="border-y border-border bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
//                                     <th className="px-4 py-3 font-medium">Invoice / Student</th>
//                                     <th className="px-4 py-3 font-medium">Description</th>
//                                     <th className="px-4 py-3 font-medium">Invoice amount</th>
//                                     <th className="px-4 py-3 font-medium">Paid</th>
//                                     <th className="px-4 py-3 font-medium">Outstanding</th>
//                                     <th className="px-4 py-3 font-medium">Due date</th>
//                                     <th className="px-4 py-3 font-medium">Aging</th>
//                                     <th className="px-4 py-3 font-medium">Status</th>
//                                     <th className="px-4 py-3 text-right font-medium">Action</th>
//                                 </tr>
//                             </thead>

//                             <tbody>
//                                 {filteredInvoices.map((invoice) => (
//                                     <tr
//                                         key={invoice.id}
//                                         className="border-b border-border last:border-0 transition hover:bg-muted/30"
//                                     >
//                                         <td className="px-4 py-4">
//                                             <button
//                                                 type="button"
//                                                 onClick={() => setSelectedInvoice(invoice)}
//                                                 className="text-left"
//                                             >
//                                                 <span className="font-semibold text-primary hover:underline">
//                                                     {invoice.invoiceNumber}
//                                                 </span>
//                                             </button>
//                                             <p className="mt-1 font-medium">{invoice.studentName}</p>
//                                             <p className="mt-1 text-xs text-muted-foreground">
//                                                 {invoice.studentId}
//                                             </p>
//                                         </td>

//                                         <td className="px-4 py-4">
//                                             <p className="font-medium">{invoice.description}</p>
//                                             <p className="mt-1 max-w-[190px] text-xs text-muted-foreground">
//                                                 {invoice.program}
//                                             </p>
//                                         </td>

//                                         <td className="px-4 py-4 whitespace-nowrap text-muted-foreground">
//                                             {currency(invoice.invoiceAmount)}
//                                         </td>

//                                         <td className="px-4 py-4 whitespace-nowrap text-emerald-700 dark:text-emerald-400">
//                                             {currency(invoice.paidAmount)}
//                                         </td>

//                                         <td className="px-4 py-4 whitespace-nowrap font-semibold">
//                                             {currency(invoice.dueAmount)}
//                                         </td>

//                                         <td className="px-4 py-4 whitespace-nowrap">
//                                             <p>{formatDate(invoice.dueDate)}</p>
//                                             {invoice.daysOverdue > 0 && (
//                                                 <p className="mt-1 text-xs text-red-600 dark:text-red-400">
//                                                     {invoice.daysOverdue} days overdue
//                                                 </p>
//                                             )}
//                                         </td>

//                                         <td className="px-4 py-4">
//                                             <AgingBadge days={invoice.daysOverdue} />
//                                         </td>

//                                         <td className="px-4 py-4">
//                                             <StatusBadge status={invoice.status} />
//                                         </td>

//                                         <td className="px-4 py-4 text-right">
//                                             <div className="flex justify-end gap-2">
//                                                 <button
//                                                     type="button"
//                                                     onClick={() => setSelectedInvoice(invoice)}
//                                                     className="inline-flex size-9 items-center justify-center rounded-lg border border-border hover:bg-muted"
//                                                     aria-label={`View ${invoice.invoiceNumber}`}
//                                                     title="Quick view"
//                                                 >
//                                                     <FileText size={16} />
//                                                 </button>
//                                                 <Link
//                                                     href={`/accountant/invoices/${invoice.id}`}
//                                                     className="inline-flex size-9 items-center justify-center rounded-lg border border-border hover:bg-muted"
//                                                     aria-label={`Open ${invoice.invoiceNumber}`}
//                                                     title="Open invoice"
//                                                 >
//                                                     <ArrowRight size={16} />
//                                                 </Link>
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 ))}

//                                 {filteredInvoices.length === 0 && (
//                                     <tr>
//                                         <td colSpan={9} className="px-4 py-14 text-center">
//                                             <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted">
//                                                 <Search
//                                                     size={20}
//                                                     className="text-muted-foreground"
//                                                 />
//                                             </div>
//                                             <p className="mt-3 font-semibold">
//                                                 No invoices found
//                                             </p>
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

//                             {filteredInvoices.length > 0 && (
//                                 <tfoot>
//                                     <tr className="border-t-2 border-border bg-muted/30">
//                                         <td
//                                             colSpan={4}
//                                             className="px-4 py-4 text-sm font-semibold"
//                                         >
//                                             Filtered outstanding total
//                                         </td>
//                                         <td className="px-4 py-4 font-bold">
//                                             {currency(
//                                                 filteredInvoices.reduce(
//                                                     (sum, invoice) => sum + invoice.dueAmount,
//                                                     0
//                                                 )
//                                             )}
//                                         </td>
//                                         <td colSpan={4} />
//                                     </tr>
//                                 </tfoot>
//                             )}
//                         </table>
//                     </div>

//                     <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
//                         <span>
//                             Aging is calculated using the invoice due date and report date.
//                         </span>
//                         <span>
//                             Sample data · Connect to your backend for live reporting.
//                         </span>
//                     </div>
//                 </Panel>

//                 {/* Invoice details dialog */}
//                 {selectedInvoice && (
//                     <div
//                         className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
//                         onMouseDown={(event) => {
//                             if (event.target === event.currentTarget) {
//                                 clearSelectedInvoice();
//                             }
//                         }}
//                     >
//                         <section
//                             role="dialog"
//                             aria-modal="true"
//                             aria-labelledby="invoice-dialog-title"
//                             className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-border bg-card p-5 shadow-2xl sm:p-6"
//                         >
//                             <div className="flex items-start justify-between gap-4">
//                                 <div>
//                                     <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
//                                         Invoice details
//                                     </p>
//                                     <h2
//                                         id="invoice-dialog-title"
//                                         className="mt-1 text-xl font-bold"
//                                     >
//                                         {selectedInvoice.invoiceNumber}
//                                     </h2>
//                                 </div>
//                                 <button
//                                     type="button"
//                                     onClick={clearSelectedInvoice}
//                                     className="inline-flex size-9 items-center justify-center rounded-lg border border-border hover:bg-muted"
//                                     aria-label="Close invoice details"
//                                 >
//                                     <X size={18} />
//                                 </button>
//                             </div>

//                             <div className="mt-5 rounded-xl border border-border p-4">
//                                 <p className="text-sm font-semibold">
//                                     {selectedInvoice.studentName}
//                                 </p>
//                                 <p className="mt-1 text-xs text-muted-foreground">
//                                     {selectedInvoice.studentId}
//                                 </p>
//                                 <p className="mt-2 text-sm text-muted-foreground">
//                                     {selectedInvoice.program}
//                                 </p>
//                                 <p className="mt-3 text-sm">
//                                     {selectedInvoice.description}
//                                 </p>
//                             </div>

//                             <div className="mt-4 grid grid-cols-2 gap-3">
//                                 <div className="rounded-xl bg-muted/50 p-4">
//                                     <p className="text-xs text-muted-foreground">
//                                         Invoice amount
//                                     </p>
//                                     <p className="mt-1 text-lg font-bold">
//                                         {currency(selectedInvoice.invoiceAmount)}
//                                     </p>
//                                 </div>
//                                 <div className="rounded-xl bg-muted/50 p-4">
//                                     <p className="text-xs text-muted-foreground">
//                                         Paid amount
//                                     </p>
//                                     <p className="mt-1 text-lg font-bold text-emerald-600">
//                                         {currency(selectedInvoice.paidAmount)}
//                                     </p>
//                                 </div>
//                                 <div className="rounded-xl border border-red-200 p-4 dark:border-red-900">
//                                     <p className="text-xs text-muted-foreground">
//                                         Outstanding balance
//                                     </p>
//                                     <p className="mt-1 text-lg font-bold text-red-600 dark:text-red-400">
//                                         {currency(selectedInvoice.dueAmount)}
//                                     </p>
//                                 </div>
//                                 <div className="rounded-xl border border-border p-4">
//                                     <p className="text-xs text-muted-foreground">Due date</p>
//                                     <p className="mt-1 text-sm font-semibold">
//                                         {formatDate(selectedInvoice.dueDate)}
//                                     </p>
//                                     <p className="mt-1 text-xs text-muted-foreground">
//                                         {selectedInvoice.daysOverdue > 0
//                                             ? `${selectedInvoice.daysOverdue} days overdue`
//                                             : "Not overdue"}
//                                     </p>
//                                 </div>
//                             </div>

//                             <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
//                                 <StatusBadge status={selectedInvoice.status} />
//                                 <div className="flex gap-2">
//                                     <button
//                                         type="button"
//                                         onClick={clearSelectedInvoice}
//                                         className="h-10 rounded-lg border border-border px-4 text-sm font-medium hover:bg-muted"
//                                     >
//                                         Close
//                                     </button>
//                                     <Link
//                                         href={`/accountant/invoices/${selectedInvoice.id}`}
//                                         className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground hover:opacity-90"
//                                     >
//                                         Full details <ArrowRight size={15} />
//                                     </Link>
//                                 </div>
//                             </div>
//                         </section>
//                     </div>
//                 )}
//             </div>
//         </main>
//     );
// }














"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
    AlertTriangle,
    ArrowDownToLine,
    ArrowRight,
    ArrowUpRight,
    CalendarDays,
    ChevronDown,
    Clock3,
    Download,
    FileText,
    Filter,
    RefreshCw,
    Search,
    Users,
    Wallet,
    X,
} from "lucide-react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

type AgingCategory =
    | "CURRENT"
    | "1-30 DAYS"
    | "31-60 DAYS"
    | "61-90 DAYS"
    | "90+ DAYS";

type InvoiceStatus = "ISSUED" | "PARTIALLY_PAID" | "OVERDUE";

type OutstandingInvoice = {
    id: string;
    invoiceNumber: string;
    studentId: string;
    studentName: string;
    program: string;
    description: string;
    invoiceAmount: number;
    paidAmount: number;
    dueAmount: number;
    dueDate: string;
    daysOverdue: number;
    status: InvoiceStatus;
};

const initialInvoices: OutstandingInvoice[] = [
    {
        id: "inv-001",
        invoiceNumber: "INV-2026-0085",
        studentId: "STU-2025-0021",
        studentName: "Tanvir Hasan",
        program: "B.Sc. Computer Science",
        description: "Semester Tuition Fee",
        invoiceAmount: 35000,
        paidAmount: 0,
        dueAmount: 35000,
        dueDate: "2026-06-25",
        daysOverdue: 107,
        status: "OVERDUE",
    },
    {
        id: "inv-002",
        invoiceNumber: "INV-2026-0079",
        studentId: "STU-2024-0091",
        studentName: "Rahim Ahmed",
        program: "BBA",
        description: "Semester Tuition Fee",
        invoiceAmount: 30000,
        paidAmount: 10000,
        dueAmount: 20000,
        dueDate: "2026-08-10",
        daysOverdue: 61,
        status: "OVERDUE",
    },
    {
        id: "inv-003",
        invoiceNumber: "INV-2026-0081",
        studentId: "STU-2026-0012",
        studentName: "Ayan Sujon",
        program: "B.Sc. Computer Science",
        description: "Laboratory Fee",
        invoiceAmount: 15000,
        paidAmount: 5000,
        dueAmount: 10000,
        dueDate: "2026-09-01",
        daysOverdue: 39,
        status: "OVERDUE",
    },
    {
        id: "inv-004",
        invoiceNumber: "INV-2026-0083",
        studentId: "STU-2025-0048",
        studentName: "Nusrat Jahan",
        program: "B.Sc. Electrical Engineering",
        description: "Examination Fee",
        invoiceAmount: 12000,
        paidAmount: 0,
        dueAmount: 12000,
        dueDate: "2026-09-20",
        daysOverdue: 20,
        status: "OVERDUE",
    },
    {
        id: "inv-005",
        invoiceNumber: "INV-2026-0084",
        studentId: "STU-2026-0035",
        studentName: "Maliha Islam",
        program: "B.Sc. Computer Science",
        description: "Semester Tuition Fee",
        invoiceAmount: 25000,
        paidAmount: 5000,
        dueAmount: 20000,
        dueDate: "2026-10-15",
        daysOverdue: 0,
        status: "PARTIALLY_PAID",
    },
    {
        id: "inv-006",
        invoiceNumber: "INV-2026-0086",
        studentId: "STU-2025-0072",
        studentName: "Sabbir Hossain",
        program: "BBA",
        description: "Laboratory Fee",
        invoiceAmount: 8000,
        paidAmount: 0,
        dueAmount: 8000,
        dueDate: "2026-10-25",
        daysOverdue: 0,
        status: "ISSUED",
    },
    {
        id: "inv-007",
        invoiceNumber: "INV-2026-0087",
        studentId: "STU-2024-0018",
        studentName: "Farhana Akter",
        program: "B.Sc. Mathematics",
        description: "Semester Tuition Fee",
        invoiceAmount: 40000,
        paidAmount: 0,
        dueAmount: 40000,
        dueDate: "2026-07-15",
        daysOverdue: 87,
        status: "OVERDUE",
    },
    {
        id: "inv-008",
        invoiceNumber: "INV-2026-0088",
        studentId: "STU-2025-0059",
        studentName: "Imran Kabir",
        program: "B.Sc. Computer Science",
        description: "Admission Fee",
        invoiceAmount: 18000,
        paidAmount: 0,
        dueAmount: 18000,
        dueDate: "2026-05-20",
        daysOverdue: 143,
        status: "OVERDUE",
    },
];

const agingRanges: {
    name: AgingCategory;
    min: number;
    max: number;
    color: string;
}[] = [
        { name: "CURRENT", min: -Infinity, max: 0, color: "#16a34a" },
        { name: "1-30 DAYS", min: 1, max: 30, color: "#eab308" },
        { name: "31-60 DAYS", min: 31, max: 60, color: "#f97316" },
        { name: "61-90 DAYS", min: 61, max: 90, color: "#ea580c" },
        { name: "90+ DAYS", min: 91, max: Infinity, color: "#dc2626" },
    ];

const currency = (amount: number) =>
    new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT",
        maximumFractionDigits: 0,
    }).format(amount);

const getAgingCategory = (days: number): AgingCategory => {
    if (days <= 0) return "CURRENT";
    if (days <= 30) return "1-30 DAYS";
    if (days <= 60) return "31-60 DAYS";
    if (days <= 90) return "61-90 DAYS";
    return "90+ DAYS";
};

const formatDate = (date: string) =>
    new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

function Panel({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <section
            className={`min-w-0 rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5 ${className}`}
        >
            {children}
        </section>
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
        <div className="mb-5 flex min-w-0 flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
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

function StatusBadge({ status }: { status: InvoiceStatus }) {
    const styles: Record<InvoiceStatus, string> = {
        ISSUED:
            "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400",
        PARTIALLY_PAID:
            "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400",
        OVERDUE:
            "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400",
    };

    return (
        <span
            className={`inline-flex max-w-full whitespace-normal break-words rounded-full px-2 py-1 text-xs font-semibold ${styles[status]}`}
        >
            {status.replace("_", " ")}
        </span>
    );
}

function AgingBadge({ days }: { days: number }) {
    const category = getAgingCategory(days);

    const styles: Record<AgingCategory, string> = {
        CURRENT:
            "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400",
        "1-30 DAYS":
            "bg-yellow-50 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-400",
        "31-60 DAYS":
            "bg-orange-50 text-orange-700 dark:bg-orange-950/50 dark:text-orange-400",
        "61-90 DAYS":
            "bg-orange-100 text-orange-800 dark:bg-orange-950/70 dark:text-orange-300",
        "90+ DAYS":
            "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400",
    };

    return (
        <span
            className={`inline-flex max-w-full whitespace-normal rounded-full px-2 py-1 text-xs font-semibold ${styles[category]}`}
        >
            {days <= 0 ? "Not overdue" : `${days} days`}
        </span>
    );
}

export default function OutstandingFeesReport() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [agingFilter, setAgingFilter] = useState("ALL");
    const [sortBy, setSortBy] = useState("highest");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [selectedInvoice, setSelectedInvoice] =
        useState<OutstandingInvoice | null>(null);

    const [invoices] = useState(initialInvoices);

    const today = new Date("2026-10-10T00:00:00");

    const normalizedInvoices = useMemo(
        () =>
            invoices.map((invoice) => {
                const dueDate = new Date(`${invoice.dueDate}T00:00:00`);
                const daysOverdue = Math.max(
                    0,
                    Math.floor(
                        (today.getTime() - dueDate.getTime()) /
                        (1000 * 60 * 60 * 24)
                    )
                );

                return {
                    ...invoice,
                    daysOverdue,
                    status:
                        daysOverdue > 0
                            ? ("OVERDUE" as const)
                            : invoice.status === "OVERDUE"
                                ? ("ISSUED" as const)
                                : invoice.status,
                };
            }),
        [invoices]
    );

    const filteredInvoices = useMemo(() => {
        let result = normalizedInvoices.filter((invoice) => {
            const query = search.toLowerCase().trim();

            const matchesSearch =
                !query ||
                invoice.invoiceNumber.toLowerCase().includes(query) ||
                invoice.studentName.toLowerCase().includes(query) ||
                invoice.studentId.toLowerCase().includes(query) ||
                invoice.description.toLowerCase().includes(query);

            const matchesStatus =
                statusFilter === "ALL" || invoice.status === statusFilter;

            const matchesAging =
                agingFilter === "ALL" ||
                getAgingCategory(invoice.daysOverdue) === agingFilter;

            const matchesFrom =
                !dateFrom || invoice.dueDate >= dateFrom;

            const matchesTo = !dateTo || invoice.dueDate <= dateTo;

            return (
                matchesSearch &&
                matchesStatus &&
                matchesAging &&
                matchesFrom &&
                matchesTo
            );
        });

        result = [...result].sort((a, b) => {
            if (sortBy === "highest") return b.dueAmount - a.dueAmount;
            if (sortBy === "oldest") return b.daysOverdue - a.daysOverdue;
            if (sortBy === "newest") return a.daysOverdue - b.daysOverdue;
            return a.studentName.localeCompare(b.studentName);
        });

        return result;
    }, [
        normalizedInvoices,
        search,
        statusFilter,
        agingFilter,
        sortBy,
        dateFrom,
        dateTo,
    ]);

    const totalOutstanding = normalizedInvoices.reduce(
        (sum, invoice) => sum + invoice.dueAmount,
        0
    );

    const overdueInvoices = normalizedInvoices.filter(
        (invoice) => invoice.daysOverdue > 0
    );

    const totalOverdue = overdueInvoices.reduce(
        (sum, invoice) => sum + invoice.dueAmount,
        0
    );

    const overdueStudentCount = new Set(
        overdueInvoices.map((invoice) => invoice.studentId)
    ).size;

    const agingData = agingRanges.map((range) => {
        const matchingInvoices = normalizedInvoices.filter(
            (invoice) =>
                invoice.daysOverdue >= range.min &&
                invoice.daysOverdue <= range.max
        );

        return {
            category: range.name,
            amount: matchingInvoices.reduce(
                (sum, invoice) => sum + invoice.dueAmount,
                0
            ),
            count: matchingInvoices.length,
            fill: range.color,
        };
    });

    const resetFilters = () => {
        setSearch("");
        setStatusFilter("ALL");
        setAgingFilter("ALL");
        setSortBy("highest");
        setDateFrom("");
        setDateTo("");
    };

    const exportCSV = () => {
        const headers = [
            "Invoice Number",
            "Student Name",
            "Student ID",
            "Program",
            "Description",
            "Invoice Amount",
            "Paid Amount",
            "Outstanding Amount",
            "Due Date",
            "Days Overdue",
            "Aging Category",
            "Status",
        ];

        const rows = filteredInvoices.map((invoice) => [
            invoice.invoiceNumber,
            invoice.studentName,
            invoice.studentId,
            invoice.program,
            invoice.description,
            invoice.invoiceAmount,
            invoice.paidAmount,
            invoice.dueAmount,
            invoice.dueDate,
            invoice.daysOverdue,
            getAgingCategory(invoice.daysOverdue),
            invoice.status,
        ]);

        const escapeCSV = (value: string | number) =>
            `"${String(value).replace(/"/g, '""')}"`;

        const csv = [headers, ...rows]
            .map((row) => row.map(escapeCSV).join(","))
            .join("\r\n");

        const blob = new Blob(["\uFEFF" + csv], {
            type: "text/csv;charset=utf-8;",
        });

        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");

        anchor.href = url;
        anchor.download = "campusflow-outstanding-fees-report.csv";

        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        URL.revokeObjectURL(url);
    };

    const clearSelectedInvoice = () => setSelectedInvoice(null);

    return (
        <main className="min-h-screen w-full min-w-0 overflow-x-clip bg-background text-foreground">
            <div className="mx-auto w-full min-w-0 space-y-6 p-3 sm:p-4 lg:p-6">
                {/* Header */}
                <div className="flex min-w-0 flex-col justify-between gap-4 lg:flex-row lg:items-center">
                    <div className="min-w-0">
                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            Outstanding Fees Report
                        </h1>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                            Monitor unpaid balances, overdue invoices, aging
                            categories and students requiring payment follow-up.
                        </p>
                    </div>

                    <div className="flex shrink-0 flex-wrap gap-2">
                        <button
                            type="button"
                            onClick={resetFilters}
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border bg-card px-3 text-sm font-medium transition hover:bg-muted"
                        >
                            <RefreshCw size={15} />
                            Reset filters
                        </button>
                        <button
                            type="button"
                            onClick={exportCSV}
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                        >
                            <Download size={16} />
                            Export CSV
                        </button>
                    </div>
                </div>

                {/* Report period */}
                <div className="flex min-w-0 flex-wrap items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm">
                    <CalendarDays
                        size={17}
                        className="shrink-0 text-muted-foreground"
                    />
                    <span className="font-medium">Report generated:</span>
                    <span className="text-muted-foreground">
                        October 10, 2026
                    </span>
                    <span className="hidden text-muted-foreground sm:inline">
                        ·
                    </span>
                    <span className="text-xs text-muted-foreground">
                        Outstanding balances across all listed invoices
                    </span>
                </div>

                {/* KPI cards */}
                <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <div className="min-w-0 rounded-xl border border-border bg-card p-5 shadow-sm">
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
                                <Wallet size={21} />
                            </div>
                            <span className="text-xs font-medium text-muted-foreground">
                                All invoices
                            </span>
                        </div>
                        <p className="mt-5 text-sm text-muted-foreground">
                            Total Outstanding
                        </p>
                        <p className="mt-1 break-words text-xl font-bold tracking-tight sm:text-2xl">
                            {currency(totalOutstanding)}
                        </p>
                        <p className="mt-2 text-xs text-muted-foreground">
                            Remaining unpaid balance
                        </p>
                    </div>

                    <div className="min-w-0 rounded-xl border border-border bg-card p-5 shadow-sm">
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400">
                                <AlertTriangle size={21} />
                            </div>
                            <span className="flex items-center gap-1 text-xs font-semibold text-red-600">
                                <ArrowUpRight size={14} />
                                Overdue
                            </span>
                        </div>
                        <p className="mt-5 text-sm text-muted-foreground">
                            Overdue Amount
                        </p>
                        <p className="mt-1 break-words text-xl font-bold tracking-tight sm:text-2xl">
                            {currency(totalOverdue)}
                        </p>
                        <p className="mt-2 text-xs text-muted-foreground">
                            Past their due date
                        </p>
                    </div>

                    <div className="min-w-0 rounded-xl border border-border bg-card p-5 shadow-sm">
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
                                <Clock3 size={21} />
                            </div>
                            <span className="text-xs font-medium text-muted-foreground">
                                Requires follow-up
                            </span>
                        </div>
                        <p className="mt-5 text-sm text-muted-foreground">
                            Overdue Invoices
                        </p>
                        <p className="mt-1 text-2xl font-bold tracking-tight">
                            {overdueInvoices.length}
                        </p>
                        <p className="mt-2 text-xs text-muted-foreground">
                            Invoice records past due
                        </p>
                    </div>

                    <div className="min-w-0 rounded-xl border border-border bg-card p-5 shadow-sm">
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-400">
                                <Users size={21} />
                            </div>
                            <span className="text-xs font-medium text-muted-foreground">
                                Unique students
                            </span>
                        </div>
                        <p className="mt-5 text-sm text-muted-foreground">
                            Students With Overdue Fees
                        </p>
                        <p className="mt-1 text-2xl font-bold tracking-tight">
                            {overdueStudentCount}
                        </p>
                        <p className="mt-2 text-xs text-muted-foreground">
                            Students needing follow-up
                        </p>
                    </div>
                </div>

                {/* Aging chart and summary */}
                <div className="grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-3">
                    <Panel className="xl:col-span-2">
                        <SectionHeading
                            title="Outstanding Fees Aging"
                            description="Remaining balances grouped by days past due"
                            action={
                                <span className="shrink-0 rounded-lg bg-muted px-3 py-1.5 text-xs font-medium">
                                    {agingData.reduce(
                                        (sum, item) => sum + item.count,
                                        0
                                    )}{" "}
                                    invoices
                                </span>
                            }
                        />

                        <div className="h-[290px] w-full min-w-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={agingData}
                                    margin={{
                                        top: 8,
                                        right: 4,
                                        left: -12,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid
                                        stroke="currentColor"
                                        strokeOpacity={0.1}
                                        vertical={false}
                                    />
                                    <XAxis
                                        dataKey="category"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{
                                            fill: "currentColor",
                                            fontSize: 10,
                                        }}
                                        interval={0}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{
                                            fill: "currentColor",
                                            fontSize: 10,
                                        }}
                                        tickFormatter={(value) =>
                                            `${value / 1000}k`
                                        }
                                        width={42}
                                    />
                                    <Tooltip
                                        formatter={(value) => [
                                            currency(Number(value)),
                                            "Outstanding",
                                        ]}
                                        labelFormatter={(label) =>
                                            `Aging: ${label}`
                                        }
                                        contentStyle={{
                                            borderRadius: 12,
                                            border: "1px solid var(--border)",
                                            background: "var(--card)",
                                            color: "var(--card-foreground)",
                                            fontSize: 12,
                                        }}
                                    />
                                    <Bar
                                        dataKey="amount"
                                        radius={[6, 6, 0, 0]}
                                    >
                                        {agingData.map((item) => (
                                            <Cell
                                                key={item.category}
                                                fill={item.fill}
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Panel>

                    <Panel>
                        <SectionHeading
                            title="Aging Summary"
                            description="Prioritize older balances first"
                        />

                        <div className="space-y-5">
                            {agingData.map((item) => {
                                const percentage =
                                    totalOutstanding > 0
                                        ? (item.amount / totalOutstanding) *
                                        100
                                        : 0;

                                return (
                                    <div
                                        key={item.category}
                                        className="min-w-0"
                                    >
                                        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className="size-2.5 shrink-0 rounded-full"
                                                    style={{
                                                        backgroundColor:
                                                            item.fill,
                                                    }}
                                                />
                                                <span className="text-sm font-medium">
                                                    {item.category ===
                                                        "CURRENT"
                                                        ? "Current"
                                                        : item.category}
                                                </span>
                                            </div>
                                            <span className="text-sm font-semibold">
                                                {currency(item.amount)}
                                            </span>
                                        </div>

                                        <div className="h-2 overflow-hidden rounded-full bg-muted">
                                            <div
                                                className="h-full rounded-full transition-all"
                                                style={{
                                                    width: `${Math.min(percentage, 100)}%`,
                                                    backgroundColor: item.fill,
                                                }}
                                            />
                                        </div>

                                        <p className="mt-1.5 text-xs text-muted-foreground">
                                            {item.count} invoice
                                            {item.count === 1 ? "" : "s"} ·{" "}
                                            {percentage.toFixed(1)}% of total
                                            outstanding
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/30">
                            <div className="flex items-start gap-3">
                                <AlertTriangle
                                    size={18}
                                    className="mt-0.5 shrink-0 text-red-600 dark:text-red-400"
                                />
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-red-800 dark:text-red-300">
                                        High-priority follow-up
                                    </p>
                                    <p className="mt-1 text-xs leading-5 text-red-700 dark:text-red-400">
                                        Review invoices overdue by more than 60
                                        days first.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Panel>
                </div>

                {/* Filters */}
                <Panel>
                    <SectionHeading
                        title="Outstanding Invoice Details"
                        description="Search, filter and review each unpaid invoice"
                        action={
                            <button
                                type="button"
                                onClick={resetFilters}
                                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                            >
                                <RefreshCw size={14} />
                                Clear filters
                            </button>
                        }
                    />

                    <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-6">
                        <div className="relative min-w-0 sm:col-span-2">
                            <Search
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                            />
                            <input
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                                placeholder="Student, ID or invoice..."
                                className="h-10 w-full min-w-0 rounded-lg border border-border bg-background pl-9 pr-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                            />
                        </div>

                        <div className="relative min-w-0">
                            <Filter
                                size={15}
                                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                            />
                            <select
                                value={statusFilter}
                                onChange={(event) =>
                                    setStatusFilter(event.target.value)
                                }
                                className="h-10 w-full min-w-0 appearance-none rounded-lg border border-border bg-background pl-9 pr-7 text-sm outline-none focus:border-primary"
                            >
                                <option value="ALL">All statuses</option>
                                <option value="OVERDUE">Overdue</option>
                                <option value="ISSUED">Issued</option>
                                <option value="PARTIALLY_PAID">
                                    Partially paid
                                </option>
                            </select>
                            <ChevronDown
                                size={14}
                                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                            />
                        </div>

                        <div className="relative min-w-0">
                            <select
                                value={agingFilter}
                                onChange={(event) =>
                                    setAgingFilter(event.target.value)
                                }
                                className="h-10 w-full min-w-0 appearance-none rounded-lg border border-border bg-background px-3 pr-7 text-sm outline-none focus:border-primary"
                            >
                                <option value="ALL">All aging</option>
                                {agingRanges.map((range) => (
                                    <option
                                        key={range.name}
                                        value={range.name}
                                    >
                                        {range.name}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown
                                size={14}
                                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                            />
                        </div>

                        <div className="relative min-w-0">
                            <select
                                value={sortBy}
                                onChange={(event) =>
                                    setSortBy(event.target.value)
                                }
                                className="h-10 w-full min-w-0 appearance-none rounded-lg border border-border bg-background px-3 pr-7 text-sm outline-none focus:border-primary"
                            >
                                <option value="highest">Highest amount</option>
                                <option value="oldest">Oldest overdue</option>
                                <option value="newest">Least overdue</option>
                                <option value="student">Student name</option>
                            </select>
                            <ChevronDown
                                size={14}
                                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                            />
                        </div>
                    </div>

                    <div className="mt-4 grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">
                        <label className="flex min-w-0 items-center gap-3">
                            <span className="shrink-0 text-xs text-muted-foreground">
                                Due from
                            </span>
                            <input
                                type="date"
                                value={dateFrom}
                                onChange={(event) =>
                                    setDateFrom(event.target.value)
                                }
                                className="h-9 min-w-0 flex-1 rounded-lg border border-border bg-background px-2 text-sm outline-none focus:border-primary sm:px-3"
                            />
                        </label>

                        <label className="flex min-w-0 items-center gap-3">
                            <span className="shrink-0 text-xs text-muted-foreground">
                                Due to
                            </span>
                            <input
                                type="date"
                                value={dateTo}
                                onChange={(event) =>
                                    setDateTo(event.target.value)
                                }
                                className="h-9 min-w-0 flex-1 rounded-lg border border-border bg-background px-2 text-sm outline-none focus:border-primary sm:px-3"
                            />
                        </label>
                    </div>
                </Panel>

                {/* Invoice table */}
                <Panel className="overflow-hidden">
                    <div className="mb-4 flex min-w-0 flex-wrap items-center justify-between gap-3">
                        <div className="min-w-0">
                            <h2 className="text-base font-semibold">
                                Invoice Register
                            </h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Showing {filteredInvoices.length} of{" "}
                                {normalizedInvoices.length} invoices
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={exportCSV}
                            className="inline-flex h-9 shrink-0 items-center gap-2 rounded-lg border border-border px-3 text-sm font-medium transition hover:bg-muted"
                        >
                            <ArrowDownToLine size={15} />
                            Export results
                        </button>
                    </div>

                    {/* Fixed table layout prevents content from widening the page */}
                    <div className="w-full min-w-0 overflow-hidden">
                        <table className="w-full table-fixed border-collapse text-left text-[11px] sm:text-xs lg:text-sm">
                            <colgroup>
                                <col className="w-[19%]" />
                                <col className="w-[13%]" />
                                <col className="w-[10%]" />
                                <col className="w-[8%]" />
                                <col className="w-[11%]" />
                                <col className="w-[12%]" />
                                <col className="w-[8%]" />
                                <col className="w-[10%]" />
                                <col className="w-[9%]" />
                            </colgroup>

                            <thead>
                                <tr className="border-y border-border bg-muted/40 text-[9px] uppercase tracking-tight text-muted-foreground sm:text-[10px] lg:text-xs">
                                    <th className="break-words px-1.5 py-3 font-medium sm:px-2 lg:px-3">
                                        Invoice / Student
                                    </th>
                                    <th className="break-words px-1.5 py-3 font-medium sm:px-2 lg:px-3">
                                        Description
                                    </th>
                                    <th className="break-words px-1 py-3 font-medium sm:px-2 lg:px-3">
                                        Invoice amount
                                    </th>
                                    <th className="break-words px-1 py-3 font-medium sm:px-2 lg:px-3">
                                        Paid
                                    </th>
                                    <th className="break-words px-1 py-3 font-medium sm:px-2 lg:px-3">
                                        Outstanding
                                    </th>
                                    <th className="break-words px-1 py-3 font-medium sm:px-2 lg:px-3">
                                        Due date
                                    </th>
                                    <th className="break-words px-1 py-3 font-medium sm:px-2 lg:px-3">
                                        Aging
                                    </th>
                                    <th className="break-words px-1 py-3 font-medium sm:px-2 lg:px-3">
                                        Status
                                    </th>
                                    <th className="break-words px-1 py-3 text-center font-medium sm:px-2 lg:px-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredInvoices.map((invoice) => (
                                    <tr
                                        key={invoice.id}
                                        className="border-b border-border transition hover:bg-muted/30"
                                    >
                                        <td className="break-words px-1.5 py-3 sm:px-2 sm:py-4 lg:px-3">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setSelectedInvoice(invoice)
                                                }
                                                className="max-w-full break-all text-left font-semibold text-primary hover:underline"
                                            >
                                                {invoice.invoiceNumber}
                                            </button>
                                            <p className="mt-1 break-words font-medium">
                                                {invoice.studentName}
                                            </p>
                                            <p className="mt-1 break-all text-[10px] text-muted-foreground sm:text-xs">
                                                {invoice.studentId}
                                            </p>
                                        </td>

                                        <td className="break-words px-1.5 py-3 sm:px-2 sm:py-4 lg:px-3">
                                            <p className="font-medium">
                                                {invoice.description}
                                            </p>
                                            <p className="mt-1 break-words text-[10px] text-muted-foreground sm:text-xs">
                                                {invoice.program}
                                            </p>
                                        </td>

                                        <td className="break-words px-1 py-3 text-muted-foreground sm:px-2 sm:py-4 lg:px-3">
                                            {currency(invoice.invoiceAmount)}
                                        </td>

                                        <td className="break-words px-1 py-3 text-emerald-700 dark:text-emerald-400 sm:px-2 sm:py-4 lg:px-3">
                                            {currency(invoice.paidAmount)}
                                        </td>

                                        <td className="break-words px-1 py-3 font-semibold sm:px-2 sm:py-4 lg:px-3">
                                            {currency(invoice.dueAmount)}
                                        </td>

                                        <td className="break-words px-1 py-3 sm:px-2 sm:py-4 lg:px-3">
                                            <p>{formatDate(invoice.dueDate)}</p>
                                            {invoice.daysOverdue > 0 && (
                                                <p className="mt-1 break-words text-[10px] text-red-600 dark:text-red-400 sm:text-xs">
                                                    {invoice.daysOverdue} days overdue
                                                </p>
                                            )}
                                        </td>

                                        <td className="break-words px-1 py-3 sm:px-2 sm:py-4 lg:px-3">
                                            <AgingBadge
                                                days={invoice.daysOverdue}
                                            />
                                        </td>

                                        <td className="break-words px-1 py-3 sm:px-2 sm:py-4 lg:px-3">
                                            <StatusBadge
                                                status={invoice.status}
                                            />
                                        </td>

                                        <td className="px-1 py-3 sm:px-2 sm:py-4 lg:px-3">
                                            <div className="flex flex-wrap items-center justify-center gap-1">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setSelectedInvoice(
                                                            invoice
                                                        )
                                                    }
                                                    className="inline-flex size-7 shrink-0 items-center justify-center rounded-md border border-border hover:bg-muted sm:size-8"
                                                    aria-label={`View ${invoice.invoiceNumber}`}
                                                    title="Quick view"
                                                >
                                                    <FileText size={14} />
                                                </button>
                                                <Link
                                                    href={`/accountant/invoices/${invoice.id}`}
                                                    className="inline-flex size-7 shrink-0 items-center justify-center rounded-md border border-border hover:bg-muted sm:size-8"
                                                    aria-label={`Open ${invoice.invoiceNumber}`}
                                                    title="Open invoice"
                                                >
                                                    <ArrowRight size={14} />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {filteredInvoices.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={9}
                                            className="px-2 py-14 text-center"
                                        >
                                            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted">
                                                <Search
                                                    size={20}
                                                    className="text-muted-foreground"
                                                />
                                            </div>
                                            <p className="mt-3 font-semibold">
                                                No invoices found
                                            </p>
                                            <p className="mt-1 text-sm text-muted-foreground">
                                                Try changing your search or
                                                filters.
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

                            {filteredInvoices.length > 0 && (
                                <tfoot>
                                    <tr className="border-t-2 border-border bg-muted/30">
                                        <td
                                            colSpan={4}
                                            className="break-words px-1.5 py-4 text-xs font-semibold sm:px-2 lg:px-3 lg:text-sm"
                                        >
                                            Filtered outstanding total
                                        </td>
                                        <td className="break-words px-1 py-4 font-bold sm:px-2 lg:px-3">
                                            {currency(
                                                filteredInvoices.reduce(
                                                    (sum, invoice) =>
                                                        sum + invoice.dueAmount,
                                                    0
                                                )
                                            )}
                                        </td>
                                        <td colSpan={4} />
                                    </tr>
                                </tfoot>
                            )}
                        </table>
                    </div>

                    <div className="mt-4 flex min-w-0 flex-wrap items-start justify-between gap-2 text-xs text-muted-foreground">
                        <span>
                            Aging is calculated using the invoice due date and
                            report date.
                        </span>
                        <span>
                            Sample data · Connect to your backend for live
                            reporting.
                        </span>
                    </div>
                </Panel>

                {/* Invoice details dialog */}
                {selectedInvoice && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-3 sm:p-4"
                        onMouseDown={(event) => {
                            if (event.target === event.currentTarget) {
                                clearSelectedInvoice();
                            }
                        }}
                    >
                        <section
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="invoice-dialog-title"
                            className="my-auto max-h-[90dvh] w-full max-w-xl min-w-0 overflow-y-auto overflow-x-hidden rounded-2xl border border-border bg-card p-4 shadow-2xl sm:p-6"
                        >
                            <div className="flex min-w-0 items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                        Invoice details
                                    </p>
                                    <h2
                                        id="invoice-dialog-title"
                                        className="mt-1 break-words text-xl font-bold"
                                    >
                                        {selectedInvoice.invoiceNumber}
                                    </h2>
                                </div>

                                <button
                                    type="button"
                                    onClick={clearSelectedInvoice}
                                    className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-border hover:bg-muted"
                                    aria-label="Close invoice details"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="mt-5 min-w-0 rounded-xl border border-border p-4">
                                <p className="break-words text-sm font-semibold">
                                    {selectedInvoice.studentName}
                                </p>
                                <p className="mt-1 break-all text-xs text-muted-foreground">
                                    {selectedInvoice.studentId}
                                </p>
                                <p className="mt-2 break-words text-sm text-muted-foreground">
                                    {selectedInvoice.program}
                                </p>
                                <p className="mt-3 break-words text-sm">
                                    {selectedInvoice.description}
                                </p>
                            </div>

                            <div className="mt-4 grid min-w-0 grid-cols-2 gap-3">
                                <div className="min-w-0 rounded-xl bg-muted/50 p-3 sm:p-4">
                                    <p className="text-xs text-muted-foreground">
                                        Invoice amount
                                    </p>
                                    <p className="mt-1 break-words text-base font-bold sm:text-lg">
                                        {currency(selectedInvoice.invoiceAmount)}
                                    </p>
                                </div>

                                <div className="min-w-0 rounded-xl bg-muted/50 p-3 sm:p-4">
                                    <p className="text-xs text-muted-foreground">
                                        Paid amount
                                    </p>
                                    <p className="mt-1 break-words text-base font-bold text-emerald-600 sm:text-lg">
                                        {currency(selectedInvoice.paidAmount)}
                                    </p>
                                </div>

                                <div className="min-w-0 rounded-xl border border-red-200 p-3 dark:border-red-900 sm:p-4">
                                    <p className="text-xs text-muted-foreground">
                                        Outstanding balance
                                    </p>
                                    <p className="mt-1 break-words text-base font-bold text-red-600 dark:text-red-400 sm:text-lg">
                                        {currency(selectedInvoice.dueAmount)}
                                    </p>
                                </div>

                                <div className="min-w-0 rounded-xl border border-border p-3 sm:p-4">
                                    <p className="text-xs text-muted-foreground">
                                        Due date
                                    </p>
                                    <p className="mt-1 break-words text-sm font-semibold">
                                        {formatDate(selectedInvoice.dueDate)}
                                    </p>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {selectedInvoice.daysOverdue > 0
                                            ? `${selectedInvoice.daysOverdue} days overdue`
                                            : "Not overdue"}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 flex min-w-0 flex-wrap items-center justify-between gap-3">
                                <StatusBadge status={selectedInvoice.status} />

                                <div className="flex min-w-0 flex-wrap gap-2">
                                    <button
                                        type="button"
                                        onClick={clearSelectedInvoice}
                                        className="h-10 rounded-lg border border-border px-4 text-sm font-medium hover:bg-muted"
                                    >
                                        Close
                                    </button>
                                    <Link
                                        href={`/accountant/invoices/${selectedInvoice.id}`}
                                        className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-semibold text-primary-foreground hover:opacity-90 sm:px-4"
                                    >
                                        Full details
                                        <ArrowRight size={15} />
                                    </Link>
                                </div>
                            </div>
                        </section>
                    </div>
                )}
            </div>
        </main>
    );
}
