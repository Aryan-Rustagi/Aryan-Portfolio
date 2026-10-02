"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * SmoothScroll — initializes Lenis smooth scrolling,
 * syncs with GSAP ScrollTrigger via the ticker.
 * Wraps the entire app.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(function initLenis() {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: function (t: number) {
        return Math.min(1, 1.001 - Math.pow(2, -10 * t));
      },
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add(function onTick(time: number) {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return function cleanup() {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
