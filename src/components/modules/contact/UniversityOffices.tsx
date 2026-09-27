import {
  BookOpen,
  CreditCard,
  GraduationCap,
  Headphones,
  Users,
} from "lucide-react";

const offices = [
  {
    icon: GraduationCap,
    name: "Admissions Office",
    description:
      "Get help with applications, admission requirements, programs, and enrollment.",
    phone: "+880 1234-567890",
    email: "admissions@campusflow.edu",
  },
  {
    icon: BookOpen,
    name: "Registrar's Office",
    description:
      "Assistance with academic records, registration, transcripts, and certificates.",
    phone: "+880 1234-567891",
    email: "registrar@campusflow.edu",
  },
  {
    icon: Users,
    name: "Student Affairs",
    description:
      "Support for student services, campus activities, and student-related concerns.",
    phone: "+880 1234-567892",
    email: "studentaffairs@campusflow.edu",
  },
  {
    icon: CreditCard,
    name: "Finance Office",
    description:
      "Questions about tuition fees, invoices, payments, and financial records.",
    phone: "+880 1234-567893",
    email: "finance@campusflow.edu",
  },
  {
    icon: Headphones,
    name: "IT Support",
    description:
      "Technical assistance for accounts, login problems, and university systems.",
    phone: "+880 1234-567895",
    email: "support@campusflow.edu",
  },
];

export default function UniversityOffices() {
  return (
    <section id="university-offices">
      <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Get in Touch
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            University Offices
          </h2>

          <p className="mt-4 text-muted-foreground">
            Contact the office that best matches your question or
            request.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {offices.map((office) => {
            const Icon = office.icon;

            return (
              <div
                key={office.name}
                className="rounded-2xl border bg-background p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      {office.name}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {office.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-2 border-t pt-5 text-sm">
                  <p>
                    <span className="font-medium">Phone:</span>{" "}
                    <span className="text-muted-foreground">
                      {office.phone}
                    </span>
                  </p>

                  <p className="break-all">
                    <span className="font-medium">Email:</span>{" "}
                    <span className="text-muted-foreground">
                      {office.email}
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}