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
            <Link href="/work" className="link-external">
              Work <ArrowUpRight size={14} />
            </Link>
            <Link href="/about" className="link-external">
              About <ArrowUpRight size={14} />
            </Link>
            <Link href="/contact" className="link-external">
              Contact <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        <div className="site-footer__meta">
          <span>© {year} Shivam Shelatkar</span>
          <span>Product designer & frontend engineer</span>
        </div>
      </div>
    </footer>
  );
}
