"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/gsapUtils";

/**
 * IntroLoader — fixed dark overlay with a mono counter
 * ticking 000 → 100, then the overlay slides up.
 * Total duration under 2.2s. Locks scroll during playback.
 * Skipped entirely if user prefers reduced motion.
 */
export function IntroLoader() {
  const [done, setDone] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(function runIntro() {
    if (prefersReducedMotion()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDone(true);
      return;
    }

    document.body.style.overflow = "hidden";

    const counter = { value: 0 };
    const tl = gsap.timeline({
      onComplete: function onIntroComplete() {
        document.body.style.overflow = "";
        setDone(true);
      },
    });

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#%&*";
    
    tl.to(counter, {
      value: 100,
      duration: 1.6,
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
          
          // Add a 25% chance per character to render a random hacker glyph
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

    tl.to(overlayRef.current, {
      yPercent: -100,
      duration: 0.6,
      ease: "power4.inOut",
    }, "+=0.05");

    return function cleanup() {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div ref={overlayRef} className="intro-overlay" aria-hidden="true">
      <span ref={counterRef} className="intro-counter">000</span>
    </div>
  );
}
