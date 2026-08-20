import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import Image from 'next/image';
import { AppLink as Link } from '@/components/ui/AppLink';
import { team } from '@/content/team';
import { Reveal } from '@/components/ui/Reveal';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { PageHero } from '@/components/sections/PageHero';

export const metadata: Metadata = pageMetadata({
  title: 'Our Team',
  description:
    'The people behind Dream Weavers — leadership, project management, and development across the eCommerce and Software teams in Multan, Pakistan.',
  path: '/team',
});

export default function TeamPage() {
  return (
    <>
      <PageHero
        kicker="The people"
        title={
          <>
            Our <span>Team</span>
          </>
        }
        lead="Two specialised teams — eCommerce and Software — working together from Multan, Pakistan."
      />

      <section className="section-innovators section-margin" id="team">
        <div className="container">
          <div className="team-grid">
            {team.map((member, i) => (
              <Reveal
                key={member.slug}
                className="team-card"
                duration={1.6}
                delay={0.2 + (i % 3) * 0.12}
              >
                {/* Lazy is measured, not assumed. The first three portraits
                    were eager on the theory that they sit above the fold. They
                    do not: the full-height PageHero pushes all three to y=1058
                    at 1440x900, and to y=308/837/1344 at 375x812 — so at most
                    one is ever in the first viewport. None of them is the LCP
                    element either (that is the hero backdrop), so eager only
                    made them compete with the real LCP for bandwidth. */}
                <div className="team-card-photo">
                  <Image
                    src={member.photo}
                    alt={`${member.name}, ${member.role} at Dream Weavers`}
                    width={600}
                    height={750}
                    loading="lazy"
                  />
                </div>
                {/* The page has no intermediate grouping heading, so each
                    member card is a top-level subsection: h2, sized by .h5. */}
                <h2 className="h5 team-card-name">{member.name}</h2>
                <p className="team-card-role">{member.role}</p>
                <SocialLinks links={member.social} ownerName={member.name} />
              </Reveal>
            ))}
          </div>

          <p className="text-center">
            <Link href="/contact" className="btn btn-outline-dark">
              Work with us
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
