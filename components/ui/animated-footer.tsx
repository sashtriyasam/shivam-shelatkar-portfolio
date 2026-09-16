"use client";

import { useEffect, useRef, useState } from "react";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterProps {
  leftLinks: FooterLink[];
  rightLinks: FooterLink[];
  copyrightText: string;
  barCount?: number;
}

export function AnimatedFooter({ leftLinks, rightLinks, copyrightText, barCount = 23 }: FooterProps) {
  const footerRef = useRef<HTMLDivElement>(null);
  const waveRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = footerRef.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setIsVisible(entry.isIntersecting);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    waveRefs.current.length = barCount;
    if (!isVisible) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      waveRefs.current.forEach((segment, index) => {
        if (!segment) return;
        const offset = Math.sin(elapsed * 2 + index * 0.45) * 8;
        segment.style.transform = `translateY(${offset.toFixed(2)}px)`;
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isVisible, barCount]);

  const scrollToTop = () => {
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  };

  const renderLinks = (links: FooterLink[]) =>
    links.map((link) => {
      const external = link.href.startsWith("http");
      return (
        <a
          key={link.href}
          href={link.href}
          className="animated-footer__link"
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          style={{
            color: "inherit",
            textDecoration: "none",
            fontSize: 14,
            fontWeight: 600,
            padding: "6px 0",
          }}
        >
          {link.label}
        </a>
      );
    });

  return (
    <div
      ref={footerRef}
      className="animated-footer"
      style={{
        backgroundColor: "var(--color-bg, #060709)",
        color: "var(--color-text-primary, #FFF8EF)",
        borderRadius: 24,
        padding: "28px 24px 24px",
        marginTop: 32,
      }}
    >
      <style>{`
        .wave-segment { display: block; will-change: transform; }
        .animated-footer__link:hover, .animated-footer__link:focus-visible { color: #E4572E; }
        .animated-footer__link:focus-visible, .animated-footer__to-top:focus-visible { outline: 2px solid #E4572E; outline-offset: 3px; border-radius: 4px; }
        .animated-footer__to-top:hover { color: #E4572E; border-color: #E4572E; }
        @media (max-width: 640px) {
          .animated-footer__row { flex-direction: column; align-items: flex-start; }
        }
        @media (prefers-reduced-motion: reduce) {
          .wave-segment { transform: none !important; }
        }
      `}</style>
      <div
        className="animated-footer__wave"
        aria-hidden="true"
        style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 72, marginBottom: 24 }}
      >
        {Array.from({ length: barCount }).map((_, index) => (
          <div
            key={index}
            ref={(element) => {
              waveRefs.current[index] = element;
            }}
            className="wave-segment"
            style={{
              flex: "1 1 0%",
              height: 24 + Math.round(20 * Math.abs(Math.sin(index * 0.55))),
              backgroundColor: "rgba(255, 248, 239, 0.14)",
              borderRadius: 999,
              transform: "translateY(0px)",
            }}
          />
        ))}
      </div>
      <div
        className="animated-footer__row"
        style={{ display: "flex", flexWrap: "wrap", gap: "16px 32px", justifyContent: "space-between" }}
      >
        <nav aria-label="Footer" className="animated-footer__links" style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px", alignItems: "center" }}>
          {renderLinks(leftLinks)}
        </nav>
        <nav aria-label="Social" className="animated-footer__links" style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px", alignItems: "center" }}>
          {renderLinks(rightLinks)}
        </nav>
      </div>
      <div
        className="animated-footer__meta"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(255, 248, 239, 0.14)",
          marginTop: 20,
          paddingTop: 16,
        }}
      >
        <p className="animated-footer__copy" style={{ margin: 0, fontSize: 13, color: "rgba(255, 248, 239, 0.62)" }}>
          {copyrightText}
        </p>
        <button
          type="button"
          className="animated-footer__to-top"
          onClick={scrollToTop}
          style={{
            background: "transparent",
            border: "1px solid rgba(255, 248, 239, 0.28)",
            color: "var(--color-text-primary, #FFF8EF)",
            borderRadius: 999,
            padding: "10px 18px",
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Back to top <span aria-hidden="true">&#8593;</span>
        </button>
      </div>
    </div>
  );
}

export default AnimatedFooter;