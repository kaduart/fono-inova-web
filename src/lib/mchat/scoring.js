// Motor de pontuação da triagem M-CHAT-R (Robins, Fein & Barton, 2009).
// Só regras de cálculo; os textos das perguntas ficam em items.js e só entram
// depois da autorização dos autores (www.mchatscreen.com). Ver docs/MCHAT.md.

export const MCHAT_TOTAL_ITEMS = 20;
/** Itens em que "Sim" indica risco; nos demais, "Não" indica risco. */
export const REVERSE_ITEMS = [2, 5, 12];
export const MIN_AGE_MONTHS = 16;
export const MAX_AGE_MONTHS = 30;

export function ageInMonths(birthDate, today = new Date()) {
  const b = new Date(birthDate);
  if (Number.isNaN(b.getTime())) return null;
  let m = (today.getFullYear() - b.getFullYear()) * 12 + (today.getMonth() - b.getMonth());
  if (today.getDate() < b.getDate()) m -= 1;
  return m;
}

export function isEligibleAge(months) {
  return Number.isInteger(months) && months >= MIN_AGE_MONTHS && months <= MAX_AGE_MONTHS;
}

/**
 * answers: { [itemNumber 1..20]: true (Sim) | false (Não) }
 * Retorna { complete, score, riskItems, level } — level: 'baixo' | 'medio' | 'alto' | null
 */
export function scoreMchat(answers) {
  const riskItems = [];
  let answered = 0;
  for (let n = 1; n <= MCHAT_TOTAL_ITEMS; n++) {
    const a = answers?.[n];
    if (a !== true && a !== false) continue;
    answered++;
    const atRisk = REVERSE_ITEMS.includes(n) ? a === true : a === false;
    if (atRisk) riskItems.push(n);
  }
  const complete = answered === MCHAT_TOTAL_ITEMS;
  const score = riskItems.length;
  const level = !complete ? null : score <= 2 ? 'baixo' : score <= 7 ? 'medio' : 'alto';
  return { complete, answered, score, riskItems, level };
}

/** Orientação ao responsável (texto da clínica, não do instrumento). */
export function guidanceFor(level, months) {
  if (level === 'baixo') {
    return months < 24
      ? 'Baixo risco neste momento. Vale repetir a triagem depois dos 2 anos e conversar com o pediatra na próxima consulta.'
      : 'Baixo risco neste momento. Se algo no desenvolvimento ainda preocupa você, uma conversa com a nossa equipe ajuda a tirar a dúvida.';
  }
  if (level === 'medio') {
    return 'Risco moderado. O próximo passo é uma entrevista de seguimento com um profissional, que confirma ou descarta os pontos de atenção.';
  }
  if (level === 'alto') {
    return 'Risco elevado. O indicado é agendar uma avaliação do desenvolvimento o quanto antes. Triagem não é diagnóstico.';
  }
  return '';
}

/** Resumo curto que vai para o ERP junto com o lead. */
export function leadSummary(result, months) {
  return `Triagem M-CHAT-R: risco ${result.level} (${result.score}/20), criança com ${months} meses`;
}
