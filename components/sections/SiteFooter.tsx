import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="content-max">
        <div className="split">
          <div>
            <p className="eyebrow">Ready to build?</p>
            <Link
              href="/contact"
              className="site-footer__title link-underline"
            >
              Let&apos;s work together.
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

        <p className="site-footer__tech">
          EST. 2026 &middot; SAN FRANCISCO, CA &middot; v2.0
        </p>

        <div className="site-footer__meta">
          <span>&copy; {year} Shivam Shelatkar</span>
          <span>Product designer &amp; frontend engineer</span>
        </div>
      </div>
    </footer>
  );
}
