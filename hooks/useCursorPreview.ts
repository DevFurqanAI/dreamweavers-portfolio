'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

/**
 * The portfolio hover preview: a large image that follows the cursor.
 *
 * A no-op on coarse pointers — there is no hover on touch, and rendering a
 * 34rem image that can never be dismissed would be worse than nothing.
 *
 * THE POSITION IS NOT REACT STATE. It used to be, which meant every mousemove
 * — hundreds per second of travel — set state on the component that owns the
 * whole portfolio grid, re-rendering the filter rail and every card to move one
 * absolutely-positioned image. Pointer coordinates now live in a ref and are
 * written straight to the element's transform inside a rAF callback, so the
 * cost is one style write per frame and React re-renders only when the previewed
 * image actually changes.
 */
export function useCursorPreview() {
  const [src, setSrc] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const fine = useRef(false);
  const point = useRef({ x: 0, y: 0 });
  const frame = useRef(0);

  useEffect(() => {
    fine.current =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const paint = useCallback(() => {
    frame.current = 0;
    const el = previewRef.current;
    if (!el) return;
    const { x, y } = point.current;
    // Same offsets the inline style used, kept here so there is one source.
    el.style.transform = `translate3d(${x + 24}px, ${y - 120}px, 0)`;
  }, []);

  const onMove = useCallback(
    (e: { clientX: number; clientY: number }) => {
      if (!fine.current) return;
      point.current = { x: e.clientX, y: e.clientY };
      // Coalesce: many moves per frame collapse into one write.
      if (!frame.current) frame.current = requestAnimationFrame(paint);
    },
    [paint],
  );

  const onEnter = useCallback((image: string) => {
    if (fine.current) setSrc(image);
  }, []);

  const onLeave = useCallback(() => setSrc(null), []);

  // Place the preview before its first paint. Without this it would mount at
  // the origin and jump to the cursor on the next mousemove.
  useLayoutEffect(() => {
    if (src) paint();
  }, [src, paint]);

  useEffect(
    () => () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    },
    [],
  );

  return { src, previewRef, onEnter, onLeave, onMove };
}
