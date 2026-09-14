"use client";

import { ReactNode } from "react";
import { CustomCursor } from "./CustomCursor";

export function CursorProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <CustomCursor />
    </>
  );
}
