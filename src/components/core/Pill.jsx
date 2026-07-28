import React from "react";
/** Outlined tag — 2px corners (pill geometry never appears). Signal / Power / Human chips, UI tags. */
export function Pill({ children, active = false, color = "var(--magenta)", onClick, style }) {
  const [hover, setHover] = React.useState(false);
  const on = active || hover;
  return (
    <span onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: "inline-block", fontFamily: "var(--font-label)", fontSize: "var(--text-label-sm)", letterSpacing: "var(--label-tracking)", textTransform: "uppercase",
        padding: "5px 14px", borderRadius: "var(--radius-tag)", border: `1px solid ${on ? color : "var(--rule)"}`,
        color: on ? color : "var(--text-secondary)", cursor: onClick ? "pointer" : "default",
        transition: "all var(--duration-fast) var(--ease-standard)", ...style }}>{children}</span>
  );
}
