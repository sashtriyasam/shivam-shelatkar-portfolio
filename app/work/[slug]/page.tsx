"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { getProjectBySlug, projects } from "@/lib/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";

export default function ProjectSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const project = getProjectBySlug(slug);
  if (!project) return notFound();

  const related = projects
    .filter((p) => p.slug !== project.slug)
    .slice(0, 2);

  return (
    <article className="project-page">
      <div className="content-max">
        <Link href="/work" className="link-underline">
          <ArrowLeft size={16} /> Back to work
        </Link>

        <header className="project-page__hero">
          <div className="project-page__visual">
            <ProjectCardVisual project={project} />
          </div>
          <div className="project-page__header">
            <p className="eyebrow">{project.subtitle}</p>
            <h1 className="project-page__title display">{project.title}</h1>
            <div className="project-page__stack">
              {project.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <div className="project-page__links">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="btn link-external"
                >
                  {link.label} <ExternalLink size={14} />
                </a>
              ))}
            </div>
          </div>
        </header>

        <div className="project-page__body">
          <section className="project-page__section">
            <p className="eyebrow">Challenge</p>
            <p className="project-page__text">{project.body.challenge}</p>
          </section>
          <section className="project-page__section">
            <p className="eyebrow">Solution</p>
            <p className="project-page__text">{project.body.solution}</p>
          </section>
          <section className="project-page__section">
            <p className="eyebrow">Outcome</p>
            <p className="project-page__status">{project.body.outcome}</p>
          </section>

          <section className="project-page__section">
            <p className="eyebrow">Stack</p>
            <div className="project-page__stack">
              {project.stack.map((tool) => (
                <span key={tool} className="tag">
                  {tool}
                </span>
              ))}
            </div>
          </section>

          <section className="project-page__section">
            <p className="eyebrow">Status</p>
            <p className="project-page__status">
              {project.status} · {project.year}
            </p>
          </section>

          {related.length > 0 && (
            <section>
              <p className="eyebrow">More work</p>
              <div className="work__grid" style={{ marginTop: "1.5rem" }}>
                {related.map((p) => (
                  <ProjectCard key={p.slug} project={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </article>
  );
}

function ProjectCardVisual({ project }: { project: typeof projects[0] }) {
  const a = project.visualAccent || "#c7f35a";
  const b = project.visualSecondary || "#66e3ff";
  const c = project.visualTertiary || "#ff7a4d";

  if (project.visual === "terrain") {
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

  if (project.visual === "wave") {
    return (
      <svg viewBox="0 0 800 340" preserveAspectRatio="xMidYMid slice">
        <rect width="800" height="340" fill="#13171d" />
        <path d="M0 240 Q 200 160 400 200 T 800 180 V 340 H 0 Z" fill={a} opacity={0.25} />
        <path d="M0 270 Q 200 220 400 250 T 800 230 V 340 H 0 Z" fill={b} opacity={0.18} />
        <path d="M0 300 Q 200 280 400 300 T 800 290 V 340 H 0 Z" fill={c} opacity={0.12} />
      </svg>
    );
  }

  if (project.visual === "orbit") {
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

  if (project.visual === "dots") {
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

  if (project.visual === "bars") {
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
