'use client';

import { useState } from 'react';
import { Calendar, Clock, UserCheck, Flame, Radio } from 'lucide-react';
import { ACADEMIA_DATA } from '@/data/academia';
import type { AulaColetiva } from '@/types/academia';

type DiaGrade = Exclude<AulaColetiva['diaSemana'], 'Sábado'>;

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

function getModalidadeFoto(modalidade: string): string {
  const lower = modalidade.toLowerCase();
  if (lower.includes('jump')) return '/images/estrutura/jump.jpg';
  if (lower.includes('ritmos') || lower.includes('dance'))
    return '/images/estrutura/ritmos.jpg';
  if (lower.includes('funcional')) return '/images/estrutura/funcional.jpg';
  if (lower.includes('judô')) return '/images/estrutura/judo.jpg';
  if (lower.includes('step')) return '/images/estrutura/sala-coletiva.jpg';
  return '/images/estrutura/sala-coletiva.jpg';
}

function getModalidadeBadge(modalidade: string): {
  tag: string;
  intensidade: string;
} {
  const lower = modalidade.toLowerCase();
  if (lower.includes('jump')) {
    return { tag: 'CARDIO EXPLOSIVO', intensidade: 'ALTA QUEIMA' };
  }
  if (lower.includes('ritmos') || lower.includes('dance')) {
    return { tag: 'COREOGRAFIA & RITMO', intensidade: 'ENERGIA MÁXIMA' };
  }
  if (lower.includes('funcional')) {
    return { tag: 'FORÇA & METABÓLICO', intensidade: 'CONDICIONAMENTO' };
  }
  if (lower.includes('judô')) {
    return { tag: 'ARTES MARCIAIS', intensidade: 'TÉCNICA & DISCIPLINA' };
  }
  if (lower.includes('step')) {
    return { tag: 'COORDENAÇÃO & AERÓBICO', intensidade: 'RITMO CONTÍNUO' };
  }
  return { tag: 'AULA COLETIVA', intensidade: 'ARENA' };
}

