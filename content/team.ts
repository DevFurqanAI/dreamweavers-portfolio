import type { TeamMember, Testimonial } from './types';

/**
 * The five people on the Dream Weavers team.
 * Names and roles verbatim. The published site carries no biographies, so
 * none are invented here.
 *
 * `social` is sparse because the source is: only the CEO's card publishes
 * personal profiles. Nobody else's is guessed from their name — a wrong
 * handle points the public at a stranger. A member with none listed renders
 * no link row at all.
 */
export const team: TeamMember[] = [
  {
    slug: 'muhammad-hassan-jahangir',
    name: 'Muhammad Hassan Jahangir',
    role: 'CEO & Founder',
    photo: '/img/team/hassan.webp',
    /**
     * The only member whose card on dreamweaversoffice.com/team/ carries
     * personal profiles. QR and share tracking (`?s=`, `?igsh=`, `utm_source`,
     * `mibextid`) stripped — each bare URL was checked and resolves 200.
     *
     * His card there also links linkedin.com/company/dreamweaversllc/, which
     * is the COMPANY page, not a personal profile. It is deliberately not
     * here: these links are labelled "<name> on <platform>", and pointing
     * that at the company would make the label untrue. The footer already
     * carries the company LinkedIn.
     */
    social: [
      { platform: 'x', href: 'https://x.com/hassan1122mini' },
      { platform: 'instagram', href: 'https://www.instagram.com/hassanjhangir' },
      { platform: 'facebook', href: 'https://www.facebook.com/share/16qEhXF8Kd/' },
    ],
  },
  { slug: 'muhammad-mohsin', name: 'Muhammad Mohsin', role: 'General Manager', photo: '/img/team/mohsin.webp' },
  { slug: 'muhammad-hasnain-jahangir', name: 'Muhammad Hasnain Jahangir', role: 'Logistics Manager', photo: '/img/team/hasnain.webp' },
  { slug: 'urwa-hassan', name: 'Urwa Hassan', role: 'Project Manager', photo: '/img/team/urwa.webp' },
];

/**
 * ⚠ NO REAL TESTIMONIALS EXIST.
 *
 * dreamweaversoffice.com/testimonials/ is a live page that publishes no
 * client quotes. The
 * testimonial section is the strongest element in this design, so the
 * component is built and rendered, but with an honestly-labelled
 * placeholder.
 *
 * DO NOT replace this with an invented quote. Swap in a real one, with the
 * client's permission, and set isPlaceholder to false.
 */
export const testimonials: Testimonial[] = [
  {
    quote: 'Reserved for a client testimonial.',
    clientName: 'Awaiting a published quote',
    clientCompany: '',
    portrait: '',
    isPlaceholder: true,
  },
];
