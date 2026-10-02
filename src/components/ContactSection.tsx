"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/gsapUtils";
import { personalInfo } from "@/data/portfolio";
import { Magnetic } from "@/components/Magnetic";

/**
 * ContactSection — dark section with giant clickable email,
 * then GitHub / LinkedIn / Resume as underlined text links.
 * One of the 3 accent uses on the page (email link).
 */
export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(function initContactReveal() {
    gsap.registerPlugin(ScrollTrigger);

    if (prefersReducedMotion()) return;

    const ctx = gsap.context(function () {
      const inners = sectionRef.current?.querySelectorAll(".contact-reveal");
      if (!inners) return;

      gsap.fromTo(inners,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return function cleanup() { ctx.revert(); };
  }, []);

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  function handleCopy(text: string, type: "email" | "phone", e: React.MouseEvent) {
    e.preventDefault();
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-dark section-pad page-pad"
    >
      <span className="label-mono contact-reveal" style={{ display: "block", marginBottom: "2rem", opacity: 0 }}>
        Get in touch
      </span>

      {/* Giant email */}
      <a
        href={`mailto:${personalInfo.email}`}
        onClick={(e) => handleCopy(personalInfo.email, "email", e)}
        className="heading-display contact-reveal"
        style={{
          fontSize: "clamp(1.25rem, 4vw, 3.5rem)",
          color: "var(--accent)",
          textDecoration: "none",
          display: "block",
          lineHeight: 1.1,
          opacity: 0,
          overflowWrap: "anywhere",
          cursor: "pointer"
        }}
      >
        {copiedEmail ? "Email Copied!" : personalInfo.email}
      </a>

      {/* Giant phone */}
      <a
        href="tel:+918580799610"
        onClick={(e) => handleCopy("+91 8580799610", "phone", e)}
        className="heading-display contact-reveal"
        style={{
          fontSize: "clamp(1.25rem, 4vw, 3.5rem)",
          color: "var(--fg-dark)",
          textDecoration: "none",
          display: "block",
          lineHeight: 1.1,
          opacity: 0,
          marginTop: "1rem",
          cursor: "pointer"
        }}
      >
        {copiedPhone ? "Number Copied!" : "+91 8580799610"}
      </a>

      {/* Divider */}
      <div className="divider" style={{ margin: "4rem 0" }} />

      {/* Social links */}
      <div
        className="contact-reveal"
        style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap", opacity: 0 }}
      >
        <Magnetic intensity={0.3}>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="label-mono"
            style={{
              color: "var(--fg-dark)",
              textDecoration: "none",
              borderBottom: "1px solid rgba(244,242,237,0.3)",
              paddingBottom: "2px",
            }}
          >
            Github ↗
          </a>
        </Magnetic>
        <Magnetic intensity={0.3}>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="label-mono"
            style={{
              color: "var(--fg-dark)",
              textDecoration: "none",
              borderBottom: "1px solid rgba(244,242,237,0.3)",
              paddingBottom: "2px",
            }}
          >
            LinkedIn ↗
          </a>
        </Magnetic>
        <Magnetic intensity={0.3}>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="label-mono"
            style={{
              color: "var(--fg-dark)",
              textDecoration: "none",
              borderBottom: "1px solid rgba(244,242,237,0.3)",
              paddingBottom: "2px",
            }}
          >
            Resume ↗
          </a>
        </Magnetic>
      </div>
    </section>
  );
}
