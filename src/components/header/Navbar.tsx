'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Menu,
  X,
  MessageCircle,
  MapPin,
  Clock,
  ArrowUpRight,
} from 'lucide-react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { ACADEMIA_DATA } from '@/data/academia';
import { getWhatsAppUrl } from '@/lib/links';

const NAV_LINKS = [
  { href: '#estrutura', label: 'Estrutura' },
  { href: '#aparelhos', label: 'Aparelhos' },
  { href: '#planos', label: 'Planos' },
  { href: '#aulas', label: 'Aulas' },
  { href: '#localizacao', label: 'Localização' },
] as const;

const SMOOTH_OUT_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);

  const { unidade, horarios } = ACADEMIA_DATA;
  const whatsappUrl = getWhatsAppUrl(
    unidade.whatsapp,
    'Olá! Vim pelo site da Academia Tropical Fit (Unidade Água Quente) e quero me matricular.'
  );

  const closeMenu = useCallback((restoreFocus = false) => {
    setIsOpen(false);
    if (restoreFocus) {
      window.requestAnimationFrame(() => {
        toggleBtnRef.current?.focus();
      });
    }
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
        closeMenu(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeMenu]);

  return (
    <MotionConfig reducedMotion="user">
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-200 ${
          scrolled || isOpen
            ? 'bg-brand-dark/[0.97] md:bg-brand-dark/95 md:backdrop-blur-md border-b border-brand-dark-border shadow-lg shadow-black/60'
            : 'bg-brand-dark/95 md:bg-brand-dark/85 md:backdrop-blur-sm border-b border-brand-dark-border/70'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-20 items-center justify-between gap-2">
            {/* Logo Oficial Tropical Fit */}
            <a
              href="#"
              onClick={() => closeMenu(false)}
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

            {/* Ações direita (CTA WhatsApp + Botão Menu Mobile com Icon Swap) */}
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
                ref={toggleBtnRef}
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-expanded={isOpen}
                aria-controls="mobile-nav-drawer"
                aria-label={
                  isOpen
                    ? 'Fechar menu de navegação'
                    : 'Abrir menu de navegação'
                }
                className={`btn-tactile inline-flex lg:hidden min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center rounded-lg border text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${
                  isOpen
                    ? 'border-brand-orange bg-brand-orange/15 text-brand-orange'
                    : 'border-brand-dark-border bg-brand-dark-surface hover:border-brand-orange hover:text-brand-orange'
                }`}
              >
                {/* transitions.dev #09 icon-swap: hamburger <-> fechar */}
                <span
                  className="t-icon-swap"
                  data-state={isOpen ? 'b' : 'a'}
                  aria-hidden="true"
                >
                  <span className="t-icon" data-icon="a">
                    <Menu className="h-6 w-6" />
                  </span>
                  <span className="t-icon" data-icon="b">
                    <X className="h-6 w-6" />
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Menu Mobile Drawer + Backdrop com animação assimétrica de abrir e fechar */}
        <AnimatePresence>
          {isOpen ? (
            <div
              key="mobile-nav-overlay"
              className="fixed inset-0 top-16 sm:top-20 z-40 lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Menu de navegação mobile"
            >
              {/* Backdrop clicável com fade suave */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: SMOOTH_OUT_EASE }}
                className="fixed inset-0 top-16 sm:top-20 bg-black/85 md:bg-black/80 md:backdrop-blur-sm"
                onClick={() => closeMenu(false)}
                aria-hidden="true"
              />

              {/* Painel do Drawer (abre em 260ms, fecha em 160ms) */}
              <motion.nav
                id="mobile-nav-drawer"
                aria-label="Links do menu mobile"
                initial={{ opacity: 0, y: -14, scale: 0.985 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.26, ease: SMOOTH_OUT_EASE },
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                  scale: 0.99,
                  transition: { duration: 0.16, ease: SMOOTH_OUT_EASE },
                }}
                style={{ transformOrigin: 'top center' }}
                className="relative z-10 w-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-brand-dark-border bg-brand-dark/[0.98] md:bg-brand-dark/95 md:backdrop-blur-md px-4 pt-4 pb-6 shadow-2xl"
              >
                <div className="mx-auto max-w-lg space-y-2">
                  {NAV_LINKS.map((link, idx) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={() => closeMenu(false)}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.24,
                          delay: 0.04 + idx * 0.035,
                          ease: SMOOTH_OUT_EASE,
                        },
                      }}
                      className="btn-tactile flex min-h-[48px] items-center justify-between rounded-xl border border-white/10 bg-brand-dark-surface px-4 py-3 font-display text-lg font-black uppercase tracking-wider text-white hover:border-brand-orange hover:text-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                    >
                      <span className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-brand-orange">
                          0{idx + 1}
                        </span>
                        <span>{link.label}</span>
                      </span>
                      <ArrowUpRight
                        className="h-4 w-4 text-brand-orange"
                        aria-hidden="true"
                      />
                    </motion.a>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.24,
                        delay: 0.22,
                        ease: SMOOTH_OUT_EASE,
                      },
                    }}
                    className="pt-3 mt-3 border-t border-white/10 space-y-3"
                  >
                    <div className="rounded-xl bg-brand-dark-surface border border-white/10 p-3.5 text-xs text-stone-300 space-y-1.5">
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
                      onClick={() => closeMenu(false)}
                      className="btn-tactile flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-brand-orange to-[#E85D04] px-5 py-3 font-display text-base font-black uppercase tracking-wider text-black shadow-tactile hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                    >
                      <MessageCircle className="h-5 w-5" aria-hidden="true" />
                      <span>Chamar no WhatsApp</span>
                    </a>
                  </motion.div>
                </div>
              </motion.nav>
            </div>
          ) : null}
        </AnimatePresence>
      </header>
    </MotionConfig>
  );
}
