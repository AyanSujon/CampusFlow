import {
  BadgeDollarSign,
  Building2,
  GraduationCap,
  ShieldCheck,
  UserRound,
} from "lucide-react";

const users = [
  {
    icon: GraduationCap,
    title: "Students",
    description:
      "Manage profiles, academic information, courses, and financial activities.",
  },
  {
    icon: UserRound,
    title: "Instructors",
    description:
      "Access teaching-related information and manage academic activities.",
  },
  {
    icon: Building2,
    title: "Departments",
    description:
      "Organize programs, courses, subjects, and department-level activities.",
  },
  {
    icon: ShieldCheck,
    title: "Administrators",
    description:
      "Manage users, academic structures, and university-wide operations.",
  },
  {
    icon: BadgeDollarSign,
    title: "Finance Teams",
    description:
      "Manage invoices, payments, and important financial workflows.",
  },
];

export function AboutUsers() {
  return (
    <section className="bg-muted/30 py-20 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            One Campus
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Built for Every Part of the Campus
          </h2>

          <p className="mt-5 text-muted-foreground">
            Different roles, different responsibilities, one connected
            platform.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {users.map((user) => {
            const Icon = user.icon;

            return (
              <div
                key={user.title}
                className="rounded-2xl border bg-background p-6 text-center shadow-sm"
              >
                <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-6" />
                </div>

                <h3 className="mt-5 font-semibold">{user.title}</h3>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {user.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}