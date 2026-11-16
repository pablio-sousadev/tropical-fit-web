'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Menu,
  X,
  MessageCircle,
  MapPin,
  Clock,
  ArrowUpRight,
} from 'lucide-react';
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
          ? 'bg-brand-dark/95 backdrop-blur-md border-b border-brand-dark-border shadow-lg shadow-black/60'
          : 'bg-brand-dark/85 backdrop-blur-sm border-b border-brand-dark-border/70'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between gap-2">
          {/* Logo Oficial Tropical Fit */}
          <a
            href="#"
            onClick={closeMenu}
            className="group flex items-center gap-2 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded-lg shrink-0"
            aria-label={`${unidade.nome} - ${unidade.unidade} (Voltar ao topo)`}
          >
            <img
              src="/images/logo-official.png"
              alt="Academia Tropical Fit - Logo Oficial"
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
            <span className="hidden sm:inline-block font-display text-xs font-bold uppercase tracking-widest text-stone-400 border-l border-stone-800 pl-2.5 ml-1">
              {unidade.unidade}
            </span>
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
                className="inline-flex min-h-[44px] items-center px-3.5 py-2 font-display text-base font-bold uppercase tracking-wider text-stone-300 hover:text-brand-orange transition-colors rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
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
              className="btn-tactile inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-brand-orange px-3.5 sm:px-5 py-2 font-display text-sm sm:text-base font-black uppercase tracking-wider text-black shadow-orange-glow-sm hover:bg-brand-orange-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
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
              aria-label={
                isOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'
              }
              className="inline-flex lg:hidden min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-brand-dark-border bg-brand-dark-surface text-white hover:border-brand-orange hover:text-brand-orange transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
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
                  className="flex min-h-[48px] items-center justify-between rounded-lg border border-brand-dark-border bg-brand-dark-surface px-4 py-3 font-display text-lg font-black uppercase tracking-wider text-white hover:border-brand-orange hover:text-brand-orange transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-brand-orange">
                      0{idx + 1}
                    </span>
                    <span>{link.label}</span>
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 text-stone-400"
                    aria-hidden="true"
                  />
                </a>
              ))}

              <div className="pt-3 mt-3 border-t border-brand-dark-border space-y-3">
                <div className="rounded-lg bg-brand-dark-surface border border-brand-dark-border p-3.5 text-xs text-stone-300 space-y-1.5">
                  <div className="flex items-start gap-2">
                    <MapPin
                      className="h-4 w-4 text-brand-orange shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{unidade.endereco}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock
                      className="h-4 w-4 text-brand-orange shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      {horarios.map((h) => (
                        <p key={h.dias}>
                          <strong className="text-white">{h.dias}:</strong>{' '}
                          {h.horario}
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
                  className="btn-tactile flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-brand-orange px-5 py-3 font-display text-base font-black uppercase tracking-wider text-black hover:bg-brand-orange-hover"
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
