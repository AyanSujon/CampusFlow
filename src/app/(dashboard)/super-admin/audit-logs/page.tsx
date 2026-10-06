// "use client";

// import React, { useMemo, useState } from "react";
// import {
//   Activity,
//   CalendarDays,
//   ChevronDown,
//   Clock3,
//   Eye,
//   FileText,
//   Globe,
//   Laptop,
//   RefreshCw,
//   Search,
//   ShieldCheck,
//   User,
//   X,
// } from "lucide-react";

// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// type AuditAction =
//   | "CREATE"
//   | "UPDATE"
//   | "DELETE"
//   | "LOGIN"
//   | "LOGOUT"
//   | "PUBLISH"
//   | "APPROVE"
//   | "REJECT";

// type AuditLog = {
//   id: string;
//   actor: {
//     name: string;
//     email: string;
//     role: string;
//   };
//   action: AuditAction;
//   entity: string;
//   entityId: string;
//   description: string;
//   oldValue?: Record<string, unknown> | null;
//   newValue?: Record<string, unknown> | null;
//   ipAddress: string;
//   device: string;
//   createdAt: string;
// };

// const auditLogs: AuditLog[] = [
//   {
//     id: "AUD-1001",
//     actor: {
//       name: "Admin User",
//       email: "admin@campusflow.edu",
//       role: "ADMIN",
//     },
//     action: "CREATE",
//     entity: "Student",
//     entityId: "STU-2026-CSE-0001",
//     description: "Created a new student profile",
//     oldValue: null,
//     newValue: {
//       studentId: "STU-2026-CSE-0001",
//       academicStatus: "ACTIVE",
//       currentSemesterNo: 1,
//     },
//     ipAddress: "103.92.44.21",
//     device: "Chrome / Windows",
//     createdAt: "2026-10-06T10:20:00",
//   },
//   {
//     id: "AUD-1002",
//     actor: {
//       name: "Ayan Sujon",
//       email: "ayan@campusflow.edu",
//       role: "SUPER_ADMIN",
//     },
//     action: "UPDATE",
//     entity: "Faculty",
//     entityId: "FAC-001",
//     description: "Updated faculty information",
//     oldValue: {
//       name: "Faculty of Business",
//       isActive: false,
//     },
//     newValue: {
//       name: "Faculty of Business Administration",
//       isActive: true,
//     },
//     ipAddress: "103.92.45.18",
//     device: "Chrome / Windows",
//     createdAt: "2026-10-06T09:45:00",
//   },
//   {
//     id: "AUD-1003",
//     actor: {
//       name: "Finance Admin",
//       email: "finance@campusflow.edu",
//       role: "ACCOUNTANT",
//     },
//     action: "APPROVE",
//     entity: "Payment",
//     entityId: "PAY-2026-0092",
//     description: "Approved a student payment",
//     oldValue: {
//       status: "PENDING",
//     },
//     newValue: {
//       status: "PAID",
//     },
//     ipAddress: "103.92.41.12",
//     device: "Edge / Windows",
//     createdAt: "2026-10-06T08:32:00",
//   },
//   {
//     id: "AUD-1004",
//     actor: {
//       name: "System Admin",
//       email: "admin@campusflow.edu",
//       role: "SUPER_ADMIN",
//     },
//     action: "DELETE",
//     entity: "Department",
//     entityId: "DEPT-004",
//     description: "Deleted a department",
//     oldValue: {
//       code: "MAT",
//       name: "Mathematics",
//       isActive: true,
//     },
//     newValue: null,
//     ipAddress: "103.92.43.77",
//     device: "Chrome / macOS",
//     createdAt: "2026-10-05T17:15:00",
//   },
//   {
//     id: "AUD-1005",
//     actor: {
//       name: "Instructor User",
//       email: "instructor@campusflow.edu",
//       role: "INSTRUCTOR",
//     },
//     action: "PUBLISH",
//     entity: "Grades",
//     entityId: "GRD-2026-101",
//     description: "Published semester grades",
//     oldValue: {
//       status: "DRAFT",
//     },
//     newValue: {
//       status: "PUBLISHED",
//     },
//     ipAddress: "103.92.42.11",
//     device: "Firefox / Linux",
//     createdAt: "2026-10-05T15:40:00",
//   },
//   {
//     id: "AUD-1006",
//     actor: {
//       name: "Student User",
//       email: "student@campusflow.edu",
//       role: "STUDENT",
//     },
//     action: "LOGIN",
//     entity: "Authentication",
//     entityId: "USR-0091",
//     description: "Successfully logged into the system",
//     oldValue: null,
//     newValue: {
//       method: "EMAIL_PASSWORD",
//     },
//     ipAddress: "103.92.48.92",
//     device: "Chrome / Android",
//     createdAt: "2026-10-05T12:18:00",
//   },
//   {
//     id: "AUD-1007",
//     actor: {
//       name: "Admin User",
//       email: "admin@campusflow.edu",
//       role: "ADMIN",
//     },
//     action: "REJECT",
//     entity: "Instructor",
//     entityId: "INS-0032",
//     description: "Rejected instructor verification",
//     oldValue: {
//       verificationStatus: "PENDING",
//     },
//     newValue: {
//       verificationStatus: "REJECTED",
//     },
//     ipAddress: "103.92.44.21",
//     device: "Chrome / Windows",
//     createdAt: "2026-10-05T10:05:00",
//   },
//   {
//     id: "AUD-1008",
//     actor: {
//       name: "Ayan Sujon",
//       email: "ayan@campusflow.edu",
//       role: "SUPER_ADMIN",
//     },
//     action: "UPDATE",
//     entity: "User",
//     entityId: "USR-0021",
//     description: "Updated user account permissions",
//     oldValue: {
//       role: "ADMIN",
//       isActive: true,
//     },
//     newValue: {
//       role: "ACCOUNTANT",
//       isActive: true,
//     },
//     ipAddress: "103.92.45.18",
//     device: "Chrome / Windows",
//     createdAt: "2026-10-04T16:25:00",
//   },
// ];

