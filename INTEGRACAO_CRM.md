# 🔗 Integração CRM-CLINICA

## Configuração Rápida

### 1. Configurar Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com a URL do seu CRM:

```env
# Desenvolvimento local
VITE_CRM_API_URL=http://localhost:5000

# OU Produção
VITE_CRM_API_URL=https://fono-inova-crm-back.onrender.com
```

### 2. Verificar Configuração

A configuração é validada automaticamente em `src/constants/index.js`.

```javascript
import { isCRMConfigured, CONFIG } from './constants';

// Verifica se o CRM está configurado
if (isCRMConfigured()) {
  console.log('CRM conectado:', CONFIG.CRM_API_URL);
}
```

### 3. Endpoints Disponíveis

| Endpoint | Descrição | Público |
|----------|-----------|---------|
| `/api/leads/from-website` | Envia leads do site | ✅ Sim |
| `/api/landing-pages/track` | Tracking de views/leads | ✅ Sim |
| `/api/landing-pages/metrics` | Métricas das LPs | 🔒 Não |

### 4. Feature Flags

O sistema detecta automaticamente se o CRM está configurado:

```javascript
CONFIG.FEATURES.CRM_INTEGRATION  // true/false
CONFIG.FEATURES.LP_TRACKING      // true/false
```

## Testando a Integração

### Teste 1: Tracking de Landing Page

1. Acesse uma LP no site: `/lp/crianca-2-anos-nao-fala`
2. Verifique no console: `[LP Track] View: crianca-2-anos-nao-fala`
3. No CRM, verifique se a métrica foi atualizada

### Teste 2: Envio de Lead

1. Clique em um botão WhatsApp na LP
2. Verifique no console: `[LP Track] Lead: crianca-2-anos-nao-fala`
3. No CRM, verifique se o lead apareceu

## Solução de Problemas

### "VITE_CRM_API_URL não configurado"

- Verifique se o arquivo `.env` existe
- Verifique se a URL está correta
- Reinicie o servidor Vite

### Erro de CORS

Se o CRM estiver em outro domínio, verifique se o backend permite CORS:

```javascript
// No backend (CRM)
app.use(cors({
  origin: ['https://clinicafonoinova.com.br', 'http://localhost:5173']
}));
```

## Estrutura de Arquivos

```
src/
├── constants/
│   └── index.js          # Configurações validadas
├── services/
│   ├── crmAnalyticsApi.js      # API de leads
│   └── landingPageAnalytics.js # Tracking de LPs
└── pages/lp/
    └── LandingPage.jsx   # Usa tracking
```

## Métricas Rastreadas

### Landing Pages
- **Views**: Quantas vezes a LP foi acessada
- **Leads**: Quantos cliques no WhatsApp
- **Conversão**: Taxa de conversão (leads/views)

### Disponíveis no Dashboard
- Total de views por LP
- Total de leads por LP
- Ranking de LPs mais vistas
- Ranking de LPs com mais leads

## Suporte

Em caso de dúvidas, verifique:
1. Console do navegador (F12)
2. Logs do servidor CRM
3. Network tab nas DevTools
