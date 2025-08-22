// src/hooks/useAnalytics.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Substitua pelo seu ID real do Google Analytics
const GA_MEASUREMENT_ID = 'G-N59X7PNQZZ';

export const usePageView = () => {
    const location = useLocation();

    useEffect(() => {
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('config', GA_MEASUREMENT_ID, {
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