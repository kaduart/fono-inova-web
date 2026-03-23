/**
 * 📱 WhatsApp Monitor Service
 * Monitora status da integração WhatsApp e alerta quando há problemas
 */

import { getCRMApiUrl } from '../constants';

const API_BASE = getCRMApiUrl();
const STORAGE_KEY = 'whatsapp_health_check';
const ALERT_COOLDOWN = 30 * 60 * 1000; // 30 minutos entre alertas

/**
 * Verifica status da integração WhatsApp no backend
 */
export async function checkWhatsAppStatus() {
  try {
    const response = await fetch(`${API_BASE}/api/whatsapp/health`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      // Timeout curto para não travar
      signal: AbortSignal.timeout(5000)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    
    // Salvar último check bem-sucedido
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      lastSuccess: new Date().toISOString(),
      status: data
    }));

    return {
      healthy: true,
      data,
      lastMessage: data.lastMessageReceived,
      webhookStatus: data.webhookStatus
    };

  } catch (error) {
    console.error('❌ [WhatsApp Monitor] Falha no health check:', error);
    
    return {
      healthy: false,
      error: error.message,
      lastSuccess: getLastSuccessTime()
    };
  }
}

/**
 * Verifica se devemos mostrar alerta (evita spam)
 */
export function shouldShowAlert() {
  const lastAlert = localStorage.getItem('whatsapp_last_alert');
  if (!lastAlert) return true;
  
  const timeSinceLastAlert = Date.now() - parseInt(lastAlert);
  return timeSinceLastAlert > ALERT_COOLDOWN;
}

/**
 * Marca que alerta foi mostrado
 */
export function markAlertShown() {
  localStorage.setItem('whatsapp_last_alert', Date.now().toString());
}

/**
 * Retorna quando foi a última mensagem recebida
 */
function getLastSuccessTime() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    
    const data = JSON.parse(stored);
    return data.lastSuccess;
  } catch {
    return null;
  }
}

/**
 * Calcula há quanto tempo não recebe mensagens
 */
export function getTimeWithoutMessages() {
  const lastSuccess = getLastSuccessTime();
  if (!lastSuccess) return null;
  
  const diff = Date.now() - new Date(lastSuccess).getTime();
  
  // Converter para formato legível
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  return { hours, minutes, totalMs: diff };
}

/**
 * Verifica se está há muito tempo sem mensagens (possível problema)
 */
export function isPossiblyDown() {
  const timeWithout = getTimeWithoutMessages();
  if (!timeWithout) return false;
  
  // Se mais de 6 horas sem mensagens em dia de semana (horário comercial)
  // ou mais de 24h em qualquer dia
  const now = new Date();
  const isBusinessHours = now.getDay() >= 1 && now.getDay() <= 6 && 
                          now.getHours() >= 8 && now.getHours() <= 18;
  
  const threshold = isBusinessHours ? (6 * 60 * 60 * 1000) : (24 * 60 * 60 * 1000);
  
  return timeWithout.totalMs > threshold;
}

/**
 * Envia notificação para o admin (se configurado)
 */
export async function notifyAdmin(message) {
  try {
    await fetch(`${API_BASE}/api/alerts/whatsapp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        timestamp: new Date().toISOString(),
        url: window.location.href
      })
    });
  } catch (e) {
    // Silencioso - não quebra se falhar
    console.error('Falha ao enviar notificação:', e);
  }
}

export default {
  checkWhatsAppStatus,
  shouldShowAlert,
  markAlertShown,
  getTimeWithoutMessages,
  isPossiblyDown,
  notifyAdmin
};
