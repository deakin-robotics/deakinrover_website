import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RoverPage } from "@/components/rovers/rover-page";
import { roverData, type RoverSlug } from "@/lib/rover-data";

type RoverRouteProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(roverData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: RoverRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const rover = getRover(slug);

  if (!rover) {
    return {};
  }

  return {
    title: `${rover.name} | Deakin Rover Team`,
    description: `${rover.name} project page for the Deakin Rover Team.`
  };
}

export default async function RoverRoute({ params }: RoverRouteProps) {
  const { slug } = await params;
  const rover = getRover(slug);

  if (!rover) {
    notFound();
  }

  return <RoverPage rover={rover} />;
}

function getRover(slug: string) {
  return roverData[slug as RoverSlug];
}
