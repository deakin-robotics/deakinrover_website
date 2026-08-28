import Link from "next/link";

type ProgrammeEntry = {
  year: string;
  name: string;
  details: string[];
  href?: string;
  fullReload?: boolean;
  accent: "orange" | "blue" | "yellow" | "muted";
};

const programmeEntries: ProgrammeEntry[] = [
  {
    year: "2025",
    name: "AURORA",
    details: [
      "6-wheel rocker-bogie",
      "V-slot aluminium chassis",
      "ROS 2 Humble · Raspberry Pi 5",
      "Foundation rover",
    ],
    href: "/rovers/aurora",
    accent: "orange",
  },
  {
    year: "2026",
    name: "BOREALIS",
    details: [
      "ROS 2 Jazzy · Nav2",
      "6-DOF robotic arm · CAN bus",
      "5 GHz wireless bridge · 1.0 × 0.9 m footprint",
    ],
    href: "/rovers/borealis",
    fullReload: true,
    accent: "blue",
  },
  {
    year: "CURRENT",
    name: "CHASMATA",
    details: [
      "4-wheel rocker suspension · modular payloads",
      "6-DOF robotic arm · science payload",
      "ROS 2 Jazzy · 3D mapping · Nav2",
      "Currently in development",
    ],
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
                entry.fullReload ? (
                  <a className="programme-entry-link" href={entry.href}>
                    <h3>{entry.name} <span aria-hidden="true">↗</span></h3>
                  </a>
                ) : (
                  <Link className="programme-entry-link" href={entry.href}>
                    <h3>{entry.name} <span aria-hidden="true">↗</span></h3>
                  </Link>
                )
              ) : (
                <h3>{entry.name}</h3>
              )}
              <div className="programme-details">
                {entry.details.map((detail) => <p key={detail}>{detail}</p>)}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
