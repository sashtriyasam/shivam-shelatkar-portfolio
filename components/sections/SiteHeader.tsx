"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMobileMenu } from "@/components/layout/MobileMenuProvider";
import { Menu } from "lucide-react";

const navLinks = [
  { href: "/#work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const { openMenu } = useMobileMenu();
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="content-max site-header__inner">
        <Link href="/" className="logo">
          <span className="logo__mark">SS</span>
          <span className="logo__name">Shivam Shelatkar</span>
        </Link>

        <nav className="site-header__nav" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="link-underline"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/work" className="btn btn--accent">
            Start a project
          </Link>
        </nav>

        <button
          className="site-header__menu"
          onClick={openMenu}
          aria-label="Open menu"
          aria-expanded={pathname !== "/"}
        >
          <Menu size={18} />
        </button>
      </div>
    </header>
  );
}
