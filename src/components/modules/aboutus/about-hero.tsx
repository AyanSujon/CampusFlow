import Link from "next/link";
import {
    ArrowRight,
    GraduationCap,
    Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export function AboutHero() {
    return (
        <section className="relative overflow-hidden border-b bg-background">
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute left-1/2 top-0 h-100 w-100 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute right-0 top-1/3 h-75 w-75 rounded-full bg-amber-500/10 blur-3xl" />
            </div>

            <div className="container mx-auto px-4 py-20 sm:py-28 lg:py-32">
                <div className="mx-auto max-w-4xl text-center">
                    {/* Badge */}
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-sm font-medium shadow-sm backdrop-blur">
                        <Sparkles className="size-4 text-amber-500" />
                        <span>Building a smarter digital campus</span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl">
                        One Platform for a{" "}
                        <span className="text-primary">Smarter Campus</span>
                    </h1>

                    {/* Description */}
                    <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                        CampusFlow brings students, instructors, departments,
                        administrators, and finance teams together in one connected
                        university management platform.
                    </p>

                    {/* Actions */}
                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                        <Button
                            render={<Link href="/contact">
                                Get Started
                                <ArrowRight className="ml-2 size-4" />
                            </Link>}
                            size="lg">

                        </Button>

                        <Button
                        render={                            <Link href="/academics">
                                Explore CampusFlow
                                <GraduationCap className="ml-2 size-4" />
                            </Link>}
                        variant="outline" size="lg">

                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}