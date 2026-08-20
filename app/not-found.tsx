import { AppLink as Link } from '@/components/ui/AppLink';

export default function NotFound() {
  return (
    <section className="page-hero section-margin">
      <div className="container">
        <h1 className="h1">
          Page <span>not found</span>
        </h1>
        <p className="max-para">
          That page does not exist, or it has moved. Everything below is a good
          place to pick the thread back up.
        </p>
        <ul className="industries-list">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/services">Our Services</Link>
          </li>
          <li>
            <Link href="/portfolio">Our Portfolio</Link>
          </li>
          <li>
            <Link href="/team">Our Team</Link>
          </li>
          <li>
            <Link href="/contact">Contact Us</Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
