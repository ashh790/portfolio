"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

// Fades a section up the first time it scrolls into view.
const Reveal = ({ children }: { children: ReactNode }) => {
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) {
    return <div>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
