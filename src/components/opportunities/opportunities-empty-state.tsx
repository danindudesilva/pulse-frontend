import Link from "next/link";
import { Button } from "@/components/ui/button";

type OpportunitiesEmptyStateProps = {
  hasFilters: boolean;
};

export function OpportunitiesEmptyState({
  hasFilters,
}: OpportunitiesEmptyStateProps) {
  if (hasFilters) {
    return (
      <div className="rounded-2xl border border-dashed border-neutral-200 px-6 py-14 text-center">
        <p className="text-sm font-medium text-neutral-900">
          No opportunities match these filters
        </p>
        <p className="mt-2 text-sm text-neutral-600">
          Try clearing filters to see everything in your pipeline.
        </p>

        <div className="mt-6">
          <Button asChild variant="secondary" size="md">
            <Link href="/app/opportunities">View all opportunities</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-dashed border-neutral-200 px-6 py-14 text-center">
      <p className="text-sm font-medium text-neutral-900">
        No opportunities yet
      </p>
      <p className="mt-2 text-sm text-neutral-600">
        Once you add your first opportunity, it will appear here.
      </p>

      <div className="mt-6">
        <Button asChild variant="primary" size="md">
          <Link href="/app/opportunities/new">New opportunity</Link>
        </Button>
      </div>
    </div>
  );
}
