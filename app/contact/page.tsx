"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Users, ArrowUpRight, Check, Send, Sparkles } from "lucide-react";
import { sound } from "@/lib/audio";

const INTEREST_OPTIONS = [
  "Software & Real-Time Systems",
  "Web / Mobile Application",
  "Music / Composition & Production",
  "Film / Theatre Score & Arrangement",
  "Festival & Stage Live Technology",
  "Swarvibhaa Collaboration",
  "Other Creative Technical Challenge",
];

const AVAILABILITY = [
  "Software systems & full-stack development (Next.js, Expo, Express, Python)",
  "Film, theatre, and commercial music scores & orchestral arrangements",
  "Single-view computer vision / 3D geospatial visualization",
  "On-site live technical direction for festivals, stage cues & DCI projection",
  "Swarvibhaa collective commissions across Mumbai, Delhi and Gujarat",
];

const SOCIALS = [
  { label: "LinkedIn", detail: "shivam-shelatkar", href: "https://linkedin.com/in/shivam-shelatkar-503305358" },
  { label: "GitHub", detail: "sashtriyasam", href: "https://github.com/sashtriyasam" },
  { label: "Instagram", detail: "@shastriyakid", href: "https://www.instagram.com/shastriyakid" },
  { label: "IMDb", detail: "nm17605062", href: "https://www.imdb.com/name/nm17605062/" },
  { label: "Spotify Artist", detail: "Shivam Shelatkar", href: "https://open.spotify.com/search/Shivam%20Shelatkar" },
  { label: "JioSaavn Artist", detail: "Shivam Shelatkar", href: "https://www.jiosaavn.com/search/artist/shivam+shelatkar" },
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const toggleInterest = (opt: string) => {
    sound.playClick();
    setSelectedInterests((prev) =>
      prev.includes(opt) ? prev.filter((i) => i !== opt) : [...prev, opt]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    const subject = encodeURIComponent(`Project Enquiry: ${name || "Collaboration"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nInterests: ${selectedInterests.join(", ") || "General"}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:shelatkarshivam4@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div className="contact">
      <div className="content-max">
        <header className="contact__header">
          <span className="eyebrow">Direct Contact & Enquiries</span>
          <motion.h1
            className="contact__title display"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Start a project. Make something worth keeping.
          </motion.h1>
          <p className="contact__copy" style={{ maxWidth: "60ch", marginTop: 12 }}>
            Based in Thane, Mumbai. Whether you need production-grade software engineering, an original cinematic score, live stage technical direction, or Swarvibhaa partnerships — I read every enquiry personally.
          </p>
        </header>

        <div className="contact__grid" style={{ marginTop: 48 }}>
          
          {/* Interactive Enquiry Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              padding: "clamp(24px, 4vw, 36px)",
              borderRadius: 24,
              background: "rgba(12, 14, 20, 0.75)",
              border: "1px solid var(--color-border)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <Sparkles size={18} color="var(--color-accent-primary)" />
              <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: "var(--color-text-primary)" }}>
                Start a Project Enquiry
              </h2>
            </div>

            {submitted ? (
              <div
                style={{
                  padding: 28,
                  borderRadius: 16,
                  background: "rgba(0, 245, 155, 0.08)",
                  border: "1px solid rgba(0, 245, 155, 0.3)",
                  textAlign: "center",
                }}
              >
                <Check size={32} color="#00f59b" style={{ margin: "0 auto 12px" }} />
                <h3 style={{ margin: "0 0 8px", color: "#ffffff", fontSize: 18 }}>Thank you, {name || "friend"}!</h3>
                <p style={{ margin: 0, fontSize: 14, color: "var(--color-text-secondary)" }}>
                  Your email client has been launched with your enquiry. I normally reply within 24 to 48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                  <div>
                    <label
                      htmlFor="contact-name"
                      style={{
                        display: "block",
                        fontSize: 12,
                        fontFamily: "var(--font-mono)",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "var(--color-text-tertiary)",
                        marginBottom: 8,
                      }}
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Maya Patel"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: 12,
                        background: "rgba(255, 255, 255, 0.04)",
                        border: "1px solid var(--color-border)",
                        color: "#ffffff",
                        fontSize: 14,
                        outline: "none",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      style={{
                        display: "block",
                        fontSize: 12,
                        fontFamily: "var(--font-mono)",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "var(--color-text-tertiary)",
                        marginBottom: 8,
                      }}
                    >
                      Your Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. maya@domain.com"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: 12,
                        background: "rgba(255, 255, 255, 0.04)",
                        border: "1px solid var(--color-border)",
                        color: "#ffffff",
                        fontSize: 14,
                        outline: "none",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <span
                    style={{
                      display: "block",
                      fontSize: 12,
                      fontFamily: "var(--font-mono)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "var(--color-text-tertiary)",
                      marginBottom: 10,
                    }}
                  >
                    What are you looking for? (Select all that apply)
                  </span>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {INTEREST_OPTIONS.map((opt) => {
                      const selected = selectedInterests.includes(opt);
                      return (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => toggleInterest(opt)}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            padding: "8px 14px",
                            borderRadius: 999,
                            fontSize: 12,
                            fontFamily: "var(--font-mono)",
                            cursor: "pointer",
                            border: `1px solid ${selected ? "var(--color-accent-primary)" : "var(--color-border)"}`,
                            background: selected ? "rgba(255, 59, 48, 0.15)" : "rgba(255, 255, 255, 0.03)",
                            color: selected ? "#ffffff" : "var(--color-text-secondary)",
                            transition: "all 180ms ease",
                          }}
                        >
                          {selected && <Check size={12} color="var(--color-accent-primary)" />}
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    style={{
                      display: "block",
                      fontSize: 12,
                      fontFamily: "var(--font-mono)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "var(--color-text-tertiary)",
                      marginBottom: 8,
                    }}
                  >
                    Tell me about your project or idea
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Briefly describe the vision, scope, timeline, or key technical/musical requirements..."
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: 12,
                      background: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid var(--color-border)",
                      color: "#ffffff",
                      fontSize: 14,
                      lineHeight: 1.6,
                      outline: "none",
                      resize: "vertical",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn--accent"
                  style={{ alignSelf: "flex-start", display: "inline-flex", gap: 8, padding: "12px 28px" }}
                  onMouseEnter={() => sound.playHover()}
                >
                  <Send size={15} /> Send Project Enquiry
                </button>
              </form>
            )}
          </motion.div>

          {/* Direct channels and Current Availability */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ display: "flex", flexDirection: "column", gap: 32 }}
          >
            <div>
              <h2 className="about__subtitle" style={{ fontSize: 18, marginBottom: 16 }}>
                Direct Contact Channels
              </h2>
              <div className="contact__links">
                <a
                  href="mailto:shelatkarshivam4@gmail.com"
                  className="contact__link"
                  onMouseEnter={() => sound.playHover()}
                  onClick={() => sound.playClick()}
                >
                  <span className="contact__link-icon">
                    <Mail size={18} />
                  </span>
                  <span className="contact__link-text">
                    <strong>Primary Inbox</strong>
                    <span>shelatkarshivam4@gmail.com</span>
                  </span>
                </a>
                <a
                  href="mailto:swarvibhaa@gmail.com"
                  className="contact__link"
                  onMouseEnter={() => sound.playHover()}
                  onClick={() => sound.playClick()}
                >
                  <span className="contact__link-icon">
                    <Users size={18} />
                  </span>
                  <span className="contact__link-text">
                    <strong>Swarvibhaa Collective</strong>
                    <span>swarvibhaa@gmail.com</span>
                  </span>
                </a>
              </div>
            </div>

            <div>
              <h2 className="about__subtitle" style={{ fontSize: 18, marginBottom: 12 }}>
                Currently Open For
              </h2>
              <ul className="about__list" style={{ margin: 0, paddingLeft: 20 }}>
                {AVAILABILITY.map((a) => (
                  <li key={a} style={{ fontSize: 14, lineHeight: 1.7, color: "var(--color-text-secondary)" }}>
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="about__subtitle" style={{ fontSize: 18, marginBottom: 12 }}>
                Elsewhere Online
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                  gap: 10,
                }}
              >
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact__link"
                    onMouseEnter={() => sound.playHover()}
                    onClick={() => sound.playClick()}
                    style={{ padding: "12px 16px" }}
                  >
                    <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "var(--color-text-primary)" }}>
                        {s.label}
                      </span>
                      <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--color-text-tertiary)" }}>
                        {s.detail}
                      </span>
                    </div>
                    <ArrowUpRight size={14} color="var(--color-accent-primary)" />
                  </a>
                ))}
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </div>
  );
}
