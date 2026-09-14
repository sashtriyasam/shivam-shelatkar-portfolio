"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { HeroFallback } from "@/components/hero/HeroFallback";

const HeroTerrain = dynamic(() =>
  import("@/components/hero/HeroTerrain").then((m) => m.HeroTerrain),
  { ssr: false },
);

export default function HomePage() {
  return (
    <>
      <section className="hero" id="hero">
        <HeroTerrain />
        <HeroFallback />

        <div className="content-max hero__content">
          <p className="hero__eyebrow">Product designer & frontend engineer</p>
          <h1 className="hero__title display">
            <motion.span
              className="hero__line"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              Clear ideas.
            </motion.span>
            <motion.span
              className="hero__line hero__line--outline"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              Expressive
            </motion.span>
            <motion.span
              className="hero__line"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              Interfaces.
            </motion.span>
          </h1>
          <motion.p
            className="hero__lead"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
          >
            I design and build the space between a product&apos;s idea and the
            person using it — turning complexity into calm, confident interfaces.
          </motion.p>
          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
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
          transition={{ delay: 1.2 }}
        >
          <ArrowDown size={18} />
        </motion.a>
      </section>
    </>
  );
}
