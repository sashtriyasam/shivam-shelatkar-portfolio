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
    category: "ISRO Geospatial Intelligence Canvas",
    metric: "40% Faster Mission Planning",
    tag: "DEFENSE & AEROSPACE",
    color: "#00f59b",
    desc: "Merging real-time satellite orbital passes, high-res topographic elevation meshes, and unit telemetry into a single zero-latency 3D operational picture.",
    href: "/work/depthwizard",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    features: ["3D Terrain Mesh", "Satellite Layering", "Mission Markers", "Sub-second Querying"],
  },
  {
    id: "02",
    slug: "projection-ai",
    name: "Projection AI",
    category: "Predictive Machine Learning Engine",
    metric: "22% Forecast Precision Lift",
    tag: "FINTECH & ALGORITHMS",
    color: "#00d4ff",
    desc: "A tactile financial simulation workspace where executive teams test macroeconomic shocks against multi-billion dollar balance sheets with real-time feedback.",
    href: "/work/projection-ai",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    features: ["Confidence Corridors", "Scenario Trees", "Dynamic Heatmaps", "Live Backtesting"],
  },
  {
    id: "03",
    slug: "park-easy",
    name: "ParkEasy",
    category: "Urban IoT Telemetry Operating System",
    metric: "30% Drop in Cruising Latency",
    tag: "CIVIC MOBILITY",
    color: "#ff3b30",
    desc: "Large-scale urban infrastructure control plane unifying thousands of ground sensor feeds, surge-demand pricing, and high-frequency operator dispatch.",
    href: "/work/park-easy",
    image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=1200&auto=format&fit=crop",
    features: ["15+ City Hubs", "Dynamic Spot Pricing", "IoT Fleet Telemetry", "Driver Wayfinding"],
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
            <img
              src={active.image}
              alt={active.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                minHeight: 380,
                filter: "contrast(1.08) brightness(0.9)",
              }}
            />
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
