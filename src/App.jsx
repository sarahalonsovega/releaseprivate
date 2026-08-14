import { useEffect, useRef } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { CornerMenu } from "./components/core/CornerMenu.jsx";
import { MockupFooter } from "./components/core/MockupFooter.jsx";
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
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

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
      <CornerMenu active={LABEL_BY_PATH[location.pathname]} onNavigate={go} />
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
      {!isHome && <MockupFooter go={go} />}
    </div>
  );
}
