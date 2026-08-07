import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "../components/core/Button.jsx";
import { TextField } from "../components/core/TextField.jsx";
import { Pill } from "../components/core/Pill.jsx";
import { LogoStrip } from "../components/core/LogoStrip.jsx";

import humanEraImage from "../../humanera.png";
import assistedEraImage from "../../aiassistedera.png";
import agenticEraImage from "../../02curiosityandinvexa03agenticera.png";
import missionImage from "../../ourmissionvexa.png";
import differentToolsImage from "../../differenteras...png";
import effectOne from "../../weeksnotmonthsoureffect.png";
import effectTwo from "../../productionreadyoureffect.png";
import effectThree from "../../testedinrealoperations.png";
import effectFour from "../../knowledgetransferbuiltin.png";
import effectFive from "../../itcompoundsinsteadofresetting.png";
import serviceOne from "../../forusev21.png";
import serviceTwo from "../../02servicesvexa.png";
import serviceThree from "../../03servicesvexa.png";
import serviceFour from "../../04servicesvexa.png";
import serviceFive from "../../05servicesvexa.png";
import serviceSix from "../../06servicesvexa.png";
import customerBackdrop from "../../foruse20.png";

const serif = { margin: 0, fontFamily: "var(--font-serif)", fontWeight: "var(--weight-light)", lineHeight: 1.04, letterSpacing: "-0.025em" };
const body = { margin: 0, color: "var(--text-secondary)", lineHeight: "var(--body-line-height)" };

const eras = [
  { n: "01", title: "Human Era", subtitle: "before AI", image: humanEraImage, items: ["Human decides (intuition + experience)", "Human executes (manual)", "Team coordinates (meetings & emails)", "Human reviews (full control)"] },
  { n: "02", title: "AI-Assisted Era", subtitle: "today, human + AI", image: assistedEraImage, items: ["Human decides (AI suggests options)", "AI co-executes (drafts, analyzes, creates)", "Human coordinates (AI summarizes & organizes)", "Human approves (final validation)"] },
  { n: "03", title: "Agentic Era", subtitle: "next, autonomous AI", image: agenticEraImage, items: ["Agent decides (on business goals)", "Agent executes (autonomous, continuous)", "Agents orchestrate (AI networks collaborate)", "Human governs (sets vision & boundaries)"] },
];

const effects = [
  ["Weeks, not months", effectOne],
  ["Production-ready, not a pilot", effectTwo],
  ["Tested in real operations along the way", effectThree],
  ["Knowledge transfer built in", effectFour],
  ["It compounds instead of resetting", effectFive],
];

const services = [
  ["Think", "agile discovery & assessment", serviceOne],
  ["Build", "implementation of intelligent solutions", serviceTwo],
  ["Operate & Support", "smart platforms", serviceThree],
  ["Improve", "ongoing services & solutions", serviceFour],
  ["Custom-built", "solve your specific challenges", serviceFive],
  ["Advisory", "senior help on the calls that don't fit a service line", serviceSix],
];

const missionItems = [
  "Ship projects faster, from win to close",
  "Win more work and enter new markets sooner",
  "Protect margins without straining client relationships",
  "Align teams and decisions under one governance layer",
  "Raise quality on every project, not just the flagship ones",
  "Grow without adding operational drag",
];

