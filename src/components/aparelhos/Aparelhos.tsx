'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Dumbbell,
  HeartPulse,
  Flame,
  CheckCircle2,
  Crosshair,
  Gauge,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { ACADEMIA_DATA } from '@/data/academia';
import { isPlaceholderValue } from '@/lib/links';

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

const AUTO_SCROLL_ZONA_MS = 4200;

export function Aparelhos() {
  const { categoriasAparelhos } = ACADEMIA_DATA;
  const [activeZonaIdx, setActiveZonaIdx] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const carouselRef = useRef<HTMLDivElement | null>(null);
  const zonaRefs = useRef<Array<HTMLElement | null>>([]);

  const scrollToZona = useCallback(
    (index: number, behavior: ScrollBehavior = 'smooth') => {
      const container = carouselRef.current;
      const card = zonaRefs.current[index];
      setActiveZonaIdx(index);

      if (!container || !card) return;
      // Quando em modo carrossel horizontal (mobile/tablet < lg), centraliza no eixo X
      if (container.scrollWidth > container.clientWidth + 8) {
        const targetLeft =
          card.offsetLeft - (container.clientWidth - card.offsetWidth) / 2;
        container.scrollTo({
          left: Math.max(0, targetLeft),
          behavior,
        });
      }
    },
    []
  );

  // Sincroniza o chip ativo conforme o usuário arrasta no mobile
  const handleScroll = useCallback(() => {
    const container = carouselRef.current;
    if (!container || container.scrollWidth <= container.clientWidth + 8) {
      return;
    }

    const center = container.scrollLeft + container.clientWidth / 2;
    let closestIdx = 0;
    let minDistance = Number.POSITIVE_INFINITY;

    zonaRefs.current.forEach((card, idx) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(center - cardCenter);
      if (dist < minDistance) {
        minDistance = dist;
        closestIdx = idx;
      }
    });

    setActiveZonaIdx((prev) => (prev === closestIdx ? prev : closestIdx));
  }, []);

  // Auto-scroll suave entre zonas no mobile (pausado ao toque/hover)
  useEffect(() => {
    if (
      isPaused ||
      categoriasAparelhos.length <= 1 ||
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
      if (container.scrollWidth <= container.clientWidth + 8) return;

      const nextIdx = (activeZonaIdx + 1) % categoriasAparelhos.length;
      scrollToZona(nextIdx, 'smooth');
    }, AUTO_SCROLL_ZONA_MS);

    return () => window.clearInterval(timer);
  }, [activeZonaIdx, categoriasAparelhos.length, isPaused, scrollToZona]);

  const handlePrevZona = () => {
    const prevIdx =
      (activeZonaIdx - 1 + categoriasAparelhos.length) %
      categoriasAparelhos.length;
    scrollToZona(prevIdx, 'smooth');
  };

  const handleNextZona = () => {
    const nextIdx = (activeZonaIdx + 1) % categoriasAparelhos.length;
    scrollToZona(nextIdx, 'smooth');
  };

  return (
    <section
      id="aparelhos"
      aria-labelledby="aparelhos-heading"
      className="relative py-16 sm:py-24 bg-brand-dark border-b border-brand-dark-border overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho de Arena + Chips de Alternância Rápida */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-brand-orange">
              <Crosshair className="h-4 w-4" aria-hidden="true" />
              <span>Mapeamento de Performance</span>
            </div>
            <h2
              id="aparelhos-heading"
              className="font-display text-[clamp(2.35rem,5.5vw,4.5rem)] font-black uppercase tracking-tight text-white leading-[0.95]"
            >
              ZONAS DE <span className="text-brand-orange">TREINO</span> &
              EQUIPAMENTOS
            </h2>
            <p className="text-sm sm:text-lg text-stone-300 leading-relaxed max-w-[60ch]">
              Deslize entre as 3 zonas da arena ou toque em um setor abaixo para
              alternar imediatamente.
            </p>
          </div>

          {/* Chips de Zonas (ZONA 01, ZONA 02, ZONA 03) */}
          <div
            role="tablist"
            aria-label="Alternar rapidamente entre as zonas de treino"
            className="grid grid-cols-3 sm:flex items-center gap-2 w-full lg:w-auto"
          >
            {categoriasAparelhos.map((cat, idx) => {
              const config = ZONAS_MAP[cat.categoria];
              const ativa = activeZonaIdx === idx;
              return (
                <button
                  key={cat.categoria}
                  type="button"
                  role="tab"
                  aria-selected={ativa}
                  onClick={() => scrollToZona(idx, 'smooth')}
                  className={`btn-tactile flex min-h-[46px] flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 rounded-xl px-2.5 sm:px-4 py-2 font-display text-xs sm:text-base font-black uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${
                    ativa
                      ? 'bg-brand-orange text-black shadow-orange-glow-sm'
                      : 'border border-brand-dark-border bg-brand-dark-surface text-stone-300 hover:border-brand-orange hover:text-white'
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

        {/* Carrossel Horizontal com Snap no Mobile (< lg) -> Painéis de Arena no Desktop (lg:) */}
        <div
          className="relative"
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex lg:flex-col gap-4 lg:gap-6 overflow-x-auto lg:overflow-visible snap-x snap-mandatory no-scrollbar -mx-4 px-[6vw] lg:mx-0 lg:px-0 pb-2"
          >
            {categoriasAparelhos.map((cat, idx) => {
              const numFormatado = `0${idx + 1}`;
              const isCurrentMobile = activeZonaIdx === idx;

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
                <article
                  key={cat.categoria}
                  ref={(el) => {
                    zonaRefs.current[idx] = el;
                  }}
                  onClick={() => {
                    if (activeZonaIdx !== idx) {
                      scrollToZona(idx, 'smooth');
                    }
                  }}
                  className={`group relative w-[88vw] max-w-[460px] sm:max-w-[560px] lg:w-full lg:max-w-none shrink-0 snap-center overflow-hidden rounded-2xl border-2 bg-brand-dark-card transition-all duration-300 hover:border-brand-orange/70 ${
                    isCurrentMobile
                      ? 'border-brand-orange scale-100 opacity-100 shadow-orange-glow-sm lg:shadow-none'
                      : 'border-brand-dark-border scale-[0.96] opacity-75 lg:scale-100 lg:opacity-100'
                  }`}
                >
                  {/* Barra Técnica Superior do Painel */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-brand-dark-border bg-brand-dark-surface px-4 py-2.5 sm:px-8 sm:py-3">
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

                        {/* Numeração Display Gigante */}
                        <span
                          className="font-display text-5xl sm:text-7xl font-black leading-none tracking-tighter text-brand-orange/30 group-hover:text-brand-orange transition-colors select-none shrink-0 tabular-nums"
                          aria-hidden="true"
                        >
                          {numFormatado}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 rounded-xl border border-brand-dark-border bg-brand-dark px-3.5 py-2.5">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-orange text-black">
                          <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                          <span className="block text-[10px] font-bold uppercase tracking-widest text-stone-400">
                            Objetivo de Treino
                          </span>
                          <span className="block text-xs sm:text-sm font-bold text-white truncate">
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
                          className="flex items-start gap-2.5 rounded-xl border border-brand-dark-border bg-brand-dark-surface p-3 sm:p-4"
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
                  <div className="flex items-center justify-between border-t border-brand-dark-border/60 bg-brand-dark px-4 py-2 sm:px-8 sm:py-2.5 text-[11px] font-semibold text-stone-400">
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
                </article>
              );
            })}
          </div>

          {/* Controles Mobile do Carrossel de Zonas */}
          <div className="mt-4 flex lg:hidden items-center justify-between gap-3">
            <button
              type="button"
              onClick={handlePrevZona}
              aria-label="Zona de treino anterior"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-brand-dark-border bg-brand-dark-surface text-white active:scale-95 transition-colors hover:border-brand-orange"
            >
              <ChevronLeft className="h-5 w-5 text-brand-orange" aria-hidden="true" />
            </button>

            <div className="flex items-center gap-2">
              {categoriasAparelhos.map((cat, idx) => {
                const ativa = idx === activeZonaIdx;
                return (
                  <button
                    key={cat.categoria}
                    type="button"
                    onClick={() => scrollToZona(idx, 'smooth')}
                    aria-label={`Ir para Zona 0${idx + 1}: ${cat.categoria}`}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      ativa
                        ? 'w-8 bg-brand-orange'
                        : 'w-2.5 bg-brand-dark-border hover:bg-stone-500'
                    }`}
                  />
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleNextZona}
              aria-label="Próxima zona de treino"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-brand-dark-border bg-brand-dark-surface text-white active:scale-95 transition-colors hover:border-brand-orange"
            >
              <ChevronRight className="h-5 w-5 text-brand-orange" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
