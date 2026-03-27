import { UserButton } from "@clerk/nextjs";

type AppHeaderProps = {
  title: string;
  description?: string;
};

export function AppHeader({ title, description }: AppHeaderProps) {
  return (
    <header className="flex min-h-28 items-start justify-between gap-4 border-b border-[var(--border)] bg-[var(--surface)] px-6 py-3">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-950">
          {title}
        </h1>
        {description ? (
          <p className="mt-1 text-sm leading-6 text-neutral-600">
            {description}
          </p>
        ) : null}
      </div>

      <div className="rounded-full border border-neutral-200 bg-white p-1 shadow-sm">
        <UserButton />
      </div>
    </header>
  );
}
