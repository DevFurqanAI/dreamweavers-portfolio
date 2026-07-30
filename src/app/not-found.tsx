import Link from "next/link";

export default function NotFound() {
  return (
    <main className="legal-page">
      <p className="eyebrow"><span>404</span><i /></p>
      <h1>This thread ends here.</h1>
      <p>The page you requested does not exist.</p>
      <Link className="button button--solid" href="/">
        Return to the experience <i>↗</i>
      </Link>
    </main>
  );
}
