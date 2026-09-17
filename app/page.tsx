'use client';

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { sound } from "@/lib/audio";
import { AnimatedFooter } from "@/components/ui/animated-footer";
import { VariableFontHover } from "@/components/ui/variable-font-hover";

const EASE = [0.16, 1, 0.3, 1] as const;

const PILLS = [
  "Tabla 10 yrs",
  "Piano Trinity 6 yrs",
  "Unity since 2017",
  "Founder at Swarvibhaa",
];

const WORK = [
  {
    title: "Raatrani",
    medium: "Film score, 2024, composer",
    desc: "A night flower scored for strings and quiet textures, written for stage and film.",
    href: "https://swarvibhaa.odoo.com/blog/swarvibhaa-originals-4/raatrani-10",
    cta: "Listen",
    note: "Raatrani artwork coming from @shastriyakid",
  },
  {
    title: "Thevita masthak deva",
    medium: "Bhajan, 2025, arrangement",
    desc: "A Marathi bhajan for Lord Vitthal, released on Ashadi Ekadashi with Tarang Sashte.",
    href: "https://swarvibhaa.odoo.com/blog/swarvibhaa-originals-4/thevita-masthak-deva-tuzha-payi-3",
    cta: "Listen",
    note: "Thevita photo coming from @shastriyakid",
  },
  {
    title: "Saffron",
    medium: "Interactive piece, Swarvibhaa original",
    desc: "A quiet instrumental about feeling and change, played live and kept minimal.",
    href: "https://swarvibhaa.odoo.com/blog/swarvibhaa-originals-4/saffron-suraaval-9",
    cta: "Listen",
    note: "Saffron photo coming from @shastriyakid",
  },
];

const CAPS = [
  {
    title: "Tabla",
    meta: "10 yrs, Pandit Mukundraj Deo",
    body: "Ten years of taal and accompaniment. Timing first, decoration last.",
  },
  {
    title: "Piano",
    meta: "6 yrs, Trinity College London",
    body: "Six years of Western harmony and voicing, from grades to arranging.",
  },
  {
    title: "Unity",
    meta: "Since 2017",
    body: "Small interactive worlds with rhythm systems hiding inside them.",
  },
];

const TIMELINE = [
  {
    title: "Thane, born",
    body: "Thane roots, first rhythms, long train rides nearby.",
  },
  {
    title: "Mumbai, grown",
    body: "Tabla, piano, and engineering. Cats at home, blue everywhere.",
  },
  {
    title: "Swarvibhaa, 2023",
    body: "Founder. Mumbai, Delhi, Gujarat. Hindustani meets Western classical.",
  },
];

const SOCIALS = [
  { href: "https://www.instagram.com/shastriyakid", label: "Instagram, @shastriyakid" },
  { href: "https://linkedin.com/in/shivam-shelatkar-503305358", label: "LinkedIn, Shivam Shelatkar" },
  { href: "https://github.com/sashtriyasam", label: "GitHub, sashtriyasam" },
  { href: "https://www.imdb.com/name/nm17605062/", label: "IMDb, nm17605062" },
];

const CONTACT_LINES = ["Make", "something", "worth keeping."];

const HOME_FOOTER_LEFT = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const HOME_FOOTER_RIGHT = [
  { label: "LinkedIn", href: "https://linkedin.com/in/shivam-shelatkar-503305358" },
  { label: "GitHub", href: "https://github.com/sashtriyasam" },
  { label: "Instagram", href: "https://www.instagram.com/shastriyakid" },
  { label: "IMDb", href: "https://www.imdb.com/name/nm17605062/" },
  { label: "Swarvibhaa", href: "https://swarvibhaa.odoo.com/" },
];

