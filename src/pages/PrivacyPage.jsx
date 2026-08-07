import { Label } from "../components/core/Label.jsx";

const lgSerif = { margin: 0, fontFamily: "var(--font-serif)", fontWeight: "var(--weight-light)", lineHeight: "var(--display-line-height)", letterSpacing: "var(--display-tracking)" };
const lgBody = { margin: 0, color: "var(--text-secondary)", lineHeight: "var(--body-line-height)" };

export function PrivacyPage() {
  return (
    <div>
      <section style={{ padding: "clamp(80px,14vh,140px) var(--page-margin) var(--space-8)", display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-5)", textAlign: "center" }}>
        <Label color="var(--magenta)">Legal</Label>
        <h1 style={{ ...lgSerif, fontSize: "var(--text-display-lg)" }}>Privacy Notice</h1>
        <p style={{ ...lgBody, fontSize: "var(--text-body)", color: "var(--text-meta)" }}>Last updated 7 August 2026</p>
      </section>
      <section style={{ padding: "0 var(--page-margin) var(--space-10)", display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)", maxWidth: "62ch", textAlign: "left" }}>
          <p style={{ ...lgBody }}>CUELUM does not currently use advertising or analytics cookies on this site. The AMBLIA waitlist field is not transmitted or stored by the website.</p>
          <p style={{ ...lgBody }}>If you email us or use the VEXA contact form, the details you choose to send are passed through your email provider to CUELUM. We use them only to answer your request, manage the resulting relationship, and meet legal obligations. We keep them only as long as reasonably necessary.</p>
          <p style={{ ...lgBody }}>The infrastructure used to deliver this site may receive limited technical information such as your IP address and browser details when content loads. You may ask to access, correct, delete, restrict, or object to our use of your personal data by emailing <a href="mailto:hello@cuelum.com">hello@cuelum.com</a>. You may also contact your local data protection authority.</p>
        </div>
      </section>
    </div>
  );
}
