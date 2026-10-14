// import React from 'react'

// export default function GradeScales() {
//     return (
//         <div>Grade Scales</div>
//     )
// }













"use client";

import { useMemo, useState } from "react";
import {
    Award,
    BookOpen,
    Check,
    ChevronDown,
    CirclePlus,
    Edit2,
    GraduationCap,
    MoreHorizontal,
    Search,
    Settings2,
    ShieldCheck,
    Trash2,
    TrendingUp,
    X,
} from "lucide-react";

type GradeScale = {
    id: string;
    grade: string;
    minMark: number;
    maxMark: number;
    gradePoint: number;
    remark: string;
    color: string;
};

const initialGrades: GradeScale[] = [
    {
        id: "1",
        grade: "A+",
        minMark: 80,
        maxMark: 100,
        gradePoint: 4.0,
        remark: "Outstanding",
        color: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    },
    {
        id: "2",
        grade: "A",
        minMark: 75,
        maxMark: 79,
        gradePoint: 3.75,
        remark: "Excellent",
        color: "bg-green-50 text-green-700 ring-green-600/20",
    },
    {
        id: "3",
        grade: "A-",
        minMark: 70,
        maxMark: 74,
        gradePoint: 3.5,
        remark: "Very Good",
        color: "bg-lime-50 text-lime-700 ring-lime-600/20",
    },
    {
        id: "4",
        grade: "B+",
        minMark: 65,
        maxMark: 69,
        gradePoint: 3.25,
        remark: "Good",
        color: "bg-sky-50 text-sky-700 ring-sky-600/20",
    },
    {
        id: "5",
        grade: "B",
        minMark: 60,
        maxMark: 64,
        gradePoint: 3.0,
        remark: "Above Average",
        color: "bg-blue-50 text-blue-700 ring-blue-600/20",
    },
    {
        id: "6",
        grade: "B-",
        minMark: 55,
        maxMark: 59,
        gradePoint: 2.75,
        remark: "Average",
        color: "bg-indigo-50 text-indigo-700 ring-indigo-600/20",
    },
    {
        id: "7",
        grade: "C+",
        minMark: 50,
        maxMark: 54,
        gradePoint: 2.5,
        remark: "Below Average",
        color: "bg-violet-50 text-violet-700 ring-violet-600/20",
    },
    {
        id: "8",
        grade: "C",
        minMark: 45,
        maxMark: 49,
        gradePoint: 2.25,
        remark: "Satisfactory",
        color: "bg-purple-50 text-purple-700 ring-purple-600/20",
    },
    {
        id: "9",
        grade: "D",
        minMark: 40,
        maxMark: 44,
        gradePoint: 2.0,
        remark: "Pass",
        color: "bg-amber-50 text-amber-700 ring-amber-600/20",
    },
    {
        id: "10",
        grade: "F",
        minMark: 0,
        maxMark: 39,
        gradePoint: 0.0,
        remark: "Fail",
        color: "bg-red-50 text-red-700 ring-red-600/20",
    },
];

const gradeColors = [
    "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    "bg-green-50 text-green-700 ring-green-600/20",
    "bg-lime-50 text-lime-700 ring-lime-600/20",
    "bg-sky-50 text-sky-700 ring-sky-600/20",
    "bg-blue-50 text-blue-700 ring-blue-600/20",
    "bg-indigo-50 text-indigo-700 ring-indigo-600/20",
    "bg-violet-50 text-violet-700 ring-violet-600/20",
    "bg-purple-50 text-purple-700 ring-purple-600/20",
    "bg-amber-50 text-amber-700 ring-amber-600/20",
    "bg-red-50 text-red-700 ring-red-600/20",
];

const emptyForm = {
    grade: "",
    minMark: "",
    maxMark: "",
    gradePoint: "",
    remark: "",
};

type GradeForm = typeof emptyForm;

