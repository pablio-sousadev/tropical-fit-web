'use client';

import { useState, useEffect, useCallback } from 'react';
import { Menu, X, MessageCircle, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { ACADEMIA_DATA } from '@/data/academia';
import { getWhatsAppUrl } from '@/lib/links';

const NAV_LINKS = [
  { href: '#estrutura', label: 'Estrutura' },
  { href: '#aparelhos', label: 'Aparelhos' },
  { href: '#planos', label: 'Planos' },
  { href: '#aulas', label: 'Aulas' },
  { href: '#localizacao', label: 'Localização' },
] as const;

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { unidade, horarios } = ACADEMIA_DATA;
  const whatsappUrl = getWhatsAppUrl(
    unidade.whatsapp,
    'Olá! Vim pelo site da Academia Tropical Fit (Unidade Água Quente) e quero me matricular.'
  );

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeMenu]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-200 ${
        scrolled || isOpen
          ? 'bg-brand-dark/95 backdrop-blur-md border-b border-brand-dark-border shadow-lg shadow-black/50'
          : 'bg-brand-dark/80 backdrop-blur-sm border-b border-white/10'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between gap-2">
          {/* Logo Tropical Fit */}
          <a
            href="#"
            onClick={closeMenu}
            className="group flex items-center gap-2.5 sm:gap-3 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded-lg shrink-0"
            aria-label={`${unidade.nome} - ${unidade.unidade} (Voltar ao topo)`}
          >
            <div className="relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-lg bg-brand-orange text-black font-black shadow-md shadow-brand-orange/20 transition-transform duration-200 group-hover:scale-105">
              {/* Emblema Sol + Barra inspirado na marca */}
              <svg
                viewBox="0 0 40 40"
                className="h-7 w-7 fill-current"
                aria-hidden="true"
              >
                <circle cx="20" cy="20" r="9" className="opacity-25" />
                <path d="M5 17h3v6H5v-6zm3-2h3v10H8V15zm21 0h3v10h-3V15zm3 2h3v6h-3v-6zM11 18.5h18v3H11v-3z" />
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                Academia
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-base sm:text-lg font-black uppercase tracking-tight text-white">
                  TROPICAL
                </span>
                <span className="text-base sm:text-lg font-black italic text-brand-orange">
                  FIT
                </span>
              </div>
              <span className="text-[10px] font-medium text-neutral-400 hidden xs:inline">
                Água Quente · DF 280
              </span>
            </div>
          </a>

          {/* Links Desktop */}
          <nav
            aria-label="Navegação principal"
            className="hidden lg:flex items-center gap-1 xl:gap-2"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="inline-flex min-h-[44px] items-center px-3.5 py-2 text-sm font-semibold text-neutral-300 hover:text-brand-orange transition-colors rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Ações direita (CTA WhatsApp + Botão Menu Mobile) */}
          <div className="flex items-center gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-brand-orange px-3.5 sm:px-5 py-2.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-black hover:bg-brand-orange-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
            >
              <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="hidden sm:inline">Matricule-se</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-expanded={isOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={isOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
              className="inline-flex lg:hidden min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-brand-dark-border bg-brand-dark-card text-white hover:border-brand-orange hover:text-brand-orange transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
            >
              {isOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile Drawer + Backdrop */}
      {isOpen ? (
        <div
          className="fixed inset-0 top-16 sm:top-20 z-40 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação mobile"
        >
          {/* Backdrop clicável */}
          <div
            className="fixed inset-0 top-16 sm:top-20 bg-black/80 backdrop-blur-xs"
            onClick={closeMenu}
            aria-hidden="true"
          />

          {/* Painel do Drawer */}
          <nav
            id="mobile-nav-drawer"
            aria-label="Links do menu mobile"
            className="relative z-10 w-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-brand-dark-border bg-brand-dark px-4 pt-4 pb-6 shadow-2xl"
          >
            <div className="mx-auto max-w-lg space-y-2">
              {NAV_LINKS.map((link, idx) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="flex min-h-[48px] items-center justify-between rounded-lg border border-brand-dark-border bg-brand-dark-card px-4 py-3 text-base font-bold text-white hover:border-brand-orange hover:text-brand-orange transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xs font-black text-brand-orange">
                      0{idx + 1}
                    </span>
                    <span>{link.label}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-neutral-400" aria-hidden="true" />
                </a>
              ))}

              <div className="pt-3 mt-3 border-t border-brand-dark-border space-y-3">
                <div className="rounded-lg bg-brand-dark-card border border-brand-dark-border p-3.5 text-xs text-neutral-300 space-y-1.5">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-brand-orange shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{unidade.endereco}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-brand-orange shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      {horarios.map((h) => (
                        <p key={h.dias}>
                          <strong className="text-white">{h.dias}:</strong> {h.horario}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-brand-orange px-5 py-3 text-sm font-black uppercase tracking-wider text-black hover:bg-brand-orange-hover transition-colors"
                >
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  <span>Chamar no WhatsApp</span>
                </a>
              </div>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
