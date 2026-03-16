# 🔄 Fluxo SEO → CRM-CLINICA - Resumo da Implementação

## 📋 O que foi implementado

### 1. Serviços de Integração com CRM

| Arquivo | Função |
|---------|--------|
| `src/services/crmAnalyticsApi.js` | **Principal** - Envia leads e eventos para o CRM |
| `src/services/analyticsApi.js` | Compatibilidade com imports antigos |

**Funções principais:**
- `sendLeadToCRM()` - Envia lead completo com UTM, device, comportamento
- `getAnalyticsData()` - Busca dados para o dashboard
- `trackEventToCRM()` - Track de eventos em tempo real
- `retryFailedLeads()` - Reenvia leads que falharam

### 2. Hooks de Tracking

| Arquivo | Função |
|---------|--------|
| `src/hooks/useUTMTracking.js` | Captura e gerencia UTM parameters |
| `src/hooks/useSessionTracking.js` | Rastreia jornada do usuário |
| `src/hooks/useCRMIntegration.js` | Hook consolidado para uso fácil |

### 3. Componentes Atualizados

| Componente | Alteração |
|------------|-----------|
| `BookingModal.jsx` | Agora envia lead para CRM antes de abrir WhatsApp |
| `AnalyticsDashboard.jsx` | Dashboard completo com dados do CRM |
| `App.tsx` | Adicionado tracking de sessão global |

---

## 🗺️ Fluxo de Dados

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           USUÁRIO NO SITE                                │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  1. ENTRA NO SITE                                                       │
│     └── useSessionTracking: Cria sessionId                              │
│     └── useUTMTracking: Captura UTMs da URL                             │
│     └── GA4: Dispara page_view                                          │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  2. NAVEGAÇÃO                                                           │
│     └── Track: Páginas visualizadas                                     │
│     └── Track: Scroll depth (25%, 50%, 75%, 90%)                        │
│     └── Track: Serviços visualizados                                    │
│     └── Track: Tempo na página                                          │
│     └── Track: Cliques em elementos                                     │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  3. CONVERSÃO (Preenche Formulário)                                     │
│     └── BookingModal.handleSubmit()                                     │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  4. ENVIO PARA CRM                                                      │
│     └── sendLeadToCRM({                                                 │
│           nome, telefone, email,           ← Dados do formulário        │
│           utm_source, utm_medium,          ← Origem do tráfego          │
│           pagesViewed, servicesViewed,     ← Comportamento              │
│           timeOnSite, scrollDepth,         ← Engajamento                │
│           device, browser, os,             ← Tecnologia                 │
│           ipAddress, userAgent             ← Rede/Dispositivo           │
│         })                                                              │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  5. CRM-CLINICA RECEBE                                                  │
│     └── POST /api/leads                                                 │
│     └── Lead criado com status: "novo"                                  │
│     └── Disparado webhook/evento para SiteAnalyticsDashboard            │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  6. DASHBOARD ATUALIZADO                                                │
│     └── SiteAnalyticsDashboard mostra lead em tempo real                │
│     └── Métricas: leads/dia, conversão, fontes, serviços                │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  7. WHATSAPP ABERTO                                                     │
│     └── Usuário é redirecionado para WhatsApp                           │
│     └── Conversão concluída!                                            │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 📊 Estrutura de Dados Enviada ao CRM

```json
{
  "id": "lead_1234567890_abc123",
  "sessionId": "sess_1234567890_def456",
  
  "dadosPessoais": {
    "nome": "Maria Silva",
    "telefone": "+55 (62) 99999-9999",
    "email": "maria@email.com"
  },
  
  "origem": {
    "utmSource": "google",
    "utmMedium": "cpc",
    "utmCampaign": "fonoaudiologia_anapolis",
    "utmContent": "anuncio_variacao_a",
    "utmTerm": "fonoaudiologia infantil",
    "referrer": "https://www.google.com",
    "landingPage": "/fonoaudiologia"
  },
  
  "comportamento": {
    "pagesViewed": [
      { "page": "/", "timestamp": "2026-02-23T10:00:00Z" },
      { "page": "/fonoaudiologia", "timestamp": "2026-02-23T10:02:00Z" },
      { "page": "/freio-lingual", "timestamp": "2026-02-23T10:05:00Z" }
    ],
    "servicesViewed": ["Fonoaudiologia", "Teste da Linguinha"],
    "timeOnSite": 420,
    "scrollDepth": 75
  },
  
  "device": {
    "device": "mobile",
    "browser": "Chrome",
    "os": "Android",
    "screenSize": "412x915",
    "language": "pt-BR"
  },
  
  "rede": {
    "ipAddress": "189.xxx.xxx.xxx",
    "userAgent": "Mozilla/5.0 (Linux; Android 13...)"
  },
  
  "status": "novo",
  "createdAt": "2026-02-23T10:07:00Z"
}
```

