'use client';

import {
  useRef,
  useCallback,
  useState,
  useEffect,
  useMemo,
  type ReactNode,
  type CSSProperties,
} from 'react';

export interface BorderGlowProps {
  children?: ReactNode;
  className?: string;
  edgeSensitivity?: number;
  glowColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  animated?: boolean;
  colors?: string[];
  fillOpacity?: number;
  style?: CSSProperties;
}

function parseHSL(hslStr: string): { h: number; s: number; l: number } {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 25, s: 100, l: 52 };
  return {
    h: parseFloat(match[1]),
    s: parseFloat(match[2]),
    l: parseFloat(match[3]),
  };
}

function buildBoxShadow(glowColor: string, intensity: number): string {
  const { h, s, l } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const layers: [number, number, number, number, number, boolean][] = [
    [0, 0, 0, 1, 100, true],
    [0, 0, 1, 0, 60, true],
    [0, 0, 3, 0, 50, true],
    [0, 0, 6, 0, 40, true],
    [0, 0, 15, 0, 30, true],
    [0, 0, 25, 2, 20, true],
    [0, 0, 50, 2, 10, true],
    [0, 0, 1, 0, 60, false],
    [0, 0, 3, 0, 50, false],
    [0, 0, 6, 0, 40, false],
    [0, 0, 15, 0, 30, false],
    [0, 0, 25, 2, 20, false],
    [0, 0, 50, 2, 10, false],
  ];
  return layers
    .map(([x, y, blur, spread, alpha, inset]) => {
      const a = Math.min(alpha * intensity, 100);
      return `${inset ? 'inset ' : ''}${x}px ${y}px ${blur}px ${spread}px hsl(${base} / ${a}%)`;
    })
    .join(', ');
}

function easeOutCubic(x: number) {
  return 1 - Math.pow(1 - x, 3);
}
function easeInCubic(x: number) {
  return x * x * x;
}

interface AnimateOpts {
  start?: number;
  end?: number;
  duration?: number;
  delay?: number;
  ease?: (t: number) => number;
  onUpdate: (v: number) => void;
  onEnd?: () => void;
}

function animateValue({
  start = 0,
  end = 100,
  duration = 1000,
  delay = 0,
  ease = easeOutCubic,
  onUpdate,
  onEnd,
}: AnimateOpts) {
  const t0 = performance.now() + delay;
  let frame = 0;
  function tick() {
    const elapsed = performance.now() - t0;
    const t = Math.min(elapsed / duration, 1);
    onUpdate(start + (end - start) * ease(t));
    if (t < 1) frame = requestAnimationFrame(tick);
    else if (onEnd) onEnd();
  }
  const timer = setTimeout(() => {
    frame = requestAnimationFrame(tick);
  }, delay);
  return () => {
    clearTimeout(timer);
    cancelAnimationFrame(frame);
  };
}

const GRADIENT_POSITIONS = [
  '80% 55%',
  '69% 34%',
  '8% 6%',
  '41% 38%',
  '86% 85%',
  '82% 18%',
  '51% 4%',
];
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

function buildMeshGradients(colors: string[]): string[] {
  const gradients: string[] = [];
  for (let i = 0; i < 7; i += 1) {
    const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)];
    gradients.push(
      `radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`
    );
  }
  gradients.push(`linear-gradient(${colors[0]} 0 100%)`);
  return gradients;
}

/**
 * BorderGlow adaptado do React Bits (reactbits.dev), com borda luminosa cônica
 * sensível à proximidade do cursor e suporte a prefers-reduced-motion.
 */
