export default function ProtectedAppLoading() {
return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-6 py-12">
    <div className="w-full max-w-xl rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-neutral-500">
        Pulse
        </p>

        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-950">
        Preparing your workspace
        </h1>

        <p className="mt-3 text-sm leading-6 text-neutral-600">
        We’re connecting your signed-in session to your Pulse account.
        </p>

        <div className="mt-6 space-y-3">
        <div className="h-4 w-40 animate-pulse rounded-full bg-neutral-200" />
        <div className="h-4 w-full animate-pulse rounded-full bg-neutral-200" />
        <div className="h-4 w-5/6 animate-pulse rounded-full bg-neutral-200" />
        </div>
    </div>
    </main>
    );
}
