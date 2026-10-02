# Design Decisions

- **Typography**: Inter Tight for body/display, JetBrains Mono for metadata and labels.
- **Color Palette**: Off-white `#F4F2ED` background, `#111` for primary text. Accent `#FF4D17`.
- **Aesthetics**: Premium, minimal, architecture-studio language. Huge 2-line split headings, breathing room over decoration.
- **Animation**: GSAP + ScrollTrigger for scroll-based reveals (Slide up text, reveal images, etc.). Framer-motion for simple page entry transitions. Infinite CSS marquee for text strips.
- **Structure**: Next.js App router with static generation. Individual project pages dynamically built from `portfolio.ts` using `generateStaticParams`.
