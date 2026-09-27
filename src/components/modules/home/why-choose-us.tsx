import Link from "next/link";
import {
    ArrowRight,
    BookOpen,
    BriefcaseBusiness,
    FlaskConical,
    GraduationCap,
    Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";

/* =============================================================
   WHY CHOOSE US DATA

   These are demonstration/placeholder differentiators.
   Replace them with verified university information later.
============================================================= */

const differentiators = [
    {
        id: "small-classes",
        icon: Users,
        number: "01",
        title: "Focused Learning",
        description:
            "[Placeholder] Smaller class environments can create more opportunities for discussion, guidance, and meaningful interaction between students and faculty.",
    },
    {
        id: "industry",
        icon: BriefcaseBusiness,
        number: "02",
        title: "Industry Connections",
        description:
            "[Placeholder] Practical collaboration, internships, and industry engagement can help students connect classroom learning with professional environments.",
    },
    {
        id: "research",
        icon: FlaskConical,
        number: "03",
        title: "Research & Innovation",
        description:
            "[Placeholder] Research opportunities encourage students and faculty to explore ideas, solve problems, and contribute to their academic fields.",
    },
    {
        id: "scholarships",
        icon: GraduationCap,
        number: "04",
        title: "Scholarship Opportunities",
        description:
            "[Placeholder] Scholarship and financial-support opportunities can help eligible students pursue their academic goals.",
    },
    {
        id: "academic-support",
        icon: BookOpen,
        number: "05",
        title: "Academic Support",
        description:
            "[Placeholder] Students can access academic guidance, learning resources, and support throughout their university journey.",
    },
];

/* =============================================================
   COMPONENT
============================================================= */

export default function WhyChooseUs() {
    return (
        <section className="border-b bg-muted/20">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
                    {/* Intro */}
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground">
                            <GraduationCap className="size-3.5 text-primary" />
                            Why Choose Us
                        </div>

                        <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            More than a place to
                            <span className="block text-primary">
                                earn a degree.
                            </span>
                        </h2>

                        <p className="mt-5 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
                            Choosing a university is about finding the
                            academic environment, opportunities, and
                            support that match your goals. Here is a
                            glimpse of what makes the experience
                            distinctive.
                        </p>

                        <Button
                            variant="outline"
                            className="mt-6"
                            render={
                                <Link href="/about">
                                    Discover the university
                                    <ArrowRight className="size-4" />
                                </Link>
                            }
                        />
                    </div>

                    {/* =================================================
                        DIFFERENTIATORS
                    ================================================= */}

                    <div className="divide-y rounded-xl border bg-background">
                        {differentiators.map((item) => (
                            <Differentiator
                                key={item.id}
                                item={item}
                            />
                        ))}
                    </div>
                </div>

                {/* =================================================
                    DECISION MESSAGE
                ================================================= */}

                <div className="mt-12 rounded-xl border bg-background p-6 sm:p-8">
                    <div className="max-w-3xl">
                        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                            Find the right fit
                        </p>

                        <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                            Your university choice should match your
                            goals.
                        </h3>

                        <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
                            Compare programs, academic areas, admission
                            requirements, student opportunities, and
                            available support to understand whether this
                            institution is the right environment for you.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* =============================================================
   DIFFERENTIATOR
============================================================= */

function Differentiator({
    item,
}: {
    item: (typeof differentiators)[number];
}) {
    const Icon = item.icon;

    return (
        <div className="group flex gap-4 p-5 transition-colors hover:bg-muted/30 sm:p-6">
            {/* Number */}
            <div className="hidden shrink-0 pt-1 text-xs font-semibold text-muted-foreground sm:block">
                {item.number}
            </div>

            {/* Icon */}
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-primary/5 text-primary transition-colors group-hover:bg-primary/10">
                <Icon className="size-5" />
            </div>

            {/* Content */}
            <div className="min-w-0">
                <h3 className="text-base font-semibold text-foreground">
                    {item.title}
                </h3>

                <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                    {item.description}
                </p>
            </div>
        </div>
    );
}