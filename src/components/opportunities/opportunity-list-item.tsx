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
            <div className="space-x-3 space-y-5">
              <OpportunityStatusBadge status={opportunity.status} />
            </div>
          </div>

          <div className="mt-4 space-y-2 text-sm text-neutral-600 py-1">
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

          <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-xl bg-neutral-50 px-3">
              <p className="text-sm leading-5 text-neutral-700">
                <span className="font-medium text-neutral-600">Quote sent:</span>{" "}
                {opportunity.quoteSentAt
                  ? formatDateTime(opportunity.quoteSentAt)
                  : "Not sent yet"}
              </p>
            </div>

            <div className="rounded-xl bg-neutral-50 px-3">
              <p className="text-sm leading-5 text-neutral-700">
                <span className="font-medium text-neutral-600">Next follow-up:</span>{" "}
                {opportunity.nextFollowUpAt
                  ? formatDateTime(opportunity.nextFollowUpAt)
                  : "—"}
              </p>
            </div>

            <div className="rounded-xl bg-neutral-50 px-3">
              <p className="text-sm leading-5 text-neutral-700">
                <span className="font-medium text-neutral-600">Last updated:</span>{" "}
                {formatDateTime(opportunity.updatedAt)}
              </p>
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
