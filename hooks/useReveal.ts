'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * ONE IntersectionObserver for every reveal on the page.
 *
 * Each hook instance used to construct its own observer. The homepage mounts
 * dozens of Reveal wrappers, so that was dozens of observers watching the same
 * scroll with identical options — all of the per-observer bookkeeping cost, none
 * of the benefit. A single observer with a shared registry does the same work.
 *
 * Entries unregister themselves on first intersection, so the registry does not
 * grow with the page's lifetime.
 */
const callbacks = new Map<Element, () => void>();
let shared: IntersectionObserver | null = null;

function sharedObserver(): IntersectionObserver {
  if (shared) return shared;
  shared = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const fire = callbacks.get(entry.target);
        if (fire) {
          callbacks.delete(entry.target);
          shared?.unobserve(entry.target);
          fire();
        }
      }
    },
    { threshold: 0.15 },
  );
  return shared;
}

function observeOnce(el: Element, fire: () => void) {
  callbacks.set(el, fire);
  sharedObserver().observe(el);
}

function stopObserving(el: Element) {
  callbacks.delete(el);
  shared?.unobserve(el);
}

/**
 * Replaces WOW.js. Adds `is-revealed` at 15% visibility, matching WOW's
 * default offset.
 *
 * FAILS OPEN, AND THE FAILURE PATH IS THE DEFAULT PATH.
 *
 * The hidden pre-animation state is not in the server-rendered CSS at all. It
 * is applied per element, by this hook, only once the hook has mounted and
 * decided that this specific element should animate — the `armed` phase. Every
 * way the client can fail (hydration error, bundle 404, CSP blocking the
 * script, an exception before this effect runs) leaves the element in its
 * server-rendered, fully visible state, because arming is the thing that
 * never happened.
 *
 * Consequence, and it is deliberate: an element that is already on screen when
 * the hook mounts is NOT armed. Its visible state has already been painted
 * from the server HTML, so arming it would blink the content out and fade it
 * back in. Above-the-fold reveals therefore render statically; everything
 * below the fold animates exactly as before.
 *
 * Reduced motion and a missing IntersectionObserver take the same unarmed
 * path.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [phase, setPhase] = useState<'idle' | 'armed' | 'revealed'>('idle');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Already in view on mount (above the fold) — leave it alone.
    //
    // This is measured, not delegated to the observer. Registering an observer
    // on an element that is ALREADY intersecting does not reliably deliver an
    // intersecting entry: the initial callback races hydration and the layout
    // shift from webfont swap, and when it loses, no threshold is ever crossed
    // afterwards, so nothing fires again. Under the previous CSS-gated hidden
    // default that left the element at opacity 0 forever — the lead paragraph
    // on every interior page hero was invisible at 390px while identical markup
    // revealed fine at 1440px. Skipping the arm removes the failure mode
    // rather than racing it.
    const rect = el.getBoundingClientRect();
    const onScreen = rect.top < window.innerHeight && rect.bottom > 0;

    if (reduced || typeof IntersectionObserver === 'undefined' || onScreen) {
      // No arming, so nothing to transition from: the element is already
      // painted in its final state and simply stays there.
      setPhase('revealed');
      return;
    }

    // Off screen: safe to hide, because the user cannot see it drop out. CSS
    // suppresses the transition while arming for the same reason it exists —
    // this step is a state reset, not an animation.
    setPhase('armed');

    // Joins the shared observer rather than creating one. Unobserving on
    // cleanup matters here in a way disconnect() used to hide: the observer is
    // now shared, so tearing it down would blind every other reveal.
    observeOnce(el, () => setPhase('revealed'));
    return () => stopObserving(el);
  }, []);

  return { ref, armed: phase === 'armed', revealed: phase === 'revealed' };
}
