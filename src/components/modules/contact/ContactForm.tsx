"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const inquiryTypes = [
  "Prospective Student",
  "Current Student",
  "Parent / Guardian",
  "Faculty Member",
  "Staff Member",
  "Visitor",
];

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setIsSubmitting(true);

    try {
      // Connect your API here later.
      await new Promise((resolve) =>
        setTimeout(resolve, 1000)
      );

      event.currentTarget.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact-form"
      className="bg-muted/30"
    >
      <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          {/* Information */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Send a Message
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              How Can We Help?
            </h2>

            <p className="mt-5 leading-7 text-muted-foreground">
              Whether you are a prospective student, current
              student, parent, faculty member, or visitor, our
              university team is ready to assist you.
            </p>

            <div className="mt-8 rounded-2xl border bg-background p-6">
              <h3 className="font-semibold">
                Before you contact us
              </h3>

              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>• Choose the office related to your inquiry.</li>
                <li>• Provide accurate contact information.</li>
                <li>• Include enough details about your question.</li>
                <li>• Avoid sharing sensitive account information.</li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-2xl border bg-background p-6 shadow-sm sm:p-8">
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium"
                  >
                    Full Name
                  </label>

                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium"
                  >
                    Email Address
                  </label>

                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium"
                  >
                    Phone Number
                  </label>

                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+880 1XXXXXXXXX"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="type"
                    className="text-sm font-medium"
                  >
                    I am a
                  </label>

                  <select
                    id="type"
                    name="type"
                    required
                    defaultValue=""
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="" disabled>
                      Select one
                    </option>

                    {inquiryTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="text-sm font-medium"
                >
                  Subject
                </label>

                <Input
                  id="subject"
                  name="subject"
                  placeholder="What can we help you with?"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium"
                >
                  Message
                </label>

                <Textarea
                  id="message"
                  name="message"
                  placeholder="Write your message here..."
                  className="min-h-36 resize-none"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}