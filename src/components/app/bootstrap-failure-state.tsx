"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";

type BootstrapFailureStateProps = {
  message?: string;
};

export function BootstrapFailureState({
  message = "We couldn’t initialize your account in Pulse. Please try again or sign out and back in.",
}: BootstrapFailureStateProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleRetry() {
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-6 py-12">
      <div className="w-full max-w-xl rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-neutral-500">
          Pulse
        </p>

        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-950">
          App initialization failed
        </h1>

        <p className="mt-3 text-sm leading-6 text-neutral-600">{message}</p>

        <div className="mt-6 flex items-center gap-3">
          <Button asChild variant="secondary" size="md">
            <Link href="/">Back to home</Link>
          </Button>

          <Button
            onClick={handleRetry}
            variant="primary"
            size="md"
            disabled={isPending}
          >
            {isPending ? "Retrying..." : "Try again"}
          </Button>
        </div>
      </div>
    </main>
  );
}