// Magnetic pull for the primary CTA: 6-12px toward the cursor (clamped to
// 10px at a 0.2 follow ratio), easing back over 300ms. Enabled for fine
// pointers without touch only; reduced-motion renders the resting state.
function Magnetic({ children, disabled }: { children: ReactNode; disabled?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [canMagnet, setCanMagnet] = useState(false);

  useEffect(() => {
    if (disabled) {
      setCanMagnet(false);
      return;
    }
    const fine = window.matchMedia("(pointer: fine)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setCanMagnet(fine && !coarse && !hasTouch);
  }, [disabled]);

  const handleMove = (e: { clientX: number; clientY: number }) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const max = 10;
    setPos({
      x: Math.max(-max, Math.min(max, dx * 0.2)),
      y: Math.max(-max, Math.min(max, dy * 0.2)),
    });
  };

  const handleLeave = () => setPos({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={canMagnet ? handleMove : undefined}
      onMouseLeave={canMagnet ? handleLeave : undefined}
      animate={{ x: canMagnet ? pos.x : 0, y: canMagnet ? pos.y : 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      style={{ display: "inline-flex" }}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();
  const reduced = Boolean(shouldReduceMotion);

  const toTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <div className="home-root" id="top">
        <h1 className="sr-only">Shivam Shelatkar — Portfolio Home</h1>
      <style>{`
        .home-root {
          background-color: #FFF8EF;
          color: #1A1512;
          font-family: var(--font-body);
          min-height: 100vh;
          overflow-x: hidden;
        }
        
        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          padding: 0 clamp(20px, 4vw, 40px);
          min-height: 64px;
          border-bottom: 1px solid #EADDCB;
          background: #FFF8EF;
          position: sticky;
          top: 0;
          z-index: 50;
        }
        .brand {
          font-weight: 800;
          font-size: 17px;
          letter-spacing: -0.02em;
          color: #1A1512;
          text-decoration: none;
        }
        .brand em { font-style: normal; color: #E4572E; }
        .topnav { display: flex; align-items: center; gap: 28px; }
        .topnav a {
          color: #1A1512;
          text-decoration: none;
          font-size: 15px;
        }
        .topnav a { position: relative; padding-bottom: 2px; }
        .topnav a:hover { text-decoration: none; }
        .topnav a::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -2px;
          height: 1px;
          width: 100%;
          background: currentColor;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .topnav a:hover::after { transform: scaleX(1); }
        .wrap { max-width: 1120px; margin: 0 auto; }
        .section {
          padding: 120px clamp(20px, 4vw, 40px);
          border-top: 1px solid #EADDCB;
        }
        .section:first-of-type { border-top: 0; }
        .eyebrow {
          display: block;
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #7A7168;
          margin: 0 0 16px;
        }
        .h2 {
          margin: 0 0 12px;
          font-size: clamp(28px, 3.5vw, 40px);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.1;
        }
        .lede {
          margin: 0;
          font-size: 16px;
          line-height: 1.7;
          color: #7A7168;
          max-width: 60ch;
        }
        .hero-name { margin: 0; }
        .hero-first {
          display: block;
          font-size: clamp(72px, 14vw, 168px);
          line-height: 0.9;
          letter-spacing: -0.05em;
          font-weight: 800;
          color: #1A1512;
        }
        .hero-last {
          display: block;
          margin-top: 10px;
          font-size: clamp(26px, 4vw, 44px);
          font-weight: 400;
          letter-spacing: -0.03em;
          color: #7A7168;
        }
        .hero-intro {
          margin: 24px 0 0;
          font-size: 17px;
          line-height: 1.7;
          max-width: 60ch;
          color: #1A1512;
        }
        .pills { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 24px; }
        .pill {
          font-family: var(--font-mono);
          font-size: 12px;
          padding: 8px 16px;
          border-radius: 999px;
          border: 1px solid #2F5D50;
          color: #2F5D50;
          background: transparent;
          white-space: nowrap;
        }
        .hero-ctas { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px; }
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
          border: 1px solid #1A1512;
        }
        .btn-primary { background: #E4572E; border-color: #E4572E; color: #FFF8EF; transition: background-color 250ms ease, color 250ms ease, border-color 250ms ease; will-change: transform; }
        .btn-primary:hover { background: #1A1512; border-color: #1A1512; color: #FFF8EF; }
        .btn-outline { background: transparent; color: #1A1512; }
        .btn-outline:hover { border-color: #E4572E; color: #E4572E; }
        .work-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 40px;
        }
        .work-card {
          display: flex;
          flex-direction: column;
          border: 1px solid #EADDCB;
          border-radius: 24px;
          overflow: hidden;
          background: #FFFEFA;
          text-decoration: none;
          color: inherit;
          transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 300ms cubic-bezier(0.16, 1, 0.3, 1), border-color 300ms ease;
        }
        .work-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(26, 21, 18, 0.12); border-color: #1A1512; }
        .work-reveal { display: flex; min-width: 0; }
        .work-reveal > .work-card { flex: 1 1 auto; width: 100%; }
        .work-media {
          background: #141820;
          aspect-ratio: 4 / 3;
          display: grid;
          place-items: center;
          padding: 24px;
          text-align: center;
          overflow: hidden;
        }
        .work-media span {
          display: block;
          font-family: var(--font-mono);
          font-size: 12px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.55);
          transition: transform 450ms cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform;
        }
        .work-card:hover .work-media span { transform: scale(1.05); }
        .work-body { padding: 20px 22px 24px; display: flex; flex-direction: column; gap: 0; }
        .work-title { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.02em; }
        .work-medium { margin: 6px 0 0; font-family: var(--font-mono); font-size: 12px; color: #7A7168; }
        .work-desc { margin: 12px 0 0; font-size: 15px; line-height: 1.65; }
        .work-link { margin-top: 14px; font-size: 14px; font-weight: 700; display: inline-flex; gap: 6px; align-items: center; }
        .work-link i { font-style: normal; color: #E4572E; }
        .work-arrow { display: inline-block; color: #E4572E; transition: transform 250ms cubic-bezier(0.16, 1, 0.3, 1); will-change: transform; }
        .work-card:hover .work-arrow { transform: translateX(10px); }
        .thesis {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(28px, 4vw, 44px);
          line-height: 1.25;
          letter-spacing: -0.02em;
          text-align: center;
          max-width: 24ch;
          margin: 0 auto;
        }
        .thesis em { font-style: italic; color: #E4572E; }
        .cap-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 40px; }
        .cap {
          border: 1px solid #EADDCB;
          border-radius: 24px;
          padding: 28px;
          background: #FFFEFA;
        }
        .cap-num { display: block; font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.08em; color: #E4572E; margin-bottom: 10px; }
        .cap h3 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.02em; }
        .cap-meta { margin: 6px 0 0; font-family: var(--font-mono); font-size: 12px; color: #7A7168; }
        .cap p:last-child { margin: 12px 0 0; font-size: 15px; line-height: 1.65; }
        .strip {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border: 1px solid #EADDCB;
          border-radius: 24px;
          overflow: hidden;
          background: #FFFEFA;
          margin-top: 40px;
        }
        .strip div { padding: 24px; }
        .timeline-cell { position: relative; }
        .strip .timeline-rule {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          margin: 0;
          padding: 0;
          background: #E4572E;
          transform-origin: top;
        }
        .strip div + div { border-left: 1px solid #EADDCB; }
        .strip strong { display: block; font-size: 16px; letter-spacing: -0.01em; }
        .strip span { display: block; margin-top: 6px; font-size: 14px; line-height: 1.6; color: #7A7168; }
        .life-note { margin: 24px 0 0; font-size: 15px; line-height: 1.7; max-width: 68ch; }
        .life-note a { color: #1A1512; text-underline-offset: 3px; }
        .quiet-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 16px;
        }
        .quiet-link {
          font-size: 15px;
          font-weight: 700;
          color: #1A1512;
          text-decoration: none;
          border-bottom: 1px solid #EADDCB;
          padding-bottom: 2px;
          display: inline-flex;
          gap: 6px;
          align-items: center;
        }
        .quiet-link:hover { border-bottom-color: #E4572E; color: #E4572E; }
        .quiet-link i { font-style: normal; }
        .contact-words { margin: 0; }
        .contact-words span {
          display: block;
          font-size: clamp(48px, 9vw, 112px);
          line-height: 0.95;
          letter-spacing: -0.04em;
          font-weight: 800;
        }
        .email-big {
          position: relative;
          display: inline-block;
          margin-top: 32px;
          font-size: clamp(18px, 2.5vw, 28px);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #1A1512;
          text-decoration: none;
          border-bottom: 2px solid #E4572E;
          padding-bottom: 4px;
          overflow-wrap: anywhere;
        }
        .email-big:hover { background: #E4572E; color: #FFF8EF; border-bottom-color: #E4572E; }
        .email-big::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: -2px;
          height: 2px;
          background: #1A1512;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .email-big:hover::after { transform: scaleX(1); }
        @keyframes drift {
          from { transform: translateY(-4px); }
          to { transform: translateY(4px); }
        }
        .float-idle { display: inline-block; animation: drift 3.5s ease-in-out infinite alternate; will-change: transform; }
        .socials { display: flex; flex-direction: column; gap: 10px; margin-top: 28px; font-size: 15px; }
        .socials a { color: #1A1512; text-decoration: none; border-bottom: 1px solid transparent; width: fit-content; }
        .socials a:hover { border-bottom-color: #1A1512; }
        .thanks { margin: 32px 0 0; font-size: 15px; color: #7A7168; }
        .footer-base {
          margin-top: 64px;
          padding-top: 24px;
          border-top: 1px solid #EADDCB;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          font-size: 13px;
          color: #7A7168;
        }
        .to-top {
          background: transparent;
          border: 0;
          padding: 8px 0;
          color: #1A1512;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
        }
        .to-top:hover { color: #E4572E; }
        @media (max-width: 960px) {
          .work-grid { grid-template-columns: 1fr; }
          .cap-grid { grid-template-columns: 1fr; }
          .strip { grid-template-columns: 1fr; }
          .strip div + div { border-left: 0; border-top: 1px solid #EADDCB; }
          .topnav { gap: 18px; }
        }
        @media (max-width: 640px) {
          .topnav a:nth-child(3) { display: none; }
        }
        @media (max-width: 768px) {
          .section { padding: 72px 20px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .home-root *, .home-root *::before, .home-root *::after {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <header className="topbar">
        <a href="#top" className="brand" onMouseEnter={() => sound.playHover()}>
          shivam<em>*</em>
        </a>
        <nav className="topnav" aria-label="Sections">
          <a href="#work" onMouseEnter={() => sound.playHover()}>Work</a>
          <a href="#about-preview" onMouseEnter={() => sound.playHover()}>About</a>
          <a href="#life" onMouseEnter={() => sound.playHover()}>Story</a>
          <a href="#contact" onMouseEnter={() => sound.playHover()}>Contact</a>
        </nav>
      </header>

      <section className="section" aria-label="Introduction">
        <div className="wrap">
          <motion.p
            className="eyebrow"
            initial={reduced ? undefined : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          >
            Founder at Swarvibhaa, Thane to Mumbai
          </motion.p>
          <h1 className="hero-name">
            <motion.span
              className="hero-first"
              initial={reduced ? undefined : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <VariableFontHover text="Shivam Shelatkar" />
            </motion.span>
            <motion.span
              className="hero-last"
              initial={reduced ? undefined : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.06, ease: EASE }}
            >
              music and code
            </motion.span>
          </h1>
          <motion.p
            className="hero-intro"
            initial={reduced ? undefined : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.26, ease: EASE }}
          >
            Thane-born, Mumbai-grown. Ten years of tabla with Pandit Mukundraj Deo,
            six years of piano through Trinity, founder of Swarvibhaa in 2023,
            building small worlds in Unity since 2017.
          </motion.p>
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32, ease: EASE }}
          >
            <div className="pills" aria-label="Focus areas">
              {PILLS.map((p) => (
                <span key={p} className="pill">{p}</span>
              ))}
            </div>
            <div className="hero-ctas">
              <Magnetic disabled={reduced}>
                <motion.a
                  href="https://swarvibhaa.odoo.com/blog/swarvibhaa-originals-4/raatrani-10"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  onMouseEnter={() => sound.playHover()}
                  onClick={() => sound.playClick()}
                  whileHover={reduced ? undefined : { scale: 1.02, transition: { duration: 0.2, ease: EASE } }}
                  whileTap={reduced ? undefined : { scale: 0.97, transition: { duration: 0.15, ease: EASE } }}
                >
                  <span>Listen to Raatrani</span>
                </motion.a>
              </Magnetic>
              <a
                href="#work"
                className="btn btn-outline"
                onMouseEnter={() => sound.playHover()}
                onClick={() => sound.playClick()}
              >
                <span>See work</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="work" className="section" aria-label="Selected work">
        <div className="wrap">
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25, margin: "-10%" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span className="eyebrow">Selected work</span>
            <h2 className="h2">Three pieces I keep returning to.</h2>
            <p className="lede">Film, bhajan, and one quiet instrumental. Each one taught me something about restraint.</p>
          </motion.div>
          <div className="work-grid">
            {WORK.map((w, i) => (
              <motion.div
                key={w.title}
                className="work-reveal"
                initial={reduced ? undefined : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2, margin: "-10%" }}
                transition={{ duration: 0.65, delay: i * 0.1, ease: EASE }}
              >
                <a
                  href={w.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="work-card"
                  onMouseEnter={() => sound.playHover()}
                  onClick={() => sound.playClick()}
                  aria-label={`${w.title}, ${w.medium}`}
                >
                {/* Real photo goes here: replace the div below with <img src="/photos/<name>.jpg" alt="..." style={{ width: "100%", aspectRatio: "4 / 3", objectFit: "cover", display: "block" }} /> from @shastriyakid */}
                <div className="work-media" aria-hidden="true">
                  <span>{w.note}</span>
                </div>
                  <div className="work-body">
                    <h3 className="work-title">{w.title}</h3>
                    <p className="work-medium">{w.medium}</p>
                    <p className="work-desc">{w.desc}</p>
                    <span className="work-link"><span>{w.cta}</span><span className="work-arrow" aria-hidden="true">→</span></span>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="about-preview" className="section" aria-label="About">
        <div className="wrap">
          <motion.p
            className="thesis"
            initial={reduced ? undefined : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3, margin: "-10%" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            Heritage stays alive<br />when it is <em>played</em> and built with care.
          </motion.p>
        </div>
      </section>

      <section id="philosophy" className="section" aria-label="Capabilities">
        <div className="wrap">
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25, margin: "-10%" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span className="eyebrow">Capabilities</span>
            <h2 className="h2">What I do well.</h2>
            <p className="lede">Practice room habits that run my engineering too.</p>
          </motion.div>
          <div className="cap-grid">
            {CAPS.map((c, i) => (
              <motion.div
                key={c.title}
                className="cap"
                initial={reduced ? undefined : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25, margin: "-10%" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
              >
                <span className="cap-num" aria-hidden="true">0{i + 1}</span>
                <h3>{c.title}</h3>
                <p className="cap-meta">{c.meta}</p>
                <p>{c.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="life" className="section" aria-label="Story">
        <div className="wrap">
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25, margin: "-10%" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span className="eyebrow">Story</span>
            <h2 className="h2">Thane to Mumbai.</h2>
            <p className="lede">Born in Thane, grown in Mumbai, working across three states.</p>
          </motion.div>
          <div className="strip">
            {TIMELINE.map((t, i) => (
              <motion.div
                key={t.title}
                className="timeline-cell"
                initial={reduced ? undefined : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25, margin: "-10%" }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
              >
                <motion.span
                  className="timeline-rule"
                  aria-hidden="true"
                  initial={reduced ? undefined : { opacity: 0, scaleY: 0 }}
                  whileInView={{ opacity: 1, scaleY: 1 }}
                  viewport={{ once: true, amount: 0.25, margin: "-10%" }}
                  transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
                  style={{ transformOrigin: "top" }}
                />
                <strong>{t.title}</strong>
                <span>{t.body}</span>
              </motion.div>
            ))}
          </div>
          <motion.p
            className="life-note"
            initial={reduced ? undefined : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25, margin: "-10%" }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            Outside music I convene student activities for ABVP in Thane, speak English,
            Hindi, Malayalam, Gujarati, and Marathi, and share work as
            @shastriyakid. Screen credits on IMDb nm17605062.
          </motion.p>
        </div>
      </section>

      <section id="spatial" className="section" aria-label="Interactive work">
        <div className="wrap">
          <motion.div
            className="quiet-row"
            initial={reduced ? undefined : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25, margin: "-10%" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div>
              <span className="eyebrow">Spatial</span>
              <h2 className="h2">Interactive work since 2017.</h2>
              <p className="lede">Unity builds with rhythm systems inside. Code lives on GitHub.</p>
            </div>
            <a
              href="https://github.com/sashtriyasam"
              target="_blank"
              rel="noopener noreferrer"
              className="quiet-link"
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
            >
              <span>Browse on GitHub</span>
            </a>
          </motion.div>
        </div>
      </section>

      <section id="terminal" className="section" aria-label="More">
        <div className="wrap">
          <motion.div
            className="quiet-row"
            initial={reduced ? undefined : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25, margin: "-10%" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div>
              <span className="eyebrow">Terminal</span>
              <h2 className="h2">Prefer the full story.</h2>
              <p className="lede">Longer notes on training, Swarvibhaa, and how I work.</p>
            </div>
            <a
              href="/about"
              className="quiet-link"
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
            >
              <span>Read about me</span>
            </a>
          </motion.div>
        </div>
      </section>

      <footer id="contact" className="section" aria-label="Contact">
        <div className="wrap">
          <motion.span
            className="eyebrow"
            initial={reduced ? undefined : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3, margin: "-10%" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            Contact
          </motion.span>
          <h2 className="contact-words">
            {CONTACT_LINES.map((line, i) => (
              <motion.span
                key={line}
                initial={reduced ? undefined : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3, margin: "-10%" }}
                transition={{ duration: 0.7, delay: i * 0.09, ease: EASE }}
              >
                {line}
              </motion.span>
            ))}
          </h2>
          <motion.a
            href="mailto:shelatkarshivam4@gmail.com"
            className="email-big"
            onMouseEnter={() => sound.playHover()}
            onClick={() => sound.playClick()}
            initial={reduced ? undefined : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3, margin: "-10%" }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          >
            shelatkarshivam4@gmail.com
          </motion.a>
          <div className="socials">
            {SOCIALS.map((s, i) => (
              <motion.a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => sound.playHover()}
                initial={reduced ? undefined : { opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.25, margin: "-10%" }}
                transition={{ duration: 0.4, delay: 0.35 + i * 0.06, ease: EASE }}
                style={{ transformOrigin: "left center" }}
              >
                {i < 2 && !reduced ? <span className="float-idle">{s.label}</span> : s.label}
              </motion.a>
            ))}
          </div>
          <motion.p
            className="thanks"
            initial={reduced ? undefined : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25, margin: "-10%" }}
            transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
          >
            Thanks for stopping by, I read every note and reply within a few days.
          </motion.p>
          <div className="footer-base">
            <div>{new Date().getFullYear()} Shivam Shelatkar, Thane to Mumbai</div>
            <button type="button" className="to-top" onClick={toTop} onMouseEnter={() => sound.playHover()}>
              Back to top
            </button>
          </div>
          <AnimatedFooter
            leftLinks={HOME_FOOTER_LEFT}
            rightLinks={HOME_FOOTER_RIGHT}
            copyrightText={`© ${new Date().getFullYear()} Shivam Shelatkar · Thane·Mumbai — Founder @Swarvibhaa`}
            barCount={23}
          />
        </div>
      </footer>
    </div>
  );
}



