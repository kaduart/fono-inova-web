import { useEffect, useState } from 'react';

/**
 * Hook para capturar UTM parameters
 * Usado para enviar contexto ao CRM junto com o lead
 * 
 * NOTA: O GA4 já captura UTMs automaticamente via dataLayer
 * Este hook é para uso quando precisamos dos UTMs no código (ex: enviar ao CRM)
 */
export const useUTMTracking = () => {
    const [utmParams, setUtmParams] = useState({
        source: '',
        medium: '',
        campaign: '',
        content: '',
        term: '',
        gclid: '',
        fbclid: ''
    });

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        
        const currentUTMs = {
            source: urlParams.get('utm_source') || '',
            medium: urlParams.get('utm_medium') || '',
            campaign: urlParams.get('utm_campaign') || '',
            content: urlParams.get('utm_content') || '',
            term: urlParams.get('utm_term') || '',
            gclid: urlParams.get('gclid') || '',
            fbclid: urlParams.get('fbclid') || ''
        };

        // Se há UTMs na URL, salvar para uso posterior
        if (currentUTMs.source) {
            sessionStorage.setItem('utmParams', JSON.stringify(currentUTMs));
            setUtmParams(currentUTMs);
        } else {
            // Recuperar do sessionStorage se existir
            const stored = sessionStorage.getItem('utmParams');
            if (stored) {
                setUtmParams(JSON.parse(stored));
            }
        }
    }, []);

    const getCurrentUTMs = () => {
        const stored = sessionStorage.getItem('utmParams');
        return stored ? JSON.parse(stored) : utmParams;
    };

    return { utmParams, getCurrentUTMs };
};

export default useUTMTracking;
