/**
 * storage.js — Toda leitura e escrita no LocalStorage passa por aqui.
 *
 * - Chaves com prefixo "pilulatech:" para não colidir com outros sites do mesmo domínio
 *   (no GitHub Pages, todos os repositórios do usuário compartilham o mesmo domínio).
 * - Versão do esquema para permitir migrações futuras.
 * - try/catch em tudo: JSON corrompido ou LocalStorage bloqueado não quebram a página
 *   (nesse caso, os dados ficam em memória durante a visita).
 */

const PREFIX = 'pilulatech:';
const SCHEMA_VERSION = 1;
const HISTORY_LIMIT = 20;
const RECENT_SEARCH_LIMIT = 5;

/** Fallback em memória caso o LocalStorage esteja indisponível (modo privado, cota cheia...). */
const memory = new Map();

/** Verifica se o LocalStorage pode ser usado. */
function detectStorage() {
  try {
    const k = `${PREFIX}__test`;
    localStorage.setItem(k, '1');
    localStorage.removeItem(k);
    return true;
  } catch {
    return false;
  }
}

export const isPersistent = detectStorage();

/**
 * Lê um valor JSON. Retorna `fallback` se a chave não existir ou estiver corrompida.
 * @template T
 * @param {string} key
 * @param {T} fallback
 * @returns {T}
 */
