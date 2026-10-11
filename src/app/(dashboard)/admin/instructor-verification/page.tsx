
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
    Search,
    ShieldCheck,
    Clock3,
    CheckCircle2,
    XCircle,
    Eye,
    MoreHorizontal,
    GraduationCap,
    Mail,
    Building2,
    CalendarDays,
    FileText,
    ArrowUpRight,
    RefreshCw,
    UserCheck,
    UserX,
    CircleAlert,
    Filter,
    ChevronLeft,
    ChevronRight,
    X,
} from "lucide-react";

type VerificationStatus = "PENDING" | "VERIFIED" | "REJECTED";

type InstructorApplication = {
    id: string;
    name: string;
    email: string;
    department: string;
    qualification: string;
    experience: string;
    submittedAt: string;
    status: VerificationStatus;
    bio: string;
    documents: string[];
};

const initialApplications: InstructorApplication[] = [
    {
        id: "INS-2026-001",
        name: "Tanvir Ahmed",
        email: "tanvir.ahmed@example.com",
        department: "Computer Science",
        qualification: "M.Sc. in Computer Science",
        experience: "5 years",
        submittedAt: "2026-10-08",
        status: "PENDING",
        bio: "Experienced software engineering educator with interests in algorithms, web development, and database systems.",
        documents: ["Academic Certificate", "CV / Resume", "Identity Document"],
    },
    {
        id: "INS-2026-002",
        name: "Nusrat Jahan",
        email: "nusrat.jahan@example.com",
        department: "Business Administration",
        qualification: "MBA",
        experience: "4 years",
        submittedAt: "2026-10-07",
        status: "PENDING",
        bio: "Business administration professional with experience in management, organizational strategy, and teaching.",
        documents: ["Academic Certificate", "CV / Resume"],
    },
    {
        id: "INS-2026-003",
        name: "Mahmud Hasan",
        email: "mahmud.hasan@example.com",
        department: "Electrical Engineering",
        qualification: "M.Sc. in Electrical Engineering",
        experience: "7 years",
        submittedAt: "2026-10-05",
        status: "VERIFIED",
        bio: "Electrical engineering instructor with experience in electronics and power systems.",
        documents: ["Academic Certificate", "CV / Resume", "Identity Document"],
    },
    {
        id: "INS-2026-004",
        name: "Farhana Akter",
        email: "farhana.akter@example.com",
        department: "Mathematics",
        qualification: "M.Sc. in Mathematics",
        experience: "3 years",
        submittedAt: "2026-10-04",
        status: "PENDING",
        bio: "Mathematics educator focused on applied mathematics, statistics, and undergraduate instruction.",
        documents: ["Academic Certificate", "CV / Resume"],
    },
    {
        id: "INS-2026-005",
        name: "Rakib Hossain",
        email: "rakib.hossain@example.com",
        department: "Physics",
        qualification: "M.Sc. in Physics",
        experience: "6 years",
        submittedAt: "2026-10-02",
        status: "REJECTED",
        bio: "Applicant for the physics department.",
        documents: ["CV / Resume"],
    },
    {
        id: "INS-2026-006",
        name: "Sadia Islam",
        email: "sadia.islam@example.com",
        department: "Computer Science",
        qualification: "M.Sc. in Software Engineering",
        experience: "2 years",
        submittedAt: "2026-10-01",
        status: "VERIFIED",
        bio: "Software engineering professional interested in teaching programming and software design.",
        documents: ["Academic Certificate", "CV / Resume"],
    },
];

const statusConfig: Record<
    VerificationStatus,
    { label: string; className: string }
> = {
    PENDING: {
        label: "Pending",
        className:
            "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-400",
    },
    VERIFIED: {
        label: "Verified",
        className:
            "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-400",
    },
    REJECTED: {
        label: "Rejected",
        className:
            "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-400",
    },
};

const formatDate = (date: string) =>
    new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

