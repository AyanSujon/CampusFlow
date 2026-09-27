import {
  FileWarning,
  EyeOff,
  Link2Off,
  RefreshCcw,
} from "lucide-react";

const problems = [
  {
    icon: Link2Off,
    title: "Disconnected Systems",
    description:
      "Different departments may rely on separate tools and processes, making collaboration harder.",
  },
  {
    icon: RefreshCcw,
    title: "Manual Workflows",
    description:
      "Repetitive administrative tasks can consume valuable time and create unnecessary complexity.",
  },
  {
    icon: FileWarning,
    title: "Scattered Information",
    description:
      "Important student, academic, and financial information can become difficult to organize.",
  },
  {
    icon: EyeOff,
    title: "Limited Visibility",
    description:
      "University teams need a clear view of the information and workflows relevant to their responsibilities.",
  },
];

export function AboutProblems() {
  return (
    <section className="bg-slate-950 py-20 text-white dark:bg-slate-900 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-amber-400">
            The Challenge
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            University Management Shouldn't Feel Complicated
          </h2>

          <p className="mt-5 leading-7 text-slate-300">
            CampusFlow is designed around the everyday challenges of managing
            a modern academic environment.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((problem) => {
            const Icon = problem.icon;

            return (
              <div
                key={problem.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <div className="mb-5 flex size-11 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
                  <Icon className="size-5" />
                </div>

                <h3 className="font-semibold">{problem.title}</h3>

                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {problem.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-xl font-semibold">
            CampusFlow brings these workflows together.
          </p>
        </div>
      </div>
    </section>
  );
}