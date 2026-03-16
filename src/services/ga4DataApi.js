/**
 * Google Analytics 4 Data API Service
 * 
 * Esta API permite buscar dados do GA4 em tempo real para alimentar o dashboard.
 * 
 * NOTA: Para usar a API, é necessário:
 * 1. Habilitar Google Analytics Data API no Google Cloud Console
 * 2. Criar uma Service Account e baixar a chave JSON
 * 3. Adicionar a Service Account como "Viewer" no GA4 (Admin > Property Access Management)
 * 
 * Property ID do GA4: O número após "properties/" (ex: properties/123456789)
 */

// IMPORTANTE: O Property ID é diferente do Measurement ID (G-XXXXXXXX)
// Para encontrar: GA4 > Admin > Property Settings > Property ID
const GA4_PROPERTY_ID = import.meta.env.VITE_GA4_PROPERTY_ID || '';

// Chave da API ou token de acesso
// Em produção, isso deve vir de um backend seguro, não do frontend
const GA4_API_KEY = import.meta.env.VITE_GA4_API_KEY || '';

// Base URL da Data API
const GA4_API_BASE = 'https://analyticsdata.googleapis.com/v1beta';

/**
 * Busca métricas gerais do GA4
 * @param {string} startDate - Data inicial (YYYY-MM-DD ou '7daysAgo', '30daysAgo', 'today')
 * @param {string} endDate - Data final (YYYY-MM-DD ou 'today')
 */
export const getGA4Metrics = async (startDate = '7daysAgo', endDate = 'today') => {
    // Se não tiver Property ID configurado, retorna mock
    if (!GA4_PROPERTY_ID) {
        console.log('[GA4] Property ID não configurado - retornando dados mock');
        return getMockGA4Data();
    }

    try {
        const response = await fetch(`${GA4_API_BASE}/${GA4_PROPERTY_ID}:runReport`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getAccessToken()}`
            },
            body: JSON.stringify({
                dateRanges: [{ startDate, endDate }],
                metrics: [
                    { name: 'sessions' },
                    { name: 'activeUsers' },
                    { name: 'newUsers' },
                    { name: 'totalUsers' },
                    { name: 'screenPageViews' },
                    { name: 'averageSessionDuration' },
                    { name: 'bounceRate' },
                    { name: 'conversions' },
                    { name: 'eventCount' }
                ]
            })
        });

        if (!response.ok) {
            throw new Error(`GA4 API error: ${response.status}`);
        }

        const data = await response.json();
        return formatGA4Metrics(data);

    } catch (error) {
        console.error('[GA4] Erro ao buscar métricas:', error);
        return getMockGA4Data();
    }
};

/**
 * Busca métricas por origem de tráfego (UTMs)
 */
export const getGA4TrafficSources = async (startDate = '30daysAgo', endDate = 'today') => {
    if (!GA4_PROPERTY_ID) return getMockTrafficSources();

    try {
        const response = await fetch(`${GA4_API_BASE}/${GA4_PROPERTY_ID}:runReport`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getAccessToken()}`
            },
            body: JSON.stringify({
                dateRanges: [{ startDate, endDate }],
                dimensions: [
                    { name: 'sessionSource' },
                    { name: 'sessionMedium' },
                    { name: 'sessionCampaign' }
                ],
                metrics: [
                    { name: 'sessions' },
                    { name: 'activeUsers' },
                    { name: 'conversions' }
                ],
                orderBys: [{ metric: { metricName: 'sessions' }, desc: true }]
            })
        });

        if (!response.ok) throw new Error('GA4 API error');
        
        const data = await response.json();
        return formatTrafficSources(data);

    } catch (error) {
        console.error('[GA4] Erro:', error);
        return getMockTrafficSources();
    }
};

/**
 * Busca métricas por página
 */
export const getGA4Pages = async (startDate = '30daysAgo', endDate = 'today') => {
    if (!GA4_PROPERTY_ID) return getMockPagesData();

    try {
        const response = await fetch(`${GA4_API_BASE}/${GA4_PROPERTY_ID}:runReport`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getAccessToken()}`
            },
            body: JSON.stringify({
                dateRanges: [{ startDate, endDate }],
                dimensions: [
                    { name: 'pageTitle' },
                    { name: 'pagePath' }
                ],
                metrics: [
                    { name: 'screenPageViews' },
                    { name: 'activeUsers' },
                    { name: 'averageEngagementTime' },
                    { name: 'bounceRate' }
                ],
                orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
                limit: 20
            })
        });

        if (!response.ok) throw new Error('GA4 API error');
        
        const data = await response.json();
        return formatPagesData(data);

    } catch (error) {
        console.error('[GA4] Erro:', error);
        return getMockPagesData();
    }
};

/**
 * Busca eventos mais comuns
 */
export const getGA4Events = async (startDate = '7daysAgo', endDate = 'today') => {
    if (!GA4_PROPERTY_ID) return getMockEventsData();

    try {
        const response = await fetch(`${GA4_API_BASE}/${GA4_PROPERTY_ID}:runReport`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getAccessToken()}`
            },
            body: JSON.stringify({
                dateRanges: [{ startDate, endDate }],
                dimensions: [{ name: 'eventName' }],
                metrics: [
                    { name: 'eventCount' },
                    { name: 'eventValue' }
                ],
                orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
                limit: 50
            })
        });

        if (!response.ok) throw new Error('GA4 API error');
        
        const data = await response.json();
        return formatEventsData(data);

    } catch (error) {
        console.error('[GA4] Erro:', error);
        return getMockEventsData();
    }
};