// const actionStyles: Record<AuditAction, string> = {
//   CREATE:
//     "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
//   UPDATE:
//     "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
//   DELETE:
//     "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
//   LOGIN:
//     "bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400",
//   LOGOUT:
//     "bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400",
//   PUBLISH:
//     "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
//   APPROVE:
//     "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
//   REJECT:
//     "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400",
// };

// function formatDate(date: string) {
//   return new Intl.DateTimeFormat("en-US", {
//     dateStyle: "medium",
//     timeStyle: "short",
//   }).format(new Date(date));
// }

// function formatJson(value?: Record<string, unknown> | null) {
//   if (!value) return "No data";

//   return JSON.stringify(value, null, 2);
// }

// export default function AuditLogs() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [action, setAction] = useState("ALL");
//   const [entity, setEntity] = useState("ALL");
//   const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

//   const entities = useMemo(() => {
//     return ["ALL", ...Array.from(new Set(auditLogs.map((log) => log.entity)))];
//   }, []);

//   const filteredLogs = useMemo(() => {
//     const search = searchTerm.trim().toLowerCase();

//     return auditLogs.filter((log) => {
//       const matchesSearch =
//         !search ||
//         log.id.toLowerCase().includes(search) ||
//         log.actor.name.toLowerCase().includes(search) ||
//         log.actor.email.toLowerCase().includes(search) ||
//         log.entity.toLowerCase().includes(search) ||
//         log.entityId.toLowerCase().includes(search) ||
//         log.description.toLowerCase().includes(search);

//       const matchesAction = action === "ALL" || log.action === action;
//       const matchesEntity = entity === "ALL" || log.entity === entity;

//       return matchesSearch && matchesAction && matchesEntity;
//     });
//   }, [searchTerm, action, entity]);

//   const clearFilters = () => {
//     setSearchTerm("");
//     setAction("ALL");
//     setEntity("ALL");
//   };

//   const hasFilters =
//     searchTerm.trim() !== "" || action !== "ALL" || entity !== "ALL";

//   return (
//     <div className="w-full space-y-6">
//       {/* Header */}
//       <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
//         <div>
//           <div className="flex items-center gap-2">
//             <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
//               <ShieldCheck className="size-5" />
//             </div>

//             <div>
//               <h1 className="text-2xl font-bold tracking-tight">
//                 Audit Logs
//               </h1>
//               <p className="text-sm text-muted-foreground">
//                 Monitor system activity, security events, and administrative
//                 changes.
//               </p>
//             </div>
//           </div>
//         </div>

//         <Button
//           variant="outline"
//           onClick={() => window.location.reload()}
//           className="w-full sm:w-auto"
//         >
//           <RefreshCw className="mr-2 size-4" />
//           Refresh
//         </Button>
//       </div>

//       {/* Summary cards */}
//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
//         <div className="rounded-xl border bg-card p-4 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-muted-foreground">Total Events</p>
//               <p className="mt-1 text-2xl font-bold">{auditLogs.length}</p>
//             </div>

//             <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
//               <Activity className="size-5" />
//             </div>
//           </div>
//         </div>

//         <div className="rounded-xl border bg-card p-4 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-muted-foreground">Updates</p>
//               <p className="mt-1 text-2xl font-bold">
//                 {auditLogs.filter((log) => log.action === "UPDATE").length}
//               </p>
//             </div>

//             <div className="rounded-lg bg-blue-100 p-2.5 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
//               <FileText className="size-5" />
//             </div>
//           </div>
//         </div>

//         <div className="rounded-xl border bg-card p-4 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-muted-foreground">Security Events</p>
//               <p className="mt-1 text-2xl font-bold">
//                 {
//                   auditLogs.filter(
//                     (log) =>
//                       log.action === "LOGIN" || log.action === "LOGOUT",
//                   ).length
//                 }
//               </p>
//             </div>

//             <div className="rounded-lg bg-violet-100 p-2.5 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
//               <ShieldCheck className="size-5" />
//             </div>
//           </div>
//         </div>

