import Link from "next/link";
import {
    ArrowRight,
    BookOpen,
    CalendarDays,
    GraduationCap,
} from "lucide-react";

import { Button } from "@/components/ui/button";

/* =============================================================
   FEATURED PROGRAM DATA
   Replace this mock data with Program records from your API.
============================================================= */

const featuredPrograms = [
    {
        id: "program-001",
        name: "B.Sc. in Computer Science & Engineering",
        shortName: "B.Sc. in CSE",
        degreeType: "Bachelor's",
        duration: "4 Years",
        department: "Computer Science & Engineering",
        description:
            "Build strong foundations in software development, algorithms, systems, and modern computing technologies.",
    },
    {
        id: "program-002",
        name: "B.Sc. in Electrical & Electronic Engineering",
        shortName: "B.Sc. in EEE",
        degreeType: "Bachelor's",
        duration: "4 Years",
        department: "Electrical & Electronic Engineering",
        description:
            "Explore electrical systems, electronics, communication, control, and emerging engineering technologies.",
    },
    {
        id: "program-003",
        name: "Bachelor of Business Administration",
        shortName: "BBA",
        degreeType: "Bachelor's",
        duration: "4 Years",
        department: "Business Administration",
        description:
            "Develop practical knowledge in management, finance, marketing, entrepreneurship, and organizational leadership.",
    },
    {
        id: "program-004",
        name: "B.A. in English",
        shortName: "B.A. in English",
        degreeType: "Bachelor's",
        duration: "4 Years",
        department: "English",
        description:
            "Develop communication, critical thinking, literature, language, and academic writing skills.",
    },
    {
        id: "program-005",
        name: "M.Sc. in Computer Science",
        shortName: "M.Sc. in CS",
        degreeType: "Master's",
        duration: "2 Years",
        department: "Computer Science & Engineering",
        description:
            "Advance your expertise through graduate-level study, research, software systems, and specialized computing topics.",
    },
    {
        id: "program-006",
        name: "Master of Business Administration",
        shortName: "MBA",
        degreeType: "Master's",
        duration: "2 Years",
        department: "Business Administration",
        description:
            "Strengthen strategic thinking, leadership, business analysis, and decision-making skills for professional growth.",
    },
];

/* =============================================================
   COMPONENT
============================================================= */

export default function AcademicProgramsHighlight() {
    return (
        <section className="border-b bg-muted/20">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
                {/* =================================================
                    SECTION HEADER
                ================================================= */}

                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground">
                            <GraduationCap className="size-3.5 text-primary" />
                            Academic Programs
                        </div>

                        <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            Explore where your
                            <span className="text-primary">
                                {" "}
                                academic journey
                            </span>{" "}
                            can take you.
                        </h2>

                        <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
                            Discover a selection of undergraduate and
                            graduate programs offered across different
                            academic disciplines.
                        </p>
                    </div>

                    {/* Desktop View All */}

                    <Link href="/academics/programs"
                        className="hidden shrink-0 sm:inline-flex">
                        View All Programs
                        <ArrowRight className="size-4" />
                    </Link>

                </div>

                {/* =================================================
                    PROGRAM GRID
                ================================================= */}

                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {featuredPrograms.map((program) => (
                        <ProgramCard
                            key={program.id}
                            program={program}
                        />
                    ))}
                </div>

                {/* =================================================
                    MOBILE VIEW ALL
                ================================================= */}

                <div className="mt-8 flex justify-center sm:hidden">
                    <Link href="/academics/programs"
                        className="w-full">
                        View All Programs
                        <ArrowRight className="size-4" />
                    </Link>
                </div>

                {/* =================================================
                    INFORMATION NOTE
                ================================================= */}

                <div className="mt-10 rounded-xl border bg-background p-5 sm:p-6">
                    <div className="flex gap-4">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <BookOpen className="size-4" />
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-foreground">
                                A glimpse of our academic offerings
                            </p>

                            <p className="mt-1 text-xs leading-5 text-muted-foreground sm:text-sm">
                                The homepage highlights a selection of
                                programs to show the breadth of academic
                                opportunities without overwhelming visitors.
                                Explore the full programs catalog for complete
                                details, eligibility, curriculum, and admission
                                information.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* =============================================================
   PROGRAM CARD
============================================================= */

function ProgramCard({
    program,
}: {
    program: (typeof featuredPrograms)[number];
}) {
    return (
        <article className="group flex h-full flex-col rounded-xl border bg-background p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-sm sm:p-6">
            {/* Program Icon */}
            <div className="flex size-10 items-center justify-center rounded-lg border bg-primary/5 text-primary transition-colors group-hover:bg-primary/10">
                <GraduationCap className="size-5" />
            </div>

            {/* Degree Type */}
            <div className="mt-5 flex items-center justify-between gap-3">
                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
                    {program.degreeType}
                </span>

                <span className="text-xs text-muted-foreground">
                    {program.shortName}
                </span>
            </div>

            {/* Program Name */}
            <h3 className="mt-4 text-lg font-semibold leading-6 tracking-tight text-foreground">
                {program.name}
            </h3>

            {/* Description */}
            <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                {program.description}
            </p>

            {/* Program Meta */}
            <div className="mt-6 space-y-2 border-t pt-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Building2Icon />
                    <span className="truncate">
                        {program.department}
                    </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CalendarDays className="size-3.5 shrink-0" />
                    <span>{program.duration}</span>
                </div>
            </div>

            {/* Details */}
            <div className="mt-5">
                <Link
                    className="w-full px-2 text-primary hover:text-primary flex items-center gap-1 "
                    href={`/academics/programs/${program.id}`}
                >
                    Program Details
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
            </div>
        </article>
    );
}

/* =============================================================
   SMALL ICON
============================================================= */

function Building2Icon() {
    return <GraduationCap className="size-3.5 shrink-0" />;
}