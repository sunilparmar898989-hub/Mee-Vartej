import { create } from "zustand";
import { persist } from "zustand/middleware";
import { computeDay, previousDate } from "./compute";
import { seedData, SAMPLE_DATE } from "./seed";
import type { DayRecord, Expense, HisabData, Inward, Party, Receipt, Sale } from "./types";
import { rupee, uid } from "./utils";
import { normalizeVehicle } from "./format";

type HisabState = HisabData & {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  ensureDay: (date: string) => void;
  updateDay: (date: string, patch: Partial<DayRecord>) => void;
  setTanker: (date: string, name: "A-1" | "A-2", patch: { opening?: number; closing?: number }) => void;
  addParty: (name: string) => string;
  renameParty: (id: string, name: string) => void;
  addSale: (input: { partyId: string; qty: number; rate?: number; vehicle?: string }) => void;
  updateSale: (
    id: string,
    patch: Partial<Pick<Sale, "partyId" | "qty" | "rate" | "amount" | "serial" | "vehicle">>,
  ) => void;
  deleteSale: (id: string) => void;
  addReceipt: (input: { particular: string; amount: number; partyId?: string | null }) => void;
  updateReceipt: (id: string, patch: Partial<Pick<Receipt, "particular" | "amount" | "partyId">>) => void;
  deleteReceipt: (id: string) => void;
  addExpense: (input: { particular: string; amount: number }) => void;
  updateExpense: (id: string, patch: Partial<Pick<Expense, "particular" | "amount">>) => void;
  deleteExpense: (id: string) => void;
  addInward: (input: { vehicle: string; weight: number; qty: number }) => void;
  updateInward: (id: string, patch: Partial<Pick<Inward, "vehicle" | "weight" | "qty">>) => void;
  deleteInward: (id: string) => void;
  resetSample: () => void;
};

function emptyDay(date: string, prev?: DayRecord, prevClosing?: { cash: number; stock: number }): DayRecord {
  return {
    date,
    rate: prev?.rate ?? 89,
    testing: 0,
    openingCash: prevClosing?.cash ?? 0,
    openingStock: prevClosing?.stock ?? 0,
    tankers: {
      "A-1": { opening: 0, closing: 0 },
      "A-2": { opening: 0, closing: 0 },
    },
  };
}

