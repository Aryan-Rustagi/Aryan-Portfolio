/**
 * Project data for the portfolio.
 * Each project has a slug for routing, display info,
 * and content for the detail page.
 */

export interface Project {
  slug: string;
  title: string;
  year: string;
  stack: string[];
  tagline: string;
  role: string;
  problem: string;
  solution: string;
  result: string;
  image: string;
  links: {
    live?: string;
    admin?: string;
    github: string;
  };
}

export const projects: Project[] = [
  {
    slug: "guardian-go",
    title: "Guardian Go",
    year: "2026",
    stack: ["React", "Node.js", "Express", "MongoDB", "Socket.IO", "JWT"],
    tagline: "Real-time tourist emergency dispatch network",
    role: "Core Developer — SIH 2026 National Hackathon",
    problem:
      "Building a mission-critical SOS network for tourists meant tackling extreme unreliability: poor mobile data in remote areas, flaky third-party APIs, and zero tolerance for downtime.",
    solution:
      "Engineered a zero-dependency SMS-to-WebSocket bridge. Offline clients encode dense payloads (ID|LAT|LNG) via native SMS URIs, which a backend webhook parses and emits as real-time Socket.IO events to dispatchers. Built a Unified Hybrid AI Dispatcher that dynamically rotates LLMs on failure (with a deterministic regex fallback) and an Overpass API failover system for geofencing.",
    result:
      "Achieved sub-second alert delivery and mathematically guaranteed 100% uptime during the Smart India Hackathon 2026, regardless of API rate-limits or data dropouts.",
    image: "/images/projects/guardian-go.png",
    links: {
      live: "https://tourist-safety-client.onrender.com/",
      admin: "https://tourist-safety-client.onrender.com/dashboard",
      github: "https://github.com/Aryan-Rustagi/guardiango",
    },
  },
  {
    slug: "stock-analyzer",
    title: "Stock Analyzer",
    year: "2026",
    stack: ["React", "Vite", "Node.js", "Express", "MongoDB", "Groq API", "Docker"],
    tagline: "Multi-provider API fallback with AI-powered insights",
    role: "Solo Developer",
    problem:
      "Retail investors lack a unified platform merging live market data with plain-English sentiment analysis. Furthermore, free financial APIs are notoriously unreliable and aggressively rate-limited.",
    solution:
      "Engineered a robust 3-tier sequential API failover pipeline (Finnhub → Alpha Vantage → Twelve Data) that automatically falls back on non-2xx status codes or malformed JSON. To mitigate rate limits, I built a custom lazy-evaluated in-memory TTL caching system using Node.js Maps—caching live quotes for 1 minute and heavy historical candlestick payloads for 5 minutes.",
    result:
      "Virtually eliminated external API downtime and rate-limit blocks. Integrated the Groq API with Llama 3.1 for lightning-fast market sentiment synthesis, and containerized the entire stack with Docker Compose for zero-config deployment.",
    image: "/images/projects/stock-analyzer.png",
    links: {
      live: "https://stock-analyzer-mvyi.onrender.com",
      github: "https://github.com/Aryan-Rustagi/stock-analyzer",
    },
  },

  {
    slug: "ranjans-ayurveda",
    title: "Ranjans Ayurveda",
    year: "2026",
    stack: ["React", "Node.js", "Express", "MongoDB", "Vite", "JWT"],
    tagline: "Comprehensive Ayurvedic Clinic Management Platform",
    role: "Full-Stack Architect",
    problem:
      "Traditional clinics struggle with scattered paper records and scheduling conflicts across multiple branches, leading to a disjointed patient experience for specialized therapies like Panchakarma.",
    solution:
      "Architected a dual-portal MERN monorepo (Customer UI & Admin Dashboard). Decoupled patient-facing features from administrative tools with independent Express.js API gateways, ensuring operations scale and fail independently. Modeled the MongoDB schema using Domain-Driven Design to reflect real-world Ayurvedic workflows.",
    result:
      "Delivered a highly secure, unified digital platform orchestrated with Infrastructure-as-Code (render.yaml) for seamless deployment across 4 microservices.",
    image: "/images/projects/ranjan-ayurveda.png",
    links: {
      live: "https://ranjan-ayurveda.onrender.com",
      admin: "https://ranjan-ayurveda-admin.onrender.com/#dashboard",
      github: "https://github.com/Aryan-Rustagi",
    },
  },
];

export const personalInfo = {
  name: "Aryan Rustagi",
  role: "Full-Stack Developer",
  location: "India",
  availability: "Available 2026",
  email: "aryanrustagi1234@gmail.com",
  github: "https://github.com/Aryan-Rustagi",
  linkedin: "https://linkedin.com/in/aryan-rustagi",
  bio: [
    "2nd-year CS student at JECRC University. I build backend-heavy web applications with React, Node.js, MongoDB, and PostgreSQL.",
    "I focus on fault-tolerant APIs, clean architecture, and shipping systems that survive production. Not interested in pixel polish — interested in software that works.",
  ],
  education: [
    {
      institution: "JECRC University, Jaipur",
      program: "B.Tech Computer Science (Kalvium)",
      duration: "2025 – 2029",
      note: "CGPA 8.73 / 10.00",
    },
    {
      institution: "M.D. Memorial Public School, Delhi",
      program: "12th Grade",
      duration: "2024",
      note: "",
    },
    {
      institution: "Sacred Heart Sr. Sec. School, Dharamshala",
      program: "10th Grade",
      duration: "2022",
      note: "",
    },
  ],
  achievements: [
    "Core Developer — Smart India Hackathon 2026",
    "Open Source Contributor — Zerocode Java Framework (PR #796 merged)",
    "3rd Place — Code Hunt 2025",
  ],
};
