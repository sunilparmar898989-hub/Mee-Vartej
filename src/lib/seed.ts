import type { DayRecord, Expense, HisabData, Inward, Party, Receipt, Sale } from "./types";

export const SAMPLE_DATE = "2026-09-09";

const P = {
  azad: "p_azad",
  karmu: "p_karmu",
  gogi: "p_gogi",
  vaniya: "p_vaniya",
  babu: "p_babu",
  mataji: "p_mataji",
  bhunde: "p_bhunde",
  ld: "p_ld",
  kuldeep: "p_kuldeep",
  jigneshNayi: "p_jignesh_nayi",
  dipak: "p_dipak",
  rajuKumbhar: "p_raju_kumbhar",
  yashpal: "p_yashpal",
  bhagat: "p_bhagat",
  ranjan: "p_ranjan",
  rajuMukhi: "p_raju_mukhi",
  krishna: "p_krishna",
  arjun: "p_arjun",
  bhima: "p_bhima",
  raghubha: "p_raghubha",
  mahipal: "p_mahipal",
  jayshri: "p_jayshri",
  parth: "p_parth",
  jigneshGohil: "p_jignesh_gohil",
  raku: "p_raku",
  dodubha: "p_dodubha",
  supanlal: "p_supanlal",
  lv: "p_lv",
} as const;

export const parties: Party[] = [
  { id: P.azad, name: "આઝાદ ટ્રાન્સપોર્ટ" },
  { id: P.karmu, name: "કર્મુભાઈ બન્ના" },
  { id: P.gogi, name: "ગોગીભાઈ આશાઈ" },
  { id: P.vaniya, name: "વાણીયા" },
  { id: P.babu, name: "બાબુભાઈ ભરવાડ" },
  { id: P.mataji, name: "શ્રી માતાજી ગોપાલજી" },
  { id: P.bhunde, name: "ભૂંડેભાઈ ચાવડા" },
  { id: P.ld, name: "L.D. વાઘડીયા" },
  { id: P.kuldeep, name: "કુલદીપસિંહ નાની વાવેડ" },
  { id: P.jigneshNayi, name: "જીગ્નેશભાઈ (નયી)" },
  { id: P.dipak, name: "દીપકભાઈ મોઢ" },
  { id: P.rajuKumbhar, name: "રાજુભાઈ કુંભારવાસ" },
  { id: P.yashpal, name: "યશપાલ સિંહ ભાણપ" },
  { id: P.bhagat, name: "ભગતભાઈ કુંભારવાસ" },
  { id: P.ranjan, name: "રંજનભાઈ વાઘેલા" },
  { id: P.rajuMukhi, name: "રાજુભાઈ મુખી" },
  { id: P.krishna, name: "કૃષ્ણા ડેરી (દેવભાઈ)" },
  { id: P.arjun, name: "અર્જુનભાઈ" },
  { id: P.bhima, name: "ભીમાભાઈ મોપાડા" },
  { id: P.raghubha, name: "રઘુભા ઝાલા" },
  { id: P.mahipal, name: "મહીપાલસિંહ વાણીયા" },
  { id: P.jayshri, name: "જયશ્રીભાઈ મોપાડા" },
  { id: P.parth, name: "પાર્થ ટ્રાન્સપોર્ટ (મહેકમ)" },
  { id: P.jigneshGohil, name: "જીગ્નેશભાઈ ગોહીલ" },
  { id: P.raku, name: "રાકુભાઈ" },
  { id: P.dodubha, name: "ડોડુભા ગોહીલ" },
  { id: P.supanlal, name: "સુપનલાલ કુંભાર" },
  { id: P.lv, name: "L.V. ટ્રાન્સપોર્ટ" },
];

const D = SAMPLE_DATE;

const saleRows: Array<[number, number, number, string]> = [
  [1, 320, 28480, P.azad],
  [2, 204, 18156, P.karmu],
  [3, 163.53, 14554, P.gogi],
  [4, 146.54, 13042, P.vaniya],
  [5, 170.81, 15202, P.azad],
  [6, 207.23, 18443, P.babu],
  [7, 123.59, 10999, P.mataji],
  [8, 168.87, 15029, P.bhunde],
  [9, 332.02, 29549, P.ld],
  [10, 288.73, 25696, P.kuldeep],
  [11, 268.89, 23931, P.jigneshNayi],
  [12, 282.43, 25136, P.dipak],
  [13, 361.59, 32181, P.rajuKumbhar],
  [14, 166.67, 14833, P.mataji],
  [15, 198, 17622, P.yashpal],
  [16, 148.38, 13205, P.bhagat],
  [17, 228, 20292, P.dipak],
  [18, 270.23, 24050, P.ranjan],
  [19, 30, 2670, P.rajuMukhi],
  [20, 195.43, 17393, P.krishna],
  [21, 298.8, 26593, P.arjun],
  [22, 233.61, 20791, P.bhima],
  [23, 150, 13350, P.raghubha],
  [24, 242.28, 21562, P.mahipal],
  [25, 262.59, 23370, P.jayshri],
  [26, 195, 17355, P.raghubha],
  [27, 319.89, 28470, P.dipak],
  [28, 247.01, 21983, P.parth],
  [29, 200, 17800, P.jigneshGohil],
  [30, 166.67, 14833, P.mahipal],
  [31, 131.92, 11740, P.azad],
  [32, 38.89, 3461, P.raku],
  [33, 150, 13350, P.raghubha],
  [34, 250, 22250, P.dodubha],
];

export const sales: Sale[] = saleRows.map(([serial, qty, amount, partyId]) => ({
  id: `s_${serial}`,
  date: D,
  serial,
  partyId,
  qty,
  rate: 89,
  amount,
  vehicle: "",
}));

export const receipts: Receipt[] = [
  { id: "r1", date: D, partyId: P.supanlal, particular: "સુપનલાલ કુંભાર", amount: 150000 },
  { id: "r2", date: D, partyId: P.yashpal, particular: "યશપાલ સિંહ ભાણપ", amount: 20180 },
  { id: "r3", date: D, partyId: P.arjun, particular: "અર્જુનભાઈ", amount: 30000 },
  { id: "r4", date: D, partyId: P.lv, particular: "L.V. ટ્રાન્સપોર્ટ", amount: 100000 },
  { id: "r5", date: D, partyId: P.jigneshGohil, particular: "જીગ્નેશભાઈ ગોહીલ", amount: 17800 },
];

export const expenses: Expense[] = [
  { id: "e1", date: D, particular: "કાનભાઈ આયુર્વેદ ખાતા — Uday Eng.", amount: 100000 },
  { id: "e2", date: D, particular: "રાંકણાજુ ની ખિલાની ગણતરી (0900)", amount: 49312 },
  { id: "e3", date: D, particular: "રાંકણાજુ ની ખિલાની ગણતરી (9930)", amount: 20145 },
  { id: "e4", date: D, particular: "આ-પાડી", amount: 100 },
  { id: "e5", date: D, particular: "કોરાના ટકાઉપણા", amount: 400 },
];

export const inwards: Inward[] = [
  { id: "i1", date: D, vehicle: "GJ12BT2955", weight: 16010, qty: 19644 },
];

const sampleDay: DayRecord = {
  date: D,
  rate: 89,
  testing: 0.58,
  openingCash: 877751,
  openingStock: 12832.46,
  tankers: {
    "A-1": { opening: 700342.08, closing: 706417.88 },
    "A-2": { opening: 488781.05, closing: 491808.19 },
  },
};

export const seedData: HisabData = {
  parties,
  days: { [D]: sampleDay },
  sales,
  receipts,
  expenses,
  inwards,
};
