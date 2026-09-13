import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatInr, formatQty } from "@/lib/format";
import { useHisab } from "@/lib/store";

export const Route = createFileRoute("/parties")({ component: PartiesPage });

function PartiesPage() {
  const parties = useHisab((s) => s.parties);
  const sales = useHisab((s) => s.sales);
  const receipts = useHisab((s) => s.receipts);
  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    const list = parties.map((p) => {
      const pSales = sales.filter((s) => s.partyId === p.id);
      const qty = pSales.reduce((sum, s) => sum + s.qty, 0);
      const sold = pSales.reduce((sum, s) => sum + s.amount, 0);
      const paid = receipts
        .filter((r) => r.partyId === p.id)
        .reduce((sum, r) => sum + r.amount, 0);
      return {
        ...p,
        qty,
        sold,
        paid,
        balance: sold - paid,
        trips: pSales.length,
      };
    });
    const filtered = q.trim()
      ? list.filter((p) => p.name.toLowerCase().includes(q.trim().toLowerCase()))
      : list;
    return filtered.sort((a, b) => b.balance - a.balance);
  }, [parties, sales, receipts, q]);

  const totalDue = rows.reduce((s, r) => s + r.balance, 0);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-display text-2xl text-ink">પાર્ટી ખાતું</h2>
        <p className="text-sm text-muted mt-0.5">ડીઝલ ઉધાર − જમા = બાકી</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-faint" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="પાર્ટી શોધો"
          className="pl-9"
        />
      </div>

      <div className="flex items-center justify-between px-1">
        <span className="text-sm text-muted">{rows.length} પાર્ટી</span>
        <Badge tone={totalDue > 0 ? "credit" : "forest"}>
          કુલ બાકી {formatInr(totalDue)}
        </Badge>
      </div>

      <ul className="space-y-2">
        {rows.map((p) => (
          <li key={p.id}>
            <Link
              to="/parties/$id"
              params={{ id: p.id }}
              className="ledger-page rounded-[var(--radius-lg)] px-4 py-3 flex items-center gap-3 hover:bg-surface-2"
            >
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{p.name}</div>
                <div className="text-xs text-muted mt-0.5">
                  {p.trips} વેચાણ · {formatQty(p.qty)} L · જમા {formatInr(p.paid)}
                </div>
              </div>
              <div
                className={`tabular text-right font-display ${
                  p.balance > 0 ? "text-credit" : "text-forest"
                }`}
              >
                {formatInr(p.balance)}
              </div>
            </Link>
          </li>
        ))}
        {rows.length === 0 && (
          <li className="text-center text-sm text-muted py-10">કોઈ પાર્ટી નથી.</li>
        )}
      </ul>
    </div>
  );
}