export function AulasColetivas() {
  const { aulas, professores, unidade } = ACADEMIA_DATA;
  const [diaAtivo, setDiaAtivo] = useState<DiaGrade>('Segunda');

  const aulasDoDia = aulas.filter((aula) => aula.diaSemana === diaAtivo);
  const infoDia =
    DIAS_SEMANA.find((d) => d.id === diaAtivo) ?? DIAS_SEMANA[0];

  return (
    <section
      id="aulas"
      aria-labelledby="aulas-heading"
      className="py-20 sm:py-28 bg-brand-dark border-b border-brand-dark-border"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho Estilo Scoreboard de Arena */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10 sm:mb-14">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-brand-orange">
              <Radio className="h-4 w-4" aria-hidden="true" />
              <span>Scoreboard Oficial da Arena</span>
            </div>
            <h2
              id="aulas-heading"
              className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-black uppercase tracking-tight text-white leading-[0.93]"
            >
              HORÁRIO DE <span className="text-brand-orange">AULAS</span> DA
              SEMANA
            </h2>
            <p className="text-base sm:text-lg text-stone-300 leading-relaxed">
              Programação oficial da {unidade.unidade}. Selecione o dia no
              placar abaixo e venha puxar o seu limite com nossos professores.
            </p>
          </div>

          {/* Seletor de Dias em 5 Colunas Compactas (compatível com 320px sem scroll horizontal) */}
          <div
            role="tablist"
            aria-label="Selecionar dia da semana no placar"
            className="grid grid-cols-5 gap-1.5 sm:gap-2 w-full lg:w-auto rounded-2xl border-2 border-brand-dark-border bg-brand-dark-card p-1.5"
          >
            {DIAS_SEMANA.map((dia) => {
              const isSelected = diaAtivo === dia.id;
              return (
                <button
                  key={dia.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`painel-aulas-${dia.id}`}
                  id={`tab-aulas-${dia.id}`}
                  onClick={() => setDiaAtivo(dia.id)}
                  className={`btn-tactile flex min-h-[48px] flex-col items-center justify-center rounded-xl px-1.5 sm:px-5 py-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${
                    isSelected
                      ? 'bg-brand-orange text-black shadow-orange-glow-sm'
                      : 'bg-brand-dark-surface text-stone-300 hover:text-white'
                  }`}
                >
                  <span
                    className={`hidden sm:block text-[10px] font-bold uppercase tracking-widest ${
                      isSelected ? 'text-black/75' : 'text-stone-400'
                    }`}
                  >
                    {dia.canal}
                  </span>
                  <span className="font-display text-base sm:text-xl font-black uppercase tracking-wider">
                    <span className="sm:hidden">{dia.curto}</span>
                    <span className="hidden sm:inline">{dia.id}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Painel Scoreboard de Arena */}
        <div
          id={`painel-aulas-${diaAtivo}`}
          role="tabpanel"
          aria-labelledby={`tab-aulas-${diaAtivo}`}
          className="overflow-hidden rounded-2xl border-2 border-brand-dark-border bg-brand-dark-card shadow-2xl mb-12"
        >
          {/* Barra de Status do Placar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-brand-dark-border bg-brand-dark-surface px-5 py-3.5 sm:px-8">
            <div className="flex items-center gap-3">
              <span
                className="h-2.5 w-2.5 rounded-full bg-brand-orange"
                aria-hidden="true"
              />
              <h3 className="font-display text-lg sm:text-2xl font-black uppercase tracking-wider text-white">
                PLACAR DE {infoDia.completo.toUpperCase()}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <span className="rounded bg-brand-dark px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-brand-orange border border-brand-dark-border tabular-nums">
                {aulasDoDia.length}{' '}
                {aulasDoDia.length === 1 ? 'SESSÃO ATIVA' : 'SESSÕES ATIVAS'}
              </span>
            </div>
          </div>

          {/* Linhas do Scoreboard */}
          <div className="divide-y divide-brand-dark-border">
            {aulasDoDia.map((aula, idx) => {
              const badge = getModalidadeBadge(aula.modalidade);
              return (
                <article
                  key={aula.id}
                  className="group grid grid-cols-1 md:grid-cols-12 items-center gap-4 sm:gap-6 p-5 sm:p-7 transition-colors hover:bg-brand-dark-surface/70"
                >
                  {/* Horário Digital de Arena + Miniatura da Modalidade (4 cols) */}
                  <div className="md:col-span-4 flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-stone-500 tabular-nums">
                      0{idx + 1}
                    </span>
                    <div className="relative h-12 w-12 sm:h-14 sm:w-14 shrink-0 overflow-hidden rounded-xl border border-brand-dark-border bg-black">
                      <img
                        src={getModalidadeFoto(aula.modalidade)}
                        alt={aula.modalidade}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-xl border-2 border-brand-orange bg-brand-orange px-3 py-1.5 sm:px-3.5 sm:py-2 text-black shadow-orange-glow-sm">
                      <Clock className="h-4 w-4 shrink-0 stroke-[2.5]" aria-hidden="true" />
                      <span className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight leading-none tabular-nums">
                        {aula.horario}H
                      </span>
                    </div>
                  </div>

                  {/* Modalidade & Badge Esportiva (5 cols) */}
                  <div className="md:col-span-5 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded bg-brand-orange/15 px-2.5 py-0.5 font-display text-xs font-black uppercase tracking-widest text-brand-orange">
                        {badge.tag}
                      </span>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-stone-400">
                        // {badge.intensidade}
                      </span>
                    </div>
                    <h4 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-white leading-none group-hover:text-brand-orange transition-colors">
                      {aula.modalidade}
                    </h4>
                  </div>

                  {/* Professor / Comando da Sessão (3 cols) */}
                  <div className="md:col-span-3 flex md:justify-end">
                    {aula.professor ? (
                      <div className="inline-flex items-center gap-2.5 rounded-xl border border-brand-yellow/40 bg-brand-dark px-4 py-2.5">
                        <UserCheck
                          className="h-4 w-4 text-brand-yellow shrink-0"
                          aria-hidden="true"
                        />
                        <div>
                          <span className="block text-[10px] font-bold uppercase tracking-widest text-stone-400">
                            Comando da Aula
                          </span>
                          <span className="font-display text-lg font-black uppercase tracking-wide text-brand-yellow">
                            {aula.professor}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-2.5 rounded-xl border border-brand-dark-border bg-brand-dark px-4 py-2.5">
                        <Flame
                          className="h-4 w-4 text-brand-orange shrink-0"
                          aria-hidden="true"
                        />
                        <div>
                          <span className="block text-[10px] font-bold uppercase tracking-widest text-stone-400">
                            Comando da Aula
                          </span>
                          <span className="font-display text-base font-black uppercase tracking-wide text-stone-200">
                            Instrutor Oficial
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Escalação de Professores (Head Coaches Roster) */}
        <div className="rounded-2xl border border-brand-dark-border bg-brand-dark-surface p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                <span>Escalação Oficial</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                PROFESSORES DAS COLETIVAS
              </h3>
              <p className="text-xs sm:text-sm text-stone-300">
                Energia lá no alto do aquecimento até o último segundo da aula.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full lg:w-auto">
              {professores.map((prof) => (
                <div
                  key={prof.nome}
                  className="flex items-center gap-3.5 rounded-xl border border-brand-dark-border bg-brand-dark-card px-4 py-3.5"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-orange font-display text-lg font-black uppercase text-black">
                    {prof.nome.replace('Prof. ', '').slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-xl font-black uppercase tracking-wide text-white truncate">
                      {prof.nome}
                    </p>
                    <p className="text-xs font-bold uppercase tracking-wider text-brand-orange truncate">
                      {prof.modalidades.join(' · ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
