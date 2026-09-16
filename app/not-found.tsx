import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="content-max">
        <p className="eyebrow">404</p>
        <h1 className="not-found__title display">
          That raga is not in the setlist.
        </h1>
        <p className="not-found__copy">
          This page missed its cue. Head back home, or browse the work and
          the story behind it.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Link href="/" className="btn btn--accent">
            Return home
          </Link>
          <Link href="/work" className="btn btn-outline">
            Work
          </Link>
          <Link href="/about" className="btn btn-outline">
            About
          </Link>
        </div>
      </div>
    </div>
  );
}
