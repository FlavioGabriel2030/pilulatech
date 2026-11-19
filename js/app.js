/**
 * app.js — Ponto de entrada do PílulaTech.
 * Responsável por: roteador por hash, cabeçalho (busca e tema), atalhos de teclado,
 * favoritos (ação global), controle de fonte, barra de progresso de leitura e
 * mensagens de conquista.
 */
import * as store from './storage.js';
import { getTopic } from './topics.js';
import { checkBadges } from './gamification.js';
import { $, $$, debounce, toast, announce } from './ui.js';
import {
  initViews, renderHome, renderTopics, renderTopic, renderFavorites, renderHistory,
  renderProgress, renderGlossary, renderPreferences, renderAbout, renderNotFound,
  setSearch, updateFavButtons, openOnboarding, openShortcuts, openMore
} from './views.js';

const APP_NAME = 'PílulaTech';
const viewRoot = $('#view');
const searchInput = $('#search');

/* ========================================================================== */
/* ROTEADOR                                                                    */
/* ========================================================================== */

const ROUTES = {
  inicio: renderHome,
  topicos: renderTopics,
  topico: renderTopic,
  favoritos: renderFavorites,
  historico: renderHistory,
  progresso: renderProgress,
  glossario: renderGlossary,
  preferencias: renderPreferences,
  sobre: renderAbout
};

/** Rota atual, a partir de location.hash ("#/topico/nuvem?x=1"). */
function parseRoute() {
  const raw = location.hash.startsWith('#/') ? location.hash.slice(2) : 'inicio';
  const [path, qs = ''] = raw.split('?');
  const [name = 'inicio', param = ''] = path.split('/');
  return { name: name || 'inicio', param: decodeURIComponent(param), query: new URLSearchParams(qs) };
}

let current = { cleanup: null, route: null };
let firstRender = true; // no carregamento inicial o foco fica no topo (skip link)
let keepFocus = false; // true quando a navegação veio da busca (não roubar o foco do campo)

/**
 * Desenha a rota atual.
 * @param {{preserveScroll?:boolean}} [opts]
 */
function render({ preserveScroll = false } = {}) {
  current.cleanup?.();
  const route = parseRoute();
  const fn = ROUTES[route.name] ?? renderNotFound;

  // Container novo a cada render: evita acumular event listeners da tela anterior.
  const view = document.createElement('div');
  viewRoot.replaceChildren(view);
  const result = fn(view, route) ?? {};
  current = { cleanup: result.cleanup ?? null, route };

  document.title = result.title ? `${result.title} · ${APP_NAME}` : `${APP_NAME} · Pílulas do conhecimento em tecnologia`;
  setActiveNav(route.name === 'topico' ? 'topicos' : route.name);
  setReadingProgress(!!result.readingProgress);
  if (route.name !== 'topicos' && document.activeElement !== searchInput) searchInput.value = '';

  // Reinicia a animação de entrada da tela
  viewRoot.style.animation = 'none';
  void viewRoot.offsetHeight;
  viewRoot.style.animation = '';

  if (!preserveScroll) window.scrollTo(0, 0);
  const h1 = $('h1', view);
  if (h1) h1.setAttribute('tabindex', '-1');
  // Move o foco para o título da nova tela (leitores de tela anunciam a mudança)
  if (!keepFocus && !preserveScroll && h1 && !firstRender) h1.focus({ preventScroll: true });
  keepFocus = false;
  firstRender = false;
}

/** Redesenha a tela atual sem mover o foco nem a rolagem (após ações locais). */
function rerender() {
  const active = document.activeElement;
  const activeId = active?.id;
  render({ preserveScroll: true });
  if (activeId && document.getElementById(activeId)) document.getElementById(activeId).focus();
  else if (!document.activeElement || document.activeElement === document.body) $('h1', viewRoot)?.focus({ preventScroll: true });
}

