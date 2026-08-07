import { useEffect, useRef } from "react";
import { Routes, Route, Navigate, Link, useLocation, useNavigate } from "react-router-dom";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { NavBar } from "./components/core/NavBar.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { VexaPage } from "./pages/VexaPage.jsx";
import { CuriosityPage } from "./pages/CuriosityPage.jsx";
import { AmbliaPage } from "./pages/AmbliaPage.jsx";
import { TermsPage } from "./pages/TermsPage.jsx";
import { PrivacyPage } from "./pages/PrivacyPage.jsx";

gsap.registerPlugin(ScrollTrigger, Draggable);

// Single source of truth for route <-> nav-label lookups. "Home" carries no
// nav link of its own (mirrors the old state-switcher, which never
// highlighted a "Home" link either — the wordmark click covers that).
const ROUTES = [
  { path: "/", label: "Home" },
  { path: "/vexa", label: "VEXA" },
  { path: "/curiosity-architecture", label: "Curiosity Architecture" },
  { path: "/amblia", label: "AMBLIA" },
];
const PATH_BY_LABEL = Object.fromEntries(ROUTES.map(r => [r.label, r.path]));
const LABEL_BY_PATH = Object.fromEntries(ROUTES.map(r => [r.path, r.label]));
// About and Contact aren't page routes (About redirects+scrolls, Contact is
// mailto) but still want a real href for hover/middle-click — see NavBar.
const NAV_HREFS = { ...PATH_BY_LABEL, About: "/about", Contact: "mailto:hello@cuelum.com" };

// Every mockup's footer (Home included) shows the same content: wordmark +
// one-line description, no CTA buttons — Contact and each division are
// already one click away via the persistent nav on every page, so a footer
// CTA row would just duplicate that. One constant, reused by every page.
const footerCenter = (
  <>
    <img src="/assets/wordmark-white.png" alt="CUELUM" style={{ height: "22px" }} />
    <p style={{ margin: 0, maxWidth: "44ch", textAlign: "center", fontFamily: "var(--font-serif)", fontWeight: "var(--weight-light)", fontSize: "clamp(18px,2vw,22px)", color: "var(--text-secondary)", lineHeight: "var(--body-line-height)" }}>
      is a venture studio exploring the future of human capability at the intersection of AI and cross-domain innovation.
    </p>
  </>
);

/** Every page closes with the same full-bleed field and quiet translucent
    content plane shown in the supplied mockups. */
function Footer({ image, center }) {
  return (
    <footer style={{ position: "relative", marginTop: "var(--space-10)", minHeight: "clamp(560px,78vh,860px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(28px,5vw,72px) var(--page-margin)",
      backgroundImage: `linear-gradient(rgba(0,0,0,0.24),rgba(0,0,0,0.34)), url('${image}')`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="home-division-glass" style={{ position: "relative", width: "100%", minHeight: "clamp(430px,60vh,650px)", borderRadius: "var(--radius-overlay)", overflow: "hidden",
        display: "flex", flexDirection: "column", alignItems: "center", padding: "clamp(28px,4vw,48px)" }}>
        <div aria-hidden="true" className="home-division-glass-backdrop" />
        <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "32px" }}>
          {center}
        </div>
        <div style={{ position: "relative" }}>
          <FooterLegal />
        </div>
      </div>
    </footer>
  );
}

function FooterLegal() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "center", fontSize: "var(--text-body-sm)" }}>
        <Link to="/privacy" style={{ color: "var(--text-meta)" }}>Privacy Notice</Link>
        <Link to="/terms-of-use" style={{ color: "var(--text-meta)" }}>Terms of Use</Link>
        <a href="#" style={{ color: "var(--text-meta)" }}>Credits</a>
        <a href="https://www.linkedin.com/company/cuelum/" target="_blank" rel="noreferrer" style={{ color: "var(--text-meta)" }}>LinkedIn</a>
        <a href="mailto:hello@cuelum.com" style={{ color: "var(--text-meta)" }}>Email</a>
      </div>
      <span style={{ fontSize: "var(--text-body-sm)", color: "var(--text-meta)" }}>© 2026 CUELUM Inc. All rights reserved.</span>
    </div>
  );
}

/** Scrolls to an anchor on the current page once it exists. A fixed delay
    (rather than checking for the element synchronously) gives the freshly
    routed-to page a moment to mount. */
