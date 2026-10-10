// // import React from 'react'

// // export default function adjustments() {
// //   return (
// //     <div>adjustments</div>
// //   )
// // }


















// "use client";

// import React, { useMemo, useState } from "react";
// import {
//     Search,
//     SlidersHorizontal,
//     Plus,
//     ArrowUpDown,
//     ChevronLeft,
//     ChevronRight,
//     Eye,
//     CheckCircle2,
//     XCircle,
//     Clock3,
//     Wallet,
//     TrendingUp,
//     TrendingDown,
//     FileText,
//     X,
//     CalendarDays,
//     UserRound,
//     Building2,
//     RefreshCw,
//     AlertCircle,
//     CircleDollarSign,
//     Download,
// } from "lucide-react";

// type AdjustmentType = "CREDIT" | "DEBIT";
// type AdjustmentStatus = "PENDING" | "APPROVED" | "REJECTED";

// type Adjustment = {
//     id: string;
//     reference: string;
//     studentId: string;
//     studentName: string;
//     email: string;
//     program: string;
//     type: AdjustmentType;
//     category: string;
//     amount: number;
//     reason: string;
//     requestedBy: string;
//     requestedAt: string;
//     status: AdjustmentStatus;
//     reviewedBy?: string;
//     reviewedAt?: string;
// };

// const initialAdjustments: Adjustment[] = [
//     {
//         id: "adj-001",
//         reference: "ADJ-2026-001",
//         studentId: "STU-2025-CSE-0001",
//         studentName: "Nusrat Jahan",
//         email: "nusrat.jahan@example.com",
//         program: "B.Sc. in Computer Science",
//         type: "CREDIT",
//         category: "Scholarship Correction",
//         amount: 12000,
//         reason:
//             "Apply the approved scholarship amount that was not included in the original invoice.",
//         requestedBy: "Finance Office",
//         requestedAt: "2026-10-09",
//         status: "PENDING",
//     },
//     {
//         id: "adj-002",
//         reference: "ADJ-2026-002",
//         studentId: "STU-2024-BBA-0008",
//         studentName: "Rahim Ahmed",
//         email: "rahim.ahmed@example.com",
//         program: "BBA",
//         type: "CREDIT",
//         category: "Overpayment Correction",
//         amount: 3500,
//         reason:
//             "Correct an overpayment recorded against the student's tuition invoice.",
//         requestedBy: "Accountant",
//         requestedAt: "2026-10-08",
//         status: "APPROVED",
//         reviewedBy: "Super Admin",
//         reviewedAt: "2026-10-09",
//     },
//     {
//         id: "adj-003",
//         reference: "ADJ-2026-003",
//         studentId: "STU-2025-EEE-0012",
//         studentName: "Tanvir Hasan",
//         email: "tanvir.hasan@example.com",
//         program: "B.Sc. in Electrical Engineering",
//         type: "DEBIT",
//         category: "Fee Correction",
//         amount: 2500,
//         reason:
//             "Request to correct a laboratory fee that was omitted from the original invoice.",
//         requestedBy: "Finance Office",
//         requestedAt: "2026-10-07",
//         status: "PENDING",
//     },
//     {
//         id: "adj-004",
//         reference: "ADJ-2026-004",
//         studentId: "STU-2023-ENG-0015",
//         studentName: "Sadia Akter",
//         email: "sadia.akter@example.com",
//         program: "BA in English",
//         type: "CREDIT",
//         category: "Fee Waiver",
//         amount: 5000,
//         reason:
//             "Request a partial tuition fee waiver based on an approved institutional decision.",
//         requestedBy: "Accountant",
//         requestedAt: "2026-10-06",
//         status: "REJECTED",
//         reviewedBy: "Admin",
//         reviewedAt: "2026-10-07",
//     },
//     {
//         id: "adj-005",
//         reference: "ADJ-2026-005",
//         studentId: "STU-2024-CSE-0022",
//         studentName: "Mehedi Hasan",
//         email: "mehedi.hasan@example.com",
//         program: "B.Sc. in Computer Science",
//         type: "CREDIT",
//         category: "Payment Reconciliation",
//         amount: 1800,
//         reason:
//             "Reconcile a verified payment that has not yet been reflected in the student's account.",
//         requestedBy: "Finance Office",
//         requestedAt: "2026-10-05",
//         status: "PENDING",
//     },
//     {
//         id: "adj-006",
//         reference: "ADJ-2026-006",
//         studentId: "STU-2023-BBA-0018",
//         studentName: "Farhan Kabir",
//         email: "farhan.kabir@example.com",
//         program: "BBA",
//         type: "DEBIT",
//         category: "Late Fee Correction",
//         amount: 750,
//         reason:
//             "Request to correct a late fee after reviewing the student's payment timeline.",
//         requestedBy: "Accountant",
//         requestedAt: "2026-10-03",
//         status: "APPROVED",
//         reviewedBy: "Admin",
//         reviewedAt: "2026-10-04",
//     },
//     {
//         id: "adj-007",
//         reference: "ADJ-2026-007",
//         studentId: "STU-2025-MAT-0004",
//         studentName: "Afsana Rahman",
//         email: "afsana.rahman@example.com",
//         program: "B.Sc. in Mathematics",
//         type: "CREDIT",
//         category: "Scholarship Correction",
//         amount: 8000,
//         reason:
//             "Apply a scholarship adjustment following verification of the student's award.",
//         requestedBy: "Finance Office",
//         requestedAt: "2026-10-02",
//         status: "PENDING",
//     },
//     {
//         id: "adj-008",
//         reference: "ADJ-2026-008",
//         studentId: "STU-2024-CSE-0009",
//         studentName: "Imran Hossain",
//         email: "imran.hossain@example.com",
//         program: "B.Sc. in Computer Science",
//         type: "DEBIT",
//         category: "Invoice Correction",
//         amount: 1500,
//         reason:
//             "Correct a previously undercharged fee following an invoice audit.",
//         requestedBy: "Accountant",
//         requestedAt: "2026-09-29",
//         status: "REJECTED",
//         reviewedBy: "Super Admin",
//         reviewedAt: "2026-09-30",
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

// const statusStyles: Record<AdjustmentStatus, string> = {
//     PENDING:
//         "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/20",
//     APPROVED:
//         "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/20",
//     REJECTED:
//         "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-500/20",
// };

// const emptyForm = {
//     studentId: "",
//     studentName: "",
//     email: "",
//     program: "",
//     type: "CREDIT" as AdjustmentType,
//     category: "Scholarship Correction",
//     amount: "",
//     reason: "",
// };

// export default function Adjustments() {
//     const [adjustments, setAdjustments] =
//         useState<Adjustment[]>(initialAdjustments);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [statusFilter, setStatusFilter] = useState("ALL");
//     const [typeFilter, setTypeFilter] = useState("ALL");
//     const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
//     const [page, setPage] = useState(1);
//     const [pageSize, setPageSize] = useState(5);
//     const [selectedAdjustment, setSelectedAdjustment] =
//         useState<Adjustment | null>(null);
//     const [showCreateModal, setShowCreateModal] = useState(false);
//     const [showReviewModal, setShowReviewModal] = useState(false);
//     const [reviewTarget, setReviewTarget] = useState<Adjustment | null>(null);
//     const [reviewAction, setReviewAction] = useState<
//         "APPROVED" | "REJECTED"
//     >("APPROVED");
//     const [reviewNote, setReviewNote] = useState("");
//     const [form, setForm] = useState(emptyForm);
//     const [formError, setFormError] = useState("");
//     const [successMessage, setSuccessMessage] = useState("");

//     const stats = useMemo(() => {
//         const pending = adjustments.filter((item) => item.status === "PENDING");
//         const approved = adjustments.filter((item) => item.status === "APPROVED");
//         const rejected = adjustments.filter((item) => item.status === "REJECTED");

//         return {
//             total: adjustments.length,
//             pending: pending.length,
//             approved: approved.length,
//             rejected: rejected.length,
//             pendingAmount: pending.reduce((sum, item) => sum + item.amount, 0),
//             approvedAmount: approved.reduce((sum, item) => sum + item.amount, 0),
//         };
//     }, [adjustments]);

//     const filteredAdjustments = useMemo(() => {
//         const query = searchTerm.trim().toLowerCase();

//         return adjustments
//             .filter((item) => {
//                 const matchesSearch =
//                     !query ||
//                     item.reference.toLowerCase().includes(query) ||
//                     item.studentName.toLowerCase().includes(query) ||
//                     item.studentId.toLowerCase().includes(query) ||
//                     item.email.toLowerCase().includes(query) ||
//                     item.category.toLowerCase().includes(query);

//                 const matchesStatus =
//                     statusFilter === "ALL" || item.status === statusFilter;

//                 const matchesType = typeFilter === "ALL" || item.type === typeFilter;

//                 return matchesSearch && matchesStatus && matchesType;
//             })
//             .sort((a, b) => {
//                 const dateDifference =
//                     new Date(a.requestedAt).getTime() -
//                     new Date(b.requestedAt).getTime();

//                 return sortOrder === "newest" ? -dateDifference : dateDifference;
//             });
//     }, [adjustments, searchTerm, statusFilter, typeFilter, sortOrder]);

//     const totalPages = Math.max(
//         1,
//         Math.ceil(filteredAdjustments.length / pageSize),
//     );

//     const currentPage = Math.min(page, totalPages);

//     const paginatedAdjustments = filteredAdjustments.slice(
//         (currentPage - 1) * pageSize,
//         currentPage * pageSize,
//     );

//     const updateForm = (
//         field: keyof typeof emptyForm,
//         value: string,
//     ) => {
//         setForm((previous) => ({ ...previous, [field]: value }));
//     };

//     const resetFilters = () => {
//         setSearchTerm("");
//         setStatusFilter("ALL");
//         setTypeFilter("ALL");
//         setSortOrder("newest");
//         setPage(1);
//     };

//     const handleCreateAdjustment = (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         setFormError("");
//         setSuccessMessage("");

//         const amount = Number(form.amount);

//         if (!form.studentId.trim() || !form.studentName.trim()) {
//             setFormError("Please enter the student's ID and name.");
//             return;
//         }

