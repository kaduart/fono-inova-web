# 🎯 ESTRATÉGIA DE CONSOLIDAÇÃO DE LANDING PAGES

## 📊 DIAGNÓSTICO ATUAL

### LPs Dinâmicas Existentes (20)
```
📁 fonoaudiologia.js (8)
├─ crianca-2-anos-nao-fala          ✅ Manter (alto volume)
├─ atraso-na-fala-infantil          ⚠️ Consolidar → /fala-tardia
├─ troca-letras-crianca             ✅ Manter
├─ crianca-nao-forma-frases         ⚠️ Consolidar → crianca-2-anos-nao-fala
├─ gagueira-infantil                ✅ Manter (nicho específico)
├─ dificuldade-pronunciar-r         ⚠️ Consolidar → troca-letras
├─ fala-enrolada-crianca            ⚠️ Consolidar → troca-letras
└─ processamento-auditivo           ✅ Manter (nicho específico)

📁 autismo.js (5)
├─ sinais-autismo-bebe              ⚠️ Consolidar → avaliacao-autismo
├─ sinais-autismo-2-anos            ⚠️ Consolidar → avaliacao-autismo
├─ crianca-nao-responde-nome        ⚠️ Consolidar → avaliacao-autismo
├─ crianca-nao-olha-olhos           ⚠️ Consolidar → avaliacao-autismo
└─ avaliacao-tea-anapolis           ✅ Manter

📁 geograficas.js (4)
├─ fonoaudiologo-anapolis           ✅ Manter
├─ psicologo-infantil-anapolis      ✅ Manter
├─ terapia-ocupacional-anapolis     ✅ Manter
└─ avaliacao-neuropsicologica-anapolis ✅ Manter

📁 aprendizagem.js (2)
├─ sinais-dislexia                  ✅ Manter
└─ crianca-nao-aprende-ler          ⚠️ Consolidar → sinais-dislexia

📁 psicologia.js (1)
└─ crianca-agressiva                ✅ Manter
```

### Páginas Estáticas (22)
```
✅ PILLAR (manter como institucional)
├─ Home.tsx
├─ FonoPage.tsx
├─ PsisoPage.tsx
├─ TerapiaOcupacionaPage.tsx
├─ FisioPage.tsx
├─ PsicopedagogiaPage.tsx

✅ LPs DE CONVERSÃO (otimizar)
├─ FalaTardiaPage.tsx           → Unificar LP dinâmica aqui
├─ TeaPage.tsx                  → Unificar LP dinâmica aqui
├─ DificuldadeEscolarPage.tsx   → Unificar LP dinâmica aqui
├─ AdultoVozPage.tsx            → Manter separado
├─ FreioLingual.tsx             → Manter separado

⚠️ DUPLICADAS (remover/consolidar)
├─ PsicopedagogiaLPPage.tsx     → Consolidar em PsicopedagogiaPage.tsx
├─ NeuroPsicologia.tsx          → Consolidar
├─ ClinicaMultidisciplinar.tsx  → Consolidar em Clinica.tsx

📄 SUPORTE
├─ Articles.jsx / Article.jsx   ✅ Manter
├─ Faq.jsx                      ✅ Manter
├─ Equipe.tsx                   ✅ Manter
├─ Clinica.tsx                  ✅ Manter
```

---

## 🎯 NOVA ARQUITETURA (APÓS CONSOLIDAÇÃO)

### Total Final: ~25 páginas (-40% de redução)

```
📚 CAMADA 1: PILLAR (Institucional - Autoridade)
├─ / (Home)
├─ /fonoaudiologia
├─ /psicologia
├─ /terapia-ocupacional
├─ /fisioterapia
├─ /psicopedagogia
└─ /nossa-clinica

🎯 CAMADA 2: LPs POR DOR (Conversão)
├─ /fala-tardia                    (consolidado: 3 LPs → 1)
├─ /avaliacao-autismo              (consolidado: 5 LPs → 1)
├─ /dificuldade-escolar            (consolidado: 2 LPs → 1)
├─ /dislexia-infantil              (novo)
├─ /tdah-infantil                  (novo)
├─ /troca-letras                   (mantido)
├─ /gagueira-infantil              (mantido)
├─ /freio-lingual
├─ /fonoaudiologia-adulto
└─ /crianca-agressiva

📍 CAMADA 3: GEOGRÁFICAS (SEO Local)
├─ /fonoaudiologo-anapolis
├─ /psicologo-infantil-anapolis
├─ /terapia-ocupacional-anapolis
└─ /avaliacao-neuropsicologica-anapolis

📝 CAMADA 4: CONTEÚDO (Blog/FAQ)
├─ /artigos
├─ /artigos/:slug
└─ /faq
```

---

## 🔧 PLANO DE EXECUÇÃO

### FASE 1: Consolidação (Semana 1)
- [ ] 1.1 Criar redirects 301 para URLs consolidadas
- [ ] 1.2 Unificar conteúdo das LPs duplicadas
- [ ] 1.3 Remover arquivos de LPs obsoletas
- [ ] 1.4 Atualizar sitemap.xml

### FASE 2: Otimização (Semana 2)
- [ ] 2.1 Reescrever /fala-tardia (página estática)
- [ ] 2.2 Reescrever /avaliacao-autismo
- [ ] 2.3 Reescrever /dificuldade-escolar
- [ ] 2.4 Reescrever /fonoaudiologia-adulto

