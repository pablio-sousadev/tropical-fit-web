'use client';

import { useState } from 'react';
import {
  Dumbbell,
  HeartPulse,
  Flame,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import { ACADEMIA_DATA } from '@/data/academia';
import { isPlaceholderValue } from '@/lib/links';

const COMPLEMENTOS_SUGERIDOS: Record<string, string[]> = {
  'Musculação / Peso Livre': [
    'Máquinas articuladas e guiadas para membros superiores e inferiores',
    'Bancos reguláveis, gaiolas de agachamento e suporte olímpico',
    'Jogos completos de halteres, anilhas e barras para treino de força',
    'Estações de polia dupla (crossover) e puxadores de alta precisão',
  ],
  Cardio: [
    'Esteiras ergométricas profissionais para corrida e caminhada',
    'Bicicletas ergométricas e spinning para condicionamento aeróbico',
    'Elípticos e simuladores de movimento contínuo de baixo impacto',
    'Área ventilada ideal para aquecimento e queima calórica pós-treino',
  ],
  'Funcional / Coletivas': [
    'Sala dedicada para Jump, Ritmos, Fit Dance, Step e Judô',
    'Mini trampolins individuais para aulas intensas de Jump',
    'Steps ajustáveis, colchonetes, cones, cordas e acessórios funcionais',
    'Sistema de som e iluminação preparado para aulas coletivas energéticas',
  ],
};

function getCategoryIcon(categoria: string) {
  const lower = categoria.toLowerCase();
  if (lower.includes('cardio')) {
    return HeartPulse;
  }
  if (lower.includes('funcional') || lower.includes('coletiva')) {
    return Flame;
  }
  return Dumbbell;
}

export function Aparelhos() {
  const { categoriasAparelhos } = ACADEMIA_DATA;
  const [abaAtiva, setAbaAtiva] = useState<string>('Todas');

  const abas = ['Todas', ...categoriasAparelhos.map((c) => c.categoria)];

  const categoriasVisiveis =
    abaAtiva === 'Todas'
      ? categoriasAparelhos
      : categoriasAparelhos.filter((c) => c.categoria === abaAtiva);

  return (
    <section
      id="aparelhos"
      aria-labelledby="aparelhos-heading"
      className="py-16 sm:py-24 bg-[#0E0E0E] border-b border-brand-dark-border"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho + Abas */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-brand-orange">
              <Layers className="h-4 w-4" aria-hidden="true" />
              <span>Áreas de Treino</span>
            </div>
            <h2
              id="aparelhos-heading"
              className="text-[clamp(1.75rem,3.8vw,3rem)] font-black uppercase tracking-tight text-white leading-tight"
            >
              Aparelhos e <span className="text-brand-orange">Modalidades</span>{' '}
              por Categoria
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              Navegue pelas áreas da academia para conferir os recursos
              disponíveis para hipertrofia, emagrecimento e condicionamento.
            </p>
          </div>

          {/* Abas Responsivas */}
          <div
            role="tablist"
            aria-label="Filtrar aparelhos por categoria"
            className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1"
          >
            {abas.map((aba) => {
              const isSelected = abaAtiva === aba;
              return (
                <button
                  key={aba}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setAbaAtiva(aba)}
                  className={`inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-xl px-4 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${
                    isSelected
                      ? 'bg-brand-orange text-black shadow-md shadow-brand-orange/20'
                      : 'border border-brand-dark-border bg-brand-dark-card text-neutral-300 hover:border-brand-orange/60 hover:text-white'
                  }`}
                >
                  {aba}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cards de Categorias de Aparelhos */}
        <div
          className={`grid grid-cols-1 gap-6 ${
            categoriasVisiveis.length === 1
              ? 'max-w-3xl'
              : 'md:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {categoriasVisiveis.map((cat, idx) => {
            const Icon = getCategoryIcon(cat.categoria);
            const hasOnlyPlaceholders = cat.itens.every((item) =>
              isPlaceholderValue(item)
            );
            const listaExibicao = hasOnlyPlaceholders
              ? COMPLEMENTOS_SUGERIDOS[cat.categoria] ?? cat.itens
              : cat.itens;

            return (
              <article
                key={cat.categoria}
                className="flex flex-col justify-between rounded-2xl border border-brand-dark-border bg-brand-dark-card p-6 sm:p-7 transition-colors hover:border-brand-orange/60"
              >
                <div className="space-y-5">
                  {/* Topo do Card */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-orange text-black shadow-md shadow-brand-orange/20">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <span className="rounded-full border border-brand-dark-border bg-brand-dark px-3 py-1 text-xs font-black uppercase tracking-widest text-neutral-400">
                      Área 0{idx + 1}
                    </span>
                  </div>

                  {/* Título e Descrição */}
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                      {cat.categoria}
                    </h3>
                    <p className="text-sm text-neutral-300 leading-relaxed">
                      {cat.descricao}
                    </p>
                  </div>

                  {/* Lista Escaneável de Equipamentos */}
                  <ul className="space-y-3 pt-2 border-t border-brand-dark-border">
                    {listaExibicao.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-neutral-200"
                      >
                        <CheckCircle2
                          className="h-4 w-4 text-brand-orange shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Nota discreta quando ainda usa catálogo base */}
                {hasOnlyPlaceholders ? (
                  <div className="mt-6 pt-3 border-t border-brand-dark-border/60 flex items-center justify-between text-[11px] text-neutral-400">
                    <span>Incluso em todos os planos</span>
                    <span className="text-brand-orange font-bold uppercase">
                      Acesso Livre
                    </span>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
