# Aryan Rustagi
**Full-Stack Software Engineer**
**Location:** India | **Email:** [Your Email] | **LinkedIn:** linkedin.com/in/Aryan-Rustagi | **GitHub:** github.com/Aryan-Rustagi

## SUMMARY
2nd-year CS student at JECRC University specializing in backend-heavy web applications and resilient systems architecture. Proven track record of engineering fault-tolerant APIs, implementing complex fallback strategies, and building scalable full-stack applications using React, Node.js, and MongoDB. Open-source contributor to enterprise-grade Java frameworks.

## SKILLS
* **Languages:** JavaScript, TypeScript, Java, C++, Python
* **Frontend:** React.js, Next.js, Vite, Tailwind CSS, Framer Motion
* **Backend:** Node.js, Express.js, RESTful APIs, WebSockets (Socket.IO), JWT Auth
* **Databases:** MongoDB, Mongoose, PostgreSQL, Redis
* **DevOps & Tools:** Docker, Docker Compose, Linux, Git, Vercel, Render
* **AI Integration:** Groq API, Llama 3.1, OpenAI, Gemini

## EXPERIENCE & OPEN SOURCE
**Zerocode Java Framework** | *Open Source Contributor*
* Engineered and successfully merged PR #796 into the core enterprise Java framework.
* Collaborated with senior maintainers to resolve critical framework issues, adhering to strict enterprise coding standards and CI/CD checks.

## TECHNICAL PROJECTS
**Safar Setu (GuardianGo)** | *Core Developer (SIH 2026 National Hackathon)* | *Node.js, Express, Socket.IO, React*
* **Architecture:** Built a mission-critical SOS network for tourists featuring a zero-dependency SMS-to-WebSocket bridge. Offline clients encode dense payloads via native SMS URIs, which a backend webhook parses and emits as real-time Socket.IO events to dispatchers.
* **Failover Engineering:** Engineered a Unified Hybrid AI Dispatcher that dynamically rotates LLMs on failure with a deterministic regex fallback, alongside an Overpass API failover system for geofencing.
* **Impact:** Achieved sub-second alert delivery and mathematically guaranteed 100% uptime during the Smart India Hackathon, completely mitigating API rate-limits and data dropouts.

**Stock Analyzer** | *Solo Developer* | *Next.js, Node.js, Groq API, Docker*
* **Architecture:** Engineered a robust 3-tier sequential API failover pipeline (Finnhub → Alpha Vantage → Twelve Data) that automatically falls back on non-2xx status codes or malformed JSON payloads.
* **Performance:** Mitigated severe rate limits by building a custom, lazy-evaluated in-memory TTL caching system using Node.js Maps—caching live quotes for 1 minute and heavy historical payloads for 5 minutes.
* **Impact:** Virtually eliminated external API downtime. Integrated the Groq API with Llama 3.1 for lightning-fast market sentiment synthesis and containerized the entire stack with Docker Compose for zero-config deployment.

**Ranjans Ayurveda Platform** | *Full-Stack Architect* | *MERN Stack, Vite, JWT*
* **Architecture:** Architected a dual-portal MERN monorepo featuring decoupled Express.js API gateways for patients and administrators, ensuring high security and independent scaling. 
* **Database Design:** Modeled the MongoDB schema using Domain-Driven Design to reflect complex real-world Ayurvedic workflows (e.g., cross-branch scheduling, dietary notes, and therapy tracking).
* **Impact:** Delivered a highly secure, unified digital clinic management platform orchestrated with Infrastructure-as-Code (`render.yaml`) for seamless deployment across 4 distinct microservices.

## EDUCATION
**JECRC University** 
*B.Tech in Computer Science and Engineering* (Expected Graduation: 2028)
* **Relevant Coursework:** Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems.
