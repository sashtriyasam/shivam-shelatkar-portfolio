"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatedFooter } from "@/components/ui/animated-footer";
import { ReactNode } from "react";

const FOOTER_LINKS_LEFT = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "CV", href: "/cv" },
  { label: "Contact", href: "/contact" },
];

const FOOTER_LINKS_RIGHT = [
  { label: "LinkedIn", href: "https://linkedin.com/in/shivam-shelatkar-503305358" },
  { label: "GitHub", href: "https://github.com/sashtriyasam" },
  { label: "Instagram", href: "https://www.instagram.com/shastriyakid" },
  { label: "IMDb", href: "https://www.imdb.com/name/nm17605062/" },
  { label: "Swarvibhaa", href: "https://swarvibhaa.odoo.com/" },
];

interface SiteFooterProps {
  children?: ReactNode;
}

export function SiteFooter({ children }: SiteFooterProps) {
  const pathname = usePathname();
  const year = new Date().getFullYear();
  const isHome = pathname === "/";

  return (
    <footer className="site-footer">
      <div className="content-max">
        {children ? (
          children
        ) : (
          <>
            {!isHome && (
              <div className="split" style={{ marginBottom: 32 }}>
                <div>
                  <p className="eyebrow">Ready to build or score?</p>
                  <Link
                    href="mailto:shelatkarshivam4@gmail.com"
                    className="site-footer__title link-underline"
                  >
                    shelatkarshivam4@gmail.com
                  </Link>
                </div>
              </div>
            )}

            <p className="site-footer__tech" aria-label="Portfolio Edition 2026">
              PORTFOLIO / 2026
            </p>

            <AnimatedFooter
              leftLinks={FOOTER_LINKS_LEFT}
              rightLinks={FOOTER_LINKS_RIGHT}
              copyrightText={`\u00A9 ${year} Shivam Shelatkar \u00B7 Thane \u2014 Mumbai \u00B7 Founder @Swarvibhaa`}
              barCount={23}
            />
          </>
        )}
      </div>
    </footer>
  );
}
