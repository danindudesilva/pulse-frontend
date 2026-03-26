import { cn } from "@/lib/utils";
import type { OpportunityStatus } from "@/lib/api/opportunities";
import { opportunityStatusLabels } from "@/config/opportunities";

const statusClasses: Record<OpportunityStatus, string> = {
  draft: "border-neutral-200 bg-neutral-50 text-neutral-700",
  sent: "border-slate-200 bg-slate-50 text-slate-700",
  replied: "border-indigo-200 bg-indigo-50 text-indigo-700",
  won: "border-emerald-200 bg-emerald-50 text-emerald-700",
  lost: "border-rose-200 bg-rose-50 text-rose-700",
  paused: "border-amber-200 bg-amber-50 text-amber-700",
};

type OpportunityStatusBadgeProps = {
  status: OpportunityStatus;
};

export function OpportunityStatusBadge({
  status,
}: OpportunityStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium leading-none",
        statusClasses[status],
      )}
    >
      {opportunityStatusLabels[status]}
    </span>
  );
}
