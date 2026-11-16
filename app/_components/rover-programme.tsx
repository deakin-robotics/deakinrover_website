"use client";

import Link from "next/link";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useRef, useState } from "react";

type ProgrammeEntry = {
  year: string;
  name: string;
  details: string[];
  href?: string;
  fullReload?: boolean;
  accent: "orange" | "blue" | "yellow" | "muted";
};

const programmeEntries: ProgrammeEntry[] = [
  {
    year: "2025",
    name: "AURORA",
    details: [
      "6-wheel rocker-bogie · V-slot aluminium chassis",
      "ROS 2 Humble · Raspberry Pi 5",
      "First competition entry",
      "Foundation rover",
    ],
    href: "/rovers/aurora",
    accent: "orange",
  },
  {
    year: "2026",
    name: "BOREALIS",
    details: [
      "6-wheel rocker-bogie · 1.0 × 0.9 × 0.5 m footprint",
      "ROS 2 Jazzy · Nav2",
      "6-DOF robotic arm · CAN bus",
    ],
    href: "/rovers/borealis",
    fullReload: true,
    accent: "blue",
  },
  {
    year: "CURRENT",
    name: "CHASMATA",
    details: [
      "4-wheel rocker suspension · modular payloads",
      "ROS 2 Jazzy · 3D mapping · Nav2",
      "6-DOF robotic arm · science payload",
      "Currently in development",
    ],
    accent: "yellow",
  },
];

export function RoverProgramme() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 70vh", "start 0vh"],
  });
  const [hasReachedTrigger, setHasReachedTrigger] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (progress > 0) {
      setHasReachedTrigger(true);
    }
  });

  return (
    <section className="programme-section page-section" id="programme">
      <div className="programme-heading">
        <h2>
          Our rover
          <br />
          path so far
        </h2>
        <p className="programme-intro">
          <span>From late-night workshop sessions to competition day. Here&apos;s how we turned an ambitious dream into reality.</span>
          <span>A student-led programme, developed at Deakin University.</span>
        </p>
      </div>
      <div className="programme-timeline" ref={timelineRef} aria-label="Deakin Rover programme history">
        <motion.span
          className="programme-timeline-line"
          aria-hidden="true"
          initial={{ scale: 0 }}
          animate={{ scale: hasReachedTrigger ? 1 : 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 1.1, ease: "easeInOut" }}
        />
        {programmeEntries.map((entry, index) => {
          const indicatorDelay = 0.15 + index * 0.41;

          return (
            <article className={`programme-entry programme-entry--${entry.accent}`} key={entry.name}>
              <motion.div
                className="programme-entry-indicator"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: hasReachedTrigger ? 1 : 0, y: hasReachedTrigger || shouldReduceMotion ? 0 : 10 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.45, delay: shouldReduceMotion ? 0 : indicatorDelay, ease: "easeOut" }}
              >
                <p className="programme-year">{entry.year}</p>
                <span className="programme-marker" aria-hidden="true" />
              </motion.div>
              <motion.div
                className="programme-entry-content"
                initial={shouldReduceMotion ? false : { opacity: 0, y: -10 }}
                animate={{ opacity: hasReachedTrigger ? 1 : 0, y: hasReachedTrigger || shouldReduceMotion ? 0 : -10 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.45, delay: shouldReduceMotion ? 0 : indicatorDelay + 0.12, ease: "easeOut" }}
              >
                {entry.href ? (
                  entry.fullReload ? (
                    <a className="programme-entry-link" href={entry.href}>
                      <h3>{entry.name} <span aria-hidden="true">↗</span></h3>
                    </a>
                  ) : (
                    <Link className="programme-entry-link" href={entry.href}>
                      <h3>{entry.name} <span aria-hidden="true">↗</span></h3>
                    </Link>
                  )
                ) : (
                  <h3>{entry.name}</h3>
                )}
                <div className="programme-details">
                  {entry.details.map((detail) => <p key={detail}>{detail}</p>)}
                </div>
              </motion.div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
