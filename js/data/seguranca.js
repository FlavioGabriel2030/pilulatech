/**
 * Pílulas da categoria Segurança.
 * @type {import('../topics.js').Topic[]}
 */
export default [
  {
    id: 'ciberseguranca',
    titulo: 'Cibersegurança',
    categoria: 'seguranca',
    nivel: 'iniciante',
    tempoLeitura: 6,
    resumo: 'Proteger sistemas, redes e dados contra ataques: a tríade CIA, as principais ameaças e as defesas em camadas.',
    pincelada: [
      'Cibersegurança é o conjunto de práticas que protege informações e sistemas. Ela se apoia na tríade CIA: Confidencialidade (só quem pode vê os dados), Integridade (os dados não são alterados indevidamente) e Disponibilidade (o sistema funciona quando é preciso).',
      'As ameaças mais comuns são o phishing (mensagens falsas que enganam a vítima), o ransomware (que sequestra arquivos e pede resgate), malwares em geral e a exploração de sistemas desatualizados. Muitas vezes, o elo mais fraco é humano — por isso a conscientização é tão importante quanto a tecnologia.',
      'A defesa é feita em camadas, como um castelo com muralhas, fosso e guardas: firewall, antivírus, autenticação multifator (MFA), backups, atualizações e monitoramento. Frameworks como o NIST CSF organizam essa estratégia em funções: Governar, Identificar, Proteger, Detectar, Responder e Recuperar.'
    ],
    conceitosChave: [
      { termo: 'Tríade CIA', definicao: 'Confidencialidade, Integridade e Disponibilidade: os pilares da segurança da informação.' },
      { termo: 'Phishing', definicao: 'Golpe que usa mensagens falsas para roubar senhas ou instalar malware.' },
      { termo: 'Ransomware', definicao: 'Malware que criptografa os arquivos da vítima e exige pagamento.' },
      { termo: 'MFA', definicao: 'Autenticação multifator: exige algo que você sabe, tem ou é.' },
      { termo: 'Vulnerabilidade', definicao: 'Falha que pode ser explorada por um atacante.' },
      { termo: 'Defesa em profundidade', definicao: 'Várias camadas de proteção, para que a falha de uma não comprometa tudo.' }
    ],
    tecnologiasFundamentais: [
      { nome: 'NIST Cybersecurity Framework', descricao: 'Framework de referência para gerir riscos de segurança.', url: 'https://www.nist.gov/cyberframework' },
      { nome: 'MITRE ATT&CK', descricao: 'Base de conhecimento sobre táticas e técnicas de atacantes.', url: 'https://attack.mitre.org/' },
      { nome: 'Wireshark', descricao: 'Análise de tráfego para investigar incidentes.', url: 'https://www.wireshark.org/' },
      { nome: 'Kali Linux', descricao: 'Distribuição Linux com ferramentas para testes de invasão autorizados.', url: 'https://www.kali.org/' }
    ],
    curiosidade: 'O primeiro worm famoso da internet, o Morris Worm (1988), infectou cerca de 10% dos computadores conectados na época — e foi criado por um estudante de pós-graduação.',
    carreira: 'Analista de SOC, pentester, analista de resposta a incidentes, especialista em GRC. Certificações: CompTIA Security+, CEH, ISC2 CC.',
    referencias: [
      { titulo: 'Cartilha de Segurança para Internet', fonte: 'CERT.br', tipo: 'artigo', idioma: 'pt', url: 'https://cartilha.cert.br/' },
      { titulo: 'NIST Cybersecurity Framework (CSF 2.0)', fonte: 'NIST', tipo: 'documentacao', idioma: 'en', url: 'https://www.nist.gov/cyberframework' },
      { titulo: 'MITRE ATT&CK', fonte: 'MITRE', tipo: 'documentacao', idioma: 'en', url: 'https://attack.mitre.org/' },
      { titulo: 'TryHackMe — laboratórios práticos de segurança', fonte: 'TryHackMe', tipo: 'curso', idioma: 'en', url: 'https://tryhackme.com/' },
      { titulo: 'Introdução à Cibersegurança', fonte: 'Cisco Networking Academy', tipo: 'curso', idioma: 'pt', url: 'https://www.netacad.com/' }
    ],
    relacionados: ['criptografia', 'owasp', 'lgpd'],
    tags: ['segurança', 'phishing', 'ransomware', 'malware', 'mfa', 'firewall', 'nist', 'soc'],
    devtoTag: 'security',
    quiz: [
      { pergunta: 'O "I" da tríade CIA significa:', alternativas: ['Internet', 'Integridade', 'Identidade', 'Inovação'], correta: 1, explicacao: 'Integridade garante que os dados não sejam alterados sem autorização.' },
      { pergunta: 'Um e-mail falso do "banco" pedindo sua senha é um exemplo de:', alternativas: ['Ransomware', 'DDoS', 'Phishing', 'Backup'], correta: 2, explicacao: 'O phishing usa engenharia social para enganar a vítima.' },
      { pergunta: 'Qual medida mais reduz o risco de senhas vazadas serem usadas?', alternativas: ['Trocar o papel de parede', 'Ativar autenticação multifator (MFA)', 'Usar a mesma senha em todos os sites', 'Desativar o antivírus'], correta: 1, explicacao: 'Com MFA, o atacante precisa de um segundo fator além da senha.' }
    ]
  },
  {
    id: 'criptografia',
    titulo: 'Criptografia',
    categoria: 'seguranca',
    nivel: 'intermediario',
    tempoLeitura: 6,
    resumo: 'A matemática que protege senhas, mensagens e o cadeado do HTTPS: chaves simétricas, assimétricas e hashes.',
    pincelada: [
      'Criptografar é transformar uma informação legível em algo incompreensível para quem não tem a chave. Na criptografia simétrica (como o AES), a mesma chave tranca e destranca — rápida, mas exige que as duas partes já compartilhem o segredo.',
      'A criptografia assimétrica (como RSA e curvas elípticas) usa um par de chaves: a pública, que todos podem conhecer, e a privada, que só o dono tem. É como um cadeado aberto que qualquer pessoa pode fechar, mas só você tem a chave para abrir. Ela também permite assinaturas digitais, que provam a autoria de algo.',
      'O HTTPS combina as duas: usa a assimétrica para combinar uma chave com segurança e, depois, a simétrica para trafegar os dados rapidamente. Já as funções de hash (como SHA-256) geram uma "impressão digital" de mão única, usada para verificar a integridade de arquivos e guardar senhas de forma segura.'
    ],
    conceitosChave: [
      { termo: 'Criptografia simétrica', definicao: 'Mesma chave para cifrar e decifrar. Ex.: AES.' },
      { termo: 'Criptografia assimétrica', definicao: 'Par de chaves pública/privada. Ex.: RSA, ECC.' },
      { termo: 'Hash', definicao: 'Função de mão única que gera um resumo de tamanho fixo. Ex.: SHA-256.' },
      { termo: 'Assinatura digital', definicao: 'Prova de autoria e integridade feita com a chave privada.' },
      { termo: 'TLS', definicao: 'Protocolo que protege conexões, como o "S" do HTTPS.' },
      { termo: 'Certificado digital', definicao: 'Documento que associa uma chave pública a uma identidade, emitido por uma autoridade.' }
    ],
    tecnologiasFundamentais: [
      { nome: "Let's Encrypt", descricao: 'Autoridade certificadora gratuita que popularizou o HTTPS.', url: 'https://letsencrypt.org/pt-br/how-it-works/' },
      { nome: 'OpenSSL', descricao: 'Biblioteca e ferramenta de linha de comando de criptografia.', url: 'https://www.openssl.org/' },
      { nome: 'Criptografia pós-quântica', descricao: 'Novos padrões do NIST resistentes a computadores quânticos.', url: 'https://csrc.nist.gov/projects/post-quantum-cryptography' }
    ],
    curiosidade: 'A cifra de César, usada por Júlio César há mais de 2 mil anos, apenas deslocava cada letra três posições no alfabeto. Hoje ela é quebrada em milissegundos.',
    carreira: 'Engenheiro(a) de segurança, especialista em PKI, pesquisador(a) em criptografia.',
    referencias: [
      { titulo: 'O que é criptografia?', fonte: 'Cloudflare Learning Center', tipo: 'artigo', idioma: 'en', url: 'https://www.cloudflare.com/learning/ssl/what-is-encryption/' },
      { titulo: "Como funciona o Let's Encrypt", fonte: "Let's Encrypt", tipo: 'documentacao', idioma: 'pt', url: 'https://letsencrypt.org/pt-br/how-it-works/' },
      { titulo: 'Crypto 101 (livro gratuito)', fonte: 'Laurens Van Houtven', tipo: 'livro', idioma: 'en', url: 'https://www.crypto101.io/' },
      { titulo: 'Post-Quantum Cryptography', fonte: 'NIST', tipo: 'documentacao', idioma: 'en', url: 'https://csrc.nist.gov/projects/post-quantum-cryptography' },
      { titulo: 'Password Storage Cheat Sheet', fonte: 'OWASP', tipo: 'documentacao', idioma: 'en', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html' }
    ],
    relacionados: ['ciberseguranca', 'blockchain', 'computacao-quantica'],
    tags: ['aes', 'rsa', 'hash', 'sha', 'tls', 'https', 'certificado', 'chave'],
    devtoTag: 'cryptography',
    quiz: [
      { pergunta: 'Na criptografia assimétrica, qual chave pode ser compartilhada com todos?', alternativas: ['A privada', 'A pública', 'As duas', 'Nenhuma'], correta: 1, explicacao: 'A chave pública é divulgada; a privada nunca deve sair das mãos do dono.' },
      { pergunta: 'Qual a característica principal de uma função de hash?', alternativas: ['É reversível', 'É de mão única', 'Precisa de duas chaves', 'Aumenta o tamanho do arquivo'], correta: 1, explicacao: 'Não é possível recuperar a entrada a partir do hash; por isso, ele é usado para senhas e verificação de integridade.' },
      { pergunta: 'O "S" do HTTPS é fornecido por qual protocolo?', alternativas: ['FTP', 'TLS', 'DNS', 'SMTP'], correta: 1, explicacao: 'O TLS (sucessor do SSL) cifra a comunicação entre o navegador e o servidor.' }
    ]
  },
  {
    id: 'owasp',
    titulo: 'Segurança de Aplicações (OWASP)',
    categoria: 'seguranca',
    nivel: 'avancado',
    tempoLeitura: 6,
    resumo: 'As falhas mais exploradas em sistemas web — injeção, controle de acesso quebrado — e como programar para evitá-las.',
    pincelada: [
      'A maior parte dos ataques modernos mira a aplicação, não a rede. A OWASP, uma fundação sem fins lucrativos, publica o OWASP Top 10: a lista dos riscos mais críticos em aplicações web, atualizada periodicamente com dados reais de vulnerabilidades.',
      'Entre os campeões estão o controle de acesso quebrado (um usuário consegue ver dados de outro só trocando um número na URL), as falhas de injeção (como SQL Injection, quando a entrada do usuário vira parte de um comando) e as configurações inseguras.',
      'A regra de ouro é: nunca confie na entrada do usuário. Valide no servidor, use consultas parametrizadas, aplique o princípio do menor privilégio, mantenha as dependências atualizadas e trate a segurança desde o design (shift-left), não só no fim do projeto.'
    ],
    conceitosChave: [
      { termo: 'OWASP Top 10', definicao: 'Lista de referência com os 10 riscos mais críticos em aplicações web.' },
      { termo: 'SQL Injection', definicao: 'Inserção de comandos SQL maliciosos por meio de entradas não tratadas.' },
      { termo: 'XSS', definicao: 'Cross-Site Scripting: injeção de scripts que rodam no navegador de outros usuários.' },
      { termo: 'Controle de acesso quebrado', definicao: 'Falha que permite ao usuário acessar recursos sem permissão.' },
      { termo: 'Menor privilégio', definicao: 'Dar a cada usuário ou sistema somente as permissões estritamente necessárias.' }
    ],
    tecnologiasFundamentais: [
      { nome: 'OWASP ZAP', descricao: 'Scanner gratuito de vulnerabilidades web.', url: 'https://www.zaproxy.org/' },
      { nome: 'OWASP Cheat Sheet Series', descricao: 'Guias práticos de programação segura.', url: 'https://cheatsheetseries.owasp.org/' },
      { nome: 'Dependabot', descricao: 'Alerta e atualiza dependências vulneráveis no GitHub.', url: 'https://docs.github.com/pt/code-security/dependabot' }
    ],
    curiosidade: 'A tirinha "Exploits of a Mom", do XKCD, sobre um aluno chamado Robert\'); DROP TABLE Students;--, virou o exemplo mais famoso de SQL Injection.',
    carreira: 'AppSec engineer, pentester de aplicações, desenvolvedor(a) com foco em segurança. Certificações: OSCP, GWAPT.',
    referencias: [
      { titulo: 'OWASP Top 10', fonte: 'OWASP Foundation', tipo: 'documentacao', idioma: 'en', url: 'https://owasp.org/www-project-top-ten/' },
      { titulo: 'OWASP Cheat Sheet Series', fonte: 'OWASP Foundation', tipo: 'documentacao', idioma: 'en', url: 'https://cheatsheetseries.owasp.org/' },
      { titulo: 'Web Security Academy — laboratórios gratuitos', fonte: 'PortSwigger', tipo: 'curso', idioma: 'en', url: 'https://portswigger.net/web-security' },
      { titulo: 'Segurança na Web', fonte: 'MDN Web Docs', tipo: 'documentacao', idioma: 'pt', url: 'https://developer.mozilla.org/pt-BR/docs/Web/Security' }
    ],
    relacionados: ['ciberseguranca', 'apis-rest', 'testes'],
    tags: ['owasp', 'sql injection', 'xss', 'appsec', 'vulnerabilidade', 'web'],
    devtoTag: 'security',
    quiz: [
      { pergunta: 'Qual a melhor defesa contra SQL Injection?', alternativas: ['Esconder o botão de login', 'Consultas parametrizadas', 'Usar senhas longas', 'Desligar o servidor à noite'], correta: 1, explicacao: 'Com parâmetros, a entrada do usuário é tratada como dado, nunca como parte do comando SQL.' },
      { pergunta: 'Um usuário vê o pedido de outro trocando /pedido/10 por /pedido/11. Isso é:', alternativas: ['XSS', 'Controle de acesso quebrado', 'Criptografia fraca', 'DDoS'], correta: 1, explicacao: 'O servidor deveria verificar se o pedido pertence ao usuário autenticado.' },
      { pergunta: '"Menor privilégio" significa:', alternativas: ['Dar acesso de administrador a todos', 'Conceder apenas as permissões necessárias', 'Não usar senhas', 'Usar o sistema menos possível'], correta: 1, explicacao: 'Assim, se uma conta for comprometida, o estrago fica limitado.' }
    ]
  },
  {
    id: 'lgpd',
    titulo: 'LGPD e Privacidade de Dados',
    categoria: 'seguranca',
    nivel: 'iniciante',
    tempoLeitura: 5,
    resumo: 'A lei brasileira que define como empresas podem coletar e tratar dados pessoais, e o que muda no dia a dia de quem desenvolve.',
    pincelada: [
      'A Lei Geral de Proteção de Dados (Lei nº 13.709/2018) regula o tratamento de dados pessoais no Brasil, inspirada no GDPR europeu. Ela vale para empresas e órgãos públicos, online ou offline, e é fiscalizada pela ANPD (Autoridade Nacional de Proteção de Dados).',
      'Todo tratamento precisa de uma base legal, como o consentimento, o cumprimento de contrato ou uma obrigação legal. Dados sensíveis (saúde, biometria, religião, origem racial) exigem cuidado redobrado. O titular tem direitos: saber quais dados a empresa tem, corrigi-los, pedir a exclusão e revogar o consentimento.',
      'Para quem desenvolve sistemas, a LGPD se traduz em privacy by design: coletar só o necessário (minimização), proteger com criptografia e controle de acesso, registrar quem acessou o quê e ter um plano para comunicar incidentes. É exatamente o que este portal faz: seus dados ficam só no seu navegador.'
    ],
    conceitosChave: [
      { termo: 'Dado pessoal', definicao: 'Informação que identifica ou pode identificar uma pessoa (nome, CPF, e-mail, IP).' },
      { termo: 'Dado sensível', definicao: 'Dado sobre saúde, biometria, religião, opinião política, origem racial etc.' },
      { termo: 'Titular', definicao: 'A pessoa a quem os dados se referem.' },
      { termo: 'Controlador e operador', definicao: 'Quem decide sobre o tratamento e quem o executa em nome do controlador.' },
      { termo: 'Encarregado (DPO)', definicao: 'Canal de comunicação entre a empresa, os titulares e a ANPD.' },
      { termo: 'Privacy by design', definicao: 'Pensar a privacidade desde o início do projeto de um sistema.' }
    ],
    tecnologiasFundamentais: [
      { nome: 'ANPD', descricao: 'Autoridade Nacional de Proteção de Dados.', url: 'https://www.gov.br/anpd/pt-br' },
      { nome: 'Texto da LGPD', descricao: 'Lei nº 13.709/2018 no site do Planalto.', url: 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm' },
      { nome: 'GDPR', descricao: 'Regulamento europeu que inspirou a LGPD.', url: 'https://gdpr.eu/' }
    ],
    curiosidade: 'As multas da LGPD podem chegar a 2% do faturamento da empresa no Brasil, limitadas a R$ 50 milhões por infração.',
    carreira: 'Analista de privacidade, DPO (encarregado), consultor(a) de GRC, advogado(a) de direito digital. Certificações: EXIN Privacy & Data Protection, IAPP CIPP/E.',
    referencias: [
      { titulo: 'Lei nº 13.709/2018 (LGPD)', fonte: 'Planalto', tipo: 'documentacao', idioma: 'pt', url: 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm' },
      { titulo: 'Autoridade Nacional de Proteção de Dados', fonte: 'gov.br', tipo: 'documentacao', idioma: 'pt', url: 'https://www.gov.br/anpd/pt-br' },
      { titulo: 'Cartilha de Segurança — Privacidade', fonte: 'CERT.br', tipo: 'artigo', idioma: 'pt', url: 'https://cartilha.cert.br/' },
      { titulo: 'GDPR — guia completo', fonte: 'gdpr.eu', tipo: 'artigo', idioma: 'en', url: 'https://gdpr.eu/' }
    ],
    relacionados: ['ciberseguranca', 'banco-de-dados', 'governanca'],
    tags: ['lgpd', 'gdpr', 'privacidade', 'anpd', 'consentimento', 'dpo', 'dados pessoais'],
    devtoTag: 'privacy',
    quiz: [
      { pergunta: 'Qual órgão fiscaliza a LGPD?', alternativas: ['Anatel', 'ANPD', 'Procon', 'Banco Central'], correta: 1, explicacao: 'A Autoridade Nacional de Proteção de Dados é responsável pela fiscalização e regulamentação.' },
      { pergunta: 'Qual destes é um dado pessoal sensível?', alternativas: ['Cor favorita', 'Dado de saúde', 'Nome da empresa', 'Preço de um produto'], correta: 1, explicacao: 'Saúde, biometria, religião e origem racial, entre outros, são dados sensíveis.' },
      { pergunta: '"Minimização" significa:', alternativas: ['Coletar só os dados necessários para a finalidade', 'Diminuir o tamanho do banco', 'Reduzir o número de usuários', 'Apagar todos os logs'], correta: 0, explicacao: 'Quanto menos dados desnecessários, menor o risco em caso de incidente.' }
    ]
  }
];
