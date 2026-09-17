"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useTransform } from "motion/react";
import { useRef } from "react";
import type { Project } from "@/lib/projects";
import { ProjectVisual } from "@/lib/ProjectVisual";
import { sound } from "@/lib/audio";

const ease = [0.16, 1, 0.3, 1] as const;

export function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const handleMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const max = Math.max(rect.width, rect.height) * 0.5;
    x.set(dx / max);
    y.set(dy / max);
    rotateX.set((dy / max) * -4);
    rotateY.set((dx / max) * 4);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <Link
      href={`/work/${project.slug}`}
      className="project-card"
      prefetch={false}
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseEnter={() => sound.playHover()}
      onClick={() => sound.playClick()}
      onMouseLeave={handleLeave}
      data-cursor-label="VIEW"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        position: "relative",
      }}
    >
      <div className="project-card__visual" ref={visualRef}>
        <motion.div
          style={{
            rotateX,
            rotateY,
            x: useTransform(x, (v) => v * 8),
            y: useTransform(y, (v) => v * 8),
          }}
          transition={{ duration: 0.1, ease }}
        >
          <ProjectVisual
            visual={project.visual}
            accent={project.visualAccent}
            secondary={project.visualSecondary}
            tertiary={project.visualTertiary}
          />
        </motion.div>
      </div>

      <div style={{ padding: "0 4px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "14px 0 8px" }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: project.visualAccent || "var(--color-accent-primary)",
              fontWeight: 600,
            }}
          >
            {project.categoryLabel}
          </span>
          <span className="tag" style={{ fontSize: 11, padding: "2px 8px" }}>
            {project.year}
          </span>
        </div>

        <div className="project-card__meta" style={{ marginTop: 0 }}>
          <motion.h3
            className="project-card__title"
            style={{
              x: useTransform(x, (v) => v * 12),
              y: useTransform(y, (v) => v * 6),
            }}
          >
            {project.title}
          </motion.h3>
        </div>

        <p className="project-card__summary" style={{ flexGrow: 1, margin: "8px 0 16px" }}>
          {project.summary}
        </p>

        <div className="project-card__tags" style={{ marginBottom: 16 }}>
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>

        <motion.span
          className="project-card__action"
          style={{
            x: useTransform(x, (v) => v * 18),
            y: useTransform(y, (v) => v * 10),
            marginTop: "auto",
          }}
        >
          View case study <ArrowUpRight size={14} />
        </motion.span>
      </div>
    </Link>
  );
}