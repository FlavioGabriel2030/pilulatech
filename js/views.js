/**
 * views.js — Telas (rotas) do PílulaTech.
 * Cada função render* recebe o container da view e a rota, desenha a tela e
 * devolve { title, cleanup? }. O roteador fica em app.js.
 */
import { TOPICS, CATEGORIES, LEVELS, REF_TYPES, getTopic, getCategory, topicsByCategory, buildGlossary } from './topics.js';
import * as store from './storage.js';
import { recommend } from './recommender.js';
import { completeTopic, uncompleteTopic, submitQuiz, stats, BADGES, USER_LEVELS, XP_PER_CORRECT, XP_COMPLETE } from './gamification.js';
import { getCommunityArticles, getWikiSummary } from './api.js';
import {
  $, $$, esc, icon, normalize, highlight, relativeTime, plural, announce,
  catStyle, levelBadge, categoryTag, readingTime, topicCard, emptyState, skeletonList,
  toast, openDialog, confirmDialog
} from './ui.js';

/** Funções fornecidas pelo app.js (evita dependência circular). */
const hooks = { rerender: () => {}, celebrate: () => {} };
export function initViews(h) { Object.assign(hooks, h); }

const EXTERNAL = 'target="_blank" rel="noopener noreferrer"';
const NEW_TAB = '<span class="visually-hidden"> (abre em nova aba)</span>';

/** Card com os estados atuais (favorito/concluída) já resolvidos. */
function card(topic, opts = {}) {
  const progress = store.getProgress();
  return topicCard(topic, { favorite: store.isFavorite(topic.id), done: !!progress.completed[topic.id], ...opts });
}

/* ========================================================================== */
/* INÍCIO                                                                      */
/* ========================================================================== */

/** ids já sugeridos nesta visita (para "Gerar outras sugestões"). */
const shownRecs = new Set();

function recommendationsHtml() {
  const recs = recommend({
    prefs: store.getPrefs(),
    completed: store.getProgress().completed,
    favorites: store.getFavorites(),
    history: store.getHistory()
  }, { exclude: shownRecs });
  recs.forEach((r) => shownRecs.add(r.topic.id));
  store.addRecHistory(recs.map((r) => r.topic.id)); // RF05: guarda as sugestões exibidas
  return recs.map((r) => card(r.topic, { reasons: r.reasons })).join('');
}

export function renderHome(view) {
  const prefs = store.getPrefs();
  const { done, totalTopics, level } = stats();
  const progress = store.getProgress();
  const last = store.getHistory().find((h) => !progress.completed[h.id] && getTopic(h.id));
  const lastTopic = last && getTopic(last.id);
  shownRecs.clear();

  const goalText = {
    carreira: 'Foco em carreira',
    faculdade: 'Foco em faculdade e provas',
    curiosidade: 'Foco em curiosidade'
  }[prefs?.objetivo] ?? '';

  view.innerHTML = `
    <section class="hero" aria-labelledby="home-title">
      <div>
        <p class="hero-eyebrow">${icon('sparkles', 'icon--sm')} Pílulas de 3 a 7 minutos</p>
        <h1 class="hero-title page-title" id="home-title">Aprenda tecnologia, uma pílula por vez</h1>
        <p class="hero-lead">Resumos diretos sobre redes, nuvem, segurança, dados, IA e muito mais — com fontes confiáveis para você se aprofundar.</p>
        <div class="hero-actions">
          <a class="btn btn--primary" href="#/topicos">Explorar pílulas ${icon('arrow-right')}</a>
          <button type="button" class="btn btn--secondary" data-action="open-onboarding">
            ${icon('sliders')} ${prefs ? 'Ajustar meus interesses' : 'Personalizar minha trilha'}
          </button>
        </div>
      </div>
      <dl class="hero-stats">
        <div class="hero-stat"><dt class="visually-hidden">Total de pílulas</dt><dd><strong>${totalTopics}</strong><span>pílulas</span></dd></div>
        <div class="hero-stat"><dt class="visually-hidden">Categorias</dt><dd><strong>${CATEGORIES.length}</strong><span>categorias</span></dd></div>
        <div class="hero-stat"><dt class="visually-hidden">Seu nível</dt><dd><strong>${done}</strong><span>${done === 1 ? 'concluída' : 'concluídas'} · ${esc(level.current.nome)}</span></dd></div>
      </dl>
    </section>

    ${lastTopic ? `
    <section class="section continue-card" aria-labelledby="continue-title">
      <div class="grow">
        <h2 id="continue-title">${icon('history', 'icon--sm')} Continue de onde parou</h2>
        <p>${esc(lastTopic.titulo)}</p>
        <span class="meta-item">Aberta ${relativeTime(last.at)} · ${lastTopic.tempoLeitura} min de leitura</span>
      </div>
      <a class="btn btn--secondary" href="#/topico/${lastTopic.id}">Continuar leitura ${icon('arrow-right')}</a>
    </section>` : ''}

    <section class="section" aria-labelledby="rec-title">
      <div class="section-header">
        <div>
          <h2 class="section-title" id="rec-title">Pílulas para você</h2>
          <p class="section-sub">${prefs
            ? `Com base nos seus interesses${goalText ? ` · ${goalText}` : ''}. <a href="#/preferencias">Editar preferências</a>`
            : 'Sugestões para começar. <button type="button" class="btn btn--ghost btn--sm" data-action="open-onboarding">Personalize em 3 passos</button>'}</p>
        </div>
        <button type="button" class="btn btn--secondary btn--sm" id="btn-more-recs">${icon('refresh', 'icon--sm')} Gerar outras sugestões</button>
      </div>
      <div class="card-grid" id="rec-grid">${recommendationsHtml()}</div>
    </section>

    <section class="section" aria-labelledby="cat-title">
      <div class="section-header">
        <div>
          <h2 class="section-title" id="cat-title">Explore por categoria</h2>
          <p class="section-sub">A barra mostra quantas pílulas você já concluiu em cada área.</p>
        </div>
      </div>
      <div class="cat-grid">
        ${CATEGORIES.map((c) => {
          const list = topicsByCategory(c.id);
          const doneHere = list.filter((t) => progress.completed[t.id]).length;
          const pct = Math.round((doneHere / list.length) * 100);
          return `
          <a class="cat-tile" style="${catStyle(c.id)}" href="#/topicos?cat=${c.id}">
            <span class="cat-tile-icon">${icon(c.icone, 'icon--lg')}</span>
            <span class="cat-tile-name">${esc(c.nome)}</span>
            <span class="cat-tile-meta">${plural(list.length, 'pílula', 'pílulas')} · ${doneHere} ${doneHere === 1 ? 'concluída' : 'concluídas'}</span>
            <span class="progress" role="img" aria-label="${pct}% concluído"><span class="progress-bar" style="width:${pct}%"></span></span>
          </a>`;
        }).join('')}
      </div>
    </section>`;

  $('#btn-more-recs', view).addEventListener('click', () => {
    $('#rec-grid', view).innerHTML = recommendationsHtml();
    announce('Novas sugestões carregadas.');
  });

  return { title: '' };
}

/* ========================================================================== */
/* LISTA DE TÓPICOS (busca, filtros e ordenação)                               */
/* ========================================================================== */

const SORTS = {
  relevancia: 'Relevância',
  az: 'Nome (A–Z)',
  tempo: 'Menor tempo de leitura',
  nivel: 'Nível (iniciante → avançado)'
};

/** Estado atual dos filtros (espelhado na URL para permitir deep links). */
let filters = { q: '', cat: [], nivel: [], ordem: 'relevancia' };

function filtersFromQuery(query) {
  const list = (k) => (query.get(k) || '').split(',').filter(Boolean);
  return {
    q: query.get('q') || '',
    cat: list('cat').filter((c) => getCategory(c)),
    nivel: list('nivel').filter((n) => LEVELS[n]),
    ordem: SORTS[query.get('ordem')] ? query.get('ordem') : 'relevancia'
  };
}