//         if (!Number.isFinite(amount) || amount <= 0) {
//             setFormError("Enter a valid adjustment amount greater than zero.");
//             return;
//         }

//         if (form.reason.trim().length < 10) {
//             setFormError("Please provide a reason of at least 10 characters.");
//             return;
//         }

//         const newAdjustment: Adjustment = {
//             id: `adj-${Date.now()}`,
//             reference: `ADJ-${new Date().getFullYear()}-${String(
//                 adjustments.length + 1,
//             ).padStart(3, "0")}`,
//             studentId: form.studentId.trim(),
//             studentName: form.studentName.trim(),
//             email: form.email.trim() || "Not provided",
//             program: form.program.trim() || "Not specified",
//             type: form.type,
//             category: form.category,
//             amount,
//             reason: form.reason.trim(),
//             requestedBy: "Current Accountant",
//             requestedAt: new Date().toISOString().slice(0, 10),
//             status: "PENDING",
//         };

//         setAdjustments((previous) => [newAdjustment, ...previous]);
//         setSearchTerm("");
//         setStatusFilter("ALL");
//         setTypeFilter("ALL");
//         setSortOrder("newest");
//         setPage(1);
//         setShowCreateModal(false);
//         setForm(emptyForm);
//         setSuccessMessage(
//             "Adjustment request created. It is pending administrative approval.",
//         );
//     };

//     const openReviewModal = (
//         adjustment: Adjustment,
//         action: "APPROVED" | "REJECTED",
//     ) => {
//         setReviewTarget(adjustment);
//         setReviewAction(action);
//         setReviewNote("");
//         setShowReviewModal(true);
//     };

//     const handleReview = (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();

//         if (!reviewTarget) return;

//         if (reviewAction === "REJECTED" && !reviewNote.trim()) {
//             return;
//         }

//         setAdjustments((previous) =>
//             previous.map((item) =>
//                 item.id === reviewTarget.id
//                     ? {
//                         ...item,
//                         status: reviewAction,
//                         reviewedBy: "Current Reviewer",
//                         reviewedAt: new Date().toISOString().slice(0, 10),
//                     }
//                     : item,
//             ),
//         );

//         setShowReviewModal(false);
//         setReviewTarget(null);
//         setSuccessMessage(
//             reviewAction === "APPROVED"
//                 ? "Adjustment marked as approved in this demo."
//                 : "Adjustment marked as rejected in this demo.",
//         );
//     };

//     const exportCSV = () => {
//         const headers = [
//             "Reference",
//             "Student ID",
//             "Student Name",
//             "Email",
//             "Type",
//             "Category",
//             "Amount BDT",
//             "Requested Date",
//             "Status",
//             "Requested By",
//         ];

//         const rows = filteredAdjustments.map((item) => [
//             item.reference,
//             item.studentId,
//             item.studentName,
//             item.email,
//             item.type,
//             item.category,
//             item.amount.toFixed(2),
//             item.requestedAt,
//             item.status,
//             item.requestedBy,
//         ]);

//         const csv = [headers, ...rows]
//             .map((row) =>
//                 row
//                     .map((value) => `"${String(value).replace(/"/g, '""')}"`)
//                     .join(","),
//             )
//             .join("\r\n");

//         const blob = new Blob(["\uFEFF" + csv], {
//             type: "text/csv;charset=utf-8;",
//         });

//         const url = URL.createObjectURL(blob);
//         const anchor = document.createElement("a");
//         anchor.href = url;
//         anchor.download = "campusflow-adjustments.csv";
//         document.body.appendChild(anchor);
//         anchor.click();
//         anchor.remove();
//         URL.revokeObjectURL(url);
//     };

//     const closeAllModals = () => {
//         setShowCreateModal(false);
//         setShowReviewModal(false);
//         setSelectedAdjustment(null);
//     };

//     return (
//         <div className="min-h-screen bg-slate-50/70 px-4 py-6 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
//             <div className="mx-auto max-w-[1600px] space-y-6">
//                 {/* Page heading */}
//                 <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//                     <div>
//                         <div className="mb-2 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
//                             <Building2 size={15} />
//                             <span>Accountant</span>
//                             <span>/</span>
//                             <span>Finance</span>
//                             <span>/</span>
//                             <span className="text-blue-700 dark:text-blue-400">
//                                 Adjustments
//                             </span>
//                         </div>

//                         <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
//                             Financial Adjustments
//                         </h1>

//                         <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
//                             Create and track student account corrections, fee adjustments,
//                             scholarship credits, and other financial requests.
//                         </p>
//                     </div>

//                     <div className="flex flex-wrap items-center gap-2">
//                         <button
//                             type="button"
//                             onClick={exportCSV}
//                             className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
//                         >
//                             <Download size={16} />
//                             Export CSV
//                         </button>

//                         <button
//                             type="button"
//                             onClick={() => {
//                                 setFormError("");
//                                 setShowCreateModal(true);
//                             }}
//                             className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
//                         >
//                             <Plus size={17} />
//                             New Adjustment
//                         </button>
//                     </div>
//                 </div>

//                 {/* Success message */}
//                 {successMessage && (
//                     <div className="flex items-start justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
//                         <div className="flex items-start gap-2">
//                             <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
//                             <span>{successMessage}</span>
//                         </div>
//                         <button
//                             type="button"
//                             onClick={() => setSuccessMessage("")}
//                             aria-label="Dismiss message"
//                         >
//                             <X size={17} />
//                         </button>
//                     </div>
//                 )}

//                 {/* Summary cards */}
//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
//                     <SummaryCard
//                         title="Total Requests"
//                         value={String(stats.total)}
//                         description="All adjustment requests"
//                         icon={<FileText size={20} />}
//                         iconClass="bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300"
//                     />

//                     <SummaryCard
//                         title="Pending Requests"
//                         value={String(stats.pending)}
//                         description={formatCurrency(stats.pendingAmount) + " awaiting review"}
//                         icon={<Clock3 size={20} />}
//                         iconClass="bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300"
//                     />

//                     <SummaryCard
//                         title="Approved Requests"
//                         value={String(stats.approved)}
//                         description={formatCurrency(stats.approvedAmount) + " approved amount"}
//                         icon={<CheckCircle2 size={20} />}
//                         iconClass="bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
//                     />

//                     <SummaryCard
//                         title="Rejected Requests"
//                         value={String(stats.rejected)}
//                         description="Requests not approved"
//                         icon={<XCircle size={20} />}
//                         iconClass="bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300"
//                     />
//                 </div>

//                 {/* Information banner */}
//                 <div className="flex gap-3 rounded-2xl border border-blue-100 bg-blue-50/80 p-4 dark:border-blue-900/60 dark:bg-blue-950/30">
//                     <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
//                         <AlertCircle size={20} />
//                     </div>
//                     <div>
//                         <h2 className="text-sm font-semibold text-blue-950 dark:text-blue-200">
//                             Approval and audit policy
//                         </h2>
//                         <p className="mt-1 text-sm leading-6 text-blue-900/75 dark:text-blue-200/75">
//                             Adjustment requests should be reviewed by an authorized
//                             administrator. Approval must be recorded in the audit trail, and
//                             the corresponding financial ledger entry should be posted only
//                             after server-side authorization and validation.
//                         </p>
//                     </div>
//                 </div>

//                 {/* Filters */}
//                 <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5">
//                     <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
//                         <div className="flex items-center gap-2">
//                             <SlidersHorizontal
//                                 size={18}
//                                 className="text-slate-500 dark:text-slate-400"
//                             />
//                             <h2 className="font-semibold">Adjustment Requests</h2>
//                             <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
//                                 {filteredAdjustments.length}
//                             </span>
//                         </div>

//                         <button
//                             type="button"
//                             onClick={resetFilters}
//                             className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-blue-700 dark:text-slate-400 dark:hover:text-blue-400"
//                         >
//                             <RefreshCw size={14} />
//                             Reset filters
//                         </button>
//                     </div>

//                     <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
//                         <div className="relative sm:col-span-2 xl:col-span-1">
//                             <Search
//                                 size={17}
//                                 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
//                             />
//                             <input
//                                 type="text"
//                                 value={searchTerm}
//                                 onChange={(event) => {
//                                     setSearchTerm(event.target.value);
//                                     setPage(1);
//                                 }}
//                                 placeholder="Search student, ID, reference..."
//                                 className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:focus:ring-blue-900/40"
//                             />
//                         </div>

//                         <select
//                             value={statusFilter}
//                             onChange={(event) => {
//                                 setStatusFilter(event.target.value);
//                                 setPage(1);
//                             }}
//                             className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950"
//                             aria-label="Filter by status"
//                         >
//                             <option value="ALL">All statuses</option>
//                             <option value="PENDING">Pending</option>
//                             <option value="APPROVED">Approved</option>
//                             <option value="REJECTED">Rejected</option>
//                         </select>

//                         <select
//                             value={typeFilter}
//                             onChange={(event) => {
//                                 setTypeFilter(event.target.value);
//                                 setPage(1);
//                             }}
//                             className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950"
//                             aria-label="Filter by adjustment type"
//                         >
//                             <option value="ALL">All adjustment types</option>
//                             <option value="CREDIT">Credit</option>
//                             <option value="DEBIT">Debit</option>
//                         </select>

//                         <button
//                             type="button"
//                             onClick={() =>
//                                 setSortOrder((current) =>
//                                     current === "newest" ? "oldest" : "newest",
//                                 )
//                             }
//                             className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:hover:bg-slate-800"
//                         >
//                             <ArrowUpDown size={16} />
//                             {sortOrder === "newest" ? "Newest first" : "Oldest first"}
//                         </button>
//                     </div>
//                 </div>

