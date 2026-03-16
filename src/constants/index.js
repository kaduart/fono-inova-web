/**
 * 📋 Constants - Configurações do Projeto
 * Validação de variáveis de ambiente
 */

// ═══════════════════════════════════════════════════════════════════════════════
// 🔗 URLs da API
// ═══════════════════════════════════════════════════════════════════════════════

const CRM_API_URL = import.meta.env.VITE_CRM_API_URL || '';
const CRM_API_KEY = import.meta.env.VITE_CRM_API_KEY || '';

// ═══════════════════════════════════════════════════════════════════════════════
// ✅ VALIDAÇÃO
// ═══════════════════════════════════════════════════════════════════════════════

export const isCRMConfigured = () => {
  const configured = CRM_API_URL && CRM_API_URL !== 'https://seu-crm.onrender.com';
  console.log(`[Constants] CRM Configured: ${configured} | URL: ${CRM_API_URL}`);
  return configured;
};

export const getCRMApiUrl = () => {
  if (!isCRMConfigured()) {
    console.warn('[Constants] VITE_CRM_API_URL não configurado. Modo desenvolvimento ativo.');
    return '';
  }
  return CRM_API_URL;
};

// ═══════════════════════════════════════════════════════════════════════════════
// 📊 ENDPOINTS
// ═══════════════════════════════════════════════════════════════════════════════

export const ENDPOINTS = {
  // Leads
  SEND_LEAD: '/api/leads/from-website',
  
  // Landing Pages
  LP_TRACK: '/api/landing-pages/track',
  LP_METRICS: '/api/landing-pages/metrics',
  
  // Analytics
  ANALYTICS: '/api/analytics/dashboard'
};

// ═══════════════════════════════════════════════════════════════════════════════
// 🔧 CONFIGURAÇÃO
// ═══════════════════════════════════════════════════════════════════════════════

export const CONFIG = {
  CRM_API_URL,
  CRM_API_KEY,
  GA_MEASUREMENT_ID: import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-N59X59X7PNQZZ',
  
  // Feature flags
  FEATURES: {
    CRM_INTEGRATION: isCRMConfigured(),
    LP_TRACKING: isCRMConfigured(),
    ANALYTICS: true
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 LANDING PAGES
// ═══════════════════════════════════════════════════════════════════════════════

export const LP_CATEGORIES = {
  fonoaudiologia: { label: 'Fonoaudiologia', color: '#8B5CF6' },
  autismo: { label: 'Autismo', color: '#3B82F6' },
  psicologia: { label: 'Psicologia', color: '#EC4899' },
  aprendizagem: { label: 'Aprendizagem', color: '#F59E0B' },
  terapia_ocupacional: { label: 'Terapia Ocupacional', color: '#10B981' },
  geografica: { label: 'Geográfica', color: '#6B7280' }
};

// ═══════════════════════════════════════════════════════════════════════════════
// 📱 CONTATO
// ═══════════════════════════════════════════════════════════════════════════════

export const CONTACT = {
  WHATSAPP: '5562988880000',
  WHATSAPP_LINK: 'https://wa.me/5562988880000',
  PHONE: '(62) 98888-0000',
  EMAIL: 'contato@clinicafonoinova.com.br',
  ADDRESS: 'Anápolis, GO'
};

export default CONFIG;
