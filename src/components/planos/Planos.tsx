import {
  Check,
  MessageCircle,
  Gift,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { ACADEMIA_DATA } from '@/data/academia';
import {
  formatPrecoParts,
  getWhatsAppUrl,
  isPlaceholderValue,
} from '@/lib/links';

export function Planos() {
  const { planos, campanha, unidade } = ACADEMIA_DATA;

  const subtituloCampanha =
    campanha.subtitulo && !isPlaceholderValue(campanha.subtitulo)
      ? campanha.subtitulo
      : 'Matricule-se ou renove seu plano na Unidade Água Quente e aproveite condições especiais.';

  return (
    <section
      id="planos"
      aria-labelledby="planos-heading"
      className="py-16 sm:py-24 bg-brand-dark border-b border-brand-dark-border"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-brand-orange">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            <span>Transparência Total</span>
          </div>
          <h2
            id="planos-heading"
            className="text-[clamp(1.85rem,4vw,3.25rem)] font-black uppercase tracking-tight text-white leading-tight"
          >
            Planos com <span className="text-brand-orange">Valores Abertos</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            Escolha o plano ideal para sua rotina. Todos incluem musculação,
            cardio, peso livre, aulas coletivas e acesso ao App SCA Aluno.
          </p>
        </div>

        {/* Banner de Campanha Sazonal (renderizado se campanha.ativa === true) */}
        {campanha.ativa ? (
          <div className="mb-10 sm:mb-12 rounded-2xl border-2 border-brand-orange bg-brand-orange text-black p-5 sm:p-7 shadow-xl shadow-brand-orange/15">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 rounded-md bg-black px-3 py-1 text-xs font-black uppercase tracking-widest text-brand-yellow">
                  <Gift className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{campanha.badge}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black">
                  {campanha.titulo}: {campanha.brindeOuDesconto}
                </h3>
                <p className="text-sm sm:text-base font-semibold text-black/85 max-w-2xl">
                  {subtituloCampanha}
                </p>
              </div>

              <div className="shrink-0">
                <a
                  href={getWhatsAppUrl(
                    unidade.whatsapp,
                    `Olá! Quero aproveitar a campanha ${campanha.titulo} na Academia Tropical Fit - ${unidade.unidade}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 text-xs sm:text-sm font-black uppercase tracking-wider text-white hover:bg-neutral-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                >
                  <MessageCircle className="h-4 w-4 text-brand-orange" aria-hidden="true" />
                  <span>Garantir Condição no WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        ) : null}

        {/* Grid de 3 Cards de Planos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {planos.map((plano) => {
            const preco = formatPrecoParts(plano.precoMensal);
            const isDestaque = plano.destaque;
            const whatsappPlanoUrl = getWhatsAppUrl(
              unidade.whatsapp,
              plano.mensagemWhatsApp
            );

            return (
              <article
                key={plano.id}
                className={`relative flex flex-col justify-between rounded-2xl p-6 sm:p-8 transition-all duration-200 ${
                  isDestaque
                    ? 'border-2 border-brand-orange bg-[#17120E] shadow-2xl shadow-brand-orange/15 lg:-translate-y-2'
                    : 'border border-brand-dark-border bg-brand-dark-card hover:border-neutral-700'
                }`}
              >
                {/* Selo de Melhor Custo-Benefício */}
                {isDestaque || plano.badge ? (
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange px-3.5 py-1 text-xs font-black uppercase tracking-wider text-black">
                      ★ {plano.badge ?? 'Melhor Custo-Benefício'}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-yellow">
                      Mais Escolhido
                    </span>
                  </div>
                ) : (
                  <div className="mb-4">
                    <span className="inline-block rounded-full border border-brand-dark-border bg-brand-dark px-3 py-1 text-xs font-bold uppercase tracking-wider text-neutral-400">
                      Contrato de {plano.periodoMeses}{' '}
                      {plano.periodoMeses === 1 ? 'mês' : 'meses'}
                    </span>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Nome do Plano e Preço */}
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                      Plano {plano.nome}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-neutral-400">
                      {plano.periodoMeses === 1
                        ? 'Renovação mensal flexível'
                        : `Compromisso de ${plano.periodoMeses} meses (${plano.periodoMeses}x de ${preco.completo})`}
                    </p>

                    <div className="mt-5 flex items-baseline gap-1">
                      <span className="text-base font-bold text-brand-orange">
                        R$
                      </span>
                      <span className="text-5xl sm:text-6xl font-black tracking-tight text-white">
                        {preco.reais}
                      </span>
                      <span className="text-2xl font-black text-brand-orange">
                        {preco.centavos}
                      </span>
                      <span className="text-sm font-semibold text-neutral-400 ml-1">
                        /mês
                      </span>
                    </div>
                  </div>

                  {/* Lista de Benefícios */}
                  <ul className="space-y-3 border-t border-brand-dark-border pt-5">
                    {plano.beneficios.map((beneficio) => (
                      <li
                        key={beneficio}
                        className="flex items-start gap-3 text-sm text-neutral-200"
                      >
                        <span
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                            isDestaque
                              ? 'bg-brand-orange text-black'
                              : 'bg-brand-orange/20 text-brand-orange'
                          }`}
                          aria-hidden="true"
                        >
                          <Check className="h-3.5 w-3.5 stroke-[3]" />
                        </span>
                        <span>{beneficio}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA WhatsApp Específico do Plano */}
                <div className="mt-8 pt-4">
                  <a
                    href={whatsappPlanoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex min-h-[50px] w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-xs sm:text-sm font-black uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${
                      isDestaque
                        ? 'bg-brand-orange text-black hover:bg-brand-orange-hover shadow-lg shadow-brand-orange/25'
                        : 'border-2 border-brand-orange text-white hover:bg-brand-orange hover:text-black'
                    }`}
                  >
                    <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Quero o Plano {plano.nome}</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {/* Rodapé informativo de confiança */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-center text-xs sm:text-sm text-neutral-400">
          <ShieldCheck className="h-4 w-4 text-brand-orange shrink-0" aria-hidden="true" />
          <span>
            Atendimento rápido pelo WhatsApp ou presencialmente na recepção da{' '}
            <strong className="text-white">{unidade.unidade}</strong>.
          </span>
        </div>
      </div>
    </section>
  );
}
