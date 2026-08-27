import Link from "next/link";

import type { RoverData } from "@/lib/rover-data";

type RoverPageProps = {
  rover: RoverData;
};

export function RoverPage({ rover }: RoverPageProps) {
  return (
    <main className={`rover-page rover-page--${rover.accent}`}>
      <section className="rover-hero page-section">
        <div className="rover-hero-copy">
          <Link className="back-link" href="/#rovers">← All rovers</Link>
          <p className="eyebrow">{rover.label}</p>
          <h1>{rover.name}</h1>
          <p className="rover-lede">{rover.description}</p>
        </div>
        <ModelPlaceholder label={`${rover.name} / primary visual`} />
      </section>

      <section className="page-section split-section" id="overview">
        <div>
          <p className="eyebrow">01 / Overview</p>
          <h2>Project overview</h2>
        </div>
        <div className="placeholder-panel">
          <p className="placeholder-title">Project information pending</p>
          <p>Verified project information and imagery will be added in a later content stage.</p>
        </div>
      </section>

      <section className="page-section explorer-section" id="explorer">
        <div className="explorer-header">
          <div>
            <p className="eyebrow">02 / Explore the rover</p>
            <h2>Systems index</h2>
          </div>
          <p className="section-description">Model and subsystem information pending.</p>
        </div>
        <div className="explorer-layout">
          <ModelPlaceholder label="Interactive 3D model reserved" />
          <div className="subsystem-panel">
            <p className="placeholder-title">Subsystem explorer</p>
            <p className="placeholder-copy">Subsystem controls will appear here once the model and verified subsystem data are ready.</p>
            <button className="disabled-control" type="button" disabled>Details pending</button>
          </div>
        </div>
      </section>

      <section className="page-section detail-grid-section">
        <DetailPlaceholder number="03" title="Specifications" />
        <DetailPlaceholder number="04" title="Development" />
        <DetailPlaceholder number="05" title="Media" />
      </section>

      <section className="page-section rover-cta" id="support">
        <p className="eyebrow">Keep exploring</p>
        <h2>Team and partnership information</h2>
        <Link className="button button--light" href="/#support">View support information <span aria-hidden="true">↗</span></Link>
      </section>
    </main>
  );
}

function ModelPlaceholder({ label }: { label: string }) {
  return (
    <div className="model-placeholder" aria-label={label} role="img">
      <div className="model-grid" />
      <div className="model-ring model-ring--outer" />
      <div className="model-ring model-ring--inner" />
      <div className="model-crosshair" />
      <span className="model-label">{label}</span>
      <span className="model-status">3D / reserved</span>
    </div>
  );
}

function DetailPlaceholder({ number, title }: { number: string; title: string }) {
  return (
    <article className="detail-placeholder">
      <p className="eyebrow">{number}</p>
      <h3>{title}</h3>
      <p>Content will be added after the project information is prepared.</p>
    </article>
  );
}
