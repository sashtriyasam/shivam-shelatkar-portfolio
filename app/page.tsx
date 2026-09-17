"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { sound } from "@/lib/audio";
import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { HeroTerrain } from "@/components/hero/HeroTerrain";
import { SpatialShowcase } from "@/components/sections/SpatialShowcase";
import { InteractiveTerminal } from "@/components/sections/InteractiveTerminal";
import { TiltCard } from "@/components/projects/TiltCard";
import { ArrowUpRight, ArrowRight, Sparkles, Terminal, Layers, Compass, Music, Code2, Radio, CheckCircle2 } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const CREDENTIAL_CHIPS = [
  "10 Yrs Classical Tabla (Pt. Mukundraj Deo)",
  "Piano (Trinity College London)",
  "Computer Engineering · Univ of Mumbai",
  "Founder @ Swarvibhaa",
];

const METRICS_STRIP = [
  { value: "07", label: "Works Released", sub: "Software, Music & Live Systems" },
  { value: "10+", label: "Years Classical Taal", sub: "Gurushishya Parampara" },
  { value: "< 3.2m", label: "Geospatial RMSE", sub: "DepthWizard · ISRO Cartosat" },
  { value: "100%", label: "Live Screening Uptime", sub: "Film City Mumbai · NSFF 2026" },
];

const WHAT_I_BUILD = [
  {
    category: "Music",
    icon: Music,
    accent: "#ff7a4d",
    items: [
      "Original Composition & Scoring",
      "Orchestral Arrangement & Voicings",
      "Indian Classical & Fusion Production",
      "Multi-track Mixing & Mastering",
      "Sound Design & Stage Audio Routing",
    ],
  },
  {
    category: "Software & Systems",
    icon: Code2,
    accent: "#00f59b",
    items: [
      "Production Web Applications (Next.js)",
      "Mobile Operating Systems (React Native / Expo)",
      "Real-Time Telemetry & WebSockets (Socket.io)",
      "Transactional Backends (PostgreSQL / Supabase)",
      "AI & Computer Vision (PyTorch / Monocular Depth)",
    ],
  },
  {
    category: "Creative Technology",
    icon: Layers,
    accent: "#00d4ff",
    items: [
      "3D Spatial & GPU Shaders (Three.js / WebGL)",
      "Interactive Audio (Web Audio API)",
      "Live Stage Projection & Playback Cues",
      "Interactive Game Worlds (Unity C#)",
      "Festival Technical Direction",
    ],
  },
  {
    category: "Leadership & Cultural",
    icon: Compass,
    accent: "#ff3b30",
    items: [
      "Founder & Director @ Swarvibhaa",
      "On-Site Technical Head @ NSFF Film City",
      "Student Activity Convening in Thane",
      "Interdisciplinary Artist Collaboration",
      "Cultural Festival Infrastructure",
    ],
  },
];

