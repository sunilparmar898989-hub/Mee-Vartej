import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, Trash2 } from "lucide-react";
import { LedgerRow } from "@/components/ledger-row";
import { NumberField } from "@/components/number-field";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatInrPaise, formatQty } from "@/lib/format";
import { TANKERS } from "@/lib/compute";
import { useDayData, useHisab } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/stock")({ component: StockPage });

function StockPage() {
  const { totals, inwards, day } = useDayData();
  const updateDay = useHisab((s) => s.updateDay);
  const setTanker = useHisab((s) => s.setTanker);
  const deleteInward = useHisab((s) => s.deleteInward);
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-display text-2xl text-ink">ડીઝલ ટાંકી અને રહેદ</h2>
        <p className="text-sm text-muted mt-0.5">A-1 / A-2 મીટર, ટેસ્ટીંગ, ભાવ, ટેન્કર આવક</p>
      </div>

      <section className="ledger-page rounded-[var(--radius-xl)] p-4 sm:p-5 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label>ભાવ (Rate)</Label>
            <NumberField
              value={day?.rate ?? 0}
              decimals={2}
              onCommit={(n) => updateDay(totals.date, { rate: n })}
            />
          </div>
          <div className="space-y-1.5">
            <Label>ટેસ્ટીંગ લિટર</Label>
            <NumberField
              value={day?.testing ?? 0}
              onCommit={(n) => updateDay(totals.date, { testing: n })}
            />
          </div>
        </div>
      </section>

      {TANKERS.map((name) => {
        const t = day?.tankers[name] ?? { opening: 0, closing: 0 };
        const sales = totals[name === "A-1" ? "a1Sales" : "a2Sales"];
        return (
          <section key={name} className="ledger-page rounded-[var(--radius-xl)] p-4 sm:p-5">
            <h3 className="font-display text-base mb-3">{name} ડીઝલ ટાંકી</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>ઓપનીંગ</Label>
                <NumberField
                  value={t.opening}
                  onCommit={(n) => setTanker(totals.date, name, { opening: n })}
                />
              </div>
              <div className="space-y-1.5">
                <Label>રીડીંગ</Label>
                <NumberField
                  value={t.closing}
                  onCommit={(n) => setTanker(totals.date, name, { closing: n })}
                />
              </div>
            </div>
            <div className="mt-3">
              <LedgerRow
                label={`${name} વેચાણ`}
                value={formatQty(sales)}
                tone="forest"
                strong
                hint="રીડીંગ − ઓપનીંગ"
              />
            </div>
          </section>
        );
      })}

      <section className="ledger-page rounded-[var(--radius-xl)] p-4 sm:p-5 space-y-3">
        <LedgerRow label="કુલ વેચાણ" value={formatQty(totals.grossSales)} />
        <LedgerRow label="ટેસ્ટીંગ" value={formatQty(totals.testing)} />
        <LedgerRow
          label="કુલ વેચાણ"
          value={formatQty(totals.netSales)}
          strong
          rule
          tone="forest"
        />
      </section>

      <section className="ledger-page rounded-[var(--radius-xl)] overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-line">
          <h3 className="font-display text-base">ટેન્કર / ઓનલાઈન આવક</h3>
          <Button size="sm" onClick={() => setOpen(true)}>
            <Plus className="size-4" />
            આવક
          </Button>
        </div>
        <div className="px-4 py-3">
          <Label className="mb-1.5 block">આડાળનો રહેદ</Label>
          <NumberField
            value={totals.openingStock}
            onCommit={(n) => updateDay(totals.date, { openingStock: n })}
          />
        </div>
        <ul>
          {inwards.map((i) => (
            <li
              key={i.id}
              className="flex items-center gap-2 px-4 py-2.5 border-t border-line/70"
            >
              <div className="flex-1 min-w-0">
                <div className="truncate font-medium">{i.vehicle || "ટેન્કર"}</div>
                <div className="text-xs text-muted">
                  વજન {formatQty(i.weight)} · {formatInrPaise(i.qty, false)} L
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="કાઢો"
                onClick={() => {
                  deleteInward(i.id);
                  toast.success("કાઢી નાખ્યું");
                }}
              >
                <Trash2 className="size-3.5 text-danger" />
              </Button>
            </li>
          ))}
        </ul>
        <div className="px-4 py-3 border-t border-line bg-surface-2 space-y-1">
          <LedgerRow label="જમા રહેદ" value={formatInrPaise(totals.stockBeforeSales, false)} />
          <LedgerRow label="વેચાણ" value={formatInrPaise(totals.netSales, false)} tone="credit" />
          <LedgerRow
            label="કુલ જમા રહેદ"
            value={formatInrPaise(totals.closingStock, false)}
            strong
            tone="forest"
            rule
          />
        </div>
      </section>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent title="ડીઝલ ટેન્કર આવક">
          <InwardForm onDone={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function InwardForm({ onDone }: { onDone: () => void }) {
  const addInward = useHisab((s) => s.addInward);
  const [vehicle, setVehicle] = useState("");
  const [weight, setWeight] = useState(0);
  const [qty, setQty] = useState(0);

  return (
    <form
      className="space-y-3 mt-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (qty <= 0) {
          toast.error("લિટર દાખલ કરો");
          return;
        }
        addInward({ vehicle: vehicle.trim() || "ટેન્કર", weight, qty });
        toast.success("આવક નોંધાઈ");
        onDone();
      }}
    >
      <div className="space-y-1.5">
        <Label>ગાડી નંબર</Label>
        <Input
          value={vehicle}
          onChange={(e) => setVehicle(e.target.value)}
          placeholder="GJ12BT2955"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label>વજન</Label>
          <NumberField value={weight} onCommit={setWeight} blankZero />
        </div>
        <div className="space-y-1.5">
          <Label>લિટર</Label>
          <NumberField value={qty} onCommit={setQty} blankZero />
        </div>
      </div>
      <Button type="submit" className="w-full">
        ઉમેરો
      </Button>
    </form>
  );
}
