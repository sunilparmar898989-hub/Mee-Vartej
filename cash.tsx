import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, Trash2 } from "lucide-react";
import { LedgerRow } from "@/components/ledger-row";
import { NumberField } from "@/components/number-field";
import { PartyPicker } from "@/components/party-picker";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatInr } from "@/lib/format";
import { useDayData, useHisab } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/cash")({ component: CashPage });

function CashPage() {
  const { receipts, expenses, totals } = useDayData();
  const updateDay = useHisab((s) => s.updateDay);
  const deleteReceipt = useHisab((s) => s.deleteReceipt);
  const deleteExpense = useHisab((s) => s.deleteExpense);
  const [kind, setKind] = useState<null | "in" | "out">(null);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-display text-2xl text-ink">રોકડ ચોપડી</h2>
        <p className="text-sm text-muted mt-0.5">પંપની બીલ્ડિંગ, પાર્ટી જમા અને ખર્ચ</p>
      </div>

      <section className="ledger-page rounded-[var(--radius-xl)] p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-base">આડાળની બીલ્ડિંગ</h3>
        </div>
        <div className="max-w-xs">
          <Label className="mb-1.5 block">ઓપનીંગ રોકડ</Label>
          <NumberField
            value={totals.openingCash}
            decimals={0}
            onCommit={(n) => updateDay(totals.date, { openingCash: n })}
            aria-label="ઓપનીંગ રોકડ"
          />
          <p className="text-xs text-faint mt-1">
            નવો દિવસ ખોલતાં આગલી બીલ્ડિંગ આપોઆપ આવે છે.
          </p>
        </div>
        <LedgerRow label="રોકડ વેચાણ" value={formatInr(totals.cashAmt)} tone="forest" />
      </section>

      <section className="ledger-page rounded-[var(--radius-xl)] overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-line">
          <h3 className="font-display text-base">વધારો · પાર્ટી જમા</h3>
          <Button size="sm" onClick={() => setKind("in")}>
            <Plus className="size-4" />
            જમા
          </Button>
        </div>
        <ul>
          {receipts.length === 0 && (
            <li className="px-4 py-8 text-center text-sm text-muted">
              આજે કોઈ જમા નથી.
            </li>
          )}
          {receipts.map((r) => (
            <li
              key={r.id}
              className="flex items-center gap-2 px-4 py-2.5 border-t border-line/70"
            >
              <span className="flex-1 min-w-0 truncate">{r.particular}</span>
              <span className="tabular font-medium">{formatInr(r.amount)}</span>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="કાઢો"
                onClick={() => {
                  deleteReceipt(r.id);
                  toast.success("કાઢી નાખ્યું");
                }}
              >
                <Trash2 className="size-3.5 text-danger" />
              </Button>
            </li>
          ))}
        </ul>
        <div className="px-4 py-3 bg-forest-soft/40 border-t border-line">
          <LedgerRow
            label="કુલ આવક"
            value={formatInr(totals.incomeTotal)}
            strong
            tone="forest"
          />
        </div>
      </section>

      <section className="ledger-page rounded-[var(--radius-xl)] overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-line">
          <h3 className="font-display text-base">ખર્ચ</h3>
          <Button size="sm" variant="secondary" onClick={() => setKind("out")}>
            <Plus className="size-4" />
            ખર્ચ
          </Button>
        </div>
        <ul>
          {expenses.length === 0 && (
            <li className="px-4 py-8 text-center text-sm text-muted">આજે ખર્ચ નથી.</li>
          )}
          {expenses.map((e) => (
            <li
              key={e.id}
              className="flex items-center gap-2 px-4 py-2.5 border-t border-line/70"
            >
              <span className="flex-1 min-w-0 truncate">{e.particular}</span>
              <span className="tabular font-medium text-danger">{formatInr(e.amount)}</span>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="કાઢો"
                onClick={() => {
                  deleteExpense(e.id);
                  toast.success("કાઢી નાખ્યું");
                }}
              >
                <Trash2 className="size-3.5 text-danger" />
              </Button>
            </li>
          ))}
        </ul>
        <div className="px-4 py-3 bg-surface-2 border-t-2 border-line-strong">
          <LedgerRow
            label="કુલ જમા બાકી"
            value={formatInr(totals.closingCash)}
            hint="કુલ આવક − ખર્ચ"
            strong
            tone="forest"
          />
        </div>
      </section>

      <Dialog open={kind !== null} onOpenChange={(v) => !v && setKind(null)}>
        <DialogContent title={kind === "out" ? "નવો ખર્ચ" : "નવી જમા"}>
          {kind === "in" && <ReceiptForm onDone={() => setKind(null)} />}
          {kind === "out" && <ExpenseForm onDone={() => setKind(null)} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ReceiptForm({ onDone }: { onDone: () => void }) {
  const addReceipt = useHisab((s) => s.addReceipt);
  const [particular, setParticular] = useState("");
  const [amount, setAmount] = useState(0);
  const [partyId, setPartyId] = useState("");

  return (
    <form
      className="space-y-3 mt-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (!particular.trim() || amount <= 0) {
          toast.error("વિગત અને રકમ દાખલ કરો");
          return;
        }
        addReceipt({
          particular: particular.trim(),
          amount,
          partyId: partyId || null,
        });
        toast.success("જમા નોંધાઈ");
        onDone();
      }}
    >
      <div className="space-y-1.5">
        <Label>વિગત</Label>
        <Input
          value={particular}
          onChange={(e) => setParticular(e.target.value)}
          placeholder="કોની પાસેથી?"
        />
      </div>
      <div className="space-y-1.5">
        <Label>પાર્ટી ખાતું (વૈકલ્પિક)</Label>
        <PartyPicker value={partyId} onChange={setPartyId} />
      </div>
      <div className="space-y-1.5">
        <Label>રકમ</Label>
        <NumberField value={amount} decimals={0} onCommit={setAmount} blankZero />
      </div>
      <Button type="submit" className="w-full">
        જમા ઉમેરો
      </Button>
    </form>
  );
}

function ExpenseForm({ onDone }: { onDone: () => void }) {
  const addExpense = useHisab((s) => s.addExpense);
  const [particular, setParticular] = useState("");
  const [amount, setAmount] = useState(0);

  return (
    <form
      className="space-y-3 mt-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (!particular.trim() || amount <= 0) {
          toast.error("વિગત અને રકમ દાખલ કરો");
          return;
        }
        addExpense({ particular: particular.trim(), amount });
        toast.success("ખર્ચ નોંધાયો");
        onDone();
      }}
    >
      <div className="space-y-1.5">
        <Label>વિગત</Label>
        <Input
          value={particular}
          onChange={(e) => setParticular(e.target.value)}
          placeholder="ખર્ચ શેનો?"
        />
      </div>
      <div className="space-y-1.5">
        <Label>રકમ</Label>
        <NumberField value={amount} decimals={0} onCommit={setAmount} blankZero />
      </div>
      <Button type="submit" className="w-full">
        ખર્ચ ઉમેરો
      </Button>
    </form>
  );
}
