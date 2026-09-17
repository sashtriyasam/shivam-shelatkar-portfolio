"use client";

import { createContext, useContext, useState, ReactNode, useRef, RefObject } from "react";

interface MobileMenuContextValue {
  open: boolean;
  openMenu: () => void;
  close: () => void;
  toggle: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
}

const MobileMenuContext = createContext<MobileMenuContextValue | null>(null);

export function useMobileMenu() {
  const ctx = useContext(MobileMenuContext);
  if (!ctx) throw new Error("useMobileMenu must be used inside MobileMenuProvider");
  return ctx;
}

export function MobileMenuProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <MobileMenuContext.Provider
      value={{
        open,
        openMenu: () => setOpen(true),
        close: () => setOpen(false),
        toggle: () => setOpen((v) => !v),
        triggerRef,
      }}
    >
      {children}
    </MobileMenuContext.Provider>
  );
}
