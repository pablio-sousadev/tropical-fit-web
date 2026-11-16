'use client';

import { useState, useCallback } from 'react';
import {
  Smartphone,
  Copy,
  Check,
  Dumbbell,
  CalendarCheck,
  CreditCard,
  ExternalLink,
  ScanLine,
  ShieldCheck,
} from 'lucide-react';
import { ACADEMIA_DATA } from '@/data/academia';

const RECURSOS_SCA = [
  {
    icone: Dumbbell,
    codigo: 'MOD // 01',
    titulo: 'Treino Digital & Cargas',
    descricao:
      'Séries, repetições e progressão de cargas atualizadas pelo professor direto na tela.',
  },
  {
    icone: CalendarCheck,
    codigo: 'MOD // 02',
    titulo: 'Histórico de Presença',
    descricao:
      'Acompanhe sua frequência semanal, metas de constância e comunicados da unidade.',
  },
  {
    icone: CreditCard,
    codigo: 'MOD // 03',
    titulo: 'Gestão de Matrícula',
    descricao:
      'Consulte vencimentos, renovação de ciclo e comprovantes sem precisar pegar fila.',
  },
] as const;

export function AppAluno() {
  const { unidade } = ACADEMIA_DATA;
  const codigo = unidade.scaAlunoCodigo;
  const [copiado, setCopiado] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(codigo);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = codigo;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopiado(true);
      window.setTimeout(() => {
        setCopiado(false);
      }, 2500);
    } catch {
      // Em caso de falha no clipboard, não exibe confirmação indevida
      setCopiado(false);
    }
  }, [codigo]);

  return (
    <section
      id="app-aluno"
      aria-labelledby="app-aluno-heading"
      className="py-20 sm:py-28 bg-brand-dark scenic-spotlight border-b border-brand-dark-border"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border-2 border-brand-dark-border bg-brand-dark-card p-6 sm:p-10 lg:p-12 shadow-2xl">
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Coluna Esquerda: Identidade do App SCA Aluno (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-md border border-brand-orange/40 bg-brand-dark-surface px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
                <Smartphone className="h-4 w-4" aria-hidden="true" />
                <span>Ecossistema Digital do Aluno</span>
              </div>

              <div className="space-y-3">
                <h2
                  id="app-aluno-heading"
                  className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-black uppercase tracking-tight text-white leading-[0.93]"
                >
                  CREDENCIAL DIGITAL{' '}
                  <span className="text-brand-orange">SCA ALUNO</span>
                </h2>
                <p className="text-base sm:text-lg text-stone-300 leading-relaxed max-w-2xl">
                  Sua ficha de treino, controle de frequência e situação da
                  matrícula sincronizados no celular. Instale o App SCA Aluno e
                  autentique seu acesso com o código oficial da{' '}
                  <strong className="text-white">{unidade.nome}</strong>.
                </p>
              </div>

              {/* Módulos do App */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {RECURSOS_SCA.map((item) => {
                  const Icon = item.icone;
                  return (
                    <div
                      key={item.titulo}
                      className="rounded-xl border border-brand-dark-border bg-brand-dark-surface p-4 space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-orange text-black">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-stone-400">
                          {item.codigo}
                        </span>
                      </div>
                      <h3 className="font-display text-lg font-black uppercase tracking-wide text-white">
                        {item.titulo}
                      </h3>
                      <p className="text-xs text-stone-300 leading-relaxed">
                        {item.descricao}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Badges de Download Táteis (App Store e Google Play) */}
              <div className="flex flex-col xs:flex-row flex-wrap items-stretch xs:items-center gap-3.5 pt-2">
                <a
                  href="https://apps.apple.com/br/search?term=SCA%20Aluno"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-tactile inline-flex min-h-[50px] items-center justify-center gap-3 rounded-xl border border-brand-dark-border bg-brand-dark-surface px-5 py-3 text-left text-white hover:border-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                >
                  <div className="leading-tight">
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-stone-400">
                      Baixar para iOS
                    </span>
                    <span className="font-display text-lg font-black uppercase tracking-wide">
                      App Store
                    </span>
                  </div>
                  <ExternalLink
                    className="h-4 w-4 text-brand-orange shrink-0"
                    aria-hidden="true"
                  />
                </a>

                <a
                  href="https://play.google.com/store/search?q=SCA%20Aluno&c=apps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-tactile inline-flex min-h-[50px] items-center justify-center gap-3 rounded-xl border border-brand-dark-border bg-brand-dark-surface px-5 py-3 text-left text-white hover:border-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                >
                  <div className="leading-tight">
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-stone-400">
                      Baixar para Android
                    </span>
                    <span className="font-display text-lg font-black uppercase tracking-wide">
                      Google Play
                    </span>
                  </div>
                  <ExternalLink
                    className="h-4 w-4 text-brand-orange shrink-0"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>

            {/* Coluna Direita: Credencial Digital do Atleta com Moldura de Leitor de Acesso (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-2xl border-2 border-brand-orange bg-brand-dark p-6 sm:p-8 shadow-orange-glow">
                {/* Header da Credencial */}
                <div className="flex items-center justify-between gap-2 border-b border-brand-dark-border pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <ScanLine
                      className="h-5 w-5 text-brand-orange"
                      aria-hidden="true"
                    />
                    <span className="font-display text-base font-black uppercase tracking-wider text-white">
                      CREDENCIAL DO ATLETA
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded bg-brand-dark-surface px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-brand-yellow border border-brand-dark-border">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        copiado ? 'bg-emerald-400' : 'bg-brand-orange'
                      }`}
                      aria-hidden="true"
                    />
                    {copiado ? 'AUTENTICADO' : 'LEITOR ATIVO'}
                  </span>
                </div>

                {/* Moldura de Leitor de Acesso com Cantoneiras Ópticas */}
                <div className="relative rounded-xl border border-brand-dark-border bg-brand-dark-surface p-6 text-center">
                  {/* Cantoneiras do Leitor Óptico */}
                  <span
                    className="pointer-events-none absolute top-2.5 left-2.5 h-3.5 w-3.5 border-t-2 border-l-2 border-brand-orange"
                    aria-hidden="true"
                  />
                  <span
                    className="pointer-events-none absolute top-2.5 right-2.5 h-3.5 w-3.5 border-t-2 border-r-2 border-brand-orange"
                    aria-hidden="true"
                  />
                  <span
                    className="pointer-events-none absolute bottom-2.5 left-2.5 h-3.5 w-3.5 border-b-2 border-l-2 border-brand-orange"
                    aria-hidden="true"
                  />
                  <span
                    className="pointer-events-none absolute bottom-2.5 right-2.5 h-3.5 w-3.5 border-b-2 border-r-2 border-brand-orange"
                    aria-hidden="true"
                  />

                  <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-stone-400">
                    CÓDIGO OFICIAL DA UNIDADE
                  </p>

                  <div className="my-3">
                    <span className="font-display text-4xl sm:text-5xl font-black tracking-[0.16em] text-brand-orange select-all tabular-nums">
                      {codigo}
                    </span>
                  </div>

                  <p className="text-[11px] font-medium text-stone-400">
                    {unidade.nome} · {unidade.unidade}
                  </p>
                </div>

                {/* Botão de Cópia Tátil */}
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={handleCopy}
                    aria-live="polite"
                    className={`btn-tactile flex min-h-[54px] w-full items-center justify-center gap-2.5 rounded-xl px-6 py-4 font-display text-lg font-black uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${
                      copiado
                        ? 'bg-emerald-500 text-black'
                        : 'bg-brand-orange text-black shadow-tactile hover:bg-brand-orange-hover'
                    }`}
                  >
                    {copiado ? (
                      <>
                        <Check className="h-5 w-5 shrink-0 stroke-[2.5]" aria-hidden="true" />
                        <span>Copiado! ({codigo})</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-5 w-5 shrink-0 stroke-[2.25]" aria-hidden="true" />
                        <span>Copiar Código</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Rodapé de Autenticação da Credencial */}
                <div className="mt-5 flex items-center justify-between border-t border-brand-dark-border pt-4 text-[11px] text-stone-400">
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck
                      className="h-4 w-4 text-brand-orange"
                      aria-hidden="true"
                    />
                    Ativação gratuita na recepção
                  </span>
                  <span className="font-mono uppercase text-stone-500">
                    ID #{codigo}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
