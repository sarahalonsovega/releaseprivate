import { useEffect, useRef, useState } from "react";
/** Generic scroll-reveal wrapper — fades/rises content up once as it enters
    the viewport, generalizing the one-off IntersectionObserver pattern
    CuriosityPage's MethodRow already used. Home's own entrance motion
    (hm-hero-reveal) only fires on load, which works for above-fold hero
    content but not for the static section headings/blocks further down
    VEXA, Curiosity Architecture, and AMBLIA that used to just appear with
    no motion at all — this is what gives those pages Home's "content
    arrives deliberately" feel instead of everything being present from
    the first frame. Plain IntersectionObserver, not GSAP: most of what
    this wraps has no other motion on it, so pulling in the site's scroll-
    choreography library for a single fade-in would be overkill. */
export function Reveal({ children, delay = 0, style, className, as: As = "div" }) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    if (revealed) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setRevealed(true); });
    }, { threshold: 0.15 });
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <As ref={ref} className={className} style={{
      opacity: revealed ? 1 : 0,
      transform: revealed ? "translateY(0)" : "translateY(24px)",
      transitionProperty: "opacity, transform",
      transitionDuration: "0.8s",
      transitionTimingFunction: "var(--ease-reveal)",
      transitionDelay: `${delay}s`,
      ...style,
    }}>
      {children}
    </As>
  );
}
