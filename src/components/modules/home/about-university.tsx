




// "use client";

// import * as React from "react";
// import Link from "next/link";
// import {
//     ArrowRight,
//     Building2,
//     CheckCircle2,
//     ChevronDown,
//     ChevronUp,
//     GraduationCap,
// } from "lucide-react";

// import { Button } from "@/components/ui/button";

// /* =============================================================
//    SLIDER DATA
// ============================================================= */

// const universityInfo = [
//     {
//         id: "beginning",
//         label: "Our Beginning",
//         title: "A foundation built around education",
//         icon: Building2,
//         content: (
//             <>
//                 <span className="font-medium text-foreground">
//                     [Placeholder — Founded in 20XX]
//                 </span>{" "}
//                 The university was established with a vision to
//                 make quality higher education accessible, practical,
//                 and connected to the needs of a changing world. What
//                 began as a growing academic institution has evolved
//                 into a diverse learning community serving students
//                 across multiple disciplines.
//             </>
//         ),
//     },
//     {
//         id: "mission",
//         label: "Our Mission",
//         title: "Education with purpose",
//         icon: GraduationCap,
//         content: (
//             <>
//                 Our mission is to provide an inclusive academic
//                 environment where students develop knowledge,
//                 critical thinking, professional skills, and a sense
//                 of responsibility to their communities. Through
//                 teaching, research, and collaboration, we aim to
//                 prepare graduates for meaningful contributions to
//                 society.
//             </>
//         ),
//     },
//     {
//         id: "accreditation",
//         label: "Accreditation",
//         title: "Academic standards and recognition",
//         icon: CheckCircle2,
//         content: (
//             <>
//                 <span className="font-medium text-foreground">
//                     [Placeholder accreditation information]
//                 </span>{" "}
//                 The university maintains its academic programs
//                 according to applicable higher-education standards
//                 and regulatory requirements. Official accreditation
//                 details, recognizing bodies, and program-specific
//                 approvals can be added here once the institution's
//                 verified information is available.
//             </>
//         ),
//         badge: "Accreditation details — Placeholder",
//     },
// ];

// /* =============================================================
//    COMPONENT
// ============================================================= */

// export default function AboutUniversity() {
//     const [currentIndex, setCurrentIndex] = React.useState(0);
//     const [isPaused, setIsPaused] = React.useState(false);

//     const totalSlides = universityInfo.length;
//     const currentSlide = universityInfo[currentIndex];

//     /* =========================================================
//        NEXT / PREVIOUS
//     ========================================================= */

//     const goToNext = React.useCallback(() => {
//         setCurrentIndex((current) =>
//             current === totalSlides - 1 ? 0 : current + 1,
//         );
//     }, [totalSlides]);

//     const goToPrevious = React.useCallback(() => {
//         setCurrentIndex((current) =>
//             current === 0 ? totalSlides - 1 : current - 1,
//         );
//     }, [totalSlides]);

//     /* =========================================================
//        AUTO SLIDE
//     ========================================================= */

//     React.useEffect(() => {
//         if (isPaused || totalSlides <= 1) {
//             return;
//         }

//         const timer = window.setInterval(goToNext, 5000);

//         return () => {
//             window.clearInterval(timer);
//         };
//     }, [goToNext, isPaused, totalSlides]);

//     return (
//         <section className="border-b bg-background">
//             <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
//                 <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
//                     {/* =================================================
//                         LEFT — SECTION INTRO
//                     ================================================= */}

//                     <div>
//                         <div className="inline-flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1.5 text-xs font-medium text-muted-foreground">
//                             <Building2 className="size-3.5 text-primary" />
//                             About the University
//                         </div>

//                         <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
//                             A place to learn,
//                             <span className="block text-primary">
//                                 grow, and contribute.
//                             </span>
//                         </h2>

//                         <p className="mt-5 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
//                             Discover the institution behind CampusFlow —
//                             its history, academic mission, and commitment
//                             to building a supportive environment for
//                             students and faculty.
//                         </p>

//                         <Button
//                             variant="outline"
//                             className="mt-6"
//                             render={
//                                 <Link href="/about">
//                                     Learn more about us
//                                     <ArrowRight className="size-4" />
//                                 </Link>
//                             }
//                         />
//                     </div>

//                     {/* =================================================
//                         RIGHT — VERTICAL SLIDER
//                     ================================================= */}

//                     <div
//                         className="relative"
//                         onMouseEnter={() => setIsPaused(true)}
//                         onMouseLeave={() => setIsPaused(false)}
//                     >
//                         <div className="flex gap-6">
//                             {/* =================================================
//                                 VERTICAL INDICATOR
//                             ================================================= */}

//                             <div className="relative hidden w-5 shrink-0 flex-col items-center sm:flex">
//                                 {/* Vertical line */}
//                                 <div className="absolute top-2 bottom-2 w-px bg-border" />

