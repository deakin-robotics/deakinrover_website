import { BackToTop } from "@/components/layout/back-to-top";
import { HomepageContentSequence } from "@/app/_components/homepage-content-sequence";
import { PartnerNote } from "@/app/_components/partner-note";
import { RoverShowcase } from "@/app/_components/rover-showcase";

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
