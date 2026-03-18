/**
 * 🧪 Script de Teste do Tracking
 * Execute no console do navegador para validar
 */

// Simular chegada via Google Ads
function testGoogleAdsTracking() {
  console.log('🧪 Testando tracking Google Ads...');
  
  // Limpar tracking anterior
  localStorage.removeItem('fono_inova_lead_tracking');
  
  // Simular URL com gclid
  const testUrl = 'https://fonoinova.com.br/?utm_source=google&utm_medium=cpc&utm_campaign=TESTE&gclid=test123';
  
  // Recarregar com parâmetros
  window.history.pushState({}, '', testUrl);
  
  // Recarregar a página
  window.location.reload();
}

// Verificar tracking atual
function checkTracking() {
  const tracking = localStorage.getItem('fono_inova_lead_tracking');
  if (tracking) {
    console.log('✅ Tracking encontrado:', JSON.parse(tracking));
  } else {
    console.log('❌ Nenhum tracking encontrado');
  }
}

// Simular clique no WhatsApp
function simulateWhatsAppClick() {
  console.log('🧪 Simulando clique no WhatsApp...');
  
  const tracking = JSON.parse(localStorage.getItem('fono_inova_lead_tracking') || '{}');
  
  console.log('Dados que seriam enviados:');
  console.log({
    origin: tracking.origin || 'Site Direto',
    metaTracking: {
      source: tracking.source || 'site_direto',
      campaign: tracking.campaign || 'Site',
      gclid: tracking.gclid,
      fbclid: tracking.fbclid
    }
  });
}

// Limpar tracking
function clearTracking() {
  localStorage.removeItem('fono_inova_lead_tracking');
  console.log('🧹 Tracking limpo');
}

console.log('🧪 Funções de teste disponíveis:');
console.log('  testGoogleAdsTracking() - Simula chegada via Google Ads');
console.log('  checkTracking() - Verifica tracking atual');
console.log('  simulateWhatsAppClick() - Simula clique no WhatsApp');
console.log('  clearTracking() - Limpa tracking');
