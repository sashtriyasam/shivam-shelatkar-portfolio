import type { Project } from "@/lib/projects";

interface ProjectVisualProps {
  visual: Project["visual"];
  accent?: string;
  secondary?: string;
  tertiary?: string;
}

export function ProjectVisual({
  visual,
  accent,
  secondary,
  tertiary,
}: ProjectVisualProps) {
  const a = accent ?? "#c7f35a";
  const b = secondary ?? "#66e3ff";
  const c = tertiary ?? "#ff7a4d";

  if (visual === "terrain") {
    return (
      <svg viewBox="0 0 800 340" preserveAspectRatio="xMidYMid slice">
        <rect width="800" height="340" fill="#13171d" />
        <path d="M0 260 L 120 200 L 240 230 L 360 160 L 480 190 L 600 120 L 720 150 L 800 100 L 800 340 L 0 340 Z" fill={a} opacity={0.25} />
        <path d="M0 300 L 160 270 L 320 290 L 480 240 L 640 260 L 800 220 L 800 340 L 0 340 Z" fill={b} opacity={0.18} />
        <path d="M0 340 L 200 330 L 400 340 L 600 320 L 800 330 L 800 340 L 0 340 Z" fill={c} opacity={0.12} />
        <circle cx="680" cy="70" r="22" fill="none" stroke={a} strokeWidth="2" />
        <circle cx="140" cy="80" r="12" fill={b} opacity={0.5} />
      </svg>
    );
  }

  if (visual === "wave") {
    return (
      <svg viewBox="0 0 800 340" preserveAspectRatio="xMidYMid slice">
        <rect width="800" height="340" fill="#13171d" />
        <path d="M0 240 Q 200 160 400 200 T 800 180 V 340 H 0 Z" fill={a} opacity={0.25} />
        <path d="M0 270 Q 200 220 400 250 T 800 230 V 340 H 0 Z" fill={b} opacity={0.18} />
        <path d="M0 300 Q 200 280 400 300 T 800 290 V 340 H 0 Z" fill={c} opacity={0.12} />
      </svg>
    );
  }

  if (visual === "orbit") {
    return (
      <svg viewBox="0 0 800 340" preserveAspectRatio="xMidYMid slice">
        <rect width="800" height="340" fill="#13171d" />
        <ellipse cx="400" cy="170" rx="260" ry="110" fill="none" stroke={a} strokeWidth="1.5" opacity={0.5} />
        <ellipse cx="400" cy="170" rx="160" ry="180" fill="none" stroke={b} strokeWidth="1.5" opacity={0.4} />
        <circle cx="400" cy="170" r="24" fill={a} />
        <circle cx="660" cy="170" r="12" fill={c} />
        <circle cx="400" cy="50" r="10" fill={b} />
      </svg>
    );
  }

  if (visual === "dots") {
    return (
      <svg viewBox="0 0 800 340" preserveAspectRatio="xMidYMid slice">
        <rect width="800" height="340" fill="#13171d" />
        {Array.from({ length: 24 }).map((_, i) =>
          Array.from({ length: 14 }).map((_, j) => {
            const active = (i + j) % 5 === 0;
            return (
              <circle
                key={`${i}-${j}`}
                cx={40 + i * 32}
                cy={40 + j * 24}
                r={active ? 5 : 2.5}
                fill={active ? a : "#8a918c"}
                opacity={active ? 0.9 : 0.3}
              />
            );
          })
        )}
      </svg>
    );
  }

  if (visual === "bars") {
    return (
      <svg viewBox="0 0 800 340" preserveAspectRatio="xMidYMid slice">
        <rect width="800" height="340" fill="#13171d" />
        {Array.from({ length: 30 }).map((_, i) => {
          const h = 60 + Math.sin(i * 0.6) * 60 + ((i * 137) % 80);
          return (
            <rect
              key={i}
              x={20 + i * 25}
              y={280 - h}
              width="14"
              height={h}
              fill={i % 3 === 0 ? a : i % 3 === 1 ? b : c}
              opacity={0.7}
            />
          );
        })}
      </svg>
    );
  }

  return null;
}