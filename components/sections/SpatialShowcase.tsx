"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Compass, Shield, Zap, Sparkles } from "lucide-react";
import { sound } from "@/lib/audio";

const SHOWCASE_ITEMS = [
  {
    id: "01",
    slug: "depthwizard",
    name: "DepthWizard",
    category: "Geospatial AI & Single-View 3D Terrain",
    metric: "< 3.2m RMSE Elevation Accuracy",
    tag: "GEOSPATIAL AI & 3D VISION",
    color: "#00f59b",
    desc: "Single-view deep monocular height estimation from satellite passes, calibrated against ISRO Cartosat Digital Elevation Models with real-time 60 FPS Three.js GPU flythrough.",
    href: "/work/depthwizard",
    photoNote: "Western ghats & Mumbai topography calibration pass",
    features: ["PyTorch Metric Depth", "ISRO Cartosat DEM Calibration", "Three.js 60 FPS Flythrough", "16-bit Heightfield Shaders"],
  },
  {
    id: "02",
    slug: "parkeasy",
    name: "ParkEasy",
    category: "Real-Time Smart Parking Operating System",
    metric: "< 80ms Telemetry Latency",
    tag: "MOBILE & REAL-TIME IOT",
    color: "#00d4ff",
    desc: "Full-stack mobile parking operating system with live sensor availability, atomic database slot locks in Supabase, and instant Razorpay checkout.",
    href: "/work/parkeasy",
    photoNote: "Expo mobile client with zone-partitioned WebSockets",
    features: ["Expo React Native", "Supabase Row Locks", "Socket.io Zone Telemetry", "Razorpay Webhooks"],
  },
  {
    id: "03",
    slug: "nsff-2026",
    name: "NSFF 2026",
    category: "Film City Mumbai Stage & Digital Infrastructure",
    metric: "100% Screening Uptime",
    tag: "CREATIVE TECH & LIVE SYSTEMS",
    color: "#ff3b30",
    desc: "Directed on-site technical operations at Film City Mumbai for the National Student Film Festival: DCI playback, projection failovers, and the official public platform.",
    href: "/work/nsff-2026",
    photoNote: "Film City Mumbai screening auditoriums & main stage",
    features: ["Dual-Redundant Playback", "Stage Cue Automation", "Edge Schedule Platform", "Multi-partner Integration"],
  },
];

export function SpatialShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = SHOWCASE_ITEMS[activeIdx];

  const handleSelect = (idx: number) => {
    sound.playClick();
    setActiveIdx(idx);
  };

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #060709 0%, #0c0e14 50%, #060709 100%)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: 24,
        padding: "clamp(2rem, 4vw, 3.5rem)",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 30px 80px -20px rgba(0, 0, 0, 0.8)",
      }}
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${active.color}15, transparent 70%)`,
          pointerEvents: "none",
          transition: "background 0.5s ease",
        }}
      />

      {/* Top Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2.5rem",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: active.color,
              display: "block",
              marginBottom: "0.4rem",
              fontWeight: 600,
            }}
          >
            ✦ SPATIAL ARCHITECTURE // 03 CORE SYSTEMS
          </span>
          <h3
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              margin: 0,
              color: "#fff",
            }}
          >
            Deep Dive Mission Modules
          </h3>
        </div>

        {/* Tab Controls */}
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            background: "rgba(255, 255, 255, 0.04)",
            padding: "4px",
            borderRadius: 999,
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          {SHOWCASE_ITEMS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => handleSelect(idx)}
              onMouseEnter={() => sound.playHover()}
              style={{
                background: activeIdx === idx ? "rgba(255, 255, 255, 0.15)" : "transparent",
                color: activeIdx === idx ? "#fff" : "rgba(255, 255, 255, 0.5)",
                border: "none",
                borderRadius: 999,
                padding: "0.45rem 1rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontWeight: activeIdx === idx ? 600 : 400,
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Showcase Stage */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "3rem",
            alignItems: "center",
          }}
          className="spatial-grid"
        >
          {/* Visual viewport with 3D angle */}
          <div
            style={{
              position: "relative",
              borderRadius: 20,
              overflow: "hidden",
              border: `1px solid ${active.color}35`,
              boxShadow: `0 20px 50px -10px ${active.color}20`,
              minHeight: 380,
              background: "#000",
            }}
          >
            {/* Photo placeholder: replace this div with a real image, e.g. <img src="/photos/[slug].jpg" alt="project photo" />. Real photos TODO from @shastriyakid/Swarvibhaa. */}<div style={{ width: "100%", minHeight: 380, background: "#141820", display: "grid", placeItems: "center", padding: "32px", textAlign: "center" }}><span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", lineHeight: 1.6, color: "rgba(255, 255, 255, 0.45)" }}>{active.photoNote}</span></div>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(0deg, rgba(6,7,9,0.9) 0%, transparent 60%)",
              }}
            />

            <div
              style={{
                position: "absolute",
                bottom: 20,
                left: 20,
                right: 20,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.58rem",
                    letterSpacing: "0.16em",
                    color: active.color,
                    display: "block",
                    marginBottom: 4,
                  }}
                >
                  SYSTEM TELEMETRY
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.82rem",
                    color: "#fff",
                    fontWeight: 600,
                  }}
                >
                  ✦ {active.metric}
                </span>
              </div>

              <a
                href={active.href}
                style={{
                  background: active.color,
                  color: "#000",
                  padding: "0.55rem 1.1rem",
                  borderRadius: 999,
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.62rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                Inspect <ArrowUpRight size={13} />
              </a>
            </div>
          </div>

          {/* Details column */}
          <div style={{ color: "#fff" }}>
            <div
              style={{
                display: "inline-block",
                padding: "0.3rem 0.8rem",
                borderRadius: 999,
                background: `${active.color}15`,
                border: `1px solid ${active.color}40`,
                fontFamily: "var(--font-mono)",
                fontSize: "0.58rem",
                letterSpacing: "0.14em",
                color: active.color,
                marginBottom: "1.2rem",
                textTransform: "uppercase",
              }}
            >
              {active.tag}
            </div>

            <h4
              style={{
                fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                margin: "0 0 0.8rem",
                lineHeight: 1.05,
              }}
            >
              {active.name}
            </h4>

            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "rgba(255, 255, 255, 0.5)",
                marginBottom: "1.2rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {active.category}
            </div>

            <p
              style={{
                fontSize: "0.98rem",
                lineHeight: 1.7,
                color: "rgba(255, 255, 255, 0.75)",
                margin: "0 0 2rem",
              }}
            >
              {active.desc}
            </p>

            <div style={{ marginBottom: "2rem" }}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.62rem",
                  color: "rgba(255, 255, 255, 0.4)",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  marginBottom: "0.8rem",
                }}
              >
                KEY ARCHITECTURAL HIGHLIGHTS:
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem" }}>
                {active.features.map((feat) => (
                  <div
                    key={feat}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.68rem",
                      color: "rgba(255, 255, 255, 0.85)",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <span style={{ color: active.color }}>▸</span> {feat}
                  </div>
                ))}
              </div>
            </div>

            <a
              href={active.href}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "transparent",
                color: "#fff",
                border: "1px solid rgba(255, 255, 255, 0.25)",
                borderRadius: 999,
                padding: "0.8rem 1.6rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.68rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
                fontWeight: 600,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = active.color;
                e.currentTarget.style.color = active.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.25)";
                e.currentTarget.style.color = "#fff";
              }}
            >
              <span>Explore Full Architecture Case Study</span>
              <ArrowUpRight size={15} />
            </a>
          </div>
        </motion.div>
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .spatial-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
