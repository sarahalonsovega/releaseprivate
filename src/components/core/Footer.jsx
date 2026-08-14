import React from "react";
import { ThreeBarMark } from "./ThreeBarMark.jsx";
import { TriadLabel } from "./Label.jsx";
/** Site footer — mark, triad line, sparse links, hairline top rule. */
export function Footer({ links = ["VEXA", "Curiosity Architecture", "AMBLIA", "About", "Contact"], note = "© 2026 CUELUM Inc. All rights reserved.", style }) {
  return (
    <footer style={{ borderTop: "1px solid var(--rule)", padding: "48px var(--page-margin)", display: "flex", flexDirection: "column", gap: "32px", background: "var(--black)", ...style }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <ThreeBarMark width={24} />
        <div style={{ display: "flex", gap: "28px" }}>
          {links.map(l => <a key={l} href="#" style={{ fontFamily: "var(--font-label)", fontSize: "var(--type-mini)", letterSpacing: "var(--label-tracking)", textTransform: "uppercase", color: "var(--text-secondary)" }}>{l}</a>)}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <TriadLabel color="var(--text-meta)" />
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--type-mini)", color: "var(--text-meta)" }}>{note}</span>
      </div>
    </footer>
  );
}
