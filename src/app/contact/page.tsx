"use client";

import { useState } from "react";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";
import { PageTransition } from "@/components/PageTransition";
import { SplitHeading } from "@/components/SplitHeading";
import { RevealText } from "@/components/RevealText";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  return (
    <SmoothScroll>
      <Navbar />
      <PageTransition>
        <main style={{ paddingTop: "80px" }}>
          <section className="page-pad section-pad">
            <SplitHeading line1="LET'S" line2="CONNECT" />
            
            <div style={{ marginTop: "6rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem" }}>
              <RevealText>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "600px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <label htmlFor="name" className="label-mono" style={{ color: "var(--fg)" }}>Name</label>
                    <input type="text" id="name" required style={{ border: "none", borderBottom: "1px solid var(--line)", background: "transparent", padding: "0.75rem 0", color: "var(--fg)", fontSize: "1rem", outline: "none" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <label htmlFor="email" className="label-mono" style={{ color: "var(--fg)" }}>Email</label>
                    <input type="email" id="email" required style={{ border: "none", borderBottom: "1px solid var(--line)", background: "transparent", padding: "0.75rem 0", color: "var(--fg)", fontSize: "1rem", outline: "none" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <label htmlFor="message" className="label-mono" style={{ color: "var(--fg)" }}>Message</label>
                    <textarea id="message" required rows={4} style={{ border: "none", borderBottom: "1px solid var(--line)", background: "transparent", padding: "0.75rem 0", color: "var(--fg)", fontSize: "1rem", outline: "none", resize: "vertical" }} />
                  </div>
                  <button type="submit" disabled={status === "submitting"} className="label-mono" style={{ alignSelf: "flex-start", marginTop: "1rem", background: "var(--fg)", color: "var(--bg)", border: "none", padding: "1rem 2rem", cursor: "pointer", transition: "opacity 0.2s" }}>
                    {status === "submitting" ? "SENDING..." : status === "success" ? "SENT!" : "SEND MESSAGE"}
                  </button>
                </form>
              </RevealText>
              
              <RevealText>
                <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                  <div>
                    <span className="label-mono" style={{ display: "block", marginBottom: "0.5rem", color: "var(--muted)" }}>Email</span>
                    <a href="mailto:aryanrustagi1234@gmail.com" className="body-text" style={{ color: "var(--fg)", textDecoration: "underline" }}>aryanrustagi1234@gmail.com</a>
                  </div>
                  <div>
                    <span className="label-mono" style={{ display: "block", marginBottom: "0.5rem", color: "var(--muted)" }}>Location</span>
                    <span className="body-text" style={{ color: "var(--fg)" }}>India</span>
                  </div>
                  <div>
                    <span className="label-mono" style={{ display: "block", marginBottom: "0.5rem", color: "var(--muted)" }}>Socials</span>
                    <div style={{ display: "flex", gap: "1.5rem" }}>
                      <a href="https://github.com/Aryan-Rustagi" target="_blank" rel="noreferrer" className="body-text" style={{ color: "var(--fg)", textDecoration: "underline" }}>GitHub</a>
                      <a href="https://linkedin.com/in/aryan-rustagi" target="_blank" rel="noreferrer" className="body-text" style={{ color: "var(--fg)", textDecoration: "underline" }}>LinkedIn</a>
                    </div>
                  </div>
                </div>
              </RevealText>
            </div>
          </section>
          <ContactSection />
        </main>
      </PageTransition>
      <Footer />
    </SmoothScroll>
  );
}
