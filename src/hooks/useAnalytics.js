// src/hooks/useAnalytics.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Substitua pelo seu ID real do Google Analytics
const GA_MEASUREMENT_ID = 'G-N59X7PNQZZ';

// Inicializar o Google Analytics
export const initAnalytics = () => {
    if (typeof window !== 'undefined' && !window.gtag) {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () {
            window.dataLayer.push(arguments);
        };
        window.gtag('js', new Date());
        window.gtag('config', GA_MEASUREMENT_ID);
    }
};

export const usePageView = () => {
    const location = useLocation();

    useEffect(() => {
        // Inicializar analytics se não estiver inicializado
        initAnalytics();

        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('config', GA_MEASUREMENT_ID, {
                page_path: location.pathname + location.search,
                page_title: document.title,
            });

            // Track page view
            window.gtag('event', 'page_view', {
                page_title: document.title,
                page_location: window.location.href,
                page_path: location.pathname + location.search,
            });
        }
    }, [location]);
};

export const trackEvent = (action, category, label, value) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
};

// Eventos pré-definidos para ações comuns
export const trackButtonClick = (buttonName) => {
    trackEvent('button_click', 'UI Interaction', buttonName);
};

export const trackFormSubmission = (formName) => {
    trackEvent('form_submission', 'Lead Generation', formName);
};

export const trackPhoneCall = (phoneNumber) => {
    trackEvent('phone_call', 'Contact', phoneNumber);
};

export const trackWhatsAppClick = () => {
    trackEvent('whatsapp_click', 'Contact', 'WhatsApp Contact');
};

export const trackSocialMediaClick = (platform) => {
    trackEvent('social_media_click', 'Social Media', platform);
};

// Novas funções específicas para os componentes
export const trackPopupOpened = (triggerType) => {
    trackEvent('popup_opened', 'Engagement', `Popup - ${triggerType}`);
};

export const trackPopupClosed = () => {
    trackEvent('popup_closed', 'Engagement', 'Popup Closed');
};

export const trackBookingInitiated = (source) => {
    trackEvent('booking_initiated', 'Conversion', `Booking from ${source}`);
};

export const trackArticleClick = (articleId, articleTitle) => {
    trackEvent('article_clicked', 'Content Engagement', articleTitle, articleId);
};

// Função específica para tracking de serviços
export const trackServiceClick = (serviceName, serviceLink, position = null) => {
    const eventData = {
        event_category: 'Services',
        event_label: serviceName,
        service_name: serviceName,
        service_link: serviceLink,
        page_location: window.location.href,
        page_title: document.title,
        position: position
    };

    if (typeof window !== 'undefined' && window.gtag) {
        // GA4
        window.gtag('event', 'service_click', eventData);

        // Google Ads (se necessário)
        window.gtag('event', 'conversion', {
            'send_to': 'AW-17010705949/service_click',
            'value': 0.5, // Valor atribuído ao clique no serviço
            'currency': 'BRL',
            'transaction_id': `service_${Date.now()}`,
            'service_name': serviceName
        });
    }

    console.log(`Service Click Tracked: ${serviceName}`, eventData);
};

// Função para tracking de navegação entre serviços
export const trackServiceNavigation = (fromService, toService, navigationType) => {
    trackEvent('service_navigation', 'User Journey', `${fromService} → ${toService}`, 0, {
        navigation_type: navigationType,
        from_service: fromService,
        to_service: toService
    });
};

// Função para tracking de engajamento com serviços
export const trackServiceView = (serviceName, viewType, duration = null) => {
    trackEvent('service_view', 'Engagement', serviceName, 0, {
        view_type: viewType,
        service_name: serviceName,
        duration: duration
    });
};

// Hook para track de tempo de visualização
export const useServiceViewTime = (serviceName) => {
    useEffect(() => {
        const startTime = Date.now();

        return () => {
            const endTime = Date.now();
            const duration = Math.round((endTime - startTime) / 1000); // em segundos

            if (duration > 5) { // Só track se ficou mais de 5 segundos
                trackServiceView(serviceName, 'detail_view', duration);
            }
        };
    }, [serviceName]);
};