/**
 * gamification.js — XP, níveis, conquistas (badges) e sequência de dias (RF11).
 * Todas as funções recebem/retornam o objeto Progress de storage.js.
 */
import { TOPICS, getTopic } from './topics.js';
import { getProgress, saveProgress, getFavorites } from './storage.js';

export const XP_COMPLETE = 10;
export const XP_PER_CORRECT = 5;

/** Níveis do usuário, por XP mínimo. */
export const USER_LEVELS = [
  { nome: 'Curioso(a)', min: 0 },
  { nome: 'Explorador(a)', min: 60 },
  { nome: 'Especialista', min: 200 },
  { nome: 'Mestre Tech', min: 450 }
];

/**
 * Calcula o nível atual a partir do XP.
 * @param {number} xp
 */
export function levelFor(xp) {
  let index = 0;
  USER_LEVELS.forEach((l, i) => { if (xp >= l.min) index = i; });
  const current = USER_LEVELS[index];
  const next = USER_LEVELS[index + 1] ?? null;
  const pct = next ? Math.round(((xp - current.min) / (next.min - current.min)) * 100) : 100;
  return { index, current, next, pct, toNext: next ? next.min - xp : 0 };
}

const countDoneIn = (p, categoria) =>
  Object.keys(p.completed).filter((id) => getTopic(id)?.categoria === categoria).length;

/**
 * Conquistas. O critério fica visível mesmo quando bloqueadas (H6 / H10).
 * `test` recebe o progresso e a lista de favoritos.
 */
export const BADGES = [
  { id: 'primeira', nome: 'Primeira pílula', criterio: 'Conclua sua primeira pílula.', icone: 'pill',
    test: (p) => Object.keys(p.completed).length >= 1 },
  { id: 'cinco', nome: 'Hábito em formação', criterio: 'Conclua 5 pílulas.', icone: 'check-circle',
    test: (p) => Object.keys(p.completed).length >= 5 },
  { id: 'maratona', nome: 'Maratonista', criterio: 'Conclua 15 pílulas.', icone: 'trophy',
    test: (p) => Object.keys(p.completed).length >= 15 },
  { id: 'nuvem', nome: 'Explorador(a) da Nuvem', criterio: 'Conclua 3 pílulas de Nuvem e Virtualização.', icone: 'cloud',
    test: (p) => countDoneIn(p, 'nuvem') >= 3 },
  { id: 'seguranca', nome: 'Guardião(ã) Digital', criterio: 'Conclua 3 pílulas de Segurança.', icone: 'shield',
    test: (p) => countDoneIn(p, 'seguranca') >= 3 },
  { id: 'dados', nome: 'Mente de Dados', criterio: 'Conclua 3 pílulas de Dados e IA.', icone: 'database',
    test: (p) => countDoneIn(p, 'dados-ia') >= 3 },
  { id: 'ecletico', nome: 'Eclético(a)', criterio: 'Conclua pílulas de 5 categorias diferentes.', icone: 'layers',
    test: (p) => new Set(Object.keys(p.completed).map((id) => getTopic(id)?.categoria)).size >= 5 },
  { id: 'nota-maxima', nome: 'Nota máxima', criterio: 'Acerte todas as perguntas de um quiz.', icone: 'target',
    test: (p) => Object.values(p.quiz).some((q) => q.best === q.total) },
  { id: 'curador', nome: 'Curador(a)', criterio: 'Salve 5 pílulas nos favoritos.', icone: 'bookmark',
    test: (_p, favs) => favs.length >= 5 },
  { id: 'sequencia', nome: 'Em chamas', criterio: 'Estude 3 dias seguidos.', icone: 'flame',
    test: (p) => streakOf(p.activeDays) >= 3 }
];

/** Data local no formato AAAA-MM-DD. */
export function todayKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Sequência de dias consecutivos com atividade, terminando hoje ou ontem.
 * @param {string[]} days
 */
export function streakOf(days) {
  const set = new Set(days);
  const cursor = new Date();
  if (!set.has(todayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (set.has(todayKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

/** Marca o dia de hoje como ativo. */
function touchToday(p) {
  const key = todayKey();
  if (!p.activeDays.includes(key)) p.activeDays = [...p.activeDays, key].slice(-60);
}

/**
 * Verifica conquistas novas, salva e devolve as recém-desbloqueadas.
 * @param {import('./storage.js').Progress} p
 */
function unlockBadges(p) {
  const favs = getFavorites();
  const fresh = [];
  for (const badge of BADGES) {
    if (!p.badges[badge.id] && badge.test(p, favs)) {
      p.badges[badge.id] = Date.now();
      fresh.push(badge);
    }
  }
  return fresh;
}

/**
 * Marca uma pílula como concluída. XP só é concedido na primeira vez.
 * @returns {{xpGained:number, newBadges:object[], levelUp:boolean}}
 */
export function completeTopic(id) {
  const p = getProgress();
  const before = levelFor(p.xp).index;
  let xpGained = 0;
  p.completed[id] = Date.now();
  if (!p.rewarded[id]) {
    p.rewarded[id] = true;
    xpGained = XP_COMPLETE;
    p.xp += xpGained;
    p.minutes += getTopic(id)?.tempoLeitura ?? 0;
  }
  touchToday(p);
  const newBadges = unlockBadges(p);
  saveProgress(p);
  return { xpGained, newBadges, levelUp: levelFor(p.xp).index > before };
}

/** Desmarca a conclusão (o XP já ganho é mantido, para não punir o usuário). */
export function uncompleteTopic(id) {
  const p = getProgress();
  delete p.completed[id];
  saveProgress(p);
}

/**
 * Registra o resultado de um quiz. XP só pela melhora em relação à melhor tentativa.
 * @returns {{xpGained:number, newBadges:object[], levelUp:boolean, best:number}}
 */
export function submitQuiz(id, correct, total) {
  const p = getProgress();
  const before = levelFor(p.xp).index;
  const prevBest = p.quiz[id]?.best ?? 0;
  const xpGained = Math.max(0, correct - prevBest) * XP_PER_CORRECT;
  p.xp += xpGained;
  p.quiz[id] = { best: Math.max(prevBest, correct), total, at: Date.now() };
  touchToday(p);
  const newBadges = unlockBadges(p);
  saveProgress(p);
  return { xpGained, newBadges, levelUp: levelFor(p.xp).index > before, best: p.quiz[id].best };
}

/** Reavalia conquistas que dependem de ações fora do estudo (ex.: favoritar). */
export function checkBadges() {
  const p = getProgress();
  const newBadges = unlockBadges(p);
  if (newBadges.length) saveProgress(p);
  return newBadges;
}

/** Estatísticas consolidadas para o painel "Meu progresso". */
export function stats() {
  const p = getProgress();
  const quizzes = Object.values(p.quiz);
  const correct = quizzes.reduce((s, q) => s + q.best, 0);
  const total = quizzes.reduce((s, q) => s + q.total, 0);
  return {
    progress: p,
    done: Object.keys(p.completed).length,
    totalTopics: TOPICS.length,
    minutes: p.minutes,
    accuracy: total ? Math.round((correct / total) * 100) : null,
    streak: streakOf(p.activeDays),
    level: levelFor(p.xp)
  };
}
