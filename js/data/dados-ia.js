/**
 * Pílulas da categoria Dados e IA.
 * @type {import('../topics.js').Topic[]}
 */
export default [
  {
    id: 'banco-de-dados',
    titulo: 'Banco de Dados Relacional (SQL)',
    categoria: 'dados-ia',
    nivel: 'iniciante',
    tempoLeitura: 6,
    resumo: 'Tabelas, chaves e SQL: como os sistemas guardam e consultam dados de forma organizada e confiável.',
    pincelada: [
      'Um banco de dados relacional organiza a informação em tabelas, como planilhas muito bem-comportadas: cada linha é um registro e cada coluna, um atributo. As tabelas se relacionam por meio de chaves — a chave primária identifica cada linha, e a chave estrangeira aponta para uma linha de outra tabela.',
      'Para conversar com o banco, usamos SQL (Structured Query Language). Com SELECT consultamos, com INSERT inserimos, com UPDATE alteramos e com DELETE removemos. O JOIN combina tabelas: "traga os pedidos junto com o nome de cada cliente".',
      'Bancos relacionais garantem as propriedades ACID — Atomicidade, Consistência, Isolamento e Durabilidade. Numa transferência bancária, ou o dinheiro sai de uma conta e entra na outra, ou nada acontece. A modelagem (com diagramas entidade-relacionamento e normalização) evita dados duplicados e inconsistentes.'
    ],
    conceitosChave: [
      { termo: 'Tabela', definicao: 'Estrutura de linhas (registros) e colunas (atributos).' },
      { termo: 'Chave primária', definicao: 'Coluna que identifica cada registro de forma única.' },
      { termo: 'Chave estrangeira', definicao: 'Coluna que referencia a chave primária de outra tabela.' },
      { termo: 'JOIN', definicao: 'Operação SQL que combina registros de tabelas relacionadas.' },
      { termo: 'ACID', definicao: 'Atomicidade, Consistência, Isolamento e Durabilidade das transações.' },
      { termo: 'Normalização', definicao: 'Processo de organizar tabelas para reduzir redundância.' }
    ],
    tecnologiasFundamentais: [
      { nome: 'PostgreSQL', descricao: 'Banco relacional open source, robusto e muito usado.', url: 'https://www.postgresql.org/docs/' },
      { nome: 'MySQL', descricao: 'Banco relacional popular em aplicações web.', url: 'https://dev.mysql.com/doc/' },
      { nome: 'SQLite', descricao: 'Banco leve, em um único arquivo, presente em celulares e navegadores.', url: 'https://www.sqlite.org/' },
      { nome: 'SQL Server', descricao: 'Banco relacional da Microsoft.', url: 'https://learn.microsoft.com/pt-br/sql/' }
    ],
    curiosidade: 'O modelo relacional foi proposto por Edgar F. Codd, da IBM, em 1970. Mais de 50 anos depois, SQL continua entre as linguagens mais pedidas em vagas de tecnologia.',
    carreira: 'DBA (administrador(a) de banco de dados), analista de dados, desenvolvedor(a) back-end. Certificações: Oracle, Microsoft (DP-900).',
    referencias: [
      { titulo: 'Documentação oficial do PostgreSQL', fonte: 'PostgreSQL', tipo: 'documentacao', idioma: 'en', url: 'https://www.postgresql.org/docs/' },
      { titulo: 'SQLBolt — exercícios interativos de SQL', fonte: 'SQLBolt', tipo: 'curso', idioma: 'en', url: 'https://sqlbolt.com/' },
      { titulo: 'Use The Index, Luke — desempenho em SQL', fonte: 'Markus Winand', tipo: 'livro', idioma: 'en', url: 'https://use-the-index-luke.com/' },
      { titulo: 'SQLite — documentação', fonte: 'SQLite', tipo: 'documentacao', idioma: 'en', url: 'https://www.sqlite.org/docs.html' }
    ],
    relacionados: ['nosql', 'big-data', 'apis-rest'],
    tags: ['sql', 'postgresql', 'mysql', 'tabela', 'join', 'acid', 'modelagem', 'bd', 'bbd'],
    devtoTag: 'sql',
    quiz: [
      { pergunta: 'Qual comando SQL consulta dados?', alternativas: ['INSERT', 'SELECT', 'UPDATE', 'DROP'], correta: 1, explicacao: 'SELECT recupera dados; INSERT insere; UPDATE altera; DROP remove estruturas.' },
      { pergunta: 'A chave estrangeira serve para:', alternativas: ['Criptografar a tabela', 'Relacionar uma tabela a outra', 'Acelerar o servidor', 'Apagar registros'], correta: 1, explicacao: 'Ela aponta para a chave primária de outra tabela, criando o relacionamento.' },
      { pergunta: 'O "A" de ACID significa:', alternativas: ['Acesso', 'Atomicidade', 'Agilidade', 'Arquivo'], correta: 1, explicacao: 'Atomicidade: a transação acontece por inteiro ou não acontece.' }
    ]
  },
  {
    id: 'nosql',
    titulo: 'Bancos NoSQL',
    categoria: 'dados-ia',
    nivel: 'intermediario',
    tempoLeitura: 5,
    resumo: 'Documentos, chave-valor, colunas e grafos: modelos flexíveis para escala massiva e dados que não cabem bem em tabelas.',
    pincelada: [
      'NoSQL ("Not only SQL") reúne bancos que não seguem o modelo de tabelas relacionais. Eles surgiram para atender aplicações com volumes gigantes, dados sem estrutura fixa e necessidade de escalar horizontalmente, adicionando mais servidores em vez de comprar um servidor maior.',
      'Há quatro famílias principais: documentos (MongoDB guarda objetos parecidos com JSON), chave-valor (Redis funciona como um dicionário gigante e ultrarrápido), colunas largas (Cassandra, para escrita massiva) e grafos (Neo4j, ideal para redes sociais e recomendações).',
      'O teorema CAP diz que, durante uma falha de rede, um sistema distribuído precisa escolher entre consistência e disponibilidade. Muitos bancos NoSQL priorizam a disponibilidade e aceitam a "consistência eventual". Não existe vencedor: a escolha depende do problema.'
    ],
    conceitosChave: [
      { termo: 'Banco de documentos', definicao: 'Armazena registros como documentos JSON/BSON flexíveis.' },
      { termo: 'Chave-valor', definicao: 'Associa uma chave única a um valor; extremamente rápido.' },
      { termo: 'Banco de grafos', definicao: 'Armazena nós e relacionamentos; ótimo para conexões complexas.' },
      { termo: 'Escala horizontal', definicao: 'Aumentar a capacidade adicionando mais máquinas.' },
      { termo: 'Teorema CAP', definicao: 'Em uma partição de rede, escolhe-se entre Consistência e Disponibilidade.' },
      { termo: 'Consistência eventual', definicao: 'As réplicas ficam iguais depois de algum tempo, não instantaneamente.' }
    ],
    tecnologiasFundamentais: [
      { nome: 'MongoDB', descricao: 'Banco de documentos mais popular.', url: 'https://www.mongodb.com/docs/' },
      { nome: 'Redis', descricao: 'Chave-valor em memória, usado como cache e fila.', url: 'https://redis.io/docs/latest/' },
      { nome: 'Apache Cassandra', descricao: 'Banco de colunas largas, altamente distribuído.', url: 'https://cassandra.apache.org/' },
      { nome: 'Neo4j', descricao: 'Banco de grafos líder de mercado.', url: 'https://neo4j.com/docs/' }
    ],
    curiosidade: 'O termo "NoSQL" foi popularizado em 2009, numa hashtag usada para divulgar um encontro sobre bancos de dados distribuídos e não relacionais.',
    carreira: 'Engenheiro(a) de dados, desenvolvedor(a) back-end, DBA. Certificação: MongoDB Associate Developer.',
    referencias: [
      { titulo: 'O que é NoSQL?', fonte: 'AWS', tipo: 'artigo', idioma: 'pt', url: 'https://aws.amazon.com/pt/nosql/' },
      { titulo: 'MongoDB University — cursos gratuitos', fonte: 'MongoDB', tipo: 'curso', idioma: 'en', url: 'https://learn.mongodb.com/' },
      { titulo: 'Documentação do Redis', fonte: 'Redis', tipo: 'documentacao', idioma: 'en', url: 'https://redis.io/docs/latest/' },
      { titulo: 'NoSQL — artigos de Martin Fowler', fonte: 'martinfowler.com', tipo: 'artigo', idioma: 'en', url: 'https://martinfowler.com/nosql.html' }
    ],
    relacionados: ['banco-de-dados', 'big-data', 'nuvem'],
    tags: ['mongodb', 'redis', 'cassandra', 'neo4j', 'documento', 'cap', 'cache'],
    devtoTag: 'nosql',
    quiz: [
      { pergunta: 'O Redis é principalmente um banco do tipo:', alternativas: ['Grafo', 'Chave-valor', 'Relacional', 'Colunar analítico'], correta: 1, explicacao: 'O Redis guarda pares chave-valor em memória, por isso é tão usado como cache.' },
      { pergunta: 'Qual tipo de banco é mais indicado para modelar "amigos de amigos" numa rede social?', alternativas: ['Grafo', 'Chave-valor', 'Planilha', 'Arquivo de texto'], correta: 0, explicacao: 'Bancos de grafos percorrem relacionamentos com muita eficiência.' },
      { pergunta: 'Escalar horizontalmente significa:', alternativas: ['Comprar um servidor maior', 'Adicionar mais servidores', 'Diminuir o número de usuários', 'Usar um monitor maior'], correta: 1, explicacao: 'Adicionar mais máquinas é escala horizontal; aumentar uma única máquina é vertical.' }
    ]
  },
  {
    id: 'big-data',
    titulo: 'Big Data e Ciência de Dados',
    categoria: 'dados-ia',
    nivel: 'intermediario',
    tempoLeitura: 6,
    resumo: 'Coletar, processar e extrair valor de volumes enormes de dados, dos pipelines às visualizações que apoiam decisões.',
    pincelada: [
      'Big Data é caracterizado pelos "Vs": Volume (terabytes ou petabytes), Velocidade (dados chegando em tempo real) e Variedade (tabelas, textos, imagens, logs). Muitos autores incluem ainda Veracidade e Valor. Planilhas e bancos tradicionais não dão conta desse cenário.',
      'Para processar tudo isso, distribui-se o trabalho entre muitas máquinas. O Apache Spark processa dados em paralelo na memória; o Apache Kafka transporta fluxos de eventos em tempo real; data lakes guardam dados brutos e data warehouses guardam dados organizados para análise.',
      'A Ciência de Dados transforma esses dados em conhecimento: formula perguntas, limpa os dados (geralmente a maior parte do trabalho), explora, modela com estatística e machine learning e comunica os resultados com visualizações. Python, com as bibliotecas pandas e Jupyter, é a ferramenta favorita da área.'
    ],
    conceitosChave: [
      { termo: 'Os Vs do Big Data', definicao: 'Volume, Velocidade e Variedade (e, para alguns autores, Veracidade e Valor).' },
      { termo: 'ETL / ELT', definicao: 'Extrair, transformar e carregar dados entre sistemas.' },
      { termo: 'Data lake', definicao: 'Repositório de dados brutos em qualquer formato.' },
      { termo: 'Data warehouse', definicao: 'Base organizada e otimizada para consultas analíticas.' },
      { termo: 'Pipeline de dados', definicao: 'Sequência automatizada de etapas que move e transforma dados.' }
    ],
    tecnologiasFundamentais: [
      { nome: 'Apache Spark', descricao: 'Motor de processamento distribuído em memória.', url: 'https://spark.apache.org/' },
      { nome: 'Apache Kafka', descricao: 'Plataforma de streaming de eventos.', url: 'https://kafka.apache.org/' },
      { nome: 'pandas', descricao: 'Biblioteca Python para análise de dados tabulares.', url: 'https://pandas.pydata.org/' },
      { nome: 'Jupyter', descricao: 'Notebooks interativos para explorar dados.', url: 'https://jupyter.org/' }
    ],
    curiosidade: 'Estima-se que cientistas de dados passem boa parte do tempo limpando e preparando dados — muito mais do que criando modelos.',
    carreira: 'Cientista de dados, engenheiro(a) de dados, analista de BI. Certificações: Google Data Analytics, Databricks, AWS Data Engineer.',
    referencias: [
      { titulo: 'O que é big data?', fonte: 'AWS', tipo: 'artigo', idioma: 'pt', url: 'https://aws.amazon.com/pt/what-is/big-data/' },
      { titulo: 'Kaggle Learn — cursos práticos de dados', fonte: 'Kaggle', tipo: 'curso', idioma: 'en', url: 'https://www.kaggle.com/learn' },
      { titulo: 'Documentação do Apache Spark', fonte: 'Apache Software Foundation', tipo: 'documentacao', idioma: 'en', url: 'https://spark.apache.org/docs/latest/' },
      { titulo: 'Getting started — pandas', fonte: 'pandas', tipo: 'documentacao', idioma: 'en', url: 'https://pandas.pydata.org/docs/getting_started/index.html' }
    ],
    relacionados: ['machine-learning', 'nosql', 'banco-de-dados'],
    tags: ['spark', 'kafka', 'hadoop', 'pandas', 'etl', 'data lake', 'analytics', 'ciência de dados'],
    devtoTag: 'datascience',
    quiz: [
      { pergunta: 'Qual destes NÃO é um dos "Vs" clássicos do Big Data?', alternativas: ['Volume', 'Velocidade', 'Variedade', 'Vulnerabilidade'], correta: 3, explicacao: 'Os clássicos são Volume, Velocidade e Variedade; Vulnerabilidade não faz parte da definição.' },
      { pergunta: 'Para processar fluxos de eventos em tempo real, usa-se muito o:', alternativas: ['Apache Kafka', 'Microsoft Word', 'SQLite', 'Photoshop'], correta: 0, explicacao: 'O Kafka transporta e armazena fluxos de eventos com alta vazão.' },
      { pergunta: 'Um repositório de dados brutos em qualquer formato é um:', alternativas: ['Data warehouse', 'Data lake', 'Data mart', 'Spreadsheet'], correta: 1, explicacao: 'O data lake aceita dados brutos; o warehouse guarda dados tratados para análise.' }
    ]
  },
  {
    id: 'machine-learning',
    titulo: 'Machine Learning',
    categoria: 'dados-ia',
    nivel: 'intermediario',
    tempoLeitura: 7,
    resumo: 'Ensinar computadores a aprender padrões a partir de exemplos, em vez de programar cada regra manualmente.',
    pincelada: [
      'Na programação tradicional, escrevemos as regras: "se o e-mail contém X, é spam". Em Machine Learning (aprendizado de máquina), mostramos milhares de exemplos já rotulados e o algoritmo descobre sozinho as regras que separam spam de não spam. O resultado é um modelo, capaz de fazer previsões sobre dados novos.',
      'Há três grandes tipos: supervisionado (aprende com exemplos rotulados — classificar imagens, prever preços), não supervisionado (encontra grupos e padrões sem rótulos — segmentar clientes) e por reforço (aprende por tentativa e erro com recompensas — robôs e jogos).',
      'O fluxo típico é: coletar e limpar dados, separar em treino e teste, treinar, avaliar com métricas (acurácia, precisão, recall) e evitar o overfitting — quando o modelo "decora" o treino e erra em dados novos, como um aluno que decorou a prova anterior em vez de aprender a matéria.'
    ],
    conceitosChave: [
      { termo: 'Modelo', definicao: 'Resultado do treinamento, capaz de fazer previsões sobre novos dados.' },
      { termo: 'Aprendizado supervisionado', definicao: 'Treino com exemplos rotulados (entrada → resposta correta).' },
      { termo: 'Aprendizado não supervisionado', definicao: 'Busca padrões ou grupos em dados sem rótulo.' },
      { termo: 'Overfitting', definicao: 'Quando o modelo se ajusta demais ao treino e generaliza mal.' },
      { termo: 'Treino e teste', definicao: 'Divisão dos dados para treinar e, depois, avaliar com dados nunca vistos.' },
      { termo: 'Rede neural', definicao: 'Modelo inspirado em neurônios, base do deep learning.' }
    ],
    tecnologiasFundamentais: [
      { nome: 'scikit-learn', descricao: 'Biblioteca Python de ML clássico, ótima para começar.', url: 'https://scikit-learn.org/stable/' },
      { nome: 'PyTorch', descricao: 'Framework de deep learning muito usado em pesquisa e indústria.', url: 'https://pytorch.org/' },
      { nome: 'TensorFlow', descricao: 'Framework de ML do Google.', url: 'https://www.tensorflow.org/' },
      { nome: 'Google Colab', descricao: 'Notebooks gratuitos com GPU no navegador.', url: 'https://colab.research.google.com/' }
    ],
    curiosidade: 'O termo "machine learning" foi cunhado em 1959 por Arthur Samuel, que criou um programa de damas que aprendia jogando contra si mesmo.',
    carreira: 'Engenheiro(a) de ML, cientista de dados, engenheiro(a) de MLOps. Certificações: AWS ML Engineer, Google Professional ML Engineer.',
    referencias: [
      { titulo: 'Machine Learning Crash Course', fonte: 'Google for Developers', tipo: 'curso', idioma: 'en', url: 'https://developers.google.com/machine-learning/crash-course' },
      { titulo: 'Guia do usuário do scikit-learn', fonte: 'scikit-learn', tipo: 'documentacao', idioma: 'en', url: 'https://scikit-learn.org/stable/user_guide.html' },
      { titulo: 'Practical Deep Learning for Coders', fonte: 'fast.ai', tipo: 'curso', idioma: 'en', url: 'https://course.fast.ai/' },
      { titulo: 'O que é machine learning?', fonte: 'AWS', tipo: 'artigo', idioma: 'pt', url: 'https://aws.amazon.com/pt/what-is/machine-learning/' },
      { titulo: 'MIT Technology Review — Inteligência Artificial', fonte: 'MIT Technology Review', tipo: 'revista', idioma: 'en', url: 'https://www.technologyreview.com/topic/artificial-intelligence/' }
    ],
    relacionados: ['ia-generativa', 'big-data', 'hardware'],
    tags: ['ml', 'ia', 'modelo', 'python', 'scikit-learn', 'pytorch', 'rede neural', 'deep learning'],
    devtoTag: 'machinelearning',
    quiz: [
      { pergunta: 'Prever o preço de uma casa a partir de exemplos com preço conhecido é aprendizado:', alternativas: ['Supervisionado', 'Não supervisionado', 'Por reforço', 'Manual'], correta: 0, explicacao: 'Os exemplos têm a resposta correta (o preço), o que caracteriza o aprendizado supervisionado.' },
      { pergunta: 'O que é overfitting?', alternativas: ['O modelo é rápido demais', 'O modelo decora o treino e erra em dados novos', 'Falta de dados de treino', 'Um tipo de GPU'], correta: 1, explicacao: 'O modelo se ajusta tanto ao treino que perde a capacidade de generalizar.' },
      { pergunta: 'Por que separamos os dados em treino e teste?', alternativas: ['Para economizar espaço', 'Para avaliar o modelo com dados que ele nunca viu', 'Porque é exigido por lei', 'Para treinar mais rápido'], correta: 1, explicacao: 'Avaliar com dados inéditos mostra como o modelo vai se comportar no mundo real.' }
    ]
  },
  {
    id: 'ia-generativa',
    titulo: 'IA Generativa e LLMs',
    categoria: 'dados-ia',
    nivel: 'intermediario',
    tempoLeitura: 6,
    resumo: 'Modelos que criam texto, imagem e código: como os LLMs funcionam, o que é um prompt e quais cuidados ter.',
    pincelada: [
      'A IA generativa cria conteúdo novo — texto, imagens, áudio, código — a partir de padrões aprendidos em enormes volumes de dados. Os LLMs (Large Language Models), como Claude, GPT e Gemini, são treinados para prever a próxima palavra (token) de um texto. Em escala gigantesca, essa tarefa simples faz surgir capacidades como resumir, traduzir, programar e raciocinar.',
      'A base técnica é a arquitetura Transformer (2017), cujo mecanismo de atenção permite ao modelo relacionar cada palavra com todas as outras do contexto. Depois do pré-treino, os modelos passam por ajustes com feedback humano para seguir instruções e se comportar de forma útil e segura.',
      'Para usar bem, é preciso escrever bons prompts (contexto, objetivo, formato e exemplos) e conhecer os limites: os modelos podem "alucinar" fatos, reproduzir vieses e não substituem a verificação humana. Técnicas como RAG conectam o modelo a fontes confiáveis para reduzir erros. Este próprio projeto foi feito com Vibe Coding — programação assistida por IA.'
    ],
    conceitosChave: [
      { termo: 'LLM', definicao: 'Modelo de linguagem de grande escala, treinado em enormes volumes de texto.' },
      { termo: 'Token', definicao: 'Pedaço de texto (palavra ou parte dela) processado pelo modelo.' },
      { termo: 'Transformer', definicao: 'Arquitetura de rede neural baseada em atenção, base dos LLMs.' },
      { termo: 'Prompt', definicao: 'Instrução ou contexto enviado ao modelo.' },
      { termo: 'Alucinação', definicao: 'Resposta plausível, mas falsa, gerada pelo modelo.' },
      { termo: 'RAG', definicao: 'Retrieval-Augmented Generation: busca documentos relevantes e os entrega ao modelo antes de responder.' }
    ],
    tecnologiasFundamentais: [
      { nome: 'Claude (Anthropic)', descricao: 'Família de LLMs com documentação para desenvolvedores.', url: 'https://docs.anthropic.com/' },
      { nome: 'Hugging Face', descricao: 'Hub de modelos abertos e cursos gratuitos.', url: 'https://huggingface.co/learn' },
      { nome: 'Attention Is All You Need', descricao: 'Artigo de 2017 que apresentou o Transformer.', url: 'https://arxiv.org/abs/1706.03762' }
    ],
    curiosidade: 'O artigo "Attention Is All You Need", de 2017, está entre os mais citados da história recente da computação, com centenas de milhares de citações.',
    carreira: 'Engenheiro(a) de IA, engenheiro(a) de prompt, desenvolvedor(a) de aplicações com LLM, pesquisador(a) de segurança de IA.',
    referencias: [
      { titulo: 'Guia de engenharia de prompt', fonte: 'Anthropic Docs', tipo: 'documentacao', idioma: 'en', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview' },
      { titulo: 'Hugging Face Learn — cursos de LLM e NLP', fonte: 'Hugging Face', tipo: 'curso', idioma: 'en', url: 'https://huggingface.co/learn' },
      { titulo: 'Attention Is All You Need (Vaswani et al., 2017)', fonte: 'arXiv', tipo: 'artigo', idioma: 'en', url: 'https://arxiv.org/abs/1706.03762' },
      { titulo: 'O que é IA generativa?', fonte: 'AWS', tipo: 'artigo', idioma: 'pt', url: 'https://aws.amazon.com/pt/what-is/generative-ai/' },
      { titulo: 'MIT Technology Review — Inteligência Artificial', fonte: 'MIT Technology Review', tipo: 'revista', idioma: 'en', url: 'https://www.technologyreview.com/topic/artificial-intelligence/' }
    ],
    relacionados: ['machine-learning', 'desenvolvimento-software', 'lgpd'],
    tags: ['llm', 'chatgpt', 'claude', 'gemini', 'prompt', 'transformer', 'genai', 'vibe coding'],
    devtoTag: 'ai',
    quiz: [
      { pergunta: 'Qual arquitetura é a base dos LLMs modernos?', alternativas: ['Von Neumann', 'Transformer', 'Cliente-servidor', 'MVC'], correta: 1, explicacao: 'O Transformer, com seu mecanismo de atenção, foi apresentado em 2017.' },
      { pergunta: 'Quando um LLM inventa uma referência que não existe, chamamos isso de:', alternativas: ['Overclock', 'Alucinação', 'Compilação', 'Cache miss'], correta: 1, explicacao: 'Por isso, toda resposta de IA deve ser verificada, especialmente fatos e links.' },
      { pergunta: 'O que a técnica RAG faz?', alternativas: ['Apaga o histórico do modelo', 'Busca documentos relevantes e os fornece ao modelo antes da resposta', 'Aumenta o tamanho da GPU', 'Traduz o código para binário'], correta: 1, explicacao: 'Com fontes confiáveis no contexto, o modelo tende a errar menos.' }
    ]
  }
];
