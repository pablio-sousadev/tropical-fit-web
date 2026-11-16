import {
  MapPin,
  Clock,
  Navigation,
  MessageCircle,
  Instagram,
  Compass,
} from 'lucide-react';
import { ACADEMIA_DATA } from '@/data/academia';
import {
  getGoogleMapsEmbedInfo,
  getGoogleMapsUrl,
  getInstagramUrl,
  getWhatsAppUrl,
} from '@/lib/links';

export function Localizacao() {
  const { unidade, horarios } = ACADEMIA_DATA;
  const whatsappUrl = getWhatsAppUrl(
    unidade.whatsapp,
    'Olá! Gostaria de saber como chegar na Academia Tropical Fit - Unidade Água Quente.'
  );
  const instagramUrl = getInstagramUrl(unidade.instagram);
  const mapsUrl = getGoogleMapsUrl(unidade.googleMapsUrl, unidade.endereco);
  const { embedUrl } = getGoogleMapsEmbedInfo(
    unidade.googleMapsEmbedUrl,
    unidade.endereco
  );

  return (
    <section
      id="localizacao"
      aria-labelledby="localizacao-heading"
      className="py-20 sm:py-28 bg-brand-dark border-b border-brand-dark-border"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da Seção */}
        <div className="space-y-3 max-w-2xl mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-brand-orange">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            <span>Ponto de Encontro</span>
          </div>
          <h2
            id="localizacao-heading"
            className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-black uppercase tracking-tight text-white leading-[0.93]"
          >
            LOCALIZAÇÃO NA{' '}
            <span className="text-brand-orange">DF 280 KM 3</span>
          </h2>
          <p className="text-base sm:text-lg text-stone-300 leading-relaxed">
            Fácil acesso para quem mora ou passa por Água Quente, Residencial
            São Francisco e região. Venha conhecer a academia pessoalmente.
          </p>
        </div>

        {/* Grid 2 Colunas (Info + Mapa) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Coluna 1: Endereço, Horários e Canais Diretos */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 rounded-2xl border-2 border-brand-dark-border bg-brand-dark-card p-6 sm:p-8">
            <div className="space-y-6">
              {/* Bloco de Endereço */}
              <div className="space-y-2.5">
                <span className="inline-flex items-center gap-1.5 rounded bg-brand-orange/15 px-2.5 py-1 font-display text-xs font-black uppercase tracking-widest text-brand-orange">
                  <Compass className="h-3.5 w-3.5" aria-hidden="true" />
                  {unidade.unidade}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                  {unidade.endereco}
                </h3>
                <p className="text-sm text-stone-300">{unidade.referencia}</p>
              </div>

              {/* Bloco de Horários Detalhados */}
              <div className="space-y-3 border-t border-brand-dark-border pt-5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-orange">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  <span>Horário de Funcionamento</span>
                </div>

                <div className="space-y-2.5">
                  {horarios.map((h) => (
                    <div
                      key={h.dias}
                      className="flex items-center justify-between gap-2 rounded-xl border border-brand-dark-border bg-brand-dark-surface px-4 py-3"
                    >
                      <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-300">
                        {h.dias}
                      </span>
                      <span className="font-display text-lg sm:text-xl font-black uppercase tracking-wide text-brand-orange tabular-nums">
                        {h.horario}
                      </span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between gap-2 rounded-xl border border-brand-dark-border/60 bg-brand-dark px-4 py-2.5 text-xs text-stone-400">
                    <span className="uppercase tracking-wider">Domingos</span>
                    <span className="font-display text-sm font-black uppercase tracking-wider">
                      Fechado
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs de Rota, WhatsApp e Instagram */}
            <div className="space-y-3 pt-4 border-t border-brand-dark-border">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-tactile flex min-h-[50px] w-full items-center justify-center gap-2 rounded-xl border-2 border-brand-orange bg-brand-dark-surface px-5 py-3 font-display text-base sm:text-lg font-black uppercase tracking-wider text-white hover:bg-brand-orange hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
              >
                <Navigation className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Traçar Rota no Google Maps</span>
              </a>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-tactile flex min-h-[50px] items-center justify-center gap-2 rounded-xl bg-brand-orange px-4 py-3 font-display text-base font-black uppercase tracking-wider text-black shadow-tactile hover:bg-brand-orange-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>(61) 8524-3521</span>
                </a>

                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-tactile flex min-h-[50px] items-center justify-center gap-2 rounded-xl border border-brand-dark-border bg-brand-dark-surface px-4 py-3 font-display text-base font-black uppercase tracking-wider text-white hover:border-brand-orange hover:text-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                >
                  <Instagram className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>@academiatropicalfit</span>
                </a>
              </div>
            </div>
          </div>

          {/* Coluna 2: Mapa Interativo / Container Responsivo */}
          <div className="lg:col-span-7 flex flex-col overflow-hidden rounded-2xl border-2 border-brand-dark-border bg-brand-dark-card">
            <div className="relative flex-1 min-h-[320px] sm:min-h-[420px] w-full bg-brand-dark">
              <iframe
                title={`Mapa de localização da ${unidade.nome} - ${unidade.unidade}`}
                src={embedUrl}
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-brand-dark-border bg-brand-dark-surface px-5 py-3.5 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <MapPin
                  className="h-4 w-4 text-brand-orange shrink-0"
                  aria-hidden="true"
                />
                <span className="font-semibold">{unidade.endereco}</span>
              </div>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-sm font-black uppercase tracking-wider text-brand-orange hover:underline"
              >
                Abrir no aplicativo Maps →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
