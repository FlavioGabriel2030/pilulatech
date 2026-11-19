/**
 * Pílulas da categoria Desenvolvimento.
 * @type {import('../topics.js').Topic[]}
 */
export default [
  {
    id: 'desenvolvimento-software',
    titulo: 'Desenvolvimento de Software',
    categoria: 'desenvolvimento',
    nivel: 'iniciante',
    tempoLeitura: 5,
    resumo: 'Do problema ao programa em produção: ciclo de vida, linguagens, boas práticas e código que outras pessoas conseguem manter.',
    pincelada: [
      'Desenvolver software vai muito além de escrever código. O ciclo de vida (SDLC) inclui entender o problema e levantar requisitos, projetar a solução, implementar, testar, implantar e manter. Estima-se que a manutenção consuma a maior parte do custo de um sistema ao longo da vida dele — por isso, código legível vale ouro.',
      'Linguagens são ferramentas: JavaScript domina a web, Python reina em dados e automação, Java e C# são fortes em sistemas corporativos, Go e Rust ganham espaço em infraestrutura. Aprender lógica, estruturas de dados e um paradigma (orientação a objetos, funcional) é mais importante do que decorar sintaxe.',
      'Boas práticas como nomes claros, funções pequenas, princípios SOLID, revisão de código e testes automatizados tornam o software mais confiável. Como dizia Martin Fowler: "Qualquer tolo escreve código que um computador entende. Bons programadores escrevem código que humanos entendem".'
    ],
    conceitosChave: [
      { termo: 'SDLC', definicao: 'Ciclo de vida do desenvolvimento de software: requisitos, projeto, implementação, testes, implantação e manutenção.' },
      { termo: 'Requisito funcional', definicao: 'O que o sistema deve fazer (ex.: "o usuário pode favoritar uma pílula").' },
      { termo: 'Requisito não funcional', definicao: 'Como o sistema deve ser (desempenho, segurança, acessibilidade).' },
      { termo: 'Refatoração', definicao: 'Melhorar a estrutura do código sem mudar seu comportamento.' },
      { termo: 'SOLID', definicao: 'Cinco princípios de design orientado a objetos para código flexível e coeso.' },
      { termo: 'Code review', definicao: 'Revisão do código por outra pessoa antes de integrá-lo.' }
    ],
    tecnologiasFundamentais: [
      { nome: 'Visual Studio Code', descricao: 'Editor de código gratuito e extensível.', url: 'https://code.visualstudio.com/' },
      { nome: 'Python', descricao: 'Linguagem versátil, ótima para começar.', url: 'https://docs.python.org/pt-br/3/tutorial/' },
      { nome: 'JavaScript', descricao: 'A linguagem da web, no navegador e no servidor.', url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript' }
    ],
    curiosidade: 'O termo "bug" ficou famoso em 1947, quando a equipe de Grace Hopper encontrou uma mariposa presa num relé do computador Mark II e a colou no diário de bordo.',
    carreira: 'Desenvolvedor(a) front-end, back-end ou full stack, engenheiro(a) de software, desenvolvedor(a) mobile.',
    referencias: [
      { titulo: 'roadmap.sh — trilhas de estudo para desenvolvedores', fonte: 'roadmap.sh', tipo: 'curso', idioma: 'en', url: 'https://roadmap.sh/' },
      { titulo: 'freeCodeCamp — certificações gratuitas', fonte: 'freeCodeCamp', tipo: 'curso', idioma: 'pt', url: 'https://www.freecodecamp.org/portuguese/' },
      { titulo: 'Refactoring Guru — padrões de projeto e refatoração', fonte: 'Refactoring Guru', tipo: 'artigo', idioma: 'pt', url: 'https://refactoring.guru/pt-br' },
      { titulo: 'martinfowler.com — artigos sobre engenharia de software', fonte: 'Martin Fowler', tipo: 'artigo', idioma: 'en', url: 'https://martinfowler.com/' },
      { titulo: 'Communications of the ACM', fonte: 'ACM', tipo: 'revista', idioma: 'en', url: 'https://cacm.acm.org/' }
    ],
    relacionados: ['metodologias-ageis', 'git', 'testes'],
    tags: ['programação', 'código', 'sdlc', 'solid', 'clean code', 'linguagens', 'refatoração'],
    devtoTag: 'programming',
    quiz: [
      { pergunta: '"O sistema deve responder em menos de 2 segundos" é um requisito:', alternativas: ['Funcional', 'Não funcional', 'Opcional', 'De hardware'], correta: 1, explicacao: 'Requisitos não funcionais descrevem qualidades do sistema, como desempenho e segurança.' },
      { pergunta: 'Refatorar significa:', alternativas: ['Adicionar novas funcionalidades', 'Melhorar a estrutura sem mudar o comportamento', 'Apagar o projeto', 'Traduzir o código para outra linguagem'], correta: 1, explicacao: 'Refatoração melhora a legibilidade e a manutenção, mantendo o que o código faz.' },
      { pergunta: 'Qual fase costuma consumir mais custo ao longo da vida de um sistema?', alternativas: ['Requisitos', 'Implementação', 'Manutenção', 'Implantação'], correta: 2, explicacao: 'Sistemas vivem anos e mudam constantemente; por isso a manutenção pesa tanto.' }
    ]
  },
  {
    id: 'metodologias-ageis',
    titulo: 'Engenharia de Software e Metodologias Ágeis',
    categoria: 'desenvolvimento',
    nivel: 'iniciante',
    tempoLeitura: 5,
    resumo: 'Scrum, Kanban e o Manifesto Ágil: entregar valor em ciclos curtos, com feedback constante e times colaborativos.',
    pincelada: [
      'No modelo em cascata, cada fase (requisitos, projeto, código, testes) só começa quando a anterior termina — e o cliente vê o resultado só no fim, quando mudar é caro. Em 2001, o Manifesto Ágil propôs valorizar indivíduos e interações, software funcionando, colaboração com o cliente e resposta a mudanças.',
      'O Scrum organiza o trabalho em sprints de 1 a 4 semanas, com papéis (Product Owner, Scrum Master e Developers), eventos (planning, daily, review e retrospectiva) e artefatos (product backlog, sprint backlog e incremento). O Kanban visualiza o fluxo num quadro (A fazer → Fazendo → Pronto) e limita o trabalho em andamento.',
      'Para um trabalho em grupo como este portal, um "Scrum simplificado" funciona bem: um backlog de histórias de usuário no GitHub Projects, sprints curtas, uma conversa rápida a cada encontro e uma retrospectiva ao fim de cada entrega.'
    ],
    conceitosChave: [
      { termo: 'Manifesto Ágil', definicao: 'Documento de 2001 com 4 valores e 12 princípios do desenvolvimento ágil.' },
      { termo: 'Sprint', definicao: 'Ciclo de tempo fixo no qual o time entrega um incremento.' },
      { termo: 'Product Backlog', definicao: 'Lista priorizada de tudo o que pode ser feito no produto.' },
      { termo: 'História de usuário', definicao: 'Requisito no formato "Como <persona>, quero <ação> para <benefício>".' },
      { termo: 'Kanban', definicao: 'Método de visualização de fluxo com limite de trabalho em andamento (WIP).' },
      { termo: 'Retrospectiva', definicao: 'Reunião em que o time reflete sobre o processo e define melhorias.' }
    ],
    tecnologiasFundamentais: [
      { nome: 'GitHub Projects', descricao: 'Quadros Kanban integrados às issues do repositório.', url: 'https://docs.github.com/pt/issues/planning-and-tracking-with-projects' },
      { nome: 'Jira', descricao: 'Ferramenta popular de gestão ágil.', url: 'https://www.atlassian.com/br/software/jira' },
      { nome: 'Trello', descricao: 'Quadros Kanban simples e visuais.', url: 'https://trello.com/' }
    ],
    curiosidade: 'O Manifesto Ágil foi escrito por 17 desenvolvedores durante um encontro numa estação de esqui em Utah, nos Estados Unidos, em fevereiro de 2001.',
    carreira: 'Scrum Master, Product Owner, Agile Coach, gerente de projetos. Certificações: PSM I, CSM, PSPO.',
    referencias: [
      { titulo: 'Manifesto para Desenvolvimento Ágil de Software', fonte: 'agilemanifesto.org', tipo: 'documentacao', idioma: 'pt', url: 'https://agilemanifesto.org/iso/ptbr/manifesto.html' },
      { titulo: 'The Scrum Guide', fonte: 'Scrum.org / Scrum Inc.', tipo: 'documentacao', idioma: 'pt', url: 'https://scrumguides.org/' },
      { titulo: 'Agile Coach — guias de Scrum e Kanban', fonte: 'Atlassian', tipo: 'artigo', idioma: 'pt', url: 'https://www.atlassian.com/br/agile' },
      { titulo: 'Planejamento com GitHub Projects', fonte: 'GitHub Docs', tipo: 'documentacao', idioma: 'pt', url: 'https://docs.github.com/pt/issues/planning-and-tracking-with-projects' }
    ],
    relacionados: ['desenvolvimento-software', 'devops', 'git'],
    tags: ['scrum', 'kanban', 'ágil', 'sprint', 'backlog', 'cascata', 'projeto'],
    devtoTag: 'agile',
    quiz: [
      { pergunta: 'No Scrum, quem prioriza o Product Backlog?', alternativas: ['Scrum Master', 'Product Owner', 'Cliente final', 'O desenvolvedor mais experiente'], correta: 1, explicacao: 'O Product Owner é responsável por maximizar o valor do produto e ordenar o backlog.' },
      { pergunta: 'Qual reunião serve para o time melhorar o próprio processo?', alternativas: ['Daily', 'Review', 'Retrospectiva', 'Planning'], correta: 2, explicacao: 'Na retrospectiva o time discute o que funcionou e o que mudar.' },
      { pergunta: 'Uma prática central do Kanban é:', alternativas: ['Sprints de 4 semanas', 'Limitar o trabalho em andamento (WIP)', 'Documentação extensa antes de começar', 'Proibir mudanças'], correta: 1, explicacao: 'Limitar o WIP evita gargalos e faz o trabalho fluir.' }
    ]
  },
  {
    id: 'git',
    titulo: 'Git e Versionamento',
    categoria: 'desenvolvimento',
    nivel: 'iniciante',
    tempoLeitura: 5,
    resumo: 'Commits, branches e pull requests: a máquina do tempo do código e a base do trabalho em equipe.',
    pincelada: [
      'O Git é um sistema de controle de versão distribuído: ele registra cada mudança no código como um "commit", uma fotografia do projeto com autor, data e mensagem. Se algo der errado, dá para voltar no tempo. E como cada pessoa tem uma cópia completa do histórico, ninguém depende de um único servidor.',
      'Branches permitem trabalhar em paralelo: cada funcionalidade nasce num ramo separado (feature/busca, feature/favoritos) e, quando fica pronta, é mesclada (merge) na branch principal. Plataformas como GitHub e GitLab adicionam os pull requests, nos quais o time revisa e discute as mudanças antes de integrá-las.',
      'Bons hábitos: commits pequenos e frequentes, mensagens claras (o padrão Conventional Commits, como "feat: adiciona busca"), nunca versionar senhas e sempre atualizar a branch antes de começar o dia. Este portal, aliás, é publicado direto do GitHub pelo GitHub Pages.'
    ],
    conceitosChave: [
      { termo: 'Repositório', definicao: 'Pasta do projeto com todo o histórico de versões.' },
      { termo: 'Commit', definicao: 'Registro de um conjunto de mudanças, com mensagem e autor.' },
      { termo: 'Branch', definicao: 'Linha de desenvolvimento independente.' },
      { termo: 'Merge', definicao: 'Junção das mudanças de uma branch em outra.' },
      { termo: 'Pull request', definicao: 'Pedido de revisão e integração de uma branch no GitHub.' },
      { termo: 'Conflito', definicao: 'Quando duas pessoas alteram a mesma linha e o Git precisa de ajuda para decidir.' }
    ],
    tecnologiasFundamentais: [
      { nome: 'Git', descricao: 'O sistema de controle de versão.', url: 'https://git-scm.com/' },
      { nome: 'GitHub', descricao: 'Hospedagem de repositórios, PRs, Actions e Pages.', url: 'https://docs.github.com/pt' },
      { nome: 'GitHub Pages', descricao: 'Hospedagem gratuita de sites estáticos a partir de um repositório.', url: 'https://docs.github.com/pt/pages' }
    ],
    curiosidade: 'Linus Torvalds criou o Git em 2005, em poucas semanas, para gerenciar o código do kernel Linux depois que a ferramenta usada até então deixou de ser gratuita.',
    carreira: 'Habilidade essencial para qualquer pessoa desenvolvedora, DevOps ou analista de dados. Certificação: GitHub Foundations.',
    referencias: [
      { titulo: 'Pro Git (livro gratuito em português)', fonte: 'git-scm.com', tipo: 'livro', idioma: 'pt', url: 'https://git-scm.com/book/pt-br/v2' },
      { titulo: 'Learn Git Branching — tutorial interativo', fonte: 'Learn Git Branching', tipo: 'curso', idioma: 'pt', url: 'https://learngitbranching.js.org/?locale=pt_BR' },
      { titulo: 'Conventional Commits', fonte: 'conventionalcommits.org', tipo: 'documentacao', idioma: 'pt', url: 'https://www.conventionalcommits.org/pt-br/v1.0.0/' },
      { titulo: 'Documentação do GitHub Pages', fonte: 'GitHub Docs', tipo: 'documentacao', idioma: 'pt', url: 'https://docs.github.com/pt/pages' }
    ],
    relacionados: ['ci-cd', 'metodologias-ageis', 'desenvolvimento-software'],
    tags: ['git', 'github', 'commit', 'branch', 'merge', 'pull request', 'versionamento'],
    devtoTag: 'git',
    quiz: [
      { pergunta: 'Qual comando registra as mudanças preparadas no histórico?', alternativas: ['git push', 'git commit', 'git clone', 'git status'], correta: 1, explicacao: 'git commit cria o registro; git push envia os commits ao repositório remoto.' },
      { pergunta: 'Para desenvolver uma funcionalidade sem afetar a versão principal, cria-se uma:', alternativas: ['Tag', 'Branch', 'Issue', 'Release'], correta: 1, explicacao: 'Branches isolam o trabalho até que ele esteja pronto para o merge.' },
      { pergunta: 'Qual mensagem segue o padrão Conventional Commits?', alternativas: ['"mudanças"', '"feat: adiciona filtro por nível"', '"asdfgh"', '"FINAL agora vai"'], correta: 1, explicacao: 'O prefixo (feat, fix, docs...) deixa o histórico legível e permite automações.' }
    ]
  },
  {
    id: 'apis-rest',
    titulo: 'APIs e REST',
    categoria: 'desenvolvimento',
    nivel: 'intermediario',
    tempoLeitura: 6,
    resumo: 'Como sistemas conversam pela web: requisições HTTP, verbos, códigos de status e JSON.',
    pincelada: [
      'Uma API (Application Programming Interface) é um contrato que permite que um software use funcionalidades de outro. Pense no garçom de um restaurante: você não entra na cozinha; você faz o pedido seguindo o cardápio (a API) e recebe o prato (a resposta).',
      'O estilo REST, o mais comum na web, organiza tudo em recursos identificados por URLs (/usuarios/42) e usa os verbos do HTTP: GET para ler, POST para criar, PUT ou PATCH para atualizar e DELETE para remover. As respostas trazem códigos de status — 200 (ok), 201 (criado), 404 (não encontrado), 500 (erro no servidor) — e normalmente usam o formato JSON.',
      'Este portal consome duas APIs públicas: a do DEV.to, para listar artigos recentes da comunidade, e a da Wikipédia, para mostrar definições no glossário. Boas APIs são bem documentadas (por exemplo, com OpenAPI), versionadas, seguras (autenticação e limites de requisição) e retornam erros claros.'
    ],
    conceitosChave: [
      { termo: 'Endpoint', definicao: 'URL específica de uma API que expõe um recurso ou ação.' },
      { termo: 'Verbos HTTP', definicao: 'GET, POST, PUT, PATCH e DELETE indicam a ação desejada.' },
      { termo: 'Código de status', definicao: 'Número que indica o resultado: 2xx sucesso, 4xx erro do cliente, 5xx erro do servidor.' },
      { termo: 'JSON', definicao: 'Formato de texto leve para troca de dados, baseado em objetos JavaScript.' },
      { termo: 'Stateless', definicao: 'Cada requisição REST carrega tudo o que é preciso; o servidor não guarda a sessão.' },
      { termo: 'CORS', definicao: 'Regra do navegador que controla quais sites podem chamar uma API.' }
    ],
    tecnologiasFundamentais: [
      { nome: 'Fetch API', descricao: 'Forma nativa do JavaScript de fazer requisições.', url: 'https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API' },
      { nome: 'OpenAPI', descricao: 'Padrão para descrever e documentar APIs REST.', url: 'https://www.openapis.org/' },
      { nome: 'Postman', descricao: 'Ferramenta para testar e documentar APIs.', url: 'https://www.postman.com/' },
      { nome: 'GraphQL', descricao: 'Alternativa ao REST em que o cliente escolhe os campos.', url: 'https://graphql.org/' }
    ],
    curiosidade: 'O estilo REST foi descrito por Roy Fielding em sua tese de doutorado, em 2000. Fielding também foi um dos autores da especificação do HTTP.',
    carreira: 'Desenvolvedor(a) back-end, engenheiro(a) de integração, arquiteto(a) de APIs.',
    referencias: [
      { titulo: 'Visão geral do HTTP', fonte: 'MDN Web Docs', tipo: 'documentacao', idioma: 'pt', url: 'https://developer.mozilla.org/pt-BR/docs/Web/HTTP' },
      { titulo: 'Códigos de status de respostas HTTP', fonte: 'MDN Web Docs', tipo: 'documentacao', idioma: 'pt', url: 'https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status' },
      { titulo: 'O que é uma API?', fonte: 'Red Hat', tipo: 'artigo', idioma: 'pt', url: 'https://www.redhat.com/pt-br/topics/api/what-are-application-programming-interfaces' },
      { titulo: 'Tese de Roy Fielding — capítulo sobre REST', fonte: 'UC Irvine', tipo: 'artigo', idioma: 'en', url: 'https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm' }
    ],
    relacionados: ['tcp-ip', 'front-end', 'serverless'],
    tags: ['api', 'rest', 'http', 'json', 'endpoint', 'get', 'post', 'graphql', 'fetch'],
    devtoTag: 'api',
    quiz: [
      { pergunta: 'Qual verbo HTTP é usado para CRIAR um recurso?', alternativas: ['GET', 'POST', 'DELETE', 'HEAD'], correta: 1, explicacao: 'POST cria; GET lê; DELETE remove.' },
      { pergunta: 'O código de status 404 significa:', alternativas: ['Sucesso', 'Recurso não encontrado', 'Erro interno do servidor', 'Redirecionamento'], correta: 1, explicacao: 'Os códigos 4xx indicam erro do lado do cliente; 404 é "não encontrado".' },
      { pergunta: 'Qual formato de dados é mais usado em APIs REST modernas?', alternativas: ['CSV', 'JSON', 'DOCX', 'PNG'], correta: 1, explicacao: 'O JSON é leve, legível e nativo do JavaScript.' }
    ]
  },
  {
    id: 'front-end',
    titulo: 'Desenvolvimento Front-end Web',
    categoria: 'desenvolvimento',
    nivel: 'iniciante',
    tempoLeitura: 5,
    resumo: 'HTML, CSS e JavaScript: estrutura, apresentação e comportamento das interfaces que você usa todo dia.',
    pincelada: [
      'O front-end é a parte da aplicação que roda no navegador e com a qual o usuário interage. Ele se apoia em três pilares: o HTML define a estrutura e o significado (títulos, listas, formulários), o CSS cuida da aparência (cores, layout, responsividade) e o JavaScript adiciona o comportamento (cliques, buscas, dados dinâmicos).',
      'Usar HTML semântico — header, nav, main, article, button — não é só uma questão de organização: leitores de tela e buscadores dependem disso para entender a página. O CSS moderno, com Flexbox, Grid, variáveis e media queries, permite interfaces responsivas sem gambiarras.',
      'Frameworks como React, Vue e Angular ajudam em aplicações grandes, mas dominar os fundamentos vem primeiro. Este portal, por exemplo, foi feito só com HTML, CSS e JavaScript puro (vanilla), usando módulos ES e LocalStorage.'
    ],
    conceitosChave: [
      { termo: 'HTML semântico', definicao: 'Uso de tags que descrevem o significado do conteúdo.' },
      { termo: 'DOM', definicao: 'Representação da página em árvore, que o JavaScript pode ler e modificar.' },
      { termo: 'Responsividade', definicao: 'Adaptação da interface a diferentes tamanhos de tela.' },
      { termo: 'Flexbox e Grid', definicao: 'Sistemas de layout do CSS, em uma e duas dimensões.' },
      { termo: 'Evento', definicao: 'Ação do usuário ou do navegador (click, input, submit) que o JavaScript pode tratar.' },
      { termo: 'LocalStorage', definicao: 'Armazenamento chave-valor no navegador que persiste entre visitas.' }
    ],
    tecnologiasFundamentais: [
      { nome: 'HTML', descricao: 'Linguagem de marcação da web.', url: 'https://developer.mozilla.org/pt-BR/docs/Web/HTML' },
      { nome: 'CSS', descricao: 'Linguagem de estilos da web.', url: 'https://developer.mozilla.org/pt-BR/docs/Web/CSS' },
      { nome: 'JavaScript', descricao: 'Linguagem de programação dos navegadores.', url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript' },
      { nome: 'React', descricao: 'Biblioteca popular para construir interfaces com componentes.', url: 'https://react.dev/' }
    ],
    curiosidade: 'O JavaScript foi criado por Brendan Eich em cerca de 10 dias, em 1995. Apesar do nome, ele não tem relação direta com a linguagem Java.',
    carreira: 'Desenvolvedor(a) front-end, desenvolvedor(a) full stack, engenheiro(a) de UI, especialista em acessibilidade web.',
    referencias: [
      { titulo: 'MDN — Aprendendo desenvolvimento web', fonte: 'MDN Web Docs', tipo: 'curso', idioma: 'pt', url: 'https://developer.mozilla.org/pt-BR/docs/Learn' },
      { titulo: 'web.dev — Learn', fonte: 'Google', tipo: 'curso', idioma: 'en', url: 'https://web.dev/learn' },
      { titulo: 'The Modern JavaScript Tutorial', fonte: 'javascript.info', tipo: 'livro', idioma: 'en', url: 'https://javascript.info/' },
      { titulo: 'CSS-Tricks — guia completo de Flexbox', fonte: 'CSS-Tricks', tipo: 'artigo', idioma: 'en', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/' }
    ],
    relacionados: ['ux-ihc', 'apis-rest', 'testes'],
    tags: ['html', 'css', 'javascript', 'dom', 'react', 'responsivo', 'web', 'frontend'],
    devtoTag: 'frontend',
    quiz: [
      { pergunta: 'Qual tecnologia define a ESTRUTURA de uma página?', alternativas: ['CSS', 'HTML', 'JavaScript', 'JSON'], correta: 1, explicacao: 'HTML estrutura, CSS estiliza e JavaScript dá comportamento.' },
      { pergunta: 'Por que usar <button> em vez de uma <div> clicável?', alternativas: ['Porque é mais bonito', 'Porque é acessível por teclado e reconhecido por leitores de tela', 'Porque carrega mais rápido', 'Não há diferença'], correta: 1, explicacao: 'Elementos semânticos já trazem foco, teclado e papel de acessibilidade embutidos.' },
      { pergunta: 'O que permite salvar dados no navegador entre visitas?', alternativas: ['LocalStorage', 'console.log', 'alert()', 'CSS Grid'], correta: 0, explicacao: 'O LocalStorage persiste pares chave-valor mesmo depois de fechar o navegador.' }
    ]
  },
  {
    id: 'testes',
    titulo: 'Testes de Software',
    categoria: 'desenvolvimento',
    nivel: 'intermediario',
    tempoLeitura: 5,
    resumo: 'Garantir que o código funciona e continua funcionando: testes unitários, de integração e end-to-end.',
    pincelada: [
      'Testar é verificar se o software faz o que deveria — e, principalmente, se continua fazendo depois de cada mudança. Testes automatizados funcionam como uma rede de segurança: permitem refatorar e evoluir o sistema com confiança.',
      'A pirâmide de testes sugere muitos testes unitários (rápidos, testam uma função isolada), uma quantidade média de testes de integração (verificam se as partes conversam bem) e poucos testes end-to-end (simulam um usuário real no navegador, mais lentos e frágeis).',
      'No TDD (Test-Driven Development), escreve-se o teste antes do código: vermelho (o teste falha), verde (o código mínimo para passar) e refatorar. Além dos testes funcionais, existem testes de desempenho, de segurança e de acessibilidade, como os que o Lighthouse e o axe fazem.'
    ],
    conceitosChave: [
      { termo: 'Teste unitário', definicao: 'Verifica uma pequena unidade de código (uma função) isoladamente.' },
      { termo: 'Teste de integração', definicao: 'Verifica a interação entre módulos ou serviços.' },
      { termo: 'Teste end-to-end (E2E)', definicao: 'Simula o fluxo completo de um usuário na aplicação.' },
      { termo: 'Pirâmide de testes', definicao: 'Modelo que recomenda mais testes rápidos na base e menos testes lentos no topo.' },
      { termo: 'TDD', definicao: 'Desenvolvimento guiado por testes: teste primeiro, código depois.' },
      { termo: 'Teste de regressão', definicao: 'Garante que mudanças novas não quebraram o que já funcionava.' }
    ],
    tecnologiasFundamentais: [
      { nome: 'Jest / Vitest', descricao: 'Frameworks de testes para JavaScript.', url: 'https://vitest.dev/' },
      { nome: 'Playwright', descricao: 'Testes end-to-end em vários navegadores.', url: 'https://playwright.dev/' },
      { nome: 'pytest', descricao: 'Framework de testes para Python.', url: 'https://docs.pytest.org/' }
    ],
    curiosidade: 'Em 1996, o foguete Ariane 5 explodiu 37 segundos após o lançamento por causa de um erro de conversão numérica num código reaproveitado sem os testes adequados.',
    carreira: 'Analista de QA, engenheiro(a) de testes automatizados, SDET. Certificação: ISTQB CTFL.',
    referencias: [
      { titulo: 'The Practical Test Pyramid', fonte: 'martinfowler.com (Ham Vocke)', tipo: 'artigo', idioma: 'en', url: 'https://martinfowler.com/articles/practical-test-pyramid.html' },
      { titulo: 'Documentação do Playwright', fonte: 'Microsoft', tipo: 'documentacao', idioma: 'en', url: 'https://playwright.dev/docs/intro' },
      { titulo: 'ISTQB — certificações em testes', fonte: 'ISTQB', tipo: 'curso', idioma: 'en', url: 'https://www.istqb.org/' },
      { titulo: 'Introduction to automated testing', fonte: 'MDN Web Docs', tipo: 'documentacao', idioma: 'en', url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Testing/Automated_testing' }
    ],
    relacionados: ['ci-cd', 'desenvolvimento-software', 'owasp'],
    tags: ['teste', 'qa', 'tdd', 'unitário', 'e2e', 'jest', 'playwright', 'qualidade'],
    devtoTag: 'testing',
    quiz: [
      { pergunta: 'Na pirâmide de testes, qual tipo deve existir em MAIOR quantidade?', alternativas: ['End-to-end', 'Unitários', 'Manuais', 'De carga'], correta: 1, explicacao: 'Testes unitários são rápidos e baratos; por isso ficam na base da pirâmide.' },
      { pergunta: 'No TDD, o primeiro passo é:', alternativas: ['Escrever o código final', 'Escrever um teste que falha', 'Publicar em produção', 'Fazer a documentação'], correta: 1, explicacao: 'O ciclo é vermelho → verde → refatorar.' },
      { pergunta: 'Um teste que simula o usuário clicando no navegador é do tipo:', alternativas: ['Unitário', 'End-to-end', 'Estático', 'De compilação'], correta: 1, explicacao: 'Testes E2E percorrem o fluxo completo, como um usuário faria.' }
    ]
  },
  {
    id: 'estruturas-dados',
    titulo: 'Estruturas de Dados e Algoritmos',
    categoria: 'desenvolvimento',
    nivel: 'avancado',
    tempoLeitura: 7,
    resumo: 'Arrays, listas, árvores, grafos e a notação Big-O: escolher a estrutura certa faz um programa ir de lento a instantâneo.',
    pincelada: [
      'Estruturas de dados são formas de organizar informações na memória; algoritmos são receitas passo a passo para resolver problemas. Escolher bem os dois é o que separa um programa que responde em milissegundos de outro que leva horas.',
      'Cada estrutura tem pontos fortes: arrays dão acesso rápido por posição; listas ligadas facilitam inserções; pilhas (o último a entrar é o primeiro a sair) e filas (o primeiro a entrar é o primeiro a sair) organizam tarefas; tabelas hash encontram itens quase instantaneamente pela chave; árvores mantêm dados ordenados; grafos modelam redes, mapas e relacionamentos.',
      'A notação Big-O descreve como o tempo de execução cresce com o tamanho da entrada. Procurar um nome numa lista desordenada é O(n): no pior caso, olha-se tudo. Numa lista ordenada, a busca binária é O(log n): como procurar uma palavra no dicionário abrindo sempre no meio, um milhão de itens exige só cerca de 20 passos.'
    ],
    conceitosChave: [
      { termo: 'Big-O', definicao: 'Notação que descreve o crescimento do custo de um algoritmo conforme a entrada aumenta.' },
      { termo: 'Pilha (stack)', definicao: 'Estrutura LIFO: o último elemento a entrar é o primeiro a sair.' },
      { termo: 'Fila (queue)', definicao: 'Estrutura FIFO: o primeiro elemento a entrar é o primeiro a sair.' },
      { termo: 'Tabela hash', definicao: 'Estrutura que mapeia chaves a valores com acesso médio O(1).' },
      { termo: 'Árvore binária de busca', definicao: 'Árvore em que, para cada nó, os menores ficam à esquerda e os maiores à direita.' },
      { termo: 'Busca binária', definicao: 'Busca em dados ordenados que divide o espaço pela metade a cada passo: O(log n).' }
    ],
    tecnologiasFundamentais: [
      { nome: 'VisuAlgo', descricao: 'Visualizações animadas de estruturas e algoritmos.', url: 'https://visualgo.net/' },
      { nome: 'LeetCode', descricao: 'Plataforma de exercícios usados em entrevistas técnicas.', url: 'https://leetcode.com/' },
      { nome: 'Beecrowd', descricao: 'Juiz online brasileiro de problemas de programação.', url: 'https://judge.beecrowd.com/' }
    ],
    curiosidade: 'O algoritmo de Dijkstra, que encontra o caminho mais curto em um grafo e está por trás de apps de rotas, foi criado em cerca de 20 minutos, segundo o próprio autor, enquanto ele tomava café com a noiva, em 1956.',
    carreira: 'Base para qualquer engenheiro(a) de software; muito cobrada em entrevistas técnicas e maratonas de programação, como a Maratona SBC.',
    referencias: [
      { titulo: 'VisuAlgo — visualização de algoritmos', fonte: 'NUS', tipo: 'curso', idioma: 'pt', url: 'https://visualgo.net/' },
      { titulo: 'Algoritmos — Khan Academy', fonte: 'Khan Academy', tipo: 'curso', idioma: 'pt', url: 'https://pt.khanacademy.org/computing/computer-science/algorithms' },
      { titulo: 'Big-O Cheat Sheet', fonte: 'bigocheatsheet.com', tipo: 'artigo', idioma: 'en', url: 'https://www.bigocheatsheet.com/' },
      { titulo: 'Maratona de Programação SBC', fonte: 'Sociedade Brasileira de Computação', tipo: 'artigo', idioma: 'pt', url: 'https://maratona.sbc.org.br/' }
    ],
    relacionados: ['desenvolvimento-software', 'banco-de-dados', 'machine-learning'],
    tags: ['algoritmo', 'big-o', 'array', 'pilha', 'fila', 'árvore', 'grafo', 'hash', 'busca binária'],
    devtoTag: 'algorithms',
    quiz: [
      { pergunta: 'Qual estrutura segue a regra "o último a entrar é o primeiro a sair"?', alternativas: ['Fila', 'Pilha', 'Árvore', 'Grafo'], correta: 1, explicacao: 'A pilha é LIFO, como uma pilha de pratos.' },
      { pergunta: 'A busca binária só funciona se os dados estiverem:', alternativas: ['Ordenados', 'Criptografados', 'Em um grafo', 'Duplicados'], correta: 0, explicacao: 'Ela descarta metade do espaço a cada passo, o que só é possível com dados ordenados.' },
      { pergunta: 'Qual complexidade é mais eficiente para entradas grandes?', alternativas: ['O(n²)', 'O(n)', 'O(log n)', 'O(2ⁿ)'], correta: 2, explicacao: 'O(log n) cresce muito devagar: dobrar a entrada acrescenta apenas um passo.' }
    ]
  },
  {
    id: 'ux-ihc',
    titulo: 'UX/UI e Interação Humano-Computador',
    categoria: 'desenvolvimento',
    nivel: 'iniciante',
    tempoLeitura: 6,
    resumo: 'Projetar interfaces fáceis, agradáveis e acessíveis: heurísticas de Nielsen, affordances e acessibilidade.',
    pincelada: [
      'IHC (Interação Humano-Computador) estuda como as pessoas usam a tecnologia. UX (experiência do usuário) é tudo o que a pessoa sente e percebe ao usar um produto; UI (interface do usuário) é a camada visual e interativa. Uma interface bonita que ninguém consegue usar falhou.',
      'As 10 heurísticas de Jakob Nielsen são um checklist clássico: mostrar o status do sistema, falar a língua do usuário, permitir desfazer, ser consistente, prevenir erros, preferir reconhecer a lembrar, oferecer atalhos, ser minimalista, ajudar a sair de erros e oferecer ajuda. Don Norman acrescenta as affordances e os signifiers: um botão precisa parecer clicável.',
      'Acessibilidade é parte da UX: as diretrizes WCAG pedem contraste suficiente, navegação por teclado, textos alternativos e não depender só da cor. Este portal foi construído seguindo esses princípios — passeie pela interface e tente identificar cada heurística aplicada.'
    ],
    conceitosChave: [
      { termo: 'Heurísticas de Nielsen', definicao: '10 princípios gerais de usabilidade para avaliar interfaces.' },
      { termo: 'Affordance', definicao: 'Propriedade que sugere como um objeto pode ser usado.' },
      { termo: 'Signifier', definicao: 'Sinal perceptível que indica onde e como agir (ícone, sublinhado, sombra).' },
      { termo: 'WCAG', definicao: 'Diretrizes internacionais de acessibilidade para conteúdo web.' },
      { termo: 'Lei de Fitts', definicao: 'Alvos maiores e mais próximos são mais rápidos de atingir.' },
      { termo: 'Lei de Hick', definicao: 'Quanto mais opções, mais tempo se leva para decidir.' }
    ],
    tecnologiasFundamentais: [
      { nome: 'Figma', descricao: 'Ferramenta colaborativa de design de interfaces e protótipos.', url: 'https://www.figma.com/' },
      { nome: 'Lighthouse', descricao: 'Auditoria de desempenho e acessibilidade do Chrome.', url: 'https://developer.chrome.com/docs/lighthouse/overview' },
      { nome: 'WebAIM Contrast Checker', descricao: 'Verificador de contraste de cores.', url: 'https://webaim.org/resources/contrastchecker/' }
    ],
    curiosidade: 'O conceito de affordance foi criado pelo psicólogo James J. Gibson, em 1977, e levado para o design por Don Norman no livro "O Design do Dia a Dia", de 1988.',
    carreira: 'UX designer, UI designer, pesquisador(a) de UX, especialista em acessibilidade, product designer. Certificações: Google UX Design, IAAP CPACC.',
    referencias: [
      { titulo: '10 Usability Heuristics for User Interface Design', fonte: 'Nielsen Norman Group', tipo: 'artigo', idioma: 'en', url: 'https://www.nngroup.com/articles/ten-usability-heuristics/' },
      { titulo: 'WCAG 2 Overview', fonte: 'W3C WAI', tipo: 'documentacao', idioma: 'en', url: 'https://www.w3.org/WAI/standards-guidelines/wcag/' },
      { titulo: 'Laws of UX', fonte: 'Jon Yablonski', tipo: 'artigo', idioma: 'en', url: 'https://lawsofux.com/' },
      { titulo: 'Interaction Design Foundation — literatura aberta', fonte: 'IxDF', tipo: 'curso', idioma: 'en', url: 'https://www.interaction-design.org/literature' },
      { titulo: 'Acessibilidade na Web', fonte: 'MDN Web Docs', tipo: 'documentacao', idioma: 'pt', url: 'https://developer.mozilla.org/pt-BR/docs/Web/Accessibility' }
    ],
    relacionados: ['front-end', 'testes', 'desenvolvimento-software'],
    tags: ['ux', 'ui', 'ihc', 'nielsen', 'acessibilidade', 'wcag', 'design', 'usabilidade', 'affordance'],
    devtoTag: 'ux',
    quiz: [
      { pergunta: 'Um botão "Desfazer" após excluir algo atende a qual heurística de Nielsen?', alternativas: ['Estética e design minimalista', 'Controle e liberdade do usuário', 'Ajuda e documentação', 'Correspondência com o mundo real'], correta: 1, explicacao: 'Dar uma "saída de emergência" faz o usuário se sentir no controle.' },
      { pergunta: 'Qual é o contraste mínimo do WCAG AA para texto normal?', alternativas: ['2:1', '3:1', '4.5:1', '10:1'], correta: 2, explicacao: 'Texto normal exige 4.5:1; texto grande e componentes de interface, 3:1.' },
      { pergunta: 'Segundo a Lei de Fitts, botões importantes devem ser:', alternativas: ['Pequenos e distantes', 'Grandes e fáceis de alcançar', 'Escondidos em menus', 'Sempre vermelhos'], correta: 1, explicacao: 'Alvos maiores e mais próximos são atingidos com mais rapidez e precisão.' }
    ]
  }
];
