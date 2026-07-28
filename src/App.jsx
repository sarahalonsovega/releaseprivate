import { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NavBar } from "./components/core/NavBar.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { VexaPage } from "./pages/VexaPage.jsx";
import { CuriosityPage } from "./pages/CuriosityPage.jsx";
import { AmbliaPage } from "./pages/AmbliaPage.jsx";

const PAGES = {
  Home: HomePage,
  VEXA: VexaPage,
  "Curiosity Architecture": CuriosityPage,
  AMBLIA: AmbliaPage,
};

gsap.registerPlugin(ScrollTrigger);

function SiteFooter() {
  return (
    <footer style={{ padding: "48px var(--page-margin)", display: "flex", flexDirection: "column", gap: "28px", alignItems: "center", background: "transparent" }}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: "16px 32px", width: "100%" }}>
        <div style={{ display: "flex", gap: "24px", fontSize: "var(--text-body-sm)" }}>
          <a href="#" style={{ color: "var(--text-meta)" }}>Privacy Notice</a>
          <a href="#" style={{ color: "var(--text-meta)" }}>Credits</a>
          <a href="#" style={{ color: "var(--text-meta)" }}>LinkedIn</a>
          <a href="mailto:hello@cuelum.com" style={{ color: "var(--text-meta)" }}>Email</a>
        </div>
        <span style={{ fontSize: "var(--text-body-sm)", color: "var(--text-meta)" }}>© 2026 CUELUM Inc. All rights reserved.</span>
      </div>
    </footer>
  );
}

export function App() {
  const [page, setPage] = useState(() => localStorage.getItem("cuelum-page") || "Home");
  const lenisRef = useRef(null);
  const navWrapRef = useRef(null);

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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.1, easing: t => 1 - Math.pow(1 - t, 3) });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(time => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [page]);

  const go = (p) => {
    if (p === "Contact") {
      window.location.href = "mailto:hello@cuelum.com";
      return;
    }
    if (p === "About") {
      setPage("Home");
      localStorage.setItem("cuelum-page", "Home");
      setTimeout(() => {
        const el = document.getElementById("belief");
        if (!el) return;
        const top = el.offsetTop - 80;
        if (lenisRef.current) lenisRef.current.scrollTo(top);
        else window.scrollTo({ top, behavior: "smooth" });
      }, 60);
      return;
    }
    setPage(p);
    localStorage.setItem("cuelum-page", p);
  };

  const Page = PAGES[page] || HomePage;

  return (
    <div style={{ textAlign: "center" }}>
      <div ref={navWrapRef} style={{ position: "sticky", top: 0, zIndex: 10 }}>
        <NavBar
          links={["About", "Contact", "Curiosity Architecture", "VEXA", "AMBLIA"]}
          active={page}
          onNavigate={go}
          wordmarkSrc="/assets/wordmark-white.png"
          onWordmarkClick={() => go("Home")}
        />
      </div>
      <Page go={go} />
      <SiteFooter />
    </div>
  );
}
