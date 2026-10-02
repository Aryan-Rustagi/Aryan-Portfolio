"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/gsapUtils";
import { personalInfo } from "@/data/portfolio";
import { ScrollCue } from "@/components/ScrollCue";

/**
 * Hero — "ARYAN / RUSTAGI" at giant scale.
 * Small mono labels around edges: role, location, availability.
 * No buttons. Scroll cue is a thin animated accent line.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(function initHeroReveal() {
    const ctx = gsap.context(function () {
      if (prefersReducedMotion()) {
        gsap.set(".hero-line-inner", { y: 0, opacity: 1 });
        gsap.set(metaRef.current, { opacity: 1 });
        return;
      }

      gsap.fromTo(".hero-line-inner",
        { y: "110%", opacity: 0 },
        {
          y: "0%", opacity: 1,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.08,
          delay: 1.8,
        }
      );

      gsap.fromTo(metaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 2.1 }
      );
    }, sectionRef);

    return function cleanup() { ctx.revert(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="page-pad"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        paddingBottom: "4vh",
        paddingTop: "80px",
      }}
    >
      {/* Giant name */}
      <h1
        className="heading-display"
        style={{ fontSize: "clamp(6.5rem, 24vw, 22rem)", lineHeight: 0.85, letterSpacing: "-0.05em" }}
      >
        <span className="line-mask">
          <span className="line-mask-inner hero-line-inner" style={{ opacity: 0 }}>ARYAN</span>
        </span>
        <span className="line-mask" style={{ textAlign: "right", paddingLeft: "5%" }}>
          <span className="line-mask-inner hero-line-inner" style={{ opacity: 0 }}>RUSTAGI</span>
        </span>
      </h1>

      {/* Bottom meta row */}
      <div
        ref={metaRef}
        style={{
          opacity: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginTop: "2.5rem",
          flexWrap: "wrap",
          gap: "1.5rem",
        }}
      >
        <span className="label-mono">{personalInfo.role}</span>
        <span className="label-mono">{personalInfo.location}</span>
        <span className="label-mono" style={{ color: "var(--accent)" }}>
          {personalInfo.availability}
        </span>
      </div>

      {/* Scroll cue */}
      <ScrollCue />
    </section>
  );
}
