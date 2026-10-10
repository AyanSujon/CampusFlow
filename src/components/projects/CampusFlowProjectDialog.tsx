





// "use client";

// import { useCallback, useEffect, useRef, useState } from "react";
// import type React from "react";
// import {
//     Building2,
//     Database,
//     ExternalLink,
//     GraduationCap,
//     Info,
//     KeyRound,
//     Mail,
//     ShieldCheck,
//     Wallet,
// } from "lucide-react";
// import {
//     SiExpress,
//     SiNextdotjs,
//     SiNodedotjs,
//     SiPostgresql,
//     SiPrisma,
//     SiReact,
//     SiRedis,
//     SiStripe,
//     SiTailwindcss,
//     SiTypescript,
//     SiZod,
// } from "react-icons/si";
// import { FaGithub } from "react-icons/fa";
// import { TbBrandGoogle } from "react-icons/tb";

// import { Button } from "@/components/ui/button";
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
// } from "@/components/ui/dialog";
// import { cn } from "@/lib/utils";

// /* -------------------------------------------------------------------------- */
// /* Configuration                                                              */
// /* -------------------------------------------------------------------------- */

// const STORAGE_KEYS = {
//     sessionShown: "campusflow-overview-session-shown",
//     permanentDismiss: "campusflow-overview-permanent-dismiss",
// } as const;

// const AUTO_OPEN_DELAY_MS = 1350;

// export const campusFlowProjectConfig = {
//     name: "CampusFlow UMS",
//     tagline: "University Management System",
//     statusLabel: "Full-Stack Project",

//     summary:
//         "A full-stack university management platform designed to centralize academic administration, organize student and instructor records, manage university structures, and streamline financial workflows.",

//     frontendGithubUrl: "https://github.com/AyanSujon/CampusFlow",

//     backendGithubUrl: "https://github.com/AyanSujon/CampusFlow-API",

//     detailsPath: "/projects/campusflow",
// } as const;

// /* -------------------------------------------------------------------------- */
// /* Technology Stack                                                           */
// /* -------------------------------------------------------------------------- */

// type TechItem = {
//     name: string;
//     icon: React.ElementType;
//     category: "frontend" | "backend" | "supporting";
// };

// const technologies: TechItem[] = [
//     { name: "Next.js", icon: SiNextdotjs, category: "frontend" },
//     { name: "React", icon: SiReact, category: "frontend" },
//     { name: "TypeScript", icon: SiTypescript, category: "frontend" },
//     { name: "Tailwind CSS", icon: SiTailwindcss, category: "frontend" },

//     { name: "Node.js", icon: SiNodedotjs, category: "backend" },
//     { name: "Express.js", icon: SiExpress, category: "backend" },
//     { name: "PostgreSQL", icon: SiPostgresql, category: "backend" },
//     { name: "Prisma ORM", icon: SiPrisma, category: "backend" },

//     { name: "Redis", icon: SiRedis, category: "supporting" },
//     { name: "TanStack Query", icon: Database, category: "supporting" },
//     { name: "Zod", icon: SiZod, category: "supporting" },
//     { name: "Google OAuth", icon: TbBrandGoogle, category: "supporting" },
//     { name: "JWT", icon: KeyRound, category: "supporting" },
//     { name: "Stripe", icon: SiStripe, category: "supporting" },
//     { name: "Nodemailer", icon: Mail, category: "supporting" },
// ];

// /* -------------------------------------------------------------------------- */
// /* Technical Highlights                                                       */
// /* -------------------------------------------------------------------------- */

// const technicalHighlights = [
//     "RESTful API development with Express.js and TypeScript.",
//     "Relational database design and data access with Prisma ORM and PostgreSQL.",
//     "Authentication, authorization, and input validation.",
//     "Responsive dashboards and reusable frontend components.",
//     "Structured data fetching, form management, and validation.",
// ] as const;

// /* -------------------------------------------------------------------------- */
// /* Business Problems Solved                                                   */
// /* -------------------------------------------------------------------------- */

// const businessProblems = [
//     {
//         title: "Centralized Administration",
//         description:
//             "Organizes university operations in one platform.",
//         icon: Building2,
//     },
//     {
//         title: "Academic Data Management",
//         description:
//             "Manages students, instructors, faculties, departments, and programs.",
//         icon: GraduationCap,
//     },
//     {
//         title: "Role-Based Security",
//         description:
//             "Supports permissions and protected operations for different university roles.",
//         icon: ShieldCheck,
//     },
//     {
//         title: "Financial Workflows",
//         description:
//             "Supports invoice and student payment management workflows.",
//         icon: Wallet,
//     },
// ] as const;

