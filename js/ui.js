/**
 * ui.js — Componentes de interface reutilizáveis (H4 — consistência).
 * Funções puras que geram HTML (sempre escapando dados) e helpers de DOM:
 * cards, selos, estados vazios, skeletons, toasts e diálogos acessíveis.
 */
import { LEVELS, getCategory } from './topics.js';

/* ------------------------------------------------------------------------ */
/* Helpers básicos                                                           */
/* ------------------------------------------------------------------------ */

/** Atalho para querySelector. */
export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/** Escapa texto para inserção segura em HTML (evita XSS com dados de APIs). */
export function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

/** Ícone do sprite SVG. Decorativo por padrão (aria-hidden). */
export function icon(name, cls = '') {
  return `<svg class="icon ${cls}" aria-hidden="true" focusable="false"><use href="#i-${name}"/></svg>`;
}

/** Remove acentos e caixa para buscas tolerantes ("seguranca" encontra "Segurança"). */
export function normalize(text) {
  return String(text ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

/**
 * Destaca as ocorrências de `query` em `text` com <mark>, ignorando acentos.
 * Retorna HTML já escapado.
 */
export function highlight(text, query) {
  const source = String(text ?? '');
  const q = normalize(query).trim();
  if (!q) return esc(source);
  // Mapeia cada caractere normalizado para o índice original.
  let norm = '';
  const map = [];
  for (let i = 0; i < source.length; i++) {
    const n = normalize(source[i]);
    for (let k = 0; k < n.length; k++) { norm += n[k]; map.push(i); }
  }
  let out = '';
  let last = 0;
  let from = 0;
  let idx;
  while ((idx = norm.indexOf(q, from)) !== -1) {
    const start = map[idx];
    const end = map[idx + q.length - 1] + 1;
    out += esc(source.slice(last, start)) + `<mark>${esc(source.slice(start, end))}</mark>`;
    last = end;
    from = idx + q.length;
  }
  return out + esc(source.slice(last));
}

/** Debounce: executa a função só depois de `wait` ms sem novas chamadas. */
export function debounce(fn, wait = 250) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

const rtf = new Intl.RelativeTimeFormat('pt-BR', { numeric: 'auto' });

/** Data relativa em português ("há 2 horas", "ontem"). H2 — mundo real. */
export function relativeTime(ts) {
  const diff = (ts - Date.now()) / 1000;
  const units = [['year', 31536000], ['month', 2592000], ['week', 604800], ['day', 86400], ['hour', 3600], ['minute', 60]];
  for (const [unit, sec] of units) {
    if (Math.abs(diff) >= sec) return rtf.format(Math.round(diff / sec), unit);
  }
  return 'agora mesmo';
}

/** Pluralização simples. */
export const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

/** Anuncia uma mensagem para leitores de tela sem mostrar na tela. */
export function announce(message) {
  const region = $('#sr-status');
  if (!region) return;
  region.textContent = '';
  // pequeno atraso garante que o leitor perceba a mudança mesmo com textos iguais
  setTimeout(() => { region.textContent = message; }, 50);
}

/* ------------------------------------------------------------------------ */
/* Selos e metadados                                                         */
/* ------------------------------------------------------------------------ */

/** Estilo inline com a cor da categoria (usada por bordas, ícones e marcadores). */
export const catStyle = (categoryId) => `--c: var(--cat-${categoryId})`;

/** Selo de nível: cor + ícone de barras + texto (cor nunca é o único indicador). */
export function levelBadge(nivel) {
  const lvl = LEVELS[nivel];
  const bars = [1, 2, 3].map((n) => `<i class="${n <= lvl.ordem ? 'on' : ''}"></i>`).join('');
  return `<span class="level level--${nivel}"><span class="level-bars" aria-hidden="true">${bars}</span>${lvl.nome}</span>`;
}

/** Selo de categoria com ícone colorido. */
export function categoryTag(categoryId, asLink = false) {
  const cat = getCategory(categoryId);
  const inner = `${icon(cat.icone, 'icon--sm')}${esc(cat.nome)}`;
  return asLink
    ? `<a class="cat-tag" style="${catStyle(categoryId)}" href="#/topicos?cat=${cat.id}">${inner}</a>`
    : `<span class="cat-tag" style="${catStyle(categoryId)}">${inner}</span>`;
}

export const readingTime = (min) =>
  `<span class="meta-item">${icon('clock', 'icon--sm')}<span>${min} min<span class="visually-hidden"> de leitura</span></span></span>`;

/* ------------------------------------------------------------------------ */
/* Card de pílula                                                            */
/* ------------------------------------------------------------------------ */

/**
 * Card de pílula. O título é um link "esticado" que cobre o card inteiro (affordance),
 * e o botão de favoritar fica por cima, com aria-pressed.
 * @param {import('./topics.js').Topic} topic
 * @param {{favorite?:boolean, done?:boolean, query?:string, reasons?:string[], headingLevel?:number}} opts
 */
export function topicCard(topic, { favorite = false, done = false, query = '', reasons = null, headingLevel = 3 } = {}) {
  const cat = getCategory(topic.categoria);
  const h = `h${headingLevel}`;
  const favLabel = favorite ? `Remover "${topic.titulo}" dos favoritos` : `Salvar "${topic.titulo}" nos favoritos`;
  const reasonHtml = reasons && reasons.length
    ? `<p class="card-reason">${icon('info', 'icon--sm')}<span><strong>Por que estou vendo isso?</strong> Por ${esc(reasons.join(' · '))}.</span></p>`
    : '';
  return `
    <article class="card ${done ? 'is-done' : ''}" style="${catStyle(topic.categoria)}" data-topic="${topic.id}">
      <div class="card-top">
        <span class="cat-tag">${icon(cat.icone, 'icon--sm')}${esc(cat.nome)}</span>
        <button class="btn-icon card-fav" type="button" data-action="toggle-fav" data-id="${topic.id}"
          aria-pressed="${favorite}" aria-label="${esc(favLabel)}" title="${favorite ? 'Remover dos favoritos' : 'Salvar nos favoritos'}">
          ${icon('bookmark')}
        </button>
      </div>
      <${h} class="card-title"><a class="card-link" href="#/topico/${topic.id}">${highlight(topic.titulo, query)}</a></${h}>
      <p class="card-summary">${highlight(topic.resumo, query)}</p>
      ${reasonHtml}
      <div class="card-meta">
        ${levelBadge(topic.nivel)}
        ${readingTime(topic.tempoLeitura)}
        ${done ? `<span class="status-done">${icon('check-circle', 'icon--sm')}Concluída</span>` : ''}
      </div>
    </article>`;
}

/* ------------------------------------------------------------------------ */
/* Estados: vazio e carregando                                               */
/* ------------------------------------------------------------------------ */

/**
 * Estado vazio que explica o que fazer (H10).
 * @param {{icon:string, title:string, text:string, actionsHtml?:string}} o
 */
export function emptyState({ icon: ic, title, text, actionsHtml = '' }) {
  return `
    <div class="empty">
      <div class="empty-icon">${icon(ic, 'icon--lg')}</div>
      <h2 class="empty-title">${esc(title)}</h2>
      <p class="empty-text">${text}</p>
      ${actionsHtml}
    </div>`;
}

/** Skeletons de carregamento (H1). */
export function skeletonList(n = 3) {
  return Array.from({ length: n }, () => '<div class="skeleton skeleton-card"></div>').join('');
}

/* ------------------------------------------------------------------------ */
/* Toasts                                                                    */
/* ------------------------------------------------------------------------ */

const TOAST_ICONS = { info: 'info', success: 'check-circle', error: 'alert', badge: 'award' };

/**
 * Mostra uma notificação temporária. Pausa ao passar o mouse ou focar (WCAG 2.2.1).
 * @param {string} message
 * @param {{type?:'info'|'success'|'error'|'badge', action?:{label:string, onClick:Function}, duration?:number}} opts
 */
export function toast(message, { type = 'info', action = null, duration = 5000 } = {}) {
  const region = $('#toast-region');
  const el = document.createElement('div');
  el.className = `toast toast--${type}`;
  el.innerHTML = `
    <span class="toast-icon">${icon(TOAST_ICONS[type] || 'info')}</span>
    <p class="toast-msg">${esc(message)}</p>
    ${action ? `<button type="button" class="toast-action">${esc(action.label)}</button>` : ''}
    <button type="button" class="toast-close" aria-label="Fechar notificação">${icon('x', 'icon--sm')}</button>`;

  let timer;
  let remaining = duration;
  let started = Date.now();
  const dismiss = () => {
    clearTimeout(timer);
    el.classList.add('is-leaving');
    el.addEventListener('animationend', () => el.remove(), { once: true });
    setTimeout(() => el.remove(), 400); // garantia caso as animações estejam desativadas
  };
  const start = () => { started = Date.now(); timer = setTimeout(dismiss, remaining); };
  const pause = () => { clearTimeout(timer); remaining -= Date.now() - started; };

  el.addEventListener('mouseenter', pause);
  el.addEventListener('mouseleave', start);
  el.addEventListener('focusin', pause);
  el.addEventListener('focusout', start);
  el.querySelector('.toast-close').addEventListener('click', dismiss);
  if (action) {
    el.querySelector('.toast-action').addEventListener('click', () => { action.onClick(); dismiss(); });
  }

  // no máximo 3 toasts simultâneos
  while (region.children.length >= 3) region.firstElementChild.remove();
  region.append(el);
  start();
  return dismiss;
}

/* ------------------------------------------------------------------------ */
/* Diálogos (modais) acessíveis com <dialog> nativo                          */
/* ------------------------------------------------------------------------ */

let dialogSeq = 0;

/**
 * Abre um diálogo modal. O <dialog> nativo prende o foco e fecha com Esc (H3);
 * ao fechar, o foco volta ao elemento que o abriu.
 * @param {{title:string, body:string|Node, footer?:string, wide?:boolean, onClose?:Function, closeLabel?:string}} o
 * @returns {HTMLDialogElement}
 */
export function openDialog({ title, body, footer = '', wide = false, onClose = null, closeLabel = 'Fechar' }) {
  const id = `dlg-${++dialogSeq}`;
  const dlg = document.createElement('dialog');
  dlg.className = `dialog ${wide ? 'dialog--wide' : ''}`;
  dlg.setAttribute('aria-labelledby', `${id}-title`);
  dlg.innerHTML = `
    <div class="dialog-header">
      <h2 class="dialog-title" id="${id}-title">${esc(title)}</h2>
      <button type="button" class="btn-icon" data-dialog-close aria-label="${esc(closeLabel)}">${icon('x')}</button>
    </div>
    <div class="dialog-body"></div>
    <div class="dialog-footer">${footer}</div>`;
  const bodyEl = dlg.querySelector('.dialog-body');
  if (typeof body === 'string') bodyEl.innerHTML = body;
  else bodyEl.append(body);

  const opener = document.activeElement;
  dlg.addEventListener('click', (e) => {
    if (e.target === dlg || e.target.closest('[data-dialog-close]')) dlg.close('cancel');
  });
  dlg.addEventListener('close', () => {
    onClose?.(dlg.returnValue);
    dlg.remove();
    if (opener && opener.isConnected && typeof opener.focus === 'function') opener.focus();
  });
  document.body.append(dlg);
  dlg.showModal();
  return dlg;
}

/**
 * Diálogo de confirmação para ações destrutivas (H5 — prevenção de erros).
 * @returns {Promise<boolean>}
 */
export function confirmDialog({ title, message, confirmLabel = 'Confirmar', cancelLabel = 'Cancelar', danger = false }) {
  return new Promise((resolve) => {
    const dlg = openDialog({
      title,
      body: `<p>${message}</p>`,
      footer: `
        <button type="button" class="btn btn--ghost" data-dialog-close>${esc(cancelLabel)}</button>
        <button type="button" class="btn ${danger ? 'btn--danger' : 'btn--primary'}" data-confirm>${esc(confirmLabel)}</button>`,
      onClose: (value) => resolve(value === 'confirm')
    });
    dlg.querySelector('[data-confirm]').addEventListener('click', () => dlg.close('confirm'));
    // Foco inicial no botão seguro (Cancelar) para evitar confirmação acidental com Enter.
    dlg.querySelector('.dialog-footer [data-dialog-close]').focus();
  });
}
