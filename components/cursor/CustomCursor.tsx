"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], .project-card, .btn, input, textarea, select, [href], [data-cursor-label]';

function readLabel(el: Element | null): string {
  if (!el) return "VIEW";
  const attr = el.getAttribute("data-cursor-label");
  if (attr && attr.trim().length > 0) return attr.trim().toUpperCase();
  return "VIEW";
}

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState("VIEW");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 500, damping: 28 });
  const ry = useSpring(y, { stiffness: 500, damping: 28 });

  const scale = useSpring(1, { stiffness: 500, damping: 30 });
  const labelOpacity = useSpring(0, { stiffness: 400, damping: 30 });

  const labelRef = useRef<HTMLSpanElement>(null);
  const lastTargetRef = useRef<Element | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const coarse = window.matchMedia("(pointer: coarse)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (coarse.matches || reduced.matches) return;

    const move = (e: MouseEvent) => {
      setVisible(true);
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const interactive =
        target?.closest(INTERACTIVE_SELECTOR) as Element | null;
      if (interactive) {
        lastTargetRef.current = interactive;
        setLabel(readLabel(interactive));
        scale.set(1.6);
        labelOpacity.set(1);
      } else if (lastTargetRef.current) {
        lastTargetRef.current = null;
        scale.set(1);
        labelOpacity.set(0);
      }
    };

    const leave = () => {
      setVisible(false);
      lastTargetRef.current = null;
      scale.set(1);
      labelOpacity.set(0);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", leave);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseout", leave);
    };
  }, [x, y, scale, labelOpacity]);

  return (
    <motion.div
      className="custom-cursor"
      style={{
        x: rx,
        y: ry,
        scale,
        opacity: visible ? 1 : 0,
      }}
      initial={false}
    >
      <div className="custom-cursor__dot" />
      <div className="custom-cursor__ring" />
      <motion.span
        ref={labelRef}
        className="custom-cursor__label"
        style={{ opacity: labelOpacity }}
      >
        {label}
      </motion.span>
    </motion.div>
  );
}

