import { use } from "react";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, CheckCircle2, Layers, Cpu, Music2 } from "lucide-react";
import Link from "next/link";
import { getProjectBySlug, projects } from "@/lib/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectVisual } from "@/lib/ProjectVisual";
import { MusicPlayer } from "@/components/audio/MusicPlayer";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found — Shivam Shelatkar",
      description: "The requested project could not be found.",
    };
  }

  const title = `${project.title} — Shivam Shelatkar`;
  const description = project.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: "/og-default.svg",
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-default.svg"],
    },
  };
}

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
        <Link href="/work" className="link-underline" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
          <ArrowLeft size={16} /> Back to all work
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
            <span
              className="tag"
              style={{
                alignSelf: "flex-start",
                borderColor: "var(--color-accent-primary)",
                color: "var(--color-accent-primary)",
                marginBottom: 8,
              }}
            >
              {project.categoryLabel}
            </span>
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

        {/* Audio Player for Music releases */}
        {project.audio && (
          <section style={{ margin: "32px 0" }}>
            <MusicPlayer
              audio={project.audio}
              colorAccent={project.visualAccent || "#ff7a4d"}
            />
          </section>
        )}

        {/* Impact Metrics Strip */}
        {project.metrics && project.metrics.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 16,
              margin: "32px 0",
            }}
          >
            {project.metrics.map((m) => (
              <div
                key={m.label}
                style={{
                  padding: "18px 20px",
                  borderRadius: 14,
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontFamily: "var(--font-mono)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--color-text-tertiary)",
                    marginBottom: 6,
                  }}
                >
                  {m.label}
                </div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: project.visualAccent || "var(--color-text-primary)",
                  }}
                >
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="project-page__body">
          <section className="project-page__section">
            <p className="eyebrow">The Challenge</p>
            <p className="project-page__text">{project.body.challenge}</p>
          </section>

          <section className="project-page__section">
            <p className="eyebrow">The Engineering & Creative Solution</p>
            <p className="project-page__text">{project.body.solution}</p>
          </section>

          <section className="project-page__section">
            <p className="eyebrow">The Outcome & Delivery</p>
            <p className="project-page__status">{project.body.outcome}</p>
          </section>

          {/* Architecture & Flow Diagrams */}
          {project.architecture && (
            <section
              className="project-page__section"
              style={{
                background: "rgba(12, 14, 20, 0.6)",
                border: "1px solid var(--color-border)",
                borderRadius: 20,
                padding: "28px 24px",
                margin: "32px 0",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <Cpu size={18} color="var(--color-focus)" />
                <h3
                  style={{
                    margin: 0,
                    fontSize: 18,
                    fontWeight: 700,
                    color: "var(--color-text-primary)",
                  }}
                >
                  System Architecture & Pipeline Flow
                </h3>
              </div>

              {project.architecture.diagram && (
                <div style={{ margin: "16px 0 24px" }}>
                  <pre
                    style={{
                      background: "#060709",
                      padding: "20px 24px",
                      borderRadius: 12,
                      border: "1px solid rgba(0, 212, 255, 0.2)",
                      color: "var(--color-focus)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "clamp(11px, 2vw, 13px)",
                      lineHeight: 1.5,
                      overflowX: "auto",
                    }}
                  >
                    <code>{project.architecture.diagram}</code>
                  </pre>
                </div>
              )}

              <div style={{ marginBottom: 20 }}>
                <p className="eyebrow">Pipeline Stages</p>
                <ol style={{ paddingLeft: 20, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {project.architecture.steps.map((step, idx) => (
                    <li
                      key={idx}
                      style={{
                        fontSize: 14,
                        lineHeight: 1.6,
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      <strong style={{ color: "var(--color-text-primary)" }}>Stage {idx + 1}:</strong> {step}
                    </li>
                  ))}
                </ol>
              </div>

              {project.architecture.highlights && (
                <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: 16 }}>
                  <p className="eyebrow">Key Engineering Decisions</p>
                  <ul style={{ paddingLeft: 20, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                    {project.architecture.highlights.map((h, i) => (
                      <li
                        key={i}
                        style={{
                          fontSize: 14,
                          lineHeight: 1.6,
                          color: "var(--color-text-secondary)",
                        }}
                      >
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          {/* Deep-Dive Decisions */}
          {project.decisions && project.decisions.length > 0 && (
            <section className="project-page__section">
              <p className="eyebrow">Technical Deep Dive</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
                {project.decisions.map((d) => (
                  <div
                    key={d.title}
                    style={{
                      padding: 20,
                      background: "rgba(255, 255, 255, 0.02)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 14,
                    }}
                  >
                    <h4 style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 700, color: "var(--color-text-primary)" }}>
                      {d.title}
                    </h4>
                    <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: "var(--color-text-secondary)" }}>
                      {d.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Saffron Suraaval EP Tracklist */}
          {project.tracks && project.tracks.length > 0 && (
            <section
              className="project-page__section"
              style={{
                background: "rgba(12, 14, 20, 0.6)",
                border: "1px solid var(--color-border)",
                borderRadius: 20,
                padding: "28px 24px",
                margin: "32px 0",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <Music2 size={18} color="var(--color-accent-primary)" />
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "var(--color-text-primary)" }}>
                  EP Tracklist & Movement Breakdown
                </h3>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {project.tracks.map((t) => (
                  <div
                    key={t.number}
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      padding: "14px 18px",
                      borderRadius: 12,
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid var(--color-border)",
                      gap: 12,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 12,
                          fontWeight: 700,
                          color: "var(--color-accent-primary)",
                        }}
                      >
                        {t.number}
                      </span>
                      <div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: "var(--color-text-primary)" }}>
                          {t.title}
                        </div>
                        <div style={{ fontSize: 13, color: "var(--color-text-tertiary)", marginTop: 2 }}>
                          {t.instrumentation}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <span
                        style={{
                          fontSize: 12,
                          fontFamily: "var(--font-mono)",
                          padding: "3px 10px",
                          borderRadius: 999,
                          background: "rgba(255, 255, 255, 0.06)",
                          color: "var(--color-text-secondary)",
                        }}
                      >
                        {t.mood}
                      </span>
                      <span
                        style={{
                          fontSize: 13,
                          fontFamily: "var(--font-mono)",
                          color: "var(--color-text-primary)",
                          fontWeight: 600,
                        }}
                      >
                        {t.duration}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="project-page__section">
            <p className="eyebrow">Technologies & Discipline Stack</p>
            <div className="project-page__stack">
              {project.stack.map((tool) => (
                <span key={tool} className="tag">
                  {tool}
                </span>
              ))}
            </div>
          </section>

          <section className="project-page__section">
            <p className="eyebrow">Status & Timeline</p>
            <p className="project-page__status">
              {project.status} / {project.year}
            </p>
          </section>

          <section className="project-page__section">
            <p className="eyebrow">Role</p>
            <p className="project-page__status">{project.role}</p>
          </section>

          {related.length > 0 && (
            <section style={{ marginTop: 48, borderTop: "1px solid var(--color-border)", paddingTop: 40 }}>
              <p className="eyebrow">Explore More Work</p>
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
