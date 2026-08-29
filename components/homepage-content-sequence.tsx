import { RoverProgramme } from "@/components/rover-programme";
import { TeamSection } from "@/components/team-section";

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
