import Link from "next/link";
import { Show } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function MarketingPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8">
        <header className="flex items-center justify-between py-4">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            Pulse
          </Link>

          <div className="flex items-center gap-3">
            <Show when="signed-out">
              <Link
                href="/sign-in"
                className="text-sm font-medium text-neutral-600 transition hover:text-neutral-950"
              >
                Sign in
              </Link>

              <Button asChild variant="primary" size="sm">
                <Link href="/sign-up">Start free</Link>
              </Button>
            </Show>

            <Show when="signed-in">
              <Button asChild variant="primary" size="sm">
                <Link href="/app">Open app</Link>
              </Button>
            </Show>
          </div>
        </header>

        <section className="flex flex-1 items-center py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-neutral-500">
              Pulse
            </p>

            <h1 className="mt-6 text-5xl font-semibold tracking-tight text-neutral-950 sm:text-6xl">
              Never lose momentum after sending a quote.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
              A focused follow-up system for freelancers and small service
              businesses. Track opportunities, stay on top of follow-ups, and
              keep client work moving without CRM clutter.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <Show when="signed-out">
                <Button asChild variant="primary" size="lg">
                  <Link href="/sign-up">Start free</Link>
                </Button>

                <Button asChild variant="secondary" size="lg">
                  <Link href="/sign-in">Sign in</Link>
                </Button>
              </Show>

              <Show when="signed-in">
                <Button asChild variant="primary" size="lg">
                  <Link href="/app">Open dashboard</Link>
                </Button>
              </Show>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
