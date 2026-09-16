"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowDown, Mail, Github, Linkedin } from "lucide-react";
import { CrowdCanvas } from "@/components/sections/CrowdCanvas";

const HeroTerrain = dynamic(
  () => import("@/components/hero/HeroTerrain").then((m) => m.HeroTerrain),
  { ssr: false }
);

const FEATURED_PROJECTS = [
  {
    id: "01",
    slug: "depthwizard",
    title: "DepthWizard",
    subtitle: "ISRO-DEPTHWIZ · Geospatial Intelligence",
    headline: "Unified geospatial operations canvas for high-stakes field decisions",
    description: "Fuses satellite imagery, high-resolution terrain meshes, and live mission tracking into a single interactive WebGL viewport. Built for operators who need instant situational awareness without cognitive friction.",
    tags: ["Geospatial", "ISRO", "Three.js", "Mapbox GL", "Next.js"],
    year: "2024",
    stats: "40% Faster Decision Latency",
    href: "/work/depthwizard",
    previewImg: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "02",
    slug: "projection-ai",
    title: "Projection AI",
    subtitle: "Fintech & ML · Predictive Revenue Engine",
    headline: "Turning abstract forecast equations into a tactile decision workspace",
    description: "Interactive predictive modeling engine empowering leadership to simulate market scenarios in real time. Features dynamic confidence corridors, sensitivity heatmaps, and zero-latency recalculations.",
    tags: ["Data Viz", "D3.js", "Machine Learning", "React", "TypeScript"],
    year: "2024",
    stats: "22% Forecast Precision Lift",
    href: "/work/projection-ai",
    previewImg: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "03",
    slug: "park-easy",
    title: "ParkEasy",
    subtitle: "Urban Tech & IoT · Smart Parking OS",
    headline: "City-scale real-time spot allocation and operator control plane",
    description: "Connected urban mobility platform uniting thousands of IoT sensor telemetry streams, dynamic occupancy pricing, and driver-facing turn-by-turn guidance across 15+ central commercial hubs.",
    tags: ["IoT Telemetry", "Mapbox GL", "Mobile OS", "Node.js"],
    year: "2023",
    stats: "30% Drop in Cruising Time",
    href: "/work/park-easy",
    previewImg: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=1200&auto=format&fit=crop"
  }
];

const ARCHIVE_PROJECTS = [
  {
    id: "04",
    title: "Decide.ed",
    category: "Design Systems & Editorial",
    description: "An open manual examining decision friction and component state clarity in enterprise systems.",
    year: "2023",
    href: "https://decided.cargo.site",
    external: true
  },
  {
    id: "05",
    title: "2 by 2 Magazine",
    category: "Editorial Design & Layout",
    description: "Curated publication featuring modular bento spreads, custom typography, and longform essays.",
    year: "2023",
    href: "/work",
    external: false
  },
  {
    id: "06",
    title: "India 2036 Olympic Identity",
    category: "Speculative Identity & Spatial",
    description: "Speculative identity system, bilingual wayfinding protocols, and generative broadcast graphics.",
    year: "2022",
    href: "/work",
    external: false
  }
];

const PRINCIPLES = [
  {
    num: "01",
    title: "Uncover the why before shaping the how.",
    body: "Interfaces cluttered with endless knobs usually conceal poorly understood problems. When you isolate the true human bottleneck, the solution crystallizes with striking clarity and minimal UI."
  },
  {
    num: "02",
    title: "Code is a design material, not just an output.",
    body: "Static mockups cannot simulate network delay, frame pacing, tactile springs, or responsive ergonomics. Designing with live code ensures that craft survives the journey from canvas to production."
  },
  {
    num: "03",
    title: "Calm interfaces amplify human focus.",
    body: "Modern tools constantly shout for attention. The highest form of digital craftsmanship is quiet clarity: density without clutter, speed without disorientation, power without anxiety."
  }
];

