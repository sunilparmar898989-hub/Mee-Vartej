import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDateShort, formatInr, formatQty } from "@/lib/format";
import { useHisab } from "@/lib/store";

export const Route = createFileRoute("/parties/$id")({ component: PartyLedger });

function PartyLedger() {
  const { id } = Route.useParams();
  const party = useHisab((s) => s.parties.find((p) => p.id === id));
  const sales = useHisab((s) => s.sales.filter((s) => s.partyId === id));
  const receipts = useHisab((s) => s.receipts.filter((r) => r.partyId === id));
  const renameParty = useHisab((s) => s.renameParty);

  if (!party) {
    return (
      <div className="py-16 text-center">
        <p className="text-muted">પાર્ટી મળી નહીં.</p>
        <Button asChild variant="secondary" className="mt-4">
          <Link to="/parties">પાછા</Link>
        </Button>
      </div>
    );
  }

  const sold = sales.reduce((s, x) => s + x.amount, 0);
  const paid = receipts.reduce((s, x) => s + x.amount, 0);
  const qty = sales.reduce((s, x) => s + x.qty, 0);
  const balance = sold - paid;

  const lines = [
    ...sales.map((s) => ({
      id: s.id,
      date: s.date,
      kind: "udhar" as const,
      label: `વેચાણ · ${formatQty(s.qty)} L × ${s.rate}${s.vehicle ? ` · ${s.vehicle}` : ""}`,
      debit: s.amount,
      credit: 0,
    })),
    ...receipts.map((r) => ({
      id: r.id,
      date: r.date,
      kind: "jama" as const,
      label: r.particular,
      debit: 0,
      credit: r.amount,
    })),
  ].sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));

  return (
    <div className="space-y-4">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link to="/parties">
          <ArrowLeft className="size-4" />
          બધી પાર્ટી
        </Link>
      </Button>

      <div className="ledger-page rounded-[var(--radius-xl)] p-4 sm:p-5">
        <Input
          defaultValue={party.name}
          onBlur={(e) => {
            const v = e.target.value.trim();
            if (v && v !== party.name) renameParty(party.id, v);
          }}
          className="font-display text-lg h-12 border-dashed"
          aria-label="પાર્ટીનું નામ"
        />
        <div className="grid grid-cols-3 gap-2 mt-4">
          <Mini label="વેચાણ" value={formatInr(sold)} />
          <Mini label="જમા" value={formatInr(paid)} />
          <Mini label="બાકી" value={formatInr(balance)} accent={balance > 0} />
        </div>
        <p className="text-xs text-muted mt-3">કુલ {formatQty(qty)} લિટર ડીઝલ</p>
      </div>

      <div className="ledger-page rounded-[var(--radius-xl)] overflow-hidden">
        <div className="grid grid-cols-[5.5rem_1fr_5.5rem_5.5rem] gap-1 px-3 py-2 text-[11px] text-muted bg-bg-recessed/80">
          <span>તારીખ</span>
          <span>વિગત</span>
          <span className="text-right">ઉધાર</span>
          <span className="text-right">જમા</span>
        </div>
        {lines.length === 0 && (
          <p className="px-3 py-8 text-center text-sm text-muted">એન્ટ્રી નથી.</p>
        )}
        {lines.map((ln) => (
          <div
            key={ln.id}
            className="grid grid-cols-[5.5rem_1fr_5.5rem_5.5rem] gap-1 px-3 py-2.5 border-t border-line/70 text-sm"
          >
            <span className="tabular text-muted text-xs self-center">
              {formatDateShort(ln.date)}
            </span>
            <span className="truncate self-center">{ln.label}</span>
            <span className="tabular text-right text-credit">
              {ln.debit ? formatInr(ln.debit, false) : ""}
            </span>
            <span className="tabular text-right text-forest">
              {ln.credit ? formatInr(ln.credit, false) : ""}
            </span>
          </div>
        ))}
        <div className="grid grid-cols-[5.5rem_1fr_5.5rem_5.5rem] gap-1 px-3 py-3 border-t-2 border-line-strong bg-surface-2 text-sm font-medium">
          <span />
          <span>બાકી</span>
          <span className="tabular text-right col-span-2 text-credit font-display text-base">
            {formatInr(balance)}
          </span>
        </div>
      </div>

      {balance > 0 && <Badge tone="credit">બાકી ઉધાર</Badge>}
      {balance <= 0 && <Badge tone="forest">ખાતું સાફ / જમા</Badge>}
    </div>
  );
}

function Mini({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-[var(--radius-md)] bg-bg-recessed/70 px-2 py-2">
      <div className="text-[11px] text-muted">{label}</div>
      <div className={`tabular font-medium ${accent ? "text-credit" : "text-ink"}`}>
        {value}
      </div>
    </div>
  );
}
