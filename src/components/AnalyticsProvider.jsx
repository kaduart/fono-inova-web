// src/components/AnalyticsProvider.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initAnalytics, usePageView } from '../hooks/useAnalytics';

const AnalyticsProvider = ({ children }) => {
    const location = useLocation();

    useEffect(() => {
        // Inicializar o Google Analytics
        initAnalytics();
    }, []);

    // Rastrear visualizações de página
    usePageView();

    return children;
};

export default AnalyticsProvider;