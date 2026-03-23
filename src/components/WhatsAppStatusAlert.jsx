/**
 * 🚨 WhatsApp Status Alert
 * Mostra alerta visual quando detecta problemas na integração WhatsApp
 */

import { useEffect, useState } from 'react';
import { AlertTriangle, X, MessageSquare, RefreshCw } from 'lucide-react';
import { 
  checkWhatsAppStatus, 
  shouldShowAlert, 
  markAlertShown,
  getTimeWithoutMessages,
  isPossiblyDown 
} from '../services/whatsappMonitorService';

const WhatsAppStatusAlert = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [status, setStatus] = useState(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Só mostrar para admins (você pode adicionar lógica de autenticação aqui)
    // Por enquanto, mostra baseado em localStorage flag
    const isAdmin = localStorage.getItem('admin_mode') === 'true' || 
                    window.location.search.includes('admin=1');
    
    if (!isAdmin) return;

    const checkStatus = async () => {
      const result = await checkWhatsAppStatus();
      setStatus(result);

      // Se não está saudável OU está há muito tempo sem mensagens
      if ((!result.healthy || isPossiblyDown()) && shouldShowAlert()) {
        setShowAlert(true);
        markAlertShown();
      }
    };

    // Verificar imediatamente
    checkStatus();

    // Verificar a cada 5 minutos
    const interval = setInterval(checkStatus, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    setShowAlert(false);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  if (!showAlert || dismissed) return null;

  const timeWithout = getTimeWithoutMessages();

  return (
    <div className="fixed top-20 right-4 z-[9999] max-w-md animate-in slide-in-from-right">
      <div className="bg-red-50 border-l-4 border-red-500 rounded-lg shadow-xl p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
          
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-red-800 text-sm">
              ⚠️ Problema no WhatsApp Detectado
            </h3>
            
            <p className="text-red-700 text-xs mt-1">
              {!status?.healthy 
                ? 'Não estamos recebendo mensagens no momento.'
                : `Última mensagem há ${timeWithout?.hours || 0}h ${timeWithout?.minutes || 0}min`
              }
            </p>

            <div className="mt-3 flex gap-2">
              <a 
                href="https://developers.facebook.com/apps/1239662767865979/whatsapp-business/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1.5 rounded transition-colors"
              >
                <MessageSquare className="w-3 h-3" />
                Ver Meta
              </a>
              
              <button 
                onClick={handleRefresh}
                className="inline-flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs px-3 py-1.5 rounded transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                Atualizar
              </button>
            </div>
          </div>

          <button 
            onClick={handleDismiss}
            className="text-red-400 hover:text-red-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppStatusAlert;