// /* -------------------------------------------------------------------------- */
// /* Component                                                                  */
// /* -------------------------------------------------------------------------- */

// export default function CampusFlowProjectDialog() {
//     const [open, setOpen] = useState(false);

//     const hasScheduledRef = useRef(false);
//     const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//     const isPermanentlyDismissed = useCallback(() => {
//         try {
//             return (
//                 window.localStorage.getItem(
//                     STORAGE_KEYS.permanentDismiss
//                 ) === "1"
//             );
//         } catch {
//             return false;
//         }
//     }, []);

//     const wasShownThisSession = useCallback(() => {
//         try {
//             return (
//                 window.sessionStorage.getItem(
//                     STORAGE_KEYS.sessionShown
//                 ) === "1"
//             );
//         } catch {
//             return false;
//         }
//     }, []);

//     const markSessionShown = useCallback(() => {
//         try {
//             window.sessionStorage.setItem(
//                 STORAGE_KEYS.sessionShown,
//                 "1"
//             );
//         } catch {
//             // Ignore storage restrictions.
//         }
//     }, []);

//     const markPermanentDismiss = useCallback(() => {
//         try {
//             window.localStorage.setItem(
//                 STORAGE_KEYS.permanentDismiss,
//                 "1"
//             );

//             window.sessionStorage.setItem(
//                 STORAGE_KEYS.sessionShown,
//                 "1"
//             );
//         } catch {
//             // Ignore storage restrictions.
//         }
//     }, []);

//     /* Automatically open once per session. */
//     useEffect(() => {
//         if (hasScheduledRef.current) return;

//         hasScheduledRef.current = true;

//         if (isPermanentlyDismissed() || wasShownThisSession()) {
//             return;
//         }

//         timerRef.current = setTimeout(() => {
//             if (isPermanentlyDismissed() || wasShownThisSession()) {
//                 return;
//             }

//             markSessionShown();
//             setOpen(true);
//         }, AUTO_OPEN_DELAY_MS);

//         return () => {
//             if (timerRef.current) {
//                 clearTimeout(timerRef.current);
//                 timerRef.current = null;
//             }
//         };
//     }, [
//         isPermanentlyDismissed,
//         wasShownThisSession,
//         markSessionShown,
//     ]);

//     const handleOpenChange = (nextOpen: boolean) => {
//         setOpen(nextOpen);

//         if (!nextOpen) {
//             markSessionShown();
//         }
//     };

//     const handleDontShowAgain = () => {
//         markPermanentDismiss();
//         setOpen(false);
//     };

//     const openExternalLink = (url: string) => {
//         window.open(url, "_blank", "noopener,noreferrer");
//     };

//     const {
//         frontendGithubUrl,
//         backendGithubUrl,
//         detailsPath,
//     } = campusFlowProjectConfig;

//     /* ---------------------------------------------------------------------- */
//     /* Overview Button                                                        */
//     /* ---------------------------------------------------------------------- */

//     const overviewButton = (
//         <div className="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6">
//             <Button
//                 type="button"
//                 variant="outline"
//                 size="sm"
//                 className={cn(
//                     "group gap-2 rounded-full border-primary/30",
//                     "bg-background/95 px-4 shadow-lg backdrop-blur",
//                     "transition-all duration-200",
//                     "hover:-translate-y-0.5 hover:border-primary/60",
//                     "hover:bg-primary hover:text-primary-foreground",
//                     "hover:shadow-xl"
//                 )}
//                 onClick={() => setOpen(true)}
//                 aria-label="Open CampusFlow project overview"
//             >
//                 <Info
//                     className="size-4 shrink-0"
//                     aria-hidden={true}
//                 />

//                 <span className="hidden sm:inline">
//                     Project Overview
//                 </span>

//                 <span className="sm:hidden">
//                     Overview
//                 </span>
//             </Button>
//         </div>
//     );

//     /* ---------------------------------------------------------------------- */
//     /* Render                                                                  */
//     /* ---------------------------------------------------------------------- */

//     return (
//         <>
//             {overviewButton}

