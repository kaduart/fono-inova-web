# Mapa das páginas do site (onde cada coisa mora)

Atualizado em 2026-10-13. Regra: para achar a página, procure a ROTA em `src/App.jsx`; o componente está no `element=`.

## 1. Páginas fixas — `src/pages/*.tsx` (SEO local e institucionais)
Rotas declaradas em `src/App.jsx`. Quando existe redirect para outra página, o redirect também está lá (`<Navigate>`).

| Assunto | Rota | Arquivo |
|---|---|---|
| Fonoaudiologia | /fonoaudiologia-anapolis | FonoaudiologiaAnapolis.tsx |
| Psicologia infantil | /psicologia-infantil-anapolis | PsicologiaInfantilAnapolis.tsx |
| Terapia ocupacional | /terapia-ocupacional-anapolis | TerapiaOcupacionalAnapolis.tsx |
| Fisioterapia infantil | /fisioterapia-infantil-anapolis | FisioterapiaInfantilAnapolis.tsx |
| Teste da linguinha | /teste-da-linguinha-anapolis | TesteLinguinhaAnapolis.tsx |
| Avaliação neuropsicológica | /avaliacao-neuropsicologica-anapolis | AvaliacaoNeuropsicologicaAnapolis.tsx |
| Neuropediatra | /neuropediatra-anapolis | NeuropediatriaPage.tsx |
| Autismo / Fala tardia / TDAH / Dislexia | /autismo-anapolis, /fala-tardia-anapolis, /tdah-anapolis, /dislexia-anapolis | AutismoAnapolis, FalaTardiaAnapolis, TdahAnapolis, DislexiaAnapolis |
| Convênios | /convenio-*-anapolis | BaseAereaAnapolis, GeapAnapolis, IpasgoAnapolis, BradescoSaudeAnapolis |
| Apoio às famílias (noindex até revisão) | /apoio-as-familias | ApoioFamilias.tsx |
| Institucionais | /, /nossa-clinica, /equipe, /faq, /links | Home, Clinica, Equipe, Faq, LinksBio |

Convênios: `GeapAnapolisLP.tsx` e `IpasgoAnapolisLP.tsx` são carregados por `GeapAnapolis.tsx` e `IpasgoAnapolis.tsx` (import dinâmico). Preservados até o credenciamento voltar. Não apagar.

## 2. Landing pages de nicho — `src/data/landing-pages/*.js`
Rota: `/lp/:slug`. Um único template renderiza todas: `src/pages/lp/LandingPage.jsx`.
Para criar ou editar uma LP: edite o registro no `.js` da categoria (aprendizagem, autismo, fonoaudiologia, geograficas, psicologia). Não precisa mexer em rota.
Os slugs entram sozinhos em `valid-paths.generated.js` (rodado no `prebuild`).

## 3. Registro para o CRM — `src/data/landingPageRegistry.ts`
Lista de páginas com mensagem de WhatsApp e `id` usados por `ButtonWhatsApp`/CRM. Ao criar uma página nova, registre aqui.

## 3.1 Galeria de fotos
`src/components/ClinicGallery.tsx` (fotos reais em `public/images/clinica/galeria/*.webp`). Reutilizável em qualquer página: `<ClinicGallery />`. Hoje usada em /apoio-as-familias.

## 4. Telefone
Só o celular/WhatsApp: (62) 99201-3573. O fixo foi retirado do site.

## 5. Pendências de SEO
- Duplicadas (fixa x /lp/): avaliacao-neuropsicologica-anapolis, terapia-ocupacional-anapolis, fonoaudiologo-anapolis (vs fonoaudiologia-anapolis), psicologo-infantil-anapolis (vs psicologia-infantil-anapolis). Plano: canonical da /lp/ aponta para a fixa. Decidir depois de ver o Search Console.
- As rotas /lp/* não estão no `public/sitemap.xml`.
- Plano geral de consolidação: `ESTRATEGIA_LP_CONSOLIDACAO.md`.
