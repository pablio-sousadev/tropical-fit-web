'use client';

import { useState } from 'react';
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

interface ZonaConfig {
  codigo: string;
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
    tituloArena: 'ZONA 01 // FORÇA BRUTA & MUSCULAÇÃO',
    subtituloTecnico: 'HIPERTROFIA · CARGA LIVRE · BIOMECÂNICA DE PRECISÃO',
    focoFisiologico: 'Força Máxima & Densidade Muscular',
    intensidade: 'ALTA CARGA',
    icone: Dumbbell,
    equipamentosBase: [
      'Máquinas articuladas e guiadas para isolamento de grandes e pequenos grupamentos',
      'Setor de peso livre com halteres pareados, barras olímpicas e anilhas calibradas',
      'Gaiolas de agachamento, bancos reguláveis e estações de supino',
      'Polias duplas (crossover), puxadores altos e remadas com pegadas anatômicas',
    ],
  },
  Cardio: {
    codigo: 'ZONA 02',
    tituloArena: 'ZONA 02 // CARDIO & METABÓLICO',
    subtituloTecnico: 'RESISTÊNCIA AERÓBICA · QUEIMA CALÓRICA · HIIT',
    focoFisiologico: 'Condicionamento Cardiovascular & Definição',
    intensidade: 'RITMO CONTÍNUO',
    icone: HeartPulse,
    equipamentosBase: [
      'Esteiras profissionais de alto impacto para corrida intensa e caminhada inclinada',
      'Bicicletas ergométricas e spinning para treinos intervalados de alta rotação',
      'Elípticos sincronizados para trabalho aeróbico sem sobrecarga articular',
      'Corredor de cardio ventilado com visão ampla da arena de treino',
    ],
  },
  'Funcional / Coletivas': {
    codigo: 'ZONA 03',
    tituloArena: 'ZONA 03 // ARENA COLETIVA & FUNCIONAL',
    subtituloTecnico: 'EXPLOSÃO · AGILIDADE · AULAS GUIADAS POR PROFESSORES',
    focoFisiologico: 'Potência Atlética, Coordenação & Gasto Energético',
    intensidade: 'EXPLOSIVO',
    icone: Flame,
    equipamentosBase: [
      'Arena dedicada para Jump, Ritmos / Fit Dance, Funcional, Judô e Step',
      'Mini trampolins reforçados para sessões de Jump de alta queima calórica',
      'Steps modulares, tatame para artes marciais, cones, cordas e acessórios',
      'Acústica e iluminação preparadas para puxar o ritmo do início ao fim',
    ],
  },
};

