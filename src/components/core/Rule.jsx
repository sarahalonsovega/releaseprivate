import React from "react";
/** Fine 1px structural rule — the system's core divider. */
export function Rule({ accent = false, vertical = false, length = "100%", onPaper = false, style }) {
  const color = accent ? "var(--magenta)" : onPaper ? "var(--rule-on-paper)" : "var(--rule)";
  return <div aria-hidden="true" style={vertical ? { width: "1px", height: length, background: color, ...style } : { height: "1px", width: length, background: color, ...style }} />;
}
