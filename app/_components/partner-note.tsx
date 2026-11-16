import Image from "next/image";

const partners = [
  {
    name: "DUSA",
    src: "/assets/partners/dusa.png",
    width: 1177,
    height: 1177,
    className: "partner-logo partner-logo--dusa",
  },
  {
    name: "IISRI",
    src: "/assets/partners/iisri.png",
    width: 310,
    height: 80,
    className: "partner-logo partner-logo--iisri",
  },
];

export function PartnerNote() {
  return (
    <section className="partner-note page-section" id="support">
      <p>With support from our partners</p>

      <div className="partner-logos" aria-label="Partners">
        {partners.map((partner) => (
          <div className={partner.className} key={partner.name}>
            <Image
              src={partner.src}
              alt={`${partner.name} logo`}
              width={partner.width}
              height={partner.height}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
