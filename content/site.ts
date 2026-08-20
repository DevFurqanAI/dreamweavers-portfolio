import type { SiteConfig } from './types';

/**
 * Global site data. Every value is a real published detail taken from
 * dreamweaversoffice.com.
 */
export const site: SiteConfig = {
  name: 'Dream Weavers',
  tagline: 'E-Commerce Solutions · Software Innovation · Business Growth',
  heroHeadline:
    'Dream Weavers empowers brands, startups, and enterprises with smart technology, seamless platforms, and scalable systems for long-term success.',
  domain: 'https://dreamweaversoffice.com',

  contact: {
    phone: '+92 313 6784511',
    whatsapp: '923136784511',
    email: 'info@dreamweaversoffice.com',
    addresses: [
      { label: 'Head Office', value: 'Innovista, DHA, Multan, Pakistan' },
      {
        label: 'Model Town',
        value: '16 D, 15 D Office, D Market, Model Town Phase 1, Multan, Pakistan',
      },
    ],
  },

  social: [
    { label: 'Facebook', href: 'https://facebook.com/dreamweaversllc', icon: 'fa-brands fa-facebook-f' },
    { label: 'LinkedIn', href: 'https://linkedin.com/company/dreamweaversllc/', icon: 'fa-brands fa-linkedin-in' },
    { label: 'Instagram', href: 'https://instagram.com/dreamweaversllc/', icon: 'fa-brands fa-instagram' },
    { label: 'X', href: 'https://x.com/hassan1122mini', icon: 'fa-brands fa-x-twitter' },
  ],

  /**
   * The live site's counters all render "1+" because their count-up animation
   * is broken. These are the real figures published on the About page.
   */
  counters: [
    { value: '1000', suffix: '+', label: 'Tasks completed for global clients' },
    { value: '14', suffix: '', label: 'Years in software development' },
    { value: '3', suffix: '+', label: 'Years of eCommerce excellence' },
    { value: '5', suffix: '', label: 'Specialists across two teams' },
  ],

  /* Short uppercase words. The band is set very large, and long phrases stop
     reading as a marquee and start reading as a wall of text. */
  marqueeRows: [
    ['SHOPIFY', 'ECOMMERCE', 'ERP', 'CRM'],
    ['WEB', 'MOBILE', 'AI', 'CLOUD'],
    ['MARKETING', 'DATA', 'SEO', 'GROWTH'],
  ],

  industries: [
    'Agro Chemicals',
    'Automotive & Manufacturing',
    'E-commerce',
    'Enterprises',
    'Fintech',
    'Healthcare',
    'Retail',
    'Real Estate',
    'SMEs',
    'Startups',
  ],
};
