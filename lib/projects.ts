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
  role: string;
  photoNote: string;
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
    slug: "thevita-masthak",
    title: "Thevita mastak deva tuzha payi",
    subtitle: "Marathi devotional to Lord Vitthal · Ashadi Ekadashi 2025",
    description:
      "A Marathi devotional to Lord Vitthal, released on Ashadi Ekadashi 2025-07-13.",
    summary:
      "Composed and edited a Marathi bhajan to Lord Vitthal for Ashadi Ekadashi, released across streaming and video.",
    tags: ["marathi devotional", "bhajan", "lord vitthal", "ashadi ekadashi"],
    stack: ["composition", "vocal editing", "mix", "streaming release"],
    status: "Released",
    year: "2025",
    role: "Composer / Editor",
    photoNote: "",
    links: [
      {
        label: "Release notes",
        href: "https://swarvibhaa.odoo.com/blog/swarvibhaa-originals-4/thevita-masthak-deva-tuzha-payi-3",
      },
      {
        label: "Spotify",
        href: "https://open.spotify.com/track/6KtDa0u1kpOpV33Gm2htrh",
      },
      {
        label: "JioSaavn song",
        href: "https://www.jiosaavn.com/song/thevita-masthak-deva-tuzha-payi/OispfyBvR1s",
      },
      {
        label: "JioSaavn album",
        href: "https://www.jiosaavn.com/album/thevita-masthak-deva-tuzha-payi/RO5EoZH7b-8_",
      },
      {
        label: "YouTube",
        href: "https://www.youtube.com/watch?v=sKIO2TBTjbc",
      },
    ],
    visual: "wave",
    visualAccent: "#ffb347",
    visualSecondary: "#c7f35a",
    visualTertiary: "#ff7a4d",
    body: {
      challenge:
        "A Marathi bhajan to Lord Vitthal had to be finished, mixed, and delivered in time for Ashadi Ekadashi on 2025-07-13, across audio streaming and video.",
      solution:
        "Composed and edited a vocal-led devotional arrangement, prepared the streaming masters, cut the video edit, and published release notes on the Swarvibhaa blog.",
      outcome:
        "Released on 2025-07-13 on Spotify, JioSaavn, and YouTube, with the story documented on the Swarvibhaa blog.",
    },
  },
  {
    slug: "saffron-suraaval",
    title: "Saffron suraaval EP",
    subtitle: "Indian fusion instrumental · 5 tracks · 12 min",
    description:
      "A five-track Indian fusion instrumental EP, released 2025-10-04.",
    summary:
      "Composed a 12-minute, five-track Indian fusion EP — Calling Bhisma, Maula's last stand, Clue or mirage, Lost train to fort, Burning green chauni.",
    tags: ["indian fusion", "instrumental", "ep", "composer"],
    stack: ["composition", "arrangement", "mix", "ep mastering"],
    status: "Released",
    year: "2025",
    role: "Composer",
    photoNote: "",
    links: [
      {
        label: "Release notes",
        href: "https://swarvibhaa.odoo.com/blog/swarvibhaa-originals-4/saffron-suraaval-9",
      },
      {
        label: "Spotify album",
        href: "https://open.spotify.com/album/03Wk7XtRyvM0kMOeyBmqNC",
      },
      {
        label: "JioSaavn album",
        href: "https://www.jiosaavn.com/album/saffron-suraaval/S4gMTJUoSKY_",
      },
    ],
    visual: "bars",
    visualAccent: "#ff7a4d",
    visualSecondary: "#c7f35a",
    visualTertiary: "#66e3ff",
    body: {
      challenge:
        "An instrumental fusion EP had to hold five distinct pieces — from Calling Bhisma to Burning green chauni — together in about twelve minutes without losing its Indian classical core.",
      solution:
        "Composed and arranged five tracks (Calling Bhisma, Maula's last stand, Clue or mirage, Lost train to fort, Burning green chauni) as one EP arc, mixed for streaming.",
      outcome:
        "Released 2025-10-04 on Spotify and JioSaavn, with release notes on the Swarvibhaa blog.",
    },
  },
  {
    slug: "raatrani-orchestral",
    title: "Raatrani orchestral",
    subtitle: "Marathi cinematic · orchestral arrangement",
    description:
      "An orchestral take on the Marathi cinematic piece Raatrani, released 2025-12-14.",
    summary:
      "Arranged and orchestrated the Marathi cinematic piece Raatrani (original by Anshul Bopardikar) for an orchestral palette.",
    tags: ["marathi cinematic", "orchestration", "strings", "arranger"],
    stack: ["arrangement", "orchestration", "strings", "mix"],
    status: "Released",
    year: "2025",
    role: "Arranger / Orchestrator (original by Anshul Bopardikar)",
    photoNote: "",
    links: [
      {
        label: "Release notes",
        href: "https://swarvibhaa.odoo.com/blog/swarvibhaa-originals-4/raatrani-10",
      },
      {
        label: "JioSaavn song",
        href: "https://www.jiosaavn.com/song/raatrani/CkVaBEZqWHQ",
      },
    ],
    visual: "orbit",
    visualAccent: "#a855f7",
    visualSecondary: "#66e3ff",
    visualTertiary: "#c7f35a",
    body: {
      challenge:
        "The Marathi cinematic piece Raatrani needed an orchestral setting that kept its night-flower mood while giving strings and quiet textures room to breathe.",
      solution:
        "Arranged and orchestrated the piece from Anshul Bopardikar's original, voicing strings and support around the lead line and mixing for streaming.",
      outcome:
        "Released 2025-12-14 on JioSaavn, with release notes on the Swarvibhaa blog.",
    },
  },
  {
    slug: "nsff-2026",
    title: "NSFF 2026",
    subtitle: "Festival site + on-site tech · Film City Mumbai · 28 Feb–1 Mar 2026",
    description:
      "Designer, developer, and on-site technical head for the national student film festival at Film City Mumbai.",
    summary:
      "Designed and built nsff.in and ran on-site tech for the festival at Film City Mumbai, 28 Feb–1 Mar 2026, with Univ Mumbai, ABP, IIM Mumbai, SNDT, and ABVP.",
    tags: ["web design", "frontend build", "on-site tech", "film festival"],
    stack: ["site design", "frontend build", "on-site technical direction"],
    status: "Live",
    year: "2026",
    role: "Designer / Developer + on-site technical head",
    photoNote: "",
    links: [{ label: "Live site", href: "https://nsff.in" }],
    visual: "terrain",
    visualAccent: "#c7f35a",
    visualSecondary: "#66e3ff",
    visualTertiary: "#ff7a4d",
    body: {
      challenge:
        "A student film festival at Film City Mumbai on 28 Feb–1 Mar 2026 needed one site for programme, partners, and entries, plus dependable on-site tech across screenings and stage.",
      solution:
        "Designed and developed nsff.in and headed the on-site technical setup, coordinating playback, schedule, and partner presence (Univ Mumbai, ABP, IIM Mumbai, SNDT, ABVP).",
      outcome:
        "Festival ran live at Film City Mumbai with the site as its public home and technical front door.",
    },
  },
  {
    slug: "parkeasy",
    title: "ParkEasy",
    subtitle: "Smart parking · Expo + Supabase · Jan 2026",
    description:
      "A realtime smart-parking app with live availability, reservations, and payments.",
    summary:
      "Built ParkEasy with Expo React Native, Express, Supabase, Socket.io, and Razorpay — live spots, booking, and payments.",
    tags: ["expo app", "smart parking", "realtime", "payments"],
    stack: ["Expo", "React Native", "Express", "Supabase", "Socket.io", "Razorpay"],
    status: "Shipped",
    year: "2026",
    role: "Designer / Developer",
    photoNote: "",
    links: [
      { label: "GitHub", href: "https://github.com/sashtriyasam/ParkEasy" },
    ],
    visual: "dots",
    visualAccent: "#66e3ff",
    visualSecondary: "#c7f35a",
    visualTertiary: "#ff7a4d",
    body: {
      challenge:
        "Drivers lose time circling for parking with no live view of spots, booking, or payment in one place.",
      solution:
        "Built an Expo app on Express + Supabase with Socket.io live availability and Razorpay checkout, shipped 2026-01-31.",
      outcome:
        "Working app with realtime spots, reservations, and payments, open-sourced on GitHub.",
    },
  },
  {
    slug: "kalamahotsav",
    title: "Kalamahotsav 2026",
    subtitle: "Festival site · designer / developer",
    description:
      "Designer and developer for the Kalamahotsav 2026 festival site.",
    summary:
      "Designed and developed kalamahotsaav.com, the 2026 festival home for programme, artists, and updates.",
    tags: ["web design", "frontend build", "festival"],
    stack: ["site design", "frontend build"],
    status: "Live",
    year: "2026",
    role: "Designer / Developer",
    photoNote: "",
    links: [{ label: "Live site", href: "https://kalamahotsaav.com" }],
    visual: "terrain",
    visualAccent: "#ffb347",
    visualSecondary: "#66e3ff",
    visualTertiary: "#c7f35a",
    body: {
      challenge:
        "The 2026 festival needed a single public home for its programme, artists, and updates.",
      solution:
        "Designed and developed kalamahotsaav.com as a fast, readable festival site.",
      outcome: "Live site carrying the 2026 edition.",
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