const modelStats = [
  ["10+", "External Integrations"], ["12", "QBO-Mapped Subtypes"], ["4", "Execution Surfaces"],
  ["4", "Continuity Components"], ["16", "Databases"], ["13", "Autonomous Agents"], ["3", "Operational Hubs"],
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

gsap.registerPlugin(ScrollTrigger);

function EffectGallery() {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const staticMode = window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 760px)").matches;
    if (staticMode) return;
    const ctx = gsap.context(() => {
      const distance = () => Math.max(0, trackRef.current.scrollWidth - viewportRef.current.clientWidth);
      gsap.to(trackRef.current, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="vx-effect">
      <h2 style={{ ...serif, marginBottom: "104px" }}>Our Effect</h2>
      <div ref={viewportRef} className="vx-effect-viewport">
        <div ref={trackRef} className="vx-effect-track">
          {effects.map(([text, image]) => <article className="vx-effect-card" key={text}><img src={image} alt="" /><p>{text}</p></article>)}
        </div>
      </div>
    </section>
  );
}

export function VexaPage() {
  const [activeService, setActiveService] = useState(0);
  const [form, setForm] = useState({ firstName: "", lastName: "", company: "", email: "", industry: "", challenge: "" });
  const [errors, setErrors] = useState({});
  const field = key => event => setForm(current => ({ ...current, [key]: event.target.value }));

  const submitThink = () => {
    const next = {};
    if (!form.firstName.trim()) next.firstName = "Required.";
    if (!form.lastName.trim()) next.lastName = "Required.";
    if (!form.company.trim()) next.company = "Required.";
    if (!EMAIL_RE.test(form.email.trim())) next.email = "Enter a valid work email.";
    setErrors(next);
    if (Object.keys(next).length) return;
    const subject = `THINK conversation request from ${form.company}`;
    const message = [`Name: ${form.firstName} ${form.lastName}`, `Company: ${form.company}`, `Work email: ${form.email}`, form.industry && `Industry: ${form.industry}`, form.challenge && `Biggest challenge: ${form.challenge}`].filter(Boolean).join("\n");
    window.location.href = `mailto:hello@cuelum.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  };

  return (
    <main className="vx-mockup-page">
      <style>{`
        .vx-mockup-page { background:#000; color:#fff; overflow:hidden; }
        .vx-wrap { width:min(1180px, calc(100% - 2 * var(--page-margin))); margin-inline:auto; }
        .vx-section { padding:clamp(76px,10vw,136px) 0; }
        .vx-hero { min-height:100vh; display:grid; place-items:center; position:relative; background:url('/uploads/vexa-hero.png') center/cover no-repeat; }
        .vx-hero::after { content:""; position:absolute; inset:0; background:rgba(0,0,0,.07); }
        .vx-hero h1 { position:relative; z-index:1; max-width:10ch; text-align:center; font-size:clamp(56px,7.1vw,94px); }
        .vx-intro { width:100%; box-sizing:border-box; display:flex; flex-direction:column; align-items:center; text-align:center; padding-inline:var(--page-margin); padding-bottom:clamp(50px,6vw,84px); }
        .vx-intro h2 { max-width:24ch; margin-inline:auto; font-size:clamp(34px,4.2vw,62px); }
        .vx-intro p { margin-top:24px; font-size:14px; color:#fff; }
        .vx-evolution-heading { text-align:center; margin-bottom:56px; }
        .vx-evolution-heading h2 { font-size:clamp(30px,3vw,45px); color:#fff; }
        .vx-evolution-heading p { margin-top:14px; color:#fff; font-size:14px; }
        .vx-era-list { display:flex; flex-direction:column; gap:38px; }
        .vx-era { display:grid; grid-template-columns:minmax(280px, .9fr) minmax(0,1.25fr); align-items:stretch; min-height:238px; }
        .vx-era-copy { padding:30px 38px 28px 0; display:grid; grid-template-columns:52px 1fr; align-content:center; text-align:left; }
        .vx-era-number { font:bold 22px var(--font-serif); color:#fff; }
        .vx-era h3 { font:var(--weight-light) clamp(27px,2.7vw,40px)/1.05 var(--font-serif); margin:0; }
        .vx-era-subtitle { display:block; margin:9px 0 22px; color:#fff; font-size:15px; }
        .vx-era p { margin:0 0 7px; color:#8f8f8f; font-size:12px; }
        .vx-era-image { min-height:238px; overflow:hidden; }
        .vx-era-image img { width:100%; height:100%; max-height:290px; object-fit:cover; display:block; }
        .vx-mission { display:grid; grid-template-columns:minmax(0,1.05fr) minmax(380px,.95fr); gap:48px; align-items:center; padding:clamp(72px,10vw,136px) var(--page-margin) clamp(96px,12vw,170px) 0; }
        .vx-mission-image { height:clamp(360px,45vw,590px); overflow:hidden; }
        .vx-mission-image img { width:100%; height:100%; object-fit:cover; display:block; }
        .vx-mission-copy { max-width:580px; text-align:left; }
        .vx-mission-copy h2 { font-size:clamp(38px,4vw,58px); margin-bottom:28px; }
        .vx-mission-copy > p { color:#fff; font-size:14px; }
        .vx-mission-list { margin:28px 0; display:flex; flex-direction:column; gap:17px; }
        .vx-mission-row { display:grid; grid-template-columns:34px 1fr; gap:14px; align-items:start; }
        .vx-mission-row span { color:#777; font-size:11px; }
        .vx-mission-row p { margin:0; color:#b8b8b8; font-size:13px; }
        .vx-different { min-height:520px; display:grid; place-items:center; text-align:center; position:relative; background:center/cover no-repeat; }
        .vx-different::after { content:""; position:absolute; inset:0; background:rgba(0,0,0,.20); }
        .vx-different h2 { position:relative; z-index:1; font-size:clamp(48px,6vw,84px); }
        .vx-forces { padding:40px var(--page-margin) 120px; display:grid; grid-template-columns:repeat(3,1fr); gap:34px; }
        .vx-force { text-align:center; }
        .vx-force h3 { font:var(--weight-light) clamp(23px,2.2vw,34px)/1.1 var(--font-serif); margin:0 0 12px; }
        .vx-force p { margin:0; color:#aaa; font-size:12px; }
        .vx-team { text-align:center; padding:clamp(130px,11vw,170px) var(--page-margin) clamp(150px,13vw,200px); }
        .vx-team-lead { font:var(--weight-light) clamp(22px,2.2vw,32px)/1.2 var(--font-serif); margin:0; }
        .vx-team h2 { font-size:clamp(48px,6vw,82px); margin:18px 0 54px; }
        .vx-team-note { margin:0 0 34px; color:#aaa; font-size:12px; }
        .vx-logo-window { width:100vw; margin-left:calc(50% - 50vw); overflow:hidden; }
        .vx-logo-track { display:inline-flex; align-items:center; animation:vx-marquee 30s linear infinite; will-change:transform; }
        .vx-logo-group { display:inline-flex; align-items:center; gap:24px; padding-right:24px; }
        @keyframes vx-marquee { to { transform:translateX(-50%); } }
        .vx-effect { box-sizing:border-box; padding:80px 0 120px var(--page-margin); background:#000; }
        .vx-effect h2 { font-size:clamp(38px,4vw,58px); text-align:center; padding-right:var(--page-margin); color:#fff; }
        .vx-effect-viewport { overflow:hidden; }
        .vx-effect-track { display:flex; width:max-content; gap:16px; padding-right:var(--page-margin); }
        .vx-effect-card { flex:0 0 min(70vw,760px); width:min(70vw,760px); height:clamp(330px,44vw,560px); position:relative; overflow:hidden; }
        .vx-effect-card img { width:100%; height:100%; object-fit:cover; display:block; }
        .vx-effect-card::after { content:""; position:absolute; inset:0; background:rgba(0,0,0,.17); }
        .vx-effect-card p { position:absolute; z-index:1; inset:0; display:grid; place-items:center; margin:0; padding:30px; text-align:center; font:var(--weight-light) clamp(30px,3.5vw,50px)/1.05 var(--font-serif); }
        .vx-services { padding:80px var(--page-margin) 130px; }
        .vx-services-heading { text-align:center; margin-bottom:44px; }
        .vx-services-heading h2 { font-size:clamp(35px,4vw,54px); }
        .vx-services-heading p { margin:10px 0 0; color:#fff; font:var(--weight-light) clamp(20px,2.1vw,30px)/1.2 var(--font-serif); }
        .vx-service-panels { height:470px; display:flex; gap:4px; width:min(1180px,100%); margin:auto; }
        .vx-service-panel { position:relative; flex:1 1 0; min-width:0; overflow:hidden; border:0; padding:0; background:#111; color:#fff; cursor:pointer; transition:flex .55s cubic-bezier(.22,1,.36,1); }
        .vx-service-panel[aria-pressed='true'] { flex:6 1 0; }
        .vx-service-panel img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; filter:brightness(.52); }
        .vx-service-number { position:absolute; top:22px; left:50%; transform:translateX(-50%); font:16px var(--font-serif); }
        .vx-service-title { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%) rotate(90deg); white-space:nowrap; font:var(--weight-light) 20px var(--font-serif); }
        .vx-service-panel[aria-pressed='true'] .vx-service-title { transform:translate(-50%,-50%); font-size:34px; }
        .vx-service-description { position:absolute; left:24px; right:24px; bottom:36px; margin:0; text-align:center; color:#fff; font-size:13px; opacity:0; }
        .vx-service-panel[aria-pressed='true'] .vx-service-description { opacity:1; }
        .vx-customer { min-height:100dvh; box-sizing:border-box; display:grid; place-items:center; text-align:center; position:relative; padding:clamp(110px,12vh,150px) var(--page-margin); background:center/cover no-repeat; }
        .vx-customer::after { content:""; position:absolute; inset:0; background:rgba(0,0,0,.46); }
        .vx-customer-content { position:relative; z-index:1; max-width:820px; }
        .vx-customer h2 { font-size:clamp(32px,4vw,52px); white-space:nowrap; }
        .vx-customer h3 { font:var(--weight-light) clamp(20px,2.2vw,31px)/1.2 var(--font-serif); margin:12px 0 18px; }
        .vx-customer p { margin:0 auto; max-width:67ch; color:#fff; line-height:1.55; }
        .vx-pills { display:flex; flex-wrap:wrap; justify-content:center; gap:9px; margin-top:30px; }
        .vx-contact { padding:clamp(95px,12vw,170px) var(--page-margin); display:flex; flex-direction:column; align-items:center; text-align:center; }
        .vx-contact h2 { font-size:clamp(36px,4vw,56px); }
        .vx-contact-copy { max-width:760px; margin-top:18px; color:#aaa; }
        .vx-form { width:100%; max-width:600px; margin-top:54px; display:flex; flex-direction:column; gap:24px; }
        .vx-form-grid { display:grid; grid-template-columns:1fr 1fr; gap:24px; }
        .vx-gray-button { background:#4c4c4c !important; border-color:#4c4c4c !important; color:#fff !important; }
        @media (max-width:760px) {
          .vx-era { grid-template-columns:1fr; }
          .vx-era-copy { padding:22px 0; }
          .vx-era-image { min-height:210px; }
          .vx-mission { grid-template-columns:1fr; padding-right:var(--page-margin); }
          .vx-mission-image { height:330px; }
          .vx-forces { grid-template-columns:1fr; gap:46px; }
          .vx-service-panels { height:auto; flex-direction:column; }
          .vx-service-panel,.vx-service-panel[aria-pressed='true'] { flex:none; height:110px; }
          .vx-service-panel[aria-pressed='true'] { height:300px; }
          .vx-service-title,.vx-service-panel[aria-pressed='true'] .vx-service-title { transform:translate(-50%,-50%); font-size:25px; }
          .vx-form-grid { grid-template-columns:1fr; }
          .vx-effect { padding-left:var(--page-margin); }
          .vx-effect-viewport { overflow-x:auto; scrollbar-width:none; }
          .vx-effect-track { width:max-content; }
          .vx-effect-card { flex-basis:84vw; width:84vw; }
          .vx-customer h2 { white-space:normal; }
        }
        @media (prefers-reduced-motion:reduce) { .vx-logo-track { animation:none; } .vx-service-panel { transition:none; } }
      `}</style>

      <section className="vx-hero">
        <h1 style={serif}>Tailored intelligence you own</h1>
      </section>

      <section className="vx-section vx-intro vx-wrap">
        <h2 style={serif}>We turn companies into AI-native enterprises, rebuilding how every function runs for the agentic era.</h2>
        <p>We build your company its own <em>AI brain</em>. Then we hand it over.</p>
      </section>

      <section className="vx-section vx-wrap">
        <header className="vx-evolution-heading">
          <h2 style={serif}>The evolution of work</h2>
          <p>No era replaces the last. The edge is running all three at once.</p>
        </header>
        <div className="vx-era-list">
          {eras.map(era => (
            <article className="vx-era" key={era.n}>
              <div className="vx-era-copy">
                <span className="vx-era-number">{era.n}</span>
                <div>
                  <h3>{era.title}</h3>
                  <span className="vx-era-subtitle">{era.subtitle}</span>
                  {era.items.map(item => <p key={item}>{item}</p>)}
                </div>
              </div>
              <div className="vx-era-image"><img src={era.image} alt="" /></div>
            </article>
          ))}
        </div>
      </section>

      <section className="vx-mission">
        <div className="vx-mission-image"><img src={missionImage} alt="Abstract rippling surface in black, ivory, and magenta" /></div>
        <div className="vx-mission-copy">
          <h2 style={serif}>Our Mission</h2>
          <p>We enable companies to:</p>
          <div className="vx-mission-list">
            {missionItems.map((item, index) => <div className="vx-mission-row" key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></div>)}
          </div>
          <p>We turn your company's knowledge into<br />intelligence you can reuse, scale, and own.</p>
        </div>
      </section>

      <section className="vx-different" style={{ backgroundImage: `url(${differentToolsImage})` }}>
        <h2 style={serif}>Different Eras.<br />Different Tools.<br />Same Mindset.</h2>
      </section>

      <section className="vx-forces">
        {[["Experience & AI-native", "Proven at global scale. One mission."], ["A curated methodology", "Tailored to how your business actually runs."], ["Atelier", "Your AI brain, knowledge bricks, and accelerators."]].map(([title, description]) => (
          <div className="vx-force" key={title}><h3>{title}</h3><p>{description}</p></div>
        ))}
      </section>

      <section className="vx-team">
        <p className="vx-team-lead">Enter the agentic era with people who've actually built things</p>
        <h2 style={serif}>Thinkers. Builders. Human.</h2>
        <p className="vx-team-note">Some of the companies we've built for.</p>
        <div className="vx-logo-window">
          <div className="vx-logo-track">
            {[0, 1].map(repeat => <div className="vx-logo-group" key={repeat} aria-hidden={repeat === 1 || undefined}>{["/uploads/logos-1.png", "/uploads/logos-2.png", "/uploads/logos-3.png"].map(src => <LogoStrip key={src} src={src} />)}</div>)}
          </div>
        </div>
      </section>

      <EffectGallery />

      <section className="vx-services">
        <header className="vx-services-heading"><h2 style={serif}>Services.</h2><p>From scattered knowledge to productive intelligence.</p></header>
        <div className="vx-service-panels" role="group" aria-label="Services">
          {services.map(([title, description, image], index) => {
            const active = activeService === index;
            return <button className="vx-service-panel" type="button" aria-pressed={active} onClick={() => setActiveService(index)} key={title}>
              <img src={image} alt="" /><span className="vx-service-number">{String(index + 1).padStart(2, "0")}</span><span className="vx-service-title">{title}</span><span className="vx-service-description">{description}</span>
            </button>;
          })}
        </div>
      </section>

      <section className="vx-customer" style={{ backgroundImage: `url(${customerBackdrop})` }}>
        <div className="vx-customer-content">
          <h2 style={serif}>Example Customer Success</h2>
          <h3>Floor Coverings International NW San Antonio.</h3>
          <p>A national flooring franchise’s operations, unified into one system: scheduling, CRM, and vendor management running on autonomous agents built for the way the business actually works.</p>
          <div className="vx-pills">{modelStats.map(([value, label]) => <Pill key={label}>{value} {label}</Pill>)}</div>
        </div>
      </section>

      <section className="vx-contact">
        <h2 style={serif}>The first step is a conversation.</h2>
        <p className="vx-contact-copy" style={body}>VEXA's THINK engagement, four to six weeks, maps where your organization stands and the exact path forward.</p>
        <div className="vx-form">
          <div className="vx-form-grid">
            <TextField label="First name" value={form.firstName} onChange={field("firstName")} error={errors.firstName} required />
            <TextField label="Last name" value={form.lastName} onChange={field("lastName")} error={errors.lastName} required />
            <TextField label="Company" value={form.company} onChange={field("company")} error={errors.company} required />
            <TextField label="Work email" value={form.email} onChange={field("email")} error={errors.email} required />
          </div>
          <TextField label="Industry" value={form.industry} onChange={field("industry")} />
          <TextField label="What's your biggest challenge?" value={form.challenge} onChange={field("challenge")} multiline />
          <Button arrow onClick={submitThink} className="vx-gray-button" style={{ alignSelf: "center", background: "#4c4c4c", borderColor: "#4c4c4c" }}>Schedule a THINK conversation</Button>
        </div>
      </section>
    </main>
  );
}
