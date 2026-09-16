'use client';

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowUpRight, Mail, Github, Linkedin, Volume2, VolumeX } from "lucide-react";
import { CrowdCanvas } from "@/components/sections/CrowdCanvas";
import { InteractiveTerminal } from "@/components/sections/InteractiveTerminal";
import { SpatialShowcase } from "@/components/sections/SpatialShowcase";
import { sound } from "@/lib/audio";

const HeroTerrain = dynamic(
  () => import("@/components/hero/HeroTerrain").then((m) => m.HeroTerrain),
  { ssr: false }
);

const FEATURED_PROJECTS = [
  {
    id: "swarvibhaa",
    slug: "swarvibhaa",
    title: "Swarvibhaa",
    subtitle: "Founder, music and technology, 2023 to now",
    headline: "A collective where heritage keeps evolving",
    description: "I started Swarvibhaa in 2023 to give classical artists a shared home across Mumbai, Delhi, and Gujarat. I run its program, shape its sound, and built its site on Odoo. Hindustani and Western classical meet modern production here, and every performance is deliberate.",
    tags: ["Founder", "Odoo", "Hindustani and Western", "Community"],
    year: "2023 to now",
    stats: "Collective, 15+ artists, Mumbai, Delhi, Gujarat",
    href: "https://swarvibhaa.odoo.com/founders-team",
    linkLabel: "Visit the founders page",
    photoNote: "Swarvibhaa photo coming from @shastriyakid"
  },
  {
    id: "raatrani-orchestral",
    slug: "raatrani-orchestral",
    title: "Raatrani (Orchestral)",
    subtitle: "Swarvibhaa original, composer and producer",
    headline: "A night flower, scored for strings",
    description: "Raatrani began as a Swarvibhaa original and grew into a cinematic piece for strings and ambient textures. Ten years of tabla with Pandit Mukundraj Deo and six years of Trinity piano sit underneath every bar. Written for the stage, and for film.",
    tags: ["Raatrani", "Orchestral", "Composer", "Tabla and piano"],
    year: "2024",
    stats: "Original, cinematic, Swarvibhaa",
    href: "https://swarvibhaa.odoo.com/blog/swarvibhaa-originals-4/raatrani-10",
    linkLabel: "Listen to Raatrani",
    photoNote: "Raatrani artwork coming from @shastriyakid"
  },
  {
    id: "thevita-masthak",
    slug: "thevita-masthak",
    title: "Thevita Masthak Deva",
    subtitle: "Marathi bhajan, Ashadi Ekadashi 2025",
    headline: "An offering for the Wari season",
    description: "A bhajan for Lord Vitthal, released on Ashadi Ekadashi 2025. Tarang Sashte and I arranged it together, keeping the Varkari devotion intact while producing it for modern ears.",
    tags: ["Varkari", "Bhajan", "2025", "Arrangement"],
    year: "2025",
    stats: "Wari, Varkari heritage",
    href: "https://swarvibhaa.odoo.com/blog/swarvibhaa-originals-4/thevita-masthak-deva-tuzha-payi-3",
    linkLabel: "Listen to Thevita",
    photoNote: "Thevita photo coming from @shastriyakid"
  }
];
const ARCHIVE_PROJECTS = [
  {
    title: "Saffron suraaval",
    category: "Instrumental, Indo-Western",
    description: "A quiet instrumental piece about feeling and change. Minimal arrangement, recorded simply, played live with Swarvibhaa.",
    year: "2024",
    href: "https://swarvibhaa.odoo.com/blog/swarvibhaa-originals-4/saffron-suraaval-9",
    linkLabel: "Listen on the Swarvibhaa blog"
  },
  {
    title: "Unity and code",
    category: "Independent game development, since 2017",
    description: "Engineer by training, Unity developer since 2017. I build small interactive worlds, usually with rhythm systems hiding inside them.",
    year: "Since 2017",
    href: "https://github.com/sashtriyasam",
    linkLabel: "Browse on GitHub"
  },
  {
    title: "ABVP Thane",
    category: "Student activities convenor",
    description: "I convene technical-education student activities for ABVP in Thane district: organising across campuses and keeping tradition and technology in conversation.",
    year: "2023 to now",
    href: "https://linkedin.com/in/shivam-shelatkar-503305358",
    linkLabel: "Connect on LinkedIn"
  }
];

