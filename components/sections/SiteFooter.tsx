"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";

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

          <div className="site-footer__links">
            <Link href="/work" className="link-external site-footer__nav-link">
              Work <ArrowUpRight size={14} />
            </Link>
            <Link href="/about" className="link-external site-footer__nav-link">
              About <ArrowUpRight size={14} />
            </Link>
            <Link href="/contact" className="link-external site-footer__nav-link">
              Contact <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        <p className="site-footer__tech" aria-label="Site version 2.0">
          v2.0
        </p>

        <div className="site-footer__meta">
          <span>&copy; {year} Shivam Shelatkar</span>
          <span>Founder at Swarvibhaa, tabla, piano, Unity</span>
          <a className="link-external" href="https://www.imdb.com/name/nm17605062/">IMDb nm17605062</a>
        </div>
      </div>
    </footer>
  );
}
