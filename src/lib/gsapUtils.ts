/**
 * Shared GSAP utilities.
 * Checks for reduced-motion preference before running animations.
 */

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
