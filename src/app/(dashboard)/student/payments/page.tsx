




// "use client";

// import React, { useMemo, useState } from "react";
// import {
//   ArrowDownToLine,
//   CalendarDays,
//   CheckCircle2,
//   ChevronRight,
//   Clock3,
//   CreditCard,
//   Download,
//   Eye,
//   FileText,
//   Filter,
//   History,
//   Receipt,
//   Search,
//   ShieldCheck,
//   WalletCards,
//   XCircle,
// } from "lucide-react";

// type PaymentStatus = "PAID" | "PENDING" | "FAILED" | "REFUNDED";

// type Payment = {
//   id: string;
//   transactionId: string;
//   invoiceId: string;
//   description: string;
//   amount: number;
//   method: string;
//   date: string;
//   status: PaymentStatus;
// };

// const payments: Payment[] = [
//   {
//     id: "PAY-001",
//     transactionId: "TXN-2026-000124",
//     invoiceId: "INV-2026-0012",
//     description: "Semester Tuition Fee",
//     amount: 45000,
//     method: "SSLCommerz",
//     date: "2026-09-28",
//     status: "PAID",
//   },
//   {
//     id: "PAY-002",
//     transactionId: "TXN-2026-000118",
//     invoiceId: "INV-2026-0009",
//     description: "Registration Fee",
//     amount: 5000,
//     method: "bKash",
//     date: "2026-09-15",
//     status: "PAID",
//   },
//   {
//     id: "PAY-003",
//     transactionId: "TXN-2026-000097",
//     invoiceId: "INV-2026-0006",
//     description: "Library & Lab Fee",
//     amount: 3500,
//     method: "Card",
//     date: "2026-08-30",
//     status: "PAID",
//   },
//   {
//     id: "PAY-004",
//     transactionId: "TXN-2026-000082",
//     invoiceId: "INV-2026-0004",
//     description: "Exam Fee",
//     amount: 2500,
//     method: "SSLCommerz",
//     date: "2026-08-12",
//     status: "PENDING",
//   },
//   {
//     id: "PAY-005",
//     transactionId: "TXN-2026-000061",
//     invoiceId: "INV-2026-0002",
//     description: "Admission Fee",
//     amount: 12000,
//     method: "Bank Transfer",
//     date: "2026-07-20",
//     status: "FAILED",
//   },
// ];

// const currency = (amount: number) =>
//   new Intl.NumberFormat("en-BD", {
//     style: "currency",
//     currency: "BDT",
//     maximumFractionDigits: 0,
//   }).format(amount);

// const formatDate = (date: string) =>
//   new Intl.DateTimeFormat("en-BD", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   }).format(new Date(date));

// export default function Payments() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState<"ALL" | PaymentStatus>(
//     "ALL",
//   );

//   const filteredPayments = useMemo(() => {
//     const search = searchTerm.toLowerCase().trim();

//     return payments.filter((payment) => {
//       const matchesSearch =
//         !search ||
//         payment.description.toLowerCase().includes(search) ||
//         payment.transactionId.toLowerCase().includes(search) ||
//         payment.invoiceId.toLowerCase().includes(search) ||
//         payment.method.toLowerCase().includes(search);

//       const matchesStatus =
//         statusFilter === "ALL" || payment.status === statusFilter;

//       return matchesSearch && matchesStatus;
//     });
//   }, [searchTerm, statusFilter]);

//   const totalPaid = payments
//     .filter((payment) => payment.status === "PAID")
//     .reduce((total, payment) => total + payment.amount, 0);

//   const pendingAmount = payments
//     .filter((payment) => payment.status === "PENDING")
//     .reduce((total, payment) => total + payment.amount, 0);

//   const successfulPayments = payments.filter(
//     (payment) => payment.status === "PAID",
//   ).length;

//   return (
//     <div className="min-h-screen bg-slate-50 p-4 dark:bg-slate-950 sm:p-6 lg:p-8">
//       <div className="mx-auto max-w-7xl space-y-6">
//         {/* Header */}
//         <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//           <div>

