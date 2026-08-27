import Link from "next/link";

type RoverCardProps = {
  name: string;
  slug: "aurora" | "borealis";
  accent: "orange" | "blue";
  index: string;
};

export function RoverCard({ name, slug, accent, index }: RoverCardProps) {
  return (
    <Link className={`rover-card rover-card--${accent}`} href={`/rovers/${slug}`}>
      <div className="rover-card-visual" aria-hidden="true">
        <span className="card-visual-label">Project visual</span>
        <span className="card-visual-index">{index}</span>
        <span className="card-visual-line" />
      </div>
      <div className="rover-card-copy">
        <div>
          <p className="eyebrow">Rover project</p>
          <h3>{name}</h3>
        </div>
        <span className="arrow-link" aria-hidden="true">↗</span>
      </div>
      <p className="placeholder-copy">Project page in development.</p>
    </Link>
  );
}
