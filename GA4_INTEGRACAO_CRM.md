# Integração Google Analytics 4 ↔ CRM-CLINICA

## 📊 Visão Geral

Esta documentação explica como o CRM-CLINICA pode:
1. **Receber leads** do site Fono Inova em tempo real
2. **Buscar dados do GA4** para o SiteAnalyticsDashboard

---

## 🎯 Parte 1: Recebendo Leads do Site

### Endpoint do CRM

```
POST /api/leads
Content-Type: application/json
X-API-Key: {API_KEY}
```

### Payload do Lead

```json
{
  "id": "lead_1708701234567_abc123def",
  
  "dadosPessoais": {
    "nome": "Maria Silva Santos",
    "telefone": "+55 (62) 99999-9999",
    "email": "maria.silva@email.com"
  },
  
  "ga4": {
    "clientId": "1234567890.1234567890",
    "sessionId": "1708701234"
  },
  
  "origem": {
    "source": "google",
    "medium": "cpc",
    "campaign": "fonoaudiologia_anapolis",
    "content": "anuncio_variacao_a",
    "term": "fonoaudiologia infantil anapolis",
    "referrer": "https://www.google.com",
    "landingPage": "/fonoaudiologia",
    "gclid": "CjwKCAjw...",
    "fbclid": null
  },
  
  "contexto": {
    "pagePath": "/fonoaudiologia",
    "pageTitle": "Fonoaudiologia Infantil em Anápolis | Fono Inova",
    "serviceInterest": "fonoaudiologia",
    "formSource": "booking_modal",
    "timestamp": "2026-02-23T14:30:45.123Z"
  },
  
  "device": {
    "type": "mobile",
    "userAgent": "Mozilla/5.0 (Linux; Android 13; SM-G991B)..."
  }
}
```

### Campos Importantes

| Campo | Descrição | Exemplo |
|-------|-----------|---------|
| `id` | ID único do lead | `lead_1708701234567_abc123def` |
| `dadosPessoais.nome` | Nome completo | `Maria Silva Santos` |
| `dadosPessoais.telefone` | Telefone formatado | `+55 (62) 99999-9999` |
| `dadosPessoais.email` | Email | `maria.silva@email.com` |
| `ga4.clientId` | ID do cliente GA4 | `1234567890.1234567890` |
| `origem.source` | Fonte do tráfego | `google`, `facebook`, `direct` |
| `origem.medium` | Meio do tráfego | `cpc`, `organic`, `social` |
| `origem.campaign` | Nome da campanha | `fonoaudiologia_anapolis` |
| `origem.gclid` | Google Ads Click ID | Para rastrear conversões do Google Ads |
| `origem.landingPage` | Página de entrada | `/fonoaudiologia` |
| `contexto.timestamp` | Data/hora da conversão | ISO 8601 |

---

## 📈 Parte 2: Buscando Dados do GA4

### Opção A: GA4 Data API (Recomendado)

A API oficial do Google Analytics 4 permite buscar dados em tempo real.

#### 1. Configuração no Google Cloud

1. Acesse: https://console.cloud.google.com/
2. Crie um novo projeto ou selecione existente
3. Ative a API: **Google Analytics Data API**
4. Crie uma **Service Account**: 
   - IAM & Admin > Service Accounts
   - Criar conta de serviço
   - Baixe a chave JSON
5. Adicione a service account ao GA4:
   - GA4 > Admin > Property Access Management
   - Adicionar usuário (email da service account)
   - Papel: **Viewer** ou **Analyst**

#### 2. Encontrando o Property ID

O Property ID é um número, não o Measurement ID (G-XXXXXXXX):

```
GA4 > Admin > Property Settings

Property ID: 123456789  ← Use este número!
Measurement ID: G-N59X7PNQZZ
```

#### 3. Chamadas à API

**Base URL:**
```
https://analyticsdata.googleapis.com/v1beta/properties/{PROPERTY_ID}:runReport
```

**Autenticação:**
```
Authorization: Bearer {ACCESS_TOKEN}
```

### Exemplos de Chamadas

#### Métricas Gerais

```bash
curl -X POST \
  "https://analyticsdata.googleapis.com/v1beta/properties/123456789:runReport" \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: application/json" \
  -d '{
    "dateRanges": [{"startDate": "30daysAgo", "endDate": "today"}],
    "metrics": [
      {"name": "sessions"},
      {"name": "activeUsers"},
      {"name": "newUsers"},
      {"name": "screenPageViews"},
      {"name": "averageSessionDuration"},
      {"name": "bounceRate"},
      {"name": "conversions"}
    ]
  }'
```

