import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { h as parseDecimal, i as Input, l as cn } from "./router-EZLjD4JU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/number-field-CcQOVouF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NumberField({ value, onCommit, decimals = 2, className, placeholder = "0", disabled, blankZero = false, "aria-label": ariaLabel }) {
	const [text, setText] = (0, import_react.useState)(() => formatShown(value, decimals, blankZero));
	(0, import_react.useEffect)(() => {
		setText(formatShown(value, decimals, blankZero));
	}, [
		value,
		decimals,
		blankZero
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
		inputMode: "decimal",
		autoComplete: "off",
		"aria-label": ariaLabel,
		disabled,
		value: text,
		placeholder,
		onChange: (e) => setText(e.target.value),
		onBlur: () => {
			const parsed = parseDecimal(text);
			if (parsed === null) {
				setText(formatShown(value, decimals, blankZero));
				return;
			}
			onCommit(parsed);
			setText(formatShown(parsed, decimals, blankZero));
		},
		className: cn("tabular text-right font-medium", className)
	});
}
function formatShown(n, decimals, blankZero) {
	if (!Number.isFinite(n)) return "";
	if (blankZero && n === 0) return "";
	return n.toLocaleString("en-IN", {
		maximumFractionDigits: decimals,
		minimumFractionDigits: Number.isInteger(n) ? 0 : Math.min(2, decimals)
	});
}
//#endregion
export { NumberField as t };