//                 {/* Table */}
//                 <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
//                     <div className="overflow-x-auto">
//                         <table className="w-full min-w-[1100px] text-left text-sm">
//                             <thead className="border-b border-slate-200 bg-slate-50/80 text-xs uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-400">
//                                 <tr>
//                                     <th className="px-5 py-4 font-semibold">Request / Student</th>
//                                     <th className="px-5 py-4 font-semibold">Adjustment</th>
//                                     <th className="px-5 py-4 font-semibold">Amount</th>
//                                     <th className="px-5 py-4 font-semibold">Requested Date</th>
//                                     <th className="px-5 py-4 font-semibold">Status</th>
//                                     <th className="px-5 py-4 text-right font-semibold">Actions</th>
//                                 </tr>
//                             </thead>

//                             <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
//                                 {paginatedAdjustments.map((item) => (
//                                     <tr
//                                         key={item.id}
//                                         className="transition hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
//                                     >
//                                         <td className="px-5 py-4">
//                                             <div className="flex items-start gap-3">
//                                                 <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
//                                                     {item.studentName
//                                                         .split(" ")
//                                                         .map((part) => part[0])
//                                                         .slice(0, 2)
//                                                         .join("")}
//                                                 </div>
//                                                 <div className="min-w-0">
//                                                     <p className="font-semibold text-slate-900 dark:text-white">
//                                                         {item.studentName}
//                                                     </p>
//                                                     <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
//                                                         {item.studentId}
//                                                     </p>
//                                                     <p className="mt-1 text-xs text-slate-400">
//                                                         {item.reference}
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                         </td>

//                                         <td className="px-5 py-4">
//                                             <div className="flex items-center gap-2">
//                                                 {item.type === "CREDIT" ? (
//                                                     <TrendingDown
//                                                         size={16}
//                                                         className="text-emerald-600"
//                                                     />
//                                                 ) : (
//                                                     <TrendingUp size={16} className="text-rose-600" />
//                                                 )}
//                                                 <div>
//                                                     <p className="font-medium text-slate-800 dark:text-slate-200">
//                                                         {item.category}
//                                                     </p>
//                                                     <span
//                                                         className={`mt-1 inline-flex rounded-md px-2 py-0.5 text-[10px] font-bold tracking-wide ${item.type === "CREDIT"
//                                                                 ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
//                                                                 : "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300"
//                                                             }`}
//                                                     >
//                                                         {item.type}
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                         </td>

//                                         <td className="px-5 py-4">
//                                             <p className="font-semibold tabular-nums text-slate-900 dark:text-white">
//                                                 {formatCurrency(item.amount)}
//                                             </p>
//                                             <p className="mt-1 text-xs text-slate-400">BDT</p>
//                                         </td>

//                                         <td className="px-5 py-4">
//                                             <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
//                                                 <CalendarDays
//                                                     size={15}
//                                                     className="text-slate-400"
//                                                 />
//                                                 {formatDate(item.requestedAt)}
//                                             </div>
//                                         </td>

//                                         <td className="px-5 py-4">
//                                             <StatusBadge status={item.status} />
//                                             {item.reviewedAt && (
//                                                 <p className="mt-1.5 text-xs text-slate-400">
//                                                     Reviewed {formatDate(item.reviewedAt)}
//                                                 </p>
//                                             )}
//                                         </td>

//                                         <td className="px-5 py-4">
//                                             <div className="flex items-center justify-end gap-2">
//                                                 <button
//                                                     type="button"
//                                                     onClick={() => setSelectedAdjustment(item)}
//                                                     title="View adjustment details"
//                                                     aria-label={`View ${item.reference}`}
//                                                     className="flex size-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-blue-500/10"
//                                                 >
//                                                     <Eye size={16} />
//                                                 </button>

//                                                 {item.status === "PENDING" && (
//                                                     <>
//                                                         <button
//                                                             type="button"
//                                                             onClick={() => openReviewModal(item, "APPROVED")}
//                                                             title="Approve request"
//                                                             aria-label={`Approve ${item.reference}`}
//                                                             className="flex size-9 items-center justify-center rounded-lg border border-emerald-200 text-emerald-700 transition hover:bg-emerald-50 dark:border-emerald-900 dark:text-emerald-300 dark:hover:bg-emerald-500/10"
//                                                         >
//                                                             <CheckCircle2 size={16} />
//                                                         </button>

//                                                         <button
//                                                             type="button"
//                                                             onClick={() => openReviewModal(item, "REJECTED")}
//                                                             title="Reject request"
//                                                             aria-label={`Reject ${item.reference}`}
//                                                             className="flex size-9 items-center justify-center rounded-lg border border-rose-200 text-rose-700 transition hover:bg-rose-50 dark:border-rose-900 dark:text-rose-300 dark:hover:bg-rose-500/10"
//                                                         >
//                                                             <XCircle size={16} />
//                                                         </button>
//                                                     </>
//                                                 )}
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 ))}

//                                 {paginatedAdjustments.length === 0 && (
//                                     <tr>
//                                         <td colSpan={6} className="px-5 py-16 text-center">
//                                             <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800">
//                                                 <Search size={22} />
//                                             </div>
//                                             <p className="mt-3 font-semibold">No adjustments found</p>
//                                             <p className="mt-1 text-sm text-slate-500">
//                                                 Try changing your search terms or filters.
//                                             </p>
//                                             <button
//                                                 type="button"
//                                                 onClick={resetFilters}
//                                                 className="mt-3 text-sm font-semibold text-blue-700 hover:underline dark:text-blue-400"
//                                             >
//                                                 Clear filters
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>

//                     {/* Pagination */}
//                     <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between sm:px-5">
//                         <p className="text-sm text-slate-500 dark:text-slate-400">
//                             Showing{" "}
//                             <span className="font-semibold text-slate-800 dark:text-slate-200">
//                                 {filteredAdjustments.length === 0
//                                     ? 0
//                                     : (currentPage - 1) * pageSize + 1}
//                             </span>{" "}
//                             to{" "}
//                             <span className="font-semibold text-slate-800 dark:text-slate-200">
//                                 {Math.min(currentPage * pageSize, filteredAdjustments.length)}
//                             </span>{" "}
//                             of{" "}
//                             <span className="font-semibold text-slate-800 dark:text-slate-200">
//                                 {filteredAdjustments.length}
//                             </span>{" "}
//                             requests
//                         </p>

//                         <div className="flex flex-wrap items-center gap-3">
//                             <select
//                                 value={pageSize}
//                                 onChange={(event) => {
//                                     setPageSize(Number(event.target.value));
//                                     setPage(1);
//                                 }}
//                                 aria-label="Rows per page"
//                                 className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
//                             >
//                                 <option value={5}>5 / page</option>
//                                 <option value={10}>10 / page</option>
//                                 <option value={20}>20 / page</option>
//                             </select>

//                             <div className="flex items-center gap-1">
//                                 <button
//                                     type="button"
//                                     disabled={currentPage <= 1}
//                                     onClick={() => setPage((value) => Math.max(1, value - 1))}
//                                     aria-label="Previous page"
//                                     className="flex size-9 items-center justify-center rounded-lg border border-slate-200 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:hover:bg-slate-800"
//                                 >
//                                     <ChevronLeft size={17} />
//                                 </button>

//                                 <span className="min-w-16 text-center text-sm text-slate-600 dark:text-slate-300">
//                                     {currentPage} / {totalPages}
//                                 </span>

//                                 <button
//                                     type="button"
//                                     disabled={currentPage >= totalPages}
//                                     onClick={() =>
//                                         setPage((value) => Math.min(totalPages, value + 1))
//                                     }
//                                     aria-label="Next page"
//                                     className="flex size-9 items-center justify-center rounded-lg border border-slate-200 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:hover:bg-slate-800"
//                                 >
//                                     <ChevronRight size={17} />
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <p className="text-xs leading-5 text-slate-400">
//                     Demo mode: changes are stored in component state only. Connect the
//                     page to your authenticated backend before using it for real financial
//                     records.
//                 </p>
//             </div>

//             {/* Create adjustment modal */}
//             {showCreateModal && (
//                 <Modal
//                     title="Create Adjustment Request"
//                     description="Submit a financial correction for administrative review."
//                     onClose={closeAllModals}
//                     maxWidth="max-w-2xl"
//                 >
//                     <form onSubmit={handleCreateAdjustment} className="space-y-5">
//                         <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm leading-5 text-amber-800 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-300">
//                             This request will be created as pending. Creating it does not
//                             change the student's balance or post a ledger transaction.
//                         </div>

//                         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                             <FormField label="Student ID" required>
//                                 <input
//                                     required
//                                     value={form.studentId}
//                                     onChange={(event) =>
//                                         updateForm("studentId", event.target.value)
//                                     }
//                                     placeholder="e.g. STU-2025-CSE-0001"
//                                     className={fieldClass}
//                                 />
//                             </FormField>

//                             <FormField label="Student Name" required>
//                                 <input
//                                     required
//                                     value={form.studentName}
//                                     onChange={(event) =>
//                                         updateForm("studentName", event.target.value)
//                                     }
//                                     placeholder="Enter student name"
//                                     className={fieldClass}
//                                 />
//                             </FormField>

//                             <FormField label="Student Email">
//                                 <input
//                                     type="email"
//                                     value={form.email}
//                                     onChange={(event) => updateForm("email", event.target.value)}
//                                     placeholder="student@university.edu"
//                                     className={fieldClass}
//                                 />
//                             </FormField>

//                             <FormField label="Program">
//                                 <input
//                                     value={form.program}
//                                     onChange={(event) =>
//                                         updateForm("program", event.target.value)
//                                     }
//                                     placeholder="e.g. B.Sc. in CSE"
//                                     className={fieldClass}
//                                 />
//                             </FormField>

//                             <FormField label="Adjustment Type" required>
//                                 <select
//                                     value={form.type}
//                                     onChange={(event) => updateForm("type", event.target.value)}
//                                     className={fieldClass}
//                                 >
//                                     <option value="CREDIT">Credit — reduce amount owed</option>
//                                     <option value="DEBIT">Debit — increase amount owed</option>
//                                 </select>
//                             </FormField>

//                             <FormField label="Category" required>
//                                 <select
//                                     value={form.category}
//                                     onChange={(event) =>
//                                         updateForm("category", event.target.value)
//                                     }
//                                     className={fieldClass}
//                                 >
//                                     <option>Scholarship Correction</option>
//                                     <option>Fee Waiver</option>
//                                     <option>Payment Reconciliation</option>
//                                     <option>Overpayment Correction</option>
//                                     <option>Fee Correction</option>
//                                     <option>Late Fee Correction</option>
//                                     <option>Invoice Correction</option>
//                                     <option>Other</option>
//                                 </select>
//                             </FormField>

