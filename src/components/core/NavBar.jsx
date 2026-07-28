import React from "react";
import { ThreeBarMark } from "./ThreeBarMark.jsx";
/** Site navigation — wordmark left, uppercase links right, hairline bottom rule. */
export function NavBar({ links = ["Cuelum", "Vexa", "Curiosity Architecture", "Amblia"], active, onNavigate, onWordmarkClick, wordmarkSrc, style }) {
  return (
    <nav className="site-nav" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px var(--page-margin)", background: "var(--black)", ...style }}>
      <div style={{ display: "flex", alignItems: "center", gap: "14px", cursor: onWordmarkClick ? "pointer" : "default", flexShrink: 0 }} onClick={onWordmarkClick}>
        {wordmarkSrc ? <img src={wordmarkSrc} alt="CUELUM" style={{ height: "16px" }} /> : <><ThreeBarMark width={20} /><span style={{ fontFamily: "var(--font-title)", fontWeight: 700, letterSpacing: "0.22em", fontSize: "15px" }}>CUELUM</span></>}
      </div>
      <div className="site-nav-links" style={{ display: "flex", gap: "36px" }}>
        {links.map(l => <NavLink key={l} active={l === active} onClick={() => onNavigate && onNavigate(l)}>{l}</NavLink>)}
      </div>
    </nav>
  );
}
function NavLink({ children, active, onClick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a href="#" aria-current={active ? "page" : undefined} onClick={e => { e.preventDefault(); onClick(); }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: "inline-flex", alignItems: "center", padding: "14px 2px", fontFamily: "var(--font-label)", fontSize: "var(--text-label-sm)", letterSpacing: "var(--label-tracking)", textTransform: "uppercase", cursor: "pointer",
        color: active || hover ? "var(--magenta)" : "var(--text-secondary)", transition: "color var(--duration-fast) var(--ease-standard)" }}>{children}</a>
  );
}
