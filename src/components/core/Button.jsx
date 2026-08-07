import React from "react";
/** CUELUM CTA button — 3px corners, uppercase Modius label; arrow shifts 3px
    on hover. Hover inverts to a white fill rather than shifting toward
    brighter magenta (ciridae's own button-hover form: "invert fill" —
    matches specs.md's CIRIDAE 12 note — and keeps hover feedback neutral
    instead of reading as "the button turned pink"). */
export function Button({ variant = "primary", children, arrow = false, onClick, disabled = false, style, ...rest }) {
  // borderColor as its own longhand throughout (never the `border`
  // shorthand) — hover only ever needs to override the color, and mixing
  // shorthand and longhand border properties across renders is a React
  // styling footgun (it warns and can leave stale values behind).
  const base = {
    fontFamily: "var(--font-label)", fontSize: "var(--text-label)", letterSpacing: "var(--label-tracking)", textTransform: "uppercase",
    padding: "10px 22px", borderRadius: "var(--radius-control)", cursor: disabled ? "default" : "pointer",
    opacity: disabled ? 0.4 : 1, background: "transparent", borderWidth: "1px", borderStyle: "solid", borderColor: "transparent",
    transitionProperty: "background-color, border-color, box-shadow, color, transform", transitionDuration: "var(--duration-fast)", transitionTimingFunction: "var(--ease-standard)",
    display: "inline-flex", alignItems: "center", gap: "8px", ...style,
  };
  const variants = {
    primary: { background: "var(--magenta)", color: "var(--white)", borderColor: "var(--magenta)" },
    secondary: { color: "var(--text-primary)", borderColor: "var(--rule-strong)" },
    text: { color: "var(--magenta)", padding: "10px 0" },
  };
  const [hover, setHover] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  const hovers = {
    primary: { background: "var(--white)", borderColor: "var(--white)", color: "var(--black)" },
    secondary: { background: "var(--white)", borderColor: "var(--white)", color: "var(--black)" },
    text: { color: "var(--white)" },
  };
  return (
    <button style={{ ...base, ...variants[variant], ...(hover && !disabled ? hovers[variant] : {}), transform: pressed && !disabled ? "scale(0.96)" : "none" }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)} onMouseUp={() => setPressed(false)}
      onClick={onClick} disabled={disabled} {...rest}>
      {children}{arrow && <span aria-hidden="true" style={{ display: "inline-block", transition: "transform var(--duration-fast) var(--ease-standard)", transform: hover && !disabled ? "translateX(3px)" : "none" }}>→</span>}
    </button>
  );
}
