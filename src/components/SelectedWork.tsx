"use client";

import { SplitHeading } from "@/components/SplitHeading";
import { ProjectRow } from "@/components/ProjectRow";
import { projects } from "@/data/portfolio";

/**
 * SelectedWork — "SELECTED / WORK" title.
 * Renders the top projects as horizontal rows.
 */
export function SelectedWork() {
  return (
    <section id="work" className="section-pad">
      <div className="page-pad">
        <SplitHeading line1="SELECTED" line2="WORK" />
      </div>

      <div style={{ marginTop: "6rem" }}>
        {projects.map(function renderProject(project, index) {
          return (
            <ProjectRow key={project.slug} project={project} index={index} />
          );
        })}
      </div>
    </section>
  );
}
