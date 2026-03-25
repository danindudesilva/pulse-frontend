import Link from "next/link";

export default function MarketingPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8">
        <header className="flex items-center justify-between py-4">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            QuoteFollow
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/sign-in"
              className="text-sm font-medium text-neutral-600 transition hover:text-neutral-950"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="rounded-full bg-neutral-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800"
            >
              Start free
            </Link>
          </div>
        </header>

        <section className="flex flex-1 items-center py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-medium tracking-[0.16em] text-neutral-500 uppercase">
              QuoteFollow
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
              <Link
                href="/sign-up"
                className="rounded-full bg-neutral-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
              >
                Start free
              </Link>
              <Link
                href="/sign-in"
                className="rounded-full border border-neutral-200 bg-white px-5 py-3 text-sm font-medium text-neutral-900 transition hover:bg-neutral-50"
              >
                Sign in
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
