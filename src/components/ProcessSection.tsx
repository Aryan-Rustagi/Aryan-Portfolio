"use client";

import { SplitHeading } from "@/components/SplitHeading";
import { ProcessStep } from "@/components/ProcessStep";
import { processSteps } from "@/data/process";

/**
 * ProcessSection — "MY / PROCESS" title.
 * Four numbered blocks 01–04 with alternating layout.
 */
export function ProcessSection() {
  return (
    <section className="page-pad section-pad">
      <SplitHeading line1="MY" line2="PROCESS" />

      <div style={{ marginTop: "4rem" }}>
        {processSteps.map(function renderStep(step, i) {
          return (
            <ProcessStep
              key={step.number}
              number={step.number}
              title={step.title}
              description={step.description}
              image={step.image}
              reverse={i % 2 !== 0}
            />
          );
        })}
      </div>
    </section>
  );
}
