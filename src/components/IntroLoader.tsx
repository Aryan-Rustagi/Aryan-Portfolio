"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/gsapUtils";

/**
 * IntroLoader — keeps the overlay up until the ENTIRE page is loaded
 * (window.load event: all images, scripts, fonts, iframes done).
 *
 * Strategy:
 * - Counter crawls 0 → 90% slowly while the page loads in the background.
 * - When window.load fires, counter snaps to 100 and overlay slides up.
 * - If loading is faster than the crawl, counter jumps to 100 immediately.
 * - Minimum 600ms display time so it never just flashes on fast connections.
 * - CSS `html[data-loading]::before` provides instant dark cover before JS.
 */
export function IntroLoader() {
  const [done, setDone] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(function runIntro() {
    if (prefersReducedMotion()) {
      document.documentElement.removeAttribute("data-loading");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDone(true);
      return;
    }

    document.body.style.overflow = "hidden";

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#%&*";
    const counter = { value: 0 };
    const startTime = Date.now();
    const MIN_DISPLAY_MS = 600;

    // Track whether window has fully loaded
    let windowLoaded = document.readyState === "complete";
    let revealScheduled = false;

    // ── Render counter value with hacker glitch ──────────────────────────
    function renderCounter(val: number) {
      if (!counterRef.current) return;
      if (val >= 100) {
        counterRef.current.textContent = "100";
        return;
      }
      const str = String(Math.round(val)).padStart(3, "0");
      let result = "";
      for (let i = 0; i < 3; i++) {
        result += Math.random() < 0.25
          ? chars[Math.floor(Math.random() * chars.length)]
          : str[i];
      }
      counterRef.current.textContent = result;
    }

    // ── Phase 2: snap to 100 and slide overlay away ──────────────────────
    function reveal() {
      if (revealScheduled) return;
      revealScheduled = true;

      // Ensure minimum display time for aesthetic purposes
      const elapsed = Date.now() - startTime;
      const delay = Math.max(0, MIN_DISPLAY_MS - elapsed) / 1000;

      gsap.killTweensOf(counter);

      const tl = gsap.timeline({
        delay,
        onComplete() {
          document.body.style.overflow = "";
          document.documentElement.removeAttribute("data-loading");
          // Signal to Hero and other components that the reveal is done
          window.dispatchEvent(new CustomEvent("intro:done"));
          setDone(true);
        },
      });

      // Snap counter to 100
      tl.to(counter, {
        value: 100,
        duration: 0.25,
        ease: "power2.in",
        onUpdate() { renderCounter(counter.value); },
      });

      // Brief pause at 100, then slide up
      tl.to(overlayRef.current, {
        yPercent: -100,
        duration: 0.55,
        ease: "power4.inOut",
      }, "+=0.08");
    }

    // ── Phase 1: crawl counter 0 → 90% while page loads ─────────────────
    // Duration is generous (4s max) — reveal() will interrupt it early
    // the moment window.load fires.
    gsap.to(counter, {
      value: 90,
      duration: 4,
      ease: "power1.out",
      onUpdate() { renderCounter(counter.value); },
      onComplete() {
        // Reached 90% but window hasn't loaded yet — just hold at 90
        // reveal() will be called by the load listener below
        if (windowLoaded) reveal();
      },
    });

    // ── Window load listener ─────────────────────────────────────────────
    function onWindowLoad() {
      windowLoaded = true;
      reveal();
    }

    if (windowLoaded) {
      // Already loaded by the time this effect ran (e.g. cached page)
      reveal();
    } else {
      window.addEventListener("load", onWindowLoad, { once: true });
    }

    return function cleanup() {
      window.removeEventListener("load", onWindowLoad);
      gsap.killTweensOf(counter);
      gsap.killTweensOf(overlayRef.current);
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
