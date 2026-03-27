import Link from "next/link";
import { Button } from "@/components/ui/button";
import type {
  OpportunityListView,
  OpportunityStatus,
} from "@/lib/api/opportunities";
import { buildOpportunitiesHref } from "@/lib/opportunities/query";

type OpportunitiesPaginationControlsProps = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  activeView: OpportunityListView;
  activeStatus?: OpportunityStatus;
};

function getRangeStart(page: number, pageSize: number, totalItems: number) {
  if (totalItems === 0) {
    return 0;
  }

  return (page - 1) * pageSize + 1;
}

function getRangeEnd(page: number, pageSize: number, totalItems: number) {
  return Math.min(page * pageSize, totalItems);
}

export function OpportunitiesPaginationControls({
  page,
  pageSize,
  totalItems,
  totalPages,
  activeView,
  activeStatus,
}: OpportunitiesPaginationControlsProps) {
  const hasPreviousPage = page > 1;
  const hasNextPage = page < totalPages;

  const previousHref = buildOpportunitiesHref({
    page: page - 1,
    pageSize,
    view: activeView,
    status: activeStatus,
  });

  const nextHref = buildOpportunitiesHref({
    page: page + 1,
    pageSize,
    view: activeView,
    status: activeStatus,
  });

  const rangeStart = getRangeStart(page, pageSize, totalItems);
  const rangeEnd = getRangeEnd(page, pageSize, totalItems);

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white px-4 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="text-sm text-neutral-600">
        Showing <span className="font-medium text-neutral-900">{rangeStart}</span>
        {" - "}
        <span className="font-medium text-neutral-900">{rangeEnd}</span>
        {" of "}
        <span className="font-medium text-neutral-900">{totalItems}</span>
        {" opportunities"}
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-neutral-600">
          Page <span className="font-medium text-neutral-900">{page}</span> of{" "}
          <span className="font-medium text-neutral-900">{totalPages}</span>
        </span>

        <div className="flex items-center gap-2">
          {hasPreviousPage ? (
            <Button asChild variant="secondary" size="sm">
              <Link href={previousHref}>Previous</Link>
            </Button>
          ) : (
            <Button variant="secondary" size="sm" disabled>
              Previous
            </Button>
          )}

          {hasNextPage ? (
            <Button asChild variant="secondary" size="sm">
              <Link href={nextHref}>Next</Link>
            </Button>
          ) : (
            <Button variant="secondary" size="sm" disabled>
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
