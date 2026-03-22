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
// 🏥 PÁGINAS DE ESPECIALIDADE - PARA RASTREAMENTO NO DASHBOARD
// ═══════════════════════════════════════════════════════════════════════════════

export const SERVICE_PAGES = [
  // Páginas originais
  { id: 'dificuldade-escolar', name: 'Dificuldade Escolar', path: '/avaliacao-neuropsicologica-dificuldade-escolar', icon: '📚', category: 'aprendizagem' },
  { id: 'fonoaudiologia', name: 'Fonoaudiologia', path: '/fonoaudiologia', icon: '🗣️', category: 'fonoaudiologia' },
  { id: 'psicologia', name: 'Psicologia', path: '/psicologia', icon: '🧠', category: 'psicologia' },
  { id: 'teste-da-linguinha', name: 'Teste da Linguinha', path: '/freio-lingual', icon: '👶', category: 'fonoaudiologia' },
  { id: 'psicopedagogia', name: 'Psicopedagogia', path: '/psicopedagogia', icon: '📖', category: 'aprendizagem' },
  { id: 'neuropsicologia', name: 'Neuropsicologia', path: '/avaliacao-neuropsicologica', icon: '🧩', category: 'psicologia' },
  { id: 'autismo-tea', name: 'Autismo (TEA)', path: '/avaliacao-autismo-infantil', icon: '🧩', category: 'autismo' },
  { id: 'fisioterapia', name: 'Fisioterapia', path: '/fisioterapia', icon: '🦵', category: 'fisioterapia' },
  { id: 'home', name: 'Home', path: '/', icon: '🏠', category: 'institucional' },
  { id: 'terapia-ocupacional', name: 'Terapia Ocupacional', path: '/terapia-ocupacional', icon: '🤲', category: 'terapia_ocupacional' },
  { id: 'fala-tardia', name: 'Fala Tardia', path: '/fala-tardia', icon: '💬', category: 'fonoaudiologia' },
  
  // 🆕 NOVAS PÁGINAS SEO LOCAL (Mar/2026)
  { id: 'fonoaudiologia-anapolis', name: 'Fonoaudiologia Anápolis', path: '/fonoaudiologia-anapolis', icon: '🗣️', category: 'fonoaudiologia', isNew: true },
  { id: 'psicologia-infantil-anapolis', name: 'Psicologia Infantil Anápolis', path: '/psicologia-infantil-anapolis', icon: '🧠', category: 'psicologia', isNew: true },
  { id: 'terapia-ocupacional-anapolis', name: 'Terapia Ocupacional Anápolis', path: '/terapia-ocupacional-anapolis', icon: '🤲', category: 'terapia_ocupacional', isNew: true },
  { id: 'psicomotricidade-anapolis', name: 'Psicomotricidade Anápolis', path: '/psicomotricidade-anapolis', icon: '🤸', category: 'psicomotricidade', isNew: true },
  { id: 'teste-da-linguinha-anapolis', name: 'Teste da Linguinha Anápolis', path: '/teste-da-linguinha-anapolis', icon: '👶', category: 'fonoaudiologia', isNew: true },
  { id: 'fisioterapia-infantil-anapolis', name: 'Fisioterapia Infantil Anápolis', path: '/fisioterapia-infantil-anapolis', icon: '🦵', category: 'fisioterapia', isNew: true },
  { id: 'avaliacao-neuropsicologica-anapolis', name: 'Avaliação Neuropsicológica Anápolis', path: '/avaliacao-neuropsicologica-anapolis', icon: '🧩', category: 'psicologia', isNew: true },
];

// ═══════════════════════════════════════════════════════════════════════════════
// 📱 CONTATO
// ═══════════════════════════════════════════════════════════════════════════════

export const CONTACT = {
  WHATSAPP: '5562993377726',
  WHATSAPP_LINK: 'https://wa.me/5562993377726',
  PHONE: '(62) 99337-7726',
  EMAIL: 'contato@clinicafonoinova.com.br',
  ADDRESS: 'Anápolis, GO'
};

export default CONFIG;