//                             <FormField label="Amount (BDT)" required>
//                                 <input
//                                     type="number"
//                                     required
//                                     min="0.01"
//                                     step="0.01"
//                                     value={form.amount}
//                                     onChange={(event) =>
//                                         updateForm("amount", event.target.value)
//                                     }
//                                     placeholder="0.00"
//                                     className={fieldClass}
//                                 />
//                             </FormField>

//                             <FormField label="Currency">
//                                 <input
//                                     value="BDT — Bangladeshi Taka"
//                                     disabled
//                                     className={`${fieldClass} cursor-not-allowed opacity-70`}
//                                 />
//                             </FormField>
//                         </div>

//                         <FormField label="Reason for Adjustment" required>
//                             <textarea
//                                 required
//                                 minLength={10}
//                                 rows={4}
//                                 value={form.reason}
//                                 onChange={(event) => updateForm("reason", event.target.value)}
//                                 placeholder="Explain why this adjustment is needed and include relevant supporting details..."
//                                 className={`${fieldClass} resize-y`}
//                             />
//                         </FormField>

//                         {formError && <ErrorMessage message={formError} />}

//                         <div className="flex flex-col-reverse gap-2 border-t border-slate-200 pt-4 dark:border-slate-800 sm:flex-row sm:justify-end">
//                             <button
//                                 type="button"
//                                 onClick={closeAllModals}
//                                 className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 type="submit"
//                                 className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
//                             >
//                                 <Plus size={16} />
//                                 Submit Request
//                             </button>
//                         </div>
//                     </form>
//                 </Modal>
//             )}

//             {/* Review modal */}
//             {showReviewModal && reviewTarget && (
//                 <Modal
//                     title={
//                         reviewAction === "APPROVED"
//                             ? "Approve Adjustment"
//                             : "Reject Adjustment"
//                     }
//                     description={`${reviewTarget.reference} · ${reviewTarget.studentName}`}
//                     onClose={closeAllModals}
//                     maxWidth="max-w-lg"
//                 >
//                     <form onSubmit={handleReview} className="space-y-5">
//                         <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
//                             <p className="text-sm text-slate-500 dark:text-slate-400">
//                                 Requested amount
//                             </p>
//                             <p className="mt-1 text-2xl font-bold">
//                                 {formatCurrency(reviewTarget.amount)}
//                             </p>
//                             <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
//                                 {reviewTarget.category} · {reviewTarget.type}
//                             </p>
//                         </div>

//                         {reviewAction === "APPROVED" ? (
//                             <div className="flex gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm leading-5 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300">
//                                 <CheckCircle2 size={19} className="mt-0.5 shrink-0" />
//                                 <p>
//                                     In production, approval must be performed by an authorized
//                                     administrator on the server. This demo only updates the
//                                     displayed status.
//                                 </p>
//                             </div>
//                         ) : (
//                             <FormField label="Reason for rejection" required>
//                                 <textarea
//                                     required
//                                     minLength={3}
//                                     rows={3}
//                                     value={reviewNote}
//                                     onChange={(event) => setReviewNote(event.target.value)}
//                                     placeholder="Explain why this request is being rejected..."
//                                     className={`${fieldClass} resize-y`}
//                                 />
//                             </FormField>
//                         )}

//                         <div className="flex flex-col-reverse gap-2 border-t border-slate-200 pt-4 dark:border-slate-800 sm:flex-row sm:justify-end">
//                             <button
//                                 type="button"
//                                 onClick={closeAllModals}
//                                 className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 type="submit"
//                                 className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition ${reviewAction === "APPROVED"
//                                         ? "bg-emerald-600 hover:bg-emerald-700"
//                                         : "bg-rose-600 hover:bg-rose-700"
//                                     }`}
//                             >
//                                 {reviewAction === "APPROVED" ? (
//                                     <CheckCircle2 size={16} />
//                                 ) : (
//                                     <XCircle size={16} />
//                                 )}
//                                 Confirm{" "}
//                                 {reviewAction === "APPROVED" ? "Approval" : "Rejection"}
//                             </button>
//                         </div>
//                     </form>
//                 </Modal>
//             )}

//             {/* Adjustment details modal */}
//             {selectedAdjustment && (
//                 <Modal
//                     title="Adjustment Details"
//                     description={selectedAdjustment.reference}
//                     onClose={closeAllModals}
//                     maxWidth="max-w-2xl"
//                 >
//                     <div className="space-y-5">
//                         <div className="flex flex-col gap-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-950 sm:flex-row sm:items-center sm:justify-between">
//                             <div>
//                                 <p className="text-sm text-slate-500 dark:text-slate-400">
//                                     Requested amount
//                                 </p>
//                                 <p className="mt-1 text-2xl font-bold tracking-tight">
//                                     {formatCurrency(selectedAdjustment.amount)}
//                                 </p>
//                                 <p className="mt-1 text-xs text-slate-500">
//                                     {selectedAdjustment.type === "CREDIT"
//                                         ? "Credit adjustment"
//                                         : "Debit adjustment"}
//                                 </p>
//                             </div>
//                             <StatusBadge status={selectedAdjustment.status} />
//                         </div>

//                         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                             <DetailItem
//                                 icon={<UserRound size={16} />}
//                                 label="Student"
//                                 value={selectedAdjustment.studentName}
//                             />
//                             <DetailItem
//                                 icon={<FileText size={16} />}
//                                 label="Student ID"
//                                 value={selectedAdjustment.studentId}
//                             />
//                             <DetailItem
//                                 icon={<Building2 size={16} />}
//                                 label="Program"
//                                 value={selectedAdjustment.program}
//                             />
//                             <DetailItem
//                                 icon={<CircleDollarSign size={16} />}
//                                 label="Category"
//                                 value={selectedAdjustment.category}
//                             />
//                             <DetailItem
//                                 icon={<CalendarDays size={16} />}
//                                 label="Requested Date"
//                                 value={formatDate(selectedAdjustment.requestedAt)}
//                             />
//                             <DetailItem
//                                 icon={<UserRound size={16} />}
//                                 label="Requested By"
//                                 value={selectedAdjustment.requestedBy}
//                             />
//                         </div>

//                         <div>
//                             <h3 className="text-sm font-semibold">Reason</h3>
//                             <p className="mt-2 rounded-xl border border-slate-200 p-4 text-sm leading-6 text-slate-600 dark:border-slate-800 dark:text-slate-300">
//                                 {selectedAdjustment.reason}
//                             </p>
//                         </div>

//                         {selectedAdjustment.reviewedBy && (
//                             <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
//                                 <h3 className="text-sm font-semibold">Review Information</h3>
//                                 <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
//                                     Reviewed by: {selectedAdjustment.reviewedBy}
//                                 </p>
//                                 {selectedAdjustment.reviewedAt && (
//                                     <p className="mt-1 text-sm text-slate-500">
//                                         Review date: {formatDate(selectedAdjustment.reviewedAt)}
//                                     </p>
//                                 )}
//                             </div>
//                         )}

//                         <div className="flex flex-col-reverse gap-2 border-t border-slate-200 pt-4 dark:border-slate-800 sm:flex-row sm:justify-end">
//                             <button
//                                 type="button"
//                                 onClick={closeAllModals}
//                                 className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
//                             >
//                                 Close
//                             </button>

//                             {selectedAdjustment.status === "PENDING" && (
//                                 <>
//                                     <button
//                                         type="button"
//                                         onClick={() => {
//                                             const target = selectedAdjustment;
//                                             setSelectedAdjustment(null);
//                                             openReviewModal(target, "REJECTED");
//                                         }}
//                                         className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-200 px-4 py-2.5 text-sm font-semibold text-rose-700 transition hover:bg-rose-50 dark:border-rose-900 dark:text-rose-300 dark:hover:bg-rose-500/10"
//                                     >
//                                         <XCircle size={16} />
//                                         Reject
//                                     </button>

//                                     <button
//                                         type="button"
//                                         onClick={() => {
//                                             const target = selectedAdjustment;
//                                             setSelectedAdjustment(null);
//                                             openReviewModal(target, "APPROVED");
//                                         }}
//                                         className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
//                                     >
//                                         <CheckCircle2 size={16} />
//                                         Review Approval
//                                     </button>
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                 </Modal>
//             )}
//         </div>
//     );
// }

// const fieldClass =
//     "w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-blue-900/40 dark:disabled:bg-slate-900";

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
//         <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
//             <div className="flex items-start justify-between gap-3">
//                 <div>
//                     <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
//                         {title}
//                     </p>
//                     <p className="mt-3 text-3xl font-bold tracking-tight">{value}</p>
//                 </div>
//                 <div
//                     className={`flex size-11 items-center justify-center rounded-xl ${iconClass}`}
//                 >
//                     {icon}
//                 </div>
//             </div>
//             <p className="mt-3 text-xs leading-5 text-slate-500 dark:text-slate-400">
//                 {description}
//             </p>
//         </div>
//     );
// }

// function StatusBadge({ status }: { status: AdjustmentStatus }) {
//     const icon =
//         status === "APPROVED" ? (
//             <CheckCircle2 size={13} />
//         ) : status === "REJECTED" ? (
//             <XCircle size={13} />
//         ) : (
//             <Clock3 size={13} />
//         );

//     return (
//         <span
//             className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[status]}`}
//         >
//             {icon}
//             {status.charAt(0) + status.slice(1).toLowerCase()}
//         </span>
//     );
// }

