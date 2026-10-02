"use client";

/**
 * Separator — full-width 1px divider line.
 * Uses var(--line) color.
 */
export function Separator({ className = "" }: { className?: string }) {
  return <div className={`divider ${className}`} />;
}