//         <div className="rounded-xl border bg-card p-4 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-muted-foreground">Deleted</p>
//               <p className="mt-1 text-2xl font-bold">
//                 {auditLogs.filter((log) => log.action === "DELETE").length}
//               </p>
//             </div>

//             <div className="rounded-lg bg-red-100 p-2.5 text-red-600 dark:bg-red-500/10 dark:text-red-400">
//               <Activity className="size-5" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="rounded-xl border bg-card p-4 shadow-sm">
//         <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
//           <div className="relative w-full xl:flex-1">
//             <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

//             <Input
//               value={searchTerm}
//               onChange={(event) => setSearchTerm(event.target.value)}
//               placeholder="Search by user, action, entity, ID..."
//               className="pl-9"
//             />
//           </div>

//           <div className="relative w-full xl:w-48">
//             <select
//               value={action}
//               onChange={(event) => setAction(event.target.value)}
//               className="h-10 w-full appearance-none rounded-md border bg-background px-3 pr-9 text-sm outline-none focus:ring-2 focus:ring-ring"
//             >
//               <option value="ALL">All Actions</option>
//               <option value="CREATE">Create</option>
//               <option value="UPDATE">Update</option>
//               <option value="DELETE">Delete</option>
//               <option value="LOGIN">Login</option>
//               <option value="LOGOUT">Logout</option>
//               <option value="PUBLISH">Publish</option>
//               <option value="APPROVE">Approve</option>
//               <option value="REJECT">Reject</option>
//             </select>

//             <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
//           </div>

//           <div className="relative w-full xl:w-48">
//             <select
//               value={entity}
//               onChange={(event) => setEntity(event.target.value)}
//               className="h-10 w-full appearance-none rounded-md border bg-background px-3 pr-9 text-sm outline-none focus:ring-2 focus:ring-ring"
//             >
//               {entities.map((item) => (
//                 <option key={item} value={item}>
//                   {item === "ALL" ? "All Entities" : item}
//                 </option>
//               ))}
//             </select>

//             <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
//           </div>

//           {hasFilters && (
//             <Button
//               variant="ghost"
//               onClick={clearFilters}
//               className="w-full xl:w-auto"
//             >
//               <X className="mr-2 size-4" />
//               Clear
//             </Button>
//           )}
//         </div>
//       </div>

//       {/* Results */}
//       <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
//         <div className="flex flex-col gap-2 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h2 className="font-semibold">Activity History</h2>
//             <p className="text-sm text-muted-foreground">
//               {filteredLogs.length} event
//               {filteredLogs.length !== 1 ? "s" : ""} found
//             </p>
//           </div>

//           <div className="flex items-center gap-2 text-sm text-muted-foreground">
//             <Clock3 className="size-4" />
//             Latest activity first
//           </div>
//         </div>

//         {/* Desktop table */}
//         <div className="hidden overflow-x-auto lg:block">
//           <table className="w-full min-w-[1100px]">
//             <thead>
//               <tr className="border-b bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
//                 <th className="px-5 py-3 font-medium">Actor</th>
//                 <th className="px-5 py-3 font-medium">Action</th>
//                 <th className="px-5 py-3 font-medium">Target</th>
//                 <th className="px-5 py-3 font-medium">Description</th>
//                 <th className="px-5 py-3 font-medium">IP / Device</th>
//                 <th className="px-5 py-3 font-medium">Time</th>
//                 <th className="px-5 py-3 text-right font-medium">Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {filteredLogs.length > 0 ? (
//                 filteredLogs.map((log) => (
//                   <tr
//                     key={log.id}
//                     className="border-b last:border-0 hover:bg-muted/30"
//                   >
//                     <td className="px-5 py-4">
//                       <div className="flex items-center gap-3">
//                         <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
//                           <User className="size-4" />
//                         </div>

//                         <div className="min-w-0">
//                           <p className="truncate text-sm font-medium">
//                             {log.actor.name}
//                           </p>
//                           <p className="truncate text-xs text-muted-foreground">
//                             {log.actor.role}
//                           </p>
//                         </div>
//                       </div>
//                     </td>

//                     <td className="px-5 py-4">
//                       <span
//                         className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${actionStyles[log.action]}`}
//                       >
//                         {log.action}
//                       </span>
//                     </td>

//                     <td className="px-5 py-4">
//                       <p className="text-sm font-medium">{log.entity}</p>
//                       <p className="font-mono text-xs text-muted-foreground">
//                         {log.entityId}
//                       </p>
//                     </td>

//                     <td className="max-w-[280px] px-5 py-4">
//                       <p className="truncate text-sm">{log.description}</p>
//                     </td>

//                     <td className="px-5 py-4">
//                       <div className="flex items-center gap-2">
//                         <Globe className="size-3.5 text-muted-foreground" />
//                         <div>
//                           <p className="font-mono text-xs">
//                             {log.ipAddress}
//                           </p>
//                           <p className="text-xs text-muted-foreground">
//                             {log.device}
//                           </p>
//                         </div>
//                       </div>
//                     </td>

