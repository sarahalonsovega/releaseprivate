import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LogoStrip } from "../components/core/LogoStrip.jsx";
import { submitContactForm } from "../utils/submitForm.js";
import { FormSuccess } from "../components/core/FormSuccess.jsx";

gsap.registerPlugin(ScrollTrigger);

const eras = [
  { title: "Human Era", subtitle: "before AI", items: ["Human decides", "Human executes", "Team coordinates", "Human reviews"] },
  { title: "AI-Assisted Era", subtitle: "human + AI", items: ["Human decides", "AI co-executes", "Human coordinates", "Human approves"] },
  { title: "Agentic Era", subtitle: "autonomous AI", items: ["Agent decides", "Agent executes", "Agents orchestrate", "Human governs"] },
];

const missionCards = [
  "Replace open-ended discovery with a fixed-price, evidence-based diagnostic",
  "Reuse what's already been built and never start from scratch ever again",
  "Shift your people from executing the work to specifying it, judging it, and approving what AI produces",
  "Carefully audit AI cost in operations to the penny, and run them in the best strategic manner",
];

const forces = [
  ["AI native & experienced", "Proven at global scale.\nOne mission."],
  ["AI Brain. Atelier", "Knowledge bricks, and\naccelerators."],
  ["Intergeneration Recombination", "Senior & Young experience\nunder one roof"],
];

const effects = [
  "Weeks,\nnot\nmonths",
  "Tested in real\noperations\nalong the way",
  "Knowledge\ntransfer\nbuilt in",
  "It compounds\ninstead of\nresetting",
  "No pilots.\nProduction\nready",
];

