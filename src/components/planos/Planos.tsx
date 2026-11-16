'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Check,
  MessageCircle,
  Ticket,
  Flame,
  ShieldCheck,
  TrendingDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { ACADEMIA_DATA } from '@/data/academia';
import {
  formatPrecoParts,
  getWhatsAppUrl,
  isPlaceholderValue,
} from '@/lib/links';

export function Planos() {
  const { planos, campanha, unidade } = ACADEMIA_DATA;

  // Índice inicial: Plano Trimestral (centro entre Mensal à esquerda e Semestral à direita)
  const trimestralIndex = Math.max(
    0,
    planos.findIndex((p) => p.id === 'trimestral')
  );

  const [activePlanIdx, setActivePlanIdx] = useState<number>(trimestralIndex);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  const planoMensal = planos.find((p) => p.periodoMeses === 1) ?? planos[0];

  const subtituloCampanha =
    campanha.subtitulo && !isPlaceholderValue(campanha.subtitulo)
      ? campanha.subtitulo
      : 'Apresente este ticket pelo WhatsApp ou na recepção da Unidade Água Quente para ativar sua condição especial.';

  const scrollToPlan = useCallback(
    (index: number, behavior: ScrollBehavior = 'smooth') => {
      const container = carouselRef.current;
      const card = cardRefs.current[index];
      if (!container || !card) return;

      const targetLeft =
        card.offsetLeft - (container.clientWidth - card.offsetWidth) / 2;
      container.scrollTo({
        left: Math.max(0, targetLeft),
        behavior,
      });
      setActivePlanIdx(index);
    },
    []
  );

  // Posiciona o plano Trimestral exatamente no centro da tela mobile na montagem inicial
  useEffect(() => {
    const centerInitialCard = () => {
      const container = carouselRef.current;
      const card = cardRefs.current[trimestralIndex];
      if (!container || !card) return;

      if (container.scrollWidth > container.clientWidth + 8) {
        const targetLeft =
          card.offsetLeft - (container.clientWidth - card.offsetWidth) / 2;
        container.scrollLeft = Math.max(0, targetLeft);
        setActivePlanIdx(trimestralIndex);
      }
    };

    const rafId = window.requestAnimationFrame(centerInitialCard);
    return () => window.cancelAnimationFrame(rafId);
  }, [trimestralIndex]);

  // Atualiza o card ativo no centro conforme o usuário faz swipe no carrossel
  const handleCarouselScroll = useCallback(() => {
    const container = carouselRef.current;
    if (!container || container.scrollWidth <= container.clientWidth + 8) {
      return;
    }

    const viewportCenter = container.scrollLeft + container.clientWidth / 2;
    let closestIdx = 0;
    let minDistance = Number.POSITIVE_INFINITY;

    cardRefs.current.forEach((card, idx) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(viewportCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = idx;
      }
    });

    setActivePlanIdx((prev) => (prev === closestIdx ? prev : closestIdx));
  }, []);

  const handlePrevPlan = () => {
    const prevIdx = Math.max(0, activePlanIdx - 1);
    scrollToPlan(prevIdx, 'smooth');
  };

  const handleNextPlan = () => {
    const nextIdx = Math.min(planos.length - 1, activePlanIdx + 1);
    scrollToPlan(nextIdx, 'smooth');
  };

  return (
    <section
      id="planos"
      aria-labelledby="planos-heading"
      className="relative py-16 sm:py-24 bg-brand-dark scenic-spotlight border-b border-brand-dark-border overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da Seção com Escala Condensada 900 */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-8 sm:mb-12">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-brand-orange">
              <Flame className="h-4 w-4" aria-hidden="true" />
              <span>Passaporte de Treino</span>
            </div>
            <h2
              id="planos-heading"
              className="font-display text-[clamp(2.35rem,5.8vw,4.75rem)] font-black uppercase tracking-tight text-white leading-[0.93]"
            >
              INVISTA NA SUA <span className="text-brand-orange">FORÇA.</span>{' '}
              PREÇOS ABERTOS.
            </h2>
          </div>
          <p className="text-sm sm:text-lg text-stone-300 max-w-md leading-relaxed">
            Arraste para comparar os planos ou toque em um card lateral para
            centralizá-lo. Todos incluem musculação, cardio e coletivas.
          </p>
        </div>

        {/* Banner Sazonal em Formato de Ticket / Credencial VIP Esportivo */}
        {campanha.ativa ? (
          <div className="relative mb-10 sm:mb-14 overflow-hidden rounded-2xl border-2 border-brand-orange bg-brand-dark-surface shadow-orange-glow">
            {/* Recortes laterais de Ticket / Ingresso */}
            <div
              className="hidden md:block pointer-events-none absolute -left-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full border-2 border-brand-orange bg-brand-dark"
              aria-hidden="true"
            />
            <div
              className="hidden md:block pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full border-2 border-brand-orange bg-brand-dark"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Corpo Principal do Ticket VIP (8 cols) */}
              <div className="lg:col-span-8 p-5 sm:p-8 lg:p-10 space-y-3 sm:space-y-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 rounded bg-brand-orange px-3 py-1 font-display text-xs font-black uppercase tracking-widest text-black">
                    <Ticket className="h-3.5 w-3.5" aria-hidden="true" />
                    {campanha.badge}
                  </span>
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-yellow">
                    CREDENCIAL VIP // BLACK-FIT-AQ
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-5xl font-black uppercase tracking-tight text-white leading-[0.95]">
                  {campanha.titulo}:{' '}
                  <span className="text-brand-orange">
                    {campanha.brindeOuDesconto}
                  </span>
                </h3>

                <p className="text-xs sm:text-base text-stone-300 max-w-2xl leading-relaxed">
                  {subtituloCampanha}
                </p>
              </div>

              {/* Canhoto Destacável do Ticket (4 cols) */}
              <div className="lg:col-span-4 flex flex-col justify-between border-t-2 lg:border-t-0 lg:border-l-2 border-dashed border-brand-orange/50 bg-brand-dark-card p-5 sm:p-8">
                <div className="space-y-1">
                  <span className="block font-mono text-[11px] font-bold uppercase tracking-widest text-stone-400">
                    UNIDADE VÁLIDA
                  </span>
                  <span className="block font-display text-lg sm:text-xl font-black uppercase text-white">
                    {unidade.unidade} · DF 280
                  </span>
                </div>

                <div className="my-3.5">
                  <a
                    href={getWhatsAppUrl(
                      unidade.whatsapp,
                      `Olá! Quero resgatar o ticket da campanha ${campanha.titulo} na Academia Tropical Fit - ${unidade.unidade}.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-tactile flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-brand-orange px-5 py-3 font-display text-base sm:text-lg font-black uppercase tracking-wider text-black shadow-tactile hover:bg-brand-orange-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                  >
                    <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                    <span>Resgatar Ticket no WhatsApp</span>
                  </a>
                </div>

                <span className="block font-mono text-[10px] uppercase tracking-widest text-stone-500">
                  AUTENTICAÇÃO // SCA-{unidade.scaAlunoCodigo}
                </span>
              </div>
            </div>
          </div>
        ) : null}

        {/* Barra Seletora Rápida no Mobile (Mensal | Trimestral | Semestral) */}
        <div
          role="tablist"
          aria-label="Selecionar plano para centralizar"
          className="mb-4 grid grid-cols-3 gap-2 lg:hidden rounded-2xl border border-brand-dark-border bg-brand-dark-card p-1.5"
        >
          {planos.map((plano, idx) => {
            const ativo = activePlanIdx === idx;
            return (
              <button
                key={plano.id}
                type="button"
                role="tab"
                aria-selected={ativo}
                onClick={() => scrollToPlan(idx, 'smooth')}
                className={`flex min-h-[44px] flex-col items-center justify-center rounded-xl px-2 py-1.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${
                  ativo
                    ? 'bg-brand-orange text-black shadow-orange-glow-sm'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                <span className="font-display text-sm font-black uppercase tracking-wider">
                  {plano.nome}
                </span>
                <span
                  className={`text-[10px] font-bold tabular-nums ${
                    ativo ? 'text-black/80' : 'text-brand-orange'
                  }`}
                >
                  R$ {plano.precoMensal.toFixed(2).replace('.', ',')}
                </span>
              </button>
            );
          })}
        </div>

        {/* Carrossel Centralizado com Snap no Mobile (Trimestral no centro inicialmente, Mensal espiando à esq, Semestral à dir) -> 3 Colunas no Desktop */}
        <div
          ref={carouselRef}
          onScroll={handleCarouselScroll}
          style={{ scrollSnapType: 'x mandatory' }}
          className="flex lg:grid lg:grid-cols-3 gap-3.5 sm:gap-5 lg:gap-8 items-stretch overflow-x-auto lg:overflow-visible snap-x snap-mandatory no-scrollbar -mx-4 px-[11vw] sm:px-[18vw] lg:mx-0 lg:px-0 py-3"
        >
          {planos.map((plano, idx) => {
            const preco = formatPrecoParts(plano.precoMensal);
            const isDestaque = plano.destaque;
            const isCenteredMobile = activePlanIdx === idx;
            const whatsappPlanoUrl = getWhatsAppUrl(
              unidade.whatsapp,
              plano.mensagemWhatsApp
            );

            // Cálculo dinâmico de economia em relação ao plano mensal
            const economiaTotal =
              plano.periodoMeses > 1
                ? (planoMensal.precoMensal - plano.precoMensal) *
                  plano.periodoMeses
                : 0;
            const economiaFormatada =
              economiaTotal > 0
                ? `R$ ${economiaTotal.toFixed(2).replace('.', ',')}`
                : null;

            return (
              <article
                key={plano.id}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                onClick={() => {
                  if (activePlanIdx !== idx) {
                    scrollToPlan(idx, 'smooth');
                  }
                }}
                style={{
                  scrollSnapAlign: 'center',
                  ...(isDestaque
                    ? {
                        backgroundImage:
                          'radial-gradient(circle at 90% 10%, rgba(255, 107, 0, 0.24), transparent 55%)',
                      }
                    : {}),
                }}
                className={`relative flex w-[78vw] max-w-[330px] sm:w-[350px] sm:max-w-[350px] lg:w-auto lg:max-w-none shrink-0 snap-center flex-col justify-between rounded-2xl transition-all duration-300 cursor-pointer lg:cursor-default ${
                  isCenteredMobile
                    ? 'scale-100 opacity-100 z-10 border-2 border-brand-orange shadow-orange-glow'
                    : 'scale-95 opacity-70 lg:scale-100 lg:opacity-100 border border-brand-dark-border'
                } ${
                  isDestaque
                    ? 'bg-brand-dark-surface p-6 sm:p-8 lg:p-9 lg:border-2 lg:border-brand-orange lg:shadow-orange-glow lg:-my-3'
                    : 'bg-brand-dark-card p-6 sm:p-8 hover:border-stone-600'
                }`}
              >
                <div className="space-y-5">
                  {/* Topo do Card: Badge & Economia */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    {isDestaque ? (
                      <span className="inline-flex items-center gap-1.5 rounded-md bg-brand-orange px-3 py-1 font-display text-xs sm:text-sm font-black uppercase tracking-wider text-black shadow-orange-glow-sm">
                        ★ {plano.badge ?? 'MELHOR CUSTO-BENEFÍCIO'}
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-md border border-brand-dark-border bg-brand-dark px-3 py-1 font-display text-xs font-black uppercase tracking-widest text-stone-300">
                        CICLO DE {plano.periodoMeses}{' '}
                        {plano.periodoMeses === 1 ? 'MÊS' : 'MESES'}
                      </span>
                    )}

                    {economiaFormatada ? (
                      <span className="inline-flex items-center gap-1 rounded-md border border-brand-yellow/40 bg-brand-yellow/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-yellow tabular-nums">
                        <TrendingDown className="h-3.5 w-3.5" aria-hidden="true" />
                        Economize {economiaFormatada}
                      </span>
                    ) : null}
                  </div>

                  {/* Nome e Preço Display */}
                  <div className="border-b border-brand-dark-border pb-5">
                    <h3
                      className={`font-display font-black uppercase tracking-tight text-white leading-none ${
                        isDestaque
                          ? 'text-3xl sm:text-5xl'
                          : 'text-3xl sm:text-4xl'
                      }`}
                    >
                      PLANO {plano.nome}
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-sm text-stone-400">
                      {plano.periodoMeses === 1
                        ? 'Flexibilidade mês a mês sem fidelidade longa'
                        : `Contrato de ${plano.periodoMeses} meses (${plano.periodoMeses}x de ${preco.completo})`}
                    </p>

                    <div className="mt-5 flex items-baseline gap-1 tabular-nums">
                      <span className="font-display text-xl font-black text-brand-orange">
                        R$
                      </span>
                      <span
                        className={`font-display font-black leading-none tracking-tight text-white ${
                          isDestaque
                            ? 'text-5xl sm:text-7xl'
                            : 'text-5xl sm:text-6xl'
                        }`}
                      >
                        {preco.reais}
                      </span>
                      <span className="font-display text-2xl sm:text-3xl font-black text-brand-orange">
                        {preco.centavos}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-stone-400 ml-1">
                        /mês
                      </span>
                    </div>

                    {economiaFormatada ? (
                      <p className="mt-2 text-xs font-semibold text-brand-yellow">
                        Desconto total de {economiaFormatada} no período vs.
                        plano Mensal.
                      </p>
                    ) : null}
                  </div>

                  {/* Benefícios */}
                  <ul className="space-y-3">
                    {plano.beneficios.map((beneficio) => (
                      <li
                        key={beneficio}
                        className="flex items-start gap-2.5 text-xs sm:text-base text-stone-200"
                      >
                        <span
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded ${
                            isDestaque || isCenteredMobile
                              ? 'bg-brand-orange text-black'
                              : 'bg-brand-dark-surface border border-brand-orange/50 text-brand-orange'
                          }`}
                          aria-hidden="true"
                        >
                          <Check className="h-3.5 w-3.5 stroke-[3]" />
                        </span>
                        <span className="font-medium">{beneficio}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Botão CTA Tátil */}
                <div className="mt-6 pt-3">
                  <a
                    href={whatsappPlanoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className={`btn-tactile flex min-h-[50px] w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 font-display text-base sm:text-lg font-black uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${
                      isDestaque || isCenteredMobile
                        ? 'bg-brand-orange text-black shadow-tactile hover:bg-brand-orange-hover'
                        : 'border-2 border-brand-orange bg-brand-dark text-white hover:bg-brand-orange hover:text-black'
                    }`}
                  >
                    <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                    <span>Assinar Plano {plano.nome}</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {/* Controles Inferiores do Carrossel no Mobile (Setas + Indicadores) */}
        <div className="mt-4 flex lg:hidden items-center justify-between gap-3">
          <button
            type="button"
            onClick={handlePrevPlan}
            disabled={activePlanIdx === 0}
            aria-label="Plano anterior à esquerda"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-brand-dark-border bg-brand-dark-surface text-white disabled:opacity-35 active:scale-95 transition-colors hover:border-brand-orange"
          >
            <ChevronLeft className="h-5 w-5 text-brand-orange" aria-hidden="true" />
          </button>

          <div className="flex items-center gap-2">
            {planos.map((plano, idx) => {
              const ativo = idx === activePlanIdx;
              return (
                <button
                  key={plano.id}
                  type="button"
                  onClick={() => scrollToPlan(idx, 'smooth')}
                  aria-label={`Centralizar Plano ${plano.nome}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    ativo
                      ? 'w-8 bg-brand-orange'
                      : 'w-2.5 bg-brand-dark-border hover:bg-stone-500'
                  }`}
                />
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleNextPlan}
            disabled={activePlanIdx === planos.length - 1}
            aria-label="Próximo plano à direita"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-brand-dark-border bg-brand-dark-surface text-white disabled:opacity-35 active:scale-95 transition-colors hover:border-brand-orange"
          >
            <ChevronRight className="h-5 w-5 text-brand-orange" aria-hidden="true" />
          </button>
        </div>

        {/* Nota de Rodapé */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-center text-xs sm:text-sm text-stone-400">
          <ShieldCheck
            className="h-4 w-4 text-brand-orange shrink-0"
            aria-hidden="true"
          />
          <span>
            Matrícula imediata na recepção da{' '}
            <strong className="text-white">{unidade.unidade}</strong> (DF 280,
            KM 3) ou pelo atendimento rápido no WhatsApp.
          </span>
        </div>
      </div>
    </section>
  );
}
