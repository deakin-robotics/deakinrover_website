import { RoverProgramme } from "@/app/_components/rover-programme";
import { TeamSection } from "@/app/_components/team-section";

export function HomepageContentSequence() {

  return (
    <section className="homepage-content-sequence" aria-label="Deakin Rover story">
      <div className="homepage-content-stage">
        <div className="homepage-content-panel">
          <RoverProgramme />
        </div>
        <div className="homepage-content-panel">
          <TeamSection />
        </div>
      </div>
    </section>
  );
}