const services = [
  ["Think", "agile discovery & assessment", "/uploads/vexa-service-think.webp"],
  ["Build", "implementation of intelligent solutions", "/uploads/vexa-service-build.webp"],
  ["Operate & Support", "smart platforms", "/uploads/vexa-service-operate.webp"],
  ["Improve", "ongoing services & solutions", "/uploads/vexa-service-improve.webp"],
  ["Custom-built", "solve your specific challenges", "/uploads/vexa-service-custom.webp"],
  ["Advisory", "senior help on the calls that don't fit a service line", "/uploads/vexa-service-advisory.webp"],
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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function ServiceSequence() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const activeRef = useRef(0);

  const selectService = (index) => {
    activeRef.current = index;
    setActive(index);
  };

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    const context = gsap.context(() => {
      mm.add("(min-width: 801px) and (prefers-reduced-motion: no-preference)", () => {
        const trigger = ScrollTrigger.create({
          trigger: stageRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 8.2}`,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: ({ progress }) => {
            const next = Math.min(services.length - 1, Math.floor(progress * services.length));
            if (next !== activeRef.current) {
              selectService(next);
            }
          },
        });
        return () => trigger.kill();
      });
    }, sectionRef);

    return () => {
      mm.revert();
      context.revert();
    };
  }, []);

  const handleServiceKeyDown = (event, index) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let next = index;
    if (event.key === "ArrowLeft") next = (index + services.length - 1) % services.length;
    if (event.key === "ArrowRight") next = (index + 1) % services.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = services.length - 1;
    selectService(next);
    stageRef.current?.querySelectorAll(".vx-service-panel")[next]?.focus();
  };

  return (
    <section ref={sectionRef} className="vx-services-sequence">
      <div ref={stageRef} className="vx-services-stage">
        <h2 className="vx-serif">Services</h2>
        <div className="vx-service-panels" role="group" aria-label="VEXA services">
          {services.map(([title, copy, image], index) => (
            <button
              className="vx-service-panel"
              data-active={active === index}
              type="button"
              aria-expanded={active === index}
              onClick={() => selectService(index)}
              onKeyDown={(event) => handleServiceKeyDown(event, index)}
              key={title}
            >
              <img src={image} alt="" loading="lazy" decoding="async" />
              <span className="vx-service-shade" aria-hidden="true" />
              <h3 className="vx-service-title vx-serif">{title}</h3>
              <p className="vx-service-copy">{copy}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function CustomerSequence() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    const context = gsap.context(() => {
      mm.add("(min-width: 801px) and (prefers-reduced-motion: no-preference)", () => {
        const layers = gsap.utils.toArray(".vx-case-layer");
        gsap.set(layers, { autoAlpha: 0 });
        gsap.set(layers[0], { autoAlpha: 1 });

        gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: stageRef.current,
            start: "top top",
            end: () => `+=${window.innerHeight * 4.4}`,
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
          .to(layers[0], { autoAlpha: 0, duration: 0.45 }, 1)
          .to(layers[1], { autoAlpha: 1, duration: 0.8 })
          .to(layers[1], { autoAlpha: 0, duration: 0.45 }, "+=0.35")
          .to(layers[2], { autoAlpha: 1, duration: 0.8 })
          .to(layers[2], { autoAlpha: 1, duration: 0.7 });
      });
    }, sectionRef);

    return () => {
      mm.revert();
      context.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="vx-case-sequence">
      <div ref={stageRef} className="vx-case-stage">
        <h2 className="vx-serif">What customer success looks like</h2>
        <div className="vx-case-frame">
          <article className="vx-case-layer vx-case-floor">
            <h3 className="vx-serif">Floor Coverings International<br />San Antonio</h3>
            <p>A national flooring franchise’s operations, unified into one system:<br />scheduling, CRM, and vendor management running on autonomous agents<br />built for the way the business actually works.</p>
          </article>
          <article className="vx-case-layer vx-case-before">
            <h3 className="vx-serif">Before</h3>
            <ul>{before.map(item => <li key={item}>{item}</li>)}</ul>
          </article>
          <article className="vx-case-layer vx-case-after">
            <h3 className="vx-serif">2 months in</h3>
            <p className="vx-case-metrics"><strong>16 Databases</strong><strong>13 Autonomous Agents</strong><strong>3 Operational Hubs</strong><br /><strong>10+ External Integrations</strong><strong>12 QBO-Mapped Subtypes</strong></p>
            <ul>{after.map(item => <li key={item}>{item}</li>)}</ul>
          </article>
        </div>
      </div>
    </section>
  );
}

export function VexaPage() {
  const [form, setForm] = useState({ firstName: "", lastName: "", company: "", email: "", industry: "", challenge: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const field = key => event => setForm(current => ({ ...current, [key]: event.target.value }));

  const submitThink = async event => {
    event.preventDefault();
    const next = {};
    if (!form.firstName.trim()) next.firstName = true;
    if (!form.lastName.trim()) next.lastName = true;
    if (!form.company.trim()) next.company = true;
    if (!EMAIL_RE.test(form.email.trim())) next.email = true;
    setErrors(next);
    if (Object.keys(next).length) return;

    const subject = `THINK conversation request from ${form.company}`;
    setStatus("sending");
    try {
      await submitContactForm(subject, {
        Name: `${form.firstName} ${form.lastName}`,
        Company: form.company,
        "Work email": form.email,
        Industry: form.industry,
        "Biggest challenge": form.challenge,
      });
      setForm({ firstName: "", lastName: "", company: "", email: "", industry: "", challenge: "" });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="vx-page">
      <style>{`
        .vx-page { --vx-edge:clamp(20px,2.4vw,74px); --vx-radius:8px; background:#fff; color:#171820; overflow:hidden; text-align:center; font-family:var(--font-sans); }
        .vx-page *, .vx-page *::before, .vx-page *::after { box-sizing:border-box; }
        .vx-shell { width:calc(100% - (2 * var(--vx-edge))); max-width:2880px; margin-inline:auto; }
        .vx-serif { margin:0; font-family:var(--font-serif); font-weight:200; letter-spacing:-.04em; line-height:1.05; }
        .vx-body { margin:0; font-size:clamp(14px,1.06vw,32px); line-height:1.36; letter-spacing:.002em; }
        .vx-black-card { border-radius:var(--vx-radius); background:#000; color:#fff; }

        .vx-hero { height:clamp(510px,47vw,1420px); margin-top:var(--vx-edge); display:grid; place-items:center; border-radius:var(--vx-radius); background:#000; color:#fff; }
        .vx-hero-inner { transform:translateY(-2%); }
        .vx-hero-logo { display:block; width:clamp(114px,11.2vw,338px); margin:0 auto clamp(32px,2.7vw,82px); }
        .vx-hero h1 { width:min-content; margin-inline:auto; font-size:clamp(48px,5.15vw,156px); }

        .vx-intro { padding:clamp(115px,10.8vw,326px) 20px clamp(132px,9.2vw,278px); }
        .vx-intro-inner { max-width:1900px; margin:auto; display:grid; gap:clamp(28px,2.2vw,66px); }
        .vx-intro .vx-body { font-size:clamp(1rem,1.4vw,2.65rem); line-height:1.42; letter-spacing:-.018em; }

        .vx-evolution { padding-bottom:clamp(38px,3.6vw,110px); }
        .vx-heading { font-size:clamp(48px,5vw,151px); }
        .vx-heading-note { margin:clamp(14px,1.2vw,36px) auto clamp(45px,3.6vw,110px); max-width:1500px; }
        .vx-era-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:clamp(7px,.65vw,20px); }
        .vx-era { min-height:clamp(340px,28.5vw,860px); padding:clamp(38px,3.5vw,106px) 24px; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#fff; }
        .vx-era h3 { font-size:clamp(34px,3.15vw,95px); }
        .vx-era-subtitle { margin:clamp(10px,.8vw,24px) 0 clamp(40px,3.25vw,98px); font-size:clamp(14px,1.04vw,31px); }
        .vx-era-list { margin:0; padding:0; list-style:none; font-size:clamp(15px,1.12vw,34px); line-height:1.62; }

        .vx-mission { padding:0 0 clamp(120px,9vw,272px); }
        .vx-mission h2 { font-size:clamp(49px,5vw,151px); }
        .vx-mission-copy { max-width:1700px; margin:clamp(36px,2.9vw,88px) auto clamp(55px,4.3vw,130px); display:grid; gap:clamp(28px,2.1vw,64px); }
        .vx-mission-copy p { font-size:clamp(14px,1.08vw,33px); line-height:1.34; }
        .vx-mission-grid { display:grid; grid-template-columns:repeat(4,1fr); grid-template-rows:repeat(2,clamp(185px,15vw,454px)); gap:clamp(7px,.55vw,17px); }
        .vx-mission-card { padding:clamp(22px,2vw,60px); display:grid; place-items:center; font-size:clamp(14px,1.15vw,35px); line-height:1.35; }
        .vx-mission-card:nth-child(1) { grid-column:1; grid-row:1; }
        .vx-mission-card:nth-child(2) { grid-column:2; grid-row:1; }
        .vx-mission-card:nth-child(3) { grid-column:2; grid-row:2; }
        .vx-mission-card:nth-child(4) { grid-column:1; grid-row:2; }
        .vx-mission-image { grid-column:3 / 5; grid-row:1 / 3; border-radius:var(--vx-radius); overflow:hidden; }
        .vx-mission-image img { width:100%; height:100%; object-fit:cover; object-position:50% 18%; display:block; }

        .vx-different { margin-top:clamp(7px,.55vw,17px); height:clamp(370px,34.3vw,1037px); display:grid; place-items:center; position:relative; overflow:hidden; border-radius:var(--vx-radius); color:#fff; }
        .vx-different::after { content:""; position:absolute; inset:0; background:rgba(0,0,0,.6); }
        .vx-different img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:center; }
        .vx-different h2 { position:relative; z-index:1; font-size:clamp(51px,5.5vw,166px); line-height:1.08; transform:none; }
        .vx-forces { display:grid; grid-template-columns:repeat(3,1fr); gap:30px; padding:clamp(22px,1.7vw,52px) clamp(20px,3vw,90px) 0; }
        .vx-force h3 { font-size:clamp(29px,2.7vw,82px); }
        .vx-force p { margin:clamp(13px,1vw,30px) auto 0; font-size:clamp(12px,.9vw,27px); line-height:1.2; }

        .vx-team { padding:clamp(155px,14.5vw,438px) 0 clamp(170px,16vw,484px); }
        .vx-team-lead { margin:0; font-size:clamp(15px,1.1vw,33px); }
        .vx-team h2 { margin:clamp(22px,1.8vw,54px) 0 clamp(38px,3vw,91px); font-size:clamp(57px,6.3vw,190px); }
        .vx-team-note { margin:0 0 clamp(48px,4vw,121px); font-size:clamp(14px,1.1vw,33px); }
        .vx-logo-window { width:100vw; overflow:hidden; }
        .vx-logo-track { display:flex; width:max-content; animation:vx-logo-roll 34s linear infinite; will-change:transform; }
        .vx-logo-group { display:flex; align-items:center; gap:12px; padding-right:12px; }
        @keyframes vx-logo-roll { to { transform:translateX(-50%); } }

        .vx-effect { padding-bottom:clamp(100px,8.2vw,248px); }
        .vx-effect h2 { font-size:clamp(49px,4.7vw,142px); margin-bottom:clamp(55px,4.8vw,145px); }
        .vx-effect-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:clamp(6px,.55vw,17px); }
        .vx-effect-card { min-height:clamp(290px,26.1vw,790px); display:grid; place-items:center; border-radius:var(--vx-radius); background:#000; color:#fff; }
        .vx-effect-card p { margin:0; padding:20px; white-space:pre-line; font:200 clamp(27px,2.55vw,77px)/.91 var(--font-serif); letter-spacing:-.035em; }

        .vx-services-sequence { position:relative; background:#fff; }
        .vx-services-stage { min-height:100dvh; padding:clamp(34px,4.5vh,52px) var(--vx-edge) clamp(24px,3vh,36px); display:flex; flex-direction:column; justify-content:center; background:#fff; }
        .vx-services-stage > h2 { flex:0 0 auto; margin:0 0 clamp(32px,4.8vh,58px); font-size:clamp(52px,5.2vw,157px); }
        .vx-service-panels { flex:0 1 min(67vh,1420px); width:100%; min-height:430px; display:flex; gap:clamp(6px,.55vw,17px); }
        .vx-service-panel { position:relative; min-width:0; flex:1 1 0; overflow:hidden; border:0; border-radius:var(--vx-radius); padding:0; background:#000; color:#fff; cursor:pointer; font:inherit; text-align:center; transition:flex-grow .72s cubic-bezier(.16,1,.3,1); }
        .vx-service-panel[data-active="true"] { flex-grow:5.7; }
        .vx-service-panel:focus-visible { outline:2px solid #fff; outline-offset:-6px; }
        .vx-service-panel img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; display:block; }
        .vx-service-panel:nth-child(1) img { object-position:52% 52%; }
        .vx-service-panel:nth-child(2) img { object-position:48% 50%; }
        .vx-service-panel:nth-child(3) img { object-position:48% 50%; }
        .vx-service-panel:nth-child(4) img { object-position:50% 50%; }
        .vx-service-panel:nth-child(5) img { object-position:54% 50%; }
        .vx-service-panel:nth-child(6) img { object-position:49% 50%; }
        .vx-service-shade { position:absolute; inset:0; background:rgba(0,0,0,.7); }
        .vx-service-title { position:absolute; z-index:1; left:50%; top:50%; margin:0; white-space:nowrap; font-size:clamp(28px,2.9vw,88px); transform:translate(-50%,-50%) rotate(90deg); transition:transform .72s cubic-bezier(.16,1,.3,1); }
        .vx-service-panel[data-active="true"] .vx-service-title { transform:translate(-50%,-90%) rotate(0); }
        .vx-service-copy { position:absolute; z-index:1; left:24px; right:24px; top:57%; margin:0; opacity:0; visibility:hidden; font-size:clamp(14px,1.15vw,35px); line-height:1.3; transition:opacity .3s ease; }
        .vx-service-panel[data-active="true"] .vx-service-copy { opacity:1; visibility:visible; transition-delay:.34s; }

        .vx-case-sequence { position:relative; background:#fff; }
        .vx-case-stage { min-height:100dvh; padding:clamp(72px,9vh,110px) var(--vx-edge) clamp(26px,3.5vh,42px); display:flex; flex-direction:column; justify-content:center; background:#fff; }
        .vx-case-stage > h2 { margin-bottom:clamp(28px,3.5vh,44px); font-size:clamp(43px,4.25vw,128px); }
        .vx-case-frame { flex:0 1 min(65vh,1320px); min-height:440px; position:relative; border-radius:var(--vx-radius); overflow:hidden; background:linear-gradient(rgba(0,0,0,.64),rgba(0,0,0,.64)),url('/uploads/vexa-customer-floor.webp') center 56%/cover no-repeat; }
        .vx-case-layer { position:absolute; inset:0; border-radius:0; background:transparent; color:#fff; }
        .vx-case-layer { z-index:1; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:clamp(26px,3vw,91px); will-change:opacity; }
        .vx-case-layer h3 { font-size:clamp(43px,4.2vw,127px); }
        .vx-case-layer p,.vx-case-layer ul { margin:clamp(28px,2.6vw,79px) 0 0; padding:0; list-style:none; font-size:clamp(13px,1.05vw,32px); line-height:1.38; }
        .vx-case-floor h3 { font-size:clamp(42px,4vw,121px); }
        .vx-case-metrics { margin-top:clamp(21px,1.8vw,54px) !important; line-height:1.8 !important; }
        .vx-case-metrics strong { display:inline-block; margin:0 clamp(8px,.75vw,23px); letter-spacing:.08em; }
        .vx-case-after ul { margin-top:clamp(18px,1.6vw,48px); }

        .vx-contact { padding:clamp(115px,9vw,272px) 20px clamp(170px,15vw,454px); }
        .vx-contact-tag { display:inline-block; margin-bottom:clamp(30px,2.6vw,79px); padding:clamp(13px,1.1vw,33px) clamp(25px,2.1vw,64px); border-radius:6px; background:#4e2019; color:#fff; font-size:clamp(12px,.8vw,24px); }
        .vx-contact h2 { font-size:clamp(45px,5.1vw,154px); }
        .vx-contact-copy { margin:clamp(22px,1.9vw,57px) auto clamp(48px,4.5vw,136px); max-width:1500px; color:#92929a; }
        .vx-form { width:min(1800px,90%); margin:auto; }
        .vx-form-success { width:min(1800px,90%); margin:auto; }
        .vx-form-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:clamp(24px,4vw,121px); }
        .vx-form-row-two { display:grid; grid-template-columns:.75fr 1.5fr; gap:clamp(40px,6vw,181px); width:58%; margin:clamp(28px,2.3vw,70px) auto 0; }
        .vx-field input { width:100%; border:0; border-bottom:1px solid #aaa; border-radius:0; padding:11px 4px 16px; background:transparent; color:#171820; outline:none; text-align:center; font:clamp(13px,.9vw,27px) var(--font-sans); }
        .vx-field input::placeholder { color:#92929a; opacity:1; }
        .vx-field[data-error="true"] input { border-color:#d70070; }
        .vx-submit { margin-top:clamp(43px,3.8vw,115px); border:0; border-radius:6px; padding:clamp(13px,1vw,30px) clamp(27px,2vw,60px); background:#df0072; color:#fff; cursor:pointer; font:clamp(14px,.9vw,27px) var(--font-sans); transition:transform .16s ease,background .16s ease; }
        .vx-submit:hover { background:#bd0061; }
        .vx-submit:active { transform:scale(.97); }
        .vx-form-status { min-height:1.5em; margin:16px 0 0; color:#777780; font-size:clamp(12px,.82vw,24px); }

        @media (max-width:800px) {
          .vx-hero { height:560px; }
          .vx-intro { padding:100px 24px 125px; }
          .vx-desktop-break { display:none; }
          .vx-era-grid { grid-template-columns:1fr; }
          .vx-era { min-height:300px; }
          .vx-mission { padding:0 0 110px; }
          .vx-mission-grid { grid-template-columns:1fr; grid-template-rows:none; }
          .vx-mission-card,.vx-mission-card:nth-child(n),.vx-mission-image { grid-column:auto; grid-row:auto; min-height:210px; }
          .vx-mission-image { height:440px; }
          .vx-different { height:500px; }
          .vx-different h2 { transform:none; }
          .vx-forces { grid-template-columns:1fr; gap:48px; padding-top:46px; }
          .vx-team { padding:130px 0 145px; }
          .vx-logo-track { animation-duration:25s; }
          .vx-effect-grid { grid-template-columns:1fr; }
          .vx-effect-card { min-height:235px; }
          .vx-services-stage { min-height:auto; padding-top:100px; padding-bottom:120px; }
          .vx-service-panels { min-height:0; height:auto; flex-direction:column; }
          .vx-service-panel { min-height:300px; flex:none !important; }
          .vx-service-title { top:42%; transform:translate(-50%,-50%) !important; }
          .vx-service-copy { top:58%; opacity:1 !important; visibility:visible !important; }
          .vx-case-stage { min-height:auto; padding-top:90px; padding-bottom:100px; }
          .vx-case-frame { min-height:0; padding:0; display:grid; gap:12px; background:none; }
          .vx-case-layer { position:relative; inset:auto; min-height:380px; border-radius:var(--vx-radius); background:linear-gradient(rgba(0,0,0,.64),rgba(0,0,0,.64)),url('/uploads/vexa-customer-floor.webp') center 56%/cover no-repeat; opacity:1 !important; visibility:visible !important; }
          .vx-case-floor { margin:0; min-height:430px; }
          .vx-case-layer p br { display:none; }
          .vx-case-metrics strong { display:block; }
          .vx-form-grid { grid-template-columns:1fr 1fr; }
          .vx-form-row-two { width:100%; grid-template-columns:1fr; gap:24px; }
        }
        @media (max-width:520px) {
          .vx-hero h1 { font-size:46px; }
          .vx-heading,.vx-mission h2,.vx-effect h2,.vx-services-stage > h2,.vx-case-stage > h2 { font-size:44px; }
          .vx-different h2 { font-size:45px; }
          .vx-team h2 { font-size:56px; }
          .vx-form-grid { grid-template-columns:1fr; }
          .vx-case-layer { min-height:420px; padding:28px 20px; }
          .vx-case-layer h3,.vx-case-floor h3 { font-size:43px; }
        }
        @media (prefers-reduced-motion:reduce) {
          .vx-logo-track { width:100%; flex-wrap:wrap; justify-content:center; animation:none; transform:none !important; }
          .vx-logo-group:nth-child(2) { display:none; }
          .vx-services-stage,.vx-case-stage { min-height:auto; }
          .vx-service-panels { height:auto; min-height:0; display:grid; grid-template-columns:repeat(2,1fr); }
          .vx-service-panel { min-height:360px; flex:none !important; }
          .vx-service-title { top:42%; transform:translate(-50%,-50%) !important; }
          .vx-service-copy { top:58%; opacity:1 !important; visibility:visible !important; }
          .vx-case-frame { min-height:0; padding:0; display:grid; gap:12px; background:none; }
          .vx-case-layer { position:relative; inset:auto; min-height:420px; border-radius:var(--vx-radius); background:linear-gradient(rgba(0,0,0,.64),rgba(0,0,0,.64)),url('/uploads/vexa-customer-floor.webp') center 56%/cover no-repeat; opacity:1 !important; visibility:visible !important; }
          .vx-case-floor { margin:0; }
        }
      `}</style>

      <section className="vx-shell vx-hero">
        <div className="vx-hero-inner">
          <img className="vx-hero-logo" src="/assets/vexa-white.png" alt="VEXA" />
          <h1 className="vx-serif">Tailored intelligence you own</h1>
        </div>
      </section>

      <section className="vx-intro">
        <div className="vx-intro-inner">
          <p className="vx-body">VEXA is the AI-Brain consultancy for business transformation division of CUELUM.</p>
          <p className="vx-body">We turn companies into AI-native enterprises, rebuilding how every function runs for<br className="vx-desktop-break" /> the Agentic era.</p>
          <p className="vx-body">We build your company its own AI brain, tailor solutions for your biggest<br className="vx-desktop-break" /> challenges and then we hand it over.</p>
        </div>
      </section>

      <section className="vx-shell vx-mission">
          <h2 className="vx-serif">Our Mission</h2>
          <div className="vx-mission-copy">
            <p className="vx-body">Most of what your company needs to solve has already been solved<br className="vx-desktop-break" /> somewhere inside it. The knowledge just lives in people's heads and<br className="vx-desktop-break" /> scattered spreadsheets instead of a system anyone can reuse.</p>
            <p className="vx-body">We turn your company's knowledge into intelligence you can reuse,<br className="vx-desktop-break" /> scale, and own.</p>
          </div>
          <div className="vx-mission-grid">
            {missionCards.map(copy => <article className="vx-black-card vx-mission-card" key={copy}>{copy}</article>)}
            <div className="vx-mission-image"><img src="/uploads/vexa-mission-shuttle.webp" alt="Space shuttle prepared for launch" loading="lazy" decoding="async" /></div>
          </div>
      </section>

      <section className="vx-shell vx-evolution">
        <h2 className="vx-serif vx-heading">The evolution of work</h2>
        <p className="vx-body vx-heading-note">The strongest players don’t move from one era to the next. They learn to<br className="vx-desktop-break" /> leverage all three simultaneously.</p>
        <div className="vx-era-grid">
          {eras.map(era => (
            <article className="vx-black-card vx-era" key={era.title}>
              <h3 className="vx-serif">{era.title}</h3>
              <span className="vx-era-subtitle">{era.subtitle}</span>
              <ul className="vx-era-list">{era.items.map(item => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>

        <div className="vx-different">
          <img src="/uploads/vexa-different-tools.webp" alt="Mechanical components in deep shadow" loading="lazy" decoding="async" />
          <h2 className="vx-serif">Different Eras.<br />Different Tools.<br />Same Mindset.</h2>
        </div>
        <div className="vx-forces">
          {forces.map(([title, copy]) => <article className="vx-force" key={title}><h3 className="vx-serif">{title}</h3><p>{copy.split("\n").map((line,index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</p></article>)}
        </div>
      </section>

      <section className="vx-team">
        <p className="vx-team-lead">Enter the agentic era with people who've actually built things</p>
        <h2 className="vx-serif">Thinkers. Builders. Human.</h2>
        <p className="vx-team-note">30+ years building for:</p>
        <div className="vx-logo-window" aria-label="Companies our team has worked with">
          <div className="vx-logo-track">
            {[0, 1].map(repeat => <div className="vx-logo-group" aria-hidden={repeat === 1 || undefined} key={repeat}>{["/uploads/logos-1.png", "/uploads/logos-2.png", "/uploads/logos-3.png"].map(src => <LogoStrip src={src} height={78} key={src} />)}</div>)}
          </div>
        </div>
      </section>

      <section className="vx-shell vx-effect">
        <h2 className="vx-serif">Our effect</h2>
        <div className="vx-effect-grid">{effects.map(effect => <article className="vx-effect-card" key={effect}><p>{effect}</p></article>)}</div>
      </section>

      <ServiceSequence />
      <CustomerSequence />

      <section className="vx-contact">
        <span className="vx-contact-tag">Book a call with us!</span>
        <h2 className="vx-serif">Tell us what your challenge is!</h2>
        <p className="vx-body vx-contact-copy">VEXA's THINK engagement (four to six weeks), maps where<br className="vx-desktop-break" /> your organization stands and the exact path forward.</p>
        {status === "sent" ? <FormSuccess className="vx-form-success" /> : <form className="vx-form" onSubmit={submitThink} noValidate>
          <div className="vx-form-grid">
            {[["firstName", "First Name"], ["lastName", "Last Name"], ["company", "Company"], ["email", "Work Email"]].map(([key, label]) => <label className="vx-field" data-error={errors[key] || undefined} key={key}><input value={form[key]} onChange={field(key)} placeholder={label} aria-label={label} aria-invalid={errors[key] || undefined} /></label>)}
          </div>
          <div className="vx-form-row-two">
            <label className="vx-field"><input value={form.industry} onChange={field("industry")} placeholder="Industry" aria-label="Industry" /></label>
            <label className="vx-field"><input value={form.challenge} onChange={field("challenge")} placeholder="What's your biggest challenge?" aria-label="What's your biggest challenge?" /></label>
          </div>
          <button className="vx-submit" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Schedule"}</button>
          <p className="vx-form-status" role="status">{status === "error" ? "Please try again or email hello@cuelum.com." : ""}</p>
        </form>}
      </section>
    </main>
  );
}
