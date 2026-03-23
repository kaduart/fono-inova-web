/**
 * 🔔 Hook useWhatsAppMonitor
 * Monitora status do WhatsApp e pode ser usado em qualquer componente
 */

import { useEffect, useState, useCallback } from 'react';
import { 
  checkWhatsAppStatus, 
  getTimeWithoutMessages,
  isPossiblyDown 
} from '../services/whatsappMonitorService';

export function useWhatsAppMonitor(options = {}) {
  const { 
    checkInterval = 5 * 60 * 1000, // 5 minutos
    notifyOnIssue = true 
  } = options;

  const [status, setStatus] = useState({
    healthy: true,
    checking: false,
    lastCheck: null,
    timeWithoutMessages: null
  });

  const [hasIssue, setHasIssue] = useState(false);

  const check = useCallback(async () => {
    setStatus(prev => ({ ...prev, checking: true }));
    
    const result = await checkWhatsAppStatus();
    const timeWithout = getTimeWithoutMessages();
    const possiblyDown = isPossiblyDown();

    setStatus({
      healthy: result.healthy && !possiblyDown,
      checking: false,
      lastCheck: new Date(),
      timeWithoutMessages: timeWithout,
      raw: result
    });

    setHasIssue(!result.healthy || possiblyDown);

    if ((!result.healthy || possiblyDown) && notifyOnIssue) {
      console.error('🚨 [WhatsAppMonitor] Problema detectado:', result);
    }

    return result;
  }, [notifyOnIssue]);

  useEffect(() => {
    // Check inicial
    check();

    // Intervalo de verificação
    const interval = setInterval(check, checkInterval);

    return () => clearInterval(interval);
  }, [check, checkInterval]);

  return {
    ...status,
    hasIssue,
    check, // Função para forçar check manual
    isDown: hasIssue
  };
}

export default useWhatsAppMonitor;