---

## ⚙️ Configuração Necessária

### 1. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
# URL da API do CRM-CLINICA
VITE_CRM_API_URL=https://crm-clinica-api.seudominio.com

# Chave de API (obter com o time do CRM)
VITE_CRM_API_KEY=sua_chave_api_aqui
```

### 2. Endpoints que o CRM precisa expor

```
POST /leads                    ← Receber novos leads
GET  /analytics/dashboard      ← Dados para o dashboard
POST /events                   ← Eventos em tempo real
PATCH /leads/:id/status        ← Atualizar status do lead
```

### 3. Headers esperados pelo CRM

```
Content-Type: application/json
X-API-Key: {VITE_CRM_API_KEY}
X-Session-ID: {sessionId}
```

---

## 🎯 Eventos Trackados Automaticamente

| Evento | Quando dispara | Dados enviados |
|--------|----------------|----------------|
| `session_started` | Usuário entra no site | landingPage, referrer |
| `page_view` | Muda de página | page, title |
| `scroll_depth` | Atinge 25/50/75/90% scroll | depth, page |
| `element_click` | Clica em link/botão | element, text, page |
| `service_view` | Visualiza página de serviço | service, page |
| `popup_opened` | Abre popup | triggerType |
| `popup_closed` | Fecha popup | - |
| `booking_started` | Clica em agendar | source |
| `form_submission` | Envia formulário | formName, success |
| `generate_lead` | Lead criado | source, form_type |
| `crm_lead_sent` | Lead enviado ao CRM | leadId, success |
| `page_exit` | Sai da página | timeSpent, scrollDepth |

---

## 📱 Como Usar

### Em qualquer componente:

```jsx
import { useCRMIntegration } from '../hooks/useCRMIntegration';

function MeuComponente() {
  const { submitLead, trackEvent, trackService } = useCRMIntegration();
  
  const handleContato = async (dados) => {
    // Enviar lead para CRM
    const result = await submitLead({
      name: dados.nome,
      phone: dados.telefone,
      email: dados.email,
      serviceInterest: 'Fonoaudiologia',
      metadata: { 
        mensagem: dados.mensagem,
        horarioPreferencia: dados.horario 
      }
    });
    
    if (result.success) {
      console.log('Lead enviado! ID:', result.leadId);
    }
  };
  
  const handleVerServico = (servico) => {
    // Track visualização
    trackService(servico, { fromPage: 'home' });
  };
  
  return (...)
}
```

---

## 🔍 Como Testar

1. **Abrir o site** com UTMs:
   ```
   http://localhost:5173/?utm_source=teste&utm_medium=cpc&utm_campaign=teste_crm
   ```

2. **Navegar** por algumas páginas

3. **Preencher o formulário** no modal de agendamento

4. **Verificar no console**:
   - `[CRM] Enviando lead:` deve aparecer com os dados

5. **Verificar no CRM** se o lead chegou com todos os dados

6. **Acessar o Dashboard**:
   ```
   http://localhost:5173/dashboard
   ```

---

## 🚨 Fallbacks e Resiliência

- Se o CRM estiver offline, o lead é salvo no `localStorage` e reenviado automaticamente
- Se o usuário fechar a página antes do envio completo, os dados são preservados
- Retry automático a cada 5 minutos

---

## 📈 Próximos Passos Recomendados

1. **Configurar variáveis de ambiente** no Vercel/Netlify
2. **Confirmar endpoints** com o time do CRM-CLINICA
3. **Testar integração** em ambiente de staging
4. **Adicionar webhook** no CRM para notificar quando lead for qualificado
5. **Implementar** atualização de status (lead → contatado → agendado → convertido)

---

## 📞 Contato

Para dúvidas ou problemas na integração:
- Verificar console do navegador (logs detalhados)
- Verificar aba Network (requisições HTTP)
- Confirmar se o CRM está aceitando as requisições

---

*Documentação atualizada em: 23/02/2026*
