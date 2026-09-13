import { i as __toESM } from "../_runtime.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as createRootRoute, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { d as Cylinder, f as ChevronRight, h as BookOpen, i as TriangleAlert, m as CalendarPlus, n as Wallet, p as ChevronLeft, r as Users, s as RotateCcw, t as X, u as Fuel } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { a as DialogPortal, c as Slot, i as DialogOverlay$1, n as DialogClose, o as DialogTitle, r as DialogContent$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-DidAXAZ9.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function uid(prefix = "id") {
	return `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36).slice(-4)}`;
}
function round2(n) {
	return Math.round(n * 100) / 100;
}
function rupee(n) {
	return Math.round(n);
}
var WEEKDAYS_GU = [
	"રવિવાર",
	"સોમવાર",
	"મંગળવાર",
	"બુધવાર",
	"ગુરુવાર",
	"શુક્રવાર",
	"શનિવાર"
];
function formatInr(n, withSymbol = true) {
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
function formatInrPaise(n, withSymbol = true) {
	const negative = n < 0;
	const abs = Math.abs(n);
	const rupees = Math.floor(abs);
	const paise = Math.round((abs - rupees) * 100);
	const rupeeStr = formatInr(rupees, false);
	const body = paise === 0 ? rupeeStr : `${rupeeStr}.${paise.toString().padStart(2, "0")}`;
	const sign = negative ? "-" : "";
	return withSymbol ? `${sign}₹${body}` : `${sign}${body}`;
}
function formatQty(n) {
	const [int, dec] = (Math.round(n * 100) / 100).toFixed(2).split(".");
	const last3 = int.slice(-3);
	const rest = int.slice(0, -3);
	const grouped = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
	const body = rest ? `${grouped},${last3}` : last3;
	if (dec === "00") return body;
	return `${body}.${dec}`;
}
function formatDateGu(iso) {
	const [y, m, d] = iso.split("-").map(Number);
	if (!y || !m || !d) return iso;
	const dt = new Date(y, m - 1, d);
	return `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}  ${WEEKDAYS_GU[dt.getDay()]}`;
}
function formatDateShort(iso) {
	const [y, m, d] = iso.split("-").map(Number);
	if (!y || !m || !d) return iso;
	return `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;
}
function todayIso() {
	const d = /* @__PURE__ */ new Date();
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function addDays(iso, days) {
	const [y, m, d] = iso.split("-").map(Number);
	const dt = new Date(y, m - 1, d + days);
	return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;
}
function parseDecimal(raw) {
	const cleaned = raw.replace(/,/g, "").replace(/[₹\s]/g, "").trim();
	if (!cleaned) return null;
	const n = Number(cleaned);
	if (!Number.isFinite(n)) return null;
	return n;
}
function normalizeVehicle(raw) {
	return raw.toUpperCase().replace(/\s+/g, " ").trim();
}
var EMPTY_TANKER = {
	opening: 0,
	closing: 0
};
function computeDay(data, date) {
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
	const receiptTotal = data.receipts.filter((r) => r.date === date).reduce((sum, r) => sum + r.amount, 0);
	const expenseTotal = data.expenses.filter((e) => e.date === date).reduce((sum, e) => sum + e.amount, 0);
	const incomeTotal = openingCash + cashAmt + receiptTotal;
	const closingCash = incomeTotal - expenseTotal;
	const inwardQty = round2(data.inwards.filter((i) => i.date === date).reduce((sum, i) => sum + i.qty, 0));
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
		saleCount: daySales.length
	};
}
function previousDate(days, date) {
	const keys = Object.keys(days).filter((d) => d < date).sort();
	return keys.length ? keys[keys.length - 1] : null;
}
function sortedDates(days) {
	return Object.keys(days).sort().reverse();
}
var TANKERS = ["A-1", "A-2"];
var SAMPLE_DATE = "2026-09-09";
var P = {
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
	lv: "p_lv"
};
var parties = [
	{
		id: P.azad,
		name: "આઝાદ ટ્રાન્સપોર્ટ"
	},
	{
		id: P.karmu,
		name: "કર્મુભાઈ બન્ના"
	},
	{
		id: P.gogi,
		name: "ગોગીભાઈ આશાઈ"
	},
	{
		id: P.vaniya,
		name: "વાણીયા"
	},
	{
		id: P.babu,
		name: "બાબુભાઈ ભરવાડ"
	},
	{
		id: P.mataji,
		name: "શ્રી માતાજી ગોપાલજી"
	},
	{
		id: P.bhunde,
		name: "ભૂંડેભાઈ ચાવડા"
	},
	{
		id: P.ld,
		name: "L.D. વાઘડીયા"
	},
	{
		id: P.kuldeep,
		name: "કુલદીપસિંહ નાની વાવેડ"
	},
	{
		id: P.jigneshNayi,
		name: "જીગ્નેશભાઈ (નયી)"
	},
	{
		id: P.dipak,
		name: "દીપકભાઈ મોઢ"
	},
	{
		id: P.rajuKumbhar,
		name: "રાજુભાઈ કુંભારવાસ"
	},
	{
		id: P.yashpal,
		name: "યશપાલ સિંહ ભાણપ"
	},
	{
		id: P.bhagat,
		name: "ભગતભાઈ કુંભારવાસ"
	},
	{
		id: P.ranjan,
		name: "રંજનભાઈ વાઘેલા"
	},
	{
		id: P.rajuMukhi,
		name: "રાજુભાઈ મુખી"
	},
	{
		id: P.krishna,
		name: "કૃષ્ણા ડેરી (દેવભાઈ)"
	},
	{
		id: P.arjun,
		name: "અર્જુનભાઈ"
	},
	{
		id: P.bhima,
		name: "ભીમાભાઈ મોપાડા"
	},
	{
		id: P.raghubha,
		name: "રઘુભા ઝાલા"
	},
	{
		id: P.mahipal,
		name: "મહીપાલસિંહ વાણીયા"
	},
	{
		id: P.jayshri,
		name: "જયશ્રીભાઈ મોપાડા"
	},
	{
		id: P.parth,
		name: "પાર્થ ટ્રાન્સપોર્ટ (મહેકમ)"
	},
	{
		id: P.jigneshGohil,
		name: "જીગ્નેશભાઈ ગોહીલ"
	},
	{
		id: P.raku,
		name: "રાકુભાઈ"
	},
	{
		id: P.dodubha,
		name: "ડોડુભા ગોહીલ"
	},
	{
		id: P.supanlal,
		name: "સુપનલાલ કુંભાર"
	},
	{
		id: P.lv,
		name: "L.V. ટ્રાન્સપોર્ટ"
	}
];
var D = SAMPLE_DATE;
var sales = [
	[
		1,
		320,
		28480,
		P.azad
	],
	[
		2,
		204,
		18156,
		P.karmu
	],
	[
		3,
		163.53,
		14554,
		P.gogi
	],
	[
		4,
		146.54,
		13042,
		P.vaniya
	],
	[
		5,
		170.81,
		15202,
		P.azad
	],
	[
		6,
		207.23,
		18443,
		P.babu
	],
	[
		7,
		123.59,
		10999,
		P.mataji
	],
	[
		8,
		168.87,
		15029,
		P.bhunde
	],
	[
		9,
		332.02,
		29549,
		P.ld
	],
	[
		10,
		288.73,
		25696,
		P.kuldeep
	],
	[
		11,
		268.89,
		23931,
		P.jigneshNayi
	],
	[
		12,
		282.43,
		25136,
		P.dipak
	],
	[
		13,
		361.59,
		32181,
		P.rajuKumbhar
	],
	[
		14,
		166.67,
		14833,
		P.mataji
	],
	[
		15,
		198,
		17622,
		P.yashpal
	],
	[
		16,
		148.38,
		13205,
		P.bhagat
	],
	[
		17,
		228,
		20292,
		P.dipak
	],
	[
		18,
		270.23,
		24050,
		P.ranjan
	],
	[
		19,
		30,
		2670,
		P.rajuMukhi
	],
	[
		20,
		195.43,
		17393,
		P.krishna
	],
	[
		21,
		298.8,
		26593,
		P.arjun
	],
	[
		22,
		233.61,
		20791,
		P.bhima
	],
	[
		23,
		150,
		13350,
		P.raghubha
	],
	[
		24,
		242.28,
		21562,
		P.mahipal
	],
	[
		25,
		262.59,
		23370,
		P.jayshri
	],
	[
		26,
		195,
		17355,
		P.raghubha
	],
	[
		27,
		319.89,
		28470,
		P.dipak
	],
	[
		28,
		247.01,
		21983,
		P.parth
	],
	[
		29,
		200,
		17800,
		P.jigneshGohil
	],
	[
		30,
		166.67,
		14833,
		P.mahipal
	],
	[
		31,
		131.92,
		11740,
		P.azad
	],
	[
		32,
		38.89,
		3461,
		P.raku
	],
	[
		33,
		150,
		13350,
		P.raghubha
	],
	[
		34,
		250,
		22250,
		P.dodubha
	]
].map(([serial, qty, amount, partyId]) => ({
	id: `s_${serial}`,
	date: D,
	serial,
	partyId,
	qty,
	rate: 89,
	amount,
	vehicle: ""
}));
var receipts = [
	{
		id: "r1",
		date: D,
		partyId: P.supanlal,
		particular: "સુપનલાલ કુંભાર",
		amount: 15e4
	},
	{
		id: "r2",
		date: D,
		partyId: P.yashpal,
		particular: "યશપાલ સિંહ ભાણપ",
		amount: 20180
	},
	{
		id: "r3",
		date: D,
		partyId: P.arjun,
		particular: "અર્જુનભાઈ",
		amount: 3e4
	},
	{
		id: "r4",
		date: D,
		partyId: P.lv,
		particular: "L.V. ટ્રાન્સપોર્ટ",
		amount: 1e5
	},
	{
		id: "r5",
		date: D,
		partyId: P.jigneshGohil,
		particular: "જીગ્નેશભાઈ ગોહીલ",
		amount: 17800
	}
];
var expenses = [
	{
		id: "e1",
		date: D,
		particular: "કાનભાઈ આયુર્વેદ ખાતા — Uday Eng.",
		amount: 1e5
	},
	{
		id: "e2",
		date: D,
		particular: "રાંકણાજુ ની ખિલાની ગણતરી (0900)",
		amount: 49312
	},
	{
		id: "e3",
		date: D,
		particular: "રાંકણાજુ ની ખિલાની ગણતરી (9930)",
		amount: 20145
	},
	{
		id: "e4",
		date: D,
		particular: "આ-પાડી",
		amount: 100
	},
	{
		id: "e5",
		date: D,
		particular: "કોરાના ટકાઉપણા",
		amount: 400
	}
];
var inwards = [{
	id: "i1",
	date: D,
	vehicle: "GJ12BT2955",
	weight: 16010,
	qty: 19644
}];
var sampleDay = {
	date: D,
	rate: 89,
	testing: .58,
	openingCash: 877751,
	openingStock: 12832.46,
	tankers: {
		"A-1": {
			opening: 700342.08,
			closing: 706417.88
		},
		"A-2": {
			opening: 488781.05,
			closing: 491808.19
		}
	}
};
var seedData = {
	parties,
	days: { [D]: sampleDay },
	sales,
	receipts,
	expenses,
	inwards
};
function emptyDay(date, prev, prevClosing) {
	return {
		date,
		rate: prev?.rate ?? 89,
		testing: 0,
		openingCash: prevClosing?.cash ?? 0,
		openingStock: prevClosing?.stock ?? 0,
		tankers: {
			"A-1": {
				opening: 0,
				closing: 0
			},
			"A-2": {
				opening: 0,
				closing: 0
			}
		}
	};
}
var useHisab = create()(persist((set, get) => ({
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
		const prev = prevKey ? state.days[prevKey] : void 0;
		let prevClosing;
		if (prevKey) {
			const t = computeDay(state, prevKey);
			prevClosing = {
				cash: t.closingCash,
				stock: t.closingStock
			};
		}
		set({ days: {
			...state.days,
			[date]: emptyDay(date, prev, prevClosing)
		} });
	},
	updateDay: (date, patch) => {
		const state = get();
		const current = state.days[date] ?? emptyDay(date);
		set({ days: {
			...state.days,
			[date]: {
				...current,
				...patch,
				date
			}
		} });
	},
	setTanker: (date, name, patch) => {
		const state = get();
		const current = state.days[date] ?? emptyDay(date);
		set({ days: {
			...state.days,
			[date]: {
				...current,
				tankers: {
					...current.tankers,
					[name]: {
						...current.tankers[name],
						...patch
					}
				}
			}
		} });
	},
	addParty: (name) => {
		const trimmed = name.trim();
		const existing = get().parties.find((p) => p.name === trimmed);
		if (existing) return existing.id;
		const id = uid("p");
		set({ parties: [...get().parties, {
			id,
			name: trimmed
		}] });
		return id;
	},
	renameParty: (id, name) => {
		set({ parties: get().parties.map((p) => p.id === id ? {
			...p,
			name: name.trim()
		} : p) });
	},
	addSale: ({ partyId, qty, rate, vehicle }) => {
		const state = get();
		const date = state.selectedDate;
		state.ensureDay(date);
		const day = get().days[date];
		const usedRate = rate ?? day?.rate ?? 89;
		const serial = get().sales.filter((s) => s.date === date).reduce((max, s) => Math.max(max, s.serial), 0) + 1;
		const sale = {
			id: uid("s"),
			date,
			serial,
			partyId,
			qty,
			rate: usedRate,
			amount: rupee(qty * usedRate),
			vehicle: normalizeVehicle(vehicle ?? "")
		};
		set({ sales: [...get().sales, sale] });
	},
	updateSale: (id, patch) => {
		set({ sales: get().sales.map((s) => {
			if (s.id !== id) return s;
			const next = {
				...s,
				...patch
			};
			if (patch.vehicle !== void 0) next.vehicle = normalizeVehicle(patch.vehicle);
			if (patch.qty !== void 0 || patch.rate !== void 0) next.amount = rupee(next.qty * next.rate);
			return next;
		}) });
	},
	deleteSale: (id) => set({ sales: get().sales.filter((s) => s.id !== id) }),
	addReceipt: ({ particular, amount, partyId }) => {
		const date = get().selectedDate;
		get().ensureDay(date);
		const row = {
			id: uid("r"),
			date,
			particular,
			amount,
			partyId: partyId ?? null
		};
		set({ receipts: [...get().receipts, row] });
	},
	updateReceipt: (id, patch) => {
		set({ receipts: get().receipts.map((r) => r.id === id ? {
			...r,
			...patch
		} : r) });
	},
	deleteReceipt: (id) => set({ receipts: get().receipts.filter((r) => r.id !== id) }),
	addExpense: ({ particular, amount }) => {
		const date = get().selectedDate;
		get().ensureDay(date);
		const row = {
			id: uid("e"),
			date,
			particular,
			amount
		};
		set({ expenses: [...get().expenses, row] });
	},
	updateExpense: (id, patch) => {
		set({ expenses: get().expenses.map((e) => e.id === id ? {
			...e,
			...patch
		} : e) });
	},
	deleteExpense: (id) => set({ expenses: get().expenses.filter((e) => e.id !== id) }),
	addInward: ({ vehicle, weight, qty }) => {
		const date = get().selectedDate;
		get().ensureDay(date);
		const row = {
			id: uid("i"),
			date,
			vehicle,
			weight,
			qty
		};
		set({ inwards: [...get().inwards, row] });
	},
	updateInward: (id, patch) => {
		set({ inwards: get().inwards.map((i) => i.id === id ? {
			...i,
			...patch
		} : i) });
	},
	deleteInward: (id) => set({ inwards: get().inwards.filter((i) => i.id !== id) }),
	resetSample: () => set({
		...seedData,
		selectedDate: SAMPLE_DATE
	})
}), {
	name: "rojmel-hisab-v1",
	skipHydration: true,
	partialize: (state) => ({
		parties: state.parties,
		days: state.days,
		sales: state.sales,
		receipts: state.receipts,
		expenses: state.expenses,
		inwards: state.inwards,
		selectedDate: state.selectedDate
	})
}));
function useDayData() {
	const selectedDate = useHisab((s) => s.selectedDate);
	const parties = useHisab((s) => s.parties);
	const days = useHisab((s) => s.days);
	const sales = useHisab((s) => s.sales);
	const receipts = useHisab((s) => s.receipts);
	const expenses = useHisab((s) => s.expenses);
	const inwards = useHisab((s) => s.inwards);
	const totals = computeDay({
		parties,
		days,
		sales,
		receipts,
		expenses,
		inwards
	}, selectedDate);
	return {
		date: selectedDate,
		day: days[selectedDate],
		parties,
		sales: sales.filter((s) => s.date === selectedDate).sort((a, b) => a.serial - b.serial),
		receipts: receipts.filter((r) => r.date === selectedDate),
		expenses: expenses.filter((e) => e.date === selectedDate),
		inwards: inwards.filter((i) => i.date === selectedDate),
		totals
	};
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-EZLjD4JU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors duration-150 disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			primary: "bg-forest text-surface-2 hover:bg-forest-2 active:scale-[0.98]",
			secondary: "bg-surface-2 text-ink border border-line hover:bg-bg-recessed",
			ghost: "text-ink-soft hover:bg-bg-recessed hover:text-ink",
			danger: "bg-danger text-surface-2 hover:bg-rule",
			outline: "border border-forest/30 text-forest bg-forest-soft/40 hover:bg-forest-soft"
		},
		size: {
			sm: "h-9 px-3 text-sm rounded-[var(--radius-sm)]",
			md: "h-11 px-4 text-sm rounded-[var(--radius-md)]",
			lg: "h-12 px-5 text-base rounded-[var(--radius-md)]",
			icon: "size-11 rounded-[var(--radius-md)]",
			"icon-sm": "size-9 rounded-[var(--radius-sm)]"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
var Dialog = Dialog$1;
function DialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
		className: cn("fixed inset-0 z-50 bg-ink/40", className),
		...props
	});
}
function DialogContent({ className, children, title, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("fixed z-50 left-1/2 top-1/2 w-[min(100%-1.5rem,28rem)] -translate-x-1/2 -translate-y-1/2", "rounded-[var(--radius-xl)] border border-line bg-surface p-5 shadow-[var(--shadow-float)]", "max-h-[min(90dvh,40rem)] overflow-y-auto", className),
		...props,
		children: [
			title ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				className: "font-display text-lg text-ink pr-8",
				children: title
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				className: "sr-only",
				children: "સંવાદ"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
				className: "absolute right-3 top-3 size-9 inline-flex items-center justify-center rounded-[var(--radius-sm)] text-muted hover:bg-bg-recessed hover:text-ink",
				"aria-label": "બંધ",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
			}),
			children
		]
	})] });
}
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("flex h-11 w-full rounded-[var(--radius-sm)] border border-line bg-surface-2 px-3 text-base text-ink shadow-none", "placeholder:text-faint", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40 focus-visible:border-forest", "disabled:opacity-50", className),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("text-sm font-medium text-ink-soft", className),
		...props
	});
}
function DateBar() {
	const selectedDate = useHisab((s) => s.selectedDate);
	const setSelectedDate = useHisab((s) => s.setSelectedDate);
	const days = useHisab((s) => s.days);
	const resetSample = useHisab((s) => s.resetSample);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [draft, setDraft] = (0, import_react.useState)(selectedDate);
	const known = sortedDates(days);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				size: "icon",
				"aria-label": "પાછલો દિવસ",
				onClick: () => setSelectedDate(addDays(selectedDate, -1)),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => {
					setDraft(selectedDate);
					setOpen(true);
				},
				className: "flex-1 min-w-0 h-11 rounded-[var(--radius-md)] border border-line bg-surface-2 px-3 text-left hover:bg-bg-recessed",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[11px] uppercase tracking-wide text-faint leading-none",
					children: "તારીખ"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-display text-sm text-ink truncate leading-tight mt-0.5",
					children: formatDateGu(selectedDate)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				size: "icon",
				"aria-label": "આગળનો દિવસ",
				onClick: () => setSelectedDate(addDays(selectedDate, 1)),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				size: "icon",
				"aria-label": "નવો દિવસ",
				onClick: () => {
					setDraft(todayIso());
					setOpen(true);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarPlus, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open,
				onOpenChange: setOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
					title: "દિવસ પસંદ કરો",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "pick-date",
										children: "તારીખ"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "pick-date",
										type: "date",
										value: draft,
										onChange: (e) => setDraft(e.target.value)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted",
										children: "નવી તારીખ ખોલતાં આગલા દિવસની બીલ્ડિંગ અને રહેદ આપોઆપ આવશે."
									})
								]
							}),
							known.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium text-muted mb-2",
								children: "નોંધાયેલા દિવસો"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1.5",
								children: known.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										setSelectedDate(d);
										setOpen(false);
									},
									className: "h-9 px-3 rounded-full border border-line text-xs bg-surface-2 hover:bg-forest-soft",
									children: formatDateGu(d).split("  ")[0]
								}, d))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2 pt-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									className: "flex-1",
									onClick: () => {
										if (draft) {
											setSelectedDate(draft);
											setOpen(false);
										}
									},
									children: "ખોલો"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "ghost",
									onClick: () => {
										if (window.confirm("નમૂનો દિવસ (09/09/2026) ફરી લોડ કરવો? હાલની એન્ટ્રીઓ મિટી જશે.")) {
											resetSample();
											setOpen(false);
										}
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), "નમૂનો"]
								})]
							})
						]
					})
				})
			})
		]
	});
}
var NAV = [
	{
		to: "/",
		label: "રોજમેળ",
		icon: BookOpen
	},
	{
		to: "/sales",
		label: "વેચાણ",
		icon: Fuel
	},
	{
		to: "/cash",
		label: "રોકડ",
		icon: Wallet
	},
	{
		to: "/parties",
		label: "પાર્ટી",
		icon: Users
	},
	{
		to: "/stock",
		label: "ટાંકી",
		icon: Cylinder
	}
];
function AppShell({ children }) {
	(0, import_react.useEffect)(() => {
		Promise.resolve(useHisab.persist.rehydrate());
	}, []);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-ink flex flex-col lg:flex-row",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "hidden lg:flex lg:w-60 lg:flex-col lg:border-r lg:border-line bg-surface",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex-1 p-3 space-y-1",
						children: NAV.map((item) => {
							const active = isActive(pathname, item.to);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: cn("flex items-center gap-3 h-11 px-3 rounded-[var(--radius-md)] text-sm font-medium", active ? "bg-forest text-surface-2" : "text-ink-soft hover:bg-bg-recessed"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-4" }), item.label]
							}, item.to);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-5 pb-5 text-xs text-faint leading-relaxed",
						children: "ડીઝલ પંપ — ઉધાર, રોકડ, ટાંકી અને રહેદનો રોજનો હિસાબ."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 flex flex-col min-w-0 pb-[4.5rem] lg:pb-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "sticky top-0 z-20 border-b border-line bg-surface/95 backdrop-blur-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, { compact: true })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-3 py-2.5 sm:px-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateBar, {})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1 px-3 py-4 sm:px-5 sm:py-6 max-w-6xl w-full mx-auto",
					children
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "lg:hidden fixed bottom-0 inset-x-0 z-30 border-t border-line bg-surface/95 backdrop-blur-sm pb-[env(safe-area-inset-bottom)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid grid-cols-5",
					children: NAV.map((item) => {
						const active = isActive(pathname, item.to);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: cn("flex flex-col items-center justify-center gap-0.5 h-14 text-[11px] font-medium", active ? "text-forest" : "text-muted"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-5" }), item.label]
						}) }, item.to);
					})
				})
			})
		]
	});
}
function isActive(pathname, to) {
	if (to === "/") return pathname === "/";
	return pathname === to || pathname.startsWith(`${to}/`);
}
function Brand({ compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("px-4", compact ? "pt-4 pb-1" : "pt-6 pb-4"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-center text-[10px] tracking-[0.35em] text-rule font-medium",
				children: "॥ શ્રી ગણેશાય નમઃ ॥"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: cn("text-center font-display text-forest-2", compact ? "text-xl mt-0.5" : "text-2xl mt-1"),
				children: "રોજમેળ"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("text-center text-muted", compact ? "text-[11px] mt-0" : "text-xs mt-1"),
				children: "ડીઝલ પંપ હિસાબ"
			})
		]
	});
}
var styles_default = "/assets/styles-DK73Ig4m.css";
var APP_NAME = "રોજમેળ";
var Route$6 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#245544"
			},
			{
				name: "description",
				content: "ડીઝલ પંપ — ઉધાર વેચાણ, રોકડ, ટાંકી રીડીંગ અને રહેદનો રોજનો હિસાબ"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Noto+Sans+Gujarati:wght@400;500;600;700&family=Noto+Serif+Gujarati:wght@500;600;700&display=swap"
			}
		]
	}),
	component: Root
});
function Root() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "gu",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "antialiased",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
					position: "top-center",
					toastOptions: { className: "font-[Noto_Sans_Gujarati] text-sm" }
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
var $$splitComponentImporter$5 = () => import("./routes-BMAc53im.mjs");
var Route$5 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./cash-DAslYT2D.mjs");
var Route$4 = createFileRoute("/cash")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./parties-DczIGdUK.mjs");
var Route$3 = createFileRoute("/parties")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./sales-CEy7S67l.mjs");
var Route$2 = createFileRoute("/sales")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./stock-NKA-3Fei.mjs");
var Route$1 = createFileRoute("/stock")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./parties._id-CoeouZ3w.mjs");
var Route = createFileRoute("/parties/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$5.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$6
});
var CashRoute = Route$4.update({
	id: "/cash",
	path: "/cash",
	getParentRoute: () => Route$6
});
var PartiesRoute = Route$3.update({
	id: "/parties",
	path: "/parties",
	getParentRoute: () => Route$6
});
var SalesRoute = Route$2.update({
	id: "/sales",
	path: "/sales",
	getParentRoute: () => Route$6
});
var StockRoute = Route$1.update({
	id: "/stock",
	path: "/stock",
	getParentRoute: () => Route$6
});
var PartiesRouteChildren = { PartiesIdRoute: Route.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => PartiesRoute
}) };
var rootRouteChildren = {
	IndexRoute,
	CashRoute,
	PartiesRoute: PartiesRoute._addFileChildren(PartiesRouteChildren),
	SalesRoute,
	StockRoute
};
var routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { useDayData as _, Dialog as a, TANKERS as c, formatInr as d, formatInrPaise as f, rupee as g, parseDecimal as h, Input as i, cn as l, normalizeVehicle as m, Route as n, DialogContent as o, formatQty as p, Label as r, Button as s, router_exports as t, formatDateShort as u, useHisab as v };
