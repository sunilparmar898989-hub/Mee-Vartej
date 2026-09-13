import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as Trash2, c as Plus, l as Pencil } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as useDayData, a as Dialog, d as formatInr, g as rupee, i as Input, l as cn, m as normalizeVehicle, o as DialogContent, p as formatQty, r as Label, s as Button, v as useHisab } from "./router-EZLjD4JU.mjs";
import { t as NumberField } from "./number-field-CcQOVouF.mjs";
import { t as PartyPicker } from "./party-picker-DdZjgBq1.mjs";
import { t as Badge } from "./badge-BCiSpzyZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sales-CEy7S67l.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function VehicleField({ value, onChange, partyId }) {
	const sales = useHisab((s) => s.sales);
	const [open, setOpen] = (0, import_react.useState)(false);
	const suggestions = (0, import_react.useMemo)(() => {
		const seen = /* @__PURE__ */ new Set();
		const partyFirst = [];
		const rest = [];
		for (let i = sales.length - 1; i >= 0; i--) {
			const row = sales[i];
			const v = (row.vehicle ?? "").trim();
			if (!v || seen.has(v)) continue;
			seen.add(v);
			if (partyId && row.partyId === partyId) partyFirst.push(v);
			else rest.push(v);
		}
		const q = value.trim().toUpperCase();
		const all = [...partyFirst, ...rest];
		if (!q) return all.slice(0, 8);
		return all.filter((v) => v.includes(q)).slice(0, 8);
	}, [
		sales,
		partyId,
		value
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			value,
			placeholder: "GJ12AB1234",
			"aria-label": "ગાડી નંબર",
			autoComplete: "off",
			autoCapitalize: "characters",
			className: "uppercase tracking-wide",
			onFocus: () => setOpen(true),
			onChange: (e) => {
				onChange(normalizeVehicle(e.target.value));
				setOpen(true);
			},
			onBlur: () => {
				window.setTimeout(() => setOpen(false), 140);
			}
		}), open && suggestions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "absolute z-30 mt-1 w-full max-h-48 overflow-auto rounded-[var(--radius-md)] border border-line bg-surface-2 shadow-[var(--shadow-float)] py-1",
			children: suggestions.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: cn("w-full text-left px-3 py-2.5 text-sm tabular tracking-wide hover:bg-forest-soft/60", v === value && "bg-forest-soft text-forest-2"),
				onMouseDown: (e) => e.preventDefault(),
				onClick: () => {
					onChange(v);
					setOpen(false);
				},
				children: v
			}) }, v))
		})]
	});
}
function SaleForm({ onDone }) {
	const selectedDate = useHisab((s) => s.selectedDate);
	const day = useHisab((s) => s.days[s.selectedDate]);
	const addSale = useHisab((s) => s.addSale);
	const [partyId, setPartyId] = (0, import_react.useState)("");
	const [vehicle, setVehicle] = (0, import_react.useState)("");
	const [qty, setQty] = (0, import_react.useState)(0);
	const [rate, setRate] = (0, import_react.useState)(day?.rate ?? 89);
	const amount = rupee(qty * rate);
	(0, import_react.useEffect)(() => {
		if (!partyId) return;
		const last = [...useHisab.getState().sales].reverse().find((s) => s.partyId === partyId && (s.vehicle ?? "").trim());
		setVehicle(last?.vehicle ?? "");
	}, [partyId]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "space-y-3 mt-4",
		onSubmit: (e) => {
			e.preventDefault();
			if (!partyId) {
				toast.error("પાર્ટી પસંદ કરો");
				return;
			}
			if (qty <= 0) {
				toast.error("લિટર દાખલ કરો");
				return;
			}
			addSale({
				partyId,
				qty,
				rate,
				vehicle
			});
			toast.success("વેચાણ નોંધાયું");
			setQty(0);
			setVehicle("");
			onDone?.();
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "પાર્ટી" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartyPicker, {
					value: partyId,
					onChange: setPartyId
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "ગાડી નંબર" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VehicleField, {
					value: vehicle,
					onChange: setVehicle,
					partyId
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "લિટર (Qty)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
						value: qty,
						onCommit: setQty,
						"aria-label": "લિટર",
						blankZero: true
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "ભાવ (Rate)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
						value: rate,
						onCommit: setRate,
						decimals: 2,
						"aria-label": "ભાવ"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[var(--radius-md)] bg-bg-recessed px-3 py-2.5 flex justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm text-muted",
					children: "રકમ"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "tabular font-display text-lg text-ink",
					children: formatInr(amount)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-faint",
				children: [
					qty > 0 ? `${formatQty(qty)} × ${rate} = ${formatInr(amount)}` : "ઉધાર વેચાણ તરીકે નોંધાશે.",
					" · ",
					selectedDate
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				className: "w-full",
				size: "lg",
				children: "ડીઝલ વેચાણ ઉમેરો"
			})
		]
	});
}
function SalesPage() {
	const { sales, parties, totals } = useDayData();
	const deleteSale = useHisab((s) => s.deleteSale);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const nameOf = (id) => parties.find((p) => p.id === id)?.name ?? "—";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl text-ink",
					children: "ડીઝલ ઉધાર વેચાણ"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted mt-0.5",
					children: ["પાર્ટી પ્રમાણે લિટર · ભાવ ₹", totals.rate]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => setOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "નવું"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ledger-page rounded-[var(--radius-xl)] overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[42rem] text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "bg-bg-recessed/80 text-muted text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "text-left font-medium px-3 py-2.5 w-12",
										children: "નં."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "text-right font-medium px-2 py-2.5",
										children: "લિટર"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "text-right font-medium px-2 py-2.5",
										children: "ભાવ"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "text-right font-medium px-2 py-2.5",
										children: "રકમ"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "text-left font-medium px-3 py-2.5",
										children: "પાર્ટી"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "text-left font-medium px-2 py-2.5",
										children: "ગાડી નં."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "w-20" })
								]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [sales.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								colSpan: 7,
								className: "px-3 py-10 text-center text-muted",
								children: "આજે હજુ ડીઝલ વેચાણ નથી. ઉપરથી નવું ઉમેરો."
							}) }), sales.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-t border-line/80 hover:bg-surface-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-3 py-2.5 tabular text-muted",
										children: s.serial
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-2.5 tabular text-right font-medium",
										children: formatQty(s.qty)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-2.5 tabular text-right text-muted",
										children: s.rate
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-2.5 tabular text-right font-medium",
										children: formatInr(s.amount, false)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-3 py-2.5",
										children: nameOf(s.partyId)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-2.5 tabular tracking-wide text-ink-soft",
										children: s.vehicle || "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-1 py-1 text-right",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "icon-sm",
											"aria-label": "ફેરફાર",
											onClick: () => setEditing(s),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3.5" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "icon-sm",
											"aria-label": "કાઢો",
											onClick: () => {
												deleteSale(s.id);
												toast.success("કાઢી નાખ્યું");
											},
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5 text-danger" })
										})]
									})
								]
							}, s.id))] }),
							sales.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tfoot", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-t-2 border-line-strong bg-credit-soft/40",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-3 py-3 font-medium",
										children: "કુલ"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-3 tabular text-right font-display text-base text-credit",
										children: formatQty(totals.udharQty)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-3 tabular text-right font-display text-base",
										children: formatInr(totals.udharAmt, false)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-3 py-3 text-credit text-xs font-medium",
										colSpan: 3,
										children: "ઉધાર વેચાણ"
									})
								]
							}) })
						]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						tone: "credit",
						children: [
							"ઉધાર ",
							formatQty(totals.udharQty),
							" L"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						tone: "forest",
						children: [
							"રોકડ ",
							formatQty(totals.cashQty),
							" L"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: [
						"કુલ ",
						formatQty(totals.netSales),
						" L"
					] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open,
				onOpenChange: setOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
					title: "નવું ડીઝલ વેચાણ",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaleForm, { onDone: () => setOpen(false) })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!editing,
				onOpenChange: (v) => !v && setEditing(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
					title: "વેચાણ ફેરફાર",
					children: editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditSale, {
						sale: editing,
						onDone: () => setEditing(null)
					})
				})
			})
		]
	});
}
function EditSale({ sale, onDone }) {
	const updateSale = useHisab((s) => s.updateSale);
	const [partyId, setPartyId] = (0, import_react.useState)(sale.partyId);
	const [vehicle, setVehicle] = (0, import_react.useState)(sale.vehicle ?? "");
	const [qty, setQty] = (0, import_react.useState)(sale.qty);
	const [rate, setRate] = (0, import_react.useState)(sale.rate);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "space-y-3 mt-4",
		onSubmit: (e) => {
			e.preventDefault();
			updateSale(sale.id, {
				partyId,
				qty,
				rate,
				vehicle
			});
			toast.success("સેવ થયું");
			onDone();
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "પાર્ટી" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartyPicker, {
					value: partyId,
					onChange: setPartyId
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "ગાડી નંબર" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VehicleField, {
					value: vehicle,
					onChange: setVehicle,
					partyId
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "લિટર" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
						value: qty,
						onCommit: setQty,
						blankZero: true
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "ભાવ" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
						value: rate,
						onCommit: setRate
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "tabular text-sm text-muted",
				children: ["રકમ ", formatInr(qty * rate)]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				className: "w-full",
				children: "સેવ"
			})
		]
	});
}
//#endregion
export { SalesPage as component };
