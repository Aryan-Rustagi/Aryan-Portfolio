"use client";

import { RevealText } from "@/components/RevealText";
import type { Project } from "@/data/portfolio";
import Link from "next/link";

export function NextProject({ nextProject }: { nextProject: Project }) {
  return (
    <section className="page-pad section-pad" style={{ textAlign: "center" }}>
      <RevealText>
        <span className="label-mono" style={{ display: "block", marginBottom: "2rem" }}>
          Next Project
        </span>
        <Link 
          href={`/projects/${nextProject.slug}`} 
          className="heading-display"
          style={{ 
            fontSize: "clamp(3rem, 8vw, 10rem)", 
            color: "var(--fg)", 
            textDecoration: "none",
            display: "inline-block",
            transition: "opacity 0.3s ease"
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          {nextProject.title}
        </Link>
      </RevealText>
    </section>
  );
}
