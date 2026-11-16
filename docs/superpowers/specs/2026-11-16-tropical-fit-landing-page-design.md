# Design Doc — Landing Page Academia Tropical Fit (Unidade Água Quente)

**Data:** 2026-11-16  
**Status:** Rascunho para aprovação (pré-orquestração no Maestri)  
**Referências visuais:** 7 imagens na raiz do projeto (`/home/pablio_sousadev/Documentos/Tropical Fit web/*.jpg`)

---

## 1. Intenção e Porquê

Quem pesquisa pela **Academia Tropical Fit** no Google atualmente encontra a localização no Google Maps, mas não encontra um site oficial para conhecer a estrutura, os valores, os horários das aulas e tirar dúvidas rápidas.

Esta landing page será o **cartão de visitas digital oficial** da Unidade Água Quente: ela concentra todas as informações essenciais da academia e direciona o visitante diretamente para o **WhatsApp** (matrícula/atendimento) ou para o **Instagram** (acompanhar o dia a dia e novidades).

---

## 2. Objetivos, Não-Objetivos e Anti-Objetivos

### Objetivos
- Apresentar a academia de forma profissional e energética para quem chega via Google ou redes sociais.
- Exibir **fotos reais da academia** e destacar os **aparelhos disponíveis** por área de treino.
- Exibir os **3 planos regulares com valores abertos** (Mensal, Trimestral e Semestral), com espaço opcional para banner de campanha/promoção vigente.
- Mostrar a **grade semanal de aulas coletivas** (modalidades, dias, horários e professores).
- Informar **horários de funcionamento**, **localização** (Unidade Água Quente) e o **App SCA Aluno** (código `05855850`).
- Converter visitantes em contatos reais via **CTAs diretos para WhatsApp e Instagram**.
- Garantir **100% de responsividade** (mobile-first, tablet, desktop e telas grandes), sem quebra de layout ou rolagem horizontal.

### Não-Objetivos (fora de escopo nesta fase)
- Sistema de matrícula/pagamento online (checkout, cartão, PIX integrado).
- Painel administrativo / CMS com banco de dados para edição via interface web.
- Área logada de aluno ou professor (o aluno já usa o App SCA Aluno).
- Múltiplas unidades (foco exclusivo na **Unidade Água Quente**, embora a estrutura de dados possa prever expansão futura).

### Anti-Objetivos (o que tornaria o projeto um fracasso)
- Layout quebrado, botões pequenos ou tabelas ilegíveis em telas de celular (onde estará a maioria dos acessos vindos do Google Maps/Instagram).
- Página pesada com imagens não otimizadas que demoram para carregar no 4G.
- Informações importantes escondidas ou difíceis de achar (preço, horário ou botão de WhatsApp).
- Visual genérico que ignore a identidade da Tropical Fit (laranja vibrante, preto e branco).

---

## 3. Restrições e Requisitos Técnicos

- **100% Responsiva:** Mobile (`320px–639px`), Tablet (`640px–1023px`), Desktop (`1024px+`).
- **Site 100% Estático:** Sem backend, sem banco de dados; deploy gratuito em Vercel, Netlify, Cloudflare Pages ou GitHub Pages.
- **Manutenção simples em arquivo único de dados:** Planos, promoções sazonais, grade de aulas, aparelhos, fotos e contatos devem ficar centralizados em um arquivo estruturado (`src/data/academia.ts` ou similar), permitindo atualizar preços ou campanhas sem mexer nos componentes visuais.
- **SEO Local:** Metadados completos (Open Graph, título, descrição) e JSON-LD `Schema.org` (`ExerciseGym` / `LocalBusiness`) para reforçar o ranqueamento no Google junto ao perfil do Maps.
- **Assets ainda pendentes do cliente (usar placeholders bem estruturados e documentados):**
  - Fotos reais da academia e dos aparelhos.
  - Lista exata de aparelhos disponíveis.
  - Número oficial do WhatsApp (link `wa.me/...` com mensagem pré-preenchida).
  - `@` oficial do Instagram.
  - Link exato / embed do Google Maps da unidade.
  - Logo em alta resolução / vetor (extraída ou refeita a partir dos prints).

---

## 4. Abordagens Consideradas

| Abordagem | Prós | Contras | Decisão |
| :--- | :--- | :--- | :--- |
| **1. Next.js (Static Export) + Tailwind CSS** | HTML pré-renderizado excelente para SEO local no Google; componentização limpa para dividir tarefas no Maestri; dados centralizados em `data/`; Tailwind facilita responsividade em todos os breakpoints. | Exige etapa de build (`npm run build`), mas o resultado final é 100% estático (`output: 'export'`). | **Escolhida** |
| **2. Astro + Tailwind CSS** | Performance extrema (quase zero JS no cliente) e ótimo SEO nativo. | Menos familiar para times/agentes acostumados com ecossistema React/Next.js; interações como lightbox/filtros exigem ilhas separadas. | Descartada |
| **3. HTML5 + CSS + JS Vanilla** | Zero build, abre direto no navegador. | Mais repetitivo para manter seções, filtros e responsividade complexa; mais difícil de paralelizar entre múltiplos agentes sem conflitos. | Descartada |

---

## 5. Identidade Visual e Conteúdo Extraído dos Prints

- **Nome:** Academia Tropical Fit
- **Unidade:** Unidade Água Quente — DF 280, KM 3, SH Água Quente, Brasília - DF (próximo ao Residencial São Francisco / Ribeirão Samambaia).
- **Paleta de Cores (dos prints):**
  - Primária: Laranja vibrante (`#FF6B00` / `#F97316` como referência de tom)
  - Fundo/Contraste escuro: Preto / Grafite (`#0A0A0A` / `#141414`)
  - Fundo claro/texto: Branco e Off-white (`#FFFFFF` / `#F5F5F5`)
  - Destaque secundário pontual: Amarelo energia (presente em uniformes e artes promocionais)
