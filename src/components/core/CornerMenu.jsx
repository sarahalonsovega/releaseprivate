import { useEffect, useRef, useState } from "react";

const items = ["VEXA", "Curiosity Architecture", "AMBLIA", "About", "Contact"];

export function CornerMenu({ active, onNavigate }) {
  const [open, setOpen] = useState(false);
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
    focusables[1]?.focus();
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

  const choose = (label) => {
    setOpen(false);
    onNavigate(label);
  };

  return (
    <div ref={wrapRef} className={`corner-menu corner-menu-visible${open ? " corner-menu-open" : ""}`}>
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
      <div id="corner-menu-panel" className="corner-menu-panel" role="dialog" aria-modal="true" aria-hidden={!open} aria-label="Main navigation">
        <img className="corner-menu-wordmark" src="/assets/wordmark-white.png" alt="CUELUM" />
        <nav aria-label="Main navigation">
          <button type="button" onClick={() => choose("Home")}>Home</button>
          {items.map(item => (
            <button className={active === item ? "is-active" : ""} type="button" key={item} onClick={() => choose(item)}>
              {item}
            </button>
          ))}
        </nav>
        <a className="corner-menu-email" href="mailto:hello@cuelum.com">hello@cuelum.com</a>
      </div>
    </div>
  );
}
