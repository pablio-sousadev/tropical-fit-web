'use client';

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type CSSProperties,
  type KeyboardEvent,
} from 'react';
import {
  Calendar,
  Clock,
  UserCheck,
  Flame,
  Radio,
  Sparkles,
} from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { ACADEMIA_DATA } from '@/data/academia';
import { getWhatsAppUrl } from '@/lib/links';
import type { AulaColetiva } from '@/types/academia';

type DiaGrade = Exclude<AulaColetiva['diaSemana'], 'Sábado'>;
type NavDirection = 'forward' | 'backward';

const DIAS_SEMANA: Array<{
  id: DiaGrade;
  curto: string;
  completo: string;
  canal: string;
}> = [
  { id: 'Segunda', curto: 'SEG', completo: 'Segunda-feira', canal: 'DIA 01' },
  { id: 'Terça', curto: 'TER', completo: 'Terça-feira', canal: 'DIA 02' },
  { id: 'Quarta', curto: 'QUA', completo: 'Quarta-feira', canal: 'DIA 03' },
  { id: 'Quinta', curto: 'QUI', completo: 'Quinta-feira', canal: 'DIA 04' },
  { id: 'Sexta', curto: 'SEX', completo: 'Sexta-feira', canal: 'DIA 05' },
];

interface ModalidadeMeta {
  foto: string;
  tag: string;
  intensidade: string;
  nivel: 1 | 2 | 3 | 4;
}

function getModalidadeMeta(modalidade: string): ModalidadeMeta {
  const lower = modalidade.toLowerCase();
  if (lower.includes('jump')) {
    return {
      foto: '/images/estrutura/jump.jpg',
      tag: 'CARDIO EXPLOSIVO',
      intensidade: 'ALTA QUEIMA',
      nivel: 4,
    };
  }
  if (lower.includes('ritmos') || lower.includes('dance')) {
    return {
      foto: '/images/estrutura/ritmos.jpg',
      tag: 'COREOGRAFIA & RITMO',
      intensidade: 'ENERGIA MÁXIMA',
      nivel: 3,
    };
  }
  if (lower.includes('funcional')) {
    return {
      foto: '/images/estrutura/funcional.jpg',
      tag: 'FORÇA & METABÓLICO',
      intensidade: 'CONDICIONAMENTO',
      nivel: 4,
    };
  }
  if (lower.includes('judô')) {
    return {
      foto: '/images/estrutura/judo.jpg',
      tag: 'ARTES MARCIAIS',
      intensidade: 'TÉCNICA & DISCIPLINA',
      nivel: 3,
    };
  }
  if (lower.includes('step')) {
    return {
      foto: '/images/estrutura/sala-coletiva.jpg',
      tag: 'COORDENAÇÃO & AERÓBICO',
      intensidade: 'RITMO CONTÍNUO',
      nivel: 3,
    };
  }
  return {
    foto: '/images/estrutura/sala-coletiva.jpg',
    tag: 'AULA COLETIVA',
    intensidade: 'ARENA',
    nivel: 3,
  };
}

function getTurnoLabel(horario: string): string {
  const hour = Number.parseInt(horario.split(':')[0] ?? '0', 10);
  if (hour < 12) return 'Manhã';
  if (hour < 18) return 'Tarde';
  return 'Noite';
}

