import React from "react";
import { Label } from "./Label.jsx";
/** Venture / editorial plate card — 4px corners, hairline border, exhibit-label metadata. */
export function VentureCard({ label, title, description, cta = "Explore", onClick, image, style }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ borderRadius: "var(--radius-card)", overflow: "hidden", border: `1px solid ${hover ? "var(--rule-strong)" : "var(--rule)"}`, background: "var(--black)", cursor: onClick ? "pointer" : "default",
        display: "flex", flexDirection: "column", transition: "border-color var(--duration-fast) var(--ease-standard)", ...style }}>
      {image && <div style={{ height: "160px", background: image, borderBottom: "1px solid var(--rule)" }} />}
      <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
        {label && <Label color="var(--magenta)">{label}</Label>}
        <div style={{ fontFamily: "var(--font-title)", fontSize: "var(--type-standard-title)", fontWeight: 700, letterSpacing: "0.04em", color: "var(--text-primary)" }}>{title}</div>
        {description && <p style={{ margin: 0, fontSize: "var(--text-body-sm)", color: "var(--text-secondary)", lineHeight: "var(--body-line-height)" }}>{description}</p>}
        <div style={{ marginTop: "auto", paddingTop: "12px", fontFamily: "var(--font-label)", fontSize: "var(--text-label-sm)", letterSpacing: "var(--label-tracking)", textTransform: "uppercase", color: hover ? "var(--text-primary)" : "var(--text-meta)", transition: "color var(--duration-fast) var(--ease-standard)" }}>{cta} ↗</div>
      </div>
    </div>
  );
}
