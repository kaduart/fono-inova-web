/**
 * 📊 Landing Page Analytics Service
 * Rastreia métricas específicas das LPs e envia para o CRM
 */

import { getCRMApiUrl, ENDPOINTS, isCRMConfigured } from '../constants';

/**
 * Registra uma view de landing page
 * Chamado quando o usuário entra em uma LP
 */
export const trackLandingPageView = async (slug, category) => {
    console.log(`[LP Analytics] Tracking view: ${slug} (${category})`);
    
    try {
        // Dados da view
        const data = {
            type: 'lp_view',
            slug,
            category,
            url: window.location.href,
            referrer: document.referrer || 'direct',
            timestamp: new Date().toISOString(),
            // Dados do visitante
            device: getDeviceType(),
            screenSize: `${window.innerWidth}x${window.innerHeight}`,
            // UTMs
            utm: {
                source: getUTMParam('utm_source'),
                medium: getUTMParam('utm_medium'),
                campaign: getUTMParam('utm_campaign'),
                content: getUTMParam('utm_content'),
                term: getUTMParam('utm_term'),
            }
        };

        // Envia para o CRM
        if (isCRMConfigured()) {
            await fetch(`${getCRMApiUrl()}${ENDPOINTS.LP_TRACK}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        }

        // Também registra no localStorage para resumo offline
        saveLocalMetric('lp_views', data);

        return { success: true };
    } catch (error) {
        console.error('[LP Analytics] Erro ao rastrear view:', error);
        return { success: false, error };
    }
};

/**
 * Registra um lead (conversão) na landing page
 * Chamado quando o usuário clica no botão WhatsApp
 */
export const trackLandingPageLead = async (slug, category, leadData = {}) => {
    console.log(`[LP Analytics] Tracking lead: ${slug} (${category})`);
    
    try {
        const data = {
            type: 'lp_lead',
            slug,
            category,
            url: window.location.href,
            timestamp: new Date().toISOString(),
            leadData: {
                ...leadData,
                device: getDeviceType(),
            }
        };

        // Envia para o CRM
        if (isCRMConfigured()) {
            await fetch(`${getCRMApiUrl()}${ENDPOINTS.LP_TRACK}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        }

        saveLocalMetric('lp_leads', data);

        return { success: true };
    } catch (error) {
        console.error('[LP Analytics] Erro ao rastrear lead:', error);
        return { success: false, error };
    }
};

/**
 * Busca métricas das landing pages do CRM
 */
export const getLandingPagesMetrics = async () => {
    try {
        if (!isCRMConfigured()) {
            return getMockLandingPageMetrics();
        }

        const response = await fetch(`${getCRMApiUrl()}${ENDPOINTS.LP_METRICS}`);
        if (!response.ok) throw new Error('Erro ao buscar métricas');

        return await response.json();
    } catch (error) {
        console.error('[LP Analytics] Erro ao buscar métricas:', error);
        return getMockLandingPageMetrics();
    }
};

// ==================== HELPERS ====================

function getDeviceType() {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
}

function getUTMParam(name) {
    return new URLSearchParams(window.location.search).get(name);
}

function saveLocalMetric(key, data) {
    try {
        const existing = JSON.parse(localStorage.getItem(`lp_analytics_${key}`) || '[]');
        existing.push(data);
        // Mantém só últimos 100
        if (existing.length > 100) existing.shift();
        localStorage.setItem(`lp_analytics_${key}`, JSON.stringify(existing));
    } catch (e) {
        // Ignore
    }
}

function getMockLandingPageMetrics() {
    return {
        totalViews: 1234,
        totalLeads: 67,
        conversionRate: 5.43,
        byLandingPage: [
            { slug: 'crianca-2-anos-nao-fala', views: 234, leads: 15, conversionRate: 6.41 },
            { slug: 'sinais-autismo-bebe', views: 189, leads: 12, conversionRate: 6.35 },
            { slug: 'fonoaudiologo-anapolis', views: 156, leads: 8, conversionRate: 5.13 },
            { slug: 'atraso-na-fala-infantil', views: 134, leads: 7, conversionRate: 5.22 },
            { slug: 'gagueira-infantil', views: 98, leads: 5, conversionRate: 5.10 },
        ],
        byCategory: {
            fonoaudiologia: { views: 512, leads: 28 },
            autismo: { views: 389, leads: 22 },
            psicologia: { views: 156, leads: 8 },
            aprendizagem: { views: 123, leads: 6 },
            geografica: { views: 54, leads: 3 }
        }
    };
}

export default {
    trackLandingPageView,
    trackLandingPageLead,
    getLandingPagesMetrics
};
