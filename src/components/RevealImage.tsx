"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/gsapUtils";

/**
 * RevealImage — clip-path wipe + inner scale on scroll-enter.
 * Clips from inset(100% 0 0 0) → inset(0), image scales 1.15 → 1.
 * Duration 1.4s. No rounded corners, no shadow.
 */
export function RevealImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  parallax = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  parallax?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(function initImageReveal() {
    gsap.registerPlugin(ScrollTrigger);

    if (prefersReducedMotion()) return;

    const ctx = gsap.context(function () {
      const img = wrapRef.current?.querySelector("img");
      if (!img) return;

      const finalScale = parallax ? 1.1 : 1;
      
      gsap.set(wrapRef.current, { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(img, { scale: finalScale + 0.15 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      tl.to(wrapRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.4,
        ease: "power4.inOut",
      }).to(img, { scale: finalScale, duration: 1.4, ease: "power3.out" }, 0);

      if (parallax) {
        gsap.fromTo(img, 
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: wrapRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    }, wrapRef);

    return function cleanup() { ctx.revert(); };
  }, [parallax]);

  return (
    <div ref={wrapRef} className={`reveal-image-wrap ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 768px) 100vw, 60vw"
        priority={priority}
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
}
