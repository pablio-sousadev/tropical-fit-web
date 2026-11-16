import {
  MapPin,
  Clock,
  MessageCircle,
  ChevronRight,
  Dumbbell,
  Flame,
  Smartphone,
} from 'lucide-react';
import { ACADEMIA_DATA } from '@/data/academia';
import { formatPrecoParts, getWhatsAppUrl } from '@/lib/links';

export function Hero() {
  const { unidade, horarios, planos, campanha } = ACADEMIA_DATA;
  const whatsappUrl = getWhatsAppUrl(
    unidade.whatsapp,
    'Olá! Vim pelo site da Academia Tropical Fit (Unidade Água Quente) e quero me matricular!'
  );

  const planoDestaque =
    planos.find((p) => p.destaque) ?? planos[planos.length - 1];
  const precoDestaque = formatPrecoParts(planoDestaque.precoMensal);

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-brand-dark pt-24 pb-16 sm:pt-28 sm:pb-24 lg:pt-32 lg:pb-28 border-b border-brand-dark-border"
    >
      {/* Textura arquitetônica de fundo + acento geométrico laranja */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(circle at 85% 15%, rgba(255, 107, 0, 0.28), transparent 45%), radial-gradient(circle at 10% 80%, rgba(255, 107, 0, 0.12), transparent 40%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Coluna Principal (7 cols no desktop) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Pílula de Localização */}
            <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-brand-orange/40 bg-brand-orange/10 px-3.5 py-1.5 text-xs sm:text-sm font-bold text-brand-orange">
              <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{unidade.unidade} · DF 280 KM 3</span>
              <span className="hidden sm:inline text-neutral-400 font-medium">
                (SH Água Quente, Brasília - DF)
              </span>
            </div>

            {/* Headline Atlética */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-brand-yellow">
                <span aria-hidden="true">///</span>
                <span>Treino sério perto de casa</span>
              </div>

              <h1
                id="hero-heading"
                className="text-[clamp(2.2rem,5.5vw,4.25rem)] font-black uppercase leading-[1.03] tracking-tight text-white break-words"
              >
                Sua evolução começa na{' '}
                <span className="text-brand-orange">Tropical Fit</span> Água
                Quente.
              </h1>

              <p className="max-w-2xl text-base sm:text-lg lg:text-xl text-neutral-300 leading-relaxed">
                Estrutura completa de musculação, peso livre, cardio e aulas
                coletivas com professores dedicados na{' '}
                <strong className="text-white font-semibold">
                  DF 280, KM 3
                </strong>
                . Sem taxa escondida, com valores abertos e acompanhamento no
                App SCA Aluno.
              </p>
            </div>

            {/* Horários de Funcionamento em Destaque */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
              {horarios.map((item) => (
                <div
                  key={item.dias}
                  className="flex items-center gap-3.5 rounded-xl border border-brand-dark-border bg-brand-dark-card/90 p-3.5 sm:p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-orange/15 text-brand-orange">
                    <Clock className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                      {item.dias}
                    </p>
                    <p className="text-base sm:text-lg font-black text-white truncate">
                      {item.horario}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs Duplos */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-xl bg-brand-orange px-6 py-3.5 text-sm sm:text-base font-black uppercase tracking-wider text-black shadow-lg shadow-brand-orange/25 hover:bg-brand-orange-hover transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
              >
                <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span>Matricule-se pelo WhatsApp</span>
              </a>

              <a
                href="#planos"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border-2 border-white/20 bg-brand-dark-card px-6 py-3.5 text-sm sm:text-base font-bold uppercase tracking-wider text-white hover:border-brand-orange hover:text-brand-orange transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
              >
                <span>Ver Planos</span>
                <ChevronRight className="h-5 w-5 shrink-0" aria-hidden="true" />
              </a>
            </div>

            {/* Destaques Rápidos */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-2 border-t border-brand-dark-border max-w-xl text-xs sm:text-sm text-neutral-300">
              <div className="flex items-center gap-2">
                <Dumbbell
                  className="h-4 w-4 text-brand-orange shrink-0"
                  aria-hidden="true"
                />
                <span>Musculação & Cardio</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame
                  className="h-4 w-4 text-brand-orange shrink-0"
                  aria-hidden="true"
                />
                <span>Aulas Coletivas</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone
                  className="h-4 w-4 text-brand-orange shrink-0"
                  aria-hidden="true"
                />
                <span>App SCA {unidade.scaAlunoCodigo}</span>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Painel Visual de Impacto (5 cols no desktop) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border-2 border-brand-orange/60 bg-brand-dark-card overflow-hidden shadow-2xl">
              {/* Barra Superior da Marca */}
              <div className="flex items-center justify-between bg-brand-orange px-5 py-3 text-black">
                <span className="text-xs font-black uppercase tracking-widest">
                  {campanha.ativa ? campanha.titulo : 'Planos Abertos'}
                </span>
                <span className="rounded bg-black px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wider text-brand-yellow">
                  {campanha.ativa ? campanha.badge : 'Sem Fidelidade Oculta'}
                </span>
              </div>

              {/* Imagem de Destaque da Estrutura */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900 border-b border-brand-dark-border">
                <img
                  src="/images/estrutura/musculacao.jpg"
                  alt="Ambiente de treino da Academia Tropical Fit Unidade Água Quente"
                  width={600}
                  height={375}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-card via-brand-dark-card/30 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-2">
                  <div>
                    <span className="inline-block rounded bg-black/80 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-orange border border-brand-orange/30">
                      {unidade.referencia}
                    </span>
                  </div>
                </div>
              </div>

              {/* Resumo de Conversão Rápida */}
              <div className="p-5 sm:p-6 space-y-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                      Plano {planoDestaque.nome} ({planoDestaque.periodoMeses}x)
                    </p>
                    <p className="text-sm font-semibold text-brand-yellow">
                      {planoDestaque.badge ?? 'Melhor Custo-Benefício'}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-neutral-400">
                      A partir de{' '}
                    </span>
                    <div className="inline-flex items-baseline text-white">
                      <span className="text-sm font-bold text-brand-orange mr-1">
                        R$
                      </span>
                      <span className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                        {precoDestaque.reais}
                      </span>
                      <span className="text-xl font-black text-brand-orange">
                        {precoDestaque.centavos}
                      </span>
                      <span className="text-xs font-semibold text-neutral-400 ml-1">
                        /mês
                      </span>
                    </div>
                  </div>
                </div>

                {campanha.ativa ? (
                  <div className="rounded-xl border border-brand-yellow/30 bg-brand-yellow/10 p-3.5 text-xs sm:text-sm text-neutral-200">
                    <p className="font-bold text-brand-yellow uppercase tracking-wide">
                      ★ {campanha.titulo}: {campanha.brindeOuDesconto}
                    </p>
                  </div>
                ) : null}

                <div className="grid grid-cols-2 gap-2.5 text-xs text-neutral-300">
                  <div className="rounded-lg bg-brand-dark p-3 border border-brand-dark-border">
                    <p className="font-bold text-white">Modalidades Coletivas</p>
                    <p className="text-neutral-400 mt-0.5">
                      Jump · Funcional · Fit Dance · Judô · Step
                    </p>
                  </div>
                  <div className="rounded-lg bg-brand-dark p-3 border border-brand-dark-border">
                    <p className="font-bold text-white">Código SCA Aluno</p>
                    <p className="font-mono text-sm font-black text-brand-orange mt-0.5">
                      {unidade.scaAlunoCodigo}
                    </p>
                  </div>
                </div>

                <a
                  href="#estrutura"
                  className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg border border-brand-dark-border bg-brand-dark py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-300 hover:border-brand-orange hover:text-white transition-colors"
                >
                  <span>Conhecer toda a estrutura</span>
                  <ChevronRight className="h-4 w-4 text-brand-orange" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
