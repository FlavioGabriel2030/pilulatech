/**
 * Pílulas da categoria Nuvem e Virtualização.
 * @type {import('../topics.js').Topic[]}
 */
export default [
  {
    id: 'nuvem',
    titulo: 'Computação em Nuvem',
    categoria: 'nuvem',
    nivel: 'iniciante',
    tempoLeitura: 5,
    resumo: 'Usar servidores, armazenamento e serviços pela internet, pagando pelo uso, em vez de comprar e manter máquinas próprias.',
    pincelada: [
      'Computação em nuvem é como a energia elétrica: em vez de ter um gerador em casa, você se conecta à rede e paga pelo que consome. Na nuvem, empresas alugam poder de processamento, armazenamento e bancos de dados de provedores como AWS, Microsoft Azure e Google Cloud, sob demanda.',
      'O NIST define cinco características essenciais: autoatendimento sob demanda, acesso amplo pela rede, recursos compartilhados (pool), elasticidade rápida (crescer e encolher conforme a demanda) e serviço medido (paga-se pelo uso).',
      'Os modelos de serviço formam uma pirâmide de responsabilidade: no IaaS você aluga máquinas virtuais e cuida do resto; no PaaS o provedor gerencia o sistema e você só publica o código; no SaaS você apenas usa o software pronto, como o Gmail. Quanto mais alto na pirâmide, menos você gerencia — e menos controle tem.'
    ],
    conceitosChave: [
      { termo: 'IaaS', definicao: 'Infraestrutura como Serviço: máquinas virtuais, redes e discos sob demanda.' },
      { termo: 'PaaS', definicao: 'Plataforma como Serviço: ambiente pronto para publicar aplicações sem gerenciar servidores.' },
      { termo: 'SaaS', definicao: 'Software como Serviço: aplicação pronta, acessada pelo navegador.' },
      { termo: 'Elasticidade', definicao: 'Capacidade de aumentar ou reduzir recursos automaticamente conforme a carga.' },
      { termo: 'Região e zona de disponibilidade', definicao: 'Locais geográficos e data centers isolados onde os recursos rodam, para garantir resiliência.' },
      { termo: 'Responsabilidade compartilhada', definicao: 'Divisão de quem cuida de cada parte da segurança: o provedor ou o cliente.' }
    ],
    tecnologiasFundamentais: [
      { nome: 'Amazon Web Services (AWS)', descricao: 'Maior provedor de nuvem pública do mundo.', url: 'https://aws.amazon.com/pt/what-is-cloud-computing/' },
      { nome: 'Microsoft Azure', descricao: 'Nuvem da Microsoft, forte em ambientes corporativos.', url: 'https://learn.microsoft.com/pt-br/azure/' },
      { nome: 'Google Cloud', descricao: 'Nuvem do Google, forte em dados e IA.', url: 'https://cloud.google.com/learn/what-is-cloud-computing' },
      { nome: 'OpenStack', descricao: 'Plataforma open source para criar nuvens privadas.', url: 'https://www.openstack.org/' }
    ],
    curiosidade: 'A AWS nasceu da infraestrutura que a Amazon construiu para aguentar os picos de vendas do seu e-commerce; em 2006, ela começou a vender essa capacidade para outras empresas.',
    carreira: 'Arquiteto(a) de soluções em nuvem, engenheiro(a) de nuvem, analista FinOps. Certificações: AWS Cloud Practitioner, Azure Fundamentals (AZ-900), Google Cloud Digital Leader.',
    referencias: [
      { titulo: 'NIST SP 800-145 — The NIST Definition of Cloud Computing', fonte: 'NIST', tipo: 'documentacao', idioma: 'en', url: 'https://csrc.nist.gov/pubs/sp/800/145/final' },
      { titulo: 'O que é computação em nuvem?', fonte: 'AWS', tipo: 'artigo', idioma: 'pt', url: 'https://aws.amazon.com/pt/what-is-cloud-computing/' },
      { titulo: 'Treinamentos gratuitos de Azure', fonte: 'Microsoft Learn', tipo: 'curso', idioma: 'pt', url: 'https://learn.microsoft.com/pt-br/training/azure/' },
      { titulo: 'O que é a nuvem?', fonte: 'Cloudflare Learning Center', tipo: 'artigo', idioma: 'en', url: 'https://www.cloudflare.com/learning/cloud/what-is-the-cloud/' },
      { titulo: 'The New Stack — notícias sobre cloud native', fonte: 'The New Stack', tipo: 'revista', idioma: 'en', url: 'https://thenewstack.io/' }
    ],
    relacionados: ['virtualizacao', 'serverless', 'iac'],
    tags: ['aws', 'azure', 'gcp', 'iaas', 'paas', 'saas', 'cloud', 'elasticidade'],
    devtoTag: 'cloud',
    quiz: [
      { pergunta: 'O Gmail é um exemplo de qual modelo de serviço?', alternativas: ['IaaS', 'PaaS', 'SaaS', 'On-premises'], correta: 2, explicacao: 'No SaaS o usuário só consome o software pronto; toda a infraestrutura fica com o provedor.' },
      { pergunta: '"Elasticidade" na nuvem significa:', alternativas: ['Os servidores são flexíveis fisicamente', 'Os recursos aumentam ou diminuem conforme a demanda', 'Os preços são fixos', 'O sistema nunca falha'], correta: 1, explicacao: 'A elasticidade permite acompanhar picos e quedas de uso sem pagar por capacidade ociosa.' },
      { pergunta: 'Qual órgão publicou a definição de referência de computação em nuvem?', alternativas: ['IEEE', 'W3C', 'NIST', 'ISO'], correta: 2, explicacao: 'A publicação NIST SP 800-145 é a definição mais citada.' }
    ]
  },
  {
    id: 'virtualizacao',
    titulo: 'Virtualização',
    categoria: 'nuvem',
    nivel: 'intermediario',
    tempoLeitura: 5,
    resumo: 'Rodar vários "computadores virtuais" isolados em uma única máquina física, com o hipervisor dividindo os recursos.',
    pincelada: [
      'Virtualizar é criar versões de software de recursos físicos. Com ela, um único servidor potente pode rodar dezenas de máquinas virtuais (VMs), cada uma com seu próprio sistema operacional, como se fossem computadores independentes. É como dividir um prédio em vários apartamentos: a estrutura é a mesma, mas cada morador tem seu espaço isolado.',
      'Quem faz essa divisão é o hipervisor. O tipo 1 (bare-metal) roda direto no hardware e é usado em data centers (KVM, Hyper-V, ESXi). O tipo 2 roda sobre um sistema operacional comum e é ótimo para estudar (VirtualBox, VMware Workstation).',
      'A virtualização é a base da computação em nuvem: quando você cria uma instância na AWS, está recebendo uma VM. Ela também traz economia de energia, recuperação de desastres mais fácil (com snapshots) e ambientes de teste descartáveis.'
    ],
    conceitosChave: [
      { termo: 'Máquina virtual (VM)', definicao: 'Computador emulado por software, com SO e aplicações próprios.' },
      { termo: 'Hipervisor', definicao: 'Software que cria e gerencia VMs, distribuindo CPU, memória e disco.' },
      { termo: 'Hipervisor tipo 1', definicao: 'Roda diretamente sobre o hardware; mais desempenho e segurança.' },
      { termo: 'Hipervisor tipo 2', definicao: 'Roda sobre um sistema operacional hospedeiro; mais simples de usar.' },
      { termo: 'Snapshot', definicao: 'Fotografia do estado de uma VM, que permite voltar a um ponto anterior.' }
    ],
    tecnologiasFundamentais: [
      { nome: 'KVM', descricao: 'Hipervisor integrado ao kernel Linux.', url: 'https://linux-kvm.org/' },
      { nome: 'Microsoft Hyper-V', descricao: 'Hipervisor da Microsoft, nativo no Windows Server e no Windows Pro.', url: 'https://learn.microsoft.com/pt-br/windows-server/virtualization/hyper-v/hyper-v-overview' },
      { nome: 'VirtualBox', descricao: 'Hipervisor tipo 2 gratuito, ótimo para laboratórios de estudo.', url: 'https://www.virtualbox.org/' },
      { nome: 'Proxmox VE', descricao: 'Plataforma open source de virtualização para servidores.', url: 'https://www.proxmox.com/' }
    ],
    curiosidade: 'A IBM já virtualizava seus mainframes nos anos 1960 com o sistema CP-40, para que vários usuários compartilhassem um computador caríssimo ao mesmo tempo.',
    carreira: 'Administrador(a) de sistemas, analista de infraestrutura, engenheiro(a) de nuvem. Certificações: Red Hat RHCSA, certificações Microsoft de Windows Server.',
    referencias: [
      { titulo: 'O que é virtualização?', fonte: 'Red Hat', tipo: 'artigo', idioma: 'pt', url: 'https://www.redhat.com/pt-br/topics/virtualization/what-is-virtualization' },
      { titulo: 'O que é virtualização?', fonte: 'AWS', tipo: 'artigo', idioma: 'pt', url: 'https://aws.amazon.com/pt/what-is/virtualization/' },
      { titulo: 'Visão geral do Hyper-V', fonte: 'Microsoft Learn', tipo: 'documentacao', idioma: 'pt', url: 'https://learn.microsoft.com/pt-br/windows-server/virtualization/hyper-v/hyper-v-overview' },
      { titulo: 'Manual do VirtualBox', fonte: 'Oracle', tipo: 'documentacao', idioma: 'en', url: 'https://www.virtualbox.org/wiki/Documentation' }
    ],
    relacionados: ['nuvem', 'containers', 'sistemas-operacionais'],
    tags: ['vm', 'hipervisor', 'kvm', 'hyper-v', 'virtualbox', 'vmware', 'snapshot'],
    devtoTag: 'virtualization',
    quiz: [
      { pergunta: 'Qual software cria e gerencia máquinas virtuais?', alternativas: ['Compilador', 'Hipervisor', 'Firewall', 'Balanceador de carga'], correta: 1, explicacao: 'O hipervisor distribui os recursos físicos entre as VMs e as mantém isoladas.' },
      { pergunta: 'O VirtualBox instalado no seu notebook é um hipervisor:', alternativas: ['Tipo 1', 'Tipo 2', 'Tipo 3', 'De rede'], correta: 1, explicacao: 'Ele roda sobre um sistema operacional hospedeiro, o que caracteriza o tipo 2.' },
      { pergunta: 'Um snapshot serve para:', alternativas: ['Acelerar a CPU', 'Salvar o estado da VM e poder voltar a ele', 'Conectar a VM à internet', 'Converter VM em container'], correta: 1, explicacao: 'Snapshots são pontos de restauração, muito úteis antes de atualizações arriscadas.' }
    ]
  },
  {
    id: 'containers',
    titulo: 'Containers e Docker',
    categoria: 'nuvem',
    nivel: 'intermediario',
    tempoLeitura: 6,
    resumo: 'Empacotar a aplicação com tudo de que ela precisa para rodar igual em qualquer lugar — o fim do "na minha máquina funciona".',
    pincelada: [
      'Um container empacota uma aplicação com suas bibliotecas e configurações em uma unidade isolada e portátil. A analogia vem dos containers de navio: não importa o que há dentro, todos têm o mesmo formato e podem ser transportados por qualquer navio ou guindaste.',
      'Diferente da VM, o container não carrega um sistema operacional inteiro: ele compartilha o kernel do host e isola apenas os processos (com namespaces e cgroups do Linux). Por isso, inicia em segundos e ocupa megabytes, em vez de gigabytes.',
      'O Docker popularizou os containers. Você descreve o ambiente em um Dockerfile, gera uma imagem (o "molde") e roda containers (as "instâncias") a partir dela. As imagens podem ser compartilhadas em registros como o Docker Hub.'
    ],
    conceitosChave: [
      { termo: 'Imagem', definicao: 'Modelo somente leitura, em camadas, com tudo o que a aplicação precisa.' },
      { termo: 'Container', definicao: 'Instância em execução de uma imagem, isolada dos demais processos.' },
      { termo: 'Dockerfile', definicao: 'Arquivo de texto com as instruções para construir uma imagem.' },
      { termo: 'Registro (registry)', definicao: 'Repositório de imagens, como o Docker Hub ou o GitHub Container Registry.' },
      { termo: 'Docker Compose', definicao: 'Ferramenta para definir e subir vários containers juntos com um arquivo YAML.' }
    ],
    tecnologiasFundamentais: [
      { nome: 'Docker', descricao: 'Plataforma mais popular para criar e rodar containers.', url: 'https://docs.docker.com/get-started/' },
      { nome: 'Podman', descricao: 'Alternativa ao Docker que não precisa de daemon.', url: 'https://podman.io/' },
      { nome: 'Open Container Initiative', descricao: 'Padrões abertos para imagens e runtimes de container.', url: 'https://opencontainers.org/' }
    ],
    curiosidade: 'O Docker foi apresentado em 2013, numa palestra de cerca de 5 minutos na PyCon. A ideia de isolar processos, porém, vem do chroot do Unix, de 1979.',
    carreira: 'Engenheiro(a) DevOps, engenheiro(a) de plataforma, desenvolvedor(a) back-end. Certificação: Docker Certified Associate.',
    referencias: [
      { titulo: 'Docker — Get started', fonte: 'Docker Docs', tipo: 'documentacao', idioma: 'en', url: 'https://docs.docker.com/get-started/' },
      { titulo: 'O que são containers?', fonte: 'Red Hat', tipo: 'artigo', idioma: 'pt', url: 'https://www.redhat.com/pt-br/topics/containers' },
      { titulo: 'Play with Docker — laboratório gratuito no navegador', fonte: 'Docker', tipo: 'curso', idioma: 'en', url: 'https://labs.play-with-docker.com/' },
      { titulo: 'Open Container Initiative', fonte: 'Linux Foundation', tipo: 'documentacao', idioma: 'en', url: 'https://opencontainers.org/' }
    ],
    relacionados: ['kubernetes', 'virtualizacao', 'ci-cd'],
    tags: ['docker', 'imagem', 'dockerfile', 'compose', 'podman', 'container'],
    devtoTag: 'docker',
    quiz: [
      { pergunta: 'Qual a principal diferença entre container e VM?', alternativas: ['Containers são mais lentos', 'Containers compartilham o kernel do host', 'VMs não têm sistema operacional', 'Containers só rodam no Windows'], correta: 1, explicacao: 'Por compartilharem o kernel, containers são leves e iniciam muito mais rápido que VMs.' },
      { pergunta: 'Onde ficam as instruções para construir uma imagem Docker?', alternativas: ['package.json', 'Dockerfile', 'README.md', '.gitignore'], correta: 1, explicacao: 'O Dockerfile descreve, passo a passo, como a imagem deve ser montada.' },
      { pergunta: 'Para subir uma aplicação com banco de dados e back-end juntos, usa-se:', alternativas: ['Docker Compose', 'Git', 'SSH', 'DNS'], correta: 0, explicacao: 'O Compose define vários serviços em um único arquivo YAML e sobe todos com um comando.' }
    ]
  },
  {
    id: 'kubernetes',
    titulo: 'Orquestração com Kubernetes',
    categoria: 'nuvem',
    nivel: 'avancado',
    tempoLeitura: 7,
    resumo: 'Gerenciar centenas de containers automaticamente: escalar, distribuir carga e se recuperar de falhas sozinho.',
    pincelada: [
      'Quando uma empresa tem centenas de containers em dezenas de servidores, gerenciá-los manualmente fica impossível. O Kubernetes (K8s) é um orquestrador: você declara o estado desejado ("quero 5 cópias desta aplicação") e ele trabalha continuamente para que a realidade corresponda a esse desejo.',
      'Pense num maestro: ele não toca nenhum instrumento, mas garante que todos entrem na hora certa. Se um servidor cai, o Kubernetes recria os containers em outro; se o acesso aumenta, ele cria mais réplicas; se uma nova versão dá erro, ele pode voltar para a anterior.',
      'Um cluster tem um plano de controle (o "cérebro") e nós de trabalho (os "músculos"). A menor unidade é o Pod, que agrupa um ou mais containers. Deployments cuidam das réplicas e atualizações, e Services dão um endereço estável para acessar os Pods.'
    ],
    conceitosChave: [
      { termo: 'Cluster', definicao: 'Conjunto de máquinas (nós) gerenciadas pelo Kubernetes.' },
      { termo: 'Pod', definicao: 'Menor unidade implantável; contém um ou mais containers que compartilham rede e armazenamento.' },
      { termo: 'Deployment', definicao: 'Define quantas réplicas de um Pod devem existir e como atualizá-las.' },
      { termo: 'Service', definicao: 'Endereço estável e balanceamento de carga para um grupo de Pods.' },
      { termo: 'Estado desejado', definicao: 'Modelo declarativo: você descreve o "o quê" e o sistema cuida do "como".' }
    ],
    tecnologiasFundamentais: [
      { nome: 'Kubernetes', descricao: 'Orquestrador open source mantido pela CNCF.', url: 'https://kubernetes.io/pt-br/docs/concepts/overview/' },
      { nome: 'Helm', descricao: 'Gerenciador de pacotes para aplicações Kubernetes.', url: 'https://helm.sh/' },
      { nome: 'kind / Minikube', descricao: 'Clusters locais para estudar no seu computador.', url: 'https://minikube.sigs.k8s.io/' }
    ],
    curiosidade: 'Kubernetes vem do grego e significa "timoneiro". O projeto nasceu no Google, inspirado no Borg, sistema interno que gerenciava bilhões de containers por semana.',
    carreira: 'Engenheiro(a) de plataforma, SRE, engenheiro(a) DevOps. Certificações: CKA, CKAD e KCNA (Linux Foundation/CNCF).',
    referencias: [
      { titulo: 'Visão geral do Kubernetes', fonte: 'Documentação oficial do Kubernetes', tipo: 'documentacao', idioma: 'pt', url: 'https://kubernetes.io/pt-br/docs/concepts/overview/' },
      { titulo: 'Tutoriais oficiais do Kubernetes', fonte: 'Kubernetes', tipo: 'curso', idioma: 'pt', url: 'https://kubernetes.io/pt-br/docs/tutorials/' },
      { titulo: 'Cloud Native Computing Foundation', fonte: 'CNCF', tipo: 'artigo', idioma: 'en', url: 'https://www.cncf.io/' },
      { titulo: 'CNCF Landscape — mapa do ecossistema cloud native', fonte: 'CNCF', tipo: 'documentacao', idioma: 'en', url: 'https://landscape.cncf.io/' }
    ],
    relacionados: ['containers', 'observabilidade', 'devops'],
    tags: ['k8s', 'pod', 'cluster', 'helm', 'orquestração', 'deployment', 'cncf'],
    devtoTag: 'kubernetes',
    quiz: [
      { pergunta: 'Qual é a menor unidade implantável no Kubernetes?', alternativas: ['Node', 'Pod', 'Cluster', 'Namespace'], correta: 1, explicacao: 'O Pod agrupa um ou mais containers e é a unidade básica que o Kubernetes agenda.' },
      { pergunta: 'Se um nó do cluster cair, o Kubernetes:', alternativas: ['Para toda a aplicação', 'Recria os Pods em outros nós para manter o estado desejado', 'Envia um e-mail e aguarda', 'Apaga o Deployment'], correta: 1, explicacao: 'O ciclo de reconciliação compara o estado atual com o desejado e corrige as diferenças.' },
      { pergunta: 'O que significa "Kubernetes" em grego?', alternativas: ['Contêiner', 'Timoneiro', 'Nuvem', 'Maestro'], correta: 1, explicacao: 'Daí o logotipo em forma de timão de navio.' }
    ]
  },
  {
    id: 'serverless',
    titulo: 'Serverless e Edge Computing',
    categoria: 'nuvem',
    nivel: 'intermediario',
    tempoLeitura: 5,
    resumo: 'Rodar código sem gerenciar servidores, pagando só pela execução, e processar dados perto de quem os usa.',
    pincelada: [
      'Serverless não quer dizer "sem servidor": os servidores existem, mas você não precisa pensar neles. Você escreve funções que reagem a eventos (uma requisição HTTP, um arquivo enviado, um horário agendado) e o provedor cuida de executar, escalar e cobrar apenas pelos milissegundos usados.',
      'É como pegar um táxi em vez de comprar um carro: sem manutenção nem garagem, e você paga só pelas viagens. O modelo é ótimo para cargas irregulares, mas tem limitações, como o "cold start" (o atraso na primeira execução) e o risco de ficar preso a um único provedor.',
      'Edge computing leva o processamento para perto do usuário — em pontos de presença espalhados pelo mundo ou no próprio dispositivo. Isso reduz a latência, o que é essencial para carros autônomos, jogos online e IoT.'
    ],
    conceitosChave: [
      { termo: 'FaaS', definicao: 'Function as a Service: executa funções curtas disparadas por eventos.' },
      { termo: 'Cold start', definicao: 'Atraso na primeira execução, enquanto o ambiente da função é preparado.' },
      { termo: 'Orientado a eventos', definicao: 'Arquitetura na qual o código reage a acontecimentos, em vez de rodar o tempo todo.' },
      { termo: 'Edge', definicao: 'Processamento feito na borda da rede, próximo do usuário ou do dispositivo.' },
      { termo: 'CDN', definicao: 'Rede de distribuição de conteúdo que guarda cópias dos arquivos perto dos usuários.' }
    ],
    tecnologiasFundamentais: [
      { nome: 'AWS Lambda', descricao: 'Serviço pioneiro de funções serverless.', url: 'https://aws.amazon.com/pt/lambda/' },
      { nome: 'Cloudflare Workers', descricao: 'Funções executadas na borda, em centenas de cidades.', url: 'https://workers.cloudflare.com/' },
      { nome: 'Azure Functions', descricao: 'Plataforma serverless da Microsoft.', url: 'https://learn.microsoft.com/pt-br/azure/azure-functions/' }
    ],
    curiosidade: 'O AWS Lambda foi lançado em 2014 e popularizou a cobrança por milissegundos de execução: uma função pouco usada pode custar centavos por mês.',
    carreira: 'Desenvolvedor(a) back-end, arquiteto(a) de nuvem, engenheiro(a) de plataforma.',
    referencias: [
      { titulo: 'Serverless Architectures', fonte: 'martinfowler.com (Mike Roberts)', tipo: 'artigo', idioma: 'en', url: 'https://martinfowler.com/articles/serverless.html' },
      { titulo: 'O que é computação serverless?', fonte: 'Cloudflare Learning Center', tipo: 'artigo', idioma: 'en', url: 'https://www.cloudflare.com/learning/serverless/what-is-serverless/' },
      { titulo: 'O que é edge computing?', fonte: 'Cloudflare Learning Center', tipo: 'artigo', idioma: 'en', url: 'https://www.cloudflare.com/learning/serverless/glossary/what-is-edge-computing/' },
      { titulo: 'O que é serverless?', fonte: 'Red Hat', tipo: 'artigo', idioma: 'pt', url: 'https://www.redhat.com/pt-br/topics/cloud-native-apps/what-is-serverless' }
    ],
    relacionados: ['nuvem', 'apis-rest', 'iot'],
    tags: ['lambda', 'faas', 'edge', 'cdn', 'eventos', 'functions', 'workers'],
    devtoTag: 'serverless',
    quiz: [
      { pergunta: 'Em serverless, você normalmente paga:', alternativas: ['Um valor fixo mensal por servidor', 'Pelo tempo de execução das funções', 'Apenas pelo armazenamento', 'Nada'], correta: 1, explicacao: 'A cobrança é por invocação e por tempo de execução; sem uso, o custo é quase zero.' },
      { pergunta: 'O que é "cold start"?', alternativas: ['Um erro de memória', 'O atraso na primeira execução de uma função', 'Um tipo de backup', 'O desligamento do servidor'], correta: 1, explicacao: 'Na primeira chamada, o provedor precisa preparar o ambiente, o que gera um atraso extra.' },
      { pergunta: 'O principal benefício do edge computing é:', alternativas: ['Reduzir a latência', 'Eliminar a necessidade de rede', 'Aumentar o tamanho dos arquivos', 'Dispensar a segurança'], correta: 0, explicacao: 'Processar perto do usuário encurta a distância que os dados percorrem.' }
    ]
  }
];
