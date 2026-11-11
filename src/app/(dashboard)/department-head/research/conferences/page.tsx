// import React from 'react'

// export default function conferences() {
//     return (
//         <div>conferences</div>
//     )
// }















"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
    Search,
    CalendarDays,
    Plus,
    Download,
    Eye,
    MapPin,
    Users,
    Presentation,
    Video,
    Globe,
    Clock,
    Filter,
    ExternalLink,
    BookOpen,
    Building2,
} from "lucide-react";

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

type ConferenceStatus = "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELLED";

type ConferenceMode = "IN_PERSON" | "ONLINE" | "HYBRID";

type Conference = {
    id: string;
    code: string;
    name: string;
    organizer: string;
    hostInstitution: string;
    location: string;
    mode: ConferenceMode;
    startDate: string;
    endDate: string;
    submissionDeadline: string;
    registrationDeadline: string;
    status: ConferenceStatus;
    researchArea: string;
    website: string;
    participants: number;
    papersPresented: number;
    description: string;
};

const initialConferences: Conference[] = [
    {
        id: "1",
        code: "CONF-2026-001",
        name: "International Conference on Artificial Intelligence",
        organizer: "International AI Research Society",
        hostInstitution: "University of Dhaka",
        location: "Dhaka, Bangladesh",
        mode: "HYBRID",
        startDate: "2026-12-15",
        endDate: "2026-12-17",
        submissionDeadline: "2026-11-20",
        registrationDeadline: "2026-12-05",
        status: "UPCOMING",
        researchArea: "Artificial Intelligence",
        website: "https://example.com/ai-conference",
        participants: 12,
        papersPresented: 0,
        description:
            "An international academic conference bringing together researchers and practitioners to discuss recent developments in artificial intelligence, machine learning, and intelligent systems.",
    },
    {
        id: "2",
        code: "CONF-2026-002",
        name: "National Conference on Environmental Sustainability",
        organizer: "Bangladesh Environmental Research Forum",
        hostInstitution: "Noakhali Science and Technology University",
        location: "Noakhali, Bangladesh",
        mode: "IN_PERSON",
        startDate: "2026-11-20",
        endDate: "2026-11-21",
        submissionDeadline: "2026-10-30",
        registrationDeadline: "2026-11-15",
        status: "UPCOMING",
        researchArea: "Environmental Science",
        website: "https://example.com/environment-conference",
        participants: 8,
        papersPresented: 0,
        description:
            "A national conference focused on environmental protection, climate change, sustainable development, and community-based research.",
    },
    {
        id: "3",
        code: "CONF-2026-003",
        name: "International Conference on Software Engineering",
        organizer: "Software Engineering Research Network",
        hostInstitution: "Online",
        location: "Virtual",
        mode: "ONLINE",
        startDate: "2026-10-25",
        endDate: "2026-10-26",
        submissionDeadline: "2026-09-15",
        registrationDeadline: "2026-10-15",
        status: "COMPLETED",
        researchArea: "Software Engineering",
        website: "https://example.com/software-conference",
        participants: 15,
        papersPresented: 6,
        description:
            "A virtual academic event covering modern software architecture, software quality, engineering practices, and emerging development technologies.",
    },
    {
        id: "4",
        code: "CONF-2026-004",
        name: "Business Innovation and Management Conference",
        organizer: "Global Business Research Association",
        hostInstitution: "North South University",
        location: "Dhaka, Bangladesh",
        mode: "IN_PERSON",
        startDate: "2026-11-11",
        endDate: "2026-11-12",
        submissionDeadline: "2026-10-01",
        registrationDeadline: "2026-11-05",
        status: "ONGOING",
        researchArea: "Business Administration",
        website: "https://example.com/business-conference",
        participants: 10,
        papersPresented: 3,
        description:
            "An academic event exploring business innovation, entrepreneurship, management strategies, and organizational development.",
    },
    {
        id: "5",
        code: "CONF-2026-005",
        name: "International Conference on Renewable Energy",
        organizer: "Renewable Energy Research Council",
        hostInstitution: "Bangladesh University of Engineering and Technology",
        location: "Dhaka, Bangladesh",
        mode: "HYBRID",
        startDate: "2027-01-18",
        endDate: "2027-01-20",
        submissionDeadline: "2026-12-10",
        registrationDeadline: "2027-01-05",
        status: "UPCOMING",
        researchArea: "Renewable Energy",
        website: "https://example.com/renewable-energy",
        participants: 6,
        papersPresented: 0,
        description:
            "A research conference focused on renewable energy technologies, energy efficiency, sustainable power systems, and future energy solutions.",
    },
    {
        id: "6",
        code: "CONF-2026-006",
        name: "Student Research and Innovation Symposium",
        organizer: "University Research Committee",
        hostInstitution: "CampusFlow University",
        location: "Campus Auditorium",
        mode: "IN_PERSON",
        startDate: "2026-09-10",
        endDate: "2026-09-10",
        submissionDeadline: "2026-08-20",
        registrationDeadline: "2026-09-01",
        status: "COMPLETED",
        researchArea: "Multidisciplinary",
        website: "https://example.com/student-symposium",
        participants: 24,
        papersPresented: 12,
        description:
            "A university-level symposium that provides undergraduate and postgraduate students with an opportunity to present research projects and exchange ideas.",
    },
];

