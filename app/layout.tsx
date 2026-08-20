import type { Metadata } from 'next';
import { site } from '@/content/site';
import {
  absoluteUrl,
  canonicalPath,
  IS_CANONICAL_HOST,
  jsonLd,
  ORGANIZATION_ID,
  SITE_URL,
  SOCIAL_IMAGE,
} from '@/lib/seo';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

// Load order matters: tokens must resolve before theme.css, which reads
// every colour and font through them.
//   fonts -> tokens -> icons -> theme -> enhancements
import '../styles/fonts.css';
import '../styles/tokens.css';
import '../styles/icons.css';
import '../styles/theme.css';
import '../styles/enhancements.css';

/**
 * The full tagline makes a 76-character <title>, which search results truncate
 * mid-phrase. This keeps the first two of its three segments VERBATIM and drops
 * only the trailing one, so the title is shortened rather than reworded — no
 * new positioning is introduced. The complete tagline is still used wherever it
 * is displayed on the page.
 */
const HOME_TITLE = `${site.name} — ${site.tagline.split(' · ').slice(0, 2).join(' · ')}`;

export const metadata: Metadata = {
  // NOT site.domain: every relative metadata URL resolves against this, so
  // pinning it to production is what made a staging build advertise its social
  // image on a domain that does not serve one.
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_TITLE,
    template: `%s | ${site.name}`,
  },
  description: site.heroHeadline,
  alternates: { canonical: canonicalPath('/') },
  // Staging builds are fetchable but not indexable. Metadata merges shallowly,
  // so every page that does not declare its own `robots` inherits this; the
  // pages that DO declare one (placeholder projects) are already noindex.
  // On the production domain this key is absent entirely.
  ...(IS_CANONICAL_HOST ? {} : { robots: { index: false, follow: true } }),
  // app/favicon.ico, app/icon.png and app/apple-icon.png are picked up by
  // convention; these add the sizes a browser or PWA install prompt asks for.
  icons: {
    icon: [
      { url: '/img/icon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/img/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/img/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/img/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/img/apple-touch-icon.png', sizes: '180x180' }],
  },
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: HOME_TITLE,
    description: site.heroHeadline,
    url: absoluteUrl('/'),
    locale: 'en_US',
    // 1200x630, not the 420x320 logo: `summary_large_image` below promises a
    // large card, and consumers letterbox or reject anything smaller.
    images: [
      {
        url: SOCIAL_IMAGE.url,
        width: SOCIAL_IMAGE.width,
        height: SOCIAL_IMAGE.height,
        alt: site.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: HOME_TITLE,
    description: site.heroHeadline,
    images: [SOCIAL_IMAGE.url],
  },
};

/** Organization schema, built from the client's real published details. */
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  // A stable @id lets Service and Breadcrumb nodes on other pages point at
  // THIS organisation rather than describing a second, unlinked one.
  '@id': ORGANIZATION_ID,
  name: site.name,
  url: absoluteUrl('/'),
  logo: `${SITE_URL}/img/logo.webp`,
  description: site.heroHeadline,
  telephone: site.contact.phone,
  email: site.contact.email,
  address: site.contact.addresses.map((a) => ({
    '@type': 'PostalAddress',
    streetAddress: a.value,
    addressLocality: 'Multan',
    addressCountry: 'PK',
  })),
  sameAs: site.social.map((s) => s.href),
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en">
      <head>
        {/* Only the two above-the-fold faces are preloaded. The Switzer
            italic cut is below the fold and would compete for bandwidth. */}
        <link
          rel="preload"
          href="/fonts/ClashDisplay-Variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Switzer-Variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(organizationSchema) }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>

        {/* `id="top"` is the footer back-to-top link's real target. Without it
            the control worked only while its JS click handler ran; the href
            was a dead fragment. */}
        <div className="page-wrapper" id="top">
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
