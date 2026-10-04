

"use client";

import React, { useState } from "react";
import { Eye, MoreHorizontal, Pencil, Plus } from "lucide-react";

import { useGetAllPrograms } from "@/hooks/programs.hook";
import Pagination from "@/components/dashboard/shared/Pagination";
import Link from "next/link";

export default function ProgramsPage() {
    const [page, setPage] = useState(1);

    const limit = 5;

    const {
        data: programs,
        isLoading,
        isError,
    } = useGetAllPrograms({
        page: page.toString(),
        limit: limit.toString(),
    });

    const programData = programs?.data?.data ?? [];

    const meta = programs?.data?.meta;

    const totalPages = meta?.totalPages ?? 1;

    if (isLoading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="text-sm text-muted-foreground">
                    Loading programs...
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex min-h-[400px] items-center justify-center px-4 text-center">
                <div className="text-sm text-destructive">
                    Failed to load programs.
                </div>
            </div>
        );
    }

    return (


        <div className="w-full space-y-6 p-3 sm:p-4 md:p-6">
            {/* Header */}
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
                        Academic Programs
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage university academic degree programs.
                    </p>
                </div>

                {/* Create Program Button */}
                <Link
                    href="/super-admin/programs/create"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 sm:w-auto"
                >
                    <Plus className="h-4 w-4" />
                    Create Program
                </Link>
            </div>

            {/* ========================= */}
            {/* Desktop / Tablet Table */}
            {/* ========================= */}
            <div className="hidden overflow-hidden rounded-lg border bg-background md:block">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1000px] text-sm">
                        <thead className="border-b bg-muted/50">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium">
                                    Program
                                </th>

                                <th className="px-4 py-3 text-left font-medium">
                                    Code
                                </th>


                                <th className="px-4 py-3 text-left font-medium">
                                    Degree
                                </th>

                                <th className="px-4 py-3 text-left font-medium">
                                    Credits
                                </th>


                                <th className="px-4 py-3 text-center font-medium">
                                    Duration
                                </th>

                                <th className="px-4 py-3 text-center font-medium">
                                    Status
                                </th>
                                <th className="px-4 py-3 text-center font-medium">
                                    Created At
                                </th>


                                <th className="px-4 py-3 text-right font-medium">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y">
                            {programData.length > 0 ? (
                                programData.map((program: any) => (
                                    <tr
                                        key={program.id}
                                        className="transition-colors hover:bg-muted/30"
                                    >
                                        {/* Program */}
                                        <td className="px-4 py-4">
                                            <div className="max-w-[220px]">
                                                <p
                                                    className="truncate font-medium"
                                                    title={program.name}
                                                >
                                                    {program.name}
                                                </p>
                                            </div>
                                        </td>

                                        {/* Code */}
                                        <td className="px-4 py-4">
                                            <span className="whitespace-nowrap rounded-md bg-muted px-2 py-1 font-mono text-xs">
                                                {program.code}
                                            </span>
                                        </td>

                                        {/* Degree */}
                                        <td className="px-4 py-4">
                                            <span className="inline-flex whitespace-nowrap rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
                                                {program.degreeType}
                                            </span>
                                        </td>

                                        {/* Credits */}
                                        <td className="px-4 py-4">
                                            <span className="inline-flex whitespace-nowrap rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
                                                {program.totalCredits}
                                            </span>
                                        </td>

                                        {/* Duration */}
                                        <td className="whitespace-nowrap px-4 py-4 text-center">
                                            {program.durationYears}{" "}
                                            {program.durationYears === 1 ? "Year" : "Years"}
                                        </td>

                                        {/* Status */}
                                        <td className="px-4 py-4 text-center">
                                            <span
                                                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${program.isActive
                                                    ? "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400"
                                                    : "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400"
                                                    }`}
                                            >
                                                {program.isActive ? "Active" : "Inactive"}
                                            </span>
                                        </td>

                                        {/* Created */}
                                        <td className="whitespace-nowrap px-4 py-4 text-muted-foreground">
                                            {new Date(program.createdAt).toLocaleDateString(
                                                "en-GB"
                                            )}
                                        </td>

                                        {/* Actions */}
                                        <td className="px-4 py-4">
                                            <div className="flex justify-end gap-1">
                                                <button
                                                    type="button"
                                                    className="rounded-md p-2 transition-colors hover:bg-muted"
                                                    title="View program"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </button>

                                                <button
                                                    type="button"
                                                    className="rounded-md p-2 transition-colors hover:bg-muted"
                                                    title="Edit program"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </button>

                                                <button
                                                    type="button"
                                                    className="rounded-md p-2 transition-colors hover:bg-muted"
                                                    title="More actions"
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
                                        colSpan={8}
                                        className="px-4 py-12 text-center text-sm text-muted-foreground"
                                    >
                                        No programs found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ========================= */}
            {/* Mobile Cards */}
            {/* ========================= */}
            <div className="space-y-3 md:hidden">
                {programData.length > 0 ? (
                    programData.map((program: any) => (
                        <div
                            key={program.id}
                            className="rounded-lg border bg-background p-4 shadow-sm"
                        >
                            {/* Program Header */}
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0 flex-1">
                                    <h2 className="line-clamp-2 text-sm font-semibold">
                                        {program.name}
                                    </h2>

                                    <div className="mt-2">
                                        <span className="rounded-md bg-muted px-2 py-1 font-mono text-[11px]">
                                            {program.code}
                                        </span>
                                    </div>
                                </div>

                                {/* Status */}
                                <span
                                    className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium ${program.isActive
                                        ? "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400"
                                        : "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400"
                                        }`}
                                >
                                    {program.isActive ? "Active" : "Inactive"}
                                </span>
                            </div>

                            {/* Program Information */}
                            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4 border-t pt-4">
                                {/* Department */}
                                <div className="min-w-0">
                                    <p className="text-xs text-muted-foreground">
                                        Department
                                    </p>

                                    <p
                                        className="mt-1 truncate text-sm font-medium"
                                        title={program.department?.name}
                                    >
                                        {program.department?.name ?? "N/A"}
                                    </p>

                                    {program.department?.code && (
                                        <p className="text-xs text-muted-foreground">
                                            {program.department.code}
                                        </p>
                                    )}
                                </div>

                                {/* Degree */}
                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Degree
                                    </p>

                                    <span className="mt-1 inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-medium text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
                                        {program.degreeType}
                                    </span>
                                </div>

                                {/* Duration */}
                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Duration
                                    </p>

                                    <p className="mt-1 text-sm font-medium">
                                        {program.durationYears}{" "}
                                        {program.durationYears === 1 ? "Year" : "Years"}
                                    </p>
                                </div>

                                {/* Credits */}
                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Total Credits
                                    </p>

                                    <p className="mt-1 text-sm font-medium">
                                        {program.totalCredits}
                                    </p>
                                </div>

                                {/* Created */}
                                <div className="col-span-2">
                                    <p className="text-xs text-muted-foreground">
                                        Created
                                    </p>

                                    <p className="mt-1 text-sm font-medium">
                                        {new Date(program.createdAt).toLocaleDateString(
                                            "en-GB"
                                        )}
                                    </p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-4 flex justify-end gap-1 border-t pt-3">
                                <button
                                    type="button"
                                    className="rounded-md p-2 transition-colors hover:bg-muted"
                                    title="View program"
                                >
                                    <Eye className="h-4 w-4" />
                                </button>

                                <button
                                    type="button"
                                    className="rounded-md p-2 transition-colors hover:bg-muted"
                                    title="Edit program"
                                >
                                    <Pencil className="h-4 w-4" />
                                </button>

                                <button
                                    type="button"
                                    className="rounded-md p-2 transition-colors hover:bg-muted"
                                    title="More actions"
                                >
                                    <MoreHorizontal className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="rounded-lg border bg-background px-4 py-12 text-center text-sm text-muted-foreground">
                        No programs found.
                    </div>
                )}
            </div>

            {/* Pagination */}
            <div className="overflow-x-auto">
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                    isLoading={isLoading}
                />
            </div>
        </div>

    );
}

