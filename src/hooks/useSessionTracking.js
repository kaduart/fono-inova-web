import { useEffect, useRef } from 'react';

/**
 * Hook para tracking básico de sessão
 * 
 * NOTA: O GA4 já captura automaticamente:
 * - Page views
 * - Scroll depth
 * - Time on page
 * - Device info
 * - etc.
 * 
 * Este hook é apenas para:
 * 1. Registrar serviços visualizados (para enviar ao CRM)
 * 2. Track de eventos específicos do funil
 */
export const useSessionTracking = () => {
    const startTimeRef = useRef(Date.now());

    useEffect(() => {
        // Registrar início de sessão
        const sessionId = getOrCreateSessionId();
        
        // Registrar página atual
        const pages = JSON.parse(sessionStorage.getItem('pagesViewed') || '[]');
        const currentPage = window.location.pathname;
        
        if (!pages.find(p => p.page === currentPage)) {
            pages.push({
                page: currentPage,
                timestamp: new Date().toISOString()
            });
            sessionStorage.setItem('pagesViewed', JSON.stringify(pages));
        }

        // Track de scroll depth para CRM (opcional)
        let maxScroll = 0;
        const handleScroll = () => {
            const scrollPercent = Math.floor(
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            );
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                sessionStorage.setItem('maxScrollDepth', maxScroll.toString());
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const trackServiceView = (serviceName) => {
        const services = JSON.parse(sessionStorage.getItem('servicesViewed') || '[]');
        if (!services.includes(serviceName)) {
            services.push(serviceName);
            sessionStorage.setItem('servicesViewed', JSON.stringify(services));
        }
    };

    const getSessionStats = () => {
        return {
            sessionId: getOrCreateSessionId(),
            pagesViewed: JSON.parse(sessionStorage.getItem('pagesViewed') || '[]').length,
            servicesViewed: JSON.parse(sessionStorage.getItem('servicesViewed') || '[]'),
            timeOnSite: Math.floor((Date.now() - startTimeRef.current) / 1000),
            maxScrollDepth: parseInt(sessionStorage.getItem('maxScrollDepth') || '0')
        };
    };

    return { trackServiceView, getSessionStats };
};

function getOrCreateSessionId() {
    let id = sessionStorage.getItem('sessionId');
    if (!id) {
        id = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        sessionStorage.setItem('sessionId', id);
    }
    return id;
}

export default useSessionTracking;
