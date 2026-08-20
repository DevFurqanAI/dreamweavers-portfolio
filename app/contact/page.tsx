import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { site } from '@/content/site';
import { Reveal } from '@/components/ui/Reveal';
import { PageHero } from '@/components/sections/PageHero';

export const metadata: Metadata = pageMetadata({
  title: 'Contact Us',
  description:
    'Talk to Dream Weavers — WhatsApp +92 313 6784511, email info@dreamweaversoffice.com, or visit either Multan office.',
  path: '/contact',
});

/**
 * NO FORM, deliberately.
 *
 * This build has no server (static export) and no form backend. A form that
 * validates and then silently discards the submission is worse than no form,
 * so the page offers channels that actually work: WhatsApp, email, phone.
 */
export default function ContactPage() {
  const telHref = `tel:${site.contact.phone.replace(/\s/g, '')}`;

  return (
    <>
      <PageHero
        kicker="Get in touch"
        title={
          <>
            Let&rsquo;s <span>talk</span>
          </>
        }
        lead="Tell us what you are building and we will tell you honestly whether we are the right team for it."
      />

      <section className="section-dark section-contact-channels">
        <div className="container">
          <div className="contact-channels">
            <a
              className="contact-channel contact-channel--primary"
              href={`https://wa.me/${site.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-whatsapp" aria-hidden="true" />
              <span className="contact-channel-label">WhatsApp</span>
              <strong className="contact-channel-value">{site.contact.phone}</strong>
              <span className="contact-channel-note">Usually the fastest route</span>
            </a>

            <a className="contact-channel" href={`mailto:${site.contact.email}`}>
              <i className="fa-solid fa-envelope" aria-hidden="true" />
              <span className="contact-channel-label">Email</span>
              <strong className="contact-channel-value">{site.contact.email}</strong>
              <span className="contact-channel-note">
                Best for briefs and documents
              </span>
            </a>

            <a className="contact-channel" href={telHref}>
              <i className="fa-solid fa-phone" aria-hidden="true" />
              <span className="contact-channel-label">Phone</span>
              <strong className="contact-channel-value">{site.contact.phone}</strong>
              <span className="contact-channel-note">Pakistan Standard Time</span>
            </a>
          </div>
        </div>
      </section>

      <section className="section-offices section-margin">
        <div className="container">
          <Reveal as="h2" className="h2" duration={2} delay={0.3}>
            Our <span>offices</span>
          </Reveal>
          <div className="office-grid">
            {site.contact.addresses.map((address) => (
              <address className="office-card" key={address.label}>
                <h3 className="h5">{address.label}</h3>
                <p>{address.value}</p>
              </address>
            ))}
          </div>

          <h2 className="h5 contact-social-heading">Find us elsewhere</h2>
          <nav aria-label="Social media">
            <ul className="contact-social">
              {site.social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    <i className={s.icon} aria-hidden="true" /> {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </>
  );
}
