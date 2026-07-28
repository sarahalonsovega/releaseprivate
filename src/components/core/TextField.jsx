import React from "react";
/** Minimal underlined form field — the Vexa contact form language. */
export function TextField({ label, placeholder, value, onChange, multiline = false, required = false, error, style }) {
  const [focus, setFocus] = React.useState(false);
  const invalid = Boolean(error);
  const field = { width: "100%", boxSizing: "border-box", background: "transparent", border: "none",
    borderBottom: `1px solid ${invalid ? "var(--magenta-bright)" : focus ? "var(--magenta)" : "var(--rule)"}`,
    padding: "10px 0", fontFamily: "var(--font-sans)", fontSize: "var(--text-body)", color: "var(--text-primary)", outline: "none",
    transition: "border-color var(--duration-fast) var(--ease-standard)", resize: "vertical" };
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: "6px", ...style }}>
      {label && <span style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-label-sm)", letterSpacing: "var(--label-tracking)", textTransform: "uppercase", color: invalid ? "var(--magenta-bright)" : focus ? "var(--magenta)" : "var(--text-meta)", transition: "color var(--duration-fast) var(--ease-standard)" }}>{label}{required && " *"}</span>}
      {multiline
        ? <textarea rows={3} style={field} placeholder={placeholder} value={value} onChange={onChange} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} aria-invalid={invalid || undefined} required={required} />
        : <input style={field} placeholder={placeholder} value={value} onChange={onChange} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} aria-invalid={invalid || undefined} required={required} />}
      {invalid && <span role="alert" style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-body-sm)", color: "var(--magenta-bright)" }}>{error}</span>}
    </label>
  );
}
