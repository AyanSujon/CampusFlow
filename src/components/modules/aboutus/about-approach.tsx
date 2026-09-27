const steps = [
  {
    number: "01",
    title: "Connect",
    description:
      "Bring students, faculty, departments, and administration into one connected environment.",
  },
  {
    number: "02",
    title: "Simplify",
    description:
      "Turn complicated and repetitive processes into structured digital workflows.",
  },
  {
    number: "03",
    title: "Manage",
    description:
      "Organize academic, administrative, and financial operations from one platform.",
  },
  {
    number: "04",
    title: "Grow",
    description:
      "Create a digital foundation that can evolve with the needs of your institution.",
  },
];

export function AboutApproach() {
  return (
    <section className="py-20 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Our Approach
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Designed Around the Campus
          </h2>

          <p className="mt-5 leading-7 text-muted-foreground">
            We focus on creating simple, connected workflows that make
            university operations easier to manage.
          </p>
        </div>

        <div className="relative mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative rounded-2xl border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="text-4xl font-bold text-primary/15">
                {step.number}
              </span>

              <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
