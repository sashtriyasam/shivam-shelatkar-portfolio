"use client";

import { motion } from "motion/react";
import {
  Music,
  Layers,
  Cpu,
  Users,
  ArrowRight,
  FileText,
  Code2,
  Terminal as _Terminal,
  Globe as _Globe,
  Award as _Award,
} from "lucide-react";
import Link from "next/link";
import { sound } from "@/lib/audio";
import { InteractiveTerminal } from "@/components/sections/InteractiveTerminal";

const ease = [0.16, 1, 0.3, 1] as const;
const viewport = { once: true, margin: "-80px" } as const;

const SKILL_GROUPS = [
  {
    title: "Programming Languages",
    skills: [
      "C",
      "C++",
      "C#",
      "Python",
      "TypeScript",
      "JavaScript",
      "SQL",
      "GLSL",
    ],
  },
  {
    title: "Web & Mobile Frameworks",
    skills: [
      "Next.js (App Router)",
      "React",
      "React Native (Expo)",
      "Node.js",
      "Express",
      "FastAPI",
      "Tailwind CSS",
    ],
  },
  {
    title: "Systems & Infrastructure",
    skills: [
      "Supabase",
      "PostgreSQL",
      "Socket.io",
      "Redis",
      "Docker",
      "Git",
      "GDAL / Rasterio",
      "Linux",
    ],
  },
  {
    title: "Creative Technology & 3D",
    skills: [
      "Three.js",
      "React Three Fiber",
      "Unity (C#)",
      "WebGL",
      "Web Audio API",
      "DCI Playback",
      "Stage Routing",
    ],
  },
  {
    title: "Composition & Production",
    skills: [
      "Orchestral Voicing",
      "Logic Pro",
      "Ableton Live",
      "Sibelius",
      "Tabla & Taal Systems",
      "Western Harmony",
    ],
  },
  {
    title: "Currently Exploring",
    skills: [
      "Monocular Depth Estimation",
      "ISRO Geospatial AI",
      "Spatial Audio",
      "Real-Time Creative Coding",
    ],
  },
];

const PILLARS = [
  {
    icon: Music,
    index: "01",
    title: "Music Lineage & Discipline",
    text: "Ten years of intensive tabla training under Pandit Mukundraj Deo (Punjab & Farrukhabad gharana nuances, layakaari, accompaniment). Six years of classical piano via Trinity College London. Timing first, decoration last.",
  },
  {
    icon: Layers,
    index: "02",
    title: "Swarvibhaa Ecosystem",
    text: "Swarvibhaa � pan-India collective for Hindustani, Western classical, dance Swarvibhaa 2014 pan-India collective for Hindustani, Western classical, dance \Swarvibhaa — pan-India collective for Hindustani, Western classical, dance & visual art. Mumbai · Delhi · Gujarat. Co-founder: Sharvee Kulkarni, Bharatanatyam dancer. Founded 2023. visual art. Mumbai 00b7 Delhi 00b7 Gujarat. Co-founder: Sharvee Kulkarni, Bharatanatyam dancer. Founded 2023. visual art. Mumbai � Delhi � Gujarat. Co-founder: Sharvee Kulkarni, Bharatanatyam dancer. Founded 2023.",
  },
  {
    icon: Cpu,
    index: "03",
    title: "Systems & Creative Tech",
    text: "NSFF 2026 tech head. ParkEasy stack: Next.js, React, Supabase, PostgreSQL, Socket.io, Docker. ABVP Thane convenor.",
  },
  {
    icon: Users,
    index: "04",
    title: "Community & Leadership",
    text: "Convenor of student initiatives in Thane, coordinating large-scale cultural programs, tech workshops, and youth forums across colleges and universities in Maharashtra.",
  },
];

