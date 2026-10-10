// import React from 'react'

// export default function scholarships() {
//   return (
//     <div>scholarships</div>
//   )
// }











// "use client";

// import React, { useMemo, useState } from "react";
// import Link from "next/link";
// import {
//     Search,
//     Plus,
//     Download,
//     GraduationCap,
//     Users,
//     Wallet,
//     CheckCircle2,
//     Clock3,
//     XCircle,
//     Eye,
//     CalendarDays,
//     ArrowUpRight,
//     FileText,
//     Filter,
//     X,
// } from "lucide-react";
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
// } from "@/components/ui/dialog";

// type ScholarshipStatus =
//     | "APPROVED"
//     | "PENDING"
//     | "REJECTED"
//     | "ACTIVE"
//     | "EXPIRED";

// type ScholarshipType =
//     | "MERIT"
//     | "NEED_BASED"
//     | "ACADEMIC"
//     | "FINANCIAL_AID"
//     | "OTHER";

// type Scholarship = {
//     id: string;
//     studentId: string;
//     studentName: string;
//     email: string;
//     program: string;
//     scholarshipName: string;
//     type: ScholarshipType;
//     amount: number;
//     coverage: string;
//     academicSession: string;
//     appliedDate: string;
//     startDate: string;
//     endDate: string;
//     status: ScholarshipStatus;
//     approvedBy: string;
//     description: string;
// };

// const initialScholarships: Scholarship[] = [
//     {
//         id: "SCH-2026-001",
//         studentId: "STU-2026-0012",
//         studentName: "Ayan Sujon",
//         email: "ayan@example.com",
//         program: "B.Sc. in Computer Science",
//         scholarshipName: "Academic Excellence Scholarship",
//         type: "MERIT",
//         amount: 25000,
//         coverage: "50%",
//         academicSession: "2026 Spring",
//         appliedDate: "2026-09-12",
//         startDate: "2026-10-01",
//         endDate: "2027-03-31",
//         status: "ACTIVE",
//         approvedBy: "Admin",
//         description:
//             "Scholarship awarded based on academic performance and eligibility.",
//     },
//     {
//         id: "SCH-2026-002",
//         studentId: "STU-2025-0048",
//         studentName: "Nusrat Jahan",
//         email: "nusrat@example.com",
//         program: "BBA",
//         scholarshipName: "Need-Based Financial Aid",
//         type: "NEED_BASED",
//         amount: 15000,
//         coverage: "30%",
//         academicSession: "2026 Spring",
//         appliedDate: "2026-09-20",
//         startDate: "2026-10-01",
//         endDate: "2027-03-31",
//         status: "PENDING",
//         approvedBy: "Not assigned",
//         description:
//             "Financial assistance application awaiting eligibility review.",
//     },
//     {
//         id: "SCH-2026-003",
//         studentId: "STU-2024-0091",
//         studentName: "Rahim Ahmed",
//         email: "rahim@example.com",
//         program: "B.Sc. in Electrical Engineering",
//         scholarshipName: "Academic Merit Award",
//         type: "ACADEMIC",
//         amount: 20000,
//         coverage: "40%",
//         academicSession: "2026 Spring",
//         appliedDate: "2026-08-15",
//         startDate: "2026-09-01",
//         endDate: "2027-02-28",
//         status: "APPROVED",
//         approvedBy: "Finance Admin",
//         description:
//             "Approved academic award. Verify the scholarship ledger posting before applying it to an invoice.",
//     },
//     {
//         id: "SCH-2026-004",
//         studentId: "STU-2025-0035",
//         studentName: "Maliha Islam",
//         email: "maliha@example.com",
//         program: "B.Sc. in Mathematics",
//         scholarshipName: "Student Financial Support",
//         type: "FINANCIAL_AID",
//         amount: 10000,
//         coverage: "20%",
//         academicSession: "2026 Spring",
//         appliedDate: "2026-08-10",
//         startDate: "2026-09-01",
//         endDate: "2027-02-28",
//         status: "REJECTED",
//         approvedBy: "Finance Admin",
//         description:
//             "The application did not meet the required eligibility criteria.",
//     },
//     {
//         id: "SCH-2026-005",
//         studentId: "STU-2024-0066",
//         studentName: "Tanvir Hasan",
//         email: "tanvir@example.com",
//         program: "B.Sc. in Computer Science",
//         scholarshipName: "Merit Support Grant",
//         type: "MERIT",
//         amount: 12000,
//         coverage: "25%",
//         academicSession: "2025 Fall",
//         appliedDate: "2025-08-12",
//         startDate: "2025-09-01",
//         endDate: "2026-02-28",
//         status: "EXPIRED",
//         approvedBy: "Finance Admin",
//         description:
//             "The scholarship period has ended.",
//     },
// ];

// const currency = (amount: number) =>
//     new Intl.NumberFormat("en-BD", {
//         style: "currency",
//         currency: "BDT",
//         maximumFractionDigits: 0,
//     }).format(amount);

// const scholarshipTypes: Record<ScholarshipType, string> = {
//     MERIT: "Merit Based",
//     NEED_BASED: "Need Based",
//     ACADEMIC: "Academic",
//     FINANCIAL_AID: "Financial Aid",
//     OTHER: "Other",
// };

// const statusStyles: Record<ScholarshipStatus, string> = {
//     ACTIVE:
//         "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
//     APPROVED:
//         "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
//     PENDING:
//         "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
//     REJECTED:
//         "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400",
//     EXPIRED:
//         "bg-muted text-muted-foreground",
// };

// function StatusBadge({ status }: { status: ScholarshipStatus }) {
//     return (
//         <span
//             className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[status]}`}
//         >
//             {status.replace("_", " ")}
//         </span>
//     );
// }

// function SummaryCard({
//     title,
//     value,
//     subtitle,
//     icon: Icon,
//     iconClass,
// }: {
//     title: string;
//     value: string;
//     subtitle: string;
//     icon: React.ElementType;
//     iconClass: string;
// }) {
//     return (
//         <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
//             <div className="flex items-start justify-between gap-3">
//                 <div className={`flex size-11 items-center justify-center rounded-xl ${iconClass}`}>
//                     <Icon size={21} />
//                 </div>
//                 <ArrowUpRight size={17} className="text-muted-foreground" />
//             </div>
//             <p className="mt-4 text-sm text-muted-foreground">{title}</p>
//             <p className="mt-1 text-2xl font-bold tracking-tight">{value}</p>
//             <p className="mt-2 text-xs text-muted-foreground">{subtitle}</p>
//         </div>
//     );
// }

// export default function Scholarships() {
//     const [scholarships, setScholarships] =
//         useState<Scholarship[]>(initialScholarships);
//     const [search, setSearch] = useState("");
//     const [statusFilter, setStatusFilter] = useState("ALL");
//     const [typeFilter, setTypeFilter] = useState("ALL");
//     const [selectedScholarship, setSelectedScholarship] =
//         useState<Scholarship | null>(null);

//     const [createOpen, setCreateOpen] = useState(false);
//     const [newScholarship, setNewScholarship] = useState({
//         studentId: "",
//         studentName: "",
//         email: "",
//         program: "",
//         scholarshipName: "",
//         type: "MERIT" as ScholarshipType,
//         amount: "",
//         coverage: "",
//         academicSession: "2026 Fall",
//         startDate: "",
//         endDate: "",
//         description: "",
//     });
//     const [formError, setFormError] = useState("");

//     const summary = useMemo(() => {
//         const active = scholarships.filter(
//             (item) => item.status === "ACTIVE",
//         );
//         const pending = scholarships.filter(
//             (item) => item.status === "PENDING",
//         );
//         const approved = scholarships.filter(
//             (item) =>
//                 item.status === "APPROVED" || item.status === "ACTIVE",
//         );

