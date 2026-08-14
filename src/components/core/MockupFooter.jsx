import { Link } from "react-router-dom";

export function MockupFooter({ go }) {
  return (
    <div className="mockup-footer-shell">
      <section className="home-mockup-footer-image" aria-label="CUELUM architectural study">
        <img src="/uploads/home-footer-wood.png" alt="Curved timber architecture illuminated with magenta light" />
      </section>
      <footer className="home-mockup-footer">
        <div className="home-mockup-footer-meta">
          <span>United States · Spain · Estonia · China</span>
          <a href="mailto:hello@cuelum.com">hello@cuelum.com</a>
          <span>© 2026 CUELUM Inc. All rights reserved.</span>
        </div>
        <nav className="home-mockup-footer-links" aria-label="Footer navigation">
          <div>
            <button type="button" onClick={() => go("About")}>About</button>
            <button type="button" onClick={() => go("VEXA")}>Divisions</button>
            <a href="https://www.linkedin.com/company/cuelum/" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
          <div>
            <a href="mailto:hello@cuelum.com">Contact</a>
            <Link to="/privacy">Privacy policy</Link>
            <Link to="/terms-of-use">Terms of service</Link>
          </div>
        </nav>
      </footer>
    </div>
  );
}