export default function HomePage() {
  const [time, setTime] = useState("--:--");
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata"
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: Math.round((e.clientX / window.innerWidth) * 100),
        y: Math.round((e.clientY / window.innerHeight) * 100)
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const easeTransition = [0.16, 1, 0.3, 1] as const;

  return (
    <div className="home-root" style={{ background: "var(--color-paper)", color: "var(--color-ink)", position: "relative", overflowX: "hidden" }}>
      <style>{`
        .home-root {
          font-family: var(--font-body);
          --accent-red: #d60004;
          --line-subtle: #eaeaea;
        }

        .spotlight-glow {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background: radial-gradient(750px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(214, 0, 4, 0.04), transparent 65%);
          transition: background 0.15s ease-out;
        }

        .hero-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 clamp(20px, 4.5vw, 72px);
          height: 54px;
          border-bottom: 1px solid var(--color-line);
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(12px);
          position: sticky;
          top: 0;
          z-index: 50;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .hero-nav {
          display: flex;
          align-items: center;
          gap: 1.8rem;
        }

        .hero-nav a {
          text-decoration: none;
          color: var(--color-ink);
          position: relative;
          padding: 6px 0;
          transition: color 0.2s ease;
        }

        .hero-nav a::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0;
          height: 1.5px;
          background: var(--accent-red);
          transition: width 0.22s var(--ease);
        }

        .hero-nav a:hover {
          color: var(--accent-red);
        }

        .hero-nav a:hover::after {
          width: 100%;
        }

        .hero-section {
          min-height: calc(100vh - 54px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 3.5rem clamp(20px, 4.5vw, 72px) 2rem;
          position: relative;
          z-index: 1;
        }

        .hero-center {
          max-width: 1240px;
          width: 100%;
          margin: auto 0;
        }

        .hero-kicker-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.45rem 0.95rem;
          border-radius: 999px;
          border: 1px solid var(--color-line);
          background: rgba(255, 255, 255, 0.9);
          font-family: var(--font-mono);
          font-size: 0.64rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-ink);
          margin-bottom: 2rem;
        }

        .pulse-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.6);
          animation: statusPulse 2s infinite;
        }

        @keyframes statusPulse {
          0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.6); }
          70% { box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
          100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }

        .hero-title {
          font-size: clamp(3.2rem, 8.5vw, 8.4rem);
          font-weight: 700;
          line-height: 0.92;
          letter-spacing: -0.045em;
          margin: 0;
          color: var(--color-ink);
        }

        .hero-title .italic-accent {
          font-family: var(--font-display);
          font-style: italic;
          font-weight: 400;
          color: var(--accent-red);
          letter-spacing: -0.02em;
        }

        .hero-bio {
          font-size: clamp(1.1rem, 2.2vw, 1.6rem);
          line-height: 1.5;
          letter-spacing: -0.02em;
          color: #4a4a4a;
          max-width: 46ch;
          margin: 2rem 0 2.5rem;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: var(--color-ink);
          color: var(--color-paper);
          padding: 0.85rem 1.6rem;
          border-radius: 999px;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          font-weight: 600;
          transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
        }

        .btn-primary:hover {
          background: var(--accent-red);
          transform: translateY(-2px);
          box-shadow: 0 10px 24px -8px rgba(214, 0, 4, 0.4);
        }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: transparent;
          color: var(--color-ink);
          border: 1px solid var(--color-line);
          padding: 0.85rem 1.6rem;
          border-radius: 999px;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .btn-secondary:hover {
          border-color: var(--color-ink);
          background: rgba(36, 36, 36, 0.04);
          transform: translateY(-2px);
        }

        .hero-footer-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 2rem;
          border-top: 1px solid var(--color-line);
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-ui);
        }

        .section-shell {
          padding: 6.5rem clamp(20px, 4.5vw, 72px);
          border-top: 1px solid var(--color-line);
          position: relative;
          z-index: 1;
        }

        .section-container {
          max-width: 1240px;
          margin: 0 auto;
        }

        .section-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 3.5rem;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .section-label {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--accent-red);
          display: block;
          margin-bottom: 0.6rem;
          font-weight: 600;
        }

        .section-heading {
          font-size: clamp(2rem, 4.5vw, 3.8rem);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.04em;
          margin: 0;
        }

        .work-list {
          display: flex;
          flex-direction: column;
          gap: 2.2rem;
        }

        .work-card {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          border: 1px solid var(--color-line);
          border-radius: 20px;
          overflow: hidden;
          background: var(--color-paper);
          text-decoration: none;
          color: inherit;
          transition: transform 0.35s var(--ease), border-color 0.35s ease, box-shadow 0.35s ease;
        }

        .work-card:hover {
          transform: translateY(-4px);
          border-color: var(--color-ink);
          box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.08);
        }

        .work-card-media {
          position: relative;
          overflow: hidden;
          background: #0d0d0d;
          min-height: 380px;
        }

        .work-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: grayscale(40%);
          transition: filter 0.5s ease, transform 0.6s var(--ease);
        }

        .work-card:hover .work-card-img {
          filter: grayscale(0%);
          transform: scale(1.03);
        }

        .work-card-info {
          padding: clamp(2rem, 3.5vw, 3.2rem);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .work-badge-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.2rem;
        }

        .work-category {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-ui);
        }

        .work-year {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.12em;
          color: var(--color-ui);
        }

        .work-title {
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          font-weight: 700;
          letter-spacing: -0.035em;
          line-height: 1.08;
          margin: 0 0 0.8rem;
          color: var(--color-ink);
        }

        .work-headline {
          font-size: 1rem;
          font-weight: 500;
          line-height: 1.5;
          color: #333;
          margin-bottom: 1rem;
        }

        .work-desc {
          font-size: 0.9rem;
          line-height: 1.65;
          color: #666;
          margin: 0 0 1.5rem;
        }

        .work-tag-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
          margin-bottom: 2rem;
        }

        .work-tag {
          font-family: var(--font-mono);
          font-size: 0.58rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.32rem 0.65rem;
          border-radius: 999px;
          border: 1px solid var(--color-line);
          color: var(--color-ui);
          background: var(--color-paper);
        }

        .work-cta-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1.2rem;
          border-top: 1px solid var(--color-line);
        }

        .work-metric {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: var(--accent-red);
        }

        .work-link-text {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: var(--color-ink);
        }

        .archive-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.2rem;
          margin-top: 2rem;
        }

        .archive-card {
          border: 1px solid var(--color-line);
          border-radius: 16px;
          padding: 1.8rem;
          background: var(--color-paper);
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 220px;
          transition: all 0.25s ease;
        }

        .archive-card:hover {
          border-color: var(--color-ink);
          transform: translateY(-3px);
          background: var(--color-paper-2);
        }

        .philosophy-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.6rem;
        }

        .philosophy-item {
          border: 1px solid var(--color-line);
          border-radius: 16px;
          padding: 2.2rem;
          background: var(--color-paper);
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .philosophy-num {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          color: var(--accent-red);
          font-weight: 600;
        }

        .philosophy-title {
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: -0.025em;
          line-height: 1.2;
          margin: 0;
        }

        .philosophy-body {
          font-size: 0.92rem;
          line-height: 1.7;
          color: #555;
          margin: 0;
        }

        .about-strip {
          background: #111;
          color: #fff;
          border-radius: 24px;
          padding: clamp(2.5rem, 5vw, 4.5rem);
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 3rem;
          align-items: center;
        }

        .about-strip-heading {
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 700;
          line-height: 1.08;
          letter-spacing: -0.035em;
          margin: 0 0 1.5rem;
        }

        .about-strip-copy {
          font-size: 1.05rem;
          line-height: 1.75;
          color: rgba(255, 255, 255, 0.7);
          margin: 0 0 2rem;
        }

        .terminal-shell {
          background: #08090a;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 16px;
          overflow: hidden;
          font-family: var(--font-mono);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
        }

        .terminal-header {
          background: rgba(255, 255, 255, 0.04);
          padding: 0.75rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 0.62rem;
          color: rgba(255, 255, 255, 0.4);
        }

        .terminal-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
        }

        .terminal-body {
          padding: 1.4rem;
          font-size: 0.72rem;
          line-height: 1.8;
          color: #e5e5e5;
        }

        .crowd-container {
          position: relative;
          width: 100%;
          height: 440px;
          overflow: hidden;
          background: var(--color-paper-2);
          border-top: 1px solid var(--color-line);
          border-bottom: 1px solid var(--color-line);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .crowd-overlay {
          position: absolute;
          z-index: 10;
          text-align: center;
          pointer-events: none;
          max-width: 580px;
          padding: 0 1.5rem;
        }

        .crowd-tag {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 0.58rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--accent-red);
          margin-bottom: 0.8rem;
          font-weight: 600;
        }

        .crowd-heading {
          font-size: clamp(2.2rem, 5vw, 3.8rem);
          font-weight: 700;
          letter-spacing: -0.04em;
          margin: 0 0 1rem;
          color: var(--color-ink);
        }

        .crowd-text {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          line-height: 1.6;
          color: #555;
          margin: 0;
          background: rgba(247, 242, 230, 0.85);
          backdrop-filter: blur(8px);
          padding: 0.6rem 1.2rem;
          border-radius: 999px;
          border: 1px solid var(--color-line);
        }

        .site-footer-main {
          background: var(--color-ink);
          color: var(--color-paper);
          padding: 5rem clamp(20px, 4.5vw, 72px) 2.5rem;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 0.6fr;
          gap: 3rem;
          margin-bottom: 4rem;
        }

        .footer-heading {
          font-size: clamp(2.4rem, 5.5vw, 4.5rem);
          font-weight: 700;
          line-height: 0.95;
          letter-spacing: -0.045em;
          margin: 0 0 1.5rem;
        }

        .footer-links-col {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: flex-end;
        }

        .footer-bottom-bar {
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.4);
          flex-wrap: wrap;
          gap: 1rem;
        }

        @media (max-width: 900px) {
          .work-card {
            grid-template-columns: 1fr;
          }
          .archive-grid, .philosophy-grid {
            grid-template-columns: 1fr;
          }
          .about-strip {
            grid-template-columns: 1fr;
          }
          .footer-grid {
            grid-template-columns: 1fr;
          }
          .footer-links-col {
            align-items: flex-start;
          }
          .hero-nav {
            display: none;
          }
        }
      `}</style>

      <div
        className="spotlight-glow"
        style={{
          "--mouse-x": `${mousePos.x}%`,
          "--mouse-y": `${mousePos.y}%`
        } as any}
        aria-hidden
      />

      <header className="hero-top-bar">
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
            <span className="pulse-dot" />
            <span>PUNE, IN</span>
          </span>
          <span style={{ color: "var(--color-line)" }}>|</span>
          <span style={{ fontVariantNumeric: "tabular-nums", color: "var(--color-ui)" }}>
            {mounted ? time : "--:--"} IST
          </span>
        </div>

        <nav className="hero-nav">
          <a href="#work">Selected Work</a>
          <a href="#philosophy">Approach</a>
          <a href="/about">About</a>
          <a href="/work">Archive</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero-section">
        <div style={{ position: "absolute", inset: 0, opacity: 0.08, pointerEvents: "none" }}>
          <HeroTerrain />
        </div>

        <div className="hero-center">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeTransition }}
          >
            <div className="hero-kicker-pill">
              <span>Shivam Shelatkar</span>
              <span style={{ color: "var(--color-line)" }}>/</span>
              <span style={{ color: "var(--accent-red)", fontWeight: 600 }}>Creative Technologist</span>
            </div>
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease: easeTransition }}
          >
            Building systems where <br />
            research <span className="italic-accent">&amp;</span> code meet.
          </motion.h1>

          <motion.p
            className="hero-bio"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2, ease: easeTransition }}
          >
            Product designer and frontend engineer crafting high-consequence tools — from ISRO satellite intelligence canvases to AI-driven predictive revenue engines.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.3, ease: easeTransition }}
          >
            <a href="#work" className="btn-primary">
              <span>Explore Selected Work</span>
              <ArrowDown size={14} />
            </a>
            <a href="mailto:shelatkarshivam4@gmail.com" className="btn-secondary">
              <Mail size={14} />
              <span>shelatkarshivam4@gmail.com</span>
            </a>
          </motion.div>
        </div>

        <div className="hero-footer-bar">
          <span>01 / 04 Core Focus: Geospatial · AI · Mobility</span>
          <span>Scroll to inspect cases ↓</span>
        </div>
      </section>

      <section id="work" className="section-shell">
        <div className="section-container">
          <div className="section-header-row">
            <div>
              <span className="section-label">01 / Portfolio</span>
              <h2 className="section-heading">
                Selected Case Studies <span style={{ color: "var(--accent-red)" }}>.</span>
              </h2>
            </div>
            <Link
              href="/work"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.68rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: "var(--color-ink)",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontWeight: 600
              }}
            >
              <span>View full archive</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="work-list">
            {FEATURED_PROJECTS.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.75, delay: idx * 0.08, ease: easeTransition }}
              >
                <Link href={project.href} className="work-card">
                  <div className="work-card-media">
                    <img
                      src={project.previewImg}
                      alt={project.title}
                      className="work-card-img"
                      loading="lazy"
                    />
                    <div style={{ position: "absolute", top: 16, left: 16, background: "rgba(0,0,0,0.75)", color: "#fff", padding: "0.3rem 0.65rem", borderRadius: 999, fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.14em" }}>
                      {project.id}
                    </div>
                  </div>

                  <div className="work-card-info">
                    <div>
                      <div className="work-badge-row">
                        <span className="work-category">{project.subtitle}</span>
                        <span className="work-year">{project.year}</span>
                      </div>
                      <h3 className="work-title">{project.title}</h3>
                      <div className="work-headline">{project.headline}</div>
                      <p className="work-desc">{project.description}</p>
                      <div className="work-tag-row">
                        {project.tags.map((tag) => (
                          <span key={tag} className="work-tag">{tag}</span>
                        ))}
                      </div>
                    </div>

                    <div className="work-cta-row">
                      <span className="work-metric">✦ {project.stats}</span>
                      <span className="work-link-text">
                        Read Case Study <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div style={{ marginTop: "5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-ui)" }}>
                More Projects &amp; Explorations
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--color-ui)" }}>
                04 — 06
              </span>
            </div>

            <div className="archive-grid">
              {ARCHIVE_PROJECTS.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="archive-card"
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.8rem" }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "var(--accent-red)", letterSpacing: "0.14em" }}>{item.id}</span>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "var(--color-ui)" }}>{item.year}</span>
                    </div>
                    <h4 style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0 0 0.4rem", letterSpacing: "-0.02em" }}>{item.title}</h4>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--color-ui)", marginBottom: "0.6rem", textTransform: "uppercase" }}>{item.category}</div>
                    <p style={{ fontSize: "0.88rem", lineHeight: 1.6, color: "#666", margin: 0 }}>{item.description}</p>
                  </div>
                  <div style={{ marginTop: "1.2rem", fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 4, color: "var(--color-ink)", fontWeight: 600 }}>
                    <span>{item.external ? "Visit Platform" : "View Details"}</span>
                    <ArrowUpRight size={12} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="philosophy" className="section-shell" style={{ background: "var(--color-paper-2)" }}>
        <div className="section-container">
          <div className="section-header-row">
            <div>
              <span className="section-label">02 / Philosophy</span>
              <h2 className="section-heading">
                How I Think About Craft <span style={{ color: "var(--accent-red)" }}>.</span>
              </h2>
            </div>
          </div>

          <div className="philosophy-grid">
            {PRINCIPLES.map((item, idx) => (
              <motion.div
                key={item.num}
                className="philosophy-item"
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: easeTransition }}
              >
                <span className="philosophy-num">{item.num}</span>
                <h3 className="philosophy-title">{item.title}</h3>
                <p className="philosophy-body">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="section-shell">
        <div className="section-container">
          <div className="about-strip">
            <div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent-red)", display: "block", marginBottom: "0.8rem", fontWeight: 600 }}>
                03 / Background
              </span>
              <h2 className="about-strip-heading">
                Designer by instinct. <br />
                Engineer by discipline.
              </h2>
              <p className="about-strip-copy">
                Based in Pune, India. I bridge the gap between abstract design systems and production-grade engineering. Over the past 4+ years, I have architected data-dense dashboards, geospatial map canvases, and real-time operations software.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link href="/about" className="btn-primary" style={{ background: "#fff", color: "#000" }}>
                  <span>Read Full Bio &amp; Journey</span>
                  <ArrowUpRight size={14} />
                </Link>
                <a href="/about" className="btn-secondary" style={{ borderColor: "rgba(255,255,255,0.2)", color: "#fff" }}>
                  <span>View Resume</span>
                </a>
              </div>
            </div>

            <div className="terminal-shell">
              <div className="terminal-header">
                <span className="terminal-dot" style={{ background: "#ff5f56" }} />
                <span className="terminal-dot" style={{ background: "#ffbd2e" }} />
                <span className="terminal-dot" style={{ background: "#27c93f" }} />
                <span style={{ marginLeft: "auto" }}>shivam@machine ~</span>
              </div>
              <div className="terminal-body">
                <div style={{ color: "rgba(255,255,255,0.4)" }}>$ whoami</div>
                <div style={{ color: "#66e3ff", marginBottom: "0.8rem" }}>shivam-shelatkar (Creative Technologist)</div>

                <div style={{ color: "rgba(255,255,255,0.4)" }}>$ cat focus.json</div>
                <div style={{ color: "#c7f35a" }}>
                  {`{
  "location": "Pune, India",
  "core": ["Next.js", "Three.js", "Mapbox", "TypeScript", "Figma"],
  "status": "Available for high-impact roles"
}`}
                </div>

                <div style={{ color: "rgba(255,255,255,0.4)", marginTop: "0.8rem" }}>$ echo $MISSION</div>
                <div style={{ color: "#ff7a4d" }}>&quot;Uncover the why. Make it inevitable.&quot;</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="crowd-container">
        <div className="crowd-overlay">
          <span className="crowd-tag">The Interactive Lobby</span>
          <h2 className="crowd-heading">Say Hello Directly.</h2>
          <p className="crowd-text">
            Skip automated filters. I respond directly to every thoughtful message.
          </p>
        </div>
        <div style={{ position: "absolute", inset: 0, opacity: 0.5, filter: "grayscale(100%)", mixBlendMode: "multiply" }}>
          <CrowdCanvas src="https://skiper-ui.com/images/peeps/all-peeps.png" rows={15} cols={7} />
        </div>
      </section>

      <footer id="contact" className="site-footer-main">
        <div className="section-container">
          <div className="footer-grid">
            <div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent-red)", display: "block", marginBottom: "1rem", fontWeight: 600 }}>
                04 / Next Steps
              </span>
              <h2 className="footer-heading">
                Have a project or problem <br />
                worth tackling? Let&apos;s talk.
              </h2>
              <div style={{ marginTop: "2rem" }}>
                <a
                  href="mailto:shelatkarshivam4@gmail.com"
                  style={{
                    fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
                    fontWeight: 600,
                    color: "#fff",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    borderBottom: "2px solid var(--accent-red)",
                    paddingBottom: "4px"
                  }}
                >
                  <span>shelatkarshivam4@gmail.com</span>
                  <ArrowUpRight size={22} />
                </a>
              </div>
            </div>

            <div className="footer-links-col">
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "0.5rem" }}>
                Connect
              </div>
              <a href="https://linkedin.com/in/shivam-shelatkar" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.95rem" }}>
                <Linkedin size={16} /> <span>LinkedIn</span>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.95rem" }}>
                <Github size={16} /> <span>GitHub</span>
              </a>
              <a href="/about" style={{ color: "#fff", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.95rem" }}>
                <span>Curriculum Vitae</span>
              </a>
              <a href="/work" style={{ color: "#fff", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.95rem" }}>
                <span>All Projects (Archive)</span>
              </a>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <div>© {new Date().getFullYear()} Shivam Shelatkar · All rights reserved.</div>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <span>Designed &amp; Engineered with Next.js 16</span>
              <a href="#hero" style={{ color: "inherit", textDecoration: "none" }}>Back to top ↑</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
