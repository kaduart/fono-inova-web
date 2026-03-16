# Análise do Fluxo SEO → CRM-CLINICA

## 📊 Resumo do Fluxo Atual

### 1. Componentes de Analytics Implementados

| Componente | Função | Status |
|------------|--------|--------|
| `SEO.jsx` | Meta tags, Open Graph, Schema JSON-LD | ✅ OK |
| `useAnalytics.js` | Hooks e funções de tracking GA4 | ✅ OK |
| `analytics.js` (helper) | Conversões Google Ads | ✅ OK |
| `analytics.js` (utils) | Tracking de serviços e agendamentos | ✅ OK |
| `useFormTracking.js` | Tracking de interações em formulários | ✅ OK |
| `AnalyticsProvider.jsx` | Provider de contexto analytics | ✅ OK |
| `AnalyticsDashboard.jsx` | Dashboard visual (falta API) | ⚠️ INCOMPLETO |
| `BookingModal.jsx` | Modal de agendamento com tracking | ✅ OK |
| `SpecialityPopUp.tsx` | Popup com tracking de engajamento | ✅ OK |

### 2. Eventos Trackados Atualmente

#### Eventos de Navegação
- `page_view` - Visualização de páginas
- `page_path`, `page_title`, `page_location`

#### Eventos de Conversão
- `generate_lead` - Lead gerado (formulário)
- `phone_call` - Clique em telefone
- `whatsapp_click` - Clique no WhatsApp
- `appointment_scheduled` - Agendamento iniciado
- `service_click` - Clique em serviços

#### Eventos de Engajamento
- `button_click` - Cliques em botões
- `popup_opened/closed` - Interação com popup
- `form_field_interaction` - Interação com campos
- `form_submission` - Submissão de formulários
- `social_media_click` - Cliques em redes sociais
- `article_clicked` - Clique em artigos
- `service_view` - Visualização de serviços
- `booking_initiated` - Início de agendamento

### 3. Schemas JSON-LD Implementados

- ✅ `MedicalBusiness` - Dados da clínica
- ✅ `MedicalWebPage` - Páginas de serviços
- ✅ `FAQPage` - Páginas de FAQ
- ✅ `Article` - Artigos do blog
- ✅ `AggregateRating` - Avaliações
- ✅ `MedicalProcedure` - Procedimentos médicos
- ✅ `MedicalCondition` - Condições (TEA, etc.)

---

## ❌ GAPS ENCONTRADOS (O que falta para o CRM)

### 1. **Serviço de API para CRM - NÃO EXISTE**
```javascript
// AnalyticsDashboard.jsx faz import de:
import { getAnalyticsData } from '../services/analyticsApi';
// MAS O ARQUIVO NÃO EXISTE!
```

**Impacto**: Dashboard não funciona, dados não chegam ao CRM

### 2. **Dados do Paciente/Lead Não Estruturados**
Atualmente os dados do formulário são enviados apenas para WhatsApp:
```javascript
// BookingModal.jsx - só abre WhatsApp
const whatsappUrl = `https://wa.me/5562993377726?text=${encodeURIComponent(message)}`;
window.open(whatsappUrl, '_blank');
```

**Falta capturar e enviar para CRM:**
- Nome completo
- Telefone formatado
- E-mail
- Timestamp do lead
- Origem (utm_source, utm_medium, utm_campaign)
- Página de origem
- Tipo de interesse (serviço selecionado)

### 3. **UTM Parameters Não Capturados**
Não há rastreamento de:
- `utm_source` (google, facebook, instagram, etc.)
- `utm_medium` (cpc, organic, social, email)
- `utm_campaign` (nome da campanha)
- `utm_content` (variação do anúncio)
- `utm_term` (palavra-chave)

### 4. **User ID / Session ID Não Gerenciado**
Não há identificador único do usuário para rastrear:
- Jornada do usuário
- Retornos ao site
- Multi-touch attribution

### 5. **Dados de Comportamento Não Enviados ao CRM**
- Tempo na página
- Scroll depth
- Cliques em elementos específicos
- Serviços visualizados
- Artigos lidos

### 6. **Device e Geographic Data**
- IP do usuário
- Localização aproximada
- Device (mobile/desktop)
- Browser
- Sistema operacional

### 7. **Dados de Performance SEO Não Integrados**
- Posição no Google
- Impressões
- CTR
- Bounce rate por página

---

## ✅ PROPOSTAS DE IMPLEMENTAÇÃO

### 1. Criar Serviço de API para CRM

**Arquivo**: `src/services/crmAnalyticsApi.js`

```javascript
const CRM_API_BASE_URL = process.env.VITE_CRM_API_URL || 'https://crm-clinica/api';
const API_KEY = process.env.VITE_CRM_API_KEY;

