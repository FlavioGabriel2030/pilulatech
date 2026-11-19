# Avaliação de UX/IHC — PílulaTech

Documento de apoio ao relatório: mostra **onde** cada princípio foi aplicado na interface.

## 1. As 10 heurísticas de Nielsen

| # | Heurística | Onde está aplicada |
|---|---|---|
| H1 | **Visibilidade do status do sistema** | Item ativo destacado no menu (`aria-current`); contador “12 pílulas encontradas”; barra de progresso de leitura no topo da pílula; “Passo 2 de 3” no onboarding; skeletons enquanto as APIs carregam; toasts após cada ação; selo “Concluída” nos cards; barras de progresso por categoria. |
| H2 | **Correspondência com o mundo real** | Linguagem simples e analogias do cotidiano em todas as pílulas (Correios, garçom, táxi…); ícones universais (marcador = favorito, lupa = busca, relógio = tempo); datas relativas em português (“há 2 horas”, “ontem”). |
| H3 | **Controle e liberdade do usuário** | “Desfazer” ao remover favorito, ao limpar/remover histórico e ao desmarcar uma conclusão; onboarding com “Pular por agora”; `Esc` fecha diálogos; botão Voltar do navegador funciona (rotas por hash); remoção individual de filtros e “Limpar filtros”. |
| H4 | **Consistência e padrões** | Design tokens únicos (`tokens.css`); o mesmo componente de card em todas as telas; a mesma ação sempre com o mesmo ícone e posição; logo leva ao início; links sublinhados no texto; hierarquia fixa de botões. |
| H5 | **Prevenção de erros** | Confirmação antes de limpar histórico, importar backup e zerar progresso (com foco inicial no botão seguro); quiz não é corrigido com perguntas em branco; busca tolerante a acentos; validação do arquivo de backup; limites nos botões de fonte (desabilitados nos extremos). |
| H6 | **Reconhecer em vez de lembrar** | Filtros ativos sempre visíveis; buscas recentes no campo de busca; “Continue de onde parou”; histórico; breadcrumb; sumário “Nesta pílula”; conquistas bloqueadas mostram o critério. |
| H7 | **Flexibilidade e eficiência** | Atalhos (`/`, `g i`, `g t`, `g f`, `g h`, `g p`, `?`); deep links com filtros na URL; filtros combináveis; recomendações personalizadas; exportar/importar backup. |
| H8 | **Estética e design minimalista** | Cards só com o essencial (categoria, título, resumo, nível, tempo, favoritar); detalhes ficam na página da pílula; espaço em branco generoso; uma família tipográfica; cor de destaque usada apenas em ações. |
| H9 | **Reconhecer, diagnosticar e recuperar erros** | Mensagens humanas com causa e solução (“O serviço demorou demais para responder. Tente novamente.”) e botão “Tentar novamente”; estado vazio da busca com sugestões; página 404 com caminhos de saída; erros de formulário ligados ao campo (`role="alert"`). |
| H10 | **Ajuda e documentação** | Página “Sobre e como usar”; modal de atalhos; tooltips nos botões de ícone; “Por que estou vendo isso?” nas recomendações; estados vazios que explicam o próximo passo; dicas nos formulários. |

## 2. Affordances e signifiers (Don Norman)

- **Cards inteiros clicáveis** (link “esticado”), com elevação, sombra e borda colorida no hover.
- **Botões parecem botões:** preenchimento (primário) ou contorno (secundário); estados *hover*, *focus-visible*, *active* (leve afundamento) e *disabled*.
- **Toggle de favorito** comunica o estado por `aria-pressed`, ícone preenchido e texto (“Salva nos favoritos”).
- **Chips de filtro** mostram um ✓ quando selecionados (não dependem só da cor).
- **Links externos** têm ícone de seta e o aviso “(abre em nova aba)” para leitores de tela.

## 3. Hierarquia de cores (60-30-10)

