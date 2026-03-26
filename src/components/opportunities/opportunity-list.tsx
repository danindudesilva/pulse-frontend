import type { Opportunity } from "@/lib/api/opportunities";
import { OpportunityListItem } from "@/components/opportunities/opportunity-list-item";

type OpportunityListProps = {
  opportunities: Opportunity[];
};

export function OpportunityList({ opportunities }: OpportunityListProps) {
  return (
    <div className="grid gap-5 space-y-3">
      {opportunities.map((opportunity) => (
        <OpportunityListItem key={opportunity.id} opportunity={opportunity} />
      ))}
    </div>
  );
}
