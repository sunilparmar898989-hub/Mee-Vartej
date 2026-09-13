import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { NumberField } from "@/components/number-field";
import { PartyPicker } from "@/components/party-picker";
import { VehicleField } from "@/components/vehicle-field";
import { formatInr, formatQty } from "@/lib/format";
import { useHisab } from "@/lib/store";
import { rupee } from "@/lib/utils";
import { toast } from "sonner";

export function SaleForm({ onDone }: { onDone?: () => void }) {
  const selectedDate = useHisab((s) => s.selectedDate);
  const day = useHisab((s) => s.days[s.selectedDate]);
  const addSale = useHisab((s) => s.addSale);
  const [partyId, setPartyId] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [qty, setQty] = useState(0);
  const [rate, setRate] = useState(day?.rate ?? 89);

  const amount = rupee(qty * rate);

  useEffect(() => {
    if (!partyId) return;
    const last = [...useHisab.getState().sales]
      .reverse()
      .find((s) => s.partyId === partyId && (s.vehicle ?? "").trim());
    setVehicle(last?.vehicle ?? "");
  }, [partyId]);

  return (
    <form
      className="space-y-3 mt-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (!partyId) {
          toast.error("પાર્ટી પસંદ કરો");
          return;
        }
        if (qty <= 0) {
          toast.error("લિટર દાખલ કરો");
          return;
        }
        addSale({ partyId, qty, rate, vehicle });
        toast.success("વેચાણ નોંધાયું");
        setQty(0);
        setVehicle("");
        onDone?.();
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
          <Label>લિટર (Qty)</Label>
          <NumberField value={qty} onCommit={setQty} aria-label="લિટર" blankZero />
        </div>
        <div className="space-y-1.5">
          <Label>ભાવ (Rate)</Label>
          <NumberField value={rate} onCommit={setRate} decimals={2} aria-label="ભાવ" />
        </div>
      </div>
      <div className="rounded-[var(--radius-md)] bg-bg-recessed px-3 py-2.5 flex justify-between">
        <span className="text-sm text-muted">રકમ</span>
        <span className="tabular font-display text-lg text-ink">{formatInr(amount)}</span>
      </div>
      <p className="text-xs text-faint">
        {qty > 0 ? `${formatQty(qty)} × ${rate} = ${formatInr(amount)}` : "ઉધાર વેચાણ તરીકે નોંધાશે."}
        {" · "}
        {selectedDate}
      </p>
      <Button type="submit" className="w-full" size="lg">
        ડીઝલ વેચાણ ઉમેરો
      </Button>
    </form>
  );
}
