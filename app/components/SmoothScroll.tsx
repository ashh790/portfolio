"use client";
// Imported from the package's actual file path rather than the "lenis/react" exports-map
// shorthand: this project's tsconfig uses the legacy "node" moduleResolution, which does
// not understand package.json "exports" maps (that needs "node16"/"nodenext"/"bundler",
// none of which this TypeScript 4.9 install supports) — the shorthand type-checks fine at
// runtime (webpack resolves it correctly) but fails `tsc`'s stricter resolution during
// `next build`. The direct path is the same module and resolves under both.
import { ReactLenis, useLenis } from "lenis/dist/lenis-react";
import { ReactNode, useEffect } from "react";

// Height of the sticky nav bar, so an anchor scroll stops with the section just below
// it instead of landing flush at the very top (hidden behind the bar).
const HEADER_OFFSET = 68;

// Lenis ships an `anchors` option that computes the right scroll target for a clicked
// `#hash` link — but (confirmed by reading node_modules/lenis/dist/lenis.mjs) its click
// handler never calls preventDefault(). The browser's native, instant jump-to-fragment
// still fires in parallel, wins the race, ignores our header offset, and leaves Lenis's
// own in-flight animation fighting a scroll position it didn't set — which is exactly
// the double-jump / wrong-landing-spot behavior this was built to fix. So this is the
// one place in the app that owns in-page anchor navigation: it prevents the native jump
// and drives the scroll through Lenis alone, so only one thing ever moves the scroll.
const AnchorScroll = () => {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href")?.slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target, { offset: -HEADER_OFFSET });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [lenis]);

  return null;
};

// Wraps the whole page in Lenis's smooth, inertial scroll.
const SmoothScroll = ({ children }: { children: ReactNode }) => {
  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      <AnchorScroll />
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;
