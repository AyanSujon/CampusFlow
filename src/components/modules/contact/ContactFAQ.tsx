"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How can I contact the Admissions Office?",
    answer:
      "You can contact the Admissions Office by phone or email during regular university office hours. The office can assist with applications, admission requirements, programs, and enrollment.",
  },
  {
    question: "Where can I get help with my student account?",
    answer:
      "For login problems, account access, or technical issues with university systems, please contact the IT Support Office.",
  },
  {
    question: "How can I contact the Registrar's Office?",
    answer:
      "The Registrar's Office handles academic records, registration, transcripts, certificates, and other official academic documentation.",
  },
  {
    question: "Where can I ask about tuition and payments?",
    answer:
      "For tuition fees, invoices, payment records, and financial questions, contact the Finance Office.",
  },
  {
    question: "Can prospective students visit the campus?",
    answer:
      "Yes. Prospective students and their families are welcome to visit the campus. Please contact the university beforehand for visiting information.",
  },
];

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-muted/30">
      <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Need Help?
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Frequently Asked Questions
            </h2>

            <p className="mt-4 text-muted-foreground">
              Find quick answers to common questions about
              university services.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={faq.question}
                  className="overflow-hidden rounded-xl border bg-background"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenIndex(isOpen ? null : index)
                    }
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-medium">
                      {faq.question}
                    </span>

                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="border-t px-5 py-4 text-sm leading-7 text-muted-foreground">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}


