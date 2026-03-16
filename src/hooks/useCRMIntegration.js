import { useCallback } from 'react';
import { sendLeadToCRM } from '../services/crmAnalyticsApi';
import { useUTMTracking } from './useUTMTracking';
import { useSessionTracking } from './useSessionTracking';
import { trackEvent } from './useAnalytics';

/**
 * Hook simplificado para integração com CRM
 * 
 * USO:
 * const { submitLead } = useCRMIntegration();
 * 
 * await submitLead({
 *   name: 'João',
 *   phone: '(62) 99999-9999', 
 *   email: 'joao@email.com'
 * });
 */
export const useCRMIntegration = () => {
    const { getCurrentUTMs } = useUTMTracking();
    const { getSessionStats, trackServiceView } = useSessionTracking();

    const submitLead = useCallback(async (leadData) => {
        // 1. Track no GA4 (já existente)
        trackEvent('generate_lead', 'conversion', leadData.formSource || 'modal');

        // 2. Enviar para CRM com contexto
        const result = await sendLeadToCRM({
            name: leadData.name,
            phone: leadData.phone,
            email: leadData.email,
            serviceInterest: leadData.serviceInterest || '',
            formSource: leadData.formSource || 'modal_agendamento'
        });

        return result;
    }, [getCurrentUTMs, getSessionStats]);

    const trackService = useCallback((serviceName) => {
        trackServiceView(serviceName);
    }, [trackServiceView]);

    return {
        submitLead,
        trackService,
        getSessionStats
    };
};

export default useCRMIntegration;