function syncUrl() {
  const p = new URLSearchParams();
  if (filters.q) p.set('q', filters.q);
  if (filters.cat.length) p.set('cat', filters.cat.join(','));
  if (filters.nivel.length) p.set('nivel', filters.nivel.join(','));
  if (filters.ordem !== 'relevancia') p.set('ordem', filters.ordem);
  const qs = p.toString().replace(/%2C/g, ',');
  history.replaceState(null, '', `#/topicos${qs ? `?${qs}` : ''}`);
}

/** Pontua a relevância de uma pílula para a busca. 0 = não corresponde. */
function searchScore(topic, q) {
  if (!q) return 1;
  const n = normalize(q).trim();
  let score = 0;
  if (normalize(topic.titulo).includes(n)) score += 5;
  if (topic.tags.some((t) => normalize(t).includes(n))) score += 3;
  if (normalize(topic.resumo).includes(n)) score += 2;
  if (topic.conceitosChave.some((c) => normalize(c.termo).includes(n))) score += 2;
  if (topic.tecnologiasFundamentais.some((t) => normalize(t.nome).includes(n))) score += 1;
  if (normalize(getCategory(topic.categoria).nome).includes(n)) score += 1;
  return score;
}

function filteredTopics() {
  let list = TOPICS
    .filter((t) => !filters.cat.length || filters.cat.includes(t.categoria))
    .filter((t) => !filters.nivel.length || filters.nivel.includes(t.nivel))
    .map((t) => ({ t, s: searchScore(t, filters.q) }))
    .filter((x) => x.s > 0);

  const byTitle = (a, b) => a.t.titulo.localeCompare(b.t.titulo, 'pt-BR');
  if (filters.ordem === 'az') list.sort(byTitle);
  else if (filters.ordem === 'tempo') list.sort((a, b) => a.t.tempoLeitura - b.t.tempoLeitura || byTitle(a, b));
  else if (filters.ordem === 'nivel') list.sort((a, b) => LEVELS[a.t.nivel].ordem - LEVELS[b.t.nivel].ordem || byTitle(a, b));
  else if (filters.q) list.sort((a, b) => b.s - a.s || byTitle(a, b));
  return list.map((x) => x.t);
}

const hasActiveFilters = () => !!(filters.q || filters.cat.length || filters.nivel.length);

function activeFiltersHtml() {
  if (!hasActiveFilters()) return '';
  const chip = (label, type, value) => `
    <button type="button" class="chip" data-remove-filter="${type}" data-value="${esc(value)}" aria-label="Remover filtro ${esc(label)}">
      ${esc(label)} ${icon('x', 'icon--sm')}
    </button>`;
  return `
    <span class="muted">Filtros ativos:</span>
    ${filters.q ? chip(`Busca: “${filters.q}”`, 'q', '') : ''}
    ${filters.cat.map((c) => chip(getCategory(c).nome, 'cat', c)).join('')}
    ${filters.nivel.map((n) => chip(LEVELS[n].nome, 'nivel', n)).join('')}
    <button type="button" class="btn btn--ghost btn--sm" data-action="clear-filters">${icon('x-circle', 'icon--sm')} Limpar filtros</button>`;
}

/** Atualiza só os resultados (mantém o foco onde o usuário está). */
function updateResults(view) {
  const results = filteredTopics();
  const count = $('#results-count', view);
  const n = results.length;
  const base = `${plural(n, 'pílula encontrada', 'pílulas encontradas')}`;
  count.textContent = filters.q ? `${base} para “${filters.q}”` : base;

  $('#active-filters', view).innerHTML = activeFiltersHtml();
  $$('[data-filter]', view).forEach((b) => {
    const list = filters[b.dataset.filter];
    b.setAttribute('aria-pressed', String(list.includes(b.dataset.value)));
  });
  const nActive = filters.cat.length + filters.nivel.length;
  $('[data-filter-count]', view).textContent = nActive ? `(${nActive})` : '';
  $('#sort', view).value = filters.ordem;

  const grid = $('#results', view);
  if (n) {
    grid.className = 'card-grid';
    // h2: os cards vêm logo depois do h1 da página (hierarquia de títulos sem saltos)
    grid.innerHTML = results.map((t) => card(t, { query: filters.q, headingLevel: 2 })).join('');
  } else {
    grid.className = '';
    const suggestions = ['redes', 'nuvem', 'ciberseguranca', 'machine-learning'].map(getTopic);
    grid.innerHTML = emptyState({
      icon: 'search',
      title: 'Nenhuma pílula encontrada',
      text: `${filters.q ? `Não encontramos resultados para “${esc(filters.q)}”` : 'Nenhuma pílula combina com esses filtros'}. Tente um termo mais geral, verifique a ortografia ou remova alguns filtros.`,
      actionsHtml: `
        <button type="button" class="btn btn--primary" data-action="clear-filters">Limpar filtros e busca</button>
        <p class="muted">Ou comece por uma destas:</p>
        <div class="chip-list">${suggestions.map((t) => `<a class="chip" href="#/topico/${t.id}">${esc(t.titulo)}</a>`).join('')}</div>`
    });
  }
  syncUrl();
}

