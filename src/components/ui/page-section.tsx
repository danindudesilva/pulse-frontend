import { cn } from "@/lib/utils";

type PageSectionProps = {
  className?: string;
  children: React.ReactNode;
};

export function PageSection({ className, children }: PageSectionProps) {
  return (
    <section
      className={cn(
        "rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-sm",
        className,
      )}
    >
      {children}
    </section>
  );
}