const statusConfig: Record<
    ConferenceStatus,
    { label: string; className: string }
> = {
    UPCOMING: {
        label: "Upcoming",
        className: "border-blue-500/20 bg-blue-500/10 text-blue-600",
    },
    ONGOING: {
        label: "Ongoing",
        className: "border-amber-500/20 bg-amber-500/10 text-amber-600",
    },
    COMPLETED: {
        label: "Completed",
        className: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600",
    },
    CANCELLED: {
        label: "Cancelled",
        className: "border-red-500/20 bg-red-500/10 text-red-600",
    },
};

const modeLabels: Record<ConferenceMode, string> = {
    IN_PERSON: "In Person",
    ONLINE: "Online",
    HYBRID: "Hybrid",
};

function formatDate(date: string) {
    return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

function StatusBadge({ status }: { status: ConferenceStatus }) {
    return (
        <Badge variant="outline" className={statusConfig[status].className}>
            {statusConfig[status].label}
        </Badge>
    );
}

function ModeIcon({ mode }: { mode: ConferenceMode }) {
    if (mode === "ONLINE") return <Video className="h-4 w-4" />;
    if (mode === "HYBRID") return <Globe className="h-4 w-4" />;
    return <MapPin className="h-4 w-4" />;
}

export default function ConferencesPage() {
    const [conferences] = useState(initialConferences);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [modeFilter, setModeFilter] = useState("ALL");
    const [areaFilter, setAreaFilter] = useState("ALL");
    const [selectedConference, setSelectedConference] =
        useState<Conference | null>(null);

    const stats = useMemo(() => {
        return {
            total: conferences.length,
            upcoming: conferences.filter((item) => item.status === "UPCOMING")
                .length,
            ongoing: conferences.filter((item) => item.status === "ONGOING")
                .length,
            completed: conferences.filter((item) => item.status === "COMPLETED")
                .length,
            participants: conferences.reduce(
                (sum, item) => sum + item.participants,
                0,
            ),
        };
    }, [conferences]);

    const researchAreas = useMemo(
        () => [...new Set(conferences.map((item) => item.researchArea))].sort(),
        [conferences],
    );

    const filteredConferences = useMemo(() => {
        const query = search.toLowerCase().trim();

        return conferences.filter((conference) => {
            const matchesSearch =
                !query ||
                conference.name.toLowerCase().includes(query) ||
                conference.code.toLowerCase().includes(query) ||
                conference.organizer.toLowerCase().includes(query) ||
                conference.hostInstitution.toLowerCase().includes(query) ||
                conference.location.toLowerCase().includes(query);

            const matchesStatus =
                statusFilter === "ALL" || conference.status === statusFilter;

            const matchesMode =
                modeFilter === "ALL" || conference.mode === modeFilter;

            const matchesArea =
                areaFilter === "ALL" || conference.researchArea === areaFilter;

            return (
                matchesSearch &&
                matchesStatus &&
                matchesMode &&
                matchesArea
            );
        });
    }, [conferences, search, statusFilter, modeFilter, areaFilter]);

    const exportCSV = () => {
        const headers = [
            "Conference Code",
            "Conference Name",
            "Organizer",
            "Host Institution",
            "Location",
            "Mode",
            "Research Area",
            "Start Date",
            "End Date",
            "Submission Deadline",
            "Registration Deadline",
            "Participants",
            "Papers Presented",
            "Status",
            "Website",
        ];

        const rows = filteredConferences.map((conference) => [
            conference.code,
            conference.name,
            conference.organizer,
            conference.hostInstitution,
            conference.location,
            modeLabels[conference.mode],
            conference.researchArea,
            conference.startDate,
            conference.endDate,
            conference.submissionDeadline,
            conference.registrationDeadline,
            conference.participants,
            conference.papersPresented,
            statusConfig[conference.status].label,
            conference.website,
        ]);

        const csv = [headers, ...rows]
            .map((row) =>
                row
                    .map((value) => `"${String(value).replace(/"/g, '""')}"`)
                    .join(","),
            )
            .join("\n");

        const blob = new Blob(["\uFEFF" + csv], {
            type: "text/csv;charset=utf-8;",
        });

        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");

        anchor.href = url;
        anchor.download = "department-conferences.csv";
        anchor.click();

        URL.revokeObjectURL(url);
    };

    const resetFilters = () => {
        setSearch("");
        setStatusFilter("ALL");
        setModeFilter("ALL");
        setAreaFilter("ALL");
    };

    return (
        <div className="space-y-6 pb-10 p-4">
            {/* Header */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Presentation className="h-4 w-4" />
                        Research Management
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Conferences
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        Manage academic conferences, researcher participation, and
                        research presentation activities.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" onClick={exportCSV}>
                        <Download className="mr-2 h-4 w-4" />
                        Export CSV
                    </Button>

                    <Link
                        href="/department-head/research/conferences/create"
                        className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Conference
                    </Link>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-xl border bg-card p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">
                            Total Conferences
                        </p>
                        <div className="rounded-lg bg-primary/10 p-2 text-primary">
                            <Presentation className="h-4 w-4" />
                        </div>
                    </div>
                    <h3 className="mt-3 text-2xl font-bold">{stats.total}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                        All conference records
                    </p>
                </div>

                <div className="rounded-xl border bg-card p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">
                            Upcoming
                        </p>
                        <div className="rounded-lg bg-blue-500/10 p-2 text-blue-600">
                            <CalendarDays className="h-4 w-4" />
                        </div>
                    </div>
                    <h3 className="mt-3 text-2xl font-bold">{stats.upcoming}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                        Scheduled conferences
                    </p>
                </div>

                <div className="rounded-xl border bg-card p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">
                            Ongoing
                        </p>
                        <div className="rounded-lg bg-amber-500/10 p-2 text-amber-600">
                            <Clock className="h-4 w-4" />
                        </div>
                    </div>
                    <h3 className="mt-3 text-2xl font-bold">{stats.ongoing}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                        Currently taking place
                    </p>
                </div>

                <div className="rounded-xl border bg-card p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">
                            Research Participants
                        </p>
                        <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-600">
                            <Users className="h-4 w-4" />
                        </div>
                    </div>
                    <h3 className="mt-3 text-2xl font-bold">{stats.participants}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                        Recorded faculty and student participants
                    </p>
                </div>
            </div>

            {/* Conference activity summary */}
            <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-xl border bg-card p-5">
                    <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-primary" />
                        <h2 className="font-semibold">Research Presentations</h2>
                    </div>
                    <p className="mt-2 text-2xl font-bold">
                        {conferences.reduce(
                            (sum, item) => sum + item.papersPresented,
                            0,
                        )}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                        Papers presented across recorded conferences
                    </p>
                </div>

                <div className="rounded-xl border bg-card p-5">
                    <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-primary" />
                        <h2 className="font-semibold">Completed Conferences</h2>
                    </div>
                    <p className="mt-2 text-2xl font-bold">{stats.completed}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                        Conferences marked as completed
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="rounded-xl border bg-card p-4">
                <div className="mb-4 flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <h2 className="text-sm font-semibold">Filter Conferences</h2>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="relative sm:col-span-2">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search conference, organizer, location..."
                            className="pl-9"
                        />
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(event) => setStatusFilter(event.target.value)}
                        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                    >
                        <option value="ALL">All statuses</option>
                        <option value="UPCOMING">Upcoming</option>
                        <option value="ONGOING">Ongoing</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="CANCELLED">Cancelled</option>
                    </select>

                    <select
                        value={modeFilter}
                        onChange={(event) => setModeFilter(event.target.value)}
                        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                    >
                        <option value="ALL">All formats</option>
                        <option value="IN_PERSON">In Person</option>
                        <option value="ONLINE">Online</option>
                        <option value="HYBRID">Hybrid</option>
                    </select>

                    <select
                        value={areaFilter}
                        onChange={(event) => setAreaFilter(event.target.value)}
                        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm sm:col-span-2 lg:col-span-1"
                    >
                        <option value="ALL">All research areas</option>
                        {researchAreas.map((area) => (
                            <option key={area} value={area}>
                                {area}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs text-muted-foreground">
                        Showing {filteredConferences.length} of {conferences.length}{" "}
                        conferences
                    </p>

                    {(search ||
                        statusFilter !== "ALL" ||
                        modeFilter !== "ALL" ||
                        areaFilter !== "ALL") && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 text-xs"
                                onClick={resetFilters}
                            >
                                Reset filters
                            </Button>
                        )}
                </div>
            </div>

            {/* Conference list */}
            <div className="overflow-hidden rounded-xl border bg-card">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b p-4">
                    <div>
                        <h2 className="font-semibold">Conference Directory</h2>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Academic events and research presentation opportunities
                        </p>
                    </div>

                    <Badge variant="secondary">
                        {filteredConferences.length} Records
                    </Badge>
                </div>

                {filteredConferences.length === 0 ? (
                    <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
                        <div className="rounded-full bg-muted p-4">
                            <Presentation className="h-7 w-7 text-muted-foreground" />
                        </div>
                        <h3 className="mt-4 font-semibold">No conferences found</h3>
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
                                        <th className="px-5 py-3 font-medium">Conference</th>
                                        <th className="px-5 py-3 font-medium">Organizer</th>
                                        <th className="px-5 py-3 font-medium">Date</th>
                                        <th className="px-5 py-3 font-medium">Format</th>
                                        <th className="px-5 py-3 font-medium">Participants</th>
                                        <th className="px-5 py-3 font-medium">Status</th>
                                        <th className="px-5 py-3 text-right font-medium">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y">
                                    {filteredConferences.map((conference) => (
                                        <tr
                                            key={conference.id}
                                            className="transition-colors hover:bg-muted/30"
                                        >
                                            <td className="max-w-[280px] px-5 py-4">
                                                <p className="font-medium leading-5">
                                                    {conference.name}
                                                </p>
                                                <p className="mt-1 text-xs text-muted-foreground">
                                                    {conference.code}
                                                </p>
                                                <p className="mt-1 text-xs text-muted-foreground">
                                                    {conference.researchArea}
                                                </p>
                                            </td>

                                            <td className="px-5 py-4">
                                                <p className="font-medium">{conference.organizer}</p>
                                                <p className="mt-1 text-xs text-muted-foreground">
                                                    {conference.hostInstitution}
                                                </p>
                                            </td>

                                            <td className="whitespace-nowrap px-5 py-4">
                                                <p className="font-medium">
                                                    {formatDate(conference.startDate)}
                                                </p>
                                                <p className="mt-1 text-xs text-muted-foreground">
                                                    to {formatDate(conference.endDate)}
                                                </p>
                                            </td>

                                            <td className="px-5 py-4">
                                                <span className="flex items-center gap-2 text-xs">
                                                    <ModeIcon mode={conference.mode} />
                                                    {modeLabels[conference.mode]}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4">
                                                <p className="font-medium">
                                                    {conference.participants}
                                                </p>
                                                <p className="mt-1 text-xs text-muted-foreground">
                                                    {conference.papersPresented} papers
                                                </p>
                                            </td>

                                            <td className="px-5 py-4">
                                                <StatusBadge status={conference.status} />
                                            </td>

                                            <td className="px-5 py-4">
                                                <div className="flex justify-end gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        title="View conference"
                                                        onClick={() =>
                                                            setSelectedConference(conference)
                                                        }
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Button>

                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        title="Open conference website"
                                                        onClick={() =>
                                                            window.open(
                                                                conference.website,
                                                                "_blank",
                                                                "noopener,noreferrer",
                                                            )
                                                        }
                                                    >
                                                        <ExternalLink className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile cards */}
                        <div className="divide-y md:hidden">
                            {filteredConferences.map((conference) => (
                                <div key={conference.id} className="space-y-3 p-4">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <p className="font-semibold leading-5">
                                                {conference.name}
                                            </p>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {conference.code}
                                            </p>
                                        </div>
                                        <StatusBadge status={conference.status} />
                                    </div>

                                    <div className="space-y-1.5 text-xs text-muted-foreground">
                                        <p className="flex items-center gap-2">
                                            <Building2 className="h-3.5 w-3.5" />
                                            {conference.organizer}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <CalendarDays className="h-3.5 w-3.5" />
                                            {formatDate(conference.startDate)} –{" "}
                                            {formatDate(conference.endDate)}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <ModeIcon mode={conference.mode} />
                                            {modeLabels[conference.mode]} · {conference.location}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <Users className="h-3.5 w-3.5" />
                                            {conference.participants} participants ·{" "}
                                            {conference.papersPresented} papers
                                        </p>
                                    </div>

                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="flex-1"
                                            onClick={() => setSelectedConference(conference)}
                                        >
                                            <Eye className="mr-2 h-4 w-4" />
                                            View details
                                        </Button>

                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() =>
                                                window.open(
                                                    conference.website,
                                                    "_blank",
                                                    "noopener,noreferrer",
                                                )
                                            }
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Conference details dialog */}
            <Dialog
                open={!!selectedConference}
                onOpenChange={(open) => {
                    if (!open) setSelectedConference(null);
                }}
            >
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                    {selectedConference && (
                        <>
                            <DialogHeader>
                                <div className="mb-2 flex flex-wrap items-center gap-2">
                                    <Badge variant="secondary">
                                        {selectedConference.code}
                                    </Badge>
                                    <StatusBadge status={selectedConference.status} />
                                </div>

                                <DialogTitle className="text-xl leading-7">
                                    {selectedConference.name}
                                </DialogTitle>

                                <DialogDescription>
                                    {selectedConference.researchArea} ·{" "}
                                    {modeLabels[selectedConference.mode]}
                                </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-5">
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <div className="rounded-lg border p-3">
                                        <p className="text-xs text-muted-foreground">
                                            Organizer
                                        </p>
                                        <p className="mt-1 text-sm font-semibold">
                                            {selectedConference.organizer}
                                        </p>
                                    </div>

                                    <div className="rounded-lg border p-3">
                                        <p className="text-xs text-muted-foreground">
                                            Host Institution
                                        </p>
                                        <p className="mt-1 text-sm font-semibold">
                                            {selectedConference.hostInstitution}
                                        </p>
                                    </div>

                                    <div className="rounded-lg border p-3">
                                        <p className="text-xs text-muted-foreground">
                                            Conference Dates
                                        </p>
                                        <p className="mt-1 text-sm font-semibold">
                                            {formatDate(selectedConference.startDate)} –{" "}
                                            {formatDate(selectedConference.endDate)}
                                        </p>
                                    </div>

                                    <div className="rounded-lg border p-3">
                                        <p className="text-xs text-muted-foreground">
                                            Location
                                        </p>
                                        <p className="mt-1 flex items-center gap-2 text-sm font-semibold">
                                            <MapPin className="h-4 w-4 text-muted-foreground" />
                                            {selectedConference.location}
                                        </p>
                                    </div>

                                    <div className="rounded-lg border p-3">
                                        <p className="text-xs text-muted-foreground">
                                            Paper Submission Deadline
                                        </p>
                                        <p className="mt-1 text-sm font-semibold">
                                            {formatDate(selectedConference.submissionDeadline)}
                                        </p>
                                    </div>

                                    <div className="rounded-lg border p-3">
                                        <p className="text-xs text-muted-foreground">
                                            Registration Deadline
                                        </p>
                                        <p className="mt-1 text-sm font-semibold">
                                            {formatDate(selectedConference.registrationDeadline)}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="mb-2 text-sm font-semibold">
                                        About the Conference
                                    </h3>
                                    <p className="text-sm leading-6 text-muted-foreground">
                                        {selectedConference.description}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="rounded-lg bg-muted/40 p-3">
                                        <p className="text-xs text-muted-foreground">
                                            Participants
                                        </p>
                                        <p className="mt-1 text-xl font-bold">
                                            {selectedConference.participants}
                                        </p>
                                    </div>

                                    <div className="rounded-lg bg-muted/40 p-3">
                                        <p className="text-xs text-muted-foreground">
                                            Papers Presented
                                        </p>
                                        <p className="mt-1 text-xl font-bold">
                                            {selectedConference.papersPresented}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <DialogFooter className="flex-col gap-2 sm:flex-row">
                                <Button
                                    variant="outline"
                                    onClick={() => setSelectedConference(null)}
                                >
                                    Close
                                </Button>

                                <Button
                                    onClick={() =>
                                        window.open(
                                            selectedConference.website,
                                            "_blank",
                                            "noopener,noreferrer",
                                        )
                                    }
                                >
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    Conference Website
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
