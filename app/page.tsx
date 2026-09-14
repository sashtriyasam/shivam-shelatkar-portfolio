"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import Link from "next/link";
import { HeroFallback } from "@/components/hero/HeroFallback";

const HeroTerrain = dynamic(() =>
  import("@/components/hero/HeroTerrain").then((m) => m.HeroTerrain),
  { ssr: false },
);

const ease = [0.16, 1, 0.3, 1] as const;

export default function HomePage() {
  return (
    <section className="hero" id="hero">
      <HeroTerrain />
      <HeroFallback />

      <div className="hero__decor" aria-hidden="true">
        <span className="hero__decor-line" />
        <span className="hero__decor-label">hero / index 01</span>
      </div>

      <div className="content-max hero__content">
        <div className="hero__meta">
          <motion.p
            className="hero__eyebrow"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            Creative technologist
          </motion.p>
          <motion.p
            className="hero__meta-line"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.18, ease }}
          >
            EST. 2026 · SAN FRANCISCO, CA · CREATIVE TECHNOLOGIST
          </motion.p>
        </div>

        <h1 className="hero__title display">
          <motion.span
            className="hero__line"
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.28, ease }}
          >
            SHIVAM
          </motion.span>
          <motion.span
            className="hero__line hero__line--outline"
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease }}
          >
            SHELATKAR
          </motion.span>
          <motion.span
            className="hero__line"
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.52, ease }}
          >
            BUILDS THINGS.
          </motion.span>
        </h1>

        <motion.p
          className="hero__lead"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.78, ease }}
        >
          I design and build the space between a product&apos;s idea and the
          person using it — turning complexity into calm, confident interfaces.
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.98, ease }}
        >
          <Link href="/work" className="btn btn--accent">
            View selected work
          </Link>
          <Link href="/contact" className="btn">
            Start a project
          </Link>
        </motion.div>
      </div>

      <motion.a
        href="#work"
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <span className="hero__scroll-label">scroll down</span>
        <span className="hero__scroll-rule" />
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </motion.a>
    </section>
  );
}
