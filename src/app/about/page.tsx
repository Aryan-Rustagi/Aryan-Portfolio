import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DeveloperSection } from "@/components/DeveloperSection";
import { StackSection } from "@/components/StackSection";
import { PageTransition } from "@/components/PageTransition";
import { personalInfo } from "@/data/portfolio";
import { RevealText } from "@/components/RevealText";

export default function AboutPage() {
  return (
    <SmoothScroll>
      <Navbar />
      <PageTransition>
        <main style={{ paddingTop: "80px", paddingBottom: "10vh" }}>
          <DeveloperSection />
          
          <section className="page-pad" style={{ marginTop: "4rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem" }}>
              <div>
                <RevealText>
                  <h2 className="heading-display" style={{ fontSize: "2rem", marginBottom: "2rem" }}>Education</h2>
                  {personalInfo.education.map((ed, i) => (
                    <div key={i} style={{ marginBottom: "1.5rem" }}>
                      <h3 className="label-mono" style={{ color: "var(--fg)", marginBottom: "0.25rem", fontSize: "1rem" }}>{ed.institution}</h3>
                      <p className="body-text" style={{ margin: 0, fontSize: "0.9rem" }}>{ed.program} | {ed.duration}</p>
                      {ed.note && <p className="body-text" style={{ margin: 0, fontSize: "0.9rem" }}>{ed.note}</p>}
                    </div>
                  ))}
                </RevealText>
              </div>
              
              <div>
                <RevealText>
                  <h2 className="heading-display" style={{ fontSize: "2rem", marginBottom: "2rem" }}>Achievements</h2>
                  <ul style={{ paddingLeft: "1.25rem" }}>
                    {personalInfo.achievements.map((ach, i) => (
                      <li key={i} className="body-text" style={{ marginBottom: "0.75rem" }}>{ach}</li>
                    ))}
                  </ul>
                </RevealText>
              </div>
            </div>
          </section>

          <StackSection />
        </main>
      </PageTransition>
      <Footer />
    </SmoothScroll>
  );
}
