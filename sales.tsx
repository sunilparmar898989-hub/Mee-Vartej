import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { SaleForm } from "@/components/sale-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { NumberField } from "@/components/number-field";
import { PartyPicker } from "@/components/party-picker";
import { VehicleField } from "@/components/vehicle-field";
import { Label } from "@/components/ui/label";
import { formatInr, formatQty } from "@/lib/format";
import { useDayData, useHisab } from "@/lib/store";
import type { Sale } from "@/lib/types";
import { toast } from "sonner";

export const Route = createFileRoute("/sales")({ component: SalesPage });

function SalesPage() {
  const { sales, parties, totals } = useDayData();
  const deleteSale = useHisab((s) => s.deleteSale);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Sale | null>(null);
  const nameOf = (id: string) => parties.find((p) => p.id === id)?.name ?? "—";

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl text-ink">ડીઝલ ઉધાર વેચાણ</h2>
          <p className="text-sm text-muted mt-0.5">
            પાર્ટી પ્રમાણે લિટર · ભાવ ₹{totals.rate}
          </p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <Plus className="size-4" />
          નવું
        </Button>
      </div>

      <div className="ledger-page rounded-[var(--radius-xl)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[42rem] text-sm">
            <thead>
              <tr className="bg-bg-recessed/80 text-muted text-xs">
                <th className="text-left font-medium px-3 py-2.5 w-12">નં.</th>
                <th className="text-right font-medium px-2 py-2.5">લિટર</th>
                <th className="text-right font-medium px-2 py-2.5">ભાવ</th>
                <th className="text-right font-medium px-2 py-2.5">રકમ</th>
                <th className="text-left font-medium px-3 py-2.5">પાર્ટી</th>
                <th className="text-left font-medium px-2 py-2.5">ગાડી નં.</th>
                <th className="w-20" />
              </tr>
            </thead>
            <tbody>
              {sales.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-3 py-10 text-center text-muted">
                    આજે હજુ ડીઝલ વેચાણ નથી. ઉપરથી નવું ઉમેરો.
                  </td>
                </tr>
              )}
              {sales.map((s) => (
                <tr key={s.id} className="border-t border-line/80 hover:bg-surface-2">
                  <td className="px-3 py-2.5 tabular text-muted">{s.serial}</td>
                  <td className="px-2 py-2.5 tabular text-right font-medium">
                    {formatQty(s.qty)}
                  </td>
                  <td className="px-2 py-2.5 tabular text-right text-muted">{s.rate}</td>
                  <td className="px-2 py-2.5 tabular text-right font-medium">
                    {formatInr(s.amount, false)}
                  </td>
                  <td className="px-3 py-2.5">{nameOf(s.partyId)}</td>
                  <td className="px-2 py-2.5 tabular tracking-wide text-ink-soft">
                    {s.vehicle || "—"}
                  </td>
                  <td className="px-1 py-1 text-right">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label="ફેરફાર"
                      onClick={() => setEditing(s)}
                    >
                      <Pencil className="size-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label="કાઢો"
                      onClick={() => {
                        deleteSale(s.id);
                        toast.success("કાઢી નાખ્યું");
                      }}
                    >
                      <Trash2 className="size-3.5 text-danger" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
            {sales.length > 0 && (
              <tfoot>
                <tr className="border-t-2 border-line-strong bg-credit-soft/40">
                  <td className="px-3 py-3 font-medium">કુલ</td>
                  <td className="px-2 py-3 tabular text-right font-display text-base text-credit">
                    {formatQty(totals.udharQty)}
                  </td>
                  <td />
                  <td className="px-2 py-3 tabular text-right font-display text-base">
                    {formatInr(totals.udharAmt, false)}
                  </td>
                  <td className="px-3 py-3 text-credit text-xs font-medium" colSpan={3}>
                    ઉધાર વેચાણ
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge tone="credit">ઉધાર {formatQty(totals.udharQty)} L</Badge>
        <Badge tone="forest">રોકડ {formatQty(totals.cashQty)} L</Badge>
        <Badge>કુલ {formatQty(totals.netSales)} L</Badge>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent title="નવું ડીઝલ વેચાણ">
          <SaleForm onDone={() => setOpen(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editing} onOpenChange={(v) => !v && setEditing(null)}>
        <DialogContent title="વેચાણ ફેરફાર">
          {editing && (
            <EditSale sale={editing} onDone={() => setEditing(null)} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function EditSale({ sale, onDone }: { sale: Sale; onDone: () => void }) {
  const updateSale = useHisab((s) => s.updateSale);
  const [partyId, setPartyId] = useState(sale.partyId);
  const [vehicle, setVehicle] = useState(sale.vehicle ?? "");
  const [qty, setQty] = useState(sale.qty);
  const [rate, setRate] = useState(sale.rate);

  return (
    <form
      className="space-y-3 mt-4"
      onSubmit={(e) => {
        e.preventDefault();
        updateSale(sale.id, { partyId, qty, rate, vehicle });
        toast.success("સેવ થયું");
        onDone();
      }}
    >
      <div className="space-y-1.5">
        <Label>પાર્ટી</Label>
        <PartyPicker value={partyId} onChange={setPartyId} />
      </div>
      <div className="space-y-1.5">
        <Label>ગાડી નંબર</Label>
        <VehicleField value={vehicle} onChange={setVehicle} partyId={partyId} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label>લિટર</Label>
          <NumberField value={qty} onCommit={setQty} blankZero />
        </div>
        <div className="space-y-1.5">
          <Label>ભાવ</Label>
          <NumberField value={rate} onCommit={setRate} />
        </div>
      </div>
      <p className="tabular text-sm text-muted">રકમ {formatInr(qty * rate)}</p>
      <Button type="submit" className="w-full">
        સેવ
      </Button>
    </form>
  );
}