//         return {
//             total: scholarships.length,
//             active: active.length,
//             pending: pending.length,
//             approvedAmount: approved.reduce(
//                 (sum, item) => sum + item.amount,
//                 0,
//             ),
//         };
//     }, [scholarships]);

//     const filteredScholarships = useMemo(() => {
//         const query = search.trim().toLowerCase();

//         return scholarships.filter((item) => {
//             const matchesSearch =
//                 !query ||
//                 item.studentName.toLowerCase().includes(query) ||
//                 item.studentId.toLowerCase().includes(query) ||
//                 item.id.toLowerCase().includes(query) ||
//                 item.scholarshipName.toLowerCase().includes(query) ||
//                 item.program.toLowerCase().includes(query);

//             const matchesStatus =
//                 statusFilter === "ALL" || item.status === statusFilter;

//             const matchesType =
//                 typeFilter === "ALL" || item.type === typeFilter;

//             return matchesSearch && matchesStatus && matchesType;
//         });
//     }, [scholarships, search, statusFilter, typeFilter]);

//     const handleCreateScholarship = (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         setFormError("");

//         const amount = Number(newScholarship.amount);

//         if (
//             !newScholarship.studentId.trim() ||
//             !newScholarship.studentName.trim() ||
//             !newScholarship.scholarshipName.trim() ||
//             !newScholarship.startDate ||
//             !newScholarship.endDate ||
//             !Number.isFinite(amount) ||
//             amount <= 0
//         ) {
//             setFormError("Please fill in all required fields with valid values.");
//             return;
//         }

//         if (new Date(newScholarship.endDate) < new Date(newScholarship.startDate)) {
//             setFormError("End date cannot be earlier than start date.");
//             return;
//         }

//         const record: Scholarship = {
//             ...newScholarship,
//             id: `SCH-${Date.now()}`,
//             amount,
//             coverage: newScholarship.coverage.trim() || "Not specified",
//             appliedDate: new Date().toISOString().slice(0, 10),
//             status: "PENDING",
//             approvedBy: "Not assigned",
//             email: newScholarship.email.trim() || "Not provided",
//             program: newScholarship.program.trim() || "Not specified",
//         };

//         setScholarships((current) => [record, ...current]);
//         setCreateOpen(false);
//         setNewScholarship({
//             studentId: "",
//             studentName: "",
//             email: "",
//             program: "",
//             scholarshipName: "",
//             type: "MERIT",
//             amount: "",
//             coverage: "",
//             academicSession: "2026 Fall",
//             startDate: "",
//             endDate: "",
//             description: "",
//         });
//     };

//     const exportCsv = () => {
//         const headers = [
//             "Scholarship ID",
//             "Student",
//             "Student ID",
//             "Scholarship Name",
//             "Type",
//             "Amount",
//             "Coverage",
//             "Session",
//             "Status",
//             "Start Date",
//             "End Date",
//         ];

//         const rows = filteredScholarships.map((item) => [
//             item.id,
//             item.studentName,
//             item.studentId,
//             item.scholarshipName,
//             scholarshipTypes[item.type],
//             item.amount,
//             item.coverage,
//             item.academicSession,
//             item.status,
//             item.startDate,
//             item.endDate,
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
//         link.download = "campusflow-scholarships.csv";
//         link.click();
//         URL.revokeObjectURL(url);
//     };

//     return (
//         <main className="min-h-screen space-y-6 bg-background p-4 text-foreground sm:p-6 lg:p-8">
//             {/* Page heading */}
//             <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
//                 <div>
//                     <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
//                         <Link href="/accountant" className="hover:text-primary">
//                             Accountant
//                         </Link>
//                         <span>/</span>
//                         <span>Scholarships</span>
//                     </div>

//                     <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
//                         Scholarships
//                     </h1>
//                     <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
//                         Manage student scholarships, financial aid, tuition waivers
//                         and their approval status.
//                     </p>
//                 </div>

//                 <div className="flex flex-wrap items-center gap-2">
//                     <button
//                         type="button"
//                         onClick={exportCsv}
//                         className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm font-medium transition hover:bg-muted"
//                     >
//                         <Download size={16} />
//                         Export CSV
//                     </button>

//                     <button
//                         type="button"
//                         onClick={() => setCreateOpen(true)}
//                         className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
//                     >
//                         <Plus size={17} />
//                         Add Scholarship
//                     </button>
//                 </div>
//             </div>

//             {/* Summary cards */}
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
//                 <SummaryCard
//                     title="Total Scholarships"
//                     value={String(summary.total)}
//                     subtitle="All scholarship records"
//                     icon={GraduationCap}
//                     iconClass="bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400"
//                 />
//                 <SummaryCard
//                     title="Active Scholarships"
//                     value={String(summary.active)}
//                     subtitle="Currently active records"
//                     icon={CheckCircle2}
//                     iconClass="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
//                 />
//                 <SummaryCard
//                     title="Pending Applications"
//                     value={String(summary.pending)}
//                     subtitle="Awaiting a decision"
//                     icon={Clock3}
//                     iconClass="bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400"
//                 />
//                 <SummaryCard
//                     title="Approved Amount"
//                     value={currency(summary.approvedAmount)}
//                     subtitle="Active and approved records"
//                     icon={Wallet}
//                     iconClass="bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-400"
//                 />
//             </div>

//             {/* Policy / finance notice */}
//             <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50/70 p-4 dark:border-blue-900 dark:bg-blue-950/20">
//                 <GraduationCap className="mt-0.5 shrink-0 text-blue-700 dark:text-blue-400" size={20} />
//                 <div>
//                     <p className="text-sm font-semibold">Scholarship financial control</p>
//                     <p className="mt-1 text-sm leading-6 text-muted-foreground">
//                         An approved scholarship is not automatically a payment. Apply
//                         eligible awards to the student&apos;s invoice through your
//                         authorized backend workflow, with a complete audit trail.
//                     </p>
//                 </div>
//             </div>

//             {/* Filters */}
//             <section className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">
//                 <div className="mb-4 flex items-center gap-2">
//                     <Filter size={17} className="text-muted-foreground" />
//                     <h2 className="font-semibold">Search and filters</h2>
//                     <span className="ml-auto text-xs text-muted-foreground">
//                         {filteredScholarships.length} records
//                     </span>
//                 </div>

//                 <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
//                     <div className="relative">
//                         <Search
//                             size={17}
//                             className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
//                         />
//                         <input
//                             value={search}
//                             onChange={(event) => setSearch(event.target.value)}
//                             placeholder="Search student, ID, scholarship..."
//                             className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm outline-none transition placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
//                         />
//                     </div>

//                     <select
//                         value={statusFilter}
//                         onChange={(event) => setStatusFilter(event.target.value)}
//                         className="h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
//                         aria-label="Filter by status"
//                     >
//                         <option value="ALL">All statuses</option>
//                         <option value="ACTIVE">Active</option>
//                         <option value="APPROVED">Approved</option>
//                         <option value="PENDING">Pending</option>
//                         <option value="REJECTED">Rejected</option>
//                         <option value="EXPIRED">Expired</option>
//                     </select>

//                     <select
//                         value={typeFilter}
//                         onChange={(event) => setTypeFilter(event.target.value)}
//                         className="h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
//                         aria-label="Filter by scholarship type"
//                     >
//                         <option value="ALL">All scholarship types</option>
//                         {Object.entries(scholarshipTypes).map(([value, label]) => (
//                             <option key={value} value={value}>
//                                 {label}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//             </section>

//             {/* Scholarship table */}
//             <section className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
//                 <div className="flex flex-wrap items-center justify-between gap-3 p-5">
//                     <div>
//                         <h2 className="text-base font-semibold">Scholarship Records</h2>
//                         <p className="mt-1 text-sm text-muted-foreground">
//                             Review student financial aid and award details.
//                         </p>
//                     </div>
//                     <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
//                         {filteredScholarships.length} results
//                     </span>
//                 </div>

