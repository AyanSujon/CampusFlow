// import React from 'react'

// export default function proposals() {
//     return (
//         <div>proposals</div>
//     )
// }













"use client";

import { useMemo, useState } from "react";
import {
    Search,
    FileText,
    Plus,
    Download,
    Eye,
    CheckCircle2,
    XCircle,
    Clock,
    AlertCircle,
    CalendarDays,
    UserRound,
    BookOpen,
    Filter,
    MessageSquare,
    ExternalLink,
    X,
    RotateCcw,
    TrendingUp,
} from "lucide-react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

type ProposalStatus =
    | "SUBMITTED"
    | "UNDER_REVIEW"
    | "APPROVED"
    | "REVISION_REQUESTED"
    | "REJECTED";

type ProposalType =
    | "FACULTY_RESEARCH"
    | "STUDENT_RESEARCH"
    | "COLLABORATIVE"
    | "THESIS";

type Proposal = {
    id: string;
    title: string;
    proposalCode: string;
    principalInvestigator: string;
    email: string;
    department: string;
    type: ProposalType;
    submittedAt: string;
    startDate: string;
    endDate: string;
    requestedBudget: number;
    status: ProposalStatus;
    priority: "HIGH" | "MEDIUM" | "LOW";
    coResearchers: string[];
    researchArea: string;
    abstract: string;
    objectives: string[];
    methodology: string;
};

const initialProposals: Proposal[] = [
    {
        id: "1",
        proposalCode: "RES-2026-001",
        title: "Machine Learning-Based Student Performance Prediction",
        principalInvestigator: "Dr. Mahmud Hasan",
        email: "mahmud.hasan@campusflow.edu",
        department: "Computer Science & Engineering",
        type: "FACULTY_RESEARCH",
        submittedAt: "2026-11-02",
        startDate: "2027-01-01",
        endDate: "2027-12-31",
        requestedBudget: 185000,
        status: "SUBMITTED",
        priority: "HIGH",
        coResearchers: ["Nusrat Jahan", "Rakib Ahmed"],
        researchArea: "Artificial Intelligence",
        abstract:
            "This research aims to develop a machine learning model that analyzes academic records and learning patterns to identify students who may need additional academic support. The proposed system will explore predictive models and evaluate their effectiveness using anonymized academic datasets.",
        objectives: [
            "Analyze historical academic performance data.",
            "Develop predictive models for student performance.",
            "Evaluate model accuracy and reliability.",
            "Provide actionable academic support recommendations.",
        ],
        methodology:
            "The research will use anonymized historical student records, data preprocessing, feature engineering, model training, and comparative evaluation of selected machine learning algorithms.",
    },
    {
        id: "2",
        proposalCode: "RES-2026-002",
        title: "Sustainable Water Management in Rural Communities",
        principalInvestigator: "Dr. Farhana Akter",
        email: "farhana.akter@campusflow.edu",
        department: "Environmental Science",
        type: "FACULTY_RESEARCH",
        submittedAt: "2026-10-28",
        startDate: "2027-02-01",
        endDate: "2027-10-31",
        requestedBudget: 120000,
        status: "UNDER_REVIEW",
        priority: "MEDIUM",
        coResearchers: ["Sabbir Hossain"],
        researchArea: "Environmental Sustainability",
        abstract:
            "The proposed study investigates sustainable water management practices in rural communities, focusing on water accessibility, conservation practices, and community-level challenges.",
        objectives: [
            "Assess current water management practices.",
            "Identify major barriers to sustainable water access.",
            "Evaluate community awareness and participation.",
        ],
        methodology:
            "The study will combine field surveys, structured interviews, and analysis of available environmental data.",
    },
    {
        id: "3",
        proposalCode: "RES-2026-003",
        title: "Smart Agriculture Using IoT-Based Monitoring",
        principalInvestigator: "Tanvir Rahman",
        email: "tanvir.rahman@campusflow.edu",
        department: "Computer Science & Engineering",
        type: "STUDENT_RESEARCH",
        submittedAt: "2026-10-25",
        startDate: "2027-01-15",
        endDate: "2027-08-15",
        requestedBudget: 65000,
        status: "APPROVED",
        priority: "MEDIUM",
        coResearchers: ["Mehedi Hasan", "Sadia Islam"],
        researchArea: "Internet of Things",
        abstract:
            "This student research project proposes an IoT-based monitoring solution for agricultural environments. It will collect environmental readings and provide useful insights for irrigation and crop management.",
        objectives: [
            "Build a prototype sensor network.",
            "Collect environmental data.",
            "Evaluate the system under practical conditions.",
        ],
        methodology:
            "A prototype will be developed using IoT sensors and a microcontroller. Data will be collected and analyzed through a web-based monitoring dashboard.",
    },
    {
        id: "4",
        proposalCode: "RES-2026-004",
        title: "Digital Learning Adoption Among University Students",
        principalInvestigator: "Dr. Nusrat Sultana",
        email: "nusrat.sultana@campusflow.edu",
        department: "Business Administration",
        type: "COLLABORATIVE",
        submittedAt: "2026-10-20",
        startDate: "2027-01-01",
        endDate: "2027-06-30",
        requestedBudget: 95000,
        status: "REVISION_REQUESTED",
        priority: "HIGH",
        coResearchers: ["Dr. Kamal Uddin", "Ayesha Rahman"],
        researchArea: "Education Technology",
        abstract:
            "The study explores how university students adopt digital learning platforms and identifies factors that influence their engagement and satisfaction.",
        objectives: [
            "Measure student adoption of digital learning tools.",
            "Identify factors affecting student engagement.",
            "Recommend improvements to digital learning experiences.",
        ],
        methodology:
            "The research will use questionnaires, interviews, and statistical analysis of responses from selected university students.",
    },
    {
        id: "5",
        proposalCode: "RES-2026-005",
        title: "Renewable Energy Awareness Among Undergraduate Students",
        principalInvestigator: "Rafiul Islam",
        email: "rafiul.islam@campusflow.edu",
        department: "Electrical & Electronic Engineering",
        type: "THESIS",
        submittedAt: "2026-10-15",
        startDate: "2027-01-01",
        endDate: "2027-05-31",
        requestedBudget: 35000,
        status: "REJECTED",
        priority: "LOW",
        coResearchers: ["Shakib Hossain"],
        researchArea: "Renewable Energy",
        abstract:
            "This thesis proposal examines awareness and understanding of renewable energy technologies among undergraduate students.",
        objectives: [
            "Measure awareness of renewable energy.",
            "Identify common misconceptions.",
            "Explore factors influencing adoption.",
        ],
        methodology:
            "A cross-sectional survey will be conducted among undergraduate students, followed by descriptive statistical analysis.",
    },
];

