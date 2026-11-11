// import React from 'react'

// export default function publications() {
//   return (
//     <div>publications</div>
//   )
// }













"use client";

import { useMemo, useState } from "react";
import {
    Search,
    Download,
    BookOpen,
    FileText,
    Users,
    CalendarDays,
    ExternalLink,
    Eye,
    CheckCircle2,
    Clock,
    AlertCircle,
    Filter,
    XCircle,
    GraduationCap,
    Link2,
    RefreshCw,
    ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type PublicationType = "JOURNAL" | "CONFERENCE" | "BOOK_CHAPTER" | "PREPRINT";

type PublicationStatus =
    | "PUBLISHED"
    | "ACCEPTED"
    | "UNDER_REVIEW"
    | "DRAFT";

type VerificationStatus = "VERIFIED" | "PENDING" | "REJECTED";

type Publication = {
    id: string;
    title: string;
    authors: string[];
    correspondingAuthor: string;
    publicationType: PublicationType;
    journalName: string;
    publisher: string;
    year: number;
    volume?: string;
    issue?: string;
    pages?: string;
    doi?: string;
    url?: string;
    researchArea: string;
    status: PublicationStatus;
    verificationStatus: VerificationStatus;
    submittedAt: string;
    abstract: string;
    submittedBy: string;
    citations: number;
};

const initialPublications: Publication[] = [
    {
        id: "PUB-2026-001",
        title: "Predictive Analytics for Student Academic Performance",
        authors: ["Dr. Mahmud Hasan", "Ms. Nusrat Jahan"],
        correspondingAuthor: "Dr. Mahmud Hasan",
        publicationType: "JOURNAL",
        journalName: "Journal of Educational Computing",
        publisher: "Academic Research Press",
        year: 2026,
        volume: "12",
        issue: "2",
        pages: "45-58",
        doi: "10.1234/jec.2026.001",
        url: "https://example.com/publication/001",
        researchArea: "Machine Learning",
        status: "PUBLISHED",
        verificationStatus: "VERIFIED",
        submittedAt: "2026-10-15",
        abstract:
            "This study explores machine learning approaches for predicting student academic performance using academic records and engagement indicators. The research evaluates predictive models and discusses how early identification can support academic interventions.",
        submittedBy: "Dr. Mahmud Hasan",
        citations: 8,
    },
    {
        id: "PUB-2026-002",
        title: "IoT Applications in Smart University Environments",
        authors: ["Dr. Farhan Kabir", "Mr. Imran Hossain"],
        correspondingAuthor: "Dr. Farhan Kabir",
        publicationType: "CONFERENCE",
        journalName: "International Conference on Smart Systems",
        publisher: "IEEE",
        year: 2026,
        pages: "112-119",
        doi: "10.5678/icss.2026.002",
        researchArea: "Internet of Things",
        status: "ACCEPTED",
        verificationStatus: "PENDING",
        submittedAt: "2026-11-02",
        abstract:
            "This paper presents practical applications of IoT technology in university environments, focusing on energy monitoring, environmental sensing, and campus facility management.",
        submittedBy: "Dr. Farhan Kabir",
        citations: 0,
    },
    {
        id: "PUB-2026-003",
        title: "Modern Web Application Security Practices",
        authors: ["Mr. Hasan Mahmud"],
        correspondingAuthor: "Mr. Hasan Mahmud",
        publicationType: "JOURNAL",
        journalName: "Computing Research Review",
        publisher: "Digital Science Publications",
        year: 2026,
        volume: "8",
        issue: "1",
        researchArea: "Cybersecurity",
        status: "UNDER_REVIEW",
        verificationStatus: "PENDING",
        submittedAt: "2026-10-28",
        abstract:
            "A review of modern web application security practices, including authentication, authorization, secure session handling, and common application vulnerabilities.",
        submittedBy: "Mr. Hasan Mahmud",
        citations: 0,
    },
    {
        id: "PUB-2026-004",
        title: "Bangla Text Classification Using Deep Learning",
        authors: [
            "Ms. Nusrat Jahan",
            "STU-2023-CSE-0012",
            "STU-2023-CSE-0018",
        ],
        correspondingAuthor: "Ms. Nusrat Jahan",
        publicationType: "CONFERENCE",
        journalName: "National Conference on Computing",
        publisher: "NCC",
        year: 2025,
        pages: "72-80",
        researchArea: "Natural Language Processing",
        status: "PUBLISHED",
        verificationStatus: "VERIFIED",
        submittedAt: "2026-09-12",
        abstract:
            "This research investigates deep learning methods for Bangla text classification and evaluates their performance across different text categories.",
        submittedBy: "Ms. Nusrat Jahan",
        citations: 12,
    },
    {
        id: "PUB-2026-005",
        title: "Blockchain-Based Academic Credential Verification",
        authors: ["Mr. Sakib Ahmed", "Dr. Farhan Kabir"],
        correspondingAuthor: "Mr. Sakib Ahmed",
        publicationType: "PREPRINT",
        journalName: "Research Preprint Repository",
        publisher: "Open Research Archive",
        year: 2026,
        researchArea: "Blockchain",
        status: "DRAFT",
        verificationStatus: "PENDING",
        submittedAt: "2026-11-06",
        abstract:
            "An exploratory study on using blockchain technology to improve the integrity, transparency, and verification of academic credentials.",
        submittedBy: "Mr. Sakib Ahmed",
        citations: 0,
    },
    {
        id: "PUB-2026-006",
        title: "Privacy-Aware Student Information Management",
        authors: ["Dr. Mahmud Hasan", "Mr. Imran Hossain"],
        correspondingAuthor: "Dr. Mahmud Hasan",
        publicationType: "BOOK_CHAPTER",
        journalName: "Digital Transformation in Education",
        publisher: "University Press",
        year: 2025,
        pages: "201-220",
        researchArea: "Data Privacy",
        status: "PUBLISHED",
        verificationStatus: "REJECTED",
        submittedAt: "2026-08-20",
        abstract:
            "This chapter discusses privacy-aware approaches for managing student information within digital educational platforms, including access control and data governance.",
        submittedBy: "Dr. Mahmud Hasan",
        citations: 5,
    },
];

const publicationTypeLabels: Record<PublicationType, string> = {
    JOURNAL: "Journal Article",
    CONFERENCE: "Conference Paper",
    BOOK_CHAPTER: "Book Chapter",
    PREPRINT: "Preprint",
};

const publicationStatusStyles: Record<PublicationStatus, string> = {
    PUBLISHED:
        "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-400",
    ACCEPTED:
        "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-400",
    UNDER_REVIEW:
        "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-400",
    DRAFT:
        "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300",
};

const verificationStyles: Record<VerificationStatus, string> = {
    VERIFIED:
        "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-400",
    PENDING:
        "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-400",
    REJECTED:
        "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400",
};

function formatDate(date: string) {
    return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

function PublicationStatusBadge({
    status,
}: {
    status: PublicationStatus;
}) {
    return (
        <Badge variant="outline" className={publicationStatusStyles[status]}>
            {status.replace("_", " ").toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}
        </Badge>
    );
}

function VerificationBadge({
    status,
}: {
    status: VerificationStatus;
}) {
    return (
        <Badge variant="outline" className={verificationStyles[status]}>
            {status.charAt(0) + status.slice(1).toLowerCase()}
        </Badge>
    );
}

export default function PublicationsPage() {
    const [publications, setPublications] =
        useState<Publication[]>(initialPublications);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [verificationFilter, setVerificationFilter] = useState("ALL");
    const [typeFilter, setTypeFilter] = useState("ALL");
    const [yearFilter, setYearFilter] = useState("ALL");

    const [selectedPublication, setSelectedPublication] =
        useState<Publication | null>(null);

    const [reviewMode, setReviewMode] = useState<
        "view" | "verify" | "reject" | null
    >(null);

    const [reviewNote, setReviewNote] = useState("");

    const stats = useMemo(() => {
        const verified = publications.filter(
            (publication) => publication.verificationStatus === "VERIFIED",
        ).length;

        const pending = publications.filter(
            (publication) => publication.verificationStatus === "PENDING",
        ).length;

        const published = publications.filter(
            (publication) => publication.status === "PUBLISHED",
        ).length;

        const citations = publications.reduce(
            (total, publication) => total + publication.citations,
            0,
        );

        const contributors = new Set(
            publications.flatMap((publication) => publication.authors),
        );

        return {
            total: publications.length,
            published,
            verified,
            pending,
            citations,
            contributors: contributors.size,
        };
    }, [publications]);

    const filteredPublications = useMemo(() => {
        const query = search.toLowerCase().trim();

        return publications.filter((publication) => {
            const matchesSearch =
                !query ||
                publication.title.toLowerCase().includes(query) ||
                publication.id.toLowerCase().includes(query) ||
                publication.journalName.toLowerCase().includes(query) ||
                publication.publisher.toLowerCase().includes(query) ||
                publication.authors.some((author) =>
                    author.toLowerCase().includes(query),
                ) ||
                publication.researchArea.toLowerCase().includes(query);

            const matchesStatus =
                statusFilter === "ALL" || publication.status === statusFilter;

            const matchesVerification =
                verificationFilter === "ALL" ||
                publication.verificationStatus === verificationFilter;

            const matchesType =
                typeFilter === "ALL" || publication.publicationType === typeFilter;

            const matchesYear =
                yearFilter === "ALL" || publication.year.toString() === yearFilter;

            return (
                matchesSearch &&
                matchesStatus &&
                matchesVerification &&
                matchesType &&
                matchesYear
            );
        });
    }, [
        publications,
        search,
        statusFilter,
        verificationFilter,
        typeFilter,
        yearFilter,
    ]);

    const years = useMemo(
        () =>
            [...new Set(publications.map((publication) => publication.year))].sort(
                (a, b) => b - a,
            ),
        [publications],
    );

    const openDetails = (publication: Publication) => {
        setSelectedPublication(publication);
        setReviewMode("view");
        setReviewNote("");
    };

    const closeDialog = () => {
        setSelectedPublication(null);
        setReviewMode(null);
        setReviewNote("");
    };

    const handleVerification = () => {
        if (!selectedPublication || !reviewMode || reviewMode === "view") return;

        if (reviewMode === "reject" && !reviewNote.trim()) return;

        const nextStatus: VerificationStatus =
            reviewMode === "verify" ? "VERIFIED" : "REJECTED";

        setPublications((current) =>
            current.map((publication) =>
                publication.id === selectedPublication.id
                    ? { ...publication, verificationStatus: nextStatus }
                    : publication,
            ),
        );

        closeDialog();
    };

    const exportCSV = () => {
        const headers = [
            "Publication ID",
            "Title",
            "Authors",
            "Corresponding Author",
            "Publication Type",
            "Journal / Conference",
            "Publisher",
            "Year",
            "Volume",
            "Issue",
            "Pages",
            "DOI",
            "Research Area",
            "Publication Status",
            "Verification Status",
            "Citations",
            "Submitted By",
            "Submitted At",
        ];

        const rows = filteredPublications.map((publication) => [
            publication.id,
            publication.title,
            publication.authors.join("; "),
            publication.correspondingAuthor,
            publicationTypeLabels[publication.publicationType],
            publication.journalName,
            publication.publisher,
            publication.year,
            publication.volume ?? "",
            publication.issue ?? "",
            publication.pages ?? "",
            publication.doi ?? "",
            publication.researchArea,
            publication.status,
            publication.verificationStatus,
            publication.citations,
            publication.submittedBy,
            publication.submittedAt,
        ]);

        const escapeCSV = (value: string | number) =>
            `"${String(value).replace(/"/g, '""')}"`;

        const csv = [headers, ...rows]
            .map((row) => row.map(escapeCSV).join(","))
            .join("\n");

        const blob = new Blob(["\uFEFF" + csv], {
            type: "text/csv;charset=utf-8;",
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = "department-publications.csv";
        link.click();

        URL.revokeObjectURL(url);
    };

    const resetFilters = () => {
        setSearch("");
        setStatusFilter("ALL");
        setVerificationFilter("ALL");
        setTypeFilter("ALL");
        setYearFilter("ALL");
    };

    return (
        <div className="space-y-6 pb-10 p-4">
            {/* Header */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <BookOpen className="h-4 w-4" />
                        <span>Research</span>
                        <span>/</span>
                        <span>Publications</span>
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Research Publications
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage, review, and verify faculty and student research
                        publications.
                    </p>
                </div>

                <Button variant="outline" onClick={exportCSV}>
                    <Download className="mr-2 h-4 w-4" />
                    Export CSV
                </Button>
            </div>

            {/* Pending Verification Alert */}
            {stats.pending > 0 && (
                <div className="flex flex-col gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/30 sm:flex-row sm:items-center">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-400">
                        <AlertCircle className="h-5 w-5" />
                    </div>

                    <div className="flex-1">
                        <p className="font-semibold text-amber-900 dark:text-amber-300">
                            {stats.pending} publication
                            {stats.pending !== 1 ? "s" : ""} awaiting verification
                        </p>
                        <p className="text-sm text-amber-800 dark:text-amber-400">
                            Review the submitted publication details and supporting
                            information.
                        </p>
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        className="border-amber-300 bg-transparent text-amber-800 hover:bg-amber-100 dark:border-amber-800 dark:text-amber-300 dark:hover:bg-amber-900/40"
                        onClick={() => {
                            setVerificationFilter("PENDING");
                            setStatusFilter("ALL");
                        }}
                    >
                        Review Pending
                    </Button>
                </div>
            )}

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                <Card>
                    <CardContent className="flex items-center justify-between p-4 sm:p-5">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Total Publications
                            </p>
                            <p className="mt-2 text-2xl font-bold">{stats.total}</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Submitted records
                            </p>
                        </div>
                        <div className="rounded-lg bg-primary/10 p-3 text-primary">
                            <BookOpen className="h-5 w-5" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center justify-between p-4 sm:p-5">
                        <div>
                            <p className="text-sm text-muted-foreground">Published</p>
                            <p className="mt-2 text-2xl font-bold">{stats.published}</p>
                            <p className="mt-1 text-xs text-green-600 dark:text-green-400">
                                Published papers
                            </p>
                        </div>
                        <div className="rounded-lg bg-green-100 p-3 text-green-700 dark:bg-green-950/50 dark:text-green-400">
                            <CheckCircle2 className="h-5 w-5" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center justify-between p-4 sm:p-5">
                        <div>
                            <p className="text-sm text-muted-foreground">Verified</p>
                            <p className="mt-2 text-2xl font-bold">{stats.verified}</p>
                            <p className="mt-1 text-xs text-blue-600 dark:text-blue-400">
                                Verified records
                            </p>
                        </div>
                        <div className="rounded-lg bg-blue-100 p-3 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
                            <ShieldCheck className="h-5 w-5" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center justify-between p-4 sm:p-5">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Total Citations
                            </p>
                            <p className="mt-2 text-2xl font-bold">{stats.citations}</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Recorded citations
                            </p>
                        </div>
                        <div className="rounded-lg bg-purple-100 p-3 text-purple-700 dark:bg-purple-950/50 dark:text-purple-400">
                            <FileText className="h-5 w-5" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Publication Type Summary */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-base">Publication Overview</CardTitle>
                    <CardDescription>
                        Publications grouped by research output type.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                        {(
                            Object.entries(publicationTypeLabels) as [
                                PublicationType,
                                string,
                            ][]
                        ).map(([type, label]) => {
                            const count = publications.filter(
                                (publication) => publication.publicationType === type,
                            ).length;

                            return (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() =>
                                        setTypeFilter(typeFilter === type ? "ALL" : type)
                                    }
                                    className={`rounded-lg border p-3 text-left transition-colors hover:bg-muted/50 ${typeFilter === type
                                        ? "border-primary bg-primary/5"
                                        : "border-border"
                                        }`}
                                >
                                    <p className="text-2xl font-bold">{count}</p>
                                    <p className="mt-1 text-xs text-muted-foreground">{label}</p>
                                </button>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* Publications List */}
            <Card>
                <CardHeader className="pb-3">
                    <div>
                        <CardTitle className="text-base">
                            Publication Directory
                        </CardTitle>
                        <CardDescription>
                            Search and manage research outputs submitted by department
                            members.
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardContent className="space-y-4">
                    {/* Filters */}
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="relative sm:col-span-2 lg:col-span-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search publications..."
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                className="pl-9"
                            />
                        </div>

                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <select
                                value={statusFilter}
                                onChange={(event) => setStatusFilter(event.target.value)}
                                className="h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                            >
                                <option value="ALL">All Publication Statuses</option>
                                <option value="PUBLISHED">Published</option>
                                <option value="ACCEPTED">Accepted</option>
                                <option value="UNDER_REVIEW">Under Review</option>
                                <option value="DRAFT">Draft</option>
                            </select>
                        </div>

                        <select
                            value={verificationFilter}
                            onChange={(event) =>
                                setVerificationFilter(event.target.value)
                            }
                            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                        >
                            <option value="ALL">All Verification Statuses</option>
                            <option value="VERIFIED">Verified</option>
                            <option value="PENDING">Pending</option>
                            <option value="REJECTED">Rejected</option>
                        </select>

                        <select
                            value={yearFilter}
                            onChange={(event) => setYearFilter(event.target.value)}
                            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                        >
                            <option value="ALL">All Years</option>
                            {years.map((year) => (
                                <option key={year} value={year.toString()}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
                        <span>
                            Showing{" "}
                            <span className="font-medium text-foreground">
                                {filteredPublications.length}
                            </span>{" "}
                            of {publications.length} publications
                        </span>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={resetFilters}
                            className="h-8"
                        >
                            <RefreshCw className="mr-2 h-3.5 w-3.5" />
                            Reset Filters
                        </Button>
                    </div>

                    {/* Desktop Table */}
                    <div className="hidden overflow-hidden rounded-lg border md:block">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-muted/50">
                                    <tr className="border-b text-left">
                                        <th className="px-4 py-3 font-medium">Publication</th>
                                        <th className="px-4 py-3 font-medium">Authors</th>
                                        <th className="px-4 py-3 font-medium">Type / Year</th>
                                        <th className="px-4 py-3 font-medium">Status</th>
                                        <th className="px-4 py-3 font-medium">Verification</th>
                                        <th className="px-4 py-3 text-right font-medium">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredPublications.map((publication) => (
                                        <tr
                                            key={publication.id}
                                            className="border-b last:border-0 hover:bg-muted/30"
                                        >
                                            <td className="max-w-[280px] px-4 py-4">
                                                <p className="font-medium leading-snug">
                                                    {publication.title}
                                                </p>
                                                <p className="mt-1 text-xs text-muted-foreground">
                                                    {publication.journalName}
                                                </p>
                                                <p className="mt-1 text-xs text-muted-foreground">
                                                    {publication.id}
                                                </p>
                                            </td>

                                            <td className="max-w-[190px] px-4 py-4">
                                                <p className="line-clamp-2 text-sm">
                                                    {publication.authors.join(", ")}
                                                </p>
                                                <p className="mt-1 text-xs text-muted-foreground">
                                                    {publication.citations} citations
                                                </p>
                                            </td>

                                            <td className="px-4 py-4">
                                                <p className="text-sm">
                                                    {publicationTypeLabels[publication.publicationType]}
                                                </p>
                                                <p className="mt-1 text-xs text-muted-foreground">
                                                    {publication.year}
                                                </p>
                                            </td>

                                            <td className="px-4 py-4">
                                                <PublicationStatusBadge status={publication.status} />
                                            </td>

                                            <td className="px-4 py-4">
                                                <VerificationBadge
                                                    status={publication.verificationStatus}
                                                />
                                            </td>

                                            <td className="px-4 py-4 text-right">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => openDetails(publication)}
                                                >
                                                    <Eye className="mr-2 h-3.5 w-3.5" />
                                                    Details
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}

                                    {filteredPublications.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="px-4 py-12 text-center">
                                                <BookOpen className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
                                                <p className="font-medium">No publications found</p>
                                                <p className="mt-1 text-sm text-muted-foreground">
                                                    Try adjusting your search or filters.
                                                </p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Mobile Cards */}
                    <div className="space-y-3 md:hidden">
                        {filteredPublications.map((publication) => (
                            <div
                                key={publication.id}
                                className="space-y-3 rounded-lg border p-4"
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <div className="min-w-0">
                                        <p className="text-xs text-muted-foreground">
                                            {publication.id}
                                        </p>
                                        <h3 className="mt-1 font-semibold leading-snug">
                                            {publication.title}
                                        </h3>
                                    </div>
                                    <PublicationStatusBadge status={publication.status} />
                                </div>

                                <p className="text-sm text-muted-foreground">
                                    {publication.journalName}
                                </p>

                                <p className="text-xs text-muted-foreground">
                                    {publication.authors.join(", ")}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary">
                                        {publicationTypeLabels[publication.publicationType]}
                                    </Badge>
                                    <Badge variant="secondary">{publication.year}</Badge>
                                    <VerificationBadge
                                        status={publication.verificationStatus}
                                    />
                                </div>

                                <div className="flex items-center justify-between gap-2 border-t pt-3">
                                    <span className="text-xs text-muted-foreground">
                                        {publication.citations} citations
                                    </span>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => openDetails(publication)}
                                    >
                                        <Eye className="mr-2 h-3.5 w-3.5" />
                                        View Details
                                    </Button>
                                </div>
                            </div>
                        ))}

                        {filteredPublications.length === 0 && (
                            <div className="rounded-lg border border-dashed p-10 text-center">
                                <BookOpen className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
                                <p className="font-medium">No publications found</p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Try adjusting your search or filters.
                                </p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Publication Details Dialog */}
            <Dialog
                open={!!selectedPublication}
                onOpenChange={(open) => !open && closeDialog()}
            >
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                    {selectedPublication && (
                        <>
                            <DialogHeader>
                                <div className="mb-2 flex flex-wrap gap-2">
                                    <Badge variant="outline">{selectedPublication.id}</Badge>
                                    <PublicationStatusBadge
                                        status={selectedPublication.status}
                                    />
                                    <VerificationBadge
                                        status={selectedPublication.verificationStatus}
                                    />
                                </div>

                                <DialogTitle className="text-xl leading-snug">
                                    {selectedPublication.title}
                                </DialogTitle>

                                <DialogDescription>
                                    Publication information and verification details.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-5">
                                {/* Authors */}
                                <div>
                                    <Label className="mb-2 block">Authors</Label>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedPublication.authors.map((author) => (
                                            <Badge key={author} variant="secondary">
                                                <Users className="mr-1 h-3 w-3" />
                                                {author}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <p className="text-xs text-muted-foreground">
                                            Corresponding Author
                                        </p>
                                        <p className="mt-1 text-sm font-medium">
                                            {selectedPublication.correspondingAuthor}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-muted-foreground">
                                            Publication Type
                                        </p>
                                        <p className="mt-1 text-sm font-medium">
                                            {publicationTypeLabels[
                                                selectedPublication.publicationType
                                            ]}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-muted-foreground">
                                            Journal / Conference
                                        </p>
                                        <p className="mt-1 text-sm font-medium">
                                            {selectedPublication.journalName}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-muted-foreground">Publisher</p>
                                        <p className="mt-1 text-sm font-medium">
                                            {selectedPublication.publisher}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-muted-foreground">
                                            Publication Year
                                        </p>
                                        <p className="mt-1 text-sm font-medium">
                                            {selectedPublication.year}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-muted-foreground">
                                            Research Area
                                        </p>
                                        <p className="mt-1 text-sm font-medium">
                                            {selectedPublication.researchArea}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-muted-foreground">Volume</p>
                                        <p className="mt-1 text-sm font-medium">
                                            {selectedPublication.volume ?? "Not provided"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-muted-foreground">Issue</p>
                                        <p className="mt-1 text-sm font-medium">
                                            {selectedPublication.issue ?? "Not provided"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-muted-foreground">Pages</p>
                                        <p className="mt-1 text-sm font-medium">
                                            {selectedPublication.pages ?? "Not provided"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-muted-foreground">Citations</p>
                                        <p className="mt-1 text-sm font-medium">
                                            {selectedPublication.citations}
                                        </p>
                                    </div>
                                </div>

                                {/* DOI */}
                                <div>
                                    <Label className="mb-2 block">DOI</Label>
                                    {selectedPublication.doi ? (
                                        <a
                                            href={`https://doi.org/${encodeURIComponent(selectedPublication.doi)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 break-all text-sm text-primary hover:underline"
                                        >
                                            <Link2 className="h-4 w-4 shrink-0" />
                                            {selectedPublication.doi}
                                            <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                                        </a>
                                    ) : (
                                        <p className="text-sm text-muted-foreground">
                                            No DOI provided.
                                        </p>
                                    )}
                                </div>

                                {/* Abstract */}
                                <div>
                                    <Label className="mb-2 block">Abstract</Label>
                                    <div className="rounded-lg bg-muted/50 p-3 text-sm leading-relaxed">
                                        {selectedPublication.abstract}
                                    </div>
                                </div>

                                {/* Submission Information */}
                                <div className="grid gap-3 rounded-lg border p-3 sm:grid-cols-2">
                                    <div>
                                        <p className="text-xs text-muted-foreground">
                                            Submitted By
                                        </p>
                                        <p className="mt-1 text-sm font-medium">
                                            {selectedPublication.submittedBy}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">
                                            Submission Date
                                        </p>
                                        <p className="mt-1 text-sm font-medium">
                                            {formatDate(selectedPublication.submittedAt)}
                                        </p>
                                    </div>
                                </div>

                                {/* Review Note */}
                                {reviewMode !== "view" && (
                                    <div className="space-y-2">
                                        <Label htmlFor="publication-review-note">
                                            Review Note{" "}
                                            {reviewMode === "reject" && (
                                                <span className="text-destructive">*</span>
                                            )}
                                        </Label>
                                        <Textarea
                                            id="publication-review-note"
                                            rows={3}
                                            value={reviewNote}
                                            onChange={(event) => setReviewNote(event.target.value)}
                                            placeholder={
                                                reviewMode === "verify"
                                                    ? "Add an optional verification note..."
                                                    : "Explain why this publication is being rejected..."
                                            }
                                        />
                                        {reviewMode === "reject" && !reviewNote.trim() && (
                                            <p className="text-xs text-muted-foreground">
                                                A rejection reason is required.
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>

                            <DialogFooter className="flex-col gap-2 sm:flex-row">
                                {reviewMode === "view" ? (
                                    <>
                                        <Button
                                            variant="outline"
                                            onClick={closeDialog}
                                            className="w-full sm:w-auto"
                                        >
                                            Close
                                        </Button>

                                        {selectedPublication.verificationStatus === "PENDING" && (
                                            <>
                                                <Button
                                                    variant="destructive"
                                                    onClick={() => {
                                                        setReviewMode("reject");
                                                        setReviewNote("");
                                                    }}
                                                    className="w-full sm:w-auto"
                                                >
                                                    <XCircle className="mr-2 h-4 w-4" />
                                                    Reject
                                                </Button>

                                                <Button
                                                    onClick={() => {
                                                        setReviewMode("verify");
                                                        setReviewNote("");
                                                    }}
                                                    className="w-full sm:w-auto"
                                                >
                                                    <CheckCircle2 className="mr-2 h-4 w-4" />
                                                    Verify Publication
                                                </Button>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            variant="outline"
                                            onClick={() => setReviewMode("view")}
                                            className="w-full sm:w-auto"
                                        >
                                            Back
                                        </Button>

                                        <Button
                                            variant={
                                                reviewMode === "reject" ? "destructive" : "default"
                                            }
                                            onClick={handleVerification}
                                            disabled={
                                                reviewMode === "reject" && !reviewNote.trim()
                                            }
                                            className="w-full sm:w-auto"
                                        >
                                            {reviewMode === "verify" ? (
                                                <>
                                                    <CheckCircle2 className="mr-2 h-4 w-4" />
                                                    Confirm Verification
                                                </>
                                            ) : (
                                                <>
                                                    <XCircle className="mr-2 h-4 w-4" />
                                                    Confirm Rejection
                                                </>
                                            )}
                                        </Button>
                                    </>
                                )}
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
