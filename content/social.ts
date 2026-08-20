import type { SocialPlatform } from './types';

/**
 * Label and glyph for each platform, in the order links should render.
 *
 * ONE SOURCE FOR BOTH. The label is what a screen reader announces and the
 * glyph is what everyone else sees; keeping them in the same record stops the
 * two drifting, which is how an icon ends up announcing the wrong network.
 *
 * Every glyph here is already mapped in styles/icons.css, so this costs the
 * subset webfonts nothing. See SocialPlatform in ./types.ts before adding a
 * platform whose glyph is not.
 */
export const SOCIAL_PLATFORMS: Record<
  SocialPlatform,
  { label: string; icon: string }
> = {
  linkedin: { label: 'LinkedIn', icon: 'fa-brands fa-linkedin-in' },
  x: { label: 'X', icon: 'fa-brands fa-x-twitter' },
  instagram: { label: 'Instagram', icon: 'fa-brands fa-instagram' },
  facebook: { label: 'Facebook', icon: 'fa-brands fa-facebook-f' },
};

/** Render order, independent of the order a person's links were written in. */
export const SOCIAL_ORDER = Object.keys(SOCIAL_PLATFORMS) as SocialPlatform[];