export function renderTopics(view, route) {
  filters = filtersFromQuery(route.query);
  const searchInput = $('#search');
  if (searchInput && searchInput.value !== filters.q) searchInput.value = filters.q;

  view.innerHTML = `
    <header class="page-header">
      <h1 class="page-title">Todas as pílulas</h1>
      <p class="page-lead">Filtre por categoria e nível, ou use a busca no topo (atalho <kbd>/</kbd>). Os filtros podem ser combinados e ficam salvos no link, para você compartilhar.</p>
    </header>
    <div class="list-layout">
      <button type="button" class="btn btn--secondary filters-toggle" aria-expanded="false" aria-controls="filters">
        ${icon('filter')} Filtros <span data-filter-count></span>
      </button>
      <aside id="filters" class="filters is-collapsed" aria-label="Filtros">
        <fieldset class="filters-group">
          <legend class="filters-title">Categoria</legend>
          <div class="chip-list">
            ${CATEGORIES.map((c) => `
              <button type="button" class="chip" data-filter="cat" data-value="${c.id}" aria-pressed="false" style="${catStyle(c.id)}">
                <span class="chip-dot" aria-hidden="true"></span>${esc(c.nome)}
              </button>`).join('')}
          </div>
        </fieldset>
        <fieldset class="filters-group">
          <legend class="filters-title">Nível</legend>
          <div class="chip-list">
            ${Object.entries(LEVELS).map(([id, l]) => `
              <button type="button" class="chip" data-filter="nivel" data-value="${id}" aria-pressed="false">${esc(l.nome)}</button>`).join('')}
          </div>
        </fieldset>
      </aside>
      <div>
        <div class="results-bar">
          <p class="results-count" id="results-count" role="status" aria-live="polite"></p>
          <div class="sort-field">
            <label class="field-label" for="sort">Ordenar por</label>
            <select class="select" id="sort">
              ${Object.entries(SORTS).map(([k, v]) => `<option value="${k}">${v}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="active-filters" id="active-filters"></div>
        <div id="results" class="card-grid"></div>
      </div>
    </div>`;

  const toggle = $('.filters-toggle', view);
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    $('#filters', view).classList.toggle('is-collapsed', open);
  });

  view.addEventListener('click', (e) => {
    const f = e.target.closest('[data-filter]');
    if (f) {
      const list = filters[f.dataset.filter];
      const i = list.indexOf(f.dataset.value);
      if (i >= 0) list.splice(i, 1); else list.push(f.dataset.value);
      updateResults(view);
      return;
    }
    const r = e.target.closest('[data-remove-filter]');
    if (r) {
      const type = r.dataset.removeFilter;
      if (type === 'q') { filters.q = ''; $('#search').value = ''; }
      else filters[type] = filters[type].filter((v) => v !== r.dataset.value);
      updateResults(view);
      $('.page-title', view).focus();
      announce('Filtro removido.');
      return;
    }
    if (e.target.closest('[data-action="clear-filters"]')) {
      filters = { q: '', cat: [], nivel: [], ordem: filters.ordem };
      $('#search').value = '';
      updateResults(view);
      announce('Filtros limpos. Mostrando todas as pílulas.');
      $('.page-title', view).focus();
    }
  });

  $('#sort', view).addEventListener('change', (e) => {
    filters.ordem = e.target.value;
    updateResults(view);
  });

  updateResults(view);
  return { title: filters.q ? `Busca: ${filters.q}` : 'Todas as pílulas' };
}

/** Chamado pelo campo de busca do cabeçalho quando já estamos na lista. */
export function setSearch(view, q) {
  filters.q = q;
  updateResults(view);
}

/* ========================================================================== */
/* PÁGINA DA PÍLULA                                                            */
/* ========================================================================== */

const SECTIONS = [
  ['sec-pincelada', 'Pincelada geral', 'sparkles'],
  ['sec-conceitos', 'Conceitos-chave', 'list'],
  ['sec-tecnologias', 'Tecnologias fundamentais', 'cpu'],
  ['sec-curiosidade', 'Curiosidade e carreira', 'lightbulb'],
  ['sec-referencias', 'Para se aprofundar', 'book'],
  ['sec-quiz', 'Teste rápido', 'target'],
  ['sec-comunidade', 'Da comunidade agora', 'users'],
  ['sec-relacionadas', 'Pílulas relacionadas', 'layers']
];

const section = (id, body, sub = '') => {
  const [, title, ic] = SECTIONS.find((s) => s[0] === id);
  return `
    <section class="topic-section" id="${id}" aria-labelledby="${id}-h">
      <h2 id="${id}-h">${icon(ic)} ${title}</h2>
      ${sub ? `<p class="section-sub" style="margin-top:calc(-1 * var(--space-3)); margin-bottom: var(--space-4)">${sub}</p>` : ''}
      ${body}
    </section>`;
};

function completeButtonHtml(done) {
  return done
    ? `${icon('check-circle')}<span>Concluída</span>`
    : `${icon('check')}<span>Marcar como concluída</span>`;
}

function favButtonInner(fav) {
  return `${icon('bookmark')}<span class="fav-text">${fav ? 'Salva nos favoritos' : 'Salvar nos favoritos'}</span>`;
}

function quizHtml(topic) {
  const best = store.getProgress().quiz[topic.id];
  return `
    <form class="quiz" id="quiz-form" novalidate>
      <p class="field-hint">Responda às ${topic.quiz.length} perguntas e clique em “Verificar respostas”. Cada novo acerto vale ${XP_PER_CORRECT} XP.
        ${best ? `<br><strong>Seu melhor resultado:</strong> ${best.best} de ${best.total}.` : ''}</p>
      ${topic.quiz.map((q, qi) => `
        <fieldset class="quiz-question" data-q="${qi}">
          <legend>${qi + 1}. ${esc(q.pergunta)}</legend>
          <div class="quiz-options">
            ${q.alternativas.map((alt, ai) => `
              <label class="quiz-option">
                <input type="radio" name="q${qi}" value="${ai}">
                <span>${esc(alt)}</span>
              </label>`).join('')}
          </div>
          <p class="quiz-feedback" hidden></p>
        </fieldset>`).join('')}
      <div class="quiz-actions">
        <button type="submit" class="btn btn--primary" id="quiz-submit">${icon('check')} Verificar respostas</button>
        <p class="field-hint" id="quiz-status" aria-live="polite">0 de ${topic.quiz.length} respondidas</p>
      </div>
      <div class="quiz-result" id="quiz-result" role="status" hidden></div>
    </form>`;
}

function setupQuiz(view, topic) {
  const form = $('#quiz-form', view);
  const status = $('#quiz-status', view);
  const total = topic.quiz.length;
  const answered = () => topic.quiz.filter((_, i) => form.querySelector(`input[name="q${i}"]:checked`)).length;
  let graded = false;

  form.addEventListener('change', () => {
    if (graded) return;
    status.className = 'field-hint';
    status.textContent = `${answered()} de ${total} respondidas`;
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (graded) { // "Tentar de novo"
      $('#sec-quiz', view).querySelector('#quiz-form').outerHTML = quizHtml(topic);
      setupQuiz(view, topic);
      $('#quiz-form input', view).focus();
      return;
    }
    const missing = topic.quiz.findIndex((_, i) => !form.querySelector(`input[name="q${i}"]:checked`));
    if (missing >= 0) { // H5/H9: explica o que falta e leva até lá
      status.innerHTML = `${icon('alert', 'icon--sm')} Falta responder ${plural(total - answered(), 'pergunta', 'perguntas')}. Levamos você até a próxima.`;
      status.className = 'form-error';
      form.querySelector(`input[name="q${missing}"]`).focus();
      return;
    }
    let correct = 0;
    topic.quiz.forEach((q, i) => {
      const fs = form.querySelector(`[data-q="${i}"]`);
      const chosen = Number(form.querySelector(`input[name="q${i}"]:checked`).value);
      const ok = chosen === q.correta;
      if (ok) correct += 1;
      $$('.quiz-option', fs).forEach((label, ai) => {
        label.querySelector('input').disabled = true;
        if (ai === q.correta) {
          label.classList.add('is-correct');
          label.insertAdjacentHTML('beforeend', `<span class="result-icon">${icon('check-circle')}<span class="visually-hidden">Resposta correta</span></span>`);
        } else if (ai === chosen) {
          label.classList.add('is-wrong');
          label.insertAdjacentHTML('beforeend', `<span class="result-icon">${icon('x-circle')}<span class="visually-hidden">Sua resposta, incorreta</span></span>`);
        }
      });
      const fb = fs.querySelector('.quiz-feedback');
      fb.hidden = false;
      fb.innerHTML = `<strong>${ok ? 'Acertou!' : 'Não foi dessa vez.'}</strong> ${esc(q.explicacao)}`;
    });
    graded = true;
    const res = submitQuiz(topic.id, correct, total);
    const result = $('#quiz-result', view);
    result.hidden = false;
    result.innerHTML = `${icon(correct === total ? 'trophy' : 'target', 'icon--lg')}
      <span>Você acertou ${correct} de ${total}${res.xpGained ? ` · +${res.xpGained} XP` : ''}.
      ${correct === total ? 'Mandou muito bem!' : 'Revise as explicações e tente de novo quando quiser.'}</span>`;
    status.className = 'field-hint';
    status.textContent = '';
    const btn = $('#quiz-submit', view);
    btn.className = 'btn btn--secondary';
    btn.innerHTML = `${icon('refresh')} Tentar de novo`;
    hooks.celebrate(res);
  });
}

async function loadCommunity(view, topic) {
  const box = $('#community', view);
  if (!box) return;
  box.setAttribute('aria-busy', 'true');
  box.innerHTML = `<div class="stack">${skeletonList(3)}</div><p class="visually-hidden">Carregando artigos…</p>`;
  try {
    const articles = await getCommunityArticles(topic.devtoTag);
    if (!box.isConnected) return;
    box.innerHTML = articles.length
      ? `<ul class="community-list">${articles.map((a) => `
          <li class="community-item"><a href="${esc(a.url)}" ${EXTERNAL}>
            <strong>${esc(a.titulo)}</strong>${NEW_TAB}
            <span>${esc(a.autor)} · ${esc(a.data)} · ${a.leitura} min · ${a.reacoes} reações</span>
          </a></li>`).join('')}</ul>
         <p class="source-credit">Fonte: API pública do <a href="https://dev.to/t/${esc(topic.devtoTag)}" ${EXTERNAL}>DEV.to (#${esc(topic.devtoTag)})${NEW_TAB}</a>. Conteúdo em inglês, escrito pela comunidade.</p>`
      : `<p class="muted">Nenhum artigo recente com a tag #${esc(topic.devtoTag)} agora. As referências acima são um ótimo próximo passo.</p>`;
  } catch (err) {
    if (!box.isConnected) return;
    box.innerHTML = `
      <div class="callout callout--info">${icon('alert')}
        <div class="stack">
          <p><strong>Não foi possível carregar os artigos da comunidade.</strong> ${esc(err.message)}</p>
          <button type="button" class="btn btn--secondary btn--sm" data-action="retry-community">${icon('refresh', 'icon--sm')} Tentar novamente</button>
        </div>
      </div>`;
    box.querySelector('[data-action="retry-community"]').addEventListener('click', () => loadCommunity(view, topic));
  } finally {
    box.setAttribute('aria-busy', 'false');
  }
}