//             <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
//               Payments
//             </h1>

//             <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
//               View your payment history and transaction details.
//             </p>
//           </div>

//           <a
//             href="/student/invoices"
//             className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
//           >
//             <Receipt className="h-4 w-4" />
//             View Invoices
//           </a>
//         </div>

//         {/* Summary Cards */}
//         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
//           <SummaryCard
//             title="Total Paid"
//             value={currency(totalPaid)}
//             description="Successful payments"
//             icon={<WalletCards className="h-5 w-5" />}
//             iconClass="bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400"
//           />

//           <SummaryCard
//             title="Pending"
//             value={currency(pendingAmount)}
//             description="Awaiting confirmation"
//             icon={<Clock3 className="h-5 w-5" />}
//             iconClass="bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400"
//           />

//           <SummaryCard
//             title="Successful"
//             value={successfulPayments.toString()}
//             description="Completed transactions"
//             icon={<CheckCircle2 className="h-5 w-5" />}
//             iconClass="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
//           />

//           <SummaryCard
//             title="Transactions"
//             value={payments.length.toString()}
//             description="Total payment records"
//             icon={<History className="h-5 w-5" />}
//             iconClass="bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-400"
//           />
//         </div>

//         {/* Payment Security Banner */}
//         <div className="flex flex-col gap-4 rounded-xl border border-blue-100 bg-blue-50 p-4 dark:border-blue-900/40 dark:bg-blue-950/20 sm:flex-row sm:items-center">
//           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400">
//             <ShieldCheck className="h-5 w-5" />
//           </div>

//           <div className="min-w-0">
//             <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300">
//               Secure Payment Records
//             </h3>
//             <p className="mt-0.5 text-xs leading-5 text-blue-700 dark:text-blue-400">
//               All payment transactions are securely recorded and linked to
//               your student account.
//             </p>
//           </div>
//         </div>

//         {/* Payment History */}
//         <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
//           {/* Section Header */}
//           <div className="border-b border-slate-200 p-5 dark:border-slate-800">
//             <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
//               <div>
//                 <div className="flex items-center gap-2">
//                   <CreditCard className="h-5 w-5 text-blue-700 dark:text-blue-400" />
//                   <h2 className="font-semibold text-slate-900 dark:text-white">
//                     Payment History
//                   </h2>
//                 </div>

//                 <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
//                   {filteredPayments.length} payment
//                   {filteredPayments.length !== 1 ? "s" : ""} found
//                 </p>
//               </div>

//               <div className="flex flex-col gap-3 sm:flex-row">
//                 {/* Search */}
//                 <div className="relative">
//                   <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
//                   <input
//                     type="text"
//                     value={searchTerm}
//                     onChange={(event) => setSearchTerm(event.target.value)}
//                     placeholder="Search payments..."
//                     className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white sm:w-64"
//                   />
//                 </div>

//                 {/* Filter */}
//                 <div className="relative">
//                   <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

//                   <select
//                     value={statusFilter}
//                     onChange={(event) =>
//                       setStatusFilter(
//                         event.target.value as "ALL" | PaymentStatus,
//                       )
//                     }
//                     className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white pl-9 pr-8 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 sm:w-40"
//                   >
//                     <option value="ALL">All Status</option>
//                     <option value="PAID">Paid</option>
//                     <option value="PENDING">Pending</option>
//                     <option value="FAILED">Failed</option>
//                     <option value="REFUNDED">Refunded</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Desktop Table */}
//           <div className="hidden overflow-x-auto md:block">
//             <table className="w-full min-w-[900px]">
//               <thead>
//                 <tr className="border-b border-slate-200 bg-slate-50/70 dark:border-slate-800 dark:bg-slate-950/40">
//                   <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
//                     Payment
//                   </th>
//                   <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
//                     Transaction ID
//                   </th>
//                   <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
//                     Date
//                   </th>
//                   <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
//                     Method
//                   </th>
//                   <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
//                     Amount
//                   </th>
//                   <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
//                     Status
//                   </th>
//                   <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
//                     Action
//                   </th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
//                 {filteredPayments.map((payment) => (
//                   <PaymentTableRow key={payment.id} payment={payment} />
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Mobile Cards */}
//           <div className="divide-y divide-slate-200 md:hidden dark:divide-slate-800">
//             {filteredPayments.map((payment) => (
//               <PaymentMobileCard key={payment.id} payment={payment} />
//             ))}
//           </div>

