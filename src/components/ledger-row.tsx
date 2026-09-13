import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function LedgerRow({
  label,
  value,
  hint,
  tone = "ink",
  strong = false,
  rule = false,
}: {
  label: ReactNode;
  value: ReactNode;
  hint?: string;
  tone?: "ink" | "forest" | "credit" | "danger" | "muted";
  strong?: boolean;
  rule?: boolean;
}) {
  const tones = {
    ink: "text-ink",
    forest: "text-forest",
    credit: "text-credit",
    danger: "text-danger",
    muted: "text-muted",
  };
  return (
    <div
      className={cn(
        "flex items-baseline justify-between gap-3 py-2 min-h-8",
        rule && "border-t border-line-strong mt-1 pt-2",
      )}
      title={hint}
    >
      <span className={cn("text-sm", strong ? "font-medium text-ink" : "text-muted")}>
        {label}
      </span>
      <span
        className={cn(
          "tabular text-right font-medium tracking-tight",
          strong ? "text-base sm:text-lg" : "text-sm sm:text-base",
          tones[tone],
        )}
      >
        {value}
      </span>
    </div>
  );
}
