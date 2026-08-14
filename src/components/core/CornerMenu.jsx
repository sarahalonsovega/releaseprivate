import { useEffect, useRef, useState } from "react";
import { ThreeBarMark } from "./ThreeBarMark.jsx";

const items = ["VEXA", "Curiosity Architecture", "AMBLIA", "About", "Contact"];

export function CornerMenu({ active, onNavigate }) {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > 72);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const closeOutside = (event) => {
      if (!wrapRef.current?.contains(event.target)) setOpen(false);
    };
    const closeEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeEscape);
    };
  }, []);

  const choose = (label) => {
    setOpen(false);
    onNavigate(label);
  };

  return (
    <div ref={wrapRef} className={`corner-menu${visible || open ? " corner-menu-visible" : ""}${open ? " corner-menu-open" : ""}`}>
      <button
        className="corner-menu-trigger"
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="corner-menu-panel"
        onClick={() => setOpen(value => !value)}
      >
        <ThreeBarMark color="#050505" width={37} />
      </button>
      <nav id="corner-menu-panel" className="corner-menu-panel" aria-label="Main navigation">
        <button type="button" onClick={() => choose("Home")}>Home</button>
        {items.map(item => (
          <button className={active === item ? "is-active" : ""} type="button" key={item} onClick={() => choose(item)}>
            {item}
          </button>
        ))}
      </nav>
    </div>
  );
}
