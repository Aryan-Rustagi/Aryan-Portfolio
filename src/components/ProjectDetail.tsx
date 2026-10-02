"use client";

import { RevealImage } from "@/components/RevealImage";
import { RevealText } from "@/components/RevealText";
import type { Project } from "@/data/portfolio";

/**
 * ProjectDetail — Full detail page content for a single project.
 * Hero image, metadata, problem -> solution -> result narrative.
 */
export function ProjectDetail({ project }: { project: Project }) {
  return (
    <article style={{ paddingBottom: "12vh" }}>
      {/* Hero Image */}
      <section className="page-pad" style={{ paddingTop: "120px" }}>
        <RevealImage
          src={project.image}
          alt={project.title}
          width={1600}
          height={900}
          priority
          parallax
          className="project-detail-hero"
        />
      </section>

      {/* Metadata row */}
      <section className="page-pad" style={{ marginTop: "4rem" }}>
        <RevealText>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "2rem",
              borderTop: "1px solid var(--line)",
              borderBottom: "1px solid var(--line)",
              padding: "2rem 0",
            }}
          >
            <div>
              <span className="label-mono" style={{ display: "block", marginBottom: "0.5rem" }}>Role</span>
              <span style={{ color: "var(--fg)" }}>{project.role}</span>
            </div>
            <div>
              <span className="label-mono" style={{ display: "block", marginBottom: "0.5rem" }}>Year</span>
              <span style={{ color: "var(--fg)" }}>{project.year}</span>
            </div>
            <div>
              <span className="label-mono" style={{ display: "block", marginBottom: "0.5rem" }}>Stack</span>
              <span style={{ color: "var(--fg)" }}>{project.stack.join(", ")}</span>
            </div>
            <div>
              <span className="label-mono" style={{ display: "block", marginBottom: "0.5rem" }}>Links</span>
              <div style={{ display: "flex", gap: "1rem" }}>
                {project.links.live && (
                  <a href={project.links.live} target="_blank" rel="noopener noreferrer" style={{ color: "var(--fg)", textDecoration: "underline" }}>Live Site</a>
                )}
                <a href={project.links.github} target="_blank" rel="noopener noreferrer" style={{ color: "var(--fg)", textDecoration: "underline" }}>GitHub</a>
              </div>
            </div>
          </div>
        </RevealText>
      </section>

      {/* Narrative */}
      <section className="page-pad section-pad">
        <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "6rem" }}>
          <RevealText>
            <span className="label-mono" style={{ display: "block", marginBottom: "1.5rem" }}>01 / The Problem</span>
            <p className="heading-display" style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", textTransform: "none", letterSpacing: "normal" }}>
              {project.problem}
            </p>
          </RevealText>
          
          <RevealText>
            <span className="label-mono" style={{ display: "block", marginBottom: "1.5rem" }}>02 / The Solution</span>
            <p className="body-text" style={{ maxWidth: "100%", fontSize: "clamp(1.125rem, 2vw, 1.25rem)" }}>
              {project.solution}
            </p>
          </RevealText>

          <RevealText>
            <span className="label-mono" style={{ display: "block", marginBottom: "1.5rem" }}>03 / The Result</span>
            <p className="body-text" style={{ maxWidth: "100%", fontSize: "clamp(1.125rem, 2vw, 1.25rem)" }}>
              {project.result}
            </p>
          </RevealText>
        </div>
      </section>
    </article>
  );
}
