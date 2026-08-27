import Link from "next/link";

type ProgrammeEntry = {
  year: string;
  name: string;
  description: string;
  result?: string;
  href?: string;
  accent: "orange" | "blue" | "yellow" | "muted";
};

const programmeEntries: ProgrammeEntry[] = [
  {
    year: "2025",
    name: "AURORA",
    description: "First competition entry",
    result: "13th place · 119.2 points",
    href: "/rovers/aurora",
    accent: "orange",
  },
  {
    year: "2026",
    name: "BOREALIS",
    description: "Second competition",
    result: "13th place · 135.8 points · Best Team Culture Award",
    href: "/rovers/borealis",
    accent: "blue",
  },
  {
    year: "CURRENT",
    name: "CHASMATA",
    description: "Current rover in development",
    accent: "yellow",
  },
];

export function RoverProgramme() {
  return (
    <section className="programme-section page-section" id="programme">
      <div className="programme-heading">
        <h2>
          Our rover
          <br />
          path so far
        </h2>
        <p className="programme-intro">
          <span>From late-night workshop sessions to competition day. Here&apos;s how we turned an ambitious dream into reality.</span>
          <span>A student-led programme, developed at Deakin University.</span>
        </p>
      </div>
      <div className="programme-timeline" aria-label="Deakin Rover programme history">
        {programmeEntries.map((entry) => (
          <article className={`programme-entry programme-entry--${entry.accent}`} key={entry.name}>
            <p className="programme-year">{entry.year}</p>
            <span className="programme-marker" aria-hidden="true" />
            <div className="programme-entry-content">
              {entry.href ? (
                <Link className="programme-entry-link" href={entry.href}>
                  <h3>{entry.name} <span aria-hidden="true">↗</span></h3>
                </Link>
              ) : (
                <h3>{entry.name}</h3>
              )}
              <p className="programme-description">{entry.description}</p>
              {entry.result && <p className="programme-result">{entry.result}</p>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