//                 <div className="overflow-x-auto">
//                     <table className="w-full min-w-[1050px] text-left text-sm">
//                         <thead>
//                             <tr className="border-y border-border bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
//                                 <th className="px-5 py-3 font-medium">Student</th>
//                                 <th className="px-5 py-3 font-medium">Scholarship</th>
//                                 <th className="px-5 py-3 font-medium">Type</th>
//                                 <th className="px-5 py-3 font-medium">Amount</th>
//                                 <th className="px-5 py-3 font-medium">Session</th>
//                                 <th className="px-5 py-3 font-medium">Period</th>
//                                 <th className="px-5 py-3 font-medium">Status</th>
//                                 <th className="px-5 py-3 text-right font-medium">Actions</th>
//                             </tr>
//                         </thead>

//                         <tbody>
//                             {filteredScholarships.map((item) => (
//                                 <tr
//                                     key={item.id}
//                                     className="border-b border-border last:border-0 transition hover:bg-muted/30"
//                                 >
//                                     <td className="px-5 py-4">
//                                         <div className="flex items-center gap-3">
//                                             <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
//                                                 {item.studentName
//                                                     .split(" ")
//                                                     .map((part) => part[0])
//                                                     .slice(0, 2)
//                                                     .join("")}
//                                             </div>
//                                             <div>
//                                                 <p className="font-semibold">{item.studentName}</p>
//                                                 <p className="mt-1 text-xs text-muted-foreground">
//                                                     {item.studentId}
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     </td>

//                                     <td className="px-5 py-4">
//                                         <p className="font-medium">{item.scholarshipName}</p>
//                                         <p className="mt-1 text-xs text-muted-foreground">
//                                             {item.id}
//                                         </p>
//                                     </td>

//                                     <td className="px-5 py-4 text-muted-foreground">
//                                         {scholarshipTypes[item.type]}
//                                     </td>

//                                     <td className="px-5 py-4">
//                                         <p className="font-semibold">{currency(item.amount)}</p>
//                                         <p className="mt-1 text-xs text-muted-foreground">
//                                             {item.coverage} coverage
//                                         </p>
//                                     </td>

//                                     <td className="px-5 py-4 text-muted-foreground">
//                                         {item.academicSession}
//                                     </td>

//                                     <td className="px-5 py-4 text-muted-foreground">
//                                         <div className="flex items-center gap-1.5">
//                                             <CalendarDays size={14} />
//                                             {item.startDate}
//                                         </div>
//                                         <p className="mt-1 pl-5 text-xs">
//                                             to {item.endDate}
//                                         </p>
//                                     </td>

//                                     <td className="px-5 py-4">
//                                         <StatusBadge status={item.status} />
//                                     </td>

//                                     <td className="px-5 py-4">
//                                         <div className="flex justify-end">
//                                             <button
//                                                 type="button"
//                                                 onClick={() => setSelectedScholarship(item)}
//                                                 className="inline-flex h-9 items-center gap-2 rounded-lg border border-border px-3 text-xs font-semibold transition hover:bg-muted"
//                                             >
//                                                 <Eye size={15} />
//                                                 View
//                                             </button>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}

//                             {filteredScholarships.length === 0 && (
//                                 <tr>
//                                     <td colSpan={8} className="px-5 py-14 text-center">
//                                         <GraduationCap
//                                             size={30}
//                                             className="mx-auto mb-3 text-muted-foreground"
//                                         />
//                                         <p className="font-semibold">No scholarships found</p>
//                                         <p className="mt-1 text-sm text-muted-foreground">
//                                             Try changing your search or filters.
//                                         </p>
//                                         <button
//                                             type="button"
//                                             onClick={() => {
//                                                 setSearch("");
//                                                 setStatusFilter("ALL");
//                                                 setTypeFilter("ALL");
//                                             }}
//                                             className="mt-3 text-sm font-semibold text-primary hover:underline"
//                                         >
//                                             Clear filters
//                                         </button>
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>

//                 <div className="flex flex-col gap-2 border-t border-border px-5 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
//                     <p>
//                         Showing {filteredScholarships.length} of {scholarships.length} records
//                     </p>
//                     <p>CampusFlow · Finance Management</p>
//                 </div>
//             </section>

//             {/* Scholarship details dialog */}
//             <Dialog
//                 open={Boolean(selectedScholarship)}
//                 onOpenChange={(open) => {
//                     if (!open) setSelectedScholarship(null);
//                 }}
//             >
//                 <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
//                     {selectedScholarship && (
//                         <>
//                             <DialogHeader>
//                                 <DialogTitle>Scholarship Details</DialogTitle>
//                                 <DialogDescription>
//                                     Review scholarship eligibility, award details and financial impact.
//                                 </DialogDescription>
//                             </DialogHeader>

//                             <div className="space-y-5">
//                                 <div className="flex flex-col justify-between gap-3 rounded-xl border border-border bg-muted/30 p-4 sm:flex-row sm:items-center">
//                                     <div>
//                                         <p className="text-xs text-muted-foreground">
//                                             Scholarship ID
//                                         </p>
//                                         <p className="mt-1 font-semibold">
//                                             {selectedScholarship.id}
//                                         </p>
//                                     </div>
//                                     <StatusBadge status={selectedScholarship.status} />
//                                 </div>

//                                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                                     <div className="rounded-lg border border-border p-4">
//                                         <p className="text-xs text-muted-foreground">
//                                             Scholarship Amount
//                                         </p>
//                                         <p className="mt-2 text-xl font-bold">
//                                             {currency(selectedScholarship.amount)}
//                                         </p>
//                                     </div>
//                                     <div className="rounded-lg border border-border p-4">
//                                         <p className="text-xs text-muted-foreground">
//                                             Coverage
//                                         </p>
//                                         <p className="mt-2 text-xl font-bold">
//                                             {selectedScholarship.coverage}
//                                         </p>
//                                     </div>
//                                 </div>

//                                 <div>
//                                     <h3 className="mb-3 font-semibold">Student Information</h3>
//                                     <div className="grid grid-cols-1 gap-4 rounded-xl border border-border p-4 sm:grid-cols-2">
//                                         <div>
//                                             <p className="text-xs text-muted-foreground">Name</p>
//                                             <p className="mt-1 text-sm font-medium">
//                                                 {selectedScholarship.studentName}
//                                             </p>
//                                         </div>
//                                         <div>
//                                             <p className="text-xs text-muted-foreground">Student ID</p>
//                                             <p className="mt-1 text-sm font-medium">
//                                                 {selectedScholarship.studentId}
//                                             </p>
//                                         </div>
//                                         <div>
//                                             <p className="text-xs text-muted-foreground">Email</p>
//                                             <p className="mt-1 break-all text-sm font-medium">
//                                                 {selectedScholarship.email}
//                                             </p>
//                                         </div>
//                                         <div>
//                                             <p className="text-xs text-muted-foreground">Program</p>
//                                             <p className="mt-1 text-sm font-medium">
//                                                 {selectedScholarship.program}
//                                             </p>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div>
//                                     <h3 className="mb-3 font-semibold">Award Information</h3>
//                                     <div className="grid grid-cols-1 gap-x-6 gap-y-4 rounded-xl border border-border p-4 sm:grid-cols-2">
//                                         <div>
//                                             <p className="text-xs text-muted-foreground">
//                                                 Scholarship Name
//                                             </p>
//                                             <p className="mt-1 text-sm font-medium">
//                                                 {selectedScholarship.scholarshipName}
//                                             </p>
//                                         </div>
//                                         <div>
//                                             <p className="text-xs text-muted-foreground">Type</p>
//                                             <p className="mt-1 text-sm font-medium">
//                                                 {scholarshipTypes[selectedScholarship.type]}
//                                             </p>
//                                         </div>
//                                         <div>
//                                             <p className="text-xs text-muted-foreground">Academic Session</p>
//                                             <p className="mt-1 text-sm font-medium">
//                                                 {selectedScholarship.academicSession}
//                                             </p>
//                                         </div>
//                                         <div>
//                                             <p className="text-xs text-muted-foreground">Applied Date</p>
//                                             <p className="mt-1 text-sm font-medium">
//                                                 {selectedScholarship.appliedDate}
//                                             </p>
//                                         </div>
//                                         <div>
//                                             <p className="text-xs text-muted-foreground">Start Date</p>
//                                             <p className="mt-1 text-sm font-medium">
//                                                 {selectedScholarship.startDate}
//                                             </p>
//                                         </div>
//                                         <div>
//                                             <p className="text-xs text-muted-foreground">End Date</p>
//                                             <p className="mt-1 text-sm font-medium">
//                                                 {selectedScholarship.endDate}
//                                             </p>
//                                         </div>
//                                         <div className="sm:col-span-2">
//                                             <p className="text-xs text-muted-foreground">
//                                                 Approved By
//                                             </p>
//                                             <p className="mt-1 text-sm font-medium">
//                                                 {selectedScholarship.approvedBy}
//                                             </p>
//                                         </div>
//                                         <div className="sm:col-span-2">
//                                             <p className="text-xs text-muted-foreground">Description</p>
//                                             <p className="mt-1 text-sm leading-6 text-muted-foreground">
//                                                 {selectedScholarship.description || "No description provided."}
//                                             </p>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="flex justify-end">
//                                     <button
//                                         type="button"
//                                         onClick={() => setSelectedScholarship(null)}
//                                         className="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-4 text-sm font-medium hover:bg-muted"
//                                     >
//                                         <X size={15} />
//                                         Close
//                                     </button>
//                                 </div>
//                             </div>
//                         </>
//                     )}
//                 </DialogContent>
//             </Dialog>

