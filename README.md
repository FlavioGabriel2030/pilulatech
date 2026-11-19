# 💊 PílulaTech — Pílulas do Conhecimento em Tecnologia

### 🔗 Acesse: **https://flaviogabriel2030.github.io/pilulatech/**

Portal com **36 pílulas** curtas (3 a 7 minutos) sobre o universo da tecnologia, organizadas em **8 categorias**. Cada pílula traz uma visão geral, conceitos-chave, tecnologias fundamentais, uma curiosidade, a parte de carreira, **referências confiáveis** para se aprofundar, um quiz e artigos recentes da comunidade.

> Projeto acadêmico desenvolvido em grupo, com apoio de IA (Vibe Coding), seguindo as heurísticas de Nielsen, princípios de UI/UX, affordances, hierarquia de cores e acessibilidade (WCAG 2.2 AA).

<!-- Depois de publicar, salve uma captura da tela inicial em assets/images/screenshot-home.png e descomente a linha abaixo:
![Tela inicial do PílulaTech](assets/images/screenshot-home.png) -->

---

## ✨ Funcionalidades

| Requisito | Descrição |
|---|---|
| **RF01 – Preferências** | Assistente de 3 passos (pode ser pulado): áreas de interesse, nível, objetivo e tempo disponível por dia. Editável em *Minhas preferências*. |
| **RF02 – Recomendações** | “Pílulas para você”: 3 sugestões por pontuação, com o motivo de cada uma (“Por que estou vendo isso?”) e o botão *Gerar outras sugestões*. |
| **RF03/RF04 – Favoritos** | Salvar e remover pílulas, com **Desfazer** na remoção. |
| **RF05 – Histórico** | Últimas 20 pílulas abertas, agrupadas por dia, com remoção individual e *Limpar histórico* (com confirmação e Desfazer). |
| **RF06 – LocalStorage** | Preferências, favoritos, histórico, progresso, tema e tamanho da fonte persistem entre visitas. |
| **Tema claro/escuro** | Segue o sistema na primeira visita, sem “piscar” ao carregar. |
| **Busca** | Atalho `/`, tolerante a acentos, com destaque do termo e buscas recentes. |
| **Filtros e ordenação** | Por categoria e nível (combináveis); a URL guarda os filtros (deep link). |
| **Gamificação** | XP, 4 níveis, 10 conquistas, sequência de dias e quiz em todas as pílulas. |
| **APIs externas** | **DEV.to** (artigos da comunidade por tópico) e **Wikipédia** (resumo dos termos do glossário). |
| **Extras** | Glossário A–Z com 200+ termos, atalhos de teclado (`?`), controle de tamanho da fonte, exportar/importar backup JSON, barra de progresso de leitura, sumário da pílula, página 404. |

## 🗂️ Tópicos

**Infraestrutura:** Redes · Topologia · TCP/IP e OSI · Hardware
**Nuvem e Virtualização:** Computação em Nuvem · Virtualização · Containers · Kubernetes · Serverless e Edge
**Sistemas:** Sistemas Operacionais · Linux
**Segurança:** Cibersegurança · Criptografia · OWASP · LGPD
**Dados e IA:** Banco de Dados (SQL) · NoSQL · Big Data · Machine Learning · IA Generativa
**Desenvolvimento:** Desenvolvimento de Software · Métodos Ágeis · Git · APIs/REST · Front-end · Testes · Estruturas de Dados · UX/UI e IHC
**DevOps:** DevOps · CI/CD · IaC · Monitoramento e Observabilidade
**Tendências e Gestão:** IoT · Blockchain · Computação Quântica · Governança de TI

## 🛠️ Tecnologias

- **HTML5** semântico (header, nav, main, article, section, dialog…)
- **CSS3** com design tokens (custom properties), Grid, Flexbox, `clamp()` e mobile-first
- **JavaScript** puro (ES6+ com módulos), sem frameworks
- **LocalStorage** (persistência) e **sessionStorage** (cache das APIs)
- **APIs públicas:** DEV.to e Wikipédia REST
- **GitHub Pages** (hospedagem)

## 📁 Estrutura

```
pilulatech/
├── index.html            # estrutura, sprite de ícones e script anti-flash do tema
├── css/
│   ├── tokens.css        # design system: cores (claro/escuro), tipografia, espaços
│   └── style.css         # base, layout, componentes, responsividade
├── js/
│   ├── app.js            # roteador, cabeçalho, tema, atalhos, favoritos
│   ├── views.js          # telas: início, tópicos, pílula, favoritos, histórico…
│   ├── topics.js         # categorias + agregação das pílulas (equivale ao movies.js)
│   ├── data/*.js         # conteúdo das pílulas, um arquivo por categoria
│   ├── storage.js        # toda leitura/escrita no LocalStorage
│   ├── recommender.js    # algoritmo de recomendação
│   ├── gamification.js   # XP, níveis, conquistas e sequência
│   ├── api.js            # DEV.to e Wikipédia (timeout, cache, erros)
│   └── ui.js             # componentes: cards, toasts, diálogos, helpers
├── assets/icons/         # favicon
└── docs/
    └── avaliacao-heuristica.md
```

## ▶️ Como rodar localmente

O projeto usa **módulos ES**, que **não funcionam abrindo o `index.html` com duplo clique** (`file://`). Use um servidor local:

- **VS Code:** instale a extensão *Live Server* → clique com o botão direito no `index.html` → *Open with Live Server*.
- **Python:** na pasta do projeto, rode `python -m http.server 5500` e acesse `http://localhost:5500`.

## 🚀 Publicar no GitHub Pages

1. Envie o código para um repositório no GitHub (ex.: `pilulatech`), com o `index.html` na raiz.
2. No repositório: **Settings → Pages → Build and deployment → Source: Deploy from a branch**.
3. Escolha a branch `main` e a pasta `/ (root)` → **Save**.
4. Após 1 a 2 minutos, o site estará em `https://flaviogabriel2030.github.io/pilulatech/`.
5. O link no topo deste README já aponta para esse endereço.

## 🧭 Modelo de desenvolvimento

Iterativo e incremental, guiado por **Design Thinking** (Descobrir → Definir → Desenvolver → Entregar) e organizado com **Scrum simplificado/Kanban** no GitHub Projects: branches `feature/*`, Pull Requests revisados por outro integrante e commits no padrão *Conventional Commits* (`feat:`, `fix:`, `docs:`…).

## ♿ UX, IHC e acessibilidade

A aplicação de cada heurística de Nielsen, as razões de contraste das cores e o checklist WCAG estão em [`docs/avaliacao-heuristica.md`](docs/avaliacao-heuristica.md).

## 👥 Equipe

| Nome | Papel |
|---|---|
| _Integrante 1_ | _ex.: Product Owner / conteúdo_ |
| _Integrante 2_ | _ex.: Front-end / CSS_ |
| _Integrante 3_ | _ex.: JavaScript / APIs_ |
| _Integrante 4_ | _ex.: Testes / documentação_ |

## 📚 Créditos

Artigos da comunidade: [DEV.to](https://dev.to). Definições: [Wikipédia](https://pt.wikipedia.org) (CC BY-SA). Fonte: [Inter](https://rsms.me/inter/). Ícones desenhados no estilo Lucide (traço, 24×24).
