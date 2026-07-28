import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Rule } from "../components/core/Rule.jsx";
import { Button } from "../components/core/Button.jsx";
import { TextField } from "../components/core/TextField.jsx";
import { Stat } from "../components/core/Stat.jsx";

const vxSerif = { margin: 0, fontFamily: "var(--font-serif)", fontWeight: "var(--weight-light)", lineHeight: "var(--display-line-height)", letterSpacing: "var(--display-tracking)" };
const vxBody = { margin: 0, color: "var(--text-secondary)", lineHeight: "var(--body-line-height)" };
const vxEmphasis = { fontStyle: "italic" };

function VxSection({ children, style, id }) {
  return <section id={id} style={{ padding: "var(--space-9) var(--page-margin)", ...style }}>{children}</section>;
}

function ServiceRow({ tag, text }) {
  return (
    <div className="vx-service-row vx-hover-row" style={{ display: "grid", gridTemplateColumns: "210px 1fr", gap: "var(--space-5)", alignItems: "baseline", padding: "18px 0", borderTop: "1px solid var(--rule)" }}>
      <span style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-label-sm)", letterSpacing: "var(--label-tracking)", textTransform: "uppercase", color: "var(--magenta)" }}>{tag}</span>
      <p style={{ ...vxBody, fontSize: "var(--text-body)", textAlign: "left" }}>{text}</p>
    </div>
  );
}

/** A logo strip image cropped down to just the logo row via absolute positioning
    (negative margin inside a flex align-items:center parent centers the margin
    box, not the content, so the offset math goes wrong — absolute positioning
    is unambiguous). Each source PNG (1920x1080) also carries ~35-46px of
    transparent padding baked in on its left/right edges around the real
    logo content (x≈84-1810) — cropped horizontally too, or that padding
    stacks with the flex gap and produces a much bigger dead zone between
    strips than between logos within the same strip. The window is a hair
    wider than that measured bounding box so the edge logos don't get clipped. */
function LogoStrip({ src }) {
  return (
    <div style={{ position: "relative", height: "100px", width: "766px", overflow: "hidden", flexShrink: 0 }}>
      <img src={src} alt="" style={{ position: "absolute", top: "-180px", left: "-21px", height: "460px", width: "auto", display: "block", filter: "invert(1)" }} />
    </div>
  );
}

/** Scroll-activated era sequence: numeral + title light up as the reader reaches them. Falls back to a fully-lit static state under prefers-reduced-motion. */
function EraRail({ eras }) {
  const numeralRefs = useRef([]);
  const blockRefs = useRef([]);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const rowRef = useRef(null);

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: rowRef.current,
        start: "top 75%",
        onEnter: () => {
          blockRefs.current.forEach((block, i) => {
            const numeral = numeralRefs.current[i];
            setTimeout(() => { block?.classList.add("vx-era-active"); numeral?.classList.add("vx-era-active"); }, i * 150);
          });
        },
      });
    });
    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={rowRef} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "var(--space-7)", alignItems: "start" }}>
      {eras.map((e, i) => (
        <div key={e.n} ref={el => (blockRefs.current[i] = el)}
          className={"vx-hover-row" + (reduced ? " vx-era-active" : "")}
          style={{ opacity: reduced ? 1 : 0.35, transition: "opacity var(--duration-slow) var(--ease-reveal)", textAlign: "center", maxWidth: "30ch", margin: "0 auto", padding: "8px 16px 20px", borderTop: "none" }}>
          <span ref={el => (numeralRefs.current[i] = el)}
            className={reduced ? "vx-era-active" : ""}
            style={{ display: "inline-flex", width: "40px", height: "40px", borderRadius: "50%", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-title)", fontWeight: 700, fontSize: "14px", background: "var(--black)",
              border: "2px solid var(--rule)", color: "var(--text-meta)", transition: "color var(--duration-base) var(--ease-standard), border-color var(--duration-base) var(--ease-standard)" }}>
            {e.n}
          </span>
          <h3 style={{ ...vxSerif, fontSize: "var(--text-heading-lg)", marginTop: "16px" }}>{e.t}</h3>
          <span style={{ display: "block", color: "var(--text-meta)", fontSize: "var(--text-heading-sm)", marginTop: "4px" }}>— {e.s}</span>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "18px" }}>
            {e.items.map(it => <p key={it} style={{ ...vxBody, fontSize: "var(--text-body-sm)", margin: 0 }}>{it}</p>)}
          </div>
        </div>
      ))}
    </div>
  );
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const JUMP_LINKS = [
  ["vx-approach", "01", "Approach"],
  ["vx-evolution", "02", "Evolution"],
  ["vx-mission", "03", "Mission"],
  ["vx-services", "04", "Services"],
  ["vx-model", "05", "Model"],
  ["vx-contact", "06", "Contact"],
];

