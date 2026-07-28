import React from "react";
/** Uppercase Modius label — 12px/0.08em, used sparingly (never above every heading) — section markers, dates, categories, metadata. */
export function Label({ children, color = "var(--text-meta)", size = "var(--text-label)", tracking = "var(--label-tracking)", style }) {
  return <span style={{ fontFamily: "var(--font-label)", fontSize: size, letterSpacing: tracking, textTransform: "uppercase", color, ...style }}>{children}</span>;
}
/** Triad metadata line: SIGNAL / POWER / HUMAN. */
export function TriadLabel({ items = ["Signal", "Power", "Human"], color = "var(--magenta)", style }) {
  return (
    <span style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-label-sm)", letterSpacing: "var(--label-tracking-wide)", textTransform: "uppercase", color, ...style }}>
      {items.map((t, i) => <span key={t}>{i > 0 && <span style={{ opacity: 0.5 }}> / </span>}{t}</span>)}
    </span>
  );
}
