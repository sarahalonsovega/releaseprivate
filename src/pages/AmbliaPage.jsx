import { Label } from "../components/core/Label.jsx";
import { NotifyForm } from "../components/NotifyForm.jsx";

const amSerif = { margin: 0, fontFamily: "var(--font-serif)", fontWeight: "var(--weight-light)", lineHeight: "var(--display-line-height)", letterSpacing: "var(--display-tracking)" };
const amBody = { margin: 0, color: "var(--text-secondary)", lineHeight: "var(--body-line-height)" };
const amEmphasis = { fontStyle: "italic" };

export function AmbliaPage() {
  return (
    <div>
      <section style={{ minHeight: "64vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "var(--page-margin)", backgroundImage: "url('/uploads/amblia-hero.png')", backgroundSize: "cover", backgroundPosition: "center", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.72),rgba(0,0,0,0.05))" }}></div>
        <h1 style={{ ...amSerif, position: "relative", fontSize: "var(--text-display-xl)", maxWidth: "14ch", marginLeft: "auto", marginRight: "auto" }}>Between you and <span style={amEmphasis}>your eyes</span>.</h1>
      </section>
      <section className="am-split" style={{ padding: "clamp(64px,10vh,120px) var(--page-margin)", display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "var(--space-8)", alignItems: "center" }}>
        <h2 style={{ ...amSerif, fontSize: "var(--text-display-md)" }}>Two eyes, one brain</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)", fontSize: "var(--text-body-lg)" }}>
          <p style={{ ...amBody }}>Amblyopia, or lazy eye, is what happens when the brain and eyes stop working together. The brain starts ignoring signals from one eye, and that eye keeps weakening.</p>
          <p style={{ ...amBody }}>The standard fix is still the patch, started in childhood. It's uncomfortable, and it only works if the child actually wears it. That's exactly where it falls apart.</p>
          <p style={{ ...amBody, color: "var(--text-primary)" }}>AMBLIA builds the therapy into something a child already wants to wear. Nothing to fight over, nothing to notice. The treatment runs in the background, and the child just goes about their day.</p>
        </div>
      </section>
      <section style={{ padding: "clamp(48px,8vh,88px) var(--page-margin)", display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-5)", textAlign: "center" }}>
        <Label color="var(--magenta)">Why it matters</Label>
        <h2 style={{ ...amSerif, fontSize: "var(--text-display-md)", maxWidth: "20ch" }}>Treatment shouldn't feel like treatment.</h2>
        <p style={{ ...amBody, fontSize: "var(--text-body-lg)", maxWidth: "54ch" }}>The hard part of amblyopia was never the science. It's getting a child to keep wearing something they hate. AMBLIA starts from the opposite place: something they'd choose to wear anyway.</p>
      </section>
      <section style={{ padding: "var(--space-10) var(--page-margin)", textAlign: "center", backgroundImage: "linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url('/uploads/amblia-vision-cta.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <h2 style={{ ...amSerif, fontSize: "var(--text-display-lg)" }}>No patches. No fighting. Just <span style={amEmphasis}>vision</span>.</h2>
      </section>
      <section style={{ padding: "var(--space-9) var(--page-margin)" }}>
        <h2 style={{ ...amSerif, fontSize: "var(--text-display-md)", marginBottom: "12px" }}>Be first to see it.</h2>
        <p style={{ ...amBody, maxWidth: "52ch", margin: "0 auto 32px" }}>We're not ready to show you what we're building yet. Join the list and you'll be the first to know when it launches.</p>
        <NotifyForm label="Email address" placeholder="your@email.com" button="Join the waitlist" success="You're on the waitlist. We'll be in touch with updates." />
      </section>
    </div>
  );
}
