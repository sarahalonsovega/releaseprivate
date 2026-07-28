import React from "react";
/** The CUELUM three-bar mark, drawn in CSS so it scales crisply. */
export function ThreeBarMark({ color = "var(--white)", width = 28, glow = false, style }) {
  const bar = Math.round(width / 5.2), gap = Math.round(bar * 0.62);
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", gap, boxShadow: glow ? "var(--glow-signal)" : "none", ...style }} aria-label="CUELUM mark" role="img">
      {[0, 1, 2].map(i => <div key={i} style={{ width, height: bar, background: color }} />)}
    </div>
  );
}
