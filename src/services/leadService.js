/**
 * 📊 Lead Service
 * Envia leads para o CRM com tracking completo de origem
 */

import { getCRMApiUrl } from '../constants';
import { buildTrackingPayload, clearLeadTracking } from '../hooks/useLeadTracking';

const API_BASE = getCRMApiUrl();

/**
 * Envia um lead para o CRM com tracking completo
 */
export async function sendLeadToCRM(leadData) {
  try {
    // Capturar tracking de origem
    const trackingPayload = buildTrackingPayload();
    
    // Montar payload completo
    const payload = {
      ...leadData,
      ...trackingPayload,
      // Garantir que temos o origin correto
      origin: trackingPayload.origin || leadData.origin || 'Site',
      // Adicionar timestamp
      createdAt: new Date().toISOString()
    };

    console.log('📤 Enviando lead para CRM:', payload);

    // Enviar para a API
    const response = await fetch(`${API_BASE}/api/leads/from-ad`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Erro ao enviar lead: ${error}`);
    }

    const result = await response.json();
    
    // Limpar tracking após converter com sucesso
    clearLeadTracking();
    
    console.log('✅ Lead enviado com sucesso:', result);
    
    return {
      success: true,
      data: result
    };

  } catch (error) {
    console.error('❌ Erro ao enviar lead:', error);
    
    // Mesmo com erro, retornar para não bloquear o usuário
    return {
      success: false,
      error: error.message,
      // Salvar localmente para retry
      offline: saveLeadOffline(leadData)
    };
  }
}

/**
 * Salva lead localmente para envio posterior
 */
function saveLeadOffline(leadData) {
  try {
    const pending = JSON.parse(localStorage.getItem('pending_leads') || '[]');
    pending.push({
      ...leadData,
      savedAt: new Date().toISOString()
    });
    localStorage.setItem('pending_leads', JSON.stringify(pending));
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Envia leads pendentes (quando voltar online)
 */
export async function sendPendingLeads() {
  try {
    const pending = JSON.parse(localStorage.getItem('pending_leads') || '[]');
    if (pending.length === 0) return;

    console.log(`🔄 Enviando ${pending.length} leads pendentes...`);

    const results = [];
    for (const lead of pending) {
      const result = await sendLeadToCRM(lead);
      results.push(result);
    }

    // Limpar os que deram certo
    const failed = pending.filter((_, i) => !results[i].success);
    localStorage.setItem('pending_leads', JSON.stringify(failed));

    console.log(`✅ ${results.filter(r => r.success).length} leads enviados`);
    
    return results;
  } catch (error) {
    console.error('Erro ao enviar leads pendentes:', error);
  }
}

/**
 * Tracking de visualização de landing page
 */
export async function trackLandingPageView(slug, category) {
  try {
    const tracking = buildTrackingPayload();
    
    const data = {
      type: 'lp_view',
      slug,
      category,
      url: window.location.href,
      ...tracking,
      timestamp: new Date().toISOString()
    };

    // Envia para analytics
    await fetch(`${API_BASE}/api/analytics/lp-view`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).catch(() => {}); // Silencioso

  } catch (error) {
    console.error('Erro no tracking:', error);
  }
}

/**
 * Tracking de conversão de landing page
 */
export async function trackLandingPageConversion(slug, category, conversionData = {}) {
  try {
    const tracking = buildTrackingPayload();
    
    const data = {
      type: 'lp_conversion',
      slug,
      category,
      ...tracking,
      ...conversionData,
      timestamp: new Date().toISOString()
    };

    await fetch(`${API_BASE}/api/analytics/lp-conversion`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).catch(() => {});

  } catch (error) {
    console.error('Erro no tracking de conversão:', error);
  }
}

export default {
  sendLeadToCRM,
  sendPendingLeads,
  trackLandingPageView,
  trackLandingPageConversion
};