export function AulasColetivas() {
  const { aulas, professores, unidade } = ACADEMIA_DATA;

  const [diaAtivo, setDiaAtivo] = useState<DiaGrade>('Segunda');
  const [direction, setDirection] = useState<NavDirection>('forward');
  const [transitionKey, setTransitionKey] = useState<number>(0);
  const [hojeDia, setHojeDia] = useState<DiaGrade | null>(null);
  const [coachHighlight, setCoachHighlight] = useState<string | null>(null);

  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const panelRefs = useRef<Partial<Record<DiaGrade, HTMLDivElement | null>>>(
    {}
  );
  const scoreboardContainerRef = useRef<HTMLDivElement | null>(null);

  const activeIdx = Math.max(
    0,
    DIAS_SEMANA.findIndex((d) => d.id === diaAtivo)
  );

  // Detecta o dia atual apenas no cliente para evitar mismatch de hidratação
  useEffect(() => {
    const dayMap: Record<number, DiaGrade> = {
      1: 'Segunda',
      2: 'Terça',
      3: 'Quarta',
      4: 'Quinta',
      5: 'Sexta',
    };
    const hoje = dayMap[new Date().getDay()] ?? null;
    setHojeDia(hoje);
  }, []);

  const selectDia = useCallback(
    (nextDia: DiaGrade, options?: { keepCoachHighlight?: boolean }) => {
      if (nextDia === diaAtivo) return;
      const prevIdx = DIAS_SEMANA.findIndex((d) => d.id === diaAtivo);
      const nextIdx = DIAS_SEMANA.findIndex((d) => d.id === nextDia);
      setDirection(nextIdx >= prevIdx ? 'forward' : 'backward');
      setDiaAtivo(nextDia);
      setTransitionKey((k) => k + 1);
      if (!options?.keepCoachHighlight) {
        setCoachHighlight(null);
      }
    },
    [diaAtivo]
  );

  // Sincroniza hidden="until-found" no DOM (React serializa JSX hidden como booleano) e escuta beforematch
  useEffect(() => {
    const cleanups: Array<() => void> = [];

    for (const dia of DIAS_SEMANA) {
      const panel = panelRefs.current[dia.id];
      if (!panel) continue;

      if (dia.id === diaAtivo) {
        panel.removeAttribute('hidden');
      } else {
        panel.setAttribute('hidden', 'until-found');
      }

      const handleBeforeMatch = () => {
        selectDia(dia.id);
      };

      panel.addEventListener('beforematch', handleBeforeMatch);
      cleanups.push(() =>
        panel.removeEventListener('beforematch', handleBeforeMatch)
      );
    }

    return () => {
      for (const cleanup of cleanups) cleanup();
    };
  }, [diaAtivo, selectDia]);

  // Navegação por teclado seguindo o padrão WAI-ARIA (selection follows focus)
  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    const total = DIAS_SEMANA.length;
    let targetIndex: number | null = null;

    if (event.key === 'ArrowRight') {
      targetIndex = (index + 1) % total;
    } else if (event.key === 'ArrowLeft') {
      targetIndex = (index - 1 + total) % total;
    } else if (event.key === 'Home') {
      targetIndex = 0;
    } else if (event.key === 'End') {
      targetIndex = total - 1;
    }

    if (targetIndex === null) return;

    event.preventDefault();
    const targetDia = DIAS_SEMANA[targetIndex].id;
    selectDia(targetDia);
    tabRefs.current[targetIndex]?.focus();
  };

  const handleCoachJump = (coachNome: string) => {
    const primeiraAula = aulas.find(
      (a) => a.professor === coachNome && a.diaSemana !== 'Sábado'
    );
    if (!primeiraAula || primeiraAula.diaSemana === 'Sábado') return;

    setCoachHighlight(coachNome);
    if (primeiraAula.diaSemana !== diaAtivo) {
      selectDia(primeiraAula.diaSemana, { keepCoachHighlight: true });
    }
    scoreboardContainerRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  };

  return (
    <section
      id="aulas"
      aria-labelledby="aulas-heading"
      className="py-20 sm:py-28 bg-brand-dark border-b border-brand-dark-border"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho Estilo Scoreboard de Arena */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10 sm:mb-14">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-brand-orange">
              <Radio className="h-4 w-4" aria-hidden="true" />
              <span>Scoreboard Oficial da Arena</span>
            </div>
            <h2
              id="aulas-heading"
              className="font-display text-[clamp(2.5rem,5vw,4.25rem)] font-black uppercase tracking-tight text-white leading-[0.93]"
            >
              HORÁRIO DE <span className="text-brand-orange">AULAS</span> DA
              SEMANA
            </h2>
            <p className="text-base sm:text-lg text-stone-300 leading-relaxed">
              Programação oficial da {unidade.unidade}. Navegue pelos dias no
              seletor abaixo e garanta sua presença com nossos professores.
            </p>
          </div>

          {/* Seletor Segmentado com Pílula Deslizante + Indicador Anchor-Positioned */}
          <div className="w-full lg:w-auto lg:shrink-0 space-y-2.5">
            <div className="rounded-2xl border border-white/10 bg-brand-dark-card/90 p-1.5 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <div
                role="tablist"
                aria-label="Selecionar dia da semana no placar"
                style={{ '--active-tab-idx': activeIdx } as CSSProperties}
                className="aulas-tablist grid grid-cols-5"
              >
                {/* Pílula deslizante decorativa (GPU compositor transform) */}
                <span
                  aria-hidden="true"
                  className="aulas-tab-pill pointer-events-none absolute inset-y-0 left-0 w-1/5 p-0.5"
                >
                  <span className="block h-full w-full rounded-xl bg-gradient-to-b from-brand-orange to-[#E85D04] shadow-orange-glow-sm" />
                </span>

                {DIAS_SEMANA.map((dia, index) => {
                  const isSelected = diaAtivo === dia.id;
                  const isHoje = hojeDia === dia.id;

                  return (
                    <button
                      key={dia.id}
                      ref={(el) => {
                        tabRefs.current[index] = el;
                      }}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      tabIndex={isSelected ? 0 : -1}
                      id={`tab-aulas-${dia.id}`}
                      onClick={() => selectDia(dia.id)}
                      onKeyDown={(e) => handleTabKeyDown(e, index)}
                      className={`aulas-tab relative z-10 flex min-h-[56px] sm:min-w-[88px] flex-col items-center justify-center rounded-xl px-1.5 sm:px-3.5 pt-2 pb-3 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow ${
                        isSelected
                          ? 'text-black'
                          : 'text-stone-300 hover:text-white'
                      }`}
                    >
                      <span
                        className={`hidden sm:inline-flex items-center gap-1 whitespace-nowrap text-[10px] font-bold uppercase tracking-widest leading-none mb-1 ${
                          isSelected ? 'text-black/80' : 'text-stone-400'
                        }`}
                      >
                        {isHoje ? (
                          <>
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                isSelected
                                  ? 'bg-black'
                                  : 'bg-brand-orange animate-pulse'
                              }`}
                              aria-hidden="true"
                            />
                            <span>HOJE</span>
                          </>
                        ) : (
                          dia.canal
                        )}
                      </span>

                      <span className="font-display text-base sm:text-lg font-black uppercase tracking-wider leading-none flex items-center gap-1">
                        <span className="sm:hidden">{dia.curto}</span>
                        <span className="hidden sm:inline">{dia.id}</span>
                        {isHoje && (
                          <span
                            className={`sm:hidden h-1.5 w-1.5 rounded-full ${
                              isSelected ? 'bg-black' : 'bg-brand-orange'
                            }`}
                            aria-label="(Hoje)"
                          />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {hojeDia && hojeDia !== diaAtivo && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => selectDia(hojeDia)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-brand-orange/35 bg-brand-orange/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-orange hover:bg-brand-orange/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                >
                  <Sparkles className="h-3 w-3" aria-hidden="true" />
                  <span>Ver aulas de hoje ({hojeDia})</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Painéis do Scoreboard (todos na mesma célula de grid para compatibilidade com hidden="until-found") */}
        <div
          ref={scoreboardContainerRef}
          className="grid grid-cols-1 mb-12"
        >
          {DIAS_SEMANA.map((dia) => {
            const isSelected = diaAtivo === dia.id;
            const aulasDoDia = aulas.filter(
              (aula) => aula.diaSemana === dia.id
            );

            return (
              <div
                key={dia.id}
                ref={(el) => {
                  panelRefs.current[dia.id] = el;
                }}
                id={`painel-aulas-${dia.id}`}
                role="tabpanel"
                aria-labelledby={`tab-aulas-${dia.id}`}
                tabIndex={isSelected ? 0 : undefined}
                hidden={!isSelected}
                className={`col-start-1 row-start-1 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${
                  isSelected
                    ? 'relative z-10 pointer-events-auto'
                    : 'z-0 pointer-events-none'
                }`}
              >
                {/* Wrapper visual interno com React Bits SpotlightCard + entrada direcional com cross-blur */}
                <SpotlightCard
                  key={`${dia.id}-${isSelected ? transitionKey : 'idle'}`}
                  spotlightColor="#FF6B00"
                  intensity={0.14}
                  spotlightSize={380}
                  softness={0.75}
                  borderGlow={0.75}
                  proximity={90}
                  smoothing={0.28}
                  grain={0.04}
                  surfaceColor="#141210"
                  borderColor="rgba(255, 255, 255, 0.1)"
                  className={`rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_25px_50px_-12px_rgba(0,0,0,0.7)] ${
                    isSelected
                      ? direction === 'forward'
                        ? 'aulas-panel-forward'
                        : 'aulas-panel-backward'
                      : ''
                  }`}
                >
                  {/* Barra de Status do Placar */}
                  <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-brand-dark-surface/90 px-5 py-3.5 sm:px-8 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <span
                        className="h-2.5 w-2.5 rounded-full bg-brand-orange shadow-[0_0_10px_rgba(255,107,0,0.85)]"
                        aria-hidden="true"
                      />
                      <h3 className="font-display text-lg sm:text-2xl font-black uppercase tracking-wider text-white">
                        PLACAR DE {dia.completo.toUpperCase()}
                      </h3>
                      {hojeDia === dia.id && (
                        <span className="rounded-full bg-brand-orange/15 border border-brand-orange/40 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-brand-orange">
                          HOJE
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="rounded-lg bg-brand-dark/90 px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-brand-orange border border-white/10 tabular-nums">
                        {aulasDoDia.length}{' '}
                        {aulasDoDia.length === 1
                          ? 'SESSÃO ATIVA'
                          : 'SESSÕES ATIVAS'}
                      </span>
                    </div>
                  </div>

                  {/* Linhas do Scoreboard */}
                  <div className="relative z-10 divide-y divide-white/[0.06]">
                    {aulasDoDia.map((aula, idx) => {
                      const meta = getModalidadeMeta(aula.modalidade);
                      const turno = getTurnoLabel(aula.horario);
                      const isCoachMatched =
                        coachHighlight !== null &&
                        aula.professor === coachHighlight;

                      const aulaWhatsAppUrl = getWhatsAppUrl(
                        unidade.whatsapp,
                        `Olá! Quero saber mais sobre a aula de ${aula.modalidade} (${dia.completo}, às ${aula.horario}h) na Tropical Fit - Unidade Água Quente.`
                      );

                      return (
                        <article
                          key={aula.id}
                          style={{ '--row-index': idx } as CSSProperties}
                          className={`group grid grid-cols-1 md:grid-cols-12 items-center gap-4 sm:gap-6 p-5 sm:p-7 transition-colors hover:bg-white/[0.025] ${
                            isSelected ? 'aulas-row-stagger' : ''
                          } ${
                            isCoachMatched
                              ? 'bg-brand-orange/[0.07] ring-1 ring-inset ring-brand-orange/40'
                              : ''
                          }`}
                        >
                          {/* Horário Digital de Arena + Miniatura da Modalidade (4 cols) */}
                          <div className="md:col-span-4 flex items-center gap-3.5">
                            <span className="font-mono text-xs font-bold text-stone-500 tabular-nums">
                              0{idx + 1}
                            </span>
                            <div className="relative h-12 w-12 sm:h-14 sm:w-14 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black">
                              <img
                                src={meta.foto}
                                alt={aula.modalidade}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                              />
                              <div
                                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="flex flex-col items-start gap-1">
                              <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-xl border border-brand-orange bg-gradient-to-b from-brand-orange to-[#E85D04] px-3 py-1.5 sm:px-3.5 sm:py-2 text-black shadow-orange-glow-sm">
                                <Clock
                                  className="h-4 w-4 shrink-0 stroke-[2.5]"
                                  aria-hidden="true"
                                />
                                <span className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight leading-none tabular-nums">
                                  {aula.horario}H
                                </span>
                              </div>
                              <span className="pl-1 text-[10px] font-bold uppercase tracking-widest text-stone-400">
                                Turno {turno}
                              </span>
                            </div>
                          </div>

                          {/* Modalidade, Badge Esportiva e Barra Cinética de Intensidade (5 cols) */}
                          <div className="md:col-span-5 space-y-2">
                            <div className="flex flex-wrap items-center gap-2.5">
                              <span className="rounded-md bg-brand-orange/15 border border-brand-orange/30 px-2.5 py-0.5 font-display text-xs font-black uppercase tracking-widest text-brand-orange">
                                {meta.tag}
                              </span>

                              {/* Indicador visual de intensidade (4 barras) */}
                              <div
                                className="inline-flex items-center gap-1.5"
                                aria-label={`Intensidade: ${meta.intensidade} (${meta.nivel} de 4)`}
                              >
                                <span className="inline-flex items-end gap-0.5 h-3">
                                  {[1, 2, 3, 4].map((bar) => (
                                    <span
                                      key={bar}
                                      className={`w-1 rounded-full transition-colors ${
                                        bar <= meta.nivel
                                          ? 'bg-brand-orange'
                                          : 'bg-stone-700'
                                      }`}
                                      style={{ height: `${bar * 3}px` }}
                                      aria-hidden="true"
                                    />
                                  ))}
                                </span>
                                <span className="text-[11px] font-bold uppercase tracking-widest text-stone-400">
                                  {meta.intensidade}
                                </span>
                              </div>
                            </div>

                            <h4 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-white leading-none group-hover:text-brand-orange transition-colors">
                              {aula.modalidade}
                            </h4>
                          </div>

                          {/* Professor + Micro-CTA para WhatsApp (3 cols) */}
                          <div className="md:col-span-3 flex flex-wrap md:flex-col items-center md:items-end justify-between gap-2.5">
                            {aula.professor ? (
                              <div className="inline-flex items-center gap-2.5 rounded-xl border border-brand-yellow/35 bg-brand-dark/90 px-3.5 py-2">
                                <UserCheck
                                  className="h-4 w-4 text-brand-yellow shrink-0"
                                  aria-hidden="true"
                                />
                                <div>
                                  <span className="block text-[10px] font-bold uppercase tracking-widest text-stone-400">
                                    Comando da Aula
                                  </span>
                                  <span className="font-display text-lg font-black uppercase tracking-wide text-brand-yellow leading-tight">
                                    {aula.professor}
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <div className="inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-brand-dark/90 px-3.5 py-2">
                                <Flame
                                  className="h-4 w-4 text-brand-orange shrink-0"
                                  aria-hidden="true"
                                />
                                <div>
                                  <span className="block text-[10px] font-bold uppercase tracking-widest text-stone-400">
                                    Comando da Aula
                                  </span>
                                  <span className="font-display text-base font-black uppercase tracking-wide text-stone-200 leading-tight">
                                    Instrutor Oficial
                                  </span>
                                </div>
                              </div>
                            )}

                            <a
                              href={aulaWhatsAppUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="t-learn inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-stone-300 hover:border-brand-orange/60 hover:bg-brand-orange/15 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                            >
                              <span>Quero essa aula</span>
                              <span className="t-learn-chevron" aria-hidden="true">
                                <svg
                                  viewBox="0 0 16 16"
                                  className="h-3.5 w-3.5 text-brand-orange"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path
                                    className="t-learn-arm t-learn-arm-top"
                                    d="M6 4L10 8"
                                  />
                                  <path
                                    className="t-learn-arm t-learn-arm-bot"
                                    d="M10 8L6 12"
                                  />
                                </svg>
                              </span>
                            </a>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </SpotlightCard>
              </div>
            );
          })}
        </div>

        {/* Escalação de Professores Interativa com React Bits SpotlightCard */}
        <div className="rounded-2xl border border-white/10 bg-brand-dark-surface/90 p-6 sm:p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  <span>Escalação Oficial</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                  PROFESSORES DAS COLETIVAS
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-stone-300">
                Clique em um professor para localizar os dias e horários dele no
                placar.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              {professores.map((prof) => {
                const qtdAulas = aulas.filter(
                  (a) => a.professor === prof.nome
                ).length;
                const isHighlighted = coachHighlight === prof.nome;

                return (
                  <SpotlightCard
                    key={prof.nome}
                    as="button"
                    type="button"
                    onClick={() => handleCoachJump(prof.nome)}
                    spotlightColor="#FF6B00"
                    intensity={0.18}
                    spotlightSize={220}
                    borderGlow={0.85}
                    proximity={60}
                    smoothing={0.25}
                    flare
                    surfaceColor={
                      isHighlighted ? 'rgba(255, 107, 0, 0.14)' : '#141210'
                    }
                    borderColor={
                      isHighlighted
                        ? 'rgba(255, 107, 0, 0.7)'
                        : 'rgba(255, 255, 255, 0.1)'
                    }
                    className={`btn-tactile text-left flex items-center justify-between gap-4 rounded-xl px-4 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${
                      isHighlighted ? 'shadow-orange-glow-sm' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-b from-brand-orange to-[#E85D04] font-display text-lg font-black uppercase text-black shadow-orange-glow-sm">
                        {prof.nome.replace('Prof. ', '').slice(0, 2)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-display text-xl font-black uppercase tracking-wide text-white">
                          {prof.nome}
                        </p>
                        <p className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                          {prof.modalidades.join(' · ')}
                        </p>
                      </div>
                    </div>
                    <span className="shrink-0 rounded-lg border border-white/10 bg-brand-dark px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-stone-300 tabular-nums">
                      {qtdAulas} {qtdAulas === 1 ? 'aula/sem' : 'aulas/sem'}
                    </span>
                  </SpotlightCard>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
