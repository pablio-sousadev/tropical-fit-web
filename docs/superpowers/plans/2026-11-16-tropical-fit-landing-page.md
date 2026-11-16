# Academia Tropical Fit (Unidade Água Quente) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir uma landing page estática de alta conversão, 100% responsiva e com SEO local para a Academia Tropical Fit (Unidade Água Quente), apresentando estrutura, fotos, aparelhos, planos abertos, grade de aulas coletivas, código do App SCA Aluno e canais diretos para WhatsApp e Instagram.

**Architecture:** Aplicação Next.js configurada para Static Export (`output: 'export'`), estilizada com Tailwind CSS usando design tokens da identidade energética da Tropical Fit (laranja vibrante, grafite/preto e off-white). Todo o conteúdo dinâmico (planos, horários, aulas, fotos, contatos e flag de campanhas) é centralizado em uma fonte única da verdade (`src/data/academia.ts`), permitindo atualizações de conteúdo sem tocar em código JSX.

**Tech Stack:** Next.js 15 (App Router, Static Export), React 19, TypeScript, Tailwind CSS, Lucide React (ícones), JSON-LD (Schema.org `ExerciseGym`).

**Spec:** `docs/superpowers/specs/2026-11-16-tropical-fit-landing-page-design.md`

## Global Constraints

- **Stack 100% Estática:** Next.js com `output: 'export'` e `images: { unoptimized: true }` no `next.config.mjs`, sem backend, sem banco de dados, sem endpoints dinâmicos.
- **Responsividade Total (Mobile-First):** Suporte fluido de `320px` a telas `4K` sem rolagem horizontal ou quebras visuais (`overflow-x-hidden` global).
- **Single Source of Truth:** Todo o conteúdo parametrizável deve residir em `src/data/academia.ts` (planos, aulas, horários, fotos, contatos, flags sazonais).
- **Placeholders Estruturados:** Placeholders limpos e autoexplicativos para fotos reais, aparelhos complementares, link oficial de WhatsApp, `@` do Instagram e embed do Google Maps.
- **SEO Local & Schema.org:** Metadados Open Graph completos e structured data JSON-LD (`ExerciseGym` / `LocalBusiness`) para Unidade Água Quente (DF 280, KM 3).
- **Verificação de Aceite:** O comando `npm run build` deve compilar para a pasta `out/` sem erros de TypeScript ou de build.

## Review Focus

1. **Responsividade em Telas Ultracompactas (320px–360px):** Menus, tabelas de aulas e cards de planos não devem estourar a largura da tela nem gerar scroll horizontal indesejado.
2. **Fluxo Interativo do Botão de Cópia (SCA Aluno):** O código `05855850` deve ser copiado para o clipboard com feedback visual imediato ("Copiado!") e fallback para navegadores sem API Clipboard.
3. **Comportamento do Lightbox da Galeria:** O lightbox deve abrir ao clicar em qualquer foto da estrutura, permitir fechar via clique no backdrop, botão de fechar ou tecla `ESC`, sem travar a rolagem do body permanentemente.
4. **Resiliência a Placeholders e Links Externos:** Links de WhatsApp (`wa.me`) e Instagram devem possuir `target="_blank" rel="noopener noreferrer"` e formatação segura de query string mesmo quando substituídos.
5. **Comutação de Abas da Grade de Aulas:** No mobile, as abas de Segunda a Sexta devem alternar suavemente sem saltos bruscos de altura de página.

---

### Task 1: Setup do Repositório & Scaffold Next.js Static Export
**Responsável (Maestri):** Forge (Executor)  
**Skill Obrigatória:** `ci-cd-and-automation`

**Files:**
- Create: `package.json`
- Create: `next.config.mjs`
- Create: `tsconfig.json`
- Create: `postcss.config.mjs`
- Create: `tailwind.config.ts`
- Create: `.gitignore`
- Create: `src/app/globals.css`

**Interfaces:**
- Consumes: N/A (Setup inicial)
- Produces: Ambiente Node.js pronto com Next.js App Router, Tailwind CSS e comando `npm run build` gerando `out/`.

- [ ] **Passo 1.1:** Inicializar git no repositório (`git init`).
- [ ] **Passo 1.2:** Criar `.gitignore` ignorando `node_modules`, `.next`, `out`, `.env*` e arquivos de log.
- [ ] **Passo 1.3:** Configurar `package.json` com dependências essenciais: `next`, `react`, `react-dom`, `lucide-react`, `tailwindcss`, `postcss`, `autoprefixer`, `typescript`, `@types/react`, `@types/node`.
- [ ] **Passo 1.4:** Configurar `next.config.mjs` com `output: 'export'` e `images: { unoptimized: true }`.
- [ ] **Passo 1.5:** Configurar `tailwind.config.ts` com tokens da marca:
  - `brand-orange: { DEFAULT: '#FF6B00', hover: '#E05E00', light: '#FFF4ED' }`
  - `brand-dark: { DEFAULT: '#0A0A0A', card: '#141414', border: '#262626' }`
  - `brand-yellow: '#FBBF24'`
