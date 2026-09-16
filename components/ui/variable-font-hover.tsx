"use client";
import { useEffect, useState } from "react";
import type { CSSProperties, ElementType } from "react";
import { motion, useReducedMotion } from "motion/react";
type Props = {
  text: string;
  className?: string;
  as?: ElementType;
};
const MIN = 400, MAX = 900, STEP = 125, LIFT = -4;
const EASE = [0.16, 1, 0.3, 1] as const;
function wght(i: number, at: number | null): number {
  if (at === null) return MIN;
  const d = Math.abs(i - at);
  return Math.max(MIN, MAX - d * STEP);
}
export function VariableFontHover({ text, className, as: T }: Props) {
  const Tag = (T ?? "span") as ElementType;
  const reduce = useReducedMotion();
  const [at, setAt] = useState<number | null>(null);
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const q = window.matchMedia("(pointer: fine)");
    const sync = () => setFine(q.matches);
    sync();
    q.addEventListener("change", sync);
    return () => q.removeEventListener("change", sync);
  }, []);
  if (reduce) {
    return <Tag className={className}>{text}</Tag>;
  }
  const chars = Array.from(text);
  return (
    <Tag
      className={className}
      onMouseLeave={() => setAt(null)}
      style={{ display: "inline-block" }}
    >
      {chars.map((c, i) =>
        c === " " ? (
          <span
            key={"s-" + i}
            style={{ display: "inline-block", width: "0.28em" }}
          >
            {"\u00A0"}
          </span>
        ) : (
          <motion.span
            key={"c-" + i}
            className="vfh-l"
            tabIndex={0}
            onMouseEnter={() => {
              if (fine) setAt(i);
            }}
            onFocus={() => setAt(i)}
            onBlur={() => setAt(null)}
            initial={false}
            animate={{ y: at === i ? LIFT : 0 }}
            transition={{ duration: 0.2, ease: EASE }}
            style={
              {
                display: "inline-block",
                color: "inherit",
                willChange: "transform",
                fontVariationSettings: "\"wght\" " + wght(i, at),
                transition: "font-variation-settings 200ms ease",
              } as CSSProperties
            }
          >
            {c}
          </motion.span>
        )
      )}
    </Tag>
  );
}
export default VariableFontHover;
