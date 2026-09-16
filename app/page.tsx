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
              BUILDS <span style={{ color: "var(--color-accent)" }}>THINGS.</span>
            </motion.span>
          </h1>

          <motion.p className="hero__lead" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.78, ease }}>
            I design and build the space between a product&apos;s idea and the person using it — turning complexity into calm, confident interfaces.
            <span style={{ display: "block", marginTop: 8, fontFamily: "var(--font-mono)", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-accent)" }}>
              45,000+ designers trust wall decoded • Awwwards craft: art direction + motion + 60fps
            </span>
          </motion.p>

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

      {/* TRUSTED MARQUEE - wallofportfolios hero carousel decode */}
      <section className="content-max" style={{ padding: "2rem var(--gutter)" }}>
        <div className="marquee">
          <div className="marquee__track">
            {[...Array(2)].map((_, i) => (
              <div key={i} style={{ display: "flex", gap: "3rem" }}>
                {["Netflix", "Google", "Apple", "Uber", "Swiggy", "CRED", "Zomato", "Flipkart", "Microsoft"].map((c) => (
                  <span key={c} className="marquee__item">
                    ● {c}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <p className="eyebrow" style={{ textAlign: "center", marginTop: "1rem" }}>
          Trusted by 45,000+ designers from — decoded from Wall of Portfolios
        </p>
      </section>

      {/* CATEGORIES - Explore top categories 810/390/300/180/90 */}
      <section className="content-max" style={{ padding: "4rem var(--gutter) 2rem" }}>
        <div className="split" style={{ marginBottom: "1.5rem" }}>
          <h2 className="display" style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)" }}>
            Explore top categories
          </h2>
          <Link href="/work" className="tag">
            View all 1650+ →
          </Link>
        </div>
        <div className="categories">
          {categories.map((c, i) => (
            <div
              key={c.title}
              className={`categories__card ${i === 0 ? "categories__card--lg" : i === 1 ? "categories__card--md" : "categories__card--sm"}`}
              style={{ ["--card-accent" as any]: c.accent }}
            >
              <div className="categories__thumb" aria-hidden />
              <div className="categories__label">
                <div className="categories__count">{c.count}</div>
                <h3 className="categories__title">{c.title}</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--color-ui)", margin: "0.4rem 0 0" }}>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PORTFOLIOS OF THE MONTH - #1-5 stories */}
      <section className="content-max" style={{ padding: "3rem var(--gutter)" }}>
        <div className="split">
          <h2 className="display" style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)" }}>
            Portfolios of the month!
          </h2>
          <span className="eyebrow">AUG 2026 decoded</span>
        </div>
        <div className="stories" style={{ marginTop: "1.5rem" }}>
          {stories.map((s) => (
            <div key={s.rank} className="story">
              <div className="story__avatar">
                <img
                  src={`https://picsum.photos/seed/${s.rank}wall/200/200`}
                  alt={s.name}
                  loading="lazy"
                />
                <span className="story__rank">#{s.rank}</span>
              </div>
              <div className="story__name">{s.name}</div>
              <div className="story__role">{s.role}</div>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--color-ui)", marginTop: "1rem" }}>
          Aditya blends product thinking with craft • Ryan retro bold • Harrison editorial • Akriti playful • Sandeep motion — each stolen crazy, remixed for Shivam.
        </p>
      </section>

      {/* STUDIO - What Designers Are Working On */}
      <section className="content-max" style={{ padding: "3rem var(--gutter)" }}>
        <div className="split">
          <h2 className="display" style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)" }}>What designers are working on</h2>
          <Link href="/work" className="link-underline" style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem" }}>
            Explore studio →
          </Link>
        </div>
        <div className="studio-grid" style={{ marginTop: "1.5rem" }}>
          {studio.map((s) => (
            <div key={s.title} className="studio-card" style={{ borderColor: s.color }}>
              <video autoPlay muted loop playsInline preload="metadata" className="studio-card__media" poster={`https://picsum.photos/seed/${s.title}/640/400`}>
                <source src="https://cdn.wallofportfolios.in/works/93ca9d8e-41c3-4a8e-a392-6cae11e46f11/video_cbf38269.mp4" type="video/mp4" />
              </video>
              <div className="studio-card__avatars">
                <img src="https://picsum.photos/seed/avatar1/100" alt="" />
                <img src="https://cdn.wallofportfolios.in/tags/icons/figma_20260809200538.avif" alt="" style={{ background: "#fff", padding: 4, borderRadius: "50%" }} />
                <img src="https://cdn.wallofportfolios.in/tags/icons/framer_20260906170907.avif" alt="" style={{ background: "#fff", padding: 4, borderRadius: "50%" }} />
              </div>
              <div className="studio-card__overlay">
                <p style={{ margin: 0, fontSize: "0.9rem", fontWeight: 600 }}>{s.title}</p>
                <p style={{ margin: "0.2rem 0 0", fontFamily: "var(--font-mono)", fontSize: "0.65rem", opacity: 0.8 }}>{s.tag}</p>
              </div>
            </div>
          ))}
          <div className="studio-card" style={{ display: "grid", placeItems: "center", background: "var(--color-paper)", color: "var(--color-ink)" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem" }}>＋</div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", margin: "0.5rem 0 0" }}>
                Share your work, AI experiments & more
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CURATED FOR YOU - Filter + Bento - Obys Agency editorial + Lusion shader */}
      <section id="work" className="content-max" style={{ padding: "4rem var(--gutter)" }}>
        <div className="split">
          <h2 className="display" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)" }}>curated for you — wall decoded</h2>
          <span className="eyebrow">{projects.length} projects</span>
        </div>

        <div className="filter-bar" style={{ margin: "1.5rem 0" }}>
          {filters.map((f) => (
            <button key={f} className={`filter-pill ${active === f ? "active" : ""}`} onClick={() => setActive(f)} type="button">
              {f === "All" && <span>◉</span>} {f}
            </button>
          ))}
          <span className="eyebrow" style={{ marginLeft: "auto", alignSelf: "center" }}>
            company: All
          </span>
        </div>

        <div className="bento">
          {filtered.map((p, i) => {
            const span = i === 0 ? "bento__item--lg" : i === 3 ? "bento__item--wide" : i % 3 === 0 ? "bento__item--md" : "bento__item--sm";
            return (
              <Link key={p.slug} href={`/work/${p.slug}`} className={`bento__item ${span} grain`}>
                <div className="bento__visual" aria-hidden>
                  <svg viewBox="0 0 400 300" width="100%" height="100%" preserveAspectRatio="none" style={{ display: "block" }}>
                    <rect width="400" height="300" fill={p.visualAccent || "#c7f35a"} opacity="0.08" />
                    <g opacity="0.5" stroke={p.visualAccent || "#c7f35a"} fill="none">
                      {p.visual === "terrain" && <path d="M0 200 Q100 80 200 150 T400 120" strokeWidth="2" />}
                      {p.visual === "wave" && <path d="M0 150 Q50 100 100 150 T200 150 T300 150 T400 150" strokeWidth="2" />}
                      {p.visual === "dots" && Array.from({ length: 30 }).map((_, j) => <circle key={j} cx={(j % 6) * 70 + 20} cy={Math.floor(j / 6) * 50 + 30} r="2" fill={p.visualAccent || "#c7f35a"} stroke="none" />)}
                      {(p.visual === "grid" || p.visual === "bars") && <rect x="40" y="60" width="320" height="180" rx="12" strokeWidth="1.5" />}
                      {p.visual === "orbit" && <circle cx="200" cy="150" r="70" strokeWidth="1.5" />}
                    </g>
                  </svg>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: `radial-gradient(400px circle at ${mx}% ${my}%, ${p.visualAccent || "#c7f35a"}22, transparent 60%)`,
                    }}
                  />
                </div>
                <div className="bento__content">
                  <div className="bento__eyebrow">
                    {p.year} • {p.status} — {p.visual}
                  </div>
                  <h3 className="bento__title">{p.title}</h3>
                  <p style={{ margin: "0.4rem 0 0", color: "var(--color-paper-2)", fontSize: "0.9rem", lineHeight: 1.4 }}>{p.summary}</p>
                  <div className="bento__tags">
                    {p.tags.slice(0, 3).map((t) => (
                      <span key={t} className="bento__tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Link href="/work" className="btn arcade-btn">
            Enter wall → see all work
          </Link>
          <span className="tag">Bento Modern • 90+ layouts decoded</span>
          <span className="tag" style={{ borderColor: "var(--color-cyan)", color: "var(--color-cyan)" }}>
            Tilt + Spotlight + Grain = Award craft
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
