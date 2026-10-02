import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SelectedWork } from "@/components/SelectedWork";
import { PageTransition } from "@/components/PageTransition";

export default function ProjectsPage() {
  return (
    <SmoothScroll>
      <Navbar />
      <PageTransition>
        <main style={{ paddingTop: "80px", minHeight: "80vh" }}>
          <SelectedWork />
        </main>
      </PageTransition>
      <Footer />
    </SmoothScroll>
  );
}
