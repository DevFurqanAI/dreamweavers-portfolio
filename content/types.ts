/**
 * The content model. Mirrors §11 of the re-engineering blueprint.
 *
 * Pages read from these types and never hard-code copy, so re-skinning the
 * site for another client means editing content/ and styles/tokens.css only.
 */

export interface Service {
  slug: string;
  title: string;
  /** Font Awesome class, e.g. 'fa-solid fa-robot'. */
  icon: string;
  /** Verbatim client copy. Do not reword. */
  shortDescription: string;
  /** The service offerings the client publishes for this service. */
  capabilities: string[];
  /**
   * Four SHORT terms for the service card. The full `capabilities` labels run
   * to several words each and overflow the card's fixed-height shell — the
   * list was being clipped mid-item. These are the same offerings, named
   * tightly enough to fit.
   */
  highlights: string[];
  heroImage: string;
  /** Body paragraphs, derived from the client's own page copy. */
  body: string[];
  included: { title: string; description: string }[];
  processSteps: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  seo: { title: string; description: string };
}

export interface Project {
  slug: string;
  title: string;
  categories: string[];
  /**
   * One line describing what the engagement covered. States the domain and
   * the disciplines only — the client publishes no outcomes, so none are
   * claimed here.
   */
  summary: string;
  thumbnail: string;
  heroImage: string;
  body: string[];
  /**
   * True when the client has not published a case-study write-up. The detail
   * page renders an explicit notice instead of invented copy. No project
   * descriptions exist on the published site.
   */
  isPlaceholder: boolean;
}

export interface Client {
  /**
   * The client's published project label. NOT a name transcribed off the logo
   * artwork — the company publishes no client names, so none are asserted
   * here beyond the labels it already uses itself.
   */
  label: string;
  /** The client's own brand mark. */
  logo: string;
}

/**
 * A platform this site can render a profile link for.
 *
 * Adding one is two steps, in this order:
 *   1. add the key here and its label/glyph to SOCIAL_PLATFORMS in
 *      content/social.ts;
 *   2. if the glyph is not already mapped in styles/icons.css, add its
 *      `content: "\fXXX"` rule there and re-run `npm run icons`.
 *
 * Step 2 is not optional: the webfonts are subset to exactly the codepoints
 * icons.css maps, so an unmapped glyph renders as a blank box.
 */
export type SocialPlatform = 'linkedin' | 'x' | 'instagram' | 'facebook';

export interface SocialLink {
  platform: SocialPlatform;
  /** Absolute https URL to the profile. */
  href: string;
}

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  photo: string;
  /**
   * Profiles this person publishes. OPTIONAL AND SPARSE BY DESIGN — list only
   * the platforms a person actually has. Omitted or empty renders no row at
   * all, rather than a placeholder or a dead link.
   *
   * Never populate this by guessing a handle from a name. A wrong profile
   * link points the public at a stranger's account.
   */
  social?: SocialLink[];
}

export interface Testimonial {
  quote: string;
  clientName: string;
  clientCompany: string;
  portrait: string;
  /**
   * dreamweaversoffice.com/testimonials/ exists but publishes no quotes.
   * Nothing here may be fabricated.
   */
  isPlaceholder: boolean;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  heroHeadline: string;
  domain: string;
  contact: {
    phone: string;
    /** Digits only, for wa.me links. */
    whatsapp: string;
    email: string;
    addresses: { label: string; value: string }[];
  };
  social: { label: string; href: string; icon: string }[];
  counters: { value: string; suffix: string; label: string }[];
  marqueeRows: string[][];
  industries: string[];
}