export default function GradeScales() {
    const [grades, setGrades] = useState<GradeScale[]>(initialGrades);
    const [search, setSearch] = useState("");
    const [resultFilter, setResultFilter] = useState("all");
    const [selectedScheme, setSelectedScheme] = useState("standard");
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState<GradeForm>(emptyForm);
    const [error, setError] = useState("");

    const filteredGrades = useMemo(() => {
        return grades
            .filter((item) => {
                const query = search.trim().toLowerCase();

                const matchesSearch =
                    !query ||
                    item.grade.toLowerCase().includes(query) ||
                    item.remark.toLowerCase().includes(query);

                const matchesFilter =
                    resultFilter === "all" ||
                    (resultFilter === "pass" && item.gradePoint > 0) ||
                    (resultFilter === "fail" && item.gradePoint === 0);

                return matchesSearch && matchesFilter;
            })
            .sort((a, b) => b.minMark - a.minMark);
    }, [grades, search, resultFilter]);

    const highestGrade = grades.reduce(
        (highest, current) =>
            current.gradePoint > highest.gradePoint ? current : highest,
        grades[0] ?? {
            grade: "—",
            gradePoint: 0,
        }
    );

    const passingGrades = grades.filter(
        (grade) => grade.gradePoint > 0
    ).length;

    const openCreateForm = () => {
        setEditingId(null);
        setForm(emptyForm);
        setError("");
        setShowForm(true);
    };

    const openEditForm = (grade: GradeScale) => {
        setEditingId(grade.id);
        setForm({
            grade: grade.grade,
            minMark: String(grade.minMark),
            maxMark: String(grade.maxMark),
            gradePoint: String(grade.gradePoint),
            remark: grade.remark,
        });
        setError("");
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingId(null);
        setForm(emptyForm);
        setError("");
    };

    const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");

        const grade = form.grade.trim().toUpperCase();
        const minMark = Number(form.minMark);
        const maxMark = Number(form.maxMark);
        const gradePoint = Number(form.gradePoint);
        const remark = form.remark.trim();

        if (
            !grade ||
            form.minMark === "" ||
            form.maxMark === "" ||
            form.gradePoint === "" ||
            !remark
        ) {
            setError("Please complete all fields.");
            return;
        }

        if (
            !Number.isFinite(minMark) ||
            !Number.isFinite(maxMark) ||
            !Number.isFinite(gradePoint) ||
            minMark < 0 ||
            maxMark > 100 ||
            minMark > maxMark
        ) {
            setError("Enter a valid mark range between 0 and 100.");
            return;
        }

        if (gradePoint < 0 || gradePoint > 4) {
            setError("Grade point must be between 0 and 4.");
            return;
        }

        const duplicateGrade = grades.some(
            (item) =>
                item.grade.toLowerCase() === grade.toLowerCase() &&
                item.id !== editingId
        );

        if (duplicateGrade) {
            setError("This grade already exists.");
            return;
        }

        const overlaps = grades.some((item) => {
            if (item.id === editingId) return false;

            return minMark <= item.maxMark && maxMark >= item.minMark;
        });

        if (overlaps) {
            setError(
                "This mark range overlaps an existing grade range. Update the ranges first."
            );
            return;
        }

        if (editingId) {
            setGrades((current) =>
                current.map((item) =>
                    item.id === editingId
                        ? {
                            ...item,
                            grade,
                            minMark,
                            maxMark,
                            gradePoint,
                            remark,
                        }
                        : item
                )
            );
        } else {
            setGrades((current) => [
                ...current,
                {
                    id: `${Date.now()}`,
                    grade,
                    minMark,
                    maxMark,
                    gradePoint,
                    remark,
                    color: gradeColors[grades.length % gradeColors.length],
                },
            ]);
        }

        closeForm();
    };

    const handleDelete = (grade: GradeScale) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete grade "${grade.grade}"?`
        );

        if (!confirmed) return;

        setGrades((current) =>
            current.filter((item) => item.id !== grade.id)
        );
    };

    const handleReset = () => {
        const confirmed = window.confirm(
            "Reset all grading rules to the default sample configuration?"
        );

        if (!confirmed) return;

        setGrades(initialGrades);
        setSearch("");
        setResultFilter("all");
    };

    return (
        <div className="min-h-screen bg-slate-50/70 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-[1600px] space-y-6">
                {/* Page heading */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                            <span>Administration</span>
                            <span>/</span>
                            <span>Academic</span>
                            <span>/</span>
                            <span className="font-medium text-blue-900">
                                Grade Scales
                            </span>
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                            Grade Scales
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                            Configure grading rules, grade points, and passing criteria
                            for your university&apos;s academic evaluation system.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={openCreateForm}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        <CirclePlus size={18} />
                        Add Grade Rule
                    </button>
                </div>

                {/* Summary cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <SummaryCard
                        title="Total Grade Rules"
                        value={grades.length}
                        description="Configured grading bands"
                        icon={<BookOpen size={21} />}
                        iconClass="bg-blue-50 text-blue-700"
                    />

                    <SummaryCard
                        title="Passing Grades"
                        value={passingGrades}
                        description="Grade point greater than zero"
                        icon={<Check size={21} />}
                        iconClass="bg-emerald-50 text-emerald-700"
                    />

                    <SummaryCard
                        title="Highest Grade"
                        value={highestGrade.grade}
                        description={`${highestGrade.gradePoint.toFixed(2)} grade points`}
                        icon={<Award size={21} />}
                        iconClass="bg-amber-50 text-amber-700"
                    />

                    <SummaryCard
                        title="Maximum Marks"
                        value="100"
                        description="Standard percentage-based scale"
                        icon={<TrendingUp size={21} />}
                        iconClass="bg-violet-50 text-violet-700"
                    />
                </div>

                {/* Active grading scheme */}
                <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-start gap-3">
                            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-800">
                                <Settings2 size={22} />
                            </div>

                            <div>
                                <h2 className="font-semibold text-slate-900">
                                    Grading Configuration
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Select the grading scheme you want to configure.
                                </p>
                            </div>
                        </div>

                        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                            <span className="size-2 rounded-full bg-emerald-500" />
                            Sample configuration
                        </span>
                    </div>

                    <div className="grid gap-5 p-5 md:grid-cols-2 xl:grid-cols-3">
                        <div className="space-y-2">
                            <label
                                htmlFor="grading-scheme"
                                className="text-sm font-medium text-slate-700"
                            >
                                Grading Scheme
                            </label>

                            <div className="relative">
                                <select
                                    id="grading-scheme"
                                    value={selectedScheme}
                                    onChange={(event) =>
                                        setSelectedScheme(event.target.value)
                                    }
                                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                >
                                    <option value="standard">
                                        Standard Undergraduate (4.00)
                                    </option>
                                    <option value="graduate">
                                        Graduate Grading (4.00)
                                    </option>
                                    <option value="custom">Custom Grading Scheme</option>
                                </select>

                                <ChevronDown
                                    size={17}
                                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">
                                Evaluation Method
                            </label>
                            <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
                                <GraduationCap size={19} className="text-blue-800" />
                                <div>
                                    <p className="text-sm font-medium text-slate-800">
                                        Percentage Based
                                    </p>
                                    <p className="mt-0.5 text-xs text-slate-500">
                                        Marks converted to letter grades
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">
                                Academic Standard
                            </label>
                            <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
                                <ShieldCheck size={19} className="text-emerald-700" />
                                <div>
                                    <p className="text-sm font-medium text-slate-800">
                                        4.00 Grade Point Scale
                                    </p>
                                    <p className="mt-0.5 text-xs text-slate-500">
                                        Maximum grade point: 4.00
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {selectedScheme !== "standard" && (
                        <div className="border-t border-amber-100 bg-amber-50/70 px-5 py-3 text-sm text-amber-800">
                            This is a UI demonstration. Switching schemes does not load
                            separate grading rules until backend integration is added.
                        </div>
                    )}
                </section>

                {/* Grade rules table */}
                <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex flex-col gap-4 border-b border-slate-100 p-5 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900">
                                Grade Rules
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Manage mark ranges and their corresponding grade points.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <div className="relative sm:min-w-[230px]">
                                <Search
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />
                                <input
                                    type="search"
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                    placeholder="Search grades..."
                                    aria-label="Search grades"
                                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            <div className="relative">
                                <select
                                    value={resultFilter}
                                    onChange={(event) =>
                                        setResultFilter(event.target.value)
                                    }
                                    aria-label="Filter grade rules"
                                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:min-w-[145px]"
                                >
                                    <option value="all">All grades</option>
                                    <option value="pass">Passing grades</option>
                                    <option value="fail">Failing grades</option>
                                </select>
                                <ChevronDown
                                    size={16}
                                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[760px] border-collapse text-left">
                            <thead>
                                <tr className="bg-slate-50/80">
                                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Letter Grade
                                    </th>
                                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Marks Range
                                    </th>
                                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Grade Point
                                    </th>
                                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Remarks
                                    </th>
                                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Result
                                    </th>
                                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {filteredGrades.map((grade) => (
                                    <tr
                                        key={grade.id}
                                        className="transition hover:bg-slate-50/70"
                                    >
                                        <td className="px-5 py-4">
                                            <span
                                                className={`inline-flex min-w-12 items-center justify-center rounded-lg px-3 py-1.5 text-sm font-bold ring-1 ring-inset ${grade.color}`}
                                            >
                                                {grade.grade}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <span className="min-w-[70px] text-sm font-medium tabular-nums text-slate-800">
                                                    {grade.minMark}–{grade.maxMark}
                                                </span>
                                                <div className="hidden h-1.5 w-24 overflow-hidden rounded-full bg-slate-100 sm:block">
                                                    <div
                                                        className={`h-full rounded-full ${grade.gradePoint === 0
                                                            ? "bg-red-400"
                                                            : "bg-blue-600"
                                                            }`}
                                                        style={{
                                                            width: `${grade.maxMark - grade.minMark + 1}%`,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-5 py-4">
                                            <span className="text-sm font-semibold tabular-nums text-slate-800">
                                                {grade.gradePoint.toFixed(2)}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4 text-sm text-slate-600">
                                            {grade.remark}
                                        </td>

                                        <td className="px-5 py-4">
                                            <span
                                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${grade.gradePoint > 0
                                                    ? "bg-emerald-50 text-emerald-700"
                                                    : "bg-red-50 text-red-700"
                                                    }`}
                                            >
                                                <span
                                                    className={`size-1.5 rounded-full ${grade.gradePoint > 0
                                                        ? "bg-emerald-500"
                                                        : "bg-red-500"
                                                        }`}
                                                />
                                                {grade.gradePoint > 0 ? "Pass" : "Fail"}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex items-center justify-end gap-1">
                                                <button
                                                    type="button"
                                                    onClick={() => openEditForm(grade)}
                                                    aria-label={`Edit grade ${grade.grade}`}
                                                    title="Edit grade"
                                                    className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                >
                                                    <Edit2 size={16} />
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(grade)}
                                                    aria-label={`Delete grade ${grade.grade}`}
                                                    title="Delete grade"
                                                    className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                                >
                                                    <Trash2 size={16} />
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => openEditForm(grade)}
                                                    aria-label={`More options for grade ${grade.grade}`}
                                                    title="More options"
                                                    className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                                                >
                                                    <MoreHorizontal size={17} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {filteredGrades.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-5 py-16 text-center">
                                            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                                                <Search size={22} />
                                            </div>
                                            <p className="mt-3 text-sm font-semibold text-slate-800">
                                                No grade rules found
                                            </p>
                                            <p className="mt-1 text-sm text-slate-500">
                                                Try a different search term or filter.
                                            </p>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSearch("");
                                                    setResultFilter("all");
                                                }}
                                                className="mt-3 text-sm font-semibold text-blue-800 hover:underline"
                                            >
                                                Clear filters
                                            </button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-slate-500">
                            Showing{" "}
                            <span className="font-semibold text-slate-800">
                                {filteredGrades.length}
                            </span>{" "}
                            of{" "}
                            <span className="font-semibold text-slate-800">
                                {grades.length}
                            </span>{" "}
                            grade rules
                        </p>

                        <button
                            type="button"
                            onClick={handleReset}
                            className="inline-flex items-center justify-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-800"
                        >
                            <Settings2 size={16} />
                            Reset sample rules
                        </button>
                    </div>
                </section>

                {/* Information panel */}
                <section className="flex flex-col gap-4 rounded-2xl border border-blue-100 bg-blue-50/60 p-5 sm:flex-row sm:items-start">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-800 shadow-sm">
                        <ShieldCheck size={21} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-900">
                            Grading policy and academic integrity
                        </h3>
                        <p className="mt-1 max-w-4xl text-sm leading-6 text-slate-600">
                            Ensure that grade ranges do not overlap and that every
                            possible mark maps to the intended grade. Changes to grading
                            rules may affect academic results and transcripts, so
                            production updates should be authorized, validated, and
                            recorded in the audit log.
                        </p>
                    </div>
                </section>
            </div>

            {/* Create / edit grade dialog */}
            {showForm && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-[2px]"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) closeForm();
                    }}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="grade-form-title"
                        className="my-auto w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
                    >
                        <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
                            <div>
                                <h2
                                    id="grade-form-title"
                                    className="text-lg font-bold text-slate-900"
                                >
                                    {editingId ? "Edit Grade Rule" : "Add Grade Rule"}
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Define the grade, mark range, and grade point.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={closeForm}
                                aria-label="Close form"
                                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                            >
                                <X size={19} />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="space-y-5 p-5 sm:p-6">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <FormField label="Letter Grade" htmlFor="grade">
                                    <input
                                        id="grade"
                                        value={form.grade}
                                        onChange={(event) =>
                                            setForm({ ...form, grade: event.target.value })
                                        }
                                        placeholder="e.g. A+"
                                        maxLength={10}
                                        required
                                        className={inputClass}
                                    />
                                </FormField>

                                <FormField label="Grade Point" htmlFor="gradePoint">
                                    <input
                                        id="gradePoint"
                                        type="number"
                                        min="0"
                                        max="4"
                                        step="0.01"
                                        value={form.gradePoint}
                                        onChange={(event) =>
                                            setForm({ ...form, gradePoint: event.target.value })
                                        }
                                        placeholder="e.g. 4.00"
                                        required
                                        className={inputClass}
                                    />
                                </FormField>

                                <FormField label="Minimum Marks" htmlFor="minMark">
                                    <input
                                        id="minMark"
                                        type="number"
                                        min="0"
                                        max="100"
                                        step="1"
                                        value={form.minMark}
                                        onChange={(event) =>
                                            setForm({ ...form, minMark: event.target.value })
                                        }
                                        placeholder="0"
                                        required
                                        className={inputClass}
                                    />
                                </FormField>

                                <FormField label="Maximum Marks" htmlFor="maxMark">
                                    <input
                                        id="maxMark"
                                        type="number"
                                        min="0"
                                        max="100"
                                        step="1"
                                        value={form.maxMark}
                                        onChange={(event) =>
                                            setForm({ ...form, maxMark: event.target.value })
                                        }
                                        placeholder="100"
                                        required
                                        className={inputClass}
                                    />
                                </FormField>
                            </div>

                            <FormField label="Remarks" htmlFor="remark">
                                <input
                                    id="remark"
                                    value={form.remark}
                                    onChange={(event) =>
                                        setForm({ ...form, remark: event.target.value })
                                    }
                                    placeholder="e.g. Excellent"
                                    maxLength={100}
                                    required
                                    className={inputClass}
                                />
                            </FormField>

                            {error && (
                                <div
                                    role="alert"
                                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700"
                                >
                                    {error}
                                </div>
                            )}

                            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={closeForm}
                                    className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    <Check size={17} />
                                    {editingId ? "Save Changes" : "Create Grade Rule"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

function SummaryCard({
    title,
    value,
    description,
    icon,
    iconClass,
}: {
    title: string;
    value: string | number;
    description: string;
    icon: React.ReactNode;
    iconClass: string;
}) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-sm font-medium text-slate-500">{title}</p>
                    <p className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
                        {value}
                    </p>
                </div>

                <div
                    className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
                >
                    {icon}
                </div>
            </div>

            <p className="mt-3 text-xs leading-5 text-slate-500">
                {description}
            </p>
        </div>
    );
}

function FormField({
    label,
    htmlFor,
    children,
}: {
    label: string;
    htmlFor: string;
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-2">
            <label
                htmlFor={htmlFor}
                className="text-sm font-medium text-slate-700"
            >
                {label}
            </label>
            {children}
        </div>
    );
}