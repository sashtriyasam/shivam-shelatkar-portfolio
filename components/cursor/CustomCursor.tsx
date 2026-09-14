"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 500, damping: 28 });
  const ry = useSpring(y, { stiffness: 500, damping: 28 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const move = (e: MouseEvent) => {
      setVisible(true);
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const enter = () => setVisible(true);
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseenter", enter);
    window.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseenter", enter);
      window.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  return (
    <>
      <motion.div
        className="custom-cursor"
        style={{ x: rx, y: ry, opacity: visible ? 1 : 0 }}
        initial={false}
      >
        <div />
        <div className="custom-cursor__ring" />
      </motion.div>
      <motion.div
        className="custom-cursor"
        style={{ x: rx, y: ry, opacity: visible ? 1 : 0 }}
        initial={false}
      >
        <div className="custom-cursor__label">cursor</div>
      </motion.div>
    </>
  );
}