const TIMELINE = [
  {
    period: "Lineage",
    title: "Tabla & Classical Piano",
    desc: "A decade of classical taal, improvisation, and Western harmonic foundation that directly informs my engineering precision.",
  },
  {
    period: "2023",
    title: "Founded Swarvibhaa",
    desc: "Launched Swarvibhaa to produce original fusion compositions, score films, and host collaborative performances across cities.",
  },
  {
    period: "2025–2026",
    title: "DepthWizard & ParkEasy",
    desc: "Engineered geospatial computer vision pipelines and shipped full-stack real-time mobile parking infrastructure.",
  },
  {
    period: "2026",
    title: "NSFF Technical Direction",
    desc: "Directed on-site technical operations at Film City Mumbai for the National Student Film Festival across screening auditoriums.",
  },
  {
    period: "Ongoing",
    title: "Computer Engineering · Univ of Mumbai",
    desc: "Pursuing Bachelor of Engineering in Computer Engineering at the University of Mumbai, applying core algorithms to creative systems.",
  },
];

export default function AboutPage() {
  return (
    <div className="about">
      <div className="content-max">
        {/* Header */}
        <header className="about__header">
          <span className="eyebrow">Identity & Background</span>
          <motion.h1
            className="about__title display"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            Namaste, I am Shivam. Composer and builder.
          </motion.h1>
        </header>

        {/* Intro paragraph */}
        <p className="about__lead">
          Music composer and Unity developer from Thane, Mumbai. Computer
          Engineering, University of Mumbai. Founder at Swarvibhaa.
        </p>

        {/* Lead Bio Grid */}
        <div className="about__grid">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.8, ease }}
          >
            <p className="about__lead">
              Thane-born, Mumbai-grown. I build at the intersection of music,
              technology, and culture — from software and interactive systems to
              compositions, live technical environments, and Swarvibhaa.
            </p>
            <p className="about__copy">
              I compose for stage, screen, and global streaming; develop
              real-time web, mobile, and geospatial AI tools; and direct live
              technical infrastructure for national festivals. Where classical
              musicians see rhythm, I see algorithms; where engineers see data,
              I hear harmony.
            </p>
            <aside className="about__facts" aria-label="Snapshot">
              <span className="about__fact">Thane — Mumbai</span>
              <span className="about__fact">
                Computer Engineering · Univ of Mumbai
              </span>
              <span className="about__fact">Founder @ Swarvibhaa</span>
            </aside>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            style={{
              padding: "24px 28px",
              borderRadius: 20,
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid var(--color-border)",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <h2 className="about__subtitle" style={{ margin: 0, fontSize: 18 }}>
              Quick Credentials
            </h2>
            <ul
              style={{
                margin: 0,
                paddingLeft: 20,
                fontSize: 14,
                lineHeight: 1.8,
                color: "var(--color-text-secondary)",
              }}
            >
              <li>
                <strong>Tabla:</strong> 10 years with Pandit Mukundraj Deo
              </li>
              <li>
                <strong>Piano:</strong> 6 years through Trinity College London
              </li>
              <li>
                <strong>Degree:</strong> B.E. Computer Engineering, University
                of Mumbai
              </li>
              <li>
                <strong>Live Tech:</strong> Technical Head, NSFF 2026 at Film
                City Mumbai
              </li>
              <li>
                <strong>Ecosystem:</strong> Founder of Swarvibhaa (est. 2023)
              </li>
            </ul>

            <div style={{ marginTop: "auto", paddingTop: 12 }}>
              <Link
                href="/cv"
                className="btn btn--accent"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  display: "inline-flex",
                  gap: 8,
                }}
                onMouseEnter={() => sound.playHover()}
                onClick={() => sound.playClick()}
              >
                <FileText size={15} /> View Full Curriculum Vitae
              </Link>
            </div>
          </motion.div>
        </div>

        {/* 4 Core Pillars */}
        <section className="about__interests" style={{ marginTop: 64 }}>
          <motion.div
            className="about__interests-head"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7, ease }}
          >
            <h2 className="about__subtitle">Four Pillars of Practice</h2>
            <p className="about__interests-kicker">
              <span className="about__kicker-line" />
              <span>Music · Software · Creative Tech · Leadership</span>
            </p>
          </motion.div>

          <div className="about__cards">
            {PILLARS.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  className="about__card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport}
                  transition={{ duration: 0.6, delay: i * 0.08, ease }}
                >
                  <span className="about__card-index" aria-hidden="true">
                    {item.index}
                  </span>
                  <div className="about__card-icon">
                    <Icon size={24} />
                  </div>
                  <h3 className="about__card-title">{item.title}</h3>
                  <p className="about__card-text">{item.text}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Comprehensive Technical Skills Matrix */}
        <section style={{ margin: "80px 0" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7, ease }}
            style={{ marginBottom: 32 }}
          >
            <span className="eyebrow">Engineering Matrix</span>
            <h2
              className="about__subtitle"
              style={{ fontSize: "clamp(24px, 4vw, 36px)" }}
            >
              Technical Competencies & Systems Stack
            </h2>
            <p
              style={{
                margin: "8px 0 0",
                fontSize: 15,
                color: "var(--color-text-secondary)",
                maxWidth: "60ch",
              }}
            >
              A dual foundation: algorithmic rigour from computer engineering
              paired with creative audio processing and spatial 3D environments.
            </p>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 20,
            }}
          >
            {SKILL_GROUPS.map((group, idx) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{ duration: 0.5, delay: idx * 0.06, ease }}
                style={{
                  padding: 24,
                  borderRadius: 18,
                  background: "rgba(12, 14, 20, 0.7)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <h3
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    margin: "0 0 14px",
                    color: "var(--color-text-primary)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <Code2 size={16} color="var(--color-accent-primary)" />
                  {group.title}
                </h3>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="tag"
                      style={{ fontSize: 12, padding: "4px 10px" }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Spoken Languages */}
        <section className="about__tools" style={{ marginBottom: 64 }}>
          <motion.div
            className="about__tools-head"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7, ease }}
          >
            <h2 className="about__subtitle">Spoken Languages</h2>
            <span className="about__tools-line" aria-hidden="true" />
          </motion.div>
          <motion.p
            className="about__tools-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7, delay: 0.1, ease }}
          >
            English, Marathi, Hindi, and Malayalam, with elementary Gujarati. I
            write, direct, and collaborate across these languages for stage,
            screen, and cross-cultural ensembles.
          </motion.p>
        </section>

        {/* Chronological Trajectory */}
        <section className="about__interests" aria-label="Timeline">
          <motion.div
            className="about__interests-head"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7, ease }}
          >
            <h2 className="about__subtitle">Chronology & Trajectory</h2>
            <p className="about__interests-kicker">
              <span className="about__kicker-line" />
              <span>Tradition → Systems → Live Operations</span>
            </p>
          </motion.div>

          <div className="about__cards">
            {TIMELINE.map((t, i) => (
              <motion.div
                key={t.title}
                className="about__card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
              >
                <span className="about__card-index" aria-hidden="true">
                  {t.period}
                </span>
                <h3 className="about__card-title">{t.title}</h3>
                <p className="about__card-text">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Interactive Terminal */}
        <section style={{ margin: "80px 0" }} aria-label="Interactive terminal">
          <InteractiveTerminal />
        </section>

        {/* Bottom CTA */}
        <section
          style={{
            margin: "80px 0 40px",
            padding: "48px 32px",
            borderRadius: 24,
            background:
              "linear-gradient(135deg, rgba(255, 59, 48, 0.08) 0%, rgba(0, 212, 255, 0.04) 100%)",
            border: "1px solid var(--color-border)",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(24px, 4vw, 36px)",
              fontWeight: 800,
              margin: "0 0 12px",
              color: "var(--color-text-primary)",
            }}
          >
            Let&apos;s build something exceptional.
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "var(--color-text-secondary)",
              maxWidth: "55ch",
              margin: "0 auto 28px",
              lineHeight: 1.6,
            }}
          >
            Whether you need custom software systems, a film or theatre score,
            festival live technical direction, or Swarvibhaa collaborations.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 14,
            }}
          >
            <Link
              href="/work"
              className="btn"
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
            >
              Explore Selected Work <ArrowRight size={15} />
            </Link>

            <Link
              href="/contact"
              className="btn btn--accent"
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
            >
              Start a Project
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
