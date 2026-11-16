import type { AcademiaData } from '@/types/academia';

/**
 * Fonte única da verdade da landing page Tropical Fit — Unidade Água Quente.
 *
 * Tudo que é conteúdo (preços, grade, aparelhos, fotos, contatos) vive aqui.
 * Trechos marcados com `[PLACEHOLDER: ...]` precisam ser trocados pelos dados
 * oficiais antes da publicação. Nenhum segredo/token deve ser adicionado aqui.
 */
export const ACADEMIA_DATA: AcademiaData = {
  unidade: {
    nome: 'Academia Tropical Fit',
    unidade: 'Unidade Água Quente',
    endereco: 'DF 280, KM 3, SH Água Quente, Brasília - DF',
    referencia: 'Próximo ao Residencial São Francisco / Ribeirão Samambaia',
    cidade: 'Brasília - DF',
    // [PLACEHOLDER: coordenadas reais (lat/lng) da unidade — omitido para não
    // publicar localização aproximada. Confirmar no Google Maps antes do deploy.]
    googleMapsUrl:
      '[PLACEHOLDER: URL do perfil/rota no Google Maps da unidade Água Quente]',
    googleMapsEmbedUrl:
      '[PLACEHOLDER: URL de embed do Google Maps (Maps > Compartilhar > Incorporar mapa)]',
    whatsapp: 'https://wa.me/556185243521',
    instagram: 'https://www.instagram.com/academiatropicalfit',
    scaAlunoCodigo: '05855850',
  },

  campanha: {
    ativa: true,
    titulo: 'Black Fit Premiada',
    subtitulo: '[PLACEHOLDER: subtítulo curto da campanha Black Fit Premiada]',
    badge: 'OFERTA ESPECIAL',
    brindeOuDesconto: 'Fone Bluetooth de brinde ou sorteios mensais',
  },

  planos: [
    {
      id: 'mensal',
      nome: 'Mensal',
      precoMensal: 99.9,
      periodoMeses: 1,
      destaque: false,
      beneficios: [
        'Acesso a todas as áreas de treino',
        'Aulas coletivas inclusas',
        'Código do App SCA Aluno',
      ],
      mensagemWhatsApp:
        'Olá! Quero me matricular no plano Mensal (R$ 99,90/mês) da Tropical Fit - Unidade Água Quente.',
    },
    {
      id: 'trimestral',
      nome: 'Trimestral',
      precoMensal: 89.9,
      periodoMeses: 3,
      destaque: false,
      beneficios: [
        'Acesso a todas as áreas de treino',
        'Aulas coletivas inclusas',
        'Código do App SCA Aluno',
        'Mensalidade reduzida por 3 meses',
      ],
      mensagemWhatsApp:
        'Olá! Quero me matricular no plano Trimestral (R$ 89,90/mês) da Tropical Fit - Unidade Água Quente.',
    },
    {
      id: 'semestral',
      nome: 'Semestral',
      precoMensal: 84.9,
      periodoMeses: 6,
      destaque: true,
      badge: 'Melhor Custo-Benefício',
      beneficios: [
        'Acesso a todas as áreas de treino',
        'Aulas coletivas inclusas',
        'Código do App SCA Aluno',
        'Menor mensalidade entre os planos',
      ],
      mensagemWhatsApp:
        'Olá! Quero me matricular no plano Semestral (R$ 84,90/mês) da Tropical Fit - Unidade Água Quente.',
    },
  ],

  horarios: [
    { dias: 'Segunda a Sexta', horario: '05:30 às 23:00' },
    { dias: 'Sábado', horario: '08:00 às 13:00' },
  ],

  aulas: [
    // Segunda
    {
      id: 'seg-judo-infantil',
      modalidade: 'Judô Infantil',
      diaSemana: 'Segunda',
      horario: '18:10',
    },
    { id: 'seg-jump', modalidade: 'Jump', diaSemana: 'Segunda', horario: '19:10', professor: 'Prof. Eli' },
    {
      id: 'seg-ritmos',
      modalidade: 'Ritmos / Fit Dance',
      diaSemana: 'Segunda',
      horario: '20:00',
      professor: 'Prof. André',
    },

    // Terça
    { id: 'ter-funcional-manha', modalidade: 'Funcional', diaSemana: 'Terça', horario: '07:30', professor: 'Prof. Luis' },
    { id: 'ter-funcional-noite', modalidade: 'Funcional', diaSemana: 'Terça', horario: '19:00', professor: 'Prof. Luis' },
    { id: 'ter-step', modalidade: 'Step', diaSemana: 'Terça', horario: '20:00' },

    // Quarta
    {
      id: 'qua-judo',
      modalidade: 'Judô',
      diaSemana: 'Quarta',
      horario: '18:10',
    },
    { id: 'qua-jump', modalidade: 'Jump', diaSemana: 'Quarta', horario: '19:10', professor: 'Prof. Eli' },
    {
      id: 'qua-ritmos',
      modalidade: 'Ritmos / Fit Dance',
      diaSemana: 'Quarta',
      horario: '20:00',
      professor: 'Prof. André',
    },

    // Quinta
    { id: 'qui-funcional-manha', modalidade: 'Funcional', diaSemana: 'Quinta', horario: '07:30', professor: 'Prof. Luis' },
    { id: 'qui-funcional-noite', modalidade: 'Funcional', diaSemana: 'Quinta', horario: '19:00', professor: 'Prof. Luis' },
    { id: 'qui-step', modalidade: 'Step', diaSemana: 'Quinta', horario: '20:00' },

    // Sexta
    { id: 'sex-jump', modalidade: 'Jump', diaSemana: 'Sexta', horario: '19:00', professor: 'Prof. Eli' },
  ],

  professores: [
    { nome: 'Prof. Eli', modalidades: ['Jump'] },
    { nome: 'Prof. André', modalidades: ['Ritmos', 'Fit Dance'] },
    { nome: 'Prof. Luis', modalidades: ['Funcional'] },
  ],

  categoriasAparelhos: [
    {
      categoria: 'Musculação / Peso Livre',
      descricao:
        'Estrutura completa para treino de força, hipertrofia e condicionamento.',
      // [PLACEHOLDER: substituir pela lista exata de máquinas e pesos livres.]
      itens: ['[PLACEHOLDER: aparelhos de musculação e peso livre]'],
    },
    {
      categoria: 'Cardio',
      descricao:
        'Equipamentos aeróbicos para aquecimento, emagrecimento e condicionamento.',
      // [PLACEHOLDER: substituir pela lista exata de equipamentos de cardio.]
      itens: ['[PLACEHOLDER: esteiras, bikes e elípticos disponíveis]'],
    },
    {
      categoria: 'Funcional / Coletivas',
      descricao: 'Espaço para aulas coletivas e treino funcional orientado.',
      // [PLACEHOLDER: substituir pela lista exata de acessórios do funcional.]
      itens: ['[PLACEHOLDER: acessórios de funcional e sala de aulas coletivas]'],
    },
  ],

  fotos: [
    {
      id: 'foto-musculacao',
      titulo: 'Sala de Musculação',
      categoria: 'Musculação',
      // [PLACEHOLDER: trocar pelo arquivo real otimizado em /public/images/estrutura/.]
      url: '/images/estrutura/musculacao.jpg',
      alt: 'Sala de musculação da Academia Tropical Fit Unidade Água Quente, com máquinas e pesos livres',
    },
    {
      id: 'foto-peso-livre',
      titulo: 'Área de Peso Livre',
      categoria: 'Musculação',
      // [PLACEHOLDER: trocar pelo arquivo real otimizado em /public/images/estrutura/.]
      url: '/images/estrutura/peso-livre.jpg',
      alt: 'Área de peso livre da Tropical Fit com halteres e barras para treino de força',
    },
    {
      id: 'foto-cardio',
      titulo: 'Área de Cardio',
      categoria: 'Cardio',
      // [PLACEHOLDER: trocar pelo arquivo real otimizado em /public/images/estrutura/.]
      url: '/images/estrutura/cardio.jpg',
      alt: 'Equipamentos de cardio da Tropical Fit, com esteiras e bikes ergométricas',
    },
    {
      id: 'foto-sala-coletiva',
      titulo: 'Sala de Aulas Coletivas',
      categoria: 'Sala Coletiva',
      // [PLACEHOLDER: trocar pelo arquivo real otimizado em /public/images/estrutura/.]
      url: '/images/estrutura/sala-coletiva.jpg',
      alt: 'Sala de aulas coletivas da Tropical Fit usada para Jump, Ritmos e Funcional',
    },
    {
      id: 'foto-recepcao',
      titulo: 'Recepção',
      categoria: 'Recepção',
      // [PLACEHOLDER: trocar pelo arquivo real otimizado em /public/images/estrutura/.]
      url: '/images/estrutura/recepcao.jpg',
      alt: 'Recepção da Academia Tropical Fit Unidade Água Quente',
    },
  ],
};
