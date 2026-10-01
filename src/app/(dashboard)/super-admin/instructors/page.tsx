// "use client";

// import { useGetAllInstructors } from '@/hooks/profiles.hook';
// import React from 'react'

// export default function InstructorsPage() {


//   const { data: instructors, isLoading, isError } = useGetAllInstructors({ page: "1", limit: "10" });

//   console.log("instructors", instructors);
//   return (
//     <div>InstructorsPage</div>
//   )
// }






// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import { Eye, Pencil, MoreHorizontal } from "lucide-react";

// import { useGetAllInstructors } from "@/hooks/profiles.hook";
// import Pagination from "@/components/dashboard/shared/Pagination";

// export default function InstructorsPage() {
//   const [page, setPage] = useState(1);
//   const limit = 10;

//   const {
//     data: instructors,
//     isLoading,
//     isError,
//   } = useGetAllInstructors({
//     page: String(page),
//     limit: String(limit),
//   });

//   const instructorList = instructors?.data ?? [];

//   const total = instructors?.meta?.total ?? 0;
//   const totalPages = instructors?.meta?.totalPages ?? 1;

//   if (isLoading) {
//     return (
//       <div className="p-6">
//         <div className="rounded-lg border bg-white p-8 text-center">
//           <p className="text-sm text-slate-500">
//             Loading instructors...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="p-6">
//         <div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center">
//           <p className="text-sm text-red-600">
//             Failed to load instructors.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 p-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-semibold text-slate-900">
//           Instructors
//         </h1>

//         <p className="mt-1 text-sm text-slate-500">
//           Manage university instructors and their professional information.
//         </p>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
//         {/* Total */}
//         <div className="rounded-lg border bg-white p-4">
//           <p className="text-sm text-slate-500">
//             Total Instructors
//           </p>

//           <p className="mt-1 text-2xl font-semibold text-slate-900">
//             {total}
//           </p>
//         </div>

//         {/* Active */}
//         <div className="rounded-lg border bg-white p-4">
//           <p className="text-sm text-slate-500">
//             Active Instructors
//           </p>

//           <p className="mt-1 text-2xl font-semibold text-green-600">
//             {
//               instructorList.filter(
//                 (instructor: any) =>
//                   instructor.employmentStatus === "ACTIVE"
//               ).length
//             }
//           </p>
//         </div>

//         {/* Current Page */}
//         <div className="rounded-lg border bg-white p-4">
//           <p className="text-sm text-slate-500">
//             Current Page
//           </p>

//           <p className="mt-1 text-2xl font-semibold text-slate-900">
//             {instructorList.length}
//           </p>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-hidden rounded-lg border bg-white">
//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[900px]">
//             <thead>
//               <tr className="border-b bg-slate-50">
//                 {/* Instructor */}
//                 <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Instructor
//                 </th>

//                 {/* Employee ID */}
//                 <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Employee ID
//                 </th>

//                 {/* Designation */}
//                 <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Designation
//                 </th>

//                 {/* Department */}
//                 <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Department
//                 </th>

//                 {/* Employment */}
//                 <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Status
//                 </th>

//                 {/* Actions */}
//                 <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Actions
//                 </th>
//               </tr>
//             </thead>

//             <tbody className="divide-y">
//               {instructorList.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan={6}
//                     className="px-5 py-12 text-center text-sm text-slate-500"
//                   >
//                     No instructors found.
//                   </td>
//                 </tr>
//               ) : (
//                 instructorList.map((instructor: any) => (
//                   <tr
//                     key={instructor.id}
//                     className="transition-colors hover:bg-slate-50"
//                   >
//                     {/* Instructor */}
//                     <td className="px-5 py-4">
//                       <div className="flex items-center gap-3">
//                         {/* Avatar */}
//                         <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-slate-100">
//                           {instructor.avatar ? (
//                             <Image
//                               src={instructor.avatar}
//                               alt={
//                                 instructor.name || "Instructor"
//                               }
//                               fill
//                               className="object-cover"
//                             />
//                           ) : (
//                             <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-slate-500">
//                               {instructor.name
//                                 ?.charAt(0)
//                                 ?.toUpperCase() || "I"}
//                             </div>
//                           )}
//                         </div>

//                         {/* Name + Email */}
//                         <div className="min-w-0">
//                           <p className="truncate font-medium text-slate-900">
//                             {instructor.name || "N/A"}
//                           </p>

