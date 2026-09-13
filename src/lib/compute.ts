import { round2, rupee } from "./utils";
import type { DayTotals, HisabData, TankerName } from "./types";

const EMPTY_TANKER = { opening: 0, closing: 0 };

export function computeDay(data: HisabData, date: string): DayTotals {
  const day = data.days[date];
  const rate = day?.rate ?? 0;
  const testing = day?.testing ?? 0;
  const openingCash = day?.openingCash ?? 0;
  const openingStock = day?.openingStock ?? 0;
  const a1 = day?.tankers["A-1"] ?? EMPTY_TANKER;
  const a2 = day?.tankers["A-2"] ?? EMPTY_TANKER;

  const a1Sales = round2(a1.closing - a1.opening);
  const a2Sales = round2(a2.closing - a2.opening);
  const grossSales = round2(a1Sales + a2Sales);
  const netSales = round2(grossSales - testing);

  const daySales = data.sales.filter((s) => s.date === date);
  const udharQty = round2(daySales.reduce((sum, s) => sum + s.qty, 0));
  const udharAmt = daySales.reduce((sum, s) => sum + s.amount, 0);
  const cashQty = round2(netSales - udharQty);
  const cashAmt = rupee(cashQty * rate);

  const receiptTotal = data.receipts
    .filter((r) => r.date === date)
    .reduce((sum, r) => sum + r.amount, 0);
  const expenseTotal = data.expenses
    .filter((e) => e.date === date)
    .reduce((sum, e) => sum + e.amount, 0);
  const incomeTotal = openingCash + cashAmt + receiptTotal;
  const closingCash = incomeTotal - expenseTotal;

  const inwardQty = round2(
    data.inwards.filter((i) => i.date === date).reduce((sum, i) => sum + i.qty, 0),
  );
  const stockBeforeSales = round2(openingStock + inwardQty);
  const closingStock = round2(stockBeforeSales - netSales);

  return {
    date,
    rate,
    a1Opening: a1.opening,
    a1Closing: a1.closing,
    a2Opening: a2.opening,
    a2Closing: a2.closing,
    a1Sales,
    a2Sales,
    grossSales,
    testing,
    netSales,
    udharQty,
    udharAmt,
    cashQty,
    cashAmt,
    openingCash,
    receiptTotal,
    incomeTotal,
    expenseTotal,
    closingCash,
    openingStock,
    inwardQty,
    stockBeforeSales,
    closingStock,
    saleCount: daySales.length,
  };
}

export function previousDate(days: Record<string, unknown>, date: string): string | null {
  const keys = Object.keys(days)
    .filter((d) => d < date)
    .sort();
  return keys.length ? keys[keys.length - 1]! : null;
}

export function sortedDates(days: Record<string, unknown>): string[] {
  return Object.keys(days).sort().reverse();
}

export function tankerSales(opening: number, closing: number): number {
  return round2(closing - opening);
}

export const TANKERS: TankerName[] = ["A-1", "A-2"];
