/**
 * Pílulas da categoria Infraestrutura.
 * @type {import('../topics.js').Topic[]}
 */
export default [
  {
    id: 'redes',
    titulo: 'Redes de Computadores',
    categoria: 'infraestrutura',
    nivel: 'iniciante',
    tempoLeitura: 5,
    resumo: 'Como dispositivos conversam entre si: endereços, pacotes, roteadores e as regras que fazem a internet funcionar.',
    pincelada: [
      'Uma rede de computadores é um conjunto de dispositivos interligados que trocam dados. Pense no sistema dos Correios: cada casa tem um endereço (o endereço IP), as cartas são divididas em envelopes menores (os pacotes) e os centros de distribuição decidem o melhor caminho (os roteadores).',
      'As redes são classificadas pelo alcance: LAN (a rede da sua casa ou do laboratório), MAN (uma cidade) e WAN (que liga cidades e países — a internet é a maior WAN do mundo). Elas podem usar cabos de cobre, fibra óptica ou ondas de rádio, como o Wi-Fi e o 5G.',
      'Para que equipamentos de fabricantes diferentes se entendam, existem protocolos: acordos sobre o formato e a ordem das mensagens. É graças a eles que um celular Android consegue abrir um site hospedado num servidor Linux do outro lado do planeta.'
    ],
    conceitosChave: [
      { termo: 'Endereço IP', definicao: 'Identificador numérico de um dispositivo na rede (IPv4, como 192.168.0.10, ou IPv6).' },
      { termo: 'Roteador', definicao: 'Equipamento que encaminha pacotes entre redes diferentes, escolhendo o caminho.' },
      { termo: 'Switch', definicao: 'Equipamento que conecta dispositivos dentro da mesma rede local usando endereços MAC.' },
      { termo: 'DNS', definicao: 'Sistema que traduz nomes (exemplo.com) em endereços IP — a "agenda telefônica" da internet.' },
      { termo: 'Largura de banda', definicao: 'Quantidade máxima de dados que pode trafegar por segundo em uma conexão.' },
      { termo: 'Latência', definicao: 'Tempo que um pacote leva para ir de um ponto a outro, medido em milissegundos.' }
    ],
    tecnologiasFundamentais: [
      { nome: 'Ethernet', descricao: 'Padrão (IEEE 802.3) das redes locais cabeadas.', url: 'https://www.ieee802.org/3/' },
      { nome: 'Wi-Fi', descricao: 'Família de padrões IEEE 802.11 para redes sem fio.', url: 'https://www.wi-fi.org/' },
      { nome: 'DNS', descricao: 'Resolução de nomes de domínio em endereços IP.', url: 'https://www.cloudflare.com/learning/dns/what-is-dns/' },
      { nome: 'Wireshark', descricao: 'Ferramenta gratuita para capturar e analisar o tráfego de rede.', url: 'https://www.wireshark.org/' }
    ],
    curiosidade: 'A primeira mensagem enviada pela ARPANET, em 1969, era para ser "LOGIN", mas o sistema travou depois de "LO". Sem querer, a primeira mensagem da história das redes foi um "Lo" — como em "Lo and behold".',
    carreira: 'Analista de redes, administrador(a) de redes, engenheiro(a) de telecomunicações. Certificações: Cisco CCNA, CompTIA Network+.',
    referencias: [
      { titulo: 'Cisco Networking Academy — cursos gratuitos de redes', fonte: 'Cisco', tipo: 'curso', idioma: 'pt', url: 'https://www.netacad.com/' },
      { titulo: 'Computer Networking: A Top-Down Approach (Kurose & Ross)', fonte: 'UMass Amherst', tipo: 'livro', idioma: 'en', url: 'https://gaia.cs.umass.edu/kurose_ross/index.php' },
      { titulo: 'O que é DNS?', fonte: 'Cloudflare Learning Center', tipo: 'artigo', idioma: 'en', url: 'https://www.cloudflare.com/learning/dns/what-is-dns/' },
      { titulo: 'RFC Editor — os documentos que definem os protocolos da internet', fonte: 'IETF', tipo: 'documentacao', idioma: 'en', url: 'https://www.rfc-editor.org/' },
      { titulo: 'IEEE Spectrum — notícias sobre telecomunicações', fonte: 'IEEE', tipo: 'revista', idioma: 'en', url: 'https://spectrum.ieee.org/' }
    ],
    relacionados: ['tcp-ip', 'topologia', 'ciberseguranca'],
    tags: ['lan', 'wan', 'ip', 'roteador', 'switch', 'wifi', 'internet'],
    devtoTag: 'networking',
    quiz: [
      { pergunta: 'Qual equipamento encaminha pacotes ENTRE redes diferentes?', alternativas: ['Switch', 'Roteador', 'Hub', 'Repetidor'], correta: 1, explicacao: 'O roteador conecta redes distintas e decide o caminho dos pacotes. O switch atua dentro da mesma rede local.' },
      { pergunta: 'O que o DNS faz?', alternativas: ['Criptografa a conexão', 'Atribui endereços MAC', 'Traduz nomes de domínio em endereços IP', 'Aumenta a largura de banda'], correta: 2, explicacao: 'O DNS funciona como uma agenda: transforma nomes legíveis em endereços IP.' },
      { pergunta: 'A rede de um laboratório da faculdade é um exemplo de:', alternativas: ['WAN', 'MAN', 'LAN', 'PAN'], correta: 2, explicacao: 'LAN (Local Area Network) cobre uma área pequena, como uma sala, uma casa ou um prédio.' }
    ]
  },
  {
    id: 'topologia',
    titulo: 'Infraestrutura e Topologia de Redes',
    categoria: 'infraestrutura',
    nivel: 'intermediario',
    tempoLeitura: 6,
    resumo: 'Como os equipamentos são organizados fisicamente e logicamente: estrela, malha, camadas e cabeamento estruturado.',
    pincelada: [
      'Topologia é o "desenho" de uma rede: como os nós estão ligados entre si. Na topologia em estrela, todos se conectam a um ponto central (um switch). Ela é a mais comum hoje porque, se um cabo falha, só um dispositivo fica fora do ar. Na topologia em malha, há vários caminhos entre os nós, o que garante redundância, mas custa mais caro.',
      'É importante separar a topologia física (por onde passam os cabos) da topologia lógica (como os dados realmente circulam). Uma rede pode ser fisicamente em estrela e logicamente dividida em várias VLANs, como se fossem redes separadas.',
      'Em empresas, a infraestrutura costuma seguir um modelo em camadas — núcleo (core), distribuição e acesso — e um cabeamento estruturado padronizado, com racks, patch panels e documentação. Uma boa topologia facilita a manutenção, a segurança e o crescimento da rede.'
    ],
    conceitosChave: [
      { termo: 'Topologia em estrela', definicao: 'Todos os dispositivos ligados a um nó central; fácil de gerenciar e isolar falhas.' },
      { termo: 'Topologia em malha', definicao: 'Múltiplas conexões entre os nós, garantindo caminhos alternativos (redundância).' },
      { termo: 'VLAN', definicao: 'Rede local virtual: segmenta logicamente uma rede física em várias redes isoladas.' },
      { termo: 'Modelo hierárquico', definicao: 'Organização em camadas de núcleo, distribuição e acesso, comum em redes corporativas.' },
      { termo: 'Cabeamento estruturado', definicao: 'Padrão de instalação de cabos, racks e tomadas que organiza e documenta a rede física.' }
    ],
    tecnologiasFundamentais: [
      { nome: 'Cisco Packet Tracer', descricao: 'Simulador gratuito para desenhar e testar topologias.', url: 'https://www.netacad.com/cisco-packet-tracer' },
      { nome: 'IEEE 802.1Q', descricao: 'Padrão que define as VLANs e a marcação (tagging) de quadros.', url: 'https://www.ieee802.org/1/' },
      { nome: 'Fibra óptica', descricao: 'Meio físico de alta velocidade, usado em backbones e longas distâncias.', url: 'https://en.wikipedia.org/wiki/Optical_fiber' }
    ],
    curiosidade: 'Os cabos submarinos transportam mais de 95% do tráfego internacional da internet. Alguns têm mais de 6 mil km e ficam no fundo do oceano, a milhares de metros de profundidade.',
    carreira: 'Projetista de redes, técnico(a) de infraestrutura, analista de data center. Certificações: Cisco CCNA/CCNP, BICSI.',
    referencias: [
      { titulo: 'Cisco Packet Tracer — download e curso introdutório', fonte: 'Cisco Networking Academy', tipo: 'curso', idioma: 'pt', url: 'https://www.netacad.com/cisco-packet-tracer' },
      { titulo: 'O que é uma LAN?', fonte: 'Cloudflare Learning Center', tipo: 'artigo', idioma: 'en', url: 'https://www.cloudflare.com/learning/network-layer/what-is-a-lan/' },
      { titulo: 'Submarine Cable Map — mapa dos cabos submarinos', fonte: 'TeleGeography', tipo: 'artigo', idioma: 'en', url: 'https://www.submarinecablemap.com/' },
      { titulo: 'Computer Networking: A Top-Down Approach', fonte: 'Kurose & Ross', tipo: 'livro', idioma: 'en', url: 'https://gaia.cs.umass.edu/kurose_ross/index.php' }
    ],
    relacionados: ['redes', 'tcp-ip', 'nuvem'],
    tags: ['estrela', 'malha', 'vlan', 'cabeamento', 'rack', 'core', 'switch'],
    devtoTag: 'networking',
    quiz: [
      { pergunta: 'Qual a principal vantagem da topologia em malha?', alternativas: ['Menor custo', 'Redundância de caminhos', 'Menos cabos', 'Não precisa de configuração'], correta: 1, explicacao: 'Na malha existem várias rotas entre os nós; se uma falha, o tráfego segue por outra.' },
      { pergunta: 'Uma VLAN serve para:', alternativas: ['Aumentar a velocidade do Wi-Fi', 'Segmentar logicamente uma rede física', 'Substituir o roteador', 'Criptografar os cabos'], correta: 1, explicacao: 'VLANs dividem uma mesma infraestrutura física em redes lógicas isoladas, por exemplo, uma para alunos e outra para a administração.' },
      { pergunta: 'No modelo hierárquico, os computadores dos usuários se conectam na camada de:', alternativas: ['Núcleo', 'Distribuição', 'Acesso', 'Aplicação'], correta: 2, explicacao: 'A camada de acesso é a porta de entrada dos dispositivos finais.' }
    ]
  },
  {
    id: 'tcp-ip',
    titulo: 'Protocolos TCP/IP e Modelo OSI',
    categoria: 'infraestrutura',
    nivel: 'intermediario',
    tempoLeitura: 6,
    resumo: 'As camadas que organizam a comunicação em rede, do cabo até o navegador, e por que TCP e UDP existem.',
    pincelada: [
      'Para lidar com a complexidade das redes, a comunicação é dividida em camadas, cada uma com uma responsabilidade. O modelo OSI tem 7 camadas (física, enlace, rede, transporte, sessão, apresentação e aplicação) e é usado principalmente para ensinar e diagnosticar problemas.',
      'Na prática, a internet usa a pilha TCP/IP, com 4 camadas: acesso à rede, internet (IP), transporte (TCP/UDP) e aplicação (HTTP, DNS, SMTP...). Cada camada "embrulha" os dados da camada de cima, como uma carta colocada dentro de envelopes cada vez maiores.',
      'Na camada de transporte, o TCP garante a entrega na ordem certa e reenvia o que se perdeu — ideal para páginas web e e-mails. O UDP é mais leve e rápido, mas não garante a entrega — ótimo para chamadas de vídeo e jogos online, nos quais um atraso é pior do que perder um pacote.'
    ],
    conceitosChave: [
      { termo: 'Modelo OSI', definicao: 'Modelo de referência com 7 camadas para descrever a comunicação em rede.' },
      { termo: 'TCP', definicao: 'Protocolo de transporte orientado a conexão, com entrega confiável e ordenada.' },
      { termo: 'UDP', definicao: 'Protocolo de transporte sem conexão, rápido e sem garantia de entrega.' },
      { termo: 'Encapsulamento', definicao: 'Cada camada adiciona seu cabeçalho aos dados antes de passá-los adiante.' },
      { termo: 'Porta', definicao: 'Número que identifica um serviço em um host (ex.: 443 para HTTPS).' },
      { termo: 'Three-way handshake', definicao: 'Troca SYN, SYN-ACK, ACK que estabelece uma conexão TCP.' }
    ],
    tecnologiasFundamentais: [
      { nome: 'IPv6', descricao: 'Nova versão do IP, com 128 bits de endereço.', url: 'https://www.rfc-editor.org/rfc/rfc8200' },
      { nome: 'HTTP', descricao: 'Protocolo de aplicação da Web.', url: 'https://developer.mozilla.org/pt-BR/docs/Web/HTTP' },
      { nome: 'TCP', descricao: 'Especificação atual do protocolo TCP.', url: 'https://www.rfc-editor.org/rfc/rfc9293' }
    ],
    curiosidade: 'Os endereços IPv4 (cerca de 4,3 bilhões) se esgotaram nos registros regionais na década de 2010. O IPv6 tem endereços suficientes para dar trilhões a cada pessoa do planeta.',
    carreira: 'Analista de redes, engenheiro(a) de suporte N2/N3, analista de NOC. Certificações: CompTIA Network+, Cisco CCNA.',
    referencias: [
      { titulo: 'O que é o modelo OSI?', fonte: 'Cloudflare Learning Center', tipo: 'artigo', idioma: 'en', url: 'https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/' },
      { titulo: 'O que é TCP/IP?', fonte: 'Cloudflare Learning Center', tipo: 'artigo', idioma: 'en', url: 'https://www.cloudflare.com/learning/ddos/glossary/tcp-ip/' },
      { titulo: 'Visão geral do HTTP', fonte: 'MDN Web Docs', tipo: 'documentacao', idioma: 'pt', url: 'https://developer.mozilla.org/pt-BR/docs/Web/HTTP' },
      { titulo: 'RFC 9293 — Transmission Control Protocol', fonte: 'IETF', tipo: 'documentacao', idioma: 'en', url: 'https://www.rfc-editor.org/rfc/rfc9293' }
    ],
    relacionados: ['redes', 'apis-rest', 'ciberseguranca'],
    tags: ['osi', 'tcp', 'udp', 'ip', 'ipv6', 'http', 'camadas', 'porta'],
    devtoTag: 'networking',
    quiz: [
      { pergunta: 'Qual protocolo é mais indicado para uma chamada de vídeo em tempo real?', alternativas: ['TCP', 'UDP', 'FTP', 'SMTP'], correta: 1, explicacao: 'O UDP evita a espera por retransmissões; em tempo real, perder um quadro é melhor do que atrasar a conversa.' },
      { pergunta: 'Quantas camadas tem o modelo OSI?', alternativas: ['4', '5', '7', '9'], correta: 2, explicacao: 'Física, enlace, rede, transporte, sessão, apresentação e aplicação.' },
      { pergunta: 'Qual porta é usada por padrão pelo HTTPS?', alternativas: ['21', '80', '443', '3306'], correta: 2, explicacao: 'O HTTPS usa a porta 443; o HTTP sem criptografia usa a 80.' }
    ]
  },
  {
    id: 'hardware',
    titulo: 'Hardware e Arquitetura de Computadores',
    categoria: 'infraestrutura',
    nivel: 'iniciante',
    tempoLeitura: 5,
    resumo: 'CPU, memória, armazenamento e barramentos: o que acontece dentro da máquina quando um programa roda.',
    pincelada: [
      'Quase todo computador moderno segue a arquitetura de Von Neumann: uma unidade de processamento (CPU), uma memória que guarda dados e instruções, e dispositivos de entrada e saída, todos ligados por barramentos.',
      'A CPU executa um ciclo contínuo: busca uma instrução na memória, decodifica e executa. Como a memória principal (RAM) é bem mais lenta que a CPU, existem os caches (L1, L2, L3), memórias pequenas e muito rápidas que ficam dentro do processador. É uma hierarquia: quanto mais rápida a memória, menor e mais cara ela é.',
      'Hoje, a computação também depende de processadores especializados: GPUs, com milhares de núcleos simples (essenciais para gráficos e IA), e chips ARM, que equilibram desempenho e baixo consumo, presentes em celulares e em notebooks recentes.'
    ],
    conceitosChave: [
      { termo: 'CPU', definicao: 'Unidade central de processamento, que executa as instruções dos programas.' },
      { termo: 'Memória RAM', definicao: 'Memória volátil de trabalho, rápida, que perde os dados ao desligar.' },
      { termo: 'Cache', definicao: 'Memória muito rápida dentro da CPU que guarda os dados usados com mais frequência.' },
      { termo: 'SSD', definicao: 'Armazenamento não volátil baseado em memória flash, muito mais rápido que o HD mecânico.' },
      { termo: 'GPU', definicao: 'Processador com muitos núcleos para cálculos em paralelo (gráficos, IA).' },
      { termo: 'ISA', definicao: 'Conjunto de instruções que a CPU entende, como x86-64 ou ARM.' }
    ],
    tecnologiasFundamentais: [
      { nome: 'x86-64', descricao: 'Arquitetura dominante em PCs e servidores (Intel e AMD).', url: 'https://en.wikipedia.org/wiki/X86-64' },
      { nome: 'ARM', descricao: 'Arquitetura eficiente usada em celulares, notebooks e servidores em nuvem.', url: 'https://www.arm.com/architecture' },
      { nome: 'RISC-V', descricao: 'Arquitetura de conjunto de instruções aberta e gratuita.', url: 'https://riscv.org/' },
      { nome: 'NVMe', descricao: 'Protocolo de alta velocidade para SSDs conectados via PCIe.', url: 'https://nvmexpress.org/' }
    ],
    curiosidade: 'A Lei de Moore, de 1965, previu que o número de transistores num chip dobraria a cada cerca de dois anos. Processadores atuais têm dezenas de bilhões de transistores.',
    carreira: 'Técnico(a) de suporte e manutenção, engenheiro(a) de hardware, especialista em sistemas embarcados. Certificação: CompTIA A+.',
    referencias: [
      { titulo: 'Nand2Tetris — construa um computador do zero', fonte: 'Nand2Tetris', tipo: 'curso', idioma: 'en', url: 'https://www.nand2tetris.org/' },
      { titulo: 'MIT OpenCourseWare — cursos de arquitetura de computadores', fonte: 'MIT', tipo: 'curso', idioma: 'en', url: 'https://ocw.mit.edu/' },
      { titulo: 'Especificação aberta RISC-V', fonte: 'RISC-V International', tipo: 'documentacao', idioma: 'en', url: 'https://riscv.org/' },
      { titulo: 'IEEE Spectrum — semicondutores e computação', fonte: 'IEEE', tipo: 'revista', idioma: 'en', url: 'https://spectrum.ieee.org/' }
    ],
    relacionados: ['sistemas-operacionais', 'virtualizacao', 'computacao-quantica'],
    tags: ['cpu', 'ram', 'gpu', 'ssd', 'cache', 'arm', 'processador', 'von neumann'],
    devtoTag: 'hardware',
    quiz: [
      { pergunta: 'Por que existe memória cache na CPU?', alternativas: ['Para guardar arquivos permanentemente', 'Para reduzir o tempo de acesso aos dados mais usados', 'Para substituir a RAM', 'Para resfriar o processador'], correta: 1, explicacao: 'O cache é pequeno, mas muito rápido; ele evita que a CPU espere pela RAM, que é mais lenta.' },
      { pergunta: 'Qual componente é mais indicado para treinar redes neurais?', alternativas: ['HD mecânico', 'GPU', 'Placa de som', 'Fonte'], correta: 1, explicacao: 'GPUs fazem milhares de operações em paralelo, ideais para os cálculos matriciais da IA.' },
      { pergunta: 'A memória RAM é:', alternativas: ['Volátil', 'Somente leitura', 'Mais lenta que o HD', 'Um tipo de processador'], correta: 0, explicacao: 'A RAM perde seu conteúdo quando o computador é desligado.' }
    ]
  }
];
