import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as Input, l as cn, v as useHisab } from "./router-EZLjD4JU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/party-picker-DdZjgBq1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PartyPicker({ value, onChange, allowCreate = true }) {
	const parties = useHisab((s) => s.parties);
	const addParty = useHisab((s) => s.addParty);
	const selected = parties.find((p) => p.id === value);
	const [query, setQuery] = (0, import_react.useState)(selected?.name ?? "");
	const [open, setOpen] = (0, import_react.useState)(false);
	const matches = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		if (!q) return parties.slice(0, 12);
		return parties.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 12);
	}, [parties, query]);
	const exact = parties.find((p) => p.name === query.trim());
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			value: query,
			placeholder: "પાર્ટીનું નામ લખો",
			"aria-label": "પાર્ટી",
			onFocus: () => setOpen(true),
			onChange: (e) => {
				setQuery(e.target.value);
				setOpen(true);
			},
			onBlur: () => {
				window.setTimeout(() => setOpen(false), 140);
			}
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "absolute z-30 mt-1 w-full max-h-56 overflow-auto rounded-[var(--radius-md)] border border-line bg-surface-2 shadow-[var(--shadow-float)] py-1",
			children: [
				matches.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: cn("w-full text-left px-3 py-2.5 text-sm hover:bg-forest-soft/60", p.id === value && "bg-forest-soft text-forest-2"),
					onMouseDown: (e) => e.preventDefault(),
					onClick: () => {
						onChange(p.id);
						setQuery(p.name);
						setOpen(false);
					},
					children: p.name
				}) }, p.id)),
				allowCreate && query.trim() && !exact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "w-full text-left px-3 py-2.5 text-sm text-forest font-medium hover:bg-forest-soft/60",
					onMouseDown: (e) => e.preventDefault(),
					onClick: () => {
						onChange(addParty(query.trim()));
						setOpen(false);
					},
					children: [
						"નવી પાર્ટી: “",
						query.trim(),
						"”"
					]
				}) }),
				matches.length === 0 && !query.trim() && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "px-3 py-2.5 text-sm text-muted",
					children: "પાર્ટી નથી"
				})
			]
		})]
	});
}
//#endregion
export { PartyPicker as t };
