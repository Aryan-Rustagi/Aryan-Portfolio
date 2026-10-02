"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/gsapUtils";
import Link from "next/link";
import { Magnetic } from "@/components/Magnetic";

/**
 * Navbar — fixed top bar. Text only, no icons.
 * Left: "ARYAN RUSTAGI" in mono.
 * Right: section links + "Resume ↗" with underline.
 * 1px bottom border. Fades in after intro completes.
 */

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/#work" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(function initNavReveal() {
    if (prefersReducedMotion()) {
      gsap.set(navRef.current, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(function () {
      gsap.fromTo(navRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power3.out", delay: 2.3 }
      );
    }, navRef);

    return function cleanup() { ctx.revert(); };
  }, []);

  return (
    <nav
      ref={navRef}
      className="page-pad"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "56px",
        opacity: 0,
        backgroundColor: "var(--bg)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <Magnetic intensity={0.2}>
        <Link
          href="/"
          className="label-mono"
          style={{ color: "var(--fg)", textDecoration: "none", fontWeight: 500 }}
        >
          Aryan Rustagi
        </Link>
      </Magnetic>

      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        {navLinks.map(function renderLink(link) {
          return (
            <Magnetic key={link.label} intensity={0.3}>
              <Link href={link.href} className="nav-link label-mono">
                {link.label}
              </Link>
            </Magnetic>
          );
        })}
        <Magnetic intensity={0.3}>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="label-mono"
            style={{
              color: "var(--fg)",
              textDecoration: "none",
              borderBottom: "1px solid var(--fg)",
              paddingBottom: "2px",
            }}
          >
            Resume ↗
          </a>
        </Magnetic>
      </div>
    </nav>
  );
}
