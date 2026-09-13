import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as Trash2, c as Plus } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as useDayData, a as Dialog, d as formatInr, i as Input, o as DialogContent, r as Label, s as Button, v as useHisab } from "./router-EZLjD4JU.mjs";
import { t as LedgerRow } from "./ledger-row-BASV8qqM.mjs";
import { t as NumberField } from "./number-field-CcQOVouF.mjs";
import { t as PartyPicker } from "./party-picker-DdZjgBq1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cash-DAslYT2D.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CashPage() {
	const { receipts, expenses, totals } = useDayData();
	const updateDay = useHisab((s) => s.updateDay);
	const deleteReceipt = useHisab((s) => s.deleteReceipt);
	const deleteExpense = useHisab((s) => s.deleteExpense);
	const [kind, setKind] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl text-ink",
				children: "રોકડ ચોપડી"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted mt-0.5",
				children: "પંપની બીલ્ડિંગ, પાર્ટી જમા અને ખર્ચ"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "ledger-page rounded-[var(--radius-xl)] p-4 sm:p-5 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center justify-between",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-base",
							children: "આડાળની બીલ્ડિંગ"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "mb-1.5 block",
								children: "ઓપનીંગ રોકડ"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
								value: totals.openingCash,
								decimals: 0,
								onCommit: (n) => updateDay(totals.date, { openingCash: n }),
								"aria-label": "ઓપનીંગ રોકડ"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-faint mt-1",
								children: "નવો દિવસ ખોલતાં આગલી બીલ્ડિંગ આપોઆપ આવે છે."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerRow, {
						label: "રોકડ વેચાણ",
						value: formatInr(totals.cashAmt),
						tone: "forest"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "ledger-page rounded-[var(--radius-xl)] overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between px-4 py-3 border-b border-line",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-base",
							children: "વધારો · પાર્ટી જમા"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							onClick: () => setKind("in"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "જમા"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [receipts.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "px-4 py-8 text-center text-sm text-muted",
						children: "આજે કોઈ જમા નથી."
					}), receipts.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-2 px-4 py-2.5 border-t border-line/70",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex-1 min-w-0 truncate",
								children: r.particular
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular font-medium",
								children: formatInr(r.amount)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon-sm",
								"aria-label": "કાઢો",
								onClick: () => {
									deleteReceipt(r.id);
									toast.success("કાઢી નાખ્યું");
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5 text-danger" })
							})
						]
					}, r.id))] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-4 py-3 bg-forest-soft/40 border-t border-line",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerRow, {
							label: "કુલ આવક",
							value: formatInr(totals.incomeTotal),
							strong: true,
							tone: "forest"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "ledger-page rounded-[var(--radius-xl)] overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between px-4 py-3 border-b border-line",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-base",
							children: "ખર્ચ"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "secondary",
							onClick: () => setKind("out"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "ખર્ચ"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [expenses.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "px-4 py-8 text-center text-sm text-muted",
						children: "આજે ખર્ચ નથી."
					}), expenses.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-2 px-4 py-2.5 border-t border-line/70",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex-1 min-w-0 truncate",
								children: e.particular
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular font-medium text-danger",
								children: formatInr(e.amount)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon-sm",
								"aria-label": "કાઢો",
								onClick: () => {
									deleteExpense(e.id);
									toast.success("કાઢી નાખ્યું");
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5 text-danger" })
							})
						]
					}, e.id))] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-4 py-3 bg-surface-2 border-t-2 border-line-strong",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerRow, {
							label: "કુલ જમા બાકી",
							value: formatInr(totals.closingCash),
							hint: "કુલ આવક − ખર્ચ",
							strong: true,
							tone: "forest"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: kind !== null,
				onOpenChange: (v) => !v && setKind(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					title: kind === "out" ? "નવો ખર્ચ" : "નવી જમા",
					children: [kind === "in" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReceiptForm, { onDone: () => setKind(null) }), kind === "out" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpenseForm, { onDone: () => setKind(null) })]
				})
			})
		]
	});
}
function ReceiptForm({ onDone }) {
	const addReceipt = useHisab((s) => s.addReceipt);
	const [particular, setParticular] = (0, import_react.useState)("");
	const [amount, setAmount] = (0, import_react.useState)(0);
	const [partyId, setPartyId] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "space-y-3 mt-4",
		onSubmit: (e) => {
			e.preventDefault();
			if (!particular.trim() || amount <= 0) {
				toast.error("વિગત અને રકમ દાખલ કરો");
				return;
			}
			addReceipt({
				particular: particular.trim(),
				amount,
				partyId: partyId || null
			});
			toast.success("જમા નોંધાઈ");
			onDone();
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "વિગત" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: particular,
					onChange: (e) => setParticular(e.target.value),
					placeholder: "કોની પાસેથી?"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "પાર્ટી ખાતું (વૈકલ્પિક)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartyPicker, {
					value: partyId,
					onChange: setPartyId
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "રકમ" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
					value: amount,
					decimals: 0,
					onCommit: setAmount,
					blankZero: true
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				className: "w-full",
				children: "જમા ઉમેરો"
			})
		]
	});
}
function ExpenseForm({ onDone }) {
	const addExpense = useHisab((s) => s.addExpense);
	const [particular, setParticular] = (0, import_react.useState)("");
	const [amount, setAmount] = (0, import_react.useState)(0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "space-y-3 mt-4",
		onSubmit: (e) => {
			e.preventDefault();
			if (!particular.trim() || amount <= 0) {
				toast.error("વિગત અને રકમ દાખલ કરો");
				return;
			}
			addExpense({
				particular: particular.trim(),
				amount
			});
			toast.success("ખર્ચ નોંધાયો");
			onDone();
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "વિગત" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: particular,
					onChange: (e) => setParticular(e.target.value),
					placeholder: "ખર્ચ શેનો?"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "રકમ" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
					value: amount,
					decimals: 0,
					onCommit: setAmount,
					blankZero: true
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				className: "w-full",
				children: "ખર્ચ ઉમેરો"
			})
		]
	});
}
//#endregion
export { CashPage as component };
