import Link from "next/link";
import Image from "next/image";

import { RoverCard } from "@/components/rover-card";

export default function HomePage() {
  return (
    <main className="site-home">
      <section className="home-hero page-section">
        <div className="home-hero-copy">
          <h1>Borealis</h1>
          <p className="home-meta">2026 Australian Rover Challenge<br />13th place · 135.8 points<br />Deakin Rover Team · Best Team Culture Award</p>
          <Link className="button button--light" href="/rovers/borealis">Explore Borealis <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="hero-visual">
          <Image
            className="hero-background-image"
            src="/assets/borealis/hero-16x9.png"
            alt="Borealis rover operating on sandy terrain"
            fill
            priority
            sizes="100vw"
          />
          <div className="hero-visual-top"><span>Borealis</span></div>
          <div className="hero-visual-bottom"><span>Deakin Rover</span><span>Image / render pending</span></div>
        </div>
        <span className="hero-scroll" aria-hidden="true">Scroll to explore ↓</span>
      </section>

      <section className="program-section" id="rovers">
        <div className="program-heading">
          <p className="eyebrow">01 / Rovers</p>
          <h2>Rover program</h2>
        </div>
        <div className="program-grid">
          <RoverCard name="AURORA" slug="aurora" accent="orange" index="01" />
          <RoverCard name="BOREALIS" slug="borealis" accent="blue" index="02" />
        </div>
      </section>

      <section className="information-section page-section" id="mission">
        <div className="information-heading">
          <p className="eyebrow">02 / Mission</p>
          <h2>Project information</h2>
        </div>
        <div className="data-list">
          <DataRow label="Competition" value="Details pending" />
          <DataRow label="Project status" value="Details pending" />
          <DataRow label="Development year" value="Details pending" />
          <DataRow label="Next milestone" value="Details pending" />
        </div>
      </section>

      <section className="engineering-section page-section">
        <div className="engineering-heading">
          <p className="eyebrow">03 / Engineering</p>
          <h2>Systems index</h2>
        </div>
        <div className="engineering-grid" aria-label="Engineering content placeholders">
          <EngineeringPlaceholder number="01" />
          <EngineeringPlaceholder number="02" />
          <EngineeringPlaceholder number="03" />
          <EngineeringPlaceholder number="04" />
        </div>
      </section>

      <section className="support-section page-section" id="support">
        <div>
          <p className="eyebrow">04 / Team and support</p>
          <h2>Team and partnership information</h2>
        </div>
        <div className="support-copy">
          <p>Verified team, partnership, and contact details will be added here.</p>
          <span className="button button--pending">Details pending</span>
        </div>
      </section>
    </main>
  );
}

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="data-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function EngineeringPlaceholder({ number }: { number: string }) {
  return (
    <div className="engineering-placeholder">
      <span>{number}</span>
      <strong>System information pending</strong>
      <span aria-hidden="true">↗</span>
    </div>
  );
}
