import React from "react";
import { Link } from "react-router-dom";
import { ThreeBarMark } from "./ThreeBarMark.jsx";
/** Site navigation — wordmark left, uppercase links right, hairline bottom rule.
    Every link (including Contact) renders identically — a uniform, understated
    row rather than a bright CTA breaking the flow, matching Ciridae's
    minimal nav language.
    `hrefs` maps a link's label to its real destination (route path or
    mailto:) so the underlying anchor's href is correct for hover/middle-click/
    cmd-click, even though the primary click is intercepted for SPA nav via
    `onNavigate` (which also resets scroll and refreshes ScrollTrigger). */
export function NavBar({ links = ["VEXA", "Curiosity Architecture", "AMBLIA", "About", "Contact"], active, hrefs, onNavigate, onWordmarkClick, wordmarkSrc, style }) {
  return (
    <nav className="site-nav" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px var(--page-margin)", background: "var(--black)",
      transitionProperty: "background-color", transitionDuration: "var(--duration-base)", transitionTimingFunction: "var(--ease-standard)", ...style }}>
      <div style={{ display: "flex", alignItems: "center", gap: "14px", cursor: onWordmarkClick ? "pointer" : "default", flexShrink: 0 }} onClick={onWordmarkClick}>
        {wordmarkSrc ? <img src={wordmarkSrc} alt="CUELUM" style={{ height: "16px" }} /> : <><ThreeBarMark width={20} /><span style={{ fontFamily: "var(--font-title)", fontWeight: 700, letterSpacing: "0.22em", fontSize: "var(--type-body)" }}>CUELUM</span></>}
      </div>
      <div className="site-nav-links" style={{ display: "flex", alignItems: "center", gap: "28px" }}>
        {links.map(l => (
          <SiteNavLink key={l} href={hrefs?.[l] || "#"} active={l === active} onClick={() => onNavigate && onNavigate(l)}>{l}</SiteNavLink>
        ))}
      </div>
    </nav>
  );
}
function SiteNavLink({ children, href, active, onClick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <Link to={href} aria-current={active ? "page" : undefined} onClick={e => { e.preventDefault(); onClick(); }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: "inline-flex", alignItems: "center", padding: "8px 2px", fontFamily: "var(--font-label)", fontSize: "var(--text-label-sm)", letterSpacing: "var(--label-tracking)", textTransform: "uppercase", cursor: "pointer",
        color: active ? "var(--text-primary)" : hover ? "var(--magenta)" : "var(--text-secondary)", transition: "color var(--duration-fast) var(--ease-standard)" }}>{children}</Link>
  );
}
