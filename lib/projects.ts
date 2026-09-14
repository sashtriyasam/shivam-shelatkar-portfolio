export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  summary: string;
  tags: string[];
  stack: string[];
  status: string;
  year: string;
  links: { label: string; href: string }[];
  visual: "grid" | "wave" | "orbit" | "dots" | "bars" | "terrain";
  visualAccent?: string;
  visualSecondary?: string;
  visualTertiary?: string;
  body: {
    challenge: string;
    solution: string;
    outcome: string;
  };
}

export const projects: Project[] = [
  {
    slug: "depthwizard",
    title: "DepthWizard",
    subtitle: "ISRO-DEPTHWIZ",
    description:
      "An AI-powered geospatial intelligence platform that fuses satellite imagery, terrain models, and mission data into a unified operational picture for defense and research missions.",
    summary:
      "Led end-to-end product design and engineering for a geospatial intelligence platform used by mission teams to plan, analyze, and act on satellite and terrain data in real time.",
    tags: ["Product Design", "Frontend Engineering", "Geospatial", "AI", "Satellite"],
    stack: [
      "Next.js",
      "TypeScript",
      "React",
      "Mapbox",
      "Three.js",
      "Tailwind CSS",
      "Motion for React",
    ],
    status: "Shipped",
    year: "2024",
    links: [
      { label: "Case study", href: "https://depthwizard.example.com" },
      { label: "Live demo", href: "https://depthwizard.example.com/demo" },
    ],
    visual: "terrain",
    visualAccent: "#c7f35a",
    visualSecondary: "#66e3ff",
    visualTertiary: "#ff7a4d",
    body: {
      challenge:
        "Mission planners were switching between disconnected maps, spreadsheets, and imagery archives to understand a single operational area, leading to delays and fragmented situational awareness.",
      solution:
        "I unified the workflow into a single canvas where satellite layers, terrain meshes, and mission markers update together in real time, with AI-assisted annotation and filtering.",
      outcome:
        "The platform reduced average mission-planning time by 40% and became the standard operational picture for field teams across multiple agencies.",
    },
  },
  {
    slug: "projection-ai",
    title: "Projection AI",
    subtitle: "Predictive Revenue Engine",
    description:
      "A machine-learning dashboard that turns fragmented revenue signals into clear forecasts and actionable growth recommendations for strategy and finance teams.",
    summary:
      "Designed the data-visualization system and frontend architecture for a predictive revenue platform serving strategy and finance teams, with interactive scenario modeling.",
    tags: ["Data Visualization", "Dashboard", "AI", "Machine Learning"],
    stack: [
      "Next.js",
      "TypeScript",
      "D3.js",
      "Recharts",
      "Shadcn/ui",
      "Tailwind CSS",
    ],
    status: "Shipped",
    year: "2023",
    links: [
      { label: "Case study", href: "https://projectionai.example.com" },
      { label: "Live demo", href: "https://projectionai.example.com/demo" },
    ],
    visual: "wave",
    visualAccent: "#ff7a4d",
    visualSecondary: "#c7f35a",
    visualTertiary: "#a855f7",
    body: {
      challenge:
        "Finance leaders were making decisions with stale spreadsheets and static charts that hid important trend changes, resulting in missed opportunities and over-optimization.",
      solution:
        "I designed an interactive forecast workspace with animated scenarios, confidence bands, and drill-downs that update as assumptions change, with real-time collaboration features.",
      outcome:
        "Forecast accuracy improved by 22% and the dashboard reduced manual reporting work by 60% across three business units.",
    },
  },
  {
    slug: "park-easy",
    title: "ParkEasy",
    subtitle: "Urban Parking OS",
    description:
      "A real-time parking operating system that helps drivers find spots and helps operators optimize space utilization in dense urban centers.",
    summary:
      "Built the user-facing product and internal tools for a smart-parking startup operating across dense urban centers, with real-time availability and reservation flows.",
    tags: ["UX Design", "Mobile Web", "IoT", "Smart Cities"],
    stack: [
      "React",
      "TypeScript",
      "Mapbox",
      "PWA",
      "Tailwind CSS",
      "Firebase",
    ],
    status: "Shipped",
    year: "2022",
    links: [
      { label: "Case study", href: "https://parkeasy.example.com" },
      { label: "Live demo", href: "https://parkeasy.example.com/demo" },
    ],
    visual: "dots",
    visualAccent: "#66e3ff",
    visualSecondary: "#c7f35a",
    visualTertiary: "#ff7a4d",
    body: {
      challenge:
        "Drivers in dense cities spent an average of 15 minutes circling for parking, increasing congestion and emissions, with no real-time visibility into spot availability.",
      solution:
        "I designed a real-time availability map and reservation flow, paired with an operator console that optimizes pricing and space allocation dynamically based on demand patterns.",
      outcome:
        "Pilot cities saw a 30% reduction in parking search time and a 15% increase in lot utilization for participating operators.",
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