export default function InstructorVerification() {
    const [applications, setApplications] =
        useState<InstructorApplication[]>(initialApplications);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [departmentFilter, setDepartmentFilter] = useState("ALL");
    const [selectedApplication, setSelectedApplication] =
        useState<InstructorApplication | null>(null);
    const [pendingAction, setPendingAction] = useState<{
        id: string;
        status: "VERIFIED" | "REJECTED";
    } | null>(null);
    const [page, setPage] = useState(1);
    const [notice, setNotice] = useState("");

    const pageSize = 5;

    const departments = useMemo(
        () => [...new Set(applications.map((item) => item.department))].sort(),
        [applications],
    );

    const counts = useMemo(
        () => ({
            total: applications.length,
            pending: applications.filter((a) => a.status === "PENDING").length,
            verified: applications.filter((a) => a.status === "VERIFIED").length,
            rejected: applications.filter((a) => a.status === "REJECTED").length,
        }),
        [applications],
    );

    const filteredApplications = useMemo(() => {
        const query = search.trim().toLowerCase();

        return applications.filter((application) => {
            const matchesSearch =
                !query ||
                [
                    application.name,
                    application.email,
                    application.id,
                    application.department,
                ].some((value) => value.toLowerCase().includes(query));

            const matchesStatus =
                statusFilter === "ALL" || application.status === statusFilter;

            const matchesDepartment =
                departmentFilter === "ALL" ||
                application.department === departmentFilter;

            return matchesSearch && matchesStatus && matchesDepartment;
        });
    }, [applications, search, statusFilter, departmentFilter]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredApplications.length / pageSize),
    );

    const safePage = Math.min(page, totalPages);

    const paginatedApplications = filteredApplications.slice(
        (safePage - 1) * pageSize,
        safePage * pageSize,
    );

    const updateStatus = () => {
        if (!pendingAction) return;

        const application = applications.find(
            (item) => item.id === pendingAction.id,
        );

        if (!application || application.status !== "PENDING") {
            setPendingAction(null);
            return;
        }

        setApplications((current) =>
            current.map((item) =>
                item.id === pendingAction.id
                    ? { ...item, status: pendingAction.status }
                    : item,
            ),
        );

        setNotice(
            `${application.name}'s application was marked ${pendingAction.status === "VERIFIED" ? "verified" : "rejected"} in this demo.`,
        );

        setPendingAction(null);
        setSelectedApplication(null);
    };

    const resetFilters = () => {
        setSearch("");
        setStatusFilter("ALL");
        setDepartmentFilter("ALL");
        setPage(1);
    };

    const statCards = [
        {
            title: "Total Applications",
            value: counts.total,
            description: "All submitted applications",
            icon: GraduationCap,
            color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
        },
        {
            title: "Pending Review",
            value: counts.pending,
            description: "Awaiting verification",
            icon: Clock3,
            color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
        },
        {
            title: "Verified",
            value: counts.verified,
            description: "Approved applications",
            icon: CheckCircle2,
            color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        },
        {
            title: "Rejected",
            value: counts.rejected,
            description: "Not approved",
            icon: XCircle,
            color: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
        },
    ];

    return (
        <main className="min-h-screen space-y-6 bg-slate-50/70 p-4 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-[1600px] space-y-6">
                {/* Header */}
                <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>

                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            Instructor Verification
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                            Review instructor applications, check submitted credentials, and
                            manage verification decisions.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            resetFilters();
                            setNotice("Filters have been reset.");
                        }}
                        className="inline-flex items-center justify-center gap-2 self-start rounded-xl border bg-background px-4 py-2.5 text-sm font-medium shadow-sm transition hover:bg-muted sm:self-auto"
                    >
                        <RefreshCw className="size-4" />
                        Reset filters
                    </button>
                </header>

                {/* Demo notice */}
                {notice && (
                    <div
                        role="status"
                        className="flex items-start justify-between gap-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-300"
                    >
                        <p>{notice}</p>
                        <button
                            type="button"
                            onClick={() => setNotice("")}
                            aria-label="Dismiss notification"
                        >
                            <X className="size-4" />
                        </button>
                    </div>
                )}

                {/* Statistics */}
                <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {statCards.map((stat) => {
                        const Icon = stat.icon;

                        return (
                            <div
                                key={stat.title}
                                className="rounded-2xl border bg-background p-5 shadow-sm"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">
                                            {stat.title}
                                        </p>
                                        <p className="mt-3 text-3xl font-bold">{stat.value}</p>
                                    </div>

                                    <div className={`rounded-xl p-3 ${stat.color}`}>
                                        <Icon className="size-5" />
                                    </div>
                                </div>

                                <p className="mt-4 text-xs text-muted-foreground">
                                    {stat.description}
                                </p>
                            </div>
                        );
                    })}
                </section>

                {/* Verification reminder */}
                {counts.pending > 0 && (
                    <section className="flex flex-col gap-3 rounded-2xl border border-amber-200 bg-amber-50/70 p-4 dark:border-amber-900 dark:bg-amber-950/20 sm:flex-row sm:items-center">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
                            <CircleAlert className="size-5" />
                        </div>

                        <div className="flex-1">
                            <h2 className="text-sm font-semibold">
                                Applications require review
                            </h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                There are {counts.pending} pending applications in the current
                                demo dataset. Review the submitted qualifications before making
                                a decision.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                setStatusFilter("PENDING");
                                setPage(1);
                            }}
                            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-amber-300 bg-background px-3 py-2 text-sm font-medium transition hover:bg-amber-100 dark:border-amber-800 dark:hover:bg-amber-950"
                        >
                            Review pending
                            <ArrowUpRight className="size-4" />
                        </button>
                    </section>
                )}

                {/* Table section */}
                <section className="overflow-hidden rounded-2xl border bg-background shadow-sm">
                    <div className="border-b p-5 sm:p-6">
                        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                            <div>
                                <h2 className="text-lg font-semibold">
                                    Instructor Applications
                                </h2>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Review applicant details and verification status.
                                </p>
                            </div>

                            <span className="self-start rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground lg:self-auto">
                                {filteredApplications.length} results
                            </span>
                        </div>

                        {/* Filters */}
                        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-[minmax(220px,1fr)_200px_230px_auto]">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                <input
                                    value={search}
                                    onChange={(event) => {
                                        setSearch(event.target.value);
                                        setPage(1);
                                    }}
                                    placeholder="Search name, email, ID..."
                                    aria-label="Search instructor applications"
                                    className="h-11 w-full rounded-xl border bg-background pl-9 pr-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15"
                                />
                            </div>

                            <select
                                value={statusFilter}
                                onChange={(event) => {
                                    setStatusFilter(event.target.value);
                                    setPage(1);
                                }}
                                aria-label="Filter by status"
                                className="h-11 w-full rounded-xl border bg-background px-3 text-sm outline-none focus:border-blue-500"
                            >
                                <option value="ALL">All statuses</option>
                                <option value="PENDING">Pending</option>
                                <option value="VERIFIED">Verified</option>
                                <option value="REJECTED">Rejected</option>
                            </select>

                            <select
                                value={departmentFilter}
                                onChange={(event) => {
                                    setDepartmentFilter(event.target.value);
                                    setPage(1);
                                }}
                                aria-label="Filter by department"
                                className="h-11 w-full rounded-xl border bg-background px-3 text-sm outline-none focus:border-blue-500"
                            >
                                <option value="ALL">All departments</option>
                                {departments.map((department) => (
                                    <option key={department} value={department}>
                                        {department}
                                    </option>
                                ))}
                            </select>

                            <button
                                type="button"
                                onClick={resetFilters}
                                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-medium transition hover:bg-muted"
                            >
                                <Filter className="size-4" />
                                Clear
                            </button>
                        </div>
                    </div>

                    {/* Responsive table */}
                    <div className="w-full overflow-x-auto">
                        <table className="w-full min-w-[850px] text-left text-sm">
                            <thead className="bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                                <tr>
                                    <th className="px-5 py-4 font-medium">Instructor</th>
                                    <th className="px-5 py-4 font-medium">Department</th>
                                    <th className="px-5 py-4 font-medium">Submitted</th>
                                    <th className="px-5 py-4 font-medium">Status</th>
                                    <th className="px-5 py-4 text-right font-medium">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y">
                                {paginatedApplications.map((application) => {
                                    const status = statusConfig[application.status];

                                    return (
                                        <tr
                                            key={application.id}
                                            className="transition hover:bg-muted/30"
                                        >
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-sm font-bold text-blue-700 dark:text-blue-400">
                                                        {application.name
                                                            .split(" ")
                                                            .map((part) => part[0])
                                                            .slice(0, 2)
                                                            .join("")}
                                                    </div>

                                                    <div className="min-w-0">
                                                        <p className="font-semibold">
                                                            {application.name}
                                                        </p>
                                                        <p className="mt-1 text-xs text-muted-foreground">
                                                            {application.id}
                                                        </p>
                                                        <p className="mt-1 text-xs text-muted-foreground">
                                                            {application.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-2">
                                                    <Building2 className="size-4 shrink-0 text-muted-foreground" />
                                                    <span>{application.department}</span>
                                                </div>
                                            </td>

                                            <td className="whitespace-nowrap px-5 py-4 text-muted-foreground">
                                                {formatDate(application.submittedAt)}
                                            </td>

                                            <td className="px-5 py-4">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-medium ${status.className}`}
                                                >
                                                    {application.status === "PENDING" && (
                                                        <Clock3 className="size-3" />
                                                    )}
                                                    {application.status === "VERIFIED" && (
                                                        <CheckCircle2 className="size-3" />
                                                    )}
                                                    {application.status === "REJECTED" && (
                                                        <XCircle className="size-3" />
                                                    )}
                                                    {status.label}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => setSelectedApplication(application)}
                                                        aria-label={`View ${application.name}`}
                                                        className="inline-flex size-9 items-center justify-center rounded-lg border transition hover:bg-muted"
                                                    >
                                                        <Eye className="size-4" />
                                                    </button>

                                                    {application.status === "PENDING" && (
                                                        <>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    setPendingAction({
                                                                        id: application.id,
                                                                        status: "VERIFIED",
                                                                    })
                                                                }
                                                                aria-label={`Approve ${application.name}`}
                                                                className="inline-flex size-9 items-center justify-center rounded-lg border border-emerald-200 text-emerald-700 transition hover:bg-emerald-50 dark:border-emerald-900 dark:text-emerald-400 dark:hover:bg-emerald-950"
                                                            >
                                                                <CheckCircle2 className="size-4" />
                                                            </button>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    setPendingAction({
                                                                        id: application.id,
                                                                        status: "REJECTED",
                                                                    })
                                                                }
                                                                aria-label={`Reject ${application.name}`}
                                                                className="inline-flex size-9 items-center justify-center rounded-lg border border-rose-200 text-rose-700 transition hover:bg-rose-50 dark:border-rose-900 dark:text-rose-400 dark:hover:bg-rose-950"
                                                            >
                                                                <XCircle className="size-4" />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}

                                {paginatedApplications.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-5 py-16 text-center">
                                            <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-muted">
                                                <Search className="size-5 text-muted-foreground" />
                                            </div>
                                            <p className="mt-4 font-semibold">
                                                No applications found
                                            </p>
                                            <p className="mt-1 text-sm text-muted-foreground">
                                                Try changing your search or filters.
                                            </p>
                                            <button
                                                type="button"
                                                onClick={resetFilters}
                                                className="mt-4 text-sm font-semibold text-blue-700 hover:underline dark:text-blue-400"
                                            >
                                                Clear all filters
                                            </button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-col gap-3 border-t px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs text-muted-foreground">
                            Showing{" "}
                            {filteredApplications.length === 0
                                ? 0
                                : (safePage - 1) * pageSize + 1}{" "}
                            to {Math.min(safePage * pageSize, filteredApplications.length)}{" "}
                            of {filteredApplications.length} applications
                        </p>

                        <div className="flex items-center gap-2 self-end sm:self-auto">
                            <button
                                type="button"
                                disabled={safePage <= 1}
                                onClick={() => setPage((current) => Math.max(1, current - 1))}
                                className="inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-sm transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <ChevronLeft className="size-4" />
                                Previous
                            </button>

                            <span className="px-2 text-sm text-muted-foreground">
                                {safePage} / {totalPages}
                            </span>

                            <button
                                type="button"
                                disabled={safePage >= totalPages}
                                onClick={() =>
                                    setPage((current) => Math.min(totalPages, current + 1))
                                }
                                className="inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-sm transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Next
                                <ChevronRight className="size-4" />
                            </button>
                        </div>
                    </div>
                </section>

                <p className="text-xs leading-5 text-muted-foreground">
                    Demo interface: application records and verification decisions are
                    stored only in component state. Connect your backend before using
                    this page for real instructor approvals.
                </p>
            </div>

            {/* Application details dialog */}
            {selectedApplication && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setSelectedApplication(null);
                        }
                    }}
                >
                    <section
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="application-dialog-title"
                        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border bg-background shadow-2xl"
                    >
                        <div className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b bg-background p-5 sm:p-6">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                    Application details
                                </p>
                                <h2
                                    id="application-dialog-title"
                                    className="mt-2 text-xl font-bold"
                                >
                                    {selectedApplication.name}
                                </h2>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {selectedApplication.id}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setSelectedApplication(null)}
                                aria-label="Close application details"
                                className="rounded-lg p-2 transition hover:bg-muted"
                            >
                                <X className="size-5" />
                            </button>
                        </div>

                        <div className="space-y-6 p-5 sm:p-6">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                                    <CalendarDays className="size-4" />
                                    Submitted {formatDate(selectedApplication.submittedAt)}
                                </span>

                                <span
                                    className={`rounded-full border px-3 py-1 text-xs font-medium ${statusConfig[selectedApplication.status].className}`}
                                >
                                    {statusConfig[selectedApplication.status].label}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="rounded-xl border p-4">
                                    <p className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <Mail className="size-4" />
                                        Email address
                                    </p>
                                    <p className="mt-2 break-all text-sm font-medium">
                                        {selectedApplication.email}
                                    </p>
                                </div>

                                <div className="rounded-xl border p-4">
                                    <p className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <Building2 className="size-4" />
                                        Department
                                    </p>
                                    <p className="mt-2 text-sm font-medium">
                                        {selectedApplication.department}
                                    </p>
                                </div>

                                <div className="rounded-xl border p-4">
                                    <p className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <GraduationCap className="size-4" />
                                        Qualification
                                    </p>
                                    <p className="mt-2 text-sm font-medium">
                                        {selectedApplication.qualification}
                                    </p>
                                </div>

                                <div className="rounded-xl border p-4">
                                    <p className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <Clock3 className="size-4" />
                                        Experience
                                    </p>
                                    <p className="mt-2 text-sm font-medium">
                                        {selectedApplication.experience}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold">Applicant summary</h3>
                                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                    {selectedApplication.bio}
                                </p>
                            </div>

                            <div>
                                <h3 className="flex items-center gap-2 text-sm font-semibold">
                                    <FileText className="size-4" />
                                    Submitted documents
                                </h3>

                                <div className="mt-3 space-y-2">
                                    {selectedApplication.documents.map((document) => (
                                        <div
                                            key={document}
                                            className="flex items-center gap-3 rounded-xl border p-3"
                                        >
                                            <div className="rounded-lg bg-muted p-2">
                                                <FileText className="size-4 text-muted-foreground" />
                                            </div>
                                            <span className="flex-1 text-sm">{document}</span>
                                            <span className="text-xs text-muted-foreground">
                                                Demo record
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <p className="mt-2 text-xs text-muted-foreground">
                                    These are placeholder document labels, not actual uploaded
                                    files.
                                </p>
                            </div>

                            {selectedApplication.status === "PENDING" && (
                                <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-end">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setPendingAction({
                                                id: selectedApplication.id,
                                                status: "REJECTED",
                                            });
                                        }}
                                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-200 px-4 py-2.5 text-sm font-medium text-rose-700 transition hover:bg-rose-50 dark:border-rose-900 dark:text-rose-400 dark:hover:bg-rose-950"
                                    >
                                        <UserX className="size-4" />
                                        Reject Application
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setPendingAction({
                                                id: selectedApplication.id,
                                                status: "VERIFIED",
                                            });
                                        }}
                                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
                                    >
                                        <UserCheck className="size-4" />
                                        Verify Instructor
                                    </button>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            )}

            {/* Action confirmation dialog */}
            {pendingAction && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <section
                        role="alertdialog"
                        aria-modal="true"
                        aria-labelledby="confirm-action-title"
                        aria-describedby="confirm-action-description"
                        className="w-full max-w-md rounded-2xl border bg-background p-5 shadow-2xl sm:p-6"
                    >
                        <div
                            className={`flex size-12 items-center justify-center rounded-xl ${pendingAction.status === "VERIFIED"
                                ? "bg-emerald-500/10 text-emerald-600"
                                : "bg-rose-500/10 text-rose-600"
                                }`}
                        >
                            {pendingAction.status === "VERIFIED" ? (
                                <UserCheck className="size-6" />
                            ) : (
                                <UserX className="size-6" />
                            )}
                        </div>

                        <h2 id="confirm-action-title" className="mt-4 text-lg font-bold">
                            {pendingAction.status === "VERIFIED"
                                ? "Verify this instructor?"
                                : "Reject this application?"}
                        </h2>

                        <p
                            id="confirm-action-description"
                            className="mt-2 text-sm leading-6 text-muted-foreground"
                        >
                            {pendingAction.status === "VERIFIED"
                                ? "Confirm that you have reviewed the applicant's credentials and want to mark this application as verified."
                                : "Confirm that you want to reject this application. In production, a rejection reason should be recorded."}
                        </p>

                        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <button
                                type="button"
                                onClick={() => setPendingAction(null)}
                                className="rounded-xl border px-4 py-2.5 text-sm font-medium transition hover:bg-muted"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={updateStatus}
                                className={`rounded-xl px-4 py-2.5 text-sm font-medium text-white transition ${pendingAction.status === "VERIFIED"
                                    ? "bg-emerald-600 hover:bg-emerald-700"
                                    : "bg-rose-600 hover:bg-rose-700"
                                    }`}
                            >
                                Confirm{" "}
                                {pendingAction.status === "VERIFIED" ? "Verification" : "Rejection"}
                            </button>
                        </div>
                    </section>
                </div>
            )}
        </main>
    );
}