### FASE 3: Novas LPs (Semana 3)
- [ ] 3.1 Criar /dislexia-infantil
- [ ] 3.2 Criar /tdah-infantil
- [ ] 3.3 Criar /sindrome-de-down
- [ ] 3.4 Criar /prematuridade-desenvolvimento

### FASE 4: SEO Técnico (Semana 4)
- [ ] 4.1 Implementar canonical tags
- [ ] 4.2 Configurar redirects no servidor
- [ ] 4.3 Submeter novo sitemap ao Google
- [ ] 4.4 Monitorar erros 404

---

## 📝 DETALHAMENTO DAS CONSOLIDAÇÕES

### 1. FALA TARDIA (consolidar 3 LPs)
**URLs a consolidar:**
- `/lp/crianca-2-anos-nao-fala` → `/fala-tardia`
- `/lp/atraso-na-fala-infantil` → `/fala-tardia`
- `/lp/crianca-nao-forma-frases` → `/fala-tardia`

**Nova estrutura:**
- Seção "Por Idade": 2 anos, 3 anos, 4+ anos
- CTA específico por faixa etária

### 2. AVALIAÇÃO AUTISMO (consolidar 5 LPs)
**URLs a consolidar:**
- `/lp/sinais-autismo-bebe` → `/avaliacao-autismo`
- `/lp/sinais-autismo-2-anos` → `/avaliacao-autismo`
- `/lp/crianca-nao-responde-nome` → `/avaliacao-autismo`
- `/lp/crianca-nao-olha-olhos` → `/avaliacao-autismo`
- `/lp/avaliacao-tea-anapolis` → `/avaliacao-autismo`

**Nova estrutura:**
- Seção "Sinais por Idade": bebê, 2 anos, 3+ anos
- Seção "Sinais Específicos": contato visual, responde nome, etc.

### 3. DIFICULDADE ESCOLAR (consolidar 2 LPs)
**URLs a consolidar:**
- `/lp/sinais-dislexia` → `/dificuldade-escolar`
- `/lp/crianca-nao-aprende-ler` → `/dificuldade-escolar`

**Nova estrutura:**
- Seção "Condições": Dislexia, TDAH, Discalculia, TDI
- CTA por condição específica

---

## 🔗 ESTRATÉGIA DE REDIRECTS

```javascript
// redirects.js - Configurar no servidor/Vercel
const redirects = [
  // FALA TARDIA
  { from: "/lp/crianca-2-anos-nao-fala", to: "/fala-tardia", status: 301 },
  { from: "/lp/atraso-na-fala-infantil", to: "/fala-tardia", status: 301 },
  { from: "/lp/crianca-nao-forma-frases", to: "/fala-tardia", status: 301 },
  
  // AUTISMO
  { from: "/lp/sinais-autismo-bebe", to: "/avaliacao-autismo", status: 301 },
  { from: "/lp/sinais-autismo-2-anos", to: "/avaliacao-autismo", status: 301 },
  { from: "/lp/crianca-nao-responde-nome", to: "/avaliacao-autismo", status: 301 },
  { from: "/lp/crianca-nao-olha-olhos", to: "/avaliacao-autismo", status: 301 },
  { from: "/lp/avaliacao-tea-anapolis", to: "/avaliacao-autismo", status: 301 },
  
  // ESCOLAR
  { from: "/lp/sinais-dislexia", to: "/dificuldade-escolar", status: 301 },
  { from: "/lp/crianca-nao-aprende-ler", to: "/dificuldade-escolar", status: 301 },
  
  // FONOAUDIOLOGIA
  { from: "/lp/dificuldade-pronunciar-r", to: "/troca-letras", status: 301 },
  { from: "/lp/fala-enrolada-crianca", to: "/troca-letras", status: 301 },
];
```

---

## 📈 EXPECTATIVAS DE RESULTADO

### Antes da Consolidação
- 42 páginas dispersas
- Conteúdo duplicado
- Diluição de autoridade
- Dificuldade de manutenção

### Depois da Consolidação
- 25 páginas otimizadas
- Conteúdo concentrado
- Maior autoridade por página
- Fácil manutenção

### Impacto Esperado
- **SEO**: +30-50% em tráfego orgânico (elimina canibalização)
- **Conversão**: +20-40% nas LPs principais (melhor experiência)
- **Manutenção**: -60% no tempo de atualização

---

## ⚠️ RISCOS E MITIGAÇÃO

| Risco | Mitigação |
|-------|-----------|
| Perda de ranking | Redirects 301 + monitoramento |
| Erros 404 | Sitemap atualizado + Search Console |
| Quebra de links | Verificação de links internos |
| Páginas órfãs | Auditoria completa pós-migração |

---

## 📅 CRONOGRAMA SUGERIDO

| Semana | Atividade | Tempo Est. |
|--------|-----------|------------|
| 1 | Consolidação + Redirects | 8h |
| 2 | Otimização 4 LPs principais | 12h |
| 3 | Criar 4 novas LPs | 10h |
| 4 | SEO técnico + Testes | 6h |
| **Total** | | **36h** |

---

## 🚀 PRÓXIMO PASSO

Escolha a opção:

1. **Iniciar Fase 1** (Consolidação + Redirects)
2. **Iniciar Fase 2** (Otimizar 4 LPs principais primeiro)
3. **Criar roadmap técnico** (arquivos de configuração)

Qual você prefere começar?
