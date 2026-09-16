"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HeroFallback } from "@/components/hero/HeroFallback";
import { projects } from "@/lib/projects";

const HeroTerrain = dynamic(() => import("@/components/hero/HeroTerrain").then((m) => m.HeroTerrain), { ssr: false });
const ease = [0.16, 1, 0.3, 1] as const;

// Decoded from Wall of Portfolios + Awwwards:
// Minimal 810 / Dark 390 / Interactive 300 / Creative 180 / Bento 90
const categories = [
  { title: "Minimal Systems", count: "810+ Craft", accent: "#c7f35a", desc: "Brutalist grids broken by neon" },
  { title: "Dark Matter", count: "390+ Portfolios", accent: "#66e3ff", desc: "Near-black void + acid bloom" },
  { title: "Interactive Arcade", count: "300+ Motion", accent: "#ff3b82", desc: "Playable, magnetic, ghost screens" },
  { title: "Creative Editorial", count: "180+ Stories", accent: "#7c5cfb", desc: "Custom doodles + handwritten" },
  { title: "Bento Modern", count: "90+ Layouts", accent: "#ffb84d", desc: "Asymmetric bento + spotlight" },
];

const stories = [
  { name: "Aditya Sadhukhan", role: "UX 2 • #1 Aug 26", rank: 1 },
  { name: "Ryan Walter", role: "Graphic • Retro", rank: 2 },
  { name: "Harrison Wheeler", role: "Product Lead", rank: 3 },
  { name: "Akriti Purbey", role: "Visual Lead", rank: 4 },
  { name: "Sandeep Baral", role: "UX Motion", rank: 5 },
];

const studio = [
  { title: "Ghost Screen — Apple Duo", tag: "Framer + GPT", color: "#c7f35a" },
  { title: "Spiral3D — Interaction in 3D", tag: "Three.js", color: "#7c5cfb" },
  { title: "Arcade Portfolio 🎮", tag: "Figma + GPT", color: "#ff3b82" },
  { title: "Paytm Pocket Exploration", tag: "Figma", color: "#66e3ff" },
  { title: "Career Survival Game", tag: "Arcade", color: "#ffb84d" },
  { title: "Keeping Onboarding Simple", tag: "Motion", color: "#c7f35a" },
];

