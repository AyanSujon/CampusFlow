



"use client";

import { ArrowLeft, Home, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function AccessDenied() {
  return (
    <main
      className="flex min-h-[70vh] items-center justify-center px-4 py-12"
      aria-labelledby="access-denied-title"
    >
      <div className="w-full max-w-md text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-red-500/10 ring-8 ring-red-500/5">
          <ShieldAlert
            className="size-10 text-red-500"
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </div>

        {/* Content */}
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Access Denied
          </p>

          <h1
            id="access-denied-title"
            className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            You do not have access to this page.
          </h1>

          <p className="mx-auto max-w-sm text-sm leading-6 text-muted-foreground sm:text-base">
            You don&apos;t have the required permissions to view this page.
            Please return to the homepage or go back to the previous page.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:w-auto"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Go Back
          </button>

          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:w-auto"
          >
            <Home className="size-4" aria-hidden="true" />
            Go to Home
          </Link>
        </div>

        {/* Brand */}
        <div className="mt-10 border-t border-border pt-5">
          <p className="text-xs text-muted-foreground">
            CampusFlow • University Management System
          </p>
        </div>
      </div>
    </main>
  );
}

