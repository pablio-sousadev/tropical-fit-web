'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play, Zap } from 'lucide-react';
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
 * controle acessível de Pausar/Retomar (WCAG 2.2.2) e pausa automática fora da viewport.
 */
export function HeroTextLoop() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rotatingRef = useRef<RotatingTextRef | null>(null);

  const [userPaused, setUserPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

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

  const isAutoPlaying = !userPaused && inView;

  return (
    <div
      ref={containerRef}
      className="flex flex-wrap items-center gap-2.5 sm:gap-3"
    >
      <div className="inline-flex max-w-full items-center gap-2 rounded-2xl border border-white/10 bg-brand-dark-surface/90 p-1.5 pr-2.5 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
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
            effect="blur"
            blur={5}
            splitBy="words"
            staggerDuration={0.045}
            rotationInterval={2800}
            auto={isAutoPlaying}
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

      {/* Controle acessível de Pausar/Retomar (WCAG 2.2.2 Pause, Stop, Hide; sem aria-pressed) */}
      <button
        type="button"
        onClick={() => setUserPaused((prev) => !prev)}
        aria-label={
          userPaused ? 'Retomar rotação de frases' : 'Pausar rotação de frases'
        }
        title={userPaused ? 'Retomar' : 'Pausar'}
        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-brand-dark-surface/90 text-stone-300 hover:border-brand-orange/60 hover:text-brand-orange transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
      >
        {userPaused ? (
          <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
        ) : (
          <Pause className="h-3.5 w-3.5" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
