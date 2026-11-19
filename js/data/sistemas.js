/**
 * Pílulas da categoria Sistemas.
 * @type {import('../topics.js').Topic[]}
 */
export default [
  {
    id: 'sistemas-operacionais',
    titulo: 'Sistemas Operacionais',
    categoria: 'sistemas',
    nivel: 'iniciante',
    tempoLeitura: 5,
    resumo: 'O software que gerencia o hardware e serve de ponte entre os programas e a máquina: processos, memória e arquivos.',
    pincelada: [
      'O sistema operacional (SO) é o gerente do computador. Ele decide qual programa usa a CPU a cada instante, quanto de memória cada um recebe, como os arquivos são guardados no disco e como os dispositivos (teclado, rede, impressora) são acessados. Sem ele, cada programa teria de saber controlar o hardware sozinho.',
      'O coração do SO é o kernel, que roda com privilégios máximos. Os programas comuns rodam em "modo usuário" e pedem serviços ao kernel por meio de chamadas de sistema (syscalls) — como clientes que fazem pedidos no balcão, sem entrar na cozinha.',
      'Os SOs mais conhecidos são o Windows, o macOS, o Linux (servidores, nuvem e Android) e o iOS. Apesar das diferenças, todos resolvem os mesmos problemas: escalonamento de processos, memória virtual, sistemas de arquivos e segurança.'
    ],
    conceitosChave: [
      { termo: 'Kernel', definicao: 'Núcleo do sistema operacional, com acesso total ao hardware.' },
      { termo: 'Processo', definicao: 'Programa em execução, com memória e recursos próprios.' },
      { termo: 'Thread', definicao: 'Linha de execução dentro de um processo; várias threads compartilham a mesma memória.' },
      { termo: 'Escalonador', definicao: 'Parte do SO que decide qual processo usa a CPU e por quanto tempo.' },
      { termo: 'Memória virtual', definicao: 'Técnica que dá a cada processo a ilusão de ter uma memória própria e contínua.' },
      { termo: 'Chamada de sistema', definicao: 'Pedido de um programa ao kernel, como abrir um arquivo ou enviar dados pela rede.' }
    ],
    tecnologiasFundamentais: [
      { nome: 'Linux', descricao: 'Kernel open source usado em servidores, nuvem, Android e supercomputadores.', url: 'https://www.kernel.org/' },
      { nome: 'Windows', descricao: 'SO da Microsoft, dominante em desktops corporativos.', url: 'https://learn.microsoft.com/pt-br/windows/' },
      { nome: 'macOS / iOS', descricao: 'SOs da Apple, baseados no núcleo Darwin (derivado do Unix).', url: 'https://developer.apple.com/documentation/' }
    ],
    curiosidade: 'Todos os 500 supercomputadores mais rápidos do mundo, listados no TOP500, rodam Linux desde 2017.',
    carreira: 'Administrador(a) de sistemas, analista de suporte, desenvolvedor(a) de sistemas embarcados. Certificações: CompTIA A+, LPIC-1, Microsoft.',
    referencias: [
      { titulo: 'Operating Systems: Three Easy Pieces (livro gratuito)', fonte: 'Remzi e Andrea Arpaci-Dusseau', tipo: 'livro', idioma: 'en', url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/' },
      { titulo: 'The Linux Kernel Archives', fonte: 'kernel.org', tipo: 'documentacao', idioma: 'en', url: 'https://www.kernel.org/' },
      { titulo: 'TOP500 — os supercomputadores mais rápidos', fonte: 'TOP500', tipo: 'artigo', idioma: 'en', url: 'https://www.top500.org/' },
      { titulo: 'Documentação do Windows', fonte: 'Microsoft Learn', tipo: 'documentacao', idioma: 'pt', url: 'https://learn.microsoft.com/pt-br/windows/' }
    ],
    relacionados: ['linux', 'hardware', 'virtualizacao'],
    tags: ['kernel', 'processo', 'thread', 'memória', 'windows', 'linux', 'macos', 'so'],
    devtoTag: 'linux',
    quiz: [
      { pergunta: 'Qual parte do SO tem acesso total ao hardware?', alternativas: ['Shell', 'Kernel', 'Navegador', 'Driver de impressora'], correta: 1, explicacao: 'O kernel roda em modo privilegiado; os programas comuns pedem serviços a ele.' },
      { pergunta: 'Um programa em execução é chamado de:', alternativas: ['Arquivo', 'Processo', 'Pacote', 'Socket'], correta: 1, explicacao: 'O processo é o programa "vivo", com memória e estado próprios.' },
      { pergunta: 'Quem decide qual processo usa a CPU a cada momento?', alternativas: ['O escalonador', 'O compilador', 'O BIOS', 'O usuário'], correta: 0, explicacao: 'O escalonador alterna os processos tão rápido que parece que tudo roda ao mesmo tempo.' }
    ]
  },
  {
    id: 'linux',
    titulo: 'Linux e Linha de Comando',
    categoria: 'sistemas',
    nivel: 'iniciante',
    tempoLeitura: 6,
    resumo: 'O sistema que move a internet e o terminal que dá superpoderes a quem trabalha com TI.',
    pincelada: [
      'O Linux é um kernel open source criado por Linus Torvalds em 1991. Combinado com ferramentas do projeto GNU, ele forma as distribuições (distros), como Ubuntu, Debian, Fedora e Red Hat Enterprise Linux. A maior parte dos servidores web, a nuvem e o Android rodam sobre ele.',
      'A linha de comando (o terminal, com um shell como o Bash) parece intimidadora, mas é muito eficiente: com poucos comandos você navega por pastas (cd, ls), manipula arquivos (cp, mv, rm), procura textos (grep) e automatiza tarefas com scripts. Em servidores remotos, muitas vezes ela é a única interface disponível.',
      'A filosofia Unix diz: "faça uma coisa e faça bem". Pequenos programas são combinados com o pipe (|), como peças de LEGO: "cat log.txt | grep erro | wc -l" conta quantas linhas de um log contêm a palavra "erro".'
    ],
    conceitosChave: [
      { termo: 'Distribuição', definicao: 'Pacote completo com kernel Linux, ferramentas e gerenciador de pacotes (Ubuntu, Fedora...).' },
      { termo: 'Shell', definicao: 'Interpretador de comandos, como Bash ou Zsh.' },
      { termo: 'Permissões', definicao: 'Regras de leitura (r), escrita (w) e execução (x) para dono, grupo e outros.' },
      { termo: 'Pipe (|)', definicao: 'Liga a saída de um comando à entrada de outro.' },
      { termo: 'sudo', definicao: 'Executa um comando com privilégios de administrador (root).' },
      { termo: 'Gerenciador de pacotes', definicao: 'Instala e atualiza programas (apt, dnf, pacman).' }
    ],
    tecnologiasFundamentais: [
      { nome: 'Ubuntu', descricao: 'Distro popular, ótima para começar.', url: 'https://ubuntu.com/' },
      { nome: 'Bash', descricao: 'Shell padrão da maioria das distribuições.', url: 'https://www.gnu.org/software/bash/' },
      { nome: 'WSL', descricao: 'Subsistema para rodar Linux dentro do Windows.', url: 'https://learn.microsoft.com/pt-br/windows/wsl/' },
      { nome: 'SSH', descricao: 'Acesso remoto seguro a servidores pelo terminal.', url: 'https://www.openssh.com/' }
    ],
    curiosidade: 'Linus Torvalds anunciou o Linux em 1991 dizendo que era "só um hobby, não será grande e profissional". Hoje ele roda em bilhões de dispositivos.',
    carreira: 'SysAdmin, engenheiro(a) DevOps, SRE, analista de segurança. Certificações: LPIC-1, Linux Foundation LFCS, Red Hat RHCSA.',
    referencias: [
      { titulo: 'The Linux Command Line (livro gratuito)', fonte: 'William Shotts', tipo: 'livro', idioma: 'en', url: 'https://linuxcommand.org/tlcl.php' },
      { titulo: 'Linux Journey — aprenda Linux passo a passo', fonte: 'Linux Journey', tipo: 'curso', idioma: 'en', url: 'https://linuxjourney.com/' },
      { titulo: 'O que é Linux?', fonte: 'Red Hat', tipo: 'artigo', idioma: 'pt', url: 'https://www.redhat.com/pt-br/topics/linux/what-is-linux' },
      { titulo: 'Instalar o WSL', fonte: 'Microsoft Learn', tipo: 'documentacao', idioma: 'pt', url: 'https://learn.microsoft.com/pt-br/windows/wsl/install' },
      { titulo: 'OverTheWire: Bandit — jogo para praticar o terminal', fonte: 'OverTheWire', tipo: 'curso', idioma: 'en', url: 'https://overthewire.org/wargames/bandit/' }
    ],
    relacionados: ['sistemas-operacionais', 'containers', 'git'],
    tags: ['bash', 'terminal', 'shell', 'ubuntu', 'distro', 'comandos', 'ssh', 'wsl'],
    devtoTag: 'linux',
    quiz: [
      { pergunta: 'Qual comando lista os arquivos de uma pasta?', alternativas: ['cd', 'ls', 'rm', 'grep'], correta: 1, explicacao: 'ls lista o conteúdo; cd muda de pasta; rm remove; grep procura textos.' },
      { pergunta: 'O que o pipe (|) faz?', alternativas: ['Apaga arquivos', 'Liga a saída de um comando à entrada de outro', 'Dá permissão de root', 'Abre uma nova aba'], correta: 1, explicacao: 'É assim que pequenos comandos se combinam para resolver tarefas maiores.' },
      { pergunta: 'Para executar um comando como administrador, usa-se:', alternativas: ['admin', 'root!', 'sudo', 'chmod'], correta: 2, explicacao: 'sudo ("superuser do") executa o comando com privilégios elevados.' }
    ]
  }
];