- [ ] **Passo 1.6:** Instalar dependências com `npm install` e verificar compilação base.

---

### Task 2: Contrato de Dados & Single Source of Truth (`src/data/academia.ts`)
**Responsável (Maestri):** Sniper (Refatorador Cirúrgico)  
**Skill Obrigatória:** `api-and-interface-design`, `ponytail`

**Files:**
- Create: `src/types/academia.ts`
- Create: `src/data/academia.ts`
- Test: `tests/data-validation.test.ts` (ou script de validação de tipagem)

**Interfaces:**
- Consumes: Dados extraídos dos prints e design doc (`docs/superpowers/specs/2026-11-16-tropical-fit-landing-page-design.md`).
- Produces: Constante exportada `ACADEMIA_DATA: AcademiaData` contendo planos, aulas, professores, aparelhos, fotos, horários, SEO, app SCA e contatos.

- [ ] **Passo 2.1:** Definir interfaces TypeScript em `src/types/academia.ts`:
  - `Plano` (`id`, `nome`, `precoMensal`, `periodoMeses`, `destaque`, `beneficios`, `mensagemWhatsApp`)
  - `Campanha` (`ativa`, `titulo`, `subtitulo`, `badge`, `brindeOuDesconto`)
  - `AulaColetiva` (`id`, `modalidade`, `diaSemana`, `horario`, `professor`)
  - `Professor` (`nome`, `modalidades`)
  - `CategoriaAparelhos` (`categoria`, `descricao`, `itens`)
  - `FotoEstrutura` (`id`, `titulo`, `categoria`, `url`, `alt`)
  - `HorarioFuncionamento` (`dias`, `horario`)
  - `UnidadeInfo` (`nome`, `unidade`, `endereco`, `cidade`, `coordenadas`, `googleMapsUrl`, `googleMapsEmbedUrl`, `whatsapp`, `instagram`, `scaAlunoCodigo`)
- [ ] **Passo 2.2:** Preencher `src/data/academia.ts` com dados fiéis da Unidade Água Quente:
  - Planos: Mensal (R$ 99,90), Trimestral (R$ 89,90), Semestral (R$ 84,90 - destaque).
  - Grade de Aulas coletivas de Segunda a Sexta com Prof. Eli (Jump), Prof. André (Ritmos / Fit Dance), Prof. Luis (Funcional), Judô Infantil e Step.
  - App SCA Aluno com código `05855850`.
  - Horários: Seg-Sex 5h30 às 23h00, Sáb 8h00 às 13h00.
  - Placeholders sinalizados com `[SUBSTITUIR: ...]` para fotos reais, embed exato de Maps e link de WhatsApp.
- [ ] **Passo 2.3:** Validar tipagem estrita com `npx tsc --noEmit`.

---

### Task 3: Layout Base, Tipografia, Cores da Marca & SEO Local / Schema.org
**Responsável (Maestri):** Prism (Dev Front)  
**Skill Obrigatória:** `vercel-react-best-practices`, `web-design-guidelines`

**Files:**
- Create: `src/app/layout.tsx`
- Create: `src/components/seo/JsonLd.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: `ACADEMIA_DATA` de `src/data/academia.ts`.
- Produces: Layout Next.js com metadados SEO (Open Graph, favicon, canonical) e structured data JSON-LD `ExerciseGym`.

- [ ] **Passo 3.1:** Implementar `src/components/seo/JsonLd.tsx` gerando script schema `ExerciseGym` com endereço da DF 280 KM 3, horários de funcionamento, geolocalização e telefone.
- [ ] **Passo 3.2:** Configurar `src/app/layout.tsx` com `metadata` oficial: título "Academia Tropical Fit | Unidade Água Quente - DF", descrição focada em musculação e aulas coletivas, Open Graph images e viewport mobile-friendly.
- [ ] **Passo 3.3:** Configurar `src/app/globals.css` com classes utilitárias de contraste, rolagem suave (`scroll-smooth`), estilos de scrollbar modernos e mitigação de overflow.

---

### Task 4: Componentes de Topo (Header/Navbar Responsivo & Hero Section)
**Responsável (Maestri):** Prism (Dev Front)  
**Skill Obrigatória:** `vercel-react-best-practices`, `impeccable`

**Files:**
- Create: `src/components/header/Navbar.tsx`
- Create: `src/components/hero/Hero.tsx`

**Interfaces:**
- Consumes: `ACADEMIA_DATA.unidade`, `ACADEMIA_DATA.links`.
- Produces: Barra de navegação fixa com menu mobile (hambúrguer/drawer) e seção Hero com proposta de valor, horários em pílulas e CTAs de ação rápida.

- [ ] **Passo 4.1:** Criar `Navbar.tsx` responsivo:
  - Desktop: Logo Tropical Fit, links âncora (`#estrutura`, `#aparelhos`, `#planos`, `#aulas`, `#localizacao`) e botão destacado WhatsApp.
  - Mobile: Botão hambúrguer com drawer deslizante, fechamento no clique de link ou backdrop, sem rolagem do body quando aberto.
