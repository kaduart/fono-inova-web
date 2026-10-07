# SEO Fono Inova — 02 · Análise do código do site

Projeto: `C:\Users\User\Documents\projetos\site` · Data: 07/10/2026 · Somente leitura (nada foi alterado no repositório; os arquivos `.env*` não foram abertos).
Stack: Vite + React 19 (SPA) + react-router + react-helmet-async, hospedado na Vercel, com Edge Middleware que envia bots ao Prerender.io.

## Resumo

- **Soft 404 confirmado no código:** `vercel.json` reescreve `/(.*)` para `/` e `App.jsx` não tem rota `*`. Qualquer URL inventada devolve HTTP 200 com o shell do site (testado no site publicado).
- **O HTML inicial é vazio por design:** o título, H1, canonical e conteúdo só existem depois do JavaScript. Quem entrega HTML pronto é o Prerender.io, e só para bots da lista do `middleware.js`.
- **Crawlers de IA não recebem o HTML pronto:** o `robots.txt` libera GPTBot, ClaudeBot, PerplexityBot e OAI-SearchBot, mas o `middleware.js` não os inclui na lista de bots. Eles veem o shell vazio.
- **Dados que se contradizem:** schema com nota 5.0 / 36 avaliações fixas, site com 4.9, Maps com 5,0 / 39; horário 08–19h numa página, 08–18h no schema e em 13 lugares.
- **Confiança e compliance:** depoimentos com nomes repetidos e idades diferentes entre páginas (parecem modelo), promessas de prazo e "cada dia de espera é um dia de atraso".
- **Boa notícia:** 50 arquivos usam o componente `SEO` com title, description e canonical por página; sitemap e rotas estão bem organizados (129 URLs, 101 artigos).

## Achados e correções (por prioridade)

### P0 — técnico

**1. 404 real para URLs inexistentes**
- Causa: `vercel.json` (rewrite `/(.*)` → `/`) + ausência de `<Route path="*">` em `src/App.jsx`. A rota `/lp/:slug` mostra "Página não encontrada" na tela (`src/pages/lp/LandingPage.jsx:62`), mas com status 200.
- Correção em duas camadas:
  - a) Rota coringa com noindex e sinal ao Prerender.io (resolve para bots):
    ```jsx
    // src/App.jsx, depois da rota /lp/:slug
    <Route path="*" element={<NotFoundPage />} />
    ```
    ```jsx
    // src/pages/NotFoundPage.jsx (novo)
    import { Helmet } from 'react-helmet-async';
    export default function NotFoundPage() {
      return (
        <>
          <Helmet>
            <title>Página não encontrada | Clínica Fono Inova</title>
            <meta name="robots" content="noindex" />
            <meta name="prerender-status-code" content="404" />
          </Helmet>
          <main><h1>Página não encontrada</h1><a href="/">Voltar ao início</a></main>
        </>
      );
    }
    ```
  - b) Status 404 de verdade para qualquer visitante: no `middleware.js`, antes da checagem de bot, responder 404 quando o caminho não está numa lista de rotas válidas gerada no build (a partir do sitemap + rotas do `App.jsx` + slugs de LP). Decisão de projeto: exige manter essa lista. Alternativa: trocar o rewrite genérico por rewrites explícitos e servir um `public/404.html`. Testar a ordem redirects → middleware → rewrites na Vercel antes de publicar.

**2. Redirecionamentos feitos no navegador (soft redirect)**
`<Navigate>` do React devolve 200 e redireciona depois. Estas rotas não estão no `vercel.json`: `/artigos/fono-guia-completo`, `/artigos/entendendo-espectro-autista`, `/freio-lingual`, `/fonoaudiologia-infantil-anapolis`, `/fonoaudiologo-infantil-anapolis`, `/avaliacao-fonoaudiologica`, `/atraso-de-fala-infantil`, `/psicologo-infantil-anapolis`, `/psicologa-infantil-anapolis`, `/consulta-psicologo-infantil`, `/consulta-neuropediatra-infantil`, `/avaliacao-neurologica-infantil`, `/convenio-bradesco-anapolis`. Mover para `vercel.json` com `"permanent": true`.
Cadeias de dois saltos em `vercel.json`: `/lp/dificuldade-pronunciar-r` e `/lp/fala-enrolada-crianca` apontam para `/lp/troca-letras-crianca`, que redireciona para `/dislexia-anapolis`. Apontar direto para o destino final.

**3. Prerender.io**
- `middleware.js` usa `PRERENDER_TOKEN` com valor de reserva `'SEU_TOKEN_PRERENDER_IO_AQUI'`. Não consegui confirmar se o token está configurado na Vercel (o shell daqui não alcança o site com User-Agent de bot). Teste na sua máquina:
  ```
  curl -s -A "Googlebot" https://www.clinicafonoinova.com.br/fonoaudiologia-anapolis | grep -iE "<title>|<h1|canonical"
  ```
  Se vier título genérico e sem H1, o prerender não está atuando.
- Lista de bots: acrescentar `gptbot|oai-searchbot|chatgpt-user|claudebot|claude-user|perplexitybot|applebot|google-inspectiontool` ao `BOT_AGENTS` (o último é o da inspeção ao vivo do Search Console; confirmar o User-Agent exato na documentação do Google).
- Caminho de médio prazo: pré-renderizar no build (as ~129 URLs estáticas) para não depender de serviço externo e de limite de 250 páginas/mês do plano gratuito.

