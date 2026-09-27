import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function AboutCTA() {
    return (
        <section className="py-20 sm:py-24">
            <div className="container mx-auto px-4">
                <div className="relative overflow-hidden rounded-3xl border bg-muted/40 px-6 py-14 text-center sm:px-12 sm:py-20">
                    <div className="absolute left-1/2 top-0 -z-10 size-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

                    <div className="mx-auto max-w-2xl">
                        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                            Get Started
                        </p>

                        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                            Ready for a More Connected Campus?
                        </h2>

                        <p className="mt-5 leading-7 text-muted-foreground">
                            Explore how CampusFlow can bring academic, administrative, and
                            financial workflows together in one platform.
                        </p>

                        <div className="mt-8">
                            <Button
                                render={<Link href="/contact">
                                    Get Started
                                    <ArrowRight className="ml-2 size-4" />
                                </Link>}
                                size="lg">

                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}