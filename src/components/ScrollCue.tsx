"use client";

/**
 * ScrollCue — thin 40px vertical line at bottom of hero.
 * Animated with repeating scaleY pulse. Uses accent color.
 * One of the 3 accent uses on the page.
 */
export function ScrollCue() {
  return (
    <div style={{ display: "flex", justifyContent: "center", paddingTop: "4rem" }}>
      <div className="scroll-cue" />
    </div>
  );
}
