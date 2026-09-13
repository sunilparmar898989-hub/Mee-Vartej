import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { o as Search } from "../_libs/lucide-react.mjs";
import { d as formatInr, i as Input, p as formatQty, v as useHisab } from "./router-EZLjD4JU.mjs";
import { t as Badge } from "./badge-BCiSpzyZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/parties-DczIGdUK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PartiesPage() {
	const parties = useHisab((s) => s.parties);
	const sales = useHisab((s) => s.sales);
	const receipts = useHisab((s) => s.receipts);
	const [q, setQ] = (0, import_react.useState)("");
	const rows = (0, import_react.useMemo)(() => {
		const list = parties.map((p) => {
			const pSales = sales.filter((s) => s.partyId === p.id);
			const qty = pSales.reduce((sum, s) => sum + s.qty, 0);
			const sold = pSales.reduce((sum, s) => sum + s.amount, 0);
			const paid = receipts.filter((r) => r.partyId === p.id).reduce((sum, r) => sum + r.amount, 0);
			return {
				...p,
				qty,
				sold,
				paid,
				balance: sold - paid,
				trips: pSales.length
			};
		});
		return (q.trim() ? list.filter((p) => p.name.toLowerCase().includes(q.trim().toLowerCase())) : list).sort((a, b) => b.balance - a.balance);
	}, [
		parties,
		sales,
		receipts,
		q
	]);
	const totalDue = rows.reduce((s, r) => s + r.balance, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl text-ink",
				children: "પાર્ટી ખાતું"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted mt-0.5",
				children: "ડીઝલ ઉધાર − જમા = બાકી"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 size-4 text-faint" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "પાર્ટી શોધો",
					className: "pl-9"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between px-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-sm text-muted",
					children: [rows.length, " પાર્ટી"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					tone: totalDue > 0 ? "credit" : "forest",
					children: ["કુલ બાકી ", formatInr(totalDue)]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "space-y-2",
				children: [rows.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/parties/$id",
					params: { id: p.id },
					className: "ledger-page rounded-[var(--radius-lg)] px-4 py-3 flex items-center gap-3 hover:bg-surface-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-medium truncate",
							children: p.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-muted mt-0.5",
							children: [
								p.trips,
								" વેચાણ · ",
								formatQty(p.qty),
								" L · જમા ",
								formatInr(p.paid)
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `tabular text-right font-display ${p.balance > 0 ? "text-credit" : "text-forest"}`,
						children: formatInr(p.balance)
					})]
				}) }, p.id)), rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "text-center text-sm text-muted py-10",
					children: "કોઈ પાર્ટી નથી."
				})]
			})
		]
	});
}
//#endregion
export { PartiesPage as component };
