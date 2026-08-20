import { SOCIAL_PLATFORMS, SOCIAL_ORDER } from '@/content/social';
import type { SocialLink } from '@/content/types';

/**
 * A person's profile links, as icon-only buttons.
 *
 * RENDERS ONLY WHAT EXISTS. No link, no icon, no empty row — a team member
 * with nothing listed gets no markup at all, so the card simply ends after
 * their role rather than showing dimmed or dead affordances.
 *
 * Each link's accessible name is "<person> on <platform>", because a bare
 * glyph has no accessible name and four unlabelled links per card would
 * otherwise all announce identically. The <i> is aria-hidden: it is the
 * decoration, the label is the content.
 */
export function SocialLinks({
  links,
  ownerName,
  className = '',
}: {
  links?: SocialLink[];
  ownerName: string;
  className?: string;
}) {
  if (!links || links.length === 0) return null;

  // Sorted so two people with the same platforms present them in the same
  // order, whatever order the data happens to be written in.
  const ordered = [...links].sort(
    (a, b) => SOCIAL_ORDER.indexOf(a.platform) - SOCIAL_ORDER.indexOf(b.platform),
  );

  return (
    <ul className={`social-links ${className}`.trim()}>
      {ordered.map(({ platform, href }) => {
        const { label, icon } = SOCIAL_PLATFORMS[platform];
        return (
          <li key={platform}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${ownerName} on ${label}`}
            >
              <i className={icon} aria-hidden="true" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
