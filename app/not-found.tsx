import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="content-max">
        <p className="eyebrow">404</p>
        <h1 className="not-found__title display">Page not found.</h1>
        <p className="not-found__copy">
          The page you&apos;re looking for doesn&apos;t exist or has
          moved. Let&apos;s get you back on track.
        </p>
        <Link href="/" className="btn btn--accent">
          Return home
        </Link>
      </div>
    </div>
  );
}