/** Marca o item do menu correspondente à rota (aria-current = H1 e H6). */
function setActiveNav(name) {
  $$('[data-nav]').forEach((a) => {
    if (a.dataset.nav === name) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
}

/* ========================================================================== */
/* BARRA DE PROGRESSO DE LEITURA                                               */
/* ========================================================================== */

const progressWrap = $('.reading-progress');
const progressBar = $('.reading-progress-bar');
let ticking = false;

function updateReadingProgress() {
  ticking = false;
  const article = $('#topic-article');
  if (!article) return;
  const rect = article.getBoundingClientRect();
  const total = rect.height - window.innerHeight;
  const pct = total > 0 ? Math.min(100, Math.max(0, (-rect.top / total) * 100)) : 100;
  progressBar.style.width = `${pct}%`;
  progressBar.setAttribute('aria-valuenow', String(Math.round(pct)));
}

function onScroll() {
  if (!ticking) { ticking = true; requestAnimationFrame(updateReadingProgress); }
}

function setReadingProgress(active) {
  progressWrap.hidden = !active;
  window.removeEventListener('scroll', onScroll);
  if (active) {
    window.addEventListener('scroll', onScroll, { passive: true });
    updateReadingProgress();
  }
}

/* ========================================================================== */
/* TEMA CLARO/ESCURO                                                           */
/* ========================================================================== */

const themeBtn = $('#btn-theme');
const themeMeta = $('meta[name="theme-color"]');
const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const dark = theme === 'dark';
  themeBtn.setAttribute('aria-label', dark ? 'Ativar tema claro' : 'Ativar tema escuro');
  themeBtn.title = dark ? 'Ativar tema claro' : 'Ativar tema escuro';
  themeBtn.querySelector('use').setAttribute('href', dark ? '#i-sun' : '#i-moon');
  themeMeta.setAttribute('content', dark ? '#0B1120' : '#F8FAFC');
}

themeBtn.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  store.setTheme(next);
  applyTheme(next);
  announce(next === 'dark' ? 'Tema escuro ativado.' : 'Tema claro ativado.');
});

// Acompanha o sistema enquanto o usuário não escolher um tema manualmente.
darkQuery.addEventListener('change', (e) => {
  if (!store.getTheme()) applyTheme(e.matches ? 'dark' : 'light');
});

applyTheme(document.documentElement.dataset.theme || 'light');

/* ========================================================================== */
/* TAMANHO DA FONTE                                                            */
/* ========================================================================== */

const FONT_SCALES = ['sm', 'md', 'lg', 'xl'];
const FONT_NAMES = { sm: 'pequeno', md: 'padrão', lg: 'grande', xl: 'muito grande' };

function applyFont(scale) {
  document.documentElement.dataset.font = scale;
  const i = FONT_SCALES.indexOf(scale);
  $('[data-font-step="-1"]').disabled = i === 0;
  $('[data-font-step="1"]').disabled = i === FONT_SCALES.length - 1;
  $('[data-font-step="0"]').setAttribute('aria-pressed', String(scale === 'md'));
}

$$('[data-font-step]').forEach((b) => b.addEventListener('click', () => {
  const step = Number(b.dataset.fontStep);
  const i = FONT_SCALES.indexOf(store.getFontScale());
  const next = step === 0 ? 'md' : FONT_SCALES[Math.min(FONT_SCALES.length - 1, Math.max(0, i + step))];
  store.setFontScale(next);
  applyFont(next);
  announce(`Tamanho do texto: ${FONT_NAMES[next]}.`);
}));

applyFont(store.getFontScale());

/* ========================================================================== */
/* BUSCA NO CABEÇALHO                                                          */
/* ========================================================================== */

function refreshRecentSearches() {
  $('#recent-searches').innerHTML = store.getRecentSearches()
    .map((t) => `<option value="${t.replace(/"/g, '&quot;')}"></option>`).join('');
}

function runSearch(q) {
  const route = parseRoute();
  if (route.name === 'topicos') {
    setSearch(viewRoot.firstElementChild, q.trim());
  } else if (q.trim()) {
    keepFocus = true;
    location.hash = `#/topicos?q=${encodeURIComponent(q.trim())}`;
  }
}

searchInput.addEventListener('input', debounce(() => runSearch(searchInput.value), 250));
$('#search-form').addEventListener('submit', (e) => {
  e.preventDefault();
  store.addRecentSearch(searchInput.value);
  refreshRecentSearches();
  runSearch(searchInput.value);
});
refreshRecentSearches();

/* ========================================================================== */
/* FAVORITOS (ação global, presente em cards de várias telas)                  */
/* ========================================================================== */

