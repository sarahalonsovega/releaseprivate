import { useState } from "react";

const amSerif = {
  margin: 0,
  fontFamily: "var(--font-serif)",
  fontWeight: "var(--weight-light)",
  lineHeight: "var(--display-line-height)",
  letterSpacing: "var(--display-tracking)",
};

const amBody = {
  margin: 0,
  color: "var(--text-secondary)",
  lineHeight: "var(--body-line-height)",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function AmbliaWaitlist() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const submit = event => {
    event.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setSent(true);
  };

  if (sent) {
    return <p className="am-waitlist-success">You're on the waitlist. We'll be in touch with updates.</p>;
  }

  return (
    <form className="am-waitlist" onSubmit={submit} noValidate>
      <label className="am-waitlist-field">
        <span>Email address</span>
        <input
          type="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? "amblia-email-error" : undefined}
          autoComplete="email"
          required
        />
        {error && <span id="amblia-email-error" className="am-waitlist-error" role="alert">{error}</span>}
      </label>
      <button type="submit">Join the waitlist</button>
    </form>
  );
}

export function AmbliaPage() {
  return (
    <div className="am-page">
      <style>{`
        .am-hero {
          box-sizing: border-box;
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--page-margin);
          background: url('/uploads/amblia-hero.png') center 48% / cover no-repeat;
          position: relative;
        }
        .am-hero::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.36);
        }
        .am-hero h1 {
          position: relative;
          z-index: 1;
          text-align: center;
          font-size: clamp(58px, 6.45vw, 98px);
        }
        .am-hero h1 > span {
          display: block;
          white-space: nowrap;
        }
        .am-intro {
          box-sizing: border-box;
          min-height: clamp(700px, 52.5vw, 800px);
          display: grid;
          grid-template-columns: minmax(0, 43%) minmax(0, 1fr);
          gap: clamp(44px, 4vw, 72px);
          align-items: center;
          padding: clamp(116px, 9.5vw, 146px) var(--page-margin) clamp(90px, 8vw, 124px) 0;
        }
        .am-intro-media {
          width: 100%;
          aspect-ratio: 1.18 / 1;
          overflow: hidden;
        }
        .am-intro-media img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          object-position: center 42%;
        }
        .am-intro-copy {
          max-width: 730px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          text-align: left;
        }
        .am-intro-copy h2 {
          align-self: center;
          margin-bottom: 12px;
          font-size: clamp(24px, 1.85vw, 28px);
          font-style: italic;
        }
        .am-intro-copy p {
          font-size: clamp(14px, 1vw, 16px);
        }
        .am-intro-copy p:last-child {
          color: rgba(255, 255, 255, 0.76);
        }
        .am-why {
          box-sizing: border-box;
          min-height: clamp(590px, 42vw, 680px);
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: clamp(90px, 7vw, 108px) var(--page-margin) clamp(130px, 10vw, 160px);
          text-align: center;
        }
        .am-why-inner {
          max-width: 760px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .am-why-label {
          margin: 0 0 28px;
          color: rgba(255, 255, 255, 0.55);
          font-family: var(--font-label);
          font-size: var(--text-label);
          font-weight: var(--weight-regular);
          letter-spacing: 0.06em;
          line-height: 1;
          text-transform: uppercase;
        }
        .am-why h2 {
          max-width: 18ch;
          margin-bottom: 32px;
          font-size: clamp(30px, 2.35vw, 36px);
        }
        .am-why p {
          max-width: 66ch;
          font-size: clamp(14px, 1vw, 16px);
        }
        .am-why p + p {
          margin-top: 24px;
        }
        .am-cta {
          box-sizing: border-box;
          min-height: 520px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex-direction: column;
          padding: clamp(120px, 10vw, 152px) var(--page-margin) 80px;
          text-align: center;
          background: var(--black);
        }
        .am-cta h2 {
          font-size: clamp(42px, 4.6vw, 70px);
          white-space: nowrap;
        }
        .am-cta-copy {
          max-width: 48ch;
          font-size: clamp(13px, 0.95vw, 15px);
        }
        .am-waitlist {
          width: min(100%, 520px);
          margin: 34px auto 0;
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 44px;
          align-items: start;
          text-align: left;
        }
        .am-waitlist-field {
          position: relative;
          display: flex;
          flex-direction: column;
          color: rgba(255, 255, 255, 0.66);
          font-family: var(--font-label);
          font-size: var(--text-label);
          letter-spacing: var(--label-tracking);
          text-transform: uppercase;
        }
        .am-waitlist input {
          width: 100%;
          min-height: 32px;
          box-sizing: border-box;
          border: 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 0;
          outline: 0;
          background: transparent;
          color: var(--white);
          font: 15px var(--font-sans);
        }
        .am-waitlist input:focus {
          border-color: rgba(255, 255, 255, 0.52);
        }
        .am-waitlist button {
          border: 0;
          border-radius: var(--radius-control);
          padding: 11px 18px;
          background: var(--grey-70);
          color: var(--grey-20);
          cursor: pointer;
          font-family: var(--font-label);
          font-size: var(--text-label);
          letter-spacing: var(--label-tracking);
          text-transform: uppercase;
          transition: background-color var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard);
        }
        .am-waitlist button:hover,
        .am-waitlist button:focus-visible {
          background: var(--grey-40);
          color: var(--white);
        }
        .am-waitlist-error {
          position: absolute;
          top: calc(100% + 6px);
          color: var(--magenta-bright);
          font-family: var(--font-sans);
          font-size: var(--text-body-sm);
          letter-spacing: 0;
          text-transform: none;
        }
        .am-waitlist-success {
          margin: 34px auto 0;
          color: var(--grey-20);
        }
        @media (max-width: 720px) {
          .am-hero { min-height: 100dvh; }
          .am-hero h1 { font-size: clamp(50px, 15vw, 72px); }
          .am-intro {
            min-height: 0;
            grid-template-columns: 1fr;
            gap: 48px;
            padding: 88px 24px 100px;
          }
          .am-intro-media {
            width: calc(100% + 48px);
            margin-left: -24px;
          }
          .am-intro-copy { text-align: left; }
          .am-why { min-height: 600px; padding: 96px 24px 140px; }
          .am-cta { min-height: 600px; padding: 100px 24px 150px; }
          .am-cta h2 { white-space: normal; }
          .am-waitlist { grid-template-columns: 1fr; gap: 18px; }
          .am-waitlist button { justify-self: center; margin-top: 12px; }
        }
      `}</style>

      <section className="am-hero">
        <h1 style={amSerif}>
          <span>Between you</span>
          <span>and your <em style={{ fontWeight: "inherit" }}>eyes</em>.</span>
        </h1>
      </section>

      <section className="am-intro">
        <div className="am-intro-media">
          <img src="/uploads/amblia-vision-cells.png" alt="A closed eye in close detail" />
        </div>
        <div className="am-intro-copy">
          <h2 style={amSerif}>Two eyes, one brain</h2>
          <p style={amBody}>Amblyopia, or lazy eye, is what happens when the brain and eyes stop working together. The brain starts ignoring signals from one eye, and that eye keeps weakening.</p>
          <p style={amBody}>The standard fix is still the patch, started in childhood. It's uncomfortable, and it only works if the child actually wears it. That's exactly where it falls apart.</p>
          <p style={amBody}>AMBLIA builds the therapy into something a child already wants to wear. Nothing to fight over, nothing to notice. The treatment runs in the background, and the child just goes about their day.</p>
        </div>
      </section>

      <section className="am-why">
        <div className="am-why-inner">
          <p className="am-why-label">Why it matters</p>
          <h2 style={amSerif}>Treatment shouldn't<br />feel like treatment.</h2>
          <p style={amBody}>The hard part of amblyopia was never the science. It's getting a child to keep<br className="am-desktop-break" /> wearing something they hate.</p>
          <p style={amBody}>AMBLIA starts from the opposite place: something they'd choose to wear anyway.</p>
        </div>
      </section>

      <section className="am-cta">
        <div>
          <h2 style={amSerif}>No patches. No fighting. Just <em style={{ fontWeight: "inherit" }}>vision</em>.</h2>
          <p className="am-cta-copy" style={{ ...amBody, margin: "clamp(64px, 5.3vw, 82px) auto 0" }}>We're not ready to show you what we're building yet.<br />Join the list and you'll be the first to know when it launches.</p>
          <AmbliaWaitlist />
        </div>
      </section>
    </div>
  );
}
