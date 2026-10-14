// import React from 'react'

// export default function TranscriptsPage() {
//     return (
//         <div>Transcripts Page</div>
//     )
// }













"use client";

import { useMemo, useState } from "react";
import {
    Award,
    BookOpen,
    CalendarDays,
    CheckCircle2,
    ChevronDown,
    Download,
    Eye,
    FileCheck2,
    FileText,
    GraduationCap,
    Search,
    ShieldCheck,
    X,
    Clock3,
    XCircle,
} from "lucide-react";

type TranscriptStatus = "Issued" | "Pending" | "Rejected";

type Transcript = {
    id: string;
    studentId: string;
    studentName: string;
    email: string;
    program: string;
    department: string;
    faculty: string;
    academicYear: string;
    semester: string;
    cgpa: number;
    earnedCredits: number;
    totalCredits: number;
    status: TranscriptStatus;
    issuedDate: string | null;
};

const initialTranscripts: Transcript[] = [
    {
        id: "TR-2026-001",
        studentId: "STU-2024-CSE-0001",
        studentName: "Nusrat Jahan",
        email: "nusrat.jahan@example.com",
        program: "B.Sc. in Computer Science",
        department: "Computer Science & Engineering",
        faculty: "Faculty of Engineering",
        academicYear: "2025–2026",
        semester: "Spring 2026",
        cgpa: 3.85,
        earnedCredits: 108,
        totalCredits: 144,
        status: "Issued",
        issuedDate: "2026-09-12",
    },
    {
        id: "TR-2026-002",
        studentId: "STU-2023-BBA-0002",
        studentName: "Mahmud Hasan",
        email: "mahmud.hasan@example.com",
        program: "Bachelor of Business Administration",
        department: "Business Administration",
        faculty: "Faculty of Business",
        academicYear: "2025–2026",
        semester: "Spring 2026",
        cgpa: 3.62,
        earnedCredits: 120,
        totalCredits: 132,
        status: "Pending",
        issuedDate: null,
    },
    {
        id: "TR-2026-003",
        studentId: "STU-2024-EEE-0003",
        studentName: "Sadia Akter",
        email: "sadia.akter@example.com",
        program: "B.Sc. in Electrical Engineering",
        department: "Electrical Engineering",
        faculty: "Faculty of Engineering",
        academicYear: "2025–2026",
        semester: "Spring 2026",
        cgpa: 3.42,
        earnedCredits: 96,
        totalCredits: 144,
        status: "Issued",
        issuedDate: "2026-09-15",
    },
    {
        id: "TR-2026-004",
        studentId: "STU-2022-ENG-0004",
        studentName: "Tanvir Ahmed",
        email: "tanvir.ahmed@example.com",
        program: "Bachelor of Arts in English",
        department: "English",
        faculty: "Faculty of Arts",
        academicYear: "2025–2026",
        semester: "Fall 2025",
        cgpa: 2.85,
        earnedCredits: 114,
        totalCredits: 120,
        status: "Rejected",
        issuedDate: null,
    },
    {
        id: "TR-2026-005",
        studentId: "STU-2023-CSE-0005",
        studentName: "Farhana Islam",
        email: "farhana.islam@example.com",
        program: "B.Sc. in Computer Science",
        department: "Computer Science & Engineering",
        faculty: "Faculty of Engineering",
        academicYear: "2025–2026",
        semester: "Spring 2026",
        cgpa: 3.91,
        earnedCredits: 126,
        totalCredits: 144,
        status: "Pending",
        issuedDate: null,
    },
    {
        id: "TR-2026-006",
        studentId: "STU-2024-BBA-0006",
        studentName: "Rakib Hossain",
        email: "rakib.hossain@example.com",
        program: "Bachelor of Business Administration",
        department: "Business Administration",
        faculty: "Faculty of Business",
        academicYear: "2025–2026",
        semester: "Spring 2026",
        cgpa: 3.25,
        earnedCredits: 90,
        totalCredits: 132,
        status: "Issued",
        issuedDate: "2026-09-18",
    },
];

const statusStyles: Record<TranscriptStatus, string> = {
    Issued: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    Pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
    Rejected: "bg-red-50 text-red-700 ring-red-600/20",
};

const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

