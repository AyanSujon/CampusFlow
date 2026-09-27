import Link from "next/link";
import {
    ArrowRight,
    Building2,
    Clock3,
    Mail,
    MapPin,
    Phone,
} from "lucide-react";

import { Button } from "@/components/ui/button";

type ContactPoint = {
    title: string;
    description: string;
    email: string;
    phone: string;
    role: "ADMIN" | "ACCOUNTANT";
};

const contactPoints: ContactPoint[] = [
    {
        title: "Admissions Office",
        description:
            "Questions about applications, admission requirements, and enrollment.",
        email: "admissions@campusflow.edu",
        phone: "+880 1587-658753",
        role: "ADMIN",
    },
    {
        title: "Registrar's Office",
        description:
            "Academic records, registration, certificates, and student records.",
        email: "registrar@campusflow.edu",
        phone: "+880 1568-548654",
        role: "ADMIN",
    },
    {
        title: "Student Accounts",
        description:
            "Tuition fees, invoices, payments, and student financial matters.",
        email: "accounts@campusflow.edu",
        phone: "+880 1586-456878",
        role: "ACCOUNTANT",
    },
];

const campusContact = {
    name: "CampusFlow University",
    address: "Dhaka, Bangladesh",
    phone: "+880 1698-962355",
    email: "info@campusflow.edu",
    officeHours: "Sunday – Thursday, 9:00 AM – 5:00 PM",
};

export default function ContactLocation() {
    return (
        <section className="border-t bg-muted/20">
            <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
                {/* =========================================
                    Section Header
                ========================================= */}
                <div className="mx-auto max-w-3xl text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-sm font-medium text-muted-foreground">
                        <MapPin className="size-4 text-primary" />
                        Contact & Location
                    </div>

                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                        We are here to help.
                    </h2>

                    <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
                        Connect with CampusFlow for admissions, academic
                        records, student accounts, and general university
                        information.
                    </p>
                </div>
                {/* =========================================
                    Contact + Map
                ========================================= */}
                <div className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
                    {/* =====================================
                        Contact Information
                    ===================================== */}
                    <div className="rounded-2xl border bg-background p-6 sm:p-8">
                        <div className="flex items-center gap-3">
                            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <Building2 className="size-5" />
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Main Campus
                                </p>

                                <h3 className="text-xl font-semibold">
                                    {campusContact.name}
                                </h3>
                            </div>
                        </div>

                        <div className="mt-8 space-y-5">
                            {/* Address */}
                            <div className="flex items-start gap-4">
                                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                                    <MapPin className="size-4 text-primary" />
                                </div>

                                <div>
                                    <p className="text-sm font-semibold">
                                        Campus Location
                                    </p>

                                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                                        {campusContact.address}
                                    </p>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-start gap-4">
                                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                                    <Phone className="size-4 text-primary" />
                                </div>

                                <div>
                                    <p className="text-sm font-semibold">
                                        Phone
                                    </p>

                                    <a
                                        href={`tel:${campusContact.phone}`}
                                        className="mt-1 block text-sm text-muted-foreground transition-colors hover:text-primary"
                                    >
                                        {campusContact.phone}
                                    </a>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start gap-4">
                                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                                    <Mail className="size-4 text-primary" />
                                </div>

                                <div>
                                    <p className="text-sm font-semibold">
                                        Email
                                    </p>

                                    <a
                                        href={`mailto:${campusContact.email}`}
                                        className="mt-1 block text-sm text-muted-foreground transition-colors hover:text-primary"
                                    >
                                        {campusContact.email}
                                    </a>
                                </div>
                            </div>

                            {/* Office Hours */}
                            <div className="flex items-start gap-4">
                                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                                    <Clock3 className="size-4 text-primary" />
                                </div>

                                <div>
                                    <p className="text-sm font-semibold">
                                        Office Hours
                                    </p>

                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {campusContact.officeHours}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <Button
                                variant="outline"
                                render={
                                    <Link href="/contact">
                                        Contact CampusFlow
                                        <ArrowRight className="size-4" />
                                    </Link>
                                }
                            />
                        </div>
                    </div>

                    {/* =====================================
                        Dhaka Map
                    ===================================== */}
                    <div className="relative min-h-[380px] overflow-hidden rounded-2xl border bg-background">
                        <iframe
                            title="CampusFlow location in Dhaka, Bangladesh"
                            src="https://www.google.com/maps?q=Dhaka%2C%20Bangladesh&output=embed"
                            className="absolute inset-0 size-full border-0"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />

                    </div>
                </div>

                {/* =========================================
                    Department Contact Shortcuts
                ========================================= */}
                <div className="mt-10">
                    <div className="mb-6">
                        <p className="text-sm font-semibold text-primary">
                            Need a specific office?
                        </p>

                        <h3 className="mt-1 text-2xl font-bold tracking-tight">
                            Contact the right department directly.
                        </h3>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                            These contact points map conceptually to the
                            administrative roles available in CampusFlow.
                            They represent department-level contact points, not
                            individual staff profiles.
                        </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {contactPoints.map((contact) => (
                            <article
                                key={contact.title}
                                className="group rounded-2xl border bg-background p-6 transition-shadow hover:shadow-md"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                        {contact.role === "ACCOUNTANT" ? (
                                            <Building2 className="size-5" />
                                        ) : (
                                            <Phone className="size-5" />
                                        )}
                                    </div>

                                    <span className="rounded-full border bg-muted/40 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                                        {contact.role}
                                    </span>
                                </div>

                                <h4 className="mt-5 text-lg font-semibold transition-colors group-hover:text-primary">
                                    {contact.title}
                                </h4>

                                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                    {contact.description}
                                </p>

                                <div className="mt-5 space-y-2">
                                    <a
                                        href={`mailto:${contact.email}`}
                                        className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                                    >
                                        <Mail className="size-3.5" />
                                        <span>{contact.email}</span>
                                    </a>

                                    <a
                                        href={`tel:${contact.phone}`}
                                        className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                                    >
                                        <Phone className="size-3.5" />
                                        <span>{contact.phone}</span>
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

                {/* =========================================
                    Bottom CTA
                ========================================= */}
                <div className="mt-10 rounded-2xl border bg-primary p-6 text-primary-foreground sm:p-8">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm font-medium text-primary-foreground/70">
                                Have another question?
                            </p>

                            <h3 className="mt-1 text-xl font-semibold">
                                Get in touch with CampusFlow.
                            </h3>
                        </div>

                        <Button
                            variant="secondary"
                            render={
                                <Link href="/contact">
                                    Contact Us
                                    <ArrowRight className="size-4" />
                                </Link>
                            }
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}