/**
 * Busca conversões (eventos de conversão configurados no GA4)
 */
export const getGA4Conversions = async (startDate = '30daysAgo', endDate = 'today') => {
    if (!GA4_PROPERTY_ID) return getMockConversionsData();

    try {
        const response = await fetch(`${GA4_API_BASE}/${GA4_PROPERTY_ID}:runReport`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getAccessToken()}`
            },
            body: JSON.stringify({
                dateRanges: [{ startDate, endDate }],
                dimensions: [{ name: 'eventName' }],
                metrics: [{ name: 'conversions' }, { name: 'eventValue' }],
                dimensionFilter: {
                    filter: {
                        fieldName: 'eventName',
                        inListFilter: {
                            values: ['generate_lead', 'form_submission', 'whatsapp_click', 'conversion']
                        }
                    }
                },
                orderBys: [{ metric: { metricName: 'conversions' }, desc: true }]
            })
        });

        if (!response.ok) throw new Error('GA4 API error');
        
        const data = await response.json();
        return formatConversionsData(data);

    } catch (error) {
        console.error('[GA4] Erro:', error);
        return getMockConversionsData();
    }
};

/**
 * Busca dados em tempo real (últimos 30 minutos)
 */
export const getGA4RealtimeData = async () => {
    if (!GA4_PROPERTY_ID) return getMockRealtimeData();

    try {
        const response = await fetch(`${GA4_API_BASE}/${GA4_PROPERTY_ID}:runRealtimeReport`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getAccessToken()}`
            },
            body: JSON.stringify({
                metrics: [
                    { name: 'activeUsers' },
                    { name: 'screenPageViews' },
                    { name: 'events' }
                ]
            })
        });

        if (!response.ok) throw new Error('GA4 API error');
        
        const data = await response.json();
        return formatRealtimeData(data);

    } catch (error) {
        console.error('[GA4] Erro realtime:', error);
        return getMockRealtimeData();
    }
};

/**
 * Busca todos os dados para o dashboard
 */
export const getDashboardData = async () => {
    const [metrics, sources, pages, events, conversions, realtime] = await Promise.all([
        getGA4Metrics('30daysAgo', 'today'),
        getGA4TrafficSources('30daysAgo', 'today'),
        getGA4Pages('30daysAgo', 'today'),
        getGA4Events('7daysAgo', 'today'),
        getGA4Conversions('30daysAgo', 'today'),
        getGA4RealtimeData()
    ]);

    return {
        metrics,
        sources,
        pages,
        events,
        conversions,
        realtime,
        lastUpdated: new Date().toISOString()
    };
};

// ==================== HELPERS ====================

async function getAccessToken() {
    // EM PRODUÇÃO: O token deve ser obtido do backend
    // Nunca exponha service account keys no frontend!
    
    // Opção 1: Backend proxy
    const response = await fetch('/api/ga4-token');
    const { token } = await response.json();
    return token;
    
    // Opção 2: API Key (limitado, apenas para dados públicos)
    // return GA4_API_KEY;
}

function formatGA4Metrics(data) {
    if (!data.rows || data.rows.length === 0) return getMockGA4Data();
    
    const row = data.rows[0].metricValues;
    return {
        sessions: parseInt(row[0].value),
        activeUsers: parseInt(row[1].value),
        newUsers: parseInt(row[2].value),
        totalUsers: parseInt(row[3].value),
        pageViews: parseInt(row[4].value),
        avgSessionDuration: parseFloat(row[5].value),
        bounceRate: parseFloat(row[6].value),
        conversions: parseInt(row[7]?.value || 0),
        eventCount: parseInt(row[8]?.value || 0)
    };
}

function formatTrafficSources(data) {
    if (!data.rows) return getMockTrafficSources();
    
    return data.rows.map(row => ({
        source: row.dimensionValues[0].value,
        medium: row.dimensionValues[1].value,
        campaign: row.dimensionValues[2].value,
        sessions: parseInt(row.metricValues[0].value),
        users: parseInt(row.metricValues[1].value),
        conversions: parseInt(row.metricValues[2].value)
    }));
}