**4. Título longo e marca repetida em `SEO.jsx`**
`title.includes("Clínica Fono Inova")` ignora títulos que só dizem "Fono Inova". Em `FonoaudiologiaAnapolis.tsx:118` o título final fica "Fonoaudiologia em Anápolis | Fono Inova — Especialistas Infantil | Clínica Fono Inova em Anápolis" (cerca de 96 caracteres, truncado no Google; é o que o código gera, não conferi renderizado).
```jsx
// src/components/SEO.jsx
const fullTitle = /fono inova/i.test(title) ? title : `${title} | Clínica Fono Inova`;
// <title>{fullTitle}</title>
```
Revisar também os demais títulos para ficar perto de 60 caracteres e descriptions até ~155.

**5. AdsBot bloqueado nas LPs**
`public/robots.txt` bloqueia `AdsBot-Google` em `/lp/`, `/obrigado/` e `/campanha/`. O histórico do git cita conversões de WhatsApp "das LPs", o que indica que recebem anúncio. Se recebem, remover esses blocos (o comentário "economizar crawl budget" não vale para o AdsBot) para evitar reprovação por destino não rastreável. Confirme no Google Ads.

### P1 — dados e confiança

**6. Avaliação e horário**
- `src/schemas/clinicaSchemas.js:171-174` e `:864-867`: `ratingValue "5.0"` e `reviewCount "36"` fixos. Site mostra 4.9, Maps mostra 5,0 / 39. Centralizar numa constante usada pelo texto e pelo schema, ou remover o `aggregateRating` (o Google costuma não exibir estrelas para avaliação do próprio negócio).
- Horário: `src/pages/Clinica.tsx:180` diz 08:00 às 19:00; o schema (`clinicaSchemas.js:53-60`) diz 08–18h de semana e sábado 08–12h; 13 trechos dizem "Segunda a Sexta, 8h às 18h"; o Maps mostra fechamento às 18:00. Definir o horário real (e se há sábado) e usar uma constante única.

**7. Telefones**
- WhatsApp (62) 99201-3573 (62 ocorrências, o mesmo do Maps) e fixo (62) 3706-3924 (58): consistentes, não é erro de NAP. Definir o principal.
- Números soltos para conferir: `src/pages/Privacidade.jsx:179` ((62) 99331-5967) e dois sem formatação (`6276786597`, `6222536920`) em arquivos que não localizei. Centralizar em `src/constants/` (a pasta existe).

**8. Depoimentos e promessas**
- Mesmos nomes com idades e condições diferentes entre páginas: "Mãe do Pedro" (4, 5 e 9 anos), "Mãe do Lucas" (3, 6 com TEA e 2 anos e 8 meses), "Pai da Sofia" (5 e 7 anos) em `BaseAereaAnapolis.tsx`, `ClinicaMultidisciplinar.tsx`, `ComportamentoInfantilPage.tsx`, `DislexiaPage.tsx`, `FalaTardiaPage.tsx`, `FisioPage.tsx`; e "Ana Oliveira / Carlos Silva / Maria Santos" em `TestimonialCards.jsx`. Trocar por depoimentos reais com autorização ou remover. Conselhos profissionais de saúde costumam restringir depoimentos em publicidade; vale confirmar com o conselho.
- Promessas a revisar: "Avaliação em 48h" (`AvaliacaoNeuropsicologicaAnapolis.tsx:199`, `LPAvaliacaoInfantil.tsx:249`), "Resposta em até 2h" (Home, `ComportamentoInfantilPage`, `FalaTardiaPage`, `TdahAvaliacaoPage`), "Sem filas de espera" (`Home.tsx:1120`), "mais rápido seu filho evolui" (`Home.tsx:1107`), "Cada dia de espera é um dia de atraso…" (5 páginas, incluindo `AvaliacaoNeuropsicologicaAnapolis.tsx:403`, `FisioterapiaInfantilAnapolis.tsx:517`).

**9. Convênios ainda não confirmados**
Só `/convenio-base-aerea-anapolis` está no sitemap. As rotas `/convenio-ipasgo-anapolis`, `/convenio-geap-anapolis` e `/convenio-bradesco-saude-anapolis` existem e `IpasgoAnapolis.tsx`, `GeapAnapolis.tsx` e `BradescoSaudeAnapolis.tsx` não importam `SEO` nem Helmet diretamente (pode haver componente interno; conferir). Comentário no `App.jsx` diz que o IPASGO não está confirmado. Enquanto não houver credenciamento: `noindex` nessas páginas e nenhum texto que sugira cobertura ou reembolso garantido.

### P2 — conteúdo (depende do Search Console)

- Reforçar `/fonoaudiologia-anapolis` e `/autismo-anapolis` com profissional responsável (nome e registro), 1ª avaliação, documentos, localização e preço explicado antes (detalhes no relatório 01).
- `meta keywords` em `SEO.jsx` não tem efeito no Google; pode sair.
- FAQ continua útil para as famílias, sem esperar destaque nos resultados.

## O que eu não consegui verificar

- A resposta do site com User-Agent de bot (rede bloqueada neste ambiente) e se o `PRERENDER_TOKEN` está ativo na Vercel.
- O título renderizado de cada página (só o que o código gera); o Search Console mostra o que o Google escolheu.
- Se as páginas de convênio sem `SEO` herdam metadados de um componente interno.

## Ordem sugerida

1. NotFound + 404 real (item 1) e redirects 301 no `vercel.json` (item 2).
2. Confirmar o Prerender (item 3) e liberar o AdsBot (item 5).
3. `SEO.jsx` e títulos (item 4); constantes de avaliação, horário e telefone (itens 6 e 7).
4. Depoimentos, promessas e noindex dos convênios (itens 8 e 9).
5. Conteúdo das páginas de serviço, com os dados do Search Console.

Para aplicar: posso fazer os itens 1, 2, 4 e 5 em um branch separado e entregar o diff para você revisar antes de publicar.
