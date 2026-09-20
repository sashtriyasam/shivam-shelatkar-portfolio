import Link from "next/link";

export function HeroFallback() {
  return (
    <section aria-labelledby="hero-fallback-heading" className="hero__fallback">
      <h1 id="hero-fallback-heading" className="sr-only">
        Shivam Shelatkar
      </h1>
      <div className="hero__fallback-content">
        <p>Founder @Swarvibhaa · tabla · piano · Unity</p>
        <div className="hero__fallback-ctas">
          <a
            href="https://swarvibhaa.odoo.com/blog/swarvibhaa-originals-4/raatrani-10"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Listen to Raatrani
          </a>
          <Link href="/work" className="btn btn-outline">
            See work
          </Link>
        </div>
      </div>
    </section>
  );
}
