"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/gsapUtils";

/**
 * RevealText — fades up a paragraph on scroll-enter.
 * opacity:0, y:30 → opacity:1, y:0. Duration 0.8s.
 */
export function RevealText({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(function initReveal() {
    gsap.registerPlugin(ScrollTrigger);

    if (prefersReducedMotion()) {
      gsap.set(ref.current, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(function () {
      gsap.fromTo(ref.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    }, ref);

    return function cleanup() { ctx.revert(); };
  }, [delay]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
