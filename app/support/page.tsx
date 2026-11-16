import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SupportReveal } from "@/app/support/_components/support-reveal";

export const metadata: Metadata = {
  title: "Support | Deakin Rover Team",
  description: "Partner with Deakin Rover and support student-led space robotics.",
};

const benefitAreas = [
  { title: "Brand visibility", description: "Reach engineering students, university communities and industry professionals through competitions and our media presence.", icon: "visibility", accent: "blue" },
  { title: "Student engagement", description: "Connect with future engineers and build relationships for internships, graduate recruitment and mentorship.", icon: "people", accent: "orange" },
  { title: "Innovation support", description: "Support student development in space robotics, autonomous systems and engineering.", icon: "innovation", accent: "yellow" },
  { title: "Education impact", description: "Help students put their skills into practice and inspire the next generation of engineers.", icon: "education", accent: "blue" },
];

export default function SupportPage() {
  return (
    <main className="support-page">
      <section className="support-hero page-section">
        <SupportReveal fade>
          <Link className="back-link" href="/">← Home</Link>
          <p className="eyebrow">Partnerships / Deakin Rover</p>
          <h1>Build the future <span>with us.</span></h1>
        </SupportReveal>
        <SupportReveal className="support-hero-intro" delay={0.12} fade>
          <p className="support-hero-copy">Partner with a student team bringing space robotics to life, from the workshop to the Australian Rover Challenge.</p>
          <div className="support-hero-actions">
            <a className="button button--light" href="mailto:deakincompetitiverobotics@gmail.com">Get in touch <span aria-hidden="true">↗</span></a>
            <a className="support-benefits-link" href="#benefits">Explore the benefits <span aria-hidden="true">↓</span></a>
          </div>
        </SupportReveal>
      </section>

      <section className="support-story page-section" aria-labelledby="support-story-title">
        <SupportReveal className="support-story-photo support-story-photo--team">
          <Image src="/assets/team/2026-borealis-team.jpg" alt="Deakin Rover Team with Borealis at the Australian Rover Challenge 2026" fill sizes="(max-width: 850px) 100vw, 56vw" />
        </SupportReveal>
        <SupportReveal className="support-story-copy">
          <p className="eyebrow">01 / The team behind the rover</p>
          <h2 id="support-story-title">Built together.<br />Driven further.</h2>
          <p>Deakin Rover brings students together to design, build and compete with rovers made for challenging terrain. Every partnership helps create opportunities for students to put their skills into practice.</p>
        </SupportReveal>
      </section>

      <section className="support-benefits page-section" id="benefits" aria-labelledby="support-benefits-title">
        <SupportReveal className="support-benefits-heading">
          <p className="eyebrow">02 / Partner benefits</p>
          <h2 id="support-benefits-title">A partnership with purpose.</h2>
          <p>Support the team and connect with the people and ideas shaping the future of engineering.</p>
        </SupportReveal>
        <div className="support-benefit-list">
          {benefitAreas.map((benefit, index) => (
            <SupportReveal className={`support-benefit support-benefit--${benefit.accent}`} key={benefit.title} delay={index % 2 * 0.1}>
              <article className="support-benefit-card">
                <div className="support-benefit-top">
                  <BenefitIcon name={benefit.icon} />
                  <span>0{index + 1} / 04</span>
                </div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </article>
            </SupportReveal>
          ))}
        </div>
      </section>

      <section className="support-contact page-section">
        <div className="support-contact-layout">
        <SupportReveal className="support-contact-panel">
          <p className="eyebrow">03 / Get in touch</p>
          <h2>Let’s build something together.</h2>
          <p className="support-contact-copy">Interested in supporting the team? We welcome conversations about sponsorship, equipment, technical expertise and other ways to collaborate.</p>
          <div className="support-contact-links">
            <a className="button button--light" href="mailto:deakincompetitiverobotics@gmail.com">Email the team <span aria-hidden="true">↗</span></a>
            <a className="text-link" href="https://instagram.com/deakinroverteam">Find us on Instagram <span aria-hidden="true">↗</span></a>
          </div>
        </SupportReveal>
        <SupportReveal className="support-contact-media">
          <picture>
            <source media="(prefers-reduced-motion: no-preference)" srcSet="/assets/support/borealis-in-action.gif" />
            <Image src="/assets/support/borealis-in-action-still.jpg" alt="Borealis rover on the field at the Australian Rover Challenge" width={426} height={240} />
          </picture>
        </SupportReveal>
        </div>
      </section>
    </main>
  );
}

function BenefitIcon({ name }: { name: string }) {
  return (
    <span className="support-benefit-icon" aria-hidden="true">
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {name === "visibility" && <><circle cx="16" cy="16" r="4" /><path d="M3 16s4.5-7 13-7 13 7 13 7-4.5 7-13 7S3 16 3 16Z" /></>}
        {name === "people" && <><circle cx="12" cy="11" r="4" /><path d="M4 26v-2a8 8 0 0 1 16 0v2M21 8a4 4 0 0 1 0 8M23 18a7 7 0 0 1 5 7v1" /></>}
        {name === "innovation" && <><path d="M11 21c0-3-3-4-3-9a8 8 0 0 1 16 0c0 5-3 6-3 9H11ZM12 25h8M14 28h4" /><path d="M16 2v2M4 12H2M30 12h-2" /></>}
        {name === "education" && <><path d="m3 12 13-6 13 6-13 6-13-6ZM8 15v6c4 4 12 4 16 0v-6M29 12v8" /></>}
      </svg>
    </span>
  );
}
