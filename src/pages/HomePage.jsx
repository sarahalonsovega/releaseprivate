import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { LogoStrip } from "../components/core/LogoStrip.jsx";

const hmSerif = { margin: 0, fontFamily: "var(--font-serif)", fontWeight: "var(--weight-light)", lineHeight: "var(--display-line-height)", letterSpacing: "var(--display-tracking)", color: "var(--text-primary)" };
const hmTitle = { margin: 0, fontFamily: "var(--font-title)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-primary)" };
const companies = "Airbus · Navantia · Simoldes · Alpine F1 · Sidor · Ecopetrol · BellSouth · HP · Huawei · Santander · BBVA · Telmex · Brahma · Pizza Mía · Polar · Nutritec · Seguros RGA · PDVSA";
const logoSrcs = ["/uploads/logos-1.png", "/uploads/logos-2.png", "/uploads/logos-3.png"];

/** Ciridae's "AI transformation" statement pattern, measured directly off
    ciridae.com's live pin (not just the screenshot): an eyebrow scrolls by
    normally, then the statement locks to a full-viewport sticky stage
    (their `.builds_sticky { position: sticky; top: 0 }` inside a wrapper
    ~1.5x viewport-height taller than itself), releasing straight into the
    next section with no gap once the wrapper's own extra height runs out.
    Reproduced with gsap's `pin` (rather than the site's native
    `position: sticky`) so it uses the same pinning technique as every
    other pinned moment on this site. No emblem — just the headline and
    supporting copy fading in together while the stage holds centered. */
function BeliefEmblem() {
  const wrapRef = useRef(null);
  const stageRef = useRef(null);
  const textRef = useRef(null);
  const [staticMode] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    if (staticMode) return;
    const ctx = gsap.context(() => {
      gsap.set(textRef.current, { opacity: 0 });
      gsap.to(textRef.current, {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: stageRef.current,
          invalidateOnRefresh: true,
        },
      });
    }, wrapRef);
    return () => ctx.revert();
  }, [staticMode]);

  return (
    // The tall outer wrapper is a plain block element (not a flex item) on
    // purpose — see the note further down on why a pinned element that's
    // itself a flexbox child silently loses its scroll duration.
    <div ref={wrapRef} style={{ position: "relative", height: staticMode ? "auto" : "240vh" }}>
      <div ref={stageRef} style={{ height: staticMode ? "auto" : "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 var(--page-margin)" }}>
        <div ref={textRef} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-5)", opacity: staticMode ? 1 : undefined }}>
          <h2 style={{ ...hmTitle, fontSize: "clamp(22px,3vw,36px)", letterSpacing: "0.05em", maxWidth: "22ch", textAlign: "center" }}>We turn curiosity into ventures that work.</h2>
          <div style={{ maxWidth: "62ch", fontSize: "clamp(15px,1.6vw,18px)", color: "var(--text-secondary)", lineHeight: "var(--body-line-height)", textAlign: "center", display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
            <p style={{ margin: 0 }}>We build on one belief:<br />The best solutions come from recombination, taking proven pieces from different fields and putting them together into something new.</p>
            <p style={{ margin: 0 }}>So we go deep in more than one field, and build where they meet.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Each division is now a tall real photo in its own frosted-edge frame,
    with the name sitting as its own label underneath rather than stacked
    inside the card with the image — no backdrop-filter blur over the photo
    itself (that treatment was built for a small icon glyph over a shared
    background field; blurring a full photographic image the same way
    would just muddy it), so hover/focus state is handled directly instead
    of through the shared .home-division-glass class. */
function HomeDivision({ image, alt, title, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <button type="button" onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)} onBlur={() => setHover(false)}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px", width: "100%", background: "transparent", border: "none", padding: 0, cursor: "pointer", font: "inherit" }}>
      <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 1.14", borderRadius: "var(--radius-card)", overflow: "hidden",
        border: `1px solid ${hover ? "var(--rule-strong)" : "var(--rule)"}`,
        transition: "border-color var(--duration-fast) var(--ease-standard)" }}>
        <img src={image} alt={alt} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block",
          transform: hover ? "scale(1.04)" : "scale(1)", transition: "transform var(--duration-slow) var(--ease-standard)" }} />
      </div>
      {/* Text is already white at rest, so hover reads via an underline
          instead of a color shift — the image scale/border brighten above
          is the main hover cue. No magenta here; buttons don't turn pink on
          hover anywhere on this site (see Button.jsx). */}
      <h3 style={{ ...hmTitle, fontSize: "clamp(16px,1.6vw,22px)", letterSpacing: "0.12em", textDecoration: hover ? "underline" : "none", textUnderlineOffset: "4px" }}>{title}</h3>
    </button>
  );
}