**Resposta:**
```json
{
  "dimensionHeaders": [],
  "metricHeaders": [
    {"name": "sessions", "type": "TYPE_INTEGER"},
    {"name": "activeUsers", "type": "TYPE_INTEGER"}
  ],
  "rows": [
    {
      "metricValues": [
        {"value": "2847"},
        {"value": "1923"}
      ]
    }
  ]
}
```

#### Fontes de Tráfego

```bash
curl -X POST \
  "https://analyticsdata.googleapis.com/v1beta/properties/123456789:runReport" \
  -H "Authorization: Bearer {TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "dateRanges": [{"startDate": "30daysAgo", "endDate": "today"}],
    "dimensions": [
      {"name": "sessionSource"},
      {"name": "sessionMedium"},
      {"name": "sessionCampaign"}
    ],
    "metrics": [
      {"name": "sessions"},
      {"name": "activeUsers"},
      {"name": "conversions"}
    ],
    "orderBys": [{"metric": {"metricName": "sessions"}, "desc": true}]
  }'
```

#### Páginas Populares

```bash
curl -X POST \
  "https://analyticsdata.googleapis.com/v1beta/properties/123456789:runReport" \
  -H "Authorization: Bearer {TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "dateRanges": [{"startDate": "30daysAgo", "endDate": "today"}],
    "dimensions": [
      {"name": "pageTitle"},
      {"name": "pagePath"}
    ],
    "metrics": [
      {"name": "screenPageViews"},
      {"name": "activeUsers"},
      {"name": "averageEngagementTime"},
      {"name": "bounceRate"}
    ],
    "orderBys": [{"metric": {"metricName": "screenPageViews"}, "desc": true}],
    "limit": 20
  }'
```

#### Eventos

```bash
curl -X POST \
  "https://analyticsdata.googleapis.com/v1beta/properties/123456789:runReport" \
  -H "Authorization: Bearer {TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "dateRanges": [{"startDate": "7daysAgo", "endDate": "today"}],
    "dimensions": [{"name": "eventName"}],
    "metrics": [
      {"name": "eventCount"},
      {"name": "eventValue"}
    ],
    "orderBys": [{"metric": {"metricName": "eventCount"}, "desc": true}]
  }'
```

#### Dados em Tempo Real

```bash
curl -X POST \
  "https://analyticsdata.googleapis.com/v1beta/properties/123456789:runRealtimeReport" \
  -H "Authorization: Bearer {TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "metrics": [
      {"name": "activeUsers"},
      {"name": "screenPageViews"},
      {"name": "events"}
    ]
  }'
```

---

## 📊 Métricas Disponíveis

### Métricas Principais

| Métrica | Descrição | Tipo |
|---------|-----------|------|
| `activeUsers` | Usuários ativos únicos | int |
| `newUsers` | Novos usuários | int |
| `totalUsers` | Total de usuários | int |
| `sessions` | Sessões | int |
| `screenPageViews` | Page views | int |
| `averageSessionDuration` | Duração média da sessão | segundos |
| `bounceRate` | Taxa de rejeição | 0-1 |
| `conversions` | Total de conversões | int |
| `eventCount` | Total de eventos | int |
| `engagementRate` | Taxa de engajamento | 0-1 |

### Dimensões Principais

| Dimensão | Descrição |
|----------|-----------|
| `sessionSource` | Fonte da sessão (google, facebook, etc.) |
| `sessionMedium` | Meio (cpc, organic, social, etc.) |
| `sessionCampaign` | Nome da campanha |
| `pageTitle` | Título da página |
| `pagePath` | Caminho da página |
| `eventName` | Nome do evento |
| `deviceCategory` | Categoria do dispositivo (desktop, mobile, tablet) |
| `country` | País |
| `city` | Cidade |

---

## 🔧 Implementação no Backend do CRM

### Node.js + Google Auth

```javascript
const { BetaAnalyticsDataClient } = require('@google-analytics/data');

// Inicializar cliente
const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: './service-account-key.json'
});

const propertyId = '123456789'; // Seu Property ID

// Buscar métricas
async function getMetrics() {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
    metrics: [
      { name: 'sessions' },
      { name: 'activeUsers' },
      { name: 'conversions' }
    ]
  });
  
  return response;
}

// Buscar fontes de tráfego
async function getTrafficSources() {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
    dimensions: [
      { name: 'sessionSource' },
      { name: 'sessionMedium' }
    ],
    metrics: [
      { name: 'sessions' },
      { name: 'conversions' }
    ],
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }]
  });
  
  return response.rows.map(row => ({
    source: row.dimensionValues[0].value,
    medium: row.dimensionValues[1].value,
    sessions: parseInt(row.metricValues[0].value),
    conversions: parseInt(row.metricValues[1].value)
  }));
}

module.exports = { getMetrics, getTrafficSources };
```

### Python

