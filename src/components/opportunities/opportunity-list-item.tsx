import type { Opportunity } from "@/lib/api/opportunities";
import { formatCurrency, formatDateTime } from "@/lib/format";
import { OpportunityStatusBadge } from "@/components/opportunities/opportunity-status-badge";

type OpportunityListItemProps = {
  opportunity: Opportunity;
};

export function OpportunityListItem({
  opportunity,
}: OpportunityListItemProps) {
  return (
    <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-base font-semibold tracking-tight text-neutral-950">
              {opportunity.title}
            </h3>
            <OpportunityStatusBadge status={opportunity.status} />
          </div>

          <div className="mt-4 space-y-2 text-sm text-neutral-600">
            <div>
              <span className="font-medium text-neutral-700">Company:</span>{" "}
              {opportunity.companyName ?? "No company"}
            </div>

            {(opportunity.contactName || opportunity.contactEmail) && (
              <div>
                <span className="font-medium text-neutral-700">Contact:</span>{" "}
                {opportunity.contactName ?? "Unknown"}
                {opportunity.contactEmail ? ` · ${opportunity.contactEmail}` : ""}
              </div>
            )}
          </div>

          <div className="mt-5 grid gap-3 text-sm text-neutral-500 sm:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-xl bg-neutral-50 px-3 py-2">
              <span className="block text-xs font-medium uppercase tracking-wide text-neutral-500">
                Quote sent
              </span>
              <span className="mt-1 block text-sm text-neutral-700">
                {opportunity.quoteSentAt
                  ? formatDateTime(opportunity.quoteSentAt)
                  : "Not sent yet"}
              </span>
            </div>

            <div className="rounded-xl bg-neutral-50 px-3 py-2">
              <span className="block text-xs font-medium uppercase tracking-wide text-neutral-500">
                Next follow-up
              </span>
              <span className="mt-1 block text-sm text-neutral-700">
                {opportunity.nextFollowUpAt
                  ? formatDateTime(opportunity.nextFollowUpAt)
                  : "—"}
              </span>
            </div>

            <div className="rounded-xl bg-neutral-50 px-3 py-2">
              <span className="block text-xs font-medium uppercase tracking-wide text-neutral-500">
                Last updated
              </span>
              <span className="mt-1 block text-sm text-neutral-700">
                {formatDateTime(opportunity.updatedAt)}
              </span>
            </div>
          </div>
        </div>

        <div className="shrink-0 xl:pl-6">
          <p className="text-left text-lg font-semibold tracking-tight text-neutral-950 xl:text-right">
            {formatCurrency(opportunity.valueAmount, opportunity.currency)}
          </p>
        </div>
      </div>
    </article>
  );
}
