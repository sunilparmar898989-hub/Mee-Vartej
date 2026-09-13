import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { useHisab } from "@/lib/store";
import { cn } from "@/lib/utils";

export function PartyPicker({
  value,
  onChange,
  allowCreate = true,
}: {
  value: string;
  onChange: (partyId: string) => void;
  allowCreate?: boolean;
}) {
  const parties = useHisab((s) => s.parties);
  const addParty = useHisab((s) => s.addParty);
  const selected = parties.find((p) => p.id === value);
  const [query, setQuery] = useState(selected?.name ?? "");
  const [open, setOpen] = useState(false);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return parties.slice(0, 12);
    return parties.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 12);
  }, [parties, query]);

  const exact = parties.find((p) => p.name === query.trim());

  return (
    <div className="relative">
      <Input
        value={query}
        placeholder="પાર્ટીનું નામ લખો"
        aria-label="પાર્ટી"
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onBlur={() => {
          window.setTimeout(() => setOpen(false), 140);
        }}
      />
      {open && (
        <ul className="absolute z-30 mt-1 w-full max-h-56 overflow-auto rounded-[var(--radius-md)] border border-line bg-surface-2 shadow-[var(--shadow-float)] py-1">
          {matches.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                className={cn(
                  "w-full text-left px-3 py-2.5 text-sm hover:bg-forest-soft/60",
                  p.id === value && "bg-forest-soft text-forest-2",
                )}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onChange(p.id);
                  setQuery(p.name);
                  setOpen(false);
                }}
              >
                {p.name}
              </button>
            </li>
          ))}
          {allowCreate && query.trim() && !exact && (
            <li>
              <button
                type="button"
                className="w-full text-left px-3 py-2.5 text-sm text-forest font-medium hover:bg-forest-soft/60"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  const id = addParty(query.trim());
                  onChange(id);
                  setOpen(false);
                }}
              >
                નવી પાર્ટી: “{query.trim()}”
              </button>
            </li>
          )}
          {matches.length === 0 && !query.trim() && (
            <li className="px-3 py-2.5 text-sm text-muted">પાર્ટી નથી</li>
          )}
        </ul>
      )}
    </div>
  );
}
