import {
  Check,
  MessageCircle,
  Ticket,
  Flame,
  ShieldCheck,
  TrendingDown,
} from 'lucide-react';
import { ACADEMIA_DATA } from '@/data/academia';
import {
  formatPrecoParts,
  getWhatsAppUrl,
  isPlaceholderValue,
} from '@/lib/links';

export function Planos() {
  const { planos, campanha, unidade } = ACADEMIA_DATA;

  const planoMensal = planos.find((p) => p.periodoMeses === 1) ?? planos[0];

  const subtituloCampanha =
    campanha.subtitulo && !isPlaceholderValue(campanha.subtitulo)
      ? campanha.subtitulo
      : 'Apresente este ticket pelo WhatsApp ou na recepção da Unidade Água Quente para ativar sua condição especial.';

  return (
    <section
      id="planos"
      aria-labelledby="planos-heading"
      className="relative py-20 sm:py-28 bg-brand-dark scenic-spotlight border-b border-brand-dark-border overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da Seção com Escala Condensada 900 */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-brand-orange">
              <Flame className="h-4 w-4" aria-hidden="true" />
              <span>Passaporte de Treino</span>
            </div>
            <h2
              id="planos-heading"
              className="font-display text-[clamp(2.5rem,5.8vw,4.75rem)] font-black uppercase tracking-tight text-white leading-[0.93]"
            >
              INVISTA NA SUA <span className="text-brand-orange">FORÇA.</span>{' '}
              PREÇOS ABERTOS.
            </h2>
          </div>
          <p className="text-base sm:text-lg text-stone-300 max-w-md leading-relaxed">
            Sem letras miúdas: todos os planos liberam musculação, peso livre,
            cardio, aulas coletivas e o App SCA Aluno.
          </p>
        </div>

        {/* Banner Sazonal em Formato de Ticket / Credencial VIP Esportivo */}
        {campanha.ativa ? (
          <div className="relative mb-14 overflow-hidden rounded-2xl border-2 border-brand-orange bg-brand-dark-surface shadow-orange-glow">
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
              <div className="lg:col-span-8 p-6 sm:p-8 lg:p-10 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded bg-brand-orange px-3 py-1 font-display text-xs font-black uppercase tracking-widest text-black">
                    <Ticket className="h-3.5 w-3.5" aria-hidden="true" />
                    {campanha.badge}
                  </span>
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-yellow">
                    CREDENCIAL VIP // BLACK-FIT-AQ
                  </span>
                </div>

                <h3 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-[0.95]">
                  {campanha.titulo}:{' '}
                  <span className="text-brand-orange">
                    {campanha.brindeOuDesconto}
                  </span>
                </h3>

                <p className="text-sm sm:text-base text-stone-300 max-w-2xl leading-relaxed">
                  {subtituloCampanha}
                </p>
              </div>

              {/* Canhoto Destacável do Ticket (4 cols) */}
              <div className="lg:col-span-4 flex flex-col justify-between border-t-2 lg:border-t-0 lg:border-l-2 border-dashed border-brand-orange/50 bg-brand-dark-card p-6 sm:p-8">
                <div className="space-y-1">
                  <span className="block font-mono text-[11px] font-bold uppercase tracking-widest text-stone-400">
                    UNIDADE VÁLIDA
                  </span>
                  <span className="block font-display text-xl font-black uppercase text-white">
                    {unidade.unidade} · DF 280
                  </span>
                </div>

                <div className="my-4">
                  <a
                    href={getWhatsAppUrl(
                      unidade.whatsapp,
                      `Olá! Quero resgatar o ticket da campanha ${campanha.titulo} na Academia Tropical Fit - ${unidade.unidade}.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-tactile flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-brand-orange px-5 py-3.5 font-display text-base sm:text-lg font-black uppercase tracking-wider text-black shadow-tactile hover:bg-brand-orange-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
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

        {/* Grid de Planos com Card Semestral Heroico Dominante */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch pt-2">
          {planos.map((plano) => {
            const preco = formatPrecoParts(plano.precoMensal);
            const isDestaque = plano.destaque;
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
                className={`relative flex flex-col justify-between rounded-2xl transition-all duration-200 ${
                  isDestaque
                    ? 'z-10 border-2 border-brand-orange bg-brand-dark-surface p-7 sm:p-9 shadow-orange-glow lg:-my-3'
                    : 'border border-brand-dark-border bg-brand-dark-card p-6 sm:p-8 hover:border-stone-600'
                }`}
                style={
                  isDestaque
                    ? {
                        backgroundImage:
                          'radial-gradient(circle at 90% 10%, rgba(255, 107, 0, 0.24), transparent 55%)',
                      }
                    : undefined
                }
              >
                <div className="space-y-6">
                  {/* Topo do Card: Badge & Duração */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    {isDestaque ? (
                      <span className="inline-flex items-center gap-1.5 rounded-md bg-brand-orange px-3.5 py-1 font-display text-sm font-black uppercase tracking-wider text-black shadow-orange-glow-sm">
                        ★ {plano.badge ?? 'MELHOR CUSTO-BENEFÍCIO'}
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-md border border-brand-dark-border bg-brand-dark px-3 py-1 font-display text-xs font-black uppercase tracking-widest text-stone-300">
                        CICLO DE {plano.periodoMeses}{' '}
                        {plano.periodoMeses === 1 ? 'MÊS' : 'MESES'}
                      </span>
                    )}

                    {economiaFormatada ? (
                      <span className="inline-flex items-center gap-1 rounded-md border border-brand-yellow/40 bg-brand-yellow/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-yellow tabular-nums">
                        <TrendingDown className="h-3.5 w-3.5" aria-hidden="true" />
                        Economize {economiaFormatada}
                      </span>
                    ) : null}
                  </div>

                  {/* Nome e Preço Display */}
                  <div className="border-b border-brand-dark-border pb-6">
                    <h3
                      className={`font-display font-black uppercase tracking-tight text-white leading-none ${
                        isDestaque
                          ? 'text-4xl sm:text-5xl'
                          : 'text-3xl sm:text-4xl'
                      }`}
                    >
                      PLANO {plano.nome}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-stone-400">
                      {plano.periodoMeses === 1
                        ? 'Flexibilidade mês a mês sem fidelidade longa'
                        : `Contrato de ${plano.periodoMeses} meses (${plano.periodoMeses}x de ${preco.completo})`}
                    </p>

                    <div className="mt-6 flex items-baseline gap-1 tabular-nums">
                      <span className="font-display text-xl font-black text-brand-orange">
                        R$
                      </span>
                      <span
                        className={`font-display font-black leading-none tracking-tight text-white ${
                          isDestaque
                            ? 'text-6xl sm:text-7xl'
                            : 'text-5xl sm:text-6xl'
                        }`}
                      >
                        {preco.reais}
                      </span>
                      <span className="font-display text-3xl font-black text-brand-orange">
                        {preco.centavos}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-stone-400 ml-1">
                        /mês
                      </span>
                    </div>

                    {economiaFormatada ? (
                      <p className="mt-2 text-xs font-semibold text-brand-yellow">
                        Equivale a {economiaFormatada} de desconto acumulado no
                        período em comparação ao plano Mensal.
                      </p>
                    ) : null}
                  </div>

                  {/* Benefícios */}
                  <ul className="space-y-3.5">
                    {plano.beneficios.map((beneficio) => (
                      <li
                        key={beneficio}
                        className="flex items-start gap-3 text-sm sm:text-base text-stone-200"
                      >
                        <span
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded ${
                            isDestaque
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
                <div className="mt-8 pt-4">
                  <a
                    href={whatsappPlanoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn-tactile flex min-h-[54px] w-full items-center justify-center gap-2.5 rounded-xl px-6 py-4 font-display text-base sm:text-lg font-black uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${
                      isDestaque
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

        {/* Nota de Rodapé */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 text-center text-xs sm:text-sm text-stone-400">
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
