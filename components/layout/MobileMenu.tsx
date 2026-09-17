"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { useMobileMenu } from "./MobileMenuProvider";

const links = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function MobileMenu() {
  const { open, close, triggerRef } = useMobileMenu();
  const menuRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previousActiveElement.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const focusableElements = menuRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements?.[0];
    const lastElement = focusableElements?.[focusableElements.length - 1];

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };

    menuRef.current?.addEventListener("keydown", handleTab);
    firstElement?.focus();

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      menuRef.current?.removeEventListener("keydown", handleTab);
      previousActiveElement.current?.focus();
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={menuRef}
        id="mobile-menu"
        className="mobile-menu"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="mobile-menu__top">
          <span className="mobile-menu__label">MENU / 03</span>
          <button
            className="site-header__menu"
            onClick={close}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="mobile-menu__nav" aria-label="Mobile primary">
          {links.map((link, index) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link
                href={link.href}
                className="mobile-menu__link"
                onClick={close}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="mobile-menu__bottom">
          <a
            href="mailto:shelatkarshivam4@gmail.com"
            className="mobile-menu__contact"
          >
            shelatkarshivam4@gmail.com
          </a>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