const statusConfig: Record<
    ProposalStatus,
    { label: string; className: string }
> = {
    SUBMITTED: {
        label: "Submitted",
        className: "border-blue-500/20 bg-blue-500/10 text-blue-600",
    },
    UNDER_REVIEW: {
        label: "Under Review",
        className: "border-amber-500/20 bg-amber-500/10 text-amber-600",
    },
    APPROVED: {
        label: "Approved",
        className: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600",
    },
    REVISION_REQUESTED: {
        label: "Revision Requested",
        className: "border-purple-500/20 bg-purple-500/10 text-purple-600",
    },
    REJECTED: {
        label: "Rejected",
        className: "border-red-500/20 bg-red-500/10 text-red-600",
    },
};

const priorityConfig = {
    HIGH: "border-red-500/20 bg-red-500/10 text-red-600",
    MEDIUM: "border-amber-500/20 bg-amber-500/10 text-amber-600",
    LOW: "border-muted bg-muted text-muted-foreground",
};

const typeLabels: Record<ProposalType, string> = {
    FACULTY_RESEARCH: "Faculty Research",
    STUDENT_RESEARCH: "Student Research",
    COLLABORATIVE: "Collaborative",
    THESIS: "Thesis",
};

function formatCurrency(amount: number) {
    return new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT",
        maximumFractionDigits: 0,
    }).format(amount);
}

