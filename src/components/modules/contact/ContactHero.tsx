import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden border-b bg-background">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
            University Support & Services
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            We&apos;re Here to{" "}
            <span className="text-primary">Help</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            Have a question about admissions, academics, student
            services, or campus life? Connect with the right
            university office and our team will be happy to assist
            you.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="#contact-form"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90"
            >
              Send a Message
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="#university-offices"
              className="inline-flex items-center rounded-lg border bg-background px-5 py-3 text-sm font-semibold transition-colors hover:bg-muted"
            >
              University Offices
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}