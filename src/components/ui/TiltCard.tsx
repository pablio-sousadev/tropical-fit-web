'use client';

import { useRef, type PointerEvent, type ReactNode } from 'react';

export interface TiltCardProps {
  children: ReactNode;
  maxTilt?: number;
  className?: string;
  cardClassName?: string;
  glare?: boolean;
}

/**
 * Wrapper de tilt 3D adaptado do transitions.dev (#19 card-hover-tilt):
 * rastreia o ponteiro no wrapper externo plano (.t-tilt) para evitar flicker
 * nas bordas enquanto o card interno (.t-tilt-card) inclina em 3D.
 */
export function TiltCard({
  children,
  maxTilt = 8,
  className = '',
  cardClassName = '',
  glare = true,
}: TiltCardProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const reset = () => {
    const outer = outerRef.current;
    const card = cardRef.current;
    if (!outer || !card) return;
    outer.classList.remove('is-hover');
    card.classList.remove('is-tilting');
    card.style.setProperty('--tilt-rx', '0deg');
    card.style.setProperty('--tilt-ry', '0deg');
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    if (
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const outer = outerRef.current;
    const card = cardRef.current;
    if (!outer || !card) return;

    const r = outer.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return;

    const px = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    const py = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));

    outer.classList.add('is-hover');
    card.classList.add('is-tilting');
    card.style.setProperty('--tilt-ry', `${((px - 0.5) * maxTilt).toFixed(2)}deg`);
    card.style.setProperty('--tilt-rx', `${((0.5 - py) * maxTilt).toFixed(2)}deg`);
    card.style.setProperty('--tilt-gx', `${(px * 100).toFixed(1)}%`);
    card.style.setProperty('--tilt-gy', `${(py * 100).toFixed(1)}%`);
  };

  return (
    <div
      ref={outerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={(e) => {
        if (e.pointerType === 'mouse') reset();
      }}
      onPointerCancel={reset}
      className={`t-tilt ${className}`}
    >
      <div ref={cardRef} className={`t-tilt-card ${cardClassName}`}>
        {children}
        {glare ? <div className="t-tilt-glare" aria-hidden="true" /> : null}
      </div>
    </div>
  );
}
