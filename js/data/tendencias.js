/**
 * Pílulas da categoria Tendências e Gestão.
 * @type {import('../topics.js').Topic[]}
 */
export default [
  {
    id: 'iot',
    titulo: 'Internet das Coisas (IoT)',
    categoria: 'tendencias',
    nivel: 'iniciante',
    tempoLeitura: 5,
    resumo: 'Sensores e objetos conectados que coletam dados e agem no mundo físico: de casas inteligentes à agricultura de precisão.',
    pincelada: [
      'A Internet das Coisas conecta objetos do dia a dia à internet: lâmpadas, relógios, geladeiras, sensores industriais, câmeras e até vacas com coleiras inteligentes. Esses dispositivos coletam dados do ambiente (temperatura, movimento, umidade) e podem agir sobre ele (abrir uma válvula, acender uma luz).',
      'Uma solução de IoT costuma ter quatro camadas: dispositivos com sensores e atuadores; conectividade (Wi-Fi, Bluetooth, LoRaWAN, 5G); uma plataforma que recebe e processa os dados (geralmente na nuvem ou no edge); e aplicações que mostram painéis e disparam ações.',
      'O grande desafio é a segurança: muitos dispositivos baratos saem de fábrica com senhas padrão e nunca recebem atualizações. Em 2016, a botnet Mirai usou milhares de câmeras e roteadores mal configurados para derrubar grandes sites da internet.'
    ],
    conceitosChave: [
      { termo: 'Sensor', definicao: 'Componente que mede algo do ambiente físico.' },
      { termo: 'Atuador', definicao: 'Componente que age no mundo físico (motor, relé, válvula).' },
      { termo: 'MQTT', definicao: 'Protocolo leve de mensagens no padrão publicar/assinar, muito usado em IoT.' },
      { termo: 'LoRaWAN', definicao: 'Rede de longo alcance e baixo consumo para sensores.' },
      { termo: 'Gateway', definicao: 'Ponte entre os dispositivos locais e a internet ou nuvem.' }
    ],
    tecnologiasFundamentais: [
      { nome: 'Arduino', descricao: 'Plataforma de prototipagem eletrônica open source.', url: 'https://docs.arduino.cc/' },
      { nome: 'ESP32', descricao: 'Microcontrolador barato com Wi-Fi e Bluetooth.', url: 'https://www.espressif.com/en/products/socs/esp32' },
      { nome: 'Raspberry Pi', descricao: 'Computador de placa única para projetos maiores.', url: 'https://www.raspberrypi.com/documentation/' },
      { nome: 'MQTT', descricao: 'Protocolo padrão para mensagens em IoT.', url: 'https://mqtt.org/' }
    ],
    curiosidade: 'Um dos primeiros "objetos conectados" foi uma máquina de refrigerante da Universidade Carnegie Mellon, ligada à ARPANET em 1982 para informar se havia latas geladas.',
    carreira: 'Engenheiro(a) de IoT, desenvolvedor(a) de sistemas embarcados, engenheiro(a) de automação.',
    referencias: [
      { titulo: 'O que é IoT?', fonte: 'AWS', tipo: 'artigo', idioma: 'pt', url: 'https://aws.amazon.com/pt/what-is/iot/' },
      { titulo: 'Documentação do Arduino', fonte: 'Arduino', tipo: 'documentacao', idioma: 'en', url: 'https://docs.arduino.cc/' },
      { titulo: 'MQTT: The Standard for IoT Messaging', fonte: 'mqtt.org', tipo: 'documentacao', idioma: 'en', url: 'https://mqtt.org/' },
      { titulo: 'Wokwi — simulador online de Arduino e ESP32', fonte: 'Wokwi', tipo: 'curso', idioma: 'en', url: 'https://wokwi.com/' }
    ],
    relacionados: ['serverless', 'redes', 'ciberseguranca'],
    tags: ['iot', 'arduino', 'esp32', 'sensor', 'mqtt', 'raspberry pi', 'embarcados', 'casa inteligente'],
    devtoTag: 'iot',
    quiz: [
      { pergunta: 'Qual componente MEDE algo do ambiente?', alternativas: ['Atuador', 'Sensor', 'Gateway', 'Firewall'], correta: 1, explicacao: 'O sensor mede; o atuador age.' },
      { pergunta: 'Qual protocolo leve é muito usado para mensagens em IoT?', alternativas: ['FTP', 'MQTT', 'SMTP', 'POP3'], correta: 1, explicacao: 'O MQTT usa o modelo publicar/assinar e consome pouca banda.' },
      { pergunta: 'Por que a botnet Mirai conseguiu infectar tantos dispositivos?', alternativas: ['Eles eram muito caros', 'Muitos usavam senhas padrão de fábrica', 'Eles não tinham internet', 'Eles usavam criptografia quântica'], correta: 1, explicacao: 'Trocar a senha padrão e atualizar o firmware são medidas básicas e essenciais.' }
    ]
  },
  {
    id: 'blockchain',
    titulo: 'Blockchain',
    categoria: 'tendencias',
    nivel: 'intermediario',
    tempoLeitura: 5,
    resumo: 'Um livro-razão distribuído e à prova de adulteração: como funciona, onde faz sentido e onde não faz.',
    pincelada: [
      'Blockchain é um registro de transações compartilhado entre muitos computadores. As transações são agrupadas em blocos, e cada bloco guarda o hash do bloco anterior, formando uma corrente. Alterar um bloco antigo mudaria o hash dele e quebraria todos os seguintes — por isso, a cadeia é considerada à prova de adulteração.',
      'Como não existe uma autoridade central, os participantes precisam concordar sobre qual é a versão verdadeira. Para isso existem os mecanismos de consenso: a prova de trabalho (Proof of Work), usada pelo Bitcoin, exige muito processamento; a prova de participação (Proof of Stake), adotada pelo Ethereum em 2022, consome muito menos energia.',
      'Além das criptomoedas, a blockchain permite contratos inteligentes (programas que rodam na rede) e rastreabilidade de cadeias de suprimento. Mas ela não é a solução para tudo: se existe uma entidade confiável que pode manter o registro, um banco de dados tradicional costuma ser mais simples, rápido e barato.'
    ],
    conceitosChave: [
      { termo: 'Bloco', definicao: 'Conjunto de transações com o hash do bloco anterior.' },
      { termo: 'Livro-razão distribuído', definicao: 'Registro replicado entre muitos participantes, sem dono único.' },
      { termo: 'Consenso', definicao: 'Mecanismo pelo qual a rede concorda sobre o estado válido.' },
      { termo: 'Proof of Work / Proof of Stake', definicao: 'Consenso por esforço computacional ou por participação (moedas em garantia).' },
      { termo: 'Contrato inteligente', definicao: 'Programa armazenado na blockchain que executa regras automaticamente.' }
    ],
    tecnologiasFundamentais: [
      { nome: 'Bitcoin', descricao: 'Primeira criptomoeda e primeira blockchain pública.', url: 'https://bitcoin.org/pt_BR/' },
      { nome: 'Ethereum', descricao: 'Blockchain programável com contratos inteligentes.', url: 'https://ethereum.org/pt-br/developers/docs/' },
      { nome: 'Hyperledger', descricao: 'Projetos de blockchain corporativa da Linux Foundation.', url: 'https://www.lfdecentralizedtrust.org/' }
    ],
    curiosidade: 'O artigo que criou o Bitcoin, publicado em 2008, foi assinado por "Satoshi Nakamoto" — pseudônimo cuja identidade real continua desconhecida.',
    carreira: 'Desenvolvedor(a) blockchain, auditor(a) de contratos inteligentes, arquiteto(a) de soluções descentralizadas.',
    referencias: [
      { titulo: 'Bitcoin: A Peer-to-Peer Electronic Cash System', fonte: 'Satoshi Nakamoto (2008)', tipo: 'artigo', idioma: 'en', url: 'https://bitcoin.org/bitcoin.pdf' },
      { titulo: 'Documentação para desenvolvedores Ethereum', fonte: 'ethereum.org', tipo: 'documentacao', idioma: 'pt', url: 'https://ethereum.org/pt-br/developers/docs/' },
      { titulo: 'O que é blockchain?', fonte: 'AWS', tipo: 'artigo', idioma: 'pt', url: 'https://aws.amazon.com/pt/what-is/blockchain/' },
      { titulo: 'O que é blockchain?', fonte: 'IBM', tipo: 'artigo', idioma: 'pt', url: 'https://www.ibm.com/br-pt/think/topics/blockchain' }
    ],
    relacionados: ['criptografia', 'banco-de-dados', 'redes'],
    tags: ['blockchain', 'bitcoin', 'ethereum', 'cripto', 'contrato inteligente', 'consenso', 'web3'],
    devtoTag: 'blockchain',
    quiz: [
      { pergunta: 'O que liga um bloco ao anterior na blockchain?', alternativas: ['O nome do usuário', 'O hash do bloco anterior', 'A data de criação', 'Um e-mail'], correta: 1, explicacao: 'Essa ligação por hashes torna qualquer alteração facilmente detectável.' },
      { pergunta: 'Qual mecanismo de consenso consome menos energia?', alternativas: ['Proof of Work', 'Proof of Stake', 'Mineração por GPU', 'Nenhum'], correta: 1, explicacao: 'O Proof of Stake não depende de corrida computacional; por isso gasta muito menos energia.' },
      { pergunta: 'Quando um banco de dados tradicional costuma ser melhor que uma blockchain?', alternativas: ['Quando há uma entidade confiável para manter o registro', 'Nunca', 'Quando ninguém confia em ninguém', 'Quando os dados precisam ser públicos e imutáveis'], correta: 0, explicacao: 'Se existe uma autoridade confiável, a descentralização traz custo sem benefício.' }
    ]
  },
  {
    id: 'computacao-quantica',
    titulo: 'Computação Quântica',
    categoria: 'tendencias',
    nivel: 'avancado',
    tempoLeitura: 6,
    resumo: 'Qubits, superposição e emaranhamento: um novo tipo de computador para problemas que os clássicos não resolvem bem.',
    pincelada: [
      'Computadores clássicos usam bits, que valem 0 ou 1. Computadores quânticos usam qubits, que podem estar numa superposição de 0 e 1 ao mesmo tempo, até serem medidos. Com o emaranhamento, o estado de um qubit fica correlacionado ao de outro, mesmo à distância. Algoritmos quânticos exploram esses fenômenos para fazer as respostas certas "ganharem força" e as erradas se cancelarem, por interferência.',
      'Eles não são simplesmente computadores mais rápidos: são melhores em problemas específicos, como simular moléculas para criar remédios e materiais, otimização e certos problemas matemáticos. O algoritmo de Shor, por exemplo, poderia quebrar a criptografia RSA — daí a corrida pela criptografia pós-quântica.',
      'A tecnologia ainda é experimental: os qubits são muito sensíveis a ruído (decoerência) e precisam, em muitos casos, de temperaturas próximas do zero absoluto. Mesmo assim, já dá para programar computadores quânticos reais pela nuvem, gratuitamente, usando bibliotecas como o Qiskit.'
    ],
    conceitosChave: [
      { termo: 'Qubit', definicao: 'Unidade de informação quântica, que pode estar em superposição de 0 e 1.' },
      { termo: 'Superposição', definicao: 'Estado em que o qubit combina 0 e 1 até ser medido.' },
      { termo: 'Emaranhamento', definicao: 'Correlação forte entre qubits, de modo que o estado de um depende do outro.' },
      { termo: 'Decoerência', definicao: 'Perda do estado quântico por interferência do ambiente.' },
      { termo: 'Algoritmo de Shor', definicao: 'Algoritmo quântico que fatora números grandes, ameaçando o RSA.' }
    ],
    tecnologiasFundamentais: [
      { nome: 'Qiskit', descricao: 'SDK open source da IBM para programar computadores quânticos.', url: 'https://www.ibm.com/quantum/qiskit' },
      { nome: 'Cirq', descricao: 'Biblioteca do Google para circuitos quânticos.', url: 'https://quantumai.google/cirq' },
      { nome: 'Amazon Braket', descricao: 'Acesso a hardware quântico de vários fabricantes na nuvem.', url: 'https://aws.amazon.com/pt/braket/' }
    ],
    curiosidade: 'Richard Feynman sugeriu, em 1981, que para simular a natureza seria preciso um computador que funcionasse segundo as regras da mecânica quântica.',
    carreira: 'Pesquisador(a) em computação quântica, desenvolvedor(a) de algoritmos quânticos, especialista em criptografia pós-quântica.',
    referencias: [
      { titulo: 'IBM Quantum Learning — cursos gratuitos', fonte: 'IBM', tipo: 'curso', idioma: 'en', url: 'https://learning.quantum.ibm.com/' },
      { titulo: 'Quantum Country — introdução interativa', fonte: 'Andy Matuschak e Michael Nielsen', tipo: 'livro', idioma: 'en', url: 'https://quantum.country/' },
      { titulo: 'O que é computação quântica?', fonte: 'AWS', tipo: 'artigo', idioma: 'pt', url: 'https://aws.amazon.com/pt/what-is/quantum-computing/' },
      { titulo: 'Post-Quantum Cryptography', fonte: 'NIST', tipo: 'documentacao', idioma: 'en', url: 'https://csrc.nist.gov/projects/post-quantum-cryptography' },
      { titulo: 'IEEE Spectrum — computação', fonte: 'IEEE', tipo: 'revista', idioma: 'en', url: 'https://spectrum.ieee.org/' }
    ],
    relacionados: ['criptografia', 'hardware', 'machine-learning'],
    tags: ['quântica', 'qubit', 'superposição', 'emaranhamento', 'qiskit', 'shor', 'pós-quântica'],
    devtoTag: 'quantum',
    quiz: [
      { pergunta: 'O que diferencia um qubit de um bit clássico?', alternativas: ['Ele é maior fisicamente', 'Ele pode estar em superposição de 0 e 1', 'Ele só armazena o valor 1', 'Ele é mais barato'], correta: 1, explicacao: 'A superposição é uma das propriedades exploradas pelos algoritmos quânticos.' },
      { pergunta: 'Qual algoritmo quântico ameaça a criptografia RSA?', alternativas: ['Dijkstra', 'Shor', 'Quicksort', 'PageRank'], correta: 1, explicacao: 'O algoritmo de Shor fatora números grandes de forma eficiente num computador quântico suficientemente grande.' },
      { pergunta: 'A perda do estado quântico por interferência do ambiente chama-se:', alternativas: ['Decoerência', 'Compilação', 'Latência', 'Overfitting'], correta: 0, explicacao: 'Controlar a decoerência é um dos maiores desafios da área.' }
    ]
  },
  {
    id: 'governanca',
    titulo: 'Governança de TI (ITIL e COBIT)',
    categoria: 'tendencias',
    nivel: 'intermediario',
    tempoLeitura: 5,
    resumo: 'Alinhar a TI aos objetivos do negócio: gerenciar serviços, riscos e investimentos com frameworks reconhecidos.',
    pincelada: [
      'Governança de TI garante que a tecnologia gere valor para a organização, com riscos controlados e recursos bem usados. Ela responde a perguntas como: estamos investindo nos projetos certos? Quem decide? Como medimos se a TI está entregando o que o negócio precisa?',
      'O COBIT é um framework de governança e gestão que define objetivos, processos e indicadores para a TI corporativa, sendo muito usado em auditorias. O ITIL foca no gerenciamento de serviços de TI: como tratar incidentes, requisições, mudanças e problemas, e como manter um catálogo de serviços e acordos de nível de serviço (SLAs).',
      'No dia a dia, isso aparece como a central de serviços (service desk) que abre chamados, o processo de mudança que evita alterações arriscadas em produção e a gestão de problemas, que busca a causa raiz de incidentes repetidos. Outros padrões importantes são a ISO/IEC 27001 (segurança da informação) e a ISO/IEC 20000 (gestão de serviços).'
    ],
    conceitosChave: [
      { termo: 'Governança x gestão', definicao: 'A governança define direção e controle; a gestão planeja e executa.' },
      { termo: 'ITIL', definicao: 'Conjunto de boas práticas para o gerenciamento de serviços de TI.' },
      { termo: 'COBIT', definicao: 'Framework de governança e gestão de TI corporativa da ISACA.' },
      { termo: 'Incidente x problema', definicao: 'Incidente é uma interrupção; problema é a causa raiz de um ou mais incidentes.' },
      { termo: 'SLA', definicao: 'Acordo de nível de serviço, com metas como tempo de atendimento.' }
    ],
    tecnologiasFundamentais: [
      { nome: 'ITIL 4', descricao: 'Framework de gerenciamento de serviços mantido pela PeopleCert/Axelos.', url: 'https://www.axelos.com/certifications/itil-service-management' },
      { nome: 'COBIT', descricao: 'Framework de governança de TI da ISACA.', url: 'https://www.isaca.org/resources/cobit' },
      { nome: 'ISO/IEC 27001', descricao: 'Norma de sistemas de gestão de segurança da informação.', url: 'https://www.iso.org/standard/27001' }
    ],
    curiosidade: 'O ITIL nasceu nos anos 1980, criado por uma agência do governo britânico para padronizar a forma como os órgãos públicos gerenciavam seus serviços de TI.',
    carreira: 'Gestor(a) de TI, analista de governança, auditor(a) de TI, gerente de serviços. Certificações: ITIL 4 Foundation, COBIT Foundation, ISO 27001 Lead Implementer.',
    referencias: [
      { titulo: 'COBIT', fonte: 'ISACA', tipo: 'documentacao', idioma: 'en', url: 'https://www.isaca.org/resources/cobit' },
      { titulo: 'ITIL 4 — gerenciamento de serviços', fonte: 'Axelos / PeopleCert', tipo: 'curso', idioma: 'en', url: 'https://www.axelos.com/certifications/itil-service-management' },
      { titulo: 'ISO/IEC 27001 — Information security management', fonte: 'ISO', tipo: 'documentacao', idioma: 'en', url: 'https://www.iso.org/standard/27001' },
      { titulo: 'O que é ITSM?', fonte: 'Atlassian', tipo: 'artigo', idioma: 'pt', url: 'https://www.atlassian.com/br/itsm' }
    ],
    relacionados: ['lgpd', 'devops', 'ciberseguranca'],
    tags: ['itil', 'cobit', 'governança', 'gestão', 'sla', 'iso 27001', 'service desk', 'itsm'],
    devtoTag: 'management',
    quiz: [
      { pergunta: 'Qual framework é focado em gerenciamento de SERVIÇOS de TI?', alternativas: ['COBIT', 'ITIL', 'Scrum', 'OWASP'], correta: 1, explicacao: 'O ITIL descreve práticas como gestão de incidentes, mudanças e problemas.' },
      { pergunta: 'Qual a diferença entre incidente e problema no ITIL?', alternativas: ['São sinônimos', 'O problema é a causa raiz de um ou mais incidentes', 'O incidente é sempre mais grave', 'O problema só ocorre em hardware'], correta: 1, explicacao: 'O incidente é tratado para restaurar o serviço; o problema é investigado para evitar a repetição.' },
      { pergunta: 'A norma ISO/IEC 27001 trata de:', alternativas: ['Qualidade de café', 'Gestão de segurança da informação', 'Programação em Java', 'Design de interfaces'], correta: 1, explicacao: 'Ela define requisitos para um sistema de gestão de segurança da informação (SGSI).' }
    ]
  }
];
