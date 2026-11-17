'use client';

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type PointerEvent as ReactPointerEvent,
} from 'react';

interface UseCarouselTrackOptions {
  itemCount: number;
  autoplayMs?: number;
  isPausedByModal?: boolean;
  onSlideLabel?: (index: number, total: number) => string;
}

/**
 * Hook compartilhado para carrosséis acessíveis e fluidos:
 * - Drag com mouse (inércia suave ao soltar) sem interferir no swipe nativo touch
 * - Sincronização de slide ativo via rAF + scrollend (com fallback debounced)
 * - Fallback IntersectionObserver para fades horizontais quando scroll-driven animations não estão disponíveis
 * - Autoplay com pausa automática fora da viewport, ao hover/toque, botão Pause/Play e prefers-reduced-motion
 */
export function useCarouselTrack({
  itemCount,
  autoplayMs = 0,
  isPausedByModal = false,
  onSlideLabel,
}: UseCarouselTrackOptions) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const regionRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverOrTouchPaused, setHoverOrTouchPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  const pendingTargetRef = useRef<number | null>(null);
  const lastSettledRef = useRef<number>(0);
  const hasInteractedRef = useRef<boolean>(false);
  const wasDraggedRef = useRef<boolean>(false);
  const dragTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dragStateRef = useRef<{
    active: boolean;
    pointerId: number;
    startX: number;
    startScrollLeft: number;
    moved: boolean;
    samples: Array<{ t: number; x: number }>;
  }>({
    active: false,
    pointerId: -1,
    startX: 0,
    startScrollLeft: 0,
    moved: false,
    samples: [],
  });

  const computeClosestIndex = useCallback((): number => {
    const container = trackRef.current;
    if (!container || itemCount === 0) return 0;

    const center = container.scrollLeft + container.clientWidth / 2;
    let closest = 0;
    let minDistance = Number.POSITIVE_INFINITY;

    for (let i = 0; i < itemCount; i += 1) {
      const card = itemRefs.current[i];
      if (!card) continue;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(center - cardCenter);
      if (dist < minDistance) {
        minDistance = dist;
        closest = i;
      }
    }
    return closest;
  }, [itemCount]);

  const scrollToIndex = useCallback(
    (index: number, behavior?: ScrollBehavior) => {
      const container = trackRef.current;
      const card = itemRefs.current[index];
      if (!container || !card || itemCount === 0) return;

      const clamped = Math.max(0, Math.min(index, itemCount - 1));
      const prefersReduced =
        typeof window !== 'undefined' &&
        window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      const resolvedBehavior: ScrollBehavior =
        behavior ?? (prefersReduced ? 'auto' : 'smooth');

      hasInteractedRef.current = true;
      pendingTargetRef.current = clamped;
      setActiveIndex(clamped);

      const targetLeft =
        card.offsetLeft - (container.clientWidth - card.offsetWidth) / 2;
      container.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: resolvedBehavior,
      });

      if (resolvedBehavior === 'auto') {
        pendingTargetRef.current = null;
        if (lastSettledRef.current !== clamped) {
          lastSettledRef.current = clamped;
          setAnnouncement(
            onSlideLabel
              ? onSlideLabel(clamped, itemCount)
              : `Slide ${clamped + 1} de ${itemCount}`
          );
        }
      }
    },
    [itemCount, onSlideLabel]
  );

  const handlePrev = useCallback(() => {
    if (itemCount === 0) return;
    const base = pendingTargetRef.current ?? activeIndex;
    const prev = (base - 1 + itemCount) % itemCount;
    scrollToIndex(prev);
  }, [activeIndex, itemCount, scrollToIndex]);

  const handleNext = useCallback(() => {
    if (itemCount === 0) return;
    const base = pendingTargetRef.current ?? activeIndex;
    const next = (base + 1) % itemCount;
    scrollToIndex(next);
  }, [activeIndex, itemCount, scrollToIndex]);

  const resetToFirst = useCallback(() => {
    pendingTargetRef.current = null;
    lastSettledRef.current = 0;
    setActiveIndex(0);
    setAnnouncement('');
    const container = trackRef.current;
    if (container) {
      container.scrollTo({ left: 0, behavior: 'auto' });
    }
  }, []);

  // Sincroniza marcador ativo durante scroll (rAF) e anuncia ao estabilizar (scrollend + fallback)
  useEffect(() => {
    const container = trackRef.current;
    if (!container) return undefined;

    let rafId = 0;
    let settleFallbackTimer: ReturnType<typeof setTimeout> | null = null;

    const handleSettle = () => {
      pendingTargetRef.current = null;
      const settled = computeClosestIndex();
      setActiveIndex((prev) => (prev === settled ? prev : settled));

      if (hasInteractedRef.current && lastSettledRef.current !== settled) {
        lastSettledRef.current = settled;
        setAnnouncement(
          onSlideLabel
            ? onSlideLabel(settled, itemCount)
            : `Slide ${settled + 1} de ${itemCount}`
        );
      }
    };

    const supportsScrollEnd = 'onscrollend' in window;

    const onScroll = () => {
      if (pendingTargetRef.current === null) {
        if (!rafId) {
          rafId = window.requestAnimationFrame(() => {
            rafId = 0;
            const closest = computeClosestIndex();
            setActiveIndex((prev) => (prev === closest ? prev : closest));
          });
        }
      }

      if (!supportsScrollEnd) {
        if (settleFallbackTimer) clearTimeout(settleFallbackTimer);
        settleFallbackTimer = setTimeout(handleSettle, 140);
      }
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    if (supportsScrollEnd) {
      container.addEventListener('scrollend', handleSettle, { passive: true });
    }

    return () => {
      container.removeEventListener('scroll', onScroll);
      if (supportsScrollEnd) {
        container.removeEventListener('scrollend', handleSettle);
      }
      if (rafId) window.cancelAnimationFrame(rafId);
      if (settleFallbackTimer) clearTimeout(settleFallbackTimer);
    };
  }, [computeClosestIndex, itemCount, onSlideLabel]);

  // Fallback de fades horizontais (IntersectionObserver quando animation-timeline: scroll() não é suportado)
  useEffect(() => {
    const container = trackRef.current;
    if (!container || itemCount === 0) return undefined;

    if (
      typeof CSS !== 'undefined' &&
      CSS.supports?.('animation-timeline', 'scroll()')
    ) {
      return undefined;
    }

    const first = itemRefs.current[0];
    const last = itemRefs.current[itemCount - 1];
    if (!first || !last) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const { target, intersectionRatio } of entries) {
          if (target === first) {
            container.classList.toggle('more-start', intersectionRatio < 1);
          }
          if (target === last) {
            container.classList.toggle('more-end', intersectionRatio < 1);
          }
        }
      },
      { root: container, threshold: 1, rootMargin: '1px' }
    );

    observer.observe(first);
    observer.observe(last);

    return () => {
      observer.disconnect();
      container.classList.remove('more-start', 'more-end');
    };
  }, [itemCount]);

  // Pausa automática quando carrossel sai da viewport
  useEffect(() => {
    const region = regionRef.current;
    if (!region || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((entry) => entry.isIntersecting);
        setInView(visible);
      },
      { threshold: 0.1 }
    );

    observer.observe(region);
    return () => observer.disconnect();
  }, []);

  // Autoplay opcional (só ativo quando autoplayMs > 0)
  useEffect(() => {
    if (
      autoplayMs <= 0 ||
      hoverOrTouchPaused ||
      isPausedByModal ||
      !inView ||
      isDragging ||
      itemCount <= 1 ||
      typeof window === 'undefined'
    ) {
      return undefined;
    }

    const prefersReduced = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced) return undefined;

    const timer = window.setInterval(() => {
      const container = trackRef.current;
      if (!container || container.scrollWidth <= container.clientWidth + 8) {
        return;
      }
      const next = (activeIndex + 1) % itemCount;
      scrollToIndex(next);
    }, autoplayMs);

    return () => window.clearInterval(timer);
  }, [
    activeIndex,
    autoplayMs,
    hoverOrTouchPaused,
    inView,
    isDragging,
    isPausedByModal,
    itemCount,
    scrollToIndex,
  ]);

  useEffect(() => {
    return () => {
      if (dragTimerRef.current) clearTimeout(dragTimerRef.current);
    };
  }, []);

  // Mouse Drag-to-Scroll (não interfere com touch swipe nativo)
  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    const container = trackRef.current;
    if (!container || container.scrollWidth <= container.clientWidth + 8) {
      return;
    }

    hasInteractedRef.current = true;
    pendingTargetRef.current = null;
    dragStateRef.current = {
      active: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: container.scrollLeft,
      moved: false,
      samples: [{ t: performance.now(), x: event.clientX }],
    };
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragStateRef.current;
    if (!drag.active || event.pointerId !== drag.pointerId) return;
    const container = trackRef.current;
    if (!container) return;

    const dx = event.clientX - drag.startX;
    if (!drag.moved && Math.abs(dx) > 6) {
      drag.moved = true;
      setIsDragging(true);
      try {
        container.setPointerCapture(event.pointerId);
      } catch {
        // Ignora caso o ponteiro já tenha sido liberado
      }
    }

    if (drag.moved) {
      event.preventDefault();
      container.scrollLeft = drag.startScrollLeft - dx;
      const now = performance.now();
      drag.samples.push({ t: now, x: event.clientX });
      if (drag.samples.length > 6) drag.samples.shift();
    }
  };

  const finishDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragStateRef.current;
    if (!drag.active || event.pointerId !== drag.pointerId) return;

    const container = trackRef.current;
    const didMove = drag.moved;
    const samples = drag.samples;
    drag.active = false;
    drag.moved = false;
    setIsDragging(false);

    if (container && didMove) {
      try {
        if (container.hasPointerCapture(event.pointerId)) {
          container.releasePointerCapture(event.pointerId);
        }
      } catch {
        // Ignora se captura já encerrou
      }

      wasDraggedRef.current = true;
      if (dragTimerRef.current) clearTimeout(dragTimerRef.current);
      dragTimerRef.current = setTimeout(() => {
        wasDraggedRef.current = false;
      }, 60);

      // Calcula velocidade recente para snap direcional fluido
      const recent = samples[0];
      const latest = samples[samples.length - 1];
      let target = computeClosestIndex();
      if (recent && latest && latest.t - recent.t > 10) {
        const velocity = (latest.x - recent.x) / (latest.t - recent.t); // px/ms
        if (velocity < -0.35) {
          target = Math.min(itemCount - 1, target + 1);
        } else if (velocity > 0.35) {
          target = Math.max(0, target - 1);
        }
      }

      // Aguarda um frame para restaurar scroll-snap-type antes de suavizar o snap
      window.requestAnimationFrame(() => {
        scrollToIndex(target);
      });
    }
  };

  const consumeWasDragged = useCallback(() => {
    if (wasDraggedRef.current) {
      wasDraggedRef.current = false;
      return true;
    }
    return false;
  }, []);

  return {
    trackRef,
    regionRef,
    itemRefs,
    activeIndex,
    setHoverOrTouchPaused,
    isDragging,
    announcement,
    scrollToIndex,
    handlePrev,
    handleNext,
    resetToFirst,
    consumeWasDragged,
    trackPointerHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: finishDrag,
      onPointerCancel: finishDrag,
    },
  };
}
