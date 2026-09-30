



"use client";

import { useState } from "react";
import {
  Search,
  X,
  Eye,
  Pencil,
  MoreHorizontal,
} from "lucide-react";

import { useGetAllStudents } from "@/hooks/profiles.hook";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import Pagination from "@/components/dashboard/shared/Pagination";

interface Program {
  id?: string;
  name?: string;
  title?: string;
}

interface Student {
  id: string;
  studentId?: string;

  name?: string;
  email?: string;
  avatar?: string | null;

  program?: Program | string | null;
  currentSemester?: string | number | null;
  academicStatus?: string | null;

  createdAt?: string;
}

interface StudentFilters {
  searchTerm: string;
  academicStatus: string;
  sortBy: string;
  sortOrder: string;
}

const DEFAULT_FILTERS: StudentFilters = {
  searchTerm: "",
  academicStatus: "",
  sortBy: "createdAt",
  sortOrder: "desc",
};

export default function StudentsPage() {
  /* =====================================================
     PAGINATION
  ====================================================== */

  const [page, setPage] = useState(1);

  /* =====================================================
     FILTERS
  ====================================================== */

  const [filters, setFilters] =
    useState<StudentFilters>(DEFAULT_FILTERS);

  /* =====================================================
     GET STUDENTS
  ====================================================== */

  const { data, isLoading, isError } = useGetAllStudents({
    page: String(page),
    limit: "10",

    ...(filters.searchTerm && {
      searchTerm: filters.searchTerm,
    }),

    ...(filters.academicStatus && {
      academicStatus: filters.academicStatus,
    }),

    sortBy: filters.sortBy,
    sortOrder: filters.sortOrder,
  });

  /* =====================================================
     STUDENT DATA
  ====================================================== */

  const students: Student[] = data?.data ?? [];

  const meta = data?.meta;

  const totalPages = meta?.totalPages ?? 1;

  /* =====================================================
     CHECK ACTIVE FILTERS
  ====================================================== */

  const hasFilters =
    filters.searchTerm !== "" ||
    filters.academicStatus !== "" ||
    filters.sortBy !== "createdAt" ||
    filters.sortOrder !== "desc";

  /* =====================================================
     UPDATE FILTER
     
     Whenever a filter changes:
     1. Update filter state
     2. Reset pagination to page 1
  ====================================================== */

  const updateFilter = <K extends keyof StudentFilters>(
    key: K,
    value: StudentFilters[K]
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));

    setPage(1);
  };

  /* =====================================================
     RESET ALL FILTERS
  ====================================================== */

  const handleReset = () => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  };

  /* =====================================================
     GET PROGRAM NAME
  ====================================================== */

  const getProgramName = (
    program: Student["program"]
  ): string => {
    if (!program) return "N/A";

    if (typeof program === "string") {
      return program;
    }

    return program.name || program.title || "N/A";
  };

  /* =====================================================
     FORMAT ACADEMIC STATUS
  ====================================================== */

  const formatAcademicStatus = (
    status?: string | null
  ): string => {
    if (!status) return "N/A";

    return status
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  /* =====================================================
     GET INITIALS
  ====================================================== */

  const getInitials = (name?: string): string => {
    if (!name) return "ST";

    return name
      .trim()
      .split(" ")
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  };

  /* =====================================================
     RENDER
  ====================================================== */

  return (
    <div className="space-y-6 p-3">
      {/* =================================================
          PAGE HEADER
      ================================================== */}

      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Students
        </h1>

        <p className="text-sm text-muted-foreground">
          Manage and monitor all students in the university.
        </p>
      </div>

      {/* =================================================
          FILTERS
      ================================================== */}

      <div className="rounded-lg border bg-card p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          {/* =================================================
              SEARCH
          ================================================== */}

          <div className="relative flex-1">
            <Search
              className="
                absolute
                left-3
                top-1/2
                h-4
                w-4
                -translate-y-1/2
                text-muted-foreground
              "
            />

            <Input
              value={filters.searchTerm}
              onChange={(event) =>
                updateFilter(
                  "searchTerm",
                  event.target.value
                )
              }
              placeholder="Search by name, email or student ID..."
              className="pl-9"
            />
          </div>

          {/* =================================================
              ACADEMIC STATUS
          ================================================== */}

          <select
            value={filters.academicStatus}
            onChange={(event) =>
              updateFilter(
                "academicStatus",
                event.target.value
              )
            }
            className="
              h-10
              rounded-md
              border
              bg-background
              px-3
              text-sm
              outline-none
              focus:ring-2
              focus:ring-ring
            "
          >
            <option value="">
              All Academic Status
            </option>

            <option value="ACTIVE">
              Active
            </option>

            <option value="INACTIVE">
              Inactive
            </option>

            <option value="GRADUATED">
              Graduated
            </option>

            <option value="SUSPENDED">
              Suspended
            </option>

            <option value="DROPPED_OUT">
              Dropped Out
            </option>
          </select>

          {/* =================================================
              SORT BY
          ================================================== */}

          <select
            value={filters.sortBy}
            onChange={(event) =>
              updateFilter(
                "sortBy",
                event.target.value
              )
            }
            className="
              h-10
              rounded-md
              border
              bg-background
              px-3
              text-sm
              outline-none
              focus:ring-2
              focus:ring-ring
            "
          >
            <option value="createdAt">
              Created Date
            </option>

            <option value="name">
              Name
            </option>

            <option value="studentId">
              Student ID
            </option>

            <option value="academicStatus">
              Academic Status
            </option>
          </select>

          {/* =================================================
              SORT ORDER
          ================================================== */}

          <select
            value={filters.sortOrder}
            onChange={(event) =>
              updateFilter(
                "sortOrder",
                event.target.value
              )
            }
            className="
              h-10
              rounded-md
              border
              bg-background
              px-3
              text-sm
              outline-none
              focus:ring-2
              focus:ring-ring
            "
          >
            <option value="desc">
              Descending
            </option>

            <option value="asc">
              Ascending
            </option>
          </select>

          {/* =================================================
              RESET
          ================================================== */}

          {hasFilters && (
            <Button
              type="button"
              variant="ghost"
              onClick={handleReset}
              className="shrink-0"
            >
              <X className="mr-2 h-4 w-4" />
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* =================================================
          STUDENTS TABLE
      ================================================== */}

      <div className="overflow-hidden rounded-lg border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            {/* =================================================
                TABLE HEADER
            ================================================== */}

            <thead className="border-b bg-muted/50">
              <tr>
                {/* Student */}

                <th className="whitespace-nowrap px-4 py-3 text-left font-medium">
                  Student
                </th>

                {/* Student ID */}

                <th className="whitespace-nowrap px-4 py-3 text-left font-medium">
                  Student ID
                </th>

                {/* Program */}

                <th className="whitespace-nowrap px-4 py-3 text-left font-medium">
                  Program
                </th>

                {/* Current Semester */}

                <th className="whitespace-nowrap px-4 py-3 text-left font-medium">
                  Current Semester
                </th>

                {/* Academic Status */}

                <th className="whitespace-nowrap px-4 py-3 text-left font-medium">
                  Academic Status
                </th>

                {/* Created */}

                <th className="whitespace-nowrap px-4 py-3 text-left font-medium">
                  Created At
                </th>

                {/* Actions */}

                <th className="whitespace-nowrap px-4 py-3 text-right font-medium">
                  Actions
                </th>
              </tr>
            </thead>

            {/* =================================================
                TABLE BODY
            ================================================== */}

            <tbody className="divide-y">
              {/* =================================================
                  LOADING
              ================================================== */}

              {isLoading &&
                Array.from({ length: 5 }).map(
                  (_, index) => (
                    <tr
                      key={`loading-${index}`}
                    >
                      <td
                        colSpan={7}
                        className="px-4 py-4"
                      >
                        <div className="h-10 w-full animate-pulse rounded bg-muted" />
                      </td>
                    </tr>
                  )
                )}

              {/* =================================================
                  ERROR
              ================================================== */}

              {!isLoading && isError && (
                <tr>
                  <td
                    colSpan={7}
                    className="
                      px-4
                      py-10
                      text-center
                      text-sm
                      text-destructive
                    "
                  >
                    Failed to load students.
                  </td>
                </tr>
              )}

              {/* =================================================
                  EMPTY
              ================================================== */}

              {!isLoading &&
                !isError &&
                students.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="
                        px-4
                        py-10
                        text-center
                        text-sm
                        text-muted-foreground
                      "
                    >
                      No students found.
                    </td>
                  </tr>
                )}

              {/* =================================================
                  STUDENT ROWS
              ================================================== */}

              {!isLoading &&
                !isError &&
                students.map((student) => (
                  <tr
                    key={student.id}
                    className="transition-colors hover:bg-muted/40"
                  >
                    {/* =================================================
                        STUDENT
                    ================================================== */}

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        {/* Avatar */}

                        {student.avatar ? (
                          <img
                            src={student.avatar}
                            alt={
                              student.name ||
                              "Student"
                            }
                            className="
                              h-10
                              w-10
                              shrink-0
                              rounded-full
                              object-cover
                            "
                          />
                        ) : (
                          <div
                            className="
                              flex
                              h-10
                              w-10
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              bg-primary/10
                              text-sm
                              font-semibold
                              text-primary
                            "
                          >
                            {getInitials(
                              student.name
                            )}
                          </div>
                        )}

                        {/* Name + Email */}

                        <div className="min-w-0">
                          <p className="truncate font-medium">
                            {student.name || "N/A"}
                          </p>

                          <p
                            className="
                              max-w-[220px]
                              truncate
                              text-xs
                              text-muted-foreground
                            "
                          >
                            {student.email || "N/A"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* =================================================
                        STUDENT ID
                    ================================================== */}

                    <td className="px-4 py-4">
                      <span className="font-medium">
                        {student.studentId || "N/A"}
                      </span>
                    </td>

                    {/* =================================================
                        PROGRAM
                    ================================================== */}

                    <td className="px-4 py-4">
                      <span className="text-muted-foreground">
                        {getProgramName(
                          student.program
                        )}
                      </span>
                    </td>

                    {/* =================================================
                        CURRENT SEMESTER
                    ================================================== */}

                    <td className="px-4 py-4">
                      {student.currentSemester ? (
                        <span
                          className="
                            inline-flex
                            whitespace-nowrap
                            rounded-md
                            bg-muted
                            px-2.5
                            py-1
                            text-xs
                            font-medium
                          "
                        >
                          {student.currentSemester}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">
                          N/A
                        </span>
                      )}
                    </td>

                    {/* =================================================
                        ACADEMIC STATUS
                    ================================================== */}

                    <td className="px-4 py-4">
                      <span
                        className={`
                          inline-flex
                          whitespace-nowrap
                          rounded-full
                          px-2.5
                          py-1
                          text-xs
                          font-medium

                          ${
                            student.academicStatus ===
                            "ACTIVE"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : student.academicStatus ===
                                "GRADUATED"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                              : student.academicStatus ===
                                "SUSPENDED"
                              ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                              : student.academicStatus ===
                                "DROPPED_OUT"
                              ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                              : "bg-muted text-muted-foreground"
                          }
                        `}
                      >
                        {formatAcademicStatus(
                          student.academicStatus
                        )}
                      </span>
                    </td>

                    {/* =================================================
                        CREATED AT
                    ================================================== */}

                    <td
                      className="
                        whitespace-nowrap
                        px-4
                        py-4
                        text-muted-foreground
                      "
                    >
                      {student.createdAt
                        ? new Date(
                            student.createdAt
                          ).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )
                        : "N/A"}
                    </td>

                    {/* =================================================
                        MORE ACTIONS
                    ================================================== */}

                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {/* View */}

                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-2"
                          onClick={() => {
                            console.log(
                              "View student:",
                              student.id
                            );
                          }}
                        >
                          <Eye className="h-4 w-4" />

                          <span className="hidden sm:inline">
                            View
                          </span>
                        </Button>

                        {/* Edit */}

                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-2"
                          onClick={() => {
                            console.log(
                              "Edit student:",
                              student.id
                            );
                          }}
                        >
                          <Pencil className="h-4 w-4" />

                          <span className="hidden sm:inline">
                            Edit
                          </span>
                        </Button>

                        {/* More */}

                        <Button
                          variant="ghost"
                          size="icon"
                          className="sm:hidden"
                        >
                          <MoreHorizontal className="h-4 w-4" />

                          <span className="sr-only">
                            More actions
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* =================================================
          PAGINATION
      ================================================== */}

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        isLoading={isLoading}
      />
    </div>
  );
}
