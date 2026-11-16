/**
 * Contrato de dados da landing page Tropical Fit (Unidade Água Quente).
 * Fonte única da verdade: `src/data/academia.ts` deve satisfazer `AcademiaData`.
 */

/** Categorias usadas para agrupar as fotos da estrutura no lightbox/galeria. */
export type CategoriaFoto =
  | 'Musculação'
  | 'Cardio'
  | 'Sala Coletiva'
  | 'Recepção';

export interface Plano {
  /** Identificador estável usado em keys de lista e links. */
  id: string;
  /** Nome comercial do plano (ex.: "Semestral"). */
  nome: string;
  /** Valor mensal em reais, sem formatação (ex.: 84.9). */
  precoMensal: number;
  /** Duração do contrato em meses (1 = mensal, 3 = trimestral, 6 = semestral). */
  periodoMeses: number;
  /** Marca o card recomendado na seção de planos. */
  destaque: boolean;
  /** Selo exibido no card (ex.: "Melhor Custo-Benefício"). */
  badge?: string;
  /** Lista curta de itens inclusos, exibida como bullets. */
  beneficios: string[];
  /** Texto pré-preenchido enviado ao WhatsApp ao clicar no CTA do plano. */
  mensagemWhatsApp: string;
}

export interface Campanha {
  /** Liga/desliga a faixa promocional sem remover o componente. */
  ativa: boolean;
  titulo: string;
  subtitulo?: string;
  /** Selo curto da campanha (ex.: "OFERTA ESPECIAL"). */
  badge: string;
  /** Descrição do brinde/desconto vigente. */
  brindeOuDesconto: string;
}

export interface AulaColetiva {
  id: string;
  modalidade: string;
  diaSemana: 'Segunda' | 'Terça' | 'Quarta' | 'Quinta' | 'Sexta' | 'Sábado';
  /** Horário de início no formato 24h (ex.: "19:10"). */
  horario: string;
  /** Omitido quando a modalidade não tem professor fixo divulgado. */
  professor?: string;
}

export interface Professor {
  nome: string;
  modalidades: string[];
}

export interface CategoriaAparelhos {
  categoria: string;
  descricao: string;
  itens: string[];
}

export interface FotoEstrutura {
  id: string;
  titulo: string;
  categoria: CategoriaFoto;
  /** Caminho público da imagem (ex.: "/images/estrutura/cardio.jpg"). */
  url: string;
  /** Texto alternativo acessível e descritivo. */
  alt: string;
}

export interface HorarioFuncionamento {
  dias: string;
  horario: string;
}

export interface UnidadeInfo {
  nome: string;
  unidade: string;
  endereco: string;
  /** Ponto de referência para quem chega pela DF-280. */
  referencia: string;
  cidade: string;
  /** Latitude/longitude reais da unidade (pendente de confirmação). */
  coordenadas?: { lat: number; lng: number };
  googleMapsUrl: string;
  googleMapsEmbedUrl: string;
  /** Link `wa.me` com mensagem pré-preenchida. */
  whatsapp: string;
  instagram: string;
  /** Código de acesso do App SCA Aluno. */
  scaAlunoCodigo: string;
}

export interface AcademiaData {
  unidade: UnidadeInfo;
  campanha: Campanha;
  planos: Plano[];
  horarios: HorarioFuncionamento[];
  aulas: AulaColetiva[];
  professores: Professor[];
  categoriasAparelhos: CategoriaAparelhos[];
  fotos: FotoEstrutura[];
}