export function Aparelhos() {
  const { categoriasAparelhos } = ACADEMIA_DATA;
  const [zonaSelecionada, setZonaSelecionada] = useState<string>('TODAS');

  const opcoesFiltro = [
    { id: 'TODAS', label: 'VISÃO GERAL DA ARENA' },
    ...categoriasAparelhos.map((cat, idx) => ({
      id: cat.categoria,
      label: `ZONA 0${idx + 1} · ${cat.categoria.split('/')[0].trim()}`,
    })),
  ];

  const categoriasVisiveis =
    zonaSelecionada === 'TODAS'
      ? categoriasAparelhos
      : categoriasAparelhos.filter((c) => c.categoria === zonaSelecionada);

  return (
    <section
      id="aparelhos"
      aria-labelledby="aparelhos-heading"
      className="relative py-20 sm:py-28 bg-brand-dark border-b border-brand-dark-border overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho de Arena */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-16">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-brand-orange">
              <Crosshair className="h-4 w-4" aria-hidden="true" />
              <span>Mapeamento de Performance</span>
            </div>
            <h2
              id="aparelhos-heading"
              className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-black uppercase tracking-tight text-white leading-[0.95]"
            >
              ZONAS DE <span className="text-brand-orange">TREINO</span> &
              EQUIPAMENTOS
            </h2>
            <p className="text-base sm:text-lg text-stone-300 leading-relaxed max-w-[60ch]">
              A Tropical Fit Água Quente é dividida em três setores de
              performance para você treinar sem improviso.
            </p>
          </div>

          {/* Seletor Tátil de Zonas */}
          <div
            role="tablist"
            aria-label="Selecionar zona de treino"
            className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1"
          >
            {opcoesFiltro.map((op) => {
              const ativa = zonaSelecionada === op.id;
              return (
                <button
                  key={op.id}
                  type="button"
                  role="tab"
                  aria-selected={ativa}
                  onClick={() => setZonaSelecionada(op.id)}
                  className={`btn-tactile inline-flex min-h-[46px] shrink-0 items-center justify-center rounded-xl px-4 py-2.5 font-display text-sm sm:text-base font-black uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${
                    ativa
                      ? 'bg-brand-orange text-black shadow-orange-glow-sm'
                      : 'border border-brand-dark-border bg-brand-dark-surface text-stone-300 hover:border-brand-orange hover:text-white'
                  }`}
                >
                  {op.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Painéis de Arena (Quebra de monotonia: painéis horizontais de especificações com numeração gigante) */}
        <div className="space-y-6">
          {categoriasVisiveis.map((cat, idx) => {
            const numeroReal =
              categoriasAparelhos.findIndex(
                (item) => item.categoria === cat.categoria
              ) + 1;
            const numFormatado = `0${numeroReal > 0 ? numeroReal : idx + 1}`;

            const config = ZONAS_MAP[cat.categoria] ?? {
              codigo: `ZONA ${numFormatado}`,
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
                className="group relative overflow-hidden rounded-2xl border-2 border-brand-dark-border bg-brand-dark-card transition-colors duration-200 hover:border-brand-orange/70"
              >
                {/* Barra Técnica Superior do Painel */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-dark-border bg-brand-dark-surface px-5 py-3 sm:px-8">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center rounded bg-brand-orange px-2.5 py-0.5 font-display text-xs font-black uppercase tracking-widest text-black">
                      {config.codigo}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-stone-400">
                      {config.subtituloTecnico}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-yellow">
                    <Gauge className="h-4 w-4" aria-hidden="true" />
                    <span>INTENSIDADE: {config.intensidade}</span>
                  </div>
                </div>

                {/* Corpo do Painel de Arena */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 p-6 sm:p-8 items-center">
                  {/* Bloco Identificador da Zona (5 cols) */}
                  <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <h3 className="font-display text-3xl sm:text-4xl font-black uppercase leading-[0.95] tracking-tight text-white">
                          {config.tituloArena}
                        </h3>
                        <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
                          {cat.descricao}
                        </p>
                      </div>

                      {/* Numeração Display Gigante */}
                      <span
                        className="font-display text-6xl sm:text-7xl font-black leading-none tracking-tighter text-brand-orange/25 group-hover:text-brand-orange transition-colors select-none shrink-0 tabular-nums"
                        aria-hidden="true"
                      >
                        {numFormatado}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 rounded-xl border border-brand-dark-border bg-brand-dark px-4 py-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-orange text-black">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold uppercase tracking-widest text-stone-400">
                          Objetivo de Treino
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-white">
                          {config.focoFisiologico}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Lista Técnica de Equipamentos em Grid 2 Colunas (7 cols) */}
                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {listaItens.map((item, itemIdx) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-xl border border-brand-dark-border bg-brand-dark-surface p-4"
                      >
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-brand-orange/15 font-display text-xs font-black text-brand-orange tabular-nums">
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
                <div className="flex items-center justify-between border-t border-brand-dark-border/60 bg-brand-dark px-5 py-2.5 sm:px-8 text-[11px] font-semibold text-stone-400">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2
                      className="h-3.5 w-3.5 text-brand-orange"
                      aria-hidden="true"
                    />
                    Acesso liberado em todos os planos da Unidade Água Quente
                  </span>
                  <span className="uppercase tracking-widest text-stone-500">
                    SETOR #{numFormatado}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