//             {/* Create scholarship dialog */}
//             <Dialog
//                 open={createOpen}
//                 onOpenChange={(open) => {
//                     setCreateOpen(open);
//                     if (!open) setFormError("");
//                 }}
//             >
//                 <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
//                     <DialogHeader>
//                         <DialogTitle>Add Scholarship</DialogTitle>
//                         <DialogDescription>
//                             Enter the student and proposed scholarship information.
//                             New records will start as pending.
//                         </DialogDescription>
//                     </DialogHeader>

//                     <form onSubmit={handleCreateScholarship} className="space-y-5">
//                         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                             <div className="space-y-2">
//                                 <label className="text-sm font-medium">Student ID *</label>
//                                 <input
//                                     required
//                                     value={newScholarship.studentId}
//                                     onChange={(event) =>
//                                         setNewScholarship((current) => ({
//                                             ...current,
//                                             studentId: event.target.value,
//                                         }))
//                                     }
//                                     placeholder="STU-2026-0012"
//                                     className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
//                                 />
//                             </div>

//                             <div className="space-y-2">
//                                 <label className="text-sm font-medium">Student Name *</label>
//                                 <input
//                                     required
//                                     value={newScholarship.studentName}
//                                     onChange={(event) =>
//                                         setNewScholarship((current) => ({
//                                             ...current,
//                                             studentName: event.target.value,
//                                         }))
//                                     }
//                                     placeholder="Student full name"
//                                     className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
//                                 />
//                             </div>

//                             <div className="space-y-2">
//                                 <label className="text-sm font-medium">Student Email</label>
//                                 <input
//                                     type="email"
//                                     value={newScholarship.email}
//                                     onChange={(event) =>
//                                         setNewScholarship((current) => ({
//                                             ...current,
//                                             email: event.target.value,
//                                         }))
//                                     }
//                                     placeholder="student@example.com"
//                                     className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
//                                 />
//                             </div>

//                             <div className="space-y-2">
//                                 <label className="text-sm font-medium">Program</label>
//                                 <input
//                                     value={newScholarship.program}
//                                     onChange={(event) =>
//                                         setNewScholarship((current) => ({
//                                             ...current,
//                                             program: event.target.value,
//                                         }))
//                                     }
//                                     placeholder="B.Sc. in Computer Science"
//                                     className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
//                                 />
//                             </div>

//                             <div className="space-y-2 sm:col-span-2">
//                                 <label className="text-sm font-medium">Scholarship Name *</label>
//                                 <input
//                                     required
//                                     value={newScholarship.scholarshipName}
//                                     onChange={(event) =>
//                                         setNewScholarship((current) => ({
//                                             ...current,
//                                             scholarshipName: event.target.value,
//                                         }))
//                                     }
//                                     placeholder="Academic Excellence Scholarship"
//                                     className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
//                                 />
//                             </div>

//                             <div className="space-y-2">
//                                 <label className="text-sm font-medium">Scholarship Type *</label>
//                                 <select
//                                     value={newScholarship.type}
//                                     onChange={(event) =>
//                                         setNewScholarship((current) => ({
//                                             ...current,
//                                             type: event.target.value as ScholarshipType,
//                                         }))
//                                     }
//                                     className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
//                                 >
//                                     {Object.entries(scholarshipTypes).map(([value, label]) => (
//                                         <option key={value} value={value}>
//                                             {label}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>

//                             <div className="space-y-2">
//                                 <label className="text-sm font-medium">Amount (BDT) *</label>
//                                 <input
//                                     required
//                                     type="number"
//                                     min="1"
//                                     step="0.01"
//                                     value={newScholarship.amount}
//                                     onChange={(event) =>
//                                         setNewScholarship((current) => ({
//                                             ...current,
//                                             amount: event.target.value,
//                                         }))
//                                     }
//                                     placeholder="25000"
//                                     className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
//                                 />
//                             </div>

//                             <div className="space-y-2">
//                                 <label className="text-sm font-medium">Coverage</label>
//                                 <input
//                                     value={newScholarship.coverage}
//                                     onChange={(event) =>
//                                         setNewScholarship((current) => ({
//                                             ...current,
//                                             coverage: event.target.value,
//                                         }))
//                                     }
//                                     placeholder="50% or full tuition"
//                                     className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
//                                 />
//                             </div>

//                             <div className="space-y-2">
//                                 <label className="text-sm font-medium">Academic Session *</label>
//                                 <input
//                                     required
//                                     value={newScholarship.academicSession}
//                                     onChange={(event) =>
//                                         setNewScholarship((current) => ({
//                                             ...current,
//                                             academicSession: event.target.value,
//                                         }))
//                                     }
//                                     placeholder="2026 Fall"
//                                     className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
//                                 />
//                             </div>

//                             <div className="space-y-2">
//                                 <label className="text-sm font-medium">Start Date *</label>
//                                 <input
//                                     required
//                                     type="date"
//                                     value={newScholarship.startDate}
//                                     onChange={(event) =>
//                                         setNewScholarship((current) => ({
//                                             ...current,
//                                             startDate: event.target.value,
//                                         }))
//                                     }
//                                     className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
//                                 />
//                             </div>

//                             <div className="space-y-2">
//                                 <label className="text-sm font-medium">End Date *</label>
//                                 <input
//                                     required
//                                     type="date"
//                                     value={newScholarship.endDate}
//                                     onChange={(event) =>
//                                         setNewScholarship((current) => ({
//                                             ...current,
//                                             endDate: event.target.value,
//                                         }))
//                                     }
//                                     className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
//                                 />
//                             </div>

//                             <div className="space-y-2 sm:col-span-2">
//                                 <label className="text-sm font-medium">Description</label>
//                                 <textarea
//                                     rows={3}
//                                     value={newScholarship.description}
//                                     onChange={(event) =>
//                                         setNewScholarship((current) => ({
//                                             ...current,
//                                             description: event.target.value,
//                                         }))
//                                     }
//                                     placeholder="Reason, eligibility criteria, or notes..."
//                                     className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
//                                 />
//                             </div>
//                         </div>