- [ ] **Passo 4.2:** Criar `Hero.tsx`:
  - Background escuro de alto impacto com overlay gradiente preto/laranja.
  - Badge de localização ("Unidade Água Quente — DF 280, KM 3").
  - Título energético, subtítulo com horário de funcionamento resumido (5h30 às 23h00).
  - CTAs duplos: "Matricule-se pelo WhatsApp" (primário laranja) e "Ver Planos e Valores" (secundário contornado).

---

### Task 5: Componentes de Estrutura & Experiência (Galeria com Lightbox & Aparelhos por Categoria)
**Responsável (Maestri):** Prism (Dev Front)  
**Skill Obrigatória:** `vercel-react-best-practices`, `impeccable`

**Files:**
- Create: `src/components/estrutura/Galeria.tsx`
- Create: `src/components/estrutura/Lightbox.tsx`
- Create: `src/components/aparelhos/Aparelhos.tsx`

**Interfaces:**
- Consumes: `ACADEMIA_DATA.fotos`, `ACADEMIA_DATA.categoriasAparelhos`.
- Produces: Grid de fotos com modal interativo de ampliação e catálogo filtrável de aparelhos por grupo muscular.

- [ ] **Passo 5.1:** Implementar `Lightbox.tsx` com acessibilidade:
  - Fechar via clique no botão `X`, clique no backdrop ou tecla `ESC`.
  - Botões de navegação anterior/próximo caso haja múltiplas fotos.
- [ ] **Passo 5.2:** Implementar `Galeria.tsx` com grid responsivo (1 coluna mobile, 2 tablet, 3-4 desktop) exibindo fotos dos espaços (Musculação, Cardio, Sala Coletiva, Recepção) com trigger para o Lightbox.
- [ ] **Passo 5.3:** Implementar `Aparelhos.tsx` com filtro por abas/pílulas (Musculação / Peso Livre, Cardio, Funcional) e cards escaneáveis com ícones e destaques dos equipamentos.

---

### Task 6: Componentes de Conversão e Informação (Planos com Campanha, Grade de Aulas & App SCA Aluno)
**Responsável (Maestri):** Prism (Dev Front)  
**Skill Obrigatória:** `vercel-react-best-practices`, `impeccable`

**Files:**
- Create: `src/components/planos/Planos.tsx`
- Create: `src/components/aulas/AulasColetivas.tsx`
- Create: `src/components/app-aluno/AppAluno.tsx`

**Interfaces:**
- Consumes: `ACADEMIA_DATA.planos`, `ACADEMIA_DATA.campanha`, `ACADEMIA_DATA.aulas`, `ACADEMIA_DATA.professores`, `ACADEMIA_DATA.unidade.scaAlunoCodigo`.
- Produces: Seção de planos com valores abertos e link pré-preenchido para WhatsApp; grade de aulas por dia da semana; bloco de download e cópia do código do App SCA Aluno.

- [ ] **Passo 6.1:** Implementar `Planos.tsx`:
  - Banner sazonal dinâmico no topo controlado por `campanha.ativa` (ex.: Black Fit / Promoções vigentes).
  - 3 cards responsivos: Mensal (R$ 99,90), Trimestral (R$ 89,90) e Semestral (R$ 84,90 - tag de "Melhor Custo-Benefício").
  - Botão de WhatsApp em cada card com mensagem pré-definida contendo o nome do plano escolhido.
- [ ] **Passo 6.2:** Implementar `AulasColetivas.tsx`:
  - Seletor por dia da semana (Segunda, Terça, Quarta, Quinta, Sexta) com visual mobile-first sem quebra horizontal.
  - Cards das modalidades (Jump, Ritmos/Fit Dance, Funcional, Judô Infantil, Step) com horários e professores indicados.
  - Pequeno bloco de apresentação dos professores (Prof. Eli, Prof. André, Prof. Luis).
