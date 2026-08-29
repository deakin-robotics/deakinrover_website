import { BackToTop } from "@/components/layout/back-to-top";
import { HomepageContentSequence } from "@/components/home/homepage-content-sequence";
import { PartnerNote } from "@/components/home/partner-note";
import { RoverShowcase } from "@/components/home/rover-showcase";

export default function HomePage() {
  return (
    <main className="site-home">
      <RoverShowcase />

      <HomepageContentSequence />

      <PartnerNote />

      <BackToTop />
    </main>
  );
}
