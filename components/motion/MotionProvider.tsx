"use client";

import { ReactNode, useEffect, useState } from "react";
import { MotionConfig } from "motion/react";
import { initLenis } from "@/lib/lenis";

export function MotionProvider({ children }: { children: ReactNode }) {
  const [mounted] = useState(() => typeof window !== "undefined");

  useEffect(() => {
    initLenis();
  }, []);

  return (
    <MotionConfig reducedMotion={!mounted ? "always" : "never"}>
      {children}
    </MotionConfig>
  );
}
