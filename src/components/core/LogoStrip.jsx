import React from "react";
/** A logo strip image cropped down to just the logo row via absolute positioning
    (negative margin inside a flex align-items:center parent centers the margin
    box, not the content, so the offset math goes wrong — absolute positioning
    is unambiguous). Each source PNG (1920x1080) also carries ~35-46px of
    transparent padding baked in on its left/right edges around the real
    logo content (x≈84-1810) — cropped horizontally too, or that padding
    stacks with the flex gap and produces a much bigger dead zone between
    strips than between logos within the same strip. The window is a hair
    wider than that measured bounding box so the edge logos don't get clipped.
    `height` scales the whole crop window proportionally (default 100 matches
    VEXA's original marquee tuning) so the same source art also works as a
    compact single-line strip, e.g. in Home's hero. Shared by both. */
export function LogoStrip({ src, height = 100 }) {
  const scale = height / 100;
  return (
    <div style={{ position: "relative", height: `${height}px`, width: `${766 * scale}px`, overflow: "hidden", flexShrink: 0 }}>
      <img src={src} alt="" style={{ position: "absolute", top: `${-180 * scale}px`, left: `${-21 * scale}px`, height: `${460 * scale}px`, width: "auto", display: "block", filter: "invert(1)" }} />
    </div>
  );
}
