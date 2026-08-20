import type { Client } from './types';

/**
 * Who Dream Weavers has worked with. A showcase, not a route to anywhere.
 *
 * This is deliberately its OWN list rather than being derived from
 * `projects`. The two are different things: a project is a piece of work with
 * a page behind it, a client is a name on a wall. Driving the wall off
 * `projects` coupled them and produced a logo that linked to a project page
 * reading "Case study in preparation" — a dead end from a mark someone
 * clicked because they recognised it.
 *
 * The files are the same ones the portfolio uses as thumbnails, because on
 * inspection those thumbnails ARE the clients' brand marks. The one entry not
 * carried over is `mobile-application-development`, which is a photograph of
 * a phone rather than a logo and read as the odd tile out in a logo row.
 *
 * Labels are the client's own published project labels. No client name is
 * transcribed from the artwork.
 */
export const clients: Client[] = [
  { label: 'Agro Chemicals', logo: '/img/work/agro-chemicals.webp' },
  { label: 'CRM/ERP Software System', logo: '/img/work/crm-erp-system.webp' },
  { label: 'E-commerce', logo: '/img/work/ecommerce.webp' },
  { label: 'Real Estate', logo: '/img/work/real-estate.webp' },
  { label: 'Realtix ERP', logo: '/img/work/realtix-erp.webp' },
  {
    label: 'Automotive & Manufacturing',
    logo: '/img/work/automotive-manufacturing.webp',
  },
  { label: 'Health Care', logo: '/img/work/health-care.webp' },
  { label: 'Enterprises', logo: '/img/work/enterprises.webp' },
  { label: 'Fintech', logo: '/img/work/fintech.webp' },
];
