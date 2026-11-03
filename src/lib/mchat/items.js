// Perguntas da M-CHAT-R em português.
// ATENÇÃO: os textos são protegidos por direitos autorais (© 2009 Diana Robins,
// Deborah Fein & Marianne Barton). Uso digital/online exige autorização escrita
// dos autores. Enquanto `text` for null a triagem fica desligada no site,
// mesmo com VITE_MCHAT_ENABLED=true. Quando a autorização chegar:
// 1) colar aqui a tradução oficial validada (Losapio & Pondé, 2008),
// 2) incluir o aviso de copyright exigido em COPYRIGHT_NOTICE,
// 3) ligar VITE_MCHAT_ENABLED na Vercel.

export const COPYRIGHT_NOTICE = null;

export const MCHAT_ITEMS = Array.from({ length: 20 }, (_, i) => ({ n: i + 1, text: null, example: null }));

export const itemsReady = () => MCHAT_ITEMS.every((it) => typeof it.text === 'string' && it.text.trim().length > 0) && !!COPYRIGHT_NOTICE;

export const mchatEnabled = () => import.meta.env?.VITE_MCHAT_ENABLED === 'true' && itemsReady();
