import { SmoothScroll } from "@/components/SmoothScroll";
import { IntroLoader } from "@/components/IntroLoader";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Separator } from "@/components/Separator";
import { SelectedWork } from "@/components/SelectedWork";
import { ProcessSection } from "@/components/ProcessSection";
import { StackSection } from "@/components/StackSection";
import { Marquee } from "@/components/Marquee";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { DeveloperSection } from "@/components/DeveloperSection";

export default function Home() {
  return (
    <SmoothScroll>
      <IntroLoader />
      <Navbar />
      <main>
        <Hero />
        <Separator />
        <DeveloperSection />
        <Separator />
        <SelectedWork />
        <Separator />
        <ProcessSection />
        <Separator />
        <StackSection />
        <Marquee text="OPEN TO INTERNSHIPS — FREELANCE — COLLABORATIONS — " />
        <ContactSection />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
