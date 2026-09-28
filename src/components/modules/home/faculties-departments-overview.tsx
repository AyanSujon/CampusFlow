import Link from "next/link";
import {
    ArrowRight,
    Building2,
    ChevronRight,
    GraduationCap,
} from "lucide-react";

import { Button } from "@/components/ui/button";

/* =============================================================
   FACULTY → DEPARTMENT DATA

   Replace this mock data with Faculty and Department
   records from your API later.
============================================================= */

const faculties = [
    {
        id: "faculty-engineering",
        name: "Faculty of Engineering",
        shortName: "Engineering",
        description:
            "Engineering programs focused on technology, innovation, and practical problem solving.",
        departments: [
            "Computer Science & Engineering",
            "Electrical & Electronic Engineering",
            "Civil Engineering",
        ],
    },
    {
        id: "faculty-business",
        name: "Faculty of Business",
        shortName: "Business",
        description:
            "Business education designed to develop management, leadership, and entrepreneurial skills.",
        departments: [
            "Business Administration",
            "Accounting & Finance",
            "Management Studies",
        ],
    },
    {
        id: "faculty-arts",
        name: "Faculty of Arts & Humanities",
        shortName: "Arts & Humanities",
        description:
            "Academic disciplines exploring language, culture, society, and human expression.",
        departments: [
            "English",
            "History & Culture",
            "Social Sciences",
        ],
    },
    {
        id: "faculty-science",
        name: "Faculty of Science",
        shortName: "Science",
        description:
            "Science programs building strong foundations in analytical thinking, research, and discovery.",
        departments: [
            "Mathematics",
            "Physics",
            "Chemistry",
        ],
    },
];

/* =============================================================
   COMPONENT
============================================================= */

export default function FacultiesDepartmentsOverview() {
    return (
        <section className="border-b bg-background">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1.5 text-xs font-medium text-muted-foreground">
                            <Building2 className="size-3.5 text-primary" />
                            Faculties & Departments
                        </div>

                        <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            Discover the structure of our
                            <span className="text-primary">
                                {" "}
                                academic community.
                            </span>
                        </h2>

                        <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
                            Explore how faculties and departments come
                            together to create a diverse academic
                            environment for learning, teaching, and
                            research.
                        </p>
                    </div>

                    {/* Desktop CTA */}
                    <Link href="/academics"
                        className="hidden shrink-0 sm:inline-flex">
                        Explore Academics
                        <ArrowRight className="size-4" />
                    </Link>

                </div>

                {/* =================================================
                    FACULTY GRID
                ================================================= */}

                <div className="mt-10 grid gap-5 md:grid-cols-2">
                    {faculties.map((faculty, index) => (
                        <FacultyCard
                            key={faculty.id}
                            faculty={faculty}
                            index={index}
                        />
                    ))}
                </div>

                {/* =================================================
                    MOBILE CTA
                ================================================= */}

                <div className="mt-8 sm:hidden">
                    <Link href="/academics"
                        className="w-full">
                        Explore Academics
                        <ArrowRight className="size-4" />
                    </Link>
                </div>

                {/* =================================================
                    STRUCTURE SUMMARY
                ================================================= */}

                <div className="mt-10 grid gap-4 border-t pt-8 sm:grid-cols-3">
                    <StructureItem
                        value={`${faculties.length}`}
                        label="Faculties"
                        description="Academic areas"
                    />

                    <StructureItem
                        value={`${faculties.reduce(
                            (total, faculty) =>
                                total + faculty.departments.length,
                            0,
                        )}`}
                        label="Departments"
                        description="Academic disciplines"
                    />

                    <StructureItem
                        value="Multiple"
                        label="Study Areas"
                        description="Undergraduate & graduate opportunities"
                    />
                </div>
            </div>
        </section>
    );
}

/* =============================================================
   FACULTY CARD
============================================================= */

function FacultyCard({
    faculty,
    index,
}: {
    faculty: (typeof faculties)[number];
    index: number;
}) {
    return (
        <article className="group rounded-xl border bg-background p-5 transition-all duration-200 hover:border-primary/30 hover:shadow-sm sm:p-6">
            {/* =================================================
                FACULTY HEADER
            ================================================= */}

            <div className="flex items-start gap-4">
                {/* Number */}
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                    {String(index + 1).padStart(2, "0")}
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                        <h3 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                            {faculty.name}
                        </h3>

                        <GraduationCap className="hidden size-5 shrink-0 text-primary sm:block" />
                    </div>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {faculty.description}
                    </p>
                </div>
            </div>

            {/* =================================================
                DEPARTMENTS
            ================================================= */}

            <div className="mt-6 border-t pt-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Departments
                </p>

                <div className="space-y-1">
                    {faculty.departments.map((department) => (
                        <Link
                            key={department}
                            href={`/academics/departments/${slugify(
                                department,
                            )}`}
                            className="group/department flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-muted/60"
                        >
                            <span className="text-foreground">
                                {department}
                            </span>

                            <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover/department:translate-x-0.5 group-hover/department:text-primary" />
                        </Link>
                    ))}
                </div>
            </div>

            {/* =================================================
                FACULTY LINK
            ================================================= */}

            <div className="mt-5 border-t pt-4">
                <Link
                    href={`/academics/faculties/${slugify(faculty.name)}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                >
                    View faculty
                    <ArrowRight className="size-3.5" />
                </Link>
            </div>
        </article>
    );
}

/* =============================================================
   STRUCTURE ITEM
============================================================= */

function StructureItem({
    value,
    label,
    description,
}: {
    value: string;
    label: string;
    description: string;
}) {
    return (
        <div className="rounded-xl border bg-muted/20 p-4 sm:p-5">
            <p className="text-2xl font-bold tracking-tight text-foreground">
                {value}
            </p>

            <p className="mt-1 text-sm font-semibold text-foreground">
                {label}
            </p>

            <p className="mt-0.5 text-xs text-muted-foreground">
                {description}
            </p>
        </div>
    );
}

/* =============================================================
   SLUG HELPER
============================================================= */

function slugify(value: string) {
    return value
        .toLowerCase()
        .trim()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}