//                           <p className="truncate text-sm text-slate-500">
//                             {instructor.email || "N/A"}
//                           </p>
//                         </div>
//                       </div>
//                     </td>

//                     {/* Employee ID */}
//                     <td className="px-5 py-4">
//                       <span className="font-mono text-sm text-slate-700">
//                         {instructor.employeeId || "N/A"}
//                       </span>
//                     </td>

//                     {/* Designation */}
//                     <td className="px-5 py-4">
//                       <span className="text-sm text-slate-700">
//                         {instructor.designation || "N/A"}
//                       </span>
//                     </td>

//                     {/* Department */}
//                     <td className="px-5 py-4">
//                       <span className="text-sm text-slate-700">
//                         {instructor.department?.name ||
//                           instructor.departmentName ||
//                           "N/A"}
//                       </span>
//                     </td>

//                     {/* Employment Status */}
//                     <td className="px-5 py-4">
//                       <StatusBadge
//                         status={instructor.employmentStatus}
//                       />
//                     </td>

//                     {/* Actions */}
//                     <td className="px-5 py-4">
//                       <div className="flex items-center justify-end gap-1">
//                         {/* View */}
//                         <button
//                           type="button"
//                           title="View instructor"
//                           className="rounded-md p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
//                         >
//                           <Eye className="h-4 w-4" />
//                         </button>

//                         {/* Edit */}
//                         <button
//                           type="button"
//                           title="Edit instructor"
//                           className="rounded-md p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
//                         >
//                           <Pencil className="h-4 w-4" />
//                         </button>

//                         {/* More */}
//                         <button
//                           type="button"
//                           title="More actions"
//                           className="rounded-md p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
//                         >
//                           <MoreHorizontal className="h-4 w-4" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Table Footer */}
//         <div className="flex flex-col gap-4 border-t px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
//           {/* Showing info */}
//           <p className="text-sm text-slate-500">
//             Showing{" "}
//             <span className="font-medium text-slate-700">
//               {instructorList.length}
//             </span>{" "}
//             of{" "}
//             <span className="font-medium text-slate-700">
//               {total}
//             </span>{" "}
//             instructors
//           </p>

//           {/* Pagination */}
//           <Pagination
//             page={page}
//             totalPages={totalPages}
//             onPageChange={setPage}
//             isLoading={isLoading}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// /* -------------------------------- */
// /* Status Badge                     */
// /* -------------------------------- */

// function StatusBadge({ status }: { status?: string }) {
//   const statusConfig: Record<
//     string,
//     {
//       label: string;
//       className: string;
//     }
//   > = {
//     ACTIVE: {
//       label: "Active",
//       className:
//         "bg-green-50 text-green-700 ring-green-600/20",
//     },

//     INACTIVE: {
//       label: "Inactive",
//       className:
//         "bg-slate-100 text-slate-600 ring-slate-500/20",
//     },

//     ON_LEAVE: {
//       label: "On Leave",
//       className:
//         "bg-amber-50 text-amber-700 ring-amber-600/20",
//     },

//     SUSPENDED: {
//       label: "Suspended",
//       className:
//         "bg-red-50 text-red-700 ring-red-600/20",
//     },
//   };

//   const config = statusConfig[status || ""] || {
//     label: status || "Unknown",
//     className:
//       "bg-slate-100 text-slate-600 ring-slate-500/20",
//   };

//   return (
//     <span
//       className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${config.className}`}
//     >
//       {config.label}
//     </span>
//   );
// }























"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Eye, Pencil, MoreHorizontal } from "lucide-react";

import { useGetAllInstructors } from "@/hooks/profiles.hook";
import Pagination from "@/components/dashboard/shared/Pagination";

