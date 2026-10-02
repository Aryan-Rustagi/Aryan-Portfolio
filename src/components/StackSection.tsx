"use client";

import { RevealText } from "@/components/RevealText";

/**
 * StackSection — plain text columns in mono.
 * Frontend / Backend / Database / DevOps / AI APIs.
 * No logos, no progress bars, no icons.
 */
const stacks = [
  {
    label: "Languages",
    items: ["JavaScript", "TypeScript", "Java", "C++", "Python"],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "Vite", "Tailwind CSS", "Framer Motion"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express", "REST APIs", "Socket.IO", "JWT"],
  },
  {
    label: "Database",
    items: ["MongoDB", "Mongoose", "PostgreSQL", "Redis"],
  },
  {
    label: "DevOps",
    items: ["Docker", "Docker Compose", "Linux", "Vercel", "Render"],
  },
  {
    label: "AI APIs",
    items: ["Groq", "Llama 3.1", "OpenAI", "Gemini"],
  },
];

export function StackSection() {
  return (
    <section className="page-pad section-pad">
      <RevealText>
        <span className="label-mono" style={{ display: "block", marginBottom: "3rem" }}>
          Stack
        </span>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "3rem",
          }}
        >
          {stacks.map(function renderColumn(col) {
            return (
              <div key={col.label}>
                <span
                  className="label-mono"
                  style={{ display: "block", marginBottom: "1rem", color: "var(--fg)" }}
                >
                  {col.label}
                </span>
                {col.items.map(function renderItem(item) {
                  return (
                    <span
                      key={item}
                      className="label-mono"
                      style={{
                        display: "block",
                        padding: "0.5rem 0",
                        borderBottom: "1px solid var(--line)",
                      }}
                    >
                      {item}
                    </span>
                  );
                })}
              </div>
            );
          })}
        </div>
      </RevealText>
    </section>
  );
}
