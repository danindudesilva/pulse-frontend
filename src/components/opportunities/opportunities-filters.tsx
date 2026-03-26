import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  opportunityStatusOptions,
  opportunityViewOptions,
} from "@/config/opportunities";
import type {
  OpportunityListView,
  OpportunityStatus,
} from "@/lib/api/opportunities";
import { buildOpportunitiesHref } from "@/lib/opportunities/query";

type OpportunitiesFiltersProps = {
  activeView: OpportunityListView;
  activeStatus?: OpportunityStatus;
};

export function OpportunitiesFilters({
  activeView,
  activeStatus,
}: OpportunitiesFiltersProps) {
  return (
    <div className="w-full space-y-3">
      <div className="-mx-1 overflow-x-auto pb-1">
        <div className="flex min-w-max gap-2 px-1 py-1">
          {opportunityViewOptions.map((option) => {
            const isActive = option.value === activeView;

            return (
              <Link
                key={option.value}
                href={buildOpportunitiesHref({
                  view: option.value,
                  status: activeStatus,
                })}
                className={cn(
                  buttonVariants({
                    variant: isActive ? "primary" : "secondary",
                    size: "sm",
                  }),
                  "whitespace-nowrap",
                )}
              >
                {option.label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="-mx-1 overflow-x-auto pb-1 py-2">
        <div className="flex min-w-max gap-2 px-1">
          <Link
            href={buildOpportunitiesHref({
              view: activeView,
            })}
            className={cn(
              buttonVariants({
                variant: activeStatus ? "secondary" : "primary",
                size: "sm",
              }),
              "whitespace-nowrap",
            )}
          >
            All statuses
          </Link>

          {opportunityStatusOptions.map((option) => {
            const isActive = option.value === activeStatus;

            return (
              <Link
                key={option.value}
                href={buildOpportunitiesHref({
                  view: activeView,
                  status: option.value,
                })}
                className={cn(
                  buttonVariants({
                    variant: isActive ? "primary" : "secondary",
                    size: "sm",
                  }),
                  "whitespace-nowrap",
                )}
              >
                {option.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
