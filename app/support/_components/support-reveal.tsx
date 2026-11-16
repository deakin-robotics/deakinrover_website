"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function SupportReveal({ children, className, delay = 0, fade = false }: { children: ReactNode; className?: string; delay?: number; fade?: boolean }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { y: fade ? 16 : 20, opacity: fade ? 0 : 1 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduceMotion ? 0 : fade ? 0.7 : 0.6, delay: reduceMotion ? 0 : delay, ease: fade ? "easeInOut" : "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
