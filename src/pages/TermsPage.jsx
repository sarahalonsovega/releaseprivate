import { CuelumHero } from "../components/core/CuelumHero.jsx";

export function TermsPage() {
  return (
    <main className="legal-mockup-page">
      <CuelumHero />
      <section className="legal-mockup-copy" aria-labelledby="terms-title">
        <h1 id="terms-title">Terms of Use</h1>
        <p className="legal-mockup-date">Last updated 7 August 2026</p>
        <div className="legal-mockup-body">
          <p>This website provides general information about CUELUM and its divisions. You may browse and link to it for lawful purposes, but you may not misuse the site, interfere with its operation, or copy its content for commercial use without permission.</p>
          <p>Unless stated otherwise, CUELUM owns the site&apos;s text, design, branding, and original media. The site is provided as available. We do not promise that every statement will remain current or that access will always be uninterrupted.</p>
          <p>Nothing on this site is professional, financial, medical, or legal advice. To ask about these terms, email <a href="mailto:hello@cuelum.com">hello@cuelum.com</a>.</p>
        </div>
      </section>
    </main>
  );
}
