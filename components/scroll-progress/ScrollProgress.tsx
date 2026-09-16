"use client";

import { motion } from "motion/react";
import { useScroll, useTransform } from "motion/react";
import { usePathname } from "next/navigation";

export function ScrollProgress() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  if (pathname === "/") return null;

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX }}
      initial={{ scaleX: 0 }}
    />
  );
}
