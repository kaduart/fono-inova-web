/**
 * Serviço de Integração com CRM-CLINICA
 * 
 * FLUXO SIMPLIFICADO:
 * - GA4 já captura: pageviews, eventos, comportamento, device, etc.
 * - Este serviço apenas envia os LEADS convertidos para o CRM
 * - Dashboard do CRM consulta GA4 via API para métricas agregadas
 */

import { getCRMApiUrl, ENDPOINTS, CONFIG, isCRMConfigured } from '../constants';

/**
 * Envia um lead convertido para o CRM-CLINICA
 * Inclui dados do formulário + contexto do GA4 (UTMs, etc.)
 * 
 * @param {Object} leadData - Dados do lead
 * @returns {Promise<Object>} - Resultado do envio
 */
export const sendLeadToCRM = async (leadData) => {
    try {
        // Montar payload com dados essenciais
        const payload = {
            // Identificação
            id: generateLeadId(),
            
            // Dados do formulário
            nome: leadData.name,
            telefone: formatPhone(leadData.phone),
            email: leadData.email,
            
            // Contexto da conversão (do GA4/dataLayer)
            ga4: {
                clientId: getGA4ClientId(),
                sessionId: getGA4SessionId(),
            },
            
            // Origem do tráfego (UTMs do GA4 ou URL)
            origem: {
                source: getUTMParam('utm_source') || getReferrerSource() || 'direct',
                medium: getUTMParam('utm_medium') || 'none',
                campaign: getUTMParam('utm_campaign') || 'none',
                content: getUTMParam('utm_content') || 'none',
                term: getUTMParam('utm_term') || 'none',
                referrer: document.referrer || 'direct',
                landingPage: window.location.pathname,
                gclid: getUTMParam('gclid'), // Google Ads Click ID
                fbclid: getUTMParam('fbclid'), // Facebook Click ID
            },
            
            // Contexto do formulário
            contexto: {
                pagePath: window.location.pathname,
                pageTitle: document.title,
                serviceInterest: leadData.serviceInterest || '',
                formSource: leadData.formSource || 'modal_agendamento',
                timestamp: new Date().toISOString(),
            },
            
            // Device (básico)
            device: {
                type: getDeviceType(),
                userAgent: navigator.userAgent.substring(0, 100),
            }
        };

        console.log('[CRM] Enviando lead:', payload);

        // Se não tiver URL do CRM configurada, apenas loga (modo dev)
        if (!isCRMConfigured()) {
            console.log('[CRM] Modo desenvolvimento - lead não enviado (configure VITE_CRM_API_URL)');
            return { success: true, leadId: payload.id, mode: 'dev' };
        }

        // Envio para o CRM (endpoint público /from-website)
        const headers = {
            'Content-Type': 'application/json',
        };
        
        // Só adiciona X-API-Key se tiver configurado
        if (CONFIG.CRM_API_KEY) {
            headers['X-API-Key'] = CONFIG.CRM_API_KEY;
        }
        
        const response = await fetch(`${getCRMApiUrl()}${ENDPOINTS.SEND_LEAD}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const result = await response.json();
        
        // Salvar ID para referência
        localStorage.setItem('lastLeadId', payload.id);
        
        return {
            success: true,
            leadId: payload.id,
            data: result
        };

    } catch (error) {
        console.error('[CRM] Erro ao enviar lead:', error);
        
        // Salvar para retry posterior
        saveLeadForRetry(leadData);
        
        return {
            success: false,
            error: error.message
        };
    }
};

/**
 * Busca dados do dashboard (do CRM ou GA4)
 * O CRM deve consultar a API do GA4 Data API v1 para métricas
 */
export const getAnalyticsData = async () => {
    try {
        // Se não tiver CRM configurado, retorna mock
        if (!isCRMConfigured()) {
            return getMockAnalyticsData();
        }

        const headers = {};
        if (CONFIG.CRM_API_KEY) headers['X-API-Key'] = CONFIG.CRM_API_KEY;
        
        const response = await fetch(`${getCRMApiUrl()}${ENDPOINTS.ANALYTICS}`, {
            headers
        });

        if (!response.ok) throw new Error('Erro ao buscar dados');
        
        return await response.json();
    } catch (error) {
        console.error('[CRM] Erro ao buscar analytics:', error);
        return getMockAnalyticsData();
    }
};

/**
 * Retry de leads que falharam
 */
export const retryFailedLeads = async () => {
    const failedLeads = JSON.parse(localStorage.getItem('failedLeads') || '[]');
    if (failedLeads.length === 0) return;

    console.log(`[CRM] Tentando reenviar ${failedLeads.length} leads...`);

    const remaining = [];
    for (const lead of failedLeads) {
        const result = await sendLeadToCRM(lead);
        if (!result.success) remaining.push(lead);
    }

    localStorage.setItem('failedLeads', JSON.stringify(remaining));
};

// ==================== HELPERS ====================

function generateLeadId() {
    return `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function formatPhone(phone) {
    if (!phone) return '';
    const numbers = phone.replace(/\D/g, '');
    if (numbers.length === 11) {
        return `+55 (${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    }
    if (numbers.length === 10) {
        return `+55 (${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    }
    return phone;
}

function getUTMParam(name) {
    return new URLSearchParams(window.location.search).get(name);
}

function getReferrerSource() {
    if (!document.referrer) return null;
    const ref = document.referrer.toLowerCase();
    if (ref.includes('google')) return 'google';
    if (ref.includes('facebook') || ref.includes('fb')) return 'facebook';
    if (ref.includes('instagram')) return 'instagram';
    if (ref.includes('bing')) return 'bing';
    return 'referral';
}

function getGA4ClientId() {
    // Tenta pegar o clientId do GA4 do cookie _ga
    const match = document.cookie.match(/_ga=GA1\.\d+\.(\d+\.\d+)/);
    return match ? match[1] : null;
}

function getGA4SessionId() {
    // Tenta pegar session ID do cookie _ga_
    const gaCookies = document.cookie.split(';').filter(c => c.trim().startsWith('_ga_'));
    if (gaCookies.length > 0) {
        const match = gaCookies[0].match(/GS\d+\.\d+\.(\d+)/);
        return match ? match[1] : null;
    }
    return null;
}

function getDeviceType() {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
}

function saveLeadForRetry(leadData) {
    const failed = JSON.parse(localStorage.getItem('failedLeads') || '[]');
    failed.push({ ...leadData, failedAt: new Date().toISOString() });
    localStorage.setItem('failedLeads', JSON.stringify(failed));
}

function getMockAnalyticsData() {
    return {
        totalEvents: 1254,
        conversionRate: 0.034,
        todayEvents: 45,
        recentEvents: [
            { timestamp: new Date().toISOString(), category: 'Lead', action: 'form_submission', label: 'Home' },
        ],
        leadsToday: 3,
        leadsThisWeek: 18,
        leadsThisMonth: 67,
        topServices: [
            { name: 'Fonoaudiologia', views: 145, clicks: 23 },
            { name: 'Psicologia', views: 123, clicks: 18 },
        ],
        utmSources: [
            { source: 'google', leads: 45 },
            { source: 'facebook', leads: 32 },
        ],
        // Nota: dados reais vêm do GA4 via API
        note: 'Dados de exemplo - configure VITE_CRM_API_URL para dados reais'
    };
}

export default { sendLeadToCRM, getAnalyticsData, retryFailedLeads };
