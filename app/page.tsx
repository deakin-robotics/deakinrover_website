import { RoverShowcase } from "@/components/rover-showcase";

export default function HomePage() {
  return (
    <main className="site-home">
      <RoverShowcase />

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
