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
    <div className="w-full max-w-full space-y-3">
      <div className="flex flex-wrap gap-x-2 gap-y-2">
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
              )}
            >
              {option.label}
            </Link>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-x-2 gap-y-2 pt-1">
        <Link
          href={buildOpportunitiesHref({
            view: activeView,
          })}
          className={cn(
            buttonVariants({
              variant: activeStatus ? "secondary" : "primary",
              size: "sm",
            }),
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
              )}
            >
              {option.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
