/**
 * topics.js — Base de conhecimento do PílulaTech.
 * Reúne as categorias e as pílulas (equivalente ao movies.js do enunciado).
 * O conteúdo de cada categoria fica em js/data/<categoria>.js.
 */
import infraestrutura from './data/infraestrutura.js';
import nuvem from './data/nuvem.js';
import sistemas from './data/sistemas.js';
import seguranca from './data/seguranca.js';
import dadosIa from './data/dados-ia.js';
import desenvolvimento from './data/desenvolvimento.js';
import devops from './data/devops.js';
import tendencias from './data/tendencias.js';

/**
 * @typedef {Object} Referencia
 * @property {string} titulo
 * @property {string} fonte
 * @property {'documentacao'|'artigo'|'revista'|'curso'|'livro'|'video'} tipo
 * @property {'pt'|'en'} idioma
 * @property {string} url
 *
 * @typedef {Object} Topic
 * @property {string} id                 Slug usado na URL (#/topico/<id>)
 * @property {string} titulo
 * @property {string} categoria          id de uma categoria
 * @property {'iniciante'|'intermediario'|'avancado'} nivel
 * @property {number} tempoLeitura       minutos
 * @property {string} resumo             frase curta exibida no card
 * @property {string[]} pincelada        parágrafos da visão geral
 * @property {{termo:string, definicao:string}[]} conceitosChave
 * @property {{nome:string, descricao:string, url:string}[]} tecnologiasFundamentais
 * @property {string} curiosidade
 * @property {string} carreira
 * @property {Referencia[]} referencias
 * @property {string[]} relacionados     ids de outras pílulas
 * @property {string[]} tags
 * @property {string} devtoTag           tag usada na API do DEV.to
 * @property {{pergunta:string, alternativas:string[], correta:number, explicacao:string}[]} quiz
 */

/** Categorias: cor (token CSS), ícone (sprite) e descrição curta. */
export const CATEGORIES = [
  { id: 'infraestrutura', nome: 'Infraestrutura', icone: 'network', descricao: 'Redes, protocolos e o hardware que sustenta tudo.' },
  { id: 'nuvem', nome: 'Nuvem e Virtualização', icone: 'cloud', descricao: 'Cloud, VMs, containers e serverless.' },
  { id: 'sistemas', nome: 'Sistemas', icone: 'terminal', descricao: 'Sistemas operacionais e linha de comando.' },
  { id: 'seguranca', nome: 'Segurança', icone: 'shield', descricao: 'Cibersegurança, criptografia e privacidade.' },
  { id: 'dados-ia', nome: 'Dados e IA', icone: 'database', descricao: 'Bancos de dados, big data e inteligência artificial.' },
  { id: 'desenvolvimento', nome: 'Desenvolvimento', icone: 'code', descricao: 'Programação, métodos ágeis, APIs e UX.' },
  { id: 'devops', nome: 'Operações (DevOps)', icone: 'infinity', descricao: 'Automação, CI/CD e observabilidade.' },
  { id: 'tendencias', nome: 'Tendências e Gestão', icone: 'trending', descricao: 'IoT, blockchain, quântica e governança.' }
];

/** Níveis de dificuldade, em ordem crescente. */
export const LEVELS = {
  iniciante: { nome: 'Iniciante', ordem: 1, descricao: 'Estou começando na área' },
  intermediario: { nome: 'Intermediário', ordem: 2, descricao: 'Já conheço o básico' },
  avancado: { nome: 'Avançado', ordem: 3, descricao: 'Quero me aprofundar' }
};

/** Tipos de referência → rótulo e ícone. */
export const REF_TYPES = {
  documentacao: { nome: 'Documentação', icone: 'file' },
  artigo: { nome: 'Artigo', icone: 'newspaper' },
  revista: { nome: 'Revista', icone: 'newspaper' },
  curso: { nome: 'Curso', icone: 'graduation' },
  livro: { nome: 'Livro', icone: 'book' },
  video: { nome: 'Vídeo', icone: 'video' }
};

/** Todas as pílulas, na ordem das categorias. @type {Topic[]} */
export const TOPICS = [
  ...infraestrutura, ...nuvem, ...sistemas, ...seguranca,
  ...dadosIa, ...desenvolvimento, ...devops, ...tendencias
];

const TOPIC_MAP = new Map(TOPICS.map((t) => [t.id, t]));
const CATEGORY_MAP = new Map(CATEGORIES.map((c) => [c.id, c]));

/** @param {string} id @returns {Topic|undefined} */
export const getTopic = (id) => TOPIC_MAP.get(id);

/** @param {string} id */
export const getCategory = (id) => CATEGORY_MAP.get(id);

/** @param {string} categoryId @returns {Topic[]} */
export const topicsByCategory = (categoryId) => TOPICS.filter((t) => t.categoria === categoryId);

/**
 * Lista única de termos do glossário, extraída dos conceitos-chave de todas as pílulas.
 * @returns {{termo:string, definicao:string, topicId:string, topicTitulo:string}[]}
 */
export function buildGlossary() {
  const seen = new Map();
  for (const topic of TOPICS) {
    for (const c of topic.conceitosChave) {
      const key = c.termo.toLowerCase();
      if (!seen.has(key)) {
        seen.set(key, { ...c, topicId: topic.id, topicTitulo: topic.titulo });
      }
    }
  }
  return [...seen.values()].sort((a, b) => a.termo.localeCompare(b.termo, 'pt-BR'));
}
