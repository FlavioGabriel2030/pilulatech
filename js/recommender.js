/**
 * recommender.js — Algoritmo de recomendação "Pílulas para você" (RF02).
 *
 * Cada pílula recebe uma pontuação:
 *   +3  a categoria está entre os interesses do usuário
 *   +2  o nível é o mesmo escolhido pelo usuário (+1 se for o nível vizinho)
 *   +1  o tempo de leitura cabe no tempo disponível por dia
 *   +1  é relacionada a alguma pílula favoritada
 *   -1  foi aberta recentemente (evita repetir o que a pessoa acabou de ver)
 *   -5  já foi concluída
 * As maiores pontuações são sugeridas, junto com os motivos ("Por que estou vendo isso?").
 */
import { TOPICS, LEVELS, getCategory } from './topics.js';

/**
 * @param {Object} ctx
 * @param {{interesses:string[], nivel:string, tempo:number}|null} ctx.prefs
 * @param {Object<string, number>} ctx.completed
 * @param {string[]} ctx.favorites
 * @param {{id:string}[]} ctx.history
 * @param {Object} [options]
 * @param {number} [options.count=3]
 * @param {Set<string>} [options.exclude]   ids já mostrados (para "Gerar outras sugestões")
 * @returns {{topic: import('./topics.js').Topic, score:number, reasons:string[]}[]}
 */
export function recommend({ prefs, completed, favorites, history }, { count = 3, exclude = new Set() } = {}) {
  const favoriteRelated = new Set();
  for (const id of favorites) {
    const fav = TOPICS.find((t) => t.id === id);
    fav?.relacionados.forEach((r) => favoriteRelated.add(r));
  }
  const recent = new Set(history.slice(0, 5).map((h) => h.id));

  const scored = TOPICS.map((topic) => {
    let score = 0;
    const reasons = [];

    if (prefs) {
      if (prefs.interesses?.includes(topic.categoria)) {
        score += 3;
        reasons.push(`interesse em ${getCategory(topic.categoria).nome}`);
      }
      const diff = Math.abs(LEVELS[topic.nivel].ordem - (LEVELS[prefs.nivel]?.ordem ?? 1));
      if (diff === 0) {
        score += 2;
        reasons.push(`nível ${LEVELS[topic.nivel].nome.toLowerCase()}`);
      } else if (diff === 1) {
        score += 1;
      }
      if (prefs.tempo && topic.tempoLeitura <= prefs.tempo) {
        score += 1;
        reasons.push(`cabe nos seus ${prefs.tempo} min`);
      }
    } else if (topic.nivel === 'iniciante') {
      score += 2;
      reasons.push('bom ponto de partida para iniciantes');
    }

    if (favoriteRelated.has(topic.id) && !favorites.includes(topic.id)) {
      score += 1;
      reasons.push('relacionada aos seus favoritos');
    }
    if (recent.has(topic.id)) score -= 1;
    if (completed[topic.id]) score -= 5;

    return { topic, score, reasons };
  });

  // Ordena por pontuação; empates são resolvidos por menor tempo de leitura e depois A–Z.
  scored.sort((a, b) =>
    b.score - a.score ||
    a.topic.tempoLeitura - b.topic.tempoLeitura ||
    a.topic.titulo.localeCompare(b.topic.titulo, 'pt-BR'));

  let pool = scored.filter((s) => !exclude.has(s.topic.id));
  if (pool.length < count) pool = scored; // já mostrou tudo: recomeça o ciclo
  return pool.slice(0, count);
}
