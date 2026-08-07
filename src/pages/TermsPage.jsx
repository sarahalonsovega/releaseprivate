import { Label } from "../components/core/Label.jsx";

const lgSerif = { margin: 0, fontFamily: "var(--font-serif)", fontWeight: "var(--weight-light)", lineHeight: "var(--display-line-height)", letterSpacing: "var(--display-tracking)" };
const lgBody = { margin: 0, color: "var(--text-secondary)", lineHeight: "var(--body-line-height)" };

export function TermsPage() {
  return (
    <div>
      <section style={{ padding: "clamp(80px,14vh,140px) var(--page-margin) var(--space-8)", display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-5)", textAlign: "center" }}>
        <Label color="var(--magenta)">Legal</Label>
        <h1 style={{ ...lgSerif, fontSize: "var(--text-display-lg)" }}>Terms of Use</h1>
        <p style={{ ...lgBody, fontSize: "var(--text-body)", color: "var(--text-meta)" }}>Last updated 7 August 2026</p>
      </section>
      <section style={{ padding: "0 var(--page-margin) var(--space-10)", display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)", maxWidth: "62ch", textAlign: "left" }}>
          <p style={{ ...lgBody }}>This website provides general information about CUELUM and its divisions. You may browse and link to it for lawful purposes, but you may not misuse the site, interfere with its operation, or copy its content for commercial use without permission.</p>
          <p style={{ ...lgBody }}>Unless stated otherwise, CUELUM owns the site's text, design, branding, and original media. The site is provided as available. We do not promise that every statement will remain current or that access will always be uninterrupted.</p>
          <p style={{ ...lgBody }}>Nothing on this site is professional, financial, medical, or legal advice. To ask about these terms, email <a href="mailto:hello@cuelum.com">hello@cuelum.com</a>.</p>
        </div>
      </section>
    </div>
  );
}