//           {/* Empty State */}
//           {filteredPayments.length === 0 && (
//             <div className="px-5 py-16 text-center">
//               <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
//                 <Search className="h-5 w-5" />
//               </div>

//               <h3 className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">
//                 No payments found
//               </h3>

//               <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
//                 Try changing your search or status filter.
//               </p>
//             </div>
//           )}
//         </section>

//         {/* Payment Methods */}
//         <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
//           <div className="mb-5">
//             <h2 className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
//               <CreditCard className="h-5 w-5 text-blue-700 dark:text-blue-400" />
//               Supported Payment Methods
//             </h2>
//             <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
//               Available payment methods for university fees.
//             </p>
//           </div>

//           <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
//             <PaymentMethod
//               icon={<CreditCard className="h-5 w-5" />}
//               title="Credit / Debit Card"
//               description="Visa, Mastercard"
//             />

//             <PaymentMethod
//               icon={<WalletCards className="h-5 w-5" />}
//               title="bKash"
//               description="Mobile payment"
//             />

//             <PaymentMethod
//               icon={<Receipt className="h-5 w-5" />}
//               title="SSLCommerz"
//               description="Online payment gateway"
//             />

//             <PaymentMethod
//               icon={<FileText className="h-5 w-5" />}
//               title="Bank Transfer"
//               description="Manual payment"
//             />
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* Summary Card                                                               */
// /* -------------------------------------------------------------------------- */

// function SummaryCard({
//   title,
//   value,
//   description,
//   icon,
//   iconClass,
// }: {
//   title: string;
//   value: string;
//   description: string;
//   icon: React.ReactNode;
//   iconClass: string;
// }) {
//   return (
//     <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
//       <div className="flex items-start justify-between gap-4">
//         <div className="min-w-0">
//           <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
//             {title}
//           </p>

//           <p className="mt-2 truncate text-2xl font-bold text-slate-900 dark:text-white">
//             {value}
//           </p>

//           <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
//             {description}
//           </p>
//         </div>

//         <div
//           className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconClass}`}
//         >
//           {icon}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* Desktop Payment Row                                                        */
// /* -------------------------------------------------------------------------- */

// function PaymentTableRow({ payment }: { payment: Payment }) {
//   return (
//     <tr className="transition hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
//       <td className="px-5 py-4">
//         <div className="flex items-center gap-3">
//           <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
//             <Receipt className="h-4 w-4" />
//           </div>

//           <div className="min-w-0">
//             <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
//               {payment.description}
//             </p>

//             <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
//               {payment.invoiceId}
//             </p>
//           </div>
//         </div>
//       </td>

//       <td className="px-5 py-4">
//         <span className="font-mono text-xs text-slate-600 dark:text-slate-300">
//           {payment.transactionId}
//         </span>
//       </td>

//       <td className="px-5 py-4">
//         <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
//           <CalendarDays className="h-4 w-4 text-slate-400" />
//           {formatDate(payment.date)}
//         </div>
//       </td>

//       <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
//         {payment.method}
//       </td>

//       <td className="px-5 py-4 text-right">
//         <span className="text-sm font-bold text-slate-900 dark:text-white">
//           {currency(payment.amount)}
//         </span>
//       </td>

//       <td className="px-5 py-4 text-center">
//         <PaymentStatusBadge status={payment.status} />
//       </td>

//       <td className="px-5 py-4">
//         <div className="flex justify-end gap-2">
//           <button
//             type="button"
//             title="View payment"
//             className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
//           >
//             <Eye className="h-4 w-4" />
//           </button>