//                                 {universityInfo.map((slide, index) => {
//                                     const Icon = slide.icon;
//                                     const isActive =
//                                         index === currentIndex;

//                                     return (
//                                         <button
//                                             key={slide.id}
//                                             type="button"
//                                             onClick={() =>
//                                                 setCurrentIndex(index)
//                                             }
//                                             aria-label={`Show ${slide.label}`}
//                                             className="group relative z-10 mb-8 flex size-5 items-center justify-center last:mb-0"
//                                         >
//                                             <span
//                                                 className={[
//                                                     "flex size-5 items-center justify-center rounded-full",
//                                                     "border-2 bg-background transition-all duration-300",
//                                                     isActive
//                                                         ? "border-primary"
//                                                         : "border-border group-hover:border-primary/50",
//                                                 ].join(" ")}
//                                             >
//                                                 <span
//                                                     className={[
//                                                         "size-1.5 rounded-full transition-all duration-300",
//                                                         isActive
//                                                             ? "bg-primary"
//                                                             : "bg-transparent group-hover:bg-primary/40",
//                                                     ].join(" ")}
//                                                 />
//                                             </span>
//                                         </button>
//                                     );
//                                 })}
//                             </div>

//                             {/* =================================================
//                                 SLIDE CONTENT
//                             ================================================= */}

//                             <div className="min-w-0 flex-1">
//                                 <div
//                                     key={currentSlide.id}
//                                     className="animate-in fade-in slide-in-from-bottom-4 duration-500"
//                                 >
//                                     {/* Label */}
//                                     <p className="text-xs font-semibold uppercase tracking-wider text-primary">
//                                         {currentSlide.label}
//                                     </p>

//                                     {/* Title */}
//                                     <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
//                                         {currentSlide.title}
//                                     </h3>

//                                     {/* Content */}
//                                     <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
//                                         {currentSlide.content}
//                                     </p>

//                                     {/* Accreditation Badge */}
//                                     {currentSlide.badge && (
//                                         <div className="mt-5 inline-flex items-center gap-2 rounded-lg border bg-muted/40 px-3 py-2 text-xs font-medium text-muted-foreground">
//                                             <CheckCircle2 className="size-4 text-primary" />
//                                             {currentSlide.badge}
//                                         </div>
//                                     )}
//                                 </div>

//                                 {/* =================================================
//                                     MOBILE INDICATORS
//                                 ================================================= */}

//                                 <div className="mt-6 flex items-center gap-2 sm:hidden">
//                                     {universityInfo.map((slide, index) => (
//                                         <button
//                                             key={slide.id}
//                                             type="button"
//                                             onClick={() =>
//                                                 setCurrentIndex(index)
//                                             }
//                                             aria-label={`Show ${slide.label}`}
//                                             className={[
//                                                 "h-1.5 rounded-full transition-all duration-300",
//                                                 index === currentIndex
//                                                     ? "w-8 bg-primary"
//                                                     : "w-2 bg-border",
//                                             ].join(" ")}
//                                         />
//                                     ))}
//                                 </div>

//                                 {/* =================================================
//                                     CONTROLS
//                                 ================================================= */}

//                                 <div className="mt-7 flex items-center justify-between border-t pt-5">
//                                     {/* Current slide */}
//                                     <div className="text-xs text-muted-foreground">
//                                         <span className="font-semibold text-foreground">
//                                             {String(
//                                                 currentIndex + 1,
//                                             ).padStart(2, "0")}
//                                         </span>

//                                         <span className="mx-1.5">
//                                             /
//                                         </span>

//                                         {String(totalSlides).padStart(
//                                             2,
//                                             "0",
//                                         )}
//                                     </div>

//                                     {/* Controls */}
//                                     <div className="flex items-center gap-2">
//                                         <button
//                                             type="button"
//                                             onClick={goToPrevious}
//                                             aria-label="Previous section"
//                                             className="flex size-8 items-center justify-center rounded-md border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
//                                         >
//                                             <ChevronUp className="size-4" />
//                                         </button>

//                                         <button
//                                             type="button"
//                                             onClick={goToNext}
//                                             aria-label="Next section"
//                                             className="flex size-8 items-center justify-center rounded-md border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
//                                         >
//                                             <ChevronDown className="size-4" />
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* ===================================================
//                     TRUST STRIP
//                 =================================================== */}

//                 <div className="mt-14 grid gap-4 border-t pt-8 sm:grid-cols-3">
//                     <TrustItem
//                         icon={<GraduationCap className="size-4" />}
//                         title="Student Focused"
//                         description="Supporting academic growth and student success."
//                     />

//                     <TrustItem
//                         icon={<Building2 className="size-4" />}
//                         title="Academic Community"
//                         description="Connecting students, faculty, and departments."
//                     />

