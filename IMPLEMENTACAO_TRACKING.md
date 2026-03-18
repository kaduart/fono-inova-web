# 📊 Implementação de Tracking de Leads

## Resumo das Correções

### ✅ Arquivos Criados/Modificados

1. **`src/hooks/useLeadTracking.js`** (NOVO)
   - Captura automática de UTMs, gclid (Google Ads), fbclid (Meta)
   - Detecta origem do lead (Google Ads, Meta Ads, Orgânico, GMB, etc.)
   - Persiste dados no localStorage por 24h
   - Funções auxiliares para envio ao CRM

2. **`src/components/lp/WhatsAppCTA.jsx`** (ATUALIZADO)
   - Agora captura origem automaticamente
   - Envia tracking para GA4, Meta Pixel e CRM
   - Salva dados no sessionStorage para referência

3. **`src/services/leadService.js`** (NOVO)
   - Envia leads para o CRM com tracking completo
   - Suporte a offline (salva localmente se falhar)
   - Retry automático de leads pendentes

4. **`src/App.jsx`** (ATUALIZADO)
   - Adicionado `LeadTracker` em todas as rotas
   - Inicializa tracking em todas as páginas

## 🎯 Como Funciona

### 1. Captura de Origem
Quando um usuário chega no site via anúncio:
```
URL: https://fonoinova.com.br/?utm_source=google&utm_campaign=REDE_PES&gclid=XXX
```

O sistema captura automaticamente:
- `gclid` → Identifica Google Ads
- `utm_source` → Google
- `utm_campaign` → REDE_PES
- `fbclid` → Identifica Meta Ads (se houver)

### 2. Persistência
Os dados são salvos no `localStorage` por 24h, então mesmo que o usuário navegue em várias páginas antes de converter, a origem é mantida.

### 3. Envio ao CRM
Quando clica no WhatsApp:
```javascript
{
  origin: "Google Ads",           // ← Não vai mais aparecer "Agenda Direta"
  metaTracking: {
    source: "google_ads",
    campaign: "REDE_PES",
    gclid: "XXX",
    utmSource: "google",
    utmCampaign: "REDE_PES"
  }
}
```

## 🚀 Próximos Passos

### 1. Configurar URLs no Google Ads
Adicione UTMs nas URLs finais dos anúncios:

**Campanha REDE PES:**
```
https://fonoinova.com.br/?utm_source=google&utm_medium=cpc&utm_campaign=REDE_PES&utm_content=grupo_1
```

**Campanha PSICO:**
```
https://fonoinova.com.br/avaliacao-neuropsicologica-dificuldade-escolar?utm_source=google&utm_medium=cpc&utm_campaign=PSICO_Anapolis
```

**Campanha FONO:**
```
https://fonoinova.com.br/fala-tardia?utm_source=google&utm_medium=cpc&utm_campaign=FONO_Anapolis
```

### 2. Deploy
```bash
cd /home/user/projetos/fono-inova-web
npm run build
# Deploy para produção (Vercel/Netlify)
```

### 3. Testar
1. Acesse: `https://fonoinova.com.br/?utm_source=google&utm_campaign=teste`
2. Abra o console (F12) → verifique "✅ Lead Tracking capturado"
3. Clique no WhatsApp → verifique se enviou com origem correta

## 📊 Resultado Esperado

Antes:
```
Leads: 15
- Agenda Direta: 12 (80%) ← Sem origem
- WhatsApp: 3 (20%)
- Google Ads: 0 ← Perdido!
```

Depois:
```
Leads: 15
- Google Ads: 8 ← Identificado!
- Meta Ads: 2
- GMB: 2
- Orgânico: 3
```

## 🔧 Manutenção

O tracking expira em 24h. Se o usuário voltar depois disso sem UTMs, será considerado "Site Direto".

Para limpar tracking manualmente (debug):
```javascript
localStorage.removeItem('fono_inova_lead_tracking');
```

## 📞 Suporte

Se houver problemas, verifique no console do navegador:
- "✅ Lead Tracking capturado" → Tracking funcionando
- "🎯 WhatsApp CTA - Tracking" → Dados sendo enviados
