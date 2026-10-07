"use client";
import { Fragment } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

// Each letter's up-slide (HALF) finishes before its copy slides in from below.
const HALF = 0.2;
const STAGGER = 0.025;

type FlipTextProps = {
  text: string;
  as: "h4" | "p";
  className?: string;
  // Optional color (or other classes) per word, in the same order as the words in `text`.
  wordClassNames?: string[];
};

// Reveal-links flip (from hover.dev): each letter slides up and a copy of it slides in
// from below. It plays each time the text scrolls into view. Words stay whole so long
// lines still wrap normally.
const FlipText = ({ text, as, className = "", wordClassNames = [] }: FlipTextProps) => {
  const reducedMotion = usePrefersReducedMotion();
  const words = text.split(" ");

  if (reducedMotion) {
    const PlainWrapper = as === "h4" ? "h4" : "p";
    return (
      <PlainWrapper className={className}>
        {words.map((word, w) => (
          <span key={w} className={wordClassNames[w] ?? ""}>
            {word}
            {w < words.length - 1 && " "}
          </span>
        ))}
      </PlainWrapper>
    );
  }

  const Wrapper = as === "h4" ? motion.h4 : motion.p;

  let letterIndex = 0;

  // Forward (hovered): the original slides up, then the copy slides in from below.
  // Reverse (initial, when scrolled out of view): the copy slides down first, then the
  // original returns, so the two copies never show at the same time.
  const renderLetters = (word: string, position: "top" | "bottom") =>
    word.split("").map((letter) => {
      const i = letterIndex++;
      const delay = STAGGER * i;
      const isTop = position === "top";
      return (
        <motion.span
          key={`${position}-${i}`}
          variants={{
            initial: {
              y: isTop ? 0 : "100%",
              transition: {
                duration: HALF,
                ease: "easeIn",
                delay: isTop ? HALF + delay : delay,
              },
            },
            hovered: {
              y: isTop ? "-100%" : 0,
              transition: {
                duration: HALF,
                ease: isTop ? "easeIn" : "easeOut",
                delay: isTop ? delay : HALF + delay,
              },
            },
          }}
          className="inline-block"
        >
          {letter}
        </motion.span>
      );
    });

  return (
    <Wrapper
      initial="initial"
      whileInView="hovered"
      viewport={{ amount: 0.5 }}
      className={className}
      aria-label={text}
    >
      {words.map((word, w) => {
        const startIndex = letterIndex;
        const top = renderLetters(word, "top");
        letterIndex = startIndex;
        const bottom = renderLetters(word, "bottom");

        return (
          <Fragment key={w}>
            <span className={`relative inline-block overflow-hidden whitespace-nowrap align-top ${wordClassNames[w] ?? ""}`}>
              <span aria-hidden="true">{top}</span>
              <span aria-hidden="true" className="absolute inset-0">
                {bottom}
              </span>
            </span>
            {w < words.length - 1 && " "}
          </Fragment>
        );
      })}
    </Wrapper>
  );
};

export default FlipText;
