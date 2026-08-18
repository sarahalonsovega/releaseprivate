import { MockupFooter } from "../components/core/MockupFooter.jsx";
import { CuelumHero } from "../components/core/CuelumHero.jsx";

const divisions = [
  {
    label: "VEXA",
    image: "/uploads/home-vexa-reference.png",
    alt: "A luminous digital brain formed from magenta data structures",
    className: "home-mockup-division-vexa",
  },
  {
    label: "Curiosity Architecture",
    image: "/uploads/home-curiosity-reference.png",
    alt: "An astronaut raising a gold visor in warm evening light",
    className: "home-mockup-division-curiosity",
  },
  {
    label: "AMBLIA",
    image: "/uploads/home-amblia-reference.png",
    alt: "A person gently covering one closed eye",
    className: "home-mockup-division-amblia",
  },
];

function DivisionCard({ label, image, alt, className, onClick }) {
  return (
    <button className={`home-mockup-division ${className}`} type="button" onClick={onClick}>
      <span className="home-mockup-division-image">
        <img src={image} alt={alt} />
      </span>
      <span className="home-mockup-division-name">{label}</span>
    </button>
  );
}

export function HomePage({ go }) {
  return (
    <main className="home-mockup">
      <CuelumHero />

      <section id="belief" className="home-mockup-manifesto" aria-label="About CUELUM">
        <p>CUELUM is a venture studio exploring the future of human capability at the<br className="home-mockup-desktop-break" /> intersection of AI and cross-domain innovation.</p>
        <p>We build on one belief:<br />The best solutions come from recombination, taking proven pieces from<br className="home-mockup-desktop-break" /> different fields and putting them together into something new.</p>
        <p>So we go deep in more than one field, and build in the intersections.</p>
      </section>

      <section className="home-mockup-divisions" aria-label="Our divisions">
        {divisions.map((division) => (
          <DivisionCard
            key={division.label}
            {...division}
            onClick={() => go(division.label)}
          />
        ))}
      </section>

      <section className="home-mockup-contact" aria-labelledby="home-contact-title">
        <span className="home-mockup-contact-tag">Book a call with us!</span>
        <h2 id="home-contact-title">Tell us what you’re<br />curious about</h2>
        <p>Open to chat about story, research collaborations,<br className="home-mockup-desktop-break" /> consulting, and partnerships, or conversations that don&apos;t fit<br className="home-mockup-desktop-break" /> any of those.</p>
        <button className="home-mockup-schedule" type="button" onClick={() => go("Contact")}>Schedule</button>
      </section>

      <MockupFooter go={go} />
    </main>
  );
}
