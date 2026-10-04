

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { ArrowLeft, Loader2, Save } from "lucide-react";

import { useGetAllDepartments } from "@/hooks/departments.hook";
import { useCreateProgram } from "@/hooks/programs.hook";

type DegreeType = "BACHELOR" | "MASTER" | "PHD";

type CreateProgramFormValues = {
  departmentId: string;
  code: string;
  name: string;
  degreeType: DegreeType | "";
  durationYears: number;
  totalCredits: number;
  description?: string;
  isActive: boolean;
};

const createProgramSchema = z.object({
  departmentId: z.string().min(1, "Department is required"),

  code: z
    .string()
    .min(2, "Program code must be at least 2 characters")
    .max(20, "Program code must not exceed 20 characters"),

  name: z
    .string()
    .min(2, "Program name must be at least 2 characters")
    .max(100, "Program name must not exceed 100 characters"),

  degreeType: z.enum(["BACHELOR", "MASTER", "PHD"], {
    message: "Degree type is required",
  }),

  durationYears: z
    .number()
    .int("Duration must be a whole number")
    .min(1, "Duration must be at least 1 year")
    .max(10, "Duration cannot exceed 10 years"),

  totalCredits: z
    .number()
    .int("Total credits must be a whole number")
    .min(1, "Total credits must be at least 1"),

  description: z.string().optional(),

  isActive: z.boolean(),
});

const defaultValues: CreateProgramFormValues = {
  departmentId: "",
  code: "",
  name: "",
  degreeType: "",
  durationYears: 4,
  totalCredits: 120,
  description: "",
  isActive: true,
};