function read(key, fallback) {
  try {
    const raw = isPersistent ? localStorage.getItem(PREFIX + key) : memory.get(key);
    return raw == null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

/**
 * Grava um valor como JSON.
 * @param {string} key
 * @param {unknown} value
 */
function write(key, value) {
  const raw = JSON.stringify(value);
  try {
    if (isPersistent) localStorage.setItem(PREFIX + key, raw);
    else memory.set(key, raw);
  } catch {
    memory.set(key, raw); // cota excedida: mantém ao menos em memória
  }
}

function remove(key) {
  try {
    if (isPersistent) localStorage.removeItem(PREFIX + key);
  } catch { /* ignora */ }
  memory.delete(key);
}

/* Migração de esquema (hoje só registra a versão; aqui entrariam conversões futuras). */
if (read('schema', 0) !== SCHEMA_VERSION) write('schema', SCHEMA_VERSION);

/* ------------------------------------------------------------------------ */
/* Preferências (RF01)                                                       */
/* ------------------------------------------------------------------------ */

/**
 * @typedef {{interesses:string[], nivel:string, tempo:number, objetivo:string}} Prefs
 * @returns {Prefs|null}
 */
export const getPrefs = () => read('prefs', null);

/** @param {Prefs} prefs */
export const setPrefs = (prefs) => write('prefs', prefs);

export const isOnboardingDone = () => read('onboardingDone', false);
export const setOnboardingDone = () => write('onboardingDone', true);

/* ------------------------------------------------------------------------ */
/* Favoritos (RF03 / RF04)                                                   */
/* ------------------------------------------------------------------------ */

/** @returns {string[]} ids das pílulas favoritas, mais recentes primeiro */
export const getFavorites = () => read('favorites', []);

export const isFavorite = (id) => getFavorites().includes(id);

/** Adiciona um favorito (opcionalmente em uma posição, usado pelo "Desfazer"). */
export function addFavorite(id, index = 0) {
  const list = getFavorites().filter((f) => f !== id);
  list.splice(Math.min(index, list.length), 0, id);
  write('favorites', list);
}

/** Remove um favorito e devolve a posição que ele ocupava (para desfazer). */
export function removeFavorite(id) {
  const list = getFavorites();
  const index = list.indexOf(id);
  if (index >= 0) {
    list.splice(index, 1);
    write('favorites', list);
  }
  return index;
}

/* ------------------------------------------------------------------------ */
/* Histórico (RF05)                                                          */
/* ------------------------------------------------------------------------ */

/** @returns {{id:string, at:number}[]} */
export const getHistory = () => read('history', []);

/** Registra a abertura de uma pílula no topo do histórico (sem duplicar). */
export function addHistory(id) {
  const list = getHistory().filter((h) => h.id !== id);
  list.unshift({ id, at: Date.now() });
  write('history', list.slice(0, HISTORY_LIMIT));
}

export function removeHistory(id) {
  write('history', getHistory().filter((h) => h.id !== id));
}

export const clearHistory = () => write('history', []);

/** Restaura um histórico inteiro (usado pelo "Desfazer"). */
export const setHistory = (list) => write('history', list);

/* ------------------------------------------------------------------------ */
/* Progresso e gamificação (RF11 / RF12)                                     */
/* ------------------------------------------------------------------------ */

/**
 * @typedef {Object} Progress
 * @property {Object<string, number>} completed   id → timestamp de conclusão
 * @property {Object<string, true>} rewarded      ids que já renderam XP (evita "farm")
 * @property {Object<string, {best:number,total:number,at:number}>} quiz
 * @property {number} xp
 * @property {number} minutes                     minutos estudados
 * @property {string[]} activeDays                datas AAAA-MM-DD com atividade
 * @property {Object<string, number>} badges      id da conquista → timestamp
 */

/** @returns {Progress} */
export function emptyProgress() {
  return { completed: {}, rewarded: {}, quiz: {}, xp: 0, minutes: 0, activeDays: [], badges: {} };
}

/** @returns {Progress} */
export const getProgress = () => ({ ...emptyProgress(), ...read('progress', {}) });

/** @param {Progress} progress */
export const saveProgress = (progress) => write('progress', progress);

export const resetProgress = () => write('progress', emptyProgress());

/* ------------------------------------------------------------------------ */
/* Tema e tamanho da fonte (RF07 e acessibilidade)                           */
/* ------------------------------------------------------------------------ */

/** @returns {'light'|'dark'|null} */
export const getTheme = () => read('theme', null);
export const setTheme = (theme) => write('theme', theme);

/** @returns {'sm'|'md'|'lg'|'xl'} */
export const getFontScale = () => read('fontScale', 'md');
export const setFontScale = (scale) => write('fontScale', scale);

/* ------------------------------------------------------------------------ */
/* Buscas recentes (H6 — reconhecer em vez de lembrar)                       */
/* ------------------------------------------------------------------------ */

export const getRecentSearches = () => read('recentSearches', []);

export function addRecentSearch(term) {
  const clean = term.trim();
  if (clean.length < 2) return;
  const list = getRecentSearches().filter((t) => t.toLowerCase() !== clean.toLowerCase());
  list.unshift(clean);
  write('recentSearches', list.slice(0, RECENT_SEARCH_LIMIT));
}

/* ------------------------------------------------------------------------ */
/* Exportar / importar (backup do progresso em JSON)                         */
/* ------------------------------------------------------------------------ */

const EXPORT_KEYS = ['prefs', 'favorites', 'history', 'progress', 'theme', 'fontScale', 'onboardingDone'];

/** Gera um objeto com todos os dados do usuário. */
export function exportData() {
  const data = { app: 'pilulatech', schema: SCHEMA_VERSION, exportedAt: new Date().toISOString() };
  for (const key of EXPORT_KEYS) data[key] = read(key, null);
  return data;
}

/**
 * Valida e importa um backup. Lança Error com mensagem amigável se o arquivo for inválido.
 * @param {any} data
 */
export function importData(data) {
  if (!data || typeof data !== 'object' || data.app !== 'pilulatech') {
    throw new Error('Este arquivo não parece ser um backup do PílulaTech.');
  }
  if (typeof data.schema !== 'number' || data.schema > SCHEMA_VERSION) {
    throw new Error('Este backup foi gerado por uma versão mais nova do PílulaTech.');
  }
  if (data.favorites != null && !Array.isArray(data.favorites)) {
    throw new Error('A lista de favoritos do backup está corrompida.');
  }
  if (data.history != null && !Array.isArray(data.history)) {
    throw new Error('O histórico do backup está corrompido.');
  }
  if (data.progress != null && typeof data.progress !== 'object') {
    throw new Error('O progresso do backup está corrompido.');
  }
  for (const key of EXPORT_KEYS) {
    if (data[key] == null) remove(key);
    else write(key, data[key]);
  }
}
