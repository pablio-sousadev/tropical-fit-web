'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Expand,
  Camera,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { ACADEMIA_DATA } from '@/data/academia';
import type { CategoriaFoto } from '@/types/academia';
import { Lightbox } from './Lightbox';

const CATEGORIAS_FILTRO: Array<'Todas' | CategoriaFoto> = [
  'Todas',
  'Musculação',
  'Cardio',
  'Sala Coletiva',
  'Recepção',
];

const AUTO_SCROLL_MS = 3500;

export function Galeria() {
  const { fotos, unidade } = ACADEMIA_DATA;
  const [categoriaAtiva, setCategoriaAtiva] = useState<'Todas' | CategoriaFoto>(
    'Todas'
  );
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const carouselRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const fotosFiltradas =
    categoriaAtiva === 'Todas'
      ? fotos
      : fotos.filter((foto) => foto.categoria === categoriaAtiva);

  const scrollToSlide = useCallback(
    (index: number, behavior: ScrollBehavior = 'smooth') => {
      const container = carouselRef.current;
      const card = cardRefs.current[index];
      if (!container || !card) return;

      const targetLeft =
        card.offsetLeft - (container.clientWidth - card.offsetWidth) / 2;
      container.scrollTo({
        left: Math.max(0, targetLeft),
        behavior,
      });
      setActiveSlide(index);
    },
    []
  );

  // Sincroniza o indicador ativo quando o usuário arrasta manualmente no mobile
  const handleCarouselScroll = useCallback(() => {
    const container = carouselRef.current;
    if (!container) return;

    const center = container.scrollLeft + container.clientWidth / 2;
    let closestIdx = 0;
    let minDistance = Number.POSITIVE_INFINITY;

    cardRefs.current.forEach((card, idx) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(center - cardCenter);
      if (dist < minDistance) {
        minDistance = dist;
        closestIdx = idx;
      }
    });

    setActiveSlide((prev) => (prev === closestIdx ? prev : closestIdx));
  }, []);

  // Reseta carrossel ao trocar de categoria
  useEffect(() => {
    setActiveSlide(0);
    const container = carouselRef.current;
    if (container) {
      container.scrollTo({ left: 0, behavior: 'auto' });
    }
  }, [categoriaAtiva]);

  // Auto-scroll suave a cada 3.5s no mobile (pausa no toque, hover ou Lightbox aberto)
  useEffect(() => {
    if (
      isPaused ||
      selectedIndex !== null ||
      fotosFiltradas.length <= 1 ||
      typeof window === 'undefined'
    ) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const timer = window.setInterval(() => {
      const container = carouselRef.current;
      if (!container) return;
      // Só auto-avança quando está em modo carrossel horizontal (mobile)
      if (container.scrollWidth <= container.clientWidth + 8) return;

      const nextIdx = (activeSlide + 1) % fotosFiltradas.length;
      scrollToSlide(nextIdx, 'smooth');
    }, AUTO_SCROLL_MS);

    return () => window.clearInterval(timer);
  }, [
    activeSlide,
    fotosFiltradas.length,
    isPaused,
     scrollToSlide,
    selectedIndex,
  ]);

  const handlePrevSlide = () => {
    if (fotosFiltradas.length === 0) return;
    const prevIdx =
      (activeSlide - 1 + fotosFiltradas.length) % fotosFiltradas.length;
    scrollToSlide(prevIdx, 'smooth');
  };

  const handleNextSlide = () => {
    if (fotosFiltradas.length === 0) return;
    const nextIdx = (activeSlide + 1) % fotosFiltradas.length;
    scrollToSlide(nextIdx, 'smooth');
  };

  return (
    <section
      id="estrutura"
      aria-labelledby="estrutura-heading"
      className="py-16 sm:py-24 bg-brand-dark border-b border-brand-dark-border overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-brand-orange">
              <Camera className="h-4 w-4" aria-hidden="true" />
              <span>Tour pela Arena</span>
            </div>
            <h2
              id="estrutura-heading"
              className="font-display text-[clamp(2.35rem,5.5vw,4.5rem)] font-black uppercase tracking-tight text-white leading-[0.93]"
            >
              ESTRUTURA DE <span className="text-brand-orange">IMPACTO</span>{' '}
              PARA O SEU TREINO
            </h2>
            <p className="text-sm sm:text-lg text-stone-300 leading-relaxed">
              Arraste para o lado para explorar os ambientes da{' '}
              {unidade.unidade} ou toque em qualquer foto para ampliar.
            </p>
          </div>

          {/* Filtro por Categoria de Ambiente */}
          <div
            role="tablist"
            aria-label="Filtrar fotos por ambiente da academia"
            className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1"
          >
            {CATEGORIAS_FILTRO.map((cat) => {
              const isSelected = categoriaAtiva === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => {
                    setSelectedIndex(null);
                    setCategoriaAtiva(cat);
                  }}
                  className={`btn-tactile inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-xl px-4 py-2 font-display text-sm sm:text-base font-black uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${
                    isSelected
                      ? 'bg-brand-orange text-black shadow-orange-glow-sm'
                      : 'border border-brand-dark-border bg-brand-dark-surface text-stone-300 hover:border-brand-orange/60 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Carrossel Horizontal com Snap no Mobile -> Grid no Tablet/Desktop */}
        <div
          className="relative"
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            ref={carouselRef}
            onScroll={handleCarouselScroll}
            className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto sm:overflow-visible snap-x snap-mandatory no-scrollbar -mx-4 px-[9vw] sm:mx-0 sm:px-0 pb-2"
          >
            {fotosFiltradas.map((foto, index) => {
              const isFeatured = categoriaAtiva === 'Todas' && index === 0;
              const isCurrentMobile = activeSlide === index;

              return (
                <button
                  key={foto.id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  aria-label={`Ampliar foto: ${foto.titulo} (${foto.categoria})`}
                  className={`group relative flex w-[82vw] max-w-[380px] sm:w-auto sm:max-w-none shrink-0 snap-center flex-col overflow-hidden rounded-2xl border-2 bg-brand-dark-card text-left transition-all duration-300 hover:border-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${
                    isFeatured ? 'sm:col-span-2 lg:col-span-2' : ''
                  } ${
                    isCurrentMobile
                      ? 'border-brand-orange/80 scale-100 opacity-100'
                      : 'border-brand-dark-border scale-[0.96] opacity-75 sm:scale-100 sm:opacity-100'
                  }`}
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-dark">
                    <img
                      src={foto.url}
                      alt={foto.alt}
                      loading="lazy"
                      width={600}
                      height={375}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                    {/* Selo de Categoria */}
                    <span className="absolute top-3 left-3 rounded bg-brand-dark/90 px-2.5 py-1 font-display text-xs font-black uppercase tracking-widest text-brand-orange border border-brand-orange/40">
                      {foto.categoria}
                    </span>

                    {/* Ícone de Zoom */}
                    <span
                      className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-orange text-black opacity-90 transition-transform duration-200 group-hover:scale-110"
                      aria-hidden="true"
                    >
                      <Expand className="h-4 w-4" />
                    </span>

                    {/* Título e Descrição Curta */}
                    <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5">
                      <h3 className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight text-white group-hover:text-brand-orange transition-colors">
                        {foto.titulo}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-xs text-stone-300">
                        {foto.alt}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Controles do Carrossel no Mobile (Setas + Dots + Contador) */}
          {fotosFiltradas.length > 1 ? (
            <div className="mt-4 flex sm:hidden items-center justify-between gap-3">
              <button
                type="button"
                onClick={handlePrevSlide}
                aria-label="Ambiente anterior"
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-brand-dark-border bg-brand-dark-surface text-white active:scale-95 transition-colors hover:border-brand-orange"
              >
                <ChevronLeft className="h-5 w-5 text-brand-orange" aria-hidden="true" />
              </button>

              <div
                className="flex items-center gap-2"
                role="tablist"
                aria-label="Indicadores de fotos da estrutura"
              >
                {fotosFiltradas.map((foto, idx) => {
                  const ativo = idx === activeSlide;
                  return (
                    <button
                      key={foto.id}
                      type="button"
                      role="tab"
                      aria-selected={ativo}
                      aria-label={`Ver foto ${idx + 1}: ${foto.titulo}`}
                      onClick={() => scrollToSlide(idx, 'smooth')}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        ativo
                          ? 'w-7 bg-brand-orange'
                          : 'w-2.5 bg-brand-dark-border hover:bg-stone-500'
                      }`}
                    />
                  );
                })}
              </div>

              <button
                type="button"
                onClick={handleNextSlide}
                aria-label="Próximo ambiente"
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-brand-dark-border bg-brand-dark-surface text-white active:scale-95 transition-colors hover:border-brand-orange"
              >
                <ChevronRight className="h-5 w-5 text-brand-orange" aria-hidden="true" />
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {/* Modal Lightbox */}
      <Lightbox
        fotos={fotosFiltradas}
        currentIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onSelectIndex={(idx) => setSelectedIndex(idx)}
      />
    </section>
  );
}
