"use client";

import { Button } from "@/components/ui/button";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error("Dashboard route error", error);

  return (
    <main className="flex-1 px-6 py-6">
      <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-neutral-500">
          Pulse
        </p>

        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-950">
          We couldn’t load your dashboard
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-600">
          Something went wrong while loading your summary data. Please try again.
        </p>

        <div className="mt-6">
          <Button onClick={reset} variant="primary" size="md">
            Try again
          </Button>
        </div>
      </section>
    </main>
  );
}
