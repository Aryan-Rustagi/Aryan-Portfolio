import type { Metadata, Viewport } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { PageTransition } from "@/components/PageTransition";
import { CustomCursor } from "@/components/CustomCursor";
import { Analytics } from "@vercel/analytics/react";
/**
 * Display font — Inter Tight, weights 400–600.
 * Used for headings and body text throughout.
 */
const interTight = Inter_Tight({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

/**
 * Mono font — JetBrains Mono, weight 400.
 * Used for tiny uppercase labels and the intro counter.
 */
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Aryan Rustagi — Full Stack Developer",
  description:
    "Portfolio of Aryan Rustagi. CS student and full-stack developer specializing in React, Node.js, and resilient systems architecture.",
  authors: [{ name: "Aryan Rustagi" }],
  keywords: ["Aryan Rustagi", "Full Stack Developer", "Software Engineer", "React", "Node.js", "Portfolio"],
  openGraph: {
    title: "Aryan Rustagi — Full Stack Developer",
    description: "CS student and full-stack developer specializing in resilient systems architecture.",
    url: "https://aryanrustagi.com",
    siteName: "Aryan Rustagi Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aryan Rustagi — Full Stack Developer",
    description: "CS student and full-stack developer specializing in resilient systems architecture.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${interTight.variable} ${jetbrainsMono.variable}`}>
        <CustomCursor />
        <PageTransition>{children}</PageTransition>
        <Analytics />
      </body>
    </html>
  );
}
