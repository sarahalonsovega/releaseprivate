import { CuelumHero } from "../components/core/CuelumHero.jsx";

export function PrivacyPage() {
  return (
    <main className="legal-mockup-page">
      <CuelumHero />
      <section className="legal-mockup-copy" aria-labelledby="privacy-title">
        <h1 id="privacy-title">Legal Privacy Notice</h1>
        <p className="legal-mockup-date">Last updated 7 August 2026</p>
        <div className="legal-mockup-body">
          <p>CUELUM does not currently use advertising or analytics cookies on this site. The AMBLIA waitlist field is not transmitted or stored by the website.</p>
          <p>If you email us or use the VEXA contact form, the details you choose to send are passed through your email provider to CUELUM. We use them only to answer your request, manage the resulting relationship, and meet legal obligations. We keep them only as long as reasonably necessary.</p>
          <p>The infrastructure used to deliver this site may receive limited technical information such as your IP address and browser details when content loads. You may ask to access, correct, delete, restrict, or object to our use of your personal data by emailing <a href="mailto:hello@cuelum.com">hello@cuelum.com</a>. You may also contact your local data protection authority.</p>
        </div>
      </section>
    </main>
  );
}
