'use client';

import { useRef, useState, type ReactNode } from 'react';

export interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

/**
 * The About page's vertical tab rail on the dark band.
 *
 * Implements the standard tablist keyboard contract: arrows move between
 * tabs, Home/End jump to the ends, and only the selected tab is in the tab
 * order (roving tabindex).
 */
export function TabRail({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0]?.id ?? '');
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  const move = (delta: number) => {
    const i = tabs.findIndex((t) => t.id === active);
    const next = tabs[(i + delta + tabs.length) % tabs.length];
    setActive(next.id);
    refs.current[next.id]?.focus();
  };

  const jump = (to: 'first' | 'last') => {
    const next = to === 'first' ? tabs[0] : tabs[tabs.length - 1];
    setActive(next.id);
    refs.current[next.id]?.focus();
  };

  return (
    <div className="tab-rail">
      <div className="tab-rail-nav" role="tablist" aria-orientation="vertical">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            ref={(el) => {
              refs.current[tab.id] = el;
            }}
            className={`tab-rail-tab${active === tab.id ? ' active' : ''}`}
            aria-selected={active === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            tabIndex={active === tab.id ? 0 : -1}
            onClick={() => setActive(tab.id)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                e.preventDefault();
                move(1);
              } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                e.preventDefault();
                move(-1);
              } else if (e.key === 'Home') {
                e.preventDefault();
                jump('first');
              } else if (e.key === 'End') {
                e.preventDefault();
                jump('last');
              }
            }}
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`tabpanel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          className="tab-rail-panel"
          hidden={active !== tab.id}
          tabIndex={0}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
