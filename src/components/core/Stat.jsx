import React from "react";
import { Label } from "./Label.jsx";
/** Numeric display — Modius Extended 800, rules not boxes — "38% / Faster estimate-to-close". */
export function Stat({ value, label, accent = true, size = "var(--text-numeric-lg)", style }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", ...style }}>
      <span style={{ fontFamily: "var(--font-title)", fontWeight: 700, fontSize: size, lineHeight: 0.95, letterSpacing: "0.02em", color: accent ? "var(--magenta)" : "var(--text-primary)" }}>{value}</span>
      <Label color="var(--text-secondary)">{label}</Label>
    </div>
  );
}
