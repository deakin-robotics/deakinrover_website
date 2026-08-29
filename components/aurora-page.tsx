"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import { AuroraModel } from "@/components/aurora-model";

const systems = [
  {
    name: "Firmware",
    details: [
      "ROS 2 Humble Hawksbill selected for rover control",
      "Raspberry Pi 3B running Ubuntu 22.04 hosts the ROS 2 network",
    ],
  },
  {
    name: "Command",
    details: [
      "LattePanda 5 MP UVC camera for operator perception",
      "640×480 at 30 fps for environmental awareness and site surveying",
      "UBNT Bullet dual-band radio · 2.4 GHz and 5 GHz",
      "ROS 2 carries commands and camera data between rover and base station",
      "Left-side and right-side motor commands for skid steering",
    ],
  },
  {
    name: "Power",
    details: [
      "20 Ah battery operating at 24 V",
      "24 V to 19 V DC-DC converter for Jetson Orin Nano",
      "E-stop connected in series with the battery",
      "Power distribution PCB with replaceable connectors",
    ],
  },
  {
    name: "Chassis",
    details: [
      "Rocker-bogie chassis with centre-wheel modification",
      "V-slot aluminium 2020 extrusion reinforced with L-brackets",
      "6 mm MDF base for component mounting",
      "FEA load testing with a 294 N applied force",
      "Physical full-weight and uneven-terrain load testing",
    ],
  },
];

export function AuroraPage() {
  const [activeSystem, setActiveSystem] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const activeSubsystem = systems[activeSystem];

  return (
    <main className="rover-page rover-page--orange aurora-page">
      <section className="borealis-explorer" id="explorer">
        <div className="borealis-explorer-copy">
          <div className="borealis-explorer-copy-content">
            <Link className="back-link" href="/#rovers">← All rovers</Link>
            <h1>AURORA</h1>

            <div className="borealis-system-controls">
              <div className="borealis-system-list" role="tablist" aria-label="AURORA systems">
                {systems.map((system, index) => (
                  <button
                    className="borealis-system-button"
                    key={system.name}
                    type="button"
                    role="tab"
                    aria-selected={activeSystem === index}
                    aria-controls={`aurora-system-detail-${index}`}
                    onClick={() => setActiveSystem(index)}
                  >
                    {system.name}
                  </button>
                ))}
              </div>

              <motion.div
                className="borealis-system-detail"
                id={`aurora-system-detail-${activeSystem}`}
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

        <AuroraModel activeSystem={activeSystem} />
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
        <h2>Australian Rover Challenge 2025</h2>
        </div>
        <div className="borealis-record-grid">
          <div>
            <span>Placement</span>
            <strong>13th</strong>
          </div>
          <div>
            <span>Score</span>
            <strong>119.2 points</strong>
          </div>
          <div>
            <span>Entry</span>
            <strong>First competition entry</strong>
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
                src="/assets/aurora/original/2.webp"
                alt="Deakin Rover Team with AURORA at the Australian Rover Challenge 2025"
                fill
                sizes="(max-width: 850px) 100vw, 65vw"
              />
            </div>
            <figcaption>Deakin Rover Team with AURORA</figcaption>
          </figure>
          <figure className="borealis-media-item borealis-media-item--field">
            <div className="borealis-media-image">
              <Image
                src="/assets/aurora/original/11.webp"
                alt="AURORA at the Australian Rover Challenge 2025 competition field"
                fill
                sizes="(max-width: 850px) 100vw, 65vw"
              />
            </div>
            <figcaption>AURORA at competition</figcaption>
          </figure>
          <figure className="borealis-media-item borealis-media-item--team">
            <div className="borealis-media-image">
              <Image
                src="/assets/aurora/original/10.webp"
                alt="Deakin Rover Team working on AURORA"
                fill
                sizes="(max-width: 850px) 100vw, 35vw"
              />
            </div>
            <figcaption>Working on AURORA</figcaption>
          </figure>
          <figure className="borealis-media-item borealis-media-item--detail">
            <div className="borealis-media-image">
              <Image
                src="/assets/aurora/original/7.webp"
                alt="Deakin Rover Team operating AURORA at the competition field"
                fill
                sizes="(max-width: 850px) 100vw, 35vw"
              />
            </div>
            <figcaption>Operating AURORA</figcaption>
          </figure>
        </div>
      </section>
    </main>
  );
}