//             <Dialog
//                 open={open}
//                 onOpenChange={handleOpenChange}
//             >
//                 <DialogContent
//                     className={cn(
//                         "h-[70dvh] max-h-[70dvh]",
//                         "w-[calc(100%-1rem)]",
//                         "sm:w-[70vw] sm:max-w-none",
//                         "flex flex-col gap-0 overflow-hidden p-0",
//                         "border-border/60 shadow-2xl"
//                     )}
//                 >
//                     {/* Scrollable Body */}
//                     <div className="min-h-0 w-full flex-1 overflow-y-auto overscroll-contain">
//                         <div className="space-y-6 p-4 sm:p-6 lg:p-8">
//                             {/* Project Header */}
//                             <DialogHeader className="space-y-3 text-left">
//                                 <div className="flex items-start gap-3">
//                                     <div
//                                         className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border/70 bg-muted/50"
//                                         aria-hidden={true}
//                                     >
//                                         <Building2 className="size-5 text-foreground/80" />
//                                     </div>

//                                     <div className="min-w-0 flex-1 space-y-1">
//                                         <div className="flex flex-wrap items-center gap-2">
//                                             <DialogTitle className="text-xl font-semibold tracking-tight sm:text-2xl">
//                                                 {campusFlowProjectConfig.name}
//                                             </DialogTitle>

//                                             <span className="inline-flex items-center rounded-full border border-border/70 bg-muted/40 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
//                                                 {campusFlowProjectConfig.statusLabel}
//                                             </span>
//                                         </div>

//                                         <p className="text-sm font-medium text-muted-foreground">
//                                             {campusFlowProjectConfig.tagline}
//                                         </p>
//                                     </div>
//                                 </div>

//                                 <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
//                                     {campusFlowProjectConfig.summary}
//                                 </DialogDescription>
//                             </DialogHeader>

//                             {/* Business Problems Solved */}
//                             <section
//                                 aria-labelledby="campusflow-problems-heading"
//                                 className="space-y-3"
//                             >
//                                 <div className="flex flex-wrap items-center justify-between gap-2">
//                                     <h3
//                                         id="campusflow-problems-heading"
//                                         className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
//                                     >
//                                     Business Problems Solved
//                                     </h3>

//                                     <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-[10px] font-medium text-primary">
//                                         Business Impact
//                                     </span>
//                                 </div>

//                                 <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
//                                     {businessProblems.map((problem, index) => {
//                                         const Icon = problem.icon;

//                                         return (
//                                             <article
//                                                 key={problem.title}
//                                                 className={cn(
//                                                     "group relative flex min-w-0 items-start gap-3",
//                                                     "overflow-hidden rounded-xl border",
//                                                     "border-primary/15 bg-gradient-to-br",
//                                                     "from-primary/[0.07] via-card to-card",
//                                                     "p-3.5 sm:p-4",
//                                                     "transition-all duration-200",
//                                                     "hover:-translate-y-0.5",
//                                                     "hover:border-primary/40",
//                                                     "hover:shadow-md hover:shadow-primary/5"
//                                                 )}
//                                             >
//                                                 {/* Decorative highlight */}
//                                                 <div
//                                                     className="absolute inset-y-0 left-0 w-0.5 bg-primary/50 transition-colors group-hover:bg-primary"
//                                                     aria-hidden={true}
//                                                 />

//                                                 {/* Icon */}
//                                                 <div
//                                                     className={cn(
//                                                         "flex size-10 shrink-0 items-center justify-center",
//                                                         "rounded-lg border border-primary/15",
//                                                         "bg-primary/10 text-primary",
//                                                         "transition-all duration-200",
//                                                         "group-hover:border-primary/30",
//                                                         "group-hover:bg-primary group-hover:text-primary-foreground"
//                                                     )}
//                                                 >
//                                                     <Icon
//                                                         className="size-5"
//                                                         aria-hidden={true}
//                                                     />
//                                                 </div>

//                                                 {/* Content */}
//                                                 <div className="min-w-0 flex-1">
//                                                     <div className="mb-1 flex items-start gap-2">
//                                                         <h4 className="min-w-0 flex-1 text-sm font-semibold leading-snug text-foreground">
//                                                             {problem.title}
//                                                         </h4>

//                                                         <span className="shrink-0 text-[10px] font-medium tabular-nums text-muted-foreground/70">
//                                                             0{index + 1}
//                                                         </span>
//                                                     </div>

//                                                     <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
//                                                         {problem.description}
//                                                     </p>
//                                                 </div>
//                                             </article>
//                                         );
//                                     })}
//                                 </div>
//                             </section>

//                             {/* Project Links */}
//                             <section aria-labelledby="campusflow-links-heading">
//                                 <h3
//                                     id="campusflow-links-heading"
//                                     className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
//                                 >
//                                     Explore the Project
//                                 </h3>

//                                 <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

