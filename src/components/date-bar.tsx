import { useState } from "react";
import { ChevronLeft, ChevronRight, CalendarPlus, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addDays, formatDateGu, todayIso } from "@/lib/format";
import { sortedDates } from "@/lib/compute";
import { useHisab } from "@/lib/store";

export function DateBar() {
  const selectedDate = useHisab((s) => s.selectedDate);
  const setSelectedDate = useHisab((s) => s.setSelectedDate);
  const days = useHisab((s) => s.days);
  const resetSample = useHisab((s) => s.resetSample);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(selectedDate);
  const known = sortedDates(days);

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="secondary"
        size="icon"
        aria-label="પાછલો દિવસ"
        onClick={() => setSelectedDate(addDays(selectedDate, -1))}
      >
        <ChevronLeft />
      </Button>
      <button
        type="button"
        onClick={() => {
          setDraft(selectedDate);
          setOpen(true);
        }}
        className="flex-1 min-w-0 h-11 rounded-[var(--radius-md)] border border-line bg-surface-2 px-3 text-left hover:bg-bg-recessed"
      >
        <div className="text-[11px] uppercase tracking-wide text-faint leading-none">તારીખ</div>
        <div className="font-display text-sm text-ink truncate leading-tight mt-0.5">
          {formatDateGu(selectedDate)}
        </div>
      </button>
      <Button
        variant="secondary"
        size="icon"
        aria-label="આગળનો દિવસ"
        onClick={() => setSelectedDate(addDays(selectedDate, 1))}
      >
        <ChevronRight />
      </Button>
      <Button
        variant="outline"
        size="icon"
        aria-label="નવો દિવસ"
        onClick={() => {
          setDraft(todayIso());
          setOpen(true);
        }}
      >
        <CalendarPlus />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent title="દિવસ પસંદ કરો">
          <div className="mt-4 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="pick-date">તારીખ</Label>
              <Input
                id="pick-date"
                type="date"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
              />
              <p className="text-xs text-muted">
                નવી તારીખ ખોલતાં આગલા દિવસની બીલ્ડિંગ અને રહેદ આપોઆપ આવશે.
              </p>
            </div>
            {known.length > 0 && (
              <div>
                <p className="text-xs font-medium text-muted mb-2">નોંધાયેલા દિવસો</p>
                <div className="flex flex-wrap gap-1.5">
                  {known.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => {
                        setSelectedDate(d);
                        setOpen(false);
                      }}
                      className="h-9 px-3 rounded-full border border-line text-xs bg-surface-2 hover:bg-forest-soft"
                    >
                      {formatDateGu(d).split("  ")[0]}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="flex gap-2 pt-1">
              <Button
                className="flex-1"
                onClick={() => {
                  if (draft) {
                    setSelectedDate(draft);
                    setOpen(false);
                  }
                }}
              >
                ખોલો
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  if (window.confirm("નમૂનો દિવસ (09/09/2026) ફરી લોડ કરવો? હાલની એન્ટ્રીઓ મિટી જશે.")) {
                    resetSample();
                    setOpen(false);
                  }
                }}
              >
                <RotateCcw className="size-4" />
                નમૂનો
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
