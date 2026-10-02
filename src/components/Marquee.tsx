"use client";

/**
 * Marquee — infinite horizontal text strip.
 * "OPEN TO INTERNSHIPS — FREELANCE — COLLABORATIONS —"
 * 1px borders top and bottom. Pure CSS animation.
 */
export function Marquee({ text, repeat = 6 }: { text: string; repeat?: number }) {
  const items = Array.from({ length: repeat * 2 }, function (_, i) {
    return (
      <span
        key={i}
        className="heading-display"
        style={{
          fontSize: "clamp(1.5rem, 4vw, 3rem)",
          whiteSpace: "nowrap",
          padding: "0 2vw",
        }}
        aria-hidden={i >= repeat}
      >
        {text}
      </span>
    );
  });

  return (
    <div
      style={{
        overflow: "hidden",
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
        padding: "1.25rem 0",
      }}
      aria-label={text}
    >
      <div className="marquee-track">{items}</div>
    </div>
  );
}