//                                     {/* Frontend Repository */}
//                                     <a
//                                         href={frontendGithubUrl}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className={cn(
//                                             "flex min-w-0 items-center gap-3 rounded-xl",
//                                             "border border-border/70 bg-card p-3",
//                                             "transition-all duration-200",
//                                             "hover:-translate-y-0.5 hover:border-primary/40",
//                                             "hover:bg-muted/50 hover:shadow-md",
//                                             "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
//                                         )}
//                                     >
//                                         <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
//                                             <FaGithub className="size-5" />
//                                         </span>

//                                         <span className="min-w-0 flex-1">
//                                             <span className="block text-sm font-semibold">
//                                                 Frontend Code
//                                             </span>
//                                             <span className="block truncate text-xs text-muted-foreground">
//                                                 Next.js repository
//                                             </span>
//                                         </span>
//                                     </a>

//                                     {/* Backend Repository */}
//                                     <a
//                                         href={backendGithubUrl}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className={cn(
//                                             "flex min-w-0 items-center gap-3 rounded-xl",
//                                             "border border-border/70 bg-card p-3",
//                                             "transition-all duration-200",
//                                             "hover:-translate-y-0.5 hover:border-primary/40",
//                                             "hover:bg-muted/50 hover:shadow-md",
//                                             "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
//                                         )}
//                                     >
//                                         <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
//                                             <FaGithub className="size-5" />
//                                         </span>

//                                         <span className="min-w-0 flex-1">
//                                             <span className="block text-sm font-semibold">
//                                                 Backend Code
//                                             </span>
//                                             <span className="block truncate text-xs text-muted-foreground">
//                                                 Express.js API
//                                             </span>
//                                         </span>
//                                     </a>
//                                 </div>
//                             </section>

//                             {/* Technical Highlights */}
//                             <section aria-labelledby="campusflow-tech-heading">
//                                 <h3
//                                     id="campusflow-tech-heading"
//                                     className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
//                                 >
//                                     Technical Highlights
//                                 </h3>

//                                 <ul className="space-y-3 rounded-xl border border-border/60 bg-card/40 p-4">
//                                     {technicalHighlights.map((item) => (
//                                         <li
//                                             key={item}
//                                             className="flex gap-3 text-sm leading-relaxed text-foreground/90"
//                                         >
//                                             <span
//                                                 className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/70"
//                                                 aria-hidden={true}
//                                             />
//                                             <span>{item}</span>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </section>

//                             {/* Technology Stack */}
//                             <section aria-labelledby="campusflow-stack-heading">
//                                 <h3
//                                     id="campusflow-stack-heading"
//                                     className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
//                                 >
//                                     Technology Stack
//                                 </h3>

//                                 <ul className="flex flex-wrap gap-2">
//                                     {technologies.map((tech) => {
//                                         const Icon = tech.icon;

//                                         return (
//                                             <li key={tech.name}>
//                                                 <span
//                                                     className={cn(
//                                                         "inline-flex items-center gap-1.5 rounded-lg",
//                                                         "border border-border/60 bg-muted/30",
//                                                         "px-2.5 py-1.5 text-xs font-medium",
//                                                         "text-foreground/85 transition-colors",
//                                                         "hover:bg-muted/70"
//                                                     )}
//                                                     title={`${tech.name} — ${tech.category}`}
//                                                 >
//                                                     <Icon
//                                                         className="size-3.5 shrink-0 opacity-80"
//                                                         aria-hidden={true}
//                                                     />
//                                                     <span>{tech.name}</span>
//                                                 </span>
//                                             </li>
//                                         );
//                                     })}
//                                 </ul>
//                             </section>
//                         </div>
//                     </div>

//                     {/* Fixed Footer */}
//                     <DialogFooter
//                         className={cn(
//                             "shrink-0 flex-col gap-2",
//                             "border-t border-border/60 bg-muted/20",
//                             "px-4 py-3 sm:px-6 sm:py-4",
//                             "sm:flex-row sm:items-center sm:justify-between",
//                             "sm:space-x-0"
//                         )}
//                     >
//                         <Button
//                             type="button"
//                             variant="ghost"
//                             size="sm"
//                             className="order-last w-full text-muted-foreground hover:text-foreground sm:order-first sm:w-auto"
//                             onClick={handleDontShowAgain}
//                         >
//                             Don&apos;t show again
//                         </Button>

//                         <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-end">
//                             <Button
//                                 type="button"
//                                 variant="outline"
//                                 size="sm"
//                                 className="w-full gap-1.5 sm:w-auto"
//                                 onClick={() => {
//                                     setOpen(false);
//                                     window.location.href = detailsPath;
//                                 }}
//                             >
//                                 Explore Details
//                             </Button>

