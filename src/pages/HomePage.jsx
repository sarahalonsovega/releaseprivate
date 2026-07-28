const hmSerif = { margin: 0, fontFamily: "var(--font-serif)", fontWeight: "var(--weight-light)", lineHeight: "var(--display-line-height)", letterSpacing: "var(--display-tracking)", color: "var(--text-primary)" };
const hmTitle = { margin: 0, fontFamily: "var(--font-title)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-primary)" };

function HomeDivision({ image, alt, title, onClick }) {
  return (
    <a href="#" onClick={e => { e.preventDefault(); onClick(); }} className="home-division" style={{ display: "flex", flexDirection: "column", gap: "28px", textDecoration: "none", cursor: "pointer" }}>
      <div style={{ aspectRatio: "1/1", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src={image} alt={alt} style={{ width: "68%", height: "auto", objectFit: "contain", display: "block", transition: "transform var(--motion-slow, 0.6s) ease" }} />
      </div>
      <h3 style={{ ...hmTitle, fontSize: "clamp(16px,1.6vw,22px)", letterSpacing: "0.12em" }}>{title}</h3>
    </a>
  );
}

export function HomePage({ go }) {
  return (
    <div>
      <section style={{ position: "relative", backgroundImage: "url('/uploads/Screenshot 2026-07-27 at 9.07.19 PM.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(0,0,0,0.3) 0%,rgba(0,0,0,0) 35%,rgba(0,0,0,0) 60%,rgba(0,0,0,0.75) 88%,#000 100%)" }}></div>
        <div style={{ position: "relative", minHeight: "88vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 var(--page-margin)" }}>
          <h1 style={{ ...hmSerif, fontSize: "100px", fontWeight: 500, maxWidth: "12ch", margin: "0 auto" }}>Built for what's next.</h1>
        </div>
        <div id="belief" style={{ position: "relative", padding: "clamp(60px,10vh,120px) var(--page-margin) var(--space-10)", display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-6)" }}>
          <h2 style={{ ...hmTitle, fontSize: "clamp(20px,2.4vw,32px)", letterSpacing: "0.1em", maxWidth: "34ch", position: "relative", top: "20px" }}>We turn curiosity into ventures that work.</h2>
          <div style={{ maxWidth: "58ch", fontSize: "var(--text-body-lg)", color: "var(--text-primary)", lineHeight: "var(--body-line-height)", display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
            <p style={{ margin: 0, position: "relative", top: "20px" }}>We build on one belief:<br />The best solutions come from recombination — taking proven pieces from different fields and putting them together into something new.</p>
            <p style={{ margin: 0, position: "relative", top: "20px" }}>So we go deep in more than one field, and build where they meet.</p>
          </div>
        </div>
      </section>
      <section style={{ background: "var(--black)", padding: "var(--space-10) var(--page-margin)" }}>
        <h2 style={{ ...hmTitle, fontSize: "clamp(22px,2.8vw,38px)", letterSpacing: "0.08em", marginBottom: "clamp(40px,6vh,72px)" }}>Our divisions. Ideas recombined.</h2>
        <div className="home-divisions" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "var(--space-6)", maxWidth: "1200px", margin: "0 auto" }}>
          <HomeDivision image="/uploads/division-vexa.png" alt="VEXA — glowing acrylic bar forms" title="VEXA" onClick={() => go("VEXA")} />
          <HomeDivision image="/uploads/division-curiosity.png" alt="Curiosity Architecture — glowing acrylic bar forms" title="Curiosity Architecture" onClick={() => go("Curiosity Architecture")} />
          <HomeDivision image="/uploads/division-amblia.png" alt="AMBLIA — glowing acrylic bar forms" title="AMBLIA" onClick={() => go("AMBLIA")} />
        </div>
      </section>
      <section style={{ position: "relative", backgroundImage: "url('/uploads/File 9.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(0,0,0,0.85),rgba(0,0,0,0.45) 50%,rgba(0,0,0,0.8))" }}></div>
        <div style={{ position: "relative", padding: "clamp(100px,18vh,200px) var(--page-margin)", display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-6)" }}>
          <img src="/assets/wordmark-white.png" alt="CUELUM" style={{ height: "clamp(32px,4vw,52px)" }} />
          <p style={{ ...hmSerif, fontSize: "var(--text-display-md)", maxWidth: "30ch" }}>is a venture studio exploring the future of human capability at the intersection of AI and cross-domain innovation.</p>
        </div>
      </section>
    </div>
  );
}