const filters = ["All", "Strategy", "Interactive", "Motion", "3D"];

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState("All");
  const [mx, setMx] = useState(50);
  const [my, setMy] = useState(50);
  const [time, setTime] = useState("--:--");

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.94]);

  useEffect(() => {
    const updTime = () =>
      setTime(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false }));
    updTime();
    const tid = setInterval(updTime, 60000);
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMx(x);
      setMy(y);
      document.documentElement.style.setProperty("--mx", `${x}%`);
      document.documentElement.style.setProperty("--my", `${y}%`);
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      clearInterval(tid);
    };
  }, []);

  const filtered = active === "All" ? projects : projects.filter((p) => p.tags.join(" ").toLowerCase().includes(active.toLowerCase()) || p.visual === active.toLowerCase());

  return (
    <>
      {/* SPOTLIGHT ARCADE BEAM - Lusion + Iventions */}
      <div className="spotlight active" style={{ ["--mx" as any]: `${mx}%`, ["--my" as any]: `${my}%` } as any} aria-hidden suppressHydrationWarning />

      {/* HERO - By-Kin continuous surface + Mat Voyce kinetic type + Pacome rhythm */}
      <section className="hero crt" id="hero" ref={heroRef} style={{ minHeight: "100vh" } as any}>
        <HeroTerrain />
        <HeroFallback />
        <motion.div className="hero__decor" aria-hidden style={{ opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0]) } as any}>
          <span className="hero__decor-line" />
          <span className="hero__decor-label">hero / index 01 — wall decoded</span>
        </motion.div>

        <motion.div className="content-max hero__content" style={{ y, opacity, scale } as any}>
          <div className="hero__meta">
            <motion.p className="hero__eyebrow" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease }}>
              Creative technologist <span style={{ color: "var(--color-accent)", marginLeft: 8 }}>● live</span>
            </motion.p>
            <motion.p className="hero__meta-line" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.18, ease }}>
              SHIPS LIKE LUSION • BUILDS LIKE ACTIVE THEORY • MOVES LIKE MAT VOYCE
            </motion.p>
          </div>

          <h1 className="hero__title display">
            <motion.span className="hero__line kinetic" initial={{ opacity: 0, y: 70 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.28, ease }}>
              SHIVAM
            </motion.span>
            <motion.span
              className="hero__line hero__line--outline kinetic kinetic--stretch"
              initial={{ opacity: 0, y: 70 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease }}
              style={{ fontVariationSettings: `"wdth" 110` }}
            >
              SHELATKAR
            </motion.span>
            <motion.span className="hero__line" initial={{ opacity: 0, y: 70 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.52, ease }}>
              BUILDS <span className="scribble-underline" style={{ color: "var(--color-accent)" }}>THINGS.</span>
            </motion.span>
          </h1>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.78, ease }}>
            <p className="hero__lead" style={{ position: "relative" }}>
              I design and build the space between a product&apos;s idea and the person using it — turning complexity into calm, confident interfaces.
              <span className="hand marginalia" style={{ position: "absolute", right: "-42px", top: "-8px", fontSize: "1rem", opacity: 0.9 }}>
                ↳ rewrote this 7×
              </span>
            </p>
            <p className="hand" style={{ marginTop: "0.8rem", fontSize: "1.15rem", color: "#1e3a5f", transform: "rotate(-0.6deg)" }}>
              ISRO maps → revenue forecasts → parking lots. Same obsession: make the hard thing feel easy.
            </p>
          </motion.div>

          <motion.div className="hero__actions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.98, ease }}>
            <Link href="/work" className="btn arcade-btn">
              View selected work →
            </Link>
            <Link href="/contact" className="btn">
              Start a project
            </Link>
            <span className="tag" style={{ borderColor: "var(--color-violet)", color: "var(--color-violet)" }}>
              Press G for Ghost Arcade
            </span>
          </motion.div>
        </motion.div>

        <motion.a href="#work" className="hero__scroll" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.6 }} style={{ y } as any}>
          <span className="hero__scroll-label">scroll down — spotlight follows</span>
          <span className="hero__scroll-rule" />
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.a>
      </section>

      {/* HUMAN PROOF - not fake FAANG marquee */}
      <section className="content-max" style={{ padding: "1.5rem var(--gutter)" }}>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-ui)" }}>
          <span className="tag" style={{ background: "#fff" }}>
            Built at 2am • coffee #4
          </span>
          <span>—</span>
          <span>DepthWizard live with ISRO teams</span>
          <span>•</span>
          <span>Projection AI → 22% forecast lift</span>
          <span>•</span>
          <span>ParkEasy pilot 30% less circling</span>
          <span className="hand" style={{ color: "#c45a3c", fontSize: "1rem", textTransform: "none", letterSpacing: 0 }}>
            ← real numbers, not lorem
          </span>
        </div>
      </section>

      {/* CRAFT - human, not 810+ fake counts */}
      <section className="content-max" style={{ padding: "3rem var(--gutter) 1rem" }}>
        <div style={{ display: "flex", gap: "1rem", alignItems: "baseline", flexWrap: "wrap" }}>
          <h2 className="display" style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)" }}>
            How I actually work
          </h2>
          <span className="hand" style={{ fontSize: "1.2rem", color: "#c45a3c" }}>
            (no 810+ portfolios here — just 3 obsessions)
          </span>
        </div>
        <div className="categories" style={{ marginTop: "1.5rem" }}>
          {categories.slice(0, 3).map((c, i) => (
            <div
              key={c.title}
              className="categories__card torn"
              style={
                {
                  ["--card-accent" as any]: c.accent,
                  transform: `rotate(${i === 1 ? "0.7deg" : i === 2 ? "-0.6deg" : "0.3deg"})`,
                } as any
              }
            >
              <div className="tape tape--top" aria-hidden />
              <div className="categories__thumb" aria-hidden />
              <div className="categories__label">
                <div className="categories__count" style={{ color: c.accent }}>
                  0{i + 1} — {c.count.replace("+", "")}
                </div>
                <h3 className="categories__title" style={{ fontFamily: "Fraunces, serif" }}>
                  {c.title}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--color-ui)", margin: "0.4rem 0 0" }}>{c.desc}</p>
                <span className="hand" style={{ fontSize: "0.95rem", display: "block", marginTop: "0.6rem" }}>
                  {i === 0 ? "— loves grids that break" : i === 1 ? "— dark that glows" : "— plays with ghost gaps"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DESK NOTES - human marginalia */}
      <section className="content-max" style={{ padding: "2.5rem var(--gutter)" }}>
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", alignItems: "center" }}>
          <h2 className="display" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>
            Desk notes
          </h2>
          <span className="hand" style={{ fontSize: "1.1rem", color: "#1e3a5f" }}>
            stolen-crazy, re-drawn by hand →
          </span>
          <span className="eyebrow" style={{ marginLeft: "auto" }}>
            aug 2026 • 5 friends
          </span>
        </div>
        <div className="stories" style={{ marginTop: "1.5rem" }}>
          {stories.map((s) => (
            <div key={s.rank} className="story">
              <div className="polaroid" style={{ padding: "8px 8px 18px 8px", transform: `rotate(${s.rank % 2 === 0 ? "1.2deg" : "-1.1deg"})` }}>
                <div className="story__avatar" style={{ margin: 0, width: 96, height: 96 }}>
                  <img src={`https://picsum.photos/seed/${s.rank}wall/200/200`} alt={s.name} loading="lazy" />
                  <span className="story__rank">#{s.rank}</span>
                </div>
              </div>
              <div className="story__name" style={{ marginTop: "0.6rem" }}>
                {s.name}
              </div>
              <div className="story__role">{s.role}</div>
              <span className="hand" style={{ fontSize: "0.85rem", display: "block", color: "#c45a3c" }}>
                {s.rank === 1 ? "craft" : s.rank === 2 ? "retro!" : s.rank === 3 ? "editorial" : s.rank === 4 ? "play" : "motion"}
              </span>
            </div>
          ))}
        </div>
        <p className="hand" style={{ fontSize: "1rem", color: "#7a756e", marginTop: "1rem", transform: "rotate(-0.3deg)" }}>
          Aditya taught me to draw the why • Ryan dared me to use beige • Harrison made me write shorter — all in the margins.
        </p>
      </section>

      {/* STUDIO - desk scattered */}
      <section className="content-max" style={{ padding: "2.5rem var(--gutter)" }}>
        <div style={{ display: "flex", gap: "1rem", alignItems: "baseline", flexWrap: "wrap" }}>
          <h2 className="display" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>On the desk right now</h2>
          <span className="hand" style={{ fontSize: "1.1rem", color: "#c45a3c" }}>
            6 tabs open, 2 actually working
          </span>
          <Link href="/work" className="link-underline" style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", marginLeft: "auto" }}>
            Explore studio →
          </Link>
        </div>
        <div className="studio-grid" style={{ marginTop: "1.5rem" }}>
          {studio.map((s, i) => (
            <div key={s.title} className="studio-card torn" style={{ transform: `rotate(${i % 2 === 0 ? "-0.6deg" : "0.5deg"})`, borderColor: s.color }}>
              <div className="tape tape--corner" aria-hidden />
              <video autoPlay muted loop playsInline preload="metadata" className="studio-card__media" poster={`https://picsum.photos/seed/${s.title}/640/400`}>
                <source src="https://cdn.wallofportfolios.in/works/93ca9d8e-41c3-4a8e-a392-6cae11e46f11/video_cbf38269.mp4" type="video/mp4" />
              </video>
              <div className="studio-card__overlay">
                <p style={{ margin: 0, fontSize: "0.9rem", fontWeight: 600 }}>{s.title}</p>
                <p style={{ margin: "0.2rem 0 0", fontFamily: "var(--font-mono)", fontSize: "0.65rem", opacity: 0.8 }}>{s.tag} — {i === 0 ? "scratched 3x" : i === 2 ? "arcade fever" : "ship it"}</p>
              </div>
            </div>
          ))}
          <div className="studio-card torn" style={{ display: "grid", placeItems: "center", background: "#fff", color: "var(--color-ink)", transform: "rotate(0.8deg)" }}>
            <div style={{ textAlign: "center", padding: "1rem" }}>
              <div className="hand" style={{ fontSize: "1.4rem", color: "#c45a3c" }}>
                + your brief?
              </div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.08em", margin: "0.5rem 0 0" }}>Share your work — I’ll pin it here</p>
            </div>
          </div>
        </div>
      </section>

      {/* CURATED - desk bento, hand-pinned */}
      <section id="work" className="content-max" style={{ padding: "3rem var(--gutter)" }}>
        <div style={{ display: "flex", gap: "1rem", alignItems: "baseline", flexWrap: "wrap" }}>
          <h2 className="display" style={{ fontSize: "clamp(1.6rem,3.2vw,2.4rem)" }}>
            Pinned on the wall
          </h2>
          <span className="hand" style={{ fontSize: "1.2rem", color: "#c45a3c" }}>
            — not curated, just kept
          </span>
          <span className="eyebrow" style={{ marginLeft: "auto" }}>
            {projects.length} kept • 1 torn
          </span>
        </div>

        <div className="filter-bar" style={{ margin: "1.2rem 0" }}>
          {filters.map((f) => (
            <button key={f} className={`filter-pill ${active === f ? "active" : ""}`} onClick={() => setActive(f)} type="button" style={{ background: active === f ? "#1a1a18" : "#fff", color: active === f ? "#fff" : "#1a1a18", borderColor: "rgba(26,26,24,0.12)" }}>
              {f === "All" && <span>◉</span>} {f}
            </button>
          ))}
          <span className="hand" style={{ marginLeft: "auto", alignSelf: "center", fontSize: "0.95rem" }}>
            tap → filter, I’ll leave the tape
          </span>
        </div>

        <div className="bento">
          {filtered.map((p, i) => {
            const span = i === 0 ? "bento__item--lg" : i === 3 ? "bento__item--wide" : i % 3 === 0 ? "bento__item--md" : "bento__item--sm";
            return (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                className={`bento__item ${span} grain`}
                style={{ transform: `rotate(${i % 2 === 0 ? "-0.4deg" : "0.3deg"})` } as any}
              >
                <div className="tape tape--top" aria-hidden style={{ opacity: 0.6 }} />
                <div className="bento__visual" aria-hidden>
                  <svg viewBox="0 0 400 300" width="100%" height="100%" preserveAspectRatio="none" style={{ display: "block" }}>
                    <rect width="400" height="300" fill={p.visualAccent || "#c45a3c"} opacity="0.06" />
                    <g opacity="0.45" stroke={p.visualAccent || "#c45a3c"} fill="none">
                      {p.visual === "terrain" && <path d="M0 200 Q100 80 200 150 T400 120" strokeWidth="1.6" />}
                      {p.visual === "wave" && <path d="M0 150 Q50 100 100 150 T200 150 T300 150 T400 150" strokeWidth="1.6" />}
                      {p.visual === "dots" && Array.from({ length: 30 }).map((_, j) => <circle key={j} cx={(j % 6) * 70 + 20} cy={Math.floor(j / 6) * 50 + 30} r="1.6" fill={p.visualAccent || "#c45a3c"} stroke="none" />)}
                      {(p.visual === "grid" || p.visual === "bars") && <rect x="40" y="60" width="320" height="180" rx="12" strokeWidth="1.3" />}
                      {p.visual === "orbit" && <circle cx="200" cy="150" r="70" strokeWidth="1.3" />}
                    </g>
                  </svg>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: `radial-gradient(380px circle at ${mx}% ${my}%, ${p.visualAccent || "#c45a3c"}14, transparent 62%)`,
                    }}
                  />
                </div>
                <div className="bento__content" style={{ background: "linear-gradient(transparent, rgba(26,26,24,0.78) 65%)" }}>
                  <div className="bento__eyebrow" style={{ color: "#e8b44a" }}>
                    {p.year} • {p.status} — {p.visual}
                  </div>
                  <h3 className="bento__title" style={{ color: "#fff", fontFamily: "Fraunces, serif" }}>
                    {p.title}
                  </h3>
                  <p style={{ margin: "0.4rem 0 0", color: "rgba(253,248,239,0.85)", fontSize: "0.88rem", lineHeight: 1.45 }}>{p.summary}</p>
                  <div className="bento__tags">
                    {p.tags.slice(0, 3).map((t) => (
                      <span key={t} className="bento__tag" style={{ borderColor: "rgba(253,248,239,0.25)", color: "rgba(253,248,239,0.9)" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div style={{ marginTop: "1.8rem", display: "flex", gap: "0.8rem", flexWrap: "wrap", alignItems: "center" }}>
          <Link href="/work" className="btn" style={{ background: "#1a1a18", color: "#fdf8ef", borderColor: "#1a1a18" }}>
            Enter wall → see all work
          </Link>
          <span className="hand" style={{ fontSize: "1rem", color: "#7a756e" }}>
            bento was perfect — I tore one corner on purpose
          </span>
        </div>
      </section>

      {/* ===== PURVA BHANDARI DECODED - Warm Cream / Red Punch / 3D Tunnel ===== */}
      <section className="purva-section">
        <div className="content-max">
          <div className="split" style={{ alignItems: "flex-start" }}>
            <div>
              <div className="purva-kicker">purva bhandari decoded • bangalore — india</div>
              <h2 className="purva-title" style={{ marginTop: "0.8rem" }}>
                Curiosity over <em>pixels.</em>
                <br />
                Why beats <span className="script-accent">how.</span>
              </h2>
              <p style={{ maxWidth: "42ch", color: "#424242", lineHeight: 1.6, marginTop: "1rem" }}>
                Purva&apos;s Framer portfolio is Geist + Gideon Roman + Ingrid Darling, cream #f7f2e6, red punch #d60004. No hero image — type is hero. I rewire it for a technologist: split-wordmark + live clock + manifesto + iPod.
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.14em", color: "#9e9e9e" }}>[ BASED IN PUNE, INDIA ]</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", marginTop: 4, color: "#242424" }} suppressHydrationWarning>
                IN {time} IST
              </div>
              <Link href="/work" className="red-cta" style={{ marginTop: "1rem" }}>
                Want to do something fun? →
              </Link>
            </div>
          </div>

          {/* Manifesto - DELULU / WONDER */}
          <div className="manifesto-grid">
            <div className="manifesto-card">
              <div className="manifesto-card__num">001 — from Purva</div>
              <h3 className="manifesto-card__title">DELULU IS THE SOLULU</h3>
              <p className="manifesto-card__text">Purva ships `DELULU IS THE SOLULU`. For Shivam: `SHIP WEIRD • LEARN LOUD` — curiosity is the system.</p>
            </div>
            <div className="manifesto-card" style={{ background: "#242424", color: "#fff", borderColor: "#242424" }}>
              <div className="manifesto-card__num" style={{ color: "#c7f35a" }}>
                002 — keep wonder
              </div>
              <h3 className="manifesto-card__title" style={{ color: "#fff" }}>
                KEEP CHILDLIKE WONDER
              </h3>
              <p className="manifesto-card__text" style={{ color: "#9e9e9e" }}>
                Past and present don&apos;t exist. Live in the present. Debug with play, not fear.
              </p>
            </div>
            <div className="manifesto-card">
              <div className="manifesto-card__num">003 — chase anything</div>
              <h3 className="manifesto-card__title">CHASE ANYTHING →</h3>
              <p className="manifesto-card__text">Purva&apos;s `A mind that is stretched` (Gideon Roman 50px) becomes `Why before what` — uncover the why behind every decision.</p>
              <div className="script-accent" style={{ marginTop: "0.6rem" }}>
                why?
              </div>
            </div>
          </div>

          {/* iPod Terminal + 3D Tunnel side by side */}
          <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: "1.5rem", marginTop: "2.5rem", alignItems: "center" }}>
            <div className="ipod-wrap">
              <div
                className="ipod"
                onMouseMove={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  const rect = el.getBoundingClientRect();
                  const cx = rect.left + rect.width / 2;
                  const cy = rect.top + rect.height / 2;
                  const rx = ((e.clientY - cy) / (rect.height / 2)) * 8;
                  const ry = ((e.clientX - cx) / (rect.width / 2)) * 8;
                  el.style.transform = `rotateX(${-rx}deg) rotateY(${ry}deg)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "rotateX(0) rotateY(0)";
                }}
              >
                <div className="ipod__screen">
                  <div style={{ opacity: 0.7 }}>Purva&apos;s iPod → Shivam&apos;s Terminal</div>
                  <div style={{ marginTop: 8, color: "#fff" }}>
                    $ why --curiosity
                    <br />
                    &gt; uncovering why beats shipping what
                    <br />
                    $ ls projects --filter=wall
                    <br />
                    &gt; 3 shipped • 1.2k commits
                  </div>
                  <div style={{ marginTop: 8, display: "flex", gap: 6 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff3b82", display: "inline-block" }} />
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ffb84d", display: "inline-block" }} />
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#c7f35a", display: "inline-block" }} />
                  </div>
                </div>
                <div className="ipod__wheel">
                  <span style={{ position: "absolute", top: 12, fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#9e9e9e" }}>MENU</span>
                  <span style={{ position: "absolute", bottom: 12, fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#9e9e9e" }}>▶︎❚❚</span>
                </div>
                <div style={{ textAlign: "center", marginTop: 8, fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#9e9e9e" }}>Purva × Shivam — tactile filter</div>
              </div>
            </div>

            <div className="tunnel">
              <div className="tunnel__track">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="tunnel__card" style={{ animationDelay: `${-i * 1.66}s`, left: `${18 + i * 11}%`, top: `${12 + ((i * 13) % 40)}%` } as any}>
                    <img src={`https://picsum.photos/seed/tunnel${i}/400/300`} alt="" loading="lazy" />
                    <div style={{ position: "absolute", inset: "auto 0 0 0", padding: "0.6rem", background: "linear-gradient(transparent, rgba(0,0,0,0.8))", color: "#fff", fontFamily: "var(--font-mono)", fontSize: "0.62rem" }}>
                      00{i + 1} • {["HYPERLAB", "SWIVL.TECH", "DECIDE.ED", "2BY2 MAG", "OLYMPICS", "FITKIT"][i]}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", pointerEvents: "none" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.14em", color: "rgba(242,240,233,0.6)", background: "rgba(11,14,16,0.6)", padding: "0.4rem 0.8rem", borderRadius: 999, border: "1px solid rgba(242,240,233,0.15)" }}>
                  3D VIDEO TUNNEL — move-3d • 10s linear • Purva approach
                </span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
            <span className="tag" style={{ background: "#fff" }}>
              Geist 400/700 + Ingrid Darling script
            </span>
            <span className="tag" style={{ background: "#242424", color: "#fff" }}>
              #f7f2e6 cream • #d60004 red punch
            </span>
            <span className="tag" style={{ background: "#fff" }}>
              Split wordmark Purv+o+id → Shi+vam
            </span>
          </div>
        </div>
      </section>

      {/* FOOT KINETIC TICKER */}
      <div className="marquee" style={{ padding: "2rem 0", borderTop: "1px solid var(--color-line-2)", borderBottom: "1px solid var(--color-line-2)" }}>
        <div className="marquee__track" style={{ animationDuration: "18s" }}>
          {[...Array(2)].map((_, i) => (
            <div key={i} style={{ display: "flex", gap: "3rem", alignItems: "center" }}>
              <span className="display" style={{ fontSize: "1.8rem", whiteSpace: "nowrap" }}>
                SHIVAM SHELATKAR — CREATIVE TECHNOLOGIST — BUILDS LIKE LUSION • DESIGNS LIKE OBYS • SHIPS LIKE ACTIVE THEORY —
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
