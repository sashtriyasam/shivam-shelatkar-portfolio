"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { projects, type ProjectCategory } from "@/lib/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { sound } from "@/lib/audio";

const FILTER_TABS: { label: string; value: "all" | ProjectCategory }[] = [
  { label: "All Projects", value: "all" },
  { label: "Software & AI", value: "software" },
  { label: "Music & Composition", value: "music" },
  { label: "Creative Tech & Live", value: "creative-tech" },
];

export default function WorkPage() {
  const [filter, setFilter] = useState<"all" | ProjectCategory>("all");

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((p) => p.category === filter);

  const handleTabChange = (val: "all" | ProjectCategory) => {
    sound.playClick();
    setFilter(val);
  };

  return (
    <div className="work" id="work">
      <div className="content-max">
        <header className="work__header">
          <span className="eyebrow">Portfolio Archive</span>
          <motion.h1
            className="work__title display"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Work — Engineering, Music & Creative Systems
          </motion.h1>
          <motion.p
            className="work__intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            From deep-learning height estimation algorithms and real-time mobile operating systems to Indian fusion instrumental EPs, Marathi cinematic orchestration, and live stage direction at Film City Mumbai.
          </motion.p>

          {/* Interactive Filter Pills */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              marginTop: 32,
            }}
          >
            {FILTER_TABS.map((tab) => {
              const isActive = filter === tab.value;
              const count =
                tab.value === "all"
                  ? projects.length
                  : projects.filter((p) => p.category === tab.value).length;

              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => handleTabChange(tab.value)}
                  onMouseEnter={() => sound.playHover()}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 18px",
                    borderRadius: 999,
                    fontSize: 13,
                    fontFamily: "var(--font-mono)",
                    fontWeight: 600,
                    cursor: "pointer",
                    border: `1px solid ${isActive ? "var(--color-accent-primary)" : "var(--color-border)"}`,
                    background: isActive ? "rgba(255, 59, 48, 0.12)" : "rgba(255, 255, 255, 0.03)",
                    color: isActive ? "var(--color-accent-primary)" : "var(--color-text-secondary)",
                    transition: "all 200ms ease",
                  }}
                >
                  <span>{tab.label}</span>
                  <span
                    style={{
                      fontSize: 11,
                      padding: "2px 6px",
                      borderRadius: 999,
                      background: isActive ? "var(--color-accent-primary)" : "rgba(255, 255, 255, 0.08)",
                      color: isActive ? "#ffffff" : "var(--color-text-tertiary)",
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </header>

        <motion.div
          className="work__grid"
          layout
          style={{ marginTop: 40 }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="work__footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            marginTop: 80,
            paddingTop: 40,
            borderTop: "1px solid var(--color-border)",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div>
            <h3 style={{ margin: "0 0 6px", fontSize: 20, fontWeight: 700, color: "var(--color-text-primary)" }}>
              Have an idea or score to commission?
            </h3>
            <p style={{ margin: 0, fontSize: 14, color: "var(--color-text-secondary)" }}>
              Open for full-stack engineering contracts, film scoring, and creative tech collaborations.
            </p>
          </div>

          <a
            href="mailto:shelatkarshivam4@gmail.com"
            className="btn btn--accent"
            onMouseEnter={() => sound.playHover()}
            onClick={() => sound.playClick()}
          >
            shelatkarshivam4@gmail.com
          </a>
        </motion.div>
      </div>
    </div>
  );
}