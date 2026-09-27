


"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
    ArrowDown,
    ArrowRight,
    ArrowUp,
    CalendarDays,
    Clock3,
    MapPin,
    Pause,
    Play,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export type UniversityEvent = {
    id: string;
    title: string;
    slug: string;
    description?: string | null;
    startAt: string;
    endAt?: string | null;
    location?: string | null;
    scope: "UNIVERSITY" | "FACULTY";
};

type UpcomingEventsProps = {
    events: UniversityEvent[];
};

function formatEventDate(date: string) {
    return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(new Date(date));
}

function formatEventTime(date: string) {
    return new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
    }).format(new Date(date));
}

function formatEventMonth(date: string) {
    return new Intl.DateTimeFormat("en-US", {
        month: "short",
    })
        .format(new Date(date))
        .toUpperCase();
}

function formatEventDay(date: string) {
    return new Intl.DateTimeFormat("en-US", {
        day: "2-digit",
    }).format(new Date(date));
}

function getEventScopeLabel(scope: UniversityEvent["scope"]) {
    return scope === "UNIVERSITY" ? "University" : "Faculty";
}

export default function UpcomingEvents({
    events,
}: UpcomingEventsProps) {
    const upcomingEvents = events
        .filter(
            (event) =>
                event.scope === "UNIVERSITY" ||
                event.scope === "FACULTY",
        )
        .filter((event) => new Date(event.startAt).getTime() > Date.now())
        .sort(
            (a, b) =>
                new Date(a.startAt).getTime() -
                new Date(b.startAt).getTime(),
        )
        .slice(0, 5);

    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const totalEvents = upcomingEvents.length;

    const goToNext = useCallback(() => {
        setActiveIndex((current) =>
            current === totalEvents - 1 ? 0 : current + 1,
        );
    }, [totalEvents]);

    const goToPrevious = useCallback(() => {
        setActiveIndex((current) =>
            current === 0 ? totalEvents - 1 : current - 1,
        );
    }, [totalEvents]);

    const goToEvent = (index: number) => {
        setActiveIndex(index);
    };

    useEffect(() => {
        if (isPaused || totalEvents <= 1) {
            return;
        }

        const interval = window.setInterval(() => {
            goToNext();
        }, 5000);

        return () => {
            window.clearInterval(interval);
        };
    }, [goToNext, isPaused, totalEvents]);

    useEffect(() => {
        if (activeIndex >= totalEvents && totalEvents > 0) {
            setActiveIndex(0);
        }
    }, [activeIndex, totalEvents]);

    /* =========================================
        Empty State
    ========================================= */
    if (totalEvents === 0) {
        return (
            <section className="border-t bg-muted/20">
                <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                        <div className="max-w-2xl">
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-sm font-medium text-muted-foreground">
                                <CalendarDays className="size-4 text-primary" />
                                Upcoming Events
                            </div>

                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                What&apos;s happening on campus.
                            </h2>

                            <p className="mt-4 text-base leading-7 text-muted-foreground">
                                Stay connected with upcoming university and
                                faculty events, activities, and academic
                                gatherings.
                            </p>
                        </div>

                        <Button
                            render={
                                <Link href="/events">
                                    View Full Calendar
                                    <ArrowRight className="size-4" />
                                </Link>
                            }
                            variant="outline"
                            className="w-fit"
                        />
                    </div>

                    <div className="mt-10 rounded-2xl border bg-background px-6 py-16 text-center">
                        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted">
                            <CalendarDays className="size-5 text-muted-foreground" />
                        </div>

                        <h3 className="mt-4 text-lg font-semibold">
                            No upcoming events
                        </h3>

                        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                            There are no published university or faculty
                            events scheduled at the moment. Check the full
                            calendar for more information.
                        </p>

                        <Button
                            render={
                                <Link href="/events">
                                    View Event Calendar
                                    <ArrowRight className="size-4" />
                                </Link>
                            }
                            variant="outline"
                            className="mt-6"
                        />
                    </div>
                </div>
            </section>
        );
    }

    const activeEvent = upcomingEvents[activeIndex];

    return (
        <section className="border-t bg-muted/20">
            <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
                {/* =========================================
                    Header
                ========================================= */}
                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div className="max-w-2xl">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-sm font-medium text-muted-foreground">
                            <CalendarDays className="size-4 text-primary" />
                            Upcoming Events
                        </div>

                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                            What&apos;s happening on campus.
                        </h2>

                        <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
                            Stay connected with upcoming university and
                            faculty events, activities, and academic
                            gatherings.
                        </p>
                    </div>

                    <Button
                        render={
                            <Link href="/events">
                                View Full Calendar
                                <ArrowRight className="size-4" />
                            </Link>
                        }
                        variant="outline"
                        className="w-fit"
                    />
                </div>

                {/* =========================================
                    Event Slider
                ========================================= */}
                <div className="mt-10 overflow-hidden rounded-3xl border bg-background">
                    <div className="grid min-h-105 lg:grid-cols-[1fr_100px]">
                        {/* =====================================
                            Main Event
                        ===================================== */}
                        <div
                            key={activeEvent.id}
                            className="relative flex flex-col justify-between p-6 sm:p-8 lg:p-10 animate-in fade-in slide-in-from-bottom-3 duration-500"
                        >
                            {/* Top */}
                            <div>
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                                        {getEventScopeLabel(
                                            activeEvent.scope,
                                        )}
                                    </span>

                                    <span className="text-sm text-muted-foreground">
                                        Event {activeIndex + 1} of{" "}
                                        {totalEvents}
                                    </span>
                                </div>

                                {/* Date */}
                                <div className="mt-8 flex flex-wrap items-center gap-5">
                                    <div className="flex size-20 shrink-0 flex-col items-center justify-center rounded-2xl border bg-muted/40">
                                        <span className="text-xs font-bold tracking-wider text-primary">
                                            {formatEventMonth(
                                                activeEvent.startAt,
                                            )}
                                        </span>

                                        <span className="text-3xl font-bold leading-none">
                                            {formatEventDay(
                                                activeEvent.startAt,
                                            )}
                                        </span>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">
                                            {formatEventDate(
                                                activeEvent.startAt,
                                            )}
                                        </p>

                                        <h3 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                                            {activeEvent.title}
                                        </h3>
                                    </div>
                                </div>

                                {/* Description */}
                                {activeEvent.description && (
                                    <p className="mt-7 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                                        {activeEvent.description}
                                    </p>
                                )}

                                {/* Metadata */}
                                <div className="mt-6 flex flex-wrap gap-3">
                                    <div className="inline-flex items-center gap-2 rounded-lg border bg-muted/30 px-3 py-2 text-sm text-muted-foreground">
                                        <Clock3 className="size-4 text-primary" />

                                        <span>
                                            {formatEventTime(
                                                activeEvent.startAt,
                                            )}
                                        </span>
                                    </div>

                                    {activeEvent.location && (
                                        <div className="inline-flex max-w-full items-center gap-2 rounded-lg border bg-muted/30 px-3 py-2 text-sm text-muted-foreground">
                                            <MapPin className="size-4 shrink-0 text-primary" />

                                            <span className="truncate">
                                                {activeEvent.location}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Bottom */}
                            <div className="mt-8 flex flex-wrap items-center gap-4">
                                <Button
                                    render={
                                        <Link
                                            href={`/events/${activeEvent.slug}`}
                                        >
                                            View Event Details
                                            <ArrowRight className="size-4" />
                                        </Link>
                                    }
                                />

                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() =>
                                        setIsPaused((current) => !current)
                                    }
                                    className="gap-2"
                                    aria-label={
                                        isPaused
                                            ? "Resume event slider"
                                            : "Pause event slider"
                                    }
                                >
                                    {isPaused ? (
                                        <>
                                            <Play className="size-4" />
                                            Resume
                                        </>
                                    ) : (
                                        <>
                                            <Pause className="size-4" />
                                            Pause
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>

                        {/* =====================================
                            Vertical Controls
                        ===================================== */}
                        <div className="flex border-t bg-muted/30 lg:flex-col lg:border-l lg:border-t-0">
                            {/* Previous */}
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={goToPrevious}
                                disabled={totalEvents <= 1}
                                className="hidden rounded-none lg:flex"
                                aria-label="Previous event"
                            >
                                <ArrowUp className="size-5" />
                            </Button>

                            {/* Indicators */}
                            <div className="flex flex-1 items-center justify-center gap-2 p-4 lg:flex-col lg:gap-3">
                                {upcomingEvents.map((event, index) => (
                                    <button
                                        key={event.id}
                                        type="button"
                                        onClick={() => goToEvent(index)}
                                        aria-label={`Show event ${index + 1}: ${event.title}`}
                                        aria-current={
                                            index === activeIndex
                                                ? "true"
                                                : undefined
                                        }
                                        className={[
                                            "flex items-center justify-center rounded-full transition-all duration-300",
                                            index === activeIndex
                                                ? "h-8 w-8 bg-primary text-primary-foreground"
                                                : "size-2.5 bg-border hover:bg-primary/50 lg:size-3",
                                        ].join(" ")}
                                    >
                                        {index === activeIndex && (
                                            <span className="text-[10px] font-bold">
                                                {String(index + 1).padStart(
                                                    2,
                                                    "0",
                                                )}
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Next */}
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={goToNext}
                                disabled={totalEvents <= 1}
                                className="hidden rounded-none lg:flex"
                                aria-label="Next event"
                            >
                                <ArrowDown className="size-5" />
                            </Button>

                            {/* Mobile arrows */}
                            <div className="flex items-center border-l lg:hidden">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={goToPrevious}
                                    disabled={totalEvents <= 1}
                                    aria-label="Previous event"
                                >
                                    <ArrowUp className="size-4" />
                                </Button>

                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={goToNext}
                                    disabled={totalEvents <= 1}
                                    aria-label="Next event"
                                >
                                    <ArrowDown className="size-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}