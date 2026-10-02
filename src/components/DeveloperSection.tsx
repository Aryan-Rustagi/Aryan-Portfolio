"use client";

import { SplitHeading } from "@/components/SplitHeading";
import { RevealText } from "@/components/RevealText";
import { RevealImage } from "@/components/RevealImage";
import { personalInfo } from "@/data/portfolio";
import { Magnetic } from "@/components/Magnetic";

/**
 * DeveloperSection — "THE / DEVELOPER" title.
 * Short bio on the left, large portrait image on the right.
 * Link: "More about me ↗"
 */
export function DeveloperSection() {
  return (
    <section id="about" className="page-pad section-pad">
      <SplitHeading line1="THE" line2="DEVELOPER" />

      <div style={{ marginTop: "6rem", maxWidth: "75ch", marginInline: "auto", textAlign: "center" }}>
        {/* Text side */}
        <RevealText>
          <span className="label-mono" style={{ display: "block", marginBottom: "2rem" }}>
            About
          </span>
          {personalInfo.bio.map(function renderParagraph(p, i) {
            return (
              <p 
                key={i} 
                style={{ 
                  fontFamily: "var(--font-display), system-ui, sans-serif",
                  fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                  lineHeight: 1.3,
                  color: "var(--fg)",
                  marginBottom: "2rem",
                  letterSpacing: "-0.02em"
                }}
              >
                {p}
              </p>
            );
          })}
          <Magnetic intensity={0.2}>
            <a
              href="/about"
              className="label-mono"
              style={{
                color: "var(--fg)",
                textDecoration: "none",
                borderBottom: "1px solid var(--fg)",
                paddingBottom: "2px",
                marginTop: "1.5rem",
                display: "inline-block",
              }}
            >
              More about me ↗
            </a>
          </Magnetic>
        </RevealText>
      </div>
    </section>
  );
}
