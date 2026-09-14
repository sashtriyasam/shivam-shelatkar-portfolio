"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import type { Project } from "@/lib/projects";
import { ProjectVisual } from "@/lib/ProjectVisual";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="project-card"
      prefetch={false}
    >
      <div className="project-card__visual">
        <motion.div
          whileHover={{ translateY: -4, rotate: -1 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
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
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
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
        whileHover={{ opacity: 1 }}
        initial={{ opacity: 0.7 }}
        transition={{ duration: 0.2 }}
      >
        View case study <ArrowUpRight size={14} />
      </motion.span>
    </Link>
  );
}