import Image from 'next/image';
import { AppLink as Link } from '@/components/ui/AppLink';
import { site } from '@/content/site';
import { services } from '@/content/services';
import { Reveal } from '@/components/ui/Reveal';
import { BackToTop } from './BackToTop';

const GLOBAL_LINKS = [
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Our Services' },
  { href: '/portfolio', label: 'Our Portfolio' },
  { href: '/team', label: 'Our Team' },
  { href: '/contact', label: 'Contact Us' },
];

export function Footer() {
  return (
    <footer className="main-footer">
      <div className="container">
        <div className="row justify-content-end">
          <div className="col-md-9">
            <div className="lets-create">
              <Reveal as="h2" animation="fadeInLeft" duration={2} delay={0.5} className="lets-create-heading">
                let&rsquo;s create
                <Link href="/contact" aria-label="Contact Dream Weavers">
                  <svg width="78" height="78" viewBox="0 0 78 78" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M39 2C18.5655 1.99999 2.00001 18.5655 2 39C2 59.4345 18.5655 76 39 76C59.4345 76 76 59.4345 76 39C76 18.5655 59.4345 2 39 2Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M26.6663 51.3332L51.333 26.6666" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M26.6663 26.6666L51.333 26.6666L51.333 51.3333" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>

        <div className="row justify-content-start main-footer-columns">
          <div className="col-lg-4 col-md-12 col-sm-12 main-footer-brand">
            <Link href="/" className="footer-logo">
              <Image src="/img/logo.webp" alt="Dream Weavers" width={420} height={320} loading="lazy" />
            </Link>
            <p className="p">
              Dream Weavers empowers brands, startups, and enterprises with smart
              technology, seamless platforms, and scalable systems for long-term
              success. Two specialised teams &mdash; eCommerce and Software &mdash;
              working together from Multan, Pakistan.
            </p>
          </div>

          <div className="col-lg-2 col-md-4 col-sm-6 col-6">
            <h2 className="h6"><span><strong>Global</strong></span></h2>
            <nav className="nav-footer" aria-label="Site">
              <ul className="footer-global-menu">
                {GLOBAL_LINKS.map((l) => (
                  <li className="menu-item" key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="col-lg-3 col-md-4 col-sm-6 col-6">
            <h2 className="h6"><span><strong>Services</strong></span></h2>
            <nav className="nav-footer" aria-label="Services">
              <ul className="footer-services-menu">
                <li className="menu-item">
                  <Link href="/services">All Services</Link>
                </li>
                {services.slice(0, 6).map((s) => (
                  <li className="menu-item" key={s.slug}>
                    <Link href={`/services/${s.slug}`}>{s.title}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="col-lg-3 col-md-4 col-sm-6 col-6">
            <h2 className="h6"><span><strong>Contact</strong></span></h2>
            <nav className="nav-footer" aria-label="Contact">
              <ul>
                <li className="menu-item">
                  <a href={`tel:${site.contact.phone.replace(/\s/g, '')}`}>{site.contact.phone}</a>
                </li>
                <li className="menu-item">
                  <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
                </li>
                {site.contact.addresses.map((a) => (
                  <li className="menu-item" key={a.label}>
                    <span>{a.value}</span>
                  </li>
                ))}
              </ul>
            </nav>

            <nav className="footer-social" aria-label="Social media">
              <ul>
                {site.social.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                      <i className={s.icon} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <section className="copyright">
          <div className="row">
            <div className="col-md-6 col-7">
              &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
            </div>
            <div className="col-md-6 copyright-side-right col-5">
              <BackToTop />
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}
