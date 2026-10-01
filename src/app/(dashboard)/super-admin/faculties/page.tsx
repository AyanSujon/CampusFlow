
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, MoreHorizontal, Pencil, Plus } from "lucide-react";

import { useGetAllFaculties } from "@/hooks/faculties.hook";
import Pagination from "@/components/dashboard/shared/Pagination";

export default function FacultiesPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);

  const limit = 5;

  const {
    data,
    isLoading: isLoadingFaculties,
    isError: isErrorFaculties,
  } = useGetAllFaculties({
    page: page.toString(),
    limit: limit.toString(),
  });

  const faculties = data?.data ?? [];
  const totalPages = data?.meta?.totalPages ?? 1;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isErrorFaculties) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6 text-center">
        <p className="text-sm font-medium text-destructive">
          Failed to load faculties.
        </p>

        <p className="mt-1 text-sm text-muted-foreground">
          Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-3">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Faculties
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage university faculties and their information.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Total Faculties */}
          <div className="rounded-lg border bg-card px-4 py-2">
            <p className="text-xs text-muted-foreground">Total Faculties</p>

            <p className="text-lg font-semibold text-foreground">
              {data?.meta?.total ?? faculties.length}
            </p>
          </div>

          {/* Create Faculty */}
          <button
            type="button"
            onClick={() => router.push("/super-admin/faculties/create")}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Plus className="h-4 w-4" />
            Create Faculty
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead className="border-b bg-muted/40">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-foreground">
                  Faculty
                </th>

                <th className="px-6 py-4 text-left font-semibold text-foreground">
                  Code
                </th>


                <th className="px-6 py-4 text-left font-semibold text-foreground">
                  Dean
                </th>

                <th className="px-6 py-4 text-left font-semibold text-foreground">
                  Status
                </th>

                <th className="px-6 py-4 text-left font-semibold text-foreground">
                  Created At
                </th>

                <th className="px-6 py-4 text-right font-semibold text-foreground">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {isLoadingFaculties ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-muted-foreground"
                  >
                    Loading faculties...
                  </td>
                </tr>
              ) : faculties.length > 0 ? (
                faculties.map((faculty: any) => (
                  <tr
                    key={faculty.id}
                    className="transition-colors hover:bg-muted/30"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-semibold text-primary">
                          {faculty.code?.slice(0, 2)}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate font-medium text-foreground">
                            {faculty.name}
                          </p>

                          <p className="mt-0.5 text-xs text-muted-foreground">
                            ID: {faculty.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-md bg-muted px-2.5 py-1 font-mono text-xs font-medium text-foreground">
                        {faculty.code}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      {faculty.dean ? (
                        <div>
                          <p className="font-medium text-foreground">
                            {faculty.dean.name}
                          </p>

                          {faculty.dean.email && (
                            <p className="text-xs text-muted-foreground">
                              {faculty.dean.email}
                            </p>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">
                          Not assigned
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      {faculty.isActive ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-600 dark:text-green-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-600 dark:text-red-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                          Inactive
                        </span>
                      )}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4 text-muted-foreground">
                      {faculty.createdAt
                        ? formatDate(faculty.createdAt)
                        : "N/A"}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                          title="View Faculty"
                        >
                          <Eye className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                          title="Edit Faculty"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                          title="More Actions"
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
                    colSpan={7}
                    className="px-6 py-12 text-center text-muted-foreground"
                  >
                    No faculties found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t px-6 py-4">
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            isLoading={isLoadingFaculties}
          />
        </div>
      </div>
    </div>
  );
}
