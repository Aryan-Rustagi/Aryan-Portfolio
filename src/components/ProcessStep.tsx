"use client";

import { RevealImage } from "@/components/RevealImage";
import { RevealText } from "@/components/RevealText";

/**
 * ProcessStep — one numbered block (01–04) in the process section.
 * Large number, title, paragraph, and a RevealImage.
 * Alternating layout: odd steps image-left, even steps image-right.
 */
export function ProcessStep({
  number,
  title,
  description,
  image,
  reverse = false,
}: {
  number: string;
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "4rem",
        alignItems: "center",
        direction: reverse ? "rtl" : "ltr",
        marginBottom: "5rem",
      }}
    >
      {/* Image side */}
      <div style={{ direction: "ltr" }}>
        <RevealImage
          src={image}
          alt={`Step ${number}: ${title}`}
          width={800}
          height={600}
          parallax
        />
      </div>

      {/* Text side */}
      <div style={{ direction: "ltr" }}>
        <RevealText>
          <span
            className="heading-display"
            style={{ fontSize: "clamp(4rem, 10vw, 8rem)", display: "block", color: "var(--line)" }}
          >
            {number}
          </span>
          <span
            className="heading-display"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", display: "block", marginTop: "1rem" }}
          >
            {title}
          </span>
          <p className="body-text" style={{ marginTop: "1.5rem" }}>
            {description}
          </p>
        </RevealText>
      </div>
    </div>
  );
}
