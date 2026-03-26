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
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <h3 className="text-base font-semibold tracking-tight text-neutral-950">
              {opportunity.title}
            </h3>
            <OpportunityStatusBadge status={opportunity.status} />
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-600">
            <span>{opportunity.companyName ?? "No company"}</span>
            {opportunity.contactName ? (
              <span>Contact: {opportunity.contactName}</span>
            ) : null}
            {opportunity.contactEmail ? (
              <span>{opportunity.contactEmail}</span>
            ) : null}
          </div>

          <div className="mt-4 grid gap-2 text-sm text-neutral-500 sm:grid-cols-2 xl:grid-cols-3">
            <div>
              <span className="font-medium text-neutral-700">Quote sent:</span>{" "}
              {opportunity.quoteSentAt
                ? formatDateTime(opportunity.quoteSentAt)
                : "Not sent yet"}
            </div>

            <div>
              <span className="font-medium text-neutral-700">Next follow-up:</span>{" "}
              {opportunity.nextFollowUpAt
                ? formatDateTime(opportunity.nextFollowUpAt)
                : "—"}
            </div>

            <div>
              <span className="font-medium text-neutral-700">Updated:</span>{" "}
              {formatDateTime(opportunity.updatedAt)}
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
