import { useState } from "react";
import { LogoStrip } from "../components/core/LogoStrip.jsx";

const eras = [
  { title: "Human Era", subtitle: "before AI", items: ["Human decides", "Human executes", "Team coordinates", "Human reviews"] },
  { title: "AI-Assisted Era", subtitle: "human + AI", items: ["Human decides", "AI co-executes", "Human coordinates", "Human approves"] },
  { title: "Agentic Era", subtitle: "autonomous AI", items: ["Agent decides", "Agent executes", "Agents orchestrate", "Human governs"] },
];

const missionItems = [
  "Unlock higher productivity across their teams",
  "Align teams, processes, and decisions through stronger governance",
  "Increase project margins while protecting client relationships",
  "Win more opportunities and enter new markets faster",
  "Deliver projects faster, from win to completion",
  "Raise quality standards across every project",
  "Grow without operational complexity",
  "Create a high-performance engineering organization",
];

const effects = [
  "Weeks,\nnot months",
  "Tested in real\noperations\nalong the way",
  "Knowledge\ntransfer\nbuilt in",
  "It compounds\ninstead of\nresetting",
  "No pilots.\nProduction\nready",
];

// The short labels are the closed-card copy shown in the reference. The
// descriptions are intentionally retained from the existing site and become
// visible when a service expands.
const services = [
  ["Think", "agile discovery & assessment"],
  ["Build", "implementation of intelligent solutions"],
  ["Operate & Support", "smart platforms"],
  ["Improve", "ongoing services & solutions"],
  ["Custom-built", "solve your specific challenges"],
  ["Advisory", "senior help on the calls that don't fit a service line"],
];

const before = [
  "No project-to-invoice alignment",
  "Delayed project activation",
  "Disconnected material coordination",
  "Limited operational visibility",
  "Reactive problem solving",
  "Manual data reconciliation",
];

const after = [
  "Aligned projects and invoices",
  "Faster project readiness",
  "Connected material planning",
  "Real-time operational visibility",
  "Proactive issue management",
  "Automated information flow",
];

