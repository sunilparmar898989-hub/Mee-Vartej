import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  tone = "muted",
  children,
}: {
  className?: string;
  tone?: "muted" | "forest" | "credit" | "danger";
  children: ReactNode;
}) {
  const tones = {
    muted: "bg-bg-recessed text-muted",
    forest: "bg-forest-soft text-forest-2",
    credit: "bg-credit-soft text-credit",
    danger: "bg-danger-soft text-danger",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
