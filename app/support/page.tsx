import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Support | Deakin Rover Team",
  description: "Partnership and sponsorship information for the Deakin Rover Team.",
};

const benefitAreas = [
  "Brand visibility",
  "Student engagement",
  "Partnership opportunities",
];

export default function SupportPage() {
  return (
    <main className="support-page">
      <section className="support-hero page-section">
        <div>
          <Link className="back-link" href="/">← Home</Link>
          <h1>Support the team</h1>
        </div>
        <p className="support-hero-copy">
          Partnership information for organisations interested in supporting Deakin Rover.
        </p>
      </section>

      <section className="support-benefits page-section">
        <div className="support-benefits-heading">
          <p className="eyebrow">Partner benefits</p>
          <h2>What partners receive</h2>
        </div>
        <div className="support-benefit-list">
          {benefitAreas.map((benefit, index) => (
            <article className="support-benefit" key={benefit}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{benefit}</h3>
              <p>Details will be published here.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="support-contact page-section">
        <p className="eyebrow">Partnership information</p>
        <h2>Sponsorship packages and contact details are being prepared.</h2>
      </section>
    </main>
  );
}
