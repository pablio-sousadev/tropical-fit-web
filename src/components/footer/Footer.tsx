import {
  MapPin,
  Clock,
  MessageCircle,
  Instagram,
  Smartphone,
} from 'lucide-react';
import { ACADEMIA_DATA } from '@/data/academia';
import { getInstagramUrl, getWhatsAppUrl } from '@/lib/links';

const LINKS_RAPIDOS = [
  { href: '#estrutura', label: 'Estrutura e Fotos' },
  { href: '#aparelhos', label: 'Zonas de Treino e Aparelhos' },
  { href: '#planos', label: 'Planos e Valores' },
  { href: '#aulas', label: 'Scoreboard de Aulas Coletivas' },
  { href: '#app-aluno', label: 'Credencial App SCA Aluno' },
  { href: '#localizacao', label: 'Localização e Horários' },
] as const;

export function Footer() {
  const { unidade, horarios } = ACADEMIA_DATA;
  const whatsappUrl = getWhatsAppUrl(unidade.whatsapp);
  const instagramUrl = getInstagramUrl(unidade.instagram);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-stone-300 border-t border-brand-dark-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-10 border-b border-brand-dark-border">
          {/* Coluna 1: Identidade da Marca */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-orange text-black font-black shadow-orange-glow-sm">
                <svg
                  viewBox="0 0 40 40"
                  className="h-6 w-6 fill-current"
                  aria-hidden="true"
                >
                  <circle cx="20" cy="20" r="9" className="opacity-25" />
                  <path d="M5 17h3v6H5v-6zm3-2h3v10H8V15zm21 0h3v10h-3V15zm3 2h3v6h-3v-6zM11 18.5h18v3H11v-3z" />
                </svg>
              </div>
              <div className="leading-none">
                <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-stone-400">
                  Academia
                </span>
                <span className="font-display text-2xl font-black uppercase tracking-tight text-white">
                  TROPICAL{' '}
                </span>
                <span className="font-display text-2xl font-black italic text-brand-orange">
                  FIT
                </span>
              </div>
            </div>

            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              {unidade.nome} ({unidade.unidade}). Arena completa de musculação,
              peso livre, cardio e aulas coletivas na DF 280, KM 3, Brasília -
              DF.
            </p>

            <div className="inline-flex items-center gap-2 rounded-lg border border-brand-dark-border bg-brand-dark-surface px-3.5 py-2 text-xs">
              <Smartphone
                className="h-4 w-4 text-brand-orange shrink-0"
                aria-hidden="true"
              />
              <span>
                Código App SCA Aluno:{' '}
                <strong className="font-mono text-brand-orange tabular-nums">
                  {unidade.scaAlunoCodigo}
                </strong>
              </span>
            </div>
          </div>

          {/* Coluna 2: Navegação Rápida */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-display text-sm font-black uppercase tracking-[0.2em] text-brand-orange">
              Navegação
            </h3>
            <ul className="space-y-2 text-sm">
              {LINKS_RAPIDOS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-[36px] items-center text-stone-300 hover:text-brand-orange transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Horários e Endereço */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-display text-sm font-black uppercase tracking-[0.2em] text-brand-orange">
              Atendimento e Contato
            </h3>

            <div className="space-y-2.5 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin
                  className="h-4 w-4 text-brand-orange shrink-0 mt-1"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-bold text-white">{unidade.endereco}</p>
                  <p className="text-xs text-stone-400">{unidade.referencia}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock
                  className="h-4 w-4 text-brand-orange shrink-0 mt-1"
                  aria-hidden="true"
                />
                <div className="space-y-0.5">
                  {horarios.map((h) => (
                    <p key={h.dias}>
                      <strong className="text-white">{h.dias}:</strong>{' '}
                      {h.horario}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-tactile inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-brand-orange px-4 py-2 font-display text-sm font-black uppercase tracking-wider text-black hover:bg-brand-orange-hover"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>WhatsApp Oficial</span>
              </a>

              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-tactile inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-brand-dark-border bg-brand-dark-surface px-4 py-2 font-display text-sm font-black uppercase tracking-wider text-white hover:border-brand-orange hover:text-brand-orange"
              >
                <Instagram className="h-4 w-4" aria-hidden="true" />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>

        {/* Direitos Autorais */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>
            © {currentYear} {unidade.nome} · {unidade.unidade}. Todos os
            direitos reservados.
          </p>
          <p className="text-stone-500">
            DF 280, KM 3 · SH Água Quente · Brasília - DF
          </p>
        </div>
      </div>
    </footer>
  );
}
