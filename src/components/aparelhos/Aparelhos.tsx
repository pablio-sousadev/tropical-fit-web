'use client';

import { useCallback, type CSSProperties } from 'react';
import {
  Dumbbell,
  HeartPulse,
  Flame,
  CheckCircle2,
  Crosshair,
  Gauge,
} from 'lucide-react';
import { ACADEMIA_DATA } from '@/data/academia';
import { isPlaceholderValue } from '@/lib/links';
import { useCarouselTrack } from '@/lib/useCarouselTrack';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { CarouselControls } from '@/components/ui/CarouselControls';

interface ZonaConfig {
  codigo: string;
  chipLabel: string;
  tituloArena: string;
  subtituloTecnico: string;
  focoFisiologico: string;
  intensidade: string;
  icone: typeof Dumbbell;
  equipamentosBase: string[];
}

const ZONAS_MAP: Record<string, ZonaConfig> = {
  'Musculação / Peso Livre': {
    codigo: 'ZONA 01',
    chipLabel: 'ZONA 01 · MUSCULAÇÃO',
    tituloArena: 'ZONA 01 // FORÇA BRUTA & MUSCULAÇÃO',
    subtituloTecnico: 'HIPERTROFIA · CARGA LIVRE · BIOMECÂNICA DE PRECISÃO',
    focoFisiologico: 'Força Máxima & Densidade Muscular',
    intensidade: 'ALTA CARGA',
    icone: Dumbbell,
    equipamentosBase: [
      'Máquinas articuladas e guiadas para grandes e pequenos grupamentos',
      'Setor de peso livre com halteres pareados, barras olímpicas e anilhas',
      'Gaiolas de agachamento, bancos reguláveis e estações de supino',
      'Polias duplas (crossover), puxadores altos e remadas anatômicas',
    ],
  },
  Cardio: {
    codigo: 'ZONA 02',
    chipLabel: 'ZONA 02 · CARDIO',
    tituloArena: 'ZONA 02 // CARDIO & METABÓLICO',
    subtituloTecnico: 'RESISTÊNCIA AERÓBICA · QUEIMA CALÓRICA · HIIT',
    focoFisiologico: 'Condicionamento Cardiovascular & Definição',
    intensidade: 'RITMO CONTÍNUO',
    icone: HeartPulse,
    equipamentosBase: [
      'Esteiras profissionais para corrida intensa e caminhada inclinada',
      'Bicicletas ergométricas e spinning para treinos intervalados',
      'Elípticos sincronizados para aeróbico sem sobrecarga articular',
      'Corredor de cardio ventilado com visão ampla da arena',
    ],
  },
  'Funcional / Coletivas': {
    codigo: 'ZONA 03',
    chipLabel: 'ZONA 03 · COLETIVAS',
    tituloArena: 'ZONA 03 // ARENA COLETIVA & FUNCIONAL',
    subtituloTecnico: 'EXPLOSÃO · AGILIDADE · AULAS GUIADAS POR PROFESSORES',
    focoFisiologico: 'Potência Atlética, Coordenação & Gasto Energético',
    intensidade: 'EXPLOSIVO',
    icone: Flame,
    equipamentosBase: [
      'Arena dedicada para Jump, Ritmos / Fit Dance, Funcional, Judô e Step',
      'Mini trampolins reforçados para sessões de Jump de alta queima',
      'Steps modulares, tatame para artes marciais, cones e cordas',
      'Acústica e iluminação preparadas para puxar o ritmo da turma',
    ],
  },
};