export function renderTopic(view, route) {
  const topic = getTopic(route.param);
  if (!topic) return renderNotFound(view, route);

  store.addHistory(topic.id);
  const cat = getCategory(topic.categoria);
  const progress = store.getProgress();
  const done = !!progress.completed[topic.id];
  const fav = store.isFavorite(topic.id);

  view.innerHTML = `
    <nav class="breadcrumb" aria-label="Você está em">
      <ol>
        <li><a href="#/inicio">Início</a></li>
        <li><a href="#/topicos?cat=${cat.id}">${esc(cat.nome)}</a></li>
        <li><span aria-current="page">${esc(topic.titulo)}</span></li>
      </ol>
    </nav>
    <div class="topic-layout">
      <article id="topic-article" aria-labelledby="topic-title">
        <header class="topic-header" style="${catStyle(cat.id)}">
          <span class="topic-icon">${icon(cat.icone, 'icon--lg')}</span>
          <h1 class="page-title" id="topic-title">${esc(topic.titulo)}</h1>
          <p class="topic-lead">${esc(topic.resumo)}</p>
          <div class="topic-meta">
            ${categoryTag(cat.id, true)}
            ${levelBadge(topic.nivel)}
            ${readingTime(topic.tempoLeitura)}
          </div>
          <div class="topic-actions">
            <button type="button" class="btn ${done ? 'btn--success' : 'btn--primary'}" id="btn-complete" aria-pressed="${done}">
              ${completeButtonHtml(done)}
            </button>
            <button type="button" class="btn btn--secondary btn--toggle" data-action="toggle-fav" data-id="${topic.id}" aria-pressed="${fav}">
              ${favButtonInner(fav)}
            </button>
          </div>
        </header>

        ${section('sec-pincelada', `<div class="prose">${topic.pincelada.map((p) => `<p>${esc(p)}</p>`).join('')}</div>`)}

        ${section('sec-conceitos', `<dl class="concept-list">${topic.conceitosChave.map((c) => `
          <div><dt>${esc(c.termo)}</dt><dd>${esc(c.definicao)}</dd></div>`).join('')}</dl>`)}

        ${section('sec-tecnologias', `<ul class="tech-list">${topic.tecnologiasFundamentais.map((t) => `
          <li class="tech-item">
            <h3>${esc(t.nome)}</h3>
            <p>${esc(t.descricao)}</p>
            <a href="${esc(t.url)}" ${EXTERNAL}>Site oficial ${icon('external', 'icon--sm')}${NEW_TAB}</a>
          </li>`).join('')}</ul>`)}

        ${section('sec-curiosidade', `
          <div class="stack">
            <div class="callout callout--tip">${icon('lightbulb')}<div><strong>Você sabia?</strong><p>${esc(topic.curiosidade)}</p></div></div>
            <div class="callout callout--info">${icon('briefcase')}<div><strong>Carreira</strong><p>${esc(topic.carreira)}</p></div></div>
          </div>`)}

        ${section('sec-referencias', `<ul class="ref-list">${topic.referencias.map((r) => {
          const type = REF_TYPES[r.tipo] ?? REF_TYPES.artigo;
          return `
          <li class="ref-item"><a href="${esc(r.url)}" ${EXTERNAL}>
            <span class="ref-type" title="${type.nome}">${icon(type.icone)}</span>
            <span><span class="ref-title">${esc(r.titulo)}</span>
              <span class="ref-source">${type.nome} · ${esc(r.fonte)} · ${r.idioma === 'pt' ? 'Português' : 'Inglês'}</span></span>
            <span class="ref-ext">${icon('external', 'icon--sm')}</span>${NEW_TAB}
          </a></li>`;
        }).join('')}</ul>`, 'Fontes oficiais e reconhecidas, selecionadas para quem quer ir além da pílula.')}

        ${section('sec-quiz', quizHtml(topic), 'Fixe o conteúdo com 3 perguntas rápidas.')}

        ${section('sec-comunidade', '<div id="community" aria-live="polite"></div>', `Artigos recentes publicados no DEV.to com a tag #${esc(topic.devtoTag)}.`)}

        ${section('sec-relacionadas', `<div class="card-grid">${topic.relacionados.map(getTopic).filter(Boolean).map((t) => card(t)).join('')}</div>`)}
      </article>

      <aside class="toc" aria-label="Nesta pílula">
        <h2>Nesta pílula</h2>
        <ol>${SECTIONS.map(([id, title]) => `<li><a href="#${id}">${title}</a></li>`).join('')}</ol>
      </aside>
    </div>`;

  // Concluir / desmarcar
  const btn = $('#btn-complete', view);
  btn.addEventListener('click', () => {
    const isDone = btn.getAttribute('aria-pressed') === 'true';
    if (isDone) {
      uncompleteTopic(topic.id);
      toast('Pílula desmarcada como concluída.', { action: { label: 'Desfazer', onClick: () => btn.click() } });
    } else {
      const res = completeTopic(topic.id);
      toast(res.xpGained ? `Pílula concluída! +${res.xpGained} XP` : 'Pílula marcada como concluída.', { type: 'success' });
      hooks.celebrate(res);
    }
    btn.setAttribute('aria-pressed', String(!isDone));
    btn.className = `btn ${!isDone ? 'btn--success' : 'btn--primary'}`;
    btn.innerHTML = completeButtonHtml(!isDone);
  });

  setupQuiz(view, topic);
  loadCommunity(view, topic);

  // Sumário: destaca a seção visível
  const links = $$('.toc a', view);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === `#${entry.target.id}`));
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });
  $$('.topic-section', view).forEach((s) => observer.observe(s));

  return { title: topic.titulo, readingProgress: true, cleanup: () => observer.disconnect() };
}

/** Atualiza botões de favorito (cards e página) após alternar. */
export function updateFavButtons(id, fav) {
  const topic = getTopic(id);
  $$(`[data-action="toggle-fav"][data-id="${id}"]`).forEach((b) => {
    b.setAttribute('aria-pressed', String(fav));
    if (b.classList.contains('card-fav')) {
      b.setAttribute('aria-label', fav ? `Remover "${topic.titulo}" dos favoritos` : `Salvar "${topic.titulo}" nos favoritos`);
      b.title = fav ? 'Remover dos favoritos' : 'Salvar nos favoritos';
    } else {
      b.innerHTML = favButtonInner(fav);
    }
  });
}

/* ========================================================================== */
/* FAVORITOS                                                                   */
/* ========================================================================== */

export function renderFavorites(view) {
  const favs = store.getFavorites().map(getTopic).filter(Boolean);
  view.innerHTML = `
    <header class="page-header">
      <h1 class="page-title">Meus favoritos</h1>
      <p class="page-lead">${favs.length
        ? `Você salvou ${plural(favs.length, 'pílula', 'pílulas')}. Toque no marcador de um card para removê-lo — dá para desfazer.`
        : 'Guarde aqui as pílulas que você quer reler ou estudar depois.'}</p>
    </header>
    ${favs.length
      ? `<div class="card-grid">${favs.map((t) => card(t, { headingLevel: 2 })).join('')}</div>`
      : emptyState({
          icon: 'bookmark',
          title: 'Você ainda não tem favoritos',
          text: `Toque no ícone de marcador ${icon('bookmark', 'icon--sm')} em qualquer pílula para salvá-la aqui.`,
          actionsHtml: '<a class="btn btn--primary" href="#/topicos">Explorar pílulas</a>'
        })}`;
  return { title: 'Favoritos' };
}

