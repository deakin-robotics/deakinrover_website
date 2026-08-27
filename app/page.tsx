import { RoverShowcase } from "@/components/rover-showcase";
import { HomepageContentSequence } from "@/components/homepage-content-sequence";
import { PartnerNote } from "@/components/partner-note";

export default function HomePage() {
  return (
    <main className="site-home">
      <RoverShowcase />

      <HomepageContentSequence />

      <PartnerNote />
    </main>
  );
}