export const useHisab = create<HisabState>()(
  persist(
    (set, get) => ({
      ...seedData,
      selectedDate: SAMPLE_DATE,

      setSelectedDate: (date) => {
        get().ensureDay(date);
        set({ selectedDate: date });
      },

      ensureDay: (date) => {
        const state = get();
        if (state.days[date]) return;
        const prevKey = previousDate(state.days, date);
        const prev = prevKey ? state.days[prevKey] : undefined;
        let prevClosing: { cash: number; stock: number } | undefined;
        if (prevKey) {
          const t = computeDay(state, prevKey);
          prevClosing = { cash: t.closingCash, stock: t.closingStock };
        }
        set({
          days: {
            ...state.days,
            [date]: emptyDay(date, prev, prevClosing),
          },
        });
      },

      updateDay: (date, patch) => {
        const state = get();
        const current = state.days[date] ?? emptyDay(date);
        set({
          days: { ...state.days, [date]: { ...current, ...patch, date } },
        });
      },

      setTanker: (date, name, patch) => {
        const state = get();
        const current = state.days[date] ?? emptyDay(date);
        set({
          days: {
            ...state.days,
            [date]: {
              ...current,
              tankers: {
                ...current.tankers,
                [name]: { ...current.tankers[name], ...patch },
              },
            },
          },
        });
      },

      addParty: (name) => {
        const trimmed = name.trim();
        const existing = get().parties.find((p) => p.name === trimmed);
        if (existing) return existing.id;
        const id = uid("p");
        set({ parties: [...get().parties, { id, name: trimmed }] });
        return id;
      },

      renameParty: (id, name) => {
        set({
          parties: get().parties.map((p) => (p.id === id ? { ...p, name: name.trim() } : p)),
        });
      },

      addSale: ({ partyId, qty, rate, vehicle }) => {
        const state = get();
        const date = state.selectedDate;
        state.ensureDay(date);
        const day = get().days[date];
        const usedRate = rate ?? day?.rate ?? 89;
        const serial =
          get()
            .sales.filter((s) => s.date === date)
            .reduce((max, s) => Math.max(max, s.serial), 0) + 1;
        const sale: Sale = {
          id: uid("s"),
          date,
          serial,
          partyId,
          qty,
          rate: usedRate,
          amount: rupee(qty * usedRate),
          vehicle: normalizeVehicle(vehicle ?? ""),
        };
        set({ sales: [...get().sales, sale] });
      },

      updateSale: (id, patch) => {
        set({
          sales: get().sales.map((s) => {
            if (s.id !== id) return s;
            const next = { ...s, ...patch };
            if (patch.vehicle !== undefined) next.vehicle = normalizeVehicle(patch.vehicle);
            if (patch.qty !== undefined || patch.rate !== undefined) {
              next.amount = rupee(next.qty * next.rate);
            }
            return next;
          }),
        });
      },

      deleteSale: (id) => set({ sales: get().sales.filter((s) => s.id !== id) }),

      addReceipt: ({ particular, amount, partyId }) => {
        const date = get().selectedDate;
        get().ensureDay(date);
        const row: Receipt = {
          id: uid("r"),
          date,
          particular,
          amount,
          partyId: partyId ?? null,
        };
        set({ receipts: [...get().receipts, row] });
      },

      updateReceipt: (id, patch) => {
        set({
          receipts: get().receipts.map((r) => (r.id === id ? { ...r, ...patch } : r)),
        });
      },

      deleteReceipt: (id) => set({ receipts: get().receipts.filter((r) => r.id !== id) }),

      addExpense: ({ particular, amount }) => {
        const date = get().selectedDate;
        get().ensureDay(date);
        const row: Expense = { id: uid("e"), date, particular, amount };
        set({ expenses: [...get().expenses, row] });
      },

      updateExpense: (id, patch) => {
        set({
          expenses: get().expenses.map((e) => (e.id === id ? { ...e, ...patch } : e)),
        });
      },

      deleteExpense: (id) => set({ expenses: get().expenses.filter((e) => e.id !== id) }),

      addInward: ({ vehicle, weight, qty }) => {
        const date = get().selectedDate;
        get().ensureDay(date);
        const row: Inward = { id: uid("i"), date, vehicle, weight, qty };
        set({ inwards: [...get().inwards, row] });
      },

      updateInward: (id, patch) => {
        set({
          inwards: get().inwards.map((i) => (i.id === id ? { ...i, ...patch } : i)),
        });
      },

      deleteInward: (id) => set({ inwards: get().inwards.filter((i) => i.id !== id) }),

      resetSample: () => set({ ...seedData, selectedDate: SAMPLE_DATE }),
    }),
    {
      name: "rojmel-hisab-v1",
      skipHydration: true,
      partialize: (state) => ({
        parties: state.parties,
        days: state.days,
        sales: state.sales,
        receipts: state.receipts,
        expenses: state.expenses,
        inwards: state.inwards,
        selectedDate: state.selectedDate,
      }),
    },
  ),
);

export function useDayData() {
  const selectedDate = useHisab((s) => s.selectedDate);
  const parties = useHisab((s) => s.parties);
  const days = useHisab((s) => s.days);
  const sales = useHisab((s) => s.sales);
  const receipts = useHisab((s) => s.receipts);
  const expenses = useHisab((s) => s.expenses);
  const inwards = useHisab((s) => s.inwards);
  const totals = computeDay({ parties, days, sales, receipts, expenses, inwards }, selectedDate);
  return {
    date: selectedDate,
    day: days[selectedDate],
    parties,
    sales: sales.filter((s) => s.date === selectedDate).sort((a, b) => a.serial - b.serial),
    receipts: receipts.filter((r) => r.date === selectedDate),
    expenses: expenses.filter((e) => e.date === selectedDate),
    inwards: inwards.filter((i) => i.date === selectedDate),
    totals,
  };
}
