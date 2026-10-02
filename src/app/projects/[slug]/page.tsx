import { projects } from "@/data/portfolio";
import { notFound } from "next/navigation";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProjectDetail } from "@/components/ProjectDetail";
import { NextProject } from "@/components/NextProject";
import { Separator } from "@/components/Separator";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Not Found" };
  return {
    title: `${project.title} — Aryan Rustagi`,
    description: project.tagline,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  
  if (currentIndex === -1) {
    notFound();
  }

  const project = projects[currentIndex];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <ProjectDetail project={project} />
        <Separator />
        <NextProject nextProject={nextProject} />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
