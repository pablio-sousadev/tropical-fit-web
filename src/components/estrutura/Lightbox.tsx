'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Camera,
} from 'lucide-react';
import type { FotoEstrutura } from '@/types/academia';

interface LightboxProps {
  fotos: FotoEstrutura[];
  currentIndex: number | null;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export function Lightbox({
  fotos,
  currentIndex,
  onClose,
  onSelectIndex,
}: LightboxProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < fotos.length;

  const handlePrev = useCallback(() => {
    if (currentIndex === null || fotos.length === 0) return;
    setIsZoomed(false);
    onSelectIndex((currentIndex - 1 + fotos.length) % fotos.length);
  }, [currentIndex, fotos.length, onSelectIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex === null || fotos.length === 0) return;
    setIsZoomed(false);
    onSelectIndex((currentIndex + 1) % fotos.length);
  }, [currentIndex, fotos.length, onSelectIndex]);

  useEffect(() => {
    if (!isOpen) {
      setIsZoomed(false);
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowLeft') {
        handlePrev();
      } else if (event.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || currentIndex === null) {
    return null;
  }

  const currentFoto = fotos[currentIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Visualização ampliada: ${currentFoto.titulo}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
    >
      {/* Backdrop que fecha ao clicar */}
      <div
        className="fixed inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Container Modal */}
      <div className="relative z-10 flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-brand-dark-border bg-brand-dark-card shadow-2xl">
        {/* Barra Superior */}
        <div className="flex items-center justify-between gap-3 border-b border-brand-dark-border bg-brand-dark px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3 min-w-0">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-brand-orange/15 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-orange shrink-0">
              <Camera className="h-3.5 w-3.5" aria-hidden="true" />
              {currentFoto.categoria}
            </span>
            <h3 className="truncate text-sm sm:text-base font-extrabold text-white">
              {currentFoto.titulo}
            </h3>
            <span className="hidden sm:inline text-xs font-semibold text-neutral-400">
              ({currentIndex + 1} de {fotos.length})
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsZoomed((prev) => !prev)}
              aria-label={isZoomed ? 'Reduzir zoom da foto' : 'Ampliar zoom da foto'}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-brand-dark-border bg-brand-dark-card text-neutral-200 hover:border-brand-orange hover:text-brand-orange transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
            >
              {isZoomed ? (
                <ZoomOut className="h-5 w-5" aria-hidden="true" />
              ) : (
                <ZoomIn className="h-5 w-5" aria-hidden="true" />
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar visualização da foto"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg bg-brand-orange text-black hover:bg-brand-orange-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Área da Imagem */}
        <div className="relative flex aspect-[16/10] max-h-[70vh] w-full items-center justify-center overflow-auto bg-black">
          <img
            src={currentFoto.url}
            alt={currentFoto.alt}
            onClick={() => setIsZoomed((prev) => !prev)}
            className={`h-full w-full object-contain transition-transform duration-300 cursor-zoom-in ${
              isZoomed ? 'scale-125 sm:scale-150 cursor-zoom-out' : 'scale-100'
            }`}
          />

          {/* Navegação Anterior / Próxima */}
          {fotos.length > 1 ? (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Foto anterior"
                className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/20 bg-black/75 text-white hover:border-brand-orange hover:bg-brand-orange hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
              >
                <ChevronLeft className="h-6 w-6" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Próxima foto"
                className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/20 bg-black/75 text-white hover:border-brand-orange hover:bg-brand-orange hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
              >
                <ChevronRight className="h-6 w-6" aria-hidden="true" />
              </button>
            </>
          ) : null}
        </div>

        {/* Rodapé com legenda e miniaturas rápidas */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-brand-dark-border bg-brand-dark px-4 py-3 sm:px-6">
          <p className="text-xs sm:text-sm text-neutral-300">{currentFoto.alt}</p>
          <div className="flex items-center gap-1.5 shrink-0">
            {fotos.map((foto, idx) => (
              <button
                key={foto.id}
                type="button"
                onClick={() => {
                  setIsZoomed(false);
                  onSelectIndex(idx);
                }}
                aria-label={`Ir para foto ${idx + 1}: ${foto.titulo}`}
                className={`h-2.5 rounded-full transition-all ${
                  idx === currentIndex
                    ? 'w-7 bg-brand-orange'
                    : 'w-2.5 bg-neutral-700 hover:bg-neutral-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