// function Modal({
//     title,
//     description,
//     onClose,
//     maxWidth = "max-w-xl",
//     children,
// }: {
//     title: string;
//     description: string;
//     onClose: () => void;
//     maxWidth?: string;
//     children: React.ReactNode;
// }) {
//     return (
//         <div
//             className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
//             onMouseDown={(event) => {
//                 if (event.target === event.currentTarget) onClose();
//             }}
//         >
//             <div
//                 role="dialog"
//                 aria-modal="true"
//                 aria-label={title}
//                 className={`flex max-h-[92dvh] w-full ${maxWidth} flex-col overflow-hidden rounded-t-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 sm:rounded-2xl`}
//             >
//                 <div className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-200 px-5 py-4 dark:border-slate-800 sm:px-6">
//                     <div>
//                         <h2 className="text-lg font-bold">{title}</h2>
//                         <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
//                             {description}
//                         </p>
//                     </div>
//                     <button
//                         type="button"
//                         onClick={onClose}
//                         aria-label="Close dialog"
//                         className="flex size-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800"
//                     >
//                         <X size={19} />
//                     </button>
//                 </div>
//                 <div className="overflow-y-auto p-5 sm:p-6">{children}</div>
//             </div>
//         </div>
//     );
// }

// function FormField({
//     label,
//     required,
//     children,
// }: {
//     label: string;
//     required?: boolean;
//     children: React.ReactNode;
// }) {
//     return (
//         <label className="block min-w-0 space-y-2">
//             <span className="block text-sm font-medium text-slate-700 dark:text-slate-300">
//                 {label}
//                 {required && <span className="ml-1 text-rose-500">*</span>}
//             </span>
//             {children}
//         </label>
//     );
// }

// function DetailItem({
//     icon,
//     label,
//     value,
// }: {
//     icon: React.ReactNode;
//     label: string;
//     value: string;
// }) {
//     return (
//         <div className="flex min-w-0 items-start gap-3">
//             <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
//                 {icon}
//             </div>
//             <div className="min-w-0">
//                 <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
//                 <p className="mt-1 break-words text-sm font-medium">{value}</p>
//             </div>
//         </div>
//     );
// }

// function ErrorMessage({ message }: { message: string }) {
//     return (
//         <div className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-300">
//             <AlertCircle size={17} className="mt-0.5 shrink-0" />
//             <span>{message}</span>
//         </div>
//     );
// }
























"use client";

import React, { useMemo, useState } from "react";
import {
    Search,
    SlidersHorizontal,
    Plus,
    ArrowUpDown,
    ChevronLeft,
    ChevronRight,
    Eye,
    CheckCircle2,
    XCircle,
    Clock3,
    TrendingUp,
    TrendingDown,
    FileText,
    X,
    CalendarDays,
    UserRound,
    Building2,
    RefreshCw,
    AlertCircle,
    CircleDollarSign,
    Download,
} from "lucide-react";

type AdjustmentType = "CREDIT" | "DEBIT";
type AdjustmentStatus = "PENDING" | "APPROVED" | "REJECTED";

type Adjustment = {
    id: string;
    reference: string;
    studentId: string;
    studentName: string;
    email: string;
    program: string;
    type: AdjustmentType;
    category: string;
    amount: number;
    reason: string;
    requestedBy: string;
    requestedAt: string;
    status: AdjustmentStatus;
    reviewedBy?: string;
    reviewedAt?: string;
    reviewNote?: string;
};

