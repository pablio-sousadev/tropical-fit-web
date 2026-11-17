'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface CarouselControlsProps {
  total: number;
  activeIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
  getMarkerLabel: (index: number) => string;
  prevLabel: string;
  nextLabel: string;
  markersNavLabel: string;
  className?: string;
}

/**
 * Controles acessíveis reutilizáveis para carrosséis (Anterior, Marcadores >= 24x24px e Próximo).
 */
export function CarouselControls({
  total,
  activeIndex,
  onPrev,
  onNext,
  onSelect,
  getMarkerLabel,
  prevLabel,
  nextLabel,
  markersNavLabel,
  className = '',
}: CarouselControlsProps) {
  if (total <= 1) return null;

  return (
    <div
      className={`mt-5 flex flex-wrap items-center justify-between gap-3 ${className}`}
    >
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrev}
          aria-label={prevLabel}
          className="btn-tactile inline-flex min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center rounded-xl border border-white/10 bg-brand-dark-surface text-white hover:border-brand-orange/70 hover:text-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
        >
          <ChevronLeft className="h-5 w-5 text-brand-orange" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={onNext}
          aria-label={nextLabel}
          className="btn-tactile inline-flex min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center rounded-xl border border-white/10 bg-brand-dark-surface text-white hover:border-brand-orange/70 hover:text-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
        >
          <ChevronRight className="h-5 w-5 text-brand-orange" aria-hidden="true" />
        </button>

        <span className="ml-1 font-mono text-xs font-bold uppercase tracking-widest text-stone-400 tabular-nums">
          0{activeIndex + 1} <span className="text-stone-600">/</span> 0{total}
        </span>
      </div>

      {/* Marcadores com área de toque >= 24x24px e distinção não apenas por cor */}
      <nav aria-label={markersNavLabel} className="flex items-center gap-1">
        {Array.from({ length: total }).map((_, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={idx}
              type="button"
              aria-current={isActive ? 'true' : undefined}
              aria-label={getMarkerLabel(idx)}
              onClick={() => onSelect(idx)}
              className="group/dot inline-flex min-h-[28px] min-w-[28px] touch-manipulation items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
            >
              <span
                className={`block h-2.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-7 bg-brand-orange ring-1 ring-brand-yellow/60 shadow-orange-glow-sm'
                    : 'w-2.5 bg-stone-600 group-hover/dot:bg-stone-400'
                }`}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </nav>
    </div>
  );
}
