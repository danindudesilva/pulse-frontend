import type {
  OpportunityListView,
  OpportunityStatus,
} from "@/lib/api/opportunities";

export const opportunityViewOptions: Array<{
  value: OpportunityListView;
  label: string;
}> = [
  { value: "all", label: "All" },
  { value: "due", label: "Due" },
  { value: "upcoming", label: "Upcoming" },
];

export const opportunityStatusOptions: Array<{
  value: OpportunityStatus;
  label: string;
}> = [
  { value: "draft", label: "Draft" },
  { value: "sent", label: "Sent" },
  { value: "replied", label: "Replied" },
  { value: "won", label: "Won" },
  { value: "lost", label: "Lost" },
  { value: "paused", label: "Paused" },
];

export const opportunityStatusLabels: Record<OpportunityStatus, string> = {
  draft: "Draft",
  sent: "Sent",
  replied: "Replied",
  won: "Won",
  lost: "Lost",
  paused: "Paused",
};
