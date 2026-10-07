# SEO Fono Inova — 01 · Concorrentes em Anápolis-GO (rev. 2)

Coleta: 07/10/2026 · Método: 4 prompts do SEO Genome (https://seogenome.com/seo-tecnico/prompts-de-seo-com-claude/) + conferência contra o site real depois da revisão externa que você colou.

> Status dos 4 passos
> 1. Fraquezas dos concorrentes: feito (GoHoushi, Therapies Love Kids e Anna Helena lidos; Teia não abriu)
> 2. Palavras-chave (autocompletar): feito (16 buscas)
> 3. Perfil da Empresa: parcial (ranking e dados do perfil; faltam as publicações dos concorrentes)
> 4. Semrush: parcial (só GoHoushi). Fono Inova e Therapies Love Kids pausados: o Semrush pediu para confirmar "muitas sessões ativas". Não forcei. Retomar depois que você encerrar a outra sessão.

---

## Correções à versão 1 (eu errei nestes pontos)

| O que eu disse | O que a conferência mostrou |
|---|---|
| "Blog parado desde junho/2025, só 3 artigos" | Errado. Li só a vitrine da home (3 cards com data 05/06/2025). O sitemap lista **101 URLs de artigos** (129 URLs únicas no total), com lastmod até 14/09/2026 (a data do sitemap não prova atualização real do conteúdo). |
| "Criar páginas de autismo, convênios, especialidades" | Elas já existem no sitemap: `/autismo-anapolis`, `/convenio-base-aerea-anapolis`, `/fonoaudiologia-anapolis`, `/terapia-ocupacional-anapolis`, `/neuropediatra-anapolis`, `/avaliacao-neuropsicologica-anapolis`, `/teste-da-linguinha-anapolis`, `/avaliacao-tdah-anapolis`, `/equipe`. O trabalho é **auditar e fortalecer**, não criar. |
| "Nome do Maps com palavras-chave está ok" | Não está. O nome atual ("Clínica Fono Inova \| Fonoaudiólogo \| Terapeuta Ocupacional \| Psicólogo \| Anápolis") acrescenta termos ao nome da empresa, o que as regras do Google Business Profile não permitem. Risco de suspensão. Revisar. |
| "Telefones diferentes = erro de NAP" | Não é erro. No código, o WhatsApp (62) 99201-3573 (o mesmo do Maps) aparece 62 vezes e o fixo (62) 3706-3924, 58. Definir o principal e manter o outro como adicional. Números soltos para conferir estão no relatório 02. |
| "Páginas com FAQ schema" como ganho | O resultado enriquecido de FAQ foi descontinuado pelo Google em maio/2026 (segundo a revisão externa; não conferi na fonte). Manter FAQ para as famílias, sem esperar destaque. |

---

## Resumo

- **Base técnica primeiro.** Confirmei no navegador: uma URL inventada (`/pagina-que-nao-existe-xyz-123`) responde **HTTP 200** e mostra o shell do site, em vez de 404. O **HTML inicial** da página de fono vem com título genérico, sem H1, sem canonical e com contêiner vazio (3.617 caracteres no total); o conteúdo e o título por página aparecem só depois do JavaScript rodar. O Google processa JavaScript, então isso não significa que ele não leia o site, mas o que foi renderizado, indexado e escolhido como canonical só o Search Console mostra.
- **Robots.txt bloqueia o AdsBot em `/lp/`, `/obrigado/` e `/campanha/`.** Se essas URLs recebem anúncio do Google Ads, o bloqueio pode gerar reprovação por destino não rastreável. Assunto de Ads, separado do SEO orgânico.
- **Maps:** a Fono Inova está em 5º em "fonoaudiologia infantil em Anápolis" (5,0 · 39 avaliações). Em "clínica multidisciplinar autismo TEA em Anápolis" não aparece. Avaliações ajudam, mas 39 vs 184 não explica a posição sozinho.
- **GoHoushi** é forte no Maps e fraca no orgânico (Semrush detecta 1 palavra). Os concorrentes têm sites rasos, sem preço, FAQ ou páginas por serviço. A vantagem em conteúdo é da Fono Inova.
- **Prioridade:** Search Console → técnica → fortalecer as páginas que já existem → Maps. Semrush é complemento.

---

## 1. Conferência técnica (07/10/2026)

| Item | Resultado | Como conferi |
|---|---|---|
| Sitemap | **129 URLs únicas** (minha primeira contagem, 149, estava errada: veio de um resumo do WebFetch) | leitura do XML no navegador, contando `<loc>` |
| Datas do sitemap | lastmod de 19/06/2026 a 14/09/2026; não comprova publicação ou atualização real | idem |
| Artigos | **101 URLs de artigos** + índice `/artigos` (corrige os "55" da contagem anterior) | idem |
| HTML bruto de `/fonoaudiologia-anapolis` | HTTP 200; título genérico; sem H1; sem canonical; contêiner vazio | `fetch` da página no navegador |
| Robots.txt | AdsBot-Google bloqueado em `/lp/`, `/obrigado/`, `/campanha/`; crawlers de IA liberados; `Sitemap` declarado | WebFetch em `/robots.txt` |
| URL inexistente | HTTP 200 | navegador, rede |
| Título depois do JavaScript | próprio por página (ex.: autismo: "Suporte para Autismo (TEA) em Anápolis \| Clínica Fono Inova"); na URL inventada fica o genérico | aba do navegador (na 1ª leitura eu capturei antes da página carregar e li o genérico por engano) |
| Home | título próprio ("...\| Fonoaudiologia e Psicologia Infantil") | leitura da página |

Separar duas verificações: a resposta do servidor (HTML inicial, status, 404) eu confirmo sem Search Console; o que o Google renderizou, indexou e escolheu como canonical só o Search Console mostra.

---

## 2. Páginas existentes: o que falta nelas

**`/fonoaudiologia-anapolis`** (lida renderizada)
- Tem: sinais de alerta, fluxo em 3 passos, blocos de conteúdo, FAQ.
- Falta: **nome e registro do profissional responsável**, o que acontece na 1ª avaliação, duração, documentos, localização/mapa na página e preço (com o valor explicado antes). Conteúdo muito conceitual ("Tecnologias e Recursos", "Prevenção") e pouco específico de Anápolis.
- Depoimentos sem sobrenome ("Mãe do Pedro, 4 anos"): confirmar autenticidade e autorização.

**`/autismo-anapolis`** (lida renderizada)
- Tem: sinais de atenção, fluxo, equipe fono + TO + psicóloga, links internos.
- Falta: quem avalia (nomes e registros), neuropediatra citado sem link ou nome, duração das etapas, documentos que a família leva, o que a família recebe no final (devolutiva), preço, FAQ própria.
- Frase "Quanto mais cedo o suporte, maior o potencial" é promessa suave; trocar por orientação sobre quando buscar avaliação.

**Home** (lida renderizada)
- "4.9 no Google" vs 5,0 (39) no Maps → atualizar com o número real.
- "10+ anos" e "12+ especialistas": deixar claro se é da equipe ou da clínica.
- "Resposta em até 2h", "Sem filas de espera", "Últimos horários": manter só o que a operação cumpre.
- Horário: o Maps mostra fechamento às 18:00; a revisão externa diz que o rodapé e a página da clínica divergem (19h vs 18h). Não conferi o rodapé; padronizar com o horário real.

**Convênios:** `/convenio-base-aerea-anapolis` existe. O autocompletar mostra "ipasgo", "unimed", "convênios", mas só criar página para o que a clínica realmente atende. Separar: credenciado / particular com recibo para reembolso / em andamento. Sem prometer cobertura ou reembolso.

**ABA:** só ganha página se houver atendimento e equipe habilitada. O concorrente ter não é motivo.

---

## 3. Concorrentes (Maps e sites)

### "fonoaudiologia infantil em Anápolis"
| # | Perfil | Nota (aval.) | Tipo |
|---|--------|--------------|------|
| 1 | Anna Helena Brito | 5,0 (111) | Fono individual (tontura, audição, amamentação) |
| 2 | Samira Ribeiro (Clínica Attiva) | 5,0 (28) | Fono individual |
| 3 | Liliane C. M. Gonçalves | 5,0 (47) | Fono individual |
| 4 | GoHoushi | 5,0 (184) | Clínica multidisciplinar |
| 5 | **Fono Inova** | **5,0 (39)** | Clínica multidisciplinar |
| 6 | Laila Quésia A. de Castro | 5,0 (24) | Fono individual |
| 7 | CCER | 4,2 (24) | Centro de reabilitação |
| 8 | Enilza Cunha | sem avaliações | Fono individual |

### "clínica multidisciplinar autismo TEA em Anápolis"
Clínica Escola do Autista Teia (4,7 · 7), Therapies Love Kids (4,8 · 116), Instituto Sool (4,6 · 56). A Fono Inova não aparece. Uma busca isolada não representa toda Anápolis; a ordem muda com a localização de quem pesquisa.

### Sites
- **GoHoushi:** página única; ABA, convênio/reembolso, pagamento mensal, terapia em grupo (Hoshin LAB), responsável técnica com CRFa. Título do WordPress ainda padrão. Sem preço, sem FAQ.
- **Therapies Love Kids:** página mínima (nome, telefone, unidades Anápolis/Jaraguá/Goianésia).
- **Anna Helena Brito:** nicho otoneurologia/amamentação, não é concorrente direto de TEA.
- Não consegui abrir: Clínica Escola Teia (agirsaude.org.br). Não li: lailafono.com.br, centromedicojf.com.

---

## 4. Autocompletar do Google (sem volume)

| Grupo | Sugestões reais |
|---|---|
| Convênio | "fonoaudiologia anápolis ipasgo / unimed / convênios", "neuropediatra anápolis ipasgo / unimed", "psicólogo infantil anápolis unimed", "teste da linguinha unimed anapolis" |
| Preço | "fono anápolis preços", "fono anápolis preço popular" |
| Autismo | "avaliação autismo anápolis go / goiás / unimed", "melhor clínica autismo anápolis", "clínica escola do autista anápolis" |
| Fono infantil | "fonoaudiologia infantil anápolis", "fono infantil anapolis" |
| Outros | linguinha, neuropsicólogo, neuropediatra, terapia ocupacional, psicopedagogo, musicoterapia, psicólogo infantil |

Padrão: o Google completa com "go/goiás", convênios e a grafia sem acento. Não criar páginas duplicadas só para alternar "Anápolis/Anapolis".

---

## 5. Semrush — GoHoushi (Brasil, desktop, 06/10/2026)

| Palavra | Intenção | Posição | Volume | KD% | Página |
|---|---|---|---|---|---|
| fonoaudiologia anapolis | Comercial | 18 | 140 | 22 | home |

Como ler:
- "Tráfego 0" é estimativa do Semrush, não prova de zero visitas.
- "1 palavra" é o que a ferramenta detectou naquela base e configuração, não toda a presença orgânica.
- Posição 18 e KD 22% indicam oportunidade a investigar, não facilidade garantida nem 1ª posição.
- A conta mostrava "Start free trial": pode ser plano gratuito com dados limitados.
- Reforça o foco: melhorar `/fonoaudiologia-anapolis`, que já existe. Criar outra página para a mesma busca divide o trabalho entre URLs parecidas.

---

## 6. Ordem de execução (30 dias)

0. **Em paralelo, sem esperar o Search Console:** correção técnica no código (404 real, metadados e conteúdo no HTML inicial, sitemap vs rotas, dados de contato centralizados). Precisa do repositório.
1. **Search Console da Fono Inova** (Desempenho: Consultas e Páginas, últimos 3 meses, tipo Web; Indexação > Páginas com os motivos de não indexadas), em Excel ou CSV: página `/fonoaudiologia-anapolis` e buscas com "fono", "fonoaudiologia", "Anápolis". Inspecionar também autismo, TO, neuropediatra, neuropsicologia, linguinha: URL escolhida pelo Google, conteúdo renderizado, canonical, título.
2. **Base técnica:** título e description próprios por página; avaliar pré-renderização/SSR; 404 real para URL inexistente; revisar sitemap, redirecionamentos e links internos.
3. **Fortalecer as páginas que já vendem:** fono, autismo, TO, neuropediatra, neuropsicologia, convênios. Cada uma com profissional responsável (nome e registro), primeira avaliação, localização, condições de atendimento, WhatsApp com mensagem do serviço e preço com valor antes.
4. **Corrigir informações:** nota, horário, claims, depoimentos, telefone principal.
5. **Maps:** revisar nome (só o nome real), categorias que representem atendimentos reais, serviços, fotos atuais, pedido neutro de avaliação a todas as famílias, respostas sem expor dados de paciente, publicações úteis (sem esperar efeito garantido no ranking).
6. **AdsBot:** se `/lp/` ou `/campanha/` recebem anúncio, liberar o rastreamento.
7. **Medir:** cliques por serviço, contatos no WhatsApp, avaliações agendadas, comparecimentos e posições.

Evitar: dezenas de artigos antes de revisar as 129 URLs; palavras-chave em alt text sem relação com a imagem; duplicar páginas por grafia.

---

## Pendências

- Semrush: encerrar a outra sessão e retomar (Fono Inova e Therapies Love Kids, subdomínio `therapieslovekids.carrd.co`; mesma base, dispositivo e data).
- Search Console: preciso dos dados exportados ou do acesso.
- HTML bruto das páginas de serviço, para confirmar metadados e renderização.
- Para aplicar as correções técnicas, preciso do repositório do site.
- Publicações "Do proprietário" dos concorrentes no Maps (passo 3 do artigo).
