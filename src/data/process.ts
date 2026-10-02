/**
 * Process steps for the "MY / PROCESS" section.
 * Four numbered blocks describing the dev workflow.
 */
export const processSteps = [
  {
    number: "01",
    title: "PLAN",
    description:
      "Requirements gathering, data modelling, API endpoint design, and database schema planning. Everything starts on paper before a single line of code.",
    image: "/images/process-01-v2.jpg",
  },
  {
    number: "02",
    title: "BUILD",
    description:
      "Frontend components in React, backend routes in Express, database queries in MongoDB or PostgreSQL. Clean separation between client and server from day one.",
    image: "/images/process-02-v2.jpg",
  },
  {
    number: "03",
    title: "SHIP",
    description:
      "Dockerized deployments, CI/CD pipelines, staging environments on Vercel, Render, or Railway. Production readiness is not an afterthought.",
    image: "/images/process-03-v2.jpg",
  },
  {
    number: "04",
    title: "ITERATE",
    description:
      "Load testing, error monitoring, client feedback loops. Ship fast, measure, fix what breaks, repeat.",
    image: "/images/process-04-v2.jpg",
  },
];