export function HomePage({ go }) {
  return (
    <div>
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundImage: "url('/uploads/home-hero-field.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.62) 35%,rgba(0,0,0,0.62) 65%,rgba(0,0,0,0.88) 100%)" }}></div>
        <h1 className="hm-hero-reveal hm-hero-reveal-1" style={{ ...hmSerif, position: "relative", fontSize: "var(--text-display-xl)", fontWeight: 500, maxWidth: "12ch", margin: "0 auto" }}>Built for what's next.</h1>
      </section>

      <section style={{ paddingTop: "var(--space-9)", paddingBottom: "var(--space-9)", textAlign: "center" }}>
        <p style={{ margin: "0 0 40px", padding: "0 var(--page-margin)", fontFamily: "var(--font-label)", fontSize: "var(--text-label-sm)", letterSpacing: "var(--label-tracking)", textTransform: "uppercase", color: "var(--text-meta)" }}>The companies that trust our vision</p>
        {/* No horizontal padding on the section or this wrapper — the track
            needs to run edge-to-edge at full viewport width, not just the
            page's content width. */}
        <div style={{ overflow: "hidden", width: "100%" }}>
          <div className="vx-marquee" style={{ display: "inline-flex", alignItems: "center", willChange: "transform" }}>
            {[0, 1].map(rep => (
              <div key={rep} style={{ display: "inline-flex", alignItems: "center", gap: "24px", paddingRight: "24px" }} aria-hidden={rep === 1 || undefined}>
                {logoSrcs.map(src => <LogoStrip key={src} src={src} />)}
              </div>
            ))}
          </div>
          <span className="sr-only">{companies}</span>
        </div>
      </section>

      {/* Plain block section, not flex — BeliefEmblem's own wrapper is the
          gsap pin target, and a pinned element that's itself a flexbox item
          fights the flex algorithm for sizing: the pin-spacer's height
          collapses back to the item's natural size and the whole extra
          scroll duration silently disappears. A block parent keeps the pin
          out of any flex layout entirely. */}
      <section id="belief" style={{ padding: "clamp(80px,14vh,160px) var(--page-margin) clamp(80px,14vh,160px)" }}>
        <BeliefEmblem />
      </section>

      <section id="divisions" style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "clamp(64px,8vh,104px) var(--page-margin)" }}>
        <h2 style={{ ...hmTitle, width: "100%", maxWidth: "1700px", margin: "0 auto clamp(40px,6vh,72px)", fontSize: "clamp(22px,2.8vw,38px)", letterSpacing: "0.08em", textAlign: "left" }}>Our divisions. Ideas recombined.</h2>
        <div className="home-divisions" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "var(--space-6)", width: "100%", maxWidth: "1700px", margin: "0 auto" }}>
          <HomeDivision image="/uploads/division-vexa-photo.png" alt="VEXA" title="VEXA" onClick={() => go("VEXA")} />
          <HomeDivision image="/uploads/heroforcuriosityandforcuriositydisioninhome.png" alt="Curiosity Architecture" title="Curiosity Architecture" onClick={() => go("Curiosity Architecture")} />
          <HomeDivision image="/uploads/division-amblia-photo.png" alt="AMBLIA" title="AMBLIA" onClick={() => go("AMBLIA")} />
        </div>
      </section>
    </div>
  );
}