export function BorderGlow({
  children,
  className = '',
  edgeSensitivity = 28,
  glowColor = '25 100 52',
  backgroundColor = '#1C1815',
  borderColor = 'rgba(255, 107, 0, 0.55)',
  borderRadius = 16,
  glowRadius = 36,
  glowIntensity = 0.9,
  coneSpread = 28,
  animated = false,
  colors = ['#FF6B00', '#FBBF24', '#FF5500'],
  fillOpacity = 0.45,
  style,
}: BorderGlowProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [supportsHover, setSupportsHover] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorAngle, setCursorAngle] = useState(45);
  const [edgeProximity, setEdgeProximity] = useState(0);
  const [sweepActive, setSweepActive] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const query = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setSupportsHover(query.matches);
    update();
    query.addEventListener?.('change', update);
    return () => query.removeEventListener?.('change', update);
  }, []);

  const getCenterOfElement = useCallback((el: HTMLElement) => {
    const { width, height } = el.getBoundingClientRect();
    return [width / 2, height / 2];
  }, []);

  const getEdgeProximity = useCallback(
    (el: HTMLElement, x: number, y: number) => {
      const [cx, cy] = getCenterOfElement(el);
      const dx = x - cx;
      const dy = y - cy;
      let kx = Infinity;
      let ky = Infinity;
      if (dx !== 0) kx = cx / Math.abs(dx);
      if (dy !== 0) ky = cy / Math.abs(dy);
      return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
    },
    [getCenterOfElement]
  );

  const getCursorAngle = useCallback(
    (el: HTMLElement, x: number, y: number) => {
      const [cx, cy] = getCenterOfElement(el);
      const dx = x - cx;
      const dy = y - cy;
      if (dx === 0 && dy === 0) return 0;
      const radians = Math.atan2(dy, dx);
      let degrees = radians * (180 / Math.PI) + 90;
      if (degrees < 0) degrees += 360;
      return degrees;
    },
    [getCenterOfElement]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType !== 'mouse') return;
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setEdgeProximity(getEdgeProximity(card, x, y));
      setCursorAngle(getCursorAngle(card, x, y));
    },
    [getEdgeProximity, getCursorAngle]
  );

  useEffect(() => {
    if (!animated) return undefined;
    if (
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      return undefined;
    }

    const angleStart = 110;
    const angleEnd = 465;
    setSweepActive(true);
    setCursorAngle(angleStart);

    const animations = [
      animateValue({
        duration: 500,
        onUpdate: (v) => setEdgeProximity(v / 100),
      }),
      animateValue({
        ease: easeInCubic,
        duration: 1500,
        end: 50,
        onUpdate: (v) => {
          setCursorAngle((angleEnd - angleStart) * (v / 100) + angleStart);
        },
      }),
      animateValue({
        ease: easeOutCubic,
        delay: 1500,
        duration: 2250,
        start: 50,
        end: 100,
        onUpdate: (v) => {
          setCursorAngle((angleEnd - angleStart) * (v / 100) + angleStart);
        },
      }),
      animateValue({
        ease: easeInCubic,
        delay: 2500,
        duration: 1500,
        start: 100,
        end: 0,
        onUpdate: (v) => setEdgeProximity(v / 100),
        onEnd: () => setSweepActive(false),
      }),
    ];

    return () => {
      animations.forEach((cancel) => cancel());
      setSweepActive(false);
    };
  }, [animated]);

  const colorSensitivity = edgeSensitivity + 20;
  const isVisible = isHovered || sweepActive;
  const borderOpacity = isVisible
    ? Math.max(
        0,
        (edgeProximity * 100 - colorSensitivity) / (100 - colorSensitivity)
      )
    : 0;
  const glowOpacity = isVisible
    ? Math.max(
        0,
        (edgeProximity * 100 - edgeSensitivity) / (100 - edgeSensitivity)
      )
    : 0;

  const glowLayersEnabled = supportsHover || sweepActive;
  const colorKey = colors.join('|');
  const { borderBg, fillBg, glowShadow } = useMemo(() => {
    if (!glowLayersEnabled) {
      return { borderBg: [] as string[], fillBg: '', glowShadow: '' };
    }
    const meshGradients = buildMeshGradients(colors);
    return {
      borderBg: meshGradients.map((g) => `${g} border-box`),
      fillBg: meshGradients.map((g) => `${g} padding-box`).join(', '),
      glowShadow: buildBoxShadow(glowColor, glowIntensity),
    };
  }, [glowLayersEnabled, colorKey, glowColor, glowIntensity]); // eslint-disable-line react-hooks/exhaustive-deps

  const angleDeg = `${cursorAngle.toFixed(3)}deg`;

  return (
    <div
      ref={cardRef}
      onPointerMove={supportsHover ? handlePointerMove : undefined}
      onPointerEnter={(e) => {
        if (supportsHover && e.pointerType === 'mouse') setIsHovered(true);
      }}
      onPointerLeave={(e) => {
        if (supportsHover && e.pointerType === 'mouse') setIsHovered(false);
      }}
      className={`relative grid isolate border-2 ${className}`}
      style={{
        background: backgroundColor,
        borderColor,
        borderRadius: `${borderRadius}px`,
        transform: supportsHover ? 'translate3d(0, 0, 0.01px)' : undefined,
        ...style,
      }}
    >
      {glowLayersEnabled ? (
        <>
          {/* Borda luminosa cônica sensível ao cursor */}
          <div
            className="pointer-events-none absolute -inset-[2px] rounded-[inherit] -z-[1]"
            style={{
              border: '2px solid transparent',
              background: [
                `linear-gradient(${backgroundColor} 0 100%) padding-box`,
                'linear-gradient(rgb(255 255 255 / 0%) 0% 100%) border-box',
                ...borderBg,
              ].join(', '),
              opacity: borderOpacity,
              maskImage: `conic-gradient(from ${angleDeg} at center, black ${coneSpread}%, transparent ${coneSpread + 15}%, transparent ${100 - coneSpread - 15}%, black ${100 - coneSpread}%)`,
              WebkitMaskImage: `conic-gradient(from ${angleDeg} at center, black ${coneSpread}%, transparent ${coneSpread + 15}%, transparent ${100 - coneSpread - 15}%, black ${100 - coneSpread}%)`,
              transition: isVisible
                ? 'opacity 0.25s ease-out'
                : 'opacity 0.75s ease-in-out',
            }}
            aria-hidden="true"
          />

          {/* Preenchimento sutil próximo às bordas */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit] -z-[1]"
            style={{
              border: '1px solid transparent',
              background: fillBg,
              maskImage: [
                'linear-gradient(to bottom, black, black)',
                'radial-gradient(ellipse at 50% 50%, black 40%, transparent 65%)',
                'radial-gradient(ellipse at 66% 66%, black 5%, transparent 40%)',
                'radial-gradient(ellipse at 33% 33%, black 5%, transparent 40%)',
                'radial-gradient(ellipse at 66% 33%, black 5%, transparent 40%)',
                'radial-gradient(ellipse at 33% 66%, black 5%, transparent 40%)',
                `conic-gradient(from ${angleDeg} at center, transparent 5%, black 15%, black 85%, transparent 95%)`,
              ].join(', '),
              WebkitMaskImage: [
                'linear-gradient(to bottom, black, black)',
                'radial-gradient(ellipse at 50% 50%, black 40%, transparent 65%)',
                'radial-gradient(ellipse at 66% 66%, black 5%, transparent 40%)',
                'radial-gradient(ellipse at 33% 33%, black 5%, transparent 40%)',
                'radial-gradient(ellipse at 66% 33%, black 5%, transparent 40%)',
                'radial-gradient(ellipse at 33% 66%, black 5%, transparent 40%)',
                `conic-gradient(from ${angleDeg} at center, transparent 5%, black 15%, black 85%, transparent 95%)`,
              ].join(', '),
              maskComposite: 'subtract, add, add, add, add, add',
              WebkitMaskComposite:
                'source-out, source-over, source-over, source-over, source-over, source-over',
              opacity: borderOpacity * fillOpacity,
              mixBlendMode: 'soft-light',
              transition: isVisible
                ? 'opacity 0.25s ease-out'
                : 'opacity 0.75s ease-in-out',
            }}
            aria-hidden="true"
          />

          {/* Glow externo nas bordas */}
          <span
            className="pointer-events-none absolute z-[1] rounded-[inherit]"
            style={{
              inset: `${-glowRadius}px`,
              maskImage: `conic-gradient(from ${angleDeg} at center, black 2.5%, transparent 10%, transparent 90%, black 97.5%)`,
              WebkitMaskImage: `conic-gradient(from ${angleDeg} at center, black 2.5%, transparent 10%, transparent 90%, black 97.5%)`,
              opacity: glowOpacity,
              mixBlendMode: 'plus-lighter',
              transition: isVisible
                ? 'opacity 0.25s ease-out'
                : 'opacity 0.75s ease-in-out',
            }}
            aria-hidden="true"
          >
            <span
              className="absolute rounded-[inherit]"
              style={{
                inset: `${glowRadius}px`,
                boxShadow: glowShadow,
              }}
            />
          </span>
        </>
      ) : null}

      <div className="relative z-[2] flex h-full flex-col justify-between">
        {children}
      </div>
    </div>
  );
}

export default BorderGlow;
