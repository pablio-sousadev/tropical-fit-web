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
} from 'lucide-react';
import { ACADEMIA_DATA } from '@/data/academia';

const RECURSOS_SCA = [
  {
    icone: Dumbbell,
    titulo: 'Ficha de Treino Digital',
    descricao:
      'Visualize séries, repetições e evolução de cargas direto no celular.',
  },
  {
    icone: CalendarCheck,
    titulo: 'Frequência e Horários',
    descricao:
      'Acompanhe seus dias de presença, histórico de acessos e avisos da unidade.',
  },
  {
    icone: CreditCard,
    titulo: 'Matrícula e Mensalidades',
    descricao:
      'Consulte vencimentos, status do plano e histórico de pagamentos sem fila.',
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
      className="py-16 sm:py-24 bg-brand-dark border-b border-brand-dark-border"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border-2 border-brand-orange/40 bg-brand-dark-card p-6 sm:p-10 lg:p-12 shadow-2xl">
          {/* Efeito radial laranja no canto */}
          <div
            className="pointer-events-none absolute -right-24 -bottom-24 h-80 w-80 rounded-full bg-brand-orange/15 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Coluna Esquerda: Explicação e Recursos */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-orange/40 bg-brand-orange/10 px-3.5 py-1.5 text-xs font-black uppercase tracking-widest text-brand-orange">
                <Smartphone className="h-4 w-4" aria-hidden="true" />
                <span>Exclusivo para Alunos</span>
              </div>

              <div className="space-y-3">
                <h2
                  id="app-aluno-heading"
                  className="text-[clamp(1.85rem,4vw,3.25rem)] font-black uppercase tracking-tight text-white leading-tight"
                >
                  Baixe o App{' '}
                  <span className="text-brand-orange">SCA Aluno</span>
                </h2>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl">
                  Acompanhe seu treino completo, matrícula, pagamentos, horários
                  e frequência na palma da mão. Basta instalar o aplicativo e
                  inserir o código oficial da {unidade.nome}.
                </p>
              </div>

              {/* Lista de Recursos */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {RECURSOS_SCA.map((item) => {
                  const Icon = item.icone;
                  return (
                    <div
                      key={item.titulo}
                      className="rounded-xl border border-brand-dark-border bg-brand-dark p-4 space-y-2"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-orange/15 text-brand-orange">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <h3 className="text-sm font-black uppercase text-white">
                        {item.titulo}
                      </h3>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        {item.descricao}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Links das Lojas (App Store e Google Play) */}
              <div className="flex flex-col xs:flex-row flex-wrap items-stretch xs:items-center gap-3 pt-2">
                <a
                  href="https://apps.apple.com/br/search?term=SCA%20Aluno"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] items-center justify-center gap-3 rounded-xl border border-white/20 bg-black px-5 py-2.5 text-left text-white hover:border-brand-orange transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                >
                  <div className="leading-tight">
                    <span className="block text-[10px] uppercase tracking-wider text-neutral-400">
                      Disponível na
                    </span>
                    <span className="text-sm font-black">App Store</span>
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
                  className="inline-flex min-h-[48px] items-center justify-center gap-3 rounded-xl border border-white/20 bg-black px-5 py-2.5 text-left text-white hover:border-brand-orange transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                >
                  <div className="leading-tight">
                    <span className="block text-[10px] uppercase tracking-wider text-neutral-400">
                      Disponível no
                    </span>
                    <span className="text-sm font-black">Google Play</span>
                  </div>
                  <ExternalLink
                    className="h-4 w-4 text-brand-orange shrink-0"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>

            {/* Coluna Direita: Card do Código da Academia com Cópia em 1 Clique */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border-2 border-brand-orange bg-brand-dark p-6 sm:p-8 text-center space-y-5 shadow-xl">
                <div className="space-y-1">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-neutral-400">
                    Código da Academia
                  </p>
                  <p className="text-xs text-neutral-400">
                    Use este código no primeiro acesso ao App SCA Aluno
                  </p>
                </div>

                {/* Display do Código */}
                <div className="rounded-xl border border-brand-orange/40 bg-brand-orange/10 py-4 px-3">
                  <span className="font-mono text-3xl sm:text-4xl font-black tracking-[0.18em] text-brand-orange select-all">
                    {codigo}
                  </span>
                </div>

                {/* Botão Copiar Código */}
                <button
                  type="button"
                  onClick={handleCopy}
                  aria-live="polite"
                  className={`flex min-h-[50px] w-full items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 text-sm font-black uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${
                    copiado
                      ? 'bg-emerald-500 text-black'
                      : 'bg-brand-orange text-black hover:bg-brand-orange-hover shadow-lg shadow-brand-orange/25'
                  }`}
                >
                  {copiado ? (
                    <>
                      <Check className="h-5 w-5 shrink-0" aria-hidden="true" />
                      <span>Copiado! ({codigo})</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-5 w-5 shrink-0" aria-hidden="true" />
                      <span>Copiar Código</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-neutral-400">
                  Dúvidas no primeiro acesso? A recepção da {unidade.unidade}{' '}
                  ajuda você a configurar em segundos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
