// "use client";

// import { useGetAllDepartments } from '@/hooks/departments.hook';
// import React from 'react'

// export default function DepartmentsPage() {

//     const {data: departments, isLoading, isError} = useGetAllDepartments({page: "1", limit: "10"});

//     console.log(departments,"departments");
//   return (
//     <div>departmentsPage</div>
//   )
// }
























"use client";

import React, { useState } from "react";
import { Eye, MoreHorizontal, Pencil } from "lucide-react";

import { useGetAllDepartments } from "@/hooks/departments.hook";
import Pagination from "@/components/dashboard/shared/Pagination";

export default function DepartmentsPage() {
    const [page, setPage] = useState(1);

    const limit = 5;

    const {
        data: departments,
        isLoading,
        isError,
    } = useGetAllDepartments({
        page: String(page),
        limit: String(limit),
    });

    console.log(departments, "departments");

    // Adjust these paths if your API response wrapper is different
    const departmentData = departments?.data?.data ?? [];
    const meta = departments?.data?.meta;

    const totalPages =
        meta?.totalPages ??
        Math.ceil((meta?.total ?? departmentData.length) / limit);

    if (isError) {
        return (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-600 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
                Failed to load departments.
            </div>
        );
    }

    return (
        <div className="space-y-6 p-3">
            {/* Header */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                        Departments
                    </h1>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Manage university departments and their academic information.
                    </p>
                </div>

                <button
                    type="button"
                    className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                >
                    + Create Department
                </button>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1000px]">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50">
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                    Department
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                    Faculty
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                    Head
                                </th>

                                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                    Courses
                                </th>

                                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                    Programs
                                </th>

                                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                    Users
                                </th>

                                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                    Status
                                </th>

                                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                            {isLoading ? (
                                Array.from({ length: 5 }).map((_, index) => (
                                    <tr key={index}>
                                        {Array.from({ length: 9 }).map((_, cellIndex) => (
                                            <td key={cellIndex} className="px-6 py-5">
                                                <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : departmentData.length > 0 ? (
                                departmentData.map((department: any) => (
                                    <tr
                                        key={department.id}
                                        className="transition hover:bg-slate-50 dark:hover:bg-slate-900/50"
                                    >
                                        {/* Department */}
                                        <td className="px-6 py-5">
                                            <div>
                                                <p className="font-medium text-slate-900 dark:text-slate-100">
                                                    {department.name}
                                                </p>
                                                <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                                    {department.code}
                                                </span>

                                            </div>
                                        </td>



                                        {/* Faculty */}
                                        <td className="px-6 py-5">
                                            {department.faculty ? (
                                                <div>
                                                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                                                        {department.faculty.name}
                                                    </p>

                                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                                        {department.faculty.code}
                                                    </p>
                                                </div>
                                            ) : (
                                                <span className="text-sm text-slate-400">N/A</span>
                                            )}
                                        </td>

                                        {/* Head */}
                                        <td className="px-6 py-5">
                                            {department.head ? (
                                                <div>
                                                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                                                        {department.head.name}
                                                    </p>
                                                </div>
                                            ) : (
                                                <span className="text-sm text-slate-400 dark:text-slate-500">
                                                    Not Assigned
                                                </span>
                                            )}
                                        </td>

                                        {/* Courses */}
                                        <td className="px-6 py-5 text-center">
                                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                                {department._count?.courses ?? 0}
                                            </span>
                                        </td>

                                        {/* Programs */}
                                        <td className="px-6 py-5 text-center">
                                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                                {department._count?.programs ?? 0}
                                            </span>
                                        </td>

                                        {/* Users */}
                                        <td className="px-6 py-5 text-center">
                                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                                {department._count?.users ?? 0}
                                            </span>
                                        </td>

                                        {/* Status */}
                                        <td className="px-6 py-5 text-center">
                                            <span
                                                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${department.isActive
                                                        ? "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400"
                                                        : "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400"
                                                    }`}
                                            >
                                                {department.isActive ? "Active" : "Inactive"}
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-6 py-5">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    type="button"
                                                    title="View department"
                                                    className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </button>

                                                <button
                                                    type="button"
                                                    title="Edit department"
                                                    className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </button>

                                                <button
                                                    type="button"
                                                    title="More actions"
                                                    className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={9}
                                        className="px-6 py-12 text-center text-sm text-slate-500 dark:text-slate-400"
                                    >
                                        No departments found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="border-t border-slate-200 px-6 py-4 dark:border-slate-800">
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