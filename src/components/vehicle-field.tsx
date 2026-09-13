import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { normalizeVehicle } from "@/lib/format";
import { useHisab } from "@/lib/store";
import { cn } from "@/lib/utils";

export function VehicleField({
  value,
  onChange,
  partyId,
}: {
  value: string;
  onChange: (v: string) => void;
  partyId?: string;
}) {
  const sales = useHisab((s) => s.sales);
  const [open, setOpen] = useState(false);

  const suggestions = useMemo(() => {
    const seen = new Set<string>();
    const partyFirst: string[] = [];
    const rest: string[] = [];
    for (let i = sales.length - 1; i >= 0; i--) {
      const row = sales[i]!;
      const v = (row.vehicle ?? "").trim();
      if (!v || seen.has(v)) continue;
      seen.add(v);
      if (partyId && row.partyId === partyId) partyFirst.push(v);
      else rest.push(v);
    }
    const q = value.trim().toUpperCase();
    const all = [...partyFirst, ...rest];
    if (!q) return all.slice(0, 8);
    return all.filter((v) => v.includes(q)).slice(0, 8);
  }, [sales, partyId, value]);

  return (
    <div className="relative">
      <Input
        value={value}
        placeholder="GJ12AB1234"
        aria-label="ગાડી નંબર"
        autoComplete="off"
        autoCapitalize="characters"
        className="uppercase tracking-wide"
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          onChange(normalizeVehicle(e.target.value));
          setOpen(true);
        }}
        onBlur={() => {
          window.setTimeout(() => setOpen(false), 140);
        }}
      />
      {open && suggestions.length > 0 && (
        <ul className="absolute z-30 mt-1 w-full max-h-48 overflow-auto rounded-[var(--radius-md)] border border-line bg-surface-2 shadow-[var(--shadow-float)] py-1">
          {suggestions.map((v) => (
            <li key={v}>
              <button
                type="button"
                className={cn(
                  "w-full text-left px-3 py-2.5 text-sm tabular tracking-wide hover:bg-forest-soft/60",
                  v === value && "bg-forest-soft text-forest-2",
                )}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onChange(v);
                  setOpen(false);
                }}
              >
                {v}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
