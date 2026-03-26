"use client";

import { useActionState } from "react";
import { OpportunityForm } from "@/components/opportunities/opportunity-form";
import {
  createOpportunityAction,
  type CreateOpportunityActionState,
} from "@/app/(app)/app/opportunities/new/actions";

const initialState: CreateOpportunityActionState = {};

export function CreateOpportunityFormShell() {
  const [state, formAction, isPending] = useActionState(
    createOpportunityAction,
    initialState,
  );

  return (
    <OpportunityForm action={formAction} state={state} isPending={isPending} />
  );
}
