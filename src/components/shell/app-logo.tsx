import Link from "next/link";

export function AppLogo() {
  return (
    <Link
      href="/app"
      className="inline-flex items-center gap-3 text-sm font-semibold tracking-tight text-neutral-950"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-neutral-950 text-sm font-semibold text-white shadow-sm">
        P
      </span>
      <span>Pulse</span>
    </Link>
  );
}