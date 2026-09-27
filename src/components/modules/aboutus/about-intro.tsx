import {
  Blocks,
  Network,
  Workflow,
} from "lucide-react";

const features = [
  {
    icon: Network,
    title: "Centralized Management",
    description:
      "Keep important academic, administrative, and financial workflows connected in one platform.",
  },
  {
    icon: Workflow,
    title: "Streamlined Workflows",
    description:
      "Reduce repetitive processes and make everyday university operations easier to manage.",
  },
  {
    icon: Blocks,
    title: "Connected Campus",
    description:
      "Connect students, instructors, departments, administrators, and finance teams.",
  },
];

export function AboutIntro() {
  return (
    <section className="bg-muted/30 py-20 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left */}
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              About CampusFlow
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Built to Connect the Entire Campus
            </h2>

            <p className="mt-5 leading-8 text-muted-foreground">
              CampusFlow is a modern university management platform designed
              to simplify academic, administrative, and financial workflows.
            </p>

            <p className="mt-4 leading-8 text-muted-foreground">
              From student registration and course management to payments and
              communication, CampusFlow helps institutions manage everyday
              operations from a single connected platform.
            </p>
          </div>

          {/* Right */}
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border bg-background p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>

                  <h3 className="font-semibold">{feature.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {feature.description}
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