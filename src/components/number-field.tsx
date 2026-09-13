import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { parseDecimal } from "@/lib/format";
import { cn } from "@/lib/utils";

export function NumberField({
  value,
  onCommit,
  decimals = 2,
  className,
  placeholder = "0",
  disabled,
  blankZero = false,
  "aria-label": ariaLabel,
}: {
  value: number;
  onCommit: (n: number) => void;
  decimals?: number;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  blankZero?: boolean;
  "aria-label"?: string;
}) {
  const [text, setText] = useState(() => formatShown(value, decimals, blankZero));

  useEffect(() => {
    setText(formatShown(value, decimals, blankZero));
  }, [value, decimals, blankZero]);

  return (
    <Input
      inputMode="decimal"
      autoComplete="off"
      aria-label={ariaLabel}
      disabled={disabled}
      value={text}
      placeholder={placeholder}
      onChange={(e) => setText(e.target.value)}
      onBlur={() => {
        const parsed = parseDecimal(text);
        if (parsed === null) {
          setText(formatShown(value, decimals, blankZero));
          return;
        }
        onCommit(parsed);
        setText(formatShown(parsed, decimals, blankZero));
      }}
      className={cn("tabular text-right font-medium", className)}
    />
  );
}

function formatShown(n: number, decimals: number, blankZero: boolean): string {
  if (!Number.isFinite(n)) return "";
  if (blankZero && n === 0) return "";
  return n.toLocaleString("en-IN", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: Number.isInteger(n) ? 0 : Math.min(2, decimals),
  });
}
