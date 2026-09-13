import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { l as cn } from "./router-EZLjD4JU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-BCiSpzyZ.js
var import_jsx_runtime = require_jsx_runtime();
function Badge({ className, tone = "muted", children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", {
			muted: "bg-bg-recessed text-muted",
			forest: "bg-forest-soft text-forest-2",
			credit: "bg-credit-soft text-credit",
			danger: "bg-danger-soft text-danger"
		}[tone], className),
		children
	});
}
//#endregion
export { Badge as t };
