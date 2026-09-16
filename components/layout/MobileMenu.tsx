"use client";

import { useEffect } from "react";
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
  const { open, close } = useMobileMenu();

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
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
      )}
    </AnimatePresence>
  );
}
