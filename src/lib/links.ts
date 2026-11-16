/**
 * Utilitários puros para resolver URLs e formatações a partir de `ACADEMIA_DATA`,
 * garantindo links seguros e funcionais mesmo enquanto valores `[PLACEHOLDER: ...]`
 * estiverem ativos na fonte de dados.
 */

const DEFAULT_WHATSAPP_BASE = 'https://wa.me/556185243521';
const DEFAULT_WHATSAPP_MSG =
  'Olá! Vim pelo site da Academia Tropical Fit (Unidade Água Quente) e gostaria de mais informações sobre matrícula.';

export function isPlaceholderValue(value: string | undefined): boolean {
  if (!value) return true;
  const trimmed = value.trim();
  return (
    trimmed.startsWith('[PLACEHOLDER') ||
    trimmed.startsWith('[SUBSTITUIR') ||
    trimmed.length === 0
  );
}

export function getWhatsAppUrl(
  rawWhatsapp: string,
  customMessage?: string
): string {
  if (isPlaceholderValue(rawWhatsapp)) {
    return `${DEFAULT_WHATSAPP_BASE}?text=${encodeURIComponent(
      customMessage || DEFAULT_WHATSAPP_MSG
    )}`;
  }

  const match = rawWhatsapp.match(/https:\/\/wa\.me\/(\d+)/);
  let baseUrl = '';
  if (match) {
    baseUrl = `https://wa.me/${match[1]}`;
  } else {
    const digits = rawWhatsapp.replace(/\D/g, '');
    if (digits.length >= 8) {
      const fullDigits = digits.startsWith('55') ? digits : `55${digits}`;
      baseUrl = `https://wa.me/${fullDigits}`;
    } else {
      baseUrl = DEFAULT_WHATSAPP_BASE;
    }
  }

  const message = customMessage || DEFAULT_WHATSAPP_MSG;
  return `${baseUrl}?text=${encodeURIComponent(message)}`;
}

export function getInstagramUrl(rawInstagram: string): string {
  if (isPlaceholderValue(rawInstagram)) {
    return 'https://www.instagram.com/academiatropicalfit';
  }
  const match = rawInstagram.match(/https?:\/\/[^\s\]]+/);
  if (match) {
    return match[0];
  }
  const cleanHandle = rawInstagram.replace(/^@/, '').trim();
  if (cleanHandle.length > 0) {
    return `https://www.instagram.com/${cleanHandle}`;
  }
  return 'https://www.instagram.com/academiatropicalfit';
}

export function getGoogleMapsUrl(rawMapsUrl: string, endereco: string): string {
  if (!isPlaceholderValue(rawMapsUrl) && rawMapsUrl.startsWith('http')) {
    return rawMapsUrl;
  }
  const query = `Academia Tropical Fit ${endereco}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function getGoogleMapsEmbedInfo(
  rawEmbedUrl: string,
  endereco: string
): { embedUrl: string; isPlaceholder: boolean } {
  if (!isPlaceholderValue(rawEmbedUrl) && rawEmbedUrl.startsWith('http')) {
    return { embedUrl: rawEmbedUrl, isPlaceholder: false };
  }
  const query = `Academia Tropical Fit ${endereco}`;
  return {
    embedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=15&ie=UTF8&iwloc=&output=embed`,
    isPlaceholder: true,
  };
}

export function formatPrecoParts(precoMensal: number): {
  reais: string;
  centavos: string;
  completo: string;
} {
  const fixed = precoMensal.toFixed(2);
  const [reais, centavos] = fixed.split('.');
  return {
    reais,
    centavos: `,${centavos}`,
    completo: `R$ ${reais},${centavos}`,
  };
}
