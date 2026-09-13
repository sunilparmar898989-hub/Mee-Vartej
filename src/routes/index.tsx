import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { LedgerRow } from "@/components/ledger-row";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatInr, formatInrPaise, formatQty } from "@/lib/format";
import { useDayData } from "@/lib/store";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { totals, receipts, expenses, inwards, sales } = useDayData();

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs tracking-[0.2em] text-rule">॥ લાલ ॥  ॥ શુભ ॥</p>
          <h2 className="font-display text-2xl text-ink mt-1">આજનો હિસાબ</h2>
          <p className="text-xs text-muted mt-0.5">ડીઝલ પંપ · ભાવ ₹{totals.rate}/L</p>
        </div>
        <Button asChild size="sm">
          <Link to="/sales">
            <Plus className="size-4" />
            વેચાણ
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="ledger-page rounded-[var(--radius-xl)] p-4 sm:p-5">
          <h3 className="font-display text-base text-forest-2 mb-1">ડીઝલ ટાંકી · વેચાણ</h3>
          <p className="text-xs text-muted mb-3">A-1 / A-2 મીટર રીડીંગ પ્રમાણે લિટર</p>

          <TankerBlock
            name="A-1"
            opening={totals.a1Opening}
            closing={totals.a1Closing}
            sales={totals.a1Sales}
          />
          <TankerBlock
            name="A-2"
            opening={totals.a2Opening}
            closing={totals.a2Closing}
            sales={totals.a2Sales}
          />

          <LedgerRow
            label="કુલ વેચાણ"
            value={formatQty(totals.grossSales)}
            hint="A-1 + A-2"
            strong
          />
          <LedgerRow
            label="ટેસ્ટીંગ"
            value={formatQty(totals.testing)}
            tone="muted"
          />
          <LedgerRow
            label="કુલ વેચાણ"
            value={formatQty(totals.netSales)}
            hint="કુલ − ટેસ્ટીંગ"
            strong
            rule
          />
          <LedgerRow
            label={`ઉધાર (${totals.saleCount} પાર્ટી)`}
            value={formatQty(totals.udharQty)}
            tone="credit"
          />
          <LedgerRow
            label="રોકડ"
            value={formatQty(totals.cashQty)}
            tone="forest"
          />
          <LedgerRow
            label={`× ${totals.rate} જમા રોકડ વેચાણ`}
            value={formatInr(totals.cashAmt)}
            hint={`${formatQty(totals.cashQty)} × ${totals.rate}`}
            strong
            tone="forest"
            rule
          />
        </section>

        <section className="ledger-page rounded-[var(--radius-xl)] p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display text-base text-forest-2">વધારો · આવક</h3>
            <Badge tone="forest">બીલ્ડિંગ</Badge>
          </div>
          <LedgerRow
            label="આડાળની બીલ્ડિંગ"
            value={formatInr(totals.openingCash)}
          />
          <LedgerRow
            label="રોકડ વેચાણ"
            value={formatInr(totals.cashAmt)}
            tone="forest"
          />
          {receipts.map((r) => (
            <LedgerRow
              key={r.id}
              label={r.particular}
              value={formatInr(r.amount)}
            />
          ))}
          <LedgerRow
            label="કુલ આવક"
            value={formatInr(totals.incomeTotal)}
            strong
            rule
          />

          <h3 className="font-display text-base text-forest-2 mt-5 mb-2">ખર્ચ</h3>
          {expenses.length === 0 && (
            <p className="text-sm text-muted py-2">આજે ખર્ચ નથી.</p>
          )}
          {expenses.map((e) => (
            <LedgerRow
              key={e.id}
              label={e.particular}
              value={formatInr(e.amount)}
              tone="danger"
            />
          ))}
          <LedgerRow
            label="કુલ જમા બાકી"
            value={formatInr(totals.closingCash)}
            hint="કુલ આવક − ખર્ચ"
            strong
            tone="forest"
            rule
          />
        </section>
      </div>

      <section className="ledger-page rounded-[var(--radius-xl)] p-4 sm:p-5">
        <h3 className="font-display text-base text-forest-2 mb-2">રહેદ · ડીઝલ સ્ટોક</h3>
        <LedgerRow
          label="આડાળનો રહેદ"
          value={formatInrPaise(totals.openingStock, false)}
        />
        {inwards.map((i) => (
          <LedgerRow
            key={i.id}
            label={`ઓનલાઈન ${i.vehicle}${i.weight ? `  વજન ${formatQty(i.weight)}` : ""}`}
            value={formatInrPaise(i.qty, false)}
          />
        ))}
        <LedgerRow
          label="જમા રહેદ"
          value={formatInrPaise(totals.stockBeforeSales, false)}
          strong
        />
        <LedgerRow
          label="વેચાણ"
          value={formatInrPaise(totals.netSales, false)}
          tone="credit"
        />
        <LedgerRow
          label="કુલ જમા રહેદ"
          value={formatInrPaise(totals.closingStock, false)}
          hint="આડાળ + ઓનલાઈન − વેચાણ"
          strong
          tone="forest"
          rule
        />
      </section>

      <section className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <Stat label="કુલ ડીઝલ" value={`${formatQty(totals.netSales)} L`} />
        <Stat label="ઉધાર" value={formatInr(totals.udharAmt)} tone="credit" />
        <Stat label="રોકડ વેચાણ" value={formatInr(totals.cashAmt)} tone="forest" />
        <Stat label="બીલ્ડિંગ" value={formatInr(totals.closingCash)} />
      </section>

      {sales.length === 0 && totals.netSales === 0 && (
        <p className="text-center text-sm text-muted py-6">
          આ દિવસે હજુ એન્ટ્રી નથી. ડીઝલ વેચાણ અથવા ટાંકી રીડીંગ નાખો.
        </p>
      )}
    </div>
  );
}

function TankerBlock({
  name,
  opening,
  closing,
  sales,
}: {
  name: string;
  opening: number;
  closing: number;
  sales: number;
}) {
  return (
    <div className="mb-3 pb-2 border-b border-line/80">
      <div className="flex items-center gap-2 mb-1">
        <span className="font-display text-sm text-ink">{name}</span>
        <span className="text-[11px] text-faint">રીડીંગ</span>
      </div>
      <LedgerRow label="રીડીંગ" value={formatInrPaise(closing, false)} />
      <LedgerRow label="ઓપનીંગ" value={formatInrPaise(opening, false)} />
      <LedgerRow
        label={`${name} વેચાણ`}
        value={formatQty(sales)}
        hint={`${formatInrPaise(closing, false)} − ${formatInrPaise(opening, false)}`}
        tone="forest"
        strong
      />
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "forest" | "credit";
}) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-line bg-surface px-3 py-3">
      <div className="text-[11px] text-muted">{label}</div>
      <div
        className={`tabular font-display text-lg mt-0.5 ${
          tone === "credit" ? "text-credit" : tone === "forest" ? "text-forest" : "text-ink"
        }`}
      >
        {value}
      </div>
    </div>
  );
}
