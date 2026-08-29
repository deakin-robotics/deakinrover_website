"use client";

import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { useRef, useState, type ReactNode } from "react";

const roverTransitionPoint = 0.3;

export function RoverShowcase() {
  const showcaseRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: showcaseRef,
    offset: ["start start", "end end"],
  });
  const [activeRover, setActiveRover] = useState<"borealis" | "aurora">("borealis");

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const nextRover = progress < roverTransitionPoint ? "borealis" : "aurora";

    setActiveRover((currentRover) => currentRover === nextRover ? currentRover : nextRover);
  });

  return (
    <section className="rover-showcase" ref={showcaseRef} aria-label="Rover showcase">
      <div className="rover-showcase-stage">
        <RoverPanel
          name="Borealis"
          image="/assets/borealis/hero-16x9.png"
          imageAlt="Borealis rover operating on sandy terrain"
          active={activeRover === "borealis"}
          accent="blue"
          exitDirection="up"
          meta={
            <>
              2026 Australian Rover Challenge<br />
              13th place · 135.8 points<br />
              Deakin Rover Team · Best Team Culture Award
            </>
          }
          href="/rovers/borealis"
        />
        <RoverPanel
          name="AURORA"
          image="/assets/aurora/hero-16x9-balanced.png"
          imageAlt="AURORA rover"
          active={activeRover === "aurora"}
          accent="orange"
          exitDirection="down"
          meta={
            <>
              2025 Australian Rover Challenge<br />
              13th place · 119.2 points<br />
              First rover ever by Deakin Competitive Robotics Club
            </>
          }
          href="/rovers/aurora"
        />
        <span className="hero-scroll" aria-hidden="true">Scroll to explore ↓</span>
      </div>
    </section>
  );
}

type RoverPanelProps = {
  name: string;
  image: string;
  imageAlt: string;
  active: boolean;
  accent: "blue" | "orange";
  exitDirection: "up" | "down";
  meta: ReactNode;
  href: string;
};

function RoverPanel({ name, image, imageAlt, active, accent, exitDirection, meta, href }: RoverPanelProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isInitialRender, setIsInitialRender] = useState(name === "Borealis");
  const transitionDuration = name === "Borealis" && isInitialRender ? 0.7 : 0.5;

  return (
    <motion.div
      className={`rover-showcase-panel rover-showcase-panel--${accent}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : transitionDuration, ease: "easeInOut" }}
      onAnimationComplete={() => {
        if (name === "Borealis" && isInitialRender) {
          setIsInitialRender(false);
        }
      }}
      style={{ pointerEvents: active ? "auto" : "none" }}
      aria-hidden={!active}
    >
      <motion.div
        className="rover-showcase-panel-content"
        initial={{ y: active ? 16 : exitDirection === "up" ? -24 : 24 }}
        animate={{ y: active ? 0 : exitDirection === "up" ? -24 : 24 }}
        transition={{ duration: shouldReduceMotion ? 0 : transitionDuration, ease: "easeInOut" }}
      >
        <Image className="rover-showcase-image" src={image} alt={imageAlt} fill priority={name === "Borealis"} sizes="100vw" />
      </motion.div>
      <div className={`rover-showcase-panel-overlay rover-showcase-panel-overlay--${accent}`} aria-hidden="true" />
      <motion.div
        className="rover-showcase-panel-copy"
        initial={{ y: active ? 16 : exitDirection === "up" ? -24 : 24 }}
        animate={{ y: active ? 0 : exitDirection === "up" ? -24 : 24 }}
        transition={{ duration: shouldReduceMotion ? 0 : transitionDuration, ease: "easeInOut" }}
      >
        <div className="rover-showcase-copy">
          <h1>{name}</h1>
          <p className="home-meta">{meta}</p>
          {/* Intentional full reload: reset the 3D scene on rover entry. */}
          <a className="button button--light" href={href} tabIndex={active ? 0 : -1}>
            Explore {name} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
