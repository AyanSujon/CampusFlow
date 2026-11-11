// import React from 'react'

// export default function research() {
//     return (
//         <div>research</div>
//     )
// }















"use client";

import { useMemo, useState } from "react";
import {
    Search,
    Download,
    FlaskConical,
    BookOpen,
    Users,
    Wallet,
    CalendarDays,
    Clock,
    ExternalLink,
    Eye,
    FileText,
    GraduationCap,
    TrendingUp,
    CheckCircle2,
    AlertCircle,
    CircleDot,
    X,
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

type ResearchStatus =
    | "ONGOING"
    | "COMPLETED"
    | "UNDER_REVIEW"
    | "PLANNING"
    | "ON_HOLD";

type ResearchType =
    | "FACULTY_RESEARCH"
    | "STUDENT_RESEARCH"
    | "COLLABORATIVE"
    | "THESIS";

type ResearchProject = {
    id: string;
    title: string;
    code: string;
    type: ResearchType;
    principalInvestigator: string;
    coInvestigators: string[];
    department: string;
    startDate: string;
    endDate: string;
    status: ResearchStatus;
    progress: number;
    funding: number;
    description: string;
    researchArea: string;
};

type Publication = {
    id: string;
    title: string;
    authors: string[];
    journal: string;
    year: number;
    type: "JOURNAL" | "CONFERENCE" | "BOOK_CHAPTER";
    status: "PUBLISHED" | "ACCEPTED" | "UNDER_REVIEW";
    doi?: string;
};

type ResearchProposal = {
    id: string;
    title: string;
    submittedBy: string;
    researchArea: string;
    submittedAt: string;
    requestedFunding: number;
    status: "PENDING" | "APPROVED" | "REJECTED";
};

const initialProjects: ResearchProject[] = [
    {
        id: "RP-2026-001",
        code: "CSE-R-001",
        title: "Machine Learning-Based Student Performance Prediction",
        type: "FACULTY_RESEARCH",
        principalInvestigator: "Dr. Mahmud Hasan",
        coInvestigators: ["Ms. Nusrat Jahan", "Mr. Sakib Ahmed"],
        department: "Computer Science & Engineering",
        startDate: "2026-02-01",
        endDate: "2026-12-30",
        status: "ONGOING",
        progress: 68,
        funding: 250000,
        description:
            "This research explores machine learning techniques to identify academic performance patterns and support early intervention for students who may need academic assistance.",
        researchArea: "Machine Learning",
    },
    {
        id: "RP-2026-002",
        code: "CSE-R-002",
        title: "IoT-Based Smart Campus Monitoring System",
        type: "COLLABORATIVE",
        principalInvestigator: "Dr. Farhan Kabir",
        coInvestigators: ["Mr. Imran Hossain"],
        department: "Computer Science & Engineering",
        startDate: "2026-03-15",
        endDate: "2027-03-15",
        status: "ONGOING",
        progress: 42,
        funding: 180000,
        description:
            "A collaborative research project focused on IoT-based monitoring for campus energy consumption, environmental conditions, and facility management.",
        researchArea: "Internet of Things",
    },
    {
        id: "RP-2026-003",
        code: "CSE-R-003",
        title: "Secure Authentication for Web Applications",
        type: "FACULTY_RESEARCH",
        principalInvestigator: "Mr. Hasan Mahmud",
        coInvestigators: ["Dr. Mahmud Hasan"],
        department: "Computer Science & Engineering",
        startDate: "2025-08-01",
        endDate: "2026-06-30",
        status: "COMPLETED",
        progress: 100,
        funding: 120000,
        description:
            "An investigation into modern authentication approaches, token security, and practical access-control strategies for web-based applications.",
        researchArea: "Cybersecurity",
    },
    {
        id: "RP-2026-004",
        code: "CSE-R-004",
        title: "Bangla Natural Language Processing Research",
        type: "STUDENT_RESEARCH",
        principalInvestigator: "Ms. Nusrat Jahan",
        coInvestigators: ["STU-2023-CSE-0012", "STU-2023-CSE-0018"],
        department: "Computer Science & Engineering",
        startDate: "2026-06-01",
        endDate: "2027-01-31",
        status: "UNDER_REVIEW",
        progress: 15,
        funding: 75000,
        description:
            "A student-led research initiative exploring text preprocessing, language datasets, and evaluation methods for Bangla language processing.",
        researchArea: "Natural Language Processing",
    },
    {
        id: "RP-2026-005",
        code: "CSE-R-005",
        title: "Blockchain-Based Academic Credential Verification",
        type: "THESIS",
        principalInvestigator: "Mr. Sakib Ahmed",
        coInvestigators: ["STU-2023-CSE-0025"],
        department: "Computer Science & Engineering",
        startDate: "2026-09-01",
        endDate: "2027-05-30",
        status: "PLANNING",
        progress: 5,
        funding: 50000,
        description:
            "A thesis project investigating the use of blockchain technology to improve the integrity and verifiability of academic credentials.",
        researchArea: "Blockchain",
    },
];

const initialPublications: Publication[] = [
    {
        id: "PUB-2026-001",
        title: "Predictive Analytics for Student Academic Performance",
        authors: ["Dr. Mahmud Hasan", "Ms. Nusrat Jahan"],
        journal: "Journal of Educational Computing",
        year: 2026,
        type: "JOURNAL",
        status: "PUBLISHED",
        doi: "10.1234/jec.2026.001",
    },
    {
        id: "PUB-2026-002",
        title: "IoT Applications in Smart University Environments",
        authors: ["Dr. Farhan Kabir", "Mr. Imran Hossain"],
        journal: "International Conference on Smart Systems",
        year: 2026,
        type: "CONFERENCE",
        status: "ACCEPTED",
    },
    {
        id: "PUB-2026-003",
        title: "Modern Web Application Security Practices",
        authors: ["Mr. Hasan Mahmud"],
        journal: "Computing Research Review",
        year: 2026,
        type: "JOURNAL",
        status: "UNDER_REVIEW",
    },
];

const initialProposals: ResearchProposal[] = [
    {
        id: "PROP-2026-001",
        title: "AI-Assisted Academic Resource Recommendation",
        submittedBy: "Dr. Farhan Kabir",
        researchArea: "Machine Learning",
        submittedAt: "2026-11-05",
        requestedFunding: 200000,
        status: "PENDING",
    },
    {
        id: "PROP-2026-002",
        title: "Low-Cost Smart Laboratory Automation",
        submittedBy: "Mr. Imran Hossain",
        researchArea: "Internet of Things",
        submittedAt: "2026-11-03",
        requestedFunding: 150000,
        status: "PENDING",
    },
    {
        id: "PROP-2026-003",
        title: "Privacy-Aware Student Data Management",
        submittedBy: "Dr. Mahmud Hasan",
        researchArea: "Data Privacy",
        submittedAt: "2026-10-28",
        requestedFunding: 100000,
        status: "APPROVED",
    },
];

const statusStyles: Record<ResearchStatus, string> = {
    ONGOING:
        "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-400",
    COMPLETED:
        "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-400",
    UNDER_REVIEW:
        "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-400",
    PLANNING:
        "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-900 dark:bg-purple-950/40 dark:text-purple-400",
    ON_HOLD:
        "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400",
};

const statusLabels: Record<ResearchStatus, string> = {
    ONGOING: "Ongoing",
    COMPLETED: "Completed",
    UNDER_REVIEW: "Under Review",
    PLANNING: "Planning",
    ON_HOLD: "On Hold",
};

const typeLabels: Record<ResearchType, string> = {
    FACULTY_RESEARCH: "Faculty Research",
    STUDENT_RESEARCH: "Student Research",
    COLLABORATIVE: "Collaborative",
    THESIS: "Thesis",
};

function formatDate(date: string) {
    return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

function formatCurrency(amount: number) {
    return new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT",
        maximumFractionDigits: 0,
    }).format(amount);
}

