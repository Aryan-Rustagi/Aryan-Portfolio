import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Magnetic } from "@/components/Magnetic";
import { SmoothScroll } from "@/components/SmoothScroll";

export default function NotFound() {
  return (
    <SmoothScroll>
      <Navbar />
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "var(--bg)",
          padding: "0 5vw",
        }}
      >
        <h2
          className="heading-display"
          style={{
            fontSize: "clamp(3rem, 8vw, 6rem)",
            color: "var(--fg)",
            textAlign: "center",
            lineHeight: 1,
            margin: 0,
          }}
        >
          PAGE / <br /> MISSING
        </h2>
        <p className="label-mono" style={{ margin: "2rem 0", color: "var(--line)", textAlign: "center" }}>
          Error 404: The requested route could not be found.
        </p>
        <Magnetic intensity={0.2}>
          <Link
            href="/"
            className="label-mono"
            style={{
              color: "var(--accent)",
              textDecoration: "none",
              borderBottom: "1px solid var(--accent)",
              paddingBottom: "2px",
            }}
          >
            Return to Index ↗
          </Link>
        </Magnetic>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
