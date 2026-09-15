"use client";

import { motion } from "motion/react";
import { Mail, Activity } from "lucide-react";

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
            Let&apos;s build something.
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
              Whether you have a brief, a prototype, or just an idea, I&apos;d
              love to hear about it. I usually reply within two business days.
            </p>

<div className="contact__links" style={{ marginTop: "2rem" }}>
               <a href="mailto:hello@shivam.runs-on.dev" className="contact__link">
                 <span className="contact__link-icon">
                   <Mail size={18} />
                 </span>
                 <span className="contact__link-text">
                   <strong>Email</strong>
                   <span>hello@shivam.runs-on.dev</span>
                 </span>
               </a>
               {/* Phone and location removed for privacy - use email for contact */}
             </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="contact__link" style={{ marginBottom: "1rem" }}>
              <span className="contact__link-icon">
                <Activity size={18} />
              </span>
              <span className="contact__link-text">
                <strong>Currently</strong>
                <span>Open to new collaborations</span>
              </span>
            </div>

            <div className="contact__signal">
              <span className="contact__signal-dot" />
              <span>Available for freelance and full-time roles</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