export function VexaPage() {
  const [activeSection, setActiveSection] = useState(JUMP_LINKS[0][0]);

  useEffect(() => {
    const els = JUMP_LINKS.map(([id]) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
    }, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const eras = [
    { n: "01", t: "Human Era", s: "before AI", items: ["Human decides (intuition + experience)", "Human executes (manual)", "Team coordinates (meetings & emails)", "Human reviews (full control)"] },
    { n: "02", t: "AI-Assisted Era", s: "today, human + AI", items: ["Human decides (AI suggests options)", "AI co-executes (drafts, analyzes, creates)", "Human coordinates (AI summarizes & organizes)", "Human approves (final validation)"] },
    { n: "03", t: "Agentic Era", s: "next, autonomous AI", items: ["Agent decides (on business goals)", "Agent executes (autonomous, continuous)", "Agents orchestrate (AI networks collaborate)", "Human governs (sets vision & boundaries)"] },
  ];
  const mission = ["Ship projects faster, from win to close", "Win more work and enter new markets sooner", "Protect margins without straining client relationships", "Align teams and decisions under one governance layer", "Raise quality on every project, not just the flagship ones", "Grow without adding operational drag"];
  const effect = ["Weeks, not months", "Production-ready, not a pilot", "Tested in real operations along the way", "Knowledge transfer built in", "Runs on the tools you already have"];
  const services = [
    ["THINK", "agile discovery & assessment"], ["BUILD", "implementation of intelligent solutions"], ["OPERATE & SUPPORT", "smart platforms"], ["IMPROVE", "ongoing services & solutions"], ["CUSTOM-BUILT", "solve your specific challenges"], ["ADVISORY", "senior help on the calls that don't fit a service line"],
  ];
  const companies = "Airbus · Navantia · Simoldes · Alpine F1 · Sidor · Ecopetrol · BellSouth · HP · Huawei · Santander · BBVA · Telmex · Brahma · Pizza Mía · Polar · Nutritec · Seguros RGA · PDVSA";
  const logoSrcs = ["/uploads/logos-1.png", "/uploads/logos-2.png", "/uploads/logos-3.png"];
  const team = ["Inter-generational team", "Senior partner network", "Optimization service flow", "State of the art technologies", "Data analytics & AI solutions"];
  const modelStats = [
    ["3", "Operational Hubs"], ["4", "Execution Surfaces"], ["16", "Databases"], ["13", "Autonomous Agents"],
    ["12", "QBO-Mapped Subtypes"], ["10+", "External Integrations"], ["4", "Continuity Components"],
  ];

  const [form, setForm] = useState({ firstName: "", lastName: "", company: "", email: "", industry: "", challenge: "" });
  const [errors, setErrors] = useState({});
  const field = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const submitThink = () => {
    const next = {};
    if (!form.firstName.trim()) next.firstName = "Required.";
    if (!form.lastName.trim()) next.lastName = "Required.";
    if (!form.company.trim()) next.company = "Required.";
    if (!EMAIL_RE.test(form.email.trim())) next.email = "Enter a valid work email.";
    setErrors(next);
    if (Object.keys(next).length) return;
    const subject = `THINK conversation request — ${form.company}`;
    const body = [
      `Name: ${form.firstName} ${form.lastName}`,
      `Company: ${form.company}`,
      `Work email: ${form.email}`,
      form.industry && `Industry: ${form.industry}`,
      form.challenge && `Biggest challenge: ${form.challenge}`,
    ].filter(Boolean).join("\n");
    window.location.href = `mailto:hello@cuelum.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div>
      <section style={{ minHeight: "82vh", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "var(--page-margin)", paddingBottom: "calc(var(--page-margin) + 8vh)", paddingLeft: "var(--page-margin)", paddingRight: "var(--page-margin)", backgroundImage: "url('/uploads/vexa-hero.png')", backgroundSize: "cover", backgroundPosition: "center", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 55% at center, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.75) 100%)" }}></div>
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "18px", alignItems: "center" }}>
          <h1 style={{ ...vxSerif, fontSize: "var(--text-display-xl)", maxWidth: "14ch", margin: "0 auto" }}>Tailored <span style={vxEmphasis}>intelligence</span> you own</h1>
        </div>
      </section>

      <nav aria-label="On this page" className="vx-jumpnav">
        {JUMP_LINKS.map(([id, n, label]) => (
          <a key={id} href={`#${id}`} aria-current={activeSection === id ? "true" : undefined}
            className={"vx-jumpnav-link" + (activeSection === id ? " vx-jumpnav-link-active" : "")}>
            <span aria-hidden="true" style={{ opacity: 0.5, marginRight: "6px" }}>{n}</span>{label}
          </a>
        ))}
      </nav>

      <VxSection id="vx-approach" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-6)", textAlign: "center" }}>
        <h2 style={{ ...vxSerif, fontSize: "var(--text-display-lg)", maxWidth: "28ch" }}>We turn companies into AI-native enterprises — rebuilding how every function runs for the agentic era.</h2>
        <p style={{ ...vxBody, fontSize: "var(--text-body-lg)", color: "var(--text-primary)", maxWidth: "52ch" }}>We build your company its own <span style={vxEmphasis}>AI brain</span>. Then we hand it over.</p>
      </VxSection>

      <VxSection id="vx-evolution">
        <h2 style={{ ...vxSerif, fontSize: "var(--text-display-md)", color: "var(--magenta)", textAlign: "center" }}>The evolution of work</h2>
        <div style={{ marginTop: "48px" }}>
          <EraRail eras={eras} />
        </div>
        <p style={{ ...vxBody, fontSize: "var(--text-body-lg)", color: "var(--text-primary)", marginTop: "40px", textAlign: "center" }}>No era replaces the last. The edge is running all three at once.</p>
      </VxSection>

      <VxSection id="vx-mission">
        <h2 style={{ ...vxSerif, fontSize: "var(--text-display-md)", textAlign: "center", marginBottom: "clamp(32px,5vh,56px)" }}>Our Mission — we enable companies to:</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "var(--space-6) var(--space-6)", maxWidth: "980px", margin: "0 auto" }}>
          {mission.map(m => (
            <div key={m} className="vx-hover-row" style={{ display: "flex", gap: "14px", alignItems: "baseline", borderTop: "1px solid var(--rule)", padding: "14px 16px 18px", margin: "0 -16px" }}>
              <span aria-hidden="true" style={{ color: "var(--magenta)", fontFamily: "var(--font-title)" }}>—</span>
              <p style={{ ...vxBody, margin: 0, color: "var(--text-primary)", textAlign: "left" }}>{m}</p>
            </div>
          ))}
        </div>
        <p style={{ ...vxBody, marginTop: "40px", textAlign: "center" }}>We turn your company's knowledge into intelligence you can reuse, scale, and own.</p>
      </VxSection>

      <VxSection style={{ textAlign: "center", backgroundImage: "linear-gradient(rgba(0,0,0,0.55),rgba(0,0,0,0.55)), url('/uploads/File 1.png')", backgroundSize: "cover", backgroundPosition: "center", padding: "var(--space-10) var(--page-margin)" }}>
        <h2 style={{ ...vxSerif, fontSize: "var(--text-display-lg)" }}>Different Eras.<br />Different Tools.<br />Same Mindset.</h2>
      </VxSection>

      <VxSection style={{ padding: "var(--space-7) var(--page-margin)" }}>
        <h2 style={{ ...vxSerif, fontSize: "var(--text-heading-lg)", marginBottom: "32px" }}>Three Forces. Measurable Productivity.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "var(--space-6)" }}>
          {[
            ["Experience & AI-native", "Proven at global scale. One mission."],
            ["A curated methodology", "Tailored to how your business actually runs."],
            ["Atelier", "Your AI brain, knowledge bricks, and accelerators."],
          ].map(([t, d]) => (
            <div key={t} style={{ borderTop: "1px solid var(--rule)", paddingTop: "20px", textAlign: "left" }}>
              <h3 style={{ ...vxSerif, fontSize: "var(--text-heading-lg)", marginBottom: "10px" }}>{t}</h3>
              <p style={{ ...vxBody, fontSize: "var(--text-body)" }}>{d}</p>
            </div>
          ))}
        </div>
      </VxSection>

      <VxSection>
        <h2 style={{ ...vxSerif, fontSize: "var(--text-heading-lg)", maxWidth: "22ch", margin: "0 auto" }}>Enter the agentic era with people who've actually built things.</h2>
        <h3 style={{ ...vxSerif, fontSize: "var(--text-display-lg)", margin: "80px 0 20px" }}>Thinkers. Builders. Human.</h3>
        <p style={{ margin: "0 0 40px", color: "var(--text-secondary)" }}>Some of the companies we've built for.</p>
        <div style={{ overflow: "hidden", width: "100%" }}>
          <div className="vx-marquee" style={{ display: "inline-flex", alignItems: "center", willChange: "transform" }}>
            {[0, 1].map(rep => (
              <div key={rep} style={{ display: "inline-flex", alignItems: "center", gap: "56px", paddingRight: "56px" }} aria-hidden={rep === 1 || undefined}>
                {logoSrcs.map(src => <LogoStrip key={src} src={src} />)}
              </div>
            ))}
          </div>
          <span className="sr-only">{companies}</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px 32px", marginTop: "48px", borderTop: "1px solid var(--rule)", paddingTop: "24px" }}>
          {team.map((t, i) => <span key={t} style={{ fontSize: "var(--text-body-sm)", color: "var(--text-secondary)" }}>{i > 0 && <span style={{ marginRight: "32px", opacity: 0.4 }}>|</span>}{t}</span>)}
        </div>
      </VxSection>

      <VxSection>
        <h2 style={{ ...vxSerif, fontSize: "var(--text-display-md)", color: "var(--magenta)", textAlign: "center" }}>The VEXA effect</h2>
        <div style={{ marginTop: "32px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0 var(--space-6)" }}>
          {effect.map(e => <p key={e} className="vx-hover-row vx-effect-row" style={{ ...vxSerif, fontSize: "var(--text-heading-lg)", padding: "18px 0", borderTop: "1px solid var(--rule)", margin: 0, textAlign: "left" }}>{e}</p>)}
        </div>
      </VxSection>

      <VxSection id="vx-services">
        <h2 style={{ ...vxSerif, fontSize: "var(--text-display-md)", marginBottom: "32px", textAlign: "center" }}>Services — from scattered knowledge to productive intelligence</h2>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          {services.map(([tag, text]) => <ServiceRow key={tag} tag={tag} text={text} />)}
          <Rule />
        </div>
      </VxSection>

      <VxSection id="vx-model" style={{ paddingBottom: "var(--space-6)" }}>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ ...vxSerif, fontSize: "var(--text-display-lg)" }}>Example Customer Experience<br /><span style={vxEmphasis}>Flooring Franchise USA</span></h2>
        </div>
        <div style={{ marginTop: "40px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "var(--space-6) var(--space-5)", padding: "var(--space-6) 0", borderTop: "1px solid var(--rule)" }}>
          {modelStats.map(([value, label]) => <Stat key={label} value={value} label={label} size="var(--text-numeric-md)" />)}
        </div>
      </VxSection>

      <VxSection id="vx-contact" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-8)", textAlign: "center" }}>
        <div>
          <h2 style={{ ...vxSerif, fontSize: "var(--text-display-md)", marginBottom: "20px" }}>The first step is a conversation.</h2>
          <p style={{ ...vxBody }}>VEXA's THINK engagement, four to six weeks, maps where your organization stands and the exact path forward.</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)", width: "100%", maxWidth: "560px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "var(--space-5)" }}>
            <TextField label="First name" value={form.firstName} onChange={field("firstName")} error={errors.firstName} required />
            <TextField label="Last name" value={form.lastName} onChange={field("lastName")} error={errors.lastName} required />
            <TextField label="Company" value={form.company} onChange={field("company")} error={errors.company} required />
            <TextField label="Work email" value={form.email} onChange={field("email")} error={errors.email} required />
          </div>
          <TextField label="Industry" value={form.industry} onChange={field("industry")} />
          <TextField label="What's your biggest challenge?" value={form.challenge} onChange={field("challenge")} multiline />
          <Button arrow onClick={submitThink} style={{ alignSelf: "center" }}>Schedule a THINK conversation</Button>
        </div>
      </VxSection>
    </div>
  );
}
