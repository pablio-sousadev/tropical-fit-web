import { MessageCircle } from 'lucide-react';
import { ACADEMIA_DATA } from '@/data/academia';
import { getWhatsAppUrl } from '@/lib/links';

export function FloatingWhatsApp() {
  const { unidade } = ACADEMIA_DATA;
  const whatsappUrl = getWhatsAppUrl(
    unidade.whatsapp,
    'Olá! Vim pelo site da Academia Tropical Fit (Unidade Água Quente) e gostaria de atendimento.'
  );

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com a Academia Tropical Fit pelo WhatsApp"
        className="group relative inline-flex min-h-[54px] min-w-[54px] items-center gap-2.5 rounded-full bg-brand-orange px-4 sm:px-5 py-3.5 text-black shadow-xl shadow-black/60 hover:bg-brand-orange-hover transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
      >
        {/* Anel de pulso sutil */}
        <span
          className="pointer-events-none absolute inset-0 rounded-full bg-brand-orange opacity-30 animate-ping"
          style={{ animationDuration: '2.8s' }}
          aria-hidden="true"
        />

        <MessageCircle
          className="relative h-6 w-6 shrink-0 stroke-[2.25]"
          aria-hidden="true"
        />
        <span className="relative hidden sm:inline text-xs font-black uppercase tracking-wider">
          Fale no WhatsApp
        </span>
      </a>
    </div>
  );
}
