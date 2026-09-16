"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { usePathname } from "next/navigation";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], .project-card, .btn, input, textarea, select, [href], [data-cursor-label]';

function readLabel(el: Element | null): string {
  if (!el) return "VIEW";
  const attr = el.getAttribute("data-cursor-label");
  if (attr && attr.trim().length > 0) return attr.trim().toUpperCase();
  return "VIEW";
}

export function CustomCursor() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState("VIEW");
  const [isPill, setIsPill] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [finePointer, setFinePointer] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // Dot follow: 80-120ms lerp window (~90ms settle, near-critically damped).
  const rx = useSpring(x, { stiffness: 1200, damping: 45, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 1200, damping: 45, mass: 0.5 });

  // Tap 0.95 -> 1 settles in ~150ms.
  const scale = useSpring(1, { stiffness: 600, damping: 32, mass: 0.8 });
  const labelOpacity = useSpring(0, { stiffness: 400, damping: 30, mass: 1 });

  const lastTargetRef = useRef<Element | null>(null);
  const pillRef = useRef(false);
  const pressedRef = useRef(false);

  const setPill = (v: boolean) => {
    pillRef.current = v;
    setIsPill(v);
  };

  // pointer:fine only (touch hides via JS + CSS) + prefers-reduced-motion opt-out.
  // Native cursor is left untouched as fallback (no cursor:none anywhere).
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const fine = window.matchMedia("(pointer: fine)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setFinePointer(fine.matches);
      setReducedMotion(rm.matches);
    };
    sync();
    fine.addEventListener("change", sync);
    rm.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      rm.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!finePointer || reducedMotion) return;

    const resolveScale = () => {
      if (pressedRef.current) return 0.95;
      if (pillRef.current) return 2.2;
      if (lastTargetRef.current) return 1.6;
      return 1;
    };

    const move = (e: MouseEvent) => {
      setVisible(true);
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const target = e.target as unknown as Element | null;
      // Work cards expose data-cursor-label -> grow to pill with label.
      const labeled = target?.closest?.("[data-cursor-label]") as Element | null;
      if (labeled) {
        lastTargetRef.current = labeled;
        setLabel(readLabel(labeled));
        setPill(true);
        if (!pressedRef.current) scale.set(2.2);
        labelOpacity.set(1);
        return;
      }
      const interactive = target?.closest?.(INTERACTIVE_SELECTOR) as Element | null;
      if (interactive) {
        lastTargetRef.current = interactive;
        setPill(false);
        if (!pressedRef.current) scale.set(1.6);
        labelOpacity.set(0);
      } else if (lastTargetRef.current) {
        lastTargetRef.current = null;
        setPill(false);
        if (!pressedRef.current) scale.set(1);
        labelOpacity.set(0);
      }
    };

    const leave = () => {
      setVisible(false);
      lastTargetRef.current = null;
      setPill(false);
      if (!pressedRef.current) scale.set(1);
      labelOpacity.set(0);
    };

    const down = () => {
      pressedRef.current = true;
      setIsPressed(true);
      scale.set(0.95);
    };

    const up = () => {
      pressedRef.current = false;
      setIsPressed(false);
      scale.set(resolveScale());
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    window.addEventListener("mouseout", leave, { passive: true });
    window.addEventListener("mousedown", down, { passive: true });
    window.addEventListener("mouseup", up, { passive: true });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseout", leave);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [x, y, scale, labelOpacity, finePointer, reducedMotion]);

  if (pathname === "/") return null;
  if (!finePointer || reducedMotion) return null;

  return (
    <motion.div
      className={`custom-cursor${isPill ? " is-pill" : ""}${isPressed ? " is-pressed" : ""}`}
      data-active={isPill ? "true" : "false"}
      aria-hidden="true"
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
      <motion.span className="custom-cursor__label" style={{ opacity: labelOpacity }}>
        {label}
      </motion.span>
    </motion.div>
  );
}
