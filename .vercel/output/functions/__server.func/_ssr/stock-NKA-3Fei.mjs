import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as Trash2, c as Plus } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as useDayData, a as Dialog, c as TANKERS, f as formatInrPaise, i as Input, o as DialogContent, p as formatQty, r as Label, s as Button, v as useHisab } from "./router-EZLjD4JU.mjs";
import { t as LedgerRow } from "./ledger-row-BASV8qqM.mjs";
import { t as NumberField } from "./number-field-CcQOVouF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stock-NKA-3Fei.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function StockPage() {
	const { totals, inwards, day } = useDayData();
	const updateDay = useHisab((s) => s.updateDay);
	const setTanker = useHisab((s) => s.setTanker);
	const deleteInward = useHisab((s) => s.deleteInward);
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl text-ink",
				children: "ડીઝલ ટાંકી અને રહેદ"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted mt-0.5",
				children: "A-1 / A-2 મીટર, ટેસ્ટીંગ, ભાવ, ટેન્કર આવક"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "ledger-page rounded-[var(--radius-xl)] p-4 sm:p-5 space-y-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "ભાવ (Rate)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
							value: day?.rate ?? 0,
							decimals: 2,
							onCommit: (n) => updateDay(totals.date, { rate: n })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "ટેસ્ટીંગ લિટર" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
							value: day?.testing ?? 0,
							onCommit: (n) => updateDay(totals.date, { testing: n })
						})]
					})]
				})
			}),
			TANKERS.map((name) => {
				const t = day?.tankers[name] ?? {
					opening: 0,
					closing: 0
				};
				const sales = totals[name === "A-1" ? "a1Sales" : "a2Sales"];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "ledger-page rounded-[var(--radius-xl)] p-4 sm:p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "font-display text-base mb-3",
							children: [name, " ડીઝલ ટાંકી"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "ઓપનીંગ" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
									value: t.opening,
									onCommit: (n) => setTanker(totals.date, name, { opening: n })
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "રીડીંગ" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
									value: t.closing,
									onCommit: (n) => setTanker(totals.date, name, { closing: n })
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerRow, {
								label: `${name} વેચાણ`,
								value: formatQty(sales),
								tone: "forest",
								strong: true,
								hint: "રીડીંગ − ઓપનીંગ"
							})
						})
					]
				}, name);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "ledger-page rounded-[var(--radius-xl)] p-4 sm:p-5 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerRow, {
						label: "કુલ વેચાણ",
						value: formatQty(totals.grossSales)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerRow, {
						label: "ટેસ્ટીંગ",
						value: formatQty(totals.testing)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerRow, {
						label: "કુલ વેચાણ",
						value: formatQty(totals.netSales),
						strong: true,
						rule: true,
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
							children: "ટેન્કર / ઓનલાઈન આવક"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							onClick: () => setOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "આવક"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "mb-1.5 block",
							children: "આડાળનો રહેદ"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
							value: totals.openingStock,
							onCommit: (n) => updateDay(totals.date, { openingStock: n })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: inwards.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-2 px-4 py-2.5 border-t border-line/70",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "truncate font-medium",
								children: i.vehicle || "ટેન્કર"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-muted",
								children: [
									"વજન ",
									formatQty(i.weight),
									" · ",
									formatInrPaise(i.qty, false),
									" L"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon-sm",
							"aria-label": "કાઢો",
							onClick: () => {
								deleteInward(i.id);
								toast.success("કાઢી નાખ્યું");
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5 text-danger" })
						})]
					}, i.id)) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-4 py-3 border-t border-line bg-surface-2 space-y-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerRow, {
								label: "જમા રહેદ",
								value: formatInrPaise(totals.stockBeforeSales, false)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerRow, {
								label: "વેચાણ",
								value: formatInrPaise(totals.netSales, false),
								tone: "credit"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerRow, {
								label: "કુલ જમા રહેદ",
								value: formatInrPaise(totals.closingStock, false),
								strong: true,
								tone: "forest",
								rule: true
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open,
				onOpenChange: setOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
					title: "ડીઝલ ટેન્કર આવક",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InwardForm, { onDone: () => setOpen(false) })
				})
			})
		]
	});
}
function InwardForm({ onDone }) {
	const addInward = useHisab((s) => s.addInward);
	const [vehicle, setVehicle] = (0, import_react.useState)("");
	const [weight, setWeight] = (0, import_react.useState)(0);
	const [qty, setQty] = (0, import_react.useState)(0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "space-y-3 mt-4",
		onSubmit: (e) => {
			e.preventDefault();
			if (qty <= 0) {
				toast.error("લિટર દાખલ કરો");
				return;
			}
			addInward({
				vehicle: vehicle.trim() || "ટેન્કર",
				weight,
				qty
			});
			toast.success("આવક નોંધાઈ");
			onDone();
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "ગાડી નંબર" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: vehicle,
					onChange: (e) => setVehicle(e.target.value),
					placeholder: "GJ12BT2955"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "વજન" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
						value: weight,
						onCommit: setWeight,
						blankZero: true
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "લિટર" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
						value: qty,
						onCommit: setQty,
						blankZero: true
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				className: "w-full",
				children: "ઉમેરો"
			})
		]
	});
}
//#endregion
export { StockPage as component };