- **60% neutro:** fundo (`--bg`).
- **30% apoio:** superfícies, bordas e texto secundário.
- **10% destaque:** índigo (`--primary`) só em CTAs, links, foco e itens ativos.
- **Semânticas:** verde (sucesso/iniciante), âmbar (atenção/intermediário), vermelho (perigo/avançado), azul (informação) — sempre acompanhadas de ícone e texto.
- **Categorias:** cada uma tem uma cor própria, usada só em ícones, bordas e marcadores.

### Razões de contraste (WCAG 2.2 AA: texto ≥ 4.5:1, componentes ≥ 3:1)

| Tema | Par | Cores | Razão |
|---|---|---|---|
| Claro | Texto / fundo | #0F172A / #F8FAFC | 17.1:1 |
| Claro | Texto secundário / fundo | #475569 / #F8FAFC | 7.2:1 |
| Claro | Link / card | #4338CA / #FFFFFF | 7.9:1 |
| Claro | Botão primário | #FFFFFF / #4F46E5 | 6.3:1 |
| Claro | Borda de campo / card | #64748B / #FFFFFF | 4.8:1 |
| Claro | Iniciante / Intermediário / Avançado | #15803D · #B45309 · #B91C1C | 5.0 · 5.0 · 6.5:1 |
| Escuro | Texto / fundo | #E5E7EB / #0B1120 | 15.2:1 |
| Escuro | Texto secundário / fundo | #9CA3AF / #0B1120 | 7.4:1 |
| Escuro | Link / card | #A5B4FC / #111827 | 8.9:1 |
| Escuro | Botão primário | #0B1120 / #818CF8 | 6.3:1 |
| Escuro | Borda de campo / card | #6B7280 / #111827 | 3.7:1 |
| Escuro | Iniciante / Intermediário / Avançado | #86EFAC · #FCD34D · #FCA5A5 | 12.6 · 12.3 · 9.3:1 |

## 4. Leis de UX e Gestalt

- **Fitts:** alvos de toque de no mínimo 44×44 px; ações principais grandes e perto do conteúdo; barra de navegação inferior no celular.
- **Hick:** menu principal com no máximo 7 itens (4 no celular + “Mais”); onboarding dividido em 3 passos.
- **Miller:** conteúdo em blocos; listas de 4 a 6 itens por seção.
- **Jakob:** padrões conhecidos — logo à esquerda, busca no topo, ícone de marcador para salvar.
- **Gestalt:** proximidade (espaçamento de 8 pt), similaridade (cor por categoria), região comum (cards), continuidade (grid alinhado).

## 5. Checklist de acessibilidade (WCAG 2.2 AA)

- [x] `lang="pt-BR"`, `<title>` dinâmico por tela e um `h1` por tela
- [x] Link “Pular para o conteúdo”
- [x] Navegação completa por teclado e foco sempre visível (contorno de 3 px)
- [x] Foco movido para o título a cada troca de tela
- [x] Diálogos com `<dialog>` nativo: foco preso, `Esc` fecha e o foco volta para quem abriu
- [x] `aria-live` para toasts, contador de resultados e carregamentos
- [x] `aria-pressed`, `aria-current`, `aria-expanded` e `aria-label` em botões só com ícone
- [x] Formulários com `fieldset`/`legend` e erros ligados por `aria-describedby`
- [x] A cor nunca é o único indicador (nível tem barras + texto; chips têm ✓)
- [x] `prefers-reduced-motion`, `prefers-color-scheme` e `forced-colors`
- [x] Controle de tamanho do texto (A− / A / A+) sem quebrar o layout
- [x] Sem rolagem horizontal em 360 px

## 6. Como verificar

1. **Lighthouse** (Chrome DevTools → Lighthouse → Acessibilidade e Boas práticas).
2. **Validador W3C:** https://validator.w3.org/
3. **axe DevTools** (extensão do navegador).
4. **Teclado:** navegue pelo site inteiro só com `Tab`, `Shift+Tab`, `Enter`, `Espaço` e `Esc`.
5. **Responsividade:** DevTools → modo dispositivo em 360, 768, 1024 e 1280 px.
