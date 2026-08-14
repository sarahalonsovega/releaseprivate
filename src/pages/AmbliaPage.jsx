import { useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function AmbliaWaitlist() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const updateField = event => {
    const { name, value } = event.target;
    setForm(current => ({ ...current, [name]: value }));
    if (name === "email" && error) setError("");
  };

  const submit = event => {
    event.preventDefault();
    if (!EMAIL_RE.test(form.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSent(true);
  };

  if (sent) {
    return (
      <p className="am-mockup-success" role="status">
        You're on the list. We'll be in touch when AMBLIA launches.
      </p>
    );
  }

  return (
    <form className="am-mockup-form" onSubmit={submit} noValidate>
      <label className="am-mockup-field">
        <span className="sr-only">First name</span>
        <input
          name="firstName"
          type="text"
          value={form.firstName}
          onChange={updateField}
          placeholder="First Name"
          autoComplete="given-name"
        />
      </label>
      <label className="am-mockup-field">
        <span className="sr-only">Last name</span>
        <input
          name="lastName"
          type="text"
          value={form.lastName}
          onChange={updateField}
          placeholder="Last Name"
          autoComplete="family-name"
        />
      </label>
      <label className="am-mockup-field am-mockup-email-field">
        <span className="sr-only">Email</span>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={updateField}
          placeholder="Email"
          autoComplete="email"
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? "amblia-email-error" : undefined}
          required
        />
        {error && (
          <span id="amblia-email-error" className="am-mockup-error" role="alert">
            {error}
          </span>
        )}
      </label>
      <button type="submit">Join!</button>
    </form>
  );
}

export function AmbliaPage() {
  return (
    <main className="am-mockup-page">
      <style>{`
        .am-mockup-page,
        .am-mockup-page * {
          box-sizing: border-box;
        }
        .am-mockup-page {
          overflow: hidden;
          background: #fff;
          color: #24252c;
          font-family: var(--font-sans);
        }
        .am-mockup-hero {
          position: relative;
          width: auto;
          aspect-ratio: 2.025 / 1;
          margin: clamp(18px, 2.45vw, 74px);
          margin-bottom: 0;
          border-radius: clamp(8px, .55vw, 17px);
          background: #000;
        }
        .am-mockup-hero-copy {
          position: absolute;
          z-index: 1;
          top: 49.5%;
          left: 8.4%;
          width: 42%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #fff;
          text-align: center;
        }
        .am-mockup-brand {
          margin: 0 0 clamp(28px, 2.8vw, 84px);
          font-family: var(--font-title);
          font-size: clamp(1.35rem, 2.05vw, 3.85rem);
          font-weight: 700;
          line-height: 1;
          letter-spacing: .025em;
        }
        .am-mockup-hero h1 {
          max-width: 8.5ch;
          margin: 0;
          color: #fff;
          font-family: var(--font-serif);
          font-size: clamp(3.1rem, 4.75vw, 8.9rem);
          font-weight: 300;
          line-height: .92;
          letter-spacing: -.04em;
          text-wrap: balance;
        }
        .am-mockup-bars {
          position: absolute;
          z-index: 2;
          top: 2%;
          left: 42.5%;
          width: 68%;
          max-width: none;
          height: auto;
          pointer-events: none;
          user-select: none;
        }
        .am-mockup-intro {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: clamp(140px, 10.4vw, 315px) clamp(24px, 6vw, 180px) 0;
          text-align: center;
        }
        .am-mockup-intro-copy {
          width: min(100%, 70ch);
          display: flex;
          flex-direction: column;
          gap: clamp(44px, 3.6vw, 108px);
        }
        .am-mockup-intro p,
        .am-mockup-burden p,
        .am-mockup-signup-copy {
          margin: 0;
          font-size: clamp(1rem, 1.34vw, 2.5rem);
          font-weight: 400;
          line-height: 1.42;
          letter-spacing: -.018em;
          text-wrap: pretty;
        }
        .am-mockup-patch {
          width: calc(100% + clamp(0px, 7.1vw, 214px));
          margin-top: clamp(120px, 8.6vw, 260px);
          overflow: hidden;
          aspect-ratio: 3.62 / 1;
          border-radius: clamp(8px, .55vw, 17px);
          background: #eee;
        }
        .am-mockup-patch img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          object-position: center 54%;
        }
        .am-mockup-burden {
          width: calc(100% + clamp(0px, 7.1vw, 214px));
          min-height: clamp(360px, 27.25vw, 824px);
          margin-top: clamp(12px, .9vw, 28px);
          padding: clamp(58px, 5.5vw, 166px) clamp(36px, 7vw, 212px);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(50px, 6vw, 180px);
          align-items: center;
          border-radius: clamp(8px, .55vw, 17px);
          background: #000;
          color: #fff;
          text-align: left;
        }
        .am-mockup-burden h2 {
          margin: 0;
          font-family: var(--font-serif);
          font-size: clamp(2.8rem, 4.45vw, 8.4rem);
          font-weight: 300;
          line-height: .88;
          letter-spacing: -.04em;
          text-align: center;
          text-wrap: balance;
        }
        .am-mockup-burden-copy {
          display: flex;
          flex-direction: column;
          gap: clamp(38px, 3vw, 90px);
        }
        .am-mockup-burden p {
          color: #fff;
          font-size: clamp(.95rem, 1.15vw, 2.18rem);
          line-height: 1.35;
        }
        .am-mockup-signup {
          min-height: clamp(920px, 78vw, 2360px);
          padding: clamp(155px, 10.3vw, 312px) 24px clamp(300px, 28vw, 846px);
          text-align: center;
        }
        .am-mockup-tag {
          display: inline-flex;
          min-height: clamp(48px, 4.2vw, 126px);
          align-items: center;
          justify-content: center;
          padding: 0 clamp(22px, 2.25vw, 68px);
          border-radius: clamp(7px, .55vw, 17px);
          background: #000;
          color: #9b9ba0;
          font-size: clamp(.84rem, 1.02vw, 1.92rem);
        }
        .am-mockup-signup h2 {
          margin: clamp(52px, 4.35vw, 132px) auto clamp(48px, 3.7vw, 112px);
          color: #151515;
          font-family: var(--font-serif);
          font-size: clamp(2.75rem, 4.45vw, 8.4rem);
          font-weight: 300;
          line-height: .95;
          letter-spacing: -.04em;
          text-wrap: balance;
        }
        .am-mockup-signup-copy {
          max-width: 55ch;
          margin: 0 auto;
          color: #55565d;
          font-size: clamp(.98rem, 1.16vw, 2.18rem);
          line-height: 1.35;
        }
        .am-mockup-form {
          width: min(100%, 780px);
          margin: clamp(52px, 4.5vw, 136px) auto 0;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(22px, 2.1vw, 64px);
          align-items: start;
        }
        .am-mockup-field {
          position: relative;
          display: block;
        }
        .am-mockup-field input {
          width: 100%;
          min-height: clamp(42px, 3.7vw, 112px);
          padding: 0 4px clamp(11px, 1vw, 30px);
          border: 0;
          border-bottom: 1px solid #aaaab0;
          border-radius: 0;
          outline: 0;
          background: transparent;
          color: #24252c;
          font: clamp(.9rem, 1.08vw, 2.05rem) var(--font-sans);
          text-align: center;
        }
        .am-mockup-field input::placeholder {
          color: #74757d;
          opacity: 1;
        }
        .am-mockup-field input:focus {
          border-color: #df008c;
        }
        .am-mockup-error {
          position: absolute;
          top: calc(100% + 9px);
          left: 0;
          width: 100%;
          color: #b0006f;
          font-size: .8rem;
          text-align: center;
        }
        .am-mockup-form button {
          grid-column: 1 / -1;
          justify-self: center;
          min-width: clamp(104px, 9.3vw, 280px);
          min-height: clamp(50px, 4.15vw, 126px);
          margin-top: clamp(34px, 2.9vw, 88px);
          padding: 0 clamp(24px, 2vw, 60px);
          border: 0;
          border-radius: clamp(7px, .55vw, 17px);
          background: #df008c;
          color: #fff;
          font-family: var(--font-sans);
          font-size: clamp(.95rem, 1.08vw, 2.05rem);
          cursor: pointer;
          transition: background-color .2s ease, transform .2s ease;
        }
        .am-mockup-form button:hover,
        .am-mockup-form button:focus-visible {
          background: #bd0078;
        }
        .am-mockup-form button:active {
          transform: translateY(1px);
        }
        .am-mockup-success {
          width: min(100%, 52ch);
          margin: clamp(52px, 4.5vw, 136px) auto 0;
          color: #3f4047;
          font-size: clamp(1rem, 1.16vw, 2.18rem);
        }
        @media (max-width: 760px) {
          .am-mockup-hero {
            min-height: 660px;
            aspect-ratio: auto;
            margin: 12px;
          }
          .am-mockup-hero-copy {
            top: 35%;
            left: 7%;
            width: 68%;
            align-items: flex-start;
            text-align: left;
          }
          .am-mockup-brand {
            margin-bottom: 30px;
            font-size: 1.3rem;
          }
          .am-mockup-hero h1 {
            max-width: 7.5ch;
            font-size: clamp(3.3rem, 15vw, 4.8rem);
            line-height: .9;
          }
          .am-mockup-bars {
            top: 47%;
            left: 7%;
            width: 132%;
          }
          .am-mockup-intro {
            padding: 112px 18px 0;
          }
          .am-mockup-intro-copy {
            gap: 36px;
          }
          .am-mockup-intro p,
          .am-mockup-burden p,
          .am-mockup-signup-copy {
            font-size: 1rem;
          }
          .am-mockup-patch {
            width: 100%;
            margin-top: 96px;
            aspect-ratio: 1.8 / 1;
          }
          .am-mockup-patch img {
            object-position: 51% 52%;
          }
          .am-mockup-burden {
            width: 100%;
            min-height: 560px;
            margin-top: 10px;
            padding: 64px 28px;
            grid-template-columns: 1fr;
            gap: 58px;
            text-align: center;
          }
          .am-mockup-burden h2 {
            font-size: clamp(2.8rem, 14vw, 4.2rem);
          }
          .am-mockup-signup {
            min-height: 1040px;
            padding: 140px 24px 330px;
          }
          .am-mockup-signup h2 {
            max-width: 10ch;
            font-size: clamp(2.8rem, 13.5vw, 4rem);
          }
          .am-mockup-form {
            width: min(100%, 420px);
            grid-template-columns: 1fr;
            gap: 30px;
          }
          .am-mockup-form button {
            grid-column: auto;
            margin-top: 16px;
          }
        }
      `}</style>

      <section className="am-mockup-hero" aria-labelledby="amblia-title">
        <div className="am-mockup-hero-copy">
          <p className="am-mockup-brand">AMBLIA</p>
          <h1 id="amblia-title">Between you and your eyes</h1>
        </div>
        <img
          className="am-mockup-bars"
          src="/uploads/amblia-mockup-bars.png"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
        />
      </section>

      <section className="am-mockup-intro" aria-label="About AMBLIA">
        <div className="am-mockup-intro-copy">
          <p>Amblyopia (lazy eye), is what happens when the brain and eyes stop working together. The brain starts ignoring signals from one eye, and that eye keeps weakening.</p>
          <p>The standard fix is still the patch, started in childhood. It's uncomfortable, and it only works if the child actually wears it.</p>
          <p>AMBLIA builds the therapy into something a child already wants to wear. Nothing to fight over, nothing to notice. The treatment runs in the background, and the child just goes about their day.</p>
        </div>

        <div className="am-mockup-patch">
          <img
            src="/uploads/amblia-patch-child.png"
            alt="A child placing an eye patch over one eye"
          />
        </div>

        <section className="am-mockup-burden" aria-labelledby="amblia-burden-title">
          <h2 id="amblia-burden-title">Treatment should not<br />feel like a burden</h2>
          <div className="am-mockup-burden-copy">
            <p>The hard part of was never the science. It's getting a child to keep wearing something they hate.</p>
            <p>AMBLIA starts from the opposite place:<br />something they will not even notice they are wearing.</p>
          </div>
        </section>
      </section>

      <section className="am-mockup-signup" aria-labelledby="amblia-signup-title">
        <span className="am-mockup-tag">Sign up to the mail list</span>
        <h2 id="amblia-signup-title">No patches. No fighting. Just vision.</h2>
        <p className="am-mockup-signup-copy">We're not ready to show you what we're building yet.<br />Join the list and you'll be the first to know when it launches.</p>
        <AmbliaWaitlist />
      </section>
    </main>
  );
}
