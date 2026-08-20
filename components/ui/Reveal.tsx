'use client';

import type { ElementType, ReactNode } from 'react';
import { useReveal } from '@/hooks/useReveal';

type Animation = 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'fadeIn';

/**
 * The scroll-reveal wrapper. Emits the same `.wow fadeInUp` classes the
 * ported stylesheet targets, so enhancements.css §1 does the animating.
 *
 * `duration` and `delay` mirror the source's data-wow-duration /
 * data-wow-delay attributes.
 */
export function Reveal({
  children,
  as: Tag = 'div',
  animation = 'fadeInUp',
  delay = 0,
  duration = 1,
  className = '',
  ...rest
}: {
  children: ReactNode;
  as?: ElementType;
  animation?: Animation;
  delay?: number;
  duration?: number;
  className?: string;
} & Record<string, unknown>) {
  const { ref, armed, revealed } = useReveal<HTMLElement>();

  return (
    <Tag
      ref={ref}
      // `is-armed` is what makes the pre-animation hidden state apply at all;
      // see enhancements.css §1. Server-rendered markup carries neither class,
      // so it renders visible.
      className={[
        'wow',
        animation,
        armed ? 'is-armed' : '',
        revealed ? 'is-revealed' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        transitionDelay: delay ? `${delay}s` : undefined,
        transitionDuration: `${duration}s`,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
