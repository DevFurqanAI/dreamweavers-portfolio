import type { Project } from './types';

/**
 * The ten projects Dream Weavers publishes.
 *
 * Titles and categories are the client's own. Every entry carries
 * `isPlaceholder: true` because the published site carries NO case-study text,
 * client names, or results for any project.
 *
 * The detail pages render an explicit "case study in preparation" notice
 * rather than invented copy. When the client supplies a write-up, fill in
 * `body` and set `isPlaceholder` to false.
 */
export const projects: Project[] = [
  {
    slug: 'agro-chemicals',
    title: 'Agro Chemicals',
    categories: ['Design', 'Development'],
    summary:
      'Brand and web presence for an agro chemicals enterprise, covering design through build.',
    thumbnail: '/img/work/agro-chemicals.webp',
    heroImage: '/img/work/agro-chemicals.webp',
    body: [],
    isPlaceholder: true,
  },
  {
    slug: 'crm-erp-system',
    title: 'CRM/ERP Software System',
    categories: ['Branding', 'Business', 'Design', 'Development'],
    summary:
      'A CRM and ERP platform bringing sales, support and operations into one system.',
    thumbnail: '/img/work/crm-erp-system.webp',
    heroImage: '/img/work/crm-erp-system.webp',
    body: [],
    isPlaceholder: true,
  },
  {
    slug: 'ecommerce',
    title: 'E-commerce',
    categories: ['Branding', 'Business', 'Design', 'Development'],
    summary:
      'An online storefront for a textile business, from branding through to launch.',
    thumbnail: '/img/work/ecommerce.webp',
    heroImage: '/img/work/ecommerce.webp',
    body: [],
    isPlaceholder: true,
  },
  {
    slug: 'real-estate',
    title: 'Real Estate',
    categories: ['Business', 'Design'],
    summary:
      'Business and design work for a property developer’s customer-facing presence.',
    thumbnail: '/img/work/real-estate.webp',
    heroImage: '/img/work/real-estate.webp',
    body: [],
    isPlaceholder: true,
  },
  {
    slug: 'realtix-erp',
    title: 'Realtix ERP',
    categories: ['Business', 'Design', 'Development'],
    summary:
      'An ERP system built around the workflows of a real estate operation.',
    thumbnail: '/img/work/realtix-erp.webp',
    heroImage: '/img/work/realtix-erp.webp',
    body: [],
    isPlaceholder: true,
  },
  {
    slug: 'automotive-manufacturing',
    title: 'Automotive & Manufacturing',
    categories: ['Design', 'Development'],
    summary:
      'Design and development for an automotive and manufacturing supplier.',
    thumbnail: '/img/work/automotive-manufacturing.webp',
    heroImage: '/img/work/automotive-manufacturing.webp',
    body: [],
    isPlaceholder: true,
  },
  {
    slug: 'mobile-application-development',
    title: 'Mobile Application Development',
    categories: ['Branding', 'Business', 'Design', 'Development'],
    summary:
      'A mobile application delivered end to end, from branding to release.',
    thumbnail: '/img/work/mobile-application-development.webp',
    heroImage: '/img/work/mobile-application-development.webp',
    body: [],
    isPlaceholder: true,
  },
  {
    slug: 'health-care',
    title: 'Health Care',
    categories: ['Design', 'Development'],
    summary:
      'A healthcare provider’s digital presence, designed and built for patient access.',
    thumbnail: '/img/work/health-care.webp',
    heroImage: '/img/work/health-care.webp',
    body: [],
    isPlaceholder: true,
  },
  {
    slug: 'enterprises',
    title: 'Enterprises',
    categories: ['Design', 'Development'],
    summary:
      'Enterprise systems work spanning design and development.',
    thumbnail: '/img/work/enterprises.webp',
    heroImage: '/img/work/enterprises.webp',
    body: [],
    isPlaceholder: true,
  },
  {
    slug: 'fintech',
    title: 'Fintech',
    categories: ['Design', 'Development'],
    summary:
      'Design and development for a financial services product.',
    thumbnail: '/img/work/fintech.webp',
    heroImage: '/img/work/fintech.webp',
    body: [],
    isPlaceholder: true,
  },
];

/** Every distinct category, for the portfolio filter rail. */
export const projectCategories = [...new Set(projects.flatMap((p) => p.categories))].sort();
