"use client";

import Link from "next/link";
import { useMobileMenu } from "@/components/layout/MobileMenuProvider";
import { Menu, Volume2, VolumeX } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { sound } from "@/lib/audio";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/cv", label: "CV" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { openMenu, open, triggerRef } = useMobileMenu();
  const [audioActive, setAudioActive] = useState(sound.enabled);

  const toggleSound = () => {
    const newState = sound.toggle();
    setAudioActive(newState);
  };

  return (
    <header className="site-header">
      <div className="content-max site-header__inner">
        <Link
          href="/"
          className="logo"
          onMouseEnter={() => sound.playHover()}
          onClick={() => sound.playClick()}
        >
          <span className="logo__mark">SS</span>
          <span className="logo__name" style={{ letterSpacing: "0.14em" }}>
            Shivam Shelatkar
          </span>
        </Link>

        <nav className="site-header__nav" aria-label="Primary">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className="link-underline"
                style={{
                  letterSpacing: "-0.01em",
                  color: isActive ? "var(--color-accent-primary)" : undefined,
                  fontWeight: isActive ? 600 : 500,
                }}
                onMouseEnter={() => sound.playHover()}
                onClick={() => sound.playClick()}
              >
                {link.label}
              </Link>
            );
          })}

          <button
            type="button"
            onClick={toggleSound}
            onMouseEnter={() => sound.playHover()}
            title={audioActive ? "Tactile Audio: Enabled" : "Tactile Audio: Disabled"}
            aria-label={audioActive ? "Disable tactile audio" : "Enable tactile audio"}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: audioActive ? "rgba(0, 245, 155, 0.12)" : "rgba(255, 255, 255, 0.05)",
              color: audioActive ? "#00f59b" : "rgba(255, 255, 255, 0.6)",
              border: `1px solid ${audioActive ? "rgba(0, 245, 155, 0.3)" : "rgba(255, 255, 255, 0.1)"}`,
              borderRadius: 999,
              padding: "6px 12px",
              fontSize: 11,
              fontFamily: "var(--font-mono)",
              cursor: "pointer",
              transition: "all 200ms ease",
            }}
          >
            {audioActive ? <Volume2 size={13} /> : <VolumeX size={13} />}
            <span>AUDIO: {audioActive ? "ON" : "OFF"}</span>
          </button>

          <Link
            href="/contact"
            className="btn btn--accent site-header__cta"
            onMouseEnter={() => sound.playHover()}
            onClick={() => sound.playClick()}
          >
            Start a project
          </Link>
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            type="button"
            onClick={toggleSound}
            aria-label="Toggle audio"
            className="md:hidden"
            style={{
              background: "transparent",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius)",
              width: 44,
              height: 44,
              display: "grid",
              placeItems: "center",
              color: audioActive ? "#00f59b" : "var(--color-text-secondary)",
              cursor: "pointer",
            }}
          >
            {audioActive ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          <button
            ref={triggerRef}
            className="site-header__menu"
            style={{ minHeight: 44, minWidth: 44 }}
            onClick={openMenu}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