const stats = ["10+ External Integrations", "16 Databases", "13 Autonomous Agents", "12 QBO-Mapped Subtypes", "3 Operational Hubs"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function VexaPage() {
  const [activeService, setActiveService] = useState(0);
  const [form, setForm] = useState({ firstName: "", lastName: "", company: "", email: "", industry: "", challenge: "" });
  const [errors, setErrors] = useState({});
  const field = key => event => setForm(current => ({ ...current, [key]: event.target.value }));

  const submitThink = event => {
    event.preventDefault();
    const next = {};
    if (!form.firstName.trim()) next.firstName = true;
    if (!form.lastName.trim()) next.lastName = true;
    if (!form.company.trim()) next.company = true;
    if (!EMAIL_RE.test(form.email.trim())) next.email = true;
    setErrors(next);
    if (Object.keys(next).length) return;
    const subject = `THINK conversation request from ${form.company}`;
    const message = [
      `Name: ${form.firstName} ${form.lastName}`,
      `Company: ${form.company}`,
      `Work email: ${form.email}`,
      form.industry && `Industry: ${form.industry}`,
      form.challenge && `Biggest challenge: ${form.challenge}`,
    ].filter(Boolean).join("\n");
    window.location.href = `mailto:hello@cuelum.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  };

  return (
    <main className="vx-page">
      <style>{`
        .vx-page { --vx-edge:clamp(20px,2.4vw,40px); --vx-radius:8px; background:#fff; color:#171820; overflow:hidden; text-align:center; font-family:var(--font-sans); }
        .vx-page *, .vx-page *::before, .vx-page *::after { box-sizing:border-box; }
        .vx-shell { width:calc(100% - (2 * var(--vx-edge))); max-width:1480px; margin-inline:auto; }
        .vx-serif { margin:0; font-family:var(--font-serif); font-weight:200; letter-spacing:-.035em; line-height:.98; }
        .vx-body { margin:0; font-size:clamp(14px,1.1vw,18px); line-height:1.45; letter-spacing:.005em; }
        .vx-panel { border-radius:var(--vx-radius); background:#000; color:#fff; }

        .vx-hero { position:relative; height:clamp(510px,47.2vw,730px); margin-top:var(--vx-edge); overflow:hidden; }
        .vx-hero-copy { position:absolute; z-index:2; left:6%; top:50%; width:42%; transform:translateY(-51%); }
        .vx-hero-logo { display:block; width:clamp(116px,12vw,184px); margin:0 auto clamp(31px,3vw,48px); }
        .vx-hero h1 { max-width:8.2ch; margin-inline:auto; font-size:clamp(48px,5.05vw,78px); }
        .vx-hero-bars { position:absolute; z-index:1; width:70%; height:100%; right:-18%; top:0; object-fit:cover; object-position:29% 50%; }

        .vx-intro { padding:clamp(112px,11.8vw,182px) 20px clamp(155px,16.5vw,255px); }
        .vx-intro-inner { max-width:920px; margin:auto; display:grid; gap:31px; }
        .vx-intro .vx-body { font-size:clamp(15px,1.22vw,19px); }

        .vx-evolution { padding-bottom:clamp(80px,8vw,124px); }
        .vx-heading { font-size:clamp(50px,5.2vw,80px); }
        .vx-heading-note { margin:15px auto clamp(45px,4.8vw,74px); max-width:700px; }
        .vx-era-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; }
        .vx-era { min-height:clamp(335px,28vw,430px); padding:clamp(42px,4vw,62px) 24px 32px; display:flex; flex-direction:column; align-items:center; justify-content:flex-start; }
        .vx-era h3 { font-size:clamp(31px,3vw,46px); }
        .vx-era-subtitle { margin:8px 0 clamp(44px,4vw,65px); font-size:clamp(13px,1vw,16px); }
        .vx-era-list { margin:0; padding:0; list-style:none; font-size:clamp(14px,1.05vw,17px); line-height:1.55; }

        .vx-mission { min-height:clamp(460px,38vw,590px); padding:clamp(44px,4vw,66px) 30px; display:flex; flex-direction:column; justify-content:center; }
        .vx-mission h2 { font-size:clamp(42px,4.4vw,68px); margin-bottom:42px; }
        .vx-mission-list { margin:0 auto; padding:0; list-style:none; font-size:clamp(13px,1vw,16px); line-height:1.5; }
        .vx-mission-end { margin:38px auto 0; color:#aaa; max-width:570px; }

        .vx-different-wrap { padding:clamp(170px,16vw,250px) 0 0; }
        .vx-different { min-height:clamp(400px,33vw,510px); display:grid; place-items:center; overflow:hidden; position:relative; background:#111; }
        .vx-different img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:center; }
        .vx-different h2 { position:relative; color:#fff; font-size:clamp(52px,5.7vw,88px); line-height:1.06; }
        .vx-forces { display:grid; grid-template-columns:repeat(3,1fr); gap:30px; padding:22px 42px 0; }
        .vx-force h3 { font-size:clamp(27px,2.7vw,42px); line-height:1.05; }
        .vx-force p { max-width:28ch; margin:15px auto 0; font-size:clamp(12px,.95vw,15px); line-height:1.3; }

        .vx-team { padding:clamp(152px,16vw,250px) 0 clamp(165px,18vw,280px); }
        .vx-team-lead { font-size:clamp(15px,1.2vw,19px); }
        .vx-team h2 { margin:24px 0 39px; font-size:clamp(58px,6.6vw,102px); }
        .vx-team-note { margin:0 0 38px; font-size:clamp(14px,1.1vw,18px); }
        .vx-logo-window { width:100vw; margin-left:calc(50% - 50vw); overflow:hidden; }
        .vx-logo-track { display:flex; width:max-content; animation:vx-marquee 34s linear infinite; will-change:transform; }
        .vx-logo-group { display:flex; gap:12px; padding-right:12px; }
        @keyframes vx-marquee { to { transform:translateX(-50%); } }

        .vx-effect { padding-bottom:clamp(100px,10vw,155px); }
        .vx-effect h2 { font-size:clamp(50px,5.2vw,80px); margin-bottom:clamp(55px,5.8vw,90px); }
        .vx-effect-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:6px; }
        .vx-effect-card { min-height:clamp(300px,26vw,404px); display:grid; place-items:center; position:relative; overflow:hidden; border-radius:var(--vx-radius); background:#4d002f; color:#fff; }
        .vx-effect-card::before { content:""; position:absolute; inset:0; background:url('/uploads/vexa-effect-texture.png') center/cover no-repeat; }
        .vx-effect-card:nth-child(1)::before { object-position:left; transform:scale(1.05); }
        .vx-effect-card:nth-child(2)::before { transform:scaleX(-1) scale(1.08); }
        .vx-effect-card:nth-child(3)::before { background-position:58% 48%; transform:scale(1.12); }
        .vx-effect-card:nth-child(4)::before { background-position:74% 56%; transform:scaleX(-1) scale(1.04); }
        .vx-effect-card:nth-child(5)::before { background-position:right center; transform:scale(1.08); }
        .vx-effect-card p { position:relative; margin:0; padding:20px; white-space:pre-line; font-family:var(--font-serif); font-size:clamp(26px,2.55vw,39px); font-weight:200; letter-spacing:-.025em; line-height:.92; }

        .vx-services { padding-bottom:clamp(120px,12vw,185px); }
        .vx-services h2 { font-size:clamp(52px,5.5vw,84px); margin-bottom:clamp(58px,6vw,92px); }
        .vx-service-panels { display:flex; gap:7px; height:clamp(350px,29vw,450px); }
        .vx-service-panel { position:relative; min-width:0; flex:1; border:0; border-radius:var(--vx-radius); background:#000; color:#fff; overflow:hidden; cursor:pointer; transition:flex .5s cubic-bezier(.22,1,.36,1); }
        .vx-service-panel[aria-pressed="true"] { flex:6; }
        .vx-service-title { position:absolute; inset:50% auto auto 50%; transform:translate(-50%,-50%) rotate(90deg); white-space:nowrap; font:200 clamp(27px,2.8vw,43px)/1 var(--font-serif); letter-spacing:-.025em; transition:transform .45s cubic-bezier(.22,1,.36,1); }
        .vx-service-panel[aria-pressed="true"] .vx-service-title { transform:translate(-50%,-92%); }
        .vx-service-copy { position:absolute; left:25px; right:25px; top:56%; margin:0; opacity:0; font-size:clamp(13px,1.05vw,17px); line-height:1.4; transition:opacity .25s ease .14s; }
        .vx-service-panel[aria-pressed="true"] .vx-service-copy { opacity:1; }

        .vx-case { padding-bottom:clamp(240px,27vw,420px); }
        .vx-case h2 { font-size:clamp(48px,5.1vw,78px); margin-bottom:45px; }
        .vx-case-description { padding:28px 42px; color:#fff; }
        .vx-case-description p { max-width:1040px; margin:auto; }
        .vx-stats { display:flex; justify-content:space-around; align-items:center; gap:20px; margin:10px 0; padding:17px 25px; overflow:hidden; border-radius:var(--vx-radius); color:#fff; background:url('/uploads/vexa-effect-texture.png') center 46%/cover no-repeat; font-size:clamp(11px,.9vw,14px); letter-spacing:.12em; white-space:nowrap; }
        .vx-before-after { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
        .vx-result { min-height:clamp(300px,25vw,385px); padding:43px 25px 30px; }
        .vx-result h3 { font-size:clamp(48px,5vw,77px); margin-bottom:28px; }
        .vx-result ul { list-style:none; margin:0; padding:0; font-size:clamp(13px,1vw,16px); line-height:1.42; }

        .vx-contact { padding-bottom:clamp(140px,14vw,215px); }
        .vx-contact-tag { display:inline-block; margin-bottom:31px; padding:16px 30px; border-radius:6px; background:#000; color:#aaa; font-size:12px; }
        .vx-contact h2 { font-size:clamp(42px,4.6vw,71px); }
        .vx-contact-copy { margin:22px auto 50px; max-width:710px; color:#92929a; }
        .vx-form { width:min(830px,90%); margin:auto; }
        .vx-form-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:24px; }
        .vx-form-row-two { display:grid; grid-template-columns:.75fr 1.5fr; gap:55px; width:68%; margin:28px auto 0; }
        .vx-field { position:relative; }
        .vx-field input { width:100%; border:0; border-bottom:1px solid #aaa; border-radius:0; padding:11px 4px 16px; background:transparent; color:#171820; outline:none; text-align:center; font:14px var(--font-sans); }
        .vx-field input::placeholder { color:#92929a; opacity:1; }
        .vx-field[data-error="true"] input { border-color:#d70070; }
        .vx-submit { margin-top:44px; border:0; border-radius:6px; padding:14px 28px; background:#df0072; color:#fff; cursor:pointer; font:14px var(--font-sans); transition:transform .16s ease,background .16s ease; }
        .vx-submit:hover { background:#bd0061; }
        .vx-submit:active { transform:scale(.97); }

        @media (max-width:800px) {
          .vx-hero { height:580px; }
          .vx-hero-copy { left:5%; top:38%; width:66%; }
          .vx-hero h1 { font-size:clamp(42px,11vw,62px); }
          .vx-hero-bars { width:100%; height:55%; right:-41%; top:44%; object-position:30% 50%; }
          .vx-era-grid,.vx-forces,.vx-effect-grid { grid-template-columns:1fr; }
          .vx-era { min-height:300px; }
          .vx-mission { margin-top:8px; }
          .vx-different-wrap { padding-top:120px; }
          .vx-different { min-height:420px; }
          .vx-different h2 { font-size:clamp(45px,12vw,66px); }
          .vx-forces { padding:44px 8px 0; gap:46px; }
          .vx-team { padding:130px 0 150px; }
          .vx-effect-grid { gap:8px; }
          .vx-effect-card { min-height:250px; }
          .vx-service-panels { height:auto; flex-direction:column; }
          .vx-service-panel,.vx-service-panel[aria-pressed="true"] { flex:none; height:96px; }
          .vx-service-panel[aria-pressed="true"] { height:270px; }
          .vx-service-title,.vx-service-panel[aria-pressed="true"] .vx-service-title { transform:translate(-50%,-50%); }
          .vx-service-panel[aria-pressed="true"] .vx-service-title { top:39%; }
          .vx-case { padding-bottom:190px; }
          .vx-stats { justify-content:flex-start; overflow-x:auto; }
          .vx-before-after { grid-template-columns:1fr; }
          .vx-form-grid { grid-template-columns:1fr 1fr; }
          .vx-form-row-two { width:100%; grid-template-columns:1fr; gap:24px; }
        }
        @media (max-width:520px) {
          .vx-hero { height:530px; }
          .vx-hero-copy { top:34%; width:82%; }
          .vx-hero-logo { margin-bottom:25px; }
          .vx-hero-bars { width:125%; right:-63%; top:48%; }
          .vx-intro { padding-top:100px; padding-bottom:135px; }
          .vx-heading,.vx-case h2 { font-size:44px; }
          .vx-form-grid { grid-template-columns:1fr; }
          .vx-case-description { padding-inline:22px; }
          .vx-result h3 { font-size:48px; }
        }
        @media (prefers-reduced-motion:reduce) { .vx-logo-track { animation:none; } .vx-service-panel,.vx-service-title,.vx-service-copy { transition:none; } }
      `}</style>

      <section className="vx-shell vx-panel vx-hero">
        <div className="vx-hero-copy">
          <img className="vx-hero-logo" src="/assets/vexa-white.png" alt="VEXA" />
          <h1 className="vx-serif">Tailored intelligence you own</h1>
        </div>
        <img className="vx-hero-bars" src="/uploads/vexa-mockup-bars-cutout.png" alt="" />
      </section>

      <section className="vx-intro">
        <div className="vx-intro-inner">
          <p className="vx-body">VEXA is the AI-Brain consultancy for business transformation division of CUELUM.</p>
          <p className="vx-body">We turn companies into AI-native enterprises, rebuilding how every function runs for<br className="vx-desktop-break" /> the Agentic era.</p>
          <p className="vx-body">We build your company its own AI brain, tailor solutions for your biggest<br className="vx-desktop-break" /> challenges and then we hand it over all over.</p>
        </div>
      </section>

      <section className="vx-shell vx-evolution">
        <h2 className="vx-serif vx-heading">The evolution of work</h2>
        <p className="vx-body vx-heading-note">The strongest players don’t move from one era to the next. They learn to<br className="vx-desktop-break" /> leverage all three simultaneously.</p>
        <div className="vx-era-grid">
          {eras.map(era => <article className="vx-panel vx-era" key={era.title}>
            <h3 className="vx-serif">{era.title}</h3>
            <span className="vx-era-subtitle">{era.subtitle}</span>
            <ul className="vx-era-list">{era.items.map(item => <li key={item}>{item}</li>)}</ul>
          </article>)}
        </div>
        <article className="vx-panel vx-mission">
          <h2 className="vx-serif">Our Mission</h2>
          <ul className="vx-mission-list">{missionItems.map(item => <li key={item}>{item}</li>)}</ul>
          <p className="vx-body vx-mission-end">We turn your company's knowledge into intelligence<br /> you can reuse, scale, and own.</p>
        </article>
      </section>

      <section className="vx-shell vx-different-wrap">
        <div className="vx-panel vx-different">
          <img src="/uploads/vexa-different-eras.png" alt="Abstract glass ribbons in black, copper, and magenta" />
          <h2 className="vx-serif">Different Eras.<br />Different Tools.<br />Same Mindset.</h2>
        </div>
        <div className="vx-forces">
          {[
            ["Experience & AI native", "Proven at global scale.\nOne mission."],
            ["A curated methodology", "Tailored to how your business\nactually runs."],
            ["AI Brain. Atelier", "Knowledge bricks, and\naccelerators."],
          ].map(([title, copy]) => <article className="vx-force" key={title}><h3 className="vx-serif">{title}</h3><p>{copy.split("\n").map((line, i) => <span key={line}>{i > 0 && <br />}{line}</span>)}</p></article>)}
        </div>
      </section>

      <section className="vx-team">
        <p className="vx-team-lead">Enter the agentic era with people who've actually built things</p>
        <h2 className="vx-serif">Thinkers. Builders. Human.</h2>
        <p className="vx-team-note">Some of the companies we've built for:</p>
        <div className="vx-logo-window">
          <div className="vx-logo-track">
            {[0,1].map(repeat => <div className="vx-logo-group" aria-hidden={repeat === 1 || undefined} key={repeat}>
              {["/uploads/logos-1.png","/uploads/logos-2.png","/uploads/logos-3.png"].map(src => <LogoStrip src={src} height={78} key={src} />)}
            </div>)}
          </div>
        </div>
      </section>

      <section className="vx-shell vx-effect">
        <h2 className="vx-serif">Our effect</h2>
        <div className="vx-effect-grid">
          {effects.map(effect => <article className="vx-effect-card" key={effect}><p>{effect}</p></article>)}
        </div>
      </section>

      <section className="vx-shell vx-services">
        <h2 className="vx-serif">Services</h2>
        <div className="vx-service-panels" role="group" aria-label="VEXA services">
          {services.map(([title, copy], index) => <button className="vx-service-panel" type="button" aria-pressed={activeService === index} onClick={() => setActiveService(index)} key={title}>
            <span className="vx-service-title">{title}</span>
            <span className="vx-service-copy">{copy}</span>
          </button>)}
        </div>
      </section>

      <section className="vx-shell vx-case">
        <h2 className="vx-serif">What customer success looks like</h2>
        <div className="vx-panel vx-case-description"><p className="vx-body">A national flooring franchise’s operations, unified into one system: scheduling, CRM, and vendor<br className="vx-desktop-break" /> management running on autonomous agents built for the way the business actually works.</p></div>
        <div className="vx-stats">{stats.map(stat => <span key={stat}>{stat}</span>)}</div>
        <div className="vx-before-after">
          <article className="vx-panel vx-result"><h3 className="vx-serif">Before</h3><ul>{before.map(item => <li key={item}>{item}</li>)}</ul></article>
          <article className="vx-panel vx-result"><h3 className="vx-serif">After 2 months</h3><ul>{after.map(item => <li key={item}>{item}</li>)}</ul></article>
        </div>
      </section>

      <section className="vx-contact">
        <span className="vx-contact-tag">Book a call with us!</span>
        <h2 className="vx-serif">Tell us what your challenge is!</h2>
        <p className="vx-body vx-contact-copy">VEXA's THINK engagement (four to six weeks), maps where<br className="vx-desktop-break" /> your organization stands and the exact path forward.</p>
        <form className="vx-form" onSubmit={submitThink} noValidate>
          <div className="vx-form-grid">
            {[['firstName','First Name'],['lastName','Last Name'],['company','Company'],['email','Work Email']].map(([key,label]) => <label className="vx-field" data-error={errors[key] || undefined} key={key}><input value={form[key]} onChange={field(key)} placeholder={label} aria-label={label} aria-invalid={errors[key] || undefined} /></label>)}
          </div>
          <div className="vx-form-row-two">
            <label className="vx-field"><input value={form.industry} onChange={field('industry')} placeholder="Industry" aria-label="Industry" /></label>
            <label className="vx-field"><input value={form.challenge} onChange={field('challenge')} placeholder="What's your biggest challenge?" aria-label="What's your biggest challenge?" /></label>
          </div>
          <button className="vx-submit" type="submit">Schedule</button>
        </form>
      </section>
    </main>
  );
}
