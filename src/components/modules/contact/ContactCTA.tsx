import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ContactCTA() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center text-primary-foreground sm:px-10 lg:px-16">
          {/* Decorative elements */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-amber-400/20 blur-3xl" />

          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Still Have Questions?
            </h2>

            <p className="mt-4 leading-7 text-primary-foreground/80">
              Our university support team is ready to help you
              find the information and services you need.
            </p>

            <Link
              href="#contact-form"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-background px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-background/90"
            >
              Contact Our Team
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}