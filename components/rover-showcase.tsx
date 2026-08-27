"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export function RoverShowcase() {
  const showcaseRef = useRef<HTMLElement>(null);
  const [transition, setTransition] = useState(0);

  useEffect(() => {
    const showcase = showcaseRef.current;

    if (!showcase) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const startTop = showcase.getBoundingClientRect().top;

    const updateTransition = () => {
      const scrollDistance = showcase.offsetHeight - window.innerHeight;
      const scrolledDistance = startTop - showcase.getBoundingClientRect().top;
      const progress = scrollDistance > 0
        ? clamp(scrolledDistance / scrollDistance, 0, 1)
        : 0;
      const nextTransition = reduceMotion
        ? progress >= 0.5 ? 1 : 0
        : clamp((progress - 0.34) / 0.32, 0, 1);

      setTransition(nextTransition);
    };

    updateTransition();
    window.addEventListener("scroll", updateTransition, { passive: true });
    document.addEventListener("scroll", updateTransition, { capture: true, passive: true });
    window.addEventListener("resize", updateTransition);

    return () => {
      window.removeEventListener("scroll", updateTransition);
      document.removeEventListener("scroll", updateTransition, { capture: true });
      window.removeEventListener("resize", updateTransition);
    };
  }, []);

  const borealisOpacity = 1 - transition;
  const auroraOpacity = transition;

  return (
    <section className="rover-showcase" ref={showcaseRef} aria-label="Rover showcase">
      <div className="rover-showcase-stage">
        <RoverPanel
          name="Borealis"
          image="/assets/borealis/hero-16x9.png"
          imageAlt="Borealis rover operating on sandy terrain"
          opacity={borealisOpacity}
          active={transition < 0.5}
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
          image="/assets/aurora/hero-16x9.png"
          imageAlt="AURORA rover"
          opacity={auroraOpacity}
          active={transition >= 0.5}
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
  opacity: number;
  active: boolean;
  accent: "blue" | "orange";
  meta: ReactNode;
  href: string;
};

function RoverPanel({ name, image, imageAlt, opacity, active, accent, meta, href }: RoverPanelProps) {
  return (
    <div
      className={`rover-showcase-panel rover-showcase-panel--${accent}`}
      style={{ opacity, pointerEvents: active ? "auto" : "none" }}
      aria-hidden={!active}
    >
      <Image className="rover-showcase-image" src={image} alt={imageAlt} fill priority={name === "Borealis"} sizes="100vw" />
      <div className="rover-showcase-copy">
        <h1>{name}</h1>
        <p className="home-meta">{meta}</p>
        <Link className="button button--light" href={href} tabIndex={active ? 0 : -1}>
          Explore {name} <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </div>
  );
}
