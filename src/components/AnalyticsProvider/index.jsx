// src/components/AnalyticsProvider/index.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GA_MEASUREMENT_ID = 'G-N59X7PNQZZ';

const AnalyticsProvider = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Configuração inicial
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: window.location.pathname,
        page_title: document.title,
      });
    }

    // Listener para mudanças de rota
    const unsubscribe = navigate((location) => {
      if (typeof window.gtag !== 'undefined') {
        window.gtag('config', GA_MEASUREMENT_ID, {
          page_path: location.pathname + location.search,
          page_title: document.title,
        });
      }
    });

    return unsubscribe;
  }, [navigate]);

  return children;
};

export default AnalyticsProvider;