//           {payment.status === "PAID" && (
//             <button
//               type="button"
//               title="Download receipt"
//               className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
//             >
//               <Download className="h-4 w-4" />
//             </button>
//           )}
//         </div>
//       </td>
//     </tr>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* Mobile Payment Card                                                        */
// /* -------------------------------------------------------------------------- */

// function PaymentMobileCard({ payment }: { payment: Payment }) {
//   return (
//     <div className="p-4">
//       <div className="flex items-start justify-between gap-3">
//         <div className="flex min-w-0 items-center gap-3">
//           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
//             <Receipt className="h-4 w-4" />
//           </div>

//           <div className="min-w-0">
//             <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
//               {payment.description}
//             </p>

//             <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
//               {payment.invoiceId}
//             </p>
//           </div>
//         </div>

//         <PaymentStatusBadge status={payment.status} />
//       </div>

//       <div className="mt-4 grid grid-cols-2 gap-3 rounded-lg bg-slate-50 p-3 dark:bg-slate-950/60">
//         <InfoItem
//           label="Amount"
//           value={currency(payment.amount)}
//           strong
//         />

//         <InfoItem label="Method" value={payment.method} />

//         <InfoItem label="Date" value={formatDate(payment.date)} />

//         <InfoItem
//           label="Transaction"
//           value={payment.transactionId}
//           mono
//         />
//       </div>

//       <div className="mt-3 flex gap-2">
//         <button
//           type="button"
//           className="flex h-9 flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
//         >
//           <Eye className="h-4 w-4" />
//           View Details
//         </button>

//         {payment.status === "PAID" && (
//           <button
//             type="button"
//             className="flex h-9 flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
//           >
//             <ArrowDownToLine className="h-4 w-4" />
//             Receipt
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* Status Badge                                                               */
// /* -------------------------------------------------------------------------- */

// function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
//   const config: Record<
//     PaymentStatus,
//     {
//       label: string;
//       className: string;
//       icon: React.ReactNode;
//     }
//   > = {
//     PAID: {
//       label: "Paid",
//       className:
//         "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
//       icon: <CheckCircle2 className="h-3.5 w-3.5" />,
//     },
//     PENDING: {
//       label: "Pending",
//       className:
//         "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
//       icon: <Clock3 className="h-3.5 w-3.5" />,
//     },
//     FAILED: {
//       label: "Failed",
//       className:
//         "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400",
//       icon: <XCircle className="h-3.5 w-3.5" />,
//     },
//     REFUNDED: {
//       label: "Refunded",
//       className:
//         "bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-400",
//       icon: <ArrowDownToLine className="h-3.5 w-3.5" />,
//     },
//   };

//   const item = config[status];

//   return (
//     <span
//       className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${item.className}`}
//     >
//       {item.icon}
//       {item.label}
//     </span>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* Info Item                                                                  */
// /* -------------------------------------------------------------------------- */

// function InfoItem({
//   label,
//   value,
//   strong = false,
//   mono = false,
// }: {
//   label: string;
//   value: string;
//   strong?: boolean;
//   mono?: boolean;
// }) {
//   return (
//     <div className="min-w-0">
//       <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
//         {label}
//       </p>

//       <p
//         className={`mt-1 truncate text-xs ${
//           strong
//             ? "font-bold text-slate-900 dark:text-white"
//             : "text-slate-600 dark:text-slate-300"
//         } ${mono ? "font-mono" : ""}`}
//       >
//         {value}
//       </p>
//     </div>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* Payment Method                                                              */
// /* -------------------------------------------------------------------------- */

// function PaymentMethod({
//   icon,
//   title,
//   description,
// }: {
//   icon: React.ReactNode;
//   title: string;
//   description: string;
// }) {
//   return (
//     <div className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 dark:border-slate-800">
//       <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
//         {icon}
//       </div>

//       <div className="min-w-0">
//         <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
//           {title}
//         </p>

//         <p className="truncate text-xs text-slate-500 dark:text-slate-400">
//           {description}
//         </p>
//       </div>
//     </div>
//   );
// }


























"use client";

