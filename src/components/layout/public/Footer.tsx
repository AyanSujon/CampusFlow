
import {
    ArrowUpRight,
    LogIn,
    Mail,
    MapPin,
    Phone,
} from "lucide-react";

import {
    FaFacebookF,
    FaGithub,
    FaInstagram,
    FaLinkedinIn,
    FaXTwitter,
} from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Logo from "@/components/shared/logo/logo";

const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About University", href: "/about" },
    { label: "Academics", href: "/academics" },
    { label: "Admissions", href: "/admissions" },
    { label: "Campus Life", href: "/campus-life" },
    { label: "News & Stories", href: "/news" },
    { label: "Events", href: "/events" },
    { label: "Contact", href: "/contact" },
];

const academicLinks = [
    { label: "Programs", href: "/academics/programs" },
    { label: "Faculties", href: "/academics/faculties" },
    { label: "Departments", href: "/academics/departments" },
    { label: "Courses", href: "/academics/courses" },
    { label: "Academic Calendar", href: "/academics/calendar" },
];

const socialLinks = [
    {
        id: 1,
        name: "Facebook",
        href: "#",
        icon: FaFacebookF,
    },
    {
        id: 2,
        label: "Instagram",
        href: "#",
        icon: FaInstagram,
    },
    {
        id: 3,
        label: "LinkedIn",
        href: "#",
        icon: FaLinkedinIn,
    },
    {
        id: 4,
        label: "X",
        href: "#",
        icon: FaXTwitter,
    },
    {
        id: 5,
        label: "GitHub",
        href: "#",
        icon: FaGithub,
    },
];

const partnerPlaceholders = [
    "Accreditation Body",
    "Academic Partner",
    "Education Partner",
];

export default function Footer() {
    return (
        <footer className="border-t border-border bg-secondary/40 ">
            {/* =========================================
                Main Footer
            ========================================= */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid gap-10 py-14 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:py-16">
                    {/* =====================================
                        Brand / About
                    ===================================== */}
                    <div className="max-w-sm">

                        <Logo />

                        <p className="mt-5 text-sm leading-6 text-muted-foreground transition-colors">
                            A university-focused digital platform connecting
                            students, faculty, academics, admissions, results,
                            and university operations in one organized campus
                            system.
                        </p>

                        {/* Portal Login */}
                        <div className="mt-6">
                            <Link href="/login" className="secondary flex items-center gap-1">
                                <LogIn className="size-4" />
                                Portal Login
                            </Link>
                        </div>

                        {/* Social Links */}

                        <div className="lg:col-span-2">
                            <h3
                                className="
                text-sm
                font-semibold
                text-foreground
              "
                            >
                                Follow Us
                            </h3>

                            <div className="mt-4 flex items-center gap-2">
                                {socialLinks.map((social) => {
                                    const Icon = social.icon;

                                    return (
                                        <Link
                                            key={social.id}
                                            href={social.href}
                                            aria-label={social.name}
                                            className="
                                            inline-flex
                                            h-9 w-9
                                            items-center
                                            justify-center
                                            rounded-md
                                            border
                                            border-border
                                            bg-background
                                            text-muted-foreground
                                            transition-all
                                            hover:border-primary
                                            hover:bg-primary
                                            hover:text-primary-foreground
                                            "
                                        >
                                            <Icon className="h-4 w-4" />
                                        </Link>
                                    );
                                })}
                            </div>

                            <p
                                className="
                                mt-4
                                text-xs
                                leading-5
                                text-muted-foreground
                                 "
                            >
                                Stay connected with CampusFlow for the
                                latest university news and updates.
                            </p>
                        </div>



                    </div>

                    {/* =====================================
                        Quick Links
                    ===================================== */}
                    <div>
                        <h3 className="text-sm font-semibold text-foreground">
                            Quick Links
                        </h3>

                        <ul className="mt-5 space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                        {link.label}

                                        <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* =====================================
                        Academics
                    ===================================== */}
                    <div>
                        <h3 className="text-sm font-semibold text-foreground">
                            Academics
                        </h3>

                        <ul className="mt-5 space-y-3">
                            {academicLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                        {link.label}

                                        <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* =====================================
                        Contact
                    ===================================== */}
                    <div>
                        <h3 className="text-sm font-semibold text-foreground">
                            Contact CampusFlow
                        </h3>

                        <div className="mt-5 space-y-4">
                            {/* Location */}
                            <div className="flex items-start gap-3">
                                <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                                <p className="text-sm leading-6 text-muted-foreground">
                                    Dhaka, Bangladesh
                                </p>
                            </div>

                            {/* Phone */}
                            <div className="flex items-start gap-3">
                                <Phone className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                                <a
                                    href="tel:+8801XXXXXXXXX"
                                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    +880 1XXX-XXXXXX
                                </a>
                            </div>

                            {/* Email */}
                            <div className="flex items-start gap-3">
                                <Mail className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                                <a
                                    href="mailto:info@campusflow.edu"
                                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    info@campusflow.edu
                                </a>
                            </div>
                        </div>

                        {/* Office */}
                        <div className="mt-6 rounded-xl border border-border bg-muted/40 p-4">
                            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Office Hours
                            </p>

                            <p className="mt-2 text-sm text-foreground">
                                Sunday – Thursday
                            </p>

                            <p className="mt-1 text-sm text-muted-foreground">
                                9:00 AM – 5:00 PM
                            </p>
                        </div>
                    </div>
                </div>

                {/* =========================================
                    Accreditation / Partner Area
                ========================================= */}
                <div className="border-t border-border py-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Accreditation & Partners
                            </p>

                            <p className="mt-2 max-w-md text-sm text-muted-foreground">
                                Institutional logos can be displayed here once
                                verified accreditation and partnership
                                information is available.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                            {partnerPlaceholders.map((partner) => (
                                <div
                                    key={partner}
                                    className="flex min-h-16 min-w-[150px] items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 px-4 text-center"
                                >
                                    <span className="text-xs font-medium text-muted-foreground">
                                        {partner}
                                        <br />
                                        Logo Placeholder
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* =========================================
                    Bottom Bar
                ========================================= */}
                <div className="flex flex-col gap-4 border-t border-border py-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs leading-5 text-muted-foreground">
                        © {new Date().getFullYear()} CampusFlow University. All
                        rights reserved.
                    </p>

                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                        <Link
                            href="/privacy"
                            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Privacy Policy
                        </Link>

                        <Link
                            href="/terms"
                            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Terms & Conditions
                        </Link>

                        {/* Repeated Portal Login */}
                        <Link
                            href="/login"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground transition-colors hover:text-primary"
                        >
                            <LogIn className="size-3.5" />
                            Portal Login
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

