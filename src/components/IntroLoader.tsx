"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/gsapUtils";

/**
 * IntroLoader — fixed dark overlay with a mono counter
 * ticking 000 → 100, then the overlay slides up.
 *
 * Strategy:
 * - The CSS `html[data-loading]::before` rule paints a dark cover
 *   immediately on first paint (before JS hydrates), so users never
 *   see a flash of unstyled content.
 * - This component waits for `document.fonts.ready` so the counter
 *   and site reveal happen only once fonts are available.
 * - On complete, `data-loading` is removed from <html>, lifting the
 *   CSS cover, and the overlay slides up.
 *
 * Total duration ~1.7s. Locks scroll during playback.
 * Skipped entirely if user prefers reduced motion.
 */
export function IntroLoader() {
  const [done, setDone] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(function runIntro() {
    // Remove data-loading immediately if reduced motion preferred
    if (prefersReducedMotion()) {
      document.documentElement.removeAttribute("data-loading");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDone(true);
      return;
    }

    document.body.style.overflow = "hidden";

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#%&*";

    // Wait for fonts to be ready so there's no FOIT on reveal
    document.fonts.ready.then(function startAnimation() {
      const counter = { value: 0 };
      const tl = gsap.timeline({
        onComplete: function onIntroComplete() {
          document.body.style.overflow = "";
          // Remove the CSS-first cover attribute
          document.documentElement.removeAttribute("data-loading");
          setDone(true);
        },
      });

      // Counter: 000 → 100 in 1.1s (was 1.6s)
      tl.to(counter, {
        value: 100,
        duration: 1.1,
        ease: "power2.inOut",
        onUpdate: function updateCounter() {
          if (counterRef.current) {
            const val = Math.round(counter.value);
            if (val === 100) {
              counterRef.current.textContent = "100";
              return;
            }

            const str = String(val).padStart(3, "0");
            let result = "";

            // 25% chance per character to render a random hacker glyph
            for (let i = 0; i < 3; i++) {
              if (Math.random() < 0.25) {
                result += chars[Math.floor(Math.random() * chars.length)];
              } else {
                result += str[i];
              }
            }

            counterRef.current.textContent = result;
          }
        },
      });

      // Slide up: 0.5s, tighter gap before slide
      tl.to(overlayRef.current, {
        yPercent: -100,
        duration: 0.5,
        ease: "power4.inOut",
      }, "+=0.02");
    });

    return function cleanup() {
      gsap.killTweensOf("*");
      document.body.style.overflow = "";
      document.documentElement.removeAttribute("data-loading");
    };
  }, []);

  if (done) return null;

  return (
    <div ref={overlayRef} className="intro-overlay" aria-hidden="true">
      <span ref={counterRef} className="intro-counter">000</span>
    </div>
  );
}
