"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import { BorealisModel } from "@/components/borealis-model";

const systems = [
  {
    name: "Chassis",
    details: [
      "1.0 × 0.9 × 0.5 m footprint",
      "Approximately 40 kg including payloads",
      "Rocker-bogie suspension · non-pneumatic wheels",
    ],
  },
  {
    name: "Power",
    details: [
      "24 V power bus · 5 V logic bus",
      "6S 20 Ah battery · BMS",
      "E-stop · power data logger",
    ],
  },
  {
    name: "Perception",
    details: [
      "Three 5 MP UVC cameras",
      "640×480 at 30 fps",
      "Approximately 140° field of view",
    ],
  },
  {
    name: "Communications",
    details: [
      "5 GHz wireless bridge",
      "Video, telemetry, and control data",
      "Ubiquiti airMAX radio system",
    ],
  },
  {
    name: "Manipulation",
    details: [
      "6-DOF serial robotic arm",
      "Carbon-fibre links · CAN bus control",
      "Interchangeable gripper and scooper end-effectors",
    ],
  },
  {
    name: "Autonomy",
    details: [
      "ROS 2 Jazzy · Nav2 stack",
      "Jetson Orin Nano Super · RealSense D435i",
      "Integration in progress at SAR submission",
    ],
  },
];

export function BorealisPage() {
  const [activeSystem, setActiveSystem] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const activeSubsystem = systems[activeSystem];

  return (
    <main className="rover-page rover-page--blue borealis-page">
      <section className="borealis-explorer" id="explorer">
        <div className="borealis-explorer-copy">
          <div className="borealis-explorer-copy-content">
            <Link className="back-link" href="/#rovers">← All rovers</Link>
            <h1>BOREALIS</h1>

            <div className="borealis-system-controls">
              <div className="borealis-system-list" role="tablist" aria-label="Borealis systems">
                {systems.map((system, index) => (
                  <button
                    className="borealis-system-button"
                    key={system.name}
                    type="button"
                    role="tab"
                    aria-selected={activeSystem === index}
                    aria-controls={`borealis-system-detail-${index}`}
                    onClick={() => setActiveSystem(index)}
                  >
                    {system.name}
                  </button>
                ))}
              </div>

              <motion.div
                className="borealis-system-detail"
                id={`borealis-system-detail-${activeSystem}`}
                key={activeSystem}
                role="tabpanel"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                <ul>
                  {activeSubsystem.details.map((detail) => <li key={detail}>{detail}</li>)}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>

        <BorealisModel activeSystem={activeSystem} />
        <button
          className="borealis-scroll-control"
          type="button"
          aria-label="Scroll to competition record"
          onClick={() => document.getElementById("record")?.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth" })}
        >
          ↓
        </button>
      </section>

      <section className="borealis-record page-section" id="record">
        <div>
          <p className="eyebrow">Competition record</p>
          <h2>Australian Rover Challenge 2026</h2>
        </div>
        <div className="borealis-record-grid">
          <div>
            <span>Placement</span>
            <strong>13th</strong>
          </div>
          <div>
            <span>Score</span>
            <strong>135.8 points</strong>
          </div>
          <div>
            <span>Award</span>
            <strong>Best Team Culture Award</strong>
          </div>
        </div>
      </section>

      <section className="borealis-media page-section" id="media">
        <div className="borealis-media-heading">
          <p className="eyebrow">Media</p>
          <h2>At competition</h2>
        </div>
        <div className="borealis-media-grid">
          <figure className="borealis-media-item borealis-media-item--primary">
            <div className="borealis-media-image">
              <Image
                src="/assets/borealis/media/2026-borealis-detail-01.jpg"
                alt="Borealis rover prepared for a competition task"
                fill
                sizes="(max-width: 850px) 100vw, 65vw"
              />
            </div>
            <figcaption>Borealis at the Australian Rover Challenge 2026</figcaption>
          </figure>
          <figure className="borealis-media-item borealis-media-item--field">
            <div className="borealis-media-image">
              <Image
                src="/assets/borealis/media/2026-borealis-field-01.png"
                alt="Borealis rover during the Excavation and Construction Task"
                fill
                sizes="(max-width: 850px) 100vw, 65vw"
              />
            </div>
            <figcaption>Borealis at the Excavation &amp; Construction Task</figcaption>
          </figure>
          <figure className="borealis-media-item borealis-media-item--team">
            <div className="borealis-media-image">
              <Image
                src="/assets/team/2026-borealis-team.jpg"
                alt="Deakin Rover Team with Borealis at the Australian Rover Challenge 2026"
                fill
                sizes="(max-width: 850px) 100vw, 35vw"
              />
            </div>
            <figcaption>Deakin Rover Team with Borealis</figcaption>
          </figure>
          <figure className="borealis-media-item borealis-media-item--detail">
            <div className="borealis-media-image">
              <Image
                src="/assets/borealis/media/2026-borealis-field-04.png"
                alt="Borealis rover during the Post Landing Task"
                fill
                sizes="(max-width: 850px) 100vw, 35vw"
              />
            </div>
            <figcaption>Borealis at the Post Landing Task</figcaption>
          </figure>
        </div>
      </section>
    </main>
  );
}
