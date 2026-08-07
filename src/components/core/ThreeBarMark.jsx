import React from "react";
/** The CUELUM three-bar mark, drawn in CSS so it scales crisply. `color`/`glow`
    transition smoothly (rather than snapping) so the mark can also serve as a
    scroll-revealed emblem — e.g. Home's belief section fades it from a dim
    grey to full glowing white as the section scrolls into view. */
export function ThreeBarMark({ color = "var(--white)", width = 28, glow = false, style }) {
  const bar = Math.round(width / 5.2), gap = Math.round(bar * 0.62);
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", gap, boxShadow: glow ? "var(--glow-signal)" : "none", transition: "box-shadow 1.1s var(--ease-reveal)", ...style }} aria-label="CUELUM mark" role="img">
      {[0, 1, 2].map(i => <div key={i} style={{ width, height: bar, background: color, transition: "background-color 1.1s var(--ease-reveal)" }} />)}
    </div>
  );
}
