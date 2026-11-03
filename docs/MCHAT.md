# Triagem M-CHAT-R no site

**O que é:** questionário de 20 perguntas para pais de crianças de 16 a 30 meses, com resultado na hora (baixo, moderado ou alto risco) e captação do lead para o ERP.

**Estado:** desligado. A rota `/triagem-autismo-m-chat` só existe quando as duas condições valem:
1. `VITE_MCHAT_ENABLED=true` na Vercel;
2. os 20 textos e o aviso de copyright preenchidos em `src/lib/mchat/items.js`.

**Por quê desligado:** a M-CHAT-R (© 2009 Robins, Fein & Barton) é de uso livre em papel, mas versão digital/online exige autorização escrita dos autores (mchatscreen.com). Sem autorização, não colocar os textos no repositório.

## Regras (src/lib/mchat/scoring.js)
- Itens 2, 5 e 12: "Sim" pontua risco. Demais: "Não" pontua risco.
- 0–2 baixo (abaixo de 24 meses: repetir após os 2 anos), 3–7 moderado (entrevista de seguimento), 8–20 alto (avaliação).
- Fora de 16–30 meses o teste não começa.
- Conferir: `node scripts/mchat-selftest.mjs`

## Lead
`sendLeadToCRM` → `POST /api/leads/from-website` com `formSource: triagem_mchat` e o resumo em `serviceInterest`; o back grava "Interesse: Triagem M-CHAT-R: risco …" nas notas do lead. Só com consentimento LGPD marcado.

## Para ligar
1. Autorização por escrito dos autores (guardar o e-mail).
2. Colar a tradução oficial em português e o `COPYRIGHT_NOTICE` exigido.
3. Incluir a rota em `scripts/generate-valid-paths.js`/sitemap se for indexar.
4. `VITE_MCHAT_ENABLED=true` na Vercel e novo deploy.