//                     <td className="whitespace-nowrap px-5 py-4 text-sm text-muted-foreground">
//                       {formatDate(log.createdAt)}
//                     </td>

//                     <td className="px-5 py-4 text-right">
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => setSelectedLog(log)}
//                       >
//                         <Eye className="mr-2 size-4" />
//                         Details
//                       </Button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={7} className="px-5 py-16 text-center">
//                     <div className="mx-auto flex max-w-sm flex-col items-center">
//                       <div className="mb-3 rounded-full bg-muted p-3">
//                         <Search className="size-5 text-muted-foreground" />
//                       </div>

//                       <h3 className="font-semibold">No audit logs found</h3>
//                       <p className="mt-1 text-sm text-muted-foreground">
//                         Try changing your search or filter criteria.
//                       </p>
//                     </div>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Mobile / tablet cards */}
//         <div className="divide-y lg:hidden">
//           {filteredLogs.length > 0 ? (
//             filteredLogs.map((log) => (
//               <div key={log.id} className="space-y-4 p-4">
//                 <div className="flex items-start justify-between gap-3">
//                   <div className="flex min-w-0 items-center gap-3">
//                     <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
//                       <User className="size-4" />
//                     </div>

//                     <div className="min-w-0">
//                       <p className="truncate text-sm font-semibold">
//                         {log.actor.name}
//                       </p>
//                       <p className="truncate text-xs text-muted-foreground">
//                         {log.actor.email}
//                       </p>
//                     </div>
//                   </div>

//                   <span
//                     className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${actionStyles[log.action]}`}
//                   >
//                     {log.action}
//                   </span>
//                 </div>

//                 <div>
//                   <p className="text-sm font-medium">{log.description}</p>

//                   <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
//                     <span className="rounded-md bg-muted px-2 py-1">
//                       {log.entity}
//                     </span>

//                     <span className="rounded-md bg-muted px-2 py-1 font-mono">
//                       {log.entityId}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 gap-2 text-xs text-muted-foreground sm:grid-cols-2">
//                   <div className="flex items-center gap-2">
//                     <Globe className="size-3.5" />
//                     {log.ipAddress}
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <Laptop className="size-3.5" />
//                     {log.device}
//                   </div>

//                   <div className="flex items-center gap-2 sm:col-span-2">
//                     <CalendarDays className="size-3.5" />
//                     {formatDate(log.createdAt)}
//                   </div>
//                 </div>

//                 <Button
//                   variant="outline"
//                   size="sm"
//                   className="w-full"
//                   onClick={() => setSelectedLog(log)}
//                 >
//                   <Eye className="mr-2 size-4" />
//                   View Details
//                 </Button>
//               </div>
//             ))
//           ) : (
//             <div className="px-5 py-16 text-center">
//               <div className="mx-auto flex max-w-sm flex-col items-center">
//                 <div className="mb-3 rounded-full bg-muted p-3">
//                   <Search className="size-5 text-muted-foreground" />
//                 </div>

//                 <h3 className="font-semibold">No audit logs found</h3>
//                 <p className="mt-1 text-sm text-muted-foreground">
//                   Try changing your search or filter criteria.
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Details Dialog */}
//       <Dialog
//         open={!!selectedLog}
//         onOpenChange={(open) => {
//           if (!open) setSelectedLog(null);
//         }}
//       >
//         <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
//           {selectedLog && (
//             <>
//               <DialogHeader>
//                 <DialogTitle className="flex items-center gap-2">
//                   <ShieldCheck className="size-5 text-primary" />
//                   Audit Log Details
//                 </DialogTitle>
//               </DialogHeader>

//               <div className="space-y-6">
//                 {/* Basic info */}
//                 <div className="grid grid-cols-1 gap-4 rounded-xl border bg-muted/20 p-4 sm:grid-cols-2">
//                   <div>
//                     <p className="text-xs text-muted-foreground">Log ID</p>
//                     <p className="mt-1 font-mono text-sm font-medium">
//                       {selectedLog.id}
//                     </p>
//                   </div>

//                   <div>
//                     <p className="text-xs text-muted-foreground">Action</p>
//                     <span
//                       className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${actionStyles[selectedLog.action]}`}
//                     >
//                       {selectedLog.action}
//                     </span>
//                   </div>

//                   <div>
//                     <p className="text-xs text-muted-foreground">Actor</p>
//                     <p className="mt-1 text-sm font-medium">
//                       {selectedLog.actor.name}
//                     </p>
//                     <p className="text-xs text-muted-foreground">
//                       {selectedLog.actor.email}
//                     </p>
//                   </div>

//                   <div>
//                     <p className="text-xs text-muted-foreground">Role</p>
//                     <p className="mt-1 text-sm font-medium">
//                       {selectedLog.actor.role}
//                     </p>
//                   </div>

