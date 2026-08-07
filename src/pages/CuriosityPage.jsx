import { useState } from "react";
import curiosityHero from "../../heroforcuriosityandforcuriositydisioninhome.png";
import methodOne from "../../01curiosity.png";
import methodTwo from "../../02curiosityandinvexa03agenticera.png";
import methodThree from "../../03curiosity.png";
import sarahPortrait from "../../sarahpicture.JPG";

const whyItems = [
  {
    title: "It compounds instead of resetting.",
    body: "When one track disappears, a single-track career starts from zero. A portfolio doesn't, because each field brings methods the others can use.",
    image: "/uploads/ca-why-1.png",
  },
  {
    title: "It's the part AI doesn't take.",
    body: "The value moves to framing the problem, choosing what to borrow, and judging what's worth building: the work between fields, not inside one.",
    image: "/uploads/ca-why-2.png",
  },
  {
    title: "It's the safer bet.",
    body: "Most real advances are imports, a method from one field solving a problem in another. You can't see that from inside a single field. Three fields that talk to each other is a hedge, not a scatter.",
    image: "/uploads/ca-why-3.png",
  },
];

const methodology = [
  {
    number: "01",
    title: "Go deep in more than one place.",
    body: "Not dabbling. Deep enough in each field to produce real work you can point to.",
    image: methodOne,
    alt: "A lone figure surrounded by blurred silhouettes and magenta light",
  },
  {
    number: "02",
    title: "Design the intersections.",
    body: "Scattered and cross-domain look the same from outside. Structure is the difference: shared language, transferable methods, deliberate overlap.",
    image: methodTwo,
    alt: "Translucent black forms meeting around a magenta point",
  },
  {
    number: "03",
    title: "Make the connection the output.",
    body: "What you ship is the link itself, the pattern you can only see standing in two fields at once.",
    image: methodThree,
    alt: "A flowing group of pale abstract figures",
  },
];