function scrollToAnchor(id, lenisRef) {
  setTimeout(() => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.offsetTop - 80;
    if (lenisRef.current) {
      // Lenis only recalculates its max-scroll `limit` via a 250ms-debounced
      // ResizeObserver (or once, synchronously, at construction). This runs
      // shortly after a route change, before that debounce has settled —
      // without forcing `resize()` first, `scrollTo` silently clamps `top`
      // to a stale, too-small limit and never actually moves.
      lenisRef.current.resize();
      lenisRef.current.scrollTo(top);
    } else {
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, 60);
}

export function App() {
  const lenisRef = useRef(null);
  const navWrapRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Fonts use font-display: swap (see public/tokens/fonts.css), so text
  // first paints in a fallback face and reflows once the real face lands —
  // after any pinned ScrollTrigger (e.g. Home's belief-section emblem) has
  // already measured its trigger's position against the fallback-font
  // layout. Without this, that pin's start/end offsets go stale the moment
  // the swap happens, so it either never engages or engages at the wrong
  // scroll position. Refreshing once fonts are actually ready re-measures
  // everything against final layout.
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  // The VEXA jump-nav sticks directly under this bar, so its sticky `top`
  // must always equal this bar's real rendered height — which changes
  // responsively (e.g. links wrapping at narrow widths). Publish it as a
  // CSS var instead of hardcoding a px value that drifts out of sync.
  useEffect(() => {
    const el = navWrapRef.current;
    if (!el) return;
    const setHeight = () => {
      document.documentElement.style.setProperty("--navbar-height", `${el.getBoundingClientRect().height}px`);
    };
    setHeight();
    const ro = new ResizeObserver(setHeight);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const lenis = new Lenis({ duration: 1.1, easing: t => 1 - Math.pow(1 - t, 3) });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    // Named so cleanup can remove this exact callback — without that, a
    // remount (StrictMode's dev-only double-invoke, or any future HMR/route
    // change that unmounts App) leaves a stale ticker entry calling .raf() on
    // an already-destroyed Lenis instance, which stalls the live instance's
    // own scroll animation.
    const tickLenis = time => lenis.raf(time * 1000);
    gsap.ticker.add(tickLenis);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tickLenis);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Normal navigation resets to the top of the new page. A location can opt
  // out by carrying `state.scrollTo: "<id>"` instead (see the About route and
  // `go("About")`) — reading it fresh off `location` on every run is
  // race-free, unlike a mutable ref flag toggled from a different effect
  // (which broke under React 19 StrictMode's dev-only double-invoke: the
  // flag could be consumed by a phantom mount pass before the real route
  // transition's effect run ever saw it).
  useEffect(() => {
    const anchorId = location.state?.scrollTo;
    if (anchorId) {
      scrollToAnchor(anchorId, lenisRef);
    } else {
      lenisRef.current?.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
    }
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [location]);

  const go = (label) => {
    if (label === "Contact") {
      window.location.href = "mailto:hello@cuelum.com";
      return;
    }
    if (label === "About") {
      navigate("/", { state: { scrollTo: "belief" } });
      return;
    }
    navigate(PATH_BY_LABEL[label] || "/");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div ref={navWrapRef} style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 10 }}>
        <NavBar
          links={["About", "Contact", "Curiosity Architecture", "VEXA", "AMBLIA"]}
          active={LABEL_BY_PATH[location.pathname]}
          hrefs={NAV_HREFS}
          onNavigate={go}
          wordmarkSrc="/assets/wordmark-white.png"
          onWordmarkClick={() => go("Home")}
          style={{ background: "transparent" }}
        />
      </div>
      <Routes>
        <Route path="/" element={<HomePage go={go} />} />
        <Route path="/vexa" element={<VexaPage go={go} />} />
        <Route path="/curiosity-architecture" element={<CuriosityPage go={go} />} />
        <Route path="/amblia" element={<AmbliaPage go={go} />} />
        <Route path="/terms-of-use" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/privacy-policy" element={<Navigate to="/privacy" replace />} />
        <Route path="/about" element={<Navigate to="/" state={{ scrollTo: "belief" }} replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer image="/uploads/footerbackgroundallpages.png" center={footerCenter} />
    </div>
  );
}
