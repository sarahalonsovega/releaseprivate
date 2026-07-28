import { Label } from "../components/core/Label.jsx";
import { Rule } from "../components/core/Rule.jsx";
import { Button } from "../components/core/Button.jsx";
import { QuoteBlock } from "../components/core/QuoteBlock.jsx";
import { NotifyForm } from "../components/NotifyForm.jsx";

const caSerif = { margin: 0, fontFamily: "var(--font-serif)", fontWeight: "var(--weight-light)", lineHeight: "var(--display-line-height)", letterSpacing: "var(--display-tracking)" };
const caBody = { margin: 0, color: "var(--text-secondary)", lineHeight: "var(--body-line-height)" };
const caEmphasis = { fontStyle: "italic" };

export function CuriosityPage() {
  const why = [
    ["It compounds instead of resetting.", "When one track disappears, a single-track career starts from zero. A portfolio doesn't, because each field brings methods the others can use."],
    ["It's the part AI doesn't take.", "The value moves to framing the problem, choosing what to borrow, and judging what's worth building: the work between fields, not inside one."],
    ["It's the safer bet.", "Most real advances are imports, a method from one field solving a problem in another. You can't see that from inside a single field. Three fields that talk to each other is a hedge, not a scatter."],
  ];
  const method = [
    ["01", "Go deep in more than one place.", "Not dabbling. Deep enough in each field to produce real work you can point to."],
    ["02", "Design the intersections.", "Scattered and cross-domain look the same from outside. Structure is the difference: shared language, transferable methods, deliberate overlap."],
    ["03", "Make the connection the output.", "What you ship is the link itself, the pattern you can only see standing in two fields at once."],
  ];

  return (
    <div>
      <section style={{ minHeight: "64vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "var(--page-margin)", backgroundImage: "url('/uploads/curiosity-hero.png')", backgroundSize: "cover", backgroundPosition: "center", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.7),rgba(0,0,0,0.05))" }}></div>
        <h1 style={{ ...caSerif, position: "relative", fontSize: "var(--text-display-xl)", maxWidth: "16ch", marginLeft: "auto", marginRight: "auto" }}>Learn everything to create <span style={caEmphasis}>anything</span>.</h1>
      </section>

      <section style={{ padding: "var(--space-9) var(--page-margin)", display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-6)", textAlign: "center" }}>
        <Label color="var(--magenta)">Breadth as method</Label>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)", maxWidth: "62ch" }}>
          <p style={{ ...caBody, fontSize: "var(--text-body-lg)" }}>The usual advice is to narrow: pick a lane, go deep, specialize. That advice was built for a world that stayed still, where going deeper than everyone else was enough.</p>
          <p style={{ ...caBody, fontSize: "var(--text-body-lg)" }}>That world is gone. People change roles and industries many times over a career. Whole categories of work appear and disappear inside a decade. And AI is absorbing the exact narrow, well-defined tasks specialization was built for.</p>
          <p style={{ margin: "16px 0", fontFamily: "var(--font-title)", fontWeight: 700, fontSize: "var(--text-heading-lg)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Breadth is infrastructure.</p>
          <p style={{ ...caBody, fontSize: "var(--text-body-lg)", color: "var(--text-primary)" }}>Recombination is what stays human: spotting what carries over from one field to another, and putting proven pieces together into something new. AI works inside a problem. Deciding which fields belong in the same room is still a human job.</p>
        </div>
      </section>

      <section style={{ padding: "var(--space-9) var(--page-margin)" }}>
        <h2 style={{ ...caSerif, fontSize: "var(--text-display-md)", marginBottom: "clamp(32px,5vh,48px)" }}>Why breadth holds up</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "var(--space-7)" }}>
          {why.map(([t, d]) => (
            <div key={t} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <span aria-hidden="true" style={{ fontFamily: "var(--font-serif)", fontSize: "48px", lineHeight: 1, color: "var(--magenta)" }}>"</span>
              <h3 style={{ ...caSerif, fontSize: "var(--text-heading-lg)" }}>{t}</h3>
              <p style={{ ...caBody, fontSize: "var(--text-body)" }}>{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "var(--space-9) var(--page-margin)" }}>
        <Label color="var(--magenta)">Methodology</Label>
        <div style={{ marginTop: "24px" }}>
          {method.map(([n, t, d]) => (
            <div key={n} className="ca-method-row vx-hover-row" style={{ display: "grid", gridTemplateColumns: "80px 1fr 2fr", gap: "var(--space-5)", alignItems: "baseline", padding: "28px 20px", margin: "0 -20px", borderTop: "1px solid var(--rule)" }}>
              <span style={{ fontFamily: "var(--font-title)", fontWeight: 700, fontSize: "24px", color: "var(--magenta)" }}>{n}</span>
              <h3 style={{ ...caSerif, fontSize: "var(--text-heading-lg)" }}>{t}</h3>
              <p style={{ ...caBody }}>{d}</p>
            </div>
          ))}
          <Rule />
        </div>
      </section>

      <section style={{ padding: "var(--space-9) var(--page-margin)", textAlign: "center" }}>
        <h2 style={{ ...caSerif, fontSize: "var(--text-display-md)", marginBottom: "16px" }}>The Book</h2>
        <p style={{ ...caBody, margin: "0 0 32px", maxWidth: "56ch", marginLeft: "auto", marginRight: "auto" }}>Curiosity Architecture started as a life lived. It's becoming a book so the method can travel further than one story can.</p>
        <div style={{ maxWidth: "620px", margin: "0 auto" }}>
          <NotifyForm label="Email" placeholder="your@email.com" button="Notify me" success="You're on the list. We'll let you know the moment the book launches." />
        </div>
      </section>

      <section style={{ padding: "var(--space-9) var(--page-margin)" }}>
        <h2 style={{ ...caSerif, fontSize: "var(--text-display-md)", marginBottom: "8px" }}>The framework, in public</h2>
        <p style={{ ...caBody, marginBottom: "32px" }}>Recent talks on recombination and the cross-domain life.</p>
        <div className="ca-talk-row vx-hover-row" style={{ display: "grid", gridTemplateColumns: "120px 1fr 2fr", gap: "var(--space-5)", alignItems: "baseline", padding: "24px 20px", margin: "0 -20px", borderTop: "1px solid var(--rule)" }}>
          <span style={{ fontFamily: "var(--font-title)", fontWeight: 700, color: "var(--magenta)" }}>AI4G</span>
          <h3 style={{ ...caSerif, fontSize: "var(--text-heading-md)" }}>AI for Good · Global Summit · Geneva · 2026</h3>
          <p style={{ ...caBody }}>Recombination as the defining human skill of the AI era.</p>
        </div>
        <div className="ca-talk-row vx-hover-row" style={{ display: "grid", gridTemplateColumns: "120px 1fr 2fr", gap: "var(--space-5)", alignItems: "baseline", padding: "24px 20px", margin: "0 -20px", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
          <span style={{ fontFamily: "var(--font-title)", fontWeight: 700, color: "var(--magenta)" }}>MYEF</span>
          <h3 style={{ ...caSerif, fontSize: "var(--text-heading-md)" }}>Inspiring Role Models Conference · Keynote</h3>
          <p style={{ ...caBody }}>On the cross-domain life, and becoming a Curiosity Architect.</p>
        </div>
        <Button variant="secondary" arrow style={{ marginTop: "32px" }}>Watch the talks</Button>
      </section>

      <section style={{ padding: "var(--space-9) var(--page-margin)", display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-7)", textAlign: "center" }}>
        <div>
          <Label color="var(--magenta)">The person behind it</Label>
          <h2 style={{ ...caSerif, fontSize: "var(--text-display-lg)", margin: "16px 0" }}>Sarah Alonso Vega</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)", fontSize: "var(--text-body-lg)", maxWidth: "62ch" }}>
          <p style={{ ...caBody }}>Sarah has never stayed inside one field for long. She joined TEDxCibeles at eleven, took a Technovation team to the world semi-finals at fourteen, and spoke at Digital Enterprise Show at seventeen. Along the way, a Women in Tech global finalist and LinkedIn Director at Girl Genius. She's built across fields ever since.</p>
          <p style={{ ...caBody }}>She studied East Asia and Korean at Leiden, then entrepreneurship at TU Delft, first as a student and later teaching it. She built Zoekey, a bike-finding device, wrote citizen-science policy for the Dutch UNESCO commission, and spent two years at Huawei's Amsterdam R&D Center, in as an AI linguistics intern and out as team lead. Spain later named her one of its top 50 social innovators under thirty through the Fundació Princesa de Girona.</p>
          <p style={{ ...caBody }}>Then the parts a résumé leaves out: eighteen months on a Venezuelan restaurant floor in The Hague, line cook to floor manager. Drama at LAMDA, fashion at IED, brand-building at LVMH. Six languages.</p>
        </div>
        <QuoteBlock size="var(--text-display-md)" style={{ maxWidth: "38ch" }}>None of it was set aside. Every field handed something to the next.</QuoteBlock>
        <p style={{ ...caBody, fontSize: "var(--text-body-lg)", maxWidth: "62ch" }}>That method is now CUELUM, the venture studio she founded and runs as Chief Curiosity Architect. Curiosity Architecture is what came out of it: not a theory about how a life like this might work, but documentation of one that did.</p>
      </section>

      <section style={{ padding: "var(--space-10) var(--page-margin)", textAlign: "center", backgroundImage: "linear-gradient(rgba(0,0,0,0.55),rgba(0,0,0,0.55)), url('/uploads/curiosity-intersection.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <h2 style={{ ...caSerif, fontSize: "var(--text-display-lg)" }}>Curiosity is a structure. Build at the <span style={caEmphasis}>intersection</span>.</h2>
        <p style={{ margin: "24px auto 0", maxWidth: "52ch", color: "rgba(255,255,255,0.8)", lineHeight: "var(--body-line-height)" }}>Open to speaking, research collaborations, consulting, partnerships — or conversations that don't fit any of those.</p>
        <p style={{ marginTop: "24px" }}><a href="mailto:hello@cuelum.com" style={{ color: "var(--white)" }}>hello@cuelum.com</a></p>
      </section>
    </div>
  );
}
