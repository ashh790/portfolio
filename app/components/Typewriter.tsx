"use client";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

type Phase = "type" | "hold" | "erase";

type TypewriterProps = {
  name: string;
  className?: string;
};

const TYPE_SPEED = 120;
const ERASE_SPEED = 70;
const HOLD_TIME = 1800;

// Types the name, holds, erases, and types it again in a loop — but only while it's
// actually on screen. Without this, the loop runs forever the moment the page loads,
// re-rendering every 70–120ms for as long as the tab stays open, no matter how far
// you've scrolled away from it — a constant, pointless drain on the main thread that
// competes with Lenis's own scroll work and shows up as jank anywhere on the page.
const Typewriter = ({ name, className = "" }: TypewriterProps) => {
  const [phase, setPhase] = useState<Phase>("type");
  const [text, setText] = useState("");
  const [visible, setVisible] = useState(false);
  const elementRef = useRef<HTMLHeadingElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: "200px 0px",
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setText(name);
      return;
    }
    if (!visible) return;

    let timer: ReturnType<typeof setTimeout> | undefined;

    switch (phase) {
      case "type":
        if (text.length < name.length) {
          timer = setTimeout(() => setText(name.slice(0, text.length + 1)), TYPE_SPEED);
        } else {
          setPhase("hold");
        }
        break;

      case "hold":
        timer = setTimeout(() => setPhase("erase"), HOLD_TIME);
        break;

      case "erase":
        if (text.length > 0) {
          timer = setTimeout(() => setText(text.slice(0, -1)), ERASE_SPEED);
        } else {
          setPhase("type");
        }
        break;
    }

    return () => clearTimeout(timer);
  }, [visible, phase, text, name, reducedMotion]);

  // Index just past the first word's space, e.g. "ASHRAF DALAL" -> 7.
  const firstWordEnd = name.indexOf(" ") + 1;

  return (
    <h1 ref={elementRef} aria-label={name} className={className}>
      {/* First word white, the rest red (same split as the hello line) */}
      <span aria-hidden="true" className="text-white">
        {text.slice(0, firstWordEnd)}
      </span>
      <span aria-hidden="true" className="text-[#d92525]">
        {text.slice(firstWordEnd)}
      </span>
      {!reducedMotion && (
        <span
          aria-hidden="true"
          className="ml-1 inline-block h-[0.72em] w-[4px] animate-pulse bg-[#d92525] align-baseline"
        />
      )}
    </h1>
  );
};

export default Typewriter;