export function Aparelhos() {
  const { categoriasAparelhos } = ACADEMIA_DATA;

  const getZonaLabel = useCallback(
    (idx: number, total: number) =>
      `Zona ${idx + 1} de ${total}: ${categoriasAparelhos[idx]?.categoria ?? ''}`,
    [categoriasAparelhos]
  );

  const {
    trackRef,
    regionRef,
    itemRefs,
    activeIndex: activeZonaIdx,
    setHoverOrTouchPaused,
    isDragging,
    announcement,
    scrollToIndex,
    handlePrev,
    handleNext,
    consumeWasDragged,
    trackPointerHandlers,
  } = useCarouselTrack({
    itemCount: categoriasAparelhos.length,
    onSlideLabel: getZonaLabel,
  });

  return (
    <section
      id="aparelhos"
      aria-labelledby="aparelhos-heading"
      className="relative py-16 sm:py-24 bg-brand-dark border-b border-brand-dark-border overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho de Arena + Seletor Segmentado com Pílula Deslizante */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div className="space-y-2.5 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-brand-orange">
              <Crosshair className="h-4 w-4" aria-hidden="true" />
              <span>Mapeamento de Performance</span>
            </div>
            <h2
              id="aparelhos-heading"
              className="font-display text-[clamp(2.35rem,5vw,4.25rem)] font-black uppercase tracking-tight text-white leading-[0.95]"
            >
              ZONAS DE <span className="text-brand-orange">TREINO</span> &
              EQUIPAMENTOS
            </h2>
            <p className="text-sm sm:text-lg text-stone-300 leading-relaxed max-w-[60ch]">
              Arraste com o dedo ou mouse entre as 3 zonas da arena ou selecione
              um setor ao lado.
            </p>
          </div>

          {/* Seletor Deslizante de Zonas (transitions.dev #16) */}
          <div className="w-full lg:w-auto lg:shrink-0 rounded-2xl border border-white/10 bg-brand-dark-card/90 p-1.5 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <div
              role="tablist"
              aria-label="Alternar rapidamente entre as zonas de treino"
              style={{ '--active-tab-idx': activeZonaIdx } as CSSProperties}
              className="relative grid grid-cols-3"
            >
              <span
                aria-hidden="true"
                className="aulas-tab-pill pointer-events-none absolute inset-y-0 left-0 w-1/3 p-0.5"
              >
                <span className="block h-full w-full rounded-xl bg-gradient-to-b from-brand-orange to-[#E85D04] shadow-orange-glow-sm" />
              </span>

              {categoriasAparelhos.map((cat, idx) => {
                const config = ZONAS_MAP[cat.categoria];
                const ativa = activeZonaIdx === idx;
                return (
                  <button
                    key={cat.categoria}
                    type="button"
                    role="tab"
                    aria-selected={ativa}
                    onClick={() => scrollToIndex(idx)}
                    className={`relative z-10 flex min-h-[46px] items-center justify-center rounded-xl px-2.5 sm:px-4 py-2 font-display text-xs sm:text-sm font-black uppercase tracking-wider whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow ${
                      ativa ? 'text-black' : 'text-stone-300 hover:text-white'
                    }`}
                  >
                    <span className="sm:hidden">ZONA 0{idx + 1}</span>
                    <span className="hidden sm:inline">
                      {config?.chipLabel ?? `ZONA 0${idx + 1} · ${cat.categoria}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Carrossel Interativo Unificado (Mobile + Tablet + Desktop) com Drag e SpotlightCard */}
        <div
          ref={regionRef}
          role="region"
          aria-roledescription="carrossel"
          aria-label="Zonas de treino e equipamentos"
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
            {categoriasAparelhos.map((cat, idx) => {
              const numFormatado = `0${idx + 1}`;
              const isCurrent = activeZonaIdx === idx;

              const config = ZONAS_MAP[cat.categoria] ?? {
                codigo: `ZONA ${numFormatado}`,
                chipLabel: `ZONA ${numFormatado}`,
                tituloArena: `ZONA ${numFormatado} // ${cat.categoria.toUpperCase()}`,
                subtituloTecnico: 'ESTRUTURA DE ALTA PERFORMANCE',
                focoFisiologico: cat.descricao,
                intensidade: 'ALTA PERFORMANCE',
                icone: Dumbbell,
                equipamentosBase: cat.itens,
              };

              const Icon = config.icone;
              const usaPlaceholder = cat.itens.every((i) =>
                isPlaceholderValue(i)
              );
              const listaItens = usaPlaceholder
                ? config.equipamentosBase
                : cat.itens;

              return (
                <div
                  key={cat.categoria}
                  ref={(el) => {
                    itemRefs.current[idx] = el;
                  }}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${idx + 1} de ${categoriasAparelhos.length}`}
                  onClick={() => {
                    if (consumeWasDragged()) return;
                    if (activeZonaIdx !== idx) {
                      scrollToIndex(idx);
                    }
                  }}
                  className={`w-[86vw] sm:w-[82vw] lg:w-[82%] max-w-[920px] shrink-0 snap-center transition-all duration-300 ${
                    isCurrent
                      ? 'scale-100 opacity-100'
                      : 'scale-[0.97] opacity-80 hover:opacity-100 cursor-pointer'
                  }`}
                >
                  <SpotlightCard
                    spotlightColor="#FF6B00"
                    intensity={0.14}
                    spotlightSize={360}
                    softness={0.75}
                    borderGlow={isCurrent ? 0.9 : 0.6}
                    proximity={80}
                    smoothing={0.28}
                    grain={0.04}
                    surfaceColor="#141210"
                    borderColor={
                      isCurrent
                        ? 'rgba(255, 107, 0, 0.65)'
                        : 'rgba(255, 255, 255, 0.1)'
                    }
                    className={`group rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_25px_50px_-12px_rgba(0,0,0,0.7)] ${
                      isCurrent ? 'shadow-orange-glow-sm' : ''
                    }`}
                  >
                    {/* Barra Técnica Superior do Painel */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-brand-dark-surface/90 px-4 py-2.5 sm:px-8 sm:py-3 backdrop-blur-sm">
                      <div className="flex items-center gap-2.5">
                        <span className="inline-flex items-center rounded bg-brand-orange px-2.5 py-0.5 font-display text-xs font-black uppercase tracking-widest text-black">
                          {config.codigo}
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-widest text-stone-400 truncate max-w-[200px] sm:max-w-none">
                          {config.subtituloTecnico}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-yellow">
                        <Gauge className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>{config.intensidade}</span>
                      </div>
                    </div>

                    {/* Corpo do Painel de Arena */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 p-5 sm:p-7 lg:p-8 items-center">
                      {/* Bloco Identificador da Zona (5 cols) */}
                      <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1.5">
                            <h3 className="font-display text-2xl sm:text-4xl font-black uppercase leading-[0.95] tracking-tight text-white">
                              {config.tituloArena}
                            </h3>
                            <p className="text-xs sm:text-base text-stone-300 leading-relaxed">
                              {cat.descricao}
                            </p>
                          </div>

                          <span
                            className="font-display text-5xl sm:text-7xl font-black leading-none tracking-tighter text-brand-orange/30 group-hover:text-brand-orange transition-colors select-none shrink-0 tabular-nums"
                            aria-hidden="true"
                          >
                            {numFormatado}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-brand-dark/90 px-3.5 py-2.5">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-orange text-black shadow-orange-glow-sm">
                            <Icon
                              className="h-4 w-4 sm:h-5 sm:w-5"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="min-w-0">
                            <span className="block text-[10px] font-bold uppercase tracking-widest text-stone-400">
                              Objetivo de Treino
                            </span>
                            <span className="block text-xs sm:text-sm font-bold text-white leading-snug">
                              {config.focoFisiologico}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Lista Técnica de Equipamentos (7 cols) */}
                      <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
                        {listaItens.map((item, itemIdx) => (
                          <div
                            key={item}
                            className="btn-tactile flex items-start gap-2.5 rounded-xl border border-white/10 bg-brand-dark-surface/90 p-3 sm:p-4 hover:border-brand-orange/45"
                          >
                            <div className="flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded bg-brand-orange/15 font-display text-xs font-black text-brand-orange tabular-nums">
                              0{itemIdx + 1}
                            </div>
                            <p className="text-xs sm:text-sm font-medium text-stone-200 leading-snug">
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Rodapé do Painel */}
                    <div className="flex items-center justify-between border-t border-white/10 bg-brand-dark/80 px-4 py-2 sm:px-8 sm:py-2.5 text-[11px] font-semibold text-stone-400">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2
                          className="h-3.5 w-3.5 text-brand-orange shrink-0"
                          aria-hidden="true"
                        />
                        <span>Incluso em todos os planos</span>
                      </span>
                      <span className="uppercase tracking-widest text-stone-500">
                        SETOR #{numFormatado}
                      </span>
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
            total={categoriasAparelhos.length}
            activeIndex={activeZonaIdx}
            onPrev={handlePrev}
            onNext={handleNext}
            onSelect={(idx) => scrollToIndex(idx)}
            getMarkerLabel={(idx) =>
              `Ver zona ${idx + 1}: ${categoriasAparelhos[idx]?.categoria ?? ''}`
            }
            prevLabel="Zona de treino anterior"
            nextLabel="Próxima zona de treino"
            markersNavLabel="Escolher zona de treino"
          />
        </div>
      </div>
    </section>
  );
}