function formatPagesData(data) {
    if (!data.rows) return getMockPagesData();
    
    return data.rows.map(row => ({
        title: row.dimensionValues[0].value,
        path: row.dimensionValues[1].value,
        views: parseInt(row.metricValues[0].value),
        users: parseInt(row.metricValues[1].value),
        avgEngagementTime: parseFloat(row.metricValues[2].value),
        bounceRate: parseFloat(row.metricValues[3].value)
    }));
}

function formatEventsData(data) {
    if (!data.rows) return getMockEventsData();
    
    return data.rows.map(row => ({
        name: row.dimensionValues[0].value,
        count: parseInt(row.metricValues[0].value),
        value: parseFloat(row.metricValues[1]?.value || 0)
    }));
}

function formatConversionsData(data) {
    if (!data.rows) return getMockConversionsData();
    
    return data.rows.map(row => ({
        eventName: row.dimensionValues[0].value,
        conversions: parseInt(row.metricValues[0].value),
        value: parseFloat(row.metricValues[1]?.value || 0)
    }));
}

function formatRealtimeData(data) {
    if (!data.rows || data.rows.length === 0) return getMockRealtimeData();
    
    const row = data.rows[0].metricValues;
    return {
        activeUsers: parseInt(row[0].value),
        pageViews: parseInt(row[1].value),
        events: parseInt(row[2].value)
    };
}

// ==================== MOCK DATA ====================

function getMockGA4Data() {
    return {
        sessions: 2847,
        activeUsers: 1923,
        newUsers: 1456,
        totalUsers: 2341,
        pageViews: 5621,
        avgSessionDuration: 145.5, // segundos
        bounceRate: 42.3,
        conversions: 89,
        eventCount: 12456
    };
}

function getMockTrafficSources() {
    return [
        { source: 'google', medium: 'organic', campaign: '(not set)', sessions: 1245, users: 987, conversions: 34 },
        { source: 'google', medium: 'cpc', campaign: 'fonoaudiologia_anapolis', sessions: 567, users: 423, conversions: 28 },
        { source: 'facebook', medium: 'social', campaign: 'retargeting', sessions: 342, users: 298, conversions: 12 },
        { source: 'instagram', medium: 'social', campaign: 'stories', sessions: 234, users: 201, conversions: 8 },
        { source: 'direct', medium: 'none', campaign: '(not set)', sessions: 198, users: 176, conversions: 5 },
        { source: 'whatsapp', medium: 'referral', campaign: '(not set)', sessions: 87, users: 82, conversions: 2 }
    ];
}

function getMockPagesData() {
    return [
        { title: 'Clínica Fono Inova - Home', path: '/', views: 1245, users: 987, avgEngagementTime: 125.4, bounceRate: 35.2 },
        { title: 'Fonoaudiologia Infantil', path: '/fonoaudiologia', views: 567, users: 423, avgEngagementTime: 189.3, bounceRate: 28.1 },
        { title: 'Teste da Linguinha', path: '/freio-lingual', views: 456, users: 387, avgEngagementTime: 234.1, bounceRate: 22.4 },
        { title: 'Psicologia Infantil', path: '/psicologia', views: 342, users: 298, avgEngagementTime: 156.7, bounceRate: 31.5 },
        { title: 'Fisioterapia Pediátrica', path: '/fisioterapia', views: 234, users: 201, avgEngagementTime: 145.2, bounceRate: 33.8 }
    ];
}

function getMockEventsData() {
    return [
        { name: 'page_view', count: 5621, value: 0 },
        { name: 'scroll', count: 3421, value: 0 },
        { name: 'click', count: 1897, value: 0 },
        { name: 'service_click', count: 456, value: 228 },
        { name: 'whatsapp_click', count: 234, value: 234 },
        { name: 'form_start', count: 189, value: 0 },
        { name: 'generate_lead', count: 89, value: 89 },
        { name: 'popup_opened', count: 567, value: 0 },
        { name: 'booking_initiated', count: 123, value: 0 }
    ];
}

function getMockConversionsData() {
    return [
        { eventName: 'generate_lead', conversions: 89, value: 89 },
        { eventName: 'whatsapp_click', conversions: 234, value: 234 },
        { eventName: 'form_submission', conversions: 67, value: 67 },
        { eventName: 'conversion', conversions: 45, value: 45 }
    ];
}

function getMockRealtimeData() {
    return {
        activeUsers: 12,
        pageViews: 34,
        events: 89
    };
}

export default {
    getGA4Metrics,
    getGA4TrafficSources,
    getGA4Pages,
    getGA4Events,
    getGA4Conversions,
    getGA4RealtimeData,
    getDashboardData
};
