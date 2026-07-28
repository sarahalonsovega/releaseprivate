import React from "react";
/** Generative magenta/black density map — an abstract stand-in for photography behind data/stat moments. Pure CSS, no assets. */
export function DensityField({ rows = 8, cols = 24, seed = 1, style }) {
  const cells = React.useMemo(() => {
    let s = seed;
    const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
    return Array.from({ length: rows * cols }, (_, i) => {
      const col = i % cols;
      const centerDist = Math.abs(col - cols / 2) / (cols / 2);
      const bias = 1 - centerDist * 0.7;
      const r = rand();
      if (r > 0.95 * bias) return "bright";
      if (r > 0.85 * bias) return "lit";
      return "dim";
    });
  }, [rows, cols, seed]);

  return (
    <div aria-hidden="true" style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: "6px", ...style }}>
      {cells.map((kind, i) => (
        <span key={i} style={{
          aspectRatio: "1", borderRadius: "1px",
          background: kind === "bright" ? "var(--magenta-bright)" : kind === "lit" ? "var(--magenta-deep)" : "var(--grey-90)",
          opacity: kind === "bright" ? 0.55 : kind === "lit" ? 0.35 : 0.2,
        }} />
      ))}
    </div>
  );
}