//                             <Button
//                                 type="button"
//                                 variant="outline"
//                                 size="sm"
//                                 className="w-full gap-1.5 sm:w-auto"
//                                 onClick={() =>
//                                     openExternalLink(frontendGithubUrl)
//                                 }
//                             >
//                                 <FaGithub className="size-4" />
//                                 Frontend Code
//                                 <ExternalLink className="size-3.5 opacity-60" />
//                             </Button>

//                             <Button
//                                 type="button"
//                                 variant="outline"
//                                 size="sm"
//                                 className="w-full gap-1.5 sm:w-auto"
//                                 onClick={() =>
//                                     openExternalLink(backendGithubUrl)
//                                 }
//                             >
//                                 <FaGithub className="size-4" />
//                                 Backend Code
//                                 <ExternalLink className="size-3.5 opacity-60" />
//                             </Button>
//                         </div>
//                     </DialogFooter>
//                 </DialogContent>
//             </Dialog>
//         </>
//     );
// }




























"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type React from "react";
import {
    Building2,
    Database,
    ExternalLink,
    GraduationCap,
    Info,
    KeyRound,
    Mail,
    ShieldCheck,
    Wallet,
} from "lucide-react";
import {
    SiExpress,
    SiNextdotjs,
    SiNodedotjs,
    SiPostgresql,
    SiPrisma,
    SiReact,
    SiRedis,
    SiStripe,
    SiTailwindcss,
    SiTypescript,
    SiZod,
} from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { TbBrandGoogle } from "react-icons/tb";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Configuration                                                              */
/* -------------------------------------------------------------------------- */

const STORAGE_KEYS = {
    sessionShown: "campusflow-overview-session-shown",
    permanentDismiss: "campusflow-overview-permanent-dismiss",
} as const;

const AUTO_OPEN_DELAY_MS = 1350;

export const campusFlowProjectConfig = {
    name: "CampusFlow UMS",
    tagline: "University Management System",
    statusLabel: "Full-Stack Project",

    summary:
        "A full-stack university management platform designed to centralize academic administration, organize student and instructor records, manage university structures, and streamline financial workflows.",

    frontendGithubUrl: "https://github.com/AyanSujon/CampusFlow",
    backendGithubUrl: "https://github.com/AyanSujon/CampusFlow-API",
    detailsPath: "/projects/campusflow",
} as const;

/* -------------------------------------------------------------------------- */
/* Technology Stack                                                           */
/* -------------------------------------------------------------------------- */

type TechItem = {
    name: string;
    icon: React.ElementType;
    category: "frontend" | "backend" | "supporting";
};

const technologies: TechItem[] = [
    { name: "Next.js", icon: SiNextdotjs, category: "frontend" },
    { name: "React", icon: SiReact, category: "frontend" },
    { name: "TypeScript", icon: SiTypescript, category: "frontend" },
    { name: "Tailwind CSS", icon: SiTailwindcss, category: "frontend" },

    { name: "Node.js", icon: SiNodedotjs, category: "backend" },
    { name: "Express.js", icon: SiExpress, category: "backend" },
    { name: "PostgreSQL", icon: SiPostgresql, category: "backend" },
    { name: "Prisma ORM", icon: SiPrisma, category: "backend" },

    { name: "Redis", icon: SiRedis, category: "supporting" },
    { name: "TanStack Query", icon: Database, category: "supporting" },
    { name: "Zod", icon: SiZod, category: "supporting" },
    { name: "Google OAuth", icon: TbBrandGoogle, category: "supporting" },
    { name: "JWT", icon: KeyRound, category: "supporting" },
    { name: "Stripe", icon: SiStripe, category: "supporting" },
    { name: "Nodemailer", icon: Mail, category: "supporting" },
];

/* -------------------------------------------------------------------------- */
/* Technical Highlights                                                       */
/* -------------------------------------------------------------------------- */

const technicalHighlights = [
    "RESTful API development with Express.js and TypeScript.",
    "Relational database design and data access with Prisma ORM and PostgreSQL.",
    "Authentication, authorization, and input validation.",
    "Responsive dashboards and reusable frontend components.",
    "Structured data fetching, form management, and validation.",
] as const;

/* -------------------------------------------------------------------------- */
/* Business Problems Solved                                                   */
/* -------------------------------------------------------------------------- */

