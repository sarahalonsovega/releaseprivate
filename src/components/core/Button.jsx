import React from "react";
/** CUELUM CTA button — 3px corners, uppercase Modius label, magenta activation; arrow shifts 3px on hover. */
export function Button({ variant = "primary", children, arrow = false, onClick, disabled = false, style }) {
  const base = {
    fontFamily: "var(--font-label)", fontSize: "var(--text-label)", letterSpacing: "var(--label-tracking)", textTransform: "uppercase",
    padding: "10px 22px", borderRadius: "var(--radius-control)", cursor: disabled ? "default" : "pointer",
    opacity: disabled ? 0.4 : 1, background: "transparent", border: "1px solid transparent",
    transitionProperty: "background-color, border-color, box-shadow, color, transform", transitionDuration: "var(--duration-fast)", transitionTimingFunction: "var(--ease-standard)",
    display: "inline-flex", alignItems: "center", gap: "8px", ...style,
  };
  const variants = {
    primary: { background: "var(--magenta)", color: "var(--white)", border: "1px solid var(--magenta)" },
    secondary: { color: "var(--text-primary)", border: "1px solid var(--rule-strong)" },
    text: { color: "var(--magenta)", padding: "10px 0" },
  };
  const [hover, setHover] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  const hovers = {
    primary: { background: "var(--magenta-bright)", borderColor: "var(--magenta-bright)", boxShadow: "var(--glow-signal)" },
    secondary: { borderColor: "var(--magenta)", color: "var(--magenta)" },
    text: { color: "var(--magenta-bright)" },
  };
  return (
    <button style={{ ...base, ...variants[variant], ...(hover && !disabled ? hovers[variant] : {}), transform: pressed && !disabled ? "scale(0.96)" : "none" }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)} onMouseUp={() => setPressed(false)}
      onClick={onClick} disabled={disabled}>
      {children}{arrow && <span aria-hidden="true" style={{ display: "inline-block", transition: "transform var(--duration-fast) var(--ease-standard)", transform: hover && !disabled ? "translateX(3px)" : "none" }}>→</span>}
    </button>
  );
}
