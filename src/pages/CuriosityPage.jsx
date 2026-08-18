import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { submitContactForm } from "../utils/submitForm.js";

gsap.registerPlugin(ScrollTrigger);

const whyItems = [
  {
    title: "It compounds instead of resetting",
    body: "When one track disappears, a single-track career starts from zero. A portfolio doesn't, because each field brings methods the others can use.",
    image: "/uploads/curiosity-why-dna.png",
  },
  {
    title: "It's the part AI doesn't take",
    body: "The value moves to framing the problem, choosing what to borrow, and judging what's worth building: the work between fields, not inside one.",
    image: "/uploads/curiosity-why-code.png",
  },
  {
    title: "It's the safer bet",
    body: "Most real advances are imports, a method from one field solving a problem in another. You can't see that from inside a single field. Three fields that talk to each other is a hedge, not a scatter.",
    image: "/uploads/curiosity-why-chips.png",
  },
];

const methodology = [
  {
    title: "Go deep in more than one place.",
    body: "Not dabbling. Deep enough in each field to produce real work you can point to.",
  },
  {
    title: "Design the intersections.",
    body: "Scattered and cross-domain look the same from outside. Structure is the difference.",
  },
  {
    title: "Make the connection the output.",
    body: "What you ship is the link itself, the pattern you can only see standing in two fields at once.",
  },
];

