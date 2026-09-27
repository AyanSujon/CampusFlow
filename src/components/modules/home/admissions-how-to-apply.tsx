"use client";

import Link from "next/link";
import {
    ArrowRight,
    CalendarDays,
    CheckCircle2,
    FileText,
    GraduationCap,
    ClipboardCheck,
    UserRoundCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";

type AdmissionStep = {
    step: string;
    title: string;
    description: string;
    icon: React.ElementType;
};

const admissionSteps: AdmissionStep[] = [
    {
        step: "01",
        title: "Apply",
        description:
            "Choose your program and submit an enrollment request through the admissions portal.",
        icon: GraduationCap,
    },
    {
        step: "02",
        title: "Submit Documents",
        description:
            "Provide the required academic records, identification, and supporting documents for review.",
        icon: FileText,
    },
    {
        step: "03",
        title: "Interview / Test",
        description:
            "Complete any required admission test or interview based on your selected program.",
        icon: ClipboardCheck,
    },
    {
        step: "04",
        title: "Enrollment Confirmation",
        description:
            "After approval, review your enrollment details and complete the confirmation process.",
        icon: UserRoundCheck,
    },
];

const deadlines = [
    {
        term: "Fall 2026",
        date: "September 30, 2026",
        note: "Placeholder deadline",
    },
    {
        term: "Spring 2027",
        date: "January 15, 2027",
        note: "Placeholder deadline",
    },
];

export default function AdmissionsHowToApply() {
    return (
        <section className="border-t bg-background">
            <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
                {/* =========================================
                    Section Header
                ========================================= */}
                <div className="mx-auto max-w-3xl text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-3 py-1.5 text-sm font-medium text-muted-foreground">
                        <GraduationCap className="size-4 text-primary" />
                        Admissions
                    </div>

                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                        Start your journey with CampusFlow.
                    </h2>

                    <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
                        From your first application to enrollment confirmation,
                        CampusFlow keeps the admission journey organized and easy
                        to follow.
                    </p>
                </div>

                {/* =========================================
                    Application Steps
                ========================================= */}
                <div className="relative mx-auto mt-12 max-w-6xl">
                    {/* Desktop connector */}
                    <div
                        aria-hidden="true"
                        className="absolute left-[12.5%] right-[12.5%] top-7 hidden border-t border-dashed border-border lg:block"
                    />

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {admissionSteps.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.step}
                                    className="relative text-center"
                                >
                                    {/* Step Icon */}
                                    <div className="relative mx-auto flex size-14 items-center justify-center rounded-full border bg-background shadow-sm">
                                        <Icon className="size-6 text-primary" />

                                        <span className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full border bg-primary text-[10px] font-bold text-primary-foreground">
                                            {item.step}
                                        </span>
                                    </div>

                                    <h3 className="mt-5 text-lg font-semibold">
                                        {item.title}
                                    </h3>

                                    <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
                                        {item.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* =========================================
                    Admission Workflow Note
                ========================================= */}
                <div className="mx-auto mt-14 max-w-4xl rounded-2xl border bg-muted/30 p-5 sm:p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <CheckCircle2 className="size-5" />
                        </div>

                        <div>
                            <h3 className="font-semibold">
                                A structured enrollment process
                            </h3>

                            <p className="mt-1 text-sm leading-6 text-muted-foreground">
                                Your application moves through a structured
                                enrollment request and approval workflow. Once
                                the required information is submitted and
                                reviewed, approved applicants can proceed toward
                                enrollment confirmation.
                            </p>
                        </div>
                    </div>
                </div>

                {/* =========================================
                    Deadlines + CTA
                ========================================= */}
                <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-stretch">
                    {/* Deadlines */}
                    <div className="rounded-2xl border bg-card p-6">
                        <div className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <CalendarDays className="size-5" />
                            </div>

                            <div>
                                <h3 className="font-semibold">
                                    Application Deadlines
                                </h3>

                                <p className="text-sm text-muted-foreground">
                                    Upcoming deadlines
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 grid gap-3 sm:grid-cols-2">
                            {deadlines.map((deadline) => (
                                <div
                                    key={deadline.term}
                                    className="rounded-xl border bg-muted/20 p-4"
                                >
                                    <p className="text-sm font-medium">
                                        {deadline.term}
                                    </p>

                                    <p className="mt-1 font-semibold text-primary">
                                        {deadline.date}
                                    </p>

                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {deadline.note}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="flex flex-col justify-between rounded-2xl border bg-primary p-6 text-primary-foreground lg:w-80">
                        <div>
                            <p className="text-sm font-medium text-primary-foreground/70">
                                Ready to apply?
                            </p>

                            <h3 className="mt-2 text-2xl font-bold">
                                Take the first step.
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-primary-foreground/80">
                                Explore admission requirements, available
                                programs, documents, deadlines, and the complete
                                application process.
                            </p>
                        </div>

                        <Button
                            render={
                                <Link href="/admissions/process">
                                    Explore Admissions
                                    <ArrowRight className="size-4" />
                                </Link>
                            }
                            variant="secondary"
                            className="mt-6 w-full"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}