
import {
  Clock3,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const contactItems = [
  {
    icon: MapPin,
    title: "University Address",
    description: "CampusFlow University",
    details: "University Avenue, Noakhali, Bangladesh",
  },
  {
    icon: Phone,
    title: "Phone",
    description: "+880 1234-567890",
    details: "+880 9876-543210",
  },
  {
    icon: Mail,
    title: "Email",
    description: "info@campusflow.edu",
    details: "admissions@campusflow.edu",
  },
  {
    icon: Clock3,
    title: "Office Hours",
    description: "Saturday – Thursday",
    details: "9:00 AM – 5:00 PM",
  },
];

export default function ContactInfo() {
  return (
    <section className="bg-muted/30">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {contactItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group rounded-2xl border bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>

                <h2 className="font-semibold text-foreground">
                  {item.title}
                </h2>

                <p className="mt-2 text-sm font-medium text-foreground">
                  {item.description}
                </p>

                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {item.details}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}