function WhyBreadth() {
  const [active, setActive] = useState(0);

  return (
    <section className="ca-why" aria-labelledby="ca-why-title">
      <h2 id="ca-why-title">Why breadth holds up</h2>
      <div className="ca-why-gallery" role="group" aria-label="Reasons breadth holds up">
        {whyItems.map((item, index) => {
          const isActive = active === index;
          return (
            <button
              className="ca-why-panel"
              data-active={isActive}
              key={item.title}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(index)}
              style={{ backgroundImage: `linear-gradient(rgba(0,0,0,${isActive ? 0.55 : 0.66}), rgba(0,0,0,${isActive ? 0.55 : 0.66})), url(${item.image})` }}
            >
              <span className="ca-why-copy">
                <span className="ca-why-name">{item.title}</span>
                <span className="ca-why-body">{item.body}</span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function Methodology() {
  return (
    <section className="ca-method" aria-labelledby="ca-method-title">
      <div className="ca-method-inner">
        <h2 id="ca-method-title">Methodology</h2>
        <div className="ca-method-list">
          {methodology.map((item) => (
            <article className="ca-method-entry" key={item.number}>
              <div className="ca-method-copy">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
              <div className="ca-method-image">
                <img src={item.image} alt={item.alt} />
                <span aria-hidden="true">{item.number}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CuriosityPage() {
  return (
    <main className="ca-page">
      <style>{`
        .ca-page {
          --ca-serif: var(--font-serif);
          --ca-sans: var(--font-sans);
          background: #000;
          color: #fff;
          text-align: left;
        }
        .ca-page h1,
        .ca-page h2,
        .ca-page h3,
        .ca-page p { margin: 0; }
        .ca-page h1,
        .ca-page h2,
        .ca-page h3 {
          font-family: var(--ca-serif);
          font-weight: var(--weight-light);
          letter-spacing: -0.02em;
          text-wrap: balance;
        }
        .ca-page p {
          font-family: var(--ca-sans);
          color: rgba(255,255,255,.78);
          line-height: 1.55;
          text-wrap: pretty;
        }
        .ca-hero {
          position: relative;
          display: grid;
          min-height: clamp(540px, 52vw, 790px);
          place-items: center;
          padding: 72px var(--page-margin) 30px;
          overflow: hidden;
          background: #070307;
        }
        .ca-hero::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,.22);
        }
        .ca-hero img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 50% 52%;
        }
        .ca-hero h1 {
          position: relative;
          z-index: 1;
          max-width: 12.5ch;
          color: #fff;
          font-size: clamp(48px, 6.2vw, 90px);
          line-height: .98;
          text-align: center;
        }
        .ca-breadth {
          display: grid;
          place-items: center;
          min-height: clamp(430px, 42vw, 610px);
          padding: clamp(86px, 9vw, 132px) var(--page-margin) clamp(76px, 8vw, 112px);
          text-align: center;
        }
        .ca-breadth-inner {
          width: min(760px, 100%);
        }
        .ca-breadth p {
          font-size: clamp(13px, 1.05vw, 16px);
        }
        .ca-breadth p + p { margin-top: 24px; }
        .ca-breadth h2 {
          margin: 27px 0 23px;
          font-size: clamp(30px, 3vw, 45px);
          line-height: 1;
        }
        .ca-breadth strong {
          color: #fff;
          font-weight: 700;
        }
        .ca-why {
          padding: clamp(54px, 6vw, 88px) var(--page-margin) clamp(76px, 9vw, 126px);
        }
        .ca-why h2 {
          margin-bottom: clamp(38px, 4vw, 58px);
          font-size: clamp(26px, 2.4vw, 36px);
          text-align: center;
        }
        .ca-why-gallery {
          display: flex;
          width: min(1320px, 100%);
          height: clamp(320px, 29vw, 430px);
          margin: 0 auto;
          overflow: hidden;
        }
        .ca-why-panel {
          position: relative;
          flex: 1 1 0;
          min-width: 0;
          padding: 0;
          border: 0;
          border-radius: 0;
          background-position: center;
          background-size: cover;
          color: #fff;
          cursor: pointer;
          font: inherit;
          transition: flex-grow .55s var(--ease-standard);
        }
        .ca-why-panel[data-active="true"] { flex-grow: 6.35; }
        .ca-why-copy {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 28px;
          text-align: center;
        }
        .ca-why-name {
          font-family: var(--ca-serif);
          font-size: clamp(17px, 1.5vw, 25px);
          line-height: 1.12;
          white-space: nowrap;
        }
        .ca-why-body {
          display: none;
          max-width: 78ch;
          margin-top: 16px;
          color: rgba(255,255,255,.82);
          font-family: var(--ca-sans);
          font-size: clamp(10px, .78vw, 13px);
          line-height: 1.5;
        }
        .ca-why-panel[data-active="true"] .ca-why-body { display: block; }
        .ca-why-panel:not([data-active="true"]) .ca-why-copy {
          padding: 16px;
        }
        .ca-why-panel:not([data-active="true"]) .ca-why-name {
          font-size: clamp(12px, 1.05vw, 16px);
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
        .ca-method {
          padding: clamp(86px, 9vw, 132px) var(--page-margin) clamp(110px, 11vw, 160px);
        }
        .ca-method-inner {
          width: min(1320px, 100%);
          margin: 0 auto;
        }
        .ca-method h2 {
          margin-bottom: clamp(38px, 4.5vw, 64px);
          font-size: clamp(25px, 2.2vw, 34px);
        }
        .ca-method-list { margin-left: 0; }
        .ca-method-entry {
          display: grid;
          grid-template-columns: minmax(0, .95fr) minmax(0, 1.4fr);
          align-items: center;
          min-height: clamp(170px, 17vw, 238px);
        }
        .ca-method-copy {
          padding-right: clamp(34px, 6vw, 92px);
        }
        .ca-method-copy h3 {
          margin-bottom: 12px;
          font-size: clamp(24px, 2.15vw, 34px);
          line-height: 1.08;
        }
        .ca-method-copy p {
          max-width: 44ch;
          font-size: clamp(12px, .95vw, 15px);
        }
        .ca-method-image {
          position: relative;
          height: clamp(170px, 17vw, 238px);
          overflow: hidden;
        }
        .ca-method-image::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,.22);
        }
        .ca-method-image img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          object-position: center 48%;
        }
        .ca-method-image span {
          position: absolute;
          z-index: 1;
          inset: 50% auto auto 50%;
          transform: translate(-50%, -50%);
          color: #ff0098;
          font-family: var(--ca-serif);
          font-size: clamp(54px, 5.7vw, 84px);
          font-weight: var(--weight-light);
          letter-spacing: -0.04em;
          line-height: 1;
        }
        .ca-founder {
          padding: clamp(78px, 8vw, 118px) var(--page-margin) clamp(110px, 12vw, 176px);
        }
        .ca-founder-inner {
          display: grid;
          grid-template-columns: minmax(320px, .92fr) minmax(0, 1.18fr);
          gap: clamp(34px, 4.5vw, 70px);
          align-items: stretch;
          width: min(1180px, 100%);
          margin: 0 auto;
        }
        .ca-founder-image {
          min-height: 520px;
          overflow: hidden;
        }
        .ca-founder-image img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          object-position: center;
        }
        .ca-founder-copy {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          padding-top: 18px;
          text-align: left;
        }
        .ca-founder-copy h2 {
          font-size: clamp(34px, 3.7vw, 54px);
          line-height: 1;
        }
        .ca-founder-label {
          margin: 8px 0 26px;
          color: #ff0098;
          font-family: var(--font-label);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .04em;
          text-transform: uppercase;
        }
        .ca-founder-copy p {
          max-width: none;
          font-size: clamp(13px, 1vw, 15px);
          line-height: 1.58;
        }
        .ca-founder-copy p + p { margin-top: 22px; }
        .ca-founder-copy blockquote {
          margin: 25px 0 22px;
          max-width: 27ch;
          color: #fff;
          font-family: var(--ca-serif);
          font-size: clamp(24px, 2.35vw, 36px);
          font-weight: var(--weight-light);
          letter-spacing: -0.02em;
          line-height: 1.05;
        }
        .ca-structure {
          display: grid;
          min-height: clamp(440px, 47vw, 680px);
          place-items: center;
          padding: clamp(100px, 12vw, 172px) var(--page-margin);
          background: #000;
          text-align: center;
        }
        .ca-structure-inner { width: min(820px, 100%); }
        .ca-structure h2 {
          font-size: clamp(44px, 5vw, 72px);
          line-height: .98;
        }
        .ca-structure p {
          max-width: 54ch;
          margin: 38px auto 0;
          font-size: clamp(10px, .75vw, 12px);
        }
        .ca-structure a {
          display: inline-block;
          margin-top: 22px;
          color: rgba(255,255,255,.82);
          font-family: var(--ca-sans);
          font-size: clamp(15px, 1.4vw, 21px);
          text-decoration: none;
        }
        .ca-structure a:hover { color: #fff; }
        @media (max-width: 760px) {
          .ca-hero {
            min-height: 610px;
            padding-top: 90px;
          }
          .ca-hero h1 { font-size: clamp(46px, 13vw, 68px); }
          .ca-breadth { min-height: auto; }
          .ca-why-gallery {
            display: grid;
            height: auto;
            gap: 10px;
            overflow: visible;
          }
          .ca-why-panel,
          .ca-why-panel[data-active="true"] {
            min-height: 270px;
          }
          .ca-why-panel:not([data-active="true"]) .ca-why-name {
            font-size: 19px;
            white-space: normal;
            writing-mode: horizontal-tb;
          }
          .ca-why-panel .ca-why-body,
          .ca-why-panel[data-active="true"] .ca-why-body {
            display: block;
            font-size: 12px;
          }
          .ca-method-entry {
            grid-template-columns: 1fr;
            gap: 24px;
            margin-bottom: 58px;
          }
          .ca-method-copy { padding-right: 0; }
          .ca-method-image { height: 230px; }
          .ca-founder-inner { grid-template-columns: 1fr; }
          .ca-founder-image { min-height: 0; aspect-ratio: 4 / 5; }
          .ca-founder-copy { padding-top: 4px; }
          .ca-founder-copy p { font-size: 13px; }
          .ca-structure { min-height: 500px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ca-why-panel { transition: none; }
        }
      `}</style>

      <section className="ca-hero" aria-labelledby="ca-hero-title">
        <img src={curiosityHero} alt="" aria-hidden="true" />
        <h1 id="ca-hero-title">Learn everything<br />to create anything</h1>
      </section>

      <section className="ca-breadth" aria-labelledby="ca-breadth-title">
        <div className="ca-breadth-inner">
          <p>The usual advice is to narrow: pick a lane, go deep, specialize. That advice was built for a world that stayed still, where going deeper than everyone else was enough.</p>
          <p>That world is gone. People change roles and industries many times over a career. Whole categories of work appear and disappear inside a decade. And AI is absorbing the exact narrow, well-defined tasks specialization was built for.</p>
          <h2 id="ca-breadth-title">Breadth is infrastructure.</h2>
          <p><strong>Recombination</strong> is what stays human: spotting what carries over from one field to another, and putting proven pieces together into something new. AI works inside a problem. Deciding which fields belong in the same room is still a human job.</p>
        </div>
      </section>

      <WhyBreadth />
      <Methodology />

      <section className="ca-founder" aria-labelledby="ca-founder-title">
        <div className="ca-founder-inner">
          <div className="ca-founder-image">
            <img src={sarahPortrait} alt="Sarah Alonso Vega standing outdoors in Amsterdam" />
          </div>
          <div className="ca-founder-copy">
            <h2 id="ca-founder-title">Sarah Alonso Vega</h2>
            <div className="ca-founder-label">The person behind it</div>
            <p>Sarah has never stayed inside one field for long. She joined TEDxCibeles at eleven, took a Technovation team to the world semi-finals at fourteen, and spoke at Digital Enterprise Show at seventeen. Along the way, a Women in Tech global finalist and LinkedIn Director at Girl Genius. She's built across fields ever since.</p>
            <p>She studied East Asia and Korean at Leiden, then entrepreneurship at TU Delft, first as a student and later teaching it. She built Zoekey, a bike-finding device, wrote citizen-science policy for the Dutch UNESCO commission, and spent two years at Huawei's Amsterdam R&amp;D Center, in as an AI linguistics intern and out as team lead. Spain later named her one of its top 50 social innovators under thirty through the Fundació Princesa de Girona.</p>
            <p>Then the parts a résumé leaves out: eighteen months on a Venezuelan restaurant floor in The Hague, line cook to floor manager. Drama at LAMDA, fashion at IED, brand-building at LVMH. Six languages.</p>
            <blockquote>None of it was set aside. Every field handed something to the next.</blockquote>
            <p>That method is now CUELUM, the venture studio she founded and runs as Chief Curiosity Architect. Curiosity Architecture is what came out of it: not a theory about how a life like this might work, but documentation of one that did.</p>
          </div>
        </div>
      </section>

      <section className="ca-structure" aria-labelledby="ca-structure-title">
        <div className="ca-structure-inner">
          <h2 id="ca-structure-title">Curiosity is a structure.<br />Build at the intersection.</h2>
          <p>Open to speaking, research collaborations, consulting, and partnerships, or conversations that don't fit any of those.</p>
          <a href="mailto:hello@cuelum.com">hello@cuelum.com</a>
        </div>
      </section>
    </main>
  );
}
