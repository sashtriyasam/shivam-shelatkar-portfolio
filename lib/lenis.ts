import Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function initLenis(): void {
  if (typeof window === "undefined" || lenisInstance) return;
  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  function raf(time: number) {
    lenisInstance?.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}