function WhyArchitectureWorks() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const activeRef = useRef(0);

  const selectPanel = (index) => {
    activeRef.current = index;
    setActive(index);
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const media = gsap.matchMedia();
    media.add(
      {
        canPin: "(min-width: 761px) and (prefers-reduced-motion: no-preference)",
      },
      ({ conditions }) => {
        if (!conditions.canPin) return undefined;

        const trigger = ScrollTrigger.create({
          id: "curiosity-why-pin",
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * 4.15}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: ({ progress }) => {
            const next = Math.min(2, Math.floor(progress * 3));
            if (next !== activeRef.current) selectPanel(next);
          },
        });

        return () => trigger.kill();
      },
    );

    return () => media.revert();
  }, []);

  const handleKeyDown = (event, index) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let next = index;
    if (event.key === "ArrowLeft") next = (index + whyItems.length - 1) % whyItems.length;
    if (event.key === "ArrowRight") next = (index + 1) % whyItems.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = whyItems.length - 1;
    selectPanel(next);
    sectionRef.current?.querySelectorAll(".ca2-why-panel")[next]?.focus();
  };

  return (
    <section className="ca2-why" ref={sectionRef} aria-labelledby="ca2-why-title">
      <div className="ca2-why-inner">
        <h2 id="ca2-why-title">Why Curiosity Architecture<br />works long term</h2>
        <div className="ca2-why-panels" role="group" aria-label="Why Curiosity Architecture works long term">
        {whyItems.map((item, index) => {
          const isActive = active === index;
          return (
            <button
              className="ca2-why-panel"
              data-active={isActive}
              key={item.title}
              type="button"
              aria-expanded={isActive}
              onClick={() => selectPanel(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              style={{ backgroundImage: `linear-gradient(rgba(0,0,0,${isActive ? ".64" : ".72"}), rgba(0,0,0,${isActive ? ".64" : ".72"})), url("${item.image}")` }}
            >
              <span className="ca2-why-panel-inner">
                <span className="ca2-why-panel-title">{item.title}</span>
                <span className="ca2-why-panel-body">{item.body}</span>
              </span>
            </button>
          );
        })}
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [status, setStatus] = useState("idle");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setStatus("sending");
    try {
      await submitContactForm("Curiosity Architecture enquiry", {
        "First name": data.get("firstName"),
        "Last name": data.get("lastName"),
        Email: data.get("email"),
        Message: data.get("message"),
      });
      event.currentTarget.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form className="ca2-form" onSubmit={handleSubmit}>
      <label>
        <span>First Name</span>
        <input name="firstName" autoComplete="given-name" required />
      </label>
      <label>
        <span>Last Name</span>
        <input name="lastName" autoComplete="family-name" required />
      </label>
      <label>
        <span>Email</span>
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label className="ca2-form-message">
        <span>Your Message</span>
        <input name="message" required />
      </label>
      <button type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Join!"}</button>
      <span className="ca2-form-status" role="status">{status === "sent" ? "Thank you — your message has been sent." : status === "error" ? "Please try again or email hello@cuelum.com." : ""}</span>
    </form>
  );
}

export function CuriosityPage() {
  return (
    <main className="ca2-page">
      <style>{`
        .ca2-page {
          --ca2-black: #030303;
          --ca2-ink: #22232a;
          --ca2-pink: #dd0088;
          overflow: hidden;
          background: #fff;
          color: var(--ca2-ink);
          text-align: center;
        }
        .ca2-page *, .ca2-page *::before, .ca2-page *::after { box-sizing: border-box; }
        .ca2-page h1, .ca2-page h2, .ca2-page h3, .ca2-page p { margin: 0; }
        .ca2-page h1, .ca2-page h2, .ca2-page h3 {
          font-family: var(--font-serif);
          font-weight: var(--weight-light);
          letter-spacing: -.04em;
          text-wrap: balance;
        }
        .ca2-page p {
          font-family: var(--font-sans);
          font-size: clamp(1rem, 1.28vw, 2.4rem);
          line-height: 1.23;
          letter-spacing: -.018em;
          text-wrap: pretty;
        }
        .ca2-hero {
          position: relative;
          width: auto;
          aspect-ratio: 2.025 / 1;
          margin: clamp(18px, 2.45vw, 74px);
          margin-bottom: 0;
          border-radius: clamp(8px, .55vw, 17px);
          background: #000;
        }
        .ca2-hero-copy {
          position: absolute;
          z-index: 2;
          top: 49%;
          left: 50%;
          width: 70%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #fff;
        }
        .ca2-wordmark {
          margin-bottom: clamp(44px, 4vw, 121px);
          font-family: var(--font-title);
          font-size: clamp(1.35rem, 2.1vw, 4rem);
          font-weight: 700;
          line-height: 1.12;
          letter-spacing: .035em;
          text-transform: uppercase;
        }
        .ca2-hero h1 {
          color: #fff;
          font-size: clamp(3rem, 4.8vw, 9.1rem);
          line-height: 1.05;
        }
        .ca2-intro {
          display: flex;
          justify-content: center;
          padding: clamp(125px, 8.4vw, 254px) 24px clamp(108px, 7.7vw, 233px);
        }
        .ca2-intro-inner, .ca2-recognition-inner {
          width: min(100%, 70ch);
        }
        .ca2-intro p + p { margin-top: clamp(28px, 2.3vw, 70px); }
        .ca2-conveyor {
          width: auto;
          height: clamp(230px, 19vw, 575px);
          margin: 0 clamp(18px, 2.45vw, 74px);
          overflow: hidden;
          border-radius: clamp(8px, .55vw, 17px);
          background: #dceff6;
        }
        .ca2-conveyor img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          object-position: center 88%;
        }
        .ca2-recognition {
          display: flex;
          justify-content: center;
          padding: clamp(110px, 8.3vw, 250px) 24px clamp(165px, 12.5vw, 378px);
        }
        .ca2-recognition p + p { margin-top: clamp(30px, 2.35vw, 71px); }
        .ca2-recognition strong {
          font-weight: 700;
          color: var(--ca2-ink);
        }
        .ca2-why {
          min-height: 100svh;
          display: flex;
          align-items: center;
          padding: clamp(50px, 5vw, 150px) clamp(18px, 2.45vw, 74px);
          background: #fff;
        }
        .ca2-why-inner { width: 100%; }
        .ca2-why h2 {
          margin-bottom: clamp(80px, 6.7vw, 203px);
          font-size: clamp(3rem, 4.75vw, 9rem);
          line-height: 1.06;
        }
        .ca2-why-panels {
          display: flex;
          width: 100%;
          height: clamp(320px, min(26.8vw, 50vh), 810px);
          gap: clamp(8px, .55vw, 17px);
        }
        .ca2-why-panel {
          position: relative;
          flex: 1 1 0;
          min-width: 0;
          padding: 0;
          overflow: hidden;
          border: 0;
          border-radius: clamp(8px, .55vw, 17px);
          background: var(--ca2-black);
          background-position: center;
          background-size: cover;
          color: #fff;
          cursor: pointer;
          transition: flex-grow .5s var(--ease-standard);
        }
        .ca2-why-panel[data-active="true"] { flex-grow: 6.35; }
        .ca2-why-panel-inner {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: clamp(24px, 3vw, 90px);
        }
        .ca2-why-panel-title {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 3.15vw, 6rem);
          font-weight: var(--weight-light);
          line-height: .98;
          letter-spacing: -.035em;
          white-space: nowrap;
        }
        .ca2-why-panel-body {
          display: none;
          max-width: 53ch;
          margin-top: clamp(26px, 2.2vw, 67px);
          color: #d5d5d5;
          font-family: var(--font-sans);
          font-size: clamp(.95rem, 1.18vw, 2.2rem);
          line-height: 1.35;
        }
        .ca2-why-panel[data-active="true"] .ca2-why-panel-body { display: block; }
        .ca2-why-panel:not([data-active="true"]) .ca2-why-panel-inner { padding: 16px; }
        .ca2-why-panel:not([data-active="true"]) .ca2-why-panel-title {
          font-size: clamp(1.2rem, 1.8vw, 3.4rem);
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
        .ca2-method {
          padding: clamp(130px, 9vw, 272px) clamp(18px, 2.45vw, 74px) 0;
        }
        .ca2-method h2, .ca2-founder > h2 {
          font-size: clamp(3rem, 4.75vw, 9rem);
          line-height: 1.06;
        }
        .ca2-method-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(15px, 1.15vw, 35px);
          margin-top: clamp(88px, 6.9vw, 209px);
        }
        .ca2-method-card {
          min-height: clamp(260px, 24.8vw, 750px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: clamp(30px, 4vw, 120px);
          border-radius: clamp(8px, .55vw, 17px);
          background: var(--ca2-black);
          color: #fff;
        }
        .ca2-method-card h3 {
          max-width: 13ch;
          font-size: clamp(2rem, 3.05vw, 5.75rem);
          line-height: 1.06;
        }
        .ca2-method-card p {
          max-width: 28ch;
          margin-top: clamp(34px, 3.3vw, 100px);
          color: #b7b7b7;
          font-size: clamp(.95rem, 1.16vw, 2.2rem);
          line-height: 1.42;
        }
        .ca2-founder {
          padding: clamp(170px, 10.2vw, 308px) clamp(18px, 2.45vw, 74px) 0;
        }
        .ca2-founder-layout {
          display: grid;
          grid-template-columns: .745fr 1fr;
          gap: clamp(16px, 1.05vw, 32px);
          margin-top: clamp(88px, 6.9vw, 209px);
        }
        .ca2-founder-image, .ca2-founder-copy {
          height: clamp(650px, 59.5vw, 1800px);
          overflow: hidden;
          border-radius: clamp(8px, .55vw, 17px);
        }
        .ca2-founder-image img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          object-position: 47% center;
          transform: none;
        }
        .ca2-founder-copy {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          justify-content: center;
          padding: clamp(40px, 5.4vw, 164px) clamp(40px, 6vw, 181px);
          background: var(--ca2-black);
          color: #fff;
          text-align: left;
        }
        .ca2-founder-copy h3 {
          margin-bottom: clamp(54px, 4vw, 121px);
          font-size: clamp(3rem, 4.75vw, 9rem);
          line-height: 1.06;
          text-align: center;
        }
        .ca2-founder-copy p {
          color: #e0e0e0;
          font-size: clamp(.9rem, 1.08vw, 2.05rem);
          line-height: 1.32;
          letter-spacing: .035em;
        }
        .ca2-founder-copy p + p { margin-top: clamp(25px, 2.1vw, 64px); }
        .ca2-founder-copy p:last-child { text-align: center; }
        .ca2-contact {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: clamp(150px, 8.5vw, 257px) 24px clamp(190px, 8.6vw, 260px);
        }
        .ca2-contact-tag {
          display: inline-flex;
          min-height: clamp(48px, 4.25vw, 128px);
          align-items: center;
          justify-content: center;
          padding: 0 clamp(24px, 2.2vw, 67px);
          border-radius: clamp(7px, .5vw, 15px);
          background: var(--ca2-black);
          color: #aaa;
          font-family: var(--font-sans);
          font-size: clamp(.88rem, 1vw, 1.9rem);
        }
        .ca2-contact h2 {
          margin: clamp(38px, 3.25vw, 98px) 0 clamp(32px, 2.5vw, 76px);
          color: #111;
          font-size: clamp(3rem, 4.75vw, 9rem);
          line-height: 1.06;
        }
        .ca2-contact > p {
          max-width: 61ch;
          color: #5f6068;
          font-size: clamp(1rem, 1.16vw, 2.2rem);
          line-height: 1.3;
        }
        .ca2-form {
          width: min(100%, 73vw);
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 2fr;
          gap: clamp(20px, 1.75vw, 53px);
          margin-top: clamp(70px, 5.3vw, 160px);
        }
        .ca2-form label {
          display: flex;
          flex-direction: column;
          color: #96969d;
          font-family: var(--font-sans);
          font-size: clamp(.9rem, 1.05vw, 2rem);
          line-height: 1;
          text-align: center;
        }
        .ca2-form input {
          width: 100%;
          height: clamp(32px, 2.7vw, 82px);
          border: 0;
          border-bottom: 1px solid #aaa;
          border-radius: 0;
          outline: 0;
          background: transparent;
          color: #171717;
          font-family: var(--font-sans);
          font-size: clamp(1rem, 1.05vw, 2rem);
        }
        .ca2-form input:focus { border-bottom-color: var(--ca2-pink); }
        .ca2-form button {
          grid-column: 1 / -1;
          justify-self: center;
          min-height: clamp(50px, 4.2vw, 127px);
          margin-top: clamp(36px, 2.8vw, 85px);
          padding: 0 clamp(28px, 2.4vw, 73px);
          border: 0;
          border-radius: clamp(7px, .5vw, 15px);
          background: var(--ca2-pink);
          color: #fff;
          font-family: var(--font-sans);
          font-size: clamp(1rem, 1.1vw, 2.1rem);
          cursor: pointer;
        }
        .ca2-form button:hover { background: #bb0073; }
        .ca2-form button:active { transform: translateY(1px); }
        .ca2-form-status { grid-column:1 / -1; min-height:1.5em; color:#6d6d74; font:clamp(.8rem,.9vw,1.7rem)/1.4 var(--font-sans); }
        @media (max-width: 760px) {
          .ca2-hero {
            min-height: 720px;
            aspect-ratio: auto;
            overflow: hidden;
          }
          .ca2-hero-copy { top: 50%; left: 50%; width: 88%; }
          .ca2-wordmark { margin-bottom: 28px; font-size: 1.35rem; }
          .ca2-hero h1 { font-size: clamp(3.2rem, 13vw, 5rem); }
          .ca2-intro { padding-top: 140px; padding-bottom: 120px; }
          .ca2-intro-inner, .ca2-recognition-inner { width: min(100%, 35ch); }
          .ca2-page p { font-size: 1rem; line-height: 1.42; }
          .ca2-conveyor { height: 300px; }
          .ca2-conveyor img { object-position: center 88%; }
          .ca2-recognition { padding-top: 120px; padding-bottom: 150px; }
          .ca2-why { min-height: auto; padding-top: 150px; padding-bottom: 150px; }
          .ca2-why h2, .ca2-method h2, .ca2-founder > h2, .ca2-contact h2 { font-size: clamp(3rem, 12vw, 4.5rem); }
          .ca2-why-panels { display: grid; height: auto; }
          .ca2-why-panel, .ca2-why-panel[data-active="true"] { min-height: 260px; }
          .ca2-why-panel:not([data-active="true"]) .ca2-why-panel-title {
            font-size: 2rem;
            writing-mode: horizontal-tb;
            white-space: normal;
          }
          .ca2-why-panel-title { font-size: 2.4rem; white-space: normal; }
          .ca2-why-panel-body, .ca2-why-panel[data-active="true"] .ca2-why-panel-body {
            display: block;
            font-size: .95rem;
          }
          .ca2-method { padding-top: 180px; }
          .ca2-method-grid { grid-template-columns: 1fr; margin-top: 65px; }
          .ca2-method-card { min-height: 330px; }
          .ca2-method-card h3 { font-size: 2.65rem; }
          .ca2-method-card p { font-size: 1rem; }
          .ca2-founder { padding-top: 150px; }
          .ca2-founder-layout { grid-template-columns: 1fr; margin-top: 65px; }
          .ca2-founder-image { height: 620px; }
          .ca2-founder-copy { height: auto; min-height: 720px; padding: 54px 28px; }
          .ca2-founder-copy h3 { font-size: 3.6rem; }
          .ca2-founder-copy p { font-size: .95rem; line-height: 1.45; }
          .ca2-contact { padding-top: 150px; padding-bottom: 160px; }
          .ca2-contact > p { max-width: 35ch; }
          .ca2-form { width: min(100%, 520px); grid-template-columns: 1fr 1fr; }
          .ca2-form-message { grid-column: 1 / -1; }
        }
        @media (max-width: 480px) {
          .ca2-form { grid-template-columns: 1fr; }
          .ca2-form-message { grid-column: auto; }
          .ca2-founder-image { height: 500px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ca2-why { min-height: auto; }
          .ca2-why-panels { display: grid; grid-template-columns: repeat(3, 1fr); height: auto; }
          .ca2-why-panel, .ca2-why-panel[data-active="true"] { min-height: clamp(300px, 26vw, 560px); }
          .ca2-why-panel { transition: none; }
          .ca2-why-panel:not([data-active="true"]) .ca2-why-panel-title {
            font-size: clamp(1.7rem, 2.5vw, 3rem);
            writing-mode: horizontal-tb;
            white-space: normal;
          }
          .ca2-why-panel-body, .ca2-why-panel[data-active="true"] .ca2-why-panel-body {
            display: block;
            font-size: clamp(.9rem, 1vw, 1.1rem);
          }
        }
        @media (max-width: 760px) and (prefers-reduced-motion: reduce) {
          .ca2-why-panels { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="ca2-hero" aria-labelledby="ca2-hero-title">
        <div className="ca2-hero-copy">
          <div className="ca2-wordmark">Curiosity<br />Architecture</div>
          <h1 id="ca2-hero-title">Learn<br />everything to<br />create anything</h1>
        </div>
      </section>

      <section className="ca2-intro" aria-label="Curiosity Architecture introduction">
        <div className="ca2-intro-inner">
          <p>For decades, the advice was linear:<br />Pick your domain, go deeper than everyone else, compound expertise. It worked when problems stayed still and depth was scarce.</p>
          <p>But now depth is commodified. A language model can outspecialize most humans in most narrow tasks. What it can't do is recognize that restaurant operations and brand strategy are solving the same problem, or that fashion teaches something about how AI learns, or that a failed startup became a policy insight.</p>
        </div>
      </section>

      <figure className="ca2-conveyor">
        <img src="/uploads/curiosity-keyboard.png" alt="Hands working at a keyboard beside technical plans" />
      </figure>

      <section className="ca2-recognition" aria-label="The Curiosity Architecture principle">
        <div className="ca2-recognition-inner">
          <p>That recognition; the ability to see which fields belong in the same conversation, is what stays human.</p>
          <p>We call this Curiosity Architecture. It's not a personality type or a career hack. It's a structure: the practice of seeing what carries across domains, knowing when to bring them together, and building something that wouldn't exist if any one of them stayed alone.</p>
          <p><strong>The value isn't in knowing everything.<br />It's in knowing what matters to bring together.</strong></p>
        </div>
      </section>

      <WhyArchitectureWorks />

      <section className="ca2-method" aria-labelledby="ca2-method-title">
        <h2 id="ca2-method-title">Methodology</h2>
        <div className="ca2-method-grid">
          {methodology.map((item) => (
            <article className="ca2-method-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ca2-founder" aria-labelledby="ca2-founder-title">
        <h2 id="ca2-founder-title">How this started</h2>
        <div className="ca2-founder-layout">
          <div className="ca2-founder-image">
            <img src="/uploads/sarah-portrait-reference.png" alt="Sarah Alonso Vega speaking at the AI for Good Global Summit" />
          </div>
          <article className="ca2-founder-copy">
            <h3>Sarah Alonso Vega</h3>
            <p>TEDx at eleven, Technovation semi-finals at fourteen, Digital Enterprise Show at seventeen. UNESCO policy. Huawei research lead. LVMH. LAMDA. IED. Restaurant floors and kitchens. Six languages and counting.</p>
            <p>Each field taught her something. Then the pattern became clear. The best ideas don't come from staying deep in one domain; they come from the intersection.</p>
            <p>What restaurant operations teach brand strategy. What fashion teaches AI. What failed startups teach policy.</p>
            <p>CUELUM is what happened when she started documenting. A venture studio built on recombination: colliding separate fields into something new. Curiosity Architecture is the teachable version: The framework distilled from one life lived across many lines.</p>
            <p>It's not theory. It's proof. Which you can also do.</p>
          </article>
        </div>
      </section>

      <section className="ca2-contact" aria-labelledby="ca2-contact-title">
        <div className="ca2-contact-tag">Get in touch with us!</div>
        <h2 id="ca2-contact-title">Curiosity is a structure.<br />Success is at the intersection.</h2>
        <p>Open to public speaking, press, research collaborations, and partnerships, or conversations that don't fit any of those.</p>
        <ContactForm />
      </section>
    </main>
  );
}
