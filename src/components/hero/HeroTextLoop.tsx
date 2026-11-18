'use client';

import { useEffect, useRef, useState } from 'react';
import { Zap } from 'lucide-react';
import {
  RotatingText,
  type RotatingTextRef,
} from '@/components/ui/RotatingText';

const HERO_LOOP_PHRASES = [
  'Treine para sua melhor versão',
  'Mais Força',
  'Mais Saúde',
  'Mais Performance',
];

/**
 * Faixa cinética do Hero baseada no RotatingText (React Bits), com mola de largura,
 * pausa ao passar o mouse e pausa automática fora da viewport.
 */
export function HeroTextLoop() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rotatingRef = useRef<RotatingTextRef | null>(null);

  const [inView, setInView] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [supportsFinePointer, setSupportsFinePointer] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const query = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setSupportsFinePointer(query.matches);
    update();
    query.addEventListener?.('change', update);
    return () => query.removeEventListener?.('change', update);
  }, []);

  // Pausa automaticamente quando o Hero sai da área visível para poupar CPU
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((entry) => entry.isIntersecting);
        setInView(visible);
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-wrap items-center gap-2.5 sm:gap-3"
    >
      <div className="inline-flex max-w-full items-center gap-2 rounded-2xl border border-white/10 bg-brand-dark-surface/95 p-1.5 pr-3 md:bg-brand-dark-surface/90 md:backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
        <span
          className="hidden sm:inline-flex items-center gap-1.5 pl-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-stone-300"
          aria-hidden="true"
        >
          <Zap className="h-3.5 w-3.5 text-brand-orange" />
          <span>Seu foco:</span>
        </span>

        <button
          type="button"
          onClick={() => rotatingRef.current?.next()}
          aria-label={`Foco em destaque: ${HERO_LOOP_PHRASES[activeIndex]}. Clique para avançar para a próxima frase`}
          className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow rounded-xl"
        >
          <RotatingText
            ref={rotatingRef}
            texts={HERO_LOOP_PHRASES}
            effect={supportsFinePointer ? 'blur' : 'slide'}
            blur={supportsFinePointer ? 5 : 0}
            splitBy="words"
            staggerDuration={0.045}
            rotationInterval={2800}
            auto={inView}
            pauseOnHover
            highlight
            highlightColor="#FF6B00"
            onNext={setActiveIndex}
            mainClassName="font-display text-sm sm:text-lg font-black uppercase tracking-wider leading-tight shadow-orange-glow-sm cursor-pointer select-none"
          />
        </button>

        {/* Indicador discreto de progresso entre as 4 frases */}
        <span
          className="hidden sm:inline-flex items-center gap-1 pl-1"
          aria-hidden="true"
        >
          {HERO_LOOP_PHRASES.map((phrase, idx) => (
            <span
              key={phrase}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? 'w-4 bg-brand-orange'
                  : 'w-1.5 bg-stone-600'
              }`}
            />
          ))}
        </span>
      </div>
    </div>
  );
}
