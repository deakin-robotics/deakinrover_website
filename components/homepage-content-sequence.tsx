"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";
import { RoverProgramme } from "@/components/rover-programme";
import { TeamSection } from "@/components/team-section";

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export function HomepageContentSequence() {
  const sequenceRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sequenceRef,
    offset: ["start start", "end end"],
  });
  const transition = useTransform(scrollYProgress, (progress) => {
    if (shouldReduceMotion) {
      return progress >= 0.5 ? 1 : 0;
    }

    return clamp((progress - 0.35) / 0.30, 0, 1);
  });
  const programmeOpacity = useTransform(transition, (value) => 1 - value);
  const [activeSection, setActiveSection] = useState<"programme" | "team">("programme");

  useMotionValueEvent(transition, "change", (value) => {
    const nextSection = value < 0.5 ? "programme" : "team";

    setActiveSection((currentSection) => currentSection === nextSection ? currentSection : nextSection);
  });

  return (
    <section className="homepage-content-sequence" ref={sequenceRef} aria-label="Deakin Rover story">
      <div className="homepage-content-stage">
        <motion.div
          className="homepage-content-panel"
          style={{ opacity: programmeOpacity, pointerEvents: activeSection === "programme" ? "auto" : "none" }}
          aria-hidden={activeSection !== "programme"}
          inert={activeSection !== "programme"}
        >
          <RoverProgramme />
        </motion.div>
        <motion.div
          className="homepage-content-panel"
          style={{ opacity: transition, pointerEvents: activeSection === "team" ? "auto" : "none" }}
          aria-hidden={activeSection !== "team"}
          inert={activeSection !== "team"}
        >
          <TeamSection />
        </motion.div>
      </div>
    </section>
  );
}
