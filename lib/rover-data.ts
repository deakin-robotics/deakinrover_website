export type RoverSlug = "aurora" | "borealis";

export type RoverData = {
  slug: RoverSlug;
  name: string;
  accent: "orange" | "blue";
  label: string;
  description: string;
};

export const roverData: Record<RoverSlug, RoverData> = {
  aurora: {
    slug: "aurora",
    name: "AURORA",
    accent: "orange",
    label: "Rover project",
    description: "Project information and engineering stories are being prepared."
  },
  borealis: {
    slug: "borealis",
    name: "BOREALIS",
    accent: "blue",
    label: "Rover project",
    description: "Project information and engineering stories are being prepared."
  }
};
