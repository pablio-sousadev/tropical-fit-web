import { ACADEMIA_DATA } from '@/data/academia';
import { getGoogleMapsUrl, getInstagramUrl, getWhatsAppUrl } from '@/lib/links';

export function JsonLd() {
  const { unidade, planos } = ACADEMIA_DATA;
  const whatsappUrl = getWhatsAppUrl(unidade.whatsapp);
  const instagramUrl = getInstagramUrl(unidade.instagram);
  const mapsUrl = getGoogleMapsUrl(unidade.googleMapsUrl, unidade.endereco);

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ExerciseGym',
    name: `${unidade.nome} (${unidade.unidade})`,
    alternateName: 'Tropical Fit Água Quente',
    description:
      'Academia completa em Água Quente (DF 280, KM 3, Brasília - DF). Musculação, Peso Livre, Cardio e Aulas Coletivas (Jump, Funcional, Ritmos, Fit Dance, Judô e Step) inclusas nos planos a partir de R$ 84,90/mês.',
    image: '/images/estrutura/musculacao.jpg',
    priceRange: 'R$ 84,90 - R$ 99,90',
    currenciesAccepted: 'BRL',
    paymentAccepted: 'PIX, Cartão de Crédito, Cartão de Débito, Dinheiro',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'DF 280, KM 3, SH Água Quente',
      addressLocality: 'Brasília',
      addressRegion: 'DF',
      addressCountry: 'BR',
    },
    ...(unidade.coordenadas
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: unidade.coordenadas.lat,
            longitude: unidade.coordenadas.lng,
          },
        }
      : {}),
    hasMap: mapsUrl,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '05:30',
        closes: '23:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '08:00',
        closes: '13:00',
      },
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        url: whatsappUrl,
        availableLanguage: ['Portuguese'],
        areaServed: 'BR-DF',
      },
    ],
    sameAs: [instagramUrl, whatsappUrl],
    makesOffer: planos.map((plano) => ({
      '@type': 'Offer',
      name: `Plano ${plano.nome} - ${unidade.nome}`,
      description: plano.beneficios.join(' · '),
      price: plano.precoMensal.toFixed(2),
      priceCurrency: 'BRL',
      availability: 'https://schema.org/InStock',
      url: getWhatsAppUrl(unidade.whatsapp, plano.mensagemWhatsApp),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
