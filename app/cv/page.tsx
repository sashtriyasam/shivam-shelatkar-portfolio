"use client";

import { Printer, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { sound } from "@/lib/audio";

export default function CVPage() {
  const handlePrint = () => {
    sound.playClick();
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div
      className="cv-page"
      style={{
        padding: "clamp(32px, 6vw, 80px) clamp(20px, 4vw, 40px)",
        minHeight: "100vh",
      }}
    >
      <div className="content-max" style={{ maxWidth: 860, margin: "0 auto" }}>
        {/* Navigation & Print Controls */}
        <div
          className="no-print"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 40,
            paddingBottom: 20,
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <Link
            href="/about"
            className="link-underline"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 14,
            }}
            onMouseEnter={() => sound.playHover()}
            onClick={() => sound.playClick()}
          >
            <ArrowLeft size={16} /> Back to About
          </Link>

          <button
            type="button"
            onClick={handlePrint}
            onMouseEnter={() => sound.playHover()}
            className="btn btn--accent"
            style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            <Printer size={15} /> Print / Save as PDF
          </button>
        </div>

        {/* CV Header */}
        <header style={{ marginBottom: 44 }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--color-accent-primary)",
              display: "block",
              marginBottom: 8,
            }}
          >
            CURRICULUM VITAE · 2026
          </span>

          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              margin: "0 0 10px",
              color: "var(--color-text-primary)",
            }}
          >
            Shivam Shelatkar
          </h1>

          <p
            style={{
              fontSize: 18,
              color: "var(--color-text-secondary)",
              margin: "0 0 16px",
              fontWeight: 500,
            }}
          >
            Music Technologist · Composer · Systems Engineer · Founder
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px 24px",
              fontSize: 13,
              fontFamily: "var(--font-mono)",
              color: "var(--color-text-tertiary)",
            }}
          >
            <span>Thane — Mumbai, India</span>
            <a
              href="mailto:shelatkarshivam4@gmail.com"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              shelatkarshivam4@gmail.com
            </a>
            <a
              href="https://github.com/sashtriyasam"
              target="_blank"
              rel="noreferrer"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              github.com/sashtriyasam
            </a>
            <a
              href="https://linkedin.com/in/shivam-shelatkar-503305358"
              target="_blank"
              rel="noreferrer"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              LinkedIn
            </a>
          </div>
        </header>

        {/* Executive Summary */}
        <section
          style={{
            marginBottom: 40,
            borderTop: "1px solid var(--color-border)",
            paddingTop: 28,
          }}
        >
          <h2
            style={{
              fontSize: 13,
              fontFamily: "var(--font-mono)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--color-text-secondary)",
              marginBottom: 12,
            }}
          >
            Summary
          </h2>
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.7,
              color: "var(--color-text-primary)",
              margin: 0,
            }}
          >
            Music technologist and systems engineer operating at the convergence
            of software engineering, real-time IoT architecture, classical
            musical lineage, and creative technology. Founder of Swarvibhaa;
            on-site technical director for national festivals at Film City
            Mumbai; trained for 10 years in Indian classical tabla under Pandit
            Mukundraj Deo and 6 years in piano through Trinity College London.
          </p>
        </section>

        {/* Education */}
        <section
          style={{
            marginBottom: 40,
            borderTop: "1px solid var(--color-border)",
            paddingTop: 28,
          }}
        >
          <h2
            style={{
              fontSize: 13,
              fontFamily: "var(--font-mono)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--color-text-secondary)",
              marginBottom: 16,
            }}
          >
            Education
          </h2>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              <h3
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  margin: 0,
                  color: "var(--color-text-primary)",
                }}
              >
                Bachelor of Engineering (B.E.) in Computer Engineering
              </h3>
              <span
                style={{
                  fontSize: 13,
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-text-tertiary)",
                }}
              >
                University of Mumbai
              </span>
            </div>
            <p
              style={{
                fontSize: 14,
                color: "var(--color-text-secondary)",
                marginTop: 6,
              }}
            >
              Coursework in Data Structures & Algorithms, Distributed Systems,
              Computer Networks, Database Management Systems, Object-Oriented
              Software Engineering, and Machine Learning.
            </p>
          </div>
        </section>

        {/* Experience & Leadership */}
        <section
          style={{
            marginBottom: 40,
            borderTop: "1px solid var(--color-border)",
            paddingTop: 28,
          }}
        >
          <h2
            style={{
              fontSize: 13,
              fontFamily: "var(--font-mono)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--color-text-secondary)",
              marginBottom: 20,
            }}
          >
            Experience & Engineering Leadership
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {/* Swarvibhaa */}
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    margin: 0,
                    color: "var(--color-text-primary)",
                  }}
                >
                  Founder & Creative Director · Swarvibhaa
                </h3>
                <span
                  style={{
                    fontSize: 13,
                    fontFamily: "var(--font-mono)",
                    color: "var(--color-accent-primary)",
                  }}
                >
                  2023 – Present
                </span>
              </div>
              <p
                style={{
                  fontSize: 13,
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-text-tertiary)",
                  margin: "4px 0 8px",
                }}
              >
                Mumbai · Delhi · Gujarat
              </p>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: 20,
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: "var(--color-text-secondary)",
                }}
              >
                <li>
                  Founded an independent cultural and creative music initiative
                  bridging Hindustani classical discipline with Western harmonic
                  structures.
                </li>
                <li>
                  Composed, orchestrated, and executive-produced official
                  catalogue releases including <em>Saffron Suraaval</em>{" "}
                  (5-track EP), <em>Thevita Mastak Deva Tuzha Payi</em>, and{" "}
                  <em>Raatrani</em>.
                </li>
                <li>
                  Managed cross-functional recording sessions, multi-track
                  mixing pipelines, visual release edits, and streaming
                  distribution platforms.
                </li>
              </ul>
            </div>

            {/* NSFF 2026 */}
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    margin: 0,
                    color: "var(--color-text-primary)",
                  }}
                >
                  Technical Head & Digital Architect · NSFF 2026
                </h3>
                <span
                  style={{
                    fontSize: 13,
                    fontFamily: "var(--font-mono)",
                    color: "var(--color-accent-primary)",
                  }}
                >
                  2026
                </span>
              </div>
              <p
                style={{
                  fontSize: 13,
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-text-tertiary)",
                  margin: "4px 0 8px",
                }}
              >
                Film City Mumbai · National Student Film Festival
              </p>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: 20,
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: "var(--color-text-secondary)",
                }}
              >
                <li>
                  Designed, coded, and deployed the official festival web
                  platform (<code>nsff.in</code>) with edge-cached schedules,
                  film entry catalogues, and institutional sponsor showcases.
                </li>
                <li>
                  Directly headed on-site technical operations at Film City
                  Mumbai: oversaw DCI digital cinema playback rigs, projection
                  switching redundancy, multi-channel sound routing, and stage
                  cues.
                </li>
                <li>
                  Liaised with major institutional entities: University of
                  Mumbai, ABP, IIM Mumbai, SNDT, and ABVP.
                </li>
              </ul>
            </div>

            {/* DepthWizard */}
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    margin: 0,
                    color: "var(--color-text-primary)",
                  }}
                >
                  Lead Systems & AI Engineer · DepthWizard
                </h3>
                <span
                  style={{
                    fontSize: 13,
                    fontFamily: "var(--font-mono)",
                    color: "var(--color-accent-primary)",
                  }}
                >
                  2025 – 2026
                </span>
              </div>
              <p
                style={{
                  fontSize: 13,
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-text-tertiary)",
                  margin: "4px 0 8px",
                }}
              >
                Geospatial AI & Single-View 3D Terrain Reconstruction
              </p>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: 20,
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: "var(--color-text-secondary)",
                }}
              >
                <li>
                  Engineered an AI monocular depth estimation pipeline
                  predicting metric terrain elevations from single-pass
                  satellite and aerial imagery.
                </li>
                <li>
                  Calibrated metric elevation scales against ISRO Cartosat
                  Digital Elevation Models (DEMs), achieving &lt;3.2m RMSE on
                  Indian regional benchmarks.
                </li>
                <li>
                  Architected an interactive 60 FPS Three.js GPU flythrough
                  engine utilizing 16-bit heightfield textures and custom vertex
                  displacement GLSL shaders, reducing transfer payloads by 85%.
                </li>
              </ul>
            </div>

            {/* ParkEasy */}
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    margin: 0,
                    color: "var(--color-text-primary)",
                  }}
                >
                  Lead Full-Stack Developer · ParkEasy
                </h3>
                <span
                  style={{
                    fontSize: 13,
                    fontFamily: "var(--font-mono)",
                    color: "var(--color-accent-primary)",
                  }}
                >
                  2026
                </span>
              </div>
              <p
                style={{
                  fontSize: 13,
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-text-tertiary)",
                  margin: "4px 0 8px",
                }}
              >
                Real-Time Smart Parking Operating System
              </p>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: 20,
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: "var(--color-text-secondary)",
                }}
              >
                <li>
                  Architected full-stack mobile parking discovery and
                  reservation OS with Expo (React Native), Express, Supabase
                  PostgreSQL, and Razorpay.
                </li>
                <li>
                  Implemented sub-80ms real-time availability updates across
                  geospatial zones using Socket.io room broadcasting.
                </li>
                <li>
                  Guaranteed 0% double-booking through atomic database row locks
                  (<code>SELECT FOR UPDATE</code>) and automated 10-minute hold
                  expirations.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Music Lineage & Discography */}
        <section
          style={{
            marginBottom: 40,
            borderTop: "1px solid var(--color-border)",
            paddingTop: 28,
          }}
        >
          <h2
            style={{
              fontSize: 13,
              fontFamily: "var(--font-mono)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--color-text-secondary)",
              marginBottom: 16,
            }}
          >
            Music Lineage & Credentials
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                padding: 20,
                background: "rgba(255,255,255,0.03)",
                borderRadius: 14,
                border: "1px solid var(--color-border)",
              }}
            >
              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  margin: "0 0 4px",
                  color: "var(--color-text-primary)",
                }}
              >
                Classical Tabla · 10 Years
              </h3>
              <p
                style={{
                  fontSize: 13,
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-accent-primary)",
                  margin: "0 0 8px",
                }}
              >
                Gurushishya Parampara · Pandit Mukundraj Deo
              </p>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: "var(--color-text-secondary)",
                  margin: 0,
                }}
              >
                Rigorous training in taal systems, vocal accompaniment, solo
                repertoire, and layakaari under renowned maestro Pandit
                Mukundraj Deo.
              </p>
            </div>

            <div
              style={{
                padding: 20,
                background: "rgba(255,255,255,0.03)",
                borderRadius: 14,
                border: "1px solid var(--color-border)",
              }}
            >
              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  margin: "0 0 4px",
                  color: "var(--color-text-primary)",
                }}
              >
                Classical Piano · 6 Years
              </h3>
              <p
                style={{
                  fontSize: 13,
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-focus)",
                  margin: "0 0 8px",
                }}
              >
                Trinity College London
              </p>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: "var(--color-text-secondary)",
                  margin: 0,
                }}
              >
                Western harmonic theory, sight reading, contrapuntal voicings,
                and score transcription.
              </p>
            </div>
          </div>

          <h3
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "var(--color-text-primary)",
              marginBottom: 12,
            }}
          >
            Selected Commercial & Streaming Releases
          </h3>
          <ul
            style={{
              margin: 0,
              paddingLeft: 20,
              fontSize: 14,
              lineHeight: 1.8,
              color: "var(--color-text-secondary)",
            }}
          >
            <li>
              <strong>Thevita Mastak Deva Tuzha Payi</strong> (2025) · Marathi
              Devotional Single · Spotify, JioSaavn, YouTube
            </li>
            <li>
              <strong>Saffron Suraaval EP</strong> (2025) · 5-Track Indian
              Fusion Instrumental EP · Spotify, JioSaavn
            </li>
            <li>
              <strong>Raatrani</strong> (2025) · Orchestral Cinematic
              Arrangement (Original by Anshul Bopardikar) · JioSaavn
            </li>
          </ul>
        </section>

        {/* Technical Skills Matrix */}
        <section
          style={{
            marginBottom: 40,
            borderTop: "1px solid var(--color-border)",
            paddingTop: 28,
          }}
        >
          <h2
            style={{
              fontSize: 13,
              fontFamily: "var(--font-mono)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--color-text-secondary)",
              marginBottom: 16,
            }}
          >
            Technical Competencies
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 16,
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "var(--color-text-primary)",
                  margin: "0 0 6px",
                }}
              >
                Languages
              </h3>
              <p
                style={{
                  fontSize: 13,
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-text-secondary)",
                  margin: 0,
                }}
              >
                C, C++, C#, Python, TypeScript, JavaScript, SQL, GLSL
              </p>
            </div>

            <div>
              <h3
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "var(--color-text-primary)",
                  margin: "0 0 6px",
                }}
              >
                Web & Mobile
              </h3>
              <p
                style={{
                  fontSize: 13,
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-text-secondary)",
                  margin: 0,
                }}
              >
                Next.js (App Router), React, React Native (Expo), Express,
                FastAPI, Tailwind CSS
              </p>
            </div>

            <div>
              <h3
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "var(--color-text-primary)",
                  margin: "0 0 6px",
                }}
              >
                Systems & Data
              </h3>
              <p
                style={{
                  fontSize: 13,
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-text-secondary)",
                  margin: 0,
                }}
              >
                PostgreSQL, Supabase, Socket.io, Redis, Docker, Git, GDAL /
                Rasterio
              </p>
            </div>

            <div>
              <h3
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "var(--color-text-primary)",
                  margin: "0 0 6px",
                }}
              >
                Creative Tech & Audio
              </h3>
              <p
                style={{
                  fontSize: 13,
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-text-secondary)",
                  margin: 0,
                }}
              >
                Three.js, WebGL, Unity (C#), Web Audio API, Logic Pro, Ableton
                Live, DCI Playback
              </p>
            </div>
          </div>
        </section>

        {/* Footer note */}
        <footer
          className="no-print"
          style={{
            borderTop: "1px solid var(--color-border)",
            paddingTop: 28,
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: 14,
              color: "var(--color-text-tertiary)",
              margin: "0 0 16px",
            }}
          >
            Available for software systems engineering, film scores, technical
            direction, and creative technology commissions.
          </p>
          <Link
            href="/contact"
            className="btn btn--accent"
            onMouseEnter={() => sound.playHover()}
            onClick={() => sound.playClick()}
          >
            Start a Conversation →
          </Link>
        </footer>
      </div>
    </div>
  );
}