/* ========================================================================== */
/* HISTÓRICO                                                                   */
/* ========================================================================== */

function historyGroup(ts) {
  const d = new Date(ts);
  const today = new Date();
  const yesterday = new Date(); yesterday.setDate(today.getDate() - 1);
  if (d.toDateString() === today.toDateString()) return 'Hoje';
  if (d.toDateString() === yesterday.toDateString()) return 'Ontem';
  return 'Anteriormente';
}

export function renderHistory(view) {
  const items = store.getHistory().filter((h) => getTopic(h.id));
  const groups = new Map();
  items.forEach((h) => {
    const g = historyGroup(h.at);
    if (!groups.has(g)) groups.set(g, []);
    groups.get(g).push(h);
  });
  const completed = store.getProgress().completed;
  // Conjuntos de sugestões recebidas, ignorando pílulas que não existam mais
  const recBatches = store.getRecHistory()
    .map((b) => ({ ...b, topics: b.ids.map(getTopic).filter(Boolean) }))
    .filter((b) => b.topics.length);
  const hasAny = items.length || recBatches.length;

  view.innerHTML = `
    <header class="page-header">
      <div class="section-header">
        <div>
          <h1 class="page-title">Histórico</h1>
          <p class="page-lead">As pílulas que você abriu e as sugestões que recebeu, guardadas só neste navegador.</p>
        </div>
        ${hasAny ? `<button type="button" class="btn btn--danger-outline" id="btn-clear-history">${icon('trash')} Limpar histórico</button>` : ''}
      </div>
    </header>

    <section aria-labelledby="hist-opened">
      <h2 class="section-title" id="hist-opened">Pílulas abertas</h2>
      <p class="section-sub">${items.length ? `${plural(items.length, 'pílula aberta', 'pílulas abertas')} recentemente. ` : ''}Guardamos as últimas 20.</p>
    ${items.length ? [...groups].map(([g, list]) => `
      <h3 class="history-group-title">${g}</h3>
      <ul class="history-list">
        ${list.map((h) => {
          const t = getTopic(h.id);
          const c = getCategory(t.categoria);
          return `
          <li class="history-item" style="${catStyle(c.id)}">
            ${icon(c.icone)}
            <div>
              <a href="#/topico/${t.id}">${esc(t.titulo)}</a>
              <small>${esc(c.nome)} · aberta ${relativeTime(h.at)}${completed[t.id] ? ' · concluída' : ''}</small>
            </div>
            <button type="button" class="btn-icon" data-remove-history="${t.id}" aria-label="Remover “${esc(t.titulo)}” do histórico" title="Remover do histórico">${icon('x')}</button>
          </li>`;
        }).join('')}
      </ul>`).join('')
    : `<p class="muted" style="margin-top:var(--space-4)">Você ainda não abriu nenhuma pílula. <a href="#/topicos">Ver todas as pílulas</a></p>`}
    </section>

    <section class="section" aria-labelledby="hist-recs">
      <h2 class="section-title" id="hist-recs">Sugestões que você recebeu</h2>
      <p class="section-sub">Cada linha é um conjunto de “Pílulas para você” exibido na página inicial. Guardamos os últimos 10.</p>
      ${recBatches.length ? `
      <ul class="history-list" style="margin-top:var(--space-4)">
        ${recBatches.map((b) => `
          <li class="history-item history-item--recs">
            ${icon('sparkles')}
            <div>
              <small>Sugeridas ${relativeTime(b.at)}</small>
              <ul class="chip-list" style="list-style:none;padding:0;margin-top:var(--space-1)">
                ${b.topics.map((t) => `<li><a class="chip" href="#/topico/${t.id}">${completed[t.id] ? `${icon('check', 'icon--sm')}<span class="visually-hidden">Concluída: </span>` : ''}${esc(t.titulo)}</a></li>`).join('')}
              </ul>
            </div>
          </li>`).join('')}
      </ul>`
      : `<p class="muted" style="margin-top:var(--space-4)">As sugestões aparecem aqui depois que você visita a <a href="#/inicio">página inicial</a>.</p>`}
    </section>`;

  if (!hasAny) {
    view.innerHTML = `
      <header class="page-header"><h1 class="page-title">Histórico</h1></header>
      ${emptyState({
        icon: 'history',
        title: 'Seu histórico está vazio',
        text: 'Quando você abrir uma pílula ou receber sugestões na página inicial, elas aparecem aqui para você voltar rapidamente.',
        actionsHtml: '<a class="btn btn--primary" href="#/topicos">Ver todas as pílulas</a>'
      })}`;
  }

  $('#btn-clear-history', view)?.addEventListener('click', async () => {
    const ok = await confirmDialog({
      title: 'Limpar todo o histórico?',
      message: `Isso remove ${plural(items.length, 'pílula aberta', 'pílulas abertas')} e ${plural(recBatches.length, 'conjunto de sugestões', 'conjuntos de sugestões')}. Seus favoritos e seu progresso não serão afetados.`,
      confirmLabel: 'Limpar histórico',
      danger: true
    });
    if (!ok) return;
    const backup = store.getHistory();
    const recBackup = store.getRecHistory();
    store.clearHistory();
    store.setRecHistory([]);
    hooks.rerender();
    toast('Histórico limpo.', {
      action: { label: 'Desfazer', onClick: () => { store.setHistory(backup); store.setRecHistory(recBackup); hooks.rerender(); } }
    });
  });

  view.querySelectorAll('[data-remove-history]').forEach((b) => b.addEventListener('click', () => {
    const backup = store.getHistory();
    const t = getTopic(b.dataset.removeHistory);
    store.removeHistory(t.id);
    hooks.rerender();
    toast(`“${t.titulo}” removida do histórico.`, { action: { label: 'Desfazer', onClick: () => { store.setHistory(backup); hooks.rerender(); } } });
  }));

  return { title: 'Histórico' };
}

/* ========================================================================== */
/* MEU PROGRESSO                                                               */
/* ========================================================================== */

