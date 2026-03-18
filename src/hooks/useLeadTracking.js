/**
 * 🎯 Hook de Tracking de Leads
 * Captura UTMs, gclid (Google Ads) e fbclid (Meta) 
 * para rastrear origem corretamente no CRM
 */

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'fono_inova_lead_tracking';
const STORAGE_EXPIRY = 24 * 60 * 60 * 1000; // 24 horas

/**
 * Captura parâmetros da URL
 */
function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    // UTMs
    utmSource: params.get('utm_source'),
    utmMedium: params.get('utm_medium'),
    utmCampaign: params.get('utm_campaign'),
    utmContent: params.get('utm_content'),
    utmTerm: params.get('utm_term'),
    // IDs de tracking
    gclid: params.get('gclid'),      // Google Ads
    fbclid: params.get('fbclid'),    // Meta/Facebook
    // Referrer
    referrer: document.referrer || 'direct'
  };
}

/**
 * Detecta a origem do lead baseado nos parâmetros
 */
function detectarOrigem(params) {
  // Prioridade 1: Google Ads (tem gclid)
  if (params.gclid) {
    return {
      source: 'google_ads',
      origin: 'Google Ads',
      campaign: params.utmCampaign || 'Google_Ads_Campaign',
      medium: params.utmMedium || 'cpc'
    };
  }

  // Prioridade 2: Meta Ads (tem fbclid)
  if (params.fbclid) {
    return {
      source: 'meta_ads',
      origin: 'Meta Ads',
      campaign: params.utmCampaign || 'Meta_Ads_Campaign',
      medium: params.utmMedium || 'social'
    };
  }

  // Prioridade 3: UTM Source
  if (params.utmSource) {
    const source = params.utmSource.toLowerCase();
    
    if (source.includes('google')) {
      return {
        source: 'google_organic',
        origin: 'Google Orgânico',
        campaign: params.utmCampaign || 'SEO',
        medium: params.utmMedium || 'organic'
      };
    }
    
    if (source.includes('gmb') || source.includes('meu_negocio')) {
      return {
        source: 'gmb',
        origin: 'Google Meu Negócio',
        campaign: params.utmCampaign || 'GMB',
        medium: params.utmMedium || 'organic'
      };
    }
    
    if (source.includes('facebook') || source.includes('instagram') || source.includes('meta')) {
      return {
        source: 'social_organic',
        origin: 'Social Orgânico',
        campaign: params.utmCampaign || 'Social',
        medium: params.utmMedium || 'social'
      };
    }
    
    if (source.includes('email')) {
      return {
        source: 'email',
        origin: 'Email Marketing',
        campaign: params.utmCampaign || 'Email',
        medium: params.utmMedium || 'email'
      };
    }
    
    return {
      source: params.utmSource,
      origin: params.utmSource,
      campaign: params.utmCampaign || 'Campaign',
      medium: params.utmMedium || 'medium'
    };
  }

  // Prioridade 4: Referrer
  if (params.referrer && params.referrer !== 'direct') {
    const ref = params.referrer.toLowerCase();
    
    if (ref.includes('google.com')) {
      return {
        source: 'google_organic',
        origin: 'Google Orgânico',
        campaign: 'SEO',
        medium: 'organic'
      };
    }
    
    if (ref.includes('facebook.com')) {
      return {
        source: 'facebook_organic',
        origin: 'Facebook Orgânico',
        campaign: 'Social',
        medium: 'social'
      };
    }
    
    if (ref.includes('instagram.com')) {
      return {
        source: 'instagram_organic',
        origin: 'Instagram Orgânico',
        campaign: 'Social',
        medium: 'social'
      };
    }
  }

  // Default: Site Direto
  return {
    source: 'site_direto',
    origin: 'Site Direto',
    campaign: 'Site',
    medium: 'direct'
  };
}

/**
 * Salva tracking no localStorage
 */
function salvarTracking(data) {
  const item = {
    data,
    timestamp: Date.now()
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(item));
}

/**
 * Recupera tracking do localStorage
 */
function recuperarTracking() {
  try {
    const item = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!item) return null;
    
    // Verifica se não expirou
    if (Date.now() - item.timestamp > STORAGE_EXPIRY) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    
    return item.data;
  } catch (e) {
    return null;
  }
}

/**
 * 🎯 Hook principal - useLeadTracking
 * Usado nas landing pages para capturar origem
 */
export function useLeadTracking() {
  const [tracking, setTracking] = useState(null);

  useEffect(() => {
    // Verifica se já tem tracking salvo
    const existente = recuperarTracking();
    
    if (existente) {
      setTracking(existente);
    } else {
      // Captura nova
      const params = getUrlParams();
      const origem = detectarOrigem(params);
      
      const novoTracking = {
        ...origem,
        ...params,
        capturedAt: new Date().toISOString(),
        page: window.location.pathname
      };
      
      salvarTracking(novoTracking);
      setTracking(novoTracking);
      
      console.log('✅ Lead Tracking capturado:', novoTracking);
    }
  }, []);

  return tracking;
}

/**
 * 🎯 Função para obter tracking atual
 * Usado no momento de enviar o lead
 */
export function getLeadTracking() {
  const existente = recuperarTracking();
  
  if (existente) {
    return existente;
  }
  
  // Se não tem salvo, captura agora
  const params = getUrlParams();
  const origem = detectarOrigem(params);
  
  return {
    ...origem,
    ...params,
    capturedAt: new Date().toISOString(),
    page: window.location.pathname
  };
}

/**
 * 🎯 Função para limpar tracking
 * Usado após converter o lead
 */
export function clearLeadTracking() {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * 🎯 Função para montar payload de tracking para API
 * Usado ao enviar lead para o CRM
 */
export function buildTrackingPayload() {
  const tracking = getLeadTracking();
  
  return {
    // Campos principais para o CRM
    origin: tracking.origin,
    metaTracking: {
      source: tracking.source,
      campaign: tracking.campaign,
      medium: tracking.medium,
      utmSource: tracking.utmSource,
      utmCampaign: tracking.utmCampaign,
      utmMedium: tracking.utmMedium,
      utmContent: tracking.utmContent,
      utmTerm: tracking.utmTerm,
      gclid: tracking.gclid,
      fbclid: tracking.fbclid,
      referrer: tracking.referrer,
      capturedAt: tracking.capturedAt,
      page: tracking.page
    }
  };
}

export default useLeadTracking;
