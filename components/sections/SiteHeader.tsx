"use client";

import Link from "next/link";
import { useMobileMenu } from "@/components/layout/MobileMenuProvider";
import { Menu } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "motion/react";

const navLinks = [
  { href: "/#work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const { openMenu, open } = useMobileMenu();
  const { scrollYProgress } = useScroll();
  const headerBgOpacity = useTransform(
    scrollYProgress,
    [0, 1],
    [0.78, 0.98]
  );
  const headerBackground = useMotionTemplate`rgba(255, 255, 255, ${headerBgOpacity})`;

  return (
    <motion.header
      className="site-header"
      style={{
        background: headerBackground,
      }}
    >
      <div className="content-max site-header__inner">
        <Link href="/" className="logo">
          <span className="logo__mark">SS</span>
          <span
            className="logo__name"
            style={{ letterSpacing: "0.14em" }}
          >
            Shivam Shelatkar
          </span>
        </Link>

        <nav className="site-header__nav" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="link-underline"
              style={{ letterSpacing: "-0.02em" }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/work"
            className="btn btn--accent site-header__cta"
          >
            Start a project
          </Link>
        </nav>

        <button
          className="site-header__menu"
          style={{ minHeight: 44, minWidth: 44 }}
          onClick={openMenu}
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <Menu size={18} />
        </button>
      </div>
    </motion.header>
  );
}
