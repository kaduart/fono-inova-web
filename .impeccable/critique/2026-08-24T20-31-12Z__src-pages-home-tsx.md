---
target: "todo o site (primary target: src/pages/Home.tsx)"
total_score: 14
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 3
timestamp: 2026-08-24T20-31-12Z
slug: src-pages-home-tsx
---
# Impeccable Critique — Clínica Fono Inova

## Design Health Score

| # | Heuristic | Score | Key issue |
|---|---|---:|---|
| 1 | Visibility of System Status | 1/4 | O envio válido do modal pode quebrar em `setCrmStatus`; sucesso/erro não chega ao usuário. |
| 2 | Match System / Real World | 3/4 | Linguagem de sintomas e WhatsApp são familiares; especialidades clínicas ainda exigem interpretação. |
| 3 | User Control and Freedom | 2/4 | Há fechar/cancelar, mas faltam Escape, captura e restauração de foco. |
| 4 | Consistency and Standards | 1/4 | Home atual, páginas legadas e LP dinâmica parecem produtos distintos. |
| 5 | Error Prevention | 1/4 | Validação parcial, setter indefinido e retorno do CRM ignorado. |
| 6 | Recognition Rather Than Recall | 3/4 | Opções estão visíveis, mas catálogos sobrepostos exigem reinterpretação. |
| 7 | Flexibility and Efficiency | n/a | Superfície Persuade; aceleradores de power user não são critério relevante. |
| 8 | Aesthetic and Minimalist Design | 2/4 | Hero forte, porém cards, provas e CTAs repetidos diluem o foco. |
| 9 | Error Recovery | 1/4 | Erros de campo não são anunciados e falhas de CRM/WhatsApp não têm recuperação clara. |
| 10 | Help and Documentation | n/a | Superfície Persuade; FAQ e explicação contextual entram em clareza. |
| **Total** | | **14/32** | **Poor — 43,8%** |

## Design Specificity Verdict

A Home passou a ter elementos próprios da Fono Inova: entrada por sintomas, Anápolis/Jundiaí, fotos reais, teal institucional e WhatsApp como primeira conversa. Essa autoria desaba abaixo da dobra e entre rotas. Grades genéricas, páginas shadcn legadas e a LP índigo/roxa fazem o conjunto parecer costurado. O diferencial real — cuidado multidisciplinar coordenado — ainda não organiza a narrativa nem a composição.

O detector examinou 122 arquivos e retornou 330 sinais: 180 warnings e 150 advisories. Contagens: `side-tab` 120, `ai-color-palette` 43, `bounce-easing` 10, `gradient-text` 4, `overused-font` 2, `border-accent-on-rounded` 1, `design-system-color` 125, `design-system-font-size` 23 e `design-system-radius` 2. Muitos `side-tab`, cores da LP e usos de Inter são falsos positivos contextuais; bounce, textos em gradiente e concentrações de cores fora do sistema confirmam deriva real.

Não houve overlay visual confiável: a varredura por URL exigiu Puppeteer, que não está instalado, e nenhuma dependência foi adicionada. A evidência visual foi substituída por leitura integral de código e scan estático.

## Overall Impression

O topo atual é acolhedor e mais autoral. O restante vira um funil longo e insistente: repete escolhas, prova social e WhatsApp em vez de conduzir um pai preocupado até uma decisão simples. A maior oportunidade é transformar “uma equipe coordenada entende o todo” no eixo da experiência.

## What's Working

- O Hero atual combina marca, localidade, imagens reais e uma ação compreensível.
- O seletor de sintomas fala na linguagem dos pais e preenche a mensagem do WhatsApp.
- O WhatsApp é reconhecível e coerente com a expectativa de contato local.

## Cognitive Load

Carga alta: 5 de 8 itens falham. Falham foco único, chunking, uma coisa por vez, escolhas mínimas e divulgação progressiva. Passam agrupamento, hierarquia visual por margem estreita e memória de trabalho. Decisões acima de quatro opções: dropdown do Header (7), seletor de sintomas (6), especialidades locais (9), tratamentos destacados (10), ServiceCards (10) e Footer (8).

## Emotional Journey

O início reduz ansiedade com localidade, linguagem simples e contato direto. O meio vira um vale emocional: catálogos e CTAs repetidos fazem o cuidado parecer máquina de conversão. Urgência, resultados e números não confirmados podem trocar acolhimento por culpa. O pico correto deveria ser “não precisa saber qual especialidade procurar; a equipe coordena o primeiro passo”.

## Priority Issues

### P0 — Agendamento do Header pode quebrar

`BookingModal.jsx` chama `setCrmStatus('sending')`, mas o setter não existe. Uma submissão válida pode parar antes do CRM e do WhatsApp. Implementar máquina de estado real ou remover a chamada, tratar retorno do CRM e oferecer fallback direto. Suggested command: `$impeccable harden`.

### P1 — Confiança baseada em dados não confirmados

PRODUCT.md não confirma depoimentos, resultados, anos ou contagens, mas Home e LPs mostram “+500 famílias”, “4.9”, casos de evolução e resposta em cinco minutos. Substituir por evidência verificável: credenciais, fotos, endereço, processo da avaliação e Google ao vivo. Suggested command: `$impeccable clarify`.

### P1 — Pais precisam classificar o caso em catálogos sobrepostos

Seis sintomas são seguidos por 9 especialidades, 10 tratamentos e mais 10 ServiceCards. Reorganizar como sintoma → triagem coordenada → avaliação → plano, com divulgação progressiva. Suggested command: `$impeccable distill`.

### P1 — Deriva entre rotas destrói autoridade

Home teal/marfim, páginas shadcn e LP índigo/roxa usam sistemas e interações diferentes. Unificar shell, escala, cor funcional, CTA, card e semântica; migrar rotas de maior tráfego primeiro. Suggested command: `$impeccable extract`.

### P2 — Popup compete com o fluxo e simula imediatismo

O popup abre automaticamente, atrasa CTA com digitação, mostra input cenográfico e promete cinco minutos. Disparar por intenção, identificar automação, expor CTA imediatamente e usar horário real de resposta. Suggested command: `$impeccable quieter`.

## Persona Red Flags

**Jordan:** precisa diferenciar sintomas, tratamentos e especialidades; “Agendar” abre formulário enquanto outros CTAs vão direto ao WhatsApp; a falha do modal não oferece recuperação.

**Riley:** encontra setter indefinido, retorno de CRM não verificado, labels sem associação, modal sem semântica/foco e interações inconsistentes entre link, botão e div clicável.

**Casey:** enfrenta página muito longa, popup sobre a área do polegar, três campos antes do WhatsApp e CTA atrasado por digitação automática.

## Minor Observations

- Múltiplos H2 no Hero enfraquecem a hierarquia.
- Prova social aparece três vezes na primeira dobra.
- Footer ainda mostra 2025 e e-mail divergente do PRODUCT.md.
- Logo do Header usa lazy loading acima da dobra.
- Dropdown não possui `aria-expanded`, `aria-controls`, Escape ou estado ativo.
- `ServiceCards` ignora a prop de tracking recebida pela Home e renderiza SEO próprio dentro da seção.
- `#root` limita fundos que parecem full-width.
- Cards da Home aninham botão em link; LPs usam div clicável.

## Questions to Consider

- E se o visitante nunca precisasse escolher uma especialidade?
- Sem números e depoimentos, que evidência concreta provaria confiança?
- A Home pode ser organizada em torno de “uma equipe, um primeiro contato, um plano coordenado”?
- O popup faz o pai se sentir cuidado ou conduzido por um funil?
