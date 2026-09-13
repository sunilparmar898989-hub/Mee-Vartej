import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { l as cn } from "./router-EZLjD4JU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ledger-row-BASV8qqM.js
var import_jsx_runtime = require_jsx_runtime();
function LedgerRow({ label, value, hint, tone = "ink", strong = false, rule = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex items-baseline justify-between gap-3 py-2 min-h-8", rule && "border-t border-line-strong mt-1 pt-2"),
		title: hint,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("text-sm", strong ? "font-medium text-ink" : "text-muted"),
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("tabular text-right font-medium tracking-tight", strong ? "text-base sm:text-lg" : "text-sm sm:text-base", {
				ink: "text-ink",
				forest: "text-forest",
				credit: "text-credit",
				danger: "text-danger",
				muted: "text-muted"
			}[tone]),
			children: value
		})]
	});
}
//#endregion
export { LedgerRow as t };
