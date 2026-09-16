"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatedFooter } from "@/components/ui/animated-footer";

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

export function SiteFooter() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  if (pathname === "/") return null;

  return (
    <footer className="site-footer">
      <div className="content-max">
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

        <p className="site-footer__tech" aria-label="Site version 2.0">
          v2.0
        </p>

        <AnimatedFooter
          leftLinks={LEFT_LINKS}
          rightLinks={RIGHT_LINKS}
          copyrightText={`© ${year} Shivam Shelatkar · Thane·Mumbai — Founder @Swarvibhaa`}
          barCount={23}
        />
      </div>
    </footer>
  );
}
