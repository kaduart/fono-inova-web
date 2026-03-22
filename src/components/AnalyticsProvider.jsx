// src/components/AnalyticsProvider.jsx
import { useEffect } from 'react';
import { initAnalytics, usePageView } from '../hooks/useAnalytics';
import { useJourneyTracker } from '../utils/journeyTracker';

const AnalyticsProvider = ({ children }) => {
    useEffect(() => {
        // Inicializar o Google Analytics
        initAnalytics();
    }, []);

    // Rastrear visualizações de página (GA4)
    usePageView();

    // Rastrear jornada do lead no CRM
    useJourneyTracker();

    return children;
};

export default AnalyticsProvider;