/** Mostra toasts de conquistas e de subida de nível. */
function celebrate({ newBadges = [], levelUp = false } = {}) {
  newBadges.forEach((b) => toast(`Conquista desbloqueada: ${b.nome}!`, {
    type: 'badge',
    duration: 7000,
    action: { label: 'Ver conquistas', onClick: () => { location.hash = '#/progresso'; } }
  }));
  if (levelUp) toast('Você subiu de nível! Confira em Meu progresso.', { type: 'badge', duration: 7000 });
}

function afterFavoriteChange() {
  if (parseRoute().name === 'favoritos') rerender();
}

function toggleFavorite(id) {
  const topic = getTopic(id);
  if (!topic) return;
  if (store.isFavorite(id)) {
    const index = store.removeFavorite(id);
    updateFavButtons(id, false);
    afterFavoriteChange();
    toast(`“${topic.titulo}” removida dos favoritos.`, {
      action: {
        label: 'Desfazer',
        onClick: () => { store.addFavorite(id, index); updateFavButtons(id, true); afterFavoriteChange(); announce('Favorito restaurado.'); }
      }
    });
  } else {
    store.addFavorite(id);
    updateFavButtons(id, true);
    afterFavoriteChange();
    toast(`“${topic.titulo}” salva nos favoritos.`, {
      type: 'success',
      action: { label: 'Ver favoritos', onClick: () => { location.hash = '#/favoritos'; } }
    });
    celebrate({ newBadges: checkBadges() });
  }
}

/* ========================================================================== */
/* CLIQUES GLOBAIS                                                             */
/* ========================================================================== */

document.addEventListener('click', (e) => {
  const fav = e.target.closest('[data-action="toggle-fav"]');
  if (fav) { e.preventDefault(); toggleFavorite(fav.dataset.id); return; }

  if (e.target.closest('[data-action="open-onboarding"]')) { openOnboarding(); return; }

  // Âncoras internas (#sec-x, #letra-A, #conteudo) não devem acionar o roteador:
  // rolamos até o alvo e movemos o foco para ele.
  const link = e.target.closest('a[href^="#"]');
  if (link && !link.getAttribute('href').startsWith('#/')) {
    const target = document.getElementById(link.getAttribute('href').slice(1));
    if (target) {
      e.preventDefault();
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
      target.focus({ preventScroll: true });
    }
  }
});

$('#btn-shortcuts').addEventListener('click', openShortcuts);
$('#btn-more').addEventListener('click', openMore);

/* ========================================================================== */
/* ATALHOS DE TECLADO (H7 — flexibilidade e eficiência)                        */
/* ========================================================================== */

const G_ROUTES = { i: 'inicio', t: 'topicos', f: 'favoritos', h: 'historico', p: 'progresso' };
let gPressedAt = 0;

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey || e.defaultPrevented) return;
  const el = e.target;
  const typing = el.closest?.('input, textarea, select, [contenteditable="true"]');
  if (typing || document.querySelector('dialog[open]')) return;

  if (e.key === '/') { e.preventDefault(); searchInput.focus(); searchInput.select(); return; }
  if (e.key === '?') { e.preventDefault(); openShortcuts(); return; }
  if (e.key === 'g') { gPressedAt = Date.now(); return; }
  if (Date.now() - gPressedAt < 1200 && G_ROUTES[e.key]) {
    e.preventDefault();
    gPressedAt = 0;
    location.hash = `#/${G_ROUTES[e.key]}`;
  }
});

/* ========================================================================== */
/* INICIALIZAÇÃO                                                               */
/* ========================================================================== */

initViews({ rerender, celebrate });
window.addEventListener('hashchange', () => {
  // Ignora âncoras internas digitadas manualmente (ex.: #conteudo)
  if (location.hash && !location.hash.startsWith('#/')) return;
  render();
});

if (!location.hash) history.replaceState(null, '', '#/inicio');
render();

if (!store.isPersistent) {
  toast('Seu navegador está bloqueando o armazenamento local. Seu progresso valerá só durante esta visita.', { type: 'error', duration: 10000 });
}

// Primeira visita: oferece a personalização (pode ser pulada).
if (!store.isOnboardingDone() && !store.getPrefs()) {
  setTimeout(openOnboarding, 600);
}
