import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { CustomCursor } from "@/components/CustomCursor";
import { ExperienceShell } from "@/components/ExperienceShell";
import { IntroGate } from "@/components/IntroGate";
import { IndustryModes } from "@/components/IndustryModes";
import { MotionShell } from "@/components/MotionShell";
import { Navigation } from "@/components/Navigation";
import { siteConfig } from "@/config/site";
import {
  clients,
  industries,
  processSteps,
  projectConcepts,
  services,
  team,
} from "@/content/site";

export default function Home() {
  const marqueeClients = [...clients, ...clients];

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <IntroGate />
      <CustomCursor />
      <ExperienceShell />
      <MotionShell />
      <Navigation />
      <div className="page-progress" aria-hidden="true"><span /></div>

      <main id="main-content">
        <section className="hero" id="top" data-stage="hero">
          <div className="hero__grid" aria-hidden="true" />
          <div className="hero__copy shell">
            <p className="eyebrow"><span>Independent digital studio</span><i /></p>
            <h1 className="hero__title">
              <span className="hero__line"><span>We weave</span></span>
              <span className="hero__line"><span>digital systems</span></span>
              <span className="hero__line hero__line--accent"><span>that move business.</span></span>
            </h1>
            <div className="hero__footer">
              <p>
                Dreamweavers connects strategy, design, software, commerce, AI and growth into digital products that work as one system.
              </p>
              <div className="hero__actions">
                <a className="button button--solid" href="#work" data-magnetic>
                  <span>Enter the work</span><i aria-hidden="true">↘</i>
                </a>
                <a className="text-link" href="#contact" data-magnetic>Start a conversation <span>↗</span></a>
              </div>
            </div>
          </div>
          <div className="hero__signal" aria-hidden="true">
            <span>Scroll to travel</span><i />
          </div>
          <div className="hero__coordinates" aria-hidden="true">30.1575° N · 71.5249° E</div>
        </section>

        <section className="section section--services" id="services" data-stage="services">
          <div className="section-orbit" aria-hidden="true"><span /><span /><span /></div>
          <div className="capability-field" aria-hidden="true">
            <span className="capability-field__thread capability-field__thread--one" />
            <span className="capability-field__thread capability-field__thread--two" />
            <span className="capability-field__thread capability-field__thread--three" />
            <i className="capability-field__node capability-field__node--one" />
            <i className="capability-field__node capability-field__node--two" />
            <i className="capability-field__node capability-field__node--three" />
          </div>
          <div className="shell">
            <header className="section-heading" data-reveal>
              <p className="eyebrow"><span>01 · Connected capabilities</span><i /></p>
              <h2>Not separate services.<br /><em>One operating system.</em></h2>
              <p>
                Each capability is designed to hand information and momentum to the next—from the first interface to the systems behind it.
              </p>
            </header>

            <div className="services-grid">
              {services.map((service, index) => (
                <article className={`service-card service-card--${index + 1}`} key={service.slug} data-cursor="view">
                  <div className="service-card__top">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <i aria-hidden="true">↗</i>
                  </div>

                  <div className="service-card__visual" aria-hidden="true">
                    <span className="service-card__visual-grid" />
                    <span className="service-card__visual-orbit service-card__visual-orbit--one" />
                    <span className="service-card__visual-orbit service-card__visual-orbit--two" />
                    <span className="service-card__visual-core" />
                    <span className="service-card__visual-line service-card__visual-line--one" />
                    <span className="service-card__visual-line service-card__visual-line--two" />
                    <small>{service.shortTitle}</small>
                  </div>

                  <div className="service-card__body">
                    <p>{service.signal}</p>
                    <h3>{service.title}</h3>
                    <div className="service-card__copy"><p>{service.summary}</p></div>
                  </div>
                  <div className="service-card__threads" aria-hidden="true"><span /><span /><span /></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--work" id="work" data-stage="work">
          <div className="work-gridlines" aria-hidden="true" />
          <div className="shell">
            <header className="section-heading section-heading--split work-heading" data-reveal>
              <div>
                <p className="eyebrow"><span>02 · Selected works</span><i /></p>
                <h2>Three directions.<br /><em>One design language.</em></h2>
              </div>
              <p>
                A cinematic project index built to hold real screenshots, outcomes and case-study links when Dreamweavers approves the final content.
              </p>
            </header>

            <div className="work-showcase">
              {projectConcepts.map((project, index) => (
                <article className={`work-project work-project--${index + 1}`} key={project.index} data-cursor="view">
                  <div className="work-project__copy">
                    <div className="work-project__meta">
                      <span>Project concept / {project.index}</span>
                      <span>DW · Portfolio</span>
                    </div>
                    <h3>{project.title}</h3>
                    <p>{project.summary}</p>
                    <ul aria-label="Project service areas">
                      {project.services.map((service) => <li key={service}>{service}</li>)}
                    </ul>
                    <div className="work-project__status">
                      <span>Case study pending client content</span>
                      <i aria-hidden="true">↗</i>
                    </div>
                  </div>

                  <div className="work-project__visual" aria-hidden="true">
                    <span className="work-project__huge-index">{project.index}</span>
                    <div className="work-project__poster">
                      <div className="work-project__poster-top">
                        <span>Dreamweavers</span>
                        <span>{project.index} / 03</span>
                      </div>
                      <div className="work-project__orbit">
                        <i /><i /><i />
                        <b>{project.title.slice(0, 2).toUpperCase()}</b>
                      </div>
                      <div className="work-project__poster-bottom">
                        <strong>{project.title}</strong>
                        <span>System / Experience / Growth</span>
                      </div>
                    </div>
                    <div className="work-project__threads"><span /><span /><span /><span /></div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--clients" id="clients" data-stage="clients">
          <div className="clients-heading shell" data-reveal>
            <p className="eyebrow"><span>03 · Client archive</span><i /></p>
            <h2>Brands already<br /><em>inside the weave.</em></h2>
          </div>
          <div className="marquee" aria-label="Dreamweavers client logos">
            <div className="marquee__track">
              {marqueeClients.map((client, index) => (
                <div className="client-logo" key={`${client.name}-${index}`}>
                  <Image src={`/clients/${client.image}`} alt={index < clients.length ? client.name : ""} width={180} height={92} sizes="180px" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--process" id="process" data-stage="process">
          <div className="process-grid shell">
            <header className="section-heading process-intro" data-reveal>
              <p className="eyebrow"><span>04 · From signal to system</span><i /></p>
              <h2>A process that<br /><em>keeps transforming.</em></h2>
              <p>Every stage adds structure without hiding the work behind a final reveal.</p>
            </header>
            <ol className="process-list">
              {processSteps.map((step) => (
                <li key={step.number} data-reveal>
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                  <i aria-hidden="true" />
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section section--industries" id="industries" data-stage="industries">
          <div className="shell">
            <header className="section-heading section-heading--split" data-reveal>
              <div>
                <p className="eyebrow"><span>05 · Industry modes</span><i /></p>
                <h2>Different worlds.<br /><em>Shared digital logic.</em></h2>
              </div>
              <p>One adaptable product language, reconfigured around the workflows, information and customer journeys of each sector.</p>
            </header>
            <IndustryModes modes={industries} />
          </div>
        </section>

        <section className="section section--team" id="team" data-stage="team">
          <div className="shell">
            <header className="section-heading" data-reveal>
              <p className="eyebrow"><span>06 · The people in the system</span><i /></p>
              <h2>Human judgment<br /><em>behind every layer.</em></h2>
            </header>
            <div className="team-grid">
              {team.map((member, index) => (
                <article className="team-card" key={member.name} data-reveal>
                  <div className="team-card__image">
                    <Image src={`/team/${member.image}`} alt={member.name} fill sizes="(max-width: 700px) 86vw, (max-width: 1100px) 42vw, 24vw" />
                    <span aria-hidden="true" />
                  </div>
                  <div className="team-card__content">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{member.name}</h3>
                    <p>{member.role}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--contact" id="contact" data-stage="contact">
          <div className="contact-rings" aria-hidden="true"><span /><span /><span /></div>
          <div className="shell contact-layout">
            <div className="contact-copy" data-reveal>
              <p className="eyebrow"><span>07 · Open a new thread</span><i /></p>
              <h2>Let&apos;s build<br /><em>what&apos;s next.</em></h2>
              <p>Bring the idea, the existing problem or the system that has stopped scaling.</p>
              <div className="contact-details">
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email} <span>↗</span></a>
                <a href={`tel:${siteConfig.phone}`}>{siteConfig.displayPhone} <span>↗</span></a>
                <p>{siteConfig.address.streetAddress}, {siteConfig.address.addressLocality}, Pakistan</p>
              </div>
            </div>
            <div data-reveal><ContactForm /></div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell">
          <a className="brand brand--footer" href="#top">
            <span className="brand__mark" aria-hidden="true"><Image src="/brand/dreamweavers-mark.png" alt="" width={54} height={40} /></span>
            <span className="brand__word"><b>Dream</b><b>Weavers</b></span>
          </a>
          <p>Digital products, systems and experiences—woven in Multan.</p>
          <div><Link href="/privacy">Privacy</Link><a href="#top">Back to top ↑</a></div>
        </div>
      </footer>
    </>
  );
}