function PublicationStatusBadge({
    status,
}: {
    status: Publication["status"];
}) {
    const styles = {
        PUBLISHED:
            "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-400",
        ACCEPTED:
            "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-400",
        UNDER_REVIEW:
            "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-400",
    };

    return (
        <Badge variant="outline" className={styles[status]}>
            {status.replace("_", " ").toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}
        </Badge>
    );
}

function ProposalStatusBadge({
    status,
}: {
    status: ResearchProposal["status"];
}) {
    const styles = {
        PENDING:
            "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-400",
        APPROVED:
            "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-400",
        REJECTED:
            "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400",
    };

    return (
        <Badge variant="outline" className={styles[status]}>
            {status.charAt(0) + status.slice(1).toLowerCase()}
        </Badge>
    );
}

export default function DepartmentResearchPage() {
    const [projects] = useState<ResearchProject[]>(initialProjects);
    const [publications] = useState<Publication[]>(initialPublications);
    const [proposals] = useState<ResearchProposal[]>(initialProposals);

    const [activeTab, setActiveTab] = useState<
        "projects" | "publications" | "proposals"
    >("projects");

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [typeFilter, setTypeFilter] = useState("ALL");
    const [selectedProject, setSelectedProject] =
        useState<ResearchProject | null>(null);

    const stats = useMemo(() => {
        const totalFunding = projects.reduce(
            (sum, project) => sum + project.funding,
            0,
        );

        return {
            totalProjects: projects.length,
            ongoing: projects.filter((p) => p.status === "ONGOING").length,
            completed: projects.filter((p) => p.status === "COMPLETED").length,
            publications: publications.filter((p) => p.status === "PUBLISHED").length,
            pendingProposals: proposals.filter((p) => p.status === "PENDING").length,
            totalFunding,
        };
    }, [projects, publications, proposals]);

    const filteredProjects = useMemo(() => {
        const query = search.toLowerCase().trim();

        return projects.filter((project) => {
            const matchesSearch =
                !query ||
                project.title.toLowerCase().includes(query) ||
                project.code.toLowerCase().includes(query) ||
                project.principalInvestigator.toLowerCase().includes(query) ||
                project.researchArea.toLowerCase().includes(query);

            const matchesStatus =
                statusFilter === "ALL" || project.status === statusFilter;

            const matchesType =
                typeFilter === "ALL" || project.type === typeFilter;

            return matchesSearch && matchesStatus && matchesType;
        });
    }, [projects, search, statusFilter, typeFilter]);

    const filteredPublications = useMemo(() => {
        const query = search.toLowerCase().trim();

        return publications.filter((publication) => {
            const matchesSearch =
                !query ||
                publication.title.toLowerCase().includes(query) ||
                publication.journal.toLowerCase().includes(query) ||
                publication.authors.some((author) =>
                    author.toLowerCase().includes(query),
                );

            const matchesStatus =
                statusFilter === "ALL" || publication.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [publications, search, statusFilter]);

    const filteredProposals = useMemo(() => {
        const query = search.toLowerCase().trim();

        return proposals.filter((proposal) => {
            const matchesSearch =
                !query ||
                proposal.title.toLowerCase().includes(query) ||
                proposal.id.toLowerCase().includes(query) ||
                proposal.submittedBy.toLowerCase().includes(query) ||
                proposal.researchArea.toLowerCase().includes(query);

            const matchesStatus =
                statusFilter === "ALL" || proposal.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [proposals, search, statusFilter]);

    const exportProjects = () => {
        const headers = [
            "Project ID",
            "Project Code",
            "Title",
            "Type",
            "Principal Investigator",
            "Research Area",
            "Start Date",
            "End Date",
            "Status",
            "Progress",
            "Funding (BDT)",
        ];

        const rows = filteredProjects.map((project) => [
            project.id,
            project.code,
            project.title,
            typeLabels[project.type],
            project.principalInvestigator,
            project.researchArea,
            project.startDate,
            project.endDate,
            statusLabels[project.status],
            `${project.progress}%`,
            project.funding,
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
        link.download = "department-research-projects.csv";
        link.click();

        URL.revokeObjectURL(url);
    };

    const resetFilters = () => {
        setSearch("");
        setStatusFilter("ALL");
        setTypeFilter("ALL");
    };

    const tabs = [
        { id: "projects", label: "Research Projects", count: projects.length },
        {
            id: "publications",
            label: "Publications",
            count: publications.length,
        },
        { id: "proposals", label: "Proposals", count: proposals.length },
    ] as const;

    return (
        <div className="space-y-6 pb-10 p-4">
            {/* Header */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <FlaskConical className="h-4 w-4" />
                        <span>Department</span>
                        <span>/</span>
                        <span>Research</span>
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Research Management
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Monitor research activities, faculty publications, and departmental
                        research proposals.
                    </p>
                </div>

                <Button variant="outline" onClick={exportProjects}>
                    <Download className="mr-2 h-4 w-4" />
                    Export Projects
                </Button>
            </div>

            {/* Pending Proposal Alert */}
            {stats.pendingProposals > 0 && (
                <div className="flex flex-col gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/30 sm:flex-row sm:items-center">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-400">
                        <AlertCircle className="h-5 w-5" />
                    </div>

                    <div className="flex-1">
                        <p className="font-semibold text-amber-900 dark:text-amber-300">
                            {stats.pendingProposals} research proposal
                            {stats.pendingProposals !== 1 ? "s" : ""} awaiting review
                        </p>
                        <p className="text-sm text-amber-800 dark:text-amber-400">
                            Review submitted proposals and provide feedback to researchers.
                        </p>
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        className="border-amber-300 bg-transparent text-amber-800 hover:bg-amber-100 dark:border-amber-800 dark:text-amber-300 dark:hover:bg-amber-900/40"
                        onClick={() => {
                            setActiveTab("proposals");
                            setStatusFilter("PENDING");
                        }}
                    >
                        Review Proposals
                    </Button>
                </div>
            )}

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                <Card>
                    <CardContent className="flex items-center justify-between p-4 sm:p-5">
                        <div>
                            <p className="text-sm text-muted-foreground">Total Projects</p>
                            <p className="mt-2 text-2xl font-bold">{stats.totalProjects}</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Department projects
                            </p>
                        </div>
                        <div className="rounded-lg bg-primary/10 p-3 text-primary">
                            <FlaskConical className="h-5 w-5" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center justify-between p-4 sm:p-5">
                        <div>
                            <p className="text-sm text-muted-foreground">Ongoing</p>
                            <p className="mt-2 text-2xl font-bold">{stats.ongoing}</p>
                            <p className="mt-1 text-xs text-blue-600 dark:text-blue-400">
                                Active research
                            </p>
                        </div>
                        <div className="rounded-lg bg-blue-100 p-3 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
                            <TrendingUp className="h-5 w-5" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center justify-between p-4 sm:p-5">
                        <div>
                            <p className="text-sm text-muted-foreground">Publications</p>
                            <p className="mt-2 text-2xl font-bold">{stats.publications}</p>
                            <p className="mt-1 text-xs text-green-600 dark:text-green-400">
                                Published papers
                            </p>
                        </div>
                        <div className="rounded-lg bg-green-100 p-3 text-green-700 dark:bg-green-950/50 dark:text-green-400">
                            <BookOpen className="h-5 w-5" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center justify-between p-4 sm:p-5">
                        <div>
                            <p className="text-sm text-muted-foreground">Research Funding</p>
                            <p className="mt-2 text-xl font-bold">
                                {formatCurrency(stats.totalFunding)}
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Allocated project budgets
                            </p>
                        </div>
                        <div className="rounded-lg bg-purple-100 p-3 text-purple-700 dark:bg-purple-950/50 dark:text-purple-400">
                            <Wallet className="h-5 w-5" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Research Insights */}
            <div className="grid gap-4 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base">
                            Research Activity Overview
                        </CardTitle>
                        <CardDescription>
                            Current status of departmental research projects.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        {(
                            [
                                "ONGOING",
                                "COMPLETED",
                                "UNDER_REVIEW",
                                "PLANNING",
                                "ON_HOLD",
                            ] as ResearchStatus[]
                        ).map((status) => {
                            const count = projects.filter(
                                (project) => project.status === status,
                            ).length;
                            const percentage =
                                projects.length > 0 ? (count / projects.length) * 100 : 0;

                            return (
                                <div key={status} className="space-y-2">
                                    <div className="flex items-center justify-between gap-2 text-sm">
                                        <div className="flex items-center gap-2">
                                            <span
                                                className={`h-2.5 w-2.5 rounded-full ${status === "ONGOING"
                                                    ? "bg-blue-500"
                                                    : status === "COMPLETED"
                                                        ? "bg-green-500"
                                                        : status === "UNDER_REVIEW"
                                                            ? "bg-amber-500"
                                                            : status === "PLANNING"
                                                                ? "bg-purple-500"
                                                                : "bg-red-500"
                                                    }`}
                                            />
                                            <span>{statusLabels[status]}</span>
                                        </div>
                                        <span className="font-medium tabular-nums">
                                            {count} ({Math.round(percentage)}%)
                                        </span>
                                    </div>

                                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                                        <div
                                            className={`h-full rounded-full ${status === "ONGOING"
                                                ? "bg-blue-500"
                                                : status === "COMPLETED"
                                                    ? "bg-green-500"
                                                    : status === "UNDER_REVIEW"
                                                        ? "bg-amber-500"
                                                        : status === "PLANNING"
                                                            ? "bg-purple-500"
                                                            : "bg-red-500"
                                                }`}
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base">Research Summary</CardTitle>
                        <CardDescription>
                            Department research indicators.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-blue-100 p-2 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
                                    <Users className="h-4 w-4" />
                                </div>
                                <span className="text-sm text-muted-foreground">
                                    Research contributors
                                </span>
                            </div>
                            <span className="font-semibold">
                                {
                                    new Set(
                                        projects.flatMap((project) => [
                                            project.principalInvestigator,
                                            ...project.coInvestigators,
                                        ]),
                                    ).size
                                }
                            </span>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-green-100 p-2 text-green-700 dark:bg-green-950/50 dark:text-green-400">
                                    <CheckCircle2 className="h-4 w-4" />
                                </div>
                                <span className="text-sm text-muted-foreground">
                                    Completed projects
                                </span>
                            </div>
                            <span className="font-semibold">{stats.completed}</span>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-amber-100 p-2 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
                                    <Clock className="h-4 w-4" />
                                </div>
                                <span className="text-sm text-muted-foreground">
                                    Pending proposals
                                </span>
                            </div>
                            <span className="font-semibold">{stats.pendingProposals}</span>
                        </div>

                        <div className="border-t pt-4">
                            <p className="text-xs text-muted-foreground">
                                Total allocated funding
                            </p>
                            <p className="mt-1 text-xl font-bold">
                                {formatCurrency(stats.totalFunding)}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Research Workspace */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-base">Research Workspace</CardTitle>
                    <CardDescription>
                        Browse projects, publications, and research proposals.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-5">
                    {/* Tabs */}
                    <div className="flex flex-wrap gap-2 border-b pb-3">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => {
                                    setActiveTab(tab.id);
                                    setSearch("");
                                    setStatusFilter("ALL");
                                    setTypeFilter("ALL");
                                }}
                                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${activeTab === tab.id
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                    }`}
                            >
                                {tab.label}
                                <span
                                    className={`rounded-full px-2 py-0.5 text-xs ${activeTab === tab.id
                                        ? "bg-primary-foreground/20 text-primary-foreground"
                                        : "bg-muted"
                                        }`}
                                >
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Search and Filters */}
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder={
                                    activeTab === "projects"
                                        ? "Search projects..."
                                        : activeTab === "publications"
                                            ? "Search publications..."
                                            : "Search proposals..."
                                }
                                className="pl-9"
                            />
                        </div>

                        <select
                            value={statusFilter}
                            onChange={(event) => setStatusFilter(event.target.value)}
                            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                        >
                            <option value="ALL">All Statuses</option>
                            {activeTab === "projects" ? (
                                <>
                                    <option value="ONGOING">Ongoing</option>
                                    <option value="COMPLETED">Completed</option>
                                    <option value="UNDER_REVIEW">Under Review</option>
                                    <option value="PLANNING">Planning</option>
                                    <option value="ON_HOLD">On Hold</option>
                                </>
                            ) : activeTab === "publications" ? (
                                <>
                                    <option value="PUBLISHED">Published</option>
                                    <option value="ACCEPTED">Accepted</option>
                                    <option value="UNDER_REVIEW">Under Review</option>
                                </>
                            ) : (
                                <>
                                    <option value="PENDING">Pending</option>
                                    <option value="APPROVED">Approved</option>
                                    <option value="REJECTED">Rejected</option>
                                </>
                            )}
                        </select>

                        {activeTab === "projects" && (
                            <select
                                value={typeFilter}
                                onChange={(event) => setTypeFilter(event.target.value)}
                                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                            >
                                <option value="ALL">All Research Types</option>
                                {Object.entries(typeLabels).map(([value, label]) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                    <div className="flex items-center justify-between gap-3 text-sm text-muted-foreground">
                        <span>
                            {activeTab === "projects"
                                ? `${filteredProjects.length} projects`
                                : activeTab === "publications"
                                    ? `${filteredPublications.length} publications`
                                    : `${filteredProposals.length} proposals`}
                        </span>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={resetFilters}
                            className="h-8"
                        >
                            Reset Filters
                        </Button>
                    </div>

                    {/* Projects */}
                    {activeTab === "projects" && (
                        <div className="grid gap-4 xl:grid-cols-2">
                            {filteredProjects.map((project) => (
                                <Card
                                    key={project.id}
                                    className="flex flex-col shadow-none transition-colors hover:border-primary/40"
                                >
                                    <CardContent className="flex flex-1 flex-col p-4 sm:p-5">
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <Badge variant="outline">{project.code}</Badge>
                                            <Badge
                                                variant="outline"
                                                className={statusStyles[project.status]}
                                            >
                                                {statusLabels[project.status]}
                                            </Badge>
                                        </div>

                                        <div className="mt-4 flex-1 space-y-3">
                                            <div>
                                                <h3 className="font-semibold leading-snug">
                                                    {project.title}
                                                </h3>
                                                <p className="mt-1 text-sm text-muted-foreground">
                                                    {project.researchArea}
                                                </p>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                <Badge variant="secondary">
                                                    {typeLabels[project.type]}
                                                </Badge>
                                            </div>

                                            <div className="grid gap-3 sm:grid-cols-2">
                                                <div className="flex items-start gap-2">
                                                    <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                                                    <div className="min-w-0">
                                                        <p className="text-xs text-muted-foreground">
                                                            Principal Investigator
                                                        </p>
                                                        <p className="text-sm font-medium">
                                                            {project.principalInvestigator}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-2">
                                                    <Wallet className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                                                    <div>
                                                        <p className="text-xs text-muted-foreground">
                                                            Project Funding
                                                        </p>
                                                        <p className="text-sm font-medium">
                                                            {formatCurrency(project.funding)}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-2">
                                                    <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                                                    <div>
                                                        <p className="text-xs text-muted-foreground">
                                                            Start Date
                                                        </p>
                                                        <p className="text-sm font-medium">
                                                            {formatDate(project.startDate)}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-2">
                                                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                                                    <div>
                                                        <p className="text-xs text-muted-foreground">
                                                            Expected Completion
                                                        </p>
                                                        <p className="text-sm font-medium">
                                                            {formatDate(project.endDate)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-2 pt-1">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-muted-foreground">
                                                        Project Progress
                                                    </span>
                                                    <span className="font-semibold tabular-nums">
                                                        {project.progress}%
                                                    </span>
                                                </div>

                                                <div className="h-2 overflow-hidden rounded-full bg-muted">
                                                    <div
                                                        className="h-full rounded-full bg-primary transition-all"
                                                        style={{ width: `${project.progress}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex items-center justify-between gap-2 border-t pt-3">
                                            <p className="text-xs text-muted-foreground">
                                                {project.coInvestigators.length} co-investigator
                                                {project.coInvestigators.length !== 1 ? "s" : ""}
                                            </p>

                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => setSelectedProject(project)}
                                            >
                                                <Eye className="mr-2 h-3.5 w-3.5" />
                                                View Details
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}

                            {filteredProjects.length === 0 && (
                                <div className="col-span-full rounded-lg border border-dashed p-10 text-center">
                                    <FlaskConical className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
                                    <p className="font-medium">No research projects found</p>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Try adjusting your search or filters.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Publications */}
                    {activeTab === "publications" && (
                        <div className="space-y-3">
                            {filteredPublications.map((publication) => (
                                <div
                                    key={publication.id}
                                    className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-start sm:justify-between"
                                >
                                    <div className="flex min-w-0 gap-3">
                                        <div className="h-fit rounded-lg bg-primary/10 p-2 text-primary">
                                            <BookOpen className="h-5 w-5" />
                                        </div>

                                        <div className="min-w-0 space-y-2">
                                            <div>
                                                <h3 className="font-semibold leading-snug">
                                                    {publication.title}
                                                </h3>
                                                <p className="mt-1 text-sm text-muted-foreground">
                                                    {publication.journal}
                                                </p>
                                            </div>

                                            <p className="text-sm text-muted-foreground">
                                                {publication.authors.join(", ")}
                                            </p>

                                            <div className="flex flex-wrap items-center gap-2">
                                                <Badge variant="secondary">
                                                    {publication.type.replace("_", " ")}
                                                </Badge>
                                                <span className="text-xs text-muted-foreground">
                                                    {publication.year}
                                                </span>
                                                <PublicationStatusBadge
                                                    status={publication.status}
                                                />
                                            </div>

                                            {publication.doi && (
                                                <p className="break-all text-xs text-muted-foreground">
                                                    DOI: {publication.doi}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {publication.doi && (
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="w-full shrink-0 sm:w-auto"
                                            onClick={() =>
                                                window.open(
                                                    `https://doi.org/${encodeURIComponent(publication.doi!)}`,
                                                    "_blank",
                                                    "noopener,noreferrer",
                                                )
                                            }
                                        >
                                            <ExternalLink className="mr-2 h-3.5 w-3.5" />
                                            View DOI
                                        </Button>
                                    )}
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
                    )}

                    {/* Proposals */}
                    {activeTab === "proposals" && (
                        <div className="space-y-3">
                            {filteredProposals.map((proposal) => (
                                <div
                                    key={proposal.id}
                                    className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                                >
                                    <div className="flex min-w-0 gap-3">
                                        <div className="h-fit rounded-lg bg-purple-100 p-2 text-purple-700 dark:bg-purple-950/50 dark:text-purple-400">
                                            <FileText className="h-5 w-5" />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-xs text-muted-foreground">
                                                {proposal.id}
                                            </p>
                                            <h3 className="mt-1 font-semibold leading-snug">
                                                {proposal.title}
                                            </h3>

                                            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                                                <span className="flex items-center gap-1">
                                                    <UserIcon />
                                                    {proposal.submittedBy}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <CalendarDays className="h-3.5 w-3.5" />
                                                    {formatDate(proposal.submittedAt)}
                                                </span>
                                            </div>

                                            <div className="mt-2 flex flex-wrap gap-2">
                                                <Badge variant="secondary">
                                                    {proposal.researchArea}
                                                </Badge>
                                                <span className="text-xs text-muted-foreground">
                                                    Requested: {formatCurrency(proposal.requestedFunding)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex shrink-0 items-center justify-between gap-3 sm:flex-col sm:items-end">
                                        <ProposalStatusBadge status={proposal.status} />
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            disabled={proposal.status !== "PENDING"}
                                            onClick={() =>
                                                window.alert(
                                                    "Connect this action to your research proposal review route.",
                                                )
                                            }
                                        >
                                            <Eye className="mr-2 h-3.5 w-3.5" />
                                            Review Proposal
                                        </Button>
                                    </div>
                                </div>
                            ))}

                            {filteredProposals.length === 0 && (
                                <div className="rounded-lg border border-dashed p-10 text-center">
                                    <FileText className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
                                    <p className="font-medium">No proposals found</p>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Try adjusting your search or filters.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Project Details Dialog */}
            <Dialog
                open={!!selectedProject}
                onOpenChange={(open) => !open && setSelectedProject(null)}
            >
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
                    {selectedProject && (
                        <>
                            <DialogHeader>
                                <div className="mb-2 flex flex-wrap items-center gap-2">
                                    <Badge variant="outline">{selectedProject.code}</Badge>
                                    <Badge
                                        variant="outline"
                                        className={statusStyles[selectedProject.status]}
                                    >
                                        {statusLabels[selectedProject.status]}
                                    </Badge>
                                </div>

                                <DialogTitle className="text-xl leading-snug">
                                    {selectedProject.title}
                                </DialogTitle>

                                <DialogDescription>
                                    Research project details and progress information.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-5">
                                <div>
                                    <p className="text-sm font-semibold">Project Description</p>
                                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                        {selectedProject.description}
                                    </p>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <p className="text-xs text-muted-foreground">
                                            Research Area
                                        </p>
                                        <p className="mt-1 text-sm font-medium">
                                            {selectedProject.researchArea}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-muted-foreground">
                                            Research Type
                                        </p>
                                        <p className="mt-1 text-sm font-medium">
                                            {typeLabels[selectedProject.type]}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-muted-foreground">
                                            Principal Investigator
                                        </p>
                                        <p className="mt-1 text-sm font-medium">
                                            {selectedProject.principalInvestigator}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-muted-foreground">
                                            Allocated Funding
                                        </p>
                                        <p className="mt-1 text-sm font-medium">
                                            {formatCurrency(selectedProject.funding)}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-muted-foreground">Start Date</p>
                                        <p className="mt-1 text-sm font-medium">
                                            {formatDate(selectedProject.startDate)}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-muted-foreground">
                                            Expected End Date
                                        </p>
                                        <p className="mt-1 text-sm font-medium">
                                            {formatDate(selectedProject.endDate)}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <p className="mb-2 text-sm font-semibold">Co-Investigators</p>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.coInvestigators.map((person) => (
                                            <Badge key={person} variant="secondary">
                                                {person}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <div className="mb-2 flex justify-between text-sm">
                                        <span className="font-semibold">Project Progress</span>
                                        <span className="font-semibold tabular-nums">
                                            {selectedProject.progress}%
                                        </span>
                                    </div>
                                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                                        <div
                                            className="h-full rounded-full bg-primary"
                                            style={{ width: `${selectedProject.progress}%` }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <DialogFooter>
                                <Button
                                    variant="outline"
                                    onClick={() => setSelectedProject(null)}
                                >
                                    Close
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}

function UserIcon() {
    return <Users className="h-3.5 w-3.5" />;
}
