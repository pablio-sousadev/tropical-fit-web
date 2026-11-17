'use client';

import { useState, useEffect, useCallback } from 'react';
import { Expand, Camera } from 'lucide-react';
import { ACADEMIA_DATA } from '@/data/academia';
import { useCarouselTrack } from '@/lib/useCarouselTrack';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { CarouselControls } from '@/components/ui/CarouselControls';
import type { CategoriaFoto } from '@/types/academia';
import { Lightbox } from './Lightbox';

const CATEGORIAS_FILTRO: Array<'Todas' | CategoriaFoto> = [
  'Todas',
  'Musculação',
  'Cardio',
  'Sala Coletiva',
  'Recepção',
];

export function Galeria() {
  const { fotos, unidade } = ACADEMIA_DATA;
  const [categoriaAtiva, setCategoriaAtiva] = useState<'Todas' | CategoriaFoto>(
    'Todas'
  );
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const fotosFiltradas =
    categoriaAtiva === 'Todas'
      ? fotos
      : fotos.filter((foto) => foto.categoria === categoriaAtiva);

  const getSlideLabel = useCallback(
    (idx: number, total: number) =>
      `Foto ${idx + 1} de ${total}: ${fotosFiltradas[idx]?.titulo ?? ''}`,
    [fotosFiltradas]
  );

  const {
    trackRef,
    regionRef,
    itemRefs,
    activeIndex,
    setHoverOrTouchPaused,
    isDragging,
    announcement,
    scrollToIndex,
    handlePrev,
    handleNext,
    resetToFirst,
    consumeWasDragged,
    trackPointerHandlers,
  } = useCarouselTrack({
    itemCount: fotosFiltradas.length,
    autoplayMs: 3800,
    isPausedByModal: selectedIndex !== null,
    onSlideLabel: getSlideLabel,
  });

  useEffect(() => {
    resetToFirst();
  }, [categoriaAtiva, resetToFirst]);

  return (
    <section
      id="estrutura"
      aria-labelledby="estrutura-heading"
      className="py-16 sm:py-24 bg-brand-dark border-b border-brand-dark-border overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div className="space-y-2.5 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-brand-orange">
              <Camera className="h-4 w-4" aria-hidden="true" />
              <span>Tour pela Arena</span>
            </div>
            <h2
              id="estrutura-heading"
              className="font-display text-[clamp(2.35rem,5vw,4.25rem)] font-black uppercase tracking-tight text-white leading-[0.93]"
            >
              ESTRUTURA DE <span className="text-brand-orange">IMPACTO</span>{' '}
              PARA O SEU TREINO
            </h2>
            <p className="text-sm sm:text-lg text-stone-300 leading-relaxed">
              Arraste com o dedo ou mouse para explorar os ambientes da{' '}
              {unidade.unidade} e clique em qualquer foto para ampliar.
            </p>
          </div>

          {/* Filtro por Categoria de Ambiente */}
          <div
            role="tablist"
            aria-label="Filtrar fotos por ambiente da academia"
            className="flex max-w-full lg:shrink-0 items-center gap-1 overflow-x-auto no-scrollbar rounded-2xl border border-white/10 bg-brand-dark-card/90 p-1.5 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
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
                  className={`btn-tactile inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-xl px-3 sm:px-3.5 py-2 font-display text-xs sm:text-sm font-black uppercase tracking-wider whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${
                    isSelected
                      ? 'bg-gradient-to-b from-brand-orange to-[#E85D04] text-black shadow-orange-glow-sm'
                      : 'text-stone-300 hover:bg-white/[0.04] hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Região do Carrossel Interativo com Drag Fluido e Hints de Borda */}
        <div
          ref={regionRef}
          role="region"
          aria-roledescription="carrossel"
          aria-label="Fotos da estrutura da academia"
          className="relative"
          onTouchStart={() => setHoverOrTouchPaused(true)}
          onTouchEnd={() => setHoverOrTouchPaused(false)}
          onMouseEnter={() => setHoverOrTouchPaused(true)}
          onMouseLeave={() => setHoverOrTouchPaused(false)}
        >
          <div
            ref={trackRef}
            data-dragging={isDragging ? 'true' : undefined}
            {...trackPointerHandlers}
            className="arena-carousel-track gap-4 sm:gap-6 no-scrollbar -mx-4 px-[2rem] sm:mx-0 sm:px-[2.75rem] py-2 cursor-grab select-none"
          >
            {fotosFiltradas.map((foto, index) => {
              const isCurrent = activeIndex === index;

              return (
                <div
                  key={foto.id}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} de ${fotosFiltradas.length}`}
                  className="w-[78vw] sm:w-[48%] lg:w-[38%] xl:w-[35%] max-w-[440px] shrink-0 snap-center first:snap-start last:snap-end"
                >
                  <SpotlightCard
                    as="button"
                    type="button"
                    onClick={() => {
                      if (consumeWasDragged()) return;
                      setSelectedIndex(index);
                    }}
                    aria-label={`Ampliar foto: ${foto.titulo} (${foto.categoria})`}
                    spotlightColor="#FF6B00"
                    intensity={0.14}
                    spotlightSize={280}
                    softness={0.75}
                    borderGlow={isCurrent ? 0.9 : 0.65}
                    proximity={70}
                    smoothing={0.28}
                    grain={0.03}
                    surfaceColor="#141210"
                    borderColor={
                      isCurrent
                        ? 'rgba(255, 107, 0, 0.7)'
                        : 'rgba(255, 255, 255, 0.1)'
                    }
                    className={`group flex w-full flex-col rounded-2xl text-left transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${
                      isCurrent
                        ? 'scale-100 opacity-100'
                        : 'scale-[0.97] opacity-85 hover:opacity-100'
                    }`}
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-dark">
                      <img
                        src={foto.url}
                        alt={foto.alt}
                        loading="lazy"
                        draggable={false}
                        width={600}
                        height={375}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                      <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent"
                        aria-hidden="true"
                      />

                      {/* Selo de Categoria */}
                      <span className="absolute top-3 left-3 rounded-md bg-brand-dark/90 px-2.5 py-1 font-display text-xs font-black uppercase tracking-widest text-brand-orange border border-brand-orange/40 backdrop-blur-sm">
                        {foto.categoria}
                      </span>

                      {/* Ícone de Zoom */}
                      <span
                        className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-orange text-black opacity-90 shadow-orange-glow-sm transition-transform duration-200 group-hover:scale-105"
                        aria-hidden="true"
                      >
                        <Expand className="h-4 w-4" />
                      </span>

                      {/* Título do Ambiente (sem legenda descritiva redundante) */}
                      <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5">
                        <h3 className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight text-white group-hover:text-brand-orange transition-colors">
                          {foto.titulo}
                        </h3>
                      </div>
                    </div>
                  </SpotlightCard>
                </div>
              );
            })}
          </div>

          {/* Anúncio acessível ao estabilizar slide */}
          <p className="sr-only" role="status" aria-live="polite">
            {announcement}
          </p>

          {/* Controles unificados (Mobile + Desktop) */}
          <CarouselControls
            total={fotosFiltradas.length}
            activeIndex={activeIndex}
            onPrev={handlePrev}
            onNext={handleNext}
            onSelect={(idx) => scrollToIndex(idx)}
            getMarkerLabel={(idx) =>
              `Ver foto ${idx + 1}: ${fotosFiltradas[idx]?.titulo ?? ''}`
            }
            prevLabel="Foto anterior da estrutura"
            nextLabel="Próxima foto da estrutura"
            markersNavLabel="Escolher foto da estrutura"
          />
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