const PRINCIPLES = [
  {
    title: "Rhythm first.",
    body: "Ten years of tabla taught me that timing carries everything. I start projects by finding the pulse: what repeats, what breathes, where the pause goes. Structure before decoration."
  },
  {
    title: "Tradition into code.",
    body: "I grew up inside Hindustani classical music and now build software. Both reward the same habits: practice, listening, and knowing which rules to keep. I like work that sits at that crossing."
  },
  {
    title: "Quiet tools.",
    body: "The best instruments disappear in your hands. I build interfaces and systems that stay out of the way: plain language, few controls, nothing blinking for attention."
  }
];

const LIFE_PHOTOS = [
  { label: "Photo coming from @shastriyakid", caption: "The house cats, who run the place" },
  { label: "Photo coming from @shastriyakid", caption: "Tabla practice, ten years with Pandit Mukundraj Deo" },
  { label: "Photo coming from @shastriyakid", caption: "Piano, six years through Trinity" },
  { label: "Photo coming from @shastriyakid", caption: "A Swarvibhaa baithak in Mumbai" },
  { label: "Photo coming from @shastriyakid", caption: "Blue hour, Karwar to Mumbai" },
  { label: "Photo coming from @shastriyakid", caption: "ABVP work in Thane district" }
];

export default function HomePage() {
  const [time, setTime] = useState("--:--");
  const [mounted, setMounted] = useState(false);
  const [soundActive, setSoundActive] = useState(false);
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
    return () => clearInterval(interval);
  }, []);

  const toggleAudio = () => {
    const isEnabled = sound.toggle();
    setSoundActive(isEnabled);
  };

  const easeTransition = [0.16, 1, 0.3, 1] as const;
  const still = shouldReduceMotion ? undefined : { opacity: 0, y: 12 };

  return (
    <div className="home-root" id="top">
      <style>{`
        .home-root {
          background-color: #060709;
          color: #f0f2f5;
          font-family: var(--font-body);
          position: relative;
          overflow-x: hidden;
          min-height: 100vh;
        }
        
        .home-root a:focus-visible,
        .home-root button:focus-visible {
          outline: 2px solid var(--color-focus);
          outline-offset: 3px;
          border-radius: 4px;
        }

        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          padding: 0 clamp(20px, 4.5vw, 72px);
          min-height: 60px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(6, 7, 9, 0.9);
          position: sticky;
          top: 0;
          z-index: 60;
        }
        .brand {
          font-weight: 700;
          font-size: 16px;
          letter-spacing: -0.01em;
          color: #fff;
          text-decoration: none;
        }
        .topnav {
          display: flex;
          align-items: center;
          gap: 28px;
        }
        .topnav a {
          color: rgba(255, 255, 255, 0.68);
          text-decoration: none;
          font-size: 15px;
        }
        .topnav a:hover { color: #fff; }
        .topmeta {
          display: flex;
          align-items: center;
          gap: 16px;
          font-family: var(--font-mono);
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
        }
        .clock { font-variant-numeric: tabular-nums; }
        .sound-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.16);
          color: rgba(255, 255, 255, 0.75);
          padding: 8px 14px;
          border-radius: 999px;
          font-family: var(--font-mono);
          font-size: 12px;
          cursor: pointer;
          min-height: 36px;
        }
        .sound-btn:hover { border-color: rgba(255, 255, 255, 0.4); color: #fff; }

        .hero {
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: calc(100vh - 60px);
          min-height: calc(100dvh - 60px);
          padding: 64px clamp(20px, 4.5vw, 72px) 96px;
          isolation: isolate;
        }
        .hero-bg { position: absolute; inset: 0; z-index: 0; }
        .hero-scrim {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: linear-gradient(180deg, rgba(6,7,9,0.55) 0%, rgba(6,7,9,0.82) 100%);
        }
        .hero-inner {
          position: relative;
          z-index: 2;
          max-width: 1240px;
          width: 100%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .kicker {
          margin: 0;
          font-family: var(--font-mono);
          font-size: 13px;
          letter-spacing: 0.04em;
          color: rgba(255, 255, 255, 0.6);
        }
        .hero-name {
          margin: 0;
          font-size: clamp(48px, 8vw, 112px);
          font-weight: 700;
          line-height: 0.95;
          letter-spacing: -0.04em;
          color: #fff;
        }
        .hero-about {
          margin: 0;
          font-size: 17px;
          line-height: 1.7;
          letter-spacing: -0.01em;
          color: rgba(255, 255, 255, 0.78);
          max-width: 65ch;
        }
        .hero-ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 8px;
        }
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          border-radius: 999px;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          min-height: 48px;
        }
        .btn-solid { background: #fff; color: #060709; border: 1px solid #fff; }
        .btn-solid:hover { background: rgba(255, 255, 255, 0.88); }
        .btn-outline {
          background: transparent;
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.28);
        }
        .btn-outline:hover { border-color: #fff; }
        .scroll-hint {
          position: absolute;
          left: 50%;
          bottom: 24px;
          transform: translateX(-50%);
          z-index: 2;
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.45);
          text-decoration: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .scroll-hint:hover { color: #fff; }
        .scroll-hint::after {
          content: "";
          display: block;
          width: 1px;
          height: 28px;
          background: rgba(255, 255, 255, 0.3);
        }
        .section {
          padding: 96px clamp(20px, 4.5vw, 72px);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          position: relative;
          z-index: 1;
        }
        .section-inner { max-width: 1240px; margin: 0 auto; }
        .eyebrow {
          display: block;
          font-family: var(--font-mono);
          font-size: 13px;
          letter-spacing: 0.06em;
          color: rgba(255, 255, 255, 0.5);
          margin: 0 0 12px;
        }
        .h2 {
          margin: 0 0 16px;
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.03em;
          color: #fff;
        }
        .lede {
          margin: 0 0 40px;
          font-size: 17px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.7);
          max-width: 65ch;
        }
        .body-text {
          margin: 0;
          font-size: 17px;
          line-height: 1.75;
          color: rgba(255, 255, 255, 0.78);
        }
        .body-text + .body-text { margin-top: 16px; }
        .body-text strong { color: #fff; font-weight: 700; }
        .body-text a { color: #fff; text-decoration: underline; text-underline-offset: 3px; }
        .section-head-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 40px;
        }
        .quiet-link {
          font-size: 15px;
          font-weight: 600;
          color: #fff;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.35);
          padding-bottom: 2px;
        }
        .quiet-link:hover { border-bottom-color: #fff; }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: start;
        }
        .fact-list {
          list-style: none;
          margin: 28px 0 0;
          padding: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          overflow: hidden;
        }
        .fact-list li { background: #0c0e14; padding: 18px 20px; }
        .fact-num { display: block; font-size: 20px; font-weight: 700; color: #fff; letter-spacing: -0.02em; }
        .fact-label { display: block; margin-top: 4px; font-size: 13px; color: rgba(255, 255, 255, 0.55); }
        .about-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 32px; }

        .life-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .life-grid figure { margin: 0; }
        .photo-placeholder {
          background: #141820;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          aspect-ratio: 1;
          display: grid;
          place-items: center;
          padding: 24px;
          text-align: center;
        }
        .photo-placeholder span {
          font-family: var(--font-mono);
          font-size: 12px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.45);
        }
        .life-grid figcaption {
          margin-top: 10px;
          font-size: 13px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.65);
        }

        .work-list { display: flex; flex-direction: column; gap: 24px; }
        .work-card {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          overflow: hidden;
          background: #0c0e14;
          text-decoration: none;
          color: inherit;
        }
        .work-card:hover { border-color: rgba(255, 255, 255, 0.28); }
        .work-photo {
          background: #141820;
          min-height: 320px;
          display: grid;
          place-items: center;
          padding: 32px;
          text-align: center;
          border-right: 1px solid rgba(255, 255, 255, 0.08);
        }
        .work-photo span {
          font-family: var(--font-mono);
          font-size: 12px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.45);
        }
        .work-info { padding: 32px; display: flex; flex-direction: column; gap: 12px; }
        .work-sub {
          margin: 0;
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.04em;
          color: rgba(255, 255, 255, 0.5);
        }
        .work-title { margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.02em; color: #fff; }
        .work-headline { margin: 0; font-size: 17px; font-weight: 600; color: #fff; }
        .work-desc { margin: 0; font-size: 16px; line-height: 1.7; color: rgba(255, 255, 255, 0.7); max-width: 65ch; }
        .work-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px; }
        .work-tags span {
          font-family: var(--font-mono);
          font-size: 12px;
          padding: 6px 12px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          color: rgba(255, 255, 255, 0.65);
        }
        .work-foot {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: auto;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
        .work-stats { font-size: 14px; color: rgba(255, 255, 255, 0.55); }
        .work-go {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 15px;
          font-weight: 600;
          color: #fff;
        }

        .archive-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 64px; }
        .archive-sub { margin: 0 0 24px; font-size: 22px; font-weight: 700; letter-spacing: -0.02em; color: #fff; }
        .archive-card {
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 28px;
          background: #0c0e14;
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .archive-card:hover { border-color: rgba(255, 255, 255, 0.28); }
        .archive-cat { margin: 0; font-family: var(--font-mono); font-size: 12px; color: rgba(255, 255, 255, 0.5); }
        .archive-title { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.02em; color: #fff; }
        .archive-desc { margin: 0; font-size: 16px; line-height: 1.7; color: rgba(255, 255, 255, 0.65); }
        .archive-year { margin: 0; font-size: 13px; color: rgba(255, 255, 255, 0.45); }
        .archive-go {
          margin-top: auto;
          padding-top: 16px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 15px;
          font-weight: 600;
          color: #fff;
        }

        .principles-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .principle { border-top: 1px solid rgba(255, 255, 255, 0.16); padding-top: 20px; }
        .principle h3 { margin: 0 0 10px; font-size: 20px; font-weight: 700; letter-spacing: -0.02em; color: #fff; }
        .principle p { margin: 0; font-size: 16px; line-height: 1.75; color: rgba(255, 255, 255, 0.7); }

        .terminal-grid { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 48px; align-items: center; }
        .terminal-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px; }

        .recruit-box {
          position: relative;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          overflow: hidden;
          background: #080a0e;
          padding: 88px 24px;
          text-align: center;
        }
        .recruit-art { position: absolute; inset: 0; opacity: 0.25; pointer-events: none; }
        .recruit-inner { position: relative; z-index: 1; max-width: 560px; margin: 0 auto; display: flex; flex-direction: column; gap: 16px; align-items: center; }
        .recruit-inner .h2 { margin: 0; }
        .recruit-inner .lede { margin: 0; }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 48px;
          margin-bottom: 64px;
        }
        .email-big {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-top: 24px;
          font-size: clamp(20px, 2.6vw, 30px);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #fff;
          text-decoration: none;
          border-bottom: 2px solid rgba(255, 255, 255, 0.35);
          padding-bottom: 6px;
          overflow-wrap: anywhere;
        }
        .email-big:hover { border-bottom-color: #fff; }
        .channel-label {
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.06em;
          color: rgba(255, 255, 255, 0.45);
          margin: 0 0 8px;
        }
        .channel-list { display: flex; flex-direction: column; gap: 14px; }
        .channel-list a {
          color: #fff;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 16px;
        }
        .channel-list a:hover { text-decoration: underline; text-underline-offset: 3px; }
        .footer-base {
          padding-top: 32px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.45);
        }
        .to-top {
          background: transparent;
          border: 0;
          padding: 8px 0;
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        }
        .to-top:hover { text-decoration: underline; text-underline-offset: 3px; }

        @media (max-width: 960px) {
          .topnav { display: none; }
          .about-grid { grid-template-columns: 1fr; }
          .life-grid { grid-template-columns: repeat(2, 1fr); }
          .work-card { grid-template-columns: 1fr; }
          .work-photo { min-height: 220px; border-right: 0; border-bottom: 1px solid rgba(255, 255, 255, 0.08); }
          .archive-grid { grid-template-columns: 1fr; }
          .principles-grid { grid-template-columns: 1fr; }
          .terminal-grid { grid-template-columns: 1fr; }
          .footer-grid { grid-template-columns: 1fr; }
          .section { padding: 64px clamp(20px, 4.5vw, 72px); }
        }
        @media (max-width: 560px) {
          .life-grid { grid-template-columns: 1fr; }
          .fact-list { grid-template-columns: 1fr 1fr; }
          .hero { padding-top: 48px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .home-root *, .home-root *::before, .home-root *::after {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
      <header className="topbar">
        <a href="#top" className="brand" onMouseEnter={() => sound.playHover()}>Shivam Shelatkar</a>
        <nav className="topnav" aria-label="Sections">
          <a href="#work" onMouseEnter={() => sound.playHover()}>Work</a>
          <a href="#life" onMouseEnter={() => sound.playHover()}>Life</a>
          <a href="/about" onMouseEnter={() => sound.playHover()}>About</a>
          <a href="#contact" onMouseEnter={() => sound.playHover()}>Contact</a>
        </nav>
        <div className="topmeta">
          <span className="clock">{mounted ? time : "--:--"} IST</span>
          <button
            type="button"
            className="sound-btn"
            onClick={toggleAudio}
            aria-pressed={soundActive}
          >
            {soundActive ? <Volume2 size={13} /> : <VolumeX size={13} />}
            <span>{soundActive ? "Sound on" : "Sound off"}</span>
          </button>
        </div>
      </header>

      <section className="hero" aria-label="Introduction">
        <div className="hero-bg" style={{ opacity: mounted ? 1 : 0, transition: "opacity 1.2s ease" }}>
          <HeroTerrain />
        </div>
        <div className="hero-scrim" aria-hidden />

        <div className="hero-inner">
          <motion.p
            className="kicker"
            initial={still}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: easeTransition }}
          >
            Founder @Swarvibhaa — tabla · piano · Unity
          </motion.p>
          <motion.h1
            className="hero-name"
            initial={still}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: 0.04, ease: easeTransition }}
          >
            Shivam Shelatkar
          </motion.h1>
          <motion.p
            className="hero-about"
            initial={still}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: 0.08, ease: easeTransition }}
          >
            Born in Karwar, grown in Mumbai. I trained in tabla for ten years under Pandit Mukundraj Deo and in piano for six years through Trinity, and now I run Swarvibhaa, a collective for classical artists across Mumbai, Delhi, and Gujarat. I have been building interactive things in Unity since 2017.
          </motion.p>
          <motion.div
            className="hero-ctas"
            initial={still}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: 0.12, ease: easeTransition }}
          >
            <a
              href="#work"
              className="btn btn-solid"
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
            >
              <span>See work</span>
            </a>
            <a
              href="https://swarvibhaa.odoo.com/blog/swarvibhaa-originals-4/raatrani-10"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
            >
              <span>Listen to Raatrani</span>
              <ArrowUpRight size={15} />
            </a>
          </motion.div>
        </div>

        <a
          href="#about-preview"
          className="scroll-hint"
          onMouseEnter={() => sound.playHover()}
          aria-label="Scroll to about me"
        >
          <span>Scroll</span>
        </a>
      </section>
      <section id="about-preview" className="section" aria-label="About me">
        <div className="section-inner about-grid">
          <motion.div
            initial={still}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.28, ease: easeTransition }}
          >
            <span className="eyebrow">About</span>
            <h2 className="h2">Rooted in tradition, working in code.</h2>
            <ul className="fact-list">
              <li><span className="fact-num">10 yrs</span><span className="fact-label">Tabla, Pandit Mukundraj Deo</span></li>
              <li><span className="fact-num">6 yrs</span><span className="fact-label">Piano, Trinity College London</span></li>
              <li><span className="fact-num">2023</span><span className="fact-label">Founded Swarvibhaa</span></li>
              <li><span className="fact-num">2017</span><span className="fact-label">Building in Unity since</span></li>
            </ul>
          </motion.div>

          <motion.div
            initial={still}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.28, ease: easeTransition }}
          >
            <p className="body-text">
              Hi, I am <strong>Shivam Shelatkar</strong>, known online as <strong>@shastriyakid</strong>. I was born in Karwar and grew up in Mumbai, and I split my days between music and software.
            </p>
            <p className="body-text">
              In 2023 I founded <strong>Swarvibhaa</strong>, a collective for Hindustani and Western classical music, dance, and visual art, now active across Mumbai, Delhi, and Gujarat. I produce Swarvibhaa originals like Raatrani, Thevita Masthak Deva, and Saffron, mostly behind the scenes where the sonic detail lives.
            </p>
            <p className="body-text">
              Outside music I am an engineer working in Unity since 2017. I speak English, Hindi, Malayalam, Gujarati, and Marathi, convene student activities for ABVP in Thane, and hold screen credits on IMDb (nm17605062). I love cats, the colour blue, and work that treats heritage as something alive.
            </p>
            <div className="about-actions">
              <Link
                href="/about"
                className="btn btn-solid"
                onMouseEnter={() => sound.playHover()}
                onClick={() => sound.playClick()}
              >
                <span>Read the full story</span>
              </Link>
              <a
                href="mailto:shelatkarshivam4@gmail.com"
                className="btn btn-outline"
                onMouseEnter={() => sound.playHover()}
                onClick={() => sound.playClick()}
              >
                <Mail size={15} />
                <span>Email me</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="life" className="section" aria-label="Life off stage">
        <div className="section-inner">
          <motion.div
            initial={still}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.28, ease: easeTransition }}
          >
            <span className="eyebrow">Life</span>
            <div className="section-head-row">
              <h2 className="h2" style={{ margin: 0 }}>Off stage.</h2>
              <a
                href="https://www.instagram.com/shastriyakid"
                target="_blank"
                rel="noopener noreferrer"
                className="quiet-link"
                onMouseEnter={() => sound.playHover()}
              >
                <span>Follow @shastriyakid</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
            <p className="lede">
              What I get up to when I am not performing or shipping. The frames below are placeholders, waiting on real photos from @shastriyakid.
            </p>
          </motion.div>
          <div className="life-grid">
            {LIFE_PHOTOS.map((photo, i) => (
              <motion.figure
                key={photo.caption}
                initial={still}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.28, ease: easeTransition }}
              >
                {/* Photo placeholder: replace this div with a real image, e.g. <img src="/photos/filename.jpg" alt="..." style={{ width: "100%", aspectRatio: "1", objectFit: "cover", borderRadius: 12 }} />. Keep the figcaption below as the caption. */}
                <div className="photo-placeholder">
                  <span>{photo.label}</span>
                </div>
                <figcaption>{photo.caption}</figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <section id="spatial" className="section" style={{ background: "#040507" }} aria-label="Spatial showcase">
        <div className="section-inner">
          <SpatialShowcase />
        </div>
      </section>
      <section id="work" className="section" aria-label="Selected work">
        <div className="section-inner">
          <motion.div
            initial={still}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.28, ease: easeTransition }}
          >
            <span className="eyebrow">Work</span>
            <div className="section-head-row">
              <h2 className="h2" style={{ margin: 0 }}>Selected work.</h2>
              <Link
                href="/work"
                className="quiet-link"
                onMouseEnter={() => sound.playHover()}
                onClick={() => sound.playClick()}
              >
                <span>All work</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </motion.div>

          <div className="work-list">
            {FEATURED_PROJECTS.map((project) => (
              <motion.a
                key={project.id}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="work-card"
                onMouseEnter={() => sound.playHover()}
                onClick={() => sound.playClick()}
                initial={still}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.28, ease: easeTransition }}
              >
                {/* Photo placeholder: replace this div with a real image, e.g. <img src="/photos/filename.jpg" alt="..." style={{ width: "100%", height: "100%", objectFit: "cover" }} />. */}
                <div className="work-photo">
                  <span>{project.photoNote}</span>
                </div>
                <div className="work-info">
                  <p className="work-sub">{project.subtitle}</p>
                  <h3 className="work-title">{project.title}</h3>
                  <p className="work-headline">{project.headline}</p>
                  <p className="work-desc">{project.description}</p>
                  <div className="work-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div className="work-foot">
                    <span className="work-stats">{project.stats} · {project.year}</span>
                    <span className="work-go">
                      <span>{project.linkLabel}</span>
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          <div className="archive-grid-wrap" style={{ marginTop: 64 }}>
            <h3 className="archive-sub">More work.</h3>
            <div className="archive-grid">
              {ARCHIVE_PROJECTS.map((item) => (
                <motion.a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="archive-card"
                  onMouseEnter={() => sound.playHover()}
                  onClick={() => sound.playClick()}
                  initial={still}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.28, ease: easeTransition }}
                >
                  <p className="archive-cat">{item.category}</p>
                  <h4 className="archive-title">{item.title}</h4>
                  <p className="archive-desc">{item.description}</p>
                  <p className="archive-year">{item.year}</p>
                  <span className="archive-go">
                    <span>{item.linkLabel}</span>
                    <ArrowUpRight size={13} />
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="philosophy" className="section" style={{ background: "#050608" }} aria-label="Principles">
        <div className="section-inner">
          <motion.div
            initial={still}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.28, ease: easeTransition }}
          >
            <span className="eyebrow">Principles</span>
            <h2 className="h2">How I work.</h2>
            <p className="lede">Three habits from the practice room that run my engineering too.</p>
          </motion.div>
          <div className="principles-grid">
            {PRINCIPLES.map((item) => (
              <motion.div
                key={item.title}
                className="principle"
                initial={still}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.28, ease: easeTransition }}
              >
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="terminal" className="section" aria-label="Console">
        <div className="section-inner terminal-grid">
          <motion.div
            initial={still}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.28, ease: easeTransition }}
          >
            <span className="eyebrow">Console</span>
            <h2 className="h2">Ask the console.</h2>
            <p className="body-text">
              This terminal answers questions about my work, my music, and how to reach me. Type help to see what it knows.
            </p>
            <div className="terminal-actions">
              <Link
                href="/about"
                className="btn btn-outline"
                onMouseEnter={() => sound.playHover()}
                onClick={() => sound.playClick()}
              >
                <span>More about me</span>
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={still}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.28, ease: easeTransition }}
          >
            <InteractiveTerminal />
          </motion.div>
        </div>
      </section>
      <section className="section" style={{ background: "#050608" }} aria-label="For recruiters">
        <div className="section-inner">
          <motion.div
            className="recruit-box"
            initial={still}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.28, ease: easeTransition }}
          >
            <div className="recruit-art" aria-hidden>
              <CrowdCanvas src="https://skiper-ui.com/images/peeps/all-peeps.png" rows={15} cols={7} />
            </div>
            <div className="recruit-inner">
              <span className="eyebrow" style={{ margin: 0 }}>For recruiters</span>
              <h2 className="h2">Hiring? Write to me directly.</h2>
              <p className="lede">No forms, no portals. I read every thoughtful message and reply within a few days.</p>
              <a
                href="mailto:shelatkarshivam4@gmail.com"
                className="btn btn-solid"
                onMouseEnter={() => sound.playHover()}
                onClick={() => sound.playClick()}
              >
                <Mail size={15} />
                <span>Email me</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <footer id="contact" className="section" style={{ background: "#030304" }} aria-label="Contact">
        <div className="section-inner">
          <div className="footer-grid">
            <div>
              <span className="eyebrow">Contact</span>
              <h2 className="h2">Have something worth making? Write to me.</h2>
              <a
                href="mailto:shelatkarshivam4@gmail.com"
                className="email-big"
                onMouseEnter={() => sound.playHover()}
                onClick={() => sound.playClick()}
              >
                <span>shelatkarshivam4@gmail.com</span>
                <ArrowUpRight size={24} />
              </a>
            </div>
            <div>
              <p className="channel-label">Elsewhere</p>
              <div className="channel-list">
                <a
                  href="https://linkedin.com/in/shivam-shelatkar-503305358"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => sound.playHover()}
                >
                  <Linkedin size={16} /> <span>LinkedIn — Shivam Shelatkar</span>
                </a>
                <a
                  href="https://github.com/sashtriyasam"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => sound.playHover()}
                >
                  <Github size={16} /> <span>GitHub — sashtriyasam</span>
                </a>
                <a
                  href="https://www.instagram.com/shastriyakid"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => sound.playHover()}
                >
                  <span aria-hidden>@</span> <span>Instagram — @shastriyakid</span>
                </a>
                <a
                  href="https://www.imdb.com/name/nm17605062/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => sound.playHover()}
                >
                  <span aria-hidden style={{ fontWeight: 800, fontSize: 12 }}>IMDb</span> <span>IMDb — nm17605062</span>
                </a>
              </div>
            </div>
          </div>

          <div className="footer-base">
            <div>© {new Date().getFullYear()} Shivam Shelatkar · Karwar to Mumbai</div>
            <button
              type="button"
              className="to-top"
              onClick={() => {
                sound.playClick();
                window.scrollTo({ top: 0, behavior: shouldReduceMotion ? "auto" : "smooth" });
              }}
              onMouseEnter={() => sound.playHover()}
            >
              Back to top
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}




