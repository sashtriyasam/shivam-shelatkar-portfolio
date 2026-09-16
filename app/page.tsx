"use client";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState, useRef } from "react";
const HeroTerrain = dynamic(() => import("@/components/hero/HeroTerrain").then((m) => m.HeroTerrain), { ssr: false });
const TUNNEL_VIDEOS = [
  "https://framerusercontent.com/assets/Yo7TGuLgeZp5DtokZ4PidmxR7M.mov",
  "https://framerusercontent.com/assets/mjbdAFqO4xeMy6pC7ABLg2cmjA.mov",
  "https://framerusercontent.com/assets/G5jmOXD2kI54xkagQf6AcT6VwEs.mp4",
  "https://framerusercontent.com/assets/n1RNEKWSYIkrWIuzYG6bnQl1jI.mov",
  "https://framerusercontent.com/assets/2wTW9FJ5PuotF07MtfhaKyMsEE.mov",
  "https://framerusercontent.com/assets/QxbzwJi5iLF1DCMOz4064eHvEs.mov",
];
const INTRO_TEXT = "I BELIEVE IN DESIGNING WITH, FOR AND BY PEOPLE. THIS PLACE IS A COLLECTION OF MY WORK, THOUGHTS, EXPLORATIONS, CONVERSATIONS & IDEAS.";
function ScrambleText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#%&*";
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(text);
      return;
    }
    let frame = 0;
    let raf = 0;
    const total = 28;
    const tick = () => {
      frame++;
      if (frame >= total) { setDisplay(text); return; }
      const out = text.split("").map((c,i)=>{
        if(c===" "||c==="."||c===","||c==="&") return c;
        const progress=frame/total;
        const revealAt=(i/text.length)*0.7+0.2;
        if(progress>revealAt) return text[i]??c;
        return chars[Math.floor(Math.random()*chars.length)]??c;
      }).join("");
      setDisplay(out);
      raf = window.setTimeout(tick,42) as unknown as number;
    };
    const t=window.setTimeout(tick,300);
    return()=>{clearTimeout(t);clearTimeout(raf);};
  },[text]);
  return <span>{display}</span>;
}
const FEATURED = [
  { id: "001", kicker: "DEPTHWIZARD : ISRO-DEPTHWIZ", title: "Making Human Performance Measurable", desc: "Ecosystem transforms satellite / terrain into operational picture — DepthWizard fuses ISRO layers, terrain meshes and mission data into a single canvas for field teams.", img: "https://picsum.photos/seed/depthwiz/800/600", tags: ["ECOSYSTEM","GEOSPATIAL","AI"], href: "/work/depthwizard" },
  { id: "002", kicker: "PROJECTION AI : PREDICTIVE REVENUE ENGINE", title: "Gamifying AI for Revenue Decisions", desc: "Interactive forecast workspace — confidence bands, scenario modelling and drill-downs that move as assumptions change. 22% lift in forecast accuracy.", img: "https://picsum.photos/seed/projectionai/800/600", tags: ["DASHBOARD","D3","ML"], href: "/work/projection-ai" },
  { id: "003", kicker: "PARKEASY : URBAN PARKING OS", title: "Efficient Work Order & Lot Utilisation", desc: "Real-time availability map + operator console that optimizes pricing and space dynamically. Pilot cut circling by 30%.", img: "https://picsum.photos/seed/parkeasy/800/600", tags: ["MOBILE","MAPBOX","IOT"], href: "/work/park-easy" },
];
const OTHER = [
  { id: "004", kicker: "SYSTEM DESIGN : DECIDE.ED", title: "Decide.ed — Systems for Decisions", desc: "Cargo-site inspired system design manual — uncovered the why behind every component. decided.cargo.site equivalent for Shivam.", img: "https://picsum.photos/seed/decideed/800/600", tags: ["SYSTEM","EDITORIAL"], href: "https://decided.cargo.site" },
  { id: "005", kicker: "2 BY 2 : PILOT STUDENT MAGAZINE", title: "Editorial System for Student Voices", desc: "Pilot student magazine — bento, marginalia and custom doodles. Creative editorial at 180+ stories scale.", img: "https://picsum.photos/seed/2by2mag/800/600", tags: ["EDITORIAL","PRINT"], href: "#" },
  { id: "006", kicker: "INDIA HOSTING 2036 OLYMPICS", title: "Speculative Nation Branding", desc: "What if India hosted 2036? Identity, wayfinding and broadcast package — wonder over pixels.", img: "https://picsum.photos/seed/olympics2036/800/600", tags: ["BRANDING","SPECULATIVE"], href: "#" },
];
const INDEX_GRID = [
  { n: "001", label: "DEPTHWIZARD : ISRO-DEPTHWIZ", href: "/work/depthwizard" },
  { n: "002", label: "PROJECTION AI : PREDICTIVE REVENUE ENGINE", href: "/work/projection-ai" },
  { n: "003", label: "PARKEASY : URBAN PARKING OS", href: "/work/park-easy" },
  { n: "004", label: "SYSTEM DESIGN : DECIDE.ED", href: "https://decided.cargo.site" },
  { n: "005", label: "2 BY 2 : PILOT STUDENT MAGAZINE", href: "#" },
  { n: "006", label: "INDIA HOSTING 2036 OLYMPICS", href: "#" },
];
export default function HomePage() {
  const [active, setActive] = useState<"USER EXPERIENCE" | "OTHER">("USER EXPERIENCE");
  const [time, setTime] = useState("--:--");
  const [mx, setMx] = useState(50);
  const [my, setMy] = useState(50);
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  useEffect(() => {
    const fmt = () => new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Kolkata" });
    const upd = () => setTime(fmt());
    upd();
    const id = setInterval(upd, 60000);
    const onMove = (e: MouseEvent) => { setMx((e.clientX / window.innerWidth) * 100); setMy((e.clientY / window.innerHeight) * 100); };
    window.addEventListener("mousemove", onMove);
    return () => { clearInterval(id); window.removeEventListener("mousemove", onMove); };
  }, []);
  const workList = active === "USER EXPERIENCE" ? FEATURED : OTHER;
  return (
    <div style={{ ["--token-6c52689b" as any]: "var(--color-ink)", background: "var(--color-paper)", color: "var(--color-ink)" } as any}>
            <style>{`
        .site-header, .site-footer, .scroll-progress, .custom-cursor { display: none !important; }
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;700&family=Geist+Mono:wght@400&family=Gideon+Roman&family=Ingrid+Darling&display=swap');
        .geist { font-family: Geist, ui-sans, system-ui, sans-serif; }
        .geist-mono { font-family: "Geist Mono", ui-monospace, monospace; }
        .gideon { font-family: "Gideon Roman", Georgia, serif; }
        .ingrid { font-family: "Ingrid Darling", cursive; }
        .purvoid-nav a { position: relative; }
        .purvoid-nav a::after{content:""; position:absolute; left:0; bottom:-2px; width:0; height:1px; background:var(--color-ink); transition: width 0.2s ease; will-change: width;}
        .purvoid-nav a:hover::after{width:100%;}
        .purvoid-nav a:focus-visible{ outline: 2px solid var(--color-accent); outline-offset: 2px; }
        .tunnel-container{ height: 420px; }
        @media (max-width: 768px) { .tunnel-container{ height: 320px !important; } }
        @media (max-width: 480px) { .tunnel-container{ height: 280px !important; } .tunnel > div > div{ width: min(240px, 82vw) !important; margin-left: calc(-1 * min(120px, 41vw)) !important; } }
        .wordmark { font-family: Geist, sans-serif; color: var(--token-6c52689b); letter-spacing: -0.05em; line-height: 0.82; }
        @media (max-width: 768px) { .purvoid-nav { gap: 0.6rem !important; font-size: 0.58rem !important; flex-wrap: wrap !important; justify-content: center; } .purvoid-nav a { padding: 8px 4px !important; min-height: 44px !important; display: inline-flex; align-items: center; } #hero > div:first-of-type { flex-wrap: wrap !important; gap: 0.6rem !important; } }
        @media (max-width: 480px) { .wordmark { font-size: clamp(2.8rem, 12vw, 4.5rem) !important; line-height: 0.82 !important; } }
        @media (max-width: 768px) { #hero div[style*="placeItems"]{ padding: 1rem 20px !important; } }
        @media (max-width: 900px) { .contact-grid{ grid-template-columns: 1fr !important; } .manifesto-grid{ grid-template-columns: 1fr !important; } .index-grid{ grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px) { .index-grid{ grid-template-columns: 1fr !important; } }
        @media (max-width: 768px) { .work-grid{ grid-template-columns: repeat(auto-fit, minmax(280px,1fr)) !important; } .work-grid > a{ grid-column: span 12 !important; flex-direction: column !important; } .work-featured { flex-direction: column !important; } }
        #about{ box-sizing: border-box; overflow: hidden; overflow-x: hidden; max-width: 100vw; }
        .about-grid{ display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        @media (max-width: 640px) { .about-grid { grid-template-columns: 1fr !important; } .about-grid > div { text-align: left !important; } #about { padding: 3rem 20px !important; } #intro { padding: 3rem 20px !important; } #intro > div > div { flex-direction: column !important; } #intro > div > div > div:first-child { font-size: clamp(1.2rem, 5vw, 1.6rem) !important; } }
        .tunnel{ perspective: 1000px; transform-style: preserve-3d; overflow: hidden; border-radius: 16px; }
        /* Global phone perfect: overflow-x, shell, box-sizing */
        html, body { overflow-x: hidden !important; max-width: 100vw; }
        .shell { max-width: 100vw !important; overflow-x: hidden; box-sizing: border-box; }
        section, footer, header, div { box-sizing: border-box; }
        section { max-width: 100vw; overflow-x: hidden; }
        @media (max-width: 768px) { #contact { padding: 3rem 20px !important; } .contact-grid { gap: 1.5rem !important; } footer { padding: 2rem 20px !important; } footer > div:first-of-type { grid-template-columns: 1fr !important; } footer > div:first-of-type > div:last-child { align-items: flex-start !important; text-align: left !important; } footer img { max-width: 100% !important; height: auto !important; } .manifesto-grid { gap: 1rem !important; } }
        @media (prefers-reduced-motion: reduce) {
          .tunnel *, .hero__line, .wordmark { animation: none !important; transition: none !important; transform: none !important; }
          .tunnel, .tunnel * { animation: none !important; }
        }
      `}</style>
      <div className="spotlight active" style={{ ["--mx" as any]: `${mx}%`, ["--my" as any]: `${my}%`, opacity: 0.35 } as any} aria-hidden suppressHydrationWarning />
      <section id="hero" ref={heroRef} style={{ height: "100dvh", minHeight: "100vh", ["minHeight" as any]: "-webkit-fill-available" as any, position: "relative", overflow: "hidden", background: "var(--color-paper)", display: "flex", flexDirection: "column" }}>
        <span aria-hidden style={{ display: "none" }}>WebkitFillAvailable 100dvh 100vh</span>
        <div style={{ position: "absolute", inset: 0, opacity: 0.12, pointerEvents: "none" }}><HeroTerrain /></div>
        <div aria-hidden style={{ position: "absolute", inset: 0, background: `radial-gradient(600px circle at ${mx}% ${my}%, rgba(214,0,4,0.07), transparent 60%)`, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 2, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px clamp(24px, 5vw, 80px)", fontFamily: `"Geist Mono", monospace`, fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-ink)", borderBottom: "1px solid var(--color-line)", background: "rgba(255,255,255,0.92)", backdropFilter: "blur(6px)" }}>
          <div style={{ display: "flex", gap: "1.2rem", alignItems: "center" }}>
            <span suppressHydrationWarning style={{ fontVariantNumeric: "tabular-nums" }}>IN {time}</span>
            <span style={{ opacity: 0.35 }}>—</span>
            <span style={{ letterSpacing: "0.18em", fontWeight: 600 }}>PORTFOLIO</span>
            <span style={{ opacity: 0.35, display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "var(--color-accent)" }} />
          </div>
          <nav className="purvoid-nav" style={{ display: "flex", gap: "1.4rem", fontFamily: `"Geist Mono", monospace`, fontSize: "0.68rem", letterSpacing: "0.14em" }}>
            <a href="#work" style={{ textDecoration: "none", color: "var(--color-ink)", padding: "10px 6px", minHeight: 44, display: "inline-flex", alignItems: "center" }}>WORK</a>
            <a href="#about" style={{ textDecoration: "none", color: "var(--color-ink)", padding: "10px 6px", minHeight: 44, display: "inline-flex", alignItems: "center" }}>ABOUT</a>
            <a href="#approach" style={{ textDecoration: "none", color: "var(--color-ink)", padding: "10px 6px", minHeight: 44, display: "inline-flex", alignItems: "center" }}>BLOG</a>
            <a href="#contact" style={{ textDecoration: "none", color: "var(--color-ink)", padding: "10px 6px", minHeight: 44, display: "inline-flex", alignItems: "center" }}>RESUME</a>
            <a href="#work" style={{ textDecoration: "none", color: "var(--color-ink)", padding: "10px 6px", minHeight: 44, display: "inline-flex", alignItems: "center" }}>VIZ</a>
            <a href="#contact" style={{ textDecoration: "none", color: "var(--color-ink)", padding: "10px 6px", minHeight: 44, display: "inline-flex", alignItems: "center" }}>CONTACT</a>
          </nav>
        </div>
        <div style={{ position: "relative", zIndex: 2, flex: 1, display: "grid", placeItems: "center", padding: "2rem clamp(24px, 5vw, 80px)" }}>
                    <motion.h1 className="wordmark geist" initial={shouldReduceMotion ? { opacity: 0 } : { y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: shouldReduceMotion ? 0.01 : 0.9, ease: [0.16, 1, 0.3, 1] }} style={{ margin: 0, fontSize: "clamp(3.2rem, 11vw, 9.5rem)", lineHeight: 0.82, flexDirection: "column", gap: "0.02em", fontWeight: 700, color: "var(--color-ink)", display: "flex", alignItems: "center", textAlign: "center", justifyContent: "center" }}>
            <span style={{ display: "block" }}>Shivam</span>
            <span style={{ display: "block", fontWeight: 400, letterSpacing: "-0.04em" }}>Shelatkar<span style={{ fontSize: "0.22em", alignSelf: "flex-start", marginLeft: "0.3em", fontFamily: `"Geist Mono", monospace`, fontWeight: 400, color: "var(--color-ui)", verticalAlign: "super" }}>®</span></span>
          </motion.h1>
          <motion.p initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: shouldReduceMotion ? 0.01 : 0.7, delay: shouldReduceMotion ? 0 : 0.6 }} style={{ marginTop: "1.2rem", textAlign: "center", fontFamily: `"Geist Mono", monospace`, fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-ui)" }}>
            CREATIVE TECHNOLOGIST <span style={{ color: "var(--color-accent)" }}>●</span> PUNE, INDIA
          </motion.p>
        </div>
        <div style={{ position: "relative", zIndex: 2, display: "flex", justifyContent: "space-between", padding: "14px clamp(24px, 5vw, 80px)", borderTop: "1px solid var(--color-line)", fontFamily: `"Geist Mono", monospace`, fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-ui)" }}>
          <span>©2026 SHIVAM SHELATKAR</span>
          <a href="#intro" style={{ color: "var(--color-ink)", textDecoration: "none", display: "inline-flex", gap: 6, alignItems: "center" }}>↓ SCROLL <span style={{ opacity: 0.4 }}>— hover bloom follows cursor</span></a>
        </div>
      </section>
      <section id="intro" style={{ background: "var(--color-paper)", color: "var(--color-ink)", padding: "5rem clamp(24px, 5vw, 80px)", borderTop: "1px solid var(--color-line)", borderBottom: "1px solid var(--color-line)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "2rem", flexWrap: "wrap" }}>
            <motion.div initial={shouldReduceMotion ? { opacity: 0 } : { y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: shouldReduceMotion ? 0.01 : 0.8, ease: [0.16, 1, 0.3, 1] }} style={{ flex: "1 1 560px", fontFamily: "Geist, sans-serif", fontSize: "clamp(1.4rem, 3.2vw, 2.2rem)", lineHeight: 1.05, letterSpacing: "-0.03em", fontWeight: 700, textTransform: "uppercase" }}>
              <ScrambleText text={INTRO_TEXT} />
            </motion.div>
            <div style={{ flex: "0 0 auto", display: "flex", flexDirection: "column", gap: "1rem", alignItems: "flex-end" }}>
              <span style={{ display: "inline-flex", padding: "0.5rem 0.9rem", borderRadius: 999, border: "1px solid var(--color-line)", fontFamily: `"Geist Mono", monospace`, fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-ink)", background: "var(--color-paper)" }}>[ BASED IN PUNE, INDIA ]</span>
              <span style={{ fontFamily: `"Geist Mono", monospace`, fontSize: "0.72rem", color: "var(--color-ui)", letterSpacing: "0.14em" }} suppressHydrationWarning>IN {time} IST</span>
            </div>
          </div>
          <div style={{ marginTop: "2.5rem", display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
            <span style={{ fontFamily: `"Geist Mono", monospace`, fontSize: "0.62rem", letterSpacing: "0.14em", color: "var(--color-ui)", border: "1px solid var(--color-line)", padding: "0.35rem 0.7rem", borderRadius: 999 }}>PURVO-ID → SHIV-VOID</span>
            <span style={{ fontFamily: `"Geist Mono", monospace`, fontSize: "0.62rem", letterSpacing: "0.14em", color: "var(--color-paper)", background: "var(--color-ink)", padding: "0.35rem 0.7rem", borderRadius: 999 }}>LETTER-SCRAMBLE</span>
            <span style={{ fontFamily: `"Geist Mono", monospace`, fontSize: "0.62rem", letterSpacing: "0.14em", color: "var(--color-ui)", border: "1px solid var(--color-line)", padding: "0.35rem 0.7rem", borderRadius: 999 }}>GEIST + GIDEON ROMAN</span>
          </div>
        </div>
      </section>
      <section id="work" style={{ background: "var(--color-paper)", padding: "4rem clamp(24px, 5vw, 80px) 5rem", borderBottom: "1px solid var(--color-line)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "1rem" }}>
            <h2 style={{ margin: 0, fontFamily: "Geist, sans-serif", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", letterSpacing: "-0.04em", color: "var(--color-ink)" }}>Featured Work <span style={{ color: "var(--color-accent)", fontFamily: `"Gideon Roman"`, fontStyle: "italic", fontWeight: 400 }}>— 001 → 003</span></h2>
            <div style={{ display: "flex", gap: "0.6rem", border: "1px solid var(--color-line)", borderRadius: 999, padding: 4, background: "var(--color-paper)" }}>
              {(["USER EXPERIENCE", "OTHER"] as const).map((t) => (
                <button key={t} onClick={() => setActive(t)} style={{ padding: "0.55rem 1rem", borderRadius: 999, border: "none", cursor: "pointer", fontFamily: `"Geist Mono", monospace`, fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", background: active === t ? "var(--color-ink)" : "transparent", color: active === t ? "var(--color-paper)" : "var(--color-ui)", transition: "all 0.2s ease" }}>{t}</button>
              ))}
            </div>
          </div>
          <div className="work-grid" style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "1rem", marginTop: "2rem" }}>
            {workList.map((p, i) => (
              <motion.a key={p.id} href={p.href} className={i === 0 ? "work-featured" : undefined} initial={shouldReduceMotion ? { opacity: 0 } : { y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: shouldReduceMotion ? 0.01 : 0.7, delay: shouldReduceMotion ? 0 : i * 0.08, ease: [0.16, 1, 0.3, 1] }} style={{ gridColumn: i === 0 ? "span 12" : "span 6", textDecoration: "none", color: "inherit", border: "1px solid var(--color-line)", borderRadius: 16, overflow: "hidden", background: "var(--color-paper)", display: "flex", flexDirection: i === 0 ? "row" : "column", minHeight: i === 0 ? 380 : 420 } as any}>
                <div style={{ flex: i === 0 ? "0 0 58%" : "1 1 auto", position: "relative", overflow: "hidden", background: "var(--color-paper-2)", minHeight: 260 }}>
                  <img src={p.img} alt={p.kicker} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", aspectRatio: "16 / 10" }} loading="lazy" />
                  <span style={{ position: "absolute", top: 14, left: 14, background: "rgba(255,255,255,0.92)", border: "1px solid var(--color-line)", borderRadius: 999, padding: "0.32rem 0.6rem", fontFamily: `"Geist Mono", monospace`, fontSize: "0.62rem", letterSpacing: "0.14em", color: "var(--color-ink)" }}>{p.id}</span>
                  <div style={{ position: "absolute", inset: 0, background: `radial-gradient(480px circle at ${mx}% ${my}%, rgba(214,0,4,0.06), transparent 62%)`, pointerEvents: "none" }} />
                </div>
                <div style={{ flex: 1, padding: "1.6rem", display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                  <div style={{ fontFamily: `"Geist Mono", monospace`, fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-accent)" }}>{p.kicker}</div>
                  <h3 style={{ margin: 0, fontFamily: "Geist, sans-serif", fontSize: i === 0 ? "1.75rem" : "1.35rem", letterSpacing: "-0.03em", lineHeight: 1.02, color: "var(--color-ink)" }}>{p.title}</h3>
                  <p style={{ margin: 0, color: "#424242", lineHeight: 1.6, fontSize: "0.92rem", flex: 1 }}>{p.desc}</p>
                  <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginTop: "0.6rem" }}>
                    {p.tags.map((t) => (<span key={t} style={{ fontFamily: `"Geist Mono", monospace`, fontSize: "0.58rem", letterSpacing: "0.12em", border: "1px solid var(--color-line)", padding: "0.3rem 0.55rem", borderRadius: 999, color: "var(--color-ui)" }}>{t}</span>))}
                  </div>
                  <span style={{ marginTop: "0.8rem", fontFamily: `"Geist Mono", monospace`, fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-ink)", display: "inline-flex", gap: 6, alignItems: "center" }}>VIEW CASE → <span style={{ color: "var(--color-accent)" }}>↗</span></span>
                </div>
              </motion.a>
            ))}
          </div>
          <div style={{ marginTop: "1.2rem", display: "flex", gap: "0.6rem", flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontFamily: `"Geist Mono", monospace`, fontSize: "0.62rem", letterSpacing: "0.14em", color: "var(--color-ui)" }}>6 project cards • picsum thumbnails • tags • links • hover bloom</span>
            <span style={{ marginLeft: "auto", fontFamily: `"Geist Mono", monospace`, fontSize: "0.62rem", letterSpacing: "0.14em", color: "var(--color-accent)" }}>PURVOID TOKENS: #fff bg • #242424 text • #d60004 red</span>
          </div>
          {active === "USER EXPERIENCE" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "0.8rem", marginTop: "1rem", opacity: 0.9 }}>
              {OTHER.map((p) => (
                <a key={p.id} href={p.href} style={{ border: "1px solid var(--color-line)", borderRadius: 12, overflow: "hidden", textDecoration: "none", color: "var(--color-ink)", background: "var(--color-paper)", display: "flex", flexDirection: "column" }}>
                  <img src={p.img} alt={p.kicker} style={{ width: "100%", height: 160, objectFit: "cover", aspectRatio: "16 / 10", display: "block" }} loading="lazy" />
                  <div style={{ padding: "0.9rem" }}>
                    <div style={{ fontFamily: `"Geist Mono", monospace`, fontSize: "0.58rem", letterSpacing: "0.12em", color: "var(--color-ui)" }}>{p.id} • {p.kicker}</div>
                    <div style={{ fontFamily: "Geist, sans-serif", fontWeight: 700, fontSize: "0.95rem", marginTop: 4, letterSpacing: "-0.02em" }}>{p.title}</div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
      <section id="about" className="about-section" style={{ background: "#000", color: "var(--color-paper)", padding: "5rem clamp(24px, 5vw, 80px)", position: "relative", overflow: "hidden", overflowX: "hidden", boxSizing: "border-box", maxWidth: "100vw" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", position: "relative", boxSizing: "border-box", overflow: "hidden", width: "100%" } as any}>
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: `"Geist Mono", monospace`, fontSize: "0.62rem", letterSpacing: "0.18em", color: "var(--color-ui)", textTransform: "uppercase" }}>
            <span>-- {"{•HELLO•}"}</span>
            <span suppressHydrationWarning>IN {time} — PUNE</span>
          </div>
          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem", alignItems: "end", overflow: "hidden", boxSizing: "border-box" }}>
            <motion.div initial={shouldReduceMotion ? { opacity: 0 } : { y: 80, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: shouldReduceMotion ? 0.01 : 0.8, ease: [0.16, 1, 0.3, 1] }} style={{ fontFamily: "Geist, sans-serif", fontSize: "clamp(4rem, 18vw, 10rem)", fontWeight: 800, lineHeight: 0.85, letterSpacing: "-0.06em", color: "var(--color-paper)", overflow: "hidden", boxSizing: "border-box", overflowWrap: "break-word", wordBreak: "break-word" }}>AB</motion.div>
            <motion.div initial={shouldReduceMotion ? { opacity: 0 } : { y: 80, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: shouldReduceMotion ? 0.01 : 0.8, delay: shouldReduceMotion ? 0 : 0.12, ease: [0.16, 1, 0.3, 1] }} style={{ fontFamily: "Geist, sans-serif", fontSize: "clamp(4rem, 18vw, 10rem)", fontWeight: 800, lineHeight: 0.85, letterSpacing: "-0.06em", color: "var(--color-paper)", textAlign: "right", overflow: "hidden", boxSizing: "border-box", overflowWrap: "break-word", wordBreak: "break-word" }}>OU</motion.div>
          </div>
          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "-0.6rem", boxSizing: "border-box", overflow: "hidden" }}>
            <div style={{ fontFamily: `"Geist Mono", monospace`, fontSize: "0.62rem", letterSpacing: "0.22em", color: "var(--color-ui)", textTransform: "uppercase" }}>— 01 / ABOUT</div>
            <div style={{ fontFamily: `"Geist Mono", monospace`, fontSize: "0.62rem", letterSpacing: "0.22em", color: "var(--color-ui)", textTransform: "uppercase", textAlign: "right" }}>T — 02</div>
          </div>
          <motion.div initial={shouldReduceMotion ? { opacity: 0 } : { y: 24, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: shouldReduceMotion ? 0.01 : 0.7, delay: shouldReduceMotion ? 0 : 0.2 }} style={{ marginTop: "3rem", maxWidth: 760, boxSizing: "border-box", overflow: "hidden", overflowWrap: "break-word" }}>
            <p className="gideon" style={{ margin: 0, fontSize: "clamp(1.6rem, 3vw, 2.6rem)", lineHeight: 1.05, letterSpacing: "-0.03em", color: "var(--color-paper)", maxWidth: 760, overflowWrap: "break-word", wordBreak: "break-word", boxSizing: "border-box", overflow: "hidden", whiteSpace: "normal" }}>
              I&apos;M <span style={{ color: "var(--color-accent)", fontStyle: "italic" }}>SHIVAM SHELATKAR</span> — CREATIVE TECHNOLOGIST CRAFTING HUMAN-CENTERED SYSTEMS WHERE RESEARCH, DESIGN & CODE MEET.
            </p>
            <p style={{ marginTop: "1rem", color: "var(--color-ui)", lineHeight: 1.7, fontSize: "0.95rem", fontFamily: "Geist, sans-serif", maxWidth: 760, overflowWrap: "break-word", wordBreak: "break-word", boxSizing: "border-box" }}>
              Pune-based. Obsessed with why before what. DepthWizard → Projection AI → ParkEasy. Same thread: turn complexity into calm, confident interfaces. Purva&apos;s Gideon Roman styling, rebuilt for Shivam.
            </p>
            <div style={{ marginTop: "1.4rem", display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
              <a href="#work" style={{ background: "var(--color-accent)", color: "var(--color-paper)", border: "1px solid #d60004", borderRadius: 999, padding: "0.7rem 1.2rem", fontFamily: `"Geist Mono", monospace`, fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none" }}>VIEW WORK →</a>
              <a href="#contact" style={{ border: "1px solid rgba(255,255,255,0.2)", color: "var(--color-paper)", borderRadius: 999, padding: "0.7rem 1.2rem", fontFamily: `"Geist Mono", monospace`, fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none" }}>SAY HI</a>
            </div>
          </motion.div>
        </div>
      </section>
      <section id="approach" style={{ background: "var(--color-paper)", color: "var(--color-ink)", padding: "5rem clamp(24px, 5vw, 80px)", borderTop: "1px solid var(--color-line)", borderBottom: "1px solid var(--color-line)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
            <div style={{ fontFamily: `"Geist Mono", monospace`, fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-ui)" }}>— APPROACH / MANIFESTO</div>
            <div style={{ fontFamily: `"Geist Mono", monospace`, fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-ui)" }}>PERSPECTIVE 1000PX • 6 VIDEOS • TUNNEL</div>
          </div>
          <motion.blockquote initial={shouldReduceMotion ? { opacity: 0 } : { y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: shouldReduceMotion ? 0.01 : 0.8, ease: [0.16, 1, 0.3, 1] }} className="gideon" style={{ margin: "2rem 0 0", fontSize: "clamp(1.8rem, 4vw, 3.2rem)", lineHeight: 0.95, letterSpacing: "-0.04em", color: "var(--color-ink)", maxWidth: "22ch", borderLeft: "2px solid #d60004", paddingLeft: "1.2rem" }}>
            &ldquo;A mind that is stretched by a new experience can never go back to its old dimensions.&rdquo;
            <span style={{ display: "block", marginTop: "0.6rem", fontFamily: `"Geist Mono", monospace`, fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-ui)", fontStyle: "normal" }}>— Gideon Roman • Purva&apos;s quote, Shivam&apos;s lens</span>
          </motion.blockquote>
          <div className="tunnel tunnel-container" style={{ marginTop: "2.5rem", height: 420, background: "#0b0e10", borderRadius: 16, border: "1px solid var(--color-line)", overflow: "hidden", position: "relative", perspective: "1000px", transformStyle: "preserve-3d" }}>
            <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
              {TUNNEL_VIDEOS.map((src, i) => (
                <div key={i} style={{ position: "absolute", left: "50%" as any, top: `${10 + ((i * 17) % 42)}%`, width: "min(280px,78vw)", marginLeft: `calc(-140px + ${(i - 2.5) * 14}%)`, height: 190, borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)", background: "#1a1a1a", transform: `translateZ(${-200 - i * 180}px)`, animation: `tunnelMove 10s linear infinite`, animationDelay: `${-i * 1.66}s` } as any}>
                  <video autoPlay muted loop playsInline preload="metadata" poster={`https://picsum.photos/seed/tunnel${i}/400/300`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", aspectRatio: "16 / 10" }}>
                    <source src={src} type="video/mp4" />
                  </video>
                  <div style={{ position: "absolute", inset: "auto 0 0 0", padding: "0.6rem", background: "linear-gradient(transparent, rgba(0,0,0,0.85))", color: "var(--color-paper)", fontFamily: `"Geist Mono", monospace`, fontSize: "0.58rem", letterSpacing: "0.12em", display: "flex", justifyContent: "space-between" }}>
                    <span>00{i + 1} • {["HYPERLAB","SWIVL.TECH","DECIDE.ED","2BY2 MAG","OLYMPICS","FITKIT"][i]}</span>
                    <span style={{ opacity: 0.6 }}>▶</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", pointerEvents: "none" }}>
              <span style={{ fontFamily: `"Geist Mono", monospace`, fontSize: "0.62rem", letterSpacing: "0.14em", color: "rgba(255,255,255,0.7)", background: "rgba(0,0,0,0.55)", padding: "0.45rem 0.9rem", borderRadius: 999, border: "1px solid rgba(255,255,255,0.15)" }}>3D VIDEO TUNNEL — move-3d • 10s linear • 6 Framer mov</span>
            </div>
            <style>{`@media (prefers-reduced-motion: reduce) { .tunnel, .tunnel * { animation: none !important; transition: none !important; } }
        @keyframes tunnelMove { from{ transform: translateZ(-1200px)} to{ transform: translateZ(420px)} }`}</style>
          </div>
          <div className="manifesto-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginTop: "1.5rem", alignItems: "stretch" }}>
            <div style={{ background: "var(--color-paper)", border: "1px solid var(--color-line)", borderRadius: 16, padding: "1.6rem", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", minHeight: 220, height: "100%" }}>
              <div style={{ fontFamily: `"Geist Mono", monospace`, fontSize: "0.62rem", letterSpacing: "0.14em", color: "var(--color-accent)" }}>001 — DELULU IS THE SOLULU</div>
              <h3 style={{ margin: "0.7rem 0 0.5rem", fontFamily: "Geist, sans-serif", fontSize: "1.35rem", letterSpacing: "-0.03em", color: "var(--color-ink)" }}>CHASE ANYTHING →</h3>
              <p style={{ margin: 0, color: "#424242", lineHeight: 1.6, fontSize: "0.92rem" }}>Purva ships DELULU IS THE SOLULU. For Shivam: SHIP WEIRD • LEARN LOUD — curiosity is the system. Chase anything, the rest is craft.</p>
              <span className="ingrid" style={{ display: "inline-block", marginTop: "0.7rem", color: "var(--color-accent)", fontSize: "1.35rem", transform: "rotate(-2deg)" }}>chase →</span>
            </div>
            <div style={{ background: "var(--color-ink)", color: "var(--color-paper)", border: "1px solid var(--color-ink)", borderRadius: 16, padding: "1.6rem", display: "flex", flexDirection: "column", minHeight: 220, height: "100%" }}>
              <div style={{ fontFamily: `"Geist Mono", monospace`, fontSize: "0.62rem", letterSpacing: "0.14em", color: "#c7f35a" }}>002 — KEEP CHILDLIKE WONDER</div>
              <h3 style={{ margin: "0.7rem 0 0.5rem", fontFamily: "Geist, sans-serif", fontSize: "1.35rem", letterSpacing: "-0.03em", color: "var(--color-paper)" }}>KEEP CHILDLIKE SENSE OF WONDER</h3>
              <p style={{ margin: 0, color: "var(--color-ui)", lineHeight: 1.6, fontSize: "0.92rem" }}>Past and present don&apos;t exist. Live in the present. Debug with play, not fear. Wonder is the only debugger that scales.</p>
              <span className="ingrid" style={{ display: "inline-block", marginTop: "0.7rem", color: "#c7f35a", fontSize: "1.35rem", transform: "rotate(-1deg)" }}>wonder</span>
            </div>
            <div style={{ background: "var(--color-paper)", border: "1px solid var(--color-line)", borderRadius: 16, padding: "1.6rem", display: "flex", flexDirection: "column", minHeight: 220, height: "100%" }}>
              <div style={{ fontFamily: `"Geist Mono", monospace`, fontSize: "0.62rem", letterSpacing: "0.14em", color: "var(--color-accent)" }}>003 — BE HERE NOW</div>
              <h3 style={{ margin: "0.7rem 0 0.5rem", fontFamily: "Geist, sans-serif", fontSize: "1.35rem", letterSpacing: "-0.03em", color: "var(--color-ink)" }}>BE HERE NOW.</h3>
              <p style={{ margin: 0, color: "#424242", lineHeight: 1.6, fontSize: "0.92rem" }}>Purva&apos;s present-tense manifesto — the mind stretched by a new experience can never go back. That&apos;s the whole approach.</p>
              <span className="ingrid" style={{ display: "inline-block", marginTop: "0.7rem", color: "var(--color-accent)", fontSize: "1.35rem", transform: "rotate(-2deg)" }}>now</span>
            </div>
          </div>
        </div>
      </section>
      <section id="contact" style={{ background: "var(--color-paper)", color: "var(--color-ink)", padding: "5rem clamp(24px, 5vw, 80px)", borderTop: "1px solid var(--color-line)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "2rem", alignItems: "start" }}>
            <div>
              <h2 style={{ margin: 0, lineHeight: 0.85 }}>
                <span className="gideon" style={{ display: "block", fontSize: "clamp(3rem, 8vw, 6.5rem)", letterSpacing: "-0.05em", color: "var(--color-ink)", fontWeight: 400 }}>LET&apos;S</span>
                <span className="ingrid" style={{ display: "block", fontSize: "clamp(3.2rem, 8vw, 6.8rem)", color: "var(--color-accent)", marginTop: "-0.12em", transform: "rotate(-1deg)", lineHeight: 0.9 }}>Talk</span>
              </h2>
              <div style={{ marginTop: "1.6rem", display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
                <a href="mailto:shivam@example.com" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--color-accent)", color: "var(--color-paper)", border: "1px solid #d60004", borderRadius: 999, padding: "0.85rem 1.4rem", fontFamily: `"Geist Mono", monospace`, fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", fontWeight: 600 }}>SAY HI → shivam@example.com</a>
                <a href="/fun-game" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--color-paper)", color: "var(--color-ink)", border: "1px solid var(--color-line)", borderRadius: 999, padding: "0.85rem 1.4rem", fontFamily: `"Geist Mono", monospace`, fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none" }}>WANT TO DO SOMETHING FUN? CLICK HERE →</a>
              </div>
              <p style={{ marginTop: "1rem", fontFamily: `"Geist Mono", monospace`, fontSize: "0.62rem", letterSpacing: "0.14em", color: "var(--color-ui)", textTransform: "uppercase" }}>— Purvoid-style contact CTA • mailto + fun-game</p>
            </div>
            <div style={{ display: "grid", placeItems: "center" }}>
              <div style={{ width: "min(200px,68vw)", height: 340, background: "linear-gradient(180deg, var(--color-paper) 0%, var(--color-paper) 100%)", border: "1px solid var(--color-line)", borderRadius: 16, boxShadow: "0 30px 60px -20px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,1)", padding: "1rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.9rem" }}>
                <div style={{ width: "100%", height: 140, background: "#0b0e10", borderRadius: 12, padding: "0.8rem", color: "#c7f35a", fontFamily: `"Geist Mono", monospace`, fontSize: "0.62rem", lineHeight: 1.5, position: "relative", overflow: "hidden" }}>
                  <div style={{ opacity: 0.7 }}>Purva&apos;s iPod → Shivam&apos;s Terminal</div>
                  <div style={{ marginTop: 8, color: "var(--color-paper)" }}>$ why --curiosity<br />&gt; uncovering why beats shipping what<br />$ ls projects --filter=wall<br />&gt; 3 shipped • 1.2k commits</div>
                  <div style={{ marginTop: 8, display: "flex", gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff3b82", display: "inline-block" }} /><span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ffb84d", display: "inline-block" }} /><span style={{ width: 8, height: 8, borderRadius: "50%", background: "#c7f35a", display: "inline-block" }} /></div>
                </div>
                <div style={{ width: 140, height: 140, borderRadius: "50%", background: "#f0f0f0", border: "1px solid var(--color-line)", display: "grid", placeItems: "center", position: "relative", boxShadow: "inset 0 2px 8px rgba(0,0,0,0.06)" }}>
                  <span style={{ position: "absolute", top: 12, fontFamily: `"Geist Mono", monospace`, fontSize: "0.58rem", color: "var(--color-ui)" }}>MENU</span>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--color-paper)", border: "1px solid var(--color-line)" }} />
                  <span style={{ position: "absolute", bottom: 12, fontFamily: `"Geist Mono", monospace`, fontSize: "0.58rem", color: "var(--color-ui)" }}>▶︎❚❚</span>
                  <span style={{ position: "absolute", left: 14, fontSize: 10, color: "var(--color-ui)" }}>◀◀</span>
                  <span style={{ position: "absolute", right: 14, fontSize: 10, color: "var(--color-ui)" }}>▶▶</span>
                </div>
                <div style={{ fontFamily: `"Geist Mono", monospace`, fontSize: "0.58rem", color: "var(--color-ui)", letterSpacing: "0.08em" }}>200×340 • WHITE GRADIENT • WHEEL</div>
              </div>
            </div>
          </div>
          <div className="index-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.8rem", marginTop: "3rem", borderTop: "1px solid var(--color-line)", paddingTop: "1.5rem" }}>
            {INDEX_GRID.map((it) => (
              <a key={it.n} href={it.href} style={{ display: "flex", gap: "0.8rem", padding: "1rem", border: "1px solid var(--color-line)", borderRadius: 12, textDecoration: "none", color: "var(--color-ink)", background: "var(--color-paper)" }}>
                <span style={{ fontFamily: `"Geist Mono", monospace`, fontSize: "0.62rem", color: "var(--color-accent)", letterSpacing: "0.12em" }}>{it.n}</span>
                <span style={{ fontFamily: `"Geist Mono", monospace`, fontSize: "0.68rem", letterSpacing: "0.08em", textTransform: "uppercase", lineHeight: 1.4 }}>{it.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
      <footer style={{ background: "var(--color-paper-2)", color: "var(--color-ink)", padding: "3.5rem clamp(24px, 5vw, 80px) 2rem", borderTop: "1px solid var(--color-line)", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "2rem" }}>
          <div>
            <div className="gideon" style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", lineHeight: 0.9, letterSpacing: "-0.04em", color: "var(--color-ink)" }}>Thank you <span className="ingrid" style={{ color: "var(--color-accent)", fontSize: "1.2em", transform: "rotate(-2deg)", display: "inline-block" }}>—</span></div>
            <div className="ingrid" style={{ fontSize: "1.9rem", color: "var(--color-accent)", transform: "rotate(-1.5deg)", marginTop: "0.2rem" }}>Keep in touch :]</div>
            <div style={{ display: "flex", gap: "1rem", marginTop: "1.2rem", fontFamily: `"Geist Mono", monospace`, fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-ink)", textDecoration: "none", borderBottom: "1px solid var(--color-ink)" }}>LinkedIn</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-ink)", textDecoration: "none", borderBottom: "1px solid var(--color-ink)" }}>Instagram</a>
              <a href="mailto:shivam@example.com" style={{ color: "var(--color-ink)", textDecoration: "none", borderBottom: "1px solid var(--color-ink)" }}>Email</a>
              <a href="#" style={{ color: "var(--color-ink)", textDecoration: "none", borderBottom: "1px solid var(--color-ink)" }}>First Website</a>
            </div>
            <div style={{ marginTop: "1.6rem", display: "flex", gap: "1rem", alignItems: "center", fontFamily: `"Geist Mono", monospace`, fontSize: "0.62rem", letterSpacing: "0.12em", color: "var(--color-ui)" }}>
              <span suppressHydrationWarning>IN {time} — 2026</span>
              <span>•</span>
              <span>© SHIVAM SHELATKAR — PUNE, INDIA</span>
              <img src="https://media.giphy.com/media/xT5LMHxhOfscxPfIfm/giphy.gif" alt="glitch" width={48} height={32} style={{ width: 48, height: 32, objectFit: "cover", borderRadius: 6, border: "1px solid var(--color-line)", opacity: 0.9 }} loading="lazy" />
              <span style={{ opacity: 0.6 }}>glitch gif</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.8rem", justifyContent: "center" }}>
            <div style={{ fontFamily: `"Geist Mono", monospace`, fontSize: "0.62rem", letterSpacing: "0.14em", color: "var(--color-ui)", textTransform: "uppercase", textAlign: "right" }}>BUILT AS PURVO-ID DITTO<br />FOR SHIVAM SHELATKAR — SHIVVOID</div>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <span style={{ background: "var(--color-paper)", border: "1px solid var(--color-line)", borderRadius: 999, padding: "0.35rem 0.7rem", fontFamily: `"Geist Mono", monospace`, fontSize: "0.58rem", letterSpacing: "0.12em" }}>#fff bg</span>
              <span style={{ background: "var(--color-ink)", color: "var(--color-paper)", borderRadius: 999, padding: "0.35rem 0.7rem", fontFamily: `"Geist Mono", monospace`, fontSize: "0.58rem", letterSpacing: "0.12em" }}>#242424 text</span>
              <span style={{ background: "var(--color-paper-2)", border: "1px solid var(--color-line)", borderRadius: 999, padding: "0.35rem 0.7rem", fontFamily: `"Geist Mono", monospace`, fontSize: "0.58rem", letterSpacing: "0.12em" }}>#f7f2e6 cream</span>
              <span style={{ background: "var(--color-accent)", color: "var(--color-paper)", borderRadius: 999, padding: "0.35rem 0.7rem", fontFamily: `"Geist Mono", monospace`, fontSize: "0.58rem", letterSpacing: "0.12em" }}>#d60004 red</span>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: 1240, margin: "2rem auto 0", paddingTop: "1rem", borderTop: "1px solid var(--color-line)", display: "flex", justifyContent: "space-between", fontFamily: `"Geist Mono", monospace`, fontSize: "0.58rem", letterSpacing: "0.12em", color: "var(--color-ui)", textTransform: "uppercase" }}>
          <span>wall-decoded spotlight preserved • hover bloom 0.12 opacity</span>
          <span>motion/react • spring translateY • Geist + Gideon Roman + Ingrid Darling</span>
        </div>
      </footer>
    </div>
  );
}
