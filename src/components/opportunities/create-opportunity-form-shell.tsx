"use client";

import { useActionState } from "react";
import { OpportunityForm } from "@/components/opportunities/opportunity-form";
import {
  createOpportunityAction,
  type CreateOpportunityActionState,
} from "@/app/(app)/app/opportunities/new/actions";

const initialState: CreateOpportunityActionState = {};

export function CreateOpportunityFormShell() {
  const [state, formAction] = useActionState(
    createOpportunityAction,
    initialState,
  );

  return <OpportunityForm onSubmitAction={formAction} state={state} />;
}
