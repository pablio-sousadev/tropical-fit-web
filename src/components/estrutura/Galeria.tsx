'use client';

import { useState } from 'react';
import { Expand, Camera } from 'lucide-react';
import { ACADEMIA_DATA } from '@/data/academia';
import type { CategoriaFoto } from '@/types/academia';
import { Lightbox } from './Lightbox';

const CATEGORIAS_FILTRO: Array<'Todas' | CategoriaFoto> = [
  'Todas',
  'Musculação',
  'Cardio',
  'Sala Coletiva',
  'Recepção',
];

export function Galeria() {
  const { fotos, unidade } = ACADEMIA_DATA;
  const [categoriaAtiva, setCategoriaAtiva] = useState<'Todas' | CategoriaFoto>(
    'Todas'
  );
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const fotosFiltradas =
    categoriaAtiva === 'Todas'
      ? fotos
      : fotos.filter((foto) => foto.categoria === categoriaAtiva);

  return (
    <section
      id="estrutura"
      aria-labelledby="estrutura-heading"
      className="py-20 sm:py-28 bg-brand-dark border-b border-brand-dark-border"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-brand-orange">
              <Camera className="h-4 w-4" aria-hidden="true" />
              <span>Tour pela Arena</span>
            </div>
            <h2
              id="estrutura-heading"
              className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-black uppercase tracking-tight text-white leading-[0.93]"
            >
              ESTRUTURA DE <span className="text-brand-orange">IMPACTO</span>{' '}
              PARA O SEU TREINO
            </h2>
            <p className="text-base sm:text-lg text-stone-300 leading-relaxed">
              Ambientes amplos, ventilados e organizados por área de performance
              na {unidade.unidade}. Clique em qualquer foto para ampliar.
            </p>
          </div>

          {/* Filtro por Categoria de Ambiente */}
          <div
            role="tablist"
            aria-label="Filtrar fotos por ambiente da academia"
            className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1"
          >
            {CATEGORIAS_FILTRO.map((cat) => {
              const isSelected = categoriaAtiva === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => {
                    setSelectedIndex(null);
                    setCategoriaAtiva(cat);
                  }}
                  className={`btn-tactile inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-xl px-4 py-2 font-display text-sm sm:text-base font-black uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${
                    isSelected
                      ? 'bg-brand-orange text-black shadow-orange-glow-sm'
                      : 'border border-brand-dark-border bg-brand-dark-surface text-stone-300 hover:border-brand-orange/60 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid Responsivo (1 col mobile, 2 col tablet, 3-4 cols desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {fotosFiltradas.map((foto, index) => {
            const isFeatured = categoriaAtiva === 'Todas' && index === 0;
            return (
              <button
                key={foto.id}
                type="button"
                onClick={() => setSelectedIndex(index)}
                aria-label={`Ampliar foto: ${foto.titulo} (${foto.categoria})`}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border-2 border-brand-dark-border bg-brand-dark-card text-left transition-all duration-200 hover:border-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${
                  isFeatured ? 'sm:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-dark">
                  <img
                    src={foto.url}
                    alt={foto.alt}
                    loading="lazy"
                    width={600}
                    height={375}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* Selo de Categoria */}
                  <span className="absolute top-3 left-3 rounded bg-brand-dark/90 px-2.5 py-1 font-display text-xs font-black uppercase tracking-widest text-brand-orange border border-brand-orange/40">
                    {foto.categoria}
                  </span>

                  {/* Ícone de Zoom */}
                  <span
                    className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-orange text-black opacity-90 transition-transform duration-200 group-hover:scale-110"
                    aria-hidden="true"
                  >
                    <Expand className="h-4 w-4" />
                  </span>

                  {/* Título e Descrição Curta */}
                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5">
                    <h3 className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight text-white group-hover:text-brand-orange transition-colors">
                      {foto.titulo}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs text-stone-300">
                      {foto.alt}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Modal Lightbox */}
      <Lightbox
        fotos={fotosFiltradas}
        currentIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onSelectIndex={(idx) => setSelectedIndex(idx)}
      />
    </section>
  );
}
