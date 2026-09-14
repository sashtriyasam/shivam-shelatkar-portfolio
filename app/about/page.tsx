"use client";

"use client";

import { motion } from "motion/react";
import { Briefcase, Code2, Lightbulb, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="about">
      <div className="content-max">
        <header className="about__header">
          <p className="eyebrow">About</p>
          <motion.h1
            className="about__title display"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            Designer by instinct. Engineer by practice.
          </motion.h1>
        </header>

        <div className="about__grid">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <p className="about__lead">
              I help teams turn ambiguous problems into products that feel
              inevitable — from the first sketch to the final commit.
            </p>
            <p className="about__copy">
              Over the last decade I&apos;ve worked with startups, agencies, and
              research labs across geospatial intelligence, fintech, and civic
              tech. I care about systems that are as functional as they are
              beautiful, and I enjoy getting my hands dirty with the code that
              ships them.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h2 className="about__subtitle">What I do</h2>
            <ul className="about__list">
              <li>Product strategy and interaction design</li>
              <li>Design systems and frontend architecture</li>
              <li>Prototyping with code and motion</li>
              <li>Collaborating with engineers and researchers</li>
            </ul>
          </motion.div>
        </div>

        <section className="about__interests">
          <h2 className="about__subtitle">Interests</h2>
          <div className="about__cards">
            <div className="about__card">
              <Briefcase size={24} />
              <h3 className="about__card-title">Product craft</h3>
              <p className="about__card-text">
                Turning messy requirements into calm, usable experiences.
              </p>
            </div>
            <div className="about__card">
              <Code2 size={24} />
              <h3 className="about__card-title">Frontend engineering</h3>
              <p className="about__card-text">
                Building accessible, performant interfaces that hold up at scale.
              </p>
            </div>
            <div className="about__card">
              <Lightbulb size={24} />
              <h3 className="about__card-title">Creative technology</h3>
              <p className="about__card-text">
                Exploring WebGL, generative art, and interactive storytelling.
              </p>
            </div>
            <div className="about__card">
              <Users size={24} />
              <h3 className="about__card-title">Team leadership</h3>
              <p className="about__card-text">
                Mentoring designers and engineers to build stronger product teams.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="about__subtitle">Tools in the toolbox</h2>
          <p className="about__tools-text">
            Figma, Next.js, React, TypeScript, Tailwind CSS, Three.js, GSAP,
            Lenis, Framer Motion, Storybook, and a growing list of experimental
            frameworks. I also keep a sketchbook nearby for ideas that don&apos;t
            fit on a screen yet.
          </p>
        </section>
      </div>
    </div>
  );
}