export function renderProgress(view) {
  const s = stats();
  const p = s.progress;
  const { current, next, pct, toNext } = s.level;

  view.innerHTML = `
    <header class="page-header">
      <h1 class="page-title">Meu progresso</h1>
      <p class="page-lead">Conclua pílulas (+${XP_COMPLETE} XP) e acerte quizzes (+${XP_PER_CORRECT} XP por acerto) para subir de nível e desbloquear conquistas.</p>
    </header>

    <section class="level-card" aria-labelledby="lvl-title">
      <div class="level-card-top">
        <span class="level-medal">${icon('award', 'icon--lg')}</span>
        <div>
          <p class="muted">Seu nível</p>
          <h2 class="level-name" id="lvl-title">${esc(current.nome)}</h2>
          <p><strong>${p.xp} XP</strong>${next ? ` · faltam ${toNext} XP para <strong>${esc(next.nome)}</strong>` : ' · nível máximo alcançado!'}</p>
        </div>
      </div>
      <div class="progress" role="progressbar" aria-label="Progresso até o próximo nível" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}" aria-valuetext="${pct}%">
        <span class="progress-bar" style="width:${pct}%"></span>
      </div>
      <p class="muted" style="font-size:var(--fs-sm)">Níveis: ${USER_LEVELS.map((l) => `${esc(l.nome)} (${l.min} XP)`).join(' → ')}</p>
    </section>

    <section class="section" aria-labelledby="stats-title">
      <h2 class="section-title" id="stats-title" style="margin-bottom:var(--space-4)">Estatísticas</h2>
      <div class="stats-grid">
        <div class="stat">${icon('check-circle', 'stat-icon')}<strong class="stat-value">${s.done}/${s.totalTopics}</strong><span class="stat-label">pílulas concluídas</span></div>
        <div class="stat">${icon('clock', 'stat-icon')}<strong class="stat-value">${s.minutes}</strong><span class="stat-label">minutos de estudo</span></div>
        <div class="stat">${icon('target', 'stat-icon')}<strong class="stat-value">${s.accuracy == null ? '—' : `${s.accuracy}%`}</strong><span class="stat-label">acertos nos quizzes</span></div>
        <div class="stat">${icon('flame', 'stat-icon')}<strong class="stat-value">${s.streak}</strong><span class="stat-label">${s.streak === 1 ? 'dia seguido' : 'dias seguidos'}</span></div>
      </div>
    </section>

    <section class="section" aria-labelledby="catp-title">
      <h2 class="section-title" id="catp-title" style="margin-bottom:var(--space-4)">Progresso por categoria</h2>
      <ul class="cat-progress-list">
        ${CATEGORIES.map((c) => {
          const list = topicsByCategory(c.id);
          const d = list.filter((t) => p.completed[t.id]).length;
          const pc = Math.round((d / list.length) * 100);
          return `
          <li style="${catStyle(c.id)}">
            <div class="cat-progress-head"><span>${icon(c.icone)} <a href="#/topicos?cat=${c.id}">${esc(c.nome)}</a></span><span>${d} de ${list.length} · ${pc}%</span></div>
            <div class="progress" role="img" aria-label="${esc(c.nome)}: ${pc}% concluído"><span class="progress-bar" style="width:${pc}%"></span></div>
          </li>`;
        }).join('')}
      </ul>
    </section>

    <section class="section" aria-labelledby="badges-title">
      <h2 class="section-title" id="badges-title">Conquistas</h2>
      <p class="section-sub" style="margin-bottom:var(--space-4)">${Object.keys(p.badges).length} de ${BADGES.length} desbloqueadas. As bloqueadas mostram o que fazer para ganhá-las.</p>
      <ul class="badge-grid">
        ${BADGES.map((b) => {
          const got = p.badges[b.id];
          return `
          <li class="badge-item ${got ? '' : 'badge-item--locked'}">
            <span class="badge-icon">${icon(got ? b.icone : 'lock')}</span>
            <span><strong>${esc(b.nome)}</strong>
              <small>${got ? `Desbloqueada ${relativeTime(got)}` : `<span class="visually-hidden">Bloqueada. </span>${esc(b.criterio)}`}</small></span>
          </li>`;
        }).join('')}
      </ul>
    </section>

    <section class="section" aria-labelledby="data-title">
      <h2 class="section-title" id="data-title">Seus dados</h2>
      <p class="section-sub" style="margin-bottom:var(--space-4)">Tudo fica salvo apenas neste navegador (LocalStorage). Faça um backup para levar seu progresso para outro computador.</p>
      <div class="data-actions">
        <button type="button" class="btn btn--secondary" id="btn-export">${icon('download')} Exportar backup (.json)</button>
        <button type="button" class="btn btn--secondary" id="btn-import">${icon('upload')} Importar backup</button>
        <input type="file" id="import-file" accept="application/json,.json" hidden>
        <button type="button" class="btn btn--danger-outline" id="btn-reset">${icon('trash')} Zerar progresso</button>
      </div>
    </section>`;

  $('#btn-export', view).addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(store.exportData(), null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `pilulatech-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    toast('Backup exportado. Guarde o arquivo em um lugar seguro.', { type: 'success' });
  });

  const fileInput = $('#import-file', view);
  $('#btn-import', view).addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', async () => {
    const file = fileInput.files[0];
    if (!file) return;
    try {
      if (file.size > 1_000_000) throw new Error('O arquivo é grande demais para ser um backup do PílulaTech.');
      const data = JSON.parse(await file.text());
      const ok = await confirmDialog({
        title: 'Importar backup?',
        message: 'Seus favoritos, histórico, preferências e progresso atuais serão substituídos pelos do arquivo.',
        confirmLabel: 'Importar e substituir'
      });
      if (!ok) return;
      store.importData(data);
      toast('Backup importado com sucesso!', { type: 'success' });
      hooks.rerender();
    } catch (err) {
      const msg = err instanceof SyntaxError ? 'O arquivo não é um JSON válido.' : err.message;
      toast(`Não foi possível importar: ${msg}`, { type: 'error', duration: 8000 });
    } finally {
      fileInput.value = '';
    }
  });

  $('#btn-reset', view).addEventListener('click', async () => {
    const ok = await confirmDialog({
      title: 'Zerar todo o progresso?',
      message: 'Você vai perder XP, nível, conquistas, pílulas concluídas e resultados de quiz. <strong>Esta ação não pode ser desfeita</strong> — exporte um backup antes, se quiser guardar.',
      confirmLabel: 'Zerar progresso',
      danger: true
    });
    if (!ok) return;
    store.resetProgress();
    toast('Progresso zerado. Bons estudos!');
    hooks.rerender();
  });

  return { title: 'Meu progresso' };
}

/* ========================================================================== */
/* GLOSSÁRIO                                                                   */
/* ========================================================================== */

const GLOSSARY = buildGlossary();
const firstLetter = (t) => normalize(t)[0].toUpperCase();

function openTerm(item) {
  const topic = getTopic(item.topicId);
  const dlg = openDialog({
    title: item.termo,
    body: `
      <div class="stack">
        <p>${esc(item.definicao)}</p>
        <p class="muted">Da pílula <a href="#/topico/${topic.id}">${esc(topic.titulo)}</a>.</p>
        <section aria-labelledby="wiki-h">
          <h3 id="wiki-h" style="font-size:var(--fs-md); margin-bottom:var(--space-2)">Na Wikipédia</h3>
          <div id="wiki-box" aria-live="polite" aria-busy="true">
            <div class="stack"><div class="skeleton skeleton-line"></div><div class="skeleton skeleton-line"></div><div class="skeleton skeleton-line" style="width:60%"></div></div>
            <p class="visually-hidden">Carregando resumo da Wikipédia…</p>
          </div>
        </section>
      </div>`,
    footer: `<a class="btn btn--secondary" href="#/topico/${topic.id}" data-dialog-close>Abrir a pílula ${icon('arrow-right')}</a>`
  });
  const box = dlg.querySelector('#wiki-box');
  const load = async () => {
    box.setAttribute('aria-busy', 'true');
    try {
      const w = await getWikiSummary(item.termo);
      box.innerHTML = `<p>${esc(w.resumo)}</p>
        <p class="source-credit">Fonte: <a href="${esc(w.url)}" ${EXTERNAL}>Wikipédia — ${esc(w.titulo)}${NEW_TAB}</a> (CC BY-SA).</p>`;
    } catch (err) {
      box.innerHTML = `<p class="muted">${icon('info', 'icon--sm')} ${esc(err.message)} ${err.kind !== 'notfound'
        ? '<button type="button" class="btn btn--ghost btn--sm" data-retry>Tentar novamente</button>' : ''}</p>`;
      box.querySelector('[data-retry]')?.addEventListener('click', load);
    } finally {
      box.setAttribute('aria-busy', 'false');
    }
  };
  load();
}

export function renderGlossary(view) {
  const letters = [...new Set(GLOSSARY.map((g) => firstLetter(g.termo)))];
  const all = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  view.innerHTML = `
    <header class="page-header">
      <h1 class="page-title">Glossário</h1>
      <p class="page-lead">${GLOSSARY.length} termos reunidos de todas as pílulas. Toque em um termo para ver a definição e o resumo da Wikipédia.</p>
    </header>
    <div class="field" style="max-width:28rem">
      <label class="field-label" for="glossary-filter">Filtrar termos</label>
      <input class="input" id="glossary-filter" type="search" placeholder="Ex.: hash, API, nuvem" autocomplete="off">
      <p class="field-hint" id="glossary-count" aria-live="polite"></p>
    </div>
    <nav class="az-nav" aria-label="Índice alfabético">
      <ul>${all.map((l) => letters.includes(l)
        ? `<li><a href="#letra-${l}">${l}</a></li>`
        : `<li><span aria-hidden="true">${l}</span></li>`).join('')}</ul>
    </nav>
    <div id="glossary-body"></div>`;

  const body = $('#glossary-body', view);
  const count = $('#glossary-count', view);
  const draw = (q = '') => {
    const n = normalize(q).trim();
    const list = GLOSSARY.filter((g) => !n || normalize(g.termo).includes(n) || normalize(g.definicao).includes(n));
    count.textContent = n ? `${plural(list.length, 'termo encontrado', 'termos encontrados')}` : '';
    if (!list.length) {
      body.innerHTML = emptyState({ icon: 'book-a', title: 'Nenhum termo encontrado', text: 'Tente outra palavra ou limpe o filtro.' });
      return;
    }
    const byLetter = new Map();
    list.forEach((g, i) => {
      const l = firstLetter(g.termo);
      if (!byLetter.has(l)) byLetter.set(l, []);
      byLetter.get(l).push(i);
    });
    body.innerHTML = [...byLetter].map(([l, idxs]) => `
      <h2 class="glossary-letter" id="letra-${l}" tabindex="-1">${l}</h2>
      <ul class="glossary-list">
        ${idxs.map((i) => {
          const g = list[i];
          return `<li><button type="button" class="glossary-term" data-term="${esc(g.termo)}">
            <strong>${highlight(g.termo, q)}</strong><span>${esc(getTopic(g.topicId).titulo)}</span></button></li>`;
        }).join('')}
      </ul>`).join('');
  };
  draw();

  $('#glossary-filter', view).addEventListener('input', (e) => draw(e.target.value));
  body.addEventListener('click', (e) => {
    const b = e.target.closest('[data-term]');
    if (b) openTerm(GLOSSARY.find((g) => g.termo === b.dataset.term));
  });

  return { title: 'Glossário' };
}

/* ========================================================================== */
/* PREFERÊNCIAS E ONBOARDING (RF01)                                            */
/* ========================================================================== */

const GOALS = {
  carreira: { nome: 'Construir minha carreira', icone: 'briefcase' },
  faculdade: { nome: 'Ir bem na faculdade e em provas', icone: 'graduation' },
  curiosidade: { nome: 'Matar a curiosidade', icone: 'lightbulb' }
};
const TIMES = { 5: 'Só uma pílula rápida', 10: 'Uma ou duas pílulas', 20: 'Quero estudar com calma' };

const interestsFieldset = (sel = []) => `
  <fieldset class="option-fieldset" aria-describedby="err-interesses">
    <legend>Quais áreas mais te interessam?</legend>
    <p class="field-hint">Escolha uma ou mais. Você pode mudar quando quiser.</p>
    <div class="option-grid">
      ${CATEGORIES.map((c) => `
        <label class="option-card" style="${catStyle(c.id)}">
          <input type="checkbox" name="interesses" value="${c.id}" ${sel.includes(c.id) ? 'checked' : ''}>
          ${icon(c.icone)}<span>${esc(c.nome)}</span>
        </label>`).join('')}
    </div>
    <p class="form-error" id="err-interesses" role="alert" hidden></p>
  </fieldset>`;

const levelFieldset = (sel = 'iniciante') => `
  <fieldset class="option-fieldset">
    <legend>Qual é o seu nível?</legend>
    <div class="option-grid">
      ${Object.entries(LEVELS).map(([id, l]) => `
        <label class="option-card">
          <input type="radio" name="nivel" value="${id}" ${sel === id ? 'checked' : ''}>
          <span>${esc(l.nome)}<small>${esc(l.descricao)}</small></span>
        </label>`).join('')}
    </div>
  </fieldset>`;

const goalFieldset = (sel = 'carreira') => `
  <fieldset class="option-fieldset">
    <legend>Qual é o seu objetivo?</legend>
    <div class="option-grid">
      ${Object.entries(GOALS).map(([id, g]) => `
        <label class="option-card">
          <input type="radio" name="objetivo" value="${id}" ${sel === id ? 'checked' : ''}>
          ${icon(g.icone)}<span>${esc(g.nome)}</span>
        </label>`).join('')}
    </div>
  </fieldset>`;

const timeFieldset = (sel = 10) => `
  <fieldset class="option-fieldset">
    <legend>Quanto tempo você tem por dia?</legend>
    <p class="field-hint">Usamos isso para sugerir pílulas que cabem na sua rotina.</p>
    <div class="option-grid">
      ${Object.entries(TIMES).map(([min, txt]) => `
        <label class="option-card">
          <input type="radio" name="tempo" value="${min}" ${Number(sel) === Number(min) ? 'checked' : ''}>
          ${icon('clock')}<span>${min} minutos<small>${esc(txt)}</small></span>
        </label>`).join('')}
    </div>
  </fieldset>`;

/** Lê os campos de preferência presentes em um container. */
function readPrefs(root, base) {
  const out = { ...base };
  const checks = $$('input[name="interesses"]', root);
  if (checks.length) out.interesses = checks.filter((c) => c.checked).map((c) => c.value);
  ['nivel', 'objetivo'].forEach((k) => {
    const el = $(`input[name="${k}"]:checked`, root);
    if (el) out[k] = el.value;
  });
  const t = $('input[name="tempo"]:checked', root);
  if (t) out.tempo = Number(t.value);
  return out;
}

function validateInterests(root, data) {
  const err = $('#err-interesses', root);
  if (!err) return true;
  if (!data.interesses.length) {
    err.hidden = false;
    err.innerHTML = `${icon('alert', 'icon--sm')} Escolha pelo menos uma área para continuar.`;
    $('input[name="interesses"]', root).focus();
    return false;
  }
  err.hidden = true;
  return true;
}

const DEFAULT_PREFS = { interesses: [], nivel: 'iniciante', objetivo: 'carreira', tempo: 10 };

/** Assistente de boas-vindas em 3 passos (pode ser pulado — H3). */
export function openOnboarding() {
  let data = { ...DEFAULT_PREFS, ...(store.getPrefs() ?? {}) };
  let step = 0;
  let finished = false;
  const steps = [
    () => interestsFieldset(data.interesses),
    () => levelFieldset(data.nivel) + goalFieldset(data.objetivo),
    () => timeFieldset(data.tempo)
  ];

  const body = document.createElement('form');
  body.noValidate = true;
  const dlg = openDialog({
    title: 'Personalize sua trilha',
    body,
    wide: true,
    closeLabel: 'Fechar e pular',
    footer: `
      <button type="button" class="btn btn--ghost" data-skip>Pular por agora</button>
      <span class="spacer"></span>
      <button type="button" class="btn btn--secondary" data-back>${icon('chevron-right', 'icon--sm')} Voltar</button>
      <button type="button" class="btn btn--primary" data-next></button>`,
    onClose: () => {
      store.setOnboardingDone();
      if (!finished) toast('Sem problemas! Você pode personalizar depois em “Minhas preferências”.');
    }
  });
  const back = dlg.querySelector('[data-back]');
  back.querySelector('.icon').style.transform = 'rotate(180deg)';
  const next = dlg.querySelector('[data-next]');

  const draw = () => {
    body.innerHTML = `
      <div class="steps-indicator">
        <p id="step-label" tabindex="-1">Passo ${step + 1} de ${steps.length}</p>
        <div class="progress" role="progressbar" aria-labelledby="step-label" aria-valuemin="1" aria-valuemax="${steps.length}" aria-valuenow="${step + 1}">
          <span class="progress-bar" style="width:${((step + 1) / steps.length) * 100}%"></span>
        </div>
      </div>
      ${steps[step]()}`;
    back.hidden = step === 0;
    next.innerHTML = step === steps.length - 1 ? `${icon('check')} Concluir` : `Continuar ${icon('arrow-right')}`;
    $('#step-label', body).focus();
  };

  next.addEventListener('click', () => {
    data = readPrefs(body, data);
    if (step === 0 && !validateInterests(body, data)) return;
    if (step < steps.length - 1) { step += 1; draw(); return; }
    finished = true;
    store.setPrefs(data);
    dlg.close('done');
    toast('Pronto! Suas recomendações foram personalizadas.', { type: 'success' });
    hooks.rerender();
  });
  back.addEventListener('click', () => { data = readPrefs(body, data); step -= 1; draw(); });
  dlg.querySelector('[data-skip]').addEventListener('click', () => dlg.close('skip'));
  body.addEventListener('submit', (e) => { e.preventDefault(); next.click(); });
  draw();
}

export function renderPreferences(view) {
  const prefs = { ...DEFAULT_PREFS, ...(store.getPrefs() ?? {}) };
  view.innerHTML = `
    <header class="page-header">
      <h1 class="page-title">Minhas preferências</h1>
      <p class="page-lead">Essas escolhas definem as “Pílulas para você” na página inicial. Elas ficam salvas só neste navegador.</p>
    </header>
    <form id="prefs-form" class="stack" novalidate style="max-width:52rem">
      ${interestsFieldset(prefs.interesses)}
      ${levelFieldset(prefs.nivel)}
      ${goalFieldset(prefs.objetivo)}
      ${timeFieldset(prefs.tempo)}
      <div class="data-actions" style="margin-top:var(--space-6)">
        <button type="submit" class="btn btn--primary">${icon('check')} Salvar preferências</button>
        <a class="btn btn--ghost" href="#/inicio">Cancelar</a>
      </div>
    </form>`;

  $('#prefs-form', view).addEventListener('submit', (e) => {
    e.preventDefault();
    const data = readPrefs(e.target, prefs);
    if (!validateInterests(e.target, data)) return;
    store.setPrefs(data);
    store.setOnboardingDone();
    toast('Preferências salvas! Suas recomendações foram atualizadas.', {
      type: 'success',
      action: { label: 'Ver sugestões', onClick: () => { location.hash = '#/inicio'; } }
    });
  });
  return { title: 'Minhas preferências' };
}

/* ========================================================================== */
/* SOBRE, ATALHOS, MENU "MAIS" E 404                                           */
/* ========================================================================== */

export const SHORTCUTS = [
  [['/'], 'Ir para a busca'],
  [['g', 'i'], 'Ir para o início'],
  [['g', 't'], 'Ir para todas as pílulas'],
  [['g', 'f'], 'Ir para os favoritos'],
  [['g', 'h'], 'Ir para o histórico'],
  [['g', 'p'], 'Ir para o progresso'],
  [['?'], 'Mostrar esta lista de atalhos'],
  [['Esc'], 'Fechar janelas e diálogos']
];

const shortcutsHtml = () => `
  <dl class="shortcut-list">
    ${SHORTCUTS.map(([keys, desc]) => `<div><dt>${esc(desc)}</dt><dd>${keys.map((k) => `<kbd>${esc(k)}</kbd>`).join(' depois ')}</dd></div>`).join('')}
  </dl>`;

export function openShortcuts() {
  openDialog({ title: 'Atalhos de teclado', body: shortcutsHtml() });
}

export function openMore() {
  const dlg = openDialog({
    title: 'Mais opções',
    body: `
      <ul class="more-list">
        <li><a href="#/historico">${icon('history')} Histórico</a></li>
        <li><a href="#/glossario">${icon('book-a')} Glossário</a></li>
        <li><a href="#/preferencias">${icon('sliders')} Minhas preferências</a></li>
        <li><a href="#/sobre">${icon('info')} Sobre e como usar</a></li>
        <li><button type="button" data-open-shortcuts>${icon('keyboard')} Atalhos de teclado</button></li>
      </ul>`
  });
  dlg.addEventListener('click', (e) => {
    if (e.target.closest('a')) dlg.close();
    if (e.target.closest('[data-open-shortcuts]')) { dlg.close(); openShortcuts(); }
  });
}

export function renderAbout(view) {
  view.innerHTML = `
    <header class="page-header">
      <h1 class="page-title">Sobre o PílulaTech</h1>
      <p class="page-lead">Um portal de pílulas do conhecimento sobre o universo da tecnologia: conteúdos curtos, organizados por tema, com referências confiáveis para se aprofundar.</p>
    </header>
    <div class="about-grid">
      <section class="about-card" aria-labelledby="a1"><h2 id="a1">${icon('help')} Como usar</h2>
        <ol>
          <li>Personalize sua trilha em 3 passos (ou pule e explore livremente).</li>
          <li>Escolha uma pílula em <a href="#/topicos">Tópicos</a> ou nas sugestões da página inicial.</li>
          <li>Leia a visão geral, veja os conceitos e as tecnologias fundamentais.</li>
          <li>Faça o teste rápido e marque a pílula como concluída para ganhar XP.</li>
          <li>Use as referências para se aprofundar e salve suas favoritas.</li>
        </ol>
      </section>
      <section class="about-card" aria-labelledby="a2"><h2 id="a2">${icon('keyboard')} Atalhos de teclado</h2>${shortcutsHtml()}</section>
      <section class="about-card" aria-labelledby="a3"><h2 id="a3">${icon('lock')} Privacidade</h2>
        <p>Não há cadastro nem servidor: preferências, favoritos, histórico e progresso ficam só no seu navegador (LocalStorage). Você pode exportar, importar ou apagar tudo em <a href="#/progresso">Meu progresso</a>.</p>
        <p style="margin-top:var(--space-3)">As únicas conexões externas são as consultas públicas ao DEV.to (artigos da comunidade) e à Wikipédia (glossário), sem envio de dados pessoais.</p>
      </section>
      <section class="about-card" aria-labelledby="a4"><h2 id="a4">${icon('users')} Princípios de design</h2>
        <ul>
          <li>As 10 heurísticas de usabilidade de Jakob Nielsen.</li>
          <li>Affordances e signifiers (Don Norman): o que é clicável parece clicável.</li>
          <li>Acessibilidade WCAG 2.2 nível AA: contraste, teclado, leitores de tela.</li>
          <li>Leis de UX: Fitts, Hick, Miller, Jakob e princípios da Gestalt.</li>
          <li>Hierarquia de cores 60-30-10, com tema claro e escuro.</li>
        </ul>
      </section>
      <section class="about-card" aria-labelledby="a5"><h2 id="a5">${icon('code')} Tecnologias</h2>
        <p>HTML5 semântico, CSS3 (custom properties, Grid, Flexbox) e JavaScript puro com módulos ES. Persistência com LocalStorage. APIs públicas: DEV.to e Wikipédia. Hospedado no GitHub Pages.</p>
      </section>
      <section class="about-card" aria-labelledby="a6"><h2 id="a6">${icon('graduation')} Projeto acadêmico</h2>
        <p>Desenvolvido em grupo como projeto da disciplina, com apoio de IA (Vibe Coding). O conteúdo das pílulas é introdutório: sempre consulte as fontes indicadas.</p>
      </section>
    </div>`;
  return { title: 'Sobre' };
}

export function renderNotFound(view, route) {
  view.innerHTML = `
    <div class="notfound">
      <p class="notfound-code" aria-hidden="true">404</p>
      <h1 class="page-title">Página não encontrada</h1>
      <p class="page-lead">O endereço <code>${esc(`#/${route.name}${route.param ? `/${route.param}` : ''}`)}</code> não existe ou a pílula foi renomeada. Que tal procurar o que você precisa?</p>
      <div class="hero-actions" style="justify-content:center">
        <a class="btn btn--primary" href="#/topicos">Ver todas as pílulas</a>
        <a class="btn btn--secondary" href="#/inicio">Voltar ao início</a>
      </div>
    </div>`;
  return { title: 'Página não encontrada' };
}