//                         {formError && (
//                             <p role="alert" className="text-sm font-medium text-destructive">
//                                 {formError}
//                             </p>
//                         )}

//                         <div className="flex flex-col-reverse justify-end gap-2 border-t border-border pt-4 sm:flex-row">
//                             <button
//                                 type="button"
//                                 onClick={() => setCreateOpen(false)}
//                                 className="inline-flex h-10 items-center justify-center rounded-lg border border-border px-4 text-sm font-medium hover:bg-muted"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 type="submit"
//                                 className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground hover:opacity-90"
//                             >
//                                 <Plus size={16} />
//                                 Create Scholarship
//                             </button>
//                         </div>
//                     </form>
//                 </DialogContent>
//             </Dialog>
//         </main>
//     );
// }
































"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
    Search,
    Plus,
    Download,
    GraduationCap,
    Wallet,
    CheckCircle2,
    Clock3,
    Eye,
    CalendarDays,
    ArrowUpRight,
    Filter,
    X,
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

type ScholarshipStatus =
    | "APPROVED"
    | "PENDING"
    | "REJECTED"
    | "ACTIVE"
    | "EXPIRED";

type ScholarshipType =
    | "MERIT"
    | "NEED_BASED"
    | "ACADEMIC"
    | "FINANCIAL_AID"
    | "OTHER";

type Scholarship = {
    id: string;
    studentId: string;
    studentName: string;
    email: string;
    program: string;
    scholarshipName: string;
    type: ScholarshipType;
    amount: number;
    coverage: string;
    academicSession: string;
    appliedDate: string;
    startDate: string;
    endDate: string;
    status: ScholarshipStatus;
    approvedBy: string;
    description: string;
};

type ScholarshipForm = {
    studentId: string;
    studentName: string;
    email: string;
    program: string;
    scholarshipName: string;
    type: ScholarshipType;
    amount: string;
    coverage: string;
    academicSession: string;
    startDate: string;
    endDate: string;
    description: string;
};

const initialScholarships: Scholarship[] = [
    {
        id: "SCH-2026-001",
        studentId: "STU-2026-0012",
        studentName: "Ayan Sujon",
        email: "ayan@example.com",
        program: "B.Sc. in Computer Science",
        scholarshipName: "Academic Excellence Scholarship",
        type: "MERIT",
        amount: 25000,
        coverage: "50%",
        academicSession: "2026 Spring",
        appliedDate: "2026-09-12",
        startDate: "2026-10-01",
        endDate: "2027-03-31",
        status: "ACTIVE",
        approvedBy: "Admin",
        description:
            "Scholarship awarded based on academic performance and eligibility.",
    },
    {
        id: "SCH-2026-002",
        studentId: "STU-2025-0048",
        studentName: "Nusrat Jahan",
        email: "nusrat@example.com",
        program: "BBA",
        scholarshipName: "Need-Based Financial Aid",
        type: "NEED_BASED",
        amount: 15000,
        coverage: "30%",
        academicSession: "2026 Spring",
        appliedDate: "2026-09-20",
        startDate: "2026-10-01",
        endDate: "2027-03-31",
        status: "PENDING",
        approvedBy: "Not assigned",
        description:
            "Financial assistance application awaiting eligibility review.",
    },
    {
        id: "SCH-2026-003",
        studentId: "STU-2024-0091",
        studentName: "Rahim Ahmed",
        email: "rahim@example.com",
        program: "B.Sc. in Electrical Engineering",
        scholarshipName: "Academic Merit Award",
        type: "ACADEMIC",
        amount: 20000,
        coverage: "40%",
        academicSession: "2026 Spring",
        appliedDate: "2026-08-15",
        startDate: "2026-09-01",
        endDate: "2027-02-28",
        status: "APPROVED",
        approvedBy: "Finance Admin",
        description:
            "Approved academic award. Verify the scholarship ledger posting before applying it to an invoice.",
    },
    {
        id: "SCH-2026-004",
        studentId: "STU-2025-0035",
        studentName: "Maliha Islam",
        email: "maliha@example.com",
        program: "B.Sc. in Mathematics",
        scholarshipName: "Student Financial Support",
        type: "FINANCIAL_AID",
        amount: 10000,
        coverage: "20%",
        academicSession: "2026 Spring",
        appliedDate: "2026-08-10",
        startDate: "2026-09-01",
        endDate: "2027-02-28",
        status: "REJECTED",
        approvedBy: "Finance Admin",
        description:
            "The application did not meet the required eligibility criteria.",
    },
    {
        id: "SCH-2026-005",
        studentId: "STU-2024-0066",
        studentName: "Tanvir Hasan",
        email: "tanvir@example.com",
        program: "B.Sc. in Computer Science",
        scholarshipName: "Merit Support Grant",
        type: "MERIT",
        amount: 12000,
        coverage: "25%",
        academicSession: "2025 Fall",
        appliedDate: "2025-08-12",
        startDate: "2025-09-01",
        endDate: "2026-02-28",
        status: "EXPIRED",
        approvedBy: "Finance Admin",
        description: "The scholarship period has ended.",
    },
];

const emptyScholarshipForm: ScholarshipForm = {
    studentId: "",
    studentName: "",
    email: "",
    program: "",
    scholarshipName: "",
    type: "MERIT",
    amount: "",
    coverage: "",
    academicSession: "2026 Fall",
    startDate: "",
    endDate: "",
    description: "",
};

const currency = (amount: number) =>
    new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT",
        maximumFractionDigits: 0,
    }).format(amount);

const scholarshipTypes: Record<ScholarshipType, string> = {
    MERIT: "Merit Based",
    NEED_BASED: "Need Based",
    ACADEMIC: "Academic",
    FINANCIAL_AID: "Financial Aid",
    OTHER: "Other",
};

const statusStyles: Record<ScholarshipStatus, string> = {
    ACTIVE:
        "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
    APPROVED:
        "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
    PENDING:
        "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
    REJECTED:
        "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400",
    EXPIRED: "bg-muted text-muted-foreground",
};

const inputClass =
    "h-10 w-full min-w-0 rounded-lg border border-input bg-background px-3 text-sm outline-none transition placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring";

function StatusBadge({ status }: { status: ScholarshipStatus }) {
    return (
        <span
            className={`inline-flex whitespace-nowrap items-center rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[status]}`}
        >
            {status.replace("_", " ")}
        </span>
    );
}

function SummaryCard({
    title,
    value,
    subtitle,
    icon: Icon,
    iconClass,
}: {
    title: string;
    value: string;
    subtitle: string;
    icon: React.ElementType;
    iconClass: string;
}) {
    return (
        <div className="min-w-0 rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">
            <div className="flex items-start justify-between gap-3">
                <div
                    className={`flex size-10 shrink-0 items-center justify-center rounded-xl sm:size-11 ${iconClass}`}
                >
                    <Icon size={21} />
                </div>
                <ArrowUpRight
                    size={17}
                    className="shrink-0 text-muted-foreground"
                />
            </div>

            <p className="mt-4 text-sm text-muted-foreground">{title}</p>
            <p className="mt-1 break-words text-xl font-bold tracking-tight sm:text-2xl">
                {value}
            </p>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
                {subtitle}
            </p>
        </div>
    );
}

function FormField({
    label,
    children,
    className = "",
}: {
    label: string;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={`min-w-0 space-y-2 ${className}`}>
            <label className="block text-sm font-medium">{label}</label>
            {children}
        </div>
    );
}

