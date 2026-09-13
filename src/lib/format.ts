const WEEKDAYS_GU = [
  "રવિવાર",
  "સોમવાર",
  "મંગળવાર",
  "બુધવાર",
  "ગુરુવાર",
  "શુક્રવાર",
  "શનિવાર",
];

export function formatInr(n: number, withSymbol = true): string {
  const rounded = Math.round(n);
  const negative = rounded < 0;
  const str = Math.abs(rounded).toString();
  const last3 = str.slice(-3);
  const rest = str.slice(0, -3);
  const grouped = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  const body = rest ? `${grouped},${last3}` : last3;
  const sign = negative ? "-" : "";
  return withSymbol ? `${sign}₹${body}` : `${sign}${body}`;
}

export function formatInrPaise(n: number, withSymbol = true): string {
  const negative = n < 0;
  const abs = Math.abs(n);
  const rupees = Math.floor(abs);
  const paise = Math.round((abs - rupees) * 100);
  const rupeeStr = formatInr(rupees, false);
  const body =
    paise === 0 ? rupeeStr : `${rupeeStr}.${paise.toString().padStart(2, "0")}`;
  const sign = negative ? "-" : "";
  return withSymbol ? `${sign}₹${body}` : `${sign}${body}`;
}

export function formatQty(n: number): string {
  const rounded = Math.round(n * 100) / 100;
  const [int, dec] = rounded.toFixed(2).split(".");
  const last3 = int.slice(-3);
  const rest = int.slice(0, -3);
  const grouped = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  const body = rest ? `${grouped},${last3}` : last3;
  if (dec === "00") return body;
  return `${body}.${dec}`;
}

export function formatDateGu(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  const dt = new Date(y, m - 1, d);
  const day = String(d).padStart(2, "0");
  const month = String(m).padStart(2, "0");
  return `${day}/${month}/${y}  ${WEEKDAYS_GU[dt.getDay()]}`;
}

export function formatDateShort(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;
}

export function todayIso(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function addDays(iso: string, days: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d + days);
  const yy = dt.getFullYear();
  const mm = String(dt.getMonth() + 1).padStart(2, "0");
  const dd = String(dt.getDate()).padStart(2, "0");
  return `${yy}-${mm}-${dd}`;
}

export function parseDecimal(raw: string): number | null {
  const cleaned = raw.replace(/,/g, "").replace(/[₹\s]/g, "").trim();
  if (!cleaned) return null;
  const n = Number(cleaned);
  if (!Number.isFinite(n)) return null;
  return n;
}

export function normalizeVehicle(raw: string): string {
  return raw.toUpperCase().replace(/\s+/g, " ").trim();
}
