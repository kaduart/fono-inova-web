// CHAVE ÚNICA de cada convênio: controla a página da rota E o botão/linha no modal do /links.
//
//  'em_andamento' → a rota mostra a PÁGINA DE INTERESSE (formulário, noindex, sem afirmar credenciamento)
//  'ativo'        → a rota volta a mostrar a LP COMPLETA (arquivos *LP.tsx, preservados) e o /links libera o link
//
// Só mudar para 'ativo' com CONFIRMAÇÃO FORMAL do credenciamento. Ao ativar:
//  1. revisar os textos da LP (especialidades realmente liberadas; IPASGO começa só com Terapia Ocupacional)
//  2. adicionar a URL ao public/sitemap.xml e rodar o IndexNow (scripts/indexnow.js)
//  3. (opcional) chamar a lista de interesse do convênio no CRM: Vendas & Marketing → Interesse em Convênios
//
// Bradesco Saúde ainda não tem LP completa: mesmo 'ativo' precisa de uma LP nova (modelo: BaseAereaAnapolis.tsx).
export type ConvenioStatus = 'ativo' | 'em_andamento';

export const CONVENIOS_STATUS: Record<'baan' | 'geap' | 'ipasgo' | 'bradesco', ConvenioStatus> = {
  baan: 'ativo', // credenciado há meses (confirmado)
  geap: 'em_andamento',
  ipasgo: 'em_andamento',
  bradesco: 'em_andamento',
};
