import {
  MapPin,
  Clock,
  MessageCircle,
  ChevronRight,
  Flame,
  Smartphone,
  Disc,
} from 'lucide-react';
import { ACADEMIA_DATA } from '@/data/academia';
import { formatPrecoParts, getWhatsAppUrl } from '@/lib/links';

const WEIGHT_PLATE_BADGES = [
  {
    id: 'horario',
    codigo: 'TURNOS // SEG-SEX',
    rotulo: '5H30 - 23H',
    destaque: false,
  },
  {
    id: 'local',
    codigo: 'ÁGUA QUENTE // BSB',
    rotulo: 'DF 280 KM 3',
    destaque: false,
  },
  {
    id: 'preco',
    codigo: 'SEM TAXA OCULTA',
    rotulo: 'MENSALIDADE A PARTIR DE R$ 84,90',
    destaque: true,
  },
] as const;

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
      className="relative overflow-hidden bg-brand-dark scenic-spotlight pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-28 border-b border-brand-dark-border"
    >
      {/* Malha estrutural de arena */}
      <div
        className="pointer-events-none absolute inset-0 scenic-grid opacity-80"
        aria-hidden="true"
      />

      {/* Marca d'água tipográfica gigante de fundo */}
      <div
        className="pointer-events-none select-none absolute -top-6 right-0 font-display text-[18vw] font-black uppercase leading-none tracking-tighter text-white/[0.025]"
        aria-hidden="true"
      >
        TROPICAL FIT
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Coluna Esquerda: Manchete Imponente + Placas de Peso + CTAs Táteis */}
          <div className="lg:col-span-7 space-y-7 sm:space-y-8">
            {/* Kicker de Arena */}
            <div className="inline-flex flex-wrap items-center gap-2.5 rounded-md border border-brand-orange/40 bg-brand-dark-surface px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-brand-orange">
              <span className="h-2 w-2 rounded-full bg-brand-orange" aria-hidden="true" />
              <span>{unidade.unidade} · ALTA PERFORMANCE</span>
              <span className="text-stone-400 hidden sm:inline">
                // SH ÁGUA QUENTE
              </span>
            </div>

            {/* Manchete Display 900 com Contraste Radical (3x-5x) */}
            <div className="space-y-5">
              <h1
                id="hero-heading"
                className="font-display text-[clamp(3rem,7.8vw,6.25rem)] font-black uppercase leading-[0.92] tracking-[-0.02em] text-white break-words"
              >
                TREINO DE VERDADE.{' '}
                <span className="block text-brand-orange">
                  FORÇA SEM DESCULPAS
                </span>{' '}
                NA ÁGUA QUENTE.
              </h1>

              <p className="max-w-[60ch] text-base sm:text-lg lg:text-xl font-normal text-stone-300 leading-relaxed">
                Arena completa de musculação, peso livre, cardio e aulas
                coletivas na{' '}
                <strong className="font-semibold text-white">
                  DF 280, KM 3
                </strong>
                . Equipamentos prontos para carga pesada, valores abertos e
                controle total pelo App SCA Aluno.
              </p>
            </div>

            {/* Badges Esportivas em Formato de Anilha / Placa de Peso */}
            <div
              aria-label="Destaques rápidos da unidade"
              className="flex flex-wrap items-stretch gap-2.5 sm:gap-3"
            >
              {WEIGHT_PLATE_BADGES.map((badge) => (
                <div
                  key={badge.id}
                  className={`relative inline-flex items-center gap-3 rounded-xl border-2 px-3.5 py-2.5 transition-colors ${
                    badge.destaque
                      ? 'border-brand-orange bg-brand-orange/15 text-white shadow-orange-glow-sm'
                      : 'border-brand-dark-border bg-brand-dark-surface text-stone-100'
                  }`}
                >
                  {/* Furo esquerdo da anilha/placa */}
                  <span
                    className={`h-4 w-1.5 rounded-full shrink-0 ${
                      badge.destaque ? 'bg-brand-orange' : 'bg-brand-dark-border'
                    }`}
                    aria-hidden="true"
                  />
                  <div className="leading-none">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-stone-400">
                      {badge.codigo}
                    </span>
                    <span
                      className={`mt-1 block font-display text-base sm:text-lg font-black uppercase tracking-wide tabular-nums ${
                        badge.destaque ? 'text-brand-orange' : 'text-white'
                      }`}
                    >
                      {badge.rotulo}
                    </span>
                  </div>
                  {/* Furo direito da anilha/placa */}
                  <span
                    className={`h-4 w-1.5 rounded-full shrink-0 ${
                      badge.destaque ? 'bg-brand-orange' : 'bg-brand-dark-border'
                    }`}
                    aria-hidden="true"
                  />
                </div>
              ))}
            </div>

            {/* CTAs com Micro-Elevação e Acabamento Tátil */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-tactile inline-flex min-h-[56px] items-center justify-center gap-3 rounded-xl bg-brand-orange px-7 py-4 font-display text-lg sm:text-xl font-black uppercase tracking-wider text-black shadow-tactile hover:bg-brand-orange-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
              >
                <MessageCircle className="h-5 w-5 shrink-0 stroke-[2.5]" aria-hidden="true" />
                <span>Matricule-se pelo WhatsApp</span>
              </a>

              <a
                href="#planos"
                className="btn-tactile inline-flex min-h-[56px] items-center justify-center gap-2 rounded-xl border-2 border-brand-dark-border bg-brand-dark-surface px-7 py-4 font-display text-lg sm:text-xl font-black uppercase tracking-wider text-white hover:border-brand-orange hover:text-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
              >
                <span>Ver Planos</span>
                <ChevronRight className="h-5 w-5 shrink-0" aria-hidden="true" />
              </a>
            </div>

            {/* Telemetria de Horários & Localização */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-brand-dark-border">
              {horarios.map((item) => (
                <div
                  key={item.dias}
                  className="flex items-center justify-between rounded-xl border border-brand-dark-border bg-brand-dark-card px-4 py-3"
                >
                  <div className="flex items-center gap-2.5">
                    <Clock
                      className="h-4 w-4 text-brand-orange shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-300">
                      {item.dias}
                    </span>
                  </div>
                  <span className="font-display text-lg font-black uppercase tracking-wide text-white tabular-nums">
                    {item.horario}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Coluna Direita: Painel de Arena & Anilha de Performance */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl border-2 border-brand-orange bg-brand-dark-card shadow-orange-glow">
              {/* Header Técnico do Painel */}
              <div className="flex items-center justify-between gap-2 bg-brand-orange px-5 py-3 text-black">
                <div className="flex items-center gap-2">
                  <Disc className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="font-display text-sm font-black uppercase tracking-wider">
                    {campanha.ativa ? campanha.titulo : 'ACESSO TOTAL À ARENA'}
                  </span>
                </div>
                <span className="rounded bg-black px-2.5 py-0.5 font-display text-xs font-black uppercase tracking-widest text-brand-yellow">
                  {campanha.ativa ? campanha.badge : 'UNIDADE 01'}
                </span>
              </div>

              {/* Imagem com Moldura de Visor Esportivo */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-dark border-b border-brand-dark-border">
                <img
                  src="/images/estrutura/musculacao.jpg"
                  alt="Sala de musculação e peso livre da Academia Tropical Fit Unidade Água Quente"
                  width={600}
                  height={375}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-card via-brand-dark-card/35 to-transparent" />

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded bg-brand-dark/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-stone-200 border border-brand-dark-border">
                    <MapPin className="h-3.5 w-3.5 text-brand-orange" aria-hidden="true" />
                    {unidade.referencia}
                  </span>
                </div>
              </div>

              {/* Bloco de Preço Heroico & Credencial */}
              <div className="p-6 sm:p-7 space-y-5">
                <div className="flex items-end justify-between gap-4 border-b border-brand-dark-border pb-5">
                  <div>
                    <span className="inline-block rounded bg-brand-orange/15 px-2.5 py-1 text-[11px] font-black uppercase tracking-widest text-brand-orange">
                      {planoDestaque.badge ?? 'Melhor Custo-Benefício'}
                    </span>
                    <p className="mt-2 font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                      PLANO {planoDestaque.nome}
                    </p>
                    <p className="text-xs font-medium text-stone-400">
                      Musculação + Cardio + Coletivas inclusas
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="block text-[11px] font-bold uppercase tracking-widest text-stone-400">
                      Por apenas
                    </span>
                    <div className="inline-flex items-baseline text-white tabular-nums">
                      <span className="font-display text-lg font-black text-brand-orange mr-1">
                        R$
                      </span>
                      <span className="font-display text-5xl sm:text-6xl font-black leading-none tracking-tight text-white">
                        {precoDestaque.reais}
                      </span>
                      <span className="font-display text-2xl font-black text-brand-orange">
                        {precoDestaque.centavos}
                      </span>
                      <span className="text-xs font-bold uppercase text-stone-400 ml-1">
                        /mês
                      </span>
                    </div>
                  </div>
                </div>

                {campanha.ativa ? (
                  <div className="flex items-center gap-3 rounded-xl border border-brand-yellow/40 bg-brand-dark-surface px-4 py-3">
                    <Flame
                      className="h-5 w-5 text-brand-yellow shrink-0"
                      aria-hidden="true"
                    />
                    <p className="text-xs sm:text-sm font-bold text-stone-100">
                      <span className="text-brand-yellow uppercase">
                        {campanha.titulo}:
                      </span>{' '}
                      {campanha.brindeOuDesconto}
                    </p>
                  </div>
                ) : null}

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-brand-dark-border bg-brand-dark-surface p-3.5">
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-stone-400">
                      Arena Coletiva
                    </span>
                    <span className="mt-1 block font-display text-base font-black uppercase tracking-wide text-white">
                      Jump · Fit Dance · Judô · Step
                    </span>
                  </div>
                  <div className="rounded-xl border border-brand-dark-border bg-brand-dark-surface p-3.5">
                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-stone-400">
                      <Smartphone className="h-3 w-3 text-brand-orange" aria-hidden="true" />
                      SCA Aluno
                    </span>
                    <span className="mt-1 block font-mono text-base font-black tracking-widest text-brand-orange tabular-nums">
                      #{unidade.scaAlunoCodigo}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
