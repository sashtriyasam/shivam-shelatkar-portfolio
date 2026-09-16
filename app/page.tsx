'use client';

import { motion, useReducedMotion } from "motion/react";
import { sound } from "@/lib/audio";

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

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();
  const still = shouldReduceMotion ? undefined : { opacity: 0, y: 12 };

  const toTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: shouldReduceMotion ? "auto" : "smooth" });
  };

  return (
    <div className="home-root" id="top">
      <style>{`
        .home-root {
          background-color: #FFF8EF;
          color: #1A1512;
          font-family: var(--font-body);
          min-height: 100vh;
          overflow-x: hidden;
        }
        .home-root a:focus-visible,
        .home-root button:focus-visible {
          outline: 2px solid #E4572E;
          outline-offset: 3px;
          border-radius: 4px;
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
        .topnav a:hover { text-decoration: underline; text-underline-offset: 4px; }
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
        .btn-primary { background: #E4572E; border-color: #E4572E; color: #FFF8EF; }
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
          transition: transform 300ms ease;
        }
        .work-card:hover { transform: scale(1.03); border-color: #1A1512; }
        .work-media {
          background: #141820;
          aspect-ratio: 4 / 3;
          display: grid;
          place-items: center;
          padding: 24px;
          text-align: center;
        }
        .work-media span {
          font-family: var(--font-mono);
          font-size: 12px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.55);
        }
        .work-body { padding: 20px 22px 24px; display: flex; flex-direction: column; gap: 0; }
        .work-title { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.02em; }
        .work-medium { margin: 6px 0 0; font-family: var(--font-mono); font-size: 12px; color: #7A7168; }
        .work-desc { margin: 12px 0 0; font-size: 15px; line-height: 1.65; }
        .work-link { margin-top: 14px; font-size: 14px; font-weight: 700; display: inline-flex; gap: 6px; align-items: center; }
        .work-link i { font-style: normal; color: #E4572E; }
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
            initial={still}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            Founder at Swarvibhaa, Karwar to Mumbai
          </motion.p>
          <motion.h1
            className="hero-name"
            initial={still}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: 0.04, ease: EASE }}
          >
            <span className="hero-first">Shivam</span>
            <span className="hero-last">Shelatkar, music and code</span>
          </motion.h1>
          <motion.p
            className="hero-intro"
            initial={still}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: 0.08, ease: EASE }}
          >
            Karwar-born, Mumbai-grown. Ten years of tabla with Pandit Mukundraj Deo,
            six years of piano through Trinity, founder of Swarvibhaa in 2023,
            building small worlds in Unity since 2017.
          </motion.p>
          <motion.div
            initial={still}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: 0.12, ease: EASE }}
          >
            <div className="pills" aria-label="Focus areas">
              {PILLS.map((p) => (
                <span key={p} className="pill">{p}</span>
              ))}
            </div>
            <div className="hero-ctas">
              <a
                href="https://swarvibhaa.odoo.com/blog/swarvibhaa-originals-4/raatrani-10"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                onMouseEnter={() => sound.playHover()}
                onClick={() => sound.playClick()}
              >
                <span>Listen to Raatrani</span>
              </a>
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
            initial={still}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            <span className="eyebrow">Selected work</span>
            <h2 className="h2">Three pieces I keep returning to.</h2>
            <p className="lede">Film, bhajan, and one quiet instrumental. Each one taught me something about restraint.</p>
          </motion.div>
          <div className="work-grid">
            {WORK.map((w) => (
              <motion.a
                key={w.title}
                href={w.href}
                target="_blank"
                rel="noopener noreferrer"
                className="work-card"
                onMouseEnter={() => sound.playHover()}
                onClick={() => sound.playClick()}
                initial={still}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.28, ease: EASE }}
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
                  <span className="work-link"><span>{w.cta}</span></span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section id="about-preview" className="section" aria-label="About">
        <div className="wrap">
          <motion.p
            className="thesis"
            initial={still}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            Heritage stays alive<br />when it is <em>played</em> and built with care.
          </motion.p>
        </div>
      </section>

      <section id="philosophy" className="section" aria-label="Capabilities">
        <div className="wrap">
          <motion.div
            initial={still}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            <span className="eyebrow">Capabilities</span>
            <h2 className="h2">What I do well.</h2>
            <p className="lede">Practice room habits that run my engineering too.</p>
          </motion.div>
          <div className="cap-grid">
            {CAPS.map((c) => (
              <motion.div
                key={c.title}
                className="cap"
                initial={still}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.28, ease: EASE }}
              >
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
            initial={still}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            <span className="eyebrow">Story</span>
            <h2 className="h2">Karwar to Mumbai.</h2>
            <p className="lede">Born on the coast, grown in the city, now working across three states.</p>
          </motion.div>
          <motion.div
            className="strip"
            initial={still}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            <div>
              <strong>Karwar, born</strong>
              <span>Coastal roots, first rhythms, long train rides north.</span>
            </div>
            <div>
              <strong>Mumbai, grown</strong>
              <span>Tabla, piano, and engineering. Cats at home, blue everywhere.</span>
            </div>
            <div>
              <strong>Swarvibhaa, 2023</strong>
              <span>Founder. Mumbai, Delhi, Gujarat. Hindustani meets Western classical.</span>
            </div>
          </motion.div>
          <motion.p
            className="life-note"
            initial={still}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.28, ease: EASE }}
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
            initial={still}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.28, ease: EASE }}
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
            initial={still}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.28, ease: EASE }}
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
          <motion.div
            initial={still}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            <span className="eyebrow">Contact</span>
            <h2 className="contact-words">
              <span>Make</span>
              <span>something</span>
              <span>worth keeping.</span>
            </h2>
            <a
              href="mailto:shelatkarshivam4@gmail.com"
              className="email-big"
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
            >
              shelatkarshivam4@gmail.com
            </a>
            <div className="socials">
              <a href="https://www.instagram.com/shastriyakid" target="_blank" rel="noopener noreferrer" onMouseEnter={() => sound.playHover()}>Instagram, @shastriyakid</a>
              <a href="https://linkedin.com/in/shivam-shelatkar-503305358" target="_blank" rel="noopener noreferrer" onMouseEnter={() => sound.playHover()}>LinkedIn, Shivam Shelatkar</a>
              <a href="https://github.com/sashtriyasam" target="_blank" rel="noopener noreferrer" onMouseEnter={() => sound.playHover()}>GitHub, sashtriyasam</a>
              <a href="https://www.imdb.com/name/nm17605062/" target="_blank" rel="noopener noreferrer" onMouseEnter={() => sound.playHover()}>IMDb, nm17605062</a>
            </div>
            <p className="thanks">Thanks for stopping by, I read every note and reply within a few days.</p>
          </motion.div>
          <div className="footer-base">
            <div>{new Date().getFullYear()} Shivam Shelatkar, Karwar to Mumbai</div>
            <button type="button" className="to-top" onClick={toTop} onMouseEnter={() => sound.playHover()}>
              Back to top
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