export default function Scholarships() {
    const [scholarships, setScholarships] =
        useState<Scholarship[]>(initialScholarships);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [typeFilter, setTypeFilter] = useState("ALL");

    const [selectedScholarship, setSelectedScholarship] =
        useState<Scholarship | null>(null);

    const [createOpen, setCreateOpen] = useState(false);
    const [newScholarship, setNewScholarship] =
        useState<ScholarshipForm>(emptyScholarshipForm);
    const [formError, setFormError] = useState("");

    const summary = useMemo(() => {
        const active = scholarships.filter(
            (item) => item.status === "ACTIVE",
        );

        const pending = scholarships.filter(
            (item) => item.status === "PENDING",
        );

        const approved = scholarships.filter(
            (item) =>
                item.status === "APPROVED" || item.status === "ACTIVE",
        );

        return {
            total: scholarships.length,
            active: active.length,
            pending: pending.length,
            approvedAmount: approved.reduce(
                (sum, item) => sum + item.amount,
                0,
            ),
        };
    }, [scholarships]);

    const filteredScholarships = useMemo(() => {
        const query = search.trim().toLowerCase();

        return scholarships.filter((item) => {
            const matchesSearch =
                !query ||
                item.studentName.toLowerCase().includes(query) ||
                item.studentId.toLowerCase().includes(query) ||
                item.id.toLowerCase().includes(query) ||
                item.scholarshipName.toLowerCase().includes(query) ||
                item.program.toLowerCase().includes(query);

            const matchesStatus =
                statusFilter === "ALL" || item.status === statusFilter;

            const matchesType =
                typeFilter === "ALL" || item.type === typeFilter;

            return matchesSearch && matchesStatus && matchesType;
        });
    }, [scholarships, search, statusFilter, typeFilter]);

    const updateFormField = <K extends keyof ScholarshipForm>(
        field: K,
        value: ScholarshipForm[K],
    ) => {
        setNewScholarship((current) => ({
            ...current,
            [field]: value,
        }));
    };

    const resetCreateForm = () => {
        setNewScholarship({ ...emptyScholarshipForm });
        setFormError("");
    };

    const handleCreateScholarship = (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();
        setFormError("");

        const amount = Number(newScholarship.amount);

        if (
            !newScholarship.studentId.trim() ||
            !newScholarship.studentName.trim() ||
            !newScholarship.scholarshipName.trim() ||
            !newScholarship.academicSession.trim() ||
            !newScholarship.startDate ||
            !newScholarship.endDate ||
            !Number.isFinite(amount) ||
            amount <= 0
        ) {
            setFormError(
                "Please fill in all required fields with valid values.",
            );
            return;
        }

        if (
            new Date(newScholarship.endDate) <
            new Date(newScholarship.startDate)
        ) {
            setFormError("End date cannot be earlier than start date.");
            return;
        }

        const record: Scholarship = {
            ...newScholarship,
            id: `SCH-${Date.now()}`,
            amount,
            coverage: newScholarship.coverage.trim() || "Not specified",
            appliedDate: new Date().toISOString().slice(0, 10),
            status: "PENDING",
            approvedBy: "Not assigned",
            email: newScholarship.email.trim() || "Not provided",
            program: newScholarship.program.trim() || "Not specified",
            description: newScholarship.description.trim(),
        };

        setScholarships((current) => [record, ...current]);
        setCreateOpen(false);
        resetCreateForm();
    };

    const exportCsv = () => {
        const headers = [
            "Scholarship ID",
            "Student",
            "Student ID",
            "Scholarship Name",
            "Type",
            "Amount",
            "Coverage",
            "Session",
            "Status",
            "Start Date",
            "End Date",
        ];

        const rows = filteredScholarships.map((item) => [
            item.id,
            item.studentName,
            item.studentId,
            item.scholarshipName,
            scholarshipTypes[item.type],
            item.amount,
            item.coverage,
            item.academicSession,
            item.status,
            item.startDate,
            item.endDate,
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
        link.download = "campusflow-scholarships.csv";
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    };

    const clearFilters = () => {
        setSearch("");
        setStatusFilter("ALL");
        setTypeFilter("ALL");
    };

    return (
        <main className="min-h-screen min-w-0 space-y-5 bg-background p-3 text-foreground sm:space-y-6 sm:p-5 lg:p-6 xl:p-8">
            {/* Page heading */}
            <header className="flex min-w-0 flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div className="min-w-0">

                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Scholarships
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                        Manage student scholarships, financial aid, tuition
                        waivers and their approval status.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-2 xl:flex xl:shrink-0">
                    <button
                        type="button"
                        onClick={exportCsv}
                        className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-border bg-card px-3 text-sm font-medium transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring xl:w-auto"
                    >
                        <Download size={16} />
                        Export CSV
                    </button>

                    <button
                        type="button"
                        onClick={() => setCreateOpen(true)}
                        className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring xl:w-auto"
                    >
                        <Plus size={17} />
                        Add Scholarship
                    </button>
                </div>
            </header>

            {/* Summary cards */}
            <section
                aria-label="Scholarship summary"
                className="grid min-w-0 grid-cols-1 gap-3 min-[480px]:grid-cols-2 xl:grid-cols-4 xl:gap-4"
            >
                <SummaryCard
                    title="Total Scholarships"
                    value={String(summary.total)}
                    subtitle="All scholarship records"
                    icon={GraduationCap}
                    iconClass="bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400"
                />

                <SummaryCard
                    title="Active Scholarships"
                    value={String(summary.active)}
                    subtitle="Currently active records"
                    icon={CheckCircle2}
                    iconClass="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                />

                <SummaryCard
                    title="Pending Applications"
                    value={String(summary.pending)}
                    subtitle="Awaiting a decision"
                    icon={Clock3}
                    iconClass="bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400"
                />

                <SummaryCard
                    title="Approved Amount"
                    value={currency(summary.approvedAmount)}
                    subtitle="Active and approved records"
                    icon={Wallet}
                    iconClass="bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-400"
                />
            </section>

            {/* Financial control notice */}
            <section className="flex min-w-0 items-start gap-3 rounded-xl border border-blue-200 bg-blue-50/70 p-3 sm:p-4 dark:border-blue-900 dark:bg-blue-950/20">
                <GraduationCap
                    className="mt-0.5 shrink-0 text-blue-700 dark:text-blue-400"
                    size={20}
                />

                <div className="min-w-0">
                    <p className="text-sm font-semibold">
                        Scholarship financial control
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        An approved scholarship is not automatically a
                        payment. Apply eligible awards to the student&apos;s
                        invoice through your authorized backend workflow,
                        with a complete audit trail.
                    </p>
                </div>
            </section>

            {/* Search and filters */}
            <section className="min-w-0 rounded-xl border border-border bg-card p-3 shadow-sm sm:p-5">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                    <Filter
                        size={17}
                        className="shrink-0 text-muted-foreground"
                    />
                    <h2 className="font-semibold">Search and filters</h2>

                    <span className="ml-auto text-xs text-muted-foreground">
                        {filteredScholarships.length} records
                    </span>
                </div>

                <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    <div className="relative min-w-0 sm:col-span-2 xl:col-span-1">
                        <Search
                            size={17}
                            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        />
                        <input
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                            placeholder="Search student, ID, scholarship..."
                            aria-label="Search scholarships"
                            className={`${inputClass} pl-9 pr-3`}
                        />
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(event) =>
                            setStatusFilter(event.target.value)
                        }
                        className={inputClass}
                        aria-label="Filter by status"
                    >
                        <option value="ALL">All statuses</option>
                        <option value="ACTIVE">Active</option>
                        <option value="APPROVED">Approved</option>
                        <option value="PENDING">Pending</option>
                        <option value="REJECTED">Rejected</option>
                        <option value="EXPIRED">Expired</option>
                    </select>

                    <select
                        value={typeFilter}
                        onChange={(event) =>
                            setTypeFilter(event.target.value)
                        }
                        className={inputClass}
                        aria-label="Filter by scholarship type"
                    >
                        <option value="ALL">All scholarship types</option>
                        {Object.entries(scholarshipTypes).map(
                            ([value, label]) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ),
                        )}
                    </select>
                </div>
            </section>

            {/* Scholarship records */}
            <section className="min-w-0 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                    <div className="min-w-0">
                        <h2 className="text-base font-semibold">
                            Scholarship Records
                        </h2>
                        <p className="mt-1 text-sm leading-5 text-muted-foreground">
                            Review student financial aid and award details.
                        </p>
                    </div>

                    <span className="w-fit shrink-0 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                        {filteredScholarships.length} results
                    </span>
                </div>

                <div className="w-full overflow-x-auto overscroll-x-contain">
                    <table className="w-full min-w-[900px] text-left text-sm">
                        <thead>
                            <tr className="border-y border-border bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                                <th className="whitespace-nowrap px-3 py-3 font-medium sm:px-5">
                                    Student
                                </th>
                                <th className="px-3 py-3 font-medium sm:px-5">
                                    Scholarship
                                </th>
                                <th className="whitespace-nowrap px-3 py-3 font-medium sm:px-5">
                                    Type
                                </th>
                                <th className="whitespace-nowrap px-3 py-3 font-medium sm:px-5">
                                    Amount
                                </th>
                                <th className="whitespace-nowrap px-3 py-3 font-medium sm:px-5">
                                    Session
                                </th>
                                <th className="whitespace-nowrap px-3 py-3 font-medium sm:px-5">
                                    Period
                                </th>
                                <th className="whitespace-nowrap px-3 py-3 font-medium sm:px-5">
                                    Status
                                </th>
                                <th className="whitespace-nowrap px-3 py-3 text-right font-medium sm:px-5">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredScholarships.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-b border-border transition last:border-0 hover:bg-muted/30"
                                >
                                    <td className="px-3 py-4 sm:px-5">
                                        <div className="flex items-center gap-3">
                                            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary sm:size-10">
                                                {item.studentName
                                                    .split(" ")
                                                    .map((part) => part[0])
                                                    .slice(0, 2)
                                                    .join("")}
                                            </div>

                                            <div className="min-w-0">
                                                <p className="break-words font-semibold">
                                                    {item.studentName}
                                                </p>
                                                <p className="mt-1 text-xs text-muted-foreground">
                                                    {item.studentId}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-3 py-4 sm:px-5">
                                        <p className="max-w-[260px] break-words font-medium">
                                            {item.scholarshipName}
                                        </p>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            {item.id}
                                        </p>
                                    </td>

                                    <td className="whitespace-nowrap px-3 py-4 text-muted-foreground sm:px-5">
                                        {scholarshipTypes[item.type]}
                                    </td>

                                    <td className="px-3 py-4 sm:px-5">
                                        <p className="whitespace-nowrap font-semibold">
                                            {currency(item.amount)}
                                        </p>
                                        <p className="mt-1 whitespace-nowrap text-xs text-muted-foreground">
                                            {item.coverage} coverage
                                        </p>
                                    </td>

                                    <td className="whitespace-nowrap px-3 py-4 text-muted-foreground sm:px-5">
                                        {item.academicSession}
                                    </td>

                                    <td className="px-3 py-4 text-muted-foreground sm:px-5">
                                        <div className="flex items-center gap-1.5 whitespace-nowrap">
                                            <CalendarDays
                                                size={14}
                                                className="shrink-0"
                                            />
                                            {item.startDate}
                                        </div>
                                        <p className="mt-1 whitespace-nowrap pl-5 text-xs">
                                            to {item.endDate}
                                        </p>
                                    </td>

                                    <td className="px-3 py-4 sm:px-5">
                                        <StatusBadge status={item.status} />
                                    </td>

                                    <td className="px-3 py-4 sm:px-5">
                                        <div className="flex justify-end">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setSelectedScholarship(item)
                                                }
                                                aria-label={`View scholarship ${item.id}`}
                                                className="inline-flex h-9 items-center gap-2 rounded-lg border border-border px-3 text-xs font-semibold transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                            >
                                                <Eye size={15} />
                                                View
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {filteredScholarships.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={8}
                                        className="px-5 py-14 text-center"
                                    >
                                        <GraduationCap
                                            size={30}
                                            className="mx-auto mb-3 text-muted-foreground"
                                        />

                                        <p className="font-semibold">
                                            No scholarships found
                                        </p>

                                        <p className="mt-1 text-sm text-muted-foreground">
                                            Try changing your search or filters.
                                        </p>

                                        <button
                                            type="button"
                                            onClick={clearFilters}
                                            className="mt-3 text-sm font-semibold text-primary hover:underline"
                                        >
                                            Clear filters
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-col gap-2 border-t border-border px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-5">
                    <p>
                        Showing {filteredScholarships.length} of{" "}
                        {scholarships.length} records
                    </p>
                    <p>CampusFlow · Finance Management</p>
                </div>
            </section>

            {/* Scholarship details dialog */}
            <Dialog
                open={Boolean(selectedScholarship)}
                onOpenChange={(open) => {
                    if (!open) setSelectedScholarship(null);
                }}
            >
                <DialogContent className="max-h-[90dvh] w-[calc(100%-1rem)] max-w-2xl overflow-y-auto overscroll-contain rounded-xl p-4 sm:w-[calc(100%-2rem)] sm:p-6">
                    {selectedScholarship && (
                        <>
                            <DialogHeader>
                                <DialogTitle>
                                    Scholarship Details
                                </DialogTitle>
                                <DialogDescription>
                                    Review scholarship eligibility, award
                                    details and financial impact.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="min-w-0 space-y-5">
                                <div className="flex min-w-0 flex-col justify-between gap-3 rounded-xl border border-border bg-muted/30 p-3 sm:flex-row sm:items-center sm:p-4">
                                    <div className="min-w-0">
                                        <p className="text-xs text-muted-foreground">
                                            Scholarship ID
                                        </p>
                                        <p className="mt-1 break-all text-sm font-semibold sm:text-base">
                                            {selectedScholarship.id}
                                        </p>
                                    </div>
                                    <div className="shrink-0">
                                        <StatusBadge
                                            status={selectedScholarship.status}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:gap-4">
                                    <div className="min-w-0 rounded-lg border border-border p-3 sm:p-4">
                                        <p className="text-xs text-muted-foreground">
                                            Scholarship Amount
                                        </p>
                                        <p className="mt-2 break-words text-lg font-bold sm:text-xl">
                                            {currency(
                                                selectedScholarship.amount,
                                            )}
                                        </p>
                                    </div>

                                    <div className="min-w-0 rounded-lg border border-border p-3 sm:p-4">
                                        <p className="text-xs text-muted-foreground">
                                            Coverage
                                        </p>
                                        <p className="mt-2 text-lg font-bold sm:text-xl">
                                            {selectedScholarship.coverage}
                                        </p>
                                    </div>
                                </div>

                                <div className="min-w-0">
                                    <h3 className="mb-3 font-semibold">
                                        Student Information
                                    </h3>

                                    <div className="grid min-w-0 grid-cols-1 gap-4 rounded-xl border border-border p-3 sm:grid-cols-2 sm:p-4">
                                        <div className="min-w-0">
                                            <p className="text-xs text-muted-foreground">
                                                Name
                                            </p>
                                            <p className="mt-1 break-words text-sm font-medium">
                                                {selectedScholarship.studentName}
                                            </p>
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-xs text-muted-foreground">
                                                Student ID
                                            </p>
                                            <p className="mt-1 break-all text-sm font-medium">
                                                {selectedScholarship.studentId}
                                            </p>
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-xs text-muted-foreground">
                                                Email
                                            </p>
                                            <p className="mt-1 break-all text-sm font-medium">
                                                {selectedScholarship.email}
                                            </p>
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-xs text-muted-foreground">
                                                Program
                                            </p>
                                            <p className="mt-1 break-words text-sm font-medium">
                                                {selectedScholarship.program}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="min-w-0">
                                    <h3 className="mb-3 font-semibold">
                                        Award Information
                                    </h3>

                                    <div className="grid min-w-0 grid-cols-1 gap-x-6 gap-y-4 rounded-xl border border-border p-3 sm:grid-cols-2 sm:p-4">
                                        <div className="min-w-0">
                                            <p className="text-xs text-muted-foreground">
                                                Scholarship Name
                                            </p>
                                            <p className="mt-1 break-words text-sm font-medium">
                                                {selectedScholarship.scholarshipName}
                                            </p>
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-xs text-muted-foreground">
                                                Type
                                            </p>
                                            <p className="mt-1 text-sm font-medium">
                                                {scholarshipTypes[selectedScholarship.type]}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-muted-foreground">
                                                Academic Session
                                            </p>
                                            <p className="mt-1 text-sm font-medium">
                                                {selectedScholarship.academicSession}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-muted-foreground">
                                                Applied Date
                                            </p>
                                            <p className="mt-1 text-sm font-medium">
                                                {selectedScholarship.appliedDate}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-muted-foreground">
                                                Start Date
                                            </p>
                                            <p className="mt-1 text-sm font-medium">
                                                {selectedScholarship.startDate}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-muted-foreground">
                                                End Date
                                            </p>
                                            <p className="mt-1 text-sm font-medium">
                                                {selectedScholarship.endDate}
                                            </p>
                                        </div>

                                        <div className="min-w-0 sm:col-span-2">
                                            <p className="text-xs text-muted-foreground">
                                                Approved By
                                            </p>
                                            <p className="mt-1 break-words text-sm font-medium">
                                                {selectedScholarship.approvedBy}
                                            </p>
                                        </div>

                                        <div className="min-w-0 sm:col-span-2">
                                            <p className="text-xs text-muted-foreground">
                                                Description
                                            </p>
                                            <p className="mt-1 break-words text-sm leading-6 text-muted-foreground">
                                                {selectedScholarship.description ||
                                                    "No description provided."}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end border-t border-border pt-4">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setSelectedScholarship(null)
                                        }
                                        className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-border px-4 text-sm font-medium transition hover:bg-muted sm:w-auto"
                                    >
                                        <X size={15} />
                                        Close
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>

            {/* Create scholarship dialog */}
            <Dialog
                open={createOpen}
                onOpenChange={(open) => {
                    setCreateOpen(open);

                    if (!open) {
                        setFormError("");
                    }
                }}
            >
                <DialogContent className="max-h-[90dvh] w-[calc(100%-1rem)] max-w-2xl overflow-y-auto overscroll-contain rounded-xl p-4 sm:w-[calc(100%-2rem)] sm:p-6">
                    <DialogHeader>
                        <DialogTitle>Add Scholarship</DialogTitle>
                        <DialogDescription>
                            Enter the student and proposed scholarship
                            information. New records will start as pending.
                        </DialogDescription>
                    </DialogHeader>

                    <form
                        onSubmit={handleCreateScholarship}
                        className="min-w-0 space-y-5"
                    >
                        <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
                            <FormField label="Student ID *">
                                <input
                                    required
                                    value={newScholarship.studentId}
                                    onChange={(event) =>
                                        updateFormField(
                                            "studentId",
                                            event.target.value,
                                        )
                                    }
                                    placeholder="STU-2026-0012"
                                    className={inputClass}
                                />
                            </FormField>

                            <FormField label="Student Name *">
                                <input
                                    required
                                    value={newScholarship.studentName}
                                    onChange={(event) =>
                                        updateFormField(
                                            "studentName",
                                            event.target.value,
                                        )
                                    }
                                    placeholder="Student full name"
                                    className={inputClass}
                                />
                            </FormField>

                            <FormField label="Student Email">
                                <input
                                    type="email"
                                    value={newScholarship.email}
                                    onChange={(event) =>
                                        updateFormField(
                                            "email",
                                            event.target.value,
                                        )
                                    }
                                    placeholder="student@example.com"
                                    className={inputClass}
                                />
                            </FormField>

                            <FormField label="Program">
                                <input
                                    value={newScholarship.program}
                                    onChange={(event) =>
                                        updateFormField(
                                            "program",
                                            event.target.value,
                                        )
                                    }
                                    placeholder="B.Sc. in Computer Science"
                                    className={inputClass}
                                />
                            </FormField>

                            <FormField
                                label="Scholarship Name *"
                                className="sm:col-span-2"
                            >
                                <input
                                    required
                                    value={newScholarship.scholarshipName}
                                    onChange={(event) =>
                                        updateFormField(
                                            "scholarshipName",
                                            event.target.value,
                                        )
                                    }
                                    placeholder="Academic Excellence Scholarship"
                                    className={inputClass}
                                />
                            </FormField>

                            <FormField label="Scholarship Type *">
                                <select
                                    value={newScholarship.type}
                                    onChange={(event) =>
                                        updateFormField(
                                            "type",
                                            event.target.value as ScholarshipType,
                                        )
                                    }
                                    className={inputClass}
                                >
                                    {Object.entries(scholarshipTypes).map(
                                        ([value, label]) => (
                                            <option
                                                key={value}
                                                value={value}
                                            >
                                                {label}
                                            </option>
                                        ),
                                    )}
                                </select>
                            </FormField>

                            <FormField label="Amount (BDT) *">
                                <input
                                    required
                                    type="number"
                                    min="1"
                                    step="0.01"
                                    value={newScholarship.amount}
                                    onChange={(event) =>
                                        updateFormField(
                                            "amount",
                                            event.target.value,
                                        )
                                    }
                                    placeholder="25000"
                                    className={inputClass}
                                />
                            </FormField>

                            <FormField label="Coverage">
                                <input
                                    value={newScholarship.coverage}
                                    onChange={(event) =>
                                        updateFormField(
                                            "coverage",
                                            event.target.value,
                                        )
                                    }
                                    placeholder="50% or full tuition"
                                    className={inputClass}
                                />
                            </FormField>

                            <FormField label="Academic Session *">
                                <input
                                    required
                                    value={newScholarship.academicSession}
                                    onChange={(event) =>
                                        updateFormField(
                                            "academicSession",
                                            event.target.value,
                                        )
                                    }
                                    placeholder="2026 Fall"
                                    className={inputClass}
                                />
                            </FormField>

                            <FormField label="Start Date *">
                                <input
                                    required
                                    type="date"
                                    value={newScholarship.startDate}
                                    onChange={(event) =>
                                        updateFormField(
                                            "startDate",
                                            event.target.value,
                                        )
                                    }
                                    className={inputClass}
                                />
                            </FormField>

                            <FormField label="End Date *">
                                <input
                                    required
                                    type="date"
                                    min={newScholarship.startDate || undefined}
                                    value={newScholarship.endDate}
                                    onChange={(event) =>
                                        updateFormField(
                                            "endDate",
                                            event.target.value,
                                        )
                                    }
                                    className={inputClass}
                                />
                            </FormField>

                            <FormField
                                label="Description"
                                className="sm:col-span-2"
                            >
                                <textarea
                                    rows={3}
                                    value={newScholarship.description}
                                    onChange={(event) =>
                                        updateFormField(
                                            "description",
                                            event.target.value,
                                        )
                                    }
                                    placeholder="Reason, eligibility criteria, or notes..."
                                    className="w-full min-w-0 resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                                />
                            </FormField>
                        </div>

                        {formError && (
                            <p
                                role="alert"
                                className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm font-medium text-destructive"
                            >
                                {formError}
                            </p>
                        )}

                        <div className="flex flex-col-reverse gap-2 border-t border-border pt-4 sm:flex-row sm:justify-end">
                            <button
                                type="button"
                                onClick={() => {
                                    setCreateOpen(false);
                                    resetCreateForm();
                                }}
                                className="inline-flex h-10 w-full items-center justify-center rounded-lg border border-border px-4 text-sm font-medium transition hover:bg-muted sm:w-auto"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-auto"
                            >
                                <Plus size={16} />
                                Create Scholarship
                            </button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </main>
    );
}
