"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/gsapUtils";

/**
 * SplitHeading — two-line uppercase title with scroll-reveal.
 * Each line sits in an overflow:hidden mask.
 * Inner span translates from 110% → 0%.
 * Second line right-aligned for editorial asymmetry.
 */
export function SplitHeading({
  line1,
  line2,
  className = "",
  as: Tag = "h2",
  indent = true,
  size = "clamp(3rem, 12vw, 14rem)",
}: {
  line1: string;
  line2: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
  indent?: boolean;
  size?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(function initReveal() {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(function () {
      const inners = ref.current?.querySelectorAll(".line-mask-inner");
      if (!inners) return;

      if (prefersReducedMotion()) {
        inners.forEach(function (el) { gsap.set(el, { y: 0 }); });
        return;
      }

      gsap.fromTo(inners,
        { y: "110%" },
        {
          y: "0%",
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, ref);

    return function cleanup() { ctx.revert(); };
  }, []);

  return (
    <div ref={ref} className={className}>
      <Tag className="heading-display" style={{ fontSize: size }}>
        <span className="line-mask">
          <span className="line-mask-inner">{line1}</span>
        </span>
        <span
          className="line-mask"
          style={{
            textAlign: indent ? "right" : "left",
            paddingLeft: indent ? "10%" : 0,
          }}
        >
          <span className="line-mask-inner">{line2}</span>
        </span>
      </Tag>
    </div>
  );
}
