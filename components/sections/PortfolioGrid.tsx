'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AppLink as Link } from '@/components/ui/AppLink';
import { projects, projectCategories } from '@/content/portfolio';
import { useCursorPreview } from '@/hooks/useCursorPreview';

const ALL = 'All';

/**
 * Filter rail plus work cards, with the cursor-following preview the source
 * design shows on portfolio link hover.
 *
 * Filtering hides cards with the `hidden` attribute rather than unmounting
 * them, so the preview images stay in the browser cache and the grid does
 * not reflow from scratch on every filter change.
 */
export function PortfolioGrid() {
  const [filter, setFilter] = useState<string>(ALL);
  const { src, previewRef, onEnter, onLeave, onMove } = useCursorPreview();

  const categories = [ALL, ...projectCategories];

  return (
    <>
      <div className="filter-rail" role="group" aria-label="Filter projects by discipline">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            className={`filter-rail-btn${filter === c ? ' active' : ''}`}
            aria-pressed={filter === c}
            onClick={() => setFilter(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="work-grid">
        {projects.map((project) => {
          const visible = filter === ALL || project.categories.includes(filter);
          return (
            <article
              className="work-card"
              key={project.slug}
              hidden={!visible}
              data-categories={project.categories.join(',')}
            >
              <Link
                href={`/portfolio/${project.slug}`}
                onMouseEnter={() => onEnter(project.thumbnail)}
                onMouseLeave={onLeave}
                onMouseMove={onMove}
              >
                <div className="work-card-media">
                  <Image
                    src={project.thumbnail}
                    alt={`${project.title} — Dream Weavers project`}
                    width={900}
                    height={900}
                    loading="lazy"
                  />
                </div>
                <h2 className="h5 work-card-title">{project.title}</h2>
                {/* Written for all ten projects in content/portfolio.ts and
                    previously rendered nowhere — not here, not on the detail
                    page. It is the only line that says what the engagement
                    actually was; the category list beneath repeats across
                    four of the ten cards verbatim. */}
                <p className="work-card-summary">{project.summary}</p>
                <p className="work-card-meta">{project.categories.join(' · ')}</p>
              </Link>
            </article>
          );
        })}
      </div>

      {/* Cursor preview. Suppressed on coarse pointers and under reduced
          motion by the hook itself. Its transform is written by the hook, once
          per animation frame, rather than being re-rendered through React on
          every mousemove. */}
      {src && (
        <div className="cursor-preview" aria-hidden="true" ref={previewRef}>
          <Image src={src} alt="" width={540} height={540} />
        </div>
      )}
    </>
  );
}
