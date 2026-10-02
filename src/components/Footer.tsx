"use client";

import { useEffect, useState } from "react";

/**
 * Footer — tiny one-line footer.
 * Left: copyright. Center: live IST clock. Right: back-to-top link.
 */
export function Footer() {
  const [time, setTime] = useState("");

  useEffect(function startClock() {
    function updateTime() {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }) + " IST"
      );
    }

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return function cleanup() { clearInterval(interval); };
  }, []);

  function handleBackToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer
      className="page-pad"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1.5rem 4vw",
        borderTop: "1px solid var(--line)",
        flexWrap: "wrap",
        gap: "1rem",
      }}
    >
      <div style={{ display: "flex", gap: "2rem", alignItems: "center", flexWrap: "wrap" }}>
        <span className="label-mono">© 2026 Aryan Rustagi</span>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <a href="https://github.com/Aryan-Rustagi" target="_blank" rel="noopener noreferrer" className="label-mono nav-link">GitHub ↗</a>
          <a href="https://linkedin.com/in/Aryan-Rustagi" target="_blank" rel="noopener noreferrer" className="label-mono nav-link">LinkedIn ↗</a>
        </div>
      </div>
      
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div style={{ width: "8px", height: "8px", backgroundColor: "#22c55e", borderRadius: "50%", boxShadow: "0 0 8px #22c55e" }} />
          <span className="label-mono" style={{ textTransform: "none" }}>Available for work</span>
        </div>
        <span className="label-mono" style={{ color: "var(--line)" }}>|</span>
        <span className="label-mono">{time}</span>
      </div>
      <button
        onClick={handleBackToTop}
        className="label-mono"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--muted)",
          padding: 0,
          fontFamily: "inherit",
          fontSize: "inherit",
          textTransform: "inherit",
          letterSpacing: "inherit",
        }}
      >
        Back to top ↑
      </button>
    </footer>
  );
}
