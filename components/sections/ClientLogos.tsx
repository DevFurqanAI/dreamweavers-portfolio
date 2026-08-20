import Image from 'next/image';
import { clients } from '@/content/clients';
import { Reveal } from '@/components/ui/Reveal';

/**
 * The client wall: who Dream Weavers has worked with, and nothing more.
 *
 * NOT LINKS. These marks were briefly wired to the matching project pages,
 * which was wrong twice over — it conflated a client with a piece of work,
 * and every one of those pages currently reads "Case study in preparation",
 * so recognising a logo and clicking it led to an empty page. A showcase is
 * allowed to just be a showcase.
 *
 * Follows the tech-stack row (§28): full brand colour at rest, `contain` so
 * no mark is cropped, and a tinted plate on hover rather than a brightness
 * change — a row that dims until pointed at reads as half-loaded.
 */
export function ClientLogos() {
  return (
    <section id="clients" className="section-clients section-margin">
      <div className="container">
        <Reveal as="h2" className="h2 text-center" duration={2} delay={0.4}>
          Brands we have <span>worked with</span>
        </Reveal>

        <ul className="client-logo-list">
          {clients.map((client, i) => (
            <Reveal
              as="li"
              key={client.logo}
              className="client-logo"
              duration={1.2}
              delay={0.1 + (i % 5) * 0.08}
            >
              <Image
                src={client.logo}
                alt={`${client.label} — a Dream Weavers client`}
                width={300}
                height={300}
                loading="lazy"
              />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
