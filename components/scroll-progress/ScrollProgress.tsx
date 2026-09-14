"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useScroll, useTransform } from "motion/react";

export function ScrollProgress() {
  const [ready] = useState(() => typeof window !== "undefined");
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  if (!ready) return null;

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX }}
      initial={{ scaleX: 0 }}
    />
  );
}
