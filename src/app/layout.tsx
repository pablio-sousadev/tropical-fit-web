import type { Metadata, Viewport } from 'next';
import { ACADEMIA_DATA } from '@/data/academia';
import { JsonLd } from '@/components/seo/JsonLd';
import './globals.css';

const { unidade } = ACADEMIA_DATA;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0A0A0A',
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tropicalfit.com.br'
  ),
  title: `${unidade.nome} | ${unidade.unidade} - DF 280 KM 3`,
  description:
    'Academia Tropical Fit na DF 280 KM 3, SH Água Quente, Brasília - DF. Musculação completa, cardio e aulas coletivas (Jump, Funcional, Fit Dance, Judô e Step) inclusas nos planos a partir de R$ 84,90/mês. Seg a Sex das 5h30 às 23h e Sáb das 8h às 13h.',
  keywords: [
    'Academia Tropical Fit',
    'Academia Água Quente',
    'Academia DF 280',
    'Musculação Água Quente DF',
    'Aulas Coletivas Água Quente',
    'Jump Fit Dance Funcional Água Quente',
    'Academia Brasília DF',
    'Tropical Fit DF 280 KM 3',
  ],
  authors: [{ name: unidade.nome }],
  creator: unidade.nome,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: `${unidade.nome} - ${unidade.unidade}`,
    title: `${unidade.nome} | ${unidade.unidade} (DF 280 KM 3)`,
    description:
      'Treine na estrutura mais completa de Água Quente. Musculação, peso livre, cardio e aulas coletivas inclusas a partir de R$ 84,90/mês. Seg a Sex das 5h30 às 23h.',
    images: [
      {
        url: '/images/estrutura/musculacao.jpg',
        width: 1200,
        height: 800,
        alt: `${unidade.nome} - ${unidade.unidade}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${unidade.nome} | ${unidade.unidade}`,
    description:
      'Musculação, cardio e aulas coletivas na DF 280 KM 3, Água Quente - DF. Planos a partir de R$ 84,90/mês.',
    images: ['/images/estrutura/musculacao.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark scroll-smooth">
      <head>
        <JsonLd />
      </head>
      <body className="min-h-screen bg-brand-dark text-neutral-100 antialiased selection:bg-brand-orange selection:text-black overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