export default function CreateProgram() {
  const router = useRouter();

  const { data: departmentsData, isLoading: departmentsLoading } =
    useGetAllDepartments({
      page: "1",
      limit: "100",
    });

  const { mutateAsync: createProgram, isPending } = useCreateProgram();

  const departments = departmentsData?.data?.data ?? [];

  const form = useForm({
    defaultValues,

    onSubmit: async ({ value }) => {
      try {
        // Validate form data before submitting
        const validatedData = createProgramSchema.parse(value);

        await createProgram({
          departmentId: validatedData.departmentId,
          code: validatedData.code.trim().toUpperCase(),
          name: validatedData.name.trim(),
          degreeType: validatedData.degreeType,
          durationYears: validatedData.durationYears,
          totalCredits: validatedData.totalCredits,
          description: validatedData.description?.trim() || undefined,
          isActive: validatedData.isActive,
        });

        router.push("/super-admin/programs");
        router.refresh();
      } catch (error) {
        console.error("Failed to create program:", error);
      }
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Create Program
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Create a new academic degree program.
            </p>
          </div>

          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex w-fit items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();

            void form.handleSubmit();
          }}
          className="rounded-xl border bg-card p-4 shadow-sm sm:p-6"
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Department */}
            <form.Field name="departmentId">
              {(field) => (
                <div className="space-y-2">
                  <label
                    htmlFor="departmentId"
                    className="text-sm font-medium"
                  >
                    Department <span className="text-red-500">*</span>
                  </label>

                  <select
                    id="departmentId"
                    name="departmentId"
                    value={field.state.value}
                    disabled={departmentsLoading || isPending}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">
                      {departmentsLoading
                        ? "Loading departments..."
                        : "Select department"}
                    </option>

                    {departments.map((department: any) => (
                      <option key={department.id} value={department.id}>
                        {department.code} - {department.name}
                      </option>
                    ))}
                  </select>

                  {field.state.meta.errors.length > 0 && (
                    <p className="text-xs text-red-500">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Program Code */}
            <form.Field name="code">
              {(field) => (
                <div className="space-y-2">
                  <label htmlFor="code" className="text-sm font-medium">
                    Program Code <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="code"
                    name="code"
                    type="text"
                    placeholder="e.g. CSE"
                    value={field.state.value}
                    disabled={isPending}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="h-10 w-full rounded-md border bg-background px-3 text-sm uppercase outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
                  />

                  {field.state.meta.errors.length > 0 && (
                    <p className="text-xs text-red-500">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Program Name */}
            <form.Field name="name">
              {(field) => (
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Program Name <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="e.g. Bachelor of Science in Computer Science and Engineering"
                    value={field.state.value}
                    disabled={isPending}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
                  />

                  {field.state.meta.errors.length > 0 && (
                    <p className="text-xs text-red-500">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Degree Type */}
            <form.Field name="degreeType">
              {(field) => (
                <div className="space-y-2">
                  <label
                    htmlFor="degreeType"
                    className="text-sm font-medium"
                  >
                    Degree Type <span className="text-red-500">*</span>
                  </label>

                  <select
                    id="degreeType"
                    name="degreeType"
                    value={field.state.value}
                    disabled={isPending}
                    onChange={(e) =>
                      field.handleChange(
                        e.target.value as DegreeType | ""
                      )
                    }
                    className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select degree type</option>
                    <option value="BACHELOR">Bachelor</option>
                    <option value="MASTER">Master</option>
                    <option value="PHD">PhD</option>
                  </select>

                  {field.state.meta.errors.length > 0 && (
                    <p className="text-xs text-red-500">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Duration */}
            <form.Field name="durationYears">
              {(field) => (
                <div className="space-y-2">
                  <label
                    htmlFor="durationYears"
                    className="text-sm font-medium"
                  >
                    Duration (Years) <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="durationYears"
                    name="durationYears"
                    type="number"
                    min={1}
                    max={10}
                    value={field.state.value}
                    disabled={isPending}
                    onChange={(e) =>
                      field.handleChange(Number(e.target.value))
                    }
                    className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
                  />

                  {field.state.meta.errors.length > 0 && (
                    <p className="text-xs text-red-500">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Total Credits */}
            <form.Field name="totalCredits">
              {(field) => (
                <div className="space-y-2">
                  <label
                    htmlFor="totalCredits"
                    className="text-sm font-medium"
                  >
                    Total Credits <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="totalCredits"
                    name="totalCredits"
                    type="number"
                    min={1}
                    value={field.state.value}
                    disabled={isPending}
                    onChange={(e) =>
                      field.handleChange(Number(e.target.value))
                    }
                    className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
                  />

                  {field.state.meta.errors.length > 0 && (
                    <p className="text-xs text-red-500">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Description */}
            <form.Field name="description">
              {(field) => (
                <div className="space-y-2 md:col-span-2">
                  <label
                    htmlFor="description"
                    className="text-sm font-medium"
                  >
                    Description
                  </label>

                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    placeholder="Enter a brief description of the program..."
                    value={field.state.value ?? ""}
                    disabled={isPending}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full resize-none rounded-md border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
                  />

                  {field.state.meta.errors.length > 0 && (
                    <p className="text-xs text-red-500">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Active */}
            <form.Field name="isActive">
              {(field) => (
                <div className="md:col-span-2">
                  <label
                    htmlFor="isActive"
                    className="flex cursor-pointer items-center gap-3"
                  >
                    <input
                      id="isActive"
                      name="isActive"
                      type="checkbox"
                      checked={field.state.value}
                      disabled={isPending}
                      onChange={(e) =>
                        field.handleChange(e.target.checked)
                      }
                      className="h-4 w-4 rounded border-gray-300"
                    />

                    <div>
                      <p className="text-sm font-medium">
                        Active Program
                      </p>

                      <p className="text-xs text-muted-foreground">
                        Students can be enrolled in this program when it is
                        active.
                      </p>
                    </div>
                  </label>

                  {field.state.meta.errors.length > 0 && (
                    <p className="mt-1 text-xs text-red-500">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
                </div>
              )}
            </form.Field>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => router.back()}
              disabled={isPending}
              className="inline-flex h-10 items-center justify-center rounded-md border px-5 text-sm font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending || departmentsLoading}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Create Program
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}