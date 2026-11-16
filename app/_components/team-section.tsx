"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const teamPhotos = [
  {
    src: "/assets/team/2025-aurora-team.webp",
    alt: "Deakin Rover Team with AURORA at the Australian Rover Challenge 2025",
  },
  {
    src: "/assets/team/2026-borealis-team.jpg",
    alt: "Deakin Rover Team with Borealis at the Australian Rover Challenge 2026",
  },
  {
    src: "/assets/team/2025-aurora-team-event.jpg",
    alt: "Deakin Rover Team with AURORA at a team event",
  },
];

export function TeamSection() {
  const [activePhoto, setActivePhoto] = useState(0);
  const photo = teamPhotos[activePhoto];

  const showPrevious = () => {
    setActivePhoto((current) => (current - 1 + teamPhotos.length) % teamPhotos.length);
  };

  const showNext = () => {
    setActivePhoto((current) => (current + 1) % teamPhotos.length);
  };

  return (
    <section className="team-section" id="team">
      <div className="team-copy page-section">
        <h2>Built by a growing student team</h2>
        <p className="section-description">
          A student-led, multidisciplinary team at Deakin University, bringing together the skills needed to build each rover.
        </p>
      </div>

      <div className="team-photo" role="region" aria-roledescription="carousel" aria-label="Deakin Rover team photos">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            className="team-photo-slide"
            key={photo.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <Image src={photo.src} alt={photo.alt} fill priority={activePhoto === 0} sizes="100vw" />
          </motion.div>
        </AnimatePresence>
        <button className="team-photo-control team-photo-control--previous" type="button" onClick={showPrevious} aria-label="Previous team photo">
          <span aria-hidden="true">←</span>
        </button>
        <button className="team-photo-control team-photo-control--next" type="button" onClick={showNext} aria-label="Next team photo">
          <span aria-hidden="true">→</span>
        </button>
        <span className="team-photo-count" aria-live="polite">
          {String(activePhoto + 1).padStart(2, "0")} / {String(teamPhotos.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}
