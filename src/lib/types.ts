export type TankerName = "A-1" | "A-2";

export type Party = {
  id: string;
  name: string;
};

export type DayRecord = {
  date: string;
  rate: number;
  testing: number;
  openingCash: number;
  openingStock: number;
  tankers: Record<TankerName, { opening: number; closing: number }>;
};

export type Sale = {
  id: string;
  date: string;
  serial: number;
  partyId: string;
  qty: number;
  rate: number;
  amount: number;
  vehicle: string;
};

export type Receipt = {
  id: string;
  date: string;
  partyId: string | null;
  particular: string;
  amount: number;
};

export type Expense = {
  id: string;
  date: string;
  particular: string;
  amount: number;
};

export type Inward = {
  id: string;
  date: string;
  vehicle: string;
  weight: number;
  qty: number;
};

export type HisabData = {
  parties: Party[];
  days: Record<string, DayRecord>;
  sales: Sale[];
  receipts: Receipt[];
  expenses: Expense[];
  inwards: Inward[];
};

export type DayTotals = {
  date: string;
  rate: number;
  a1Opening: number;
  a1Closing: number;
  a2Opening: number;
  a2Closing: number;
  a1Sales: number;
  a2Sales: number;
  grossSales: number;
  testing: number;
  netSales: number;
  udharQty: number;
  udharAmt: number;
  cashQty: number;
  cashAmt: number;
  openingCash: number;
  receiptTotal: number;
  incomeTotal: number;
  expenseTotal: number;
  closingCash: number;
  openingStock: number;
  inwardQty: number;
  stockBeforeSales: number;
  closingStock: number;
  saleCount: number;
};