//                     <TrustItem
//                         icon={<CheckCircle2 className="size-4" />}
//                         title="Academic Standards"
//                         description="Committed to quality education and accountability."
//                     />
//                 </div>
//             </div>
//         </section>
//     );
// }

// /* =============================================================
//    TRUST ITEM
// ============================================================= */

// function TrustItem({
//     icon,
//     title,
//     description,
// }: {
//     icon: React.ReactNode;
//     title: string;
//     description: string;
// }) {
//     return (
//         <div className="flex gap-3 rounded-xl border bg-muted/20 p-4">
//             <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
//                 {icon}
//             </div>

//             <div>
//                 <p className="text-sm font-semibold">
//                     {title}
//                 </p>

//                 <p className="mt-1 text-xs leading-5 text-muted-foreground">
//                     {description}
//                 </p>
//             </div>
//         </div>
//     );
// }




























"use client";

import * as React from "react";
import Link from "next/link";
import {
    ArrowRight,
    Building2,
    CheckCircle2,
    ChevronDown,
    ChevronUp,
    GraduationCap,
} from "lucide-react";

import { Button } from "@/components/ui/button";

/* =============================================================
   SLIDER DATA
============================================================= */

const universityInfo = [
    {
        id: "beginning",
        label: "Our Beginning",
        title: "A foundation built around education",
        icon: Building2,
        content: (
            <>
                <span className="font-medium text-foreground">
                    [Placeholder — Founded in 20XX]
                </span>{" "}
                The university was established with a vision to
                make quality higher education accessible, practical,
                and connected to the needs of a changing world. What
                began as a growing academic institution has evolved
                into a diverse learning community serving students
                across multiple disciplines.
            </>
        ),
    },
    {
        id: "mission",
        label: "Our Mission",
        title: "Education with purpose",
        icon: GraduationCap,
        content: (
            <>
                Our mission is to provide an inclusive academic
                environment where students develop knowledge,
                critical thinking, professional skills, and a sense
                of responsibility to their communities. Through
                teaching, research, and collaboration, we aim to
                prepare graduates for meaningful contributions to
                society.
            </>
        ),
    },
    {
        id: "accreditation",
        label: "Accreditation",
        title: "Academic standards and recognition",
        icon: CheckCircle2,
        content: (
            <>
                <span className="font-medium text-foreground">
                    [Placeholder accreditation information]
                </span>{" "}
                The university maintains its academic programs
                according to applicable higher-education standards
                and regulatory requirements. Official accreditation
                details, recognizing bodies, and program-specific
                approvals can be added here once the institution's
                verified information is available.
            </>
        ),
        badge: "Accreditation details — Placeholder",
    },
];

/* =============================================================
   COMPONENT
============================================================= */