const NOW_STATUS = [
  {
    area: "Building",
    title: "DepthWizard",
    detail: "Refining monocular height estimation algorithms against ISRO Cartosat DEM data with Three.js flythrough.",
    badge: "AI / GEOSPATIAL",
    badgeColor: "#00f59b",
  },
  {
    area: "Engineering",
    title: "Computer Engineering",
    detail: "Coursework and applied research at University of Mumbai, bridging algorithms and low-latency systems.",
    badge: "ACADEMICS",
    badgeColor: "#00d4ff",
  },
  {
    area: "Music",
    title: "Swarvibhaa Originals",
    detail: "Writing and producing the next suite of Indian fusion and devotional compositions across Mumbai and Gujarat.",
    badge: "COMPOSITION",
    badgeColor: "#ff7a4d",
  },
  {
    area: "Live Tech",
    title: "Stage & Festival Infrastructure",
    detail: "Standardizing failsafe projection switching and edge schedule platforms for large-scale cultural events.",
    badge: "OPERATIONS",
    badgeColor: "#ff3b30",
  },
];

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();
  const reduced = Boolean(shouldReduceMotion);

  // 6 canonical projects alternating Software, Music, Creative Tech
  const selectedWork = [
    projects.find((p) => p.slug === "depthwizard")!,
    projects.find((p) => p.slug === "raatrani")!,
    projects.find((p) => p.slug === "parkeasy")!,
    projects.find((p) => p.slug === "saffron-suraaval")!,
    projects.find((p) => p.slug === "nsff-2026")!,
    projects.find((p) => p.slug === "thevita-mastak")!,
  ].filter(Boolean);

  return (
    <div className="home-container" style={{ position: "relative", minHeight: "100vh", overflowX: "hidden" }}>
      
      {/* ===================== HERO SECTION ===================== */}
      <section
        className="hero-section"
        style={{
          position: "relative",
          minHeight: "92vh",
          display: "flex",
          alignItems: "center",
          padding: "clamp(80px, 12vh, 140px) clamp(20px, 4vw, 40px) 60px",
          overflow: "hidden",
        }}
      >
        {/* Interactive 3D Terrain background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
            opacity: 0.85,
          }}
        >
          <HeroTerrain />
        </div>

        {/* Ambient radial scrim */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at 30% 40%, rgba(6,7,9,0.3) 0%, rgba(6,7,9,0.85) 65%, #060709 100%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        <div className="content-max" style={{ position: "relative", zIndex: 2, width: "100%" }}>
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{ marginBottom: 20 }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 16px",
                borderRadius: 999,
                background: "rgba(255, 59, 48, 0.12)",
                border: "1px solid rgba(255, 59, 48, 0.3)",
                color: "#ff3b30",
                fontSize: 12,
                fontFamily: "var(--font-mono)",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              <Sparkles size={13} /> COMPOSER · ENGINEER · FOUNDER · MUSIC TECHNOLOGIST
            </span>
          </motion.div>

          <motion.h1
            initial={reduced ? undefined : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            style={{
              fontSize: "clamp(42px, 8.5vw, 100px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              margin: "0 0 16px",
              color: "#ffffff",
              textTransform: "uppercase",
            }}
          >
            Shivam Shelatkar
          </motion.h1>

          <motion.p
            initial={reduced ? undefined : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            style={{
              fontSize: "clamp(20px, 3vw, 32px)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              color: "rgba(255, 255, 255, 0.85)",
              margin: "0 0 20px",
              maxWidth: "50ch",
            }}
          >
            Music technologist, composer & engineer.
          </motion.p>

          <motion.p
            initial={reduced ? undefined : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            style={{
              fontSize: "clamp(16px, 1.8vw, 19px)",
              lineHeight: 1.65,
              color: "rgba(255, 255, 255, 0.65)",
              margin: "0 0 32px",
              maxWidth: "64ch",
            }}
          >
            I build at the intersection of music, technology, and culture — from software and interactive systems to compositions, live technical environments, and Swarvibhaa.
          </motion.p>

          {/* Lineage & Credentials Chips */}
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
            style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 36 }}
          >
            {CREDENTIAL_CHIPS.map((chip) => (
              <span
                key={chip}
                style={{
                  padding: "6px 14px",
                  borderRadius: 999,
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  fontSize: 12,
                  fontFamily: "var(--font-mono)",
                  color: "rgba(255, 255, 255, 0.8)",
                  whiteSpace: "nowrap",
                }}
              >
                {chip}
              </span>
            ))}
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            style={{ display: "flex", flexWrap: "wrap", gap: 14 }}
          >
            <Link
              href="/work"
              className="btn btn--accent"
              style={{
                fontSize: 14,
                padding: "14px 28px",
                borderRadius: 999,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
            >
              View Work <ArrowRight size={16} />
            </Link>

            <Link
              href="/about"
              className="btn"
              style={{
                fontSize: 14,
                padding: "14px 26px",
                borderRadius: 999,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
            >
              About Me
            </Link>

            <Link
              href="/cv"
              className="btn"
              style={{
                fontSize: 14,
                padding: "14px 24px",
                borderRadius: 999,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255, 255, 255, 0.03)",
              }}
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
            >
              Curriculum Vitae
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===================== PROOF STRIP / METRICS ===================== */}
      <section
        style={{
          borderTop: "1px solid var(--color-border)",
          borderBottom: "1px solid var(--color-border)",
          background: "rgba(12, 14, 20, 0.7)",
          padding: "36px clamp(20px, 4vw, 40px)",
        }}
      >
        <div className="content-max">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 24,
            }}
          >
            {METRICS_STRIP.map((m, idx) => (
              <motion.div
                key={m.label}
                initial={reduced ? undefined : { opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: EASE }}
                style={{ padding: "0 8px" }}
              >
                <div
                  style={{
                    fontSize: "clamp(32px, 4vw, 44px)",
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    color: "#ffffff",
                    lineHeight: 1,
                  }}
                >
                  {m.value}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "var(--color-text-secondary)",
                    marginTop: 8,
                  }}
                >
                  {m.label}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontFamily: "var(--font-mono)",
                    color: "var(--color-text-tertiary)",
                    marginTop: 2,
                  }}
                >
                  {m.sub}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== SELECTED WORK (EDITORIAL GRID) ===================== */}
      <section
        id="selected-work"
        style={{
          padding: "100px clamp(20px, 4vw, 40px)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="content-max">
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, gap: 20 }}>
            <div>
              <span className="eyebrow">Selected Canonical Work</span>
              <h2
                style={{
                  fontSize: "clamp(28px, 4vw, 48px)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  margin: "0 0 12px",
                  color: "#ffffff",
                }}
              >
                Software, Music & Creative Systems
              </h2>
              <p style={{ margin: 0, fontSize: 16, color: "var(--color-text-secondary)", maxWidth: "60ch" }}>
                A curated intersection: deep learning height estimation, real-time IoT operating systems, festival live tech, and commercial compositions.
              </p>
            </div>

            <Link
              href="/work"
              className="btn btn--accent"
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
            >
              All 7 Works with Audio & Diagrams <ArrowRight size={15} />
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 28,
            }}
          >
            {selectedWork.map((project, idx) => (
              <motion.div
                key={project.slug}
                initial={reduced ? undefined : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: EASE }}
              >
                <TiltCard
                  accentColor={project.visualAccent || "#ff3b30"}
                  style={{ height: "100%" }}
                >
                  <ProjectCard project={project} />
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== WHAT I BUILD ===================== */}
      <section
        style={{
          padding: "100px clamp(20px, 4vw, 40px)",
          borderBottom: "1px solid var(--color-border)",
          background: "rgba(8, 10, 14, 0.5)",
        }}
      >
        <div className="content-max">
          <div style={{ marginBottom: 54 }}>
            <span className="eyebrow">Scope & Practice</span>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                margin: "0 0 12px",
                color: "#ffffff",
              }}
            >
              What I Build
            </h2>
            <p style={{ margin: 0, fontSize: 16, color: "var(--color-text-secondary)", maxWidth: "60ch" }}>
              Disciplined systems from the acoustic studio to production cloud runtimes.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: 24,
            }}
          >
            {WHAT_I_BUILD.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.category}
                  initial={reduced ? undefined : { opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: EASE }}
                  style={{
                    padding: "28px 24px",
                    borderRadius: 20,
                    background: "rgba(12, 14, 20, 0.7)",
                    border: "1px solid var(--color-border)",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: `${pillar.accent}18`,
                      border: `1px solid ${pillar.accent}35`,
                      color: pillar.accent,
                      marginBottom: 18,
                    }}
                  >
                    <Icon size={20} />
                  </div>

                  <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 16px", color: "#ffffff" }}>
                    {pillar.category}
                  </h3>

                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10, flexGrow: 1 }}>
                    {pillar.items.map((item) => (
                      <li
                        key={item}
                        style={{
                          fontSize: 13,
                          color: "var(--color-text-secondary)",
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 8,
                          lineHeight: 1.5,
                        }}
                      >
                        <span style={{ color: pillar.accent, fontSize: 14 }}>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          {/* Lineage & Training Callout */}
          <div
            style={{
              marginTop: 40,
              padding: "24px 28px",
              borderRadius: 18,
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid var(--color-border)",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 20,
            }}
          >
            <div>
              <div style={{ fontSize: 12, fontFamily: "var(--font-mono)", color: "#ff7a4d", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                TRAINING & CLASSICAL LINEAGE
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#ffffff", marginTop: 4 }}>
                10 Years Tabla under Pandit Mukundraj Deo · 6 Years Piano via Trinity College London
              </div>
            </div>

            <Link
              href="/about"
              className="link-underline"
              style={{ fontSize: 13, fontFamily: "var(--font-mono)" }}
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
            >
              Read Full Story & Lineage →
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== SPATIAL SHOWCASE ===================== */}
      <section
        style={{
          padding: "100px clamp(20px, 4vw, 40px)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="content-max">
          <div style={{ marginBottom: 36 }}>
            <span className="eyebrow">Deep Dive Systems</span>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                margin: "0 0 10px",
                color: "#ffffff",
              }}
            >
              Spatial Systems & Architecture
            </h2>
            <p style={{ margin: 0, fontSize: 16, color: "var(--color-text-secondary)" }}>
              Interactive telemetry inspection for DepthWizard, ParkEasy, and NSFF Film City Mumbai.
            </p>
          </div>

          <SpatialShowcase />
        </div>
      </section>

      {/* ===================== COMMAND WORKSTATION CONSOLE ===================== */}
      <section
        style={{
          padding: "90px clamp(20px, 4vw, 40px)",
          borderBottom: "1px solid var(--color-border)",
          background: "rgba(6, 7, 9, 0.75)",
        }}
      >
        <div className="content-max">
          <div style={{ marginBottom: 32 }}>
            <span className="eyebrow">Interactive CLI Workstation</span>
            <h2
              style={{
                fontSize: "clamp(24px, 3.5vw, 38px)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                margin: "0 0 10px",
                color: "#ffffff",
              }}
            >
              Developer Console
            </h2>
            <p style={{ margin: 0, fontSize: 15, color: "var(--color-text-secondary)" }}>
              Direct terminal access for engineers and recruiters. Type commands or click quick action chips.
            </p>
          </div>

          <InteractiveTerminal />
        </div>
      </section>

      {/* ===================== "NOW" LIVE STATUS RADAR ===================== */}
      <section
        style={{
          padding: "90px clamp(20px, 4vw, 40px)",
          borderBottom: "1px solid var(--color-border)",
          background: "rgba(10, 12, 16, 0.4)",
        }}
      >
        <div className="content-max">
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <span
              style={{
                display: "inline-block",
                width: 9,
                height: 9,
                borderRadius: "50%",
                background: "#00f59b",
                boxShadow: "0 0 12px #00f59b",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "#00f59b",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              LIVE RADAR · MUMBAI
            </span>
          </div>

          <h2
            style={{
              fontSize: "clamp(26px, 4vw, 40px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              margin: "0 0 36px",
              color: "#ffffff",
            }}
          >
            What I&apos;m Actively Building Now
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 20,
            }}
          >
            {NOW_STATUS.map((item, idx) => (
              <motion.div
                key={item.area}
                initial={reduced ? undefined : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.07, ease: EASE }}
                style={{
                  padding: 24,
                  borderRadius: 18,
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid var(--color-border)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        color: "var(--color-text-tertiary)",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {item.area}
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        fontFamily: "var(--font-mono)",
                        padding: "2px 8px",
                        borderRadius: 999,
                        background: `${item.badgeColor}18`,
                        border: `1px solid ${item.badgeColor}35`,
                        color: item.badgeColor,
                        fontWeight: 600,
                      }}
                    >
                      {item.badge}
                    </span>
                  </div>

                  <h3 style={{ fontSize: 17, fontWeight: 700, margin: "0 0 8px", color: "#ffffff" }}>
                    {item.title}
                  </h3>

                  <p style={{ fontSize: 13, lineHeight: 1.6, color: "var(--color-text-secondary)", margin: 0 }}>
                    {item.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FINAL HIGH-IMPACT CALL TO ACTION ===================== */}
      <section
        style={{
          padding: "110px clamp(20px, 4vw, 40px)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(255, 59, 48, 0.08) 0%, rgba(0, 212, 255, 0.03) 50%, transparent 80%)",
            pointerEvents: "none",
          }}
        />

        <div className="content-max" style={{ position: "relative", zIndex: 2 }}>
          <span className="eyebrow" style={{ color: "var(--color-accent-primary)" }}>
            Next Steps
          </span>

          <h2
            style={{
              fontSize: "clamp(32px, 5.5vw, 64px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              margin: "0 0 16px",
              color: "#ffffff",
            }}
          >
            Have something worth building?
          </h2>

          <p
            style={{
              fontSize: "clamp(16px, 2vw, 20px)",
              color: "var(--color-text-secondary)",
              maxWidth: "52ch",
              margin: "0 auto 36px",
              lineHeight: 1.6,
            }}
          >
            Music. Software. Creative technology. Let&apos;s engineer and score it together.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 16,
              marginBottom: 44,
            }}
          >
            <Link
              href="/contact"
              className="btn btn--accent"
              style={{
                fontSize: 15,
                padding: "16px 36px",
                borderRadius: 999,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
            >
              Start a Project <ArrowRight size={16} />
            </Link>

            <Link
              href="/cv"
              className="btn"
              style={{
                fontSize: 15,
                padding: "16px 32px",
                borderRadius: 999,
              }}
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
            >
              Download CV
            </Link>
          </div>

          <a
            href="mailto:shelatkarshivam4@gmail.com"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(16px, 2.5vw, 24px)",
              color: "var(--color-text-primary)",
              textDecoration: "none",
              borderBottom: "1px solid var(--color-border-strong)",
              paddingBottom: 4,
              display: "inline-block",
              transition: "border-color 200ms ease, color 200ms ease",
            }}
            onMouseEnter={() => sound.playHover()}
            onClick={() => sound.playClick()}
          >
            shelatkarshivam4@gmail.com
          </a>
        </div>
      </section>

    </div>
  );
}