export default function TranscriptsPage() {
    const [transcripts, setTranscripts] =
        useState<Transcript[]>(initialTranscripts);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [programFilter, setProgramFilter] = useState("all");
    const [selectedTranscript, setSelectedTranscript] =
        useState<Transcript | null>(null);
    const [notice, setNotice] = useState("");

    const filteredTranscripts = useMemo(() => {
        const query = search.trim().toLowerCase();

        return transcripts.filter((transcript) => {
            const matchesSearch =
                !query ||
                transcript.studentName.toLowerCase().includes(query) ||
                transcript.studentId.toLowerCase().includes(query) ||
                transcript.id.toLowerCase().includes(query) ||
                transcript.email.toLowerCase().includes(query);

            const matchesStatus =
                statusFilter === "all" ||
                transcript.status.toLowerCase() === statusFilter;

            const matchesProgram =
                programFilter === "all" ||
                transcript.program === programFilter;

            return matchesSearch && matchesStatus && matchesProgram;
        });
    }, [transcripts, search, statusFilter, programFilter]);

    const issuedCount = transcripts.filter(
        (item) => item.status === "Issued"
    ).length;

    const pendingCount = transcripts.filter(
        (item) => item.status === "Pending"
    ).length;

    const rejectedCount = transcripts.filter(
        (item) => item.status === "Rejected"
    ).length;

    const averageCgpa =
        transcripts.length > 0
            ? transcripts.reduce((sum, item) => sum + item.cgpa, 0) /
            transcripts.length
            : 0;

    const formatDate = (date: string | null) => {
        if (!date) return "Not issued";

        return new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }).format(new Date(`${date}T00:00:00`));
    };

    const handleStatusChange = (
        transcript: Transcript,
        status: TranscriptStatus
    ) => {
        if (
            status === "Rejected" &&
            !window.confirm(
                `Reject the transcript request for ${transcript.studentName}?`
            )
        ) {
            return;
        }

        setTranscripts((current) =>
            current.map((item) =>
                item.id === transcript.id
                    ? {
                        ...item,
                        status,
                        issuedDate:
                            status === "Issued"
                                ? new Date().toISOString().slice(0, 10)
                                : null,
                    }
                    : item
            )
        );

        setSelectedTranscript(null);
        setNotice(
            `Transcript ${transcript.id} marked as ${status.toLowerCase()}.`
        );
    };

    const handleExportCsv = () => {
        const headers = [
            "Transcript ID",
            "Student ID",
            "Student Name",
            "Email",
            "Program",
            "Academic Year",
            "Semester",
            "CGPA",
            "Earned Credits",
            "Total Credits",
            "Status",
            "Issued Date",
        ];

        const escapeCsv = (value: string | number) =>
            `"${String(value).replace(/"/g, '""')}"`;

        const rows = filteredTranscripts.map((item) => [
            item.id,
            item.studentId,
            item.studentName,
            item.email,
            item.program,
            item.academicYear,
            item.semester,
            item.cgpa.toFixed(2),
            item.earnedCredits,
            item.totalCredits,
            item.status,
            item.issuedDate ?? "",
        ]);

        const csv = [headers, ...rows]
            .map((row) => row.map(escapeCsv).join(","))
            .join("\r\n");

        const blob = new Blob(["\uFEFF", csv], {
            type: "text/csv;charset=utf-8;",
        });

        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");

        anchor.href = url;
        anchor.download = "campusflow-transcripts.csv";
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        URL.revokeObjectURL(url);

        setNotice("Transcript records exported successfully.");
    };

    const handlePrint = (transcript: Transcript) => {
        const printWindow = window.open("", "_blank", "width=900,height=700");

        if (!printWindow) {
            setNotice("Please allow pop-ups to print the transcript.");
            return;
        }

        const safe = (value: string | number) =>
            String(value).replace(/[&<>"']/g, (char) => {
                const entities: Record<string, string> = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;",
                };

                return entities[char];
            });

        printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <title>Transcript - ${safe(transcript.studentName)}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              color: #0f172a;
              padding: 48px;
              line-height: 1.6;
            }
            header {
              text-align: center;
              border-bottom: 2px solid #1e3a8a;
              padding-bottom: 20px;
              margin-bottom: 32px;
            }
            h1 { margin-bottom: 4px; }
            h2 { font-size: 16px; margin-top: 28px; }
            table { width: 100%; border-collapse: collapse; }
            td, th {
              border: 1px solid #cbd5e1;
              padding: 12px;
              text-align: left;
            }
            th { background: #f1f5f9; }
            footer { margin-top: 48px; font-size: 12px; color: #64748b; }
            @media print { body { padding: 0; } }
          </style>
        </head>
        <body>
          <header>
            <h1>CampusFlow University</h1>
            <p>Academic Transcript Summary</p>
            <strong>Transcript ID: ${safe(transcript.id)}</strong>
          </header>
          <h2>Student Information</h2>
          <table>
            <tr><th>Student Name</th><td>${safe(transcript.studentName)}</td></tr>
            <tr><th>Student ID</th><td>${safe(transcript.studentId)}</td></tr>
            <tr><th>Program</th><td>${safe(transcript.program)}</td></tr>
            <tr><th>Department</th><td>${safe(transcript.department)}</td></tr>
            <tr><th>Faculty</th><td>${safe(transcript.faculty)}</td></tr>
            <tr><th>Academic Year</th><td>${safe(transcript.academicYear)}</td></tr>
            <tr><th>Semester</th><td>${safe(transcript.semester)}</td></tr>
          </table>
          <h2>Academic Summary</h2>
          <table>
            <tr><th>CGPA</th><td>${safe(transcript.cgpa.toFixed(2))} / 4.00</td></tr>
            <tr><th>Earned Credits</th><td>${safe(transcript.earnedCredits)}</td></tr>
            <tr><th>Program Credits</th><td>${safe(transcript.totalCredits)}</td></tr>
            <tr><th>Status</th><td>${safe(transcript.status)}</td></tr>
            <tr><th>Issue Date</th><td>${safe(formatDate(transcript.issuedDate))}</td></tr>
          </table>
          <footer>
            This document is a sample transcript summary generated by the CampusFlow interface.
            It is not an official academic transcript.
          </footer>
          <script>window.onload = () => window.print();<\/script>
        </body>
      </html>
    `);

        printWindow.document.close();
    };

    return (
        <div className="min-h-screen bg-slate-50/70 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-[1600px] space-y-6">
                {/* Page header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                            <span>Administration</span>
                            <span>/</span>
                            <span>Academic</span>
                            <span>/</span>
                            <span className="font-medium text-blue-900">Transcripts</span>
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                            Transcripts
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                            Review student academic summaries, monitor transcript
                            requests, and manage transcript issuance.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleExportCsv}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        <Download size={18} />
                        Export CSV
                    </button>
                </div>

                {/* Feedback */}
                {notice && (
                    <div
                        role="status"
                        className="flex items-start justify-between gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-900"
                    >
                        <span>{notice}</span>
                        <button
                            type="button"
                            onClick={() => setNotice("")}
                            aria-label="Dismiss notification"
                            className="shrink-0 rounded-md p-0.5 hover:bg-blue-100"
                        >
                            <X size={16} />
                        </button>
                    </div>
                )}

                {/* Summary cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <SummaryCard
                        title="Total Requests"
                        value={transcripts.length}
                        description="All transcript records"
                        icon={<FileText size={21} />}
                        iconClass="bg-blue-50 text-blue-700"
                    />

                    <SummaryCard
                        title="Issued Transcripts"
                        value={issuedCount}
                        description="Marked as issued"
                        icon={<FileCheck2 size={21} />}
                        iconClass="bg-emerald-50 text-emerald-700"
                    />

                    <SummaryCard
                        title="Pending Requests"
                        value={pendingCount}
                        description="Awaiting administrative review"
                        icon={<Clock3 size={21} />}
                        iconClass="bg-amber-50 text-amber-700"
                    />

                    <SummaryCard
                        title="Average CGPA"
                        value={averageCgpa.toFixed(2)}
                        description="Across sample transcript records"
                        icon={<Award size={21} />}
                        iconClass="bg-violet-50 text-violet-700"
                    />
                </div>

                {/* Overview panel */}
                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-start gap-3">
                            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-800">
                                <GraduationCap size={23} />
                            </div>
                            <div>
                                <h2 className="font-semibold text-slate-900">
                                    Academic Records Overview
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Current transcript processing status.
                                </p>
                            </div>
                        </div>

                        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                            <CalendarDays size={14} />
                            Academic year 2025–2026
                        </span>
                    </div>

                    <div className="mt-6 grid gap-5 sm:grid-cols-3">
                        <StatusOverview
                            label="Issued"
                            count={issuedCount}
                            total={transcripts.length}
                            color="bg-emerald-500"
                            textColor="text-emerald-700"
                        />
                        <StatusOverview
                            label="Pending"
                            count={pendingCount}
                            total={transcripts.length}
                            color="bg-amber-500"
                            textColor="text-amber-700"
                        />
                        <StatusOverview
                            label="Rejected"
                            count={rejectedCount}
                            total={transcripts.length}
                            color="bg-red-500"
                            textColor="text-red-700"
                        />
                    </div>
                </section>

                {/* Transcript records */}
                <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex flex-col gap-4 border-b border-slate-100 p-5 xl:flex-row xl:items-center xl:justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900">
                                Transcript Records
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Search and review student transcript requests.
                            </p>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2 xl:flex">
                            <div className="relative xl:w-64">
                                <Search
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />
                                <input
                                    type="search"
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                    placeholder="Search name, ID, email..."
                                    aria-label="Search transcript records"
                                    className={`${inputClass} pl-10`}
                                />
                            </div>

                            <div className="relative">
                                <select
                                    value={statusFilter}
                                    onChange={(event) => setStatusFilter(event.target.value)}
                                    aria-label="Filter by transcript status"
                                    className={`${inputClass} appearance-none pr-10 sm:min-w-[150px]`}
                                >
                                    <option value="all">All statuses</option>
                                    <option value="issued">Issued</option>
                                    <option value="pending">Pending</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                                <ChevronDown
                                    size={16}
                                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />
                            </div>

                            <div className="relative sm:col-span-2 xl:col-span-1">
                                <select
                                    value={programFilter}
                                    onChange={(event) => setProgramFilter(event.target.value)}
                                    aria-label="Filter by academic program"
                                    className={`${inputClass} appearance-none pr-10 xl:min-w-[210px]`}
                                >
                                    <option value="all">All programs</option>
                                    {Array.from(
                                        new Set(transcripts.map((item) => item.program))
                                    ).map((program) => (
                                        <option key={program} value={program}>
                                            {program}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown
                                    size={16}
                                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1050px] text-left">
                            <thead>
                                <tr className="bg-slate-50/80">
                                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Student
                                    </th>
                                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Program / Semester
                                    </th>
                                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        CGPA
                                    </th>
                                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Credits
                                    </th>
                                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Status
                                    </th>
                                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Issue Date
                                    </th>
                                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {filteredTranscripts.map((transcript) => (
                                    <tr
                                        key={transcript.id}
                                        className="transition hover:bg-slate-50/70"
                                    >
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-900">
                                                    {transcript.studentName
                                                        .split(" ")
                                                        .map((part) => part[0])
                                                        .slice(0, 2)
                                                        .join("")
                                                        .toUpperCase()}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-semibold text-slate-900">
                                                        {transcript.studentName}
                                                    </p>
                                                    <p className="mt-1 text-xs text-slate-500">
                                                        {transcript.studentId}
                                                    </p>
                                                    <p className="mt-1 text-xs text-slate-400">
                                                        {transcript.id}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-5 py-4">
                                            <p className="max-w-[230px] text-sm font-medium text-slate-800">
                                                {transcript.program}
                                            </p>
                                            <p className="mt-1 text-xs text-slate-500">
                                                {transcript.semester} · {transcript.academicYear}
                                            </p>
                                        </td>

                                        <td className="px-5 py-4">
                                            <span className="font-semibold tabular-nums text-slate-900">
                                                {transcript.cgpa.toFixed(2)}
                                            </span>
                                            <span className="text-xs text-slate-400"> / 4.00</span>
                                        </td>

                                        <td className="px-5 py-4">
                                            <p className="text-sm font-medium tabular-nums text-slate-800">
                                                {transcript.earnedCredits}
                                                <span className="text-slate-400">
                                                    {" "}
                                                    / {transcript.totalCredits}
                                                </span>
                                            </p>
                                            <div className="mt-2 h-1.5 w-24 overflow-hidden rounded-full bg-slate-100">
                                                <div
                                                    className="h-full rounded-full bg-blue-600"
                                                    style={{
                                                        width: `${transcript.totalCredits > 0
                                                            ? Math.min(
                                                                100,
                                                                (transcript.earnedCredits /
                                                                    transcript.totalCredits) *
                                                                100
                                                            )
                                                            : 0
                                                            }%`,
                                                    }}
                                                />
                                            </div>
                                        </td>

                                        <td className="px-5 py-4">
                                            <span
                                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusStyles[transcript.status]}`}
                                            >
                                                {transcript.status === "Issued" ? (
                                                    <CheckCircle2 size={13} />
                                                ) : transcript.status === "Pending" ? (
                                                    <Clock3 size={13} />
                                                ) : (
                                                    <XCircle size={13} />
                                                )}
                                                {transcript.status}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4 text-sm text-slate-600">
                                            {formatDate(transcript.issuedDate)}
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex items-center justify-end gap-1">
                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedTranscript(transcript)}
                                                    aria-label={`View transcript for ${transcript.studentName}`}
                                                    title="View transcript"
                                                    className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-800"
                                                >
                                                    <Eye size={17} />
                                                </button>

                                                {transcript.status === "Issued" && (
                                                    <button
                                                        type="button"
                                                        onClick={() => handlePrint(transcript)}
                                                        aria-label={`Print transcript for ${transcript.studentName}`}
                                                        title="Print transcript"
                                                        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                                                    >
                                                        <Download size={17} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {filteredTranscripts.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="px-5 py-16 text-center">
                                            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                                                <Search size={22} />
                                            </div>
                                            <p className="mt-3 text-sm font-semibold text-slate-800">
                                                No transcript records found
                                            </p>
                                            <p className="mt-1 text-sm text-slate-500">
                                                Try changing your search or filters.
                                            </p>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSearch("");
                                                    setStatusFilter("all");
                                                    setProgramFilter("all");
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

                    <div className="flex flex-col gap-2 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-slate-500">
                            Showing{" "}
                            <span className="font-semibold text-slate-800">
                                {filteredTranscripts.length}
                            </span>{" "}
                            of{" "}
                            <span className="font-semibold text-slate-800">
                                {transcripts.length}
                            </span>{" "}
                            records
                        </p>
                        <p className="text-xs text-slate-400">
                            Transcript records are sample data.
                        </p>
                    </div>
                </section>

                {/* Policy notice */}
                <section className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-800 shadow-sm">
                        <ShieldCheck size={21} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-900">
                            Transcript integrity
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-slate-600">
                            Official transcripts should be generated from verified grades,
                            approved academic records, and authorized student data. Issuance,
                            rejection, and downloads should be permission-controlled and
                            recorded in your audit logs.
                        </p>
                    </div>
                </section>
            </div>

            {/* Transcript details modal */}
            {selectedTranscript && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-[2px]"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setSelectedTranscript(null);
                        }
                    }}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="transcript-modal-title"
                        className="my-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
                    >
                        <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-5 sm:p-6">
                            <div className="flex items-start gap-3">
                                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-800">
                                    <FileCheck2 size={22} />
                                </div>
                                <div>
                                    <h2
                                        id="transcript-modal-title"
                                        className="text-lg font-bold text-slate-900"
                                    >
                                        Transcript Details
                                    </h2>
                                    <p className="mt-1 text-sm text-slate-500">
                                        {selectedTranscript.id}
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setSelectedTranscript(null)}
                                aria-label="Close transcript details"
                                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
                            >
                                <X size={19} />
                            </button>
                        </div>

                        <div className="max-h-[65vh] space-y-6 overflow-y-auto p-5 sm:p-6">
                            <div className="flex items-center gap-4">
                                <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-lg font-bold text-blue-900">
                                    {selectedTranscript.studentName
                                        .split(" ")
                                        .map((part) => part[0])
                                        .slice(0, 2)
                                        .join("")
                                        .toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-lg font-semibold text-slate-900">
                                        {selectedTranscript.studentName}
                                    </h3>
                                    <p className="mt-1 break-all text-sm text-slate-500">
                                        {selectedTranscript.email}
                                    </p>
                                    <p className="mt-1 text-xs text-slate-500">
                                        {selectedTranscript.studentId}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-3 text-sm font-semibold text-slate-900">
                                    Academic Information
                                </h3>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <DetailItem
                                        label="Program"
                                        value={selectedTranscript.program}
                                    />
                                    <DetailItem
                                        label="Department"
                                        value={selectedTranscript.department}
                                    />
                                    <DetailItem
                                        label="Faculty"
                                        value={selectedTranscript.faculty}
                                    />
                                    <DetailItem
                                        label="Academic Year"
                                        value={selectedTranscript.academicYear}
                                    />
                                    <DetailItem
                                        label="Semester"
                                        value={selectedTranscript.semester}
                                    />
                                    <DetailItem
                                        label="Issue Date"
                                        value={formatDate(selectedTranscript.issuedDate)}
                                    />
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-3 text-sm font-semibold text-slate-900">
                                    Academic Performance
                                </h3>
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                    <MetricCard
                                        label="CGPA"
                                        value={`${selectedTranscript.cgpa.toFixed(2)} / 4.00`}
                                    />
                                    <MetricCard
                                        label="Earned Credits"
                                        value={selectedTranscript.earnedCredits}
                                    />
                                    <MetricCard
                                        label="Program Credits"
                                        value={selectedTranscript.totalCredits}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-4">
                                <div>
                                    <p className="text-sm font-medium text-slate-700">
                                        Transcript Status
                                    </p>
                                    <span
                                        className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusStyles[selectedTranscript.status]}`}
                                    >
                                        {selectedTranscript.status}
                                    </span>
                                </div>
                                <p className="text-right text-xs text-slate-500">
                                    {selectedTranscript.status === "Issued"
                                        ? "Ready for printing"
                                        : selectedTranscript.status === "Pending"
                                            ? "Awaiting review"
                                            : "Request rejected"}
                                </p>
                            </div>

                            {selectedTranscript.status === "Pending" && (
                                <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm leading-5 text-amber-800">
                                    Verify academic records and grade approvals before issuing
                                    this transcript.
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                            <button
                                type="button"
                                onClick={() => setSelectedTranscript(null)}
                                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                                Close
                            </button>

                            <div className="flex flex-col gap-2 sm:flex-row">
                                {selectedTranscript.status === "Pending" && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleStatusChange(selectedTranscript, "Rejected")
                                            }
                                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-50"
                                        >
                                            <XCircle size={16} />
                                            Reject
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleStatusChange(selectedTranscript, "Issued")
                                            }
                                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
                                        >
                                            <CheckCircle2 size={16} />
                                            Approve & Issue
                                        </button>
                                    </>
                                )}

                                {selectedTranscript.status === "Issued" && (
                                    <button
                                        type="button"
                                        onClick={() => handlePrint(selectedTranscript)}
                                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
                                    >
                                        <Download size={16} />
                                        Print Transcript
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
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
            <p className="mt-3 text-xs leading-5 text-slate-500">{description}</p>
        </div>
    );
}

function StatusOverview({
    label,
    count,
    total,
    color,
    textColor,
}: {
    label: string;
    count: number;
    total: number;
    color: string;
    textColor: string;
}) {
    const percentage = total > 0 ? (count / total) * 100 : 0;

    return (
        <div>
            <div className="mb-2 flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-slate-600">{label}</span>
                <span className={`text-sm font-bold ${textColor}`}>
                    {count}{" "}
                    <span className="font-normal text-slate-400">
                        ({percentage.toFixed(0)}%)
                    </span>
                </span>
            </div>
            <div
                className="h-2 overflow-hidden rounded-full bg-slate-100"
                role="progressbar"
                aria-label={`${label} transcript percentage`}
                aria-valuenow={Math.round(percentage)}
                aria-valuemin={0}
                aria-valuemax={100}
            >
                <div
                    className={`h-full rounded-full transition-all ${color}`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}

function DetailItem({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="min-w-0 rounded-xl border border-slate-100 bg-slate-50/70 p-3.5">
            <p className="text-xs font-medium text-slate-500">{label}</p>
            <p className="mt-1 break-words text-sm font-medium leading-5 text-slate-800">
                {value}
            </p>
        </div>
    );
}

function MetricCard({
    label,
    value,
}: {
    label: string;
    value: string | number;
}) {
    return (
        <div className="rounded-xl border border-slate-200 p-4">
            <p className="text-xs font-medium text-slate-500">{label}</p>
            <p className="mt-2 text-lg font-bold text-slate-900">{value}</p>
        </div>
    );
}