- [ ] **Passo 6.3:** Implementar `AppAluno.tsx`:
  - Explicação dos recursos do App SCA Aluno (treinos, pagamentos, frequência).
  - Bloco em destaque com o código `05855850`.
  - Botão interativo "Copiar Código" com feedback de sucesso ("Copiado!") e fallback para clipboard.
  - Badges/links para download na App Store e Google Play.

---

### Task 7: Componentes de Fechamento (Localização, Horários, Contato, Footer & Floating WhatsApp)
**Responsável (Maestri):** Prism (Dev Front)  
**Skill Obrigatória:** `vercel-react-best-practices`, `impeccable`

**Files:**
- Create: `src/components/localizacao/Localizacao.tsx`
- Create: `src/components/footer/Footer.tsx`
- Create: `src/components/whatsapp/FloatingWhatsApp.tsx`

**Interfaces:**
- Consumes: `ACADEMIA_DATA.unidade`, `ACADEMIA_DATA.horarios`.
- Produces: Seção de endereço e mapa responsivo, rodapé da página e botão flutuante de atendimento WhatsApp.

- [ ] **Passo 7.1:** Implementar `Localizacao.tsx` com grid responsivo de 2 colunas:
  - Coluna 1: Endereço completo (DF 280, KM 3, SH Água Quente), horários detalhados (Seg-Sex 5h30 às 23h00, Sáb 8h00 às 13h00) e botões diretos de rota (Waze / Google Maps).
  - Coluna 2: Container responsivo com embed do Google Maps (placeholder iframe com fallback visual).
- [ ] **Passo 7.2:** Implementar `Footer.tsx` com logo, resumo institucional, links de navegação e redes sociais (Instagram e WhatsApp).
- [ ] **Passo 7.3:** Implementar `FloatingWhatsApp.tsx`: botão flutuante discreto e acessível no canto inferior direito, com badge de "Fale Conosco" e link direto para conversa.

---

### Task 8: Integração da Página Principal (`src/app/page.tsx`) & Validação de Responsividade
**Responsável (Maestri):** Spec (Especificador & QA) & Prism (Dev Front)  
**Skill Obrigatória:** `web-design-guidelines`, `a11y-debugging`

**Files:**
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: Todos os componentes das Tasks 4 a 7.
- Produces: Landing page completa e integrada em ordem lógica de navegação e conversão.

- [ ] **Passo 8.1:** Montar `src/app/page.tsx` encadeando: Navbar, Hero, Estrutura & Galeria, Aparelhos, Planos, Aulas Coletivas, App SCA Aluno, Localização, Footer e FloatingWhatsApp.
- [ ] **Passo 8.2:** Validar fluidez de layout nos viewports: `320px` (mobile estreito), `375px` (iPhone padrão), `768px` (iPad vertical), `1024px` (iPad horizontal/notebook) e `1440px` (desktop widescreen).
- [ ] **Passo 8.3:** Garantir que nenhuma seção cause overflow horizontal e que todos os botões e links possuam target touch mínimo de 44x44px.

---

### Task 9: Build Estático & Auditoria de Qualidade/Segurança
**Responsável (Maestri):** Sentinel (Auditor de Código)  
**Skill Obrigatória:** `ponytail-review`, `security-and-hardening`

**Files:**
- Test/Verify: `out/index.html` gerado pelo build estático
- Audit: Dependências, bundle e ausência de segredos

- [ ] **Passo 9.1:** Executar `npx tsc --noEmit` para validação total de tipos TypeScript.
- [ ] **Passo 9.2:** Executar `npm run build` e confirmar geração de arquivos 100% estáticos na pasta `out/`.
- [ ] **Passo 9.3:** Executar auditoria de código e boas práticas (sem vazamentos de segredos, imagens sem erro de carregamento, links externos com rel seguros).

---

### Task 10: Commit Semântico & Finalização
**Responsável (Maestri):** Keeper (Git Revisor)  
**Skill Obrigatória:** `abrir-pr`, `secret-hygiene`

**Files:**
- Git commits organizados e registro da entrega.

- [ ] **Passo 10.1:** Revisar diff completo (`git status` e `git diff`).
- [ ] **Passo 10.2:** Criar commits semânticos no padrão: `feat: scaffold nextjs static export e configuracao tailwind`, `feat: single source of truth e contratos de dados`, `feat: componentes da landing page tropical fit`, etc.
- [ ] **Passo 10.3:** Atualizar status e notas na memória do Obsidian.
