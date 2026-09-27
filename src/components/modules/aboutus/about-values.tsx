import {
  Accessibility,
  Lightbulb,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const values = [
  {
    icon: Sparkles,
    title: "Simplicity",
    description:
      "Technology should make university operations easier, not more complicated.",
  },
  {
    icon: Accessibility,
    title: "Accessibility",
    description:
      "Important information should be available to the right people when they need it.",
  },
  {
    icon: ShieldCheck,
    title: "Reliability",
    description:
      "Academic and administrative systems need consistent and dependable workflows.",
  },
  {
    icon: Lightbulb,
    title: "Continuous Improvement",
    description:
      "Campus technology should evolve with the needs of students and institutions.",
  },
];

export function AboutValues() {
  return (
    <section className="py-20 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              What Guides Us
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Our Core Values
            </h2>

            <p className="mt-5 leading-7 text-muted-foreground">
              CampusFlow is built around principles that keep the experience
              useful, reliable, and focused on the people using it.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="rounded-2xl border bg-card p-6"
                >
                  <Icon className="size-6 text-primary" />

                  <h3 className="mt-5 font-semibold">{value.title}</h3>

                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}