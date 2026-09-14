"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";

function ProjectVisual({
  visual,
  accent,
  secondary,
  tertiary,
}: {
  visual: Project["visual"];
  accent?: string;
  secondary?: string;
  tertiary?: string;
}) {
  const a = accent || "#c7f35a";
  const b = secondary || "#66e3ff";
  const c = tertiary || "#ff7a4d";

  if (visual === "wave") {
    return (
      <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice">
        <rect width="400" height="250" fill="#13171d" />
        <path d="M0 180 Q 100 120 200 160 T 400 140 V 250 H 0 Z" fill={a} opacity={0.25} />
        <path d="M0 200 Q 100 160 200 190 T 400 170 V 250 H 0 Z" fill={b} opacity={0.18} />
        <path d="M0 220 Q 100 200 200 220 T 400 210 V 250 H 0 Z" fill={c} opacity={0.12} />
        <circle cx="320" cy="60" r="24" fill="none" stroke={a} strokeWidth="2" />
        <circle cx="80" cy="70" r="12" fill={b} opacity={0.6} />
      </svg>
    );
  }

  if (visual === "orbit") {
    return (
      <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice">
        <rect width="400" height="250" fill="#13171d" />
        <ellipse cx="200" cy="125" rx="110" ry="55" fill="none" stroke={a} strokeWidth="1.5" opacity={0.5} />
        <ellipse cx="200" cy="125" rx="70" ry="90" fill="none" stroke={b} strokeWidth="1.5" opacity={0.4} />
        <circle cx="200" cy="125" r="14" fill={a} />
        <circle cx="310" cy="125" r="8" fill={c} />
        <circle cx="200" cy="35" r="6" fill={b} />
      </svg>
    );
  }

  if (visual === "dots") {
    return (
      <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice">
        <rect width="400" height="250" fill="#13171d" />
        {Array.from({ length: 12 }).map((_, i) =>
          Array.from({ length: 8 }).map((_, j) => {
            const active = (i + j) % 5 === 0;
            return (
              <circle
                key={`${i}-${j}`}
                cx={40 + i * 30}
                cy={40 + j * 28}
                r={active ? 4 : 2}
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
      <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice">
        <rect width="400" height="250" fill="#13171d" />
        {Array.from({ length: 16 }).map((_, i) => {
          const h = 40 + Math.sin(i * 0.8) * 40 + ((i * 137) % 60);
          return (
            <rect
              key={i}
              x={20 + i * 23}
              y={210 - h}
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

  return (
    <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="250" fill="#13171d" />
      <path d="M0 220 L 60 180 L 120 200 L 180 140 L 240 160 L 300 100 L 360 130 L 400 80 L 400 250 L 0 250 Z" fill={a} opacity={0.25} />
      <path d="M0 240 L 80 210 L 160 230 L 240 190 L 320 210 L 400 170 L 400 250 L 0 250 Z" fill={b} opacity={0.18} />
      <path d="M0 250 L 100 240 L 200 250 L 300 230 L 400 240 L 400 250 L 0 250 Z" fill={c} opacity={0.12} />
      <circle cx="340" cy="60" r="18" fill="none" stroke={a} strokeWidth="2" />
      <circle cx="80" cy="70" r="10" fill={b} opacity={0.5} />
    </svg>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="project-card"
      prefetch={false}
    >
      <div className="project-card__visual">
        <ProjectVisual
          visual={project.visual}
          accent={project.visualAccent}
          secondary={project.visualSecondary}
          tertiary={project.visualTertiary}
        />
      </div>
      <div className="project-card__meta">
        <h3 className="project-card__title">{project.title}</h3>
        <span className="tag">{project.year}</span>
      </div>
      <p className="project-card__summary">{project.summary}</p>
      <div className="project-card__tags">
        {project.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
      <span className="project-card__action">
        View case study <ArrowUpRight size={14} />
      </span>
    </Link>
  );
}
