"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatedFooter } from "@/components/ui/animated-footer";
import { ReactNode } from "react";

const LEFT_LINKS = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const RIGHT_LINKS = [
  { label: "LinkedIn", href: "https://linkedin.com/in/shivam-shelatkar-503305358" },
  { label: "GitHub", href: "https://github.com/sashtriyasam" },
  { label: "Instagram", href: "https://www.instagram.com/shastriyakid" },
  { label: "IMDb", href: "https://www.imdb.com/name/nm17605062/" },
  { label: "Swarvibhaa", href: "https://swarvibhaa.odoo.com/" },
];

const HOME_LEFT_LINKS = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const HOME_RIGHT_LINKS = [
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
              <div className="split">
                <div>
                  <p className="eyebrow">Ready to build?</p>
                  <Link
                    href="mailto:shelatkarshivam4@gmail.com"
                    className="site-footer__title link-underline"
                  >
                    shelatkarshivam4@gmail.com
                  </Link>
                </div>
              </div>
            )}

            <p className="site-footer__tech" aria-label={`Site version 2.0`}>
              v2.0
            </p>

            <AnimatedFooter
              leftLinks={isHome ? HOME_LEFT_LINKS : LEFT_LINKS}
              rightLinks={isHome ? HOME_RIGHT_LINKS : RIGHT_LINKS}
              copyrightText={`� ${year} Shivam Shelatkar � Thane�Mumbai � Founder @Swarvibhaa`}
              barCount={23}
            />
          </>
        )}
      </div>
    </footer>
  );
}