function formatDate(date: string) {
    return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

function StatusBadge({ status }: { status: ProposalStatus }) {
    const config = statusConfig[status];

    return (
        <Badge variant="outline" className={config.className}>
            {config.label}
        </Badge>
    );
}

function PriorityBadge({
    priority,
}: {
    priority: Proposal["priority"];
}) {
    return (
        <Badge variant="outline" className={priorityConfig[priority]}>
            {priority} Priority
        </Badge>
    );
}

export default function ProposalsPage() {
    const [proposals, setProposals] = useState(initialProposals);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [typeFilter, setTypeFilter] = useState("ALL");
    const [priorityFilter, setPriorityFilter] = useState("ALL");

    const [selectedProposal, setSelectedProposal] =
        useState<Proposal | null>(null);

    const [reviewProposal, setReviewProposal] =
        useState<Proposal | null>(null);

    const [reviewAction, setReviewAction] = useState<
        "APPROVED" | "REJECTED" | "REVISION_REQUESTED" | null
    >(null);

    const [reviewNote, setReviewNote] = useState("");

    const stats = useMemo(() => {
        return {
            total: proposals.length,
            pending: proposals.filter(
                (item) =>
                    item.status === "SUBMITTED" ||
                    item.status === "UNDER_REVIEW",
            ).length,
            approved: proposals.filter(
                (item) => item.status === "APPROVED",
            ).length,
            revision: proposals.filter(
                (item) => item.status === "REVISION_REQUESTED",
            ).length,
            requestedBudget: proposals
                .filter(
                    (item) =>
                        item.status === "SUBMITTED" ||
                        item.status === "UNDER_REVIEW",
                )
                .reduce((sum, item) => sum + item.requestedBudget, 0),
        };
    }, [proposals]);

    const filteredProposals = useMemo(() => {
        const query = search.toLowerCase().trim();

        return proposals.filter((proposal) => {
            const matchesSearch =
                !query ||
                proposal.title.toLowerCase().includes(query) ||
                proposal.proposalCode.toLowerCase().includes(query) ||
                proposal.principalInvestigator.toLowerCase().includes(query) ||
                proposal.researchArea.toLowerCase().includes(query);

            const matchesStatus =
                statusFilter === "ALL" || proposal.status === statusFilter;

            const matchesType =
                typeFilter === "ALL" || proposal.type === typeFilter;

            const matchesPriority =
                priorityFilter === "ALL" ||
                proposal.priority === priorityFilter;

            return (
                matchesSearch &&
                matchesStatus &&
                matchesType &&
                matchesPriority
            );
        });
    }, [proposals, search, statusFilter, typeFilter, priorityFilter]);

    const openReview = (
        proposal: Proposal,
        action: "APPROVED" | "REJECTED" | "REVISION_REQUESTED",
    ) => {
        setReviewProposal(proposal);
        setReviewAction(action);
        setReviewNote("");
    };

    const submitReview = () => {
        if (!reviewProposal || !reviewAction) return;

        if (
            (reviewAction === "REJECTED" ||
                reviewAction === "REVISION_REQUESTED") &&
            !reviewNote.trim()
        ) {
            return;
        }

        setProposals((current) =>
            current.map((proposal) =>
                proposal.id === reviewProposal.id
                    ? { ...proposal, status: reviewAction }
                    : proposal,
            ),
        );

        setReviewProposal(null);
        setReviewAction(null);
        setReviewNote("");
    };

    const exportCSV = () => {
        const headers = [
            "Proposal Code",
            "Title",
            "Principal Investigator",
            "Department",
            "Type",
            "Research Area",
            "Submitted Date",
            "Requested Budget",
            "Priority",
            "Status",
        ];

        const rows = filteredProposals.map((proposal) => [
            proposal.proposalCode,
            proposal.title,
            proposal.principalInvestigator,
            proposal.department,
            typeLabels[proposal.type],
            proposal.researchArea,
            proposal.submittedAt,
            proposal.requestedBudget,
            proposal.priority,
            statusConfig[proposal.status].label,
        ]);

        const csv = [headers, ...rows]
            .map((row) =>
                row
                    .map(
                        (value) =>
                            `"${String(value).replace(/"/g, '""')}"`,
                    )
                    .join(","),
            )
            .join("\n");

        const blob = new Blob(["\uFEFF" + csv], {
            type: "text/csv;charset=utf-8;",
        });

        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");

        anchor.href = url;
        anchor.download = "research-proposals.csv";
        anchor.click();

        URL.revokeObjectURL(url);
    };

    const resetFilters = () => {
        setSearch("");
        setStatusFilter("ALL");
        setTypeFilter("ALL");
        setPriorityFilter("ALL");
    };

    return (
        <div className="space-y-6 pb-10 p-4">
            {/* Header */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <BookOpen className="h-4 w-4" />
                        Research Management
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Research Proposals
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        Review, evaluate, and manage research proposals submitted
                        to your department.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" onClick={exportCSV}>
                        <Download className="mr-2 h-4 w-4" />
                        Export CSV
                    </Button>

                    <Button render={<Link href="/department-head/research/proposals/create">
                        <Plus className="mr-2 h-4 w-4" />
                        New Proposal
                    </Link>}>

                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-xl border bg-card p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">
                            Total Proposals
                        </p>
                        <div className="rounded-lg bg-primary/10 p-2 text-primary">
                            <FileText className="h-4 w-4" />
                        </div>
                    </div>

                    <div className="mt-3 flex items-end justify-between">
                        <h3 className="text-2xl font-bold">{stats.total}</h3>
                        <span className="text-xs text-muted-foreground">
                            All submissions
                        </span>
                    </div>
                </div>

                <div className="rounded-xl border bg-card p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">
                            Awaiting Review
                        </p>
                        <div className="rounded-lg bg-amber-500/10 p-2 text-amber-600">
                            <Clock className="h-4 w-4" />
                        </div>
                    </div>

                    <div className="mt-3 flex items-end justify-between">
                        <h3 className="text-2xl font-bold">{stats.pending}</h3>
                        <span className="text-xs text-amber-600">
                            Needs attention
                        </span>
                    </div>
                </div>

                <div className="rounded-xl border bg-card p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">
                            Approved
                        </p>
                        <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-600">
                            <CheckCircle2 className="h-4 w-4" />
                        </div>
                    </div>

                    <div className="mt-3 flex items-end justify-between">
                        <h3 className="text-2xl font-bold">{stats.approved}</h3>
                        <span className="text-xs text-muted-foreground">
                            Approved proposals
                        </span>
                    </div>
                </div>

                <div className="rounded-xl border bg-card p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">
                            Pending Budget
                        </p>
                        <div className="rounded-lg bg-violet-500/10 p-2 text-violet-600">
                            <TrendingUp className="h-4 w-4" />
                        </div>
                    </div>

                    <div className="mt-3">
                        <h3 className="text-xl font-bold">
                            {formatCurrency(stats.requestedBudget)}
                        </h3>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Requested by proposals awaiting review
                        </p>
                    </div>
                </div>
            </div>

            {/* Review alert */}
            {stats.pending > 0 && (
                <div className="flex flex-col gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

                        <div>
                            <p className="text-sm font-semibold">
                                {stats.pending} proposal{stats.pending > 1 ? "s" : ""}{" "}
                                awaiting your review
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Review the submitted proposals and provide a decision or
                                feedback.
                            </p>
                        </div>
                    </div>

                    <Button
                        size="sm"
                        variant="outline"
                        className="shrink-0"
                        onClick={() => {
                            setStatusFilter("SUBMITTED");
                            setSearch("");
                            setTypeFilter("ALL");
                            setPriorityFilter("ALL");
                        }}
                    >
                        Review submissions
                    </Button>
                </div>
            )}

            {/* Filters */}
            <div className="rounded-xl border bg-card p-4">
                <div className="mb-4 flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <h2 className="text-sm font-semibold">Filter Proposals</h2>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                    <div className="relative lg:col-span-2">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search title, code, researcher..."
                            className="pl-9"
                        />
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(event) => setStatusFilter(event.target.value)}
                        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                    >
                        <option value="ALL">All statuses</option>
                        <option value="SUBMITTED">Submitted</option>
                        <option value="UNDER_REVIEW">Under Review</option>
                        <option value="APPROVED">Approved</option>
                        <option value="REVISION_REQUESTED">Revision Requested</option>
                        <option value="REJECTED">Rejected</option>
                    </select>

                    <select
                        value={typeFilter}
                        onChange={(event) => setTypeFilter(event.target.value)}
                        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                    >
                        <option value="ALL">All types</option>
                        <option value="FACULTY_RESEARCH">Faculty Research</option>
                        <option value="STUDENT_RESEARCH">Student Research</option>
                        <option value="COLLABORATIVE">Collaborative</option>
                        <option value="THESIS">Thesis</option>
                    </select>

                    <select
                        value={priorityFilter}
                        onChange={(event) => setPriorityFilter(event.target.value)}
                        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                    >
                        <option value="ALL">All priorities</option>
                        <option value="HIGH">High Priority</option>
                        <option value="MEDIUM">Medium Priority</option>
                        <option value="LOW">Low Priority</option>
                    </select>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs text-muted-foreground">
                        Showing {filteredProposals.length} of {proposals.length} proposals
                    </p>

                    {(search ||
                        statusFilter !== "ALL" ||
                        typeFilter !== "ALL" ||
                        priorityFilter !== "ALL") && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={resetFilters}
                                className="h-8 text-xs"
                            >
                                <RotateCcw className="mr-2 h-3 w-3" />
                                Reset filters
                            </Button>
                        )}
                </div>
            </div>

            {/* Proposal list */}
            <div className="overflow-hidden rounded-xl border bg-card">
                <div className="flex items-center justify-between border-b p-4">
                    <div>
                        <h2 className="font-semibold">Submitted Proposals</h2>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Research proposals from your department
                        </p>
                    </div>

                    <Badge variant="secondary">
                        {filteredProposals.length} Records
                    </Badge>
                </div>

                {filteredProposals.length === 0 ? (
                    <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
                        <div className="rounded-full bg-muted p-4">
                            <FileText className="h-7 w-7 text-muted-foreground" />
                        </div>
                        <h3 className="mt-4 font-semibold">No proposals found</h3>
                        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                            Try changing your search keywords or filters.
                        </p>
                        <Button
                            variant="outline"
                            size="sm"
                            className="mt-4"
                            onClick={resetFilters}
                        >
                            Clear filters
                        </Button>
                    </div>
                ) : (
                    <>
                        {/* Desktop table */}
                        <div className="hidden overflow-x-auto md:block">
                            <table className="w-full text-sm">
                                <thead className="bg-muted/40 text-left text-xs text-muted-foreground">
                                    <tr>
                                        <th className="px-5 py-3 font-medium">Proposal</th>
                                        <th className="px-5 py-3 font-medium">Researcher</th>
                                        <th className="px-5 py-3 font-medium">Type</th>
                                        <th className="px-5 py-3 font-medium">Budget</th>
                                        <th className="px-5 py-3 font-medium">Priority</th>
                                        <th className="px-5 py-3 font-medium">Status</th>
                                        <th className="px-5 py-3 text-right font-medium">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y">
                                    {filteredProposals.map((proposal) => (
                                        <tr
                                            key={proposal.id}
                                            className="transition-colors hover:bg-muted/30"
                                        >
                                            <td className="max-w-[280px] px-5 py-4">
                                                <p className="font-medium leading-5">
                                                    {proposal.title}
                                                </p>
                                                <p className="mt-1 text-xs text-muted-foreground">
                                                    {proposal.proposalCode}
                                                </p>
                                                <p className="mt-1 text-xs text-muted-foreground">
                                                    Submitted {formatDate(proposal.submittedAt)}
                                                </p>
                                            </td>

                                            <td className="px-5 py-4">
                                                <p className="font-medium">
                                                    {proposal.principalInvestigator}
                                                </p>
                                                <p className="mt-1 text-xs text-muted-foreground">
                                                    {proposal.department}
                                                </p>
                                            </td>

                                            <td className="px-5 py-4">
                                                <span className="text-xs">
                                                    {typeLabels[proposal.type]}
                                                </span>
                                            </td>

                                            <td className="whitespace-nowrap px-5 py-4 font-medium">
                                                {formatCurrency(proposal.requestedBudget)}
                                            </td>

                                            <td className="px-5 py-4">
                                                <PriorityBadge priority={proposal.priority} />
                                            </td>

                                            <td className="px-5 py-4">
                                                <StatusBadge status={proposal.status} />
                                            </td>

                                            <td className="px-5 py-4">
                                                <div className="flex justify-end gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        title="View proposal"
                                                        onClick={() => setSelectedProposal(proposal)}
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Button>

                                                    {proposal.status === "SUBMITTED" ||
                                                        proposal.status === "UNDER_REVIEW" ? (
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            title="Review proposal"
                                                            onClick={() =>
                                                                openReview(proposal, "APPROVED")
                                                            }
                                                        >
                                                            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                                                        </Button>
                                                    ) : null}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile cards */}
                        <div className="divide-y md:hidden">
                            {filteredProposals.map((proposal) => (
                                <div key={proposal.id} className="space-y-3 p-4">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <p className="font-semibold leading-5">
                                                {proposal.title}
                                            </p>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {proposal.proposalCode}
                                            </p>
                                        </div>
                                        <StatusBadge status={proposal.status} />
                                    </div>

                                    <div className="space-y-1.5 text-xs text-muted-foreground">
                                        <p className="flex items-center gap-2">
                                            <UserRound className="h-3.5 w-3.5" />
                                            {proposal.principalInvestigator}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <BookOpen className="h-3.5 w-3.5" />
                                            {typeLabels[proposal.type]}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <CalendarDays className="h-3.5 w-3.5" />
                                            Submitted {formatDate(proposal.submittedAt)}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <div className="space-y-1">
                                            <p className="text-sm font-semibold">
                                                {formatCurrency(proposal.requestedBudget)}
                                            </p>
                                            <PriorityBadge priority={proposal.priority} />
                                        </div>

                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => setSelectedProposal(proposal)}
                                        >
                                            <Eye className="mr-2 h-4 w-4" />
                                            View details
                                        </Button>
                                    </div>

                                    {(proposal.status === "SUBMITTED" ||
                                        proposal.status === "UNDER_REVIEW") && (
                                            <div className="flex flex-wrap gap-2">
                                                <Button
                                                    size="sm"
                                                    className="flex-1"
                                                    onClick={() =>
                                                        openReview(proposal, "APPROVED")
                                                    }
                                                >
                                                    <CheckCircle2 className="mr-2 h-4 w-4" />
                                                    Review
                                                </Button>
                                            </div>
                                        )}
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Proposal details dialog */}
            <Dialog
                open={!!selectedProposal}
                onOpenChange={(open) => {
                    if (!open) setSelectedProposal(null);
                }}
            >
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                    {selectedProposal && (
                        <>
                            <DialogHeader>
                                <div className="mb-2 flex flex-wrap items-center gap-2">
                                    <Badge variant="secondary">
                                        {selectedProposal.proposalCode}
                                    </Badge>
                                    <StatusBadge status={selectedProposal.status} />
                                    <PriorityBadge priority={selectedProposal.priority} />
                                </div>

                                <DialogTitle className="text-xl leading-7">
                                    {selectedProposal.title}
                                </DialogTitle>

                                <DialogDescription>
                                    {typeLabels[selectedProposal.type]} ·{" "}
                                    {selectedProposal.researchArea}
                                </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-5">
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <div className="rounded-lg border p-3">
                                        <p className="text-xs text-muted-foreground">
                                            Principal Investigator
                                        </p>
                                        <p className="mt-1 text-sm font-semibold">
                                            {selectedProposal.principalInvestigator}
                                        </p>
                                        <p className="mt-1 break-all text-xs text-muted-foreground">
                                            {selectedProposal.email}
                                        </p>
                                    </div>

                                    <div className="rounded-lg border p-3">
                                        <p className="text-xs text-muted-foreground">
                                            Requested Budget
                                        </p>
                                        <p className="mt-1 text-lg font-bold">
                                            {formatCurrency(selectedProposal.requestedBudget)}
                                        </p>
                                    </div>

                                    <div className="rounded-lg border p-3">
                                        <p className="text-xs text-muted-foreground">
                                            Submission Date
                                        </p>
                                        <p className="mt-1 text-sm font-semibold">
                                            {formatDate(selectedProposal.submittedAt)}
                                        </p>
                                    </div>

                                    <div className="rounded-lg border p-3">
                                        <p className="text-xs text-muted-foreground">
                                            Research Period
                                        </p>
                                        <p className="mt-1 text-sm font-semibold">
                                            {formatDate(selectedProposal.startDate)} –{" "}
                                            {formatDate(selectedProposal.endDate)}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="mb-2 text-sm font-semibold">
                                        Abstract
                                    </h3>
                                    <p className="text-sm leading-6 text-muted-foreground">
                                        {selectedProposal.abstract}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="mb-2 text-sm font-semibold">
                                        Research Objectives
                                    </h3>
                                    <ul className="space-y-2">
                                        {selectedProposal.objectives.map((objective) => (
                                            <li
                                                key={objective}
                                                className="flex gap-2 text-sm text-muted-foreground"
                                            >
                                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                                {objective}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="mb-2 text-sm font-semibold">
                                        Methodology
                                    </h3>
                                    <p className="text-sm leading-6 text-muted-foreground">
                                        {selectedProposal.methodology}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="mb-2 text-sm font-semibold">
                                        Co-researchers
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProposal.coResearchers.map((researcher) => (
                                            <Badge key={researcher} variant="secondary">
                                                {researcher}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <DialogFooter className="flex-col gap-2 sm:flex-row">
                                {(selectedProposal.status === "SUBMITTED" ||
                                    selectedProposal.status === "UNDER_REVIEW") && (
                                        <>
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    openReview(selectedProposal, "REVISION_REQUESTED");
                                                    setSelectedProposal(null);
                                                }}
                                            >
                                                <MessageSquare className="mr-2 h-4 w-4" />
                                                Request Revision
                                            </Button>

                                            <Button
                                                onClick={() => {
                                                    openReview(selectedProposal, "APPROVED");
                                                    setSelectedProposal(null);
                                                }}
                                            >
                                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                                Approve Proposal
                                            </Button>
                                        </>
                                    )}
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>

            {/* Review decision dialog */}
            <Dialog
                open={!!reviewProposal && !!reviewAction}
                onOpenChange={(open) => {
                    if (!open) {
                        setReviewProposal(null);
                        setReviewAction(null);
                        setReviewNote("");
                    }
                }}
            >
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>
                            {reviewAction === "APPROVED" && "Approve Proposal"}
                            {reviewAction === "REJECTED" && "Reject Proposal"}
                            {reviewAction === "REVISION_REQUESTED" &&
                                "Request Proposal Revision"}
                        </DialogTitle>

                        <DialogDescription>
                            {reviewProposal?.title}
                        </DialogDescription>
                    </DialogHeader>

                    {reviewAction === "APPROVED" ? (
                        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
                            <p className="text-sm text-emerald-700 dark:text-emerald-400">
                                You are about to approve this research proposal. Make sure
                                the research scope and requested budget have been reviewed.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                {reviewAction === "REJECTED"
                                    ? "Reason for rejection"
                                    : "Revision feedback"}
                                <span className="ml-1 text-red-500">*</span>
                            </label>

                            <Textarea
                                value={reviewNote}
                                onChange={(event) => setReviewNote(event.target.value)}
                                placeholder={
                                    reviewAction === "REJECTED"
                                        ? "Explain why this proposal is being rejected..."
                                        : "Describe the changes required before resubmission..."
                                }
                                rows={5}
                            />

                            <p className="text-xs text-muted-foreground">
                                A clear explanation helps the researcher understand the
                                decision.
                            </p>
                        </div>
                    )}

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setReviewProposal(null);
                                setReviewAction(null);
                                setReviewNote("");
                            }}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant={reviewAction === "REJECTED" ? "destructive" : "default"}
                            disabled={
                                (reviewAction === "REJECTED" ||
                                    reviewAction === "REVISION_REQUESTED") &&
                                !reviewNote.trim()
                            }
                            onClick={submitReview}
                        >
                            {reviewAction === "APPROVED" && (
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                            )}
                            {reviewAction === "REJECTED" && (
                                <XCircle className="mr-2 h-4 w-4" />
                            )}
                            {reviewAction === "REVISION_REQUESTED" && (
                                <MessageSquare className="mr-2 h-4 w-4" />
                            )}
                            Confirm Decision
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