export default function InstructorsPage() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    data: instructors,
    isLoading,
    isError,
  } = useGetAllInstructors({
    page: String(page),
    limit: String(limit),
  });

  const instructorList = instructors?.data ?? [];

  const total = instructors?.meta?.total ?? 0;
  const totalPages = instructors?.meta?.totalPages ?? 1;

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="rounded-lg border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-950">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Loading instructors...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center dark:border-red-900/50 dark:bg-red-950/30">
          <p className="text-sm text-red-600 dark:text-red-400">
            Failed to load instructors.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Instructors
        </h1>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Manage university instructors and their professional information.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total */}
        <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Total Instructors
          </p>

          <p className="mt-1 text-2xl font-semibold text-slate-900 dark:text-slate-100">
            {total}
          </p>
        </div>

        {/* Active */}
        <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Active Instructors
          </p>

          <p className="mt-1 text-2xl font-semibold text-green-600 dark:text-green-400">
            {
              instructorList.filter(
                (instructor: any) =>
                  instructor.employmentStatus === "ACTIVE"
              ).length
            }
          </p>
        </div>

        {/* Current Page */}
        <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Current Page
          </p>

          <p className="mt-1 text-2xl font-semibold text-slate-900 dark:text-slate-100">
            {instructorList.length}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/70">
                {/* Instructor */}
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Instructor
                </th>

                {/* Employee ID */}
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Employee ID
                </th>

                {/* Designation */}
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Designation
                </th>

                {/* Department */}
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Department
                </th>

                {/* Status */}
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Status
                </th>

                {/* Actions */}
                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {instructorList.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center text-sm text-slate-500 dark:text-slate-400"
                  >
                    No instructors found.
                  </td>
                </tr>
              ) : (
                instructorList.map((instructor: any) => (
                  <tr
                    key={instructor.id}
                    className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-900/60"
                  >
                    {/* Instructor */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {/* Avatar */}
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                          {instructor.avatar ? (
                            <Image
                              src={instructor.avatar}
                              alt={
                                instructor.name || "Instructor"
                              }
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-slate-500 dark:text-slate-400">
                              {instructor.name
                                ?.charAt(0)
                                ?.toUpperCase() || "I"}
                            </div>
                          )}
                        </div>

                        {/* Name + Email */}
                        <div className="min-w-0">
                          <p className="truncate font-medium text-slate-900 dark:text-slate-100">
                            {instructor.name || "N/A"}
                          </p>

                          <p className="truncate text-sm text-slate-500 dark:text-slate-400">
                            {instructor.email || "N/A"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Employee ID */}
                    <td className="px-5 py-4">
                      <span className="font-mono text-sm text-slate-700 dark:text-slate-300">
                        {instructor.employeeId || "N/A"}
                      </span>
                    </td>

                    {/* Designation */}
                    <td className="px-5 py-4">
                      <span className="text-sm text-slate-700 dark:text-slate-300">
                        {instructor.designation || "N/A"}
                      </span>
                    </td>

                    {/* Department */}
                    <td className="px-5 py-4">
                      <span className="text-sm text-slate-700 dark:text-slate-300">
                        {instructor.department?.name ||
                          instructor.departmentName ||
                          "N/A"}
                      </span>
                    </td>

                    {/* Employment Status */}
                    <td className="px-5 py-4">
                      <StatusBadge
                        status={instructor.employmentStatus}
                      />
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        {/* View */}
                        <button
                          type="button"
                          title="View instructor"
                          className="rounded-md p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                        >
                          <Eye className="h-4 w-4" />
                        </button>

                        {/* Edit */}
                        <button
                          type="button"
                          title="Edit instructor"
                          className="rounded-md p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>

                        {/* More */}
                        <button
                          type="button"
                          title="More actions"
                          className="rounded-md p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="flex flex-col gap-4 border-t border-slate-200 px-5 py-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
          {/* Showing info */}
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Showing{" "}
            <span className="font-medium text-slate-700 dark:text-slate-200">
              {instructorList.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-slate-700 dark:text-slate-200">
              {total}
            </span>{" "}
            instructors
          </p>

          {/* Pagination */}
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- */
/* Status Badge                     */
/* -------------------------------- */

function StatusBadge({ status }: { status?: string }) {
  const statusConfig: Record<
    string,
    {
      label: string;
      className: string;
    }
  > = {
    ACTIVE: {
      label: "Active",
      className:
        "bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-950/40 dark:text-green-400 dark:ring-green-500/30",
    },

    INACTIVE: {
      label: "Inactive",
      className:
        "bg-slate-100 text-slate-600 ring-slate-500/20 dark:bg-slate-800 dark:text-slate-400 dark:ring-slate-500/30",
    },

    ON_LEAVE: {
      label: "On Leave",
      className:
        "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-950/40 dark:text-amber-400 dark:ring-amber-500/30",
    },

    SUSPENDED: {
      label: "Suspended",
      className:
        "bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-950/40 dark:text-red-400 dark:ring-red-500/30",
    },
  };

  const config = statusConfig[status || ""] || {
    label: status || "Unknown",
    className:
      "bg-slate-100 text-slate-600 ring-slate-500/20 dark:bg-slate-800 dark:text-slate-400 dark:ring-slate-500/30",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${config.className}`}
    >
      {config.label}
    </span>
  );
}

