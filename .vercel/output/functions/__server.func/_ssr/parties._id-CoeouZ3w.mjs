import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { g as ArrowLeft } from "../_libs/lucide-react.mjs";
import { d as formatInr, i as Input, n as Route, p as formatQty, s as Button, u as formatDateShort, v as useHisab } from "./router-EZLjD4JU.mjs";
import { t as Badge } from "./badge-BCiSpzyZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/parties._id-CoeouZ3w.js
var import_jsx_runtime = require_jsx_runtime();
function PartyLedger() {
	const { id } = Route.useParams();
	const party = useHisab((s) => s.parties.find((p) => p.id === id));
	const sales = useHisab((s) => s.sales.filter((s) => s.partyId === id));
	const receipts = useHisab((s) => s.receipts.filter((r) => r.partyId === id));
	const renameParty = useHisab((s) => s.renameParty);
	if (!party) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "py-16 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted",
			children: "પાર્ટી મળી નહીં."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			variant: "secondary",
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/parties",
				children: "પાછા"
			})
		})]
	});
	const sold = sales.reduce((s, x) => s + x.amount, 0);
	const paid = receipts.reduce((s, x) => s + x.amount, 0);
	const qty = sales.reduce((s, x) => s + x.qty, 0);
	const balance = sold - paid;
	const lines = [...sales.map((s) => ({
		id: s.id,
		date: s.date,
		kind: "udhar",
		label: `વેચાણ · ${formatQty(s.qty)} L × ${s.rate}${s.vehicle ? ` · ${s.vehicle}` : ""}`,
		debit: s.amount,
		credit: 0
	})), ...receipts.map((r) => ({
		id: r.id,
		date: r.date,
		kind: "jama",
		label: r.particular,
		debit: 0,
		credit: r.amount
	}))].sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "ghost",
				size: "sm",
				className: "-ml-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/parties",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "બધી પાર્ટી"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ledger-page rounded-[var(--radius-xl)] p-4 sm:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						defaultValue: party.name,
						onBlur: (e) => {
							const v = e.target.value.trim();
							if (v && v !== party.name) renameParty(party.id, v);
						},
						className: "font-display text-lg h-12 border-dashed",
						"aria-label": "પાર્ટીનું નામ"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-3 gap-2 mt-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
								label: "વેચાણ",
								value: formatInr(sold)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
								label: "જમા",
								value: formatInr(paid)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
								label: "બાકી",
								value: formatInr(balance),
								accent: balance > 0
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted mt-3",
						children: [
							"કુલ ",
							formatQty(qty),
							" લિટર ડીઝલ"
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ledger-page rounded-[var(--radius-xl)] overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[5.5rem_1fr_5.5rem_5.5rem] gap-1 px-3 py-2 text-[11px] text-muted bg-bg-recessed/80",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "તારીખ" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "વિગત" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-right",
								children: "ઉધાર"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-right",
								children: "જમા"
							})
						]
					}),
					lines.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-3 py-8 text-center text-sm text-muted",
						children: "એન્ટ્રી નથી."
					}),
					lines.map((ln) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[5.5rem_1fr_5.5rem_5.5rem] gap-1 px-3 py-2.5 border-t border-line/70 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular text-muted text-xs self-center",
								children: formatDateShort(ln.date)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate self-center",
								children: ln.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular text-right text-credit",
								children: ln.debit ? formatInr(ln.debit, false) : ""
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular text-right text-forest",
								children: ln.credit ? formatInr(ln.credit, false) : ""
							})
						]
					}, ln.id)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[5.5rem_1fr_5.5rem_5.5rem] gap-1 px-3 py-3 border-t-2 border-line-strong bg-surface-2 text-sm font-medium",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "બાકી" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular text-right col-span-2 text-credit font-display text-base",
								children: formatInr(balance)
							})
						]
					})
				]
			}),
			balance > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				tone: "credit",
				children: "બાકી ઉધાર"
			}),
			balance <= 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				tone: "forest",
				children: "ખાતું સાફ / જમા"
			})
		]
	});
}
function Mini({ label, value, accent }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[var(--radius-md)] bg-bg-recessed/70 px-2 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[11px] text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `tabular font-medium ${accent ? "text-credit" : "text-ink"}`,
			children: value
		})]
	});
}
//#endregion
export { PartyLedger as component };