import React, { useMemo, useState } from "react";
import {
  ArrowDownToLine,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  Download,
  Eye,
  FileDown,
  FileText,
  Filter,
  History,
  Receipt,
  Search,
  ShieldCheck,
  WalletCards,
  XCircle,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";

type PaymentStatus = "PAID" | "PENDING" | "FAILED" | "REFUNDED";

type Payment = {
  id: string;
  transactionId: string;
  invoiceId: string;
  description: string;
  amount: number;
  method: string;
  date: string;
  status: PaymentStatus;
};

const payments: Payment[] = [
  {
    id: "PAY-001",
    transactionId: "TXN-2026-000124",
    invoiceId: "INV-2026-0012",
    description: "Semester Tuition Fee",
    amount: 45000,
    method: "SSLCommerz",
    date: "2026-09-28",
    status: "PAID",
  },
  {
    id: "PAY-002",
    transactionId: "TXN-2026-000118",
    invoiceId: "INV-2026-0009",
    description: "Registration Fee",
    amount: 5000,
    method: "bKash",
    date: "2026-09-15",
    status: "PAID",
  },
  {
    id: "PAY-003",
    transactionId: "TXN-2026-000097",
    invoiceId: "INV-2026-0006",
    description: "Library & Lab Fee",
    amount: 3500,
    method: "Card",
    date: "2026-08-30",
    status: "PAID",
  },
  {
    id: "PAY-004",
    transactionId: "TXN-2026-000082",
    invoiceId: "INV-2026-0004",
    description: "Exam Fee",
    amount: 2500,
    method: "SSLCommerz",
    date: "2026-08-12",
    status: "PENDING",
  },
  {
    id: "PAY-005",
    transactionId: "TXN-2026-000061",
    invoiceId: "INV-2026-0002",
    description: "Admission Fee",
    amount: 12000,
    method: "Bank Transfer",
    date: "2026-07-20",
    status: "FAILED",
  },
];

const currency = (amount: number) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(amount);

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));