const initialAdjustments: Adjustment[] = [
    {
        id: "adj-001",
        reference: "ADJ-2026-001",
        studentId: "STU-2025-CSE-0001",
        studentName: "Nusrat Jahan",
        email: "nusrat.jahan@example.com",
        program: "B.Sc. in Computer Science",
        type: "CREDIT",
        category: "Scholarship Correction",
        amount: 12000,
        reason:
            "Apply the approved scholarship amount that was not included in the original invoice.",
        requestedBy: "Finance Office",
        requestedAt: "2026-10-09",
        status: "PENDING",
    },
    {
        id: "adj-002",
        reference: "ADJ-2026-002",
        studentId: "STU-2024-BBA-0008",
        studentName: "Rahim Ahmed",
        email: "rahim.ahmed@example.com",
        program: "BBA",
        type: "CREDIT",
        category: "Overpayment Correction",
        amount: 3500,
        reason:
            "Correct an overpayment recorded against the student's tuition invoice.",
        requestedBy: "Accountant",
        requestedAt: "2026-10-08",
        status: "APPROVED",
        reviewedBy: "Super Admin",
        reviewedAt: "2026-10-09",
    },
    {
        id: "adj-003",
        reference: "ADJ-2026-003",
        studentId: "STU-2025-EEE-0012",
        studentName: "Tanvir Hasan",
        email: "tanvir.hasan@example.com",
        program: "B.Sc. in Electrical Engineering",
        type: "DEBIT",
        category: "Fee Correction",
        amount: 2500,
        reason:
            "Request to correct a laboratory fee that was omitted from the original invoice.",
        requestedBy: "Finance Office",
        requestedAt: "2026-10-07",
        status: "PENDING",
    },
    {
        id: "adj-004",
        reference: "ADJ-2026-004",
        studentId: "STU-2023-ENG-0015",
        studentName: "Sadia Akter",
        email: "sadia.akter@example.com",
        program: "BA in English",
        type: "CREDIT",
        category: "Fee Waiver",
        amount: 5000,
        reason:
            "Request a partial tuition fee waiver based on an approved institutional decision.",
        requestedBy: "Accountant",
        requestedAt: "2026-10-06",
        status: "REJECTED",
        reviewedBy: "Admin",
        reviewedAt: "2026-10-07",
        reviewNote: "The submitted supporting documents were insufficient.",
    },
    {
        id: "adj-005",
        reference: "ADJ-2026-005",
        studentId: "STU-2024-CSE-0022",
        studentName: "Mehedi Hasan",
        email: "mehedi.hasan@example.com",
        program: "B.Sc. in Computer Science",
        type: "CREDIT",
        category: "Payment Reconciliation",
        amount: 1800,
        reason:
            "Reconcile a verified payment that has not yet been reflected in the student's account.",
        requestedBy: "Finance Office",
        requestedAt: "2026-10-05",
        status: "PENDING",
    },
    {
        id: "adj-006",
        reference: "ADJ-2026-006",
        studentId: "STU-2023-BBA-0018",
        studentName: "Farhan Kabir",
        email: "farhan.kabir@example.com",
        program: "BBA",
        type: "DEBIT",
        category: "Late Fee Correction",
        amount: 750,
        reason:
            "Request to correct a late fee after reviewing the student's payment timeline.",
        requestedBy: "Accountant",
        requestedAt: "2026-10-03",
        status: "APPROVED",
        reviewedBy: "Admin",
        reviewedAt: "2026-10-04",
    },
    {
        id: "adj-007",
        reference: "ADJ-2026-007",
        studentId: "STU-2025-MAT-0004",
        studentName: "Afsana Rahman",
        email: "afsana.rahman@example.com",
        program: "B.Sc. in Mathematics",
        type: "CREDIT",
        category: "Scholarship Correction",
        amount: 8000,
        reason:
            "Apply a scholarship adjustment following verification of the student's award.",
        requestedBy: "Finance Office",
        requestedAt: "2026-10-02",
        status: "PENDING",
    },
    {
        id: "adj-008",
        reference: "ADJ-2026-008",
        studentId: "STU-2024-CSE-0009",
        studentName: "Imran Hossain",
        email: "imran.hossain@example.com",
        program: "B.Sc. in Computer Science",
        type: "DEBIT",
        category: "Invoice Correction",
        amount: 1500,
        reason:
            "Correct a previously undercharged fee following an invoice audit.",
        requestedBy: "Accountant",
        requestedAt: "2026-09-29",
        status: "REJECTED",
        reviewedBy: "Super Admin",
        reviewedAt: "2026-09-30",
        reviewNote: "The invoice correction requires further verification.",
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

const statusStyles: Record<AdjustmentStatus, string> = {
    PENDING:
        "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/20",
    APPROVED:
        "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/20",
    REJECTED:
        "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-500/20",
};

const fieldClass =
    "w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-blue-900/40 dark:disabled:bg-slate-900";

const emptyForm = {
    studentId: "",
    studentName: "",
    email: "",
    program: "",
    type: "CREDIT" as AdjustmentType,
    category: "Scholarship Correction",
    amount: "",
    reason: "",
};

export default function Adjustments() {
    const [adjustments, setAdjustments] =
        useState<Adjustment[]>(initialAdjustments);

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [typeFilter, setTypeFilter] = useState("ALL");
    const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const [selectedAdjustment, setSelectedAdjustment] =
        useState<Adjustment | null>(null);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [reviewTarget, setReviewTarget] = useState<Adjustment | null>(null);

    const [reviewAction, setReviewAction] =
        useState<"APPROVED" | "REJECTED">("APPROVED");

    const [reviewNote, setReviewNote] = useState("");
    const [form, setForm] = useState(emptyForm);
    const [formError, setFormError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const stats = useMemo(() => {
        const pending = adjustments.filter(
            (item) => item.status === "PENDING",
        );

        const approved = adjustments.filter(
            (item) => item.status === "APPROVED",
        );

        const rejected = adjustments.filter(
            (item) => item.status === "REJECTED",
        );

        return {
            total: adjustments.length,
            pending: pending.length,
            approved: approved.length,
            rejected: rejected.length,
            pendingAmount: pending.reduce((sum, item) => sum + item.amount, 0),
            approvedAmount: approved.reduce((sum, item) => sum + item.amount, 0),
        };
    }, [adjustments]);

    const filteredAdjustments = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();

        return adjustments
            .filter((item) => {
                const matchesSearch =
                    !query ||
                    item.reference.toLowerCase().includes(query) ||
                    item.studentName.toLowerCase().includes(query) ||
                    item.studentId.toLowerCase().includes(query) ||
                    item.email.toLowerCase().includes(query) ||
                    item.category.toLowerCase().includes(query);

                const matchesStatus =
                    statusFilter === "ALL" || item.status === statusFilter;

                const matchesType =
                    typeFilter === "ALL" || item.type === typeFilter;

                return matchesSearch && matchesStatus && matchesType;
            })
            .sort((a, b) => {
                const difference =
                    new Date(a.requestedAt).getTime() -
                    new Date(b.requestedAt).getTime();

                return sortOrder === "newest" ? -difference : difference;
            });
    }, [adjustments, searchTerm, statusFilter, typeFilter, sortOrder]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredAdjustments.length / pageSize),
    );

    const currentPage = Math.min(page, totalPages);

    const paginatedAdjustments = filteredAdjustments.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize,
    );

    const updateForm = (
        field: keyof typeof emptyForm,
        value: string,
    ) => {
        setForm((previous) => ({ ...previous, [field]: value }));
    };

    const resetFilters = () => {
        setSearchTerm("");
        setStatusFilter("ALL");
        setTypeFilter("ALL");
        setSortOrder("newest");
        setPage(1);
    };

    const handleCreateAdjustment = (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();
        setFormError("");
        setSuccessMessage("");

        const amount = Number(form.amount);

        if (!form.studentId.trim() || !form.studentName.trim()) {
            setFormError("Please enter the student's ID and name.");
            return;
        }

        if (!Number.isFinite(amount) || amount <= 0) {
            setFormError("Enter a valid adjustment amount greater than zero.");
            return;
        }

        if (form.reason.trim().length < 10) {
            setFormError("Please provide a reason of at least 10 characters.");
            return;
        }

        const newAdjustment: Adjustment = {
            id: `adj-${Date.now()}`,
            reference: `ADJ-${new Date().getFullYear()}-${String(
                adjustments.length + 1,
            ).padStart(3, "0")}`,
            studentId: form.studentId.trim(),
            studentName: form.studentName.trim(),
            email: form.email.trim() || "Not provided",
            program: form.program.trim() || "Not specified",
            type: form.type,
            category: form.category,
            amount,
            reason: form.reason.trim(),
            requestedBy: "Current Accountant",
            requestedAt: new Date().toISOString().slice(0, 10),
            status: "PENDING",
        };

        setAdjustments((previous) => [newAdjustment, ...previous]);
        resetFilters();
        setPage(1);
        setShowCreateModal(false);
        setForm(emptyForm);

        setSuccessMessage(
            "Adjustment request created. It is pending administrative approval.",
        );
    };

    const openReviewModal = (
        adjustment: Adjustment,
        action: "APPROVED" | "REJECTED",
    ) => {
        setReviewTarget(adjustment);
        setReviewAction(action);
        setReviewNote("");
        setShowReviewModal(true);
    };

    const handleReview = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!reviewTarget) return;

        if (reviewAction === "REJECTED" && !reviewNote.trim()) {
            return;
        }

        setAdjustments((previous) =>
            previous.map((item) =>
                item.id === reviewTarget.id
                    ? {
                        ...item,
                        status: reviewAction,
                        reviewedBy: "Current Reviewer",
                        reviewedAt: new Date().toISOString().slice(0, 10),
                        reviewNote:
                            reviewAction === "REJECTED"
                                ? reviewNote.trim()
                                : undefined,
                    }
                    : item,
            ),
        );

        setShowReviewModal(false);
        setReviewTarget(null);

        setSuccessMessage(
            reviewAction === "APPROVED"
                ? "Adjustment marked as approved in this demo."
                : "Adjustment marked as rejected in this demo.",
        );
    };

    const exportCSV = () => {
        const headers = [
            "Reference",
            "Student ID",
            "Student Name",
            "Email",
            "Type",
            "Category",
            "Amount BDT",
            "Requested Date",
            "Status",
            "Requested By",
        ];

        const rows = filteredAdjustments.map((item) => [
            item.reference,
            item.studentId,
            item.studentName,
            item.email,
            item.type,
            item.category,
            item.amount.toFixed(2),
            item.requestedAt,
            item.status,
            item.requestedBy,
        ]);

        const csv = [headers, ...rows]
            .map((row) =>
                row
                    .map((value) => `"${String(value).replace(/"/g, '""')}"`)
                    .join(","),
            )
            .join("\r\n");

        const blob = new Blob(["\uFEFF" + csv], {
            type: "text/csv;charset=utf-8;",
        });

        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");

        anchor.href = url;
        anchor.download = "campusflow-adjustments.csv";

        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();

        URL.revokeObjectURL(url);
    };

    const closeAllModals = () => {
        setShowCreateModal(false);
        setShowReviewModal(false);
        setSelectedAdjustment(null);
        setFormError("");
    };

    return (
        <div className="min-h-full min-w-0 bg-slate-50/70 px-3 py-4 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:px-5 sm:py-6 xl:px-8 2xl:px-10">
            <div className="mx-auto w-full max-w-[1920px] min-w-0 space-y-6 2xl:space-y-8">
                {/* Header */}
                <header className="flex min-w-0 flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="min-w-0">

                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl xl:text-4xl">
                            Financial Adjustments
                        </h1>

                        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                            Create and track student account corrections, fee adjustments,
                            scholarship credits, and other financial requests.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 lg:shrink-0">
                        <button
                            type="button"
                            onClick={exportCSV}
                            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
                        >
                            <Download size={16} />
                            Export CSV
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setFormError("");
                                setShowCreateModal(true);
                            }}
                            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                            <Plus size={17} />
                            New Adjustment
                        </button>
                    </div>
                </header>

                {/* Success message */}
                {successMessage && (
                    <div
                        role="status"
                        className="flex items-start justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300"
                    >
                        <div className="flex items-start gap-2">
                            <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                            <span>{successMessage}</span>
                        </div>

                        <button
                            type="button"
                            onClick={() => setSuccessMessage("")}
                            aria-label="Dismiss message"
                            className="shrink-0 rounded-md p-1 hover:bg-emerald-100 dark:hover:bg-emerald-900/40"
                        >
                            <X size={17} />
                        </button>
                    </div>
                )}

                {/* Summary cards */}
                <section
                    aria-label="Adjustment statistics"
                    className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
                >
                    <SummaryCard
                        title="Total Requests"
                        value={String(stats.total)}
                        description="All adjustment requests"
                        icon={<FileText size={20} />}
                        iconClass="bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300"
                    />

                    <SummaryCard
                        title="Pending Requests"
                        value={String(stats.pending)}
                        description={`${formatCurrency(stats.pendingAmount)} awaiting review`}
                        icon={<Clock3 size={20} />}
                        iconClass="bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300"
                    />

                    <SummaryCard
                        title="Approved Requests"
                        value={String(stats.approved)}
                        description={`${formatCurrency(stats.approvedAmount)} approved amount`}
                        icon={<CheckCircle2 size={20} />}
                        iconClass="bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                    />

                    <SummaryCard
                        title="Rejected Requests"
                        value={String(stats.rejected)}
                        description="Requests not approved"
                        icon={<XCircle size={20} />}
                        iconClass="bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300"
                    />
                </section>

                {/* Approval information */}
                <section className="flex min-w-0 gap-3 rounded-2xl border border-blue-100 bg-blue-50/80 p-4 sm:p-5 dark:border-blue-900/60 dark:bg-blue-950/30">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
                        <AlertCircle size={20} />
                    </div>

                    <div className="min-w-0">
                        <h2 className="text-sm font-semibold text-blue-950 dark:text-blue-200">
                            Approval and audit policy
                        </h2>

                        <p className="mt-1 text-sm leading-6 text-blue-900/75 dark:text-blue-200/75">
                            Adjustment requests should be reviewed by an authorized
                            administrator. Approval must be recorded in the audit trail,
                            and the corresponding financial ledger entry should be posted
                            only after server-side authorization and validation.
                        </p>
                    </div>
                </section>

                {/* Filters */}
                <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 xl:p-6 dark:border-slate-800 dark:bg-slate-900">
                    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex min-w-0 flex-wrap items-center gap-2">
                            <SlidersHorizontal
                                size={18}
                                className="shrink-0 text-slate-500 dark:text-slate-400"
                            />

                            <h2 className="font-semibold">Adjustment Requests</h2>

                            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                                {filteredAdjustments.length}
                            </span>
                        </div>

                        <button
                            type="button"
                            onClick={resetFilters}
                            className="inline-flex items-center gap-1.5 self-start text-sm font-medium text-slate-500 transition hover:text-blue-700 sm:self-auto dark:text-slate-400 dark:hover:text-blue-400"
                        >
                            <RefreshCw size={14} />
                            Reset filters
                        </button>
                    </div>

                    <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 2xl:gap-4">
                        <div className="relative min-w-0">
                            <Search
                                size={17}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <input
                                type="search"
                                value={searchTerm}
                                onChange={(event) => {
                                    setSearchTerm(event.target.value);
                                    setPage(1);
                                }}
                                placeholder="Search student, ID, reference..."
                                aria-label="Search adjustments"
                                className={`${fieldClass} pl-10`}
                            />
                        </div>

                        <select
                            value={statusFilter}
                            onChange={(event) => {
                                setStatusFilter(event.target.value);
                                setPage(1);
                            }}
                            className={fieldClass}
                            aria-label="Filter by status"
                        >
                            <option value="ALL">All statuses</option>
                            <option value="PENDING">Pending</option>
                            <option value="APPROVED">Approved</option>
                            <option value="REJECTED">Rejected</option>
                        </select>

                        <select
                            value={typeFilter}
                            onChange={(event) => {
                                setTypeFilter(event.target.value);
                                setPage(1);
                            }}
                            className={fieldClass}
                            aria-label="Filter by adjustment type"
                        >
                            <option value="ALL">All adjustment types</option>
                            <option value="CREDIT">Credit</option>
                            <option value="DEBIT">Debit</option>
                        </select>

                        <button
                            type="button"
                            onClick={() =>
                                setSortOrder((current) =>
                                    current === "newest" ? "oldest" : "newest",
                                )
                            }
                            className="inline-flex min-h-11 min-w-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:hover:bg-slate-800"
                        >
                            <ArrowUpDown size={16} className="shrink-0" />
                            {sortOrder === "newest" ? "Newest first" : "Oldest first"}
                        </button>
                    </div>
                </section>

                {/* Adjustments table */}
                <section className="w-full min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex flex-col gap-1 border-b border-slate-200 px-4 py-4 sm:px-5 dark:border-slate-800">
                        <h2 className="font-semibold">Adjustment register</h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Review student corrections and their approval status.
                        </p>
                    </div>

                    <div className="w-full overflow-x-auto">
                        <table className="w-full min-w-[1000px] text-left text-sm 2xl:min-w-0">
                            <thead className="border-b border-slate-200 bg-slate-50/80 text-xs uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-400">
                                <tr>
                                    <th scope="col" className="px-3 py-4 font-semibold xl:px-5">
                                        Request / Student
                                    </th>
                                    <th scope="col" className="px-3 py-4 font-semibold xl:px-5">
                                        Adjustment
                                    </th>
                                    <th scope="col" className="px-3 py-4 font-semibold xl:px-5">
                                        Amount
                                    </th>
                                    <th scope="col" className="px-3 py-4 font-semibold xl:px-5">
                                        Requested Date
                                    </th>
                                    <th scope="col" className="px-3 py-4 font-semibold xl:px-5">
                                        Status
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-4 text-right font-semibold xl:px-5"
                                    >
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {paginatedAdjustments.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="transition hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
                                    >
                                        <td className="px-3 py-4 xl:px-5">
                                            <div className="flex items-start gap-3">
                                                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                                                    {item.studentName
                                                        .split(" ")
                                                        .map((part) => part[0])
                                                        .slice(0, 2)
                                                        .join("")}
                                                </div>

                                                <div className="min-w-0">
                                                    <p className="font-semibold text-slate-900 dark:text-white">
                                                        {item.studentName}
                                                    </p>
                                                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                                        {item.studentId}
                                                    </p>
                                                    <p className="mt-1 text-xs text-slate-400">
                                                        {item.reference}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-3 py-4 xl:px-5">
                                            <div className="flex items-start gap-2">
                                                {item.type === "CREDIT" ? (
                                                    <TrendingDown
                                                        size={16}
                                                        className="mt-0.5 shrink-0 text-emerald-600"
                                                    />
                                                ) : (
                                                    <TrendingUp
                                                        size={16}
                                                        className="mt-0.5 shrink-0 text-rose-600"
                                                    />
                                                )}

                                                <div className="min-w-0">
                                                    <p className="font-medium text-slate-800 dark:text-slate-200">
                                                        {item.category}
                                                    </p>

                                                    <span
                                                        className={`mt-1 inline-flex rounded-md px-2 py-0.5 text-[10px] font-bold tracking-wide ${item.type === "CREDIT"
                                                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                                                            : "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300"
                                                            }`}
                                                    >
                                                        {item.type}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="whitespace-nowrap px-3 py-4 xl:px-5">
                                            <p className="font-semibold tabular-nums text-slate-900 dark:text-white">
                                                {formatCurrency(item.amount)}
                                            </p>
                                            <p className="mt-1 text-xs text-slate-400">BDT</p>
                                        </td>

                                        <td className="whitespace-nowrap px-3 py-4 xl:px-5">
                                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                                                <CalendarDays
                                                    size={15}
                                                    className="shrink-0 text-slate-400"
                                                />
                                                {formatDate(item.requestedAt)}
                                            </div>
                                        </td>

                                        <td className="px-3 py-4 xl:px-5">
                                            <StatusBadge status={item.status} />

                                            {item.reviewedAt && (
                                                <p className="mt-1.5 whitespace-nowrap text-xs text-slate-400">
                                                    Reviewed {formatDate(item.reviewedAt)}
                                                </p>
                                            )}
                                        </td>

                                        <td className="px-3 py-4 xl:px-5">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <ActionButton
                                                    label={`View ${item.reference}`}
                                                    title="View adjustment details"
                                                    onClick={() => setSelectedAdjustment(item)}
                                                    className="border-slate-200 text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-blue-500/10"
                                                >
                                                    <Eye size={16} />
                                                </ActionButton>

                                                {item.status === "PENDING" && (
                                                    <>
                                                        <ActionButton
                                                            label={`Approve ${item.reference}`}
                                                            title="Approve request"
                                                            onClick={() =>
                                                                openReviewModal(item, "APPROVED")
                                                            }
                                                            className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-900 dark:text-emerald-300 dark:hover:bg-emerald-500/10"
                                                        >
                                                            <CheckCircle2 size={16} />
                                                        </ActionButton>

                                                        <ActionButton
                                                            label={`Reject ${item.reference}`}
                                                            title="Reject request"
                                                            onClick={() =>
                                                                openReviewModal(item, "REJECTED")
                                                            }
                                                            className="border-rose-200 text-rose-700 hover:bg-rose-50 dark:border-rose-900 dark:text-rose-300 dark:hover:bg-rose-500/10"
                                                        >
                                                            <XCircle size={16} />
                                                        </ActionButton>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {paginatedAdjustments.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-5 py-16 text-center">
                                            <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800">
                                                <Search size={22} />
                                            </div>

                                            <p className="mt-3 font-semibold">
                                                No adjustments found
                                            </p>

                                            <p className="mt-1 text-sm text-slate-500">
                                                Try changing your search terms or filters.
                                            </p>

                                            <button
                                                type="button"
                                                onClick={resetFilters}
                                                className="mt-3 text-sm font-semibold text-blue-700 hover:underline dark:text-blue-400"
                                            >
                                                Clear filters
                                            </button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-col gap-4 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 dark:border-slate-800">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Showing{" "}
                            <span className="font-semibold text-slate-800 dark:text-slate-200">
                                {filteredAdjustments.length === 0
                                    ? 0
                                    : (currentPage - 1) * pageSize + 1}
                            </span>{" "}
                            to{" "}
                            <span className="font-semibold text-slate-800 dark:text-slate-200">
                                {Math.min(
                                    currentPage * pageSize,
                                    filteredAdjustments.length,
                                )}
                            </span>{" "}
                            of{" "}
                            <span className="font-semibold text-slate-800 dark:text-slate-200">
                                {filteredAdjustments.length}
                            </span>{" "}
                            requests
                        </p>

                        <div className="flex flex-wrap items-center justify-between gap-3 sm:justify-end">
                            <select
                                value={pageSize}
                                onChange={(event) => {
                                    setPageSize(Number(event.target.value));
                                    setPage(1);
                                }}
                                aria-label="Rows per page"
                                className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
                            >
                                <option value={5}>5 / page</option>
                                <option value={10}>10 / page</option>
                                <option value={20}>20 / page</option>
                            </select>

                            <div className="flex items-center gap-1">
                                <button
                                    type="button"
                                    disabled={currentPage <= 1}
                                    onClick={() =>
                                        setPage((value) => Math.max(1, value - 1))
                                    }
                                    aria-label="Previous page"
                                    className="flex size-9 items-center justify-center rounded-lg border border-slate-200 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:hover:bg-slate-800"
                                >
                                    <ChevronLeft size={17} />
                                </button>

                                <span className="min-w-16 text-center text-sm text-slate-600 dark:text-slate-300">
                                    {currentPage} / {totalPages}
                                </span>

                                <button
                                    type="button"
                                    disabled={currentPage >= totalPages}
                                    onClick={() =>
                                        setPage((value) => Math.min(totalPages, value + 1))
                                    }
                                    aria-label="Next page"
                                    className="flex size-9 items-center justify-center rounded-lg border border-slate-200 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:hover:bg-slate-800"
                                >
                                    <ChevronRight size={17} />
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <p className="text-xs leading-5 text-slate-400">
                    Demo mode: changes are stored in component state only. Connect the
                    page to your authenticated backend before using it for real financial
                    records.
                </p>
            </div>

            {/* Create adjustment modal */}
            {showCreateModal && (
                <Modal
                    title="Create Adjustment Request"
                    description="Submit a financial correction for administrative review."
                    onClose={closeAllModals}
                    maxWidth="max-w-3xl"
                >
                    <form onSubmit={handleCreateAdjustment} className="space-y-5">
                        <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm leading-5 text-amber-800 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-300">
                            This request will be created as pending. Creating it does not
                            change the student's balance or post a ledger transaction.
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <FormField label="Student ID" required>
                                <input
                                    required
                                    value={form.studentId}
                                    onChange={(event) =>
                                        updateForm("studentId", event.target.value)
                                    }
                                    placeholder="e.g. STU-2025-CSE-0001"
                                    className={fieldClass}
                                />
                            </FormField>

                            <FormField label="Student Name" required>
                                <input
                                    required
                                    value={form.studentName}
                                    onChange={(event) =>
                                        updateForm("studentName", event.target.value)
                                    }
                                    placeholder="Enter student name"
                                    className={fieldClass}
                                />
                            </FormField>

                            <FormField label="Student Email">
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(event) =>
                                        updateForm("email", event.target.value)
                                    }
                                    placeholder="student@university.edu"
                                    className={fieldClass}
                                />
                            </FormField>

                            <FormField label="Program">
                                <input
                                    value={form.program}
                                    onChange={(event) =>
                                        updateForm("program", event.target.value)
                                    }
                                    placeholder="e.g. B.Sc. in CSE"
                                    className={fieldClass}
                                />
                            </FormField>

                            <FormField label="Adjustment Type" required>
                                <select
                                    value={form.type}
                                    onChange={(event) =>
                                        updateForm("type", event.target.value)
                                    }
                                    className={fieldClass}
                                >
                                    <option value="CREDIT">
                                        Credit — reduce amount owed
                                    </option>
                                    <option value="DEBIT">
                                        Debit — increase amount owed
                                    </option>
                                </select>
                            </FormField>

                            <FormField label="Category" required>
                                <select
                                    value={form.category}
                                    onChange={(event) =>
                                        updateForm("category", event.target.value)
                                    }
                                    className={fieldClass}
                                >
                                    <option>Scholarship Correction</option>
                                    <option>Fee Waiver</option>
                                    <option>Payment Reconciliation</option>
                                    <option>Overpayment Correction</option>
                                    <option>Fee Correction</option>
                                    <option>Late Fee Correction</option>
                                    <option>Invoice Correction</option>
                                    <option>Other</option>
                                </select>
                            </FormField>

                            <FormField label="Amount (BDT)" required>
                                <input
                                    type="number"
                                    required
                                    min="0.01"
                                    step="0.01"
                                    value={form.amount}
                                    onChange={(event) =>
                                        updateForm("amount", event.target.value)
                                    }
                                    placeholder="0.00"
                                    className={fieldClass}
                                />
                            </FormField>

                            <FormField label="Currency">
                                <input
                                    value="BDT — Bangladeshi Taka"
                                    disabled
                                    className={`${fieldClass} opacity-70`}
                                />
                            </FormField>
                        </div>

                        <FormField label="Reason for Adjustment" required>
                            <textarea
                                required
                                minLength={10}
                                rows={4}
                                value={form.reason}
                                onChange={(event) =>
                                    updateForm("reason", event.target.value)
                                }
                                placeholder="Explain why this adjustment is needed and include relevant supporting details..."
                                className={`${fieldClass} resize-y`}
                            />
                        </FormField>

                        {formError && <ErrorMessage message={formError} />}

                        <div className="flex flex-col-reverse gap-2 border-t border-slate-200 pt-4 sm:flex-row sm:justify-end dark:border-slate-800">
                            <button
                                type="button"
                                onClick={closeAllModals}
                                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
                            >
                                <Plus size={16} />
                                Submit Request
                            </button>
                        </div>
                    </form>
                </Modal>
            )}

            {/* Review modal */}
            {showReviewModal && reviewTarget && (
                <Modal
                    title={
                        reviewAction === "APPROVED"
                            ? "Approve Adjustment"
                            : "Reject Adjustment"
                    }
                    description={`${reviewTarget.reference} · ${reviewTarget.studentName}`}
                    onClose={closeAllModals}
                    maxWidth="max-w-xl"
                >
                    <form onSubmit={handleReview} className="space-y-5">
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Requested amount
                            </p>
                            <p className="mt-1 break-words text-2xl font-bold">
                                {formatCurrency(reviewTarget.amount)}
                            </p>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                                {reviewTarget.category} · {reviewTarget.type}
                            </p>
                        </div>

                        {reviewAction === "APPROVED" ? (
                            <div className="flex gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm leading-5 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300">
                                <CheckCircle2 size={19} className="mt-0.5 shrink-0" />
                                <p>
                                    In production, approval must be performed by an authorized
                                    administrator on the server. This demo only updates the
                                    displayed status.
                                </p>
                            </div>
                        ) : (
                            <FormField label="Reason for rejection" required>
                                <textarea
                                    required
                                    minLength={3}
                                    rows={3}
                                    value={reviewNote}
                                    onChange={(event) => setReviewNote(event.target.value)}
                                    placeholder="Explain why this request is being rejected..."
                                    className={`${fieldClass} resize-y`}
                                />
                            </FormField>
                        )}

                        <div className="flex flex-col-reverse gap-2 border-t border-slate-200 pt-4 sm:flex-row sm:justify-end dark:border-slate-800">
                            <button
                                type="button"
                                onClick={closeAllModals}
                                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition ${reviewAction === "APPROVED"
                                    ? "bg-emerald-600 hover:bg-emerald-700"
                                    : "bg-rose-600 hover:bg-rose-700"
                                    }`}
                            >
                                {reviewAction === "APPROVED" ? (
                                    <CheckCircle2 size={16} />
                                ) : (
                                    <XCircle size={16} />
                                )}
                                Confirm{" "}
                                {reviewAction === "APPROVED" ? "Approval" : "Rejection"}
                            </button>
                        </div>
                    </form>
                </Modal>
            )}

            {/* Adjustment details modal */}
            {selectedAdjustment && (
                <Modal
                    title="Adjustment Details"
                    description={selectedAdjustment.reference}
                    onClose={closeAllModals}
                    maxWidth="max-w-3xl"
                >
                    <div className="space-y-5">
                        <div className="flex flex-col gap-4 rounded-2xl bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between dark:bg-slate-950">
                            <div className="min-w-0">
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Requested amount
                                </p>

                                <p className="mt-1 break-words text-2xl font-bold tracking-tight sm:text-3xl">
                                    {formatCurrency(selectedAdjustment.amount)}
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    {selectedAdjustment.type === "CREDIT"
                                        ? "Credit adjustment"
                                        : "Debit adjustment"}
                                </p>
                            </div>

                            <div className="self-start sm:self-center">
                                <StatusBadge status={selectedAdjustment.status} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            <DetailItem
                                icon={<UserRound size={16} />}
                                label="Student"
                                value={selectedAdjustment.studentName}
                            />

                            <DetailItem
                                icon={<FileText size={16} />}
                                label="Student ID"
                                value={selectedAdjustment.studentId}
                            />

                            <DetailItem
                                icon={<Building2 size={16} />}
                                label="Program"
                                value={selectedAdjustment.program}
                            />

                            <DetailItem
                                icon={<CircleDollarSign size={16} />}
                                label="Category"
                                value={selectedAdjustment.category}
                            />

                            <DetailItem
                                icon={<CalendarDays size={16} />}
                                label="Requested Date"
                                value={formatDate(selectedAdjustment.requestedAt)}
                            />

                            <DetailItem
                                icon={<UserRound size={16} />}
                                label="Requested By"
                                value={selectedAdjustment.requestedBy}
                            />

                            <DetailItem
                                icon={<FileText size={16} />}
                                label="Student Email"
                                value={selectedAdjustment.email}
                            />
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold">Reason</h3>
                            <p className="mt-2 break-words rounded-xl border border-slate-200 p-4 text-sm leading-6 text-slate-600 dark:border-slate-800 dark:text-slate-300">
                                {selectedAdjustment.reason}
                            </p>
                        </div>

                        {selectedAdjustment.reviewedBy && (
                            <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                                <h3 className="text-sm font-semibold">Review Information</h3>

                                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                                    Reviewed by: {selectedAdjustment.reviewedBy}
                                </p>

                                {selectedAdjustment.reviewedAt && (
                                    <p className="mt-1 text-sm text-slate-500">
                                        Review date: {formatDate(selectedAdjustment.reviewedAt)}
                                    </p>
                                )}

                                {selectedAdjustment.reviewNote && (
                                    <p className="mt-2 break-words text-sm text-slate-600 dark:text-slate-300">
                                        Review note: {selectedAdjustment.reviewNote}
                                    </p>
                                )}
                            </div>
                        )}

                        <div className="flex flex-col-reverse gap-2 border-t border-slate-200 pt-4 sm:flex-row sm:flex-wrap sm:justify-end dark:border-slate-800">
                            <button
                                type="button"
                                onClick={closeAllModals}
                                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                            >
                                Close
                            </button>

                            {selectedAdjustment.status === "PENDING" && (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const target = selectedAdjustment;
                                            setSelectedAdjustment(null);
                                            openReviewModal(target, "REJECTED");
                                        }}
                                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-200 px-4 py-2.5 text-sm font-semibold text-rose-700 transition hover:bg-rose-50 dark:border-rose-900 dark:text-rose-300 dark:hover:bg-rose-500/10"
                                    >
                                        <XCircle size={16} />
                                        Reject
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            const target = selectedAdjustment;
                                            setSelectedAdjustment(null);
                                            openReviewModal(target, "APPROVED");
                                        }}
                                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                                    >
                                        <CheckCircle2 size={16} />
                                        Review Approval
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </Modal>
            )}
        </div>
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
        <div className="flex h-full min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        {title}
                    </p>

                    <p className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                        {value}
                    </p>
                </div>

                <div
                    className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
                >
                    {icon}
                </div>
            </div>

            <p className="mt-3 break-words text-xs leading-5 text-slate-500 dark:text-slate-400">
                {description}
            </p>
        </div>
    );
}

function StatusBadge({ status }: { status: AdjustmentStatus }) {
    const icon =
        status === "APPROVED" ? (
            <CheckCircle2 size={13} />
        ) : status === "REJECTED" ? (
            <XCircle size={13} />
        ) : (
            <Clock3 size={13} />
        );

    return (
        <span
            className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[status]}`}
        >
            {icon}
            {status.charAt(0) + status.slice(1).toLowerCase()}
        </span>
    );
}

function ActionButton({
    label,
    title,
    onClick,
    className,
    children,
}: {
    label: string;
    title: string;
    onClick: () => void;
    className: string;
    children: React.ReactNode;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            title={title}
            aria-label={label}
            className={`flex size-9 shrink-0 items-center justify-center rounded-lg border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${className}`}
        >
            {children}
        </button>
    );
}

function Modal({
    title,
    description,
    onClose,
    maxWidth = "max-w-xl",
    children,
}: {
    title: string;
    description: string;
    onClose: () => void;
    maxWidth?: string;
    children: React.ReactNode;
}) {
    return (
        <div
            className="fixed inset-0 z-[100] flex items-end justify-center overflow-y-auto bg-slate-950/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-label={title}
                className={`flex max-h-[90dvh] w-full min-w-0 ${maxWidth} flex-col overflow-hidden rounded-t-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 sm:rounded-2xl`}
            >
                <div className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-200 px-4 py-4 sm:px-6 dark:border-slate-800">
                    <div className="min-w-0">
                        <h2 className="text-lg font-bold">{title}</h2>
                        <p className="mt-1 break-words text-sm text-slate-500 dark:text-slate-400">
                            {description}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close dialog"
                        className="flex size-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                        <X size={19} />
                    </button>
                </div>

                <div className="min-h-0 overflow-y-auto p-4 sm:p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}

function FormField({
    label,
    required,
    children,
}: {
    label: string;
    required?: boolean;
    children: React.ReactNode;
}) {
    return (
        <label className="block min-w-0 space-y-2">
            <span className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                {label}
                {required && <span className="ml-1 text-rose-500">*</span>}
            </span>
            {children}
        </label>
    );
}

function DetailItem({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="flex min-w-0 items-start gap-3">
            <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                {icon}
            </div>

            <div className="min-w-0">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                    {label}
                </p>
                <p className="mt-1 break-words text-sm font-medium">{value}</p>
            </div>
        </div>
    );
}

function ErrorMessage({ message }: { message: string }) {
    return (
        <div
            role="alert"
            className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-300"
        >
            <AlertCircle size={17} className="mt-0.5 shrink-0" />
            <span>{message}</span>
        </div>
    );
}