- **Horário de Funcionamento:**
  - Segunda a Sexta: **5h30 às 23h00**
  - Sábado: **8h00 às 13h00**
- **Planos Regulares (valores abertos):**
  - **Mensal:** R$ 99,90/mês
  - **Trimestral:** R$ 89,90/mês
  - **Semestral:** R$ 84,90/mês *(com suporte opcional a badge/banner de campanha, ex.: "Black Fit Premiada — Fone Bluetooth de brinde" ou sorteios mensais configuráveis via flag `campanhaAtiva`)*
- **Aulas Coletivas (grade dos prints):**
  - **Segunda:** 18h10 Judô Infantil · 19h10 Jump (Prof. Eli) · 20h00 Ritmos / Fit Dance (Prof. André)
  - **Terça:** 07h30 Funcional (Prof. Luis) · 19h00 Funcional (Prof. Luis) · 20h00 Step
  - **Quarta:** 18h10 Judô · 19h10 Jump (Prof. Eli) · 20h00 Ritmos / Fit Dance (Prof. André)
  - **Quinta:** 07h30 Funcional (Prof. Luis) · 19h00 Funcional (Prof. Luis) · 20h00 Step
  - **Sexta:** 19h00 Jump (Prof. Eli)
- **App SCA Aluno:**
  - Disponível na App Store e Google Play.
  - Código da academia em destaque: **`05855850`** (para acompanhar treino, matrícula, pagamento, horário e frequência).

---

## 6. Arquitetura da Página e Comportamento Responsivo

Fluxo de seções de cima para baixo (cada seção é um componente independente):

1. **Header / Navegação Fixa**
   - Logo Tropical Fit à esquerda + links âncora (`Estrutura`, `Aparelhos`, `Planos`, `Aulas`, `Localização`) + botão destacado **WhatsApp**.
   - *Responsividade:* Menu horizontal completo no desktop; menu hambúrguer / drawer limpo no mobile e tablet, mantendo o CTA do WhatsApp sempre acessível.
2. **Hero Section**
   - Fundo escuro com foto de impacto da academia (placeholder substituível), título direto, subtítulo com endereço/horário resumido e dois CTAs: **Matricule-se pelo WhatsApp** (primário) e **Ver Planos** (secundário).
   - *Responsividade:* Tipografia fluida (`clamp` / breakpoints Tailwind), botões empilhados em largura total no mobile e lado a lado no desktop.
3. **Estrutura & Galeria de Fotos**
   - Grade de fotos do espaço (recepção, área de musculação, cardio, sala de coletivas) com **visualização ampliada (lightbox)** ao clicar.
   - *Responsividade:* Carrossel/scroll horizontal com snap ou grid 1 coluna no mobile, 2 colunas no tablet, 3–4 colunas no desktop.
4. **Aparelhos Disponíveis**
   - Destaque organizado por categoria/grupo muscular (ex.: Musculação / Peso Livre, Cardio, Funcional) com cards visuais ou lista escaneável usando dados de `data/academia.ts`.
   - *Responsividade:* Filtro por categoria com scroll horizontal no mobile e grid responsivo (`1 -> 2 -> 3` colunas).
5. **Planos & Campanha Vigente**
   - Banner opcional no topo (ativado por flag no arquivo de dados para promoções sazonais/sorteios).
   - 3 cards lado a lado no desktop (**Mensal R$ 99,90**, **Trimestral R$ 89,90**, **Semestral R$ 84,90** — com destaque visual no Semestral como melhor custo-benefício).
   - Cada card leva para o WhatsApp já com o nome do plano escolhido na mensagem.
   - *Responsividade:* Cards empilhados no mobile (com o plano destaque bem visível), 3 colunas no desktop.
6. **Aulas Coletivas & Professores**
   - Grade semanal interativa: abas/botões por dia da semana (**Seg / Ter / Qua / Qui / Sex**) no mobile e visão clara por dia no desktop, evitando tabelas espremidas.
   - Cards curtos dos professores (Prof. Luis, Prof. Eli, Prof. André) com suas modalidades.
7. **App SCA Aluno**
   - Bloco dedicado explicando os benefícios (treino, matrícula, frequência, pagamentos), exibindo o **Código da Academia: `05855850`** com botão de **copiar código** e links/badges para App Store e Google Play.
8. **Localização, Horários e Contato**
   - Horários de funcionamento em destaque + endereço completo + mapa interativo/embed do Google Maps + botões grandes para **WhatsApp** e **Instagram**.
   - *Responsividade:* Coluna única no mobile (mapa + infos empilhados), 2 colunas no desktop.
9. **Footer + Botão Flutuante de WhatsApp**
   - Rodapé com logo, resumo de horários, endereço e links sociais.
   - Botão flutuante discreto de WhatsApp no canto inferior direito para conversão rápida em qualquer ponto da rolagem.

---

## 7. O Que Fica a Cargo do Time Builder

- Definição exata de tokens Tailwind, tipografia (sugestão: display forte/condensada para títulos + sans-serif legível para corpo) e micro-interações.
- Implementação do lightbox da galeria de fotos e das abas responsivas da grade de aulas.
- Otimização de imagens para `output: 'export'` (`images: { unoptimized: true }` no `next.config` + formatos leves/WebP).
- Testes visuais automatizados ou manuais nos viewports principais (`375px`, `768px`, `1280px`, `1440px`).
- Substituição dos placeholders assim que o usuário fornecer as fotos reais, lista de aparelhos, número do WhatsApp e `@` do Instagram.
