"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useTransform } from "motion/react";
import { useRef } from "react";
import type { Project } from "@/lib/projects";
import { ProjectVisual } from "@/lib/ProjectVisual";

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
      onMouseLeave={handleLeave}
      data-cursor-label="VIEW"
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

      <div className="project-card__meta">
        <motion.h3
          className="project-card__title"
          style={{
            x: useTransform(x, (v) => v * 12),
            y: useTransform(y, (v) => v * 6),
          }}
        >
          {project.title}
        </motion.h3>
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

      <motion.span
        className="project-card__action"
        style={{
          x: useTransform(x, (v) => v * 18),
          y: useTransform(y, (v) => v * 10),
        }}
      >
        View case study <ArrowUpRight size={14} />
      </motion.span>
    </Link>
  );
}