export default function AboutUniversity() {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const totalSlides = universityInfo.length;
    const currentSlide = universityInfo[currentIndex];

    /* =========================================================
       NEXT / PREVIOUS
    ========================================================= */

    const goToNext = React.useCallback(() => {
        setCurrentIndex((current) =>
            current === universityInfo.length - 1 ? 0 : current + 1,
        );
    }, []);

    const goToPrevious = React.useCallback(() => {
        setCurrentIndex((current) =>
            current === 0
                ? universityInfo.length - 1
                : current - 1,
        );
    }, []);

    /* =========================================================
       AUTO SLIDE
    ========================================================= */

    React.useEffect(() => {
        if (totalSlides <= 1) {
            return;
        }

        const timer = window.setInterval(goToNext, 5000);

        return () => {
            window.clearInterval(timer);
        };
    }, [goToNext]);

    return (
        <section className="border-b bg-background">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
                <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
                    {/* =================================================
                        LEFT — SECTION INTRO
                    ================================================= */}

                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1.5 text-xs font-medium text-muted-foreground">
                            <Building2 className="size-3.5 text-primary" />
                            About the University
                        </div>

                        <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            A place to learn,
                            <span className="block text-primary">
                                grow, and contribute.
                            </span>
                        </h2>

                        <p className="mt-5 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
                            Discover the institution behind
                            CampusFlow — its history, academic mission,
                            and commitment to building a supportive
                            environment for students and faculty.
                        </p>

                        <Button
                            variant="outline"
                            className="mt-6"
                            render={
                                <Link href="/about">
                                    Learn more about us
                                    <ArrowRight className="size-4" />
                                </Link>
                            }
                        />
                    </div>

                    {/* =================================================
                        RIGHT — VERTICAL SLIDER
                    ================================================= */}

                    <div className="relative">
                        <div className="flex gap-6">
                            {/* =================================================
                                VERTICAL INDICATOR
                            ================================================= */}

                            <div className="relative hidden w-5 shrink-0 flex-col items-center sm:flex">
                                {/* Vertical line */}
                                <div className="absolute top-2 bottom-2 w-px bg-border" />

                                {universityInfo.map((slide, index) => {
                                    const isActive =
                                        index === currentIndex;

                                    return (
                                        <button
                                            key={slide.id}
                                            type="button"
                                            onClick={() =>
                                                setCurrentIndex(index)
                                            }
                                            aria-label={`Show ${slide.label}`}
                                            aria-current={
                                                isActive
                                                    ? "true"
                                                    : undefined
                                            }
                                            className="group relative z-10 mb-8 flex size-5 items-center justify-center last:mb-0"
                                        >
                                            <span
                                                className={[
                                                    "flex size-5 items-center justify-center rounded-full",
                                                    "border-2 bg-background transition-all duration-300",
                                                    isActive
                                                        ? "border-primary"
                                                        : "border-border group-hover:border-primary/50",
                                                ].join(" ")}
                                            >
                                                <span
                                                    className={[
                                                        "size-1.5 rounded-full transition-all duration-300",
                                                        isActive
                                                            ? "bg-primary"
                                                            : "bg-transparent group-hover:bg-primary/40",
                                                    ].join(" ")}
                                                />
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* =================================================
                                SLIDE CONTENT
                            ================================================= */}

                            <div className="min-w-0 flex-1">
                                <div
                                    key={currentSlide.id}
                                    className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                                >
                                    {/* Label */}
                                    <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                                        {currentSlide.label}
                                    </p>

                                    {/* Title */}
                                    <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                                        {currentSlide.title}
                                    </h3>

                                    {/* Content */}
                                    <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                                        {currentSlide.content}
                                    </p>

                                    {/* Accreditation Badge */}
                                    {currentSlide.badge && (
                                        <div className="mt-5 inline-flex items-center gap-2 rounded-lg border bg-muted/40 px-3 py-2 text-xs font-medium text-muted-foreground">
                                            <CheckCircle2 className="size-4 text-primary" />
                                            {currentSlide.badge}
                                        </div>
                                    )}
                                </div>

                                {/* =================================================
                                    MOBILE INDICATORS
                                ================================================= */}

                                <div className="mt-6 flex items-center gap-2 sm:hidden">
                                    {universityInfo.map(
                                        (slide, index) => (
                                            <button
                                                key={slide.id}
                                                type="button"
                                                onClick={() =>
                                                    setCurrentIndex(
                                                        index,
                                                    )
                                                }
                                                aria-label={`Show ${slide.label}`}
                                                aria-current={
                                                    index ===
                                                    currentIndex
                                                        ? "true"
                                                        : undefined
                                                }
                                                className={[
                                                    "h-1.5 rounded-full transition-all duration-300",
                                                    index ===
                                                    currentIndex
                                                        ? "w-8 bg-primary"
                                                        : "w-2 bg-border",
                                                ].join(" ")}
                                            />
                                        ),
                                    )}
                                </div>

                                {/* =================================================
                                    CONTROLS
                                ================================================= */}

                                <div className="mt-7 flex items-center justify-between border-t pt-5">
                                    {/* Current slide */}
                                    <div className="text-xs text-muted-foreground">
                                        <span className="font-semibold text-foreground">
                                            {String(
                                                currentIndex + 1,
                                            ).padStart(2, "0")}
                                        </span>

                                        <span className="mx-1.5">
                                            /
                                        </span>

                                        {String(totalSlides).padStart(
                                            2,
                                            "0",
                                        )}
                                    </div>

                                    {/* Controls */}
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={goToPrevious}
                                            aria-label="Previous section"
                                            className="flex size-8 items-center justify-center rounded-md border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        >
                                            <ChevronUp className="size-4" />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={goToNext}
                                            aria-label="Next section"
                                            className="flex size-8 items-center justify-center rounded-md border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        >
                                            <ChevronDown className="size-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ===================================================
                    TRUST STRIP
                =================================================== */}

                <div className="mt-14 grid gap-4 border-t pt-8 sm:grid-cols-3">
                    <TrustItem
                        icon={<GraduationCap className="size-4" />}
                        title="Student Focused"
                        description="Supporting academic growth and student success."
                    />

                    <TrustItem
                        icon={<Building2 className="size-4" />}
                        title="Academic Community"
                        description="Connecting students, faculty, and departments."
                    />

                    <TrustItem
                        icon={<CheckCircle2 className="size-4" />}
                        title="Academic Standards"
                        description="Committed to quality education and accountability."
                    />
                </div>
            </div>
        </section>
    );
}

/* =============================================================
   TRUST ITEM
============================================================= */

function TrustItem({
    icon,
    title,
    description,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <div className="flex gap-3 rounded-xl border bg-muted/20 p-4">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {icon}
            </div>

            <div>
                <p className="text-sm font-semibold">
                    {title}
                </p>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {description}
                </p>
            </div>
        </div>
    );
}