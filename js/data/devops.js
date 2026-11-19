/**
 * Pílulas da categoria Operações (DevOps).
 * @type {import('../topics.js').Topic[]}
 */
export default [
  {
    id: 'devops',
    titulo: 'DevOps',
    categoria: 'devops',
    nivel: 'intermediario',
    tempoLeitura: 5,
    resumo: 'Cultura e práticas que unem desenvolvimento e operações para entregar software com mais frequência e menos falhas.',
    pincelada: [
      'Por muito tempo, quem desenvolvia ("Dev") queria mudar o sistema rápido, e quem operava ("Ops") queria estabilidade. O resultado era um muro entre as equipes, entregas raras e muito estresse a cada atualização. DevOps é a cultura que derruba esse muro: os times compartilham a responsabilidade pelo software, do código até a produção.',
      'Na prática, DevOps se apoia em automação (integração e entrega contínuas, infraestrutura como código), medição (monitoramento e métricas) e compartilhamento (documentação, post-mortems sem culpados). O modelo CALMS resume: Cultura, Automação, Lean, Medição e Compartilhamento.',
      'As pesquisas DORA mostram que times de alto desempenho fazem deploys com frequência, com pouco tempo entre o commit e a produção, baixa taxa de falhas e recuperação rápida. Velocidade e estabilidade andam juntas, ao contrário do que se pensava.'
    ],
    conceitosChave: [
      { termo: 'CALMS', definicao: 'Cultura, Automação, Lean, Medição e Compartilhamento: os pilares do DevOps.' },
      { termo: 'Métricas DORA', definicao: 'Frequência de deploy, lead time, taxa de falhas em mudanças e tempo de recuperação.' },
      { termo: 'Post-mortem sem culpa', definicao: 'Análise de incidentes focada em aprender, não em punir pessoas.' },
      { termo: 'Shift-left', definicao: 'Trazer testes e segurança para o início do ciclo de desenvolvimento.' },
      { termo: 'DevSecOps', definicao: 'Integração da segurança em todas as etapas do DevOps.' }
    ],
    tecnologiasFundamentais: [
      { nome: 'GitHub Actions', descricao: 'Automação de pipelines direto no repositório.', url: 'https://docs.github.com/pt/actions' },
      { nome: 'Docker', descricao: 'Ambientes padronizados do desenvolvimento à produção.', url: 'https://docs.docker.com/' },
      { nome: 'Terraform', descricao: 'Infraestrutura como código.', url: 'https://developer.hashicorp.com/terraform/docs' }
    ],
    curiosidade: 'O termo "DevOps" ganhou força em 2009, quando Patrick Debois organizou o primeiro DevOpsDays, na Bélgica, inspirado na palestra "10+ deploys por dia" do Flickr.',
    carreira: 'Engenheiro(a) DevOps, engenheiro(a) de plataforma, SRE. Certificações: AWS DevOps Engineer, Azure DevOps (AZ-400).',
    referencias: [
      { titulo: 'DORA — pesquisa sobre desempenho de entrega de software', fonte: 'Google Cloud / DORA', tipo: 'artigo', idioma: 'en', url: 'https://dora.dev/' },
      { titulo: 'O que é DevOps?', fonte: 'Atlassian', tipo: 'artigo', idioma: 'pt', url: 'https://www.atlassian.com/br/devops' },
      { titulo: 'O que é DevOps?', fonte: 'Red Hat', tipo: 'artigo', idioma: 'pt', url: 'https://www.redhat.com/pt-br/topics/devops' },
      { titulo: 'O que é DevOps?', fonte: 'AWS', tipo: 'artigo', idioma: 'pt', url: 'https://aws.amazon.com/pt/devops/what-is-devops/' },
      { titulo: 'InfoQ Brasil — DevOps e arquitetura', fonte: 'InfoQ', tipo: 'revista', idioma: 'pt', url: 'https://www.infoq.com/br/' }
    ],
    relacionados: ['ci-cd', 'iac', 'observabilidade'],
    tags: ['devops', 'cultura', 'automação', 'dora', 'calms', 'devsecops', 'sre'],
    devtoTag: 'devops',
    quiz: [
      { pergunta: 'DevOps é principalmente:', alternativas: ['Uma linguagem de programação', 'Uma cultura e um conjunto de práticas', 'Um cargo de gerente', 'Um tipo de servidor'], correta: 1, explicacao: 'Ferramentas ajudam, mas DevOps é, antes de tudo, colaboração e responsabilidade compartilhada.' },
      { pergunta: 'Qual destas é uma métrica DORA?', alternativas: ['Linhas de código por dia', 'Frequência de deploy', 'Número de reuniões', 'Horas extras'], correta: 1, explicacao: 'As quatro métricas-chave são frequência de deploy, lead time, taxa de falhas e tempo de recuperação.' },
      { pergunta: 'Um post-mortem "sem culpa" busca:', alternativas: ['Encontrar quem demitir', 'Aprender com o incidente e melhorar o sistema', 'Esconder o problema', 'Atrasar a próxima entrega'], correta: 1, explicacao: 'Sem medo de punição, as pessoas relatam o que realmente aconteceu.' }
    ]
  },
  {
    id: 'ci-cd',
    titulo: 'CI/CD — Integração e Entrega Contínuas',
    categoria: 'devops',
    nivel: 'intermediario',
    tempoLeitura: 6,
    resumo: 'Pipelines que testam e publicam o código automaticamente a cada mudança: menos sustos, mais entregas.',
    pincelada: [
      'Integração Contínua (CI) é a prática de integrar o código de todos à branch principal várias vezes ao dia. A cada push, um servidor de CI compila o projeto e roda os testes automaticamente. Se algo quebrar, o time descobre em minutos, não semanas depois.',
      'Entrega Contínua (Continuous Delivery) leva isso adiante: todo código que passa no pipeline fica pronto para ir para produção com um clique. Na Implantação Contínua (Continuous Deployment), nem o clique é necessário — passou nos testes, vai para o ar automaticamente.',
      'Um pipeline típico tem etapas como: instalar dependências → lint → testes → build → análise de segurança → deploy em homologação → deploy em produção. Este portal pode usar o GitHub Actions para publicar no GitHub Pages a cada push na branch main — uma esteira de CI/CD na prática.'
    ],
    conceitosChave: [
      { termo: 'Integração contínua (CI)', definicao: 'Integrar e testar o código automaticamente a cada mudança.' },
      { termo: 'Entrega contínua', definicao: 'Código sempre pronto para ser implantado, com aprovação manual.' },
      { termo: 'Implantação contínua', definicao: 'Deploy automático em produção após passar no pipeline.' },
      { termo: 'Pipeline', definicao: 'Sequência automatizada de etapas: build, testes, análise e deploy.' },
      { termo: 'Artefato', definicao: 'Resultado do build (pacote, imagem Docker) que segue pelo pipeline.' },
      { termo: 'Rollback', definicao: 'Voltar rapidamente para a versão anterior quando algo dá errado.' }
    ],
    tecnologiasFundamentais: [
      { nome: 'GitHub Actions', descricao: 'Workflows em YAML disparados por eventos do repositório.', url: 'https://docs.github.com/pt/actions' },
      { nome: 'GitLab CI/CD', descricao: 'Pipelines integrados ao GitLab.', url: 'https://docs.gitlab.com/ci/' },
      { nome: 'Jenkins', descricao: 'Servidor de automação open source veterano.', url: 'https://www.jenkins.io/doc/' }
    ],
    curiosidade: 'Grandes empresas de tecnologia fazem milhares de deploys por dia. Isso só é possível porque cada mudança é pequena, testada automaticamente e fácil de reverter.',
    carreira: 'Engenheiro(a) DevOps, engenheiro(a) de release, engenheiro(a) de plataforma.',
    referencias: [
      { titulo: 'Continuous Integration', fonte: 'martinfowler.com', tipo: 'artigo', idioma: 'en', url: 'https://martinfowler.com/articles/continuousIntegration.html' },
      { titulo: 'Documentação do GitHub Actions', fonte: 'GitHub Docs', tipo: 'documentacao', idioma: 'pt', url: 'https://docs.github.com/pt/actions' },
      { titulo: 'O que é CI/CD?', fonte: 'Red Hat', tipo: 'artigo', idioma: 'pt', url: 'https://www.redhat.com/pt-br/topics/devops/what-is-ci-cd' },
      { titulo: 'Continuous Delivery', fonte: 'continuousdelivery.com (Jez Humble)', tipo: 'artigo', idioma: 'en', url: 'https://continuousdelivery.com/' }
    ],
    relacionados: ['devops', 'testes', 'git'],
    tags: ['ci', 'cd', 'pipeline', 'github actions', 'jenkins', 'deploy', 'build', 'automação'],
    devtoTag: 'cicd',
    quiz: [
      { pergunta: 'Na Integração Contínua, os testes rodam:', alternativas: ['Uma vez por mês', 'Automaticamente a cada mudança enviada', 'Só no fim do projeto', 'Manualmente pelo cliente'], correta: 1, explicacao: 'O objetivo é detectar problemas o mais cedo possível.' },
      { pergunta: 'Qual a diferença entre entrega contínua e implantação contínua?', alternativas: ['Não há diferença', 'Na implantação contínua, o deploy em produção é automático', 'A entrega contínua não tem testes', 'A implantação contínua é manual'], correta: 1, explicacao: 'Na entrega contínua, alguém aprova o deploy; na implantação contínua, ele é automático.' },
      { pergunta: 'Os workflows do GitHub Actions são escritos em:', alternativas: ['XML', 'YAML', 'SQL', 'Markdown'], correta: 1, explicacao: 'Ficam em arquivos .yml dentro da pasta .github/workflows.' }
    ]
  },
  {
    id: 'iac',
    titulo: 'Infraestrutura como Código (IaC)',
    categoria: 'devops',
    nivel: 'avancado',
    tempoLeitura: 5,
    resumo: 'Descrever servidores, redes e bancos em arquivos versionados, em vez de configurar tudo clicando em painéis.',
    pincelada: [
      'Configurar servidores manualmente, clicando em painéis, é lento, sujeito a erros e impossível de reproduzir com exatidão. Com Infraestrutura como Código (IaC), você descreve a infraestrutura em arquivos de texto, versiona no Git, revisa em pull requests e aplica com um comando.',
      'Existem duas abordagens: a declarativa ("quero 3 servidores e um banco", e a ferramenta descobre como chegar lá — Terraform, CloudFormation) e a imperativa ("faça isto, depois aquilo" — scripts). Ferramentas de gerenciamento de configuração, como o Ansible, garantem que os servidores tenham os pacotes e arquivos certos.',
      'Os benefícios são ambientes idênticos (desenvolvimento igual à produção), recuperação rápida de desastres, auditoria de quem mudou o quê e a possibilidade de criar e destruir ambientes de teste em minutos. É como uma receita de bolo: qualquer pessoa da equipe reproduz o mesmo resultado.'
    ],
    conceitosChave: [
      { termo: 'Declarativo', definicao: 'Descreve o estado final desejado; a ferramenta calcula os passos.' },
      { termo: 'Imperativo', definicao: 'Descreve a sequência exata de comandos a executar.' },
      { termo: 'Idempotência', definicao: 'Aplicar a mesma configuração várias vezes produz o mesmo resultado.' },
      { termo: 'Drift', definicao: 'Diferença entre o que está no código e o que realmente existe na infraestrutura.' },
      { termo: 'State (estado)', definicao: 'Registro que o Terraform mantém dos recursos que ele gerencia.' }
    ],
    tecnologiasFundamentais: [
      { nome: 'Terraform / OpenTofu', descricao: 'IaC declarativa para várias nuvens.', url: 'https://developer.hashicorp.com/terraform/docs' },
      { nome: 'Ansible', descricao: 'Automação e gerenciamento de configuração sem agente.', url: 'https://docs.ansible.com/' },
      { nome: 'Pulumi', descricao: 'IaC usando linguagens de programação como TypeScript e Python.', url: 'https://www.pulumi.com/docs/' },
      { nome: 'AWS CloudFormation', descricao: 'IaC nativa da AWS.', url: 'https://aws.amazon.com/pt/cloudformation/' }
    ],
    curiosidade: 'Em 2023, uma mudança de licença do Terraform levou a comunidade a criar o OpenTofu, um fork open source mantido pela Linux Foundation.',
    carreira: 'Engenheiro(a) DevOps, engenheiro(a) de nuvem, engenheiro(a) de plataforma. Certificação: HashiCorp Terraform Associate.',
    referencias: [
      { titulo: 'O que é Infraestrutura como Código?', fonte: 'Red Hat', tipo: 'artigo', idioma: 'pt', url: 'https://www.redhat.com/pt-br/topics/automation/what-is-infrastructure-as-code-iac' },
      { titulo: 'Tutoriais oficiais do Terraform', fonte: 'HashiCorp Developer', tipo: 'curso', idioma: 'en', url: 'https://developer.hashicorp.com/terraform/tutorials' },
      { titulo: 'Documentação do Ansible', fonte: 'Red Hat', tipo: 'documentacao', idioma: 'en', url: 'https://docs.ansible.com/' },
      { titulo: 'OpenTofu', fonte: 'Linux Foundation', tipo: 'documentacao', idioma: 'en', url: 'https://opentofu.org/' }
    ],
    relacionados: ['nuvem', 'devops', 'ci-cd'],
    tags: ['iac', 'terraform', 'ansible', 'pulumi', 'cloudformation', 'automação', 'opentofu'],
    devtoTag: 'terraform',
    quiz: [
      { pergunta: 'O Terraform segue principalmente qual abordagem?', alternativas: ['Imperativa', 'Declarativa', 'Manual', 'Aleatória'], correta: 1, explicacao: 'Você descreve o estado final e o Terraform calcula o plano para chegar lá.' },
      { pergunta: 'Idempotência significa que:', alternativas: ['Cada execução gera um resultado diferente', 'Aplicar a mesma configuração várias vezes dá o mesmo resultado', 'O código não pode ser versionado', 'Só funciona uma vez'], correta: 1, explicacao: 'Isso torna as automações seguras de repetir.' },
      { pergunta: 'Um benefício direto da IaC é:', alternativas: ['Dispensar o controle de versão', 'Reproduzir ambientes de forma idêntica', 'Eliminar a necessidade de nuvem', 'Tornar os servidores mais bonitos'], correta: 1, explicacao: 'O mesmo código gera o mesmo ambiente, seja para testes ou para produção.' }
    ]
  },
  {
    id: 'observabilidade',
    titulo: 'Monitoramento e Observabilidade',
    categoria: 'devops',
    nivel: 'avancado',
    tempoLeitura: 6,
    resumo: 'Métricas, logs e traces para saber o que está acontecendo nos sistemas — e por quê — antes que o usuário reclame.',
    pincelada: [
      'Monitoramento responde "o sistema está funcionando?", acompanhando indicadores conhecidos (CPU, memória, erros) e disparando alertas. Observabilidade vai além: é a capacidade de entender o estado interno de um sistema a partir dos dados que ele emite, inclusive para problemas que ninguém previu. Um responde perguntas conhecidas; o outro permite investigar as desconhecidas.',
      'Os três pilares da observabilidade são: métricas (números ao longo do tempo, como requisições por segundo), logs (registros de eventos com detalhes) e traces (o caminho completo de uma requisição passando por vários serviços). Juntos, funcionam como o painel, a caixa-preta e o GPS de um avião.',
      'Para saber o que monitorar, o Google SRE propõe os "quatro sinais de ouro": latência, tráfego, erros e saturação. Metas de confiabilidade são expressas em SLOs (por exemplo, "99,9% das requisições respondem em menos de 300 ms") e os alertas devem disparar só quando há impacto real no usuário.'
    ],
    conceitosChave: [
      { termo: 'Métricas', definicao: 'Valores numéricos agregados ao longo do tempo.' },
      { termo: 'Logs', definicao: 'Registros textuais ou estruturados de eventos.' },
      { termo: 'Traces', definicao: 'Rastreamento de uma requisição através de vários serviços.' },
      { termo: 'Quatro sinais de ouro', definicao: 'Latência, tráfego, erros e saturação.' },
      { termo: 'SLI / SLO / SLA', definicao: 'Indicador, objetivo e acordo de nível de serviço.' },
      { termo: 'MTTR', definicao: 'Tempo médio para recuperar o serviço após uma falha.' }
    ],
    tecnologiasFundamentais: [
      { nome: 'OpenTelemetry', descricao: 'Padrão aberto para coletar métricas, logs e traces.', url: 'https://opentelemetry.io/docs/' },
      { nome: 'Prometheus', descricao: 'Coleta e consulta de métricas, com alertas.', url: 'https://prometheus.io/docs/introduction/overview/' },
      { nome: 'Grafana', descricao: 'Dashboards para visualizar dados de várias fontes.', url: 'https://grafana.com/docs/' },
      { nome: 'Elastic Stack', descricao: 'Busca e análise de logs (Elasticsearch, Kibana).', url: 'https://www.elastic.co/guide/index.html' }
    ],
    curiosidade: 'Uma disponibilidade de 99,99% ("quatro noves") permite apenas cerca de 52 minutos de indisponibilidade por ano.',
    carreira: 'SRE, engenheiro(a) de observabilidade, analista de NOC, engenheiro(a) DevOps.',
    referencias: [
      { titulo: 'Monitoring Distributed Systems (Google SRE Book)', fonte: 'Google', tipo: 'livro', idioma: 'en', url: 'https://sre.google/sre-book/monitoring-distributed-systems/' },
      { titulo: 'Documentação do OpenTelemetry', fonte: 'CNCF', tipo: 'documentacao', idioma: 'pt', url: 'https://opentelemetry.io/pt/docs/' },
      { titulo: 'Visão geral do Prometheus', fonte: 'Prometheus', tipo: 'documentacao', idioma: 'en', url: 'https://prometheus.io/docs/introduction/overview/' },
      { titulo: 'Qual é a diferença entre monitoramento e observabilidade?', fonte: 'AWS', tipo: 'artigo', idioma: 'pt', url: 'https://aws.amazon.com/pt/compare/the-difference-between-monitoring-and-observability/' }
    ],
    relacionados: ['devops', 'kubernetes', 'ci-cd'],
    tags: ['monitoramento', 'observabilidade', 'logs', 'métricas', 'traces', 'prometheus', 'grafana', 'sre', 'slo'],
    devtoTag: 'observability',
    quiz: [
      { pergunta: 'Quais são os três pilares da observabilidade?', alternativas: ['CPU, RAM e disco', 'Métricas, logs e traces', 'HTML, CSS e JS', 'Dev, Ops e QA'], correta: 1, explicacao: 'Combinados, eles explicam o que aconteceu, quando e por onde a requisição passou.' },
      { pergunta: 'Qual destes NÃO é um dos quatro sinais de ouro?', alternativas: ['Latência', 'Tráfego', 'Erros', 'Cor do dashboard'], correta: 3, explicacao: 'Os sinais de ouro são latência, tráfego, erros e saturação.' },
      { pergunta: 'Para acompanhar uma requisição por vários microsserviços, usa-se:', alternativas: ['Traces', 'Planilhas', 'Backups', 'Firewall'], correta: 0, explicacao: 'O tracing distribuído mostra o caminho e o tempo gasto em cada serviço.' }
    ]
  }
];