//                   <div>
//                     <p className="text-xs text-muted-foreground">
//                       Target Entity
//                     </p>
//                     <p className="mt-1 text-sm font-medium">
//                       {selectedLog.entity}
//                     </p>
//                   </div>

//                   <div>
//                     <p className="text-xs text-muted-foreground">Entity ID</p>
//                     <p className="mt-1 font-mono text-sm font-medium">
//                       {selectedLog.entityId}
//                     </p>
//                   </div>

//                   <div>
//                     <p className="text-xs text-muted-foreground">
//                       IP Address
//                     </p>
//                     <p className="mt-1 font-mono text-sm">
//                       {selectedLog.ipAddress}
//                     </p>
//                   </div>

//                   <div>
//                     <p className="text-xs text-muted-foreground">Device</p>
//                     <p className="mt-1 text-sm">{selectedLog.device}</p>
//                   </div>

//                   <div className="sm:col-span-2">
//                     <p className="text-xs text-muted-foreground">
//                       Timestamp
//                     </p>
//                     <p className="mt-1 text-sm">
//                       {formatDate(selectedLog.createdAt)}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Description */}
//                 <div>
//                   <h3 className="mb-2 text-sm font-semibold">Description</h3>
//                   <div className="rounded-lg border bg-background p-3 text-sm">
//                     {selectedLog.description}
//                   </div>
//                 </div>

//                 {/* Old / New values */}
//                 <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//                   <div>
//                     <h3 className="mb-2 text-sm font-semibold">
//                       Old Values
//                     </h3>

//                     <pre className="max-h-72 overflow-auto rounded-lg border bg-muted/30 p-4 text-xs leading-5">
//                       {formatJson(selectedLog.oldValue)}
//                     </pre>
//                   </div>

//                   <div>
//                     <h3 className="mb-2 text-sm font-semibold">
//                       New Values
//                     </h3>

//                     <pre className="max-h-72 overflow-auto rounded-lg border bg-muted/30 p-4 text-xs leading-5">
//                       {formatJson(selectedLog.newValue)}
//                     </pre>
//                   </div>
//                 </div>
//               </div>
//             </>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }


































"use client";

