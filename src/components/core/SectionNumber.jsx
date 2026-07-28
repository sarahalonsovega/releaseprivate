import React from "react";
/** Numbered chapter marker — "01" + label, per the website inner-section system. */
export function SectionNumber({ number, label, dark = true, style }) {
  const meta = dark ? "var(--text-meta)" : "var(--text-on-paper-secondary)";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", ...style }}>
      <span style={{ fontFamily: "var(--font-title)", fontWeight: 700, fontSize: "18px", letterSpacing: "0.08em", color: "var(--magenta)" }}>{String(number).padStart(2, "0")}</span>
      {label && <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-body-sm)", color: meta }}>{label}</span>}
    </div>
  );
}
