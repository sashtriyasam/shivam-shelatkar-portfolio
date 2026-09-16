"use client";

import { motion } from "motion/react";
import { Mail, Users, ArrowUpRight } from "lucide-react";

const availability = [
  "Swarvibhaa commissions across Mumbai, Delhi and Gujarat",
  "Film, theatre and indie scores and arrangements",
  "Unity and interactive builds for stage and screen",
  "NSFF-type live tech, cues, sound and projection",
];

const socials = [
  { label: "Swarvibhaa founders team", href: "https://swarvibhaa.odoo.com/" },
  { label: "IMDb nm17605062", href: "https://www.imdb.com/name/nm17605062/" },
  { label: "LinkedIn, Shivam Shelatkar", href: "https://linkedin.com/in/shivam-shelatkar-503305358" },
  { label: "GitHub, sashtriyasam", href: "https://github.com/sashtriyasam" },
  { label: "JioSaavn, Shivam Shelatkar", href: "https://www.jiosaavn.com/search/artist/shivam+shelatkar" },
  { label: "Spotify, Shivam Shelatkar", href: "https://open.spotify.com/search/Shivam%20Shelatkar" },
];

export default function ContactPage() {
  return (
    <div className="contact">
      <div className="content-max">
        <header className="contact__header">
          <p className="eyebrow">Contact</p>
          <motion.h1
            className="contact__title display"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            Write to me, I reply myself.
          </motion.h1>
        </header>

        <div className="contact__grid">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <p className="contact__copy">
              Based in Thane, Mumbai. For scores, builds and live tech, email
              is the fastest way to reach me.
            </p>

            <div className="contact__links" style={{ marginTop: "2rem" }}>
              <a href="mailto:shelatkarshivam4@gmail.com" className="contact__link">
                <span className="contact__link-icon">
                  <Mail size={18} />
                </span>
                <span className="contact__link-text">
                  <strong>Email me</strong>
                  <span>shelatkarshivam4@gmail.com</span>
                </span>
              </a>
              <a href="mailto:swarvibhaa@gmail.com" className="contact__link">
                <span className="contact__link-icon">
                  <Users size={18} />
                </span>
                <span className="contact__link-text">
                  <strong>Swarvibhaa collective</strong>
                  <span>swarvibhaa@gmail.com</span>
                </span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h2 className="about__subtitle">Currently taking on</h2>
            <ul className="about__list" style={{ marginBottom: "2rem" }}>
              {availability.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>

            <h2 className="about__subtitle">Elsewhere</h2>
            <div className="contact__links">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__link"
                >
                  <span className="contact__link-text">
                    <strong>{s.label}</strong>
                  </span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              ))}
            </div>

            <div className="contact__signal" style={{ marginTop: "2rem" }}>
              <span className="contact__signal-dot" />
              <span>Based in Thane, Mumbai. Working across Mumbai, Delhi and Gujarat.</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
