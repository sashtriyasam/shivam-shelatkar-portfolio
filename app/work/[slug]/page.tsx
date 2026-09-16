"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { getProjectBySlug, projects } from "@/lib/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectVisual } from "@/lib/ProjectVisual";

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
            <ProjectVisual
              visual={project.visual}
              accent={project.visualAccent}
              secondary={project.visualSecondary}
              tertiary={project.visualTertiary}
            />
          </div>
          <div className="project-page__header">
            <p className="eyebrow">{project.subtitle}</p>
            <h1 className="project-page__title display">{project.title}</h1>
            <p className="project-page__text">
              {project.role} · {project.year} · {project.status}
            </p>
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
              {project.status} / {project.year}
            </p>
          </section>

          <section className="project-page__section">
            <p className="eyebrow">Role</p>
            <p className="project-page__status">{project.role}</p>
          </section>

          <section className="project-page__section">
            <p className="eyebrow">Artwork</p>
            <p className="project-page__text">{project.photoNote}</p>
          </section>

          {related.length > 0 && (
            <section>
              <p className="eyebrow">More work</p>
              <div
                className="work__grid"
                style={{ marginTop: "1.5rem" }}
              >
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