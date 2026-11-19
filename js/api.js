/**
 * api.js — Consumo de APIs externas públicas (sem chave).
 *   - DEV.to: artigos recentes da comunidade por tag.
 *   - Wikipédia (pt): resumo de um termo do glossário.
 * Recursos: timeout com AbortController, cache em sessionStorage e erros com mensagem amigável (H9).
 */

const TIMEOUT_MS = 6000;
const CACHE_PREFIX = 'pilulatech:api:';

/** Erro com mensagem pronta para mostrar ao usuário. */
export class ApiError extends Error {
  /** @param {string} message @param {'timeout'|'offline'|'notfound'|'http'} kind */
  constructor(message, kind) {
    super(message);
    this.kind = kind;
  }
}

function cacheGet(key) {
  try {
    const raw = sessionStorage.getItem(CACHE_PREFIX + key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function cacheSet(key, value) {
  try { sessionStorage.setItem(CACHE_PREFIX + key, JSON.stringify(value)); } catch { /* ignora */ }
}

/**
 * GET em JSON com timeout e tradução de erros.
 * @param {string} url
 */
async function fetchJSON(url) {
  if (!navigator.onLine) {
    throw new ApiError('Você parece estar sem internet. Verifique sua conexão e tente novamente.', 'offline');
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { signal: controller.signal, headers: { Accept: 'application/json' } });
    if (res.status === 404) throw new ApiError('Não encontramos esse conteúdo na fonte externa.', 'notfound');
    if (!res.ok) throw new ApiError(`O serviço externo respondeu com erro (${res.status}). Tente novamente em instantes.`, 'http');
    return await res.json();
  } catch (err) {
    if (err instanceof ApiError) throw err;
    if (err.name === 'AbortError') {
      throw new ApiError('O serviço demorou demais para responder. Tente novamente.', 'timeout');
    }
    throw new ApiError('Não foi possível conectar ao serviço externo. Verifique sua conexão.', 'offline');
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Artigos recentes do DEV.to para uma tag.
 * @param {string} tag
 * @returns {Promise<{titulo:string, url:string, autor:string, leitura:number, data:string, reacoes:number}[]>}
 */
export async function getCommunityArticles(tag) {
  const key = `devto:${tag}`;
  const cached = cacheGet(key);
  if (cached) return cached;
  const data = await fetchJSON(`https://dev.to/api/articles?tag=${encodeURIComponent(tag)}&per_page=4&top=30`);
  const list = (Array.isArray(data) ? data : []).map((a) => ({
    titulo: String(a.title ?? ''),
    url: String(a.url ?? ''),
    autor: String(a.user?.name ?? 'Autor desconhecido'),
    leitura: Number(a.reading_time_minutes) || 0,
    data: String(a.readable_publish_date ?? ''),
    reacoes: Number(a.public_reactions_count) || 0
  })).filter((a) => a.url.startsWith('https://'));
  cacheSet(key, list);
  return list;
}

/**
 * Resumo de um termo na Wikipédia em português.
 * @param {string} term
 * @returns {Promise<{titulo:string, resumo:string, url:string}>}
 */
export async function getWikiSummary(term) {
  const key = `wiki:${term}`;
  const cached = cacheGet(key);
  if (cached) return cached;
  // A API REST resolve redirecionamentos (ex.: "Ransomware" → artigo correto).
  const title = encodeURIComponent(term.replace(/\s+/g, '_'));
  const data = await fetchJSON(`https://pt.wikipedia.org/api/rest_v1/page/summary/${title}?redirect=true`);
  if (data.type === 'disambiguation' || !data.extract) {
    throw new ApiError('A Wikipédia não tem um resumo direto para este termo.', 'notfound');
  }
  const result = {
    titulo: String(data.title ?? term),
    resumo: String(data.extract),
    url: String(data.content_urls?.desktop?.page ?? `https://pt.wikipedia.org/wiki/${title}`)
  };
  cacheSet(key, result);
  return result;
}
