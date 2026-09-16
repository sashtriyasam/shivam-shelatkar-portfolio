"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { MotionConfig } from "motion/react";
import { initLenis } from "@/lib/lenis";

export function MotionProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    initLenis();
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
