export default function OpportunitiesLoading() {
    return (
      <main className="flex-1 px-6 py-6">
        <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
          <div className="space-y-4">
            <div className="h-6 w-48 animate-pulse rounded-full bg-neutral-200" />
            <div className="h-4 w-96 animate-pulse rounded-full bg-neutral-200" />
  
            <div className="mt-6 flex flex-wrap gap-2">
              <div className="h-9 w-20 animate-pulse rounded-full bg-neutral-200" />
              <div className="h-9 w-20 animate-pulse rounded-full bg-neutral-200" />
              <div className="h-9 w-28 animate-pulse rounded-full bg-neutral-200" />
            </div>
  
            <div className="space-y-4 pt-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"
                >
                  <div className="space-y-3">
                    <div className="h-5 w-56 animate-pulse rounded-full bg-neutral-200" />
                    <div className="h-4 w-72 animate-pulse rounded-full bg-neutral-200" />
                    <div className="h-4 w-80 animate-pulse rounded-full bg-neutral-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    );
}
