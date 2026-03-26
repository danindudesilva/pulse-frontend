export function formatCurrency(
  valueAmount: string | null,
  currency: string | null
): string {
  if (!valueAmount) {
    return "—";
  }

  const numericValue = Number(valueAmount);

  if (Number.isNaN(numericValue)) {
    return valueAmount;
  }

  if (!currency) {
    return numericValue.toFixed(2);
  }

  try {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency,
    }).format(numericValue);
  } catch {
    return `${numericValue.toFixed(2)} ${currency}`;
  }
}

export function formatDateTime(value: string | null): string {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}
