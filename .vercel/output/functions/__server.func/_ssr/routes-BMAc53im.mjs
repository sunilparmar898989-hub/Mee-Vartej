import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as Plus } from "../_libs/lucide-react.mjs";
import { _ as useDayData, d as formatInr, f as formatInrPaise, p as formatQty, s as Button } from "./router-EZLjD4JU.mjs";
import { t as LedgerRow } from "./ledger-row-BASV8qqM.mjs";
import { t as Badge } from "./badge-BCiSpzyZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BMAc53im.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const { totals, receipts, expenses, inwards, sales } = useDayData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-[0.2em] text-rule",
						children: "॥ લાલ ॥  ॥ શુભ ॥"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl text-ink mt-1",
						children: "આજનો હિસાબ"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted mt-0.5",
						children: [
							"ડીઝલ પંપ · ભાવ ₹",
							totals.rate,
							"/L"
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/sales",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "વેચાણ"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "ledger-page rounded-[var(--radius-xl)] p-4 sm:p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-base text-forest-2 mb-1",
							children: "ડીઝલ ટાંકી · વેચાણ"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted mb-3",
							children: "A-1 / A-2 મીટર રીડીંગ પ્રમાણે લિટર"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TankerBlock, {
							name: "A-1",
							opening: totals.a1Opening,
							closing: totals.a1Closing,
							sales: totals.a1Sales
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TankerBlock, {
							name: "A-2",
							opening: totals.a2Opening,
							closing: totals.a2Closing,
							sales: totals.a2Sales
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerRow, {
							label: "કુલ વેચાણ",
							value: formatQty(totals.grossSales),
							hint: "A-1 + A-2",
							strong: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerRow, {
							label: "ટેસ્ટીંગ",
							value: formatQty(totals.testing),
							tone: "muted"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerRow, {
							label: "કુલ વેચાણ",
							value: formatQty(totals.netSales),
							hint: "કુલ − ટેસ્ટીંગ",
							strong: true,
							rule: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerRow, {
							label: `ઉધાર (${totals.saleCount} પાર્ટી)`,
							value: formatQty(totals.udharQty),
							tone: "credit"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerRow, {
							label: "રોકડ",
							value: formatQty(totals.cashQty),
							tone: "forest"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerRow, {
							label: `× ${totals.rate} જમા રોકડ વેચાણ`,
							value: formatInr(totals.cashAmt),
							hint: `${formatQty(totals.cashQty)} × ${totals.rate}`,
							strong: true,
							tone: "forest",
							rule: true
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "ledger-page rounded-[var(--radius-xl)] p-4 sm:p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-base text-forest-2",
								children: "વધારો · આવક"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "forest",
								children: "બીલ્ડિંગ"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerRow, {
							label: "આડાળની બીલ્ડિંગ",
							value: formatInr(totals.openingCash)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerRow, {
							label: "રોકડ વેચાણ",
							value: formatInr(totals.cashAmt),
							tone: "forest"
						}),
						receipts.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerRow, {
							label: r.particular,
							value: formatInr(r.amount)
						}, r.id)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerRow, {
							label: "કુલ આવક",
							value: formatInr(totals.incomeTotal),
							strong: true,
							rule: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-base text-forest-2 mt-5 mb-2",
							children: "ખર્ચ"
						}),
						expenses.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted py-2",
							children: "આજે ખર્ચ નથી."
						}),
						expenses.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerRow, {
							label: e.particular,
							value: formatInr(e.amount),
							tone: "danger"
						}, e.id)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerRow, {
							label: "કુલ જમા બાકી",
							value: formatInr(totals.closingCash),
							hint: "કુલ આવક − ખર્ચ",
							strong: true,
							tone: "forest",
							rule: true
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "ledger-page rounded-[var(--radius-xl)] p-4 sm:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-base text-forest-2 mb-2",
						children: "રહેદ · ડીઝલ સ્ટોક"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerRow, {
						label: "આડાળનો રહેદ",
						value: formatInrPaise(totals.openingStock, false)
					}),
					inwards.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerRow, {
						label: `ઓનલાઈન ${i.vehicle}${i.weight ? `  વજન ${formatQty(i.weight)}` : ""}`,
						value: formatInrPaise(i.qty, false)
					}, i.id)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerRow, {
						label: "જમા રહેદ",
						value: formatInrPaise(totals.stockBeforeSales, false),
						strong: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerRow, {
						label: "વેચાણ",
						value: formatInrPaise(totals.netSales, false),
						tone: "credit"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerRow, {
						label: "કુલ જમા રહેદ",
						value: formatInrPaise(totals.closingStock, false),
						hint: "આડાળ + ઓનલાઈન − વેચાણ",
						strong: true,
						tone: "forest",
						rule: true
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid grid-cols-2 sm:grid-cols-4 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "કુલ ડીઝલ",
						value: `${formatQty(totals.netSales)} L`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "ઉધાર",
						value: formatInr(totals.udharAmt),
						tone: "credit"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "રોકડ વેચાણ",
						value: formatInr(totals.cashAmt),
						tone: "forest"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "બીલ્ડિંગ",
						value: formatInr(totals.closingCash)
					})
				]
			}),
			sales.length === 0 && totals.netSales === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-center text-sm text-muted py-6",
				children: "આ દિવસે હજુ એન્ટ્રી નથી. ડીઝલ વેચાણ અથવા ટાંકી રીડીંગ નાખો."
			})
		]
	});
}
function TankerBlock({ name, opening, closing, sales }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-3 pb-2 border-b border-line/80",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 mb-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-sm text-ink",
					children: name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[11px] text-faint",
					children: "રીડીંગ"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerRow, {
				label: "રીડીંગ",
				value: formatInrPaise(closing, false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerRow, {
				label: "ઓપનીંગ",
				value: formatInrPaise(opening, false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerRow, {
				label: `${name} વેચાણ`,
				value: formatQty(sales),
				hint: `${formatInrPaise(closing, false)} − ${formatInrPaise(opening, false)}`,
				tone: "forest",
				strong: true
			})
		]
	});
}
function Stat({ label, value, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[var(--radius-lg)] border border-line bg-surface px-3 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[11px] text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `tabular font-display text-lg mt-0.5 ${tone === "credit" ? "text-credit" : tone === "forest" ? "text-forest" : "text-ink"}`,
			children: value
		})]
	});
}
//#endregion
export { Home as component };
