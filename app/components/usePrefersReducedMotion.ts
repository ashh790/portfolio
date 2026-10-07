"use client";
import { useEffect, useState } from "react";

// Respects the OS-level "reduce motion" setting so looping/animated components
// (Typewriter, FlipText, Reveal) can skip their animation and just render the
// final state directly.
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mediaQuery.matches);

    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
