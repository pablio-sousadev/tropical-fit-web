'use client';

import { useState } from 'react';
import { Calendar, Clock, UserCheck, Flame } from 'lucide-react';
import { ACADEMIA_DATA } from '@/data/academia';
import type { AulaColetiva } from '@/types/academia';

type DiaGrade = Exclude<AulaColetiva['diaSemana'], 'Sábado'>;

const DIAS_SEMANA: Array<{ id: DiaGrade; curto: string; completo: string }> = [
  { id: 'Segunda', curto: 'Seg', completo: 'Segunda-feira' },
  { id: 'Terça', curto: 'Ter', completo: 'Terça-feira' },
  { id: 'Quarta', curto: 'Qua', completo: 'Quarta-feira' },
  { id: 'Quinta', curto: 'Qui', completo: 'Quinta-feira' },
  { id: 'Sexta', curto: 'Sex', completo: 'Sexta-feira' },
];

export function AulasColetivas() {
  const { aulas, professores } = ACADEMIA_DATA;
  const [diaAtivo, setDiaAtivo] = useState<DiaGrade>('Segunda');

  const aulasDoDia = aulas.filter((aula) => aula.diaSemana === diaAtivo);

  return (
    <section
      id="aulas"
      aria-labelledby="aulas-heading"
      className="py-16 sm:py-24 bg-[#0E0E0E] border-b border-brand-dark-border"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-brand-orange">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <span>Horário de Aulas</span>
            </div>
            <h2
              id="aulas-heading"
              className="text-[clamp(1.75rem,3.8vw,3rem)] font-black uppercase tracking-tight text-white leading-tight"
            >
              Grade Semanal de{' '}
              <span className="text-brand-orange">Aulas Coletivas</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              Todas as aulas coletivas estão inclusas nos planos regulares.
              Selecione o dia da semana para conferir os horários e professores.
            </p>
          </div>

          {/* Seletor de Dia da Semana (5 colunas compactas no mobile 320px, sem quebrar layout) */}
          <div
            role="tablist"
            aria-label="Selecionar dia da semana"
            className="grid grid-cols-5 gap-1.5 sm:gap-2 w-full lg:w-auto rounded-2xl border border-brand-dark-border bg-brand-dark p-1.5"
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
                  className={`flex min-h-[44px] flex-col items-center justify-center rounded-xl px-1.5 sm:px-4 py-2 text-xs sm:text-sm font-black uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${
                    isSelected
                      ? 'bg-brand-orange text-black shadow-md shadow-brand-orange/25'
                      : 'text-neutral-300 hover:bg-brand-dark-card hover:text-white'
                  }`}
                >
                  <span className="sm:hidden">{dia.curto}</span>
                  <span className="hidden sm:inline">{dia.id}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Painel de Aulas do Dia Selecionado */}
        <div
          id={`painel-aulas-${diaAtivo}`}
          role="tabpanel"
          aria-labelledby={`tab-aulas-${diaAtivo}`}
          className="mb-12"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-neutral-300">
              Programação de{' '}
              <span className="text-brand-orange">
                {DIAS_SEMANA.find((d) => d.id === diaAtivo)?.completo}
              </span>
            </h3>
            <span className="text-xs font-bold text-neutral-400">
              {aulasDoDia.length}{' '}
              {aulasDoDia.length === 1
                ? 'aula programada'
                : 'aulas programadas'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {aulasDoDia.map((aula) => (
              <article
                key={aula.id}
                className="flex flex-col justify-between rounded-2xl border border-brand-dark-border bg-brand-dark-card p-5 sm:p-6 transition-colors hover:border-brand-orange"
              >
                <div className="flex items-start justify-between gap-3">
                  {/* Pílula de Horário estilo cartaz Tropical Fit */}
                  <div className="inline-flex items-center gap-1.5 rounded-lg bg-brand-orange px-3 py-1.5 text-sm sm:text-base font-black text-black">
                    <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{aula.horario}h</span>
                  </div>

                  <span className="rounded-md border border-brand-dark-border bg-brand-dark px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                    {aula.diaSemana}
                  </span>
                </div>

                <div className="mt-5 space-y-2">
                  <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                    {aula.modalidade}
                  </h4>

                  {aula.professor ? (
                    <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-brand-yellow">
                      <UserCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>{aula.professor}</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-400">
                      <Flame className="h-4 w-4 text-brand-orange shrink-0" aria-hidden="true" />
                      <span>Instrutor da unidade</span>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Destaque dos Professores da Unidade */}
        <div className="rounded-2xl border border-brand-dark-border bg-brand-dark p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-orange">
                Time de Professores
              </p>
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                Quem puxa o seu ritmo nas coletivas
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400">
                Aulas dinâmicas, motivadoras e adaptadas para todos os níveis de
                condicionamento.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full md:w-auto">
              {professores.map((prof) => (
                <div
                  key={prof.nome}
                  className="flex items-center gap-3.5 rounded-xl border border-brand-dark-border bg-brand-dark-card px-4 py-3.5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-orange/15 text-sm font-black uppercase text-brand-orange border border-brand-orange/30">
                    {prof.nome.replace('Prof. ', '').slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm sm:text-base font-black text-white truncate">
                      {prof.nome}
                    </p>
                    <p className="text-xs font-semibold text-brand-orange truncate">
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