// Enviar lead para CRM
export const sendLeadToCRM = async (leadData) => {
  // Implementar
};

// Buscar dados para dashboard
export const getAnalyticsData = async () => {
  // Implementar
};

// Track evento em tempo real
export const trackEventToCRM = async (eventData) => {
  // Implementar
};
```

### 2. Hook para Capturar UTM Parameters

**Arquivo**: `src/hooks/useUTMTracking.js`

```javascript
export const useUTMTracking = () => {
  // Capturar UTM da URL
  // Armazenar no sessionStorage
  // Retornar UTMs atuais
};
```

### 3. Hook para Dados do Dispositivo

**Arquivo**: `src/hooks/useDeviceInfo.js`

```javascript
export const useDeviceInfo = () => {
  // Retornar: device, browser, OS, screen size
};
```

### 4. Sessão de Usuário

**Arquivo**: `src/services/sessionService.js`

```javascript
export const getOrCreateSession = () => {
  // Gerar sessionId único
  // Armazenar timestamps
  // Tracking de jornada
};
```

### 5. Integração no BookingModal

Adicionar envio para CRM além do WhatsApp:
```javascript
const handleSubmit = async (e) => {
  // ... validação ...
  
  // Enviar para CRM
  await sendLeadToCRM({
    name: formData.name,
    phone: formData.phone,
    email: formData.email,
    source: 'website',
    utmParams: getUTMParams(),
    sessionId: getSessionId(),
    pageOrigin: window.location.pathname,
    timestamp: new Date().toISOString()
  });
  
  // Depois abrir WhatsApp
  window.open(whatsappUrl, '_blank');
};
```

---

## 📋 CHECKLIST DE IMPLEMENTAÇÃO

### Prioridade ALTA
- [ ] Criar serviço `crmAnalyticsApi.js`
- [ ] Criar hook `useUTMTracking.js`
- [ ] Modificar `BookingModal.jsx` para enviar ao CRM
- [ ] Criar `sessionService.js` para tracking de sessão

### Prioridade MÉDIA
- [ ] Criar hook `useDeviceInfo.js`
- [ ] Adicionar tracking de scroll depth
- [ ] Adicionar tracking de tempo na página
- [ ] Implementar `getAnalyticsData` no dashboard

### Prioridade BAIXA
- [ ] Heatmap de cliques
- [ ] Funnel de conversão detalhado
- [ ] Integração com Search Console API
- [ ] Relatórios automáticos por e-mail

---

## 🎯 ESTRUTURA DE DADOS SUGERIDA PARA O CRM

```typescript
interface LeadCRM {
  // Identificação
  id: string;
  sessionId: string;
  
  // Dados Pessoais
  nome: string;
  telefone: string;
  email: string;
  
  // Origem
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  referrer: string;
  landingPage: string;
  
  // Comportamento
  pagesViewed: string[];
  servicesViewed: string[];
  timeOnSite: number;
  scrollDepth: number;
  
  // Device
  device: 'mobile' | 'tablet' | 'desktop';
  browser: string;
  os: string;
  screenSize: string;
  
  // Status
  status: 'novo' | 'contatado' | 'agendado' | 'convertido';
  createdAt: string;
  updatedAt: string;
}
```

---

## 🚀 PRÓXIMOS PASSOS

1. **Confirmar URL da API do CRM-CLINICA**
2. **Definir formato de autenticação (API Key, JWT, etc.)**
3. **Implementar serviço de API**
4. **Testar integração com dados de exemplo**
5. **Deploy e monitoramento**

---

*Análise gerada em: 23/02/2026*
*Projeto: Fono Inova Web*
