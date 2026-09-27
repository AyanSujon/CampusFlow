"use client";

import { useCallback, useEffect, useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    GraduationCap,
    Quote,
} from "lucide-react";

import { Button } from "@/components/ui/button";

type Testimonial = {
    id: string;
    quote: string;
    role: "Student" | "Alumni";
};

const testimonials: Testimonial[] = [
    {
        id: "testimonial-001",
        quote:
            "The university gave me an environment where I could focus on my studies while also discovering new interests and building meaningful connections.",
        role: "Student",
    },
    {
        id: "testimonial-002",
        quote:
            "My academic experience helped me develop both the knowledge and confidence to take the next step in my professional journey.",
        role: "Alumni",
    },
    {
        id: "testimonial-003",
        quote:
            "Beyond the classroom, the people and experiences around campus became an important part of my university journey.",
        role: "Student",
    },
    {
        id: "testimonial-004",
        quote:
            "The combination of academic guidance, student activities, and opportunities to learn outside the classroom made my experience meaningful.",
        role: "Alumni",
    },
];

export default function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const goToNext = useCallback(() => {
        setActiveIndex((current) =>
            current === testimonials.length - 1 ? 0 : current + 1,
        );
    }, []);

    const goToPrevious = useCallback(() => {
        setActiveIndex((current) =>
            current === 0 ? testimonials.length - 1 : current - 1,
        );
    }, []);

    useEffect(() => {
        if (isPaused || testimonials.length <= 1) {
            return;
        }

        const interval = window.setInterval(() => {
            goToNext();
        }, 6000);

        return () => {
            window.clearInterval(interval);
        };
    }, [goToNext, isPaused]);

    const activeTestimonial = testimonials[activeIndex];

    return (
        <section className="border-t bg-muted/20">
            <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
                {/* =========================================
                    Header
                ========================================= */}
                <div className="mx-auto max-w-3xl text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-sm font-medium text-muted-foreground">
                        <GraduationCap className="size-4 text-primary" />
                        Student Voices
                    </div>

                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                        Hear from the people who experience campus life.
                    </h2>

                    <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
                        Every university journey is different. These sample
                        quotes represent the type of student and alumni
                        perspectives that can be featured here.
                    </p>
                </div>

                {/* =========================================
                    Testimonial Slider
                ========================================= */}
                <div className="mx-auto mt-10 max-w-7xl">
                    <div
                        key={activeTestimonial.id}
                        className="relative animate-in overflow-hidden rounded-3xl border bg-background p-7 shadow-sm fade-in duration-500 sm:p-10 lg:p-14"
                    >
                        {/* Decorative Quote */}
                        <div
                            aria-hidden="true"
                            className="absolute -right-8 -top-8 flex size-32 items-center justify-center rounded-full bg-primary/5"
                        >
                            <Quote className="size-14 text-primary/20" />
                        </div>

                        <div className="relative">
                            {/* Quote Icon */}
                            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <Quote className="size-6" />
                            </div>

                            {/* Quote */}
                            <blockquote className="mt-8 max-w-4xl text-2xl font-semibold leading-relaxed tracking-tight sm:text-3xl lg:text-4xl">
                                “{activeTestimonial.quote}”
                            </blockquote>

                            {/* Placeholder Author */}
                            <div className="mt-8 flex items-center gap-3">
                                <div className="flex size-11 items-center justify-center rounded-full bg-muted">
                                    <GraduationCap className="size-5 text-muted-foreground" />
                                </div>

                                <div>
                                    <p className="text-sm font-semibold">
                                        Student / Alumni Name
                                    </p>

                                    <p className="text-sm text-muted-foreground">
                                        {activeTestimonial.role} • Placeholder
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* =========================================
                        Slider Controls
                    ========================================= */}
                    <div className="mt-6 flex items-center justify-between">
                        {/* Counter */}
                        <div className="text-sm text-muted-foreground">
                            <span className="font-semibold text-foreground">
                                {String(activeIndex + 1).padStart(2, "0")}
                            </span>

                            <span className="mx-2">/</span>

                            <span>
                                {String(testimonials.length).padStart(2, "0")}
                            </span>
                        </div>

                        {/* Indicators */}
                        <div className="flex items-center gap-2">
                            {testimonials.map((testimonial, index) => (
                                <button
                                    key={testimonial.id}
                                    type="button"
                                    onClick={() => setActiveIndex(index)}
                                    aria-label={`Show testimonial ${index + 1}`}
                                    aria-current={
                                        index === activeIndex
                                            ? "true"
                                            : undefined
                                    }
                                    className={[
                                        "h-2 rounded-full transition-all duration-300",
                                        index === activeIndex
                                            ? "w-8 bg-primary"
                                            : "w-2 bg-border hover:bg-primary/50",
                                    ].join(" ")}
                                />
                            ))}
                        </div>

                        {/* Navigation */}
                        <div className="flex items-center gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={goToPrevious}
                                aria-label="Previous testimonial"
                            >
                                <ArrowLeft className="size-4" />
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={goToNext}
                                aria-label="Next testimonial"
                            >
                                <ArrowRight className="size-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Pause / Resume */}
                    <div className="mt-4 text-center">
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                                setIsPaused((current) => !current)
                            }
                            className="text-xs text-muted-foreground"
                        >
                            {isPaused
                                ? "Resume testimonials"
                                : "Pause testimonials"}
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}