```python
from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import RunReportRequest
from google.oauth2 import service_account

# Credenciais
key_path = "./service-account-key.json"
credentials = service_account.Credentials.from_service_account_file(
    key_path,
    scopes=["https://www.googleapis.com/auth/analytics.readonly"]
)

client = BetaAnalyticsDataClient(credentials=credentials)
property_id = "123456789"

def get_metrics():
    request = RunReportRequest(
        property=f"properties/{property_id}",
        date_ranges=[{"start_date": "30daysAgo", "end_date": "today"}],
        metrics=[
            {"name": "sessions"},
            {"name": "activeUsers"},
            {"name": "conversions"}
        ]
    )
    
    response = client.run_report(request)
    return response

def get_traffic_sources():
    request = RunReportRequest(
        property=f"properties/{property_id}",
        date_ranges=[{"start_date": "30daysAgo", "end_date": "today"}],
        dimensions=[
            {"name": "sessionSource"},
            {"name": "sessionMedium"}
        ],
        metrics=[
            {"name": "sessions"},
            {"name": "conversions"}
        ],
        order_bys=[{"metric": {"metric_name": "sessions"}, "desc": True}]
    )
    
    response = client.run_report(request)
    
    return [
        {
            "source": row.dimension_values[0].value,
            "medium": row.dimension_values[1].value,
            "sessions": int(row.metric_values[0].value),
            "conversions": int(row.metric_values[1].value)
        }
        for row in response.rows
    ]
```

---

## 📱 Endpoints que o CRM deve expor para o Site

### 1. Receber Lead

```
POST /api/leads
```

**Response:**
```json
{
  "success": true,
  "leadId": "crm_abc123",
  "message": "Lead recebido com sucesso"
}
```

### 2. Dashboard Data

```
GET /api/analytics/dashboard
```

**Response:**
```json
{
  "metrics": {
    "sessions": 2847,
    "activeUsers": 1923,
    "conversions": 89,
    "bounceRate": 0.423
  },
  "sources": [...],
  "pages": [...],
  "events": [...],
  "lastUpdated": "2026-02-23T14:30:00Z"
}
```

---

## 🔐 Segurança

### Recomendações

1. **Nunca exponha** a service account key no frontend
2. Use um **backend proxy** para chamadas à API do GA4
3. Valide o `X-API-Key` em todos os endpoints
4. Rate limiting: máximo 100 requisições/minuto
5. CORS: permita apenas domínios autorizados

### Autenticação no Site

O site envia:
```
X-API-Key: {API_KEY}
```

O CRM deve validar esta chave antes de processar qualquer requisição.

---

## 📊 Dashboard do CRM

### Dados que devem aparecer no SiteAnalyticsDashboard

#### 1. Visão Geral (Overview)
- Sessões (30 dias)
- Usuários Ativos
- Page Views
- Taxa de Conversão
- Tempo Médio na Página
- Taxa de Rejeição
- Total de Eventos

#### 2. Fontes de Tráfego
- Tabela com: Origem, Médium, Sessões, Usuários, Conversões
- Filtro por período

#### 3. Páginas
- Páginas mais acessadas
- Views, Usuários, Tempo Médio, Bounce Rate

#### 4. Eventos
- Eventos mais comuns (scroll, click, page_view)
- Contagem por evento
- Gráfico de barras

#### 5. Conversões
- Eventos de conversão (generate_lead, whatsapp_click, etc.)
- Funil de conversão
- Taxa de conversão por fonte

#### 6. Tempo Real
- Usuários ativos agora
- Page views (últimos 30 min)
- Eventos (últimos 30 min)

---

## 🚀 Checklist de Implementação

### Time do CRM

- [ ] Criar endpoint `POST /api/leads` para receber leads
- [ ] Validar `X-API-Key` nas requisições
- [ ] Configurar Google Cloud project
- [ ] Ativar Google Analytics Data API
- [ ] Criar Service Account
- [ ] Adicionar Service Account ao GA4 com permissão "Viewer"
- [ ] Implementar busca de métricas do GA4
- [ ] Criar endpoint `GET /api/analytics/dashboard`
- [ ] Atualizar SiteAnalyticsDashboard com todos os dados
- [ ] Testar integração end-to-end

### Time do Site (já feito)

- [x] Criar serviço GA4 Data API
- [x] Atualizar AnalyticsDashboard
- [x] Integração de leads com CRM
- [x] Documentação

---

## 📞 Suporte

Se precisar de ajuda:

1. **Google Analytics Data API Docs**: https://developers.google.com/analytics/devguides/reporting/data/v1
2. **Property ID**: Encontrado em GA4 > Admin > Property Settings
3. **Service Account**: IAM & Admin > Service Accounts (Google Cloud)

---

*Documentação atualizada em: 23/02/2026*
*GA4 Property: G-N59X7PNQZZ*
