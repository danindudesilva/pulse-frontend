"use client";

import { useEffect, useMemo, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  createOpportunityFormSchema,
  type CreateOpportunityFormInput,
} from "@/lib/opportunities/create-schema";
import type { CreateOpportunityActionState } from "@/app/(app)/app/opportunities/new/actions";

type OpportunityFormProps = {
  onSubmitAction: (formData: FormData) => void;
  state?: CreateOpportunityActionState;
};

const defaultValues: CreateOpportunityFormInput = {
  title: "",
  companyName: "",
  contactName: "",
  contactEmail: "",
  valueAmount: "",
  currency: "GBP",
  notes: "",
  status: "draft",
  quoteSentAt: undefined,
};

export function OpportunityForm({
  onSubmitAction,
  state,
}: OpportunityFormProps) {
  const [isPending, startTransition] = useTransition();

  const serverFieldErrors = state?.fieldErrors ?? {};

  const {
    register,
    watch,
    reset,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitted },
  } = useForm<CreateOpportunityFormInput>({
    resolver: zodResolver(createOpportunityFormSchema),
    defaultValues,
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const status = watch("status");

  useEffect(() => {
    if (state?.values) {
      reset({
        ...defaultValues,
        ...state.values,
      });
    }
  }, [reset, state?.values]);

  useEffect(() => {
    if (status !== "sent") {
      setValue("quoteSentAt", undefined, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [setValue, status]);

  const submit = handleSubmit((values) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value === undefined) {
        return;
      }

      formData.set(key, value);
    });

    startTransition(() => {
      onSubmitAction(formData);
    });
  });

  const hasClientErrors = Object.keys(errors).length > 0;
  const showTopValidationMessage = isSubmitted && hasClientErrors;

  return (
    <form onSubmit={submit} noValidate className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="space-y-2 xl:col-span-2">
          <label htmlFor="title" className="text-sm font-medium text-neutral-900">
            Title
          </label>
          <input
            id="title"
            {...register("title")}
            aria-invalid={hasFieldError(errors.title?.message, serverFieldErrors.title?.[0])}
            className={getFieldClassName(
              hasFieldError(errors.title?.message, serverFieldErrors.title?.[0]),
            )}
            placeholder="Website redesign proposal"
          />
          <FieldError
            message={errors.title?.message}
            serverError={serverFieldErrors.title?.[0]}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="companyName" className="text-sm font-medium text-neutral-900">
            Company
          </label>
          <input
            id="companyName"
            {...register("companyName")}
            aria-invalid={hasFieldError(
              errors.companyName?.message,
              serverFieldErrors.companyName?.[0],
            )}
            className={getFieldClassName(
              hasFieldError(errors.companyName?.message, serverFieldErrors.companyName?.[0]),
            )}
            placeholder="Acme Studio"
          />
          <FieldError
            message={errors.companyName?.message}
            serverError={serverFieldErrors.companyName?.[0]}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="contactName" className="text-sm font-medium text-neutral-900">
            Contact name
          </label>
          <input
            id="contactName"
            {...register("contactName")}
            aria-invalid={hasFieldError(
              errors.contactName?.message,
              serverFieldErrors.contactName?.[0],
            )}
            className={getFieldClassName(
              hasFieldError(errors.contactName?.message, serverFieldErrors.contactName?.[0]),
            )}
            placeholder="Jane Smith"
          />
          <FieldError
            message={errors.contactName?.message}
            serverError={serverFieldErrors.contactName?.[0]}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="contactEmail" className="text-sm font-medium text-neutral-900">
            Contact email
          </label>
          <input
            id="contactEmail"
            type="email"
            {...register("contactEmail")}
            aria-invalid={hasFieldError(
              errors.contactEmail?.message,
              serverFieldErrors.contactEmail?.[0],
            )}
            className={getFieldClassName(
              hasFieldError(errors.contactEmail?.message, serverFieldErrors.contactEmail?.[0]),
            )}
            placeholder="jane@acme.com"
          />
          <FieldError
            message={errors.contactEmail?.message}
            serverError={serverFieldErrors.contactEmail?.[0]}
          />
        </div>

        <div className="grid gap-6 xl:col-span-2 xl:grid-cols-[1fr_10rem]">
          <div className="space-y-2">
            <label htmlFor="valueAmount" className="text-sm font-medium text-neutral-900">
              Value
            </label>
            <input
              id="valueAmount"
              inputMode="decimal"
              {...register("valueAmount")}
              aria-invalid={hasFieldError(
                errors.valueAmount?.message,
                serverFieldErrors.valueAmount?.[0],
              )}
              className={getFieldClassName(
                hasFieldError(errors.valueAmount?.message, serverFieldErrors.valueAmount?.[0]),
              )}
              placeholder="1500.00"
            />
            <FieldError
              message={errors.valueAmount?.message}
              serverError={serverFieldErrors.valueAmount?.[0]}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="currency" className="text-sm font-medium text-neutral-900">
              Currency
            </label>
            <select
              id="currency"
              {...register("currency")}
              aria-invalid={hasFieldError(
                errors.currency?.message,
                serverFieldErrors.currency?.[0],
              )}
              className={getFieldClassName(
                hasFieldError(errors.currency?.message, serverFieldErrors.currency?.[0]),
              )}
            >
              <option value="">Select</option>
              <option value="GBP">GBP</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
            <FieldError
              message={errors.currency?.message}
              serverError={serverFieldErrors.currency?.[0]}
            />
          </div>
        </div>

        <div className="space-y-2 xl:col-span-2">
          <label htmlFor="status" className="text-sm font-medium text-neutral-900">
            Status
          </label>
          <select
            id="status"
            {...register("status")}
            aria-invalid={hasFieldError(errors.status?.message, serverFieldErrors.status?.[0])}
            className={getFieldClassName(
              hasFieldError(errors.status?.message, serverFieldErrors.status?.[0]),
            )}
          >
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
          </select>
          <FieldError
            message={errors.status?.message}
            serverError={serverFieldErrors.status?.[0]}
          />
        </div>

        {status === "sent" ? (
          <div className="space-y-2 xl:col-span-2">
            <label htmlFor="quoteSentAt" className="text-sm font-medium text-neutral-900">
              Quote sent date
            </label>
            <input
              id="quoteSentAt"
              type="date"
              max={new Date().toISOString().split("T")[0]}
              {...register("quoteSentAt")}
              aria-invalid={hasFieldError(
                errors.quoteSentAt?.message,
                serverFieldErrors.quoteSentAt?.[0],
              )}
              className={getFieldClassName(
                hasFieldError(errors.quoteSentAt?.message, serverFieldErrors.quoteSentAt?.[0]),
              )}
            />
            <FieldError
              message={errors.quoteSentAt?.message}
              serverError={serverFieldErrors.quoteSentAt?.[0]}
            />
          </div>
        ) : null}

        <div className="space-y-2 xl:col-span-2">
          <label htmlFor="notes" className="text-sm font-medium text-neutral-900">
            Notes <span className="text-neutral-400">(optional)</span>
          </label>
          <textarea
            id="notes"
            {...register("notes")}
            rows={5}
            aria-invalid={hasFieldError(errors.notes?.message, serverFieldErrors.notes?.[0])}
            className={getFieldClassName(
              hasFieldError(errors.notes?.message, serverFieldErrors.notes?.[0]),
            )}
            placeholder="Key details, constraints, or context for this opportunity"
          />
          <FieldError
            message={errors.notes?.message}
            serverError={serverFieldErrors.notes?.[0]}
          />
        </div>
      </div>

      {showTopValidationMessage ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          Please correct the highlighted fields.
        </div>
      ) : null}

      {state?.formError && !showTopValidationMessage ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {state.formError}
        </div>
      ) : null}

      <div className="flex items-center gap-3">
        <Button type="submit" variant="primary" size="md" disabled={isPending}>
          {isPending ? "Creating..." : "Create opportunity"}
        </Button>
      </div>
    </form>
  );
}

function hasFieldError(message?: string, serverError?: string) {
  return Boolean(message || serverError);
}

function getFieldClassName(hasError: boolean) {
  return cn(
    "w-full rounded-2xl border bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition",
    hasError
      ? "border-rose-400 text-neutral-900 focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
      : "border-neutral-200 focus:border-neutral-300",
  );
}

function FieldError({
  message,
  serverError,
}: {
  message?: string;
  serverError?: string;
}) {
  const finalMessage = useMemo(() => message ?? serverError, [message, serverError]);

  if (!finalMessage) {
    return null;
  }

  return <p className="text-sm font-medium text-rose-600">{finalMessage}</p>;
}