import React, { useMemo, useState } from "react";
import {
  Activity,
  CalendarDays,
  ChevronDown,
  Clock3,
  Eye,
  FileText,
  Globe,
  Laptop,
  RefreshCw,
  Search,
  ShieldCheck,
  User,
  X,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type AuditAction =
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "LOGIN"
  | "LOGOUT"
  | "PUBLISH"
  | "APPROVE"
  | "REJECT";

type AuditLog = {
  id: string;
  actor: {
    name: string;
    email: string;
    role: string;
  };
  action: AuditAction;
  entity: string;
  entityId: string;
  description: string;
  oldValue?: Record<string, unknown> | null;
  newValue?: Record<string, unknown> | null;
  ipAddress: string;
  device: string;
  createdAt: string;
};

const auditLogs: AuditLog[] = [
  {
    id: "AUD-1001",
    actor: {
      name: "Admin User",
      email: "admin@campusflow.edu",
      role: "ADMIN",
    },
    action: "CREATE",
    entity: "Student",
    entityId: "STU-2026-CSE-0001",
    description: "Created a new student profile",
    oldValue: null,
    newValue: {
      studentId: "STU-2026-CSE-0001",
      academicStatus: "ACTIVE",
      currentSemesterNo: 1,
    },
    ipAddress: "103.92.44.21",
    device: "Chrome / Windows",
    createdAt: "2026-10-06T10:20:00",
  },
  {
    id: "AUD-1002",
    actor: {
      name: "Ayan Sujon",
      email: "ayan@campusflow.edu",
      role: "SUPER_ADMIN",
    },
    action: "UPDATE",
    entity: "Faculty",
    entityId: "FAC-001",
    description: "Updated faculty information",
    oldValue: {
      name: "Faculty of Business",
      isActive: false,
    },
    newValue: {
      name: "Faculty of Business Administration",
      isActive: true,
    },
    ipAddress: "103.92.45.18",
    device: "Chrome / Windows",
    createdAt: "2026-10-06T09:45:00",
  },
  {
    id: "AUD-1003",
    actor: {
      name: "Finance Admin",
      email: "finance@campusflow.edu",
      role: "ACCOUNTANT",
    },
    action: "APPROVE",
    entity: "Payment",
    entityId: "PAY-2026-0092",
    description: "Approved a student payment",
    oldValue: {
      status: "PENDING",
    },
    newValue: {
      status: "PAID",
    },
    ipAddress: "103.92.41.12",
    device: "Edge / Windows",
    createdAt: "2026-10-06T08:32:00",
  },
  {
    id: "AUD-1004",
    actor: {
      name: "System Admin",
      email: "admin@campusflow.edu",
      role: "SUPER_ADMIN",
    },
    action: "DELETE",
    entity: "Department",
    entityId: "DEPT-004",
    description: "Deleted a department",
    oldValue: {
      code: "MAT",
      name: "Mathematics",
      isActive: true,
    },
    newValue: null,
    ipAddress: "103.92.43.77",
    device: "Chrome / macOS",
    createdAt: "2026-10-05T17:15:00",
  },
  {
    id: "AUD-1005",
    actor: {
      name: "Instructor User",
      email: "instructor@campusflow.edu",
      role: "INSTRUCTOR",
    },
    action: "PUBLISH",
    entity: "Grades",
    entityId: "GRD-2026-101",
    description: "Published semester grades",
    oldValue: {
      status: "DRAFT",
    },
    newValue: {
      status: "PUBLISHED",
    },
    ipAddress: "103.92.42.11",
    device: "Firefox / Linux",
    createdAt: "2026-10-05T15:40:00",
  },
  {
    id: "AUD-1006",
    actor: {
      name: "Student User",
      email: "student@campusflow.edu",
      role: "STUDENT",
    },
    action: "LOGIN",
    entity: "Authentication",
    entityId: "USR-0091",
    description: "Successfully logged into the system",
    oldValue: null,
    newValue: {
      method: "EMAIL_PASSWORD",
    },
    ipAddress: "103.92.48.92",
    device: "Chrome / Android",
    createdAt: "2026-10-05T12:18:00",
  },
  {
    id: "AUD-1007",
    actor: {
      name: "Admin User",
      email: "admin@campusflow.edu",
      role: "ADMIN",
    },
    action: "REJECT",
    entity: "Instructor",
    entityId: "INS-0032",
    description: "Rejected instructor verification",
    oldValue: {
      verificationStatus: "PENDING",
    },
    newValue: {
      verificationStatus: "REJECTED",
    },
    ipAddress: "103.92.44.21",
    device: "Chrome / Windows",
    createdAt: "2026-10-05T10:05:00",
  },
  {
    id: "AUD-1008",
    actor: {
      name: "Ayan Sujon",
      email: "ayan@campusflow.edu",
      role: "SUPER_ADMIN",
    },
    action: "UPDATE",
    entity: "User",
    entityId: "USR-0021",
    description: "Updated user account permissions",
    oldValue: {
      role: "ADMIN",
      isActive: true,
    },
    newValue: {
      role: "ACCOUNTANT",
      isActive: true,
    },
    ipAddress: "103.92.45.18",
    device: "Chrome / Windows",
    createdAt: "2026-10-04T16:25:00",
  },
];

const actionStyles: Record<AuditAction, string> = {
  CREATE:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  UPDATE:
    "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  DELETE:
    "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
  LOGIN:
    "bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400",
  LOGOUT:
    "bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400",
  PUBLISH:
    "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  APPROVE:
    "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
  REJECT:
    "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400",
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

function formatJson(value?: Record<string, unknown> | null) {
  if (!value) return "No data";

  return JSON.stringify(value, null, 2);
}

export default function AuditLogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [action, setAction] = useState("ALL");
  const [entity, setEntity] = useState("ALL");
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  const entities = useMemo(() => {
    return ["ALL", ...Array.from(new Set(auditLogs.map((log) => log.entity)))];
  }, []);

  const filteredLogs = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return auditLogs.filter((log) => {
      const matchesSearch =
        !search ||
        log.id.toLowerCase().includes(search) ||
        log.actor.name.toLowerCase().includes(search) ||
        log.actor.email.toLowerCase().includes(search) ||
        log.entity.toLowerCase().includes(search) ||
        log.entityId.toLowerCase().includes(search) ||
        log.description.toLowerCase().includes(search);

      const matchesAction = action === "ALL" || log.action === action;
      const matchesEntity = entity === "ALL" || log.entity === entity;

      return matchesSearch && matchesAction && matchesEntity;
    });
  }, [searchTerm, action, entity]);

  const clearFilters = () => {
    setSearchTerm("");
    setAction("ALL");
    setEntity("ALL");
  };

  const hasFilters =
    searchTerm.trim() !== "" || action !== "ALL" || entity !== "ALL";

  return (
    <div className="w-full min-w-0 space-y-6 p-3">
      {/* Header */}
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ShieldCheck className="size-5" />
          </div>

          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight">
              Audit Logs
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Monitor system activity, security events, and administrative
              changes.
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={() => window.location.reload()}
          className="w-full shrink-0 sm:w-auto"
        >
          <RefreshCw className="mr-2 size-4" />
          Refresh
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">Total Events</p>
              <p className="mt-1 text-2xl font-bold">{auditLogs.length}</p>
            </div>

            <div className="shrink-0 rounded-lg bg-primary/10 p-2.5 text-primary">
              <Activity className="size-5" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">Updates</p>
              <p className="mt-1 text-2xl font-bold">
                {auditLogs.filter((log) => log.action === "UPDATE").length}
              </p>
            </div>

            <div className="shrink-0 rounded-lg bg-blue-100 p-2.5 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <FileText className="size-5" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">
                Security Events
              </p>

              <p className="mt-1 text-2xl font-bold">
                {
                  auditLogs.filter(
                    (log) =>
                      log.action === "LOGIN" || log.action === "LOGOUT",
                  ).length
                }
              </p>
            </div>

            <div className="shrink-0 rounded-lg bg-violet-100 p-2.5 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
              <ShieldCheck className="size-5" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">Deleted</p>

              <p className="mt-1 text-2xl font-bold">
                {auditLogs.filter((log) => log.action === "DELETE").length}
              </p>
            </div>

            <div className="shrink-0 rounded-lg bg-red-100 p-2.5 text-red-600 dark:bg-red-500/10 dark:text-red-400">
              <Activity className="size-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-xl border bg-card p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_190px_190px_auto] lg:items-center">
          {/* Search */}
          <div className="relative min-w-0">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by user, action, entity, ID..."
              className="w-full pl-9"
            />
          </div>

          {/* Action */}
          <div className="relative min-w-0">
            <select
              value={action}
              onChange={(event) => setAction(event.target.value)}
              className="h-10 w-full appearance-none rounded-md border bg-background px-3 pr-9 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="ALL">All Actions</option>
              <option value="CREATE">Create</option>
              <option value="UPDATE">Update</option>
              <option value="DELETE">Delete</option>
              <option value="LOGIN">Login</option>
              <option value="LOGOUT">Logout</option>
              <option value="PUBLISH">Publish</option>
              <option value="APPROVE">Approve</option>
              <option value="REJECT">Reject</option>
            </select>

            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          </div>

          {/* Entity */}
          <div className="relative min-w-0">
            <select
              value={entity}
              onChange={(event) => setEntity(event.target.value)}
              className="h-10 w-full appearance-none rounded-md border bg-background px-3 pr-9 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              {entities.map((item) => (
                <option key={item} value={item}>
                  {item === "ALL" ? "All Entities" : item}
                </option>
              ))}
            </select>

            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          </div>

          {/* Clear */}
          {hasFilters ? (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="w-full lg:w-auto"
            >
              <X className="mr-2 size-4" />
              Clear
            </Button>
          ) : (
            <div className="hidden lg:block" />
          )}
        </div>
      </div>

      {/* Activity History */}
      <div className="min-w-0 overflow-hidden rounded-xl border bg-card shadow-sm">
        {/* Table header */}
        <div className="flex flex-col gap-3 border-b p-4 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <h2 className="font-semibold">Activity History</h2>

            <p className="text-sm text-muted-foreground">
              {filteredLogs.length} event
              {filteredLogs.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2 text-sm text-muted-foreground">
            <Clock3 className="size-4" />
            Latest activity first
          </div>
        </div>

        {/* Desktop table */}
        <div className="hidden w-full overflow-x-auto lg:block">
          <table className="w-full table-fixed">
            <colgroup>
              <col className="w-[18%]" />
              <col className="w-[9%]" />
              <col className="w-[15%]" />
              <col className="w-[21%]" />
              <col className="w-[14%]" />
              <col className="w-[15%]" />
              <col className="w-[8%]" />
            </colgroup>

            <thead>
              <tr className="border-b bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3 font-medium">Actor</th>
                <th className="px-4 py-3 font-medium">Action</th>
                <th className="px-4 py-3 font-medium">Target</th>
                <th className="px-4 py-3 font-medium">Description</th>
                <th className="px-4 py-3 font-medium">IP / Device</th>
                <th className="px-4 py-3 font-medium">Time</th>
                <th className="px-4 py-3 text-right font-medium">View</th>
              </tr>
            </thead>

            <tbody>
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <tr
                    key={log.id}
                    className="border-b transition-colors last:border-0 hover:bg-muted/30"
                  >
                    {/* Actor */}
                    <td className="max-w-0 px-4 py-4">
                      <div className="flex min-w-0 items-center gap-2.5">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <User className="size-4" />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">
                            {log.actor.name}
                          </p>

                          <p className="truncate text-xs text-muted-foreground">
                            {log.actor.role}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Action */}
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex max-w-full rounded-full px-2 py-1 text-[11px] font-semibold ${actionStyles[log.action]}`}
                      >
                        {log.action}
                      </span>
                    </td>

                    {/* Target */}
                    <td className="max-w-0 px-4 py-4">
                      <p className="truncate text-sm font-medium">
                        {log.entity}
                      </p>

                      <p className="truncate font-mono text-[11px] text-muted-foreground">
                        {log.entityId}
                      </p>
                    </td>

                    {/* Description */}
                    <td className="max-w-0 px-4 py-4">
                      <p
                        className="truncate text-sm"
                        title={log.description}
                      >
                        {log.description}
                      </p>
                    </td>

                    {/* IP / Device */}
                    <td className="max-w-0 px-4 py-4">
                      <div className="flex min-w-0 items-center gap-2">
                        <Globe className="size-3.5 shrink-0 text-muted-foreground" />

                        <div className="min-w-0">
                          <p className="truncate font-mono text-xs">
                            {log.ipAddress}
                          </p>

                          <p className="truncate text-xs text-muted-foreground">
                            {log.device}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Time */}
                    <td className="px-4 py-4">
                      <p
                        className="truncate text-xs text-muted-foreground"
                        title={formatDate(log.createdAt)}
                      >
                        {formatDate(log.createdAt)}
                      </p>
                    </td>

                    {/* View */}
                    <td className="px-4 py-4 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedLog(log)}
                        title="View details"
                        className="size-8"
                      >
                        <Eye className="size-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-5 py-16 text-center">
                    <div className="mx-auto flex max-w-sm flex-col items-center">
                      <div className="mb-3 rounded-full bg-muted p-3">
                        <Search className="size-5 text-muted-foreground" />
                      </div>

                      <h3 className="font-semibold">
                        No audit logs found
                      </h3>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Try changing your search or filter criteria.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile / Tablet */}
        <div className="divide-y lg:hidden">
          {filteredLogs.length > 0 ? (
            filteredLogs.map((log) => (
              <div key={log.id} className="space-y-4 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <User className="size-4" />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {log.actor.name}
                      </p>

                      <p className="truncate text-xs text-muted-foreground">
                        {log.actor.email}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${actionStyles[log.action]}`}
                  >
                    {log.action}
                  </span>
                </div>

                <div>
                  <p className="text-sm font-medium">{log.description}</p>

                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span className="rounded-md bg-muted px-2 py-1">
                      {log.entity}
                    </span>

                    <span className="rounded-md bg-muted px-2 py-1 font-mono">
                      {log.entityId}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2 text-xs text-muted-foreground sm:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <Globe className="size-3.5" />
                    {log.ipAddress}
                  </div>

                  <div className="flex items-center gap-2">
                    <Laptop className="size-3.5" />
                    {log.device}
                  </div>

                  <div className="flex items-center gap-2 sm:col-span-2">
                    <CalendarDays className="size-3.5" />
                    {formatDate(log.createdAt)}
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => setSelectedLog(log)}
                >
                  <Eye className="mr-2 size-4" />
                  View Details
                </Button>
              </div>
            ))
          ) : (
            <div className="px-5 py-16 text-center">
              <div className="mx-auto flex max-w-sm flex-col items-center">
                <div className="mb-3 rounded-full bg-muted p-3">
                  <Search className="size-5 text-muted-foreground" />
                </div>

                <h3 className="font-semibold">
                  No audit logs found
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  Try changing your search or filter criteria.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Details Dialog */}
      <Dialog
        open={!!selectedLog}
        onOpenChange={(open) => {
          if (!open) setSelectedLog(null);
        }}
      >
        <DialogContent className="max-h-[90vh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto rounded-xl">
          {selectedLog && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <ShieldCheck className="size-5 text-primary" />
                  Audit Log Details
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Basic info */}
                <div className="grid grid-cols-1 gap-4 rounded-xl border bg-muted/20 p-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Log ID
                    </p>

                    <p className="mt-1 font-mono text-sm font-medium">
                      {selectedLog.id}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Action
                    </p>

                    <span
                      className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${actionStyles[selectedLog.action]}`}
                    >
                      {selectedLog.action}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Actor
                    </p>

                    <p className="mt-1 text-sm font-medium">
                      {selectedLog.actor.name}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {selectedLog.actor.email}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Role
                    </p>

                    <p className="mt-1 text-sm font-medium">
                      {selectedLog.actor.role}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Target Entity
                    </p>

                    <p className="mt-1 text-sm font-medium">
                      {selectedLog.entity}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Entity ID
                    </p>

                    <p className="mt-1 font-mono text-sm font-medium">
                      {selectedLog.entityId}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      IP Address
                    </p>

                    <p className="mt-1 font-mono text-sm">
                      {selectedLog.ipAddress}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Device
                    </p>

                    <p className="mt-1 text-sm">
                      {selectedLog.device}
                    </p>
                  </div>

                  <div className="sm:col-span-2">
                    <p className="text-xs text-muted-foreground">
                      Timestamp
                    </p>

                    <p className="mt-1 text-sm">
                      {formatDate(selectedLog.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="mb-2 text-sm font-semibold">
                    Description
                  </h3>

                  <div className="rounded-lg border bg-background p-3 text-sm">
                    {selectedLog.description}
                  </div>
                </div>

                {/* Old / New values */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="min-w-0">
                    <h3 className="mb-2 text-sm font-semibold">
                      Old Values
                    </h3>

                    <pre className="max-h-72 overflow-auto whitespace-pre-wrap break-words rounded-lg border bg-muted/30 p-4 text-xs leading-5">
                      {formatJson(selectedLog.oldValue)}
                    </pre>
                  </div>

                  <div className="min-w-0">
                    <h3 className="mb-2 text-sm font-semibold">
                      New Values
                    </h3>

                    <pre className="max-h-72 overflow-auto whitespace-pre-wrap break-words rounded-lg border bg-muted/30 p-4 text-xs leading-5">
                      {formatJson(selectedLog.newValue)}
                    </pre>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

