import React from "react";
/** Editorial pull-quote — huge TT Tricks statement with optional magenta key word. */
export function QuoteBlock({ children, highlight, attribution, size = "var(--text-display-md)", onPaper = false, style }) {
  const text = highlight && typeof children === "string"
    ? children.split(highlight).flatMap((part, i, arr) => i < arr.length - 1
        ? [<span key={"p" + i}>{part}</span>, <span key={"h" + i} style={{ color: "var(--magenta)" }}>{highlight}</span>]
        : [<span key={"p" + i}>{part}</span>])
    : children;
  return (
    <figure style={{ margin: 0, ...style }}>
      <blockquote style={{ margin: 0, fontFamily: "var(--font-serif)", fontWeight: "var(--weight-light)", fontSize: size, lineHeight: "var(--display-line-height)", letterSpacing: "var(--display-tracking)", color: onPaper ? "var(--text-on-paper)" : "var(--text-primary)" }}>{text}</blockquote>
      {attribution && <figcaption style={{ marginTop: "16px", fontFamily: "var(--font-label)", fontSize: "var(--text-label-sm)", letterSpacing: "var(--label-tracking)", textTransform: "uppercase", color: onPaper ? "var(--text-on-paper-secondary)" : "var(--text-meta)" }}>{attribution}</figcaption>}
    </figure>
  );
}
