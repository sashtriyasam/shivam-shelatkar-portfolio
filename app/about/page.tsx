"use client";

import { motion } from "motion/react";
import { Briefcase, Code2, Lightbulb, Users } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;
const viewport = { once: true, margin: "-100px" } as const;

const interests = [
  {
    icon: Briefcase,
    index: "01",
    title: "Product craft",
    text: "Turning messy requirements into calm, usable experiences.",
  },
  {
    icon: Code2,
    index: "02",
    title: "Frontend engineering",
    text: "Building accessible, performant interfaces that hold up at scale.",
  },
  {
    icon: Lightbulb,
    index: "03",
    title: "Creative technology",
    text: "Exploring WebGL, generative art, and interactive storytelling.",
  },
  {
    icon: Users,
    index: "04",
    title: "Team leadership",
    text: "Mentoring designers and engineers to build stronger product teams.",
  },
];

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
            viewport={viewport}
            transition={{ duration: 0.8, ease }}
          >
            Designer by instinct. Engineer by practice.
          </motion.h1>
        </header>

        <div className="about__grid">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.8, ease }}
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
<aside className="about__facts" aria-label="Snapshot">
               <span className="about__fact">10+ years</span>
               <span className="about__fact">Remote</span>
               <span className="about__fact">Full-time</span>
             </aside>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.8, delay: 0.1, ease }}
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
          <motion.div
            className="about__interests-head"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7, ease }}
          >
            <h2 className="about__subtitle">What I&apos;m exploring</h2>
            <p className="about__interests-kicker">
              <span className="about__kicker-line" />
              <span>04 / artifacts in motion</span>
            </p>
          </motion.div>

          <div className="about__cards">
            {interests.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  className="about__card"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport}
                  transition={{ duration: 0.7, delay: i * 0.1, ease }}
                >
                  <span className="about__card-index" aria-hidden="true">
                    {item.index}
                  </span>
                  <div className="about__card-icon">
                    <Icon size={24} />
                  </div>
                  <h3 className="about__card-title">{item.title}</h3>
                  <p className="about__card-text">{item.text}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section className="about__tools">
          <motion.div
            className="about__tools-head"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7, ease }}
          >
            <h2 className="about__subtitle">How I think</h2>
            <span className="about__tools-line" aria-hidden="true" />
          </motion.div>
          <motion.p
            className="about__tools-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7, delay: 0.1, ease }}
          >
            Figma, Next.js, React, TypeScript, Tailwind CSS, Three.js, Lenis, Motion for React, Storybook, and a growing list of experimental
            frameworks. I also keep a sketchbook nearby for ideas that don&apos;t
            fit on a screen yet.
          </motion.p>
        </section>
      </div>
    </div>
  );
}
