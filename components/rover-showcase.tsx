"use client";

import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef, useState, type ReactNode } from "react";

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export function RoverShowcase() {
  const showcaseRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: showcaseRef,
    offset: ["start start", "end end"],
  });
  const transition = useTransform(scrollYProgress, (progress) => {
    if (shouldReduceMotion) {
      return progress >= 0.5 ? 1 : 0;
    }

    return clamp((progress - 0.30) / 0.32, 0, 1);
  });
  const borealisOpacity = useTransform(transition, (value) => 1 - value);
  const [activeRover, setActiveRover] = useState<"borealis" | "aurora">("borealis");

  useMotionValueEvent(transition, "change", (value) => {
    const nextRover = value < 0.5 ? "borealis" : "aurora";

    setActiveRover((currentRover) => currentRover === nextRover ? currentRover : nextRover);
  });

  return (
    <section className="rover-showcase" ref={showcaseRef} aria-label="Rover showcase">
      <div className="rover-showcase-stage">
        <RoverPanel
          name="Borealis"
          image="/assets/borealis/hero-16x9.png"
          imageAlt="Borealis rover operating on sandy terrain"
          opacity={borealisOpacity}
          active={activeRover === "borealis"}
          accent="blue"
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
          opacity={transition}
          active={activeRover === "aurora"}
          accent="orange"
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
  opacity: MotionValue<number>;
  active: boolean;
  accent: "blue" | "orange";
  meta: ReactNode;
  href: string;
};

function RoverPanel({ name, image, imageAlt, opacity, active, accent, meta, href }: RoverPanelProps) {
  return (
    <motion.div
      className={`rover-showcase-panel rover-showcase-panel--${accent}`}
      style={{ opacity, pointerEvents: active ? "auto" : "none" }}
      aria-hidden={!active}
    >
      <Image className="rover-showcase-image" src={image} alt={imageAlt} fill priority={name === "Borealis"} sizes="100vw" />
      <div className="rover-showcase-copy">
        <h1>{name}</h1>
        <p className="home-meta">{meta}</p>
        {/* Intentional full reload: reset the 3D scene on rover entry. */}
        <a className="button button--light" href={href} tabIndex={active ? 0 : -1}>
          Explore {name} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </motion.div>
  );
}