export default function Payments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "ALL" | PaymentStatus
  >("ALL");

  const [selectedPayment, setSelectedPayment] =
    useState<Payment | null>(null);

  const filteredPayments = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return payments.filter((payment) => {
      const matchesSearch =
        !search ||
        payment.description.toLowerCase().includes(search) ||
        payment.transactionId.toLowerCase().includes(search) ||
        payment.invoiceId.toLowerCase().includes(search) ||
        payment.method.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "ALL" ||
        payment.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const totalPaid = payments
    .filter((payment) => payment.status === "PAID")
    .reduce((total, payment) => total + payment.amount, 0);

  const pendingAmount = payments
    .filter((payment) => payment.status === "PENDING")
    .reduce((total, payment) => total + payment.amount, 0);

  const successfulPayments = payments.filter(
    (payment) => payment.status === "PAID",
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 p-4 dark:bg-slate-950 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Payments
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              View your payment history and transaction details.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Link
              href="#"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <FileDown className="h-4 w-4" />

              Export
            </Link>
            <Link
              href="/student/invoices"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <Receipt className="h-4 w-4" />
              View Invoices
            </Link>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            title="Total Paid"
            value={currency(totalPaid)}
            description="Successful payments"
            icon={<WalletCards className="h-5 w-5" />}
            iconClass="bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400"
          />

          <SummaryCard
            title="Pending"
            value={currency(pendingAmount)}
            description="Awaiting confirmation"
            icon={<ClockIcon />}
            iconClass="bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400"
          />

          <SummaryCard
            title="Successful"
            value={successfulPayments.toString()}
            description="Completed transactions"
            icon={<CheckCircle2 className="h-5 w-5" />}
            iconClass="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
          />

          <SummaryCard
            title="Transactions"
            value={payments.length.toString()}
            description="Total payment records"
            icon={<History className="h-5 w-5" />}
            iconClass="bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-400"
          />
        </div>

        {/* Security Banner */}
        <div className="flex flex-col gap-4 rounded-xl border border-blue-100 bg-blue-50 p-4 dark:border-blue-900/40 dark:bg-blue-950/20 sm:flex-row sm:items-center">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400">
            <ShieldCheck className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300">
              Secure Payment Records
            </h3>

            <p className="mt-0.5 text-xs leading-5 text-blue-700 dark:text-blue-400">
              All payment transactions are securely recorded and linked to
              your student account.
            </p>
          </div>
        </div>

        {/* Payment History */}
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

          {/* Section Header */}
          <div className="border-b border-slate-200 p-5 dark:border-slate-800">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-blue-700 dark:text-blue-400" />

                  <h2 className="font-semibold text-slate-900 dark:text-white">
                    Payment History
                  </h2>
                </div>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {filteredPayments.length} payment
                  {filteredPayments.length !== 1 ? "s" : ""} found
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">

                {/* Search */}
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(event) =>
                      setSearchTerm(event.target.value)
                    }
                    placeholder="Search payments..."
                    className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white sm:w-64"
                  />
                </div>

                {/* Filter */}
                <div className="relative">
                  <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <select
                    value={statusFilter}
                    onChange={(event) =>
                      setStatusFilter(
                        event.target.value as
                        | "ALL"
                        | PaymentStatus,
                      )
                    }
                    className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white pl-9 pr-8 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 sm:w-40"
                  >
                    <option value="ALL">All Status</option>
                    <option value="PAID">Paid</option>
                    <option value="PENDING">Pending</option>
                    <option value="FAILED">Failed</option>
                    <option value="REFUNDED">Refunded</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 dark:border-slate-800 dark:bg-slate-950/40">
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Payment
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Transaction ID
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Date
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Method
                  </th>

                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Amount
                  </th>

                  <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Status
                  </th>

                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredPayments.map((payment) => (
                  <PaymentTableRow
                    key={payment.id}
                    payment={payment}
                    onView={setSelectedPayment}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="divide-y divide-slate-200 md:hidden dark:divide-slate-800">
            {filteredPayments.map((payment) => (
              <PaymentMobileCard
                key={payment.id}
                payment={payment}
                onView={setSelectedPayment}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredPayments.length === 0 && (
            <div className="px-5 py-16 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                <Search className="h-5 w-5" />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">
                No payments found
              </h3>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Try changing your search or status filter.
              </p>
            </div>
          )}
        </section>

        {/* Payment Details Dialog */}
        <PaymentDetailsDialog
          payment={selectedPayment}
          open={!!selectedPayment}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedPayment(null);
            }
          }}
        />

        {/* Payment Methods */}
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-5">
            <h2 className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
              <CreditCard className="h-5 w-5 text-blue-700 dark:text-blue-400" />
              Supported Payment Methods
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Available payment methods for university fees.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <PaymentMethod
              icon={<CreditCard className="h-5 w-5" />}
              title="Credit / Debit Card"
              description="Visa, Mastercard"
            />

            <PaymentMethod
              icon={<WalletCards className="h-5 w-5" />}
              title="bKash"
              description="Mobile payment"
            />

            <PaymentMethod
              icon={<Receipt className="h-5 w-5" />}
              title="SSLCommerz"
              description="Online payment gateway"
            />

            <PaymentMethod
              icon={<FileText className="h-5 w-5" />}
              title="Bank Transfer"
              description="Manual payment"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Clock Icon                                                                 */
/* -------------------------------------------------------------------------- */

function ClockIcon() {
  return <Clock3 className="h-5 w-5" />;
}

/* -------------------------------------------------------------------------- */
/* Summary Card                                                               */
/* -------------------------------------------------------------------------- */

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
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <p className="mt-2 truncate text-2xl font-bold text-slate-900 dark:text-white">
            {value}
          </p>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>

        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconClass}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Desktop Payment Row                                                        */
/* -------------------------------------------------------------------------- */

function PaymentTableRow({
  payment,
  onView,
}: {
  payment: Payment;
  onView: (payment: Payment) => void;
}) {
  return (
    <tr className="transition hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
            <Receipt className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
              {payment.description}
            </p>

            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              {payment.invoiceId}
            </p>
          </div>
        </div>
      </td>

      <td className="px-5 py-4">
        <span className="font-mono text-xs text-slate-600 dark:text-slate-300">
          {payment.transactionId}
        </span>
      </td>

      <td className="px-5 py-4">
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <CalendarDays className="h-4 w-4 text-slate-400" />
          {formatDate(payment.date)}
        </div>
      </td>

      <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
        {payment.method}
      </td>

      <td className="px-5 py-4 text-right">
        <span className="text-sm font-bold text-slate-900 dark:text-white">
          {currency(payment.amount)}
        </span>
      </td>

      <td className="px-5 py-4 text-center">
        <PaymentStatusBadge status={payment.status} />
      </td>

      <td className="px-5 py-4">
        <div className="flex justify-end gap-2">
          <button
            type="button"
            title="View payment"
            onClick={() => onView(payment)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <Eye className="h-4 w-4" />
          </button>

          {payment.status === "PAID" && (
            <button
              type="button"
              title="Download receipt"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <Download className="h-4 w-4" />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

/* -------------------------------------------------------------------------- */
/* Mobile Payment Card                                                        */
/* -------------------------------------------------------------------------- */

function PaymentMobileCard({
  payment,
  onView,
}: {
  payment: Payment;
  onView: (payment: Payment) => void;
}) {
  return (
    <div className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
            <Receipt className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
              {payment.description}
            </p>

            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              {payment.invoiceId}
            </p>
          </div>
        </div>

        <PaymentStatusBadge status={payment.status} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 rounded-lg bg-slate-50 p-3 dark:bg-slate-950/60">
        <InfoItem
          label="Amount"
          value={currency(payment.amount)}
          strong
        />

        <InfoItem label="Method" value={payment.method} />

        <InfoItem label="Date" value={formatDate(payment.date)} />

        <InfoItem
          label="Transaction"
          value={payment.transactionId}
          mono
        />
      </div>

      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => onView(payment)}
          className="flex h-9 flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <Eye className="h-4 w-4" />
          View Details
        </button>

        {payment.status === "PAID" && (
          <button
            type="button"
            className="flex h-9 flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <ArrowDownToLine className="h-4 w-4" />
            Receipt
          </button>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Payment Details Dialog                                                     */
/* -------------------------------------------------------------------------- */

function PaymentDetailsDialog({
  payment,
  open,
  onOpenChange,
}: {
  payment: Payment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!payment) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-2xl overflow-hidden rounded-2xl border-slate-200 p-0 dark:border-slate-800 dark:bg-slate-900">

        {/* Dialog Header */}
        <DialogHeader className="border-b border-slate-200 bg-slate-50/70 px-6 py-5 dark:border-slate-800 dark:bg-slate-950/50">
          <div className="flex items-start gap-4 pr-8">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400">
              <Receipt className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <DialogTitle className="text-lg font-bold text-slate-900 dark:text-white">
                Payment Details
              </DialogTitle>

              <DialogDescription className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Complete information about this payment transaction.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Dialog Body */}
        <div className="max-h-[70vh] overflow-y-auto px-6 py-6">

          {/* Status & Amount */}
          <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Payment Status
              </p>

              <div className="mt-2">
                <PaymentStatusBadge status={payment.status} />
              </div>
            </div>

            <div className="sm:text-right">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Amount
              </p>

              <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                {currency(payment.amount)}
              </p>
            </div>
          </div>

          {/* Transaction Information */}
          <div className="mt-6">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
              <CreditCard className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              Transaction Information
            </h3>

            <div className="grid overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 sm:grid-cols-2">
              <DetailItem
                label="Payment ID"
                value={payment.id}
                mono
              />

              <DetailItem
                label="Transaction ID"
                value={payment.transactionId}
                mono
              />

              <DetailItem
                label="Invoice ID"
                value={payment.invoiceId}
                mono
              />

              <DetailItem
                label="Payment Method"
                value={payment.method}
              />

              <DetailItem
                label="Payment Date"
                value={formatDate(payment.date)}
                icon={<CalendarDays className="h-4 w-4" />}
              />

              <DetailItem
                label="Description"
                value={payment.description}
              />
            </div>
          </div>

          {/* Payment Summary */}
          <div className="mt-6">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
              <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              Payment Summary
            </h3>

            <div className="rounded-xl border border-slate-200 dark:border-slate-800">

              <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-4 py-3 dark:border-slate-800">
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  Description
                </span>

                <span className="text-right text-sm font-medium text-slate-900 dark:text-white">
                  {payment.description}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-4 py-3 dark:border-slate-800">
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  Payment Method
                </span>

                <span className="text-sm font-medium text-slate-900 dark:text-white">
                  {payment.method}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 px-4 py-4">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Total Amount
                </span>

                <span className="text-lg font-bold text-blue-700 dark:text-blue-400">
                  {currency(payment.amount)}
                </span>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-6 flex gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4 dark:border-blue-900/40 dark:bg-blue-950/20">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-700 dark:text-blue-400" />

            <div>
              <p className="text-sm font-semibold text-blue-900 dark:text-blue-300">
                Secure Transaction
              </p>

              <p className="mt-1 text-xs leading-5 text-blue-700 dark:text-blue-400">
                This payment is securely recorded and associated with your
                student account.
              </p>
            </div>
          </div>
        </div>

        {/* Dialog Footer */}
        <div className="flex flex-col-reverse gap-2 border-t border-slate-200 bg-slate-50/70 px-6 py-4 dark:border-slate-800 dark:bg-slate-950/50 sm:flex-row sm:justify-end">

          {payment.status === "PAID" && (
            <button
              type="button"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <Download className="h-4 w-4" />
              Download Receipt
            </button>
          )}

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="inline-flex h-10 items-center justify-center rounded-lg bg-blue-700 px-5 text-sm font-semibold text-white transition hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* -------------------------------------------------------------------------- */
/* Detail Item                                                                */
/* -------------------------------------------------------------------------- */

function DetailItem({
  label,
  value,
  mono = false,
  icon,
}: {
  label: string;
  value: string;
  mono?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <div className="border-b border-slate-200 p-4 dark:border-slate-800 sm:[&:nth-child(odd)]:border-r">
      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <div className="mt-1.5 flex items-center gap-2">
        {icon && (
          <span className="shrink-0 text-slate-400">
            {icon}
          </span>
        )}

        <p
          className={`break-all text-sm font-semibold text-slate-900 dark:text-white ${mono ? "font-mono text-xs" : ""
            }`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Status Badge                                                               */
/* -------------------------------------------------------------------------- */

function PaymentStatusBadge({
  status,
}: {
  status: PaymentStatus;
}) {
  const config: Record<
    PaymentStatus,
    {
      label: string;
      className: string;
      icon: React.ReactNode;
    }
  > = {
    PAID: {
      label: "Paid",
      className:
        "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
      icon: <CheckCircle2 className="h-3.5 w-3.5" />,
    },

    PENDING: {
      label: "Pending",
      className:
        "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
      icon: <Clock3 className="h-3.5 w-3.5" />,
    },

    FAILED: {
      label: "Failed",
      className:
        "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400",
      icon: <XCircle className="h-3.5 w-3.5" />,
    },

    REFUNDED: {
      label: "Refunded",
      className:
        "bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-400",
      icon: <ArrowDownToLine className="h-3.5 w-3.5" />,
    },
  };

  const item = config[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${item.className}`}
    >
      {item.icon}
      {item.label}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Info Item                                                                  */
/* -------------------------------------------------------------------------- */

function InfoItem({
  label,
  value,
  strong = false,
  mono = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
  mono?: boolean;
}) {
  return (
    <div className="min-w-0">
      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p
        className={`mt-1 truncate text-xs ${strong
            ? "font-bold text-slate-900 dark:text-white"
            : "text-slate-600 dark:text-slate-300"
          } ${mono ? "font-mono" : ""}`}
      >
        {value}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Payment Method                                                              */
/* -------------------------------------------------------------------------- */

function PaymentMethod({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 dark:border-slate-800">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
          {title}
        </p>

        <p className="truncate text-xs text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}
