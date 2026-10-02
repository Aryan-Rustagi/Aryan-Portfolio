"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/gsapUtils";
import type { Project } from "@/data/portfolio";

/**
 * ProjectRow — one horizontal row: number, title, year, stack, arrow.
 * Borders top+bottom. Hover shows cursor-following image preview.
 * Click navigates to /projects/[slug].
 */
export function ProjectRow({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(function initRowReveal() {
    gsap.registerPlugin(ScrollTrigger);

    if (prefersReducedMotion()) {
      gsap.set(rowRef.current, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(function () {
      gsap.fromTo(rowRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rowRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }, rowRef);

    return function cleanup() { ctx.revert(); };
  }, []);

  /* Cursor-follow image with lerp */
  useEffect(function trackMouse() {
    if (!hovered || !imgRef.current) return;

    const pos = { x: 0, y: 0 };

    function animate() {
      pos.x += (mouse.current.x - pos.x) * 0.1;
      pos.y += (mouse.current.y - pos.y) * 0.1;
      if (imgRef.current) {
        imgRef.current.style.left = pos.x + "px";
        imgRef.current.style.top = pos.y + "px";
      }
      raf.current = requestAnimationFrame(animate);
    }

    raf.current = requestAnimationFrame(animate);
    return function stop() { cancelAnimationFrame(raf.current); };
  }, [hovered]);

  const [detailsOpen, setDetailsOpen] = useState(false);

  function handleMouseMove(e: React.MouseEvent) {
    mouse.current = { x: e.clientX - 200, y: e.clientY - 130 };
  }

  const num = String(index + 1).padStart(2, "0");

  return (
    <>
      {project.image && (
        <div
          ref={imgRef}
          className={`project-row-image ${hovered && !detailsOpen ? "visible" : ""}`}
          aria-hidden="true"
        >
          <Image src={project.image} alt="" width={400} height={260} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
        </div>
      )}

      <div
        ref={rowRef}
        className="project-row"
        style={{ opacity: 0, flexDirection: "column", alignItems: "stretch", paddingBottom: detailsOpen ? "4rem" : "2.5rem", cursor: "default" }}
        onMouseLeave={function () { setHovered(false); }}
      >
        <div 
          style={{ display: "flex", alignItems: "baseline", gap: "1.5rem", width: "100%", cursor: "pointer" }}
          onClick={function () { setDetailsOpen(!detailsOpen); }}
          onMouseMove={handleMouseMove}
          onMouseEnter={function () { setHovered(true); }}
        >
          <span className="label-mono" style={{ minWidth: "3ch", flexShrink: 0 }}>{num}</span>
          <span className="heading-display project-row-title" style={{ fontSize: "clamp(1.5rem, 4vw, 3.5rem)", flex: 1 }}>
            {project.title}
          </span>
          <span className="label-mono hidden md:block" style={{ flexShrink: 0 }}>
            {project.stack.slice(0, 3).join(" / ")}
          </span>
          <span className="label-mono" style={{ flexShrink: 0 }}>{project.year}</span>
          <span className="project-row-arrow" style={{ fontSize: "1.25rem", transform: detailsOpen ? "rotate(90deg)" : "none" }}>
            {detailsOpen ? "↓" : "↗"}
          </span>
        </div>

        {detailsOpen && (
          <div style={{ marginTop: "4rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "3rem", cursor: "default" }}>
            <div>
              <span className="label-mono" style={{ display: "block", marginBottom: "1rem" }}>The Problem</span>
              <p className="body-text" style={{ fontSize: "1rem" }}>{project.problem}</p>
            </div>
            <div>
              <span className="label-mono" style={{ display: "block", marginBottom: "1rem" }}>The Architecture</span>
              <p className="body-text" style={{ fontSize: "1rem" }}>{project.solution}</p>
            </div>
            <div>
              <span className="label-mono" style={{ display: "block", marginBottom: "1rem" }}>The Result</span>
              <p className="body-text" style={{ fontSize: "1rem" }}>{project.result}</p>
              
              <div style={{ marginTop: "2.5rem", display: "flex", gap: "1.5rem" }}>
                {project.links.live && (
                  <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="label-mono nav-link" style={{ borderBottom: "1px solid var(--accent)", color: "var(--accent)" }}>
                    Live Site ↗
                  </a>
                )}
                {project.links.admin && (
                  <a href={project.links.admin} target="_blank" rel="noopener noreferrer" className="label-mono nav-link" style={{ borderBottom: "1px solid var(--fg)", color: "var(--fg)" }}>
                    Admin Portal ↗
                  </a>
                )}
                <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="label-mono nav-link" style={{ borderBottom: "1px solid var(--fg)", color: "var(--fg)" }}>
                  GitHub Repo ↗
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
