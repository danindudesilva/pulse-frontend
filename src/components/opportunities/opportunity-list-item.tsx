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
    <article className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-base font-semibold tracking-tight text-neutral-950">
              {opportunity.title}
            </h3>
            <OpportunityStatusBadge status={opportunity.status} />
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-600">
            <span>{opportunity.companyName ?? "No company"}</span>
            {opportunity.contactName ? (
              <span>Contact: {opportunity.contactName}</span>
            ) : null}
            {opportunity.contactEmail ? (
              <span>{opportunity.contactEmail}</span>
            ) : null}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-500">
            {opportunity.quoteSentAt ? (
              <span>Quote sent: {formatDateTime(opportunity.quoteSentAt)}</span>
            ) : (
              <span>Quote not sent yet</span>
            )}

            {opportunity.nextFollowUpAt ? (
              <span>
                Next follow-up: {formatDateTime(opportunity.nextFollowUpAt)}
              </span>
            ) : null}

            <span>Updated: {formatDateTime(opportunity.updatedAt)}</span>
          </div>
        </div>

        <div className="shrink-0">
          <p className="text-right text-lg font-semibold tracking-tight text-neutral-950">
            {formatCurrency(opportunity.valueAmount, opportunity.currency)}
          </p>
        </div>
      </div>
    </article>
  );
}