const businessProblems = [
    {
        title: "Centralized Administration",
        description: "Organizes university operations in one platform.",
        icon: Building2,
    },
    {
        title: "Academic Data Management",
        description:
            "Manages students, instructors, faculties, departments, and programs.",
        icon: GraduationCap,
    },
    {
        title: "Role-Based Security",
        description:
            "Supports permissions and protected operations for different university roles.",
        icon: ShieldCheck,
    },
    {
        title: "Financial Workflows",
        description:
            "Supports invoice and student payment management workflows.",
        icon: Wallet,
    },
] as const;

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export default function CampusFlowProjectDialog() {
    const [open, setOpen] = useState(false);

    const hasScheduledRef = useRef(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const isPermanentlyDismissed = useCallback(() => {
        try {
            return (
                window.localStorage.getItem(
                    STORAGE_KEYS.permanentDismiss
                ) === "1"
            );
        } catch {
            return false;
        }
    }, []);

    const wasShownThisSession = useCallback(() => {
        try {
            return (
                window.sessionStorage.getItem(
                    STORAGE_KEYS.sessionShown
                ) === "1"
            );
        } catch {
            return false;
        }
    }, []);

    const markSessionShown = useCallback(() => {
        try {
            window.sessionStorage.setItem(
                STORAGE_KEYS.sessionShown,
                "1"
            );
        } catch {
            // Ignore storage restrictions.
        }
    }, []);

    const markPermanentDismiss = useCallback(() => {
        try {
            window.localStorage.setItem(
                STORAGE_KEYS.permanentDismiss,
                "1"
            );

            window.sessionStorage.setItem(
                STORAGE_KEYS.sessionShown,
                "1"
            );
        } catch {
            // Ignore storage restrictions.
        }
    }, []);

    /* Automatically open once per session. */
    useEffect(() => {
        if (hasScheduledRef.current) return;

        hasScheduledRef.current = true;

        if (isPermanentlyDismissed() || wasShownThisSession()) {
            return;
        }

        timerRef.current = setTimeout(() => {
            if (isPermanentlyDismissed() || wasShownThisSession()) {
                return;
            }

            markSessionShown();
            setOpen(true);
        }, AUTO_OPEN_DELAY_MS);

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [
        isPermanentlyDismissed,
        wasShownThisSession,
        markSessionShown,
    ]);

    const handleOpenChange = (nextOpen: boolean) => {
        setOpen(nextOpen);

        if (!nextOpen) {
            markSessionShown();
        }
    };

    const handleDontShowAgain = () => {
        markPermanentDismiss();
        setOpen(false);
    };

    const openExternalLink = (url: string) => {
        window.open(url, "_blank", "noopener,noreferrer");
    };

    const {
        frontendGithubUrl,
        backendGithubUrl,
        detailsPath,
    } = campusFlowProjectConfig;

    /* ---------------------------------------------------------------------- */
    /* Floating Overview Button                                               */
    /* ---------------------------------------------------------------------- */

    const overviewButton = (
        <div className="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6">
            <Button
                type="button"
                variant="outline"
                size="sm"
                className={cn(
                    "group gap-2 rounded-full border-primary/30",
                    "bg-background/95 px-4 shadow-lg backdrop-blur",
                    "transition-all duration-200",
                    "hover:-translate-y-0.5 hover:border-primary/60",
                    "hover:bg-primary hover:text-primary-foreground",
                    "hover:shadow-xl"
                )}
                onClick={() => setOpen(true)}
                aria-label="Open CampusFlow project overview"
            >
                <Info className="size-4 shrink-0" aria-hidden={true} />

                <span className="hidden sm:inline">
                    Project Overview
                </span>

                <span className="sm:hidden">
                    Overview
                </span>
            </Button>
        </div>
    );

    /* ---------------------------------------------------------------------- */
    /* Render                                                                  */
    /* ---------------------------------------------------------------------- */

    return (
        <>
            {overviewButton}

            <Dialog open={open} onOpenChange={handleOpenChange}>
                <DialogContent
                    className={cn(
                        "flex h-[70dvh] max-h-[70dvh] flex-col gap-0",
                        "w-[calc(100%-1rem)] sm:w-[70vw] sm:max-w-none",
                        "overflow-hidden border-border/60 p-0 shadow-2xl"
                    )}
                >
                    {/* Scrollable Body */}
                    <div className="min-h-0 w-full flex-1 overflow-y-auto overscroll-contain">
                        <div className="space-y-6 p-4 sm:p-6 lg:p-8">
                            {/* Project Header */}
                            <DialogHeader className="space-y-3 text-left">
                                <div className="flex items-start gap-3">
                                    <div
                                        className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border/70 bg-muted/50"
                                        aria-hidden={true}
                                    >
                                        <Building2 className="size-5 text-foreground/80" />
                                    </div>

                                    <div className="min-w-0 flex-1 space-y-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <DialogTitle className="text-xl font-semibold tracking-tight sm:text-2xl">
                                                {campusFlowProjectConfig.name}
                                            </DialogTitle>

                                            <span className="inline-flex items-center rounded-full border border-border/70 bg-muted/40 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                                                {campusFlowProjectConfig.statusLabel}
                                            </span>
                                        </div>

                                        <p className="text-sm font-medium text-muted-foreground">
                                            {campusFlowProjectConfig.tagline}
                                        </p>
                                    </div>
                                </div>

                                <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
                                    {campusFlowProjectConfig.summary}
                                </DialogDescription>
                            </DialogHeader>

                            {/* Business Problems Solved */}
                            <section
                                aria-labelledby="campusflow-problems-heading"
                                className="space-y-3"
                            >
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <h3
                                        id="campusflow-problems-heading"
                                        className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                                    >
                                        Business Problems Solved
                                    </h3>

                                    <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-[10px] font-medium text-primary">
                                        Business Impact
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    {businessProblems.map((problem, index) => {
                                        const Icon = problem.icon;

                                        return (
                                            <article
                                                key={problem.title}
                                                className={cn(
                                                    "group relative flex min-w-0 items-start gap-3",
                                                    "overflow-hidden rounded-xl border",
                                                    "border-primary/15 bg-gradient-to-br",
                                                    "from-primary/[0.07] via-card to-card",
                                                    "p-3.5 sm:p-4",
                                                    "transition-all duration-200",
                                                    "hover:-translate-y-0.5",
                                                    "hover:border-primary/40",
                                                    "hover:shadow-md hover:shadow-primary/5"
                                                )}
                                            >
                                                <div
                                                    className="absolute inset-y-0 left-0 w-0.5 bg-primary/50 transition-colors group-hover:bg-primary"
                                                    aria-hidden={true}
                                                />

                                                <div
                                                    className={cn(
                                                        "flex size-10 shrink-0 items-center justify-center",
                                                        "rounded-lg border border-primary/15",
                                                        "bg-primary/10 text-primary",
                                                        "transition-all duration-200",
                                                        "group-hover:border-primary/30",
                                                        "group-hover:bg-primary group-hover:text-primary-foreground"
                                                    )}
                                                >
                                                    <Icon
                                                        className="size-5"
                                                        aria-hidden={true}
                                                    />
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <div className="mb-1 flex items-start gap-2">
                                                        <h4 className="min-w-0 flex-1 text-sm font-semibold leading-snug text-foreground">
                                                            {problem.title}
                                                        </h4>

                                                        <span className="shrink-0 text-[10px] font-medium tabular-nums text-muted-foreground/70">
                                                            0{index + 1}
                                                        </span>
                                                    </div>

                                                    <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                                                        {problem.description}
                                                    </p>
                                                </div>
                                            </article>
                                        );
                                    })}
                                </div>
                            </section>

                            {/* Project Links */}
                            <section aria-labelledby="campusflow-links-heading">
                                <h3
                                    id="campusflow-links-heading"
                                    className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                                >
                                    Explore the Project
                                </h3>

                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    {/* Frontend Repository */}
                                    <a
                                        href={frontendGithubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={cn(
                                            "flex min-w-0 items-center gap-3 rounded-xl",
                                            "border border-border/70 bg-card p-3",
                                            "transition-all duration-200",
                                            "hover:-translate-y-0.5 hover:border-primary/40",
                                            "hover:bg-muted/50 hover:shadow-md",
                                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        )}
                                    >
                                        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                                            <FaGithub className="size-5" />
                                        </span>

                                        <span className="min-w-0 flex-1">
                                            <span className="block text-sm font-semibold">
                                                Frontend Code
                                            </span>
                                            <span className="block truncate text-xs text-muted-foreground">
                                                Next.js repository
                                            </span>
                                        </span>

                                        <ExternalLink className="size-3.5 shrink-0 text-muted-foreground" />
                                    </a>

                                    {/* Backend Repository */}
                                    <a
                                        href={backendGithubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={cn(
                                            "flex min-w-0 items-center gap-3 rounded-xl",
                                            "border border-border/70 bg-card p-3",
                                            "transition-all duration-200",
                                            "hover:-translate-y-0.5 hover:border-primary/40",
                                            "hover:bg-muted/50 hover:shadow-md",
                                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        )}
                                    >
                                        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                                            <FaGithub className="size-5" />
                                        </span>

                                        <span className="min-w-0 flex-1">
                                            <span className="block text-sm font-semibold">
                                                Backend Code
                                            </span>
                                            <span className="block truncate text-xs text-muted-foreground">
                                                Express.js API
                                            </span>
                                        </span>

                                        <ExternalLink className="size-3.5 shrink-0 text-muted-foreground" />
                                    </a>
                                </div>
                            </section>

                            {/* Technical Highlights */}
                            <section aria-labelledby="campusflow-tech-heading">
                                <h3
                                    id="campusflow-tech-heading"
                                    className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                                >
                                    Technical Highlights
                                </h3>

                                <ul className="space-y-3 rounded-xl border border-border/60 bg-card/40 p-4">
                                    {technicalHighlights.map((item) => (
                                        <li
                                            key={item}
                                            className="flex gap-3 text-sm leading-relaxed text-foreground/90"
                                        >
                                            <span
                                                className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/70"
                                                aria-hidden={true}
                                            />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            {/* Technology Stack */}
                            <section aria-labelledby="campusflow-stack-heading">
                                <h3
                                    id="campusflow-stack-heading"
                                    className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                                >
                                    Technology Stack
                                </h3>

                                <ul className="flex flex-wrap gap-2">
                                    {technologies.map((tech) => {
                                        const Icon = tech.icon;

                                        return (
                                            <li key={tech.name}>
                                                <span
                                                    className={cn(
                                                        "inline-flex items-center gap-1.5 rounded-lg",
                                                        "border border-border/60 bg-muted/30",
                                                        "px-2.5 py-1.5 text-xs font-medium",
                                                        "text-foreground/85 transition-colors",
                                                        "hover:bg-muted/70"
                                                    )}
                                                    title={`${tech.name} — ${tech.category} `}
                                                >
                                                    <Icon
                                                        className="size-3.5 shrink-0 opacity-80"
                                                        aria-hidden={true}
                                                    />
                                                    <span>{tech.name}</span>
                                                </span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </section>
                        </div>
                    </div>

                    {/* Fixed Footer */}
                    <DialogFooter
                        className={cn(
                            "shrink-0 flex-col gap-2",
                            "border-t border-border/60 bg-muted/20",
                            "px-2.5 py-3 sm:px-6 sm:py-4",
                            "sm:flex-row sm:items-center sm:justify-between",
                            "sm:space-x-0"
                        )}
                    >
                        {/* Don't Show Again */}
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="order-last w-full text-xs text-muted-foreground hover:text-foreground sm:order-first sm:w-auto sm:text-sm"
                            onClick={handleDontShowAgain}
                        >
                            Don&apos;t show again
                        </Button>

                        {/* Three Inline Action Buttons */}
                        <div className="grid w-full grid-cols-3 items-center gap-0 sm:flex sm:w-auto sm:flex-wrap sm:justify-end sm:gap-2">
                            {/* Explore Details */}
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className={cn(
                                    "h-9 min-w-0 gap-1 px-1.5",
                                    "text-[10px] leading-tight",
                                    "sm:gap-1.5 sm:px-3 sm:text-sm"

                                )}
                                onClick={() => {
                                    setOpen(false);
                                    window.location.href = detailsPath;
                                }}
                            >
                                <span className="truncate">
                                    Explore Details
                                </span>
                            </Button>

                            {/* Frontend Code */}
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className={cn(
                                    "h-9 min-w-0 gap-1 px-1.5",
                                    "text-[10px] leading-tight",
                                    "sm:gap-1.5 sm:px-3 sm:text-sm"
                                )}
                                onClick={() =>
                                    openExternalLink(frontendGithubUrl)
                                }
                            >
                                <FaGithub className="size-3.5 shrink-0 sm:size-4" />

                                <span className="truncate">
                                    Frontend Code
                                </span>

                                <ExternalLink className="hidden size-3 shrink-0 opacity-60 sm:block" />
                            </Button>

                            {/* Backend Code */}
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className={cn(
                                    "h-9 min-w-0 gap-1 px-1.5",
                                    "text-[10px] leading-tight",
                                    "sm:gap-1.5 sm:px-3 sm:text-sm"
                                )}
                                onClick={() =>
                                    openExternalLink(backendGithubUrl)
                                }
                            >
                                <FaGithub className="size-3.5 shrink-0 sm:size-4" />

                                <span className="truncate">
                                    Backend Code
                                </span>

                                <ExternalLink className="hidden size-3 shrink-0 opacity-60 sm:block" />
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
