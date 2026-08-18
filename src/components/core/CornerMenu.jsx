import { useEffect, useRef, useState } from "react";

const items = [
  { label: "VEXA", text: "Vexa" },
  { label: "Curiosity Architecture", text: "Curiosity Architecture" },
  { label: "AMBLIA", text: "Amblia" },
  { label: "About", text: "About" },
  { label: "Contact", text: "Contact" },
];

export function CornerMenu({ active, isHome = false, onNavigate }) {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const wrapRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const closeEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", closeEscape);
    return () => document.removeEventListener("keydown", closeEscape);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    document.body.style.overflow = "hidden";
    const focusables = [...wrapRef.current.querySelectorAll("button, a[href]")];
    wrapRef.current.querySelector("nav button")?.focus();
    const trapFocus = (event) => {
      if (event.key !== "Tab" || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", trapFocus);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", trapFocus);
      previousFocus?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    let observer;
    const frame = requestAnimationFrame(() => {
      const hero = document.querySelector(".home-mockup-hero,.vx-hero,.ca2-hero,.am-mockup-hero");
      if (!hero) return;
      observer = new IntersectionObserver(([entry]) => {
        setStuck(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      }, { threshold: 0, rootMargin: "-72px 0px 0px 0px" });
      observer.observe(hero);
    });
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      setStuck(false);
    };
  }, [active]);

  const choose = (label) => {
    setOpen(false);
    onNavigate(label);
  };

  return (
    <div ref={wrapRef} className={`corner-menu corner-menu-visible${isHome ? " corner-menu-homepage" : " corner-menu-division"}${stuck ? " corner-menu-stuck" : ""}${open ? " corner-menu-open" : ""}`}>
      <div className="corner-menu-bar">
        <button className="corner-menu-home" type="button" aria-label="Go to home page" onClick={() => choose("Home")}>
          <img className="corner-menu-wordmark" src="/assets/wordmark-white.png" alt="CUELUM" />
        </button>
        <button
          ref={triggerRef}
          className="corner-menu-trigger"
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="corner-menu-panel"
          onClick={() => setOpen(value => !value)}
        >
          <img src="/uploads/menu-bars-white.png" alt="" aria-hidden="true" />
        </button>
      </div>
      <div id="corner-menu-panel" className="corner-menu-panel" role="dialog" aria-modal="true" aria-hidden={!open} aria-label="Main navigation">
        <nav aria-label="Main navigation">
          {items.map(item => (
            <button className={active === item.label ? "is-active" : ""} type="button" key={item.label} onClick={() => choose(item.label)}>
              {item.text}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
