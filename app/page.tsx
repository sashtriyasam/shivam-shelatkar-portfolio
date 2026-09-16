"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowDown, Mail, Github, Linkedin, Volume2, VolumeX, Sparkles, Activity, ShieldCheck } from "lucide-react";
import { CrowdCanvas } from "@/components/sections/CrowdCanvas";
import { TiltCard } from "@/components/projects/TiltCard";
import { InteractiveTerminal } from "@/components/sections/InteractiveTerminal";
import { SpatialShowcase } from "@/components/sections/SpatialShowcase";
import { sound } from "@/lib/audio";

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
    external: true,
    tag: "OPEN SOURCE"
  },
  {
    id: "05",
    title: "2 by 2 Magazine",
    category: "Editorial Design & Layout",
    description: "Curated publication featuring modular bento spreads, custom typography, and longform essays.",
    year: "2023",
    href: "/work",
    external: false,
    tag: "PUBLICATION"
  },
  {
    id: "06",
    title: "India 2036 Olympic Identity",
    category: "Speculative Identity & Spatial",
    description: "Speculative identity system, bilingual wayfinding protocols, and generative broadcast graphics.",
    year: "2022",
    href: "/work",
    external: false,
    tag: "SPECULATIVE"
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
  const [soundActive, setSoundActive] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const shouldReduceMotion = useReducedMotion();
  const [typedAbout, setTypedAbout] = useState("");
  const fullAbout = "About me — I'm a Product Designer & Engineer who loves turning fuzzy ideas into calm, useful products. I design with curiosity, code with care, and get genuinely excited when tech feels human.";
  const ROLES = ["Product Designer & Engineer", "Creative Technologist", "Spatial UX Explorer", "Frontend Architect"];
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayRole, setDisplayRole] = useState(ROLES[0]);

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

  // typewriter for about me
  useEffect(() => {
    if (!mounted) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTypedAbout(fullAbout.slice(0, i));
      if (i >= fullAbout.length) clearInterval(id);
    }, 14);
    return () => clearInterval(id);
  }, [mounted]);

  // scramble role ticker - every 2.8s scramble to next role
  useEffect(() => {
    if (!mounted || shouldReduceMotion) return;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#@$%&";
    let scrambleInterval: any;
    let holdTimeout: any;
    const cycle = () => {
      const nextIdx = (roleIdx + 1) % ROLES.length;
      let iterations = 0;
      const target = ROLES[nextIdx];
      clearInterval(scrambleInterval);
      scrambleInterval = setInterval(() => {
        setDisplayRole(
          target
            .split("")
            .map((c, idx) => {
              if (idx < iterations) return target[idx];
              if (c === " " || c === "&") return c;
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );
        if (iterations >= target.length) {
          clearInterval(scrambleInterval);
          setRoleIdx(nextIdx);
        }
        iterations += 1.6;
      }, 32);
    };
    const ticker = setInterval(cycle, 3200);
    return () => {
      clearInterval(ticker);
      clearInterval(scrambleInterval);
      clearTimeout(holdTimeout);
    };
  }, [mounted, roleIdx, shouldReduceMotion]);

  const toggleAudio = () => {
    const isEnabled = sound.toggle();
    setSoundActive(isEnabled);
  };

  const easeTransition = [0.16, 1, 0.3, 1] as const;

  return (
    <div className="immersive-portfolio-root">
      <style>{`
        .immersive-portfolio-root {
          background-color: #060709;
          color: #f0f2f5;
          font-family: var(--font-body);
          position: relative;
          overflow-x: hidden;
          min-height: 100vh;
        }

        .immersive-portfolio-root::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 64px 64px;
        }

        .ambient-glow {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background: radial-gradient(850px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 59, 48, 0.045), rgba(0, 212, 255, 0.02) 40%, transparent 75%);
          transition: background 0.1s ease-out;
        }

        .hud-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 clamp(20px, 4.5vw, 72px);
          height: 56px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(6, 7, 9, 0.88);
          backdrop-filter: blur(16px);
          position: sticky;
          top: 0;
          z-index: 60;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .hud-left {
          display: flex;
          align-items: center;
          gap: 1.2rem;
        }

        .hud-beacon {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #00f59b;
          box-shadow: 0 0 10px #00f59b;
          animation: beaconPulse 2s infinite;
        }

        @keyframes beaconPulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
          100% { opacity: 1; transform: scale(1); }
        }

        .hud-audio-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #f0f2f5;
          padding: 0.35rem 0.75rem;
          border-radius: 999px;
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .hud-audio-btn:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: #00d4ff;
          color: #00d4ff;
        }

        .hud-nav {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .hud-nav a {
          text-decoration: none;
          color: rgba(255, 255, 255, 0.7);
          position: relative;
          padding: 4px 0;
          transition: color 0.2s ease;
        }

        .hud-nav a:hover {
          color: #fff;
        }

        .hud-nav a::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 0;
          height: 1.5px;
          background: #ff3b30;
          transition: width 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hud-nav a:hover::after {
          width: 100%;
        }

        .hero-shell {
          min-height: calc(100vh - 56px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 4rem clamp(20px, 4.5vw, 72px) 2.5rem;
          position: relative;
          z-index: 1;
        }

        .hero-content {
          max-width: 1240px;
          width: 100%;
          margin: auto 0;
          position: relative;
          z-index: 2;
        }

        .hero-kicker-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.45rem 1rem;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(12, 14, 20, 0.75);
          backdrop-filter: blur(10px);
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #00d4ff;
          margin-bottom: 2rem;
        }

        .hero-headline {
          font-size: clamp(3.2rem, 9vw, 8.8rem);
          font-weight: 700;
          line-height: 0.9;
          letter-spacing: -0.05em;
          margin: 0;
          color: #fff;
          text-shadow: 0 10px 40px rgba(0, 0, 0, 0.7);
        }

        .hero-headline .neon-accent {
          color: #ff3b30;
          font-family: var(--font-display);
          font-style: italic;
          font-weight: 400;
          letter-spacing: -0.02em;
          display: inline-block;
          text-shadow: 0 0 25px rgba(255, 59, 48, 0.4);
        }

        .hero-desc {
          font-size: clamp(1.1rem, 2.2vw, 1.65rem);
          line-height: 1.5;
          letter-spacing: -0.02em;
          color: rgba(255, 255, 255, 0.75);
          max-width: 48ch;
          margin: 2.2rem 0 2.8rem;
        }

        .hero-cta-group {
          display: flex;
          align-items: center;
          gap: 1.2rem;
          flex-wrap: wrap;
        }

        .btn-neon-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: #ff3b30;
          color: #fff;
          padding: 0.9rem 1.8rem;
          border-radius: 999px;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-decoration: none;
          font-weight: 700;
          box-shadow: 0 10px 30px -5px rgba(255, 59, 48, 0.5);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .btn-neon-primary:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 15px 40px -5px rgba(255, 59, 48, 0.7);
        }

        .btn-neon-outline {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: rgba(255, 255, 255, 0.04);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.18);
          padding: 0.9rem 1.8rem;
          border-radius: 999px;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .btn-neon-outline:hover {
          border-color: #00d4ff;
          color: #00d4ff;
          transform: translateY(-2px);
          background: rgba(0, 212, 255, 0.06);
        }

        .hero-telemetry-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.45);
        }

        .section-wrap {
          padding: 7rem clamp(20px, 4.5vw, 72px);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          position: relative;
          z-index: 1;
        }

        .section-max {
          max-width: 1240px;
          margin: 0 auto;
        }

        .section-header-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 4rem;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .section-badge {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #ff3b30;
          display: block;
          margin-bottom: 0.6rem;
          font-weight: 700;
        }

        .section-h2 {
          font-size: clamp(2.2rem, 4.5vw, 4rem);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.04em;
          margin: 0;
          color: #fff;
        }

        .project-flow {
          display: flex;
          flex-direction: column;
          gap: 2.8rem;
        }

        .project-card-inner {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 22px;
          overflow: hidden;
          background: #0a0c10;
          box-shadow: 0 20px 60px -10px rgba(0, 0, 0, 0.5);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .project-card-inner:hover {
          border-color: rgba(255, 255, 255, 0.3);
          box-shadow: 0 30px 80px -15px rgba(0, 0, 0, 0.8);
        }

        .project-img-box {
          position: relative;
          overflow: hidden;
          background: #000;
          min-height: 420px;
        }

        .project-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: contrast(1.05) brightness(0.85);
          transition: filter 0.5s ease, transform 0.6s var(--ease);
        }

        .project-card-inner:hover .project-img {
          filter: contrast(1.1) brightness(1);
          transform: scale(1.04);
        }

        .project-info-pane {
          padding: clamp(2.2rem, 3.8vw, 3.4rem);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: linear-gradient(135deg, rgba(14,16,22,0.95) 0%, rgba(8,10,14,0.98) 100%);
        }

        .project-meta-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.2rem;
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .project-title-h3 {
          font-size: clamp(2rem, 3.2vw, 2.8rem);
          font-weight: 700;
          letter-spacing: -0.04em;
          line-height: 1.05;
          margin: 0 0 0.8rem;
          color: #fff;
        }

        .project-headline-p {
          font-size: 1.05rem;
          font-weight: 500;
          line-height: 1.5;
          color: #00d4ff;
          margin-bottom: 1rem;
        }

        .project-body-p {
          font-size: 0.94rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.7);
          margin: 0 0 1.6rem;
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        .tag-pill {
          font-family: var(--font-mono);
          font-size: 0.58rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.32rem 0.7rem;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: rgba(255, 255, 255, 0.7);
          background: rgba(255, 255, 255, 0.03);
        }

        .project-footer-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1.4rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .project-stat-label {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
        }

        .project-cta-link {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: #fff;
        }

        .archive-deck {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.4rem;
          margin-top: 2rem;
        }

        .archive-unit {
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 18px;
          padding: 2rem;
          background: rgba(12, 14, 20, 0.75);
          backdrop-filter: blur(10px);
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 240px;
          transition: all 0.25s ease;
        }

        .archive-unit:hover {
          border-color: #00d4ff;
          transform: translateY(-4px);
          background: rgba(16, 20, 30, 0.95);
        }

        .principles-deck {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.8rem;
        }

        .principle-box {
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2.4rem;
          background: rgba(12, 14, 20, 0.6);
          backdrop-filter: blur(12px);
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }

        .about-cockpit {
          background: linear-gradient(135deg, #0d0f15 0%, #060709 100%);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 26px;
          padding: clamp(2.5rem, 5vw, 4.5rem);
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 3.5rem;
          align-items: center;
          box-shadow: 0 30px 80px -20px rgba(0, 0, 0, 0.8);
        }

        @media (max-width: 960px) {
          .project-card-inner {
            grid-template-columns: 1fr;
          }
          .archive-deck, .principles-deck {
            grid-template-columns: 1fr;
          }
          .about-cockpit {
            grid-template-columns: 1fr;
          }
          .hud-nav {
            display: none;
          }
        }

        /* ——— IMMERSIVE HERO — SYSTEMATISED (visual-hierarchy, spacing-system, motion-system, color-system, a11y) ——— */
        .immersive-hero {
          min-height: calc(100vh - 56px);
          min-height: calc(100dvh - 56px);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: var(--space-xl) var(--grid-margin) var(--space-lg);
          isolation: isolate;
          /* 12-col grid concept: content centered with max 1240, gutters via --grid-margin */
        }
        .hero-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
          filter: blur(56px);
          opacity: 0.32; /* reduced from 0.55 — was competing with primary name */
          mix-blend-mode: screen;
        }
        .hero-orb--a {
          width: 520px; height: 520px;
          background: radial-gradient(circle at 30% 30%, rgba(255,59,48,0.16), rgba(255,59,48,0) 70%);
          top: -100px; right: -60px;
          animation: orbFloatA 10s var(--motion-ease-in-out) infinite;
        }
        .hero-orb--b {
          width: 680px; height: 680px;
          background: radial-gradient(circle at 50% 50%, rgba(0,212,255,0.10), rgba(0,212,255,0) 70%);
          bottom: -160px; left: -140px;
          animation: orbFloatB 12s var(--motion-ease-in-out) infinite;
        }
        @keyframes orbFloatA { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-12px,10px) scale(1.03)} }
        @keyframes orbFloatB { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(16px,-8px) scale(1.02)} }

        .immersive-hero-content {
          max-width: var(--max-width);
          width: 100%;
          margin: 0 auto;
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: var(--space-xl); /* 32px consistent — was 1.6rem arbitrary */
          padding-top: var(--space-md);
          padding-bottom: var(--space-md);
        }
        .hero-kicker-row {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          flex-wrap: wrap;
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
          opacity: 0.95; /* de-emphasized — not competing with name */
        }
        .hero-kicker-pill {
          display: inline-flex;
          align-items: center;
          gap: var(--space-sm);
          padding: var(--space-sm) var(--space-md);
          border-radius: 999px;
          border: 1px solid var(--color-border);
          background: var(--color-surface-overlay);
          backdrop-filter: blur(12px);
          color: var(--color-text-primary);
          font-weight: 600;
        }
        .kicker-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--color-accent-green);
          box-shadow: 0 0 8px var(--color-accent-green);
          animation: beaconPulse 2s infinite;
          flex: 0 0 6px;
        }
        .kicker-sep { color: var(--color-text-tertiary); }
        .hero-kicker-sub {
          display: inline-flex;
          align-items: center;
          gap: var(--space-sm);
          padding: var(--space-sm) var(--space-md);
          border-radius: 999px;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--color-border);
          color: var(--color-text-secondary);
          font-weight: 600;
        }

        .hero-name-wrap {
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
        }
        .hi-row {
          display: inline-flex;
          align-items: center;
          gap: var(--space-sm);
        }
        .hi-script {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-text-tertiary);
          line-height: var(--leading-tight);
          display: inline-block;
        }
        .hi-wave { font-size: 1.1rem; margin-left: var(--space-xs); }
        .hi-line-decor {
          width: 56px;
          height: 1px;
          background: var(--color-border-strong);
          margin-left: var(--space-xs);
        }

        .hero-big-name {
          margin: 0;
          line-height: var(--leading-tight);
          letter-spacing: var(--tracking-tight);
          font-weight: 700;
          font-family: var(--font-body);
          perspective: 600px;
          transform-style: preserve-3d;
        }
        .name-line {
          display: block;
          font-size: clamp(3.2rem, 9vw, 8rem); /* 1.5x differential vs role (0.78rem) — hierarchy weight pass */
          font-weight: 700;
          letter-spacing: var(--tracking-tight);
          line-height: 0.92;
          overflow: visible;
        }
        .name-first {
          color: var(--color-text-primary);
          text-shadow: 0 8px 24px rgba(0,0,0,0.45);
        }
        .name-last {
          color: var(--color-text-primary);
          margin-top: var(--space-xs);
          opacity: 0.98;
        }
        .char {
          display: inline-block;
          cursor: default;
          transition: color var(--motion-duration-short) var(--motion-ease-out), transform var(--motion-duration-short) var(--motion-ease-out);
          will-change: transform;
        }
        .char:focus-visible {
          outline: 2px solid var(--color-focus);
          outline-offset: 3px;
          border-radius: 2px;
        }
        .char--first:hover, .char--first:focus-visible {
          color: var(--color-accent-primary) !important;
        }
        .char--last:hover, .char--last:focus-visible {
          color: var(--color-accent-cyan) !important;
        }
        .hero-role-row {
          display: flex;
          align-items: baseline;
          gap: var(--space-md);
          flex-wrap: wrap;
          font-family: var(--font-mono);
          margin-top: var(--space-sm);
          font-size: var(--text-sm);
          letter-spacing: var(--tracking-wide);
        }
        .role-scramble {
          color: var(--color-accent-cyan);
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-size: var(--text-xs);
          min-width: 22ch;
          display: inline-block;
          /* removed text-shadow — was false emphasis competing with name */
        }
        .role-divider { color: var(--color-text-tertiary); }
        .role-hint {
          color: var(--color-text-secondary);
          font-family: var(--font-body);
          letter-spacing: -0.01em;
          text-transform: none;
          font-size: var(--text-base);
          line-height: var(--leading-normal);
        }

        .hero-about-card {
          margin-top: var(--space-sm);
          max-width: var(--measure); /* 65ch — readable-measure */
          background: linear-gradient(135deg, rgba(18,20,28,0.78) 0%, rgba(10,12,16,0.86) 100%);
          border: 1px solid var(--color-border);
          border-radius: 16px; /* was 18 arbitrary — now 16 from token */
          padding: var(--space-lg);
          backdrop-filter: blur(14px) saturate(130%);
          box-shadow: 0 16px 48px -16px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06);
          position: relative;
          overflow: hidden;
        }
        .hero-about-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(400px 160px at 20% 0%, rgba(255,59,48,0.06), transparent 60%);
          pointer-events: none;
        }
        .hero-about-label {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-accent-green);
          margin-bottom: var(--space-sm);
          font-weight: 700;
        }
        .about-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--color-accent-green);
          box-shadow: 0 0 6px var(--color-accent-green);
        }
        .about-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, rgba(0,245,155,0.32), transparent);
          margin-left: var(--space-sm);
        }
        .hero-about-text {
          margin: 0;
          font-size: var(--text-base);
          line-height: var(--leading-relaxed);
          letter-spacing: -0.015em;
          color: var(--color-text-primary);
          font-weight: 400;
          position: relative;
          min-height: 3.2em;
          max-width: var(--measure);
        }
        .type-cursor {
          display: inline-block;
          margin-left: 2px;
          color: var(--color-accent-cyan);
          font-weight: 300;
          animation: blink 1s step-end infinite;
          transform: translateY(1px);
        }
        @keyframes blink { 0%,50%{opacity:1} 51%,100%{opacity:0} }

        .immersive-cta {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-md);
          margin-top: var(--space-xs);
          align-items: center;
        }
        .btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: var(--space-sm);
          padding: var(--space-md) var(--space-lg);
          border-radius: 999px;
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          color: var(--color-text-secondary);
          border: 1px solid transparent;
          min-height: 44px; /* fitts-law touch target */
          transition: all var(--motion-duration-short) var(--motion-ease-out);
        }
        .btn-ghost:hover, .btn-ghost:focus-visible {
          color: var(--color-text-primary);
          background: rgba(255,255,255,0.06);
          border-color: var(--color-border-strong);
          transform: translateY(-1px);
        }
        .btn-ghost:focus-visible, .btn-neon-primary:focus-visible, .btn-neon-outline:focus-visible {
          outline: 2px solid var(--color-focus);
          outline-offset: 2px;
        }
        .hero-side-label {
          position: absolute;
          right: var(--space-lg);
          top: 50%;
          transform: translateY(-50%) rotate(90deg);
          transform-origin: center;
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          font-family: var(--font-mono);
          font-size: 0.58rem;
          letter-spacing: 0.20em;
          text-transform: uppercase;
          color: var(--color-text-tertiary);
          z-index: 3;
          pointer-events: none;
          white-space: nowrap;
          opacity: 0.75;
        }
        .hero-side-label .side-line {
          width: 32px; height: 1px;
          background: var(--color-border-strong);
          display: inline-block;
        }
        .scroll-explore {
          position: absolute;
          left: 50%;
          bottom: var(--space-md);
          transform: translateX(-50%);
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-sm);
          text-decoration: none;
          color: var(--color-text-tertiary);
          font-family: var(--font-mono);
          font-size: 0.58rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          transition: color var(--motion-duration-short) var(--motion-ease-out);
        }
        .scroll-explore:hover, .scroll-explore:focus-visible { color: var(--color-text-primary); outline: none; }
        .scroll-explore:focus-visible .scroll-wheel { border-color: var(--color-focus); box-shadow: 0 0 0 2px rgba(0,212,255,0.25); }
        .scroll-wheel {
          width: 22px; height: 34px;
          border-radius: 999px;
          border: 1px solid var(--color-border-strong);
          display: grid;
          place-items: start center;
          padding-top: 5px;
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(6px);
        }
        .scroll-dot {
          width: 4px; height: 4px;
          border-radius: 50%;
          background: var(--color-accent-cyan);
          box-shadow: 0 0 6px var(--color-accent-cyan);
          display: block;
        }
        .telemetry-hide-mobile { }
        @media (max-width: 900px) {
          .hero-side-label { display: none; }
          .telemetry-hide-mobile { display: none !important; }
          .immersive-hero-content { gap: var(--space-lg); }
          .hero-about-card { padding: var(--space-md); }
          .role-scramble { min-width: unset; }
          .hero-kicker-row { gap: var(--space-sm); }
          .immersive-cta { flex-direction: column; align-items: stretch; }
          .immersive-cta .btn-neon-primary, .immersive-cta .btn-neon-outline { justify-content: center; min-height: 44px; }
          .btn-ghost { justify-content: center; background: rgba(255,255,255,0.04); border-color: var(--color-border); min-height: 44px; }
        }
        @media (max-width: 640px) {
          .hero-big-name .name-line { font-size: clamp(2.8rem, 13vw, 4.4rem); }
          .hero-role-row { flex-direction: column; gap: var(--space-xs); align-items: flex-start; }
          .role-hint { font-size: var(--text-sm); line-height: var(--leading-normal); }
          .immersive-hero { padding: var(--space-lg) var(--space-md) var(--space-md); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-orb, .kicker-dot, .char, .scroll-dot { animation: none !important; transition: none !important; }
        }

        /* ——— ABOUT PREVIEW — SYSTEMATISED (law-of-proximity, information-density, type-scale) ——— */
        .about-preview-wrap {
          padding: var(--space-4xl) var(--grid-margin);
          background: radial-gradient(700px 420px at 18% 18%, rgba(0,212,255,0.05), transparent 62%), radial-gradient(600px 360px at 88% 88%, rgba(255,59,48,0.04), transparent 62%), var(--color-bg);
          border-top: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
          position: relative;
          z-index: 1;
        }
        .about-preview-inner {
          display: grid;
          grid-template-columns: 5fr 7fr; /* 12-col logic: 5/12 vs 7/12 — better than 0.95/1.25 arbitrary */
          gap: var(--space-2xl);
          align-items: start;
          max-width: var(--max-width);
          margin: 0 auto;
        }
        .about-visual-card {
          background: linear-gradient(180deg, var(--color-surface) 0%, #090b10 100%);
          border: 1px solid var(--color-border);
          border-radius: 16px;
          padding: var(--space-lg);
          box-shadow: 0 24px 64px -20px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.05);
          position: relative;
          overflow: visible;
        }
        .about-visual-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-text-tertiary);
          margin-bottom: var(--space-lg);
        }
        .about-visual-badge {
          display: inline-flex;
          align-items: center;
          gap: var(--space-xs);
          padding: var(--space-xs) var(--space-sm);
          border-radius: 999px;
          background: rgba(0,245,155,0.08);
          border: 1px solid rgba(0,245,155,0.18);
          color: var(--color-accent-green);
          font-weight: 700;
          font-size: 0.62rem;
        }
        .about-avatar-ring {
          position: relative;
          width: 100%;
          aspect-ratio: 1.2;
          border-radius: 16px;
          background: radial-gradient(260px 240px at 42% 32%, rgba(255,59,48,0.08), transparent 68%), radial-gradient(300px 220px at 78% 88%, rgba(0,212,255,0.08), transparent 68%), #0a0c10;
          border: 1px solid var(--color-border);
          display: grid;
          place-items: center;
          overflow: visible;
          padding: var(--space-lg);
        }
        .about-avatar-inner {
          width: 132px; height: 132px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1a1d25 0%, #0f1117 100%);
          border: 1px solid var(--color-border-strong);
          display: grid;
          place-items: center;
          place-content: center;
          box-shadow: 0 14px 32px -12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06);
          position: relative;
        }
        .about-avatar-initials {
          font-family: var(--font-body);
          font-size: 2.4rem;
          font-weight: 800;
          letter-spacing: var(--tracking-tight);
          color: var(--color-text-primary);
          line-height: var(--leading-tight);
        }
        .about-avatar-sub {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-text-tertiary);
          margin-top: var(--space-xs);
        }
        .about-float {
          position: absolute;
          display: inline-flex;
          align-items: center;
          gap: var(--space-xs);
          padding: var(--space-xs) var(--space-sm);
          border-radius: 999px;
          background: rgba(6,7,9,0.92);
          border: 1px solid var(--color-border);
          backdrop-filter: blur(10px);
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.10em;
          text-transform: uppercase;
          color: var(--color-text-primary);
          font-weight: 700;
          box-shadow: 0 8px 20px -10px rgba(0,0,0,0.5);
          white-space: nowrap;
          opacity: 0.92; /* reduced emphasis — not competing with title */
        }
        .about-float--1 { top: 12px; right: -8px; color: var(--color-text-secondary); border-color: var(--color-border); }
        .about-float--2 { bottom: 48px; left: -10px; color: var(--color-text-secondary); border-color: var(--color-border); }
        .about-float--3 { bottom: 12px; right: 16px; color: var(--color-accent-green); border-color: rgba(0,245,155,0.18); background: rgba(6,7,9,0.92); }
        .about-visual-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-sm);
          margin-top: var(--space-lg);
        }
        .av-stat {
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--color-border);
          border-radius: 12px;
          padding: var(--space-md) var(--space-sm);
          text-align: center;
        }
        .av-stat-num {
          display: block;
          font-family: var(--font-body);
          font-size: 1.05rem;
          font-weight: 700;
          letter-spacing: var(--tracking-tight);
          color: var(--color-text-primary);
          line-height: var(--leading-tight);
        }
        .av-stat-label {
          display: block;
          margin-top: var(--space-xs);
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
        }
        .about-visual-caption {
          margin-top: 0.7rem;
          text-align: center;
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
        }
        .about-preview-copy {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }
        .about-preview-title {
          margin: 0;
          font-size: clamp(2rem, 3.8vw, 3.25rem);
          font-weight: 800;
          letter-spacing: -0.05em;
          line-height: 0.95;
          color: #fff;
        }
        .about-title-accent {
          color: #ff3b30;
          font-weight: 800;
          letter-spacing: -0.05em;
        }
        .about-preview-text {
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
          font-size: 1.02rem;
          line-height: 1.7;
          color: rgba(255,255,255,0.82);
        }
        .about-preview-text p { margin: 0; }
        .about-preview-text strong { color: #fff; font-weight: 700; }
        .about-preview-traits {
          display: flex;
          flex-wrap: wrap;
          gap: 0.65rem;
          margin-top: 0.2rem;
        }
        .trait {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.5rem 0.85rem;
          border-radius: 999px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.10);
          font-family: var(--font-mono);
          font-size: 0.66rem;
          letter-spacing: 0.10em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.72);
          font-weight: 600;
        }
        .trait-dot { width: 7px; height: 7px; border-radius: 50%; display: inline-block; }
        .about-preview-actions {
          display: flex;
          gap: 0.9rem;
          flex-wrap: wrap;
          margin-top: 0.6rem;
        }
        @media (max-width: 960px) {
          .about-preview-inner { grid-template-columns: 1fr; gap: 2.2rem; }
          .about-preview-visual { order: 2; }
          .about-preview-copy { order: 1; }
          .about-float--1 { right: 6px; }
          .about-float--2 { left: 6px; }
        }
      `}</style>

      <div
        className="ambient-glow"
        style={{
          "--mouse-x": `${mousePos.x}%`,
          "--mouse-y": `${mousePos.y}%`
        } as any}
        aria-hidden
      />

      <header className="hud-header">
        <div className="hud-left">
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
            <span className="hud-beacon" />
            <span style={{ color: "#00f59b", fontWeight: 700 }}>SYS: ONLINE</span>
          </span>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
          <span style={{ color: "rgba(255,255,255,0.7)" }}>PUNE 18.52°N 73.85°E</span>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
          <span style={{ fontVariantNumeric: "tabular-nums", color: "#00d4ff" }}>
            {mounted ? time : "--:--"} IST
          </span>
        </div>

        <nav className="hud-nav">
          <a href="#spatial" onMouseEnter={() => sound.playHover()}>Spatial</a>
          <a href="#work" onMouseEnter={() => sound.playHover()}>Systems</a>
          <a href="#philosophy" onMouseEnter={() => sound.playHover()}>Philosophy</a>
          <a href="#terminal" onMouseEnter={() => sound.playHover()}>Console</a>
          <a href="/about" onMouseEnter={() => sound.playHover()}>About</a>
          <a href="#contact" onMouseEnter={() => sound.playHover()}>Transmit</a>
        </nav>

        <div>
          <button
            type="button"
            className="hud-audio-btn"
            onClick={toggleAudio}
            title="Toggle tactile sound synthesis"
          >
            {soundActive ? <Volume2 size={13} color="#00f59b" /> : <VolumeX size={13} />}
            <span>{soundActive ? "AUDIO: ON" : "AUDIO: OFF"}</span>
          </button>
        </div>
      </header>

      <section className="hero-shell immersive-hero">
        <div style={{ position: "absolute", inset: 0, opacity: mounted ? 0.9 : 0, transition: "opacity 1.2s ease", pointerEvents: "all" }}>
          <HeroTerrain />
        </div>

        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 900px 700px at 35% 45%, rgba(6,7,9,0.15) 0%, rgba(6,7,9,0.55) 45%, rgba(6,7,9,0.88) 72%, rgba(6,7,9,0.98) 100%), linear-gradient(180deg, rgba(6,7,9,0.25) 0%, rgba(6,7,9,0.92) 100%)",
            pointerEvents: "none",
            zIndex: 1
          }}
        />

        {/* floating orbs */}
        <div aria-hidden className="hero-orb hero-orb--a" />
        <div aria-hidden className="hero-orb hero-orb--b" />

        <div className="hero-content immersive-hero-content">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeTransition }}
            className="hero-kicker-row"
          >
            <span className="hero-kicker-pill">
              <span className="kicker-dot" />
              <span>Available for new opportunities — Q4 2026</span>
              <span className="kicker-sep">·</span>
              <span style={{ color: "#00d4ff", fontWeight: 700 }}>Pune, India</span>
            </span>
            <span className="hero-kicker-sub">
              <Sparkles size={11} style={{ opacity: 0.7 }} />
              <span>Product Designer & Engineer</span>
            </span>
          </motion.div>

          <div className="hero-name-wrap">
            <motion.div
              className="hi-row"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08, ease: easeTransition }}
            >
              <span className="hi-script">Hi, I&rsquo;m</span>
              <motion.span
                className="hi-wave"
                animate={shouldReduceMotion ? {} : { rotate: [0, 18, -12, 18, 0] }}
                transition={{ duration: 1.8, delay: 1.2, ease: "easeInOut" }}
                style={{ display: "inline-block", transformOrigin: "70% 70%" }}
                aria-hidden
              >
                👋
              </motion.span>
              <span className="hi-line-decor" aria-hidden />
            </motion.div>

            <h1 className="hero-big-name" aria-label="Shivam Shelatkar">
              <span className="name-line name-first">
                {"SHIVAM".split("").map((ch, i) => (
                  <motion.span
                    key={`f-${i}`}
                    className="char char--first"
                    tabIndex={0}
                    role="text"
                    aria-label={`SHIVAM letter ${ch}`}
                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 32, rotateX: -20 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.5, delay: 0.12 + i * 0.04, ease: easeTransition }}
                    whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.06, color: "#ff3b30" }}
                    whileFocus={shouldReduceMotion ? {} : { y: -6, scale: 1.06, color: "#ff3b30" }}
                    style={{ display: "inline-block" }}
                  >
                    {ch}
                  </motion.span>
                ))}
              </span>
              <span className="name-line name-last">
                {"SHELATKAR".split("").map((ch, i) => (
                  <motion.span
                    key={`l-${i}`}
                    className="char char--last"
                    tabIndex={0}
                    role="text"
                    aria-label={`SHELATKAR letter ${ch}`}
                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 32, rotateX: -20 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.5, delay: 0.30 + i * 0.04, ease: easeTransition }}
                    whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.04, color: "#00d4ff" }}
                    whileFocus={shouldReduceMotion ? {} : { y: -4, scale: 1.04, color: "#00d4ff" }}
                    style={{ display: "inline-block" }}
                  >
                    {ch}
                  </motion.span>
                ))}
              </span>
            </h1>

            <motion.div
              className="hero-role-row"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55, ease: easeTransition }}
            >
              <span className="role-scramble" aria-live="polite">{displayRole}</span>
              <span className="role-divider" aria-hidden="true">—</span>
              <span className="role-hint">obsessed with calm interfaces &amp; joyful details</span>
            </motion.div>
          </div>

          <motion.div
            className="hero-about-card"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65, ease: easeTransition }}
          >
            <div className="hero-about-label">
              <span className="about-dot" />
              <span>ABOUT ME</span>
              <span className="about-line" />
            </div>
            <p className="hero-about-text">
              {mounted ? typedAbout : fullAbout}
              <span className="type-cursor" aria-hidden>|</span>
            </p>
          </motion.div>

          <motion.div
            className="hero-cta-group immersive-cta"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.05, ease: easeTransition }}
          >
            <a
              href="#about-preview"
              className="btn-neon-primary btn-magnetic"
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
            >
              <span>Meet me in 10 seconds</span>
              <ArrowDown size={15} />
            </a>
            <a
              href="#work"
              className="btn-neon-outline"
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
            >
              <span>See my work</span>
              <ArrowUpRight size={14} />
            </a>
            <a
              href="mailto:shelatkarshivam4@gmail.com"
              className="btn-ghost"
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
            >
              <Mail size={14} />
              <span>shelatkarshivam4@gmail.com</span>
            </a>
          </motion.div>
        </div>

        <div className="hero-side-label" aria-hidden>
          <span>DRAG TO ORBIT · SCROLL TO EXPLORE</span>
          <span className="side-line" />
        </div>

        <motion.a
          href="#about-preview"
          className="scroll-explore"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          onMouseEnter={() => sound.playHover()}
          aria-label="Scroll to about me"
        >
          <span className="scroll-text">SCROLL</span>
          <span className="scroll-wheel">
            <motion.span
              className="scroll-dot"
              animate={shouldReduceMotion ? {} : { y: [0, 14, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </motion.a>

        <div className="hero-telemetry-bar">
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Activity size={12} color="#00f59b" /> 03 FLAGSHIP SYSTEMS · REAL-TIME TERRAIN
          </span>
          <span className="telemetry-hide-mobile" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <ShieldCheck size={12} color="#00d4ff" /> HOVER MY NAME · TRY DRAGGING THE TERRAIN
          </span>
        </div>
      </section>

      {/* IMMERSIVE ABOUT ME — friendly & human */}
      <section id="about-preview" className="about-preview-wrap">
        <div className="section-max about-preview-inner">
          <motion.div
            className="about-preview-visual"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30, rotate: -1 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: easeTransition }}
          >
            <TiltCard maxTilt={7}>
              <div className="about-visual-card">
                <div className="about-visual-top">
                  <span className="about-visual-badge">● OPEN TO NEW IDEAS</span>
                  <span className="about-visual-year">2026</span>
                </div>

                <div className="about-avatar-ring">
                  <div className="about-avatar-inner">
                    <span className="about-avatar-initials">SS</span>
                    <span className="about-avatar-sub">Shivam Shelatkar</span>
                  </div>
                  <motion.span className="about-float about-float--1" animate={shouldReduceMotion ? {} : { y: [0, -6, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}>
                    <Sparkles size={12} /> Product Designer
                  </motion.span>
                  <motion.span className="about-float about-float--2" animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }} transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}>
                    <Activity size={12} /> & Engineer
                  </motion.span>
                  <motion.span className="about-float about-float--3" animate={shouldReduceMotion ? {} : { y: [0, -4, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
                    ✦ Human first
                  </motion.span>
                </div>

                <div className="about-visual-stats">
                  <div className="av-stat">
                    <span className="av-stat-num">Pune</span>
                    <span className="av-stat-label">Based in India</span>
                  </div>
                  <div className="av-stat">
                    <span className="av-stat-num">Calm</span>
                    <span className="av-stat-label">Design ethos</span>
                  </div>
                  <div className="av-stat">
                    <span className="av-stat-num">∞</span>
                    <span className="av-stat-label">Curiosity</span>
                  </div>
                </div>
              </div>
            </TiltCard>

            <div className="about-visual-caption">
              <span>↳ Hover & tilt me — I’m interactive</span>
            </div>
          </motion.div>

          <motion.div
            className="about-preview-copy"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.12, ease: easeTransition }}
          >
            <span className="section-badge" style={{ color: "#00f59b" }}>ABOUT ME — THE HUMAN BEHIND THE PIXELS</span>
            <h2 className="about-preview-title">
              I like making <span className="about-title-accent">complex things</span> feel obvious.
            </h2>
            <div className="about-preview-text">
              <p>
                Hey — I&apos;m <strong>Shivam Shelatkar</strong>. Product Designer &amp; Engineer based in Pune. I spend my days somewhere between Figma, VS Code, and a lot of sketchbook scribbles.
              </p>
              <p style={{ color: "rgba(255,255,255,0.62)" }}>
                I got hooked on the idea that good software should feel calm, not clever. Whether it&apos;s a geospatial canvas for ISRO or a tiny button micro-interaction, I care about the same thing: does it help a real person without making them think too hard?
              </p>
              <p style={{ color: "rgba(255,255,255,0.62)" }}>
                When I&apos;m not designing, I&apos;m probably exploring new WebGL tricks, breaking my own grid systems, or hunting for the perfect imperfect font pairing.
              </p>
            </div>

            <div className="about-preview-traits">
              <span className="trait"><span className="trait-dot" style={{ background: "#ff3b30" }} />Detail-obsessed</span>
              <span className="trait"><span className="trait-dot" style={{ background: "#00d4ff" }} />Calm over clever</span>
              <span className="trait"><span className="trait-dot" style={{ background: "#00f59b" }} />Ships, then iterates</span>
            </div>

            <div className="about-preview-actions">
              <Link href="/about" className="btn-neon-primary" onMouseEnter={() => sound.playHover()} onClick={() => sound.playClick()}>
                <span>Full story & timeline</span>
                <ArrowUpRight size={14} />
              </Link>
              <a href="mailto:shelatkarshivam4@gmail.com" className="btn-neon-outline" onMouseEnter={() => sound.playHover()} onClick={() => sound.playClick()}>
                <Mail size={14} />
                <span>Say hi</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="spatial" className="section-wrap" style={{ background: "#040507" }}>
        <div className="section-max">
          <SpatialShowcase />
        </div>
      </section>

      <section id="work" className="section-wrap">
        <div className="section-max">
          <div className="section-header-top">
            <div>
              <span className="section-badge">01 // PRODUCTION ARTIFACTS</span>
              <h2 className="section-h2">
                Flagship Case Studies <span style={{ color: "#ff3b30" }}>.</span>
              </h2>
            </div>
            <Link
              href="/work"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.68rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: "#00d4ff",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontWeight: 700
              }}
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
            >
              <span>Full System Archive</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="project-flow">
            {FEATURED_PROJECTS.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.75, delay: idx * 0.09, ease: easeTransition }}
              >
                <TiltCard href={project.href} maxTilt={6}>
                  <div className="project-card-inner">
                    <div className="project-img-box">
                      <img
                        src={project.previewImg}
                        alt={project.title}
                        className="project-img"
                        loading="lazy"
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: 18,
                          left: 18,
                          background: "rgba(6, 7, 9, 0.85)",
                          backdropFilter: "blur(8px)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          color: "#fff",
                          padding: "0.35rem 0.8rem",
                          borderRadius: 999,
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.62rem",
                          letterSpacing: "0.16em",
                          fontWeight: 700
                        }}
                      >
                        MODULE {project.id}
                      </div>
                    </div>

                    <div className="project-info-pane">
                      <div>
                        <div className="project-meta-row">
                          <span style={{ color: "#00d4ff" }}>{project.subtitle}</span>
                          <span style={{ color: "rgba(255,255,255,0.4)" }}>{project.year}</span>
                        </div>
                        <h3 className="project-title-h3">{project.title}</h3>
                        <div className="project-headline-p">{project.headline}</div>
                        <p className="project-body-p">{project.description}</p>
                        <div className="project-tags">
                          {project.tags.map((tag) => (
                            <span key={tag} className="tag-pill">{tag}</span>
                          ))}
                        </div>
                      </div>

                      <div className="project-footer-row">
                        <span className="project-stat-label" style={{ color: "#00f59b" }}>
                          ✦ {project.stats}
                        </span>
                        <span className="project-cta-link">
                          <span>Inspect Deep Dive</span>
                          <ArrowUpRight size={14} color="#00f59b" />
                        </span>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          <div style={{ marginTop: "6rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.8rem" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>
                // RESEARCH ARCHIVE &amp; EXPERIMENTAL PROTOCOLS
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#ff3b30" }}>
                04 — 06
              </span>
            </div>

            <div className="archive-deck">
              {ARCHIVE_PROJECTS.map((item) => (
                <TiltCard key={item.id} href={item.href} maxTilt={8}>
                  <div className="archive-unit">
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.8rem" }}>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#ff3b30", letterSpacing: "0.16em", fontWeight: 700 }}>{item.id}</span>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "#00f59b" }}>{item.tag}</span>
                      </div>
                      <h4 style={{ fontSize: "1.35rem", fontWeight: 700, margin: "0 0 0.5rem", letterSpacing: "-0.03em", color: "#fff" }}>{item.title}</h4>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "rgba(255,255,255,0.4)", marginBottom: "0.8rem", textTransform: "uppercase" }}>{item.category}</div>
                      <p style={{ fontSize: "0.88rem", lineHeight: 1.65, color: "rgba(255,255,255,0.65)", margin: 0 }}>{item.description}</p>
                    </div>
                    <div style={{ marginTop: "1.4rem", fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 5, color: "#00d4ff", fontWeight: 700 }}>
                      <span>{item.external ? "Open Deployed Platform" : "View Project Overview"}</span>
                      <ArrowUpRight size={13} />
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="philosophy" className="section-wrap" style={{ background: "#050608" }}>
        <div className="section-max">
          <div className="section-header-top">
            <div>
              <span className="section-badge">02 // COGNITIVE PHILOSOPHY</span>
              <h2 className="section-h2">
                Principles of Extreme Craft <span style={{ color: "#ff3b30" }}>.</span>
              </h2>
            </div>
          </div>

          <div className="principles-deck">
            {PRINCIPLES.map((item, idx) => (
              <motion.div
                key={item.num}
                className="principle-box"
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: easeTransition }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.2em", color: "#ff3b30", fontWeight: 700 }}>{item.num}</span>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#ff3b30" }} />
                </div>
                <h3 style={{ fontSize: "1.35rem", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.2, margin: 0, color: "#fff" }}>{item.title}</h3>
                <p style={{ fontSize: "0.94rem", lineHeight: 1.75, color: "rgba(255,255,255,0.65)", margin: 0 }}>{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="terminal" className="section-wrap">
        <div className="section-max">
          <div className="about-cockpit">
            <div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#00d4ff", display: "block", marginBottom: "0.8rem", fontWeight: 700 }}>
                03 // COMMAND CENTER
              </span>
              <h2 style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.04em", margin: "0 0 1.5rem", color: "#fff" }}>
                Interactive Workstation Console.
              </h2>
              <p style={{ fontSize: "1.02rem", lineHeight: 1.75, color: "rgba(255,255,255,0.7)", margin: "0 0 2.2rem" }}>
                Directly execute commands, query architecture parameters, or verify contact channels right from this console. All systems operate in real-time.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link
                  href="/about"
                  className="btn-neon-primary"
                  onMouseEnter={() => sound.playHover()}
                  onClick={() => sound.playClick()}
                >
                  <span>Complete Biography</span>
                  <ArrowUpRight size={14} />
                </Link>
                <a
                  href="/about"
                  className="btn-neon-outline"
                  onMouseEnter={() => sound.playHover()}
                  onClick={() => sound.playClick()}
                >
                  <span>Curriculum Vitae</span>
                </a>
              </div>
            </div>

            <div>
              <InteractiveTerminal />
            </div>
          </div>
        </div>
      </section>

      <section className="section-wrap" style={{ padding: "5rem clamp(20px, 4.5vw, 72px)", background: "#050608" }}>
        <div className="section-max">
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "440px",
              borderRadius: 24,
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              background: "#080a0e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <div style={{ position: "absolute", zIndex: 10, textAlign: "center", pointerEvents: "none", maxWidth: 580, padding: "0 1.5rem" }}>
              <span style={{ display: "inline-block", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#00f59b", marginBottom: "0.8rem", fontWeight: 700 }}>
                ✦ THE RECRUITER LOBBY
              </span>
              <h2 style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 700, letterSpacing: "-0.04em", margin: "0 0 1rem", color: "#fff" }}>
                Skip Automated Line.
              </h2>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", lineHeight: 1.6, color: "rgba(255,255,255,0.75)", margin: 0, background: "rgba(6,7,9,0.8)", backdropFilter: "blur(8px)", padding: "0.6rem 1.4rem", borderRadius: 999, border: "1px solid rgba(255,255,255,0.12)" }}>
                Transmit directly to my primary inbox. I review every single thoughtful message.
              </p>
            </div>

            <div style={{ position: "absolute", inset: 0, opacity: 0.35, filter: "grayscale(100%) contrast(1.2)", mixBlendMode: "screen" }}>
              <CrowdCanvas src="https://skiper-ui.com/images/peeps/all-peeps.png" rows={15} cols={7} />
            </div>
          </div>
        </div>
      </section>

      <footer id="contact" className="section-wrap" style={{ background: "#030304" }}>
        <div className="section-max">
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 0.6fr", gap: "3.5rem", marginBottom: "4.5rem" }}>
            <div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#ff3b30", display: "block", marginBottom: "1.2rem", fontWeight: 700 }}>
                04 // INITIATE TRANSMISSION
              </span>
              <h2 style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.8rem)", fontWeight: 700, lineHeight: 0.95, letterSpacing: "-0.05em", margin: "0 0 1.8rem", color: "#fff" }}>
                Have a mission worth <br />
                building? Let&apos;s talk.
              </h2>
              <div style={{ marginTop: "2rem" }}>
                <a
                  href="mailto:shelatkarshivam4@gmail.com"
                  onMouseEnter={() => sound.playHover()}
                  onClick={() => sound.playClick()}
                  style={{
                    fontSize: "clamp(1.3rem, 2.8vw, 2.1rem)",
                    fontWeight: 700,
                    color: "#fff",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.8rem",
                    borderBottom: "2px solid #ff3b30",
                    paddingBottom: "6px",
                    transition: "color 0.2s ease"
                  }}
                >
                  <span>shelatkarshivam4@gmail.com</span>
                  <ArrowUpRight size={26} color="#ff3b30" />
                </a>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", alignItems: "flex-end" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "0.5rem" }}>
                SECURE CHANNELS
              </div>
              <a
                href="https://linkedin.com/in/shivam-shelatkar"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => sound.playHover()}
                style={{ color: "#fff", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, fontSize: "1rem" }}
              >
                <Linkedin size={16} color="#00d4ff" /> <span>LinkedIn Network</span>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => sound.playHover()}
                style={{ color: "#fff", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, fontSize: "1rem" }}
              >
                <Github size={16} color="#00f59b" /> <span>GitHub Repos</span>
              </a>
              <a
                href="/about"
                onMouseEnter={() => sound.playHover()}
                style={{ color: "#fff", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, fontSize: "1rem" }}
              >
                <span>Curriculum Vitae</span>
              </a>
              <a
                href="/work"
                onMouseEnter={() => sound.playHover()}
                style={{ color: "#fff", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, fontSize: "1rem" }}
              >
                <span>Full Project Registry</span>
              </a>
            </div>
          </div>

          <div
            style={{
              paddingTop: "2.5rem",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(255, 255, 255, 0.4)",
              flexWrap: "wrap",
              gap: "1.2rem"
            }}
          >
            <div>© {new Date().getFullYear()} SHIVAM SHELATKAR · PUNE, IN · ALL RIGHTS RESERVED.</div>
            <div style={{ display: "flex", gap: "1.8rem" }}>
              <span>NEXT.JS 16 · THREE.JS · WEBGL · AUDIO SYNTH</span>
              <a
                href="#top"
                onClick={(e) => {
                  e.preventDefault();
                  sound.playClick();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onMouseEnter={() => sound.playHover()}
                style={{ color: "#00d4ff", textDecoration: "none", fontWeight: 700 }}
              >
                RETURN TO APEX ↑
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
